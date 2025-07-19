# Tables

**Category:** UI | **Type:** component

Comprehensive table components for displaying data with sorting, filtering, pagination, and various interactive features.

## 🏷️ Tags

`ui`, `table`, `data`, `sorting`, `filtering`, `pagination`

```tsx
"use client";
import React, { useState, useCallback } from "react";
import {
  Tables,
  IHubTable,
  IHubTableServer,
  ActionDropdown,
  SubmitButton,
} from "@instincthub/react-ui";
import { TableColumnType } from "@instincthub/react-ui/types";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

/**
 * Comprehensive table examples showing different layouts, features, and use cases
 */
const TableExamples = () => {
  // Data interfaces
  interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: "active" | "inactive" | "pending";
    createdAt: string;
    lastLogin: string;
    department: string;
    location: string;
    phone: string;
    avatar?: string;
  }

  interface Product {
    id: number;
    title: string;
    name: string;
    price: number;
    category: string;
    stock: number;
    status: "available" | "out_of_stock" | "discontinued";
    rating: number;
    tags: string[];
  }

  interface SimpleData {
    id: number;
    title: string;
  }

  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  // Sample data
  const simpleData: SimpleData[] = [
    { id: 1, title: "First Item" },
    { id: 2, title: "Second Item" },
    { id: 3, title: "Third Item" },
    { id: 4, title: "Fourth Item" },
    { id: 5, title: "Fifth Item" },
  ];

  const users: User[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "active",
      createdAt: "2023-01-15",
      lastLogin: "2023-04-10",
      department: "IT",
      location: "New York",
      phone: "+1 (555) 123-4567",
      avatar: "https://avatar.vercel.sh/john",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Editor",
      status: "active",
      createdAt: "2023-02-20",
      lastLogin: "2023-04-12",
      department: "Marketing",
      location: "San Francisco",
      phone: "+1 (555) 987-6543",
      avatar: "https://avatar.vercel.sh/jane",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.j@example.com",
      role: "Viewer",
      status: "inactive",
      createdAt: "2023-03-05",
      lastLogin: "2023-03-28",
      department: "Finance",
      location: "Chicago",
      phone: "+1 (555) 456-7890",
      avatar: "https://avatar.vercel.sh/robert",
    },
    {
      id: 4,
      name: "Emily Williams",
      email: "emily.w@example.com",
      role: "Editor",
      status: "pending",
      createdAt: "2023-04-10",
      lastLogin: "2023-04-10",
      department: "HR",
      location: "Boston",
      phone: "+1 (555) 234-5678",
      avatar: "https://avatar.vercel.sh/emily",
    },
    {
      id: 5,
      name: "Michael Brown",
      email: "michael.b@example.com",
      role: "Admin",
      status: "active",
      createdAt: "2023-05-22",
      lastLogin: "2023-04-11",
      department: "IT",
      location: "Seattle",
      phone: "+1 (555) 876-5432",
      avatar: "https://avatar.vercel.sh/michael",
    },
    {
      id: 6,
      name: "Sarah Davis",
      email: "sarah.d@example.com",
      role: "Manager",
      status: "active",
      createdAt: "2023-06-15",
      lastLogin: "2023-04-13",
      department: "Sales",
      location: "Los Angeles",
      phone: "+1 (555) 345-6789",
      avatar: "https://avatar.vercel.sh/sarah",
    },
  ];

  const products: Product[] = [
    {
      id: 1,
      title: "Smartphone Pro",
      name: "Smartphone Pro",
      price: 999.99,
      category: "Electronics",
      stock: 45,
      status: "available",
      rating: 4.8,
      tags: ["tech", "mobile", "premium"],
    },
    {
      id: 2,
      title: "Laptop Ultra",
      name: "Laptop Ultra",
      price: 1299.99,
      category: "Electronics",
      stock: 0,
      status: "out_of_stock",
      rating: 4.6,
      tags: ["tech", "computer", "work"],
    },
    {
      id: 3,
      title: "Wireless Headphones",
      name: "Wireless Headphones",
      price: 199.99,
      category: "Audio",
      stock: 23,
      status: "available",
      rating: 4.4,
      tags: ["audio", "wireless", "music"],
    },
    {
      id: 4,
      title: "Smart Watch",
      name: "Smart Watch",
      price: 299.99,
      category: "Wearables",
      stock: 15,
      status: "available",
      rating: 4.2,
      tags: ["wearable", "fitness", "smart"],
    },
    {
      id: 5,
      title: "Tablet Device",
      name: "Tablet Device",
      price: 399.99,
      category: "Electronics",
      stock: 0,
      status: "discontinued",
      rating: 3.8,
      tags: ["tablet", "portable", "work"],
    },
  ];

  // Key extractors
  const userKeyExtractor = useCallback((user: User) => user.id, []);
  const productKeyExtractor = useCallback((product: Product) => product.id, []);

  // Event handlers
  const handleUserRowClick = useCallback((user: User) => {
    console.log("User clicked:", user);
    // Navigate to user detail or open modal
  }, []);

  const handleProductRowClick = useCallback((product: Product) => {
    console.log("Product clicked:", product);
    // Navigate to product detail or open modal
  }, []);

  const handleUserSelectionChange = useCallback((selectedUsers: User[]) => {
    setSelectedUsers(selectedUsers);
    console.log("Selected users:", selectedUsers);
  }, []);

  const handleProductSelectionChange = useCallback(
    (selectedProducts: Product[]) => {
      setSelectedProducts(selectedProducts);
      console.log("Selected products:", selectedProducts);
    },
    []
  );

  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    console.log("Data refreshed");
  }, []);

  const handleSort = useCallback((column: keyof User, direction: "asc" | "desc") => {
    console.log(`Sorting by ${String(column)} ${direction}`);
    // Handle custom sorting logic if needed
  }, []);

  const handleFilter = useCallback((filters: any) => {
    console.log("Filters applied:", filters);
    // Handle custom filtering logic if needed
  }, []);

  // Action handlers
  const handleEditUser = useCallback((user: User) => {
    console.log("Edit user:", user);
    // Open edit modal or navigate to edit page
  }, []);

  const handleDeleteUser = useCallback((user: User) => {
    console.log("Delete user:", user);
    // Show confirmation modal and delete
  }, []);

  const handleViewUser = useCallback((user: User) => {
    console.log("View user:", user);
    // Navigate to user profile
  }, []);

  // Column definitions
  const simpleColumns: TableColumnType<SimpleData>[] = [
    {
      header: "ID",
      accessor: "id",
      width: "80px",
      sortable: true,
    },
    {
      header: "Title",
      accessor: "title",
      sortable: true,
      filterable: true,
    },
  ];

  const userColumns: TableColumnType<User>[] = [
    {
      header: "ID",
      accessor: "id",
      width: "80px",
      sortable: true,
    },
    {
      header: "User",
      accessor: "name",
      width: "300px",
      sortable: true,
      filterable: true,
      cell: (row) => (
        <div className="ihub-cell-with-icon">
          <div className="ihub-cell-avatar">
            <img
              src={row.avatar || "https://avatar.vercel.sh/default"}
              alt={row.name}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                marginRight: "12px",
              }}
            />
          </div>
          <div>
            <div style={{ fontWeight: "600" }}>{row.name}</div>
            <div style={{ fontSize: "0.875rem", color: "#666" }}>
              {row.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Role",
      accessor: "role",
      width: "120px",
      sortable: true,
      filterable: true,
      cell: (row) => (
        <span className={`ihub-role-badge ihub-role-${row.role.toLowerCase()}`}>
          {row.role}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      width: "120px",
      sortable: true,
      filterable: true,
      cell: (row) => (
        <span className={`ihub-status-badge ihub-status-${row.status}`}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      ),
    },
    {
      header: "Department",
      accessor: "department",
      sortable: true,
      filterable: true,
    },
    {
      header: "Location",
      accessor: "location",
      sortable: true,
      filterable: true,
    },
    {
      header: "Created",
      accessor: "createdAt",
      width: "150px",
      sortable: true,
      cell: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      header: "Actions",
      accessor: () => "",
      width: "120px",
      cell: (row) => (
        <div className="ihub-table-actions">
          <ActionDropdown
            options={[
              {
                label: "View",
                icon: <VisibilityOutlinedIcon />,
                onClick: () => handleViewUser(row),
              },
              {
                label: "Edit",
                icon: <EditOutlinedIcon />,
                onClick: () => handleEditUser(row),
              },
              {
                label: "Delete",
                icon: <DeleteOutlinedIcon />,
                onClick: () => handleDeleteUser(row),
                variant: "danger",
              },
            ]}
          />
        </div>
      ),
    },
  ];

  const productColumns: TableColumnType<Product>[] = [
    {
      header: "ID",
      accessor: "id",
      width: "80px",
      sortable: true,
    },
    {
      header: "Product",
      accessor: "name",
      width: "300px",
      sortable: true,
      filterable: true,
      cell: (row) => (
        <div>
          <div style={{ fontWeight: "600" }}>{row.name}</div>
          <div style={{ fontSize: "0.875rem", color: "#666" }}>
            {row.category}
          </div>
        </div>
      ),
    },
    {
      header: "Price",
      accessor: "price",
      width: "120px",
      sortable: true,
      cell: (row) => (
        <span style={{ fontWeight: "600", color: "#059669" }}>
          ${row.price.toFixed(2)}
        </span>
      ),
    },
    {
      header: "Stock",
      accessor: "stock",
      width: "100px",
      sortable: true,
      cell: (row) => (
        <span
          style={{
            color: row.stock > 0 ? "#059669" : "#DC2626",
            fontWeight: "600",
          }}
        >
          {row.stock}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      width: "140px",
      sortable: true,
      filterable: true,
      cell: (row) => (
        <span className={`ihub-status-badge ihub-status-${row.status}`}>
          {row.status.replace("_", " ").toUpperCase()}
        </span>
      ),
    },
    {
      header: "Rating",
      accessor: "rating",
      width: "100px",
      sortable: true,
      cell: (row) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "4px" }}>⭐</span>
          <span>{row.rating}</span>
        </div>
      ),
    },
    {
      header: "Tags",
      accessor: "tags",
      cell: (row) => (
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {row.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              style={{
                background: "#E5F3FF",
                color: "#0066CC",
                padding: "2px 8px",
                borderRadius: "12px",
                fontSize: "0.75rem",
              }}
            >
              {tag}
            </span>
          ))}
          {row.tags.length > 2 && (
            <span
              style={{
                background: "#F3F4F6",
                color: "#6B7280",
                padding: "2px 8px",
                borderRadius: "12px",
                fontSize: "0.75rem",
              }}
            >
              +{row.tags.length - 2}
            </span>
          )}
        </div>
      ),
    },
  ];

  // Expanded row content
  const renderUserExpandedRow = useCallback((user: User) => (
    <div className="ihub-expanded-content">
      <div className="ihub-row">
        <div className="ihub-col-md-6">
          <h4>Contact Information</h4>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Location:</strong> {user.location}</p>
        </div>
        <div className="ihub-col-md-6">
          <h4>Account Details</h4>
          <p><strong>Department:</strong> {user.department}</p>
          <p><strong>Last Login:</strong> {new Date(user.lastLogin).toLocaleDateString()}</p>
          <p><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="ihub-mt-3">
        <button className="ihub-primary-btn ihub-mr-2">Send Message</button>
        <button className="ihub-outlined-btn">View Profile</button>
      </div>
    </div>
  ), []);

  const renderProductExpandedRow = useCallback((product: Product) => (
    <div className="ihub-expanded-content">
      <div className="ihub-row">
        <div className="ihub-col-md-8">
          <h4>Product Details</h4>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Stock Level:</strong> {product.stock} units</p>
          <p><strong>Rating:</strong> {product.rating}/5.0</p>
          <div>
            <strong>Tags:</strong>
            <div style={{ display: "flex", gap: "4px", marginTop: "8px", flexWrap: "wrap" }}>
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    background: "#E5F3FF",
                    color: "#0066CC",
                    padding: "4px 12px",
                    borderRadius: "16px",
                    fontSize: "0.875rem",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="ihub-col-md-4">
          <h4>Actions</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <button className="ihub-primary-btn">Edit Product</button>
            <button className="ihub-outlined-btn">View Analytics</button>
            <button className="ihub-danger-btn">Remove Product</button>
          </div>
        </div>
      </div>
    </div>
  ), []);

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>Table Component Examples</h1>
      <p>
        Comprehensive examples showing different table layouts, features, and use cases.
      </p>

      {/* Basic Table Example */}
      <section className="ihub-mb-5">
        <h2>1. Basic Table (Simple)</h2>
        <p>
          Simple table with basic filtering functionality. Perfect for simple
          data display with minimal features.
        </p>
        <Tables data={simpleData} />
      </section>

      {/* Enhanced Table with All Features */}
      <section className="ihub-mb-5">
        <h2>2. Enhanced User Management Table</h2>
        <p>
          Full-featured table with sorting, filtering, pagination, selection,
          expansion, search, and export capabilities. Ideal for admin dashboards
          and data management interfaces.
        </p>
        <IHubTable
          columns={userColumns}
          data={users}
          isLoading={isLoading}
          title="User Management System"
          showSearch={true}
          pagination={true}
          rowsPerPageOptions={[5, 10, 25, 50]}
          defaultRowsPerPage={5}
          sortable={true}
          defaultSortColumn="name"
          defaultSortDirection="asc"
          onSort={handleSort}
          onFilter={handleFilter}
          selectable={true}
          onSelectionChange={handleUserSelectionChange}
          expandable={true}
          renderExpandedRow={renderUserExpandedRow}
          keyExtractor={userKeyExtractor}
          onRowClick={handleUserRowClick}
          stickyHeader={true}
          maxHeight="600px"
          exportOptions={{
            csv: true,
            excel: true,
            fileName: "users-export",
          }}
          refreshable={true}
          onRefresh={handleRefresh}
          actions={
            <div className="ihub-table-actions">
              <button className="ihub-primary-btn">Add User</button>
              <button className="ihub-outlined-btn">Bulk Import</button>
              {selectedUsers.length > 0 && (
                <button className="ihub-danger-btn">
                  Delete Selected ({selectedUsers.length})
                </button>
              )}
            </div>
          }
          emptyStateMessage="No users found. Create your first user to get started."
          emptyStateIcon={<PersonOutlinedIcon />}
        />
      </section>

      {/* Product Catalog Table */}
      <section className="ihub-mb-5">
        <h2>3. Product Catalog Table</h2>
        <p>
          E-commerce product table with custom cell rendering, status badges,
          pricing display, and inventory management features.
        </p>
        <IHubTable
          columns={productColumns}
          data={products}
          title="Product Catalog"
          showSearch={true}
          pagination={true}
          rowsPerPageOptions={[10, 25, 50]}
          defaultRowsPerPage={10}
          sortable={true}
          selectable={true}
          onSelectionChange={handleProductSelectionChange}
          expandable={true}
          renderExpandedRow={renderProductExpandedRow}
          keyExtractor={productKeyExtractor}
          onRowClick={handleProductRowClick}
          exportOptions={{
            csv: true,
            fileName: "products-export",
          }}
          actions={
            <div className="ihub-table-actions">
              <button className="ihub-primary-btn">Add Product</button>
              <button className="ihub-outlined-btn">Import CSV</button>
              {selectedProducts.length > 0 && (
                <button className="ihub-danger-btn">
                  Bulk Delete ({selectedProducts.length})
                </button>
              )}
            </div>
          }
          emptyStateMessage="No products available. Add your first product to get started."
        />
      </section>

      {/* Compact Mobile-Friendly Table */}
      <section className="ihub-mb-5">
        <h2>4. Mobile-Friendly Compact Table</h2>
        <p>
          Compact table optimized for mobile devices with hidden headers and
          responsive design.
        </p>
        <IHubTable
          columns={userColumns.slice(0, 4)} // Show fewer columns for mobile
          data={users.slice(0, 3)} // Show fewer rows for demo
          title="Mobile Users View"
          hideHeaderOnMobile={true}
          showSearch={true}
          pagination={false}
          keyExtractor={userKeyExtractor}
          onRowClick={handleUserRowClick}
        />
      </section>

      {/* Server-Side Table Example */}
      <section className="ihub-mb-5">
        <h2>5. Server-Side Table</h2>
        <p>
          Server-side table for handling large datasets with server-side
          pagination, sorting, and filtering. Perfect for enterprise applications
          with thousands of records.
        </p>
        <div className="ihub-info-box">
          <p>
            <strong>Note:</strong> This example shows the server-side table
            component configuration. In real applications, this would connect to
            your backend API endpoints.
          </p>
        </div>
        <IHubTableServer
          columns={userColumns}
          endpointPath="/api/users"
          title="Server-Side Users Table"
          showSearch={true}
          enableSorting={true}
          enableExport={true}
          expandable={true}
          renderExpandedRow={renderUserExpandedRow}
          keyExtractor={userKeyExtractor}
          onRowClick={handleUserRowClick}
          rowsPerPageOptions={[10, 25, 50, 100]}
          defaultRowsPerPage={25}
          initialParams={{
            sort: "name",
            direction: "asc",
            search: "",
          }}
          searchPlaceholder="Search users..."
          searchDebounceMs={300}
          emptyStateMessage="No users found on server."
        />
      </section>

      {/* Data Analytics Table */}
      <section className="ihub-mb-5">
        <h2>6. Data Analytics Table</h2>
        <p>
          Analytics-focused table with custom formatting, charts integration,
          and summary statistics.
        </p>
        <IHubTable
          columns={[
            {
              header: "Metric",
              accessor: "name",
              sortable: true,
            },
            {
              header: "Value",
              accessor: "email",
              cell: (row) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      width: "60px",
                      height: "20px",
                      background: "#E5F3FF",
                      borderRadius: "10px",
                      marginRight: "12px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        height: "100%",
                        background: "#0066CC",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <span>{row.department}</span>
                </div>
              ),
            },
            {
              header: "Change",
              accessor: "status",
              cell: (row) => (
                <span
                  style={{
                    color: row.status === "active" ? "#059669" : "#DC2626",
                    fontWeight: "600",
                  }}
                >
                  {row.status === "active" ? "+12.5%" : "-5.2%"}
                </span>
              ),
            },
          ]}
          data={users.slice(0, 4)}
          title="Performance Analytics"
          pagination={false}
          keyExtractor={userKeyExtractor}
        />
      </section>

      {/* Usage Summary */}
      <section className="ihub-mb-5">
        <h2>7. Usage Guidelines</h2>
        <div className="ihub-grid ihub-grid-cols-1 ihub-grid-cols-md-2 ihub-gap-4">
          <div className="ihub-card">
            <h3>When to Use Basic Tables</h3>
            <ul>
              <li>Simple data display</li>
              <li>Limited filtering needs</li>
              <li>Small datasets (&lt;100 rows)</li>
              <li>Quick prototyping</li>
            </ul>
          </div>
          <div className="ihub-card">
            <h3>When to Use Enhanced Tables</h3>
            <ul>
              <li>Complex data management</li>
              <li>User interaction required</li>
              <li>Multiple features needed</li>
              <li>Admin dashboards</li>
            </ul>
          </div>
          <div className="ihub-card">
            <h3>When to Use Server Tables</h3>
            <ul>
              <li>Large datasets (&gt;1000 rows)</li>
              <li>Performance optimization</li>
              <li>Real-time data updates</li>
              <li>Enterprise applications</li>
            </ul>
          </div>
          <div className="ihub-card">
            <h3>Mobile Considerations</h3>
            <ul>
              <li>Use hideHeaderOnMobile</li>
              <li>Limit column count</li>
              <li>Prioritize essential data</li>
              <li>Consider card layouts</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TableExamples;
```

## 🔗 Related Components

- [ActionDropdown](./ActionDropdown.md) - Dropdown component for table row actions
- [IHubTable](./IHubTable.md) - Enhanced table with advanced features
- [IHubTableServer](./IHubTableServer.md) - Server-side table for large datasets
- [Pagination](./Pagination.md) - Pagination component for table navigation
- [InputText](./InputText.md) - Input component for table filters and search

