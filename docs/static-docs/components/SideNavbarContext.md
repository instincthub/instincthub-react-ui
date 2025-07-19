# SideNavbarContext

A React context provider that manages side navigation state including expansion, active items, group states, mobile detection, and responsive behavior. This component provides a centralized state management solution for complex sidebar navigation interfaces with localStorage persistence.

## Features

- **State Management**: Centralized sidebar state with React Context
- **Responsive Design**: Automatic mobile detection and responsive behavior
- **Persistence**: localStorage integration for state persistence
- **Group Management**: Expandable navigation groups with state tracking
- **Active Item Tracking**: Current navigation item state management
- **Width Control**: Dynamic sidebar width management and resizing
- **Performance Optimized**: Memoized callbacks and efficient state updates

## Props

### SideNavProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Child components to wrap with navigation context |
| `defaultExpanded` | `boolean` | `true` | Initial expanded state of the sidebar |
| `persistStateKey` | `string` | `"ihub-sidenav-expanded"` | localStorage key for state persistence |
| `darkMode` | `boolean` | `false` | Whether to use dark theme styling |
| `defaultWidth` | `number \| string` | `240` | Default width of the expanded sidebar |

### Context Values (useSideNav Hook)

```tsx
interface SideNavContextProps {
  isExpanded: boolean;
  toggleExpanded: () => void;
  setExpanded: (expanded: boolean) => void;
  isMobile: boolean;
  activeItemId: string | null;
  setActiveItem: (id: string) => void;
  expandedGroups: Set<string>;
  toggleGroup: (id: string) => void;
  darkMode: boolean;
  sidebarWidth: number | string;
  updateSidebarWidth: (width: number | string) => void;
}
```

## Basic Usage

```tsx
"use client";

import React from 'react';
import { SideNavProvider, useSideNav } from 'instincthub-react-ui';

function NavigationContent() {
  const { isExpanded, toggleExpanded, isMobile } = useSideNav();

  return (
    <div style={{ display: 'flex' }}>
      <aside style={{
        width: isExpanded ? 240 : 64,
        backgroundColor: '#f8f9fa',
        transition: 'width 0.3s ease',
        padding: '16px'
      }}>
        <button onClick={toggleExpanded}>
          {isExpanded ? '← Collapse' : '→ Expand'}
        </button>
        
        {isExpanded && (
          <nav>
            <h3>Navigation</h3>
            <ul>
              <li>Dashboard</li>
              <li>Settings</li>
              <li>Profile</li>
            </ul>
          </nav>
        )}
      </aside>
      
      <main style={{ flex: 1, padding: '20px' }}>
        <h1>Main Content</h1>
        <p>Mobile mode: {isMobile ? 'Yes' : 'No'}</p>
        <p>Sidebar: {isExpanded ? 'Expanded' : 'Collapsed'}</p>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <SideNavProvider defaultExpanded={true} persistStateKey="my-app-sidebar">
      <NavigationContent />
    </SideNavProvider>
  );
}
```

## Advanced Usage

### Multi-Level Navigation with Groups

