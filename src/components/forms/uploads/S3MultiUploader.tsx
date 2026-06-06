"use client";

import React, { useState, useRef, useCallback, DragEvent, ChangeEvent } from "react";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { IN_DEV_MODE, slugifyFileName } from "../../lib/helpFunction";
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
 * S3MultiUploader — multi-file queue uploader with per-file progress.
 *
 * Uploads directly to S3 using `@aws-sdk/lib-storage` (multipart, real progress).
 * Files are processed sequentially by default; set `concurrency` > 1 for parallel uploads.
 *
 * Required env vars (NEXT_PUBLIC_*):
 *   AWS_REGION, AWS_S3_ENDPOINT_URL, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME
 *
 * CSS: import "@instincthub/react-ui/dist/s3-multi-uploader.css" (or equivalent path)
 */
export default function S3MultiUploader({
  accepts,
  maxFileSizeBytes = 524_288_000,
  maxFiles,
  concurrency = 1,
  username,
  location,
  cdnBase,
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

  // Semaphore: number of uploads currently in flight
  const inFlight = useRef(0);
  // Queue ref so the runner always sees current state
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

      const s3 = new S3Client({
        region: process.env.NEXT_PUBLIC_AWS_REGION,
        endpoint: process.env.NEXT_PUBLIC_AWS_S3_ENDPOINT_URL,
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
        },
      });

      const timestamp = new Date().toISOString();
      const slug = slugifyFileName(`${username}-${timestamp}-${item.file.name}`);
      const prefixedKey = IN_DEV_MODE ? `test-env__${slug}` : slug;
      const fullKey = `${location}/${prefixedKey}`;
      const bucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || "";

      try {
        const buffer = await item.file.arrayBuffer();
        const body = new Uint8Array(buffer);

        const uploader = new Upload({
          client: s3,
          partSize: 5 * 1024 * 1024,
          queueSize: 2,
          params: {
            Bucket: bucket,
            Key: fullKey,
            Body: body,
            ContentType: item.file.type,
            ACL: "public-read",
          },
        });

        uploader.on("httpUploadProgress", (progress) => {
          if (progress.total) {
            const pct = Math.round((progress.loaded! / progress.total) * 100);
            updateItem(item.id, { progress: pct });
          }
        });

        await uploader.done();

        const response: S3UploadResponseType = {
          bucket,
          title: item.file.name,
          key: prefixedKey,
          content_type: item.file.type,
          size: item.file.size,
          location: `${cdnBase}${prefixedKey}`,
        };

        updateItem(item.id, { status: "complete", progress: 100 });
        onFileComplete(response);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Upload failed";
        updateItem(item.id, { status: "error", error: msg });
        onError?.(item.file.name, msg);
      }
    },
    [username, location, cdnBase, updateItem, onFileComplete, onError]
  );

  /** Pick the next queued item and upload it, respecting concurrency. */
  const tick = useCallback(async () => {
    if (inFlight.current >= clampedConcurrency) return;

    const next = queueRef.current.find((i) => i.status === "queued");
    if (!next) {
      // All items terminal — fire onQueueComplete if nothing is still uploading
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

    // Continue draining
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
        // Kick off as many upload slots as concurrency allows
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
              {/* Status icon */}
              <div className="s3mu-item-icon">
                {item.status === "complete" && <CheckIcon />}
                {item.status === "error" && <AlertIcon />}
                {item.status === "uploading" && <SpinnerIcon />}
                {item.status === "queued" && <div className="s3mu-queued-dot" />}
              </div>

              {/* File info + progress */}
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

              {/* Remove (not while uploading) */}
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
