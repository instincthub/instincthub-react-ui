# Dialog

**Category:** UI | **Type:** component

A reusable dialog component

## 📁 File Location

`src/components/ui/dialogs/Dialog.tsx`

## 🏷️ Tags

`ui`, `modal`, `overlay`

## 📖 Usage Examples

### Example 1

```tsx
"use client"
import React, { useState } from "react";
import { Dialog } from "../../../../index";

const DialogExample: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="ihub-container">
      <h1>Dialog Example</h1>
      
      <button 
        className="ihub-important-btn" 
        onClick={openDialog}
      >
        Open Dialog
      </button>
      
      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title="Confirmation"
        footer={
          <div className="ihub-buttons">
            <button 
              className="ihub-danger-btn"
              onClick={closeDialog}
            >
              Cancel
            </button>
            <button 
              className="ihub-important-btn"
              onClick={() => {
                // Handle confirmation
                closeDialog();
              }}
            >
              Confirm
            </button>
          </div>
        }
      >
        <p>Are you sure you want to proceed with this action?</p>
      </Dialog>
    </div>
  );
};

export default DialogExample;

```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { Dialog } from '@instincthub/react-ui';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { Dialog } from '@instincthub/react-ui';

function MyComponent() {
  return (
    <Dialog
    />
  );
}
```

## 🔗 Related Components

- [CustomTextEditor](./CustomTextEditor.md) - Custom text editor component
- [ContentViewer](./ContentViewer.md) - Content viewer component
- [ContentViewOrEdit](./ContentViewOrEdit.md) - Content view or edit component
- [CodeDisplay](./CodeDisplay.md) - Code display component
- [IHubTable](./IHubTable.md) - InstinctHub table component

