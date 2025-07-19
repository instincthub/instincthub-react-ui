# TextArea

**Category:** Forms | **Type:** component

Multi-line text input component with label animation, validation, and character limits

## 🏷️ Tags

`forms`, `textarea`, `input`, `validation`

```tsx
"use client";
import React, { useState } from "react";
import { TextArea } from "@instincthub/react-ui";

/**
 * Example component demonstrating various ways to use the TextArea component
 */
const TextAreaExamples = () => {
  // Form state management
  const [basicText, setBasicText] = useState<string>("");
  const [commentText, setCommentText] = useState<string>("");
  const [descriptionText, setDescriptionText] = useState<string>("");
  const [feedbackText, setFeedbackText] = useState<string>("");
  const [contentText, setContentText] = useState<string>("");
  const [validationText, setValidationText] = useState<string>("");
  
  // Form data for complete form example
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    notes: "",
  });

  // Validation states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Handle input changes for form
  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }
    
    if (formData.notes && formData.notes.length > 500) {
      newErrors.notes = "Notes cannot exceed 500 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      alert("Form submitted successfully!");
    }
  };

  // Character count for limited textarea
  const remainingChars = 500 - feedbackText.length;

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>TextArea Examples</h1>

      {/* Basic TextArea */}
      <div className="ihub-mb-5">
        <h2>Basic TextArea</h2>
        <p>Simple textarea with label and basic functionality</p>
        <TextArea
          name="basicTextArea"
          label="Basic Text Input"
          placeholder="Enter your text here..."
          rows={3}
          setValue={setBasicText}
          helperText="This is a basic textarea example"
        />
      </div>

      {/* TextArea with Character Limit */}
      <div className="ihub-mb-5">
        <h2>TextArea with Character Limit</h2>
        <p>Textarea with character limit and counter</p>
        <TextArea
          name="limitedTextArea"
          label="Feedback (Max 500 characters)"
          placeholder="Share your feedback..."
          rows={4}
          maxLength={500}
          setValue={setFeedbackText}
          helperText={`${remainingChars} characters remaining`}
        />
      </div>

      {/* Required TextArea with Validation */}
      <div className="ihub-mb-5">
        <h2>Required TextArea with Validation</h2>
        <p>Textarea with required validation and error states</p>
        <TextArea
          name="validationTextArea"
          label="Required Description"
          placeholder="This field is required..."
          rows={3}
          required
          setValue={setValidationText}
          error={validationText.trim() === "" ? "This field is required" : ""}
          helperText="Please provide a description"
        />
      </div>

      {/* Disabled TextArea */}
      <div className="ihub-mb-5">
        <h2>Disabled TextArea</h2>
        <p>Textarea in disabled state</p>
        <TextArea
          name="disabledTextArea"
          label="Disabled Text Area"
          defaultValue="This textarea is disabled and cannot be edited."
          rows={2}
          disabled
          helperText="This field is read-only"
        />
      </div>

      {/* Comment TextArea */}
      <div className="ihub-mb-5">
        <h2>Comment TextArea</h2>
        <p>Perfect for comments, reviews, and user feedback</p>
        <TextArea
          name="commentTextArea"
          label="Add a Comment"
          placeholder="What are your thoughts?"
          rows={4}
          setValue={setCommentText}
          helperText="Share your thoughts and feedback"
        />
        {commentText && (
          <div className="ihub-mt-3 ihub-p-3" style={{ backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
            <strong>Preview:</strong>
            <p className="ihub-mb-0 ihub-mt-2">{commentText}</p>
          </div>
        )}
      </div>

      {/* Large Content TextArea */}
      <div className="ihub-mb-5">
        <h2>Large Content TextArea</h2>
        <p>For longer content like articles, descriptions, or documentation</p>
        <TextArea
          name="contentTextArea"
          label="Article Content"
          placeholder="Write your article content here..."
          rows={8}
          setValue={setContentText}
          helperText="Write detailed content for your article"
        />
      </div>

      {/* Complete Form Example */}
      <div className="ihub-mb-5">
        <h2>Complete Form with TextAreas</h2>
        <p>Example of multiple textareas in a form with validation</p>
        
        <form onSubmit={handleSubmit} className="ihub-form">
          <div className="ihub-mb-3">
            <input
              type="text"
              placeholder="Project Title"
              value={formData.title}
              onChange={(e) => handleFormChange("title", e.target.value)}
              className="ihub-input"
              style={{ width: "100%" }}
            />
            {errors.title && <p className="ihub-notes ihub-is_invalid">{errors.title}</p>}
          </div>

          <div className="ihub-mb-3">
            <TextArea
              name="formDescription"
              label="Project Description"
              placeholder="Describe your project in detail..."
              rows={5}
              required
              setValue={(value) => handleFormChange("description", value)}
              error={errors.description}
              helperText="Minimum 10 characters required"
            />
          </div>

          <div className="ihub-mb-3">
            <TextArea
              name="formNotes"
              label="Additional Notes (Optional)"
              placeholder="Any additional information..."
              rows={3}
              maxLength={500}
              setValue={(value) => handleFormChange("notes", value)}
              error={errors.notes}
              helperText={`Optional field. ${500 - formData.notes.length} characters remaining`}
            />
          </div>

          <div className="ihub-buttons">
            <button 
              type="button" 
              className="ihub-outlined-btn"
              onClick={() => {
                setFormData({ title: "", description: "", notes: "" });
                setErrors({});
              }}
            >
              Reset Form
            </button>
            <button type="submit" className="ihub-important-btn">
              Submit Project
            </button>
          </div>
        </form>
      </div>

      {/* Auto-resize Simulation */}
      <div className="ihub-mb-5">
        <h2>Different Sizes</h2>
        <p>TextAreas with different row sizes</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <h4>Small (2 rows)</h4>
            <TextArea
              name="smallTextArea"
              label="Small TextArea"
              placeholder="Brief note..."
              rows={2}
              helperText="For short notes"
            />
          </div>
          
          <div className="ihub-col-md-4">
            <h4>Medium (4 rows)</h4>
            <TextArea
              name="mediumTextArea"
              label="Medium TextArea"
              placeholder="Moderate content..."
              rows={4}
              helperText="For moderate content"
            />
          </div>
          
          <div className="ihub-col-md-4">
            <h4>Large (6 rows)</h4>
            <TextArea
              name="largeTextArea"
              label="Large TextArea"
              placeholder="Detailed content..."
              rows={6}
              helperText="For detailed content"
            />
          </div>
        </div>
      </div>

      {/* Practical Use Cases */}
      <div className="ihub-mb-5">
        <h2>Practical Use Cases</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <h4>Contact Form Message</h4>
            <TextArea
              name="contactMessage"
              label="Your Message"
              placeholder="How can we help you?"
              rows={5}
              required
              helperText="Please describe your inquiry"
            />
          </div>
          
          <div className="ihub-col-md-6">
            <h4>Product Review</h4>
            <TextArea
              name="productReview"
              label="Write a Review"
              placeholder="Share your experience with this product..."
              rows={5}
              maxLength={1000}
              helperText="Help others by sharing your honest review"
            />
          </div>
        </div>
        
        <div className="ihub-row ihub-mt-4">
          <div className="ihub-col-md-6">
            <h4>Support Ticket</h4>
            <TextArea
              name="supportTicket"
              label="Describe the Issue"
              placeholder="Please provide detailed information about the issue..."
              rows={6}
              required
              helperText="Include steps to reproduce the issue"
            />
          </div>
          
          <div className="ihub-col-md-6">
            <h4>Event Description</h4>
            <TextArea
              name="eventDescription"
              label="Event Details"
              placeholder="Describe your event..."
              rows={6}
              helperText="Include date, time, location, and activities"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextAreaExamples;
```

## 🔗 Related Components

- [InputText](./InputText.md) - Single-line text input component
- [InputTextarea](./InputTextarea.md) - Alternative textarea implementation
- [TextField](./TextField.md) - Advanced text field component
- [PasswordField](./PasswordField.md) - Secure password input field
- [SearchField](./SearchField.md) - Search input field component

