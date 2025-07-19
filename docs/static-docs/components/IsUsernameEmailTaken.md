# IsUsernameEmailTaken

**Category:** Auth | **Type:** component

Real-time username and email availability checker with validation feedback

**File Location:** `src/components/auth/IsUsernameEmailTaken.tsx`

## 🏷️ Tags

`auth`, `validation`, `username`, `email`, `availability`

```tsx
"use client";
import React, { useState } from "react";
import { IsUsernameEmailTaken } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive examples demonstrating username and email availability checking
 * Shows real-time validation, different check types, and integration patterns
 */
const IsUsernameEmailTakenExamples = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    alternateEmail: "",
  });
  
  const [validationResults, setValidationResults] = useState<Record<string, any>>({});
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  // Mock API functions to simulate checking availability
  const checkUsernameAvailability = async (username: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock taken usernames
    const takenUsernames = ["admin", "user", "test", "demo", "john_doe", "jane_smith"];
    const isTaken = takenUsernames.includes(username.toLowerCase());
    
    return {
      available: !isTaken,
      message: isTaken ? "Username is already taken" : "Username is available",
      suggestions: isTaken ? [`${username}123`, `${username}_2024`, `new_${username}`] : [],
    };
  };

  const checkEmailAvailability = async (email: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock taken emails
    const takenEmails = [
      "admin@example.com", 
      "user@test.com", 
      "demo@company.com", 
      "john@instincthub.com"
    ];
    const isTaken = takenEmails.includes(email.toLowerCase());
    
    return {
      available: !isTaken,
      message: isTaken ? "Email address is already registered" : "Email is available",
      alternativeProviders: isTaken ? ["gmail.com", "yahoo.com", "outlook.com"] : [],
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleValidationResult = (field: string, result: any) => {
    setValidationResults(prev => ({
      ...prev,
      [field]: result,
    }));
  };

  const handleRegistration = async () => {
    if (!formData.username || !formData.email) {
      openToast("Please fill in all required fields", 400);
      return;
    }

    const usernameResult = validationResults.username;
    const emailResult = validationResults.email;

    if (!usernameResult?.available || !emailResult?.available) {
      openToast("Please resolve availability issues before proceeding", 400);
      return;
    }

    setIsRegistering(true);
    
    // Simulate registration
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsRegistering(false);
    openToast("Registration successful!");
    
    // Reset form
    setFormData({ username: "", email: "", alternateEmail: "" });
    setValidationResults({});
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>Username/Email Availability Checker</h1>
      <p className="ihub-mb-4">
        Real-time validation component that checks username and email availability
        with API integration and user feedback.
      </p>

      {/* Basic Username Check */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Username Availability Check</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Real-time Username Validation</h3>
            <p className="ihub-text-muted">Check if username is available as you type</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-mb-3">
              <label htmlFor="username" className="ihub-form-label">
                Username *
              </label>
              <IsUsernameEmailTaken
                type="username"
                value={formData.username}
                onChange={(value) => setFormData(prev => ({ ...prev, username: value }))}
                onValidationResult={(result) => handleValidationResult('username', result)}
                checkFunction={checkUsernameAvailability}
                placeholder="Enter desired username"
                className="ihub-input"
                minLength={3}
                maxLength={20}
                debounceMs={500}
                showSuggestions={true}
              />
            </div>
            
            {validationResults.username && (
              <div className="ihub-validation-feedback">
                <div className={`ihub-alert ${
                  validationResults.username.available ? 'ihub-alert-success' : 'ihub-alert-error'
                }`}>
                  <div className="ihub-d-flex ihub-align-items-center">
                    <span className="ihub-validation-icon">
                      {validationResults.username.available ? '✓' : '✗'}
                    </span>
                    <span>{validationResults.username.message}</span>
                  </div>
                  
                  {!validationResults.username.available && validationResults.username.suggestions && (
                    <div className="ihub-mt-2">
                      <small>Suggestions:</small>
                      <div className="ihub-d-flex" style={{ gap: "5px", marginTop: "5px" }}>
                        {validationResults.username.suggestions.map((suggestion: string, index: number) => (
                          <button
                            key={index}
                            className="ihub-btn-sm ihub-outlined-btn"
                            onClick={() => setFormData(prev => ({ ...prev, username: suggestion }))}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Email Availability Check */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Email Availability Check</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Email Registration Validation</h3>
            <p className="ihub-text-muted">Verify email availability for new accounts</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-mb-3">
              <label htmlFor="email" className="ihub-form-label">
                Email Address *
              </label>
              <IsUsernameEmailTaken
                type="email"
                value={formData.email}
                onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
                onValidationResult={(result) => handleValidationResult('email', result)}
                checkFunction={checkEmailAvailability}
                placeholder="Enter your email address"
                className="ihub-input"
                debounceMs={800}
                validateFormat={true}
                showSuggestions={false}
              />
            </div>
            
            {validationResults.email && (
              <div className="ihub-validation-feedback">
                <div className={`ihub-alert ${
                  validationResults.email.available ? 'ihub-alert-success' : 'ihub-alert-error'
                }`}>
                  <div className="ihub-d-flex ihub-align-items-center">
                    <span className="ihub-validation-icon">
                      {validationResults.email.available ? '✓' : '✗'}
                    </span>
                    <span>{validationResults.email.message}</span>
                  </div>
                  
                  {!validationResults.email.available && validationResults.email.alternativeProviders && (
                    <div className="ihub-mt-2">
                      <small>Try these email providers:</small>
                      <div className="ihub-d-flex" style={{ gap: "5px", marginTop: "5px" }}>
                        {validationResults.email.alternativeProviders.map((provider: string, index: number) => (
                          <span key={index} className="ihub-badge ihub-badge-outline-primary">
                            @{provider}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Registration Form Integration */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Complete Registration Form</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>User Registration</h3>
            <p className="ihub-text-muted">Full registration form with validation</p>
          </div>
          
          <div className="ihub-card-body">
            <form onSubmit={(e) => { e.preventDefault(); handleRegistration(); }}>
              <div className="ihub-row">
                <div className="ihub-col-md-6">
                  <div className="ihub-mb-3">
                    <label className="ihub-form-label">Username *</label>
                    <IsUsernameEmailTaken
                      type="username"
                      value={formData.username}
                      onChange={(value) => setFormData(prev => ({ ...prev, username: value }))}
                      onValidationResult={(result) => handleValidationResult('username', result)}
                      checkFunction={checkUsernameAvailability}
                      placeholder="Choose a username"
                      className="ihub-input"
                      minLength={3}
                      maxLength={20}
                      required
                    />
                  </div>
                </div>
                
                <div className="ihub-col-md-6">
                  <div className="ihub-mb-3">
                    <label className="ihub-form-label">Email Address *</label>
                    <IsUsernameEmailTaken
                      type="email"
                      value={formData.email}
                      onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
                      onValidationResult={(result) => handleValidationResult('email', result)}
                      checkFunction={checkEmailAvailability}
                      placeholder="Enter email address"
                      className="ihub-input"
                      validateFormat={true}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="ihub-mb-4">
                <label className="ihub-form-label">Alternate Email (Optional)</label>
                <IsUsernameEmailTaken
                  type="email"
                  value={formData.alternateEmail}
                  onChange={(value) => setFormData(prev => ({ ...prev, alternateEmail: value }))}
                  onValidationResult={(result) => handleValidationResult('alternateEmail', result)}
                  checkFunction={checkEmailAvailability}
                  placeholder="Backup email address"
                  className="ihub-input"
                  validateFormat={true}
                  required={false}
                />
              </div>
              
              <div className="ihub-validation-summary ihub-mb-4">
                <h4>Validation Status:</h4>
                <div className="ihub-status-list">
                  <div className="ihub-status-item">
                    <span className="ihub-status-label">Username:</span>
                    <span className={`ihub-status-value ${
                      validationResults.username?.available ? 'available' : 
                      validationResults.username?.available === false ? 'unavailable' : 'pending'
                    }`}>
                      {validationResults.username?.available === true ? 'Available' :
                       validationResults.username?.available === false ? 'Taken' : 'Checking...'}
                    </span>
                  </div>
                  
                  <div className="ihub-status-item">
                    <span className="ihub-status-label">Email:</span>
                    <span className={`ihub-status-value ${
                      validationResults.email?.available ? 'available' : 
                      validationResults.email?.available === false ? 'unavailable' : 'pending'
                    }`}>
                      {validationResults.email?.available === true ? 'Available' :
                       validationResults.email?.available === false ? 'Registered' : 'Checking...'}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                className="ihub-primary-btn"
                disabled={
                  isRegistering ||
                  !formData.username ||
                  !formData.email ||
                  !validationResults.username?.available ||
                  !validationResults.email?.available
                }
              >
                {isRegistering ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Configuration Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Configuration Options</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Fast Validation</h3>
              </div>
              <div className="ihub-card-body">
                <p>Quick validation with minimal debounce</p>
                <IsUsernameEmailTaken
                  type="username"
                  value={""}
                  onChange={() => {}}
                  onValidationResult={() => {}}
                  checkFunction={checkUsernameAvailability}
                  placeholder="Type to validate quickly"
                  className="ihub-input"
                  debounceMs={200}
                  showLoadingState={true}
                />
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Slow/Careful Validation</h3>
              </div>
              <div className="ihub-card-body">
                <p>Delayed validation to reduce API calls</p>
                <IsUsernameEmailTaken
                  type="email"
                  value={""}
                  onChange={() => {}}
                  onValidationResult={() => {}}
                  checkFunction={checkEmailAvailability}
                  placeholder="Validation after pause"
                  className="ihub-input"
                  debounceMs={1500}
                  showLoadingState={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Implementation Guide</h2>
        <div className="ihub-card ihub-p-4">
          <h3>Props Interface:</h3>
          <pre className="ihub-code-block">
{`interface IsUsernameEmailTakenProps {
  type: 'username' | 'email';        // Type of validation
  value: string;                      // Current input value
  onChange: (value: string) => void;  // Value change handler
  onValidationResult: (result: ValidationResult) => void;
  checkFunction: (value: string) => Promise<ValidationResult>;
  placeholder?: string;
  className?: string;
  minLength?: number;                 // Minimum length for validation
  maxLength?: number;                 // Maximum length for validation
  debounceMs?: number;                // Debounce delay (default: 500ms)
  validateFormat?: boolean;           // Enable format validation
  showSuggestions?: boolean;          // Show alternative suggestions
  showLoadingState?: boolean;         // Show loading indicators
  required?: boolean;                 // Required field
}`}
          </pre>
          
          <h3 className="ihub-mt-3">Key Features:</h3>
          <ul>
            <li><strong>Real-time Validation:</strong> Check availability as user types</li>
            <li><strong>Debounced Requests:</strong> Reduce API calls with configurable delay</li>
            <li><strong>Format Validation:</strong> Built-in email format checking</li>
            <li><strong>Suggestions:</strong> Provide alternatives for taken usernames/emails</li>
            <li><strong>Loading States:</strong> Visual feedback during API calls</li>
            <li><strong>Integration Ready:</strong> Easy form integration with validation state</li>
          </ul>
          
          <h3 className="ihub-mt-3">Best Practices:</h3>
          <ul>
            <li>Use appropriate debounce delays (300-800ms) to balance UX and API load</li>
            <li>Provide clear feedback for both available and taken values</li>
            <li>Include suggestions for alternative usernames when original is taken</li>
            <li>Implement proper error handling for API failures</li>
            <li>Cache results to avoid repeated API calls for same values</li>
            <li>Consider rate limiting on the backend to prevent abuse</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default IsUsernameEmailTakenExamples;

## 🔗 Related Components

- [LoginForm](./LoginForm.md) - Login form component with authentication
- [PasswordsMatch](./PasswordsMatch.md) - Password matching validation component
- [InputText](./InputText.md) - Text input component for forms
- [SubmitButton](./SubmitButton.md) - Submit button with loading states
- [FormError](./FormError.md) - Form error handling component

