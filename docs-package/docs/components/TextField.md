# TextField

**Category:** Forms | **Type:** component

Text input field component

## 📁 File Location

`src/components/forms/TextField.tsx`

## 🏷️ Tags

`forms`, `input`, `form`

## 📖 Usage Examples

### Example 1

```tsx
// Example usage of the TextField component

import React, { useState } from "react";
import { TextField } from "../../../../index";

const TextFieldExample: React.FC = () => {
  const [objectsList, setObjectsList] = useState([
    { school_name: "Harvard University" },
    { school_name: "Stanford University" },
  ]);

  // Handle change for array props
  const handleChange = (propsArray: [number, string], value: string) => {
    // Updated record object key based on passed index and name.
    const [recordIndex, name] = propsArray;
    const updatedList = objectsList.map((item, i) =>
      i === recordIndex ? { ...item, [name]: value } : item
    );
    setObjectsList(updatedList);
  };

  return (
    <div>
      <h2>Text Fields</h2>

      {objectsList.map((option, index) => (
        <div key={index}>
          <h3>School {index + 1}</h3>
          <TextField
            name={`school_name_${index}`}
            type="text"
            label="High School Name *"
            required={true}
            defaultValue={option.school_name}
            arrayProps={[index, "school_name"]}
            setArrayProps={handleChange}
          />
        </div>
      ))}

      <pre>{JSON.stringify(objectsList, null, 2)}</pre>
    </div>
  );
};

export default TextFieldExample;

```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { TextField } from '@instincthub/react-ui';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { TextField } from '@instincthub/react-ui';

function MyComponent() {
  return (
    <TextField
    />
  );
}
```

## 🔗 Related Components

- [ActionDropdown](./ActionDropdown.md) - Dropdown component for actions
- [AnimatedBox](./AnimatedBox.md) - Animated container component
- [PasswordField](./PasswordField.md) - Secure password input field
- [DateInput](./DateInput.md) - Date selection input field
- [DateTimeInput](./DateTimeInput.md) - Date and time selection input field

