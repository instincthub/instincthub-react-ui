# SessionHandleProvider

A React provider component that manages session handling and channel switching for InstinctHub applications.

## Overview

The `SessionHandleProvider` component is a wrapper that handles authentication session state and channel switching functionality. It validates channel handles from URL parameters against the current user session and provides appropriate error handling when invalid handles are detected.

## Installation

This component is part of the InstinctHub application framework and requires the following dependencies:

```bash
npm install next next-auth react
```

## Features

- Automatic channel switching based on URL parameters
- Session state management
- Error handling for invalid channel handles
- Toast notifications for errors
- Fallback UI for invalid states

## Usage

Wrap your components that require session and channel validation:

```tsx
import SessionHandleProvider from "@/components/SessionHandleProvider";

export default function ChannelPage() {
  return (
    <SessionHandleProvider endpointPath="channels/instructor-channel/selected/">
      <YourComponent />
    </SessionHandleProvider>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | Required | Child components to render when session is valid |
| `endpointPath` | `string \| null` | `null` | Custom API endpoint path for channel selection |

## Interfaces

### SessionHandleProviderProps

```typescript
interface SessionHandleProviderProps {
  children: ReactNode;
  endpointPath?: string | null;
}
```

### Channel

```typescript
interface Channel {
  username?: string;
  id?: number;
}
```

### ActiveChannel

```typescript
interface ActiveChannel {
  channel?: Channel;
  id?: number;
}
```

### Channels

```typescript
interface Channels {
  active?: ActiveChannel;
}
```

### User

```typescript
interface User {
  name?: {
    channels?: Channels;
    token?: string;
  };
  token?: string;
}
```

## Functions

### getChannelData

```typescript
const getChannelData = async (): Promise<void>
```

Fetches channel data from the API using the provided endpoint path or constructs a default path with the channel parameter. Updates the session with the new channel data if successful, or displays an error toast and sets the status to false if unsuccessful.

## Component Workflow

1. Extracts channel parameter from URL using `useParams`
2. Gets current session data using `useSession`
3. Checks if the session handle matches the URL parameter
4. If there's a mismatch, attempts to switch to the new channel
5. Validates the channel handle against a list of invalid values
6. Renders children if validation passes or an error component if it fails

## Error Handling

The component handles several error cases:
- Invalid channel handles (null, undefined, empty strings)
- API request failures
- Channel switching failures

When an error occurs, the component:
1. Displays a toast notification with the error message
2. Sets the internal status to false
3. Renders an `Error500` component with a descriptive message

## Example

```tsx
// pages/[channel]/courses.tsx
import SessionHandleProvider from "@/components/SessionHandleProvider";
import CourseList from "@/components/CourseList";

export default function CoursesPage() {
  return (
    <SessionHandleProvider>
      <CourseList />
    </SessionHandleProvider>
  );
}
```

## Notes

- The component uses the Next.js App Router's `useParams` hook
- It relies on NextAuth.js for session management
- The component should be placed high enough in the component tree to provide session context to all child components that need it

## Related Components

- `Error500`: Displayed when a channel validation error occurs