# SearchFieldDB

**Category:** Forms | **Type:** component

Database search field component with real-time filtering, async data loading, and advanced search features

**File Location:** `src/components/forms/SearchFieldDB.tsx`

## 🏷️ Tags

`forms`, `search`, `database`, `filtering`, `async`, `debounced`

```tsx
"use client";
import React, { useState, useEffect } from "react";
import { SearchFieldDB } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive examples demonstrating SearchFieldDB usage
 * Shows database integration, filtering, async search, and real-time updates
 */
const SearchFieldDBExamples = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    dateRange: "",
  });

  // Mock database data
  const mockDatabase = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", department: "Engineering", status: "active", role: "Developer" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", department: "Marketing", status: "active", role: "Manager" },
    { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", department: "Sales", status: "inactive", role: "Representative" },
    { id: 4, name: "Alice Brown", email: "alice.brown@example.com", department: "Engineering", status: "active", role: "Senior Developer" },
    { id: 5, name: "Charlie Wilson", email: "charlie.wilson@example.com", department: "HR", status: "active", role: "Coordinator" },
    { id: 6, name: "Diana Davis", email: "diana.davis@example.com", department: "Finance", status: "active", role: "Analyst" },
    { id: 7, name: "Edward Miller", email: "edward.miller@example.com", department: "Engineering", status: "inactive", role: "Intern" },
    { id: 8, name: "Fiona Garcia", email: "fiona.garcia@example.com", department: "Marketing", status: "active", role: "Content Creator" },
    { id: 9, name: "George Martinez", email: "george.martinez@example.com", department: "Sales", status: "active", role: "Manager" },
    { id: 10, name: "Helen Taylor", email: "helen.taylor@example.com", department: "Support", status: "active", role: "Specialist" },
  ];

  const mockProducts = [
    { id: 1, name: "React UI Components", category: "software", price: 99, stock: 150, status: "available" },
    { id: 2, name: "TypeScript Course", category: "education", price: 49, stock: 0, status: "out_of_stock" },
    { id: 3, name: "Design System", category: "design", price: 199, stock: 75, status: "available" },
    { id: 4, name: "API Documentation", category: "documentation", price: 29, stock: 200, status: "available" },
    { id: 5, name: "Mobile App Template", category: "template", price: 149, stock: 50, status: "limited" },
    { id: 6, name: "Database Schema", category: "software", price: 79, stock: 100, status: "available" },
    { id: 7, name: "Testing Framework", category: "software", price: 89, stock: 25, status: "limited" },
    { id: 8, name: "UI Kit Premium", category: "design", price: 299, stock: 0, status: "coming_soon" },
  ];

  // Simulate database search
  const searchDatabase = async (query: string, options: any = {}) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let results = mockDatabase;
    
    if (query) {
      results = results.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.email.toLowerCase().includes(query.toLowerCase()) ||
        item.department.toLowerCase().includes(query.toLowerCase()) ||
        item.role.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Apply filters
    if (options.department) {
      results = results.filter(item => item.department === options.department);
    }
    
    if (options.status) {
      results = results.filter(item => item.status === options.status);
    }
    
    setIsLoading(false);
    return results.slice(0, options.limit || 10);
  };

  const searchProducts = async (query: string, options: any = {}) => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 600));
    
    let results = mockProducts;
    
    if (query) {
      results = results.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (options.category) {
      results = results.filter(item => item.category === options.category);
    }
    
    if (options.status) {
      results = results.filter(item => item.status === options.status);
    }
    
    setIsLoading(false);
    return results.slice(0, options.limit || 8);
  };

  const handleSearchResult = (results: any[]) => {
    setSearchResults(results);
    if (results.length > 0) {
      openToast(`Found ${results.length} results`);
    }
  };

  const handleItemSelect = (item: any) => {
    if (!selectedItems.find(selected => selected.id === item.id)) {
      setSelectedItems(prev => [...prev, item]);
      openToast(`Selected: ${item.name}`);
    }
  };

  const handleItemRemove = (itemId: number) => {
    setSelectedItems(prev => prev.filter(item => item.id !== itemId));
    openToast("Item removed from selection");
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>SearchFieldDB Examples</h1>
      <p className="ihub-mb-4">
        Database search component with real-time filtering, async data loading,
        debounced input, and advanced search capabilities.
      </p>

      {/* Basic Database Search */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Basic Database Search</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Employee Search</h3>
            <p className="ihub-text-muted">Search employees by name, email, department, or role</p>
          </div>
          
          <div className="ihub-card-body">
            <SearchFieldDB
              placeholder="Search employees..."
              searchFunction={searchDatabase}
              onResults={handleSearchResult}
              onSelect={handleItemSelect}
              displayField="name"
              secondaryField="email"
              tertiaryField="department"
              debounceMs={500}
              minSearchLength={2}
              maxResults={10}
              className="ihub-employee-search"
              showLoadingState={true}
              isLoading={isLoading}
            />
            
            {searchResults.length > 0 && (
              <div className="ihub-search-results ihub-mt-3">
                <h4>Search Results ({searchResults.length})</h4>
                <div className="ihub-results-list">
                  {searchResults.map((employee) => (
                    <div key={employee.id} className="ihub-result-item">
                      <div className="ihub-employee-info">
                        <div className="ihub-employee-name">{employee.name}</div>
                        <div className="ihub-employee-details">
                          {employee.email} • {employee.department} • {employee.role}
                        </div>
                        <span className={`ihub-status-badge ${employee.status}`}>
                          {employee.status}
                        </span>
                      </div>
                      <button
                        className="ihub-outlined-btn ihub-btn-sm"
                        onClick={() => handleItemSelect(employee)}
                      >
                        Select
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Advanced Search with Filters */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Advanced Search with Filters</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Product Search</h3>
            <p className="ihub-text-muted">Search products with category and status filters</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-search-filters ihub-mb-3">
              <div className="ihub-row">
                <div className="ihub-col-md-4">
                  <label className="ihub-form-label">Category Filter</label>
                  <select
                    className="ihub-select"
                    value={filters.category}
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="">All Categories</option>
                    <option value="software">Software</option>
                    <option value="education">Education</option>
                    <option value="design">Design</option>
                    <option value="documentation">Documentation</option>
                    <option value="template">Template</option>
                  </select>
                </div>
                
                <div className="ihub-col-md-4">
                  <label className="ihub-form-label">Status Filter</label>
                  <select
                    className="ihub-select"
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  >
                    <option value="">All Status</option>
                    <option value="available">Available</option>
                    <option value="limited">Limited</option>
                    <option value="out_of_stock">Out of Stock</option>
                    <option value="coming_soon">Coming Soon</option>
                  </select>
                </div>
                
                <div className="ihub-col-md-4">
                  <label className="ihub-form-label">Search Products</label>
                  <SearchFieldDB
                    placeholder="Search products..."
                    searchFunction={(query) => searchProducts(query, {
                      category: filters.category,
                      status: filters.status,
                      limit: 8
                    })}
                    onResults={handleSearchResult}
                    onSelect={handleItemSelect}
                    displayField="name"
                    secondaryField="category"
                    tertiaryField={(item: any) => `$${item.price} • Stock: ${item.stock}`}
                    debounceMs={300}
                    minSearchLength={1}
                    maxResults={8}
                    className="ihub-product-search"
                    showLoadingState={true}
                    isLoading={isLoading}
                    clearOnSelect={false}
                  />
                </div>
              </div>
            </div>
            
            {searchResults.length > 0 && (
              <div className="ihub-product-results">
                <h4>Products Found ({searchResults.length})</h4>
                <div className="ihub-product-grid">
                  {searchResults.map((product) => (
                    <div key={product.id} className="ihub-product-card">
                      <div className="ihub-product-header">
                        <h5>{product.name}</h5>
                        <span className={`ihub-status-badge ${product.status}`}>
                          {product.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="ihub-product-details">
                        <p>Category: {product.category}</p>
                        <p>Price: ${product.price}</p>
                        <p>Stock: {product.stock}</p>
                      </div>
                      <button
                        className="ihub-primary-btn ihub-btn-sm"
                        onClick={() => handleItemSelect(product)}
                        disabled={product.status === 'out_of_stock'}
                      >
                        {product.status === 'out_of_stock' ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Multi-Select Search */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Multi-Select Search</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Team Member Selection</h3>
            <p className="ihub-text-muted">Search and select multiple team members</p>
          </div>
          
          <div className="ihub-card-body">
            <SearchFieldDB
              placeholder="Search and select team members..."
              searchFunction={(query) => searchDatabase(query, { 
                status: 'active',
                limit: 15 
              })}
              onResults={() => {}} // Don't show external results for multi-select
              onSelect={handleItemSelect}
              displayField="name"
              secondaryField="role"
              tertiaryField="department"
              debounceMs={400}
              minSearchLength={2}
              maxResults={15}
              className="ihub-team-search"
              showLoadingState={true}
              isLoading={isLoading}
              multiSelect={true}
              clearOnSelect={true}
              showDropdown={true}
              excludeSelected={selectedItems}
            />
            
            {/* Selected Items Display */}
            {selectedItems.length > 0 && (
              <div className="ihub-selected-items ihub-mt-4">
                <h4>Selected Team Members ({selectedItems.length})</h4>
                <div className="ihub-selected-list">
                  {selectedItems.map((member) => (
                    <div key={member.id} className="ihub-selected-item">
                      <div className="ihub-member-avatar">
                        {member.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div className="ihub-member-info">
                        <div className="ihub-member-name">{member.name}</div>
                        <div className="ihub-member-role">{member.role} • {member.department}</div>
                      </div>
                      <button
                        className="ihub-remove-btn"
                        onClick={() => handleItemRemove(member.id)}
                        aria-label={`Remove ${member.name}`}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="ihub-selection-actions ihub-mt-3">
                  <button
                    className="ihub-primary-btn ihub-me-2"
                    onClick={() => openToast(`Creating team with ${selectedItems.length} members`)}
                  >
                    Create Team
                  </button>
                  <button
                    className="ihub-outlined-btn"
                    onClick={() => setSelectedItems([])}
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Real-time Search Dashboard */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Real-time Search Dashboard</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Live Search Analytics</h3>
            <p className="ihub-text-muted">Real-time search with analytics and performance metrics</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-search-dashboard">
              <div className="ihub-row">
                <div className="ihub-col-md-8">
                  <SearchFieldDB
                    placeholder="Search with real-time analytics..."
                    searchFunction={async (query) => {
                      const startTime = Date.now();
                      const results = await searchDatabase(query, { limit: 20 });
                      const endTime = Date.now();
                      
                      openToast(`Search completed in ${endTime - startTime}ms`);
                      return results;
                    }}
                    onResults={handleSearchResult}
                    onSelect={handleItemSelect}
                    displayField="name"
                    secondaryField="email"
                    tertiaryField="department"
                    debounceMs={200}
                    minSearchLength={1}
                    maxResults={20}
                    className="ihub-analytics-search"
                    showLoadingState={true}
                    isLoading={isLoading}
                    showSearchStats={true}
                  />
                </div>
                
                <div className="ihub-col-md-4">
                  <div className="ihub-search-stats">
                    <h5>Search Metrics</h5>
                    <div className="ihub-stat-item">
                      <span>Results Found:</span>
                      <span>{searchResults.length}</span>
                    </div>
                    <div className="ihub-stat-item">
                      <span>Selected Items:</span>
                      <span>{selectedItems.length}</span>
                    </div>
                    <div className="ihub-stat-item">
                      <span>Search Status:</span>
                      <span>{isLoading ? 'Loading...' : 'Ready'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Search Configuration */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Custom Search Configuration</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Instant Search</h3>
              </div>
              <div className="ihub-card-body">
                <SearchFieldDB
                  placeholder="Instant search (no debounce)..."
                  searchFunction={searchDatabase}
                  onResults={() => {}}
                  onSelect={handleItemSelect}
                  displayField="name"
                  secondaryField="department"
                  debounceMs={0}
                  minSearchLength={1}
                  maxResults={5}
                  className="ihub-instant-search"
                  showLoadingState={false}
                />
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Slow Search</h3>
              </div>
              <div className="ihub-card-body">
                <SearchFieldDB
                  placeholder="Careful search (long debounce)..."
                  searchFunction={searchDatabase}
                  onResults={() => {}}
                  onSelect={handleItemSelect}
                  displayField="name"
                  secondaryField="role"
                  debounceMs={1500}
                  minSearchLength={3}
                  maxResults={3}
                  className="ihub-slow-search"
                  showLoadingState={true}
                  isLoading={isLoading}
                />
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
{`interface SearchFieldDBProps {
  placeholder?: string;                 // Input placeholder text
  searchFunction: (query: string, options?: any) => Promise<any[]>;
  onResults: (results: any[]) => void;  // Results callback
  onSelect: (item: any) => void;        // Item selection callback
  displayField: string;                // Primary display field
  secondaryField?: string;              // Secondary display field
  tertiaryField?: string | ((item: any) => string); // Tertiary field
  debounceMs?: number;                  // Debounce delay (default: 300ms)
  minSearchLength?: number;             // Minimum search length
  maxResults?: number;                  // Maximum results to show
  className?: string;                   // CSS classes
  showLoadingState?: boolean;           // Show loading indicator
  isLoading?: boolean;                  // Loading state
  multiSelect?: boolean;                // Allow multiple selections
  clearOnSelect?: boolean;              // Clear input after selection
  showDropdown?: boolean;               // Show dropdown results
  excludeSelected?: any[];              // Exclude selected items
  showSearchStats?: boolean;            // Show search statistics
}`}
          </pre>
          
          <h3 className="ihub-mt-3">Key Features:</h3>
          <ul>
            <li><strong>Async Search:</strong> Real-time database querying with promises</li>
            <li><strong>Debounced Input:</strong> Configurable delay to optimize API calls</li>
            <li><strong>Multi-field Display:</strong> Primary, secondary, and tertiary field display</li>
            <li><strong>Loading States:</strong> Visual feedback during search operations</li>
            <li><strong>Multi-select:</strong> Support for selecting multiple items</li>
            <li><strong>Filtering:</strong> External filter integration and exclusion lists</li>
          </ul>
          
          <h3 className="ihub-mt-3">Best Practices:</h3>
          <ul>
            <li>Use appropriate debounce delays (200-500ms) based on API response time</li>
            <li>Implement proper error handling for failed search requests</li>
            <li>Cache search results to improve performance for repeated queries</li>
            <li>Provide clear visual feedback for loading and empty states</li>
            <li>Use pagination for large result sets to improve performance</li>
            <li>Implement keyboard navigation for accessibility</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default SearchFieldDBExamples;
```

## 🔗 Related Components

- [ActionDropdown](./ActionDropdown.md) - Dropdown component for actions
- [AnimatedBox](./AnimatedBox.md) - Animated container component
- [PasswordField](./PasswordField.md) - Secure password input field
- [DateInput](./DateInput.md) - Date selection input field
- [DateTimeInput](./DateTimeInput.md) - Date and time selection input field

