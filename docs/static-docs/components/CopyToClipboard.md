# CopyToClipboard

**Category:** Status | **Type:** component

A versatile copy-to-clipboard component with support for different content types, visual feedback, error handling, and accessibility features

## 📁 File Location

`src/components/status/CopyToClipBoard.tsx`

## 🏷️ Tags

`status`, `copy`, `clipboard`, `utility`, `feedback`, `accessibility`

## 📖 Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `content` | `string` | Yes | - | The content to copy to clipboard |
| `children` | `React.ReactNode` | No | - | Custom trigger element (button/icon) |
| `showFeedback` | `boolean` | No | `true` | Whether to show success/error feedback |
| `feedbackDuration` | `number` | No | `2000` | Duration to show feedback in ms |
| `successMessage` | `string` | No | `"Copied!"` | Success feedback message |
| `errorMessage` | `string` | No | `"Failed to copy"` | Error feedback message |
| `copyIcon` | `React.ReactNode` | No | - | Custom copy icon |
| `successIcon` | `React.ReactNode` | No | - | Custom success icon |
| `errorIcon` | `React.ReactNode` | No | - | Custom error icon |
| `variant` | `string` | No | `"button"` | Display variant (button, icon, text) |
| `size` | `string` | No | `"medium"` | Size (small, medium, large) |
| `disabled` | `boolean` | No | `false` | Whether the component is disabled |
| `onCopySuccess` | `function` | No | - | Callback on successful copy |
| `onCopyError` | `function` | No | - | Callback on copy error |
| `className` | `string` | No | `""` | Additional CSS classes |

## 🎨 CSS Classes

- `ihub-copy-to-clipboard` - Main component container
- `ihub-copy-button` - Copy button styling
- `ihub-copy-icon` - Copy icon styling
- `ihub-copy-feedback` - Feedback message container
- `ihub-copy-success` - Success state styling
- `ihub-copy-error` - Error state styling
- `ihub-copy-disabled` - Disabled state styling

## 🌟 Features

- **Multiple Content Types** - Text, JSON, URLs, code snippets
- **Visual Feedback** - Success/error messages with animations
- **Custom Triggers** - Buttons, icons, or custom elements
- **Error Handling** - Graceful fallback for unsupported browsers
- **Accessibility** - Keyboard navigation and screen reader support
- **Customizable** - Icons, messages, and styling options
- **Performance** - Optimized with proper cleanup
- **Security** - Safe clipboard API usage

```tsx
"use client";
import React, { useState, useCallback, useRef } from "react";
import { CopyToClipboard, InputText, CodeDisplay, Dialog, InputTextarea } from "@instincthub/react-ui";

/**
 * Comprehensive CopyToClipboard examples demonstrating various use cases
 */
const CopyToClipboardExamples = () => {
  const [textToCopy, setTextToCopy] = useState("Hello, World!");
  const [jsonData, setJsonData] = useState(`{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "developer"
}`);
  const [copyStatus, setCopyStatus] = useState<{ [key: string]: string }>({});
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const timeoutRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

  // Handle copy status feedback
  const handleCopySuccess = useCallback((id: string, message: string = "Copied!") => {
    setCopyStatus(prev => ({ ...prev, [id]: message }));
    
    // Clear existing timeout
    if (timeoutRef.current[id]) {
      clearTimeout(timeoutRef.current[id]);
    }
    
    // Set new timeout
    timeoutRef.current[id] = setTimeout(() => {
      setCopyStatus(prev => {
        const newStatus = { ...prev };
        delete newStatus[id];
        return newStatus;
      });
    }, 3000);
  }, []);

  const handleCopyError = useCallback((id: string, error: Error) => {
    setCopyStatus(prev => ({ ...prev, [id]: `Error: ${error.message}` }));
    console.error("Copy failed:", error);
    
    // Clear error after 5 seconds
    if (timeoutRef.current[id]) {
      clearTimeout(timeoutRef.current[id]);
    }
    
    timeoutRef.current[id] = setTimeout(() => {
      setCopyStatus(prev => {
        const newStatus = { ...prev };
        delete newStatus[id];
        return newStatus;
      });
    }, 5000);
  }, []);

  // Sample data for different content types
  const codeSnippet = `import React, { useState } from 'react';
