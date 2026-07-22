"use client";

import React, { useState, useRef, useCallback, DragEvent, ChangeEvent } from "react";
import { openToast } from "../../lib/modals/modals";
import { S3MultiUploaderProps, S3UploadResponseType } from "@/types";

interface QueueItem {
  id: string;
  file: File;
  status: "queued" | "uploading" | "complete" | "error";
  progress: number;
  error?: string;
}

const formatSize = (b: number) =>
  b < 1024 * 1024
    ? `${(b / 1024).toFixed(0)} KB`
    : `${(b / (1024 * 1024)).toFixed(1)} MB`;

// Inline SVG icons (no external icon-lib dependency in the npm package)
const UploadIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
  </svg>
);

const SearchIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const SpinnerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="spin">
    <line x1="12" y1="2" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="22" />
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
    <line x1="2" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const AlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const XIcon = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/**
 * Upload a single file to a presigned PUT URL, reporting progress via XHR.
 * The server is responsible for issuing the URL with appropriate constraints
 * (Content-Type, Content-Length-Range, expiry, scoped key).
 */
function uploadToPresignedUrl(
  url: string,
  file: File,
  contentType: string,
  onProgress: (pct: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`Upload failed: HTTP ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.ontimeout = () => reject(new Error("Upload timed out"));

    xhr.open("PUT", url);
    // Use the server-validated content type — never trust file.type alone.
    xhr.setRequestHeader("Content-Type", contentType);
    xhr.send(file);
  });
}

/**
 * S3MultiUploader — multi-file queue uploader with per-file progress.
 *
 * Security model: this component never touches AWS credentials. It calls
 * `getPresignedUrl(file)` — a consumer-supplied async function that must
 * hit a server endpoint. The server validates the request (auth, MIME,
 * size, location) and returns a short-lived presigned PUT URL together
 * with the resolved object key and CDN URL.
 *
 * Example server route (Next.js API):
 *
 *   POST /api/upload/presign
 *   Body: { name, type, size }
 *   → { url, key, cdnUrl }  (url = S3 presigned PUT, expires in 60s)
 *
 * CSS: import "@instincthub/react-ui/assets/css/forms/s3-multi-uploader.css"
 */
export default function S3MultiUploader({
  accepts,
  maxFileSizeBytes = 524_288_000,
  maxFiles,
  concurrency = 1,
  getPresignedUrl,
  label = "Drop files here or click to browse",
  hint,
  onFileComplete,
  onQueueComplete,
  onError,
  disabled = false,
  className = "",
}: S3MultiUploaderProps) {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [dragging, setDragging] = useState(false);
  const [queueFilter, setQueueFilter] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const inFlight = useRef(0);
  const queueRef = useRef<QueueItem[]>([]);
  queueRef.current = queue;

  const clampedConcurrency = Math.min(Math.max(concurrency, 1), 4);

  const updateItem = useCallback((id: string, patch: Partial<QueueItem>) => {
    setQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );
  }, []);

  const uploadOne = useCallback(
    async (item: QueueItem) => {
      updateItem(item.id, { status: "uploading", progress: 0 });

      try {
        // Server validates auth, MIME, size, and path — returns a scoped, short-lived URL.
        const { url, key, cdnUrl, contentType } = await getPresignedUrl(item.file);

        await uploadToPresignedUrl(url, item.file, contentType, (pct) => {
          updateItem(item.id, { progress: pct });
        });

        const response: S3UploadResponseType = {
          title: item.file.name,
          key,
          content_type: contentType,
          size: item.file.size,
          location: cdnUrl,
        };

        updateItem(item.id, { status: "complete", progress: 100 });
        onFileComplete(response);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Upload failed";
        updateItem(item.id, { status: "error", error: msg });
        onError?.(item.file.name, msg);
      }
    },
    [getPresignedUrl, updateItem, onFileComplete, onError]
  );

  const tick = useCallback(async () => {
    if (inFlight.current >= clampedConcurrency) return;

    const next = queueRef.current.find((i) => i.status === "queued");
    if (!next) {
      if (inFlight.current === 0 && queueRef.current.length > 0) {
        const allDone = queueRef.current.every(
          (i) => i.status === "complete" || i.status === "error"
        );
        if (allDone) onQueueComplete?.();
      }
      return;
    }

    inFlight.current += 1;
    await uploadOne(next);
    inFlight.current -= 1;

    tick();
  }, [clampedConcurrency, uploadOne, onQueueComplete]);

  const enqueue = useCallback(
    (files: File[]) => {
      let valid = files.filter((f) => f.size <= maxFileSizeBytes);

      if (maxFiles && maxFiles > 0) {
        const currentCount = queueRef.current.length;
        const remaining = maxFiles - currentCount;
        if (remaining <= 0) {
          openToast(`Maximum ${maxFiles} file${maxFiles !== 1 ? "s" : ""} allowed`, 400);
          return;
        }
        if (valid.length > remaining) {
          openToast(
            `Only ${remaining} more file${remaining !== 1 ? "s" : ""} allowed (limit: ${maxFiles}). First ${remaining} selected.`,
            400
          );
          valid = valid.slice(0, remaining);
        }
      }

      if (!valid.length) return;

      const newItems: QueueItem[] = valid.map((file) => ({
        id: crypto.randomUUID(),
        file,
        status: "queued",
        progress: 0,
      }));

      setQueue((prev) => {
        const next = [...prev, ...newItems];
        queueRef.current = next;
        for (let i = 0; i < clampedConcurrency; i++) setTimeout(tick, 0);
        return next;
      });
    },
    [maxFileSizeBytes, maxFiles, clampedConcurrency, tick]
  );

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (!disabled) enqueue(Array.from(e.dataTransfer.files));
  };

  const onFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) enqueue(Array.from(e.target.files));
    e.target.value = "";
  };

  const removeItem = (id: string) => {
    setQueue((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCompleted = () => {
    setQueue((prev) => prev.filter((item) => item.status !== "complete"));
  };

  const completedCount = queue.filter((i) => i.status === "complete").length;
  const hasActive = queue.some(
    (i) => i.status === "uploading" || i.status === "queued"
  );

  const visibleQueue = queueFilter
    ? queue.filter((i) =>
        i.file.name.toLowerCase().includes(queueFilter.toLowerCase())
      )
    : queue;

  return (
    <div className={`s3mu-root${disabled ? " s3mu-disabled" : ""} ${className}`.trim()}>
      {/* Drop zone */}
      <div
        className={`s3mu-dropzone${dragging ? " dragging" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => !disabled && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accepts}
          multiple
          disabled={disabled}
          style={{ display: "none" }}
          onChange={onFileInput}
        />
        <div className="s3mu-drop-icon">
          <UploadIcon />
        </div>
        <p className="s3mu-drop-label">{label}</p>
        {hint && <p className="s3mu-drop-hint">{hint}</p>}
        <p className="s3mu-drop-hint">Max {formatSize(maxFileSizeBytes)} per file</p>
        {maxFiles && maxFiles > 0 && (
          <span className="s3mu-maxfiles-badge">
            Up to {maxFiles} file{maxFiles !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Queue */}
      {queue.length > 0 && (
        <div className="s3mu-queue">
          <div className="s3mu-queue-header">
            <span>
              {queueFilter && visibleQueue.length !== queue.length
                ? `${visibleQueue.length} of ${queue.length} file${queue.length !== 1 ? "s" : ""}`
                : `${queue.length} file${queue.length !== 1 ? "s" : ""}`}
            </span>
            {completedCount > 0 && !hasActive && (
              <button
                type="button"
                className="s3mu-clear-btn"
                onClick={clearCompleted}
              >
                Clear completed
              </button>
            )}
          </div>

          {queue.length >= 5 && (
            <div className="s3mu-filter">
              <SearchIcon />
              <input
                type="text"
                placeholder="Filter files…"
                value={queueFilter}
                onChange={(e) => setQueueFilter(e.target.value)}
              />
            </div>
          )}

          {visibleQueue.map((item) => (
            <div
              key={item.id}
              className={`s3mu-item s3mu-item--${item.status}`}
            >
              <div className="s3mu-item-icon">
                {item.status === "complete" && <CheckIcon />}
                {item.status === "error" && <AlertIcon />}
                {item.status === "uploading" && <SpinnerIcon />}
                {item.status === "queued" && <div className="s3mu-queued-dot" />}
              </div>

              <div className="s3mu-item-body">
                <div className="s3mu-item-name-row">
                  <span className="s3mu-item-name" title={item.file.name}>
                    {item.file.name}
                  </span>
                  <span className="s3mu-item-size">
                    {formatSize(item.file.size)}
                  </span>
                </div>

                {(item.status === "uploading" || item.status === "complete") && (
                  <div className="s3mu-bar-wrap">
                    <div
                      className="s3mu-bar-fill"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                )}

                {item.status === "uploading" && (
                  <span className="s3mu-item-pct">{item.progress}%</span>
                )}
                {item.status === "error" && (
                  <span className="s3mu-item-err">{item.error}</span>
                )}
                {item.status === "queued" && (
                  <span className="s3mu-item-pct" style={{ opacity: 0.5 }}>
                    Queued
                  </span>
                )}
              </div>

              {item.status !== "uploading" && (
                <button
                  type="button"
                  className="s3mu-item-remove"
                  onClick={() => removeItem(item.id)}
                  title="Remove"
                >
                  <XIcon />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
