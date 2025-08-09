# SearchFieldDB

**Category:** Forms | **Type:** component

Search field component for database/API searches with URL query parameter management and pagination support

**File Location:** `src/components/forms/SearchFieldDB.tsx`

## 🏷️ Tags

`forms`, `search`, `api`, `database`, `pagination`, `url-params`

```tsx
"use client";
import React, { useState } from "react";
import { SearchFieldDB } from "@instincthub/react-ui";
import { useRouter } from "next/navigation";

/**
 * Comprehensive examples demonstrating SearchFieldDB usage
 * Shows API integration, URL parameter management, and pagination
 */
const SearchFieldDBExamples = () => {
  const [data, setData] = useState<any[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string | null>(null);
  
  // Example 1: Basic course search
  const BasicSearchExample = () => {
    const params = { channel: 'main-channel' };
    const searchParams = { search: '' };
    const userToken = 'your-auth-token'; // Get from session
    
    return (
      <div className="ihub-card">
        <div className="ihub-card-header">
          <h3>Basic API Search</h3>
          <p className="ihub-text-muted">Search courses from API endpoint</p>
        </div>
        
        <div className="ihub-card-body">
          <SearchFieldDB
            urlPath="channels/courses/main-channel/?"
            setData={setData}
            setNext={setNextPage}
            setPrevious={setPreviousPage}
            token={userToken}
            params={params}
            searchParams={searchParams}
            labels="Courses"
          />
          
          {/* Display search results */}
          {data.length > 0 && (
            <div className="ihub-mt-4">
              <h4>Search Results ({data.length})</h4>
              <div className="ihub-results-list">
                {data.map((item, index) => (
                  <div key={index} className="ihub-result-item ihub-p-3 ihub-mb-2">
                    <h5>{item.title || item.name}</h5>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
              
              {/* Pagination controls */}
              {(nextPage || previousPage) && (
                <div className="ihub-pagination ihub-mt-3">
                  <button 
                    className="ihub-btn ihub-btn-secondary"
                    disabled={!previousPage}
                    onClick={() => console.log('Load previous:', previousPage)}
                  >
                    Previous
                  </button>
                  <button 
                    className="ihub-btn ihub-btn-primary"
                    disabled={!nextPage}
                    onClick={() => console.log('Load next:', nextPage)}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Example 2: User search with custom endpoint
  const UserSearchExample = () => {
    const [userData, setUserData] = useState<any[]>([]);
    const [userNext, setUserNext] = useState<string | null>(null);
    const params = {};
    const searchParams = { search: '', role: 'admin' };
    
    return (
      <div className="ihub-card">
        <div className="ihub-card-header">
          <h3>User Search</h3>
          <p className="ihub-text-muted">Search users with role filter</p>
        </div>
        
        <div className="ihub-card-body">
          <SearchFieldDB
            urlPath="users/?"
            setData={setUserData}
            setNext={setUserNext}
            token="your-auth-token"
            params={params}
            searchParams={searchParams}
            labels="Users"
          />
          
          {userData.length > 0 && (
            <div className="ihub-user-results ihub-mt-4">
              {userData.map((user, index) => (
                <div key={index} className="ihub-user-card">
                  <div className="ihub-user-info">
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                    <span className="ihub-badge">{user.role}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Example 3: Product search with multiple parameters
  const ProductSearchExample = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [productsNext, setProductsNext] = useState<string | null>(null);
    const [productsPrev, setProductsPrev] = useState<string | null>(null);
    
    const params = { 
      channel: 'shop',
      category: 'electronics' 
    };
    
    const searchParams = { 
      search: '',
      min_price: '0',
      max_price: '1000',
      in_stock: 'true'
    };
    
    return (
      <div className="ihub-card">
        <div className="ihub-card-header">
          <h3>Product Search</h3>
          <p className="ihub-text-muted">Advanced product search with filters</p>
        </div>
        
        <div className="ihub-card-body">
          <div className="ihub-row ihub-mb-3">
            <div className="ihub-col-md-6">
              <SearchFieldDB
                urlPath="products/?"
                setData={setProducts}
                setNext={setProductsNext}
                setPrevious={setProductsPrev}
                token="your-auth-token"
                params={params}
                searchParams={searchParams}
                labels="Products"
              />
            </div>
            <div className="ihub-col-md-6">
              <div className="ihub-filters">
                <label>Price Range: $0 - $1000</label>
                <label>In Stock Only</label>
              </div>
            </div>
          </div>
          
          {/* Product grid display */}
          {products.length > 0 && (
            <div className="ihub-product-grid">
              {products.map((product, index) => (
                <div key={index} className="ihub-product-card">
                  <img src={product.image} alt={product.name} />
                  <h5>{product.name}</h5>
                  <p className="ihub-price">${product.price}</p>
                  <span className={`ihub-stock ${product.in_stock ? 'in-stock' : 'out-of-stock'}`}>
                    {product.in_stock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Example 4: Blog post search
  const BlogSearchExample = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [postsNext, setPostsNext] = useState<string | null>(null);
    
    const params = { 
      channel: 'blog',
      author: 'john-doe' 
    };
    
    const searchParams = { 
      search: '',
      tags: 'react,typescript'
    };
    
    return (
      <div className="ihub-card">
        <div className="ihub-card-header">
          <h3>Blog Search</h3>
          <p className="ihub-text-muted">Search blog posts by author and tags</p>
        </div>
        
        <div className="ihub-card-body">
          <SearchFieldDB
            urlPath="posts/?"
            setData={setPosts}
            setNext={setPostsNext}
            token={null} // Public endpoint, no token needed
            params={params}
            searchParams={searchParams}
            labels="Blog Posts"
          />
          
          {posts.length > 0 && (
            <div className="ihub-blog-results">
              {posts.map((post, index) => (
                <article key={index} className="ihub-blog-item">
                  <h4>{post.title}</h4>
                  <div className="ihub-post-meta">
                    <span>By {post.author}</span>
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                  <p>{post.excerpt}</p>
                  <div className="ihub-tags">
                    {post.tags?.map((tag: string) => (
                      <span key={tag} className="ihub-tag">{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>SearchFieldDB Examples</h1>
      <p className="ihub-mb-4">
        API search component with URL parameter management, pagination support, 
        and automatic state updates.
      </p>

      {/* Basic Search */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Basic Search</h2>
        <BasicSearchExample />
      </section>

      {/* User Search */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">User Search</h2>
        <UserSearchExample />
      </section>

      {/* Product Search */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Product Search with Filters</h2>
        <ProductSearchExample />
      </section>

      {/* Blog Search */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Blog Post Search</h2>
        <BlogSearchExample />
      </section>

      {/* Implementation Guide */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Implementation Guide</h2>
        <div className="ihub-card ihub-p-4">
          <h3>Props Interface:</h3>
          <pre className="ihub-code-block">
{`interface SearchFieldDBProps {
  /** The API endpoint path to search */
  urlPath: string;
  
  /** Function to set data state with API results */
  setData: React.Dispatch<React.SetStateAction<any>>;
  
  /** Function to set next page URL */
  setNext: React.Dispatch<React.SetStateAction<string | null>>;
  
  /** Function to set previous page URL (optional) */
  setPrevious?: React.Dispatch<React.SetStateAction<string | null>>;
  
  /** Auth token for API requests (optional) */
  token?: string | null;
  
  /** URL parameters (e.g., channel) */
  params: {
    channel?: string;
    [key: string]: any;
  };
  
  /** Search parameters from URL */
  searchParams: {
    search?: string;
    [key: string]: any;
  };
  
  /** Custom label for search placeholder (optional) */
  labels?: string;
}`}
          </pre>
          
          <h3 className="ihub-mt-3">Key Features:</h3>
          <ul>
            <li><strong>API Integration:</strong> Direct integration with backend API endpoints</li>
            <li><strong>URL Parameter Management:</strong> Automatically updates URL query parameters</li>
            <li><strong>Pagination Support:</strong> Handles next/previous page URLs from API response</li>
            <li><strong>Authentication:</strong> Supports token-based authentication for protected endpoints</li>
            <li><strong>Loading States:</strong> Shows loading indicator during API calls</li>
            <li><strong>Error Handling:</strong> Gracefully handles API errors with status codes</li>
          </ul>
          
          <h3 className="ihub-mt-3">API Response Format:</h3>
          <pre className="ihub-code-block">
{`// Expected API response format
{
  "results": [...],      // Array of search results
  "next": "url",        // URL for next page (pagination)
  "previous": "url",    // URL for previous page (pagination)
  "count": 100          // Total number of results
}`}
          </pre>
          
          <h3 className="ihub-mt-3">Usage with Next.js:</h3>
          <pre className="ihub-code-block">
{`import { useRouter } from "next/navigation";
import { SearchFieldDB } from "@instincthub/react-ui";

function SearchPage({ params, searchParams }) {
  const [data, setData] = useState([]);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  
  return (
    <SearchFieldDB
      urlPath="api/search/?"
      setData={setData}
      setNext={setNext}
      setPrevious={setPrevious}
      token={session?.accessToken}
      params={params}
      searchParams={searchParams}
      labels="Items"
    />
  );
}`}
          </pre>
          
          <h3 className="ihub-mt-3">Best Practices:</h3>
          <ul>
            <li>Always handle authentication tokens securely</li>
            <li>Implement proper error boundaries for API failures</li>
            <li>Use debouncing to reduce API calls (built-in via keydown event)</li>
            <li>Cache search results when appropriate</li>
            <li>Provide clear loading and empty state feedback</li>
            <li>Consider implementing result pagination for large datasets</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default SearchFieldDBExamples;
```

## 🔗 Related Components

- [SearchField](./SearchField.md) - Basic search input field
- [SearchObjectsFromDB](./SearchObjectsFromDB.md) - Search and select objects from database
- [FilterArray](./FilterArray.md) - Array filtering component
- [FilterObjects](./FilterObjects.md) - Object filtering component
- [THeadSortBtn](./THeadSortBtn.md) - Table header sorting button