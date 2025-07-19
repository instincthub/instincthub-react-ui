# DarkModeProvider

A comprehensive theme management provider that handles dark mode, light mode, and system preference detection. This component provides theme context to your entire application with automatic localStorage persistence and system preference monitoring.

## Features

- **Multiple Theme Options**: DarkMode, LightMode, and Device (system preference)
- **Automatic Persistence**: Saves theme preference to localStorage
- **System Preference Detection**: Automatically follows system color scheme
- **Dynamic Theme Switching**: Real-time theme changes without page reload
- **SSR Compatible**: Safe for server-side rendering
- **Change Callbacks**: Optional callback when theme changes

## Theme Types

```tsx
export type Theme = "DarkMode" | "LightMode" | "Device";
```

## Props

### DarkModeProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Child components to render |
| `defaultTheme` | `Theme` | `"Device"` | Default theme preference |
| `onChange` | `(theme: Theme) => void` | - | Callback when theme changes |

### useTheme Hook

| Return Value | Type | Description |
|--------------|------|-------------|
| `theme` | `Theme` | Current theme setting |
| `setTheme` | `(theme: Theme) => void` | Function to change theme |

## Basic Usage

```tsx
"use client";

import React from 'react';
import { DarkModeProvider, useTheme } from 'instincthub-react-ui';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme('LightMode')}>Light</button>
      <button onClick={() => setTheme('DarkMode')}>Dark</button>
      <button onClick={() => setTheme('Device')}>System</button>
    </div>
  );
}

export default function App() {
  return (
    <DarkModeProvider>
      <div className="app">
        <h1>My Application</h1>
        <ThemeToggle />
      </div>
    </DarkModeProvider>
  );
}
```

## Advanced Usage

### Theme Switcher Component

```tsx
"use client";

import React, { useState } from 'react';
import { DarkModeProvider, useTheme } from 'instincthub-react-ui';

function AdvancedThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { value: 'LightMode', label: 'Light', icon: '☀️' },
    { value: 'DarkMode', label: 'Dark', icon: '🌙' },
    { value: 'Device', label: 'System', icon: '💻' }
  ] as const;

  const currentTheme = themes.find(t => t.value === theme);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '8px 16px',
          border: '1px solid var(--border-color)',
          borderRadius: '6px',
          backgroundColor: 'var(--background-color)',
          color: 'var(--text-color)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span>{currentTheme?.icon}</span>
        <span>{currentTheme?.label}</span>
        <span style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>▼</span>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '4px',
          border: '1px solid var(--border-color)',
          borderRadius: '6px',
          backgroundColor: 'var(--background-color)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 1000
        }}>
          {themes.map((themeOption) => (
            <button
              key={themeOption.value}
              onClick={() => {
                setTheme(themeOption.value);
                setIsOpen(false);
              }}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                backgroundColor: theme === themeOption.value ? 'var(--primary-color)' : 'transparent',
                color: theme === themeOption.value ? 'white' : 'var(--text-color)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textAlign: 'left'
              }}
            >
              <span>{themeOption.icon}</span>
              <span>{themeOption.label}</span>
              {theme === themeOption.value && <span style={{ marginLeft: 'auto' }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ThemeApp() {
  return (
    <DarkModeProvider defaultTheme="LightMode">
      <div style={{ padding: '20px' }}>
        <h1>Advanced Theme Switcher</h1>
        <AdvancedThemeSwitcher />
      </div>
    </DarkModeProvider>
  );
}
```

### Application with Theme Settings

