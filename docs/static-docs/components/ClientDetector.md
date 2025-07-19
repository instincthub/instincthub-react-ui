# ClientDetector

**Category:** Auth | **Type:** component

Advanced client device detection component for identifying browser, OS, device type, and client capabilities

**File Location:** `src/components/auth/ClientDetector.tsx`

## 🏷️ Tags

`auth`, `device-detection`, `browser`, `os`, `client-info`, `responsive`

```tsx
"use client";
import React, { useState, useEffect } from "react";
import { ClientDetector } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive examples demonstrating ClientDetector usage
 * Shows device detection, browser info, and responsive behavior
 */
const ClientDetectorExamples = () => {
  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  const [capabilities, setCapabilities] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleDeviceDetected = (info: any) => {
    setDeviceInfo(info);
    openToast(`Detected ${info.deviceType} - ${info.browser.name}`);
  };

  const handleCapabilitiesDetected = (caps: any) => {
    setCapabilities(caps);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>ClientDetector Examples</h1>
      <p className="ihub-mb-4">
        Advanced client device detection component for identifying browser,
        OS, device type, and client capabilities for enhanced user experience.
      </p>

      {/* Basic Device Detection */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Basic Device Detection</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Current Device Information</h3>
          </div>
          
          <div className="ihub-card-body">
            <ClientDetector
              onDeviceDetected={handleDeviceDetected}
              detectBrowser={true}
              detectOS={true}
              detectDevice={true}
              className="ihub-client-detector"
            />
            
            {deviceInfo && (
              <div className="ihub-device-info">
                <div className="ihub-info-grid">
                  <div className="ihub-info-item">
                    <span className="ihub-info-label">Device Type:</span>
                    <span className="ihub-info-value">{deviceInfo.deviceType}</span>
                  </div>
                  <div className="ihub-info-item">
                    <span className="ihub-info-label">Browser:</span>
                    <span className="ihub-info-value">
                      {deviceInfo.browser.name} v{deviceInfo.browser.version}
                    </span>
                  </div>
                  <div className="ihub-info-item">
                    <span className="ihub-info-label">Operating System:</span>
                    <span className="ihub-info-value">
                      {deviceInfo.os.name} {deviceInfo.os.version}
                    </span>
                  </div>
                  <div className="ihub-info-item">
                    <span className="ihub-info-label">Screen Resolution:</span>
                    <span className="ihub-info-value">
                      {deviceInfo.screen.width}x{deviceInfo.screen.height}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Device-Specific Rendering */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Device-Specific Content</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Adaptive UI Based on Device</h3>
          </div>
          
          <div className="ihub-card-body">
            <ClientDetector>
              {({ deviceType, isMobile, isTablet, isDesktop }) => (
                <div className="ihub-adaptive-content">
                  {isMobile && (
                    <div className="ihub-mobile-ui">
                      <h4>📱 Mobile Experience</h4>
                      <p>Optimized for touch interactions and smaller screens</p>
                      <button className="ihub-primary-btn ihub-btn-block">
                        Mobile-Optimized Button
                      </button>
                    </div>
                  )}
                  
                  {isTablet && (
                    <div className="ihub-tablet-ui">
                      <h4>📱 Tablet Experience</h4>
                      <p>Balanced layout for medium-sized touchscreens</p>
                      <div className="ihub-tablet-grid">
                        <button className="ihub-outlined-btn">Option 1</button>
                        <button className="ihub-outlined-btn">Option 2</button>
                      </div>
                    </div>
                  )}
                  
                  {isDesktop && (
                    <div className="ihub-desktop-ui">
                      <h4>🖥️ Desktop Experience</h4>
                      <p>Full-featured interface with hover states and keyboard shortcuts</p>
                      <div className="ihub-desktop-toolbar">
                        <button className="ihub-outlined-btn ihub-btn-sm">File</button>
                        <button className="ihub-outlined-btn ihub-btn-sm">Edit</button>
                        <button className="ihub-outlined-btn ihub-btn-sm">View</button>
                        <button className="ihub-outlined-btn ihub-btn-sm">Tools</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ClientDetector>
          </div>
        </div>
      </section>

      {/* Browser Capabilities */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Browser Capabilities Detection</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Feature Support</h3>
          </div>
          
          <div className="ihub-card-body">
            <ClientDetector
              detectCapabilities={true}
              onCapabilitiesDetected={handleCapabilitiesDetected}
              capabilities={[
                'webgl',
                'webrtc',
                'websocket',
                'serviceWorker',
                'localStorage',
                'geolocation',
                'notifications',
                'bluetooth'
              ]}
            >
              {({ capabilities: caps }) => (
                <div className="ihub-capabilities-grid">
                  {caps && Object.entries(caps).map(([feature, supported]) => (
                    <div key={feature} className="ihub-capability-item">
                      <div className={`ihub-capability-status ${supported ? 'supported' : 'unsupported'}`}>
                        {supported ? '✅' : '❌'}
                      </div>
                      <div className="ihub-capability-name">{feature}</div>
                    </div>
                  ))}
                </div>
              )}
            </ClientDetector>
          </div>
        </div>
      </section>

      {/* Advanced Detection with Actions */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Advanced Detection & Actions</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Conditional Features Based on Detection</h3>
          </div>
          
          <div className="ihub-card-body">
            <ClientDetector
              detectAll={true}
              onUnsupportedBrowser={(info) => {
                openToast(`Please update your ${info.browser.name} browser`, 400);
              }}
              onMobileDetected={() => {
                openToast("Mobile device detected - showing mobile menu");
              }}
              minBrowserVersions={{
                chrome: 80,
                firefox: 75,
                safari: 13,
                edge: 80
              }}
            >
              {({ isSupported, isTouchDevice, orientation, colorDepth }) => (
                <div className="ihub-advanced-info">
                  <div className="ihub-feature-grid">
                    <div className="ihub-feature">
                      <h5>Browser Support</h5>
                      <p className={isSupported ? 'ihub-text-success' : 'ihub-text-danger'}>
                        {isSupported ? 'Your browser is fully supported' : 'Please update your browser'}
                      </p>
                    </div>
                    
                    <div className="ihub-feature">
                      <h5>Touch Support</h5>
                      <p>{isTouchDevice ? 'Touch gestures enabled' : 'Mouse/keyboard input'}</p>
                    </div>
                    
                    <div className="ihub-feature">
                      <h5>Orientation</h5>
                      <p>{orientation || 'landscape'}</p>
                    </div>
                    
                    <div className="ihub-feature">
                      <h5>Color Depth</h5>
                      <p>{colorDepth || 24} bit</p>
                    </div>
                  </div>
                  
                  <button
                    className="ihub-primary-btn ihub-mt-3"
                    onClick={() => setShowDetails(!showDetails)}
                  >
                    {showDetails ? 'Hide' : 'Show'} Full Details
                  </button>
                </div>
              )}
            </ClientDetector>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Implementation Guide</h2>
        <div className="ihub-card ihub-p-4">
          <h3>Props Interface:</h3>
          <pre className="ihub-code-block">
{`interface ClientDetectorProps {
  children?: (info: ClientInfo) => React.ReactNode;
  detectBrowser?: boolean;              // Detect browser info
  detectOS?: boolean;                   // Detect operating system
  detectDevice?: boolean;               // Detect device type
  detectCapabilities?: boolean;         // Detect browser capabilities
  detectAll?: boolean;                  // Detect everything
  capabilities?: string[];              // Specific capabilities to check
  minBrowserVersions?: {               // Minimum supported versions
    [browser: string]: number;
  };
  onDeviceDetected?: (info: DeviceInfo) => void;
  onCapabilitiesDetected?: (capabilities: any) => void;
  onMobileDetected?: () => void;
  onTabletDetected?: () => void;
  onDesktopDetected?: () => void;
  onUnsupportedBrowser?: (info: any) => void;
  className?: string;
}`}</pre>
        </div>
      </section>
    </div>
  );
};

export default ClientDetectorExamples;
```

## 🔗 Related Components

- [ClientOnly](./ClientOnly.md) - Client-only rendering wrapper
- [useClientSide](./useClientSide.md) - Client-side detection hook
- [ResponsiveNavbar](./ResponsiveNavbar.md) - Responsive navigation component
- [DarkModeProvider](./DarkModeProvider.md) - Theme provider with device preference detection


