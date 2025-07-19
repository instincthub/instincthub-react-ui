# Error500

**Category:** Status | **Type:** component

Server error display component for handling 500 internal server errors

## 🏷️ Tags

`status`, `error`, `server`, `500`

```tsx
"use client";
import React, { useState } from "react";
import { Error500, MultiPurposeModal, SubmitButton } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Example component demonstrating various ways to use the Error500 component
 * for different server error scenarios and use cases
 */
const Error500Examples = () => {
  const [showRetryModal, setShowRetryModal] = useState<boolean>(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);

  // Simulate API retry functionality
  const handleRetry = async () => {
    setIsRetrying(true);
    setRetryCount(prev => prev + 1);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsRetrying(false);
      if (retryCount < 2) {
        openToast(`Retry attempt ${retryCount + 1} failed. Please try again.`, "error");
      } else {
        openToast("Service restored successfully!", "success");
        setShowRetryModal(false);
        setRetryCount(0);
      }
    }, 2000);
  };

  // Simulate database connection error
  const simulateDatabaseError = () => {
    console.log("Simulating database connection error...");
    openToast("Database connection failed", "error");
  };

  // Simulate API timeout
  const simulateApiTimeout = () => {
    console.log("Simulating API timeout error...");
    openToast("Request timeout - server took too long to respond", "error");
  };

  // Contact support functionality
  const contactSupport = () => {
    const supportEmail = "support@instincthub.com";
    const subject = "Server Error Report - 500 Internal Server Error";
    const body = `Hello Support Team,

I encountered a 500 internal server error while using the application.

Details:
- Time: ${new Date().toISOString()}
- Page: ${window.location.href}
- User Agent: ${navigator.userAgent}

Please investigate this issue.

