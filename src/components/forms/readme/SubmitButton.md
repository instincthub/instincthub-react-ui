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

Each status renders a distinct mark in the button's trailing slot. The mark is
drawn in `currentColor`, so it always matches the label and stays visible on
both themes.

| Status | Meaning | What the button shows                          | Clickable |
| ------ | ------- | ---------------------------------------------- | --------- |
| `0`    | Loading | Spinner in the slot, label dimmed, `aria-busy` | No        |
| `1`    | Ready   | Chevron slides in on hover and focus           | Yes       |
| `2`    | Success | Check mark pops in                             | Yes       |
| `3`    | Error   | Error mark pops in, one short shake            | Yes       |

The button does not reset from success or error on its own; set `status`
back to `1` when you are ready. Loading auto-resets after `autoResetTimeout`.

The rendered `<button>` carries `data-status` and `data-variant` attributes,
so tests and page styles can target a state without relying on class names:

```css
.checkout [data-status="3"] {
  outline: 2px solid var(--Danger);
}
```

## Style Variants

| Variant     | Use it for                             | Light theme                | Dark theme                     |
| ----------- | -------------------------------------- | -------------------------- | ------------------------------ |
| `important` | The one main action on a form          | Teal fill, white text      | Brighter teal fill, white text |
| `primary`   | A high-contrast neutral action         | Ink fill, white text       | White fill, ink text           |
| `outlined`  | Secondary actions beside the main one  | Teal border and text       | Light teal border and text     |
| `danger`    | Destructive actions                    | Red fill, white text       | Red fill, white text           |
| `default`   | Quiet actions (cancel, back)           | Light grey fill, ink text  | Translucent fill, light text   |
| `icon`      | A single icon, 44 by 44 px             | Grey square, inherits text | Translucent square, light icon |

Text on a brand colour (teal, red) is always white. Neutral surfaces follow
the theme. Dark theme is keyed on the `DarkMode` class that
`DarkModeProvider` sets on `<html>`, or on an `.ihub-dark-mode` wrapper for a
dark card inside a light page. Wrap a light card inside a dark page in
`.ihub-light-mode` to force the light tokens there.

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

When in loading state (status = 0), the button keeps its variant colour, dims
the label and spins a ring in the trailing slot. The button width does not
change, so nothing around it shifts:

```tsx
<SubmitButton label="Processing..." status={0} />
```

### Hover Animation

On hover and keyboard focus the label nudges left and a chevron slides into
the trailing slot. Hover lifts filled variants by one pixel with a soft
shadow. With `prefers-reduced-motion: reduce` the transitions and the error
shake are removed; only the spinner keeps turning, more slowly.

### Forward Refs

The component supports ref forwarding to the button element:

```tsx
const buttonRef = React.useRef<HTMLButtonElement>(null);
<SubmitButton ref={buttonRef} label="Submit" />;
```

## CSS Customization

Colours and shape are CSS custom properties scoped to `.ihub-submit-btn`, so
one rule on a parent restyles every button inside it:

```css
/* A purple checkout form */
.checkout-form {
  --ihub-sb-brand: #5b3df5;
  --ihub-sb-brand-hover: #4a2fd6;
  --ihub-sb-brand-text: #4a2fd6;
  --ihub-sb-radius: 999px;
}
```

| Token                        | Controls                                           |
| ---------------------------- | -------------------------------------------------- |
| `--ihub-sb-brand`            | `important` fill                                   |
| `--ihub-sb-brand-hover`      | `important` fill on hover                          |
| `--ihub-sb-brand-text`       | `outlined` text and border, `icon` hover colour    |
| `--ihub-sb-brand-tint`       | `outlined` and `icon` hover background             |
| `--ihub-sb-on-brand`         | Text on teal and red fills (white by default)      |
| `--ihub-sb-ink`              | `primary` fill, `default` and `icon` text          |
| `--ihub-sb-surface`          | `primary` text, gap colour of the focus ring       |
| `--ihub-sb-neutral`          | `default` and `icon` fill                          |
| `--ihub-sb-danger`           | `danger` fill                                      |
| `--ihub-sb-ring`             | Focus ring colour                                  |
| `--ihub-sb-height`           | Button height (44px)                               |
| `--ihub-sb-radius`           | Corner radius (6px)                                |

Class names stay available for one-off overrides: `.ihub-submit-btn`,
`.important-btn`, `.outlined-btn`, `.primary-btn`, `.danger-btn`,
`.default-btn`, `.icon-btn`, plus `.ihub-submit-btn__label`,
`.ihub-submit-btn__slot`, `.ihub-submit-btn__spinner`,
`.ihub-submit-btn__check`, `.ihub-submit-btn__error` and
`.ihub-submit-btn__chevron`.

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
