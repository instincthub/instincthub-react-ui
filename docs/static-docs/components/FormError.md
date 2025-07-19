# FormError

**Category:** Forms | **Type:** component

Form error display component

## 🏷️ Tags

`forms`, `error`, `validation`, `display`

```tsx
"use client";
import React, { useState } from "react";
import { FormError, InputText, SubmitButton } from "@instincthub/react-ui";

/**
 * Example component demonstrating various ways to use the FormError component
 */
const FormErrorExamples = () => {
  // State for form errors
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]> | null>(null);
  const [httpStatus, setHttpStatus] = useState<number | undefined>(undefined);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Simulate validation errors
  const simulateValidationError = () => {
    setValidationErrors({
      username: ["Username must be at least 3 characters long", "Username already exists"],
      email: ["Invalid email format"],
      password: ["Password must contain at least 8 characters", "Password must contain a number"],
    });
    setHttpStatus(400);
  };

  // Simulate server error
  const simulateServerError = () => {
    setValidationErrors(null);
    setHttpStatus(500);
  };

  // Simulate not found error
  const simulateNotFoundError = () => {
    setValidationErrors(null);
    setHttpStatus(404);
  };

  // Simulate single field error
  const simulateSingleFieldError = () => {
    setValidationErrors({
      email: ["This email is already registered"],
    });
    setHttpStatus(400);
  };

  // Clear all errors
  const clearErrors = () => {
    setValidationErrors(null);
    setHttpStatus(undefined);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    clearErrors();
    
    // Simulate API call
    try {
      // Simulate validation
      if (!formData.username || formData.username.length < 3) {
        setValidationErrors({
          username: ["Username is required and must be at least 3 characters"],
        });
        setHttpStatus(400);
        return;
      }
      
      if (!formData.email || !formData.email.includes('@')) {
        setValidationErrors({
          email: ["Please enter a valid email address"],
        });
        setHttpStatus(400);
        return;
      }
      
      if (!formData.password || formData.password.length < 8) {
        setValidationErrors({
          password: ["Password must be at least 8 characters long"],
        });
        setHttpStatus(400);
        return;
      }
      
      // If all validations pass
      console.log("Form submitted successfully:", formData);
      alert("Form submitted successfully!");
      
    } catch (error) {
      setHttpStatus(500);
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field when user starts typing
    if (validationErrors && validationErrors[name]) {
      const newErrors = { ...validationErrors };
      delete newErrors[name];
      setValidationErrors(Object.keys(newErrors).length > 0 ? newErrors : null);
    }
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>FormError Examples</h1>

      {/* Error Display Examples */}
      <div className="ihub-card ihub-mb-4">
        <h2>Error Display Examples</h2>
        <p>Click buttons to simulate different error scenarios</p>
        
        <div className="ihub-d-flex ihub-flex-wrap" style={{ gap: "10px", marginBottom: "20px" }}>
          <button 
            className="ihub-danger-btn" 
            onClick={simulateValidationError}
          >
            Validation Errors (400)
          </button>
          
          <button 
            className="ihub-danger-btn" 
            onClick={simulateServerError}
          >
            Server Error (500)
          </button>
          
          <button 
            className="ihub-danger-btn" 
            onClick={simulateNotFoundError}
          >
            Not Found (404)
          </button>
          
          <button 
            className="ihub-warning-btn" 
            onClick={simulateSingleFieldError}
          >
            Single Field Error
          </button>
          
          <button 
            className="ihub-success-btn" 
            onClick={clearErrors}
          >
            Clear Errors
          </button>
        </div>
        
        {/* Display FormError component */}
        <FormError errors={validationErrors} status={httpStatus} />
      </div>

      {/* Form with Error Handling */}
      <div className="ihub-card ihub-mb-4">
        <h2>Form with Error Handling</h2>
        <p>Submit the form with invalid data to see errors</p>
        
        <form onSubmit={handleSubmit}>
          {/* Display form errors at the top */}
          <FormError errors={validationErrors} status={httpStatus} />
          
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <InputText
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className={validationErrors?.username ? "ihub-error" : ""}
              />
            </div>
            
            <div className="ihub-col-md-6">
              <InputText
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={validationErrors?.email ? "ihub-error" : ""}
              />
            </div>
          </div>
          
          <div className="ihub-row ihub-mt-3">
            <div className="ihub-col-md-6">
              <InputText
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className={validationErrors?.password ? "ihub-error" : ""}
              />
            </div>
          </div>
          
          <SubmitButton 
            label="Submit Form" 
            status={1}
            className="ihub-mt-4"
          />
        </form>
      </div>

      {/* Custom Error Scenarios */}
      <div className="ihub-card ihub-mb-4">
        <h2>Custom Error Scenarios</h2>
        <p>Different error formats and responses</p>
        
        {/* Multiple errors per field */}
        <div className="ihub-mb-4">
          <h3>Multiple Errors Per Field</h3>
          <FormError 
            errors={{
              password: [
                "Password is too short",
                "Password must contain uppercase letters",
                "Password must contain special characters",
                "Password cannot be a common word"
              ],
              username: ["Username is already taken"],
            }} 
            status={400} 
          />
        </div>
        
        {/* Server error without field errors */}
        <div className="ihub-mb-4">
          <h3>Server Error (500)</h3>
          <FormError errors={null} status={500} />
        </div>
        
        {/* Not found error */}
        <div className="ihub-mb-4">
          <h3>Not Found Error (404)</h3>
          <FormError errors={null} status={404} />
        </div>
      </div>

      {/* API Response Error Handling */}
      <div className="ihub-card">
        <h2>API Response Error Handling</h2>
        <p>Example of handling errors from API responses</p>
        
        <pre className="ihub-code-block">
{`// Example API error response
const apiResponse = {
  status: 400,
  errors: {
    email: ["Email already exists"],
    phone: ["Invalid phone number format"],
  }
};

// Display errors
<FormError 
  errors={apiResponse.errors} 
  status={apiResponse.status} 
/>`}
        </pre>
        
        <div className="ihub-mt-3">
          <h4>Best Practices:</h4>
          <ul>
            <li>Always display FormError at the top of your form</li>
            <li>Clear errors when user starts typing in a field</li>
            <li>Use appropriate HTTP status codes</li>
            <li>Group related errors together</li>
            <li>Provide clear, actionable error messages</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FormErrorExamples;
```

## 🔗 Related Components

- [HandleError](./HandleError.md) - Error handling component
- [MessageDisplay](./MessageDisplay.md) - Message display component
- [ErrorState](./ErrorState.md) - Error state display component
- [SubmitButton](./SubmitButton.md) - Submit button with loading states
- [InputText](./InputText.md) - Text input field component

