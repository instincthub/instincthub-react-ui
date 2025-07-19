# ModalExamples

**Category:** Status | **Type:** component

Comprehensive modal examples showcasing MultiPurposeModal usage patterns

## 🏷️ Tags

`status`, `modal`, `overlay`, `dialog`, `form`

```tsx
"use client";
import React, { useState } from "react";
import {
  MultiPurposeModal,
  InputText,
  SubmitButton,
  InputTextarea,
  CheckBoxes,
  ActionDropdown,
} from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive examples demonstrating various modal implementations
 * This component showcases different use cases and configurations for the MultiPurposeModal
 */
const ModalExamplesShowcase = () => {
  // Basic modal states
  const [isBasicModalOpen, setIsBasicModalOpen] = useState<boolean>(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false);
  const [isFullModalOpen, setIsFullModalOpen] = useState<boolean>(false);
  const [isFormModalEventOpen, setIsFormModalEventOpen] = useState<boolean>(false);
  
  // Advanced modal states
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);
  const [isDataDisplayModalOpen, setIsDataDisplayModalOpen] = useState<boolean>(false);
  const [isImageGalleryModalOpen, setIsImageGalleryModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [isWizardModalOpen, setIsWizardModalOpen] = useState<boolean>(false);
  
  const [status, setStatus] = useState<number>(1);
  const [currentWizardStep, setCurrentWizardStep] = useState<number>(1);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    notifications: false,
    newsletter: true,
  });

  const [settingsData, setSettingsData] = useState({
    theme: "dark",
    language: "en",
    autoSave: true,
    twoFactor: false,
  });

  const [wizardData, setWizardData] = useState({
    step1: { projectName: "", description: "" },
    step2: { template: "", features: [] as string[] },
    step3: { team: "", deployment: "" },
  });

  // Sample data for data display modal
  const sampleData = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Moderator" },
  ];

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setSettingsData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submissions
  const handleSubmit = () => {
    console.log("Form submitted with data:", formData);
    openToast("Form submitted successfully!");
    setIsFormModalOpen(false);
  };

  const handleSubmit2 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form event:", e);
    openToast("Check console for form data");
    setIsFormModalEventOpen(false);
  };

  const handleConfirmAction = () => {
    openToast("Action confirmed and executed!");
    setIsConfirmationModalOpen(false);
  };

  const handleSaveSettings = () => {
    console.log("Settings saved:", settingsData);
    openToast("Settings saved successfully!");
    setIsSettingsModalOpen(false);
  };

  const handleWizardNext = () => {
    if (currentWizardStep < 3) {
      setCurrentWizardStep(prev => prev + 1);
    } else {
      console.log("Wizard completed:", wizardData);
      openToast("Project setup completed!");
      setIsWizardModalOpen(false);
      setCurrentWizardStep(1);
    }
  };

  const handleWizardBack = () => {
    if (currentWizardStep > 1) {
      setCurrentWizardStep(prev => prev - 1);
    }
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>Comprehensive Modal Examples</h1>
      <p className="ihub-mb-4">
        Explore various modal implementations using the MultiPurposeModal component.
        From simple confirmations to complex multi-step wizards.
      </p>

      {/* Modal Trigger Buttons */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Basic Modal Types</h2>
        <div className="ihub-d-flex" style={{ gap: "15px", flexWrap: "wrap" }}>
          <button
            className="ihub-important-btn"
            onClick={() => setIsBasicModalOpen(true)}
          >
            Basic Information Modal
          </button>

          <button
            className="ihub-outlined-btn"
            onClick={() => setIsFormModalOpen(true)}
          >
            Form Modal
          </button>

          <button
            className="ihub-outlined-btn"
            onClick={() => setIsFormModalEventOpen(true)}
          >
            Form with Event Handler
          </button>

          <button
            className="ihub-primary-btn"
            onClick={() => setIsCustomModalOpen(true)}
          >
            Custom Modal
          </button>

          <button
            className="ihub-danger-btn"
            onClick={() => setIsFullModalOpen(true)}
          >
            Full Screen Modal
          </button>
        </div>
      </section>

      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Advanced Modal Patterns</h2>
        <div className="ihub-d-flex" style={{ gap: "15px", flexWrap: "wrap" }}>
          <button
            className="ihub-warning-btn"
            onClick={() => setIsConfirmationModalOpen(true)}
          >
            Confirmation Dialog
          </button>

          <button
            className="ihub-info-btn"
            onClick={() => setIsDataDisplayModalOpen(true)}
          >
            Data Display Modal
          </button>

          <button
            className="ihub-secondary-btn"
            onClick={() => setIsImageGalleryModalOpen(true)}
          >
            Image Gallery Modal
          </button>

          <button
            className="ihub-success-btn"
            onClick={() => setIsSettingsModalOpen(true)}
          >
            Settings Modal
          </button>

          <button
            className="ihub-gradient-btn"
            onClick={() => setIsWizardModalOpen(true)}
          >
            Multi-Step Wizard
          </button>
        </div>
      </section>

      {/* Basic Information Modal */}
      <MultiPurposeModal
        isOpen={isBasicModalOpen}
        onClose={() => setIsBasicModalOpen(false)}
        title="Basic Information Modal"
        size="small"
        showFooter={true}
      >
        <div className="ihub-p-3">
          <p>This is a basic modal with default settings. It includes:</p>
          <ul className="ihub-mt-3">
            <li>A title in the header</li>
            <li>Content in the body</li>
            <li>A footer with default buttons</li>
            <li>Small size (400px max width)</li>
            <li>Overlay click to close</li>
            <li>ESC key to close</li>
          </ul>
          
          <div className="ihub-mt-4 ihub-p-3" style={{ backgroundColor: "#f8f9fa", borderRadius: "6px" }}>
            <strong>Use Case:</strong> Simple information display, alerts, or basic confirmations.
          </div>
        </div>
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
        <div className="ihub-form">
          <InputText
            label="Full Name"
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            className="ihub-input ihub-mb-3"
            required
          />

          <InputText
            label="Email Address"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="ihub-input ihub-mb-3"
            required
          />

          <InputTextarea
            label="Message"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="ihub-input ihub-mb-3"
            rows={4}
            placeholder="Enter your message..."
          />

          <div className="ihub-d-flex ihub-flex-column" style={{ gap: "10px" }}>
            <label className="ihub-checkbox-container">
              <input
                type="checkbox"
                name="notifications"
                checked={formData.notifications}
                onChange={handleInputChange}
              />
              <span className="ihub-checkmark"></span>
              Enable email notifications
            </label>
            
            <label className="ihub-checkbox-container">
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleInputChange}
              />
              <span className="ihub-checkmark"></span>
              Subscribe to newsletter
            </label>
          </div>
        </div>
      </MultiPurposeModal>

      {/* Form Modal with Event Handler */}
      <MultiPurposeModal
        title="Form Modal with Event"
        isOpen={isFormModalEventOpen}
        onClose={() => setIsFormModalEventOpen(false)}
        size="medium"
        showFooter={true}
        handleSubmit={handleSubmit2}
        footerContent={
          <div className="ihub-buttons">
            <button
              className="ihub-outlined-btn"
              type="button"
              onClick={() => setIsFormModalEventOpen(false)}
            >
              Cancel
            </button>
            <SubmitButton 
              label="Submit with Event" 
              type="submit" 
              status={status} 
              className="ihub-important-btn"
            />
          </div>
        }
      >
        <div className="ihub-form">
          <p className="ihub-mb-3 ihub-text-muted">
            This modal captures the form submit event and passes it to the handler.
          </p>
          
          <InputText
            label="Full Name"
            id="name-event"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            className="ihub-input ihub-mb-3"
            required
          />

          <InputText
            label="Email Address"
            id="email-event"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="ihub-input"
            required
          />
        </div>
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
          <p>This modal demonstrates advanced customization:</p>
          <ul className="ihub-my-3">
            <li>No formal header section (title is in the body)</li>
            <li>Custom close button still included</li>
            <li>Large size variant (900px max width)</li>
            <li>Overlay click is disabled (can only close via button)</li>
            <li>No footer section</li>
            <li>Custom CSS classes applied</li>
          </ul>

          <div className="ihub-card ihub-mt-4">
            <div className="ihub-card-header">
              <h3>Embedded Content Example</h3>
            </div>
            <div className="ihub-card-body">
              <p>You can embed any content, including other components like cards, forms, or data tables.</p>
              <div className="ihub-d-flex" style={{ gap: "10px", marginTop: "15px" }}>
                <span className="ihub-badge ihub-badge-primary">Custom Badge</span>
                <span className="ihub-badge ihub-badge-success">Another Badge</span>
                <span className="ihub-badge ihub-badge-warning">Warning Badge</span>
              </div>
            </div>
          </div>

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
        <div style={{ minHeight: "80vh", padding: "20px" }}>
          <h3>Full-Screen Modal Content</h3>
          <p>
            Perfect for immersive experiences, detailed forms, or content that
            requires maximum screen real estate. This modal takes over the
            entire viewport.
          </p>

          <div className="ihub-row ihub-mt-4">
            <div className="ihub-col-md-4">
              <div className="ihub-card">
                <div className="ihub-card-header">
                  <h4>Feature 1</h4>
                </div>
                <div className="ihub-card-body">
                  <p>Use full-screen modals for complex workflows, dashboards, or detailed content presentation.</p>
                </div>
              </div>
            </div>
            
            <div className="ihub-col-md-4">
              <div className="ihub-card">
                <div className="ihub-card-header">
                  <h4>Feature 2</h4>
                </div>
                <div className="ihub-card-body">
                  <p>Ideal for image editors, document viewers, or any application requiring maximum screen space.</p>
                </div>
              </div>
            </div>
            
            <div className="ihub-col-md-4">
              <div className="ihub-card">
                <div className="ihub-card-header">
                  <h4>Feature 3</h4>
                </div>
                <div className="ihub-card-body">
                  <p>Maintains all modal functionality while providing a fullscreen experience.</p>
                </div>
              </div>
            </div>
          </div>

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

      {/* Confirmation Dialog */}
      <MultiPurposeModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        title="Confirm Action"
        size="small"
        showFooter={true}
        footerContent={
          <div className="ihub-buttons">
            <button
              className="ihub-outlined-btn"
              onClick={() => setIsConfirmationModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="ihub-danger-btn"
              onClick={handleConfirmAction}
            >
              Confirm Delete
            </button>
          </div>
        }
      >
        <div className="ihub-text-center ihub-p-3">
          <div className="ihub-mb-3">
            <span className="ihub-icon-warning" style={{ fontSize: "48px", color: "#ff6b6b" }}>⚠️</span>
          </div>
          <h3>Are you sure?</h3>
          <p className="ihub-mt-3">
            This action cannot be undone. This will permanently delete the selected item and all associated data.
          </p>
          <div className="ihub-mt-3 ihub-p-3" style={{ backgroundColor: "#fff3cd", borderRadius: "6px", border: "1px solid #ffeaa7" }}>
            <strong>Warning:</strong> 5 related items will also be affected.
          </div>
        </div>
      </MultiPurposeModal>

      {/* Data Display Modal */}
      <MultiPurposeModal
        isOpen={isDataDisplayModalOpen}
        onClose={() => setIsDataDisplayModalOpen(false)}
        title="User Management"
        size="large"
        showFooter={true}
        footerContent={
          <div className="ihub-buttons">
            <button
              className="ihub-outlined-btn"
              onClick={() => setIsDataDisplayModalOpen(false)}
            >
              Close
            </button>
            <button className="ihub-primary-btn">
              Export Data
            </button>
          </div>
        }
      >
        <div>
          <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center ihub-mb-3">
            <h3>System Users</h3>
            <button className="ihub-success-btn">Add New User</button>
          </div>
          
          <table className="ihub-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`ihub-badge ${
                      user.role === 'Admin' ? 'ihub-badge-danger' :
                      user.role === 'Moderator' ? 'ihub-badge-warning' :
                      'ihub-badge-primary'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <div className="ihub-d-flex" style={{ gap: "5px" }}>
                      <button className="ihub-btn-sm ihub-outlined-btn">Edit</button>
                      <button className="ihub-btn-sm ihub-danger-btn">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="ihub-mt-3 ihub-text-muted">
            Showing 3 of 150 users
          </div>
        </div>
      </MultiPurposeModal>

      {/* Settings Modal */}
      <MultiPurposeModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        title="Application Settings"
        size="medium"
        showFooter={true}
        footerContent={
          <div className="ihub-buttons">
            <button
              className="ihub-outlined-btn"
              onClick={() => setIsSettingsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="ihub-success-btn"
              onClick={handleSaveSettings}
            >
              Save Settings
            </button>
          </div>
        }
      >
        <div className="ihub-form">
          <div className="ihub-mb-4">
            <h3>Appearance</h3>
            <div className="ihub-mb-3">
              <label htmlFor="theme" className="ihub-form-label">Theme</label>
              <select
                id="theme"
                name="theme"
                value={settingsData.theme}
                onChange={handleSettingsChange}
                className="ihub-input"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            
            <div className="ihub-mb-3">
              <label htmlFor="language" className="ihub-form-label">Language</label>
              <select
                id="language"
                name="language"
                value={settingsData.language}
                onChange={handleSettingsChange}
                className="ihub-input"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
          
          <div className="ihub-mb-4">
            <h3>Preferences</h3>
            <div className="ihub-d-flex ihub-flex-column" style={{ gap: "15px" }}>
              <label className="ihub-checkbox-container">
                <input
                  type="checkbox"
                  name="autoSave"
                  checked={settingsData.autoSave}
                  onChange={handleSettingsChange}
                />
                <span className="ihub-checkmark"></span>
                Enable auto-save
              </label>
              
              <label className="ihub-checkbox-container">
                <input
                  type="checkbox"
                  name="twoFactor"
                  checked={settingsData.twoFactor}
                  onChange={handleSettingsChange}
                />
                <span className="ihub-checkmark"></span>
                Enable two-factor authentication
              </label>
            </div>
          </div>
        </div>
      </MultiPurposeModal>

      {/* Multi-Step Wizard Modal */}
      <MultiPurposeModal
        isOpen={isWizardModalOpen}
        onClose={() => {
          setIsWizardModalOpen(false);
          setCurrentWizardStep(1);
        }}
        title={`Project Setup - Step ${currentWizardStep} of 3`}
        size="large"
        showFooter={true}
        footerContent={
          <div className="ihub-buttons">
            <button
              className="ihub-outlined-btn"
              onClick={() => {
                setIsWizardModalOpen(false);
                setCurrentWizardStep(1);
              }}
            >
              Cancel
            </button>
            {currentWizardStep > 1 && (
              <button
                className="ihub-secondary-btn"
                onClick={handleWizardBack}
              >
                Back
              </button>
            )}
            <button
              className="ihub-primary-btn"
              onClick={handleWizardNext}
            >
              {currentWizardStep === 3 ? 'Complete Setup' : 'Next'}
            </button>
          </div>
        }
      >
        <div>
          {/* Progress Indicator */}
          <div className="ihub-mb-4">
            <div className="ihub-d-flex ihub-justify-content-between ihub-mb-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`ihub-wizard-step ${
                    step <= currentWizardStep ? 'active' : ''
                  }`}
                >
                  <div className="ihub-step-number">{step}</div>
                  <div className="ihub-step-label">
                    {step === 1 ? 'Project Info' : step === 2 ? 'Configuration' : 'Review'}
                  </div>
                </div>
              ))}
            </div>
            <div className="ihub-progress-bar">
              <div 
                className="ihub-progress-fill" 
                style={{ width: `${(currentWizardStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Content */}
          {currentWizardStep === 1 && (
            <div className="ihub-form">
              <h3>Project Information</h3>
              <div className="ihub-mb-3">
                <label className="ihub-form-label">Project Name</label>
                <input
                  type="text"
                  className="ihub-input"
                  placeholder="Enter project name"
                  value={wizardData.step1.projectName}
                  onChange={(e) => setWizardData(prev => ({
                    ...prev,
                    step1: { ...prev.step1, projectName: e.target.value }
                  }))}
                />
              </div>
              <div className="ihub-mb-3">
                <label className="ihub-form-label">Description</label>
                <textarea
                  className="ihub-input"
                  rows={4}
                  placeholder="Describe your project"
                  value={wizardData.step1.description}
                  onChange={(e) => setWizardData(prev => ({
                    ...prev,
                    step1: { ...prev.step1, description: e.target.value }
                  }))}
                />
              </div>
            </div>
          )}

          {currentWizardStep === 2 && (
            <div className="ihub-form">
              <h3>Project Configuration</h3>
              <div className="ihub-mb-3">
                <label className="ihub-form-label">Template</label>
                <select
                  className="ihub-input"
                  value={wizardData.step2.template}
                  onChange={(e) => setWizardData(prev => ({
                    ...prev,
                    step2: { ...prev.step2, template: e.target.value }
                  }))}
                >
                  <option value="">Select a template</option>
                  <option value="react">React Application</option>
                  <option value="vue">Vue.js Application</option>
                  <option value="angular">Angular Application</option>
                  <option value="node">Node.js API</option>
                </select>
              </div>
              
              <div className="ihub-mb-3">
                <label className="ihub-form-label">Features</label>
                <div className="ihub-d-flex ihub-flex-column" style={{ gap: "10px" }}>
                  {['Authentication', 'Database', 'API Integration', 'Testing Suite'].map((feature) => (
                    <label key={feature} className="ihub-checkbox-container">
                      <input
                        type="checkbox"
                        checked={wizardData.step2.features.includes(feature)}
                        onChange={(e) => {
                          const features = e.target.checked
                            ? [...wizardData.step2.features, feature]
                            : wizardData.step2.features.filter(f => f !== feature);
                          setWizardData(prev => ({
                            ...prev,
                            step2: { ...prev.step2, features }
                          }));
                        }}
                      />
                      <span className="ihub-checkmark"></span>
                      {feature}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentWizardStep === 3 && (
            <div>
              <h3>Review & Deploy</h3>
              <div className="ihub-card">
                <div className="ihub-card-header">
                  <h4>Project Summary</h4>
                </div>
                <div className="ihub-card-body">
                  <div className="ihub-mb-3">
                    <strong>Name:</strong> {wizardData.step1.projectName || 'Not specified'}
                  </div>
                  <div className="ihub-mb-3">
                    <strong>Description:</strong> {wizardData.step1.description || 'Not specified'}
                  </div>
                  <div className="ihub-mb-3">
                    <strong>Template:</strong> {wizardData.step2.template || 'Not selected'}
                  </div>
                  <div className="ihub-mb-3">
                    <strong>Features:</strong> {wizardData.step2.features.length > 0 ? wizardData.step2.features.join(', ') : 'None selected'}
                  </div>
                </div>
              </div>
              
              <div className="ihub-mt-4">
                <h4>Deployment Options</h4>
                <div className="ihub-form">
                  <div className="ihub-mb-3">
                    <label className="ihub-form-label">Team Size</label>
                    <select
                      className="ihub-input"
                      value={wizardData.step3.team}
                      onChange={(e) => setWizardData(prev => ({
                        ...prev,
                        step3: { ...prev.step3, team: e.target.value }
                      }))}
                    >
                      <option value="">Select team size</option>
                      <option value="1-5">1-5 developers</option>
                      <option value="6-20">6-20 developers</option>
                      <option value="21+">21+ developers</option>
                    </select>
                  </div>
                  
                  <div className="ihub-mb-3">
                    <label className="ihub-form-label">Deployment</label>
                    <select
                      className="ihub-input"
                      value={wizardData.step3.deployment}
                      onChange={(e) => setWizardData(prev => ({
                        ...prev,
                        step3: { ...prev.step3, deployment: e.target.value }
                      }))}
                    >
                      <option value="">Select deployment option</option>
                      <option value="development">Development only</option>
                      <option value="staging">Staging environment</option>
                      <option value="production">Production ready</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </MultiPurposeModal>

      {/* Implementation Guide */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Implementation Guide</h2>
        <div className="ihub-card ihub-p-4">
          <h3>Modal Patterns Demonstrated:</h3>
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <ul>
                <li><strong>Basic Information:</strong> Simple content display</li>
                <li><strong>Form Modal:</strong> Data collection with validation</li>
                <li><strong>Event Handling:</strong> Form submission with event capture</li>
                <li><strong>Custom Layout:</strong> No header, custom styling</li>
                <li><strong>Full Screen:</strong> Immersive content experience</li>
              </ul>
            </div>
            <div className="ihub-col-md-6">
              <ul>
                <li><strong>Confirmation:</strong> Action confirmation dialogs</li>
                <li><strong>Data Display:</strong> Tables and structured data</li>
                <li><strong>Settings:</strong> Configuration interfaces</li>
                <li><strong>Wizard:</strong> Multi-step workflows</li>
                <li><strong>Image Gallery:</strong> Media presentation</li>
              </ul>
            </div>
          </div>
          
          <h3 className="ihub-mt-4">Best Practices:</h3>
          <ul>
            <li>Use appropriate modal sizes for content</li>
            <li>Provide clear action buttons in footers</li>
            <li>Handle form validation and user feedback</li>
            <li>Implement proper keyboard navigation (ESC key)</li>
            <li>Use overlay click behavior appropriately</li>
            <li>Maintain accessibility with proper ARIA labels</li>
            <li>Consider mobile responsiveness</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ModalExamplesShowcase;
```

## 🔗 Related Components

- [MultiPurposeModal](./MultiPurposeModal.md) - The base modal component used in all examples
- [Dialog](./Dialog.md) - Alternative dialog component for simple interactions
- [DeleteConfirmationModal](./DeleteConfirmationModal.md) - Specialized modal for delete confirmations
- [InputText](./InputText.md) - Text input component used in modal forms
- [SubmitButton](./SubmitButton.md) - Button component with loading states for modal actions

## 🔗 Related Components

- [TimeTracker](./TimeTracker.md) - Time tracking component
- [SessionHandleProvider](./SessionHandleProvider.md) - Session handling provider component
- [Error500](./Error500.md) - 500 error display component
- [ErrorState](./ErrorState.md) - Error state display component
- [ReactTimeTracker](./ReactTimeTracker.md) - React time tracking component

