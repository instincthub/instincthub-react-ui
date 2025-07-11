# ContentViewOrEdit

**Category:** UI | **Type:** component

Content view or edit component

## 📁 File Location

`src/components/ui/viewer/ContentViewOrEdit.tsx`

## 🏷️ Tags

`ui`

## 📖 Usage Examples

### Example 1

```tsx
"use client";
import { ContentViewer, ContentViewOrEdit } from "../../../../index";
import { useState } from "react";

console.log(ContentViewer);

export default function ContentViewOrEditSample() {
  const [content, setContent] = useState<string>(
    "<h2>Getting Started with InstinctHub</h2><p>Welcome to your course content! This editor allows you to create rich, interactive content for your students.</p><ul><li>Format text using the toolbar above</li><li>Add images, tables, and code samples</li><li>Create interactive task lists</li></ul><p>Click the edit button to make changes, then preview to see how your content will appear to students.</p>"
  );
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };
  return (
    <div>
      <ContentViewer
        content={content}
        title="Course Module: Introduction"
        onContentChange={toggleEditMode}
        showToolbar={true}
      />

      <ContentViewOrEdit
        setContent={setContent}
        content={content}
        title="Course Module: Introduction"
        showToolbar={true}
        placeholder="Write your course content here..."
        charLimit={10000}
        lastUpdated="2023-05-01 12:00:00"
        showEditBtn={true}
        showPreviewBtn={true}
      />
    </div>
  );
}

```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { ContentViewOrEdit } from '@instincthub/react-ui';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { ContentViewOrEdit } from '@instincthub/react-ui';

function MyComponent() {
  return (
    <ContentViewOrEdit
    />
  );
}
```

## 🔗 Related Components

- [CustomTextEditor](./CustomTextEditor.md) - Custom text editor component
- [ContentViewer](./ContentViewer.md) - Content viewer component
- [CodeDisplay](./CodeDisplay.md) - Code display component
- [IHubTable](./IHubTable.md) - InstinctHub table component
- [IHubTableServer](./IHubTableServer.md) - InstinctHub server table component

