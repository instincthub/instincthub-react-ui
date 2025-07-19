# CountryStateInput

**Category:** Form | **Type:** component

A nested state/province selector that dynamically loads and filters states based on the selected country with validation and real-time search

## 📁 File Location

`src/components/forms/CountryStateInput.tsx`

## 🏷️ Tags

`form`, `input`, `state`, `province`, `country`, `nested`, `search`, `validation`

## 📖 Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `defaultValues` | `StateObject` | No | `{}` | Default selected state object |
| `names` | `string` | No | - | CSS class name for the form input |
| `requireds` | `boolean` | No | `false` | Whether the field is required |
| `ids` | `string` | No | - | HTML id attribute for the input |
| `maxLengths` | `number` | No | - | Maximum length of input value |
| `widths` | `string` | No | - | Width style ("auto" for auto width) |
| `disableds` | `boolean` | No | `false` | Whether the input is disabled |
| `notes` | `string` | No | - | Help text displayed below the input |
| `country` | `CountryObject` | No | - | Selected country object to filter states |
| `setFormData` | `React.Dispatch<React.SetStateAction<any>>` | No | - | Function to update parent form data |
| `setValues` | `(value: string) => void` | No | - | Function to set state name value |

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

- **Country-Based Filtering** - Automatically filters states based on selected country
- **Real-time Search** - Filter states/provinces as you type
- **Dynamic Data Loading** - Loads state data asynchronously
- **Validation** - Built-in validation with visual feedback
- **Cross-Country Support** - Handles multiple country formats
- **Fallback Handling** - Shows all states if country-specific states not found

