# SessionExpiresLogout

A session validation component that automatically monitors authentication state and handles session expiration. This component validates session tokens, checks expiration times, and provides seamless logout when sessions become invalid.

## Features

- **Automatic Session Validation**: Continuously validates session tokens with the server
- **Expiration Monitoring**: Checks session expiry dates against current time
- **Token Validation**: Validates authentication tokens via API calls
- **Graceful Logout**: Automatically signs out users with expired sessions
- **Loading States**: Shows loading spinner during validation
- **Custom Messages**: Configurable expiration messages
- **Error Handling**: Graceful handling of network errors during validation
- **Memory Leak Prevention**: Proper cleanup to prevent state updates after unmount

## Props

### SessionExpiresLogout Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Child components to render when session is valid |
| `session` | `Session \| null` | - | Current user session object |
| `expiredMessage` | `string` | `"Your logged in session has expired!"` | Message to display when session expires |
| `disableValidation` | `boolean` | `false` | Skip session validation (useful for testing) |
| `onSessionInvalid` | `() => void` | - | Callback when session becomes invalid |

### Session Type

```tsx
import { Session } from '@/types/auth';

// The Session interface includes:
interface Session {
  user: {
    id: string;
    name: string;
    username: string;
    uuid: string;
    // ... other user properties
  };
  accessToken: string;
  channels: {
    active: {
      username: string;
      // ... other channel properties
    };
    // ... other channel data
  };
  expires: string;
  // ... other session properties
}
```

## Basic Usage

```tsx
"use client";

import React from 'react';
import { SessionExpiresLogout } from 'instincthub-react-ui';
import { useSession } from 'next-auth/react';

export default function ProtectedApp() {
  const { data: session } = useSession();

  return (
    <SessionExpiresLogout session={session}>
      <div>
        <h1>Protected Application</h1>
        <p>This content is only visible to authenticated users.</p>
      </div>
    </SessionExpiresLogout>
  );
}
```

## Advanced Usage

### Dashboard with Session Monitoring

```tsx
"use client";

import React, { useState, useEffect } from 'react';
import { SessionExpiresLogout } from 'instincthub-react-ui';
import { useSession } from 'next-auth/react';

export default function UserDashboard() {
  const { data: session } = useSession();
  const [sessionWarnings, setSessionWarnings] = useState<string[]>([]);
  const [lastActivity, setLastActivity] = useState(new Date());

  const handleSessionInvalid = () => {
    setSessionWarnings(prev => [
      ...prev, 
      `Session invalidated at ${new Date().toLocaleTimeString()}`
    ]);
    console.log('Session became invalid, user will be logged out');
  };

  const updateActivity = () => {
    setLastActivity(new Date());
  };

  useEffect(() => {
    // Track user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity, true);
      });
    };
  }, []);

  return (
    <SessionExpiresLogout 
      session={session}
      expiredMessage="Your session has timed out due to inactivity. Please log in again."
      onSessionInvalid={handleSessionInvalid}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <h1>User Dashboard</h1>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            <p>Welcome, {session?.user?.username || 'User'}</p>
            <p>Last activity: {lastActivity.toLocaleTimeString()}</p>
          </div>
        </header>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{ 
            padding: '20px', 
            border: '1px solid #e1e1e1', 
            borderRadius: '8px',
            backgroundColor: 'white'
          }}>
            <h3>Session Info</h3>
            <p><strong>Token:</strong> {session?.accessToken ? '✓ Valid' : '✗ Missing'}</p>
            <p><strong>Expires:</strong> {new Date(session?.expires || '').toLocaleString()}</p>
            <p><strong>User ID:</strong> {session?.user?.uuid || 'N/A'}</p>
          </div>

          <div style={{ 
            padding: '20px', 
            border: '1px solid #e1e1e1', 
            borderRadius: '8px',
            backgroundColor: 'white'
          }}>
            <h3>Activity Monitor</h3>
            <p><strong>Current Time:</strong> {new Date().toLocaleTimeString()}</p>
            <p><strong>Session Status:</strong> <span style={{ color: '#10b981' }}>Active</span></p>
            <p><strong>Validation:</strong> Automatic</p>
          </div>
        </div>

        {sessionWarnings.length > 0 && (
          <div style={{
            marginBottom: '20px',
            padding: '15px',
            backgroundColor: '#fef2f2',
            border: '1px solid #fca5a5',
            borderRadius: '8px'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#dc2626' }}>Session Warnings:</h4>
            <ul style={{ margin: 0, color: '#dc2626' }}>
              {sessionWarnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ 
          padding: '20px', 
          border: '1px solid #e1e1e1', 
          borderRadius: '8px',
          backgroundColor: 'white'
        }}>
          <h3>Dashboard Content</h3>
          <p>This is your protected dashboard content. You can only see this while logged in with a valid session.</p>
          
          <div style={{ marginTop: '20px' }}>
            <button 
              onClick={() => console.log('Performing user action...')}
              style={{
                padding: '10px 20px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              Perform Action
            </button>
            
            <button 
              onClick={() => window.location.reload()}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    </SessionExpiresLogout>
  );
}
```

