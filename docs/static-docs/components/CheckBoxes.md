# CheckBoxes

**Category:** Form | **Type:** component

CheckBoxes components are used to allow users to select multiple values from a list of options. Available in two variants: `CheckBoxes` for direct state management and `CheckBoxesField` for form integration with built-in validation.

## 📁 File Locations

- `src/components/forms/CheckBoxes.tsx` - Basic checkbox component
- `src/components/forms/CheckboxesField.tsx` - Form field wrapper with validation

## 🏷️ Tags

`form`, `input`, `selection`, `multiple`, `validation`

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { CheckBoxes, CheckBoxesField } from '@instincthub/react-ui';
```

## 🚀 Basic Usage Examples

```tsx
"use client";

import React, { useState } from "react";
import { CheckBoxes, CheckBoxesField } from "@instincthub/react-ui";

/**
 * Comprehensive examples demonstrating CheckBoxes and CheckBoxesField components
 */
const CheckBoxesExamples = () => {
  // === Basic CheckBoxes Component State ===
  const [selectedOptions, setSelectedOptions] = useState([
    { id: "2", title: "Mobile Development", status: true }
  ]);

  // === CheckBoxesField Component State ===
  const [formData, setFormData] = useState({
    skills: {},
    permissions: {},
    preferences: {},
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // === Sample Data ===
  
  // Array format data
  const skillsArray = [
    { id: "1", title: "JavaScript", status: false },
    { id: "2", title: "React", status: true },
    { id: "3", title: "Node.js", status: false },
    { id: "4", title: "Python", status: false },
    { id: "5", title: "TypeScript", status: true },
  ];

  // Object format data
  const categoriesObject = {
    "web": { id: "web", title: "Web Development", status: false },
    "mobile": { id: "mobile", title: "Mobile Development", status: true },
    "design": { id: "design", title: "UI/UX Design", status: false },
    "data": { id: "data", title: "Data Science", status: false },
    "ml": { id: "ml", title: "Machine Learning", status: false },
    "devops": { id: "devops", title: "DevOps", status: false },
  };

  // Custom key mapping data
  const permissionsData = [
    { id: "read", name: "Read Access", description: "View content", status: true },
    { id: "write", name: "Write Access", description: "Create and edit content", status: false },
    { id: "delete", name: "Delete Access", description: "Remove content", status: false },
    { id: "admin", name: "Admin Access", description: "Full system access", status: false },
  ];

  // Preferences with custom properties
  const preferencesData = {
    "email": { id: "email", label: "Email notifications", enabled: true },
    "sms": { id: "sms", label: "SMS notifications", enabled: false },
    "push": { id: "push", label: "Push notifications", enabled: true },
    "newsletter": { id: "newsletter", label: "Newsletter subscription", enabled: false },
  };

  // === Event Handlers ===

  const handleSkillsChange = (values) => {
    setFormData(prev => ({ ...prev, skills: values }));
    if (errors.skills) {
      setErrors(prev => ({ ...prev, skills: undefined }));
    }
  };

  const handlePermissionsChange = (values) => {
    setFormData(prev => ({ ...prev, permissions: values }));
  };

  const handlePreferencesChange = (values) => {
    setFormData(prev => ({ ...prev, preferences: values }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Validation
    const newErrors = {};
    if (Object.values(formData.skills).every(value => !value)) {
      newErrors.skills = "Please select at least one skill";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      
      // Get selected items for easier processing
      const selectedSkills = Object.entries(formData.skills)
        .filter(([_, selected]) => selected)
        .map(([id]) => id);
      
      console.log("Selected skills:", selectedSkills);
    }
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>CheckBoxes Component Examples</h1>

      {/* === Basic CheckBoxes Component === */}
      <section className="ihub-example-section">
        <h2>1. Basic CheckBoxes Component</h2>
        <p>Direct state management with array format data</p>
        
        <CheckBoxes
          objects={skillsArray}
          label="Programming Skills"
          name="skills"
          selected={selectedOptions}
          setSelected={setSelectedOptions}
        />
        
        <div className="ihub-mt-3">
          <strong>Selected:</strong> {selectedOptions.map(opt => opt.title).join(", ") || "None"}
        </div>
      </section>

      {/* === CheckBoxes with Object Data === */}
      <section className="ihub-example-section">
        <h2>2. CheckBoxes with Object Format Data</h2>
        <p>Using object format instead of array</p>
        
        <CheckBoxes
          objects={categoriesObject}
          label="Development Categories"
          name="categories"
          selected={selectedOptions}
          setSelected={setSelectedOptions}
        />
      </section>

      {/* === CheckBoxes with Custom Key Mapping === */}
      <section className="ihub-example-section">
        <h2>3. Custom Key Mapping</h2>
        <p>Display custom field instead of default 'title'</p>
        
        <CheckBoxes
          objects={permissionsData}
          label="User Permissions"
          name="permissions"
          key_name="name"
          selected={selectedOptions}
          setSelected={setSelectedOptions}
        />
      </section>

      {/* === Form with CheckBoxesField === */}
      <section className="ihub-example-section">
        <h2>4. Form Integration with CheckBoxesField</h2>
        <p>Complete form example with validation and error handling</p>
        
        <form onSubmit={handleFormSubmit} className="ihub-form">
          <CheckBoxesField
            name="skills"
            label="Required Skills"
            options={skillsArray}
            defaultValues={true}
            required={true}
            error={submitted ? errors.skills : undefined}
            onChange={handleSkillsChange}
            fontSize="ihub-fs-md"
          />

          <CheckBoxesField
            name="permissions"
            label="Access Permissions"
            key_name="description"
            options={permissionsData}
            defaultValues={true}
            onChange={handlePermissionsChange}
            maxHeight="200px"
          />

          <CheckBoxesField
            name="preferences"
            label="Notification Preferences"
            key_name="label"
            options={preferencesData}
            defaultValues={false}
            onChange={handlePreferencesChange}
            fontSize="ihub-fs-sm"
          />

          <div className="ihub-form-actions ihub-mt-4">
            <button type="submit" className="ihub-important-btn">
              Save Settings
            </button>
            <button 
              type="button" 
              className="ihub-outlined-btn"
              onClick={() => {
                setFormData({ skills: {}, permissions: {}, preferences: {} });
                setErrors({});
                setSubmitted(false);
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </section>

      {/* === Advanced Example: Dynamic Options === */}
      <section className="ihub-example-section">
        <h2>5. Advanced: Dynamic Options Loading</h2>
        <DynamicCheckBoxesExample />
      </section>

      {/* === Disabled State Example === */}
      <section className="ihub-example-section">
        <h2>6. Disabled State</h2>
        <CheckBoxesField
          name="disabled_example"
          label="Disabled Checkboxes"
          options={skillsArray}
          defaultValues={true}
          disabled={true}
          onChange={() => {}}
        />
      </section>

      {/* === Size and Styling Variants === */}
      <section className="ihub-example-section">
        <h2>7. Size and Styling Variants</h2>
        
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <CheckBoxesField
              name="small_text"
              label="Small Text"
              options={skillsArray.slice(0, 3)}
              defaultValues={false}
              fontSize="ihub-fs-sm"
              onChange={() => {}}
            />
          </div>
          
          <div className="ihub-col-md-4">
            <CheckBoxesField
              name="medium_text"
              label="Medium Text"
              options={skillsArray.slice(0, 3)}
              defaultValues={false}
              fontSize="ihub-fs-md"
              onChange={() => {}}
            />
          </div>
          
          <div className="ihub-col-md-4">
            <CheckBoxesField
              name="large_text"
              label="Large Text"
              options={skillsArray.slice(0, 3)}
              defaultValues={false}
              fontSize="ihub-fs-lg"
              onChange={() => {}}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

/**
 * Dynamic CheckBoxes Example Component
 */
const DynamicCheckBoxesExample = () => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});

  const loadOptions = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const dynamicOptions = [
      { id: "opt1", title: "Dynamically Loaded Option 1", status: false },
      { id: "opt2", title: "Dynamically Loaded Option 2", status: true },
      { id: "opt3", title: "Dynamically Loaded Option 3", status: false },
    ];
    
    setOptions(dynamicOptions);
    setLoading(false);
  };

  const handleSelectionChange = (values) => {
    setSelectedItems(values);
    console.log("Dynamic selection changed:", values);
  };

  return (
    <div>
      <div className="ihub-mb-3">
        <button 
          className="ihub-primary-btn" 
          onClick={loadOptions}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load Dynamic Options"}
        </button>
      </div>

      {options.length > 0 && (
        <CheckBoxesField
          name="dynamic_options"
          label="Dynamically Loaded Options"
          options={options}
          defaultValues={true}
          onChange={handleSelectionChange}
        />
      )}

      {Object.keys(selectedItems).length > 0 && (
        <div className="ihub-mt-3">
          <strong>Current Selection:</strong>
          <pre className="ihub-code-block">
            {JSON.stringify(selectedItems, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default CheckBoxesExamples;
```

## 🔧 Component Props

### CheckBoxes Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `objects` | `Record<string, Option> \| Option[]` | ✅ | - | Array or object of checkbox options |
| `label` | `string` | ✅ | - | Label for the checkbox group |
| `name` | `string` | ✅ | - | Form field name |
| `key_name` | `string` | ❌ | `'title'` | Property to use for display text |
| `selected` | `Option[]` | ✅ | - | Currently selected options |
| `setSelected` | `function` | ✅ | - | Function to update selected options |

### CheckBoxesField Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `name` | `string` | ✅ | - | Form field name |
| `label` | `string` | ✅ | - | Label for the checkbox group |
| `options` | `Record<string, Option> \| Option[]` | ✅ | - | Array or object of checkbox options |
| `key_name` | `string` | ❌ | `'title'` | Property to use for display text |
| `defaultValues` | `boolean` | ❌ | `false` | Use status from options as default |
| `required` | `boolean` | ❌ | `false` | Whether field is required |
| `disabled` | `boolean` | ❌ | `false` | Whether field is disabled |
| `maxHeight` | `string` | ❌ | - | Maximum height for scrollable list |
| `error` | `string` | ❌ | - | Error message to display |
| `onChange` | `function` | ❌ | - | Callback when values change |
| `onBlur` | `function` | ❌ | - | Callback when field loses focus |
| `fontSize` | `string` | ❌ | `'ihub-fs-sm'` | Font size class for text |

## 📋 Option Interface

```typescript
interface Option {
  id: string | number;
  title?: string;
  status?: boolean;
  [key: string]: any; // Additional custom properties
}
```

## 🎨 CSS Classes

| Class | Description |
|-------|-------------|
| `.ihub-checkbox-section` | Main container for CheckBoxes |
| `.ihub-checkbox-label` | Label styling |
| `.ihub-checkbox-wrapper` | Wrapper for checkbox items |
| `.ihub-checkbox-item` | Individual checkbox container |
| `.label-cbx` | Checkbox label styling |
| `.invisible` | Hidden checkbox input |
| `.checkbox` | Custom checkbox styling |
| `.ihub-checkbox-field` | Main container for CheckBoxesField |
| `.ihub-checkbox-header` | Header with label and error |
| `.ihub-error-message` | Error message styling |
| `.ihub-has-error` | Error state modifier |
| `.ihub-required` | Required field indicator |
| `.ihub-disabled` | Disabled state styling |

## 💡 Usage Tips

### Data Format Flexibility
Both components accept data in array or object format:

```tsx
// Array format
const arrayData = [
  { id: "1", title: "Option 1", status: false },
  { id: "2", title: "Option 2", status: true },
];

// Object format
const objectData = {
  "opt1": { id: "opt1", title: "Option 1", status: false },
  "opt2": { id: "opt2", title: "Option 2", status: true },
};
```

### Custom Key Mapping
Use `key_name` to display different properties:

```tsx
const permissions = [
  { id: "read", title: "Read", description: "View content only" },
  { id: "write", title: "Write", description: "Create and edit content" },
];

// Display descriptions instead of titles
<CheckBoxesField
  options={permissions}
  key_name="description"
  // Will show "View content only", "Create and edit content"
/>
```

### Form Integration
For form handling, use `CheckBoxesField` with validation:

```tsx
const [formData, setFormData] = useState({});
const [errors, setErrors] = useState({});

<CheckBoxesField
  name="skills"
  label="Required Skills"
  options={skillsOptions}
  required={true}
  error={errors.skills}
  onChange={(values) => {
    setFormData(prev => ({ ...prev, skills: values }));
    // Clear error on change
    if (errors.skills) {
      setErrors(prev => ({ ...prev, skills: undefined }));
    }
  }}
/>
```

### Performance Optimization
For large datasets, consider:

```tsx
// Use maxHeight for scrollable lists
<CheckBoxesField
  options={largeDataset}
  maxHeight="300px"
  // Prevents UI from becoming too tall
/>

// Use useMemo for expensive data transformations
const processedOptions = useMemo(() => 
  expensiveDataTransformation(rawData), 
  [rawData]
);
```

## 🔗 Related Components

- [InputNumber](./InputNumber.md) - InputNumber component for numerical input
- [InputText](./InputText.md) - InputText component for text input
- [InputTextarea](./InputTextarea.md) - InputTextarea component for text input
- [SearchObjectsFromDB](./SearchObjectsFromDB.md) - SearchObjectsFromDB component for searching objects from database
- [ToggleButton](./ToggleButton.md) - ToggleButton component for changing state.

