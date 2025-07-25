# Role Management System

**Category:** Library | **Type:** utility collection

A comprehensive role-based access control (RBAC) system with hierarchical permissions for educational platforms. Provides role definitions, validation functions, and access control utilities for managing user permissions across different platform features.

## 📁 File Location

`src/components/lib/roles.ts`

## 🏷️ Tags

`rbac`, `permissions`, `access-control`, `roles`, `security`, `authorization`, `hierarchy`

## 📖 Usage Examples

### Example 1: Complete Role Management Demo

```tsx
"use client";

import React, { useState } from "react";
import {
  INSTRUCTOR_TYPE,
  ROLE_GROUPING,
  adminAccessValidation,
  RoleType,
  RoleGroupKey
} from "@instincthub/react-ui/lib";

/**
 * Comprehensive example demonstrating role management utilities
 */
const RoleManagementExamples = () => {
  const [selectedUser, setSelectedUser] = useState({
    role: "LEARNER" as RoleType,
    username: "john.doe",
    permissions: [] as string[]
  });

  const [accessCheck, setAccessCheck] = useState({
    role: "INSTRUCTOR" as RoleType,
    feature: "CHANNEL_EVENT_ROLES" as RoleGroupKey,
    hasAccess: false
  });

  // Mock users for demonstration
  const [users] = useState([
    { id: 1, username: "alice.admin", role: "ADMIN" as RoleType, department: "Management" },
    { id: 2, username: "bob.instructor", role: "INSTRUCTOR" as RoleType, department: "Education" },
    { id: 3, username: "carol.learner", role: "LEARNER" as RoleType, department: "Student" },
    { id: 4, username: "david.finance", role: "FINANCE" as RoleType, department: "Finance" },
    { id: 5, username: "eve.moderator", role: "MODERATOR" as RoleType, department: "Community" }
  ]);

  const checkAccess = (role: RoleType, feature: RoleGroupKey) => {
    const hasAccess = adminAccessValidation(role, feature);
    setAccessCheck({ role, feature, hasAccess });
    return hasAccess;
  };

  const getRoleDescription = (roleId: string) => {
    const role = INSTRUCTOR_TYPE.find(r => r.id === roleId);
    return role ? role.title : "Unknown Role";
  };

  const getAccessibleFeatures = (userRole: RoleType) => {
    const accessibleFeatures: string[] = [];
    
    Object.keys(ROLE_GROUPING).forEach(groupKey => {
      if (adminAccessValidation(userRole, groupKey)) {
        accessibleFeatures.push(groupKey);
      }
    });
    
    return accessibleFeatures;
  };

  return (
    <div className="ihub-container ihub-py-5">
      <h1>Role Management System Examples</h1>

      {/* Role Hierarchy Overview */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Role Hierarchy & Definitions</h2>
        <div className="ihub-row">
          {INSTRUCTOR_TYPE.map((role, index) => {
            const roleKey = role.id as RoleType;
            const accessibleFeatures = getAccessibleFeatures(roleKey);
            
            return (
              <div key={index} className="ihub-col-md-6 ihub-col-lg-4 ihub-mb-3">
                <div className="ihub-card ihub-h-100">
                  <div className="ihub-card-header">
                    <h6 className="ihub-mb-0">
                      <span className={`ihub-badge ${
                        role.id === 'SUPER_ADMIN' ? 'ihub-badge-danger' :
                        role.id === 'ADMIN' ? 'ihub-badge-warning' :
                        role.id === 'INSTRUCTOR' ? 'ihub-badge-primary' :
                        role.id === 'LEARNER' ? 'ihub-badge-success' :
                        'ihub-badge-secondary'
                      } ihub-me-2`}>
                        {role.id}
                      </span>
                      {role.title}
                    </h6>
                  </div>
                  <div className="ihub-card-body">
                    <p className="text-muted" style={{ fontSize: "13px" }}>
                      {role.id === 'LEARNER' && "Learns and consumes content"}
                      {role.id === 'BLOGGER' && "Writes and manages blogs"}
                      {role.id === 'EVENT' && "Organizes events and webinars"}
                      {role.id === 'MODERATOR' && "Manages community content"}
                      {role.id === 'INSTRUCTOR' && "Creates and manages courses"}
                      {role.id === 'ADMIN' && "Oversees platform management"}
                      {role.id === 'REGISTRAR' && "Manages enrollments and records"}
                      {role.id === 'FINANCE' && "Handles finances and transactions"}
                      {role.id === 'SUPER_ADMIN' && "Ultimate platform authority"}
                    </p>
                    
                    <div className="ihub-mt-2">
                      <small className="text-muted">
                        <strong>Access Level:</strong> {accessibleFeatures.length} features
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* User Management Demo */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">User Management Interface</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-8">
            <div className="ihub-card ihub-p-4">
              <h6>Current Users</h6>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Role</th>
                      <th>Department</th>
                      <th>Access Level</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => {
                      const accessCount = getAccessibleFeatures(user.role).length;
                      return (
                        <tr key={user.id}>
                          <td>{user.username}</td>
                          <td>
                            <span className={`ihub-badge ${
                              user.role === 'SUPER_ADMIN' || user.role === 'ADMIN' ? 'ihub-badge-danger' :
                              user.role === 'INSTRUCTOR' ? 'ihub-badge-primary' :
                              user.role === 'LEARNER' ? 'ihub-badge-success' :
                              'ihub-badge-secondary'
                            }`}>
                              {getRoleDescription(user.role)}
                            </span>
                          </td>
                          <td>{user.department}</td>
                          <td>
                            <span className="ihub-badge ihub-badge-light">
                              {accessCount} features
                            </span>
                          </td>
                          <td>
                            <button
                              className="ihub-btn ihub-btn-outline-primary ihub-btn-sm"
                              onClick={() => setSelectedUser({
                                role: user.role,
                                username: user.username,
                                permissions: getAccessibleFeatures(user.role)
                              })}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-p-4">
              <h6>User Details</h6>
              {selectedUser.username ? (
                <>
                  <div className="ihub-mb-3">
                    <strong>Username:</strong> {selectedUser.username}<br />
                    <strong>Role:</strong> <span className="ihub-badge ihub-badge-primary">{selectedUser.role}</span>
                  </div>
                  
                  <h6>Accessible Features:</h6>
                  <div className="ihub-list-group" style={{ fontSize: "12px" }}>
                    {selectedUser.permissions.map((permission, index) => (
                      <div key={index} className="ihub-list-group-item ihub-py-1">
                        {permission.replace('CHANNEL_', '').replace('_ROLES', '')}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-muted">Select a user to view details</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Access Control Testing */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Access Control Testing</h2>
        <div className="ihub-card ihub-p-4">
          <h6>Permission Checker</h6>
          <div className="ihub-row">
            <div className="ihub-col-md-4">
              <div className="ihub-mb-3">
                <label className="ihub-form-label">User Role:</label>
                <select
                  className="ihub-form-control"
                  value={accessCheck.role}
                  onChange={(e) => setAccessCheck(prev => ({ ...prev, role: e.target.value as RoleType }))}
                >
                  {INSTRUCTOR_TYPE.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="ihub-col-md-4">
              <div className="ihub-mb-3">
                <label className="ihub-form-label">Feature Access:</label>
                <select
                  className="ihub-form-control"
                  value={accessCheck.feature}
                  onChange={(e) => setAccessCheck(prev => ({ ...prev, feature: e.target.value as RoleGroupKey }))}
                >
                  {Object.keys(ROLE_GROUPING).map((groupKey) => (
                    <option key={groupKey} value={groupKey}>
                      {groupKey.replace('CHANNEL_', '').replace('_ROLES', '')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="ihub-col-md-4">
              <div className="ihub-mb-3">
                <label className="ihub-form-label">Check Access:</label><br />
                <button
                  className="ihub-btn ihub-btn-primary"
                  onClick={() => checkAccess(accessCheck.role, accessCheck.feature)}
                >
                  Validate Permission
                </button>
              </div>
            </div>
          </div>

          <div className={`ihub-alert ${accessCheck.hasAccess ? 'ihub-alert-success' : 'ihub-alert-danger'}`}>
            <strong>Access Result:</strong> {accessCheck.role} {accessCheck.hasAccess ? 'HAS' : 'DOES NOT HAVE'} access to {accessCheck.feature.replace('CHANNEL_', '').replace('_ROLES', '')} features.
          </div>
        </div>
      </section>

      {/* Role Grouping Matrix */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Permission Matrix</h2>
        <div className="ihub-card ihub-p-4">
          <h6>Role Access Matrix</h6>
          <div className="table-responsive">
            <table className="table table-bordered" style={{ fontSize: "11px" }}>
              <thead>
                <tr>
                  <th>Role</th>
                  {Object.keys(ROLE_GROUPING).map((groupKey) => (
                    <th key={groupKey} className="text-center" style={{ minWidth: "80px" }}>
                      {groupKey.replace('CHANNEL_', '').replace('_ROLES', '')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INSTRUCTOR_TYPE.map((role) => (
                  <tr key={role.id}>
                    <td>
                      <span className={`ihub-badge ${
                        role.id === 'SUPER_ADMIN' ? 'ihub-badge-danger' :
                        role.id === 'ADMIN' ? 'ihub-badge-warning' :
                        role.id === 'INSTRUCTOR' ? 'ihub-badge-primary' :
                        'ihub-badge-secondary'
                      }`}>
                        {role.id}
                      </span>
                    </td>
                    {Object.keys(ROLE_GROUPING).map((groupKey) => {
                      const hasAccess = adminAccessValidation(role.id, groupKey);
                      return (
                        <td key={groupKey} className="text-center">
                          <span className={`ihub-badge ${hasAccess ? 'ihub-badge-success' : 'ihub-badge-light'}`}>
                            {hasAccess ? '✓' : '✗'}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Implementation Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Implementation Patterns</h2>
        
        {/* React Hook Pattern */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-shield ihub-me-2"></i>
              Access Control Hook
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Custom hook for role-based access control
import { useSession } from 'next-auth/react';
import { adminAccessValidation, RoleType, RoleGroupKey } from '@instincthub/react-ui/lib';

interface UseRoleAccessReturn {
  hasAccess: (feature: RoleGroupKey) => boolean;
  userRole: RoleType | null;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  canAccessAdminPanel: boolean;
}

export const useRoleAccess = (): UseRoleAccessReturn => {
  const { data: session } = useSession();
  const userRole = session?.user?.role as RoleType | null;

  const hasAccess = useCallback((feature: RoleGroupKey) => {
    if (!userRole) return false;
    return adminAccessValidation(userRole, feature);
  }, [userRole]);

  const isAdmin = useMemo(() => {
    return userRole === 'ADMIN' || userRole === 'SUPER_ADMIN';
  }, [userRole]);

  const isSuperAdmin = useMemo(() => {
    return userRole === 'SUPER_ADMIN';
  }, [userRole]);

  const canAccessAdminPanel = useMemo(() => {
    return hasAccess('CHANNEL_ADMIN_ROLES');
  }, [hasAccess]);

  return {
    hasAccess,
    userRole,
    isAdmin,
    isSuperAdmin,
    canAccessAdminPanel
  };
};

// Usage in component
const AdminDashboard = () => {
  const { hasAccess, canAccessAdminPanel, userRole } = useRoleAccess();

  if (!canAccessAdminPanel) {
    return <UnauthorizedAccess />;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {hasAccess('CHANNEL_FINANCE_ROLES') && (
        <FinanceSection />
      )}
      {hasAccess('CHANNEL_REGISTRAR_ROLES') && (
        <RegistrarSection />
      )}
    </div>
  );
};`}
            </pre>
          </div>
        </div>

        {/* Route Protection Pattern */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-lock ihub-me-2"></i>
              Route Protection Implementation
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Higher-order component for route protection
import React from 'react';
import { useRouter } from 'next/router';
import { adminAccessValidation, RoleGroupKey } from '@instincthub/react-ui/lib';

interface WithRoleProtectionProps {
  requiredRole: RoleGroupKey;
  fallbackComponent?: React.ComponentType;
}

export const withRoleProtection = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithRoleProtectionProps
) => {
  return function ProtectedComponent(props: P) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'loading') return; // Still loading

      if (!session) {
        router.push('/auth/login');
        return;
      }

      const userRole = session.user?.role;
      if (!adminAccessValidation(userRole, options.requiredRole)) {
        router.push('/unauthorized');
        return;
      }
    }, [session, status, router]);

    // Show loading while checking
    if (status === 'loading') {
      return <LoadingSpinner />;
    }

    // Show fallback if no access
    if (!session || !adminAccessValidation(session.user?.role, options.requiredRole)) {
      return options.fallbackComponent ? 
        <options.fallbackComponent /> : 
        <UnauthorizedAccess />;
    }

    return <WrappedComponent {...props} />;
  };
};

