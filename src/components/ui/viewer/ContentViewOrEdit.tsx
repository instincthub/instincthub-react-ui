"use client";
import React, { useState } from "react";
import TextEditor from "../editor/CustomTextEditor";
import ContentViewer from "./ContentViewer";

// MUI icons
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Visibility";

export default function ContentViewOrEdit(): JSX.Element {
  const [content, setContent] = useState<string>(
    "<h2>Getting Started with InstinctHub</h2><p>Welcome to your course content! This editor allows you to create rich, interactive content for your students.</p><ul><li>Format text using the toolbar above</li><li>Add images, tables, and code samples</li><li>Create interactive task lists</li></ul><p>Click the edit button to make changes, then preview to see how your content will appear to students.</p>"
  );
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSave = () => {
    // Here you would typically save the content to your backend
    console.log("Saving content:", content);
    // For demonstration, we'll just switch back to view mode
    setIsEditing(false);
  };

  return (
    <div className="ihub-content-page">
      <div className="ihub-content-header">
        <h1>Course Module: Introduction</h1>

        <div className="ihub-content-actions">
          <button
            className="ihub-btn ihub-btn-secondary"
            onClick={toggleEditMode}
          >
            {isEditing ? (
              <>
                <PreviewIcon fontSize="small" /> Preview
              </>
            ) : (
              <>
                <EditIcon fontSize="small" /> Edit
              </>
            )}
          </button>

          {isEditing && (
            <button className="ihub-btn ihub-btn-primary" onClick={handleSave}>
              Save Changes
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <TextEditor
          content={content}
          onChange={handleContentChange}
          placeholder="Start creating your course content..."
          charLimit={50000}
        />
      ) : (
        <ContentViewer
          content={content}
          title="Course Module: Introduction"
          onEdit={toggleEditMode}
          showToolbar={true}
        />
      )}

      <div className="ihub-content-footer">
        <p>Last updated: March 14, 2025</p>
      </div>
    </div>
  );
}
