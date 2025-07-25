# URL Query Parameter Management

**Category:** Library | **Type:** URL manipulation utilities

Comprehensive URL query parameter management system for client-side navigation, filtering, pagination, and state management. Provides type-safe parameter manipulation with InstinctHub-specific helpers for course filtering and pagination.

## 📁 File Location

`src/components/lib/queryParameters/index.ts`

## 🏷️ Tags

`url`, `query-parameters`, `navigation`, `filtering`, `pagination`, `state-management`, `browser-history`, `search`

## 📖 Usage Examples

### Example 1: Complete URL Parameter Management System

```tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  urlQueryHelper,
  getQueryParams,
  getQueryParam,
  hasQueryParam,
  buildUrl,
  navigateWithQuery,
  buildDataFilterUrl,
  buildPaginationUrl,
  cleanUrl
} from "@instincthub/react-ui/lib";

/**
 * Complete URL parameter management showcase with filtering and pagination
 */
const URLParameterManager = () => {
  const [currentParams, setCurrentParams] = useState<any>({});
  const [urlHistory, setUrlHistory] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    subject: "",
    level: "",
    instructor: "",
    search: "",
    sort: "name"
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Update current params from URL
  useEffect(() => {
    const updateParams = () => {
      const params = getQueryParams();
      setCurrentParams(params);
      
      // Update local state from URL
      setFilters({
        subject: getQueryParam("subject") || "",
        level: getQueryParam("level") || "",
        instructor: getQueryParam("instructor") || "",
        search: getQueryParam("search") || "",
        sort: getQueryParam("sort") || "name"
      });
      
      const page = getQueryParam("page");
      setCurrentPage(page ? parseInt(page) : 1);
    };

    updateParams();
    
    // Listen for URL changes (back/forward navigation)
    const handlePopState = () => {
      updateParams();
    };
    
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Add URL to history
  const addToHistory = (url: string) => {
    setUrlHistory(prev => [url, ...prev.slice(0, 9)]);
  };

  // Demo: Basic Parameter Operations
  const handleBasicOperation = (action: string) => {
    let newUrl = "";
    
    switch (action) {
      case "add":
        newUrl = urlQueryHelper({
          key: "demo",
          value: `value-${Date.now()}`,
          action: "add"
        });
        break;
        
      case "update":
        newUrl = urlQueryHelper({
          key: "demo",
          value: `updated-${Date.now()}`,
          action: "update"
        });
        break;
        
      case "remove":
        newUrl = urlQueryHelper({
          key: "demo",
          value: "",
          action: "remove"
        });
        break;
        
      case "toggle":
        newUrl = urlQueryHelper({
          key: "toggle",
          value: "active",
          action: "toggle"
        });
        break;
        
      case "clear":
        newUrl = urlQueryHelper({
          key: "",
          value: "",
          action: "clear"
        });
        break;
    }
    
    if (newUrl) {
      navigateWithQuery({
        key: action === "clear" ? "" : "demo",
        value: action === "clear" ? "" : `${action}-result`,
        action: action as any
      });
      addToHistory(newUrl);
    }
  };

  // Handle filter changes
  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Reset page when filters change
    const filtersWithPage = { ...newFilters, page: 1 };
    const newUrl = buildDataFilterUrl(filtersWithPage);
    
    window.history.pushState({}, "", newUrl);
    addToHistory(newUrl);
    setCurrentPage(1);
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const newUrl = buildPaginationUrl(page, true);
    
    window.history.pushState({}, "", newUrl);
    addToHistory(newUrl);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      subject: "",
      level: "",
      instructor: "",
      search: "",
      sort: "name"
    });
    setCurrentPage(1);
    
    const newUrl = window.location.pathname;
    window.history.pushState({}, "", newUrl);
    addToHistory(newUrl);
  };

  // Clean current URL
  const handleCleanUrl = () => {
    const cleaned = cleanUrl();
    window.history.replaceState({}, "", cleaned);
    addToHistory(cleaned);
  };

  // Sample data for demonstration
  const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"];
  const levels = ["100", "200", "300", "400", "500"];
  const instructors = ["Dr. Smith", "Prof. Johnson", "Dr. Williams", "Prof. Brown"];
  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "date", label: "Date" },
    { value: "rating", label: "Rating" },
    { value: "popularity", label: "Popularity" }
  ];

  return (
    <div className="ihub-container ihub-py-5">
      <h1>URL Parameter Management</h1>
      
      {/* Current URL Display */}
      <section className="ihub-mb-4">
        <div className="ihub-card ihub-p-4">
          <h5>Current URL</h5>
          <div className="ihub-bg-light ihub-p-3 ihub-rounded">
            <code style={{ fontSize: "12px", wordBreak: "break-all" }}>
              {typeof window !== "undefined" ? window.location.href : "Server-side rendering"}
            </code>
          </div>
          <div className="ihub-mt-3">
            <button
              className="ihub-btn ihub-btn-outline-secondary ihub-btn-sm"
              onClick={handleCleanUrl}
            >
              <i className="pi pi-eraser ihub-me-1"></i>
              Clean URL
            </button>
          </div>
        </div>
      </section>

      {/* Basic Operations */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Basic Parameter Operations</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-row">
            <div className="ihub-col-md-8">
              <h6>Parameter Actions</h6>
              <div className="ihub-d-flex ihub-flex-wrap ihub-gap-2">
                <button
                  className="ihub-btn ihub-btn-primary ihub-btn-sm"
                  onClick={() => handleBasicOperation("add")}
                >
                  Add Parameter
                </button>
                <button
                  className="ihub-btn ihub-btn-info ihub-btn-sm"
                  onClick={() => handleBasicOperation("update")}
                >
                  Update Parameter
                </button>
                <button
                  className="ihub-btn ihub-btn-warning ihub-btn-sm"
                  onClick={() => handleBasicOperation("remove")}
                >
                  Remove Parameter
                </button>
                <button
                  className="ihub-btn ihub-btn-secondary ihub-btn-sm"
                  onClick={() => handleBasicOperation("toggle")}
                >
                  Toggle Parameter
                </button>
                <button
                  className="ihub-btn ihub-btn-danger ihub-btn-sm"
                  onClick={() => handleBasicOperation("clear")}
                >
                  Clear All
                </button>
              </div>
            </div>
            
            <div className="ihub-col-md-4">
              <h6>Parameter Status</h6>
              <div className="ihub-mb-2">
                <strong>Has Demo:</strong>
                <span className={`ihub-badge ihub-ms-1 ${
                  hasQueryParam("demo") ? "ihub-badge-success" : "ihub-badge-secondary"
                }`}>
                  {hasQueryParam("demo") ? "Yes" : "No"}
                </span>
              </div>
              <div className="ihub-mb-2">
                <strong>Toggle Active:</strong>
                <span className={`ihub-badge ihub-ms-1 ${
                  hasQueryParam("toggle") ? "ihub-badge-primary" : "ihub-badge-light"
                }`}>
                  {hasQueryParam("toggle") ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Filtering System */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Course Filtering System</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-row">
            <div className="ihub-col-md-3 ihub-mb-3">
              <label className="ihub-form-label">Subject</label>
              <select
                className="ihub-form-control"
                value={filters.subject}
                onChange={(e) => handleFilterChange("subject", e.target.value)}
              >
                <option value="">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="ihub-col-md-3 ihub-mb-3">
              <label className="ihub-form-label">Level</label>
              <select
                className="ihub-form-control"
                value={filters.level}
                onChange={(e) => handleFilterChange("level", e.target.value)}
              >
                <option value="">All Levels</option>
                {levels.map(level => (
                  <option key={level} value={level}>
                    Level {level}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="ihub-col-md-3 ihub-mb-3">
              <label className="ihub-form-label">Instructor</label>
              <select
                className="ihub-form-control"
                value={filters.instructor}
                onChange={(e) => handleFilterChange("instructor", e.target.value)}
              >
                <option value="">All Instructors</option>
                {instructors.map(instructor => (
                  <option key={instructor} value={instructor}>
                    {instructor}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="ihub-col-md-3 ihub-mb-3">
              <label className="ihub-form-label">Sort By</label>
              <select
                className="ihub-form-control"
                value={filters.sort}
                onChange={(e) => handleFilterChange("sort", e.target.value)}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="ihub-row">
            <div className="ihub-col-md-8 ihub-mb-3">
              <label className="ihub-form-label">Search</label>
              <input
                type="text"
                className="ihub-form-control"
                placeholder="Search courses..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>
            
            <div className="ihub-col-md-4 ihub-mb-3 ihub-d-flex ihub-align-items-end">
              <button
                className="ihub-btn ihub-btn-outline-secondary ihub-w-100"
                onClick={clearAllFilters}
              >
                <i className="pi pi-times ihub-me-1"></i>
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pagination */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Pagination</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-d-flex ihub-align-items-center ihub-justify-content-between">
            <div>
              <span>Page {currentPage} of 10</span>
            </div>
            
            <div className="ihub-d-flex ihub-gap-2">
              <button
                className="ihub-btn ihub-btn-outline-primary ihub-btn-sm"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1}
              >
                <i className="pi pi-chevron-left"></i>
                Previous
              </button>
              
              {[1, 2, 3, 4, 5].map(page => (
                <button
                  key={page}
                  className={`ihub-btn ihub-btn-sm ${
                    page === currentPage 
                      ? "ihub-btn-primary" 
                      : "ihub-btn-outline-primary"
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
              
              <button
                className="ihub-btn ihub-btn-outline-primary ihub-btn-sm"
                onClick={() => handlePageChange(Math.min(10, currentPage + 1))}
                disabled={currentPage >= 10}
              >
                Next
                <i className="pi pi-chevron-right ihub-ms-1"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Current Parameters Display */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Current Parameters</h2>
        <div className="ihub-card ihub-p-4">
          {Object.keys(currentParams).length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover ihub-mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Parameter</th>
                    <th>Value</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(currentParams).map(([key, value]) => (
                    <tr key={key}>
                      <td><code>{key}</code></td>
                      <td>
                        {Array.isArray(value) ? (
                          <div>
                            {value.map((v, i) => (
                              <span key={i} className="ihub-badge ihub-badge-light ihub-me-1">
                                {v}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="ihub-badge ihub-badge-primary">
                            {String(value)}
                          </span>
                        )}
                      </td>
                      <td>
                        <small className="text-muted">
                          {Array.isArray(value) ? "Array" : "String"}
                        </small>
                      </td>
                      <td>
                        <button
                          className="ihub-btn ihub-btn-outline-danger ihub-btn-sm"
                          onClick={() => {
                            navigateWithQuery({
                              key,
                              value: "",
                              action: "remove"
                            });
                          }}
                        >
                          <i className="pi pi-times"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="ihub-text-center text-muted">
              <i className="pi pi-info-circle ihub-me-2"></i>
              No query parameters in current URL
            </div>
          )}
        </div>
      </section>

      {/* URL History */}
      {urlHistory.length > 0 && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">URL History</h2>
          <div className="ihub-card ihub-p-4">
            <div style={{ maxHeight: "300px", overflow: "auto" }}>
              {urlHistory.map((url, index) => (
                <div key={index} className="ihub-mb-2 ihub-p-2 ihub-border-bottom">
                  <div className="ihub-d-flex ihub-align-items-center ihub-justify-content-between">
                    <code style={{ fontSize: "11px", wordBreak: "break-all" }}>
                      {url}
                    </code>
                    <small className="text-muted ihub-ms-2">
                      #{urlHistory.length - index}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Implementation Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Implementation Examples</h2>
        
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-code ihub-me-2"></i>
              Basic URL Parameter Operations
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Basic parameter manipulation
import { urlQueryHelper, navigateWithQuery, getQueryParam } from '@instincthub/react-ui/lib';

const ParameterExample = () => {
  // Add a parameter
  const addFilter = (key: string, value: string) => {
    navigateWithQuery({
      key,
      value,
      action: "add"
    });
  };

  // Update existing parameter
  const updateFilter = (key: string, value: string) => {
    navigateWithQuery({
      key,
      value,
      action: "update"
    });
  };

  // Remove parameter
  const removeFilter = (key: string) => {
    navigateWithQuery({
      key,
      value: "",
      action: "remove"
    });
  };

  // Toggle parameter (add if missing, remove if present)
  const toggleFilter = (key: string, value: string) => {
    navigateWithQuery({
      key,
      value,
      action: "toggle"
    });
  };

  // Get current parameter value
  const currentValue = getQueryParam("filter");

  return (
    <div>
      <button onClick={() => addFilter("category", "electronics")}>
        Add Category Filter
      </button>
      <button onClick={() => updateFilter("sort", "price")}>
        Update Sort
      </button>
      <button onClick={() => removeFilter("category")}>
        Remove Category
      </button>
      <button onClick={() => toggleFilter("featured", "true")}>
        Toggle Featured
      </button>
    </div>
  );
};`}
            </pre>
          </div>
        </div>

        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-filter ihub-me-2"></i>
              Advanced Filtering System
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Advanced filtering with state synchronization
import { 
  buildDataFilterUrl, 
  getQueryParams, 
  buildPaginationUrl 
} from '@instincthub/react-ui/lib';

const AdvancedFilteringSystem = () => {
  const [filters, setFilters] = useState({
    subject: "",
    level: "",
    instructor: "",
    search: "",
    sort: "name"
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Initialize from URL on component mount
  useEffect(() => {
    const params = getQueryParams();
    
    setFilters({
      subject: params.subject || "",
      level: params.level || "",
      instructor: params.instructor || "",
      search: params.search || "",
      sort: params.sort || "name"
    });
    
    setCurrentPage(parseInt(params.page as string) || 1);
  }, []);

  // Update URL when filters change
  const updateFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page
    
    const url = buildDataFilterUrl({
      ...newFilters,
      page: 1
    });
    
    window.history.pushState({}, "", url);
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const url = buildPaginationUrl(page, true);
    window.history.pushState({}, "", url);
  };

  // Filter change handler
  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    updateFilters({
      ...filters,
      [key]: value
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    updateFilters({
      subject: "",
      level: "",
      instructor: "",
      search: "",
      sort: "name"
    });
  };

  return (
    <div className="filtering-system">
      <div className="filters">
        <select 
          value={filters.subject}
          onChange={(e) => handleFilterChange("subject", e.target.value)}
        >
          <option value="">All Subjects</option>
          <option value="math">Mathematics</option>
          <option value="science">Science</option>
        </select>
        
        <input
          type="text"
          placeholder="Search..."
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
        
        <button onClick={clearAllFilters}>
          Clear Filters
        </button>
      </div>
      
      <div className="pagination">
        {[1, 2, 3, 4, 5].map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};`}
            </pre>
          </div>
        </div>

        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-cog ihub-me-2"></i>
              URL Building and Navigation
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// URL building and navigation utilities
import { 
  buildUrl, 
  getQueryParams, 
  hasQueryParam,
  cleanUrl 
} from '@instincthub/react-ui/lib';

const URLUtilities = () => {
  // Build URL from parameters
  const buildSearchUrl = (searchParams: Record<string, string>) => {
    return buildUrl("/search", searchParams);
  };

  // Check for specific parameters
  const checkUrlState = () => {
    const hasFilter = hasQueryParam("filter");
    const hasSort = hasQueryParam("sort");
    const currentParams = getQueryParams();
    
    console.log("Has filter:", hasFilter);
    console.log("Has sort:", hasSort);
    console.log("All params:", currentParams);
  };

  // Clean empty parameters
  const cleanCurrentUrl = () => {
    const cleaned = cleanUrl();
    window.history.replaceState({}, "", cleaned);
  };

  // Build complex URLs
  const buildComplexUrl = () => {
    const params = {
      category: "electronics",
      subcategory: ["phones", "tablets"],
      price_min: "100",
      price_max: "1000",
      sort: "price_asc",
      page: "1"
    };
    
    return buildUrl("/products", params);
  };

  // Navigation helpers
  const navigateToProduct = (productId: string, category: string) => {
    const url = buildUrl(\`/products/\${productId}\`, {
      category,
      ref: "search"
    });
    window.location.href = url;
  };

  const shareCurrentSearch = () => {
    const currentUrl = window.location.href;
    const shareableUrl = cleanUrl(currentUrl);
    
    navigator.clipboard.writeText(shareableUrl)
      .then(() => console.log("URL copied to clipboard"))
      .catch(err => console.error("Failed to copy URL:", err));
  };

  return (
    <div className="url-utilities">
      <button onClick={checkUrlState}>
        Check URL State
      </button>
      
      <button onClick={cleanCurrentUrl}>
        Clean URL
      </button>
      
      <button onClick={() => {
        const url = buildComplexUrl();
        console.log("Complex URL:", url);
      }}>
        Build Complex URL
      </button>
      
      <button onClick={() => navigateToProduct("123", "electronics")}>
        Navigate to Product
      </button>
      
      <button onClick={shareCurrentSearch}>
        Share Current Search
      </button>
    </div>
  );
};`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};

export default URLParameterManager;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import {
  urlQueryHelper,
  getQueryParams,
  getQueryParam,
  hasQueryParam,
  buildUrl,
  navigateWithQuery,
  buildDataFilterUrl,
  buildPaginationUrl,
  cleanUrl
} from '@instincthub/react-ui/lib';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { navigateWithQuery, getQueryParam } from '@instincthub/react-ui/lib';

function FilterButton() {
  const currentCategory = getQueryParam("category");

  const handleFilter = () => {
    navigateWithQuery({
      key: "category",
      value: "electronics",
      action: "update"
    });
  };

  return (
    <button onClick={handleFilter}>
      Filter by Electronics (Current: {currentCategory || "None"})
    </button>
  );
}
```

## 🔧 Function Reference

### Core URL Manipulation

#### `urlQueryHelper(context: QueryContextType, options?: UrlHelperOptions): string`
Main function for URL query parameter manipulation.

```tsx
interface QueryContextType {
  key: string;
  value: string | number;
  action: "add" | "update" | "remove" | "toggle" | "clear";
}

interface UrlHelperOptions {
  baseUrl?: string;          // Base URL (default: current URL)
  preserveHash?: boolean;    // Keep URL hash (default: true)
  encode?: boolean;          // URL encode values (default: true)
}
```

#### `navigateWithQuery(context: QueryContextType, options?: NavigationOptions): void`
Navigate to URL with updated parameters using History API.

```tsx
interface NavigationOptions extends UrlHelperOptions {
  replace?: boolean;         // Use replaceState instead of pushState
}
```

### Parameter Reading

#### `getQueryParams(url?: string): QueryParams`
Get all query parameters as an object.

#### `getQueryParam(key: string, url?: string): string | null`
Get specific parameter value.

#### `hasQueryParam(key: string, url?: string): boolean`
Check if parameter exists.

### URL Building

#### `buildUrl(basePath: string, params: QueryParams, options?: UrlHelperOptions): string`
Build URL from base path and parameters object.

#### `cleanUrl(url?: string): string`
Remove empty or null parameters from URL.

### InstinctHub-Specific Helpers

#### `buildDataFilterUrl(filters: CourseFilters): string`
Build URL with course filtering parameters.

```tsx
interface CourseFilters {
  subject?: string;
  level?: string;
  instructor?: string;
  search?: string;
  page?: number;
  sort?: string;
}
```

#### `buildPaginationUrl(page: number, preserveFilters?: boolean): string`
Build URL with pagination, optionally preserving existing filters.

## 💡 Use Cases

### Search and Filtering
- **Product Catalogs**: Filter by category, price, brand
- **Course Directories**: Filter by subject, level, instructor
- **Content Libraries**: Search and categorize content
- **User Management**: Filter users by role, status, location

### Navigation State
- **Breadcrumbs**: Maintain navigation context in URL
- **Deep Linking**: Share specific application states
- **Back/Forward**: Proper browser history support
- **Bookmarking**: Bookmark specific filtered views

### Pagination Systems
- **Large Datasets**: Paginate through search results
- **Infinite Scroll**: Track position in infinite scroll
- **Table Navigation**: Navigate through data tables
- **API Pagination**: Sync with backend pagination

### Analytics and Tracking
- **User Behavior**: Track user interaction patterns
- **A/B Testing**: Parameter-based feature flags
- **Campaign Tracking**: UTM parameter management
- **Referral Tracking**: Source attribution parameters

## 🎯 Advanced Features

### State Synchronization
- **URL-State Sync**: Keep URL in sync with component state
- **History Management**: Proper browser back/forward support
- **Deep Linking**: Direct links to specific application states
- **Shareable URLs**: Create shareable links with current state

### Multi-Value Parameters
- **Array Support**: Handle multiple values for same parameter
- **Complex Filters**: Multiple selection filters
- **Tag Systems**: Multiple tag selections
- **Category Hierarchies**: Nested category selections

### Error Handling
- **Invalid URLs**: Graceful handling of malformed URLs
- **Missing Parameters**: Default value handling
- **Type Safety**: TypeScript support for parameter types
- **Validation**: Parameter value validation

## 🌍 Browser Compatibility

### Modern Browsers
- **URL API**: Uses native URL and URLSearchParams APIs
- **History API**: Browser history manipulation
- **Clipboard API**: Copy URL functionality
- **Event Listeners**: popstate event handling

### Server-Side Rendering
- **SSR Safe**: Checks for window object availability
- **Fallback Values**: Provides fallbacks for server rendering
- **Hydration**: Proper client-side hydration support
- **Node.js Compatible**: Works in server environments

## 🔒 Security Considerations

### Input Validation
- **Parameter Sanitization**: Clean parameter values
- **URL Validation**: Validate URL structure
- **XSS Prevention**: Prevent script injection through URLs
- **Length Limits**: Respect URL length limitations

### Data Privacy
- **Sensitive Data**: Avoid sensitive data in URLs
- **Personal Information**: Don't expose PII in parameters
- **Session Data**: Use appropriate storage for session data
- **Logging**: Be careful with URL logging

## ⚠️ Important Notes

- **Browser Only**: Navigation functions require browser environment
- **URL Length**: Be aware of URL length limitations (~2048 characters)
- **Special Characters**: URL encoding handles special characters
- **Case Sensitivity**: Parameter names are case-sensitive
- **Array Notation**: Multiple values for same parameter create arrays

## 🔗 Related Utilities

- [helpFunction](./helpFunction.md) - Contains extractSubDomain for URL parsing
- [auth-actions](./auth-actions.md) - Uses URL parameters for authentication callbacks
- [forms](../forms/README.md) - Form components that use URL parameters for state
- [tables](../ui/tables/README.md) - Table components with URL-based filtering and pagination