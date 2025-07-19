# useExternalData

**Category:** Auth | **Type:** hook

React hook for safely fetching and managing external data with SSR compatibility, caching, and error handling

**File Location:** `src/components/auth/useExternalData.ts`

## 🏷️ Tags

`auth`, `hook`, `external-data`, `ssr`, `caching`, `api`

```tsx
"use client";
import React, { useState, useEffect } from "react";
import { useExternalData } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive examples demonstrating useExternalData usage
 * Shows different data fetching patterns, caching strategies, and error handling
 */
const UseExternalDataExamples = () => {
  const [selectedUserId, setSelectedUserId] = useState<number>(1);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [cacheEnabled, setCacheEnabled] = useState<boolean>(true);

  // Basic external data fetching
  const {
    data: userData,
    loading: userLoading,
    error: userError,
    refetch: refetchUser
  } = useExternalData({
    url: `https://jsonplaceholder.typicode.com/users/${selectedUserId}`,
    key: `user-${selectedUserId}`,
    dependencies: [selectedUserId],
    cache: cacheEnabled,
    cacheTime: 5 * 60 * 1000, // 5 minutes
    onSuccess: (data) => openToast(`User ${data.name} loaded successfully`),
    onError: (error) => openToast(`Failed to load user: ${error.message}`, 400)
  });

  // Posts data with pagination
  const {
    data: postsData,
    loading: postsLoading,
    error: postsError,
    refetch: refetchPosts
  } = useExternalData({
    url: `https://jsonplaceholder.typicode.com/posts?userId=${selectedUserId}&_limit=5`,
    key: `posts-${selectedUserId}`,
    dependencies: [selectedUserId, refreshTrigger],
    cache: true,
    initialData: [],
    transform: (data) => data.map((post: any) => ({
      ...post,
      excerpt: post.body.substring(0, 100) + '...',
      readTime: Math.ceil(post.body.length / 200) + ' min read'
    }))
  });

  // Real-time data (no cache)
  const {
    data: statsData,
    loading: statsLoading,
    error: statsError
  } = useExternalData({
    url: 'https://api.github.com/repos/facebook/react',
    key: 'react-stats',
    cache: false,
    poll: 30000, // Poll every 30 seconds
    transform: (data) => ({
      stars: data.stargazers_count,
      forks: data.forks_count,
      issues: data.open_issues_count,
      language: data.language,
      lastUpdated: new Date(data.updated_at).toLocaleDateString()
    })
  });

  // Weather data with location
  const {
    data: weatherData,
    loading: weatherLoading,
    error: weatherError,
    refetch: refetchWeather
  } = useExternalData({
    url: 'https://api.openweathermap.org/data/2.5/weather',
    key: 'weather-london',
    queryParams: {
      q: 'London',
      appid: 'demo_key',
      units: 'metric'
    },
    cache: true,
    cacheTime: 10 * 60 * 1000, // 10 minutes
    fallbackData: {
      name: 'London',
      main: { temp: 20, humidity: 60 },
      weather: [{ main: 'Clear', description: 'clear sky' }]
    },
    onError: () => {
      // Use fallback data for demo
      return {
        name: 'London',
        main: { temp: 20, humidity: 60 },
        weather: [{ main: 'Clear', description: 'clear sky' }]
      };
    }
  });

  // Multiple data sources
  const {
    data: combinedData,
    loading: combinedLoading,
    error: combinedError
  } = useExternalData({
    urls: [
      'https://jsonplaceholder.typicode.com/posts/1',
      'https://jsonplaceholder.typicode.com/users/1',
      'https://jsonplaceholder.typicode.com/comments?postId=1'
    ],
    key: 'combined-data',
    cache: true,
    transform: ([post, user, comments]) => ({
      post: { ...post, author: user.name },
      commentsCount: comments.length,
      engagement: (comments.length / 10) * 100 // Mock engagement score
    })
  });

  const handleUserChange = (userId: number) => {
    setSelectedUserId(userId);
    openToast(`Switched to user ${userId}`);
  };

  const handleRefreshAll = () => {
    setRefreshTrigger(prev => prev + 1);
    refetchUser();
    refetchPosts();
    refetchWeather();
    openToast("Refreshing all data...");
  };

  const toggleCache = () => {
    setCacheEnabled(!cacheEnabled);
    openToast(`Cache ${!cacheEnabled ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>useExternalData Examples</h1>
      <p className="ihub-mb-4">
        React hook for safely fetching and managing external data with SSR compatibility,
        intelligent caching, error handling, and real-time updates.
      </p>

      {/* Data Controls */}
      <section className="ihub-mb-5">
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Data Controls</h3>
          </div>
          <div className="ihub-card-body">
            <div className="ihub-data-controls">
              <div className="ihub-control-group">
                <label className="ihub-form-label">Selected User:</label>
                <div className="ihub-button-group">
                  {[1, 2, 3, 4, 5].map((userId) => (
                    <button
                      key={userId}
                      className={`ihub-outlined-btn ihub-btn-sm ${selectedUserId === userId ? 'active' : ''}`}
                      onClick={() => handleUserChange(userId)}
                    >
                      User {userId}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="ihub-control-group">
                <button
                  className="ihub-primary-btn"
                  onClick={handleRefreshAll}
                >
                  Refresh All Data
                </button>
                <button
                  className={`ihub-outlined-btn ${cacheEnabled ? 'active' : ''}`}
                  onClick={toggleCache}
                >
                  {cacheEnabled ? 'Cache Enabled' : 'Cache Disabled'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Data */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Basic External Data</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>User Information</h3>
            <p className="ihub-text-muted">Basic data fetching with caching and error handling</p>
          </div>
          
          <div className="ihub-card-body">
            {userLoading ? (
              <div className="ihub-loading-state">
                <div className="ihub-spinner"></div>
                <span>Loading user data...</span>
              </div>
            ) : userError ? (
              <div className="ihub-error-state">
                <div className="ihub-error-icon">⚠️</div>
                <div className="ihub-error-content">
                  <h4>Failed to load user data</h4>
                  <p>{userError.message}</p>
                  <button className="ihub-primary-btn" onClick={refetchUser}>
                    Retry
                  </button>
                </div>
              </div>
            ) : userData ? (
              <div className="ihub-user-card">
                <div className="ihub-user-avatar">
                  <span className="ihub-avatar-text">
                    {userData.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="ihub-user-info">
                  <h4>{userData.name}</h4>
                  <p className="ihub-user-email">{userData.email}</p>
                  <div className="ihub-user-details">
                    <div className="ihub-detail-item">
                      <span className="ihub-detail-label">Username:</span>
                      <span className="ihub-detail-value">{userData.username}</span>
                    </div>
                    <div className="ihub-detail-item">
                      <span className="ihub-detail-label">Website:</span>
                      <span className="ihub-detail-value">{userData.website}</span>
                    </div>
                    <div className="ihub-detail-item">
                      <span className="ihub-detail-label">Company:</span>
                      <span className="ihub-detail-value">{userData.company?.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Posts Data */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Transformed Data</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>User Posts</h3>
            <p className="ihub-text-muted">Data fetching with transformation and initial data</p>
          </div>
          
          <div className="ihub-card-body">
            {postsLoading ? (
              <div className="ihub-skeleton-posts">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="ihub-skeleton-post">
                    <div className="ihub-skeleton-title"></div>
                    <div className="ihub-skeleton-content"></div>
                  </div>
                ))}
              </div>
            ) : postsError ? (
              <div className="ihub-error-message">
                Failed to load posts: {postsError.message}
              </div>
            ) : (
              <div className="ihub-posts-list">
                {postsData?.map((post: any) => (
                  <div key={post.id} className="ihub-post-card">
                    <h4 className="ihub-post-title">{post.title}</h4>
                    <p className="ihub-post-excerpt">{post.excerpt}</p>
                    <div className="ihub-post-meta">
                      <span className="ihub-post-readtime">{post.readTime}</span>
                      <span className="ihub-post-id">Post #{post.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Real-time Data */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Real-time Data (Polling)</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>React Repository Stats</h3>
                <p className="ihub-text-muted">Live data with polling (no cache)</p>
              </div>
              
              <div className="ihub-card-body">
                {statsLoading ? (
                  <div className="ihub-loading-stats">Loading stats...</div>
                ) : statsError ? (
                  <div className="ihub-error-stats">Failed to load stats</div>
                ) : statsData ? (
                  <div className="ihub-stats-grid">
                    <div className="ihub-stat-item">
                      <div className="ihub-stat-value">⭐ {statsData.stars?.toLocaleString()}</div>
                      <div className="ihub-stat-label">Stars</div>
                    </div>
                    <div className="ihub-stat-item">
                      <div className="ihub-stat-value">🍴 {statsData.forks?.toLocaleString()}</div>
                      <div className="ihub-stat-label">Forks</div>
                    </div>
                    <div className="ihub-stat-item">
                      <div className="ihub-stat-value">🐛 {statsData.issues}</div>
                      <div className="ihub-stat-label">Issues</div>
                    </div>
                    <div className="ihub-stat-item">
                      <div className="ihub-stat-value">📅 {statsData.lastUpdated}</div>
                      <div className="ihub-stat-label">Last Updated</div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Weather Data</h3>
                <p className="ihub-text-muted">Data with fallback and query parameters</p>
              </div>
              
              <div className="ihub-card-body">
                {weatherLoading ? (
                  <div className="ihub-loading-weather">Loading weather...</div>
                ) : (
                  <div className="ihub-weather-display">
                    <div className="ihub-weather-location">
                      <h4>{weatherData?.name}</h4>
                    </div>
                    <div className="ihub-weather-main">
                      <div className="ihub-temperature">
                        {Math.round(weatherData?.main?.temp || 20)}°C
                      </div>
                      <div className="ihub-weather-desc">
                        {weatherData?.weather?.[0]?.description || 'clear sky'}
                      </div>
                    </div>
                    <div className="ihub-weather-details">
                      <div className="ihub-weather-item">
                        <span>Humidity: {weatherData?.main?.humidity || 60}%</span>
                      </div>
                    </div>
                    <button
                      className="ihub-outlined-btn ihub-btn-sm ihub-mt-2"
                      onClick={refetchWeather}
                    >
                      Refresh Weather
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multiple Data Sources */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Multiple Data Sources</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Combined Data</h3>
            <p className="ihub-text-muted">Fetching from multiple endpoints simultaneously</p>
          </div>
          
          <div className="ihub-card-body">
            {combinedLoading ? (
              <div className="ihub-loading-combined">
                <div className="ihub-spinner"></div>
                <span>Loading combined data...</span>
              </div>
            ) : combinedError ? (
              <div className="ihub-error-combined">
                Failed to load combined data
              </div>
            ) : combinedData ? (
              <div className="ihub-combined-display">
                <div className="ihub-combined-post">
                  <h4>{combinedData.post?.title}</h4>
                  <p className="ihub-post-author">By: {combinedData.post?.author}</p>
                  <p>{combinedData.post?.body}</p>
                </div>
                <div className="ihub-combined-stats">
                  <div className="ihub-combined-stat">
                    <span className="ihub-stat-value">{combinedData.commentsCount}</span>
                    <span className="ihub-stat-label">Comments</span>
                  </div>
                  <div className="ihub-combined-stat">
                    <span className="ihub-stat-value">{combinedData.engagement}%</span>
                    <span className="ihub-stat-label">Engagement</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Implementation Guide</h2>
        <div className="ihub-card ihub-p-4">
          <h3>Hook Interface:</h3>
          <pre className="ihub-code-block">
{`function useExternalData<T>(options: {
  url?: string;                         // Single URL to fetch
  urls?: string[];                      // Multiple URLs to fetch
  key: string;                          // Unique cache key
  dependencies?: any[];                 // Dependencies that trigger refetch
  cache?: boolean;                      // Enable caching (default: true)
  cacheTime?: number;                   // Cache duration in milliseconds
  poll?: number;                        // Polling interval in milliseconds
  initialData?: T;                      // Initial data before fetch
  fallbackData?: T;                     // Fallback data on error
  queryParams?: Record<string, any>;    // Query parameters
  headers?: Record<string, string>;     // Request headers
  transform?: (data: any) => T;         // Data transformation function
  onSuccess?: (data: T) => void;        // Success callback
  onError?: (error: Error) => T | void; // Error callback
}): {
  data: T | null;                       // Fetched data
  loading: boolean;                     // Loading state
  error: Error | null;                  // Error state
  refetch: () => Promise<void>;         // Manual refetch function
};`}</pre>
          
          <h3 className="ihub-mt-3">Key Features:</h3>
          <ul>
            <li><strong>SSR Safe:</strong> Prevents hydration mismatches with server-side rendering</li>
            <li><strong>Intelligent Caching:</strong> Automatic caching with configurable expiration</li>
            <li><strong>Real-time Updates:</strong> Polling support for live data</li>
            <li><strong>Error Handling:</strong> Built-in error states with fallback data</li>
            <li><strong>Data Transformation:</strong> Transform data before state updates</li>
            <li><strong>Multiple Sources:</strong> Fetch from multiple endpoints simultaneously</li>
          </ul>
          
          <h3 className="ihub-mt-3">Best Practices:</h3>
          <ul>
            <li>Use unique and descriptive cache keys for different data types</li>
            <li>Implement proper error handling and fallback data</li>
            <li>Use appropriate cache times based on data volatility</li>
            <li>Transform data to match your component's needs</li>
            <li>Consider performance impact of polling intervals</li>
            <li>Provide loading and error states for better UX</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default UseExternalDataExamples;
```

## 🔗 Related Components

- [useClientSide](./useClientSide.md) - Client-side detection hook
- [IsUsernameEmailTaken](./IsUsernameEmailTaken.md) - Username/email availability checker
- [ReactClientProviders](./ReactClientProviders.md) - Client provider components
- [HandleError](./HandleError.md) - Error handling component
- [PageLoading](./PageLoading.md) - Loading state component

