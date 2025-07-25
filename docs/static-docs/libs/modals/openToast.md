# openToast

**Category:** Library | **Type:** notification utility

Auto-dismissing toast notifications with status-based styling and icons. Perfect for providing immediate feedback to user actions with different severity levels.

**File Location:** `src/components/lib/modals/modals.ts`

## 🏷️ Tags

`toast`, `notification`, `feedback`, `status`, `auto-dismiss`, `ui`

## 📖 Usage Example

```tsx
"use client";

import React, { useState } from "react";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Example demonstrating openToast function
 */
const ToastNotificationExample = () => {
  const [toastHistory, setToastHistory] = useState<any[]>([]);
  const [customMessage, setCustomMessage] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<number>(200);

  const addToHistory = (message: string, status: number) => {
    const entry = {
      id: Date.now(),
      message,
      status,
      timestamp: new Date().toISOString()
    };
    setToastHistory(prev => [entry, ...prev.slice(0, 14)]);
  };

  // Predefined toast scenarios
  const toastScenarios = [
    {
      category: "Success Notifications",
      color: "success",
      scenarios: [
        { status: 200, message: "Profile updated successfully!", description: "Standard success" },
        { status: 201, message: "New account created successfully!", description: "Resource created" },
        { status: 200, message: "Email sent to all recipients.", description: "Bulk operation success" },
        { status: 200, message: "Payment processed successfully.", description: "Financial transaction" },
        { status: 201, message: "Project created and ready to use.", description: "New resource" }
      ]
    },
    {
      category: "Error Notifications", 
      color: "danger",
      scenarios: [
        { status: 400, message: "Please check your input and try again.", description: "Validation error" },
        { status: 400, message: "Invalid email address format.", description: "Format validation" },
        { status: 401, message: "You need to log in to access this feature.", description: "Authentication error" },
        { status: 403, message: "You don't have permission to perform this action.", description: "Authorization error" },
        { status: 404, message: "The requested resource was not found.", description: "Not found error" }
      ]
    },
    {
      category: "Server Errors",
      color: "warning", 
      scenarios: [
        { status: 500, message: "Server error occurred. Please try again later.", description: "Internal server error" },
        { status: 503, message: "Service temporarily unavailable.", description: "Service unavailable" },
        { status: 502, message: "Bad gateway. Please check your connection.", description: "Gateway error" },
        { status: 500, message: "Database connection failed.", description: "Database error" },
        { status: 500, message: "Failed to process your request.", description: "Processing error" }
      ]
    }
  ];

  const handleToastDemo = (message: string, status: number) => {
    openToast(message, status);
    addToHistory(message, status);
  };

  const handleCustomToast = () => {
    if (!customMessage.trim()) {
      openToast("Please enter a message first!", 400);
      return;
    }
    
    openToast(customMessage, selectedStatus);
    addToHistory(customMessage, selectedStatus);
  };

  const handleDefaultToast = (status: number) => {
    // Show toast with default message for the status
    openToast(undefined, status);
    
    const defaultMessages = {
      200: "Awesome! The update was made.",
      500: "Sorry, the server can't process your request",
      400: "Hmmm..., Something went wrong. Try again"
    };
    
    const message = defaultMessages[status as keyof typeof defaultMessages] || 
                   defaultMessages[400];
    addToHistory(`[Default] ${message}`, status);
  };

  // Simulate real-world scenarios
  const simulateScenarios = [
    {
      name: "Save Document",
      action: () => {
        openToast("Saving document...", 200);
        setTimeout(() => {
          openToast("Document saved successfully!", 200);
          addToHistory("Document saved successfully!", 200);
        }, 1000);
      }
    },
    {
      name: "Delete Item",
      action: () => {
        openToast("Deleting item...", 200);
        setTimeout(() => {
          if (Math.random() > 0.3) {
            openToast("Item deleted successfully!", 200);
            addToHistory("Item deleted successfully!", 200);
          } else {
            openToast("Failed to delete item. Please try again.", 500);
            addToHistory("Failed to delete item. Please try again.", 500);
          }
        }, 1500);
      }
    },
    {
      name: "Send Email",
      action: () => {
        openToast("Sending email...", 200);
        setTimeout(() => {
          openToast("Email sent successfully to 3 recipients!", 200);
          addToHistory("Email sent successfully to 3 recipients!", 200);
        }, 2000);
      }
    }
  ];

  return (
    <div className="ihub-container ihub-py-5">
      <h1>Toast Notification Examples</h1>

      {/* Custom Toast */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Custom Toast Builder</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-row ihub-mb-3">
            <div className="ihub-col-md-6">
              <label className="ihub-form-label">Custom Message:</label>
              <input
                type="text"
                className="ihub-form-control"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Enter your custom message"
              />
            </div>
            <div className="ihub-col-md-3">
              <label className="ihub-form-label">Status Code:</label>
              <select
                className="ihub-form-control"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(Number(e.target.value))}
              >
                <option value={200}>200 - Success</option>
                <option value={201}>201 - Created</option>
                <option value={400}>400 - Bad Request</option>
                <option value={401}>401 - Unauthorized</option>
                <option value={403}>403 - Forbidden</option>
                <option value={404}>404 - Not Found</option>
                <option value={500}>500 - Server Error</option>
                <option value={503}>503 - Service Unavailable</option>
              </select>
            </div>
            <div className="ihub-col-md-3">
              <label className="ihub-form-label">&nbsp;</label>
              <div>
                <button
                  className="ihub-btn ihub-btn-primary ihub-w-100"
                  onClick={handleCustomToast}
                >
                  Show Custom Toast
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Default Messages */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Default Messages</h2>
        <div className="ihub-card ihub-p-4">
          <p>Show toasts with default messages for different status codes:</p>
          <div className="ihub-d-flex ihub-gap-2 ihub-flex-wrap">
            <button
              className="ihub-btn ihub-btn-success"
              onClick={() => handleDefaultToast(200)}
            >
              Default Success (200)
            </button>
            <button
              className="ihub-btn ihub-btn-warning"
              onClick={() => handleDefaultToast(400)}
            >
              Default Error (400)
            </button>
            <button
              className="ihub-btn ihub-btn-danger"
              onClick={() => handleDefaultToast(500)}
            >
              Default Server Error (500)
            </button>
          </div>
        </div>
      </section>

      {/* Predefined Scenarios */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Toast Categories</h2>
        {toastScenarios.map((category, categoryIndex) => (
          <div key={categoryIndex} className="ihub-mb-4">
            <h4 className={`text-${category.color} ihub-mb-3`}>
              <i className={`pi ${
                category.color === 'success' ? 'pi-check-circle' :
                category.color === 'danger' ? 'pi-times-circle' :
                'pi-exclamation-triangle'
              } ihub-me-2`}></i>
              {category.category}
            </h4>
            <div className="ihub-row">
              {category.scenarios.map((scenario, index) => (
                <div key={index} className="ihub-col-md-6 ihub-mb-3">
                  <div className="ihub-card ihub-h-100">
                    <div className="ihub-card-body ihub-p-3">
                      <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center ihub-mb-2">
                        <h6 className="ihub-mb-0">{scenario.description}</h6>
                        <span className={`ihub-badge ihub-badge-${category.color}`}>
                          {scenario.status}
                        </span>
                      </div>
                      <p className="ihub-card-text ihub-text-sm ihub-mb-3">
                        "{scenario.message}"
                      </p>
                      <button
                        className={`ihub-btn ihub-btn-${category.color} ihub-btn-sm ihub-w-100`}
                        onClick={() => handleToastDemo(scenario.message, scenario.status)}
                      >
                        Show Toast
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Simulation Scenarios */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Real-World Simulations</h2>
        <div className="ihub-card ihub-p-4">
          <p>Simulate real application scenarios with loading and result toasts:</p>
          <div className="ihub-d-flex ihub-gap-2 ihub-flex-wrap">
            {simulateScenarios.map((scenario, index) => (
              <button
                key={index}
                className="ihub-btn ihub-btn-outline-primary"
                onClick={scenario.action}
              >
                {scenario.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Toast History */}
      {toastHistory.length > 0 && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">Toast History</h2>
          <div className="ihub-card">
            <div className="table-responsive">
              <table className="table table-hover ihub-mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Type</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {toastHistory.map((entry) => (
                    <tr key={entry.id}>
                      <td>
                        <small>"{entry.message}"</small>
                      </td>
                      <td>
                        <span className={`ihub-badge ${
                          entry.status === 200 || entry.status === 201 ? 'ihub-badge-success' :
                          entry.status >= 400 && entry.status < 500 ? 'ihub-badge-warning' :
                          'ihub-badge-danger'
                        }`}>
                          {entry.status}
                        </span>
                      </td>
                      <td>
                        <small>
                          {entry.status === 200 || entry.status === 201 ? '✅ Success' :
                           entry.status >= 400 && entry.status < 500 ? '⚠️ Client Error' :
                           '❌ Server Error'}
                        </small>
                      </td>
                      <td>
                        <small>{new Date(entry.timestamp).toLocaleTimeString()}</small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="ihub-p-3">
              <button
                className="ihub-btn ihub-btn-outline-secondary ihub-btn-sm"
                onClick={() => setToastHistory([])}
              >
                Clear History
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Usage Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Code Examples</h2>
        
        <div className="ihub-card ihub-p-4">
          <h5>Common Usage Patterns</h5>
          <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "12px" }}>
{`// Success notifications
openToast("Profile updated successfully!", 200);
openToast("New account created!", 201);

