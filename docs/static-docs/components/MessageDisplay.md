# MessageDisplay

**Category:** Forms | **Type:** component

A versatile message display component for showing notifications, alerts, toasts, and status messages with different styling variants.

## 🏷️ Tags

`forms`, `messages`, `notifications`, `alerts`, `status`

```tsx
"use client";
import React, { useState, useEffect } from "react";
import { MessageDisplay } from "@instincthub/react-ui";

/**
 * Example component demonstrating various ways to use the MessageDisplay component
 */
const MessageDisplayExamples = () => {
  const [formMessage, setFormMessage] = useState<string>("");
  const [formMessageType, setFormMessageType] = useState<"success" | "failed" | "note">("success");
  const [showTimeoutMessage, setShowTimeoutMessage] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<{message: string, type: "success" | "failed" | "note"} | null>(null);

  // Simulate form submission
  const handleFormSubmit = (type: "success" | "failed") => {
    if (type === "success") {
      setFormMessage("Profile updated successfully! Your changes have been saved.");
      setFormMessageType("success");
    } else {
      setFormMessage("Failed to update profile. Please check your input and try again.");
      setFormMessageType("failed");
    }

    // Clear message after 5 seconds
    setTimeout(() => {
      setFormMessage("");
    }, 5000);
  };

  // Simulate API call with different responses
  const simulateApiCall = (responseType: "success" | "error" | "info") => {
    setApiResponse(null);
    
    setTimeout(() => {
      switch (responseType) {
        case "success":
          setApiResponse({
            message: "Data loaded successfully from the server.",
            type: "success"
          });
          break;
        case "error":
          setApiResponse({
            message: "Network error occurred. Please check your connection and try again.",
            type: "failed"
          });
          break;
        case "info":
          setApiResponse({
            message: "This is important information about the upcoming system maintenance.",
            type: "note"
          });
          break;
      }
    }, 1000);
  };

  // Auto-hide timeout message
  const showAutoHideMessage = () => {
    setShowTimeoutMessage(true);
    setTimeout(() => {
      setShowTimeoutMessage(false);
    }, 3000);
  };

  // Clear API response
  const clearApiResponse = () => {
    setApiResponse(null);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>MessageDisplay Examples</h1>

      {/* Static Message Examples */}
      <div className="ihub-mb-5">
        <h2>Static Messages</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <h4>Success Message</h4>
            <MessageDisplay
              messages="Account created successfully! Welcome to our platform."
              flag="success"
            />
          </div>
          
          <div className="ihub-col-md-4">
            <h4>Error Message</h4>
            <MessageDisplay
              messages="Invalid credentials. Please check your username and password."
              flag="failed"
            />
          </div>
          
          <div className="ihub-col-md-4">
            <h4>Info Message</h4>
            <MessageDisplay
              messages="Your session will expire in 10 minutes. Please save your work."
              flag="note"
            />
          </div>
        </div>
      </div>

      {/* Interactive Form Examples */}
      <div className="ihub-mb-5">
        <h2>Form Feedback Messages</h2>
        <div className="ihub-buttons ihub-mb-3">
          <button 
            className="ihub-primary-btn"
            onClick={() => handleFormSubmit("success")}
          >
            Simulate Success
          </button>
          <button 
            className="ihub-danger-btn"
            onClick={() => handleFormSubmit("failed")}
          >
            Simulate Error
          </button>
        </div>
        
        {formMessage && (
          <MessageDisplay
            messages={formMessage}
            flag={formMessageType}
          />
        )}
      </div>

      {/* API Response Messages */}
      <div className="ihub-mb-5">
        <h2>API Response Messages</h2>
        <div className="ihub-buttons ihub-mb-3">
          <button 
            className="ihub-primary-btn"
            onClick={() => simulateApiCall("success")}
          >
            Success Response
          </button>
          <button 
            className="ihub-danger-btn"
            onClick={() => simulateApiCall("error")}
          >
            Error Response
          </button>
          <button 
            className="ihub-secondary-btn"
            onClick={() => simulateApiCall("info")}
          >
            Info Response
          </button>
          {apiResponse && (
            <button 
              className="ihub-outlined-btn"
              onClick={clearApiResponse}
            >
              Clear Message
            </button>
          )}
        </div>
        
        {apiResponse && (
          <MessageDisplay
            messages={apiResponse.message}
            flag={apiResponse.type}
          />
        )}
      </div>

      {/* Auto-hide Messages */}
      <div className="ihub-mb-5">
        <h2>Auto-Hide Messages (Toast-like)</h2>
        <button 
          className="ihub-important-btn"
          onClick={showAutoHideMessage}
        >
          Show Auto-Hide Message
        </button>
        
        {showTimeoutMessage && (
          <MessageDisplay
            messages="This message will disappear automatically in 3 seconds."
            flag="note"
          />
        )}
      </div>

      {/* Validation Messages */}
      <div className="ihub-mb-5">
        <h2>Form Validation Examples</h2>
        
        <div className="ihub-mb-3">
          <h4>Registration Validation</h4>
          <MessageDisplay
            messages="Password must be at least 8 characters long and contain uppercase, lowercase, and special characters."
            flag="failed"
          />
        </div>
        
        <div className="ihub-mb-3">
          <h4>Email Verification</h4>
          <MessageDisplay
            messages="Please check your email and click the verification link to complete registration."
            flag="note"
          />
        </div>
        
        <div className="ihub-mb-3">
          <h4>Profile Complete</h4>
          <MessageDisplay
            messages="Your profile is now 100% complete! You have access to all features."
            flag="success"
          />
        </div>
      </div>

      {/* System Status Messages */}
      <div className="ihub-mb-5">
        <h2>System Status & Notifications</h2>
        
        <div className="ihub-mb-3">
          <h4>Maintenance Notice</h4>
          <MessageDisplay
            messages="Scheduled maintenance will occur on Sunday, 2:00 AM - 4:00 AM EST. Some features may be temporarily unavailable."
            flag="note"
          />
        </div>
        
        <div className="ihub-mb-3">
          <h4>Security Alert</h4>
          <MessageDisplay
            messages="Unusual login activity detected. If this wasn't you, please change your password immediately."
            flag="failed"
          />
        </div>
        
        <div className="ihub-mb-3">
          <h4>Update Available</h4>
          <MessageDisplay
            messages="A new version is available! Update now to get the latest features and security improvements."
            flag="success"
          />
        </div>
      </div>

      {/* No Message State */}
      <div className="ihub-mb-5">
        <h2>No Message State</h2>
        <p>When no message is provided, the component returns null:</p>
        <MessageDisplay messages="" />
        <MessageDisplay />
        <p><em>Nothing renders above this text when messages prop is empty or undefined.</em></p>
      </div>

      {/* Implementation Guidelines */}
      <div className="ihub-mb-5">
        <h2>Implementation Guidelines</h2>
        
        <div className="ihub-alert ihub-alert-info">
          <h4>Best Practices:</h4>
          <ul>
            <li><strong>Success messages:</strong> Use for confirmations, completed actions, positive feedback</li>
            <li><strong>Error messages:</strong> Use for failures, validation errors, critical issues</li>
            <li><strong>Info messages:</strong> Use for notifications, tips, system status updates</li>
            <li><strong>Auto-hide:</strong> Consider implementing timeouts for non-critical messages</li>
            <li><strong>Accessibility:</strong> Ensure messages are readable and properly announced to screen readers</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MessageDisplayExamples;
```

