# PasswordsMatch Component

A React component that provides a password and confirmation password field pair with built-in validation.

## Overview

The `PasswordsMatch` component is designed to simplify password creation in registration forms by providing two password input fields with real-time validation. It ensures:

1. The primary password meets minimum length requirements
2. The confirmation password matches the primary password

This component handles both the validation logic and visual feedback to users, making it easy to integrate into any form that requires password creation.

## Component Structure

```typescript
import React, { useState } from "react";
import PasswordField from "../forms/PasswordField";

export default function PasswordsMatch(): JSX.Element {
  // Implementation details...
}
```

## State Management

The component manages two state variables:

```typescript
const [password, setPassword] = useState<string>("");
const [password2, setPassword2] = useState<string>("");
```

| State Variable | Type     | Purpose                                                       |
| -------------- | -------- | ------------------------------------------------------------- |
| `password`     | `string` | Stores validation message for the primary password field      |
| `password2`    | `string` | Stores validation message for the confirmation password field |

## Validation Logic

The component uses the `validatePassword` function to handle validation for both password fields:

```typescript
const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
  // Validation implementation...
};
```

### Primary Password Validation

The primary password must be at least 6 characters long. If this requirement is not met:

- The input border turns red (`#EA5F5E`)
- The `ihub-is_invalid` class is added to the input
- An error message is set to display below the field

### Confirmation Password Validation

The confirmation password must match the primary password. If they don't match:

- The input border turns red (`#EA5F5E`)
- The `ihub-is_invalid` class is added to the input
- An error message "Password does not match!" is set to display below the field

## Dependencies

- React (with hooks)
- A custom `PasswordField` component from "../forms/PasswordField"

## Props Interface for PasswordField

The component expects the `PasswordField` component to accept the following props:

```typescript
interface PasswordFieldProps {
  labels: string; // Text label for the input field
  names: string; // HTML name attribute for the input
  requireds: boolean; // Whether the field is required
  inputEvent: (e: React.ChangeEvent<HTMLInputElement>) => void; // Change handler
  notes: string; // Error/help text to display
  ids: string; // HTML id attribute for the input
}
```

## Usage

### Basic Example

```tsx
import PasswordsMatch from "@/components/PasswordsMatch";

const RegistrationForm = () => {
  return (
    <form>
      {/* Other form fields */}

      <PasswordsMatch />

      {/* Submit button */}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
```

### Complete Registration Form Example

```tsx
import { FormEvent } from "react";
import IsUsernameEmailTaken from "@/components/IsUsernameEmailTaken";
import PasswordsMatch from "@/components/PasswordsMatch";

const RegistrationForm = () => {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Form submission logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <IsUsernameEmailTaken
        names="username"
        types="text"
        labels="Username"
        requireds={true}
        keys="username-field"
      />

      <IsUsernameEmailTaken
        names="email"
        types="email"
        labels="Email Address"
        requireds={true}
        keys="email-field"
      />

      <PasswordsMatch />

      <button type="submit">Create Account</button>
    </form>
  );
};
```

## Styling

The component applies these CSS classes for validation state:

- `ihub-is_invalid`: Added to inputs that fail validation

Additionally, it modifies the border color of inputs:

- Invalid inputs: `#EA5F5E` (red)
- Valid inputs: `#69779B` (blue-gray)

## Implementation Notes

1. The component uses standard React event handling for form inputs
2. Type safety is improved with proper TypeScript typing for events and elements
3. The validation function inspects the `name` attribute of the input to determine which validation logic to apply
4. There's a discrepancy between the error message (which mentions 8 characters) and the validation logic (which checks for 6 characters)

## Customization Opportunities

- Modify the minimum password length requirement
- Add additional password strength requirements (uppercase, numbers, special characters)
- Customize error messages
- Add a password strength indicator

## Best Practices

- Consider using a ref instead of `document.querySelector` for accessing the password field
- Add debounce to the validation function to avoid excessive re-renders during typing
- Add proper ARIA attributes for better accessibility
- Include password strength requirements visually to guide users

## License

This component is available under the [MIT License](LICENSE).
