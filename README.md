# InstinctHub UI

A comprehensive React component library with built-in assets and utilities for building modern web applications.

[![npm version](https://img.shields.io/npm/v/instincthub-react-ui.svg)](https://www.npmjs.com/package/instincthub-react-ui)
[![license](https://img.shields.io/npm/l/instincthub-react-ui.svg)](https://github.com/yourusername/instincthub-react-ui/blob/main/LICENSE)

## Overview

InstinctHub React UI provides a collection of reusable React components, styling assets, and utility functions that make it easy to build consistent user interfaces. Originally developed for InstinctHub's internal projects, this package is now available for anyone to use in their React and Next.js projects.

## Installation

```bash
npm install @instincthub/react-ui
```

or

```bash
yarn add @instincthub/react-ui
```

## peerDependencies Installation
```bash
npm install @aws-sdk/client-s3 @aws-sdk/lib-storage
```

## Core Features

- **Form Components**: A comprehensive set of form elements including text fields, date pickers, phone inputs, and more
- **UI Components**: Action dropdowns, modals, tooltips, and other interactive UI elements
- **Styling Assets**: Pre-built CSS files for consistent styling including dark mode support
- **Utility Functions**: API helpers, form validation, and other common utilities

## Usage

### Importing Components

```jsx
import { TextField, PasswordField, NewSubmitBtn } from "@instincthub/react-ui";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form>
      <TextField
        label="Email Address"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <PasswordField
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <NewSubmitBtn text="Login" />
    </form>
  );
}
```

### Using Utility Functions

```jsx
import { openToast, fetchAPI } from "@instincthub/react-ui";

// Display a toast notification
openToast("Operation successful!", "success");

// Make an API call
const fetchData = async () => {
  try {
    const response = await fetchAPI("/api/users", "GET");
    return response.data;
  } catch (error) {
    openToast("Failed to fetch data", "error");
  }
};
```

## Component Documentation

### Form Components

#### TextField

Standard text input field with label.

```jsx
<TextField
  label="Username"
  name="username"
  value={username}
  onChange={handleChange}
  required={true}
  placeholder="Enter your username"
  disabled={false}
/>
```

#### PasswordField

Secure password input with optional visibility toggle.

```jsx
<PasswordField
  label="Password"
  name="password"
  value={password}
  onChange={handleChange}
  required={true}
  showToggle={true}
/>
```

#### DateInput

Date picker component.

```jsx
<DateInput
  label="Birth Date"
  name="birthDate"
  value={birthDate}
  onChange={handleChange}
  required={true}
/>
```

#### PhoneNumberInput

International phone number input with country code selection.

```jsx
<PhoneNumberInput
  label="Phone Number"
  name="phone"
  value={phone}
  onChange={handleChange}
  required={true}
/>
```

#### NewSubmitBtn

Form submission button with loading state support.

```jsx
<NewSubmitBtn
  text="Submit"
  loading={isSubmitting}
  disabled={!isValid}
  onClick={handleSubmit}
/>
```

#### FormError

Display form validation errors.

```jsx
<FormError error={errors.username} />
```

#### FilterObjects

Filter and sort collections of objects.

```jsx
<FilterObjects data={users} filterKey="role" onChange={handleFilterChange} />
```

### UI Components

#### ActionDropdown

Dropdown menu for actions.

```jsx
<ActionDropdown
  type="email"
  names="assigned_email"
  labels="School Assigned Email"
  requireds={true}
/>
```

### Utility Functions

#### openToast

Display toast notifications.

```jsx
openToast("Message sent successfully!", "success");
openToast("Operation failed", "error");
openToast("Please wait", "info");
```

#### openConfirmModal

Show a confirmation dialog.

```jsx
openConfirmModal({
  title: "Delete Item",
  message: "Are you sure you want to delete this item?",
  onConfirm: handleDelete,
  onCancel: () => console.log("Cancelled"),
});
```

#### handleFormErrors

Process and display form validation errors.

```jsx
try {
  // Form submission logic
} catch (error) {
  const errors = handleFormErrors(error);
  setFormErrors(errors);
}
```

#### fetchAPI

Make API requests with consistent error handling.

```jsx
const fetchData = async () => {
  const response = await fetchAPI("/api/data", "GET");
  return response.data;
};

const createItem = async (item) => {
  const response = await fetchAPI("/api/items", "POST", item);
  return response.data;
};
```

## Next.js Integration

This package works seamlessly with Next.js applications. For optimal performance, consider these best practices:

```jsx
// In your _app.js or layout.js
import "@instincthub/react-ui/dist/styles.css"; // Import styles once at the application root
```

## TypeScript Support

InstinctHub UI is built with TypeScript and includes full type definitions for all components and utilities.

```tsx
import { TextField, TextFieldProps } from "@instincthub/react-ui";

// Types are available for all props
const CustomTextField: React.FC<TextFieldProps> = (props) => {
  return <TextField {...props} className="custom-field" />;
};
```

## Browser Support

InstinctHub UI is compatible with all modern browsers including:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

Developed and maintained by InstinctHub.
