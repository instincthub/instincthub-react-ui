# TimeTracker (ReactTimeTracker)

A React component that automatically tracks user time spent on pages with visibility detection, idle handling, and server-side analytics integration. This component silently monitors user engagement and sends time data to analytics endpoints.

## Features

- **Automatic Time Tracking**: Tracks user time spent on pages automatically
- **Visibility Detection**: Monitors when users switch tabs or minimize browser
- **Idle State Handling**: Detects when users become idle
- **Redux Integration**: Uses Redux for state management and IP address tracking
- **Server Analytics**: Sends time data to server endpoints for analytics
- **Session Integration**: Works with user sessions and channel tracking
- **Error Resilient**: Graceful handling of network failures
- **Performance Optimized**: Minimal overhead with efficient event handling

## Props

### ReactTimeTracker Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `channel_username` | `string \| null` | `null` | The channel username for tracking |
| `session` | `Session \| null` | - | User session object with authentication details |
| `endpoint` | `string \| null` | `"/api/user-ip-address"` | API endpoint for fetching user IP address |

### Session Interface

```tsx
import { Session } from '@/types/auth';

// The Session interface includes:
interface Session {
  user: {
    id: string;
    name: string;
    email: string;
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
import { ReactTimeTracker } from 'instincthub-react-ui';
import { useSession } from 'next-auth/react';

export default function PageWithTracking() {
  const { data: session } = useSession();

  return (
    <div>
      {/* Time tracker - invisible component */}
      <ReactTimeTracker
        channel_username="my-channel"
        session={session}
        endpoint="/api/user-ip-address"
      />
      
      {/* Your page content */}
      <h1>Welcome to My Page</h1>
      <p>This page automatically tracks user engagement time.</p>
    </div>
  );
}
```

## Advanced Usage

### Multi-Channel Time Tracking

```tsx
"use client";

import React, { useState, useEffect } from 'react';
import { ReactTimeTracker } from 'instincthub-react-ui';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

interface TimeTrackingProviderProps {
  children: React.ReactNode;
  enableTracking?: boolean;
}

export default function TimeTrackingProvider({ 
  children, 
  enableTracking = true 
}: TimeTrackingProviderProps) {
  const { data: session } = useSession();
  const params = useParams();
  const [trackingData, setTrackingData] = useState({
    sessionStart: new Date(),
    pageViews: 0,
    totalTime: 0
  });
  
  const channelUsername = params.channel as string;

  useEffect(() => {
    if (enableTracking) {
      setTrackingData(prev => ({
        ...prev,
        pageViews: prev.pageViews + 1
      }));
    }
  }, [enableTracking]);

  // Update total time periodically
  useEffect(() => {
    if (!enableTracking) return;

    const interval = setInterval(() => {
      setTrackingData(prev => ({
        ...prev,
        totalTime: Math.floor((new Date().getTime() - prev.sessionStart.getTime()) / 1000)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [enableTracking, trackingData.sessionStart]);

  return (
    <div>
      {enableTracking && session && (
        <ReactTimeTracker
          channel_username={channelUsername}
          session={session}
          endpoint="/api/analytics/user-ip"
        />
      )}
      
      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && enableTracking && (
        <div style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          backgroundColor: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '10px',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 9999
        }}>
          <div>Channel: {channelUsername || 'None'}</div>
          <div>Page Views: {trackingData.pageViews}</div>
          <div>Session Time: {trackingData.totalTime}s</div>
          <div>User: {session?.user?.id || 'Anonymous'}</div>
        </div>
      )}
      
      {children}
    </div>
  );
}
```

### Custom Analytics Dashboard