```tsx
"use client";

import React, { useState } from 'react';
import { SideNavProvider, useSideNav } from 'instincthub-react-ui';

interface NavItem {
  id: string;
  title: string;
  icon?: string;
  children?: NavItem[];
  href?: string;
}

const navigationItems: NavItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: '📊',
    href: '/dashboard'
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: '📂',
    children: [
      { id: 'active-projects', title: 'Active Projects', href: '/projects/active' },
      { id: 'archived-projects', title: 'Archived', href: '/projects/archived' },
      { id: 'templates', title: 'Templates', href: '/projects/templates' }
    ]
  },
  {
    id: 'team',
    title: 'Team',
    icon: '👥',
    children: [
      { id: 'members', title: 'Members', href: '/team/members' },
      { id: 'roles', title: 'Roles & Permissions', href: '/team/roles' },
      { id: 'invitations', title: 'Invitations', href: '/team/invitations' }
    ]
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: '⚙️',
    children: [
      { id: 'general', title: 'General', href: '/settings/general' },
      { id: 'security', title: 'Security', href: '/settings/security' },
      { id: 'integrations', title: 'Integrations', href: '/settings/integrations' }
    ]
  }
];

function NavigationItem({ item, level = 0 }: { item: NavItem; level?: number }) {
  const { 
    activeItemId, 
    setActiveItem, 
    expandedGroups, 
    toggleGroup, 
    isExpanded 
  } = useSideNav();

  const hasChildren = item.children && item.children.length > 0;
  const isActive = activeItemId === item.id;
  const isGroupExpanded = expandedGroups.has(item.id);
  const indentLevel = level * 20;

  const handleClick = () => {
    if (hasChildren) {
      toggleGroup(item.id);
    } else if (item.href) {
      setActiveItem(item.id);
      // Navigate to href
      console.log(`Navigating to: ${item.href}`);
    }
  };

  return (
    <div>
      <div
        onClick={handleClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
          marginLeft: indentLevel,
          cursor: 'pointer',
          backgroundColor: isActive ? '#e3f2fd' : 'transparent',
          borderRadius: '6px',
          margin: '2px 8px',
          color: isActive ? '#1976d2' : '#666',
          fontWeight: isActive ? 'bold' : 'normal',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = isActive ? '#e3f2fd' : '#f5f5f5';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = isActive ? '#e3f2fd' : 'transparent';
        }}
      >
        {isExpanded && item.icon && (
          <span style={{ marginRight: '12px', fontSize: '16px' }}>
            {item.icon}
          </span>
        )}
        
        {isExpanded && (
          <span style={{ flex: 1 }}>{item.title}</span>
        )}
        
        {isExpanded && hasChildren && (
          <span style={{ 
            transform: isGroupExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            fontSize: '12px'
          }}>
            ▶
          </span>
        )}
      </div>

      {hasChildren && isGroupExpanded && isExpanded && (
        <div style={{ marginLeft: '8px' }}>
          {item.children!.map(child => (
            <NavigationItem key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function AdvancedSidebar() {
  const { isExpanded, toggleExpanded, sidebarWidth, isMobile } = useSideNav();

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarWidth,
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e1e5e9',
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        position: isMobile ? 'fixed' : 'relative',
        height: '100vh',
        zIndex: isMobile ? 1000 : 'auto',
        boxShadow: isMobile ? '2px 0 10px rgba(0,0,0,0.1)' : 'none'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px',
          borderBottom: '1px solid #e1e5e9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {isExpanded && (
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
              InstinctHub
            </h2>
          )}
          <button
            onClick={toggleExpanded}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '4px',
              fontSize: '16px'
            }}
            title={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isExpanded ? '◄' : '►'}
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ 
          flex: 1, 
          overflowY: 'auto',
          padding: '16px 0'
        }}>
          {navigationItems.map(item => (
            <NavigationItem key={item.id} item={item} />
          ))}
        </nav>

        {/* Footer */}
        {isExpanded && (
          <div style={{
            padding: '16px',
            borderTop: '1px solid #e1e5e9',
            backgroundColor: '#f8f9fa'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                backgroundColor: '#4f46e5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                JD
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>John Doe</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Administrator</div>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile backdrop */}
      {isMobile && isExpanded && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999
          }}
          onClick={toggleExpanded}
        />
      )}

      {/* Main content */}
      <main style={{
        flex: 1,
        padding: '24px',
        backgroundColor: '#f8fafc',
        marginLeft: isMobile ? 0 : 0
      }}>
        <div style={{ maxWidth: '1200px' }}>
          <header style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
              Dashboard
            </h1>
            <p style={{ color: '#6b7280', marginTop: '8px' }}>
              Welcome back! Here's what's happening with your projects.
            </p>
          </header>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid #e1e5e9'
            }}>
              <h3>Active Projects</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#4f46e5' }}>
                12
              </p>
            </div>

            <div style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid #e1e5e9'
            }}>
              <h3>Team Members</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#059669' }}>
                24
              </p>
            </div>

            <div style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid #e1e5e9'
            }}>
              <h3>Completed Tasks</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#dc2626' }}>
                156
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AdvancedNavigationDemo() {
  return (
    <SideNavProvider 
      defaultExpanded={true}
      persistStateKey="advanced-nav-demo"
      defaultWidth={280}
    >
      <AdvancedSidebar />
    </SideNavProvider>
  );
}
```

