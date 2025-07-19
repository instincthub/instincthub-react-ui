# FilterArray

**Category:** Forms | **Type:** component

Array filtering component with dropdown selection and customizable options

## 🏷️ Tags

`forms`, `filter`, `dropdown`, `selection`, `array`

```tsx
"use client";
import React, { useState } from "react";
import {
  FilterArray,
  Card,
  Badge,
  IHubTable,
} from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";
import {
  FunnelIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

/**
 * Example component demonstrating various ways to use the FilterArray
 */
const FilterArrayExamples = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [formData, setFormData] = useState<{[key: string]: string}>({});
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Sample data
  const categories = ["Technology", "Design", "Marketing", "Sales", "Support", "HR"];
  const statuses = ["Active", "Inactive", "Pending", "Archived"];
  const priorities = ["Low", "Medium", "High", "Critical"];
  const departments = ["Engineering", "Product", "Marketing", "Sales", "Customer Success"];
  const countries = ["United States", "Canada", "United Kingdom", "Germany", "France", "Australia"];
  
  const skills = ["React", "Vue.js", "Angular", "Node.js", "Python", "Java", "TypeScript", "GraphQL"];
  const courses = ["Web Development", "Data Science", "Mobile Development", "Cloud Computing", "AI/ML"];
  const industries = ["Technology", "Healthcare", "Finance", "Education", "E-commerce", "Manufacturing"];

  // Sample projects data for demonstration
  const allProjects = [
    { id: 1, name: "E-commerce Platform", category: "Technology", status: "Active", priority: "High", department: "Engineering" },
    { id: 2, name: "Brand Redesign", category: "Design", status: "Pending", priority: "Medium", department: "Product" },
    { id: 3, name: "Marketing Campaign", category: "Marketing", status: "Active", priority: "Low", department: "Marketing" },
    { id: 4, name: "Customer Portal", category: "Technology", status: "Inactive", priority: "Critical", department: "Engineering" },
    { id: 5, name: "Sales Dashboard", category: "Sales", status: "Active", priority: "High", department: "Sales" },
  ];

  const [filteredProjects, setFilteredProjects] = useState(allProjects);

  // Filter projects based on selections
  const filterProjects = () => {
    let filtered = allProjects;
    
    if (selectedCategory) {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }
    if (selectedStatus) {
      filtered = filtered.filter(project => project.status === selectedStatus);
    }
    if (selectedPriority) {
      filtered = filtered.filter(project => project.priority === selectedPriority);
    }
    if (selectedDepartment) {
      filtered = filtered.filter(project => project.department === selectedDepartment);
    }
    
    setFilteredProjects(filtered);
  };

  React.useEffect(() => {
    filterProjects();
  }, [selectedCategory, selectedStatus, selectedPriority, selectedDepartment]);

  const handleFormValueChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user makes a selection
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleArrayPropsChange = (arrayProps: any[], option: string) => {
    console.log("Array props changed:", arrayProps, "Selected:", option);
    openToast(`Array filter updated: ${option}`);
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.required_category) {
      newErrors.required_category = "Category is required";
    }
    if (!formData.required_status) {
      newErrors.required_status = "Status is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      openToast("Form submitted successfully!", 200);
      console.log("Form data:", formData);
    }
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>FilterArray Examples</h1>

      {/* Basic Filter Array */}
      <section className="ihub-mb-5">
        <h2>Basic Filter Array</h2>
        <p>Simple dropdown filter with basic configuration</p>
        
        <Card className="ihub-p-4" style={{ maxWidth: "400px" }}>
          <div className="ihub-d-flex ihub-align-items-center ihub-gap-2 ihub-mb-3">
            <FunnelIcon className="w-6 h-6 ihub-text-primary" />
            <h5>Select Category</h5>
          </div>
          
          <FilterArray
            options={categories}
            name="basic_category"
            label="Category"
            setValue={setSelectedCategory}
            defaultValue=""
          />
          
          {selectedCategory && (
            <div className="ihub-mt-3">
              <Badge text={`Selected: ${selectedCategory}`} variant="primary" />
            </div>
          )}
        </Card>
      </section>

      {/* Multiple Filters for Data Table */}
      <section className="ihub-mb-5">
        <h2>Multiple Filters for Data Filtering</h2>
        <p>Multiple filter arrays working together to filter data</p>
        
        <Card className="ihub-p-4">
          <div className="ihub-d-flex ihub-align-items-center ihub-gap-2 ihub-mb-4">
            <AdjustmentsHorizontalIcon className="w-6 h-6 ihub-text-success" />
            <h4>Project Filters</h4>
          </div>
          
          <div className="ihub-row ihub-gap-3 ihub-mb-4">
            <div className="ihub-col-md-3">
              <FilterArray
                options={categories}
                name="category_filter"
                label="Category"
                setValue={setSelectedCategory}
                defaultValue=""
                defaultWidth="100%"
              />
            </div>
            
            <div className="ihub-col-md-3">
              <FilterArray
                options={statuses}
                name="status_filter"
                label="Status"
                setValue={setSelectedStatus}
                defaultValue=""
                defaultWidth="100%"
              />
            </div>
            
            <div className="ihub-col-md-3">
              <FilterArray
                options={priorities}
                name="priority_filter"
                label="Priority"
                setValue={setSelectedPriority}
                defaultValue=""
                defaultWidth="100%"
              />
            </div>
            
            <div className="ihub-col-md-3">
              <FilterArray
                options={departments}
                name="department_filter"
                label="Department"
                setValue={setSelectedDepartment}
                defaultValue=""
                defaultWidth="100%"
              />
            </div>
          </div>
          
          <div className="ihub-mb-4">
            <div className="ihub-d-flex ihub-gap-2 ihub-flex-wrap">
              {selectedCategory && <Badge text={`Category: ${selectedCategory}`} variant="primary" />}
              {selectedStatus && <Badge text={`Status: ${selectedStatus}`} variant="success" />}
              {selectedPriority && <Badge text={`Priority: ${selectedPriority}`} variant="warning" />}
              {selectedDepartment && <Badge text={`Department: ${selectedDepartment}`} variant="info" />}
            </div>
          </div>
          
          <div className="ihub-table-responsive">
            <table className="ihub-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Project Name</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <tr key={project.id}>
                      <td>{project.id}</td>
                      <td>{project.name}</td>
                      <td><Badge text={project.category} variant="primary" /></td>
                      <td><Badge text={project.status} variant="success" /></td>
                      <td><Badge text={project.priority} variant="warning" /></td>
                      <td><Badge text={project.department} variant="info" /></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="ihub-text-center ihub-text-muted">
                      No projects match the selected filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* Form Integration with Validation */}
      <section className="ihub-mb-5">
        <h2>Form Integration with Validation</h2>
        <p>Filter arrays integrated into forms with validation and error handling</p>
        
        <Card className="ihub-p-4" style={{ maxWidth: "600px" }}>
          <form onSubmit={handleSubmit}>
            <h4 className="ihub-mb-4">User Registration Form</h4>
            
            <div className="ihub-row ihub-gap-3">
              <div className="ihub-col-md-6">
                <FilterArray
                  options={categories}
                  name="required_category"
                  label="Category *"
                  setNameValue={handleFormValueChange}
                  defaultValue=""
                  required={true}
                  err={!!errors.required_category}
                  error={errors.required_category}
                />
              </div>
              
              <div className="ihub-col-md-6">
                <FilterArray
                  options={statuses}
                  name="required_status"
                  label="Status *"
                  setNameValue={handleFormValueChange}
                  defaultValue=""
                  required={true}
                  err={!!errors.required_status}
                  error={errors.required_status}
                />
              </div>
            </div>
            
            <div className="ihub-row ihub-gap-3 ihub-mt-3">
              <div className="ihub-col-md-6">
                <FilterArray
                  options={countries}
                  name="country"
                  label="Country"
                  setNameValue={handleFormValueChange}
                  defaultValue=""
                  notes="Select your country of residence"
                />
              </div>
              
              <div className="ihub-col-md-6">
                <FilterArray
                  options={departments}
                  name="department"
                  label="Department"
                  setNameValue={handleFormValueChange}
                  defaultValue=""
                  notes="Choose your working department"
                />
              </div>
            </div>
            
            <div className="ihub-mt-4">
              <button type="submit" className="ihub-primary-btn">
                Submit Form
              </button>
            </div>
          </form>
        </Card>
      </section>

      {/* Advanced Configuration Options */}
      <section className="ihub-mb-5">
        <h2>Advanced Configuration Options</h2>
        <p>FilterArray with advanced props and customization</p>
        
        <div className="ihub-row ihub-gap-4">
          <div className="ihub-col-md-4">
            <Card className="ihub-p-4 ihub-h-100">
              <h5>Custom Width & Styling</h5>
              <p className="ihub-text-muted ihub-text-sm">Filter with custom width</p>
              
              <FilterArray
                options={skills}
                name="skills_filter"
                label="Technical Skills"
                setNameValue={handleFormValueChange}
                defaultValue=""
                defaultWidth="100%"
                notes="Select your primary skill"
              />
            </Card>
          </div>
          
          <div className="ihub-col-md-4">
            <Card className="ihub-p-4 ihub-h-100">
              <h5>Case Sensitivity</h5>
              <p className="ihub-text-muted ihub-text-sm">Filter without uppercase conversion</p>
              
              <FilterArray
                options={courses}
                name="course_filter"
                label="Course Selection"
                setNameValue={handleFormValueChange}
                defaultValue=""
                notUpperCase={true}
                notes="Course names in original case"
              />
            </Card>
          </div>
          
          <div className="ihub-col-md-4">
            <Card className="ihub-p-4 ihub-h-100">
              <h5>Array Props Integration</h5>
              <p className="ihub-text-muted ihub-text-sm">Filter with array props callback</p>
              
              <FilterArray
                options={industries}
                name="industry_filter"
                label="Industry"
                setArrayProps={handleArrayPropsChange}
                arrayProps={[]}
                dataName="industry_data"
                notes="Industry selection with array handling"
              />
            </Card>
          </div>
        </div>
      </section>

      {/* Search and Filter Combination */}
      <section className="ihub-mb-5">
        <h2>Search and Filter Combination</h2>
        <p>Combining FilterArray with search functionality</p>
        
        <Card className="ihub-p-4">
          <div className="ihub-d-flex ihub-align-items-center ihub-gap-2 ihub-mb-4">
            <MagnifyingGlassIcon className="w-6 h-6 ihub-text-info" />
            <h4>Advanced Project Search</h4>
          </div>
          
          <div className="ihub-d-flex ihub-gap-3 ihub-align-items-end ihub-mb-4">
            <div style={{ flex: 1 }}>
              <label className="ihub-label">Search Projects</label>
              <input 
                type="text" 
                className="ihub-input" 
                placeholder="Search by project name..."
              />
            </div>
            
            <FilterArray
              options={categories}
              name="search_category"
              label="Filter by Category"
              setValue={(value) => console.log("Category filter:", value)}
              defaultValue=""
              defaultWidth="200px"
            />
            
            <FilterArray
              options={statuses}
              name="search_status"
              label="Filter by Status"
              setValue={(value) => console.log("Status filter:", value)}
              defaultValue=""
              defaultWidth="200px"
            />
            
            <button className="ihub-primary-btn">Search</button>
          </div>
          
          <div className="ihub-text-muted ihub-text-sm">
            Use the search box and filters above to find specific projects
          </div>
        </Card>
      </section>

      {/* Dynamic Options Loading */}
      <section className="ihub-mb-5">
        <h2>Dynamic Options Example</h2>
        <p>FilterArray with dynamically loaded options</p>
        
        <Card className="ihub-p-4" style={{ maxWidth: "500px" }}>
          <div className="ihub-d-flex ihub-align-items-center ihub-gap-2 ihub-mb-3">
            <TagIcon className="w-6 h-6 ihub-text-warning" />
            <h5>Dynamic Category Selection</h5>
          </div>
          
          <p className="ihub-text-muted ihub-text-sm ihub-mb-3">
            This example shows how options can be dynamically updated based on other selections
          </p>
          
          <div className="ihub-mb-3">
            <FilterArray
              options={["Frontend", "Backend", "Full Stack", "DevOps", "Data Science"]}
              name="tech_category"
              label="Technology Category"
              setValue={(value) => {
                console.log("Tech category selected:", value);
                // In real app, this would trigger loading of sub-categories
                openToast(`Loading options for ${value}...`);
              }}
              defaultValue=""
            />
          </div>
          
          <div className="ihub-mb-3">
            <FilterArray
              options={skills.filter(skill => 
                selectedCategory === "Technology" ? 
                ["React", "Vue.js", "Angular", "Node.js", "TypeScript"] : skills
              )}
              name="tech_skills"
              label="Related Skills"
              setValue={(value) => console.log("Skill selected:", value)}
              defaultValue=""
              notes="Options change based on category selection"
            />
          </div>
        </Card>
      </section>

      {/* Error States and Edge Cases */}
      <section className="ihub-mb-5">
        <h2>Error States and Edge Cases</h2>
        <p>Examples showing error handling and edge cases</p>
        
        <div className="ihub-row ihub-gap-4">
          <div className="ihub-col-md-6">
            <Card className="ihub-p-4">
              <h5>Required Field with Error</h5>
              <FilterArray
                options={categories}
                name="error_demo"
                label="Required Category"
                setValue={(value) => console.log("Value:", value)}
                defaultValue=""
                required={true}
                err={true}
                error="This field is required"
              />
            </Card>
          </div>
          
          <div className="ihub-col-md-6">
            <Card className="ihub-p-4">
              <h5>Empty Options Array</h5>
              <FilterArray
                options={[]}
                name="empty_options"
                label="No Options Available"
                setValue={(value) => console.log("Value:", value)}
                defaultValue=""
                notes="This filter has no available options"
              />
            </Card>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="ihub-mb-5">
        <h2>Best Practices</h2>
        <Card className="ihub-p-4">
          <h5>FilterArray Implementation Guidelines</h5>
          <ul className="ihub-list-unstyled">
            <li className="ihub-mb-2">
              <strong>Options Management:</strong> Provide meaningful option arrays that represent clear choices
            </li>
            <li className="ihub-mb-2">
              <strong>Default Values:</strong> Set appropriate default values for better user experience
            </li>
            <li className="ihub-mb-2">
              <strong>Validation:</strong> Use the `required` and `err` props for form validation
            </li>
            <li className="ihub-mb-2">
              <strong>Width Responsiveness:</strong> Use `defaultWidth` with responsive values like "100%" for mobile
            </li>
            <li className="ihub-mb-2">
              <strong>User Feedback:</strong> Provide `notes` to guide users on their selections
            </li>
            <li className="ihub-mb-2">
              <strong>State Management:</strong> Use appropriate state management for complex filtering scenarios
            </li>
            <li className="ihub-mb-2">
              <strong>Performance:</strong> For large datasets, consider implementing search within options
            </li>
          </ul>
        </Card>
      </section>
    </div>
  );
};

export default FilterArrayExamples;
```

## 🔗 Related Components

- [FilterBy](./FilterBy.md) - Date-based filtering component
- [SearchObjectsFromDB](./SearchObjectsFromDB.md) - Database search component
- [ActionDropdown](./ActionDropdown.md) - Action dropdown component
- [InputSearchDropdown](./InputSearchDropdown.md) - Search dropdown input
- [FilterObjects](./FilterObjects.md) - Object filtering component