# ContentViewOrEdit

**Category:** UI | **Type:** component

A dual-mode content component that seamlessly switches between viewing and editing modes, perfect for content management systems, documentation, articles, and rich text editing scenarios.

## 🏷️ Tags

`ui`, `content`, `editor`, `viewer`, `rich-text`

```tsx
"use client";
import React, { useState } from "react";
import { ContentViewOrEdit, ContentViewer } from "@instincthub/react-ui";

/**
 * Comprehensive examples demonstrating various ways to use ContentViewOrEdit
 */
const ContentViewOrEditExamples = () => {
  // Article content state
  const [articleContent, setArticleContent] = useState<string>(
    "<h1>The Future of Web Development</h1><p>Web development continues to evolve at a rapid pace, with new frameworks and technologies emerging regularly.</p><h2>Key Trends</h2><ul><li><strong>Component-based Architecture:</strong> Building reusable UI components</li><li><strong>Performance Optimization:</strong> Focus on Core Web Vitals</li><li><strong>Developer Experience:</strong> Better tooling and workflows</li></ul><blockquote>The best way to predict the future is to create it.</blockquote><p>As we look ahead, the emphasis on user experience and performance will only grow stronger.</p>"
  );

  // Documentation content state
  const [documentationContent, setDocumentationContent] = useState<string>(
    "<h2>API Documentation</h2><p>This endpoint allows you to retrieve user information from the database.</p><h3>Request Format</h3><pre><code>GET /api/users/:id\nContent-Type: application/json\nAuthorization: Bearer {token}</code></pre><h3>Response Format</h3><pre><code>{\n  \"id\": \"123\",\n  \"name\": \"John Doe\",\n  \"email\": \"john@example.com\",\n  \"created_at\": \"2024-01-01T00:00:00Z\"\n}</code></pre><h3>Error Codes</h3><ul><li><code>404</code> - User not found</li><li><code>401</code> - Unauthorized access</li><li><code>500</code> - Internal server error</li></ul>"
  );

  // Comment content state
  const [commentContent, setCommentContent] = useState<string>(
    "<p>This is a great article! I particularly enjoyed the section about component-based architecture. It's interesting to see how the industry is moving towards more modular approaches.</p><p>One question though - how do you think this will affect the learning curve for new developers?</p>"
  );

  // Course content state
  const [courseContent, setCourseContent] = useState<string>(
    "<h2>Chapter 1: Introduction to React</h2><p>React is a popular JavaScript library for building user interfaces, particularly web applications.</p><h3>Learning Objectives</h3><ul data-type=\"taskList\"><li data-checked=\"false\">Understand what React is and why it's useful</li><li data-checked=\"false\">Learn about components and JSX</li><li data-checked=\"false\">Practice creating your first React component</li><li data-checked=\"true\">Set up a development environment</li></ul><h3>Key Concepts</h3><ol><li><strong>Components:</strong> Reusable pieces of UI</li><li><strong>Props:</strong> Data passed to components</li><li><strong>State:</strong> Data that changes over time</li></ol><p><em>Note:</em> Make sure to complete all tasks before moving to the next chapter.</p>"
  );

  // Knowledge base content state
  const [knowledgeBaseContent, setKnowledgeBaseContent] = useState<string>(
    "# Troubleshooting Guide\n\n## Common Issues\n\n### Issue 1: Application Won't Start\n\n**Symptoms:**\n- Server fails to initialize\n- Port already in use error\n- Dependencies not found\n\n**Solutions:**\n1. Check if another process is using the port\n2. Run `npm install` to ensure dependencies are installed\n3. Verify your `.env` file configuration\n\n### Issue 2: Database Connection Failed\n\n**Symptoms:**\n- Connection timeout errors\n- Authentication failures\n- Network unreachable\n\n**Solutions:**\n1. Verify database credentials\n2. Check network connectivity\n3. Ensure database server is running\n\n> **Tip:** Always check the logs first for detailed error information.\n\n### Quick Commands\n\n```bash\n# Check running processes\nps aux | grep node\n\n# Kill process by port\nlsof -ti:3000 | xargs kill\n\n# Restart services\nnpm run dev\n```"
  );

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>ContentViewOrEdit Examples</h1>

      {/* Basic Article Editor */}
      <section className="ihub-mb-5">
        <h2>1. Article Editor</h2>
        <p>Perfect for blog posts, news articles, and editorial content.</p>
        
        <ContentViewOrEdit
          setContent={setArticleContent}
          content={articleContent}
          title="Article: The Future of Web Development"
          showToolbar={true}
          placeholder="Start writing your article..."
          charLimit={5000}
          lastUpdated="2024-01-15 14:30:00"
          showEditBtn={true}
          showPreviewBtn={true}
        />
      </section>

      {/* Documentation Editor */}
      <section className="ihub-mb-5">
        <h2>2. Documentation Editor</h2>
        <p>Ideal for API docs, technical guides, and reference materials.</p>
        
        <ContentViewOrEdit
          setContent={setDocumentationContent}
          content={documentationContent}
          title="API Documentation - User Endpoints"
          showToolbar={true}
          placeholder="Document your API endpoints, parameters, and examples..."
          charLimit={10000}
          lastUpdated="2024-01-10 09:15:00"
          showEditBtn={true}
          showPreviewBtn={true}
        />
      </section>

      {/* Comment Editor */}
      <section className="ihub-mb-5">
        <h2>3. Comment System</h2>
        <p>Great for user comments, reviews, and feedback forms.</p>
        
        <ContentViewOrEdit
          setContent={setCommentContent}
          content={commentContent}
          title="User Comment"
          showToolbar={true}
          placeholder="Share your thoughts and feedback..."
          charLimit={1000}
          lastUpdated="2024-01-20 16:45:00"
          showEditBtn={true}
          showPreviewBtn={false}
        />
      </section>

      {/* Course Content Editor */}
      <section className="ihub-mb-5">
        <h2>4. Course Content Editor</h2>
        <p>Perfect for educational content with interactive task lists.</p>
        
        <ContentViewOrEdit
          setContent={setCourseContent}
          content={courseContent}
          title="Course Module: React Fundamentals"
          showToolbar={true}
          placeholder="Create engaging course content with tasks, examples, and exercises..."
          charLimit={15000}
          lastUpdated="2024-01-12 11:20:00"
          showEditBtn={true}
          showPreviewBtn={true}
        />
      </section>

      {/* Knowledge Base Editor with Markdown */}
      <section className="ihub-mb-5">
        <h2>5. Knowledge Base (Markdown Support)</h2>
        <p>Excellent for wikis, help centers, and technical documentation.</p>
        
        <div className="ihub-mb-3">
          <ContentViewer
            content={knowledgeBaseContent}
            title="Troubleshooting Guide"
            showToolbar={true}
            isMarkdown={true}
          />
        </div>
      </section>

      {/* Minimal Editor */}
      <section className="ihub-mb-5">
        <h2>6. Minimal Editor</h2>
        <p>Streamlined interface for quick content updates.</p>
        
        <ContentViewOrEdit
          setContent={setCommentContent}
          content="<p>Quick note or brief content goes here.</p>"
          title="Quick Note"
          showToolbar={false}
          placeholder="Add a quick note..."
          charLimit={500}
          showEditBtn={false}
          showPreviewBtn={false}
        />
      </section>

      {/* Advanced Configuration */}
      <section className="ihub-mb-5">
        <h2>7. Advanced Configuration</h2>
        <p>Full-featured editor with all options enabled.</p>
        
        <ContentViewOrEdit
          setContent={setArticleContent}
          content={articleContent}
          title="Advanced Content Editor"
          showToolbar={true}
          placeholder="Use all available formatting options..."
          charLimit={25000}
          lastUpdated="2024-01-22 08:30:00"
          showEditBtn={true}
          showPreviewBtn={true}
        />
      </section>

      {/* Read-Only Viewer */}
      <section className="ihub-mb-5">
        <h2>8. Read-Only Content Viewer</h2>
        <p>Display content without editing capabilities.</p>
        
        <ContentViewer
          content={documentationContent}
          title="Read-Only Documentation"
          showToolbar={true}
          showEditBtn={false}
          editable={false}
        />
      </section>
    </div>
  );
};

