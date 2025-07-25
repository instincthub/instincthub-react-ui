"use client";

import React, { useState } from "react";
import { FormError, InputText, PasswordField, SubmitButton } from "../../../../index";

const FormErrorExample: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    age: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitStatus, setSubmitStatus] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email format is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (parseInt(formData.age) < 18) {
      newErrors.age = "You must be at least 18 years old";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitStatus(2);
    setTimeout(() => {
      console.log("Form submitted successfully:", formData);
      setSubmitStatus(1);
      // Reset form
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
        age: "",
      });
    }, 2000);
  };

  // Simulate server errors
  const simulateServerError = () => {
    setErrors({
      email: "This email is already registered",
      username: "Username is taken",
      server: "Server error: Unable to create account. Please try again."
    });
  };

  const simulateValidationErrors = () => {
    setErrors({
      email: "Invalid email format",
      password: "Password too weak",
      confirmPassword: "Passwords don't match",
      username: "Username contains invalid characters",
      age: "Age must be between 18 and 120"
    });
  };

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>FormError Examples</h1>
        <p>Form error display component for showing validation and server errors</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Field Errors */}
        <div className="ihub-example-card">
          <h3>Basic Field Error</h3>
          <p>Simple error message display for individual fields</p>
          
          <div className="ihub-field-group">
            <InputText
              label="Email"
              name="basicEmail"
              placeholder="Enter email address"
            />
            <FormError message="Please enter a valid email address" />
          </div>
          
          <div className="ihub-field-group ihub-mt-3">
            <PasswordField
              label="Password"
              name="basicPassword"
              placeholder="Enter password"
            />
            <FormError message="Password must be at least 8 characters long" />
          </div>
        </div>

        {/* Error Types */}
        <div className="ihub-example-card">
          <h3>Different Error Types</h3>
          <p>Various error types with different styling</p>
          
          <div className="ihub-error-examples">
            <div className="ihub-error-item">
              <h5>Validation Error</h5>
              <FormError 
                message="This field is required"
              />
            </div>
            
            <div className="ihub-error-item">
              <h5>Server Error</h5>
              <FormError 
                message="Server error: Unable to save data"
              />
            </div>
            
            <div className="ihub-error-item">
              <h5>Warning</h5>
              <FormError 
                message="This action cannot be undone"
              />
            </div>
            
            <div className="ihub-error-item">
              <h5>Network Error</h5>
              <FormError 
                message="Network connection failed. Please check your internet."
              />
            </div>
          </div>
        </div>

        {/* Multiple Errors */}
        <div className="ihub-example-card">
          <h3>Multiple Error Messages</h3>
          <p>Displaying multiple error messages together</p>
          
          <FormError 
            errors={{
              email: ["Email format is invalid"],
              password: ["Password is too short"],
              username: ["Username is already taken"],
              age: ["Age must be at least 18"]
            }}
          />
        </div>

        {/* Conditional Errors */}
        <div className="ihub-example-card">
          <h3>Conditional Error Display</h3>
          <p>Errors that appear based on conditions</p>
          
          <div className="ihub-demo-controls">
            <button 
              onClick={simulateServerError}
              className="ihub-error-btn"
            >
              Simulate Server Error
            </button>
            <button 
              onClick={simulateValidationErrors}
              className="ihub-warning-btn"
            >
              Simulate Validation Errors
            </button>
            <button 
              onClick={() => setErrors({})}
              className="ihub-success-btn"
            >
              Clear All Errors
            </button>
          </div>
          
          {errors.server && (
            <FormError 
              message={errors.server}
            />
          )}
          
          {Object.keys(errors).filter(key => key !== 'server').length > 0 && (
            <FormError 
              errors={Object.keys(errors).reduce((acc, key) => {
                if (key !== 'server' && errors[key]) {
                  acc[key] = [errors[key]];
                }
                return acc;
              }, {} as Record<string, string[]>)}
            />
          )}
        </div>

        {/* Form with Inline Errors */}
        <div className="ihub-example-card">
          <h3>Complete Form with Error Handling</h3>
          <p>Registration form with comprehensive error handling</p>
          
          <form onSubmit={handleSubmit} className="ihub-form">
            <div className="ihub-field-group">
              <InputText
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                error={errors.email}
                required
              />
              {errors.email && <FormError message={errors.email} />}
            </div>
            
            <div className="ihub-field-group">
              <InputText
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                error={errors.username}
                required
              />
              {errors.username && <FormError message={errors.username} />}
            </div>
            
            <div className="ihub-field-group">
              <PasswordField
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                error={errors.password}
                required
              />
              {errors.password && <FormError message={errors.password} />}
            </div>
            
            <div className="ihub-field-group">
              <PasswordField
                label="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                error={errors.confirmPassword}
                required
              />
              {errors.confirmPassword && <FormError message={errors.confirmPassword} />}
            </div>
            
            <div className="ihub-field-group">
              <InputText
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
                error={errors.age}
                required
              />
              {errors.age && <FormError message={errors.age} />}
            </div>
            
            <SubmitButton
              label="Create Account"
              status={submitStatus}
              className="ihub-important-btn ihub-w-100"
            />
          </form>
        </div>

        {/* Error Summary */}
        <div className="ihub-example-card">
          <h3>Error Summary</h3>
          <p>Summary of all form errors at the top</p>
          
          {Object.keys(errors).length > 0 && (
            <div className="ihub-error-summary">
              <FormError 
                message="Please fix the following errors:"
                errors={Object.keys(errors).reduce((acc, key) => {
                  if (errors[key]) {
                    acc[key] = [errors[key]];
                  }
                  return acc;
                }, {} as Record<string, string[]>)}
              />
            </div>
          )}
          
          <div className="ihub-form-fields">
            <InputText
              name="field1"
              label="Field 1"
              error={errors.field1}
              placeholder="This field has an error"
            />
            <InputText
              name="field2"
              label="Field 2"
              error={errors.field2}
              placeholder="This field also has an error"
            />
            <button 
              onClick={() => setErrors({
                field1: "Field 1 is required",
                field2: "Field 2 format is invalid"
              })}
              className="ihub-demo-btn"
            >
              Show Error Summary
            </button>
          </div>
        </div>

        {/* Custom Styled Errors */}
        <div className="ihub-example-card">
          <h3>Custom Styled Errors</h3>
          <p>Error messages with custom styling and icons</p>
          
          <div className="ihub-custom-errors">
            <FormError 
              message="❌ Critical error: Data could not be saved"
            />
            
            <FormError 
              message="⚠️ Warning: This action is irreversible"
            />
            
            <FormError 
              message="ℹ️ Info: Please review your information"
            />
            
            <FormError 
              message="🔒 Security: Password strength is weak"
            />
          </div>
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { FormError } from '@instincthub/react-ui';

// Simple error message
<FormError message="This field is required" />

// With error type
<FormError 
  message="Server error occurred" 
  type="server"
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Multiple Error Messages</h3>
          <pre><code>{`const errors = [
  "Email format is invalid",
  "Password is too short",
  "Username is already taken"
];

<FormError 
  messages={errors}
  type="validation"
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Form Field</h3>
          <pre><code>{`const [fieldError, setFieldError] = useState("");

<InputText
  label="Email"
  name="email"
  value={email}
  onChange={handleChange}
  error={fieldError}
/>
{fieldError && <FormError message={fieldError} />}`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Dismissible Error</h3>
          <pre><code>{`<FormError 
  message="Server error: Unable to save data"
  type="server"
  dismissible
  onDismiss={() => setError("")}
/>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default FormErrorExample;