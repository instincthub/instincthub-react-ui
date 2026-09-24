import { Extension } from "@tiptap/react";
import type { AnyExtension } from "@tiptap/core";

/** Kinds of uploadable / embeddable media blocks. */
export type MediaKind = "image" | "video" | "audio" | "pdf" | "file" | "embed";

/** What an upload handler resolves with. A bare string is treated as the URL. */
export interface UploadedFileResult {
  url: string;
  name?: string;
  size?: number;
  mime?: string;
}

export interface FileUploadContext {
  kind: MediaKind;
  /** Report upload progress (0–100). Optional for handlers that can't track it. */
  onProgress: (percent: number) => void;
}

export type FileUploadHandler = (
  file: File,
  context: FileUploadContext
) => Promise<string | UploadedFileResult>;

/** Response expected from a presign endpoint (same shape as S3MultiUploader). */
export interface EditorPresignResult {
  /** Short-lived presigned PUT URL. */
  url: string;
  /** Public / CDN URL the file will be served from. */
  cdnUrl: string;
  key?: string;
  /** Server-validated content type for the PUT. */
  contentType?: string;
  /** Extra headers covered by the signature (e.g. x-amz-acl). */
  headers?: Record<string, string>;
}

/**
 * Upload configuration. Resolution order when a file is added:
 * 1. `onFileUpload` prop (or `onImageUpload` for images)
 * 2. `getPresignedUrl` / `presignEndpoint` / NEXT_PUBLIC_IHUB_EDITOR_PRESIGN_URL
 * 3. `endpoint` / NEXT_PUBLIC_IHUB_EDITOR_UPLOAD_URL (multipart POST, Leadboard style)
 * 4. Direct S3 using the NEXT_PUBLIC_AWS_* variables FileUploader already uses —
 *    opt-in only (`directS3: true` or NEXT_PUBLIC_IHUB_EDITOR_DIRECT_S3=true),
 *    because the secret key ships to the browser.
 */
export interface IHubEditorUploadConfig {
  /** Bearer token sent with presign / endpoint requests via reqOptions. */
  token?: string | null;
  /** Channel id header, forwarded to reqOptions. */
  channel?: string | null;
  getPresignedUrl?: (file: File, kind: MediaKind) => Promise<EditorPresignResult>;
  /** POST {filename, content_type, size, kind} → EditorPresignResult. */
  presignEndpoint?: string;
  /** POST multipart form; JSON response must contain a URL field. */
  endpoint?: string;
  /** Multipart field name for the file (default "file"). */
  fieldName?: string;
  /** Extra multipart fields sent with the file. */
  extraFields?: Record<string, string>;
  /**
   * Opt in to direct browser → S3 uploads with the NEXT_PUBLIC_AWS_* keys.
   * Defaults to NEXT_PUBLIC_IHUB_EDITOR_DIRECT_S3 === "true". Prefer a presign endpoint.
   */
  directS3?: boolean;
  /** Folder/prefix for direct S3 uploads (default NEXT_PUBLIC_IHUB_EDITOR_S3_FOLDER or "editor"). */
  s3Folder?: string;
  /** Max upload size per kind in MB. */
  maxSizeMB?: Partial<Record<MediaKind, number>>;
}

export interface IHubTextEditorProps {
  name?: string;
  label?: string;
  content?: string;
  placeholder?: string;
  onChange?: (html: string) => void;
  onBlur?: () => void;
  required?: boolean;
  charLimit?: number;
  features?: IHubEditorFeatures;
  /** Legacy image-only upload handler. Prefer `onFileUpload`. */
  onImageUpload?: (file: File) => Promise<string>;
  /** Upload handler used for image, video, audio, PDF and file blocks. */
  onFileUpload?: FileUploadHandler;
  /** Built-in upload strategies (presign, endpoint, env-driven S3). */
  upload?: IHubEditorUploadConfig;
  className?: string;
  minHeight?: string;
  maxHeight?: string;
  lastUpdated?: string;
  readOnly?: boolean;
  extensions?: Array<Extension | AnyExtension>;
}

export interface IHubEditorFeatures {
  bubbleMenu?: boolean;
  slashCommands?: boolean;
  floatingAddButton?: boolean;
  /** Hover handle on every block: drag to reorder, "+" to add a line, click for options. */
  dragHandle?: boolean;
  focusMode?: boolean;
  imageUpload?: boolean;
  /** Video, audio, PDF and file blocks. */
  fileUploads?: boolean;
  mediaEmbeds?: boolean;
  tables?: boolean;
  codeBlocks?: boolean;
  taskLists?: boolean;
  pullQuotes?: boolean;
  /** Section banners with configurable background/text colour. */
  banners?: boolean;
  callouts?: boolean;
  toggles?: boolean;
  /** Call-to-action button blocks. */
  buttons?: boolean;
  /** Keep inline styles and email-table attributes from pasted / loaded HTML. */
  preserveStyles?: boolean;
  characterCount?: boolean;
  typography?: boolean;
}

export interface SlashCommandItem {
  title: string;
  description: string;
  icon: string;
  /** Extra search terms. */
  keywords?: string[];
  /** Feature flag that must be on for the command to show. */
  feature?: keyof IHubEditorFeatures;
  command: (props: { editor: any; range?: any }) => void;
}

export interface LinkPopoverState {
  isOpen: boolean;
  url: string;
}

export const DEFAULT_FEATURES: Required<IHubEditorFeatures> = {
  bubbleMenu: true,
  slashCommands: true,
  floatingAddButton: true,
  dragHandle: true,
  focusMode: false,
  imageUpload: true,
  fileUploads: true,
  mediaEmbeds: true,
  tables: true,
  codeBlocks: true,
  taskLists: true,
  pullQuotes: true,
  banners: true,
  callouts: true,
  toggles: true,
  buttons: true,
  preserveStyles: true,
  characterCount: true,
  typography: true,
};
