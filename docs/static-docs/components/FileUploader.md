# FileUploader

**Category:** Forms | **Type:** component

File upload component with drag and drop

## 🏷️ Tags

`forms`, `upload`, `files`, `aws`, `s3`, `drag-drop`

```tsx
"use client";
import React, { useState } from "react";
import { FileUploader } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Example component demonstrating various ways to use the FileUploader
 */
const FileUploaderExamples = () => {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [profileImage, setProfileImage] = useState<string>("");
  const [documentFiles, setDocumentFiles] = useState<string[]>([]);
  const [videoFile, setVideoFile] = useState<string>("");
  const [formData, setFormData] = useState({
    resume: "",
    coverLetter: "",
    portfolio: "",
    avatar: "",
  });

  // Handle different types of file uploads
  const handleProfileImageUpload = (response: any) => {
    setProfileImage(response.location);
    console.log("Profile image uploaded:", response);
    openToast(`Profile image uploaded: ${response.title}`);
  };

  const handleDocumentUpload = (response: any) => {
    setDocumentFiles(prev => [...prev, response.location]);
    console.log("Document uploaded:", response);
    openToast(`Document uploaded: ${response.title} (${(response.size / 1024 / 1024).toFixed(2)} MB)`);
  };

  const handleVideoUpload = (response: any) => {
    setVideoFile(response.location);
    console.log("Video uploaded:", response);
    openToast(`Video uploaded: ${response.title} - Processing started`);
    
    // Simulate video processing notification
    setTimeout(() => {
      openToast("Video processing completed and ready for viewing");
    }, 3000);
  };

  const handleFormFileUpload = (field: string) => (response: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: response.key
    }));
    console.log(`${field} uploaded:`, response);
  };

  const handleGeneralUpload = (response: any) => {
    setUploadedFiles(prev => [...prev, response]);
    console.log("File uploaded:", response);
    
    // Show different messages based on file type
    const fileType = response.content_type.split('/')[0];
    const messages = {
      image: "Image uploaded successfully! It's now available in your gallery.",
      video: "Video uploaded! Processing has started in the background.",
      audio: "Audio file uploaded successfully!",
      application: "Document uploaded successfully!",
      text: "Text file uploaded successfully!"
    };
    
    openToast(messages[fileType as keyof typeof messages] || "File uploaded successfully!");
  };

  // Validation and utility functions
  const validateUploadRequirements = () => {
    const errors = [];
    
    if (!profileImage) errors.push("Profile image is required");
    if (documentFiles.length === 0) errors.push("At least one document is required");
    if (!formData.resume) errors.push("Resume is required");
    
    if (errors.length > 0) {
      openToast(`Validation errors: ${errors.join("; ")}`);
      return false;
    }
    
    openToast("All required files have been uploaded!");
    return true;
  };

  const clearAllUploads = () => {
    setUploadedFiles([]);
    setProfileImage("");
    setDocumentFiles([]);
    setVideoFile("");
    setFormData({ resume: "", coverLetter: "", portfolio: "", avatar: "" });
    openToast("All uploads cleared");
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateUploadRequirements()) {
      const submissionData = {
        profileImage,
        documentFiles,
        videoFile,
        generalFiles: uploadedFiles,
        ...formData
      };
      
      console.log("Form submitted with files:", submissionData);
      openToast(`Application submitted with ${uploadedFiles.length + documentFiles.length + (profileImage ? 1 : 0) + (videoFile ? 1 : 0)} files!`);
    }
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>FileUploader Examples</h1>

      <form onSubmit={submitForm}>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            {/* Profile Image Upload */}
            <div className="ihub-mb-4">
              <h3>Profile Image Upload</h3>
              <p className="ihub-mb-3">
                Upload your profile picture. Only image files are accepted.
              </p>
              <FileUploader
                headers="Upload Profile Image"
                labels="Drag and drop your profile image here"
                accepts="image/*"
                maxFileSize={5000000} // 5MB
                names="profile_image"
                username="john_doe"
                setResponse={handleProfileImageUpload}
              />
              {profileImage && (
                <div className="ihub-mt-3">
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }}
                  />
                  <p className="ihub-text-success ihub-mt-2">✅ Profile image uploaded successfully</p>
                </div>
              )}
            </div>

            {/* Document Upload */}
            <div className="ihub-mb-4">
              <h3>Document Upload</h3>
              <p className="ihub-mb-3">
                Upload important documents (PDF, Word, etc.). Multiple files allowed.
              </p>
              <FileUploader
                headers="Upload Documents"
                labels="Drag and drop documents here (PDF, DOC, DOCX)"
                accepts=".pdf,.doc,.docx,.txt"
                maxFileSize={10000000} // 10MB
                names="documents"
                username="john_doe"
                setResponse={handleDocumentUpload}
              />
              {documentFiles.length > 0 && (
                <div className="ihub-mt-3">
                  <p className="ihub-text-success">✅ {documentFiles.length} document(s) uploaded</p>
                  <ul className="ihub-list-unstyled">
                    {documentFiles.map((file, index) => (
                      <li key={index} className="ihub-text-muted">
                        📄 Document {index + 1}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Video Upload */}
            <div className="ihub-mb-4">
              <h3>Video Upload</h3>
              <p className="ihub-mb-3">
                Upload video files for processing. Large files supported with progress tracking.
              </p>
              <FileUploader
                headers="Upload Video"
                labels="Drag and drop video files here (MP4, MOV, AVI)"
                accepts="video/*"
                maxFileSize={500000000} // 500MB
                names="video_content"
                username="john_doe"
                setResponse={handleVideoUpload}
              />
              {videoFile && (
                <div className="ihub-mt-3">
                  <p className="ihub-text-success">✅ Video uploaded and processing</p>
                  <video 
                    src={videoFile} 
                    controls 
                    style={{ width: "100%", maxWidth: "400px", height: "200px" }}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          </div>

          <div className="ihub-col-md-6">
            {/* Job Application Form */}
            <div className="ihub-mb-4">
              <h3>Job Application Files</h3>
              
              <div className="ihub-mb-3">
                <label className="ihub-form-label">
                  <strong>Resume (Required)</strong>
                </label>
                <FileUploader
                  headers="Upload Resume"
                  labels="Upload your resume (PDF preferred)"
                  accepts=".pdf,.doc,.docx"
                  maxFileSize={5000000} // 5MB
                  names="resume"
                  username="applicant"
                  setResponse={handleFormFileUpload("resume")}
                />
                {formData.resume && (
                  <p className="ihub-text-success ihub-mt-2">✅ Resume uploaded</p>
                )}
              </div>

              <div className="ihub-mb-3">
                <label className="ihub-form-label">
                  <strong>Cover Letter (Optional)</strong>
                </label>
                <FileUploader
                  headers="Upload Cover Letter"
                  labels="Upload your cover letter"
                  accepts=".pdf,.doc,.docx,.txt"
                  maxFileSize={3000000} // 3MB
                  names="cover_letter"
                  username="applicant"
                  setResponse={handleFormFileUpload("coverLetter")}
                />
                {formData.coverLetter && (
                  <p className="ihub-text-success ihub-mt-2">✅ Cover letter uploaded</p>
                )}
              </div>

              <div className="ihub-mb-3">
                <label className="ihub-form-label">
                  <strong>Portfolio (Optional)</strong>
                </label>
                <FileUploader
                  headers="Upload Portfolio"
                  labels="Upload portfolio files or samples of your work"
                  accepts="*"
                  maxFileSize={50000000} // 50MB
                  names="portfolio"
                  username="applicant"
                  setResponse={handleFormFileUpload("portfolio")}
                />
                {formData.portfolio && (
                  <p className="ihub-text-success ihub-mt-2">✅ Portfolio uploaded</p>
                )}
              </div>
            </div>

            {/* General File Upload */}
            <div className="ihub-mb-4">
              <h3>General File Upload</h3>
              <p className="ihub-mb-3">
                Upload any type of file. This example shows dynamic feedback based on file type.
              </p>
              <FileUploader
                headers="Upload Any File"
                labels="Drag and drop any file here"
                accepts="*"
                maxFileSize={100000000} // 100MB
                names="general_files"
                username="user123"
                setResponse={handleGeneralUpload}
              />
              {uploadedFiles.length > 0 && (
                <div className="ihub-mt-3">
                  <p className="ihub-text-success">✅ {uploadedFiles.length} file(s) uploaded</p>
                  <div style={{ maxHeight: "150px", overflowY: "auto" }}>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="ihub-d-flex ihub-justify-content-between ihub-p-2 ihub-border-bottom">
                        <span>📎 {file.title}</span>
                        <small className="ihub-text-muted">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </small>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="ihub-mt-4 ihub-d-flex ihub-gap-3 ihub-flex-wrap">
          <button
            type="button"
            className="ihub-outlined-btn"
            onClick={validateUploadRequirements}
          >
            Validate Uploads
          </button>
          <button type="submit" className="ihub-important-btn">
            Submit Application
          </button>
          <button
            type="button"
            className="ihub-danger-btn"
            onClick={clearAllUploads}
          >
            Clear All Uploads
          </button>
        </div>
      </form>

      {/* Upload Summary */}
      <div className="ihub-mt-5 ihub-p-4" style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
        <h3>Upload Summary</h3>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <ul>
              <li><strong>Profile Image:</strong> {profileImage ? "✅ Uploaded" : "❌ Not uploaded"}</li>
              <li><strong>Documents:</strong> {documentFiles.length} file(s)</li>
              <li><strong>Video:</strong> {videoFile ? "✅ Uploaded" : "❌ Not uploaded"}</li>
              <li><strong>General Files:</strong> {uploadedFiles.length} file(s)</li>
            </ul>
          </div>
          <div className="ihub-col-md-6">
            <ul>
              <li><strong>Resume:</strong> {formData.resume ? "✅ Uploaded" : "❌ Not uploaded"}</li>
              <li><strong>Cover Letter:</strong> {formData.coverLetter ? "✅ Uploaded" : "❌ Not uploaded"}</li>
              <li><strong>Portfolio:</strong> {formData.portfolio ? "✅ Uploaded" : "❌ Not uploaded"}</li>
            </ul>
          </div>
        </div>
        <div className="ihub-mt-3">
          <strong>Total Files Uploaded:</strong> {
            uploadedFiles.length + 
            documentFiles.length + 
            (profileImage ? 1 : 0) + 
            (videoFile ? 1 : 0) +
            (formData.resume ? 1 : 0) +
            (formData.coverLetter ? 1 : 0) +
            (formData.portfolio ? 1 : 0)
          }
        </div>
      </div>

      {/* Real-world integration examples */}
      <div className="ihub-mt-5">
        <h2>Real-world Integration Examples</h2>

        {/* E-commerce product images */}
        <div className="ihub-mb-4">
          <h3>E-commerce Product Images</h3>
          <p className="ihub-mb-3">
            Upload multiple product images for your online store. Images are automatically 
            optimized and processed for different screen sizes.
          </p>
          <FileUploader
            headers="Product Images"
            labels="Upload product photos (JPEG, PNG, WebP)"
            accepts="image/jpeg,image/png,image/webp"
            maxFileSize={10000000} // 10MB
            names="product_images"
            username="seller123"
            setResponse={(response) => {
              console.log("Product image uploaded:", response);
              openToast(`Product image uploaded: ${response.title} - Now processing for different sizes`);
            }}
          />
        </div>

        {/* Content Management System */}
        <div className="ihub-mb-4">
          <h3>CMS Media Upload</h3>
          <p className="ihub-mb-3">
            Upload media files for your content management system. Files are organized 
            by type and automatically tagged.
          </p>
          <FileUploader
            headers="CMS Media"
            labels="Upload images, videos, or documents for your website"
            accepts="*"
            maxFileSize={200000000} // 200MB
            names="cms_media"
            module="website"
            step="media_library"
            username="editor"
            setResponse={(response) => {
              console.log("CMS media uploaded:", response);
              const fileType = response.content_type.split('/')[0];
              openToast(`${fileType.charAt(0).toUpperCase() + fileType.slice(1)} added to media library`);
            }}
          />
        </div>

        {/* User Avatar Upload */}
        <div className="ihub-mb-4">
          <h3>User Avatar Update</h3>
          <p className="ihub-mb-3">
            Quick avatar upload with instant preview. Old avatar is automatically replaced.
          </p>
          <FileUploader
            headers="Update Avatar"
            labels="Choose new profile picture"
            accepts="image/*"
            maxFileSize={2000000} // 2MB
            names="user_avatar"
            username="current_user"
            setResponse={(response) => {
              console.log("Avatar updated:", response);
              openToast("Avatar updated successfully! Changes are visible immediately.");
            }}
          />
        </div>

        {/* Course Material Upload */}
        <div className="ihub-mb-4">
          <h3>Educational Content Upload</h3>
          <p className="ihub-mb-3">
            Upload course materials including videos, PDFs, and presentations. 
            Files are automatically organized by course and module.
          </p>
          <FileUploader
            headers="Course Materials"
            labels="Upload lectures, assignments, or course resources"
            accepts=".pdf,.ppt,.pptx,.doc,.docx,.mp4,.mov,.avi"
            maxFileSize={1000000000} // 1GB for large video files
            names="course_content"
            module="education"
            step="lesson_1"
            username="instructor"
            setResponse={(response) => {
              console.log("Course material uploaded:", response);
              const isVideo = response.content_type.startsWith('video/');
              if (isVideo) {
                openToast("Video uploaded! Processing for different quality levels and generating subtitles.");
              } else {
                openToast(`Course material uploaded: ${response.title} - Available to students immediately.`);
              }
            }}
          />
        </div>

        {/* Backup and Archive */}
        <div className="ihub-mb-4">
          <h3>Data Backup Upload</h3>
          <p className="ihub-mb-3">
            Upload backup files or archives. System automatically verifies file integrity 
            and stores with encryption.
          </p>
          <FileUploader
            headers="Backup Upload"
            labels="Upload backup files (ZIP, TAR, SQL dumps)"
            accepts=".zip,.tar,.gz,.sql,.bak"
            maxFileSize={5000000000} // 5GB for large backups
            names="backup_files"
            username="admin"
            setResponse={(response) => {
              console.log("Backup uploaded:", response);
              openToast(`Backup uploaded: ${response.title} - File integrity verified and encrypted storage confirmed.`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FileUploaderExamples;
```

## 🔗 Related Components

- [IhubFileUploader](./IhubFileUploader.md) - Advanced file uploader component
- [DropFile](./DropFile.md) - Simple drag and drop file component
- [InputText](./InputText.md) - Text input component
- [MultipleEmail](./MultipleEmail.md) - Multiple email input component