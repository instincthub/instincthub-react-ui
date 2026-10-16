"use client";

import React, { useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { openToast } from "../../lib/modals/modals";
import type { PresignedUploadResult } from "@/types";
import { presignAndUpload, UPLOADS_NOT_CONFIGURED } from "./presignedPut";

interface S3UploadResponse {
  bucket?: string;
  title: string;
  key: string;
  content_type: string;
  size: number;
  location: string;
}

interface FileUploaderProps {
  /** Function called when files are selected */
  onFilesSelected?: (files: File[]) => void;
  /** Function called when upload is triggered (replaces the built-in upload) */
  onUpload?: (files: File[]) => Promise<void>;
  /**
   * Built-in upload: asks YOUR server for a presigned PUT URL, then uploads
   * straight to the bucket. The browser never holds bucket credentials.
   */
  getPresignedUrl?: (file: File) => Promise<PresignedUploadResult>;
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
  /** @deprecated Ignored since 0.5.0: the server builds the object key. */
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

    if (!props.getPresignedUrl) {
      console.error(UPLOADS_NOT_CONFIGURED);
      openToast("Uploads are not configured.", 400);
      return;
    }

    // The built-in upload sends the first file
    const fileToUpload = filesToUpload[0];

    try {
      const presigned = await presignAndUpload(
        fileToUpload,
        props.getPresignedUrl,
        setUploadPercentage
      );
      setUploadPercentage(100);
      openToast("File Uploaded Successfully!");

      const res: S3UploadResponse = {
        title: fileToUpload.name,
        key: presigned.key,
        content_type: presigned.contentType,
        size: fileToUpload.size,
        location: presigned.cdnUrl,
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
