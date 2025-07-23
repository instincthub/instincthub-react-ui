"use client";

import React, { useState, useEffect } from "react";
import { Pagination, IHubTable, SubmitButton, InputText } from "../../../../index";

const PaginationExample: React.FC = () => {
  // Basic pagination state
  const [basicData, setBasicData] = useState<any>({
    count: 150,
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

  // Loading states
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({
    basic: false,
    table: false,
    search: false,
    gallery: false,
    dynamic: false,
    tab: false
  });

  // Mock data generator
  const generateMockData = (page: number, limit: number, total: number, searchTerm?: string, filter?: string) => {
    const offset = page * limit;
    
    // Filter based on search term or tab filter
    let filteredTotal = total;
    if (searchTerm) {
      filteredTotal = Math.floor(total * 0.7); // Simulate search results
    }
    if (filter && filter !== "all") {
      filteredTotal = Math.floor(total * 0.6); // Simulate filtered results
    }

    const results = Array.from({ length: Math.min(limit, filteredTotal - offset) }, (_, i) => ({
      id: offset + i + 1,
      name: searchTerm ? `${searchTerm} Result ${offset + i + 1}` : `Item ${offset + i + 1}`,
      email: `user${offset + i + 1}@example.com`,
      status: i % 2 === 0 ? "Active" : "Inactive",
      role: filter !== "all" ? filter : (i % 3 === 0 ? "Admin" : i % 3 === 1 ? "User" : "Guest"),
      created: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
      image: `https://picsum.photos/200/200?random=${offset + i + 1}`,
      description: `Description for item ${offset + i + 1}`,
      category: ["Technology", "Design", "Marketing", "Sales"][i % 4]
    }));

    return {
      count: filteredTotal,
      next: offset + limit < filteredTotal ? `?page=${page + 2}` : null,
      previous: page > 0 ? `?page=${page}` : null,
      results
    };
  };

  // API call simulators
  const fetchBasicData = async (url: string) => {
    setIsLoading(prev => ({ ...prev, basic: true }));
    const page = url.includes('page=') ? parseInt(url.split('page=')[1]) - 1 : 0;
    
    // Simulate API delay
    setTimeout(() => {
      const data = generateMockData(page, 10, 150);
      setBasicData(data);
      setIsLoading(prev => ({ ...prev, basic: false }));
    }, 1000);
  };

  const fetchTableData = async (url: string) => {
    setIsLoading(prev => ({ ...prev, table: true }));
    const page = url.includes('page=') ? parseInt(url.split('page=')[1]) - 1 : 0;
    
    setTimeout(() => {
      const data = generateMockData(page, 5, 50);
      setTableData(data);
      setIsLoading(prev => ({ ...prev, table: false }));
    }, 800);
  };

  const fetchSearchData = async (url: string) => {
    setIsLoading(prev => ({ ...prev, search: true }));
    const page = url.includes('page=') ? parseInt(url.split('page=')[1]) - 1 : 0;
    
    setTimeout(() => {
      const data = generateMockData(page, 8, 100, searchTerm);
      setSearchData(data);
      setIsLoading(prev => ({ ...prev, search: false }));
    }, 1200);
  };

  const fetchGalleryData = async (url: string) => {
    setIsLoading(prev => ({ ...prev, gallery: true }));
    const page = url.includes('page=') ? parseInt(url.split('page=')[1]) - 1 : 0;
    
    setTimeout(() => {
      const data = generateMockData(page, 12, 72);
      setGalleryData(data);
      setIsLoading(prev => ({ ...prev, gallery: false }));
    }, 900);
  };

  const fetchDynamicData = async (url: string) => {
    setIsLoading(prev => ({ ...prev, dynamic: true }));
    const page = url.includes('page=') ? parseInt(url.split('page=')[1]) - 1 : 0;
    
    setTimeout(() => {
      const data = generateMockData(page, pageSize, 200);
      setDynamicData(data);
      setIsLoading(prev => ({ ...prev, dynamic: false }));
    }, 700);
  };

  const fetchTabData = async (url: string) => {
    setIsLoading(prev => ({ ...prev, tab: true }));
    const page = url.includes('page=') ? parseInt(url.split('page=')[1]) - 1 : 0;
    
    setTimeout(() => {
      const data = generateMockData(page, 6, 80, undefined, activeTab);
      setTabData(data);
      setIsLoading(prev => ({ ...prev, tab: false }));
    }, 600);
  };

  // Initialize data
  useEffect(() => {
    fetchBasicData("?page=1");
    fetchTableData("?page=1");
    fetchSearchData("?page=1");
    fetchGalleryData("?page=1");
    fetchDynamicData("?page=1");
    fetchTabData("?page=1");
  }, []);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSearchData("?page=1");
  };

  // Handle page size change
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setTimeout(() => fetchDynamicData("?page=1"), 100);
  };

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setTimeout(() => fetchTabData("?page=1"), 100);
  };

  // Table columns configuration
  const tableColumns = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "status", label: "Status", sortable: false },
    { key: "created", label: "Created", sortable: true }
  ];

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>Pagination Examples</h1>
        <p>Enhanced Pagination Component with API Integration - Handles pagination, search, and filtering with automatic API calls</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Pagination */}
        <div className="ihub-example-card">
          <h3>Basic Pagination</h3>
          <p>Simple pagination with page numbers and navigation</p>
          {isLoading.basic ? (
            <div className="ihub-loading">Loading...</div>
          ) : (
            <>
              <div className="ihub-data-preview">
                <p><strong>Total Items:</strong> {basicData.count}</p>
                <p><strong>Current Page Items:</strong> {basicData.results.length}</p>
                <div className="ihub-items-grid">
                  {basicData.results.slice(0, 3).map((item: any) => (
                    <div key={item.id} className="ihub-item-card">
                      <strong>{item.name}</strong>
                      <small>{item.email}</small>
                    </div>
                  ))}
                  {basicData.results.length > 3 && <div className="ihub-more">... and {basicData.results.length - 3} more</div>}
                </div>
              </div>
              <Pagination
                data={basicData}
                apiCall={fetchBasicData}
                pageSize={10}
              />
            </>
          )}
        </div>

        {/* Table with Pagination */}
        <div className="ihub-example-card">
          <h3>Table with Pagination</h3>
          <p>Data table with integrated pagination</p>
          {isLoading.table ? (
            <div className="ihub-loading">Loading table data...</div>
          ) : (
            <>
              <IHubTable
                data={tableData.results}
                columns={tableColumns}
                showActions={false}
              />
              <Pagination
                data={tableData}
                apiCall={fetchTableData}
                pageSize={5}
              />
            </>
          )}
        </div>

        {/* Search with Pagination */}
        <div className="ihub-example-card">
          <h3>Search with Pagination</h3>
          <p>Search functionality with paginated results</p>
          <form onSubmit={handleSearch} className="ihub-mb-3">
            <div className="ihub-search-container">
              <InputText
                label="Search"
                name="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search items..."
              />
              <SubmitButton
                title="Search"
                status={isLoading.search ? 2 : 1}
                className="ihub-search-btn"
              />
            </div>
          </form>
          {isLoading.search ? (
            <div className="ihub-loading">Searching...</div>
          ) : (
            <>
              <div className="ihub-search-results">
                <p><strong>Search Results:</strong> {searchData.count} items found</p>
                <div className="ihub-results-list">
                  {searchData.results.map((item: any) => (
                    <div key={item.id} className="ihub-result-item">
                      <strong>{item.name}</strong>
                      <p>{item.email}</p>
                      <span className={`ihub-status-badge ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <Pagination
                data={searchData}
                apiCall={fetchSearchData}
                pageSize={8}
              />
            </>
          )}
        </div>

        {/* Gallery Pagination */}
        <div className="ihub-example-card">
          <h3>Gallery Pagination</h3>
          <p>Image gallery with pagination</p>
          {isLoading.gallery ? (
            <div className="ihub-loading">Loading gallery...</div>
          ) : (
            <>
              <div className="ihub-gallery-grid">
                {galleryData.results.map((item: any) => (
                  <div key={item.id} className="ihub-gallery-item">
                    <img src={item.image} alt={item.name} />
                    <div className="ihub-gallery-info">
                      <strong>{item.name}</strong>
                      <small>{item.category}</small>
                    </div>
                  </div>
                ))}
              </div>
              <Pagination
                data={galleryData}
                apiCall={fetchGalleryData}
                pageSize={12}
              />
            </>
          )}
        </div>

        {/* Dynamic Page Size */}
        <div className="ihub-example-card">
          <h3>Dynamic Page Size</h3>
          <p>Adjustable number of items per page</p>
          <div className="ihub-page-size-controls ihub-mb-3">
            <label>Items per page:</label>
            <select 
              value={pageSize} 
              onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
              className="ihub-select-input"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          {isLoading.dynamic ? (
            <div className="ihub-loading">Loading with new page size...</div>
          ) : (
            <>
              <div className="ihub-dynamic-list">
                <p><strong>Showing {dynamicData.results.length} of {dynamicData.count} items</strong></p>
                {dynamicData.results.map((item: any) => (
                  <div key={item.id} className="ihub-list-item">
                    <span className="ihub-item-id">#{item.id}</span>
                    <span className="ihub-item-name">{item.name}</span>
                    <span className="ihub-item-email">{item.email}</span>
                    <span className={`ihub-item-status ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
              <Pagination
                data={dynamicData}
                apiCall={fetchDynamicData}
                pageSize={pageSize}
              />
            </>
          )}
        </div>

        {/* Tab Filters with Pagination */}
        <div className="ihub-example-card">
          <h3>Tab Filters with Pagination</h3>
          <p>Filter content by tabs with pagination</p>
          <div className="ihub-tab-filters ihub-mb-3">
            {["all", "Admin", "User", "Guest"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`ihub-tab-btn ${activeTab === tab ? "active" : ""}`}
              >
                {tab === "all" ? "All Roles" : tab}
              </button>
            ))}
          </div>
          {isLoading.tab ? (
            <div className="ihub-loading">Filtering...</div>
          ) : (
            <>
              <div className="ihub-filtered-content">
                <p><strong>Filtered Results:</strong> {tabData.count} items ({activeTab === "all" ? "All Roles" : activeTab})</p>
                <div className="ihub-tab-results">
                  {tabData.results.map((item: any) => (
                    <div key={item.id} className="ihub-tab-item">
                      <div className="ihub-item-header">
                        <strong>{item.name}</strong>
                        <span className={`ihub-role-badge ${item.role.toLowerCase()}`}>
                          {item.role}
                        </span>
                      </div>
                      <p>{item.email}</p>
                      <small>Created: {item.created}</small>
                    </div>
                  ))}
                </div>
              </div>
              <Pagination
                data={tabData}
                apiCall={fetchTabData}
                pageSize={6}
              />
            </>
          )}
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { Pagination } from '@instincthub/react-ui';

const [data, setData] = useState({
  count: 0,
  next: null,
  previous: null,
  results: []
});

const fetchData = async (url: string) => {
  // Your API call logic here
  const response = await fetch(url);
  const newData = await response.json();
  setData(newData);
};

<Pagination
  data={data}
  apiCall={fetchData}
  pageSize={10}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Table Integration</h3>
          <pre><code>{`import { Pagination, IHubTable } from '@instincthub/react-ui';

<IHubTable
  data={tableData.results}
  columns={columns}
  showActions={false}
/>
<Pagination
  data={tableData}
  apiCall={fetchTableData}
  pageSize={5}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Search Functionality</h3>
          <pre><code>{`const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();
  fetchSearchData("?page=1&search=" + searchTerm);
};

<form onSubmit={handleSearch}>
  <InputText
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search..."
  />
  <SubmitButton title="Search" />
</form>

<Pagination
  data={searchData}
  apiCall={fetchSearchData}
  pageSize={8}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Dynamic Page Size</h3>
          <pre><code>{`const [pageSize, setPageSize] = useState(10);

const handlePageSizeChange = (newSize: number) => {
  setPageSize(newSize);
  fetchData("?page=1&limit=" + newSize);
};

<select 
  value={pageSize} 
  onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
>
  <option value={5}>5</option>
  <option value={10}>10</option>
  <option value={20}>20</option>
</select>

<Pagination
  data={data}
  apiCall={fetchData}
  pageSize={pageSize}
/>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default PaginationExample;