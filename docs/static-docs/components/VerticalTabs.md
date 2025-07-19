# VerticalTabs

**Category:** Tabs | **Type:** component

Vertical tab navigation component for creating sidebar-style navigation interfaces

## 🏷️ Tags

`tabs`, `navigation`, `sidebar`, `vertical`

```tsx
"use client";
import React, { useState } from "react";
import {
  VerticalTabs,
  InputText,
  InputTextarea,
  SubmitButton,
} from "@instincthub/react-ui";
import { 
  User, 
  Shield, 
  Bell, 
  CreditCard, 
  Settings, 
  HelpCircle,
  Home,
  Users,
  BarChart3,
  FileText,
  Database,
  Monitor,
  Layout,
  Calendar,
  Mail,
  Search
} from "lucide-react";

/**
 * Comprehensive examples demonstrating various ways to use VerticalTabs
 */
const VerticalTabsExamples = () => {
  // State for different tab instances
  const [basicActiveTab, setBasicActiveTab] = useState<string>("profile");
  const [dashboardActiveTab, setDashboardActiveTab] = useState<string>("overview");
  const [adminActiveTab, setAdminActiveTab] = useState<string>("users");
  const [settingsActiveTab, setSettingsActiveTab] = useState<string>("general");
  
  // Form state for settings example
  const [userSettings, setUserSettings] = useState({
    displayName: "John Doe",
    email: "john.doe@example.com",
    bio: "Software developer passionate about creating amazing user experiences.",
    notifications: {
      email: true,
      push: false,
      sms: true
    }
  });

  // Statistics data for dashboard
  const [stats] = useState({
    totalUsers: 1234,
    revenue: 45678,
    orders: 890,
    conversion: 3.2
  });

  // Handle input changes for settings
  const handleSettingsChange = (field: string, value: any) => {
    setUserSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (type: string, value: boolean) => {
    setUserSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value
      }
    }));
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>VerticalTabs Examples</h1>

      {/* Example 1: Basic Settings Panel */}
      <div className="ihub-mb-8">
        <h2 className="ihub-mb-4">1. Basic Settings Panel</h2>
        <p className="ihub-mb-4">A standard settings interface with icons and different content sections.</p>
        
        <VerticalTabs
          items={[
            {
              id: "profile",
              label: "Profile",
              icon: <User size={18} />,
              content: (
                <div className="ihub-p-6">
                  <h3 className="ihub-mb-4">Profile Information</h3>
                  <p className="ihub-mb-6">Manage your personal information and profile settings.</p>
                  
                  <div className="ihub-space-y-4">
                    <InputText
                      label="Display Name"
                      name="displayName"
                      value={userSettings.displayName}
                      onChange={(e) => handleSettingsChange('displayName', e.target.value)}
                      className="ihub-input"
                    />
                    
                    <InputText
                      label="Email Address"
                      name="email"
                      type="email"
                      value={userSettings.email}
                      onChange={(e) => handleSettingsChange('email', e.target.value)}
                      className="ihub-input"
                    />
                    
                    <InputTextarea
                      label="Bio"
                      name="bio"
                      value={userSettings.bio}
                      onChange={(e) => handleSettingsChange('bio', e.target.value)}
                      className="ihub-input"
                      rows={3}
                    />
                    
                    <SubmitButton label="Save Profile" status={1} />
                  </div>
                </div>
              ),
            },
            {
              id: "security",
              label: "Security",
              icon: <Shield size={18} />,
              content: (
                <div className="ihub-p-6">
                  <h3 className="ihub-mb-4">Security Settings</h3>
                  <p className="ihub-mb-6">Manage your password and security preferences.</p>
                  
                  <div className="ihub-space-y-6">
                    <div className="ihub-p-4 ihub-border ihub-rounded-lg">
                      <h4 className="ihub-mb-2">Password</h4>
                      <p className="ihub-text-sm ihub-text-gray-600 ihub-mb-3">Last changed: 30 days ago</p>
                      <button className="ihub-important-btn">Change Password</button>
                    </div>
                    
                    <div className="ihub-p-4 ihub-border ihub-rounded-lg">
                      <h4 className="ihub-mb-2">Two-Factor Authentication</h4>
                      <p className="ihub-text-sm ihub-text-gray-600 ihub-mb-3">Add an extra layer of security to your account</p>
                      <button className="ihub-outlined-btn">Enable 2FA</button>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: "notifications",
              label: "Notifications",
              icon: <Bell size={18} />,
              content: (
                <div className="ihub-p-6">
                  <h3 className="ihub-mb-4">Notification Preferences</h3>
                  <p className="ihub-mb-6">Control how and when you receive notifications.</p>
                  
                  <div className="ihub-space-y-4">
                    <div className="ihub-d-flex ihub-align-items-center ihub-justify-content-between ihub-p-3 ihub-border ihub-rounded">
                      <div>
                        <label className="ihub-font-semibold">Email Notifications</label>
                        <p className="ihub-text-sm ihub-text-gray-600">Receive updates via email</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={userSettings.notifications.email}
                        onChange={(e) => handleNotificationChange('email', e.target.checked)}
                      />
                    </div>
                    
                    <div className="ihub-d-flex ihub-align-items-center ihub-justify-content-between ihub-p-3 ihub-border ihub-rounded">
                      <div>
                        <label className="ihub-font-semibold">Push Notifications</label>
                        <p className="ihub-text-sm ihub-text-gray-600">Receive push notifications on your device</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={userSettings.notifications.push}
                        onChange={(e) => handleNotificationChange('push', e.target.checked)}
                      />
                    </div>
                    
                    <div className="ihub-d-flex ihub-align-items-center ihub-justify-content-between ihub-p-3 ihub-border ihub-rounded">
                      <div>
                        <label className="ihub-font-semibold">SMS Notifications</label>
                        <p className="ihub-text-sm ihub-text-gray-600">Receive important updates via SMS</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={userSettings.notifications.sms}
                        onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                      />
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: "billing",
              label: "Billing",
              icon: <CreditCard size={18} />,
              disabled: true,
              content: (
                <div className="ihub-p-6">
                  <h3 className="ihub-mb-4">Billing Information</h3>
                  <p>This section is currently unavailable.</p>
                </div>
              ),
            }
          ]}
          defaultActiveTab={basicActiveTab}
          onChange={(tabItem) => setBasicActiveTab(tabItem.id as string)}
          className="ihub-border ihub-rounded-lg ihub-bg-white ihub-shadow-sm"
        />
      </div>

      {/* Example 2: Dashboard Navigation */}
      <div className="ihub-mb-8">
        <h2 className="ihub-mb-4">2. Dashboard Navigation</h2>
        <p className="ihub-mb-4">Analytics dashboard with different chart views and data tables.</p>
        
        <VerticalTabs
          items={[
            {
              id: "overview",
              label: "Overview",
              icon: <Home size={18} />,
              content: (
                <div className="ihub-p-6">
                  <h3 className="ihub-mb-6">Dashboard Overview</h3>
                  
                  <div className="ihub-row ihub-mb-6">
                    <div className="ihub-col-md-3">
                      <div className="ihub-p-4 ihub-bg-blue-50 ihub-rounded-lg ihub-text-center">
                        <h4 className="ihub-text-blue-600">Total Users</h4>
                        <p className="ihub-text-2xl ihub-font-bold">{stats.totalUsers.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="ihub-col-md-3">
                      <div className="ihub-p-4 ihub-bg-green-50 ihub-rounded-lg ihub-text-center">
                        <h4 className="ihub-text-green-600">Revenue</h4>
                        <p className="ihub-text-2xl ihub-font-bold">${stats.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="ihub-col-md-3">
                      <div className="ihub-p-4 ihub-bg-purple-50 ihub-rounded-lg ihub-text-center">
                        <h4 className="ihub-text-purple-600">Orders</h4>
                        <p className="ihub-text-2xl ihub-font-bold">{stats.orders}</p>
                      </div>
                    </div>
                    <div className="ihub-col-md-3">
                      <div className="ihub-p-4 ihub-bg-orange-50 ihub-rounded-lg ihub-text-center">
                        <h4 className="ihub-text-orange-600">Conversion</h4>
                        <p className="ihub-text-2xl ihub-font-bold">{stats.conversion}%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ihub-p-4 ihub-border ihub-rounded-lg">
                    <h4 className="ihub-mb-3">Recent Activity</h4>
                    <ul className="ihub-space-y-2">
                      <li className="ihub-d-flex ihub-justify-content-between">
                        <span>New user registration</span>
                        <span className="ihub-text-gray-500">2 minutes ago</span>
                      </li>
                      <li className="ihub-d-flex ihub-justify-content-between">
                        <span>Order #1234 completed</span>
                        <span className="ihub-text-gray-500">5 minutes ago</span>
                      </li>
                      <li className="ihub-d-flex ihub-justify-content-between">
                        <span>Payment received</span>
                        <span className="ihub-text-gray-500">10 minutes ago</span>
                      </li>
                    </ul>
                  </div>
                </div>
              ),
            },
            {
              id: "analytics",
              label: "Analytics",
              icon: <BarChart3 size={18} />,
              content: (
                <div className="ihub-p-6">
                  <h3 className="ihub-mb-6">Analytics Dashboard</h3>
                  
                  <div className="ihub-row ihub-mb-6">
                    <div className="ihub-col-md-8">
                      <div className="ihub-p-4 ihub-border ihub-rounded-lg">
                        <h4 className="ihub-mb-4">Traffic Overview</h4>
                        <div className="ihub-bg-gray-100 ihub-p-8 ihub-text-center ihub-rounded">
                          <p className="ihub-text-gray-600">[Chart Placeholder - Traffic over time]</p>
                        </div>
                      </div>
                    </div>
                    <div className="ihub-col-md-4">
                      <div className="ihub-p-4 ihub-border ihub-rounded-lg">
                        <h4 className="ihub-mb-4">Top Sources</h4>
                        <ul className="ihub-space-y-2">
                          <li className="ihub-d-flex ihub-justify-content-between">
                            <span>Direct</span>
                            <span className="ihub-font-semibold">45%</span>
                          </li>
                          <li className="ihub-d-flex ihub-justify-content-between">
                            <span>Search</span>
                            <span className="ihub-font-semibold">32%</span>
                          </li>
                          <li className="ihub-d-flex ihub-justify-content-between">
                            <span>Social</span>
                            <span className="ihub-font-semibold">23%</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: "users",
              label: "Users",
              icon: <Users size={18} />,
              content: (
                <div className="ihub-p-6">
                  <h3 className="ihub-mb-6">User Management</h3>
                  
                  <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center ihub-mb-4">
                    <div className="ihub-d-flex ihub-align-items-center">
                      <Search size={16} className="ihub-mr-2" />
                      <input 
                        type="text" 
                        placeholder="Search users..." 
                        className="ihub-p-2 ihub-border ihub-rounded"
                      />
                    </div>
                    <button className="ihub-important-btn">Add User</button>
                  </div>
                  
                  <div className="ihub-border ihub-rounded-lg ihub-overflow-hidden">
                    <table className="ihub-w-full">
                      <thead className="ihub-bg-gray-50">
                        <tr>
                          <th className="ihub-p-3 ihub-text-left">Name</th>
                          <th className="ihub-p-3 ihub-text-left">Email</th>
                          <th className="ihub-p-3 ihub-text-left">Role</th>
                          <th className="ihub-p-3 ihub-text-left">Status</th>
                          <th className="ihub-p-3 ihub-text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="ihub-border-t">
                          <td className="ihub-p-3">John Doe</td>
                          <td className="ihub-p-3">john@example.com</td>
                          <td className="ihub-p-3">Admin</td>
                          <td className="ihub-p-3">
                            <span className="ihub-px-2 ihub-py-1 ihub-bg-green-100 ihub-text-green-800 ihub-rounded-full ihub-text-xs">Active</span>
                          </td>
                          <td className="ihub-p-3">
                            <button className="ihub-outlined-btn ihub-text-xs ihub-mr-2">Edit</button>
                            <button className="ihub-danger-btn ihub-text-xs">Delete</button>
                          </td>
                        </tr>
                        <tr className="ihub-border-t">
                          <td className="ihub-p-3">Jane Smith</td>
                          <td className="ihub-p-3">jane@example.com</td>
                          <td className="ihub-p-3">User</td>
                          <td className="ihub-p-3">
                            <span className="ihub-px-2 ihub-py-1 ihub-bg-green-100 ihub-text-green-800 ihub-rounded-full ihub-text-xs">Active</span>
                          </td>
                          <td className="ihub-p-3">
                            <button className="ihub-outlined-btn ihub-text-xs ihub-mr-2">Edit</button>
                            <button className="ihub-danger-btn ihub-text-xs">Delete</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ),
            },
            {
              id: "reports",
              label: "Reports",
              icon: <FileText size={18} />,
              content: (
                <div className="ihub-p-6">
                  <h3 className="ihub-mb-6">Reports & Export</h3>
                  
                  <div className="ihub-row">
                    <div className="ihub-col-md-6">
                      <div className="ihub-p-4 ihub-border ihub-rounded-lg ihub-mb-4">
                        <h4 className="ihub-mb-3">Sales Report</h4>
                        <p className="ihub-text-gray-600 ihub-mb-3">Generate detailed sales analytics and export data</p>
                        <button className="ihub-primary-btn">Generate Report</button>
                      </div>
                    </div>
                    <div className="ihub-col-md-6">
                      <div className="ihub-p-4 ihub-border ihub-rounded-lg ihub-mb-4">
                        <h4 className="ihub-mb-3">User Activity Report</h4>
                        <p className="ihub-text-gray-600 ihub-mb-3">Track user engagement and activity patterns</p>
                        <button className="ihub-primary-btn">Generate Report</button>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            }
          ]}
          defaultActiveTab={dashboardActiveTab}
          onChange={(tabItem) => setDashboardActiveTab(tabItem.id as string)}
          className="ihub-border ihub-rounded-lg ihub-bg-white ihub-shadow-sm"
          tabsContainerClassName="ihub-bg-gray-50"
        />
      </div>

      {/* Example 3: Admin Panel */}
      <div className="ihub-mb-8">
        <h2 className="ihub-mb-4">3. Admin Panel Layout</h2>
        <p className="ihub-mb-4">Complex admin interface with system management tools.</p>
        
        <VerticalTabs
          items={[
            {
              id: "users",
              label: "User Management",
              icon: <Users size={18} />,
              content: (
                <div className="ihub-p-6">
                  <h3 className="ihub-mb-4">User Management</h3>
                  <p className="ihub-mb-4">Manage user accounts, permissions, and access controls.</p>
                  
                  <div className="ihub-row">
                    <div className="ihub-col-md-4">
                      <div className="ihub-p-4 ihub-bg-blue-50 ihub-rounded-lg ihub-text-center">
                        <h4>Total Users</h4>
                        <p className="ihub-text-2xl ihub-font-bold">2,543</p>
                      </div>
                    </div>
                    <div className="ihub-col-md-4">
                      <div className="ihub-p-4 ihub-bg-green-50 ihub-rounded-lg ihub-text-center">
                        <h4>Active Users</h4>
                        <p className="ihub-text-2xl ihub-font-bold">2,401</p>
                      </div>
                    </div>
                    <div className="ihub-col-md-4">
                      <div className="ihub-p-4 ihub-bg-orange-50 ihub-rounded-lg ihub-text-center">
                        <h4>Pending</h4>
                        <p className="ihub-text-2xl ihub-font-bold">142</p>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: "content",
              label: "Content Management",
              icon: <FileText size={18} />,
              content: (
                <div className="ihub-p-6">
                  <h3 className="ihub-mb-4">Content Management</h3>
                  <p className="ihub-mb-4">Manage website content, posts, and media files.</p>
                  
                  <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center ihub-mb-4">
                    <h4>Recent Posts</h4>
                    <button className="ihub-important-btn">Create New Post</button>
                  </div>
                  
                  <div className="ihub-space-y-3">
                    <div className="ihub-p-3 ihub-border ihub-rounded ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                      <div>
                        <h5 className="ihub-mb-1">Getting Started with InstinctHub</h5>
                        <p className="ihub-text-sm ihub-text-gray-600">Published 2 days ago</p>
                      </div>
                      <div>
                        <button className="ihub-outlined-btn ihub-text-xs ihub-mr-2">Edit</button>
                        <button className="ihub-danger-btn ihub-text-xs">Delete</button>
                      </div>
                    </div>
                    <div className="ihub-p-3 ihub-border ihub-rounded ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                      <div>
                        <h5 className="ihub-mb-1">New Features Release Notes</h5>
                        <p className="ihub-text-sm ihub-text-gray-600">Published 1 week ago</p>
                      </div>
                      <div>
                        <button className="ihub-outlined-btn ihub-text-xs ihub-mr-2">Edit</button>
                        <button className="ihub-danger-btn ihub-text-xs">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: "system",
              label: "System Settings",
              icon: <Settings size={18} />,
              content: (
                <div className="ihub-p-6">
                  <h3 className="ihub-mb-4">System Configuration</h3>
                  <p className="ihub-mb-6">Configure system-wide settings and preferences.</p>
                  
                  <div className="ihub-space-y-6">
                    <div className="ihub-p-4 ihub-border ihub-rounded-lg">
                      <h4 className="ihub-mb-3">General Settings</h4>
                      <div className="ihub-space-y-3">
                        <div>
                          <label className="ihub-block ihub-mb-1">Site Name</label>
                          <input type="text" value="InstinctHub Admin" className="ihub-p-2 ihub-border ihub-rounded ihub-w-full" />
                        </div>
                        <div>
                          <label className="ihub-block ihub-mb-1">Site Description</label>
                          <InputTextarea 
                            name="description"
                            value="A comprehensive admin panel for managing your application"
                            className="ihub-input"
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="ihub-p-4 ihub-border ihub-rounded-lg">
                      <h4 className="ihub-mb-3">Security Settings</h4>
                      <div className="ihub-space-y-3">
                        <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                          <div>
                            <label className="ihub-font-semibold">Force HTTPS</label>
                            <p className="ihub-text-sm ihub-text-gray-600">Redirect all HTTP traffic to HTTPS</p>
                          </div>
                          <input type="checkbox" defaultChecked />
                        </div>
                        <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                          <div>
                            <label className="ihub-font-semibold">Two-Factor Authentication</label>
                            <p className="ihub-text-sm ihub-text-gray-600">Require 2FA for admin accounts</p>
                          </div>
                          <input type="checkbox" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: "monitoring",
              label: "System Monitoring",
              icon: <Monitor size={18} />,
              content: (
                <div className="ihub-p-6">
                  <h3 className="ihub-mb-4">System Health</h3>
                  <p className="ihub-mb-6">Monitor system performance and health metrics.</p>
                  
                  <div className="ihub-row ihub-mb-6">
                    <div className="ihub-col-md-3">
                      <div className="ihub-p-4 ihub-bg-green-50 ihub-rounded-lg ihub-text-center">
                        <h4 className="ihub-text-green-600">CPU Usage</h4>
                        <p className="ihub-text-2xl ihub-font-bold">45%</p>
                      </div>
                    </div>
                    <div className="ihub-col-md-3">
                      <div className="ihub-p-4 ihub-bg-blue-50 ihub-rounded-lg ihub-text-center">
                        <h4 className="ihub-text-blue-600">Memory</h4>
                        <p className="ihub-text-2xl ihub-font-bold">67%</p>
                      </div>
                    </div>
                    <div className="ihub-col-md-3">
                      <div className="ihub-p-4 ihub-bg-purple-50 ihub-rounded-lg ihub-text-center">
                        <h4 className="ihub-text-purple-600">Disk Space</h4>
                        <p className="ihub-text-2xl ihub-font-bold">23%</p>
                      </div>
                    </div>
                    <div className="ihub-col-md-3">
                      <div className="ihub-p-4 ihub-bg-orange-50 ihub-rounded-lg ihub-text-center">
                        <h4 className="ihub-text-orange-600">Network</h4>
                        <p className="ihub-text-2xl ihub-font-bold">1.2GB</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ihub-p-4 ihub-border ihub-rounded-lg">
                    <h4 className="ihub-mb-3">Recent Logs</h4>
                    <div className="ihub-space-y-2">
                      <div className="ihub-p-2 ihub-bg-gray-50 ihub-rounded ihub-text-sm">
                        <span className="ihub-text-green-600">[INFO]</span> User login successful - john@example.com
                      </div>
                      <div className="ihub-p-2 ihub-bg-gray-50 ihub-rounded ihub-text-sm">
                        <span className="ihub-text-blue-600">[DEBUG]</span> Database connection established
                      </div>
                      <div className="ihub-p-2 ihub-bg-gray-50 ihub-rounded ihub-text-sm">
                        <span className="ihub-text-yellow-600">[WARN]</span> High memory usage detected
                      </div>
                    </div>
                  </div>
                </div>
              ),
            }
          ]}
          defaultActiveTab={adminActiveTab}
          onChange={(tabItem) => setAdminActiveTab(tabItem.id as string)}
          className="ihub-border ihub-rounded-lg ihub-bg-white ihub-shadow-sm"
        />
      </div>

      {/* Example 4: Controlled vs Uncontrolled */}
      <div className="ihub-mb-8">
        <h2 className="ihub-mb-4">4. Controlled Usage with Custom Styling</h2>
        <p className="ihub-mb-4">Example showing controlled tab state with custom CSS classes.</p>
        
        <div className="ihub-mb-4">
          <p>Current active tab: <strong>{settingsActiveTab}</strong></p>
          <div className="ihub-d-flex" style={{ gap: "10px" }}>
            <button 
              className="ihub-outlined-btn ihub-text-xs"
              onClick={() => setSettingsActiveTab("general")}
            >
              Go to General
            </button>
            <button 
              className="ihub-outlined-btn ihub-text-xs"
              onClick={() => setSettingsActiveTab("appearance")}
            >
              Go to Appearance
            </button>
            <button 
              className="ihub-outlined-btn ihub-text-xs"
              onClick={() => setSettingsActiveTab("privacy")}
            >
              Go to Privacy
            </button>
          </div>
        </div>
        
        <VerticalTabs
          items={[
            {
              id: "general",
              label: "General",
              icon: <Settings size={18} />,
              content: (
                <div className="ihub-p-6">
                  <h3 className="ihub-mb-4">General Settings</h3>
                  <p>Configure basic application preferences and defaults.</p>
                  
                  <div className="ihub-mt-4">
                    <label className="ihub-block ihub-mb-2">Default Language</label>
                    <select className="ihub-p-2 ihub-border ihub-rounded">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                </div>
              ),
            },
            {
              id: "appearance",
              label: "Appearance",
              icon: <Layout size={18} />,
              content: (
                <div className="ihub-p-6">
                  <h3 className="ihub-mb-4">Appearance Settings</h3>
                  <p>Customize the look and feel of your interface.</p>
                  
                  <div className="ihub-mt-4 ihub-space-y-3">
                    <div>
                      <label className="ihub-block ihub-mb-2">Theme</label>
                      <select className="ihub-p-2 ihub-border ihub-rounded">
                        <option>Light</option>
                        <option>Dark</option>
                        <option>Auto</option>
                      </select>
                    </div>
                    <div>
                      <label className="ihub-block ihub-mb-2">Font Size</label>
                      <select className="ihub-p-2 ihub-border ihub-rounded">
                        <option>Small</option>
                        <option>Medium</option>
                        <option>Large</option>
                      </select>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: "privacy",
              label: "Privacy",
              icon: <Shield size={18} />,
              content: (
                <div className="ihub-p-6">
                  <h3 className="ihub-mb-4">Privacy Settings</h3>
                  <p>Control your privacy and data sharing preferences.</p>
                  
                  <div className="ihub-mt-4 ihub-space-y-3">
                    <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                      <label>Analytics Tracking</label>
                      <input type="checkbox" defaultChecked />
                    </div>
                    <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                      <label>Data Collection</label>
                      <input type="checkbox" />
                    </div>
                    <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                      <label>Marketing Emails</label>
                      <input type="checkbox" defaultChecked />
                    </div>
                  </div>
                </div>
              ),
            }
          ]}
          defaultActiveTab={settingsActiveTab}
          onChange={(tabItem) => setSettingsActiveTab(tabItem.id as string)}
          className="ihub-border ihub-rounded-lg ihub-bg-white ihub-shadow-lg"
          tabsContainerClassName="ihub-bg-gradient-to-b ihub-from-blue-50 ihub-to-blue-100"
          contentClassName="ihub-bg-gray-50"
        />
      </div>

      {/* Example 5: Simple Without Icons */}
      <div className="ihub-mb-8">
        <h2 className="ihub-mb-4">5. Simple Text-Only Tabs</h2>
        <p className="ihub-mb-4">Minimal vertical tabs without icons for clean interfaces.</p>
        
        <VerticalTabs
          items={[
            {
              id: "tab1",
              label: "Personal Information",
              content: (
                <div className="ihub-p-6">
                  <h3 className="ihub-mb-4">Personal Information</h3>
                  <p>Basic personal details and contact information.</p>
                  
                  <div className="ihub-mt-4 ihub-space-y-3">
                    <input type="text" placeholder="First Name" className="ihub-p-2 ihub-border ihub-rounded ihub-w-full" />
                    <input type="text" placeholder="Last Name" className="ihub-p-2 ihub-border ihub-rounded ihub-w-full" />
                    <input type="email" placeholder="Email Address" className="ihub-p-2 ihub-border ihub-rounded ihub-w-full" />
                  </div>
                </div>
              ),
            },
            {
              id: "tab2",
              label: "Address Details",
              content: (
                <div className="ihub-p-6">
                  <h3 className="ihub-mb-4">Address Information</h3>
                  <p>Your residential and mailing address details.</p>
                  
                  <div className="ihub-mt-4 ihub-space-y-3">
                    <input type="text" placeholder="Street Address" className="ihub-p-2 ihub-border ihub-rounded ihub-w-full" />
                    <div className="ihub-row">
                      <div className="ihub-col-md-6">
                        <input type="text" placeholder="City" className="ihub-p-2 ihub-border ihub-rounded ihub-w-full" />
                      </div>
                      <div className="ihub-col-md-6">
                        <input type="text" placeholder="Zip Code" className="ihub-p-2 ihub-border ihub-rounded ihub-w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: "tab3",
              label: "Preferences",
              content: (
                <div className="ihub-p-6">
                  <h3 className="ihub-mb-4">User Preferences</h3>
                  <p>Configure your preferences and settings.</p>
                  
                  <div className="ihub-mt-4 ihub-space-y-3">
                    <div>
                      <label className="ihub-block ihub-mb-1">Newsletter Frequency</label>
                      <select className="ihub-p-2 ihub-border ihub-rounded ihub-w-full">
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        <option>Never</option>
                      </select>
                    </div>
                  </div>
                </div>
              ),
            }
          ]}
          defaultActiveTab="tab1"
          className="ihub-border ihub-rounded-lg ihub-bg-white"
        />
      </div>
    </div>
  );
};

export default VerticalTabsExamples;
```

## 🔗 Related Components

- [Tabs](./Tabs.md) - Horizontal tab navigation component
- [TabContent](./TabContent.md) - Tab content display component

