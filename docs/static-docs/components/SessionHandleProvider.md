# SessionHandleProvider

A context provider component that manages channel switching and validation based on URL parameters. This component handles session updates when users navigate between different channels, validates channel handles, and provides error handling for invalid channel access.

## Features

- **Channel Handle Validation**: Validates channel handles from URL parameters
- **Automatic Channel Switching**: Updates session when channel handle changes
- **Session Integration**: Works with NextAuth.js session management
- **Error Handling**: Shows error pages for invalid channels
- **Toast Notifications**: User feedback for channel operations
- **URL Parameter Monitoring**: Responds to route parameter changes
- **API Integration**: Fetches channel data from backend APIs
- **Optimized Performance**: Uses memoization and callbacks for efficiency

## Props

### SessionHandleProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Child components to render |
| `endpointPath` | `string \| null` | `"channels/instructor-channel/selected/"` | Custom API endpoint path for channel operations |

### Session Type

```tsx
import { Session } from '@/types/auth';

// The Session interface includes:
interface Session {
  user: {
    id: string;
    name: string;
    username: string;
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
import { SessionHandleProvider } from 'instincthub-react-ui';
import { useParams } from 'next/navigation';

export default function ChannelLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionHandleProvider>
      <div>
        <h1>Channel Content</h1>
        {children}
      </div>
    </SessionHandleProvider>
  );
}
```

## Advanced Usage

### Multi-Channel Application

```tsx
"use client";

import React, { useState, useEffect } from 'react';
import { SessionHandleProvider } from 'instincthub-react-ui';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';

interface Channel {
  id: string;
  username: string;
  name: string;
  description: string;
  isActive: boolean;
}

export default function ChannelSwitcher() {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();
  const [availableChannels, setAvailableChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentChannelHandle = params.channel as string;

  useEffect(() => {
    // Fetch user's available channels
    const fetchChannels = async () => {
      if (!session?.accessToken) return;

      try {
        const response = await fetch('/api/channels/list', {
          headers: {
            'Authorization': `Bearer ${session.user.name.token}`
          }
        });

        if (response.ok) {
          const channels = await response.json();
          setAvailableChannels(channels);
        }
      } catch (error) {
        console.error('Failed to fetch channels:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChannels();
  }, [session]);

  const handleChannelSwitch = (channelHandle: string) => {
    router.push(`/channels/${channelHandle}`);
  };

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '200px'
      }}>
        <div>Loading channels...</div>
      </div>
    );
  }

  return (
    <SessionHandleProvider endpointPath="channels/instructor-channel/selected/">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {/* Channel Switcher Header */}
        <header style={{ 
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e1e1e1'
        }}>
          <h1>Channel Dashboard</h1>
          <p>Currently viewing: <strong>@{currentChannelHandle}</strong></p>
          
          {availableChannels.length > 1 && (
            <div style={{ marginTop: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Switch Channel:
              </label>
              <select
                value={currentChannelHandle}
                onChange={(e) => handleChannelSwitch(e.target.value)}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #e1e1e1',
                  borderRadius: '4px',
                  backgroundColor: 'white'
                }}
              >
                {availableChannels.map(channel => (
                  <option key={channel.id} value={channel.username}>
                    @{channel.username} - {channel.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </header>

        {/* Channel Content */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          <div style={{ 
            padding: '20px',
            border: '1px solid #e1e1e1',
            borderRadius: '8px',
            backgroundColor: 'white'
          }}>
            <h3>Channel Information</h3>
            <div style={{ marginBottom: '10px' }}>
              <strong>Handle:</strong> @{currentChannelHandle}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Status:</strong> 
              <span style={{ color: '#10b981', marginLeft: '8px' }}>Active</span>
            </div>
            <div>
              <strong>Session:</strong> 
              {session?.user ? ' Authenticated' : ' Not authenticated'}
            </div>
          </div>

          <div style={{ 
            padding: '20px',
            border: '1px solid #e1e1e1',
            borderRadius: '8px',
            backgroundColor: 'white'
          }}>
            <h3>Available Channels</h3>
            {availableChannels.map(channel => (
              <div 
                key={channel.id}
                style={{ 
                  padding: '10px',
                  marginBottom: '8px',
                  backgroundColor: channel.username === currentChannelHandle ? '#f0f9ff' : '#f8f9fa',
                  borderRadius: '4px',
                  border: channel.username === currentChannelHandle ? '1px solid #3b82f6' : '1px solid #e1e1e1',
                  cursor: 'pointer'
                }}
                onClick={() => handleChannelSwitch(channel.username)}
              >
                <div style={{ fontWeight: 'bold' }}>@{channel.username}</div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>{channel.name}</div>
              </div>
            ))}
          </div>

          <div style={{ 
            padding: '20px',
            border: '1px solid #e1e1e1',
            borderRadius: '8px',
            backgroundColor: 'white'
          }}>
            <h3>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: '10px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Refresh Channel Data
              </button>
              
              <button
                onClick={() => router.push('/channels')}
                style={{
                  padding: '10px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                View All Channels
              </button>
            </div>
          </div>
        </div>
      </div>
    </SessionHandleProvider>
  );
}
```

