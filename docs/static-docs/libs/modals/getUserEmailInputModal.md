# getUserEmailInputModal

**Category:** Library | **Type:** input modal utility

Promise-based email collection modal with built-in validation. Perfect for lead generation, course enrollment, newsletters, and user registration workflows.

**File Location:** `src/components/lib/modals/modals.ts`

## 🏷️ Tags

`modal`, `email`, `input`, `validation`, `registration`, `leads`, `promise`

## 📖 Usage Example

```tsx
"use client";

import React, { useState } from "react";
import { getUserEmailInputModal, openToast } from "@instincthub/react-ui/lib";

/**
 * Example demonstrating getUserEmailInputModal function
 */
const EmailInputModalExample = () => {
  const [collectedEmails, setCollectedEmails] = useState<any[]>([]);
  const [actionLog, setActionLog] = useState<string[]>([]);

  const addToLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setActionLog(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 9)]);
  };

  const addToEmailList = (email: string, title: string, success: boolean) => {
    const entry = {
      id: Date.now(),
      email,
      title,
      success,
      timestamp: new Date().toISOString()
    };
    setCollectedEmails(prev => [entry, ...prev.slice(0, 14)]);
  };

  // Different email collection scenarios
  const emailScenarios = [
    {
      title: "Course Enrollment",
      description: "Collect email for premium course access",
      icon: "pi-graduation-cap",
      color: "primary",
      followUpAction: (email: string) => {
        openToast(`Enrollment started for ${email}!`, 200);
        // Simulate enrollment process
        setTimeout(() => {
          openToast("Welcome email sent! Check your inbox.", 200);
        }, 2000);
      }
    },
    {
      title: "Newsletter Subscription", 
      description: "Subscribe to weekly newsletter updates",
      icon: "pi-envelope",
      color: "info",
      followUpAction: (email: string) => {
        openToast(`Subscribed ${email} to newsletter!`, 200);
        setTimeout(() => {
          openToast("Confirmation email sent!", 200);
        }, 1500);
      }
    },
    {
      title: "Download Premium Content",
      description: "Access exclusive downloadable content",
      icon: "pi-download",
      color: "success",
      followUpAction: (email: string) => {
        openToast("Preparing download link...", 200);
        setTimeout(() => {
          openToast(`Download link sent to ${email}!`, 200);
        }, 2500);
      }
    },
    {
      title: "Free Trial Access",
      description: "Start your 30-day free trial",
      icon: "pi-clock",
      color: "warning",
      followUpAction: (email: string) => {
        openToast("Setting up your trial account...", 200);
        setTimeout(() => {
          openToast("Trial account created! Login details sent via email.", 200);
        }, 3000);
      }
    },
    {
      title: "Webinar Registration",
      description: "Register for upcoming live webinar",
      icon: "pi-video",
      color: "secondary",
      followUpAction: (email: string) => {
        openToast(`Registered ${email} for webinar!`, 200);
        setTimeout(() => {
          openToast("Calendar invite and reminder email sent!", 200);
        }, 1800);
      }
    },
    {
      title: "Early Access Program",
      description: "Join exclusive early access program",
      icon: "pi-star-fill",
      color: "warning",
      followUpAction: (email: string) => {
        openToast("Adding to early access list...", 200);
        setTimeout(() => {
          openToast("Welcome to early access! You'll be notified first.", 200);
        }, 2200);
      }
    }
  ];

  const handleEmailCollection = async (scenario: typeof emailScenarios[0]) => {
    addToLog(`Opening email modal: "${scenario.title}"`);
    
    try {
      const email = await getUserEmailInputModal(scenario.title);
      
      if (email) {
        addToLog(`Email collected: ${email} for "${scenario.title}"`);
        addToEmailList(email, scenario.title, true);
        
        // Execute follow-up action
        scenario.followUpAction(email);
      } else {
        addToLog(`Email collection cancelled for "${scenario.title}"`);
        addToEmailList("", scenario.title, false);
        openToast("Email collection cancelled.", 400);
      }
    } catch (error) {
      addToLog(`Error in email collection: ${error}`);
      openToast("Something went wrong with email collection.", 500);
    }
  };

  // Bulk email collection simulation
  const handleBulkCollection = async () => {
    addToLog("Starting bulk email collection process...");
    
    const steps = [
      "Marketing Newsletter",
      "Product Updates", 
      "Community Access"
    ];
    
    const emails: string[] = [];
    
    try {
      for (const step of steps) {
        addToLog(`Step: Collecting email for "${step}"`);
        
        const email = await getUserEmailInputModal(`Subscribe to ${step}`);
        
        if (email) {
          emails.push(email);
          addToEmailList(email, step, true);
          addToLog(`Collected: ${email} for "${step}"`);
        } else {
          addToLog(`Cancelled at step: "${step}"`);
          openToast(`Bulk collection cancelled at "${step}".`, 400);
          return;
        }
      }
      
      // All emails collected
      addToLog(`Bulk collection complete! Collected ${emails.length} emails`);
      openToast(`Successfully collected ${emails.length} email subscriptions!`, 200);
      
      // Simulate processing
      setTimeout(() => {
        openToast("All confirmation emails sent!", 200);
      }, 2000);
      
    } catch (error) {
      addToLog(`Bulk collection error: ${error}`);
      openToast("Bulk collection failed.", 500);
    }
  };

  // Email validation demo
  const handleValidationDemo = async () => {
    addToLog("Opening email modal with validation demo");
    
    try {
      const email = await getUserEmailInputModal("Email Validation Demo");
      
      if (email) {
        // Simulate server-side validation
        addToLog(`Validating email: ${email}`);
        openToast("Validating email address...", 200);
        
        setTimeout(() => {
          if (email.includes('invalid') || email.includes('test')) {
            openToast("Email validation failed. Please use a real email address.", 400);
            addToLog(`Validation failed for: ${email}`);
          } else {
            openToast("Email validated successfully!", 200);
            addToLog(`Validation passed for: ${email}`);
            addToEmailList(email, "Validation Demo", true);
          }
        }, 1500);
      }
    } catch (error) {
      addToLog(`Validation demo error: ${error}`);
    }
  };

  return (
    <div className="ihub-container ihub-py-5">
      <h1>Email Input Modal Examples</h1>

      {/* Email Collection Scenarios */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Email Collection Scenarios</h2>
        <div className="ihub-row">
          {emailScenarios.map((scenario, index) => (
            <div key={index} className="ihub-col-md-6 ihub-col-lg-4 ihub-mb-4">
              <div className="ihub-card ihub-h-100">
                <div className="ihub-card-body ihub-p-4 ihub-d-flex ihub-flex-column">
                  <div className="ihub-text-center ihub-mb-3">
                    <i className={`${scenario.icon} ihub-fs-2xl text-${scenario.color}`}></i>
                  </div>
                  <h5 className="ihub-card-title ihub-text-center">
                    {scenario.title}
                  </h5>
                  <p className="ihub-card-text ihub-text-center ihub-flex-grow-1">
                    {scenario.description}
                  </p>
                  <button
                    className={`ihub-btn ihub-btn-${scenario.color} ihub-w-100`}
                    onClick={() => handleEmailCollection(scenario)}
                  >
                    Collect Email
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Advanced Scenarios */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Advanced Email Collection</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6 ihub-mb-3">
            <div className="ihub-card ihub-p-4">
              <h5>
                <i className="pi pi-list ihub-me-2"></i>
                Bulk Email Collection
              </h5>
              <p>
                Collect multiple emails in sequence for different subscription types.
                Demonstrates chaining multiple email modals together.
              </p>
              <button
                className="ihub-btn ihub-btn-primary"
                onClick={handleBulkCollection}
              >
                Start Bulk Collection
              </button>
            </div>
          </div>
          <div className="ihub-col-md-6 ihub-mb-3">
            <div className="ihub-card ihub-p-4">
              <h5>
                <i className="pi pi-shield ihub-me-2"></i>
                Email Validation Demo
              </h5>
              <p>
                Test the built-in email validation and see how it handles different 
                email formats and validation scenarios.
              </p>
              <button
                className="ihub-btn ihub-btn-info"
                onClick={handleValidationDemo}
              >
                Test Validation
              </button>
            </div>
          </div>
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
                No actions yet. Try the email collection buttons above.
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

      {/* Collected Emails */}
      {collectedEmails.length > 0 && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">Collected Emails</h2>
          <div className="ihub-card">
            <div className="table-responsive">
              <table className="table table-hover ihub-mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Email Address</th>
                    <th>Purpose</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {collectedEmails.map((entry) => (
                    <tr key={entry.id}>
                      <td>
                        {entry.success ? (
                          <span>{entry.email}</span>
                        ) : (
                          <em className="text-muted">Cancelled</em>
                        )}
                      </td>
                      <td>
                        <small>{entry.title}</small>
                      </td>
                      <td>
                        <span className={`ihub-badge ${
                          entry.success ? 'ihub-badge-success' : 'ihub-badge-warning'
                        }`}>
                          {entry.success ? 'Collected' : 'Cancelled'}
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
            <div className="ihub-p-3">
              <button
                className="ihub-btn ihub-btn-outline-secondary ihub-btn-sm"
                onClick={() => setCollectedEmails([])}
              >
                Clear Email List
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
{`// Basic email collection
const collectEmail = async () => {
  try {
    const email = await getUserEmailInputModal("Newsletter Signup");
    
    if (email) {
      console.log('Email collected:', email);
      await subscribeToNewsletter(email);
      openToast("Successfully subscribed!");
    } else {
      openToast("Subscription cancelled.", 400);
    }
  } catch (error) {
    openToast("Failed to collect email.", 500);
  }
};

