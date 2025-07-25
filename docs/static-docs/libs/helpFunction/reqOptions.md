# reqOptions

**Category:** Library | **Type:** API utility

Generate standardized request options for fetch API calls with proper headers, authentication, and content types.

**File Location:** `src/components/lib/helpFunction.ts`

## 🏷️ Tags

`api`, `fetch`, `request`, `http`, `headers`, `utility`

## 📖 Usage Example

```tsx
"use client";

import React, { useState } from "react";
import { reqOptions } from "@instincthub/react-ui/lib";

/**
 * Example demonstrating reqOptions function
 */
const RequestOptionsExample = () => {
  const [method, setMethod] = useState<string>("GET");
  const [contentType, setContentType] = useState<string>("json");
  const [token, setToken] = useState<string>("your-auth-token");
  const [hasData, setHasData] = useState<boolean>(false);

  const generateOptions = () => {
    const data = hasData ? 
      (contentType === "json" ? JSON.stringify({ name: "John", email: "john@example.com" }) : 
       new FormData()) : null;
    
    return reqOptions(method, data, token, contentType);
  };

  const options = generateOptions();

  return (
    <div className="ihub-container ihub-py-5">
      <h1>Request Options Generator</h1>

      <section className="ihub-mb-5">
        <div className="ihub-card ihub-p-4">
          <h3>Configure Request</h3>
          <div className="ihub-row ihub-mb-3">
            <div className="ihub-col-md-3">
              <label className="ihub-form-label">HTTP Method:</label>
              <select 
                className="ihub-form-control"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="PATCH">PATCH</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
            <div className="ihub-col-md-3">
              <label className="ihub-form-label">Content Type:</label>
              <select 
                className="ihub-form-control"
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
              >
                <option value="json">JSON</option>
                <option value="form-data">Form Data</option>
                <option value="text">Text</option>
              </select>
            </div>
            <div className="ihub-col-md-3">
              <label className="ihub-form-label">Include Data:</label>
              <div className="ihub-form-check ihub-mt-2">
                <input 
                  type="checkbox"
                  className="ihub-form-check-input"
                  checked={hasData}
                  onChange={(e) => setHasData(e.target.checked)}
                />
                <label className="ihub-form-check-label">
                  Include request body
                </label>
              </div>
            </div>
            <div className="ihub-col-md-3">
              <label className="ihub-form-label">Auth Token:</label>
              <input 
                type="text"
                className="ihub-form-control"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Bearer token"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Generated Options */}
      <section className="ihub-mb-5">
        <div className="ihub-card ihub-p-4">
          <h3>Generated Request Options</h3>
          <pre className="ihub-bg-light ihub-p-3 ihub-rounded">
            {JSON.stringify(options, null, 2)}
          </pre>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="ihub-mb-5">
        <h2>Common Usage Examples</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h5>GET Request</h5>
              <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "12px" }}>
{`// Simple GET request
const options = reqOptions("GET", null, token);

fetch("/api/users", options)
  .then(response => response.json())
  .then(data => console.log(data));`}
              </pre>
            </div>
          </div>
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h5>POST with JSON</h5>
              <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "12px" }}>
{`// POST with JSON data
const data = JSON.stringify({
  name: "John Doe",
  email: "john@example.com"
});
const options = reqOptions("POST", data, token, "json");

fetch("/api/users", options);`}
              </pre>
            </div>
          </div>
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h5>Form Data Upload</h5>
              <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "12px" }}>
{`// File upload with FormData
const formData = new FormData();
formData.append("file", fileInput.files[0]);
formData.append("title", "My Document");

const options = reqOptions("POST", formData, token, "form-data");
fetch("/api/upload", options);`}
              </pre>
            </div>
          </div>
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h5>PUT Update</h5>
              <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "12px" }}>
{`// Update existing resource
const updateData = JSON.stringify({
  id: 123,
  status: "active"
});
const options = reqOptions("PUT", updateData, token, "json");

fetch("/api/users/123", options);`}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RequestOptionsExample;
```

## 🚀 Basic Usage

```tsx
import { reqOptions } from '@instincthub/react-ui/lib';

// GET request (no body)
const getOptions = reqOptions("GET", null, token);

// POST with JSON data
const jsonData = JSON.stringify({ name: "John", email: "john@example.com" });
const postOptions = reqOptions("POST", jsonData, token, "json");

// File upload with FormData
const formData = new FormData();
formData.append("file", file);
const uploadOptions = reqOptions("POST", formData, token, "form-data");

// Use with fetch
fetch("/api/endpoint", getOptions)
  .then(response => response.json())
  .then(data => console.log(data));
```

## 🔧 Function Signature

```typescript
function reqOptions(
  method: string,
  data?: any,
  token?: string | null,
  contentType?: string,
  channel?: string | null,
  authSk?: boolean
): RequestInit
```

### Parameters

- **method** (string): HTTP method (GET, POST, PUT, PATCH, DELETE)
- **data** (any, optional): Request body data
- **token** (string | null, optional): Authentication token
- **contentType** (string, optional): Content type ("json", "form-data", "text")
- **channel** (string | null, optional): Custom channel header
- **authSk** (boolean, optional): Special auth flag

### Returns

- **RequestInit**: Configured options object for fetch API

## 💡 Use Cases

- **API Calls**: Standardize all API requests in your application
- **Authentication**: Automatically include auth tokens in requests
- **File Uploads**: Handle FormData uploads with proper headers
- **CRUD Operations**: Create, read, update, delete operations
- **Content Types**: Handle different data formats (JSON, form data, text)
- **Error Handling**: Consistent request configuration for error handling
- **Middleware**: Base configuration for API middleware

## 📋 Content Type Handling

The function automatically sets appropriate headers based on content type:

### JSON (`"json"`)
```tsx
headers: {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`
}
```

### Form Data (`"form-data"`)
```tsx
// Headers set automatically by browser
// Content-Type: multipart/form-data; boundary=...
headers: {
  "Authorization": `Bearer ${token}`
}
```

### Text (`"text"`)
```tsx
headers: {
  "Content-Type": "text/plain",
  "Authorization": `Bearer ${token}`
}
```

## ⚠️ Important Notes

- Automatically handles `Content-Type` headers based on data type
- FormData uploads should not manually set `Content-Type` (browser handles boundary)
- Authorization header is only added if token is provided
- Method is automatically converted to uppercase
- Compatible with fetch API and most HTTP clients

## 🔗 Related Functions

- [fetchAPI](./fetchAPI.md) - Complete fetch wrapper with error handling