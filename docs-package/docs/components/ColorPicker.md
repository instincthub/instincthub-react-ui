# ColorPicker

**Category:** UI | **Type:** component

A reusable ColorPicker component

## 📁 File Location

`src/components/ui/ColorPicker.tsx`

## 🏷️ Tags

`ui`

## 📖 Usage Examples

### Example 1

```tsx
"use client";

import React, { useState } from "react";
import { ColorPicker } from "../../../../index";

const ColorPickerExample: React.FC = () => {
  const [primaryColor, setPrimaryColor] = useState("#0066cc");
  const [secondaryColor, setSecondaryColor] = useState("#ff6b6b");

  const handlePrimaryColorChange = (color: string) => {
    console.log("Primary color changed:", color);
    setPrimaryColor(color);
  };

  const handleSecondaryColorChange = (color: string) => {
    console.log("Secondary color changed:", color);
    setSecondaryColor(color);
  };

  // Override the preset colors by modifying the PRESET_COLORS array
  const CUSTOM_COLORS = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7"];

  return (
    <div className="space-y-8 p-4">
      {/* Basic Usage */}
      <div className="space-y-4">
        <h2 className="ihub-fs-lg">Basic Color Picker</h2>
        <ColorPicker
          id="basic-color-picker"
          label="Basic Color Picker"
          defaultColor="#000000"
          onChange={(color) => console.log("Basic color changed:", color)}
        />
      </div>

      {/* Without Dropdown Button */}
      <div className="space-y-4">
        <h2 className="ihub-fs-lg">Without Dropdown Button</h2>
        <ColorPicker
          showButton={false}
          defaultColor="#4ecdc4"
          onChange={(color) => console.log("No button color changed:", color)}
        />
      </div>

      {/* Form Integration */}
      <div className="space-y-4">
        <h2 className="ihub-fs-lg">Form Integration</h2>
        <form className="space-y-4">
          <div>
            <ColorPicker
              label="Primary Color"
              name="primary_color"
              defaultColor={primaryColor}
              onChange={handlePrimaryColorChange}
              className="ihub-mb-3"
            />
          </div>
          <div>
            <ColorPicker
              label="Secondary Color"
              name="secondary_color"
              defaultColor={secondaryColor}
              onChange={handleSecondaryColorChange}
              className="ihub-mb-3"
            />
          </div>
          <div>
            <ColorPicker
              label="Hide Preview, Formats, and EyeDropper"
              className="ihub-mb-3"
              hidePreview={true}
              hideFormats={true}
              hideEyeDropper={true}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save Colors
          </button>
        </form>
      </div>

      {/* Controlled Component Example */}
      <div className="space-y-4">
        <h2 className="ihub-fs-lg">Controlled Component</h2>
        <ColorPicker
          defaultColor={primaryColor}
          onChange={handlePrimaryColorChange}
        />
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: primaryColor,
            marginTop: "20px",
            borderRadius: "8px",
          }}
        />
      </div>

      {/* Custom Preset Colors */}
      <div className="space-y-4">
        <h2 className="ihub-fs-lg">Custom Preset Colors</h2>
        <ColorPicker
          CUSTOM_COLORS={CUSTOM_COLORS}
          onChange={(color) => console.log("Custom color changed:", color)}
        />
      </div>
    </div>
  );
};

export default ColorPickerExample;

```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { ColorPicker } from '@instincthub/react-ui';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { ColorPicker } from '@instincthub/react-ui';

function MyComponent() {
  return (
    <ColorPicker
    />
  );
}
```

## 🔗 Related Components

- [CustomTextEditor](./CustomTextEditor.md) - Custom text editor component
- [ContentViewer](./ContentViewer.md) - Content viewer component
- [ContentViewOrEdit](./ContentViewOrEdit.md) - Content view or edit component
- [CodeDisplay](./CodeDisplay.md) - Code display component
- [IHubTable](./IHubTable.md) - InstinctHub table component