// Course enrollment with email
const enrollInCourse = async (courseTitle) => {
  const email = await getUserEmailInputModal(\`Enroll in \${courseTitle}\`);
  
  if (email) {
    // Process enrollment
    const enrollment = await createEnrollment(email, courseTitle);
    
    if (enrollment.success) {
      openToast(\`Enrolled \${email} in \${courseTitle}!\`);
      
      // Send confirmation email
      await sendConfirmationEmail(email, courseTitle);
      openToast("Confirmation email sent!");
    }
  }
};

// Multi-step email collection
const collectMultipleEmails = async () => {
  const subscriptions = ['Newsletter', 'Product Updates', 'Community'];
  const emails = [];
  
  for (const subscription of subscriptions) {
    const email = await getUserEmailInputModal(\`Subscribe to \${subscription}\`);
    
    if (email) {
      emails.push({ email, subscription });
    } else {
      // User cancelled - stop collection
      openToast("Email collection cancelled.", 400);
      return;
    }
  }
  
  // Process all collected emails
  await processBulkSubscriptions(emails);
  openToast(\`Processed \${emails.length} subscriptions!\`);
};

// Email with validation
const collectWithValidation = async () => {
  const email = await getUserEmailInputModal("Premium Access");
  
  if (email) {
    // Additional validation
    if (await isEmailAlreadyRegistered(email)) {
      openToast("This email is already registered.", 400);
      return;
    }
    
    // Process new email
    await registerUser(email);
    openToast("Registration successful!");
  }
};

// Conditional email collection
const conditionalEmailCollection = async (userProfile) => {
  // Only collect email if not already available
  let email = userProfile.email;
  
  if (!email) {
    email = await getUserEmailInputModal("Complete Your Profile");
    
    if (!email) {
      openToast("Email required to continue.", 400);
      return null;
    }
    
    // Update user profile
    await updateUserProfile({ email });
  }
  
  return email;
};`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default EmailInputModalExample;
```

## 🚀 Basic Usage

```tsx
import { getUserEmailInputModal, openToast } from '@instincthub/react-ui/lib';

// Basic email collection
const handleEmailSignup = async () => {
  try {
    const email = await getUserEmailInputModal("Newsletter Signup");
    
    if (email) {
      // Process the email
      await subscribeUser(email);
      openToast("Successfully subscribed!");
    } else {
      // User cancelled
      openToast("Subscription cancelled.", 400);
    }
  } catch (error) {
    openToast("Failed to collect email.", 500);
  }
};

// Course enrollment
const enrollInCourse = async (courseTitle) => {
  const email = await getUserEmailInputModal(`Enroll in ${courseTitle}`);
  
  if (email) {
    await createEnrollment(email, courseTitle);
    openToast(`Enrolled ${email} successfully!`);
  }
};
```

## 🔧 Function Signature

```typescript
function getUserEmailInputModal(title: string): Promise<string | undefined>
```

### Parameters

- **title** (string): The title/purpose displayed in the modal
  - Appears as the modal header
  - Should describe what the email will be used for
  - Examples: "Course Enrollment", "Newsletter Signup", "Download Access"

### Returns

- **Promise<string | undefined>**: 
  - Resolves to email string if user enters valid email and submits
  - Resolves to `undefined` if user cancels or closes modal

## 💡 Use Cases

- **Course Enrollment**: Collect emails for course access and certificates
- **Newsletter Signup**: Subscribe users to mailing lists
- **Lead Generation**: Capture potential customer emails
- **Content Gates**: Require email for premium content access
- **Free Trials**: Collect emails for trial account creation
- **Webinar Registration**: Register attendees for events
- **Download Access**: Gate downloadable content behind email capture
- **Early Access**: Build lists for beta programs or early releases

## ✅ Built-in Email Validation

The modal includes comprehensive client-side validation:

### Validation Rules
- **Minimum Length**: At least 3 characters
- **Email Format**: Uses regex pattern `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- **Real-time Validation**: Checks as user types
- **Submit Control**: Submit button disabled until valid email entered

### Validation Examples
```tsx
// ✅ Valid emails
"user@example.com"
"test.email@domain.co.uk" 
"user+tag@subdomain.example.org"

// ❌ Invalid emails
"invalid.email"        // Missing @ and domain
"@example.com"         // Missing local part
"user@"                // Missing domain
"user@@example.com"    // Double @
"ab"                   // Too short
```

## 🎨 Modal Features

### Visual Elements
- **Header**: Displays the provided title
- **Input Field**: Email input with validation styling
- **Submit Button**: Disabled until valid email entered
- **Cancel Button**: Allows user to exit without providing email
- **Validation Feedback**: Real-time visual feedback

### User Interactions
- **Type to Validate**: Real-time validation as user types
- **Submit**: Click submit or press Enter when email is valid
- **Cancel**: Click cancel button or press Escape to close
- **Click Outside**: Backdrop click cancels the modal

## 🔄 Modal Lifecycle

1. **Creation**: Modal elements created and added to DOM
2. **Display**: Modal appears with focus on email input
3. **Validation**: Real-time validation as user types
4. **Submission**: User submits valid email or cancels
5. **Resolution**: Promise resolves with email or undefined
6. **Cleanup**: Modal elements and event listeners removed

## ⚠️ Important Features

- **Promise-based**: Clean async/await integration
- **Built-in Validation**: No additional validation required
- **Automatic Cleanup**: Proper DOM and event listener cleanup
- **Keyboard Support**: Enter to submit, Escape to cancel
- **Focus Management**: Automatic focus on input field
- **Single Instance**: Only one email modal can be open at a time

## 🛡️ Best Practices

```tsx
// ✅ Good: Clear, specific titles
getUserEmailInputModal("Premium Course Access");
getUserEmailInputModal("Weekly Newsletter Subscription");
getUserEmailInputModal("Free eBook Download");

// ❌ Avoid: Vague or generic titles
getUserEmailInputModal("Email");
getUserEmailInputModal("Sign Up");
getUserEmailInputModal("Input");

// ✅ Good: Handle both success and cancellation
const email = await getUserEmailInputModal("Webinar Registration");
if (email) {
  await registerForWebinar(email);
  openToast("Registration successful!");
} else {
  // User cancelled - handle gracefully
  openToast("Registration cancelled.", 400);
}

// ✅ Good: Additional server-side validation
const email = await getUserEmailInputModal("Account Creation");
if (email) {
  if (await isEmailTaken(email)) {
    openToast("Email already registered. Please use a different email.", 400);
  } else {
    await createAccount(email);
  }
}
```

## 🔄 Integration Patterns

```tsx
// Conditional email collection
const getOrCollectEmail = async (userProfile) => {
  let email = userProfile.email;
  
  if (!email) {
    email = await getUserEmailInputModal("Complete Registration");
    if (email) {
      await updateProfile({ email });
    }
  }
  
  return email;
};

// Multi-step workflow
const processSignup = async () => {
  const email = await getUserEmailInputModal("Create Account");
  if (!email) return;
  
  const confirmed = await openConfirmModal(
    `Create account for ${email}?`
  );
  
  if (confirmed) {
    await createAccount(email);
    openToast("Account created successfully!");
  }
};
```

## 🔗 Related Functions

- [openConfirmModal](./openConfirmModal.md) - Get user confirmation
- [openToast](./openToast.md) - Show notification messages
- [isValidEmail](../helpFunction/isValidEmail.md) - Email validation utility