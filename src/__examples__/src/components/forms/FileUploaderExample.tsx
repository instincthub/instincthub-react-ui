"use client";

import React, { useState } from "react";
import { FileUploader, SubmitButton } from "../../../../index";

const FileUploaderExample: React.FC = () => {
  const [uploadedFiles1, setUploadedFiles1] = useState<File[]>([]);
  const [uploadedFiles2, setUploadedFiles2] = useState<File[]>([]);
  const [uploadedFiles3, setUploadedFiles3] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = async (files: File[]) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log("Files uploaded:", files);
    setIsUploading(false);
    setUploadProgress(0);
  };

  const handleFileRemove = (index: number, fileList: File[], setFileList: (files: File[]) => void) => {
    const newFiles = fileList.filter((_, i) => i !== index);
    setFileList(newFiles);
  };

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>FileUploader Examples</h1>
        <p>File upload component with drag-and-drop, multiple files, and progress tracking</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic File Uploader */}
        <div className="ihub-example-card">
          <h3>Basic File Uploader</h3>
          <p>Simple file upload with drag and drop support</p>
          
          <FileUploader
            onFilesSelected={setUploadedFiles1}
            maxFiles={5}
            maxFileSize={10 * 1024 * 1024} // 10MB
            acceptedFileTypes={[".jpg", ".jpeg", ".png", ".gif", ".pdf", ".doc", ".docx"]}
            placeholder="Drag and drop files here or click to select"
          />
          
          {uploadedFiles1.length > 0 && (
            <div className="ihub-file-list">
              <h4>Selected Files ({uploadedFiles1.length}):</h4>
              {uploadedFiles1.map((file, index) => (
                <div key={index} className="ihub-file-item">
                  <span className="ihub-file-name">{file.name}</span>
                  <span className="ihub-file-size">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                  <button
                    onClick={() => handleFileRemove(index, uploadedFiles1, setUploadedFiles1)}
                    className="ihub-remove-btn"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Image Upload with Preview */}
        <div className="ihub-example-card">
          <h3>Image Upload with Preview</h3>
          <p>Image uploader with thumbnail previews</p>
          
          <FileUploader
            onFilesSelected={setUploadedFiles2}
            maxFiles={3}
            maxFileSize={5 * 1024 * 1024} // 5MB
            acceptedFileTypes={[".jpg", ".jpeg", ".png", ".gif"]}
            placeholder="Upload images (JPG, PNG, GIF)"
            showPreview={true}
            uploadType="image"
          />
          
          {uploadedFiles2.length > 0 && (
            <div className="ihub-image-preview-grid">
              {uploadedFiles2.map((file, index) => (
                <div key={index} className="ihub-image-preview-item">
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt={file.name}
                    className="ihub-preview-image"
                  />
                  <div className="ihub-image-info">
                    <span className="ihub-image-name">{file.name}</span>
                    <button
                      onClick={() => handleFileRemove(index, uploadedFiles2, setUploadedFiles2)}
                      className="ihub-remove-preview-btn"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Advanced File Uploader */}
        <div className="ihub-example-card">
          <h3>Advanced File Uploader</h3>
          <p>Full-featured uploader with validation and progress tracking</p>
          
          <FileUploader
            onFilesSelected={setUploadedFiles3}
            onUpload={handleFileUpload}
            maxFiles={10}
            maxFileSize={20 * 1024 * 1024} // 20MB
            acceptedFileTypes={[".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".txt"]}
            placeholder="Upload documents (PDF, DOC, XLS, PPT, TXT)"
            showProgress={true}
            isUploading={isUploading}
            uploadProgress={uploadProgress}
            validateFiles={true}
            allowDuplicates={false}
            showFileSize={true}
            showFileType={true}
          />
          
          {uploadedFiles3.length > 0 && (
            <div className="ihub-document-list">
              <h4>Document Queue:</h4>
              {uploadedFiles3.map((file, index) => (
                <div key={index} className="ihub-document-item">
                  <div className="ihub-document-icon">📄</div>
                  <div className="ihub-document-details">
                    <span className="ihub-document-name">{file.name}</span>
                    <span className="ihub-document-meta">
                      {file.type} • {(file.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                  <button
                    onClick={() => handleFileRemove(index, uploadedFiles3, setUploadedFiles3)}
                    className="ihub-remove-document-btn"
                  >
                    Remove
                  </button>
                </div>
              ))}
              
              {uploadedFiles3.length > 0 && (
                <SubmitButton
                  title={isUploading ? `Uploading... ${uploadProgress}%` : "Upload All Files"}
                  status={isUploading ? 2 : 1}
                  className="ihub-upload-btn ihub-mt-3"
                  onClick={() => handleFileUpload(uploadedFiles3)}
                  disabled={isUploading}
                />
              )}
            </div>
          )}
        </div>

        {/* Multiple Upload Types */}
        <div className="ihub-example-card">
          <h3>Specialized Upload Types</h3>
          <p>Different upload configurations for specific use cases</p>
          
          <div className="ihub-upload-types">
            <div className="ihub-upload-section">
              <h5>Avatar Upload</h5>
              <FileUploader
                maxFiles={1}
                maxFileSize={2 * 1024 * 1024} // 2MB
                acceptedFileTypes={[".jpg", ".jpeg", ".png"]}
                placeholder="Upload profile picture"
                uploadType="avatar"
                showPreview={true}
                cropEnabled={true}
                aspectRatio="1:1"
              />
            </div>
            
            <div className="ihub-upload-section">
              <h5>CSV Upload</h5>
              <FileUploader
                maxFiles={1}
                maxFileSize={10 * 1024 * 1024} // 10MB
                acceptedFileTypes={[".csv"]}
                placeholder="Upload CSV file for import"
                uploadType="data"
                validateCSV={true}
                showPreview={false}
              />
            </div>
            
            <div className="ihub-upload-section">
              <h5>Video Upload</h5>
              <FileUploader
                maxFiles={1}
                maxFileSize={100 * 1024 * 1024} // 100MB
                acceptedFileTypes={[".mp4", ".avi", ".mov", ".wmv"]}
                placeholder="Upload video file"
                uploadType="video"
                showProgress={true}
                generateThumbnail={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { FileUploader } from '@instincthub/react-ui';

const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

<FileUploader
  onFilesSelected={setUploadedFiles}
  maxFiles={5}
  maxFileSize={10 * 1024 * 1024} // 10MB
  acceptedFileTypes={[".jpg", ".jpeg", ".png", ".pdf"]}
  placeholder="Drag and drop files here"
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Upload Handler</h3>
          <pre><code>{`const handleFileUpload = async (files: File[]) => {
  setIsUploading(true);
  try {
    const response = await uploadAPI(files);
    console.log('Upload successful:', response);
  } catch (error) {
    console.error('Upload failed:', error);
  } finally {
    setIsUploading(false);
  }
};

<FileUploader
  onFilesSelected={setUploadedFiles}
  onUpload={handleFileUpload}
  showProgress={true}
  isUploading={isUploading}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Image Upload with Preview</h3>
          <pre><code>{`<FileUploader
  onFilesSelected={setImages}
  maxFiles={3}
  acceptedFileTypes={[".jpg", ".jpeg", ".png"]}
  uploadType="image"
  showPreview={true}
  cropEnabled={true}
  aspectRatio="16:9"
/>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default FileUploaderExample;