### Resizable Sidebar with Width Control

```tsx
"use client";

import React, { useState, useRef, useCallback } from 'react';
import { SideNavProvider, useSideNav } from 'instincthub-react-ui';

function ResizableSidebar() {
  const { 
    isExpanded, 
    toggleExpanded, 
    sidebarWidth, 
    updateSidebarWidth,
    activeItemId,
    setActiveItem
  } = useSideNav();
  
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const startResize = useCallback((e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  }, []);

  const stopResize = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback((e: MouseEvent) => {
    if (isResizing && isExpanded) {
      const newWidth = e.clientX;
      if (newWidth >= 200 && newWidth <= 400) {
        updateSidebarWidth(newWidth);
      }
    }
  }, [isResizing, isExpanded, updateSidebarWidth]);

  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', stopResize);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', stopResize);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, resize, stopResize]);

  const menuItems = [
    { id: 'home', title: 'Home', icon: '🏠' },
    { id: 'analytics', title: 'Analytics', icon: '📊' },
    { id: 'users', title: 'Users', icon: '👥' },
    { id: 'settings', title: 'Settings', icon: '⚙️' },
    { id: 'help', title: 'Help & Support', icon: '❓' }
  ];

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div
        ref={sidebarRef}
        style={{
          width: sidebarWidth,
          backgroundColor: '#1e293b',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          transition: isResizing ? 'none' : 'width 0.3s ease'
        }}
      >
        {/* Header */}
        <div style={{ 
          padding: '20px', 
          borderBottom: '1px solid #334155',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {isExpanded && (
            <h2 style={{ margin: 0, fontSize: '20px' }}>Dashboard</h2>
          )}
          <button
            onClick={toggleExpanded}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          >
            {isExpanded ? '◄' : '►'}
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '16px 0' }}>
          {menuItems.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 20px',
                cursor: 'pointer',
                backgroundColor: activeItemId === item.id ? '#3b82f6' : 'transparent',
                borderRadius: activeItemId === item.id ? '0 25px 25px 0' : 'none',
                margin: '4px 0',
                marginRight: activeItemId === item.id ? '8px' : '0',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (activeItemId !== item.id) {
                  e.currentTarget.style.backgroundColor = '#334155';
                }
              }}
              onMouseLeave={(e) => {
                if (activeItemId !== item.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span style={{ fontSize: '18px', marginRight: isExpanded ? '12px' : '0' }}>
                {item.icon}
              </span>
              {isExpanded && <span>{item.title}</span>}
            </div>
          ))}
        </nav>

        {/* Width Display */}
        {isExpanded && (
          <div style={{
            padding: '16px 20px',
            borderTop: '1px solid #334155',
            fontSize: '12px',
            color: '#94a3b8'
          }}>
            Width: {typeof sidebarWidth === 'number' ? `${sidebarWidth}px` : sidebarWidth}
          </div>
        )}

        {/* Resize Handle */}
        {isExpanded && (
          <div
            onMouseDown={startResize}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '4px',
              cursor: 'col-resize',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#3b82f6';
            }}
            onMouseLeave={(e) => {
              if (!isResizing) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          />
        )}
      </div>

      {/* Main Content */}
      <main style={{
        flex: 1,
        padding: '32px',
        backgroundColor: '#f1f5f9'
      }}>
        <h1>Resizable Sidebar Demo</h1>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '8px',
          marginTop: '24px'
        }}>
          <h3>Sidebar Controls</h3>
          <p><strong>Current width:</strong> {sidebarWidth}px</p>
          <p><strong>Expanded:</strong> {isExpanded ? 'Yes' : 'No'}</p>
          <p><strong>Active item:</strong> {activeItemId || 'None'}</p>
          
          <div style={{ marginTop: '20px' }}>
            <h4>Instructions:</h4>
            <ul>
              <li>Click the arrow button to toggle expansion</li>
              <li>Drag the right edge of the sidebar to resize (when expanded)</li>
              <li>Width can be adjusted between 200px and 400px</li>
              <li>State persists in localStorage</li>
            </ul>
          </div>

          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => updateSidebarWidth(240)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                marginRight: '8px',
                cursor: 'pointer'
              }}
            >
              Reset to 240px
            </button>
            <button
              onClick={() => updateSidebarWidth(320)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Set to 320px
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ResizableSidebarDemo() {
  return (
    <SideNavProvider 
      defaultExpanded={true}
      persistStateKey="resizable-sidebar-demo"
      defaultWidth={280}
    >
      <ResizableSidebar />
    </SideNavProvider>
  );
}
```

