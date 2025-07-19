# CreateButtonExample

**Category:** UI | **Type:** component

A comprehensive showcase component demonstrating all CreateButton features, variants, and usage patterns in an interactive demo format

## 📁 File Location

`src/components/ui/create-button/CreateButtonExample.tsx`

## 🏷️ Tags

`ui`, `button`, `action`, `demo`, `showcase`, `examples`

## 📖 Props

This component takes no props - it's a self-contained demonstration component.

## 🎨 CSS Classes

- `ihub-create-button-demo` - Main demo container
- `ihub-button-grid` - Grid layout for examples
- `ihub-button-example` - Individual example wrapper
- `ihub-button-row` - Horizontal button grouping

## 🌟 Features

- **Complete Demo Suite** - Shows all CreateButton variants and features
- **Interactive Examples** - Live, clickable demonstrations
- **Organized Layout** - Categorized examples for easy reference
- **Real-world Scenarios** - Practical usage patterns
- **Visual Comparison** - Side-by-side variant comparisons
- **Educational Value** - Perfect for learning and reference

```tsx
"use client";
import React, { useState } from "react";
import { CreateButton } from "@instincthub/react-ui";

/**
 * Comprehensive CreateButtonExample showcase demonstrating all features
 */
const CreateButtonExampleShowcase = () => {
  const [demoStates, setDemoStates] = useState({
    isLoading: false,
    isSubmitting: false,
    isDeleting: false,
    showNotification: false,
    currentDemo: 'variants'
  });

  // Demo simulation functions
  const simulateAction = async (action: string, duration = 2000) => {
    const stateKey = `is${action.charAt(0).toUpperCase()}${action.slice(1)}` as keyof typeof demoStates;
    
    setDemoStates(prev => ({ ...prev, [stateKey]: true }));
    
    await new Promise(resolve => setTimeout(resolve, duration));
    
    setDemoStates(prev => ({ 
      ...prev, 
      [stateKey]: false,
      showNotification: true 
    }));
    
    setTimeout(() => {
      setDemoStates(prev => ({ ...prev, showNotification: false }));
    }, 3000);
  };

  const handleFallbackClick = (): void => {
    console.log("Fallback function called!");
    setDemoStates(prev => ({ ...prev, showNotification: true }));
    setTimeout(() => {
      setDemoStates(prev => ({ ...prev, showNotification: false }));
    }, 2000);
  };

  const demoTabs = [
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'states', label: 'States' },
    { id: 'advanced', label: 'Advanced' }
  ];

  return (
    <div className="ihub-create-button-demo">
      <div className="ihub-container">
        <header className="ihub-mb-5">
          <h1>CreateButton Component Showcase</h1>
          <p className="ihub-text-muted">
            Interactive demonstrations of all CreateButton features and use cases
          </p>
          
          {demoStates.showNotification && (
            <div className="ihub-alert ihub-alert-success ihub-mt-3">
              ✓ Action completed successfully!
            </div>
          )}
        </header>

        {/* Demo Navigation */}
        <div className="ihub-mb-4">
          <div className="ihub-nav-tabs" style={{ borderBottom: '2px solid #e9ecef' }}>
            {demoTabs.map(tab => (
              <button
                key={tab.id}
                className={`ihub-nav-link ${
                  demoStates.currentDemo === tab.id ? 'active' : ''
                }`}
                onClick={() => setDemoStates(prev => ({ ...prev, currentDemo: tab.id }))}
                style={{
                  padding: '12px 20px',
                  border: 'none',
                  background: 'none',
                  color: demoStates.currentDemo === tab.id ? '#007bff' : '#6c757d',
                  borderBottom: demoStates.currentDemo === tab.id ? '2px solid #007bff' : '2px solid transparent',
                  cursor: 'pointer'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Variants Demo */}
        {demoStates.currentDemo === 'variants' && (
          <div className="ihub-button-grid">
            <div className="ihub-button-example">
              <h3>Button Variants</h3>
              <p>Different visual styles for various use cases:</p>
              
              <div className="ihub-button-row" style={{ gap: '15px', display: 'flex', flexWrap: 'wrap' }}>
                <CreateButton
                  label="Important"
                  variant="important"
                  onClick={handleFallbackClick}
                />
                <CreateButton
                  label="Primary"
                  variant="primary"
                  onClick={handleFallbackClick}
                />
                <CreateButton
                  label="Outlined"
                  variant="outlined"
                  onClick={handleFallbackClick}
                />
                <CreateButton
                  label="Danger"
                  variant="danger"
                  onClick={handleFallbackClick}
                />
              </div>
            </div>

            <div className="ihub-button-example">
              <h3>URL Parameter Integration</h3>
              <p>Buttons that update URL parameters for navigation:</p>
              
              <div className="ihub-button-row" style={{ gap: '15px', display: 'flex', flexWrap: 'wrap' }}>
                <CreateButton
                  label="Create Course"
                  searchParam={{ key: "create", value: "course" }}
                  variant="important"
                  animated={true}
                />
                <CreateButton
                  label="Create User"
                  searchParam={{ key: "create", value: "user" }}
                  variant="primary"
                />
                <CreateButton
                  label="New Project"
                  searchParam={{ key: "modal", value: "new-project" }}
                  variant="outlined"
                />
              </div>
            </div>

            <div className="ihub-button-example">
              <h3>Fallback Function Usage</h3>
              <p>Buttons with direct click handlers:</p>
              
              <CreateButton
                label="Create Project"
                onClick={handleFallbackClick}
                variant="primary"
                animated={true}
              />
            </div>
          </div>
        )}

        {/* Sizes Demo */}
        {demoStates.currentDemo === 'sizes' && (
          <div className="ihub-button-grid">
            <div className="ihub-button-example">
              <h3>Size Variations</h3>
              <p>Different button sizes for various contexts:</p>
              
              <div className="ihub-button-row" style={{ gap: '15px', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                <CreateButton
                  label="Small"
                  size="small"
                  variant="outlined"
                  onClick={handleFallbackClick}
                />
                <CreateButton
                  label="Medium (Default)"
                  size="medium"
                  variant="primary"
                  onClick={handleFallbackClick}
                />
                <CreateButton
                  label="Large"
                  size="large"
                  variant="important"
                  onClick={handleFallbackClick}
                />
              </div>
            </div>

            <div className="ihub-button-example">
              <h3>Size with Variants</h3>
              <p>How different sizes look across variants:</p>
              
              <div style={{ display: 'grid', gap: '20px' }}>
                <div>
                  <h5>Small Buttons</h5>
                  <div className="ihub-button-row" style={{ gap: '10px', display: 'flex', flexWrap: 'wrap' }}>
                    <CreateButton label="Important" size="small" variant="important" onClick={handleFallbackClick} />
                    <CreateButton label="Primary" size="small" variant="primary" onClick={handleFallbackClick} />
                    <CreateButton label="Outlined" size="small" variant="outlined" onClick={handleFallbackClick} />
                  </div>
                </div>
                
                <div>
                  <h5>Large Buttons</h5>
                  <div className="ihub-button-row" style={{ gap: '10px', display: 'flex', flexWrap: 'wrap' }}>
                    <CreateButton label="Important" size="large" variant="important" onClick={handleFallbackClick} />
                    <CreateButton label="Primary" size="large" variant="primary" onClick={handleFallbackClick} />
                    <CreateButton label="Outlined" size="large" variant="outlined" onClick={handleFallbackClick} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* States Demo */}
        {demoStates.currentDemo === 'states' && (
          <div className="ihub-button-grid">
            <div className="ihub-button-example">
              <h3>Loading States</h3>
              <p>Buttons with loading indicators and state management:</p>
              
              <div className="ihub-button-row" style={{ gap: '15px', display: 'flex', flexWrap: 'wrap' }}>
                <CreateButton
                  label="Create Item"
                  loading={demoStates.isLoading}
                  onClick={() => simulateAction('loading')}
                  variant="important"
                />
                <CreateButton
                  label="Submit Form"
                  loading={demoStates.isSubmitting}
                  onClick={() => simulateAction('submitting', 3000)}
                  variant="primary"
                />
                <CreateButton
                  label="Delete Item"
                  loading={demoStates.isDeleting}
                  onClick={() => simulateAction('deleting', 1500)}
                  variant="danger"
                />
              </div>
            </div>

            <div className="ihub-button-example">
              <h3>Static Loading State</h3>
              <p>Always loading state for demonstration:</p>
              
              <CreateButton
                label="Processing"
                loading={true}
                variant="important"
              />
            </div>

            <div className="ihub-button-example">
              <h3>Disabled States</h3>
              <p>Buttons in disabled state across variants:</p>
              
              <div className="ihub-button-row" style={{ gap: '15px', display: 'flex', flexWrap: 'wrap' }}>
                <CreateButton
                  label="Disabled Important"
                  variant="important"
                  disabled={true}
                />
                <CreateButton
                  label="Disabled Primary"
                  variant="primary"
                  disabled={true}
                />
                <CreateButton
                  label="Disabled Outlined"
                  variant="outlined"
                  disabled={true}
                />
              </div>
            </div>
          </div>
        )}

        {/* Advanced Demo */}
        {demoStates.currentDemo === 'advanced' && (
          <div className="ihub-button-grid">
            <div className="ihub-button-example">
              <h3>Buttons with Icons</h3>
              <p>Enhanced buttons with icon support:</p>
              
              <div className="ihub-button-row" style={{ gap: '15px', display: 'flex', flexWrap: 'wrap' }}>
                <CreateButton
                  label="Add User"
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 6v12m6-6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  }
                  variant="primary"
                  onClick={handleFallbackClick}
                />
                <CreateButton
                  label="Upload File"
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  }
                  variant="outlined"
                  onClick={handleFallbackClick}
                />
                <CreateButton
                  label="Save Draft"
                  icon={<span>💾</span>}
                  variant="outlined"
                  onClick={handleFallbackClick}
                />
              </div>
            </div>

            <div className="ihub-button-example">
              <h3>Animation Control</h3>
              <p>Buttons with and without animations:</p>
              
              <div className="ihub-button-row" style={{ gap: '15px', display: 'flex', flexWrap: 'wrap' }}>
                <CreateButton
                  label="Animated (Default)"
                  variant="primary"
                  animated={true}
                  onClick={handleFallbackClick}
                />
                <CreateButton
                  label="No Animation"
                  variant="outlined"
                  animated={false}
                  onClick={handleFallbackClick}
                />
              </div>
            </div>

            <div className="ihub-button-example">
              <h3>Custom Styling</h3>
              <p>Buttons with custom classes and attributes:</p>
              
              <div className="ihub-button-row" style={{ gap: '15px', display: 'flex', flexWrap: 'wrap' }}>
                <CreateButton
                  label="Custom Width"
                  variant="primary"
                  className="ihub-w-200"
                  onClick={handleFallbackClick}
                />
                <CreateButton
                  label="With Tooltip"
                  variant="outlined"
                  buttonProps={{
                    title: "This is a helpful tooltip",
                    'data-toggle': 'tooltip'
                  }}
                  onClick={handleFallbackClick}
                />
              </div>
            </div>

            <div className="ihub-button-example">
              <h3>Complex Scenarios</h3>
              <p>Real-world usage patterns:</p>
              
              <div style={{ display: 'grid', gap: '20px' }}>
                <div className="ihub-card ihub-p-3">
                  <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                    <div>
                      <h6>Content Management</h6>
                      <p className="ihub-text-muted ihub-mb-0">Create new content items</p>
                    </div>
                    <div className="ihub-d-flex" style={{ gap: '10px' }}>
                      <CreateButton
                        label="New Article"
                        searchParam={{ key: "create", value: "article" }}
                        variant="important"
                        size="small"
                      />
                      <CreateButton
                        label="New Video"
                        searchParam={{ key: "create", value: "video" }}
                        variant="outlined"
                        size="small"
                      />
                    </div>
                  </div>
                </div>

                <div className="ihub-card ihub-p-3">
                  <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                    <div>
                      <h6>User Management</h6>
                      <p className="ihub-text-muted ihub-mb-0">Invite and manage users</p>
                    </div>
                    <CreateButton
                      label="Invite User"
                      searchParam={{ key: "invite", value: "user" }}
                      variant="primary"
                      icon={
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <line x1="23" y1="11" x2="17" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Code Example Section */}
        <div className="ihub-mt-5 ihub-p-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Current URL Parameters</h3>
          <p>Click buttons with searchParam to see URL changes:</p>
          <pre style={{ background: 'white', padding: '10px', borderRadius: '4px', fontSize: '14px' }}>
            {typeof window !== 'undefined' ? 
              window.location.search || 'No parameters currently set' : 
              'Loading...'}
          </pre>
        </div>

        {/* Usage Tips */}
        <div className="ihub-mt-5">
          <h3>Usage Tips</h3>
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <div className="ihub-card ihub-p-3">
                <h6>URL Parameters vs onClick</h6>
                <ul>
                  <li><strong>URL Parameters:</strong> Use for navigation, modal triggers, page state</li>
                  <li><strong>onClick:</strong> Use for immediate actions, API calls, state changes</li>
                </ul>
              </div>
            </div>
            <div className="ihub-col-md-6">
              <div className="ihub-card ihub-p-3">
                <h6>Variant Selection</h6>
                <ul>
                  <li><strong>Important:</strong> Primary actions, main CTAs</li>
                  <li><strong>Primary:</strong> Secondary important actions</li>
                  <li><strong>Outlined:</strong> Tertiary actions, alternatives</li>
                  <li><strong>Danger:</strong> Destructive actions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateButtonExampleShowcase;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { CreateButtonExample } from '@instincthub/react-ui';
// or
import CreateButtonExample from '@instincthub/react-ui/CreateButtonExample';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { CreateButtonExample } from '@instincthub/react-ui';

// Simple demo inclusion
function MyDemoPage() {
  return (
    <div>
      <h1>Button Components Demo</h1>
      <CreateButtonExample />
    </div>
  );
}

// In a documentation or style guide context
function StyleGuide() {
  return (
    <section id="buttons">
      <h2>Button Components</h2>
      <CreateButtonExample />
    </section>
  );
}
```

