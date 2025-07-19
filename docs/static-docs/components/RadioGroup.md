# RadioGroup

**Category:** Forms | **Type:** component

Group of radio buttons with state management

## 🏷️ Tags

`forms`, `radio`, `group`, `fieldset`, `accessibility`

```tsx
"use client";
import React, { useState } from "react";
import { RadioGroup } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Example component demonstrating various ways to use the RadioGroup
 */
const RadioGroupExamples = () => {
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<string>("medium");
  const [selectedDelivery, setSelectedDelivery] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [formData, setFormData] = useState({
    accountType: "",
    subscription: "",
    support: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Options for different scenarios
  const genderOptions = [
    { id: "male", value: "male", label: "Male" },
    { id: "female", value: "female", label: "Female" },
    { id: "non-binary", value: "non-binary", label: "Non-binary" },
    { id: "prefer-not-to-say", value: "prefer-not-to-say", label: "Prefer not to say" },
  ];

  const priorityOptions = [
    { 
      id: "low", 
      value: "low", 
      label: "Low Priority", 
      helpText: "Response within 7 business days" 
    },
    { 
      id: "medium", 
      value: "medium", 
      label: "Medium Priority", 
      helpText: "Response within 3 business days" 
    },
    { 
      id: "high", 
      value: "high", 
      label: "High Priority", 
      helpText: "Response within 24 hours" 
    },
    { 
      id: "urgent", 
      value: "urgent", 
      label: "Urgent", 
      helpText: "Immediate response required",
      disabled: false 
    },
  ];

  const deliveryOptions = [
    { id: "standard", value: "standard", label: "Standard Delivery (5-7 days) - Free" },
    { id: "express", value: "express", label: "Express Delivery (2-3 days) - $9.99" },
    { id: "overnight", value: "overnight", label: "Overnight Delivery - $24.99" },
    { id: "pickup", value: "pickup", label: "Store Pickup - Free" },
  ];

  const languageOptions = [
    { id: "en", value: "en", label: "English" },
    { id: "es", value: "es", label: "Español" },
    { id: "fr", value: "fr", label: "Français" },
    { id: "de", value: "de", label: "Deutsch" },
    { id: "it", value: "it", label: "Italiano" },
  ];

  const accountTypeOptions = [
    { 
      id: "personal", 
      value: "personal", 
      label: "Personal Account", 
      helpText: "For individual use" 
    },
    { 
      id: "business", 
      value: "business", 
      label: "Business Account", 
      helpText: "For companies and organizations" 
    },
    { 
      id: "developer", 
      value: "developer", 
      label: "Developer Account", 
      helpText: "For software developers with API access" 
    },
  ];

  const subscriptionOptions = [
    { id: "free", value: "free", label: "Free Plan (Limited features)" },
    { id: "pro", value: "pro", label: "Pro Plan ($19/month)" },
    { id: "enterprise", value: "enterprise", label: "Enterprise Plan (Custom pricing)" },
  ];

  const supportOptions = [
    { 
      id: "email", 
      value: "email", 
      label: "Email Support", 
      helpText: "Standard email support" 
    },
    { 
      id: "chat", 
      value: "chat", 
      label: "Live Chat Support", 
      helpText: "Real-time chat support during business hours" 
    },
    { 
      id: "phone", 
      value: "phone", 
      label: "Phone Support", 
      helpText: "Direct phone support with dedicated line" 
    },
  ];

  // Event handlers
  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedGender(event.target.value);
    clearError("gender");
    openToast(`Gender selected: ${event.target.value}`);
  };

  const handlePriorityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPriority(event.target.value);
    clearError("priority");
    console.log("Priority changed:", event.target.value);
  };

  const handleDeliveryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDelivery(event.target.value);
    clearError("delivery");
    
    // Show pricing information
    const deliveryPrices: Record<string, string> = {
      standard: "Free",
      express: "$9.99",
      overnight: "$24.99",
      pickup: "Free"
    };
    
    openToast(`Delivery method: ${event.target.value} - ${deliveryPrices[event.target.value]}`);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLanguage(event.target.value);
    openToast(`Language preference updated: ${event.target.value}`);
  };

  const handleFormChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    clearError(field);
  };

  const clearError = (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  // Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!selectedGender) newErrors.gender = "Please select your gender";
    if (!selectedDelivery) newErrors.delivery = "Please select a delivery method";
    if (!formData.accountType) newErrors.accountType = "Please select an account type";
    if (!formData.subscription) newErrors.subscription = "Please select a subscription plan";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      openToast("Please complete all required fields");
      return false;
    }
    
    return true;
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const formDataToSubmit = {
        gender: selectedGender,
        priority: selectedPriority,
        delivery: selectedDelivery,
        language: selectedLanguage,
        ...formData
      };
      
      console.log("Form submitted:", formDataToSubmit);
      openToast("Form submitted successfully!");
    }
  };

  // Reset form
  const resetForm = () => {
    setSelectedGender("");
    setSelectedPriority("medium");
    setSelectedDelivery("");
    setSelectedLanguage("en");
    setFormData({ accountType: "", subscription: "", support: "" });
    setErrors({});
    openToast("Form reset to default values");
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>RadioGroup Examples</h1>

      <form onSubmit={handleSubmit}>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            {/* Basic RadioGroup with validation */}
            <RadioGroup
              label="Gender Identity"
              name="gender"
              options={genderOptions}
              selectedValue={selectedGender}
              onChange={handleGenderChange}
              required={true}
              error={errors.gender}
              description="This information helps us personalize your experience"
            />

            {/* RadioGroup with help text and default selection */}
            <RadioGroup
              label="Support Priority Level"
              name="priority"
              options={priorityOptions}
              selectedValue={selectedPriority}
              onChange={handlePriorityChange}
              required={false}
              description="Choose your preferred response time for support requests"
            />

            {/* RadioGroup with pricing information */}
            <RadioGroup
              label="Delivery Method"
              name="delivery"
              options={deliveryOptions}
              selectedValue={selectedDelivery}
              onChange={handleDeliveryChange}
              required={true}
              error={errors.delivery}
              description="Select your preferred delivery option"
            />
          </div>

          <div className="ihub-col-md-6">
            {/* Inline RadioGroup */}
            <RadioGroup
              label="Language Preference"
              name="language"
              options={languageOptions}
              selectedValue={selectedLanguage}
              onChange={handleLanguageChange}
              inline={true}
              description="Choose your preferred interface language"
            />

            {/* RadioGroup in form context with validation */}
            <RadioGroup
              label="Account Type"
              name="accountType"
              options={accountTypeOptions}
              selectedValue={formData.accountType}
              onChange={handleFormChange("accountType")}
              required={true}
              error={errors.accountType}
              description="Select the type of account that best fits your needs"
            />

            {/* Conditional RadioGroup */}
            {formData.accountType && (
              <RadioGroup
                label="Subscription Plan"
                name="subscription"
                options={subscriptionOptions}
                selectedValue={formData.subscription}
                onChange={handleFormChange("subscription")}
                required={true}
                error={errors.subscription}
                description={`Available plans for ${formData.accountType} accounts`}
              />
            )}

            {/* RadioGroup with conditional options */}
            {formData.subscription && formData.subscription !== "free" && (
              <RadioGroup
                label="Support Level"
                name="support"
                options={supportOptions}
                selectedValue={formData.support}
                onChange={handleFormChange("support")}
                required={false}
                description="Additional support options for paid plans"
              />
            )}
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
            Submit Application
          </button>
          <button
            type="button"
            className="ihub-danger-btn"
            onClick={resetForm}
          >
            Reset Form
          </button>
        </div>
      </form>

      {/* Current selections display */}
      <div className="ihub-mt-5 ihub-p-4" style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
        <h3>Current Selections</h3>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <ul>
              <li><strong>Gender:</strong> {selectedGender || "Not selected"}</li>
              <li><strong>Priority:</strong> {selectedPriority}</li>
              <li><strong>Delivery:</strong> {selectedDelivery || "Not selected"}</li>
              <li><strong>Language:</strong> {selectedLanguage}</li>
            </ul>
          </div>
          <div className="ihub-col-md-6">
            <ul>
              <li><strong>Account Type:</strong> {formData.accountType || "Not selected"}</li>
              <li><strong>Subscription:</strong> {formData.subscription || "Not selected"}</li>
              <li><strong>Support Level:</strong> {formData.support || "Not selected"}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Real-world scenarios */}
      <div className="ihub-mt-5">
        <h2>Real-world Integration Examples</h2>

        {/* Survey example */}
        <div className="ihub-mb-4">
          <h3>Customer Feedback Survey</h3>
          <RadioGroup
            label="How likely are you to recommend our service?"
            name="nps"
            options={[
              { id: "0-6", value: "detractor", label: "0-6 (Detractor)" },
              { id: "7-8", value: "passive", label: "7-8 (Passive)" },
              { id: "9-10", value: "promoter", label: "9-10 (Promoter)" },
            ]}
            selectedValue=""
            onChange={(e) => {
              console.log("NPS Score:", e.target.value);
              const messages = {
                detractor: "We're sorry to hear that. How can we improve?",
                passive: "Thank you for your feedback. What would make you more likely to recommend us?",
                promoter: "Thank you! We'd love to know what you liked most about our service."
              };
              openToast(messages[e.target.value as keyof typeof messages]);
            }}
            required={true}
            description="Net Promoter Score helps us understand customer satisfaction"
          />
        </div>

        {/* Product configuration */}
        <div className="ihub-mb-4">
          <h3>Product Configuration</h3>
          <RadioGroup
            label="Product Warranty"
            name="warranty"
            options={[
              { 
                id: "standard", 
                value: "standard", 
                label: "Standard Warranty (1 year)", 
                helpText: "Covers manufacturing defects" 
              },
              { 
                id: "extended", 
                value: "extended", 
                label: "Extended Warranty (3 years) - +$99", 
                helpText: "Covers manufacturing defects and accidental damage" 
              },
              { 
                id: "premium", 
                value: "premium", 
                label: "Premium Warranty (5 years) - +$199", 
                helpText: "Full coverage including on-site service" 
              },
            ]}
            selectedValue=""
            onChange={(e) => {
              const costs = { standard: 0, extended: 99, premium: 199 };
              const cost = costs[e.target.value as keyof typeof costs];
              openToast(`Warranty selected. Additional cost: $${cost}`);
            }}
            inline={false}
            description="Choose the warranty coverage that's right for you"
          />
        </div>
      </div>
    </div>
  );
};

export default RadioGroupExamples;
```

## 🔗 Related Components

- [RadioField](./RadioField.md) - Radio field with label and validation
- [RadioSimple](./RadioSimple.md) - Simple radio button component
- [CheckBoxes](./CheckBoxes.md) - Checkbox input component
- [InputText](./InputText.md) - Text input component