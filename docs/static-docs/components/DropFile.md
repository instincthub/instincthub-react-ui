# DropFile

**Category:** Forms | **Type:** component

A versatile drag-and-drop file upload component with support for file type restrictions, size limits, and dynamic template downloads.

## 🏷️ Tags

`file-upload`, `drag-drop`, `dropzone`, `excel`, `csv`, `template-download`, `forms`, `async-upload`

```tsx
"use client";
import React, { useState } from "react";
import { DropFile } from "@instincthub/react-ui";

/**
 * Example component demonstrating various ways to use the DropFile component
 */
const DropFileExamples = () => {
  const [currentExample, setCurrentExample] = useState<string>("basic");
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File | null }>({});
  const [isGenerating, setIsGenerating] = useState(false);

  // Utility function to format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderExample = () => {
    switch (currentExample) {
      case "basic":
        return (
          <div>
            <h3>Basic File Upload</h3>
            <DropFile
              label="Drag and drop your file here, or click to select"
              onDrop={(file) => {
                console.log("File uploaded:", file);
                setUploadedFiles({ ...uploadedFiles, basic: file });
              }}
            />
            {uploadedFiles.basic && (
              <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f0f8ff", borderRadius: "8px" }}>
                <h4>Uploaded File Details:</h4>
                <p><strong>Name:</strong> {uploadedFiles.basic.name}</p>
                <p><strong>Size:</strong> {formatFileSize(uploadedFiles.basic.size)}</p>
                <p><strong>Type:</strong> {uploadedFiles.basic.type || 'Unknown'}</p>
                <p><strong>Last Modified:</strong> {new Date(uploadedFiles.basic.lastModified).toLocaleString()}</p>
              </div>
            )}
          </div>
        );

      case "excel-csv":
        return (
          <div>
            <h3>Excel/CSV Import</h3>
            <p>Restricted to spreadsheet files only</p>
            <DropFile
              label="Drop Excel (.xlsx, .xls) or CSV files here"
              acceptedTypes={[".xlsx", ".xls", ".csv"]}
              onDrop={(file) => {
                console.log("Spreadsheet uploaded:", file);
                setUploadedFiles({ ...uploadedFiles, excel: file });
                
                // Simulate processing
                setTimeout(() => {
                  alert(`Processing ${file.name}...\nDetected type: ${file.type}`);
                }, 500);
              }}
            />
            {uploadedFiles.excel && (
              <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f0fff0", borderRadius: "8px" }}>
                <h4>Spreadsheet Ready for Import</h4>
                <p><strong>File:</strong> {uploadedFiles.excel.name}</p>
                <p><strong>Size:</strong> {formatFileSize(uploadedFiles.excel.size)}</p>
                <div style={{ marginTop: "10px" }}>
                  <button 
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                    onClick={() => alert("Starting import process...")}
                  >
                    Start Import
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case "size-limit":
        return (
          <div>
            <h3>Size-Limited Upload</h3>
            <p>Maximum file size: 5MB</p>
            <DropFile
              label="Drop files here (max 5MB)"
              maxSize={5 * 1024 * 1024} // 5MB
              onDrop={(file) => {
                console.log("File within size limit:", file);
                setUploadedFiles({ ...uploadedFiles, limited: file });
              }}
              acceptedTypes={[".pdf", ".doc", ".docx"]}
            />
            {uploadedFiles.limited && (
              <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#fff5f5", borderRadius: "8px" }}>
                <h4>Document Uploaded</h4>
                <p><strong>File:</strong> {uploadedFiles.limited.name}</p>
                <p><strong>Size:</strong> {formatFileSize(uploadedFiles.limited.size)}</p>
                <p style={{ color: uploadedFiles.limited.size > 5 * 1024 * 1024 ? "red" : "green" }}>
                  {uploadedFiles.limited.size > 5 * 1024 * 1024 
                    ? "⚠️ File exceeds size limit!" 
                    : "✅ File size is within limit"}
                </p>
              </div>
            )}
          </div>
        );

      case "template-url":
        return (
          <div>
            <h3>Template Download with URL</h3>
            <p>Traditional template download via direct URL</p>
            <DropFile
              label="Drop contact list here (.xlsx or .csv)"
              acceptedTypes={[".xlsx", ".csv"]}
              tmplateUrl="https://github.com/instincthub/images/raw/main/leadcontact_upload_template.xlsx"
              onDrop={(file) => {
                console.log("Contact file uploaded:", file);
                setUploadedFiles({ ...uploadedFiles, contacts: file });
              }}
            />
            {uploadedFiles.contacts && (
              <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
                <h4>Contacts File Received</h4>
                <p><strong>File:</strong> {uploadedFiles.contacts.name}</p>
                <p>Ready to import contacts from this file.</p>
              </div>
            )}
          </div>
        );

      case "template-onclick":
        return (
          <div>
            <h3>Dynamic Template Generation</h3>
            <p>Generate templates dynamically with custom logic</p>
            <DropFile
              label="Drop your data file here"
              acceptedTypes={[".xlsx", ".csv"]}
              onTemplateDownload={() => {
                console.log("Generating custom template...");
                
                // Create CSV content
                const headers = ["Name", "Email", "Phone", "Company", "Department"];
                const sampleData = [
                  ["John Doe", "john@example.com", "555-0100", "Acme Inc", "Sales"],
                  ["Jane Smith", "jane@example.com", "555-0101", "Tech Corp", "Engineering"],
                ];
                
                const csvContent = [
                  headers.join(","),
                  ...sampleData.map(row => row.join(","))
                ].join("\n");
                
                // Download the generated CSV
                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `template_${Date.now()}.csv`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                
                alert("Template downloaded! Check your downloads folder.");
              }}
              onDrop={(file) => {
                console.log("Data file uploaded:", file);
                setUploadedFiles({ ...uploadedFiles, dynamic: file });
              }}
            />
            {uploadedFiles.dynamic && (
              <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#fffacd", borderRadius: "8px" }}>
                <h4>File Ready for Processing</h4>
                <p><strong>File:</strong> {uploadedFiles.dynamic.name}</p>
              </div>
            )}
          </div>
        );

      case "async-template":
        return (
          <div>
            <h3>Async Template Generation</h3>
            <p>Generate templates from API with loading states</p>
            <DropFile
              label="Drop import file here"
              acceptedTypes={[".xlsx", ".csv", ".json"]}
              onTemplateDownload={async () => {
                setIsGenerating(true);
                
                try {
                  // Simulate API call
                  await new Promise(resolve => setTimeout(resolve, 2000));
                  
                  // Simulate receiving template data from API
                  const templateData = {
                    columns: ["ID", "Name", "Email", "Status", "Created Date"],
                    metadata: {
                      version: "2.0",
                      generatedAt: new Date().toISOString(),
                      format: "xlsx"
                    }
                  };
                  
                  // Create and download file
                  const csvContent = templateData.columns.join(",") + "\n" + 
                    "1001,Sample Name,sample@email.com,Active,2024-01-01";
                  
                  const blob = new Blob([csvContent], { type: 'text/csv' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'api-template.csv';
                  a.click();
                  window.URL.revokeObjectURL(url);
                  
                  alert(`Template generated successfully!\nVersion: ${templateData.metadata.version}`);
                } catch (error) {
                  console.error("Template generation failed:", error);
                  alert("Failed to generate template. Please try again.");
                } finally {
                  setIsGenerating(false);
                }
              }}
              onDrop={(file) => {
                console.log("Import file uploaded:", file);
                setUploadedFiles({ ...uploadedFiles, async: file });
              }}
            />
            {isGenerating && (
              <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#e3f2fd", borderRadius: "4px" }}>
                <p>⏳ Generating template from server... Please wait...</p>
              </div>
            )}
            {uploadedFiles.async && (
              <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#e8f5e9", borderRadius: "8px" }}>
                <h4>Import File Received</h4>
                <p><strong>File:</strong> {uploadedFiles.async.name}</p>
              </div>
            )}
          </div>
        );

      case "images":
        return (
          <div>
            <h3>Image Upload</h3>
            <p>Accept only image files</p>
            <DropFile
              label="Drop images here (.jpg, .png, .gif, .webp)"
              acceptedTypes={[".jpg", ".jpeg", ".png", ".gif", ".webp"]}
              onDrop={(file) => {
                console.log("Image uploaded:", file);
                setUploadedFiles({ ...uploadedFiles, image: file });
                
                // Preview image
                const reader = new FileReader();
                reader.onload = (e) => {
                  const preview = document.getElementById('image-preview') as HTMLImageElement;
                  if (preview && e.target?.result) {
                    preview.src = e.target.result as string;
                  }
                };
                reader.readAsDataURL(file);
              }}
            />
            {uploadedFiles.image && (
              <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
                <h4>Image Uploaded</h4>
                <p><strong>Name:</strong> {uploadedFiles.image.name}</p>
                <p><strong>Size:</strong> {formatFileSize(uploadedFiles.image.size)}</p>
                <img 
                  id="image-preview" 
                  style={{ 
                    marginTop: "10px", 
                    maxWidth: "300px", 
                    maxHeight: "200px", 
                    borderRadius: "4px",
                    border: "1px solid #ddd"
                  }} 
                  alt="Preview"
                />
              </div>
            )}
          </div>
        );

      case "validation":
        const [validationError, setValidationError] = useState<string>("");
        
        return (
          <div>
            <h3>Custom Validation</h3>
            <p>Advanced file validation with error handling</p>
            <DropFile
              label="Drop Excel files for validation"
              acceptedTypes={[".xlsx", ".xls"]}
              maxSize={10 * 1024 * 1024} // 10MB
              onDrop={(file) => {
                setValidationError("");
                
                // Custom validation
                if (file.size < 1000) {
                  setValidationError("File is too small. Minimum size is 1KB.");
                  return;
                }
                
                if (!file.name.includes("report")) {
                  setValidationError("File name must contain 'report'.");
                  return;
                }
                
                console.log("Validated file:", file);
                setUploadedFiles({ ...uploadedFiles, validated: file });
                alert("File validation successful! Ready to process.");
              }}
            />
            {validationError && (
              <div style={{ 
                marginTop: "10px", 
                padding: "10px", 
                backgroundColor: "#ffebee", 
                color: "#c62828",
                borderRadius: "4px",
                border: "1px solid #ef5350"
              }}>
                <strong>Validation Error:</strong> {validationError}
              </div>
            )}
            {uploadedFiles.validated && !validationError && (
              <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#e8f5e9", borderRadius: "8px" }}>
                <h4>✅ Validation Passed</h4>
                <p><strong>File:</strong> {uploadedFiles.validated.name}</p>
                <p>File meets all validation requirements.</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="ihub-py-5">
      <h1>DropFile Examples</h1>
      <p>
        The DropFile component provides a flexible drag-and-drop file upload solution with 
        support for file type restrictions, size limits, and dynamic template downloads.
      </p>

      <div
        className="ihub-d-flex ihub-py-4"
        style={{ gap: "12px", flexWrap: "wrap" }}
      >
        {/* Example Selection Buttons */}
        <button
          className={`${
            currentExample === "basic" ? "ihub-important-btn" : "ihub-outlined-btn"
          }`}
          onClick={() => setCurrentExample("basic")}
        >
          Basic Upload
        </button>

        <button
          className={`${
            currentExample === "excel-csv" ? "ihub-important-btn" : "ihub-outlined-btn"
          }`}
          onClick={() => setCurrentExample("excel-csv")}
        >
          Excel/CSV Import
        </button>

        <button
          className={`${
            currentExample === "size-limit" ? "ihub-important-btn" : "ihub-outlined-btn"
          }`}
          onClick={() => setCurrentExample("size-limit")}
        >
          Size Limits
        </button>

        <button
          className={`${
            currentExample === "template-url" ? "ihub-important-btn" : "ihub-outlined-btn"
          }`}
          onClick={() => setCurrentExample("template-url")}
        >
          Template URL
        </button>

        <button
          className={`${
            currentExample === "template-onclick" ? "ihub-important-btn" : "ihub-outlined-btn"
          }`}
          onClick={() => setCurrentExample("template-onclick")}
        >
          Dynamic Template
        </button>

        <button
          className={`${
            currentExample === "async-template" ? "ihub-important-btn" : "ihub-outlined-btn"
          }`}
          onClick={() => setCurrentExample("async-template")}
        >
          Async Template
        </button>

        <button
          className={`${
            currentExample === "images" ? "ihub-important-btn" : "ihub-outlined-btn"
          }`}
          onClick={() => setCurrentExample("images")}
        >
          Image Upload
        </button>

        <button
          className={`${
            currentExample === "validation" ? "ihub-important-btn" : "ihub-outlined-btn"
          }`}
          onClick={() => setCurrentExample("validation")}
        >
          Custom Validation
        </button>
      </div>

      {/* Example Description */}
      <div className="ihub-py-3">
        {currentExample === "basic" && (
          <div>
            <h3>Basic File Upload</h3>
            <p>
              Simple drag-and-drop file upload with default settings.
              Accepts Excel and CSV files by default.
            </p>
            <ul>
              <li>Drag and drop support</li>
              <li>Click to browse files</li>
              <li>File information display</li>
              <li>Default file type restrictions</li>
            </ul>
          </div>
        )}

        {currentExample === "excel-csv" && (
          <div>
            <h3>Excel/CSV Import</h3>
            <p>
              Specialized for spreadsheet file imports with processing simulation.
              Restricted to Excel and CSV formats only.
            </p>
            <ul>
              <li>Accepts .xlsx, .xls, and .csv files</li>
              <li>File type validation</li>
              <li>Import processing simulation</li>
              <li>Ready for data parsing</li>
            </ul>
          </div>
        )}

        {currentExample === "size-limit" && (
          <div>
            <h3>Size-Limited Upload</h3>
            <p>
              Demonstrates file size restrictions for upload control.
              Prevents large files from being accepted.
            </p>
            <ul>
              <li>5MB maximum file size</li>
              <li>Document file types only</li>
              <li>Size validation feedback</li>
              <li>Clear error messaging</li>
            </ul>
          </div>
        )}

        {currentExample === "template-url" && (
          <div>
            <h3>Template URL Download</h3>
            <p>
              Traditional template download using a direct URL link.
              Backward compatible with existing implementations.
            </p>
            <ul>
              <li>Direct URL download link</li>
              <li>Static template files</li>
              <li>Simple implementation</li>
              <li>No JavaScript required for download</li>
            </ul>
          </div>
        )}

        {currentExample === "template-onclick" && (
          <div>
            <h3>Dynamic Template Generation</h3>
            <p>
              Generate templates dynamically using JavaScript.
              Perfect for custom templates based on user preferences.
            </p>
            <ul>
              <li>onClick handler for template generation</li>
              <li>Dynamic content creation</li>
              <li>Timestamp-based file naming</li>
              <li>In-browser file generation</li>
            </ul>
          </div>
        )}

        {currentExample === "async-template" && (
          <div>
            <h3>Async Template Generation</h3>
            <p>
              Generate templates from API endpoints with loading states.
              Ideal for server-side template generation with authentication.
            </p>
            <ul>
              <li>Async/await support</li>
              <li>Loading state management</li>
              <li>API integration ready</li>
              <li>Error handling included</li>
            </ul>
          </div>
        )}

        {currentExample === "images" && (
          <div>
            <h3>Image Upload</h3>
            <p>
              Specialized for image file uploads with preview capability.
              Supports common image formats.
            </p>
            <ul>
              <li>Image format restrictions</li>
              <li>Preview generation</li>
              <li>Multiple image format support</li>
              <li>File size display</li>
            </ul>
          </div>
        )}

        {currentExample === "validation" && (
          <div>
            <h3>Custom Validation</h3>
            <p>
              Advanced file validation with custom rules and error handling.
              Demonstrates complex validation scenarios.
            </p>
            <ul>
              <li>Custom validation rules</li>
              <li>Error message display</li>
              <li>File name validation</li>
              <li>Size range validation</li>
            </ul>
          </div>
        )}
      </div>

      {/* Live Example */}
      <div className="ihub-mt-4">
        <h3>Live Example</h3>
        <div 
          style={{ 
            border: "2px dashed #ddd", 
            borderRadius: "8px", 
            padding: "20px",
            marginBottom: "20px",
            minHeight: "300px"
          }}
        >
          {renderExample()}
        </div>
      </div>

      {/* Features Overview */}
      <div className="ihub-mt-5">
        <h3>Key Features</h3>
        
        <h4>📁 File Upload Capabilities</h4>
        <ul>
          <li><strong>Drag & Drop:</strong> Intuitive drag-and-drop interface</li>
          <li><strong>Click to Browse:</strong> Traditional file selection support</li>
          <li><strong>File Type Restrictions:</strong> Configurable accepted file types</li>
          <li><strong>Size Limits:</strong> Maximum file size enforcement</li>
          <li><strong>Multiple Files:</strong> Support for multiple file uploads</li>
        </ul>

        <h4>📥 Template Download Options</h4>
        <ul>
          <li><strong>URL-based:</strong> Traditional direct download links (backward compatible)</li>
          <li><strong>onClick Handler:</strong> Dynamic template generation with custom logic</li>
          <li><strong>Async Support:</strong> API-based template generation with loading states</li>
          <li><strong>Priority System:</strong> onClick takes precedence over URL when both provided</li>
          <li><strong>Custom Content:</strong> Generate templates based on user context</li>
        </ul>

        <h4>🎨 Customization</h4>
        <ul>
          <li><strong>Custom Labels:</strong> Configurable dropzone text</li>
          <li><strong>File Type Configuration:</strong> Specify accepted extensions</li>
          <li><strong>Size Restrictions:</strong> Set maximum file sizes</li>
          <li><strong>CSS Classes:</strong> Custom styling support</li>
          <li><strong>Template Messages:</strong> Customizable helper text</li>
        </ul>

        <h4>⚡ Advanced Features</h4>
        <ul>
          <li><strong>File Validation:</strong> Built-in and custom validation support</li>
          <li><strong>Error Handling:</strong> Comprehensive error management</li>
          <li><strong>File Processing:</strong> Hook into file upload events</li>
          <li><strong>Preview Support:</strong> Generate previews for images</li>
          <li><strong>Progress Tracking:</strong> Monitor upload progress</li>
        </ul>
      </div>
    </div>
  );
};

export default DropFileExamples;
```

