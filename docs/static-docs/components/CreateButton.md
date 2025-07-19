# CreateButton

**Category:** UI | **Type:** component

A modern, feature-rich action button component with URL parameter support, loading states, multiple variants, and smooth animations

## 📁 File Location

`src/components/ui/create-button/CreateButton.tsx`

## 🏷️ Tags

`ui`, `button`, `action`, `navigation`, `animation`, `loading`

## 📖 Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `string` | No | `"Create"` | Text to display on the button |
| `searchParam` | `{ key: string; value: string }` | No | - | Search parameter key-value to add to URL |
| `onClick` | `() => void` | No | - | Fallback function when no searchParam is provided |
| `variant` | `"primary" \| "outlined" \| "important" \| "danger"` | No | `"important"` | Button variant style |
| `disabled` | `boolean` | No | `false` | Whether the button is disabled |
| `className` | `string` | No | `""` | Additional CSS classes |
| `size` | `"small" \| "medium" \| "large"` | No | `"medium"` | Button size |
| `loading` | `boolean` | No | `false` | Show loading state |
| `icon` | `React.ReactNode` | No | - | Icon to display before text |
| `animated` | `boolean` | No | `true` | Whether to show animation effects |
| `buttonProps` | `React.ButtonHTMLAttributes<HTMLButtonElement>` | No | - | Additional HTML button attributes |

## 🎨 CSS Classes

### Variant Classes
- `ihub-primary-btn` - Primary blue button style
- `ihub-outlined-btn` - Outlined button with border
- `ihub-important-btn` - Important/accent button style (default)
- `ihub-danger-btn` - Danger/destructive action button

### Size Classes
- `ihub-btn-small` - Compact button size
- `ihub-btn-large` - Large button size
- Default medium size uses standard button styling

### State Classes
- `ihub-anime-button` - Animation effects enabled
- `ihub-btn-loading` - Loading state styling
- `ihub-btn-spinner` - Loading spinner container
- `ihub-btn-icon` - Icon container styling
- `ihub-btn-text` - Button text styling
- `ihub-btn-arrow` - Animated arrow icon

## 🌟 Features

- **URL Parameter Support** - Automatically updates URL with search parameters
- **Multiple Variants** - Primary, outlined, important, and danger styles
- **Loading States** - Built-in loading spinner and text changes
- **Icon Support** - Add icons before button text
- **Smooth Animations** - Optional animated arrow and hover effects
- **Size Variants** - Small, medium, and large button sizes
- **Accessibility** - Proper ARIA attributes and keyboard support