### Multi-App Session Management

```tsx
"use client";

import React, { useState, useEffect } from 'react';
import { SessionExpiresLogout } from 'instincthub-react-ui';
import { useSession } from 'next-auth/react';

interface AppModule {
  id: string;
  name: string;
  requiresAuth: boolean;
  component: React.ComponentType;
}

const modules: AppModule[] = [
  { id: 'dashboard', name: 'Dashboard', requiresAuth: true, component: DashboardModule },
  { id: 'profile', name: 'Profile', requiresAuth: true, component: ProfileModule },
  { id: 'settings', name: 'Settings', requiresAuth: true, component: SettingsModule },
  { id: 'public', name: 'Public Info', requiresAuth: false, component: PublicModule }
];

function DashboardModule() {
  return <div style={{ padding: '20px' }}>
    <h2>Dashboard</h2>
    <p>Your personalized dashboard with charts and analytics.</p>
  </div>;
}

function ProfileModule() {
  return <div style={{ padding: '20px' }}>
    <h2>User Profile</h2>
    <p>Manage your personal information and preferences.</p>
  </div>;
}

function SettingsModule() {
  return <div style={{ padding: '20px' }}>
    <h2>Settings</h2>
    <p>Configure application settings and preferences.</p>
  </div>;
}

function PublicModule() {
  return <div style={{ padding: '20px' }}>
    <h2>Public Information</h2>
    <p>This content is available to everyone.</p>
  </div>;
}

export default function MultiAppManager() {
  const { data: session } = useSession();
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sessionEvents, setSessionEvents] = useState<string[]>([]);

  const currentModule = modules.find(m => m.id === activeModule);
  const ModuleComponent = currentModule?.component || DashboardModule;

  const logSessionEvent = (event: string) => {
    setSessionEvents(prev => [
      ...prev.slice(-4), // Keep last 5 events
      `${new Date().toLocaleTimeString()}: ${event}`
    ]);
  };

  const handleSessionInvalid = () => {
    logSessionEvent('Session validation failed - redirecting to login');
  };

  useEffect(() => {
    if (session) {
      logSessionEvent('Session loaded successfully');
    }
  }, [session]);

  const renderModuleContent = () => {
    if (!currentModule) return null;

    if (currentModule.requiresAuth) {
      return (
        <SessionExpiresLogout
          session={session}
          expiredMessage={`Your session expired while using ${currentModule.name}. Please log in again.`}
          onSessionInvalid={handleSessionInvalid}
        >
          <ModuleComponent />
        </SessionExpiresLogout>
      );
    }

    return <ModuleComponent />;
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar Navigation */}
      <aside style={{ 
        width: '250px', 
        backgroundColor: '#f8f9fa', 
        padding: '20px',
        borderRight: '1px solid #e1e1e1'
      }}>
        <h3>Multi-App Suite</h3>
        
        <nav style={{ marginBottom: '30px' }}>
          {modules.map(module => (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px 15px',
                marginBottom: '5px',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: activeModule === module.id ? '#3b82f6' : 'transparent',
                color: activeModule === module.id ? 'white' : '#374151',
                textAlign: 'left',
                cursor: 'pointer'
              }}
            >
              {module.name}
              {module.requiresAuth && (
                <span style={{ 
                  marginLeft: '8px', 
                  fontSize: '12px',
                  opacity: 0.7
                }}>
                  🔒
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Session Events Log */}
        <div style={{ 
          padding: '15px',
          backgroundColor: 'white',
          borderRadius: '6px',
          border: '1px solid #e1e1e1'
        }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Session Events:</h4>
          <div style={{ fontSize: '12px', fontFamily: 'monospace' }}>
            {sessionEvents.length === 0 ? (
              <p style={{ margin: 0, color: '#6b7280' }}>No events yet</p>
            ) : (
              sessionEvents.map((event, index) => (
                <div key={index} style={{ marginBottom: '2px' }}>
                  {event}
                </div>
              ))
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, backgroundColor: 'white' }}>
        <header style={{ 
          padding: '20px',
          borderBottom: '1px solid #e1e1e1',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1>{currentModule?.name}</h1>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            {session ? (
              <span>✅ Authenticated as {session.user?.username}</span>
            ) : (
              <span>🔓 Public Access</span>
            )}
          </div>
        </header>

        <div style={{ padding: '20px' }}>
          {renderModuleContent()}
        </div>
      </main>
    </div>
  );
}
```

