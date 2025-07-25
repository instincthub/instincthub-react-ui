"use client";

import React, { useState } from "react";
import { FilterObjects, Badge } from "../../../../index";
import { FilterObjectsType } from "../../../../types";

const FilterObjectsExample: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<FilterObjectsType | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<FilterObjectsType | null>(null);
  const [selectedRole, setSelectedRole] = useState<FilterObjectsType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<FilterObjectsType | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<FilterObjectsType | null>(null);

  // Sample department options
  const departmentOptions: FilterObjectsType[] = [
    { id: 1, title: "Engineering", description: "Software development and technical roles", color: "blue" },
    { id: 2, title: "Design", description: "UI/UX and visual design", color: "purple" },
    { id: 3, title: "Marketing", description: "Marketing and growth initiatives", color: "green" },
    { id: 4, title: "Sales", description: "Sales and business development", color: "orange" },
    { id: 5, title: "HR", description: "Human resources and talent management", color: "red" }
  ];

  // Sample product options
  const productOptions: FilterObjectsType[] = [
    { id: 1, title: "Laptop Pro", category: "Electronics", price: 1299, brand: "TechBrand" },
    { id: 2, title: "Wireless Headphones", category: "Electronics", price: 199, brand: "AudioTech" },
    { id: 3, title: "Office Chair", category: "Furniture", price: 299, brand: "ComfortSeats" },
    { id: 4, title: "Coffee Maker", category: "Appliances", price: 89, brand: "BrewMaster" },
    { id: 5, title: "Standing Desk", category: "Furniture", price: 549, brand: "WorkSpace" }
  ];

  // Sample role options  
  const roleOptions: FilterObjectsType[] = [
    { id: 1, title: "Senior Developer", level: "Senior", department: "Engineering" },
    { id: 2, title: "UI/UX Designer", level: "Mid", department: "Design" },
    { id: 3, title: "Marketing Manager", level: "Senior", department: "Marketing" },
    { id: 4, title: "Sales Representative", level: "Junior", department: "Sales" },
    { id: 5, title: "HR Specialist", level: "Mid", department: "HR" }
  ];

  // Sample category options
  const categoryOptions: FilterObjectsType[] = [
    { id: 1, title: "Electronics", icon: "💻", count: 156 },
    { id: 2, title: "Furniture", icon: "🪑", count: 89 },
    { id: 3, title: "Appliances", icon: "🏠", count: 67 },
    { id: 4, title: "Books", icon: "📚", count: 234 },
    { id: 5, title: "Clothing", icon: "👕", count: 445 }
  ];

  // Sample status options
  const statusOptions: FilterObjectsType[] = [
    { id: 1, title: "Active", color: "success", description: "Currently active and operational" },
    { id: 2, title: "Inactive", color: "danger", description: "Not currently active" },
    { id: 3, title: "Pending", color: "warning", description: "Awaiting approval or action" },
    { id: 4, title: "Suspended", color: "secondary", description: "Temporarily suspended" }
  ];

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>FilterObjects Examples</h1>
        <p>Object-based dropdown component for selecting from complex data structures</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic FilterObjects */}
        <div className="ihub-example-card">
          <h3>Basic Department Filter</h3>
          <p>Simple object dropdown with department selection</p>
          
          <FilterObjects
            options={departmentOptions}
            name="department"
            label="Select Department"
            setValue={setSelectedDepartment}
            defaultValue=""
          />
          
          <div className="ihub-selection-display">
            <p>Selected Department: 
              {selectedDepartment ? (
                <Badge text={selectedDepartment.title} variant="primary" />
              ) : (
                <span> None selected</span>
              )}
            </p>
            {selectedDepartment && (
              <p className="text-sm text-gray-600">
                Description: {selectedDepartment.description}
              </p>
            )}
          </div>
        </div>

        {/* Product Filter with Default Value */}
        <div className="ihub-example-card">
          <h3>Product Filter with Default</h3>
          <p>Product selection with pre-selected default value</p>
          
          <FilterObjects
            options={productOptions}
            name="product"
            label="Select Product"
            setValue={setSelectedProduct}
            defaultValue={productOptions[0]}
            required={true}
          />
          
          <div className="ihub-selection-display">
            <p>Selected Product: 
              {selectedProduct ? (
                <Badge text={selectedProduct.title} variant="info" />
              ) : (
                <Badge text={productOptions[0].title} variant="info" />
              )}
            </p>
            {selectedProduct && (
              <div className="text-sm text-gray-600">
                <p>Category: {selectedProduct.category}</p>
                <p>Price: ${selectedProduct.price}</p>
                <p>Brand: {selectedProduct.brand}</p>
              </div>
            )}
          </div>
        </div>

        {/* Role Filter with Validation */}
        <div className="ihub-example-card">
          <h3>Role Filter with Validation</h3>
          <p>Required dropdown with error state handling</p>
          
          <FilterObjects
            options={roleOptions}
            name="role"
            label="Select Role *"
            setValue={setSelectedRole}
            required={true}
            err={!selectedRole}
            error={!selectedRole ? "Role selection is required" : ""}
          />
          
          <div className="ihub-selection-display">
            <p>Selected Role: 
              {selectedRole ? (
                <Badge text={selectedRole.title} variant="success" />
              ) : (
                <span className="text-red-500"> Required field</span>
              )}
            </p>
            {selectedRole && (
              <div className="text-sm text-gray-600">
                <p>Level: {selectedRole.level}</p>
                <p>Department: {selectedRole.department}</p>
              </div>
            )}
          </div>
        </div>

        {/* Category Filter with Custom Width */}
        <div className="ihub-example-card">
          <h3>Category Filter with Custom Styling</h3>
          <p>Dropdown with custom width and notes</p>
          
          <FilterObjects
            options={categoryOptions}
            name="category"
            label="Product Category"
            setValue={setSelectedCategory}
            defaultWidth="350px"
            note="Choose a category to filter products"
          />
          
          <div className="ihub-selection-display">
            <p>Selected Category: 
              {selectedCategory ? (
                <span>
                  {selectedCategory.icon} <Badge text={selectedCategory.title} variant="primary" />
                </span>
              ) : (
                <span> None selected</span>
              )}
            </p>
            {selectedCategory && (
              <p className="text-sm text-gray-600">
                Items in category: {selectedCategory.count}
              </p>
            )}
          </div>
        </div>

        {/* Status Filter with Name-Value Callback */}
        <div className="ihub-example-card">
          <h3>Status Filter with Name-Value Callback</h3>
          <p>Dropdown using setNameValue callback pattern</p>
          
          <FilterObjects
            options={statusOptions}
            name="status"
            label="Account Status"
            setNameValue={(name, value) => {
              console.log(`Field ${name} changed to:`, value);
              setSelectedStatus(value);
            }}
            upperCases={false}
          />
          
          <div className="ihub-selection-display">
            <p>Selected Status: 
              {selectedStatus ? (
                <Badge 
                  text={selectedStatus.title} 
                  variant={selectedStatus.color as any || "primary"} 
                />
              ) : (
                <span> None selected</span>
              )}
            </p>
            {selectedStatus && (
              <p className="text-sm text-gray-600">
                Description: {selectedStatus.description}
              </p>
            )}
          </div>
        </div>

        {/* Advanced Filter with Array Props */}
        <div className="ihub-example-card">
          <h3>Advanced Filter with Array Props</h3>
          <p>Dropdown that updates an array of properties and saves cookies</p>
          
          <FilterObjects
            options={departmentOptions}
            name="advancedDepartment"
            label="Department (Advanced)"
            setValue={(value) => {
              console.log("Advanced selection:", value);
            }}
            setArrayProps={(arrayProps, option) => {
              console.log("Array props updated:", arrayProps, "Selected:", option);
            }}
            arrayProps={[]}
            dataName="departmentFilter"
            setCookies="selectedDepartment"
            setObjects={(option) => {
              console.log("Objects callback:", option);
            }}
            status={1}
          />
          
          <div className="ihub-selection-display">
            <p className="text-sm text-gray-600">
              This example demonstrates advanced callbacks and cookie storage.
              Check the browser console for callback outputs.
            </p>
          </div>
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { FilterObjects } from '@instincthub/react-ui';
import { FilterObjectsType } from '@instincthub/react-ui/types';

