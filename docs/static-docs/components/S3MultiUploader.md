# S3MultiUploader

**Category:** Forms | **Type:** component

Multi-file queue uploader with per-file progress bars. Uploads files directly to S3 (or any S3-compatible store) using **server-issued presigned PUT URLs** — AWS credentials never reach the browser. The consuming app supplies a `getPresignedUrl` callback that calls its own server endpoint; the component handles the queue, progress tracking, concurrency, and UI state.

## 🏷️ Tags

`forms`, `upload`, `s3`, `file`, `multipart`, `queue`, `presigned`

## Security model

```
Browser → POST /api/upload/presign → Server validates auth + MIME + size → presigned PUT URL (60 s)
Browser → PUT <presigned URL> → S3 (with progress via XHR)
```

The server controls the object key, content type, and size policy. The client cannot override any of these.

## Installation

```bash
import "@instincthub/react-ui/assets/css/forms/s3-multi-uploader.css";
```

## Basic Usage

```tsx
import { S3MultiUploader } from "@instincthub/react-ui";

function MediaUpload() {
  return (
    <S3MultiUploader
      accepts="image/*,video/*"
      getPresignedUrl={async (file) => {
        const res = await fetch("/api/upload/presign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: file.name, type: file.type, size: file.size }),
        });
        if (!res.ok) throw new Error("Failed to get upload URL");
        return res.json(); // { url, key, cdnUrl, contentType }
      }}
      onFileComplete={(response) => {
        saveToDatabase(response.key, response.location);
      }}
    />
  );
}
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `accepts` | `string` | Yes | — | MIME types / extensions (e.g. `"image/*"`, `".pdf,.docx"`). Client-side hint only — enforce on the server. |
| `getPresignedUrl` | `(file: File) => Promise<PresignedUploadResult>` | Yes | — | Async function that calls your server to get a short-lived presigned PUT URL. |
| `onFileComplete` | `(response: S3UploadResponseType) => void` | Yes | — | Called after each file is successfully uploaded |
| `maxFileSizeBytes` | `number` | No | `524_288_000` | Max size per file in bytes — client hint only; enforce via presigned POST policy |
| `maxFiles` | `number` | No | unlimited | Max files per batch; surplus files are dropped with a toast |
| `concurrency` | `number` | No | `1` | Simultaneous uploads (clamped to 1–4) |
| `label` | `string` | No | `"Drop files here or click to browse"` | Dropzone label |
| `hint` | `string` | No | — | Secondary hint below the label |
| `onQueueComplete` | `() => void` | No | — | Called when every file in the batch is in a terminal state |
| `onError` | `(fileName: string, error: string) => void` | No | — | Called when a file fails |
| `disabled` | `boolean` | No | `false` | Disables the dropzone |
| `className` | `string` | No | — | Extra CSS class on the root element |

## Types

### `PresignedUploadResult`

Returned by `getPresignedUrl` — generated server-side:

```ts
interface PresignedUploadResult {
  url: string;         // Short-lived presigned PUT URL (≤ 60 s)
  key: string;         // S3 object key assigned by the server
  cdnUrl: string;      // Full CDN URL for the uploaded file
  contentType: string; // Server-validated Content-Type (from allowlist, not file.type)
}
```

### `S3UploadResponseType`

Passed to `onFileComplete`:

```ts
interface S3UploadResponseType {
  title: string;        // Original file name
  key: string;          // S3 object key
  content_type: string; // MIME type
  size: number;         // File size in bytes
  location: string;     // Full CDN URL
}
```

## Server endpoint example (Next.js)

```ts
// app/api/upload/presign/route.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getServerSession } from "next-auth";

const ALLOWED_MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  pdf: "application/pdf",
  mp4: "video/mp4",
};

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { name, size } = await req.json();

  if (size > 500 * 1024 * 1024)
    return new Response("File too large", { status: 413 });

  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  const contentType = ALLOWED_MIME[ext];
  if (!contentType)
    return new Response("File type not allowed", { status: 415 });

  const key = `uploads/${session.user.id}/${crypto.randomUUID()}.${ext}`;

  const client = new S3Client({ region: process.env.AWS_REGION });
  const url = await getSignedUrl(
    client,
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    }),
    { expiresIn: 60 }
  );

  return Response.json({
    url,
    key,
    cdnUrl: `${process.env.CDN_BASE}/${key}`,
    contentType,
  });
}
```

## Examples

### Parallel video upload with file limit

```tsx
<S3MultiUploader
  accepts="video/*"
  concurrency={2}
  maxFiles={5}
  maxFileSizeBytes={500 * 1024 * 1024}
  getPresignedUrl={getPresignedUrl}
  hint="MP4, MOV — up to 500 MB each"
  onFileComplete={(res) => attachVideoToLesson(res)}
  onError={(name, err) => console.error(`${name}: ${err}`)}
/>
```

### Disabled state

```tsx
<S3MultiUploader
  accepts="*/*"
  disabled
  getPresignedUrl={getPresignedUrl}
  label="Upload disabled during processing"
  onFileComplete={() => {}}
/>
```
