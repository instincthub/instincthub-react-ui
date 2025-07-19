# MenuDropdown

**Category:** Navbar | **Type:** component

Responsive user menu dropdown with account management, theme switching, and navigation options

## 🏷️ Tags

`navbar`, `dropdown`, `user-menu`, `theme`, `account`

```tsx
"use client";
import React, { useState } from "react";
import { MenuDropdown } from "@instincthub/react-ui";
import { SessionProvider } from "next-auth/react";

/**
 * Example component demonstrating various ways to use the MenuDropdown
 */
const MenuDropdownExamples = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState<boolean>(false);
  const [isGuestMenuOpen, setIsGuestMenuOpen] = useState<boolean>(false);

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>MenuDropdown Examples</h1>

      <div
        className="ihub-d-flex ihub-py-5"
        style={{ gap: "20px", flexWrap: "wrap" }}
      >
        {/* Basic User Menu */}
        <button
          className="ihub-important-btn"
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        >
          Toggle User Menu
        </button>

        {/* Admin Menu */}
        <button
          className="ihub-outlined-btn"
          onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
        >
          Toggle Admin Menu
        </button>

        {/* Guest Menu */}
        <button
          className="ihub-primary-btn"
          onClick={() => setIsGuestMenuOpen(!isGuestMenuOpen)}
        >
          Toggle Guest Menu
        </button>
      </div>

      {/* Basic User Menu Dropdown */}
      <div className="ihub-example-section">
        <h3>1. Basic User Menu with Authentication</h3>
        <p>Standard dropdown menu for authenticated users with profile, settings, and sign out options.</p>
        
        <div className="ihub-code-example">
          <SessionProvider>
            <div style={{ position: "relative", display: "inline-block" }}>
              {isUserMenuOpen && <MenuDropdown />}
            </div>
          </SessionProvider>
        </div>

        <pre className="ihub-code-block">
{`import { MenuDropdown } from "@instincthub/react-ui";
import { SessionProvider } from "next-auth/react";

// Basic usage with session
<SessionProvider>
  <MenuDropdown />
