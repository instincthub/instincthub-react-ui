"use client";

import React, { useState, useEffect } from "react";
import MainNavigation from "../../../../components/navbars/MainNavigation";
import { loadScript } from "../../../../../../components/lib/index";
import { CodeDisplay } from "@/components/ui";

export default function LoadScriptExamplePage() {
  const [chartLoaded, setChartLoaded] = useState(false);
  const [chartError, setChartError] = useState(false);
  const [chartRendered, setChartRendered] = useState(false);

  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState(false);

  const [customScriptLoaded, setCustomScriptLoaded] = useState(false);
  const [customScriptError, setCustomScriptError] = useState(false);

  // Load Chart.js and render a sample chart
  const handleLoadChart = () => {
    setChartLoaded(false);
    setChartError(false);
    setChartRendered(false);

    const script = loadScript("https://cdn.jsdelivr.net/npm/chart.js");

    if (script) {
      script.onload = () => {
        setChartLoaded(true);
        console.log("Chart.js loaded successfully");

        // Render a sample chart
        setTimeout(() => {
          const canvas = document.getElementById("myChart") as HTMLCanvasElement;
          if (canvas && window.Chart) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
              new window.Chart(ctx, {
                type: "bar",
                data: {
                  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                  datasets: [
                    {
                      label: "Sales",
                      data: [12, 19, 3, 5, 2, 3],
                      backgroundColor: "rgba(54, 162, 235, 0.5)",
                      borderColor: "rgba(54, 162, 235, 1)",
                      borderWidth: 1,
                    },
                  ],
                },
                options: {
                  responsive: true,
                  maintainAspectRatio: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                },
              });
              setChartRendered(true);
            }
          }
        }, 100);
      };

      script.onerror = () => {
        setChartError(true);
        console.error("Failed to load Chart.js");
      };
    } else {
      setChartError(true);
    }
  };

  // Load Google reCAPTCHA
  const handleLoadRecaptcha = () => {
    setRecaptchaLoaded(false);
    setRecaptchaError(false);

    const script = loadScript("https://www.google.com/recaptcha/api.js");

    if (script) {
      script.onload = () => {
        setRecaptchaLoaded(true);
        console.log("reCAPTCHA loaded successfully");
      };

      script.onerror = () => {
        setRecaptchaError(true);
        console.error("Failed to load reCAPTCHA");
      };
    } else {
      setRecaptchaError(true);
    }
  };

  // Demonstrate loading an invalid script (for error handling)
  const handleLoadInvalidScript = () => {
    setCustomScriptLoaded(false);
    setCustomScriptError(false);

    const script = loadScript("https://invalid-url-for-demo.com/script.js");

    if (script) {
      script.onload = () => {
        setCustomScriptLoaded(true);
      };

      script.onerror = () => {
        setCustomScriptError(true);
        console.error("Failed to load script (expected)");
      };
    } else {
      setCustomScriptError(true);
    }
  };

  // Demonstrate duplicate prevention
  const handleLoadDuplicate = () => {
    const script1 = loadScript("https://cdn.jsdelivr.net/npm/chart.js");
    const script2 = loadScript("https://cdn.jsdelivr.net/npm/chart.js");

    if (script1 === script2) {
      alert("Success! Both calls returned the same script element. Duplicate loading prevented.");
    }
  };

  return (
    <>
      <MainNavigation />
      <main className="ihub-container ihub-mt-10 ihub-mb-5">
        <div className="ihub-max-w-4xl ihub-mx-auto">
          <h1 className="ihub-text-3xl ihub-font-bold ihub-mb-6">
            loadScript Utility Examples
          </h1>

          <p className="ihub-text-gray-600 ihub-mb-8">
            The <code>loadScript</code> utility dynamically loads external
            JavaScript files with built-in duplicate prevention, error handling,
            and async loading.
          </p>

          {/* Interactive Demos */}
          <div className="ihub-mb-8">
            <h2 className="ihub-text-2xl ihub-font-bold ihub-mb-4">
              Interactive Demos
            </h2>

            <div className="ihub-grid ihub-grid-cols-1 md:ihub-grid-cols-2 ihub-gap-6">
              {/* Chart.js Demo */}
              <div className="ihub-border ihub-rounded-lg ihub-p-6 ihub-shadow-md">
                <h3 className="ihub-text-lg ihub-font-semibold ihub-mb-3">
                  1. Load Chart.js
                </h3>
                <p className="ihub-text-sm ihub-text-gray-600 ihub-mb-4">
                  Loads Chart.js library and renders a sample chart.
                </p>

                <button
                  onClick={handleLoadChart}
                  className="ihub-important-btn ihub-w-full ihub-mb-4"
                  disabled={chartLoaded}
                >
                  {chartLoaded ? "Chart.js Loaded ✓" : "Load Chart.js"}
                </button>

                {chartError && (
                  <div className="ihub-bg-red-100 ihub-text-red-700 ihub-p-2 ihub-rounded ihub-text-sm ihub-mb-3">
                    Failed to load Chart.js
                  </div>
                )}

                {chartLoaded && !chartRendered && (
                  <div className="ihub-bg-blue-100 ihub-text-blue-700 ihub-p-2 ihub-rounded ihub-text-sm ihub-mb-3">
                    Rendering chart...
                  </div>
                )}

                {chartRendered && (
                  <div className="ihub-bg-green-100 ihub-text-green-700 ihub-p-2 ihub-rounded ihub-text-sm ihub-mb-3">
                    Chart rendered successfully!
                  </div>
                )}

                <div className="ihub-bg-white ihub-p-4 ihub-rounded ihub-border">
                  <canvas id="myChart" width="400" height="200"></canvas>
                </div>
              </div>

              {/* reCAPTCHA Demo */}
              <div className="ihub-border ihub-rounded-lg ihub-p-6 ihub-shadow-md">
                <h3 className="ihub-text-lg ihub-font-semibold ihub-mb-3">
                  2. Load Google reCAPTCHA
                </h3>
                <p className="ihub-text-sm ihub-text-gray-600 ihub-mb-4">
                  Dynamically loads the Google reCAPTCHA API.
                </p>

                <button
                  onClick={handleLoadRecaptcha}
                  className="ihub-important-btn ihub-w-full ihub-mb-4"
                  disabled={recaptchaLoaded}
                >
                  {recaptchaLoaded ? "reCAPTCHA Loaded ✓" : "Load reCAPTCHA"}
                </button>

                {recaptchaError && (
                  <div className="ihub-bg-red-100 ihub-text-red-700 ihub-p-2 ihub-rounded ihub-text-sm">
                    Failed to load reCAPTCHA
                  </div>
                )}

                {recaptchaLoaded && (
                  <div className="ihub-bg-green-100 ihub-text-green-700 ihub-p-2 ihub-rounded ihub-text-sm">
                    reCAPTCHA API loaded successfully! Check the console for
                    confirmation.
                  </div>
                )}
              </div>

              {/* Error Handling Demo */}
              <div className="ihub-border ihub-rounded-lg ihub-p-6 ihub-shadow-md">
                <h3 className="ihub-text-lg ihub-font-semibold ihub-mb-3">
                  3. Error Handling
                </h3>
                <p className="ihub-text-sm ihub-text-gray-600 ihub-mb-4">
                  Demonstrates error handling with an invalid URL.
                </p>

                <button
                  onClick={handleLoadInvalidScript}
                  className="ihub-important-btn ihub-w-full ihub-mb-4"
                >
                  Load Invalid Script
                </button>

                {customScriptError && (
                  <div className="ihub-bg-red-100 ihub-text-red-700 ihub-p-2 ihub-rounded ihub-text-sm">
                    ✓ Error handled correctly! Check the console for error
                    message.
                  </div>
                )}

                {customScriptLoaded && (
                  <div className="ihub-bg-green-100 ihub-text-green-700 ihub-p-2 ihub-rounded ihub-text-sm">
                    Script loaded
                  </div>
                )}
              </div>

              {/* Duplicate Prevention Demo */}
              <div className="ihub-border ihub-rounded-lg ihub-p-6 ihub-shadow-md">
                <h3 className="ihub-text-lg ihub-font-semibold ihub-mb-3">
                  4. Duplicate Prevention
                </h3>
                <p className="ihub-text-sm ihub-text-gray-600 ihub-mb-4">
                  Calling loadScript twice with the same URL returns the same
                  element.
                </p>

                <button
                  onClick={handleLoadDuplicate}
                  className="ihub-important-btn ihub-w-full"
                >
                  Test Duplicate Prevention
                </button>
              </div>
            </div>
          </div>

          {/* Code Examples */}
          <div className="ihub-mt-10">
            <h2 className="ihub-text-2xl ihub-font-bold ihub-mb-4">
              Code Examples
            </h2>

            {/* Example 1: Basic Usage */}
            <div className="ihub-mb-6">
              <h3 className="ihub-text-lg ihub-font-semibold ihub-mb-2">
                1. Basic Usage
              </h3>
              <CodeDisplay
                code={`import { loadScript } from "@instincthub/react-ui";

// Load a script
const script = loadScript("https://cdn.jsdelivr.net/npm/chart.js");

if (script) {
  console.log("Script element created/found");

  script.onload = () => {
    console.log("Script loaded successfully");
    // Initialize your library here
  };

  script.onerror = () => {
    console.error("Failed to load script");
  };
} else {
  console.error("No script source provided");
}`}
                language="typescript"
                fileName="basic-usage.ts"
              />
            </div>

            {/* Example 2: With React useEffect */}
            <div className="ihub-mb-6">
              <h3 className="ihub-text-lg ihub-font-semibold ihub-mb-2">
                2. Using with React useEffect
              </h3>
              <CodeDisplay
                code={`import { useEffect, useState } from "react";
import { loadScript } from "@instincthub/react-ui";

function MyComponent() {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = loadScript("https://js.paystack.co/v1/inline.js");

    if (script) {
      script.onload = () => {
        setScriptLoaded(true);
        console.log("Paystack loaded");
      };
    }
  }, []); // Empty dependency array - load once on mount

  return (
    <div>
      {scriptLoaded ? (
        <button onClick={() => initializePaystack()}>
          Pay Now
        </button>
      ) : (
        <p>Loading payment gateway...</p>
      )}
    </div>
  );
}`}
                language="typescript"
                fileName="with-useEffect.tsx"
              />
            </div>

            {/* Example 3: Multiple Scripts */}
            <div className="ihub-mb-6">
              <h3 className="ihub-text-lg ihub-font-semibold ihub-mb-2">
                3. Loading Multiple Scripts
              </h3>
              <CodeDisplay
                code={`import { loadScript } from "@instincthub/react-ui";

const loadAnalytics = () => {
  // Load Google Analytics
  const ga = loadScript("https://www.googletagmanager.com/gtag/js?id=GA_ID");

  if (ga) {
    ga.onload = () => {
      // Initialize GA
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag("js", new Date());
      gtag("config", "GA_ID");
    };
  }

  // Load Facebook Pixel
  const fb = loadScript("https://connect.facebook.net/en_US/fbevents.js");

  if (fb) {
    fb.onload = () => {
      // Initialize FB Pixel
      window.fbq("init", "YOUR_PIXEL_ID");
      window.fbq("track", "PageView");
    };
  }
};`}
                language="typescript"
                fileName="multiple-scripts.ts"
              />
            </div>

            {/* Example 4: Error Handling Pattern */}
            <div className="ihub-mb-6">
              <h3 className="ihub-text-lg ihub-font-semibold ihub-mb-2">
                4. Comprehensive Error Handling
              </h3>
              <CodeDisplay
                code={`import { loadScript } from "@instincthub/react-ui";

const loadExternalLibrary = async (url: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const script = loadScript(url);

    if (!script) {
      reject(new Error("Failed to create script element"));
      return;
    }

    script.onload = () => {
      console.log(\`Successfully loaded: \${url}\`);
      resolve(true);
    };

    script.onerror = () => {
      console.error(\`Failed to load: \${url}\`);
      reject(new Error(\`Script load error: \${url}\`));
    };

    // Optional: Timeout handling
    setTimeout(() => {
      if (!script.complete) {
        reject(new Error("Script load timeout"));
      }
    }, 10000); // 10 second timeout
  });
};

// Usage
try {
  await loadExternalLibrary("https://cdn.example.com/library.js");
  // Proceed with library initialization
} catch (error) {
  console.error("Library loading failed:", error);
  // Show error message to user or use fallback
}`}
                language="typescript"
                fileName="error-handling.ts"
              />
            </div>

            {/* Example 5: Google Maps API */}
            <div className="ihub-mb-6">
              <h3 className="ihub-text-lg ihub-font-semibold ihub-mb-2">
                5. Real-World Example: Google Maps
              </h3>
              <CodeDisplay
                code={`import { loadScript } from "@instincthub/react-ui";

const initializeMap = (apiKey: string) => {
  const script = loadScript(
    \`https://maps.googleapis.com/maps/api/js?key=\${apiKey}&libraries=places\`
  );

  if (script) {
    script.onload = () => {
      // Create map instance
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: { lat: 6.5244, lng: 3.3792 }, // Lagos, Nigeria
          zoom: 12,
          mapTypeControl: false,
        }
      );

      // Add a marker
      new google.maps.Marker({
        position: { lat: 6.5244, lng: 3.3792 },
        map: map,
        title: "Lagos",
      });

      console.log("Map initialized successfully");
    };

    script.onerror = () => {
      console.error("Failed to load Google Maps API");
      // Show error message to user
      document.getElementById("map")!.innerHTML =
        '<p>Failed to load map. Please refresh the page.</p>';
    };
  }
};

// Usage
initializeMap(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);`}
                language="typescript"
                fileName="google-maps.ts"
              />
            </div>
          </div>

          {/* Features & Benefits */}
          <div className="ihub-mt-10 ihub-bg-blue-50 ihub-border ihub-border-blue-200 ihub-p-6 ihub-rounded">
            <h2 className="ihub-text-2xl ihub-font-bold ihub-mb-4">
              Key Features
            </h2>
            <ul className="ihub-space-y-3">
              <li className="ihub-flex ihub-items-start">
                <span className="ihub-text-blue-600 ihub-mr-2">✓</span>
                <div>
                  <strong>Duplicate Prevention:</strong> Automatically checks if
                  a script with the same URL already exists in the DOM
                </div>
              </li>
              <li className="ihub-flex ihub-items-start">
                <span className="ihub-text-blue-600 ihub-mr-2">✓</span>
                <div>
                  <strong>Async Loading:</strong> Scripts load asynchronously
                  without blocking page rendering
                </div>
              </li>
              <li className="ihub-flex ihub-items-start">
                <span className="ihub-text-blue-600 ihub-mr-2">✓</span>
                <div>
                  <strong>Error Handling:</strong> Built-in onerror callback for
                  failed script loads
                </div>
              </li>
              <li className="ihub-flex ihub-items-start">
                <span className="ihub-text-blue-600 ihub-mr-2">✓</span>
                <div>
                  <strong>Type Safety:</strong> Returns HTMLScriptElement or
                  false for easy type checking
                </div>
              </li>
              <li className="ihub-flex ihub-items-start">
                <span className="ihub-text-blue-600 ihub-mr-2">✓</span>
                <div>
                  <strong>Framework Agnostic:</strong> Works with React, Next.js,
                  or vanilla JavaScript
                </div>
              </li>
            </ul>
          </div>

          {/* Best Practices */}
          <div className="ihub-mt-10">
            <h2 className="ihub-text-2xl ihub-font-bold ihub-mb-4">
              Best Practices
            </h2>

            <div className="ihub-space-y-4">
              <div className="ihub-border-l-4 ihub-border-green-500 ihub-pl-4">
                <h3 className="ihub-font-semibold ihub-mb-1">
                  ✓ DO: Load scripts in useEffect
                </h3>
                <p className="ihub-text-sm ihub-text-gray-600">
                  Use React&apos;s useEffect hook to load scripts after component
                  mount, preventing SSR issues.
                </p>
              </div>

              <div className="ihub-border-l-4 ihub-border-green-500 ihub-pl-4">
                <h3 className="ihub-font-semibold ihub-mb-1">
                  ✓ DO: Handle both success and error cases
                </h3>
                <p className="ihub-text-sm ihub-text-gray-600">
                  Always implement both onload and onerror callbacks to handle
                  all scenarios.
                </p>
              </div>

              <div className="ihub-border-l-4 ihub-border-green-500 ihub-pl-4">
                <h3 className="ihub-font-semibold ihub-mb-1">
                  ✓ DO: Use state to track loading status
                </h3>
                <p className="ihub-text-sm ihub-text-gray-600">
                  Track script loading state to conditionally render components
                  or show loading indicators.
                </p>
              </div>

              <div className="ihub-border-l-4 ihub-border-red-500 ihub-pl-4">
                <h3 className="ihub-font-semibold ihub-mb-1">
                  ✗ DON&apos;T: Load scripts during SSR
                </h3>
                <p className="ihub-text-sm ihub-text-gray-600">
                  Avoid calling loadScript during server-side rendering. Use
                  useEffect or client-side only components.
                </p>
              </div>

              <div className="ihub-border-l-4 ihub-border-red-500 ihub-pl-4">
                <h3 className="ihub-font-semibold ihub-mb-1">
                  ✗ DON&apos;T: Forget to check the return value
                </h3>
                <p className="ihub-text-sm ihub-text-gray-600">
                  Always check if loadScript returns a script element before
                  setting callbacks.
                </p>
              </div>

              <div className="ihub-border-l-4 ihub-border-red-500 ihub-pl-4">
                <h3 className="ihub-font-semibold ihub-mb-1">
                  ✗ DON&apos;T: Block the main thread
                </h3>
                <p className="ihub-text-sm ihub-text-gray-600">
                  Don&apos;t use synchronous script loading methods. loadScript
                  uses async loading by default.
                </p>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="ihub-mt-10 ihub-mb-10">
            <h2 className="ihub-text-2xl ihub-font-bold ihub-mb-4">
              Common Use Cases
            </h2>

            <div className="ihub-grid ihub-grid-cols-1 md:ihub-grid-cols-2 ihub-gap-4">
              <div className="ihub-bg-gray-50 ihub-p-4 ihub-rounded">
                <h3 className="ihub-font-semibold ihub-mb-2">
                  Payment Gateways
                </h3>
                <p className="ihub-text-sm ihub-text-gray-600">
                  Paystack, Stripe, PayPal SDKs
                </p>
              </div>

              <div className="ihub-bg-gray-50 ihub-p-4 ihub-rounded">
                <h3 className="ihub-font-semibold ihub-mb-2">Analytics</h3>
                <p className="ihub-text-sm ihub-text-gray-600">
                  Google Analytics, Facebook Pixel, Mixpanel
                </p>
              </div>

              <div className="ihub-bg-gray-50 ihub-p-4 ihub-rounded">
                <h3 className="ihub-font-semibold ihub-mb-2">Maps</h3>
                <p className="ihub-text-sm ihub-text-gray-600">
                  Google Maps, Mapbox, Leaflet
                </p>
              </div>

              <div className="ihub-bg-gray-50 ihub-p-4 ihub-rounded">
                <h3 className="ihub-font-semibold ihub-mb-2">
                  Chat & Support
                </h3>
                <p className="ihub-text-sm ihub-text-gray-600">
                  Intercom, Zendesk, Drift
                </p>
              </div>

              <div className="ihub-bg-gray-50 ihub-p-4 ihub-rounded">
                <h3 className="ihub-font-semibold ihub-mb-2">
                  Charts & Visualization
                </h3>
                <p className="ihub-text-sm ihub-text-gray-600">
                  Chart.js, D3.js, Highcharts
                </p>
              </div>

              <div className="ihub-bg-gray-50 ihub-p-4 ihub-rounded">
                <h3 className="ihub-font-semibold ihub-mb-2">
                  Social Media
                </h3>
                <p className="ihub-text-sm ihub-text-gray-600">
                  Twitter widgets, Facebook SDK, LinkedIn
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// Declare global types for third-party libraries
declare global {
  interface Window {
    Chart: any;
    dataLayer: any[];
    fbq: (...args: any[]) => void;
  }
}
