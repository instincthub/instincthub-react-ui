# IhubFileUploader

**Category:** Forms | **Type:** component

Advanced file uploader with drag & drop, presigned direct-to-bucket upload, progress tracking, optional DB persistence, and server-side deletion on remove.

> **0.5.0 breaking change:** the component no longer signs S3 requests in the browser and no longer reads `NEXT_PUBLIC_AWS_ACCESS_KEY_ID` / `NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY` (anything `NEXT_PUBLIC_` ships to every visitor). Pass `getPresignedUrl` to upload and `deleteFile` to delete. `username` and `enableS3Delete` are ignored.

**File Location:** `src/components/forms/uploads/IhubFileUploader.tsx`

## Tags

`forms`, `upload`, `files`, `drag-drop`, `progress`, `s3`, `presigned`

## Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { IhubFileUploader } from "@instincthub/react-ui";
import type { S3UploadResponseType } from "@instincthub/react-ui/types";
```

## Server Presign Endpoint (required)

The browser asks YOUR server for a short-lived presigned PUT URL, then uploads the bytes straight to the bucket. The bucket secret stays on the server. `getPresignedUrl` must resolve to a `PresignedUploadResult` (the same contract as `S3MultiUploader`):

```typescript
interface PresignedUploadResult {
  url: string;          // presigned PUT URL
  key: string;          // object key the server chose (stored on your record)
  cdnUrl: string;       // public URL of the uploaded file
  contentType: string;  // server-validated type the URL was signed with
  headers?: Record<string, string>; // other signed headers, e.g. { "x-amz-acl": "public-read" }
}
```

The server should require a session, allowlist the content type, cap the size, build the key itself, and sign `Content-Type`, `Content-Length` and any ACL header. See `creators_nextjs` `src/app/api/uploads/presign/route.ts` for a Next.js route handler.

## Basic Usage

```tsx
"use client";
import { IhubFileUploader } from "@instincthub/react-ui";
import type { PresignedUploadResult, S3UploadResponseType } from "@instincthub/react-ui/types";

async function getPresignedUrl(file: File): Promise<PresignedUploadResult> {
  const res = await fetch("/api/uploads/presign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ file_name: file.name, content_type: file.type, size_bytes: file.size }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Could not start the upload");
  return {
    url: data.upload_url,
    key: data.key,
    cdnUrl: data.cdn_url,
    contentType: data.upload_headers["Content-Type"],
    headers: data.upload_headers,
  };
}

export default function BasicUpload() {
  const handleUpload = (response: S3UploadResponseType) => {
    console.log("Uploaded:", response.location); // Public CDN URL
    console.log("Key:", response.key);           // Key chosen by your server
  };

  return (
    <IhubFileUploader
      header="Upload File"
      label="Drag and drop or click to browse"
      accept="image/*,video/*"
      getPresignedUrl={getPresignedUrl}
      onUploadComplete={handleUpload}
    />
  );
}
```

## With DB Save + Delete (Full Lifecycle)

When `saveEndpoint` and `token` are provided, the component automatically:
1. Uploads the file with the presigned URL
2. POSTs metadata to `saveEndpoint` to create a DB record
3. Shows uploaded files in a gallery with remove buttons
4. On remove: DELETEs from DB via `deleteEndpoint/{id}/`, then calls `deleteFile` so your server deletes the object

```tsx
"use client";
import { IhubFileUploader } from "@instincthub/react-ui";
import { S3UploadResponseType } from "@instincthub/react-ui/types";
import { API_HOST_URL } from "@instincthub/react-ui/lib";

interface Props {
  companyHandle: string;
  accessToken: string;
}

export default function ManagedUpload({ companyHandle, accessToken }: Props) {
  const handleUpload = (response: S3UploadResponseType) => {
    console.log("File uploaded and saved to DB:", response.location);
  };

  const handleRemove = (response: S3UploadResponseType) => {
    console.log("File removed from DB and S3:", response.title);
  };

  return (
    <IhubFileUploader
      header="Upload Media"
      label="Drag and drop images or videos"
      accept="image/*,video/*"
      name="social-media"
      module="social-media"
      getPresignedUrl={getPresignedUrl}
      onUploadComplete={handleUpload}
      // DB lifecycle props
      saveEndpoint={`${API_HOST_URL}social/${companyHandle}/media/upload/`}
      deleteEndpoint={`${API_HOST_URL}social/${companyHandle}/media/`}
      token={accessToken}
      deleteFile={async (file) => {
        await fetch(`/api/uploads/${encodeURIComponent(file.key)}`, { method: "DELETE" });
      }}
      onRemove={handleRemove}
    />
  );
}
```

### Save Endpoint Contract

When `saveEndpoint` is provided, the component POSTs JSON after the upload:

```
POST {saveEndpoint}
Authorization: Bearer {token}
Content-Type: application/json

