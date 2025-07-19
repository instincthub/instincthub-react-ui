# CountryInput

**Category:** Form | **Type:** component

A searchable country selector input field with real-time filtering, validation, and comprehensive country data support

## 📁 File Location

`src/components/forms/CountryInput.tsx`

## 🏷️ Tags

`form`, `input`, `country`, `search`, `dropdown`, `validation`

## 📖 Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `defaultValues` | `CountryObject` | No | `{}` | Default selected country object |
| `names` | `string` | No | - | CSS class name for the form input |
| `requireds` | `boolean` | No | `false` | Whether the field is required |
| `ids` | `string` | No | - | HTML id attribute for the input |
| `maxLengths` | `number` | No | - | Maximum length of input value |
| `widths` | `string` | No | - | Width style ("auto" for auto width) |
| `disableds` | `boolean` | No | `false` | Whether the input is disabled |
| `notes` | `string` | No | - | Help text displayed below the input |
| `setFormData` | `React.Dispatch<React.SetStateAction<any>>` | No | - | Function to update parent form data |
| `setValues` | `(value: string) => void` | No | - | Function to set country name value |

## 🎨 CSS Classes

- `form-input` - Main form input container
- `field` - Input field wrapper
- `wrapper` - Input wrapper with floating label
- `value` - Applied when input has value
- `text_label` - Floating label styling
- `notes` - Help text styling
- `list-items` - Dropdown list container
- `bottom_line` - Border styling for list items
- `close_icon` - Close icon for dropdown
- `width_auto` - Auto width styling

## 🌟 Features

- **Real-time Search** - Filter countries as you type
- **Comprehensive Data** - Includes country names and ISO codes
- **Validation** - Built-in validation with visual feedback
- **Accessibility** - Keyboard navigation and screen reader support
- **Flexible Integration** - Works with various form state management patterns
- **Visual Feedback** - Clear validation states and hover effects

