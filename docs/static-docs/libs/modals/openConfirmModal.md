# openConfirmModal

**Category:** Library | **Type:** modal utility

Promise-based confirmation dialog with customizable messaging and warning levels. Perfect for user actions that require explicit confirmation before proceeding.

**File Location:** `src/components/lib/modals/modals.ts`

## 🏷️ Tags

`modal`, `confirmation`, `dialog`, `promise`, `async`, `user-interaction`

## 📖 Usage Example

```tsx
"use client";

import React, { useState } from "react";
import { openConfirmModal, openToast } from "@instincthub/react-ui/lib";

/**
 * Example demonstrating openConfirmModal function
 */
const ConfirmModalExample = () => {
  const [actionLog, setActionLog] = useState<string[]>([]);
  const [confirmationHistory, setConfirmationHistory] = useState<any[]>([]);

  const addToLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setActionLog(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 9)]);
  };

  const addToHistory = (message: string, confirmed: boolean, isWarning: boolean) => {
    const entry = {
      id: Date.now(),
      message,
      confirmed,
      isWarning,
      timestamp: new Date().toISOString()
    };
    setConfirmationHistory(prev => [entry, ...prev.slice(0, 9)]);
  };

  // Basic confirmation examples
  const confirmationScenarios = [
    {
      title: "Delete Item",
      message: "Are you sure you want to delete this item? This action cannot be undone.",
      warning: true,
      description: "High-impact deletion with warning flag"
    },
    {
      title: "Save Changes",
      message: "Do you want to save your changes before leaving?",
      warning: false,
      description: "Standard save confirmation"
    },
    {
      title: "Submit Form",
      message: "Submit your application? You won't be able to edit it after submission.",
      warning: true,
      description: "Form submission with warning"
    },
    {
      title: "Cancel Order",
      message: "Cancel your order and request a refund?",
      warning: false,
      description: "Order cancellation confirmation"
    },
    {
      title: "Reset Password",
      message: "Reset your password? A new password will be sent to your email.",
      warning: false,
      description: "Password reset confirmation"
    }
  ];

  const handleConfirmation = async (scenario: typeof confirmationScenarios[0]) => {
    addToLog(`Opening confirmation: "${scenario.title}"`);
    
    try {
      const confirmed = await openConfirmModal(scenario.message, scenario.warning);
      
      addToLog(`User ${confirmed ? 'confirmed' : 'cancelled'}: "${scenario.title}"`);
      addToHistory(scenario.message, confirmed, scenario.warning);
      
      // Show result toast
      if (confirmed) {
        openToast(`${scenario.title} confirmed successfully!`, 200);
      } else {
        openToast(`${scenario.title} was cancelled.`, 400);
      }
    } catch (error) {
      addToLog(`Error in confirmation: ${error}`);
      openToast("An error occurred with the confirmation modal.", 500);
    }
  };

  // Complex workflow example
  const handleComplexWorkflow = async () => {
    addToLog("Starting complex multi-step confirmation workflow...");
    
    try {
      // Step 1: Initial confirmation
      const step1 = await openConfirmModal(
        "This will start a multi-step process that may take several minutes. Continue?",
        false
      );
      
      if (!step1) {
        addToLog("Workflow cancelled at step 1");
        openToast("Workflow cancelled.", 400);
        return;
      }

      addToLog("Step 1 confirmed, proceeding to step 2...");
      
      // Step 2: Warning confirmation
      const step2 = await openConfirmModal(
        "This process will modify your account settings permanently. Are you absolutely sure?",
        true
      );
      
      if (!step2) {
        addToLog("Workflow cancelled at step 2 (warning)");
        openToast("Workflow cancelled at critical step.", 400);
        return;
      }

      addToLog("Step 2 confirmed, proceeding to final step...");
      
      // Step 3: Final confirmation
      const step3 = await openConfirmModal(
        "Final confirmation: Execute all changes now? This is your last chance to cancel.",
        true
      );
      
      if (step3) {
        addToLog("All steps confirmed - executing workflow");
        openToast("Complex workflow executed successfully!", 200);
        
        // Simulate processing
        setTimeout(() => {
          addToLog("Workflow completed successfully");
          openToast("All changes have been applied!");
        }, 2000);
      } else {
        addToLog("Workflow cancelled at final step");
        openToast("Workflow cancelled at final confirmation.", 400);
      }
      
    } catch (error) {
      addToLog(`Workflow error: ${error}`);
      openToast("Workflow failed due to an error.", 500);
    }
  };

  return (
    <div className="ihub-container ihub-py-5">
      <h1>Confirmation Modal Examples</h1>

      {/* Basic Confirmations */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Confirmation Scenarios</h2>
        <div className="ihub-row">
          {confirmationScenarios.map((scenario, index) => (
            <div key={index} className="ihub-col-md-6 ihub-mb-3">
              <div className="ihub-card ihub-h-100">
                <div className="ihub-card-body ihub-p-4">
                  <h5 className="ihub-card-title">
                    {scenario.warning && <i className="pi pi-exclamation-triangle text-warning ihub-me-2"></i>}
                    {!scenario.warning && <i className="pi pi-question-circle text-primary ihub-me-2"></i>}
                    {scenario.title}
                  </h5>
                  <p className="ihub-card-text ihub-text-sm">
                    {scenario.description}
                  </p>
                  <div className="ihub-mb-3">
                    <small className="text-muted">
                      <strong>Message:</strong> "{scenario.message}"
                    </small>
                  </div>
                  <button
                    className={`ihub-btn ihub-btn-sm ${
                      scenario.warning ? 'ihub-btn-warning' : 'ihub-btn-primary'
                    } ihub-w-100`}
                    onClick={() => handleConfirmation(scenario)}
                  >
                    {scenario.warning ? 'Show Warning Confirmation' : 'Show Confirmation'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Complex Workflow */}
      <section className="ihub-mb-5">
        <div className="ihub-card ihub-p-4">
          <h3>
            <i className="pi pi-cog ihub-me-2"></i>
            Multi-Step Confirmation Workflow
          </h3>
          <p>
            Demonstrate chaining multiple confirmations together for complex user workflows.
            This example shows how to handle multi-step processes with different warning levels.
          </p>
          <button
            className="ihub-btn ihub-btn-primary"
            onClick={handleComplexWorkflow}
          >
            Start Complex Workflow
          </button>
        </div>
      </section>

      {/* Action Log */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Action Log</h2>
        <div className="ihub-card">
          <div className="ihub-card-body ihub-p-4">
            {actionLog.length > 0 ? (
              <div style={{ maxHeight: "200px", overflow: "auto" }}>
                {actionLog.map((log, index) => (
                  <div key={index} className="ihub-mb-1">
                    <code className="ihub-text-sm">{log}</code>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted ihub-mb-0">
                No actions yet. Try the confirmation buttons above.
              </p>
            )}
            
            {actionLog.length > 0 && (
              <div className="ihub-mt-3">
                <button
                  className="ihub-btn ihub-btn-outline-secondary ihub-btn-sm"
                  onClick={() => setActionLog([])}
                >
                  Clear Log
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Confirmation History */}
      {confirmationHistory.length > 0 && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">Confirmation History</h2>
          <div className="ihub-card">
            <div className="table-responsive">
              <table className="table table-hover ihub-mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Message</th>
                    <th>Type</th>
                    <th>Result</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {confirmationHistory.map((entry) => (
                    <tr key={entry.id}>
                      <td>
                        <small>"{entry.message}"</small>
                      </td>
                      <td>
                        <span className={`ihub-badge ${
                          entry.isWarning ? 'ihub-badge-warning' : 'ihub-badge-primary'
                        }`}>
                          {entry.isWarning ? 'Warning' : 'Normal'}
                        </span>
                      </td>
                      <td>
                        <span className={`ihub-badge ${
                          entry.confirmed ? 'ihub-badge-success' : 'ihub-badge-danger'
                        }`}>
                          {entry.confirmed ? 'Confirmed' : 'Cancelled'}
                        </span>
                      </td>
                      <td>
                        <small>{new Date(entry.timestamp).toLocaleTimeString()}</small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
{`// Basic confirmation
const handleDelete = async () => {
  const confirmed = await openConfirmModal(
    "Are you sure you want to delete this item?"
  );
  
  if (confirmed) {
    await deleteItem();
    openToast("Item deleted successfully!");
  }
};

