# Logout Component

A simple React component that provides logout functionality by clearing cookies and redirecting users.

## Table of Contents
- [Installation](#installation)
- [Component](#component)
- [Usage](#usage)

## Installation

No additional dependencies beyond Next.js and React are required.

## Component

### Logout
- **Description**: A button component that handles user logout by clearing cookies and redirecting to the login page.
- **Behavior**:
  - Clears all browser cookies when clicked
  - Redirects user to `/accounts/login`
  - Handles errors gracefully
- **Returns**: A logout button

## Functions

### removeAllCookies
- **Description**: Utility function that removes all cookies from the browser.
- **Returns**: `void`

### handleLogout
- **Description**: Async function that handles the logout process.
- **Returns**: `Promise<void>`

## Usage

```tsx
import React from "react";
import Logout from "../components/Logout";

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="logo">MyApp</div>
      <nav>
        <ul>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><Logout /></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
```

## Implementation Notes

- The component uses Next.js router for navigation
- Cookies are cleared by setting their expiration date to the past
- Error handling is implemented to prevent crashes during logout