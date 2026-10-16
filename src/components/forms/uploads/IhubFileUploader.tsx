"use client";
import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import { reqOptions } from "../../lib/helpFunction";
import { openToast } from "../../lib/modals/modals";
import { presignAndUpload, UPLOADS_NOT_CONFIGURED } from "./presignedPut";
import { FileUploaderType, S3UploadResponseType } from "@/types";

interface UploadedFile {
  response: S3UploadResponseType;
  dbId?: string;
}

/**
 * A modern file uploader component with drag and drop support.
 *
 * Uploads straight to the bucket with a presigned PUT URL from the
 * consumer's `getPresignedUrl` (the browser never holds bucket keys),
 * optionally saves a DB record, and on remove deletes the record and calls
 * `deleteFile` so the consumer's server can delete the object.
 */
export default function IhubFileUploader({
  header,
  label = "Drag and drop files here or click to browse",
  accept = "*",
  maxFileSize = 0,
  name = "upload",
  module = "",
  step = "",
  onUploadComplete,
  setValues,
  setModules,
  setSteps,
  className = "",
  // DB + S3 lifecycle props
  saveEndpoint,
  deleteEndpoint,
  token,
  getPresignedUrl,
  deleteFile,
  onRemove,
}: FileUploaderType) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadPercentage, setUploadPercentage] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const checkFileSize = (file: File): boolean => {
    if (maxFileSize && file.size > maxFileSize) {
      setErrorMessage(
        `File size exceeds the maximum limit of ${formatFileSize(maxFileSize)}`
      );
      return false;
    }
    return true;
  };

  const checkFileType = (file: File): boolean => {
    if (accept === "*") return true;
    const fileType = file.type;
    const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
    const acceptedTypes = accept.split(",").map((type) => type.trim());
    const isAccepted = acceptedTypes.some((type) => {
      if (type.startsWith(".")) return fileExtension === type.toLowerCase();
      if (type.endsWith("/*")) return fileType.startsWith(`${type.replace("/*", "")}/`);
      return fileType === type;
    });
    if (!isAccepted) {
      setErrorMessage(`File type not accepted. Please upload: ${accept}`);
      return false;
    }
    return true;
  };

  const handleFileSelect = (file: File): void => {
    setErrorMessage("");
    if (!checkFileType(file) || !checkFileSize(file)) return;
    setSelectedFile(file);
    setUploadStatus("idle");
    setUploadPercentage(0);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files && files.length > 0) handleFileSelect(files[0]);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) handleFileSelect(files[0]);
  };

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

  const handleBrowseClick = (): void => {
    fileInputRef.current?.click();
  };

  /**
   * Save uploaded file record to DB via API endpoint.
   */
  const saveToDb = async (
    response: S3UploadResponseType
  ): Promise<string | null> => {
    if (!saveEndpoint || !token) return null;
    try {
      const payload = JSON.stringify({
        file_url: response.location,
        file_key: response.key,
        file_name: response.title,
        file_size: response.size,
        content_type: response.content_type,
        media_type: response.content_type?.startsWith("video/")
          ? "video"
          : "image",
      });
      const options = reqOptions("POST", payload, token, "json");
      const res = await fetch(saveEndpoint, options);
      if (res.ok) {
        const data = await res.json();
        return data.id;
      }
      console.error("Save to DB failed:", res.status, await res.text());
    } catch (err) {
      console.error("Save to DB error:", err);
    }
    return null;
  };

  /**
   * Delete file from DB via API endpoint.
   */
  const deleteFromDb = async (dbId: string): Promise<boolean> => {
    if (!deleteEndpoint || !token) return false;
    try {
      const options = reqOptions("DELETE", null, token);
      const res = await fetch(`${deleteEndpoint}${dbId}/`, options);
      return res.ok || res.status === 404;
    } catch (err) {
      console.error("DB delete error:", err);
      return false;
    }
  };

  /**
   * Remove an uploaded file: DB delete → S3 delete → UI remove.
   */
  const handleRemoveFile = async (index: number): Promise<void> => {
    const file = uploadedFiles[index];
    if (!file) return;

    // 1. Delete from DB
    if (file.dbId && deleteEndpoint) {
      await deleteFromDb(file.dbId);
    }

    // 2. Delete the object through the consumer's server
    if (deleteFile) {
      try {
        await deleteFile(file.response);
      } catch (err) {
        console.error("File delete error:", err);
      }
    }

    // 3. Remove from UI
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));

    // 4. Notify parent
    if (onRemove) onRemove(file.response);
    openToast("File removed");
  };

  const handleUpload = async (): Promise<void> => {
    if (!selectedFile) {
      setErrorMessage("Please select a file first");
      return;
    }

    setUploadStatus("uploading");
    setErrorMessage("");

    if (!getPresignedUrl) {
      console.error(UPLOADS_NOT_CONFIGURED);
      setUploadStatus("error");
      setErrorMessage("Uploads are not configured.");
      return;
    }

    try {
      const presigned = await presignAndUpload(
        selectedFile,
        getPresignedUrl,
        setUploadPercentage
      );
      setUploadPercentage(100);
      setUploadStatus("success");
      openToast("File Uploaded Successfully!");

      const response: S3UploadResponseType = {
        title: selectedFile.name,
        key: presigned.key,
        content_type: presigned.contentType,
        size: selectedFile.size,
        location: presigned.cdnUrl,
      };

      // Save to DB if endpoint provided
      let dbId: string | undefined;
      if (saveEndpoint && token) {
        const id = await saveToDb(response);
        if (id) dbId = id;
      }

      // Track uploaded file for removal
      setUploadedFiles((prev) => [...prev, { response, dbId }]);

      // Call callbacks
      if (onUploadComplete) onUploadComplete(response);
      if (setValues) setValues(name, response.key);
      if (setModules) setModules(module, name, response.key);
      if (setSteps) setSteps(module, step, name, response.key);

      // Reset file selection
      setTimeout(() => {
        setSelectedFile(null);
        setUploadStatus("idle");
        setUploadPercentage(0);
      }, 2000);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("error");
      setErrorMessage("Error uploading file. Please try again.");
      openToast("Error uploading file!", 400);
      setUploadPercentage(0);
    }
  };

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
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Upload Complete</span>
                </div>
              )}
              {uploadStatus === "error" && (
                <>
                  <button className="ihub-uploader-retry-btn ihub-important-btn" onClick={handleUpload}>Retry</button>
                  <button className="ihub-uploader-cancel-btn outlined-btn" onClick={handleCancel}>Cancel</button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Uploaded files — compact thumbnail grid */}
        {uploadedFiles.length > 0 && (
          <div className="ihub-uploader-thumbs">
            {uploadedFiles.map((file, index) => {
              const isVideo = file.response.content_type?.startsWith("video/");
              return (
                <div key={index} className="ihub-uploader-thumb">
                  <div
                    className="ihub-uploader-thumb-preview"
                    onClick={() => setLightboxIndex(index)}
                    title="Click to preview"
                  >
                    {isVideo ? (
                      <video src={file.response.location} muted />
                    ) : (
                      <img src={file.response.location} alt={file.response.title} />
                    )}
                    {isVideo && (
                      <span className="ihub-uploader-thumb-badge">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="ihub-uploader-thumb-remove"
                    onClick={(e) => { e.stopPropagation(); handleRemoveFile(index); }}
                    title="Remove"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Lightbox modal */}
        {lightboxIndex !== null && uploadedFiles[lightboxIndex] && (
          <div className="ihub-uploader-lightbox" onClick={() => setLightboxIndex(null)}>
            <div className="ihub-uploader-lightbox-content" onClick={(e) => e.stopPropagation()}>
              {/* Close */}
              <button className="ihub-uploader-lightbox-close" onClick={() => setLightboxIndex(null)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Prev */}
              {lightboxIndex > 0 && (
                <button className="ihub-uploader-lightbox-nav ihub-uploader-lightbox-prev" onClick={() => setLightboxIndex(lightboxIndex - 1)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
              )}

              {/* Media */}
              <div className="ihub-uploader-lightbox-media">
                {uploadedFiles[lightboxIndex].response.content_type?.startsWith("video/") ? (
                  <video src={uploadedFiles[lightboxIndex].response.location} controls autoPlay />
                ) : (
                  <img src={uploadedFiles[lightboxIndex].response.location} alt={uploadedFiles[lightboxIndex].response.title} />
                )}
              </div>

              {/* Next */}
              {lightboxIndex < uploadedFiles.length - 1 && (
                <button className="ihub-uploader-lightbox-nav ihub-uploader-lightbox-next" onClick={() => setLightboxIndex(lightboxIndex + 1)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              )}

              {/* Info bar */}
              <div className="ihub-uploader-lightbox-info">
                <span>{uploadedFiles[lightboxIndex].response.title}</span>
                <span>{lightboxIndex + 1} / {uploadedFiles.length}</span>
              </div>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="ihub-uploader-error">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
