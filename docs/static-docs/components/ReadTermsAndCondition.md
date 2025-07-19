# ReadTermsAndCondition

**Category:** Forms | **Type:** component

Terms and conditions acceptance component with customizable content, validation, and tracking

**File Location:** `src/components/forms/ReadTermsAndCondition.tsx`

## 🏷️ Tags

`forms`, `legal`, `terms`, `conditions`, `acceptance`, `validation`

```tsx
"use client";
import React, { useState } from "react";
import { ReadTermsAndCondition } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive examples demonstrating ReadTermsAndCondition usage
 * Shows different content types, validation patterns, and integration scenarios
 */
const ReadTermsAndConditionExamples = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  const [acceptanceStates, setAcceptanceStates] = useState<Record<string, boolean>>({
    terms: false,
    privacy: false,
    marketing: false,
    cookies: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleAcceptanceChange = (type: string, accepted: boolean) => {
    setAcceptanceStates(prev => ({
      ...prev,
      [type]: accepted,
    }));
    
    if (accepted) {
      openToast(`${type} agreement accepted`);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptanceStates.terms || !acceptanceStates.privacy) {
      openToast("Please accept the required terms and privacy policy", 400);
      return;
    }
    
    if (!formData.username || !formData.email || !formData.password) {
      openToast("Please fill in all required fields", 400);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    openToast("Account created successfully!");
    
    // Reset form
    setFormData({ username: "", email: "", password: "" });
    setAcceptanceStates({
      terms: false,
      privacy: false,
      marketing: false,
      cookies: false,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>ReadTermsAndCondition Examples</h1>
      <p className="ihub-mb-4">
        Legal document acceptance component for handling terms of service, privacy policies,
        and other user agreements with validation and tracking.
      </p>

      {/* Basic Terms Acceptance */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Basic Terms and Conditions</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Simple Acceptance</h3>
            <p className="ihub-text-muted">Basic terms acceptance with validation</p>
          </div>
          
          <div className="ihub-card-body">
            <ReadTermsAndCondition
              title="Terms and Conditions"
              content={`
                By using this service, you agree to:
                
                1. Use the service in accordance with applicable laws
                2. Not engage in any harmful or illegal activities
                3. Respect the privacy and rights of other users
                4. Comply with our community guidelines
                5. Accept responsibility for your account security
                
                Last updated: January 2024
              `}
              required={true}
              checked={acceptanceStates.terms}
              onChange={(accepted) => handleAcceptanceChange('terms', accepted)}
              className="ihub-terms-basic"
            />
          </div>
        </div>
      </section>

      {/* Privacy Policy Acceptance */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Privacy Policy Agreement</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Data Processing Consent</h3>
            <p className="ihub-text-muted">Privacy policy acceptance with detailed content</p>
          </div>
          
          <div className="ihub-card-body">
            <ReadTermsAndCondition
              title="Privacy Policy"
              content={`
                Data Collection and Use:
                
                We collect and process your personal data to:
                • Provide and improve our services
                • Communicate with you about your account
                • Ensure security and prevent fraud
                • Comply with legal obligations
                
                Data Sharing:
                We do not sell your personal data. We may share data with:
                • Service providers who help us operate our platform
                • Legal authorities when required by law
                • Business partners with your explicit consent
                
                Your Rights:
                • Access your personal data
                • Request data correction or deletion
                • Object to data processing
                • Data portability
                
                Contact: privacy@instincthub.com
              `}
              required={true}
              checked={acceptanceStates.privacy}
              onChange={(accepted) => handleAcceptanceChange('privacy', accepted)}
              className="ihub-privacy-policy"
              showLastUpdated={true}
              lastUpdatedDate="2024-01-15"
            />
          </div>
        </div>
      </section>

      {/* Complete Registration Form */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Registration Form with Multiple Agreements</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Create Account</h3>
            <p className="ihub-text-muted">Complete registration with multiple legal agreements</p>
          </div>
          
          <div className="ihub-card-body">
            <form onSubmit={handleFormSubmit}>
              {/* User Information */}
              <div className="ihub-row">
                <div className="ihub-col-md-6">
                  <div className="ihub-mb-3">
                    <label className="ihub-form-label">Username *</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="ihub-input"
                      placeholder="Choose a username"
                      required
                    />
                  </div>
                </div>
                
                <div className="ihub-col-md-6">
                  <div className="ihub-mb-3">
                    <label className="ihub-form-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="ihub-input"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="ihub-mb-4">
                <label className="ihub-form-label">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="ihub-input"
                  placeholder="Create a secure password"
                  required
                />
              </div>

              {/* Legal Agreements */}
              <div className="ihub-legal-agreements ihub-mb-4">
                <h4>Legal Agreements</h4>
                
                {/* Required: Terms of Service */}
                <div className="ihub-agreement-section ihub-mb-3">
                  <ReadTermsAndCondition
                    title="Terms of Service *"
                    content={`
                      Service Agreement:
                      
                      By creating an account, you agree to:
                      1. Provide accurate and complete information
                      2. Maintain the security of your account
                      3. Use our service responsibly and legally
                      4. Not violate intellectual property rights
                      5. Comply with our community standards
                      
                      Service Availability:
                      • We strive for 99.9% uptime
                      • Maintenance windows will be announced
                      • Some features may be region-specific
                      
                      Account Termination:
                      We may terminate accounts for policy violations.
                      You may delete your account at any time.
                    `}
                    required={true}
                    checked={acceptanceStates.terms}
                    onChange={(accepted) => handleAcceptanceChange('terms', accepted)}
                    className="ihub-terms-required"
                    compact={true}
                  />
                </div>

                {/* Required: Privacy Policy */}
                <div className="ihub-agreement-section ihub-mb-3">
                  <ReadTermsAndCondition
                    title="Privacy Policy *"
                    content={`
                      Data Protection Summary:
                      
                      Personal Data We Collect:
                      • Account information (name, email, username)
                      • Usage data and analytics
                      • Device and browser information
                      • Communication preferences
                      
                      How We Use Your Data:
                      • Account management and authentication
                      • Service improvement and personalization
                      • Customer support and communication
                      • Security and fraud prevention
                      
                      Data Retention:
                      • Active accounts: data retained while account is active
                      • Deleted accounts: most data deleted within 30 days
                      • Legal requirements may extend retention periods
                      
                      Your Privacy Rights:
                      • Access, correct, or delete your data
                      • Object to processing
                      • Data portability
                      • Withdraw consent
                    `}
                    required={true}
                    checked={acceptanceStates.privacy}
                    onChange={(accepted) => handleAcceptanceChange('privacy', accepted)}
                    className="ihub-privacy-required"
                    compact={true}
                  />
                </div>

                {/* Optional: Marketing Communications */}
                <div className="ihub-agreement-section ihub-mb-3">
                  <ReadTermsAndCondition
                    title="Marketing Communications (Optional)"
                    content={`
                      Email Communications:
                      
                      By opting in, you agree to receive:
                      • Product updates and new features
                      • Educational content and tutorials
                      • Special offers and promotions
                      • Company news and announcements
                      
                      Frequency: 2-4 emails per month
                      
                      You can unsubscribe at any time by:
                      • Clicking unsubscribe in any email
                      • Updating your preferences in account settings
                      • Contacting support@instincthub.com
                      
                      We will not share your email with third parties for marketing purposes.
                    `}
                    required={false}
                    checked={acceptanceStates.marketing}
                    onChange={(accepted) => handleAcceptanceChange('marketing', accepted)}
                    className="ihub-marketing-optional"
                    compact={true}
                  />
                </div>

                {/* Optional: Cookie Policy */}
                <div className="ihub-agreement-section ihub-mb-3">
                  <ReadTermsAndCondition
                    title="Cookie Policy (Optional)"
                    content={`
                      Cookie Usage:
                      
                      Essential Cookies (Always Active):
                      • Authentication and session management
                      • Security and fraud prevention
                      • Basic site functionality
                      
                      Optional Cookies (Require Consent):
                      • Analytics and performance monitoring
                      • Personalization and preferences
                      • Third-party integrations
                      
                      Cookie Management:
                      • Browser settings can block cookies
                      • Our cookie preference center
                      • Third-party opt-out tools
                      
                      By accepting, you consent to optional cookie usage.
                      Essential cookies are used regardless of this setting.
                    `}
                    required={false}
                    checked={acceptanceStates.cookies}
                    onChange={(accepted) => handleAcceptanceChange('cookies', accepted)}
                    className="ihub-cookies-optional"
                    compact={true}
                  />
                </div>
              </div>

              {/* Agreement Summary */}
              <div className="ihub-agreement-summary ihub-mb-4">
                <h4>Agreement Status</h4>
                <div className="ihub-status-grid">
                  <div className="ihub-status-item">
                    <span className="ihub-status-label">Terms of Service:</span>
                    <span className={`ihub-status-value ${acceptanceStates.terms ? 'accepted' : 'pending'}`}>
                      {acceptanceStates.terms ? '✓ Accepted' : '○ Required'}
                    </span>
                  </div>
                  
                  <div className="ihub-status-item">
                    <span className="ihub-status-label">Privacy Policy:</span>
                    <span className={`ihub-status-value ${acceptanceStates.privacy ? 'accepted' : 'pending'}`}>
                      {acceptanceStates.privacy ? '✓ Accepted' : '○ Required'}
                    </span>
                  </div>
                  
                  <div className="ihub-status-item">
                    <span className="ihub-status-label">Marketing:</span>
                    <span className={`ihub-status-value ${acceptanceStates.marketing ? 'accepted' : 'declined'}`}>
                      {acceptanceStates.marketing ? '✓ Opted In' : '○ Declined'}
                    </span>
                  </div>
                  
                  <div className="ihub-status-item">
                    <span className="ihub-status-label">Cookies:</span>
                    <span className={`ihub-status-value ${acceptanceStates.cookies ? 'accepted' : 'declined'}`}>
                      {acceptanceStates.cookies ? '✓ Accepted' : '○ Declined'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="ihub-primary-btn"
                disabled={
                  isSubmitting ||
                  !acceptanceStates.terms ||
                  !acceptanceStates.privacy ||
                  !formData.username ||
                  !formData.email ||
                  !formData.password
                }
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Customization Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Customization Options</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Compact Version</h3>
              </div>
              <div className="ihub-card-body">
                <ReadTermsAndCondition
                  title="Quick Agreement"
                  content="I agree to the terms and conditions and privacy policy."
                  required={true}
                  checked={false}
                  onChange={() => {}}
                  compact={true}
                  className="ihub-terms-compact"
                />
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>With External Links</h3>
              </div>
              <div className="ihub-card-body">
                <ReadTermsAndCondition
                  title="External Documents"
                  content="I have read and agree to the terms and conditions."
                  required={true}
                  checked={false}
                  onChange={() => {}}
                  externalLinks={[
                    { text: "Read full Terms", url: "/terms" },
                    { text: "Privacy Policy", url: "/privacy" },
                  ]}
                  className="ihub-terms-external"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Implementation Guide</h2>
        <div className="ihub-card ihub-p-4">
          <h3>Props Interface:</h3>
          <pre className="ihub-code-block">
{`interface ReadTermsAndConditionProps {
  title: string;                        // Agreement title
  content: string;                      // Agreement text content
  required?: boolean;                   // Whether acceptance is required
  checked: boolean;                     // Current acceptance state
  onChange: (accepted: boolean) => void; // Acceptance change handler
  className?: string;                   // CSS classes
  compact?: boolean;                    // Compact display mode
  showLastUpdated?: boolean;            // Show last updated date
  lastUpdatedDate?: string;             // Last updated date
  externalLinks?: Array<{               // External document links
    text: string;
    url: string;
  }>;
  maxHeight?: string;                   // Max height for scrollable content
  trackingId?: string;                  // Tracking identifier
}`}
          </pre>
          
          <h3 className="ihub-mt-3">Key Features:</h3>
          <ul>
            <li><strong>Content Display:</strong> Scrollable text areas with proper formatting</li>
            <li><strong>Validation:</strong> Required field validation with visual feedback</li>
            <li><strong>Tracking:</strong> Acceptance tracking with timestamps</li>
            <li><strong>Responsive:</strong> Mobile-friendly display and interaction</li>
            <li><strong>Accessibility:</strong> Screen reader compatible with proper labels</li>
            <li><strong>Customizable:</strong> Flexible styling and layout options</li>
          </ul>
          
          <h3 className="ihub-mt-3">Best Practices:</h3>
          <ul>
            <li>Keep terms content clear and readable</li>
            <li>Use plain language where possible</li>
            <li>Provide links to full legal documents</li>
            <li>Track acceptance with timestamps for legal compliance</li>
            <li>Make required agreements clear and prominent</li>
            <li>Allow users to review terms before accepting</li>
            <li>Implement proper validation and error handling</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ReadTermsAndConditionExamples;
```

## 🔗 Related Components

- [ActionDropdown](./ActionDropdown.md) - Dropdown component for actions
- [AnimatedBox](./AnimatedBox.md) - Animated container component
- [PasswordField](./PasswordField.md) - Secure password input field
- [DateInput](./DateInput.md) - Date selection input field
- [DateTimeInput](./DateTimeInput.md) - Date and time selection input field

