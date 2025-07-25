# getCookie

**Category:** Library | **Type:** browser utility

Retrieve the value of a specific cookie from the browser's cookie storage.

**File Location:** `src/components/lib/helpFunction.ts`

## 🏷️ Tags

`browser`, `cookie`, `storage`, `client`, `utility`

## 📖 Usage Example

```tsx
"use client";

import React, { useState, useEffect } from "react";
import { getCookie } from "@instincthub/react-ui/lib";

/**
 * Example demonstrating getCookie function
 */
const CookieExample = () => {
  const [cookieName, setCookieName] = useState<string>("user_preference");
  const [cookieValue, setCookieValue] = useState<string>("");
  const [allCookies, setAllCookies] = useState<{ [key: string]: string }>({});

  // Mock some common cookies for demonstration
  const commonCookies = [
    "session_id",
    "auth_token", 
    "user_preference",
    "theme",
    "language",
    "cart_items"
  ];

  useEffect(() => {
    // Get all common cookies
    const cookies: { [key: string]: string } = {};
    commonCookies.forEach(name => {
      const value = getCookie(name);
      if (value) {
        cookies[name] = value;
      }
    });
    setAllCookies(cookies);
  }, []);

  const handleGetCookie = () => {
    const value = getCookie(cookieName);
    setCookieValue(value || "Cookie not found");
  };

  const handleSetDemoCookie = () => {
    // Set a demo cookie for testing
    document.cookie = `${cookieName}=demo_value_${Date.now()}; path=/; max-age=3600`;
    handleGetCookie();
  };

  return (
    <div className="ihub-container ihub-py-5">
      <h1>Get Cookie Example</h1>

      <section className="ihub-mb-5">
        <div className="ihub-card ihub-p-4">
          <h3>Cookie Retrieval Tool</h3>
          <div className="ihub-row ihub-mb-3">
            <div className="ihub-col-md-6">
              <label className="ihub-form-label">Cookie Name:</label>
              <input
                type="text"
                className="ihub-form-control"
                value={cookieName}
                onChange={(e) => setCookieName(e.target.value)}
                placeholder="Enter cookie name"
              />
            </div>
            <div className="ihub-col-md-6">
              <label className="ihub-form-label">Actions:</label>
              <div>
                <button 
                  className="ihub-btn ihub-btn-primary ihub-me-2"
                  onClick={handleGetCookie}
                >
                  Get Cookie
                </button>
                <button 
                  className="ihub-btn ihub-btn-secondary"
                  onClick={handleSetDemoCookie}
                >
                  Set Demo Cookie
                </button>
              </div>
            </div>
          </div>
          
          {cookieValue && (
            <div className={`ihub-alert ${cookieValue === "Cookie not found" ? 'ihub-alert-warning' : 'ihub-alert-success'}`}>
              <strong>Result:</strong> {cookieValue}
            </div>
          )}
        </div>
      </section>

      {/* Current Cookies */}
      <section className="ihub-mb-5">
        <h2>Current Cookies</h2>
        <div className="ihub-card ihub-p-4">
          {Object.keys(allCookies).length > 0 ? (
            <div className="ihub-table-responsive">
              <table className="ihub-table">
                <thead>
                  <tr>
                    <th>Cookie Name</th>
                    <th>Value</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(allCookies).map(([name, value]) => (
                    <tr key={name}>
                      <td><code>{name}</code></td>
                      <td className="text-truncate" style={{ maxWidth: "200px" }}>
                        {value}
                      </td>
                      <td>
                        <button 
                          className="ihub-btn ihub-btn-sm ihub-btn-outline-primary"
                          onClick={() => {
                            setCookieName(name);
                            setCookieValue(value);
                          }}
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="ihub-alert ihub-alert-info">
              No cookies found. Set some demo cookies to test the functionality.
            </div>
          )}
        </div>
      </section>

      {/* Common Use Cases */}
      <section className="ihub-mb-5">
        <h2>Common Use Cases</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-p-4">
              <h5>User Authentication</h5>
              <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "12px" }}>
{`// Check if user is logged in
const authToken = getCookie("auth_token");
if (authToken) {
  // User is authenticated
  authenticateUser(authToken);
} else {
  // Redirect to login
  router.push("/login");
}`}
              </pre>
            </div>
          </div>
          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-p-4">
              <h5>User Preferences</h5>
              <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "12px" }}>
{`// Get user theme preference
const theme = getCookie("theme") || "light";
setTheme(theme);

