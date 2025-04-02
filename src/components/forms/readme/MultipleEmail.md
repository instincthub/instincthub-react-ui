# MultipleEmail Component

A TypeScript React component that allows users to input multiple email addresses with validation.

## Table of Contents
- [Installation](#installation)
- [Component](#component)
- [Props](#props)
- [Usage](#usage)
- [Features](#features)

## Installation

No additional dependencies required beyond React.

## Component

### MultipleEmail
- **Description**: A component that lets users add multiple valid email addresses
- **Type**: React Functional Component

## Props

### MultipleEmailProps
- **Properties**:
  - `onEmailsChange?: (emails: string[]) => void` - Optional callback when emails list changes

## Usage

```tsx
import React, { useState } from 'react';
import MultipleEmail from './components/MultipleEmail';

const EmailForm: React.FC = () => {
  const [emails, setEmails] = useState<string[]>([]);
  
  const handleEmailsChange = (newEmails: string[]) => {
    setEmails(newEmails);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process emails
    console.log('Submitted emails:', emails);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2>Invite Team Members</h2>
      
      <MultipleEmail onEmailsChange={handleEmailsChange} />
      
      <button 
        type="submit" 
        disabled={emails.length === 0}
        className="ihub-important-btn"
      >
        Send Invitations
      </button>
    </form>
  );
};
```

## Features

### Email Input
- Users can type email addresses and press Enter, Tab, or comma to add them
- Each email is displayed as a tag with delete functionality
- Input field supports pasting multiple emails at once

### Validation
- Validates email format using regex
- Prevents duplicate emails
- Displays error messages for invalid entries

### Styling
- Uses standardized CSS classes with `ihub-` prefix
- Responsive design for different screen sizes
- Visual feedback for errors

## Email Validation

The component uses a simple regex pattern to validate email addresses:

```typescript
/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/
```

This pattern checks for:
- Username section with letters, numbers, dots, or hyphens
- @ symbol
- Domain with letters, numbers, dots, or hyphens
- TLD with letters, numbers, dots, or hyphens

For production use, consider using a more comprehensive validation method if needed.