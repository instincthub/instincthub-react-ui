# IsUsernameEmailTaken

**Category:** Auth | **Type:** component

Real-time username and email validation component with availability checking

## 🏷️ Tags

`auth`, `validation`, `forms`, `username`, `email`, `availability`

```tsx
"use client";
import React, { useState } from "react";
import {
  IsUsernameEmailTaken,
  InputText,
  SubmitButton,
  PasswordField,
  openToast,
} from "@instincthub/react-ui";

/**
 * Comprehensive examples demonstrating IsUsernameEmailTaken usage patterns
 */
const IsUsernameEmailTakenExamples = () => {
  const [registrationData, setRegistrationData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [profileData, setProfileData] = useState({
    displayName: "",
    bio: "",
  });
  const [businessData, setBusinessData] = useState({
    companyName: "",
    industry: "",
  });

  // Handle form submission
  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration form submitted:", registrationData);
    openToast("Registration form submitted successfully!");
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile form submitted:", profileData);
    openToast("Profile updated successfully!");
  };

  const handleBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Business registration submitted:", businessData);
    openToast("Business registration submitted!");
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>IsUsernameEmailTaken Examples</h1>

      {/* Basic User Registration Form */}
      <div className="ihub-mb-5">
        <h2>1. Basic User Registration Form</h2>
        <p>Standard registration form with username and email validation</p>
        
        <form onSubmit={handleRegistrationSubmit} className="ihub-form">
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <InputText
                label="First Name"
                name="firstName"
                value={registrationData.firstName}
                onChange={(e) =>
                  setRegistrationData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                required
                className="ihub-mb-3"
              />
            </div>
            <div className="ihub-col-md-6">
              <InputText
                label="Last Name"
                name="lastName"
                value={registrationData.lastName}
                onChange={(e) =>
                  setRegistrationData((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
                required
                className="ihub-mb-3"
              />
            </div>
          </div>

          {/* Username validation */}
          <IsUsernameEmailTaken
            names="username"
            types="text"
            labels="Choose a Username"
            requireds={true}
            keys="registration-username"
          />

          {/* Email validation */}
          <IsUsernameEmailTaken
            names="email"
            types="email"
            labels="Email Address"
            requireds={true}
            keys="registration-email"
          />

          <PasswordField
            label="Password"
            name="password"
            value={registrationData.password}
            onChange={(e) =>
              setRegistrationData((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            required
            className="ihub-mb-3"
          />

          <PasswordField
            label="Confirm Password"
            name="confirmPassword"
            value={registrationData.confirmPassword}
            onChange={(e) =>
              setRegistrationData((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            required
            className="ihub-mb-3"
          />

          <SubmitButton
            id="SubmitBtn"
            label="Create Account"
            type="submit"
            className="ihub-primary-btn"
          />
        </form>
      </div>

      {/* Profile Setup Form */}
      <div className="ihub-mb-5">
        <h2>2. Profile Setup Form</h2>
        <p>Profile creation with username validation for existing users</p>
        
        <form onSubmit={handleProfileSubmit} className="ihub-form">
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              {/* Display Name (Username) validation */}
              <IsUsernameEmailTaken
                names="username"
                types="text"
                labels="Display Name (Public Username)"
                requireds={true}
                keys="profile-username"
              />
            </div>
            <div className="ihub-col-md-6">
              {/* Alternative Email validation */}
              <IsUsernameEmailTaken
                names="email"
                types="email"
                labels="Alternative Email (Optional)"
                requireds={false}
                keys="profile-alt-email"
              />
            </div>
          </div>

          <InputText
            label="Display Name"
            name="displayName"
            value={profileData.displayName}
            onChange={(e) =>
              setProfileData((prev) => ({
                ...prev,
                displayName: e.target.value,
              }))
            }
            className="ihub-mb-3"
          />

          <InputText
            label="Bio"
            name="bio"
            value={profileData.bio}
            onChange={(e) =>
              setProfileData((prev) => ({
                ...prev,
                bio: e.target.value,
              }))
            }
            className="ihub-mb-3"
          />

          <SubmitButton
            id="SubmitBtn"
            label="Update Profile"
            type="submit"
            className="ihub-primary-btn"
          />
        </form>
      </div>

      {/* Business Registration Form */}
      <div className="ihub-mb-5">
        <h2>3. Business Registration Form</h2>
        <p>Business account creation with company email validation</p>
        
        <form onSubmit={handleBusinessSubmit} className="ihub-form">
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <InputText
                label="Company Name"
                name="companyName"
                value={businessData.companyName}
                onChange={(e) =>
                  setBusinessData((prev) => ({
                    ...prev,
                    companyName: e.target.value,
                  }))
                }
                required
                className="ihub-mb-3"
              />
            </div>
            <div className="ihub-col-md-6">
              <InputText
                label="Industry"
                name="industry"
                value={businessData.industry}
                onChange={(e) =>
                  setBusinessData((prev) => ({
                    ...prev,
                    industry: e.target.value,
                  }))
                }
                className="ihub-mb-3"
              />
            </div>
          </div>

          {/* Business Username validation */}
          <IsUsernameEmailTaken
            names="username"
            types="text"
            labels="Company Username"
            requireds={true}
            keys="business-username"
          />

          {/* Business Email validation */}
          <IsUsernameEmailTaken
            names="email"
            types="email"
            labels="Business Email Address"
            requireds={true}
            keys="business-email"
          />

          <SubmitButton
            id="SubmitBtn"
            label="Register Business"
            type="submit"
            className="ihub-primary-btn"
          />
        </form>
      </div>

      {/* Multi-step Registration Wizard */}
      <div className="ihub-mb-5">
        <h2>4. Multi-step Registration Wizard</h2>
        <p>Step-by-step registration process with validation at each step</p>
        
        <div className="ihub-wizard">
          {/* Step 1: Basic Information */}
          <div className="ihub-wizard-step">
            <h3>Step 1: Basic Information</h3>
            <form className="ihub-form">
              <div className="ihub-row">
                <div className="ihub-col-md-6">
                  <InputText
                    label="First Name"
                    name="firstName"
                    required
                    className="ihub-mb-3"
                  />
                </div>
                <div className="ihub-col-md-6">
                  <InputText
                    label="Last Name"
                    name="lastName"
                    required
                    className="ihub-mb-3"
                  />
                </div>
              </div>

              {/* Step 1 Username validation */}
              <IsUsernameEmailTaken
                names="username"
                types="text"
                labels="Choose Your Username"
                requireds={true}
                keys="wizard-step1-username"
              />

              <button type="button" className="ihub-primary-btn">
                Next Step
              </button>
            </form>
          </div>

          {/* Step 2: Contact Information */}
          <div className="ihub-wizard-step ihub-mt-4">
            <h3>Step 2: Contact Information</h3>
            <form className="ihub-form">
              {/* Step 2 Email validation */}
              <IsUsernameEmailTaken
                names="email"
                types="email"
                labels="Primary Email Address"
                requireds={true}
                keys="wizard-step2-email"
              />

              <InputText
                label="Phone Number"
                name="phone"
                type="tel"
                className="ihub-mb-3"
              />

              <div className="ihub-buttons">
                <button type="button" className="ihub-outlined-btn">
                  Previous
                </button>
                <button type="button" className="ihub-primary-btn">
                  Next Step
                </button>
              </div>
            </form>
          </div>

          {/* Step 3: Security */}
          <div className="ihub-wizard-step ihub-mt-4">
            <h3>Step 3: Security</h3>
            <form className="ihub-form">
              <PasswordField
                label="Create Password"
                name="password"
                required
                className="ihub-mb-3"
              />

              <PasswordField
                label="Confirm Password"
                name="confirmPassword"
                required
                className="ihub-mb-3"
              />

              <div className="ihub-buttons">
                <button type="button" className="ihub-outlined-btn">
                  Previous
                </button>
                <SubmitButton
                  id="SubmitBtn"
                  label="Complete Registration"
                  type="submit"
                  className="ihub-primary-btn"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Social Media Platform Registration */}
      <div className="ihub-mb-5">
        <h2>5. Social Media Platform Registration</h2>
        <p>Social platform with handle and email validation</p>
        
        <form className="ihub-form">
          <div className="ihub-card">
            <h4>Create Your Profile</h4>
            
            {/* Social Handle validation */}
            <IsUsernameEmailTaken
              names="username"
              types="text"
              labels="Your Handle (@username)"
              requireds={true}
              keys="social-handle"
            />

            {/* Email validation */}
            <IsUsernameEmailTaken
              names="email"
              types="email"
              labels="Email Address"
              requireds={true}
              keys="social-email"
            />

            <InputText
              label="Display Name"
              name="displayName"
              placeholder="How you want to be known"
              className="ihub-mb-3"
            />

            <textarea
              className="ihub-textarea"
              placeholder="Tell us about yourself..."
              rows={3}
            />

            <SubmitButton
              id="SubmitBtn"
              label="Join the Community"
              type="submit"
              className="ihub-primary-btn ihub-mt-3"
            />
          </div>
        </form>
      </div>

      {/* Professional Network Registration */}
      <div className="ihub-mb-5">
        <h2>6. Professional Network Registration</h2>
        <p>Professional networking platform with professional email validation</p>
        
        <form className="ihub-form">
          <div className="ihub-card">
            <h4>Professional Profile Setup</h4>
            
            <div className="ihub-row">
              <div className="ihub-col-md-6">
                <InputText
                  label="First Name"
                  name="firstName"
                  required
                  className="ihub-mb-3"
                />
              </div>
              <div className="ihub-col-md-6">
                <InputText
                  label="Last Name"
                  name="lastName"
                  required
                  className="ihub-mb-3"
                />
              </div>
            </div>

            {/* Professional Username validation */}
            <IsUsernameEmailTaken
              names="username"
              types="text"
              labels="Professional Username"
              requireds={true}
              keys="professional-username"
            />

            {/* Professional Email validation */}
            <IsUsernameEmailTaken
              names="email"
              types="email"
              labels="Professional Email"
              requireds={true}
              keys="professional-email"
            />

            <InputText
              label="Job Title"
              name="jobTitle"
              placeholder="e.g., Software Engineer, Marketing Manager"
              className="ihub-mb-3"
            />

            <InputText
              label="Company"
              name="company"
              placeholder="Current company or organization"
              className="ihub-mb-3"
            />

            <SubmitButton
              id="SubmitBtn"
              label="Create Professional Profile"
              type="submit"
              className="ihub-primary-btn"
            />
          </div>
        </form>
      </div>

      {/* Developer Platform Registration */}
      <div className="ihub-mb-5">
        <h2>7. Developer Platform Registration</h2>
        <p>Developer-focused registration with GitHub-style username validation</p>
        
        <form className="ihub-form">
          <div className="ihub-card">
            <h4>Developer Account Setup</h4>
            
            {/* Developer Username validation */}
            <IsUsernameEmailTaken
              names="username"
              types="text"
              labels="Developer Username"
              requireds={true}
              keys="developer-username"
            />

            {/* Developer Email validation */}
            <IsUsernameEmailTaken
              names="email"
              types="email"
              labels="Developer Email"
              requireds={true}
              keys="developer-email"
            />

            <InputText
              label="Display Name"
              name="displayName"
              placeholder="Your public display name"
              className="ihub-mb-3"
            />

            <textarea
              className="ihub-textarea"
              placeholder="Brief bio about your development background..."
              rows={3}
            />

            <div className="ihub-form-group">
              <label className="ihub-checkbox">
                <input type="checkbox" required />
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>

            <SubmitButton
              id="SubmitBtn"
              label="Join Developer Community"
              type="submit"
              className="ihub-primary-btn"
            />
          </div>
        </form>
      </div>

      {/* Educational Platform Registration */}
      <div className="ihub-mb-5">
        <h2>8. Educational Platform Registration</h2>
        <p>Student/educator registration with academic email validation</p>
        
        <form className="ihub-form">
          <div className="ihub-card">
            <h4>Academic Profile Setup</h4>
            
            <div className="ihub-form-group">
              <label className="ihub-label">Account Type</label>
              <div className="ihub-radio-group">
                <label className="ihub-radio">
                  <input type="radio" name="accountType" value="student" />
                  Student
                </label>
                <label className="ihub-radio">
                  <input type="radio" name="accountType" value="educator" />
                  Educator
                </label>
                <label className="ihub-radio">
                  <input type="radio" name="accountType" value="institution" />
                  Institution
                </label>
              </div>
            </div>

            {/* Academic Username validation */}
            <IsUsernameEmailTaken
              names="username"
              types="text"
              labels="Academic Username"
              requireds={true}
              keys="academic-username"
            />

            {/* Academic Email validation */}
            <IsUsernameEmailTaken
              names="email"
              types="email"
              labels="Academic Email Address"
              requireds={true}
              keys="academic-email"
            />

            <InputText
              label="Institution"
              name="institution"
              placeholder="University, School, or Organization"
              className="ihub-mb-3"
            />

            <InputText
              label="Field of Study"
              name="fieldOfStudy"
              placeholder="e.g., Computer Science, Mathematics"
              className="ihub-mb-3"
            />

            <SubmitButton
              id="SubmitBtn"
              label="Join Academic Community"
              type="submit"
              className="ihub-primary-btn"
            />
          </div>
        </form>
      </div>

      {/* Validation Status Demo */}
      <div className="ihub-mb-5">
        <h2>9. Validation Status Demonstration</h2>
        <p>See how validation states look in different scenarios</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <h4>Valid Username</h4>
            <IsUsernameEmailTaken
              names="username"
              types="text"
              labels="Available Username"
              requireds={true}
              keys="demo-valid-username"
            />
          </div>
          <div className="ihub-col-md-6">
            <h4>Valid Email</h4>
            <IsUsernameEmailTaken
              names="email"
              types="email"
              labels="Available Email"
              requireds={true}
              keys="demo-valid-email"
            />
          </div>
        </div>

        <div className="ihub-row ihub-mt-4">
          <div className="ihub-col-md-12">
            <div className="ihub-card">
              <h4>Validation Guidelines:</h4>
              <ul>
                <li><strong>Username:</strong> Must contain only alphanumeric characters</li>
                <li><strong>Email:</strong> Must be a valid email format</li>
                <li><strong>Availability:</strong> Must not be already taken by another user</li>
                <li><strong>Real-time:</strong> Validation occurs as you type</li>
                <li><strong>Submit Button:</strong> Automatically disabled until all validations pass</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* API Integration Notes */}
      <div className="ihub-mb-5">
        <h2>API Integration Information</h2>
        <div className="ihub-card">
          <h4>Backend Requirements:</h4>
          <p>The component expects an API endpoint at:</p>
          <code>POST {API_HOST_URL}auth/username_email_available/</code>
          
          <h4>Request Format:</h4>
          <pre className="ihub-code-block">
{`{
  "field": "username" | "email",
  "field_value": "user_input_value"
}`}
          </pre>
          
          <h4>Expected Response:</h4>
          <pre className="ihub-code-block">
{`{
  "message": "Username is available" | "Email is available" | "Already taken"
}`}
          </pre>
          
          <h4>Integration Notes:</h4>
          <ul>
            <li>Component automatically manages submit button state</li>
            <li>Validation messages are displayed in real-time</li>
            <li>Invalid fields get the <code>ihub-is_invalid</code> CSS class</li>
            <li>Submit button with ID <code>#SubmitBtn</code> is auto-managed</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IsUsernameEmailTakenExamples;
```

## 🔗 Related Components

- [LoginForm](./LoginForm.md) - Login form component
- [PasswordsMatch](./PasswordsMatch.md) - Password matching validation component
- [TextField](./TextField.md) - Text field component
- [InputText](./InputText.md) - Text input component
- [SubmitButton](./SubmitButton.md) - Submit button component