const [selectedValue, setSelectedValue] = useState<FilterObjectsType | null>(null);
const options: FilterObjectsType[] = [
  { id: 1, title: "Option 1", description: "First option" },
  { id: 2, title: "Option 2", description: "Second option" },
  { id: 3, title: "Option 3", description: "Third option" }
];

<FilterObjects
  options={options}
  name="example"
  label="Select Option"
  setValue={setSelectedValue}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Advanced Configuration</h3>
          <pre><code>{`<FilterObjects
  options={options}
  name="advanced"
  label="Required Field *"
  setValue={setValue}
  defaultValue={options[0]}
  required={true}
  err={hasError}
  error="This field is required"
  defaultWidth="300px"
  note="Additional help text"
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Callbacks and Cookie Storage</h3>
          <pre><code>{`<FilterObjects
  options={options}
  name="callbackExample"
  label="Advanced Example"
  setValue={setValue}
  setNameValue={(name, value) => {
    console.log(\`Field \${name} changed to:\`, value);
  }}
  setArrayProps={(arrayProps, option) => {
    // Handle array update logic
  }}
  setObjects={(option) => {
    // Handle object selection
  }}
  setCookies="filterSelection"
  arrayProps={currentArray}
  dataName="fieldName"
  status={1}
/>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default FilterObjectsExample;