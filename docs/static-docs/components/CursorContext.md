# CursorContext

**Category:** Cursors | **Type:** context

A powerful React Context provider for global cursor state management, enabling dynamic cursor types, custom styling, and coordinated cursor behavior across your entire application

## 📁 File Location

`src/components/cursors/CursorContext.tsx`

## 🏷️ Tags

`cursors`, `context`, `state-management`, `hooks`, `provider`, `global-state`

## 📖 Provider Props

### CursorProvider

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `ReactNode` | Yes | - | Child components to wrap with cursor context |
| `enabled` | `boolean` | No | `true` | Whether to enable cursor tracking and effects |

## 🔌 Context Interface

### CursorContextProps

| Property | Type | Description |
|----------|------|-------------|
| `cursorType` | `CursorType` | Current active cursor type |
| `setCursorType` | `(type: CursorType) => void` | Function to update cursor type |
| `addCursorClass` | `(className: string) => void` | Add custom CSS class to cursor |
| `removeCursorClass` | `(className: string) => void` | Remove custom CSS class from cursor |
| `toggleCursorVisibility` | `(isVisible: boolean) => void` | Show/hide the cursor |
| `isCursorVisible` | `boolean` | Current cursor visibility state |

### CursorType Union

```tsx
type CursorType = 
  | "default"     // Standard cursor
  | "pointer"     // Hand pointer for clickable elements
  | "text"        // Text selection cursor
  | "loading"     // Loading/busy cursor
  | "draggable"   // Drag and drop cursor
  | "not-allowed" // Disabled/restricted cursor
```

## 🎨 CSS Classes

### Applied to Document Body
- `ihub-cursor-default` - Default cursor state
- `ihub-cursor-pointer` - Pointer cursor state
- `ihub-cursor-text` - Text selection cursor state
- `ihub-cursor-loading` - Loading cursor state
- `ihub-cursor-draggable` - Draggable cursor state
- `ihub-cursor-not-allowed` - Disabled cursor state
- `ihub-cursor-hidden` - Hidden cursor state

## 🌟 Features

- **Global State Management** - Centralized cursor state across components
- **Dynamic Cursor Types** - Multiple predefined cursor states
- **Custom Class Support** - Add/remove custom CSS classes
- **Visibility Control** - Show/hide cursor programmatically
- **HOC Support** - Higher-order component for easy integration
- **TypeScript Support** - Full type safety and IntelliSense

