# FileUploader: presigned uploads

Since 0.5.0, `FileUploader` and `IhubFileUploader` never sign S3 requests in
the browser and never read `NEXT_PUBLIC_AWS_*` credentials. Anything
`NEXT_PUBLIC_` is inlined into the JavaScript every visitor downloads, so a
bucket secret there can be used by anyone to write to or delete from the
bucket.

## How an upload works

1. The user picks a file.
2. The component calls your `getPresignedUrl(file)`.
3. Your server checks the session, allowlists the content type, caps the size,
   builds the object key itself, and returns a short-lived presigned PUT URL
   plus the headers it signed.
4. The component `PUT`s the file straight to the bucket with those headers and
   reports progress.
5. `setResponse` / `onUploadComplete` receive `{ title, key, content_type, size, location }`,
   where `key` and `location` come from your server.

## Usage

```tsx
import { FileUploader } from "@instincthub/react-ui";
import type { PresignedUploadResult } from "@instincthub/react-ui/types";

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

<FileUploader
  accepts="image/*"
  getPresignedUrl={getPresignedUrl}
  setResponse={(res) => console.log(res.location)}
/>;
```

Without `getPresignedUrl` (and without `onUpload`), the upload button shows
"Uploads are not configured".

## Server checklist

- Require a signed-in session.
- Allowlist content types per upload kind (no HTML, SVG or XML on a public bucket).
- Cap the size and sign `Content-Length`, `Content-Type` and any `x-amz-acl`.
- Build the key on the server from the user's id; never take a key from the client.
- With AWS SDK v3, set `requestChecksumCalculation: "WHEN_REQUIRED"` on the
  `S3Client`, or the presigned URL carries a checksum of an empty body and the
  browser PUT fails.
- Allow `PUT` with `content-type` and `x-amz-acl` headers from your app's origin
  in the bucket's CORS rules.

A complete Next.js example lives in `creators_nextjs`:
`src/app/api/uploads/presign/route.ts` and `src/lib/uploads/`.
