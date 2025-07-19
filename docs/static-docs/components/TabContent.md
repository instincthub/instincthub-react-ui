# TabContent

**Category:** Tabs | **Type:** component

Tab content display component for rendering tab panel content with animations and conditional visibility

**File Location:** `src/components/tabs/TabContent.tsx`

## 🏷️ Tags

`tabs`, `content`, `panel`, `conditional`, `animation`

```tsx
"use client";
import React, { useState } from "react";
import { TabContent } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive examples demonstrating TabContent usage
 * Shows different content types, animations, and integration patterns
 */
const TabContentExamples = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [profileTab, setProfileTab] = useState<string>("personal");
  const [settingsTab, setSettingsTab] = useState<string>("general");
  const [dashboardTab, setDashboardTab] = useState<string>("analytics");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    openToast(`Switched to ${tabId} tab`);
  };

  const handleProfileTabChange = (tabId: string) => {
    setProfileTab(tabId);
  };

  const handleSettingsTabChange = (tabId: string) => {
    setSettingsTab(tabId);
  };

  const handleDashboardTabChange = (tabId: string) => {
    setDashboardTab(tabId);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>TabContent Examples</h1>
      <p className="ihub-mb-4">
        Tab content display component for rendering different content panels
        based on active tab state with smooth transitions and animations.
      </p>

      {/* Basic Tab Content */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Basic Tab Content</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Product Information</h3>
            <p className="ihub-text-muted">Simple tab content with text and basic formatting</p>
          </div>
          
          <div className="ihub-card-body">
            {/* Tab Navigation */}
            <div className="ihub-tab-nav ihub-mb-4">
              <button
                className={`ihub-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => handleTabChange('overview')}
              >
                Overview
              </button>
              <button
                className={`ihub-tab-btn ${activeTab === 'features' ? 'active' : ''}`}
                onClick={() => handleTabChange('features')}
              >
                Features
              </button>
              <button
                className={`ihub-tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
                onClick={() => handleTabChange('specs')}
              >
                Specifications
              </button>
              <button
                className={`ihub-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => handleTabChange('reviews')}
              >
                Reviews
              </button>
            </div>

            {/* Tab Content Panels */}
            <TabContent
              isActive={activeTab === 'overview'}
              tabId="overview"
              className="ihub-tab-overview"
            >
              <div className="ihub-overview-content">
                <h4>Product Overview</h4>
                <p>
                  This is a comprehensive React UI component library designed to accelerate
                  development and provide consistent user experiences across applications.
                </p>
                <div className="ihub-overview-stats">
                  <div className="ihub-stat">
                    <span className="ihub-stat-value">50+</span>
                    <span className="ihub-stat-label">Components</span>
                  </div>
                  <div className="ihub-stat">
                    <span className="ihub-stat-value">TypeScript</span>
                    <span className="ihub-stat-label">Built With</span>
                  </div>
                  <div className="ihub-stat">
                    <span className="ihub-stat-value">React 18</span>
                    <span className="ihub-stat-label">Compatible</span>
                  </div>
                </div>
              </div>
            </TabContent>

            <TabContent
              isActive={activeTab === 'features'}
              tabId="features"
              className="ihub-tab-features"
            >
              <div className="ihub-features-content">
                <h4>Key Features</h4>
                <ul className="ihub-feature-list">
                  <li>✨ Modern React components with TypeScript support</li>
                  <li>🎨 Customizable design system with CSS variables</li>
                  <li>📱 Responsive design for all screen sizes</li>
                  <li>♿ Accessibility-first development approach</li>
                  <li>🚀 Optimized for performance and bundle size</li>
                  <li>📚 Comprehensive documentation with examples</li>
                  <li>🔧 Easy integration with existing projects</li>
                  <li>🎯 Form validation and error handling</li>
                </ul>
              </div>
            </TabContent>

            <TabContent
              isActive={activeTab === 'specs'}
              tabId="specs"
              className="ihub-tab-specs"
            >
              <div className="ihub-specs-content">
                <h4>Technical Specifications</h4>
                <div className="ihub-specs-table">
                  <div className="ihub-spec-row">
                    <span className="ihub-spec-label">Framework:</span>
                    <span className="ihub-spec-value">React 18+</span>
                  </div>
                  <div className="ihub-spec-row">
                    <span className="ihub-spec-label">Language:</span>
                    <span className="ihub-spec-value">TypeScript</span>
                  </div>
                  <div className="ihub-spec-row">
                    <span className="ihub-spec-label">Styling:</span>
                    <span className="ihub-spec-value">CSS Modules</span>
                  </div>
                  <div className="ihub-spec-row">
                    <span className="ihub-spec-label">Bundle Size:</span>
                    <span className="ihub-spec-value">~45KB gzipped</span>
                  </div>
                  <div className="ihub-spec-row">
                    <span className="ihub-spec-label">Browser Support:</span>
                    <span className="ihub-spec-value">Chrome, Firefox, Safari, Edge</span>
                  </div>
                </div>
              </div>
            </TabContent>

            <TabContent
              isActive={activeTab === 'reviews'}
              tabId="reviews"
              className="ihub-tab-reviews"
            >
              <div className="ihub-reviews-content">
                <h4>Customer Reviews</h4>
                <div className="ihub-review-summary">
                  <div className="ihub-rating-overview">
                    <span className="ihub-rating-score">4.8</span>
                    <div className="ihub-rating-stars">★★★★★</div>
                    <span className="ihub-rating-count">Based on 127 reviews</span>
                  </div>
                </div>
                <div className="ihub-reviews-list">
                  <div className="ihub-review">
                    <div className="ihub-review-header">
                      <span className="ihub-reviewer">Sarah M.</span>
                      <span className="ihub-review-rating">★★★★★</span>
                    </div>
                    <p>"Excellent component library! Saved us weeks of development time."</p>
                  </div>
                  <div className="ihub-review">
                    <div className="ihub-review-header">
                      <span className="ihub-reviewer">Mike K.</span>
                      <span className="ihub-review-rating">★★★★☆</span>
                    </div>
                    <p>"Great documentation and examples. Very easy to integrate."</p>
                  </div>
                </div>
              </div>
            </TabContent>
          </div>
        </div>
      </section>

      {/* Rich Content Tabs */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Rich Content Tabs</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>User Profile</h3>
            <p className="ihub-text-muted">Complex content with forms and interactive elements</p>
          </div>
          
          <div className="ihub-card-body">
            {/* Tab Navigation */}
            <div className="ihub-tab-nav ihub-mb-4">
              <button
                className={`ihub-tab-btn ${profileTab === 'personal' ? 'active' : ''}`}
                onClick={() => handleProfileTabChange('personal')}
              >
                Personal Info
              </button>
              <button
                className={`ihub-tab-btn ${profileTab === 'security' ? 'active' : ''}`}
                onClick={() => handleProfileTabChange('security')}
              >
                Security
              </button>
              <button
                className={`ihub-tab-btn ${profileTab === 'preferences' ? 'active' : ''}`}
                onClick={() => handleProfileTabChange('preferences')}
              >
                Preferences
              </button>
              <button
                className={`ihub-tab-btn ${profileTab === 'activity' ? 'active' : ''}`}
                onClick={() => handleProfileTabChange('activity')}
              >
                Activity
              </button>
            </div>

            {/* Personal Info Tab */}
            <TabContent
              isActive={profileTab === 'personal'}
              tabId="personal"
              className="ihub-tab-personal"
              animate={true}
            >
              <div className="ihub-personal-content">
                <h4>Personal Information</h4>
                <form className="ihub-profile-form">
                  <div className="ihub-row">
                    <div className="ihub-col-md-6">
                      <div className="ihub-form-group">
                        <label className="ihub-form-label">First Name</label>
                        <input
                          type="text"
                          className="ihub-input"
                          defaultValue="John"
                        />
                      </div>
                    </div>
                    <div className="ihub-col-md-6">
                      <div className="ihub-form-group">
                        <label className="ihub-form-label">Last Name</label>
                        <input
                          type="text"
                          className="ihub-input"
                          defaultValue="Doe"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="ihub-form-group">
                    <label className="ihub-form-label">Email</label>
                    <input
                      type="email"
                      className="ihub-input"
                      defaultValue="john.doe@example.com"
                    />
                  </div>
                  <div className="ihub-form-group">
                    <label className="ihub-form-label">Bio</label>
                    <textarea
                      className="ihub-textarea"
                      rows={4}
                      defaultValue="Software developer with 5+ years of experience..."
                    />
                  </div>
                  <button
                    type="button"
                    className="ihub-primary-btn"
                    onClick={() => openToast("Profile updated successfully!")}
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </TabContent>

            {/* Security Tab */}
            <TabContent
              isActive={profileTab === 'security'}
              tabId="security"
              className="ihub-tab-security"
              animate={true}
            >
              <div className="ihub-security-content">
                <h4>Security Settings</h4>
                <div className="ihub-security-options">
                  <div className="ihub-security-item">
                    <h5>Two-Factor Authentication</h5>
                    <p>Add an extra layer of security to your account</p>
                    <button className="ihub-success-btn">Enable 2FA</button>
                  </div>
                  <div className="ihub-security-item">
                    <h5>Password</h5>
                    <p>Last changed 3 months ago</p>
                    <button className="ihub-outlined-btn">Change Password</button>
                  </div>
                  <div className="ihub-security-item">
                    <h5>Login Sessions</h5>
                    <p>Manage your active sessions across devices</p>
                    <button className="ihub-outlined-btn">View Sessions</button>
                  </div>
                </div>
              </div>
            </TabContent>

            {/* Preferences Tab */}
            <TabContent
              isActive={profileTab === 'preferences'}
              tabId="preferences"
              className="ihub-tab-preferences"
              animate={true}
            >
              <div className="ihub-preferences-content">
                <h4>User Preferences</h4>
                <div className="ihub-preferences-grid">
                  <div className="ihub-preference-group">
                    <h5>Appearance</h5>
                    <div className="ihub-preference-item">
                      <label className="ihub-checkbox-label">
                        <input type="checkbox" defaultChecked />
                        Dark mode
                      </label>
                    </div>
                    <div className="ihub-preference-item">
                      <label className="ihub-form-label">Language</label>
                      <select className="ihub-select">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                    </div>
                  </div>
                  <div className="ihub-preference-group">
                    <h5>Notifications</h5>
                    <div className="ihub-preference-item">
                      <label className="ihub-checkbox-label">
                        <input type="checkbox" defaultChecked />
                        Email notifications
                      </label>
                    </div>
                    <div className="ihub-preference-item">
                      <label className="ihub-checkbox-label">
                        <input type="checkbox" />
                        Push notifications
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </TabContent>

            {/* Activity Tab */}
            <TabContent
              isActive={profileTab === 'activity'}
              tabId="activity"
              className="ihub-tab-activity"
              animate={true}
            >
              <div className="ihub-activity-content">
                <h4>Recent Activity</h4>
                <div className="ihub-activity-list">
                  <div className="ihub-activity-item">
                    <div className="ihub-activity-icon">📝</div>
                    <div className="ihub-activity-details">
                      <div className="ihub-activity-text">Updated profile information</div>
                      <div className="ihub-activity-time">2 hours ago</div>
                    </div>
                  </div>
                  <div className="ihub-activity-item">
                    <div className="ihub-activity-icon">🔐</div>
                    <div className="ihub-activity-details">
                      <div className="ihub-activity-text">Changed password</div>
                      <div className="ihub-activity-time">1 day ago</div>
                    </div>
                  </div>
                  <div className="ihub-activity-item">
                    <div className="ihub-activity-icon">📧</div>
                    <div className="ihub-activity-details">
                      <div className="ihub-activity-text">Email address verified</div>
                      <div className="ihub-activity-time">3 days ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabContent>
          </div>
        </div>
      </section>

      {/* Lazy Loading Content */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Lazy Loading Content</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Dashboard</h3>
            <p className="ihub-text-muted">Content loaded only when tab becomes active</p>
          </div>
          
          <div className="ihub-card-body">
            {/* Tab Navigation */}
            <div className="ihub-tab-nav ihub-mb-4">
              <button
                className={`ihub-tab-btn ${dashboardTab === 'analytics' ? 'active' : ''}`}
                onClick={() => handleDashboardTabChange('analytics')}
              >
                Analytics
              </button>
              <button
                className={`ihub-tab-btn ${dashboardTab === 'reports' ? 'active' : ''}`}
                onClick={() => handleDashboardTabChange('reports')}
              >
                Reports
              </button>
              <button
                className={`ihub-tab-btn ${dashboardTab === 'users' ? 'active' : ''}`}
                onClick={() => handleDashboardTabChange('users')}
              >
                Users
              </button>
            </div>

            {/* Analytics Tab */}
            <TabContent
              isActive={dashboardTab === 'analytics'}
              tabId="analytics"
              className="ihub-tab-analytics"
              lazyLoad={true}
              loadingText="Loading analytics data..."
            >
              <div className="ihub-analytics-content">
                <h4>Analytics Dashboard</h4>
                <div className="ihub-analytics-grid">
                  <div className="ihub-metric-card">
                    <h5>Total Users</h5>
                    <span className="ihub-metric-value">12,847</span>
                    <span className="ihub-metric-change positive">+5.2%</span>
                  </div>
                  <div className="ihub-metric-card">
                    <h5>Revenue</h5>
                    <span className="ihub-metric-value">$45,230</span>
                    <span className="ihub-metric-change positive">+12.8%</span>
                  </div>
                  <div className="ihub-metric-card">
                    <h5>Conversion Rate</h5>
                    <span className="ihub-metric-value">3.42%</span>
                    <span className="ihub-metric-change negative">-0.3%</span>
                  </div>
                  <div className="ihub-metric-card">
                    <h5>Bounce Rate</h5>
                    <span className="ihub-metric-value">34.2%</span>
                    <span className="ihub-metric-change positive">-2.1%</span>
                  </div>
                </div>
              </div>
            </TabContent>

            {/* Reports Tab */}
            <TabContent
              isActive={dashboardTab === 'reports'}
              tabId="reports"
              className="ihub-tab-reports"
              lazyLoad={true}
              loadingText="Generating reports..."
            >
              <div className="ihub-reports-content">
                <h4>Reports Center</h4>
                <div className="ihub-reports-list">
                  <div className="ihub-report-item">
                    <div className="ihub-report-info">
                      <h5>Monthly Sales Report</h5>
                      <p>Comprehensive sales analysis for the current month</p>
                    </div>
                    <div className="ihub-report-actions">
                      <button className="ihub-outlined-btn">Download</button>
                      <button className="ihub-primary-btn">View</button>
                    </div>
                  </div>
                  <div className="ihub-report-item">
                    <div className="ihub-report-info">
                      <h5>User Engagement Report</h5>
                      <p>Detailed user behavior and engagement metrics</p>
                    </div>
                    <div className="ihub-report-actions">
                      <button className="ihub-outlined-btn">Download</button>
                      <button className="ihub-primary-btn">View</button>
                    </div>
                  </div>
                </div>
              </div>
            </TabContent>

            {/* Users Tab */}
            <TabContent
              isActive={dashboardTab === 'users'}
              tabId="users"
              className="ihub-tab-users"
              lazyLoad={true}
              loadingText="Loading user data..."
            >
              <div className="ihub-users-content">
                <h4>User Management</h4>
                <div className="ihub-users-actions ihub-mb-3">
                  <button className="ihub-primary-btn">Add User</button>
                  <button className="ihub-outlined-btn">Import Users</button>
                </div>
                <div className="ihub-users-table">
                  <table className="ihub-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>John Doe</td>
                        <td>john@example.com</td>
                        <td>Admin</td>
                        <td><span className="ihub-status-badge active">Active</span></td>
                        <td><button className="ihub-outlined-btn ihub-btn-sm">Edit</button></td>
                      </tr>
                      <tr>
                        <td>Jane Smith</td>
                        <td>jane@example.com</td>
                        <td>User</td>
                        <td><span className="ihub-status-badge active">Active</span></td>
                        <td><button className="ihub-outlined-btn ihub-btn-sm">Edit</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabContent>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Implementation Guide</h2>
        <div className="ihub-card ihub-p-4">
          <h3>Props Interface:</h3>
          <pre className="ihub-code-block">
{`interface TabContentProps {
  children: React.ReactNode;            // Content to display
  isActive: boolean;                    // Whether this tab is active
  tabId: string;                        // Unique identifier for the tab
  className?: string;                   // CSS classes
  animate?: boolean;                    // Enable enter/exit animations
  lazyLoad?: boolean;                   // Load content only when active
  loadingText?: string;                 // Text to show while loading
  keepMounted?: boolean;                // Keep content in DOM when inactive
  onActivate?: () => void;              // Callback when tab becomes active
  onDeactivate?: () => void;            // Callback when tab becomes inactive
}`}
          </pre>
          
          <h3 className="ihub-mt-3">Key Features:</h3>
          <ul>
            <li><strong>Conditional Rendering:</strong> Only render active tab content</li>
            <li><strong>Smooth Animations:</strong> Optional enter/exit transitions</li>
            <li><strong>Lazy Loading:</strong> Load content only when needed</li>
            <li><strong>Memory Management:</strong> Unmount inactive content to save memory</li>
            <li><strong>Accessibility:</strong> Proper ARIA attributes and focus management</li>
            <li><strong>Flexible Content:</strong> Support for any React content</li>
          </ul>
          
          <h3 className="ihub-mt-3">Best Practices:</h3>
          <ul>
            <li>Use unique tabId values for each tab content</li>
            <li>Consider lazy loading for heavy content or data fetching</li>
            <li>Implement proper loading states for async content</li>
            <li>Use keepMounted for content that should persist between switches</li>
            <li>Provide meaningful loading text for better user experience</li>
            <li>Ensure keyboard navigation works properly with tab content</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default TabContentExamples;
```

## 🔗 Related Components

- [Tabs](./Tabs.md) - Tab navigation component
- [VerticalTabs](./VerticalTabs.md) - Vertical tab navigation component

