# ReactClientProviders

**Category:** Auth | **Type:** context

Comprehensive wrapper providing all essential React providers for application setup

**File Location:** `src/components/auth/ReactClientProviders.tsx`

## 🏷️ Tags

`auth`, `providers`, `context`, `session`, `theme`

```tsx
"use client";
import React, { useState } from "react";
import { ReactClientProviders } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive examples demonstrating ReactClientProviders usage
 * Shows different provider configurations and integration patterns
 */
const ReactClientProvidersExamples = () => {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
  const [sessionData, setSessionData] = useState<any>(null);

  // Mock session data
  const mockSession = {
    user: {
      id: "user_123",
      name: "John Doe",
      email: "john.doe@example.com",
      image: "https://i.pravatar.cc/150?img=1",
      role: "admin",
    },
    expires: "2024-12-31T23:59:59.999Z",
    accessToken: "mock_access_token_123",
  };

  const handleLogin = () => {
    setSessionData(mockSession);
    openToast("Logged in successfully!");
  };

  const handleLogout = () => {
    setSessionData(null);
    openToast("Logged out successfully!");
  };

  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
    openToast(`Switched to ${newTheme} theme`);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>ReactClientProviders Examples</h1>
      <p className="ihub-mb-4">
        Comprehensive provider wrapper that sets up all essential React contexts
        including authentication, theming, and application state management.
      </p>

      {/* Basic Provider Setup */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Basic Provider Setup</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Default Configuration</h3>
            <p className="ihub-text-muted">Standard setup with all default providers</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-code-example">
              <h4>App.tsx Setup:</h4>
              <pre className="ihub-code-block">
{`import { ReactClientProviders } from "@instincthub/react-ui";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <ReactClientProviders>
      {children}
    </ReactClientProviders>
  );
}`}
              </pre>
            </div>
            
            <div className="ihub-mt-3">
              <h4>What's Included:</h4>
              <ul>
                <li><strong>Session Provider:</strong> Authentication and user session management</li>
                <li><strong>Theme Provider:</strong> Dark/light mode theming support</li>
                <li><strong>Toast Provider:</strong> Global notification system</li>
                <li><strong>Modal Provider:</strong> Centralized modal management</li>
                <li><strong>Client Detector:</strong> Device and browser detection</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Configuration */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Custom Provider Configuration</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Advanced Setup with Configuration</h3>
            <p className="ihub-text-muted">Customized provider setup with specific options</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-code-example">
              <h4>Custom Configuration:</h4>
              <pre className="ihub-code-block">
{`import { ReactClientProviders } from "@instincthub/react-ui";

