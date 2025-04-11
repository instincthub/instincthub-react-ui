# handleFormErrors

A utility function that displays validation errors on form fields.

## Table of Contents
- [Interface](#interface)
- [Function](#function)
- [Usage](#usage)
- [Example](#example)

## Interface

```typescript
interface FormErrors {
  [fieldName: string]: string[];
}
```

## Function

### handleFormErrors
- **Description**: Displays validation errors on form fields by adding error messages and highlighting fields
- **Parameters**:
  - `errors: FormErrors` - Object containing field names as keys and arrays of error messages as values
- **Returns**: `boolean` - true if errors were found and processed, false otherwise
- **Behavior**:
  - Clears any existing error messages and styling
  - Adds red borders to fields with errors
  - Appends error messages below each field
  - Sets focus to the first field with an error

## Usage

```typescript
import handleFormErrors from './handleFormErrors';

// After form submission when server returns validation errors
async function submitForm(formData: FormData) {
  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      // Process validation errors
      handleFormErrors(result.errors);
      return false;
    }
    
    // Handle successful submission
    return true;
  } catch (error) {
    console.error('Form submission error:', error);
    return false;
  }
}
```

## Example

```typescript
// Server returns validation errors
const serverErrors = {
  "email": ["Invalid email format", "Email already exists"],
  "password": ["Password must be at least 8 characters"]
};

handleFormErrors(serverErrors);
// Result: Fields with names "email" and "password" will be highlighted
// and error messages will be displayed below them
```

## CSS Integration

This function assumes your CSS includes a `--Danger` variable for error colors. If not, consider adding this to your CSS:

```css
:root {
  --Danger: #ea5f5e;
}
```