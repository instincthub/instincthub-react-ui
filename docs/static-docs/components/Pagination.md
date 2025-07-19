# Pagination

**Category:** UI | **Type:** component

Enhanced Pagination Component with API Integration - Handles pagination, search, and filtering with automatic API calls for seamless data navigation.

## 🏷️ Tags

`ui`, `pagination`, `navigation`, `api-integration`

```tsx
"use client";
import React, { useState, useEffect } from "react";
import { Pagination } from "@instincthub/react-ui";
import { IHubTable, SubmitButton, InputText } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive examples demonstrating various ways to use the Pagination component
 */
const PaginationExamples = () => {
  // Basic pagination state
  const [basicData, setBasicData] = useState<any>({
    count: 100,
    next: null,
    previous: null,
    results: []
  });

  // Table pagination state
  const [tableData, setTableData] = useState<any>({
    count: 0,
    next: null,
    previous: null,
    results: []
  });

  // Search pagination state
  const [searchData, setSearchData] = useState<any>({
    count: 0,
    next: null,
    previous: null,
    results: []
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Gallery pagination state
  const [galleryData, setGalleryData] = useState<any>({
    count: 0,
    next: null,
    previous: null,
    results: []
  });

  // Dynamic page size state
  const [dynamicData, setDynamicData] = useState<any>({
    count: 0,
    next: null,
    previous: null,
    results: []
  });
  const [pageSize, setPageSize] = useState(10);

  // Tab filter state
  const [tabData, setTabData] = useState<any>({
    count: 0,
    next: null,
    previous: null,
    results: []
  });
  const [activeTab, setActiveTab] = useState("all");

  // Mock data generator
  const generateMockData = (page: number, limit: number, total: number) => {
    const offset = page * limit;
    const results = Array.from({ length: limit }, (_, i) => ({
      id: offset + i + 1,
      name: `Item ${offset + i + 1}`,
      email: `user${offset + i + 1}@example.com`,
      status: i % 2 === 0 ? "Active" : "Inactive",
      date: new Date(Date.now() - Math.random() * 10000000000).toISOString()
    }));

    return {
      count: total,
      next: offset + limit < total ? `?offset=${offset + limit}` : null,
      previous: offset > 0 ? `?offset=${Math.max(0, offset - limit)}` : null,
      results
    };
  };

  // Simulate API response for basic example
  useEffect(() => {
    // Mock initial data load
    setTimeout(() => {
      setBasicData(generateMockData(0, 10, 100));
    }, 500);
  }, []);

  // Example 1: Basic Pagination
  const BasicPaginationExample = () => (
    <div className="ihub-card ihub-p-4 ihub-mb-5">
      <h3 className="ihub-mb-3">Basic Pagination</h3>
      <p className="ihub-text-muted ihub-mb-4">
        Simple pagination with default settings and mock data
      </p>
      
      <div className="ihub-mb-4">
        <p>Total items: {basicData.count}</p>
      </div>

      <Pagination
        data={basicData}
        limit={10}
        urlPath="/api/items"
        setData={setBasicData}
        showFirstLast={true}
      />
    </div>
  );

  // Example 2: Table with Pagination
  const TablePaginationExample = () => {
    const tableColumns = [
      { header: "ID", accessor: "id" },
      { header: "Name", accessor: "name" },
      { header: "Email", accessor: "email" },
      { header: "Status", accessor: "status" },
      { 
        header: "Date", 
        accessor: "date",
        Cell: ({ value }: any) => new Date(value).toLocaleDateString()
      }
    ];

    useEffect(() => {
      // Mock table data
      setTableData(generateMockData(0, 15, 150));
    }, []);

    return (
      <div className="ihub-card ihub-p-4 ihub-mb-5">
        <h3 className="ihub-mb-3">Table with Pagination</h3>
        <p className="ihub-text-muted ihub-mb-4">
          Data table with integrated pagination controls
        </p>

        <IHubTable
          columns={tableColumns}
          data={tableData.results}
          className="ihub-mb-4"
        />

        <Pagination
          data={tableData}
          limit={15}
          urlPath="/api/users"
          setData={setTableData}
          className="ihub-table-pagination"
        />
      </div>
    );
  };

  // Example 3: Search Results with Pagination
  const SearchPaginationExample = () => {
    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      // Simulate search
      const filtered = generateMockData(0, 20, 85);
      filtered.results = filtered.results.filter(() => Math.random() > 0.3);
      setSearchData(filtered);
      openToast(`Searching for: ${searchTerm}`, "info");
    };

    return (
      <div className="ihub-card ihub-p-4 ihub-mb-5">
        <h3 className="ihub-mb-3">Search Results with Pagination</h3>
        <p className="ihub-text-muted ihub-mb-4">
          Search functionality with paginated results
        </p>

        <form onSubmit={handleSearch} className="ihub-mb-4">
          <div className="ihub-d-flex ihub-gap-3">
            <InputText
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ihub-flex-grow-1"
            />
            <SubmitButton
              label="Search"
              type="submit"
              status={1}
            />
          </div>
        </form>

        {searchData.results.length > 0 && (
          <>
            <div className="ihub-search-results ihub-mb-4">
              <p className="ihub-mb-3">Found {searchData.count} results</p>
              <ul className="ihub-list-unstyled">
                {searchData.results.map((item: any) => (
                  <li key={item.id} className="ihub-border-bottom ihub-pb-2 ihub-mb-2">
                    <strong>{item.name}</strong> - {item.email}
                  </li>
                ))}
              </ul>
            </div>

            <Pagination
              data={searchData}
              limit={20}
              urlPath="/api/search"
              setData={setSearchData}
              searchValues={searchTerm}
              rangeLimit={7}
            />
          </>
        )}
      </div>
    );
  };

  // Example 4: Gallery/Grid with Pagination
  const GalleryPaginationExample = () => {
    useEffect(() => {
      // Mock gallery data
      const galleryItems = generateMockData(0, 12, 96);
      galleryItems.results = galleryItems.results.map((item: any) => ({
        ...item,
        image: `https://via.placeholder.com/300x200?text=Image+${item.id}`
      }));
      setGalleryData(galleryItems);
    }, []);

    return (
      <div className="ihub-card ihub-p-4 ihub-mb-5">
        <h3 className="ihub-mb-3">Gallery with Pagination</h3>
        <p className="ihub-text-muted ihub-mb-4">
          Image gallery layout with pagination controls
        </p>

        <div className="ihub-gallery-grid ihub-mb-4">
          <div className="ihub-row">
            {galleryData.results.map((item: any) => (
              <div key={item.id} className="ihub-col-md-3 ihub-col-sm-6 ihub-mb-3">
                <div className="ihub-gallery-item">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="ihub-img-fluid ihub-rounded"
                  />
                  <p className="ihub-text-center ihub-mt-2">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Pagination
          data={galleryData}
          limit={12}
          urlPath="/api/gallery"
          setData={setGalleryData}
          className="ihub-gallery-pagination"
          showFirstLast={false}
        />
      </div>
    );
  };

  // Example 5: Dynamic Page Size
  const DynamicPageSizeExample = () => {
    useEffect(() => {
      setDynamicData(generateMockData(0, pageSize, 200));
    }, [pageSize]);

    return (
      <div className="ihub-card ihub-p-4 ihub-mb-5">
        <h3 className="ihub-mb-3">Dynamic Page Size</h3>
        <p className="ihub-text-muted ihub-mb-4">
          Allow users to change the number of items per page
        </p>

        <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center ihub-mb-4">
          <div>
            <label htmlFor="pageSize" className="ihub-me-2">Items per page:</label>
            <select 
              id="pageSize"
              value={pageSize} 
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="ihub-form-select ihub-form-select-sm"
              style={{ width: 'auto', display: 'inline-block' }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <span>Total: {dynamicData.count} items</span>
        </div>

        <div className="ihub-table-responsive ihub-mb-4">
          <table className="ihub-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dynamicData.results.map((item: any) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <span className={`ihub-badge ${
                      item.status === 'Active' ? 'ihub-badge-success' : 'ihub-badge-secondary'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          data={dynamicData}
          limit={pageSize}
          urlPath="/api/dynamic"
          setData={setDynamicData}
          rangeLimit={5}
        />
      </div>
    );
  };

  // Example 6: Tabs with Pagination
  const TabsPaginationExample = () => {
    const tabs = [
      { value: "all", label: "All Items", count: 150 },
      { value: "active", label: "Active", count: 89 },
      { value: "inactive", label: "Inactive", count: 61 }
    ];

    useEffect(() => {
      // Mock data based on active tab
      const count = tabs.find(t => t.value === activeTab)?.count || 150;
      setTabData(generateMockData(0, 10, count));
    }, [activeTab]);

    return (
      <div className="ihub-card ihub-p-4 ihub-mb-5">
        <h3 className="ihub-mb-3">Tabs with Pagination</h3>
        <p className="ihub-text-muted ihub-mb-4">
          Filter data by tabs with separate pagination for each tab
        </p>

        <div className="ihub-tabs ihub-mb-4">
          <ul className="ihub-nav ihub-nav-tabs">
            {tabs.map((tab) => (
              <li key={tab.value} className="ihub-nav-item">
                <button
                  className={`ihub-nav-link ${activeTab === tab.value ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.value)}
                >
                  {tab.label} ({tab.count})
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="ihub-tab-content ihub-mb-4">
          <ul className="ihub-list-group">
            {tabData.results.map((item: any) => (
              <li key={item.id} className="ihub-list-group-item">
                <div className="ihub-d-flex ihub-justify-content-between">
                  <span>{item.name}</span>
                  <span className={`ihub-badge ${
                    item.status === 'Active' ? 'ihub-badge-success' : 'ihub-badge-secondary'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Pagination
          data={tabData}
          limit={10}
          urlPath="/api/filtered"
          setData={setTabData}
          tabsValues={activeTab}
          className="ihub-tabs-pagination"
        />
      </div>
    );
  };

  // API Integration Example
  const APIIntegrationExample = () => (
    <div className="ihub-card ihub-p-4 ihub-mb-5">
      <h3 className="ihub-mb-3">API Integration Example</h3>
      <p className="ihub-text-muted ihub-mb-4">
        Real-world example with authentication and API endpoints
      </p>

      <pre className="ihub-code-block ihub-p-3 ihub-bg-light ihub-rounded">
{`// Example with real API integration
const ProductList = () => {
  const [products, setProducts] = useState({
    count: 0,
    next: null,
    previous: null,
    results: []
  });
  const [searchQuery, setSearchQuery] = useState("");
  const token = useAuth().token; // Your auth token

  return (
    <>
      <ProductGrid products={products.results} />
      
      <Pagination
        data={products}
        limit={24}
        urlPath="https://api.example.com/products"
        setData={setProducts}
        token={token}
        searchValues={searchQuery}
        rangeLimit={7}
        className="ihub-mt-4"
      />
    </>
  );
};`}
      </pre>
    </div>
  );

  return (
    <div className="ihub-container ihub-mt-5">
      <h1 className="ihub-mb-4">Pagination Examples</h1>
      <p className="ihub-lead ihub-mb-5">
        The Pagination component provides a flexible and feature-rich way to navigate through large datasets.
        It supports API integration, search, filtering, and various customization options.
      </p>

      <BasicPaginationExample />
      <TablePaginationExample />
      <SearchPaginationExample />
      <GalleryPaginationExample />
      <DynamicPageSizeExample />
      <TabsPaginationExample />
      <APIIntegrationExample />

      {/* Props Documentation */}
      <div className="ihub-card ihub-p-4 ihub-mb-5">
        <h3 className="ihub-mb-3">Component Props</h3>
        <div className="ihub-table-responsive">
          <table className="ihub-table">
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
                <td><code>data</code></td>
                <td><code>PaginationData</code></td>
                <td>Required</td>
                <td>Pagination data from API (count, next, previous, results)</td>
              </tr>
              <tr>
                <td><code>limit</code></td>
                <td><code>number</code></td>
                <td>Required</td>
                <td>Number of items per page</td>
              </tr>
              <tr>
                <td><code>urlPath</code></td>
                <td><code>string</code></td>
                <td>Required</td>
                <td>API endpoint URL for fetching data</td>
              </tr>
              <tr>
                <td><code>setData</code></td>
                <td><code>function</code></td>
                <td>Required</td>
                <td>State setter function for updating data</td>
              </tr>
              <tr>
                <td><code>token</code></td>
                <td><code>string | null</code></td>
                <td><code>null</code></td>
                <td>Authentication token for API requests</td>
              </tr>
              <tr>
                <td><code>tabsValues</code></td>
                <td><code>string</code></td>
                <td><code>""</code></td>
                <td>Current tab filter value</td>
              </tr>
              <tr>
                <td><code>searchValues</code></td>
                <td><code>string</code></td>
                <td><code>""</code></td>
                <td>Current search query</td>
              </tr>
              <tr>
                <td><code>rangeLimit</code></td>
                <td><code>number</code></td>
                <td><code>5</code></td>
                <td>Maximum number of page buttons to display</td>
              </tr>
              <tr>
                <td><code>className</code></td>
                <td><code>string</code></td>
                <td><code>""</code></td>
                <td>Additional CSS classes</td>
              </tr>
              <tr>
                <td><code>showFirstLast</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Show first/last navigation buttons</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Styling Guide */}
      <div className="ihub-card ihub-p-4">
        <h3 className="ihub-mb-3">Styling Guide</h3>
        <p>The Pagination component uses the following CSS classes for styling:</p>
        <ul>
          <li><code>.ihub-pagination-container</code> - Main container</li>
          <li><code>.ihub-pagination-list</code> - Pagination items list</li>
          <li><code>.ihub-pagination-item</code> - Individual page item</li>
          <li><code>.ihub-pagination-link</code> - Clickable page links</li>
          <li><code>.ihub-pagination-active</code> - Active page state</li>
          <li><code>.ihub-pagination-disabled</code> - Disabled navigation state</li>
          <li><code>.ihub-pagination-info</code> - Results summary text</li>
          <li><code>.ihub-pagination-loading</code> - Loading state indicator</li>
        </ul>
      </div>
    </div>
  );
};

export default PaginationExamples;
```

## 🔗 Related Components

- [IHubTable](./IHubTable.md) - InstinctHub table component with built-in pagination support
- [IHubTableServer](./IHubTableServer.md) - Server-side table with pagination
- [SearchObjectsFromDB](./SearchObjectsFromDB.md) - Search component with pagination
- [InputText](./InputText.md) - Text input for search functionality
- [Tabs](./Tabs.md) - Tab component for filtered views