export default ContentViewOrEditExamples;
```

## 📁 File Location

`src/components/ui/viewer/ContentViewOrEdit.tsx`

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { ContentViewOrEdit, ContentViewer } from '@instincthub/react-ui';
```

## 🚀 Basic Usage

```tsx
import React, { useState } from 'react';
import { ContentViewOrEdit } from '@instincthub/react-ui';

function BasicExample() {
  const [content, setContent] = useState<string>("<p>Initial content</p>");

  return (
    <ContentViewOrEdit
      setContent={setContent}
      content={content}
      title="My Document"
      showToolbar={true}
      placeholder="Start writing..."
      charLimit={5000}
      showEditBtn={true}
      showPreviewBtn={true}
    />
  );
}
```

## ⚙️ Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `setContent` | `(html: string) => void` | - | **Required.** Function to update content |
| `content` | `string` | - | **Required.** Current content to display/edit |
| `title` | `string` | - | **Required.** Title for the content |
| `showToolbar` | `boolean` | - | **Required.** Whether to show the toolbar |
| `placeholder` | `string` | - | **Required.** Placeholder text for empty content |
| `charLimit` | `number` | - | **Required.** Maximum character limit |
| `lastUpdated` | `string` | - | Optional. Last updated timestamp |
| `showEditBtn` | `boolean` | `true` | Whether to show edit button |
| `showPreviewBtn` | `boolean` | `true` | Whether to show preview button |

