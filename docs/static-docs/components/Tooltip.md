# Tooltip

**Category:** Forms | **Type:** component

A flexible tooltip component that supports both simple text content and complex feedback arrays with timestamps. Perfect for providing contextual information, help text, or displaying user feedback history.

## 🏷️ Tags

`forms`, `tooltip`, `hover`, `feedback`, `UI`

```tsx
"use client";
import React from "react";
import { Tooltip } from "@instincthub/react-ui";

/**
 * Example component demonstrating various ways to use the Tooltip component
 */
const TooltipExamples = () => {
  // Example feedback data with timestamps
  const feedbackHistory = [
    {
      feedback: "Great work! The implementation looks clean and efficient.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      feedback: "Consider adding error handling for edge cases.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      feedback: "The code review is complete. Minor improvements suggested.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
  ];

  return (
    <div className="ihub-container ihub-mt-5">
      <h1 className="ihub-mb-4">Tooltip Examples</h1>

      {/* Basic Text Tooltip */}
      <div className="ihub-mb-5">
        <h2 className="ihub-mb-3">Basic Text Tooltip</h2>
        <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "20px" }}>
          <Tooltip content="This is a simple help text">
            <button className="ihub-primary-btn">Hover for Help</button>
          </Tooltip>

          <Tooltip content="Click to save your changes to the database">
            <button className="ihub-important-btn">
              <span>💾</span> Save
            </button>
          </Tooltip>

          <Tooltip content="Delete this item permanently. This action cannot be undone!">
            <button className="ihub-danger-btn">
              <span>🗑️</span> Delete
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Inline Text with Tooltips */}
      <div className="ihub-mb-5">
        <h2 className="ihub-mb-3">Inline Text Tooltips</h2>
        <p className="ihub-text-lg">
          Our platform uses{" "}
          <Tooltip content="Artificial Intelligence - Computer systems that can perform tasks typically requiring human intelligence">
            <span style={{ textDecoration: "underline dotted", cursor: "help" }}>
              AI
            </span>
          </Tooltip>{" "}
          to enhance your{" "}
          <Tooltip content="User Experience - How a person feels when interfacing with a system">
            <span style={{ textDecoration: "underline dotted", cursor: "help" }}>
              UX
            </span>
          </Tooltip>{" "}
          and provide better{" "}
          <Tooltip content="Return on Investment - A measure of the profitability of an investment">
            <span style={{ textDecoration: "underline dotted", cursor: "help" }}>
              ROI
            </span>
          </Tooltip>
          .
        </p>
      </div>

      {/* Icons with Tooltips */}
      <div className="ihub-mb-5">
        <h2 className="ihub-mb-3">Icons with Tooltips</h2>
        <div className="ihub-d-flex" style={{ gap: "15px" }}>
          <Tooltip content="Settings">
            <div style={{ fontSize: "24px", cursor: "pointer" }}>⚙️</div>
          </Tooltip>

          <Tooltip content="Notifications">
            <div style={{ fontSize: "24px", cursor: "pointer" }}>🔔</div>
          </Tooltip>

          <Tooltip content="User Profile">
            <div style={{ fontSize: "24px", cursor: "pointer" }}>👤</div>
          </Tooltip>

          <Tooltip content="Help & Documentation">
            <div style={{ fontSize: "24px", cursor: "pointer" }}>❓</div>
          </Tooltip>
        </div>
      </div>

      {/* Form Fields with Tooltips */}
      <div className="ihub-mb-5">
        <h2 className="ihub-mb-3">Form Fields with Help Tooltips</h2>
        <div style={{ maxWidth: "400px" }}>
          <div className="ihub-mb-3">
            <label className="ihub-label">
              Username{" "}
              <Tooltip content="Must be 3-20 characters, alphanumeric only">
                <span style={{ color: "#007bff", cursor: "help" }}>ⓘ</span>
              </Tooltip>
            </label>
            <input type="text" className="ihub-input" placeholder="Enter username" />
          </div>

          <div className="ihub-mb-3">
            <label className="ihub-label">
              Password{" "}
              <Tooltip content="Minimum 8 characters, include uppercase, lowercase, number, and special character">
                <span style={{ color: "#007bff", cursor: "help" }}>ⓘ</span>
              </Tooltip>
            </label>
            <input type="password" className="ihub-input" placeholder="Enter password" />
          </div>
        </div>
      </div>

      {/* Status Badges with Tooltips */}
      <div className="ihub-mb-5">
        <h2 className="ihub-mb-3">Status Badges with Tooltips</h2>
        <div className="ihub-d-flex" style={{ gap: "15px", flexWrap: "wrap" }}>
          <Tooltip content="All systems operational">
            <span className="ihub-badge ihub-badge-success">Active</span>
          </Tooltip>

          <Tooltip content="Scheduled maintenance at 2:00 AM UTC">
            <span className="ihub-badge ihub-badge-warning">Maintenance</span>
          </Tooltip>

          <Tooltip content="Service temporarily unavailable">
            <span className="ihub-badge ihub-badge-danger">Offline</span>
          </Tooltip>

          <Tooltip content="Currently processing your request">
            <span className="ihub-badge ihub-badge-info">Processing</span>
          </Tooltip>
        </div>
      </div>

      {/* Feedback History Tooltip */}
      <div className="ihub-mb-5">
        <h2 className="ihub-mb-3">Feedback History with Timestamps</h2>
        <p className="ihub-mb-3">
          Complex tooltips can display arrays of feedback with timestamps:
        </p>
        <Tooltip content={feedbackHistory}>
          <div
            className="ihub-card"
            style={{
              padding: "20px",
              background: "#f8f9fa",
              border: "1px solid #dee2e6",
              borderRadius: "8px",
              cursor: "pointer",
              maxWidth: "300px",
            }}
          >
            <h4 className="ihub-mb-2">Code Review Status</h4>
            <p className="ihub-text-muted ihub-mb-0">
              Hover to see feedback history
            </p>
          </div>
        </Tooltip>
      </div>

      {/* Table with Tooltips */}
      <div className="ihub-mb-5">
        <h2 className="ihub-mb-3">Table Headers with Tooltips</h2>
        <table className="ihub-table">
          <thead>
            <tr>
              <th>
                <Tooltip content="Unique identifier for each user">
                  ID <span style={{ fontSize: "12px" }}>ⓘ</span>
                </Tooltip>
              </th>
              <th>
                <Tooltip content="User's display name">
                  Name <span style={{ fontSize: "12px" }}>ⓘ</span>
                </Tooltip>
              </th>
              <th>
                <Tooltip content="Monthly Recurring Revenue">
                  MRR <span style={{ fontSize: "12px" }}>ⓘ</span>
                </Tooltip>
              </th>
              <th>
                <Tooltip content="Customer Lifetime Value">
                  CLV <span style={{ fontSize: "12px" }}>ⓘ</span>
                </Tooltip>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>001</td>
              <td>John Doe</td>
              <td>$99</td>
              <td>$2,376</td>
            </tr>
            <tr>
              <td>002</td>
              <td>Jane Smith</td>
              <td>$149</td>
              <td>$5,364</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Interactive Elements */}
      <div className="ihub-mb-5">
        <h2 className="ihub-mb-3">Interactive Elements with Tooltips</h2>
        <div className="ihub-d-flex" style={{ gap: "20px", flexWrap: "wrap" }}>
          <Tooltip content="Copy to clipboard">
            <button
              className="ihub-outlined-btn"
              onClick={() => {
                navigator.clipboard.writeText("example@email.com");
                alert("Copied to clipboard!");
              }}
            >
              📋 example@email.com
            </button>
          </Tooltip>

          <Tooltip content="Download PDF report">
            <button className="ihub-outlined-btn">
              📄 Download Report
            </button>
          </Tooltip>

          <Tooltip content="Share via social media">
            <button className="ihub-outlined-btn">
              🔗 Share
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Long Content Tooltip */}
      <div className="ihub-mb-5">
        <h2 className="ihub-mb-3">Long Content Tooltips</h2>
        <Tooltip
          content="This is a longer tooltip that contains more detailed information. It can include multiple sentences and provide comprehensive help text for complex features or concepts that require more explanation."
        >
          <div
            style={{
              padding: "10px 20px",
              background: "#e9ecef",
              borderRadius: "5px",
              display: "inline-block",
              cursor: "help",
            }}
          >
            Hover for detailed explanation
          </div>
        </Tooltip>
      </div>

      {/* Disabled Elements with Tooltips */}
      <div className="ihub-mb-5">
        <h2 className="ihub-mb-3">Disabled Elements</h2>
        <div className="ihub-d-flex" style={{ gap: "20px" }}>
          <Tooltip content="This feature is only available for premium users">
            <span style={{ display: "inline-block" }}>
              <button className="ihub-primary-btn" disabled style={{ opacity: 0.6 }}>
                Premium Feature
              </button>
            </span>
          </Tooltip>

          <Tooltip content="Complete the previous step to enable this action">
            <span style={{ display: "inline-block" }}>
              <button className="ihub-outlined-btn" disabled style={{ opacity: 0.6 }}>
                Next Step
              </button>
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default TooltipExamples;
```

