# S3 Multipart Upload Implementation Guide

This guide explains the implementation of AWS S3 multipart uploads in the FileUploader component, which is designed for handling large file uploads directly to S3 from the browser.

## Table of Contents

- [Overview](#overview)
- [Implementation Steps](#implementation-steps)
- [Key Components](#key-components)
- [Error Handling](#error-handling)
- [Performance Considerations](#performance-considerations)
- [Usage Example](#usage-example)

## Overview

Multipart upload allows you to upload a single object as a set of parts. This approach has several advantages:

1. **Improved throughput** - Upload parts in parallel to improve transfer speed
2. **Quick recovery from network issues** - Only need to restart upload for failed parts
3. **Pause and resume functionality** - Upload can be paused and resumed
4. **Begin upload before knowing final object size** - Start uploading while still generating data

The FileUploader component implements a complete multipart upload workflow using the AWS SDK v3 for JavaScript.

## Implementation Steps

The multipart upload process consists of three main steps:

### 1. Initiate Multipart Upload

```typescript
const createCommand = new CreateMultipartUploadCommand({
  Bucket: bucketName,
  Key: fullKey,
  ContentType: selectedFile.type,
  ACL: "public-read",
});

const { UploadId } = await s3Client.send(createCommand);
```

This returns an `UploadId` that identifies this specific multipart upload.

### 2. Upload Parts

For each part of the file:

```typescript
const uploadPartCommand = new UploadPartCommand({
  Bucket: bucketName,
  Key: fullKey,
  UploadId,
  PartNumber: partNumber,
  Body: fileSlice,
});

const { ETag } = await s3Client.send(uploadPartCommand);

uploadedParts.push({
  PartNumber: partNumber,
  ETag,
});
```

Each part needs to be at least 5MB in size (except the last part), and you can upload up to 10,000 parts.

### 3. Complete Multipart Upload

After all parts are uploaded:

```typescript
const completeCommand = new CompleteMultipartUploadCommand({
  Bucket: bucketName,
  Key: fullKey,
  UploadId,
  MultipartUpload: {
    Parts: uploadedParts,
  },
});

await s3Client.send(completeCommand);
```

This tells S3 to combine all the uploaded parts into a single file.

## Key Components

### File Slicing

The component includes a utility function to read slices of the file:

```typescript
const readFileSlice = (
  file: File,
  start: number,
  end: number
): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const slice = file.slice(start, end);
    reader.onload = (e) => {
      if (e.target?.result instanceof ArrayBuffer) {
        resolve(e.target.result);
      } else {
        reject(new Error("Failed to read file slice"));
      }
    };
    reader.onerror = (e) => reject(new Error("File read error"));
    reader.readAsArrayBuffer(slice);
  });
};
```

### Progress Tracking

The component tracks and displays upload progress:

```typescript
const progress = Math.round(((i + 1) / numParts) * 100);
setUploadPercentage(progress);
```

This is visualized using a progress bar that updates in real-time.

## Error Handling

The implementation includes try/catch blocks to handle errors during the upload process. If an error occurs, the component:

1. Logs the error to the console
2. Displays a toast notification to the user
3. Resets the upload progress

In a production environment, you might want to add code to abort an in-progress multipart upload if an error occurs:

```typescript
// Example of aborting a multipart upload on error
const abortCommand = new AbortMultipartUploadCommand({
  Bucket: bucketName,
  Key: fullKey,
  UploadId,
});

await s3Client.send(abortCommand);
```

## Performance Considerations

### Part Size

The component uses a part size of 5MB, which is the minimum allowed by S3. For very large files or in environments with reliable network connections, you might want to increase this size for better performance.

### Concurrent Uploads

The current implementation uploads parts sequentially. For better performance, especially with large files, consider implementing concurrent uploads:

```typescript
// Example of concurrent uploads
const uploadPromises = [];

for (let i = 0; i < numParts; i++) {
  // Create upload promise for each part
  uploadPromises.push(uploadPart(i));
}

const results = await Promise.all(uploadPromises);
```

## Usage Example

To use this component in your application:

Install aws-sdk ("^3.777.0") in your project:
```bash
npm install @aws-sdk/client-s3
```

```tsx
import React from "react";
import FileUploader from "./FileUploader";

const UploadPage = () => {
  const handleFileResponse = (response) => {
    console.log("Uploaded file:", response);
    // Process the response
  };

  return (
    <div className="upload-container">
      <h2>Upload Large Files</h2>
      <FileUploader
        headers="Video Upload"
        accepts="video/*"
        username="current-user"
        setResponse={handleFileResponse}
      />
    </div>
  );
};
```

This implementation provides a robust solution for uploading large files directly to S3, with progress tracking and error handling.