```tsx
"use client";
import React, { useState, useEffect } from "react";
import { CursorProvider, useCursor, withCursorEffect } from "@instincthub/react-ui";

/**
 * Comprehensive CursorContext examples demonstrating global cursor management
 */
const CursorContextExamples = () => {
  return (
    <CursorProvider enabled={true}>
      <CursorContextDemo />
    </CursorProvider>
  );
};

const CursorContextDemo = () => {
  const {
    cursorType,
    setCursorType,
    addCursorClass,
    removeCursorClass,
    toggleCursorVisibility,
    isCursorVisible
  } = useCursor();

  const [customTheme, setCustomTheme] = useState('default');
  const [isInteracting, setIsInteracting] = useState(false);

  // Demo state for various interactions
  const [demoState, setDemoState] = useState({
    isDragging: false,
    isLoading: false,
    hasError: false,
    selectedText: false
  });

  // Handle theme changes
  const handleThemeChange = (theme: string) => {
    // Remove previous theme classes
    removeCursorClass('ihub-cursor-theme-dark');
    removeCursorClass('ihub-cursor-theme-colorful');
    removeCursorClass('ihub-cursor-theme-minimal');
    
    // Add new theme class
    if (theme !== 'default') {
      addCursorClass(`ihub-cursor-theme-${theme}`);
    }
    
    setCustomTheme(theme);
  };

  // Simulate loading state
  const simulateLoading = async () => {
    setDemoState(prev => ({ ...prev, isLoading: true }));
    setCursorType('loading');
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setDemoState(prev => ({ ...prev, isLoading: false }));
    setCursorType('default');
  };

  // Simulate drag operation
  const handleDragStart = () => {
    setDemoState(prev => ({ ...prev, isDragging: true }));
    setCursorType('draggable');
    addCursorClass('ihub-cursor-dragging');
  };

  const handleDragEnd = () => {
    setDemoState(prev => ({ ...prev, isDragging: false }));
    setCursorType('default');
    removeCursorClass('ihub-cursor-dragging');
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>CursorContext Management System</h1>
      <p className="ihub-text-muted">
        Global cursor state management with React Context. Control cursor behavior across your entire application.
      </p>

      {/* Current State Display */}
      <div className="ihub-mb-5">
        <div className="ihub-card ihub-p-4">
          <h3>Current Cursor State</h3>
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <table className="ihub-table">
                <tbody>
                  <tr>
                    <td><strong>Current Type:</strong></td>
                    <td>
                      <span className={`ihub-badge ihub-badge-${cursorType === 'default' ? 'secondary' : 'primary'}`}>
                        {cursorType}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Visibility:</strong></td>
                    <td>
                      <span className={`ihub-badge ihub-badge-${isCursorVisible ? 'success' : 'danger'}`}>
                        {isCursorVisible ? 'Visible' : 'Hidden'}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Theme:</strong></td>
                    <td>
                      <span className="ihub-badge ihub-badge-info">
                        {customTheme}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="ihub-col-md-6">
              <div className="ihub-form-group">
                <label>Cursor Visibility:</label>
                <div className="ihub-d-flex" style={{ gap: '10px' }}>
                  <button
                    className={`ihub-btn ${isCursorVisible ? 'ihub-primary-btn' : 'ihub-outlined-btn'}`}
                    onClick={() => toggleCursorVisibility(true)}
                  >
                    Show
                  </button>
                  <button
                    className={`ihub-btn ${!isCursorVisible ? 'ihub-danger-btn' : 'ihub-outlined-btn'}`}
                    onClick={() => toggleCursorVisibility(false)}
                  >
                    Hide
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cursor Type Controls */}
      <div className="ihub-mb-5">
        <h2>Cursor Type Controls</h2>
        <p>Click buttons to change the global cursor type:</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-8">
            <div className="ihub-d-flex" style={{ gap: '10px', flexWrap: 'wrap' }}>
              <button
                className={`ihub-btn ${cursorType === 'default' ? 'ihub-primary-btn' : 'ihub-outlined-btn'}`}
                onClick={() => setCursorType('default')}
              >
                Default
              </button>
              <button
                className={`ihub-btn ${cursorType === 'pointer' ? 'ihub-primary-btn' : 'ihub-outlined-btn'}`}
                onClick={() => setCursorType('pointer')}
              >
                Pointer
              </button>
              <button
                className={`ihub-btn ${cursorType === 'text' ? 'ihub-primary-btn' : 'ihub-outlined-btn'}`}
                onClick={() => setCursorType('text')}
              >
                Text
              </button>
              <button
                className={`ihub-btn ${cursorType === 'loading' ? 'ihub-primary-btn' : 'ihub-outlined-btn'}`}
                onClick={() => setCursorType('loading')}
                disabled={demoState.isLoading}
              >
                Loading
              </button>
              <button
                className={`ihub-btn ${cursorType === 'draggable' ? 'ihub-primary-btn' : 'ihub-outlined-btn'}`}
                onClick={() => setCursorType('draggable')}
              >
                Draggable
              </button>
              <button
                className={`ihub-btn ${cursorType === 'not-allowed' ? 'ihub-danger-btn' : 'ihub-outlined-btn'}`}
                onClick={() => setCursorType('not-allowed')}
              >
                Not Allowed
              </button>
            </div>
          </div>
          <div className="ihub-col-md-4">
            <button
              className="ihub-important-btn ihub-w-100"
              onClick={simulateLoading}
              disabled={demoState.isLoading}
            >
              {demoState.isLoading ? 'Loading...' : 'Simulate Loading'}
            </button>
          </div>
        </div>
      </div>

      {/* Theme Controls */}
      <div className="ihub-mb-5">
        <h2>Cursor Themes</h2>
        <p>Apply different visual themes to the cursor:</p>
        
        <div className="ihub-d-flex" style={{ gap: '10px', flexWrap: 'wrap' }}>
          <button
            className={`ihub-btn ${customTheme === 'default' ? 'ihub-primary-btn' : 'ihub-outlined-btn'}`}
            onClick={() => handleThemeChange('default')}
          >
            Default Theme
          </button>
          <button
            className={`ihub-btn ${customTheme === 'dark' ? 'ihub-primary-btn' : 'ihub-outlined-btn'}`}
            onClick={() => handleThemeChange('dark')}
          >
            Dark Theme
          </button>
          <button
            className={`ihub-btn ${customTheme === 'colorful' ? 'ihub-primary-btn' : 'ihub-outlined-btn'}`}
            onClick={() => handleThemeChange('colorful')}
          >
            Colorful Theme
          </button>
          <button
            className={`ihub-btn ${customTheme === 'minimal' ? 'ihub-primary-btn' : 'ihub-outlined-btn'}`}
            onClick={() => handleThemeChange('minimal')}
          >
            Minimal Theme
          </button>
        </div>
      </div>

      {/* Interactive Elements Demo */}
      <div className="ihub-mb-5">
        <h2>Interactive Elements</h2>
        <p>Hover over these elements to see automatic cursor type changes:</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <h4>Hover Effects</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div
                className="ihub-card ihub-p-3"
                onMouseEnter={() => setCursorType('pointer')}
                onMouseLeave={() => setCursorType('default')}
                style={{ cursor: 'pointer' }}
              >
                Hover for Pointer Cursor
              </div>
              
              <div
                className="ihub-card ihub-p-3"
                onMouseEnter={() => setCursorType('text')}
                onMouseLeave={() => setCursorType('default')}
                style={{ cursor: 'text' }}
              >
                Hover for Text Cursor
              </div>
              
              <div
                className="ihub-card ihub-p-3"
                onMouseEnter={() => setCursorType('not-allowed')}
                onMouseLeave={() => setCursorType('default')}
                style={{ cursor: 'not-allowed' }}
              >
                Hover for Not-Allowed Cursor
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-4">
            <h4>Drag & Drop Demo</h4>
            <div
              className="ihub-card ihub-p-4 ihub-text-center"
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              style={{
                backgroundColor: demoState.isDragging ? '#f0f8ff' : '#f8f9fa',
                border: demoState.isDragging ? '2px dashed #007bff' : '1px solid #dee2e6'
              }}
            >
              <h6>Draggable Element</h6>
              <p className="ihub-text-muted ihub-mb-0">
                {demoState.isDragging ? 'Dragging...' : 'Drag me!'}
              </p>
            </div>
          </div>
          
          <div className="ihub-col-md-4">
            <h4>Custom Classes Demo</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                className="ihub-outlined-btn"
                onClick={() => addCursorClass('ihub-cursor-glow')}
              >
                Add Glow Effect
              </button>
              <button
                className="ihub-outlined-btn"
                onClick={() => removeCursorClass('ihub-cursor-glow')}
              >
                Remove Glow Effect
              </button>
              <button
                className="ihub-outlined-btn"
                onClick={() => addCursorClass('ihub-cursor-large')}
              >
                Make Cursor Large
              </button>
              <button
                className="ihub-outlined-btn"
                onClick={() => removeCursorClass('ihub-cursor-large')}
              >
                Reset Cursor Size
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* HOC Example */}
      <div className="ihub-mb-5">
        <h2>Higher-Order Component (HOC) Example</h2>
        <p>Components wrapped with cursor effects:</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <HOCDemoComponent cursorType="pointer" />
          </div>
          <div className="ihub-col-md-6">
            <HOCDemoComponent cursorType="draggable" />
          </div>
        </div>
      </div>

      {/* Advanced Usage Examples */}
      <div className="ihub-mb-5">
        <h2>Advanced Usage Patterns</h2>
        
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <h4>Conditional Cursor States</h4>
            <div className="ihub-card ihub-p-3">
              <div className="ihub-form-group">
                <label className="ihub-d-flex ihub-align-items-center" style={{ gap: '10px' }}>
                  <input
                    type="checkbox"
                    checked={demoState.hasError}
                    onChange={(e) => {
                      setDemoState(prev => ({ ...prev, hasError: e.target.checked }));
                      setCursorType(e.target.checked ? 'not-allowed' : 'default');
                    }}
                  />
                  <span>Simulate Error State</span>
                </label>
              </div>
              
              <div className="ihub-form-group">
                <input
                  type="text"
                  className="ihub-form-control"
                  placeholder="Type here..."
                  onFocus={() => setCursorType('text')}
                  onBlur={() => setCursorType('default')}
                  disabled={demoState.hasError}
                />
              </div>
              
              {demoState.hasError && (
                <div className="ihub-alert ihub-alert-danger">
                  Error state active - cursor shows 'not-allowed'
                </div>
              )}
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <h4>Context-Aware Interactions</h4>
            <div className="ihub-card ihub-p-3">
              <div className="ihub-mb-3">
                <small className="ihub-text-muted">
                  Different areas with different cursor behaviors:
                </small>
              </div>
              
              <div
                className="ihub-mb-2 ihub-p-2"
                style={{ backgroundColor: '#e7f3ff', borderRadius: '4px' }}
                onMouseEnter={() => {
                  setCursorType('text');
                  addCursorClass('ihub-cursor-blue');
                }}
                onMouseLeave={() => {
                  setCursorType('default');
                  removeCursorClass('ihub-cursor-blue');
                }}
              >
                Text Selection Zone
              </div>
              
              <div
                className="ihub-mb-2 ihub-p-2"
                style={{ backgroundColor: '#fff3e0', borderRadius: '4px' }}
                onMouseEnter={() => {
                  setCursorType('pointer');
                  addCursorClass('ihub-cursor-orange');
                }}
                onMouseLeave={() => {
                  setCursorType('default');
                  removeCursorClass('ihub-cursor-orange');
                }}
              >
                Clickable Action Zone
              </div>
              
              <div
                className="ihub-p-2"
                style={{ backgroundColor: '#f3e5f5', borderRadius: '4px' }}
                onMouseEnter={() => {
                  setCursorType('draggable');
                  addCursorClass('ihub-cursor-purple');
                }}
                onMouseLeave={() => {
                  setCursorType('default');
                  removeCursorClass('ihub-cursor-purple');
                }}
              >
                Draggable Content Zone
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance & Best Practices */}
      <div className="ihub-mb-5">
        <h2>Performance & Best Practices</h2>
        
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-3">
              <h6>Context Benefits</h6>
              <ul>
                <li>Centralized cursor state management</li>
                <li>Consistent cursor behavior across components</li>
                <li>Automatic cleanup of cursor classes</li>
                <li>TypeScript support for type safety</li>
                <li>Performance optimized with React Context</li>
              </ul>
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-3">
              <h6>Usage Tips</h6>
              <ul>
                <li>Place CursorProvider at the root of your app</li>
                <li>Use useCursor hook in components that need cursor control</li>
                <li>Reset cursor to 'default' when leaving interactive areas</li>
                <li>Consider disabling on mobile devices</li>
                <li>Test with keyboard navigation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// HOC Demo Component
const BasicComponent = ({ cursorType }: { cursorType: string }) => (
  <div className="ihub-card ihub-p-3 ihub-text-center">
    <h6>HOC Wrapped Component</h6>
    <p className="ihub-text-muted ihub-mb-0">
      Hover to activate {cursorType} cursor
    </p>
  </div>
);

const HOCDemoComponent = withCursorEffect({
  Component: BasicComponent,
  cursorType: 'pointer'
});

export default CursorContextExamples;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { CursorProvider, useCursor, withCursorEffect } from '@instincthub/react-ui';
```

