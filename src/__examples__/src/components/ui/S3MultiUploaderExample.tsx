"use client";
import React, { useState } from "react";
import { S3MultiUploader } from "../../../../index";
import { S3UploadResponseType, PresignedUploadResult } from "../../../../types";

/**
 * Mock presign function for demo purposes.
 *
 * In a real app, replace this with a call to your server endpoint, e.g.:
 *
 *   const res = await fetch("/api/upload/presign", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ name: file.name, type: file.type, size: file.size }),
 *   });
 *   if (!res.ok) throw new Error("Failed to get upload URL");
 *   return res.json(); // { url, key, cdnUrl, contentType }
 *
 * The server should:
 *   1. Authenticate the request
 *   2. Validate MIME type against an allowlist (ignore file.type — use extension)
 *   3. Enforce size limits via presigned policy (Content-Length-Range)
 *   4. Generate the S3 key (never trust a client-supplied path)
 *   5. Return a short-lived presigned PUT URL (≤ 60 s expiry)
 */
async function mockGetPresignedUrl(file: File): Promise<PresignedUploadResult> {
  // Simulate network latency
  await new Promise((r) => setTimeout(r, 300));

  // In production this comes from your server, never from the client.
  const key = `uploads/demo/${crypto.randomUUID()}-${file.name}`;
  return {
    url: `https://httpbin.org/put`, // httpbin echoes PUT requests — useful for local testing
    key,
    cdnUrl: `https://cdn.example.com/${key}`,
    contentType: file.type || "application/octet-stream",
  };
}

const S3MultiUploaderExample: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<S3UploadResponseType[]>([]);
  const [queueDone, setQueueDone] = useState(false);
  const [errors, setErrors] = useState<{ file: string; message: string }[]>([]);

  const handleFileComplete = (response: S3UploadResponseType) => {
    setUploadedFiles((prev) => [...prev, response]);
    setQueueDone(false);
  };

  const handleQueueComplete = () => setQueueDone(true);

  const handleError = (fileName: string, message: string) => {
    setErrors((prev) => [...prev, { file: fileName, message }]);
  };

  return (
    <section style={{ padding: "6rem 1.5rem 3rem", maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>S3MultiUploader</h1>
      <p style={{ color: "#666", marginBottom: "0.5rem" }}>
        Multi-file queue uploader with per-file progress. Uploads via server-issued
        presigned PUT URLs — no AWS credentials in the browser.
      </p>
      <p style={{
        fontSize: "0.8rem",
        background: "#fff8e1",
        border: "1px solid #ffe082",
        borderRadius: 6,
        padding: "0.5rem 0.75rem",
        marginBottom: "2rem",
        color: "#555",
      }}>
        Demo uses <code>httpbin.org/put</code> as a stand-in presigned URL. In
        production, supply a <code>getPresignedUrl</code> prop that calls your server.
      </p>

      {/* Basic — images, sequential */}
      <section style={{ marginBottom: "3rem" }}>
        <h2>Basic — Images (sequential)</h2>
        <p style={{ fontSize: "0.875rem", color: "#888", marginBottom: "1rem" }}>
          Accepts images only, 10 MB client-side hint, sequential uploads.
        </p>
        <S3MultiUploader
          accepts="image/*"
          maxFileSizeBytes={10 * 1024 * 1024}
          getPresignedUrl={mockGetPresignedUrl}
          label="Drop images here or click to browse"
          hint="PNG, JPG, GIF, WEBP supported"
          onFileComplete={handleFileComplete}
          onQueueComplete={handleQueueComplete}
          onError={handleError}
        />
      </section>

      {/* Parallel + file limit */}
      <section style={{ marginBottom: "3rem" }}>
        <h2>Parallel uploads, file limit</h2>
        <p style={{ fontSize: "0.875rem", color: "#888", marginBottom: "1rem" }}>
          Up to 5 files, 2 concurrent uploads.
        </p>
        <S3MultiUploader
          accepts="video/*,audio/*"
          maxFiles={5}
          concurrency={2}
          maxFileSizeBytes={500 * 1024 * 1024}
          getPresignedUrl={mockGetPresignedUrl}
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
          PDF and Word documents, 50 MB limit.
        </p>
        <S3MultiUploader
          accepts=".pdf,.doc,.docx"
          maxFileSizeBytes={50 * 1024 * 1024}
          getPresignedUrl={mockGetPresignedUrl}
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
          getPresignedUrl={mockGetPresignedUrl}
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
              <pre style={{
                background: "#f4f4f4",
                padding: "1rem",
                borderRadius: 8,
                overflow: "auto",
                fontSize: "0.8rem",
                marginBottom: "1rem",
              }}>
                {JSON.stringify(uploadedFiles, null, 2)}
              </pre>
            </>
          )}

          {errors.length > 0 && (
            <>
              <h3 style={{ marginBottom: "0.5rem", color: "#c00" }}>Errors</h3>
              <ul style={{ color: "#c00" }}>
                {errors.map((e, i) => (
                  <li key={i}><strong>{e.file}</strong>: {e.message}</li>
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
