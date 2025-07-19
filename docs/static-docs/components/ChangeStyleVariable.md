# ChangeStyleVariable

**Category:** Theme | **Type:** component

Dynamic CSS custom property management component for runtime style variable modifications and theme customization

**File Location:** `src/components/theme/ChangeStyleVariable.tsx`

## 🏷️ Tags

`theme`, `css-variables`, `customization`, `runtime`, `styles`

```tsx
"use client";
import React, { useState, useEffect } from "react";
import { ChangeStyleVariable } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive examples demonstrating ChangeStyleVariable usage
 * Shows different variable types, theme switching, and real-time customization
 */
const ChangeStyleVariableExamples = () => {
  const [currentTheme, setCurrentTheme] = useState<string>("default");
  const [customColors, setCustomColors] = useState({
    primary: "#3b82f6",
    secondary: "#64748b",
    accent: "#8b5cf6",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
  });
  const [fontSettings, setFontSettings] = useState({
    size: "16px",
    family: "Inter, system-ui, sans-serif",
    weight: "400",
    lineHeight: "1.5",
  });
  const [spacingScale, setSpacingScale] = useState({
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  });
  const [borderRadius, setBorderRadius] = useState("8px");
  const [animationSpeed, setAnimationSpeed] = useState("300ms");

  const predefinedThemes = {
    default: {
      primary: "#3b82f6",
      secondary: "#64748b",
      background: "#ffffff",
      surface: "#f8fafc",
      text: "#1e293b",
      border: "#e2e8f0",
    },
    dark: {
      primary: "#60a5fa",
      secondary: "#94a3b8",
      background: "#0f172a",
      surface: "#1e293b",
      text: "#f1f5f9",
      border: "#334155",
    },
    purple: {
      primary: "#8b5cf6",
      secondary: "#a855f7",
      background: "#faf5ff",
      surface: "#f3e8ff",
      text: "#581c87",
      border: "#d8b4fe",
    },
    green: {
      primary: "#10b981",
      secondary: "#059669",
      background: "#f0fdf4",
      surface: "#dcfce7",
      text: "#14532d",
      border: "#bbf7d0",
    },
  };

  const handleColorChange = (colorName: string, value: string) => {
    setCustomColors(prev => ({ ...prev, [colorName]: value }));
    
    // Apply the change immediately
    document.documentElement.style.setProperty(`--ihub-color-${colorName}`, value);
    openToast(`${colorName} color updated`);
  };

  const handleFontChange = (property: string, value: string) => {
    setFontSettings(prev => ({ ...prev, [property]: value }));
    
    // Apply the change immediately
    const cssProperty = property === 'size' ? '--ihub-font-size-base' :
                       property === 'family' ? '--ihub-font-family' :
                       property === 'weight' ? '--ihub-font-weight' :
                       '--ihub-line-height';
    
    document.documentElement.style.setProperty(cssProperty, value);
    openToast(`Font ${property} updated`);
  };

  const handleSpacingChange = (size: string, value: string) => {
    setSpacingScale(prev => ({ ...prev, [size]: value }));
    
    // Apply the change immediately
    document.documentElement.style.setProperty(`--ihub-spacing-${size}`, value);
    openToast(`Spacing ${size} updated`);
  };

  const handleBorderRadiusChange = (value: string) => {
    setBorderRadius(value);
    document.documentElement.style.setProperty('--ihub-border-radius', value);
    openToast(`Border radius updated`);
  };

  const handleAnimationSpeedChange = (value: string) => {
    setAnimationSpeed(value);
    document.documentElement.style.setProperty('--ihub-animation-duration', value);
    openToast(`Animation speed updated`);
  };

  const applyTheme = (themeName: string) => {
    const theme = predefinedThemes[themeName as keyof typeof predefinedThemes];
    if (!theme) return;

    setCurrentTheme(themeName);
    
    // Apply all theme variables
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--ihub-color-${key}`, value);
    });
    
    openToast(`Applied ${themeName} theme`);
  };

  const resetToDefaults = () => {
    // Reset all custom properties to their default values
    const defaultVariables = {
      '--ihub-color-primary': '#3b82f6',
      '--ihub-color-secondary': '#64748b',
      '--ihub-color-background': '#ffffff',
      '--ihub-color-surface': '#f8fafc',
      '--ihub-color-text': '#1e293b',
      '--ihub-color-border': '#e2e8f0',
      '--ihub-font-size-base': '16px',
      '--ihub-font-family': 'Inter, system-ui, sans-serif',
      '--ihub-font-weight': '400',
      '--ihub-line-height': '1.5',
      '--ihub-spacing-xs': '4px',
      '--ihub-spacing-sm': '8px',
      '--ihub-spacing-md': '16px',
      '--ihub-spacing-lg': '24px',
      '--ihub-spacing-xl': '32px',
      '--ihub-spacing-xxl': '48px',
      '--ihub-border-radius': '8px',
      '--ihub-animation-duration': '300ms',
    };

    Object.entries(defaultVariables).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });

    // Reset state
    setCurrentTheme("default");
    setCustomColors({
      primary: "#3b82f6",
      secondary: "#64748b",
      accent: "#8b5cf6",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
    });
    setFontSettings({
      size: "16px",
      family: "Inter, system-ui, sans-serif",
      weight: "400",
      lineHeight: "1.5",
    });
    setSpacingScale({
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "32px",
      xxl: "48px",
    });
    setBorderRadius("8px");
    setAnimationSpeed("300ms");

    openToast("Reset to default theme");
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>ChangeStyleVariable Examples</h1>
      <p className="ihub-mb-4">
        Dynamic CSS custom property management for runtime style modifications
        and theme customization with immediate visual feedback.
      </p>

      {/* Theme Switcher */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Predefined Theme Switcher</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Quick Theme Selection</h3>
            <p className="ihub-text-muted">Apply predefined color schemes instantly</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-theme-selector">
              <div className="ihub-theme-options">
                {Object.keys(predefinedThemes).map((themeName) => (
                  <button
                    key={themeName}
                    className={`ihub-theme-btn ${currentTheme === themeName ? 'active' : ''}`}
                    onClick={() => applyTheme(themeName)}
                  >
                    <div className="ihub-theme-preview">
                      <div 
                        className="ihub-theme-color primary"
                        style={{ backgroundColor: predefinedThemes[themeName as keyof typeof predefinedThemes].primary }}
                      ></div>
                      <div 
                        className="ihub-theme-color secondary"
                        style={{ backgroundColor: predefinedThemes[themeName as keyof typeof predefinedThemes].secondary }}
                      ></div>
                      <div 
                        className="ihub-theme-color background"
                        style={{ backgroundColor: predefinedThemes[themeName as keyof typeof predefinedThemes].background }}
                      ></div>
                    </div>
                    <span className="ihub-theme-name">
                      {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                    </span>
                  </button>
                ))}
              </div>
              
              <div className="ihub-theme-actions ihub-mt-3">
                <button
                  className="ihub-outlined-btn"
                  onClick={resetToDefaults}
                >
                  Reset to Defaults
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color Customization */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Color Variable Customization</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Custom Color Palette</h3>
            <p className="ihub-text-muted">Customize individual color variables</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-color-customizer">
              <div className="ihub-color-grid">
                {Object.entries(customColors).map(([colorName, colorValue]) => (
                  <div key={colorName} className="ihub-color-control">
                    <ChangeStyleVariable
                      variable={`--ihub-color-${colorName}`}
                      value={colorValue}
                      type="color"
                      label={colorName.charAt(0).toUpperCase() + colorName.slice(1)}
                      onChange={(value) => handleColorChange(colorName, value)}
                      preview={true}
                      className="ihub-color-variable"
                    />
                    <div className="ihub-color-info">
                      <div 
                        className="ihub-color-swatch"
                        style={{ backgroundColor: colorValue }}
                      ></div>
                      <code className="ihub-color-value">{colorValue}</code>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="ihub-color-preview ihub-mt-4">
                <h4>Color Preview</h4>
                <div className="ihub-preview-elements">
                  <button 
                    className="ihub-primary-btn"
                    style={{ backgroundColor: customColors.primary }}
                  >
                    Primary Button
                  </button>
                  <button 
                    className="ihub-outlined-btn"
                    style={{ borderColor: customColors.secondary, color: customColors.secondary }}
                  >
                    Secondary Button
                  </button>
                  <div 
                    className="ihub-alert ihub-success"
                    style={{ backgroundColor: customColors.success + '20', borderColor: customColors.success }}
                  >
                    Success message with custom color
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography Settings */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Typography Variable Controls</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Font & Text Settings</h3>
            <p className="ihub-text-muted">Customize typography variables</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-typography-controls">
              <div className="ihub-row">
                <div className="ihub-col-md-6">
                  <div className="ihub-control-group">
                    <ChangeStyleVariable
                      variable="--ihub-font-size-base"
                      value={fontSettings.size}
                      type="range"
                      min="12px"
                      max="24px"
                      step="1px"
                      label="Base Font Size"
                      onChange={(value) => handleFontChange('size', value)}
                      showValue={true}
                      className="ihub-font-size-control"
                    />
                  </div>
                  
                  <div className="ihub-control-group">
                    <ChangeStyleVariable
                      variable="--ihub-font-weight"
                      value={fontSettings.weight}
                      type="select"
                      options={[
                        { value: "300", label: "Light" },
                        { value: "400", label: "Normal" },
                        { value: "500", label: "Medium" },
                        { value: "600", label: "Semi Bold" },
                        { value: "700", label: "Bold" },
                      ]}
                      label="Font Weight"
                      onChange={(value) => handleFontChange('weight', value)}
                      className="ihub-font-weight-control"
                    />
                  </div>
                </div>
                
                <div className="ihub-col-md-6">
                  <div className="ihub-control-group">
                    <ChangeStyleVariable
                      variable="--ihub-font-family"
                      value={fontSettings.family}
                      type="select"
                      options={[
                        { value: "Inter, system-ui, sans-serif", label: "Inter" },
                        { value: "Roboto, system-ui, sans-serif", label: "Roboto" },
                        { value: "system-ui, sans-serif", label: "System UI" },
                        { value: "Georgia, serif", label: "Georgia" },
                        { value: "Monaco, monospace", label: "Monaco" },
                      ]}
                      label="Font Family"
                      onChange={(value) => handleFontChange('family', value)}
                      className="ihub-font-family-control"
                    />
                  </div>
                  
                  <div className="ihub-control-group">
                    <ChangeStyleVariable
                      variable="--ihub-line-height"
                      value={fontSettings.lineHeight}
                      type="range"
                      min="1.2"
                      max="2.0"
                      step="0.1"
                      label="Line Height"
                      onChange={(value) => handleFontChange('lineHeight', value)}
                      showValue={true}
                      className="ihub-line-height-control"
                    />
                  </div>
                </div>
              </div>
              
              <div className="ihub-typography-preview ihub-mt-4">
                <h4>Typography Preview</h4>
                <div className="ihub-text-samples">
                  <h1 style={{ fontFamily: fontSettings.family, fontWeight: fontSettings.weight }}>
                    Heading 1 Sample Text
                  </h1>
                  <p style={{ 
                    fontFamily: fontSettings.family, 
                    fontSize: fontSettings.size, 
                    lineHeight: fontSettings.lineHeight 
                  }}>
                    This is a paragraph sample showing how the typography variables affect text rendering. 
                    You can see the changes in real-time as you adjust the controls above.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing & Layout */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Spacing & Layout Variables</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Spacing Scale</h3>
            <p className="ihub-text-muted">Customize spacing and layout variables</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-spacing-controls">
              <div className="ihub-spacing-grid">
                {Object.entries(spacingScale).map(([size, value]) => (
                  <div key={size} className="ihub-spacing-control">
                    <ChangeStyleVariable
                      variable={`--ihub-spacing-${size}`}
                      value={value}
                      type="range"
                      min="0px"
                      max="64px"
                      step="2px"
                      label={`Spacing ${size.toUpperCase()}`}
                      onChange={(val) => handleSpacingChange(size, val)}
                      showValue={true}
                      className="ihub-spacing-variable"
                    />
                    <div 
                      className="ihub-spacing-preview"
                      style={{ 
                        width: value,
                        height: value,
                        backgroundColor: customColors.primary + '40'
                      }}
                    ></div>
                  </div>
                ))}
              </div>
              
              <div className="ihub-layout-controls ihub-mt-4">
                <div className="ihub-row">
                  <div className="ihub-col-md-6">
                    <ChangeStyleVariable
                      variable="--ihub-border-radius"
                      value={borderRadius}
                      type="range"
                      min="0px"
                      max="32px"
                      step="2px"
                      label="Border Radius"
                      onChange={handleBorderRadiusChange}
                      showValue={true}
                      className="ihub-border-radius-control"
                    />
                  </div>
                  
                  <div className="ihub-col-md-6">
                    <ChangeStyleVariable
                      variable="--ihub-animation-duration"
                      value={animationSpeed}
                      type="select"
                      options={[
                        { value: "150ms", label: "Fast (150ms)" },
                        { value: "300ms", label: "Normal (300ms)" },
                        { value: "500ms", label: "Slow (500ms)" },
                        { value: "1000ms", label: "Very Slow (1s)" },
                      ]}
                      label="Animation Speed"
                      onChange={handleAnimationSpeedChange}
                      className="ihub-animation-speed-control"
                    />
                  </div>
                </div>
              </div>
              
              <div className="ihub-layout-preview ihub-mt-4">
                <h4>Layout Preview</h4>
                <div className="ihub-preview-components">
                  <div 
                    className="ihub-preview-card"
                    style={{ 
                      borderRadius: borderRadius,
                      padding: spacingScale.md,
                      margin: spacingScale.sm,
                      transition: `all ${animationSpeed} ease`
                    }}
                  >
                    <h5>Sample Card</h5>
                    <p>This card demonstrates the current spacing and border radius settings.</p>
                    <button 
                      className="ihub-primary-btn"
                      style={{ 
                        borderRadius: borderRadius,
                        transition: `all ${animationSpeed} ease`
                      }}
                    >
                      Button
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Implementation Guide</h2>
        <div className="ihub-card ihub-p-4">
          <h3>Props Interface:</h3>
          <pre className="ihub-code-block">
{`interface ChangeStyleVariableProps {
  variable: string;                    // CSS custom property name
  value: string;                       // Current value
  type: 'color' | 'range' | 'select' | 'text'; // Input type
  label?: string;                      // Display label
  onChange: (value: string) => void;   // Change handler
  className?: string;                  // CSS classes
  min?: string;                        // Minimum value (for range)
  max?: string;                        // Maximum value (for range)
  step?: string;                       // Step value (for range)
  options?: Array<{                    // Options (for select)
    value: string;
    label: string;
  }>;
  showValue?: boolean;                 // Show current value
  preview?: boolean;                   // Show color preview
  disabled?: boolean;                  // Disable control
}`}</pre>
          
          <h3 className="ihub-mt-3">Key Features:</h3>
          <ul>
            <li><strong>Real-time Updates:</strong> Immediate application of CSS variable changes</li>
            <li><strong>Multiple Input Types:</strong> Color, range, select, and text inputs</li>
            <li><strong>Live Preview:</strong> Visual feedback for changes</li>
            <li><strong>Theme Management:</strong> Easy switching between predefined themes</li>
            <li><strong>Persistence:</strong> Optional localStorage integration for user preferences</li>
            <li><strong>Type Safety:</strong> Full TypeScript support with proper types</li>
          </ul>
          
          <h3 className="ihub-mt-3">Best Practices:</h3>
          <ul>
            <li>Use semantic CSS custom property names for clarity</li>
            <li>Provide sensible default values and fallbacks</li>
            <li>Group related variables for better organization</li>
            <li>Test theme changes across different components</li>
            <li>Consider accessibility when changing colors and contrast</li>
            <li>Implement proper validation for user-provided values</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ChangeStyleVariableExamples;
```

## 🔗 Related Components

- [DarkModeProvider](./DarkModeProvider.md) - Dark mode provider component
- [ColorPicker](./ColorPicker.md) - Color selection component
- [SessionProviders](./SessionProviders.md) - Session providers component
- [LoadingAnimate](./LoadingAnimate.md) - Loading animation component
- [Tabs](./Tabs.md) - Tab navigation component

