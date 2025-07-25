"use client";

import React, { useState } from "react";
import { PhoneNumberInput, SubmitButton } from "../../../../index";

const PhoneNumberInputExample: React.FC = () => {
  const [formData1, setFormData1] = useState({ mobile: "" });
  const [formData2, setFormData2] = useState({ mobile: "", phoneCode: "+1" });
  const [formData3, setFormData3] = useState({ mobile: "", phoneCode: "+44" });
  const [submitStatus, setSubmitStatus] = useState(1);

  const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData1(prev => ({ ...prev, [name]: value }));
  };

  const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData2(prev => ({ ...prev, [name]: value }));
  };

  const handleInputChange3 = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData3(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (formData: any) => {
    setSubmitStatus(2); // Loading
    console.log("Form submitted with data:", formData);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus(1); // Success
      console.log("Phone number saved:", formData.mobile);
    }, 1000);
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
          <p>Simple phone number input with default settings</p>
          
          <PhoneNumberInput
            defaultValues={formData1}
            names="mobile"
            inputEvent={handleInputChange1}
          />
          
          <div className="ihub-input-result">
            <p><strong>Current Value:</strong> {formData1.mobile || "No number entered"}</p>
          </div>
        </div>

        {/* Phone Input with Country Code */}
        <div className="ihub-example-card">
          <h3>Phone Input with Country Code</h3>
          <p>Phone number input with predefined country code</p>
          
          <PhoneNumberInput
            phoneCode="+1"
            defaultValues={formData2}
            names="mobile"
            inputEvent={handleInputChange2}
          />
          
          <div className="ihub-input-result">
            <p><strong>Phone Code:</strong> {formData2.phoneCode || "+1"}</p>
            <p><strong>Mobile Number:</strong> {formData2.mobile || "No number entered"}</p>
            <p><strong>Full Number:</strong> {formData2.phoneCode || "+1"} {formData2.mobile}</p>
          </div>
        </div>

        {/* Phone Input with UK Country Code */}
        <div className="ihub-example-card">
          <h3>Phone Input with UK Country Code</h3>
          <p>Phone number input with UK (+44) country code</p>
          
          <PhoneNumberInput
            phoneCode="+44"
            defaultValues={formData3}
            names="mobile"
            inputEvent={handleInputChange3}
          />
          
          <div className="ihub-input-result">
            <p><strong>Phone Code:</strong> {formData3.phoneCode || "+44"}</p>
            <p><strong>Mobile Number:</strong> {formData3.mobile || "No number entered"}</p>
            <p><strong>Full Number:</strong> {formData3.phoneCode || "+44"} {formData3.mobile}</p>
          </div>
        </div>

        {/* Form Submission Example */}
        <div className="ihub-example-card">
          <h3>Form with Phone Number</h3>
          <p>Complete form with phone number submission</p>
          
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(formData1); }}>
            <PhoneNumberInput
              phoneCode="+1"
              defaultValues={formData1}
              names="mobile"
              inputEvent={handleInputChange1}
            />
            
            <div className="ihub-form-actions">
              <SubmitButton
                label="Submit Phone Number"
                status={submitStatus}
                className="ihub-submit-btn"
              />
            </div>
          </form>
          
          <div className="ihub-form-result">
            {formData1.mobile && (
              <p><strong>Ready to submit:</strong> +1 {formData1.mobile}</p>
            )}
          </div>
        </div>

        {/* Multiple Phone Numbers */}
        <div className="ihub-example-card">
          <h3>Multiple Phone Number Inputs</h3>
          <p>Form with multiple phone number fields</p>
          
          <div className="ihub-multiple-phones">
            <div className="ihub-phone-group">
              <h5>Primary Phone (US)</h5>
              <PhoneNumberInput
                phoneCode="+1"
                defaultValues={formData1}
                names="mobile"
                inputEvent={handleInputChange1}
              />
            </div>
            
            <div className="ihub-phone-group">
              <h5>Secondary Phone (UK)</h5>
              <PhoneNumberInput
                phoneCode="+44"
                defaultValues={formData2}
                names="mobile"
                inputEvent={handleInputChange2}
              />
            </div>
            
            <div className="ihub-phone-group">
              <h5>Emergency Phone (Default)</h5>
              <PhoneNumberInput
                defaultValues={formData3}
                names="mobile"
                inputEvent={handleInputChange3}
              />
            </div>
          </div>
          
          <div className="ihub-phones-summary">
            <h5>Phone Numbers Summary:</h5>
            <ul>
              <li>Primary: +1 {formData1.mobile || "Not set"}</li>
              <li>Secondary: +44 {formData2.mobile || "Not set"}</li>
              <li>Emergency: {formData3.mobile || "Not set"}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { PhoneNumberInput } from '@instincthub/react-ui';

const [formData, setFormData] = useState({ mobile: "" });

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

<PhoneNumberInput
  defaultValues={formData}
  names="mobile"
  inputEvent={handleInputChange}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Country Code</h3>
          <pre><code>{`<PhoneNumberInput
  phoneCode="+1"
  defaultValues={formData}
  names="mobile"
  inputEvent={handleInputChange}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Form Integration</h3>
          <pre><code>{`const [formData, setFormData] = useState({ 
  mobile: "",
  phoneCode: "+1" 
});

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

<form onSubmit={handleSubmit}>
  <PhoneNumberInput
    phoneCode={formData.phoneCode}
    defaultValues={formData}
    names="mobile"
    inputEvent={handleInputChange}
  />
  <button type="submit">Submit</button>
</form>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default PhoneNumberInputExample;