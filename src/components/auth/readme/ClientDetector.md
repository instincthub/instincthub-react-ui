# ClientDetector Component

A lightweight React component that detects whether the code is running on the client-side (browser) and communicates this state back to a parent component.

## Overview

The `ClientDetector` component is designed to solve a common issue in server-side rendering (SSR) and static site generation (SSG) environments like Next.js, where certain functionality needs to be executed only when running in the browser. This component uses React's `useEffect` hook to detect the client environment and trigger a callback once detected.

## Installation

No additional installation is needed beyond React itself. Simply place this component in your project structure:

```
src/
└── components/
    └── common/
        └── ClientDetector.tsx
```

## Props Interface

```typescript
interface Props {
  setIsClientLoaded: (isClientLoaded: boolean) => void;
}
```

| Prop                | Type                                | Description                                                                                            |
| ------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `setIsClientLoaded` | `(isClientLoaded: boolean) => void` | A callback function that receives a boolean indicating whether the client-side environment is detected |

## Usage

### Basic Example

```tsx
import { useState } from "react";
import ClientDetector from "@/components/common/ClientDetector";

const MyComponent = () => {
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  return (
    <div>
      <ClientDetector setIsClientLoaded={setIsClientLoaded} />

      {isClientLoaded ? (
        <div>Client-side content (browser only)</div>
      ) : (
        <div>Server-rendered fallback</div>
      )}
    </div>
  );
};

export default MyComponent;
```

### With Next.js App Router

```tsx
"use client";

import { useState } from "react";
import ClientDetector from "@/components/common/ClientDetector";

export default function Page() {
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  // Use client-dependent APIs safely
  const handleClientAction = () => {
    if (isClientLoaded) {
      // Access browser APIs like localStorage, window, etc.
      localStorage.setItem("example", "value");
    }
  };

  return (
    <>
      <ClientDetector setIsClientLoaded={setIsClientLoaded} />

      <button onClick={handleClientAction} disabled={!isClientLoaded}>
        Perform Client Action
      </button>
    </>
  );
}
```

## Implementation Notes

- The component returns an empty React fragment (`<></>`) as it doesn't render any visible UI elements.
- Console logs are included for debugging purposes and could be removed in production.
- The effect runs only once after initial render (`[]` dependency array).

## Best Practices

- Use this component at the top level of your React component tree to detect client-side rendering as early as possible.
- Consider replacing this with React 18's `useEffect` client-only behavior or Next.js 13+ `use client` directive for newer applications.
- For critical UI functionality that depends on client-side features, consider using this pattern to provide appropriate loading states.

## License

This component is available under the [MIT License](LICENSE).