Thank you.`;

    const mailtoLink = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>Error500 Component Examples</h1>
      <p>Comprehensive examples showing different server error scenarios and use cases.</p>

      <div className="ihub-d-flex ihub-py-5" style={{ gap: "20px", flexWrap: "wrap" }}>
        {/* Basic 500 Error */}
        <div className="ihub-card ihub-p-4" style={{ minWidth: "300px" }}>
          <h3>1. Basic Server Error</h3>
          <p>Default 500 error with standard message</p>
          <Error500 />
        </div>

        {/* Custom Error Message */}
        <div className="ihub-card ihub-p-4" style={{ minWidth: "300px" }}>
          <h3>2. Custom Error Message</h3>
          <p>500 error with specific custom message</p>
          <Error500 msg="Database connection failed. Our team has been notified and is working to resolve this issue." />
        </div>

        {/* API Failure Error */}
        <div className="ihub-card ihub-p-4" style={{ minWidth: "300px" }}>
          <h3>3. API Failure Error</h3>
          <p>Error specific to API service failures</p>
          <Error500 msg="External API service is currently unavailable. Please try again in a few minutes." />
        </div>
      </div>

      <div className="ihub-d-flex ihub-py-3" style={{ gap: "20px", flexWrap: "wrap" }}>
        {/* Interactive Examples */}
        <button
          className="ihub-danger-btn"
          onClick={() => setShowRetryModal(true)}
        >
          Show Error with Retry
        </button>

        <button
          className="ihub-warning-btn"
          onClick={() => setShowMaintenanceModal(true)}
        >
          Show Maintenance Error
        </button>

        <button
          className="ihub-outlined-btn"
          onClick={simulateDatabaseError}
        >
          Simulate Database Error
        </button>

        <button
          className="ihub-outlined-btn"
          onClick={simulateApiTimeout}
        >
          Simulate API Timeout
        </button>

        <button
          className="ihub-primary-btn"
          onClick={contactSupport}
        >
          Contact Support
        </button>
      </div>

      {/* Error with Retry Modal */}
      <MultiPurposeModal
        isOpen={showRetryModal}
        onClose={() => setShowRetryModal(false)}
        title="Server Error - Retry Available"
        size="medium"
        showFooter={true}
        footerContent={
          <div className="ihub-buttons">
            <button
              className="ihub-outlined-btn"
              onClick={() => setShowRetryModal(false)}
            >
              Cancel
            </button>
            <SubmitButton
              label={isRetrying ? "Retrying..." : `Retry ${retryCount > 0 ? `(${retryCount}/3)` : ""}`}
              onClick={handleRetry}
              status={isRetrying ? 0 : 1}
              disabled={isRetrying || retryCount >= 3}
            />
            <button
              className="ihub-secondary-btn"
              onClick={contactSupport}
            >
              Contact Support
            </button>
          </div>
        }
      >
        <Error500 msg="The server encountered an unexpected error while processing your request. You can try again or contact our support team." />
        
        {retryCount > 0 && (
          <div className="ihub-mt-3 ihub-p-3" style={{ backgroundColor: "#fff3cd", borderRadius: "4px", border: "1px solid #ffeaa7" }}>
            <small>
              <strong>Previous attempts:</strong> {retryCount}
              {retryCount >= 3 && " - Maximum retry attempts reached. Please contact support."}
            </small>
          </div>
        )}
      </MultiPurposeModal>

      {/* Maintenance Mode Modal */}
      <MultiPurposeModal
        isOpen={showMaintenanceModal}
        onClose={() => setShowMaintenanceModal(false)}
        title="Scheduled Maintenance"
        size="medium"
        showFooter={true}
        footerContent={
          <div className="ihub-buttons">
            <button
              className="ihub-outlined-btn"
              onClick={() => setShowMaintenanceModal(false)}
            >
              Close
            </button>
            <button
              className="ihub-primary-btn"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
        }
      >
        <Error500 msg="We're currently performing scheduled maintenance to improve our services. The system will be back online shortly." />
        
        <div className="ihub-mt-4">
          <h4>Maintenance Details:</h4>
          <ul>
            <li><strong>Duration:</strong> Approximately 30 minutes</li>
            <li><strong>Affected Services:</strong> All user-facing features</li>
            <li><strong>Status:</strong> <a href="#" style={{ color: "#007bff" }}>Check status page</a></li>
          </ul>
          
          <div className="ihub-mt-3">
            <small style={{ color: "#666" }}>
              Last updated: {new Date().toLocaleString()}
            </small>
          </div>
        </div>
      </MultiPurposeModal>

      {/* Additional Error Scenarios */}
      <div className="ihub-mt-5">
        <h2>Common Error Scenarios</h2>
        
        <div className="ihub-row ihub-mt-3">
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h4>4. Database Connection Error</h4>
              <Error500 msg="Unable to connect to database. This is a temporary issue and our technical team has been automatically notified." />
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h4>5. External Service Timeout</h4>
              <Error500 msg="Request timeout: The server took too long to respond. This might be due to high traffic or temporary service issues." />
            </div>
          </div>
        </div>

        <div className="ihub-row ihub-mt-3">
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h4>6. Memory/Resource Error</h4>
              <Error500 msg="Server resources are currently overloaded. Please wait a moment and try your request again." />
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h4>7. Third-party Integration Error</h4>
              <Error500 msg="A required external service is temporarily unavailable. Some features may be limited until the service is restored." />
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices Section */}
      <div className="ihub-mt-5 ihub-p-4" style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
        <h3>Best Practices for 500 Errors</h3>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <h5>User Communication:</h5>
            <ul>
              <li>Provide clear, non-technical error messages</li>
              <li>Acknowledge the issue and apologize</li>
              <li>Indicate that the team is aware and working on it</li>
              <li>Offer alternative actions when possible</li>
            </ul>
          </div>
          <div className="ihub-col-md-6">
            <h5>Recovery Options:</h5>
            <ul>
              <li>Provide retry functionality for transient errors</li>
              <li>Offer contact information for support</li>
              <li>Include timestamps for reference</li>
              <li>Link to status page for ongoing issues</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Error Logging Demo */}
      <div className="ihub-mt-4">
        <h3>Error Logging & Monitoring</h3>
        <pre style={{ backgroundColor: "#f1f1f1", padding: "15px", borderRadius: "4px", fontSize: "12px" }}>
{`// Example error logging implementation
const logServerError = (error: Error, context?: any) => {
  const errorData = {
    timestamp: new Date().toISOString(),
    message: error.message,
    stack: error.stack,
    userAgent: navigator.userAgent,
    url: window.location.href,
    userId: getCurrentUserId(), // if available
    context: context
  };
  
  // Send to logging service
  fetch('/api/log-error', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(errorData)
  });
};

