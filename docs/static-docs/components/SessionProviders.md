# SessionProviders

A NextAuth.js session provider wrapper that handles client-side hydration and prevents SSR hydration mismatches. This component ensures that session context is only available after client-side hydration is complete, preventing "useSession must be wrapped in a SessionProvider" errors.

## Features

- **Hydration Safety**: Prevents SSR/client hydration mismatches
- **NextAuth Integration**: Wraps NextAuth SessionProvider
- **Configurable Refetch**: Customizable session refetch intervals
- **Window Focus Handling**: Optional session refresh on window focus
- **Error Prevention**: Eliminates common useSession hook errors
- **TypeScript Support**: Full TypeScript interface definitions

## Props

### SessionProviders Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Child components to wrap with session context |
| `refetchInterval` | `number` | `720 * 60` (12 hours) | Session refetch interval in seconds |
| `refetchOnWindowFocus` | `boolean` | `true` | Whether to refetch session when window gains focus |

## Basic Usage

```tsx
"use client";

import React from 'react';
import { SessionProviders } from 'instincthub-react-ui';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <SessionProviders>
          <div id="app">
            {children}
          </div>
        </SessionProviders>
      </body>
    </html>
  );
}
```

## Advanced Usage

### Custom Configuration

```tsx
"use client";

import React from 'react';
import { SessionProviders } from 'instincthub-react-ui';
import { useRouter } from 'next/navigation';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProviders
      refetchInterval={300} // 5 minutes
      refetchOnWindowFocus={false} // Disable window focus refetch
    >
      {children}
    </SessionProviders>
  );
}
```

### Multi-Provider Setup

```tsx
"use client";

import React from 'react';
import { SessionProviders, DarkModeProvider } from 'instincthub-react-ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function AllProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProviders refetchInterval={600}>
        <DarkModeProvider>
          <div className="app-container">
            {children}
          </div>
        </DarkModeProvider>
      </SessionProviders>
    </QueryClientProvider>
  );
}
```

## Testing Examples

```tsx
// __tests__/SessionProviders.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { SessionProviders } from 'instincthub-react-ui';

describe('SessionProviders', () => {
  test('prevents hydration until mounted', async () => {
    render(
      <SessionProviders>
        <div data-testid="child">Test Content</div>
      </SessionProviders>
    );

    await waitFor(() => {
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });
  });
});
```

## Related Components

- [SessionExpiresLogout](./SessionExpiresLogout.md) - Session expiration handling
- [SessionHandleProvider](./SessionHandleProvider.md) - Channel session management  
- [DarkModeProvider](./DarkModeProvider.md) - Theme provider integration
- [SignOutSession](./SignOutSession.md) - Session logout component

## Notes

- Prevents "useSession must be wrapped in a SessionProvider" errors
- Required at the root of applications using NextAuth.js
- Handles client-side hydration automatically
- Default 12-hour session refetch interval
- Compatible with Next.js App Router and Pages Router

