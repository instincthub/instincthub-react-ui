# ChipsInput Component

A flexible, accessible React TypeScript component for managing multiple tags/chips input with keyboard navigation, validation, and customization options.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Keyboard Navigation](#keyboard-navigation)
- [Validation](#validation)
- [Styling](#styling)
- [Accessibility](#accessibility)

## Features

- Create chips by typing text and pressing Enter or comma
- Configure custom separators
- Remove chips with backspace, delete keys, or "x" button
- Navigate between chips with arrow keys
- Customizable styling and sizes
- Input validation with error messages
- Prevent duplicate values
- Set maximum number of chips
- Accessibility support with ARIA attributes
- Smooth animations for adding and removing chips

## Installation

```bash
# If using npm
npm install @instincthub/react-ui

# If using yarn
yarn add @instincthub/react-ui
```

## Usage

```tsx
import React, { useState } from "react";
import { ChipsInput } from "@instincthub/react-ui";

const TagSelector: React.FC = () => {
  const [tags, setTags] = useState<string[]>(["React", "TypeScript"]);

  const validateTag = (tag: string): boolean | string => {
    if (tag.length < 2) return "Tag must be at least 2 characters";
    return true;
  };

  return (
    <ChipsInput
      value={tags}
      onChange={setTags}
      placeholder="Add tags..."
      maxChips={10}
      separator=","
      validate={validateTag}
    />
  );
};
```

## Props

| Prop              | Type                                   | Default         | Description                                           |
| ----------------- | -------------------------------------- | --------------- | ----------------------------------------------------- |
| `value`           | `string[]`                             | Required        | Array of current chip values                          |
| `onChange`        | `(values: string[]) => void`           | Required        | Callback when chips change                            |
| `placeholder`     | `string`                               | `'Add tags...'` | Input placeholder text                                |
| `name`            | `string`                               | `false`         | It will create an input field with the name and value |
| `separator`       | `string`                               | `','`           | Character to trigger chip creation                    |
| `maxChips`        | `number`                               | `undefined`     | Maximum number of chips allowed                       |
| `allowDuplicates` | `boolean`                              | `false`         | Whether duplicate values are allowed                  |
| `disabled`        | `boolean`                              | `false`         | Disables the input                                    |
| `validate`        | `(value: string) => boolean \| string` | `undefined`     | Validation function                                   |
| `errorMessage`    | `string`                               | `''`            | Default error message                                 |
| `className`       | `string`                               | `''`            | Additional class for container                        |
| `chipClassName`   | `string`                               | `''`            | Additional class for chips                            |
| `inputClassName`  | `string`                               | `''`            | Additional class for input                            |
| `size`            | `'small' \| 'medium' \| 'large'`       | `'medium'`      | Size variant                                          |
| `ariaLabel`       | `string`                               | `'Chips input'` | Accessibility label                                   |

## Keyboard Navigation

- **Enter** or **comma**: Create a new chip
- **Backspace** (on empty input): Remove the last chip
- **Arrow Left/Right**: Navigate between chips
- **Delete/Backspace** (on focused chip): Remove the chip

## Validation

The component supports validation through the `validate` prop, which accepts a function that returns:

- `true` if the value is valid
- `false` if the value is invalid (uses `errorMessage` prop)
- A string containing a custom error message

Example:

<ChipsInput
  value={emails}
  onChange={setEmails}
  validateEmail={true}
  errorMessage="Invalid email format"
/>

````

## Styling

The component comes with built-in styling that follows the InstinctHub design system. You can customize the appearance using these props:

- `className`: Additional class for the container
- `chipClassName`: Additional class for the chips
- `inputClassName`: Additional class for the input
- `size`: Choose between 'small', 'medium', or 'large'

## Accessibility

The component supports accessibility through:

- Proper keyboard navigation
- ARIA attributes (aria-label, aria-labelledby, aria-describedby)
- Focus management
- Screen reader support for chip removal

When using the component, ensure proper labeling for the best user experience:

```tsx
<label id="skills-label">Skills</label>
<ChipsInput
  value={skills}
  onChange={setSkills}
  ariaLabel="skills-label"
/>
````
