import React, { useRef, useState, ChangeEvent } from "react";
import { openToast } from "../lib/modals/modals";

interface FileFieldProps {
  onChange?: (file: File) => void;
  defaultImageUrl?: string;
  labels?: string;
  names?: string;
  requireds?: boolean;
  dataNames?: string;
  maxLimit?: number;
}

const FileField: React.FC<FileFieldProps> = ({
  onChange,
  defaultImageUrl,
  labels,
  names,
  requireds,
  dataNames,
  maxLimit,
  ...props
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(defaultImageUrl || "");
  const [inputName, setInputName] = useState<string | undefined>();

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

    // disable file name if on PUT if not updated
    if (file) {
      setInputName(names);
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
          <h4>{labels}</h4>
          <input
            type="file"
            id="upload"
            name={inputName}
            ref={fileInputRef}
            required={requireds}
            onChange={handleFileChange}
            data-name={dataNames}
            className="ihub-file-input"
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
