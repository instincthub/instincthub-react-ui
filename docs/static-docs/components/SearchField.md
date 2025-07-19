# SearchField

**Category:** Forms | **Type:** component

Search input field component with debouncing, URL query synchronization, and customizable styling

## 🏷️ Tags

`forms`, `input`, `search`, `debounce`, `filter`

```tsx
"use client";
import React, { useState, useEffect } from "react";
import { SearchField } from "@instincthub/react-ui";

/**
 * Example component demonstrating various ways to use the SearchField
 */
const SearchFieldExamples = () => {
  // State for different search scenarios
  const [basicSearchValue, setBasicSearchValue] = useState<string>("");
  const [productSearchValue, setProductSearchValue] = useState<string>("");
  const [userSearchValue, setUserSearchValue] = useState<string>("");
  const [contentSearchValue, setContentSearchValue] = useState<string>("");
  const [customSearchValue, setCustomSearchValue] = useState<string>("");

  // Mock data for demonstrations
  const [products] = useState([
    { id: 1, name: "MacBook Pro", category: "Electronics", price: 1299 },
    { id: 2, name: "iPhone 15", category: "Electronics", price: 999 },
    { id: 3, name: "Nike Air Jordan", category: "Shoes", price: 180 },
    { id: 4, name: "Coffee Maker", category: "Appliances", price: 89 },
    { id: 5, name: "Wireless Headphones", category: "Electronics", price: 250 },
  ]);

  const [users] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User" },
  ]);

  const [articles] = useState([
    { id: 1, title: "React Best Practices", category: "Development", author: "Tech Writer" },
    { id: 2, title: "JavaScript ES6 Features", category: "Development", author: "JS Expert" },
    { id: 3, title: "CSS Grid Layout", category: "Design", author: "Designer" },
    { id: 4, title: "Node.js Performance", category: "Backend", author: "Backend Dev" },
  ]);

  // Filtered data based on search values
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(productSearchValue.toLowerCase()) ||
    product.category.toLowerCase().includes(productSearchValue.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(userSearchValue.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearchValue.toLowerCase()) ||
    user.role.toLowerCase().includes(userSearchValue.toLowerCase())
  );

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(contentSearchValue.toLowerCase()) ||
    article.category.toLowerCase().includes(contentSearchValue.toLowerCase()) ||
    article.author.toLowerCase().includes(contentSearchValue.toLowerCase())
  );

  // Handle search value changes
  const handleBasicSearch = (value: string) => {
    setBasicSearchValue(value);
    console.log("Basic search value:", value);
  };

  const handleProductSearch = (value: string) => {
    setProductSearchValue(value);
    console.log("Product search:", value);
  };

  const handleUserSearch = (value: string) => {
    setUserSearchValue(value);
    console.log("User search:", value);
  };

  const handleContentSearch = (value: string) => {
    setContentSearchValue(value);
    console.log("Content search:", value);
  };

  const handleCustomSearch = (value: string) => {
    setCustomSearchValue(value);
    console.log("Custom search:", value);
  };

  // Simulated API search with debouncing effect
  const [apiResults, setApiResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (customSearchValue) {
      setIsSearching(true);
      // Simulate API call delay
      const timer = setTimeout(() => {
        setApiResults([
          `Result 1 for "${customSearchValue}"`,
          `Result 2 for "${customSearchValue}"`,
          `Result 3 for "${customSearchValue}"`,
        ]);
        setIsSearching(false);
      }, 800);

      return () => clearTimeout(timer);
    } else {
      setApiResults([]);
      setIsSearching(false);
    }
  }, [customSearchValue]);

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>SearchField Examples</h1>

      <div className="ihub-py-5">
        {/* Basic Search Example */}
        <div className="ihub-mb-5">
          <h2>1. Basic Search Field</h2>
          <p>Simple search with default settings and basic functionality.</p>
          
          <SearchField
            labels="content"
            setSearchValues={handleBasicSearch}
            className="ihub-mb-3"
          />
          
          {basicSearchValue && (
            <div className="ihub-alert ihub-alert-info">
              <p><strong>Search Query:</strong> "{basicSearchValue}"</p>
            </div>
          )}
        </div>

        {/* Product Search Example */}
        <div className="ihub-mb-5">
          <h2>2. Product Search with Results</h2>
          <p>Search through products with real-time filtering and results display.</p>
          
          <SearchField
            labels="products"
            setSearchValues={handleProductSearch}
            delay={300}
            name="product-search"
            className="ihub-mb-3"
          />

          <div className="ihub-search-results">
            <h4>Products ({filteredProducts.length} found)</h4>
            {filteredProducts.length > 0 ? (
              <div className="ihub-grid ihub-grid-cols-2 ihub-gap-3">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="ihub-card ihub-p-3">
                    <h5>{product.name}</h5>
                    <p className="ihub-text-muted">{product.category}</p>
                    <p className="ihub-fw-bold">${product.price}</p>
                  </div>
                ))}
              </div>
            ) : productSearchValue ? (
              <p className="ihub-text-muted">No products found for "{productSearchValue}"</p>
            ) : (
              <p className="ihub-text-muted">Start typing to search products...</p>
            )}
          </div>
        </div>

        {/* User Search Example */}
        <div className="ihub-mb-5">
          <h2>3. User Search with Table Results</h2>
          <p>Search through users with table-based results display.</p>
          
          <SearchField
            labels="users"
            setSearchValues={handleUserSearch}
            delay={250}
            name="user-search"
            className="ihub-mb-3"
          />

          <div className="ihub-search-results">
            <h4>Users ({filteredUsers.length} found)</h4>
            {filteredUsers.length > 0 ? (
              <div className="ihub-table-responsive">
                <table className="ihub-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`ihub-badge ${user.role === 'Admin' ? 'ihub-badge-danger' : user.role === 'Editor' ? 'ihub-badge-warning' : 'ihub-badge-primary'}`}>
                            {user.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : userSearchValue ? (
              <p className="ihub-text-muted">No users found for "{userSearchValue}"</p>
            ) : (
              <p className="ihub-text-muted">Start typing to search users...</p>
            )}
          </div>
        </div>

        {/* Content Search Example */}
        <div className="ihub-mb-5">
          <h2>4. Content Search with List Results</h2>
          <p>Search through articles and content with list-style results.</p>
          
          <SearchField
            labels="articles"
            setSearchValues={handleContentSearch}
            delay={400}
            name="content-search"
            className="ihub-mb-3"
          />

          <div className="ihub-search-results">
            <h4>Articles ({filteredArticles.length} found)</h4>
            {filteredArticles.length > 0 ? (
              <div className="ihub-list-group">
                {filteredArticles.map((article) => (
                  <div key={article.id} className="ihub-list-group-item">
                    <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-start">
                      <div>
                        <h6 className="ihub-mb-1">{article.title}</h6>
                        <p className="ihub-mb-1 ihub-text-muted">by {article.author}</p>
                        <small className="ihub-text-muted">{article.category}</small>
                      </div>
                      <span className="ihub-badge ihub-badge-secondary">{article.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : contentSearchValue ? (
              <p className="ihub-text-muted">No articles found for "{contentSearchValue}"</p>
            ) : (
              <p className="ihub-text-muted">Start typing to search articles...</p>
            )}
          </div>
        </div>

        {/* Advanced Search with API Simulation */}
        <div className="ihub-mb-5">
          <h2>5. Advanced Search with API Integration</h2>
          <p>Search with simulated API calls, loading states, and debounced requests.</p>
          
          <SearchField
            labels="external data"
            setSearchValues={handleCustomSearch}
            delay={600}
            name="api-search"
            className="ihub-mb-3"
          />

          <div className="ihub-search-results">
            <h4>API Results</h4>
            {isSearching ? (
              <div className="ihub-d-flex ihub-align-items-center">
                <div className="ihub-spinner-border ihub-spinner-border-sm ihub-me-2" role="status">
                  <span className="ihub-visually-hidden">Loading...</span>
                </div>
                <span>Searching...</span>
              </div>
            ) : apiResults.length > 0 ? (
              <div className="ihub-list-group">
                {apiResults.map((result, index) => (
                  <div key={index} className="ihub-list-group-item">
                    <div className="ihub-d-flex ihub-align-items-center">
                      <div className="ihub-me-3">
                        <div className="ihub-avatar ihub-bg-primary">
                          {index + 1}
                        </div>
                      </div>
                      <div>
                        <h6 className="ihub-mb-0">{result}</h6>
                        <small className="ihub-text-muted">From external API</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : customSearchValue ? (
              <p className="ihub-text-muted">No results found for "{customSearchValue}"</p>
            ) : (
              <p className="ihub-text-muted">Start typing to search external data...</p>
            )}
          </div>
        </div>

        {/* Custom Styled Search */}
        <div className="ihub-mb-5">
          <h2>6. Custom Styled Search Field</h2>
          <p>Search field with custom styling and enhanced visual feedback.</p>
          
          <div className="ihub-custom-search-wrapper">
            <SearchField
              labels="anything"
              setSearchValues={(value) => console.log("Custom styled search:", value)}
              delay={200}
              name="custom-styled-search"
              className="ihub-custom-search-field"
            />
          </div>

          <div className="ihub-mt-3">
            <small className="ihub-text-muted">
              This search field demonstrates custom CSS styling possibilities.
            </small>
          </div>
        </div>

        {/* Multiple Search Fields */}
        <div className="ihub-mb-5">
          <h2>7. Multiple Search Fields</h2>
          <p>Multiple search fields for different purposes in the same interface.</p>
          
          <div className="ihub-row">
            <div className="ihub-col-md-4">
              <label className="ihub-form-label">Search Name</label>
              <SearchField
                labels="names"
                setSearchValues={(value) => console.log("Name search:", value)}
                delay={300}
                name="name-search"
                className="ihub-mb-3"
              />
            </div>
            <div className="ihub-col-md-4">
              <label className="ihub-form-label">Search Email</label>
              <SearchField
                labels="emails"
                setSearchValues={(value) => console.log("Email search:", value)}
                delay={300}
                name="email-search"
                className="ihub-mb-3"
              />
            </div>
            <div className="ihub-col-md-4">
              <label className="ihub-form-label">Search Category</label>
              <SearchField
                labels="categories"
                setSearchValues={(value) => console.log("Category search:", value)}
                delay={300}
                name="category-search"
                className="ihub-mb-3"
              />
            </div>
          </div>
        </div>

        {/* Performance Optimized Search */}
        <div className="ihub-mb-5">
          <h2>8. Performance Optimized Search</h2>
          <p>Search with optimized debounce delay for different use cases.</p>
          
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <h5>Fast Search (100ms delay)</h5>
              <p className="ihub-small">For instant feedback on small datasets</p>
              <SearchField
                labels="quick search"
                setSearchValues={(value) => console.log("Fast search:", value)}
                delay={100}
                name="fast-search"
                className="ihub-mb-3"
              />
            </div>
            <div className="ihub-col-md-6">
              <h5>Slow Search (1000ms delay)</h5>
              <p className="ihub-small">For expensive API calls or large datasets</p>
              <SearchField
                labels="slow search"
                setSearchValues={(value) => console.log("Slow search:", value)}
                delay={1000}
                name="slow-search"
                className="ihub-mb-3"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for enhanced styling */}
      <style jsx>{`
        .ihub-custom-search-wrapper {
          position: relative;
          max-width: 500px;
        }
        
        .ihub-custom-search-field {
          border-radius: 25px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }
        
        .ihub-custom-search-field:focus-within {
          box-shadow: 0 4px 20px rgba(0,123,255,0.3);
          transform: translateY(-2px);
        }
        
        .ihub-search-results {
          max-height: 400px;
          overflow-y: auto;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 1rem;
          background-color: #f8f9fa;
        }
        
        .ihub-grid {
          display: grid;
        }
        
        .ihub-grid-cols-2 {
          grid-template-columns: repeat(2, 1fr);
        }
        
        .ihub-gap-3 {
          gap: 1rem;
        }
        
        .ihub-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
        }
        
        .ihub-bg-primary {
          background-color: #007bff;
        }
      `}</style>
    </div>
  );
};

export default SearchFieldExamples;
```

