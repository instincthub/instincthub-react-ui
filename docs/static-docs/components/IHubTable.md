# IHubTable

**Category:** UI | **Type:** component

Advanced data table component with sorting, filtering, pagination, and more

## 🏷️ Tags

`ui`, `table`, `data`, `sorting`, `filtering`, `pagination`

```tsx
"use client";

import React, { useState, useCallback } from "react";
import { IHubTable } from "@instincthub/react-ui";
import { TableColumnType } from "@instincthub/react-ui/types";
import Link from "next/link";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import BusinessIcon from "@mui/icons-material/Business";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

/**
 * Comprehensive IHubTable examples showcasing various use cases and features
 */
const TableExamples = () => {
  // Basic table state
  const [isBasicLoading, setIsBasicLoading] = useState(false);
  
  // User management table state
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  
  // Product table state
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  
  // Analytics table state
  const [isAnalyticsLoading, setIsAnalyticsLoading] = useState(false);
  
  // Company table state
  const [isCompanyLoading, setIsCompanyLoading] = useState(false);

  // Interface definitions
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
    name: string;
    category: string;
    price: number;
    stock: number;
    status: "in_stock" | "low_stock" | "out_of_stock";
    sku: string;
    supplier: string;
    lastUpdated: string;
    rating: number;
    sales: number;
  }

  interface AnalyticsData {
    id: number;
    metric: string;
    value: number;
    change: number;
    period: string;
    category: string;
    trend: "up" | "down" | "stable";
    description: string;
  }

  interface Company {
    id: number;
    name: string;
    industry: string;
    employees: number;
    revenue: number;
    founded: string;
    location: string;
    website: string;
    status: "active" | "inactive" | "prospect";
    tier: "enterprise" | "business" | "startup";
  }

  // Sample data
  const basicData = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Viewer" },
  ];

  const userData: User[] = [
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
      avatar: "https://i.pravatar.cc/150?img=1"
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
      avatar: "https://i.pravatar.cc/150?img=2"
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
      avatar: "https://i.pravatar.cc/150?img=3"
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
      avatar: "https://i.pravatar.cc/150?img=4"
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
      avatar: "https://i.pravatar.cc/150?img=5"
    },
  ];

  const productData: Product[] = [
    {
      id: 1,
      name: "MacBook Pro 16\"",
      category: "Laptops",
      price: 2499,
      stock: 25,
      status: "in_stock",
      sku: "MBP16-001",
      supplier: "Apple Inc.",
      lastUpdated: "2023-04-15",
      rating: 4.8,
      sales: 150
    },
    {
      id: 2,
      name: "iPhone 14 Pro",
      category: "Smartphones",
      price: 999,
      stock: 5,
      status: "low_stock",
      sku: "IP14P-001",
      supplier: "Apple Inc.",
      lastUpdated: "2023-04-14",
      rating: 4.9,
      sales: 320
    },
    {
      id: 3,
      name: "Samsung Galaxy S23",
      category: "Smartphones",
      price: 799,
      stock: 0,
      status: "out_of_stock",
      sku: "SGS23-001",
      supplier: "Samsung",
      lastUpdated: "2023-04-10",
      rating: 4.6,
      sales: 280
    },
    {
      id: 4,
      name: "Dell XPS 13",
      category: "Laptops",
      price: 1299,
      stock: 40,
      status: "in_stock",
      sku: "DXP13-001",
      supplier: "Dell Technologies",
      lastUpdated: "2023-04-16",
      rating: 4.5,
      sales: 95
    },
    {
      id: 5,
      name: "AirPods Pro",
      category: "Audio",
      price: 249,
      stock: 2,
      status: "low_stock",
      sku: "APP-001",
      supplier: "Apple Inc.",
      lastUpdated: "2023-04-13",
      rating: 4.7,
      sales: 450
    }
  ];

  const analyticsData: AnalyticsData[] = [
    {
      id: 1,
      metric: "Total Revenue",
      value: 125000,
      change: 15.5,
      period: "This Month",
      category: "Financial",
      trend: "up",
      description: "Monthly revenue from all sources"
    },
    {
      id: 2,
      metric: "Active Users",
      value: 8450,
      change: -2.3,
      period: "This Week",
      category: "User Engagement",
      trend: "down",
      description: "Weekly active user count"
    },
    {
      id: 3,
      metric: "Conversion Rate",
      value: 3.8,
      change: 0.2,
      period: "This Month",
      category: "Marketing",
      trend: "stable",
      description: "Lead to customer conversion percentage"
    },
    {
      id: 4,
      metric: "Average Order Value",
      value: 89.50,
      change: 8.7,
      period: "This Quarter",
      category: "Sales",
      trend: "up",
      description: "Average value per customer order"
    },
    {
      id: 5,
      metric: "Customer Satisfaction",
      value: 4.6,
      change: 0.1,
      period: "This Month",
      category: "Support",
      trend: "stable",
      description: "Average customer rating out of 5"
    }
  ];

  const companyData: Company[] = [
    {
      id: 1,
      name: "TechCorp Solutions",
      industry: "Technology",
      employees: 1250,
      revenue: 45000000,
      founded: "2015",
      location: "San Francisco, CA",
      website: "https://techcorp.com",
      status: "active",
      tier: "enterprise"
    },
    {
      id: 2,
      name: "GreenEnergy Inc.",
      industry: "Renewable Energy",
      employees: 450,
      revenue: 12000000,
      founded: "2018",
      location: "Austin, TX",
      website: "https://greenenergy.com",
      status: "active",
      tier: "business"
    },
    {
      id: 3,
      name: "StartupX",
      industry: "AI/ML",
      employees: 25,
      revenue: 800000,
      founded: "2022",
      location: "Boston, MA",
      website: "https://startupx.io",
      status: "prospect",
      tier: "startup"
    },
    {
      id: 4,
      name: "Global Manufacturing",
      industry: "Manufacturing",
      employees: 3500,
      revenue: 120000000,
      founded: "1985",
      location: "Detroit, MI",
      website: "https://globalmfg.com",
      status: "active",
      tier: "enterprise"
    },
    {
      id: 5,
      name: "FinanceFirst",
      industry: "Financial Services",
      employees: 890,
      revenue: 28000000,
      founded: "2010",
      location: "New York, NY",
      website: "https://financefirst.com",
      status: "inactive",
      tier: "business"
    }
  ];

  // Key extractors
  const basicKeyExtractor = useCallback((row: any) => row.id, []);
  const userKeyExtractor = useCallback((row: User) => row.id, []);
  const productKeyExtractor = useCallback((row: Product) => row.id, []);
  const analyticsKeyExtractor = useCallback((row: AnalyticsData) => row.id, []);
  const companyKeyExtractor = useCallback((row: Company) => row.id, []);

  // Basic table columns
  const basicColumns: TableColumnType<any>[] = [
    {
      header: "ID",
      accessor: "id",
      width: "80px",
      sortable: true,
    },
    {
      header: "Name",
      accessor: "name",
      sortable: true,
      filterable: true,
    },
    {
      header: "Email",
      accessor: "email",
      sortable: true,
      filterable: true,
    },
    {
      header: "Role",
      accessor: "role",
      sortable: true,
      filterable: true,
    },
  ];

  // User management columns
  const userColumns: TableColumnType<User>[] = [
    {
      header: "User",
      accessor: "name",
      width: "300px",
      sortable: true,
      filterable: true,
      cell: (row) => (
        <div className="ihub-cell-with-avatar">
          <img 
            src={row.avatar} 
            alt={row.name}
            className="ihub-avatar-sm"
            style={{ width: "32px", height: "32px", borderRadius: "50%", marginRight: "12px" }}
          />
          <div>
            <div className="ihub-font-medium">{row.name}</div>
            <div className="ihub-text-muted ihub-fs-sm">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Role",
      accessor: "role",
      sortable: true,
      filterable: true,
      cell: (row) => (
        <span className={`ihub-badge ihub-badge-${row.role.toLowerCase()}`}>
          {row.role}
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
      header: "Status",
      accessor: "status",
      sortable: true,
      filterable: true,
      cell: (row) => (
        <span className={`ihub-status-badge ihub-status-${row.status}`}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      ),
    },
    {
      header: "Location",
      accessor: "location",
      sortable: true,
      filterable: true,
    },
    {
      header: "Last Login",
      accessor: "lastLogin",
      width: "150px",
      sortable: true,
    },
    {
      header: "Actions",
      accessor: (row) => (
        <div className="ihub-item-actions">
          <p onClick={(e) => { e.stopPropagation(); handleUserAction('view', row); }}>View</p>
          <div className="ihub-action-divider"></div>
          <p onClick={(e) => { e.stopPropagation(); handleUserAction('edit', row); }}>Edit</p>
          <div className="ihub-action-divider"></div>
          <p onClick={(e) => { e.stopPropagation(); handleUserAction('delete', row); }}>Delete</p>
        </div>
      ),
    },
  ];

  // Product management columns
  const productColumns: TableColumnType<Product>[] = [
    {
      header: "Product",
      accessor: "name",
      width: "250px",
      sortable: true,
      filterable: true,
      cell: (row) => (
        <div>
          <div className="ihub-font-medium">{row.name}</div>
          <div className="ihub-text-muted ihub-fs-sm">SKU: {row.sku}</div>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: "category",
      sortable: true,
      filterable: true,
    },
    {
      header: "Price",
      accessor: "price",
      sortable: true,
      cell: (row) => (
        <span className="ihub-price">${row.price.toLocaleString()}</span>
      ),
    },
    {
      header: "Stock",
      accessor: "stock",
      sortable: true,
      cell: (row) => (
        <span className={`ihub-stock-${row.status}`}>
          {row.stock} units
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      sortable: true,
      filterable: true,
      cell: (row) => (
        <span className={`ihub-status-badge ihub-status-${row.status.replace('_', '-')}`}>
          {row.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </span>
      ),
    },
    {
      header: "Rating",
      accessor: "rating",
      sortable: true,
      cell: (row) => (
        <div className="ihub-rating">
          ⭐ {row.rating}/5 ({row.sales} sales)
        </div>
      ),
    },
    {
      header: "Supplier",
      accessor: "supplier",
      sortable: true,
      filterable: true,
    },
    {
      header: "Actions",
      accessor: (row) => (
        <div className="ihub-item-actions">
          <p onClick={(e) => { e.stopPropagation(); handleProductAction('edit', row); }}>Edit</p>
          <div className="ihub-action-divider"></div>
          <p onClick={(e) => { e.stopPropagation(); handleProductAction('restock', row); }}>Restock</p>
          <div className="ihub-action-divider"></div>
          <p onClick={(e) => { e.stopPropagation(); handleProductAction('delete', row); }}>Delete</p>
        </div>
      ),
    },
  ];

  // Analytics columns
  const analyticsColumns: TableColumnType<AnalyticsData>[] = [
    {
      header: "Metric",
      accessor: "metric",
      width: "200px",
      sortable: true,
      filterable: true,
      cell: (row) => (
        <div>
          <div className="ihub-font-medium">{row.metric}</div>
          <div className="ihub-text-muted ihub-fs-sm">{row.description}</div>
        </div>
      ),
    },
    {
      header: "Value",
      accessor: "value",
      sortable: true,
      cell: (row) => (
        <div className="ihub-metric-value">
          {row.category === "Financial" ? `$${row.value.toLocaleString()}` : row.value.toLocaleString()}
        </div>
      ),
    },
    {
      header: "Change",
      accessor: "change",
      sortable: true,
      cell: (row) => (
        <div className={`ihub-change ihub-change-${row.trend}`}>
          {row.trend === "up" ? "↗" : row.trend === "down" ? "↘" : "→"} 
          {Math.abs(row.change)}%
        </div>
      ),
    },
    {
      header: "Period",
      accessor: "period",
      sortable: true,
      filterable: true,
    },
    {
      header: "Category",
      accessor: "category",
      sortable: true,
      filterable: true,
      cell: (row) => (
        <span className={`ihub-category-badge ihub-category-${row.category.toLowerCase().replace(' ', '-')}`}>
          {row.category}
        </span>
      ),
    },
    {
      header: "Trend",
      accessor: "trend",
      sortable: true,
      filterable: true,
      cell: (row) => (
        <span className={`ihub-trend-indicator ihub-trend-${row.trend}`}>
          {row.trend === "up" ? "📈" : row.trend === "down" ? "📉" : "📊"}
        </span>
      ),
    },
  ];

  // Company columns
  const companyColumns: TableColumnType<Company>[] = [
    {
      header: "Company",
      accessor: "name",
      width: "250px",
      sortable: true,
      filterable: true,
      cell: (row) => (
        <div>
          <div className="ihub-font-medium">{row.name}</div>
          <div className="ihub-text-muted ihub-fs-sm">{row.industry}</div>
        </div>
      ),
    },
    {
      header: "Employees",
      accessor: "employees",
      sortable: true,
      cell: (row) => row.employees.toLocaleString(),
    },
    {
      header: "Revenue",
      accessor: "revenue",
      sortable: true,
      cell: (row) => `$${(row.revenue / 1000000).toFixed(1)}M`,
    },
    {
      header: "Founded",
      accessor: "founded",
      sortable: true,
    },
    {
      header: "Location",
      accessor: "location",
      sortable: true,
      filterable: true,
    },
    {
      header: "Tier",
      accessor: "tier",
      sortable: true,
      filterable: true,
      cell: (row) => (
        <span className={`ihub-tier-badge ihub-tier-${row.tier}`}>
          {row.tier.charAt(0).toUpperCase() + row.tier.slice(1)}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      sortable: true,
      filterable: true,
      cell: (row) => (
        <span className={`ihub-status-badge ihub-status-${row.status}`}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: (row) => (
        <div className="ihub-item-actions">
          <p onClick={(e) => { e.stopPropagation(); handleCompanyAction('view', row); }}>View</p>
          <div className="ihub-action-divider"></div>
          <p onClick={(e) => { e.stopPropagation(); handleCompanyAction('edit', row); }}>Edit</p>
          <div className="ihub-action-divider"></div>
          <p onClick={(e) => { e.stopPropagation(); handleCompanyAction('contact', row); }}>Contact</p>
        </div>
      ),
    },
  ];

  // Event handlers
  const handleUserAction = (action: string, user: User) => {
    console.log(`${action} user:`, user);
  };

  const handleProductAction = (action: string, product: Product) => {
    console.log(`${action} product:`, product);
  };

  const handleCompanyAction = (action: string, company: Company) => {
    console.log(`${action} company:`, company);
  };

  const handleUserRefresh = async () => {
    setIsUserLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsUserLoading(false);
  };

  const handleProductRefresh = async () => {
    setIsProductLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsProductLoading(false);
  };

  const handleAnalyticsRefresh = async () => {
    setIsAnalyticsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsAnalyticsLoading(false);
  };

  const handleCompanyRefresh = async () => {
    setIsCompanyLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsCompanyLoading(false);
  };

  // Expanded row renderers
  const renderUserExpandedRow = (user: User) => (
    <div className="ihub-expanded-row">
      <div className="ihub-row-detail-title">User Details</div>
      <div className="ihub-row-detail-content">
        <div className="ihub-detail-grid">
          <div className="ihub-detail-item">
            <div className="ihub-detail-label">Phone</div>
            <div className="ihub-detail-value">{user.phone}</div>
          </div>
          <div className="ihub-detail-item">
            <div className="ihub-detail-label">Created</div>
            <div className="ihub-detail-value">{user.createdAt}</div>
          </div>
          <div className="ihub-detail-item">
            <div className="ihub-detail-label">Last Login</div>
            <div className="ihub-detail-value">{user.lastLogin}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProductExpandedRow = (product: Product) => (
    <div className="ihub-expanded-row">
      <div className="ihub-row-detail-title">Product Details</div>
      <div className="ihub-row-detail-content">
        <div className="ihub-detail-grid">
          <div className="ihub-detail-item">
            <div className="ihub-detail-label">Last Updated</div>
            <div className="ihub-detail-value">{product.lastUpdated}</div>
          </div>
          <div className="ihub-detail-item">
            <div className="ihub-detail-label">Total Sales</div>
            <div className="ihub-detail-value">{product.sales} units</div>
          </div>
          <div className="ihub-detail-item">
            <div className="ihub-detail-label">Supplier</div>
            <div className="ihub-detail-value">{product.supplier}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompanyExpandedRow = (company: Company) => (
    <div className="ihub-expanded-row">
      <div className="ihub-row-detail-title">Company Details</div>
      <div className="ihub-row-detail-content">
        <div className="ihub-detail-grid">
          <div className="ihub-detail-item">
            <div className="ihub-detail-label">Website</div>
            <div className="ihub-detail-value">
              <a href={company.website} target="_blank" rel="noopener noreferrer">
                {company.website}
              </a>
            </div>
          </div>
          <div className="ihub-detail-item">
            <div className="ihub-detail-label">Industry</div>
            <div className="ihub-detail-value">{company.industry}</div>
          </div>
          <div className="ihub-detail-item">
            <div className="ihub-detail-label">Revenue per Employee</div>
            <div className="ihub-detail-value">
              ${Math.round(company.revenue / company.employees).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>IHubTable Examples</h1>
      <p className="ihub-mb-5">Comprehensive examples showing various table configurations and use cases.</p>

      {/* Basic Table Example */}
      <div className="ihub-mb-8">
        <h2 className="ihub-mb-3">🔸 Basic Table</h2>
        <p className="ihub-mb-4">Simple table with minimal configuration - perfect for displaying basic data lists.</p>
        
        <IHubTable
          columns={basicColumns}
          data={basicData}
          isLoading={isBasicLoading}
          title="Basic Users"
          keyExtractor={basicKeyExtractor}
          pagination={true}
          defaultRowsPerPage={10}
          showRowNumbers={true}
        />
      </div>

      {/* User Management Table */}
      <div className="ihub-mb-8">
        <h2 className="ihub-mb-3">👥 User Management Table</h2>
        <p className="ihub-mb-4">Advanced user management with avatars, status badges, selection, and expandable rows.</p>
        
        <IHubTable
          columns={userColumns}
          data={userData}
          isLoading={isUserLoading}
          title="User Management"
          showSearch={true}
          pagination={true}
          rowsPerPageOptions={[5, 10, 25]}
          defaultRowsPerPage={5}
          keyExtractor={userKeyExtractor}
          selectable={true}
          onSelectionChange={setSelectedUsers}
          expandable={true}
          renderExpandedRow={renderUserExpandedRow}
          stickyHeader={true}
          maxHeight="500px"
          showRowNumbers={true}
          rowNumberStartFrom={1}
          actions={
            <button className="ihub-important-btn">
              <PersonOutlinedIcon style={{ color: "#fff" }} className="ihub-mr-1" />
              Add User
            </button>
          }
          exportOptions={{
            csv: true,
            excel: true,
            fileName: "users-export",
          }}
          refreshable={true}
          onRefresh={handleUserRefresh}
          emptyStateMessage="No users found. Add your first user to get started."
        />
      </div>

      {/* Product Inventory Table */}
      <div className="ihub-mb-8">
        <h2 className="ihub-mb-3">🛍️ Product Inventory Table</h2>
        <p className="ihub-mb-4">E-commerce product management with stock levels, pricing, and supplier information.</p>
        
        <IHubTable
          columns={productColumns}
          data={productData}
          isLoading={isProductLoading}
          title="Product Inventory"
          showSearch={true}
          pagination={true}
          rowsPerPageOptions={[10, 25, 50]}
          defaultRowsPerPage={10}
          keyExtractor={productKeyExtractor}
          selectable={true}
          onSelectionChange={setSelectedProducts}
          expandable={true}
          renderExpandedRow={renderProductExpandedRow}
          actions={
            <div className="ihub-actions-group">
              <button className="ihub-important-btn">
                <ShoppingCartIcon style={{ color: "#fff" }} className="ihub-mr-1" />
                Add Product
              </button>
              <button className="ihub-outlined-btn">
                Import CSV
              </button>
            </div>
          }
          exportOptions={{
            csv: true,
            excel: true,
            pdf: true,
            fileName: "inventory-report",
          }}
          refreshable={true}
          onRefresh={handleProductRefresh}
          emptyStateMessage="No products in inventory. Start by adding your first product."
        />
      </div>

      {/* Analytics Dashboard Table */}
      <div className="ihub-mb-8">
        <h2 className="ihub-mb-3">📊 Analytics Dashboard Table</h2>
        <p className="ihub-mb-4">Data analytics table with metrics, trends, and performance indicators.</p>
        
        <IHubTable
          columns={analyticsColumns}
          data={analyticsData}
          isLoading={isAnalyticsLoading}
          title="Key Performance Metrics"
          showSearch={true}
          pagination={false}
          keyExtractor={analyticsKeyExtractor}
          stickyHeader={true}
          maxHeight="400px"
          actions={
            <div className="ihub-actions-group">
              <button className="ihub-primary-btn">
                <AnalyticsIcon style={{ color: "#fff" }} className="ihub-mr-1" />
                Generate Report
              </button>
              <button className="ihub-outlined-btn">
                Export Data
              </button>
            </div>
          }
          exportOptions={{
            csv: true,
            excel: true,
            fileName: "analytics-metrics",
          }}
          refreshable={true}
          onRefresh={handleAnalyticsRefresh}
          emptyStateMessage="No analytics data available. Configure your tracking to see metrics."
        />
      </div>

      {/* Company Directory Table */}
      <div className="ihub-mb-8">
        <h2 className="ihub-mb-3">🏢 Company Directory Table</h2>
        <p className="ihub-mb-4">Business directory with company profiles, tiers, and contact management.</p>
        
        <IHubTable
          columns={companyColumns}
          data={companyData}
          isLoading={isCompanyLoading}
          title="Company Directory"
          showSearch={true}
          pagination={true}
          rowsPerPageOptions={[5, 10, 20]}
          defaultRowsPerPage={5}
          keyExtractor={companyKeyExtractor}
          expandable={true}
          renderExpandedRow={renderCompanyExpandedRow}
          hideHeaderOnMobile={true}
          actions={
            <div className="ihub-actions-group">
              <button className="ihub-important-btn">
                <BusinessIcon style={{ color: "#fff" }} className="ihub-mr-1" />
                Add Company
              </button>
              <button className="ihub-outlined-btn">
                Import Contacts
              </button>
            </div>
          }
          exportOptions={{
            csv: true,
            excel: true,
            fileName: "company-directory",
          }}
          refreshable={true}
          onRefresh={handleCompanyRefresh}
          emptyStateMessage="No companies in directory. Add your first business contact."
        />
      </div>

      {/* Row Numbering Example */}
      <div className="ihub-mb-8">
        <h2 className="ihub-mb-3">🔢 Table with Row Numbering</h2>
        <p className="ihub-mb-4">Demonstrates row numbering feature that works perfectly with pagination and sorting.</p>
        
        <IHubTable
          columns={productColumns.slice(0, 4)} // Show fewer columns for clarity
          data={productData}
          title="Numbered Product List"
          showSearch={true}
          pagination={true}
          rowsPerPageOptions={[3, 5, 10]}
          defaultRowsPerPage={3}
          keyExtractor={productKeyExtractor}
          showRowNumbers={true}
          rowNumberStartFrom={100} // Custom starting number
          sortable={true}
          exportOptions={{
            csv: true,
            fileName: "numbered-products",
          }}
        />
        
        <div className="ihub-mt-3 ihub-p-3 ihub-bg-light ihub-rounded">
          <h5>Row Numbering Features:</h5>
          <ul className="ihub-mb-0">
            <li><strong>Pagination-aware:</strong> Numbers continue correctly across pages (e.g., 100-102, then 103-105)</li>
            <li><strong>Custom starting number:</strong> Use <code>rowNumberStartFrom</code> prop to set initial value</li>
            <li><strong>Export support:</strong> Row numbers are included in CSV/Excel exports</li>
            <li><strong>Sorting compatible:</strong> Row numbers remain consistent during sorting operations</li>
          </ul>
        </div>
      </div>

      {/* Financial Table Example */}
      <div className="ihub-mb-8">
        <h2 className="ihub-mb-3">💰 Financial Data Table</h2>
        <p className="ihub-mb-4">Specialized table for financial data with currency formatting and calculations.</p>
        
        <IHubTable
          columns={[
            {
              header: "Account",
              accessor: "account",
              sortable: true,
              filterable: true,
            },
            {
              header: "Balance",
              accessor: "balance",
              sortable: true,
              cell: (row: any) => (
                <span className={`ihub-balance ${row.balance >= 0 ? 'ihub-positive' : 'ihub-negative'}`}>
                  ${Math.abs(row.balance).toLocaleString()}
                </span>
              ),
            },
            {
              header: "Change",
              accessor: "change",
              sortable: true,
              cell: (row: any) => (
                <span className={`ihub-change ${row.change >= 0 ? 'ihub-positive' : 'ihub-negative'}`}>
                  {row.change >= 0 ? '+' : ''}${row.change.toLocaleString()}
                </span>
              ),
            },
            {
              header: "Type",
              accessor: "type",
              sortable: true,
              filterable: true,
            },
          ]}
          data={[
            { id: 1, account: "Operating Account", balance: 125000, change: 5000, type: "Checking" },
            { id: 2, account: "Savings Account", balance: 85000, change: 1200, type: "Savings" },
            { id: 3, account: "Investment Portfolio", balance: 245000, change: -2500, type: "Investment" },
            { id: 4, account: "Business Credit", balance: -15000, change: -800, type: "Credit" },
          ]}
          title="Financial Accounts"
          keyExtractor={basicKeyExtractor}
          pagination={false}
          showRowNumbers={true}
          actions={
            <button className="ihub-success-btn">
              <AttachMoneyIcon style={{ color: "#fff" }} className="ihub-mr-1" />
              Add Transaction
            </button>
          }
          exportOptions={{
            csv: true,
            excel: true,
            fileName: "financial-summary",
          }}
        />
      </div>

      {/* Props Documentation */}
      <div className="ihub-mb-8">
        <h2 className="ihub-mb-3">📋 Row Numbering Props</h2>
        <p className="ihub-mb-4">Complete guide to row numbering props and their usage.</p>
        
        <div className="ihub-code-block">
          <pre>
{`// Basic row numbering
<IHubTable
  showRowNumbers={true}        // Enable row numbering (default: false)
  rowNumberStartFrom={1}       // Starting number (default: 1)
  // ... other props
