# convertArrayToObject

**Category:** Library | **Type:** utility

A utility function that converts an array of objects into a single object where each key is the `id` of the array item. Perfect for transforming list data into lookup objects for faster access and manipulation.

## 📁 File Location

`src/components/lib/convertArrayToObject.ts`

## 🏷️ Tags

`array`, `object`, `transform`, `convert`, `lookup`, `data-structure`, `utility`

## 📖 Usage Examples

### Example 1: Complete Array to Object Conversion Demo

```tsx
"use client";

import React, { useState } from "react";
import { convertArrayToObject } from "@instincthub/react-ui/lib";

// Sample data types for demonstration
interface Category {
  id: string;
  title: string;
  status: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

/**
 * Comprehensive example demonstrating convertArrayToObject utility
 */
const ConvertArrayToObjectExamples = () => {
  // Sample data arrays
  const [categories] = useState<Category[]>([
    { id: "1", title: "Technology", status: true },
    { id: "2", title: "Design", status: true },
    { id: "3", title: "Marketing", status: false },
    { id: "4", title: "Business", status: true },
    { id: "5", title: "Finance", status: false },
  ]);

  const [users] = useState<User[]>([
    { id: "user1", name: "John Doe", email: "john@example.com", role: "Admin", active: true },
    { id: "user2", name: "Jane Smith", email: "jane@example.com", role: "Editor", active: true },
    { id: "user3", name: "Bob Johnson", email: "bob@example.com", role: "Viewer", active: false },
    { id: "user4", name: "Alice Brown", email: "alice@example.com", role: "Editor", active: true },
  ]);

  const [products] = useState<Product[]>([
    { id: "prod1", name: "Laptop", price: 999.99, category: "Electronics", inStock: true },
    { id: "prod2", name: "Phone", price: 699.99, category: "Electronics", inStock: true },
    { id: "prod3", name: "Desk Chair", price: 299.99, category: "Furniture", inStock: false },
    { id: "prod4", name: "Monitor", price: 399.99, category: "Electronics", inStock: true },
  ]);

  // Convert arrays to objects
  const categoriesObject = convertArrayToObject(categories);
  const usersObject = convertArrayToObject(users as any);
  const productsObject = convertArrayToObject(products as any);

  // State for interactive demo
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("1");
  const [selectedUserId, setSelectedUserId] = useState<string>("user1");
  const [selectedProductId, setSelectedProductId] = useState<string>("prod1");

  return (
    <div className="ihub-container ihub-py-5">
      <h1>convertArrayToObject Utility Examples</h1>

      {/* Basic Conversion Example */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Basic Array to Object Conversion</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h5>Original Array (Categories)</h5>
              <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "12px", maxHeight: "200px", overflow: "auto" }}>
                {JSON.stringify(categories, null, 2)}
              </pre>
            </div>
          </div>
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h5>Converted Object</h5>
              <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "12px", maxHeight: "200px", overflow: "auto" }}>
                {JSON.stringify(categoriesObject, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Lookup Demo */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Fast Lookup Demonstration</h2>
        <div className="ihub-card ihub-p-4">
          <h5>Category Lookup</h5>
          <div className="ihub-mb-3">
            <label className="ihub-form-label">Select Category ID:</label>
            <select
              className="ihub-form-control"
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.id}
                </option>
              ))}
            </select>
          </div>
          <div className="ihub-alert ihub-alert-info">
            <strong>Direct Access:</strong> categoriesObject["{selectedCategoryId}"]
            <br />
            <strong>Result:</strong> {JSON.stringify(categoriesObject[selectedCategoryId])}
          </div>
        </div>
      </section>

      {/* Performance Comparison */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Performance Benefits</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h5 className="text-danger">❌ Slow Array Search</h5>
              <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// O(n) complexity - searches entire array
const findUser = (id: string) => {
  return users.find(user => user.id === id);
};

// Requires iteration through array
const user = findUser("user3");`}
              </pre>
              <small className="text-muted">Time complexity: O(n)</small>
            </div>
          </div>
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h5 className="text-success">✅ Fast Object Lookup</h5>
              <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// O(1) complexity - direct access
const usersObj = convertArrayToObject(users);

