# useClientSide

**Category:** Auth | **Type:** hook

Hook for safely handling client-side initialization and preventing hydration mismatches

**File Location:** `src/components/auth/useClientSide.ts`

## 🏷️ Tags

`auth`, `hook`, `ssr`, `hydration`, `client-side`

```tsx
"use client";
import React, { useState, useEffect } from "react";
import { useClientSide } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive examples demonstrating useClientSide hook usage
 * Shows different client-side detection patterns and SSR-safe implementations
 */
const UseClientSideExamples = () => {
  const isClient = useClientSide();
  const [clientData, setClientData] = useState<any>(null);
  const [theme, setTheme] = useState<string>("light");
  const [mounted, setMounted] = useState(false);

  // Simulate client-side only data
  useEffect(() => {
    if (isClient) {
      setClientData({
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
        screenResolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        localStorage: typeof localStorage !== 'undefined',
        sessionStorage: typeof sessionStorage !== 'undefined',
      });
      setMounted(true);
    }
  }, [isClient]);

  // Handle theme from localStorage safely
  useEffect(() => {
    if (isClient) {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setTheme(savedTheme);
    }
  }, [isClient]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    if (isClient) {
      localStorage.setItem('theme', newTheme);
      openToast(`Theme changed to ${newTheme}`);
    }
  };

  const handleClientAction = () => {
    if (!isClient) {
      openToast("This action requires client-side initialization", 400);
      return;
    }
    
    openToast("Client-side action executed successfully!");
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>useClientSide Hook Examples</h1>
      <p className="ihub-mb-4">
        Hook for safely handling client-side initialization and preventing
        hydration mismatches in SSR applications.
      </p>

      {/* Basic Client Detection */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Basic Client Detection</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Client State</h3>
            <p className="ihub-text-muted">Check if component is running on client-side</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-client-status">
              <div className="ihub-status-item">
                <span className="ihub-status-label">Client-side initialized:</span>
                <span className={`ihub-status-value ${isClient ? 'positive' : 'negative'}`}>
                  {isClient ? '✓ Yes' : '✗ No'}
                </span>
              </div>
              
              <div className="ihub-status-item">
                <span className="ihub-status-label">Component mounted:</span>
                <span className={`ihub-status-value ${mounted ? 'positive' : 'negative'}`}>
                  {mounted ? '✓ Yes' : '✗ No'}
                </span>
              </div>
              
              <div className="ihub-status-item">
                <span className="ihub-status-label">Environment:</span>
                <span className="ihub-status-value">
                  {isClient ? 'Client (Browser)' : 'Server (SSR)'}
                </span>
              </div>
            </div>
            
            <div className="ihub-client-actions ihub-mt-3">
              <button
                className="ihub-primary-btn"
                onClick={handleClientAction}
                disabled={!isClient}
              >
                {isClient ? 'Execute Client Action' : 'Waiting for Client...'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Browser Information */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Browser Information (Client-Only)</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Client Environment Data</h3>
            <p className="ihub-text-muted">Information only available on the client-side</p>
          </div>
          
          <div className="ihub-card-body">
            {isClient && clientData ? (
              <div className="ihub-browser-info">
                <div className="ihub-info-grid">
                  <div className="ihub-info-item">
                    <span className="ihub-info-label">User Agent:</span>
                    <span className="ihub-info-value">{clientData.userAgent}</span>
                  </div>
                  
                  <div className="ihub-info-item">
                    <span className="ihub-info-label">Language:</span>
                    <span className="ihub-info-value">{clientData.language}</span>
                  </div>
                  
                  <div className="ihub-info-item">
                    <span className="ihub-info-label">Platform:</span>
                    <span className="ihub-info-value">{clientData.platform}</span>
                  </div>
                  
                  <div className="ihub-info-item">
                    <span className="ihub-info-label">Cookies Enabled:</span>
                    <span className="ihub-info-value">
                      {clientData.cookieEnabled ? 'Yes' : 'No'}
                    </span>
                  </div>
                  
                  <div className="ihub-info-item">
                    <span className="ihub-info-label">Online Status:</span>
                    <span className="ihub-info-value">
                      {clientData.onLine ? 'Online' : 'Offline'}
                    </span>
                  </div>
                  
                  <div className="ihub-info-item">
                    <span className="ihub-info-label">Screen Resolution:</span>
                    <span className="ihub-info-value">{clientData.screenResolution}</span>
                  </div>
                  
                  <div className="ihub-info-item">
                    <span className="ihub-info-label">Timezone:</span>
                    <span className="ihub-info-value">{clientData.timezone}</span>
                  </div>
                  
                  <div className="ihub-info-item">
                    <span className="ihub-info-label">LocalStorage:</span>
                    <span className="ihub-info-value">
                      {clientData.localStorage ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                  
                  <div className="ihub-info-item">
                    <span className="ihub-info-label">SessionStorage:</span>
                    <span className="ihub-info-value">
                      {clientData.sessionStorage ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="ihub-loading-state">
                <div className="ihub-loading-message">
                  {isClient ? 'Loading browser information...' : 'Browser information not available during SSR'}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Safe localStorage Usage */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Safe localStorage Usage</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Theme Preference</h3>
            <p className="ihub-text-muted">Using localStorage safely with SSR</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-theme-selector">
              <div className="ihub-current-theme ihub-mb-3">
                <span className="ihub-theme-label">Current Theme:</span>
                <span className={`ihub-theme-value theme-${theme}`}>
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </span>
              </div>
              
              <div className="ihub-theme-options">
                <button
                  className={`ihub-theme-btn ${theme === 'light' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('light')}
                  disabled={!isClient}
                >
                  ☀️ Light
                </button>
                <button
                  className={`ihub-theme-btn ${theme === 'dark' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('dark')}
                  disabled={!isClient}
                >
                  🌙 Dark
                </button>
                <button
                  className={`ihub-theme-btn ${theme === 'auto' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('auto')}
                  disabled={!isClient}
                >
                  🔄 Auto
                </button>
              </div>
              
              {!isClient && (
                <div className="ihub-ssr-notice ihub-mt-3">
                  <small>Theme selection will be enabled after client initialization</small>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Conditional Rendering */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Conditional Rendering</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Client-Only Content</h3>
              </div>
              <div className="ihub-card-body">
                {isClient ? (
                  <div className="ihub-client-content">
                    <div className="ihub-feature">
                      <h5>🌐 Geolocation API</h5>
                      <p>Available for location-based features</p>
                      <button 
                        className="ihub-outlined-btn ihub-btn-sm"
                        onClick={() => {
                          if (navigator.geolocation) {
                            openToast("Geolocation is available!");
                          } else {
                            openToast("Geolocation not supported", 400);
                          }
                        }}
                      >
                        Check Geolocation
                      </button>
                    </div>
                    
                    <div className="ihub-feature">
                      <h5>📷 Camera API</h5>
                      <p>Access to device camera</p>
                      <button 
                        className="ihub-outlined-btn ihub-btn-sm"
                        onClick={() => {
                          if (navigator.mediaDevices) {
                            openToast("Camera API is available!");
                          } else {
                            openToast("Camera API not supported", 400);
                          }
                        }}
                      >
                        Check Camera
                      </button>
                    </div>
                    
                    <div className="ihub-feature">
                      <h5>🔔 Notifications</h5>
                      <p>Browser notification support</p>
                      <button 
                        className="ihub-outlined-btn ihub-btn-sm"
                        onClick={() => {
                          if ('Notification' in window) {
                            openToast("Notifications are supported!");
                          } else {
                            openToast("Notifications not supported", 400);
                          }
                        }}
                      >
                        Check Notifications
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="ihub-ssr-placeholder">
                    <div className="ihub-placeholder-box">
                      <span>Client-only content loading...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Universal Content</h3>
              </div>
              <div className="ihub-card-body">
                <div className="ihub-universal-content">
                  <div className="ihub-content-item">
                    <h5>📝 Static Content</h5>
                    <p>This content is available during both SSR and client-side rendering.</p>
                  </div>
                  
                  <div className="ihub-content-item">
                    <h5>🎨 Styled Components</h5>
                    <p>CSS styles are applied consistently across server and client.</p>
                  </div>
                  
                  <div className="ihub-content-item">
                    <h5>📊 Data Display</h5>
                    <p>Static data can be shown immediately without waiting for client.</p>
                    <div className="ihub-data-preview">
                      <div className="ihub-metric">
                        <span className="ihub-metric-value">1,234</span>
                        <span className="ihub-metric-label">Users</span>
                      </div>
                      <div className="ihub-metric">
                        <span className="ihub-metric-value">56</span>
                        <span className="ihub-metric-label">Posts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Best Practices Example</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>User Preferences Component</h3>
            <p className="ihub-text-muted">Proper implementation of client-side dependent features</p>
          </div>
          
          <div className="ihub-card-body">
            <UserPreferencesExample isClient={isClient} />
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Implementation Guide</h2>
        <div className="ihub-card ihub-p-4">
          <h3>Hook Interface:</h3>
          <pre className="ihub-code-block">
{`function useClientSide(): boolean;

// Returns true when:
// - Component is mounted on client-side
// - Window object is available
// - All client-side APIs are accessible

// Returns false when:
// - Running during SSR
// - Component not yet hydrated
// - Server-side rendering phase`}
          </pre>
          
          <h3 className="ihub-mt-3">Usage Patterns:</h3>
          <pre className="ihub-code-block">
{`// Safe localStorage access
const isClient = useClientSide();
const [theme, setTheme] = useState('light');

useEffect(() => {
  if (isClient) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
  }
}, [isClient]);

// Conditional rendering
return (
  <div>
    {isClient ? (
      <ClientOnlyComponent />
    ) : (
      <div>Loading...</div>
    )}
  </div>
);

// Safe API access
const handleClientAction = () => {
  if (!isClient) return;
  
  // Safe to use browser APIs here
  navigator.geolocation.getCurrentPosition(callback);
};`}
          </pre>
          
          <h3 className="ihub-mt-3">Key Features:</h3>
          <ul>
            <li><strong>SSR Safety:</strong> Prevents hydration mismatches</li>
            <li><strong>Browser API Access:</strong> Safe access to window, localStorage, etc.</li>
            <li><strong>Conditional Rendering:</strong> Show different content for server/client</li>
            <li><strong>Performance:</strong> Lightweight with no dependencies</li>
            <li><strong>Reliability:</strong> Consistent behavior across frameworks</li>
          </ul>
          
          <h3 className="ihub-mt-3">Best Practices:</h3>
          <ul>
            <li>Always check isClient before accessing browser APIs</li>
            <li>Provide loading states for client-only content</li>
            <li>Use fallbacks for server-side rendering</li>
            <li>Avoid layout shifts between server and client content</li>
            <li>Consider using Suspense for complex client-only features</li>
            <li>Test both SSR and client-side rendering scenarios</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

// Example component showing best practices
const UserPreferencesExample: React.FC<{ isClient: boolean }> = ({ isClient }) => {
  const [preferences, setPreferences] = useState({
    notifications: false,
    darkMode: false,
    language: 'en',
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isClient) {
      // Load preferences from localStorage
      const savedPrefs = localStorage.getItem('userPreferences');
      if (savedPrefs) {
        try {
          setPreferences(JSON.parse(savedPrefs));
        } catch (error) {
          console.warn('Failed to parse saved preferences');
        }
      }
      setIsLoaded(true);
    }
  }, [isClient]);

  const updatePreference = (key: string, value: any) => {
    if (!isClient) return;
    
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
    openToast(`${key} preference updated`);
  };

  if (!isClient) {
    return (
      <div className="ihub-preferences-skeleton">
        <div className="ihub-skeleton-item"></div>
        <div className="ihub-skeleton-item"></div>
        <div className="ihub-skeleton-item"></div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="ihub-preferences-loading">
        <span>Loading preferences...</span>
      </div>
    );
  }

  return (
    <div className="ihub-preferences">
      <div className="ihub-preference-item">
        <label className="ihub-checkbox-label">
          <input
            type="checkbox"
            checked={preferences.notifications}
            onChange={(e) => updatePreference('notifications', e.target.checked)}
          />
          Enable notifications
        </label>
      </div>
      
      <div className="ihub-preference-item">
        <label className="ihub-checkbox-label">
          <input
            type="checkbox"
            checked={preferences.darkMode}
            onChange={(e) => updatePreference('darkMode', e.target.checked)}
          />
          Dark mode
        </label>
      </div>
      
      <div className="ihub-preference-item">
        <label className="ihub-form-label">
          Language:
          <select
            className="ihub-select"
            value={preferences.language}
            onChange={(e) => updatePreference('language', e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default UseClientSideExamples;
```

## 🔗 Related Components

- [IsUsernameEmailTaken](./IsUsernameEmailTaken.md) - Username/email availability checker
- [ClientDetector](./ClientDetector.md) - Client device detection component
- [PasswordsMatch](./PasswordsMatch.md) - Password matching validation component
- [FromInstinctHub](./FromInstinctHub.md) - From InstinctHub component
- [LoginForm](./LoginForm.md) - Login form component

