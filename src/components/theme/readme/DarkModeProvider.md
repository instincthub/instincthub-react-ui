# DarkModeProvider

A React provider component that manages theme state (dark/light mode) based on user preferences and system settings.

## Features

- Applies themes based on user's stored preference
- Falls back to system preference when no user choice exists
- Responds to system theme changes in real-time
- Provides theme change notifications via callback
- Cleans up event listeners properly

## Props

| Prop           | Type                                    | Description                                    | Default     |
| -------------- | --------------------------------------- | ---------------------------------------------- | ----------- |
| `children`     | `ReactNode`                             | Child components to render                     | Required    |
| `defaultTheme` | `"DarkMode" \| "LightMode" \| "Device"` | Default theme to use when no preference exists | `"Device"`  |
| `onChange`     | `(theme: Theme) => void`                | Callback fired when theme changes              | `undefined` |

## Usage Examples

### Basic Usage

```tsx
import DarkModeProvider from "./DarkModeProvider";

function App() {
  return (
    <DarkModeProvider>
      <div className="app">{/* Your app content */}</div>
    </DarkModeProvider>
  );
}
```

### Advanced Usage with Theme Change Handling

```tsx
import DarkModeProvider, { Theme } from "./DarkModeProvider";
import { useState } from "react";

function App() {
  const [currentTheme, setCurrentTheme] = useState<Theme>("Device");

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    console.log(`Theme changed to: ${theme}`);
  };

  return (
    <DarkModeProvider defaultTheme="Device" onChange={handleThemeChange}>
      <div className="app">
        <header>Current theme: {currentTheme}</header>
        {/* Rest of your app */}
      </div>
    </DarkModeProvider>
  );
}
```

## useTheme Hook

Use the `useTheme` hook in any child component to read and change the current theme.

```tsx
import { useTheme } from "@instincthub/react-ui";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme("LightMode")}>Light</button>
      <button onClick={() => setTheme("DarkMode")}>Dark</button>
      <button onClick={() => setTheme("Device")}>System</button>
    </div>
  );
}
```

**Note**: `useTheme` must be called inside a component wrapped by `DarkModeProvider` (or `ReactClientProviders`, which includes it).

### Return Value

| Property   | Type                         | Description                |
| ---------- | ---------------------------- | -------------------------- |
| `theme`    | `"DarkMode" \| "LightMode" \| "Device"` | Current theme setting      |
| `setTheme` | `(theme: Theme) => void`     | Function to change theme   |

## Implementation Notes

- Uses `localStorage` to persist user theme preferences
- Uses CSS classes (`DarkMode`/`LightMode`) for styling - make sure to define corresponding CSS rules
- Compatible with browser theme settings via `prefers-color-scheme` media query
- Handles browser compatibility for media query event listeners
