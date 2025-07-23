"use client";

import React, { useState, useEffect } from "react";
import { ClientDetector, Badge } from "../../../../index";

const ClientDetectorExample: React.FC = () => {
  const [isClientLoaded, setIsClientLoaded] = useState(false);
  const [hydrationStatus, setHydrationStatus] = useState("initializing");
  const [showClientContent, setShowClientContent] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleClientDetection = (clientLoaded: boolean) => {
    setIsClientLoaded(clientLoaded);
    setHydrationStatus(clientLoaded ? "hydrated" : "server-side");
    console.log("Client detection:", clientLoaded ? "Client-side" : "Server-side");
  };

  const toggleClientContent = () => {
    setShowClientContent(!showClientContent);
  };

  const resetDemo = () => {
    setIsClientLoaded(false);
    setHydrationStatus("initializing");
    setShowClientContent(false);
    setResetKey(prev => prev + 1);
  };

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>ClientDetector Examples</h1>
        <p>
          A simple component that detects client-side hydration and prevents
          hydration mismatches in Next.js applications.
        </p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Client Detection */}
        <div className="ihub-example-card">
          <h3>Basic Client Detection</h3>
          <p>Detect when the component has hydrated on the client-side</p>

          <div className="ihub-demo-section">
            <ClientDetector key={resetKey} setIsClientLoaded={handleClientDetection} />
            
            <div className="ihub-status-display">
              <h4>Hydration Status:</h4>
              <Badge 
                variant={isClientLoaded ? "success" : "warning"}
              >
                {hydrationStatus}
              </Badge>
              
              <div className="ihub-status-details">
                <p><strong>Client Loaded:</strong> {isClientLoaded ? "Yes" : "No"}</p>
                <p><strong>Environment:</strong> {typeof window !== 'undefined' ? 'Browser' : 'Server'}</p>
              </div>
            </div>

            <button onClick={resetDemo} className="ihub-btn ihub-btn-outline">
              Reset Demo
            </button>
          </div>
        </div>

        {/* Conditional Rendering */}
        <div className="ihub-example-card">
          <h3>Conditional Rendering</h3>
          <p>Use ClientDetector to conditionally render client-only content</p>

          <div className="ihub-demo-section">
            <ClientDetector
              fallback={
                <div className="ihub-loading-placeholder">
                  <Badge variant="info">Loading client content...</Badge>
                </div>
              }
            >
              <div className="ihub-client-content">
                <Badge variant="success">✓ Client-side content loaded!</Badge>
                <p>This content only renders after hydration.</p>
                <p>Current time: {new Date().toLocaleTimeString()}</p>
                <p>Window width: {typeof window !== 'undefined' ? window.innerWidth : 'N/A'}px</p>
              </div>
            </ClientDetector>
          </div>
        </div>

        {/* Hydration Mismatch Prevention */}
        <div className="ihub-example-card">
          <h3>Preventing Hydration Mismatches</h3>
          <p>Use ClientDetector to prevent SSR/client content mismatches</p>

          <div className="ihub-demo-section">
            <div className="ihub-toggle-section">
              <button 
                onClick={toggleClientContent}
                className="ihub-btn ihub-btn-primary"
              >
                {showClientContent ? 'Hide' : 'Show'} Dynamic Content
              </button>
            </div>

            {showClientContent && (
              <ClientDetector
                fallback={
                  <div className="ihub-ssr-content">
                    <Badge variant="default">SSR Content</Badge>
                    <p>This is server-side rendered content</p>
                  </div>
                }
              >
                <div className="ihub-client-dynamic-content">
                  <Badge variant="primary">Dynamic Client Content</Badge>
                  <p>Random number: {Math.random().toFixed(4)}</p>
                  <p>User agent: {typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 50) + '...' : 'N/A'}</p>
                  <p>Local storage available: {typeof localStorage !== 'undefined' ? 'Yes' : 'No'}</p>
                </div>
              </ClientDetector>
            )}
          </div>
        </div>

        {/* Callback Example */}
        <div className="ihub-example-card">
          <h3>Using Callback Function</h3>
          <p>Handle client detection with custom callback logic</p>

          <div className="ihub-demo-section">
            <ClientDetector 
              setIsClientLoaded={(loaded) => {
                console.log('ClientDetector callback triggered:', loaded);
                if (loaded) {
                  // Custom logic when client is detected
                  console.log('Client-side initialization complete');
                }
              }}
            />
            
            <div className="ihub-callback-info">
              <Badge variant="info">Check console</Badge>
              <p>Open browser dev tools to see callback messages</p>
            </div>
          </div>
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>

        <div className="ihub-code-section">
          <h3>Basic Client Detection</h3>
          <pre>
            <code>{`import { ClientDetector } from '@instincthub/react-ui';
import { useState } from 'react';

const MyComponent = () => {
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  return (
    <div>
      <ClientDetector setIsClientLoaded={setIsClientLoaded} />
      <p>Client loaded: {isClientLoaded ? 'Yes' : 'No'}</p>
    </div>
  );
};`}</code>
          </pre>
        </div>

        <div className="ihub-code-section">
          <h3>Conditional Rendering</h3>
          <pre>
            <code>{`<ClientDetector
  fallback={<div>Loading...</div>}
>
  <div>
    <p>This only renders on the client!</p>
    <p>Window width: {window.innerWidth}px</p>
  </div>
</ClientDetector>`}</code>
          </pre>
        </div>

        <div className="ihub-code-section">
          <h3>Preventing Hydration Mismatches</h3>
          <pre>
            <code>{`// Prevent hydration errors with dynamic content
<ClientDetector
  fallback={<p>Static content for SSR</p>}
>
  <p>Dynamic content: {Math.random()}</p>
  <p>Current time: {new Date().toISOString()}</p>
</ClientDetector>`}</code>
          </pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Callback Handler</h3>
          <pre>
            <code>{`const handleClientLoaded = (isLoaded) => {
  if (isLoaded) {
    console.log('Client-side hydration complete');
    // Initialize client-only features
    initializeClientFeatures();
  }
};

<ClientDetector setIsClientLoaded={handleClientLoaded} />`}</code>
          </pre>
        </div>

        <div className="ihub-api-section">
          <h3>API Reference</h3>
          <div className="ihub-api-table">
            <table>
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>setIsClientLoaded</td>
                  <td>(boolean) =&gt; void</td>
                  <td>undefined</td>
                  <td>Callback function called when client is detected</td>
                </tr>
                <tr>
                  <td>children</td>
                  <td>React.ReactNode</td>
                  <td>undefined</td>
                  <td>Content to render only on client-side</td>
                </tr>
                <tr>
                  <td>fallback</td>
                  <td>React.ReactNode</td>
                  <td>null</td>
                  <td>Content to render while on server-side</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetectorExample;
