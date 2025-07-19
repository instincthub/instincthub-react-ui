# PhoneNumberInput

**Category:** Forms | **Type:** component

Phone number input with international country code selection and formatting

## 🏷️ Tags

`forms`, `input`, `phone`, `international`, `validation`

```tsx
"use client";
import React, { useState } from "react";
import { PhoneNumberInput, SubmitButton } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Example component demonstrating various ways to use the PhoneNumberInput
 */
const PhoneNumberInputExamples = () => {
  // Basic phone input state
  const [basicPhone, setBasicPhone] = useState({
    mobile: "",
    phone_code: "234"
  });

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    mobile: "",
    phone_code: "1",
    message: ""
  });

  // Registration form state
  const [registrationForm, setRegistrationForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    phone_code: "44",
    password: "",
    confirmPassword: ""
  });

  // Business contact form state
  const [businessForm, setBusinessForm] = useState({
    companyName: "",
    contactPerson: "",
    businessPhone: "",
    phone_code: "61",
    alternatePhone: "",
    alternate_phone_code: "61",
    email: "",
    website: ""
  });

  // Verification form state
  const [verificationForm, setVerificationForm] = useState({
    mobile: "",
    phone_code: "91",
    verificationCode: "",
    isVerified: false
  });

  const [submitStatus, setSubmitStatus] = useState(1);

  // Handle input changes for different forms
  const handleBasicPhoneChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBasicPhone(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegistrationFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegistrationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBusinessFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBusinessForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVerificationFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setVerificationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit handlers
  const handleBasicSubmit = () => {
    console.log("Basic phone data:", basicPhone);
    openToast(`Phone number submitted: +${basicPhone.phone_code} ${basicPhone.mobile}`);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(2);
    
    setTimeout(() => {
      console.log("Contact form data:", contactForm);
      openToast("Contact form submitted successfully!");
      setSubmitStatus(1);
    }, 2000);
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(2);
    
    setTimeout(() => {
      console.log("Registration form data:", registrationForm);
      openToast("Registration submitted successfully!");
      setSubmitStatus(1);
    }, 2000);
  };

  const handleBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(2);
    
    setTimeout(() => {
      console.log("Business form data:", businessForm);
      openToast("Business contact submitted successfully!");
      setSubmitStatus(1);
    }, 2000);
  };

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(2);
    
    setTimeout(() => {
      console.log("Verification data:", verificationForm);
      setVerificationForm(prev => ({ ...prev, isVerified: true }));
      openToast("Phone number verified successfully!");
      setSubmitStatus(1);
    }, 2000);
  };

  const sendVerificationCode = () => {
    if (!verificationForm.mobile) {
      openToast("Please enter a phone number first");
      return;
    }
    openToast(`Verification code sent to +${verificationForm.phone_code} ${verificationForm.mobile}`);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>PhoneNumberInput Examples</h1>

      {/* Basic Phone Number Input */}
      <section className="ihub-mb-5">
        <h2>1. Basic Phone Number Input</h2>
        <p>Simple phone number input with default country code (Nigeria +234)</p>
        
        <div className="ihub-card ihub-p-4">
          <h3>Basic Usage</h3>
          <PhoneNumberInput
            phoneCode="234"
            defaultValues={{ mobile: basicPhone.mobile }}
            names="mobile"
            inputEvent={handleBasicPhoneChange}
          />
          
          <div className="ihub-mt-3">
            <button 
              className="ihub-primary-btn"
              onClick={handleBasicSubmit}
              disabled={!basicPhone.mobile}
            >
              Submit Phone Number
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="ihub-mb-5">
        <h2>2. Contact Form with Phone Input</h2>
        <p>Complete contact form with international phone number support</p>
        
        <div className="ihub-card ihub-p-4">
          <form onSubmit={handleContactSubmit}>
            <div className="ihub-row">
              <div className="ihub-col-md-6">
                <label htmlFor="contact-name" className="ihub-form-label">
                  Full Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactFormChange}
                  className="ihub-input"
                  required
                />
              </div>
              
              <div className="ihub-col-md-6">
                <label htmlFor="contact-email" className="ihub-form-label">
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactFormChange}
                  className="ihub-input"
                  required
                />
              </div>
            </div>

            <div className="ihub-mt-3">
              <label className="ihub-form-label">Phone Number *</label>
              <PhoneNumberInput
                phoneCode="1"
                defaultValues={{ mobile: contactForm.mobile }}
                names="mobile"
                inputEvent={handleContactFormChange}
              />
            </div>

            <div className="ihub-mt-3">
              <label htmlFor="contact-message" className="ihub-form-label">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={contactForm.message}
                onChange={handleContactFormChange}
                className="ihub-input"
                rows={4}
                placeholder="Your message here..."
              />
            </div>

            <div className="ihub-mt-4">
              <SubmitButton
                type="submit"
                label="Send Message"
                status={submitStatus}
                disabled={!contactForm.name || !contactForm.email || !contactForm.mobile}
              />
            </div>
          </form>
        </div>
      </section>

      {/* User Registration Form */}
      <section className="ihub-mb-5">
        <h2>3. User Registration Form</h2>
        <p>Registration form with phone number validation for account creation</p>
        
        <div className="ihub-card ihub-p-4">
          <form onSubmit={handleRegistrationSubmit}>
            <div className="ihub-row">
              <div className="ihub-col-md-6">
                <label htmlFor="reg-firstName" className="ihub-form-label">
                  First Name *
                </label>
                <input
                  id="reg-firstName"
                  type="text"
                  name="firstName"
                  value={registrationForm.firstName}
                  onChange={handleRegistrationFormChange}
                  className="ihub-input"
                  required
                />
              </div>
              
              <div className="ihub-col-md-6">
                <label htmlFor="reg-lastName" className="ihub-form-label">
                  Last Name *
                </label>
                <input
                  id="reg-lastName"
                  type="text"
                  name="lastName"
                  value={registrationForm.lastName}
                  onChange={handleRegistrationFormChange}
                  className="ihub-input"
                  required
                />
              </div>
            </div>

            <div className="ihub-mt-3">
              <label htmlFor="reg-email" className="ihub-form-label">
                Email Address *
              </label>
              <input
                id="reg-email"
                type="email"
                name="email"
                value={registrationForm.email}
                onChange={handleRegistrationFormChange}
                className="ihub-input"
                required
              />
            </div>

            <div className="ihub-mt-3">
              <label className="ihub-form-label">Mobile Number * (UK +44)</label>
              <PhoneNumberInput
                phoneCode="44"
                defaultValues={{ mobile: registrationForm.mobile }}
                names="mobile"
                inputEvent={handleRegistrationFormChange}
              />
              <small className="ihub-text-muted">
                We'll use this number for account verification and important notifications
              </small>
            </div>

            <div className="ihub-row ihub-mt-3">
              <div className="ihub-col-md-6">
                <label htmlFor="reg-password" className="ihub-form-label">
                  Password *
                </label>
                <input
                  id="reg-password"
                  type="password"
                  name="password"
                  value={registrationForm.password}
                  onChange={handleRegistrationFormChange}
                  className="ihub-input"
                  required
                />
              </div>
              
              <div className="ihub-col-md-6">
                <label htmlFor="reg-confirmPassword" className="ihub-form-label">
                  Confirm Password *
                </label>
                <input
                  id="reg-confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={registrationForm.confirmPassword}
                  onChange={handleRegistrationFormChange}
                  className="ihub-input"
                  required
                />
              </div>
            </div>

            <div className="ihub-mt-4">
              <SubmitButton
                type="submit"
                label="Create Account"
                status={submitStatus}
                disabled={
                  !registrationForm.firstName || 
                  !registrationForm.lastName || 
                  !registrationForm.email || 
                  !registrationForm.mobile ||
                  !registrationForm.password ||
                  registrationForm.password !== registrationForm.confirmPassword
                }
              />
            </div>
          </form>
        </div>
      </section>

      {/* Business Contact Form */}
      <section className="ihub-mb-5">
        <h2>4. Business Contact Form</h2>
        <p>Business form with multiple phone numbers for different purposes</p>
        
        <div className="ihub-card ihub-p-4">
          <form onSubmit={handleBusinessSubmit}>
            <div className="ihub-row">
              <div className="ihub-col-md-6">
                <label htmlFor="business-company" className="ihub-form-label">
                  Company Name *
                </label>
                <input
                  id="business-company"
                  type="text"
                  name="companyName"
                  value={businessForm.companyName}
                  onChange={handleBusinessFormChange}
                  className="ihub-input"
                  required
                />
              </div>
              
              <div className="ihub-col-md-6">
                <label htmlFor="business-contact" className="ihub-form-label">
                  Contact Person *
                </label>
                <input
                  id="business-contact"
                  type="text"
                  name="contactPerson"
                  value={businessForm.contactPerson}
                  onChange={handleBusinessFormChange}
                  className="ihub-input"
                  required
                />
              </div>
            </div>

            <div className="ihub-mt-3">
              <label className="ihub-form-label">Primary Business Phone * (Australia +61)</label>
              <PhoneNumberInput
                phoneCode="61"
                defaultValues={{ mobile: businessForm.businessPhone }}
                names="businessPhone"
                inputEvent={handleBusinessFormChange}
              />
            </div>

            <div className="ihub-mt-3">
              <label className="ihub-form-label">Alternate Phone Number</label>
              <PhoneNumberInput
                phoneCode="61"
                defaultValues={{ mobile: businessForm.alternatePhone }}
                names="alternatePhone"
                inputEvent={handleBusinessFormChange}
              />
              <small className="ihub-text-muted">
                Optional secondary contact number
              </small>
            </div>

            <div className="ihub-row ihub-mt-3">
              <div className="ihub-col-md-6">
                <label htmlFor="business-email" className="ihub-form-label">
                  Business Email *
                </label>
                <input
                  id="business-email"
                  type="email"
                  name="email"
                  value={businessForm.email}
                  onChange={handleBusinessFormChange}
                  className="ihub-input"
                  required
                />
              </div>
              
              <div className="ihub-col-md-6">
                <label htmlFor="business-website" className="ihub-form-label">
                  Website
                </label>
                <input
                  id="business-website"
                  type="url"
                  name="website"
                  value={businessForm.website}
                  onChange={handleBusinessFormChange}
                  className="ihub-input"
                  placeholder="https://www.example.com"
                />
              </div>
            </div>

            <div className="ihub-mt-4">
              <SubmitButton
                type="submit"
                label="Submit Business Information"
                status={submitStatus}
                disabled={
                  !businessForm.companyName || 
                  !businessForm.contactPerson || 
                  !businessForm.businessPhone || 
                  !businessForm.email
                }
              />
            </div>
          </form>
        </div>
      </section>

      {/* Phone Verification */}
      <section className="ihub-mb-5">
        <h2>5. Phone Number Verification</h2>
        <p>Two-step phone verification process with OTP</p>
        
        <div className="ihub-card ihub-p-4">
          <form onSubmit={handleVerificationSubmit}>
            <div className="ihub-mt-3">
              <label className="ihub-form-label">Phone Number to Verify * (India +91)</label>
              <PhoneNumberInput
                phoneCode="91"
                defaultValues={{ mobile: verificationForm.mobile }}
                names="mobile"
                inputEvent={handleVerificationFormChange}
              />
            </div>

            <div className="ihub-mt-3">
              <button
                type="button"
                className="ihub-outlined-btn"
                onClick={sendVerificationCode}
                disabled={!verificationForm.mobile}
              >
                Send Verification Code
              </button>
            </div>

            <div className="ihub-mt-3">
              <label htmlFor="verification-code" className="ihub-form-label">
                Verification Code
              </label>
              <input
                id="verification-code"
                type="text"
                name="verificationCode"
                value={verificationForm.verificationCode}
                onChange={handleVerificationFormChange}
                className="ihub-input"
                placeholder="Enter 6-digit code"
                maxLength={6}
              />
            </div>

            {verificationForm.isVerified && (
              <div className="ihub-alert ihub-alert-success ihub-mt-3">
                ✅ Phone number verified successfully!
              </div>
            )}

            <div className="ihub-mt-4">
              <SubmitButton
                type="submit"
                label="Verify Phone Number"
                status={submitStatus}
                disabled={!verificationForm.mobile || !verificationForm.verificationCode}
              />
            </div>
          </form>
        </div>
      </section>

      {/* International Examples */}
      <section className="ihub-mb-5">
        <h2>6. International Phone Numbers</h2>
        <p>Examples with different default country codes</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-p-3">
              <h4>United States (+1)</h4>
              <PhoneNumberInput
                phoneCode="1"
                defaultValues={{ mobile: "" }}
                names="us_phone"
                inputEvent={() => {}}
              />
            </div>
          </div>
          
          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-p-3">
              <h4>United Kingdom (+44)</h4>
              <PhoneNumberInput
                phoneCode="44"
                defaultValues={{ mobile: "" }}
                names="uk_phone"
                inputEvent={() => {}}
              />
            </div>
          </div>
          
          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-p-3">
              <h4>Germany (+49)</h4>
              <PhoneNumberInput
                phoneCode="49"
                defaultValues={{ mobile: "" }}
                names="de_phone"
                inputEvent={() => {}}
              />
            </div>
          </div>
        </div>

        <div className="ihub-row ihub-mt-3">
          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-p-3">
              <h4>Canada (+1)</h4>
              <PhoneNumberInput
                phoneCode="1"
                defaultValues={{ mobile: "" }}
                names="ca_phone"
                inputEvent={() => {}}
              />
            </div>
          </div>
          
          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-p-3">
              <h4>Japan (+81)</h4>
              <PhoneNumberInput
                phoneCode="81"
                defaultValues={{ mobile: "" }}
                names="jp_phone"
                inputEvent={() => {}}
              />
            </div>
          </div>
          
          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-p-3">
              <h4>Brazil (+55)</h4>
              <PhoneNumberInput
                phoneCode="55"
                defaultValues={{ mobile: "" }}
                names="br_phone"
                inputEvent={() => {}}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pre-filled Example */}
      <section className="ihub-mb-5">
        <h2>7. Pre-filled Phone Number</h2>
        <p>Phone input with existing data for editing</p>
        
        <div className="ihub-card ihub-p-4">
          <h4>Edit Profile Phone Number</h4>
          <PhoneNumberInput
            phoneCode="234"
            defaultValues={{ mobile: "8012345678" }}
            names="profile_phone"
            inputEvent={(e) => console.log("Profile phone changed:", e.target.value)}
          />
          
          <div className="ihub-mt-3">
            <button className="ihub-success-btn">
              Update Phone Number
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PhoneNumberInputExamples;
```

