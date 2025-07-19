# Tabs

**Category:** Tabs | **Type:** component

A flexible tabs component that supports multiple visual variants and provides an accessible tabbed interface for organizing content into separate views.

## 🏷️ Tags

`tabs`, `navigation`, `content`, `ui`

```tsx
"use client";

import React, { useState } from "react";
import { Tabs, InputText, SubmitButton, ColorPicker } from "@instincthub/react-ui";
import { TabItemType } from "@/types";

/**
 * Comprehensive example demonstrating all Tabs component features and use cases
 */
const TabsExamples = () => {
  // State for controlled tabs
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    color: "#007bff",
  });

  // Handle tab changes
  const handleTabChange = (tab: TabItemType) => {
    setActiveTab(tab.id);
    console.log(`Tab changed to: ${tab.id}`);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Basic tabs for simple content organization
  const basicTabs: TabItemType[] = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <div className="ihub-py-4">
          <h3>Project Overview</h3>
          <p>This section provides a high-level overview of your project including key metrics, recent activity, and important announcements.</p>
          <div className="ihub-mt-3">
            <h4>Key Features:</h4>
            <ul>
              <li>Real-time data synchronization</li>
              <li>Advanced analytics dashboard</li>
              <li>Team collaboration tools</li>
              <li>Automated reporting</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "analytics",
      label: "Analytics",
      content: (
        <div className="ihub-py-4">
          <h3>Analytics Dashboard</h3>
          <p>View detailed analytics and performance metrics for your application.</p>
          <div className="ihub-grid ihub-grid-cols-2 ihub-gap-4 ihub-mt-4">
            <div className="ihub-p-4 ihub-border ihub-rounded">
              <h4>Page Views</h4>
              <p className="ihub-text-2xl ihub-font-bold">12,543</p>
            </div>
            <div className="ihub-p-4 ihub-border ihub-rounded">
              <h4>Active Users</h4>
              <p className="ihub-text-2xl ihub-font-bold">1,847</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "reports",
      label: "Reports",
      content: (
        <div className="ihub-py-4">
          <h3>Generated Reports</h3>
          <p>Access and download your generated reports and documents.</p>
          <div className="ihub-mt-4">
            <div className="ihub-border ihub-rounded ihub-p-3 ihub-mb-2">
              <h5>Monthly Sales Report - November 2024</h5>
              <p className="ihub-text-sm ihub-text-gray-600">Generated on Nov 30, 2024</p>
            </div>
            <div className="ihub-border ihub-rounded ihub-p-3 ihub-mb-2">
              <h5>User Activity Analysis - Q4 2024</h5>
              <p className="ihub-text-sm ihub-text-gray-600">Generated on Dec 1, 2024</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "admin",
      label: "Admin Panel",
      disabled: true,
      content: (
        <div className="ihub-py-4">
          <h3>Admin Panel</h3>
          <p>This section is restricted to administrators only.</p>
        </div>
      ),
    },
  ];

  // Settings tabs with form content
  const settingsTabs: TabItemType[] = [
    {
      id: "profile",
      label: "Profile Settings",
      content: (
        <div className="ihub-py-4">
          <h3>Profile Information</h3>
          <div className="ihub-space-y-4">
            <InputText
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="ihub-input"
            />
            <InputText
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="ihub-input"
            />
            <div>
              <label className="ihub-label">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself"
                className="ihub-input"
                rows={4}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "appearance",
      label: "Appearance",
      content: (
        <div className="ihub-py-4">
          <h3>Appearance Settings</h3>
          <div className="ihub-space-y-4">
            <div>
              <label className="ihub-label">Theme Color</label>
              <ColorPicker
                value={formData.color}
                onChange={(color) => setFormData(prev => ({ ...prev, color }))}
              />
            </div>
            <div>
              <label className="ihub-label">Font Size</label>
              <select className="ihub-input">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "notifications",
      label: "Notifications",
      content: (
        <div className="ihub-py-4">
          <h3>Notification Preferences</h3>
          <div className="ihub-space-y-3">
            <label className="ihub-d-flex ihub-align-items-center">
              <input type="checkbox" className="ihub-mr-2" defaultChecked />
              Email notifications
            </label>
            <label className="ihub-d-flex ihub-align-items-center">
              <input type="checkbox" className="ihub-mr-2" />
              Push notifications
            </label>
            <label className="ihub-d-flex ihub-align-items-center">
              <input type="checkbox" className="ihub-mr-2" defaultChecked />
              SMS notifications
            </label>
          </div>
        </div>
      ),
    },
    {
      id: "privacy",
      label: "Privacy & Security",
      content: (
        <div className="ihub-py-4">
          <h3>Privacy & Security Settings</h3>
          <div className="ihub-space-y-4">
            <div>
              <h4>Two-Factor Authentication</h4>
              <p className="ihub-text-sm ihub-text-gray-600 ihub-mb-2">
                Add an extra layer of security to your account
              </p>
              <button className="ihub-primary-btn">Enable 2FA</button>
            </div>
            <div>
              <h4>Privacy Settings</h4>
              <label className="ihub-d-flex ihub-align-items-center ihub-mt-2">
                <input type="checkbox" className="ihub-mr-2" />
                Make profile public
              </label>
              <label className="ihub-d-flex ihub-align-items-center ihub-mt-1">
                <input type="checkbox" className="ihub-mr-2" defaultChecked />
                Allow search engines to index profile
              </label>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // Documentation tabs
  const docTabs: TabItemType[] = [
    {
      id: "quickstart",
      label: "Quick Start",
      content: (
        <div className="ihub-py-4">
          <h3>Quick Start Guide</h3>
          <p>Get up and running in minutes with these simple steps:</p>
          <ol className="ihub-list-decimal ihub-list-inside ihub-mt-3 ihub-space-y-2">
            <li>Install the package: <code className="ihub-bg-gray-100 ihub-px-2 ihub-py-1 ihub-rounded">npm install @instincthub/react-ui</code></li>
            <li>Import the component in your React application</li>
            <li>Configure your tab items with content</li>
            <li>Customize the appearance with variants and styling</li>
          </ol>
        </div>
      ),
    },
    {
      id: "api",
      label: "API Reference",
      content: (
        <div className="ihub-py-4">
          <h3>API Reference</h3>
          <div className="ihub-space-y-4">
            <div>
              <h4>Props</h4>
              <ul className="ihub-space-y-2">
                <li><strong>items:</strong> TabItemType[] - Array of tab items</li>
                <li><strong>defaultActiveTab:</strong> string | number (optional) - ID of initially active tab</li>
                <li><strong>onChange:</strong> function (optional) - Callback when tab changes</li>
                <li><strong>variant:</strong> "default" | "bordered" | "pills" (optional) - Visual variant</li>
                <li><strong>className:</strong> string (optional) - Additional CSS class</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "examples",
      label: "Code Examples",
      content: (
        <div className="ihub-py-4">
          <h3>Code Examples</h3>
          <pre className="ihub-bg-gray-100 ihub-p-4 ihub-rounded ihub-overflow-x-auto">
{`const tabItems = [
  {
    id: "home",
    label: "Home",
    content: <div>Home content</div>
  },
  {
    id: "about",
    label: "About",
    content: <div>About content</div>
  }
];

