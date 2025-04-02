# MessageDisplay Component

A simple React component for displaying status messages with customizable styling.

## Table of Contents
- [Installation](#installation)
- [Component](#component)
- [Props](#props)
- [Usage Examples](#usage-examples)
- [CSS Classes](#css-classes)

## Installation

No additional dependencies required beyond React.

## Component

### MessageDisplay
- **Description**: Displays messages with different styling based on the message type
- **Returns**: A styled message box or null if no message is provided

## Props

### MessageDisplayProps
- **Properties**:
  - `messages?: string` - The message text to display
  - `flag?: "success" | "failed" | "note"` - Determines the styling of the message box

## Usage Examples

### Basic Success Message

```tsx
import React from 'react';
import MessageDisplay from './MessageDisplay';

const SuccessExample: React.FC = () => {
  return (
    <div>
      <h2>Form Submitted</h2>
      <MessageDisplay 
        messages="Your information has been successfully saved." 
        flag="success" 
      />
    </div>
  );
};
```

### Error Message

```tsx
import React, { useState } from 'react';
import MessageDisplay from './MessageDisplay';

const FormWithError: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form validation logic
    setError("Please fill in all required fields.");
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Submit</button>
      {error && <MessageDisplay messages={error} flag="failed" />}
    </form>
  );
};
```

### Notification Message

```tsx
import React from 'react';
import MessageDisplay from './MessageDisplay';

const NotificationExample: React.FC = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <MessageDisplay 
        messages="Scheduled maintenance will occur tomorrow at 2:00 PM." 
        flag="note" 
      />
      {/* Dashboard content */}
    </div>
  );
};
```

## CSS Classes

The component uses these CSS classes which should be added to your stylesheet:

- `.ihub-react-message` - Base styling for all message boxes
- `.ihub-success` - Styling for success messages (dark background)
- `.ihub-failed` - Styling for error messages (red background)
- `.ihub-note` - Styling for informational messages (purple background)