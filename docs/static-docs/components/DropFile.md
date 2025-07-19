# DropFile

**Category:** Forms | **Type:** component

File drag and drop component with support for Excel and CSV files

## 🏷️ Tags

`forms`, `file-upload`, `drag-drop`, `excel`, `csv`

```tsx
"use client";
import React, { useState } from "react";
import { DropFile } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Example component demonstrating various ways to use the DropFile component
 */
const DropFileExamples = () => {
  const [basicUploadedFile, setBasicUploadedFile] = useState<File | null>(null);
  const [contactUploadedFile, setContactUploadedFile] = useState<File | null>(null);
  const [reportUploadedFile, setReportUploadedFile] = useState<File | null>(null);
  const [customUploadedFile, setCustomUploadedFile] = useState<File | null>(null);

  // Basic file drop handler
  const handleBasicDrop = (file: File) => {
    setBasicUploadedFile(file);
    openToast(`File "${file.name}" uploaded successfully!`);
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
      openToast("Please upload a valid Excel or CSV file", 400);
      return;
    }
    
    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      openToast("File size must be less than 5MB", 400);
      return;
    }
    
    openToast(`Contact file "${file.name}" ready for processing!`);
    console.log("Contact upload:", file);
    
    // Here you could process the file
    processContactFile(file);
  };

  // Report upload handler
  const handleReportDrop = (file: File) => {
    setReportUploadedFile(file);
    openToast(`Report "${file.name}" uploaded for analysis!`);
    console.log("Report upload:", file);
    
    // Simulate processing
    setTimeout(() => {
      openToast("Report processing completed!");
    }, 2000);
  };

  // Custom template handler
  const handleCustomDrop = (file: File) => {
    setCustomUploadedFile(file);
    
    // Custom validation logic
    if (file.name.toLowerCase().includes("template")) {
      openToast(`Template "${file.name}" uploaded successfully!`);
    } else {
      openToast(`Data file "${file.name}" uploaded for processing!`);
    }
    
    console.log("Custom upload:", file);
  };

  // Process contact file (simulation)
  const processContactFile = (file: File) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        // This is where you'd parse the CSV/Excel content
        console.log("File content:", e.target?.result);
        openToast("File parsed successfully! Ready to import contacts.");
      } catch (error) {
        console.error("Error parsing file:", error);
        openToast("Error parsing file. Please check the format.", 400);
      }
    };
    
    if (file.type === "text/csv") {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };

  // Reset file handlers
  const resetBasicFile = () => setBasicUploadedFile(null);
  const resetContactFile = () => setContactUploadedFile(null);
  const resetReportFile = () => setReportUploadedFile(null);
  const resetCustomFile = () => setCustomUploadedFile(null);

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>DropFile Examples</h1>
      <p className="ihub-mb-4">
        Comprehensive examples of the DropFile component for various use cases including
        contact imports, data uploads, and custom file processing.
      </p>

      {/* Basic File Drop Example */}
      <div className="ihub-mb-5">
        <h2>Basic File Drop</h2>
        <p className="ihub-mb-3">
          Simple file drop with default Excel/CSV support and template download.
        </p>
        
        <DropFile
          onDrop={handleBasicDrop}
          tmplateUrl="https://github.com/instincthub/images/raw/main/leadcontact_upload_template.xlsx"
        />
        
        {basicUploadedFile && (
          <div className="ihub-mt-3 ihub-p-3 ihub-border ihub-border-success ihub-rounded">
            <h4>Uploaded File:</h4>
            <p><strong>Name:</strong> {basicUploadedFile.name}</p>
            <p><strong>Size:</strong> {(basicUploadedFile.size / 1024).toFixed(2)} KB</p>
            <p><strong>Type:</strong> {basicUploadedFile.type}</p>
            <p><strong>Last Modified:</strong> {new Date(basicUploadedFile.lastModified).toLocaleString()}</p>
            <button 
              className="ihub-outlined-btn ihub-mt-2" 
              onClick={resetBasicFile}
            >
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Contact Import Example */}
      <div className="ihub-mb-5">
        <h2>Contact Import System</h2>
        <p className="ihub-mb-3">
          File drop for importing contacts with validation and processing feedback.
        </p>
        
        <DropFile
          onDrop={handleContactDrop}
          tmplateUrl="https://github.com/instincthub/images/raw/main/contact_import_template.xlsx"
        />
        
        {contactUploadedFile && (
          <div className="ihub-mt-3">
            <div className="ihub-p-3 ihub-border ihub-border-primary ihub-rounded ihub-mb-3">
              <h4>Processing Contact File:</h4>
              <p><strong>File:</strong> {contactUploadedFile.name}</p>
              <p><strong>Status:</strong> Ready for import</p>
              <div className="ihub-d-flex ihub-gap-2 ihub-mt-2">
                <button className="ihub-important-btn">
                  Import Contacts
                </button>
                <button className="ihub-outlined-btn" onClick={resetContactFile}>
                  Cancel
                </button>
              </div>
            </div>
            
            <div className="ihub-p-3 ihub-bg-light ihub-rounded">
              <h5>Import Guidelines:</h5>
              <ul>
                <li>Existing contacts will be updated</li>
                <li>New contacts will be created</li>
                <li>Duplicate emails will be merged</li>
                <li>Invalid entries will be skipped</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Report Upload Example */}
      <div className="ihub-mb-5">
        <h2>Report Analysis Upload</h2>
        <p className="ihub-mb-3">
          Upload reports for automated analysis and processing.
        </p>
        
        <DropFile
          onDrop={handleReportDrop}
          tmplateUrl="https://github.com/instincthub/images/raw/main/report_template.xlsx"
        />
        
        {reportUploadedFile && (
          <div className="ihub-mt-3">
            <div className="ihub-p-3 ihub-border ihub-border-warning ihub-rounded">
              <h4>Report Analysis</h4>
              <p><strong>File:</strong> {reportUploadedFile.name}</p>
              <p><strong>Status:</strong> Processing...</p>
              
              <div className="ihub-progress ihub-mt-2 ihub-mb-3">
                <div 
                  className="ihub-progress-bar" 
                  style={{ width: "65%", backgroundColor: "#ffc107" }}
                >
                  65%
                </div>
              </div>
              
              <div className="ihub-d-flex ihub-gap-2">
                <button className="ihub-primary-btn">
                  View Analysis
                </button>
                <button className="ihub-outlined-btn" onClick={resetReportFile}>
                  Reset
                </button>
              </div>
            </div>
            
            <div className="ihub-mt-3 ihub-p-3 ihub-bg-info ihub-text-white ihub-rounded">
              <h5>Analysis Features:</h5>
              <ul className="ihub-mb-0">
                <li>Automatic data validation</li>
                <li>Trend analysis and insights</li>
                <li>Export processed results</li>
                <li>Generate summary reports</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Custom Template Example */}
      <div className="ihub-mb-5">
        <h2>Custom Template System</h2>
        <p className="ihub-mb-3">
          File drop with custom template URL and specialized processing.
        </p>
        
        <DropFile
          onDrop={handleCustomDrop}
          tmplateUrl="https://github.com/instincthub/images/raw/main/custom_data_template.xlsx"
        />
        
        {customUploadedFile && (
          <div className="ihub-mt-3">
            <div className="ihub-p-3 ihub-border ihub-border-info ihub-rounded">
              <h4>Custom File Processing</h4>
              <p><strong>File:</strong> {customUploadedFile.name}</p>
              
              <div className="ihub-row ihub-mt-3">
                <div className="ihub-col-md-6">
                  <h5>Processing Options:</h5>
                  <div className="ihub-form-check">
                    <input 
                      className="ihub-form-check-input" 
                      type="checkbox" 
                      id="validateData" 
                      defaultChecked 
                    />
                    <label className="ihub-form-check-label" htmlFor="validateData">
                      Validate Data
                    </label>
                  </div>
                  <div className="ihub-form-check">
                    <input 
                      className="ihub-form-check-input" 
                      type="checkbox" 
                      id="generateReport" 
                    />
                    <label className="ihub-form-check-label" htmlFor="generateReport">
                      Generate Report
                    </label>
                  </div>
                  <div className="ihub-form-check">
                    <input 
                      className="ihub-form-check-input" 
                      type="checkbox" 
                      id="sendNotification" 
                    />
                    <label className="ihub-form-check-label" htmlFor="sendNotification">
                      Send Notification
                    </label>
                  </div>
                </div>
                
                <div className="ihub-col-md-6">
                  <h5>File Information:</h5>
                  <table className="ihub-table ihub-table-sm">
                    <tbody>
                      <tr>
                        <td>Size:</td>
                        <td>{(customUploadedFile.size / 1024).toFixed(2)} KB</td>
                      </tr>
                      <tr>
                        <td>Type:</td>
                        <td>{customUploadedFile.type || "Unknown"}</td>
                      </tr>
                      <tr>
                        <td>Modified:</td>
                        <td>{new Date(customUploadedFile.lastModified).toLocaleDateString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="ihub-d-flex ihub-gap-2 ihub-mt-3">
                <button className="ihub-success-btn">
                  Process File
                </button>
                <button className="ihub-outlined-btn" onClick={resetCustomFile}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Multiple File Types Demo */}
      <div className="ihub-mb-5">
        <h2>File Type Information</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-p-3 ihub-border ihub-rounded">
              <h4>Supported File Types</h4>
              <ul>
                <li><strong>.xlsx</strong> - Excel 2007+ files</li>
                <li><strong>.xls</strong> - Legacy Excel files</li>
                <li><strong>.csv</strong> - Comma-separated values</li>
              </ul>
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-p-3 ihub-border ihub-rounded">
              <h4>Best Practices</h4>
              <ul>
                <li>Keep file sizes under 10MB</li>
                <li>Use UTF-8 encoding for CSV files</li>
                <li>Include headers in first row</li>
                <li>Avoid special characters in filenames</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Examples */}
      <div className="ihub-mb-5">
        <h2>Integration Examples</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <div className="ihub-p-3 ihub-border ihub-rounded ihub-text-center">
              <h5>CRM Integration</h5>
              <p>Upload contact lists for automatic CRM import</p>
              <button className="ihub-outlined-btn ihub-btn-sm">
                Learn More
              </button>
            </div>
          </div>
          
          <div className="ihub-col-md-4">
            <div className="ihub-p-3 ihub-border ihub-rounded ihub-text-center">
              <h5>Data Analysis</h5>
              <p>Upload datasets for automated analysis and insights</p>
              <button className="ihub-outlined-btn ihub-btn-sm">
                Learn More
              </button>
            </div>
          </div>
          
          <div className="ihub-col-md-4">
            <div className="ihub-p-3 ihub-border ihub-rounded ihub-text-center">
              <h5>Bulk Operations</h5>
              <p>Process large datasets with batch operations</p>
              <button className="ihub-outlined-btn ihub-btn-sm">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropFileExamples;
```

## 🔗 Related Components

- [IhubFileUploader](./IhubFileUploader.md) - Advanced file uploader with S3 integration
- [FileUploader](./FileUploader.md) - Generic file upload component
- [InputText](./InputText.md) - Text input component
- [SubmitButton](./SubmitButton.md) - Form submission button
- [ActionDropdown](./ActionDropdown.md) - Dropdown component for actions