## 🎯 Use Cases

### 1. **Content Management Systems**
Perfect for CMS interfaces where users need to create and edit articles, pages, or posts with rich formatting.

### 2. **Documentation Platforms**
Ideal for technical documentation, API guides, and knowledge bases with code syntax highlighting.

### 3. **Educational Platforms**
Great for course content creation with interactive task lists and progress tracking.

### 4. **Comment Systems**
Excellent for user-generated content like comments, reviews, and forum posts.

### 5. **Wiki Systems**
Perfect for collaborative content creation with markdown support and version tracking.

## 🎨 Features

- **Dual Mode Operation**: Seamlessly switch between view and edit modes
- **Rich Text Editing**: Full WYSIWYG editor with formatting options
- **Content Validation**: Character limits and content validation
- **Toolbar Actions**: Print, export to PDF, copy to clipboard, fullscreen
- **Markdown Support**: Auto-detection and rendering of markdown content
- **Task Lists**: Interactive checkboxes for to-do items
- **Code Highlighting**: Syntax highlighting for code blocks
- **Image Support**: Inline image insertion and display
- **Table Support**: Create and edit tables within content
- **Link Management**: Easy link insertion with validation
- **Auto-Save**: Automatic content preservation during editing

## 💡 Best Practices

### Content Structure
```tsx
// Structure your content with semantic HTML
const wellStructuredContent = `
  <h1>Main Title</h1>
  <h2>Section Title</h2>
  <p>Paragraph content with <strong>emphasis</strong> and <em>italics</em>.</p>
  <ul>
    <li>List item 1</li>
    <li>List item 2</li>
  </ul>
`;
```

### Character Limits
```tsx
// Set appropriate limits based on content type
<ContentViewOrEdit
  charLimit={1000}  // Comments
  charLimit={5000}  // Articles
  charLimit={15000} // Documentation
  charLimit={25000} // Long-form content
/>
```

### State Management
```tsx
// Use proper state management for content updates
const [content, setContent] = useState<string>(initialContent);
const [lastSaved, setLastSaved] = useState<string>("");

const handleContentChange = (newContent: string) => {
  setContent(newContent);
  setLastSaved(new Date().toISOString());
};
```

### Validation and Error Handling
```tsx
// Implement content validation
const validateContent = (content: string): boolean => {
  if (content.length === 0) return false;
  if (content.length > charLimit) return false;
  return true;
};
```

## 🔧 Customization

### Custom Styling
```css
/* Override default styles */
.ihub-content-container {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.ihub-content-toolbar {
  background: linear-gradient(90deg, #f8f9fa, #e9ecef);
}
```

### Advanced Configuration
```tsx
// Advanced setup with custom handlers
<ContentViewOrEdit
  setContent={handleContentUpdate}
  content={content}
  title="Advanced Editor"
  showToolbar={true}
  placeholder="Start creating amazing content..."
  charLimit={10000}
  lastUpdated={formatLastUpdated(lastModified)}
  showEditBtn={userCanEdit}
  showPreviewBtn={enablePreview}
/>
```

## 🔗 Related Components

- [CustomTextEditor](./CustomTextEditor.md) - Rich text editor with advanced formatting
- [ContentViewer](./ContentViewer.md) - Display-only content viewer
- [Dialog](./Dialog.md) - Modal dialogs for content actions
- [TextField](./TextField.md) - Simple text input fields
- [Tabs](./Tabs.md) - Organize content in tabbed interfaces

