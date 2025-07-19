# SubmitButton

**Category:** Forms | **Type:** component

Advanced form submission button with loading states, status management, and accessibility features

## 🏷️ Tags

`forms`, `button`, `action`, `loading`, `status`

```tsx
"use client";
import React, { useState, FormEvent } from "react";
import {
  SubmitButton,
  InputText,
  InputTextarea,
  MultiPurposeModal,
} from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

/**
 * Example component demonstrating various ways to use the SubmitButton
 */
const SubmitButtonExamples = () => {
  // Status states for different examples
  const [basicStatus, setBasicStatus] = useState<number>(1);
  const [formStatus, setFormStatus] = useState<number>(1);
  const [asyncStatus, setAsyncStatus] = useState<number>(1);
  const [modalStatus, setModalStatus] = useState<number>(1);
  const [uploaderStatus, setUploaderStatus] = useState<number>(1);

  // Form data
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    bio: "",
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Handle input changes
  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Basic button click handlers
  const handleBasicSubmit = async () => {
    setBasicStatus(0); // Set to loading

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setBasicStatus(2); // Success
      openToast("Basic submission successful!");
      
      // Auto-reset after 3 seconds
      setTimeout(() => setBasicStatus(1), 3000);
    } catch (error) {
      setBasicStatus(3); // Error
      openToast("Basic submission failed!");
      setTimeout(() => setBasicStatus(1), 3000);
    }
  };

  // Form submission handlers
  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus(0); // Loading

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2500));
      
      console.log("Contact form submitted:", contactForm);
      setFormStatus(2); // Success
      openToast("Contact form submitted successfully!");
      
      // Reset form after success
      setTimeout(() => {
        setContactForm({ name: "", email: "", message: "" });
        setFormStatus(1);
      }, 2000);
    } catch (error) {
      setFormStatus(3); // Error
      openToast("Failed to submit contact form!");
      setTimeout(() => setFormStatus(1), 3000);
    }
  };

  // Async operation handler
  const handleAsyncOperation = async () => {
    setAsyncStatus(0); // Loading

    try {
      // Simulate multiple async operations
      await new Promise((resolve) => setTimeout(resolve, 1000));
      openToast("Step 1 completed...");
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      openToast("Step 2 completed...");
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setAsyncStatus(2); // Success
      openToast("All operations completed!");
      setTimeout(() => setAsyncStatus(1), 3000);
    } catch (error) {
      setAsyncStatus(3); // Error
      openToast("Operation failed!");
      setTimeout(() => setAsyncStatus(1), 3000);
    }
  };

  // Modal form submission
  const handleModalSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalStatus(0);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      console.log("Profile updated:", userProfile);
      setModalStatus(2);
      openToast("Profile updated successfully!");
      
      setTimeout(() => {
        setIsModalOpen(false);
        setModalStatus(1);
      }, 1500);
    } catch (error) {
      setModalStatus(3);
      openToast("Failed to update profile!");
      setTimeout(() => setModalStatus(1), 3000);
    }
  };

  // File upload simulation
  const handleFileUpload = async () => {
    setUploaderStatus(0);

    try {
      // Simulate file upload with progress
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      setUploaderStatus(2);
      openToast("File uploaded successfully!");
      setTimeout(() => setUploaderStatus(1), 3000);
    } catch (error) {
      setUploaderStatus(3);
      openToast("File upload failed!");
      setTimeout(() => setUploaderStatus(1), 3000);
    }
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>SubmitButton Examples</h1>

      {/* Basic Usage Section */}
      <section className="ihub-mb-5">
        <h2>Basic Button Variants</h2>
        <p>Different button styles and variants available:</p>
        
        <div className="ihub-d-flex ihub-py-3" style={{ gap: "15px", flexWrap: "wrap" }}>
          <SubmitButton
            label="Important Button"
            variant="important"
            status={basicStatus}
            onClick={handleBasicSubmit}
            type="button"
          />
          
          <SubmitButton
            label="Primary Button"
            variant="primary"
            status={1}
            type="button"
            onClick={() => openToast("Primary button clicked!")}
          />
          
          <SubmitButton
            label="Outlined Button"
            variant="outlined"
            status={1}
            type="button"
            onClick={() => openToast("Outlined button clicked!")}
          />
          
          <SubmitButton
            label="Danger Button"
            variant="danger"
            status={1}
            type="button"
            onClick={() => openToast("Danger button clicked!")}
          />
          
          <SubmitButton
            label="Default Button"
            variant="default"
            status={1}
            type="button"
            onClick={() => openToast("Default button clicked!")}
          />
        </div>
      </section>

      {/* Icon Variants Section */}
      <section className="ihub-mb-5">
        <h2>Icon Button Variants</h2>
        <p>Buttons with icons and icon-only variants:</p>
        
        <div className="ihub-d-flex ihub-py-3" style={{ gap: "15px", flexWrap: "wrap" }}>
          <SubmitButton
            variant="icon"
            label={<SaveIcon />}
            status={1}
            type="button"
            ariaLabel="Save"
            onClick={() => openToast("Save icon clicked!")}
          />
          
          <SubmitButton
            variant="icon"
            label={<DeleteIcon />}
            status={1}
            type="button"
            ariaLabel="Delete"
            onClick={() => openToast("Delete icon clicked!")}
          />
          
          <SubmitButton
            variant="icon"
            label={<CalendarMonthOutlinedIcon />}
            status={1}
            type="button"
            ariaLabel="Calendar"
            onClick={() => openToast("Calendar icon clicked!")}
          />
          
          <SubmitButton
            label={
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CloudUploadIcon />
                Upload File
              </span>
            }
            variant="primary"
            status={uploaderStatus}
            onClick={handleFileUpload}
            type="button"
          />
        </div>
      </section>

      {/* Loading States Section */}
      <section className="ihub-mb-5">
        <h2>Loading States & Status Management</h2>
        <p>Demonstrates different status states (0=loading, 1=ready, 2=success, 3=error):</p>
        
        <div className="ihub-d-flex ihub-py-3" style={{ gap: "15px", flexWrap: "wrap" }}>
          <SubmitButton
            label="Loading State"
            status={0}
            variant="important"
            type="button"
          />
          
          <SubmitButton
            label="Ready State"
            status={1}
            variant="primary"
            type="button"
            onClick={() => openToast("Button is ready!")}
          />
          
          <SubmitButton
            label="Success State"
            status={2}
            variant="outlined"
            type="button"
          />
          
          <SubmitButton
            label="Error State"
            status={3}
            variant="danger"
            type="button"
          />
          
          <SubmitButton
            label="Disabled Button"
            status={1}
            variant="default"
            disabled={true}
            type="button"
          />
        </div>
      </section>

      {/* Form Integration Section */}
      <section className="ihub-mb-5">
        <h2>Form Integration</h2>
        <p>Submit button integrated within a form with validation:</p>
        
        <form onSubmit={handleContactSubmit} className="ihub-form" style={{ maxWidth: "500px" }}>
          <InputText
            label="Full Name"
            id="contact-name"
            name="name"
            type="text"
            value={contactForm.name}
            onChange={handleContactChange}
            className="ihub-input"
            required
          />

          <InputText
            label="Email Address"
            id="contact-email"
            name="email"
            type="email"
            value={contactForm.email}
            onChange={handleContactChange}
            className="ihub-input"
            required
          />

          <InputTextarea
            label="Message"
            id="contact-message"
            name="message"
            value={contactForm.message}
            onChange={handleContactChange}
            className="ihub-input"
            rows={4}
            required
          />

          <div className="ihub-buttons ihub-mt-3">
            <SubmitButton
              label="Send Message"
              status={formStatus}
              variant="important"
              type="submit"
              disabled={!contactForm.name || !contactForm.email || !contactForm.message}
            />
            
            <SubmitButton
              label="Clear Form"
              variant="outlined"
              type="button"
              onClick={() => setContactForm({ name: "", email: "", message: "" })}
            />
          </div>
        </form>
      </section>

      {/* Async Operations Section */}
      <section className="ihub-mb-5">
        <h2>Async Operations</h2>
        <p>Button handling complex asynchronous operations:</p>
        
        <div className="ihub-py-3">
          <SubmitButton
            label="Run Multi-Step Operation"
            status={asyncStatus}
            variant="primary"
            onClick={handleAsyncOperation}
            type="button"
            autoResetTimeout={5000}
          />
          
          <p className="ihub-mt-2 ihub-text-muted">
            This button demonstrates a multi-step async operation with progress updates
          </p>
        </div>
      </section>

      {/* Auto-Reset Feature Section */}
      <section className="ihub-mb-5">
        <h2>Auto-Reset Feature</h2>
        <p>Buttons with different auto-reset timeouts:</p>
        
        <div className="ihub-d-flex ihub-py-3" style={{ gap: "15px", flexWrap: "wrap" }}>
          <SubmitButton
            label="Quick Reset (3s)"
            status={1}
            variant="outlined"
            autoResetTimeout={3000}
            onClick={() => openToast("Quick reset button!")}
            type="button"
          />
          
          <SubmitButton
            label="Standard Reset (30s)"
            status={1}
            variant="primary"
            autoResetTimeout={30000}
            onClick={() => openToast("Standard reset button!")}
            type="button"
          />
          
          <SubmitButton
            label="No Auto-Reset"
            status={1}
            variant="default"
            autoResetTimeout={0}
            onClick={() => openToast("No auto-reset!")}
            type="button"
          />
        </div>
      </section>

      {/* Modal Integration Section */}
      <section className="ihub-mb-5">
        <h2>Modal Integration</h2>
        <p>Submit button working within modal dialogs:</p>
        
        <div className="ihub-py-3">
          <SubmitButton
            label="Open Profile Editor"
            variant="important"
            onClick={() => setIsModalOpen(true)}
            type="button"
          />
        </div>
      </section>

      {/* Accessibility Section */}
      <section className="ihub-mb-5">
        <h2>Accessibility Features</h2>
        <p>Proper ARIA labels and accessibility support:</p>
        
        <div className="ihub-d-flex ihub-py-3" style={{ gap: "15px", flexWrap: "wrap" }}>
          <SubmitButton
            label={<SaveIcon />}
            variant="icon"
            ariaLabel="Save document to server"
            status={1}
            type="button"
            onClick={() => openToast("Save with ARIA label!")}
          />
          
          <SubmitButton
            label="Submit Order"
            variant="important"
            status={1}
            ariaLabel="Submit your order for processing"
            id="order-submit-btn"
            testId="order-submit"
            type="button"
            onClick={() => openToast("Order submitted!")}
          />
        </div>
      </section>

      {/* Custom Styling Section */}
      <section className="ihub-mb-5">
        <h2>Custom Styling</h2>
        <p>Buttons with custom CSS classes and styling:</p>
        
        <div className="ihub-d-flex ihub-py-3" style={{ gap: "15px", flexWrap: "wrap" }}>
          <SubmitButton
            label="Custom Styled"
            variant="primary"
            status={1}
            className="custom-submit-btn"
            style={{ borderRadius: "25px", fontSize: "14px" }}
            type="button"
            onClick={() => openToast("Custom styled button!")}
          />
          
          <SubmitButton
            label="Large Button"
            variant="important"
            status={1}
            className="large-btn"
            style={{ padding: "15px 30px", fontSize: "18px" }}
            type="button"
            onClick={() => openToast("Large button clicked!")}
          />
        </div>
      </section>

      {/* Modal Component */}
      <MultiPurposeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Profile"
        size="medium"
        showFooter={true}
        handleSubmit={handleModalSubmit}
        footerContent={
          <div className="ihub-buttons">
            <SubmitButton
              label="Cancel"
              variant="outlined"
              onClick={() => setIsModalOpen(false)}
              type="button"
            />
            <SubmitButton
              label="Save Profile"
              variant="important"
              status={modalStatus}
              type="submit"
            />
          </div>
        }
      >
        <InputText
          label="First Name"
          id="profile-firstName"
          name="firstName"
          type="text"
          value={userProfile.firstName}
          onChange={handleProfileChange}
          className="ihub-input"
          required
        />

        <InputText
          label="Last Name"
          id="profile-lastName"
          name="lastName"
          type="text"
          value={userProfile.lastName}
          onChange={handleProfileChange}
          className="ihub-input"
          required
        />

        <InputTextarea
          label="Bio"
          id="profile-bio"
          name="bio"
          value={userProfile.bio}
          onChange={handleProfileChange}
          className="ihub-input"
          rows={3}
          placeholder="Tell us about yourself..."
        />
      </MultiPurposeModal>
    </div>
  );
};

export default SubmitButtonExamples;
```

## 🔗 Related Components

- [InputText](./InputText.md) - Text input field component
- [InputTextarea](./InputTextarea.md) - Textarea input component
- [MultiPurposeModal](./MultiPurposeModal.md) - Modal dialog component
- [ActionDropdown](./ActionDropdown.md) - Dropdown component for actions
- [AnimatedBox](./AnimatedBox.md) - Animated container component

