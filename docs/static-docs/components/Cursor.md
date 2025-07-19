# Cursor

**Category:** Cursors | **Type:** component

A sophisticated custom cursor component featuring trailing effects, click animations, hover detection, and smooth transitions for enhanced user experience

## 📁 File Location

`src/components/cursors/Cursor.tsx`

## 🏷️ Tags

`cursors`, `animation`, `interaction`, `effects`, `ui`, `experience`

## 📖 Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `color` | `string` | No | `'var(--DarkCyan)'` | Color of the cursor elements |
| `size` | `number` | No | `10` | Size of the main cursor in pixels |
| `trailingSize` | `number` | No | `30` | Size of the trailing cursor in pixels |
| `trailingDuration` | `number` | No | `200` | Duration of the trailing effect in milliseconds |
| `hideDefaultCursor` | `boolean` | No | `true` | Whether to hide the default system cursor |
| `clickEffect` | `boolean` | No | `true` | Whether to activate click animation effects |

## 🎨 CSS Classes

- `ihub-cursor-hidden` - Applied to body to hide default cursor
- Custom styles are applied inline for optimal performance

## 🌟 Features

- **Smooth Trailing Effect** - Delayed following cursor with customizable timing
- **Click Animations** - Visual feedback for mouse interactions
- **Hover Detection** - Automatic detection of clickable elements
- **Blend Modes** - Advanced visual effects with mix-blend-mode
- **Performance Optimized** - RAF-based updates and efficient event handling
- **Responsive Design** - Adapts to different screen sizes and contexts