## 🚀 Basic Usage

### Setting Up the Provider

```tsx
import React from 'react';
import { CursorProvider } from '@instincthub/react-ui';

function App() {
  return (
    <CursorProvider enabled={true}>
      <YourAppContent />
    </CursorProvider>
  );
}
```

### Using the Hook

```tsx
import React from 'react';
import { useCursor } from '@instincthub/react-ui';

function InteractiveComponent() {
  const { setCursorType, addCursorClass, removeCursorClass } = useCursor();

  return (
    <div
      onMouseEnter={() => setCursorType('pointer')}
      onMouseLeave={() => setCursorType('default')}
    >
      Hover me!
    </div>
  );
}
```

## 🔧 Implementation Guide

### App-Level Setup

```tsx
// App.tsx - Root level setup
import { CursorProvider } from '@instincthub/react-ui';

function App() {
  return (
    <CursorProvider enabled={true}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </CursorProvider>
  );
}
```

### Component-Level Usage

```tsx
// Interactive component with cursor control
import { useCursor } from '@instincthub/react-ui';

const InteractiveCard = () => {
  const { setCursorType, addCursorClass, removeCursorClass } = useCursor();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setCursorType('pointer');
    addCursorClass('ihub-cursor-scale');
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setCursorType('default');
    removeCursorClass('ihub-cursor-scale');
    setIsHovered(false);
  };

  return (
    <div
      className="interactive-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h3>Interactive Content</h3>
      <p>Hover to see cursor effects</p>
    </div>
  );
};
```

