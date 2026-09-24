import { reqOptions } from "../../../../lib/helpFunction";
import type {
  FileUploadHandler,
  IHubEditorUploadConfig,
  MediaKind,
  UploadedFileResult,
} from "../types";
import { DEFAULT_MAX_SIZE_MB, KIND_LABEL } from "./mediaKinds";
import { directS3Upload, isDirectS3Configured } from "./s3Direct";

export type EditorUploader = (
  file: File,
  kind: MediaKind,
  onProgress?: (percent: number) => void
) => Promise<UploadedFileResult>;

export interface UploaderSources {
  onFileUpload?: FileUploadHandler;
  onImageUpload?: (file: File) => Promise<string>;
  upload?: IHubEditorUploadConfig;
}

export class UploadNotConfiguredError extends Error {
  constructor() {
    super("Uploads are not configured for this editor. Paste a link instead.");
    this.name = "UploadNotConfiguredError";
  }
}

const PRESIGN_ENV = process.env.NEXT_PUBLIC_IHUB_EDITOR_PRESIGN_URL || "";
const ENDPOINT_ENV = process.env.NEXT_PUBLIC_IHUB_EDITOR_UPLOAD_URL || "";
const DIRECT_S3_ENV = process.env.NEXT_PUBLIC_IHUB_EDITOR_DIRECT_S3 === "true";

/** Direct browser → S3 exposes the secret key, so it only runs when explicitly enabled. */
function directS3Enabled(config: IHubEditorUploadConfig): boolean {
  const optedIn = config.directS3 ?? DIRECT_S3_ENV;
  return optedIn === true && isDirectS3Configured();
}

const URL_KEYS = ["url", "cdnUrl", "cdn_url", "location", "file_url", "file", "src"];

/** Find the uploaded file's URL in an arbitrary API response. */
export function extractUrl(payload: unknown): string | null {
  if (!payload) return null;
  if (typeof payload === "string") return /^(https?:)?\/\//.test(payload) ? payload : null;
  if (typeof payload !== "object") return null;
  const record = payload as Record<string, unknown>;
  for (const key of URL_KEYS) {
    const value = record[key];
    if (typeof value === "string" && value) return value;
  }
  for (const nested of ["data", "result", "file"]) {
    if (record[nested] && typeof record[nested] === "object") {
      const found = extractUrl(record[nested]);
      if (found) return found;
    }
  }
  return null;
}

export function validateFileSize(file: File, kind: MediaKind, config?: IHubEditorUploadConfig): void {
  const limit = config?.maxSizeMB?.[kind] ?? DEFAULT_MAX_SIZE_MB[kind];
  if (limit > 0 && file.size > limit * 1024 * 1024) {
    throw new Error(`This ${KIND_LABEL[kind]} is larger than the ${limit} MB limit.`);
  }
}

function normaliseResult(result: string | UploadedFileResult, file: File): UploadedFileResult {
  const base = typeof result === "string" ? { url: result } : result;
  if (!base?.url) throw new Error("The upload handler did not return a URL.");
  return { name: file.name, size: file.size, mime: file.type, ...base };
}

/** XHR wrapper so uploads can report real progress. */
export function sendWithProgress(
  method: string,
  url: string,
  body: Document | XMLHttpRequestBodyInit,
  headers: Record<string, string>,
  onProgress?: (percent: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress?.(Math.round((event.loaded / event.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve(xhr.responseText);
      else reject(new Error(`Upload failed (HTTP ${xhr.status}).`));
    };
    xhr.onerror = () => reject(new Error("Network error during upload."));
    xhr.ontimeout = () => reject(new Error("Upload timed out."));
    xhr.open(method, url);
    Object.entries(headers).forEach(([name, value]) => xhr.setRequestHeader(name, value));
    xhr.send(body);
  });
}

async function uploadViaPresign(
  file: File,
  kind: MediaKind,
  config: IHubEditorUploadConfig,
  presignUrl: string,
  onProgress?: (percent: number) => void
): Promise<UploadedFileResult> {
  let presign = config.getPresignedUrl ? await config.getPresignedUrl(file, kind) : null;
  if (!presign) {
    const body = JSON.stringify({ filename: file.name, content_type: file.type, size: file.size, kind });
    const res = await fetch(presignUrl, reqOptions("POST", body, config.token ?? null, "json", config.channel ?? null) as RequestInit);
    if (!res.ok) throw new Error(`Could not get an upload URL (HTTP ${res.status}).`);
    presign = await res.json();
  }
  if (!presign?.url || !presign.cdnUrl) throw new Error("The presign response is missing url or cdnUrl.");
  const contentType = presign.contentType || file.type || "application/octet-stream";
  const extra = Object.fromEntries(
    Object.entries(presign.headers || {}).filter(([name]) => name.toLowerCase() !== "content-type")
  );
  await sendWithProgress("PUT", presign.url, file, { "Content-Type": contentType, ...extra }, onProgress);
  return { url: presign.cdnUrl, name: file.name, size: file.size, mime: contentType };
}

async function uploadViaEndpoint(
  file: File,
  kind: MediaKind,
  config: IHubEditorUploadConfig,
  endpoint: string,
  onProgress?: (percent: number) => void
): Promise<UploadedFileResult> {
  const form = new FormData();
  form.append(config.fieldName || "file", file);
  form.append("name", file.name);
  form.append("kind", kind);
  Object.entries(config.extraFields || {}).forEach(([key, value]) => form.append(key, value));
  const { headers } = reqOptions("POST", form, config.token ?? null, false, config.channel ?? null) as {
    headers: Record<string, string>;
  };
  const text = await sendWithProgress("POST", endpoint, form, headers || {}, onProgress);
  let payload: unknown = text;
  try {
    payload = JSON.parse(text);
  } catch {
    // plain-text response: treat as URL below
  }
  const url = extractUrl(payload);
  if (!url) throw new Error("The upload endpoint response did not include a file URL.");
  return { url, name: file.name, size: file.size, mime: file.type };
}

/** Build the uploader used by every media block, following the documented resolution order. */
export function createUploader(sources: UploaderSources): EditorUploader {
  return async (file, kind, onProgress) => {
    const config = sources.upload || {};
    validateFileSize(file, kind, config);

    if (sources.onFileUpload) {
      const result = await sources.onFileUpload(file, { kind, onProgress: onProgress || (() => undefined) });
      return normaliseResult(result, file);
    }
    if (kind === "image" && sources.onImageUpload) {
      return normaliseResult(await sources.onImageUpload(file), file);
    }
    const presignUrl = config.presignEndpoint || PRESIGN_ENV;
    if (config.getPresignedUrl || presignUrl) {
      return uploadViaPresign(file, kind, config, presignUrl, onProgress);
    }
    const endpoint = config.endpoint || ENDPOINT_ENV;
    if (endpoint) return uploadViaEndpoint(file, kind, config, endpoint, onProgress);
    if (directS3Enabled(config)) {
      return directS3Upload(file, config.s3Folder, onProgress);
    }
    throw new UploadNotConfiguredError();
  };
}

/** True when at least one upload strategy is available. */
export function canUpload(sources: UploaderSources, kind: MediaKind): boolean {
  const config = sources.upload || {};
  return Boolean(
    sources.onFileUpload ||
      (kind === "image" && sources.onImageUpload) ||
      config.getPresignedUrl ||
      config.presignEndpoint ||
      PRESIGN_ENV ||
      config.endpoint ||
      ENDPOINT_ENV ||
      directS3Enabled(config)
  );
}
