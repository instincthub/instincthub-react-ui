"use client";
import React, { useState } from "react";
import { S3MultiUploader } from "../../../../index";
import { S3UploadResponseType } from "../../../../types";

const S3MultiUploaderExample: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<S3UploadResponseType[]>([]);
  const [queueDone, setQueueDone] = useState(false);
  const [errors, setErrors] = useState<{ file: string; message: string }[]>([]);

  const handleFileComplete = (response: S3UploadResponseType) => {
    setUploadedFiles((prev) => [...prev, response]);
    setQueueDone(false);
  };

  const handleQueueComplete = () => {
    setQueueDone(true);
  };

  const handleError = (fileName: string, message: string) => {
    setErrors((prev) => [...prev, { file: fileName, message }]);
  };

  return (
    <section style={{ padding: "6rem 1.5rem 3rem", maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>S3MultiUploader</h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        Multi-file queue uploader with per-file progress. Uploads directly to S3
        via <code>@aws-sdk/lib-storage</code> (multipart, real progress). Requires
        <code>NEXT_PUBLIC_AWS_*</code> environment variables.
      </p>

      {/* Basic — image upload, sequential */}
      <section style={{ marginBottom: "3rem" }}>
        <h2>Basic — Images (sequential)</h2>
        <p style={{ fontSize: "0.875rem", color: "#888", marginBottom: "1rem" }}>
          Accepts images only, 10 MB limit per file, sequential uploads.
        </p>
        <S3MultiUploader
          accepts="image/*"
          maxFileSizeBytes={10 * 1024 * 1024}
          username="demo-user"
          location="uploads/images"
          cdnBase={process.env.NEXT_PUBLIC_VIDEO_URL || "https://cdn.example.com/"}
          label="Drop images here or click to browse"
          hint="PNG, JPG, GIF, WEBP supported"
          onFileComplete={handleFileComplete}
          onQueueComplete={handleQueueComplete}
          onError={handleError}
        />
      </section>

      {/* With maxFiles + concurrency */}
      <section style={{ marginBottom: "3rem" }}>
        <h2>Parallel uploads, file limit</h2>
        <p style={{ fontSize: "0.875rem", color: "#888", marginBottom: "1rem" }}>
          Up to 5 files, 2 uploads at a time.
        </p>
        <S3MultiUploader
          accepts="video/*,audio/*"
          maxFiles={5}
          concurrency={2}
          maxFileSizeBytes={500 * 1024 * 1024}
          username="demo-user"
          location="uploads/media"
          cdnBase={process.env.NEXT_PUBLIC_VIDEO_URL || "https://cdn.example.com/"}
          label="Drop video or audio files (max 5)"
          hint="MP4, MOV, MP3, WAV — up to 500 MB each"
          onFileComplete={handleFileComplete}
          onQueueComplete={handleQueueComplete}
          onError={handleError}
        />
      </section>

      {/* Documents */}
      <section style={{ marginBottom: "3rem" }}>
        <h2>Documents</h2>
        <p style={{ fontSize: "0.875rem", color: "#888", marginBottom: "1rem" }}>
          PDF and Word documents only, 50 MB limit.
        </p>
        <S3MultiUploader
          accepts=".pdf,.doc,.docx"
          maxFileSizeBytes={50 * 1024 * 1024}
          username="demo-user"
          location="uploads/docs"
          cdnBase={process.env.NEXT_PUBLIC_VIDEO_URL || "https://cdn.example.com/"}
          label="Drop documents here"
          hint="PDF, DOC, DOCX — up to 50 MB each"
          onFileComplete={handleFileComplete}
          onQueueComplete={handleQueueComplete}
          onError={handleError}
        />
      </section>

      {/* Disabled state */}
      <section style={{ marginBottom: "3rem" }}>
        <h2>Disabled state</h2>
        <S3MultiUploader
          accepts="*/*"
          disabled
          username="demo-user"
          location="uploads/misc"
          cdnBase={process.env.NEXT_PUBLIC_VIDEO_URL || "https://cdn.example.com/"}
          label="Uploader is disabled"
          onFileComplete={() => {}}
        />
      </section>

      {/* Callback log */}
      {(uploadedFiles.length > 0 || errors.length > 0) && (
        <section style={{ marginBottom: "3rem" }}>
          <h2>Callback log</h2>

          {queueDone && (
            <p style={{ color: "green", marginBottom: "1rem" }}>
              ✓ onQueueComplete fired — all files processed.
            </p>
          )}

          {uploadedFiles.length > 0 && (
            <>
              <h3 style={{ marginBottom: "0.5rem" }}>onFileComplete responses</h3>
              <pre
                style={{
                  background: "#f4f4f4",
                  padding: "1rem",
                  borderRadius: 8,
                  overflow: "auto",
                  fontSize: "0.8rem",
                  marginBottom: "1rem",
                }}
              >
                {JSON.stringify(uploadedFiles, null, 2)}
              </pre>
            </>
          )}

          {errors.length > 0 && (
            <>
              <h3 style={{ marginBottom: "0.5rem", color: "#c00" }}>Errors</h3>
              <ul style={{ color: "#c00" }}>
                {errors.map((e, i) => (
                  <li key={i}>
                    <strong>{e.file}</strong>: {e.message}
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      )}
    </section>
  );
};

export default S3MultiUploaderExample;
