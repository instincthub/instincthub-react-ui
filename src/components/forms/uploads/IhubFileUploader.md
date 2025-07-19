# IhubFileUploader

**Category:** Forms | **Type:** component

Modern file upload component with drag-and-drop functionality, progress tracking, and AWS S3 integration

## 🏷️ Tags

`forms`, `upload`, `file`, `drag-drop`, `s3`, `aws`

```tsx
"use client";
import React, { useState } from "react";
import {
  IhubFileUploader,
  InputText,
  SubmitButton,
  openToast,
} from "@instincthub/react-ui";

/**
 * Comprehensive examples demonstrating various use cases for IhubFileUploader
 */
const FileUploaderExamples = () => {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [courseModule, setCourseModule] = useState({
    moduleId: "course-101",
    materials: [],
  });
  const [stepData, setStepData] = useState({
    stepId: "step-1",
    assignments: [],
  });

  // Handle successful upload
  const handleUploadComplete = (response: any) => {
    console.log("Upload completed:", response);
    setUploadedFiles((prev) => [...prev, response]);
    openToast("File uploaded successfully!");
  };

  // Handle document metadata with upload
  const handleDocumentUpload = (response: any) => {
    const documentData = {
      ...response,
      title: formData.title,
      description: formData.description,
      uploadedAt: new Date().toISOString(),
    };
    console.log("Document with metadata:", documentData);
    openToast("Document uploaded with metadata!");
  };

  // Handle module-based uploads
  const handleModuleUpload = (module: string, name: string, value: string) => {
    setCourseModule((prev) => ({
      ...prev,
      materials: [...prev.materials, { name, value, module }],
    }));
    console.log(`Module ${module} updated:`, { name, value });
    openToast("Course material uploaded!");
  };

  // Handle step-based uploads for multi-step forms
  const handleStepUpload = (
    module: string,
    step: string,
    name: string,
    value: string
  ) => {
    setStepData((prev) => ({
      ...prev,
      assignments: [...prev.assignments, { module, step, name, value }],
    }));
    console.log(`Step ${step} in module ${module} updated:`, { name, value });
    openToast("Assignment uploaded!");
  };

  // Handle form value updates
  const handleValueUpdate = (name: string, value: string) => {
    console.log(`Form value updated: ${name} = ${value}`);
    openToast(`${name} has been updated`);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>File Uploader Examples</h1>

      {/* Basic Image Upload */}
      <div className="ihub-mb-5">
        <h2>1. Basic Image Upload</h2>
        <p>Simple profile picture upload with size restrictions</p>
        <IhubFileUploader
          header="Upload Profile Picture"
          label="Drag and drop your image here or click to browse"
          accept="image/*"
          maxFileSize={5 * 1024 * 1024} // 5MB
          name="profile-picture"
          onUploadComplete={handleUploadComplete}
          className="profile-uploader"
        />
      </div>

      {/* Document Upload with Metadata */}
      <div className="ihub-mb-5">
        <h2>2. Document Upload with Metadata</h2>
        <p>Upload documents with associated title and description</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <InputText
              label="Document Title"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="ihub-mb-3"
            />
            <InputText
              label="Document Description"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="ihub-mb-3"
            />
          </div>
          <div className="ihub-col-md-6">
            <IhubFileUploader
              header="Upload Document"
              accept=".pdf,.doc,.docx,.txt"
              maxFileSize={20 * 1024 * 1024} // 20MB
              name="document"
              onUploadComplete={handleDocumentUpload}
            />
          </div>
        </div>
      </div>

      {/* Course Material Upload (Module-based) */}
      <div className="ihub-mb-5">
        <h2>3. Course Material Upload (Module System)</h2>
        <p>Upload materials that are automatically organized by course modules</p>
        <IhubFileUploader
          header="Upload Course Materials"
          label="Upload PDFs, presentations, or other course materials"
          accept=".pdf,.ppt,.pptx,.doc,.docx,.zip"
          maxFileSize={50 * 1024 * 1024} // 50MB
          name="course-material"
          module={courseModule.moduleId}
          username="instructor_001"
          setModules={handleModuleUpload}
        />
        
        {courseModule.materials.length > 0 && (
          <div className="ihub-mt-3">
            <h4>Uploaded Materials:</h4>
            <ul>
              {courseModule.materials.map((material, index) => (
                <li key={index}>
                  {material.name}: {material.value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Multi-Step Assignment Upload */}
      <div className="ihub-mb-5">
        <h2>4. Multi-Step Assignment Upload</h2>
        <p>Upload assignments in a multi-step workflow system</p>
        <IhubFileUploader
          header="Upload Assignment (Step 1)"
          label="Upload your assignment files here"
          accept=".pdf,.zip,.docx"
          maxFileSize={100 * 1024 * 1024} // 100MB
          name="assignment"
          module="assignment-portal"
          step={stepData.stepId}
          username="student_001"
          setSteps={handleStepUpload}
        />
        
        {stepData.assignments.length > 0 && (
          <div className="ihub-mt-3">
            <h4>Assignment Progress:</h4>
            <ul>
              {stepData.assignments.map((assignment, index) => (
                <li key={index}>
                  Module: {assignment.module}, Step: {assignment.step}, File:
                  {assignment.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Video Upload for Content Creation */}
      <div className="ihub-mb-5">
        <h2>5. Video Upload for Content Creation</h2>
        <p>Large video file upload with progress tracking</p>
        <IhubFileUploader
          header="Upload Course Video"
          label="Drag and drop your video file (supports large files up to 1GB)"
          accept="video/*"
          maxFileSize={1024 * 1024 * 1024} // 1GB
          name="course-video"
          username="content_creator"
          onUploadComplete={(response) => {
            console.log("Video upload completed:", response);
            openToast("Video uploaded successfully! Processing will begin shortly.");
          }}
          className="video-uploader"
        />
      </div>

      {/* Multiple File Types Upload */}
      <div className="ihub-mb-5">
        <h2>6. General File Upload</h2>
        <p>Accept multiple file types with custom validation</p>
        <IhubFileUploader
          header="Upload Any File Type"
          label="Upload images, documents, videos, or archives"
          accept="image/*,video/*,.pdf,.doc,.docx,.zip,.rar,.txt,.csv,.xlsx"
          maxFileSize={200 * 1024 * 1024} // 200MB
          name="general-upload"
          setValues={handleValueUpdate}
          onUploadComplete={(response) => {
            handleUploadComplete(response);
            // Additional processing for specific file types
            if (response.content_type.startsWith('image/')) {
              openToast("Image uploaded - thumbnail will be generated");
            } else if (response.content_type.startsWith('video/')) {
              openToast("Video uploaded - processing will begin");
            }
          }}
        />
      </div>

      {/* Portfolio/Resume Upload */}
      <div className="ihub-mb-5">
        <h2>7. Portfolio & Resume Upload</h2>
        <p>Specialized uploader for professional documents</p>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <IhubFileUploader
              header="Upload Resume"
              label="PDF or Word document only"
              accept=".pdf,.doc,.docx"
              maxFileSize={10 * 1024 * 1024} // 10MB
              name="resume"
              username="job_applicant"
              onUploadComplete={(response) => {
                console.log("Resume uploaded:", response);
                openToast("Resume uploaded successfully!");
              }}
            />
          </div>
          <div className="ihub-col-md-6">
            <IhubFileUploader
              header="Upload Portfolio"
              label="ZIP archive with your work samples"
              accept=".zip,.rar"
              maxFileSize={50 * 1024 * 1024} // 50MB
              name="portfolio"
              username="job_applicant"
              onUploadComplete={(response) => {
                console.log("Portfolio uploaded:", response);
                openToast("Portfolio uploaded successfully!");
              }}
            />
          </div>
        </div>
      </div>

      {/* Archive and Backup Upload */}
      <div className="ihub-mb-5">
        <h2>8. Archive & Backup Upload</h2>
        <p>Large file upload for system backups and archives</p>
        <IhubFileUploader
          header="Upload System Backup"
          label="Upload backup files (ZIP, TAR, or other archives)"
          accept=".zip,.rar,.tar,.gz,.7z,.bak"
          maxFileSize={2 * 1024 * 1024 * 1024} // 2GB
          name="system-backup"
          onUploadComplete={(response) => {
            console.log("Backup uploaded:", response);
            openToast(
              "Backup uploaded successfully! Verification will begin shortly."
            );
          }}
          className="backup-uploader"
        />
      </div>

      {/* Disabled State Example */}
      <div className="ihub-mb-5">
        <h2>9. Custom Styled Uploader</h2>
        <p>Uploader with custom CSS classes and styling</p>
        <IhubFileUploader
          header="Custom Styled Upload Area"
          label="This uploader has custom styling applied"
          accept="image/*,.pdf"
          maxFileSize={15 * 1024 * 1024} // 15MB
          name="custom-upload"
          onUploadComplete={handleUploadComplete}
          className="custom-file-uploader border-dashed border-2 border-blue-400 rounded-lg"
        />
      </div>

      {/* Upload Summary */}
      {uploadedFiles.length > 0 && (
        <div className="ihub-mt-5">
          <h2>Upload Summary</h2>
          <div className="ihub-card">
            <p>Total files uploaded: {uploadedFiles.length}</p>
            <ul>
              {uploadedFiles.map((file, index) => (
                <li key={index}>
                  <strong>{file.title}</strong> ({file.content_type}) - Size:
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                  <br />
                  <small>Location: {file.location}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploaderExamples;
```

## 🔗 Related Components

- [FileUploader](./FileUploader.md) - Basic file upload component
- [InputText](./InputText.md) - Text input component
- [SubmitButton](./SubmitButton.md) - Submit button component
- [TextField](./TextField.md) - Text field component
- [DropFile](./DropFile.md) - Drop file component