## 📖 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onDrop` | `(file: File) => void` | Required | Callback function called when a file is dropped or selected |
| `label` | `string` | `undefined` | Custom label text for the dropzone |
| `acceptedTypes` | `string[]` | `[".xlsx", ".xls", ".csv"]` | Array of accepted file extensions |
| `maxSize` | `number` | `undefined` | Maximum file size in bytes |
| `tmplateUrl` | `string` | Default template URL | URL for template download (backward compatible) |
| `onTemplateDownload` | `() => void \| Promise<void>` | `undefined` | Function called when template download is clicked (NEW) |
| `multiple` | `boolean` | `false` | Whether to allow multiple file uploads |
| `className` | `string` | `""` | Additional CSS classes for styling |

### File Type Support

The component includes MIME type mapping for common file formats:

| Extension | MIME Type |
|-----------|-----------|
| `.xlsx` | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` |
| `.xls` | `application/vnd.ms-excel` |
| `.csv` | `text/csv` |
| `.pdf` | `application/pdf` |
| `.doc` | `application/msword` |
| `.docx` | `application/vnd.openxmlformats-officedocument.wordprocessingml.document` |
| `.jpg`, `.jpeg` | `image/jpeg` |
| `.png` | `image/png` |
| `.gif` | `image/gif` |
| `.webp` | `image/webp` |
| `.txt` | `text/plain` |
| `.pptx` | `application/vnd.openxmlformats-officedocument.presentationml.presentation` |

### Usage Examples

#### Basic Usage
```tsx
<DropFile
  onDrop={(file) => {
    console.log("File uploaded:", file);
  }}
