"use client";

import React, { useState } from "react";
import { PasswordField, InputText, SubmitButton } from "../../../../index";

const PasswordFieldExample: React.FC = () => {
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
    else strength.feedback.push("One uppercase letter");

    if (/[a-z]/.test(password)) strength.score += 1;
    else strength.feedback.push("One lowercase letter");

    if (/\d/.test(password)) strength.score += 1;
    else strength.feedback.push("One number");

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength.score += 1;
    else strength.feedback.push("One special character");

    return strength;
  };

  const getPasswordStrengthText = (score: number) => {
    if (score <= 1) return "Very Weak";
    if (score === 2) return "Weak";
    if (score === 3) return "Fair";
    if (score === 4) return "Good";
    return "Strong";
  };

  const getPasswordStrengthColor = (score: number) => {
    if (score <= 1) return "#ea5f5e";
    if (score === 2) return "#fbeb5b";
    if (score === 3) return "#f4a261";
    if (score === 4) return "#2a9d8f";
    return "#00c5a2";
  };

  // Handle basic password change
  const handleBasicPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBasicPassword(e.target.value);
  };

  // Handle login form changes
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when typing
    if (loginErrors[name as keyof typeof loginErrors]) {
      setLoginErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle registration form changes
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when typing
    if (registerErrors[name as keyof typeof registerErrors]) {
      setRegisterErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle change password form changes
  const handleChangePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangePasswordData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when typing
    if (changePasswordErrors[name as keyof typeof changePasswordErrors]) {
      setChangePasswordErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Form submit handlers
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginStatus(2); // Loading
    
    // Simulate API call
    setTimeout(() => {
      console.log("Login submitted:", loginData);
      setLoginStatus(1); // Reset
    }, 2000);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const errors: typeof registerErrors = {};
    
    if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    if (registerData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    
    if (Object.keys(errors).length > 0) {
      setRegisterErrors(errors);
      return;
    }
    
    setRegisterStatus(2); // Loading
    
    // Simulate API call
    setTimeout(() => {
      console.log("Register submitted:", registerData);
      setRegisterStatus(1); // Reset
    }, 2000);
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const errors: typeof changePasswordErrors = {};
    
    if (changePasswordData.newPassword !== changePasswordData.confirmNewPassword) {
      errors.confirmNewPassword = "New passwords do not match";
    }
    
    if (changePasswordData.newPassword.length < 8) {
      errors.newPassword = "New password must be at least 8 characters";
    }
    
    if (Object.keys(errors).length > 0) {
      setChangePasswordErrors(errors);
      return;
    }
    
    setChangePasswordStatus(2); // Loading
    
    // Simulate API call
    setTimeout(() => {
      console.log("Change password submitted:", changePasswordData);
      setChangePasswordStatus(1); // Reset
    }, 2000);
  };

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>PasswordField Examples</h1>
        <p>Secure password input field with visibility toggle and validation support</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Password Field */}
        <div className="ihub-example-card">
          <h3>Basic Password Field</h3>
          <p>Simple password input with visibility toggle</p>
          <PasswordField
            label="Password"
            name="basicPassword"
            value={basicPassword}
            onChange={handleBasicPasswordChange}
            placeholder="Enter your password"
          />
          <div className="ihub-example-output">
            <strong>Value:</strong> {basicPassword ? '•'.repeat(basicPassword.length) : 'None'}
          </div>
        </div>

        {/* Password with Strength Indicator */}
        <div className="ihub-example-card">
          <h3>Password with Strength Indicator</h3>
          <p>Password field showing strength validation</p>
          <PasswordField
            label="Create Password"
            name="strongPassword"
            value={registerData.password}
            onChange={handleRegisterChange}
            placeholder="Enter a strong password"
          />
          {registerData.password && (
            <div className="ihub-password-strength ihub-mt-2">
              <div className="ihub-strength-bar">
                <div 
                  className="ihub-strength-fill" 
                  style={{ 
                    width: `${(checkPasswordStrength(registerData.password).score / 5) * 100}%`,
                    backgroundColor: getPasswordStrengthColor(checkPasswordStrength(registerData.password).score)
                  }}
                ></div>
              </div>
              <div className="ihub-strength-text" style={{ 
                color: getPasswordStrengthColor(checkPasswordStrength(registerData.password).score) 
              }}>
                Strength: {getPasswordStrengthText(checkPasswordStrength(registerData.password).score)}
              </div>
              {checkPasswordStrength(registerData.password).feedback.length > 0 && (
                <div className="ihub-strength-feedback">
                  <small>Missing: {checkPasswordStrength(registerData.password).feedback.join(", ")}</small>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Required Password Field */}
        <div className="ihub-example-card">
          <h3>Required Password Field</h3>
          <p>Password field with required validation</p>
          <PasswordField
            label="Required Password"
            name="requiredPassword"
            required
            placeholder="This field is required"
          />
        </div>

        {/* Password with Error */}
        <div className="ihub-example-card">
          <h3>Password with Error</h3>
          <p>Password field displaying error state</p>
          <PasswordField
            label="Password with Error"
            name="errorPassword"
            error="Password must be at least 8 characters"
            placeholder="Enter password"
          />
        </div>

        {/* Disabled Password Field */}
        <div className="ihub-example-card">
          <h3>Disabled Password Field</h3>
          <p>Password field in disabled state</p>
          <PasswordField
            label="Disabled Password"
            name="disabledPassword"
            value="disabled-password"
          />
        </div>

        {/* Readonly Password Field */}
        <div className="ihub-example-card">
          <h3>Readonly Password Field</h3>
          <p>Password field in readonly state</p>
          <PasswordField
            label="Readonly Password"
            name="readonlyPassword"
            value="readonly-password"
          />
        </div>
      </div>

      {/* Login Form Example */}
      <div className="ihub-form-section ihub-mt-5">
        <h2>Login Form</h2>
        <form onSubmit={handleLoginSubmit} className="ihub-form">
          <div className="ihub-mb-3">
            <InputText
              label="Email Address"
              name="email"
              type="email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
              error={loginErrors.email}
            />
          </div>
          
          <div className="ihub-mb-3">
            <PasswordField
              label="Password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
              error={loginErrors.password}
            />
          </div>
          
          <SubmitButton
            label="Sign In"
            status={loginStatus}
            className="ihub-important-btn"
          />
        </form>
      </div>

      {/* Registration Form Example */}
      <div className="ihub-form-section ihub-mt-5">
        <h2>Registration Form</h2>
        <form onSubmit={handleRegisterSubmit} className="ihub-form">
          <div className="ihub-mb-3">
            <InputText
              label="Email Address"
              name="email"
              type="email"
              value={registerData.email}
              onChange={handleRegisterChange}
              required
              error={registerErrors.email}
            />
          </div>
          
          <div className="ihub-mb-3">
            <PasswordField
              label="Create Password"
              name="password"
              value={registerData.password}
              onChange={handleRegisterChange}
              required
              error={registerErrors.password}
            />
          </div>
          
          <div className="ihub-mb-3">
            <PasswordField
              label="Confirm Password"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
              required
              error={registerErrors.confirmPassword}
            />
          </div>
          
          <SubmitButton
            label="Create Account"
            status={registerStatus}
            className="ihub-important-btn"
          />
        </form>
      </div>

      {/* Change Password Form Example */}
      <div className="ihub-form-section ihub-mt-5">
        <h2>Change Password Form</h2>
        <form onSubmit={handleChangePasswordSubmit} className="ihub-form">
          <div className="ihub-mb-3">
            <PasswordField
              label="Current Password"
              name="currentPassword"
              value={changePasswordData.currentPassword}
              onChange={handleChangePasswordChange}
              required
              error={changePasswordErrors.currentPassword}
            />
          </div>
          
          <div className="ihub-mb-3">
            <PasswordField
              label="New Password"
              name="newPassword"
              value={changePasswordData.newPassword}
              onChange={handleChangePasswordChange}
              required
              error={changePasswordErrors.newPassword}
            />
          </div>
          
          <div className="ihub-mb-3">
            <PasswordField
              label="Confirm New Password"
              name="confirmNewPassword"
              value={changePasswordData.confirmNewPassword}
              onChange={handleChangePasswordChange}
              required
              error={changePasswordErrors.confirmNewPassword}
            />
          </div>
          
          <SubmitButton
            label="Update Password"
            status={changePasswordStatus}
            className="ihub-important-btn"
          />
        </form>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { PasswordField } from '@instincthub/react-ui';

const [password, setPassword] = useState('');

const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setPassword(e.target.value);
};

<PasswordField
  label="Password"
  name="password"
  value={password}
  onChange={handlePasswordChange}
  placeholder="Enter your password"
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Validation</h3>
          <pre><code>{`<PasswordField
  label="Password"
  name="password"
  value={password}
  onChange={handlePasswordChange}
  required
  error={error}
  placeholder="Enter a strong password"
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>In Form with Submit Button</h3>
          <pre><code>{`import { PasswordField, SubmitButton } from '@instincthub/react-ui';

<form onSubmit={handleSubmit}>
  <PasswordField
    label="Password"
    name="password"
    value={formData.password}
    onChange={handleChange}
    required
  />
  <SubmitButton
    title="Submit"
    status={submitStatus}
  />
</form>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default PasswordFieldExample;