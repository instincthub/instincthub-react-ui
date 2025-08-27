"use client";
import React, { useCallback, useState } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";

interface DropFileProps {
  /** Function called when file is dropped */
  onDrop: (file: File) => void;
  /** Label text to display in drop zone */
  label?: string;
  /** Array of accepted file extensions (e.g., [".xlsx", ".csv"]) */
  acceptedTypes?: string[];
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Template download URL */
  tmplateUrl?: string;
  /** Function called when template download button is clicked */
  onTemplateDownload?: () => void;
  /** Allow multiple files */
  multiple?: boolean;
  /** Custom className */
  className?: string;
}

const DropFile: React.FC<DropFileProps> = ({
  onDrop,
  label,
  acceptedTypes,
  maxSize,
  tmplateUrl = "https://github.com/instincthub/images/raw/main/leadcontact_upload_template.xlsx",
  onTemplateDownload,
  multiple = false,
  className = "",
}) => {
  const [fileName, setFileName] = useState<string>("");

  const onDropAccepted = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setFileName(file.name);
      onDrop(file);
    },
    [onDrop]
  );

  // Convert acceptedTypes to dropzone accept format
  const getAcceptObject = () => {
    if (!acceptedTypes || acceptedTypes.length === 0) {
      return {
        "application/vnd.ms-excel": [".xlsx", ".xls"],
        "text/csv": [".csv"],
      };
    }

    const acceptObject: Record<string, string[]> = {};
    acceptedTypes.forEach(ext => {
      const mimeType = getMimeType(ext);
      if (mimeType) {
        if (!acceptObject[mimeType]) {
          acceptObject[mimeType] = [];
        }
        acceptObject[mimeType].push(ext);
      }
    });
    return acceptObject;
  };

  // Helper function to get MIME type from extension
  const getMimeType = (extension: string): string => {
    const mimeTypes: Record<string, string> = {
      '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      '.xls': 'application/vnd.ms-excel',
      '.csv': 'text/csv',
      '.pdf': 'application/pdf',
      '.doc': 'application/msword',
      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.txt': 'text/plain',
      '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    };
    return mimeTypes[extension.toLowerCase()] || 'application/octet-stream';
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    accept: getAcceptObject(),
    maxFiles: multiple ? undefined : 1,
    maxSize: maxSize,
  } as DropzoneOptions);

  const getDefaultMessage = () => {
    const extensions = acceptedTypes?.join(', ') || '.xlsx, .xls, .csv';
    return `Drag 'n' drop "${extensions}" files here, or click to select files`;
  };

  return (
    <div className={`ihub-dropzone ${className}`}>
      <div {...getRootProps()} className="ihub-dropzone-wrap">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>
            {label || getDefaultMessage()}
          </p>
        )}

        {fileName && <p>File: {fileName}</p>}
      </div>
      {!fileName && (onTemplateDownload || tmplateUrl) && (
        <div className="ihub-download-template">
          <p>
            PS: Existing contact will be update while new contacts will be
            created.
          </p>
          {onTemplateDownload ? (
            <button 
              type="button"
              onClick={onTemplateDownload}
              className="ihub-template-download-btn"
            >
              Download Template
            </button>
          ) : (
            <a href={tmplateUrl}>Download Template</a>
          )}
        </div>
      )}
    </div>
  );
};

export default DropFile;
