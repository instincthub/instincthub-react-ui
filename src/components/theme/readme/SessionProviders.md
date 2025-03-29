# SessionProviders

A wrapper component for Next-Auth's SessionProvider that handles hydration issues by controlling when the provider mounts.

## Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `children` | `ReactNode` | Child components | Required |
| `refetchInterval` | `number` | Interval (in seconds) to refetch session | `undefined` |
| `refetchOnWindowFocus` | `boolean` | Whether to refetch the session when window is focused | `true` |

## Usage

```tsx
import SessionProviders from '@/components/SessionProviders';

export default function App({ Component, pageProps }) {
  return (
    <SessionProviders refetchInterval={60}>
      <Component {...pageProps} />
    </SessionProviders>
  );
}
```

## Implementation Notes

- Prevents hydration mismatch errors between server and client rendering
- Passes through Next-Auth session configuration options
- Returns children without session context during server-side rendering