### HOC Pattern

```tsx
// Using the Higher-Order Component
import { withCursorEffect } from '@instincthub/react-ui';

const MyButton = ({ children }) => (
  <button className="my-button">{children}</button>
);

// Wrap with cursor effect
const CursorEnhancedButton = withCursorEffect({
  Component: MyButton,
  cursorType: 'pointer'
});

// Usage
<CursorEnhancedButton>Click me!</CursorEnhancedButton>
```

### Advanced State Management

```tsx
// Complex cursor state management
const AdvancedComponent = () => {
  const { 
    cursorType, 
    setCursorType, 
    addCursorClass, 
    removeCursorClass,
    toggleCursorVisibility 
  } = useCursor();
  
  const [appState, setAppState] = useState({
    isLoading: false,
    isError: false,
    isDragging: false
  });

  // Effect to update cursor based on app state
  useEffect(() => {
    if (appState.isLoading) {
      setCursorType('loading');
      addCursorClass('ihub-cursor-pulse');
    } else if (appState.isError) {
      setCursorType('not-allowed');
      addCursorClass('ihub-cursor-error');
    } else if (appState.isDragging) {
      setCursorType('draggable');
      addCursorClass('ihub-cursor-dragging');
    } else {
      setCursorType('default');
      removeCursorClass('ihub-cursor-pulse');
      removeCursorClass('ihub-cursor-error');
      removeCursorClass('ihub-cursor-dragging');
    }
  }, [appState, setCursorType, addCursorClass, removeCursorClass]);

  return (
    <div>
      {/* Your component content */}
    </div>
  );
};
```

