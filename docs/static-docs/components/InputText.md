# InputText

**Category:** Form | **Type:** component

A modern input text component with floating label and comprehensive validation support

## 🏷️ Tags

`form`, `input`, `floating-label`, `validation`

```tsx
"use client";
import React, { useState } from "react";
import { InputText } from "@instincthub/react-ui";

/**
 * Example component demonstrating various ways to use the InputText component
 */
const InputTextExamples = () => {
  // Controlled input state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    website: "",
    bio: "",
    username: "",
    searchTerm: "",
  });

  // Validation errors state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle blur validation
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Email validation
    if (name === "email" && value && !validateEmail(value)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
    }

    // Password validation
    if (name === "password" && value && value.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters long",
      }));
    }

    // Required field validation
    if ((name === "firstName" || name === "lastName") && !value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [name]: `${name === "firstName" ? "First" : "Last"} name is required`,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>InputText Component Examples</h1>

      {/* Basic Examples Section */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Basic Input Types</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            {/* Basic Text Input */}
            <InputText
              label="First Name"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={errors.firstName}
              required
              helperText="Enter your first name"
            />

            {/* Email Input */}
            <InputText
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={errors.email}
              required
              helperText="We'll never share your email"
            />

            {/* Password Input */}
            <InputText
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={errors.password}
              required
              helperText="Must be at least 8 characters"
            />
          </div>

          <div className="ihub-col-md-6">
            {/* Phone Number */}
            <InputText
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+1 (555) 123-4567"
              helperText="Include country code"
            />

            {/* URL Input */}
            <InputText
              label="Website URL"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="https://example.com"
              helperText="Your personal or business website"
            />

            {/* Search Input */}
            <InputText
              label="Search"
              name="searchTerm"
              type="search"
              value={formData.searchTerm}
              onChange={handleInputChange}
              placeholder="Search products..."
            />
          </div>
        </div>
      </section>

      {/* Text Transformation Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Text Transformation</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <InputText
              label="Uppercase Text"
              name="uppercaseText"
              type="text"
              textTransform="uppercase"
              placeholder="will be uppercase"
              helperText="Text automatically converted to uppercase"
            />
          </div>
          <div className="ihub-col-md-4">
            <InputText
              label="Lowercase Text"
              name="lowercaseText"
              type="text"
              textTransform="lowercase"
              placeholder="will be lowercase"
              helperText="Text automatically converted to lowercase"
            />
          </div>
          <div className="ihub-col-md-4">
            <InputText
              label="Capitalized Text"
              name="capitalizedText"
              type="text"
              textTransform="capitalize"
              placeholder="will be capitalized"
              helperText="First letter of each word capitalized"
            />
          </div>
        </div>
      </section>

      {/* State Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Input States</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <InputText
              label="Disabled Input"
              name="disabledInput"
              type="text"
              value="This input is disabled"
              disabled
              helperText="User cannot interact with this field"
            />
          </div>
          <div className="ihub-col-md-4">
            <InputText
              label="Read-only Input"
              name="readOnlyInput"
              type="text"
              value="This input is read-only"
              readOnly
              helperText="User can see but not edit this field"
            />
          </div>
          <div className="ihub-col-md-4">
            <InputText
              label="Error State"
              name="errorInput"
              type="text"
              value="Invalid input"
              error="This field has an error"
            />
          </div>
        </div>
      </section>

      {/* Floating Label Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Floating Label Behavior</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <InputText
              label="Standard Floating Label"
              name="standardLabel"
              type="text"
              helperText="Label floats when input gains focus or has value"
            />
          </div>
          <div className="ihub-col-md-6">
            <InputText
              label="Always Active Label"
              name="activeLabel"
              type="text"
              activeLabel={true}
              helperText="Label is always in the floating position"
            />
          </div>
        </div>
      </section>

      {/* Character Limit Example */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Character Limits</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <InputText
              label="Username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              maxLength={20}
              helperText={`${formData.username.length}/20 characters`}
              textTransform="lowercase"
            />
          </div>
          <div className="ihub-col-md-6">
            <InputText
              label="Bio"
              name="bio"
              type="text"
              value={formData.bio}
              onChange={handleInputChange}
              maxLength={100}
              helperText={`${formData.bio.length}/100 characters`}
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>
      </section>

      {/* Form Integration Example */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Complete Form Example</h2>
        <form onSubmit={handleSubmit} className="ihub-form">
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <InputText
                label="First Name"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={errors.firstName}
                required
                id="firstName"
              />
            </div>
            <div className="ihub-col-md-6">
              <InputText
                label="Last Name"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={errors.lastName}
                required
                id="lastName"
              />
            </div>
          </div>

          <InputText
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.email}
            required
            id="email"
          />

          <InputText
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.password}
            required
            id="password"
          />

          <div className="ihub-d-flex ihub-justify-content-end ihub-mt-4">
            <button type="submit" className="ihub-primary-btn">
              Submit Form
            </button>
          </div>
        </form>
      </section>

      {/* Custom Styling Example */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Custom Styling</h2>
        <InputText
          label="Custom Styled Input"
          name="customInput"
          type="text"
          placeholder="This input has custom styling"
          className="ihub-custom-input"
          helperText="Additional CSS classes can be applied for custom styling"
        />
      </section>

      {/* Accessibility Features */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Accessibility Features</h2>
        <InputText
          label="Accessible Input"
          name="accessibleInput"
          type="text"
          id="accessible-input"
          note="This input includes proper ARIA attributes and accessibility features"
          helperText="Screen readers will announce this helper text"
          required
        />
      </section>
    </div>
  );
};

export default InputTextExamples;
```

## 🔗 Related Components

- [InputNumber](./InputNumber.md) - InputNumber component for numerical input
- [InputTextarea](./InputTextarea.md) - InputTextarea component for text input
- [SearchObjectsFromDB](./SearchObjectsFromDB.md) - SearchObjectsFromDB component for searching objects from database
- [ToggleButton](./ToggleButton.md) - ToggleButton component for changing state
- [DateInputPicker](./DateInputPicker.md) - DateInputPicker component for picking date and time

