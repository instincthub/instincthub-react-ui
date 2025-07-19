# InputTextarea

**Category:** Form | **Type:** component

A modern, auto-resizing textarea component with floating labels, validation states, and comprehensive customization options

## 🏷️ Tags

`form`, `textarea`, `input`, `auto-resize`, `validation`

```tsx
"use client";
import React, { useState } from "react";
import { InputTextarea } from "@instincthub/react-ui";

/**
 * Comprehensive examples demonstrating various InputTextarea configurations
 */
const InputTextareaExamples = () => {
  // Basic textarea state
  const [basicText, setBasicText] = useState("");
  
  // Form data states
  const [formData, setFormData] = useState({
    description: "",
    feedback: "",
    comments: "",
    notes: "",
    bio: "",
    message: ""
  });

  // Validation states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [characterCount, setCharacterCount] = useState(0);
  const MAX_CHARACTERS = 500;

  // Handle basic input change
  const handleBasicChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBasicText(e.target.value);
  };

  // Handle form input changes
  const handleFormChange = (field: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Update character count for specific fields
    if (field === 'bio') {
      setCharacterCount(value.length);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    // Validate required fields
    if (!formData.feedback.trim()) {
      newErrors.feedback = "Feedback is required";
    } else if (formData.feedback.length < 10) {
      newErrors.feedback = "Feedback must be at least 10 characters";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    
    if (formData.bio.length > MAX_CHARACTERS) {
      newErrors.bio = `Bio must not exceed ${MAX_CHARACTERS} characters`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success - submit form
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
    
    // Reset form
    setFormData({
      description: "",
      feedback: "",
      comments: "",
      notes: "",
      bio: "",
      message: ""
    });
    setCharacterCount(0);
  };

  return (
    <div className="ihub-container ihub-py-5">
      <h1 className="ihub-mb-5">InputTextarea Examples</h1>

      {/* Basic Example */}
      <section className="ihub-mb-6">
        <h2 className="ihub-mb-3">Basic Textarea</h2>
        <p className="ihub-mb-4">Simple textarea with auto-resize functionality</p>
        
        <InputTextarea
          label="Basic Message"
          value={basicText}
          onChange={handleBasicChange}
          placeholder="Type your message here..."
          helperText="This textarea automatically resizes as you type"
        />
      </section>

      {/* Auto-Resize Configurations */}
      <section className="ihub-mb-6">
        <h2 className="ihub-mb-3">Auto-Resize Configurations</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <InputTextarea
              label="Minimum 2 Rows"
              value={formData.notes}
              onChange={handleFormChange('notes')}
              placeholder="Min 2 rows..."
              minRows={2}
              helperText="Starts with 2 rows minimum"
            />
          </div>
          <div className="ihub-col-md-4">
            <InputTextarea
              label="Limited to 4 Rows"
              value={formData.comments}
              onChange={handleFormChange('comments')}
              placeholder="Max 4 rows..."
              minRows={2}
              maxRows={4}
              helperText="Grows up to 4 rows, then scrolls"
            />
          </div>
          <div className="ihub-col-md-4">
            <InputTextarea
              label="Fixed Size"
              value={formData.message}
              onChange={handleFormChange('message')}
              placeholder="Fixed height..."
              autoResize={false}
              rows={3}
              helperText="Fixed height, no auto-resize"
            />
          </div>
        </div>
      </section>

      {/* Character Count Example */}
      <section className="ihub-mb-6">
        <h2 className="ihub-mb-3">Character Limit & Counter</h2>
        <InputTextarea
          label="Bio"
          value={formData.bio}
          onChange={handleFormChange('bio')}
          placeholder="Tell us about yourself..."
          maxLength={MAX_CHARACTERS}
          error={errors.bio}
          helperText={`${characterCount}/${MAX_CHARACTERS} characters ${
            characterCount > MAX_CHARACTERS * 0.9 ? '(nearing limit)' : ''
          }`}
          minRows={3}
          maxRows={6}
        />
      </section>

      {/* Validation States */}
      <section className="ihub-mb-6">
        <h2 className="ihub-mb-3">Validation States</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <InputTextarea
              label="Feedback (Required)"
              value={formData.feedback}
              onChange={handleFormChange('feedback')}
              placeholder="Share your feedback..."
              error={errors.feedback}
              required
              minRows={3}
              maxRows={6}
            />
          </div>
          <div className="ihub-col-md-6">
            <InputTextarea
              label="Description (Required)"
              value={formData.description}
              onChange={handleFormChange('description')}
              placeholder="Describe the issue..."
              error={errors.description}
              required
              minRows={3}
              helperText="Please provide a detailed description"
            />
          </div>
        </div>
      </section>

      {/* Text Transform Examples */}
      <section className="ihub-mb-6">
        <h2 className="ihub-mb-3">Text Transform Options</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-3">
            <InputTextarea
              label="Uppercase"
              placeholder="TRANSFORMS TO UPPERCASE"
              textTransform="uppercase"
              minRows={2}
            />
          </div>
          <div className="ihub-col-md-3">
            <InputTextarea
              label="Lowercase"
              placeholder="transforms to lowercase"
              textTransform="lowercase"
              minRows={2}
            />
          </div>
          <div className="ihub-col-md-3">
            <InputTextarea
              label="Capitalize"
              placeholder="Capitalizes Each Word"
              textTransform="capitalize"
              minRows={2}
            />
          </div>
          <div className="ihub-col-md-3">
            <InputTextarea
              label="Normal"
              placeholder="No transformation"
              textTransform="none"
              minRows={2}
            />
          </div>
        </div>
      </section>

      {/* Real-world Use Cases */}
      <section className="ihub-mb-6">
        <h2 className="ihub-mb-3">Real-world Use Cases</h2>
        
        {/* Feedback Form */}
        <div className="ihub-card ihub-mb-4">
          <div className="ihub-card-header">
            <h3>Customer Feedback Form</h3>
          </div>
          <div className="ihub-card-body">
            <form onSubmit={handleSubmit}>
              <InputTextarea
                label="Your Feedback"
                value={formData.feedback}
                onChange={handleFormChange('feedback')}
                placeholder="Please share your thoughts and experiences..."
                error={errors.feedback}
                required
                minRows={4}
                maxRows={8}
                helperText="Help us improve by sharing your honest feedback"
              />
              
              <div className="ihub-mt-4">
                <button 
                  type="submit" 
                  className="ihub-important-btn"
                  disabled={!formData.feedback.trim()}
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Comment System */}
        <div className="ihub-card ihub-mb-4">
          <div className="ihub-card-header">
            <h3>Comment System</h3>
          </div>
          <div className="ihub-card-body">
            <InputTextarea
              label="Add a Comment"
              placeholder="Share your thoughts..."
              minRows={2}
              maxRows={6}
              helperText="Be respectful and constructive in your comments"
              note="Comments are moderated and may take some time to appear"
            />
          </div>
        </div>

        {/* Support Ticket */}
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Support Ticket Description</h3>
          </div>
          <div className="ihub-card-body">
            <InputTextarea
              label="Problem Description"
              placeholder="Please describe the issue you're experiencing in detail..."
              minRows={5}
              maxRows={10}
              helperText="Include steps to reproduce, expected behavior, and actual behavior"
              note="The more details you provide, the faster we can help resolve your issue"
              required
            />
          </div>
        </div>
      </section>

      {/* Accessibility Features */}
      <section className="ihub-mb-6">
        <h2 className="ihub-mb-3">Accessibility Features</h2>
        <p className="ihub-mb-4">All textareas include proper ARIA labels, keyboard navigation, and screen reader support:</p>
        
        <InputTextarea
          label="Accessible Textarea"
          placeholder="This textarea is fully accessible..."
          helperText="Includes proper ARIA labels and keyboard navigation"
          note="Screen readers will announce the label, current value, and any error messages"
          minRows={3}
        />
      </section>

      {/* Performance Note */}
      <section className="ihub-mb-6">
        <div className="ihub-alert ihub-alert-info">
          <h4>Performance Tips</h4>
          <ul>
            <li>Auto-resize is optimized and only recalculates when content changes</li>
            <li>Use <code>maxRows</code> to prevent excessive height growth</li>
            <li>Consider disabling <code>autoResize</code> for very large text content</li>
            <li>The component uses controlled inputs for better form integration</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default InputTextareaExamples;
```

## 🔗 Related Components

- [InputNumber](./InputNumber.md) - InputNumber component for numerical input
- [InputText](./InputText.md) - InputText component for text input
- [SearchObjectsFromDB](./SearchObjectsFromDB.md) - SearchObjectsFromDB component for searching objects from database
- [ToggleButton](./ToggleButton.md) - ToggleButton component for changing state.
- [DateInputPicker](./DateInputPicker.md) - DateInputPicker component for picking date and time.

