# Dialog

**Category:** UI | **Type:** component

A reusable modal dialog component with keyboard accessibility, focus management, and backdrop support

## 📁 File Location

`src/components/ui/dialogs/Dialog.tsx`

## 🏷️ Tags

`ui`, `modal`, `dialog`, `overlay`, `accessibility`

## 📖 Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `isOpen` | `boolean` | Yes | - | Whether the dialog is currently visible |
| `onClose` | `() => void` | Yes | - | Function to call when dialog should close |
| `title` | `string` | Yes | - | Dialog title displayed in header |
| `children` | `React.ReactNode` | Yes | - | Dialog content |
| `footer` | `React.ReactNode` | No | - | Optional footer content (typically action buttons) |
| `maxWidth` | `string` | No | `"902px"` | Optional max width of the dialog |
| `className` | `string` | No | `""` | Optional CSS class to add to the dialog |

## 🎨 CSS Classes

- `ihub-modal` - Main modal backdrop
- `ihub-modal-content` - Dialog content container
- `ihub-violet` - Dialog header with title and close button
- `ihub-close-it` - Close button styling
- `ihub-txt-modal` - Dialog body content area
- `ihub-next-prev` - Dialog footer area

## 🌟 Features

- **Keyboard Accessibility** - ESC key to close
- **Focus Management** - Proper focus trapping
- **Body Scroll Prevention** - Prevents scrolling when open
- **Click Outside to Close** - Click backdrop to dismiss
- **Custom Footer Support** - Flexible action buttons
- **Responsive Design** - Adapts to different screen sizes

