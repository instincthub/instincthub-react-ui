# handleFormErrors

**Category:** Library | **Type:** utility

A utility function that handles form validation errors by highlighting fields with red borders and displaying error messages. Perfect for processing server-side validation errors and providing visual feedback to users.

## 📁 File Location

`src/components/lib/formError.ts`

## 🏷️ Tags

`form`, `validation`, `error-handling`, `ui`, `dom`, `feedback`, `accessibility`

## 📖 Usage Examples

### Example 1: Complete Form Error Handling Demo

```tsx
"use client";

import React, { useState } from "react";
import { handleFormErrors } from "@instincthub/react-ui/lib";

/**
 * Comprehensive example demonstrating handleFormErrors utility
 */
const FormErrorExamples = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    terms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<any>(null);

  // Mock server validation errors for demonstration
  const mockServerErrors = {
    email: ["Email is already registered", "Email format is invalid"],
    password: ["Password must be at least 8 characters"],
    confirmPassword: ["Passwords do not match"],
    firstName: ["First name is required"],
    terms: ["You must accept the terms and conditions"]
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const simulateFormSubmission = async () => {
    setIsSubmitting(true);
    setSubmitResult(null);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate server validation (randomly succeed or fail for demo)
    const shouldFail = Math.random() > 0.5;
    
    if (shouldFail) {
      // Process errors with handleFormErrors
      const hasErrors = handleFormErrors(mockServerErrors);
      
      setSubmitResult({
        success: false,
        message: "Please fix the errors below",
        hasErrors
      });
    } else {
      // Clear any existing errors on success
      handleFormErrors({});
      
      setSubmitResult({
        success: true,
        message: "Form submitted successfully!",
        hasErrors: false
      });
    }

    setIsSubmitting(false);
  };

  const triggerSpecificErrors = (errorSet: any) => {
    const hasErrors = handleFormErrors(errorSet);
    setSubmitResult({
      success: false,
      message: `Applied ${Object.keys(errorSet).length} field errors`,
      hasErrors
    });
  };

  const clearAllErrors = () => {
    handleFormErrors({});
    setSubmitResult(null);
  };

  return (
    <div className="ihub-container ihub-py-5">
      <h1>handleFormErrors Utility Examples</h1>

      {/* Main Form Example */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Registration Form with Error Handling</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-8">
            <div className="ihub-card ihub-p-4">
              <form id="registrationForm" onSubmit={(e) => e.preventDefault()}>
                <div className="ihub-row">
                  <div className="ihub-col-md-6">
                    <div className="ihub-mb-3">
                      <label className="ihub-form-label">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        className="ihub-form-control"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                      />
                    </div>
                  </div>
                  <div className="ihub-col-md-6">
                    <div className="ihub-mb-3">
                      <label className="ihub-form-label">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        className="ihub-form-control"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                </div>

                <div className="ihub-mb-3">
                  <label className="ihub-form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    className="ihub-form-control"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="ihub-row">
                  <div className="ihub-col-md-6">
                    <div className="ihub-mb-3">
                      <label className="ihub-form-label">Password *</label>
                      <input
                        type="password"
                        name="password"
                        className="ihub-form-control"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter password"
                      />
                    </div>
                  </div>
                  <div className="ihub-col-md-6">
                    <div className="ihub-mb-3">
                      <label className="ihub-form-label">Confirm Password *</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="ihub-form-control"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm password"
                      />
                    </div>
                  </div>
                </div>

                <div className="ihub-mb-3">
                  <label className="ihub-form-label">Country</label>
                  <select
                    name="country"
                    className="ihub-form-control"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value="">Select your country</option>
                    <option value="US">United States</option>
                    <option value="NG">Nigeria</option>
                    <option value="GB">United Kingdom</option>
                    <option value="CA">Canada</option>
                  </select>
                </div>

                <div className="ihub-mb-4">
                  <div className="ihub-form-check">
                    <input
                      type="checkbox"
                      name="terms"
                      className="ihub-form-check-input"
                      checked={formData.terms}
                      onChange={handleInputChange}
                    />
                    <label className="ihub-form-check-label">
                      I agree to the Terms and Conditions *
                    </label>
                  </div>
                </div>

                <button
                  type="button"
                  className="ihub-btn ihub-btn-primary ihub-me-2"
                  onClick={simulateFormSubmission}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm ihub-me-2"></span>
                      Processing...
                    </>
                  ) : (
                    "Submit Form"
                  )}
                </button>

                <button
                  type="button"
                  className="ihub-btn ihub-btn-outline-secondary"
                  onClick={clearAllErrors}
                >
                  Clear Errors
                </button>
              </form>

              {submitResult && (
                <div className={`ihub-alert ${submitResult.success ? 'ihub-alert-success' : 'ihub-alert-danger'} ihub-mt-3`}>
                  <strong>{submitResult.success ? 'Success:' : 'Error:'}</strong> {submitResult.message}
                  {!submitResult.success && (
                    <div className="ihub-mt-2">
                      <small>Fields with errors have been highlighted in red with specific error messages.</small>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-p-4">
              <h6>Error Testing Controls</h6>
              <p className="text-muted ihub-mb-3">
                Test different error scenarios:
              </p>

              <button
                className="ihub-btn ihub-btn-outline-danger ihub-btn-sm ihub-w-100 ihub-mb-2"
                onClick={() => triggerSpecificErrors({
                  email: ["Email is required"],
                  password: ["Password is too weak"]
                })}
              >
                Trigger Basic Errors
              </button>

              <button
                className="ihub-btn ihub-btn-outline-danger ihub-btn-sm ihub-w-100 ihub-mb-2"
                onClick={() => triggerSpecificErrors(mockServerErrors)}
              >
                Trigger All Errors
              </button>

              <button
                className="ihub-btn ihub-btn-outline-warning ihub-btn-sm ihub-w-100 ihub-mb-2"
                onClick={() => triggerSpecificErrors({
                  firstName: ["Name must contain only letters"],
                  country: ["Please select a country"]
                })}
              >
                Trigger Field-Specific
              </button>

              <button
                className="ihub-btn ihub-btn-outline-info ihub-btn-sm ihub-w-100"
                onClick={clearAllErrors}
              >
                Clear All Errors
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Implementation Patterns</h2>
        
        {/* React Hook Pattern */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-code ihub-me-2"></i>
              Custom Hook for Form Error Management
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Custom hook for form error handling
import { useCallback } from 'react';
import { handleFormErrors } from '@instincthub/react-ui/lib';

interface UseFormErrorsReturn {
  displayErrors: (errors: Record<string, string[]>) => boolean;
  clearErrors: () => void;
  clearFieldError: (fieldName: string) => void;
}

export const useFormErrors = (): UseFormErrorsReturn => {
  const displayErrors = useCallback((errors: Record<string, string[]>) => {
    return handleFormErrors(errors);
  }, []);

  const clearErrors = useCallback(() => {
    handleFormErrors({});
  }, []);

  const clearFieldError = useCallback((fieldName: string) => {
    // Clear specific field error
    const field = document.querySelector(\`[name="\${fieldName}"]\`) as HTMLElement;
    if (field) {
      field.style.borderColor = '';
      const errorElement = field.parentNode?.querySelector('.error-message');
      if (errorElement) {
        errorElement.remove();
      }
    }
  }, []);

  return { displayErrors, clearErrors, clearFieldError };
};

// Usage in component
const MyForm = () => {
  const { displayErrors, clearErrors } = useFormErrors();
  
  const handleSubmit = async (formData: any) => {
    try {
      await submitForm(formData);
      clearErrors(); // Clear on success
    } catch (error) {
      if (error.validationErrors) {
        displayErrors(error.validationErrors);
      }
    }
  };
};`}
            </pre>
          </div>
        </div>

        {/* API Integration Pattern */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-server ihub-me-2"></i>
              API Error Integration
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Processing API validation errors
const handleApiSubmission = async (formData: any) => {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (!response.ok) {
      if (response.status === 400 && result.errors) {
        // Server returned validation errors
        const hasErrors = handleFormErrors(result.errors);
        
        if (hasErrors) {
          // Show general error message
          setFormMessage({
            type: 'error',
            text: 'Please fix the errors below and try again.'
          });
        }
      } else {
        // Other error types
        setFormMessage({
          type: 'error',
          text: result.message || 'An error occurred. Please try again.'
        });
      }
    } else {
      // Success - clear any existing errors
      handleFormErrors({});
      setFormMessage({
        type: 'success',
        text: 'Registration successful!'
      });
    }
  } catch (error) {
    console.error('Network error:', error);
    setFormMessage({
      type: 'error',
      text: 'Network error. Please check your connection and try again.'
    });
  }
};`}
            </pre>
          </div>
        </div>

        {/* Real-time Validation Pattern */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-refresh ihub-me-2"></i>
              Real-time Field Validation
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Real-time validation with error clearing
import { useCallback, useEffect } from 'react';
import { handleFormErrors } from '@instincthub/react-ui/lib';

const useRealTimeValidation = (formData: any) => {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const validateField = useCallback((fieldName: string, value: any) => {
    const errors: string[] = [];

    switch (fieldName) {
      case 'email':
        if (!value) {
          errors.push('Email is required');
        } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) {
          errors.push('Please enter a valid email address');
        }
        break;
        
      case 'password':
        if (!value) {
          errors.push('Password is required');
        } else if (value.length < 8) {
          errors.push('Password must be at least 8 characters');
        }
        break;
        
      case 'confirmPassword':
        if (value !== formData.password) {
          errors.push('Passwords do not match');
        }
        break;
    }

    setFieldErrors(prev => ({
      ...prev,
      [fieldName]: errors
    }));

    // Display errors immediately
    handleFormErrors(errors.length > 0 ? { [fieldName]: errors } : {});
    
    return errors.length === 0;
  }, [formData]);

  const validateAllFields = useCallback(() => {
    const allErrors: Record<string, string[]> = {};
    
    Object.keys(formData).forEach(fieldName => {
      const isValid = validateField(fieldName, formData[fieldName]);
      if (!isValid && fieldErrors[fieldName]) {
        allErrors[fieldName] = fieldErrors[fieldName];
      }
    });

    handleFormErrors(allErrors);
    return Object.keys(allErrors).length === 0;
  }, [formData, fieldErrors, validateField]);

  return { validateField, validateAllFields, fieldErrors };
};`}
            </pre>
          </div>
        </div>
      </section>

      {/* Accessibility Features */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Accessibility Features</h2>
        <div className="ihub-card ihub-p-4">
          <h6>Built-in Accessibility Support</h6>
          <ul className="ihub-list-unstyled">
            <li className="ihub-mb-2">
              <i className="pi pi-check-circle text-success ihub-me-2"></i>
              <strong>Focus Management:</strong> Automatically focuses the first error field
            </li>
            <li className="ihub-mb-2">
              <i className="pi pi-check-circle text-success ihub-me-2"></i>
              <strong>Visual Indicators:</strong> Red borders clearly indicate problematic fields
            </li>
            <li className="ihub-mb-2">
              <i className="pi pi-check-circle text-success ihub-me-2"></i>
              <strong>Error Messages:</strong> Descriptive text explains what needs to be fixed
            </li>
            <li className="ihub-mb-2">
              <i className="pi pi-check-circle text-success ihub-me-2"></i>
              <strong>Error Clearing:</strong> Previous errors are automatically cleared
            </li>
            <li className="ihub-mb-2">
              <i className="pi pi-check-circle text-success ihub-me-2"></i>
              <strong>Multiple Field Types:</strong> Works with inputs, selects, and textareas
            </li>
          </ul>

          <h6 className="ihub-mt-4">Enhanced Accessibility Implementation</h6>
          <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Enhanced accessible error handling
const enhancedHandleFormErrors = (errors: Record<string, string[]>) => {
  // Use the base utility
  const hasErrors = handleFormErrors(errors);
  
  if (hasErrors) {
    // Add ARIA attributes for screen readers
    Object.keys(errors).forEach(fieldName => {
      const field = document.querySelector(\`[name="\${fieldName}"]\`);
      const errorElement = field?.parentNode?.querySelector('.error-message');
      
      if (field && errorElement) {
        // Add ARIA attributes
        const errorId = \`error-\${fieldName}\`;
        errorElement.id = errorId;
        field.setAttribute('aria-describedby', errorId);
        field.setAttribute('aria-invalid', 'true');
        
        // Add role for better screen reader support
        errorElement.setAttribute('role', 'alert');
        errorElement.setAttribute('aria-live', 'polite');
      }
    });
    
    // Announce errors to screen readers
    const errorCount = Object.keys(errors).length;
    const announcement = \`Form has \${errorCount} error\${errorCount > 1 ? 's' : ''}. Please review and correct.\`;
    
    // Create temporary announcement element
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'assertive');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.position = 'absolute';
    announcer.style.left = '-10000px';
    announcer.textContent = announcement;
    
    document.body.appendChild(announcer);
    setTimeout(() => document.body.removeChild(announcer), 1000);
  }
  
  return hasErrors;
};`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default FormErrorExamples;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { handleFormErrors } from '@instincthub/react-ui/lib';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { handleFormErrors } from '@instincthub/react-ui/lib';

function LoginForm() {
  const handleSubmit = async (formData: any) => {
    try {
      const response = await submitForm(formData);
      // Clear errors on success
      handleFormErrors({});
    } catch (error) {
      if (error.validationErrors) {
        // Display server validation errors
        const hasErrors = handleFormErrors(error.validationErrors);
        if (hasErrors) {
          console.log('Form has validation errors');
        }
      }
    }
  };

  return (
    <form>
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button onClick={handleSubmit}>Login</button>
    </form>
  );
}
```

## 🔧 Function Signature

```tsx
handleFormErrors(errors: FormErrors): boolean
```

### Parameters

- `errors` (FormErrors): Object containing field errors from server validation

### FormErrors Interface

```tsx
interface FormErrors {
  [fieldName: string]: string[];
}
```

### Returns

- `boolean`: True if there were any errors to display, false if no errors

## 📝 Key Features

- **Visual Feedback**: Adds red borders to invalid fields
- **Error Messages**: Displays specific error text below fields
- **Focus Management**: Automatically focuses the first error field
- **Error Clearing**: Removes previous errors before displaying new ones
- **Multiple Field Types**: Works with input, select, and textarea elements
- **Multiple Errors**: Supports multiple error messages per field
- **DOM Integration**: Direct DOM manipulation for immediate visual feedback

## 💡 Use Cases

- **Form Validation**: Display server-side validation errors
- **User Registration**: Handle signup form validation feedback
- **Login Forms**: Show authentication error messages
- **Profile Updates**: Display field-specific update errors
- **Contact Forms**: Provide validation feedback on contact submissions
- **Checkout Forms**: Handle payment and shipping validation errors
- **Multi-step Forms**: Show errors at each validation step

## ⚡ Error Processing Flow

1. **Reset Previous Errors**: Clears all existing error states and messages
2. **Process New Errors**: Iterates through provided error object
3. **Find Target Fields**: Locates DOM elements by name attribute
4. **Apply Visual Styling**: Adds red border to invalid fields
5. **Create Error Messages**: Generates and positions error text
6. **Focus Management**: Focuses the first field with errors
7. **Return Status**: Indicates whether any errors were processed

## 🎨 Styling Customization

### Default Error Styling
```css
/* Error field border */
input[style*="border-color: #ff0000"] {
  border-color: #ff0000 !important;
}

/* Error message styling */
.error-message {
  color: var(--Danger);
  font-size: 0.8rem;
  margin-top: 4px;
  display: block;
}
```

### Custom CSS Variables
```css
:root {
  --Danger: #dc3545;
  --error-border-color: #ff0000;
  --error-text-color: #dc3545;
  --error-font-size: 0.8rem;
}
```

## ♿ Accessibility Features

- **Focus Management**: Automatically focuses first error field
- **Visual Indicators**: Clear red borders for visual users
- **Descriptive Messages**: Specific error text for screen readers
- **Error Clearing**: Removes outdated error information
- **Multiple Field Support**: Consistent behavior across form elements

## 🔗 Related Utilities

- [helpFunction](./helpFunction.md) - General form and validation utilities
- [fetchAPI](./helpFunction.md#fetchapi) - API error handling integration
- [openToast](./modals.md#opentoast) - User notification utilities
- [printErr](./helpFunction.md#printerr) - Alternative error display function