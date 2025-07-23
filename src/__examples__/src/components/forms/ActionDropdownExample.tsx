"use client";

import React, { useState } from "react";
import { ActionDropdown } from "../../../../index";

const ActionDropdownExample: React.FC = () => {
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

  // User menu items with mixed functionality
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
      label: "Make a Copy",
      onClick: () => setMessage("File copied!"),
      icon: "file_copy"
    },
    {
      label: "Move to Trash",
      onClick: () => setMessage("Moved to trash!"),
      icon: "delete"
    }
  ];

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>ActionDropdown Examples</h1>
        <p>Dropdown component supporting both navigation links and callback functions</p>
      </div>

      {message && (
        <div className="ihub-alert ihub-alert-success ihub-mb-4">
          <strong>Action Result:</strong> {message}
          <button 
            className="ihub-btn-close" 
            onClick={() => setMessage("")}>
            ×
          </button>
        </div>
      )}

      <div className="ihub-examples-grid">
        {/* Navigation Links */}
        <div className="ihub-example-card">
          <h3>Navigation Links</h3>
          <p>Simple dropdown with URL-based navigation</p>
          <ActionDropdown items={basicNavItems} />
        </div>

        {/* Action Callbacks */}
        <div className="ihub-example-card">
          <h3>Action Callbacks</h3>
          <p>Menu items that execute callback functions</p>
          <ActionDropdown items={actionItems} />
        </div>

        {/* Mixed Usage */}
        <div className="ihub-example-card">
          <h3>Mixed Usage</h3>
          <p>Combination of navigation and callback actions</p>
          <ActionDropdown items={mixedItems} />
        </div>

        {/* User Menu with Session */}
        <div className="ihub-example-card">
          <h3>User Menu (with session)</h3>
          <p>User account menu with mixed functionality</p>
          <ActionDropdown items={userMenuItems} session={mockSession} />
        </div>

        {/* File Operations */}
        <div className="ihub-example-card">
          <h3>File Operations</h3>
          <p>File management actions using callbacks</p>
          <ActionDropdown items={fileOperations} />
        </div>

        {/* Compact Version */}
        <div className="ihub-example-card">
          <h3>Compact Menu</h3>
          <p>Smaller menu with essential items only</p>
          <ActionDropdown
            items={[
              { label: "Home", url: "/", icon: "home" },
              { label: "Refresh", onClick: () => setMessage("Page refreshed!"), icon: "refresh" },
              { label: "Settings", url: "/settings", icon: "settings" }
            ]}
          />
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Navigation Links</h3>
          <pre><code>{`import { ActionDropdown } from '@instincthub/react-ui';

const items = [
  { label: "Dashboard", url: "/dashboard", icon: "dashboard" },
  { label: "Profile", url: "/profile", icon: "person" },
  { label: "Settings", url: "/settings", icon: "settings" }
];

<ActionDropdown items={items} />`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Action Callbacks</h3>
          <pre><code>{`const items = [
  { label: "Delete", onClick: () => handleDelete(), icon: "delete" },
  { label: "Archive", onClick: () => handleArchive(), icon: "archive" },
  { label: "Share", onClick: () => handleShare(), icon: "share" }
];

<ActionDropdown items={items} />`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Mixed Usage</h3>
          <pre><code>{`const items = [
  { label: "View Details", url: "/details", icon: "visibility" },
  { label: "Edit", url: "/edit", icon: "edit" },
  { label: "Copy Link", onClick: () => copyToClipboard(), icon: "link" },
  { label: "Delete", onClick: () => confirmDelete(), icon: "delete" }
];

<ActionDropdown items={items} session={session} />`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default ActionDropdownExample;