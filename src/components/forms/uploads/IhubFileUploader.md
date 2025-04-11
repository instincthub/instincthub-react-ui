# InstinctHub File Uploader

A modern, TypeScript-based file upload component for InstinctHub applications, featuring drag-and-drop functionality, progress tracking, and AWS S3 integration.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [Component API](#component-api)
- [Interfaces](#interfaces)
- [Styling](#styling)
- [Examples](#examples)
- [Error Handling](#error-handling)
- [Browser Compatibility](#browser-compatibility)

## Installation

Ensure you have the required dependencies installed:

```bash
npm install @aws-sdk/client-s3 @aws-sdk/lib-storage
```

Add the component files to your project:
1. Copy `IhubFileUploader.tsx` to your components directory
2. Copy `ihub-file-uploader.css` to your styles directory
3. Import the component and styles in your application

## Features

- **Modern UI**: Clean, intuitive interface with responsive design
- **Drag and Drop**: Easily drag files into the upload area
- **File Preview**: Preview selected files before uploading
- **Progress Tracking**: Real-time upload progress monitoring
- **File Validation**: Built-in validation for file types and sizes
- **S3 Integration**: Direct uploading to AWS S3 buckets
- **Smart Uploading**: Automatic switching between single-part and multipart upload based on file size
- **Accessibility**: Keyboard and screen reader friendly
- **TypeScript Support**: Full type safety with comprehensive interfaces

## Usage

Basic usage example:

```tsx
import React from 'react';
import IhubFileUploader from './components/IhubFileUploader';
import './styles/ihub-file-uploader.css';

const MyUploadPage: React.FC = () => {
  const handleUploadComplete = (response) => {
    console.log('Upload completed:', response);
    // Do something with the uploaded file information
  };

  return (
    <div className="my-page">
      <h1>Upload Documents</h1>
      
      <IhubFileUploader
        header="Upload Your Resume"
        accept=".pdf,.docx"
        maxFileSize={10 * 1024 * 1024} // 10MB
        onUploadComplete={handleUploadComplete}
      />
    </div>
  );
};

export default MyUploadPage;
```

## Component API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `header` | `string` | `undefined` | Header text displayed above the uploader |
| `label` | `string` | `"Drag and drop files here or click to browse"` | Text shown in the upload area |
| `accept` | `string` | `"*"` | Accepted file types (e.g., 'image/*', '.pdf,.docx') |
| `maxFileSize` | `number` | `0` | Maximum allowed file size in bytes (0 = unlimited) |
| `name` | `string` | `"upload"` | Input field name attribute |
| `module` | `string` | `""` | Module identifier for setting values |
| `step` | `string` | `""` | Step identifier for setting values |
| `username` | `string \| null` | `null` | Username used in file naming |
| `onUploadComplete` | `(response: S3UploadResponseType) => void` | `undefined` | Callback fired when upload completes |
| `setValues` | `(name: string, value: string) => void` | `undefined` | Callback for setting values |
| `setModules` | `(module: string, name: string, value: string) => void` | `undefined` | Callback for setting module values |
| `setSteps` | `(module: string, step: string, name: string, value: string) => void` | `undefined` | Callback for setting step values |
| `className` | `string` | `""` | Additional CSS class names |

## Interfaces

### FileUploaderProps

```typescript
export interface FileUploaderProps {
  /** Header text to display above the uploader */
  header?: string;
  /** Label text for the dropzone area */
  label?: string;
  /** Accepted file types (e.g., 'image/*', 'video/*', '.pdf,.docx') */
  accept?: string;
  /** Maximum allowed file size in bytes */
  maxFileSize?: number;
  /** Input field name */
  name?: string;
  /** Module identifier for setting values */
  module?: string;
  /** Step identifier for setting values */
  step?: string;
  /** Username for file naming */
  username?: string | null;
  /** Callback for handling the upload response */
  onUploadComplete?: (response: S3UploadResponseType) => void;
  /** Callback for setting values */
  setValues?: (name: string, value: string) => void;
  /** Callback for setting module values */
  setModules?: (module: string, name: string, value: string) => void;
  /** Callback for setting step values */
  setSteps?: (module: string, step: string, name: string, value: string) => void;
  /** Additional CSS class names */
  className?: string;
}
```

### S3UploadResponseType

```typescript
export interface S3UploadResponseType {
  bucket: string;
  title: string;
  key: string;
  content_type: string;
  size: number;
  location: string;
}
```

## Styling

The component comes with a comprehensive CSS file (`ihub-file-uploader.css`) that follows the InstinctHub design system. All class names are prefixed with `ihub-` for consistency.

### Key Style Classes

- `.ihub-uploader` - Main container
- `.ihub-uploader-dropzone` - Drag and drop area
- `.ihub-uploader-dropzone-active` - Applied when dragging a file over the area
- `.ihub-uploader-progress` - Progress bar container
- `.ihub-uploader-progress-bar` - Progress indicator
- `.ihub-uploader-error` - Error message container
- `.ihub-uploader-success` - Success message container

### Customization

You can customize the appearance by overriding the CSS variables used in the component:

```css
:root {
  --DarkCyan: #00838f; /* Primary color */
  --Danger: #ea5f5e;   /* Error color */
  --Gunmetal: #2c333a; /* Text color */
  --White: #ffffff;    /* Background color */
}
```

## Examples

### Basic Image Uploader

```tsx
<IhubFileUploader
  header="Upload Profile Picture"
  accept="image/*"
  maxFileSize={5 * 1024 * 1024} // 5MB
  onUploadComplete={(response) => {
    setProfileImage(response.location);
  }}
/>
```

### Document Uploader with Module

```tsx
<IhubFileUploader
  header="Upload Assignment"
  accept=".pdf,.doc,.docx"
  maxFileSize={20 * 1024 * 1024} // 20MB
  module="course123"
  name="assignment"
  setModules={(module, name, value) => {
    updateAssignment(module, name, value);
  }}
/>
```

### Video Uploader with Progress Tracking

```tsx
<IhubFileUploader
  header="Upload Course Video"
  label="Drag and drop your video file or click to browse"
  accept="video/*"
  maxFileSize={500 * 1024 * 1024} // 500MB
  onUploadComplete={handleVideoUploadComplete}
/>
```

## Error Handling

The component handles various error scenarios:

1. **File Size Exceeded**: Displays an error when the selected file exceeds `maxFileSize`
2. **Unsupported File Type**: Shows an error when the file type doesn't match the `accept` pattern
3. **Upload Failures**: Handles S3 upload errors with retry functionality
4. **Network Issues**: Provides feedback when network problems occur

Error messages are displayed within the component interface with appropriate styling.

## Browser Compatibility

The component is compatible with all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

The drag and drop functionality uses standard HTML5 APIs and fallbacks to traditional file input when drag and drop is not supported.

## AWS Configuration

The component requires the following environment variables to be set for AWS S3 integration:

```
NEXT_PUBLIC_AWS_REGION=your-region
NEXT_PUBLIC_AWS_S3_ENDPOINT_URL=your-endpoint-url
NEXT_PUBLIC_AWS_ACCESS_KEY_ID=your-access-key
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=your-secret-key
NEXT_PUBLIC_AWS_BUCKET_NAME=your-bucket-name
NEXT_PUBLIC_AWS_LOCATION=videos-path
NEXT_PUBLIC_AWS_LOCATION_FILES=files-path
```

## Performance Considerations

- The component uses multipart uploads for files larger than 100MB
- Image previews are generated using browser's URL.createObjectURL for efficiency
- Event handlers are optimized to prevent unnecessary re-renders

## Accessibility

The component follows accessibility best practices:

- Keyboard navigable
- Appropriate ARIA attributes
- Clear focus states
- Descriptive error messages
- Color contrast following WCAG guidelines