## 📋 Props Reference

### MessageDisplayProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `messages` | `string` | `undefined` | The message text to display. Component returns null if empty or undefined |
| `flag` | `"success" \| "failed" \| "note"` | `undefined` | Determines the styling variant of the message |

## 🎨 Styling Variants

### Success Messages (`flag="success"`)
- **Background:** Dark gray (`#2c333a`)
- **Text:** White
- **Use cases:** Confirmations, successful operations, positive feedback

### Error Messages (`flag="failed"`)
- **Background:** Red (`#ea5f5e`)
- **Text:** White
- **Use cases:** Validation errors, failed operations, critical alerts

### Info Messages (`flag="note"`)
- **Background:** Purple-gray (`#69779b`)
- **Text:** White
- **Use cases:** Notifications, tips, system information, warnings

### Default Messages (no flag)
- **Background:** Dark gray (`#2c333a`)
- **Text:** White
- **Use cases:** General messages when no specific type is needed

## 🔗 Related Components

- [FormError](./FormError.md) - Form-specific error handling component
- [HandleError](./HandleError.md) - Error handling utilities
- [Tooltip](./Tooltip.md) - Contextual information display
- [SubmitButton](./SubmitButton.md) - Form submission with status feedback
- [InputText](./InputText.md) - Text input with validation support

