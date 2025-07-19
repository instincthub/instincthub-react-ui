# Dropdown

**Category:** UI | **Type:** component

A versatile dropdown component that supports single/multi-select, search functionality, custom rendering, and form integration.

## 📁 File Location

`src/components/ui/Dropdown.tsx`

## 🏷️ Tags

`ui`, `dropdown`, `select`, `multi-select`, `form`

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { Dropdown } from '@instincthub/react-ui';
```

## 🚀 Comprehensive Examples

```tsx
"use client";
import React, { useState } from "react";
import {
  Dropdown,
  DropdownOptionType,
  InputText,
  SubmitButton,
} from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";

/**
 * Example component demonstrating various ways to use the Dropdown component
 */
const DropdownExamples = () => {
  // State for basic dropdown
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  // State for multi-select dropdown
  const [selectedSkills, setSelectedSkills] = useState<(string | number)[]>([]);

  // State for searchable dropdown
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  // State for custom rendered dropdown
  const [selectedUser, setSelectedUser] = useState<string>("");

  // State for form integration
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
  });

  // Basic options for programming languages
  const languageOptions: DropdownOptionType[] = [
    { value: "js", label: "JavaScript" },
    { value: "py", label: "Python" },
    { value: "java", label: "Java" },
    { value: "ts", label: "TypeScript" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
  ];

  // Options with icons and descriptions for skills
  const skillOptions: DropdownOptionType[] = [
    {
      value: "frontend",
      label: "Frontend Development",
      icon: <CodeOutlinedIcon />,
      description: "HTML, CSS, JavaScript",
    },
    {
      value: "backend",
      label: "Backend Development",
      icon: <CodeOutlinedIcon />,
      description: "Node.js, Python, Java",
    },
    {
      value: "mobile",
      label: "Mobile Development",
      icon: <CodeOutlinedIcon />,
      description: "React Native, Flutter",
    },
    {
      value: "devops",
      label: "DevOps",
      icon: <CodeOutlinedIcon />,
      description: "Docker, Kubernetes, CI/CD",
    },
    {
      value: "testing",
      label: "Testing",
      icon: <CodeOutlinedIcon />,
      description: "Unit, Integration, E2E",
    },
    {
      value: "ui",
      label: "UI/UX Design",
      icon: <CodeOutlinedIcon />,
      description: "Figma, Adobe XD",
      disabled: true,
    },
  ];

  // Large dataset for searchable dropdown (countries)
  const countryOptions: DropdownOptionType[] = [
    { value: "us", label: "United States", code: "US", flag: "🇺🇸" },
    { value: "uk", label: "United Kingdom", code: "UK", flag: "🇬🇧" },
    { value: "ca", label: "Canada", code: "CA", flag: "🇨🇦" },
    { value: "au", label: "Australia", code: "AU", flag: "🇦🇺" },
    { value: "de", label: "Germany", code: "DE", flag: "🇩🇪" },
    { value: "fr", label: "France", code: "FR", flag: "🇫🇷" },
    { value: "jp", label: "Japan", code: "JP", flag: "🇯🇵" },
    { value: "cn", label: "China", code: "CN", flag: "🇨🇳" },
    { value: "in", label: "India", code: "IN", flag: "🇮🇳" },
    { value: "br", label: "Brazil", code: "BR", flag: "🇧🇷" },
    { value: "mx", label: "Mexico", code: "MX", flag: "🇲🇽" },
    { value: "ng", label: "Nigeria", code: "NG", flag: "🇳🇬" },
  ];

  // User options with custom data
  const userOptions: DropdownOptionType[] = [
    {
      value: "john123",
      label: "John Doe",
      email: "john@example.com",
      role: "Admin",
      avatar: "JD",
      status: "active",
    },
    {
      value: "jane456",
      label: "Jane Smith",
      email: "jane@example.com",
      role: "Editor",
      avatar: "JS",
      status: "active",
    },
    {
      value: "bob789",
      label: "Bob Johnson",
      email: "bob@example.com",
      role: "Viewer",
      avatar: "BJ",
      status: "inactive",
    },
    {
      value: "alice321",
      label: "Alice Brown",
      email: "alice@example.com",
      role: "Editor",
      avatar: "AB",
      status: "active",
    },
  ];

  // Role options for form
  const roleOptions: DropdownOptionType[] = [
    { value: "admin", label: "Administrator", description: "Full access" },
    { value: "manager", label: "Manager", description: "Department access" },
    { value: "employee", label: "Employee", description: "Limited access" },
    { value: "intern", label: "Intern", description: "Basic access" },
  ];

  // Department options
  const departmentOptions: DropdownOptionType[] = [
    { value: "eng", label: "Engineering", name: "Engineering" },
    { value: "sales", label: "Sales", name: "Sales" },
    { value: "marketing", label: "Marketing", name: "Marketing" },
    { value: "hr", label: "Human Resources", name: "Human Resources" },
    { value: "finance", label: "Finance", name: "Finance" },
  ];

  // Custom render function for user dropdown
  const renderUserOption = (option: DropdownOptionType) => (
    <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "12px" }}>
      <div
        className="ihub-avatar"
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: option.status === "active" ? "#4CAF50" : "#9E9E9E",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        {option.avatar}
      </div>
      <div className="ihub-flex-grow-1">
        <div className="ihub-font-weight-600">{option.label}</div>
        <div className="ihub-text-muted ihub-fs-12">
          {option.email} • {option.role}
        </div>
      </div>
      {option.status === "active" && (
        <span
          className="ihub-badge"
          style={{
            background: "#E8F5E9",
            color: "#4CAF50",
            padding: "2px 8px",
            borderRadius: "12px",
            fontSize: "11px",
          }}
        >
          Active
        </span>
      )}
    </div>
  );

  // Custom render function for country dropdown
  const renderCountryOption = (option: DropdownOptionType) => (
    <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "8px" }}>
      <span style={{ fontSize: "20px" }}>{option.flag}</span>
      <span>{option.label}</span>
      <span className="ihub-text-muted">({option.code})</span>
    </div>
  );

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    openToast("Form submitted successfully! Check console for data.", "success");
  };

  // Handle input change for form
  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>Dropdown Component Examples</h1>

      {/* Basic Single Select Dropdown */}
      <div className="ihub-card ihub-mt-4">
        <h3>Basic Single Select</h3>
        <p className="ihub-text-muted ihub-mb-3">
          Simple dropdown for selecting a single programming language
        </p>
        <Dropdown
          label="Favorite Programming Language"
          name="language"
          options={languageOptions}
          selectedValue={selectedLanguage}
          onChange={(value) => {
            setSelectedLanguage(value as string);
            openToast(`Selected: ${value}`, "info");
          }}
          placeholder="Select a language"
          className="ihub-mb-2"
        />
        {selectedLanguage && (
          <p className="ihub-mt-2">
            <strong>Selected:</strong> {selectedLanguage}
          </p>
        )}
      </div>

      {/* Multi-Select Dropdown */}
      <div className="ihub-card ihub-mt-4">
        <h3>Multi-Select with Icons & Descriptions</h3>
        <p className="ihub-text-muted ihub-mb-3">
          Select multiple skills with rich option display
        </p>
        <Dropdown
          label="Your Skills"
          name="skills"
          options={skillOptions}
          selectedValue={selectedSkills}
          onChange={(values) => {
            setSelectedSkills(values as (string | number)[]);
            openToast(`Selected ${(values as any[]).length} skills`, "info");
          }}
          placeholder="Select your skills"
          isMulti={true}
          className="ihub-mb-2"
          required
        />
        {selectedSkills.length > 0 && (
          <p className="ihub-mt-2">
            <strong>Selected Skills:</strong> {selectedSkills.join(", ")}
          </p>
        )}
      </div>

      {/* Searchable Dropdown with Custom Rendering */}
      <div className="ihub-card ihub-mt-4">
        <h3>Searchable Dropdown with Countries</h3>
        <p className="ihub-text-muted ihub-mb-3">
          Search through a large list of countries with custom rendering
        </p>
        <Dropdown
          label="Select Country"
          name="country"
          options={countryOptions}
          selectedValue={selectedCountry}
          onChange={(value) => {
            setSelectedCountry(value as string);
            const country = countryOptions.find((opt) => opt.value === value);
            openToast(`Selected: ${country?.label}`, "info");
          }}
          placeholder="Search and select a country"
          isSearchable={true}
          renderOption={renderCountryOption}
          className="ihub-mb-2"
          maxHeight={300}
        />
      </div>

      {/* Custom Rendered User Selection */}
      <div className="ihub-card ihub-mt-4">
        <h3>User Selection with Custom Display</h3>
        <p className="ihub-text-muted ihub-mb-3">
          Select users with avatars and status badges
        </p>
        <Dropdown
          label="Assign to User"
          name="user"
          options={userOptions}
          selectedValue={selectedUser}
          onChange={(value) => {
            setSelectedUser(value as string);
            const user = userOptions.find((opt) => opt.value === value);
            openToast(`Assigned to: ${user?.label}`, "success");
          }}
          placeholder="Select a user"
          isSearchable={true}
          renderOption={renderUserOption}
          className="ihub-mb-2"
          noOptionsMessage="No users found"
        />
      </div>

      {/* Form Integration Example */}
      <div className="ihub-card ihub-mt-4">
        <h3>Form Integration</h3>
        <p className="ihub-text-muted ihub-mb-3">
          Complete form with dropdown integration
        </p>
        <form onSubmit={handleFormSubmit}>
          <InputText
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
            className="ihub-mb-3"
          />

          <Dropdown
            label="Role"
            name="role"
            options={roleOptions}
            selectedValue={formData.role}
            onChange={(value) => handleInputChange("role", value)}
            placeholder="Select a role"
            required
            className="ihub-mb-3"
          />

          <Dropdown
            label="Department"
            name="department"
            key_name="name"
            options={departmentOptions}
            selectedValue={formData.department}
            onChange={(value) => handleInputChange("department", value)}
            placeholder="Select department"
            required
            className="ihub-mb-3"
          />

          <SubmitButton
            label="Submit Form"
            type="submit"
            status={1}
            disabled={!formData.name || !formData.role || !formData.department}
          />
        </form>
      </div>

      {/* Disabled State Example */}
      <div className="ihub-card ihub-mt-4">
        <h3>Disabled State</h3>
        <p className="ihub-text-muted ihub-mb-3">
          Dropdown in disabled state
        </p>
        <Dropdown
          label="Disabled Dropdown"
          options={languageOptions}
          selectedValue="js"
          placeholder="This dropdown is disabled"
          isDisabled={true}
          className="ihub-mb-2"
        />
      </div>

      {/* Using key_name for Custom Display */}
      <div className="ihub-card ihub-mt-4">
        <h3>Custom Display Field (key_name)</h3>
        <p className="ihub-text-muted ihub-mb-3">
          Using a custom field for display instead of label
        </p>
        <Dropdown
          label="Select Country by Code"
          key_name="code"
          options={countryOptions}
          selectedValue={selectedCountry}
          onChange={(value) => setSelectedCountry(value as string)}
          placeholder="Select by country code"
          isSearchable={true}
          className="ihub-mb-2"
        />
      </div>
    </div>
  );
};

