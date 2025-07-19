# PasswordField

**Category:** Forms | **Type:** component

Secure password input field with visibility toggle and validation support

## 🏷️ Tags

`forms`, `input`, `form`, `password`, `security`

```tsx
"use client";
import React, { useState } from "react";
import {
  PasswordField,
  InputText,
  SubmitButton,
} from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Example component demonstrating various ways to use the PasswordField
 */
const PasswordFieldExamples = () => {
  // Basic password field state
  const [basicPassword, setBasicPassword] = useState<string>("");
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  
  // Registration form state
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  // Change password form state
  const [changePasswordData, setChangePasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Form submission status
  const [loginStatus, setLoginStatus] = useState<number>(1);
  const [registerStatus, setRegisterStatus] = useState<number>(1);
  const [changePasswordStatus, setChangePasswordStatus] = useState<number>(1);

  // Validation errors
  const [loginErrors, setLoginErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  
  const [registerErrors, setRegisterErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const [changePasswordErrors, setChangePasswordErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
  }>({});

  // Password strength checker
  const checkPasswordStrength = (password: string) => {
    const strength = {
      score: 0,
      feedback: [] as string[],
    };

    if (password.length >= 8) strength.score += 1;
    else strength.feedback.push("At least 8 characters");

    if (/[A-Z]/.test(password)) strength.score += 1;
    else strength.feedback.push("Include uppercase letter");

    if (/[a-z]/.test(password)) strength.score += 1;
    else strength.feedback.push("Include lowercase letter");

    if (/\d/.test(password)) strength.score += 1;
    else strength.feedback.push("Include number");

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength.score += 1;
    else strength.feedback.push("Include special character");

    return strength;
  };

  // Validation functions
  const validateEmail = (email: string): string | null => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email";
    return null;
  };

  const validatePassword = (password: string, minLength = 6): string | null => {
    if (!password) return "Password is required";
    if (password.length < minLength) return `Password must be at least ${minLength} characters`;
    return null;
  };

  const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
    if (!confirmPassword) return "Please confirm your password";
    if (password !== confirmPassword) return "Passwords do not match";
    return null;
  };

  // Handle input changes
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation errors when user starts typing
    if (loginErrors[name as keyof typeof loginErrors]) {
      setLoginErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation errors when user starts typing
    if (registerErrors[name as keyof typeof registerErrors]) {
      setRegisterErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleChangePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangePasswordData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation errors when user starts typing
    if (changePasswordErrors[name as keyof typeof changePasswordErrors]) {
      setChangePasswordErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Form submission handlers
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const errors: typeof loginErrors = {};
    
    // Validate fields
    const emailError = validateEmail(loginData.email);
    if (emailError) errors.email = emailError;
    
    const passwordError = validatePassword(loginData.password);
    if (passwordError) errors.password = passwordError;
    
    setLoginErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setLoginStatus(0); // Loading
      
      // Simulate API call
      setTimeout(() => {
        setLoginStatus(1); // Success
        openToast("Login successful! (This is a demo)", 200);
        console.log("Login data:", loginData);
      }, 2000);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const errors: typeof registerErrors = {};
    
    // Validate fields
    const emailError = validateEmail(registerData.email);
    if (emailError) errors.email = emailError;
    
    const passwordError = validatePassword(registerData.password, 8);
    if (passwordError) errors.password = passwordError;
    
    const confirmPasswordError = validateConfirmPassword(registerData.password, registerData.confirmPassword);
    if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
    
    setRegisterErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setRegisterStatus(0); // Loading
      
      // Simulate API call
      setTimeout(() => {
        setRegisterStatus(1); // Success
        openToast("Registration successful! (This is a demo)", 200);
        console.log("Registration data:", registerData);
      }, 2000);
    }
  };

  const handleChangePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const errors: typeof changePasswordErrors = {};
    
    // Validate fields
    const currentPasswordError = validatePassword(changePasswordData.currentPassword);
    if (currentPasswordError) errors.currentPassword = currentPasswordError;
    
    const newPasswordError = validatePassword(changePasswordData.newPassword, 8);
    if (newPasswordError) errors.newPassword = newPasswordError;
    
    const confirmNewPasswordError = validateConfirmPassword(
      changePasswordData.newPassword, 
      changePasswordData.confirmNewPassword
    );
    if (confirmNewPasswordError) errors.confirmNewPassword = confirmNewPasswordError;
    
    // Check if new password is different from current
    if (changePasswordData.currentPassword === changePasswordData.newPassword) {
      errors.newPassword = "New password must be different from current password";
    }
    
    setChangePasswordErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setChangePasswordStatus(0); // Loading
      
      // Simulate API call
      setTimeout(() => {
        setChangePasswordStatus(1); // Success
        openToast("Password changed successfully! (This is a demo)", 200);
        console.log("Change password data:", changePasswordData);
      }, 2000);
    }
  };

  // Calculate password strength for display
  const passwordStrength = checkPasswordStrength(registerData.password);
  const newPasswordStrength = checkPasswordStrength(changePasswordData.newPassword);

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>PasswordField Examples</h1>
      
      <div className="ihub-row">
        {/* Basic Password Field */}
        <div className="ihub-col-md-6 ihub-mb-5">
          <h2>Basic Password Field</h2>
          <p>Simple password input with visibility toggle functionality.</p>
          
          <PasswordField
            label="Basic Password"
            name="basicPassword"
            value={basicPassword}
            setValue={setBasicPassword}
            helperText="Click the eye icon to toggle password visibility"
            className="ihub-input"
          />
          
          {basicPassword && (
            <div className="ihub-mt-2">
              <small className="ihub-text-muted">
                Current value: {basicPassword}
              </small>
            </div>
          )}
        </div>

        {/* Login Form */}
        <div className="ihub-col-md-6 ihub-mb-5">
          <h2>Login Form Example</h2>
          <p>Password field integrated in a login form with validation.</p>
          
          <form onSubmit={handleLoginSubmit}>
            <InputText
              label="Email Address"
              name="email"
              type="email"
              value={loginData.email}
              onChange={handleLoginChange}
              error={loginErrors.email}
              required
              className="ihub-input"
            />

            <PasswordField
              label="Password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              error={loginErrors.password}
              required
              helperText="Enter your account password"
              className="ihub-input"
            />

            <div className="ihub-mt-3">
              <SubmitButton
                label="Sign In"
                type="submit"
                status={loginStatus}
              />
            </div>
          </form>
        </div>
      </div>

      <div className="ihub-row">
        {/* Registration Form */}
        <div className="ihub-col-md-6 ihub-mb-5">
          <h2>Registration Form with Password Confirmation</h2>
          <p>Password fields with strength indicator and confirmation matching.</p>
          
          <form onSubmit={handleRegisterSubmit}>
            <InputText
              label="Email Address"
              name="email"
              type="email"
              value={registerData.email}
              onChange={handleRegisterChange}
              error={registerErrors.email}
              required
              className="ihub-input"
            />

            <PasswordField
              label="Password"
              name="password"
              value={registerData.password}
              onChange={handleRegisterChange}
              error={registerErrors.password}
              required
              helperText="Minimum 8 characters with uppercase, lowercase, number, and special character"
              className="ihub-input"
            />

            {/* Password Strength Indicator */}
            {registerData.password && (
              <div className="ihub-password-strength ihub-mb-3">
                <div className="ihub-strength-meter ihub-mb-2">
                  <div
                    className={`ihub-strength-bar ihub-strength-${passwordStrength.score}`}
                    style={{ 
                      width: `${(passwordStrength.score / 5) * 100}%`,
                      height: '6px',
                      backgroundColor: passwordStrength.score < 2 ? '#dc3545' : 
                                     passwordStrength.score < 4 ? '#ffc107' : '#28a745',
                      borderRadius: '3px',
                      transition: 'all 0.3s ease'
                    }}
                  ></div>
                </div>
                <p className="ihub-strength-text ihub-fs-14">
                  Password strength: {["Very Weak", "Weak", "Fair", "Good", "Strong"][passwordStrength.score]}
                </p>
                {passwordStrength.feedback.length > 0 && (
                  <ul className="ihub-strength-feedback ihub-fs-12">
                    {passwordStrength.feedback.map((tip, index) => (
                      <li key={index} className="ihub-text-muted">{tip}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <PasswordField
              label="Confirm Password"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
              error={registerErrors.confirmPassword}
              required
              helperText="Re-enter your password to confirm"
              className="ihub-input"
            />

            <div className="ihub-mt-3">
              <SubmitButton
                label="Create Account"
                type="submit"
                status={registerStatus}
              />
            </div>
          </form>
        </div>

        {/* Change Password Form */}
        <div className="ihub-col-md-6 ihub-mb-5">
          <h2>Change Password Form</h2>
          <p>Secure password change with current password verification.</p>
          
          <form onSubmit={handleChangePasswordSubmit}>
            <PasswordField
              label="Current Password"
              name="currentPassword"
              value={changePasswordData.currentPassword}
              onChange={handleChangePasswordChange}
              error={changePasswordErrors.currentPassword}
              required
              helperText="Enter your current password for verification"
              className="ihub-input"
            />

            <PasswordField
              label="New Password"
              name="newPassword"
              value={changePasswordData.newPassword}
              onChange={handleChangePasswordChange}
              error={changePasswordErrors.newPassword}
              required
              helperText="Choose a strong password different from your current one"
              className="ihub-input"
            />

            {/* New Password Strength Indicator */}
            {changePasswordData.newPassword && (
              <div className="ihub-password-strength ihub-mb-3">
                <div className="ihub-strength-meter ihub-mb-2">
                  <div
                    className={`ihub-strength-bar ihub-strength-${newPasswordStrength.score}`}
                    style={{ 
                      width: `${(newPasswordStrength.score / 5) * 100}%`,
                      height: '6px',
                      backgroundColor: newPasswordStrength.score < 2 ? '#dc3545' : 
                                     newPasswordStrength.score < 4 ? '#ffc107' : '#28a745',
                      borderRadius: '3px',
                      transition: 'all 0.3s ease'
                    }}
                  ></div>
                </div>
                <p className="ihub-strength-text ihub-fs-14">
                  New password strength: {["Very Weak", "Weak", "Fair", "Good", "Strong"][newPasswordStrength.score]}
                </p>
              </div>
            )}

            <PasswordField
              label="Confirm New Password"
              name="confirmNewPassword"
              value={changePasswordData.confirmNewPassword}
              onChange={handleChangePasswordChange}
              error={changePasswordErrors.confirmNewPassword}
              required
              helperText="Confirm your new password"
              className="ihub-input"
            />

            <div className="ihub-mt-3">
              <SubmitButton
                label="Update Password"
                type="submit"
                status={changePasswordStatus}
              />
            </div>
          </form>
        </div>
      </div>

      {/* Advanced Usage Examples */}
      <div className="ihub-row">
        <div className="ihub-col-md-12 ihub-mb-5">
          <h2>Advanced Usage Examples</h2>
          
          <div className="ihub-row">
            {/* Custom Error Handling */}
            <div className="ihub-col-md-4 ihub-mb-4">
              <h3 className="ihub-fs-20">Custom Error Display</h3>
              <PasswordField
                label="Password with Custom Error"
                name="customError"
                error="This is a custom error message"
                helperText="This helper text is hidden when error is shown"
                className="ihub-input"
              />
            </div>

            {/* Required Field */}
            <div className="ihub-col-md-4 ihub-mb-4">
              <h3 className="ihub-fs-20">Required Field</h3>
              <PasswordField
                label="Required Password"
                name="required"
                required={true}
                note="This field is required"
                className="ihub-input"
              />
            </div>

            {/* Custom Class */}
            <div className="ihub-col-md-4 ihub-mb-4">
              <h3 className="ihub-fs-20">Custom Styling</h3>
              <PasswordField
                label="Custom Styled Password"
                name="customStyle"
                className="ihub-input custom-password-field"
                helperText="This field has custom styling"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Code Examples */}
      <div className="ihub-row">
        <div className="ihub-col-md-12">
          <h2>Code Examples</h2>
          
          <h3 className="ihub-fs-18">Basic Usage</h3>
          <pre className="ihub-code-block ihub-bg-light ihub-p-3 ihub-rounded">
{`import React, { useState } from 'react';
import { PasswordField } from '@instincthub/react-ui';

function BasicPasswordExample() {
  const [password, setPassword] = useState('');

  return (
    <PasswordField
      label="Password"
      name="password"
      value={password}
      setValue={setPassword}
      required={true}
      helperText="Enter your password"
      className="ihub-input"
    />
  );
}`}
          </pre>

          <h3 className="ihub-fs-18">With Validation</h3>
          <pre className="ihub-code-block ihub-bg-light ihub-p-3 ihub-rounded">
{`import React, { useState } from 'react';
import { PasswordField } from '@instincthub/react-ui';

function ValidatedPasswordExample() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    return null;
  };

  return (
    <>
      <PasswordField
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required={true}
        helperText="Minimum 8 characters"
        className="ihub-input"
      />
      
      <PasswordField
        label="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        required={true}
        helperText="Must match password above"
        className="ihub-input"
      />
    </>
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default PasswordFieldExamples;
```

## 🔗 Related Components

- [InputText](./InputText.md) - Text input field component
- [SubmitButton](./SubmitButton.md) - Submit button with loading states
- [LoginForm](./LoginForm.md) - Complete login form with authentication
- [PasswordsMatch](./PasswordsMatch.md) - Password confirmation validation component
- [FormError](./FormError.md) - Form error handling component

