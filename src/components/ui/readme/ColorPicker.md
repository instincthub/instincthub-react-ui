# Color Picker Component

A fully-featured, accessible, and customizable color picker component for React applications. Built with TypeScript and follows WCAG accessibility guidelines.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Keyboard Navigation](#keyboard-navigation)
- [Customization](#customization)
- [Browser Support](#browser-support)
- [Accessibility](#accessibility)
- [Examples](#examples)

## Overview

The Color Picker component provides an intuitive interface for users to select colors through preset swatches, manual input, or screen color picking (when supported). It supports multiple color formats (HEX, RGB, HSL) and includes smooth animations and keyboard accessibility.

## Features

- 🎨 25 preset color swatches
- 🔢 Support for HEX, RGB, and HSL color formats
- 💧 EyeDropper API integration (when browser supports)
- ⌨️ Full keyboard navigation support
- 📱 Responsive design
- ♿ WCAG 2.1 AA compliant
- 🎯 Click-outside detection
- 💾 Remembers last selected color
- 🎭 Smooth animations
- 🛠️ Customizable through CSS variables
- 🔒 TypeScript support

## Installation

1. Copy the component file to your project:

   ```
   components/ColorPicker.tsx
   ```

2. If you're using TypeScript, ensure you have React types installed:
   ```bash
   npm install --save-dev @types/react
   ```

## Usage

### Basic Usage

```tsx
import { ColorPicker } from "@instincthub/react-ui";

function App() {
  const handleColorChange = (color: string) => {
    console.log("Selected color:", color);
  };

  return <ColorPicker onChange={handleColorChange} />;
}
```

### Without Dropdown Button

```tsx
<ColorPicker showButton={false} onChange={handleColorChange} />
```

### With Form Integration

```tsx
<form onSubmit={handleSubmit}>
  <ColorPicker
    name="primaryColor"
    defaultColor="#0066cc"
    onChange={handleColorChange}
  />
  <button type="submit">Save</button>
</form>
```

## Props

| Prop           | Type                      | Default     | Description                           |
| -------------- | ------------------------- | ----------- | ------------------------------------- |
| `defaultColor` | `string`                  | `'#000000'` | Initial color value                   |
| `name`         | `string`                  | `undefined` | Name attribute for hidden input field |
| `className`    | `string`                  | `''`        | Additional CSS class names            |
| `showButton`   | `boolean`                 | `true`      | Whether to show the toggle button     |
| `onChange`     | `(color: string) => void` | `undefined` | Callback when color is selected       |

## Keyboard Navigation

The component supports full keyboard navigation:

- **Tab**: Navigate through interactive elements
- **Enter/Space**: Select color swatch or toggle dropdown
- **Escape**: Close dropdown panel
- **Arrow keys**: Navigate between color swatches (when focused on grid)

## Customization

### CSS Variables

Customize the appearance using CSS variables:

```css
.ihub-color-picker {
  --ihub-border-radius: 8px;
  --ihub-transition: 150ms ease;
  --ihub-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  --ihub-focus-color: #4169e1;
  --ihub-error-color: #ff4444;
  --ihub-text-color: #333;
  --ihub-bg-color: #ffffff;
  --ihub-border-color: #e0e0e0;
}
```

### Custom Styling

```css
/* Dark theme example */
.dark-theme .ihub-color-picker {
  --ihub-text-color: #ffffff;
  --ihub-bg-color: #1a1a1a;
  --ihub-border-color: #404040;
}

/* Custom focus color */
.custom-focus .ihub-color-picker {
  --ihub-focus-color: #ff6b6b;
}
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Android Chrome 90+

### EyeDropper API Support

The EyeDropper API is currently supported in:

- Chrome 95+
- Edge 95+
- Opera 81+

The component gracefully degrades when this API is not available.

## Accessibility

The component follows WCAG 2.1 AA guidelines:

- Proper ARIA attributes (`aria-expanded`, `aria-label`, `aria-haspopup`)
- Keyboard navigation support
- Focus indicators
- Color contrast ratios
- Screen reader compatibility
- Semantic HTML structure

## Examples

### Custom Color Set

```tsx
// Override the preset colors by modifying the PRESET_COLORS array
const CUSTOM_COLORS = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7"];

// You'll need to modify the component source to use CUSTOM_COLORS
```

### Controlled Component

```tsx
function ControlledColorPicker() {
  const [color, setColor] = useState("#ff0000");

  return (
    <div>
      <ColorPicker defaultColor={color} onChange={setColor} />
      <div
        style={{
          width: 100,
          height: 100,
          backgroundColor: color,
          marginTop: 20,
        }}
      />
    </div>
  );
}
```

### Multiple Color Pickers

```tsx
function ThemeEditor() {
  const [primaryColor, setPrimaryColor] = useState("#0066cc");
  const [secondaryColor, setSecondaryColor] = useState("#ff6b6b");

  return (
    <div>
      <div>
        <label>Primary Color</label>
        <ColorPicker
          defaultColor={primaryColor}
          onChange={setPrimaryColor}
          name="primary"
        />
      </div>
      <div>
        <label>Secondary Color</label>
        <ColorPicker
          defaultColor={secondaryColor}
          onChange={setSecondaryColor}
          name="secondary"
        />
      </div>
    </div>
  );
}
```

## TypeScript Interfaces

### ColorPickerProps

```typescript
interface ColorPickerProps {
  defaultColor?: string;
  name?: string;
  className?: string;
  showButton?: boolean;
  onChange?: (color: string) => void;
}
```

## Contributing

When contributing to this component:

1. Maintain accessibility standards
2. Test across supported browsers
3. Update documentation for new features
4. Follow existing coding patterns
5. Add unit tests for new functionality
