import { FILE_URL, IN_DEV_MODE, slugifyFileName } from "../../../../lib/helpFunction";
import type { UploadedFileResult } from "../types";

/**
 * Direct browser → S3 upload driven by the same NEXT_PUBLIC_AWS_* variables
 * FileUploader uses. Anything prefixed NEXT_PUBLIC_ ships to the browser, so
 * prefer a presign endpoint in production and scope these keys to PutObject
 * on a single bucket prefix.
 */
const env = {
  region: process.env.NEXT_PUBLIC_AWS_REGION || "",
  endpoint: process.env.NEXT_PUBLIC_AWS_S3_ENDPOINT_URL || "",
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || "",
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
  bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || "",
  folder: process.env.NEXT_PUBLIC_IHUB_EDITOR_S3_FOLDER || "",
  publicUrl: process.env.NEXT_PUBLIC_IHUB_EDITOR_FILE_URL || "",
};

export function isDirectS3Configured(): boolean {
  return Boolean(env.bucket && env.accessKeyId && env.secretAccessKey);
}

function joinUrl(base: string, path: string): string {
  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

export function publicUrlForKey(key: string): string {
  const base = env.publicUrl || FILE_URL;
  if (base) return joinUrl(base, key);
  if (env.endpoint) return joinUrl(joinUrl(env.endpoint, env.bucket), key);
  const region = env.region ? `.${env.region}` : "";
  return `https://${env.bucket}.s3${region}.amazonaws.com/${key}`;
}

export function buildObjectKey(fileName: string, folder?: string): string {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const slug = slugifyFileName(`${stamp}-${fileName}`);
  const name = IN_DEV_MODE ? `test-env__${slug}` : slug;
  const prefix = (folder || env.folder || "editor").replace(/^\/+|\/+$/g, "");
  return `${prefix}/${name}`;
}

export async function directS3Upload(
  file: File,
  folder?: string,
  onProgress?: (percent: number) => void
): Promise<UploadedFileResult> {
  const [{ S3Client }, { Upload }] = await Promise.all([
    import("@aws-sdk/client-s3"),
    import("@aws-sdk/lib-storage"),
  ]);
  const client = new S3Client({
    region: env.region || undefined,
    endpoint: env.endpoint || undefined,
    credentials: { accessKeyId: env.accessKeyId, secretAccessKey: env.secretAccessKey },
  });
  const key = buildObjectKey(file.name, folder);
  // Uint8Array body avoids the stream polyfill mismatch in Next.js bundles.
  const body = new Uint8Array(await file.arrayBuffer());
  const upload = new Upload({
    client,
    params: {
      Bucket: env.bucket,
      Key: key,
      Body: body,
      ContentType: file.type || "application/octet-stream",
      ACL: "public-read",
    },
  });
  upload.on("httpUploadProgress", (progress: { loaded?: number; total?: number }) => {
    if (progress.total) onProgress?.(Math.round(((progress.loaded || 0) / progress.total) * 100));
  });
  await upload.done();
  return { url: publicUrlForKey(key), name: file.name, size: file.size, mime: file.type };
}
