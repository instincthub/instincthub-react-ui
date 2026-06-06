"use client";

import React, { useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { FILE_URL, IN_DEV_MODE, slugifyFileName } from "../../lib/helpFunction";
import { S3Client } from "@aws-sdk/client-s3";
import { openToast } from "../../lib/modals/modals";

interface S3UploadResponse {
  bucket: string;
  title: string;
  key: string;
  content_type: string;
  size: number;
  location: string;
}

interface FileUploaderProps {
  /** Function called when files are selected */
  onFilesSelected?: (files: File[]) => void;
  /** Function called when upload is triggered */
  onUpload?: (files: File[]) => Promise<void>;
  /** Maximum number of files allowed */
  maxFiles?: number;
  /** Maximum file size in bytes */
  maxFileSize?: number;
  /** Array of accepted file extensions */
  acceptedFileTypes?: string[];
  /** Placeholder text */
  placeholder?: string;
  /** Upload type classification */
  uploadType?: string;
  /** Show preview of selected files */
  showPreview?: boolean;
  /** Show upload progress */
  showProgress?: boolean;
  /** Upload in progress state */
  isUploading?: boolean;
  /** Custom class name */
  className?: string;
  /** Upload progress percentage */
  uploadProgress?: number;
  /** Enable image cropping */
  cropEnabled?: boolean;
  /** Crop aspect ratio */
  aspectRatio?: string;
  /** Validate CSV files */
  validateCSV?: boolean;
  /** Generate thumbnail for images */
  generateThumbnail?: boolean;
  /** Show file type indicator */
  showFileType?: boolean;
  
  // Legacy props for backward compatibility
  headers?: string;
  labels?: string;
  accepts?: string;
  names?: string;
  module?: string;
  step?: string;
  username?: string | null;
  setResponse?: (response: S3UploadResponse) => void;
  setValues?: (name: string, value: string) => void;
  setModules?: (module: string, name: string, value: string) => void;
  setSteps?: (
    module: string,
    step: string,
    name: string,
    value: string
  ) => void;
}

const FileUploader: React.FC<FileUploaderProps> = (props) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Legacy support
  const [message, setMessage] = useState<string>(
    props.placeholder || props.labels || "Drag and drop files here to upload."
  );
  const [uploadPercentage, setUploadPercentage] = useState<number>(0);

  const handleFileChange = async (event: { files: File[] }) => {
    const files = event.files;
    setSelectedFiles(files);
    setSelectedFile(files[0]); // Legacy support
    setUploadPercentage(0);
    
    // Call the onFilesSelected callback if provided
    if (props.onFilesSelected) {
      props.onFilesSelected(files);
    }
  };

  const handleUpload = async () => {
    const filesToUpload = selectedFiles.length > 0 ? selectedFiles : (selectedFile ? [selectedFile] : []);
    
    if (filesToUpload.length === 0) {
      return;
    }

    // Call the onUpload callback if provided
    if (props.onUpload) {
      try {
        await props.onUpload(filesToUpload);
        return;
      } catch (error) {
        console.error("Upload callback error:", error);
        openToast("Error uploading file!", 400);
        return;
      }
    }

    // Use the first file for legacy S3 upload
    const fileToUpload = filesToUpload[0];

    try {
      // Initialize S3 client
      const s3Client = new S3Client({
        region: process.env.NEXT_PUBLIC_AWS_REGION,
        endpoint: process.env.NEXT_PUBLIC_AWS_S3_ENDPOINT_URL,
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
        },
      });

      // Create unique key for the file
      const timestamp = new Date().toISOString();
      const uniqueKey = slugifyFileName(
        `${props.username || "anonymous"}-${timestamp}-${fileToUpload.name}`
      );
      const prefixUniqueKey = IN_DEV_MODE
        ? `test-env__${uniqueKey}`
        : uniqueKey;

      // Set file location
      const keyLocation =
        (props.accepts || props.acceptedFileTypes?.includes("video/*"))
          ? process.env.NEXT_PUBLIC_AWS_LOCATION
          : process.env.NEXT_PUBLIC_AWS_LOCATION_FILES;

      const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || "";
      const fullKey = `${keyLocation}/${prefixUniqueKey}`;

      // Convert File to Uint8Array — browser File/Blob streams cause
      // "readableStream.getReader is not a function" in the AWS SDK's
      // Next.js bundle because of stream API polyfill mismatches.
      const arrayBuffer = await fileToUpload.arrayBuffer();
      const fileBody = new Uint8Array(arrayBuffer);

      // Decide between single-part and multipart upload based on file size
      const FILE_SIZE_THRESHOLD = 100 * 1024 * 1024; // 100 MB threshold

      if (fileToUpload.size < FILE_SIZE_THRESHOLD) {
        // For smaller files, use simple upload
        const { PutObjectCommand } = await import("@aws-sdk/client-s3");

        setUploadPercentage(10); // Start progress

        const putCommand = new PutObjectCommand({
          Bucket: bucketName,
          Key: fullKey,
          Body: fileBody,
          ContentType: fileToUpload.type,
          ACL: "public-read",
        });

        // Use a timer to simulate progress
        const simulateProgress = setInterval(() => {
          setUploadPercentage((prev) => Math.min(prev + 5, 95));
        }, 300);

        await s3Client.send(putCommand);
        clearInterval(simulateProgress);
        setUploadPercentage(100);
      } else {
        // For larger files, use multipart upload
        const { Upload } = await import("@aws-sdk/lib-storage");

        const upload = new Upload({
          client: s3Client,
          params: {
            Bucket: bucketName,
            Key: fullKey,
            Body: fileBody,
            ContentType: fileToUpload.type,
            ACL: "public-read",
          },
        });

        upload.on("httpUploadProgress", (progress: any) => {
          const percentage = Math.round(
            (progress.loaded / progress.total) * 100
          );
          setUploadPercentage(percentage);
        });

        await upload.done();
      }

      // Upload completed successfully
      openToast("File Uploaded Successfully!");

      const res: S3UploadResponse = {
        bucket: bucketName,
        title: fileToUpload.name,
        key: prefixUniqueKey,
        content_type: fileToUpload.type,
        size: fileToUpload.size,
        location: `${FILE_URL}creators/${prefixUniqueKey}`,
      };

      props.setResponse && props.setResponse(res);
      props.setValues && props.setValues(props.names || "", res.key);
      props.setModules &&
        props.setModules(props.module || "", props.names || "", res.key);
      props.setSteps &&
        props.setSteps(
          props.module || "",
          props.step || "",
          props.names || "",
          res.key
        );
    } catch (error) {
      console.error("Upload error:", error);
      openToast("Error uploading file!", 400);
      setUploadPercentage(0);
    }
  };

  const ProgressBar = ({ percentage }: { percentage: number }) => (
    <div
      className="ihub-progress"
      style={{
        width: "100%",
        height: "8px",
        background: "var(--Gray, #e5e7eb)",
        borderRadius: "4px",
        overflow: "hidden",
        margin: "8px 0",
      }}
    >
      <div
        className="ihub-progress-bar"
        style={{
          width: `${percentage}%`,
          height: "100%",
          background: "var(--DarkCyan, #00838f)",
          borderRadius: "4px",
          transition: "width 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "10px",
          color: "#fff",
          fontWeight: 600,
          minWidth: percentage > 10 ? "auto" : 0,
        }}
      >
        {percentage > 10 ? `${percentage}%` : ""}
      </div>
    </div>
  );

  // Custom progress bar template
  const progressBarTemplate = () => (
    <div>
      <ProgressBar percentage={uploadPercentage} />
      <p style={{ fontSize: "12px", color: "var(--Rhythm, #69779b)", margin: "4px 0 0" }}>
        Uploading… {uploadPercentage}%
      </p>
    </div>
  );

  // Item template — just shows the filename; progress is handled by progressBarTemplate
  const handleItemTemplate = (file: any) => {
    const name = file?.name || file?.objectURL?.split("/").pop() || "File";
    return (
      <div style={{ fontSize: "12px", color: "var(--Rhythm, #69779b)", padding: "4px 0" }}>
        {name}
      </div>
    );
  };

  // Convert acceptedFileTypes to accept format
  const getAcceptString = () => {
    if (props.acceptedFileTypes && props.acceptedFileTypes.length > 0) {
      return props.acceptedFileTypes.join(',');
    }
    return props.accepts || "*";
  };

  return (
    <div className={`ihub-uploader card primereact ${props.className || ''}`}>
      {props.headers && <h3>{props.headers}</h3>}
      <FileUpload
        name="upload"
        customUpload={true}
        accept={getAcceptString()}
        maxFileSize={props.maxFileSize || 0}
        multiple={!props.maxFiles || props.maxFiles > 1}
        onSelect={handleFileChange}
        uploadHandler={handleUpload}
        emptyTemplate={<p className="m-0">{message}</p>}
        onError={() => setMessage("Upload failed, try again!")}
        progressBarTemplate={props.showProgress !== false ? progressBarTemplate : undefined}
        itemTemplate={uploadPercentage && props.showProgress !== false ? handleItemTemplate : undefined}
        disabled={props.isUploading}
        pt={{
          content: { className: "surface-ground" },
          message: {
            root: {
              className: "w-1rem",
            },
          },
        }}
      />
    </div>
  );
};

export default FileUploader;
