# NotFound

**Category:** Status | **Type:** component

404 error page component with customizable message and navigation options

## 📁 File Location

`src/components/status/NotFound.tsx`

## 🏷️ Tags

`status`, `404`, `error`, `navigation`

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { NotFound } from '@instincthub/react-ui';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { NotFound } from '@instincthub/react-ui';

function MyComponent() {
  return (
    <NotFound />
  );
}
```

## 🔧 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | `"Page not found"` | Custom message to display |
| `linkText` | `string` | `"Go back"` | Text for the primary action link |
| `linkHref` | `string` | `"/"` | URL for the primary action link |
| `showHomeLink` | `boolean` | `true` | Whether to show a link back to home page |

## 📋 Comprehensive Examples

```tsx
"use client";
import React from "react";
import { NotFound } from "@instincthub/react-ui";

/**
 * Example component demonstrating various ways to use the NotFound component
 */
const NotFoundExamples = () => {
  return (
    <div className="ihub-container ihub-mt-5">
      <h1>NotFound Component Examples</h1>
      
      <div className="ihub-py-5">
        <h2>1. Basic 404 Page</h2>
        <p>Default configuration with standard 404 message and home link.</p>
        <div style={{ border: "1px solid #ddd", padding: "20px", margin: "20px 0" }}>
          <NotFound />
        </div>
      </div>

      <div className="ihub-py-5">
        <h2>2. Custom Message - Page Not Found</h2>
        <p>Custom message for specific page not found scenarios.</p>
        <div style={{ border: "1px solid #ddd", padding: "20px", margin: "20px 0" }}>
          <NotFound 
            message="The requested page could not be found"
            linkText="Return to Dashboard"
            linkHref="/dashboard"
          />
        </div>
      </div>

      <div className="ihub-py-5">
        <h2>3. Resource Not Found</h2>
        <p>When a specific resource (like a blog post or product) doesn't exist.</p>
        <div style={{ border: "1px solid #ddd", padding: "20px", margin: "20px 0" }}>
          <NotFound 
            message="Article not found"
            linkText="Browse Articles"
            linkHref="/blog"
            showHomeLink={true}
          />
        </div>
      </div>

      <div className="ihub-py-5">
        <h2>4. Access Denied / Unauthorized</h2>
        <p>For restricted or unauthorized access scenarios.</p>
        <div style={{ border: "1px solid #ddd", padding: "20px", margin: "20px 0" }}>
          <NotFound 
            message="Access denied - You don't have permission to view this page"
            linkText="Go to Login"
            linkHref="/login"
            showHomeLink={false}
          />
        </div>
      </div>

      <div className="ihub-py-5">
        <h2>5. User Profile Not Found</h2>
        <p>When a user profile or account doesn't exist.</p>
        <div style={{ border: "1px solid #ddd", padding: "20px", margin: "20px 0" }}>
          <NotFound 
            message="User profile not found"
            linkText="Search Users"
            linkHref="/users"
          />
        </div>
      </div>

      <div className="ihub-py-5">
        <h2>6. Product Not Available</h2>
        <p>For e-commerce scenarios when a product is not available.</p>
        <div style={{ border: "1px solid #ddd", padding: "20px", margin: "20px 0" }}>
          <NotFound 
            message="Product not available"
            linkText="Browse Products"
            linkHref="/products"
            showHomeLink={true}
          />
        </div>
      </div>

      <div className="ihub-py-5">
        <h2>7. Course Not Found</h2>
        <p>Educational platform scenario when a course doesn't exist.</p>
        <div style={{ border: "1px solid #ddd", padding: "20px", margin: "20px 0" }}>
          <NotFound 
            message="Course not found or no longer available"
            linkText="View All Courses"
            linkHref="/courses"
          />
        </div>
      </div>

      <div className="ihub-py-5">
        <h2>8. Search Results Not Found</h2>
        <p>When search results return no matches.</p>
        <div style={{ border: "1px solid #ddd", padding: "20px", margin: "20px 0" }}>
          <NotFound 
            message="No search results found"
            linkText="Try New Search"
            linkHref="/search"
            showHomeLink={false}
          />
        </div>
      </div>

      <div className="ihub-py-5">
        <h2>9. Minimal Layout (No Home Link)</h2>
        <p>Simple layout without home link for specific flows.</p>
        <div style={{ border: "1px solid #ddd", padding: "20px", margin: "20px 0" }}>
          <NotFound 
            message="Feature not available"
            linkText="Go Back"
            linkHref="javascript:history.back()"
            showHomeLink={false}
          />
        </div>
      </div>

      <div className="ihub-py-5">
        <h2>10. API Endpoint Not Found</h2>
        <p>For API documentation or developer-focused scenarios.</p>
        <div style={{ border: "1px solid #ddd", padding: "20px", margin: "20px 0" }}>
          <NotFound 
            message="API endpoint not found"
            linkText="View Documentation"
            linkHref="/docs/api"
          />
        </div>
      </div>

      <div className="ihub-py-5">
        <h2>11. Event Not Found</h2>
        <p>For event management platforms when an event doesn't exist.</p>
        <div style={{ border: "1px solid #ddd", padding: "20px", margin: "20px 0" }}>
          <NotFound 
            message="Event not found or has ended"
            linkText="Browse Events"
            linkHref="/events"
          />
        </div>
      </div>

      <div className="ihub-py-5">
        <h2>12. File Not Found</h2>
        <p>For file management systems when a file doesn't exist.</p>
        <div style={{ border: "1px solid #ddd", padding: "20px", margin: "20px 0" }}>
          <NotFound 
            message="File not found or has been deleted"
            linkText="Browse Files"
            linkHref="/files"
            showHomeLink={false}
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundExamples;
```

## 🎨 Use Cases

### 1. **Standard 404 Pages**
Use the default configuration for general page not found scenarios:
```tsx
<NotFound />
```

### 2. **Resource-Specific Not Found**
Customize for specific resources like articles, products, or users:
```tsx
<NotFound 
  message="Product not available"
  linkText="Browse Products"
  linkHref="/products"
/>
```

### 3. **Access Control**
Handle unauthorized access with appropriate messaging:
```tsx
<NotFound 
  message="Access denied - Please log in to continue"
  linkText="Login"
  linkHref="/login"
  showHomeLink={false}
/>
```

### 4. **Search No Results**
Display when search queries return no results:
```tsx
<NotFound 
  message="No results found for your search"
  linkText="Try New Search"
  linkHref="/search"
/>
```

### 5. **Maintenance Mode**
Show when features are temporarily unavailable:
```tsx
<NotFound 
  message="This feature is temporarily unavailable"
  linkText="Check Status"
  linkHref="/status"
/>
```

## 🎯 Best Practices

1. **Clear Messaging**: Use descriptive messages that explain what went wrong
2. **Helpful Navigation**: Provide relevant links to help users continue their journey
3. **Context Awareness**: Customize the component based on the specific scenario
4. **User Experience**: Always offer a way forward, even when content is missing
5. **Consistent Styling**: The component uses InstinctHub design system classes for consistency

## 💡 Implementation Tips

### Next.js Integration
```tsx
// pages/404.tsx or app/not-found.tsx
import { NotFound } from '@instincthub/react-ui';

export default function Custom404() {
  return (
    <NotFound 
      message="This page could not be found"
      linkText="Return Home"
      linkHref="/"
    />
  );
}
```

### React Router Integration
```tsx
import { Routes, Route } from 'react-router-dom';
import { NotFound } from '@instincthub/react-ui';

function App() {
  return (
    <Routes>
      {/* Your other routes */}
      <Route path="*" element={
        <NotFound 
          linkText="Go to Dashboard"
          linkHref="/dashboard"
        />
      } />
    </Routes>
  );
}
```

### Conditional Rendering
```tsx
function ProductPage({ product }) {
  if (!product) {
    return (
      <NotFound 
        message="Product not found"
        linkText="Browse Products"
        linkHref="/products"
      />
    );
  }
  
  return <ProductDetails product={product} />;
}
```

## 🔗 Related Components

- [TimeTracker](./TimeTracker.md) - Time tracking component
- [SessionHandleProvider](./SessionHandleProvider.md) - Session handling provider component
- [Error500](./Error500.md) - 500 error display component
- [ErrorState](./ErrorState.md) - Error state display component
- [ReactTimeTracker](./ReactTimeTracker.md) - React time tracking component

