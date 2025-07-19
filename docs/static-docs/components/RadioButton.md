# RadioButton

**Category:** Form | **Type:** component

RadioButton provides accessible, customizable radio button components for single-choice selection. Includes both individual RadioButton and RadioGroup components for managing collections of related options.

## 🏷️ Tags

`form`, `input`, `selection`, `radio`, `choice`, `accessible`

```tsx
"use client";
import React, { useState } from "react";
import { RadioButton, RadioGroup } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive RadioButton examples demonstrating various use cases
 */
const RadioButtonExamples = () => {
  // Basic radio button state
  const [basicValue, setBasicValue] = useState<string>("");
  
  // Form states for different examples
  const [gender, setGender] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("credit-card");
  const [deliveryOption, setDeliveryOption] = useState<string>("standard");
  const [subscriptionPlan, setSubscriptionPlan] = useState<string>("basic");
  const [surveyAnswer, setSurveyAnswer] = useState<string>("");
  const [preferredContact, setPreferredContact] = useState<string>("email");
  
  // Form validation states
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    experience: "",
    recommendation: "",
  });

  // Handler functions
  const handleBasicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBasicValue(e.target.value);
    openToast(`Selected: ${e.target.value}`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gender) {
      setShowErrors(true);
      openToast("Please select a gender", "error");
      return;
    }
    openToast("Form submitted successfully!", "success");
    console.log("Form data:", { gender, paymentMethod, deliveryOption });
  };

  const handleSurveySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Survey data:", formData);
    openToast("Thank you for your feedback!", "success");
  };

  // Options for RadioGroup examples
  const genderOptions = [
    { id: "gender-male", value: "male", label: "Male" },
    { id: "gender-female", value: "female", label: "Female" },
    { id: "gender-other", value: "other", label: "Other" },
    { id: "gender-prefer-not", value: "prefer-not", label: "Prefer not to say" },
  ];

  const paymentOptions = [
    { 
      id: "payment-credit", 
      value: "credit-card", 
      label: "Credit Card",
      helpText: "Visa, MasterCard, American Express"
    },
    { 
      id: "payment-debit", 
      value: "debit-card", 
      label: "Debit Card",
      helpText: "Direct bank card payment"
    },
    { 
      id: "payment-paypal", 
      value: "paypal", 
      label: "PayPal",
      helpText: "Secure online payment"
    },
    { 
      id: "payment-crypto", 
      value: "cryptocurrency", 
      label: "Cryptocurrency",
      helpText: "Bitcoin, Ethereum, etc.",
      disabled: true
    },
  ];

  const deliveryOptions = [
    { 
      id: "delivery-standard", 
      value: "standard", 
      label: "Standard Delivery (5-7 days) - Free"
    },
    { 
      id: "delivery-express", 
      value: "express", 
      label: "Express Delivery (2-3 days) - $9.99"
    },
    { 
      id: "delivery-overnight", 
      value: "overnight", 
      label: "Overnight Delivery - $19.99"
    },
  ];

  const subscriptionOptions = [
    { 
      id: "plan-basic", 
      value: "basic", 
      label: "Basic Plan - $9.99/month",
      helpText: "Perfect for individuals"
    },
    { 
      id: "plan-pro", 
      value: "pro", 
      label: "Pro Plan - $19.99/month",
      helpText: "Great for small teams"
    },
    { 
      id: "plan-enterprise", 
      value: "enterprise", 
      label: "Enterprise Plan - $49.99/month",
      helpText: "Best for large organizations"
    },
  ];

  const contactOptions = [
    { id: "contact-email", value: "email", label: "Email" },
    { id: "contact-phone", value: "phone", label: "Phone" },
    { id: "contact-sms", value: "sms", label: "SMS/Text" },
    { id: "contact-none", value: "none", label: "Do not contact me" },
  ];

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>RadioButton Examples</h1>
      
      {/* Basic Individual Radio Buttons */}
      <section className="ihub-mb-5">
        <h2>Basic Radio Buttons</h2>
        <p className="ihub-text-muted ihub-mb-3">
          Individual radio buttons for simple selections
        </p>
        
        <div className="ihub-card ihub-p-4">
          <h3 className="ihub-mb-3">Choose your favorite color:</h3>
          
          <RadioButton
            id="color-red"
            name="favorite-color"
            value="red"
            label="Red"
            checked={basicValue === "red"}
            onChange={handleBasicChange}
          />
          
          <RadioButton
            id="color-blue"
            name="favorite-color"
            value="blue"
            label="Blue"
            checked={basicValue === "blue"}
            onChange={handleBasicChange}
            className="ihub-mt-2"
          />
          
          <RadioButton
            id="color-green"
            name="favorite-color"
            value="green"
            label="Green"
            checked={basicValue === "green"}
            onChange={handleBasicChange}
            className="ihub-mt-2"
          />
          
          <RadioButton
            id="color-purple"
            name="favorite-color"
            value="purple"
            label="Purple (Not available)"
            checked={basicValue === "purple"}
            onChange={handleBasicChange}
            disabled
            className="ihub-mt-2"
          />
          
          {basicValue && (
            <p className="ihub-mt-3 ihub-text-success">
              You selected: <strong>{basicValue}</strong>
            </p>
          )}
        </div>
      </section>

      {/* RadioGroup Examples */}
      <section className="ihub-mb-5">
        <h2>RadioGroup Component</h2>
        <p className="ihub-text-muted ihub-mb-3">
          Group related radio buttons with a common label
        </p>
        
        {/* Gender Selection with Validation */}
        <div className="ihub-card ihub-p-4 ihub-mb-3">
          <form onSubmit={handleFormSubmit}>
            <RadioGroup
              label="Gender"
              name="gender"
              options={genderOptions}
              selectedValue={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              error={showErrors && !gender ? "Please select a gender" : ""}
              description="This information helps us personalize your experience"
            />
            
            <button type="submit" className="ihub-primary-btn ihub-mt-3">
              Submit Form
            </button>
          </form>
        </div>

        {/* Payment Method Selection */}
        <div className="ihub-card ihub-p-4 ihub-mb-3">
          <RadioGroup
            label="Payment Method"
            name="payment"
            options={paymentOptions}
            selectedValue={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            description="Select your preferred payment method"
          />
        </div>

        {/* Inline Radio Group */}
        <div className="ihub-card ihub-p-4 ihub-mb-3">
          <RadioGroup
            label="Preferred Contact Method"
            name="contact-method"
            options={contactOptions}
            selectedValue={preferredContact}
            onChange={(e) => setPreferredContact(e.target.value)}
            inline
            description="How would you like us to contact you?"
          />
        </div>
      </section>

      {/* Practical Use Cases */}
      <section className="ihub-mb-5">
        <h2>Practical Use Cases</h2>
        
        {/* E-commerce Delivery Options */}
        <div className="ihub-card ihub-p-4 ihub-mb-3">
          <h3>Delivery Options</h3>
          <RadioGroup
            label="Select Delivery Method"
            name="delivery"
            options={deliveryOptions}
            selectedValue={deliveryOption}
            onChange={(e) => setDeliveryOption(e.target.value)}
          />
          
          <div className="ihub-mt-3 ihub-p-3 ihub-bg-light">
            <strong>Selected:</strong> {deliveryOption}
            {deliveryOption === "express" && " (+$9.99)"}
            {deliveryOption === "overnight" && " (+$19.99)"}
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="ihub-card ihub-p-4 ihub-mb-3">
          <h3>Choose Your Plan</h3>
          <RadioGroup
            label="Subscription Plans"
            name="subscription"
            options={subscriptionOptions}
            selectedValue={subscriptionPlan}
            onChange={(e) => setSubscriptionPlan(e.target.value)}
            className="ihub-subscription-plans"
          />
          
          <button className="ihub-important-btn ihub-mt-3">
            Continue with {subscriptionPlan} plan
          </button>
        </div>

        {/* Survey Form */}
        <div className="ihub-card ihub-p-4">
          <h3>Customer Satisfaction Survey</h3>
          <form onSubmit={handleSurveySubmit}>
            <RadioGroup
              label="How would you rate your experience?"
              name="experience"
              options={[
                { id: "exp-excellent", value: "excellent", label: "Excellent" },
                { id: "exp-good", value: "good", label: "Good" },
                { id: "exp-average", value: "average", label: "Average" },
                { id: "exp-poor", value: "poor", label: "Poor" },
              ]}
              selectedValue={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              required
              className="ihub-mb-4"
            />
            
            <RadioGroup
              label="Would you recommend us to a friend?"
              name="recommendation"
              options={[
                { id: "rec-definitely", value: "definitely", label: "Definitely" },
                { id: "rec-probably", value: "probably", label: "Probably" },
                { id: "rec-not-sure", value: "not-sure", label: "Not Sure" },
                { id: "rec-no", value: "no", label: "No" },
              ]}
              selectedValue={formData.recommendation}
              onChange={(e) => setFormData({ ...formData, recommendation: e.target.value })}
              required
              inline
            />
            
            <button type="submit" className="ihub-primary-btn ihub-mt-4">
              Submit Survey
            </button>
          </form>
        </div>
      </section>

      {/* Custom Styling Examples */}
      <section className="ihub-mb-5">
        <h2>Custom Styling</h2>
        <div className="ihub-card ihub-p-4">
          <h3>Size Variations</h3>
          
          <RadioButton
            id="size-small"
            name="custom-size"
            value="small"
            label="Small Text"
            fontSize="ihub-fs-xs"
            className="ihub-mb-2"
          />
          
          <RadioButton
            id="size-medium"
            name="custom-size"
            value="medium"
            label="Medium Text (Default)"
            fontSize="ihub-fs-sm"
            className="ihub-mb-2"
          />
          
          <RadioButton
            id="size-large"
            name="custom-size"
            value="large"
            label="Large Text"
            fontSize="ihub-fs-md"
            className="ihub-mb-2"
          />
          
          <RadioButton
            id="size-xlarge"
            name="custom-size"
            value="xlarge"
            label="Extra Large Text"
            fontSize="ihub-fs-lg"
          />
        </div>
      </section>

      {/* Accessibility Features */}
      <section className="ihub-mb-5">
        <h2>Accessibility Features</h2>
        <div className="ihub-card ihub-p-4">
          <p className="ihub-mb-3">
            Our RadioButton components include built-in accessibility features:
          </p>
          <ul>
            <li>Proper ARIA labels and descriptions</li>
            <li>Keyboard navigation support</li>
            <li>Screen reader friendly</li>
            <li>Error announcements for validation</li>
            <li>Required field indicators</li>
            <li>Fieldset and legend for grouped options</li>
          </ul>
          
          <RadioButton
            id="accessibility-demo"
            name="accessibility"
            value="demo"
            label="Accessible Radio Button"
            helpText="This radio button includes help text for additional context"
            required
          />
        </div>
      </section>
    </div>
  );
};

export default RadioButtonExamples;
```

## 🔗 Related Components

- [CheckBoxes](./CheckBoxes.md) - Multiple selection component
- [ToggleButton](./ToggleButton.md) - Binary on/off selection
- [InputText](./InputText.md) - Text input component
- [InputNumber](./InputNumber.md) - Numerical input component
- [TextField](./TextField.md) - Enhanced text field with validation

