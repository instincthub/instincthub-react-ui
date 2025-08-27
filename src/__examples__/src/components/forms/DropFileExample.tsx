"use client";

import React, { useState } from "react";
import { DropFile } from "../../../../index";

const DropFileExample: React.FC = () => {
  const [basicUploadedFile, setBasicUploadedFile] = useState<File | null>(null);
  const [contactUploadedFile, setContactUploadedFile] = useState<File | null>(null);
  const [reportUploadedFile, setReportUploadedFile] = useState<File | null>(null);
  const [customUploadedFile, setCustomUploadedFile] = useState<File | null>(null);
  const [multipleFiles, setMultipleFiles] = useState<File[]>([]);

  // Utility function to format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Basic file drop handler
  const handleBasicDrop = (file: File) => {
    setBasicUploadedFile(file);
    console.log("Basic upload:", file);
  };

  // Contact import handler with validation
  const handleContactDrop = (file: File) => {
    setContactUploadedFile(file);
    
    // Validate file type
    const validTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv"
    ];
    
    if (!validTypes.includes(file.type)) {
      console.error("Please upload a valid Excel or CSV file");
      return;
    }
    
    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      console.error("File size must be less than 5MB");
      return;
    }
    
    console.log("Contact upload:", file);
    processContactFile(file);
  };

  // Report upload handler
  const handleReportDrop = (file: File) => {
    setReportUploadedFile(file);
    console.log("Report upload:", file);
    
    // Simulate processing
    setTimeout(() => {
      console.log("Report processing completed!");
    }, 2000);
  };

  // Custom template handler
  const handleCustomDrop = (file: File) => {
    setCustomUploadedFile(file);
    
    // Custom validation logic
    if (file.name.toLowerCase().includes("template")) {
      console.log("Template file detected:", file.name);
    }
    
    console.log("Custom upload:", file);
  };

  // Multiple files handler
  const handleMultipleDrop = (file: File) => {
    setMultipleFiles(prev => [...prev, file]);
    console.log("Multiple files upload:", file);
  };

  // Process contact file (mock function)
  const processContactFile = (file: File) => {
    console.log("Processing contact file:", file.name);
    // Here you would typically parse the Excel/CSV file
    // and extract contact information
  };

  // Remove file from multiple files list
  const removeFile = (index: number) => {
    setMultipleFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Clear all files
  const clearAllFiles = () => {
    setBasicUploadedFile(null);
    setContactUploadedFile(null);
    setReportUploadedFile(null);
    setCustomUploadedFile(null);
    setMultipleFiles([]);
  };

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>DropFile Examples</h1>
        <p>File drag and drop component with support for Excel and CSV files</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic File Drop */}
        <div className="ihub-example-card">
          <h3>Basic File Upload</h3>
          <p>Simple drag and drop file upload</p>
          <DropFile
            label="Drop any file here"
            onDrop={handleBasicDrop}
          />
          {basicUploadedFile && (
            <div className="ihub-file-info ihub-mt-3">
              <h4>Uploaded File:</h4>
              <p><strong>Name:</strong> {basicUploadedFile.name}</p>
              <p><strong>Size:</strong> {formatFileSize(basicUploadedFile.size)}</p>
              <p><strong>Type:</strong> {basicUploadedFile.type || 'Unknown'}</p>
            </div>
          )}
        </div>

        {/* Contact Import */}
        <div className="ihub-example-card">
          <h3>Contact Import (Excel/CSV)</h3>
          <p>Upload contact lists with file validation</p>
          <DropFile
            label="Drop Excel or CSV file with contacts"
            onDrop={handleContactDrop}
            acceptedTypes={[".xlsx", ".xls", ".csv"]}
          />
          {contactUploadedFile && (
            <div className="ihub-file-info ihub-mt-3">
              <h4>Contact File:</h4>
              <p><strong>Name:</strong> {contactUploadedFile.name}</p>
              <p><strong>Size:</strong> {formatFileSize(contactUploadedFile.size)}</p>
              <div className="ihub-processing-status">
                <span className="ihub-status-badge">Processing...</span>
              </div>
            </div>
          )}
        </div>

        {/* Report Upload */}
        <div className="ihub-example-card">
          <h3>Report Analysis</h3>
          <p>Upload reports for data analysis</p>
          <DropFile
            label="Drop report file for analysis"
            onDrop={handleReportDrop}
            acceptedTypes={[".xlsx", ".csv", ".pdf"]}
          />
          {reportUploadedFile && (
            <div className="ihub-file-info ihub-mt-3">
              <h4>Report File:</h4>
              <p><strong>Name:</strong> {reportUploadedFile.name}</p>
              <p><strong>Size:</strong> {formatFileSize(reportUploadedFile.size)}</p>
              <div className="ihub-analysis-status">
                <span className="ihub-status-badge">Analyzing...</span>
              </div>
            </div>
          )}
        </div>

        {/* Custom Template with onClick */}
        <div className="ihub-example-card">
          <h3>Template Upload with Dynamic Download</h3>
          <p>Upload templates with dynamic template generation</p>
          <DropFile
            label="Drop template file here"
            onDrop={handleCustomDrop}
            acceptedTypes={[".xlsx", ".docx", ".pptx"]}
            onTemplateDownload={() => {
              console.log("Generating custom template...");
              // Simulate dynamic template generation
              const templateData = {
                name: "Custom Template",
                columns: ["Name", "Email", "Phone", "Company"],
                timestamp: new Date().toISOString()
              };
              
              // In a real app, you might:
              // 1. Call an API to generate the template
              // 2. Show a loading spinner
              // 3. Download the generated file
              alert(`Generating template with columns: ${templateData.columns.join(", ")}\n\nTimestamp: ${templateData.timestamp}`);
            }}
          />
          {customUploadedFile && (
            <div className="ihub-file-info ihub-mt-3">
              <h4>Template File:</h4>
              <p><strong>Name:</strong> {customUploadedFile.name}</p>
              <p><strong>Size:</strong> {formatFileSize(customUploadedFile.size)}</p>
              {customUploadedFile.name.toLowerCase().includes("template") && (
                <div className="ihub-template-detected">
                  <span className="ihub-status-badge ihub-success">Template Detected!</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Multiple Files */}
        <div className="ihub-example-card">
          <h3>Multiple Files Upload</h3>
          <p>Upload multiple files with file management</p>
          <DropFile
            label="Drop multiple files here"
            onDrop={handleMultipleDrop}
          />
          {multipleFiles.length > 0 && (
            <div className="ihub-files-list ihub-mt-3">
              <h4>Uploaded Files ({multipleFiles.length}):</h4>
              <div className="ihub-files-grid">
                {multipleFiles.map((file, index) => (
                  <div key={index} className="ihub-file-item">
                    <div className="ihub-file-details">
                      <strong>{file.name}</strong>
                      <small>{formatFileSize(file.size)}</small>
                    </div>
                    <button 
                      onClick={() => removeFile(index)}
                      className="ihub-remove-btn"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Image Upload */}
        <div className="ihub-example-card">
          <h3>Image Upload</h3>
          <p>Upload images with preview</p>
          <DropFile
            label="Drop image files here"
            onDrop={(file) => console.log("Image uploaded:", file)}
            acceptedTypes={[".jpg", ".jpeg", ".png", ".gif", ".webp"]}
          />
        </div>

        {/* Document Upload */}
        <div className="ihub-example-card">
          <h3>Document Upload</h3>
          <p>Upload various document types</p>
          <DropFile
            label="Drop documents here"
            onDrop={(file) => console.log("Document uploaded:", file)}
            acceptedTypes={[".pdf", ".doc", ".docx", ".txt"]}
          />
        </div>

        {/* Async Template Generation */}
        <div className="ihub-example-card">
          <h3>Async Template Generation</h3>
          <p>Template generation with loading states</p>
          <DropFile
            label="Drop contact file here"
            onDrop={(file) => console.log("Contact file uploaded:", file)}
            acceptedTypes={[".xlsx", ".csv"]}
            onTemplateDownload={async () => {
              console.log("Starting async template generation...");
              
              try {
                // Simulate loading state
                const button = document.querySelector('.ihub-template-download-btn') as HTMLButtonElement;
                const originalText = button?.textContent;
                if (button) {
                  button.textContent = 'Generating...';
                  button.disabled = true;
                  button.style.opacity = '0.6';
                }

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Simulate template download
                const templateContent = "Name,Email,Phone,Company\nJohn Doe,john@example.com,123-456-7890,Acme Inc";
                const blob = new Blob([templateContent], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'contact-template.csv';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);

                // Reset button state
                if (button) {
                  button.textContent = originalText;
                  button.disabled = false;
                  button.style.opacity = '1';
                }

                alert("Template generated and downloaded successfully!");
              } catch (error) {
                console.error("Template generation failed:", error);
                alert("Failed to generate template. Please try again.");
                
                // Reset button state on error
                const button = document.querySelector('.ihub-template-download-btn') as HTMLButtonElement;
                if (button) {
                  button.textContent = 'Download Template';
                  button.disabled = false;
                  button.style.opacity = '1';
                }
              }
            }}
          />
        </div>

        {/* Large File Upload */}
        <div className="ihub-example-card">
          <h3>Large File Upload</h3>
          <p>Upload large files with progress indication</p>
          <DropFile
            label="Drop large files here (up to 100MB)"
            onDrop={(file) => {
              console.log("Large file uploaded:", file);
              // Here you could implement chunk upload for large files
            }}
            maxSize={100 * 1024 * 1024} // 100MB
          />
        </div>
      </div>

      {/* File Management Section */}
      {(basicUploadedFile || contactUploadedFile || reportUploadedFile || customUploadedFile || multipleFiles.length > 0) && (
        <div className="ihub-file-management ihub-mt-5">
          <h2>File Management</h2>
          <div className="ihub-management-actions">
            <button onClick={clearAllFiles} className="ihub-clear-btn">
              Clear All Files
            </button>
            <button 
              onClick={() => console.log("Processing all files...")} 
              className="ihub-process-btn"
            >
              Process All Files
            </button>
          </div>
        </div>
      )}

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { DropFile } from '@instincthub/react-ui';

const handleDrop = (file: File) => {
  console.log("File uploaded:", file);
};

<DropFile
  label="Drop file here"
  onDrop={handleDrop}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>With File Type Restrictions</h3>
          <pre><code>{`<DropFile
  label="Drop Excel or CSV file"
  onDrop={handleDrop}
  acceptedTypes={[".xlsx", ".xls", ".csv"]}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>With File Size Limit</h3>
          <pre><code>{`<DropFile
  label="Drop file (max 5MB)"
  onDrop={handleDrop}
  maxSize={5 * 1024 * 1024} // 5MB
  acceptedTypes={[".pdf", ".docx"]}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Dynamic Template Download</h3>
          <pre><code>{`<DropFile
  label="Drop contact file here"
  onDrop={handleDrop}
  acceptedTypes={[".xlsx", ".csv"]}
  onTemplateDownload={() => {
    console.log("Generating template...");
    // Custom template generation logic
    generateAndDownloadTemplate();
  }}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Async Template Generation</h3>
          <pre><code>{`<DropFile
  label="Drop file here"
  onDrop={handleDrop}
  onTemplateDownload={async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/generate-template');
      const blob = await response.blob();
      
      // Download the generated template
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'template.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Template generation failed:', error);
    } finally {
      setLoading(false);
    }
  }}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>File Processing Example</h3>
          <pre><code>{`const handleFileUpload = (file: File) => {
  // Validate file type
  const validTypes = ["application/vnd.ms-excel", "text/csv"];
  
  if (!validTypes.includes(file.type)) {
    console.error("Invalid file type");
    return;
  }
  
  // Process the file
  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target?.result;
    // Process file content
  };
  reader.readAsText(file);
};`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default DropFileExample;