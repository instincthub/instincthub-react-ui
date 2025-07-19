# OrDivider

**Category:** UI | **Type:** component

A versatile divider component with customizable text for separating content sections

## 🏷️ Tags

`ui`, `divider`, `separator`, `layout`

```tsx
"use client";
import React, { useState } from "react";
import {
  OrDivider,
  InputText,
  SubmitButton,
  PasswordField,
} from "@instincthub/react-ui";

/**
 * Example component demonstrating various ways to use the OrDivider
 */
const OrDividerExamples = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    company: "",
    role: "",
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>OrDivider Examples</h1>

      {/* Basic Or Divider Example */}
      <div className="ihub-card ihub-p-4 ihub-mb-4">
        <h3>Basic Usage - Default "or" Text</h3>
        <p>Simple divider with default "or" text:</p>
        
        <div className="ihub-auth-buttons">
          <button className="ihub-primary-btn">Login with Google</button>
          <button className="ihub-outlined-btn">Login with GitHub</button>
        </div>
        
        <OrDivider />
        
        <div className="ihub-form-group">
          <InputText
            label="Email"
            type="email"
            placeholder="Enter your email"
            className="ihub-input"
          />
          <PasswordField
            label="Password"
            placeholder="Enter your password"
            className="ihub-input"
          />
          <button className="ihub-important-btn ihub-w-100">Sign In</button>
        </div>
      </div>

      {/* Custom Text Divider */}
      <div className="ihub-card ihub-p-4 ihub-mb-4">
        <h3>Custom Text Labels</h3>
        <p>Dividers with custom text labels for different contexts:</p>
        
        <div className="ihub-content-section">
          <h4>Personal Information</h4>
          <InputText
            label="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            name="name"
            className="ihub-input"
          />
          <InputText
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            name="email"
            className="ihub-input"
          />
        </div>

        <OrDivider labels="Professional Details" />

        <div className="ihub-content-section">
          <InputText
            label="Company"
            value={formData.company}
            onChange={handleInputChange}
            name="company"
            className="ihub-input"
          />
          <InputText
            label="Job Title"
            value={formData.role}
            onChange={handleInputChange}
            name="role"
            className="ihub-input"
          />
        </div>
      </div>

      {/* Multiple Dividers with Different Labels */}
      <div className="ihub-card ihub-p-4 ihub-mb-4">
        <h3>Multiple Dividers - Content Organization</h3>
        <p>Using different divider labels to organize various content sections:</p>

        <div className="ihub-content-section">
          <h4>Free Options</h4>
          <div className="ihub-option-list">
            <div className="ihub-option-item">✓ Basic features</div>
            <div className="ihub-option-item">✓ Community support</div>
            <div className="ihub-option-item">✓ Limited storage</div>
          </div>
        </div>

        <OrDivider labels="Premium Features" />

        <div className="ihub-content-section">
          <div className="ihub-option-list">
            <div className="ihub-option-item">⭐ Advanced analytics</div>
            <div className="ihub-option-item">⭐ Priority support</div>
            <div className="ihub-option-item">⭐ Unlimited storage</div>
          </div>
        </div>

        <OrDivider labels="Enterprise Solutions" />

        <div className="ihub-content-section">
          <div className="ihub-option-list">
            <div className="ihub-option-item">🏢 Custom integrations</div>
            <div className="ihub-option-item">🏢 Dedicated support</div>
            <div className="ihub-option-item">🏢 Advanced security</div>
          </div>
        </div>
      </div>

      {/* Payment Methods Example */}
      <div className="ihub-card ihub-p-4 ihub-mb-4">
        <h3>Payment Methods Separator</h3>
        <p>Common use case for separating different payment options:</p>

        <div className="ihub-payment-section">
          <h4>Digital Payments</h4>
          <div className="ihub-payment-buttons">
            <button className="ihub-primary-btn">PayPal</button>
            <button className="ihub-outlined-btn">Stripe</button>
            <button className="ihub-secondary-btn">Apple Pay</button>
          </div>
        </div>

        <OrDivider labels="Traditional Methods" />

        <div className="ihub-payment-section">
          <div className="ihub-payment-buttons">
            <button className="ihub-outlined-btn">Bank Transfer</button>
            <button className="ihub-outlined-btn">Credit Card</button>
            <button className="ihub-outlined-btn">Cash on Delivery</button>
          </div>
        </div>
      </div>

      {/* Login/Signup Variations */}
      <div className="ihub-card ihub-p-4 ihub-mb-4">
        <h3>Authentication Flow Variations</h3>
        <p>Different divider labels for various authentication contexts:</p>

        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <h4>Quick Login</h4>
            <button className="ihub-primary-btn ihub-w-100 ihub-mb-2">
              Continue with Google
            </button>
            <button className="ihub-outlined-btn ihub-w-100">
              Continue with Facebook
            </button>
            
            <OrDivider labels="Email Login" />
            
            <InputText
              placeholder="Email address"
              type="email"
              className="ihub-input"
            />
            <PasswordField
              placeholder="Password"
              className="ihub-input"
            />
            <button className="ihub-important-btn ihub-w-100">Sign In</button>
          </div>

          <div className="ihub-col-md-6">
            <h4>Create Account</h4>
            <button className="ihub-success-btn ihub-w-100 ihub-mb-2">
              Sign up with Google
            </button>
            <button className="ihub-outlined-btn ihub-w-100">
              Sign up with LinkedIn
            </button>
            
            <OrDivider labels="Manual Registration" />
            
            <InputText
              placeholder="Full name"
              className="ihub-input"
            />
            <InputText
              placeholder="Email address"
              type="email"
              className="ihub-input"
            />
            <PasswordField
              placeholder="Create password"
              className="ihub-input"
            />
            <button className="ihub-important-btn ihub-w-100">Create Account</button>
          </div>
        </div>
      </div>

      {/* Content Separation Example */}
      <div className="ihub-card ihub-p-4 ihub-mb-4">
        <h3>Content Section Separation</h3>
        <p>Using dividers to separate different types of content or information:</p>

        <div className="ihub-content-section">
          <h4>Recent Updates</h4>
          <div className="ihub-update-item">• Feature: New dashboard layout</div>
          <div className="ihub-update-item">• Bug fix: Login issues resolved</div>
          <div className="ihub-update-item">• Enhancement: Faster loading times</div>
        </div>

        <OrDivider labels="Coming Soon" />

        <div className="ihub-content-section">
          <div className="ihub-update-item">🚀 Advanced reporting tools</div>
          <div className="ihub-update-item">🎨 New theme customization</div>
          <div className="ihub-update-item">📱 Mobile app release</div>
        </div>

        <OrDivider labels="Community Requests" />

        <div className="ihub-content-section">
          <div className="ihub-update-item">💡 Dark mode support</div>
          <div className="ihub-update-item">🔔 Better notifications</div>
          <div className="ihub-update-item">⚡ API rate limit increase</div>
        </div>
      </div>

      {/* Short vs Long Text Examples */}
      <div className="ihub-card ihub-p-4 ihub-mb-4">
        <h3>Text Length Variations</h3>
        <p>Examples showing how the divider adapts to different text lengths:</p>

        <div className="ihub-content-section">
          <h4>Short Labels</h4>
          <OrDivider labels="or" />
          <OrDivider labels="and" />
          <OrDivider labels="vs" />
        </div>

        <div className="ihub-content-section ihub-mt-4">
          <h4>Medium Labels</h4>
          <OrDivider labels="Alternatives" />
          <OrDivider labels="Other Options" />
          <OrDivider labels="Additional Info" />
        </div>

        <div className="ihub-content-section ihub-mt-4">
          <h4>Longer Labels</h4>
          <OrDivider labels="Advanced Configuration" />
          <OrDivider labels="Professional Services" />
          <OrDivider labels="Enterprise Solutions" />
        </div>
      </div>

      <style jsx>{`
        .ihub-auth-buttons {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        .ihub-auth-buttons button {
          flex: 1;
        }
        .ihub-content-section {
          margin: 20px 0;
        }
        .ihub-option-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .ihub-option-item {
          padding: 8px 12px;
          background: var(--ihub-light-gray, #f8f9fa);
          border-radius: 4px;
          border-left: 3px solid var(--ihub-primary, #007bff);
        }
        .ihub-payment-section {
          margin: 15px 0;
        }
        .ihub-payment-buttons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .ihub-payment-buttons button {
          flex: 1;
          min-width: 120px;
        }
        .ihub-update-item {
          padding: 6px 0;
          color: var(--ihub-text-secondary, #6c757d);
        }
        .ihub-row {
          display: flex;
          gap: 20px;
          margin: 20px 0;
        }
        .ihub-col-md-6 {
          flex: 1;
          min-width: 0;
        }
        @media (max-width: 768px) {
          .ihub-row {
            flex-direction: column;
          }
          .ihub-auth-buttons {
            flex-direction: column;
          }
          .ihub-payment-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default OrDividerExamples;
```

## 🔗 Related Components

- [InputText](./InputText.md) - Text input component
- [PasswordField](./PasswordField.md) - Password input component  
- [SubmitButton](./SubmitButton.md) - Submit button component
- [Card](./Card.md) - Card container component
- [Dialog](./Dialog.md) - Dialog/modal component

