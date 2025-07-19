# MagneticButton

**Category:** Cursors | **Type:** component

Button component with magnetic cursor attraction effect

## 🏷️ Tags

`cursors`, `button`, `action`

```tsx
"use client";
import React, { useState } from "react";
import { MagneticButton } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Example component demonstrating various ways to use the MagneticButton
 */
const MagneticButtonExamples = () => {
  const [clickCount, setClickCount] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleBasicClick = () => {
    setClickCount(prev => prev + 1);
    openToast(`Button clicked ${clickCount + 1} times!`);
  };

  const handleAsyncAction = async () => {
    setIsProcessing(true);
    openToast("Processing...");
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    openToast("Action completed successfully!");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      openToast("Please fill in all fields", 400);
      return;
    }
    openToast(`Form submitted for ${formData.name}`);
    setFormData({ name: "", email: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>Magnetic Button Examples</h1>
      <p className="ihub-mb-4">
        Interactive buttons with magnetic cursor attraction effects.
        The magnetic effect responds to cursor movement and provides smooth animations.
      </p>

      {/* Basic Magnetic Buttons */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Basic Magnetic Buttons</h2>
        <div className="ihub-d-flex" style={{ gap: "20px", flexWrap: "wrap" }}>
          <MagneticButton
            className="ihub-primary-btn"
            onClick={handleBasicClick}
            distanceFactor={0.3}
          >
            Click Me (Subtle Effect)
          </MagneticButton>

          <MagneticButton
            className="ihub-important-btn"
            onClick={handleBasicClick}
            distanceFactor={0.7}
          >
            Strong Magnetic Effect
          </MagneticButton>

          <MagneticButton
            className="ihub-outlined-btn"
            onClick={handleBasicClick}
            distanceFactor={1.2}
          >
            Very Strong Effect
          </MagneticButton>
        </div>
        <p className="ihub-mt-2 ihub-text-muted">
          Click count: {clickCount}
        </p>
      </section>

      {/* Different Button Styles */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Different Button Styles</h2>
        <div className="ihub-d-flex" style={{ gap: "15px", flexWrap: "wrap" }}>
          <MagneticButton className="ihub-success-btn">
            Success Button
          </MagneticButton>
          
          <MagneticButton className="ihub-warning-btn">
            Warning Button
          </MagneticButton>
          
          <MagneticButton className="ihub-danger-btn">
            Danger Button
          </MagneticButton>
          
          <MagneticButton className="ihub-secondary-btn">
            Secondary Button
          </MagneticButton>

          <MagneticButton 
            className="ihub-outlined-btn"
            style={{ 
              borderRadius: "50px",
              padding: "12px 24px",
              background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none"
            }}
          >
            Custom Styled
          </MagneticButton>
        </div>
      </section>

      {/* Async Action Button */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Async Action Button</h2>
        <MagneticButton
          className={`ihub-primary-btn ${
            isProcessing ? "ihub-btn-loading" : ""
          }`}
          onClick={handleAsyncAction}
          disabled={isProcessing}
          distanceFactor={0.5}
        >
          {isProcessing ? "Processing..." : "Start Async Action"}
        </MagneticButton>
        <p className="ihub-mt-2 ihub-text-muted">
          Button is disabled during processing to prevent multiple clicks
        </p>
      </section>

      {/* Form Integration */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Form Integration</h2>
        <form onSubmit={handleFormSubmit} className="ihub-form">
          <div className="ihub-mb-3">
            <label htmlFor="name" className="ihub-form-label">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="ihub-input"
              placeholder="Enter your name"
            />
          </div>
          
          <div className="ihub-mb-3">
            <label htmlFor="email" className="ihub-form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="ihub-input"
              placeholder="Enter your email"
            />
          </div>

          <div className="ihub-d-flex" style={{ gap: "10px" }}>
            <MagneticButton
              type="submit"
              className="ihub-success-btn"
              distanceFactor={0.4}
            >
              Submit Form
            </MagneticButton>
            
            <MagneticButton
              type="button"
              className="ihub-outlined-btn"
              onClick={() => setFormData({ name: "", email: "" })}
              distanceFactor={0.4}
            >
              Clear Form
            </MagneticButton>
          </div>
        </form>
      </section>

      {/* Size and Shape Variations */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Size and Shape Variations</h2>
        <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "20px", flexWrap: "wrap" }}>
          <MagneticButton
            className="ihub-primary-btn"
            style={{ padding: "8px 16px", fontSize: "12px" }}
          >
            Small
          </MagneticButton>
          
          <MagneticButton className="ihub-primary-btn">
            Normal
          </MagneticButton>
          
          <MagneticButton
            className="ihub-primary-btn"
            style={{ padding: "16px 32px", fontSize: "18px" }}
          >
            Large
          </MagneticButton>
          
          <MagneticButton
            className="ihub-primary-btn"
            style={{ 
              width: "60px", 
              height: "60px", 
              borderRadius: "50%",
              padding: "0"
            }}
          >
            ○
          </MagneticButton>
          
          <MagneticButton
            className="ihub-primary-btn"
            style={{ 
              borderRadius: "0",
              padding: "12px 24px"
            }}
          >
            Square
          </MagneticButton>
        </div>
      </section>

      {/* Disabled State */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Disabled State</h2>
        <div className="ihub-d-flex" style={{ gap: "15px", flexWrap: "wrap" }}>
          <MagneticButton
            className="ihub-primary-btn"
            disabled={true}
          >
            Disabled Button
          </MagneticButton>
          
          <MagneticButton
            className="ihub-outlined-btn"
            disabled={true}
          >
            Disabled Outlined
          </MagneticButton>
        </div>
        <p className="ihub-mt-2 ihub-text-muted">
          Disabled buttons don't respond to magnetic effects
        </p>
      </section>

      {/* Configuration Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Distance Factor Comparison</h2>
        <div className="ihub-d-flex" style={{ gap: "20px", flexWrap: "wrap" }}>
          <div className="ihub-text-center">
            <MagneticButton
              className="ihub-primary-btn"
              distanceFactor={0.1}
            >
              Factor: 0.1
            </MagneticButton>
            <p className="ihub-mt-2">Minimal effect</p>
          </div>
          
          <div className="ihub-text-center">
            <MagneticButton
              className="ihub-primary-btn"
              distanceFactor={0.5}
            >
              Factor: 0.5
            </MagneticButton>
            <p className="ihub-mt-2">Default effect</p>
          </div>
          
          <div className="ihub-text-center">
            <MagneticButton
              className="ihub-primary-btn"
              distanceFactor={1.0}
            >
              Factor: 1.0
            </MagneticButton>
            <p className="ihub-mt-2">Strong effect</p>
          </div>
          
          <div className="ihub-text-center">
            <MagneticButton
              className="ihub-primary-btn"
              distanceFactor={1.5}
            >
              Factor: 1.5
            </MagneticButton>
            <p className="ihub-mt-2">Very strong</p>
          </div>
        </div>
      </section>

      {/* Implementation Notes */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Implementation Notes</h2>
        <div className="ihub-card ihub-p-4">
          <h3>Key Features:</h3>
          <ul>
            <li><strong>Magnetic Effect:</strong> Buttons follow cursor movement within their bounds</li>
            <li><strong>Smooth Animation:</strong> CSS transitions provide smooth return to original position</li>
            <li><strong>Configurable:</strong> Distance factor controls the strength of the effect</li>
            <li><strong>Accessible:</strong> Respects disabled state and maintains keyboard navigation</li>
            <li><strong>Performance:</strong> Uses efficient event handlers and cleanup</li>
          </ul>
          
          <h3 className="ihub-mt-3">Props:</h3>
          <ul>
            <li><code>distanceFactor</code> - Controls magnetic strength (default: 0.5)</li>
            <li><code>disabled</code> - Disables magnetic effect when true</li>
            <li><code>children</code> - Button content</li>
            <li><code>className</code> - Additional CSS classes</li>
            <li><code>onClick</code> - Click event handler</li>
            <li><code>type</code> - Button type (button, submit, reset)</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default MagneticButtonExamples;
```

## 🔗 Related Components

- [Cursor](./Cursor.md) - Custom cursor component with trailing effects and animations
- [CursorContext](./CursorContext.md) - Context provider for cursor state management across the application
- [useCursorInteraction](./useCursorInteraction.md) - Hook for adding interactive cursor effects to elements
- [CursorControlDemo](./CursorControlDemo.md) - Comprehensive demo component for the cursor system

## 🔗 Related Components

- [Cursor](./Cursor.md) - Custom cursor component with trailing effects and animations
- [CursorContext](./CursorContext.md) - Context provider for cursor state management across the application
- [useCursorInteraction](./useCursorInteraction.md) - Hook for adding interactive cursor effects to elements
- [CursorControlDemo](./CursorControlDemo.md) - Comprehensive demo component for the cursor system

