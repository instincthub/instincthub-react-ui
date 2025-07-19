# ClientOnly

**Category:** Auth | **Type:** component

SSR-safe wrapper component that only renders children on the client side, preventing hydration mismatches

**File Location:** `src/components/auth/ClientOnly.tsx`

## 🏷️ Tags

`auth`, `ssr`, `hydration`, `client-side`, `wrapper`, `conditional-rendering`

```tsx
"use client";
import React, { useState } from "react";
import { ClientOnly } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive examples demonstrating ClientOnly usage
 * Shows SSR-safe rendering, hydration prevention, and client-specific components
 */
const ClientOnlyExamples = () => {
  const [showClientFeatures, setShowClientFeatures] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const handleShowFeatures = () => {
    setShowClientFeatures(true);
    openToast("Client-side features activated");
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>ClientOnly Examples</h1>
      <p className="ihub-mb-4">
        SSR-safe wrapper component that only renders children on the client side,
        preventing hydration mismatches and ensuring proper client-specific functionality.
      </p>

      {/* Basic Client-Only Rendering */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Basic Client-Only Content</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Client-Specific Information</h3>
            <p className="ihub-text-muted">Content that only appears after hydration</p>
          </div>
          
          <div className="ihub-card-body">
            <p>This content is always visible (SSR safe):</p>
            <div className="ihub-server-content">
              <p>✅ Server-rendered content</p>
              <p>✅ Available immediately</p>
            </div>
            
            <ClientOnly>
              <div className="ihub-client-content">
                <h4>🌐 Client-Only Content</h4>
                <p>Current URL: {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
                <p>User Agent: {typeof navigator !== 'undefined' ? navigator.userAgent.substring(0, 50) + '...' : 'N/A'}</p>
                <p>Screen Resolution: {typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : 'N/A'}</p>
                <p>Viewport: {typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'N/A'}</p>
              </div>
            </ClientOnly>
          </div>
        </div>
      </section>

      {/* Interactive Client Components */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Interactive Client Components</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Client-Side Interactivity</h3>
            <p className="ihub-text-muted">Components that require browser APIs</p>
          </div>
          
          <div className="ihub-card-body">
            <ClientOnly fallback={<div className="ihub-loading">Loading interactive features...</div>}>
              <div className="ihub-client-features">
                <div className="ihub-feature-item">
                  <h5>📍 Geolocation</h5>
                  <button
                    className="ihub-outlined-btn"
                    onClick={() => {
                      if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
                        navigator.geolocation.getCurrentPosition(
                          (position) => {
                            openToast(`Location: ${position.coords.latitude}, ${position.coords.longitude}`);
                          },
                          () => openToast("Location access denied", 400)
                        );
                      }
                    }}
                  >
                    Get Location
                  </button>
                </div>
                
                <div className="ihub-feature-item">
                  <h5>💾 Local Storage</h5>
                  <button
                    className="ihub-outlined-btn"
                    onClick={() => {
                      if (typeof localStorage !== 'undefined') {
                        const data = { timestamp: new Date().toISOString(), user: 'demo' };
                        localStorage.setItem('ihub-demo', JSON.stringify(data));
                        openToast("Data saved to localStorage");
                      }
                    }}
                  >
                    Save to Storage
                  </button>
                  <button
                    className="ihub-outlined-btn ihub-ms-2"
                    onClick={() => {
                      if (typeof localStorage !== 'undefined') {
                        const data = localStorage.getItem('ihub-demo');
                        openToast(data ? `Retrieved: ${data}` : "No data found");
                      }
                    }}
                  >
                    Load from Storage
                  </button>
                </div>
                
                <div className="ihub-feature-item">
                  <h5>🔔 Notifications</h5>
                  <button
                    className="ihub-outlined-btn"
                    onClick={() => {
                      if (typeof window !== 'undefined' && 'Notification' in window) {
                        Notification.requestPermission().then(permission => {
                          if (permission === 'granted') {
                            new Notification('Hello from InstinctHub!', {
                              body: 'This is a client-side notification',
                              icon: '/favicon.ico'
                            });
                          }
                        });
                      }
                    }}
                  >
                    Request Notifications
                  </button>
                </div>
              </div>
            </ClientOnly>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Implementation Guide</h2>
        <div className="ihub-card ihub-p-4">
          <h3>Props Interface:</h3>
          <pre className="ihub-code-block">
{`interface ClientOnlyProps {
  children: React.ReactNode;            // Content to render on client
  fallback?: React.ReactNode;           // Loading fallback (optional)
  onError?: (error: Error) => void;     // Error handler
  className?: string;                   // CSS classes
}`}</pre>
          
          <h3 className="ihub-mt-3">Key Features:</h3>
          <ul>
            <li><strong>SSR Safe:</strong> Prevents hydration mismatches between server and client</li>
            <li><strong>Error Handling:</strong> Built-in error boundary for client-side failures</li>
            <li><strong>Fallback Support:</strong> Show loading states while client content loads</li>
            <li><strong>Browser API Access:</strong> Safe access to window, navigator, and DOM APIs</li>
            <li><strong>Conditional Rendering:</strong> Render content only when needed on client</li>
          </ul>
          
          <h3 className="ihub-mt-3">Best Practices:</h3>
          <ul>
            <li>Use for components that require browser APIs (localStorage, geolocation, etc.)</li>
            <li>Provide meaningful fallback content for better UX</li>
            <li>Keep client-only content minimal for better performance</li>
            <li>Handle errors gracefully with onError callback</li>
            <li>Test both server and client rendering scenarios</li>
            <li>Avoid wrapping large component trees unnecessarily</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ClientOnlyExamples;
```

## 🔗 Related Components

- [ClientDetector](./ClientDetector.md) - Client device detection component
- [useClientSide](./useClientSide.md) - Client-side detection hook
- [SessionHandleProvider](./SessionHandleProvider.md) - Session management provider
- [DarkModeProvider](./DarkModeProvider.md) - Theme provider component
