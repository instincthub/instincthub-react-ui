"use client";
import React, { useCallback, useEffect, useState } from "react";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { AlignCenter, AlignLeft, AlignRight, Download, RefreshCw, Trash2 } from "lucide-react";
import type { MediaKind } from "../../types";
import type { MediaBlockAttrs } from "../../extensions/MediaBlock";
import { fileNameFromUrl, isAllowedEmbed, isSafeUrl, kindFromMime, kindFromUrl, renderableSrc, safeWidth, toEmbedUrl } from "../../upload/mediaKinds";
import { beginUpload, getUpload, newUploadId, subscribeUpload, type UploadStatus } from "../../upload/uploadRegistry";
import MediaPlaceholder from "./MediaPlaceholder";
import MediaPreview from "./MediaPreview";

const WIDTHS: Array<{ label: string; value: string | null }> = [
  { label: "S", value: "33%" },
  { label: "M", value: "60%" },
  { label: "L", value: "80%" },
  { label: "Full", value: null },
];

/** Resolve a pasted link into block attributes for the chosen kind. */
export function attrsFromLink(url: string, kind: MediaKind): Partial<MediaBlockAttrs> | null {
  if (!/^https?:\/\//i.test(url)) return null;
  const embed = toEmbedUrl(url);
  if (kind === "embed" || (embed && kind === "video")) {
    const src = embed || url;
    return isAllowedEmbed(src) ? { kind: "embed", src, name: url } : null;
  }
  const detected = kindFromUrl(url, kind);
  const finalKind = detected === "embed" ? kind : detected;
  return { kind: kind === "file" ? "file" : finalKind, src: url, name: fileNameFromUrl(url) };
}

export default function MediaBlockView({ node, updateAttributes, deleteNode, selected, editor, extension }: NodeViewProps) {
  const attrs = node.attrs as MediaBlockAttrs;
  const uploader = extension.options.uploaderRef?.current ?? null;
  const uploadKinds: MediaKind[] = extension.options.uploadKinds ?? [];
  const [status, setStatus] = useState<UploadStatus | undefined>(() => getUpload(attrs.pendingId));
  const [error, setError] = useState<string | null>(attrs.uploadError ?? null);
  const editable = editor.isEditable;

  // Follow the upload for this block; it lives in the registry, not in this view.
  useEffect(() => {
    const id = attrs.pendingId;
    setStatus(getUpload(id));
    if (!id) return undefined;
    return subscribeUpload(id, (next) => {
      setStatus(next);
      if (next.error) setError(next.error);
    });
  }, [attrs.pendingId]);

  useEffect(() => {
    if (attrs.uploadError) setError(attrs.uploadError);
  }, [attrs.uploadError]);

  const startUpload = useCallback(
    (file: File) => {
      if (!uploader) {
        setError("Uploads aren't configured here, so paste a link instead.");
        return;
      }
      const kind: MediaKind = attrs.kind === "file" ? "file" : kindFromMime(file.type, file.name);
      if (!uploadKinds.includes(kind)) {
        setError(`This editor doesn't accept ${kind} uploads.`);
        return;
      }
      const id = newUploadId();
      setError(null);
      updateAttributes({ pendingId: id, name: file.name, uploadError: null });
      beginUpload(editor, id, file, kind, uploader);
    },
    [uploader, uploadKinds, attrs.kind, updateAttributes, editor]
  );

  const handleLink = (url: string) => {
    const next = attrsFromLink(url, attrs.kind);
    if (!next || !isSafeUrl(next.src)) {
      setError(
        attrs.kind === "embed"
          ? "Paste a YouTube, Vimeo, Loom, Figma, Google Drive or CodePen link."
          : "Enter a full link that starts with https://"
      );
      return;
    }
    setError(null);
    updateAttributes({ ...next, uploadError: null });
  };

  const uploading = Boolean(attrs.pendingId && status && !status.error);
  const progress = status?.progress ?? 0;
  const src = renderableSrc(attrs) || null;
  const align = attrs.align || "center";

  if (!src && !uploading) {
    return (
      <NodeViewWrapper className={`ihub-te-media-node${selected ? " is-selected" : ""}`} data-drag-handle>
        {editable ? (
          <MediaPlaceholder kind={attrs.kind} canUpload={Boolean(uploader)} error={error} onFile={startUpload} onLink={handleLink} />
        ) : null}
      </NodeViewWrapper>
    );
  }

  const showWidth = attrs.kind === "image" || attrs.kind === "video";

  return (
    <NodeViewWrapper
      className={`ihub-te-media-node ihub-te-media ihub-te-media--${attrs.kind} ihub-te-image-${align}${selected ? " is-selected" : ""}`}
      data-drag-handle
    >
      {uploading ? (
        <div className="ihub-te-media-uploading" contentEditable={false}>
          {status?.preview && <img src={status.preview} alt="" className="ihub-te-media-img is-uploading" />}
          <div className="ihub-te-media-progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <span style={{ width: `${progress}%` }} />
          </div>
          <span className="ihub-te-media-hint">Uploading {status?.name || attrs.name || "file"}… {progress}%</span>
        </div>
      ) : (
        <MediaPreview attrs={attrs} src={src as string} editable={editable} />
      )}

      {editable && !uploading && (
        <div className="ihub-te-media-toolbar" contentEditable={false}>
          {showWidth && (
            <>
              {(["left", "center", "right"] as const).map((value) => (
                <button key={value} type="button" title={`Align ${value}`} className={align === value ? "is-active" : ""} onClick={() => updateAttributes({ align: value })}>
                  {value === "left" ? <AlignLeft size={14} /> : value === "center" ? <AlignCenter size={14} /> : <AlignRight size={14} />}
                </button>
              ))}
              <span className="ihub-te-media-toolbar-divider" />
              {WIDTHS.map((w) => (
                <button key={w.label} type="button" title={`Width ${w.value || "100%"}`} className={safeWidth(attrs.width) === w.value ? "is-active" : ""} onClick={() => updateAttributes({ width: w.value })}>
                  {w.label}
                </button>
              ))}
              <span className="ihub-te-media-toolbar-divider" />
            </>
          )}
          <a href={src as string} target="_blank" rel="noopener noreferrer" download={attrs.name || ""} title="Open / download">
            <Download size={14} />
          </a>
          <button type="button" title="Replace" onClick={() => updateAttributes({ src: null, size: null, mime: null, uploadError: null })}>
            <RefreshCw size={14} />
          </button>
          <button type="button" title="Delete" className="is-danger" onClick={deleteNode}>
            <Trash2 size={14} />
          </button>
        </div>
      )}

      {error && <p className="ihub-te-media-error" role="alert">{error}</p>}

      {(editable || attrs.caption) && attrs.kind !== "file" && (
        <input
          className="ihub-te-media-caption"
          value={attrs.caption || ""}
          placeholder="Add a caption…"
          readOnly={!editable}
          onChange={(e) => updateAttributes({ caption: e.target.value })}
        />
      )}
    </NodeViewWrapper>
  );
}