// Get language preference
const language = getCookie("language") || "en";
setLanguage(language);`}
              </pre>
            </div>
          </div>
          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-p-4">
              <h5>Shopping Cart</h5>
              <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "12px" }}>
{`// Restore shopping cart
const cartData = getCookie("cart_items");
if (cartData) {
  try {
    const cart = JSON.parse(cartData);
    setCartItems(cart);
  } catch (e) {
    console.error("Invalid cart data");
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Browser Support Info */}
      <section className="ihub-mb-5">
        <h2>Browser Support & Notes</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <h5>✅ Supported Features</h5>
              <ul>
                <li>All modern browsers</li>
                <li>Case-sensitive cookie names</li>
                <li>URL-decoded values</li>
                <li>HttpOnly cookies (server-side only)</li>
              </ul>
            </div>
            <div className="ihub-col-md-6">
              <h5>⚠️ Important Notes</h5>
              <ul>
                <li>Only works in browser environment</li>
                <li>Cannot access HttpOnly cookies</li>
                <li>Returns empty string if cookie not found</li>
                <li>Cookie values are automatically decoded</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookieExample;
```

## 🚀 Basic Usage

```tsx
import { getCookie } from '@instincthub/react-ui/lib';

// Basic usage
const authToken = getCookie("auth_token");
if (authToken) {
  console.log("User is authenticated");
}

// Common scenarios
const userTheme = getCookie("theme") || "light";
const language = getCookie("language") || "en";
const sessionId = getCookie("JSESSIONID");

// JSON data from cookies
const cartData = getCookie("cart_items");
if (cartData) {
  const cart = JSON.parse(cartData);
  setShoppingCart(cart);
}
```

## 🔧 Function Signature

```typescript
function getCookie(name: string): string
```

### Parameters

- **name** (string): The name of the cookie to retrieve

### Returns

- **string**: The cookie value, or empty string if cookie doesn't exist

## 💡 Use Cases

- **Authentication**: Check for auth tokens and session cookies
- **User Preferences**: Retrieve theme, language, and other user settings
- **Shopping Cart**: Restore cart contents from cookies
- **Analytics**: Read tracking and analytics cookies
- **Consent Management**: Check cookie consent preferences
- **Personalization**: Load user customization settings
- **Session Management**: Handle session state and timeouts

## 🔄 Cookie Lifecycle

```tsx
// Complete cookie management example
import { getCookie, setCookie, removeCookie } from '@instincthub/react-ui/lib';

// Set a cookie
setCookie("user_preference", "dark_mode", 30); // 30 days

// Get the cookie
const preference = getCookie("user_preference"); // "dark_mode"

// Update the cookie
setCookie("user_preference", "light_mode", 30);

// Remove the cookie
removeCookie("user_preference");
```

## 🛡️ Security Considerations

- **HttpOnly Cookies**: Cannot be accessed via JavaScript (server-side only)
- **Secure Cookies**: Only sent over HTTPS connections
- **SameSite Attribute**: Controls cross-site cookie behavior
- **Sensitive Data**: Never store sensitive information in cookies accessible to JavaScript

## ⚠️ Important Notes

- Only works in browser environment (not during SSR)
- Cookie names are case-sensitive
- Returns empty string for non-existent cookies
- Automatically URL-decodes cookie values
- Cannot access HttpOnly cookies set by the server

## 🔗 Related Functions

- `setCookie(name, value, days)` - Set cookie values
- `removeCookie(name)` - Delete cookies