# ErrorState

**Category:** Status | **Type:** component

Error state display component for handling various error scenarios

## 🏷️ Tags

`status`, `error`, `fallback`, `display`

```tsx
"use client";
import React, { useState } from "react";
import { ErrorState } from "@instincthub/react-ui";

/**
 * Example component demonstrating various ways to use the ErrorState component
 */
const ErrorStateExamples = () => {
  const [showApiError, setShowApiError] = useState<boolean>(false);
  const [showNetworkError, setShowNetworkError] = useState<boolean>(false);
  const [showValidationError, setShowValidationError] = useState<boolean>(false);
  const [showGenericError, setShowGenericError] = useState<boolean>(false);
  const [showCustomError, setShowCustomError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);

  // Simulate API call that fails
  const simulateApiError = async () => {
    setIsLoading(true);
    setShowApiError(false);
    
    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      setShowApiError(true);
    }, 2000);
  };

  // Simulate network connectivity issues
  const simulateNetworkError = () => {
    setShowNetworkError(true);
  };

  // Simulate form validation errors
  const simulateValidationError = () => {
    setShowValidationError(true);
  };

  // Simulate generic application error
  const simulateGenericError = () => {
    setShowGenericError(true);
  };

  // Simulate custom error scenario
  const simulateCustomError = () => {
    setShowCustomError(true);
  };

  // Handle retry functionality
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setShowApiError(false);
    setShowNetworkError(false);
    setShowValidationError(false);
    setShowGenericError(false);
    setShowCustomError(false);
    
    // Simulate retry logic
    if (retryCount < 2) {
      simulateApiError();
    } else {
      alert("Maximum retry attempts reached. Please contact support.");
    }
  };

  // Reset all error states
  const resetErrors = () => {
    setShowApiError(false);
    setShowNetworkError(false);
    setShowValidationError(false);
    setShowGenericError(false);
    setShowCustomError(false);
    setRetryCount(0);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>ErrorState Examples</h1>
      
      <div className="ihub-mb-4">
        <h2>Trigger Different Error Types</h2>
        <div
          className="ihub-d-flex ihub-py-3"
          style={{ gap: "15px", flexWrap: "wrap" }}
        >
          <button
            className="ihub-danger-btn"
            onClick={simulateApiError}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Trigger API Error"}
          </button>

          <button
            className="ihub-warning-btn"
            onClick={simulateNetworkError}
          >
            Trigger Network Error
          </button>

          <button
            className="ihub-info-btn"
            onClick={simulateValidationError}
          >
            Trigger Validation Error
          </button>

          <button
            className="ihub-secondary-btn"
            onClick={simulateGenericError}
          >
            Trigger Generic Error
          </button>

          <button
            className="ihub-outlined-btn"
            onClick={simulateCustomError}
          >
            Trigger Custom Error
          </button>

          <button
            className="ihub-success-btn"
            onClick={resetErrors}
          >
            Reset All Errors
          </button>
        </div>
      </div>

      {/* API Error Example */}
      {showApiError && (
        <div className="ihub-mb-5">
          <h3>API Error Example</h3>
          <ErrorState
            title="API Request Failed"
            text="Unable to fetch data from the server. This could be due to server maintenance or a temporary issue. Please try again in a few moments."
          />
          <div className="ihub-mt-3">
            <button className="ihub-primary-btn ihub-mr-2" onClick={handleRetry}>
              Retry Request ({3 - retryCount} attempts left)
            </button>
            <button className="ihub-outlined-btn" onClick={resetErrors}>
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Network Error Example */}
      {showNetworkError && (
        <div className="ihub-mb-5">
          <h3>Network Connectivity Error</h3>
          <ErrorState
            title="No Internet Connection"
            text="Please check your internet connection and try again. Make sure you're connected to a stable network."
          />
          <div className="ihub-mt-3">
            <button className="ihub-primary-btn ihub-mr-2" onClick={handleRetry}>
              Check Connection
            </button>
            <button className="ihub-outlined-btn" onClick={resetErrors}>
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Validation Error Example */}
      {showValidationError && (
        <div className="ihub-mb-5">
          <h3>Form Validation Error</h3>
          <ErrorState
            title="Invalid Form Data"
            text="Please review the form and correct any highlighted errors before submitting. All required fields must be completed."
          />
          <div className="ihub-mt-3">
            <button className="ihub-primary-btn ihub-mr-2" onClick={resetErrors}>
              Review Form
            </button>
            <button className="ihub-outlined-btn" onClick={resetErrors}>
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Generic Error Example */}
      {showGenericError && (
        <div className="ihub-mb-5">
          <h3>Generic Application Error</h3>
          <ErrorState
            title="Something Went Wrong"
            text="An unexpected error occurred while processing your request. Our team has been notified and is working to resolve the issue."
          />
          <div className="ihub-mt-3">
            <button className="ihub-primary-btn ihub-mr-2" onClick={handleRetry}>
              Try Again
            </button>
            <button className="ihub-secondary-btn ihub-mr-2" onClick={() => window.location.reload()}>
              Refresh Page
            </button>
            <button className="ihub-outlined-btn" onClick={resetErrors}>
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Custom Error Example */}
      {showCustomError && (
        <div className="ihub-mb-5">
          <h3>Custom Error Scenario</h3>
          <ErrorState
            title="File Upload Failed"
            text="The file you're trying to upload is too large or in an unsupported format. Please try again with a file under 10MB in JPG, PNG, or PDF format."
          />
          <div className="ihub-mt-3">
            <button className="ihub-primary-btn ihub-mr-2" onClick={resetErrors}>
              Choose Different File
            </button>
            <button className="ihub-info-btn ihub-mr-2" onClick={() => alert("File format help: Supported formats are JPG, PNG, PDF. Maximum size: 10MB")}>
              Help with File Formats
            </button>
            <button className="ihub-outlined-btn" onClick={resetErrors}>
              Cancel Upload
            </button>
          </div>
        </div>
      )}

      {/* Static Examples Section */}
      <div className="ihub-mt-5">
        <h2>Static Error Examples</h2>
        
        {/* Basic Error */}
        <div className="ihub-mb-4">
          <h3>Basic Error Display</h3>
          <ErrorState
            title="Oops! Something went wrong"
            text="We encountered an issue while processing your request."
          />
        </div>

        {/* Permission Error */}
        <div className="ihub-mb-4">
          <h3>Permission Denied Error</h3>
          <ErrorState
            title="Access Denied"
            text="You don't have permission to access this resource. Please contact your administrator for assistance."
          />
        </div>

        {/* Timeout Error */}
        <div className="ihub-mb-4">
          <h3>Request Timeout Error</h3>
          <ErrorState
            title="Request Timeout"
            text="The request took too long to complete. Please check your connection and try again."
          />
        </div>

        {/* Data Not Found Error */}
        <div className="ihub-mb-4">
          <h3>Data Not Found Error</h3>
          <ErrorState
            title="No Data Found"
            text="The requested information could not be found. It may have been moved or deleted."
          />
        </div>

        {/* Service Unavailable Error */}
        <div className="ihub-mb-4">
          <h3>Service Unavailable Error</h3>
          <ErrorState
            title="Service Temporarily Unavailable"
            text="Our services are currently undergoing maintenance. Please try again later."
          />
        </div>
      </div>

      {/* Error State Usage Patterns */}
      <div className="ihub-mt-5">
        <h2>Common Usage Patterns</h2>
        
        <div className="ihub-mb-4">
          <h3>With Loading States</h3>
          <p>Combine ErrorState with loading indicators for better UX:</p>
          <pre className="ihub-bg-light ihub-p-3 ihub-rounded">
{`const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);