## Form Integration

### Protected Form with Session Validation

```tsx
"use client";

import React, { useState } from 'react';
import { SessionExpiresLogout } from 'instincthub-react-ui';
import { useSession } from 'next-auth/react';

export default function ProtectedForm() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitResult('Form submitted successfully!');
      setFormData({ title: '', description: '', category: 'general' });
    } catch (error) {
      setSubmitResult('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSessionInvalid = () => {
    setSubmitResult('Session expired. Please log in again to submit forms.');
    setIsSubmitting(false);
  };

  return (
    <SessionExpiresLogout 
      session={session}
      expiredMessage="Your session expired while filling out the form. Please log in again."
      onSessionInvalid={handleSessionInvalid}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h1>Protected Form</h1>
        <p>This form requires authentication to submit.</p>

        <form onSubmit={handleSubmit} style={{ 
          border: '1px solid #e1e1e1', 
          borderRadius: '8px', 
          padding: '24px',
          backgroundColor: 'white'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e1e1',
                borderRadius: '6px',
                fontSize: '16px'
              }}
              placeholder="Enter title"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e1e1',
                borderRadius: '6px',
                fontSize: '16px'
              }}
            >
              <option value="general">General</option>
              <option value="urgent">Urgent</option>
              <option value="feedback">Feedback</option>
              <option value="bug-report">Bug Report</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
              rows={5}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e1e1',
                borderRadius: '6px',
                fontSize: '16px',
                resize: 'vertical'
              }}
              placeholder="Enter detailed description"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: isSubmitting ? '#9ca3af' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Form'}
          </button>
        </form>

        {submitResult && (
          <div style={{
            marginTop: '20px',
            padding: '12px 16px',
            borderRadius: '6px',
            backgroundColor: submitResult.includes('Error') || submitResult.includes('expired') 
              ? '#fef2f2' : '#f0fdf4',
            border: `1px solid ${submitResult.includes('Error') || submitResult.includes('expired') 
              ? '#fca5a5' : '#bbf7d0'}`,
            color: submitResult.includes('Error') || submitResult.includes('expired') 
              ? '#dc2626' : '#059669'
          }}>
            {submitResult}
          </div>
        )}
      </div>
    </SessionExpiresLogout>
  );
}
```

## Error Handling

### Graceful Session Error Handling