// Usage
const InstructorDashboard = () => {
  return <div>Instructor Dashboard Content</div>;
};

export default withRoleProtection(InstructorDashboard, {
  requiredRole: 'CHANNEL_INSTRUCTOR_ROLES',
  fallbackComponent: UnauthorizedAccess
});`}
            </pre>
          </div>
        </div>

        {/* API Route Protection */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-server ihub-me-2"></i>
              API Route Protection
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// API route middleware for role-based access
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { adminAccessValidation, RoleGroupKey } from '@instincthub/react-ui/lib';

export const withRoleAuth = (
  requiredRole: RoleGroupKey,
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const session = await getServerSession(req, res, authOptions);

      if (!session) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const userRole = session.user?.role;
      if (!adminAccessValidation(userRole, requiredRole)) {
        return res.status(403).json({ 
          error: 'Insufficient permissions',
          required: requiredRole,
          current: userRole
        });
      }

      return handler(req, res);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
};

// Usage in API routes
// pages/api/admin/users.ts
export default withRoleAuth('CHANNEL_ADMIN_ROLES', async (req, res) => {
  if (req.method === 'GET') {
    const users = await getUserList();
    res.json(users);
  } else if (req.method === 'POST') {
    const newUser = await createUser(req.body);
    res.json(newUser);
  }
});

// pages/api/finance/reports.ts
export default withRoleAuth('CHANNEL_FINANCE_ROLES', async (req, res) => {
  const financialReports = await getFinancialReports();
  res.json(financialReports);
});`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoleManagementExamples;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import {
  INSTRUCTOR_TYPE,
  ROLE_GROUPING,
  adminAccessValidation,
  RoleType,
  RoleGroupKey
} from '@instincthub/react-ui/lib';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { useSession } from 'next-auth/react';
import { adminAccessValidation } from '@instincthub/react-ui/lib';

