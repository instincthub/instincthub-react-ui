"use client";

import React, { useState, useEffect } from "react";
import { Pagination, IHubTable } from "../../../../index";

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  created: string;
}

const PaginationExample: React.FC = () => {
  // Mock data for demonstration
  const [data, setData] = useState<any>({
    count: 150,
    next: "http://api.example.com/users?offset=20",
    previous: null,
    results: [
      { id: 1, name: "John Doe", email: "john@example.com", status: "Active", created: "2024-01-15" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive", created: "2024-01-14" },
      { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "Active", created: "2024-01-13" },
      { id: 4, name: "Alice Brown", email: "alice@example.com", status: "Pending", created: "2024-01-12" },
      { id: 5, name: "Charlie Wilson", email: "charlie@example.com", status: "Active", created: "2024-01-11" },
    ]
  });

  const [searchData, setSearchData] = useState<any>({
    count: 89,
    next: "http://api.example.com/search?offset=10&search=user",
    previous: null,
    results: [
      { id: 10, name: "User Alpha", email: "alpha@example.com", status: "Active", created: "2024-01-10" },
      { id: 11, name: "User Beta", email: "beta@example.com", status: "Active", created: "2024-01-09" },
      { id: 12, name: "User Gamma", email: "gamma@example.com", status: "Inactive", created: "2024-01-08" },
    ]
  });

  // Table columns following correct TableColumnType interface
  const tableColumns = [
    { 
      header: "ID", 
      accessor: "id" as keyof User,
      sortable: true,
      width: "80px"
    },
    { 
      header: "Name", 
      accessor: "name" as keyof User,
      sortable: true
    },
    { 
      header: "Email", 
      accessor: "email" as keyof User,
      sortable: true
    },
    { 
      header: "Status", 
      accessor: "status" as keyof User,
      sortable: false,
      cell: (row: User) => (
        <span className={`ihub-status-badge ihub-status-${row.status.toLowerCase()}`}>
          {row.status}
        </span>
      )
    },
    { 
      header: "Created", 
      accessor: "created" as keyof User,
      sortable: true
    }
  ];

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>Pagination Examples</h1>
        <p>Pagination component for API-driven data with search, filters, and navigation</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Pagination */}
        <div className="ihub-example-card">
          <h3>Basic Pagination</h3>
          <p>Simple pagination with API data</p>
          
          <div className="ihub-pagination-info">
            <p>Total Items: {data.count}</p>
            <p>Current Results: {data.results.length}</p>
          </div>

          <Pagination
            offset={0}
            data={data}
            limit={20}
            urlPath="/api/users"
            setData={setData}
            className="ihub-basic-pagination"
          />
        </div>

        {/* Pagination with Table */}
        <div className="ihub-example-card">
          <h3>Pagination with Table</h3>
          <p>Pagination integrated with table display</p>
          
          <IHubTable
            data={data.results}
            columns={tableColumns}
            isLoading={false}
          />

          <Pagination
            offset={0}
            data={data}
            limit={5}
            urlPath="/api/users"
            setData={setData}
            rangeLimit={3}
          />
        </div>

        {/* Pagination with Search */}
        <div className="ihub-example-card">
          <h3>Pagination with Search</h3>
          <p>Pagination that responds to search queries</p>
          
          <div className="ihub-search-info">
            <p>Search Results: {searchData.count} items found</p>
          </div>

          <Pagination
            offset={0}
            data={searchData}
            limit={10}
            urlPath="/api/search"
            setData={setSearchData}
            searchValues="user"
            showFirstLast={true}
          />
        </div>

        {/* Advanced Pagination */}
        <div className="ihub-example-card">
          <h3>Advanced Pagination</h3>
          <p>Pagination with authentication and tab filters</p>
          
          <Pagination
            offset={0}
            data={data}
            limit={15}
            urlPath="/api/protected/users"
            setData={setData}
            token="your-auth-token"
            tabsValues="active"
            searchValues=""
            rangeLimit={7}
            showFirstLast={false}
            className="ihub-advanced-pagination"
          />
        </div>

        {/* Pagination States */}
        <div className="ihub-example-card">
          <h3>Pagination States</h3>
          <p>Different pagination states and configurations</p>
          
          <div className="ihub-pagination-states">
            <div className="ihub-state-demo">
              <h5>First Page (No Previous)</h5>
              <Pagination
                offset={0}
                data={{
                  count: 100,
                  next: "http://api.example.com/items?offset=10",
                  previous: null,
                  results: []
                }}
                limit={10}
                urlPath="/api/items"
                setData={() => {}}
              />
            </div>
            
            <div className="ihub-state-demo">
              <h5>Middle Page</h5>
              <Pagination
                offset={20}
                data={{
                  count: 100,
                  next: "http://api.example.com/items?offset=30",
                  previous: "http://api.example.com/items?offset=10",
                  results: []
                }}
                limit={10}
                urlPath="/api/items"
                setData={() => {}}
              />
            </div>
            
            <div className="ihub-state-demo">
              <h5>Last Page (No Next)</h5>
              <Pagination
                offset={90}
                data={{
                  count: 100,
                  next: null,
                  previous: "http://api.example.com/items?offset=80",
                  results: []
                }}
                limit={10}
                urlPath="/api/items"
                setData={() => {}}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { Pagination } from '@instincthub/react-ui';

const [data, setData] = useState({
  count: 150,
  next: "http://api.example.com/users?offset=20",
  previous: null,
  results: []
});

<Pagination
  offset={0}
  data={data}
  limit={20}
  urlPath="/api/users"
  setData={setData}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Search and Filters</h3>
          <pre><code>{`<Pagination
  offset={0}
  data={searchData}
  limit={10}
  urlPath="/api/search"
  setData={setSearchData}
  searchValues="query"
  tabsValues="active"
  token="auth-token"
  rangeLimit={5}
  showFirstLast={true}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Table Integration</h3>
          <pre><code>{`const columns = [
  { header: "ID", accessor: "id", sortable: true },
  { header: "Name", accessor: "name", sortable: true },
  { header: "Email", accessor: "email", sortable: true }
];

<IHubTable
  data={data.results}
  columns={columns}
  loading={false}
/>

<Pagination
  offset={0}
  data={data}
  limit={5}
  urlPath="/api/users"
  setData={setData}
  rangeLimit={3}
/>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default PaginationExample;