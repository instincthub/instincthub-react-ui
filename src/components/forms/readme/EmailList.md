# EmailList Component

A React component for collecting and managing multiple email addresses. This component allows users to input email addresses, validates them, and displays them as a list of tags that can be individually removed.

## Table of Contents

- [Installation](#installation)
- [Interfaces](#interfaces)
- [Component](#component)
- [CSS Classes](#css-classes)
- [Usage Examples](#usage-examples)
- [Contributing](#contributing)

## Installation

Ensure you have React installed:

```bash
npm install react
npm install @types/react --save-dev
```

Make sure to include the `input-fields.css` file in your project and import it in the component.

## Interfaces

### EmailListProps

- **Description**: Props for the EmailList component.
- **Properties**:
  - `setEmailListValue?: (value: (prevEmails: string[]) => string[]) => void` - Optional callback function to update parent component with email list values.
  - `names?: string` - Optional name attribute for the hidden input and additional class for the component container.

## Component

### EmailList

- **Description**: A component for collecting and managing multiple email addresses as tags.
- **Parameters**:
  - `props: EmailListProps` - Props object containing component configuration.
- **Returns**: `JSX.Element` - The rendered component.
- **Key Features**:
  - Email validation using regex
  - Multiple email input (comma-separated)
  - Add emails on Enter, Tab, comma, or blur
  - Display emails as removable tags
  - Prevent duplicate emails
  - Error message for duplicate emails
  - Hidden input with comma-separated list of emails for form submission

## CSS Classes

The component uses the following CSS classes that should be included in your `input-fields.css` file:

### Core Classes

- `.ihub-email-list` - Main container for the email list component
- `.ihub-email-item` - Styling for individual email tag items
- `.ihub-email-text` - Text content of the email tag
- `.ihub-email-icon` - Delete icon for email tags
- `.ihub-input` - Input field styling (from existing CSS)
- `.ihub-notes` - Notes styling (from existing CSS)
- `.ihub-is_invalid` - Error message styling (from existing CSS)

### Styling Details

- Email tags displayed with pill-style design
- Hover effects for delete icons
- Scrollable list for many emails
- Responsive width for the input field
- Error message styling consistent with other form elements

## Usage Examples

### Basic Usage

```tsx
import React from "react";
import EmailList from "./EmailList";

const ContactForm = () => {
  return (
    <form>
      <label>Recipient Emails:</label>
      <EmailList names="recipient_emails" />
      <button type="submit">Send</button>
    </form>
  );
};
```

### With State Update Callback

```tsx
import React, { useState } from "react";
import EmailList from "./EmailList";

const MessageComposer = () => {
  const [recipients, setRecipients] = useState<string[]>([]);

  const handleEmailListChange = (
    updater: (prevEmails: string[]) => string[]
  ) => {
    setRecipients(updater(recipients));
  };

  const handleSend = () => {
    console.log("Sending message to:", recipients);
    // Send message logic
  };

  return (
    <div className="composer">
      <h3>New Message</h3>
      <EmailList setEmailListValue={handleEmailListChange} names="recipients" />
      <textarea placeholder="Message content"></textarea>
      <button onClick={handleSend}>Send</button>

      {recipients.length > 0 && (
        <div className="recipient-count">
          Message will be sent to {recipients.length} recipient(s)
        </div>
      )}
    </div>
  );
};
```

### In a Multi-Step Form

```tsx
import React, { useState } from "react";
import EmailList from "./EmailList";

const InvitationForm = () => {
  const [step, setStep] = useState<number>(1);
  const [emailListValue, setEmailListValue] = useState<string[]>([]);

  const updateEmailList = (updater: (prevEmails: string[]) => string[]) => {
    setEmailListValue(updater(emailListValue));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process form submission
    console.log("Inviting:", emailListValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      {step === 1 && (
        <div className="step">
          <h2>Step 1: Add Recipients</h2>
          <EmailList
            setEmailListValue={updateEmailList}
            names="invitation_emails"
          />
          <button
            type="button"
            onClick={() => setStep(2)}
            disabled={emailListValue.length === 0}
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="step">
          <h2>Step 2: Configure Invitation</h2>
          <p>You're inviting {emailListValue.length} people</p>
          {/* Additional form fields */}
          <div className="actions">
            <button type="button" onClick={() => setStep(1)}>
              Back
            </button>
            <button type="submit">Send Invitations</button>
          </div>
        </div>
      )}
    </form>
  );
};
```

## Contributing

Feel free to submit issues or pull requests to improve this component.

## License

[Add your license information here]