// Error notifications  
openToast("Please check your input.", 400);
openToast("You need to log in first.", 401);
openToast("Permission denied.", 403);

// Server errors
openToast("Server error occurred.", 500);
openToast("Service unavailable.", 503);

// Using default messages
openToast(); // Shows default success message
openToast(undefined, 400); // Shows default error message
openToast(undefined, 500); // Shows default server error

// In async functions
const saveData = async () => {
  try {
    openToast("Saving data...", 200);
    await apiCall();
    openToast("Data saved successfully!", 200);
  } catch (error) {
    openToast("Failed to save data.", 500);
  }
};

// Form validation feedback
const validateForm = (formData) => {
  if (!formData.email) {
    openToast("Email is required.", 400);
    return false;
  }
  
  if (!isValidEmail(formData.email)) {
    openToast("Please enter a valid email address.", 400);
    return false;
  }
  
  openToast("Form validation passed!", 200);
  return true;
};`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default ToastNotificationExample;
```

## 🚀 Basic Usage

```tsx
import { openToast } from '@instincthub/react-ui/lib';

// Success notifications
openToast("Operation completed successfully!", 200);
openToast("New item created!", 201);

// Error notifications
openToast("Please check your input.", 400);
openToast("Server error occurred.", 500);

// Using default messages
openToast(); // Default success message
openToast(undefined, 400); // Default error message

// In async operations
const handleSubmit = async () => {
  try {
    openToast("Submitting form...", 200);
    await submitForm();
    openToast("Form submitted successfully!");
  } catch (error) {
    openToast("Failed to submit form.", 500);
  }
};
```

