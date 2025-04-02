# SessionExpiresLogout Component

A React component that validates session and token expiration and conditionally renders content based on session validity.

## Overview

`SessionExpiresLogout` checks if the user's session is still valid by:

1. Verifying the session expiration date
2. Validating the user's token against the API
3. Redirecting to a sign-out screen when the session is invalid

## Installation

```bash
# No additional installation required beyond Next.js and React
```

## Usage

```tsx
import SessionExpiresLogout from "@/components/SessionExpiresLogout";
import { useSession } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session } = useSession();

  return (
    <SessionExpiresLogout session={session}>{children}</SessionExpiresLogout>
  );
}
```

## Props

| Prop Name         | Type                | Default                               | Description                                    |
| ----------------- | ------------------- | ------------------------------------- | ---------------------------------------------- |
| children          | React.ReactNode     | -                                     | Content to render when session is valid        |
| session           | SessionData \| null | -                                     | Next.js session object                         |
| expiredMessage    | string              | "Your logged in session has expired!" | Custom message for the sign-out screen         |
| disableValidation | boolean             | false                                 | Skip API validation (only check expiry date)   |
| onSessionInvalid  | () => void          | -                                     | Callback function when session becomes invalid |

## TypeScript Interfaces

```typescript
interface SessionUser {
  name?: {
    uuid?: string;
    token?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

interface SessionData {
  expires: string;
  user?: SessionUser;
  [key: string]: any;
}

interface SessionExpiresLogoutProps {
  children: React.ReactNode;
  session: SessionData | null;
  expiredMessage?: string;
  disableValidation?: boolean;
  onSessionInvalid?: () => void;
}
```

## Dependencies

- `SignOutSession` component for rendering the expired session view
- `getData` function from `@/lib/auth/dbRequests` for API validation

## Example: With Custom Message and Callback

```tsx
<SessionExpiresLogout
  session={session}
  expiredMessage="Your session has timed out due to inactivity."
  onSessionInvalid={() => {
    // Log the event or perform cleanup
    analytics.track("Session Expired");
  }}
>
  <Dashboard />
</SessionExpiresLogout>
```

## Example: Disabling API Validation

```tsx
<SessionExpiresLogout session={session} disableValidation={true}>
  <UserProfile />
</SessionExpiresLogout>
```

## States

The component handles three states:

1. **Loading**: Initial state while validating the session
2. **Invalid**: Session has expired or failed validation
3. **Valid**: Session is valid and children are rendered

## How It Works

1. On mount, the component checks if the session exists
2. It validates the session expiration date against the current time
3. If the expiration check passes, it makes an API call to validate the user token
4. If validation fails, it displays the SignOutSession component
5. If validation passes, it renders the children components

## Customization

You can customize the appearance of the loading state by overriding the CSS classes:

- `.ihub-session-loading`
- `.ihub-session-loading-spinner`

## Best Practices

- Place this component at the root level of authenticated pages/layouts
- Use the `onSessionInvalid` callback to perform cleanup when sessions expire
- Consider enabling `disableValidation` for less critical pages to reduce API calls

## Security Notes

- The component uses `console.warn` for logging validation failures - consider removing these in production
- Session validation happens client-side, so critical operations should still validate on the server