```tsx
"use client";
import React, { useState } from "react";
import { CountryInput, CountryStateInput } from "@instincthub/react-ui";

/**
 * Comprehensive CountryStateInput examples demonstrating various use cases
 */
const CountryStateInputExamples = () => {
  // Basic address form state
  const [addressFormData, setAddressFormData] = useState<any>({
    country_objects: null,
    state_objects: null
  });

  // Shipping form state
  const [shippingData, setShippingData] = useState<any>({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country_objects: null,
    state_objects: null,
    postalCode: ""
  });

  // Business registration state
  const [businessData, setBusinessData] = useState<any>({
    businessName: "",
    businessType: "",
    country_objects: {
      isoCode: "US",
      name: "United States"
    },
    state_objects: null,
    city: ""
  });

  // Profile form with validation
  const [profileData, setProfileData] = useState<any>({
    country_objects: null,
    state_objects: null
  });

  // Controlled state selection
  const [selectedState, setSelectedState] = useState<string>("");

  const handleAddressSubmit = () => {
    if (!addressFormData.country_objects) {
      alert("Please select a country");
      return;
    }
    if (!addressFormData.state_objects) {
      alert("Please select a state/province");
      return;
    }
    console.log("Address data:", addressFormData);
  };

  const handleShippingSubmit = () => {
    console.log("Shipping data:", shippingData);
  };

  const handleBusinessSubmit = () => {
    if (!businessData.state_objects) {
      alert("Please select a state for business registration");
      return;
    }
    console.log("Business registration data:", businessData);
  };

  const handleStateChange = (stateName: string) => {
    console.log("State selected:", stateName);
    setSelectedState(stateName);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>CountryStateInput Examples</h1>

      {/* Basic Country-State Selection */}
      <div className="ihub-mb-5">
        <h2>Basic Country-State Selection</h2>
        <p>Linked country and state inputs with automatic filtering:</p>
        
        <div className="ihub-card ihub-p-4">
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <div className="ihub-form-group">
                <label className="ihub-label">Select Country</label>
                <CountryInput
                  names="address-country"
                  setFormData={setAddressFormData}
                  requireds={true}
                  notes="Select your country first"
                />
              </div>
            </div>
            <div className="ihub-col-md-6">
              <div className="ihub-form-group">
                <label className="ihub-label">Select State/Province</label>
                <CountryStateInput
                  names="address-state"
                  country={addressFormData.country_objects}
                  setFormData={setAddressFormData}
                  requireds={true}
                  notes={addressFormData.country_objects ? 
                    "Select your state/province" : 
                    "Please select a country first"
                  }
                  disableds={!addressFormData.country_objects}
                />
              </div>
            </div>
          </div>
          
          <div className="ihub-mt-3">
            <button 
              className="ihub-primary-btn"
              onClick={handleAddressSubmit}
              disabled={!addressFormData.country_objects || !addressFormData.state_objects}
            >
              Submit Address
            </button>
          </div>
          
          <div className="ihub-mt-3">
            <div className="ihub-card ihub-p-3">
              <h5>Current Selection:</h5>
              <p><strong>Country:</strong> {addressFormData.country_objects?.name || "None"}</p>
              <p><strong>State:</strong> {addressFormData.state_objects?.name || "None"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Address Form */}
      <div className="ihub-mb-5">
        <h2>Complete Shipping Address Form</h2>
        <p>Full shipping form with country-state dependency:</p>
        
        <div className="ihub-card ihub-p-4">
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <div className="ihub-form-group">
                <input
                  type="text"
                  className="ihub-form-control"
                  placeholder="First Name"
                  value={shippingData.firstName}
                  onChange={(e) => setShippingData(prev => ({
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
                  value={shippingData.lastName}
                  onChange={(e) => setShippingData(prev => ({
                    ...prev,
                    lastName: e.target.value
                  }))}
                />
              </div>
            </div>
          </div>
          
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
                <label className="ihub-label">Country</label>
                <CountryInput
                  names="shipping-country"
                  setFormData={setShippingData}
                  requireds={true}
                />
              </div>
            </div>
            <div className="ihub-col-md-6">
              <div className="ihub-form-group">
                <label className="ihub-label">State/Province</label>
                <CountryStateInput
                  names="shipping-state"
                  country={shippingData.country_objects}
                  setFormData={setShippingData}
                  requireds={true}
                  disableds={!shippingData.country_objects}
                />
              </div>
            </div>
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
          
          <button 
            className="ihub-primary-btn"
            onClick={handleShippingSubmit}
            disabled={!shippingData.country_objects || !shippingData.state_objects}
          >
            Save Shipping Address
          </button>
        </div>
      </div>

      {/* Business Registration Form */}
      <div className="ihub-mb-5">
        <h2>Business Registration (With Default Country)</h2>
        <p>Business registration form with pre-selected country:</p>
        
        <div className="ihub-card ihub-p-4">
          <div className="ihub-form-group">
            <input
              type="text"
              className="ihub-form-control"
              placeholder="Business Name"
              value={businessData.businessName}
              onChange={(e) => setBusinessData(prev => ({
                ...prev,
                businessName: e.target.value
              }))}
            />
          </div>
          
          <div className="ihub-form-group">
            <select
              className="ihub-form-control"
              value={businessData.businessType}
              onChange={(e) => setBusinessData(prev => ({
                ...prev,
                businessType: e.target.value
              }))}
            >
              <option value="">Select Business Type</option>
              <option value="LLC">LLC</option>
              <option value="Corporation">Corporation</option>
              <option value="Partnership">Partnership</option>
              <option value="Sole Proprietorship">Sole Proprietorship</option>
            </select>
          </div>
          
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <div className="ihub-form-group">
                <label className="ihub-label">Country (Pre-selected)</label>
                <CountryInput
                  names="business-country"
                  defaultValues={businessData.country_objects}
                  setFormData={setBusinessData}
                  disableds={true}
                  notes="Business registration limited to US"
                />
              </div>
            </div>
            <div className="ihub-col-md-6">
              <div className="ihub-form-group">
                <label className="ihub-label">State of Incorporation</label>
                <CountryStateInput
                  names="business-state"
                  country={businessData.country_objects}
                  setFormData={setBusinessData}
                  requireds={true}
                  notes="Required for business registration"
                />
              </div>
            </div>
          </div>
          
          <div className="ihub-form-group">
            <input
              type="text"
              className="ihub-form-control"
              placeholder="City"
              value={businessData.city}
              onChange={(e) => setBusinessData(prev => ({
                ...prev,
                city: e.target.value
              }))}
            />
          </div>
          
          <button 
            className="ihub-important-btn"
            onClick={handleBusinessSubmit}
            disabled={!businessData.businessName || !businessData.state_objects}
          >
            Register Business
          </button>
        </div>
      </div>

      {/* Controlled State Input */}
      <div className="ihub-mb-5">
        <h2>Controlled State Selection</h2>
        <p>State input with external value control:</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-form-group">
              <label className="ihub-label">Select Country First</label>
              <CountryInput
                names="controlled-country"
                setFormData={setProfileData}
                notes="Required for state selection"
              />
            </div>
            
            <div className="ihub-form-group">
              <label className="ihub-label">Then Select State</label>
              <CountryStateInput
                names="controlled-state"
                country={profileData.country_objects}
                setValues={handleStateChange}
                disableds={!profileData.country_objects}
                notes={profileData.country_objects ? 
                  "Type to search states" : 
                  "Select country first"
                }
              />
            </div>
          </div>
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-3">
              <h5>Current State:</h5>
              <p>{selectedState || "None selected"}</p>
              
              {profileData.country_objects?.isoCode === "US" && (
                <div className="ihub-mt-3">
                  <p><strong>Quick Select US States:</strong></p>
                  <div className="ihub-d-flex" style={{ gap: "10px", flexWrap: "wrap" }}>
                    <button 
                      className="ihub-outlined-btn ihub-small"
                      onClick={() => setSelectedState("California")}
                    >
                      California
                    </button>
                    <button 
                      className="ihub-outlined-btn ihub-small"
                      onClick={() => setSelectedState("New York")}
                    >
                      New York
                    </button>
                    <button 
                      className="ihub-outlined-btn ihub-small"
                      onClick={() => setSelectedState("Texas")}
                    >
                      Texas
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Validation States */}
      <div className="ihub-mb-5">
        <h2>Validation States</h2>
        <p>Different validation scenarios:</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <h5>Required Field</h5>
            <CountryStateInput
              names="required-state"
              requireds={true}
              notes="This field is required"
            />
          </div>
          <div className="ihub-col-md-4">
            <h5>Disabled State</h5>
            <CountryStateInput
              names="disabled-state"
              disableds={true}
              notes="This field is disabled"
            />
          </div>
          <div className="ihub-col-md-4">
            <h5>Custom Width</h5>
            <CountryStateInput
              names="custom-state"
              widths="auto"
              ids="state-selector"
              maxLengths={50}
              notes="Custom attributes"
            />
          </div>
        </div>
      </div>

      {/* Advanced Example */}
      <div className="ihub-mb-5">
        <h2>Advanced Integration</h2>
        <p>Complex form with multiple validation rules:</p>
        
        <div className="ihub-card ihub-p-4">
          <div className="ihub-alert ihub-alert-info ihub-mb-3">
            <strong>Note:</strong> This form demonstrates advanced validation and state management patterns.
          </div>
          
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <h5>Primary Address</h5>
              <CountryInput
                names="primary-country"
                setFormData={setProfileData}
                requireds={true}
                notes="Primary residence country"
              />
              <div className="ihub-mt-2">
                <CountryStateInput
                  names="primary-state"
                  country={profileData.country_objects}
                  setFormData={setProfileData}
                  requireds={true}
                  disableds={!profileData.country_objects}
                  notes="Primary residence state"
                />
              </div>
            </div>
            <div className="ihub-col-md-6">
              <div className="ihub-card ihub-p-3">
                <h6>Form Status</h6>
                <ul className="ihub-list-unstyled">
                  <li>
                    Country: {profileData.country_objects ? 
                      <span className="ihub-text-success">✓ Selected</span> : 
                      <span className="ihub-text-danger">✗ Required</span>
                    }
                  </li>
                  <li>
                    State: {profileData.state_objects ? 
                      <span className="ihub-text-success">✓ Selected</span> : 
                      <span className="ihub-text-warning">✗ Pending</span>
                    }
                  </li>
                  <li>
                    Form: {profileData.country_objects && profileData.state_objects ? 
                      <span className="ihub-text-success">✓ Complete</span> : 
                      <span className="ihub-text-muted">Incomplete</span>
                    }
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryStateInputExamples;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { CountryStateInput, CountryInput } from '@instincthub/react-ui';
```