```tsx
"use client";
import React, { useState } from "react";
import { CreateButton } from "@instincthub/react-ui";

/**
 * Comprehensive CreateButton examples demonstrating various use cases
 */
const CreateButtonExamples = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Simulate async operations
  const simulateCreation = async (delay = 2000) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, delay));
    setIsLoading(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSubmitForm = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsSubmitting(false);
    console.log("Form submitted successfully!");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this item?")) {
      console.log("Item deleted");
    }
  };

  const handleSave = () => {
    console.log("Draft saved");
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>CreateButton Examples</h1>

      {/* Basic Variants */}
      <div className="ihub-mb-5">
        <h2>Button Variants</h2>
        <p>Different visual styles for various use cases:</p>
        
        <div 
          className="ihub-d-flex ihub-py-3" 
          style={{ gap: "15px", flexWrap: "wrap" }}
        >
          <CreateButton
            label="Primary Action"
            variant="primary"
            onClick={() => console.log("Primary clicked")}
          />
          
          <CreateButton
            label="Important Action"
            variant="important"
            onClick={() => console.log("Important clicked")}
          />
          
          <CreateButton
            label="Secondary Action"
            variant="outlined"
            onClick={() => console.log("Outlined clicked")}
          />
          
          <CreateButton
            label="Delete Item"
            variant="danger"
            onClick={handleDelete}
          />
        </div>
      </div>

      {/* Size Variants */}
      <div className="ihub-mb-5">
        <h2>Button Sizes</h2>
        <p>Different button sizes for various contexts:</p>
        
        <div 
          className="ihub-d-flex ihub-align-items-center ihub-py-3" 
          style={{ gap: "15px", flexWrap: "wrap" }}
        >
          <CreateButton
            label="Small"
            size="small"
            variant="outlined"
            onClick={() => console.log("Small clicked")}
          />
          
          <CreateButton
            label="Medium (Default)"
            size="medium"
            variant="primary"
            onClick={() => console.log("Medium clicked")}
          />
          
          <CreateButton
            label="Large Button"
            size="large"
            variant="important"
            onClick={() => console.log("Large clicked")}
          />
        </div>
      </div>

      {/* Loading States */}
      <div className="ihub-mb-5">
        <h2>Loading States</h2>
        <p>Buttons with loading indicators and state management:</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div 
              className="ihub-d-flex" 
              style={{ gap: "15px", flexWrap: "wrap" }}
            >
              <CreateButton
                label="Create Item"
                loading={isLoading}
                onClick={() => simulateCreation()}
                variant="important"
              />
              
              <CreateButton
                label="Submit Form"
                loading={isSubmitting}
                onClick={handleSubmitForm}
                variant="primary"
              />
            </div>
          </div>
          <div className="ihub-col-md-6">
            {showSuccess && (
              <div className="ihub-alert ihub-alert-success">
                ✓ Operation completed successfully!
              </div>
            )}
            
            <div className="ihub-mt-3">
              <small className="ihub-text-muted">
                Click buttons to see loading states in action
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* With Icons */}
      <div className="ihub-mb-5">
        <h2>Buttons with Icons</h2>
        <p>Enhanced buttons with icon support:</p>
        
        <div 
          className="ihub-d-flex ihub-py-3" 
          style={{ gap: "15px", flexWrap: "wrap" }}
        >
          <CreateButton
            label="Add User"
            variant="primary"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 6v12m6-6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            }
            onClick={() => console.log("Add user clicked")}
          />
          
          <CreateButton
            label="Upload File"
            variant="outlined"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            onClick={() => console.log("Upload clicked")}
          />
          
          <CreateButton
            label="Save Draft"
            variant="outlined"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="17,21 17,13 7,13 7,21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="7,3 7,8 15,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            onClick={handleSave}
          />
        </div>
      </div>

      {/* URL Parameter Examples */}
      <div className="ihub-mb-5">
        <h2>URL Parameter Integration</h2>
        <p>Buttons that update URL parameters for navigation:</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-8">
            <div 
              className="ihub-d-flex ihub-py-3" 
              style={{ gap: "15px", flexWrap: "wrap" }}
            >
              <CreateButton
                label="Create Course"
                searchParam={{ key: "create", value: "course" }}
                variant="important"
              />
              
              <CreateButton
                label="Create User"
                searchParam={{ key: "create", value: "user" }}
                variant="primary"
              />
              
              <CreateButton
                label="New Project"
                searchParam={{ key: "modal", value: "new-project" }}
                variant="outlined"
              />
              
              <CreateButton
                label="Add Content"
                searchParam={{ key: "action", value: "add-content" }}
                variant="outlined"
              />
            </div>
          </div>
          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-p-3">
              <h6>Current URL Parameters:</h6>
              <pre className="ihub-small">
                {typeof window !== 'undefined' ? 
                  window.location.search || 'No parameters' : 
                  'Loading...'
                }
              </pre>
              <small className="ihub-text-muted">
                Click buttons to see URL changes
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Animation States */}
      <div className="ihub-mb-5">
        <h2>Animation Control</h2>
        <p>Buttons with and without animations:</p>
        
        <div 
          className="ihub-d-flex ihub-py-3" 
          style={{ gap: "15px", flexWrap: "wrap" }}
        >
          <CreateButton
            label="Animated (Default)"
            variant="primary"
            animated={true}
            onClick={() => console.log("Animated clicked")}
          />
          
          <CreateButton
            label="No Animation"
            variant="outlined"
            animated={false}
            onClick={() => console.log("Static clicked")}
          />
        </div>
      </div>

      {/* Disabled States */}
      <div className="ihub-mb-5">
        <h2>Disabled States</h2>
        <p>Buttons in disabled state:</p>
        
        <div 
          className="ihub-d-flex ihub-py-3" 
          style={{ gap: "15px", flexWrap: "wrap" }}
        >
          <CreateButton
            label="Disabled Primary"
            variant="primary"
            disabled={true}
          />
          
          <CreateButton
            label="Disabled Important"
            variant="important"
            disabled={true}
          />
          
          <CreateButton
            label="Disabled Outlined"
            variant="outlined"
            disabled={true}
          />
        </div>
      </div>

      {/* Custom Styling */}
      <div className="ihub-mb-5">
        <h2>Custom Styling</h2>
        <p>Buttons with custom classes and attributes:</p>
        
        <div 
          className="ihub-d-flex ihub-py-3" 
          style={{ gap: "15px", flexWrap: "wrap" }}
        >
          <CreateButton
            label="Custom Width"
            variant="primary"
            className="ihub-w-200"
            onClick={() => console.log("Custom width clicked")}
          />
          
          <CreateButton
            label="With Tooltip"
            variant="outlined"
            buttonProps={{
              title: "This is a tooltip",
              'data-toggle': 'tooltip'
            }}
            onClick={() => console.log("Tooltip button clicked")}
          />
        </div>
      </div>

      {/* Real-world Examples */}
      <div className="ihub-mb-5">
        <h2>Real-world Use Cases</h2>
        
        {/* Content Management */}
        <div className="ihub-mb-4">
          <h4>Content Management</h4>
          <div className="ihub-card ihub-p-3">
            <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
              <div>
                <h6>Content Library</h6>
                <p className="ihub-text-muted ihub-mb-0">Manage your content items</p>
              </div>
              <div 
                className="ihub-d-flex" 
                style={{ gap: "10px" }}
              >
                <CreateButton
                  label="New Article"
                  searchParam={{ key: "create", value: "article" }}
                  variant="important"
                  size="small"
                />
                <CreateButton
                  label="New Video"
                  searchParam={{ key: "create", value: "video" }}
                  variant="outlined"
                  size="small"
                />
              </div>
            </div>
          </div>
        </div>

        {/* User Management */}
        <div className="ihub-mb-4">
          <h4>User Management</h4>
          <div className="ihub-card ihub-p-3">
            <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
              <div>
                <h6>User Administration</h6>
                <p className="ihub-text-muted ihub-mb-0">Manage system users</p>
              </div>
              <CreateButton
                label="Invite User"
                searchParam={{ key: "invite", value: "user" }}
                variant="primary"
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="23" y1="11" x2="17" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
              />
            </div>
          </div>
        </div>

        {/* Project Dashboard */}
        <div className="ihub-mb-4">
          <h4>Project Dashboard</h4>
          <div className="ihub-card ihub-p-3">
            <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
              <div>
                <h6>Active Projects</h6>
                <p className="ihub-text-muted ihub-mb-0">12 active projects</p>
              </div>
              <div 
                className="ihub-d-flex" 
                style={{ gap: "10px" }}
              >
                <CreateButton
                  label="New Project"
                  searchParam={{ key: "create", value: "project" }}
                  variant="important"
                />
                <CreateButton
                  label="Import"
                  searchParam={{ key: "import", value: "project" }}
                  variant="outlined"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateButtonExamples;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { CreateButton } from '@instincthub/react-ui';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { CreateButton } from '@instincthub/react-ui';

function MyComponent() {
  return (
    <CreateButton
      label="Create New"
      variant="important"
      onClick={() => console.log('Button clicked')}
    />
  );
}
```

