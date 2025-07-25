# Permission Utilities

**Category:** Library | **Type:** utility collection

Security utilities for validating API requests and checking user permissions in Next.js applications. Provides header validation, username verification, and permission checking functions for secure API endpoints.

## 📁 File Location

`src/components/lib/permissions.ts`

## 🏷️ Tags

`security`, `permissions`, `api`, `validation`, `headers`, `authentication`, `authorization`

## 📖 Usage Examples

### Example 1: Complete Permission System Demo

```tsx
"use client";

import React, { useState } from "react";
import {
  headerUsernamePermission,
  headerKeyPermission,
  findPermissions
} from "@instincthub/react-ui/lib";

/**
 * Comprehensive example demonstrating permission utility functions
 */
const PermissionExamples = () => {
  // Mock session data
  const [mockSession, setMockSession] = useState({
    user: {
      id: "user123",
      username: "john.doe",
      email: "john.doe@example.com",
      role: "ADMIN"
    },
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  });

  // Mock request data
  const [mockRequest, setMockRequest] = useState({
    headers: {
      "x-instincthub-next-header": "correct-header-value",
      "username": "john.doe",
      "authorization": "Bearer token123"
    },
    method: "GET",
    url: "/api/admin/users"
  });

  // Permission arrays for testing
  const [permissionSets] = useState({
    ADMIN_PERMISSION: ["LEARNER", "BLOGGER", "INSTRUCTOR", "ADMIN"],
    REGISTRAR_PERMISSION: ["REGISTRAR", "SUPER_ADMIN"],
    SUPER_PERMISSION: ["LEARNER", "BLOGGER", "INSTRUCTOR", "ADMIN", "FINANCE", "REGISTRAR", "SUPER_ADMIN"],
    INSTRUCTOR_PERMISSION: ["INSTRUCTOR", "ADMIN", "SUPER_ADMIN"]
  });

  const [validationResults, setValidationResults] = useState<any>({});

  const testHeaderUsernamePermission = async () => {
    const result = await headerUsernamePermission(mockSession, mockRequest as any);
    setValidationResults(prev => ({
      ...prev,
      headerUsername: {
        passed: result,
        message: result ? "Valid session and username match" : "Invalid session or username mismatch"
      }
    }));
  };

  const testHeaderKeyPermission = async () => {
    const result = await headerKeyPermission(mockRequest as any);
    setValidationResults(prev => ({
      ...prev,
      headerKey: {
        passed: result,
        message: result ? "Valid custom header" : "Invalid or missing custom header"
      }
    }));
  };

  const testFindPermissions = (permissionSet: string[], userRole: string) => {
    const result = findPermissions(permissionSets[permissionSet], userRole);
    setValidationResults(prev => ({
      ...prev,
      findPermissions: {
        passed: !!result,
        message: result ? `Permission found: ${result}` : `Permission not found for role: ${userRole}`,
        permissionSet,
        userRole
      }
    }));
  };

  const updateRequestHeader = (key: string, value: string) => {
    setMockRequest(prev => ({
      ...prev,
      headers: {
        ...prev.headers,
        [key]: value
      }
    }));
  };

  const updateSessionUsername = (username: string) => {
    setMockSession(prev => ({
      ...prev,
      user: {
        ...prev.user,
        username
      }
    }));
  };

  return (
    <div className="ihub-container ihub-py-5">
      <h1>Permission Utilities Examples</h1>

      {/* Mock Data Configuration */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Test Configuration</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h6>Mock Session Data</h6>
              <div className="ihub-mb-3">
                <label className="ihub-form-label">Username:</label>
                <input
                  type="text"
                  className="ihub-form-control"
                  value={mockSession.user.username}
                  onChange={(e) => updateSessionUsername(e.target.value)}
                />
              </div>
              <div className="ihub-mb-3">
                <label className="ihub-form-label">Role:</label>
                <select
                  className="ihub-form-control"
                  value={mockSession.user.role}
                  onChange={(e) => setMockSession(prev => ({
                    ...prev,
                    user: { ...prev.user, role: e.target.value }
                  }))}
                >
                  <option value="LEARNER">LEARNER</option>
                  <option value="INSTRUCTOR">INSTRUCTOR</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="REGISTRAR">REGISTRAR</option>
                  <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                </select>
              </div>
              <pre className="ihub-bg-light ihub-p-2" style={{ fontSize: "10px" }}>
                {JSON.stringify(mockSession, null, 2)}
              </pre>
            </div>
          </div>

          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h6>Mock Request Headers</h6>
              <div className="ihub-mb-3">
                <label className="ihub-form-label">Custom Header:</label>
                <input
                  type="text"
                  className="ihub-form-control"
                  value={mockRequest.headers["x-instincthub-next-header"]}
                  onChange={(e) => updateRequestHeader("x-instincthub-next-header", e.target.value)}
                />
              </div>
              <div className="ihub-mb-3">
                <label className="ihub-form-label">Username Header:</label>
                <input
                  type="text"
                  className="ihub-form-control"
                  value={mockRequest.headers.username}
                  onChange={(e) => updateRequestHeader("username", e.target.value)}
                />
              </div>
              <pre className="ihub-bg-light ihub-p-2" style={{ fontSize: "10px" }}>
                {JSON.stringify(mockRequest.headers, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Permission Testing */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Permission Validation Tests</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-p-4">
              <h6>Header Username Permission</h6>
              <p className="text-muted" style={{ fontSize: "13px" }}>
                Validates session username matches request header username and custom header is correct.
              </p>
              <button
                className="ihub-btn ihub-btn-primary ihub-w-100 ihub-mb-3"
                onClick={testHeaderUsernamePermission}
              >
                Test Header Username
              </button>
              {validationResults.headerUsername && (
                <div className={`ihub-alert ${validationResults.headerUsername.passed ? 'ihub-alert-success' : 'ihub-alert-danger'}`}>
                  <strong>Result:</strong> {validationResults.headerUsername.message}
                </div>
              )}
            </div>
          </div>

          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-p-4">
              <h6>Header Key Permission</h6>
              <p className="text-muted" style={{ fontSize: "13px" }}>
                Validates the custom header matches the expected environment value.
              </p>
              <button
                className="ihub-btn ihub-btn-primary ihub-w-100 ihub-mb-3"
                onClick={testHeaderKeyPermission}
              >
                Test Header Key
              </button>
              {validationResults.headerKey && (
                <div className={`ihub-alert ${validationResults.headerKey.passed ? 'ihub-alert-success' : 'ihub-alert-danger'}`}>
                  <strong>Result:</strong> {validationResults.headerKey.message}
                </div>
              )}
            </div>
          </div>

          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-p-4">
              <h6>Find Permissions</h6>
              <p className="text-muted" style={{ fontSize: "13px" }}>
                Searches for a user role within a permission array.
              </p>
              <div className="ihub-mb-2">
                <select
                  className="ihub-form-control ihub-form-control-sm"
                  onChange={(e) => testFindPermissions(e.target.value, mockSession.user.role)}
                >
                  <option value="">Select Permission Set</option>
                  {Object.keys(permissionSets).map(set => (
                    <option key={set} value={set}>{set}</option>
                  ))}
                </select>
              </div>
              {validationResults.findPermissions && (
                <div className={`ihub-alert ${validationResults.findPermissions.passed ? 'ihub-alert-success' : 'ihub-alert-danger'}`}>
                  <strong>Result:</strong> {validationResults.findPermissions.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Permission Sets Overview */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Permission Sets</h2>
        <div className="ihub-row">
          {Object.entries(permissionSets).map(([setName, permissions]) => (
            <div key={setName} className="ihub-col-md-6 ihub-mb-3">
              <div className="ihub-card ihub-p-4">
                <h6>{setName}</h6>
                <div className="ihub-d-flex ihub-flex-wrap ihub-gap-1">
                  {permissions.map((permission, index) => (
                    <span
                      key={index}
                      className={`ihub-badge ${
                        mockSession.user.role === permission 
                          ? 'ihub-badge-success' 
                          : 'ihub-badge-light'
                      }`}
                    >
                      {permission}
                    </span>
                  ))}
                </div>
                <button
                  className="ihub-btn ihub-btn-outline-primary ihub-btn-sm ihub-mt-2"
                  onClick={() => testFindPermissions(setName, mockSession.user.role)}
                >
                  Test Current Role
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Implementation Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Implementation Examples</h2>
        
        {/* API Route Protection */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-shield ihub-me-2"></i>
              API Route Protection Pattern
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// pages/api/protected/users.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { headerUsernamePermission, headerKeyPermission } from '@instincthub/react-ui/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get the user session
    const session = await getServerSession(req, res, authOptions);

    // Validate custom header
    const hasValidHeader = await headerKeyPermission(req);
    if (!hasValidHeader) {
      return res.status(401).json({ 
        error: 'Invalid or missing custom header' 
      });
    }

    // Validate username permission
    const hasUsernamePermission = await headerUsernamePermission(session, req);
    if (!hasUsernamePermission) {
      return res.status(403).json({ 
        error: 'Username mismatch or invalid session' 
      });
    }

    // Process the request
    if (req.method === 'GET') {
      const users = await getUserList();
      res.json(users);
    } else if (req.method === 'POST') {
      const newUser = await createUser(req.body);
      res.json(newUser);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(\`Method \${req.method} Not Allowed\`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}`}
            </pre>
          </div>
        </div>

        {/* Middleware Pattern */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-cog ihub-me-2"></i>
              Middleware Factory Pattern
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// utils/apiMiddleware.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { 
  headerUsernamePermission, 
  headerKeyPermission, 
  findPermissions 
} from '@instincthub/react-ui/lib';

