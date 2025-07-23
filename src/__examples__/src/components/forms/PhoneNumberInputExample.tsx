"use client";

import React, { useState } from "react";
import { PhoneNumberInput, SubmitButton } from "../../../../index";

const PhoneNumberInputExample: React.FC = () => {
  const [phoneNumber1, setPhoneNumber1] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("+1");
  const [phoneNumber3, setPhoneNumber3] = useState("");
  const [formData, setFormData] = useState({ phone: "" });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {[key: string]: string} = {};

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted with phone:", formData.phone);
    }
  };

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>PhoneNumberInput Examples</h1>
        <p>Phone number input component with country code support and validation</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Phone Input */}
        <div className="ihub-example-card">
          <h3>Basic Phone Number Input</h3>
          <p>Simple phone number input without country code</p>
          
          <PhoneNumberInput
            label="Phone Number"
            value={phoneNumber1}
            onChange={setPhoneNumber1}
            placeholder="Enter phone number"
          />
          
          <div className="ihub-input-result">
            <strong>Value:</strong> {phoneNumber1 || "No phone number entered"}
          </div>
        </div>

        {/* Phone Input with Country Code */}
        <div className="ihub-example-card">
          <h3>Phone Input with Country Code</h3>
          <p>Phone number input with selectable country code</p>
          
          <PhoneNumberInput
            label="Phone Number with Country"
            value={phoneNumber2}
            onChange={setPhoneNumber2}
            placeholder="Enter phone number"
            showCountryCode={true}
            defaultCountryCode="+1"
          />
          
          <div className="ihub-input-result">
            <strong>Value:</strong> {phoneNumber2 || "+1"}
          </div>
        </div>

        {/* International Phone Input */}
        <div className="ihub-example-card">
          <h3>International Phone Input</h3>
          <p>Phone input with comprehensive country selection</p>
          
          <PhoneNumberInput
            label="International Phone"
            value={phoneNumber3}
            onChange={setPhoneNumber3}
            placeholder="Enter phone number"
            showCountryCode={true}
            showCountryFlag={true}
            countries={[
              { code: "+1", name: "United States", flag: "🇺🇸" },
              { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
              { code: "+234", name: "Nigeria", flag: "🇳🇬" },
              { code: "+91", name: "India", flag: "🇮🇳" },
              { code: "+86", name: "China", flag: "🇨🇳" }
            ]}
          />
        </div>

        {/* Form Integration */}
        <div className="ihub-example-card">
          <h3>Form Integration with Validation</h3>
          <p>Phone number input integrated with form validation</p>
          
          <form onSubmit={handleSubmit}>
            <PhoneNumberInput
              label="Business Phone"
              value={formData.phone}
              onChange={(value) => setFormData({...formData, phone: value})}
              placeholder="Enter business phone"
              showCountryCode={true}
              required={true}
              error={errors.phone}
            />
            
            <SubmitButton
              title="Submit Phone"
              status={1}
              className="ihub-important-btn"
            />
          </form>
        </div>

        {/* Different Formats */}
        <div className="ihub-example-card">
          <h3>Phone Number Formatting</h3>
          <p>Different phone number display formats</p>
          
          <div className="ihub-format-examples">
            <PhoneNumberInput
              label="US Format"
              value={phoneNumber1}
              onChange={setPhoneNumber1}
              format="(###) ###-####"
              mask="_"
            />
            
            <PhoneNumberInput
              label="International Format"
              value={phoneNumber2}
              onChange={setPhoneNumber2}
              format="+# (###) ###-####"
              mask="_"
              className="ihub-mt-3"
            />
          </div>
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { PhoneNumberInput } from '@instincthub/react-ui';

const [phoneNumber, setPhoneNumber] = useState("");

<PhoneNumberInput
  label="Phone Number"
  value={phoneNumber}
  onChange={setPhoneNumber}
  placeholder="Enter phone number"
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Country Code</h3>
          <pre><code>{`<PhoneNumberInput
  label="International Phone"
  value={phoneNumber}
  onChange={setPhoneNumber}
  showCountryCode={true}
  showCountryFlag={true}
  countries={[
    { code: "+1", name: "United States", flag: "🇺🇸" },
    { code: "+44", name: "United Kingdom", flag: "🇬🇧" }
  ]}
/>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default PhoneNumberInputExample;