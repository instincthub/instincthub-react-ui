"use client";
import React, { useRef, useState, ChangeEvent } from "react";
import { openToast } from "../lib/modals/modals";

/**
 * Props for the FileField component
 */
interface FileFieldProps {
  /**
   * Callback function triggered when a file is selected
   * @param file - The selected File object
   */
  onChange?: (file: File) => void;
  
  /**
   * Default image URL to display as preview
   */
  defaultImageUrl?: string;
  
  /**
   * Label text displayed above the file input
   */
  label?: string;
  
  /**
   * Name attribute for the file input element
   */
  name?: string;
  
  /**
   * Whether the file input is required
   * @default false
   */
  required?: boolean;
  
  /**
   * Data name attribute for the file input
   */
  dataName?: string;
  
  /**
   * Maximum file size limit in megabytes
   * @default 10
   */
  maxLimit?: number;
  
  /**
   * ID attribute for the file input element
   */
  id?: string;
  
  /**
   * Additional CSS classes to apply to the file input
   */
  className?: string;
  
  /**
   * Accepted file types (MIME types and extensions)
   * @default "image/*, .pdf, .doc, .docx, .txt"
   */
  acceptedTypes?: string;
  
  /**
   * Helper text displayed below the input (currently unused in implementation)
   */
  helperText?: string;
}

/**
 * FileField component for file upload with preview functionality
 * 
 * Provides a file input field with automatic preview generation for images
 * and file size validation. Supports various file types and displays 
 * appropriate previews based on file type.
 * 
 * @param props - The component props
 * @returns A file input component with preview capabilities
 * 
 * @example
 * ```tsx
 * <FileField
 *   label="Upload Document"
 *   onChange={(file) => console.log('Selected file:', file)}
 *   maxLimit={5}
 *   acceptedTypes="image/*, .pdf"
 *   required
 * />
 * ```
 */
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
  /** Reference to the file input element for programmatic access */
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  /** State to manage the preview URL for the selected file */
  const [previewUrl, setPreviewUrl] = useState<string>(defaultImageUrl || "");

  /**
   * Handles file selection and validation
   * 
   * Validates file size against the specified limit, creates preview URL
   * for valid files, and triggers the onChange callback.
   * 
   * @param e - The change event from the file input
   */
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

  /** 
   * Determines if the default image URL represents an image file
   * based on common image file extensions
   */
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