</SessionProvider>`}
        </pre>
      </div>

      {/* Custom Navigation Menu */}
      <div className="ihub-example-section">
        <h3>2. Custom Navigation Menu</h3>
        <p>Customizable dropdown menu for different user roles and contexts.</p>
        
        <div className="ihub-code-example">
          <div className="ihub-custom-dropdown">
            <div className="ihub-dropdown-header">
              <img 
                src="/api/placeholder/40/40" 
                alt="User Avatar" 
                className="ihub-user-avatar"
              />
              <div>
                <h4>John Doe</h4>
                <p>@johndoe</p>
              </div>
            </div>
            
            <ul className="ihub-dropdown-menu">
              <li><a href="/profile">Profile Settings</a></li>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/courses">My Courses</a></li>
              <li><a href="/billing">Billing</a></li>
              <li className="ihub-divider"></li>
              <li><a href="/help">Help & Support</a></li>
              <li><a href="/logout">Sign Out</a></li>
            </ul>
          </div>
        </div>

        <pre className="ihub-code-block">
{`// Custom dropdown structure
const CustomUserMenu = () => (
  <div className="ihub-custom-dropdown">
    <div className="ihub-dropdown-header">
      <img src={user.avatar} alt="User Avatar" />
      <div>
        <h4>{user.name}</h4>
        <p>@{user.username}</p>
      </div>
    </div>
    
    <ul className="ihub-dropdown-menu">
      <li><Link href="/profile">Profile Settings</Link></li>
      <li><Link href="/dashboard">Dashboard</Link></li>
      <li><Link href="/courses">My Courses</Link></li>
    </ul>
  </div>
);`}
        </pre>
      </div>

      {/* Admin Menu */}
      <div className="ihub-example-section">
        <h3>3. Admin Menu with Role-Based Options</h3>
        <p>Enhanced dropdown menu with administrative functions and user management.</p>
        
        <div className="ihub-code-example">
          <div className="ihub-admin-dropdown">
            <div className="ihub-dropdown-header">
              <div className="ihub-admin-badge">Admin</div>
              <img 
                src="/api/placeholder/40/40" 
                alt="Admin Avatar" 
                className="ihub-user-avatar"
              />
              <div>
                <h4>Jane Admin</h4>
                <p>System Administrator</p>
              </div>
            </div>
            
            <ul className="ihub-dropdown-menu">
              <li className="ihub-section-header">User Management</li>
              <li><a href="/admin/users">Manage Users</a></li>
              <li><a href="/admin/roles">User Roles</a></li>
              
              <li className="ihub-section-header">System</li>
              <li><a href="/admin/settings">System Settings</a></li>
              <li><a href="/admin/analytics">Analytics</a></li>
              <li><a href="/admin/logs">System Logs</a></li>
              
              <li className="ihub-divider"></li>
              <li><a href="/profile">My Profile</a></li>
              <li><a href="/logout">Sign Out</a></li>
            </ul>
          </div>
        </div>

        <pre className="ihub-code-block">
{`// Admin menu with role-based sections
const AdminMenu = ({ user }) => (
  <div className="ihub-admin-dropdown">
    <div className="ihub-dropdown-header">
      <div className="ihub-admin-badge">Admin</div>
      <img src={user.avatar} alt="Admin Avatar" />
      <div>
        <h4>{user.name}</h4>
        <p>{user.role}</p>
      </div>
    </div>
    
    <ul className="ihub-dropdown-menu">
      <li className="ihub-section-header">User Management</li>
      <li><Link href="/admin/users">Manage Users</Link></li>
      <li><Link href="/admin/roles">User Roles</Link></li>
      
      <li className="ihub-section-header">System</li>
      <li><Link href="/admin/settings">System Settings</Link></li>
    </ul>
  </div>
);`}
        </pre>
      </div>

      {/* Theme Selector Menu */}
      <div className="ihub-example-section">
        <h3>4. Theme Selector Menu</h3>
        <p>Dropdown menu focused on theme switching and appearance settings.</p>
        
        <div className="ihub-code-example">
          <div className="ihub-theme-dropdown">
            <div className="ihub-dropdown-header">
              <h4>Appearance Settings</h4>
              <p>Choose your preferred theme</p>
            </div>
            
            <ul className="ihub-theme-options">
              <li className="ihub-theme-option active">
                <span className="ihub-theme-icon">🌅</span>
                <div>
                  <strong>Light Theme</strong>
                  <p>Clean and bright interface</p>
                </div>
                <span className="ihub-checkmark">✓</span>
              </li>
              
              <li className="ihub-theme-option">
                <span className="ihub-theme-icon">🌙</span>
                <div>
                  <strong>Dark Theme</strong>
                  <p>Easy on the eyes</p>
                </div>
              </li>
              
              <li className="ihub-theme-option">
                <span className="ihub-theme-icon">💻</span>
                <div>
                  <strong>System Theme</strong>
                  <p>Matches your device setting</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <pre className="ihub-code-block">
{`// Theme selector component
const ThemeMenu = ({ currentTheme, onThemeChange }) => (
  <div className="ihub-theme-dropdown">
    <div className="ihub-dropdown-header">
      <h4>Appearance Settings</h4>
    </div>
    
    <ul className="ihub-theme-options">
      {themes.map(theme => (
        <li 
          key={theme.value}
          className={\`ihub-theme-option \${currentTheme === theme.value ? 'active' : ''}\`}
          onClick={() => onThemeChange(theme.value)}
        >
          <span className="ihub-theme-icon">{theme.icon}</span>
          <div>
            <strong>{theme.label}</strong>
            <p>{theme.description}</p>
          </div>
          {currentTheme === theme.value && <span className="ihub-checkmark">✓</span>}
        </li>
      ))}
    </ul>
  </div>
);`}
        </pre>
      </div>

      {/* Context Menu */}
      <div className="ihub-example-section">
        <h3>5. Context Menu</h3>
        <p>Right-click context menu for quick actions and shortcuts.</p>
        
        <div className="ihub-code-example">
          <div className="ihub-context-menu">
            <ul className="ihub-context-options">
              <li><span className="ihub-icon">📋</span> Copy</li>
              <li><span className="ihub-icon">✂️</span> Cut</li>
              <li><span className="ihub-icon">📄</span> Paste</li>
              <li className="ihub-divider"></li>
              <li><span className="ihub-icon">🗑️</span> Delete</li>
              <li><span className="ihub-icon">📝</span> Rename</li>
              <li><span className="ihub-icon">📤</span> Share</li>
              <li className="ihub-divider"></li>
              <li><span className="ihub-icon">⚙️</span> Properties</li>
            </ul>
          </div>
        </div>

        <pre className="ihub-code-block">
{`// Context menu implementation
const ContextMenu = ({ x, y, onAction, onClose }) => (
  <div 
    className="ihub-context-menu"
    style={{ left: x, top: y }}
    onMouseLeave={onClose}
  >
    <ul className="ihub-context-options">
      <li onClick={() => onAction('copy')}>
        <span className="ihub-icon">📋</span> Copy
      </li>
      <li onClick={() => onAction('cut')}>
        <span className="ihub-icon">✂️</span> Cut
      </li>
      <li onClick={() => onAction('paste')}>
        <span className="ihub-icon">📄</span> Paste
      </li>
    </ul>
  </div>
);`}
        </pre>
      </div>

      {/* Profile Quick Actions */}
      <div className="ihub-example-section">
        <h3>6. Profile Quick Actions</h3>
        <p>Compact dropdown with essential profile actions and quick links.</p>
        
        <div className="ihub-code-example">
          <div className="ihub-profile-quick-menu">
            <div className="ihub-profile-summary">
              <img 
                src="/api/placeholder/50/50" 
                alt="Profile" 
                className="ihub-profile-image"
              />
              <div>
                <h4>Sarah Wilson</h4>
                <p>Product Designer</p>
                <span className="ihub-status-online">Online</span>
              </div>
            </div>
            
            <div className="ihub-quick-actions">
              <button className="ihub-quick-btn">
                <span className="ihub-icon">👤</span>
                Profile
              </button>
              <button className="ihub-quick-btn">
                <span className="ihub-icon">⚙️</span>
                Settings
              </button>
              <button className="ihub-quick-btn">
                <span className="ihub-icon">🔔</span>
                Notifications
              </button>
              <button className="ihub-quick-btn ihub-danger">
                <span className="ihub-icon">🚪</span>
                Sign Out
              </button>
            </div>
          </div>
        </div>

        <pre className="ihub-code-block">
{`// Profile quick actions menu
const ProfileQuickMenu = ({ user, onAction }) => (
  <div className="ihub-profile-quick-menu">
    <div className="ihub-profile-summary">
      <img src={user.avatar} alt="Profile" />
      <div>
        <h4>{user.name}</h4>
        <p>{user.title}</p>
        <span className={\`ihub-status-\${user.status}\`}>{user.status}</span>
      </div>
    </div>
    
    <div className="ihub-quick-actions">
      {quickActions.map(action => (
        <button 
          key={action.key}
          className={\`ihub-quick-btn \${action.variant || ''}\`}
          onClick={() => onAction(action.key)}
        >
          <span className="ihub-icon">{action.icon}</span>
          {action.label}
        </button>
      ))}
    </div>
  </div>
);`}
        </pre>
      </div>

      {/* Multi-Account Switcher */}
      <div className="ihub-example-section">
        <h3>7. Multi-Account Switcher</h3>
        <p>Account switching interface for users with multiple accounts or workspaces.</p>
        
        <div className="ihub-code-example">
          <div className="ihub-account-switcher">
            <div className="ihub-current-account">
              <img 
                src="/api/placeholder/40/40" 
                alt="Current Account" 
                className="ihub-account-avatar"
              />
              <div>
                <h4>Personal Account</h4>
                <p>john.doe@email.com</p>
              </div>
              <span className="ihub-expand-icon">▼</span>
            </div>
            
            <div className="ihub-account-list">
              <div className="ihub-account-item active">
                <img src="/api/placeholder/32/32" alt="Personal" />
                <div>
                  <strong>Personal Account</strong>
                  <p>john.doe@email.com</p>
                </div>
                <span className="ihub-current-badge">Current</span>
              </div>
              
              <div className="ihub-account-item">
                <img src="/api/placeholder/32/32" alt="Work" />
                <div>
                  <strong>Work Account</strong>
                  <p>john@company.com</p>
                </div>
              </div>
              
              <div className="ihub-account-item">
                <div className="ihub-add-account">
                  <span className="ihub-plus-icon">+</span>
                  <span>Add another account</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <pre className="ihub-code-block">
{`// Multi-account switcher
const AccountSwitcher = ({ accounts, currentAccount, onSwitch }) => (
  <div className="ihub-account-switcher">
    <div className="ihub-current-account">
      <img src={currentAccount.avatar} alt="Current Account" />
      <div>
        <h4>{currentAccount.name}</h4>
        <p>{currentAccount.email}</p>
      </div>
    </div>
    
    <div className="ihub-account-list">
      {accounts.map(account => (
        <div 
          key={account.id}
          className={\`ihub-account-item \${account.id === currentAccount.id ? 'active' : ''}\`}
          onClick={() => onSwitch(account)}
        >
          <img src={account.avatar} alt={account.name} />
          <div>
            <strong>{account.name}</strong>
            <p>{account.email}</p>
          </div>
          {account.id === currentAccount.id && (
            <span className="ihub-current-badge">Current</span>
          )}
        </div>
      ))}
    </div>
  </div>
);`}
        </pre>
      </div>

      {/* Notification Menu */}
      <div className="ihub-example-section">
        <h3>8. Notification Center Menu</h3>
        <p>Dropdown menu for displaying notifications, alerts, and activity updates.</p>
        
        <div className="ihub-code-example">
          <div className="ihub-notification-menu">
            <div className="ihub-notification-header">
              <h4>Notifications</h4>
              <button className="ihub-mark-all-read">Mark all as read</button>
            </div>
            
            <div className="ihub-notification-list">
              <div className="ihub-notification-item unread">
                <div className="ihub-notification-icon">📧</div>
                <div className="ihub-notification-content">
                  <p><strong>New message from Sarah</strong></p>
                  <p>Hey! I wanted to follow up on our meeting...</p>
                  <span className="ihub-notification-time">2 minutes ago</span>
                </div>
                <div className="ihub-unread-dot"></div>
              </div>
              
              <div className="ihub-notification-item">
                <div className="ihub-notification-icon">✅</div>
                <div className="ihub-notification-content">
                  <p><strong>Task completed</strong></p>
                  <p>Your report has been processed successfully</p>
                  <span className="ihub-notification-time">1 hour ago</span>
                </div>
              </div>
              
              <div className="ihub-notification-item">
                <div className="ihub-notification-icon">🎉</div>
                <div className="ihub-notification-content">
                  <p><strong>Welcome to InstinctHub!</strong></p>
                  <p>Complete your profile to get started</p>
                  <span className="ihub-notification-time">2 days ago</span>
                </div>
              </div>
            </div>
            
            <div className="ihub-notification-footer">
              <button className="ihub-view-all-btn">View all notifications</button>
            </div>
          </div>
        </div>

        <pre className="ihub-code-block">
{`// Notification center menu
const NotificationMenu = ({ notifications, onMarkAsRead, onViewAll }) => (
  <div className="ihub-notification-menu">
    <div className="ihub-notification-header">
      <h4>Notifications</h4>
      <button onClick={onMarkAsRead}>Mark all as read</button>
    </div>
    
    <div className="ihub-notification-list">
      {notifications.map(notification => (
        <div 
          key={notification.id}
          className={\`ihub-notification-item \${!notification.read ? 'unread' : ''}\`}
        >
          <div className="ihub-notification-icon">{notification.icon}</div>
          <div className="ihub-notification-content">
            <p><strong>{notification.title}</strong></p>
            <p>{notification.message}</p>
            <span className="ihub-notification-time">{notification.timeAgo}</span>
          </div>
          {!notification.read && <div className="ihub-unread-dot"></div>}
        </div>
      ))}
    </div>
    
    <div className="ihub-notification-footer">
      <button onClick={onViewAll}>View all notifications</button>
    </div>
  </div>
);`}
        </pre>
      </div>
    </div>
  );
};

export default MenuDropdownExamples;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { MenuDropdown } from '@instincthub/react-ui';
```

## 🔧 Component Props

The MenuDropdown component does not accept any external props. It relies on:

- **NextAuth Session**: Uses `useSession()` hook for authentication state
- **LocalStorage**: For theme persistence
- **CSS Classes**: For styling and theming

## 🎨 Styling Classes

| Class Name | Description |
|------------|-------------|
| `ihub-menu-dropdown` | Main container for the dropdown |
| `ihub-fitted-globe` | Content wrapper |
| `ihub-name-truce` | User profile section |
| `ihub-ff-layer` | Primary navigation menu |
| `ihub-sub-menu` | Submenu container |
| `ihub-submenu-open` | Applied when submenu is visible |
| `ihub-appearance` | Theme selection section |
| `ihub-theme-selector` | Theme options list |

## 🔍 Key Features

- **Authentication Integration**: Works with NextAuth.js sessions
- **Theme Management**: Supports light, dark, and system themes
- **Account Switching**: Navigate between multiple user accounts
- **Responsive Design**: Adapts to different screen sizes
- **Keyboard Navigation**: Supports keyboard accessibility
- **Local Storage**: Persists theme preferences

## 📋 Usage Guidelines

### Basic Implementation

```tsx
import { MenuDropdown } from "@instincthub/react-ui";
import { SessionProvider } from "next-auth/react";

function Header() {
  return (
    <header className="app-header">
      <SessionProvider>
        <div className="user-menu">
          <MenuDropdown />
        </div>
      </SessionProvider>
    </header>
  );
}
```

### Custom Implementation

```tsx
// Custom dropdown with additional options
const CustomMenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="custom-menu-wrapper">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="menu-trigger"
      >
        <img src={session?.user?.image} alt="Profile" />
      </button>
      
      {isOpen && (
        <div className="custom-dropdown">
          <MenuDropdown />
          {/* Additional custom options */}
          <div className="custom-actions">
            <a href="/billing">Billing</a>
            <a href="/referrals">Referrals</a>
          </div>
        </div>
      )}
    </div>
  );
};
```

## 🔗 Related Components

- [ChannelListAvatar](./ChannelListAvatar.md) - Channel list avatar component for account switching
- [Breadcrumb](./Breadcrumb.md) - Navigation breadcrumb component
- [ResponsiveNavbar](./ResponsiveNavbar.md) - Main responsive navigation bar
- [SideNavbar](./SideNavbar.md) - Collapsible side navigation
- [SideNavbarContext](./SideNavbarContext.md) - Context provider for side navigation state
- [Dropdown](./Dropdown.md) - Generic dropdown component
- [ActionDropdown](./ActionDropdown.md) - Action-based dropdown component