## Form Integration

### Navigation with Form State

```tsx
"use client";

import React, { useState } from 'react';
import { SideNavProvider, useSideNav } from 'instincthub-react-ui';

interface FormData {
  name: string;
  email: string;
  role: string;
  notifications: boolean;
}

function NavigationWithForms() {
  const { activeItemId, setActiveItem, isExpanded } = useSideNav();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    role: 'user',
    notifications: true
  });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [savedData, setSavedData] = useState<FormData | null>(null);

  const navigationItems = [
    { id: 'profile', title: 'Profile Settings', icon: '👤' },
    { id: 'security', title: 'Security', icon: '🔒' },
    { id: 'notifications', title: 'Notifications', icon: '🔔' },
    { id: 'billing', title: 'Billing', icon: '💳' }
  ];

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    setSavedData({ ...formData });
    setHasUnsavedChanges(false);
    alert('Settings saved successfully!');
  };

  const handleNavigation = (itemId: string) => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm(
        'You have unsaved changes. Are you sure you want to leave this page?'
      );
      if (!confirmed) return;
    }
    setActiveItem(itemId);
    setHasUnsavedChanges(false);
  };

  const renderContent = () => {
    switch (activeItemId) {
      case 'profile':
        return (
          <div>
            <h2>Profile Settings</h2>
            <div style={{ maxWidth: '500px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '16px'
                  }}
                  placeholder="Enter your full name"
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '16px'
                  }}
                  placeholder="Enter your email"
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '16px'
                  }}
                >
                  <option value="user">User</option>
                  <option value="admin">Administrator</option>
                  <option value="moderator">Moderator</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={formData.notifications}
                    onChange={(e) => handleInputChange('notifications', e.target.checked)}
                  />
                  Enable email notifications
                </label>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div>
            <h2>Security Settings</h2>
            <div style={{ maxWidth: '500px' }}>
              <div style={{
                padding: '16px',
                backgroundColor: '#fef3c7',
                border: '1px solid #fbbf24',
                borderRadius: '6px',
                marginBottom: '20px'
              }}>
                <h4 style={{ margin: '0 0 8px 0' }}>Two-Factor Authentication</h4>
                <p style={{ margin: 0, fontSize: '14px' }}>
                  Secure your account with two-factor authentication
                </p>
                <button style={{
                  marginTop: '12px',
                  padding: '8px 16px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  Enable 2FA
                </button>
              </div>

              <div style={{
                padding: '16px',
                backgroundColor: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '6px'
              }}>
                <h4 style={{ margin: '0 0 8px 0' }}>Password Strength</h4>
                <p style={{ margin: 0, fontSize: '14px' }}>
                  Your password meets security requirements
                </p>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div>
            <h2>Notification Preferences</h2>
            <div style={{ maxWidth: '500px' }}>
              <div style={{ marginBottom: '20px' }}>
                <h4>Email Notifications</h4>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <input type="checkbox" defaultChecked />
                  New messages
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <input type="checkbox" defaultChecked />
                  Security alerts
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" />
                  Marketing updates
                </label>
              </div>

              <div>
                <h4>Push Notifications</h4>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <input type="checkbox" defaultChecked />
                  Direct messages
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" />
                  Daily digest
                </label>
              </div>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div>
            <h2>Billing Information</h2>
            <div style={{ maxWidth: '500px' }}>
              <div style={{
                padding: '20px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #e1e5e9',
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <h3 style={{ margin: '0 0 16px 0' }}>Current Plan</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Professional</div>
                    <div style={{ color: '#6b7280' }}>$29/month</div>
                  </div>
                  <button style={{
                    padding: '8px 16px',
                    backgroundColor: '#059669',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}>
                    Upgrade Plan
                  </button>
                </div>
              </div>

              <div>
                <h4>Payment Method</h4>
                <div style={{
                  padding: '16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div>•••• •••• •••• 4532</div>
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>Expires 12/25</div>
                  </div>
                  <button style={{
                    padding: '6px 12px',
                    backgroundColor: 'transparent',
                    color: '#3b82f6',
                    border: '1px solid #3b82f6',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}>
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <h2>Welcome to Settings</h2>
            <p>Select a category from the sidebar to get started.</p>
          </div>
        );
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: isExpanded ? 280 : 64,
        backgroundColor: 'white',
        borderRight: '1px solid #e1e5e9',
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e1e5e9'
        }}>
          {isExpanded && <h3>Settings</h3>}
        </div>

        <nav style={{ flex: 1, padding: '16px 0' }}>
          {navigationItems.map(item => (
            <div
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 20px',
                cursor: 'pointer',
                backgroundColor: activeItemId === item.id ? '#e3f2fd' : 'transparent',
                borderRadius: '0 25px 25px 0',
                margin: '4px 0',
                marginRight: activeItemId === item.id ? '8px' : '0',
                color: activeItemId === item.id ? '#1976d2' : '#666',
                fontWeight: activeItemId === item.id ? 'bold' : 'normal'
              }}
            >
              <span style={{ fontSize: '18px', marginRight: isExpanded ? '12px' : '0' }}>
                {item.icon}
              </span>
              {isExpanded && <span>{item.title}</span>}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{
        flex: 1,
        padding: '32px',
        backgroundColor: '#f8fafc'
      }}>
        {renderContent()}

        {/* Save Button */}
        {activeItemId === 'profile' && (
          <div style={{ 
            marginTop: '32px',
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            border: '1px solid #e1e5e9'
          }}>
            <button
              onClick={handleSave}
              disabled={!hasUnsavedChanges}
              style={{
                padding: '12px 24px',
                backgroundColor: hasUnsavedChanges ? '#3b82f6' : '#9ca3af',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: hasUnsavedChanges ? 'pointer' : 'not-allowed',
                marginRight: '12px'
              }}
            >
              Save Changes
            </button>

            {hasUnsavedChanges && (
              <span style={{ color: '#dc2626', fontSize: '14px' }}>
                You have unsaved changes
              </span>
            )}

            {savedData && (
              <div style={{ 
                marginTop: '16px',
                padding: '12px',
                backgroundColor: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '6px',
                color: '#059669'
              }}>
                Last saved: {new Date().toLocaleTimeString()}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default function NavigationFormsDemo() {
  return (
    <SideNavProvider defaultExpanded={true} persistStateKey="nav-forms-demo">
      <NavigationWithForms />
    </SideNavProvider>
  );
}
```

