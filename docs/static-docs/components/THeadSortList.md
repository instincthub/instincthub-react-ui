# THeadSortList

**Category:** Forms | **Type:** component

Advanced table header component with multi-column sorting, visual sort indicators, and column configuration management

**File Location:** `src/components/forms/THeadSortList.tsx`

## 🏷️ Tags

`forms`, `table`, `sorting`, `multi-sort`, `thead`, `columns`

```tsx
"use client";
import React, { useState } from "react";
import { THeadSortList } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive examples demonstrating THeadSortList usage
 * Shows multi-column sorting, column configuration, and advanced table headers
 */
const THeadSortListExamples = () => {
  const [employeeData, setEmployeeData] = useState([
    { id: 1, name: "John Doe", department: "Engineering", salary: 85000, joinDate: "2023-01-15", performance: 4.2, status: "Active" },
    { id: 2, name: "Jane Smith", department: "Marketing", salary: 92000, joinDate: "2023-03-22", performance: 4.8, status: "Active" },
    { id: 3, name: "Bob Johnson", department: "Sales", salary: 78000, joinDate: "2022-11-08", performance: 3.9, status: "Active" },
    { id: 4, name: "Alice Brown", department: "Engineering", salary: 95000, joinDate: "2023-02-10", performance: 4.5, status: "Active" },
    { id: 5, name: "Charlie Wilson", department: "HR", salary: 72000, joinDate: "2023-05-18", performance: 4.1, status: "Active" },
    { id: 6, name: "Diana Davis", department: "Finance", salary: 88000, joinDate: "2022-12-03", performance: 4.7, status: "Inactive" },
  ]);

  const [sortConfig, setSortConfig] = useState<Array<{
    field: string;
    direction: 'asc' | 'desc';
    priority: number;
  }>>([]);

  const [columnConfig, setColumnConfig] = useState([
    { field: "name", label: "Employee Name", sortable: true, visible: true, width: "200px", type: "text" },
    { field: "department", label: "Department", sortable: true, visible: true, width: "150px", type: "text" },
    { field: "salary", label: "Salary", sortable: true, visible: true, width: "120px", type: "currency" },
    { field: "joinDate", label: "Join Date", sortable: true, visible: true, width: "120px", type: "date" },
    { field: "performance", label: "Performance", sortable: true, visible: true, width: "120px", type: "rating" },
    { field: "status", label: "Status", sortable: true, visible: true, width: "100px", type: "status" },
  ]);

  const [productData, setProductData] = useState([
    { id: 1, name: "React UI Kit", category: "Software", price: 99.99, stock: 150, sales: 1250, rating: 4.8, featured: true },
    { id: 2, name: "TypeScript Course", category: "Education", price: 49.99, stock: 0, sales: 890, rating: 4.9, featured: false },
    { id: 3, name: "Design System", category: "Design", price: 199.99, stock: 75, sales: 567, rating: 4.7, featured: true },
    { id: 4, name: "API Documentation", category: "Documentation", price: 29.99, stock: 200, sales: 1100, rating: 4.6, featured: false },
  ]);

  const [productSortConfig, setProductSortConfig] = useState<Array<{
    field: string;
    direction: 'asc' | 'desc';
    priority: number;
  }>>([]);

  // Advanced sorting function that handles multiple sort criteria
  const applySorting = (data: any[], sortCriteria: Array<{ field: string; direction: 'asc' | 'desc'; priority: number }>) => {
    if (sortCriteria.length === 0) return data;

    return [...data].sort((a, b) => {
      // Sort by priority (lower number = higher priority)
      const sortedCriteria = sortCriteria.sort((x, y) => x.priority - y.priority);
      
      for (const criteria of sortedCriteria) {
        const { field, direction } = criteria;
        let aValue = a[field];
        let bValue = b[field];

        // Handle different data types
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (typeof aValue === 'number') {
          const result = direction === 'asc' ? aValue - bValue : bValue - aValue;
          if (result !== 0) return result;
        } else if (typeof aValue === 'string') {
          const result = direction === 'asc' 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue);
          if (result !== 0) return result;
        }
      }
      
      return 0;
    });
  };

  const handleSort = (field: string) => {
    setSortConfig(prevConfig => {
      const existingIndex = prevConfig.findIndex(config => config.field === field);
      
      if (existingIndex >= 0) {
        // Field already in sort config, cycle through states
        const existingConfig = prevConfig[existingIndex];
        if (existingConfig.direction === 'asc') {
          // Change to descending
          const newConfig = [...prevConfig];
          newConfig[existingIndex] = { ...existingConfig, direction: 'desc' };
          return newConfig;
        } else {
          // Remove from sort config
          return prevConfig.filter(config => config.field !== field);
        }
      } else {
        // Add new sort criteria with next priority
        const nextPriority = prevConfig.length > 0 ? Math.max(...prevConfig.map(c => c.priority)) + 1 : 1;
        return [...prevConfig, { field, direction: 'asc', priority: nextPriority }];
      }
    });
    
    openToast(`Sort ${field} updated`);
  };

  const handleProductSort = (field: string) => {
    setProductSortConfig(prevConfig => {
      const existingIndex = prevConfig.findIndex(config => config.field === field);
      
      if (existingIndex >= 0) {
        const existingConfig = prevConfig[existingIndex];
        if (existingConfig.direction === 'asc') {
          const newConfig = [...prevConfig];
          newConfig[existingIndex] = { ...existingConfig, direction: 'desc' };
          return newConfig;
        } else {
          return prevConfig.filter(config => config.field !== field);
        }
      } else {
        const nextPriority = prevConfig.length > 0 ? Math.max(...prevConfig.map(c => c.priority)) + 1 : 1;
        return [...prevConfig, { field, direction: 'asc', priority: nextPriority }];
      }
    });
  };

  const clearAllSorting = () => {
    setSortConfig([]);
    openToast("All sorting cleared");
  };

  const toggleColumnVisibility = (field: string) => {
    setColumnConfig(prevConfig => 
      prevConfig.map(col => 
        col.field === field ? { ...col, visible: !col.visible } : col
      )
    );
    openToast(`Column ${field} visibility toggled`);
  };

  const sortedEmployeeData = applySorting(employeeData, sortConfig);
  const sortedProductData = applySorting(productData, productSortConfig);

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>THeadSortList Examples</h1>
      <p className="ihub-mb-4">
        Advanced table header component with multi-column sorting, 
        visual indicators, and column configuration management.
      </p>

      {/* Basic Multi-Sort Table */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Multi-Column Sorting</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Employee Directory</h3>
            <p className="ihub-text-muted">Click multiple columns to create sort hierarchy</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-sort-controls ihub-mb-3">
              <div className="ihub-sort-info">
                {sortConfig.length > 0 ? (
                  <div className="ihub-active-sorts">
                    <span className="ihub-sort-label">Active sorts:</span>
                    {sortConfig
                      .sort((a, b) => a.priority - b.priority)
                      .map((sort, index) => (
                        <span key={sort.field} className="ihub-sort-indicator">
                          {index + 1}. {sort.field} ({sort.direction})
                        </span>
                      ))}
                    <button 
                      className="ihub-clear-sorts-btn ihub-ms-2"
                      onClick={clearAllSorting}
                    >
                      Clear All
                    </button>
                  </div>
                ) : (
                  <span className="ihub-no-sorts">No active sorting</span>
                )}
              </div>
            </div>
            
            <div className="ihub-table-responsive">
              <table className="ihub-table ihub-multi-sort-table">
                <THeadSortList
                  columns={columnConfig.filter(col => col.visible)}
                  sortConfig={sortConfig}
                  onSort={handleSort}
                  multiSort={true}
                  showSortPriority={true}
                  className="ihub-employee-header"
                />
                <tbody>
                  {sortedEmployeeData.map((employee) => (
                    <tr key={employee.id}>
                      {columnConfig.filter(col => col.visible).map((col) => (
                        <td key={col.field}>
                          {col.type === 'currency' ? (
                            `$${employee[col.field].toLocaleString()}`
                          ) : col.type === 'date' ? (
                            new Date(employee[col.field]).toLocaleDateString()
                          ) : col.type === 'rating' ? (
                            <div className="ihub-rating-display">
                              <span className="ihub-rating-value">{employee[col.field]}</span>
                              <span className="ihub-rating-stars">
                                {'★'.repeat(Math.floor(employee[col.field]))}
                              </span>
                            </div>
                          ) : col.type === 'status' ? (
                            <span className={`ihub-status-badge ${employee[col.field].toLowerCase()}`}>
                              {employee[col.field]}
                            </span>
                          ) : (
                            employee[col.field]
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Column Configuration */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Column Configuration</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Configurable Columns</h3>
            <p className="ihub-text-muted">Show/hide columns and manage table layout</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-column-controls ihub-mb-4">
              <h4>Visible Columns:</h4>
              <div className="ihub-column-toggles">
                {columnConfig.map((col) => (
                  <label key={col.field} className="ihub-column-toggle">
                    <input
                      type="checkbox"
                      checked={col.visible}
                      onChange={() => toggleColumnVisibility(col.field)}
                    />
                    <span className="ihub-toggle-label">{col.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="ihub-table-responsive">
              <table className="ihub-table ihub-configurable-table">
                <THeadSortList
                  columns={columnConfig.filter(col => col.visible)}
                  sortConfig={sortConfig}
                  onSort={handleSort}
                  multiSort={true}
                  showSortPriority={true}
                  resizable={true}
                  configurable={true}
                  onColumnResize={(field, width) => {
                    setColumnConfig(prev => 
                      prev.map(col => 
                        col.field === field ? { ...col, width } : col
                      )
                    );
                  }}
                  className="ihub-configurable-header"
                />
                <tbody>
                  {sortedEmployeeData.slice(0, 3).map((employee) => (
                    <tr key={employee.id}>
                      {columnConfig.filter(col => col.visible).map((col) => (
                        <td key={col.field} style={{ width: col.width }}>
                          {col.type === 'currency' ? (
                            `$${employee[col.field].toLocaleString()}`
                          ) : col.type === 'date' ? (
                            new Date(employee[col.field]).toLocaleDateString()
                          ) : col.type === 'rating' ? (
                            <div className="ihub-rating-display">
                              <span className="ihub-rating-value">{employee[col.field]}</span>
                              <span className="ihub-rating-stars">
                                {'★'.repeat(Math.floor(employee[col.field]))}
                              </span>
                            </div>
                          ) : (
                            employee[col.field]
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Product Table */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Advanced Product Catalog</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Product Management</h3>
            <p className="ihub-text-muted">Complex sorting with custom column types</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-table-responsive">
              <table className="ihub-table ihub-product-table">
                <THeadSortList
                  columns={[
                    { field: "name", label: "Product Name", sortable: true, type: "text", icon: "📦" },
                    { field: "category", label: "Category", sortable: true, type: "text", icon: "🏷️" },
                    { field: "price", label: "Price", sortable: true, type: "currency", icon: "💰" },
                    { field: "stock", label: "Stock", sortable: true, type: "number", icon: "📊" },
                    { field: "sales", label: "Sales", sortable: true, type: "number", icon: "📈" },
                    { field: "rating", label: "Rating", sortable: true, type: "rating", icon: "⭐" },
                    { field: "featured", label: "Featured", sortable: true, type: "boolean", icon: "✨" },
                  ]}
                  sortConfig={productSortConfig}
                  onSort={handleProductSort}
                  multiSort={true}
                  showSortPriority={true}
                  showIcons={true}
                  stickyHeader={true}
                  className="ihub-product-header"
                />
                <tbody>
                  {sortedProductData.map((product) => (
                    <tr key={product.id}>
                      <td className="ihub-product-name">{product.name}</td>
                      <td>
                        <span className="ihub-category-tag">{product.category}</span>
                      </td>
                      <td className="ihub-price">${product.price}</td>
                      <td>
                        <span className={`ihub-stock-indicator ${product.stock === 0 ? 'out-of-stock' : product.stock < 100 ? 'low-stock' : 'in-stock'}`}>
                          {product.stock === 0 ? 'Out of Stock' : `${product.stock} units`}
                        </span>
                      </td>
                      <td className="ihub-sales">{product.sales.toLocaleString()}</td>
                      <td>
                        <div className="ihub-rating-display">
                          <span className="ihub-rating-value">{product.rating}</span>
                          <span className="ihub-rating-stars">
                            {'★'.repeat(Math.floor(product.rating))}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className={`ihub-featured-badge ${product.featured ? 'featured' : 'not-featured'}`}>
                          {product.featured ? '✨ Featured' : 'Standard'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="ihub-sort-summary ihub-mt-3">
              {productSortConfig.length > 0 && (
                <div className="ihub-current-sorting">
                  <h5>Current Sorting:</h5>
                  <ol className="ihub-sort-list">
                    {productSortConfig
                      .sort((a, b) => a.priority - b.priority)
                      .map((sort) => (
                        <li key={sort.field} className="ihub-sort-item">
                          <strong>{sort.field}</strong>: {sort.direction === 'asc' ? 'Ascending' : 'Descending'}
                        </li>
                      ))}
                  </ol>
                  <button 
                    className="ihub-outlined-btn ihub-btn-sm"
                    onClick={() => setProductSortConfig([])}
                  >
                    Clear Product Sorting
                  </button>
                </div>
              )}
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
{`interface THeadSortListProps {
  columns: Array<{
    field: string;                      // Column field name
    label: string;                      // Display label
    sortable?: boolean;                 // Whether column is sortable
    visible?: boolean;                  // Whether column is visible
    width?: string;                     // Column width
    type?: string;                      // Data type hint
    icon?: string | React.ReactNode;    // Column icon
  }>;
  sortConfig: Array<{                   // Current sort configuration
    field: string;
    direction: 'asc' | 'desc';
    priority: number;
  }>;
  onSort: (field: string) => void;      // Sort handler
  className?: string;                   // CSS classes
  multiSort?: boolean;                  // Enable multi-column sorting
  showSortPriority?: boolean;           // Show sort priority numbers
  showIcons?: boolean;                  // Show column icons
  resizable?: boolean;                  // Enable column resizing
  configurable?: boolean;               // Enable column configuration
  stickyHeader?: boolean;               // Sticky header during scroll
  onColumnResize?: (field: string, width: string) => void; // Column resize handler
}`}</pre>
          
          <h3 className="ihub-mt-3">Key Features:</h3>
          <ul>
            <li><strong>Multi-Column Sorting:</strong> Sort by multiple columns with priority indicators</li>
            <li><strong>Visual Feedback:</strong> Clear sort direction and priority indicators</li>
            <li><strong>Column Management:</strong> Show/hide columns and resize capabilities</li>
            <li><strong>Type Awareness:</strong> Handles different data types appropriately</li>
            <li><strong>Accessibility:</strong> Full keyboard navigation and screen reader support</li>
            <li><strong>Sticky Headers:</strong> Optional sticky positioning during scroll</li>
          </ul>
          
          <h3 className="ihub-mt-3">Best Practices:</h3>
          <ul>
            <li>Provide clear visual indicators for active sorting states</li>
            <li>Use consistent sort priorities for predictable multi-column sorting</li>
            <li>Implement proper keyboard navigation for accessibility</li>
            <li>Consider performance impact with large datasets</li>
            <li>Provide users with clear feedback about current sort configuration</li>
            <li>Allow users to easily clear or modify sorting</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default THeadSortListExamples;
```

## 🔗 Related Components

- [THeadSortBtn](./THeadSortBtn.md) - Individual sort button component
- [TBodyNoData](./TBodyNoData.md) - Table empty state component
- [Tables](./Tables.md) - Basic table component
- [IHubTable](./IHubTable.md) - Advanced table component
- [IHubTableServer](./IHubTableServer.md) - Server-side table component

