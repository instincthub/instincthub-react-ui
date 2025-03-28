# FileField Component

A React component for file uploads with image preview capability. This component handles file selection, size validation, and provides a preview for image files.

## Table of Contents
- [Installation](#installation)
- [Interfaces](#interfaces)
- [Component](#component)
- [CSS Classes](#css-classes)
- [Usage Examples](#usage-examples)
- [Contributing](#contributing)

## Installation

Ensure you have React installed:

```bash
npm install react
npm install @types/react --save-dev
```

Make sure to include the `input-fields.css` file in your project and import it in the component.

## Interfaces

### FileFieldProps
- **Description**: Props for the FileField component.
- **Properties**:
  - `onChange?: (file: File) => void` - Optional callback function called when a file is selected.
  - `defaultImageUrl?: string` - Optional URL of a default image or file to display.
  - `labels?: string` - Optional label text for the file input.
  - `names?: string` - Optional name attribute for the file input.
  - `requireds?: boolean` - Optional flag to mark the input as required.
  - `dataNames?: string` - Optional data-name attribute for the file input.
  - `maxLimit?: number` - Optional maximum file size limit in MB (defaults to 10MB).

## Component

### FileField
- **Description**: A file upload component with image preview functionality.
- **Parameters**:
  - `props: FileFieldProps` - Props object containing component configuration.
- **Returns**: `JSX.Element` - The rendered component.
- **Key Features**:
  - File selection via standard browser file input
  - File size validation with configurable limit
  - Image preview for supported image formats (.png, .jpg, .jpeg)
  - File name preview for non-image files
  - Toast notification for oversized files
  - Support for default file/image display

## CSS Classes

The component uses the following CSS classes that should be included in your `input-fields.css` file:

### Core Classes
- `.ihub-file-input-wrapper` - Main container for the file input component
- `.ihub-custom-uploader` - Container for the file input field
- `.ihub-file-input` - Styling for the file input element
- `.ihub-preview-img` - Styling for the image preview
- `.ihub-file-link` - Styling for the file link (for non-image files)

### Styling Details
- Image preview sized at 100% width with 200px height
- Border radius on preview images for a modern look
- Hover effects for file links
- Proper spacing between elements

## Usage Examples

### Basic Usage
```tsx
import React from "react";
import FileField from "./FileField";

const UploadForm = () => {
  const handleFileChange = (file: File) => {
    console.log("Selected file:", file);
    // Process the file, for example:
    // - Prepare for form submission
    // - Upload to server
    // - Store in state
  };

  return (
    <form>
      <FileField 
        labels="Profile Picture" 
        names="profile_pic"
        requireds={true}
        onChange={handleFileChange}
      />
      <button type="submit">Upload</button>
    </form>
  );
};
```

### With Default Image and Size Limit
```tsx
import React, { useState } from "react";
import FileField from "./FileField";

const ProfileEditor = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleFileChange = (file: File) => {
    setSelectedFile(file);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      // Upload the file to server
      console.log("Uploading file:", selectedFile);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>
      <FileField 
        labels="Profile Picture" 
        names="avatar"
        defaultImageUrl="https://example.com/default-avatar.jpg"
        maxLimit={5} // 5MB limit
        onChange={handleFileChange}
      />
      <button type="submit" disabled={!selectedFile}>
        Save Changes
      </button>
    </form>
  );
};
```

### In a Multi-File Form
```tsx
import React, { useState } from "react";
import FileField from "./FileField";

const DocumentUploadForm = () => {
  const [idCard, setIdCard] = useState<File | null>(null);
  const [certificate, setCertificate] = useState<File | null>(null);
  
  const handleIdCardChange = (file: File) => {
    setIdCard(file);
  };
  
  const handleCertificateChange = (file: File) => {
    setCertificate(file);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    if (idCard) formData.append('id_card', idCard);
    if (certificate) formData.append('certificate', certificate);
    
    // Submit formData to server
    console.log("Submitting documents");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Document Verification</h2>
      
      <FileField 
        labels="ID Card (max 5MB)" 
        names="id_card"
        requireds={true}
        maxLimit={5}
        onChange={handleIdCardChange}
      />
      
      <FileField 
        labels="Certificate (max 10MB)" 
        names="certificate"
        requireds={true}
        maxLimit={10}
        onChange={handleCertificateChange}
      />
      
      <button type="submit" disabled={!idCard || !certificate}>
        Upload Documents
      </button>
    </form>
  );
};
```

## Contributing
Feel free to submit issues or pull requests to improve this component.

## License
[Add your license information here]