## 📋 Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `phoneCode` | `string` | `"234"` | Default country phone code |
| `defaultValues` | `{ mobile?: string, [key: string]: any }` | `{}` | Default values including mobile number |
| `names` | `string` | - | Name attribute for the phone input field |
| `inputEvent` | `(event: React.ChangeEvent<HTMLInputElement \| HTMLSelectElement>) => void` | - | Callback function for input change events |

## 🎨 Features

- **International Support**: Country selection with flags and phone codes
- **Real-time Formatting**: Displays formatted phone number as you type
- **Validation Ready**: Easy integration with form validation
- **Customizable**: Configurable default country and values
- **Responsive Design**: Works on all screen sizes
- **Accessibility**: Proper labels and semantic HTML

## 💡 Usage Tips

### Form Integration
```tsx
const [formData, setFormData] = useState({
  mobile: "",
  phone_code: "1"
});

const handlePhoneChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

<PhoneNumberInput
  phoneCode={formData.phone_code}
  defaultValues={{ mobile: formData.mobile }}
  names="mobile"
  inputEvent={handlePhoneChange}
/>
```

### Validation Example
```tsx
const validatePhoneNumber = (phone, countryCode) => {
  // Basic validation - you can implement more sophisticated validation
  const phoneRegex = /^\d{7,15}$/;
  return phoneRegex.test(phone);
};

const isValid = validatePhoneNumber(phoneNumber, selectedCountryCode);
```

### Common Country Codes
- **United States/Canada**: `"1"`
- **United Kingdom**: `"44"`
- **Nigeria**: `"234"`
- **India**: `"91"`
- **Germany**: `"49"`
- **Australia**: `"61"`
- **Japan**: `"81"`
- **Brazil**: `"55"`

## 🔗 Related Components

- [InputText](./InputText.md) - Basic text input field
- [InputNumber](./InputNumber.md) - Numeric input field
- [CountryInput](./CountryInput.md) - Country selection input
- [TextField](./TextField.md) - Enhanced text field with validation
- [SubmitButton](./SubmitButton.md) - Form submission button

