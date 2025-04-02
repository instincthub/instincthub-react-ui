"use client";
import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import { FILE_URL, IN_DEV_MODE, slugifyFileName } from "../../lib/helpFunction";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { openToast } from "../../lib/modals";
import { FileUploaderType, S3UploadResponseType } from "src/types";


/**
 * A modern file uploader component with drag and drop support
 */
export default function IhubFileUploader({
  header,
  label = "Drag and drop files here or click to browse",
  accept = "*",
  maxFileSize = 0,
  name = "upload",
  module = "",
  step = "",
  username = null,
  onUploadComplete,
  setValues,
  setModules,
  setSteps,
  className = "",
}: FileUploaderType) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadPercentage, setUploadPercentage] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Check if file size exceeds the limit
  const checkFileSize = (file: File): boolean => {
    if (maxFileSize && file.size > maxFileSize) {
      const maxSizeFormatted = formatFileSize(maxFileSize);
      setErrorMessage(
        `File size exceeds the maximum limit of ${maxSizeFormatted}`
      );
      return false;
    }
    return true;
  };

  // Check if file type is accepted
  const checkFileType = (file: File): boolean => {
    if (accept === "*") return true;

    const fileType = file.type;
    const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;

    const acceptedTypes = accept.split(",").map((type) => type.trim());

    // Check if any accepted type matches
    const isAccepted = acceptedTypes.some((type) => {
      if (type.startsWith(".")) {
        // Extension check
        return fileExtension === type.toLowerCase();
      } else if (type.endsWith("/*")) {
        // MIME type category check (e.g., 'image/*')
        const category = type.replace("/*", "");
        return fileType.startsWith(`${category}/`);
      } else {
        // Exact MIME type check
        return fileType === type;
      }
    });

    if (!isAccepted) {
      setErrorMessage(
        `File type not accepted. Please upload a file matching: ${accept}`
      );
      return false;
    }

    return true;
  };

  // Handle file selection
  const handleFileSelect = (file: File): void => {
    setErrorMessage("");

    if (!checkFileType(file) || !checkFileSize(file)) {
      return;
    }

    setSelectedFile(file);
    setUploadStatus("idle");
    setUploadPercentage(0);
  };

  // Handle file input change
  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // Handle file drop
  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // Handle drag events
  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  // Trigger file input click
  const handleBrowseClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file upload
  const handleUpload = async (): Promise<void> => {
    if (!selectedFile) {
      setErrorMessage("Please select a file first");
      return;
    }

    setUploadStatus("uploading");
    setErrorMessage("");

    try {
      // Initialize S3 client
      const s3Client = new S3Client({
        region: process.env.NEXT_PUBLIC_AWS_REGION,
        endpoint: process.env.NEXT_PUBLIC_AWS_S3_ENDPOINT_URL,
        requestChecksumCalculation: "WHEN_REQUIRED",
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
        },
      });

      // Create unique key for the file
      const timestamp = new Date().toISOString();
      const uniqueKey = slugifyFileName(
        `${username || "anonymous"}-${timestamp}-${selectedFile.name}`
      );
      const prefixUniqueKey = IN_DEV_MODE
        ? `test-env__${uniqueKey}`
        : uniqueKey;

      // Set file location
      const keyLocation =
        accept === "video/*"
          ? process.env.NEXT_PUBLIC_AWS_LOCATION
          : process.env.NEXT_PUBLIC_AWS_LOCATION_FILES;

      const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || "";
      const fullKey = `${keyLocation}/${prefixUniqueKey}`;

      // Decide between single-part and multipart upload based on file size
      const FILE_SIZE_THRESHOLD = 100 * 1024 * 1024; // 100 MB threshold

      if (selectedFile.size < FILE_SIZE_THRESHOLD) {
        // For smaller files, use simple upload
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
      setUploadStatus("success");
      openToast("File Uploaded Successfully!");

      const response: S3UploadResponseType = {
        bucket: bucketName,
        title: selectedFile.name,
        key: prefixUniqueKey,
        content_type: selectedFile.type,
        size: selectedFile.size,
        location: `${FILE_URL}creators/${prefixUniqueKey}`,
      };

      // Call the appropriate callbacks
      if (onUploadComplete) onUploadComplete(response);
      if (setValues) setValues(name, response.key);
      if (setModules) setModules(module, name, response.key);
      if (setSteps) setSteps(module, step, name, response.key);

      // Reset after successful upload
      setTimeout(() => {
        setSelectedFile(null);
        setUploadStatus("idle");
        setUploadPercentage(0);
      }, 3000);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("error");
      setErrorMessage("Error uploading file. Please try again.");
      openToast("Error uploading file!", 400);
      setUploadPercentage(0);
    }
  };

  // Cancel the upload and reset
  const handleCancel = (): void => {
    setSelectedFile(null);
    setUploadStatus("idle");
    setUploadPercentage(0);
    setErrorMessage("");
  };

  return (
    <div className={`ihub-uploader ${className}`}>
      {header && <h3 className="ihub-uploader-header">{header}</h3>}

      <div className="ihub-uploader-container">
        {/* Drag and drop area */}
        {!selectedFile && (
          <div
            className={`ihub-uploader-dropzone ${
              isDragging ? "ihub-uploader-dropzone-active" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleBrowseClick}
          >
            <div className="ihub-uploader-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            <p className="ihub-uploader-text">{label}</p>
            <p className="ihub-uploader-hint">
              {maxFileSize > 0 &&
                `Maximum file size: ${formatFileSize(maxFileSize)}`}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileInputChange}
              className="ihub-uploader-input"
            />
          </div>
        )}

        {/* File preview and upload controls */}
        {selectedFile && (
          <div className="ihub-uploader-preview">
            <div className="ihub-uploader-file-info">
              <div className="ihub-uploader-file-icon">
                {selectedFile.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt={selectedFile.name}
                    className="ihub-uploader-thumbnail"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                )}
              </div>
              <div className="ihub-uploader-file-details">
                <p className="ihub-uploader-file-name">{selectedFile.name}</p>
                <p className="ihub-uploader-file-size">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            {uploadStatus === "uploading" && (
              <div className="ihub-uploader-progress">
                <div
                  className="ihub-uploader-progress-bar"
                  style={{ width: `${uploadPercentage}%` }}
                >
                  <span className="ihub-uploader-progress-text">
                    {uploadPercentage}%
                  </span>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="ihub-uploader-actions">
              {uploadStatus === "idle" && (
                <>
                  <button
                    className="ihub-uploader-upload-btn ihub-important-btn"
                    onClick={handleUpload}
                  >
                    Upload
                  </button>
                  <button
                    className="ihub-uploader-cancel-btn outlined-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </>
              )}

              {uploadStatus === "uploading" && (
                <button
                  className="ihub-uploader-cancel-btn outlined-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}

              {uploadStatus === "success" && (
                <div className="ihub-uploader-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Upload Complete</span>
                </div>
              )}

              {uploadStatus === "error" && (
                <>
                  <button
                    className="ihub-uploader-retry-btn ihub-important-btn"
                    onClick={handleUpload}
                  >
                    Retry
                  </button>
                  <button
                    className="ihub-uploader-cancel-btn outlined-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="ihub-uploader-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
