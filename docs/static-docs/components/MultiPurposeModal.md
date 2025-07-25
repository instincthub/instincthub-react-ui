# MultiPurposeModal

**Category:** Status | **Type:** component

Multi-purpose modal component

## 🏷️ Tags

`status`, `modal`, `overlay`

```tsx
"use client";
import React, { useState } from "react";
import {
  MultiPurposeModal,
  InputText,
  SubmitButton,
  InputText,
} from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Example component demonstrating various ways to use the MultiPurposeModal
 */
const ModalExamples = () => {
  const [isBasicModalOpen, setIsBasicModalOpen] = useState<boolean>(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false);
  const [isFullModalOpen, setIsFullModalOpen] = useState<boolean>(false);
  const [isFormModalEventOpen, setIsFormModalEventOpen] =
    useState<boolean>(false);
  const [status, setStatus] = useState<number>(1);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Form submitted with data:", formData);
    setIsFormModalOpen(false);
  };

  const handleSubmit2 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form event:", e);
    openToast("Check console for form data");
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>Modal Examples</h1>

      <div
        className="ihub-d-flex ihub-py-5"
        style={{ gap: "20px", flexWrap: "wrap" }}
      >
        {/* Basic Modal Example */}
        <button
          className="ihub-important-btn"
          onClick={() => setIsBasicModalOpen(true)}
        >
          Open Basic Modal
        </button>

        {/* Form Modal Example */}
        <button
          className="ihub-outlined-btn"
          onClick={() => setIsFormModalOpen(true)}
        >
          Open Form Modal
        </button>

        {/* Form Modal Example */}
        <button
          className="ihub-outlined-btn"
          onClick={() => setIsFormModalEventOpen(true)}
        >
          Open Form Modal Event
        </button>

        {/* Custom Modal Example */}
        <button
          className="ihub-primary-btn"
          onClick={() => setIsCustomModalOpen(true)}
        >
          Open Custom Modal
        </button>

        {/* Full Size Modal Example */}
        <button
          className="ihub-danger-btn"
          onClick={() => setIsFullModalOpen(true)}
        >
          Open Full Screen Modal
        </button>
      </div>

      {/* Basic Modal */}
      <MultiPurposeModal
        isOpen={isBasicModalOpen}
        onClose={() => setIsBasicModalOpen(false)}
        title="Basic Information Modal"
        size="small"
        showFooter={true}
      >
        <p>This is a basic modal with default settings. It includes:</p>
        <ul>
          <li>A title in the header</li>
          <li>Content in the body</li>
          <li>A footer with default buttons</li>
          <li>Small size (400px max width)</li>
        </ul>
      </MultiPurposeModal>

      {/* Form Modal */}
      <MultiPurposeModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title="User Information Form"
        size="medium"
        showFooter={true}
        footerContent={
          <div className="ihub-buttons">
            <button
              className="ihub-outlined-btn"
              onClick={() => setIsFormModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="ihub-important-btn"
              onClick={handleSubmit}
              disabled={!formData.name || !formData.email}
            >
              Submit
            </button>
          </div>
        }
      >
        <InputText
          label="Full Name"
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          className="ihub-input"
          required
        />

        <InputText
          label="Email Address"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          className="ihub-input"
          required
        />
      </MultiPurposeModal>

      {/* This allow you get form event: handleSubmit(e) */}
      {/* handleSubmit={()=>{}} must be used */}
      {/* The footerContent button must be a button type="submit" */}
      {/* Form Modal */}
      <MultiPurposeModal
        title="Form Modal with event"
        isOpen={isFormModalEventOpen}
        onClose={() => setIsFormModalEventOpen(false)}
        size="medium"
        showFooter={true}
        handleSubmit={handleSubmit2}
        footerContent={
          <div className="ihub-buttons">
            <button
              className="ihub-outlined-btn"
              onClick={() => setIsFormModalOpen(false)}
            >
              Cancel
            </button>
            <SubmitButton label="Submit" type="submit" status={status} />
          </div>
        }
      >
        <InputText
          label="Full Name"
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          className="ihub-input"
          required
        />

        <InputText
          label="Email Address"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          className="ihub-input"
          required
        />
      </MultiPurposeModal>

      {/* Custom Modal */}
      <MultiPurposeModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        size="large"
        showCloseButton={true}
        closeOnOverlayClick={false}
        className="ihub-custom-modal"
      >
        <div className="ihub-py-3">
          <h2 className="ihub-mb-3">Custom Modal Without Header</h2>
          <p>This modal demonstrates:</p>
          <ul>
            <li>No formal header section (title is in the body)</li>
            <li>Custom close button still included</li>
            <li>Large size variant (900px max width)</li>
            <li>Overlay click is disabled (can only close via button)</li>
            <li>No footer section</li>
          </ul>

          <div className="ihub-d-flex ihub-justify-content-center ihub-mt-4">
            <button
              className="ihub-important-btn"
              onClick={() => setIsCustomModalOpen(false)}
            >
              Close This Modal
            </button>
          </div>
        </div>
      </MultiPurposeModal>

      {/* Full Screen Modal */}
      <MultiPurposeModal
        isOpen={isFullModalOpen}
        onClose={() => setIsFullModalOpen(false)}
        title="Full Screen Experience"
        size="full"
        showFooter={false}
      >
        <div style={{ minHeight: "80vh" }}>
          <h3>This is a full-screen modal</h3>
          <p>
            Perfect for immersive experiences, detailed forms, or content that
            requires maximum screen real estate. This modal takes over the
            entire viewport.
          </p>

          <div className="ihub-mt-5">
            <button
              className="ihub-danger-btn"
              onClick={() => setIsFullModalOpen(false)}
            >
              Close Full Screen Modal
            </button>
          </div>
        </div>
      </MultiPurposeModal>
    </div>
  );
};

export default ModalExamples;
```

## 🔗 Related Components

- [TimeTracker](./TimeTracker.md) - Time tracking component
- [SessionHandleProvider](./SessionHandleProvider.md) - Session handling provider component
- [Error500](./Error500.md) - 500 error display component
- [ErrorState](./ErrorState.md) - Error state display component
- [ReactTimeTracker](./ReactTimeTracker.md) - React time tracking component