// Warning confirmation for critical actions
const handleCriticalAction = async () => {
  const confirmed = await openConfirmModal(
    "This will permanently delete all your data. Continue?",
    true  // Show warning flag
  );
  
  if (confirmed) {
    await performCriticalAction();
  }
};

// Multi-step confirmation workflow
const handleWorkflow = async () => {
  try {
    const step1 = await openConfirmModal("Start process?");
    if (!step1) return;
    
    const step2 = await openConfirmModal(
      "This action is irreversible. Continue?", 
      true
    );
    if (!step2) return;
    
    // Execute workflow
    await executeWorkflow();
    openToast("Workflow completed!");
    
  } catch (error) {
    openToast("Workflow failed.", 500);
  }
};`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default ConfirmModalExample;
```

## 🚀 Basic Usage

```tsx
import { openConfirmModal } from '@instincthub/react-ui/lib';

// Basic confirmation
const handleAction = async () => {
  const confirmed = await openConfirmModal("Are you sure you want to proceed?");
  
  if (confirmed) {
    // User confirmed - proceed with action
    performAction();
  } else {
    // User cancelled - handle cancellation
    console.log("Action cancelled");
  }
};

// Warning confirmation for critical actions
const handleCriticalAction = async () => {
  const confirmed = await openConfirmModal(
    "This will permanently delete all data. Continue?",
    true  // Warning flag
  );
  
  if (confirmed) {
    await deletePermanently();
  }
};
```

