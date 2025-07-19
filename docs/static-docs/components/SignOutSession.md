# SignOutSession

A modal-style component that displays when a user's session has expired, providing a clean logout interface with optional imagery and support contact. This component handles session expiration gracefully with customizable messaging and integrated logout functionality.

## Features

- **Session Expiration Handling**: Clean UI for expired sessions
- **Customizable Messaging**: Configurable expiration message
- **Optional Image Display**: Session expired image with error handling
- **Integrated Logout**: Built-in logout action handling
- **Support Contact**: Direct link to help and support
- **Accessible Design**: ARIA labels and semantic HTML
- **Error Resilient**: Graceful image loading error handling

## Props

### SignOutSession Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | `"Your logged in session has expired!"` | Custom message to display to the user |
| `showImage` | `boolean` | `true` | Whether to show the session expired image |

## Basic Usage

```tsx
"use client";

import React from 'react';
import { SignOutSession } from 'instincthub-react-ui';

export default function SessionExpiredPage() {
  return (
    <SignOutSession />
  );
}
```

## Advanced Usage

### Custom Message

```tsx
"use client";

import React from 'react';
import { SignOutSession } from 'instincthub-react-ui';

export default function CustomSessionExpired() {
  return (
    <SignOutSession
      message="Your session has timed out due to inactivity. Please sign in again to continue."
      showImage={true}
    />
  );
}
```

### Minimal Version (No Image)

```tsx
"use client";

import React from 'react';
import { SignOutSession } from 'instincthub-react-ui';

export default function MinimalSessionExpired() {
  return (
    <SignOutSession
      message="Session expired. Please log in again."
      showImage={false}
    />
  );
}
```

### Session Timeout Handler

```tsx
"use client";

import React, { useState, useEffect } from 'react';
import { SignOutSession } from 'instincthub-react-ui';
import { useSession } from 'next-auth/react';

interface SessionTimeoutProps {
  children: React.ReactNode;
  timeoutDuration?: number; // in minutes
}

export default function SessionTimeoutWrapper({ 
  children, 
  timeoutDuration = 30 
}: SessionTimeoutProps) {
  const { data: session, status } = useSession();
  const [showExpired, setShowExpired] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  
  // Track user activity
  useEffect(() => {
    const handleActivity = () => {
      setLastActivity(Date.now());
      setShowExpired(false);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, []);

  // Check for session timeout
  useEffect(() => {
    if (status !== 'authenticated') return;

    const checkTimeout = () => {
      const now = Date.now();
      const timeSinceActivity = now - lastActivity;
      const timeoutMs = timeoutDuration * 60 * 1000;

      if (timeSinceActivity > timeoutMs) {
        setShowExpired(true);
      }
    };

    const interval = setInterval(checkTimeout, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [lastActivity, timeoutDuration, status]);

  if (showExpired) {
    return (
      <SignOutSession
        message={`Your session expired after ${timeoutDuration} minutes of inactivity.`}
        showImage={true}
      />
    );
  }

  return <>{children}</>;
}
```

### Multi-Language Support

```tsx
"use client";

import React from 'react';
import { SignOutSession } from 'instincthub-react-ui';

interface LocalizedSessionExpiredProps {
  language?: 'en' | 'es' | 'fr' | 'de';
}

const messages = {
  en: "Your logged in session has expired!",
  es: "¡Tu sesión de usuario ha expirado!",
  fr: "Votre session de connexion a expiré !",
  de: "Ihre Anmeldesitzung ist abgelaufen!"
};

export default function LocalizedSessionExpired({ 
  language = 'en' 
}: LocalizedSessionExpiredProps) {
  return (
    <SignOutSession
      message={messages[language]}
      showImage={true}
    />
  );
}
```

### Error Boundary Integration

```tsx
"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { SignOutSession } from 'instincthub-react-ui';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  isSessionError: boolean;
}

class SessionErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    isSessionError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Check if error is session-related
    const isSessionError = error.message.includes('session') || 
                          error.message.includes('auth') ||
                          error.message.includes('unauthorized');
    
    return { 
      hasError: true, 
      isSessionError 
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Session error boundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError && this.state.isSessionError) {
      return (
        <SignOutSession
          message="A session error occurred. Please sign in again to continue."
          showImage={true}
        />
      );
    }

    if (this.state.hasError) {
      // Fallback UI for non-session errors
      return (
        <div style={{
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#f8f9fa'
        }}>
          <h2>Something went wrong</h2>
          <button 
            onClick={() => this.setState({ hasError: false, isSessionError: false })}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
export default function App({ children }: { children: React.ReactNode }) {
  return (
    <SessionErrorBoundary>
      {children}
    </SessionErrorBoundary>
  );
}
```

### Custom Styling Example

```tsx
"use client";

import React from 'react';
import { SignOutSession } from 'instincthub-react-ui';

// Custom CSS to override default styles
const customStyles = `
  .ihub-signout-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  .ihub-signout-card {
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  }
  
  .ihub-signout-title {
    color: #ffffff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  .ihub-signout-message {
    color: rgba(255, 255, 255, 0.9);
  }
  
  .ihub-signout-button {
    background: linear-gradient(45deg, #ff6b6b, #ee5a52);
    transition: all 0.3s ease;
  }
  
  .ihub-signout-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(238, 90, 82, 0.3);
  }