```tsx
"use client";

import React, { useState, useEffect } from 'react';
import { ReactTimeTracker } from 'instincthub-react-ui';
import { useSession } from 'next-auth/react';

interface AnalyticsData {
  totalTime: number;
  sessions: number;
  avgSessionLength: number;
  topPages: Array<{ url: string; time: number; visits: number }>;
  dailyStats: Array<{ date: string; time: number; visits: number }>;
}

interface AnalyticsDashboardProps {
  channelUsername: string;
  dateRange?: { start: Date; end: Date };
}

export default function AnalyticsDashboard({ 
  channelUsername, 
  dateRange 
}: AnalyticsDashboardProps) {
  const { data: session } = useSession();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!session?.accessToken) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const params = new URLSearchParams({
          channel: channelUsername,
          ...(dateRange && {
            start: dateRange.start.toISOString(),
            end: dateRange.end.toISOString()
          })
        });
        
        const response = await fetch(`/api/analytics/time-tracking?${params}`, {
          headers: {
            'Authorization': `Bearer ${session.accessToken}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch analytics: ${response.status}`);
        }
        
        const data = await response.json();
        setAnalytics(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [channelUsername, dateRange, session]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '200px'
      }}>
        <div>Loading analytics...</div>
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
        <h3>Error Loading Analytics</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h3>No Analytics Data</h3>
        <p>No time tracking data found for this channel.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Include time tracker for current session */}
      <ReactTimeTracker
        channel_username={channelUsername}
        session={session}
        endpoint="/api/analytics/user-ip"
      />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h1>Time Tracking Analytics</h1>
        <p style={{ color: '#6b7280', marginBottom: '30px' }}>
          Channel: <strong>@{channelUsername}</strong>
        </p>

        {/* Summary Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            border: '1px solid #e1e5e9',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#4f46e5' }}>Total Time</h3>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
              {formatTime(analytics.totalTime)}
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            border: '1px solid #e1e5e9',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#059669' }}>Sessions</h3>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
              {analytics.sessions.toLocaleString()}
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            border: '1px solid #e1e5e9',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#dc2626' }}>Avg Session</h3>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
              {formatTime(analytics.avgSessionLength)}
            </div>
          </div>
        </div>

        {/* Top Pages */}
        <div style={{ marginBottom: '40px' }}>
          <h2>Top Pages by Time</h2>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            border: '1px solid #e1e5e9',
            overflow: 'hidden'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e1e5e9' }}>Page</th>
                  <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #e1e5e9' }}>Time Spent</th>
                  <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #e1e5e9' }}>Visits</th>
                  <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #e1e5e9' }}>Avg Time/Visit</th>
                </tr>
              </thead>
              <tbody>
                {analytics.topPages.map((page, index) => (
                  <tr key={index}>
                    <td style={{ padding: '12px', borderBottom: '1px solid #f1f3f4' }}>
                      <a href={page.url} style={{ color: '#4f46e5', textDecoration: 'none' }}>
                        {page.url}
                      </a>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #f1f3f4' }}>
                      {formatTime(page.time)}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #f1f3f4' }}>
                      {page.visits}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #f1f3f4' }}>
                      {formatTime(Math.round(page.time / page.visits))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Daily Stats Chart */}
        <div>
          <h2>Daily Time Tracking</h2>
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            border: '1px solid #e1e5e9'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'end', 
              gap: '4px',
              height: '200px',
              marginBottom: '16px'
            }}>
              {analytics.dailyStats.map((day, index) => {
                const maxTime = Math.max(...analytics.dailyStats.map(d => d.time));
                const height = (day.time / maxTime) * 180;
                
                return (
                  <div
                    key={index}
                    style={{
                      flex: 1,
                      height: `${height}px`,
                      backgroundColor: '#4f46e5',
                      borderRadius: '2px 2px 0 0',
                      position: 'relative',
                      cursor: 'pointer'
                    }}
                    title={`${day.date}: ${formatTime(day.time)} (${day.visits} visits)`}
                  />
                );
              })}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280' }}>
              <span>{analytics.dailyStats[0]?.date}</span>
              <span>{analytics.dailyStats[analytics.dailyStats.length - 1]?.date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Time Tracking with Goals

```tsx
"use client";

import React, { useState, useEffect } from 'react';
import { ReactTimeTracker } from 'instincthub-react-ui';
import { useSession } from 'next-auth/react';

interface TimeGoal {
  id: string;
  name: string;
  targetMinutes: number;
  currentMinutes: number;
  deadline: Date;
  color: string;
}

interface TimeGoalsTrackerProps {
  channelUsername: string;
  goals: TimeGoal[];
  onGoalUpdate?: (goalId: string, minutes: number) => void;
}

