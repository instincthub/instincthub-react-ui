# hasUserPermission

A utility function that checks if a user has the required permission by verifying if the `accessType` exists in the `permissions` array.

## Import

```typescript
import { hasUserPermission } from "@instincthub/react-ui/lib";
```

## Usage

```typescript
// Basic usage with provided permissions
const canAccessAdmin = hasUserPermission({
  accessType: 'ADMIN',
  permissions: ['USER', 'ADMIN', 'MODERATOR']
});
console.log(canAccessAdmin); // true

// Using specific role-based permissions
const hasInstructorAccess = hasUserPermission({
  accessType: 'INSTRUCTOR',
  roleName: 'INSTRUCTOR'
});
console.log(hasInstructorAccess); // true (uses CHANNEL_INSTRUCTOR_ROLES)

// Using admin role permissions
const hasAdminAccess = hasUserPermission({
  accessType: 'ADMIN', 
  roleName: 'ADMIN'
});
console.log(hasAdminAccess); // true (uses CHANNEL_ADMIN_ROLES)

// Using finance role permissions
const hasFinanceAccess = hasUserPermission({
  accessType: 'FINANCE',
  roleName: 'FINANCE'
});
console.log(hasFinanceAccess); // true (uses CHANNEL_FINANCE_ROLES)

// Fallback to default when roleName doesn't match
const hasDefaultAccess = hasUserPermission({
  accessType: 'LEARNER',
  roleName: 'INVALID_ROLE'
});
console.log(hasDefaultAccess); // true (falls back to CHANNEL_LEARNER_ROLES)

// Using default permissions when no role specified
const hasLearnerAccess = hasUserPermission({
  accessType: 'LEARNER'
});
console.log(hasLearnerAccess); // true (uses default CHANNEL_LEARNER_ROLES)

// Case-insensitive matching
const hasPermission = hasUserPermission({
  accessType: 'admin',
  permissions: ['USER', 'ADMIN', 'MODERATOR']
});
console.log(hasPermission); // true (matches 'ADMIN')
```

## React Component Example

```tsx
import React from 'react';
import { hasUserPermission } from "@instincthub/react-ui/lib";

interface User {
  name: string;
  permissions?: string[]; // Optional - will use default CHANNEL_LEARNER_ROLES
}

const AdminPanel: React.FC<{ user: User }> = ({ user }) => {
  // With explicit permissions
  const isAdmin = hasUserPermission({
    accessType: 'ADMIN',
    permissions: user.permissions
  });

  // Using default permissions when user.permissions is undefined
  const isInstructor = hasUserPermission({
    accessType: 'INSTRUCTOR',
    permissions: user.permissions
  });

  // Completely default - no permissions provided
  const hasDefaultLearnerAccess = hasUserPermission({
    accessType: 'LEARNER'
  });

  return (
    <div>
      {isAdmin && (
        <div>
          <h2>Admin Dashboard</h2>
          <p>Welcome to the admin panel</p>
        </div>
      )}
      
      {isInstructor && (
        <div>
          <h3>Instructor Panel</h3>
          <button>Manage Courses</button>
        </div>
      )}
      
      {hasDefaultLearnerAccess && (
        <div>
          <h3>Default Access</h3>
          <p>Basic learner access granted</p>
        </div>
      )}
      
      {!isAdmin && !isInstructor && (
        <div>
          <p>Limited access - contact admin for more permissions</p>
        </div>
      )}
    </div>
  );
};
```

## Conditional Rendering with Multiple Permissions

```tsx
const FeatureAccess: React.FC<{ userPermissions: string[] }> = ({ userPermissions }) => {
  const permissions = {
    canRead: hasUserPermission({ 
      accessType: 'READ', 
      permissions: userPermissions 
    }),
    canWrite: hasUserPermission({ 
      accessType: 'WRITE', 
      permissions: userPermissions 
    }),
    canDelete: hasUserPermission({ 
      accessType: 'DELETE', 
      permissions: userPermissions 
    }),
    canManageUsers: hasUserPermission({ 
      accessType: 'MANAGE_USERS', 
      permissions: userPermissions 
    })
  };

  return (
    <div>
      <h3>Available Actions:</h3>
      <div className="actions">
        {permissions.canRead && <button>View Data</button>}
        {permissions.canWrite && <button>Edit Data</button>}
        {permissions.canDelete && <button>Delete Data</button>}
        {permissions.canManageUsers && <button>Manage Users</button>}
      </div>
    </div>
  );
};
```

## API Route Protection

```typescript
// pages/api/admin/users.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { hasUserPermission } from "@instincthub/react-ui/lib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  
  if (!session?.user?.permissions) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const hasAdminAccess = hasUserPermission({
    accessType: 'ADMIN',
    permissions: session.user.permissions
  });

  if (!hasAdminAccess) {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }

  // Handle admin operations
  switch (req.method) {
    case 'GET':
      // Return users list
      break;
    case 'POST':
      // Create new user
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accessType` | `string` | Yes | The permission type to check for |
| `permissions` | `string[]` or `InstructorType[]` | No | Array of user permissions (defaults to `CHANNEL_LEARNER_ROLES` if not provided) |

## Default Permissions

When `permissions` is not provided, the function uses `CHANNEL_LEARNER_ROLES` which includes:
- `"LEARNER"`
- `"BLOGGER"`
- `"MODERATOR"`
- `"INSTRUCTOR"`
- `"ADMIN"`
- `"REGISTRAR"`
- `"FINANCE"`
- `"SUPER ADMIN"`

## Returns

- **Type**: `boolean`
- **Value**: `true` if the `accessType` exists in the `permissions` array (case-insensitive), `false` otherwise

## Features

- **Case-insensitive matching**: Permissions are compared in lowercase
- **Null safety**: Returns `false` if either `accessType` or `permissions` is missing
- **Simple API**: Takes a single object parameter for clarity
- **TypeScript support**: Fully typed for better development experience