type PermissionLevel = 'header-only' | 'username' | 'role-based';

interface MiddlewareOptions {
  permissionLevel: PermissionLevel;
  requiredPermissions?: string[];
  skipSessionCheck?: boolean;
}

export const createApiMiddleware = (options: MiddlewareOptions) => {
  return async (
    req: NextApiRequest, 
    res: NextApiResponse, 
    next: () => Promise<void>
  ) => {
    try {
      // Always check header key unless explicitly skipped
      if (!options.skipSessionCheck) {
        const hasValidHeader = await headerKeyPermission(req);
        if (!hasValidHeader) {
          return res.status(401).json({ error: 'Invalid header key' });
        }
      }

      // Check username permission if required
      if (options.permissionLevel === 'username' || options.permissionLevel === 'role-based') {
        const session = await getServerSession(req, res, authOptions);
        
        if (!session) {
          return res.status(401).json({ error: 'No session found' });
        }

        const hasUsernamePermission = await headerUsernamePermission(session, req);
        if (!hasUsernamePermission) {
          return res.status(403).json({ error: 'Username permission denied' });
        }

        // Check role-based permissions
        if (options.permissionLevel === 'role-based' && options.requiredPermissions) {
          const userRole = session.user?.role;
          const hasRolePermission = options.requiredPermissions.some(permission =>
            findPermissions(permission.split(','), userRole)
          );

          if (!hasRolePermission) {
            return res.status(403).json({ 
              error: 'Insufficient role permissions',
              required: options.requiredPermissions,
              current: userRole
            });
          }
        }
      }

      // All checks passed, proceed to next middleware or handler
      await next();
    } catch (error) {
      console.error('Middleware error:', error);
      res.status(500).json({ error: 'Middleware error' });
    }
  };
};