## 📋 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `labels` | `string` | `undefined` | Label text for the search field placeholder |
| `setSearchValues` | `(value: string) => void` | `undefined` | Function to handle search value changes |
| `delay` | `number` | `400` | Debounce delay in milliseconds for search input |
| `className` | `string` | `""` | Additional CSS class names |
| `name` | `string` | `"search"` | Name attribute for the input field |

## 🎯 Key Features

### 🔍 **Debounced Search**
- Built-in debouncing to optimize performance
- Customizable delay (default 400ms)
- Prevents excessive API calls

### 🔗 **URL Synchronization**
- Automatically syncs search terms with URL query parameters
- Maintains search state across page refreshes
- Browser back/forward navigation support

### ⚡ **Performance Optimized**
- Efficient debounce implementation
- Minimal re-renders
- Cleanup on component unmount

### 🎨 **Customizable Styling**
- Flexible CSS class support
- Built-in search icon
- Responsive design

## 💡 Usage Patterns

### Basic Search Implementation
```tsx
const [searchValue, setSearchValue] = useState("");

<SearchField
  labels="products"
  setSearchValues={setSearchValue}
  delay={300}
/>
```

### Search with Results Display
```tsx
const [searchTerm, setSearchTerm] = useState("");
const [results, setResults] = useState([]);

const filteredResults = data.filter(item =>
  item.name.toLowerCase().includes(searchTerm.toLowerCase())
);

<SearchField
  labels="items"
  setSearchValues={setSearchTerm}
/>
```

### API Integration with Loading State
```tsx
const [searchQuery, setSearchQuery] = useState("");
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  if (searchQuery) {
    setIsLoading(true);
    fetchSearchResults(searchQuery).then(() => {
      setIsLoading(false);
    });
  }
}, [searchQuery]);

<SearchField
  labels="external data"
  setSearchValues={setSearchQuery}
  delay={600}
/>
```

## 🔗 Related Components

- [SearchObjectsFromDB](./SearchObjectsFromDB.md) - Advanced database search with object selection
- [ActionDropdown](./ActionDropdown.md) - Dropdown component for actions
- [InputText](./InputText.md) - Basic text input field
- [FilterBy](./FilterBy.md) - Data filtering component
- [Tables](./Tables.md) - Table component for displaying search results