function ProtectedFeature() {
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  const canAccessFinance = adminAccessValidation(userRole, 'CHANNEL_FINANCE_ROLES');

  if (!canAccessFinance) {
    return <div>You don't have permission to access this feature.</div>;
  }

  return <div>Finance Dashboard Content</div>;
}
```

## 🔧 Available Types & Functions

### Role Types

```tsx
type RoleType =
  | "LEARNER"
  | "BLOGGER" 
  | "EVENT"
  | "MODERATOR"
  | "INSTRUCTOR"
  | "ADMIN"
  | "REGISTRAR"
  | "FINANCE"
  | "SUPER_ADMIN";

type RoleGroupKey =
  | "CHANNEL_LEARNER_ROLES"
  | "CHANNEL_BLOGGER_ROLES"
  | "CHANNEL_EVENT_ROLES"
  | "CHANNEL_MODERATOR_ROLES"
  | "CHANNEL_INSTRUCTOR_ROLES"
  | "CHANNEL_ADMIN_ROLES"
  | "CHANNEL_REGISTRAR_ROLES"
  | "CHANNEL_FINANCE_ROLES"
  | "CHANNEL_SUPER_ADMIN_ROLES";
```

### Constants

#### `INSTRUCTOR_TYPE: Array<{ id: string; title: string }>`
Array of all available roles with their IDs and display titles.

#### `ROLE_GROUPING: Record<RoleGroupKey, RoleType[]>`
Mapping of feature groups to the roles that can access them.

### Functions

#### `adminAccessValidation(role: string, group: string): boolean`
Validates if a given role has access to a specific feature group.

## 📊 Role Hierarchy

### Access Levels (Lowest to Highest)
1. **LEARNER** - Base level, accesses learning content
2. **BLOGGER** - Can create blog content
3. **EVENT** - Can organize events and webinars
4. **MODERATOR** - Can moderate community content
5. **INSTRUCTOR** - Can create and manage courses
6. **ADMIN** - Platform administration access
7. **REGISTRAR** - Student enrollment management
8. **FINANCE** - Financial transactions and reporting
9. **SUPER_ADMIN** - Ultimate platform control

### Permission Inheritance
- Higher roles automatically inherit permissions from lower roles
- SUPER_ADMIN has access to all features
- Each role group defines which roles can access specific features

## 💡 Use Cases

- **Educational Platforms**: Manage student, instructor, and admin permissions
- **Content Management**: Control who can create, edit, and publish content
- **Financial Systems**: Restrict access to financial data and operations
- **User Management**: Control administrative functions based on role
- **Feature Gating**: Show/hide features based on user permissions
- **API Security**: Protect endpoints with role-based authentication
- **Multi-tenant Applications**: Manage permissions across organizations

## 🛡️ Security Features

- **Type Safety**: Full TypeScript support with strict typing
- **Validation Function**: Centralized permission checking
- **Hierarchical Access**: Automatic permission inheritance
- **Error Handling**: Graceful handling of invalid roles/groups
- **Extensible Design**: Easy to add new roles and permissions

## 🔗 Related Utilities

- [permissions](./permissions.md) - Additional permission utilities
- [headerUsernamePermission](./permissions.md#headerusernamepermission) - Request validation utilities
- [utils](./utils.md) - General utility constants and types