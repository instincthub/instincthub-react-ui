"use client";

import React, { useState } from "react";
import { OrDivider, InputText, SubmitButton, PasswordField } from "../../../../index";

const OrDividerExample: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    company: "",
    role: "",
    phone: "",
    address: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Social login handlers
  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  const handleGitHubLogin = () => {
    console.log("GitHub login clicked");
  };

  const handleFacebookLogin = () => {
    console.log("Facebook login clicked");
  };

  const handleTwitterLogin = () => {
    console.log("Twitter login clicked");
  };

  // Form submit handlers
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted:", loginData);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup submitted:", signupData);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
  };

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>OrDivider Examples</h1>
        <p>A versatile divider component with customizable text for separating content sections</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Or Divider */}
        <div className="ihub-example-card">
          <h3>Basic Usage - Default "or" Text</h3>
          <p>Simple divider with default "or" text for authentication flows</p>
          
          <div className="ihub-auth-section">
            <div className="ihub-social-buttons">
              <button onClick={handleGoogleLogin} className="ihub-google-btn">
                🔍 Login with Google
              </button>
              <button onClick={handleGitHubLogin} className="ihub-github-btn">
                📱 Login with GitHub
              </button>
            </div>
            
            <OrDivider />
            
            <form onSubmit={handleLoginSubmit} className="ihub-auth-form">
              <InputText
                label="Email"
                name="email"
                type="email"
                value={loginData.email}
                onChange={handleLoginChange}
                placeholder="Enter your email"
                required
              />
              <PasswordField
                label="Password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="Enter your password"
                required
              />
              <SubmitButton
                label="Sign In"
                status={1}
                className="ihub-important-btn ihub-w-100"
              />
            </form>
          </div>
        </div>

        {/* Custom Text Dividers */}
        <div className="ihub-example-card">
          <h3>Custom Text Labels</h3>
          <p>Dividers with custom text labels for different contexts</p>
          
          <div className="ihub-form-sections">
            <div className="ihub-section">
              <h4>Personal Information</h4>
              <InputText
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />
              <InputText
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </div>
            
            <OrDivider labels="Professional Details" />
            
            <div className="ihub-section">
              <InputText
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Enter your company"
              />
              <InputText
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="Enter your role"
              />
            </div>

            <OrDivider labels="Contact Information" />
            
            <div className="ihub-section">
              <InputText
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
              <InputText
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
              />
            </div>
          </div>
        </div>

        {/* Multiple Social Options */}
        <div className="ihub-example-card">
          <h3>Multiple Social Login Options</h3>
          <p>Separating multiple social login options from traditional form</p>
          
          <div className="ihub-signup-section">
            <h4>Quick Signup</h4>
            <div className="ihub-social-grid">
              <button onClick={handleGoogleLogin} className="ihub-social-btn google">
                🔍 Google
              </button>
              <button onClick={handleFacebookLogin} className="ihub-social-btn facebook">
                📘 Facebook
              </button>
              <button onClick={handleGitHubLogin} className="ihub-social-btn github">
                📱 GitHub
              </button>
              <button onClick={handleTwitterLogin} className="ihub-social-btn twitter">
                🐦 Twitter
              </button>
            </div>
            
            <OrDivider labels="or create account" />
            
            <form onSubmit={handleSignupSubmit} className="ihub-signup-form">
              <InputText
                label="Full Name"
                name="fullName"
                value={signupData.fullName}
                onChange={handleSignupChange}
                placeholder="Enter your full name"
                required
              />
              <InputText
                label="Email"
                name="email"
                type="email"
                value={signupData.email}
                onChange={handleSignupChange}
                placeholder="Enter your email"
                required
              />
              <PasswordField
                label="Password"
                name="password"
                value={signupData.password}
                onChange={handleSignupChange}
                placeholder="Create a password"
                required
              />
              <PasswordField
                label="Confirm Password"
                name="confirmPassword"
                value={signupData.confirmPassword}
                onChange={handleSignupChange}
                placeholder="Confirm your password"
                required
              />
              <SubmitButton
                label="Create Account"
                status={1}
                className="ihub-important-btn ihub-w-100"
              />
            </form>
          </div>
        </div>

        {/* Content Separation */}
        <div className="ihub-example-card">
          <h3>Content Section Separation</h3>
          <p>Using dividers to separate different content sections</p>
          
          <div className="ihub-content-sections">
            <div className="ihub-features-section">
              <h4>Key Features</h4>
              <ul>
                <li>✅ User Authentication</li>
                <li>✅ Data Management</li>
                <li>✅ Real-time Updates</li>
              </ul>
            </div>
            
            <OrDivider labels="Benefits" />
            
            <div className="ihub-benefits-section">
              <h4>Why Choose Us?</h4>
              <ul>
                <li>🚀 Fast Performance</li>
                <li>🔒 Secure & Reliable</li>
                <li>📱 Mobile Friendly</li>
              </ul>
            </div>
            
            <OrDivider labels="Get Started" />
            
            <div className="ihub-cta-section">
              <h4>Ready to Begin?</h4>
              <p>Join thousands of users who trust our platform</p>
              <button className="ihub-important-btn">Start Free Trial</button>
            </div>
          </div>
        </div>

        {/* Different Styles */}
        <div className="ihub-example-card">
          <h3>Different Divider Styles</h3>
          <p>Various divider styles for different use cases</p>
          
          <div className="ihub-divider-styles">
            <div className="ihub-style-demo">
              <h5>Payment Methods</h5>
              <div className="ihub-payment-options">
                <button className="ihub-payment-btn">💳 Credit Card</button>
                <button className="ihub-payment-btn">🏦 Bank Transfer</button>
              </div>
              
              <OrDivider />
              
              <div className="ihub-other-options">
                <button className="ihub-payment-btn">📱 PayPal</button>
                <button className="ihub-payment-btn">💰 Cash on Delivery</button>
              </div>
            </div>
            
            <div className="ihub-style-demo ihub-mt-4">
              <h5>Contact Options</h5>
              <div className="ihub-contact-primary">
                <button className="ihub-contact-btn">📞 Call Us</button>
                <button className="ihub-contact-btn">💬 Live Chat</button>
              </div>
              
              <OrDivider labels="alternative" />
              
              <div className="ihub-contact-alternative">
                <button className="ihub-contact-btn">📧 Email Support</button>
                <button className="ihub-contact-btn">📝 Submit Ticket</button>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Styling */}
        <div className="ihub-example-card">
          <h3>Custom Styling Examples</h3>
          <p>OrDivider with custom CSS classes and styling</p>
          
          <div className="ihub-custom-examples">
            <div className="ihub-premium-section">
              <h5>Premium Features</h5>
              <p>Advanced tools for power users</p>
            </div>
            
            <OrDivider labels="upgrade now" />
            
            <div className="ihub-basic-section">
              <h5>Basic Features</h5>
              <p>Essential tools for getting started</p>
            </div>
            
            <div className="ihub-mt-4">
              <div className="ihub-success-content">
                <h5>Success Stories</h5>
                <p>See what our customers are saying</p>
              </div>
              
              <OrDivider labels="testimonials" />
              
              <div className="ihub-testimonial">
                <p>"This platform changed our workflow completely!"</p>
                <small>- Happy Customer</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { OrDivider } from '@instincthub/react-ui';