// Direct property access
const user = usersObj["user3"];`}
              </pre>
              <small className="text-muted">Time complexity: O(1)</small>
            </div>
          </div>
        </div>
      </section>

      {/* Real-world Use Cases */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Real-world Use Cases</h2>
        
        {/* Use Case 1: User Management */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-users ihub-me-2"></i>
              User Management System
            </h5>
            <div className="ihub-mb-3">
              <label className="ihub-form-label">Select User:</label>
              <select
                className="ihub-form-control"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            {usersObject[selectedUserId] && (
              <div className="ihub-row">
                <div className="ihub-col-md-3">
                  <strong>Name:</strong> {usersObject[selectedUserId].name}
                </div>
                <div className="ihub-col-md-3">
                  <strong>Email:</strong> {usersObject[selectedUserId].email}
                </div>
                <div className="ihub-col-md-3">
                  <strong>Role:</strong> {usersObject[selectedUserId].role}
                </div>
                <div className="ihub-col-md-3">
                  <span className={`ihub-badge ${usersObject[selectedUserId].active ? 'ihub-badge-success' : 'ihub-badge-danger'}`}>
                    {usersObject[selectedUserId].active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Use Case 2: Product Catalog */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-shopping-cart ihub-me-2"></i>
              Product Catalog Lookup
            </h5>
            <div className="ihub-mb-3">
              <label className="ihub-form-label">Select Product:</label>
              <select
                className="ihub-form-control"
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
              >
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            {productsObject[selectedProductId] && (
              <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                <div>
                  <h6>{productsObject[selectedProductId].name}</h6>
                  <p className="text-muted ihub-mb-1">Category: {productsObject[selectedProductId].category}</p>
                  <p className="text-muted ihub-mb-0">Price: ${productsObject[selectedProductId].price}</p>
                </div>
                <div>
                  <span className={`ihub-badge ${productsObject[selectedProductId].inStock ? 'ihub-badge-success' : 'ihub-badge-warning'}`}>
                    {productsObject[selectedProductId].inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Implementation Examples</h2>
        
        <div className="ihub-card ihub-p-4">
          <h5>Common Implementation Patterns</h5>
          
          <div className="ihub-mb-4">
            <h6>1. State Management with Redux/Context</h6>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// In reducer or state management
const usersReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_USERS':
      return {
        ...state,
        users: convertArrayToObject(action.payload),
        usersList: action.payload
      };
    case 'UPDATE_USER':
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.id]: action.payload
        }
      };
  }
};`}
            </pre>
          </div>

          <div className="ihub-mb-4">
            <h6>2. Form Field Mapping</h6>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Convert form fields array to lookup object
const formFields = [
  { id: 'username', label: 'Username', required: true },
  { id: 'email', label: 'Email', required: true },
  { id: 'phone', label: 'Phone', required: false }
];

const fieldsMap = convertArrayToObject(formFields);

// Quick access to field properties
const isRequired = fieldsMap['email'].required; // true
const label = fieldsMap['username'].label; // 'Username'`}
            </pre>
          </div>

          <div className="ihub-mb-4">
            <h6>3. API Response Processing</h6>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Process API response for faster lookups
const processAPIResponse = async () => {
  const response = await fetch('/api/categories');
  const categoriesArray = await response.json();
  
  // Convert to object for O(1) lookups
  const categoriesMap = convertArrayToObject(categoriesArray);
  
  // Store both array (for rendering lists) and object (for lookups)
  setState({
    categoriesList: categoriesArray,
    categoriesMap: categoriesMap
  });
};`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConvertArrayToObjectExamples;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { convertArrayToObject } from '@instincthub/react-ui/lib';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { convertArrayToObject } from '@instincthub/react-ui/lib';

interface Category {
  id: string;
  title: string;
  status: boolean;
}

function CategoryComponent() {
  const categories: Category[] = [
    { id: "1", title: "Tech", status: true },
    { id: "2", title: "Design", status: false }
  ];

  const categoryMap = convertArrayToObject(categories);
  
  // Fast O(1) lookup instead of O(n) array.find()
  const techCategory = categoryMap["1"];

  return (
    <div>
      <h3>{techCategory.title}</h3>
      <p>Status: {techCategory.status ? 'Active' : 'Inactive'}</p>
    </div>
  );
}
```

## 🔧 Function Signature

```tsx
convertArrayToObject<T extends { id: string }>(arr: T[]): { [key: string]: T }
```

### Parameters

- `arr` (Array): Array of objects, each must have an `id` property of type string

### Returns

- `Object`: An object where keys are the `id` values and values are the original array items

## 📝 Type Safety

The function is fully type-safe and requires:
- Array items must have an `id` property
- The `id` property must be of type `string`
- Returns a typed object maintaining the original item structure

```tsx
// ✅ Valid - items have string id property
const valid = [
  { id: "1", name: "Item 1" },
  { id: "2", name: "Item 2" }
];

// ❌ Invalid - id is number instead of string
const invalid = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" }
];

// ❌ Invalid - no id property
const noId = [
  { name: "Item 1" },
  { name: "Item 2" }
];
```

## 💡 Use Cases

- **State Management**: Convert API responses for faster lookups in Redux/Context
- **Form Field Mapping**: Transform form configuration arrays to lookup objects
- **User/Role Management**: Quick access to user data by ID
- **Product Catalogs**: Fast product lookups in e-commerce applications
- **Category Systems**: Efficient category data access
- **Cache Optimization**: Transform list data for O(1) access patterns
- **Dropdown Options**: Convert options arrays to lookup objects

## ⚡ Performance Benefits

- **Time Complexity**: O(1) lookup vs O(n) array search
- **Memory Efficient**: Single conversion, multiple fast accesses
- **Scalability**: Performance doesn't degrade with larger datasets
- **Type Safety**: Full TypeScript support with inference

## 🔗 Related Utilities

- [convertArrayToFormData](./convertArrayToFormData.md) - Convert arrays to FormData
- [getPriceObjects](./getPriceObjects.md) - Process pricing data structures
- [helpFunction](./helpFunction.md) - General utility functions collection