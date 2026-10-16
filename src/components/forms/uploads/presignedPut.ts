import type { PresignedUploadResult } from "@/types";

/**
 * Upload a file to a presigned PUT URL, reporting progress via XHR.
 *
 * The uploaders never hold bucket credentials: the consumer's
 * `getPresignedUrl(file)` asks its own server for a short-lived URL, and this
 * sends the bytes. `contentType` and any `headers` must match what the server
 * signed, so they are sent verbatim.
 */
export function uploadToPresignedUrl(
  url: string,
  file: File,
  contentType: string,
  onProgress: (pct: number) => void,
  headers: Record<string, string> = {}
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
    // Use the server-validated content type, never trust file.type alone.
    xhr.setRequestHeader("Content-Type", contentType);
    // Any other headers the signature covers (e.g. x-amz-acl) must match exactly.
    Object.entries(headers)
      .filter(([name]) => name.toLowerCase() !== "content-type")
      .forEach(([name, value]) => xhr.setRequestHeader(name, value));
    xhr.send(file);
  });
}

/** Presign with the consumer's function, then PUT. Resolves with the presign result. */
export async function presignAndUpload(
  file: File,
  getPresignedUrl: (file: File) => Promise<PresignedUploadResult>,
  onProgress: (pct: number) => void
): Promise<PresignedUploadResult> {
  const presigned = await getPresignedUrl(file);
  await uploadToPresignedUrl(
    presigned.url,
    file,
    presigned.contentType,
    onProgress,
    presigned.headers
  );
  return presigned;
}

export const UPLOADS_NOT_CONFIGURED =
  "Uploads are not configured: pass getPresignedUrl (a function that asks your server for a presigned PUT URL).";
