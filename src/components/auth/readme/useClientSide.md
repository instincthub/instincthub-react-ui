# useClientSide Hook

A utility hook that safely handles client-side initialization to prevent hydration mismatches in Next.js applications.

## Overview

The `useClientSide` hook is designed to solve a common issue in server-side rendering (SSR) and static site generation (SSG) environments like Next.js, where certain functionality needs to be executed only when running in the browser. This hook ensures that browser-only APIs like `localStorage`, `window`, and `document` are only accessed on the client side, preventing hydration mismatches.

## Installation

No additional installation is needed beyond React itself. Simply place this hook in your project structure:

```
src/
└── components/
    └── auth/
        └── useClientSide.ts
```

## Usage

### Basic Usage

```tsx
import { useClientSide } from "@/components/auth/useClientSide";

const MyComponent = () => {
  const [isClient] = useClientSide();

  return (
    <div>
      {isClient ? (
        <div>Client-side content (browser only)</div>
      ) : (
        <div>Server-rendered fallback</div>
      )}
    </div>
  );
};

export default MyComponent;
```

### With Initial Value

```tsx
import { useClientSide } from "@/components/auth/useClientSide";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useClientSide(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem("theme") || "light";
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === "light" ? "dark" : "light"} mode
    </button>
  );
};

export default ThemeSwitcher;
```

### With SideNavbar Component

```tsx
import { useClientSide } from "@/components/auth/useClientSide";
import { SideNavbar } from "@/components/navbar/SideNavbar";

const MySidebar = () => {
  const [isExpanded, setIsExpanded] = useClientSide(true);

  return (
    <SideNavbar
      items={navItems}
      isExpanded={isExpanded}
      onExpandedChange={setIsExpanded}
    />
  );
};

export default MySidebar;
```

## Implementation Notes

- The hook returns a tuple with the current value and a setter function
- During server-side rendering, the value will be `undefined`
- After client-side hydration, the value will be updated with the result of the initializer function
- This pattern ensures that the server and client render the same initial HTML, preventing hydration mismatches

## Best Practices

- Use this hook for any component that needs to access browser-only APIs
- Always provide a default value that works in both server and client environments
- Consider using this hook in combination with the `ClientDetector` component for more complex scenarios

## License

This hook is available under the [MIT License](LICENSE).
