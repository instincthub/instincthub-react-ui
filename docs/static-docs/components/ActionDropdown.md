# ActionDropdown

**Category:** Forms | **Type:** component

Navigation dropdown component with Material Icons and session support

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
  // Mock session for demonstration
  const mockSession = {
    user: {
      name: {
        uuid: "user-123"
      }
    }
  };

  // Basic navigation items
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

  // User menu items
  const userMenuItems = [
    {
      label: "View Profile",
      url: "/profile",
      icon: "account_circle"
    },
    {
      label: "Account Settings",
      url: "/account-settings",
      icon: "settings"
    },
    {
      label: "Security",
      url: "/security",
      icon: "security"
    },
    {
      label: "Billing",
      url: "/billing",
      icon: "payment"
    },
    {
      label: "Help Center",
      url: "/help",
      icon: "help"
    },
    {
      label: "Sign Out",
      url: "/logout",
      icon: "logout"
    }
  ];

  // Admin menu items
  const adminMenuItems = [
    {
      label: "User Management",
      url: "/admin/users",
      icon: "group"
    },
    {
      label: "System Settings",
      url: "/admin/settings",
      icon: "admin_panel_settings"
    },
    {
      label: "Analytics",
      url: "/admin/analytics",
      icon: "analytics"
    },
    {
      label: "Reports",
      url: "/admin/reports",
      icon: "assessment"
    },
    {
      label: "Audit Logs",
      url: "/admin/logs",
      icon: "history"
    }
  ];

  // Content actions
  const contentActions = [
    {
      label: "Edit",
      url: "/edit",
      icon: "edit"
    },
    {
      label: "Share",
      url: "/share",
      icon: "share"
    },
    {
      label: "Download",
      url: "/download",
      icon: "download"
    },
    {
      label: "Copy Link",
      url: "/copy-link",
      icon: "link"
    },
    {
      label: "Delete",
      url: "/delete",
      icon: "delete"
    }
  ];

  // File operations
  const fileOperations = [
    {
      label: "Open",
      url: "/open",
      icon: "folder_open"
    },
    {
      label: "Rename",
      url: "/rename",
      icon: "drive_file_rename_outline"
    },
    {
      label: "Move to Folder",
      url: "/move",
      icon: "drive_file_move"
    },
    {
      label: "Make a Copy",
      url: "/copy",
      icon: "file_copy"
    },
    {
      label: "Add to Favorites",
      url: "/favorite",
      icon: "star"
    },
    {
      label: "Move to Trash",
      url: "/trash",
      icon: "delete"
    }
  ];

  // Communication actions
  const communicationActions = [
    {
      label: "Send Message",
      url: "/message",
      icon: "message"
    },
    {
      label: "Make Call",
      url: "/call",
      icon: "call"
    },
    {
      label: "Video Chat",
      url: "/video-call",
      icon: "videocam"
    },
    {
      label: "Send Email",
      url: "/email",
      icon: "email"
    },
    {
      label: "Schedule Meeting",
      url: "/schedule",
      icon: "event"
    }
  ];

  // E-commerce actions
  const ecommerceActions = [
    {
      label: "View Details",
      url: "/product-details",
      icon: "visibility"
    },
    {
      label: "Add to Cart",
      url: "/add-to-cart",
      icon: "shopping_cart"
    },
    {
      label: "Add to Wishlist",
      url: "/wishlist",
      icon: "favorite"
    },
    {
      label: "Compare",
      url: "/compare",
      icon: "compare"
    },
    {
      label: "Share Product",
      url: "/share-product",
      icon: "share"
    }
  ];

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>ActionDropdown Examples</h1>

      <div className="ihub-row ihub-py-5">
        {/* Basic Navigation Dropdown */}
        <div className="ihub-col-md-4 ihub-mb-4">
          <div className="ihub-card ihub-p-3">
            <h3 className="ihub-mb-3">Basic Navigation</h3>
            <p className="ihub-mb-3">Simple navigation menu with dashboard, profile, and settings.</p>
            <ActionDropdown items={basicNavItems} />
          </div>
        </div>

        {/* User Menu with Session */}
        <div className="ihub-col-md-4 ihub-mb-4">
          <div className="ihub-card ihub-p-3">
            <h3 className="ihub-mb-3">User Menu (with session)</h3>
            <p className="ihub-mb-3">Complete user account menu with session support.</p>
            <ActionDropdown items={userMenuItems} session={mockSession} />
          </div>
        </div>

        {/* Admin Menu */}
        <div className="ihub-col-md-4 ihub-mb-4">
          <div className="ihub-card ihub-p-3">
            <h3 className="ihub-mb-3">Admin Actions</h3>
            <p className="ihub-mb-3">Administrative actions for system management.</p>
            <ActionDropdown items={adminMenuItems} />
          </div>
        </div>

        {/* Content Actions */}
        <div className="ihub-col-md-4 ihub-mb-4">
          <div className="ihub-card ihub-p-3">
            <h3 className="ihub-mb-3">Content Actions</h3>
            <p className="ihub-mb-3">Common content management actions.</p>
            <ActionDropdown items={contentActions} />
          </div>
        </div>

        {/* File Operations */}
        <div className="ihub-col-md-4 ihub-mb-4">
          <div className="ihub-card ihub-p-3">
            <h3 className="ihub-mb-3">File Operations</h3>
            <p className="ihub-mb-3">File management and organization actions.</p>
            <ActionDropdown items={fileOperations} />
          </div>
        </div>

        {/* Communication Actions */}
        <div className="ihub-col-md-4 ihub-mb-4">
          <div className="ihub-card ihub-p-3">
            <h3 className="ihub-mb-3">Communication</h3>
            <p className="ihub-mb-3">Contact and communication options.</p>
            <ActionDropdown items={communicationActions} />
          </div>
        </div>

        {/* E-commerce Actions */}
        <div className="ihub-col-md-6 ihub-mb-4">
          <div className="ihub-card ihub-p-3">
            <h3 className="ihub-mb-3">E-commerce Actions</h3>
            <p className="ihub-mb-3">Product-related actions for online stores.</p>
            <ActionDropdown items={ecommerceActions} />
          </div>
        </div>

        {/* Custom Styling Example */}
        <div className="ihub-col-md-6 ihub-mb-4">
          <div className="ihub-card ihub-p-3">
            <h3 className="ihub-mb-3">Custom Context Menu</h3>
            <p className="ihub-mb-3">Right-click style context menu simulation.</p>
            <div style={{ textAlign: "center", padding: "20px", border: "2px dashed #ccc", borderRadius: "8px" }}>
              <p>Hover over the action button below</p>
              <ActionDropdown items={contentActions} />
            </div>
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
              <li><strong>url:</strong> Navigation URL (Next.js Link href)</li>
              <li><strong>icon:</strong> Material Icons symbol name</li>
            </ul>
          </div>

          <div className="ihub-col-md-6">
            <h4>Key Features</h4>
            <ul>
              <li>Material Icons integration</li>
              <li>Hover-based dropdown activation</li>
              <li>Next.js Link navigation</li>
              <li>Session-aware (optional)</li>
              <li>Responsive design</li>
              <li>Custom CSS classes for styling</li>
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