// Usage in error boundaries or catch blocks
try {
  await apiCall();
} catch (error) {
  logServerError(error, { action: 'user_data_fetch' });
  // Show Error500 component
}`}
        </pre>
      </div>
    </div>
  );
};

export default Error500Examples;
```

## 📋 Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `msg` | `string` | "Something went wrong. Don't worry, it's not you. it's from our end. We are sorry for the inconvenience." | No | Custom error message to display |

## 🎯 Use Cases

### 1. **API Service Failures**
Display when external APIs or microservices are unavailable:
```tsx
<Error500 msg="Payment service is temporarily unavailable. Please try again in a few minutes." />
```

### 2. **Database Connection Issues**
Show when database connectivity problems occur:
```tsx
<Error500 msg="Database connection failed. Our team has been notified and is working to resolve this issue." />
```

### 3. **Server Overload Scenarios**
Display during high traffic or resource exhaustion:
```tsx
<Error500 msg="Server resources are currently overloaded. Please wait a moment and try your request again." />
```

### 4. **Scheduled Maintenance**
Use during planned maintenance windows:
```tsx
<Error500 msg="We're currently performing scheduled maintenance to improve our services. The system will be back online shortly." />
```

### 5. **Third-party Integration Failures**
Show when external integrations fail:
```tsx
<Error500 msg="A required external service is temporarily unavailable. Some features may be limited until the service is restored." />
```

## 💡 Implementation Examples

### With Error Boundary
```tsx
import React from 'react';
import { Error500 } from '@instincthub/react-ui';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service
    console.error('Server error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Error500 msg="An unexpected error occurred. Please refresh the page or try again later." />;
    }

    return this.props.children;
  }
}
```

### With Retry Logic
```tsx
import React, { useState } from 'react';
import { Error500, SubmitButton } from '@instincthub/react-ui';

const DataComponent = () => {
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    setRetryCount(prev => prev + 1);
    
    try {
      await fetchData();
      setError(null);
      setRetryCount(0);
    } catch (err) {
      if (retryCount < 3) {
        setError(`Retry attempt ${retryCount + 1} failed. Please try again.`);
      } else {
        setError("Maximum retry attempts reached. Please contact support.");
      }
    } finally {
      setIsRetrying(false);
    }
  };

  if (error) {
    return (
      <div>
        <Error500 msg={error} />
        {retryCount < 3 && (
          <div className="ihub-mt-3 ihub-text-center">
            <SubmitButton
              label={isRetrying ? "Retrying..." : "Try Again"}
              onClick={handleRetry}
              status={isRetrying ? 0 : 1}
              disabled={isRetrying}
            />
          </div>
        )}
      </div>
    );
  }

  return <div>{/* Normal component content */}</div>;
};
```

## 🎨 Styling

The Error500 component uses the ErrorState component internally and inherits its styling through:
- `.ihub-error-state` - Main container class
- `.ihub-error-status` - Error content wrapper
- `.ihub-error-svg-container` - Warning icon container

## ♿ Accessibility

- Uses semantic HTML structure with proper heading hierarchy
- Includes descriptive error messages for screen readers
- Warning icon provides visual cues for users
- Keyboard navigation support for interactive elements

## 📱 Responsive Design

- Adapts to different screen sizes automatically
- Error messages wrap appropriately on mobile devices
- Maintains readability across all viewport sizes

## 🔗 Related Components

- [TimeTracker](./TimeTracker.md) - Time tracking component
- [SessionHandleProvider](./SessionHandleProvider.md) - Session handling provider component
- [ErrorState](./ErrorState.md) - Error state display component
- [ReactTimeTracker](./ReactTimeTracker.md) - React time tracking component
- [DeleteConfirmationModal](./DeleteConfirmationModal.md) - Delete confirmation modal component