// In your JSX
{isLoading && <div>Loading...</div>}
{error && (
  <ErrorState
    title="Error occurred"
    text={error.message}
  />
)}`}
          </pre>
        </div>

        <div className="ihub-mb-4">
          <h3>With Retry Functionality</h3>
          <p>Add retry buttons for better error recovery:</p>
          <pre className="ihub-bg-light ihub-p-3 ihub-rounded">
{`<ErrorState
  title="Network Error"
  text="Failed to load data"
/>
<button onClick={retryFunction}>
  Retry
</button>`}
          </pre>
        </div>

        <div className="ihub-mb-4">
          <h3>Error Boundary Integration</h3>
          <p>Use ErrorState in React Error Boundaries:</p>
          <pre className="ihub-bg-light ihub-p-3 ihub-rounded">
{`class ErrorBoundary extends React.Component {
  render() {
    if (this.state.hasError) {
      return (
        <ErrorState
          title="Application Error"
          text="Something went wrong in the application"
        />
      );
    }
    return this.props.children;
  }
}`}
          </pre>
        </div>
      </div>

      <div className="ihub-mt-5">
        <h2>Best Practices</h2>
        <ul>
          <li><strong>Clear Messages:</strong> Use specific, actionable error messages</li>
          <li><strong>Consistent Styling:</strong> ErrorState provides consistent error UI across your app</li>
          <li><strong>Retry Options:</strong> Always provide a way for users to recover from errors</li>
          <li><strong>Error Logging:</strong> Log errors for debugging while showing user-friendly messages</li>
          <li><strong>Progressive Disclosure:</strong> Show technical details only when necessary</li>
          <li><strong>Fallback Navigation:</strong> The component includes a "Back to homepage" link</li>
        </ul>
      </div>
    </div>
  );
};

export default ErrorStateExamples;
```

## 🔗 Related Components

- [TimeTracker](./TimeTracker.md) - Time tracking component
- [SessionHandleProvider](./SessionHandleProvider.md) - Session handling provider component
- [Error500](./Error500.md) - 500 error display component
- [ReactTimeTracker](./ReactTimeTracker.md) - React time tracking component
- [DeleteConfirmationModal](./DeleteConfirmationModal.md) - Delete confirmation modal component

