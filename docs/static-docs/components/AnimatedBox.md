# AnimatedBox

**Category:** Forms | **Type:** component

Animated container component

## 📁 File Location

`src/components/forms/AnimatedBox.tsx`

## 🏷️ Tags

`forms`

## 📖 Usage Examples

### Example 1: AnimatedBox Demonstration

```tsx
"use client";

import React, { useState } from "react";
import { AnimatedBox } from "@instincthub/react-ui";

/**
 * Example demonstrating the AnimatedBox component with various use cases
 */
const AnimatedBoxExample: React.FC = () => {
  const [showBoxes, setShowBoxes] = useState(true);
  const [boxCount, setBoxCount] = useState(1);

  const toggleBoxes = () => {
    setShowBoxes(!showBoxes);
  };

  const addBox = () => {
    setBoxCount(prev => prev + 1);
  };

  const resetBoxes = () => {
    setBoxCount(1);
    setShowBoxes(true);
  };

  return (
    <div className="ihub-container ihub-py-5">
      <h1>AnimatedBox Component Examples</h1>

      {/* Controls */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Controls</h2>
        <div className="ihub-d-flex ihub-gap-3 ihub-flex-wrap">
          <button
            className="ihub-primary-btn"
            onClick={toggleBoxes}
          >
            {showBoxes ? 'Hide' : 'Show'} Boxes
          </button>
          
          <button
            className="ihub-outlined-btn"
            onClick={addBox}
          >
            Add Box ({boxCount})
          </button>
          
          <button
            className="ihub-danger-btn"
            onClick={resetBoxes}
          >
            Reset
          </button>
        </div>
      </section>

      {/* Single AnimatedBox */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Single AnimatedBox</h2>
        <p className="ihub-mb-3">
          The AnimatedBox component creates a simple animated container with a fade-in effect.
          It uses CSS transitions and the --DarkCyan custom property for styling.
        </p>
        
        {showBoxes && (
          <div style={{ width: '200px', height: '150px', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
            <AnimatedBox />
          </div>
        )}
      </section>

      {/* Multiple AnimatedBoxes */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Multiple AnimatedBoxes</h2>
        <p className="ihub-mb-3">
          Demonstrating multiple AnimatedBoxes with staggered animation timing.
        </p>
        
        {showBoxes && (
          <div className="ihub-d-flex ihub-gap-3 ihub-flex-wrap">
            {Array.from({ length: boxCount }, (_, index) => (
              <div
                key={index}
                style={{
                  width: '120px',
                  height: '120px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <AnimatedBox />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* AnimatedBox in Card Layout */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">AnimatedBox in Card Layout</h2>
        <p className="ihub-mb-3">
          Example of using AnimatedBox as a decorative element in a card layout.
        </p>
        
        {showBoxes && (
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <div className="ihub-card ihub-p-4">
                <div className="ihub-card-header ihub-mb-3">
                  <h3>Card with AnimatedBox</h3>
                </div>
                <div className="ihub-card-body">
                  <div style={{ width: '100%', height: '80px', marginBottom: '1rem', borderRadius: '4px', overflow: 'hidden' }}>
                    <AnimatedBox />
                  </div>
                  <p>This card contains an AnimatedBox component that provides a subtle animated background element.</p>
                </div>
              </div>
            </div>
            
            <div className="ihub-col-md-6">
              <div className="ihub-card ihub-p-4">
                <div className="ihub-card-header ihub-mb-3">
                  <h3>Another Card</h3>
                </div>
                <div className="ihub-card-body">
                  <div style={{ width: '100%', height: '80px', marginBottom: '1rem', borderRadius: '4px', overflow: 'hidden' }}>
                    <AnimatedBox />
                  </div>
                  <p>Each AnimatedBox has its own independent animation timing and effects.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Usage Notes */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Usage Notes</h2>
        <div className="ihub-alert ihub-alert-info">
          <h4>Important Notes:</h4>
          <ul>
            <li>AnimatedBox has no props - it's a self-contained component</li>
            <li>Uses CSS custom property <code>--DarkCyan</code> for background color</li>
            <li>Automatically animates opacity on mount</li>
            <li>Takes full width and height of its container</li>
            <li>Best used as a decorative background element</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AnimatedBoxExample;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { AnimatedBox } from '@instincthub/react-ui';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { AnimatedBox } from '@instincthub/react-ui';

function MyComponent() {
  return (
    <div style={{ width: '200px', height: '150px' }}>
      <AnimatedBox />
    </div>
  );
}
```

## 🔗 Related Components

- [ActionDropdown](./ActionDropdown.md) - Dropdown component for actions
- [PasswordField](./PasswordField.md) - Secure password input field
- [DateInput](./DateInput.md) - Date selection input field
- [DateTimeInput](./DateTimeInput.md) - Date and time selection input field
- [DropFile](./DropFile.md) - File drag and drop component

