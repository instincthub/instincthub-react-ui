# ReadTermsAndCondition Component

A React component that renders terms and conditions acceptance checkbox with animated styling.

## Props

### ReadTermsAndConditionProps

- `names?: string` - Input field name
- `setTermsStatus: (status: boolean) => void` - Callback when checkbox state changes

## Usage

```tsx
import React, { useState } from "react";
import ReadTermsAndCondition from "./components/ReadTermsAndCondition";

const RegistrationForm: React.FC = () => {
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert("Please accept the terms and conditions");
      return;
    }
    // Process form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}

      <ReadTermsAndCondition
        names="accept_terms"
        setTermsStatus={setTermsAccepted}
      />

      <button type="submit" disabled={!termsAccepted}>
        Submit
      </button>
    </form>
  );
};
```

## Features

- Animated checkbox with smooth transitions
- Link to full terms and conditions
- Parent component can track acceptance status
