"use client";

import React, { useState } from "react";
import { ContentViewOrEdit, SubmitButton } from "../../../../index";

const ContentViewOrEditExample: React.FC = () => {
  const [content1, setContent1] = useState("<h3>Welcome to Our Platform</h3><p>This is <strong>editable content</strong> that you can modify by clicking the edit button.</p>");
  const [content2, setContent2] = useState("# Project Overview\n\nThis is a **markdown** document that can be edited inline.\n\n## Features\n- Inline editing\n- Real-time preview\n- Auto-save functionality");
  const [content3, setContent3] = useState("Plain text content that can be edited when you click the edit button. This is useful for simple text editing scenarios.");
  const [isAutoSave, setIsAutoSave] = useState(true);

  const handleSave = (content: string, id: string) => {
    console.log(`Saving content for ${id}:`, content);
    // Simulate API save
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(`Content saved successfully for ${id}`);
        resolve();
      }, 1000);
    });
  };

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>ContentViewOrEdit Examples</h1>
        <p>Dual-mode component for viewing and editing content with inline editing capabilities</p>
      </div>

      <div className="ihub-examples-grid">
        {/* HTML Content Editor */}
        <div className="ihub-example-card">
          <h3>HTML Content Editor</h3>
          <p>Rich HTML content with inline editing and preview</p>
          
          <ContentViewOrEdit
            content={content1}
            setContent={setContent1}
            title="HTML Content Editor"
            showToolbar={true}
            placeholder="Enter HTML content..."
            charLimit={5000}
            showEditBtn={true}
            showPreviewBtn={true}
          />
        </div>

        {/* Markdown Editor */}
        <div className="ihub-example-card">
          <h3>Markdown Content Editor</h3>
          <p>Markdown content with live preview and editing</p>
          
          <ContentViewOrEdit
            content={content2}
            setContent={setContent2}
            title="Markdown Content Editor"
            showToolbar={true}
            placeholder="Enter markdown content..."
            charLimit={5000}
            showEditBtn={true}
            showPreviewBtn={true}
          />
          
          <div className="ihub-editor-controls ihub-mt-2">
            <label className="ihub-checkbox-label">
              <input
                type="checkbox"
                checked={isAutoSave}
                onChange={(e) => setIsAutoSave(e.target.checked)}
              />
              Enable Auto-save
            </label>
          </div>
        </div>

        {/* Plain Text Editor */}
        <div className="ihub-example-card">
          <h3>Plain Text Editor</h3>
          <p>Simple text editor with inline editing</p>
          
          <ContentViewOrEdit
            content={content3}
            setContent={setContent3}
            title="Plain Text Editor"
            showToolbar={true}
            placeholder="Enter plain text content..."
            charLimit={500}
            showEditBtn={true}
            showPreviewBtn={false}
          />
        </div>

        {/* Advanced Editor */}
        <div className="ihub-example-card">
          <h3>Advanced Editor with Features</h3>
          <p>Feature-rich editor with various controls and options</p>
          
          <ContentViewOrEdit
            content={content1}
            setContent={setContent1}
            title="Advanced Editor"
            showToolbar={true}
            placeholder="Enter content with advanced features..."
            charLimit={10000}
            showEditBtn={true}
            showPreviewBtn={true}
          />
        </div>

        {/* Read-only Content */}
        <div className="ihub-example-card">
          <h3>Read-only Content Display</h3>
          <p>Content viewer with read-only mode and optional edit permissions</p>
          
          <ContentViewOrEdit
            content="<h4>Read-only Content</h4><p>This content is set to read-only mode and cannot be edited.</p><ul><li>Feature 1</li><li>Feature 2</li><li>Feature 3</li></ul>"
            setContent={() => {}}
            title="Read-only Content"
            showToolbar={true}
            placeholder=""
            charLimit={1000}
            showEditBtn={false}
            showPreviewBtn={false}
          />
        </div>

        {/* Collaborative Editing */}
        <div className="ihub-example-card">
          <h3>Collaborative Editing</h3>
          <p>Content editor with collaboration features</p>
          
          <ContentViewOrEdit
            content={content2}
            setContent={setContent2}
            title="Collaborative Editing"
            showToolbar={true}
            placeholder="Collaborative editing content..."
            charLimit={5000}
            showEditBtn={true}
            showPreviewBtn={true}
            lastUpdated={new Date().toISOString()}
          />
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { ContentViewOrEdit } from '@instincthub/react-ui';

const [content, setContent] = useState("");

<ContentViewOrEdit
  content={content}
  onContentChange={setContent}
  onSave={(content) => handleSave(content)}
  type="html"
  editorType="rich"
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Markdown Editor</h3>
          <pre><code>{`<ContentViewOrEdit
  content={markdownContent}
  onContentChange={setMarkdownContent}
  onSave={handleSave}
  type="markdown"
  editorType="markdown"
  showPreview={true}
  autoSave={true}
  autoSaveDelay={2000}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Advanced Configuration</h3>
          <pre><code>{`<ContentViewOrEdit
  content={content}
  onContentChange={setContent}
  onSave={handleSave}
  type="html"
  editorType="rich"
  showPreview={true}
  showWordCount={true}
  allowFullscreen={true}
  toolbar={['bold', 'italic', 'heading', 'link']}
  collaborators={collaboratorsList}
  showComments={true}
/>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default ContentViewOrEditExample;