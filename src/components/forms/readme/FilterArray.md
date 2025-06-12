# FilterArray Component

A customizable dropdown select component for React applications with TypeScript support.

## Table of Contents

- [Installation](#installation)
- [Interfaces](#interfaces)
- [Components](#components)
- [Usage Examples](#usage-examples)
- [Props](#props)
- [CSS Classes](#css-classes)

## Installation

Ensure you have React and TypeScript installed in your project:

```bash
npm install react react-dom typescript @types/react @types/react-dom
```

Include the component and associated CSS in your project.

## Interfaces

### FilterArrayProps

- **Description**: Props for the FilterArray component.
- **Properties**:
  - `options: string[]` - Array of options to display in the dropdown.
  - `defaultValue?: string` - Initial selected value (default: "").
  - `notUpperCases?: boolean` - If true, maintains case of the selected value (default: false).
  - `name: string` - Name attribute for the hidden input.
  - `label?: string` - Label text to display.
  - `setValue?: (value: string) => void` - Callback for when a value is selected.
  - `defaultWidth?: string` - Width of the dropdown (default: "300px").
  - `required?: boolean` - Whether the field is required.
  - `errs?: boolean` - Whether to display error styling.
  - `setArrayProps?: (arrayProps: any[], option: string) => void` - Callback for handling array-based props.
  - `arrayProps?: any[]` - Array of props to pass to the setArrayProps callback.
  - `dataName?: string` - Data attribute name (default: same as name).

## Components

### FilterArray

- **Description**: A customizable dropdown select component.
- **Parameters**: `props: FilterArrayProps` - Component properties.
- **Returns**: `JSX.Element` - A dropdown select component.

## Usage Examples

### Basic Usage

```typescript
import React, { useState } from "react";
import { FilterArray } from "@instincthub/react-ui";

const Example = () => {
  const [selectedSubject, setSelectedSubject] = useState("");

  return (
    <FilterArray
      name="subject"
      label="Subject"
      options={["Math", "Science", "English", "History"]}
      defaultValue={selectedSubject}
      setValue={setSelectedSubject}
      required={true}
    />
  );
};
```

### Using with Array Properties (Form Arrays)

```typescript
import React, { useState } from "react";
import { FilterArray } from "@instincthub/react-ui";

const Example = () => {
  const [objectsList, setObjectsList] = useState([
    {
      id: 1,
      subjects: [
        { subject: "Math", grade: "A" },
        { subject: "Science", grade: "B" },
      ],
    },
  ]);

  const [formError, setFormError] = useState<string[]>([]);

  // Function to handle changes in a specific subject/grade
  const handleSubjectChange = (propsArray: any[], value: string) => {
    const [recordIndex, subIndex, name] = propsArray;

    const updatedSubjects = [...objectsList];
    const subject = updatedSubjects[recordIndex].subjects[subIndex];
    const newSubject = { ...subject, [name]: value };

    updatedSubjects[recordIndex].subjects[subIndex] = newSubject;
    setObjectsList(updatedSubjects);
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      onInvalid={(e) => handleInvalid(e, formError, setFormError)}
    >
      {objectsList[0].subjects.map((sub, subIndex) => (
        <FilterArray
          key={subIndex}
          name={`subject`}
          label={`Subject ${subIndex + 1}`}
          options={["Math", "Science", "English", "History"]}
          defaultValue={sub.subject}
          defaultWidth="220px"
          required={true}
          err={formError.includes("subject")}
          arrayProps={[0, subIndex, "subject"]}
          setArrayProps={handleSubjectChange}
          dataName="subject"
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};
```

## Props

| Prop          | Type                                        | Default   | Description                                          |
| ------------- | ------------------------------------------- | --------- | ---------------------------------------------------- |
| options       | string[]                                    | -         | Array of options to display in the dropdown          |
| defaultValue  | string                                      | ""        | Initial selected value                               |
| notUpperCases | boolean                                     | false     | If true, maintains case of the selected value        |
| name          | string                                      | -         | Name attribute for the hidden input                  |
| label         | string                                      | undefined | Label text to display                                |
| setValue      | (value: string) => void                     | undefined | Callback for when a value is selected                |
| defaultWidth  | string                                      | "300px"   | Width of the dropdown                                |
| required      | boolean                                     | undefined | Whether the field is required                        |
| errs          | boolean                                     | undefined | Whether to display error styling                     |
| setArrayProps | (arrayProps: any[], option: string) => void | undefined | Callback for handling array-based props              |
| arrayProps    | any[]                                       | undefined | Array of props to pass to the setArrayProps callback |
| dataName      | string                                      | name      | Data attribute name                                  |

## CSS Classes

The component uses the following CSS classes:

- `.ihub-select` - Main container
- `.ihub-select__btn` - Dropdown button
- `.ihub-form-err` - Error state
- `.ihub-select__input` - Hidden input
- `.ihub-select__label` - Label
- `.ihub-select__content` - Dropdown content
- `.ihub-select__item` - Dropdown item

## Notes for Implementation

1. **Form Validation**:

   - Use the `required` prop to make the field required
   - Use the `errs` prop to display error styling
   - Add `onInvalid` to your form to handle invalid submissions

2. **Working with Arrays of Objects**:

   - Use the `arrayProps` and `setArrayProps` props to handle changes in arrays of objects
   - The `setArrayProps` callback provides both the array props and the selected value

3. **Customization**:
   - Use the `defaultWidth` prop to set the width of the dropdown
   - Use the `notUpperCases` prop to maintain case of the selected value

## Type Improvement Recommendations

1. The `arrayProps` and the callback for `setArrayProps` would benefit from more specific typing. Currently, they're using `any[]` which isn't type-safe.

2. Consider creating a generic version of the component to handle different types of options beyond just strings.

3. The `handleInvalid` function mentioned in the usage example isn't defined. You'll need to implement this.
