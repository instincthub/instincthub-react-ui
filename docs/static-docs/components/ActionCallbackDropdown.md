# ActionCallbackDropdown

**Category:** Forms | **Type:** component

A customizable dropdown component with click-to-open functionality, keyboard navigation, and callback actions for each item.

## 🏷️ Tags

`forms`, `dropdown`, `menu`, `actions`, `callback`

```tsx
"use client";
import React, { useState } from "react";
import { ActionCallbackDropdown } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";
import {
  EditOutlined,
  DeleteOutlined,
  ShareOutlined,
  DownloadOutlined,
  PersonAddOutlined,
  SettingsOutlined,
  VisibilityOutlined,
  ContentCopyOutlined,
  FavoriteOutlined,
  NotificationsOutlined,
  MoreVertOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";

/**
 * Example component demonstrating various ways to use the ActionCallbackDropdown
 */
const ActionCallbackDropdownExamples = () => {
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [favoriteCount, setFavoriteCount] = useState<number>(0);
  const [notificationEnabled, setNotificationEnabled] = useState<boolean>(false);

  // Basic action handlers
  const handleEdit = () => {
    openToast("Edit action triggered");
    setSelectedItem("Edit");
  };

  const handleDelete = () => {
    openToast("Delete action triggered");
    setSelectedItem("Delete");
  };

  const handleShare = () => {
    openToast("Share action triggered");
    setSelectedItem("Share");
  };

  const handleDownload = () => {
    openToast("Download started");
    setSelectedItem("Download");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("Sample content copied to clipboard");
    openToast("Copied to clipboard");
    setSelectedItem("Copy");
  };

  const handleViewDetails = () => {
    openToast("Viewing details");
    setSelectedItem("View Details");
  };

  const handleAddMember = () => {
    openToast("Add member dialog opened");
    setSelectedItem("Add Member");
  };

  const handleSettings = () => {
    openToast("Settings opened");
    setSelectedItem("Settings");
  };

  const handleToggleFavorite = () => {
    setFavoriteCount(prev => prev + 1);
    openToast("Added to favorites");
    setSelectedItem("Favorite");
  };

  const handleToggleNotifications = () => {
    setNotificationEnabled(prev => !prev);
    openToast(`Notifications ${!notificationEnabled ? 'enabled' : 'disabled'}`);
    setSelectedItem("Notifications");
  };

  // Basic dropdown items
  const basicItems = [
    {
      label: "Edit",
      icon: <EditOutlined />,
      onClick: handleEdit,
    },
    {
      label: "Delete",
      icon: <DeleteOutlined />,
      onClick: handleDelete,
    },
    {
      label: "Share",
      icon: <ShareOutlined />,
      onClick: handleShare,
    },
  ];

  // Context menu items with mixed states
  const contextMenuItems = [
    {
      label: "View Details",
      icon: <VisibilityOutlined />,
      onClick: handleViewDetails,
    },
    {
      label: "Edit",
      icon: <EditOutlined />,
      onClick: handleEdit,
    },
    {
      label: "Copy Link",
      icon: <ContentCopyOutlined />,
      onClick: handleCopy,
    },
    {
      label: "Download",
      icon: <DownloadOutlined />,
      onClick: handleDownload,
      disabled: false,
    },
    {
      label: "Delete",
      icon: <DeleteOutlined />,
      onClick: handleDelete,
      className: "ihub-text-danger",
    },
  ];

  // User actions dropdown
  const userActionItems = [
    {
      label: "Add Member",
      icon: <PersonAddOutlined />,
      onClick: handleAddMember,
    },
    {
      label: `Favorite (${favoriteCount})`,
      icon: <FavoriteOutlined />,
      onClick: handleToggleFavorite,
    },
    {
      label: notificationEnabled ? "Disable Notifications" : "Enable Notifications",
      icon: <NotificationsOutlined />,
      onClick: handleToggleNotifications,
    },
    {
      label: "Settings",
      icon: <SettingsOutlined />,
      onClick: handleSettings,
    },
  ];

  // Advanced dropdown with custom content
  const advancedItems = [
    {
      label: (
        <div className="ihub-d-flex ihub-align-items-center ihub-justify-content-between" style={{ width: "100%" }}>
          <span>Quick Edit</span>
          <kbd className="ihub-badge ihub-badge-light">Ctrl+E</kbd>
        </div>
      ),
      icon: <EditOutlined />,
      onClick: handleEdit,
    },
    {
      label: (
        <div className="ihub-d-flex ihub-align-items-center ihub-justify-content-between" style={{ width: "100%" }}>
          <span>Copy</span>
          <kbd className="ihub-badge ihub-badge-light">Ctrl+C</kbd>
        </div>
      ),
      icon: <ContentCopyOutlined />,
      onClick: handleCopy,
    },
    {
      label: (
        <div>
          <div className="ihub-fw-bold">Download Report</div>
          <small className="ihub-text-muted">Export as PDF or Excel</small>
        </div>
      ),
      icon: <DownloadOutlined />,
      onClick: handleDownload,
    },
  ];

  // Dropdown with disabled items
  const mixedStateItems = [
    {
      label: "Available Action",
      icon: <EditOutlined />,
      onClick: handleEdit,
    },
    {
      label: "Disabled Action",
      icon: <DeleteOutlined />,
      onClick: handleDelete,
      disabled: true,
    },
    {
      label: "Another Available Action",
      icon: <ShareOutlined />,
      onClick: handleShare,
    },
    {
      label: "Also Disabled",
      icon: <DownloadOutlined />,
      onClick: handleDownload,
      disabled: true,
    },
  ];

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>ActionCallbackDropdown Examples</h1>
      
      {selectedItem && (
        <div className="ihub-alert ihub-alert-info ihub-mb-4">
          Last action: <strong>{selectedItem}</strong>
        </div>
      )}

      <div className="ihub-row ihub-g-4">
        {/* Basic Usage Example */}
        <div className="ihub-col-md-6">
          <div className="ihub-card">
            <div className="ihub-card-body">
              <h5 className="ihub-card-title">Basic Usage</h5>
              <p className="ihub-card-text">
                Simple dropdown with basic actions (Edit, Delete, Share)
              </p>
              <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                <span>Item Actions:</span>
                <ActionCallbackDropdown
                  items={basicItems}
                  title="Basic actions menu"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Position Variants */}
        <div className="ihub-col-md-6">
          <div className="ihub-card">
            <div className="ihub-card-body">
              <h5 className="ihub-card-title">Position Variants</h5>
              <p className="ihub-card-text">
                Dropdown positioning: left vs right alignment
              </p>
              <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "10px" }}>
                  <span>Left:</span>
                  <ActionCallbackDropdown
                    items={basicItems}
                    position="left"
                    title="Left-aligned dropdown"
                  />
                </div>
                <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "10px" }}>
                  <span>Right:</span>
                  <ActionCallbackDropdown
                    items={basicItems}
                    position="right"
                    title="Right-aligned dropdown"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Icons */}
        <div className="ihub-col-md-6">
          <div className="ihub-card">
            <div className="ihub-card-body">
              <h5 className="ihub-card-title">Custom Icons</h5>
              <p className="ihub-card-text">
                Using different trigger icons instead of the default menu icon
              </p>
              <div className="ihub-d-flex ihub-justify-content-around ihub-align-items-center">
                <ActionCallbackDropdown
                  items={basicItems}
                  icon={<MoreVertOutlined />}
                  title="Vertical menu"
                />
                <ActionCallbackDropdown
                  items={basicItems}
                  icon={<MoreHorizOutlined />}
                  title="Horizontal menu"
                />
                <ActionCallbackDropdown
                  items={basicItems}
                  icon={<SettingsOutlined />}
                  title="Settings menu"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Context Menu Example */}
        <div className="ihub-col-md-6">
          <div className="ihub-card">
            <div className="ihub-card-body">
              <h5 className="ihub-card-title">Context Menu</h5>
              <p className="ihub-card-text">
                Full context menu with various action types
              </p>
              <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                <span>Document.pdf</span>
                <ActionCallbackDropdown
                  items={contextMenuItems}
                  title="Document context menu"
                />
              </div>
            </div>
          </div>
        </div>

        {/* User Actions */}
        <div className="ihub-col-md-6">
          <div className="ihub-card">
            <div className="ihub-card-body">
              <h5 className="ihub-card-title">User Actions</h5>
              <p className="ihub-card-text">
                Dynamic content with state changes (favorites, notifications)
              </p>
              <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                <span>Project Settings</span>
                <ActionCallbackDropdown
                  items={userActionItems}
                  title="User actions menu"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Content */}
        <div className="ihub-col-md-6">
          <div className="ihub-card">
            <div className="ihub-card-body">
              <h5 className="ihub-card-title">Advanced Content</h5>
              <p className="ihub-card-text">
                Rich content with keyboard shortcuts and descriptions
              </p>
              <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                <span>Advanced Actions</span>
                <ActionCallbackDropdown
                  items={advancedItems}
                  title="Advanced actions menu"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mixed States (Enabled/Disabled) */}
        <div className="ihub-col-12">
          <div className="ihub-card">
            <div className="ihub-card-body">
              <h5 className="ihub-card-title">Mixed States</h5>
              <p className="ihub-card-text">
                Dropdown with both enabled and disabled items to show different states
              </p>
              <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                <span>Some actions may be disabled based on permissions or state</span>
                <ActionCallbackDropdown
                  items={mixedStateItems}
                  title="Mixed state actions"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Practical Use Cases */}
        <div className="ihub-col-12">
          <div className="ihub-card">
            <div className="ihub-card-body">
              <h5 className="ihub-card-title">Practical Use Cases</h5>
              <div className="ihub-row ihub-g-3">
                
                {/* Table Row Actions */}
                <div className="ihub-col-md-4">
                  <div className="ihub-border ihub-p-3 ihub-rounded">
                    <h6>Table Row Actions</h6>
                    <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center ihub-py-2 ihub-border-bottom">
                      <span>John Doe</span>
                      <ActionCallbackDropdown
                        items={[
                          {
                            label: "View Profile",
                            icon: <VisibilityOutlined />,
                            onClick: () => openToast("Viewing John's profile"),
                          },
                          {
                            label: "Edit User",
                            icon: <EditOutlined />,
                            onClick: () => openToast("Editing John's details"),
                          },
                          {
                            label: "Delete User",
                            icon: <DeleteOutlined />,
                            onClick: () => openToast("Delete user confirmation"),
                            className: "ihub-text-danger",
                          },
                        ]}
                        title="User actions"
                      />
                    </div>
                    <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center ihub-py-2">
                      <span>Jane Smith</span>
                      <ActionCallbackDropdown
                        items={[
                          {
                            label: "View Profile",
                            icon: <VisibilityOutlined />,
                            onClick: () => openToast("Viewing Jane's profile"),
                          },
                          {
                            label: "Edit User",
                            icon: <EditOutlined />,
                            onClick: () => openToast("Editing Jane's details"),
                          },
                          {
                            label: "Delete User",
                            icon: <DeleteOutlined />,
                            onClick: () => openToast("Delete user confirmation"),
                            className: "ihub-text-danger",
                          },
                        ]}
                        title="User actions"
                      />
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="ihub-col-md-4">
                  <div className="ihub-border ihub-p-3 ihub-rounded">
                    <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-start ihub-mb-3">
                      <div>
                        <h6 className="ihub-mb-1">Project Alpha</h6>
                        <small className="ihub-text-muted">Last updated 2 hours ago</small>
                      </div>
                      <ActionCallbackDropdown
                        items={[
                          {
                            label: "Open Project",
                            icon: <VisibilityOutlined />,
                            onClick: () => openToast("Opening Project Alpha"),
                          },
                          {
                            label: "Edit Details",
                            icon: <EditOutlined />,
                            onClick: () => openToast("Editing project details"),
                          },
                          {
                            label: "Share Project",
                            icon: <ShareOutlined />,
                            onClick: () => openToast("Share dialog opened"),
                          },
                          {
                            label: "Archive",
                            icon: <DeleteOutlined />,
                            onClick: () => openToast("Archive confirmation"),
                          },
                        ]}
                        title="Project actions"
                      />
                    </div>
                    <p className="ihub-text-muted ihub-mb-0">
                      Web application for managing customer relationships
                    </p>
                  </div>
                </div>

                {/* File Browser Actions */}
                <div className="ihub-col-md-4">
                  <div className="ihub-border ihub-p-3 ihub-rounded">
                    <h6>File Browser</h6>
                    <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center ihub-py-2 ihub-border-bottom">
                      <span>📄 report.pdf</span>
                      <ActionCallbackDropdown
                        items={[
                          {
                            label: "Download",
                            icon: <DownloadOutlined />,
                            onClick: () => openToast("Downloading report.pdf"),
                          },
                          {
                            label: "Copy Link",
                            icon: <ContentCopyOutlined />,
                            onClick: () => openToast("Link copied to clipboard"),
                          },
                          {
                            label: "Rename",
                            icon: <EditOutlined />,
                            onClick: () => openToast("Rename dialog opened"),
                          },
                          {
                            label: "Delete",
                            icon: <DeleteOutlined />,
                            onClick: () => openToast("Delete confirmation"),
                            className: "ihub-text-danger",
                          },
                        ]}
                        title="File actions"
                      />
                    </div>
                    <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center ihub-py-2">
                      <span>📁 images/</span>
                      <ActionCallbackDropdown
                        items={[
                          {
                            label: "Open Folder",
                            icon: <VisibilityOutlined />,
                            onClick: () => openToast("Opening images folder"),
                          },
                          {
                            label: "Rename",
                            icon: <EditOutlined />,
                            onClick: () => openToast("Rename folder dialog"),
                          },
                          {
                            label: "Delete Folder",
                            icon: <DeleteOutlined />,
                            onClick: () => openToast("Delete folder confirmation"),
                            className: "ihub-text-danger",
                          },
                        ]}
                        title="Folder actions"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="ihub-mt-5">
        <h3>Key Features Demonstrated</h3>
        <div className="ihub-row ihub-g-3">
          <div className="ihub-col-md-6">
            <ul className="ihub-list-unstyled">
              <li className="ihub-mb-2">✅ <strong>Click-to-open functionality</strong> - Simple click interaction</li>
              <li className="ihub-mb-2">✅ <strong>Keyboard navigation</strong> - Escape key to close</li>
              <li className="ihub-mb-2">✅ <strong>Position control</strong> - Left or right alignment</li>
              <li className="ihub-mb-2">✅ <strong>Custom icons</strong> - Replace default menu icon</li>
              <li className="ihub-mb-2">✅ <strong>Disabled states</strong> - Individual item control</li>
            </ul>
          </div>
          <div className="ihub-col-md-6">
            <ul className="ihub-list-unstyled">
              <li className="ihub-mb-2">✅ <strong>Rich content support</strong> - Custom JSX in labels</li>
              <li className="ihub-mb-2">✅ <strong>Accessibility features</strong> - ARIA attributes and roles</li>
              <li className="ihub-mb-2">✅ <strong>Click outside to close</strong> - Automatic dismissal</li>
              <li className="ihub-mb-2">✅ <strong>Custom styling</strong> - CSS classes and inline styles</li>
              <li className="ihub-mb-2">✅ <strong>Callback actions</strong> - onClick handlers for each item</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionCallbackDropdownExamples;
```

## 🔗 Related Components

- [ActionDropdown](./ActionDropdown.md) - Dropdown component for actions
- [MenuDropdown](./MenuDropdown.md) - Navigation menu dropdown
- [SubmitButton](./SubmitButton.md) - Form submission button
- [Tooltip](./Tooltip.md) - Tooltip display component

