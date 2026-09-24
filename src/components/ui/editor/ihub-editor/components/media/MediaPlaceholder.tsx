"use client";
import React, { useRef, useState } from "react";
import { FileText, Film, ImageIcon, Link2, Music, Paperclip, Upload, MonitorPlay } from "lucide-react";
import type { MediaKind } from "../../types";
import { ACCEPT_BY_KIND, KIND_LABEL } from "../../upload/mediaKinds";

const KIND_ICON: Record<MediaKind, React.ReactNode> = {
  image: <ImageIcon size={18} />,
  video: <Film size={18} />,
  audio: <Music size={18} />,
  pdf: <FileText size={18} />,
  file: <Paperclip size={18} />,
  embed: <MonitorPlay size={18} />,
};

interface MediaPlaceholderProps {
  kind: MediaKind;
  canUpload: boolean;
  error?: string | null;
  onFile: (file: File) => void;
  onLink: (url: string) => void;
}

export default function MediaPlaceholder({ kind, canUpload, error, onFile, onLink }: MediaPlaceholderProps) {
  const allowUpload = canUpload && kind !== "embed";
  const [tab, setTab] = useState<"upload" | "link">(allowUpload ? "upload" : "link");
  const [url, setUrl] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const label = KIND_LABEL[kind];

  const submitLink = () => {
    if (url.trim()) onLink(url.trim());
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) onFile(file);
  };

  return (
    <div className="ihub-te-media-placeholder" contentEditable={false}>
      <div className="ihub-te-media-placeholder-head">
        <span className="ihub-te-media-placeholder-icon">{KIND_ICON[kind]}</span>
        <span className="ihub-te-media-placeholder-title">
          {kind === "embed" ? "Embed a link (YouTube, Vimeo, Loom, Figma, Google Drive…)" : `Add ${label === "image" ? "an" : "a"} ${label}`}
        </span>
      </div>

      {allowUpload && (
        <div className="ihub-te-media-tabs" role="tablist">
          <button type="button" role="tab" aria-selected={tab === "upload"} className={tab === "upload" ? "is-active" : ""} onClick={() => setTab("upload")}>
            <Upload size={13} /> Upload
          </button>
          <button type="button" role="tab" aria-selected={tab === "link"} className={tab === "link" ? "is-active" : ""} onClick={() => setTab("link")}>
            <Link2 size={13} /> Embed link
          </button>
        </div>
      )}

      {tab === "upload" && allowUpload ? (
        <div
          className={`ihub-te-media-dropzone${dragging ? " is-dragging" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <button type="button" className="ihub-te-media-upload-btn" onClick={() => inputRef.current?.click()}>
            Choose {label}
          </button>
          <span className="ihub-te-media-hint">or drag and drop it here</span>
          <input
            ref={inputRef}
            type="file"
            hidden
            accept={ACCEPT_BY_KIND[kind]}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onFile(file);
              e.target.value = "";
            }}
          />
        </div>
      ) : (
        <div className="ihub-te-media-link-row">
          <input
            type="url"
            className="ihub-te-media-link-input"
            placeholder={`Paste the ${label} link…`}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submitLink();
              }
            }}
          />
          <button type="button" className="ihub-te-media-upload-btn" onClick={submitLink} disabled={!url.trim()}>
            {kind === "embed" ? "Embed" : "Add"}
          </button>
        </div>
      )}

      {!canUpload && kind !== "embed" && (
        <p className="ihub-te-media-hint">Uploads aren&apos;t configured here, so paste a link to the {label}.</p>
      )}
      {error && <p className="ihub-te-media-error" role="alert">{error}</p>}
    </div>
  );
}