```tsx
"use client";
import React, { useState } from "react";
import { Cursor } from "@instincthub/react-ui";

/**
 * Comprehensive Cursor examples demonstrating various configurations
 */
const CursorExamples = () => {
  const [currentTheme, setCurrentTheme] = useState('default');
  const [showCursor, setShowCursor] = useState(true);
  const [cursorConfig, setCursorConfig] = useState({
    color: 'var(--DarkCyan)',
    size: 10,
    trailingSize: 30,
    trailingDuration: 200,
    clickEffect: true
  });

  const themes = {
    default: {
      color: 'var(--DarkCyan)',
      size: 10,
      trailingSize: 30,
      name: 'Default Theme'
    },
    vibrant: {
      color: '#FF6B6B',
      size: 12,
      trailingSize: 35,
      name: 'Vibrant Red'
    },
    minimal: {
      color: '#333333',
      size: 6,
      trailingSize: 20,
      name: 'Minimal Dark'
    },
    electric: {
      color: '#00D9FF',
      size: 15,
      trailingSize: 40,
      name: 'Electric Blue'
    },
    sunset: {
      color: '#FF8C00',
      size: 14,
      trailingSize: 45,
      name: 'Sunset Orange'
    }
  };

  const handleThemeChange = (themeKey: string) => {
    const theme = themes[themeKey as keyof typeof themes];
    setCurrentTheme(themeKey);
    setCursorConfig(prev => ({
      ...prev,
      color: theme.color,
      size: theme.size,
      trailingSize: theme.trailingSize
    }));
  };

  const handleConfigChange = (key: string, value: any) => {
    setCursorConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="ihub-container ihub-mt-5">
      {/* Render the cursor component */}
      {showCursor && (
        <Cursor
          color={cursorConfig.color}
          size={cursorConfig.size}
          trailingSize={cursorConfig.trailingSize}
          trailingDuration={cursorConfig.trailingDuration}
          clickEffect={cursorConfig.clickEffect}
          hideDefaultCursor={true}
        />
      )}

      <h1>Custom Cursor Component</h1>
      <p className="ihub-text-muted">
        Interactive cursor with trailing effects and hover detection. Move your mouse around to see the effects!
      </p>

      {/* Cursor Control Panel */}
      <div className="ihub-mb-5">
        <div className="ihub-card ihub-p-4">
          <h3>Cursor Controls</h3>
          
          {/* Enable/Disable Toggle */}
          <div className="ihub-mb-3">
            <label className="ihub-d-flex ihub-align-items-center" style={{ gap: '10px' }}>
              <input
                type="checkbox"
                checked={showCursor}
                onChange={(e) => setShowCursor(e.target.checked)}
              />
              <span>Enable Custom Cursor</span>
            </label>
          </div>

          {/* Theme Selection */}
          <div className="ihub-mb-3">
            <h5>Preset Themes</h5>
            <div className="ihub-d-flex" style={{ gap: '10px', flexWrap: 'wrap' }}>
              {Object.entries(themes).map(([key, theme]) => (
                <button
                  key={key}
                  className={`ihub-btn ${currentTheme === key ? 'ihub-primary-btn' : 'ihub-outlined-btn'}`}
                  onClick={() => handleThemeChange(key)}
                  style={{ fontSize: '14px', padding: '8px 16px' }}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Configuration */}
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <div className="ihub-form-group">
                <label>Color:</label>
                <div className="ihub-d-flex" style={{ gap: '10px', alignItems: 'center' }}>
                  <input
                    type="color"
                    value={cursorConfig.color.startsWith('#') ? cursorConfig.color : '#00CED1'}
                    onChange={(e) => handleConfigChange('color', e.target.value)}
                    style={{ width: '50px', height: '35px' }}
                  />
                  <input
                    type="text"
                    value={cursorConfig.color}
                    onChange={(e) => handleConfigChange('color', e.target.value)}
                    className="ihub-form-control"
                    placeholder="CSS color value"
                  />
                </div>
              </div>
            </div>
            
            <div className="ihub-col-md-6">
              <div className="ihub-form-group">
                <label>Main Cursor Size: {cursorConfig.size}px</label>
                <input
                  type="range"
                  min="4"
                  max="20"
                  value={cursorConfig.size}
                  onChange={(e) => handleConfigChange('size', parseInt(e.target.value))}
                  className="ihub-form-range"
                />
              </div>
            </div>
            
            <div className="ihub-col-md-6">
              <div className="ihub-form-group">
                <label>Trailing Size: {cursorConfig.trailingSize}px</label>
                <input
                  type="range"
                  min="15"
                  max="60"
                  value={cursorConfig.trailingSize}
                  onChange={(e) => handleConfigChange('trailingSize', parseInt(e.target.value))}
                  className="ihub-form-range"
                />
              </div>
            </div>
            
            <div className="ihub-col-md-6">
              <div className="ihub-form-group">
                <label>Trailing Duration: {cursorConfig.trailingDuration}ms</label>
                <input
                  type="range"
                  min="50"
                  max="500"
                  value={cursorConfig.trailingDuration}
                  onChange={(e) => handleConfigChange('trailingDuration', parseInt(e.target.value))}
                  className="ihub-form-range"
                />
              </div>
            </div>
          </div>

          <div className="ihub-form-group">
            <label className="ihub-d-flex ihub-align-items-center" style={{ gap: '10px' }}>
              <input
                type="checkbox"
                checked={cursorConfig.clickEffect}
                onChange={(e) => handleConfigChange('clickEffect', e.target.checked)}
              />
              <span>Enable Click Effects</span>
            </label>
          </div>
        </div>
      </div>

      {/* Interactive Elements Demo */}
      <div className="ihub-mb-5">
        <h2>Interactive Elements</h2>
        <p>Hover over these elements to see how the cursor adapts:</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <h4>Buttons</h4>
            <div className="ihub-d-flex" style={{ gap: '10px', flexDirection: 'column' }}>
              <button className="ihub-primary-btn">
                Primary Button
              </button>
              <button className="ihub-outlined-btn">
                Outlined Button
              </button>
              <button className="ihub-danger-btn">
                Danger Button
              </button>
            </div>
          </div>
          
          <div className="ihub-col-md-4">
            <h4>Links</h4>
            <div className="ihub-d-flex" style={{ gap: '10px', flexDirection: 'column' }}>
              <a href="#" className="ihub-link">
                Standard Link
              </a>
              <a href="#" className="ihub-link ihub-text-primary">
                Primary Link
              </a>
              <a href="#" className="ihub-link ihub-text-danger">
                Danger Link
              </a>
            </div>
          </div>
          
          <div className="ihub-col-md-4">
            <h4>Form Elements</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="text"
                className="ihub-form-control"
                placeholder="Text input"
              />
              <select className="ihub-form-control">
                <option>Select option</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
              <textarea
                className="ihub-form-control"
                placeholder="Textarea"
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Animation Test Area */}
      <div className="ihub-mb-5">
        <h2>Click Animation Test</h2>
        <p>Click anywhere in this area to see the cursor click effect:</p>
        
        <div 
          className="ihub-card ihub-p-5"
          style={{ 
            minHeight: '200px', 
            backgroundColor: '#f8f9fa',
            border: '2px dashed #dee2e6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          onClick={() => console.log('Click detected!')}
        >
          <div className="ihub-text-center">
            <h4>Click Test Area</h4>
            <p className="ihub-text-muted">
              Click anywhere in this box to see the cursor animation
            </p>
            <small>Check the console for click events</small>
          </div>
        </div>
      </div>

      {/* Performance Demo */}
      <div className="ihub-mb-5">
        <h2>Performance Test</h2>
        <p>Move your cursor rapidly across these elements to test performance:</p>
        
        <div className="ihub-row">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="ihub-col-md-3 ihub-col-sm-6 ihub-mb-3">
              <div 
                className="ihub-card ihub-p-3 ihub-text-center"
                style={{ 
                  height: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <strong>Element {i + 1}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Code Examples */}
      <div className="ihub-mb-5">
        <h2>Implementation Examples</h2>
        
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <h4>Basic Usage</h4>
            <div className="ihub-card ihub-p-3">
              <pre style={{ fontSize: '14px', margin: 0 }}>
{`// Basic cursor with default settings
<Cursor />