```tsx
"use client";

import React, { useState, useEffect } from 'react';
import { DarkModeProvider, useTheme } from 'instincthub-react-ui';

interface AppSettings {
  theme: string;
  autoTheme: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
}

function SettingsPanel() {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState<AppSettings>({
    theme: theme,
    autoTheme: theme === 'Device',
    highContrast: false,
    reducedMotion: false
  });

  const [isSystemDark, setIsSystemDark] = useState(false);

  useEffect(() => {
    // Check system preferences
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');

    setIsSystemDark(mediaQuery.matches);
    setSettings(prev => ({
      ...prev,
      reducedMotion: reducedMotionQuery.matches,
      highContrast: highContrastQuery.matches
    }));

    const handleSystemChange = () => setIsSystemDark(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleSystemChange);

    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const updateSetting = (key: keyof AppSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    if (key === 'autoTheme') {
      setTheme(value ? 'Device' : 'LightMode');
    } else if (key === 'theme' && !settings.autoTheme) {
      setTheme(value);
    }
  };

  const resetToDefaults = () => {
    setSettings({
      theme: 'Device',
      autoTheme: true,
      highContrast: false,
      reducedMotion: false
    });
    setTheme('Device');
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '24px',
      border: '1px solid var(--border-color)',
      borderRadius: '12px',
      backgroundColor: 'var(--card-background)'
    }}>
      <h2 style={{ marginTop: 0 }}>Theme & Accessibility Settings</h2>

      <div style={{ marginBottom: '24px' }}>
        <h3>Theme Preferences</h3>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={settings.autoTheme}
              onChange={(e) => updateSetting('autoTheme', e.target.checked)}
            />
            Follow system theme
          </label>
          {settings.autoTheme && (
            <small style={{ color: 'var(--text-secondary)', marginLeft: '24px' }}>
              Currently: {isSystemDark ? 'Dark' : 'Light'} (System)
            </small>
          )}
        </div>

        {!settings.autoTheme && (
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Manual Theme:</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => updateSetting('theme', 'LightMode')}
                style={{
                  padding: '8px 16px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  backgroundColor: theme === 'LightMode' ? 'var(--primary-color)' : 'transparent',
                  color: theme === 'LightMode' ? 'white' : 'var(--text-color)',
                  cursor: 'pointer'
                }}
              >
                ☀️ Light
              </button>
              <button
                onClick={() => updateSetting('theme', 'DarkMode')}
                style={{
                  padding: '8px 16px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  backgroundColor: theme === 'DarkMode' ? 'var(--primary-color)' : 'transparent',
                  color: theme === 'DarkMode' ? 'white' : 'var(--text-color)',
                  cursor: 'pointer'
                }}
              >
                🌙 Dark
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3>Accessibility</h3>
        
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={settings.highContrast}
              onChange={(e) => updateSetting('highContrast', e.target.checked)}
            />
            High contrast mode
          </label>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={settings.reducedMotion}
              onChange={(e) => updateSetting('reducedMotion', e.target.checked)}
            />
            Reduce motion and animations
          </label>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={resetToDefaults}
          style={{
            padding: '10px 20px',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            backgroundColor: 'transparent',
            color: 'var(--text-color)',
            cursor: 'pointer'
          }}
        >
          Reset to Defaults
        </button>
        
        <button
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '6px',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default function SettingsApp() {
  const handleThemeChange = (newTheme: any) => {
    console.log('Theme changed to:', newTheme);
    // You can perform additional actions here
  };

  return (
    <DarkModeProvider onChange={handleThemeChange}>
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: 'var(--background-color)',
        color: 'var(--text-color)',
        padding: '20px'
      }}>
        <SettingsPanel />
      </div>
    </DarkModeProvider>
  );
}
```

## Form Integration

### Theme-Aware Form

```tsx
"use client";

import React, { useState } from 'react';
import { DarkModeProvider, useTheme } from 'instincthub-react-ui';

function ThemedForm() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    preferences: {
      notifications: true,
      newsletter: false,
      theme: theme
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, currentTheme: theme });
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: `2px solid var(--border-color)`,
    borderRadius: '6px',
    backgroundColor: 'var(--input-background)',
    color: 'var(--text-color)',
    fontSize: '16px'
  };

  const isDark = theme === 'DarkMode' || 
    (theme === 'Device' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <div style={{
      maxWidth: '500px',
      margin: '0 auto',
      padding: '24px',
      backgroundColor: 'var(--card-background)',
      border: `1px solid var(--border-color)`,
      borderRadius: '12px',
      boxShadow: isDark ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ marginTop: 0, color: 'var(--heading-color)' }}>
        User Preferences
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            style={inputStyle}
            placeholder="Enter your name"
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            style={inputStyle}
            placeholder="Enter your email"
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '12px' }}>Preferences</h3>
          
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={formData.preferences.notifications}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, notifications: e.target.checked }
                }))}
              />
              Enable notifications
            </label>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={formData.preferences.newsletter}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, newsletter: e.target.checked }
                }))}
              />
              Subscribe to newsletter
            </label>
          </div>
        </div>

        <div style={{
          padding: '16px',
          backgroundColor: 'var(--info-background)',
          border: `1px solid var(--info-border)`,
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <p style={{ margin: 0, fontSize: '14px' }}>
            <strong>Current Theme:</strong> {theme}
            {theme === 'Device' && ' (following system)'}
          </p>
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            border: 'none',
            borderRadius: '6px',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
}

export default function ThemedFormApp() {
  return (
    <DarkModeProvider>
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'var(--background-color)',
        padding: '20px'
      }}>
        <ThemedForm />
      </div>
    </DarkModeProvider>
  );
}
```

## Error Handling

### Theme Error Boundary

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

class ThemeErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Theme provider error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{
          padding: '20px',
          border: '1px solid #ff6b6b',
          borderRadius: '8px',
          backgroundColor: '#ffe0e0',
          color: '#d63031',
          maxWidth: '500px',
          margin: '20px auto'
        }}>
          <h3>Theme System Error</h3>
          <p>The theme provider encountered an error and couldn't initialize properly.</p>
          <details style={{ marginTop: '12px' }}>
            <summary>Error details</summary>
            <pre style={{ marginTop: '8px', fontSize: '12px', overflow: 'auto' }}>
              {this.state.error?.message}
            </pre>
          </details>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#d63031',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              marginTop: '12px',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage with error boundary