// Default "or" text
<OrDivider />

// Custom text
<OrDivider labels="or continue with email" />`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>In Authentication Flow</h3>
          <pre><code>{`// Social login buttons
<div className="social-buttons">
  <button onClick={handleGoogleLogin}>Login with Google</button>
  <button onClick={handleGitHubLogin}>Login with GitHub</button>
</div>

<OrDivider />

// Traditional form
<form onSubmit={handleLogin}>
  <InputText label="Email" type="email" />
  <PasswordField label="Password" />
  <SubmitButton title="Sign In" />
</form>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Content Section Separation</h3>
          <pre><code>{`<div className="content-sections">
  <div className="features">
    <h4>Key Features</h4>
    <p>Feature content here</p>
  </div>
  
  <OrDivider labels="Benefits" />
  
  <div className="benefits">
    <h4>Why Choose Us?</h4>
    <p>Benefits content here</p>
  </div>
  
  <OrDivider labels="Get Started" />
  
  <div className="cta">
    <button>Start Free Trial</button>
  </div>
</div>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Custom Styling</h3>
          <pre><code>{`// With custom CSS class
<OrDivider labels="upgrade now" className="premium-divider" />

// CSS
.premium-divider {
  --divider-color: #gold;
  --text-color: #gold;
  font-weight: bold;
}`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Form Section Separation</h3>
          <pre><code>{`<form>
  <div className="personal-info">
    <InputText label="Full Name" />
    <InputText label="Email" />
  </div>
  
  <OrDivider labels="Professional Details" />
  
  <div className="work-info">
    <InputText label="Company" />
    <InputText label="Role" />
  </div>
  
  <OrDivider labels="Contact Information" />
  
  <div className="contact-info">
    <InputText label="Phone" />
    <InputText label="Address" />
  </div>
</form>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default OrDividerExample;