### CSS Integration

```css
/* Custom cursor styles */
.ihub-cursor-theme-dark {
  --cursor-color: #ffffff;
  --cursor-bg: #000000;
}

.ihub-cursor-theme-colorful {
  --cursor-color: #ff6b6b;
  --cursor-bg: linear-gradient(45deg, #ff6b6b, #4ecdc4);
}

.ihub-cursor-glow {
  filter: drop-shadow(0 0 10px var(--cursor-color));
}

.ihub-cursor-large {
  transform: scale(1.5);
}

.ihub-cursor-pulse {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

## ♿ Accessibility Features

- **Keyboard Navigation** - Context doesn't interfere with keyboard users
- **Screen Reader Support** - Cursor changes don't affect screen readers
- **Reduced Motion** - Respects user motion preferences
- **Focus Management** - Works with browser focus indicators
- **ARIA Compatibility** - Compatible with ARIA attributes

## 🎯 Use Cases

- **Application-wide Cursor Control** - Centralized cursor management
- **Interactive UI Components** - Dynamic cursor feedback
- **Drag and Drop Interfaces** - Visual drag state indication
- **Loading States** - Global loading cursor control
- **Error States** - Disabled interaction indication
- **Text Selection Areas** - Enhanced text interaction feedback

## 🔗 Related Components

- [Cursor](./Cursor.md) - Custom cursor component with trailing effects
- [MagneticButton](./MagneticButton.md) - Button with magnetic cursor attraction
- [useCursorInteraction](./useCursorInteraction.md) - Hook for cursor interactions
- [CursorControlDemo](./CursorControlDemo.md) - Comprehensive cursor demo

