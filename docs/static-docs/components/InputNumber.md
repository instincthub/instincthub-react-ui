# InputNumber

**Category:** Form | **Type:** component

InputNumber component for numerical input with validation, step controls, and formatting

## 🏷️ Tags

`form`, `input`, `number`, `validation`, `controls`

```tsx
"use client";
import React, { useState } from "react";
import { InputNumber } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Example component demonstrating various ways to use the InputNumber component
 */
const InputNumberExamples = () => {
  // Basic number input state
  const [basicNumber, setBasicNumber] = useState<number | null>(null);
  
  // Range validation state
  const [age, setAge] = useState<number | null>(null);
  const [score, setScore] = useState<number | null>(85);
  
  // Step controls state
  const [quantity, setQuantity] = useState<number | null>(1);
  const [price, setPrice] = useState<number | null>(29.99);
  const [temperature, setTemperature] = useState<number | null>(20.5);
  
  // Form integration state
  const [formData, setFormData] = useState({
    width: null as number | null,
    height: null as number | null,
    weight: null as number | null,
    rating: null as number | null,
  });
  
  // Practical use cases state
  const [cartItems, setCartItems] = useState<number | null>(3);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [percentage, setPercentage] = useState<number | null>(75);

  // Handle form data changes
  const handleFormChange = (field: string) => (value: number | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    openToast("Form submitted! Check console for values.");
  };

  // Validate age range
  const validateAge = (value: number | null) => {
    if (value && (value < 13 || value > 120)) {
      return "Age must be between 13 and 120";
    }
    return "";
  };

  // Calculate BMI
  const calculateBMI = () => {
    if (formData.weight && formData.height) {
      const heightInMeters = formData.height / 100;
      const bmi = formData.weight / (heightInMeters * heightInMeters);
      return bmi.toFixed(2);
    }
    return null;
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>InputNumber Examples</h1>

      {/* Basic Number Input */}
      <section className="ihub-mb-5">
        <h2>Basic Number Input</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <InputNumber
              name="basicNumber"
              label="Enter any number"
              placeholder="Type a number..."
              value={basicNumber}
              onChange={setBasicNumber}
              note="This is a basic number input without constraints"
            />
            <p className="ihub-mt-2">
              Current value: {basicNumber !== null ? basicNumber : "No value"}
            </p>
          </div>
        </div>
      </section>

      {/* Range Validation Examples */}
      <section className="ihub-mb-5">
        <h2>Range Validation</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <InputNumber
              name="age"
              label="Age"
              placeholder="Enter your age"
              min={13}
              max={120}
              value={age}
              onChange={setAge}
              error={validateAge(age)}
              note="Age must be between 13 and 120 years"
              required
            />
          </div>
          <div className="ihub-col-md-6">
            <InputNumber
              name="score"
              label="Test Score"
              placeholder="Enter score (0-100)"
              min={0}
              max={100}
              value={score}
              onChange={setScore}
              note="Score range: 0-100 points"
            />
          </div>
        </div>
      </section>

      {/* Step Controls Examples */}
      <section className="ihub-mb-5">
        <h2>Step Controls</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <InputNumber
              name="quantity"
              label="Quantity"
              min={1}
              max={99}
              step={1}
              value={quantity}
              onChange={setQuantity}
              note="Use +/- buttons or type directly"
            />
          </div>
          <div className="ihub-col-md-4">
            <InputNumber
              name="price"
              label="Price ($)"
              min={0}
              step={0.01}
              value={price}
              onChange={setPrice}
              note="Decimal precision for currency"
            />
          </div>
          <div className="ihub-col-md-4">
            <InputNumber
              name="temperature"
              label="Temperature (°C)"
              min={-50}
              max={50}
              step={0.5}
              value={temperature}
              onChange={setTemperature}
              note="Half-degree increments"
            />
          </div>
        </div>
      </section>

      {/* Form Integration Example */}
      <section className="ihub-mb-5">
        <h2>Form Integration</h2>
        <form onSubmit={handleSubmit} className="ihub-card ihub-p-4">
          <h3>Personal Measurements</h3>
          <div className="ihub-row">
            <div className="ihub-col-md-4">
              <InputNumber
                name="width"
                label="Width (cm)"
                min={0}
                max={300}
                step={0.1}
                value={formData.width}
                onChange={handleFormChange('width')}
                note="Width in centimeters"
              />
            </div>
            <div className="ihub-col-md-4">
              <InputNumber
                name="height"
                label="Height (cm)"
                min={50}
                max={250}
                step={0.1}
                value={formData.height}
                onChange={handleFormChange('height')}
                required
                note="Height in centimeters"
              />
            </div>
            <div className="ihub-col-md-4">
              <InputNumber
                name="weight"
                label="Weight (kg)"
                min={1}
                max={500}
                step={0.1}
                value={formData.weight}
                onChange={handleFormChange('weight')}
                required
                note="Weight in kilograms"
              />
            </div>
          </div>
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <InputNumber
                name="rating"
                label="Experience Rating"
                min={1}
                max={5}
                step={1}
                value={formData.rating}
                onChange={handleFormChange('rating')}
                note="Rate your experience (1-5)"
              />
            </div>
            <div className="ihub-col-md-6">
              {calculateBMI() && (
                <div className="ihub-mt-4">
                  <strong>BMI: {calculateBMI()}</strong>
                </div>
              )}
            </div>
          </div>
          <button type="submit" className="ihub-important-btn ihub-mt-3">
            Submit Measurements
          </button>
        </form>
      </section>

      {/* Practical Use Cases */}
      <section className="ihub-mb-5">
        <h2>Practical Use Cases</h2>
        
        {/* Quantity Selection */}
        <div className="ihub-mb-4">
          <h3>Shopping Cart Quantity</h3>
          <div className="ihub-row ihub-align-items-center">
            <div className="ihub-col-md-4">
              <InputNumber
                name="cartItems"
                label="Items in Cart"
                min={0}
                max={10}
                step={1}
                value={cartItems}
                onChange={setCartItems}
                note="Maximum 10 items per order"
              />
            </div>
            <div className="ihub-col-md-8">
              <div className="ihub-card ihub-p-3">
                <p>Cart Summary:</p>
                <p>Items: {cartItems || 0}</p>
                <p>Total: ${((cartItems || 0) * 29.99).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rating System */}
        <div className="ihub-mb-4">
          <h3>Rating System</h3>
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <InputNumber
                name="userRating"
                label="Rate this product"
                min={1}
                max={5}
                step={1}
                value={userRating}
                onChange={setUserRating}
                note="1 = Poor, 5 = Excellent"
                placeholder="Click +/- or type rating"
              />
            </div>
            <div className="ihub-col-md-6">
              {userRating && (
                <div className="ihub-mt-4">
                  <p>Your rating: {userRating}/5</p>
                  <div className="ihub-rating-display">
                    {"★".repeat(userRating)}{"☆".repeat(5 - userRating)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Measurement Input */}
        <div className="ihub-mb-4">
          <h3>Distance Measurement</h3>
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <InputNumber
                name="distance"
                label="Distance (km)"
                min={0}
                step={0.01}
                value={distance}
                onChange={setDistance}
                note="Distance in kilometers (precise to 0.01km)"
                placeholder="0.00"
              />
            </div>
            <div className="ihub-col-md-6">
              {distance && (
                <div className="ihub-mt-4">
                  <p>Distance conversions:</p>
                  <p>Meters: {(distance * 1000).toFixed(0)}m</p>
                  <p>Miles: {(distance * 0.621371).toFixed(2)} miles</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Percentage Input */}
        <div className="ihub-mb-4">
          <h3>Percentage Control</h3>
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <InputNumber
                name="percentage"
                label="Completion Percentage"
                min={0}
                max={100}
                step={5}
                value={percentage}
                onChange={setPercentage}
                note="Progress in 5% increments"
              />
            </div>
            <div className="ihub-col-md-6">
              <div className="ihub-mt-4">
                <div className="progress-bar" style={{ 
                  width: '100%', 
                  height: '20px', 
                  backgroundColor: '#e0e0e0',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${percentage || 0}%`,
                    height: '100%',
                    backgroundColor: '#4caf50',
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
                <p className="ihub-mt-2">{percentage || 0}% Complete</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disabled and Read-only States */}
      <section className="ihub-mb-5">
        <h2>States and Variations</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <InputNumber
              name="disabledInput"
              label="Disabled Input"
              value={50}
              disabled
              note="This input is disabled"
            />
          </div>
          <div className="ihub-col-md-4">
            <InputNumber
              name="readonlyInput"
              label="Read-only Input"
              value={100}
              readOnly
              note="This input is read-only"
            />
          </div>
          <div className="ihub-col-md-4">
            <InputNumber
              name="errorInput"
              label="Input with Error"
              value={150}
              error="Value exceeds maximum limit"
              note="This shows an error state"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default InputNumberExamples;
```

## 🔗 Related Components

- [InputText](./InputText.md) - Text input component
- [InputAmount](./InputAmount.md) - Currency amount input component  
- [InputTextarea](./InputTextarea.md) - Textarea input component
- [ToggleButton](./ToggleButton.md) - Toggle button component
- [DateInputPicker](./DateInputPicker.md) - Date and time picker component