## 🚀 Basic Usage

```tsx
import React, { useState } from 'react';
import { CountryInput, CountryStateInput } from '@instincthub/react-ui';

function MyComponent() {
  const [formData, setFormData] = useState({
    country_objects: null,
    state_objects: null
  });

  return (
    <>
      <CountryInput
        setFormData={setFormData}
        requireds={true}
      />
      
      <CountryStateInput
        country={formData.country_objects}
        setFormData={setFormData}
        requireds={true}
        disableds={!formData.country_objects}
      />
    </>
  );
}
```

## 🔧 Implementation Guide

### State Object Structure

```tsx
interface StateObject {
  isoCode: string;      // State ISO code (e.g., "CA", "NY")
  name: string;         // State display name (e.g., "California")
  countryCode: string;  // Parent country ISO code (e.g., "US")
  [key: string]: any;   // Additional properties
}
```

### Country-State Dependency

```tsx
// 1. Set up linked form state
const [formData, setFormData] = useState({
  country_objects: null,
  state_objects: null
});

// 2. Country selection updates state list
<CountryInput
  setFormData={setFormData}
  requireds={true}
/>

// 3. State input depends on country
<CountryStateInput
  country={formData.country_objects}  // Key dependency
  setFormData={setFormData}
  disableds={!formData.country_objects}
/>

// 4. State automatically clears when country changes
```

