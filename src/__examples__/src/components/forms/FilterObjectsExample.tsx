"use client";

import React, { useState } from "react";
import { FilterObjects, Badge } from "../../../../index";

const FilterObjectsExample: React.FC = () => {
  const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);

  const employeeData = {
    employees: [
      { 
        id: 1, 
        name: "John Doe", 
        email: "john@company.com", 
        department: "Engineering", 
        role: "Senior Developer",
        salary: 95000,
        experience: 8,
        skills: ["React", "TypeScript", "Node.js"],
        location: "New York",
        startDate: "2020-03-15",
        isActive: true
      },
      { 
        id: 2, 
        name: "Jane Smith", 
        email: "jane@company.com", 
        department: "Design", 
        role: "UI/UX Designer",
        salary: 78000,
        experience: 5,
        skills: ["Figma", "Adobe XD", "Prototyping"],
        location: "San Francisco",
        startDate: "2021-07-20",
        isActive: true
      },
      { 
        id: 3, 
        name: "Bob Johnson", 
        email: "bob@company.com", 
        department: "Marketing", 
        role: "Marketing Manager",
        salary: 85000,
        experience: 12,
        skills: ["SEO", "Analytics", "Social Media"],
        location: "Chicago",
        startDate: "2019-01-10",
        isActive: false
      },
      { 
        id: 4, 
        name: "Alice Brown", 
        email: "alice@company.com", 
        department: "Engineering", 
        role: "DevOps Engineer",
        salary: 92000,
        experience: 6,
        skills: ["AWS", "Docker", "Kubernetes"],
        location: "Austin",
        startDate: "2021-11-05",
        isActive: true
      }
    ],
    metadata: {
      totalCount: 4,
      departments: ["Engineering", "Design", "Marketing"],
      locations: ["New York", "San Francisco", "Chicago", "Austin"]
    }
  };

  const productCatalog = {
    products: [
      {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        brand: "AudioTech",
        price: 199.99,
        specifications: {
          batteryLife: "30 hours",
          connectivity: ["Bluetooth 5.0", "USB-C"],
          weight: "250g"
        },
        availability: {
          inStock: true,
          quantity: 150,
          warehouse: "West Coast"
        },
        ratings: {
          average: 4.5,
          totalReviews: 234
        }
      },
      {
        id: 2,
        name: "Gaming Laptop",
        category: "Computers",
        brand: "GameTech",
        price: 1299.99,
        specifications: {
          processor: "Intel i7",
          ram: "16GB",
          storage: "512GB SSD",
          graphics: "RTX 3060"
        },
        availability: {
          inStock: true,
          quantity: 25,
          warehouse: "East Coast"
        },
        ratings: {
          average: 4.8,
          totalReviews: 89
        }
      },
      {
        id: 3,
        name: "Smart Watch",
        category: "Electronics",
        brand: "WearTech",
        price: 299.99,
        specifications: {
          batteryLife: "7 days",
          display: "AMOLED",
          waterRating: "5ATM"
        },
        availability: {
          inStock: false,
          quantity: 0,
          warehouse: "Central"
        },
        ratings: {
          average: 4.2,
          totalReviews: 156
        }
      }
    ],
    categories: ["Electronics", "Computers", "Wearables"],
    brands: ["AudioTech", "GameTech", "WearTech"]
  };

  const eventSchedule = {
    events: [
      {
        id: 1,
        title: "React Conference 2024",
        type: "Conference",
        organizer: {
          name: "Tech Events Inc",
          contact: "events@techevents.com"
        },
        schedule: {
          startDate: "2024-03-15",
          endDate: "2024-03-17",
          duration: 3,
          timezone: "PST"
        },
        location: {
          venue: "Convention Center",
          city: "San Francisco",
          country: "USA",
          isVirtual: false
        },
        attendees: {
          registered: 1200,
          capacity: 1500,
          waitlist: 50
        },
        pricing: {
          regular: 299,
          student: 149,
          vip: 599
        }
      },
      {
        id: 2,
        title: "Design Thinking Workshop",
        type: "Workshop",
        organizer: {
          name: "Design Academy",
          contact: "workshop@designacademy.com"
        },
        schedule: {
          startDate: "2024-04-10",
          endDate: "2024-04-10",
          duration: 1,
          timezone: "EST"
        },
        location: {
          venue: "Creative Space",
          city: "New York",
          country: "USA",
          isVirtual: false
        },
        attendees: {
          registered: 45,
          capacity: 50,
          waitlist: 5
        },
        pricing: {
          regular: 199,
          student: 99,
          vip: 299
        }
      }
    ],
    eventTypes: ["Conference", "Workshop", "Seminar", "Meetup"],
    cities: ["San Francisco", "New York", "Chicago", "Austin"]
  };

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>FilterObjects Examples</h1>
        <p>Advanced object filtering component for complex nested data structures</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Employee Data Filter */}
        <div className="ihub-example-card">
          <h3>Employee Data Filter</h3>
          <p>Filter employees with nested object properties and complex criteria</p>
          
          <FilterObjects
            data={employeeData.employees}
            onFilteredData={setFilteredEmployees}
            filterConfig={{
              searchFields: [
                { path: "name", weight: 1.0 },
                { path: "email", weight: 0.8 },
                { path: "role", weight: 0.9 },
                { path: "skills", weight: 0.7 }
              ],
              filters: [
                {
                  key: "department",
                  label: "Department",
                  type: "select",
                  path: "department",
                  options: employeeData.metadata.departments.map(dept => ({
                    value: dept,
                    label: dept
                  }))
                },
                {
                  key: "location",
                  label: "Location",
                  type: "multiselect",
                  path: "location",
                  options: employeeData.metadata.locations.map(loc => ({
                    value: loc,
                    label: loc
                  }))
                },
                {
                  key: "salary",
                  label: "Salary Range",
                  type: "range",
                  path: "salary",
                  min: 50000,
                  max: 120000,
                  step: 5000,
                  formatter: (value: number) => `$${value.toLocaleString()}`
                },
                {
                  key: "experience",
                  label: "Years of Experience",
                  type: "range",
                  path: "experience",
                  min: 0,
                  max: 20,
                  step: 1
                },
                {
                  key: "isActive",
                  label: "Employment Status",
                  type: "boolean",
                  path: "isActive",
                  trueLabel: "Active",
                  falseLabel: "Inactive"
                }
              ],
              sortOptions: [
                { key: "name", label: "Name", path: "name" },
                { key: "salary", label: "Salary", path: "salary" },
                { key: "experience", label: "Experience", path: "experience" },
                { key: "startDate", label: "Start Date", path: "startDate" }
              ]
            }}
            showSearchBar={true}
            showResultCount={true}
            showClearFilters={true}
          />
          
          <div className="ihub-filtered-results">
            <h4>Filtered Employees ({filteredEmployees.length}):</h4>
            <div className="ihub-employee-list">
              {filteredEmployees.map(employee => (
                <div key={employee.id} className="ihub-employee-card">
                  <div className="ihub-employee-header">
                    <h5>{employee.name}</h5>
                    <Badge text={employee.isActive ? "Active" : "Inactive"} 
                           variant={employee.isActive ? "success" : "warning"} />
                  </div>
                  <div className="ihub-employee-details">
                    <p><strong>Role:</strong> {employee.role}</p>
                    <p><strong>Department:</strong> {employee.department}</p>
                    <p><strong>Location:</strong> {employee.location}</p>
                    <p><strong>Salary:</strong> ${employee.salary.toLocaleString()}</p>
                    <p><strong>Experience:</strong> {employee.experience} years</p>
                  </div>
                  <div className="ihub-employee-skills">
                    {employee.skills.map((skill: string, index: number) => (
                      <Badge key={index} text={skill} variant="secondary" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Catalog Filter */}
        <div className="ihub-example-card">
          <h3>Product Catalog Filter</h3>
          <p>Filter products with deeply nested object properties</p>
          
          <FilterObjects
            data={productCatalog.products}
            onFilteredData={setFilteredProducts}
            filterConfig={{
              searchFields: [
                { path: "name", weight: 1.0 },
                { path: "brand", weight: 0.9 },
                { path: "specifications.processor", weight: 0.6 },
                { path: "specifications.graphics", weight: 0.6 }
              ],
              filters: [
                {
                  key: "category",
                  label: "Category",
                  type: "select",
                  path: "category",
                  options: productCatalog.categories.map(cat => ({
                    value: cat,
                    label: cat
                  }))
                },
                {
                  key: "brand",
                  label: "Brand",
                  type: "multiselect",
                  path: "brand",
                  options: productCatalog.brands.map(brand => ({
                    value: brand,
                    label: brand
                  }))
                },
                {
                  key: "price",
                  label: "Price Range",
                  type: "range",
                  path: "price",
                  min: 0,
                  max: 2000,
                  step: 50,
                  formatter: (value: number) => `$${value}`
                },
                {
                  key: "inStock",
                  label: "Availability",
                  type: "boolean",
                  path: "availability.inStock",
                  trueLabel: "In Stock",
                  falseLabel: "Out of Stock"
                },
                {
                  key: "rating",
                  label: "Minimum Rating",
                  type: "range",
                  path: "ratings.average",
                  min: 0,
                  max: 5,
                  step: 0.1
                }
              ],
              nestedFilters: [
                {
                  key: "warehouse",
                  label: "Warehouse Location",
                  type: "select",
                  path: "availability.warehouse",
                  options: [
                    { value: "", label: "All Warehouses" },
                    { value: "West Coast", label: "West Coast" },
                    { value: "East Coast", label: "East Coast" },
                    { value: "Central", label: "Central" }
                  ]
                }
              ]
            }}
            showSearchBar={true}
            showResultCount={true}
            showFilterSummary={true}
            enableAdvancedSearch={true}
          />
          
          <div className="ihub-filtered-results">
            <div className="ihub-product-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="ihub-product-card">
                  <h5>{product.name}</h5>
                  <div className="ihub-product-meta">
                    <Badge text={product.category} variant="primary" />
                    <Badge text={product.brand} variant="secondary" />
                  </div>
                  <div className="ihub-product-price">
                    <strong>${product.price}</strong>
                  </div>
                  <div className="ihub-product-rating">
                    ⭐ {product.ratings.average} ({product.ratings.totalReviews} reviews)
                  </div>
                  <div className="ihub-product-availability">
                    <Badge 
                      text={product.availability.inStock ? "In Stock" : "Out of Stock"} 
                      variant={product.availability.inStock ? "success" : "danger"} 
                    />
                    {product.availability.inStock && (
                      <span> • {product.availability.quantity} units</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Event Schedule Filter */}
        <div className="ihub-example-card">
          <h3>Event Schedule Filter</h3>
          <p>Complex event filtering with multiple nested object levels</p>
          
          <FilterObjects
            data={eventSchedule.events}
            onFilteredData={setFilteredEvents}
            filterConfig={{
              searchFields: [
                { path: "title", weight: 1.0 },
                { path: "organizer.name", weight: 0.8 },
                { path: "location.city", weight: 0.7 },
                { path: "location.venue", weight: 0.6 }
              ],
              filters: [
                {
                  key: "type",
                  label: "Event Type",
                  type: "select",
                  path: "type",
                  options: eventSchedule.eventTypes.map(type => ({
                    value: type,
                    label: type
                  }))
                },
                {
                  key: "city",
                  label: "City",
                  type: "multiselect",
                  path: "location.city",
                  options: eventSchedule.cities.map(city => ({
                    value: city,
                    label: city
                  }))
                },
                {
                  key: "duration",
                  label: "Duration (days)",
                  type: "range",
                  path: "schedule.duration",
                  min: 1,
                  max: 7,
                  step: 1
                },
                {
                  key: "price",
                  label: "Regular Price",
                  type: "range",
                  path: "pricing.regular",
                  min: 0,
                  max: 1000,
                  step: 25,
                  formatter: (value: number) => `$${value}`
                },
                {
                  key: "isVirtual",
                  label: "Event Format",
                  type: "boolean",
                  path: "location.isVirtual",
                  trueLabel: "Virtual",
                  falseLabel: "In-Person"
                }
              ],
              customFilters: [
                {
                  key: "availability",
                  label: "Ticket Availability",
                  filter: (items: any[], value: string) => {
                    if (!value) return items;
                    return items.filter(event => {
                      const available = event.attendees.capacity - event.attendees.registered;
                      if (value === "high") return available > 100;
                      if (value === "medium") return available > 10 && available <= 100;
                      if (value === "low") return available <= 10;
                      return true;
                    });
                  },
                  options: [
                    { value: "", label: "All" },
                    { value: "high", label: "High Availability (100+)" },
                    { value: "medium", label: "Medium Availability (10-100)" },
                    { value: "low", label: "Low Availability (<10)" }
                  ]
                }
              ]
            }}
            showSearchBar={true}
            showResultCount={true}
            showFilterChips={true}
            enableSaveFilters={true}
          />
          
          <div className="ihub-filtered-results">
            <div className="ihub-event-list">
              {filteredEvents.map(event => (
                <div key={event.id} className="ihub-event-card">
                  <div className="ihub-event-header">
                    <h5>{event.title}</h5>
                    <Badge text={event.type} variant="primary" />
                  </div>
                  <div className="ihub-event-details">
                    <p><strong>Organizer:</strong> {event.organizer.name}</p>
                    <p><strong>Date:</strong> {event.schedule.startDate} - {event.schedule.endDate}</p>
                    <p><strong>Duration:</strong> {event.schedule.duration} days</p>
                    <p><strong>Location:</strong> {event.location.venue}, {event.location.city}</p>
                    <p><strong>Price:</strong> ${event.pricing.regular} (Regular)</p>
                  </div>
                  <div className="ihub-event-stats">
                    <div className="ihub-stat">
                      <strong>Registered:</strong> {event.attendees.registered}
                    </div>
                    <div className="ihub-stat">
                      <strong>Capacity:</strong> {event.attendees.capacity}
                    </div>
                    <div className="ihub-stat">
                      <strong>Available:</strong> {event.attendees.capacity - event.attendees.registered}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Object Filtering</h3>
          <pre><code>{`import { FilterObjects } from '@instincthub/react-ui';

<FilterObjects
  data={employees}
  onFilteredData={setFilteredEmployees}
  filterConfig={{
    searchFields: [
      { path: "name", weight: 1.0 },
      { path: "email", weight: 0.8 }
    ],
    filters: [
      {
        key: "department",
        label: "Department",
        type: "select",
        path: "department",
        options: departmentOptions
      }
    ]
  }}
  showSearchBar={true}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Nested Object Filtering</h3>
          <pre><code>{`<FilterObjects
  data={products}
  onFilteredData={setFilteredProducts}
  filterConfig={{
    filters: [
      {
        key: "inStock",
        label: "Availability",
        type: "boolean",
        path: "availability.inStock"
      },
      {
        key: "rating",
        label: "Rating",
        type: "range",
        path: "ratings.average",
        min: 0,
        max: 5,
        step: 0.1
      }
    ],
    nestedFilters: [
      {
        key: "warehouse",
        path: "availability.warehouse",
        type: "select"
      }
    ]
  }}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Custom Filter Logic</h3>
          <pre><code>{`<FilterObjects
  data={events}
  filterConfig={{
    customFilters: [
      {
        key: "availability",
        label: "Ticket Availability",
        filter: (items, value) => {
          return items.filter(event => {
            const available = event.capacity - event.registered;
            return available > parseInt(value);
          });
        },
        options: availabilityOptions
      }
    ]
  }}
  enableSaveFilters={true}
  showFilterChips={true}
/>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default FilterObjectsExample;