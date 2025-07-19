# HandleError

**Category:** Forms | **Type:** component

Error handling component

## 🏷️ Tags

`forms`, `error`, `handling`, `api`, `response`

```tsx
"use client";
import React, { useState, useRef } from "react";
import { HandleError, InputText, SubmitButton, FormError } from "@instincthub/react-ui";
import { useRouter } from "next/navigation";

/**
 * Example component demonstrating various ways to use the HandleError component
 */
const HandleErrorExamples = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  
  // State for form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  // State for API responses
  const [apiResponse, setApiResponse] = useState<{
    status: number;
    items: Record<string, any>;
  } | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Simulate API responses
  const simulateResponse = (status: number, items: Record<string, any>) => {
    setApiResponse({ status, items });
    
    // Use HandleError component to process the response
    if (typeof window !== 'undefined') {
      // Add server error element to DOM if it doesn't exist
      let serverErrElement = document.querySelector('.server_err');
      if (!serverErrElement) {
        serverErrElement = document.createElement('div');
        serverErrElement.className = 'server_err';
        serverErrElement.style.display = 'none';
        serverErrElement.innerHTML = `
          <h3>Server Message</h3>
          <p>Processing your request...</p>
          <a href="#"><button><span>Continue</span></button></a>
        `;
        document.body.appendChild(serverErrElement);
      }
    }
  };

  // Example form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate different responses based on form data
      if (formData.username === "admin") {
        simulateResponse(400, {
          user: ["This field must be unique."]
        });
      } else if (formData.email === "test@duplicate.com") {
        simulateResponse(400, {
          email: ["Email already exists"],
          username: ["Username is too short"]
        });
      } else if (formData.username === "unauthorized") {
        simulateResponse(401, {
          detail: "Invalid credentials provided"
        });
      } else {
        simulateResponse(201, {
          message: "Registration successful"
        });
      }
    } catch (error) {
      simulateResponse(500, {
        detail: "Internal server error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>HandleError Examples</h1>

      {/* API Response Simulator */}
      <div className="ihub-card ihub-mb-4">
        <h2>API Response Simulator</h2>
        <p>Click buttons to simulate different API responses</p>
        
        <div className="ihub-d-flex ihub-flex-wrap" style={{ gap: "10px", marginBottom: "20px" }}>
          <button 
            className="ihub-danger-btn" 
            onClick={() => simulateResponse(400, {
              username: ["Username already exists"],
              email: ["Invalid email format"]
            })}
          >
            Validation Error (400)
          </button>
          
          <button 
            className="ihub-warning-btn" 
            onClick={() => simulateResponse(400, {
              user: ["This field must be unique."]
            })}
          >
            Duplicate User (400)
          </button>
          
          <button 
            className="ihub-danger-btn" 
            onClick={() => simulateResponse(401, {
              detail: "Authentication failed"
            })}
          >
            Unauthorized (401)
          </button>
          
          <button 
            className="ihub-success-btn" 
            onClick={() => simulateResponse(201, {
              message: "Success"
            })}
          >
            Success (201)
          </button>
        </div>
        
        {/* Display current response */}
        {apiResponse && (
          <div className="ihub-code-block">
            <strong>API Response:</strong>
            <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
          </div>
        )}
        
        {/* HandleError component */}
        {apiResponse && (
          <HandleError
            status={apiResponse.status}
            items={apiResponse.items}
            registerForm={formRef.current}
            r_path={apiResponse.status === 201 ? "/dashboard" : null}
          />
        )}
      </div>

      {/* Interactive Form Example */}
      <div className="ihub-card ihub-mb-4">
        <h2>Interactive Registration Form</h2>
        <p>Try different usernames to see HandleError in action:</p>
        <ul>
          <li><code>admin</code> - Simulates duplicate user error</li>
          <li><code>test@duplicate.com</code> - Simulates validation errors</li>
          <li><code>unauthorized</code> - Simulates unauthorized error</li>
          <li>Other values - Simulates success</li>
        </ul>
        
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <InputText
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                placeholder="Try 'admin' for duplicate error"
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
                placeholder="Try 'test@duplicate.com'"
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
              />
            </div>
          </div>
          
          <SubmitButton 
            label="Register" 
            status={isSubmitting ? 0 : 1}
            className="ihub-mt-4"
            disabled={isSubmitting}
          />
        </form>
      </div>

      {/* Error Handling Patterns */}
      <div className="ihub-card ihub-mb-4">
        <h2>Error Handling Patterns</h2>
        <p>Common patterns when using HandleError component</p>
        
        <div className="ihub-code-block">
          <pre>
{`// Example usage in a form submission
const handleFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });
    
    const data = await response.json();
    
    // Use HandleError to process the response
    return (
      <HandleError
        status={response.status}
        items={data}
        registerForm={formRef.current}
        r_path={response.ok ? "/dashboard" : null}
      />
    );
  } catch (error) {
    console.error('Request failed:', error);
  }
};`}
          </pre>
        </div>
      </div>

      {/* Component Behavior */}
      <div className="ihub-card">
        <h2>Component Behavior</h2>
        <p>Understanding how HandleError processes different scenarios</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <h4>Status Code Handling:</h4>
            <ul>
              <li><strong>400:</strong> Validation errors - displays field-specific errors</li>
              <li><strong>401:</strong> Unauthorized - shows authentication message</li>
              <li><strong>200/201/202:</strong> Success - redirects to specified path</li>
              <li><strong>Other:</strong> Generic error handling</li>
            </ul>
          </div>
          
          <div className="ihub-col-md-6">
            <h4>Special Cases:</h4>
            <ul>
              <li><strong>Duplicate User:</strong> Shows "We already have your details!" message</li>
              <li><strong>Registration Details:</strong> Updates button text and links</li>
              <li><strong>DOM Manipulation:</strong> Updates .server_err elements</li>
              <li><strong>Navigation:</strong> Handles router.push() for redirects</li>
            </ul>
          </div>
        </div>
        
        <div className="ihub-mt-4">
          <h4>Server Error Element Structure:</h4>
          <div className="ihub-code-block">
            <pre>
{`<!-- Required DOM structure for HandleError -->
<div class="server_err" style="display: none;">
  <h3>Error Title</h3>
  <p>Error message content</p>
  <a href="#"><button><span>Action Button</span></button></a>
</div>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandleErrorExamples;
```

## 🔗 Related Components

- [FormError](./FormError.md) - Form error display component
- [MessageDisplay](./MessageDisplay.md) - Message display component
- [ErrorState](./ErrorState.md) - Error state display component
- [SubmitButton](./SubmitButton.md) - Submit button with loading states
- [InputText](./InputText.md) - Text input field component

