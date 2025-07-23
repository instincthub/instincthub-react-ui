"use client";

import React, { useState } from "react";
import { DateInput } from "../../../../index";

const DateInputExample: React.FC = () => {
  const [formData, setFormData] = useState({
    basicDate: "",
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
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>DateInput Examples</h1>
        <p>A customizable date input component with age validation, controls, and form integration</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Date Input */}
        <div className="ihub-example-card">
          <h3>Basic Date Selection</h3>
          <p>Simple date input without any special features</p>
          <DateInput
            label="Select Date"
            name="basicDate"
            inputEvent={handleDateInput}
          />
          <div className="ihub-example-output">
            <strong>Selected:</strong> {formData.basicDate || "None"}
          </div>
        </div>

        {/* Date of Birth with Age Validation */}
        <div className="ihub-example-card">
          <h3>Date of Birth (Age 18-65)</h3>
          <p>Date input with age validation constraints</p>
          <DateInput
            label="Date of Birth"
            name="birthDate"
            minAge={18}
            maxAge={65}
            required={true}
            inputEvent={handleDateInput}
          />
          <div className="ihub-example-note">
            <small>Must be between 18 and 65 years old</small>
          </div>
          <div className="ihub-example-output">
            <strong>Selected:</strong> {formData.birthDate || "None"}
          </div>
        </div>

        {/* Event Date with Controls */}
        <div className="ihub-example-card">
          <h3>Event Date with Quick Controls</h3>
          <p>Date input with Today, Tomorrow, and Clear buttons</p>
          <DateInput
            label="Event Date"
            name="eventDate"
            controls={true}
            inputEvent={handleDateInput}
          />
          <div className="ihub-example-note">
            <small>Use Today, Tomorrow, or Clear buttons for quick selection</small>
          </div>
          <div className="ihub-example-output">
            <strong>Selected:</strong> {formData.eventDate || "None"}
          </div>
        </div>

        {/* Appointment Booking */}
        <div className="ihub-example-card">
          <h3>Appointment Booking</h3>
          <p>Required date input with controls for appointment scheduling</p>
          <DateInput
            label="Appointment Date"
            name="appointmentDate"
            required={true}
            controls={true}
            inputEvent={handleDateInput}
          />
          <div className="ihub-example-output">
            <strong>Selected:</strong> {formData.appointmentDate || "None"}
          </div>
        </div>

        {/* Registration Date */}
        <div className="ihub-example-card">
          <h3>Registration Date</h3>
          <p>Date input for registration forms</p>
          <DateInput
            label="Registration Date"
            name="registrationDate"
            inputEvent={handleDateInput}
          />
          <div className="ihub-example-output">
            <strong>Selected:</strong> {formData.registrationDate || "None"}
          </div>
        </div>

        {/* Booking Date with Age Restrictions */}
        <div className="ihub-example-card">
          <h3>Booking Date (Adult Only)</h3>
          <p>Date input requiring minimum age of 21</p>
          <DateInput
            label="Booking Date (21+)"
            name="bookingDate"
            minAge={21}
            required={true}
            inputEvent={handleDateInput}
          />
          <div className="ihub-example-note">
            <small>Must be at least 21 years old</small>
          </div>
          <div className="ihub-example-output">
            <strong>Selected:</strong> {formData.bookingDate || "None"}
          </div>
        </div>

        {/* Expiry Date */}
        <div className="ihub-example-card">
          <h3>Expiry Date</h3>
          <p>Date input for expiration dates</p>
          <DateInput
            label="Expiry Date"
            name="expiryDate"
            controls={true}
            inputEvent={handleDateInput}
          />
          <div className="ihub-example-output">
            <strong>Selected:</strong> {formData.expiryDate || "None"}
          </div>
        </div>

        {/* Senior Citizen Date */}
        <div className="ihub-example-card">
          <h3>Senior Citizen (65+)</h3>
          <p>Date input for senior citizen verification</p>
          <DateInput
            label="Date of Birth (Senior)"
            name="seniorDate"
            maxAge={100}
            minAge={65}
            required={true}
            inputEvent={handleDateInput}
          />
          <div className="ihub-example-note">
            <small>Must be 65 years or older</small>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="ihub-mt-5">
        <h2>Complete Date Form</h2>
        <div className="ihub-form-grid">
          <DateInput
            label="Start Date"
            name="startDate"
            required={true}
            controls={true}
            inputEvent={handleDateInput}
          />
          <DateInput
            label="End Date"
            name="endDate"
            required={true}
            controls={true}
            inputEvent={handleDateInput}
          />
        </div>
        <button type="submit" className="ihub-important-btn ihub-mt-3">
          Submit Form
        </button>
      </form>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { DateInput } from '@instincthub/react-ui';

const handleDateInput = (name: string, value: string) => {
  console.log(\`\${name}: \${value}\`);
};

<DateInput
  label="Select Date"
  name="basicDate"
  inputEvent={handleDateInput}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Age Validation</h3>
          <pre><code>{`<DateInput
  label="Date of Birth"
  name="birthDate"
  minAge={18}
  maxAge={65}
  required={true}
  inputEvent={handleDateInput}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Quick Controls</h3>
          <pre><code>{`<DateInput
  label="Event Date"
  name="eventDate"
  controls={true}
  inputEvent={handleDateInput}
/>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default DateInputExample;