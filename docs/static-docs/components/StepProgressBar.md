# StepProgressBar

**Category:** Forms | **Type:** component

Step progress indicator component for multi-step processes, forms, and workflows

## 🏷️ Tags

`forms`, `progress`, `stepper`, `wizard`, `navigation`

```tsx
"use client";
import React, { useState } from "react";
import {
  StepProgressBar,
  InputText,
  InputTextarea,
  SubmitButton,
  CheckBoxes,
  RadioButton,
} from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive examples demonstrating various ways to use the StepProgressBar
 */
const StepProgressBarExamples = () => {
  // Basic Progress Tracking
  const [basicStep, setBasicStep] = useState<number>(1);
  const [progressStep, setProgressStep] = useState<number>(2);
  
  // Multi-step Form Example
  const [formStep, setFormStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    // Personal Info (Step 1)
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    
    // Address Info (Step 2)
    address: "",
    city: "",
    state: "",
    zipCode: "",
    
    // Preferences (Step 3)
    newsletter: false,
    notifications: "email",
    comments: "",
  });

  // Onboarding Flow
  const [onboardingStep, setOnboardingStep] = useState<number>(1);
  const [onboardingData, setOnboardingData] = useState({
    role: "",
    experience: "",
    interests: [] as string[],
    goals: "",
  });

  // Checkout Process
  const [checkoutStep, setCheckoutStep] = useState<number>(1);
  const [cartItems] = useState([
    { id: 1, name: "Product A", price: 29.99, quantity: 2 },
    { id: 2, name: "Product B", price: 49.99, quantity: 1 },
  ]);
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    method: "standard",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // Survey/Assessment Flow
  const [surveyStep, setSurveyStep] = useState<number>(1);
  const [surveyAnswers, setSurveyAnswers] = useState({
    satisfaction: "",
    recommendation: "",
    feedback: "",
    improvements: [] as string[],
  });

  // Project Setup Wizard
  const [projectStep, setProjectStep] = useState<number>(1);
  const [projectData, setProjectData] = useState({
    name: "",
    type: "",
    template: "",
    features: [] as string[],
    settings: {
      public: false,
      collaborators: "",
    },
  });

  // Status tracking
  const [submitStatus, setSubmitStatus] = useState<number>(1);

  // Handle form input changes
  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOnboardingChange = (field: string, value: any) => {
    setOnboardingData(prev => ({ ...prev, [field]: value }));
  };

  const handleSurveyChange = (field: string, value: any) => {
    setSurveyAnswers(prev => ({ ...prev, [field]: value }));
  };

  const handleProjectChange = (field: string, value: any) => {
    setProjectData(prev => ({ ...prev, [field]: value }));
  };

  // Navigation functions
  const nextStep = (currentStep: number, setStep: React.Dispatch<React.SetStateAction<number>>, maxStep: number) => {
    if (currentStep < maxStep) {
      setStep(currentStep + 1);
    }
  };

  const prevStep = (currentStep: number, setStep: React.Dispatch<React.SetStateAction<number>>) => {
    if (currentStep > 1) {
      setStep(currentStep - 1);
    }
  };

  // Validation functions
  const validatePersonalInfo = () => {
    return formData.firstName && formData.lastName && formData.email && formData.phone;
  };

  const validateAddressInfo = () => {
    return formData.address && formData.city && formData.state && formData.zipCode;
  };

  const validateShipping = () => {
    return shippingInfo.address && shippingInfo.method;
  };

  const validatePayment = () => {
    return paymentInfo.cardNumber && paymentInfo.expiryDate && paymentInfo.cvv;
  };

  // Submit handlers
  const handleFormSubmit = () => {
    setSubmitStatus(2);
    setTimeout(() => {
      setSubmitStatus(1);
      openToast("Registration completed successfully!");
      console.log("Form submitted:", formData);
      // Reset form
      setFormStep(1);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        newsletter: false,
        notifications: "email",
        comments: "",
      });
    }, 2000);
  };

  const handleCheckoutSubmit = () => {
    setSubmitStatus(2);
    setTimeout(() => {
      setSubmitStatus(1);
      openToast("Order placed successfully!");
      console.log("Order submitted:", { cartItems, shippingInfo, paymentInfo });
      setCheckoutStep(1);
    }, 2000);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>StepProgressBar Examples</h1>

      {/* Basic Usage Examples */}
      <section className="ihub-mb-5">
        <h2>Basic Progress Indicators</h2>
        
        <div className="ihub-mb-4">
          <h3>Simple 4-Step Process</h3>
          <StepProgressBar step={basicStep} counts={[1, 2, 3, 4]} />
          <div className="ihub-mt-3">
            <button 
              className="ihub-outlined-btn ihub-me-2" 
              onClick={() => prevStep(basicStep, setBasicStep)}
              disabled={basicStep === 1}
            >
              Previous
            </button>
            <button 
              className="ihub-primary-btn"
              onClick={() => nextStep(basicStep, setBasicStep, 4)}
              disabled={basicStep === 4}
            >
              Next
            </button>
            <span className="ihub-ms-3">Current Step: {basicStep}</span>
          </div>
        </div>

        <div className="ihub-mb-4">
          <h3>7-Step Process with Custom Width</h3>
          <StepProgressBar 
            step={progressStep} 
            counts={[1, 2, 3, 4, 5, 6, 7]} 
            widths="800px" 
          />
          <div className="ihub-mt-3">
            <button 
              className="ihub-outlined-btn ihub-me-2"
              onClick={() => prevStep(progressStep, setProgressStep)}
              disabled={progressStep === 1}
            >
              Previous
            </button>
            <button 
              className="ihub-primary-btn"
              onClick={() => nextStep(progressStep, setProgressStep, 7)}
              disabled={progressStep === 7}
            >
              Next
            </button>
            <span className="ihub-ms-3">Step {progressStep} of 7</span>
          </div>
        </div>
      </section>

      {/* Multi-step Registration Form */}
      <section className="ihub-mb-5">
        <h2>Multi-step Registration Form</h2>
        <div className="ihub-card ihub-p-4">
          <StepProgressBar step={formStep} counts={[1, 2, 3]} widths="600px" />
          
          <div className="ihub-mt-4">
            {formStep === 1 && (
              <div>
                <h3>Personal Information</h3>
                <div className="ihub-row">
                  <div className="ihub-col-md-6">
                    <InputText
                      label="First Name"
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleFormChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="ihub-col-md-6">
                    <InputText
                      label="Last Name"
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleFormChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <InputText
                  label="Email Address"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                  required
                />
                
                <InputText
                  label="Phone Number"
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleFormChange("phone", e.target.value)}
                  required
                />
                
                <div className="ihub-mt-4">
                  <button 
                    className="ihub-primary-btn"
                    onClick={() => nextStep(formStep, setFormStep, 3)}
                    disabled={!validatePersonalInfo()}
                  >
                    Continue to Address
                  </button>
                </div>
              </div>
            )}

            {formStep === 2 && (
              <div>
                <h3>Address Information</h3>
                <InputText
                  label="Street Address"
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleFormChange("address", e.target.value)}
                  required
                />
                
                <div className="ihub-row">
                  <div className="ihub-col-md-4">
                    <InputText
                      label="City"
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleFormChange("city", e.target.value)}
                      required
                    />
                  </div>
                  <div className="ihub-col-md-4">
                    <InputText
                      label="State"
                      id="state"
                      name="state"
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleFormChange("state", e.target.value)}
                      required
                    />
                  </div>
                  <div className="ihub-col-md-4">
                    <InputText
                      label="ZIP Code"
                      id="zipCode"
                      name="zipCode"
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => handleFormChange("zipCode", e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="ihub-mt-4">
                  <button 
                    className="ihub-outlined-btn ihub-me-2"
                    onClick={() => prevStep(formStep, setFormStep)}
                  >
                    Back
                  </button>
                  <button 
                    className="ihub-primary-btn"
                    onClick={() => nextStep(formStep, setFormStep, 3)}
                    disabled={!validateAddressInfo()}
                  >
                    Continue to Preferences
                  </button>
                </div>
              </div>
            )}

            {formStep === 3 && (
              <div>
                <h3>Preferences & Additional Information</h3>
                
                <CheckBoxes
                  label="Email Newsletter"
                  id="newsletter"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={(e) => handleFormChange("newsletter", e.target.checked)}
                />
                
                <div className="ihub-mb-3">
                  <label className="ihub-form-label">Notification Preferences</label>
                  <RadioButton
                    options={[
                      { label: "Email", value: "email" },
                      { label: "SMS", value: "sms" },
                      { label: "Both", value: "both" },
                      { label: "None", value: "none" },
                    ]}
                    name="notifications"
                    selectedValue={formData.notifications}
                    onChange={(value) => handleFormChange("notifications", value)}
                  />
                </div>
                
                <InputTextarea
                  label="Additional Comments (Optional)"
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={(e) => handleFormChange("comments", e.target.value)}
                  rows={4}
                />
                
                <div className="ihub-mt-4">
                  <button 
                    className="ihub-outlined-btn ihub-me-2"
                    onClick={() => prevStep(formStep, setFormStep)}
                  >
                    Back
                  </button>
                  <SubmitButton
                    label="Complete Registration"
                    onClick={handleFormSubmit}
                    status={submitStatus}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* User Onboarding Flow */}
      <section className="ihub-mb-5">
        <h2>User Onboarding Flow</h2>
        <div className="ihub-card ihub-p-4">
          <StepProgressBar step={onboardingStep} counts={[1, 2, 3, 4]} widths="700px" />
          
          <div className="ihub-mt-4">
            {onboardingStep === 1 && (
              <div>
                <h3>Welcome! Tell us about yourself</h3>
                <div className="ihub-mb-3">
                  <label className="ihub-form-label">What's your role?</label>
                  <RadioButton
                    options={[
                      { label: "Developer", value: "developer" },
                      { label: "Designer", value: "designer" },
                      { label: "Product Manager", value: "pm" },
                      { label: "Student", value: "student" },
                      { label: "Other", value: "other" },
                    ]}
                    name="role"
                    selectedValue={onboardingData.role}
                    onChange={(value) => handleOnboardingChange("role", value)}
                  />
                </div>
                
                <div className="ihub-mt-4">
                  <button 
                    className="ihub-primary-btn"
                    onClick={() => nextStep(onboardingStep, setOnboardingStep, 4)}
                    disabled={!onboardingData.role}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {onboardingStep === 2 && (
              <div>
                <h3>Experience Level</h3>
                <div className="ihub-mb-3">
                  <label className="ihub-form-label">How would you describe your experience?</label>
                  <RadioButton
                    options={[
                      { label: "Beginner (0-1 years)", value: "beginner" },
                      { label: "Intermediate (2-5 years)", value: "intermediate" },
                      { label: "Advanced (5+ years)", value: "advanced" },
                      { label: "Expert (10+ years)", value: "expert" },
                    ]}
                    name="experience"
                    selectedValue={onboardingData.experience}
                    onChange={(value) => handleOnboardingChange("experience", value)}
                  />
                </div>
                
                <div className="ihub-mt-4">
                  <button 
                    className="ihub-outlined-btn ihub-me-2"
                    onClick={() => prevStep(onboardingStep, setOnboardingStep)}
                  >
                    Back
                  </button>
                  <button 
                    className="ihub-primary-btn"
                    onClick={() => nextStep(onboardingStep, setOnboardingStep, 4)}
                    disabled={!onboardingData.experience}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {onboardingStep === 3 && (
              <div>
                <h3>Interests & Goals</h3>
                <InputTextarea
                  label="What are your main goals with our platform?"
                  id="goals"
                  name="goals"
                  value={onboardingData.goals}
                  onChange={(e) => handleOnboardingChange("goals", e.target.value)}
                  rows={4}
                  required
                />
                
                <div className="ihub-mt-4">
                  <button 
                    className="ihub-outlined-btn ihub-me-2"
                    onClick={() => prevStep(onboardingStep, setOnboardingStep)}
                  >
                    Back
                  </button>
                  <button 
                    className="ihub-primary-btn"
                    onClick={() => nextStep(onboardingStep, setOnboardingStep, 4)}
                    disabled={!onboardingData.goals}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {onboardingStep === 4 && (
              <div>
                <h3>All Set! 🎉</h3>
                <p>Welcome to the platform! Here's what you told us:</p>
                <ul>
                  <li><strong>Role:</strong> {onboardingData.role}</li>
                  <li><strong>Experience:</strong> {onboardingData.experience}</li>
                  <li><strong>Goals:</strong> {onboardingData.goals}</li>
                </ul>
                
                <div className="ihub-mt-4">
                  <button 
                    className="ihub-outlined-btn ihub-me-2"
                    onClick={() => prevStep(onboardingStep, setOnboardingStep)}
                  >
                    Back
                  </button>
                  <button 
                    className="ihub-important-btn"
                    onClick={() => {
                      openToast("Onboarding completed!");
                      setOnboardingStep(1);
                      setOnboardingData({ role: "", experience: "", interests: [], goals: "" });
                    }}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* E-commerce Checkout Process */}
      <section className="ihub-mb-5">
        <h2>E-commerce Checkout Process</h2>
        <div className="ihub-card ihub-p-4">
          <StepProgressBar step={checkoutStep} counts={[1, 2, 3]} widths="600px" />
          
          <div className="ihub-mt-4">
            {checkoutStep === 1 && (
              <div>
                <h3>Review Your Cart</h3>
                <div className="ihub-mb-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="ihub-d-flex ihub-justify-content-between ihub-align-items-center ihub-mb-2 ihub-p-3 border">
                      <div>
                        <strong>{item.name}</strong>
                        <div className="ihub-text-muted">Qty: {item.quantity}</div>
                      </div>
                      <div className="ihub-text-end">
                        <div>${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                  <div className="ihub-text-end ihub-mt-3">
                    <strong>
                      Total: ${cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                    </strong>
                  </div>
                </div>
                
                <div className="ihub-mt-4">
                  <button 
                    className="ihub-primary-btn"
                    onClick={() => nextStep(checkoutStep, setCheckoutStep, 3)}
                  >
                    Proceed to Shipping
                  </button>
                </div>
              </div>
            )}

            {checkoutStep === 2 && (
              <div>
                <h3>Shipping Information</h3>
                <InputText
                  label="Shipping Address"
                  id="shippingAddress"
                  name="shippingAddress"
                  type="text"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                  required
                />
                
                <div className="ihub-mb-3">
                  <label className="ihub-form-label">Shipping Method</label>
                  <RadioButton
                    options={[
                      { label: "Standard (5-7 days) - Free", value: "standard" },
                      { label: "Express (2-3 days) - $9.99", value: "express" },
                      { label: "Overnight - $19.99", value: "overnight" },
                    ]}
                    name="shippingMethod"
                    selectedValue={shippingInfo.method}
                    onChange={(value) => setShippingInfo(prev => ({ ...prev, method: value }))}
                  />
                </div>
                
                <div className="ihub-mt-4">
                  <button 
                    className="ihub-outlined-btn ihub-me-2"
                    onClick={() => prevStep(checkoutStep, setCheckoutStep)}
                  >
                    Back to Cart
                  </button>
                  <button 
                    className="ihub-primary-btn"
                    onClick={() => nextStep(checkoutStep, setCheckoutStep, 3)}
                    disabled={!validateShipping()}
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {checkoutStep === 3 && (
              <div>
                <h3>Payment Information</h3>
                <InputText
                  label="Card Number"
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  value={paymentInfo.cardNumber}
                  onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardNumber: e.target.value }))}
                  placeholder="1234 5678 9012 3456"
                  required
                />
                
                <div className="ihub-row">
                  <div className="ihub-col-md-6">
                    <InputText
                      label="Expiry Date"
                      id="expiryDate"
                      name="expiryDate"
                      type="text"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo(prev => ({ ...prev, expiryDate: e.target.value }))}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="ihub-col-md-6">
                    <InputText
                      label="CVV"
                      id="cvv"
                      name="cvv"
                      type="text"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo(prev => ({ ...prev, cvv: e.target.value }))}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
                
                <div className="ihub-mt-4">
                  <button 
                    className="ihub-outlined-btn ihub-me-2"
                    onClick={() => prevStep(checkoutStep, setCheckoutStep)}
                  >
                    Back to Shipping
                  </button>
                  <SubmitButton
                    label="Place Order"
                    onClick={handleCheckoutSubmit}
                    status={submitStatus}
                    disabled={!validatePayment()}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Survey/Assessment Flow */}
      <section className="ihub-mb-5">
        <h2>Survey/Assessment Flow</h2>
        <div className="ihub-card ihub-p-4">
          <StepProgressBar step={surveyStep} counts={[1, 2, 3, 4]} widths="700px" />
          
          <div className="ihub-mt-4">
            {surveyStep === 1 && (
              <div>
                <h3>Customer Satisfaction Survey</h3>
                <div className="ihub-mb-3">
                  <label className="ihub-form-label">How satisfied are you with our service?</label>
                  <RadioButton
                    options={[
                      { label: "Very Satisfied", value: "very-satisfied" },
                      { label: "Satisfied", value: "satisfied" },
                      { label: "Neutral", value: "neutral" },
                      { label: "Dissatisfied", value: "dissatisfied" },
                      { label: "Very Dissatisfied", value: "very-dissatisfied" },
                    ]}
                    name="satisfaction"
                    selectedValue={surveyAnswers.satisfaction}
                    onChange={(value) => handleSurveyChange("satisfaction", value)}
                  />
                </div>
                
                <div className="ihub-mt-4">
                  <button 
                    className="ihub-primary-btn"
                    onClick={() => nextStep(surveyStep, setSurveyStep, 4)}
                    disabled={!surveyAnswers.satisfaction}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {surveyStep === 2 && (
              <div>
                <h3>Recommendation</h3>
                <div className="ihub-mb-3">
                  <label className="ihub-form-label">How likely are you to recommend us to others? (0-10)</label>
                  <RadioButton
                    options={[
                      { label: "0-2 (Not at all likely)", value: "0-2" },
                      { label: "3-4 (Unlikely)", value: "3-4" },
                      { label: "5-6 (Neutral)", value: "5-6" },
                      { label: "7-8 (Likely)", value: "7-8" },
                      { label: "9-10 (Extremely likely)", value: "9-10" },
                    ]}
                    name="recommendation"
                    selectedValue={surveyAnswers.recommendation}
                    onChange={(value) => handleSurveyChange("recommendation", value)}
                  />
                </div>
                
                <div className="ihub-mt-4">
                  <button 
                    className="ihub-outlined-btn ihub-me-2"
                    onClick={() => prevStep(surveyStep, setSurveyStep)}
                  >
                    Back
                  </button>
                  <button 
                    className="ihub-primary-btn"
                    onClick={() => nextStep(surveyStep, setSurveyStep, 4)}
                    disabled={!surveyAnswers.recommendation}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {surveyStep === 3 && (
              <div>
                <h3>Feedback & Suggestions</h3>
                <InputTextarea
                  label="What could we improve?"
                  id="feedback"
                  name="feedback"
                  value={surveyAnswers.feedback}
                  onChange={(e) => handleSurveyChange("feedback", e.target.value)}
                  rows={4}
                  placeholder="Your feedback helps us improve..."
                />
                
                <div className="ihub-mt-4">
                  <button 
                    className="ihub-outlined-btn ihub-me-2"
                    onClick={() => prevStep(surveyStep, setSurveyStep)}
                  >
                    Back
                  </button>
                  <button 
                    className="ihub-primary-btn"
                    onClick={() => nextStep(surveyStep, setSurveyStep, 4)}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {surveyStep === 4 && (
              <div>
                <h3>Thank You! 🙏</h3>
                <p>Thank you for taking the time to provide feedback. Your responses help us improve our service.</p>
                
                <div className="ihub-card ihub-p-3 ihub-mt-3" style={{ backgroundColor: "#f8f9fa" }}>
                  <h5>Survey Summary:</h5>
                  <ul>
                    <li><strong>Satisfaction:</strong> {surveyAnswers.satisfaction}</li>
                    <li><strong>Recommendation Score:</strong> {surveyAnswers.recommendation}</li>
                    {surveyAnswers.feedback && <li><strong>Feedback:</strong> {surveyAnswers.feedback}</li>}
                  </ul>
                </div>
                
                <div className="ihub-mt-4">
                  <button 
                    className="ihub-outlined-btn ihub-me-2"
                    onClick={() => prevStep(surveyStep, setSurveyStep)}
                  >
                    Back
                  </button>
                  <button 
                    className="ihub-important-btn"
                    onClick={() => {
                      openToast("Survey submitted successfully!");
                      setSurveyStep(1);
                      setSurveyAnswers({
                        satisfaction: "",
                        recommendation: "",
                        feedback: "",
                        improvements: [],
                      });
                    }}
                  >
                    Submit Survey
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Setup Wizard */}
      <section className="ihub-mb-5">
        <h2>Project Setup Wizard</h2>
        <div className="ihub-card ihub-p-4">
          <StepProgressBar step={projectStep} counts={[1, 2, 3, 4, 5]} widths="800px" />
          
          <div className="ihub-mt-4">
            {projectStep === 1 && (
              <div>
                <h3>Project Details</h3>
                <InputText
                  label="Project Name"
                  id="projectName"
                  name="projectName"
                  type="text"
                  value={projectData.name}
                  onChange={(e) => handleProjectChange("name", e.target.value)}
                  required
                />
                
                <div className="ihub-mt-4">
                  <button 
                    className="ihub-primary-btn"
                    onClick={() => nextStep(projectStep, setProjectStep, 5)}
                    disabled={!projectData.name}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {projectStep === 2 && (
              <div>
                <h3>Project Type</h3>
                <div className="ihub-mb-3">
                  <label className="ihub-form-label">What type of project are you creating?</label>
                  <RadioButton
                    options={[
                      { label: "Web Application", value: "web-app" },
                      { label: "Mobile App", value: "mobile-app" },
                      { label: "Desktop Application", value: "desktop-app" },
                      { label: "API/Backend", value: "api" },
                      { label: "Library/Package", value: "library" },
                    ]}
                    name="projectType"
                    selectedValue={projectData.type}
                    onChange={(value) => handleProjectChange("type", value)}
                  />
                </div>
                
                <div className="ihub-mt-4">
                  <button 
                    className="ihub-outlined-btn ihub-me-2"
                    onClick={() => prevStep(projectStep, setProjectStep)}
                  >
                    Back
                  </button>
                  <button 
                    className="ihub-primary-btn"
                    onClick={() => nextStep(projectStep, setProjectStep, 5)}
                    disabled={!projectData.type}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {projectStep === 3 && (
              <div>
                <h3>Template Selection</h3>
                <div className="ihub-mb-3">
                  <label className="ihub-form-label">Choose a starting template:</label>
                  <RadioButton
                    options={[
                      { label: "Blank Project", value: "blank" },
                      { label: "Basic Template", value: "basic" },
                      { label: "Advanced Template", value: "advanced" },
                      { label: "Enterprise Template", value: "enterprise" },
                    ]}
                    name="template"
                    selectedValue={projectData.template}
                    onChange={(value) => handleProjectChange("template", value)}
                  />
                </div>
                
                <div className="ihub-mt-4">
                  <button 
                    className="ihub-outlined-btn ihub-me-2"
                    onClick={() => prevStep(projectStep, setProjectStep)}
                  >
                    Back
                  </button>
                  <button 
                    className="ihub-primary-btn"
                    onClick={() => nextStep(projectStep, setProjectStep, 5)}
                    disabled={!projectData.template}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {projectStep === 4 && (
              <div>
                <h3>Project Settings</h3>
                <CheckBoxes
                  label="Make project public"
                  id="publicProject"
                  name="publicProject"
                  checked={projectData.settings.public}
                  onChange={(e) => handleProjectChange("settings", { 
                    ...projectData.settings, 
                    public: e.target.checked 
                  })}
                />
                
                <InputText
                  label="Initial Collaborators (Optional)"
                  id="collaborators"
                  name="collaborators"
                  type="text"
                  value={projectData.settings.collaborators}
                  onChange={(e) => handleProjectChange("settings", {
                    ...projectData.settings,
                    collaborators: e.target.value
                  })}
                  placeholder="Enter email addresses separated by commas"
                />
                
                <div className="ihub-mt-4">
                  <button 
                    className="ihub-outlined-btn ihub-me-2"
                    onClick={() => prevStep(projectStep, setProjectStep)}
                  >
                    Back
                  </button>
                  <button 
                    className="ihub-primary-btn"
                    onClick={() => nextStep(projectStep, setProjectStep, 5)}
                  >
                    Review & Create
                  </button>
                </div>
              </div>
            )}

            {projectStep === 5 && (
              <div>
                <h3>Review & Create Project</h3>
                <div className="ihub-card ihub-p-3" style={{ backgroundColor: "#f8f9fa" }}>
                  <h5>Project Summary:</h5>
                  <ul>
                    <li><strong>Name:</strong> {projectData.name}</li>
                    <li><strong>Type:</strong> {projectData.type}</li>
                    <li><strong>Template:</strong> {projectData.template}</li>
                    <li><strong>Visibility:</strong> {projectData.settings.public ? "Public" : "Private"}</li>
                    {projectData.settings.collaborators && (
                      <li><strong>Collaborators:</strong> {projectData.settings.collaborators}</li>
                    )}
                  </ul>
                </div>
                
                <div className="ihub-mt-4">
                  <button 
                    className="ihub-outlined-btn ihub-me-2"
                    onClick={() => prevStep(projectStep, setProjectStep)}
                  >
                    Back
                  </button>
                  <button 
                    className="ihub-important-btn"
                    onClick={() => {
                      openToast("Project created successfully!");
                      console.log("Project created:", projectData);
                      setProjectStep(1);
                      setProjectData({
                        name: "",
                        type: "",
                        template: "",
                        features: [],
                        settings: { public: false, collaborators: "" },
                      });
                    }}
                  >
                    Create Project
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Validation States Examples */}
      <section className="ihub-mb-5">
        <h2>Validation States & Error Handling</h2>
        <div className="ihub-card ihub-p-4">
          <h3>Step Progress with Validation Indicators</h3>
          <p>This example shows how to handle validation states and prevent progression to invalid steps.</p>
          
          <StepProgressBar step={2} counts={[1, 2, 3, 4]} widths="600px" />
          
          <div className="ihub-mt-3">
            <div className="ihub-d-flex ihub-align-items-center">
              <span className="ihub-badge ihub-bg-success ihub-me-2">✓</span>
              <span>Step 1: Completed</span>
            </div>
            <div className="ihub-d-flex ihub-align-items-center ihub-mt-2">
              <span className="ihub-badge ihub-bg-primary ihub-me-2">→</span>
              <span>Step 2: In Progress</span>
            </div>
            <div className="ihub-d-flex ihub-align-items-center ihub-mt-2">
              <span className="ihub-badge ihub-bg-secondary ihub-me-2">3</span>
              <span>Step 3: Pending</span>
            </div>
            <div className="ihub-d-flex ihub-align-items-center ihub-mt-2">
              <span className="ihub-badge ihub-bg-secondary ihub-me-2">4</span>
              <span>Step 4: Pending</span>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Styling Examples */}
      <section className="ihub-mb-5">
        <h2>Custom Styling & Responsive Design</h2>
        <div className="ihub-card ihub-p-4">
          <h3>Responsive Progress Bar</h3>
          <p>The progress bar adapts to different screen sizes and containers.</p>
          
          <div className="ihub-mb-4">
            <h4>Mobile Width (300px)</h4>
            <StepProgressBar step={3} counts={[1, 2, 3, 4, 5]} widths="300px" />
          </div>
          
          <div className="ihub-mb-4">
            <h4>Tablet Width (600px)</h4>
            <StepProgressBar step={3} counts={[1, 2, 3, 4, 5]} widths="600px" />
          </div>
          
          <div className="ihub-mb-4">
            <h4>Desktop Width (1000px)</h4>
            <StepProgressBar step={3} counts={[1, 2, 3, 4, 5]} widths="1000px" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default StepProgressBarExamples;
```

## 🔗 Related Components

- [ActionDropdown](./ActionDropdown.md) - Dropdown component for actions
- [AnimatedBox](./AnimatedBox.md) - Animated container component
- [PasswordField](./PasswordField.md) - Secure password input field
- [DateInput](./DateInput.md) - Date selection input field
- [DateTimeInput](./DateTimeInput.md) - Date and time selection input field

