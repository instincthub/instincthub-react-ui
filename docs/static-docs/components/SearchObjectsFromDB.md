# SearchObjectsFromDB

**Category:** Form | **Type:** component

Advanced search component for searching and selecting objects from database with filtering, pagination, and async data loading capabilities.

## 🏷️ Tags

`form`, `search`, `database`, `async`, `filtering`, `selection`

```tsx
"use client";
import React, { useState } from "react";
import { SearchObjectsFromDB } from "@instincthub/react-ui";

// Define types for different search scenarios
interface UserType {
  id: number;
  username: string;
  email: string;
  display_name: string;
  avatar?: string;
  role?: string;
}

interface ProductType {
  id: number;
  title: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  sku?: string;
}

interface CourseType {
  id: number;
  title: string;
  instructor: string;
  level: string;
  duration: string;
  rating?: number;
}

interface ContentType {
  id: number;
  title: string;
  type: string;
  author: string;
  status: string;
  created_at: string;
}

/**
 * Comprehensive SearchObjectsFromDB Examples
 * Demonstrates various use cases including user search, product search,
 * content management, filtering, pagination, and async data loading
 */
const SearchObjectsExamples = () => {
  // User Search State
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);
  const [selectedSingleUser, setSelectedSingleUser] = useState<UserType[]>([]);

  // Product Search State  
  const [selectedProducts, setSelectedProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

  // Course Search State
  const [selectedCourses, setSelectedCourses] = useState<CourseType[]>([]);

  // Content Management State
  const [selectedContent, setSelectedContent] = useState<ContentType[]>([]);

  // Mock authentication token (replace with your actual token)
  const authToken = "your-auth-token-here";
  const channelHandle = "your-channel-handle";

  // Sample static data for demonstration
  const sampleUsers: UserType[] = [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      display_name: "John Doe",
      role: "admin"
    },
    {
      id: 2,
      username: "jane_smith",
      email: "jane@example.com",
      display_name: "Jane Smith",
      role: "user"
    },
    {
      id: 3,
      username: "bob_wilson",
      email: "bob@example.com",
      display_name: "Bob Wilson",
      role: "moderator"
    }
  ];

  const sampleProducts: ProductType[] = [
    {
      id: 1,
      title: "Wireless Headphones",
      name: "Sony WH-1000XM4",
      price: 299.99,
      category: "Electronics",
      sku: "SONY-WH1000XM4"
    },
    {
      id: 2,
      title: "Laptop Computer",
      name: "MacBook Pro 16-inch",
      price: 2399.99,
      category: "Computers",
      sku: "APPLE-MBP16"
    },
    {
      id: 3,
      title: "Smartphone",
      name: "iPhone 15 Pro",
      price: 999.99,
      category: "Mobile",
      sku: "APPLE-IP15PRO"
    }
  ];

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>SearchObjectsFromDB Examples</h1>
      
      <div className="ihub-row ihub-mt-4">
        {/* Basic User Search */}
        <div className="ihub-col-md-6 ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h3>1. Basic User Search (Multiple Selection)</h3>
            <p>Search and select multiple users from database:</p>
            
            <SearchObjectsFromDB<UserType>
              label="Search Users"
              token={authToken}
              handle={channelHandle}
              setSelected={setSelectedUsers}
              selected={selectedUsers}
              placeholder="Search by username or email"
              key_name="display_name"
              limit_query={10}
              limit_select={0} // 0 = unlimited selection
              options={sampleUsers}
            />
            
            <div className="ihub-mt-3">
              <small className="ihub-text-muted">
                Selected: {selectedUsers.length} users
              </small>
            </div>
          </div>
        </div>

        {/* Single User Selection */}
        <div className="ihub-col-md-6 ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h3>2. Single User Selection</h3>
            <p>Search and select only one user:</p>
            
            <SearchObjectsFromDB<UserType>
              label="Select Instructor"
              token={authToken}
              handle={channelHandle}
              setSelected={setSelectedSingleUser}
              selected={selectedSingleUser}
              placeholder="Search for instructor"
              key_name="display_name"
              limit_query={5}
              limit_select={1} // Only one selection allowed
              options={sampleUsers}
            />
          </div>
        </div>
      </div>

      <div className="ihub-row">
        {/* Product Search with Custom URL */}
        <div className="ihub-col-md-6 ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h3>3. Product Search (Custom API)</h3>
            <p>Search products using custom API endpoint:</p>
            
            <SearchObjectsFromDB<ProductType>
              label="Search Products"
              token={authToken}
              handle={channelHandle}
              setSelected={setSelectedProducts}
              selected={selectedProducts}
              placeholder="Search products by name or SKU"
              key_name="title"
              limit_query={20}
              limit_select={5}
              searchUrl="/api/products/search/?"
              options={sampleProducts}
            />
            
            <div className="ihub-mt-3">
              <small className="ihub-text-muted">
                Max 5 products can be selected
              </small>
            </div>
          </div>
        </div>

        {/* Dynamic Model Search */}
        <div className="ihub-col-md-6 ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h3>4. Dynamic Model Search</h3>
            <p>Search using dynamic model configuration:</p>
            
            <SearchObjectsFromDB<CourseType>
              label="Search Courses"
              token={authToken}
              handle={channelHandle}
              setSelected={setSelectedCourses}
              selected={selectedCourses}
              placeholder="Search courses by title"
              key_name="title"
              appLabel="education"
              modelName="Course"
              filterChannel={true}
              limit_query={15}
              limit_select={3}
            />
          </div>
        </div>
      </div>

      <div className="ihub-row">
        {/* Content Management Search */}
        <div className="ihub-col-md-6 ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h3>5. Content Management Search</h3>
            <p>Search content items with status filtering:</p>
            
            <SearchObjectsFromDB<ContentType>
              label="Select Content Items"
              token={authToken}
              handle={channelHandle}
              setSelected={setSelectedContent}
              selected={selectedContent}
              placeholder="Search articles, videos, documents"
              key_name="title"
              appLabel="cms"
              modelName="Content"
              filterChannel={false}
              limit_query={25}
              limit_select={0}
            />
          </div>
        </div>

        {/* Error State Example */}
        <div className="ihub-col-md-6 ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h3>6. Search with Validation</h3>
            <p>Required field with error state:</p>
            
            <SearchObjectsFromDB<UserType>
              label="Required User Selection *"
              token={authToken}
              handle={channelHandle}
              setSelected={setSelectedUsers}
              selected={selectedUsers}
              placeholder="This field is required"
              key_name="display_name"
              limit_query={5}
              limit_select={1}
              err={selectedUsers.length === 0} // Show error if no selection
              options={sampleUsers}
            />
          </div>
        </div>
      </div>

      {/* Advanced Configuration */}
      <div className="ihub-row ihub-mt-4">
        <div className="ihub-col-12">
          <div className="ihub-card ihub-p-4">
            <h3>7. Advanced Search Configuration</h3>
            <p>Demonstrates all available props and configurations:</p>
            
            <div className="ihub-row">
              <div className="ihub-col-md-6">
                <SearchObjectsFromDB<ProductType>
                  label="Advanced Product Search"
                  token={authToken}
                  handle={channelHandle}
                  setSelected={setFilteredProducts}
                  selected={filteredProducts}
                  placeholder="Advanced search with all options"
                  key_name="name"
                  appLabel="inventory"
                  modelName="Product"
                  filterChannel={true}
                  limit_query={50} // Higher query limit
                  limit_select={10} // Allow up to 10 selections
                  searchUrl="/api/products/advanced-search/?"
                  options={sampleProducts}
                  err={false}
                />
              </div>
              
              <div className="ihub-col-md-6">
                <h4>Configuration Details:</h4>
                <ul className="ihub-list-unstyled ihub-small">
                  <li><strong>token:</strong> Authentication token</li>
                  <li><strong>handle:</strong> Channel/organization handle</li>
                  <li><strong>appLabel:</strong> Django app label for dynamic search</li>
                  <li><strong>modelName:</strong> Model name for dynamic search</li>
                  <li><strong>filterChannel:</strong> Filter results by channel</li>
                  <li><strong>limit_query:</strong> Max results from API (50)</li>
                  <li><strong>limit_select:</strong> Max user selections (10)</li>
                  <li><strong>key_name:</strong> Display field (name)</li>
                  <li><strong>searchUrl:</strong> Custom API endpoint</li>
                  <li><strong>options:</strong> Static/initial data</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Patterns */}
      <div className="ihub-row ihub-mt-4">
        <div className="ihub-col-12">
          <div className="ihub-card ihub-p-4">
            <h3>Common Usage Patterns</h3>
            
            <div className="ihub-row">
              <div className="ihub-col-md-4">
                <h4>User Management</h4>
                <ul>
                  <li>Team member selection</li>
                  <li>Instructor assignment</li>
                  <li>Participant enrollment</li>
                  <li>Permission assignment</li>
                </ul>
              </div>
              
              <div className="ihub-col-md-4">
                <h4>Content Management</h4>
                <ul>
                  <li>Article selection</li>
                  <li>Media library</li>
                  <li>Course materials</li>
                  <li>Tag management</li>
                </ul>
              </div>
              
              <div className="ihub-col-md-4">
                <h4>E-commerce</h4>
                <ul>
                  <li>Product selection</li>
                  <li>Category assignment</li>
                  <li>Bundle creation</li>
                  <li>Inventory management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* API Integration Examples */}
      <div className="ihub-row ihub-mt-4">
        <div className="ihub-col-12">
          <div className="ihub-card ihub-p-4">
            <h3>API Integration Examples</h3>
            
            <div className="ihub-code-block">
              <h4>1. Using Custom Search URL:</h4>
              <pre>
{`// Custom API endpoint with query parameters
<SearchObjectsFromDB
  searchUrl="/api/users/search/?"
  // Will generate: /api/users/search/?search=john
