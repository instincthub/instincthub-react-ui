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

## Theme Management Functions

To change themes programmatically, you can use these helper functions:

```tsx
// Add these functions where needed
function setTheme(theme: "DarkMode" | "LightMode" | "Device") {
  localStorage.setItem("theme", theme);

  if (theme === "Device") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    document.documentElement.classList.remove("DarkMode", "LightMode");
    document.documentElement.classList.add(
      prefersDark ? "DarkMode" : "LightMode"
    );
  } else {
    document.documentElement.classList.remove("DarkMode", "LightMode");
    document.documentElement.classList.add(theme);
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.classList.contains("DarkMode")
    ? "DarkMode"
    : "LightMode";

  setTheme(currentTheme === "DarkMode" ? "LightMode" : "DarkMode");
}
```

## Implementation Notes

- Uses `localStorage` to persist user theme preferences
- Uses CSS classes (`DarkMode`/`LightMode`) for styling - make sure to define corresponding CSS rules
- Compatible with browser theme settings via `prefers-color-scheme` media query
- Handles browser compatibility for media query event listeners
