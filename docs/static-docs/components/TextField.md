# TextField

**Category:** Forms | **Type:** component

Advanced text input field component with floating labels, text transformations, phone number validation, and flexible state management

## 🏷️ Tags

`forms`, `input`, `text`, `validation`, `phone`, `floating-label`

```tsx
"use client";
import React, { useState } from "react";
import { TextField } from "@instincthub/react-ui";

/**
 * Comprehensive examples demonstrating various TextField features and use cases
 */
const TextFieldExamples = () => {
  // Basic form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    website: "",
  });

  // Advanced state management
  const [userProfile, setUserProfile] = useState({
    username: "",
    bio: "",
    company: "",
  });

  // Array-based state for dynamic forms
  const [contacts, setContacts] = useState([
    { name: "John Doe", email: "john@example.com", phone: "+1234567890" },
    { name: "Jane Smith", email: "jane@example.com", phone: "+9876543210" },
  ]);

  // Individual field states
  const [searchTerm, setSearchTerm] = useState("");
  const [notes, setNotes] = useState("");

  // Handle basic form changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle profile changes using setNameValue
  const handleProfileChange = (name: string, value: string) => {
    setUserProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle array-based changes
  const handleContactChange = (arrayProps: [number, string], value: string) => {
    const [index, field] = arrayProps;
    setContacts(prev => 
      prev.map((contact, i) => 
        i === index ? { ...contact, [field]: value } : contact
      )
    );
  };

  // Add new contact
  const addContact = () => {
    setContacts(prev => [...prev, { name: "", email: "", phone: "" }]);
  };

  // Remove contact
  const removeContact = (index: number) => {
    setContacts(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="ihub-container ihub-py-5">
      <h1>TextField Examples</h1>

      {/* Basic Input Types */}
      <section className="ihub-mb-5">
        <h2>Basic Input Types</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <TextField
              type="text"
              name="firstName"
              label="First Name"
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="ihub-col-md-6">
            <TextField
              type="text"
              name="lastName"
              label="Last Name"
              onChange={handleFormChange}
              required
            />
          </div>
        </div>

        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <TextField
              type="email"
              name="email"
              label="Email Address"
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="ihub-col-md-6">
            <TextField
              type="url"
              name="website"
              label="Website URL"
              onChange={handleFormChange}
            />
          </div>
        </div>
      </section>

      {/* Phone Number with Validation */}
      <section className="ihub-mb-5">
        <h2>Phone Number with Automatic Validation</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <TextField
              type="tel"
              name="phone"
              label="Phone Number"
              onChange={handleFormChange}
              note="Automatically formats and validates phone numbers (max 15 digits)"
            />
          </div>
          <div className="ihub-col-md-6">
            <p><strong>Current value:</strong> {formData.phone}</p>
            <small className="text-muted">
              The tel type automatically:
              <ul>
                <li>Removes non-numeric characters (except +)</li>
                <li>Ensures + only appears at the beginning</li>
                <li>Limits to 15 characters maximum</li>
              </ul>
            </small>
          </div>
        </div>
      </section>

      {/* Text Transformations */}
      <section className="ihub-mb-5">
        <h2>Text Transformations</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-3">
            <TextField
              type="text"
              name="lowercase"
              label="Lowercase Input"
              TextTransform="lowercase"
              setValue={(value) => console.log("Lowercase:", value)}
              note="Automatically converts to lowercase"
            />
          </div>
          <div className="ihub-col-md-3">
            <TextField
              type="text"
              name="uppercase"
              label="Uppercase Input"
              TextTransform="uppercase"
              setValue={(value) => console.log("Uppercase:", value)}
              note="Displays as uppercase"
            />
          </div>
          <div className="ihub-col-md-3">
            <TextField
              type="text"
              name="capitalize"
              label="Capitalized Input"
              TextTransform="capitalize"
              setValue={(value) => console.log("Capitalized:", value)}
              note="Capitalizes first letter"
            />
          </div>
          <div className="ihub-col-md-3">
            <TextField
              type="text"
              name="normal"
              label="Normal Input"
              TextTransform="none"
              setValue={(value) => console.log("Normal:", value)}
              note="No transformation applied"
            />
          </div>
        </div>
      </section>

      {/* Different State Management Patterns */}
      <section className="ihub-mb-5">
        <h2>State Management Patterns</h2>
        
        <h3>Using setNameValue (Object State)</h3>
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <TextField
              type="text"
              name="username"
              label="Username"
              setNameValue={handleProfileChange}
              defaultValue={userProfile.username}
            />
          </div>
          <div className="ihub-col-md-4">
            <TextField
              type="text"
              name="company"
              label="Company"
              setNameValue={handleProfileChange}
              defaultValue={userProfile.company}
            />
          </div>
          <div className="ihub-col-md-4">
            <TextField
              type="text"
              name="bio"
              label="Bio"
              setNameValue={handleProfileChange}
              defaultValue={userProfile.bio}
            />
          </div>
        </div>
        <div className="ihub-mt-3">
          <strong>Profile State:</strong>
          <pre>{JSON.stringify(userProfile, null, 2)}</pre>
        </div>

        <h3 className="ihub-mt-4">Using setValue (Individual State)</h3>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <TextField
              type="text"
              name="search"
              label="Search Term"
              setValue={setSearchTerm}
              defaultValue={searchTerm}
            />
          </div>
          <div className="ihub-col-md-6">
            <TextField
              type="text"
              name="notes"
              label="Notes"
              setValue={setNotes}
              defaultValue={notes}
              maxLength={100}
            />
          </div>
        </div>
        <div className="ihub-mt-3">
          <p><strong>Search:</strong> {searchTerm}</p>
          <p><strong>Notes:</strong> {notes}</p>
        </div>
      </section>

      {/* Dynamic Array Management */}
      <section className="ihub-mb-5">
        <h2>Dynamic Array Management</h2>
        <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center ihub-mb-3">
          <h3>Contact List</h3>
          <button className="ihub-primary-btn" onClick={addContact}>
            Add Contact
          </button>
        </div>

        {contacts.map((contact, index) => (
          <div key={index} className="ihub-border ihub-p-3 ihub-mb-3 ihub-border-radius">
            <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center ihub-mb-2">
              <h4>Contact {index + 1}</h4>
              {contacts.length > 1 && (
                <button 
                  className="ihub-danger-btn ihub-btn-sm"
                  onClick={() => removeContact(index)}
                >
                  Remove
                </button>
              )}
            </div>
            <div className="ihub-row">
              <div className="ihub-col-md-4">
                <TextField
                  type="text"
                  name={`contact_name_${index}`}
                  label="Full Name"
                  arrayProps={[index, "name"]}
                  setArrayProps={handleContactChange}
                  defaultValue={contact.name}
                  required
                />
              </div>
              <div className="ihub-col-md-4">
                <TextField
                  type="email"
                  name={`contact_email_${index}`}
                  label="Email Address"
                  arrayProps={[index, "email"]}
                  setArrayProps={handleContactChange}
                  defaultValue={contact.email}
                  required
                />
              </div>
              <div className="ihub-col-md-4">
                <TextField
                  type="tel"
                  name={`contact_phone_${index}`}
                  label="Phone Number"
                  arrayProps={[index, "phone"]}
                  setArrayProps={handleContactChange}
                  defaultValue={contact.phone}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="ihub-mt-3">
          <strong>Contacts Data:</strong>
          <pre>{JSON.stringify(contacts, null, 2)}</pre>
        </div>
      </section>

      {/* Field States and Validation */}
      <section className="ihub-mb-5">
        <h2>Field States and Properties</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-3">
            <TextField
              type="text"
              name="required_field"
              label="Required Field"
              required={true}
              note="This field is required"
            />
          </div>
          <div className="ihub-col-md-3">
            <TextField
              type="text"
              name="disabled_field"
              label="Disabled Field"
              disabled={true}
              defaultValue="Cannot edit this"
              note="This field is read-only"
            />
          </div>
          <div className="ihub-col-md-3">
            <TextField
              type="text"
              name="max_length"
              label="Max Length (20)"
              maxLength={20}
              note="Maximum 20 characters"
            />
          </div>
          <div className="ihub-col-md-3">
            <TextField
              type="text"
              name="auto_width"
              label="Auto Width"
              width="auto"
              note="Width adjusts to content"
            />
          </div>
        </div>
      </section>

      {/* Floating Label Behavior */}
      <section className="ihub-mb-5">
        <h2>Floating Label Behavior</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <TextField
              type="text"
              name="empty_field"
              label="Empty Field"
              note="Label floats when focused or has value"
            />
          </div>
          <div className="ihub-col-md-4">
            <TextField
              type="text"
              name="prefilled_field"
              label="Pre-filled Field"
              defaultValue="Already has content"
              note="Label already floated due to default value"
            />
          </div>
          <div className="ihub-col-md-4">
            <TextField
              type="text"
              name="active_field"
              label="Always Active"
              active={true}
              note="Label always floated (active=true)"
            />
          </div>
        </div>
      </section>

      {/* Advanced Input Handling */}
      <section className="ihub-mb-5">
        <h2>Advanced Input Handling</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <TextField
              type="text"
              name="input_target"
              label="Input Target Access"
              inputTarget={(target) => {
                console.log("Input element:", target);
                console.log("Current value:", target.value);
                console.log("Input name:", target.name);
              }}
              note="Check console for input element details"
            />
          </div>
          <div className="ihub-col-md-6">
            <TextField
              type="file"
              name="file_input"
              label="File Upload"
              note="File inputs automatically float the label"
            />
          </div>
        </div>
      </section>

      {/* Form Integration Example */}
      <section className="ihub-mb-5">
        <h2>Complete Form Example</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log("Form submitted:", formData);
          alert("Check console for form data");
        }}>
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <TextField
                type="text"
                name="firstName"
                label="First Name *"
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="ihub-col-md-6">
              <TextField
                type="text"
                name="lastName"
                label="Last Name *"
                onChange={handleFormChange}
                required
              />
            </div>
          </div>
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <TextField
                type="email"
                name="email"
                label="Email Address *"
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="ihub-col-md-6">
              <TextField
                type="tel"
                name="phone"
                label="Phone Number"
                onChange={handleFormChange}
              />
            </div>
          </div>
          <div className="ihub-mt-3">
            <button type="submit" className="ihub-primary-btn">
              Submit Form
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default TextFieldExamples;
```

## 🔗 Related Components

- [ActionDropdown](./ActionDropdown.md) - Dropdown component for actions
- [AnimatedBox](./AnimatedBox.md) - Animated container component
- [PasswordField](./PasswordField.md) - Secure password input field
- [DateInput](./DateInput.md) - Date selection input field
- [DateTimeInput](./DateTimeInput.md) - Date and time selection input field

