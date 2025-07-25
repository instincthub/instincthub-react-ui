"use client";

import React, { useState } from "react";
import { CustomTextEditor, SubmitButton } from "../../../../index";

const CustomTextEditorExample: React.FC = () => {
  const [content1, setContent1] = useState("");
  const [content2, setContent2] = useState("<p>This is <strong>bold</strong> and <em>italic</em> text.</p>");
  const [content3, setContent3] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (content: string) => {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Submitted content:", content);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>CustomTextEditor Examples</h1>
        <p>Rich text editor component with TipTap integration for advanced text editing</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Editor */}
        <div className="ihub-example-card">
          <h3>Basic Text Editor</h3>
          <p>Simple rich text editor with basic formatting options</p>
          
          <CustomTextEditor
            content={content1}
            onChange={setContent1}
            placeholder="Start typing your content..."
          />
          
          <div className="ihub-editor-output ihub-mt-3">
            <h5>Output:</h5>
            <div className="ihub-content-preview" dangerouslySetInnerHTML={{ __html: content1 }} />
          </div>
        </div>

        {/* Editor with Initial Content */}
        <div className="ihub-example-card">
          <h3>Editor with Initial Content</h3>
          <p>Text editor pre-populated with formatted content</p>
          
          <CustomTextEditor
            content={content2}
            onChange={setContent2}
            placeholder="Edit the existing content..."
            charLimit={1000}
          />
          
          <div className="ihub-editor-output ihub-mt-3">
            <h5>Current Content:</h5>
            <div className="ihub-content-preview" dangerouslySetInnerHTML={{ __html: content2 }} />
          </div>
        </div>

        {/* Form Integration */}
        <div className="ihub-example-card">
          <h3>Form Integration</h3>
          <p>Text editor integrated with form submission</p>
          
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(content3); }}>
            <div className="ihub-form-field">
              <label className="ihub-label">Blog Post Content</label>
              <CustomTextEditor
                label="Content"
                name="blog-content"
                content={content3}
                onChange={setContent3}
                placeholder="Write your blog post content here..."
                charLimit={5000}
                required={true}
                note="Write engaging content for your blog post"
              />
            </div>
            
            <SubmitButton
              label="Publish Post"
              status={isSubmitting ? 2 : 1}
              className="ihub-important-btn"
              disabled={!content3.trim()}
            />
          </form>
        </div>

        {/* Editor with Preview */}
        <div className="ihub-example-card">
          <h3>Editor with Preview Mode</h3>
          <p>Text editor with editing and preview modes</p>
          
          <CustomTextEditor
            label="Article Content"
            name="article"
            content={content1}
            onChange={setContent1}
            placeholder="Write your article here..."
            showPreviewBtn={true}
            lastUpdated={new Date().toISOString()}
          />
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { CustomTextEditor } from '@instincthub/react-ui';

const [content, setContent] = useState("");

<CustomTextEditor
  content={content}
  onChange={setContent}
  placeholder="Start typing..."
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Character Limit</h3>
          <pre><code>{`<CustomTextEditor
  content={content}
  onChange={setContent}
  placeholder="Enter description..."
  charLimit={1000}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Form Integration</h3>
          <pre><code>{`<CustomTextEditor
  label="Content"
  name="blog-content"
  content={content}
  onChange={setContent}
  placeholder="Write your content here..."
  required={true}
  note="This field is required"
  showPreviewBtn={true}
/>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default CustomTextEditorExample;