```tsx
"use client";
import React, { useState } from "react";
import { CountryInput } from "@instincthub/react-ui";

/**
 * Comprehensive CountryInput examples demonstrating various use cases
 */
const CountryInputExamples = () => {
  // Basic form state
  const [basicFormData, setBasicFormData] = useState<any>({
    country_objects: null
  });

  // Controlled input state
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  // Registration form state
  const [registrationData, setRegistrationData] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    country_objects: null
  });

  // Profile update state
  const [profileData, setProfileData] = useState<any>({
    country_objects: {
      isoCode: "US",
      name: "United States"
    }
  });

  // Multi-step form state
  const [shippingData, setShippingData] = useState<any>({
    address: "",
    city: "",
    country_objects: null,
    postalCode: ""
  });

  const handleCountryChange = (countryName: string) => {
    console.log("Country selected:", countryName);
    setSelectedCountry(countryName);
  };

  const handleRegistrationSubmit = () => {
    if (!registrationData.country_objects) {
      alert("Please select a country");
      return;
    }
    console.log("Registration data:", registrationData);
  };

  const handleProfileUpdate = () => {
    console.log("Profile updated:", profileData);
  };

  const handleShippingSubmit = () => {
    if (!shippingData.country_objects) {
      alert("Please select a country for shipping");
      return;
    }
    console.log("Shipping data:", shippingData);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>CountryInput Examples</h1>

      {/* Basic Example */}
      <div className="ihub-mb-5">
        <h2>Basic Country Selection</h2>
        <p>Simple country input with form data integration:</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <CountryInput
              names="basic-country"
              setFormData={setBasicFormData}
              requireds={true}
              notes="Select your country from the list"
            />
          </div>
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-3">
              <h5>Current Selection:</h5>
              <pre>{JSON.stringify(basicFormData.country_objects, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* Controlled Input Example */}
      <div className="ihub-mb-5">
        <h2>Controlled Input</h2>
        <p>Country input with external value control:</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <CountryInput
              names="controlled-country"
              setValues={handleCountryChange}
              notes="Type to search countries"
            />
          </div>
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-3">
              <h5>Selected Country:</h5>
              <p>{selectedCountry || "None selected"}</p>
              
              <div className="ihub-mt-3">
                <button 
                  className="ihub-outlined-btn ihub-me-2"
                  onClick={() => setSelectedCountry("Canada")}
                >
                  Set Canada
                </button>
                <button 
                  className="ihub-outlined-btn"
                  onClick={() => setSelectedCountry("")}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form Example */}
      <div className="ihub-mb-5">
        <h2>Registration Form</h2>
        <p>Country selection as part of a user registration form:</p>
        
        <div className="ihub-card ihub-p-4">
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <div className="ihub-form-group">
                <input
                  type="text"
                  className="ihub-form-control"
                  placeholder="First Name"
                  value={registrationData.firstName}
                  onChange={(e) => setRegistrationData(prev => ({
                    ...prev,
                    firstName: e.target.value
                  }))}
                />
              </div>
            </div>
            <div className="ihub-col-md-6">
              <div className="ihub-form-group">
                <input
                  type="text"
                  className="ihub-form-control"
                  placeholder="Last Name"
                  value={registrationData.lastName}
                  onChange={(e) => setRegistrationData(prev => ({
                    ...prev,
                    lastName: e.target.value
                  }))}
                />
              </div>
            </div>
          </div>
          
          <div className="ihub-form-group">
            <input
              type="email"
              className="ihub-form-control"
              placeholder="Email Address"
              value={registrationData.email}
              onChange={(e) => setRegistrationData(prev => ({
                ...prev,
                email: e.target.value
              }))}
            />
          </div>
          
          <div className="ihub-form-group">
            <CountryInput
              names="registration-country"
              setFormData={setRegistrationData}
              requireds={true}
              notes="Required: Select your country of residence"
            />
          </div>
          
          <button 
            className="ihub-primary-btn"
            onClick={handleRegistrationSubmit}
            disabled={!registrationData.firstName || !registrationData.email}
          >
            Register Account
          </button>
        </div>
      </div>

      {/* Profile Update Example */}
      <div className="ihub-mb-5">
        <h2>Profile Update (With Default Value)</h2>
        <p>Country input with pre-selected default value for profile editing:</p>
        
        <div className="ihub-card ihub-p-4">
          <div className="ihub-row">
            <div className="ihub-col-md-8">
              <CountryInput
                names="profile-country"
                defaultValues={profileData.country_objects}
                setFormData={setProfileData}
                notes="Update your country if needed"
              />
            </div>
            <div className="ihub-col-md-4">
              <button 
                className="ihub-important-btn ihub-w-100"
                onClick={handleProfileUpdate}
              >
                Update Profile
              </button>
            </div>
          </div>
          
          <div className="ihub-mt-3">
            <small className="ihub-text-muted">
              Current: {profileData.country_objects?.name || "No country selected"}
            </small>
          </div>
        </div>
      </div>

      {/* Shipping Form Example */}
      <div className="ihub-mb-5">
        <h2>Shipping Address Form</h2>
        <p>Country selection for shipping address with validation:</p>
        
        <div className="ihub-card ihub-p-4">
          <div className="ihub-form-group">
            <input
              type="text"
              className="ihub-form-control"
              placeholder="Street Address"
              value={shippingData.address}
              onChange={(e) => setShippingData(prev => ({
                ...prev,
                address: e.target.value
              }))}
            />
          </div>
          
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <div className="ihub-form-group">
                <input
                  type="text"
                  className="ihub-form-control"
                  placeholder="City"
                  value={shippingData.city}
                  onChange={(e) => setShippingData(prev => ({
                    ...prev,
                    city: e.target.value
                  }))}
                />
              </div>
            </div>
            <div className="ihub-col-md-6">
              <div className="ihub-form-group">
                <input
                  type="text"
                  className="ihub-form-control"
                  placeholder="Postal Code"
                  value={shippingData.postalCode}
                  onChange={(e) => setShippingData(prev => ({
                    ...prev,
                    postalCode: e.target.value
                  }))}
                />
              </div>
            </div>
          </div>
          
          <div className="ihub-form-group">
            <CountryInput
              names="shipping-country"
              setFormData={setShippingData}
              requireds={true}
              notes="Required for shipping calculation"
            />
          </div>
          
          <button 
            className="ihub-primary-btn"
            onClick={handleShippingSubmit}
            disabled={!shippingData.address || !shippingData.city}
          >
            Calculate Shipping
          </button>
        </div>
      </div>

      {/* Disabled Example */}
      <div className="ihub-mb-5">
        <h2>Disabled State</h2>
        <p>Country input in disabled state:</p>
        
        <CountryInput
          names="disabled-country"
          defaultValues={{ isoCode: "CA", name: "Canada" }}
          disableds={true}
          notes="This field is currently disabled"
        />
      </div>

      {/* Custom Width Example */}
      <div className="ihub-mb-5">
        <h2>Custom Width</h2>
        <p>Country input with auto width:</p>
        
        <div className="ihub-d-flex ihub-align-items-end" style={{ gap: "20px" }}>
          <div>
            <CountryInput
              names="auto-width-country"
              widths="auto"
              notes="Auto width input"
            />
          </div>
          <button className="ihub-outlined-btn">
            Submit
          </button>
        </div>
      </div>

      {/* Validation Example */}
      <div className="ihub-mb-5">
        <h2>Validation States</h2>
        <p>Country input showing different validation states:</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <h5>Required Field</h5>
            <CountryInput
              names="required-country"
              requireds={true}
              notes="This field is required"
            />
          </div>
          <div className="ihub-col-md-4">
            <h5>Valid Selection</h5>
            <CountryInput
              names="valid-country"
              defaultValues={{ isoCode: "GB", name: "United Kingdom" }}
              notes="Valid country selected"
            />
          </div>
          <div className="ihub-col-md-4">
            <h5>With ID & MaxLength</h5>
            <CountryInput
              names="custom-country"
              ids="country-selector"
              maxLengths={50}
              notes="Custom attributes applied"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryInputExamples;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { CountryInput } from '@instincthub/react-ui';
```

