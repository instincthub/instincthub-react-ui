# DropFile Component

A React component that enables users to upload files via drag-and-drop or file selection. The component is built with TypeScript and supports Excel (.xlsx, .xls) and CSV file formats.

## Table of Contents
- [Installation](#installation)
- [Interfaces](#interfaces)
- [Component](#component)
- [CSS Classes](#css-classes)
- [Usage Examples](#usage-examples)
- [Contributing](#contributing)

## Installation

Ensure you have React and React-Dropzone installed:

```bash
npm install react react-dropzone
npm install @types/react @types/react-dropzone --save-dev
```

Make sure to include the `input-fields.css` file in your project and import it in the component.

## Interfaces

### DropFileProps
- **Description**: Props for the DropFile component.
- **Properties**:
  - `onDrop: (file: File) => void` - Callback function that receives the uploaded file.
  - `label?: string` - Optional custom label for the drop zone.
  - `acceptedTypes?: string[]` - Array of accepted file extensions (e.g., [".xlsx", ".csv"]).
  - `maxSize?: number` - Maximum file size in bytes.
  - `tmplateUrl?: string` - URL for template download (for backward compatibility).
  - `onTemplateDownload?: () => void` - **NEW**: Function called when template download button is clicked.
  - `multiple?: boolean` - Whether to allow multiple file uploads.
  - `className?: string` - Additional CSS class names.

## Component

### DropFile
- **Description**: A file upload component with drag-and-drop functionality.
- **Parameters**:
  - `props: DropFileProps` - Props object containing the onDrop callback.
- **Returns**: `JSX.Element` - The rendered component.
- **Key Features**:
  - Drag-and-drop file upload
  - File type restriction (configurable extensions)
  - Single or multiple file upload support
  - File name display after upload
  - Template download via URL or custom onClick handler
  - Dynamic template generation support
  - Async template operations with loading states

## CSS Classes

The component uses the following CSS classes that should be included in your `input-fields.css` file:

### Core Classes
- `.ihub-dropzone` - Main container for the entire component
- `.ihub-dropzone-wrap` - Container for the dropzone area
- `.ihub-download-template` - Container for the template download section
- `.ihub-template-download-btn` - **NEW**: Button element for template download (when using onClick)

### Styling Details
- Dashed border for the dropzone area with hover effect
- Centered text for instructions and file name
- Styled link for template download
- Responsive container with max-width

## Usage Examples

### Basic Usage
```tsx
import React from "react";
import DropFile from "./DropFile";

const FileUploadPage = () => {
  const handleFileDrop = (file: File) => {
    console.log("File received:", file);
    // Process the file, for example:
    // - Upload to server
    // - Parse data
    // - Update state
  };

  return (
    <div className="upload-section">
      <h2>Upload Contacts</h2>
      <DropFile onDrop={handleFileDrop} />
    </div>
  );
};
```

### With File Processing
```tsx
import React, { useState } from "react";
import DropFile from "./DropFile";

const ContactImportPage = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadResult, setUploadResult] = useState<string | null>(null);

  const handleFileDrop = async (file: File) => {
    setIsUploading(true);
    setUploadResult(null);
    
    try {
      // Example file upload to server
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload-contacts', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      setUploadResult(`Successfully processed ${result.recordCount} contacts`);
    } catch (error) {
      setUploadResult("Error uploading file. Please try again.");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h2>Import Contacts</h2>
      <DropFile onDrop={handleFileDrop} />
      
      {isUploading && <p>Uploading file, please wait...</p>}
      {uploadResult && <p className="result">{uploadResult}</p>}
    </div>
  );
};
```

### Dynamic Template Generation (NEW)
```tsx
import React, { useState } from "react";
import DropFile from "./DropFile";

const DynamicTemplateExample = () => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleTemplateDownload = async () => {
    setIsGenerating(true);
    
    try {
      // Generate template dynamically
      const response = await fetch('/api/generate-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: 'contacts',
          columns: ['Name', 'Email', 'Phone', 'Company']
        })
      });
      
      const blob = await response.blob();
      
      // Download the generated template
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'contacts-template.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Template generation failed:', error);
      alert('Failed to generate template. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileDrop = (file: File) => {
    console.log("File uploaded:", file);
    // Process the uploaded file
  };

  return (
    <div>
      <h2>Upload Contacts with Dynamic Template</h2>
      <DropFile 
        onDrop={handleFileDrop}
        onTemplateDownload={handleTemplateDownload}
        acceptedTypes={[".xlsx", ".csv"]}
      />
      {isGenerating && <p>Generating template, please wait...</p>}
    </div>
  );
};
```

### Simple onClick Template
```tsx
const handleTemplateClick = () => {
  console.log("Template download requested");
  
  // Simple template generation
  const templateData = "Name,Email,Phone\nJohn Doe,john@example.com,123-456-7890";
  const blob = new Blob([templateData], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'template.csv';
  a.click();
  window.URL.revokeObjectURL(url);
};

<DropFile
  onDrop={handleFileDrop}
  onTemplateDownload={handleTemplateClick}
  label="Drop your contact file here"
/>
```

### Backward Compatibility (URL-based)
```tsx
// This continues to work as before
<DropFile
  onDrop={handleFileDrop}
  tmplateUrl="https://example.com/template.xlsx"
  label="Drop file here"
/>
```

## Template Download Priority

When both `onTemplateDownload` and `tmplateUrl` are provided, the component prioritizes the onClick handler:

1. **onTemplateDownload** (if provided) - Renders a button with click handler
2. **tmplateUrl** (if onTemplateDownload not provided) - Renders an anchor link
3. **Neither** - No template download option shown

## Contributing
Feel free to submit issues or pull requests to improve this component.

## License
[Add your license information here]