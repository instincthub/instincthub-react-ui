# loadScript

**Category:** Library | **Type:** utility

A utility function that dynamically loads external JavaScript files into the DOM. Perfect for loading third-party scripts, analytics tools, payment gateways, and other external libraries on demand.

## 📁 File Location

`src/components/lib/loadScript.ts`

## 🏷️ Tags

`script`, `dynamic`, `load`, `external`, `dom`, `async`, `third-party`

## 📖 Usage Examples

### Example 1: Complete Dynamic Script Loading Demo

```tsx
"use client";

import React, { useState, useEffect } from "react";
import { loadScript } from "@instincthub/react-ui/lib";

/**
 * Comprehensive example demonstrating loadScript utility for various scenarios
 */
const LoadScriptExamples = () => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [loadedScripts, setLoadedScripts] = useState<Record<string, boolean>>({});
  const [scriptResults, setScriptResults] = useState<Record<string, any>>({});

  // Common third-party scripts for demonstration
  const scripts = [
    {
      name: "Google Analytics",
      src: "https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID",
      description: "Load Google Analytics tracking script",
      category: "Analytics"
    },
    {
      name: "jQuery CDN",
      src: "https://code.jquery.com/jquery-3.6.0.min.js",
      description: "Load jQuery library from CDN",
      category: "Library"
    },
    {
      name: "Stripe.js",
      src: "https://js.stripe.com/v3/",
      description: "Load Stripe payment processing library",
      category: "Payment"
    },
    {
      name: "Chart.js",
      src: "https://cdn.jsdelivr.net/npm/chart.js",
      description: "Load Chart.js library for data visualization",
      category: "Visualization"
    },
    {
      name: "Moment.js",
      src: "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js",
      description: "Load Moment.js for date manipulation",
      category: "Utility"
    }
  ];

  const handleLoadScript = async (scriptName: string, scriptSrc: string) => {
    setLoadingStates(prev => ({ ...prev, [scriptName]: true }));

    try {
      const scriptElement = loadScript(scriptSrc);
      
      if (scriptElement) {
        // Wait for script to load
        await new Promise((resolve, reject) => {
          if (scriptElement === false) {
            reject(new Error("Failed to create script element"));
            return;
          }

          scriptElement.onload = () => {
            console.log(`Script loaded: ${scriptName}`);
            resolve(scriptElement);
          };

          scriptElement.onerror = () => {
            reject(new Error(`Failed to load script: ${scriptName}`));
          };

          // If script is already loaded
          if (scriptElement.readyState === 'complete') {
            resolve(scriptElement);
          }
        });

        setLoadedScripts(prev => ({ ...prev, [scriptName]: true }));
        setScriptResults(prev => ({ 
          ...prev, 
          [scriptName]: { 
            success: true, 
            element: scriptElement,
            src: scriptSrc 
          } 
        }));
      }
    } catch (error) {
      console.error(`Error loading ${scriptName}:`, error);
      setScriptResults(prev => ({ 
        ...prev, 
        [scriptName]: { 
          success: false, 
          error: error.message 
        } 
      }));
    } finally {
      setLoadingStates(prev => ({ ...prev, [scriptName]: false }));
    }
  };

  const checkGlobalVariable = (varName: string) => {
    return typeof window !== 'undefined' && window[varName] !== undefined;
  };

  return (
    <div className="ihub-container ihub-py-5">
      <h1>loadScript Utility Examples</h1>

      {/* Script Loading Demo */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Dynamic Script Loading</h2>
        <div className="ihub-row">
          {scripts.map((script, index) => (
            <div key={index} className="ihub-col-md-6 ihub-mb-3">
              <div className="ihub-card ihub-p-4">
                <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-start ihub-mb-3">
                  <div>
                    <h6 className="ihub-card-title">{script.name}</h6>
                    <small className="ihub-badge ihub-badge-light">{script.category}</small>
                  </div>
                  <button
                    className={`ihub-btn ihub-btn-sm ${loadedScripts[script.name] ? 'ihub-btn-success' : 'ihub-btn-primary'}`}
                    onClick={() => handleLoadScript(script.name, script.src)}
                    disabled={loadingStates[script.name]}
                  >
                    {loadingStates[script.name] ? (
                      <>
                        <span className="spinner-border spinner-border-sm ihub-me-1"></span>
                        Loading...
                      </>
                    ) : loadedScripts[script.name] ? (
                      'Loaded ✓'
                    ) : (
                      'Load Script'
                    )}
                  </button>
                </div>
                <p className="ihub-card-text text-muted" style={{ fontSize: "13px" }}>
                  {script.description}
                </p>
                
                {scriptResults[script.name] && (
                  <div className={`ihub-alert ${scriptResults[script.name].success ? 'ihub-alert-success' : 'ihub-alert-danger'}`}>
                    {scriptResults[script.name].success ? (
                      <>
                        <strong>✓ Successfully loaded!</strong><br />
                        <small>Script element created and added to DOM</small>
                      </>
                    ) : (
                      <>
                        <strong>✗ Failed to load</strong><br />
                        <small>{scriptResults[script.name].error}</small>
                      </>
                    )}
                  </div>
                )}

                <div className="ihub-mt-2">
                  <code style={{ fontSize: "11px", wordBreak: "break-all" }}>
                    {script.src}
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Global Variable Check */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Global Variable Detection</h2>
        <div className="ihub-card ihub-p-4">
          <p className="text-muted ihub-mb-3">
            Check if loaded scripts have exposed their global variables:
          </p>
          <div className="ihub-row">
            {[
              { var: 'jQuery', lib: 'jQuery CDN' },
              { var: '$', lib: 'jQuery CDN' },
              { var: 'Stripe', lib: 'Stripe.js' },
              { var: 'Chart', lib: 'Chart.js' },
              { var: 'moment', lib: 'Moment.js' },
              { var: 'gtag', lib: 'Google Analytics' }
            ].map((item, index) => (
              <div key={index} className="ihub-col-md-4 ihub-mb-2">
                <div className={`ihub-badge ${checkGlobalVariable(item.var) ? 'ihub-badge-success' : 'ihub-badge-light'} ihub-w-100`}>
                  {item.var}: {checkGlobalVariable(item.var) ? '✓ Available' : '✗ Not loaded'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real-world Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Real-world Implementation Examples</h2>
        
        {/* Payment Gateway Example */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-credit-card ihub-me-2"></i>
              Payment Gateway Integration
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Load Stripe.js dynamically when user initiates payment
const initializePayment = async () => {
  try {
    const scriptElement = loadScript('https://js.stripe.com/v3/');
    
    if (scriptElement) {
      await new Promise((resolve) => {
        scriptElement.onload = resolve;
      });
      
      // Initialize Stripe after script loads
      const stripe = Stripe('pk_test_your_key_here');
      const elements = stripe.elements();
      
      // Create payment form
      const cardElement = elements.create('card');
      cardElement.mount('#card-element');
    }
  } catch (error) {
    console.error('Failed to load Stripe:', error);
  }
};`}
            </pre>
          </div>
        </div>

        {/* Analytics Example */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-chart-line ihub-me-2"></i>
              Analytics Script Loading
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Load Google Analytics with user consent
const initializeAnalytics = async (trackingId: string) => {
  const scriptSrc = \`https://www.googletagmanager.com/gtag/js?id=\${trackingId}\`;
  const scriptElement = loadScript(scriptSrc);
  
  if (scriptElement) {
    await new Promise((resolve) => {
      scriptElement.onload = resolve;
    });
    
    // Configure Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag(...args) {
      window.dataLayer.push(args);
    }
    
    gtag('js', new Date());
    gtag('config', trackingId);
  }
};`}
            </pre>
          </div>
        </div>

        {/* Chart Library Example */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-chart-bar ihub-me-2"></i>
              Chart Library Loading
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Load Chart.js only when needed for dashboard
const loadChartLibrary = async () => {
  const scriptElement = loadScript('https://cdn.jsdelivr.net/npm/chart.js');
  
  if (scriptElement) {
    await new Promise((resolve) => {
      scriptElement.onload = resolve;
    });
    
    // Create chart after library loads
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [{
          label: 'Sales',
          data: [12, 19, 3],
          backgroundColor: ['red', 'blue', 'green']
        }]
      }
    });
  }
};`}
            </pre>
          </div>
        </div>
      </section>

      {/* Error Handling */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Error Handling Best Practices</h2>
        <div className="ihub-card ihub-p-4">
          <h6>Robust Script Loading Function</h6>
          <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`const safeLoadScript = async (src: string, timeout: number = 10000): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    // Check if script already exists
    const existingScript = document.querySelector(\`script[src="\${src}"]\`);
    if (existingScript) {
      resolve(true);
      return;
    }

    const scriptElement = loadScript(src);
    if (!scriptElement) {
      reject(new Error('Failed to create script element'));
      return;
    }

    // Set up timeout
    const timeoutId = setTimeout(() => {
      reject(new Error(\`Script load timeout: \${src}\`));
    }, timeout);

    scriptElement.onload = () => {
      clearTimeout(timeoutId);
      resolve(true);
    };

    scriptElement.onerror = () => {
      clearTimeout(timeoutId);
      reject(new Error(\`Failed to load script: \${src}\`));
    };
  });
};`}
          </pre>
        </div>
      </section>

      {/* Current DOM Scripts */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Current DOM Scripts</h2>
        <div className="ihub-card ihub-p-4">
          <p className="text-muted ihub-mb-3">Scripts currently loaded in the DOM:</p>
          <div style={{ maxHeight: "200px", overflow: "auto" }}>
            {Array.from(document.scripts).map((script, index) => (
              <div key={index} className="ihub-mb-2 ihub-p-2 ihub-bg-light ihub-rounded">
                <small style={{ wordBreak: "break-all" }}>
                  {script.src || script.innerHTML.substring(0, 50) + '...'}
                </small>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoadScriptExamples;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { loadScript } from '@instincthub/react-ui/lib';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { loadScript } from '@instincthub/react-ui/lib';

function PaymentComponent() {
  const initializeStripe = async () => {
    const scriptElement = loadScript('https://js.stripe.com/v3/');
    
    if (scriptElement) {
      // Wait for script to load
      scriptElement.onload = () => {
        // Initialize Stripe
        const stripe = window.Stripe('your-public-key');
        console.log('Stripe loaded:', stripe);
      };
    }
  };

  return (
    <button onClick={initializeStripe}>
      Load Payment Gateway
    </button>
  );
}
```

## 🔧 Function Signature

```tsx
loadScript(scriptSrc: string): HTMLScriptElement | false
```

### Parameters

- `scriptSrc` (string): URL of the external JavaScript file to load

### Returns

- `HTMLScriptElement`: The created or existing script element
- `false`: If no source URL is provided

## 📝 Key Features

- **Duplicate Prevention**: Checks if script already exists before creating new one
- **Async Loading**: Scripts are loaded asynchronously by default
- **Error Handling**: Built-in error logging for failed script loads
- **DOM Management**: Automatically appends script to document body
- **Return Value**: Returns the script element for further manipulation

## 💡 Use Cases

- **Payment Gateways**: Load Stripe, PayPal, or other payment processors
- **Analytics**: Dynamically load Google Analytics, Facebook Pixel
- **Third-party Libraries**: Load Chart.js, jQuery, Moment.js on demand
- **Social Media**: Load Facebook SDK, Twitter widgets
- **Maps**: Load Google Maps API when needed
- **A/B Testing**: Load testing scripts conditionally
- **Performance**: Lazy load non-critical scripts
- **User Consent**: Load tracking scripts after user approval

## ⚡ Performance Benefits

- **Reduced Initial Bundle**: Keep main bundle smaller
- **Lazy Loading**: Load scripts only when needed
- **Conditional Loading**: Load based on user actions or features
- **Caching**: Browser caches external scripts
- **Parallel Loading**: Multiple scripts can load simultaneously

## ⚠️ Important Considerations

- **CORS**: Ensure external scripts support cross-origin loading
- **Security**: Only load scripts from trusted sources
- **Error Handling**: Always handle script loading failures
- **Timeouts**: Consider implementing loading timeouts
- **CSP**: Content Security Policy may block external scripts

## 🔗 Related Utilities

- [elementIsVisibleInViewport](./elementIsVisibleInViewport.md) - Check element visibility
- [helpFunction](./helpFunction.md) - General utility functions collection
- [createSubscription](./createSubscription.md) - Subscription management utilities