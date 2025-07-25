# Authentication Actions

**Category:** Library | **Type:** authentication utilities

Client-side authentication action utilities for NextAuth integration. Provides secure login, signup, and logout functions with proper callback URL handling and browser-safe operations for React applications.

## 📁 File Location

`src/components/lib/auth/actions.ts`

## 🏷️ Tags

`authentication`, `nextauth`, `login`, `logout`, `signup`, `client-side`, `navigation`, `security`

## 📖 Usage Examples

### Example 1: Complete Authentication System

```tsx
"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import {
  login,
  signup,
  logout
} from "@instincthub/react-ui/lib";

/**
 * Complete authentication management system
 */
const AuthenticationManager = () => {
  const { data: session, status } = useSession();
  const [authState, setAuthState] = useState<string>("checking");

  React.useEffect(() => {
    setAuthState(status);
  }, [status]);

  // Handle login action
  const handleLogin = async () => {
    try {
      await login();
      // User will be redirected to login page
    } catch (error) {
      console.error("Login redirect failed:", error);
    }
  };

  // Handle signup action
  const handleSignup = async () => {
    try {
      await signup();
      // User will be redirected to signup page
    } catch (error) {
      console.error("Signup redirect failed:", error);
    }
  };

  // Handle logout action
  const handleLogout = async () => {
    try {
      await logout();
      // User will be signed out and page reloaded
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="ihub-container ihub-py-5">
      <h1>Authentication Management</h1>
      
      {/* Authentication Status */}
      <section className="ihub-mb-4">
        <div className={`ihub-alert ${
          authState === "loading" ? "ihub-alert-info" :
          authState === "authenticated" ? "ihub-alert-success" :
          authState === "unauthenticated" ? "ihub-alert-warning" :
          "ihub-alert-secondary"
        }`}>
          <strong>Authentication Status:</strong> {
            authState === "loading" ? "Checking session..." :
            authState === "authenticated" ? "User is authenticated" :
            authState === "unauthenticated" ? "User is not authenticated" :
            "Session status unknown"
          }
        </div>
      </section>

      {/* User Information (if authenticated) */}
      {session?.user && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">User Profile</h2>
          <div className="ihub-card ihub-p-4">
            <div className="ihub-d-flex ihub-align-items-center ihub-mb-3">
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt="Profile"
                  className="ihub-rounded-circle ihub-me-3"
                  style={{ width: "60px", height: "60px" }}
                />
              )}
              <div>
                <h5 className="ihub-mb-1">{session.user.name || "User"}</h5>
                <div className="text-muted">{session.user.email}</div>
                {session.user.role && (
                  <span className="ihub-badge ihub-badge-primary ihub-mt-1">
                    {session.user.role}
                  </span>
                )}
              </div>
            </div>
            
            {/* Session Details */}
            <div className="ihub-row ihub-text-sm">
              <div className="ihub-col-md-6">
                <strong>User ID:</strong> {session.user.id || "N/A"}
              </div>
              <div className="ihub-col-md-6">
                <strong>Session Expires:</strong><br />
                <small>{new Date(session.expires).toLocaleString()}</small>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Authentication Actions */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Authentication Actions</h2>
        <div className="ihub-row">
          
          {/* Login Card */}
          <div className="ihub-col-md-4 ihub-mb-3">
            <div className="ihub-card ihub-h-100">
              <div className="ihub-card-body ihub-p-4 ihub-text-center">
                <i className="pi pi-sign-in" style={{ fontSize: "48px", color: "#007bff" }}></i>
                <h5 className="ihub-card-title ihub-mt-3">Login</h5>
                <p className="ihub-card-text">
                  Redirect to login page with current URL as callback
                </p>
                <button
                  className="ihub-btn ihub-btn-primary"
                  onClick={handleLogin}
                  disabled={authState === "authenticated"}
                >
                  Go to Login
                </button>
                <div className="ihub-mt-2">
                  <small className="text-muted">
                    Current URL will be preserved
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Signup Card */}
          <div className="ihub-col-md-4 ihub-mb-3">
            <div className="ihub-card ihub-h-100">
              <div className="ihub-card-body ihub-p-4 ihub-text-center">
                <i className="pi pi-user-plus" style={{ fontSize: "48px", color: "#28a745" }}></i>
                <h5 className="ihub-card-title ihub-mt-3">Sign Up</h5>
                <p className="ihub-card-text">
                  Redirect to signup page with current URL as callback
                </p>
                <button
                  className="ihub-btn ihub-btn-success"
                  onClick={handleSignup}
                  disabled={authState === "authenticated"}
                >
                  Go to Sign Up
                </button>
                <div className="ihub-mt-2">
                  <small className="text-muted">
                    Create new account
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Logout Card */}
          <div className="ihub-col-md-4 ihub-mb-3">
            <div className="ihub-card ihub-h-100">
              <div className="ihub-card-body ihub-p-4 ihub-text-center">
                <i className="pi pi-sign-out" style={{ fontSize: "48px", color: "#dc3545" }}></i>
                <h5 className="ihub-card-title ihub-mt-3">Logout</h5>
                <p className="ihub-card-text">
                  Sign out user and reload the current page
                </p>
                <button
                  className="ihub-btn ihub-btn-danger"
                  onClick={handleLogout}
                  disabled={authState !== "authenticated"}
                >
                  Sign Out
                </button>
                <div className="ihub-mt-2">
                  <small className="text-muted">
                    Page will reload after logout
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current URL Display */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Callback URL Information</h2>
        <div className="ihub-card ihub-p-4">
          <h6>Current Page URL</h6>
          <div className="ihub-bg-light ihub-p-3 ihub-rounded">
            <code>{typeof window !== "undefined" ? window.location.href : "Server-side rendering"}</code>
          </div>
          <div className="ihub-mt-3">
            <small className="text-muted">
              This URL will be used as the callback after authentication. 
              Users will be redirected back to this page after login/signup.
            </small>
          </div>
        </div>
      </section>

      {/* Implementation Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Implementation Examples</h2>
        
        {/* Basic Usage */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-code ihub-me-2"></i>
              Basic Authentication Handlers
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Basic usage in components
import { login, signup, logout } from '@instincthub/react-ui/lib';

const AuthButtons = () => {
  return (
    <div>
      <button onClick={login}>Login</button>
      <button onClick={signup}>Sign Up</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

// With error handling
const SecureAuthButtons = () => {
  const handleAuth = async (authFunction: () => Promise<void>, action: string) => {
    try {
      await authFunction();
    } catch (error) {
      console.error(\`\${action} failed:\`, error);
      // Handle error appropriately
    }
  };

  return (
    <div>
      <button onClick={() => handleAuth(login, 'Login')}>
        Login
      </button>
      <button onClick={() => handleAuth(signup, 'Signup')}>
        Sign Up
      </button>
      <button onClick={() => handleAuth(logout, 'Logout')}>
        Logout
      </button>
    </div>
  );
};`}
            </pre>
          </div>
        </div>

        {/* Advanced Usage */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-cog ihub-me-2"></i>
              Advanced Integration with Session Management
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Advanced usage with session handling
import { useSession } from 'next-auth/react';
import { login, signup, logout } from '@instincthub/react-ui/lib';

const AuthenticatedApp = () => {
  const { data: session, status } = useSession();

  // Conditional rendering based on auth status
  if (status === 'loading') {
    return <div>Loading authentication...</div>;
  }

  if (status === 'unauthenticated') {
    return (
      <div className="auth-required">
        <h2>Authentication Required</h2>
        <p>Please log in to access this content.</p>
        <div>
          <button onClick={login} className="btn-primary">
            Login
          </button>
          <button onClick={signup} className="btn-secondary">
            Create Account
          </button>
        </div>
      </div>
    );
  }

  // User is authenticated
  return (
    <div className="authenticated-app">
      <header>
        <div>Welcome, {session?.user?.name}!</div>
        <button onClick={logout} className="btn-logout">
          Logout
        </button>
      </header>
      <main>
        {/* Your authenticated app content */}
      </main>
    </div>
  );
};

// Route protection hook
const useAuthGuard = (requiredRole?: string) => {
  const { data: session, status } = useSession();
  
  React.useEffect(() => {
    if (status === 'unauthenticated') {
      login(); // Redirect to login
    } else if (requiredRole && session?.user?.role !== requiredRole) {
      // Handle insufficient permissions
      console.warn('Insufficient permissions');
    }
  }, [status, session, requiredRole]);

  return { session, status, isAuthorized: status === 'authenticated' };
};`}
            </pre>
          </div>
        </div>
      </section>

      {/* Security Considerations */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Security Best Practices</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h6><i className="pi pi-shield ihub-me-2"></i>Client-Side Safety</h6>
              <ul className="ihub-list-unstyled ihub-mb-0">
                <li><i className="pi pi-check-circle text-success ihub-me-2"></i>Browser environment checks</li>
                <li><i className="pi pi-check-circle text-success ihub-me-2"></i>URL encoding for callbacks</li>
                <li><i className="pi pi-check-circle text-success ihub-me-2"></i>NextAuth integration</li>
                <li><i className="pi pi-check-circle text-success ihub-me-2"></i>No sensitive data exposure</li>
              </ul>
            </div>
          </div>
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h6><i className="pi pi-info-circle ihub-me-2"></i>Implementation Notes</h6>
              <ul className="ihub-list-unstyled ihub-mb-0">
                <li><i className="pi pi-angle-right ihub-me-2"></i>Client-side only functions</li>
                <li><i className="pi pi-angle-right ihub-me-2"></i>Requires NextAuth setup</li>
                <li><i className="pi pi-angle-right ihub-me-2"></i>Page reload after logout</li>
                <li><i className="pi pi-angle-right ihub-me-2"></i>Callback URL preservation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthenticationManager;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui next-auth
```

```tsx
import {
  login,
  signup,
  logout
} from '@instincthub/react-ui/lib';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { login, signup, logout } from '@instincthub/react-ui/lib';

function AuthButtons() {
  return (
    <div>
      <button onClick={login}>Login</button>
      <button onClick={signup}>Sign Up</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## 🔧 Function Reference

### Authentication Actions

#### `login(): Promise<void>`
Redirects user to the login page with current URL preserved as callback.

- **Behavior**: Encodes current URL and redirects to `/auth/login?callbackUrl=<current-url>`
- **Browser Safety**: Only executes in browser environment (`typeof window !== "undefined"`)
- **Return**: Promise that resolves when redirect is initiated

#### `signup(): Promise<void>`
Redirects user to the signup page with current URL preserved as callback.

- **Behavior**: Uses Next.js router to navigate to `/auth/signup?callbackUrl=<current-url>`
- **Browser Safety**: Only executes in browser environment
- **Return**: Promise that resolves when navigation is initiated

#### `logout(): Promise<void>`
Signs out the user using NextAuth and reloads the page.

- **Behavior**: Calls `signOut({ redirect: false })` then reloads page
- **Browser Safety**: Only executes in browser environment
- **Return**: Promise that resolves after signout and reload

## 🎯 Advanced Integration

### NextAuth Configuration

```tsx
// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/login',
    signUp: '/auth/signup',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Handle callback URLs properly
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
});
```

### Session Provider Setup

```tsx
// app/layout.tsx or pages/_app.tsx
import { SessionProvider } from 'next-auth/react';

