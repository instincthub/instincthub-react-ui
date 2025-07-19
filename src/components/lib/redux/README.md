# InstinctHub React UI Redux Module

This Redux module provides comprehensive state management for the InstinctHub platform, handling everything from course filtering to user authentication. Built with Redux Toolkit and TypeScript for type safety and developer experience.

## Installation

```bash
npm install @instincthub/react-ui
```

## Core Imports

Import Redux utilities and slices from the main library:

```typescript
import {
  useDispatch,
  useSelector,
  feedbackToggle,
  selectFeedbackToggle,
} from "@instincthub/react-ui/lib/redux/index.js";
```

## Architecture Overview

The Redux store is organized into domain-specific slices for better maintainability and scalability:

- **Course Management**: Filtering, search, modules, and content
- **Navigation**: UI toggles, modals, and app state
- **Channel Management**: Active channels, details, and instructor data
- **User Interface**: Status messages, confirmations, and feedback

## Main Exports

| Export                 | Type     | Purpose                         |
| ---------------------- | -------- | ------------------------------- |
| `reduxStore`           | Store    | Main Redux store instance       |
| `makeReduxStore`       | Function | Store factory for SSR/testing   |
| `useDispatch`          | Hook     | Typed dispatch hook             |
| `useSelector`          | Hook     | Typed selector hook             |
| `feedbackToggle`       | Slice    | Feedback modal state management |
| `selectFeedbackToggle` | Selector | Get feedback toggle state       |

## Slice Reference

### Course Management Slices

Ensure you load the rquired providers

```typescript
// ./components/themes/ReactClientProviders.tsx
"use client";

import { ReactClientProviders as ReactSessionProvider } from "@instincthub/react-ui";
import { Session } from "@/types/auth";
import { ReactNode } from "react";

interface ReactClientProviders {
  children: ReactNode;
  session: Session | null;
}

export default function ReactClientProviders({
  children,
  session,
}: ReactClientProviders) {
  const handle = session?.channels?.active?.username;
  return (
    <ReactSessionProvider session={session}>
      <>{children}</>
    </ReactSessionProvider>
  );
}
```

```typescript
// ./app/layout.tsx
import ReactClientProviders from "@/components/themes/ReactClientProviders";
import { Session } from "@/types/auth";

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <html lang="en">
      <body>
        <ReactClientProviders session={session}>
          {children}
        </ReactClientProviders>
      </body>
    </html>
  );
}
```

#### Course Filtering

```typescript
import {
  courseFilterSubject,
  courseFilterLevel,
  courseFilterDuration,
  courseSearch,
} from "@instincthub/react-ui/lib/redux/index.js";

// Usage in component
const dispatch = useDispatch();
const searchTerm = useSelector(courseSearch.selectors.selectValue);

// Update search
dispatch(courseSearch.actions.input("React tutorials"));
```

#### Course Content

```typescript
import {
  courseModules,
  courseOverview,
  courseDetails,
  stepContent,
} from "@instincthub/react-ui/lib/redux/index.js";

// Set course data
dispatch(courseDetails.actions.set(courseData));
dispatch(courseModules.actions.set(modules));
```

### Navigation & UI Slices

#### App Toggles

```typescript
import {
  appToggle,
  toggleCreateCourse,
  toggleCreateCohort,
  feedbackToggle,
} from "@instincthub/react-ui/lib/redux/index.js";

// Toggle feedback modal
const showFeedback = useSelector(selectFeedbackToggle);
dispatch(feedbackToggle.actions.set(!showFeedback));
```

#### Status Management

```typescript
import {
  statusMessageState,
  confirmDelete,
} from "@instincthub/react-ui/lib/redux/index.js";

// Show status message
dispatch(
  statusMessageState.actions.set({
    message: "Course created successfully",
    type: "success",
  })
);
```

### Channel Management

#### Active Channel

```typescript
import {
  activeChannel,
  channelDetails,
  instructorChannelList,
  channelHandle,
} from "@instincthub/react-ui/lib/redux/index.js";

// Set active channel
dispatch(activeChannel.actions.set(channelData));
dispatch(channelHandle.actions.set("my-channel-handle"));
```

## Real-World Component Example

Here's how the MainNavbar component uses the Redux store:

