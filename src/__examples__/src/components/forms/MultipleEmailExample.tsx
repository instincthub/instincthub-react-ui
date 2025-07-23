"use client";

import React, { useState } from "react";
import { MultipleEmail, SubmitButton } from "../../../../index";

const MultipleEmailExample: React.FC = () => {
  const [emails1, setEmails1] = useState<string[]>([]);
  const [emails2, setEmails2] = useState<string[]>(["john@example.com", "jane@example.com"]);
  const [emails3, setEmails3] = useState<string[]>([]);
  const [formData, setFormData] = useState({ recipients: [] as string[] });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {[key: string]: string} = {};

    if (formData.recipients.length === 0) {
      newErrors.recipients = "At least one email is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted with emails:", formData.recipients);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>MultipleEmail Examples</h1>
        <p>Multiple email input component for adding and managing email addresses</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Multiple Emails */}
        <div className="ihub-example-card">
          <h3>Basic Multiple Email Input</h3>
          <p>Simple email list with add and remove functionality</p>
          
          <MultipleEmail
            label="Email Addresses"
            emails={emails1}
            onChange={setEmails1}
            placeholder="Enter email address and press Enter"
          />
          
          <div className="ihub-email-display ihub-mt-3">
            <strong>Current Emails ({emails1.length}):</strong>
            {emails1.length === 0 ? (
              <p className="ihub-empty-state">No emails added yet</p>
            ) : (
              <ul className="ihub-email-list">
                {emails1.map((email, index) => (
                  <li key={index} className="ihub-email-item">{email}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Pre-populated Emails */}
        <div className="ihub-example-card">
          <h3>Pre-populated Email List</h3>
          <p>Email input with existing email addresses</p>
          
          <MultipleEmail
            label="Team Members"
            emails={emails2}
            onChange={setEmails2}
            placeholder="Add more team members..."
            maxEmails={10}
            showCount={true}
          />
        </div>

        {/* Email Validation */}
        <div className="ihub-example-card">
          <h3>Email Validation</h3>
          <p>Email input with validation and error handling</p>
          
          <MultipleEmail
            label="Newsletter Recipients"
            emails={emails3}
            onChange={setEmails3}
            placeholder="Enter valid email addresses..."
            validate={validateEmail}
            allowDuplicates={false}
            showValidation={true}
          />
        </div>

        {/* Form Integration */}
        <div className="ihub-example-card">
          <h3>Form Integration</h3>
          <p>Multiple email input integrated with form submission</p>
          
          <form onSubmit={handleSubmit}>
            <MultipleEmail
              label="Email Recipients"
              emails={formData.recipients}
              onChange={(emails) => setFormData({...formData, recipients: emails})}
              placeholder="Add email recipients..."
              required={true}
              error={errors.recipients}
              maxEmails={5}
              showCount={true}
              validate={validateEmail}
            />
            
            <SubmitButton
              title="Send Emails"
              status={1}
              className="ihub-important-btn"
            />
          </form>
        </div>

        {/* Advanced Features */}
        <div className="ihub-example-card">
          <h3>Advanced Email Input</h3>
          <p>Email input with advanced features and customization</p>
          
          <MultipleEmail
            label="Advanced Recipients"
            emails={emails3}
            onChange={setEmails3}
            placeholder="Enter email addresses..."
            allowPaste={true}
            pasteDelimiter=","
            showSuggestions={true}
            suggestions={[
              "admin@instincthub.com",
              "support@instincthub.com",
              "team@instincthub.com",
              "info@instincthub.com"
            ]}
            maxEmails={20}
            showCount={true}
            validate={validateEmail}
            allowDuplicates={false}
            caseSensitive={false}
          />
        </div>

        {/* Email Templates */}
        <div className="ihub-example-card">
          <h3>Email Templates Integration</h3>
          <p>Email input with template suggestions and quick add</p>
          
          <div className="ihub-template-section">
            <h4>Quick Add Templates:</h4>
            <div className="ihub-template-buttons">
              <button
                onClick={() => setEmails1([...emails1, "team@company.com"])}
                className="ihub-template-btn"
                type="button"
              >
                Add Team
              </button>
              <button
                onClick={() => setEmails1([...emails1, "support@company.com"])}
                className="ihub-template-btn"
                type="button"
              >
                Add Support
              </button>
              <button
                onClick={() => setEmails1([...emails1, "admin@company.com"])}
                className="ihub-template-btn"
                type="button"
              >
                Add Admin
              </button>
              <button
                onClick={() => setEmails1([])}
                className="ihub-clear-btn"
                type="button"
              >
                Clear All
              </button>
            </div>
          </div>
          
          <MultipleEmail
            label="Template Recipients"
            emails={emails1}
            onChange={setEmails1}
            placeholder="Use template buttons or add manually..."
            showCount={true}
            maxEmails={15}
          />
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { MultipleEmail } from '@instincthub/react-ui';

const [emails, setEmails] = useState<string[]>([]);

<MultipleEmail
  label="Email Addresses"
  emails={emails}
  onChange={setEmails}
  placeholder="Enter email address..."
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Validation</h3>
          <pre><code>{`const validateEmail = (email: string) => {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
};

<MultipleEmail
  emails={emails}
  onChange={setEmails}
  validate={validateEmail}
  allowDuplicates={false}
  showValidation={true}
  maxEmails={10}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Advanced Features</h3>
          <pre><code>{`<MultipleEmail
  emails={emails}
  onChange={setEmails}
  allowPaste={true}
  pasteDelimiter=","
  showSuggestions={true}
  suggestions={["team@company.com", "admin@company.com"]}
  maxEmails={20}
  showCount={true}
/>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default MultipleEmailExample;