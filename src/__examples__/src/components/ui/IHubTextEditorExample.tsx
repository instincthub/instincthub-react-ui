"use client";

import React, { useState } from "react";
import { IHubTextEditor, SubmitButton } from "../../../../index";
import type { FileUploadHandler } from "../../../../index";
import { BLOCKS_SAMPLE, EMAIL_TEMPLATE_SAMPLE } from "./ihubTextEditorSamples";

/**
 * Demo-only uploader: simulates progress and returns a local object URL.
 * In an app, pass `upload={{ presignEndpoint, token }}` or set the env vars instead.
 */
const mockFileUpload: FileUploadHandler = async (file, { onProgress }) => {
  for (let pct = 10; pct <= 100; pct += 15) {
    await new Promise((resolve) => setTimeout(resolve, 120));
    onProgress(Math.min(pct, 100));
  }
  return { url: URL.createObjectURL(file), name: file.name, size: file.size, mime: file.type };
};

const IHubTextEditorExample: React.FC = () => {
  const [content1, setContent1] = useState("");
  const [content2, setContent2] = useState(
    "<h2>Welcome to IHubTextEditor</h2><p>This is a <strong>Medium-style</strong> editor with a distraction-free writing experience.</p><p>Try selecting text to see the floating toolbar, or type <code>/</code> to insert blocks.</p>"
  );
  const [content3, setContent3] = useState("");
  const [blocksHtml, setBlocksHtml] = useState(BLOCKS_SAMPLE);
  const [emailHtml, setEmailHtml] = useState(EMAIL_TEMPLATE_SAMPLE);
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
          Notion-style rich text editor: slash commands, flexible tables,
          image/video/PDF/file uploads, section banners, callouts, toggles,
          buttons, and rich HTML that keeps its styles
        </p>
      </div>

      <div className="ihub-examples-grid">
        {/* Blocks showcase */}
        <div className="ihub-example-card">
          <h3>Blocks, tables and uploads</h3>
          <p>
            Type &quot;/&quot; or click &quot;+&quot; on an empty line for Image, Video,
            Audio, PDF, File, Embed, Section Banner, Callout, Toggle and Button.
            Drag files straight into the editor to upload them.
          </p>
          <IHubTextEditor
            name="blocks-demo"
            content={blocksHtml}
            onChange={setBlocksHtml}
            onFileUpload={mockFileUpload}
          />
        </div>

        {/* Rich HTML */}
        <div className="ihub-example-card">
          <h3>Rich HTML (email template)</h3>
          <p>
            Pasted or loaded HTML keeps its inline styles, email table attributes
            and layout. Paste with ⌘⇧V / Ctrl+Shift+V to paste plain text instead.
          </p>
          <IHubTextEditor
            name="email-demo"
            content={emailHtml}
            onChange={setEmailHtml}
            onFileUpload={mockFileUpload}
            maxHeight="none"
          />
          <details className="ihub-mt-3">
            <summary>Output HTML</summary>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: "0.75rem" }}>{emailHtml}</pre>
          </details>
        </div>

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
          <h3>Uploads (image, video, audio, PDF, file)</h3>
          <pre>
            <code>{`// 1. Your own handler (highest priority)
<IHubTextEditor
  onFileUpload={async (file, { kind, onProgress }) => {
    const url = await myUpload(file, onProgress);
    return { url, name: file.name, size: file.size };
  }}
/>

// 2. Presigned S3 upload (recommended). Endpoint receives
//    { filename, content_type, size, kind } and returns { url, cdnUrl }.
<IHubTextEditor upload={{ presignEndpoint: \`\${API_HOST_URL}uploads/presign/\`, token }} />

// 3. Multipart endpoint (Leadboard documents style). Response JSON
//    needs a url / file / location field.
<IHubTextEditor upload={{ endpoint: \`\${API_HOST_URL}documents/\${handle}/\`, token }} />

// Or configure with env vars instead of props:
// NEXT_PUBLIC_IHUB_EDITOR_PRESIGN_URL=https://api.example.com/uploads/presign/
// NEXT_PUBLIC_IHUB_EDITOR_UPLOAD_URL=https://api.example.com/uploads/
// 4. Direct S3 (opt-in: NEXT_PUBLIC_IHUB_EDITOR_DIRECT_S3=true or upload={{ directS3: true }})
//    reuses FileUploader's variables. The secret key ships to the browser, so prefer presign:
// NEXT_PUBLIC_AWS_BUCKET_NAME, NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
// NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY, NEXT_PUBLIC_AWS_REGION,
// NEXT_PUBLIC_IHUB_EDITOR_S3_FOLDER, NEXT_PUBLIC_IHUB_EDITOR_FILE_URL`}</code>
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
    banners: false,
    fileUploads: false,   // video, audio, PDF and file blocks
    preserveStyles: false // strip inline styles from pasted HTML
  }}
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default IHubTextEditorExample;
