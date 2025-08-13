# PermissionWrapper

A React component that conditionally renders children based on user permissions using the `hasUserPermission` function. This component provides a declarative way to implement role-based access control in your UI.

## Import

```tsx
import { PermissionWrapper } from "@instincthub/react-ui";
```

## Basic Usage

```tsx
import React from "react";
import { PermissionWrapper } from "@instincthub/react-ui";

const MyComponent = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Basic permission check */}
      <PermissionWrapper accessType="ADMIN">
        <AdminPanel />
      </PermissionWrapper>
      
      {/* With custom fallback */}
      <PermissionWrapper
        accessType="INSTRUCTOR"
        fallback={<div>You need instructor permissions to view this content.</div>}
      >
        <InstructorDashboard />
      </PermissionWrapper>
      
      {/* Hide completely when denied */}
      <PermissionWrapper
        accessType="FINANCE"
        hideOnDeny={true}
      >
        <FinancialReports />
      </PermissionWrapper>
    </div>
  );
};
```

## Advanced Usage

```tsx
import React from "react";
import { PermissionWrapper } from "@instincthub/react-ui";

const AdvancedExample = () => {
  // Explicit permissions array
  const userPermissions = ['USER', 'MODERATOR', 'ADMIN'];
  
  return (
    <div>
      {/* Using explicit permissions */}
      <PermissionWrapper
        accessType="ADMIN"
        permissions={userPermissions}
        className="admin-section"
        fallback={
          <div className="ihub-alert ihub-alert-warning">
            <h5>Access Restricted</h5>
            <p>Administrator privileges required.</p>
          </div>
        }
      >
        <AdminControls />
      </PermissionWrapper>
      
      {/* Using role-based permissions */}
      <PermissionWrapper
        accessType="INSTRUCTOR"
        roleName="INSTRUCTOR"
        className="instructor-panel"
      >
        <CourseManagement />
      </PermissionWrapper>
      
      {/* Multiple permission levels */}
      <PermissionWrapper
        accessType="FINANCE"
        roleName="FINANCE"
        fallback={
          <div className="ihub-text-muted">
            Contact your administrator for finance access.
          </div>
        }
      >
        <BillingDashboard />
      </PermissionWrapper>
      
      {/* Nested permission checks */}
      <PermissionWrapper accessType="ADMIN">
        <div className="admin-section">
          <h2>Admin Area</h2>
          
          <PermissionWrapper
            accessType="SUPER ADMIN"
            roleName="SUPER_ADMIN"
            hideOnDeny={true}
          >
            <SuperAdminTools />
          </PermissionWrapper>
        </div>
      </PermissionWrapper>
    </div>
  );
};
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `accessType` | `string` | Yes | - | The permission type to check for |
| `permissions` | `string[]` \| `InstructorType[]` | No | - | Array of user permissions (overrides roleName) |
| `roleName` | `string` | No | - | Role name to select predefined permission set |
| `children` | `ReactNode` | Yes | - | Content to render when permission is granted |
| `fallback` | `ReactNode` | No | `"Permission denied"` | Content to render when permission is denied |
| `className` | `string` | No | `""` | Additional CSS class names for the wrapper |
| `hideOnDeny` | `boolean` | No | `false` | Whether to render nothing when permission is denied |

## Permission Strategies

### 1. Explicit Permissions
Pass a specific array of permissions to check against:

```tsx
<PermissionWrapper
  accessType="ADMIN"
  permissions={['USER', 'MODERATOR', 'ADMIN']}
>
  <AdminContent />
</PermissionWrapper>
```

### 2. Role-Based Permissions
Use predefined role permission sets:

```tsx
<PermissionWrapper
  accessType="INSTRUCTOR"
  roleName="INSTRUCTOR"
>
  <InstructorContent />
</PermissionWrapper>
```

### 3. Default Permissions
Use the default `CHANNEL_LEARNER_ROLES` when no permissions or role is specified:

```tsx
<PermissionWrapper accessType="LEARNER">
  <LearnerContent />
</PermissionWrapper>
```

## Styling and Layout

### With CSS Classes
```tsx
<PermissionWrapper
  accessType="ADMIN"
  className="ihub-admin-wrapper ihub-p-4 ihub-border"
  fallback={
    <div className="ihub-alert ihub-alert-danger">
      Admin access required
    </div>
  }
