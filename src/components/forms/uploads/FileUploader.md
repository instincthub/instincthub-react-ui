# S3 Upload Implementation Guide

This guide explains the implementation of AWS S3 uploads in the FileUploader component, which handles both small and large files efficiently.

## Table of Contents

- [Overview](#overview)
- [Implementation Strategy](#implementation-strategy)
- [Small File Uploads](#small-file-uploads)
- [Large File Uploads](#large-file-uploads)
- [Advantages](#advantages)
- [Troubleshooting](#troubleshooting)
- [Usage Example](#usage-example)

## Overview

The FileUploader component uses a hybrid approach to handle different file sizes:

1. **Small Files (< 100MB)**: Simple direct upload using `PutObjectCommand`
2. **Large Files (≥ 100MB)**: Multipart upload using the `@aws-sdk/lib-storage` package's `Upload` class

This approach provides the best of both worlds: simplicity for small files and robustness for large files.

## Implementation Strategy

### Decision Logic

```typescript
// Decide between single-part and multipart upload based on file size
const FILE_SIZE_THRESHOLD = 100 * 1024 * 1024; // 100 MB threshold

if (selectedFile.size < FILE_SIZE_THRESHOLD) {
  // Small file upload logic
} else {
  // Large file upload logic
}
```

## Small File Uploads

For files smaller than the threshold, we use a straightforward approach:

```typescript
// For smaller files, use simple upload
const { PutObjectCommand } = await import("@aws-sdk/client-s3");

setUploadPercentage(10); // Start progress

const putCommand = new PutObjectCommand({
  Bucket: bucketName,
  Key: fullKey,
  Body: selectedFile,
  ContentType: selectedFile.type,
  ACL: "public-read",
});

// Use a timer to simulate progress
const simulateProgress = setInterval(() => {
  setUploadPercentage((prev) => Math.min(prev + 5, 95));
}, 300);

await s3Client.send(putCommand);
clearInterval(simulateProgress);
setUploadPercentage(100);
```

This approach is simple and works well for smaller files.

## Large File Uploads

For larger files, we use the AWS SDK's `Upload` class from `@aws-sdk/lib-storage`:

```typescript
// For larger files, use multipart upload
const { Upload } = await import("@aws-sdk/lib-storage");

// Create uploader with proper progress tracking
const upload = new Upload({
  client: s3Client,
  params: {
    Bucket: bucketName,
    Key: fullKey,
    Body: selectedFile,
    ContentType: selectedFile.type,
    ACL: "public-read",
  },
});

// Add progress tracking
upload.on("httpUploadProgress", (progress) => {
  const percentage = Math.round((progress.loaded / progress.total) * 100);
  setUploadPercentage(percentage);
});

// Execute the upload
await upload.done();
```

The `Upload` class handles all the complexity of breaking the file into parts, uploading them in parallel, and reassembling them on S3.

## Advantages

This hybrid approach offers several benefits:

1. **Simplicity for Small Files**: Direct uploads are faster and simpler for small files
2. **Robustness for Large Files**: Multipart uploads provide reliable transfer of large files
3. **Accurate Progress Tracking**: Real progress tracking for large files, simulated for small ones
4. **Browser Compatibility**: Uses the recommended AWS SDK approaches for browser environments
5. **Automatic Retries**: The `Upload` class includes retry logic for failed uploads
6. **Memory Efficiency**: Handles files in chunks, avoiding memory issues with large files

## Troubleshooting

Common issues and solutions:

1. **CORS Errors**: Ensure your S3 bucket has proper CORS configuration:

   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
       "AllowedOrigins": ["*"],
       "ExposeHeaders": ["ETag"]
     }
   ]
   ```

2. **Authentication Errors**: Check that your AWS credentials are correctly configured in environment variables

3. **Upload Size Limits**: If files still fail, check for limits in your hosting environment, proxies, or load balancers

## Usage Example

```tsx
import React from "react";
import FileUploader from "./FileUploader";

const VideoUploadPage = () => {
  const handleUploadComplete = (response) => {
    console.log("Upload complete:", response);
    // Do something with the response
  };

  return (
    <div>
      <h1>Upload Video</h1>
      <p>Supports files up to 5GB in size</p>

      <FileUploader
        headers="Video Upload"
        accepts="video/*"
        username="user123"
        setResponse={handleUploadComplete}
      />
    </div>
  );
};
```

This implementation provides a robust solution for uploading files of any size directly to S3, with progress tracking and proper error handling.
