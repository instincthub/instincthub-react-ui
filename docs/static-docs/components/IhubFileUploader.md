# IhubFileUploader

**Category:** Forms | **Type:** component

Advanced file uploader with drag & drop, direct S3 upload, progress tracking, optional DB persistence, and S3 deletion on remove.

**File Location:** `src/components/forms/uploads/IhubFileUploader.tsx`

## Tags

`forms`, `upload`, `files`, `drag-drop`, `progress`, `s3`, `aws`

## Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { IhubFileUploader } from "@instincthub/react-ui";
import type { S3UploadResponseType } from "@instincthub/react-ui/types";
```

## Environment Variables Required

```bash
# S3 / DigitalOcean Spaces configuration
NEXT_PUBLIC_AWS_REGION="nyc3"
NEXT_PUBLIC_AWS_S3_ENDPOINT_URL="https://nyc3.digitaloceanspaces.com"
NEXT_PUBLIC_AWS_ACCESS_KEY_ID="your-access-key"
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY="your-secret-key"
NEXT_PUBLIC_AWS_BUCKET_NAME="your-bucket"
NEXT_PUBLIC_AWS_LOCATION="dev_env__creator-videos"        # Video upload path
NEXT_PUBLIC_AWS_LOCATION_FILES="dev_env__creator-files"   # File/image upload path
```

## Basic Usage (S3 Upload Only)

Uploads directly to S3 from the browser. No backend needed.

```tsx
"use client";
import { IhubFileUploader } from "@instincthub/react-ui";
import { S3UploadResponseType } from "@instincthub/react-ui/types";

export default function BasicUpload() {
  const handleUpload = (response: S3UploadResponseType) => {
    console.log("Uploaded:", response.location); // Public CDN URL
    console.log("S3 Key:", response.key);        // Slugified filename
  };

  return (
    <IhubFileUploader
      header="Upload File"
      label="Drag and drop or click to browse"
      accept="image/*,video/*"
      username="myapp"
      onUploadComplete={handleUpload}
    />
  );
}
```

## With DB Save + S3 Delete (Full Lifecycle)

When `saveEndpoint` and `token` are provided, the component automatically:
1. Uploads file to S3
2. POSTs metadata to `saveEndpoint` to create a DB record
3. Shows uploaded files in a gallery with remove buttons
4. On remove: DELETEs from DB via `deleteEndpoint/{id}/`, then deletes from S3

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
      username={companyHandle}
      header="Upload Media"
      label="Drag and drop images or videos"
      accept="image/*,video/*"
      name="social-media"
      module="social-media"
      onUploadComplete={handleUpload}
      // DB lifecycle props
      saveEndpoint={`${API_HOST_URL}social/${companyHandle}/media/upload/`}
      deleteEndpoint={`${API_HOST_URL}social/${companyHandle}/media/`}
      token={accessToken}
      enableS3Delete={true}
      onRemove={handleRemove}
    />
  );
}
```

### Save Endpoint Contract

When `saveEndpoint` is provided, the component POSTs JSON after S3 upload:

```
POST {saveEndpoint}
Authorization: Bearer {token}
Content-Type: application/json

{
  "file_url": "https://bucket.cdn.digitaloceanspaces.com/path/file.png",
  "file_key": "test-env__username-2026-03-29-filename.png",
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

The `dbId` is the `id` returned from the save endpoint. The component also deletes the file from S3 directly if `enableS3Delete={true}`.

## Props Reference

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `header` | `string` | — | Header text above the uploader |
| `label` | `string` | `"Drag and drop files here or click to browse"` | Dropzone label text |
| `accept` | `string` | `"*"` | Accepted file types (e.g., `"image/*"`, `".pdf,.docx"`) |
| `maxFileSize` | `number` | `0` (unlimited) | Max file size in bytes |
| `name` | `string` | `"upload"` | Input field name |
| `module` | `string` | `""` | Module identifier for `setModules` callback |
| `step` | `string` | `""` | Step identifier for `setSteps` callback |
| `username` | `string \| null` | `null` | Used in S3 key generation (`{username}-{timestamp}-{filename}`) |
| `className` | `string` | `""` | Additional CSS classes |

### Callback Props

| Prop | Type | Description |
|------|------|-------------|
| `onUploadComplete` | `(response: S3UploadResponseType) => void` | Called after successful S3 upload (and DB save if enabled) |
| `onRemove` | `(response: S3UploadResponseType) => void` | Called after file is removed (DB + S3 delete) |
| `setValues` | `(name: string, value: string) => void` | Sets `name` to the S3 key |
| `setModules` | `(module, name, value) => void` | Sets module-scoped value |
| `setSteps` | `(module, step, name, value) => void` | Sets step-scoped value |

### DB + S3 Lifecycle Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `saveEndpoint` | `string` | — | API endpoint for POST to save DB record after S3 upload |
| `deleteEndpoint` | `string` | — | API endpoint prefix for DELETE (appends `{id}/`) |
| `token` | `string \| null` | — | Auth token for API calls (used with `reqOptions`) |
| `enableS3Delete` | `boolean` | `false` | If true, deletes file from S3 when user removes it |

## S3UploadResponseType

Returned by `onUploadComplete` and `onRemove`:

```typescript
interface S3UploadResponseType {
  bucket: string;        // S3 bucket name
  title: string;         // Original filename
  key: string;           // Slugified S3 key (filename only, no path prefix)
  content_type: string;  // MIME type (e.g., "image/png")
  size: number;          // File size in bytes
  location: string;      // Full public CDN URL
}
```

### S3 Key vs Location

- **`key`**: Just the slugified filename, e.g., `test-env__myapp-2026-03-29t12-00-00z-photo.png`
- **`location`**: Full CDN URL, e.g., `https://bucket.nyc3.cdn.digitaloceanspaces.com/dev_env__creator-files/test-env__myapp-2026-03-29t12-00-00z-photo.png`
- **Actual S3 key** (for deletion): Extract from URL pathname, e.g., `dev_env__creator-files/test-env__myapp-2026-03-29t12-00-00z-photo.png`

The component handles this extraction automatically when `enableS3Delete={true}`.

## Upload Flow

```
1. User selects/drops file
   ↓
2. Client-side validation (type, size)
   ↓
3. Upload to S3 (PutObjectCommand or multipart for >100MB)
   ↓  Progress bar shown
4. S3 upload complete
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
3. [If enableS3Delete] Extract S3 key from file_url → DeleteObjectCommand
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