/>

// Advanced examples
<IHubTable
  showRowNumbers={true}
  rowNumberStartFrom={100}     // Start from 100: shows 100, 101, 102...
  pagination={true}
  defaultRowsPerPage={5}       // Page 1: 100-104, Page 2: 105-109, etc.
  // ... other props
/>

// Combined with other features
<IHubTable
  showRowNumbers={true}
  rowNumberStartFrom={1}
  selectable={true}            // Row numbers appear before checkboxes
  expandable={true}            // Row numbers appear before expand icons
  exportOptions={{ csv: true }} // Row numbers included in exports
  // ... other props
/>`}
          </pre>
        </div>
        
        <div className="ihub-mt-4">
          <h4>Props Reference</h4>
          <table className="ihub-table ihub-table-bordered">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>showRowNumbers</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Enables row numbering as the first column</td>
              </tr>
              <tr>
                <td><code>rowNumberStartFrom</code></td>
                <td><code>number</code></td>
                <td><code>1</code></td>
                <td>Starting number for row numbering sequence</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="ihub-mt-4">
          <h4>Key Features</h4>
          <ul>
            <li><strong>Pagination Integration:</strong> Row numbers automatically adjust across pages</li>
            <li><strong>Column Order:</strong> Row numbers always appear as the first column</li>
            <li><strong>Export Support:</strong> Included in CSV and Excel exports when enabled</li>
            <li><strong>Custom Starting Numbers:</strong> Use any starting value for specialized numbering</li>
            <li><strong>Responsive Design:</strong> Numbers are properly styled and centered</li>
            <li><strong>Sorting Compatibility:</strong> Row numbers remain consistent during data sorting</li>
          </ul>
        </div>

        <div className="ihub-mt-4">
          <h4>Column Order with Row Numbers</h4>
          <ol>
            <li><strong>Row Numbers</strong> (when enabled)</li>
            <li><strong>Selection Checkboxes</strong> (when <code>selectable=true</code>)</li>
            <li><strong>Expandable Icons</strong> (when <code>expandable=true</code>)</li>
            <li><strong>Data Columns</strong> (your defined columns)</li>
          </ol>
        </div>
      </div>

      <div className="ihub-mb-5">
        <Link
          rel="noreferrer noopener"
          target="_blank"
          href="https://github.com/instincthub/instincthub-react-ui/blob/main/src/__examples__/src/components/ui/TableExamples.tsx"
        >
          <button className="ihub-outlined-btn">View Complete Codebase</button>
        </Link>
      </div>
    </div>
  );
};

export default TableExamples;
```

## 🔗 Related Components

- [CustomTextEditor](./CustomTextEditor.md) - Custom text editor component
- [ContentViewer](./ContentViewer.md) - Content viewer component
- [ContentViewOrEdit](./ContentViewOrEdit.md) - Content view or edit component
- [CodeDisplay](./CodeDisplay.md) - Code display component
- [IHubTableServer](./IHubTableServer.md) - InstinctHub server table component