// Usage examples
export const headerOnlyMiddleware = createApiMiddleware({
  permissionLevel: 'header-only'
});

export const usernameMiddleware = createApiMiddleware({
  permissionLevel: 'username'
});

export const adminMiddleware = createApiMiddleware({
  permissionLevel: 'role-based',
  requiredPermissions: ['ADMIN,SUPER_ADMIN']
});

// In API route
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await adminMiddleware(req, res, async () => {
    // Your protected API logic here
    res.json({ message: 'Admin access granted' });
  });
}`}
            </pre>
          </div>
        </div>

        {/* Client-side Permission Checking */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-user ihub-me-2"></i>
              Client-side Permission Hook
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// hooks/usePermissions.ts
import { useSession } from 'next-auth/react';
import { findPermissions } from '@instincthub/react-ui/lib';

interface UsePermissionsReturn {
  hasPermission: (permissionArray: string[]) => boolean;
  userRole: string | null;
  isLoading: boolean;
}

export const usePermissions = (): UsePermissionsReturn => {
  const { data: session, status } = useSession();
  
  const hasPermission = useCallback((permissionArray: string[]) => {
    if (!session?.user?.role) return false;
    return !!findPermissions(permissionArray, session.user.role);
  }, [session]);

  return {
    hasPermission,
    userRole: session?.user?.role || null,
    isLoading: status === 'loading'
  };
};

// Component usage
const AdminPanel = () => {
  const { hasPermission, isLoading } = usePermissions();

  if (isLoading) return <LoadingSpinner />;

  const canManageUsers = hasPermission(['ADMIN', 'SUPER_ADMIN']);
  const canAccessFinance = hasPermission(['FINANCE', 'SUPER_ADMIN']);

  return (
    <div>
      <h1>Admin Panel</h1>
      {canManageUsers && (
        <UserManagementSection />
      )}
      {canAccessFinance && (
        <FinanceSection />
      )}
      {!canManageUsers && !canAccessFinance && (
        <div>You don't have permission to access any admin features.</div>
      )}
    </div>
  );
};`}
            </pre>
          </div>
        </div>
      </section>

      {/* Security Best Practices */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Security Best Practices</h2>
        <div className="ihub-card ihub-p-4">
          <h6>Implementation Guidelines</h6>
          <ul className="ihub-list-unstyled">
            <li className="ihub-mb-2">
              <i className="pi pi-check-circle text-success ihub-me-2"></i>
              <strong>Environment Variables:</strong> Store custom headers in environment variables
            </li>
            <li className="ihub-mb-2">
              <i className="pi pi-check-circle text-success ihub-me-2"></i>
              <strong>Session Validation:</strong> Always validate user sessions before permission checks
            </li>
            <li className="ihub-mb-2">
              <i className="pi pi-check-circle text-success ihub-me-2"></i>
              <strong>Header Security:</strong> Use custom headers to prevent CSRF attacks
            </li>
            <li className="ihub-mb-2">
              <i className="pi pi-check-circle text-success ihub-me-2"></i>
              <strong>Role Hierarchy:</strong> Implement proper role inheritance and permissions
            </li>
            <li className="ihub-mb-2">
              <i className="pi pi-check-circle text-success ihub-me-2"></i>
              <strong>Error Handling:</strong> Provide generic error messages to prevent information leakage
            </li>
            <li className="ihub-mb-2">
              <i className="pi pi-check-circle text-success ihub-me-2"></i>
              <strong>Logging:</strong> Log permission failures for security monitoring
            </li>
          </ul>

          <div className="ihub-alert ihub-alert-warning ihub-mt-3">
            <strong>Security Note:</strong> The <code>findPermissions</code> function has a bug in the current implementation. 
            The condition should be <code>i === option</code> instead of <code>i = option</code> for proper comparison.
          </div>
        </div>
      </section>
    </div>
  );
};

