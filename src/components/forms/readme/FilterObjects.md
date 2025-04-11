# FilterObjects Component

A customizable dropdown component for selecting object items with TypeScript support. Unlike simple dropdown selectors, this component is designed to work with objects containing both an ID and a title.

## Table of Contents

- [Installation](#installation)
- [Interfaces](#interfaces)
- [Components](#components)
- [Usage Examples](#usage-examples)
- [Props](#props)
- [CSS Classes](#css-classes)
- [Advanced Usage](#advanced-usage)

## Installation

Ensure you have React, TypeScript, and Material-UI icons installed in your project:

```bash
npm install react react-dom typescript @types/react @types/react-dom @mui/icons-material
```

## Interfaces

### FilterObjectsOption

- **Description**: Defines the structure of options in the dropdown.
- **Properties**:
  - `id: string | number` - Unique identifier for the option.
  - `title: string` - Display text for the option.
  - Additional properties can be included (using index signature).

### FilterObjectsProps

- **Description**: Props for the FilterObjects component.
- **Properties**:
  - `options: FilterObjectsOption[]` - Array of objects to display in the dropdown.
  - `defaultValues?: FilterObjectsOption | string | number` - Initial selected value.
  - `names: string` - Name attribute for the hidden input.
  - `labels?: string` - Label text to display.
  - `setSelectedValues?: (name: string, value: FilterObjectsOption) => void` - Callback when an option is selected.
  - `defaultWidth?: string` - Width of the dropdown (default: "300px").
  - `requireds?: boolean` - Whether the field is required.
  - `errs?: boolean` - Whether to display error styling.
  - `setArrayProps?: (arrayProps: any[], option: FilterObjectsOption) => void` - Callback for handling array-based props.
  - `arrayProps?: any[]` - Array of props to pass to the setArrayProps callback.
  - `dataNames?: string` - Data attribute name (default: same as names).
  - `setCookies?: string` - Cookie name to store the selected value.
  - `setObjects?: (option: FilterObjectsOption) => void` - Callback to set the selected object.
  - `status?: number` - Status code (0 indicates loading/disabled state).
  - `upperCases?: boolean` - Whether to display the ID in uppercase.

## Components

### FilterObjects

- **Description**: A dropdown component for selecting from a list of objects.
- **Parameters**: `props: FilterObjectsProps` - Component properties.
- **Returns**: `JSX.Element` - A dropdown select component.

## Usage Examples

### Basic Usage

```typescript
import React, { useState } from "react";
import FilterObjects from "./FilterObjects";

const Example = () => {
  const [selectedCountry, setSelectedCountry] = useState<any>(null);

  const countries = [
    { id: "US", title: "United States" },
    { id: "CA", title: "Canada" },
    { id: "UK", title: "United Kingdom" },
    { id: "AU", title: "Australia" },
  ];

  const handleCountrySelect = (name: string, value: any) => {
    setSelectedCountry(value);
    console.log(`Selected ${name}:`, value);
  };

  return (
    <div>
      <h3>Select Country</h3>
      <FilterObjects
        options={countries}
        names="country"
        labels="Country"
        defaultValues={selectedCountry}
        setSelectedValues={handleCountrySelect}
        requireds={true}
      />

      {selectedCountry && (
        <div>
          <p>
            Selected: {selectedCountry.title} ({selectedCountry.id})
          </p>
        </div>
      )}
    </div>
  );
};
```

### Using with Form Arrays

```typescript
import React, { useState } from "react";
import FilterObjects from "./FilterObjects";

interface Subject {
  subject: { id: string; title: string };
  grade?: string;
}

interface Student {
  id: number;
  name: string;
  subjects: Subject[];
}

const FormArrayExample = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: "John Doe",
      subjects: [
        { subject: { id: "MATH", title: "Mathematics" } },
        { subject: { id: "SCI", title: "Science" } },
      ],
    },
  ]);

  const [formError, setFormError] = useState<string[]>([]);

  const subjects = [
    { id: "MATH", title: "Mathematics" },
    { id: "SCI", title: "Science" },
    { id: "ENG", title: "English" },
    { id: "HIS", title: "History" },
    { id: "GEO", title: "Geography" },
  ];

  // Function to handle changes in a specific subject
  const handleSubjectChange = (propsArray: any[], value: any) => {
    const [studentIndex, subIndex, name] = propsArray;

    const updatedStudents = [...students];
    const studentSubjects = updatedStudents[studentIndex].subjects;
    const newSubject = {
      ...studentSubjects[subIndex],
      [name]: value,
    };

    studentSubjects[subIndex] = newSubject;
    setStudents(updatedStudents);
  };

  // Handle form validation
  const handleInvalid = (
    e: React.FormEvent,
    errors: string[],
    setErrors: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const fieldName = target.getAttribute("data-name") || target.name;

    if (!errors.includes(fieldName)) {
      setErrors([...errors, fieldName]);
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      onInvalid={(e) => handleInvalid(e, formError, setFormError)}
    >
      <h3>Student Subjects</h3>

      {students[0].subjects.map((sub, subIndex) => (
        <FilterObjects
          key={subIndex}
          names={`subject`}
          labels={`Subject ${subIndex + 1}`}
          options={subjects}
          defaultValues={sub.subject}
          defaultWidth="220px"
          requireds={true}
          errs={formError.includes("subject")}
          arrayProps={[0, subIndex, "subject"]}
          setArrayProps={handleSubjectChange}
          dataNames="subject"
        />
      ))}

      <button type="submit">Save Changes</button>
    </form>
  );
};
```

### Using the Status for Loading State

```typescript
import React, { useState, useEffect } from "react";
import FilterObjects from "./FilterObjects";

const LoadingExample = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Simulate API fetch
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Sample data
      const data = [
        { id: "1", title: "Electronics" },
        { id: "2", title: "Books" },
        { id: "3", title: "Clothing" },
        { id: "4", title: "Home & Garden" },
      ];

      setCategories(data);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h3>Product Category</h3>
      <FilterObjects
        options={categories}
        names="category"
        labels="Category"
        defaultValues={selectedCategory}
        setObjects={setSelectedCategory}
        status={loading ? 0 : 1}
        requireds={true}
      />
    </div>
  );
};
```

## Props

| Prop              | Type                                                     | Default   | Description                                          |
| ----------------- | -------------------------------------------------------- | --------- | ---------------------------------------------------- |
| options           | FilterObjectsOption[]                                    | -         | Array of objects to display in the dropdown          |
| defaultValues     | FilterObjectsOption \| string \| number                  | -         | Initial selected value                               |
| names             | string                                                   | -         | Name attribute for the hidden input                  |
| labels            | string                                                   | undefined | Label text to display                                |
| setSelectedValues | (name: string, value: FilterObjectsOption) => void       | undefined | Callback when an option is selected                  |
| defaultWidth      | string                                                   | "300px"   | Width of the dropdown                                |
| requireds         | boolean                                                  | undefined | Whether the field is required                        |
| errs              | boolean                                                  | undefined | Whether to display error styling                     |
| setArrayProps     | (arrayProps: any[], option: FilterObjectsOption) => void | undefined | Callback for handling array-based props              |
| arrayProps        | any[]                                                    | undefined | Array of props to pass to the setArrayProps callback |
| dataNames         | string                                                   | names     | Data attribute name                                  |
| setCookies        | string                                                   | undefined | Cookie name to store the selected value              |
| setObjects        | (option: FilterObjectsOption) => void                    | undefined | Callback to set the selected object                  |
| status            | number                                                   | undefined | Status code (0 indicates loading/disabled state)     |
| upperCases        | boolean                                                  | undefined | Whether to display the ID in uppercase               |

## CSS Classes

The component uses the following CSS classes:

- `.ihub-select` - Main container
- `.ihub-select__btn` - Dropdown button
- `.ihub-form-err` - Error state
- `.ihub-select__input` - Hidden input
- `.ihub-select__label` - Label
- `.ihub-select__content` - Dropdown content
- `.ihub-select__item` - Dropdown item
- `.disabled` - Disabled state
- `.ihub-select__loader` - Loading spinner

## Advanced Usage

### Using with Cookies for Persistence

```typescript
import React, { useState, useEffect } from "react";
import FilterObjects from "./FilterObjects";
import { getCookie } from "../lib/helpFunction";

const PersistentExample = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);

  const themes = [
    { id: "light", title: "Light Theme" },
    { id: "dark", title: "Dark Theme" },
    { id: "system", title: "System Default" },
    { id: "custom", title: "Custom Theme" },
  ];

  // Load the saved theme from cookies on component mount
  useEffect(() => {
    const savedTheme = getCookie("user_theme");
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        setSelectedTheme(parsedTheme);
      } catch (e) {
        console.error("Error parsing saved theme", e);
      }
    }
  }, []);

  const handleThemeChange = (name, value) => {
    setSelectedTheme(value);
    // Apply theme change to the application
    document.body.dataset.theme = value.id;
  };

  return (
    <div>
      <h3>Application Theme</h3>
      <FilterObjects
        options={themes}
        names="theme"
        labels="Theme"
        defaultValues={selectedTheme}
        setSelectedValues={handleThemeChange}
        setCookies="user_theme"
      />
    </div>
  );
};
```

### Form Validation and Error Handling

To work with form validation:

1. **Set up Form Error Handling**:

   ```typescript
   const handleInvalid = (
     e: React.FormEvent,
     errors: string[],
     setErrors: React.Dispatch<React.SetStateAction<string[]>>
   ) => {
     e.preventDefault();
     const target = e.target as HTMLInputElement;
     const fieldName = target.getAttribute("data-name") || target.name;

     if (!errors.includes(fieldName)) {
       setErrors([...errors, fieldName]);
     }
   };
   ```

2. **Clear Errors on Valid Input**:

   ```typescript
   const clearError = (fieldName: string) => {
     setFormError((prev) => prev.filter((item) => item !== fieldName));
   };

   const handleValidInput = (name: string, value: any) => {
     setSelectedValue(value);
     clearError(name);
   };
   ```

3. **Attach to Form**:
   ```typescript
   <form
     onSubmit={handleSubmit}
     onInvalid={(e) => handleInvalid(e, formError, setFormError)}
   >
     {/* Form fields */}
   </form>
   ```
