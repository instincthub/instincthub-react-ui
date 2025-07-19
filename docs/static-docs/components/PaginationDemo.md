# PaginationDemo

**Category:** UI | **Type:** component

Comprehensive pagination demo with API integration and advanced features

## 🏷️ Tags

`ui`, `pagination`, `api`, `navigation`, `data`

```tsx
"use client";
import React, { useState, useEffect } from "react";
import { Pagination } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";
import { PaginationData } from "@/types";

/**
 * Comprehensive examples demonstrating various pagination implementations
 * Shows real-world usage patterns with API integration, search, and filtering
 */
const PaginationDemoShowcase = () => {
  // Basic pagination state
  const [basicData, setBasicData] = useState<PaginationData>({
    count: 150,
    next: "http://127.0.0.1:8000/api/v1/posts/?limit=20&offset=20",
    previous: null,
    results: [],
  });

  // Advanced pagination with search and filters
  const [advancedData, setAdvancedData] = useState<PaginationData>({
    count: 500,
    next: "http://127.0.0.1:8000/api/v1/products/?limit=10&offset=10",
    previous: null,
    results: [],
  });

  // Large dataset pagination
  const [largeData, setLargeData] = useState<PaginationData>({
    count: 10000,
    next: "http://127.0.0.1:8000/api/v1/items/?limit=50&offset=50",
    previous: null,
    results: [],
  });

  // State for search and filters
  const [searchValues, setSearchValues] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("date_desc");

  // Mock URL params (in real app, would come from useSearchParams)
  const [basicOffset, setBasicOffset] = useState("0");
  const [advancedOffset, setAdvancedOffset] = useState("0");
  const [largeOffset, setLargeOffset] = useState("0");

  // Sample data for demonstration
  const [samplePosts, setSamplePosts] = useState([
    { id: 1, title: "Getting Started with React", category: "tech", status: "published", date: "2024-01-15" },
    { id: 2, title: "Advanced CSS Techniques", category: "design", status: "draft", date: "2024-01-14" },
    { id: 3, title: "Business Strategy 101", category: "business", status: "published", date: "2024-01-13" },
    { id: 4, title: "UI/UX Best Practices", category: "design", status: "published", date: "2024-01-12" },
    { id: 5, title: "Marketing Fundamentals", category: "business", status: "review", date: "2024-01-11" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Handle search
  const handleSearch = (value: string) => {
    setSearchValues(value);
    setAdvancedOffset("0"); // Reset to first page
    openToast(`Searching for: "${value}"`);
  };

  // Handle filter changes
  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    setAdvancedOffset("0");
    openToast(`Filtered by category: ${value || 'All'}`);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setAdvancedOffset("0");
    openToast(`Filtered by status: ${value || 'All'}`);
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
    openToast(`Sorted by: ${value}`);
  };

  // Mock data generation for different scenarios
  const generateMockData = (page: number, limit: number, total: number) => {
    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, total);
    
    return Array.from({ length: endIndex - startIndex }, (_, i) => ({
      id: startIndex + i + 1,
      title: `Item ${startIndex + i + 1}`,
      description: `Description for item ${startIndex + i + 1}`,
      category: ['tech', 'design', 'business'][Math.floor(Math.random() * 3)],
      status: ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)],
    }));
  };

  // Simulate API call for pagination
  const simulateApiCall = (offset: number, limit: number, totalCount: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const hasNext = offset + limit < totalCount;
        const hasPrevious = offset > 0;
        
        resolve({
          count: totalCount,
          next: hasNext ? `http://api.example.com/?limit=${limit}&offset=${offset + limit}` : null,
          previous: hasPrevious ? `http://api.example.com/?limit=${limit}&offset=${Math.max(0, offset - limit)}` : null,
          results: generateMockData(Math.floor(offset / limit) + 1, limit, totalCount)
        });
      }, 500);
    });
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>Comprehensive Pagination Examples</h1>
      <p className="ihub-mb-4">
        Advanced pagination component with API integration, search capabilities,
        filtering, and various configuration options for different use cases.
      </p>

      {/* Basic Pagination Example */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Basic Pagination</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Simple Post Listing</h3>
            <p className="ihub-text-muted">Basic pagination with default settings</p>
          </div>
          
          <div className="ihub-card-body">
            {/* Current State Info */}
            <div className="ihub-info-panel ihub-mb-3">
              <div className="ihub-d-flex ihub-justify-content-between">
                <div>
                  <strong>Current Offset:</strong> {basicOffset}
                </div>
                <div>
                  <strong>Total Items:</strong> {basicData.count}
                </div>
                <div>
                  <strong>Items Per Page:</strong> 20
                </div>
              </div>
            </div>

            {/* Mock content list */}
            <div className="ihub-content-list ihub-mb-3">
              {samplePosts.slice(0, 3).map((post) => (
                <div key={post.id} className="ihub-content-item ihub-p-3 ihub-mb-2" style={{ border: "1px solid #e0e0e0", borderRadius: "6px" }}>
                  <h4>{post.title}</h4>
                  <div className="ihub-d-flex" style={{ gap: "10px", marginTop: "10px" }}>
                    <span className="ihub-badge ihub-badge-primary">{post.category}</span>
                    <span className={`ihub-badge ${
                      post.status === 'published' ? 'ihub-badge-success' :
                      post.status === 'draft' ? 'ihub-badge-warning' :
                      'ihub-badge-secondary'
                    }`}>{post.status}</span>
                    <span className="ihub-text-muted">{post.date}</span>
                  </div>
                </div>
              ))}
              <div className="ihub-text-center ihub-text-muted ihub-py-2">
                ... and {basicData.count - 3} more items
              </div>
            </div>

            {/* Basic Pagination Component */}
            <Pagination
              offset={basicOffset}
              data={basicData}
              limit={20}
              urlPath="/api/v1/posts/"
              setData={setBasicData}
              token="demo-token"
              rangeLimit={5}
              showFirstLast={true}
              className="ihub-pagination-basic"
            />
          </div>
        </div>
      </section>

      {/* Advanced Pagination with Search and Filters */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Advanced Pagination with Search & Filters</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Product Catalog</h3>
            <p className="ihub-text-muted">Pagination with search, filtering, and sorting</p>
          </div>
          
          <div className="ihub-card-body">
            {/* Search and Filter Controls */}
            <div className="ihub-filters-panel ihub-mb-4">
              <div className="ihub-row">
                <div className="ihub-col-md-3">
                  <label className="ihub-form-label">Search Products</label>
                  <input
                    type="text"
                    className="ihub-input"
                    placeholder="Search by name..."
                    value={searchValues}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
                
                <div className="ihub-col-md-3">
                  <label className="ihub-form-label">Category</label>
                  <select
                    className="ihub-input"
                    value={categoryFilter}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    <option value="tech">Technology</option>
                    <option value="design">Design</option>
                    <option value="business">Business</option>
                  </select>
                </div>
                
                <div className="ihub-col-md-3">
                  <label className="ihub-form-label">Status</label>
                  <select
                    className="ihub-input"
                    value={statusFilter}
                    onChange={(e) => handleStatusChange(e.target.value)}
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                
                <div className="ihub-col-md-3">
                  <label className="ihub-form-label">Sort By</label>
                  <select
                    className="ihub-input"
                    value={sortOrder}
                    onChange={(e) => handleSortChange(e.target.value)}
                  >
                    <option value="date_desc">Date (Newest)</option>
                    <option value="date_asc">Date (Oldest)</option>
                    <option value="name_asc">Name (A-Z)</option>
                    <option value="name_desc">Name (Z-A)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Filter Summary */}
            <div className="ihub-filter-summary ihub-mb-3">
              <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "10px", flexWrap: "wrap" }}>
                <span>Active Filters:</span>
                {searchValues && (
                  <span className="ihub-filter-tag">
                    Search: "{searchValues}"
                    <button onClick={() => handleSearch("")} className="ihub-filter-remove">×</button>
                  </span>
                )}
                {categoryFilter && (
                  <span className="ihub-filter-tag">
                    Category: {categoryFilter}
                    <button onClick={() => handleCategoryChange("")} className="ihub-filter-remove">×</button>
                  </span>
                )}
                {statusFilter && (
                  <span className="ihub-filter-tag">
                    Status: {statusFilter}
                    <button onClick={() => handleStatusChange("")} className="ihub-filter-remove">×</button>
                  </span>
                )}
                {!searchValues && !categoryFilter && !statusFilter && (
                  <span className="ihub-text-muted">None</span>
                )}
              </div>
            </div>

            {/* Current State Info */}
            <div className="ihub-info-panel ihub-mb-3">
              <div className="ihub-row">
                <div className="ihub-col-md-3">
                  <strong>Offset:</strong> {advancedOffset}
                </div>
                <div className="ihub-col-md-3">
                  <strong>Search:</strong> "{searchValues || 'None'}"
                </div>
                <div className="ihub-col-md-3">
                  <strong>Category:</strong> {categoryFilter || 'All'}
                </div>
                <div className="ihub-col-md-3">
                  <strong>Total:</strong> {advancedData.count}
                </div>
              </div>
            </div>

            {/* Advanced Pagination Component */}
            <Pagination
              offset={advancedOffset}
              data={advancedData}
              limit={10}
              urlPath="/api/v1/products/"
              setData={setAdvancedData}
              token="demo-token"
              searchValues={searchValues}
              tabsValues={categoryFilter}
              rangeLimit={7}
              showFirstLast={true}
              className="ihub-pagination-advanced"
            />
          </div>
        </div>
      </section>

      {/* Large Dataset Pagination */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Large Dataset Pagination</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Big Data Handling</h3>
            <p className="ihub-text-muted">Optimized pagination for large datasets (10,000+ items)</p>
          </div>
          
          <div className="ihub-card-body">
            {/* Performance metrics */}
            <div className="ihub-performance-panel ihub-mb-3">
              <div className="ihub-row">
                <div className="ihub-col-md-4">
                  <div className="ihub-metric">
                    <div className="ihub-metric-value">{largeData.count.toLocaleString()}</div>
                    <div className="ihub-metric-label">Total Records</div>
                  </div>
                </div>
                <div className="ihub-col-md-4">
                  <div className="ihub-metric">
                    <div className="ihub-metric-value">50</div>
                    <div className="ihub-metric-label">Items Per Page</div>
                  </div>
                </div>
                <div className="ihub-col-md-4">
                  <div className="ihub-metric">
                    <div className="ihub-metric-value">{Math.ceil(largeData.count / 50)}</div>
                    <div className="ihub-metric-label">Total Pages</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Current position indicator */}
            <div className="ihub-position-indicator ihub-mb-3">
              <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                <div>
                  <strong>Current Position:</strong> Page {Math.floor(Number(largeOffset) / 50) + 1} of {Math.ceil(largeData.count / 50)}
                </div>
                <div>
                  <strong>Progress:</strong> {((Number(largeOffset) / largeData.count) * 100).toFixed(2)}%
                </div>
              </div>
              <div className="ihub-progress-bar ihub-mt-2">
                <div 
                  className="ihub-progress-fill" 
                  style={{ width: `${(Number(largeOffset) / largeData.count) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Large Dataset Pagination Component */}
            <Pagination
              offset={largeOffset}
              data={largeData}
              limit={50}
              urlPath="/api/v1/items/"
              setData={setLargeData}
              token="demo-token"
              rangeLimit={10}
              showFirstLast={true}
              className="ihub-pagination-large"
            />
          </div>
        </div>
      </section>

      {/* Custom Pagination Controls */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Custom Pagination Controls</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Manual Navigation</h3>
            <p className="ihub-text-muted">Direct page navigation and custom controls</p>
          </div>
          
          <div className="ihub-card-body">
            {/* Manual page input */}
            <div className="ihub-manual-nav ihub-mb-4">
              <div className="ihub-row ihub-align-items-end">
                <div className="ihub-col-md-3">
                  <label className="ihub-form-label">Go to Page</label>
                  <input
                    type="number"
                    className="ihub-input"
                    min="1"
                    max={Math.ceil(basicData.count / 20)}
                    value={Math.floor(Number(basicOffset) / 20) + 1}
                    onChange={(e) => {
                      const page = Math.max(1, Math.min(Number(e.target.value), Math.ceil(basicData.count / 20)));
                      setBasicOffset(((page - 1) * 20).toString());
                    }}
                  />
                </div>
                
                <div className="ihub-col-md-3">
                  <label className="ihub-form-label">Items Per Page</label>
                  <select
                    className="ihub-input"
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      openToast(`Items per page changed to ${e.target.value}`);
                    }}
                  >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                    <option value={50}>50 per page</option>
                    <option value={100}>100 per page</option>
                  </select>
                </div>
                
                <div className="ihub-col-md-6">
                  <div className="ihub-d-flex" style={{ gap: "10px" }}>
                    <button 
                      className="ihub-outlined-btn"
                      onClick={() => {
                        setBasicOffset("0");
                        openToast("Jumped to first page");
                      }}
                    >
                      First Page
                    </button>
                    <button 
                      className="ihub-outlined-btn"
                      onClick={() => {
                        const lastPage = Math.ceil(basicData.count / 20) - 1;
                        setBasicOffset((lastPage * 20).toString());
                        openToast("Jumped to last page");
                      }}
                    >
                      Last Page
                    </button>
                    <button 
                      className="ihub-primary-btn"
                      onClick={() => {
                        const randomPage = Math.floor(Math.random() * Math.ceil(basicData.count / 20));
                        setBasicOffset((randomPage * 20).toString());
                        openToast(`Jumped to random page ${randomPage + 1}`);
                      }}
                    >
                      Random Page
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Keyboard shortcuts info */}
            <div className="ihub-shortcuts-panel ihub-mb-3">
              <h4>Keyboard Shortcuts</h4>
              <div className="ihub-row">
                <div className="ihub-col-md-6">
                  <ul>
                    <li><kbd>←</kbd> Previous page</li>
                    <li><kbd>→</kbd> Next page</li>
                    <li><kbd>Home</kbd> First page</li>
                  </ul>
                </div>
                <div className="ihub-col-md-6">
                  <ul>
                    <li><kbd>End</kbd> Last page</li>
                    <li><kbd>Page Up</kbd> Jump back 10 pages</li>
                    <li><kbd>Page Down</kbd> Jump forward 10 pages</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Configuration Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Pagination Configurations</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Compact Mode</h3>
              </div>
              <div className="ihub-card-body">
                <p>Minimal pagination for mobile or tight spaces:</p>
                <Pagination
                  offset="0"
                  data={{ count: 100, next: null, previous: null, results: [] }}
                  limit={20}
                  urlPath="/api/compact/"
                  setData={() => {}}
                  rangeLimit={3}
                  showFirstLast={false}
                  className="ihub-pagination-compact"
                />
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Extended Range</h3>
              </div>
              <div className="ihub-card-body">
                <p>More page numbers visible for desktop:</p>
                <Pagination
                  offset="40"
                  data={{ count: 500, next: "?offset=60", previous: "?offset=20", results: [] }}
                  limit={20}
                  urlPath="/api/extended/"
                  setData={() => {}}
                  rangeLimit={10}
                  showFirstLast={true}
                  className="ihub-pagination-extended"
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
{`interface PaginationProps {
  data: PaginationData;              // API response with count, next, previous
  limit: number;                     // Items per page
  urlPath: string;                   // API endpoint base URL
  setData: (data: PaginationData) => void;
  token?: string | null;             // Authentication token
  tabsValues?: string;               // Filter parameter
  searchValues?: string;             // Search parameter
  rangeLimit?: number;               // Number of page buttons to show
  className?: string;                // Additional CSS classes
  showFirstLast?: boolean;           // Show first/last buttons
}`}
          </pre>
          
          <h3 className="ihub-mt-3">Key Features:</h3>
          <ul>
            <li><strong>API Integration:</strong> Automatic data fetching with URL parameters</li>
            <li><strong>Search & Filter:</strong> Built-in support for search and filter parameters</li>
            <li><strong>Responsive Design:</strong> Adapts to different screen sizes</li>
            <li><strong>Accessibility:</strong> Proper ARIA labels and keyboard navigation</li>
            <li><strong>Performance:</strong> Efficient rendering and state management</li>
            <li><strong>Customizable:</strong> Flexible configuration options</li>
          </ul>
          
          <h3 className="ihub-mt-3">Best Practices:</h3>
          <ul>
            <li>Use appropriate limit values (10-50 items per page)</li>
            <li>Implement loading states during API calls</li>
            <li>Handle error cases gracefully</li>
            <li>Consider mobile-first responsive design</li>
            <li>Provide clear feedback for user actions</li>
            <li>Optimize for large datasets with server-side pagination</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default PaginationDemoShowcase;
```

## 🔗 Related Components

- [Pagination](./Pagination.md) - The core pagination component demonstrated in examples
- [IHubTable](./IHubTable.md) - Table component that integrates with pagination
- [IHubTableServer](./IHubTableServer.md) - Server-side table component with built-in pagination
- [SearchField](./SearchField.md) - Search input component for filtering paginated data
- [FilterBy](./FilterBy.md) - Filter dropdown component for data filtering

## 🔗 Related Components

- [CustomTextEditor](./CustomTextEditor.md) - Custom text editor component
- [ContentViewer](./ContentViewer.md) - Content viewer component
- [ContentViewOrEdit](./ContentViewOrEdit.md) - Content view or edit component
- [CodeDisplay](./CodeDisplay.md) - Code display component
- [IHubTable](./IHubTable.md) - InstinctHub table component

