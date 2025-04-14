"use client";
import { useState } from "react";
import { CustomTextEditor } from "../../../../index";

export default function ContentFormTextEditor() {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit content to your API
    console.log(content);
  };

  return (
    <form onSubmit={handleSubmit} className="ihub-form">
      <h2>Create Content</h2>

      <div className="ihub-form-field ihub-style-list">
        <CustomTextEditor
          onChange={setContent}
          content={content}
          charLimit={10000}
          placeholder="Write your course content here..."
        />
      </div>

      <button type="submit" className="ihub-btn ihub-btn-primary">
        Save Content
      </button>
    </form>
  );
}
