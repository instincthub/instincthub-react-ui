# Radio Button Component

A fully accessible, customizable radio button component system for React applications. Built with TypeScript and designed to match modern UI/UX standards.

## Table of Contents

- [Installation](#installation)
- [Components](#components)
  - [RadioButton](#radiobutton)
  - [RadioGroup](#radiogroup)
- [Usage Examples](#usage-examples)
  - [Basic Usage](#basic-usage)
  - [Form Integration](#form-integration)
  - [Validation](#validation)
- [Accessibility Features](#accessibility-features)
- [Styling](#styling)
- [Best Practices](#best-practices)

## Installation

To install the radio button components in your project:

1. Add the component files to your project:
   - `RadioButton.tsx`
   - `RadioGroup.tsx`

2. Add the CSS file to your styles:
   - `radio-button.css`

3. Ensure the components have access to your design system variables (DarkCyan, Gunmetal, etc.)

## Components

### RadioButton

A single radio button input with label, error handling, and help text support.

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `id` | string | Yes | - | Unique identifier for the radio button |
| `name` | string | Yes | - | Input name (for form grouping) |
| `value` | string | Yes | - | Input value |
| `label` | string | Yes | - | Text label displayed to users |
| `checked` | boolean | No | false | Whether the radio is selected |
| `disabled` | boolean | No | false | Whether the radio is disabled |
| `onChange` | function | No | - | Change handler function |
| `required` | boolean | No | false | Whether the input is required |
| `className` | string | No | '' | Additional CSS classes |
| `error` | string | No | - | Error message to display |
| `helpText` | string | No | - | Help text for additional context |

### RadioGroup

A component for grouping related radio buttons with a shared label.

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | string | Yes | - | Group label text |
| `name` | string | Yes | - | Input name for all radios in the group |
| `options` | RadioOption[] | Yes | - | Array of radio options to display |
| `selectedValue` | string | No | - | Currently selected value |
| `onChange` | function | Yes | - | Change handler function |
| `required` | boolean | No | false | Whether selection is required |
| `error` | string | No | - | Error message for the group |
| `className` | string | No | '' | Additional CSS classes |
| `inline` | boolean | No | false | Whether to display options horizontally |
| `id` | string | No | - | ID for the fieldset element |
| `description` | string | No | - | Additional description text |

#### RadioOption Interface

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `id` | string | Yes | - | Unique identifier for the option |
| `value` | string | Yes | - | Option value |
| `label` | string | Yes | - | Display label |
| `disabled` | boolean | No | false | Whether the option is disabled |
| `helpText` | string | No | - | Help text for this specific option |

## Usage Examples

### Basic Usage

#### Single Radio Button

```tsx
import React, { useState } from 'react';
import { RadioButton } from "@instincthub/react-ui

const ExampleComponent = () => {
  const [selected, setSelected] = useState('');
  
  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  
  return (
    <RadioButton
      id="consent"
      name="consent"
      value="yes"
      label="I agree to the terms and conditions"
      checked={selected === 'yes'}
      onChange={handleChange}
      required
      helpText="You must agree to continue"
    />
  );
};
```

#### Radio Group

```tsx
import React, { useState } from 'react';
import { RadioGroup } from "@instincthub/react-ui

const ExampleComponent = () => {
  const [selected, setSelected] = useState('');
  
  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  
  return (
    <RadioGroup
      label="Subscription Plan"
      name="plan"
      options={[
        { id: 'plan-basic', value: 'basic', label: 'Basic Plan', helpText: '$9.99/month' },
        { id: 'plan-pro', value: 'pro', label: 'Pro Plan', helpText: '$19.99/month' },
        { id: 'plan-enterprise', value: 'enterprise', label: 'Enterprise', disabled: true, helpText: 'Contact sales' }
      ]}
      selectedValue={selected}
      onChange={handleChange}
      required
      description="Choose the plan that works best for you"
    />
  );
};
```

### Form Integration

The radio components work seamlessly with React form handling:

```tsx
import React, { useState } from 'react';
import { RadioGroup, RadioButton } from "@instincthub/react-ui

const FormExample = () => {
  const [formData, setFormData] = useState({
    gender: '',
    notifications: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when field is changed
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!formData.gender) {
      newErrors.gender = 'Please select a gender';
    }
    
    if (!formData.notifications) {
      newErrors.notifications = 'Please select a notification preference';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit form
    console.log('Submitting:', formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <RadioGroup
        label="Gender"
        name="gender"
        options={[
          { id: 'gender-m', value: 'male', label: 'Male' },
          { id: 'gender-f', value: 'female', label: 'Female' },
          { id: 'gender-o', value: 'other', label: 'Other' }
        ]}
        selectedValue={formData.gender}
        onChange={handleChange}
        required
        error={errors.gender}
        inline
      />
      
      <fieldset>
        <legend>Notification Preferences</legend>
        <RadioButton
          id="notif-all"
          name="notifications"
          value="all"
          label="All notifications"
          checked={formData.notifications === 'all'}
          onChange={handleChange}
          error={errors.notifications}
        />
        
        <RadioButton
          id="notif-important"
          name="notifications"
          value="important"
          label="Important only"
          checked={formData.notifications === 'important'}
          onChange={handleChange}
        />
        
        <RadioButton
          id="notif-none"
          name="notifications"
          value="none"
          label="No notifications"
          checked={formData.notifications === 'none'}
          onChange={handleChange}
        />
      </fieldset>
      
      <button type="submit">Submit</button>
    </form>
  );
};
```

## Accessibility Features

The radio button components are built with accessibility in mind:

- **Proper Semantics**: Uses appropriate HTML elements (fieldset, legend) for grouping related inputs
- **ARIA Attributes**: Implements aria-invalid, aria-describedby, and role attributes
- **Keyboard Navigation**: Fully usable with keyboard alone
- **Focus Management**: Clear visual indicators when focused
- **Screen Reader Support**: Properly associated labels and error messages
- **Error Identification**: Error messages are announced to screen readers via role="alert"
- **Required Fields**: Clearly marked both visually and for assistive technology

## Styling

The components use CSS with BEM-like naming conventions and respect the following variables from your design system:

- `--DarkCyan`: Primary color for checked state
- `--Gunmetal`: Text color
- `--ChineseSilver`: Border color
- `--White`: Background color
- `--Gray`: Disabled background
- `--Danger`: Error state color
- `--Nunito`: Font family

### Custom Styling

You can customize the appearance by:

1. Overriding CSS variables in your root styles
2. Adding custom classes via the `className` prop
3. Extending the existing CSS with more specific selectors

Example custom style:

```css
/* Custom radio size */
.custom-large .ihub-radio-custom {
  width: 24px;
  height: 24px;
}

.custom-large .ihub-radio-input:checked + .ihub-radio-label .ihub-radio-custom::after {
  width: 14px;
  height: 14px;
}

/* Custom colors */
.custom-green .ihub-radio-input:checked + .ihub-radio-label .ihub-radio-custom {
  border-color: #00a86b;
}

.custom-green .ihub-radio-input:checked + .ihub-radio-label .ihub-radio-custom::after {
  background-color: #00a86b;
}
```

## Best Practices

### Form Design

- Group related radio options logically
- Use clear, concise labels
- Provide helpful descriptions for complex choices
- For binary choices, consider using a checkbox instead
- Use inline layout only for short option labels

### Validation

- Display errors after form submission, not immediately on selection
- Clear errors once a valid selection is made
- Use specific, actionable error messages
- Set focus to the first field with an error after failed validation

### Accessibility

- Ensure color contrast meets WCAG standards (4.5:1 minimum)
- Never rely on color alone to communicate information
- Test with a screen reader to ensure proper announcements
- Verify keyboard navigation works correctly

### Mobile Considerations

- Ensure touch targets are at least 44×44 pixels
- Test on various screen sizes
- The components automatically adjust to mobile view (vertical layout) at 576px