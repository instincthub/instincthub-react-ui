# CursorControlDemo

An interactive cursor effects component that provides a comprehensive demo for custom cursor interactions, magnetic effects, and visual enhancements. This component demonstrates advanced cursor behaviors including magnetic attraction, ripple effects, and cursor type switching.

## Component Structure

The `CursorControlDemo` consists of three main parts:
- **CursorControls**: Control panel for cursor type, visibility, and custom classes
- **CursorInteractionArea**: Interactive area with magnetic buttons and ripple effects
- **CursorControlDemo**: Main wrapper component with cursor settings

## Props

### CursorControlDemo Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialColor` | `string` | `'var(--DarkCyan)'` | Initial cursor color |

## Basic Usage

```tsx
"use client";

import React from 'react';
import { CursorControlDemo } from 'instincthub-react-ui';

export default function BasicCursorDemo() {
  return (
    <div>
      <h1>Cursor Effects Demo</h1>
      <CursorControlDemo />
    </div>
  );
}
```

## Advanced Usage

### Custom Color Theme

```tsx
"use client";

import React, { useState } from 'react';
import { CursorControlDemo } from 'instincthub-react-ui';

export default function CustomCursorDemo() {
  const [selectedTheme, setSelectedTheme] = useState('dark');
  
  const themes = {
    dark: 'var(--DarkCyan)',
    light: '#3B82F6',
    purple: '#8B5CF6',
    red: '#EF4444'
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h2>Theme Selection</h2>
        {Object.entries(themes).map(([name, color]) => (
          <button
            key={name}
            onClick={() => setSelectedTheme(name)}
            style={{
              backgroundColor: selectedTheme === name ? color : 'transparent',
              color: selectedTheme === name ? 'white' : color,
              border: `2px solid ${color}`,
              margin: '0 5px',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </button>
        ))}
      </div>
      
      <CursorControlDemo initialColor={themes[selectedTheme]} />
    </div>
  );
}
```

### With Context Provider

```tsx
"use client";

import React from 'react';
import { 
  CursorProvider, 
  CursorControlDemo, 
  useCursor 
} from 'instincthub-react-ui';

function CursorStatus() {
  const { cursorType, isCursorVisible } = useCursor();
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: '#333', 
      color: 'white', 
      padding: '10px', 
      borderRadius: '4px',
      fontSize: '12px'
    }}>
      <div>Type: {cursorType}</div>
      <div>Visible: {isCursorVisible ? 'Yes' : 'No'}</div>
    </div>
  );
}

export default function AdvancedCursorDemo() {
  return (
    <CursorProvider>
      <CursorStatus />
      <CursorControlDemo initialColor="#FF6B6B" />
    </CursorProvider>
  );
}
```

## Form Integration

### Interactive Form with Cursor Effects

```tsx
"use client";

import React, { useState } from 'react';
import { 
  CursorProvider, 
  Cursor, 
  MagneticButton,
  useCursorInteraction 
} from 'instincthub-react-ui';

function CursorForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { ref: submitRef, isHovered } = useCursorInteraction({
    magnetic: true,
    magneticStrength: 0.8,
    highlight: true,
    cursorType: "pointer"
  });

  const { createRippleEffect } = useCursorInteraction({
    ripple: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createRippleEffect(e as any);
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <CursorProvider>
      <Cursor color="#8B5CF6" size={12} trailingSize={35} />
      
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2>Contact Form with Cursor Effects</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '2px solid #e1e1e1',
              borderRadius: '4px',
              fontSize: '16px'
            }}
            placeholder="Your name"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '2px solid #e1e1e1',
              borderRadius: '4px',
              fontSize: '16px'
            }}
            placeholder="your.email@example.com"
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            style={{
              width: '100%',
              padding: '10px',
              border: '2px solid #e1e1e1',
              borderRadius: '4px',
              fontSize: '16px',
              resize: 'vertical'
            }}
            placeholder="Your message here..."
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <MagneticButton
            ref={submitRef}
            type="submit"
            style={{
              backgroundColor: isHovered ? '#7C3AED' : '#8B5CF6',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Send Message
          </MagneticButton>

          <button
            type="reset"
            onClick={() => setFormData({ name: '', email: '', message: '' })}
            style={{
              backgroundColor: 'transparent',
              color: '#666',
              border: '2px solid #e1e1e1',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </CursorProvider>
  );
}

export default CursorForm;
```