```tsx
"use client";

import React, { useState, useEffect } from 'react';
import { SessionExpiresLogout } from 'instincthub-react-ui';
import { useSession } from 'next-auth/react';

interface ErrorLog {
  timestamp: string;
  type: 'session' | 'network' | 'validation';
  message: string;
}

export default function SessionErrorHandling() {
  const { data: session } = useSession();
  const [errorLogs, setErrorLogs] = useState<ErrorLog[]>([]);
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline'>('online');

  const addErrorLog = (type: ErrorLog['type'], message: string) => {
    setErrorLogs(prev => [...prev.slice(-9), {
      timestamp: new Date().toLocaleTimeString(),
      type,
      message
    }]);
  };

  const handleSessionInvalid = () => {
    addErrorLog('session', 'Session validation failed - user will be logged out');
  };

  useEffect(() => {
    const handleOnline = () => {
      setNetworkStatus('online');
      addErrorLog('network', 'Network connection restored');
    };

    const handleOffline = () => {
      setNetworkStatus('offline');
      addErrorLog('network', 'Network connection lost');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const simulateNetworkError = () => {
    addErrorLog('network', 'Simulated network timeout during session validation');
  };

  const simulateSessionError = () => {
    addErrorLog('validation', 'Simulated session validation error');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Session Error Handling Demo</h1>

      {/* Network Status */}
      <div style={{
        marginBottom: '20px',
        padding: '12px 16px',
        borderRadius: '6px',
        backgroundColor: networkStatus === 'online' ? '#f0fdf4' : '#fef2f2',
        border: `1px solid ${networkStatus === 'online' ? '#bbf7d0' : '#fca5a5'}`,
        color: networkStatus === 'online' ? '#059669' : '#dc2626'
      }}>
        Network Status: {networkStatus === 'online' ? '🟢 Online' : '🔴 Offline'}
      </div>

      {/* Session Protected Content */}
      <SessionExpiresLogout
        session={session}
        expiredMessage="Session expired due to network issues or validation failure."
        onSessionInvalid={handleSessionInvalid}
      >
        <div style={{ 
          border: '1px solid #e1e1e1', 
          borderRadius: '8px', 
          padding: '24px',
          marginBottom: '20px',
          backgroundColor: 'white'
        }}>
          <h2>Protected Content Area</h2>
          <p>This content is protected by session validation.</p>
          
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button
              onClick={simulateNetworkError}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Simulate Network Error
            </button>
            
            <button
              onClick={simulateSessionError}
              style={{
                padding: '8px 16px',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Simulate Session Error
            </button>
          </div>
        </div>
      </SessionExpiresLogout>

      {/* Error Logs */}
      <div style={{ 
        border: '1px solid #e1e1e1', 
        borderRadius: '8px', 
        padding: '20px',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h3 style={{ margin: 0 }}>Error Log</h3>
          <button
            onClick={() => setErrorLogs([])}
            style={{
              padding: '4px 8px',
              fontSize: '12px',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Clear Log
          </button>
        </div>

        {errorLogs.length === 0 ? (
          <p style={{ color: '#6b7280', fontStyle: 'italic' }}>No errors logged yet</p>
        ) : (
          <div style={{ 
            maxHeight: '300px', 
            overflowY: 'auto',
            backgroundColor: 'white',
            border: '1px solid #e1e1e1',
            borderRadius: '4px',
            padding: '12px'
          }}>
            {errorLogs.map((log, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '8px',
                  padding: '8px',
                  borderRadius: '4px',
                  backgroundColor: log.type === 'session' ? '#fef2f2' :
                                   log.type === 'network' ? '#fef3c7' : '#eff6ff',
                  border: `1px solid ${log.type === 'session' ? '#fca5a5' :
                                      log.type === 'network' ? '#fbbf24' : '#bfdbfe'}`,
                  fontSize: '14px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 'bold' }}>
                    {log.type.charAt(0).toUpperCase() + log.type.slice(1)} Error
                  </span>
                  <span style={{ color: '#6b7280', fontSize: '12px' }}>
                    {log.timestamp}
                  </span>
                </div>
                <div>{log.message}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Error Handling Tips */}
      <div style={{
        marginTop: '20px',
        padding: '16px',
        backgroundColor: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderRadius: '8px'
      }}>
        <h3 style={{ color: '#1d4ed8' }}>Error Handling Best Practices:</h3>
        <ul style={{ color: '#1d4ed8', margin: 0 }}>
          <li>Monitor network connectivity status</li>
          <li>Provide clear error messages to users</li>
          <li>Log session validation failures for debugging</li>
          <li>Implement retry mechanisms for transient errors</li>
          <li>Gracefully handle session timeouts</li>
          <li>Preserve user data when possible during errors</li>
        </ul>
      </div>
    </div>
  );
}
```

## Testing Examples

### Unit Tests