## 🔧 Function Signature

```typescript
function openToast(message?: string, status?: number): void
```

### Parameters

- **message** (string, optional): Custom notification message
  - If not provided, uses default message based on status code
- **status** (number, optional): HTTP status code for styling (default: 200)
  - `200/201`: Success styling with green checkmark
  - `400-499`: Error styling with warning icon
  - `500+`: Server error styling with error icon

### Returns

- **void**: Function doesn't return a value

## 💡 Use Cases

- **Success Feedback**: Confirm successful operations (save, create, update)
- **Error Messages**: Display validation errors and user mistakes
- **Server Errors**: Show system errors and service unavailability
- **Progress Updates**: Indicate ongoing operations
- **Form Validation**: Provide immediate feedback on form inputs
- **API Responses**: Display results from API calls
- **User Actions**: Confirm user interactions and their outcomes

## 🎨 Visual Styling by Status Code

### Success Messages (200, 201)
- **Icon**: ✅ Green checkmark
- **Background**: Light green
- **Border**: Green accent
- **Auto-dismiss**: 10 seconds

### Client Errors (400-499)
- **Icon**: ⚠️ Warning triangle
- **Background**: Light yellow/orange
- **Border**: Warning accent
- **Auto-dismiss**: 10 seconds

### Server Errors (500+)
- **Icon**: ❌ Red X or error symbol
- **Background**: Light red
- **Border**: Red accent
- **Auto-dismiss**: 10 seconds

## 📋 Default Messages

When no custom message is provided, these defaults are used:

```tsx
// Default messages by status
const defaults = {
  200: "Awesome! The update was made.",
  201: "Awesome! The update was made.", 
  500: "Sorry, the server can't process your request",
  other: "Hmmm..., Something went wrong. Try again"
};
```

## 🔄 Toast Lifecycle

1. **Creation**: Toast element is dynamically created and styled
2. **Display**: Toast appears with fade-in animation
3. **Auto-dismiss**: Automatically removes after 10 seconds
4. **Manual Close**: User can close with X button
5. **Cleanup**: DOM element and timers are properly cleaned up

## ⚠️ Important Features

- **Auto-dismiss**: Automatically disappears after 10 seconds
- **Manual Close**: Click the X button to close immediately
- **Non-blocking**: Doesn't prevent other UI interactions
- **Stacking**: Multiple toasts can be displayed simultaneously
- **Automatic Cleanup**: Properly removes DOM elements and timers
- **Responsive**: Adapts to different screen sizes

## 🛡️ Best Practices

```tsx
// ✅ Good: Specific, actionable messages
openToast("Profile updated successfully!", 200);
openToast("Please enter a valid email address.", 400);

// ❌ Avoid: Vague or technical messages  
openToast("Error", 500);
openToast("HTTP 422 Unprocessable Entity", 422);

// ✅ Good: Use appropriate status codes
openToast("Item created!", 201);        // For new resources
openToast("Access denied.", 403);       // For permissions
openToast("Not found.", 404);           // For missing resources

// ✅ Good: Combine with loading states
const saveData = async () => {
  openToast("Saving...", 200);
  try {
    await api.save();
    openToast("Saved successfully!", 200);
  } catch (error) {
    openToast("Save failed. Try again.", 500);
  }
};
```

## 🔗 Related Functions

- [openConfirmModal](./openConfirmModal.md) - Get user confirmation
- [getUserEmailInputModal](./getUserEmailInputModal.md) - Collect email addresses