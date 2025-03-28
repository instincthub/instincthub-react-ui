import React, { useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { FILE_URL, IN_DEV_MODE, slugifyFileName } from "../../lib/helpFunction";
import { S3Client } from "@aws-sdk/client-s3";
import { openToast } from "../../lib/modals";

interface S3UploadResponse {
  bucket: string;
  title: string;
  key: string;
  content_type: string;
  size: number;
  location: string;
}

interface FileUploaderProps {
  headers?: string;
  labels?: string;
  accepts?: string;
  maxFileSize?: number;
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>(
    props.labels || "Drag and drop files here to upload."
  );
  const [uploadPercentage, setUploadPercentage] = useState<number>(0);

  const handleFileChange = async (event: { files: File[] }) => {
    setSelectedFile(event.files[0]);
    setUploadPercentage(0);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

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
        `${props.username || "anonymous"}-${timestamp}-${selectedFile.name}`
      );
      const prefixUniqueKey = IN_DEV_MODE
        ? `test-env__${uniqueKey}`
        : uniqueKey;

      // Set file location
      const keyLocation =
        props.accepts === "video/*"
          ? process.env.NEXT_PUBLIC_AWS_LOCATION
          : process.env.NEXT_PUBLIC_AWS_LOCATION_FILES;

      const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || "";
      const fullKey = `${keyLocation}/${prefixUniqueKey}`;

      // Decide between single-part and multipart upload based on file size
      const FILE_SIZE_THRESHOLD = 100 * 1024 * 1024; // 100 MB threshold

      if (selectedFile.size < FILE_SIZE_THRESHOLD) {
        // For smaller files, use simple upload
        const { PutObjectCommand } = await import("@aws-sdk/client-s3");

        setUploadPercentage(10); // Start progress

        const putCommand = new PutObjectCommand({
          Bucket: bucketName,
          Key: fullKey,
          Body: selectedFile,
          ContentType: selectedFile.type,
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
        // 1. Initiate multipart upload
        const { Upload } = await import("@aws-sdk/lib-storage");

        // Create uploader with proper progress tracking
        const upload = new Upload({
          client: s3Client,
          params: {
            Bucket: bucketName,
            Key: fullKey,
            Body: selectedFile,
            ContentType: selectedFile.type,
            ACL: "public-read",
          },
        });

        // Add progress tracking
        upload.on("httpUploadProgress", (progress: any) => {
          const percentage = Math.round(
            (progress.loaded / progress.total) * 100
          );
          setUploadPercentage(percentage);
        });

        // Execute the upload
        await upload.done();
      }

      // Upload completed successfully
      openToast("File Uploaded Successfully!");

      const res: S3UploadResponse = {
        bucket: bucketName,
        title: selectedFile.name,
        key: prefixUniqueKey,
        content_type: selectedFile.type,
        size: selectedFile.size,
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

  // Custom progress bar template
  const progressBarTemplate = () => {
    return (
      <div className="ihub-progress">
        <div
          className="ihub-progress-bar"
          style={{ width: `${uploadPercentage}%` }}
        >
          {uploadPercentage}%
        </div>
      </div>
    );
  };

  // Custom item template
  const handleItemTemplate = () => {
    if (uploadPercentage && uploadPercentage < 100) {
      return (
        <div className="ihub-progress">
          <div
            className="ihub-progress-bar"
            style={{ width: `${uploadPercentage}%` }}
          >
            {uploadPercentage}%
          </div>
        </div>
      );
    } else if (uploadPercentage === 100) {
      return <p>Processing...</p>;
    }
    return null;
  };

  return (
    <div className="ihub-uploader card primereact">
      <h3>{props.headers}</h3>
      <FileUpload
        name="upload"
        customUpload={true}
        accept={props.accepts || "*"}
        maxFileSize={props.maxFileSize || 0}
        onSelect={handleFileChange}
        uploadHandler={handleUpload}
        emptyTemplate={<p className="m-0">{message}</p>}
        onError={() => setMessage("Upload failed, try again!")}
        progressBarTemplate={progressBarTemplate}
        itemTemplate={uploadPercentage ? handleItemTemplate : undefined}
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
