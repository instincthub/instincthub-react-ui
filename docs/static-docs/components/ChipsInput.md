# ChipsInput

**Category:** Form | **Type:** component

A flexible input component that converts text entries into chips/tags with advanced features like email validation, keyboard navigation, and customizable styling.

## 🏷️ Tags

`form`, `input`, `chips`, `tags`, `email`, `validation`

```tsx
"use client";
import React, { useState } from "react";
import { ChipsInput } from "@instincthub/react-ui";

/**
 * Example component demonstrating various ways to use the ChipsInput
 */
const ChipsInputExamples = () => {
  // Basic tags state
  const [basicTags, setBasicTags] = useState<string[]>([]);
  
  // Email tags state
  const [emailTags, setEmailTags] = useState<string[]>([
    "john@example.com", 
    "jane@example.com"
  ]);
  
  // Skills tags state
  const [skillsTags, setSkillsTags] = useState<string[]>([
    "React", 
    "TypeScript", 
    "Node.js"
  ]);
  
  // Keywords state with limit
  const [keywords, setKeywords] = useState<string[]>([]);
  
  // Categories with duplicates allowed
  const [categories, setCategories] = useState<string[]>([]);
  
  // Custom styled tags
  const [customTags, setCustomTags] = useState<string[]>([]);

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>ChipsInput Examples</h1>

      <div className="ihub-py-5" style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        
        {/* Basic Usage */}
        <div>
          <h2>Basic Tags Input</h2>
          <p>Enter tags separated by commas or press Enter</p>
          <ChipsInput
            label="Tags"
            name="basic-tags"
            value={basicTags}
            onChange={setBasicTags}
            placeholder="Add tags..."
            size="medium"
          />
          <p className="ihub-mt-2 ihub-text-muted">
            Current tags: {basicTags.join(", ") || "None"}
          </p>
        </div>

        {/* Email Validation */}
        <div>
          <h2>Email Tags with Validation</h2>
          <p>Only valid email addresses are accepted</p>
          <ChipsInput
            label="Email Recipients"
            name="email-tags"
            value={emailTags}
            onChange={setEmailTags}
            placeholder="Enter email addresses..."
            validateEmail={true}
            errorMessage="Please enter a valid email address"
            size="medium"
            required
          />
          <p className="ihub-mt-2 ihub-text-muted">
            Recipients: {emailTags.length} email(s)
          </p>
        </div>

        {/* Skills with No Duplicates */}
        <div>
          <h2>Skills (No Duplicates)</h2>
          <p>Duplicate skills are not allowed</p>
          <ChipsInput
            label="Technical Skills"
            name="skills"
            value={skillsTags}
            onChange={setSkillsTags}
            placeholder="Add your skills..."
            allowDuplicates={false}
            size="large"
          />
          <p className="ihub-mt-2 ihub-text-muted">
            Skills count: {skillsTags.length}
          </p>
        </div>

        {/* Limited Keywords */}
        <div>
          <h2>Keywords (Maximum 5)</h2>
          <p>Only 5 keywords are allowed</p>
          <ChipsInput
            label="SEO Keywords"
            name="keywords"
            value={keywords}
            onChange={setKeywords}
            placeholder="Add keywords..."
            maxChips={5}
            size="medium"
          />
          <p className="ihub-mt-2 ihub-text-muted">
            {keywords.length}/5 keywords used
          </p>
        </div>

        {/* Categories with Duplicates */}
        <div>
          <h2>Categories (Duplicates Allowed)</h2>
          <p>You can add the same category multiple times</p>
          <ChipsInput
            label="Product Categories"
            name="categories"
            value={categories}
            onChange={setCategories}
            placeholder="Add categories..."
            allowDuplicates={true}
            separator=";"
            size="medium"
          />
          <p className="ihub-mt-2 ihub-text-muted">
            Use semicolon (;) to separate categories
          </p>
        </div>

        {/* Small Size Variant */}
        <div>
          <h2>Small Size Variant</h2>
          <ChipsInput
            label="Quick Tags"
            name="small-tags"
            value={customTags}
            onChange={setCustomTags}
            placeholder="Small tags..."
            size="small"
            className="ihub-border-primary"
          />
        </div>

        {/* Disabled State */}
        <div>
          <h2>Disabled State</h2>
          <ChipsInput
            label="Readonly Tags"
            name="disabled-tags"
            value={["Read-only", "Disabled", "Cannot edit"]}
            onChange={() => {}}
            disabled={true}
            size="medium"
          />
        </div>

        {/* Custom Styling */}
        <div>
          <h2>Custom Styled Tags</h2>
          <ChipsInput
            label="Styled Tags"
            name="styled-tags"
            value={["React", "Vue", "Angular"]}
            onChange={() => {}}
            size="large"
            chipClassName="ihub-custom-chip"
            inputClassName="ihub-custom-input"
            className="ihub-custom-container"
          />
        </div>

        {/* Interactive Demo */}
        <div>
          <h2>Interactive Demo</h2>
          <p>Try these keyboard shortcuts:</p>
          <ul>
            <li><strong>Enter</strong> or <strong>Comma</strong>: Add a new tag</li>
            <li><strong>Backspace</strong>: Remove the last tag (when input is empty)</li>
            <li><strong>Arrow Left/Right</strong>: Navigate between tags</li>
            <li><strong>Delete</strong>: Remove selected tag</li>
          </ul>
          
          <ChipsInput
            label="Interactive Tags"
            name="demo-tags"
            value={basicTags}
            onChange={setBasicTags}
            placeholder="Try keyboard navigation..."
            size="medium"
            ariaLabel="Interactive tags demonstration"
          />
        </div>

        {/* Real-world Examples */}
        <div>
          <h2>Real-world Use Cases</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Blog Tags */}
            <div>
              <h3>Blog Post Tags</h3>
              <ChipsInput
                label="Article Tags"
                name="blog-tags"
                value={["React", "JavaScript", "Web Development"]}
                onChange={() => {}}
                placeholder="Add tags for your article..."
                maxChips={10}
                size="medium"
              />
            </div>

            {/* User Permissions */}
            <div>
              <h3>User Permissions</h3>
              <ChipsInput
                label="Assign Permissions"
                name="permissions"
                value={["read", "write", "admin"]}
                onChange={() => {}}
                placeholder="Add permissions..."
                allowDuplicates={false}
                size="medium"
              />
            </div>

            {/* Contact Tags */}
            <div>
              <h3>Contact Tags</h3>
              <ChipsInput
                label="Contact Labels"
                name="contact-tags"
                value={["client", "vip", "lead"]}
                onChange={() => {}}
                placeholder="Tag this contact..."
                size="small"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChipsInputExamples;
```