export default DropdownExamples;
```

## 📋 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text for the dropdown |
| `name` | `string` | - | Name attribute for form submission |
| `key_name` | `string` | - | Custom field to use for display instead of label |
| `required` | `boolean` | `false` | Whether the dropdown is required |
| `options` | `DropdownOptionType[]` | - | Array of options to display |
| `selectedValue` | `string \| number \| (string \| number)[]` | - | Currently selected value(s) |
| `onChange` | `(value: string \| number \| (string \| number)[]) => void` | - | Callback when selection changes |
| `placeholder` | `string` | `"Select..."` | Placeholder text when no selection |
| `className` | `string` | `""` | Additional CSS classes |
| `isMulti` | `boolean` | `false` | Enable multi-selection |
| `isSearchable` | `boolean` | `false` | Enable search functionality |
| `noOptionsMessage` | `string` | `"No options available"` | Message when no options match search |
| `isDisabled` | `boolean` | `false` | Disable the dropdown |
| `maxHeight` | `number` | `250` | Maximum height of dropdown menu in pixels |
| `renderOption` | `(option: DropdownOptionType) => React.ReactNode` | - | Custom render function for options |

## 🎯 Common Use Cases

### 1. Category Selection
```tsx
const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "books", label: "Books" },
];

<Dropdown
  label="Product Category"
  options={categories}
  selectedValue={selectedCategory}
  onChange={setSelectedCategory}
