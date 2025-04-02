# SubmitButton Component Documentation

## Overview

The `SubmitButton` component is a versatile, accessible, and type-safe button component for React applications. It features loading states, various style variants, animation effects, and comprehensive accessibility support.

## Installation

This component requires React and TypeScript. Make sure you have the following dependencies:

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "typescript": "^5.0.0"
  }
}
```

## Usage

```tsx
import React, { useState } from "react";
import SubmitButton from "./components/SubmitButton";

const MyForm: React.FC = () => {
  const [status, setStatus] = useState<number>(1);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(0); // Set loading state

    try {
      // API call or form processing logic
      await submitFormData();
      setStatus(2); // Success state
      setTimeout(() => setStatus(1), 1500); // Reset after showing success
    } catch (error) {
      setStatus(3); // Error state
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {/* Form fields */}
      <SubmitButton label="Submit Form" status={status} variant="important" />
    </form>
  );
};
```

## Props

| Prop               | Type                                                              | Default           | Description                                                   |
| ------------------ | ----------------------------------------------------------------- | ----------------- | ------------------------------------------------------------- |
| `label`            | `string`                                                          | Required          | Button label text                                             |
| `status`           | `number`                                                          | `1`               | Loading state: 0 = loading, 1 = ready, 2 = success, 3 = error |
| `type`             | `"submit" \| "button" \| "reset"`                                 | `"submit"`        | Button type attribute                                         |
| `name`             | `string`                                                          | `undefined`       | Button name attribute                                         |
| `variant`          | `"important" \| "outlined" \| "primary" \| "danger" \| "default"` | `"important"`     | Button style variant                                          |
| `disabled`         | `boolean`                                                         | `false`           | Disable the button                                            |
| `onClick`          | `(event: React.MouseEvent<HTMLButtonElement>) => void`            | `undefined`       | Button onClick handler                                        |
| `autoResetTimeout` | `number`                                                          | `30000`           | Auto-reset timer (in ms) for loading state (0 to disable)     |
| `className`        | `string`                                                          | `""`              | Custom class name to add to the button                        |
| `ariaLabel`        | `string`                                                          | `undefined`       | ARIA label for better accessibility                           |
| `id`               | `string`                                                          | `"submitBtn"`     | ID for the button element                                     |
| `testId`           | `string`                                                          | `"submit-button"` | Data testid for testing                                       |

## Component Interface

```typescript
interface NewSubmitBtnProps {
  /** Button label text */
  label: string;
  /** Loading state: 0 = loading, 1 = ready, 2 = success, 3 = error */
  status?: number;
  /** Button type attribute */
  type?: "submit" | "button" | "reset";
  /** Button name attribute */
  name?: string;
  /** Button style variant */
  variant?: "important" | "outlined" | "primary" | "danger" | "default";
  /** Disable the button */
  disabled?: boolean;
  /** Button onClick handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Auto-reset timer (in ms) for loading state (0 to disable) */
  autoResetTimeout?: number;
  /** Custom class name to add to the button */
  className?: string;
  /** ARIA label for better accessibility */
  ariaLabel?: string;
  /** ID for the button element */
  id?: string;
  /** Data testid for testing */
  testId?: string;
}
```

## Status States

The component supports four different status states:

- `0`: Loading state (shows spinner)
- `1`: Ready state (normal button)
- `2`: Success state (can be used for visual feedback)
- `3`: Error state (can be used for visual feedback)

## Style Variants

The component supports five different style variants:

- `important`: Primary action button (blue background)
- `outlined`: Secondary action button (transparent with border)
- `primary`: Alternative primary button (dark background)
- `danger`: Destructive action button (red background)
- `default`: Default button style (light gray background)

## Features

### Auto-Reset Functionality

The component automatically resets from loading state after a specified timeout to prevent being stuck in loading:

```tsx
<SubmitButton
  label="Submit"
  status={0}
  autoResetTimeout={5000} // Will reset to status 1 after 5 seconds
/>
```

### Keyboard Accessibility

The component is fully accessible via keyboard navigation with enhanced focus styles.

### Loading Animation

When in loading state (status = 0), the button displays a spinner animation:

```tsx
<SubmitButton label="Processing..." status={0} />
```

### Hover Animation

The button features a chevron animation on hover, enhancing user experience.

### Forward Refs

The component supports ref forwarding to the button element:

```tsx
const buttonRef = React.useRef<HTMLButtonElement>(null);
<SubmitButton ref={buttonRef} label="Submit" />;
```

## CSS Customization

The component uses CSS classes for styling. You can override these classes in your own CSS:

```css
/* Example of customizing the important button variant */
.ihub-submit-btn.important-btn {
  background-color: purple;
  color: white;
}
```

## Accessibility

The component includes built-in accessibility features:

- Proper ARIA attributes (`aria-label`, `aria-busy`)
- Focus management
- Screen reader support
- Keyboard navigation support

## Examples

### Basic Form Submit Button

```tsx
<SubmitButton label="Submit" />
```

### Loading State Button

```tsx
<SubmitButton label="Processing..." status={0} />
```

### Custom Variant Button

```tsx
<SubmitButton label="Delete Item" variant="danger" type="button" />
```

### Button with Click Handler

```tsx
<SubmitButton
  label="Save Draft"
  variant="outlined"
  type="button"
  onClick={() => saveDraft()}
/>
```

### Full Example with Status Management

```tsx
const FormWithSubmitButton: React.FC = () => {
  const [formStatus, setFormStatus] = useState<number>(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus(0); // Set loading

    try {
      await submitData();
      setFormStatus(2); // Set success

      // Reset after showing success
      setTimeout(() => setFormStatus(1), 2000);
    } catch (error) {
      setFormStatus(3); // Set error
      console.error(error);

      // Reset after showing error
      setTimeout(() => setFormStatus(1), 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Your name" />
      <SubmitButton
        label={formStatus === 0 ? "Submitting..." : "Submit"}
        status={formStatus}
        autoResetTimeout={10000}
      />
    </form>
  );
};
```

## Best Practices

1. Always provide a meaningful label for the button
2. Use appropriate variants for different actions
3. Handle loading states properly in your form submit handlers
4. Implement proper error handling
5. Use the autoResetTimeout to prevent buttons being stuck in loading state

## Browser Support

The component works in all modern browsers:

- Chrome
- Firefox
- Safari
- Edge

## Contributing

Contributions are welcome. Please ensure all accessibility features are maintained when making changes.

## License

MIT License
