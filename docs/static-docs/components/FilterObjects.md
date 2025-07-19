# FilterObjects

**Category:** Forms | **Type:** component

Object filtering component

## 🏷️ Tags

`forms`, `filter`, `dropdown`, `select`

```tsx
"use client";
import React, { useState } from "react";
import { FilterObjects } from "@instincthub/react-ui";
import { FilterObjectsType } from "@instincthub/react-ui/types";

/**
 * Example component demonstrating various ways to use the FilterObjects component
 */
const FilterObjectsExamples = () => {
  // State for basic example
  const [selectedCategory, setSelectedCategory] = useState<FilterObjectsType | null>(null);
  
  // State for multi-select example
  const [selectedFilters, setSelectedFilters] = useState<FilterObjectsType[]>([]);
  
  // State for form example
  const [formData, setFormData] = useState({
    department: null as FilterObjectsType | null,
    priority: null as FilterObjectsType | null,
    status: null as FilterObjectsType | null,
  });

  // Sample data
  const categories: FilterObjectsType[] = [
    { id: 1, title: "Electronics" },
    { id: 2, title: "Clothing" },
    { id: 3, title: "Books" },
    { id: 4, title: "Home & Garden" },
    { id: 5, title: "Sports & Outdoors" },
  ];

  const departments: FilterObjectsType[] = [
    { id: "sales", title: "Sales Department" },
    { id: "marketing", title: "Marketing Department" },
    { id: "engineering", title: "Engineering Department" },
    { id: "hr", title: "Human Resources" },
    { id: "finance", title: "Finance Department" },
  ];

  const priorities: FilterObjectsType[] = [
    { id: "low", title: "Low Priority" },
    { id: "medium", title: "Medium Priority" },
    { id: "high", title: "High Priority" },
    { id: "urgent", title: "Urgent" },
  ];

  const statusOptions: FilterObjectsType[] = [
    { id: "active", title: "Active" },
    { id: "inactive", title: "Inactive" },
    { id: "pending", title: "Pending" },
    { id: "archived", title: "Archived" },
  ];

  // Handle multi-select
  const handleMultiSelect = (filter: FilterObjectsType) => {
    setSelectedFilters(prev => {
      const exists = prev.find(f => f.id === filter.id);
      if (exists) {
        return prev.filter(f => f.id !== filter.id);
      }
      return [...prev, filter];
    });
  };

  // Handle form field update
  const handleFormFieldUpdate = (fieldName: string, value: FilterObjectsType) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>FilterObjects Examples</h1>

      {/* Basic Usage Example */}
      <div className="ihub-card ihub-mb-4">
        <h2>Basic Filter Selection</h2>
        <p>Simple dropdown filter for selecting a category</p>
        
        <FilterObjects
          options={categories}
          name="category"
          label="Product Category"
          setValue={setSelectedCategory}
          defaultWidth="300px"
          required
        />
        
        {selectedCategory && (
          <div className="ihub-mt-3">
            <p className="ihub-text-success">
              Selected: {selectedCategory.title} (ID: {selectedCategory.id})
            </p>
          </div>
        )}
      </div>

      {/* With Default Value Example */}
      <div className="ihub-card ihub-mb-4">
        <h2>Filter with Default Value</h2>
        <p>Pre-selected filter option</p>
        
        <FilterObjects
          options={departments}
          defaultValue="engineering"
          name="department"
          label="Department"
          setValue={(value) => console.log("Department changed:", value)}
          note="Select your department from the list"
        />
      </div>

      {/* Multiple Filters Example */}
      <div className="ihub-card ihub-mb-4">
        <h2>Multiple Filter Dropdowns</h2>
        <p>Use multiple filters to refine results</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <FilterObjects
              options={departments}
              name="filter_department"
              label="Department"
              setValue={(value) => handleMultiSelect(value)}
              upperCases={true}
            />
          </div>
          
          <div className="ihub-col-md-4">
            <FilterObjects
              options={priorities}
              name="filter_priority"
              label="Priority"
              setValue={(value) => handleMultiSelect(value)}
            />
          </div>
          
          <div className="ihub-col-md-4">
            <FilterObjects
              options={statusOptions}
              name="filter_status"
              label="Status"
              setValue={(value) => handleMultiSelect(value)}
            />
          </div>
        </div>
        
        {selectedFilters.length > 0 && (
          <div className="ihub-mt-3">
            <h4>Active Filters:</h4>
            <div className="ihub-d-flex ihub-flex-wrap" style={{ gap: "10px" }}>
              {selectedFilters.map(filter => (
                <span key={filter.id} className="ihub-badge ihub-badge-primary">
                  {filter.title}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Form Integration Example */}
      <div className="ihub-card ihub-mb-4">
        <h2>Form Integration</h2>
        <p>Using FilterObjects in a form with validation</p>
        
        <form onSubmit={handleSubmit}>
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <FilterObjects
                options={departments}
                name="form_department"
                label="Department *"
                setValue={(value) => handleFormFieldUpdate('department', value)}
                required
                err={!formData.department}
                error={!formData.department ? "Department is required" : ""}
              />
            </div>
            
            <div className="ihub-col-md-6">
              <FilterObjects
                options={priorities}
                name="form_priority"
                label="Priority Level *"
                setValue={(value) => handleFormFieldUpdate('priority', value)}
                required
                err={!formData.priority}
                error={!formData.priority ? "Priority is required" : ""}
              />
            </div>
          </div>
          
          <div className="ihub-row ihub-mt-3">
            <div className="ihub-col-md-6">
              <FilterObjects
                options={statusOptions}
                name="form_status"
                label="Status"
                setValue={(value) => handleFormFieldUpdate('status', value)}
                defaultValue="active"
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="ihub-important-btn ihub-mt-4"
            disabled={!formData.department || !formData.priority}
          >
            Submit Form
          </button>
        </form>
      </div>

      {/* With Cookie Storage Example */}
      <div className="ihub-card ihub-mb-4">
        <h2>Filter with Cookie Storage</h2>
        <p>Persists selected filter in cookies</p>
        
        <FilterObjects
          options={categories}
          name="persistent_category"
          label="Preferred Category"
          setValue={(value) => console.log("Category saved to cookie:", value)}
          setCookies="user_category_preference"
          note="Your selection will be saved for future visits"
        />
      </div>

      {/* Loading State Example */}
      <div className="ihub-card ihub-mb-4">
        <h2>Loading State</h2>
        <p>Filter in loading state</p>
        
        <FilterObjects
          options={[]}
          name="loading_filter"
          label="Loading Options..."
          status={0}
          defaultWidth="250px"
        />
      </div>

      {/* Custom Styling Example */}
      <div className="ihub-card">
        <h2>Custom Width and Styling</h2>
        <p>Filters with different widths and configurations</p>
        
        <div className="ihub-d-flex" style={{ gap: "20px", flexWrap: "wrap" }}>
          <FilterObjects
            options={priorities}
            name="small_filter"
            label="Small"
            defaultWidth="150px"
          />
          
          <FilterObjects
            options={departments}
            name="medium_filter"
            label="Medium"
            defaultWidth="250px"
          />
          
          <FilterObjects
            options={categories}
            name="large_filter"
            label="Large"
            defaultWidth="400px"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterObjectsExamples;
```

## 🔗 Related Components

- [SearchFieldDB](./SearchFieldDB.md) - Database search field component
- [SearchObjectsFromDB](./SearchObjectsFromDB.md) - Search objects from database
- [InputSearchDropdown](./InputSearchDropdown.md) - Input with search dropdown
- [ActionDropdown](./ActionDropdown.md) - Dropdown component for actions
- [FilterBy](./FilterBy.md) - Filter by component

