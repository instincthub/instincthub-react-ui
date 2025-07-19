# InputSearchDropdown

**Category:** Forms | **Type:** component

Searchable dropdown input with autocomplete and filtering capabilities

**File Location:** `src/components/forms/InputSearchDropdown.tsx`

## 🏷️ Tags

`forms`, `dropdown`, `search`, `autocomplete`, `filter`

```tsx
"use client";
import React, { useState } from "react";
import { InputSearchDropdown } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive examples demonstrating searchable dropdown functionality
 * Shows autocomplete, filtering, custom rendering, and API integration patterns
 */
const InputSearchDropdownExamples = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedSkills, setSelectedSkills] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sample data for different examples
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      department: "Engineering",
      role: "Senior Developer",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@company.com",
      department: "Marketing",
      role: "Marketing Manager",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@company.com",
      department: "Design",
      role: "UI/UX Designer",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice.brown@company.com",
      department: "Engineering",
      role: "Frontend Developer",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie.wilson@company.com",
      department: "Sales",
      role: "Sales Representative",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
  ];

  const countries = [
    { id: "us", name: "United States", code: "US", flag: "🇺🇸" },
    { id: "uk", name: "United Kingdom", code: "GB", flag: "🇬🇧" },
    { id: "ca", name: "Canada", code: "CA", flag: "🇨🇦" },
    { id: "de", name: "Germany", code: "DE", flag: "🇩🇪" },
    { id: "fr", name: "France", code: "FR", flag: "🇫🇷" },
    { id: "jp", name: "Japan", code: "JP", flag: "🇯🇵" },
    { id: "au", name: "Australia", code: "AU", flag: "🇦🇺" },
    { id: "br", name: "Brazil", code: "BR", flag: "🇧🇷" },
    { id: "in", name: "India", code: "IN", flag: "🇮🇳" },
    { id: "ng", name: "Nigeria", code: "NG", flag: "🇳🇬" },
  ];

  const products = [
    {
      id: "laptop-001",
      name: "MacBook Pro 16\"",
      category: "Laptops",
      price: 2499,
      brand: "Apple",
      inStock: true,
    },
    {
      id: "laptop-002",
      name: "Dell XPS 13",
      category: "Laptops",
      price: 1299,
      brand: "Dell",
      inStock: true,
    },
    {
      id: "phone-001",
      name: "iPhone 15 Pro",
      category: "Smartphones",
      price: 999,
      brand: "Apple",
      inStock: false,
    },
    {
      id: "tablet-001",
      name: "iPad Air",
      category: "Tablets",
      price: 599,
      brand: "Apple",
      inStock: true,
    },
    {
      id: "headphones-001",
      name: "Sony WH-1000XM4",
      category: "Audio",
      price: 349,
      brand: "Sony",
      inStock: true,
    },
  ];

  const skills = [
    { id: "js", name: "JavaScript", category: "Programming", level: "Advanced" },
    { id: "react", name: "React", category: "Framework", level: "Advanced" },
    { id: "node", name: "Node.js", category: "Backend", level: "Intermediate" },
    { id: "python", name: "Python", category: "Programming", level: "Advanced" },
    { id: "design", name: "UI/UX Design", category: "Design", level: "Expert" },
    { id: "sql", name: "SQL", category: "Database", level: "Intermediate" },
    { id: "aws", name: "AWS", category: "Cloud", level: "Intermediate" },
    { id: "docker", name: "Docker", category: "DevOps", level: "Beginner" },
  ];

  // Handle user selection
  const handleUserSelect = (user: any) => {
    setSelectedUser(user);
    openToast(`Selected user: ${user.name}`);
  };

  const handleCountrySelect = (country: any) => {
    setSelectedCountry(country);
    openToast(`Selected country: ${country.name}`);
  };

  const handleProductSelect = (product: any) => {
    setSelectedProduct(product);
    openToast(`Selected product: ${product.name}`);
  };

  const handleSkillsSelect = (skill: any) => {
    const isSelected = selectedSkills.some(s => s.id === skill.id);
    if (isSelected) {
      setSelectedSkills(prev => prev.filter(s => s.id !== skill.id));
      openToast(`Removed skill: ${skill.name}`);
    } else {
      setSelectedSkills(prev => [...prev, skill]);
      openToast(`Added skill: ${skill.name}`);
    }
  };

  // Async search simulation
  const handleAsyncSearch = async (query: string) => {
    setIsLoading(true);
    setSearchQuery(query);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredUsers = users.filter(user => 
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase()) ||
          user.department.toLowerCase().includes(query.toLowerCase())
        );
        setIsLoading(false);
        resolve(filteredUsers);
      }, 1000);
    });
  };

  // Custom render functions
  const renderUserOption = (user: any, isSelected: boolean) => (
    <div className={`ihub-search-option ${isSelected ? 'selected' : ''}`}>
      <div className="ihub-option-avatar">
        <img src={user.avatar} alt={user.name} className="ihub-avatar ihub-avatar-sm" />
      </div>
      <div className="ihub-option-content">
        <div className="ihub-option-title">{user.name}</div>
        <div className="ihub-option-subtitle">{user.email}</div>
        <div className="ihub-option-meta">
          <span className="ihub-badge ihub-badge-outline-primary">{user.department}</span>
          <span className="ihub-text-muted">{user.role}</span>
        </div>
      </div>
    </div>
  );

  const renderCountryOption = (country: any, isSelected: boolean) => (
    <div className={`ihub-search-option ${isSelected ? 'selected' : ''}`}>
      <div className="ihub-option-flag">{country.flag}</div>
      <div className="ihub-option-content">
        <div className="ihub-option-title">{country.name}</div>
        <div className="ihub-option-subtitle">{country.code}</div>
      </div>
    </div>
  );

  const renderProductOption = (product: any, isSelected: boolean) => (
    <div className={`ihub-search-option ${isSelected ? 'selected' : ''}`}>
      <div className="ihub-option-content">
        <div className="ihub-option-title">{product.name}</div>
        <div className="ihub-option-subtitle">{product.brand} • {product.category}</div>
        <div className="ihub-option-meta">
          <span className="ihub-price">${product.price}</span>
          <span className={`ihub-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  );

  const renderSkillOption = (skill: any, isSelected: boolean) => (
    <div className={`ihub-search-option ${isSelected ? 'selected' : ''}`}>
      <div className="ihub-option-content">
        <div className="ihub-option-title">{skill.name}</div>
        <div className="ihub-option-subtitle">{skill.category}</div>
        <div className="ihub-option-meta">
          <span className={`ihub-badge ${
            skill.level === 'Expert' ? 'ihub-badge-success' :
            skill.level === 'Advanced' ? 'ihub-badge-primary' :
            skill.level === 'Intermediate' ? 'ihub-badge-warning' :
            'ihub-badge-secondary'
          }`}>
            {skill.level}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>InputSearchDropdown Examples</h1>
      <p className="ihub-mb-4">
        Searchable dropdown component with autocomplete, filtering, and custom rendering.
        Perfect for user selection, location picking, and complex data searches.
      </p>

      {/* Basic User Search */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">User Search with Custom Rendering</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Team Member Selection</h3>
            <p className="ihub-text-muted">Search and select team members with rich display</p>
          </div>
          
          <div className="ihub-card-body">
            <InputSearchDropdown
              options={users}
              value={selectedUser}
              onChange={handleUserSelect}
              placeholder="Search for team members..."
              searchKeys={['name', 'email', 'department', 'role']}
              renderOption={renderUserOption}
              displayKey="name"
              valueKey="id"
              className="ihub-user-search"
              clearable={true}
              searchable={true}
            />
            
            {selectedUser && (
              <div className="ihub-mt-3">
                <h4>Selected User:</h4>
                <div className="ihub-selected-user ihub-d-flex ihub-align-items-center">
                  <img 
                    src={selectedUser.avatar} 
                    alt={selectedUser.name} 
                    className="ihub-avatar ihub-avatar-md ihub-me-3" 
                  />
                  <div>
                    <div className="ihub-font-weight-bold">{selectedUser.name}</div>
                    <div className="ihub-text-muted">{selectedUser.email}</div>
                    <div className="ihub-small">
                      {selectedUser.role} in {selectedUser.department}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Country Selection */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Country Selection with Flags</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Location Picker</h3>
            <p className="ihub-text-muted">Choose a country with flag display</p>
          </div>
          
          <div className="ihub-card-body">
            <InputSearchDropdown
              options={countries}
              value={selectedCountry}
              onChange={handleCountrySelect}
              placeholder="Select a country..."
              searchKeys={['name', 'code']}
              renderOption={renderCountryOption}
              displayKey="name"
              valueKey="id"
              className="ihub-country-search"
              clearable={true}
              searchable={true}
              maxHeight={200}
            />
            
            {selectedCountry && (
              <div className="ihub-mt-3">
                <div className="ihub-selected-country">
                  <span className="ihub-country-flag">{selectedCountry.flag}</span>
                  <span className="ihub-country-name">{selectedCountry.name}</span>
                  <span className="ihub-country-code">({selectedCountry.code})</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Product Search */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Product Search with Inventory</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>E-commerce Product Selection</h3>
            <p className="ihub-text-muted">Search products with pricing and stock info</p>
          </div>
          
          <div className="ihub-card-body">
            <InputSearchDropdown
              options={products}
              value={selectedProduct}
              onChange={handleProductSelect}
              placeholder="Search for products..."
              searchKeys={['name', 'brand', 'category']}
              renderOption={renderProductOption}
              displayKey="name"
              valueKey="id"
              className="ihub-product-search"
              clearable={true}
              searchable={true}
              filterFunction={(product, query) => {
                const searchTerm = query.toLowerCase();
                return (
                  product.name.toLowerCase().includes(searchTerm) ||
                  product.brand.toLowerCase().includes(searchTerm) ||
                  product.category.toLowerCase().includes(searchTerm) ||
                  product.price.toString().includes(searchTerm)
                );
              }}
            />
            
            {selectedProduct && (
              <div className="ihub-mt-3">
                <h4>Selected Product:</h4>
                <div className="ihub-product-details">
                  <div className="ihub-product-name">{selectedProduct.name}</div>
                  <div className="ihub-product-meta">
                    <span className="ihub-brand">{selectedProduct.brand}</span>
                    <span className="ihub-category">{selectedProduct.category}</span>
                    <span className="ihub-price">${selectedProduct.price}</span>
                    <span className={`ihub-stock ${selectedProduct.inStock ? 'available' : 'unavailable'}`}>
                      {selectedProduct.inStock ? 'Available' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Multi-Select Skills */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Multi-Select Skills</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Skills Selection</h3>
            <p className="ihub-text-muted">Choose multiple skills with proficiency levels</p>
          </div>
          
          <div className="ihub-card-body">
            <InputSearchDropdown
              options={skills}
              value={selectedSkills}
              onChange={handleSkillsSelect}
              placeholder="Search and select skills..."
              searchKeys={['name', 'category']}
              renderOption={renderSkillOption}
              displayKey="name"
              valueKey="id"
              className="ihub-skills-search"
              clearable={false}
              searchable={true}
              multiple={true}
              maxSelections={5}
            />
            
            {selectedSkills.length > 0 && (
              <div className="ihub-mt-3">
                <h4>Selected Skills:</h4>
                <div className="ihub-skills-list">
                  {selectedSkills.map(skill => (
                    <div key={skill.id} className="ihub-skill-item">
                      <span className="ihub-skill-name">{skill.name}</span>
                      <span className="ihub-skill-category">({skill.category})</span>
                      <span className={`ihub-skill-level ${
                        skill.level === 'Expert' ? 'expert' :
                        skill.level === 'Advanced' ? 'advanced' :
                        skill.level === 'Intermediate' ? 'intermediate' :
                        'beginner'
                      }`}>
                        {skill.level}
                      </span>
                      <button 
                        className="ihub-skill-remove"
                        onClick={() => handleSkillsSelect(skill)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Async Search */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Async Search with Loading</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Server-Side Search</h3>
            <p className="ihub-text-muted">Search with API integration and loading states</p>
          </div>
          
          <div className="ihub-card-body">
            <InputSearchDropdown
              asyncSearch={handleAsyncSearch}
              value={selectedUser}
              onChange={handleUserSelect}
              placeholder="Search users from server..."
              renderOption={renderUserOption}
              displayKey="name"
              valueKey="id"
              className="ihub-async-search"
              clearable={true}
              searchable={true}
              loading={isLoading}
              minSearchLength={2}
              debounceMs={500}
              noOptionsMessage="No users found for your search"
              loadingMessage="Searching users..."
            />
            
            <div className="ihub-mt-3">
              <div className="ihub-search-info">
                {searchQuery && (
                  <p className="ihub-text-muted">
                    Last search: "{searchQuery}" {isLoading && '(searching...)'}
                  </p>
                )}
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
{`interface InputSearchDropdownProps {
  options?: any[];                    // Static options array
  asyncSearch?: (query: string) => Promise<any[]>;
  value: any | any[];                 // Selected value(s)
  onChange: (value: any) => void;
  placeholder?: string;
  searchKeys?: string[];              // Keys to search in options
  renderOption?: (option: any, isSelected: boolean) => React.ReactNode;
  displayKey?: string;                // Key for display text
  valueKey?: string;                  // Key for value comparison
  className?: string;
  clearable?: boolean;
  searchable?: boolean;
  multiple?: boolean;                 // Multi-select mode
  maxSelections?: number;
  maxHeight?: number;                 // Dropdown max height
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  minSearchLength?: number;           // Min chars for async search
  debounceMs?: number;                // Debounce delay for async
  filterFunction?: (option: any, query: string) => boolean;
  noOptionsMessage?: string;
  loadingMessage?: string;
}`}
          </pre>
          
          <h3 className="ihub-mt-3">Key Features:</h3>
          <ul>
            <li><strong>Flexible Search:</strong> Multiple search keys and custom filter functions</li>
            <li><strong>Custom Rendering:</strong> Full control over option display</li>
            <li><strong>Async Support:</strong> Server-side search with debouncing</li>
            <li><strong>Multi-Select:</strong> Single and multiple selection modes</li>
            <li><strong>Performance:</strong> Virtualization for large datasets</li>
            <li><strong>Accessibility:</strong> Full keyboard navigation and ARIA support</li>
          </ul>
          
          <h3 className="ihub-mt-3">Best Practices:</h3>
          <ul>
            <li>Use appropriate search keys for efficient filtering</li>
            <li>Implement debouncing for async searches (300-500ms)</li>
            <li>Provide meaningful placeholder and empty state messages</li>
            <li>Use custom rendering for rich option displays</li>
            <li>Consider virtualization for large option lists (>100 items)</li>
            <li>Implement proper loading and error states</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default InputSearchDropdownExamples;
```

## 🔗 Related Components

- [InputText](./InputText.md) - Basic text input component
- [ActionDropdown](./ActionDropdown.md) - Action dropdown menu component
- [SearchField](./SearchField.md) - Simple search input field
- [SearchObjectsFromDB](./SearchObjectsFromDB.md) - Database search component
- [FilterBy](./FilterBy.md) - Filter dropdown component