### Channel Content Management

```tsx
"use client";

import React, { useState, useEffect } from 'react';
import { SessionHandleProvider } from 'instincthub-react-ui';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

interface ChannelContent {
  id: string;
  title: string;
  type: 'post' | 'video' | 'course';
  createdAt: string;
  status: 'published' | 'draft' | 'scheduled';
}

function ChannelContentManager() {
  const { data: session } = useSession();
  const params = useParams();
  const [content, setContent] = useState<ChannelContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const channelHandle = params.channel as string;

  useEffect(() => {
    const fetchContent = async () => {
      if (!session?.accessToken || !channelHandle) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/channels/${channelHandle}/content`, {
          headers: {
            'Authorization': `Bearer ${session.user.name.token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.status}`);
        }

        const contentData = await response.json();
        setContent(contentData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load content';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [session, channelHandle]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return { bg: '#f0fdf4', color: '#059669', border: '#bbf7d0' };
      case 'draft': return { bg: '#fef3c7', color: '#92400e', border: '#fbbf24' };
      case 'scheduled': return { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' };
      default: return { bg: '#f8f9fa', color: '#6b7280', border: '#e1e1e1' };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '300px'
      }}>
        <div>Loading channel content...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        padding: '20px',
        backgroundColor: '#fef2f2',
        border: '1px solid #fca5a5',
        borderRadius: '8px',
        color: '#dc2626'
      }}>
        <h3>Error Loading Content</h3>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '8px 16px',
            backgroundColor: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ 
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2>Content for @{channelHandle}</h2>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Create New Content
        </button>
      </div>

      {content.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e1e1e1'
        }}>
          <h3>No Content Yet</h3>
          <p>Start creating content for your channel!</p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid',
          gap: '16px'
        }}>
          {content.map(item => {
            const statusStyle = getStatusColor(item.status);
            
            return (
              <div
                key={item.id}
                style={{
                  padding: '20px',
                  border: '1px solid #e1e1e1',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '16px',
                  alignItems: 'center'
                }}
              >
                <div>
                  <h3 style={{ margin: '0 0 8px 0' }}>{item.title}</h3>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#6b7280' }}>
                    <span>Type: {item.type}</span>
                    <span>Created: {formatDate(item.createdAt)}</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    padding: '4px 8px',
                    backgroundColor: statusStyle.bg,
                    color: statusStyle.color,
                    border: `1px solid ${statusStyle.border}`,
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {item.status.toUpperCase()}
                  </span>
                  
                  <button
                    style={{
                      padding: '6px 12px',
                      backgroundColor: 'transparent',
                      color: '#3b82f6',
                      border: '1px solid #3b82f6',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ChannelPage() {
  return (
    <SessionHandleProvider endpointPath="channels/instructor-channel/selected/">
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <ChannelContentManager />
      </div>
    </SessionHandleProvider>
  );
}
```

## Form Integration

### Channel Settings Form

```tsx
"use client";

import React, { useState, useEffect } from 'react';
import { SessionHandleProvider } from 'instincthub-react-ui';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

interface ChannelSettings {
  name: string;
  description: string;
  website: string;
  isPublic: boolean;
  allowComments: boolean;
  emailNotifications: boolean;
}

function ChannelSettingsForm() {
  const { data: session } = useSession();
  const params = useParams();
  const [settings, setSettings] = useState<ChannelSettings>({
    name: '',
    description: '',
    website: '',
    isPublic: true,
    allowComments: true,
    emailNotifications: true
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveResult, setSaveResult] = useState<string | null>(null);

  const channelHandle = params.channel as string;

  useEffect(() => {
    const fetchSettings = async () => {
      if (!session?.accessToken || !channelHandle) return;

      try {
        const response = await fetch(`/api/channels/${channelHandle}/settings`, {
          headers: {
            'Authorization': `Bearer ${session.user.name.token}`
          }
        });

        if (response.ok) {
          const settingsData = await response.json();
          setSettings(settingsData);
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [session, channelHandle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveResult(null);

    try {
      const response = await fetch(`/api/channels/${channelHandle}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        setSaveResult('Settings saved successfully!');
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      setSaveResult('Error saving settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (isLoading) {
    return <div>Loading channel settings...</div>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
      <h2>Channel Settings</h2>
      <p>Configure settings for @{channelHandle}</p>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Channel Name
        </label>
        <input
          type="text"
          name="name"
          value={settings.name}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #e1e1e1',
            borderRadius: '6px',
            fontSize: '16px'
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Description
        </label>
        <textarea
          name="description"
          value={settings.description}
          onChange={handleChange}
          rows={4}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #e1e1e1',
            borderRadius: '6px',
            fontSize: '16px',
            resize: 'vertical'
          }}
          placeholder="Describe your channel..."
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Website
        </label>
        <input
          type="url"
          name="website"
          value={settings.website}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #e1e1e1',
            borderRadius: '6px',
            fontSize: '16px'
          }}
          placeholder="https://yourwebsite.com"
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Privacy & Interaction</h3>
        
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <input
            type="checkbox"
            name="isPublic"
            checked={settings.isPublic}
            onChange={handleChange}
          />
          Make channel public
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <input
            type="checkbox"
            name="allowComments"
            checked={settings.allowComments}
            onChange={handleChange}
          />
          Allow comments on content
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            name="emailNotifications"
            checked={settings.emailNotifications}
            onChange={handleChange}
          />
          Enable email notifications
        </label>
      </div>

      <button
        type="submit"
        disabled={isSaving}
        style={{
          padding: '12px 24px',
          backgroundColor: isSaving ? '#9ca3af' : '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: isSaving ? 'not-allowed' : 'pointer'
        }}
      >
        {isSaving ? 'Saving...' : 'Save Settings'}
      </button>

      {saveResult && (
        <div style={{
          marginTop: '16px',
          padding: '12px',
          borderRadius: '6px',
          backgroundColor: saveResult.includes('Error') ? '#fef2f2' : '#f0fdf4',
          border: `1px solid ${saveResult.includes('Error') ? '#fca5a5' : '#bbf7d0'}`,
          color: saveResult.includes('Error') ? '#dc2626' : '#059669'
        }}>
          {saveResult}
        </div>
      )}
    </form>
  );
}

export default function ChannelSettingsPage() {
  return (
    <SessionHandleProvider>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <ChannelSettingsForm />
      </div>
    </SessionHandleProvider>
  );
}
```

## Error Handling

### Robust Error Handling

```tsx
"use client";

import React, { useState, useEffect } from 'react';
import { SessionHandleProvider } from 'instincthub-react-ui';
import { useParams, useRouter } from 'next/navigation';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ChannelErrorBoundary extends React.Component<
  { children: React.ReactNode }, 
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Channel Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          backgroundColor: '#fef2f2',
          border: '1px solid #fca5a5',
          borderRadius: '8px',
          margin: '20px'
        }}>
          <h2 style={{ color: '#dc2626' }}>Channel Error</h2>
          <p>Something went wrong while loading the channel.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function ChannelValidationDemo() {
  const params = useParams();
  const router = useRouter();
  const [validationHistory, setValidationHistory] = useState<string[]>([]);
  
  const channelHandle = params.channel as string;

  const addValidationLog = (message: string) => {
    setValidationHistory(prev => [
      ...prev.slice(-4),
      `${new Date().toLocaleTimeString()}: ${message}`
    ]);
  };

  const testValidChannels = ['tech-channel', 'design-hub', 'coding-tutorials'];
  const testInvalidChannels = ['null', 'undefined', '', ' ', 'false'];

  const navigateToChannel = (handle: string) => {
    addValidationLog(`Navigating to channel: ${handle}`);
    router.push(`/channels/${handle}`);
  };

  useEffect(() => {
    if (channelHandle) {
      addValidationLog(`Current channel handle: ${channelHandle}`);
    }
  }, [channelHandle]);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Channel Validation Demo</h1>
      <p>Current channel: <strong>@{channelHandle || 'None'}</strong></p>

      <div style={{ marginBottom: '30px' }}>
        <h3>Test Valid Channels</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {testValidChannels.map(handle => (
            <button
              key={handle}
              onClick={() => navigateToChannel(handle)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              @{handle}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Test Invalid Channels</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {testInvalidChannels.map((handle, index) => (
            <button
              key={index}
              onClick={() => navigateToChannel(handle)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {handle || '(empty)'}
            </button>
          ))}
        </div>
      </div>

      {validationHistory.length > 0 && (
        <div style={{
          padding: '16px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #e1e1e1',
          borderRadius: '8px'
        }}>
          <h3>Validation History</h3>
          <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>
            {validationHistory.map((log, index) => (
              <div key={index} style={{ marginBottom: '4px' }}>
                {log}
              </div>
            ))}
          </div>
          <button
            onClick={() => setValidationHistory([])}
            style={{
              marginTop: '10px',
              padding: '4px 8px',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Clear History
          </button>
        </div>
      )}
    </div>
  );
}

export default function ChannelErrorHandlingDemo() {
  return (
    <ChannelErrorBoundary>
      <SessionHandleProvider>
        <ChannelValidationDemo />
      </SessionHandleProvider>
    </ChannelErrorBoundary>
  );
}
```

## Testing Examples

### Unit Tests

```tsx
// __tests__/SessionHandleProvider.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { SessionHandleProvider } from 'instincthub-react-ui';

// Mock dependencies
jest.mock('next/navigation');
jest.mock('next-auth/react');
jest.mock('@/components/lib/modals/modals');

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;
const mockUseSession = useSession as jest.MockedFunction<typeof useSession>;

describe('SessionHandleProvider', () => {
  const mockSession = {
    user: {
      name: {
        token: 'test-token',
        channels: {
          active: {
            channel: {
              username: 'current-channel'
            }
          }
        }
      }
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  test('renders children when channel handle is valid', async () => {
    mockUseParams.mockReturnValue({ channel: 'current-channel' });
    mockUseSession.mockReturnValue({ 
      data: mockSession, 
      update: jest.fn() 
    } as any);

    render(
      <SessionHandleProvider>
        <div data-testid="child-content">Channel Content</div>
      </SessionHandleProvider>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  test('shows error for invalid channel handle', async () => {
    mockUseParams.mockReturnValue({ channel: 'null' });
    mockUseSession.mockReturnValue({ 
      data: mockSession, 
      update: jest.fn() 
    } as any);

    render(
      <SessionHandleProvider>
        <div data-testid="child-content">Channel Content</div>
      </SessionHandleProvider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('child-content')).not.toBeInTheDocument();
    });
  });

  test('switches channel when handle changes', async () => {
    const mockUpdate = jest.fn();
    mockUseParams.mockReturnValue({ channel: 'new-channel' });
    mockUseSession.mockReturnValue({ 
      data: mockSession, 
      update: mockUpdate 
    } as any);

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        active: { id: 'new-channel-id' }
      })
    });

    render(
      <SessionHandleProvider endpointPath="test/endpoint/">
        <div data-testid="child-content">Channel Content</div>
      </SessionHandleProvider>
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('test/endpoint/new-channel/'),
        expect.any(Object)
      );
    });
  });

  test('handles API errors gracefully', async () => {
    mockUseParams.mockReturnValue({ channel: 'error-channel' });
    mockUseSession.mockReturnValue({ 
      data: mockSession, 
      update: jest.fn() 
    } as any);

    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    render(
      <SessionHandleProvider>
        <div data-testid="child-content">Channel Content</div>
      </SessionHandleProvider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('child-content')).not.toBeInTheDocument();
    });
  });
});
```

## Related Components

- [Error500](./Error500.md) - Error page component for invalid channels
- [SessionExpiresLogout](./SessionExpiresLogout.md) - Session expiration handling
- [SessionProviders](./SessionProviders.md) - Session provider wrapper
- [DeleteConfirmationModal](./DeleteConfirmationModal.md) - Modal components with session integration
- [ReactTimeTracker](./ReactTimeTracker.md) - Time tracking with session management

## Notes

- Requires NextAuth.js session with proper user structure
- Uses URL parameters from Next.js router for channel detection
- Validates channel handles against predefined invalid values
- Automatically updates session when switching channels
- Shows Error500 component for invalid channel access
- Optimized with React hooks for performance
- Handles network errors gracefully with user feedback
- Suitable for multi-tenant channel-based applications

