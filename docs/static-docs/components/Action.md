# Action

**Category:** UI | **Type:** component

Versatile action component that can render as a button or link with various styles, sizes, and dropdown functionality. Perfect for call-to-action buttons, navigation elements, and interactive UI components.

## 📁 File Location

`src/components/ui/Action.tsx`

## 🏷️ Tags

`ui`, `button`, `link`, `dropdown`, `navigation`, `interactive`

## 📖 Usage Examples

### Example 1: Complete Action Component Demo

```tsx
"use client";

import React, { useState } from "react";
import { Action } from "@instincthub/react-ui";
import Link from "next/link";

/**
 * Comprehensive example demonstrating all Action component variants and features
 */
const ActionExamples = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Handle button click actions
  const handlePrimaryAction = () => {
    console.log("Primary action clicked");
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleDeleteAction = () => {
    if (confirm("Are you sure you want to delete this item?")) {
      console.log("Item deleted");
    }
  };

  // Dropdown menu items
  const dropdownItems = [
    {
      label: "Edit Profile",
      href: "/profile/edit",
      icon: "edit"
    },
    {
      label: "View Settings", 
      href: "/settings",
      icon: "settings"
    },
    {
      label: "Sign Out",
      onClick: () => console.log("Signing out..."),
      icon: "logout",
      className: "text-danger"
    }
  ];

  const contextMenuItems = [
    { label: "Copy", onClick: () => console.log("Copied") },
    { label: "Cut", onClick: () => console.log("Cut") },
    { label: "Paste", onClick: () => console.log("Pasted") },
    { label: "Delete", onClick: handleDeleteAction, className: "text-danger" }
  ];

  return (
    <div className="ihub-container ihub-py-5">
      <h1>Action Component Examples</h1>

      {/* Basic Button Variants */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Button Variants</h2>
        <div className="ihub-d-flex ihub-gap-3 ihub-flex-wrap">
          <Action
            variant="primary"
            onClick={handlePrimaryAction}
            loading={isLoading}
          >
            Primary Action
          </Action>

          <Action
            variant="secondary"
            onClick={() => console.log("Secondary clicked")}
          >
            Secondary Action
          </Action>

          <Action
            variant="outline"
            onClick={() => console.log("Outline clicked")}
          >
            Outline Action
          </Action>

          <Action
            variant="danger"
            onClick={handleDeleteAction}
          >
            Delete Item
          </Action>

          <Action
            variant="text"
            onClick={() => console.log("Text clicked")}
          >
            Text Link
          </Action>
        </div>
      </section>

      {/* Different Sizes */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Button Sizes</h2>
        <div className="ihub-d-flex ihub-gap-3 ihub-align-items-center ihub-flex-wrap">
          <Action
            variant="primary"
            size="small"
            onClick={() => console.log("Small clicked")}
          >
            Small
          </Action>

          <Action
            variant="primary"
            size="medium"
            onClick={() => console.log("Medium clicked")}
          >
            Medium
          </Action>

          <Action
            variant="primary"
            size="large"
            onClick={() => console.log("Large clicked")}
          >
            Large
          </Action>
        </div>
      </section>

      {/* Link Actions */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Link Actions</h2>
        <div className="ihub-d-flex ihub-gap-3 ihub-flex-wrap">
          <Action
            as={Link}
            href="/dashboard"
            variant="primary"
          >
            Go to Dashboard
          </Action>

          <Action
            as="a"
            href="https://instincthub.com"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
          >
            External Link
          </Action>
        </div>
      </section>

      {/* Actions with Icons */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Actions with Icons</h2>
        <div className="ihub-d-flex ihub-gap-3 ihub-flex-wrap">
          <Action
            variant="primary"
            iconBefore="add"
            onClick={() => console.log("Add clicked")}
          >
            Add New Item
          </Action>

          <Action
            variant="secondary"
            iconAfter="arrow_forward"
            onClick={() => console.log("Next clicked")}
          >
            Continue
          </Action>

          <Action
            variant="outline"
            iconBefore="download"
            onClick={() => console.log("Download clicked")}
          >
            Download File
          </Action>
        </div>
      </section>

      {/* Dropdown Actions */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Dropdown Actions</h2>
        <div className="ihub-d-flex ihub-gap-3 ihub-flex-wrap">
          <Action
            variant="primary"
            dropdown={dropdownItems}
            dropdownPosition="bottomLeft"
          >
            User Menu
          </Action>

          <Action
            variant="outline"
            dropdown={contextMenuItems}
            dropdownPosition="bottomRight"
            iconAfter="more_vert"
          >
            Context Menu
          </Action>
        </div>
      </section>

      {/* Special States */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Special States</h2>
        <div className="ihub-d-flex ihub-gap-3 ihub-flex-wrap">
          <Action
            variant="primary"
            loading={true}
            loadingText="Processing..."
            disabled
          >
            Loading Action
          </Action>

          <Action
            variant="secondary"
            disabled
          >
            Disabled Action
          </Action>

          <Action
            variant="primary"
            fullWidth
            onClick={() => console.log("Full width clicked")}
          >
            Full Width Action
          </Action>
        </div>
      </section>

      {/* Animated Actions */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Animated Actions</h2>
        <div className="ihub-d-flex ihub-gap-3 ihub-flex-wrap">
          <Action
            variant="primary"
            animated
            onClick={() => console.log("Animated clicked")}
          >
            Hover Animation
          </Action>

          <Action
            variant="outline"
            animated
            iconBefore="favorite"
            onClick={() => console.log("Like clicked")}
          >
            Like Post
          </Action>
        </div>
      </section>
    </div>
  );
};

export default ActionExamples;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { Action } from '@instincthub/react-ui';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { Action } from '@instincthub/react-ui';

function MyComponent() {
  return (
    <Action
      variant="primary"
      onClick={() => console.log("Button clicked")}
    >
      Click Me
    </Action>
  );
}
```

## 🔗 Related Components

- [CustomTextEditor](./CustomTextEditor.md) - Custom text editor component
- [ContentViewer](./ContentViewer.md) - Content viewer component
- [ContentViewOrEdit](./ContentViewOrEdit.md) - Content view or edit component
- [CodeDisplay](./CodeDisplay.md) - Code display component
- [IHubTable](./IHubTable.md) - InstinctHub table component