export default function TimeGoalsTracker({ 
  channelUsername, 
  goals,
  onGoalUpdate
}: TimeGoalsTrackerProps) {
  const { data: session } = useSession();
  const [sessionTime, setSessionTime] = useState(0);
  const [startTime] = useState(new Date());

  // Update session time every second
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((new Date().getTime() - startTime.getTime()) / 1000 / 60);
      setSessionTime(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  // Update goals when session time changes
  useEffect(() => {
    if (sessionTime > 0 && onGoalUpdate) {
      goals.forEach(goal => {
        onGoalUpdate(goal.id, sessionTime);
      });
    }
  }, [sessionTime, goals, onGoalUpdate]);

  const getGoalProgress = (goal: TimeGoal): number => {
    return Math.min((goal.currentMinutes / goal.targetMinutes) * 100, 100);
  };

  const getDaysRemaining = (deadline: Date): number => {
    return Math.ceil((deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div>
      {/* Time Tracker */}
      <ReactTimeTracker
        channel_username={channelUsername}
        session={session}
        endpoint="/api/time-tracking/user-ip"
      />
      
      {/* Goals Dashboard */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h1>Time Tracking Goals</h1>
          <div style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '6px',
            padding: '8px 16px',
            color: '#059669'
          }}>
            Session: {sessionTime} minutes
          </div>
        </div>

        {goals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h3>No Goals Set</h3>
            <p>Create time tracking goals to monitor your progress!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {goals.map(goal => {
              const progress = getGoalProgress(goal);
              const daysRemaining = getDaysRemaining(goal.deadline);
              const isCompleted = progress >= 100;
              const isOverdue = daysRemaining < 0;
              
              return (
                <div
                  key={goal.id}
                  style={{
                    backgroundColor: 'white',
                    border: `1px solid ${isCompleted ? '#bbf7d0' : isOverdue ? '#fca5a5' : '#e1e5e9'}`,
                    borderRadius: '8px',
                    padding: '24px'
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <h3 style={{ margin: '0 0 8px 0' }}>{goal.name}</h3>
                      <div style={{ color: '#6b7280', fontSize: '14px' }}>
                        {goal.currentMinutes} / {goal.targetMinutes} minutes
                        {isOverdue ? ' (Overdue)' : ` (${daysRemaining} days left)`}
                      </div>
                    </div>
                    
                    <div style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: isCompleted ? '#059669' : isOverdue ? '#dc2626' : goal.color
                    }}>
                      {Math.round(progress)}%
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{
                    backgroundColor: '#f1f3f4',
                    borderRadius: '8px',
                    height: '12px',
                    overflow: 'hidden',
                    marginBottom: '12px'
                  }}>
                    <div
                      style={{
                        width: `${progress}%`,
                        height: '100%',
                        backgroundColor: isCompleted ? '#059669' : isOverdue ? '#dc2626' : goal.color,
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </div>

                  {/* Status Message */}
                  <div style={{ fontSize: '14px' }}>
                    {isCompleted && (
                      <span style={{ color: '#059669', fontWeight: 'bold' }}>
                        ✓ Goal completed!
                      </span>
                    )}
                    {!isCompleted && !isOverdue && (
                      <span style={{ color: '#6b7280' }}>
                        {goal.targetMinutes - goal.currentMinutes} minutes remaining
                      </span>
                    )}
                    {isOverdue && (
                      <span style={{ color: '#dc2626', fontWeight: 'bold' }}>
                        ⚠ Goal overdue by {Math.abs(daysRemaining)} days
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// Usage Example
export function TimeGoalsExample() {
  const [goals, setGoals] = useState<TimeGoal[]>([
    {
      id: '1',
      name: 'Complete React Course',
      targetMinutes: 600, // 10 hours
      currentMinutes: 420, // 7 hours
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      color: '#4f46e5'
    },
    {
      id: '2',
      name: 'Practice JavaScript',
      targetMinutes: 300, // 5 hours
      currentMinutes: 180, // 3 hours
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      color: '#059669'
    }
  ]);

  const handleGoalUpdate = (goalId: string, additionalMinutes: number) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, currentMinutes: goal.currentMinutes + additionalMinutes }
        : goal
    ));
  };

  return (
    <TimeGoalsTracker
      channelUsername="learning-channel"
      goals={goals}
      onGoalUpdate={handleGoalUpdate}
    />
  );
}
```

## Testing Examples

```tsx
// __tests__/ReactTimeTracker.test.tsx
import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import { ReactTimeTracker } from 'instincthub-react-ui';
import { useDispatch, useSelector } from 'react-redux';

// Mock dependencies
jest.mock('react-redux');
jest.mock('next/navigation');
jest.mock('../lib/helpFunction');

const mockDispatch = jest.fn();
const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;

describe('ReactTimeTracker', () => {
  const mockSession = {
    user: {
      name: {
        id: 'user123'
      }
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    mockUseSelector.mockReturnValue({ ip_address: '192.168.1.1' });
    global.fetch = jest.fn();
    
    // Mock document properties
    Object.defineProperty(document, 'visibilityState', {
      writable: true,
      value: 'visible'
    });
  });

  test('renders without visible output', () => {
    const { container } = render(
      <ReactTimeTracker
        channel_username="test-channel"
        session={mockSession as any}
        endpoint="/api/test-ip"
      />
    );
    
    expect(container.firstChild).toBeNull();
  });

  test('fetches IP address when not available', async () => {
    mockUseSelector.mockReturnValue({ ip_address: null });
    
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ ip_address: '192.168.1.100' })
    });

    render(
      <ReactTimeTracker
        channel_username="test-channel"
        session={mockSession as any}
        endpoint="/api/test-ip"
      />
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/test-ip');
    });
  });

  test('handles visibility change events', async () => {
    jest.useFakeTimers();
    
    render(
      <ReactTimeTracker
        channel_username="test-channel"
        session={mockSession as any}
        endpoint="/api/test-ip"
      />
    );

    // Simulate tab becoming hidden
    Object.defineProperty(document, 'visibilityState', {
      value: 'hidden'
    });
    
    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });

    // Fast forward time and make visible again
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    
    Object.defineProperty(document, 'visibilityState', {
      value: 'visible'
    });
    
    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });

    jest.useRealTimers();
  });

  test('sends time data to server', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ ip_address: '192.168.1.1' })
      })
      .mockResolvedValueOnce({
        status: 201,
        json: () => Promise.resolve({ success: true })
      });

    const { rerender } = render(
      <ReactTimeTracker
        channel_username="test-channel"
        session={mockSession as any}
        endpoint="/api/test-ip"
      />
    );

    // Simulate visibility change to trigger time sending
    Object.defineProperty(document, 'visibilityState', {
      value: 'hidden'
    });
    
    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });

    // Trigger re-render to activate effect
    rerender(
      <ReactTimeTracker
        channel_username="test-channel"
        session={mockSession as any}
        endpoint="/api/test-ip"
      />
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('history/test-channel/timespent/'),
        expect.objectContaining({
          method: 'POST'
        })
      );
    });
  });

  test('handles server errors gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(
      <ReactTimeTracker
        channel_username="test-channel"
        session={mockSession as any}
        endpoint="/api/test-ip"
      />
    );

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching IP address:',
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });

  test('does not send data without channel handle', async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    render(
      <ReactTimeTracker
        channel_username={null}
        session={mockSession as any}
        endpoint="/api/test-ip"
      />
    );

    // Trigger visibility change
    Object.defineProperty(document, 'visibilityState', {
      value: 'hidden'
    });
    
    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Cannot send time data: handle is undefined'
      );
    });

    consoleSpy.mockRestore();
  });
});
```

## Related Components

- [SessionHandleProvider](./SessionHandleProvider.md) - Session and channel management
- [SessionExpiresLogout](./SessionExpiresLogout.md) - Session expiration handling
- [ReactTimeAgo](./ReactTimeAgo.md) - Time display component
- [PageLoading](./PageLoading.md) - Loading state component
- [ErrorState](./ErrorState.md) - Error display component

## Notes

- Component renders nothing visually (returns null)
- Requires Redux store setup for IP address management
- Automatically handles cleanup on component unmount
- Sends time data in batches to optimize server requests
- Includes development mode logging for debugging
- Works with Next.js router parameters for channel detection
- Integrates with NextAuth.js session management
- Respects user privacy with configurable tracking endpoints

