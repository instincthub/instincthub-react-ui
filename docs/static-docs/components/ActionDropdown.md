# ActionDropdown

**Category:** Forms | **Type:** component

Dropdown component supporting both navigation links and callback functions with Material Icons

## 🏷️ Tags

`forms`, `navigation`, `dropdown`, `menu`

```tsx
"use client";
import React, { useState } from "react";
import { ActionDropdown } from "@instincthub/react-ui";

/**
 * Example component demonstrating various ways to use the ActionDropdown
 */
const ActionDropdownExamples = () => {
  const [message, setMessage] = useState("");
  
  // Mock session for demonstration
  const mockSession = {
    user: {
      name: {
        uuid: "user-123"
      }
    }
  };

  // Basic navigation items (using URLs)
  const basicNavItems = [
    {
      label: "Dashboard",
      url: "/dashboard",
      icon: "dashboard"
    },
    {
      label: "Profile",
      url: "/profile",
      icon: "person"
    },
    {
      label: "Settings",
      url: "/settings",
      icon: "settings"
    }
  ];

  // Action items with callbacks
  const actionItems = [
    {
      label: "Delete Item",
      onClick: () => setMessage("Item deleted!"),
      icon: "delete"
    },
    {
      label: "Archive",
      onClick: () => setMessage("Item archived!"),
      icon: "archive"
    },
    {
      label: "Mark as Read",
      onClick: () => setMessage("Marked as read!"),
      icon: "mark_email_read"
    }
  ];

  // Mixed items (both URLs and callbacks)
  const mixedItems = [
    {
      label: "View Details",
      url: "/details",
      icon: "visibility"
    },
    {
      label: "Edit",
      url: "/edit",
      icon: "edit"
    },
    {
      label: "Share",
      onClick: () => setMessage("Shared successfully!"),
      icon: "share"
    },
    {
      label: "Copy Link",
      onClick: () => {
        navigator.clipboard.writeText(window.location.href);
        setMessage("Link copied to clipboard!");
      },
      icon: "link"
    },
    {
      label: "Delete",
      onClick: () => setMessage("Delete confirmed!"),
      icon: "delete"
    }
  ];

  // User menu items with callbacks and URLs
  const userMenuItems = [
    {
      label: "View Profile",
      url: "/profile",
      icon: "account_circle"
    },
    {
      label: "Account Settings",
      url: "/settings",
      icon: "settings"
    },
    {
      label: "Toggle Notifications",
      onClick: () => setMessage("Notifications toggled!"),
      icon: "notifications"
    },
    {
      label: "Sign Out",
      onClick: () => setMessage("Signed out!"),
      icon: "logout"
    }
  ];

  // File operations with callbacks
  const fileOperations = [
    {
      label: "Download",
      onClick: () => setMessage("Download started!"),
      icon: "download"
    },
    {
      label: "Rename",
      onClick: () => setMessage("Rename dialog opened!"),
      icon: "drive_file_rename_outline"
    },
    {
      label: "Move to Folder",
      onClick: () => setMessage("Move dialog opened!"),
      icon: "drive_file_move"
    },
    {
      label: "Make a Copy",
      onClick: () => setMessage("File copied!"),
      icon: "file_copy"
    },
    {
      label: "Add to Favorites",
      onClick: () => setMessage("Added to favorites!"),
      icon: "star"
    },
    {
      label: "Move to Trash",
      onClick: () => setMessage("Moved to trash!"),
      icon: "delete"
    }
  ];

  // Admin actions with mixed functionality
  const adminActions = [
    {
      label: "User Management",
      url: "/admin/users",
      icon: "group"
    },
    {
      label: "Clear Cache",
      onClick: () => setMessage("Cache cleared!"),
      icon: "refresh"
    },
    {
      label: "Export Data",
      onClick: () => setMessage("Export started!"),
      icon: "file_download"
    },
    {
      label: "System Logs",
      url: "/admin/logs",
      icon: "history"
    }
  ];

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>ActionDropdown Examples</h1>
      
      {message && (
        <div className="ihub-alert ihub-alert-success ihub-mb-4">
          {message}
        </div>
      )}

      <div className="ihub-row ihub-py-5">
        {/* Basic Navigation (URLs) */}
        <div className="ihub-col-md-4 ihub-mb-4">
          <div className="ihub-card ihub-p-3">
            <h3 className="ihub-mb-3">Navigation Links</h3>
            <p className="ihub-mb-3">Simple navigation menu using URLs for routing.</p>
            <ActionDropdown items={basicNavItems} />
          </div>
        </div>

        {/* Action Items (Callbacks) */}
        <div className="ihub-col-md-4 ihub-mb-4">
          <div className="ihub-card ihub-p-3">
            <h3 className="ihub-mb-3">Action Callbacks</h3>
            <p className="ihub-mb-3">Menu items that execute callback functions.</p>
            <ActionDropdown items={actionItems} />
          </div>
        </div>

        {/* Mixed Usage */}
        <div className="ihub-col-md-4 ihub-mb-4">
          <div className="ihub-card ihub-p-3">
            <h3 className="ihub-mb-3">Mixed Usage</h3>
            <p className="ihub-mb-3">Combination of navigation and callback actions.</p>
            <ActionDropdown items={mixedItems} />
          </div>
        </div>

        {/* User Menu with Session */}
        <div className="ihub-col-md-4 ihub-mb-4">
          <div className="ihub-card ihub-p-3">
            <h3 className="ihub-mb-3">User Menu (with session)</h3>
            <p className="ihub-mb-3">User account menu with mixed functionality.</p>
            <ActionDropdown items={userMenuItems} session={mockSession} />
          </div>
        </div>

        {/* File Operations */}
        <div className="ihub-col-md-4 ihub-mb-4">
          <div className="ihub-card ihub-p-3">
            <h3 className="ihub-mb-3">File Operations</h3>
            <p className="ihub-mb-3">File management actions using callbacks.</p>
            <ActionDropdown items={fileOperations} />
          </div>
        </div>

        {/* Admin Actions */}
        <div className="ihub-col-md-4 ihub-mb-4">
          <div className="ihub-card ihub-p-3">
            <h3 className="ihub-mb-3">Admin Actions</h3>
            <p className="ihub-mb-3">Administrative actions with mixed functionality.</p>
            <ActionDropdown items={adminActions} />
          </div>
        </div>
      </div>

      {/* Usage Guidelines */}
      <div className="ihub-card ihub-p-4 ihub-mt-5">
        <h2 className="ihub-mb-3">Usage Guidelines</h2>
        
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <h4>Props</h4>
            <ul>
              <li><strong>items:</strong> Array of DropdownItem objects</li>
              <li><strong>session:</strong> Optional session object with user data</li>
            </ul>

            <h4>DropdownItem Interface</h4>
            <ul>
              <li><strong>label:</strong> Display text for the menu item</li>
              <li><strong>url:</strong> Optional navigation URL (Next.js Link href)</li>
              <li><strong>onClick:</strong> Optional callback function to execute</li>
              <li><strong>icon:</strong> Material Icons symbol name or React component</li>
            </ul>
          </div>

          <div className="ihub-col-md-6">
            <h4>Key Features</h4>
            <ul>
              <li>Material Icons integration</li>
              <li>Click-based dropdown toggle</li>
              <li>Click outside to close</li>
              <li>Supports both URLs and callbacks</li>
              <li>Next.js Link navigation</li>
              <li>Session-aware (optional)</li>
              <li>Responsive design</li>
              <li>Auto-closes after selection</li>
            </ul>

            <h4>CSS Classes</h4>
            <ul>
              <li><code>.ihub-react-action</code> - Container wrapper</li>
              <li><code>.ctrl-dropdown</code> - Dropdown control</li>
              <li><code>.outlined-btn</code> - Trigger button</li>
              <li><code>.main_list</code> - Dropdown menu</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Material Icons Reference */}
      <div className="ihub-card ihub-p-4 ihub-mt-4">
        <h3 className="ihub-mb-3">Common Material Icons</h3>
        <div className="ihub-row">
          <div className="ihub-col-md-3">
            <h5>Navigation</h5>
            <ul className="ihub-list-unstyled">
              <li><code>dashboard</code> - Dashboard</li>
              <li><code>person</code> - Profile</li>
              <li><code>settings</code> - Settings</li>
              <li><code>home</code> - Home</li>
              <li><code>menu</code> - Menu</li>
            </ul>
          </div>
          <div className="ihub-col-md-3">
            <h5>Actions</h5>
            <ul className="ihub-list-unstyled">
              <li><code>edit</code> - Edit</li>
              <li><code>delete</code> - Delete</li>
              <li><code>share</code> - Share</li>
              <li><code>download</code> - Download</li>
              <li><code>upload</code> - Upload</li>
            </ul>
          </div>
          <div className="ihub-col-md-3">
            <h5>Communication</h5>
            <ul className="ihub-list-unstyled">
              <li><code>message</code> - Message</li>
              <li><code>email</code> - Email</li>
              <li><code>call</code> - Call</li>
              <li><code>videocam</code> - Video</li>
              <li><code>chat</code> - Chat</li>
            </ul>
          </div>
          <div className="ihub-col-md-3">
            <h5>File Operations</h5>
            <ul className="ihub-list-unstyled">
              <li><code>folder</code> - Folder</li>
              <li><code>file_copy</code> - Copy</li>
              <li><code>drive_file_move</code> - Move</li>
              <li><code>star</code> - Favorite</li>
              <li><code>link</code> - Link</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionDropdownExamples;
```

## 🔗 Related Components

- [MenuDropdown](./MenuDropdown.md) - Advanced menu dropdown component
- [Breadcrumb](./Breadcrumb.md) - Navigation breadcrumb component  
- [SideNavbar](./SideNavbar.md) - Side navigation component
- [ActionCallbackDropdown](./ActionCallbackDropdown.md) - Callback-based dropdown component
- [InputSearchDropdown](./InputSearchDropdown.md) - Search dropdown component

