# IhubFileUploader

**Category:** Forms | **Type:** component

Advanced file uploader with drag & drop, multiple files, and progress tracking

**File Location:** `src/components/forms/uploads/IhubFileUploader.tsx`

## 🏷️ Tags

`forms`, `upload`, `files`, `drag-drop`, `progress`

```tsx
"use client";
import React, { useState } from "react";
import { IhubFileUploader } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive examples demonstrating various file upload scenarios
 * Shows drag & drop, multiple files, progress tracking, and validation
 */
const IhubFileUploaderExamples = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Handle file selection and upload
  const handleFileUpload = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    setIsUploading(true);
    
    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      const fileId = `${file.name}-${Date.now()}`;
      
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setUploadedFiles(prev => [...prev, file]);
          openToast(`File '${file.name}' uploaded successfully!`);
        }
        setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
      }, 500);
    }
    
    setIsUploading(false);
  };

  const handleFileRemove = (fileName: string) => {
    setUploadedFiles(prev => prev.filter(file => file.name !== fileName));
    openToast(`File '${fileName}' removed`);
  };

  const handleUploadError = (error: string) => {
    openToast(error, 400);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>IhubFileUploader Examples</h1>
      <p className="ihub-mb-4">
        Advanced file uploader component with drag & drop support, progress tracking,
        file validation, and multiple file handling.
      </p>

      {/* Basic File Upload */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Basic File Upload</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Single File Upload</h3>
            <p className="ihub-text-muted">Basic file upload with drag & drop support</p>
          </div>
          
          <div className="ihub-card-body">
            <IhubFileUploader
              onFilesSelected={handleFileUpload}
              onError={handleUploadError}
              acceptedFileTypes={[".jpg", ".jpeg", ".png", ".gif", ".pdf", ".doc", ".docx"]}
              maxFileSize={5 * 1024 * 1024} // 5MB
              multiple={false}
              className="ihub-uploader-basic"
            />
            
            {uploadedFiles.length > 0 && (
              <div className="ihub-mt-3">
                <h4>Uploaded Files:</h4>
                <div className="ihub-file-list">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="ihub-file-item">
                      <div className="ihub-file-info">
                        <div className="ihub-file-name">{file.name}</div>
                        <div className="ihub-file-size">{formatFileSize(file.size)}</div>
                      </div>
                      <button
                        className="ihub-btn-sm ihub-danger-btn"
                        onClick={() => handleFileRemove(file.name)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Multiple File Upload */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Multiple File Upload</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Batch File Upload</h3>
            <p className="ihub-text-muted">Upload multiple files with progress tracking</p>
          </div>
          
          <div className="ihub-card-body">
            <IhubFileUploader
              onFilesSelected={handleFileUpload}
              onError={handleUploadError}
              acceptedFileTypes={[".jpg", ".jpeg", ".png", ".gif"]}
              maxFileSize={10 * 1024 * 1024} // 10MB
              multiple={true}
              maxFiles={5}
              showPreview={true}
              className="ihub-uploader-multiple"
            />
            
            {Object.keys(uploadProgress).length > 0 && (
              <div className="ihub-mt-3">
                <h4>Upload Progress:</h4>
                {Object.entries(uploadProgress).map(([fileId, progress]) => (
                  <div key={fileId} className="ihub-progress-container ihub-mb-2">
                    <div className="ihub-d-flex ihub-justify-content-between ihub-mb-1">
                      <span>{fileId.split('-')[0]}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="ihub-progress-bar">
                      <div 
                        className="ihub-progress-fill" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Document Upload */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Document Upload</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Document Management</h3>
            <p className="ihub-text-muted">Upload documents with specific validation</p>
          </div>
          
          <div className="ihub-card-body">
            <IhubFileUploader
              onFilesSelected={handleFileUpload}
              onError={handleUploadError}
              acceptedFileTypes={[".pdf", ".doc", ".docx", ".txt", ".xlsx", ".pptx"]}
              maxFileSize={20 * 1024 * 1024} // 20MB
              multiple={true}
              maxFiles={10}
              dropzoneText="Drop documents here or click to browse"
              uploadText="Select Documents"
              className="ihub-uploader-documents"
            />
            
            <div className="ihub-mt-3">
              <div className="ihub-upload-info">
                <h4>Supported Formats:</h4>
                <div className="ihub-d-flex" style={{ gap: "10px", flexWrap: "wrap" }}>
                  <span className="ihub-badge ihub-badge-outline-primary">PDF</span>
                  <span className="ihub-badge ihub-badge-outline-primary">DOC/DOCX</span>
                  <span className="ihub-badge ihub-badge-outline-primary">TXT</span>
                  <span className="ihub-badge ihub-badge-outline-primary">XLSX</span>
                  <span className="ihub-badge ihub-badge-outline-primary">PPTX</span>
                </div>
                <p className="ihub-mt-2 ihub-text-muted">
                  Maximum file size: 20MB per file. Up to 10 files allowed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Upload with Preview */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Image Upload with Preview</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Photo Gallery Upload</h3>
            <p className="ihub-text-muted">Upload images with thumbnail previews</p>
          </div>
          
          <div className="ihub-card-body">
            <IhubFileUploader
              onFilesSelected={handleFileUpload}
              onError={handleUploadError}
              acceptedFileTypes={[".jpg", ".jpeg", ".png", ".gif", ".webp"]}
              maxFileSize={5 * 1024 * 1024} // 5MB
              multiple={true}
              maxFiles={8}
              showPreview={true}
              previewSize="large"
              allowCrop={true}
              className="ihub-uploader-images"
            />
            
            <div className="ihub-mt-3">
              <div className="ihub-image-grid">
                {uploadedFiles
                  .filter(file => file.type.startsWith('image/'))
                  .map((file, index) => (
                    <div key={index} className="ihub-image-preview-item">
                      <img 
                        src={URL.createObjectURL(file)} 
                        alt={file.name}
                        className="ihub-image-thumbnail"
                      />
                      <div className="ihub-image-info">
                        <div className="ihub-image-name">{file.name}</div>
                        <div className="ihub-image-size">{formatFileSize(file.size)}</div>
                      </div>
                      <button
                        className="ihub-image-remove"
                        onClick={() => handleFileRemove(file.name)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Configuration */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Advanced Configuration</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Custom Validation</h3>
              </div>
              <div className="ihub-card-body">
                <IhubFileUploader
                  onFilesSelected={(files) => {
                    // Custom validation logic
                    const validFiles = Array.from(files).filter(file => {
                      if (file.name.includes('temp')) {
                        openToast(`File '${file.name}' rejected: temporary files not allowed`, 400);
                        return false;
                      }
                      return true;
                    });
                    
                    if (validFiles.length > 0) {
                      handleFileUpload(validFiles);
                    }
                  }}
                  onError={handleUploadError}
                  acceptedFileTypes={[".pdf", ".jpg", ".png"]}
                  maxFileSize={3 * 1024 * 1024} // 3MB
                  multiple={true}
                  maxFiles={3}
                  customValidator={(file) => {
                    if (file.name.length > 50) {
                      return "File name too long (max 50 characters)";
                    }
                    return null;
                  }}
                  className="ihub-uploader-custom"
                />
                
                <div className="ihub-mt-3">
                  <h4>Validation Rules:</h4>
                  <ul className="ihub-validation-rules">
                    <li>No temporary files allowed (filename contains 'temp')</li>
                    <li>Maximum file name length: 50 characters</li>
                    <li>File size limit: 3MB</li>
                    <li>Maximum 3 files</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Upload with Metadata</h3>
              </div>
              <div className="ihub-card-body">
                <IhubFileUploader
                  onFilesSelected={(files) => {
                    const filesWithMetadata = Array.from(files).map(file => ({
                      file,
                      metadata: {
                        uploadedAt: new Date().toISOString(),
                        category: 'user-upload',
                        tags: ['important'],
                      },
                    }));
                    
                    console.log('Files with metadata:', filesWithMetadata);
                    handleFileUpload(files);
                  }}
                  onError={handleUploadError}
                  acceptedFileTypes={[".jpg", ".png", ".pdf"]}
                  maxFileSize={10 * 1024 * 1024} // 10MB
                  multiple={false}
                  showProgress={true}
                  autoUpload={true}
                  className="ihub-uploader-metadata"
                />
                
                <div className="ihub-mt-3">
                  <h4>Features:</h4>
                  <ul>
                    <li>Automatic metadata attachment</li>
                    <li>Auto-upload on file selection</li>
                    <li>Progress tracking</li>
                    <li>Upload timestamp recording</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Implementation Guide</h2>
        <div className="ihub-card ihub-p-4">
          <h3>Props Interface:</h3>
          <pre className="ihub-code-block">
{`interface IhubFileUploaderProps {
  onFilesSelected: (files: FileList | File[]) => void;
  onError?: (error: string) => void;
  acceptedFileTypes?: string[];       // File extensions or MIME types
  maxFileSize?: number;               // Maximum file size in bytes
  multiple?: boolean;                 // Allow multiple file selection
  maxFiles?: number;                  // Maximum number of files
  showPreview?: boolean;              // Show file previews
  previewSize?: 'small' | 'medium' | 'large';
  allowCrop?: boolean;                // Enable image cropping
  dropzoneText?: string;              // Custom dropzone text
  uploadText?: string;                // Custom upload button text
  showProgress?: boolean;             // Show upload progress
  autoUpload?: boolean;               // Auto-upload on selection
  customValidator?: (file: File) => string | null;
  className?: string;
}`}
          </pre>
          
          <h3 className="ihub-mt-3">Key Features:</h3>
          <ul>
            <li><strong>Drag & Drop:</strong> Native HTML5 drag and drop support</li>
            <li><strong>File Validation:</strong> Type, size, and custom validation</li>
            <li><strong>Progress Tracking:</strong> Real-time upload progress</li>
            <li><strong>Image Previews:</strong> Thumbnail generation for images</li>
            <li><strong>Multiple Files:</strong> Batch upload with individual tracking</li>
            <li><strong>Error Handling:</strong> Comprehensive error management</li>
          </ul>
          
          <h3 className="ihub-mt-3">Best Practices:</h3>
          <ul>
            <li>Always validate files on both client and server side</li>
            <li>Provide clear feedback for upload progress and errors</li>
            <li>Use appropriate file size limits based on your use case</li>
            <li>Implement proper error handling and retry mechanisms</li>
            <li>Consider using chunked uploads for large files</li>
            <li>Optimize image previews for performance</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default IhubFileUploaderExamples;
```

## 🔗 Related Components

- [FileUploader](./FileUploader.md) - Basic file uploader component
- [DropFile](./DropFile.md) - Simple drag & drop file component
- [InputText](./InputText.md) - Text input component
- [SubmitButton](./SubmitButton.md) - Submit button with loading states
- [ProgressBar](./ProgressBar.md) - Progress tracking component
