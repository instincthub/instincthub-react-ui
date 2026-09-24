import type { Editor } from "@tiptap/core";
import type { MediaKind } from "../types";
import type { EditorUploader } from "./uploadFile";

export interface UploadStatus {
  progress: number;
  name: string;
  preview: string | null;
  error?: string;
}

interface InflightUpload extends UploadStatus {
  listeners: Set<(status: UploadStatus) => void>;
}

/**
 * Uploads live here, keyed by the block's pendingId, not inside a node view.
 * Dragging the block, undo/redo or wrapping it recreates the view; the upload
 * keeps going and the result is written to whichever node carries the id.
 */
const inflight = new Map<string, InflightUpload>();

export function newUploadId(): string {
  return `media-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getUpload(id?: string | null): UploadStatus | undefined {
  return id ? inflight.get(id) : undefined;
}

export function subscribeUpload(id: string, listener: (status: UploadStatus) => void): () => void {
  const entry = inflight.get(id);
  if (!entry) return () => undefined;
  entry.listeners.add(listener);
  return () => entry.listeners.delete(listener);
}

function notify(entry: InflightUpload): void {
  const snapshot: UploadStatus = { progress: entry.progress, name: entry.name, preview: entry.preview, error: entry.error };
  entry.listeners.forEach((listener) => listener(snapshot));
}

/** Merge attrs into the media node carrying this pendingId, wherever it now is. */
export function patchMediaNode(editor: Editor, id: string, attrs: Record<string, unknown>): boolean {
  if (editor.isDestroyed) return false;
  let target: { pos: number; attrs: Record<string, unknown> } | null = null;
  editor.state.doc.descendants((node, pos) => {
    if (target) return false;
    if (node.type.name === "mediaBlock" && node.attrs.pendingId === id) {
      target = { pos, attrs: node.attrs };
      return false;
    }
    return true;
  });
  if (!target) return false;
  const { pos, attrs: current } = target as { pos: number; attrs: Record<string, unknown> };
  // Not an undo step: undoing should remove the block, not un-upload it.
  editor.view.dispatch(editor.state.tr.setNodeMarkup(pos, undefined, { ...current, ...attrs }).setMeta("addToHistory", false));
  return true;
}

export function beginUpload(editor: Editor, id: string, file: File, kind: MediaKind, uploader: EditorUploader): void {
  const canPreview = kind === "image" && typeof URL.createObjectURL === "function";
  const preview = canPreview ? URL.createObjectURL(file) : null;
  const entry: InflightUpload = { progress: 0, name: file.name, preview, listeners: new Set() };
  inflight.set(id, entry);

  uploader(file, kind, (percent) => {
    entry.progress = percent;
    notify(entry);
  })
    .then((result) => {
      patchMediaNode(editor, id, {
        kind,
        src: result.url,
        name: result.name || file.name,
        size: result.size ?? file.size,
        mime: result.mime || file.type,
        pendingId: null,
      });
    })
    .catch((err: unknown) => {
      entry.error = err instanceof Error ? err.message : "Upload failed. Please try again.";
      notify(entry);
      patchMediaNode(editor, id, { pendingId: null, uploadError: entry.error });
    })
    .finally(() => {
      inflight.delete(id);
      if (preview) URL.revokeObjectURL(preview);
    });
}