### Validation Patterns

```tsx
// Basic validation
const isValid = formData.country_objects && formData.state_objects;

// Complex validation with error messages
const validateAddress = () => {
  if (!formData.country_objects) {
    return "Country is required";
  }
  if (!formData.state_objects) {
    return "State/Province is required";
  }
  return null;
};

// Conditional validation
const requiresState = formData.country_objects?.isoCode === "US" || 
                     formData.country_objects?.isoCode === "CA";
```

### Advanced Integration

```tsx
// With form libraries (e.g., React Hook Form)
import { useForm, Controller } from 'react-hook-form';

const { control, watch } = useForm();
const selectedCountry = watch('country');

<Controller
  name="state"
  control={control}
  render={({ field }) => (
    <CountryStateInput
      country={selectedCountry}
      setValues={field.onChange}
      {...field}
    />
  )}
/>
```

## ♿ Accessibility Features

- **Keyboard Navigation** - Full keyboard support with arrow keys
- **Screen Reader Support** - Proper ARIA labels and state announcements
- **Focus Management** - Logical focus flow between country and state
- **Validation Feedback** - Clear error states and messages
- **Dependency Indication** - Clear visual indication of field dependencies

## 🎯 Use Cases

- **Address Forms** - Complete address collection with validation
- **Shipping Forms** - International shipping address management
- **Business Registration** - Company incorporation forms
- **User Profiles** - Location-based user information
- **Tax Forms** - Jurisdiction-specific tax collection
- **Service Availability** - Region-based service eligibility

## 🔗 Related Components

- [CountryInput](./CountryInput.md) - Country selector component
- [InputText](./InputText.md) - Basic text input component
- [PhoneNumberInput](./PhoneNumberInput.md) - International phone input
- [SearchObjectsFromDB](./SearchObjectsFromDB.md) - Database search component
- [InputSearchDropdown](./InputSearchDropdown.md) - Generic search dropdown

