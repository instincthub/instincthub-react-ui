"use client";
import React, { useState } from "react";
import { IhubFileUploader } from "../../../../../index";
import { S3UploadResponseType } from "../../../../../types";

/**
 * Example component showcasing the IhubFileUploader in different scenarios
 */
const FileUploaderExample: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // Handler for profile image upload
  const handleProfileImageUpload = (response: S3UploadResponseType): void => {
    setProfileImage(response.location);
    console.log("Profile image uploaded:", response);
  };

  // Handler for document upload
  const handleDocumentUpload = (response: S3UploadResponseType): void => {
    setDocumentUrl(response.location);
    console.log("Document uploaded:", response);
  };

  // Handler for video upload
  const handleVideoUpload = (response: S3UploadResponseType): void => {
    setVideoUrl(response.location);
    console.log("Video uploaded:", response);
  };

  return (
    <div className="ihub-container ihub-py-4 ihub-mt-10 ihub-pt-10">
      <h1 className="ihub-mb-5 ihub-pt-10">File Uploader Examples</h1>

      <div className="ihub-max-w-800 ihub-mx-auto">
        {/* Profile Image Upload Section */}
        <section className="ihub-mb-8">
          <h2 className="ihub-mb-4">Profile Image Upload</h2>

          <div className="ihub-d-flex ihub-flex-wrap">
            <div className="ihub-w-50 ihub-pr-3 ihub-sm-w-100">
              <IhubFileUploader
                header="Upload Profile Picture"
                label="Drag and drop an image or click to browse"
                accept="image/*"
                maxFileSize={5 * 1024 * 1024} // 5MB
                onUploadComplete={handleProfileImageUpload}
                name="profilePicture"
              />
            </div>

            <div className="ihub-w-50 ihub-pl-3 ihub-sm-w-100 ihub-sm-pl-0 ihub-sm-mt-4">
              <div
                className="ihub-p-4"
                style={{ background: "var(--Magnolia)", borderRadius: "8px" }}
              >
                <h3 className="ihub-mb-3">Preview</h3>
                {profileImage ? (
                  <div className="ihub-text-center">
                    <img
                      src={profileImage}
                      alt="Profile"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "200px",
                        borderRadius: "8px",
                        boxShadow: "var(--lightShadow)",
                      }}
                    />
                    <p className="ihub-mt-3">
                      Profile image uploaded successfully!
                    </p>
                  </div>
                ) : (
                  <p>
                    No profile image uploaded yet. Upload an image to see a
                    preview here.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Document Upload Section */}
        <section className="ihub-mb-8">
          <h2 className="ihub-mb-4">Document Upload</h2>

          <div className="ihub-d-flex ihub-flex-wrap">
            <div className="ihub-w-50 ihub-pr-3 ihub-sm-w-100">
              <IhubFileUploader
                header="Upload Documents"
                label="Drag and drop documents or click to browse"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                maxFileSize={10 * 1024 * 1024} // 10MB
                onUploadComplete={handleDocumentUpload}
                name="document"
                module="course101"
              />
            </div>

            <div className="ihub-w-50 ihub-pl-3 ihub-sm-w-100 ihub-sm-pl-0 ihub-sm-mt-4">
              <div
                className="ihub-p-4"
                style={{ background: "var(--Magnolia)", borderRadius: "8px" }}
              >
                <h3 className="ihub-mb-3">Document Status</h3>
                {documentUrl ? (
                  <div>
                    <p className="ihub-mb-2">
                      ✅ Document uploaded successfully!
                    </p>
                    <p className="ihub-mb-2">
                      <strong>URL:</strong>{" "}
                      <a
                        href={documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {documentUrl}
                      </a>
                    </p>
                    <button
                      className="ihub-important-btn ihub-mt-2"
                      onClick={() => window.open(documentUrl, "_blank")}
                    >
                      View Document
                    </button>
                  </div>
                ) : (
                  <p>
                    No document uploaded yet. Upload a document to see the
                    status here.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Video Upload Section */}
        <section>
          <h2 className="ihub-mb-4">Video Upload</h2>

          <div className="ihub-d-flex ihub-flex-wrap">
            <div className="ihub-w-50 ihub-pr-3 ihub-sm-w-100">
              <IhubFileUploader
                header="Upload Course Video"
                label="Drag and drop video or click to browse"
                accept="video/*"
                maxFileSize={500 * 1024 * 1024} // 500MB
                onUploadComplete={handleVideoUpload}
                name="courseVideo"
                module="course101"
                step="lesson1"
              />
              <p className="ihub-mt-2 ihub-fs-1">
                <em>
                  Note: Videos can be large files. Multipart upload is used for
                  files larger than 100MB.
                </em>
              </p>
            </div>

            <div className="ihub-w-50 ihub-pl-3 ihub-sm-w-100 ihub-sm-pl-0 ihub-sm-mt-4">
              <div
                className="ihub-p-4"
                style={{ background: "var(--Magnolia)", borderRadius: "8px" }}
              >
                <h3 className="ihub-mb-3">Video Status</h3>
                {videoUrl ? (
                  <div>
                    <p className="ihub-mb-3">✅ Video uploaded successfully!</p>

                    <div
                      className="ihub-w-100"
                      style={{
                        maxHeight: "200px",
                        overflow: "hidden",
                        borderRadius: "8px",
                        boxShadow: "var(--lightShadow)",
                      }}
                    >
                      <video controls style={{ width: "100%", height: "auto" }}>
                        <source src={videoUrl} />
                        Your browser does not support HTML video.
                      </video>
                    </div>
                  </div>
                ) : (
                  <p>
                    No video uploaded yet. Upload a video to see a preview here.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FileUploaderExample;