## 🚀 Basic Usage

```tsx
import React, { useState } from 'react';
import { CountryInput } from '@instincthub/react-ui';

function MyComponent() {
  const [formData, setFormData] = useState({ country_objects: null });

  return (
    <CountryInput
      setFormData={setFormData}
      requireds={true}
      notes="Please select your country"
    />
  );
}
```

## 🔧 Implementation Guide

### Country Object Structure

```tsx
interface CountryObject {
  isoCode: string;  // ISO country code (e.g., "US", "CA")
  name: string;     // Country display name (e.g., "United States")
  [key: string]: any; // Additional country properties
}
```

### Form Integration

```tsx
// Basic form integration
const [formData, setFormData] = useState({
  country_objects: null
});

// With validation
const isValid = formData.country_objects !== null;

// Submit handler
const handleSubmit = () => {
  if (!formData.country_objects) {
    alert("Please select a country");
    return;
  }
  // Process form data
};
```

### Controlled Component Pattern

```tsx
const [selectedCountry, setSelectedCountry] = useState("");

const handleCountrySelect = (countryName: string) => {
  setSelectedCountry(countryName);
  // Additional logic
};

<CountryInput
  setValues={handleCountrySelect}
  notes="Type to search countries"
/>
```

## ♿ Accessibility Features

- **Keyboard Navigation** - Full keyboard support for dropdown navigation
- **Screen Reader Support** - Proper ARIA labels and descriptions
- **Focus Management** - Clear focus indicators and logical tab order
- **Search Functionality** - Real-time search with clear visual feedback
- **Validation States** - Clear visual and programmatic validation feedback

## 🎯 Use Cases

- **User Registration** - Country selection during account creation
- **Profile Management** - Updating user location information
- **Shipping Forms** - International shipping address collection
- **Contact Forms** - Location-based contact information
- **Survey Forms** - Demographic data collection
- **Settings Pages** - User preference configuration

## 🔗 Related Components

- [CountryStateInput](./CountryStateInput.md) - Nested country/state selector
- [InputText](./InputText.md) - Basic text input component
- [SearchObjectsFromDB](./SearchObjectsFromDB.md) - Database search component
- [InputSearchDropdown](./InputSearchDropdown.md) - Generic search dropdown
- [PhoneNumberInput](./PhoneNumberInput.md) - International phone input

