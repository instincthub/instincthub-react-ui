"use client";

import React, { useState, useEffect } from "react";
import { SearchField, InputText } from "../../../../index";

const SearchFieldExample: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
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

  const handleSearch = (query: string) => {
    setSearchValue(query);
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
        <p>Search input field component with URL parameter integration</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Search */}
        <div className="ihub-example-card">
          <h3>Basic Search Field</h3>
          <p>Search field with URL parameter integration and debouncing</p>
          
          <SearchField
            labels="users"
            setSearchValues={handleSearch}
            className="ihub-mb-20"
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
            ) : searchValue && (
              <div className="ihub-no-results">No results found for "{searchValue}"</div>
            )}
          </div>
        </div>

        {/* Custom Delay Search */}
        <div className="ihub-example-card">
          <h3>Search with Custom Delay</h3>
          <p>Search field with custom debounce delay</p>
          
          <SearchField
            labels="content"
            setSearchValues={handleSearch}
            delay={800}
            className="ihub-mb-20"
          />
        </div>

        {/* Custom Name Attribute */}
        <div className="ihub-example-card">
          <h3>Search with Custom Name</h3>
          <p>Search field with custom name attribute</p>
          
          <SearchField
            labels="products"
            setSearchValues={handleSearch}
            name="product-search"
            className="ihub-mb-20"
          />
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { SearchField } from '@instincthub/react-ui';

const handleSearch = (query: string) => {
  setSearchValue(query);
  // Perform search logic
};

<SearchField
  labels="users"
  setSearchValues={handleSearch}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Custom Delay</h3>
          <pre><code>{`<SearchField
  labels="content"
  setSearchValues={handleSearch}
  delay={800}
  className="custom-search"
/>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default SearchFieldExample;