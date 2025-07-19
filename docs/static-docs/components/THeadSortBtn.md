# THeadSortBtn

**Category:** Forms | **Type:** component

Table header sort button component with ascending/descending/none states and visual indicators

**File Location:** `src/components/forms/THeadSortBtn.tsx`

## 🏷️ Tags

`forms`, `table`, `sorting`, `thead`, `interactive`

```tsx
"use client";
import React, { useState } from "react";
import { THeadSortBtn } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive examples demonstrating THeadSortBtn usage
 * Shows different sorting states, table integration, and sorting logic
 */
const THeadSortBtnExamples = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", age: 32, salary: 85000, department: "Engineering", joinDate: "2023-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", age: 28, salary: 92000, department: "Marketing", joinDate: "2023-03-22" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", age: 45, salary: 78000, department: "Sales", joinDate: "2022-11-08" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", age: 35, salary: 95000, department: "Engineering", joinDate: "2023-02-10" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", age: 29, salary: 72000, department: "HR", joinDate: "2023-05-18" },
    { id: 6, name: "Diana Davis", email: "diana@example.com", age: 31, salary: 88000, department: "Finance", joinDate: "2022-12-03" },
    { id: 7, name: "Edward Miller", email: "edward@example.com", age: 27, salary: 65000, department: "Support", joinDate: "2023-06-12" },
    { id: 8, name: "Fiona Garcia", email: "fiona@example.com", age: 33, salary: 89000, department: "Marketing", joinDate: "2023-01-28" },
  ]);

  const [sortConfig, setSortConfig] = useState<{
    field: string;
    direction: 'asc' | 'desc' | 'none';
  }>({
    field: '',
    direction: 'none'
  });

  const [products, setProducts] = useState([
    { id: 1, name: "React UI Kit", price: 99.99, stock: 150, category: "Software", rating: 4.8, sales: 1250 },
    { id: 2, name: "TypeScript Course", price: 49.99, stock: 0, category: "Education", rating: 4.9, sales: 890 },
    { id: 3, name: "Design System", price: 199.99, stock: 75, category: "Design", rating: 4.7, sales: 567 },
    { id: 4, name: "API Documentation", price: 29.99, stock: 200, category: "Documentation", rating: 4.6, sales: 1100 },
    { id: 5, name: "Mobile Template", price: 149.99, stock: 50, category: "Template", rating: 4.8, sales: 423 },
  ]);

  const [productSortConfig, setProductSortConfig] = useState<{
    field: string;
    direction: 'asc' | 'desc' | 'none';
  }>({
    field: '',
    direction: 'none'
  });

  // Generic sort function
  const sortData = (data: any[], field: string, direction: 'asc' | 'desc') => {
    return [...data].sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];

      // Handle different data types
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (typeof aValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === 'string') {
        if (direction === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      }

      return 0;
    });
  };

  const handleSort = (field: string) => {
    let newDirection: 'asc' | 'desc' | 'none' = 'asc';
    
    if (sortConfig.field === field) {
      if (sortConfig.direction === 'asc') {
        newDirection = 'desc';
      } else if (sortConfig.direction === 'desc') {
        newDirection = 'none';
      } else {
        newDirection = 'asc';
      }
    }

    setSortConfig({ field, direction: newDirection });

    if (newDirection !== 'none') {
      const sortedData = sortData(users, field, newDirection);
      setUsers(sortedData);
      openToast(`Sorted by ${field} (${newDirection}ending)`);
    } else {
      // Reset to original order
      setUsers([
        { id: 1, name: "John Doe", email: "john@example.com", age: 32, salary: 85000, department: "Engineering", joinDate: "2023-01-15" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", age: 28, salary: 92000, department: "Marketing", joinDate: "2023-03-22" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", age: 45, salary: 78000, department: "Sales", joinDate: "2022-11-08" },
        { id: 4, name: "Alice Brown", email: "alice@example.com", age: 35, salary: 95000, department: "Engineering", joinDate: "2023-02-10" },
        { id: 5, name: "Charlie Wilson", email: "charlie@example.com", age: 29, salary: 72000, department: "HR", joinDate: "2023-05-18" },
        { id: 6, name: "Diana Davis", email: "diana@example.com", age: 31, salary: 88000, department: "Finance", joinDate: "2022-12-03" },
        { id: 7, name: "Edward Miller", email: "edward@example.com", age: 27, salary: 65000, department: "Support", joinDate: "2023-06-12" },
        { id: 8, name: "Fiona Garcia", email: "fiona@example.com", age: 33, salary: 89000, department: "Marketing", joinDate: "2023-01-28" },
      ]);
      openToast(`Cleared ${field} sorting`);
    }
  };

  const handleProductSort = (field: string) => {
    let newDirection: 'asc' | 'desc' | 'none' = 'asc';
    
    if (productSortConfig.field === field) {
      if (productSortConfig.direction === 'asc') {
        newDirection = 'desc';
      } else if (productSortConfig.direction === 'desc') {
        newDirection = 'none';
      } else {
        newDirection = 'asc';
      }
    }

    setProductSortConfig({ field, direction: newDirection });

    if (newDirection !== 'none') {
      const sortedData = sortData(products, field, newDirection);
      setProducts(sortedData);
    } else {
      // Reset to original order
      setProducts([
        { id: 1, name: "React UI Kit", price: 99.99, stock: 150, category: "Software", rating: 4.8, sales: 1250 },
        { id: 2, name: "TypeScript Course", price: 49.99, stock: 0, category: "Education", rating: 4.9, sales: 890 },
        { id: 3, name: "Design System", price: 199.99, stock: 75, category: "Design", rating: 4.7, sales: 567 },
        { id: 4, name: "API Documentation", price: 29.99, stock: 200, category: "Documentation", rating: 4.6, sales: 1100 },
        { id: 5, name: "Mobile Template", price: 149.99, stock: 50, category: "Template", rating: 4.8, sales: 423 },
      ]);
    }
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>THeadSortBtn Examples</h1>
      <p className="ihub-mb-4">
        Table header sort button component for implementing sortable columns
        with ascending, descending, and neutral states.
      </p>

      {/* Basic Sortable Table */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Basic Sortable Table</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Employee Directory</h3>
            <p className="ihub-text-muted">Click column headers to sort data</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-sort-info ihub-mb-3">
              {sortConfig.direction !== 'none' && (
                <div className="ihub-current-sort">
                  <span>Currently sorted by: </span>
                  <strong>{sortConfig.field}</strong>
                  <span> ({sortConfig.direction}ending)</span>
                  <button
                    className="ihub-clear-sort-btn ihub-ms-2"
                    onClick={() => handleSort(sortConfig.field)}
                  >
                    Clear Sort
                  </button>
                </div>
              )}
            </div>
            
            <div className="ihub-table-responsive">
              <table className="ihub-table ihub-sortable-table">
                <thead>
                  <tr>
                    <th>
                      <THeadSortBtn
                        label="Name"
                        field="name"
                        currentSort={sortConfig.field}
                        currentDirection={sortConfig.field === 'name' ? sortConfig.direction : 'none'}
                        onSort={handleSort}
                        className="ihub-sort-name"
                      />
                    </th>
                    <th>
                      <THeadSortBtn
                        label="Email"
                        field="email"
                        currentSort={sortConfig.field}
                        currentDirection={sortConfig.field === 'email' ? sortConfig.direction : 'none'}
                        onSort={handleSort}
                        className="ihub-sort-email"
                      />
                    </th>
                    <th>
                      <THeadSortBtn
                        label="Age"
                        field="age"
                        currentSort={sortConfig.field}
                        currentDirection={sortConfig.field === 'age' ? sortConfig.direction : 'none'}
                        onSort={handleSort}
                        className="ihub-sort-age"
                      />
                    </th>
                    <th>
                      <THeadSortBtn
                        label="Salary"
                        field="salary"
                        currentSort={sortConfig.field}
                        currentDirection={sortConfig.field === 'salary' ? sortConfig.direction : 'none'}
                        onSort={handleSort}
                        className="ihub-sort-salary"
                      />
                    </th>
                    <th>
                      <THeadSortBtn
                        label="Department"
                        field="department"
                        currentSort={sortConfig.field}
                        currentDirection={sortConfig.field === 'department' ? sortConfig.direction : 'none'}
                        onSort={handleSort}
                        className="ihub-sort-department"
                      />
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="ihub-font-weight-bold">{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.age}</td>
                      <td>${user.salary.toLocaleString()}</td>
                      <td>
                        <span className="ihub-department-badge">
                          {user.department}
                        </span>
                      </td>
                      <td>
                        <button className="ihub-outlined-btn ihub-btn-sm">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Sortable Table */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Advanced Sortable Table</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Product Catalog</h3>
            <p className="ihub-text-muted">Sortable table with custom formatting and icons</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-table-responsive">
              <table className="ihub-table ihub-product-table">
                <thead>
                  <tr>
                    <th>
                      <THeadSortBtn
                        label="Product Name"
                        field="name"
                        currentSort={productSortConfig.field}
                        currentDirection={productSortConfig.field === 'name' ? productSortConfig.direction : 'none'}
                        onSort={handleProductSort}
                        icon="📦"
                        showIcon={true}
                        className="ihub-sort-product-name"
                      />
                    </th>
                    <th>
                      <THeadSortBtn
                        label="Price"
                        field="price"
                        currentSort={productSortConfig.field}
                        currentDirection={productSortConfig.field === 'price' ? productSortConfig.direction : 'none'}
                        onSort={handleProductSort}
                        icon="💰"
                        showIcon={true}
                        className="ihub-sort-price"
                      />
                    </th>
                    <th>
                      <THeadSortBtn
                        label="Stock"
                        field="stock"
                        currentSort={productSortConfig.field}
                        currentDirection={productSortConfig.field === 'stock' ? productSortConfig.direction : 'none'}
                        onSort={handleProductSort}
                        icon="📊"
                        showIcon={true}
                        className="ihub-sort-stock"
                      />
                    </th>
                    <th>
                      <THeadSortBtn
                        label="Category"
                        field="category"
                        currentSort={productSortConfig.field}
                        currentDirection={productSortConfig.field === 'category' ? productSortConfig.direction : 'none'}
                        onSort={handleProductSort}
                        icon="🏷️"
                        showIcon={true}
                        className="ihub-sort-category"
                      />
                    </th>
                    <th>
                      <THeadSortBtn
                        label="Rating"
                        field="rating"
                        currentSort={productSortConfig.field}
                        currentDirection={productSortConfig.field === 'rating' ? productSortConfig.direction : 'none'}
                        onSort={handleProductSort}
                        icon="⭐"
                        showIcon={true}
                        className="ihub-sort-rating"
                      />
                    </th>
                    <th>
                      <THeadSortBtn
                        label="Sales"
                        field="sales"
                        currentSort={productSortConfig.field}
                        currentDirection={productSortConfig.field === 'sales' ? productSortConfig.direction : 'none'}
                        onSort={handleProductSort}
                        icon="📈"
                        showIcon={true}
                        className="ihub-sort-sales"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="ihub-font-weight-bold">{product.name}</td>
                      <td>${product.price}</td>
                      <td>
                        <span className={`ihub-stock-badge ${product.stock === 0 ? 'out-of-stock' : product.stock < 100 ? 'low-stock' : 'in-stock'}`}>
                          {product.stock === 0 ? 'Out of Stock' : `${product.stock} units`}
                        </span>
                      </td>
                      <td>
                        <span className="ihub-category-tag">
                          {product.category}
                        </span>
                      </td>
                      <td>
                        <div className="ihub-rating">
                          <span className="ihub-rating-value">{product.rating}</span>
                          <span className="ihub-rating-stars">
                            {'★'.repeat(Math.floor(product.rating))}
                          </span>
                        </div>
                      </td>
                      <td>{product.sales.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Sort Button Variations */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Sort Button Variations</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Compact Sort Buttons</h3>
              </div>
              <div className="ihub-card-body">
                <div className="ihub-sort-examples">
                  <div className="ihub-sort-example">
                    <THeadSortBtn
                      label="Name"
                      field="name"
                      currentSort=""
                      currentDirection="none"
                      onSort={() => openToast("Sort by name")}
                      compact={true}
                      className="ihub-compact-sort"
                    />
                  </div>
                  
                  <div className="ihub-sort-example">
                    <THeadSortBtn
                      label="Date"
                      field="date"
                      currentSort="date"
                      currentDirection="asc"
                      onSort={() => openToast("Sort by date ascending")}
                      compact={true}
                      className="ihub-compact-sort"
                    />
                  </div>
                  
                  <div className="ihub-sort-example">
                    <THeadSortBtn
                      label="Price"
                      field="price"
                      currentSort="price"
                      currentDirection="desc"
                      onSort={() => openToast("Sort by price descending")}
                      compact={true}
                      className="ihub-compact-sort"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Custom Styled Buttons</h3>
              </div>
              <div className="ihub-card-body">
                <div className="ihub-sort-examples">
                  <div className="ihub-sort-example">
                    <THeadSortBtn
                      label="Priority"
                      field="priority"
                      currentSort=""
                      currentDirection="none"
                      onSort={() => openToast("Sort by priority")}
                      icon="🔥"
                      showIcon={true}
                      customStyles={{
                        color: '#ff6b6b',
                        fontWeight: 'bold'
                      }}
                      className="ihub-priority-sort"
                    />
                  </div>
                  
                  <div className="ihub-sort-example">
                    <THeadSortBtn
                      label="Status"
                      field="status"
                      currentSort="status"
                      currentDirection="asc"
                      onSort={() => openToast("Sort by status")}
                      icon="✅"
                      showIcon={true}
                      customStyles={{
                        color: '#4caf50'
                      }}
                      className="ihub-status-sort"
                    />
                  </div>
                  
                  <div className="ihub-sort-example">
                    <THeadSortBtn
                      label="Performance"
                      field="performance"
                      currentSort="performance"
                      currentDirection="desc"
                      onSort={() => openToast("Sort by performance")}
                      icon="📊"
                      showIcon={true}
                      customStyles={{
                        color: '#2196f3'
                      }}
                      className="ihub-performance-sort"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disabled and Readonly States */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Disabled and Readonly States</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Special States</h3>
            <p className="ihub-text-muted">Examples of disabled and readonly sort buttons</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-table-responsive">
              <table className="ihub-table">
                <thead>
                  <tr>
                    <th>
                      <THeadSortBtn
                        label="ID (Not Sortable)"
                        field="id"
                        currentSort=""
                        currentDirection="none"
                        onSort={() => {}}
                        disabled={true}
                        className="ihub-sort-disabled"
                      />
                    </th>
                    <th>
                      <THeadSortBtn
                        label="Name"
                        field="name"
                        currentSort=""
                        currentDirection="none"
                        onSort={() => openToast("Sort by name")}
                        className="ihub-sort-enabled"
                      />
                    </th>
                    <th>
                      <THeadSortBtn
                        label="Created (Readonly)"
                        field="created"
                        currentSort="created"
                        currentDirection="asc"
                        onSort={() => {}}
                        readonly={true}
                        className="ihub-sort-readonly"
                      />
                    </th>
                    <th>
                      <THeadSortBtn
                        label="Score"
                        field="score"
                        currentSort=""
                        currentDirection="none"
                        onSort={() => openToast("Sort by score")}
                        className="ihub-sort-enabled"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>001</td>
                    <td>Sample Item</td>
                    <td>2024-01-15</td>
                    <td>95.5</td>
                  </tr>
                  <tr>
                    <td>002</td>
                    <td>Another Item</td>
                    <td>2024-01-16</td>
                    <td>87.2</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="ihub-state-info ihub-mt-3">
              <div className="ihub-info-item">
                <span className="ihub-label">Disabled:</span>
                <span>Cannot be clicked or sorted</span>
              </div>
              <div className="ihub-info-item">
                <span className="ihub-label">Readonly:</span>
                <span>Shows current sort state but prevents changes</span>
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
{`interface THeadSortBtnProps {
  label: string;                        // Column label text
  field: string;                        // Field name for sorting
  currentSort: string;                  // Currently sorted field
  currentDirection: 'asc' | 'desc' | 'none'; // Current sort direction
  onSort: (field: string) => void;      // Sort handler function
  className?: string;                   // CSS classes
  icon?: string | React.ReactNode;      // Optional icon
  showIcon?: boolean;                   // Show icon next to label
  compact?: boolean;                    // Compact display mode
  disabled?: boolean;                   // Disable sorting
  readonly?: boolean;                   // Show state but prevent changes
  customStyles?: React.CSSProperties;   // Custom inline styles
  tooltip?: string;                     // Tooltip text
}`}
          </pre>
          
          <h3 className="ihub-mt-3">Key Features:</h3>
          <ul>
            <li><strong>Three-State Sorting:</strong> None → Ascending → Descending → None</li>
            <li><strong>Visual Indicators:</strong> Clear arrows and states for sort direction</li>
            <li><strong>Keyboard Accessible:</strong> Supports Enter and Space key activation</li>
            <li><strong>Customizable:</strong> Icons, styling, and compact modes</li>
            <li><strong>State Management:</strong> Integrates with external sort state</li>
            <li><strong>Responsive:</strong> Works well on mobile and desktop</li>
          </ul>
          
          <h3 className="ihub-mt-3">Best Practices:</h3>
          <ul>
            <li>Always provide clear visual feedback for the current sort state</li>
            <li>Use consistent sort logic across all columns</li>
            <li>Consider data types when implementing sort functions</li>
            <li>Provide keyboard accessibility for all sort buttons</li>
            <li>Show loading states for async sorting operations</li>
            <li>Implement proper ARIA labels for screen readers</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default THeadSortBtnExamples;
```

## 🔗 Related Components

- [ActionDropdown](./ActionDropdown.md) - Dropdown component for actions
- [AnimatedBox](./AnimatedBox.md) - Animated container component
- [PasswordField](./PasswordField.md) - Secure password input field
- [DateInput](./DateInput.md) - Date selection input field
- [DateTimeInput](./DateTimeInput.md) - Date and time selection input field