## 📝 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string \| TooltipContent[]` | Required | The content to display in the tooltip. Can be a simple string or an array of feedback objects with timestamps |
| `children` | `React.ReactNode` | Required | The element that triggers the tooltip on hover |

### TooltipContent Interface

```typescript
interface TooltipContent {
  feedback: string;
  timestamp: string | number | Date;
}
```

## 🎨 Styling

The Tooltip component uses the following CSS classes:

- `.ihub-tooltip-container` - Main container for positioning
- `.ihub-tip-wrapper` - Wrapper for the tooltip content
- `.ihub-tooltip` - The tooltip bubble itself
- `.ihub-tip-item` - Individual feedback items (when using array content)
- `.ihub-timestamp` - Timestamp styling within feedback items

## 💡 Usage Tips

1. **Keep it Brief**: Tooltip content should be concise and helpful
2. **Accessibility**: Always provide tooltips for icons or abbreviated text
3. **Form Help**: Use tooltips to explain validation rules or field requirements
4. **Feedback History**: Use the array format to show timestamped feedback or activity logs
5. **Disabled States**: Wrap disabled elements in a span to ensure tooltips work properly

## 🔗 Related Components

- [ActionDropdown](./ActionDropdown.md) - Dropdown component for actions
- [AnimatedBox](./AnimatedBox.md) - Animated container component
- [PasswordField](./PasswordField.md) - Secure password input field
- [DateInput](./DateInput.md) - Date selection input field
- [DateTimeInput](./DateTimeInput.md) - Date and time selection input field