{
  "file_url": "https://bucket.cdn.digitaloceanspaces.com/path/file.png",
  "file_key": "u42__2026-03-29t12-00-00-000z-filename.png",
  "file_name": "original-filename.png",
  "file_size": 123456,
  "content_type": "image/png",
  "media_type": "image"
}
```

Expected response: `{ "id": "uuid-of-db-record", ... }`

### Delete Endpoint Contract

When `deleteEndpoint` is provided, on remove the component sends:

```
DELETE {deleteEndpoint}{dbId}/
Authorization: Bearer {token}
```

The `dbId` is the `id` returned from the save endpoint. The object itself is deleted only through `deleteFile` (your server).

## Props Reference

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `header` | `string` | - | Header text above the uploader |
| `label` | `string` | `"Drag and drop files here or click to browse"` | Dropzone label text |
| `accept` | `string` | `"*"` | Accepted file types (e.g., `"image/*"`, `".pdf,.docx"`) |
| `maxFileSize` | `number` | `0` (unlimited) | Max file size in bytes |
| `name` | `string` | `"upload"` | Input field name |
| `module` | `string` | `""` | Module identifier for `setModules` callback |
| `step` | `string` | `""` | Step identifier for `setSteps` callback |
| `getPresignedUrl` | `(file: File) => Promise<PresignedUploadResult>` | - | **Required to upload.** Asks your server for a presigned PUT URL |
| `username` | `string \| null` | `null` | Deprecated, ignored since 0.5.0 (the server builds the key) |
| `className` | `string` | `""` | Additional CSS classes |

### Callback Props

| Prop | Type | Description |
|------|------|-------------|
| `onUploadComplete` | `(response: S3UploadResponseType) => void` | Called after a successful upload (and DB save if enabled) |
| `onRemove` | `(response: S3UploadResponseType) => void` | Called after the file is removed (DB delete + `deleteFile`) |
| `deleteFile` | `(response: S3UploadResponseType) => Promise<void>` | Called on remove so your server deletes the object. Errors are logged |
| `setValues` | `(name: string, value: string) => void` | Sets `name` to the S3 key |
| `setModules` | `(module, name, value) => void` | Sets module-scoped value |
| `setSteps` | `(module, step, name, value) => void` | Sets step-scoped value |

### DB Lifecycle Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `saveEndpoint` | `string` | - | API endpoint for POST to save DB record after the upload |
| `deleteEndpoint` | `string` | - | API endpoint prefix for DELETE (appends `{id}/`) |
| `token` | `string \| null` | - | Auth token for API calls (used with `reqOptions`) |
| `enableS3Delete` | `boolean` | `false` | Deprecated, ignored since 0.5.0: pass `deleteFile` |

## S3UploadResponseType

Returned by `onUploadComplete` and `onRemove`:

```typescript
interface S3UploadResponseType {
  bucket?: string;       // Not set by the presigned uploaders
  title: string;         // Original filename
  key: string;           // Key returned by your presign endpoint
  content_type: string;  // MIME type (e.g., "image/png")
  size: number;          // File size in bytes
  location: string;      // Full public CDN URL
}
```

### Key vs Location

- **`key`**: whatever your presign endpoint returned as `key` (usually without the bucket folder)
- **`location`**: the `cdnUrl` your presign endpoint returned

## Upload Flow

```
1. User selects/drops file
   ↓
2. Client-side validation (type, size)
   ↓
3. getPresignedUrl(file) on your server, then PUT the file to the returned URL
   ↓  Progress bar shown
4. Upload complete
   ↓
5. [If saveEndpoint] POST metadata to API → DB record created
   ↓
6. onUploadComplete callback fired
   ↓
7. File appears in gallery with remove button
```

## Delete Flow

```
1. User clicks X on uploaded file
   ↓
2. [If deleteEndpoint + dbId] DELETE {deleteEndpoint}{dbId}/ → DB record deleted
   ↓
3. [If deleteFile] deleteFile(response) → your server deletes the object
   ↓
4. onRemove callback fired
   ↓
5. File removed from gallery
```

## Related Components

- [FileUploader](./FileUploader.md) - Legacy file uploader (PrimeReact-based)
- [DropFile](./DropFile.md) - Simple drag & drop file component
- [InputText](./InputText.md) - Text input component
- [SubmitButton](./SubmitButton.md) - Submit button with loading states