export default function SafeThemeApp() {
  return (
    <ThemeErrorBoundary>
      <DarkModeProvider>
        <div style={{ padding: '20px' }}>
          <h1>Theme-Enabled App</h1>
          <p>This app is protected by a theme error boundary.</p>
        </div>
      </DarkModeProvider>
    </ThemeErrorBoundary>
  );
}
```

## Testing Examples

### Unit Tests

```tsx
// __tests__/DarkModeProvider.test.tsx
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { DarkModeProvider, useTheme } from 'instincthub-react-ui';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

// Mock matchMedia
global.matchMedia = jest.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

function TestComponent() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button onClick={() => setTheme('LightMode')}>Light</button>
      <button onClick={() => setTheme('DarkMode')}>Dark</button>
      <button onClick={() => setTheme('Device')}>Device</button>
    </div>
  );
}

describe('DarkModeProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  test('provides default theme', () => {
    render(
      <DarkModeProvider>
        <TestComponent />
      </DarkModeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('Device');
  });

  test('uses custom default theme', () => {
    render(
      <DarkModeProvider defaultTheme="LightMode">
        <TestComponent />
      </DarkModeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('LightMode');
  });

  test('changes theme when button clicked', () => {
    render(
      <DarkModeProvider>
        <TestComponent />
      </DarkModeProvider>
    );

    fireEvent.click(screen.getByText('Dark'));
    expect(screen.getByTestId('current-theme')).toHaveTextContent('DarkMode');
  });

  test('saves theme to localStorage', () => {
    render(
      <DarkModeProvider>
        <TestComponent />
      </DarkModeProvider>
    );

    fireEvent.click(screen.getByText('Light'));
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'LightMode');
  });

  test('loads theme from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('DarkMode');

    render(
      <DarkModeProvider>
        <TestComponent />
      </DarkModeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('DarkMode');
  });

  test('calls onChange callback when theme changes', () => {
    const onChange = jest.fn();

    render(
      <DarkModeProvider onChange={onChange}>
        <TestComponent />
      </DarkModeProvider>
    );

    fireEvent.click(screen.getByText('Dark'));
    expect(onChange).toHaveBeenCalledWith('DarkMode');
  });

  test('throws error when useTheme used outside provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useTheme must be used within a DarkModeProvider');

    spy.mockRestore();
  });
});
```

## CSS Integration

### Theme Variables

```css
/* Define your CSS variables for theming */
:root {
  /* Light theme variables */
  --background-color: #ffffff;
  --text-color: #1a1a1a;
  --card-background: #f8f9fa;
  --border-color: #e1e1e1;
  --primary-color: #3b82f6;
  --heading-color: #111827;
  --text-secondary: #6b7280;
  --input-background: #ffffff;
  --info-background: #eff6ff;
  --info-border: #bfdbfe;
}

.DarkMode {
  /* Dark theme variables */
  --background-color: #1a1a1a;
  --text-color: #ffffff;
  --card-background: #2d2d2d;
  --border-color: #404040;
  --primary-color: #60a5fa;
  --heading-color: #f9fafb;
  --text-secondary: #d1d5db;
  --input-background: #374151;
  --info-background: #1e3a8a;
  --info-border: #3b82f6;
}

.LightMode {
  /* Explicitly light theme (same as root for this example) */
  --background-color: #ffffff;
  --text-color: #1a1a1a;
  --card-background: #f8f9fa;
  --border-color: #e1e1e1;
  --primary-color: #3b82f6;
  --heading-color: #111827;
  --text-secondary: #6b7280;
  --input-background: #ffffff;
  --info-background: #eff6ff;
  --info-border: #bfdbfe;
}

/* Smooth transitions for theme changes */
* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
```

## Related Components

- [ChangeStyleVariable](./ChangeStyleVariable.md) - Dynamic CSS variable manipulation
- [SessionProviders](./SessionProviders.md) - Session management providers
- [LoadingAnimate](./LoadingAnimate.md) - Theme-aware loading animations
- [Dialog](./Dialog.md) - Modal dialogs with theme support
- [TextField](./TextField.md) - Theme-aware form inputs

## Notes

- The component automatically applies CSS classes (`DarkMode`, `LightMode`) to `document.documentElement`
- System preference detection uses `window.matchMedia('(prefers-color-scheme: dark)')`
- Theme persistence uses localStorage with the key `"theme"`
- The provider handles SSR safely by checking for `window` availability
- Device theme automatically updates when system preference changes
- CSS transitions should be added for smooth theme switching animations

