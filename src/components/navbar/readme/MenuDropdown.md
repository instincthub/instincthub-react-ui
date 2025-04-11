# MenuDropdown Component Documentation

## Overview

The `MenuDropdown` component is a user account dropdown menu with theme selection capabilities. It provides a UI interface for users to view their account details, switch between accounts, change theme preferences, and sign in/out of the application.

## Table of Contents

- [Installation](#installation)
- [Component Structure](#component-structure)
- [TypeScript Interfaces](#typescript-interfaces)
- [Functionality](#functionality)
- [CSS Classes](#css-classes)
- [Usage Example](#usage-example)
- [Dependencies](#dependencies)

## Installation

To use the MenuDropdown component in your project:

1. Copy the `MenuDropdown.tsx` file to your components directory
2. Copy the `menu-dropdown.css` file to your styles directory
3. Import the CSS in your main layout or page component

```typescript
// Import in your _app.tsx or layout component
import "@/styles/menu-dropdown.css";
```

## Component Structure

The component includes the following key sections:

1. **Main Menu**: Displays user info, navigation options, and theme settings
2. **Account Switching Menu**: Displays user's available accounts
3. **Theme Selection Menu**: Allows choosing between light, dark, or device theme

## TypeScript Interfaces

```typescript
// User data structure
interface User {
  name?: {
    full_name?: string;
    username?: string;
    image?: string;
  };
}

// Theme options (strict string literal types)
type ThemeOption = "Device" | "LightMode" | "DarkMode";

// Menu navigation options
type MenuOption = "option1" | "option2" | null;
```

## Functionality

### Theme Management

The component handles three theme modes:

1. **Device Theme**: Automatically follows system preference
2. **Light Theme**: Forces light mode
3. **Dark Theme**: Forces dark mode

```typescript
/**
 * Handles theme change and updates localStorage and HTML class
 * @param newTheme The theme to set (Device, LightMode, or DarkMode)
 */
const handleThemeChange = (newTheme: ThemeOption): void => {
  // Implementation details...
};
```

### Menu Navigation

The component tracks current and previous menu states for navigation:

```typescript
/**
 * Handles menu option selection
 * @param option The menu option to select
 */
const handleOptionClick = (option: MenuOption): void => {
  setPreviousOption(selectedOption);
  setSelectedOption(selectedOption === option ? null : option);
};

/**
 * Handles navigation back to previous menu
 */
const handleBackClick = (): void => {
  setSelectedOption(previousOption);
  setPreviousOption(null);
};
```

## CSS Classes

Key CSS classes used in the component:

| Class                | Description                               |
| -------------------- | ----------------------------------------- |
| `ihub-menu-dropdown` | Main container for the dropdown           |
| `ihub-fitted-globe`  | Container for the dropdown content        |
| `ihub-name-truce`    | User profile section with avatar and name |
| `ihub-ff-layer`      | Primary navigation menu                   |
| `ihub-sub-menu`      | Submenu container                         |
| `ihub-submenu-open`  | Applied when submenu is visible           |
| `ihub-appearance`    | Theme selection section                   |

## Usage Example

```tsx
import React from "react";
import MenuDropdown from "@/components/MenuDropdown";

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="logo">MyApp</div>
      <div className="user-section">
        <MenuDropdown />
      </div>
    </header>
  );
};

export default Header;
```

## Dependencies

- **React**: Core library for component rendering
- **Next.js**: For Image component and routing
- **NextAuth.js**: For session management
- **Material Icons**: For icon display (CSS dependency)

### Required Components

- `ChannelListAvatar`: Component that displays a list of available user accounts/channels

## Browser Compatibility

The component uses modern JavaScript features and should be compatible with:

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 16+

## Notes for Implementers

1. Ensure Material Icons font is properly loaded in your project
2. The component relies on CSS variables like `--White`, `--Gunmetal`, etc. These should be defined in your global CSS
3. Session management should be configured correctly with NextAuth.js