export default function App({ children, session }) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}
```

## 💡 Use Cases

### Protected Routes
- **Route Guards**: Automatically redirect unauthenticated users
- **Role-Based Access**: Combined with permission checking
- **Callback Preservation**: Maintain user's intended destination
- **Deep Linking**: Preserve complex URLs with parameters

### User Experience
- **Seamless Flow**: Smooth authentication experience
- **Context Preservation**: Return users to their original location
- **Single Sign-On**: Integration with external OAuth providers
- **Session Management**: Proper cleanup on logout

### Application Security
- **Client-Side Safety**: Browser environment validation
- **URL Encoding**: Secure callback URL handling
- **No Redirect Loops**: Prevents authentication redirect cycles
- **Session Cleanup**: Complete logout with page reload

## 🔒 Security Considerations

### Client-Side Validation
- **Environment Checks**: Validates browser environment before execution
- **URL Encoding**: Properly encodes callback URLs to prevent injection
- **NextAuth Integration**: Leverages NextAuth's built-in security features
- **No Sensitive Data**: Functions don't handle or expose sensitive information

### Callback URL Security
- **Origin Validation**: NextAuth validates callback URL origins
- **Encoding**: Prevents URL manipulation attacks
- **HTTPS Enforcement**: Should be used with HTTPS in production
- **Domain Restrictions**: Configure allowed callback domains

## ⚠️ Important Notes

- **Client-Side Only**: These functions only work in browser environments
- **NextAuth Dependency**: Requires NextAuth to be properly configured
- **Router Dependency**: Signup function requires Next.js router
- **Page Reload**: Logout function reloads the page to clear all state
- **Callback URLs**: Current URL is preserved for post-authentication redirect

## 🔗 Related Utilities

- [SessionProviders](../theme/SessionProviders.md) - Session provider configuration
- [permissions](./permissions.md) - Role-based access control after authentication
- [utils](./utils.md) - Session data structures and authentication constants
- [ClientDetector](../auth/ClientDetector.md) - Client-side environment detection