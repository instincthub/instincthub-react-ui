# RadioSimple Component

A customizable radio button component with TypeScript support.

## Props

### RadioSimpleProps

- `ids: string` - Unique ID for the radio input
- `names: string` - Name attribute for the radio input
- `values: string | number` - Value for the radio input
- `labels: string` - Text label displayed next to the radio button
- `checked?: boolean` - Whether the radio button is initially checked
- `inputEvent?: (e: React.ChangeEvent<HTMLInputElement>) => void` - Callback when radio selection changes

## Usage

```tsx
import React, { useState } from "react";
import RadioSimple from "./components/RadioSimple";

const ThemeSelector: React.FC = () => {
  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`Selected theme: ${e.target.value}`);
  };

  return (
    <div className="theme-options">
      <h3>Select Theme</h3>

      <div style={{ position: "relative", marginBottom: "30px" }}>
        <RadioSimple
          ids="light-theme"
          names="theme"
          values="light"
          labels="Light Theme"
          checked={true}
          inputEvent={handleThemeChange}
        />
      </div>

      <div style={{ position: "relative", marginBottom: "30px" }}>
        <RadioSimple
          ids="dark-theme"
          names="theme"
          values="dark"
          labels="Dark Theme"
          inputEvent={handleThemeChange}
        />
      </div>
    </div>
  );
};
```

## CSS Classes

- `.ihub-radio-btn` - Container element
- `.ihub-radio-label` - Label element
- `.ihub-radio-input` - Radio input element
- `.ihub-custom-radio` - Custom radio button styling
- `.ihub-p-label` - Label text

## Notes

- Each RadioSimple component should be wrapped in a positioned container (relative/absolute) for correct layout
- All radio buttons with the same `names` prop form a radio group