## 📁 File Location

`src/components/forms/ChipsInput.tsx`

## 🔧 Props Interface

```tsx
interface ChipsInputProps {
  /** Label for the input */
  label?: string;
  /** Name for the input */
  name?: string;
  /** Array of current chip values */
  value: string[];
  /** Callback when chips change */
  onChange: (values: string[]) => void;
  /** Input placeholder text */
  placeholder?: string;
  /** Character to trigger chip creation (default: ",") */
  separator?: string;
  /** Maximum number of chips allowed */
  maxChips?: number;
  /** Whether duplicate values are allowed */
  allowDuplicates?: boolean;
  /** Disables the input */
  disabled?: boolean;
  /** Validation function */
  validateEmail?: boolean;
  /** Default error message */
  errorMessage?: string;
  /** Additional class for container */
  className?: string;
  /** Additional class for chips */
  chipClassName?: string;
  /** Additional class for input */
  inputClassName?: string;
  /** Size variant */
  size?: "small" | "medium" | "large";
  /** Accessibility label */
  ariaLabel?: string;
  /** Whether the input is required */
  required?: boolean;
}
```

## 🎨 CSS Classes

- `ihub-wrapper` - Main wrapper container
- `ihub-chips-container` - Chips container
- `ihub-chips-{size}` - Size variants (small, medium, large)
- `ihub-chips-disabled` - Disabled state styling
- `ihub-chips-error` - Error state styling
- `ihub-chip` - Individual chip styling
- `ihub-chip-active` - Active/selected chip
- `ihub-chip-text` - Chip text content
- `ihub-chip-remove` - Remove button styling
- `ihub-chips-input` - Input field styling
- `ihub-chips-label` - Label styling
- `ihub-chips-error-message` - Error message styling

## ⌨️ Keyboard Navigation

- **Enter** or **Comma**: Add new chip
- **Backspace**: Remove last chip (when input empty) or selected chip
- **Arrow Left/Right**: Navigate between chips
- **Delete**: Remove selected chip
- **Tab**: Standard focus navigation

## ✨ Features

- **Email Validation**: Built-in email validation with `validateEmail` prop
- **Duplicate Prevention**: Control duplicates with `allowDuplicates`
- **Chip Limits**: Set maximum chips with `maxChips`
- **Custom Separators**: Define chip creation triggers
- **Size Variants**: Three size options (small, medium, large)
- **Keyboard Navigation**: Full keyboard accessibility
- **Error Handling**: Built-in error states and messages
- **Custom Styling**: Flexible CSS class customization
- **Accessibility**: ARIA labels and keyboard support

## 🔗 Related Components

- [InputText](./InputText.md) - Basic text input component
- [InputTextarea](./InputTextarea.md) - Multi-line text input
- [SearchObjectsFromDB](./SearchObjectsFromDB.md) - Database search component
- [TextField](./TextField.md) - Enhanced text field with validation

