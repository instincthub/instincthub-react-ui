"use client";

import React, { useState } from "react";
import { LoginForm, InputText, PasswordField, SubmitButton, Badge } from "../../../../index";

const SignUpFormExample: React.FC = () => {
  const [basicFormData, setBasicFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });

  const [advancedFormData, setAdvancedFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    country: "",
    agreeToTerms: false,
    agreeToMarketing: false
  });

  const [socialFormData, setSocialFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validateForm = (formData: any, formType: string) => {
    const newErrors: {[key: string]: string} = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Advanced form validations
    if (formType === "advanced") {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.country) newErrors.country = "Country is required";
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    return newErrors;
  };

  const handleSubmit = async (formData: any, formType: string) => {
    setIsSubmitting(true);
    setErrors({});

    const formErrors = validateForm(formData, formType);
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log(`${formType} form submitted:`, formData);
      setSubmitStatus("success");
      
      // Reset form after successful submission
      setTimeout(() => {
        setSubmitStatus("idle");
        if (formType === "basic") {
          setBasicFormData({ email: "", password: "", confirmPassword: "", agreeToTerms: false });
        } else if (formType === "advanced") {
          setAdvancedFormData({
            firstName: "", lastName: "", email: "", password: "", confirmPassword: "",
            phoneNumber: "", dateOfBirth: "", gender: "", country: "",
            agreeToTerms: false, agreeToMarketing: false
          });
        }
      }, 3000);
    } catch (error) {
      console.error("Signup error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialSignup = (provider: string) => {
    console.log(`Social signup with ${provider}`);
    // Implement social signup logic
  };

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>SignUp Form Examples</h1>
        <p>User registration forms with validation, social login, and multi-step processes</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic SignUp Form */}
        <div className="ihub-example-card">
          <h3>Basic SignUp Form</h3>
          <p>Simple registration form with email and password</p>
          
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(basicFormData, "basic"); }}>
            <div className="ihub-form-grid">
              <InputText
                name="email"
                label="Email Address"
                value={basicFormData.email}
                onChange={(e) => setBasicFormData({...basicFormData, email: e.target.value})}
                placeholder="Enter your email"
                type="email"
                required
                error={errors.email}
              />
              
              <PasswordField
                name="password"
                label="Password"
                value={basicFormData.password}
                setValue={(value) => setBasicFormData({...basicFormData, password: value})}
                required
                error={errors.password}
              />
              
              <PasswordField
                name="confirmPassword"
                label="Confirm Password"
                value={basicFormData.confirmPassword}
                setValue={(value) => setBasicFormData({...basicFormData, confirmPassword: value})}
                required
                error={errors.confirmPassword}
              />
              
              <div className="ihub-form-field">
                <label>
                  <input
                    type="checkbox"
                    checked={basicFormData.agreeToTerms}
                    onChange={(e) => setBasicFormData({...basicFormData, agreeToTerms: e.target.checked})}
                    required
                  />
                  I agree to the Terms and Conditions and Privacy Policy
                </label>
                {errors.agreeToTerms && <span className="ihub-error">{errors.agreeToTerms}</span>}
              </div>
              
              <SubmitButton
                label={isSubmitting ? "Creating Account..." : "Create Account"}
                status={isSubmitting ? 2 : submitStatus === "success" ? 3 : 1}
                className="ihub-signup-btn"
                disabled={isSubmitting}
              />
            </div>
          </form>
          
          {submitStatus === "success" && (
            <div className="ihub-success-message">
              <Badge variant="success">Account created successfully!</Badge>
            </div>
          )}
          
          {submitStatus === "error" && (
            <div className="ihub-error-message">
              <Badge variant="danger">Failed to create account. Please try again.</Badge>
            </div>
          )}
        </div>

        {/* Advanced SignUp Form */}
        <div className="ihub-example-card">
          <h3>Advanced SignUp Form</h3>
          <p>Comprehensive registration with personal information</p>
          
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(advancedFormData, "advanced"); }}>
            <div className="ihub-form-grid ihub-two-column">
              <InputText
                name="firstName"
                label="First Name"
                value={advancedFormData.firstName}
                onChange={(e) => setAdvancedFormData({...advancedFormData, firstName: e.target.value})}
                placeholder="Enter first name"
                required
                error={errors.firstName}
              />
              
              <InputText
                name="lastName"
                label="Last Name"
                value={advancedFormData.lastName}
                onChange={(e) => setAdvancedFormData({...advancedFormData, lastName: e.target.value})}
                placeholder="Enter last name"
                required
                error={errors.lastName}
              />
              
              <InputText
                name="email"
                label="Email Address"
                value={advancedFormData.email}
                onChange={(e) => setAdvancedFormData({...advancedFormData, email: e.target.value})}
                placeholder="Enter email address"
                type="email"
                required
                error={errors.email}
                className="ihub-full-width"
              />
              
              <InputText
                name="phoneNumber"
                label="Phone Number"
                value={advancedFormData.phoneNumber}
                onChange={(e) => setAdvancedFormData({...advancedFormData, phoneNumber: e.target.value})}
                placeholder="Enter phone number"
                type="tel"
                required
                error={errors.phoneNumber}
              />
              
              <InputText
                name="dateOfBirth"
                label="Date of Birth"
                value={advancedFormData.dateOfBirth}
                onChange={(e) => setAdvancedFormData({...advancedFormData, dateOfBirth: e.target.value})}
                type="date"
                required
                error={errors.dateOfBirth}
              />
              
              <div className="ihub-form-field">
                <label>Gender</label>
                <select
                  value={advancedFormData.gender}
                  onChange={(e) => setAdvancedFormData({...advancedFormData, gender: e.target.value})}
                  className="ihub-select-field"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
              
              <div className="ihub-form-field">
                <label>Country</label>
                <select
                  value={advancedFormData.country}
                  onChange={(e) => setAdvancedFormData({...advancedFormData, country: e.target.value})}
                  className="ihub-select-field"
                  required
                >
                  <option value="">Select country</option>
                  <option value="us">United States</option>
                  <option value="ca">Canada</option>
                  <option value="uk">United Kingdom</option>
                  <option value="au">Australia</option>
                  <option value="de">Germany</option>
                  <option value="fr">France</option>
                  <option value="ng">Nigeria</option>
                  <option value="other">Other</option>
                </select>
                {errors.country && <span className="ihub-error">{errors.country}</span>}
              </div>
              
              <PasswordField
                name="password"
                label="Password"
                value={advancedFormData.password}
                setValue={(value) => setAdvancedFormData({...advancedFormData, password: value})}
                required
                error={errors.password}
              />
              
              <PasswordField
                name="confirmPassword"
                label="Confirm Password"
                value={advancedFormData.confirmPassword}
                setValue={(value) => setAdvancedFormData({...advancedFormData, confirmPassword: value})}
                required
                error={errors.confirmPassword}
              />
              
              <div className="ihub-form-field ihub-full-width">
                <div className="ihub-checkboxes-group">
                  <div className="ihub-checkbox-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={advancedFormData.agreeToTerms}
                        onChange={(e) => setAdvancedFormData({...advancedFormData, agreeToTerms: e.target.checked})}
                        required
                      />
                      I agree to the Terms of Service and Privacy Policy
                    </label>
                  </div>
                  <div className="ihub-checkbox-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={advancedFormData.agreeToMarketing}
                        onChange={(e) => setAdvancedFormData({...advancedFormData, agreeToMarketing: e.target.checked})}
                      />
                      I want to receive marketing emails and updates
                    </label>
                  </div>
                  {errors.agreeToTerms && <span className="ihub-error">{errors.agreeToTerms}</span>}
                </div>
              </div>
              
              <SubmitButton
                label={isSubmitting ? "Creating Account..." : "Create Account"}
                status={isSubmitting ? 2 : 1}
                className="ihub-signup-btn ihub-full-width"
                disabled={isSubmitting}
              />
            </div>
          </form>
        </div>

        {/* Social SignUp Options */}
        <div className="ihub-example-card">
          <h3>Social SignUp Options</h3>
          <p>Registration with social media providers and email option</p>
          
          <div className="ihub-social-signup">
            <div className="ihub-social-buttons">
              <button
                onClick={() => handleSocialSignup("google")}
                className="ihub-social-btn ihub-google-btn"
              >
                <span>Continue with Google</span>
              </button>
              
              <button
                onClick={() => handleSocialSignup("facebook")}
                className="ihub-social-btn ihub-facebook-btn"
              >
                <span>Continue with Facebook</span>
              </button>
              
              <button
                onClick={() => handleSocialSignup("twitter")}
                className="ihub-social-btn ihub-twitter-btn"
              >
                <span>Continue with Twitter</span>
              </button>
              
              <button
                onClick={() => handleSocialSignup("github")}
                className="ihub-social-btn ihub-github-btn"
              >
                <span>Continue with GitHub</span>
              </button>
            </div>
            
            <div className="ihub-divider">
              <span>Or sign up with email</span>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(socialFormData, "social"); }}>
              <div className="ihub-form-grid">
                <InputText
                  name="email"
                  label="Email Address"
                  value={socialFormData.email}
                  onChange={(e) => setSocialFormData({...socialFormData, email: e.target.value})}
                  placeholder="Enter your email"
                  type="email"
                  required
                />
                
                <PasswordField
                  name="password"
                  label="Password"
                  value={socialFormData.password}
                  setValue={(value) => setSocialFormData({...socialFormData, password: value})}
                  required
                />
                
                <PasswordField
                  name="confirmPassword"
                  label="Confirm Password"
                  value={socialFormData.confirmPassword}
                  setValue={(value) => setSocialFormData({...socialFormData, confirmPassword: value})}
                  required
                />
                
                <SubmitButton
                  label="Sign Up with Email"
                  status={1}
                  className="ihub-email-signup-btn"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Multi-Step SignUp */}
        <div className="ihub-example-card">
          <h3>Multi-Step SignUp Process</h3>
          <p>Step-by-step registration with progress indicator</p>
          
          <div className="ihub-multistep-signup">
            <div className="ihub-progress-indicator">
              <div className="ihub-step ihub-active">
                <span className="ihub-step-number">1</span>
                <span className="ihub-step-label">Account Info</span>
              </div>
              <div className="ihub-step">
                <span className="ihub-step-number">2</span>
                <span className="ihub-step-label">Personal Details</span>
              </div>
              <div className="ihub-step">
                <span className="ihub-step-number">3</span>
                <span className="ihub-step-label">Verification</span>
              </div>
            </div>
            
            <div className="ihub-step-content">
              <h4>Step 1: Account Information</h4>
              <div className="ihub-form-grid">
                <InputText
                  name="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  type="email"
                  required
                />
                
                <PasswordField
                  name="password"
                  label="Password"
                  required
                />
                
                <div className="ihub-step-actions">
                  <SubmitButton
                    label="Continue to Step 2"
                    status={1}
                    className="ihub-continue-btn"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic SignUp Form</h3>
          <pre><code>{`import { InputText, PasswordField, SubmitButton } from '@instincthub/react-ui';

const [formData, setFormData] = useState({
  email: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false
});

<form onSubmit={handleSubmit}>
  <InputText
    label="Email Address"
    value={formData.email}
    onChange={(e) => setFormData({...formData, email: e.target.value})}
    type="email"
    required
  />
  
  <PasswordField
    name="password"
    label="Password"
    value={formData.password}
    setValue={(value) => setFormData({...formData, password: value})}
    required
  />
  
  <label>
    <input
      type="checkbox"
      checked={formData.agreeToTerms}
      onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
      required
    />
    I agree to the Terms and Conditions
  </label>
  
  <SubmitButton label="Create Account" status={1} />
</form>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Social SignUp Integration</h3>
          <pre><code>{`const handleSocialSignup = (provider) => {
  // Implement OAuth flow
  window.location.href = \`/auth/\${provider}\`;
};

<div className="social-buttons">
  <button onClick={() => handleSocialSignup("google")}>
    Continue with Google
  </button>
  <button onClick={() => handleSocialSignup("facebook")}>
    Continue with Facebook
  </button>
</div>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Form Validation</h3>
          <pre><code>{`const validateForm = (formData) => {
  const errors = {};
  
  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) {
    errors.email = "Email is invalid";
  }
  
  if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }
  
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  
  return errors;
};`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default SignUpFormExample;