`;

export default function StyledSessionExpired() {
  return (
    <>
      <style>{customStyles}</style>
      <SignOutSession
        message="Your premium session has expired. Please renew your subscription to continue."
        showImage={true}
      />
    </>
  );
}
```

### Session Management Hook

```tsx
"use client";

import React, { useState, useEffect } from 'react';
import { SignOutSession } from 'instincthub-react-ui';
import { useSession, signOut } from 'next-auth/react';

// Custom hook for session management
function useSessionManager() {
  const { data: session, status } = useSession();
  const [sessionExpired, setSessionExpired] = useState(false);
  const [warningShown, setWarningShown] = useState(false);

  useEffect(() => {
    if (status !== 'authenticated' || !session) return;

    // Check if session has an expiry time
    const checkExpiry = () => {
      const now = new Date().getTime();
      const sessionExp = session.expires ? new Date(session.expires).getTime() : 0;
      
      if (sessionExp && now > sessionExp) {
        setSessionExpired(true);
        return;
      }

      // Show warning 5 minutes before expiry
      const fiveMinutes = 5 * 60 * 1000;
      if (sessionExp && (sessionExp - now) < fiveMinutes && !warningShown) {
        setWarningShown(true);
        if (window.confirm('Your session will expire soon. Continue working?')) {
          // Extend session logic here
          setWarningShown(false);
        }
      }
    };

    const interval = setInterval(checkExpiry, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [session, status, warningShown]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/auth/login' });
  };

  return { sessionExpired, handleLogout };
}

// Component using the hook
export default function SessionManagedApp({ children }: { children: React.ReactNode }) {
  const { sessionExpired } = useSessionManager();

  if (sessionExpired) {
    return (
      <SignOutSession
        message="Your session has expired for security reasons. Please sign in again."
        showImage={true}
      />
    );
  }

  return <>{children}</>;
}
```

## Testing Examples

```tsx
// __tests__/SignOutSession.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SignOutSession } from 'instincthub-react-ui';

// Mock the logout action
jest.mock('../../components/lib/auth/actions', () => ({
  logout: jest.fn()
}));

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, onError, ...props }: any) {
    return (
      <img 
        src={src} 
        alt={alt} 
        onError={onError}
        {...props}
      />
    );
  };
});

describe('SignOutSession', () => {
  test('renders with default message', () => {
    render(<SignOutSession />);
    
    expect(screen.getByText('Session Expired')).toBeInTheDocument();
    expect(screen.getByText('Your logged in session has expired!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument();
  });

  test('renders with custom message', () => {
    const customMessage = 'Custom session expired message';
    render(<SignOutSession message={customMessage} />);
    
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  test('shows image when showImage is true', () => {
    render(<SignOutSession showImage={true} />);
    
    const image = screen.getByAltText('Session Expired');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/session-expired.svg');
  });

  test('hides image when showImage is false', () => {
    render(<SignOutSession showImage={false} />);
    
    expect(screen.queryByAltText('Session Expired')).not.toBeInTheDocument();
  });

  test('calls logout when sign out button is clicked', () => {
    const { logout } = require('../../components/lib/auth/actions');
    render(<SignOutSession />);
    
    const signOutButton = screen.getByRole('button', { name: /sign out/i });
    fireEvent.click(signOutButton);
    
    expect(logout).toHaveBeenCalled();
  });

  test('handles image error gracefully', () => {
    render(<SignOutSession showImage={true} />);
    
    const image = screen.getByAltText('Session Expired');
    fireEvent.error(image);
    
    expect(image.style.display).toBe('none');
  });

  test('has correct accessibility attributes', () => {
    render(<SignOutSession />);
    
    const button = screen.getByRole('button', { name: /sign out/i });
    expect(button).toHaveAttribute('aria-label', 'Sign out');
  });

  test('includes support link', () => {
    render(<SignOutSession />);
    
    const supportLink = screen.getByRole('link', { name: /contact support/i });
    expect(supportLink).toBeInTheDocument();
    expect(supportLink).toHaveAttribute('href', '/support');
  });
});
```

## CSS Classes

The component uses the following CSS classes for styling:

- `.ihub-signout-section` - Main section container
- `.ihub-signout-overlay` - Overlay background
- `.ihub-signout-card` - Main card container
- `.ihub-signout-image-container` - Image wrapper
- `.ihub-signout-image` - Image element
- `.ihub-signout-title` - Title heading
- `.ihub-signout-message` - Message text
- `.ihub-signout-actions` - Action buttons container
- `.ihub-signout-button` - Sign out button
- `.ihub-signout-help` - Help text
- `.ihub-signout-link` - Support link

## Related Components

- [SessionExpiresLogout](./SessionExpiresLogout.md) - Session expiration logout handling
- [SessionProviders](./SessionProviders.md) - Session provider wrapper
- [SessionHandleProvider](./SessionHandleProvider.md) - Channel session management
- [DarkModeProvider](./DarkModeProvider.md) - Dark mode provider integration
- [LoadingAnimate](./LoadingAnimate.md) - Loading animation component

## Notes

- Requires proper logout action configuration
- Image path should be available in public/images/
- Works with NextAuth.js session management
- Supports custom styling through CSS classes
- Includes error handling for image loading failures
- Designed for full-screen modal presentation