export default function App({ children }) {
  return (
    <ReactClientProviders
      sessionConfig={{
        baseUrl: process.env.NEXTAUTH_URL,
        basePath: "/api/auth",
        clientMaxAge: 0,
        keepAlive: 0
      }}
      themeConfig={{
        defaultTheme: "dark",
        enableSystemTheme: true,
        storageKey: "app-theme"
      }}
      toastConfig={{
        position: "top-right",
        autoClose: 5000,
        newestOnTop: true
      }}
      enableRedux={true}
      enablePWA={true}
    >
      {children}
    </ReactClientProviders>
  );
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Provider Features Demo */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Provider Features Demo</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Session Management</h3>
              </div>
              <div className="ihub-card-body">
                <div className="ihub-session-demo">
                  {sessionData ? (
                    <div>
                      <div className="ihub-user-info ihub-d-flex ihub-align-items-center ihub-mb-3">
                        <img 
                          src={sessionData.user.image} 
                          alt={sessionData.user.name}
                          className="ihub-avatar ihub-avatar-md ihub-me-3"
                        />
                        <div>
                          <div className="ihub-font-weight-bold">{sessionData.user.name}</div>
                          <div className="ihub-text-muted">{sessionData.user.email}</div>
                          <div className="ihub-small">Role: {sessionData.user.role}</div>
                        </div>
                      </div>
                      <button 
                        className="ihub-danger-btn"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p>No active session</p>
                      <button 
                        className="ihub-primary-btn"
                        onClick={handleLogin}
                      >
                        Login
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Theme Management</h3>
              </div>
              <div className="ihub-card-body">
                <div className="ihub-theme-demo">
                  <div className="ihub-mb-3">
                    <p>Current theme: <strong>{currentTheme}</strong></p>
                    <div className={`ihub-theme-preview ${currentTheme}`}>
                      <div className="ihub-preview-header">Header</div>
                      <div className="ihub-preview-content">Content Area</div>
                      <div className="ihub-preview-sidebar">Sidebar</div>
                    </div>
                  </div>
                  <button 
                    className="ihub-outlined-btn"
                    onClick={toggleTheme}
                  >
                    Switch to {currentTheme === "light" ? "Dark" : "Light"} Theme
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next.js Integration */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Next.js Integration</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Complete Next.js App Setup</h3>
            <p className="ihub-text-muted">Full integration example for Next.js applications</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-code-example">
              <h4>app/layout.tsx:</h4>
              <pre className="ihub-code-block">
{`import { ReactClientProviders } from "@instincthub/react-ui";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <ReactClientProviders 
          session={session}
          sessionConfig={{
            baseUrl: process.env.NEXTAUTH_URL,
            basePath: "/api/auth"
          }}
          themeConfig={{
            defaultTheme: "system",
            enableSystemTheme: true
          }}
        >
          {children}
        </ReactClientProviders>
      </body>
    </html>
  );
}`}
              </pre>
            </div>
            
            <div className="ihub-mt-3">
              <h4>app/api/auth/[...nextauth]/route.ts:</h4>
              <pre className="ihub-code-block">
{`import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { authOptions } from "@instincthub/react-ui/auth";

const handler = NextAuth({
  ...authOptions,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    ...authOptions.callbacks,
    session: async ({ session, token }) => {
      // Custom session logic
      return session;
    },
  },
});

export { handler as GET, handler as POST };`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Provider Hooks Usage */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Using Provider Hooks</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Accessing Provider Data</h3>
            <p className="ihub-text-muted">Examples of using hooks provided by ReactClientProviders</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-code-example">
              <h4>Component Example:</h4>
              <pre className="ihub-code-block">
{`import { useSession, useTheme, useToast } from "@instincthub/react-ui";

function MyComponent() {
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const handleAction = () => {
    if (status === "authenticated") {
      toast.success(\`Hello \${session.user.name}!\`);
    } else {
      toast.error("Please log in first");
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div>
      <h3>User Status: {status}</h3>
      {session && (
        <p>Welcome, {session.user.name}!</p>
      )}
      <button onClick={handleAction}>
        Send Toast
      </button>
      <button onClick={toggleTheme}>
        Current theme: {theme}
      </button>
    </div>
  );
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Environment Configuration */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Environment Configuration</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Environment Variables</h3>
            <p className="ihub-text-muted">Required environment setup</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-code-example">
              <h4>.env.local:</h4>
              <pre className="ihub-code-block">
{`# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database (optional)
DATABASE_URL=postgresql://username:password@localhost:5432/database

# InstinctHub API
INSTINCTHUB_API_URL=https://api.instincthub.com
INSTINCTHUB_API_KEY=your-api-key`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Troubleshooting</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Common Issues and Solutions</h3>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-troubleshooting">
              <div className="ihub-issue ihub-mb-3">
                <h4>Hydration Mismatch</h4>
                <p><strong>Problem:</strong> Server and client rendering don't match</p>
                <p><strong>Solution:</strong> Use ClientDetector component or suppressHydrationWarning</p>
                <pre className="ihub-code-block ihub-small">
{`<ReactClientProviders suppressHydrationWarning>
  {children}
</ReactClientProviders>`}
                </pre>
              </div>
              
              <div className="ihub-issue ihub-mb-3">
                <h4>Session Not Loading</h4>
                <p><strong>Problem:</strong> useSession returns null</p>
                <p><strong>Solution:</strong> Ensure NEXTAUTH_URL and providers are correctly configured</p>
              </div>
              
              <div className="ihub-issue ihub-mb-3">
                <h4>Theme Not Persisting</h4>
                <p><strong>Problem:</strong> Theme resets on page reload</p>
                <p><strong>Solution:</strong> Check localStorage permissions and storageKey configuration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Implementation Guide</h2>
        <div className="ihub-card ihub-p-4">
          <h3>Props Interface:</h3>
          <pre className="ihub-code-block">
{`interface ReactClientProvidersProps {
  children: React.ReactNode;
  session?: Session | null;           // Pre-fetched session data
  sessionConfig?: SessionConfig;      // NextAuth configuration
  themeConfig?: ThemeConfig;          // Theme provider settings
  toastConfig?: ToastConfig;          // Toast notification settings
  enableRedux?: boolean;              // Enable Redux store
  enablePWA?: boolean;                // Enable PWA features
  suppressHydrationWarning?: boolean; // Suppress hydration warnings
  customProviders?: React.ComponentType[];  // Additional providers
}`}
          </pre>
          
          <h3 className="ihub-mt-3">Key Features:</h3>
          <ul>
            <li><strong>Authentication:</strong> Complete NextAuth.js integration</li>
            <li><strong>Theming:</strong> Dark/light mode with system preference support</li>
            <li><strong>Notifications:</strong> Global toast notification system</li>
            <li><strong>State Management:</strong> Optional Redux integration</li>
            <li><strong>PWA Support:</strong> Progressive Web App features</li>
            <li><strong>SSR Ready:</strong> Full server-side rendering support</li>
          </ul>
          
          <h3 className="ihub-mt-3">Best Practices:</h3>
          <ul>
            <li>Place ReactClientProviders at the root of your application</li>
            <li>Pre-fetch session data on the server when possible</li>
            <li>Configure environment variables properly for production</li>
            <li>Use suppressHydrationWarning only when necessary</li>
            <li>Test authentication flows in different environments</li>
            <li>Implement proper error boundaries for provider failures</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ReactClientProvidersExamples;
```

## 🔗 Related Components

- [SessionProviders](./SessionProviders.md) - Session management providers
- [DarkModeProvider](./DarkModeProvider.md) - Theme management provider
- [ClientDetector](./ClientDetector.md) - Client-side detection component
- [LoginForm](./LoginForm.md) - Authentication form component
- [useClientSide](./useClientSide.md) - Client-side detection hook