/>
```

### 2. User Role Assignment
```tsx
const roles = [
  { value: "admin", label: "Administrator", description: "Full system access" },
  { value: "user", label: "User", description: "Limited access" },
];

<Dropdown
  label="User Role"
  options={roles}
  selectedValue={userRole}
  onChange={setUserRole}
  required
/>
```

### 3. Multi-Select Tags
```tsx
<Dropdown
  label="Tags"
  options={tagOptions}
  selectedValue={selectedTags}
  onChange={setSelectedTags}
  isMulti={true}
  isSearchable={true}
  placeholder="Add tags..."
/>
```

### 4. Country Selection with Search
```tsx
<Dropdown
  label="Country"
  options={countries}
  selectedValue={country}
  onChange={setCountry}
  isSearchable={true}
  renderOption={(option) => (
    <div>
      {option.flag} {option.label}
    </div>
  )}
/>
```

## 🎨 Styling

The dropdown component uses CSS classes prefixed with `ihub-dropdown-` for styling:

- `.ihub-dropdown-field` - Main container
- `.ihub-dropdown-trigger` - Clickable area
- `.ihub-dropdown-menu` - Options container
- `.ihub-dropdown-option` - Individual option
- `.ihub-dropdown-selected` - Selected option state
- `.ihub-dropdown-disabled` - Disabled state
- `.ihub-dropdown-tag` - Multi-select tag
- `.ihub-dropdown-search` - Search input container

## ⚡ Features

- **Single & Multi-Select**: Support for both single and multiple selections
- **Search Functionality**: Built-in search to filter through options
- **Custom Rendering**: Render options with custom components
- **Keyboard Navigation**: Full keyboard support (Arrow keys, Enter, Escape)
- **Form Integration**: Works seamlessly with forms
- **Accessibility**: ARIA labels and roles for screen readers
- **Custom Display Field**: Use any field from options for display
- **Disabled Options**: Support for disabled individual options

## 🔗 Related Components

- [InputText](./InputText.md) - Text input component
- [CheckBoxes](./CheckBoxes.md) - Checkbox component
- [RadioButton](./RadioButton.md) - Radio button component
- [ToggleButton](./ToggleButton.md) - Toggle switch component
- [MultiPurposeModal](./MultiPurposeModal.md) - Modal component