## 🔧 Implementation Guide

### Demo Categories

The showcase is organized into four main categories:

1. **Variants** - Different visual styles and URL parameter examples
2. **Sizes** - Size variations and combinations
3. **States** - Loading, disabled, and interactive states
4. **Advanced** - Icons, animations, and complex scenarios

### Interactive Features

```tsx
// State management for demo interactions
const [demoStates, setDemoStates] = useState({
  isLoading: false,
  isSubmitting: false,
  showNotification: false,
  currentDemo: 'variants'
});

// Simulation functions for realistic demos
const simulateAction = async (action: string, duration = 2000) => {
  // Show loading state
  setDemoStates(prev => ({ ...prev, [`is${action}`]: true }));
  
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, duration));
  
  // Show completion
  setDemoStates(prev => ({ 
    ...prev, 
    [`is${action}`]: false,
    showNotification: true 
  }));
};
```

### Educational Value

```tsx
// Real-world scenario demonstrations
const scenarios = [
  {
    title: "Content Management",
    description: "Create new content items",
    buttons: [
      { label: "New Article", searchParam: { key: "create", value: "article" } },
      { label: "New Video", searchParam: { key: "create", value: "video" } }
    ]
  },
  {
    title: "User Management", 
    description: "Invite and manage users",
    buttons: [
      { label: "Invite User", searchParam: { key: "invite", value: "user" } }
    ]
  }
];
```

