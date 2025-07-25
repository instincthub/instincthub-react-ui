# fileToBase64

**Category:** Library | **Type:** utility

A utility function that converts a file to a base64 encoded string (without the data URL prefix). Perfect for file uploads, image processing, and data transmission scenarios.

## 📁 File Location

`src/components/lib/fileToBase64.ts`

## 🏷️ Tags

`file`, `base64`, `upload`, `convert`, `encoding`, `utility`

## 📖 Usage Examples

### Example 1: Complete File to Base64 Conversion Demo

```tsx
"use client";

import React, { useState } from "react";
import { fileToBase64 } from "@instincthub/react-ui/lib";

/**
 * Comprehensive example demonstrating fileToBase64 utility with various file types
 */
const FileToBase64Examples = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [base64Result, setBase64Result] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    size: number;
    type: string;
  } | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setFileInfo({
      name: file.name,
      size: file.size,
      type: file.type,
    });
    setError("");
    setLoading(true);

    try {
      const base64String = await fileToBase64(file);
      setBase64Result(base64String);
    } catch (err) {
      setError(`Error converting file: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyBase64 = () => {
    navigator.clipboard.writeText(base64Result);
    alert("Base64 string copied to clipboard!");
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="ihub-container ihub-py-5">
      <h1>fileToBase64 Utility Examples</h1>

      {/* File Upload Section */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">File Upload & Conversion</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-mb-3">
            <label htmlFor="fileInput" className="ihub-form-label">
              Select a file to convert to Base64:
            </label>
            <input
              id="fileInput"
              type="file"
              className="ihub-form-control"
              onChange={handleFileSelect}
              accept="image/*,text/*,.pdf,.doc,.docx"
            />
            <small className="ihub-form-text text-muted">
              Supports images, text files, PDFs, and documents
            </small>
          </div>

          {loading && (
            <div className="ihub-alert ihub-alert-info">
              <div className="ihub-d-flex ihub-align-items-center">
                <div className="spinner-border spinner-border-sm ihub-me-2" role="status"></div>
                Converting file to Base64...
              </div>
            </div>
          )}

          {error && (
            <div className="ihub-alert ihub-alert-danger">
              {error}
            </div>
          )}
        </div>
      </section>

      {/* File Information */}
      {fileInfo && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">File Information</h2>
          <div className="ihub-card ihub-p-4">
            <div className="ihub-row">
              <div className="ihub-col-md-4">
                <strong>File Name:</strong>
                <p className="text-muted">{fileInfo.name}</p>
              </div>
              <div className="ihub-col-md-4">
                <strong>File Size:</strong>
                <p className="text-muted">{formatFileSize(fileInfo.size)}</p>
              </div>
              <div className="ihub-col-md-4">
                <strong>File Type:</strong>
                <p className="text-muted">{fileInfo.type || "Unknown"}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Base64 Result */}
      {base64Result && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">Base64 Result</h2>
          <div className="ihub-card ihub-p-4">
            <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center ihub-mb-3">
              <h5>Encoded String</h5>
              <button
                className="ihub-btn ihub-btn-outline-primary ihub-btn-sm"
                onClick={handleCopyBase64}
              >
                Copy to Clipboard
              </button>
            </div>
            <textarea
              className="ihub-form-control"
              rows={6}
              value={base64Result}
              readOnly
              style={{ fontFamily: "monospace", fontSize: "12px" }}
            />
            <small className="ihub-form-text text-muted">
              Length: {base64Result.length} characters
            </small>
          </div>
        </section>
      )}

      {/* Image Preview (if applicable) */}
      {base64Result && fileInfo?.type.startsWith("image/") && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">Image Preview</h2>
          <div className="ihub-card ihub-p-4">
            <div className="text-center">
              <img
                src={`data:${fileInfo.type};base64,${base64Result}`}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: "300px", borderRadius: "8px" }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Usage Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Common Use Cases</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6 ihub-mb-3">
            <div className="ihub-card ihub-p-3">
              <h6 className="ihub-card-title">
                <i className="pi pi-upload ihub-me-2"></i>
                File Upload to API
              </h6>
              <p className="ihub-card-text">
                Convert files to Base64 for sending to REST APIs that don't support multipart/form-data.
              </p>
              <code className="ihub-d-block ihub-p-2 ihub-bg-light">
                {`const base64 = await fileToBase64(file);
const payload = { file: base64, name: file.name };`}
              </code>
            </div>
          </div>
          <div className="ihub-col-md-6 ihub-mb-3">
            <div className="ihub-card ihub-p-3">
              <h6 className="ihub-card-title">
                <i className="pi pi-image ihub-me-2"></i>
                Image Processing
              </h6>
              <p className="ihub-card-text">
                Convert images to Base64 for in-browser manipulation or display.
              </p>
              <code className="ihub-d-block ihub-p-2 ihub-bg-light">
                {`const base64 = await fileToBase64(imageFile);
imageElement.src = \`data:image/jpeg;base64,\${base64}\`;`}
              </code>
            </div>
          </div>
          <div className="ihub-col-md-6 ihub-mb-3">
            <div className="ihub-card ihub-p-3">
              <h6 className="ihub-card-title">
                <i className="pi pi-database ihub-me-2"></i>
                Local Storage
              </h6>
              <p className="ihub-card-text">
                Store files in browser localStorage using Base64 encoding.
              </p>
              <code className="ihub-d-block ihub-p-2 ihub-bg-light">
                {`const base64 = await fileToBase64(file);
localStorage.setItem('userFile', base64);`}
              </code>
            </div>
          </div>
          <div className="ihub-col-md-6 ihub-mb-3">
            <div className="ihub-card ihub-p-3">
              <h6 className="ihub-card-title">
                <i className="pi pi-send ihub-me-2"></i>
                Email Attachments
              </h6>
              <p className="ihub-card-text">
                Embed files in email content or send via JSON APIs.
              </p>
              <code className="ihub-d-block ihub-p-2 ihub-bg-light">
                {`const base64 = await fileToBase64(attachment);
const email = { content, attachments: [{ data: base64 }] };`}
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Error Handling Example */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Error Handling Best Practices</h2>
        <div className="ihub-card ihub-p-4">
          <h6>Robust File Conversion Function</h6>
          <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "12px" }}>
{`const convertFileToBase64 = async (file: File): Promise<string | null> => {
  try {
    // Validate file size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size exceeds 5MB limit');
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Unsupported file type');
    }

    const base64String = await fileToBase64(file);
    return base64String;
  } catch (error) {
    console.error('File conversion failed:', error);
    return null;
  }
};`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default FileToBase64Examples;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { fileToBase64 } from '@instincthub/react-ui/lib';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { fileToBase64 } from '@instincthub/react-ui/lib';

function FileUploadComponent() {
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64String = await fileToBase64(file);
      console.log('Base64:', base64String);
      // Use the base64 string as needed
    } catch (error) {
      console.error('Conversion failed:', error);
    }
  };

  return (
    <input type="file" onChange={handleFileUpload} />
  );
}
```

## 🔧 Function Signature

```tsx
fileToBase64(file: File): Promise<string>
```

### Parameters

- `file` (File): The file object to convert to Base64

### Returns

- `Promise<string>`: A promise that resolves to the Base64 encoded string (without data URL prefix)

### Throws

- `Error`: When file reading fails or encounters an error

## 📝 Important Notes

- **No Data URL Prefix**: Returns only the Base64 string, not the full data URL
- **Async Operation**: Returns a Promise, always use `await` or `.then()`
- **Memory Usage**: Large files will consume memory during conversion
- **Browser Support**: Uses FileReader API, supported in all modern browsers

## 💡 Use Cases

- File upload to APIs that require Base64 encoding
- Image processing and manipulation
- Storing files in localStorage or sessionStorage
- Email attachment handling
- Data transmission over JSON APIs
- Client-side file preview generation

## ⚠️ Performance Considerations

- **Large Files**: Be cautious with files > 10MB as they can cause memory issues
- **Multiple Files**: Process files sequentially to avoid memory overload
- **File Validation**: Always validate file type and size before conversion

## 🔗 Related Utilities

- [convertArrayToFormData](./convertArrayToFormData.md) - Convert arrays to FormData
- [slugifyFileName](./slugifyFileName.md) - Create URL-friendly file names
- [loadScript](./loadScript.md) - Dynamically load external scripts