## Component State Management

### Cursor Settings Manager

```tsx
"use client";

import React, { useState, useEffect } from 'react';
import { CursorProvider, Cursor, useCursor } from 'instincthub-react-ui';

interface CursorSettings {
  color: string;
  size: number;
  trailingSize: number;
  type: string;
  visible: boolean;
}

function CursorSettingsPanel() {
  const { cursorType, setCursorType, toggleCursorVisibility, isCursorVisible } = useCursor();
  const [settings, setSettings] = useState<CursorSettings>({
    color: '#3B82F6',
    size: 10,
    trailingSize: 30,
    type: 'default',
    visible: true
  });

  const [savedPresets, setSavedPresets] = useState<CursorSettings[]>([]);

  const updateSetting = (key: keyof CursorSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const savePreset = () => {
    const newPreset = { ...settings, type: cursorType, visible: isCursorVisible };
    setSavedPresets(prev => [...prev, newPreset]);
  };

  const loadPreset = (preset: CursorSettings) => {
    setSettings(preset);
    setCursorType(preset.type as any);
    toggleCursorVisibility(preset.visible);
  };

  const exportSettings = () => {
    const settingsJson = JSON.stringify(settings, null, 2);
    navigator.clipboard.writeText(settingsJson);
    alert('Settings copied to clipboard!');
  };

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr', 
      gap: '20px',
      padding: '20px'
    }}>
      <div>
        <h3>Cursor Settings</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label>Color:</label>
          <input
            type="color"
            value={settings.color}
            onChange={(e) => updateSetting('color', e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Size: {settings.size}px</label>
          <input
            type="range"
            min="5"
            max="25"
            value={settings.size}
            onChange={(e) => updateSetting('size', parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Trailing Size: {settings.trailingSize}px</label>
          <input
            type="range"
            min="20"
            max="80"
            value={settings.trailingSize}
            onChange={(e) => updateSetting('trailingSize', parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Type:</label>
          <select
            value={cursorType}
            onChange={(e) => setCursorType(e.target.value as any)}
            style={{ marginLeft: '10px', padding: '5px' }}
          >
            <option value="default">Default</option>
            <option value="pointer">Pointer</option>
            <option value="text">Text</option>
            <option value="loading">Loading</option>
            <option value="draggable">Draggable</option>
            <option value="not-allowed">Not Allowed</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <button 
            onClick={() => toggleCursorVisibility(!isCursorVisible)}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: isCursorVisible ? '#22C55E' : '#EF4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            {isCursorVisible ? 'Hide Cursor' : 'Show Cursor'}
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={savePreset} style={{ padding: '8px 16px' }}>
            Save Preset
          </button>
          <button onClick={exportSettings} style={{ padding: '8px 16px' }}>
            Export Settings
          </button>
        </div>
      </div>

      <div>
        <h3>Saved Presets</h3>
        {savedPresets.length === 0 ? (
          <p>No presets saved yet</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {savedPresets.map((preset, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid #e1e1e1',
                  padding: '10px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                onClick={() => loadPreset(preset)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: preset.color,
                      borderRadius: '50%'
                    }}
                  />
                  <span>Size: {preset.size}px</span>
                  <span>Trail: {preset.trailingSize}px</span>
                  <span>Type: {preset.type}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CursorSettingsDemo() {
  const [settings, setSettings] = useState({
    color: '#3B82F6',
    size: 10,
    trailingSize: 30
  });

  return (
    <CursorProvider>
      <Cursor 
        color={settings.color}
        size={settings.size}
        trailingSize={settings.trailingSize}
      />
      <CursorSettingsPanel />
    </CursorProvider>
  );
}
```

## Error Handling

### Cursor Error Boundary

```tsx
"use client";

import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class CursorErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Cursor component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{ 
          padding: '20px', 
          border: '1px solid #ff6b6b', 
          borderRadius: '4px',
          backgroundColor: '#ffe0e0',
          color: '#d63031'
        }}>
          <h3>Cursor Error</h3>
          <p>Something went wrong with the cursor component.</p>
          <details>
            <summary>Error details</summary>
            <pre>{this.state.error?.message}</pre>
          </details>
          <button 
            onClick={() => this.setState({ hasError: false })}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#d63031', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              marginTop: '10px'
            }}
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage with error boundary
export default function SafeCursorDemo() {
  return (
    <CursorErrorBoundary>
      <CursorControlDemo initialColor="#FF6B6B" />
    </CursorErrorBoundary>
  );
}
```

