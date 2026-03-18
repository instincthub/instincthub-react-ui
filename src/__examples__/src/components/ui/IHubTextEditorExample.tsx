"use client";

import React, { useState } from "react";
import { IHubTextEditor, SubmitButton } from "../../../../index";

const IHubTextEditorExample: React.FC = () => {
  const [content1, setContent1] = useState("");
  const [content2, setContent2] = useState(
    "<h2>Welcome to IHubTextEditor</h2><p>This is a <strong>Medium-style</strong> editor with a distraction-free writing experience.</p><p>Try selecting text to see the floating toolbar, or type <code>/</code> to insert blocks.</p>"
  );
  const [content3, setContent3] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mockImageUpload = async (file: File): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return URL.createObjectURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Submitted content:", content3);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>IHubTextEditor Examples</h1>
        <p>
          Medium/Substack-style rich text editor with floating toolbar, slash
          commands, and image uploads
        </p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Editor */}
        <div className="ihub-example-card">
          <h3>Basic Editor</h3>
          <p>
            Distraction-free editor. Select text for the bubble toolbar, type
            &quot;/&quot; for slash commands, click &quot;+&quot; on empty lines.
          </p>

          <IHubTextEditor
            content={content1}
            onChange={setContent1}
            placeholder="Tell your story..."
          />

          <div className="ihub-editor-output ihub-mt-3">
            <h5>Output:</h5>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: "0.8rem" }}>
              {content1}
            </pre>
          </div>
        </div>

        {/* Editor with Initial Content */}
        <div className="ihub-example-card">
          <h3>Pre-populated Editor</h3>
          <p>Editor with initial HTML content and image upload support.</p>

          <IHubTextEditor
            label="Article Content"
            content={content2}
            onChange={setContent2}
            onImageUpload={mockImageUpload}
            charLimit={10000}
            lastUpdated={new Date().toISOString()}
          />
        </div>

        {/* Form Integration */}
        <div className="ihub-example-card">
          <h3>Form Integration</h3>
          <p>Editor used within a form with submit handling.</p>

          <form onSubmit={handleSubmit}>
            <IHubTextEditor
              label="Blog Post"
              name="blog-content"
              content={content3}
              onChange={setContent3}
              placeholder="Write your blog post..."
              charLimit={50000}
              required
              onImageUpload={mockImageUpload}
              minHeight="300px"
            />

            <div className="ihub-mt-3">
              <SubmitButton
                label="Publish Post"
                status={isSubmitting ? 2 : 1}
                className="ihub-important-btn"
                disabled={!content3.trim()}
              />
            </div>
          </form>
        </div>

        {/* Read-Only Mode */}
        <div className="ihub-example-card">
          <h3>Read-Only Mode</h3>
          <p>Editor in read-only mode for content display.</p>

          <IHubTextEditor
            content={content2}
            readOnly
            features={{ characterCount: false }}
            minHeight="200px"
          />
        </div>

        {/* Focus Mode */}
        <div className="ihub-example-card">
          <h3>Focus Mode</h3>
          <p>Dims non-focused paragraphs for distraction-free writing.</p>

          <IHubTextEditor
            content=""
            onChange={() => {}}
            placeholder="Start writing in focus mode..."
            features={{ focusMode: true }}
          />
        </div>

        {/* Minimal Features */}
        <div className="ihub-example-card">
          <h3>Minimal Configuration</h3>
          <p>
            Editor with only bubble menu and character count — no slash commands
            or floating button.
          </p>

          <IHubTextEditor
            content=""
            onChange={() => {}}
            placeholder="Simple editor..."
            features={{
              slashCommands: false,
              floatingAddButton: false,
              tables: false,
              taskLists: false,
              pullQuotes: false,
              mediaEmbeds: false,
              imageUpload: false,
            }}
            charLimit={500}
            minHeight="200px"
          />
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>

        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre>
            <code>{`import { IHubTextEditor } from '@instincthub/react-ui';

const [content, setContent] = useState("");

<IHubTextEditor
  content={content}
  onChange={setContent}
  placeholder="Tell your story..."
/>`}</code>
          </pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Image Upload</h3>
          <pre>
            <code>{`const handleImageUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch("/api/upload", { method: "POST", body: formData });
  const { url } = await res.json();
  return url;
};

<IHubTextEditor
  content={content}
  onChange={setContent}
  onImageUpload={handleImageUpload}
/>`}</code>
          </pre>
        </div>

        <div className="ihub-code-section">
          <h3>Feature Toggle</h3>
          <pre>
            <code>{`<IHubTextEditor
  content={content}
  onChange={setContent}
  features={{
    slashCommands: false,
    floatingAddButton: false,
    focusMode: true,
    tables: false,
  }}
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default IHubTextEditorExample;