>
  <AdminPanel />
</PermissionWrapper>
```

### Conditional Styling
```tsx
const MyComponent = ({ userRole }: { userRole: string }) => {
  const isAdmin = userRole === 'ADMIN';
  
  return (
    <PermissionWrapper
      accessType="ADMIN"
      className={`dashboard ${isAdmin ? 'admin-dashboard' : 'user-dashboard'}`}
    >
      <Dashboard />
    </PermissionWrapper>
  );
};
```

## Common Patterns

### Navigation Menu
```tsx
const NavigationMenu = () => {
  return (
    <nav className="ihub-navbar">
      <ul>
        <li>
          <PermissionWrapper accessType="LEARNER" hideOnDeny>
            <a href="/dashboard">Dashboard</a>
          </PermissionWrapper>
        </li>
        
        <li>
          <PermissionWrapper accessType="INSTRUCTOR" hideOnDeny>
            <a href="/courses">Manage Courses</a>
          </PermissionWrapper>
        </li>
        
        <li>
          <PermissionWrapper accessType="ADMIN" hideOnDeny>
            <a href="/admin">Admin Panel</a>
          </PermissionWrapper>
        </li>
        
        <li>
          <PermissionWrapper accessType="FINANCE" hideOnDeny>
            <a href="/billing">Billing</a>
          </PermissionWrapper>
        </li>
      </ul>
    </nav>
  );
};
```

### Conditional Form Fields
```tsx
const UserForm = () => {
  return (
    <form>
      <div className="ihub-form-group">
        <label>Name</label>
        <input type="text" name="name" />
      </div>
      
      <PermissionWrapper accessType="ADMIN" hideOnDeny>
        <div className="ihub-form-group">
          <label>Admin Notes</label>
          <textarea name="adminNotes" />
        </div>
      </PermissionWrapper>
      
      <PermissionWrapper
        accessType="FINANCE"
        fallback={
          <div className="ihub-text-muted">
            Contact finance for billing changes
          </div>
        }
      >
        <div className="ihub-form-group">
          <label>Billing Rate</label>
          <input type="number" name="billingRate" />
        </div>
      </PermissionWrapper>
    </form>
  );
};
```

### Error Boundaries with Permissions
```tsx
const ProtectedComponent = () => {
  return (
    <PermissionWrapper
      accessType="ADMIN"
      fallback={
        <div className="ihub-card ihub-p-4">
          <div className="ihub-alert ihub-alert-warning">
            <h5>
              <i className="pi pi-exclamation-triangle"></i>
              Access Denied
            </h5>
            <p>You don't have the necessary permissions to view this content.</p>
            <button className="ihub-btn ihub-btn-primary">
              Request Access
            </button>
          </div>
        </div>
      }
    >
      <AdminDashboard />
    </PermissionWrapper>
  );
};
```

## Integration with Hooks

You can combine `PermissionWrapper` with custom hooks for more dynamic behavior:

```tsx
import { useSession } from "next-auth/react";

const DynamicPermissionExample = () => {
  const { data: session } = useSession();
  
  return (
    <div>
      <PermissionWrapper
        accessType="ADMIN"
        permissions={session?.user?.permissions}
        fallback={
          <div>
            Welcome, {session?.user?.name}! You have limited access.
          </div>
        }
      >
        <FullAccessDashboard user={session?.user} />
      </PermissionWrapper>
    </div>
  );
};
```

## Best Practices

1. **Use `hideOnDeny` for navigation items** to avoid showing empty spaces
2. **Provide meaningful fallback content** instead of generic "Permission denied" messages
3. **Combine with loading states** for better user experience
4. **Use CSS classes** for consistent styling across permission-protected content
5. **Nest permissions logically** - broader permissions first, then more specific ones
6. **Consider accessibility** - ensure fallback content is screen reader friendly

## Security Considerations

- This component is for **UI control only** - always validate permissions on the server side
- The permission check happens on every render - consider memoization for expensive operations
- Sensitive data should never be sent to the client if the user lacks permissions
- Use this component in combination with proper API endpoint protection

## Related Components

- [hasUserPermission](../lib/permissions.md) - The underlying permission checking function
- [ClientDetector](./ClientDetector.md) - Client-side rendering detection
- [LoginForm](./LoginForm.md) - Authentication component