```typescript
"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "@/types/auth";
import {
  feedbackToggle,
  selectFeedbackToggle,
  useDispatch,
  useSelector,
} from "@instincthub/react-ui/lib/redux/index.js";

interface MainNavbarProps {
  thumbnail?: string;
  channel?: string;
  search?: boolean;
  channelID?: string;
}

const MainNavbar: React.FC<MainNavbarProps> = (props) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dispatch = useDispatch();
  const { data: session } = useSession();
  const showFeedback = useSelector(selectFeedbackToggle);

  const userSession = session as Session;
  const userData = userSession?.user;
  const token = userSession?.accessToken;
  const userUUID = userData?.uuid;

  // Handle feedback toggle
  const handleFeedbackClick = () => {
    dispatch(feedbackToggle.actions.set(!showFeedback));
  };

  // Responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1200);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="ihub-main-navbar">
      <nav className="ihub-container">
        {/* Logo and navigation items */}
        <div className="ihub-nav-left">
          <Link href={`/profile/${userUUID}/`}>
            <img src={props.thumbnail || "/default-logo.png"} alt="Logo" />
          </Link>
        </div>

        {/* Action buttons */}
        <div className="ihub-nav-actions">
          <button className="ihub-feedback-btn" onClick={handleFeedbackClick}>
            Report Issue
          </button>

          {session ? (
            <div className="ihub-user-menu">
              <img
                src={userData?.image || "/default-avatar.png"}
                alt="User avatar"
                onClick={() => setShowDropdown(!showDropdown)}
              />
            </div>
          ) : (
            <div className="ihub-auth-buttons">
              <Link href="/auth/login">
                <button className="ihub-outlined-btn">Log in</button>
              </Link>
              <Link href="/auth/signup">
                <button className="ihub-important-btn">Sign Up</button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default MainNavbar;
```

## Common Patterns

### 1. Feature Toggles

```typescript
// Toggle UI components
const dispatch = useDispatch();
const isModalOpen = useSelector(appToggle.selectors.selectValue);

const handleToggle = () => {
  dispatch(appToggle.actions.set(!isModalOpen));
};
```

### 2. Form State Management

```typescript
// Handle search functionality
const searchValue = useSelector(courseSearch.selectors.selectValue);

const handleSearch = (term: string) => {
  dispatch(courseSearch.actions.input(term));
};
```

### 3. Loading States

```typescript
// Manage async operations
const isLoading = useSelector(statusMessageState.selectors.selectLoading);

useEffect(() => {
  dispatch(statusMessageState.actions.setLoading(true));
  // ... async operation
  dispatch(statusMessageState.actions.setLoading(false));
}, []);
```

## Best Practices

### Type Safety

Always use the typed hooks provided by the library:

```typescript
// ✅ Correct - typed hooks
import {
  useDispatch,
  useSelector,
} from "@instincthub/react-ui/lib/redux/index.js";

// ❌ Avoid - untyped hooks
import { useDispatch, useSelector } from "react-redux";
```

### Selector Usage

Use specific selectors for better performance:

```typescript
// ✅ Efficient - specific selector
const searchTerm = useSelector(courseSearch.selectors.selectValue);

// ❌ Less efficient - selecting entire state
const searchTerm = useSelector((state) => state.courseSearch.value);
```

### Action Dispatching

Use action creators for consistency:

```typescript
// ✅ Recommended
dispatch(courseSearch.actions.input(newValue));

// ❌ Not recommended
dispatch({ type: "courseSearch/input", payload: newValue });
```

## Integration Examples

### With Next.js Pages

```typescript
// pages/_app.tsx
import { Provider } from "react-redux";
import { reduxStore } from "@instincthub/react-ui/lib/redux/index.js";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={reduxStore}>
      <Component {...pageProps} />
    </Provider>
  );
}
```

### With React 18 and TypeScript

```typescript
// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { reduxStore } from "@instincthub/react-ui/lib/redux/index.js";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </StrictMode>
);
```

## Testing

### Mock Store for Tests

```typescript
import { makeReduxStore } from "@instincthub/react-ui/lib/redux/index.js";

// Create test store
const testStore = makeReduxStore({
  courseSearch: { value: "test query" },
  feedbackToggle: { isOpen: false },
});
```

## Contributing

1. Follow the existing slice structure when adding new features
2. Use TypeScript for all new code
3. Include proper JSDoc comments for actions and selectors
4. Add tests for new functionality
5. Update this README when adding new slices or major features

## License

This package is part of the InstinctHub React UI library. See the main package for licensing information.
