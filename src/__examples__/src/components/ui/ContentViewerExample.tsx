"use client";

import React, { useState } from "react";
import { ContentViewer, SubmitButton } from "../../../../index";

const ContentViewerExample: React.FC = () => {
  const [htmlContent] = useState(`
    <h2>Welcome to InstinctHub</h2>
    <p>This is a <strong>sample content</strong> with <em>HTML formatting</em>.</p>
    <ul>
      <li>First item with <a href="#">link</a></li>
      <li>Second item with <code>inline code</code></li>
      <li>Third item</li>
    </ul>
    <blockquote>
      This is a blockquote with important information.
    </blockquote>
  `);

  const [markdownContent] = useState(`
# Markdown Content Example

This is **markdown** content that will be *rendered* as HTML.

## Features
- Supports **bold** and *italic* text
- Code blocks: \`console.log('hello')\`
- Links: [InstinctHub](https://instincthub.com)

### Code Example
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

> This is a markdown blockquote
  `);

  const [plainText] = useState("This is plain text content that will be displayed as-is without any HTML rendering or formatting.");

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>ContentViewer Examples</h1>
        <p>Content viewer component for displaying HTML, markdown, and plain text content</p>
      </div>

      <div className="ihub-examples-grid">
        {/* HTML Content */}
        <div className="ihub-example-card">
          <h3>HTML Content Viewer</h3>
          <p>Display rich HTML content with proper sanitization</p>
          
          <ContentViewer
            content={htmlContent}
            type="html"
            className="ihub-content-display"
          />
        </div>

        {/* Markdown Content */}
        <div className="ihub-example-card">
          <h3>Markdown Content Viewer</h3>
          <p>Render markdown content as formatted HTML</p>
          
          <ContentViewer
            content={markdownContent}
            type="markdown"
            className="ihub-content-display"
            showTableOfContents={true}
          />
        </div>

        {/* Plain Text */}
        <div className="ihub-example-card">
          <h3>Plain Text Viewer</h3>
          <p>Display plain text content with line breaks preserved</p>
          
          <ContentViewer
            content={plainText}
            type="text"
            className="ihub-content-display"
            preserveWhitespace={true}
          />
        </div>

        {/* Interactive Content */}
        <div className="ihub-example-card">
          <h3>Interactive Content Viewer</h3>
          <p>Content viewer with interactive features and controls</p>
          
          <ContentViewer
            content={htmlContent}
            type="html"
            showWordCount={true}
            showReadingTime={true}
            enableCopyToClipboard={true}
            enablePrint={true}
            className="ihub-interactive-content"
          />
        </div>

        {/* Themed Content */}
        <div className="ihub-example-card">
          <h3>Themed Content Viewer</h3>
          <p>Content viewer with different themes and styling options</p>
          
          <div className="ihub-themed-viewers">
            <ContentViewer
              content="<h4>Light Theme</h4><p>Content displayed with light theme styling</p>"
              type="html"
              theme="light"
              className="ihub-theme-light"
            />
            
            <ContentViewer
              content="<h4>Dark Theme</h4><p>Content displayed with dark theme styling</p>"
              type="html"
              theme="dark"
              className="ihub-theme-dark ihub-mt-3"
            />
          </div>
        </div>

        {/* Code Content */}
        <div className="ihub-example-card">
          <h3>Code Content Viewer</h3>
          <p>Display code with syntax highlighting and copy functionality</p>
          
          <ContentViewer
            content={`function calculateTotal(items) {
  return items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
}

// Usage example
const cartItems = [
  { price: 10, quantity: 2 },
  { price: 15, quantity: 1 }
];

console.log(calculateTotal(cartItems)); // 35`}
            type="code"
            language="javascript"
            showLineNumbers={true}
            enableCopyToClipboard={true}
            className="ihub-code-display"
          />
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic HTML Content</h3>
          <pre><code>{`import { ContentViewer } from '@instincthub/react-ui';

const htmlContent = "<h2>Title</h2><p>Content...</p>";

<ContentViewer
  content={htmlContent}
  type="html"
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Markdown Content</h3>
          <pre><code>{`const markdownContent = "# Title\\n\\nThis is **bold** text";

<ContentViewer
  content={markdownContent}
  type="markdown"
  showTableOfContents={true}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Code Content</h3>
          <pre><code>{`<ContentViewer
  content={codeString}
  type="code"
  language="javascript"
  showLineNumbers={true}
  enableCopyToClipboard={true}
/>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default ContentViewerExample;