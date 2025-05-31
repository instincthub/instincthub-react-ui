"use client";
import React, { useRef, useState, ChangeEvent } from "react";
import { openToast } from "../lib/modals/modals";

interface FileFieldProps {
  onChange?: (file: File) => void;
  defaultImageUrl?: string;
  label?: string;
  name?: string;
  required?: boolean;
  dataName?: string;
  maxLimit?: number;
  id?: string;
  className?: string;
  acceptedTypes?: string;
  helperText?: string;
}

const FileField: React.FC<FileFieldProps> = ({
  onChange,
  defaultImageUrl,
  label,
  name,
  required,
  dataName,
  maxLimit,
  id,
  className,
  acceptedTypes = "image/*, .pdf, .doc, .docx, .txt",
  helperText,
  ...props
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(defaultImageUrl || "");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Ensure file upload size limit.
    const maxFileSize = (maxLimit || 10) * 1024 * 1024; // 10MB in bytes
    if (file.size > maxFileSize) {
      openToast(`File ${file.name.slice(0, 15)}... exceeds 10MB limit`, 400);
      e.target.value = ""; // Reset the input field
      return; // Stop further processing
    }

    setPreviewUrl(URL.createObjectURL(file));
    if (onChange) {
      onChange(file);
    }
  };

  const isImage =
    defaultImageUrl?.includes(".png") ||
    defaultImageUrl?.includes(".jpg") ||
    defaultImageUrl?.includes(".jpeg");

  return (
    <div className="ihub-file-input-wrapper">
      <div className="ihub-custom-uploader mt-3">
        <div>
          <h4 className="ihub-fs-md">{label}</h4>
          <input
            type="file"
            id={id}
            accept={acceptedTypes}
            name={name}
            ref={fileInputRef}
            required={required}
            onChange={handleFileChange}
            data-name={dataName}
            className={`ihub-file-input ${className || ""}`}
          />
        </div>
      </div>
      {(previewUrl || defaultImageUrl) && isImage ? (
        <img
          src={previewUrl || defaultImageUrl}
          alt="File Preview"
          className="ihub-preview-img"
        />
      ) : (
        (previewUrl || defaultImageUrl) && (
          <a href={previewUrl || defaultImageUrl} className="ihub-file-link">
            {(previewUrl || defaultImageUrl)?.slice(0, 15)}...
          </a>
        )
      )}
    </div>
  );
};

export default FileField;
