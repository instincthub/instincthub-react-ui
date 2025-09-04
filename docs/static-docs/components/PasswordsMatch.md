# PasswordsMatch

**Category:** Auth | **Type:** component

Password matching validation component with real-time validation, confirmation, and default value support

## Features

- **Real-time Validation**: Password length and matching validation as you type
- **Default Password Support**: Pre-populate password fields with existing values
- **Callback Functions**: Get notified when passwords change and their validation status
- **Visual Feedback**: Clear error states with colored borders and helper text
- **Security Features**: Password visibility toggle and secure field implementation
- **TypeScript Support**: Full type definitions and interfaces

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultPassword` | `string` | `""` | Pre-populate the password field with a default value |
| `onPasswordChange` | `(password: string, isValid: boolean) => void` | - | Callback triggered when password is validated |
| `onConfirmPasswordChange` | `(confirmPassword: string, isValid: boolean) => void` | - | Callback triggered when password confirmation is validated |

## 🏷️ Tags

`auth`, `password`, `validation`, `forms`, `default-value`, `callbacks`

## Basic Usage

### Simple Password Matching
```tsx
import { PasswordsMatch } from '@instincthub/react-ui';

function MyForm() {
  return (
    <form>
      <PasswordsMatch />
    </form>
  );
}
```

### With Default Password
```tsx
import { PasswordsMatch } from '@instincthub/react-ui';

function EditProfileForm() {
  return (
    <form>
      <PasswordsMatch 
        defaultPassword="existingPassword123"
        onPasswordChange={(password, isValid) => {
          console.log('Password:', password, 'Valid:', isValid);
        }}
        onConfirmPasswordChange={(confirmPassword, isValid) => {
          console.log('Confirm Password:', confirmPassword, 'Valid:', isValid);
        }}
      />
    </form>
  );
}
```

### With State Management
```tsx
import { PasswordsMatch } from '@instincthub/react-ui';
import { useState } from 'react';

function FormWithValidation() {
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  const handlePasswordChange = (password: string, isValid: boolean) => {
    setPasswordValid(isValid);
    setCanSubmit(isValid && confirmPasswordValid);
  };

  const handleConfirmPasswordChange = (confirmPassword: string, isValid: boolean) => {
    setConfirmPasswordValid(isValid);
    setCanSubmit(passwordValid && isValid);
  };

  return (
    <form>
      <PasswordsMatch 
        onPasswordChange={handlePasswordChange}
        onConfirmPasswordChange={handleConfirmPasswordChange}
      />
      <button type="submit" disabled={!canSubmit}>
        Submit
      </button>
    </form>
  );
}
```

## Complete Example

```tsx
"use client";
import React, { useState } from "react";
import {
  PasswordsMatch,
  InputText,
  SubmitButton,
  MultiPurposeModal,
} from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Example component demonstrating various ways to use the PasswordsMatch component
 */
