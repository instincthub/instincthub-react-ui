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
          
          <label>Email Addresses</label>
          <MultipleEmail
            onEmailsChange={setEmails1}
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
          
          <label>Team Members</label>
          <MultipleEmail
            onEmailsChange={setEmails2}
          />
          
          <div className="ihub-email-display ihub-mt-3">
            <strong>Current Emails ({emails2.length}):</strong>
            {emails2.length === 0 ? (
              <p className="ihub-empty-state">No emails added yet</p>
            ) : (
              <ul className="ihub-email-list">
                {emails2.map((email, index) => (
                  <li key={index} className="ihub-email-item">{email}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Email Validation */}
        <div className="ihub-example-card">
          <h3>Email Validation</h3>
          <p>Email input with validation and error handling</p>
          
          <label>Newsletter Recipients</label>
          <MultipleEmail
            onEmailsChange={setEmails3}
          />
          
          <div className="ihub-email-display ihub-mt-3">
            <strong>Current Emails ({emails3.length}):</strong>
            {emails3.length === 0 ? (
              <p className="ihub-empty-state">No emails added yet</p>
            ) : (
              <ul className="ihub-email-list">
                {emails3.map((email, index) => (
                  <li key={index} className="ihub-email-item">{email}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Form Integration */}
        <div className="ihub-example-card">
          <h3>Form Integration</h3>
          <p>Multiple email input integrated with form submission</p>
          
          <form onSubmit={handleSubmit}>
            <label>Email Recipients</label>
            <MultipleEmail
              onEmailsChange={(emails) => setFormData({...formData, recipients: emails})}
            />
            {errors.recipients && <p className="ihub-error">{errors.recipients}</p>}
            
            <div className="ihub-email-display ihub-mt-3">
              <strong>Current Recipients ({formData.recipients.length}):</strong>
              {formData.recipients.length === 0 ? (
                <p className="ihub-empty-state">No recipients added yet</p>
              ) : (
                <ul className="ihub-email-list">
                  {formData.recipients.map((email, index) => (
                    <li key={index} className="ihub-email-item">{email}</li>
                  ))}
                </ul>
              )}
            </div>
            
            <SubmitButton
              label="Send Emails"
              status={1}
              className="ihub-important-btn"
            />
          </form>
        </div>

        {/* Advanced Features */}
        <div className="ihub-example-card">
          <h3>Advanced Email Input</h3>
          <p>Email input with advanced features and customization</p>
          
          <label>Advanced Recipients</label>
          <MultipleEmail
            onEmailsChange={setEmails3}
          />
          
          <div className="ihub-suggestions ihub-mt-2">
            <strong>Quick Add Suggestions:</strong>
            <div className="ihub-suggestion-buttons">
              {[
                "admin@instincthub.com",
                "support@instincthub.com",
                "team@instincthub.com",
                "info@instincthub.com"
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    if (!emails3.includes(suggestion)) {
                      setEmails3([...emails3, suggestion]);
                    }
                  }}
                  className="ihub-suggestion-btn"
                  type="button"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
          
          <div className="ihub-email-display ihub-mt-3">
            <strong>Current Emails ({emails3.length}):</strong>
            {emails3.length === 0 ? (
              <p className="ihub-empty-state">No emails added yet</p>
            ) : (
              <ul className="ihub-email-list">
                {emails3.map((email, index) => (
                  <li key={index} className="ihub-email-item">{email}</li>
                ))}
              </ul>
            )}
          </div>
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
          
          <label>Template Recipients</label>
          <MultipleEmail
            onEmailsChange={setEmails1}
          />
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { MultipleEmail } from '@instincthub/react-ui';

const [emails, setEmails] = useState<string[]>([]);

<label>Email Addresses</label>
<MultipleEmail
  onEmailsChange={setEmails}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Custom Validation Logic</h3>
          <pre><code>{`const [emails, setEmails] = useState<string[]>([]);
const [validationError, setValidationError] = useState('');

const handleEmailsChange = (newEmails: string[]) => {
  // Custom validation logic
  if (newEmails.length > 10) {
    setValidationError('Maximum 10 emails allowed');
    return;
  }
  setValidationError('');
  setEmails(newEmails);
};

<label>Email Addresses</label>
<MultipleEmail
  onEmailsChange={handleEmailsChange}
/>
{validationError && <p className="ihub-error">{validationError}</p>}`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Suggestions</h3>
          <pre><code>{`const suggestions = ["team@company.com", "admin@company.com"];

<label>Email Addresses</label>
<MultipleEmail
  onEmailsChange={setEmails}
/>

{/* Add suggestion buttons */}
<div className="suggestions">
  {suggestions.map(suggestion => (
    <button
      key={suggestion}
      onClick={() => {
        if (!emails.includes(suggestion)) {
          setEmails([...emails, suggestion]);
        }
      }}
    >
      {suggestion}
    </button>
  ))}
</div>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default MultipleEmailExample;