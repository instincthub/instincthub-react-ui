# RadioSimple

**Category:** Forms | **Type:** component

Simple radio button component

## 🏷️ Tags

`forms`, `radio`, `simple`, `input`

```tsx
"use client";
import React, { useState } from "react";
import { RadioSimple } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Example component demonstrating various ways to use the RadioSimple
 */
const RadioSimpleExamples = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [newsletterPreference, setNewsletterPreference] = useState<string>("weekly");
  const [privacySettings, setPrivacySettings] = useState({
    public: false,
    friends: true,
    private: false,
  });

  // Handle individual radio button changes
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
    openToast(`Selected: ${e.target.value}`);
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeToTerms(e.target.checked);
    openToast(e.target.checked ? "Terms accepted" : "Terms declined");
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPayment(e.target.value);
    console.log("Payment method selected:", e.target.value);
  };

  const handleNewsletterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewsletterPreference(e.target.value);
    console.log("Newsletter preference:", e.target.value);
  };

  const handlePrivacyChange = (setting: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    // Clear other privacy settings when one is selected
    setPrivacySettings({
      public: false,
      friends: false,
      private: false,
      [setting]: true,
    });
    openToast(`Privacy set to: ${setting}`);
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      selectedOption,
      agreeToTerms,
      selectedPayment,
      newsletterPreference,
      privacySettings: Object.keys(privacySettings).find(key => 
        privacySettings[key as keyof typeof privacySettings]
      ),
    };
    
    console.log("Form submitted:", formData);
    openToast("Form submitted successfully!");
  };

  // Validation
  const validateForm = () => {
    const errors = [];
    if (!selectedOption) errors.push("Please select an option");
    if (!agreeToTerms) errors.push("Please agree to terms");
    if (!selectedPayment) errors.push("Please select payment method");
    
    if (errors.length > 0) {
      openToast(`Validation errors: ${errors.join(", ")}`);
      return false;
    }
    
    openToast("All fields are valid!");
    return true;
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>RadioSimple Examples</h1>

      <form onSubmit={handleSubmit}>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            {/* Basic RadioSimple group */}
            <div className="ihub-mb-4">
              <h3>Basic Selection Options</h3>
              <p className="ihub-mb-3">Choose your preferred option:</p>
              
              <RadioSimple
                id="option-1"
                name="basicOptions"
                value="option1"
                label="Option 1 - Basic Plan"
                checked={selectedOption === "option1"}
                onChange={handleOptionChange}
              />
              
              <RadioSimple
                id="option-2"
                name="basicOptions"
                value="option2"
                label="Option 2 - Premium Plan"
                checked={selectedOption === "option2"}
                onChange={handleOptionChange}
              />
              
              <RadioSimple
                id="option-3"
                name="basicOptions"
                value="option3"
                label="Option 3 - Enterprise Plan"
                checked={selectedOption === "option3"}
                onChange={handleOptionChange}
                note="Best value for large teams"
              />
            </div>

            {/* Agreement checkbox style */}
            <div className="ihub-mb-4">
              <h3>Terms and Conditions</h3>
              <RadioSimple
                id="terms-agree"
                name="terms"
                value="agree"
                label="I agree to the Terms and Conditions"
                checked={agreeToTerms}
                onChange={handleTermsChange}
                note="Required to proceed with registration"
              />
            </div>

            {/* Payment method selection */}
            <div className="ihub-mb-4">
              <h3>Payment Method</h3>
              <p className="ihub-mb-3">Select your preferred payment method:</p>
              
              <RadioSimple
                id="payment-card"
                name="payment"
                value="credit-card"
                label="Credit/Debit Card"
                checked={selectedPayment === "credit-card"}
                onChange={handlePaymentChange}
              />
              
              <RadioSimple
                id="payment-paypal"
                name="payment"
                value="paypal"
                label="PayPal"
                checked={selectedPayment === "paypal"}
                onChange={handlePaymentChange}
              />
              
              <RadioSimple
                id="payment-bank"
                name="payment"
                value="bank-transfer"
                label="Bank Transfer"
                checked={selectedPayment === "bank-transfer"}
                onChange={handlePaymentChange}
                note="Processing may take 2-3 business days"
              />
            </div>
          </div>

          <div className="ihub-col-md-6">
            {/* Newsletter preferences */}
            <div className="ihub-mb-4">
              <h3>Newsletter Frequency</h3>
              <p className="ihub-mb-3">How often would you like to receive updates?</p>
              
              <RadioSimple
                id="newsletter-daily"
                name="newsletter"
                value="daily"
                label="Daily Updates"
                checked={newsletterPreference === "daily"}
                onChange={handleNewsletterChange}
              />
              
              <RadioSimple
                id="newsletter-weekly"
                name="newsletter"
                value="weekly"
                label="Weekly Summary (Recommended)"
                checked={newsletterPreference === "weekly"}
                onChange={handleNewsletterChange}
              />
              
              <RadioSimple
                id="newsletter-monthly"
                name="newsletter"
                value="monthly"
                label="Monthly Digest"
                checked={newsletterPreference === "monthly"}
                onChange={handleNewsletterChange}
              />
              
              <RadioSimple
                id="newsletter-none"
                name="newsletter"
                value="none"
                label="No Newsletter"
                checked={newsletterPreference === "none"}
                onChange={handleNewsletterChange}
              />
            </div>

            {/* Privacy settings */}
            <div className="ihub-mb-4">
              <h3>Privacy Settings</h3>
              <p className="ihub-mb-3">Who can see your profile?</p>
              
              <RadioSimple
                id="privacy-public"
                name="privacy"
                value="public"
                label="Public - Anyone can see my profile"
                checked={privacySettings.public}
                onChange={handlePrivacyChange("public")}
              />
              
              <RadioSimple
                id="privacy-friends"
                name="privacy"
                value="friends"
                label="Friends Only - Only my connections"
                checked={privacySettings.friends}
                onChange={handlePrivacyChange("friends")}
              />
              
              <RadioSimple
                id="privacy-private"
                name="privacy"
                value="private"
                label="Private - Only me"
                checked={privacySettings.private}
                onChange={handlePrivacyChange("private")}
                note="Most secure option"
              />
            </div>
          </div>
        </div>

        <div className="ihub-mt-4 ihub-d-flex ihub-gap-3">
          <button
            type="button"
            className="ihub-outlined-btn"
            onClick={validateForm}
          >
            Validate Form
          </button>
          <button type="submit" className="ihub-important-btn">
            Submit Preferences
          </button>
          <button
            type="button"
            className="ihub-danger-btn"
            onClick={() => {
              setSelectedOption("");
              setAgreeToTerms(false);
              setSelectedPayment("");
              setNewsletterPreference("weekly");
              setPrivacySettings({ public: false, friends: true, private: false });
              openToast("Form reset to defaults");
            }}
          >
            Reset to Defaults
          </button>
        </div>
      </form>

      {/* Current selections display */}
      <div className="ihub-mt-5 ihub-p-4" style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
        <h3>Current Selections</h3>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <ul>
              <li><strong>Basic Option:</strong> {selectedOption || "None selected"}</li>
              <li><strong>Terms Agreed:</strong> {agreeToTerms ? "Yes" : "No"}</li>
              <li><strong>Payment Method:</strong> {selectedPayment || "None selected"}</li>
            </ul>
          </div>
          <div className="ihub-col-md-6">
            <ul>
              <li><strong>Newsletter:</strong> {newsletterPreference}</li>
              <li><strong>Privacy:</strong> {
                Object.keys(privacySettings).find(key => 
                  privacySettings[key as keyof typeof privacySettings]
                ) || "None selected"
              }</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Real-world examples */}
      <div className="ihub-mt-5">
        <h2>Real-world Integration Examples</h2>

        {/* Survey rating */}
        <div className="ihub-mb-4">
          <h3>Customer Satisfaction Rating</h3>
          <p className="ihub-mb-3">How would you rate your experience?</p>
          
          {[1, 2, 3, 4, 5].map((rating) => (
            <RadioSimple
              key={rating}
              id={`rating-${rating}`}
              name="satisfaction"
              value={rating.toString()}
              label={`${rating} Star${rating > 1 ? 's' : ''} ${
                rating === 1 ? '(Poor)' : 
                rating === 2 ? '(Fair)' : 
                rating === 3 ? '(Good)' : 
                rating === 4 ? '(Very Good)' : 
                '(Excellent)'
              }`}
              checked={false}
              onChange={(e) => {
                console.log(`Customer rated: ${e.target.value} stars`);
                openToast(`Thank you for rating us ${e.target.value} stars!`);
              }}
            />
          ))}
        </div>

        {/* Product configuration */}
        <div className="ihub-mb-4">
          <h3>Product Size Selection</h3>
          <p className="ihub-mb-3">Select your preferred size:</p>
          
          {[
            { value: "xs", label: "Extra Small (XS)", price: "$19.99" },
            { value: "s", label: "Small (S)", price: "$24.99" },
            { value: "m", label: "Medium (M)", price: "$29.99" },
            { value: "l", label: "Large (L)", price: "$34.99" },
            { value: "xl", label: "Extra Large (XL)", price: "$39.99" },
          ].map((size) => (
            <RadioSimple
              key={size.value}
              id={`size-${size.value}`}
              name="productSize"
              value={size.value}
              label={`${size.label} - ${size.price}`}
              checked={false}
              onChange={(e) => {
                const selectedSize = e.target.value.toUpperCase();
                openToast(`Size ${selectedSize} selected`);
              }}
            />
          ))}
        </div>

        {/* Notification preferences */}
        <div className="ihub-mb-4">
          <h3>Notification Preferences</h3>
          <p className="ihub-mb-3">How would you like to be notified?</p>
          
          <RadioSimple
            id="notify-email"
            name="notifications"
            value="email"
            label="Email Notifications Only"
            checked={false}
            onChange={(e) => openToast("Email notifications enabled")}
            note="We'll send updates to your registered email"
          />
          
          <RadioSimple
            id="notify-sms"
            name="notifications"
            value="sms"
            label="SMS Notifications Only"
            checked={false}
            onChange={(e) => openToast("SMS notifications enabled")}
            note="Standard messaging rates may apply"
          />
          
          <RadioSimple
            id="notify-both"
            name="notifications"
            value="both"
            label="Both Email and SMS"
            checked={false}
            onChange={(e) => openToast("All notifications enabled")}
          />
          
          <RadioSimple
            id="notify-none"
            name="notifications"
            value="none"
            label="No Notifications"
            checked={false}
            onChange={(e) => openToast("All notifications disabled")}
          />
        </div>
      </div>
    </div>
  );
};

export default RadioSimpleExamples;
```

## 🔗 Related Components

- [RadioField](./RadioField.md) - Radio field with label and validation
- [RadioGroup](./RadioGroup.md) - Group of radio buttons with state management
- [CheckBoxes](./CheckBoxes.md) - Checkbox input component
- [ToggleButton](./ToggleButton.md) - Toggle button component