import { CopyToClipboard } from '@instincthub/react-ui';

function MyComponent() {
  const [copied, setCopied] = useState(false);
  
  return (
    <CopyToClipboard
      content="Hello, World!"
      onCopySuccess={() => setCopied(true)}
    >
      <button>Copy Text</button>
    </CopyToClipboard>
  );
}`;

  const curlCommand = `curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "role": "developer"
  }'`;

  const packageJson = `{
  "name": "my-react-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@instincthub/react-ui": "^2.1.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test"
  }
}`;

  const sqlQuery = `SELECT 
    u.id,
    u.name,
    u.email,
    COUNT(p.id) as post_count,
    AVG(p.views) as avg_views
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
WHERE u.created_at >= '2024-01-01'
    AND u.is_active = true
GROUP BY u.id, u.name, u.email
HAVING COUNT(p.id) > 0
ORDER BY post_count DESC, avg_views DESC
LIMIT 20;`;

  const environmentVars = `# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/mydb
DATABASE_SSL=false
DATABASE_POOL_SIZE=10

# API Configuration
API_BASE_URL=https://api.example.com
API_VERSION=v1
API_TIMEOUT=5000

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
REFRESH_TOKEN_EXPIRES_IN=7d

# External Services
REDIS_URL=redis://localhost:6379
ELASTICSEARCH_URL=http://localhost:9200
EMAIL_SERVICE_API_KEY=your-email-service-key

# Application Settings
NODE_ENV=production
PORT=3000
LOG_LEVEL=info
ENABLE_CORS=true`;

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>CopyToClipboard Examples</h1>
      <p className="ihub-mb-5">
        Demonstrating copy functionality for different content types with visual feedback, error handling, and accessibility features.
      </p>

      {/* Basic Examples */}
      <section className="ihub-mb-5">
        <h2>Basic Copy Functionality</h2>
        
        <div className="ihub-row">
          <div className="ihub-col-lg-6 ihub-mb-4">
            <h3>Simple Text Copy</h3>
            <div className="ihub-form-group">
              <InputText
                label="Text to Copy"
                value={textToCopy}
                onChange={(e) => setTextToCopy(e.target.value)}
                placeholder="Enter text to copy..."
              />
            </div>
            
            <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "12px" }}>
              <CopyToClipboard
                content={textToCopy}
                onCopySuccess={() => handleCopySuccess("basic-text")}
                onCopyError={(error) => handleCopyError("basic-text", error)}
                variant="button"
                size="medium"
              >
                Copy Text
              </CopyToClipboard>
              
              {copyStatus["basic-text"] && (
                <span className={`ihub-copy-feedback ${copyStatus["basic-text"].includes("Error") ? "ihub-text-danger" : "ihub-text-success"}`}>
                  {copyStatus["basic-text"]}
                </span>
              )}
            </div>
          </div>

          <div className="ihub-col-lg-6 ihub-mb-4">
            <h3>Icon Button Copy</h3>
            <div className="ihub-p-3" style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
              <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                <code>npm install @instincthub/react-ui</code>
                <CopyToClipboard
                  content="npm install @instincthub/react-ui"
                  onCopySuccess={() => handleCopySuccess("npm-install")}
                  onCopyError={(error) => handleCopyError("npm-install", error)}
                  variant="icon"
                  size="small"
                  successMessage="Command copied!"
                />
              </div>
              {copyStatus["npm-install"] && (
                <div className={`ihub-mt-2 ihub-small ${copyStatus["npm-install"].includes("Error") ? "ihub-text-danger" : "ihub-text-success"}`}>
                  {copyStatus["npm-install"]}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="ihub-mb-5">
        <h2>Code Snippet Copy</h2>
        
        <div className="ihub-mb-4">
          <h3>React Component Example</h3>
          <div className="ihub-position-relative">
            <CodeDisplay
              code={codeSnippet}
              language="typescript"
              fileName="MyComponent.tsx"
              showCopyButton={false}
              maxHeight="300px"
            />
            <div className="ihub-position-absolute" style={{ top: "12px", right: "12px" }}>
              <CopyToClipboard
                content={codeSnippet}
                onCopySuccess={() => handleCopySuccess("react-code", "React code copied!")}
                onCopyError={(error) => handleCopyError("react-code", error)}
                variant="icon"
                size="small"
                copyIcon={<span>📋</span>}
                successIcon={<span>✅</span>}
                errorIcon={<span>❌</span>}
              />
            </div>
            {copyStatus["react-code"] && (
              <div className={`ihub-mt-2 ${copyStatus["react-code"].includes("Error") ? "ihub-text-danger" : "ihub-text-success"}`}>
                {copyStatus["react-code"]}
              </div>
            )}
          </div>
        </div>

        <div className="ihub-row">
          <div className="ihub-col-lg-6 ihub-mb-4">
            <h3>cURL Command</h3>
            <div className="ihub-position-relative">
              <CodeDisplay
                code={curlCommand}
                language="bash"
                fileName="api-request.sh"
                showCopyButton={false}
                maxHeight="200px"
              />
              <div className="ihub-position-absolute" style={{ top: "12px", right: "12px" }}>
                <CopyToClipboard
                  content={curlCommand}
                  onCopySuccess={() => handleCopySuccess("curl-command", "cURL copied!")}
                  onCopyError={(error) => handleCopyError("curl-command", error)}
                  variant="button"
                  size="small"
                >
                  Copy cURL
                </CopyToClipboard>
              </div>
              {copyStatus["curl-command"] && (
                <div className={`ihub-mt-2 ${copyStatus["curl-command"].includes("Error") ? "ihub-text-danger" : "ihub-text-success"}`}>
                  {copyStatus["curl-command"]}
                </div>
              )}
            </div>
          </div>

          <div className="ihub-col-lg-6 ihub-mb-4">
            <h3>SQL Query</h3>
            <div className="ihub-position-relative">
              <CodeDisplay
                code={sqlQuery}
                language="sql"
                fileName="user-stats.sql"
                showCopyButton={false}
                maxHeight="200px"
              />
              <div className="ihub-position-absolute" style={{ top: "12px", right: "12px" }}>
                <CopyToClipboard
                  content={sqlQuery}
                  onCopySuccess={() => handleCopySuccess("sql-query", "SQL query copied!")}
                  onCopyError={(error) => handleCopyError("sql-query", error)}
                  variant="button"
                  size="small"
                >
                  Copy SQL
                </CopyToClipboard>
              </div>
              {copyStatus["sql-query"] && (
                <div className={`ihub-mt-2 ${copyStatus["sql-query"].includes("Error") ? "ihub-text-danger" : "ihub-text-success"}`}>
                  {copyStatus["sql-query"]}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* JSON and Configuration */}
      <section className="ihub-mb-5">
        <h2>JSON and Configuration Copy</h2>
        
        <div className="ihub-row">
          <div className="ihub-col-lg-6 ihub-mb-4">
            <h3>Package.json</h3>
            <div className="ihub-position-relative">
              <CodeDisplay
                code={packageJson}
                language="json"
                fileName="package.json"
                showCopyButton={false}
                maxHeight="250px"
              />
              <div className="ihub-position-absolute" style={{ top: "12px", right: "12px" }}>
                <CopyToClipboard
                  content={packageJson}
                  onCopySuccess={() => handleCopySuccess("package-json", "Package.json copied!")}
                  onCopyError={(error) => handleCopyError("package-json", error)}
                  variant="icon"
                  size="small"
                />
              </div>
              {copyStatus["package-json"] && (
                <div className={`ihub-mt-2 ${copyStatus["package-json"].includes("Error") ? "ihub-text-danger" : "ihub-text-success"}`}>
                  {copyStatus["package-json"]}
                </div>
              )}
            </div>
          </div>

          <div className="ihub-col-lg-6 ihub-mb-4">
            <h3>Environment Variables</h3>
            <div className="ihub-position-relative">
              <CodeDisplay
                code={environmentVars}
                language="bash"
                fileName=".env"
                showCopyButton={false}
                maxHeight="250px"
              />
              <div className="ihub-position-absolute" style={{ top: "12px", right: "12px" }}>
                <CopyToClipboard
                  content={environmentVars}
                  onCopySuccess={() => handleCopySuccess("env-vars", "Environment variables copied!")}
                  onCopyError={(error) => handleCopyError("env-vars", error)}
                  variant="icon"
                  size="small"
                />
              </div>
              {copyStatus["env-vars"] && (
                <div className={`ihub-mt-2 ${copyStatus["env-vars"].includes("Error") ? "ihub-text-danger" : "ihub-text-success"}`}>
                  {copyStatus["env-vars"]}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="ihub-mb-4">
          <h3>Custom JSON Data</h3>
          <div className="ihub-form-group">
            <InputTextarea
              label="JSON Data"
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
              rows={6}
              placeholder="Enter JSON data..."
            />
          </div>
          
          <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "12px" }}>
            <CopyToClipboard
              content={jsonData}
              onCopySuccess={() => handleCopySuccess("custom-json", "JSON data copied!")}
              onCopyError={(error) => handleCopyError("custom-json", error)}
              variant="button"
              size="medium"
            >
              Copy JSON
            </CopyToClipboard>
            
            <CopyToClipboard
              content={JSON.stringify(JSON.parse(jsonData), null, 2)}
              onCopySuccess={() => handleCopySuccess("formatted-json", "Formatted JSON copied!")}
              onCopyError={(error) => handleCopyError("formatted-json", error)}
              variant="button"
              size="medium"
            >
              Copy Formatted
            </CopyToClipboard>
            
            {(copyStatus["custom-json"] || copyStatus["formatted-json"]) && (
              <span className={`ihub-copy-feedback ${(copyStatus["custom-json"] || copyStatus["formatted-json"]).includes("Error") ? "ihub-text-danger" : "ihub-text-success"}`}>
                {copyStatus["custom-json"] || copyStatus["formatted-json"]}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* URL and Link Copy */}
      <section className="ihub-mb-5">
        <h2>URLs and Links</h2>
        
        <div className="ihub-row">
          <div className="ihub-col-lg-4 ihub-mb-4">
            <div className="ihub-p-3" style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
              <h4>Share This Page</h4>
              <p className="ihub-small ihub-text-muted">Copy the current page URL</p>
              <CopyToClipboard
                content={window.location.href}
                onCopySuccess={() => handleCopySuccess("page-url", "Page URL copied!")}
                onCopyError={(error) => handleCopyError("page-url", error)}
                variant="button"
                size="small"
                successMessage="URL copied to clipboard!"
              >
                📋 Copy URL
              </CopyToClipboard>
              {copyStatus["page-url"] && (
                <div className={`ihub-mt-2 ihub-small ${copyStatus["page-url"].includes("Error") ? "ihub-text-danger" : "ihub-text-success"}`}>
                  {copyStatus["page-url"]}
                </div>
              )}
            </div>
          </div>

          <div className="ihub-col-lg-4 ihub-mb-4">
            <div className="ihub-p-3" style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
              <h4>API Endpoint</h4>
              <p className="ihub-small ihub-text-muted">Copy API endpoint URL</p>
              <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "8px" }}>
                <code className="ihub-flex-1">https://api.instincthub.com/v1/components</code>
                <CopyToClipboard
                  content="https://api.instincthub.com/v1/components"
                  onCopySuccess={() => handleCopySuccess("api-endpoint", "API endpoint copied!")}
                  onCopyError={(error) => handleCopyError("api-endpoint", error)}
                  variant="icon"
                  size="small"
                />
              </div>
              {copyStatus["api-endpoint"] && (
                <div className={`ihub-mt-2 ihub-small ${copyStatus["api-endpoint"].includes("Error") ? "ihub-text-danger" : "ihub-text-success"}`}>
                  {copyStatus["api-endpoint"]}
                </div>
              )}
            </div>
          </div>

          <div className="ihub-col-lg-4 ihub-mb-4">
            <div className="ihub-p-3" style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
              <h4>Git Repository</h4>
              <p className="ihub-small ihub-text-muted">Clone command</p>
              <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "8px" }}>
                <code className="ihub-flex-1 ihub-small">git clone https://github.com/instincthub/react-ui.git</code>
                <CopyToClipboard
                  content="git clone https://github.com/instincthub/react-ui.git"
                  onCopySuccess={() => handleCopySuccess("git-clone", "Git clone command copied!")}
                  onCopyError={(error) => handleCopyError("git-clone", error)}
                  variant="icon"
                  size="small"
                />
              </div>
              {copyStatus["git-clone"] && (
                <div className={`ihub-mt-2 ihub-small ${copyStatus["git-clone"].includes("Error") ? "ihub-text-danger" : "ihub-text-success"}`}>
                  {copyStatus["git-clone"]}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Custom Styling Examples */}
      <section className="ihub-mb-5">
        <h2>Custom Styling and Variants</h2>
        
        <div className="ihub-row">
          <div className="ihub-col-lg-4 ihub-mb-4">
            <h3>Button Variants</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <CopyToClipboard
                content="Primary button copy"
                onCopySuccess={() => handleCopySuccess("primary-btn")}
                onCopyError={(error) => handleCopyError("primary-btn", error)}
                variant="button"
                size="medium"
                className="ihub-primary-btn"
              >
                Primary Copy
              </CopyToClipboard>

              <CopyToClipboard
                content="Secondary button copy"
                onCopySuccess={() => handleCopySuccess("secondary-btn")}
                onCopyError={(error) => handleCopyError("secondary-btn", error)}
                variant="button"
                size="medium"
                className="ihub-outlined-btn"
              >
                Secondary Copy
              </CopyToClipboard>

              <CopyToClipboard
                content="Danger button copy"
                onCopySuccess={() => handleCopySuccess("danger-btn")}
                onCopyError={(error) => handleCopyError("danger-btn", error)}
                variant="button"
                size="medium"
                className="ihub-danger-btn"
              >
                Danger Copy
              </CopyToClipboard>
            </div>
          </div>

          <div className="ihub-col-lg-4 ihub-mb-4">
            <h3>Size Variants</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
              <CopyToClipboard
                content="Small copy button"
                onCopySuccess={() => handleCopySuccess("small-btn")}
                onCopyError={(error) => handleCopyError("small-btn", error)}
                variant="button"
                size="small"
              >
                Small Copy
              </CopyToClipboard>

              <CopyToClipboard
                content="Medium copy button"
                onCopySuccess={() => handleCopySuccess("medium-btn")}
                onCopyError={(error) => handleCopyError("medium-btn", error)}
                variant="button"
                size="medium"
              >
                Medium Copy
              </CopyToClipboard>

              <CopyToClipboard
                content="Large copy button"
                onCopySuccess={() => handleCopySuccess("large-btn")}
                onCopyError={(error) => handleCopyError("large-btn", error)}
                variant="button"
                size="large"
              >
                Large Copy
              </CopyToClipboard>
            </div>
          </div>

          <div className="ihub-col-lg-4 ihub-mb-4">
            <h3>Custom Icons</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <CopyToClipboard
                content="Copy with custom icon"
                onCopySuccess={() => handleCopySuccess("custom-icon1")}
                onCopyError={(error) => handleCopyError("custom-icon1", error)}
                variant="icon"
                size="medium"
                copyIcon={<span style={{ fontSize: "18px" }}>📄</span>}
                successIcon={<span style={{ fontSize: "18px" }}>✅</span>}
                errorIcon={<span style={{ fontSize: "18px" }}>❌</span>}
              />

              <CopyToClipboard
                content="Copy with emoji icons"
                onCopySuccess={() => handleCopyStatus("custom-icon2")}
                onCopyError={(error) => handleCopyError("custom-icon2", error)}
                variant="button"
                size="small"
                copyIcon={<span>📋</span>}
                successIcon={<span>🎉</span>}
                errorIcon={<span>⚠️</span>}
              >
                🎨 Emoji Copy
              </CopyToClipboard>

              <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "8px" }}>
                <span>Quick copy:</span>
                <CopyToClipboard
                  content="Quick copy text"
                  onCopySuccess={() => handleCopySuccess("quick-copy")}
                  onCopyError={(error) => handleCopyError("quick-copy", error)}
                  variant="text"
                  size="small"
                  className="ihub-text-primary"
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  Copy this text
                </CopyToClipboard>
              </div>
            </div>
          </div>
        </div>

        {/* Status display for custom examples */}
        {Object.entries(copyStatus).filter(([key]) => 
          ["primary-btn", "secondary-btn", "danger-btn", "small-btn", "medium-btn", "large-btn", 
           "custom-icon1", "custom-icon2", "quick-copy"].includes(key)
        ).map(([key, status]) => (
          <div key={key} className={`ihub-mt-2 ${status.includes("Error") ? "ihub-text-danger" : "ihub-text-success"}`}>
            {status}
          </div>
        ))}
      </section>

      {/* Advanced Features */}
      <section className="ihub-mb-5">
        <h2>Advanced Features</h2>
        
        <div className="ihub-mb-4">
          <button 
            className="ihub-primary-btn"
            onClick={() => setIsAdvancedOpen(true)}
          >
            Open Advanced Copy Dialog
          </button>
        </div>

        <div className="ihub-row">
          <div className="ihub-col-lg-6 ihub-mb-4">
            <h3>Disabled State</h3>
            <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "12px" }}>
              <CopyToClipboard
                content="This is disabled"
                disabled={true}
                variant="button"
                size="medium"
              >
                Disabled Copy
              </CopyToClipboard>
              <span className="ihub-text-muted">Cannot be clicked</span>
            </div>
          </div>

          <div className="ihub-col-lg-6 ihub-mb-4">
            <h3>Long Content</h3>
            <CopyToClipboard
              content={`This is a very long text content that demonstrates how the copy to clipboard component handles large amounts of text. It includes multiple sentences and should test the performance and reliability of the clipboard functionality. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}
              onCopySuccess={() => handleCopySuccess("long-content", "Long content copied successfully!")}
              onCopyError={(error) => handleCopyError("long-content", error)}
              variant="button"
              size="medium"
              successMessage="Long text copied!"
            >
              Copy Long Text
            </CopyToClipboard>
            {copyStatus["long-content"] && (
              <div className={`ihub-mt-2 ${copyStatus["long-content"].includes("Error") ? "ihub-text-danger" : "ihub-text-success"}`}>
                {copyStatus["long-content"]}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Advanced Copy Dialog */}
      <Dialog
        isOpen={isAdvancedOpen}
        onClose={() => setIsAdvancedOpen(false)}
        title="Advanced Copy Features"
        maxWidth="800px"
        footer={
          <div className="ihub-buttons">
            <button 
              className="ihub-outlined-btn"
              onClick={() => setIsAdvancedOpen(false)}
            >
              Close
            </button>
          </div>
        }
      >
        <div className="ihub-mb-4">
          <h3>Multiple Content Types</h3>
          <p>Copy different types of content with appropriate formatting:</p>
          
          <div className="ihub-row">
            <div className="ihub-col-md-6 ihub-mb-3">
              <h4>API Response</h4>
              <div className="ihub-p-3" style={{ backgroundColor: "#f8f9fa", borderRadius: "4px", fontSize: "14px" }}>
                <code>{`{"status": "success", "data": {...}}`}</code>
                <div className="ihub-mt-2">
                  <CopyToClipboard
                    content={`{
  "status": "success",
  "data": {
    "users": [
      {"id": 1, "name": "John", "active": true},
      {"id": 2, "name": "Jane", "active": false}
    ]
  },
  "timestamp": "${new Date().toISOString()}"
}`}
                    onCopySuccess={() => handleCopySuccess("api-response", "API response copied!")}
                    onCopyError={(error) => handleCopyError("api-response", error)}
                    variant="button"
                    size="small"
                  >
                    Copy API Response
                  </CopyToClipboard>
                </div>
              </div>
            </div>

            <div className="ihub-col-md-6 ihub-mb-3">
              <h4>Email Template</h4>
              <div className="ihub-p-3" style={{ backgroundColor: "#f8f9fa", borderRadius: "4px", fontSize: "14px" }}>
                <code>Subject: Welcome to our platform...</code>
                <div className="ihub-mt-2">
                  <CopyToClipboard
                    content={`Subject: Welcome to InstinctHub React UI

Hi there,

Thank you for choosing our React component library! Here are some quick links to get you started:

- Documentation: https://docs.instincthub.com
- Examples: https://examples.instincthub.com
- Support: support@instincthub.com

Best regards,
The InstinctHub Team`}
                    onCopySuccess={() => handleCopySuccess("email-template", "Email template copied!")}
                    onCopyError={(error) => handleCopyError("email-template", error)}
                    variant="button"
                    size="small"
                  >
                    Copy Email
                  </CopyToClipboard>
                </div>
              </div>
            </div>
          </div>

          {/* Status display for dialog examples */}
          {(copyStatus["api-response"] || copyStatus["email-template"]) && (
            <div className={`ihub-mt-3 ihub-p-3 ${(copyStatus["api-response"] || copyStatus["email-template"]).includes("Error") ? "ihub-bg-danger-light" : "ihub-bg-success-light"}`} style={{ borderRadius: "4px" }}>
              <strong>Copy Status:</strong> {copyStatus["api-response"] || copyStatus["email-template"]}
            </div>
          )}
        </div>

        <div className="ihub-mb-4">
          <h3>Error Handling Demo</h3>
          <p>Test error handling with invalid clipboard operations:</p>
          
          <CopyToClipboard
            content=""
            onCopySuccess={() => handleCopySuccess("error-demo", "Unexpected success!")}
            onCopyError={(error) => handleCopyError("error-demo", error)}
            variant="button"
            size="medium"
            errorMessage="Failed to copy empty content"
          >
            Copy Empty Content
          </CopyToClipboard>
          
          {copyStatus["error-demo"] && (
            <div className={`ihub-mt-2 ${copyStatus["error-demo"].includes("Error") ? "ihub-text-danger" : "ihub-text-success"}`}>
              {copyStatus["error-demo"]}
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default CopyToClipboardExamples;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { CopyToClipboard } from '@instincthub/react-ui';
```

## 🚀 Basic Usage

```tsx
import React, { useState } from 'react';
import { CopyToClipboard } from '@instincthub/react-ui';

function MyComponent() {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <CopyToClipboard
        content="Hello, World!"
        onCopySuccess={handleCopy}
        onCopyError={(error) => console.error('Copy failed:', error)}
      >
        <button>Copy Text</button>
      </CopyToClipboard>
      
      {copied && <span>Copied!</span>}
    </div>
  );
}
```

## 🎨 Supported Content Types

- **Plain Text** - Simple text strings
- **JSON Data** - Formatted JSON objects
- **Code Snippets** - Programming code with proper formatting
- **URLs** - Web addresses and API endpoints
- **Commands** - Shell commands and scripts
- **Configuration** - Environment variables and config files
- **Markdown** - Markdown formatted content
- **CSV Data** - Comma-separated values

## 🌟 Key Features

### Visual Feedback
- **Success Messages** - Customizable success notifications
- **Error Handling** - Graceful error messages and fallbacks
- **Animation Support** - Smooth transitions and visual cues
- **Custom Icons** - Configurable copy, success, and error icons

### Accessibility
- **Keyboard Support** - Full keyboard navigation
- **Screen Reader** - Compatible with assistive technology
- **ARIA Labels** - Proper semantic labeling
- **Focus Management** - Clear focus indicators

### Browser Support
- **Modern Clipboard API** - Uses secure clipboard API when available
- **Fallback Support** - Graceful degradation for older browsers
- **Security** - Respects browser security policies
- **Error Recovery** - Handles permission and API failures

## ♿ Accessibility Features

- **Keyboard Navigation** - Accessible via keyboard
- **Screen Reader Support** - Proper ARIA attributes
- **Focus Indicators** - Clear visual focus states
- **Semantic HTML** - Uses appropriate HTML elements
- **Status Announcements** - Screen reader feedback on copy actions

## 🎯 Use Cases

- **Code Documentation** - Copy code examples and snippets
- **API Documentation** - Copy API endpoints and responses
- **Configuration Files** - Copy config and environment variables
- **Share URLs** - Copy page URLs and deep links
- **Command Line** - Copy terminal commands and scripts
- **Data Export** - Copy JSON data and CSV content

## 🔗 Related Components

- [CodeDisplay](./CodeDisplay.md) - Code display with built-in copy functionality
- [ContentViewer](./ContentViewer.md) - Content viewer with copy options
- [InputText](./InputText.md) - Text input with copy capabilities
- [Dialog](./Dialog.md) - Modal dialogs for copy interfaces
- [Tooltip](./Tooltip.md) - Tooltip component for copy feedback