```tsx
// __tests__/SessionExpiresLogout.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { SessionExpiresLogout } from 'instincthub-react-ui';

// Mock the getData function
jest.mock('@/components/lib/auth/dbRequestst', () => ({
  getData: jest.fn()
}));

// Mock SignOutSession component
jest.mock('@/components/theme/signout/SignOutSession', () => {
  return function MockSignOutSession({ message }: { message: string }) {
    return <div data-testid="signout-session">{message}</div>;
  };
});

const mockGetData = require('@/components/lib/auth/dbRequestst').getData;

describe('SessionExpiresLogout', () => {
  const mockSession = {
    user: {
      id: 'user-123',
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      uuid: 'user-123'
    },
    accessToken: 'valid-access-token',
    channels: {
      active: {
        username: 'test-channel'
      }
    },
    expires: new Date(Date.now() + 3600000).toISOString() // 1 hour from now
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders children when session is valid', async () => {
    mockGetData.mockResolvedValue({ detail: 'valid' });

    render(
      <SessionExpiresLogout session={mockSession}>
        <div data-testid="protected-content">Protected Content</div>
      </SessionExpiresLogout>
    );

    // Should show loading initially
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Should show protected content after validation
    await waitFor(() => {
      expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    });
  });

  test('shows signout when session is invalid', async () => {
    mockGetData.mockResolvedValue({ detail: 'Unauthorized' });

    render(
      <SessionExpiresLogout session={mockSession} expiredMessage="Custom expired message">
        <div data-testid="protected-content">Protected Content</div>
      </SessionExpiresLogout>
    );

    await waitFor(() => {
      expect(screen.getByTestId('signout-session')).toBeInTheDocument();
      expect(screen.getByText('Custom expired message')).toBeInTheDocument();
    });
  });

  test('handles expired session', async () => {
    const expiredSession = {
      ...mockSession,
      expires: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
    };

    render(
      <SessionExpiresLogout session={expiredSession}>
        <div data-testid="protected-content">Protected Content</div>
      </SessionExpiresLogout>
    );

    await waitFor(() => {
      expect(screen.getByTestId('signout-session')).toBeInTheDocument();
    });
  });

  test('calls onSessionInvalid callback', async () => {
    const onSessionInvalid = jest.fn();
    mockGetData.mockResolvedValue({ detail: 'Unauthorized' });

    render(
      <SessionExpiresLogout session={mockSession} onSessionInvalid={onSessionInvalid}>
        <div data-testid="protected-content">Protected Content</div>
      </SessionExpiresLogout>
    );

    await waitFor(() => {
      expect(onSessionInvalid).toHaveBeenCalled();
    });
  });

  test('skips validation when disabled', async () => {
    render(
      <SessionExpiresLogout session={mockSession} disableValidation={true}>
        <div data-testid="protected-content">Protected Content</div>
      </SessionExpiresLogout>
    );

    await waitFor(() => {
      expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    });

    expect(mockGetData).not.toHaveBeenCalled();
  });

  test('handles network errors gracefully', async () => {
    mockGetData.mockRejectedValue(new Error('Network error'));

    render(
      <SessionExpiresLogout session={mockSession}>
        <div data-testid="protected-content">Protected Content</div>
      </SessionExpiresLogout>
    );

    // Should still show content on network error (fallback behavior)
    await waitFor(() => {
      expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    });
  });

  test('handles missing session', async () => {
    render(
      <SessionExpiresLogout session={null}>
        <div data-testid="protected-content">Protected Content</div>
      </SessionExpiresLogout>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    });
  });
});
```

## Related Components

- [SignOutSession](./SignOutSession.md) - Session logout component
- [SessionProviders](./SessionProviders.md) - Session provider wrapper
- [SessionHandleProvider](./SessionHandleProvider.md) - Session management provider
- [LoadingAnimate](./LoadingAnimate.md) - Loading animation for validation states
- [DarkModeProvider](./DarkModeProvider.md) - Theme provider for consistent styling

## Notes

- Requires proper session object structure with user token and expiration
- Uses API endpoint `/auth/skills/validate-user-token/` for token validation
- Automatically prevents memory leaks with cleanup function
- Falls back to valid state on network errors (configurable behavior)
- Integrates seamlessly with NextAuth.js session management
- Loading state shows while validation is in progress
- Component unmounts safely without state update warnings
- Suitable for wrapping entire applications or specific protected routes

