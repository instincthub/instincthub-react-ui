# DateInput

**Category:** Forms | **Type:** component

A customizable date input component with age validation, controls, and form integration.

## 🏷️ Tags

`forms`, `input`, `form`, `date`, `validation`

```tsx
"use client";
import React, { useState } from "react";
import { DateInput } from "@instincthub/react-ui";

/**
 * Example component demonstrating various ways to use the DateInput
 */
const DateInputExamples = () => {
  const [formData, setFormData] = useState({
    birthDate: "",
    eventDate: "",
    appointmentDate: "",
    registrationDate: "",
    bookingDate: "",
    expiryDate: "",
  });

  // Handle date input changes
  const handleDateInput = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(`${name}: ${value}`);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with dates:", formData);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>DateInput Examples</h1>

      {/* Basic Date Input */}
      <div className="ihub-mb-5">
        <h2>Basic Date Selection</h2>
        <DateInput
          label="Select Date"
          name="basicDate"
          inputEvent={handleDateInput}
        />
      </div>

      {/* Date of Birth with Age Validation */}
      <div className="ihub-mb-5">
        <h2>Date of Birth (Age 18-65)</h2>
        <DateInput
          label="Date of Birth"
          name="birthDate"
          minAge={18}
          maxAge={65}
          required={true}
          inputEvent={handleDateInput}
        />
        <small className="ihub-text-muted">
          Must be between 18 and 65 years old
        </small>
      </div>

      {/* Event Date with Controls */}
      <div className="ihub-mb-5">
        <h2>Event Date with Quick Controls</h2>
        <DateInput
          label="Event Date"
          name="eventDate"
          controls={true}
          inputEvent={handleDateInput}
        />
        <small className="ihub-text-muted">
          Use Today, Tomorrow, or Clear buttons for quick selection
        </small>
      </div>

      {/* Appointment Booking */}
      <div className="ihub-mb-5">
        <h2>Appointment Booking</h2>
        <DateInput
          label="Appointment Date"
          name="appointmentDate"
          required={true}
          controls={true}
          inputEvent={handleDateInput}
        />
      </div>

      {/* Registration Date with Default Value */}
      <div className="ihub-mb-5">
        <h2>Registration Date (Pre-filled)</h2>
        <DateInput
          label="Registration Date"
          name="registrationDate"
          defaultValue="2024-01-15"
          inputEvent={handleDateInput}
        />
        <small className="ihub-text-muted">
          Pre-filled with default value
        </small>
      </div>

      {/* Booking Date for Adults Only */}
      <div className="ihub-mb-5">
        <h2>Hotel Booking (Adults Only - 21+)</h2>
        <DateInput
          label="Check-in Date"
          name="bookingDate"
          minAge={21}
          required={true}
          controls={true}
          inputEvent={handleDateInput}
        />
        <small className="ihub-text-muted">
          Must be 21 years or older for booking
        </small>
      </div>

      {/* Senior Citizen Verification */}
      <div className="ihub-mb-5">
        <h2>Senior Citizen Verification (65+)</h2>
        <DateInput
          label="Date of Birth"
          name="seniorDate"
          maxAge={65}
          required={true}
          inputEvent={handleDateInput}
        />
        <small className="ihub-text-muted">
          For senior citizen discounts (65+ years)
        </small>
      </div>

      {/* Document Expiry Date */}
      <div className="ihub-mb-5">
        <h2>Document Expiry Date</h2>
        <DateInput
          label="Expiry Date"
          name="expiryDate"
          controls={true}
          inputEvent={handleDateInput}
        />
        <small className="ihub-text-muted">
          Select expiration date for your document
        </small>
      </div>

      {/* Complete Form Example */}
      <div className="ihub-mb-5">
        <h2>Complete Registration Form</h2>
        <form onSubmit={handleSubmit} className="ihub-form">
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <DateInput
                label="Date of Birth *"
                name="birthDate"
                minAge={16}
                maxAge={100}
                required={true}
                inputEvent={handleDateInput}
              />
            </div>
            <div className="ihub-col-md-6">
              <DateInput
                label="Preferred Start Date"
                name="startDate"
                controls={true}
                inputEvent={handleDateInput}
              />
            </div>
          </div>

          <div className="ihub-mt-3">
            <button type="submit" className="ihub-important-btn">
              Submit Registration
            </button>
          </div>
        </form>
      </div>

      {/* Student Enrollment (Age Restrictions) */}
      <div className="ihub-mb-5">
        <h2>Student Enrollment (Ages 5-18)</h2>
        <DateInput
          label="Student Date of Birth"
          name="studentBirth"
          minAge={5}
          maxAge={18}
          required={true}
          inputEvent={handleDateInput}
        />
        <small className="ihub-text-muted">
          Only students aged 5-18 are eligible for enrollment
        </small>
      </div>

      {/* Travel Booking */}
      <div className="ihub-mb-5">
        <h2>Travel Booking Dates</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <DateInput
              label="Departure Date"
              name="departureDate"
              controls={true}
              required={true}
              inputEvent={handleDateInput}
            />
          </div>
          <div className="ihub-col-md-6">
            <DateInput
              label="Return Date"
              name="returnDate"
              controls={true}
              inputEvent={handleDateInput}
            />
          </div>
        </div>
      </div>

      {/* Medical Appointment */}
      <div className="ihub-mb-5">
        <h2>Medical Appointment Scheduling</h2>
        <DateInput
          label="Appointment Date"
          name="medicalAppointment"
          controls={true}
          required={true}
          inputEvent={handleDateInput}
        />
        <small className="ihub-text-muted">
          Schedule your medical consultation
        </small>
      </div>

      {/* Job Application */}
      <div className="ihub-mb-5">
        <h2>Job Application (Working Age)</h2>
        <DateInput
          label="Date of Birth"
          name="jobApplicantBirth"
          minAge={16}
          maxAge={70}
          required={true}
          inputEvent={handleDateInput}
        />
        <small className="ihub-text-muted">
          Must be of working age (16-70 years)
        </small>
      </div>

      {/* Event RSVP */}
      <div className="ihub-mb-5">
        <h2>Event RSVP</h2>
        <div className="ihub-border ihub-p-3 ihub-rounded">
          <h4>Wedding Invitation</h4>
          <DateInput
            label="Your Date of Birth"
            name="rsvpBirth"
            required={true}
            inputEvent={handleDateInput}
          />
          <DateInput
            label="Arrival Date"
            name="arrivalDate"
            controls={true}
            defaultValue="2024-06-15"
            inputEvent={handleDateInput}
          />
        </div>
      </div>

      {/* Data Display */}
      <div className="ihub-mb-5">
        <h2>Current Form Data</h2>
        <div className="ihub-bg-light ihub-p-3 ihub-rounded">
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default DateInputExamples;
```