/>`}
              </pre>
              
              <h4>2. Using Dynamic Django Models:</h4>
              <pre>
{`// Dynamic model search via Django REST API
<SearchObjectsFromDB
  appLabel="myapp"
  modelName="MyModel"
  filterChannel={true}
  // Generates: /channels/{handle}/dynamic-search/?app_label=myapp&model_name=MyModel&value=search&filter_channel=true
/>`}
              </pre>
              
              <h4>3. Default User Search:</h4>
              <pre>
{`// Built-in user search endpoint
<SearchObjectsFromDB
  token={token}
  handle={handle}
  // Uses: /auth/{handle}/search-user/{input}/?limit={limit}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Summary of Current Selections */}
      <div className="ihub-row ihub-mt-4">
        <div className="ihub-col-12">
          <div className="ihub-card ihub-p-4 ihub-bg-light">
            <h3>Current Selections Summary</h3>
            
            <div className="ihub-row">
              <div className="ihub-col-md-3">
                <h5>Users ({selectedUsers.length})</h5>
                {selectedUsers.map(user => (
                  <div key={user.id} className="ihub-badge ihub-badge-primary ihub-mr-1 ihub-mb-1">
                    {user.display_name}
                  </div>
                ))}
              </div>
              
              <div className="ihub-col-md-3">
                <h5>Products ({selectedProducts.length})</h5>
                {selectedProducts.map(product => (
                  <div key={product.id} className="ihub-badge ihub-badge-success ihub-mr-1 ihub-mb-1">
                    {product.title}
                  </div>
                ))}
              </div>
              
              <div className="ihub-col-md-3">
                <h5>Courses ({selectedCourses.length})</h5>
                {selectedCourses.map(course => (
                  <div key={course.id} className="ihub-badge ihub-badge-info ihub-mr-1 ihub-mb-1">
                    {course.title}
                  </div>
                ))}
              </div>
              
              <div className="ihub-col-md-3">
                <h5>Content ({selectedContent.length})</h5>
                {selectedContent.map(content => (
                  <div key={content.id} className="ihub-badge ihub-badge-warning ihub-mr-1 ihub-mb-1">
                    {content.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchObjectsExamples;
```

## 🔗 Related Components

- [InputText](./InputText.md) - Text input component for basic search functionality
- [InputTextarea](./InputTextarea.md) - Textarea component for longer text input
- [SearchFieldDB](./SearchFieldDB.md) - Database search field component
- [ActionDropdown](./ActionDropdown.md) - Dropdown component with action callbacks
- [FilterObjects](./FilterObjects.md) - Object filtering utility component

