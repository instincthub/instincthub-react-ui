"use client";

import React, { useState, useEffect } from "react";
import { SearchField, InputText } from "../../../../index";

const SearchFieldExample: React.FC = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const mockData = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Manager" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Admin" },
  ];

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const filtered = mockData.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.email.toLowerCase().includes(query.toLowerCase()) ||
        item.role.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>SearchField Examples</h1>
        <p>Search input field component with real-time search and filtering capabilities</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Search */}
        <div className="ihub-example-card">
          <h3>Basic Search Field</h3>
          <p>Simple search with live results</p>
          
          <SearchField
            placeholder="Search users..."
            onSearch={handleSearch}
            isLoading={isLoading}
          />
          
          <div className="ihub-search-results">
            {isLoading ? (
              <div className="ihub-loading">Searching...</div>
            ) : searchResults.length > 0 ? (
              <div className="ihub-results-list">
                {searchResults.map(result => (
                  <div key={result.id} className="ihub-result-item">
                    <strong>{result.name}</strong>
                    <p>{result.email}</p>
                    <span className="ihub-role-badge">{result.role}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="ihub-no-results">No results found</div>
            )}
          </div>
        </div>

        {/* Advanced Search */}
        <div className="ihub-example-card">
          <h3>Advanced Search with Filters</h3>
          <p>Search field with category filters and advanced options</p>
          
          <SearchField
            placeholder="Search with filters..."
            onSearch={handleSearch}
            isLoading={isLoading}
            showFilters={true}
            filters={[
              { key: 'all', label: 'All' },
              { key: 'admin', label: 'Admins' },
              { key: 'user', label: 'Users' },
              { key: 'manager', label: 'Managers' }
            ]}
          />
        </div>

        {/* Search with Recent Searches */}
        <div className="ihub-example-card">
          <h3>Search with Recent History</h3>
          <p>Search field that shows recent search terms</p>
          
          <SearchField
            placeholder="Search with history..."
            onSearch={handleSearch}
            showRecentSearches={true}
            recentSearches={['John', 'Admin', 'jane@example.com']}
          />
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { SearchField } from '@instincthub/react-ui';

const handleSearch = async (query: string) => {
  const results = await searchAPI(query);
  setSearchResults(results);
};

<SearchField
  placeholder="Search users..."
  onSearch={handleSearch}
  isLoading={isLoading}
/>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default SearchFieldExample;