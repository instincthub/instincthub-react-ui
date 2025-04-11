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

## Component

### DropFile
- **Description**: A file upload component with drag-and-drop functionality.
- **Parameters**:
  - `props: DropFileProps` - Props object containing the onDrop callback.
- **Returns**: `JSX.Element` - The rendered component.
- **Key Features**:
  - Drag-and-drop file upload
  - File type restriction (.xlsx, .xls, .csv)
  - Single file upload limit
  - File name display after upload
  - Template download option

## CSS Classes

The component uses the following CSS classes that should be included in your `input-fields.css` file:

### Core Classes
- `.ihub-dropzone` - Main container for the entire component
- `.ihub-dropzone-wrap` - Container for the dropzone area
- `.ihub-download-template` - Container for the template download section

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

## Contributing
Feel free to submit issues or pull requests to improve this component.

## License
[Add your license information here]