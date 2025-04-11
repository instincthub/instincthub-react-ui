# Confirm Delete Module

## Overview

A robust TypeScript module for handling delete confirmations with a user-friendly modal interface. This module provides a clean way to implement the "type to confirm" pattern used in critical deletion operations.

## Features

- 🔒 Requires users to type the exact name of the item to confirm deletion
- 📋 One-click copy button for convenience
- 🚫 API error handling with detailed error messages
- ↩️ Easy cancellation via button, backdrop click, or Escape key
- 🧩 Fully typed function parameters and return values
- 🎨 Consistent styling with InstinctHub design system

## Installation

### 1. Add the TypeScript file to your project

```bash
# Assuming you're adding it to a utils directory
cp confirmDelete.ts src/utils/
```

### 2. Import the CSS

Make sure to import the modal styles in your main CSS file:

```css
/* In your app's main CSS */
@import "./path/to/modal.css";
```

### 3. Install dependencies

This module depends on two utility functions that should be available in your project:

```bash
# If using the instincthub utilities
npm install @instincthub/react-ui
```

## API Reference

### openConfirmDelete

```typescript
function openConfirmDelete(
  message: string,
  token: string,
  url: string,
  pop: boolean = true,
  reqOptions: RequestOptionsFunction,
  openToast: OpenToastFunction
): Promise<boolean>;
```

#### Parameters

| Parameter  | Type     | Description                                                          |
| ---------- | -------- | -------------------------------------------------------------------- |
| message    | string   | The name of the item to be deleted (users will type this to confirm) |
| token      | string   | Authentication token for API request authorization                   |
| url        | string   | API endpoint URL for the delete operation                            |
| pop        | boolean  | Whether to show confirmation modal (defaults to true)                |
| reqOptions | Function | Utility function for creating request options                        |
| openToast  | Function | Utility function for displaying toast notifications                  |

#### Return Value

Returns a `Promise<boolean>` that resolves to:

- `true` - Deletion was successful
- `false` - Deletion failed or was cancelled

## Usage Examples

### Basic Example

```typescript
import { openConfirmDelete } from "@/utils/confirmDelete";
import { reqOptions, openToast } from "@instincthub/react-ui/lib";
import { API_HOST_URL } from "@/config";

async function handleDelete(item: Item) {
  const endpoint = `${API_HOST_URL}/items/${item.id}/`;

  const success = await openConfirmDelete(
    item.name,
    userToken,
    endpoint,
    true,
    reqOptions,
    openToast
  );

  if (success) {
    // Update UI after successful deletion
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  }
}
```

### Quick Delete (No Confirmation)

```typescript
async function quickDelete(item: Item) {
  const endpoint = `${API_HOST_URL}/items/${item.id}/`;

  return await openConfirmDelete(
    item.name,
    userToken,
    endpoint,
    false, // Skip confirmation
    reqOptions,
    openToast
  );
}
```

### In a React Component

```tsx
import React from "react";
import { openConfirmDelete } from "@/utils/confirmDelete";
import { reqOptions, openToast } from "@instincthub/react-ui/lib";
import { API_HOST_URL } from "@/config";

interface Item {
  id: number;
  name: string;
}

interface DeleteButtonProps {
  item: Item;
  token: string;
  onSuccess: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  item,
  token,
  onSuccess,
}) => {
  const handleClick = async () => {
    const endpoint = `${API_HOST_URL}/items/${item.id}/`;

    const success = await openConfirmDelete(
      item.name,
      token,
      endpoint,
      true,
      reqOptions,
      openToast
    );

    if (success) {
      onSuccess();
    }
  };

  return (
    <button
      className="ihub-danger-btn"
      onClick={handleClick}
      aria-label={`Delete ${item.name}`}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
```

## Technical Improvements

### TypeScript Features Used

- **Interface Definitions**: For API responses and utility functions
- **Type Safety**: Strong typing for all variables and function parameters
- **Function Overloading**: For flexible parameter handling
- **Proper DOM Typing**: Type assertions for DOM elements and event handlers
- **Error Handling**: Try/catch blocks with proper error typing

### Code Quality Enhancements

- **Accessibility**: Added ARIA attributes for better screen reader support
- **Memory Management**: Proper cleanup of event listeners and global references
- **Animations**: Smooth entry animation for better UX
- **Keyboard Support**: Escape key handler for quick cancellation
- **Input Validation**: Real-time validation of confirmation text

## Browser Compatibility

- ✅ Modern Browsers (Chrome, Firefox, Safari, Edge)
- ✅ Internet Explorer 11 (with appropriate polyfills)
- ✅ Mobile browsers

## Styling

The modal uses the InstinctHub design system CSS variables and follows the `ihub-` prefix convention. The styles are responsive and adapt to different screen sizes.

## Security Considerations

- The confirmation pattern helps prevent accidental deletions
- API error handling prevents incorrect user feedback
- The module doesn't store sensitive information in localStorage or cookies

## License

This module is part of the InstinctHub platform and follows the same licensing terms.