## 🔧 Implementation Guide

### URL Parameter Integration

```tsx
// URL parameter approach (recommended for navigation)
<CreateButton
  label="Create Course"
  searchParam={{ key: "create", value: "course" }}
  variant="important"
/>

// onClick callback approach (for direct actions)
<CreateButton
  label="Save Draft"
  onClick={() => saveDraft()}
  variant="outlined"
/>
```

### Loading State Management

```tsx
const [isCreating, setIsCreating] = useState(false);

const handleCreate = async () => {
  setIsCreating(true);
  try {
    await createItem();
  } finally {
    setIsCreating(false);
  }
};

<CreateButton
  label="Create Item"
  loading={isCreating}
  onClick={handleCreate}
/>
```

### Custom Icon Integration

```tsx
// Using custom icons
const PlusIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 6v12m6-6H6" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

<CreateButton
  label="Add Item"
  icon={PlusIcon}
  variant="primary"
/>
```

### Advanced Styling

```tsx
// Custom button with additional attributes
<CreateButton
  label="Submit Form"
  variant="important"
  className="custom-button-class"
  buttonProps={{
    'data-testid': 'submit-button',
    'aria-label': 'Submit the form',
    title: 'Click to submit'
  }}
/>
```

## ♿ Accessibility Features

- **Keyboard Navigation** - Full keyboard support with Enter and Space
- **ARIA Labels** - Proper labeling for screen readers
- **Focus Management** - Clear focus indicators
- **Loading States** - Announces state changes to assistive technology
- **Disabled State** - Properly communicated to screen readers

## 🎯 Use Cases

- **Content Creation** - Add new articles, videos, courses
- **User Management** - Invite users, create accounts
- **Project Management** - Start new projects, create tasks
- **E-commerce** - Add products, create orders
- **Form Actions** - Submit forms, save drafts
- **Modal Triggers** - Open creation dialogs

## 🔗 Related Components

- [CreateButtonExample](./CreateButtonExample.md) - Examples showcase for CreateButton
- [SubmitButton](./SubmitButton.md) - Form submission button component
- [ToggleButton](./ToggleButton.md) - Toggle state button component
- [Action](./Action.md) - Generic action button component
- [Dialog](./Dialog.md) - Modal dialog component