### Customization Options

```tsx
// Extend the demo with custom examples
const CustomDemo = () => {
  return (
    <div>
      <CreateButtonExample />      {/* Default demo */}
      
      <div className="custom-demo-section">
        <h3>Custom Examples</h3>
        {/* Add your own demo scenarios */}
      </div>
    </div>
  );
};
```

## ♿ Accessibility Features

- **Keyboard Navigation** - Tab through all interactive elements
- **Focus Indicators** - Clear visual focus states
- **Screen Reader Support** - Proper ARIA labels and descriptions
- **State Announcements** - Loading and completion states announced
- **Semantic Structure** - Proper heading hierarchy and landmarks

## 🎯 Use Cases

- **Component Documentation** - Show all button features in one place
- **Style Guides** - Visual reference for design systems
- **Developer Training** - Interactive learning tool
- **QA Testing** - Visual regression testing reference
- **Client Presentations** - Demonstrate component capabilities
- **Design Reviews** - Compare variants and states

## 🔗 Related Components

- [CreateButton](./CreateButton.md) - Main CreateButton component
- [SubmitButton](./SubmitButton.md) - Form submission button
- [ToggleButton](./ToggleButton.md) - Toggle state button
- [Action](./Action.md) - Generic action button
- [Dialog](./Dialog.md) - Modal dialogs for create actions

