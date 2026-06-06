# S3MultiUploader

**Category:** Forms | **Type:** component

Multi-file queue uploader with per-file progress bars. Uploads directly to S3 using `@aws-sdk/lib-storage` (multipart, real progress events). Files are processed sequentially by default; set `concurrency` > 1 for parallel uploads. Shows a live queue with queued / uploading / complete / error states and a filter input when the queue has 5+ files.

## 🏷️ Tags

`forms`, `upload`, `s3`, `file`, `multipart`, `queue`

## Requirements

Set these environment variables in your `.env.local`:

```env
NEXT_PUBLIC_AWS_REGION=us-east-1
NEXT_PUBLIC_AWS_S3_ENDPOINT_URL=https://s3.amazonaws.com
NEXT_PUBLIC_AWS_ACCESS_KEY_ID=your-key-id
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=your-secret-key
NEXT_PUBLIC_AWS_BUCKET_NAME=your-bucket
```

## Basic Usage

```tsx
import { S3MultiUploader } from "@instincthub/react-ui";

function MediaUpload() {
  return (
    <S3MultiUploader
      accepts="image/*,video/*"
      username={session.user.username}
      location={process.env.NEXT_PUBLIC_AWS_LOCATION}
      cdnBase={process.env.NEXT_PUBLIC_VIDEO_URL}
      onFileComplete={(response) => {
        console.log("Uploaded:", response.location);
        saveToDatabase(response);
      }}
    />
  );
}
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `accepts` | `string` | Yes | — | MIME types / extensions (e.g. `"image/*"`, `".pdf,.docx"`) |
| `username` | `string` | Yes | — | Prefix used in the generated S3 object key |
| `location` | `string` | Yes | — | S3 folder prefix (e.g. `"uploads/images"`) |
| `cdnBase` | `string` | Yes | — | CDN base URL prepended to the key in the response |
| `onFileComplete` | `(response: S3UploadResponseType) => void` | Yes | — | Called after each file is successfully uploaded |
| `maxFileSizeBytes` | `number` | No | `524_288_000` (500 MB) | Max size per file in bytes |
| `maxFiles` | `number` | No | unlimited | Max files per batch; surplus files are dropped with a toast |
| `concurrency` | `number` | No | `1` | Simultaneous uploads (clamped to 1–4) |
| `label` | `string` | No | `"Drop files here or click to browse"` | Dropzone label text |
| `hint` | `string` | No | — | Secondary hint shown below the label |
| `onQueueComplete` | `() => void` | No | — | Called when every file in the batch is terminal |
| `onError` | `(fileName: string, error: string) => void` | No | — | Called when a file fails to upload |
| `disabled` | `boolean` | No | `false` | Disables the dropzone and file input |
| `className` | `string` | No | — | Additional CSS class on the root element |

## `S3UploadResponseType`

```ts
interface S3UploadResponseType {
  bucket: string;       // S3 bucket name
  title: string;        // Original file name
  key: string;          // S3 object key (without CDN base)
  content_type: string; // MIME type
  size: number;         // File size in bytes
  location: string;     // Full CDN URL (cdnBase + key)
}
```

## Examples

### Image upload with file limit

```tsx
<S3MultiUploader
  accepts="image/*"
  maxFiles={10}
  maxFileSizeBytes={10 * 1024 * 1024}
  username="john-doe"
  location="uploads/avatars"
  cdnBase="https://cdn.example.com/"
  label="Upload profile images"
  hint="PNG, JPG, WEBP — up to 10 MB each"
  onFileComplete={(res) => saveImage(res)}
  onQueueComplete={() => toast("All images uploaded!")}
/>
```

### Parallel video upload

```tsx
<S3MultiUploader
  accepts="video/*"
  concurrency={2}
  maxFileSizeBytes={500 * 1024 * 1024}
  username={user.username}
  location="courses/videos"
  cdnBase={process.env.NEXT_PUBLIC_VIDEO_URL}
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
  username="user"
  location="uploads"
  cdnBase="https://cdn.example.com/"
  label="Upload disabled during processing"
  onFileComplete={() => {}}
/>
```
