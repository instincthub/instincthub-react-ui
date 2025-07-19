# TBodyNoData

**Category:** Forms | **Type:** component

Table body empty state component for displaying "no data" messages with customizable content and actions

**File Location:** `src/components/forms/TBodyNoData.tsx`

## 🏷️ Tags

`forms`, `table`, `empty-state`, `tbody`, `no-data`

```tsx
"use client";
import React, { useState } from "react";
import { TBodyNoData } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive examples demonstrating TBodyNoData usage
 * Shows different empty states, table integration, and customization options
 */
const TBodyNoDataExamples = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const sampleUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive" },
  ];

  const handleAddSampleData = () => {
    setUsers(sampleUsers);
    openToast("Sample data added to table");
  };

  const handleClearData = () => {
    setUsers([]);
    setProducts([]);
    setFilteredData([]);
    openToast("All data cleared");
  };

  const handleCreateUser = () => {
    const newUser = {
      id: Date.now(),
      name: "New User",
      email: "newuser@example.com",
      role: "User",
      status: "Active"
    };
    setUsers(prev => [...prev, newUser]);
    openToast("New user created");
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setUsers(sampleUsers);
    setIsLoading(false);
    openToast("Data refreshed");
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term) {
      const filtered = sampleUsers.filter(user =>
        user.name.toLowerCase().includes(term.toLowerCase()) ||
        user.email.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>TBodyNoData Examples</h1>
      <p className="ihub-mb-4">
        Table body empty state component for handling no data scenarios
        with customizable messages, icons, and actions.
      </p>

      {/* Basic Empty State */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Basic Empty State</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Users Table</h3>
            <p className="ihub-text-muted">Simple table with basic empty state</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-table-controls ihub-mb-3">
              <button
                className="ihub-primary-btn ihub-me-2"
                onClick={handleAddSampleData}
              >
                Add Sample Data
              </button>
              <button
                className="ihub-outlined-btn"
                onClick={handleClearData}
              >
                Clear Data
              </button>
            </div>
            
            <div className="ihub-table-responsive">
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
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <span className={`ihub-status-badge ${user.status.toLowerCase()}`}>
                            {user.status}
                          </span>
                        </td>
                        <td>
                          <button className="ihub-outlined-btn ihub-btn-sm">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <TBodyNoData
                      colSpan={5}
                      message="No users found"
                      description="There are currently no users in the system"
                      className="ihub-basic-no-data"
                    />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* No Data with Actions */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Empty State with Actions</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Products Inventory</h3>
            <p className="ihub-text-muted">Empty state with call-to-action buttons</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-table-responsive">
              <table className="ihub-table">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>SKU</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.sku}</td>
                        <td>${product.price}</td>
                        <td>{product.stock}</td>
                        <td>{product.category}</td>
                        <td>
                          <button className="ihub-outlined-btn ihub-btn-sm">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <TBodyNoData
                      colSpan={6}
                      icon="📦"
                      message="No products in inventory"
                      description="Start by adding your first product to the inventory system"
                      actions={[
                        {
                          label: "Add Product",
                          onClick: () => openToast("Navigate to add product form"),
                          variant: "primary"
                        },
                        {
                          label: "Import Products",
                          onClick: () => openToast("Open import dialog"),
                          variant: "outlined"
                        }
                      ]}
                      className="ihub-products-no-data"
                    />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Loading State */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Loading and Refresh States</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Team Members</h3>
            <p className="ihub-text-muted">Empty state with loading and refresh functionality</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-table-controls ihub-mb-3">
              <button
                className="ihub-primary-btn"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Refresh Data'}
              </button>
            </div>
            
            <div className="ihub-table-responsive">
              <table className="ihub-table">
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <TBodyNoData
                      colSpan={5}
                      icon="⏳"
                      message="Loading team members..."
                      description="Please wait while we fetch the latest data"
                      showLoading={true}
                      className="ihub-loading-state"
                    />
                  ) : users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>Engineering</td>
                        <td>{user.role}</td>
                        <td>
                          <span className={`ihub-status-badge ${user.status.toLowerCase()}`}>
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <TBodyNoData
                      colSpan={5}
                      icon="👥"
                      message="No team members found"
                      description="It looks like your team is empty. Add some members to get started!"
                      actions={[
                        {
                          label: "Invite Members",
                          onClick: () => openToast("Open invite dialog"),
                          variant: "primary"
                        },
                        {
                          label: "Refresh",
                          onClick: handleRefresh,
                          variant: "outlined"
                        }
                      ]}
                      className="ihub-team-no-data"
                    />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results Empty State */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Search Results Empty State</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>User Search</h3>
            <p className="ihub-text-muted">Empty state for filtered/search results</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-search-controls ihub-mb-3">
              <input
                type="text"
                className="ihub-input"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            
            <div className="ihub-table-responsive">
              <table className="ihub-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {searchTerm ? (
                    filteredData.length > 0 ? (
                      filteredData.map((user) => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>
                            <span className={`ihub-status-badge ${user.status.toLowerCase()}`}>
                              {user.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <TBodyNoData
                        colSpan={4}
                        icon="🔍"
                        message={`No results for "${searchTerm}"`}
                        description="Try adjusting your search terms or check for typos"
                        actions={[
                          {
                            label: "Clear Search",
                            onClick: () => handleSearch(""),
                            variant: "outlined"
                          },
                          {
                            label: "Add New User",
                            onClick: handleCreateUser,
                            variant: "primary"
                          }
                        ]}
                        className="ihub-search-no-data"
                      />
                    )
                  ) : (
                    <TBodyNoData
                      colSpan={4}
                      icon="🔍"
                      message="Start searching"
                      description="Enter a name or email to search for users"
                      className="ihub-search-prompt"
                    />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Error State */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Error and Custom States</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Error State</h3>
              </div>
              <div className="ihub-card-body">
                <div className="ihub-table-responsive">
                  <table className="ihub-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <TBodyNoData
                        colSpan={4}
                        icon="⚠️"
                        message="Failed to load orders"
                        description="There was an error connecting to the server"
                        actions={[
                          {
                            label: "Retry",
                            onClick: () => openToast("Retrying connection..."),
                            variant: "primary"
                          }
                        ]}
                        className="ihub-error-state"
                        variant="error"
                      />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Custom State</h3>
              </div>
              <div className="ihub-card-body">
                <div className="ihub-table-responsive">
                  <table className="ihub-table">
                    <thead>
                      <tr>
                        <th>Report</th>
                        <th>Date</th>
                        <th>Size</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <TBodyNoData
                        colSpan={4}
                        icon="📊"
                        message="No reports generated"
                        description="Reports will appear here once you create them"
                        actions={[
                          {
                            label: "Generate Report",
                            onClick: () => openToast("Opening report builder..."),
                            variant: "primary"
                          }
                        ]}
                        className="ihub-reports-no-data"
                        customContent={
                          <div className="ihub-custom-empty-content">
                            <div className="ihub-empty-illustration">
                              <div className="ihub-chart-placeholder">
                                <div className="ihub-bar"></div>
                                <div className="ihub-bar"></div>
                                <div className="ihub-bar"></div>
                              </div>
                            </div>
                          </div>
                        }
                      />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Implementation Guide</h2>
        <div className="ihub-card ihub-p-4">
          <h3>Props Interface:</h3>
          <pre className="ihub-code-block">
{`interface TBodyNoDataProps {
  colSpan: number;                      // Number of columns to span
  message?: string;                     // Primary message
  description?: string;                 // Secondary description
  icon?: string | React.ReactNode;      // Icon or emoji
  className?: string;                   // CSS classes
  variant?: 'default' | 'error' | 'warning' | 'info'; // Style variant
  showLoading?: boolean;                // Show loading spinner
  actions?: Array<{                     // Action buttons
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'outlined' | 'text';
  }>;
  customContent?: React.ReactNode;      // Custom content override
  height?: string;                      // Minimum height
}`}
          </pre>
          
          <h3 className="ihub-mt-3">Key Features:</h3>
          <ul>
            <li><strong>Table Integration:</strong> Seamless integration with table layouts</li>
            <li><strong>Customizable Content:</strong> Icons, messages, and descriptions</li>
            <li><strong>Action Buttons:</strong> Call-to-action buttons for user guidance</li>
            <li><strong>Loading States:</strong> Built-in loading spinner support</li>
            <li><strong>Variants:</strong> Different visual states for various scenarios</li>
            <li><strong>Responsive:</strong> Mobile-friendly display and layout</li>
          </ul>
          
          <h3 className="ihub-mt-3">Best Practices:</h3>
          <ul>
            <li>Always specify the correct colSpan to match table headers</li>
            <li>Use descriptive messages that guide users on next steps</li>
            <li>Provide relevant actions for empty states when possible</li>
            <li>Use appropriate icons or illustrations to enhance the message</li>
            <li>Consider different states: empty, loading, error, search results</li>
            <li>Maintain consistent styling with your table design</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default TBodyNoDataExamples;
```

## 🔗 Related Components

- [ActionDropdown](./ActionDropdown.md) - Dropdown component for actions
- [AnimatedBox](./AnimatedBox.md) - Animated container component
- [PasswordField](./PasswordField.md) - Secure password input field
- [DateInput](./DateInput.md) - Date selection input field
- [DateTimeInput](./DateTimeInput.md) - Date and time selection input field