<Tabs
  items={tabItems}
  defaultActiveTab="home"
  variant="bordered"
  onChange={(tab) => console.log(tab)}
/>`}
          </pre>
        </div>
      ),
    },
  ];

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>Tabs Component Examples</h1>
      
      {/* Basic Usage Section */}
      <section className="ihub-mb-8">
        <h2>Basic Tabs (Default Variant)</h2>
        <p className="ihub-mb-4">
          Simple tab navigation with default styling. Perfect for organizing content into logical sections.
        </p>
        <Tabs
          items={basicTabs}
          defaultActiveTab={activeTab}
          onChange={handleTabChange}
          variant="default"
        />
      </section>

      {/* Bordered Variant */}
      <section className="ihub-mb-8">
        <h2>Bordered Tabs</h2>
        <p className="ihub-mb-4">
          Tabs with border styling for a more defined appearance. Great for forms and settings interfaces.
        </p>
        <Tabs
          items={settingsTabs}
          defaultActiveTab="profile"
          variant="bordered"
          onChange={(tab) => console.log("Settings tab changed:", tab.id)}
        />
      </section>

      {/* Pills Variant */}
      <section className="ihub-mb-8">
        <h2>Pills Tabs</h2>
        <p className="ihub-mb-4">
          Rounded pill-style tabs for a modern, button-like appearance. Perfect for navigation and filters.
        </p>
        <Tabs
          items={docTabs}
          defaultActiveTab="quickstart"
          variant="pills"
          onChange={(tab) => console.log("Doc tab changed:", tab.id)}
        />
      </section>

      {/* Custom Styling Example */}
      <section className="ihub-mb-8">
        <h2>Custom Styled Tabs</h2>
        <p className="ihub-mb-4">
          Tabs with custom CSS classes for unique styling and branding.
        </p>
        <Tabs
          items={[
            {
              id: "custom1",
              label: "🏠 Dashboard",
              content: (
                <div className="ihub-py-4">
                  <h3>Custom Dashboard</h3>
                  <p>This tab demonstrates custom styling with icons and colors.</p>
                </div>
              ),
            },
            {
              id: "custom2",
              label: "📊 Statistics",
              content: (
                <div className="ihub-py-4">
                  <h3>Statistics View</h3>
                  <p>Advanced analytics and reporting dashboard.</p>
                </div>
              ),
            },
            {
              id: "custom3",
              label: "⚙️ Settings",
              content: (
                <div className="ihub-py-4">
                  <h3>Application Settings</h3>
                  <p>Configure your application preferences and options.</p>
                </div>
              ),
            },
          ]}
          defaultActiveTab="custom1"
          variant="pills"
          className="ihub-custom-tabs"
          tabsContainerClassName="ihub-bg-light"
          contentClassName="ihub-border ihub-rounded ihub-mt-3"
        />
      </section>

      {/* Uncontrolled vs Controlled Example */}
      <section className="ihub-mb-8">
        <h2>Controlled Tab State</h2>
        <p className="ihub-mb-4">
          Example showing controlled tab state with external controls.
        </p>
        <div className="ihub-mb-4">
          <button
            className="ihub-primary-btn ihub-mr-2"
            onClick={() => setActiveTab("overview")}
          >
            Go to Overview
          </button>
          <button
            className="ihub-outlined-btn ihub-mr-2"
            onClick={() => setActiveTab("analytics")}
          >
            Go to Analytics
          </button>
          <button
            className="ihub-secondary-btn"
            onClick={() => setActiveTab("reports")}
          >
            Go to Reports
          </button>
        </div>
        <Tabs
          items={basicTabs}
          defaultActiveTab={activeTab}
          onChange={handleTabChange}
          variant="bordered"
        />
        <p className="ihub-mt-2 ihub-text-sm ihub-text-gray-600">
          Current active tab: <strong>{activeTab}</strong>
        </p>
      </section>

      {/* Keyboard Navigation Info */}
      <section className="ihub-mb-8">
        <h2>Accessibility Features</h2>
        <div className="ihub-bg-light ihub-p-4 ihub-rounded">
          <h3>Keyboard Navigation</h3>
          <ul className="ihub-space-y-1">
            <li><strong>Tab:</strong> Navigate between tabs</li>
            <li><strong>Enter/Space:</strong> Activate focused tab</li>
            <li><strong>Arrow Keys:</strong> Navigate between tabs (when focused)</li>
          </ul>
          <h3 className="ihub-mt-4">ARIA Support</h3>
          <ul className="ihub-space-y-1">
            <li>Proper role="tab" attributes</li>
            <li>aria-selected state management</li>
            <li>Disabled tabs have tabindex="-1"</li>
          </ul>
        </div>
      </section>

      {/* Integration with Forms */}
      <section className="ihub-mb-8">
        <h2>Form Integration Example</h2>
        <p className="ihub-mb-4">
          Tabs integrated with form controls and validation.
        </p>
        <Tabs
          items={settingsTabs}
          defaultActiveTab="profile"
          variant="default"
        />
        <div className="ihub-mt-4 ihub-d-flex ihub-gap-2">
          <SubmitButton
            label="Save Changes"
            type="button"
            status={1}
            disabled={!formData.name || !formData.email}
          />
          <button className="ihub-outlined-btn" type="button">
            Cancel
          </button>
        </div>
      </section>
    </div>
  );
};

export default TabsExamples;
```

## 🔗 Related Components

- [VerticalTabs](./VerticalTabs.md) - Vertical tab navigation component
- [TabContent](./TabContent.md) - Tab content display component