// Custom color and size
<Cursor 
  color="#FF6B6B" 
  size={12} 
  trailingSize={35}
/>`}
              </pre>
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <h4>Advanced Configuration</h4>
            <div className="ihub-card ihub-p-3">
              <pre style={{ fontSize: '14px', margin: 0 }}>
{`// Full customization
<Cursor
  color="var(--primary-color)"
  size={15}
  trailingSize={40}
  trailingDuration={150}
  clickEffect={true}
  hideDefaultCursor={true}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Tips and Best Practices */}
      <div className="ihub-mb-5">
        <h2>Tips & Best Practices</h2>
        
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-3">
              <h5>Performance Tips</h5>
              <ul>
                <li>Use moderate trailing durations (100-300ms)</li>
                <li>Avoid extremely large cursor sizes</li>
                <li>Consider disabling on mobile devices</li>
                <li>Test with keyboard navigation users</li>
              </ul>
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-3">
              <h5>Design Guidelines</h5>
              <ul>
                <li>Choose colors that contrast well with your design</li>
                <li>Keep cursor size proportional to your UI scale</li>
                <li>Consider your brand colors for theming</li>
                <li>Test accessibility with screen readers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Showcase */}
      <div className="ihub-mb-5">
        <h2>Feature Showcase</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-p-3">
              <h6>Trailing Effect</h6>
              <p>Smooth delayed following with customizable timing and size.</p>
            </div>
          </div>
          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-p-3">
              <h6>Click Animation</h6>
              <p>Visual feedback on mouse down/up events with size scaling.</p>
            </div>
          </div>
          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-p-3">
              <h6>Smart Detection</h6>
              <p>Automatically detects hoverable elements and adapts appearance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CursorExamples;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { Cursor } from '@instincthub/react-ui';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { Cursor } from '@instincthub/react-ui';

function App() {
  return (
    <div>
      {/* Place cursor component at the root level */}
      <Cursor />
      
      {/* Your app content */}
      <main>
        <h1>Welcome to my app</h1>
        <button>Click me</button>
      </main>
    </div>
  );
}
```

## 🔧 Implementation Guide

### Basic Setup

```tsx
// Simple setup with default settings
const App = () => {
  return (
    <>
      <Cursor />
      <YourAppContent />
    </>
  );
};
```

### Theme Integration

```tsx
// Using CSS custom properties for theming
const ThemedCursor = () => {
  return (
    <Cursor
      color="var(--cursor-color, #00CED1)"
      size={10}
      trailingSize={30}
    />
  );
};

// CSS
:root {
  --cursor-color: #00CED1;
}

[data-theme="dark"] {
  --cursor-color: #FFD700;
}
```

### Conditional Rendering

```tsx
// Disable on mobile devices
const ResponsiveCursor = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);
  
  if (isMobile) return null;
  
  return <Cursor />;
};
```

### Advanced Configuration

```tsx
// Dynamic cursor that adapts to user preferences
const AdaptiveCursor = () => {
  const [cursorSettings, setCursorSettings] = useState({
    color: '#00CED1',
    size: 10,
    trailingSize: 30,
    trailingDuration: 200
  });
  
  // Load user preferences
  useEffect(() => {
    const saved = localStorage.getItem('cursor-preferences');
    if (saved) {
      setCursorSettings(JSON.parse(saved));
    }
  }, []);
  
  return (
    <Cursor
      color={cursorSettings.color}
      size={cursorSettings.size}
      trailingSize={cursorSettings.trailingSize}
      trailingDuration={cursorSettings.trailingDuration}
    />
  );
};
```

## ♿ Accessibility Features

- **Keyboard Navigation** - Doesn't interfere with keyboard-only users
- **Screen Reader Compatibility** - Cursor is hidden from assistive technology
- **Reduced Motion Support** - Consider disabling for users with motion sensitivity
- **High Contrast Mode** - Cursor adapts to system preferences
- **Performance Optimized** - Smooth animations without blocking interactions

## 🎯 Use Cases

- **Creative Portfolios** - Enhance visual appeal and interaction
- **Brand Experiences** - Custom cursors aligned with brand identity
- **Interactive Demos** - Guide user attention and engagement
- **Gaming Interfaces** - Immersive cursor effects
- **Premium Websites** - Add sophisticated interaction layer
- **Art & Design Sites** - Creative expression through cursor design

## 🔗 Related Components

- [CursorContext](./CursorContext.md) - Context provider for cursor state management
- [MagneticButton](./MagneticButton.md) - Button with magnetic cursor attraction
- [useCursorInteraction](./useCursorInteraction.md) - Hook for cursor interactions
- [CursorControlDemo](./CursorControlDemo.md) - Comprehensive cursor demo