## 📋 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | **Required.** Label text for the date input |
| `name` | `string` | - | Name attribute for form submission |
| `maxAge` | `number` | - | Maximum age allowed (validation) |
| `minAge` | `number` | - | Minimum age allowed (validation) |
| `defaultValue` | `string` | - | Default date in YYYY-MM-DD format |
| `required` | `boolean` | `false` | Whether the field is required |
| `controls` | `boolean` | `false` | Show Today/Tomorrow/Clear buttons |
| `inputEvent` | `function` | - | Callback function `(name: string, value: string) => void` |

## 🎯 Use Cases

### 1. **Date of Birth Validation**
```tsx
<DateInput
  label="Date of Birth"
  name="dob"
  minAge={18}
  maxAge={65}
  required={true}
  inputEvent={(name, value) => console.log(name, value)}
/>
```

### 2. **Event Scheduling with Quick Controls**
```tsx
<DateInput
  label="Event Date"
  name="eventDate"
  controls={true}
  inputEvent={handleDateChange}
/>
```

### 3. **Form Integration with Default Value**
```tsx
<DateInput
  label="Registration Date"
  name="regDate"
  defaultValue="2024-01-01"
  required={true}
  inputEvent={updateFormData}
/>
```

### 4. **Age-Restricted Services**
```tsx
{/* Senior discounts */}
<DateInput
  label="Date of Birth"
  name="seniorDob"
  maxAge={65}
  inputEvent={validateSeniorDiscount}
/>

{/* Adult-only services */}
<DateInput
  label="Date of Birth"
  name="adultDob"
  minAge={21}
  required={true}
  inputEvent={validateAdultService}
/>
```

### 5. **Booking and Reservation Systems**
```tsx
<DateInput
  label="Check-in Date"
  name="checkin"
  controls={true}
  required={true}
  inputEvent={updateBooking}
/>
```

## 🎨 Styling

The component uses these CSS classes:
- `.ihub-date-input-container` - Main container
- `.ihub-date-input` - Individual input fields
- `.ihub-date-year` - Year input field
- `.date-err` - Error state styling
- `.ihub-auto-date` - Quick control buttons
- `.ihub-is_invalid` - Error message styling

## ⚠️ Important Notes

1. **Date Format**: Returns date in `YYYY-MM-DD` format
2. **Age Validation**: Based on current year, not exact birth date calculation
3. **Input Restrictions**: Only numeric input allowed
4. **Auto Focus**: Automatically moves focus between day → month → year
5. **Hidden Input**: Creates a hidden input with the complete date for form submission

## 🔗 Related Components

- [DateTimeInput](./DateTimeInput.md) - Date and time selection input field
- [TimePicker](./TimePicker.md) - Time selection component
- [InputText](./InputText.md) - Text input field
- [TextField](./TextField.md) - Enhanced text field with validation
- [SubmitButton](./SubmitButton.md) - Form submission button

