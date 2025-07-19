# RadioField

**Category:** Forms | **Type:** component

Radio field with label and validation

## 🏷️ Tags

`forms`, `radio`, `input`, `validation`

```tsx
"use client";
import React, { useState } from "react";
import { RadioField } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Example component demonstrating various ways to use the RadioField
 */
const RadioFieldExamples = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [selectedPreference, setSelectedPreference] = useState<string>("");
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [formData, setFormData] = useState({
    subscription: "",
    notification: "",
    theme: "",
  });

  // Options for different scenarios
  const subscriptionPlans = [
    { id: "basic", title: "Basic Plan ($9/month)" },
    { id: "premium", title: "Premium Plan ($19/month)" },
    { id: "enterprise", title: "Enterprise Plan ($49/month)" },
  ];

  const notificationPreferences = [
    { id: "email", title: "Email notifications" },
    { id: "sms", title: "SMS notifications" },
    { id: "push", title: "Push notifications" },
    { id: "none", title: "No notifications" },
  ];

  const paymentMethods = [
    { id: "1", title: "Credit Card", name: "Credit Card" },
    { id: "2", title: "PayPal", name: "PayPal" },
    { id: "3", title: "Bank Transfer", name: "Bank Transfer" },
    { id: "4", title: "Cryptocurrency", name: "Cryptocurrency" },
  ];

  const themeOptions = [
    { id: "light", title: "Light Theme" },
    { id: "dark", title: "Dark Theme" },
    { id: "auto", title: "Auto (System Default)" },
  ];

  // Handle selections with detailed callbacks
  const handlePlanSelection = (value: string) => {
    setSelectedPlan(value);
    openToast(`Selected plan: ${value}`);
  };

  const handlePreferenceSelection = (value: string) => {
    setSelectedPreference(value);
    console.log("Notification preference changed:", value);
  };

  const handlePaymentSelection = (
    name: string,
    id: string,
    value: string,
    index: number
  ) => {
    setSelectedPayment(value);
    console.log("Payment method selected:", { name, id, value, index });
  };

  const handleFormChange = (fieldName: string) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Form submission handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", {
      selectedPlan,
      selectedPreference,
      selectedPayment,
      formData,
    });
    openToast("Form submitted successfully!");
  };

  // Validation example
  const validateSelection = () => {
    const errors = [];
    if (!selectedPlan) errors.push("Please select a subscription plan");
    if (!selectedPreference) errors.push("Please select notification preference");
    if (!selectedPayment) errors.push("Please select payment method");
    
    if (errors.length > 0) {
      openToast(`Validation errors: ${errors.join(", ")}`);
      return false;
    }
    return true;
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>RadioField Examples</h1>

      <form onSubmit={handleFormSubmit}>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            {/* Basic RadioField Example */}
            <RadioField
              options={subscriptionPlans}
              name="subscription"
              label="Choose Your Subscription Plan"
              required={true}
              defaultValue="basic"
              setSelectedValue={handlePlanSelection}
              note="Select the plan that best fits your needs"
            />

            {/* RadioField with notification preferences */}
            <RadioField
              options={notificationPreferences}
              name="notifications"
              label="Notification Preferences"
              required={true}
              setSelectedValue={handlePreferenceSelection}
              note="Choose how you'd like to receive updates"
            />

            {/* Advanced RadioField with detailed callback */}
            <RadioField
              options={paymentMethods}
              name="payment"
              label="Payment Method"
              required={true}
              setNameIDValueIndex={handlePaymentSelection}
              note="Select your preferred payment method"
            />
          </div>

          <div className="ihub-col-md-6">
            {/* RadioField in a form context */}
            <RadioField
              options={themeOptions}
              name="theme"
              label="Theme Preference"
              required={false}
              defaultValue="auto"
              setSelectedValue={handleFormChange("theme")}
              note="Choose your preferred interface theme"
            />

            {/* Dynamic options example */}
            <RadioField
              options={[
                { id: "yes", title: "Yes, I agree" },
                { id: "no", title: "No, I disagree" },
              ]}
              name="terms"
              label="Do you agree to the Terms of Service?"
              required={true}
              setSelectedValue={(value) => {
                console.log("Terms agreement:", value);
                if (value === "no") {
                  openToast("You must agree to the terms to continue");
                }
              }}
            />

            {/* Conditional RadioField */}
            {selectedPlan === "enterprise" && (
              <RadioField
                options={[
                  { id: "monthly", title: "Monthly billing" },
                  { id: "yearly", title: "Yearly billing (20% discount)" },
                ]}
                name="billing"
                label="Billing Frequency (Enterprise Only)"
                required={true}
                defaultValue="yearly"
                setSelectedValue={(value) => {
                  openToast(`Enterprise billing set to: ${value}`);
                }}
                note="Annual billing includes a significant discount"
              />
            )}
          </div>
        </div>

        <div className="ihub-mt-4 ihub-d-flex ihub-gap-3">
          <button
            type="button"
            className="ihub-outlined-btn"
            onClick={validateSelection}
          >
            Validate Selections
          </button>
          <button type="submit" className="ihub-important-btn">
            Submit Form
          </button>
          <button
            type="button"
            className="ihub-danger-btn"
            onClick={() => {
              setSelectedPlan("");
              setSelectedPreference("");
              setSelectedPayment("");
              setFormData({ subscription: "", notification: "", theme: "" });
              openToast("Form reset");
            }}
          >
            Reset Form
          </button>
        </div>
      </form>

      {/* Display current selections */}
      <div className="ihub-mt-5 ihub-p-4" style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
        <h3>Current Selections</h3>
        <ul>
          <li><strong>Subscription Plan:</strong> {selectedPlan || "None selected"}</li>
          <li><strong>Notification Preference:</strong> {selectedPreference || "None selected"}</li>
          <li><strong>Payment Method:</strong> {selectedPayment || "None selected"}</li>
          <li><strong>Theme:</strong> {formData.theme || "None selected"}</li>
        </ul>
      </div>

      {/* Real-world integration example */}
      <div className="ihub-mt-5">
        <h2>Real-world Integration Examples</h2>
        
        {/* Survey/questionnaire example */}
        <div className="ihub-mb-4">
          <h3>Customer Satisfaction Survey</h3>
          <RadioField
            options={[
              { id: "5", title: "Excellent (5/5)" },
              { id: "4", title: "Good (4/5)" },
              { id: "3", title: "Average (3/5)" },
              { id: "2", title: "Poor (2/5)" },
              { id: "1", title: "Very Poor (1/5)" },
            ]}
            name="satisfaction"
            label="How would you rate our service?"
            required={true}
            setSelectedValue={(value) => {
              console.log("Customer satisfaction rating:", value);
              if (parseInt(value) <= 2) {
                openToast("We're sorry to hear that. A support representative will contact you soon.");
              }
            }}
            note="Your feedback helps us improve our service"
          />
        </div>

        {/* Product configuration example */}
        <div className="ihub-mb-4">
          <h3>Product Configuration</h3>
          <RadioField
            options={[
              { id: "small", title: "Small (S) - $29.99" },
              { id: "medium", title: "Medium (M) - $34.99" },
              { id: "large", title: "Large (L) - $39.99" },
              { id: "xlarge", title: "Extra Large (XL) - $44.99" },
            ]}
            name="size"
            label="Select Size"
            required={true}
            setSelectedValue={(value) => {
              const prices = { small: 29.99, medium: 34.99, large: 39.99, xlarge: 44.99 };
              openToast(`Size ${value.toUpperCase()} selected. Price: $${prices[value as keyof typeof prices]}`);
            }}
            note="Prices include standard shipping"
          />
        </div>
      </div>
    </div>
  );
};

export default RadioFieldExamples;
```

## 🔗 Related Components

- [RadioGroup](./RadioGroup.md) - Group of radio buttons with state management
- [RadioSimple](./RadioSimple.md) - Simple radio button component
- [CheckBoxes](./CheckBoxes.md) - Checkbox input component
- [InputText](./InputText.md) - Text input component