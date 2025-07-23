"use client";

import React, { useState } from "react";
import { FilterArray, SearchField, Badge } from "../../../../index";

const FilterArrayExample: React.FC = () => {
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);

  const sampleUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", department: "IT", status: "Active", joinDate: "2023-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", department: "Marketing", status: "Active", joinDate: "2023-02-20" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Manager", department: "Sales", status: "Inactive", joinDate: "2022-11-10" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User", department: "IT", status: "Active", joinDate: "2023-03-05" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Admin", department: "HR", status: "Active", joinDate: "2023-01-08" },
    { id: 6, name: "Eva Davis", email: "eva@example.com", role: "User", department: "Marketing", status: "Pending", joinDate: "2023-04-12" }
  ];

  const sampleProducts = [
    { id: 1, name: "Laptop Pro", category: "Electronics", price: 1299, brand: "TechBrand", inStock: true, rating: 4.8 },
    { id: 2, name: "Wireless Headphones", category: "Electronics", price: 199, brand: "AudioTech", inStock: true, rating: 4.5 },
    { id: 3, name: "Office Chair", category: "Furniture", price: 299, brand: "ComfortSeats", inStock: false, rating: 4.2 },
    { id: 4, name: "Coffee Maker", category: "Appliances", price: 89, brand: "BrewMaster", inStock: true, rating: 4.6 },
    { id: 5, name: "Smartphone", category: "Electronics", price: 699, brand: "MobileTech", inStock: true, rating: 4.7 },
    { id: 6, name: "Desk Lamp", category: "Furniture", price: 45, brand: "LightWorks", inStock: true, rating: 4.3 }
  ];

  const sampleCourses = [
    { id: 1, title: "React Fundamentals", instructor: "John Smith", category: "Frontend", level: "Beginner", duration: 8, students: 1234, rating: 4.8, price: 49 },
    { id: 2, title: "Advanced TypeScript", instructor: "Sarah Jones", category: "Programming", level: "Advanced", duration: 12, students: 856, rating: 4.9, price: 79 },
    { id: 3, title: "Node.js Backend", instructor: "Mike Brown", category: "Backend", level: "Intermediate", duration: 10, students: 2341, rating: 4.7, price: 69 },
    { id: 4, title: "UI/UX Design", instructor: "Lisa Chen", category: "Design", level: "Beginner", duration: 6, students: 987, rating: 4.6, price: 59 },
    { id: 5, title: "Python Data Science", instructor: "David Lee", category: "Data Science", level: "Intermediate", duration: 15, students: 1567, rating: 4.8, price: 89 },
    { id: 6, title: "DevOps Practices", instructor: "Anna Wilson", category: "DevOps", level: "Advanced", duration: 14, students: 743, rating: 4.9, price: 99 }
  ];

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>FilterArray Examples</h1>
        <p>Array filtering component with multiple filter types and advanced search capabilities</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Array Filter */}
        <div className="ihub-example-card">
          <h3>Basic User Filter</h3>
          <p>Simple array filtering with multiple criteria</p>
          
          <FilterArray
            data={sampleUsers}
            onFilteredData={setFilteredUsers}
            searchFields={["name", "email", "department"]}
            filterFields={[
              {
                key: "role",
                label: "Role",
                type: "select",
                options: [
                  { value: "", label: "All Roles" },
                  { value: "Admin", label: "Admin" },
                  { value: "Manager", label: "Manager" },
                  { value: "User", label: "User" }
                ]
              },
              {
                key: "status",
                label: "Status",
                type: "select",
                options: [
                  { value: "", label: "All Statuses" },
                  { value: "Active", label: "Active" },
                  { value: "Inactive", label: "Inactive" },
                  { value: "Pending", label: "Pending" }
                ]
              }
            ]}
            sortFields={[
              { key: "name", label: "Name" },
              { key: "joinDate", label: "Join Date" },
              { key: "department", label: "Department" }
            ]}
            showSearchBar={true}
            showResultCount={true}
          />
          
          <div className="ihub-filtered-results">
            <h4>Filtered Users ({filteredUsers.length}):</h4>
            <div className="ihub-user-list">
              {filteredUsers.map(user => (
                <div key={user.id} className="ihub-user-item">
                  <div className="ihub-user-info">
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                  </div>
                  <div className="ihub-user-badges">
                    <Badge text={user.role} variant="primary" />
                    <Badge text={user.status} variant={user.status === 'Active' ? 'success' : user.status === 'Pending' ? 'warning' : 'danger'} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced Product Filter */}
        <div className="ihub-example-card">
          <h3>Advanced Product Filter</h3>
          <p>Complex filtering with range filters and multiple data types</p>
          
          <FilterArray
            data={sampleProducts}
            onFilteredData={setFilteredProducts}
            searchFields={["name", "brand", "category"]}
            filterFields={[
              {
                key: "category",
                label: "Category",
                type: "select",
                options: [
                  { value: "", label: "All Categories" },
                  { value: "Electronics", label: "Electronics" },
                  { value: "Furniture", label: "Furniture" },
                  { value: "Appliances", label: "Appliances" }
                ]
              },
              {
                key: "price",
                label: "Price Range",
                type: "range",
                min: 0,
                max: 1500,
                step: 50
              },
              {
                key: "rating",
                label: "Minimum Rating",
                type: "range",
                min: 0,
                max: 5,
                step: 0.1
              },
              {
                key: "inStock",
                label: "Availability",
                type: "checkbox",
                options: [
                  { value: true, label: "In Stock Only" }
                ]
              }
            ]}
            sortFields={[
              { key: "name", label: "Name" },
              { key: "price", label: "Price" },
              { key: "rating", label: "Rating" },
              { key: "category", label: "Category" }
            ]}
            showSearchBar={true}
            showResultCount={true}
            showClearFilters={true}
            enableAdvancedSearch={true}
          />
          
          <div className="ihub-filtered-results">
            <div className="ihub-product-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="ihub-product-card">
                  <h5>{product.name}</h5>
                  <p className="ihub-product-brand">{product.brand}</p>
                  <div className="ihub-product-details">
                    <span className="ihub-price">${product.price}</span>
                    <span className="ihub-rating">⭐ {product.rating}</span>
                  </div>
                  <div className="ihub-product-status">
                    <Badge text={product.category} variant="secondary" />
                    <Badge text={product.inStock ? "In Stock" : "Out of Stock"} 
                           variant={product.inStock ? "success" : "danger"} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Course Filter with Custom Logic */}
        <div className="ihub-example-card">
          <h3>Course Filter with Custom Logic</h3>
          <p>Filtering with custom filter functions and complex logic</p>
          
          <FilterArray
            data={sampleCourses}
            onFilteredData={setFilteredCourses}
            searchFields={["title", "instructor", "category"]}
            filterFields={[
              {
                key: "level",
                label: "Difficulty Level",
                type: "multiselect",
                options: [
                  { value: "Beginner", label: "Beginner" },
                  { value: "Intermediate", label: "Intermediate" },
                  { value: "Advanced", label: "Advanced" }
                ]
              },
              {
                key: "duration",
                label: "Duration (hours)",
                type: "range",
                min: 0,
                max: 20,
                step: 1
              },
              {
                key: "price",
                label: "Price Range",
                type: "range",
                min: 0,
                max: 100,
                step: 10
              },
              {
                key: "students",
                label: "Minimum Students",
                type: "number",
                min: 0
              }
            ]}
            customFilters={[
              {
                key: "popularity",
                label: "Popularity",
                filter: (items: any[], value: string) => {
                  if (!value) return items;
                  const threshold = value === "high" ? 1000 : 500;
                  return items.filter(item => item.students >= threshold);
                },
                options: [
                  { value: "", label: "All" },
                  { value: "high", label: "High (1000+ students)" },
                  { value: "medium", label: "Medium (500+ students)" }
                ]
              }
            ]}
            sortFields={[
              { key: "title", label: "Title" },
              { key: "rating", label: "Rating" },
              { key: "students", label: "Students" },
              { key: "price", label: "Price" }
            ]}
            showSearchBar={true}
            showResultCount={true}
            showClearFilters={true}
            showFilterSummary={true}
            enableSaveFilters={true}
            savedFilters={[
              { name: "Beginner Courses", filters: { level: ["Beginner"], price: [0, 60] } },
              { name: "Popular Advanced", filters: { level: ["Advanced"], popularity: "high" } }
            ]}
          />
          
          <div className="ihub-filtered-results">
            <div className="ihub-course-list">
              {filteredCourses.map(course => (
                <div key={course.id} className="ihub-course-item">
                  <div className="ihub-course-header">
                    <h5>{course.title}</h5>
                    <span className="ihub-course-price">${course.price}</span>
                  </div>
                  <p className="ihub-instructor">by {course.instructor}</p>
                  <div className="ihub-course-meta">
                    <span>⭐ {course.rating}</span>
                    <span>👥 {course.students} students</span>
                    <span>🕒 {course.duration}h</span>
                  </div>
                  <div className="ihub-course-badges">
                    <Badge text={course.category} variant="primary" />
                    <Badge text={course.level} variant={
                      course.level === 'Beginner' ? 'success' : 
                      course.level === 'Intermediate' ? 'warning' : 'danger'
                    } />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Filter */}
        <div className="ihub-example-card">
          <h3>Real-time Interactive Filter</h3>
          <p>Live filtering with debounced search and instant updates</p>
          
          <FilterArray
            data={sampleUsers}
            onFilteredData={setFilteredUsers}
            searchFields={["name", "email", "department"]}
            filterFields={[
              {
                key: "department",
                label: "Department",
                type: "multiselect",
                options: [
                  { value: "IT", label: "IT" },
                  { value: "Marketing", label: "Marketing" },
                  { value: "Sales", label: "Sales" },
                  { value: "HR", label: "HR" }
                ]
              }
            ]}
            sortFields={[
              { key: "name", label: "Name" },
              { key: "joinDate", label: "Join Date" }
            ]}
            showSearchBar={true}
            searchDebounceMs={300}
            liveFilter={true}
            showResultCount={true}
            showFilterChips={true}
            allowFilterCombination="AND"
          />
          
          <div className="ihub-filter-stats">
            <div className="ihub-stat-item">
              <strong>Total Records:</strong> {sampleUsers.length}
            </div>
            <div className="ihub-stat-item">
              <strong>Filtered Results:</strong> {filteredUsers.length}
            </div>
            <div className="ihub-stat-item">
              <strong>Filter Efficiency:</strong> {((filteredUsers.length / sampleUsers.length) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { FilterArray } from '@instincthub/react-ui';

const [filteredData, setFilteredData] = useState([]);

<FilterArray
  data={userData}
  onFilteredData={setFilteredData}
  searchFields={["name", "email"]}
  filterFields={[
    {
      key: "role",
      label: "Role",
      type: "select",
      options: [
        { value: "", label: "All Roles" },
        { value: "Admin", label: "Admin" },
        { value: "User", label: "User" }
      ]
    }
  ]}
  showSearchBar={true}
  showResultCount={true}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Advanced Filtering</h3>
          <pre><code>{`<FilterArray
  data={products}
  onFilteredData={setFilteredProducts}
  searchFields={["name", "brand"]}
  filterFields={[
    {
      key: "price",
      label: "Price Range",
      type: "range",
      min: 0,
      max: 1000,
      step: 50
    },
    {
      key: "category",
      label: "Categories",
      type: "multiselect",
      options: categoryOptions
    }
  ]}
  customFilters={[
    {
      key: "popularity",
      label: "Popularity",
      filter: (items, value) => items.filter(item => item.sales >= value)
    }
  ]}
  enableSaveFilters={true}
  showFilterSummary={true}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Real-time Filtering</h3>
          <pre><code>{`<FilterArray
  data={data}
  onFilteredData={setFilteredData}
  searchFields={["title", "description"]}
  searchDebounceMs={300}
  liveFilter={true}
  showFilterChips={true}
  allowFilterCombination="AND"
  showClearFilters={true}
/>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default FilterArrayExample;