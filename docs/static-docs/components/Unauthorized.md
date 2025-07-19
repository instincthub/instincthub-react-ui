# Unauthorized

**Category:** Status | **Type:** component

Unauthorized component for displaying access denied messages with customizable error codes, messages, and redirect options

## 📁 File Location

`src/components/status/Unauthorized.tsx`

## 🏷️ Tags

`status`, `authorization`, `403`, `401`, `security`

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { Unauthorized } from '@instincthub/react-ui';
```

## 🚀 Comprehensive Examples

```tsx
"use client";
import React, { useState } from "react";
import { Unauthorized } from "@instincthub/react-ui";

/**
 * Example component demonstrating various ways to use the Unauthorized component
 */
const UnauthorizedExamples = () => {
  const [selectedExample, setSelectedExample] = useState<string>('basic');

  const examples = {
    basic: {
      title: "Basic Unauthorized (403)",
      component: <Unauthorized />
    },
    login: {
      title: "Not Logged In (401)",
      component: <Unauthorized errorCode={401} />
    },
    customMessage: {
      title: "Custom Message",
      component: (
        <Unauthorized 
          message="You need administrator privileges to access this section."
          errorCode={403}
          redirectTo="/dashboard"
          linkText="Back to Dashboard"
        />
      )
    },
    subscriptionRequired: {
      title: "Subscription Required",
      component: (
        <Unauthorized 
          message="This feature requires a premium subscription. Please upgrade your account to continue."
          errorCode={403}
          redirectTo="/pricing"
          linkText="View Pricing Plans"
        />
      )
    },
    roleRestricted: {
      title: "Role-Based Access",
      component: (
        <Unauthorized 
          message="Only managers and administrators can access employee records."
          errorCode={403}
          redirectTo="/profile"
          linkText="Go to Profile"
        />
      )
    },
    maintenanceMode: {
      title: "Maintenance Mode",
      component: (
        <Unauthorized 
          message="This section is currently under maintenance. Please try again later."
          errorCode={503}
          redirectTo="/status"
          linkText="Check Status Page"
        />
      )
    },
    temporarilyBlocked: {
      title: "Temporarily Blocked",
      component: (
        <Unauthorized 
          message="Your account has been temporarily restricted. Contact support for assistance."
          errorCode={403}
          redirectTo="/contact"
          linkText="Contact Support"
        />
      )
    }
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>Unauthorized Access Examples</h1>
      <p className="ihub-mb-4">
        Choose an example to see different unauthorized access scenarios:
      </p>

      {/* Example Selection Buttons */}
      <div 
        className="ihub-d-flex ihub-py-3 ihub-mb-5" 
        style={{ gap: "10px", flexWrap: "wrap" }}
      >
        {Object.entries(examples).map(([key, example]) => (
          <button
            key={key}
            className={selectedExample === key ? "ihub-important-btn" : "ihub-outlined-btn"}
            onClick={() => setSelectedExample(key)}
          >
            {example.title}
          </button>
        ))}
      </div>

      {/* Display Selected Example */}
      <div className="ihub-border ihub-rounded ihub-p-4">
        <h3 className="ihub-mb-3">{examples[selectedExample as keyof typeof examples].title}</h3>
        {examples[selectedExample as keyof typeof examples].component}
      </div>

      {/* Code Examples Section */}
      <div className="ihub-mt-8">
        <h2>Implementation Examples</h2>
        
        <h3>1. Protected Route Component</h3>
        <pre className="ihub-bg-light ihub-p-3 ihub-rounded">
{`// ProtectedRoute.tsx
import React from 'react';
import { Unauthorized } from '@instincthub/react-ui';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  userRole?: string;
  isAuthenticated?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  userRole,
  isAuthenticated = false
}) => {
  // Not logged in
  if (!isAuthenticated) {
    return <Unauthorized errorCode={401} />;
  }

  // Insufficient permissions
  if (requiredRole && userRole !== requiredRole) {
    return (
      <Unauthorized 
        message={\`This page requires \${requiredRole} access.\`}
        errorCode={403}
        redirectTo="/dashboard"
        linkText="Back to Dashboard"
      />
    );
  }

  return <>{children}</>;
};`}
        </pre>

        <h3>2. Admin Dashboard Protection</h3>
        <pre className="ihub-bg-light ihub-p-3 ihub-rounded">
{`// AdminDashboard.tsx
import React from 'react';
import { Unauthorized } from '@instincthub/react-ui';
import { useAuth } from './hooks/useAuth';

const AdminDashboard = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    return <Unauthorized errorCode={401} />;
  }

  if (!['admin', 'super_admin'].includes(user.role)) {
    return (
      <Unauthorized 
        message="Administrator access required. Contact your system administrator for access."
        errorCode={403}
        redirectTo="/user-dashboard"
        linkText="Go to User Dashboard"
      />
    );
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Admin content */}
    </div>
  );
};`}
        </pre>

        <h3>3. Subscription-Based Features</h3>
        <pre className="ihub-bg-light ihub-p-3 ihub-rounded">
{`// PremiumFeature.tsx
import React from 'react';
import { Unauthorized } from '@instincthub/react-ui';

interface PremiumFeatureProps {
  userSubscription: 'free' | 'premium' | 'enterprise';
  children: React.ReactNode;
}

const PremiumFeature: React.FC<PremiumFeatureProps> = ({
  userSubscription,
  children
}) => {
  if (userSubscription === 'free') {
    return (
      <Unauthorized 
        message="This feature is available for Premium and Enterprise subscribers only."
        errorCode={403}
        redirectTo="/upgrade"
        linkText="Upgrade Now"
      />
    );
  }

  return <>{children}</>;
};`}
        </pre>

        <h3>4. Maintenance Mode</h3>
        <pre className="ihub-bg-light ihub-p-3 ihub-rounded">
{`// MaintenanceWrapper.tsx
import React from 'react';
import { Unauthorized } from '@instincthub/react-ui';

interface MaintenanceWrapperProps {
  isMaintenanceMode: boolean;
  allowedRoles?: string[];
  userRole?: string;
  children: React.ReactNode;
}

const MaintenanceWrapper: React.FC<MaintenanceWrapperProps> = ({
  isMaintenanceMode,
  allowedRoles = ['admin'],
  userRole,
  children
}) => {
  if (isMaintenanceMode && !allowedRoles.includes(userRole || '')) {
    return (
      <Unauthorized 
        message="The application is currently under maintenance. We'll be back shortly!"
        errorCode={503}
        redirectTo="/status"
        linkText="Check Status"
      />
    );
  }

  return <>{children}</>;
};`}
        </pre>

        <h3>5. Next.js Route Protection</h3>
        <pre className="ihub-bg-light ihub-p-3 ihub-rounded">
{`// pages/admin/users.tsx
import React from 'react';
import { GetServerSideProps } from 'next';
import { Unauthorized } from '@instincthub/react-ui';

interface UsersPageProps {
  user?: any;
  unauthorized?: boolean;
  errorCode?: number;
}

const UsersPage: React.FC<UsersPageProps> = ({ user, unauthorized, errorCode }) => {
  if (unauthorized) {
    return (
      <Unauthorized 
        message="Access denied. Administrator privileges required."
        errorCode={errorCode}
        redirectTo="/dashboard"
        linkText="Back to Dashboard"
      />
    );
  }

  return (
    <div>
      <h1>User Management</h1>
      {/* Admin users content */}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Server-side authentication check
  const user = await getUser(context.req);
  
  if (!user) {
    return {
      props: {
        unauthorized: true,
        errorCode: 401
      }
    };
  }

  if (user.role !== 'admin') {
    return {
      props: {
        unauthorized: true,
        errorCode: 403
      }
    };
  }

  return {
    props: {
      user
    }
  };
};`}
        </pre>
      </div>

      {/* Common Use Cases */}
      <div className="ihub-mt-8">
        <h2>Common Use Cases</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <h4>Authentication Scenarios</h4>
            <ul>
              <li><strong>401 - Not Logged In:</strong> User needs to authenticate</li>
              <li><strong>403 - Insufficient Permissions:</strong> User lacks required role</li>
              <li><strong>403 - Account Suspended:</strong> User account is temporarily disabled</li>
              <li><strong>403 - Feature Not Available:</strong> Subscription tier restriction</li>
            </ul>
          </div>
          <div className="ihub-col-md-6">
            <h4>Authorization Patterns</h4>
            <ul>
              <li><strong>Role-Based Access:</strong> Admin, Manager, User roles</li>
              <li><strong>Permission-Based:</strong> Specific permission checks</li>
              <li><strong>Subscription-Based:</strong> Free, Premium, Enterprise tiers</li>
              <li><strong>Time-Based:</strong> Trial expired, maintenance mode</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Props Documentation */}
      <div className="ihub-mt-8">
        <h2>Props</h2>
        <table className="ihub-table">
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
              <td><code>message</code></td>
              <td><code>string</code></td>
              <td><code>undefined</code></td>
              <td>Custom message to display to the user</td>
            </tr>
            <tr>
              <td><code>redirectTo</code></td>
              <td><code>string</code></td>
              <td><code>"/"</code></td>
              <td>URL to redirect the user to</td>
            </tr>
            <tr>
              <td><code>linkText</code></td>
              <td><code>string</code></td>
              <td><code>"Go back to homepage"</code></td>
              <td>Text to display for the redirect link</td>
            </tr>
            <tr>
              <td><code>errorCode</code></td>
              <td><code>number</code></td>
              <td><code>403</code></td>
              <td>HTTP error code to display (401, 403, etc.)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnauthorizedExamples;
```

## 🔗 Related Components

- [TimeTracker](./TimeTracker.md) - Time tracking component
- [SessionHandleProvider](./SessionHandleProvider.md) - Session handling provider component
- [Error500](./Error500.md) - 500 error display component
- [ErrorState](./ErrorState.md) - Error state display component
- [ReactTimeTracker](./ReactTimeTracker.md) - React time tracking component