const PasswordsMatchExamples = () => {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState<boolean>(false);
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] = useState<boolean>(false);
  const [isAccountSetupModalOpen, setIsAccountSetupModalOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<number>(1);

  // Registration form state
  const [registrationData, setRegistrationData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  });

  // Password change form state
  const [passwordChangeData, setPasswordChangeData] = useState({
    currentPassword: "",
  });

  // Account setup form state
  const [accountSetupData, setAccountSetupData] = useState({
    companyName: "",
    jobTitle: "",
    phoneNumber: "",
  });

  // Handle input changes for registration
  const handleRegistrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistrationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle input changes for password change
  const handlePasswordChangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordChangeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle input changes for account setup
  const handleAccountSetupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountSetupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle registration form submission
  const handleRegistrationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Registration form submitted:", {
      ...registrationData,
      // Password values would be captured from the PasswordsMatch component
    });
    openToast("Registration form submitted successfully!");
    setIsRegistrationModalOpen(false);
  };

  // Handle password change form submission
  const handlePasswordChangeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Password change form submitted:", passwordChangeData);
    openToast("Password changed successfully!");
    setIsPasswordChangeModalOpen(false);
  };

  // Handle account setup form submission
  const handleAccountSetupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Account setup form submitted:", accountSetupData);
    openToast("Account setup completed successfully!");
    setIsAccountSetupModalOpen(false);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>PasswordsMatch Component Examples</h1>

      {/* Basic Usage Example */}
      <div className="ihub-mb-5">
        <h2>Basic Password Matching</h2>
        <p>Simple password confirmation with real-time validation:</p>
        <div className="ihub-p-4" style={{ border: "1px solid #ddd", borderRadius: "8px" }}>
          <PasswordsMatch />
        </div>
      </div>

      {/* Default Password Example */}
      <div className="ihub-mb-5">
        <h2>With Default Password</h2>
        <p>Pre-populated password field with validation callbacks:</p>
        <div className="ihub-p-4" style={{ border: "1px solid #ddd", borderRadius: "8px" }}>
          <PasswordsMatch 
            defaultPassword="MySecurePass123"
            onPasswordChange={(password, isValid) => {
              console.log('Password updated:', password, 'Valid:', isValid);
            }}
            onConfirmPasswordChange={(confirmPassword, isValid) => {
              console.log('Confirm password updated:', confirmPassword, 'Valid:', isValid);
            }}
          />
        </div>
      </div>

      {/* Interactive Examples with Modals */}
      <div
        className="ihub-d-flex ihub-py-5"
        style={{ gap: "20px", flexWrap: "wrap" }}
      >
        {/* Registration Form Example */}
        <button
          className="ihub-important-btn"
          onClick={() => setIsRegistrationModalOpen(true)}
        >
          User Registration Form
        </button>

        {/* Password Change Example */}
        <button
          className="ihub-outlined-btn"
          onClick={() => setIsPasswordChangeModalOpen(true)}
        >
          Change Password Form
        </button>

        {/* Account Setup Example */}
        <button
          className="ihub-primary-btn"
          onClick={() => setIsAccountSetupModalOpen(true)}
        >
          Account Setup Form
        </button>
      </div>

      {/* Registration Modal */}
      <MultiPurposeModal
        title="Create New Account"
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        size="medium"
        showFooter={true}
        handleSubmit={handleRegistrationSubmit}
        footerContent={
          <div className="ihub-buttons">
            <button
              className="ihub-outlined-btn"
              onClick={() => setIsRegistrationModalOpen(false)}
            >
              Cancel
            </button>
            <SubmitButton label="Create Account" type="submit" status={status} />
          </div>
        }
      >
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <InputText
              label="First Name"
              id="firstName"
              name="firstName"
              type="text"
              value={registrationData.firstName}
              onChange={handleRegistrationChange}
              className="ihub-input"
              required
            />
          </div>
          <div className="ihub-col-md-6">
            <InputText
              label="Last Name"
              id="lastName"
              name="lastName"
              type="text"
              value={registrationData.lastName}
              onChange={handleRegistrationChange}
              className="ihub-input"
              required
            />
          </div>
        </div>

        <InputText
          label="Email Address"
          id="email"
          name="email"
          type="email"
          value={registrationData.email}
          onChange={handleRegistrationChange}
          className="ihub-input"
          required
        />

        <InputText
          label="Username"
          id="username"
          name="username"
          type="text"
          value={registrationData.username}
          onChange={handleRegistrationChange}
          className="ihub-input"
          required
        />

        {/* Password Matching Component */}
        <PasswordsMatch />

        <div className="ihub-mt-3">
          <small className="ihub-text-muted">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </small>
        </div>
      </MultiPurposeModal>

      {/* Password Change Modal */}
      <MultiPurposeModal
        title="Change Password"
        isOpen={isPasswordChangeModalOpen}
        onClose={() => setIsPasswordChangeModalOpen(false)}
        size="small"
        showFooter={true}
        handleSubmit={handlePasswordChangeSubmit}
        footerContent={
          <div className="ihub-buttons">
            <button
              className="ihub-outlined-btn"
              onClick={() => setIsPasswordChangeModalOpen(false)}
            >
              Cancel
            </button>
            <SubmitButton label="Update Password" type="submit" status={status} />
          </div>
        }
      >
        <InputText
          label="Current Password"
          id="currentPassword"
          name="currentPassword"
          type="password"
          value={passwordChangeData.currentPassword}
          onChange={handlePasswordChangeChange}
          className="ihub-input"
          required
        />

        {/* New Password Matching Component */}
        <div className="ihub-mt-3">
          <h5>New Password</h5>
          <PasswordsMatch />
        </div>

        <div className="ihub-mt-3">
          <small className="ihub-text-muted">
            Your new password must be different from your current password and meet our security requirements.
          </small>
        </div>
      </MultiPurposeModal>

      {/* Account Setup Modal */}
      <MultiPurposeModal
        title="Complete Your Profile"
        isOpen={isAccountSetupModalOpen}
        onClose={() => setIsAccountSetupModalOpen(false)}
        size="medium"
        showFooter={true}
        handleSubmit={handleAccountSetupSubmit}
        footerContent={
          <div className="ihub-buttons">
            <button
              className="ihub-outlined-btn"
              onClick={() => setIsAccountSetupModalOpen(false)}
            >
              Skip for Now
            </button>
            <SubmitButton label="Complete Setup" type="submit" status={status} />
          </div>
        }
      >
        <p className="ihub-mb-4">
          Complete your profile setup by providing additional information and creating a secure password.
        </p>

        <InputText
          label="Company Name"
          id="companyName"
          name="companyName"
          type="text"
          value={accountSetupData.companyName}
          onChange={handleAccountSetupChange}
          className="ihub-input"
        />

        <InputText
          label="Job Title"
          id="jobTitle"
          name="jobTitle"
          type="text"
          value={accountSetupData.jobTitle}
          onChange={handleAccountSetupChange}
          className="ihub-input"
        />

        <InputText
          label="Phone Number"
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={accountSetupData.phoneNumber}
          onChange={handleAccountSetupChange}
          className="ihub-input"
        />

        {/* Password Setup */}
        <div className="ihub-mt-4">
          <h5>Create Your Password</h5>
          <PasswordsMatch />
        </div>
      </MultiPurposeModal>

      {/* Usage Documentation */}
      <div className="ihub-mt-5">
        <h2>Component Features</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <h4>Real-time Validation</h4>
            <ul>
              <li>Password length validation (minimum 8 characters)</li>
              <li>Real-time password matching confirmation</li>
              <li>Visual feedback with border color changes</li>
              <li>Error messages for invalid inputs</li>
              <li>Cross-field validation between password fields</li>
            </ul>
          </div>
          <div className="ihub-col-md-4">
            <h4>Security Features</h4>
            <ul>
              <li>Password visibility toggle</li>
              <li>Secure password field implementation</li>
              <li>Client-side validation</li>
              <li>Helper text for user guidance</li>
              <li>Secure state management</li>
            </ul>
          </div>
          <div className="ihub-col-md-4">
            <h4>Advanced Features</h4>
            <ul>
              <li>Default password support</li>
              <li>Validation callback functions</li>
              <li>TypeScript interface exports</li>
              <li>Controlled component pattern</li>
              <li>Parent component integration</li>
            </ul>
          </div>
        </div>

        <h4 className="ihub-mt-4">Validation Rules</h4>
        <div className="ihub-alert ihub-alert-info">
          <ul className="ihub-mb-0">
            <li><strong>Password Length:</strong> Must be at least 8 characters long</li>
            <li><strong>Password Confirmation:</strong> Must exactly match the first password field</li>
            <li><strong>Real-time Feedback:</strong> Validation occurs as user types</li>
            <li><strong>Visual Indicators:</strong> Red border for invalid, default color for valid</li>
          </ul>
        </div>

        <h4 className="ihub-mt-4">Use Cases</h4>
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-h-100">
              <div className="ihub-card-body">
                <h5>User Registration</h5>
                <p>Perfect for new user sign-up forms where password confirmation is required.</p>
              </div>
            </div>
          </div>
          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-h-100">
              <div className="ihub-card-body">
                <h5>Password Reset</h5>
                <p>Ideal for password reset flows where users need to set a new password.</p>
              </div>
            </div>
          </div>
          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-h-100">
              <div className="ihub-card-body">
                <h5>Account Setup</h5>
                <p>Great for multi-step account setup processes requiring password creation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordsMatchExamples;
```

## 🔗 Related Components

- [IsUsernameEmailTaken](./IsUsernameEmailTaken.md) - Username/email availability checker
- [ClientDetector](./ClientDetector.md) - Client device detection component
- [FromInstinctHub](./FromInstinctHub.md) - From InstinctHub component
- [LoginForm](./LoginForm.md) - Login form component
- [SignUpForm](./SignUpForm.md) - Sign up form component

