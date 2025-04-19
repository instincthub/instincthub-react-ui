# Installation Guide for @instincthub/react-ui

## Prerequisites

Before installing `@instincthub/react-ui`, ensure you have the following installed on your system:

- **Node.js** (Recommended version: >= 16.x)
- **npm** (Comes with Node.js) or **yarn**

## Installation
To use the `@instincthub/react-ui` package, another project needs to install the packages listed in the `peerDependencies` section of its `package.json`.

### Step 1: Install Peer Dependencies

`@instincthub/react-ui` has several peer dependencies that need to be installed separately:

```sh
npm install @aws-sdk/client-s3@^3.777.0 @aws-sdk/lib-storage@^3.777.0 @emotion/react@^11.14.0 @emotion/styled@^11.14.0 @mui/icons-material@^7.0.0 @mui/material@^7.0.0 @reduxjs/toolkit@^2.6.1 @types/redux-logger@^3.0.13 jspdf@^3.0.1 next@^15.2.1 next-auth@^5.0.0-beta.25 primereact@^10.9.3 react@^19.0.0 react-dom@^19.0.0 react-redux@^9.2.0 redux-logger@^3.0.6
```

Or using yarn:

```sh
yarn add @aws-sdk/client-s3@^3.777.0 @aws-sdk/lib-storage@^3.777.0 @emotion/react@^11.14.0 @emotion/styled@^11.14.0 @mui/icons-material@^7.0.0 @mui/material@^7.0.0 @reduxjs/toolkit@^2.6.1 @types/redux-logger@^3.0.13 jspdf@^3.0.1 next@^15.2.1 next-auth@^5.0.0-beta.25 primereact@^10.9.3 react@^19.0.0 react-dom@^19.0.0 react-redux@^9.2.0 redux-logger@^3.0.6
```

Or using pnmpm:
```sh
pnpm add @aws-sdk/client-s3@^3.777.0 @aws-sdk/lib-storage@^3.777.0 @emotion/react@^11.14.0 @emotion/styled@^11.14.0 @mui/icons-material@^7.0.0 @mui/material@^7.0.0 @reduxjs/toolkit@^2.6.1 @types/redux-logger@^3.0.13 jspdf@^3.0.1 next@^15.2.1 next-auth@^5.0.0-beta.25 primereact@^10.9.3 react@^19.0.0 react-dom@^19.0.0 react-redux@^9.2.0 redux-logger@^3.0.6
```

### Step 2: Install the Package

Now, install `@instincthub/react-ui`:

```sh
npm install @instincthub/react-ui
```

Or using yarn:

```sh
yarn add @instincthub/react-ui
```

## Development Setup

If you are contributing or testing locally, install the required dependencies:

```sh
npm install
```

Then, build the package using:

```sh
npm run rollup
```

## Linking the Package (For Local Development)

To test `@instincthub/react-ui` locally within another project:

```sh
npm link
```

In your consuming project, run:

```sh
npm link @instincthub/react-ui
```

To unlink:

```sh
npm unlink @instincthub/react-ui
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
import "@instincthub/react-ui/asssets/css/styles.css"; // Import styles once at the application root
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