```tsx
"use client";
import React, { useState } from "react";
import { Dialog, InputText, InputTextarea } from "@instincthub/react-ui";

/**
 * Comprehensive Dialog examples demonstrating various use cases
 */
const DialogExamples = () => {
  const [isBasicOpen, setIsBasicOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [isLargeOpen, setIsLargeOpen] = useState(false);
  const [isNoFooterOpen, setIsNoFooterOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = () => {
    console.log("Form submitted:", formData);
    setIsFormOpen(false);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  const handleDelete = () => {
    console.log("Item deleted");
    setIsConfirmOpen(false);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>Dialog Examples</h1>

      <div 
        className="ihub-d-flex ihub-py-5" 
        style={{ gap: "20px", flexWrap: "wrap" }}
      >
        {/* Basic Dialog */}
        <button
          className="ihub-primary-btn"
          onClick={() => setIsBasicOpen(true)}
        >
          Basic Dialog
        </button>

        {/* Confirmation Dialog */}
        <button
          className="ihub-danger-btn"
          onClick={() => setIsConfirmOpen(true)}
        >
          Confirmation Dialog
        </button>

        {/* Form Dialog */}
        <button
          className="ihub-important-btn"
          onClick={() => setIsFormOpen(true)}
        >
          Form Dialog
        </button>

        {/* Custom Footer Dialog */}
        <button
          className="ihub-outlined-btn"
          onClick={() => setIsCustomOpen(true)}
        >
          Custom Footer
        </button>

        {/* Large Dialog */}
        <button
          className="ihub-primary-btn"
          onClick={() => setIsLargeOpen(true)}
        >
          Large Dialog
        </button>

        {/* No Footer Dialog */}
        <button
          className="ihub-outlined-btn"
          onClick={() => setIsNoFooterOpen(true)}
        >
          No Footer Dialog
        </button>
      </div>

      {/* Basic Dialog Example */}
      <Dialog
        isOpen={isBasicOpen}
        onClose={() => setIsBasicOpen(false)}
        title="Information"
        footer={
          <div className="ihub-buttons">
            <button 
              className="ihub-primary-btn"
              onClick={() => setIsBasicOpen(false)}
            >
              OK
            </button>
          </div>
        }
      >
        <p>This is a basic dialog with simple content and a single action button.</p>
        <p>Features demonstrated:</p>
        <ul>
          <li>Simple title and content</li>
          <li>Single action button in footer</li>
          <li>Default width (902px max)</li>
          <li>ESC key to close</li>
          <li>Click outside to close</li>
        </ul>
      </Dialog>

      {/* Confirmation Dialog Example */}
      <Dialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Confirm Deletion"
        maxWidth="500px"
        footer={
          <div className="ihub-buttons">
            <button 
              className="ihub-outlined-btn"
              onClick={() => setIsConfirmOpen(false)}
            >
              Cancel
            </button>
            <button 
              className="ihub-danger-btn"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        }
      >
        <p>Are you sure you want to delete this item?</p>
        <p className="ihub-text-danger">
          <strong>Warning:</strong> This action cannot be undone.
        </p>
      </Dialog>

      {/* Form Dialog Example */}
      <Dialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Contact Form"
        maxWidth="600px"
        footer={
          <div className="ihub-buttons">
            <button 
              className="ihub-outlined-btn"
              onClick={() => setIsFormOpen(false)}
            >
              Cancel
            </button>
            <button 
              className="ihub-important-btn"
              onClick={handleFormSubmit}
              disabled={!formData.name || !formData.email}
            >
              Submit
            </button>
          </div>
        }
      >
        <div className="ihub-form-group">
          <InputText
            label="Full Name"
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="ihub-form-group">
          <InputText
            label="Email Address"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="ihub-form-group">
          <InputTextarea
            label="Message"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
          />
        </div>
      </Dialog>

      {/* Custom Footer Dialog Example */}
      <Dialog
        isOpen={isCustomOpen}
        onClose={() => setIsCustomOpen(false)}
        title="Custom Actions"
        footer={
          <div className="ihub-d-flex ihub-justify-content-between ihub-w-100">
            <button 
              className="ihub-outlined-btn"
              onClick={() => console.log("Help clicked")}
            >
              Help
            </button>
            <div className="ihub-buttons">
              <button 
                className="ihub-outlined-btn"
                onClick={() => setIsCustomOpen(false)}
              >
                Skip
              </button>
              <button 
                className="ihub-primary-btn"
                onClick={() => {
                  console.log("Save & Continue clicked");
                  setIsCustomOpen(false);
                }}
              >
                Save & Continue
              </button>
            </div>
          </div>
        }
      >
        <p>This dialog demonstrates a custom footer layout with multiple action groups:</p>
        <ul>
          <li>Help button on the left</li>
          <li>Skip and Save & Continue buttons on the right</li>
          <li>Uses flexbox for layout control</li>
        </ul>
        <p>Perfect for complex workflows that need additional options.</p>
      </Dialog>

      {/* Large Dialog Example */}
      <Dialog
        isOpen={isLargeOpen}
        onClose={() => setIsLargeOpen(false)}
        title="Large Content Dialog"
        maxWidth="1200px"
        footer={
          <div className="ihub-buttons">
            <button 
              className="ihub-outlined-btn"
              onClick={() => setIsLargeOpen(false)}
            >
              Close
            </button>
          </div>
        }
      >
        <div style={{ minHeight: "400px" }}>
          <h3>Large Dialog Content</h3>
          <p>This dialog uses a larger maximum width (1200px) to accommodate more content.</p>
          
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <h4>Column 1</h4>
              <p>Content can be organized in multiple columns when you have a wider dialog.</p>
              <ul>
                <li>Feature list item 1</li>
                <li>Feature list item 2</li>
                <li>Feature list item 3</li>
              </ul>
            </div>
            <div className="ihub-col-md-6">
              <h4>Column 2</h4>
              <p>Perfect for:</p>
              <ul>
                <li>Detailed forms</li>
                <li>Data presentations</li>
                <li>Complex layouts</li>
                <li>Rich content</li>
              </ul>
            </div>
          </div>

          <div className="ihub-mt-4">
            <h4>Additional Content</h4>
            <p>The dialog automatically handles scrolling if content exceeds the viewport height.</p>
          </div>
        </div>
      </Dialog>

      {/* No Footer Dialog Example */}
      <Dialog
        isOpen={isNoFooterOpen}
        onClose={() => setIsNoFooterOpen(false)}
        title="Information Only"
        maxWidth="400px"
      >
        <div className="ihub-text-center">
          <div className="ihub-mb-3">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#007bff" strokeWidth="2"/>
              <path d="M12 6v6l4 2" stroke="#007bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h4>Processing Complete</h4>
          <p>Your request has been processed successfully.</p>
          <p className="ihub-text-muted">
            This dialog will close automatically, or you can use the X button or ESC key.
          </p>
          
          <button 
            className="ihub-primary-btn ihub-mt-3"
            onClick={() => setIsNoFooterOpen(false)}
          >
            Continue
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default DialogExamples;
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
import React, { useState } from 'react';
import { Dialog } from '@instincthub/react-ui';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Dialog
      </button>
      
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="My Dialog"
        footer={
          <button onClick={() => setIsOpen(false)}>
            Close
          </button>
        }
      >
        <p>Dialog content goes here</p>
      </Dialog>
    </>
  );
}
```

## ♿ Accessibility Features

- **ARIA Support** - Proper `role="dialog"` and `aria-modal="true"`
- **Keyboard Navigation** - ESC key to close dialog
- **Focus Management** - Focus is managed properly when opening/closing
- **Screen Reader Support** - Semantic HTML structure
- **Close Button** - Clearly labeled close button with `aria-label`

## 🎯 Use Cases

- **Confirmation dialogs** - Delete confirmations, action confirmations
- **Form dialogs** - Contact forms, settings, user input
- **Information display** - Alerts, notifications, help content
- **Detail views** - Product details, user profiles
- **Custom workflows** - Multi-step processes, wizards

## 🔗 Related Components

- [MultiPurposeModal](./MultiPurposeModal.md) - Advanced modal with more features
- [CustomTextEditor](./CustomTextEditor.md) - Rich text editing component
- [ContentViewOrEdit](./ContentViewOrEdit.md) - Content view/edit switcher
- [InputText](./InputText.md) - Text input component
- [InputTextarea](./InputTextarea.md) - Textarea input component

