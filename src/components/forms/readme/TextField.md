# TextField Component

A versatile text input component with floating label support, validation, and transformation capabilities.

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `types` | string | Yes | Input type (text, email, password, tel, etc.) |
| `names` | string | Yes | Input name attribute and CSS class identifier |
| `labels` | string | Yes | Floating label text |
| `requireds` | boolean | No | Whether the field is required |
| `defaultValues` | string \| number \| boolean | No | Initial value of the field |
| `ids` | string | No | Input element ID |
| `maxLengths` | number | No | Maximum character length |
| `widths` | string | No | Width of the input field |
| `disableds` | boolean | No | Whether the field is read-only |
| `notes` | string | No | Helper text displayed below the input |
| `actives` | boolean | No | Forces the label to be in "active" state |
| `TextTransform` | "lowercase" \| "uppercase" \| "capitalize" \| "none" | No | Text transformation to apply |
| `setValues` | (value: string) => void | No | Simple value change callback |
| `onChange` | (e: ChangeEvent<HTMLInputElement>) => void | No | Raw change event callback |
| `inputTarget` | (target: HTMLInputElement) => void | No | Access to the input DOM element |
| `setNameValue` | (name: string, value: string) => void | No | Name-value pair callback |
| `arrayProps` | [number, string] | No | Array parameters for collection handling |
| `setArrayProps` | (props: [number, string], value: string) => void | No | Callback for array-based state updates |

## Features

- Floating label animation
- Input validation and formatting (e.g., telephone numbers)
- Text transformation options
- Multiple callback methods for different state management approaches
- Support for read-only and required states
- Helper text/notes display

## Examples

### Basic Usage

```tsx
import TextField from "@/components/TextField";

<TextField
  types="text"
  names="username"
  labels="Username"
  requireds={true}
/>
```

### With State Management

```tsx
import { useState } from "react";
import TextField from "@/components/TextField";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  const handleFieldChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form>
      <TextField
        types="text"
        names="name"
        labels="Full Name"
        setNameValue={handleFieldChange}
      />
      
      <TextField
        types="email"
        names="email"
        labels="Email Address"
        setNameValue={handleFieldChange}
        notes="We'll never share your email"
      />
    </form>
  );
};
```

### Telephone Input with Formatting

```tsx
<TextField
  types="tel"
  names="phone"
  labels="Phone Number"
  setValues={(value) => console.log("Formatted phone:", value)}
  notes="Include country code (e.g., +1 for USA)"
/>
```

### Working with Arrays

```tsx
const [contactMethods, setContactMethods] = useState([
  { id: 1, type: "email", value: "" },
  { id: 2, type: "phone", value: "" }
]);

const updateContact = (props: [number, string], value: string) => {
  const [index, field] = props;
  setContactMethods(prev => 
    prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    )
  );
};

return (
  <>
    {contactMethods.map((contact, index) => (
      <TextField
        key={contact.id}
        types="text"
        names={`contact-${index}`}
        labels={`Contact ${index + 1}`}
        arrayProps={[index, "value"]}
        setArrayProps={updateContact}
      />
    ))}
  </>
);
```