## Testing Examples

### Unit Tests

```tsx
// __tests__/CursorControlDemo.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CursorControlDemo, CursorProvider } from 'instincthub-react-ui';

describe('CursorControlDemo', () => {
  const renderWithProvider = (component: React.ReactElement) => {
    return render(
      <CursorProvider>
        {component}
      </CursorProvider>
    );
  };

  test('renders cursor demo with default props', () => {
    renderWithProvider(<CursorControlDemo />);
    expect(screen.getByText('InstinctHub Cursor Demo')).toBeInTheDocument();
  });

  test('changes cursor type when button clicked', () => {
    renderWithProvider(<CursorControlDemo />);
    
    const pointerButton = screen.getByText('pointer');
    fireEvent.click(pointerButton);
    
    expect(pointerButton).toHaveClass('ihub-important-btn');
  });

  test('toggles cursor visibility', () => {
    renderWithProvider(<CursorControlDemo />);
    
    const visibilityButton = screen.getByText('Hide Cursor');
    fireEvent.click(visibilityButton);
    
    expect(screen.getByText('Show Cursor')).toBeInTheDocument();
  });

  test('adds custom class to body', () => {
    renderWithProvider(<CursorControlDemo />);
    
    const input = screen.getByPlaceholderText('Class Name');
    const addButton = screen.getByText('Add Class');
    
    fireEvent.change(input, { target: { value: 'test-class' } });
    fireEvent.click(addButton);
    
    expect(document.body).toHaveClass('test-class');
  });

  test('creates ripple effect on click', () => {
    renderWithProvider(<CursorControlDemo />);
    
    const rippleArea = screen.getByText('Click anywhere in this area to create a ripple effect.');
    fireEvent.click(rippleArea);
    
    // Test that ripple effect was triggered (you might need to mock the implementation)
    expect(rippleArea).toBeInTheDocument();
  });
});
```

## Accessibility Features

### Accessible Cursor Demo

```tsx
"use client";

import React, { useState } from 'react';
import { CursorProvider, Cursor } from 'instincthub-react-ui';

export default function AccessibleCursorDemo() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  // Check for user preference
  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    
    setReducedMotion(prefersReducedMotion);
    setHighContrast(prefersHighContrast);
  }, []);

  return (
    <CursorProvider>
      {!reducedMotion && (
        <Cursor 
          color={highContrast ? '#000000' : '#3B82F6'}
          size={highContrast ? 15 : 10}
          trailingSize={reducedMotion ? 0 : 30}
        />
      )}
      
      <div style={{ padding: '20px' }}>
        <h1>Accessible Cursor Demo</h1>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => setReducedMotion(e.target.checked)}
              aria-describedby="reduced-motion-desc"
            />
            Reduced Motion
          </label>
          <small id="reduced-motion-desc">
            Disable cursor animations for better accessibility
          </small>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              checked={highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
              aria-describedby="high-contrast-desc"
            />
            High Contrast
          </label>
          <small id="high-contrast-desc">
            Use high contrast colors for better visibility
          </small>
        </div>

        <div 
          role="region"
          aria-label="Interactive cursor demo area"
          style={{
            padding: '40px',
            border: '2px solid #e1e1e1',
            borderRadius: '8px',
            textAlign: 'center'
          }}
        >
          <p>Move your mouse around this area to see cursor effects</p>
          <button 
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: highContrast ? '#000000' : '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onMouseEnter={() => console.log('Button hovered')}
            onFocus={() => console.log('Button focused')}
          >
            Interactive Button
          </button>
        </div>
      </div>
    </CursorProvider>
  );
}
```

## Related Components

- [Cursor](./Cursor.md) - Base cursor component
- [MagneticButton](./MagneticButton.md) - Button with magnetic cursor effects
- [CursorProvider](./CursorProvider.md) - Context provider for cursor state
- [useCursorInteraction](./useCursorInteraction.md) - Hook for cursor interactions
- [Dialog](./Dialog.md) - Modal dialogs with cursor effects
- [TextField](./TextField.md) - Text inputs with cursor interactions

## Notes

- The component requires the CursorProvider to function properly
- Cursor effects are disabled on touch devices for better performance
- The component respects user preferences for reduced motion
- All interactive elements include proper ARIA labels for accessibility
- Performance is optimized using RAF (RequestAnimationFrame) for smooth animations

