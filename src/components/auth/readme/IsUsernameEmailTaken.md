# IsUsernameEmailTaken Component

A React component that validates usernames and email addresses in real-time, checking both format validity and availability against a backend API.

## Overview

The `IsUsernameEmailTaken` component is designed to enhance user registration forms by providing immediate feedback on username and email input fields. It performs two key validation steps:

1. **Format Validation**: Ensures usernames contain only alphanumeric characters and emails follow a valid email format
2. **Availability Check**: Verifies the username or email is not already taken by querying a backend API

This component is particularly useful in registration flows to prevent users from proceeding with credentials that would ultimately be rejected by the backend.

## Props Interface

```typescript
interface IsUsernameEmailTakenProps {
  names: "username" | "email"; // Field identifier
  types: string; // HTML input type (e.g., "text", "email")
  labels: string; // Display label for the field
  requireds: boolean; // Whether the field is required
  keys: string | number; // React key for the component
}
```

| Prop        | Type                      | Required | Description                              |
| ----------- | ------------------------- | -------- | ---------------------------------------- |
| `names`     | `"username"` or `"email"` | Yes      | Specifies which field type to validate   |
| `types`     | `string`                  | Yes      | HTML input type attribute value          |
| `labels`    | `string`                  | Yes      | Text label displayed for the input field |
| `requireds` | `boolean`                 | Yes      | Whether the field is required            |
| `keys`      | `string` or `number`      | Yes      | React key for component identification   |

## State Interface

```typescript
interface FieldState {
  note: string; // Validation message to display
  valid: boolean; // Whether the field is currently valid
}
```

## Dependencies

- React (with hooks)
- TextField component from your forms directory
- Utility functions: `isValidAlphanumeric`, `isValidEmail`, `reqOptions`, and `API_HOST_URL`

## Usage

### Basic Example

```tsx
import IsUsernameEmailTaken from "@/components/IsUsernameEmailTaken";

const RegistrationForm = () => {
  return (
    <form>
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

      {/* Other form fields */}

      <button id="SubmitBtn" type="submit">
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
```

### Complete Registration Form Example

```tsx
import { useState, FormEvent } from "react";
import IsUsernameEmailTaken from "@/components/IsUsernameEmailTaken";
import PasswordField from "@/components/forms/PasswordField";

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
        labels="Create a Username"
        requireds={true}
        keys="reg-username"
      />

      <IsUsernameEmailTaken
        names="email"
        types="email"
        labels="Email Address"
        requireds={true}
        keys="reg-email"
      />

      <PasswordField name="password" label="Create Password" required={true} />

      <button id="SubmitBtn" type="submit">
        Create Account
      </button>
    </form>
  );
};
```

## Implementation Details

### Validation Process

1. When the user types in the field, the `isUsernameValid` handler is triggered
2. For usernames: Validates that the input only contains letters and numbers
3. For emails: Validates that the input follows email format standards
4. If basic validation passes, makes an API call to check availability
5. Updates the UI with appropriate feedback:
   - Adds/removes an `ihub-is_invalid` class
   - Updates the validation message
   - Adjusts border color for visual feedback

### Submit Button Management

The component automatically manages the disabled state of a submit button with ID `#SubmitBtn` based on validation status:

- Disabled when validation fails or is incomplete
- Enabled when all fields are valid

This behavior is implemented via a `useEffect` hook that monitors the validation state.

## Styling

The component applies these CSS classes:

- `ihub-is_invalid`: Applied to inputs that fail validation
- Border color changes to provide visual feedback

## API Integration

The component makes POST requests to the endpoint specified by `API_HOST_URL + "auth/username_email_available/"` with form data containing:

- `field`: The field type being validated ("username" or "email")
- `field_value`: The value to check

The API is expected to return a JSON response with a `message` property indicating availability.

## Best Practices

- Ensure your TextField component handles the `notes` prop to display validation messages
- Include a submit button with ID `#SubmitBtn` to leverage the automatic submit button management
- Consider adding debounce to the validation function for improved performance during typing
- Implement proper error handling for API calls to handle network failures gracefully

## License

This component is available under the [MIT License](LICENSE).
