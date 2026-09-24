"use client";
import React from "react";
import { Download, ExternalLink } from "lucide-react";
import type { MediaBlockAttrs } from "../../extensions/MediaBlock";
import { EMBED_SANDBOX, fileExtension, formatBytes, isInlinePdf, safeWidth } from "../../upload/mediaKinds";

interface MediaPreviewProps {
  attrs: MediaBlockAttrs;
  src: string;
  /** In edit mode a plain click selects the card instead of downloading. */
  editable?: boolean;
}

/** In-editor rendering of an uploaded / linked media block, by kind. */
export default function MediaPreview({ attrs, src, editable = false }: MediaPreviewProps) {
  const width = safeWidth(attrs.width) || undefined;
  const name = attrs.name || "Attachment";

  const kind = attrs.kind === "pdf" && !isInlinePdf(src) ? "file" : attrs.kind;
  switch (kind) {
    case "image":
      return <img src={src} alt={attrs.caption || attrs.name || ""} style={{ width }} className="ihub-te-media-img" draggable={false} />;
    case "video":
      return <video src={src} controls preload="metadata" playsInline style={{ width }} className="ihub-te-media-video" />;
    case "audio":
      return <audio src={src} controls preload="metadata" className="ihub-te-media-audio" />;
    case "embed":
      return (
        <div className="ihub-te-embed-responsive">
          <iframe src={src} className="ihub-te-embed-iframe" allowFullScreen loading="lazy" title={name} sandbox={EMBED_SANDBOX} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" />
        </div>
      );
    case "pdf":
      return (
        <div className="ihub-te-pdf">
          <div className="ihub-te-pdf-header">
            <span className="ihub-te-file-ext">PDF</span>
            <span className="ihub-te-file-name">{name}</span>
            <span className="ihub-te-file-size">{formatBytes(attrs.size)}</span>
            <a href={src} target="_blank" rel="noopener noreferrer" className="ihub-te-pdf-open" title="Open in new tab">
              <ExternalLink size={14} />
            </a>
          </div>
          <iframe src={src} className="ihub-te-pdf-frame" title={name} loading="lazy" />
        </div>
      );
    default:
      return (
        <a
          href={src}
          className="ihub-te-file-card"
          target="_blank"
          rel="noopener noreferrer"
          download={attrs.name || ""}
          onClick={(e) => {
            if (editable && !(e.metaKey || e.ctrlKey)) e.preventDefault();
          }}
        >
          <span className="ihub-te-file-ext">{fileExtension(attrs.name)}</span>
          <span className="ihub-te-file-meta">
            <span className="ihub-te-file-name">{name}</span>
            <span className="ihub-te-file-size">{formatBytes(attrs.size)}</span>
          </span>
          <Download size={16} className="ihub-te-file-download" />
        </a>
      );
  }
}
