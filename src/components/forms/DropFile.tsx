"use client";
import React, { useCallback, useState } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";

interface DropFileProps {
  onDrop: (file: File) => void;
  tmplateUrl: string;
}

const DropFile: React.FC<DropFileProps> = ({
  onDrop,
  tmplateUrl = "https://github.com/instincthub/images/raw/main/leadcontact_upload_template.xlsx",
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    accept: {
      "application/vnd.ms-excel": [".xlsx", ".xls"],
      "text/csv": [".csv"],
    },
    maxFiles: 1,
  } as DropzoneOptions);

  return (
    <div className="ihub-dropzone">
      <div {...getRootProps()} className="ihub-dropzone-wrap">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>
            Drag 'n' drop ".xlsx, .xls, .csv" files here, or click to select
            files
          </p>
        )}

        {fileName && <p>File: {fileName}</p>}
      </div>
      {!fileName && (
        <div className="ihub-download-template">
          <p>
            PS: Existing contact will be update while new contacts will be
            created.
          </p>
          <a href={tmplateUrl}>Download Template</a>
        </div>
      )}
    </div>
  );
};

export default DropFile;
