# FormError Component

A React component for displaying form validation errors and HTTP status errors.

## Table of Contents

- [Installation](#installation)
- [Interfaces](#interfaces)
- [Components](#components)
- [Usage Examples](#usage-examples)

## Installation

No additional dependencies required beyond React and TypeScript.

## Interfaces

### FormErrorProps

- **Description**: Props for the FormError component
- **Properties**:
  - `errors?: Record<string, string[]>` - Object containing field names as keys and arrays of error messages
  - `status?: number` - HTTP status code

## Components

### FormError

- **Description**: Displays form validation errors or HTTP status errors
- **Parameters**:
  - `props: FormErrorProps` - Component props containing errors and status
- **Returns**: `JSX.Element | null` - Error message UI or null if no errors
- **Usage**:

  ```typescript
  // For server errors
  <FormError status={500} />

  // For not found errors
  <FormError status={404} />

  // For validation errors
  const validationErrors = {
    email: ["Email is required", "Must be a valid email"],
    password: ["Password is too short"]
  };
  <FormError errors={validationErrors} status={400} />
  ```

## Error Handling

The component handles three main error scenarios:

1. **Server Error** (500): Displays "The server couldn't process your request"
2. **Not Found** (404): Displays "Details not found"
3. **Validation Errors**: Displays all field-specific validation errors

## Usage Examples

```typescript
import React from "react";
import FormError from "./FormError";

const LoginForm: React.FC = () => {
  const [errors, setErrors] = React.useState<
    Record<string, string[]> | undefined
  >();
  const [status, setStatus] = React.useState<number | undefined>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Form submission logic
    } catch (error) {
      if (error.response) {
        setStatus(error.response.status);
        setErrors(error.response.data.errors);
      } else {
        setStatus(500);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <FormError errors={errors} status={status} />
      <button type="submit">Submit</button>
    </form>
  );
};
```