export default PermissionExamples;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import {
  headerUsernamePermission,
  headerKeyPermission,
  findPermissions
} from '@instincthub/react-ui/lib';
```

## 🚀 Basic Usage

```tsx
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { headerUsernamePermission } from '@instincthub/react-ui/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  
  const hasPermission = await headerUsernamePermission(session, req);
  if (!hasPermission) {
    return res.status(403).json({ error: 'Permission denied' });
  }

  // Continue with protected logic
  res.json({ message: 'Access granted' });
}
```

## 🔧 Function Signatures

### `headerUsernamePermission(session: Session | null, req: NextApiRequest): Promise<boolean>`
Validates that the session username matches the request header username and custom header is valid.

**Parameters:**
- `session` - NextAuth session object
- `req` - Next.js API request object

**Returns:** Promise<boolean> - True if validation passes

### `headerKeyPermission(req: NextApiRequest): Promise<boolean>`
Validates that the request contains the correct custom header value.

**Parameters:**
- `req` - Next.js API request object

**Returns:** Promise<boolean> - True if header is valid

### `findPermissions(permission: string[], option: string): string | undefined`
Searches for a permission in an array of permissions.

**Parameters:**
- `permission` - Array of available permissions
- `option` - Permission to search for

**Returns:** string | undefined - Found permission or undefined

## 🔒 Security Features

### Header Validation
- **Custom Header Check**: Validates `x-instincthub-next-header` against environment variable
- **Username Verification**: Ensures session username matches request header
- **CSRF Protection**: Custom headers help prevent cross-site request forgery

### Environment Variables Required
```bash
NEXT_PUBLIC_X_INSTINCTHUB_NEXT_HEADER=your-secret-header-value
```

### Session Requirements
- Uses NextAuth session structure
- Expects `session.user.username` property
- Validates session existence before checks

## 💡 Use Cases

- **API Route Protection**: Secure Next.js API endpoints
- **User Authorization**: Validate user permissions for actions
- **Header Security**: Implement custom header validation
- **Session Validation**: Ensure authenticated requests
- **Role-based Access**: Check user roles against permission arrays
- **Microservice Security**: Validate requests between services

## ⚠️ Known Issues

### Bug in findPermissions Function
The current implementation has a bug in line 60:
```tsx
// Current (incorrect):
return permission.find((i) => (i = option));

// Should be:
return permission.find((i) => i === option);
```

## 🔗 Related Utilities

- [roles](./roles.md) - Role-based access control system
- [adminAccessValidation](./roles.md#adminaccessvalidation) - Role validation function
- [Session types](../types/auth.md) - Authentication type definitions