/>
```

#### With File Type Restrictions
```tsx
<DropFile
  label="Upload spreadsheet files only"
  acceptedTypes={[".xlsx", ".xls", ".csv"]}
  onDrop={handleFileUpload}
/>
```

#### With Size Limit
```tsx
<DropFile
  label="Drop files here (max 10MB)"
  maxSize={10 * 1024 * 1024} // 10MB
  acceptedTypes={[".pdf", ".doc", ".docx"]}
  onDrop={handleFileUpload}
/>
```

#### With URL Template Download (Backward Compatible)
```tsx
<DropFile
  onDrop={handleFileUpload}
  tmplateUrl="https://example.com/template.xlsx"
  acceptedTypes={[".xlsx", ".csv"]}
/>
```

#### With Dynamic Template Generation (NEW)
```tsx
<DropFile
  onDrop={handleFileUpload}
  onTemplateDownload={() => {
    // Generate template dynamically
    const csvContent = "Name,Email,Phone\n";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }}
/>
```

#### With Async Template Generation (NEW)
```tsx
<DropFile
  onDrop={handleFileUpload}
  onTemplateDownload={async () => {
    try {
      const response = await fetch('/api/generate-template');
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'template.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to generate template:', error);
    }
  }}
/>
```

## ⚠️ Important Implementation Notes

### Template Download Priority

When both `onTemplateDownload` and `tmplateUrl` props are provided:
1. **onTemplateDownload** takes precedence (renders as button)
2. **tmplateUrl** is used as fallback (renders as link)
3. If neither is provided, no template download option is shown

### File Validation

The component performs automatic validation based on:
- **File Type**: Checks against `acceptedTypes` array
- **File Size**: Validates against `maxSize` if provided
- **Single/Multiple**: Respects the `multiple` prop setting

### CSS Classes

The component uses these CSS classes for styling:
- `.ihub-dropzone` - Main container
- `.ihub-dropzone-wrap` - Dropzone area wrapper
- `.ihub-download-template` - Template download section
- `.ihub-template-download-btn` - Template download button (when using onClick)

### Browser Compatibility

- Uses HTML5 File API for file handling
- Requires modern browser support for drag-and-drop
- Blob API required for dynamic file generation
- URL.createObjectURL support needed for downloads

### Best Practices

1. **File Validation**: Always validate files on the server side, even with client-side restrictions
2. **Error Handling**: Implement proper error handling for file processing
3. **Loading States**: Show loading indicators for async operations
4. **File Size**: Be mindful of file size limits for better UX
5. **Template Generation**: Cache templates when possible to reduce server load

## 🔗 Related Components

- [FileUploader](./FileUploader.md) - Advanced file upload with progress tracking
- [IhubFileUploader](./IhubFileUploader.md) - Enhanced file uploader with preview
- [SearchFieldDB](./SearchFieldDB.md) - Database search with file import
- [Tables](./Tables.md) - Display imported data in tables
- [DownloadAsExcel](./DownloadAsExcel.md) - Export data to Excel format