## Testing Examples

```tsx
// __tests__/SideNavbarContext.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SideNavProvider, useSideNav } from 'instincthub-react-ui';

function TestComponent() {
  const {
    isExpanded,
    toggleExpanded,
    isMobile,
    activeItemId,
    setActiveItem,
    expandedGroups,
    toggleGroup,
    sidebarWidth,
    updateSidebarWidth
  } = useSideNav();

  return (
    <div>
      <div data-testid="expanded">{isExpanded.toString()}</div>
      <div data-testid="mobile">{isMobile.toString()}</div>
      <div data-testid="active-item">{activeItemId || 'none'}</div>
      <div data-testid="sidebar-width">{sidebarWidth}</div>
      <div data-testid="expanded-groups">{expandedGroups.size}</div>
      
      <button data-testid="toggle-expanded" onClick={toggleExpanded} />
      <button data-testid="set-active" onClick={() => setActiveItem('test-item')} />
      <button data-testid="toggle-group" onClick={() => toggleGroup('test-group')} />
      <button data-testid="update-width" onClick={() => updateSidebarWidth(320)} />
    </div>
  );
}

describe('SideNavbarContext', () => {
  beforeEach(() => {
    localStorage.clear();
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  test('provides default context values', () => {
    render(
      <SideNavProvider>
        <TestComponent />
      </SideNavProvider>
    );

    expect(screen.getByTestId('expanded')).toHaveTextContent('true');
    expect(screen.getByTestId('mobile')).toHaveTextContent('false');
    expect(screen.getByTestId('active-item')).toHaveTextContent('none');
    expect(screen.getByTestId('sidebar-width')).toHaveTextContent('240');
    expect(screen.getByTestId('expanded-groups')).toHaveTextContent('0');
  });

  test('toggles expanded state', () => {
    render(
      <SideNavProvider>
        <TestComponent />
      </SideNavProvider>
    );

    expect(screen.getByTestId('expanded')).toHaveTextContent('true');
    
    fireEvent.click(screen.getByTestId('toggle-expanded'));
    expect(screen.getByTestId('expanded')).toHaveTextContent('false');
    expect(screen.getByTestId('sidebar-width')).toHaveTextContent('64');
  });

  test('sets active item', () => {
    render(
      <SideNavProvider>
        <TestComponent />
      </SideNavProvider>
    );

    expect(screen.getByTestId('active-item')).toHaveTextContent('none');
    
    fireEvent.click(screen.getByTestId('set-active'));
    expect(screen.getByTestId('active-item')).toHaveTextContent('test-item');
  });

  test('toggles group expansion', () => {
    render(
      <SideNavProvider>
        <TestComponent />
      </SideNavProvider>
    );

    expect(screen.getByTestId('expanded-groups')).toHaveTextContent('0');
    
    fireEvent.click(screen.getByTestId('toggle-group'));
    expect(screen.getByTestId('expanded-groups')).toHaveTextContent('1');
    
    fireEvent.click(screen.getByTestId('toggle-group'));
    expect(screen.getByTestId('expanded-groups')).toHaveTextContent('0');
  });

  test('updates sidebar width', () => {
    render(
      <SideNavProvider>
        <TestComponent />
      </SideNavProvider>
    );

    expect(screen.getByTestId('sidebar-width')).toHaveTextContent('240');
    
    fireEvent.click(screen.getByTestId('update-width'));
    expect(screen.getByTestId('sidebar-width')).toHaveTextContent('320');
  });

  test('detects mobile viewport', async () => {
    render(
      <SideNavProvider>
        <TestComponent />
      </SideNavProvider>
    );

    expect(screen.getByTestId('mobile')).toHaveTextContent('false');
    
    // Simulate mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 600,
    });
    
    fireEvent(window, new Event('resize'));
    
    await waitFor(() => {
      expect(screen.getByTestId('mobile')).toHaveTextContent('true');
    });
  });

  test('persists state in localStorage', () => {
    render(
      <SideNavProvider persistStateKey="test-sidebar">
        <TestComponent />
      </SideNavProvider>
    );

    fireEvent.click(screen.getByTestId('toggle-expanded'));
    expect(localStorage.getItem('test-sidebar')).toBe('false');
  });

  test('restores state from localStorage', () => {
    localStorage.setItem('test-sidebar', 'false');
    
    render(
      <SideNavProvider persistStateKey="test-sidebar">
        <TestComponent />
      </SideNavProvider>
    );

    expect(screen.getByTestId('expanded')).toHaveTextContent('false');
  });

  test('uses custom default values', () => {
    render(
      <SideNavProvider 
        defaultExpanded={false} 
        defaultWidth={300}
        darkMode={true}
      >
        <TestComponent />
      </SideNavProvider>
    );

    expect(screen.getByTestId('expanded')).toHaveTextContent('false');
    expect(screen.getByTestId('sidebar-width')).toHaveTextContent('64');
  });
});
```

## Related Components

- [SideNavbar](./SideNavbar.md) - Main sidebar navigation component
- [MenuDropdown](./MenuDropdown.md) - Dropdown menu component 
- [Breadcrumb](./Breadcrumb.md) - Breadcrumb navigation component
- [ResponsiveNavbar](./ResponsiveNavbar.md) - Responsive navbar component
- [ChannelListAvatar](./ChannelListAvatar.md) - Channel avatar component

## Notes

- Automatically detects mobile devices and adjusts behavior
- Persists navigation state in localStorage by default
- Provides optimized callbacks using useCallback for performance
- Supports dynamic width adjustments for resizable sidebars
- Handles window resize events for responsive behavior
- Compatible with both controlled and uncontrolled usage patterns
- Includes comprehensive TypeScript interfaces for type safety