## 🔧 Function Signature

```typescript
function openConfirmModal(message: string, flag?: boolean): Promise<boolean>
```

### Parameters

- **message** (string): The confirmation message to display to the user
- **flag** (boolean, optional): Warning level flag
  - `false` (default): Normal confirmation with standard styling
  - `true`: Warning confirmation with enhanced warning indicators

### Returns

- **Promise<boolean>**: Resolves to `true` if user confirms, `false` if user cancels

## 💡 Use Cases

- **Delete Actions**: Confirm before deleting files, records, or accounts
- **Form Submissions**: Verify before submitting important forms
- **Navigation**: Confirm before leaving pages with unsaved changes
- **Purchases**: Confirm before processing payments
- **Account Changes**: Verify before modifying critical account settings
- **Bulk Operations**: Confirm before performing batch operations
- **Data Export**: Confirm before exporting sensitive data

## 🎨 Visual Behavior

### Normal Confirmation (`flag: false`)
- **Icon**: Question mark (blue)
- **Styling**: Standard modal appearance
- **Buttons**: "Cancel" and "Confirm"
- **Use Case**: Standard user confirmations

### Warning Confirmation (`flag: true`)
- **Icon**: Exclamation triangle (warning color)
- **Styling**: Enhanced warning appearance
- **Buttons**: "Cancel" and "Confirm" with warning emphasis
- **Use Case**: Critical or irreversible actions

## 🔄 Modal Lifecycle

1. **Creation**: Modal elements are dynamically created and added to DOM
2. **Display**: Modal appears with backdrop and focus management
3. **User Interaction**: User can confirm, cancel, click backdrop, or press Escape
4. **Resolution**: Promise resolves with boolean result
5. **Cleanup**: Modal elements and event listeners are automatically removed

## ⚠️ Important Features

- **Promise-based**: Clean async/await integration
- **Automatic Cleanup**: DOM elements and event listeners are properly cleaned up
- **Keyboard Support**: Escape key to cancel, Enter key to confirm
- **Click Outside**: Clicking modal backdrop cancels the confirmation
- **Focus Management**: Proper focus handling for accessibility
- **Single Instance**: Only one confirmation can be open at a time

## 🛡️ Error Handling

```tsx
try {
  const confirmed = await openConfirmModal("Delete item?", true);
  
  if (confirmed) {
    await performRiskyOperation();
    openToast("Operation successful!");
  }
} catch (error) {
  console.error("Confirmation modal error:", error);
  openToast("Something went wrong.", 500);
}
```

## 🔗 Related Functions

- [openToast](./openToast.md) - Show notification messages
- [getUserEmailInputModal](./getUserEmailInputModal.md) - Collect email addresses
- [openConfirmDelete](../modals-openConfirmDelete.md) - Specialized deletion confirmation