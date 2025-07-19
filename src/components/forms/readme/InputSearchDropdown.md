# InputSearchDropdown

**Category:** Forms | **Type:** component

Searchable dropdown component for selecting options with real-time filtering

## 🏷️ Tags

`forms`, `dropdown`, `search`, `filter`, `select`

```tsx
"use client";
import React, { useState } from "react";
import {
  InputSearchDropdown,
  InputText,
  SubmitButton,
  openToast,
} from "@instincthub/react-ui";

/**
 * Comprehensive examples demonstrating InputSearchDropdown usage patterns
 */
const InputSearchDropdownExamples = () => {
  const [selectedOrganization, setSelectedOrganization] = useState<any>(null);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [formData, setFormData] = useState({
    company: "",
    department: "",
    role: "",
  });

  // Sample data sets
  const organizations = [
    { name: "Microsoft Corporation", id: 1, type: "Technology", size: "Large" },
    { name: "Google LLC", id: 2, type: "Technology", size: "Large" },
    { name: "Apple Inc.", id: 3, type: "Technology", size: "Large" },
    { name: "Amazon Web Services", id: 4, type: "Cloud", size: "Large" },
    { name: "Meta Platforms", id: 5, type: "Social Media", size: "Large" },
    { name: "Tesla Inc.", id: 6, type: "Automotive", size: "Medium" },
    { name: "SpaceX", id: 7, type: "Aerospace", size: "Medium" },
    { name: "Stripe Inc.", id: 8, type: "Fintech", size: "Medium" },
    { name: "Shopify Inc.", id: 9, type: "E-commerce", size: "Medium" },
    { name: "Salesforce", id: 10, type: "CRM", size: "Large" },
  ];

  const countries = [
    { name: "United States", code: "US", continent: "North America" },
    { name: "Canada", code: "CA", continent: "North America" },
    { name: "United Kingdom", code: "UK", continent: "Europe" },
    { name: "Germany", code: "DE", continent: "Europe" },
    { name: "France", code: "FR", continent: "Europe" },
    { name: "Japan", code: "JP", continent: "Asia" },
    { name: "South Korea", code: "KR", continent: "Asia" },
    { name: "Australia", code: "AU", continent: "Oceania" },
    { name: "Brazil", code: "BR", continent: "South America" },
    { name: "Nigeria", code: "NG", continent: "Africa" },
  ];

  const skills = [
    { name: "JavaScript", category: "Programming", level: "Frontend" },
    { name: "Python", category: "Programming", level: "Backend" },
    { name: "React", category: "Framework", level: "Frontend" },
    { name: "Node.js", category: "Runtime", level: "Backend" },
    { name: "TypeScript", category: "Programming", level: "Full Stack" },
    { name: "AWS", category: "Cloud", level: "DevOps" },
    { name: "Docker", category: "Containerization", level: "DevOps" },
    { name: "PostgreSQL", category: "Database", level: "Backend" },
    { name: "GraphQL", category: "API", level: "Full Stack" },
    { name: "Vue.js", category: "Framework", level: "Frontend" },
  ];

  const categories = [
    { name: "Technology", icon: "💻", description: "Tech companies and startups" },
    { name: "Healthcare", icon: "🏥", description: "Medical and health services" },
    { name: "Finance", icon: "💰", description: "Banking and financial services" },
    { name: "Education", icon: "🎓", description: "Schools and educational institutions" },
    { name: "Retail", icon: "🛍️", description: "Retail and e-commerce" },
    { name: "Manufacturing", icon: "🏭", description: "Manufacturing and production" },
    { name: "Consulting", icon: "💼", description: "Consulting and professional services" },
    { name: "Non-Profit", icon: "🤝", description: "Non-profit organizations" },
  ];

  const departments = [
    { name: "Engineering", manager: "John Doe", budget: "High" },
    { name: "Marketing", manager: "Jane Smith", budget: "Medium" },
    { name: "Sales", manager: "Bob Johnson", budget: "High" },
    { name: "Human Resources", manager: "Alice Brown", budget: "Low" },
    { name: "Finance", manager: "Charlie Wilson", budget: "Medium" },
    { name: "Operations", manager: "Diana Davis", budget: "High" },
    { name: "Customer Support", manager: "Eve Anderson", budget: "Low" },
    { name: "Research & Development", manager: "Frank Miller", budget: "High" },
  ];

  // Event handlers
  const handleOrganizationSelected = (org: any) => {
    setSelectedOrganization(org);
    console.log("Selected organization:", org);
    openToast(`Selected: ${org.name} (${org.type})`);
  };

  const handleCountrySelected = (country: any) => {
    setSelectedCountry(country);
    console.log("Selected country:", country);
    openToast(`Selected: ${country.name} (${country.code})`);
  };

  const handleSkillSelected = (skill: any) => {
    setSelectedSkill(skill);
    console.log("Selected skill:", skill);
    openToast(`Added skill: ${skill.name} (${skill.category})`);
  };

  const handleCategorySelected = (category: any) => {
    setSelectedCategory(category);
    console.log("Selected category:", category);
    openToast(`Selected: ${category.name}`);
  };

  const handleDepartmentSelected = (dept: any) => {
    setFormData((prev) => ({ ...prev, department: dept.name }));
    console.log("Selected department:", dept);
    openToast(`Department: ${dept.name}`);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>InputSearchDropdown Examples</h1>

      {/* Basic Organization Selector */}
      <div className="ihub-mb-5">
        <h2>1. Basic Organization Selector</h2>
        <p>Simple organization selection with company information display</p>
        
        <InputSearchDropdown
          options={organizations}
          onOptionSelected={handleOrganizationSelected}
          names="organization"
        />
        
        {selectedOrganization && (
          <div className="ihub-mt-3 ihub-card">
            <h4>Selected Organization:</h4>
            <p><strong>Name:</strong> {selectedOrganization.name}</p>
            <p><strong>Type:</strong> {selectedOrganization.type}</p>
            <p><strong>Size:</strong> {selectedOrganization.size}</p>
            <p><strong>ID:</strong> {selectedOrganization.id}</p>
          </div>
        )}
      </div>

      {/* Country Selector with Default Value */}
      <div className="ihub-mb-5">
        <h2>2. Country Selector with Default Value</h2>
        <p>Pre-populated dropdown with default selection</p>
        
        <InputSearchDropdown
          options={countries}
          onOptionSelected={handleCountrySelected}
          defaultValues="United States"
          names="country"
        />
        
        {selectedCountry && (
          <div className="ihub-mt-3 ihub-card">
            <h4>Selected Country:</h4>
            <p><strong>Country:</strong> {selectedCountry.name}</p>
            <p><strong>Code:</strong> {selectedCountry.code}</p>
            <p><strong>Continent:</strong> {selectedCountry.continent}</p>
          </div>
        )}
      </div>

      {/* Skills Selector */}
      <div className="ihub-mb-5">
        <h2>3. Technical Skills Selector</h2>
        <p>Select programming languages and technical skills</p>
        
        <InputSearchDropdown
          options={skills}
          onOptionSelected={handleSkillSelected}
          names="skills"
        />
        
        {selectedSkill && (
          <div className="ihub-mt-3 ihub-card">
            <h4>Selected Skill:</h4>
            <p><strong>Skill:</strong> {selectedSkill.name}</p>
            <p><strong>Category:</strong> {selectedSkill.category}</p>
            <p><strong>Level:</strong> {selectedSkill.level}</p>
          </div>
        )}
      </div>

      {/* Disabled State Example */}
      <div className="ihub-mb-5">
        <h2>4. Disabled/Read-Only Dropdown</h2>
        <p>Dropdown in disabled state with pre-selected value</p>
        
        <InputSearchDropdown
          options={organizations}
          onOptionSelected={(org) => console.log("Disabled selection:", org)}
          defaultValues="Google LLC"
          names="readonly-org"
          disableds={true}
        />
        
        <p className="ihub-mt-2 text-muted">
          <small>This dropdown is disabled and cannot be changed</small>
        </p>
      </div>

      {/* Category Selector with Icons */}
      <div className="ihub-mb-5">
        <h2>5. Category Selector with Rich Data</h2>
        <p>Dropdown showing categories with additional metadata</p>
        
        <InputSearchDropdown
          options={categories}
          onOptionSelected={handleCategorySelected}
          names="category"
        />
        
        {selectedCategory && (
          <div className="ihub-mt-3 ihub-card">
            <h4>Selected Category:</h4>
            <p><strong>Category:</strong> {selectedCategory.icon} {selectedCategory.name}</p>
            <p><strong>Description:</strong> {selectedCategory.description}</p>
          </div>
        )}
      </div>

      {/* Form Integration Example */}
      <div className="ihub-mb-5">
        <h2>6. Form Integration Example</h2>
        <p>Integrated with other form components in a complete form</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <InputText
              label="Company Name"
              name="company"
              value={formData.company}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, company: e.target.value }))
              }
              className="ihub-mb-3"
            />
          </div>
          <div className="ihub-col-md-4">
            <label className="ihub-label">Department</label>
            <InputSearchDropdown
              options={departments}
              onOptionSelected={handleDepartmentSelected}
              names="department"
            />
          </div>
          <div className="ihub-col-md-4">
            <InputText
              label="Role/Position"
              name="role"
              value={formData.role}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, role: e.target.value }))
              }
              className="ihub-mb-3"
            />
          </div>
        </div>
        
        {formData.department && (
          <div className="ihub-mt-3 ihub-card">
            <h4>Form Data:</h4>
            <p><strong>Company:</strong> {formData.company || "Not specified"}</p>
            <p><strong>Department:</strong> {formData.department}</p>
            <p><strong>Role:</strong> {formData.role || "Not specified"}</p>
          </div>
        )}
      </div>

      {/* Multi-Purpose Selector */}
      <div className="ihub-mb-5">
        <h2>7. Advanced Search Example</h2>
        <p>Complex data structure with multiple searchable fields</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <label className="ihub-label">Search Organizations</label>
            <InputSearchDropdown
              options={organizations}
              onOptionSelected={(org) => {
                console.log("Advanced org selection:", org);
                openToast(`Selected: ${org.name} - ${org.type} (${org.size})`);
              }}
              names="advanced-org"
            />
          </div>
          <div className="ihub-col-md-6">
            <label className="ihub-label">Filter by Skills</label>
            <InputSearchDropdown
              options={skills}
              onOptionSelected={(skill) => {
                console.log("Advanced skill selection:", skill);
                openToast(`Skill: ${skill.name} (${skill.category})`);
              }}
              names="advanced-skill"
            />
          </div>
        </div>
      </div>

      {/* Real-world Use Case: Job Application Form */}
      <div className="ihub-mb-5">
        <h2>8. Job Application Form Example</h2>
        <p>Real-world implementation in a job application context</p>
        
        <div className="ihub-form-group">
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <label className="ihub-label">Preferred Company Type</label>
              <InputSearchDropdown
                options={categories}
                onOptionSelected={(cat) => {
                  console.log("Job preference:", cat);
                  openToast(`Interested in: ${cat.name}`);
                }}
                names="job-category"
              />
            </div>
            <div className="ihub-col-md-6">
              <label className="ihub-label">Primary Skill</label>
              <InputSearchDropdown
                options={skills}
                onOptionSelected={(skill) => {
                  console.log("Primary skill:", skill);
                  openToast(`Primary skill: ${skill.name}`);
                }}
                names="primary-skill"
              />
            </div>
          </div>
          
          <div className="ihub-row ihub-mt-3">
            <div className="ihub-col-md-6">
              <label className="ihub-label">Target Country</label>
              <InputSearchDropdown
                options={countries}
                onOptionSelected={(country) => {
                  console.log("Target country:", country);
                  openToast(`Target: ${country.name}`);
                }}
                defaultValues="United States"
                names="target-country"
              />
            </div>
            <div className="ihub-col-md-6">
              <label className="ihub-label">Dream Company</label>
              <InputSearchDropdown
                options={organizations}
                onOptionSelected={(org) => {
                  console.log("Dream company:", org);
                  openToast(`Dream company: ${org.name}`);
                }}
                names="dream-company"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Performance Test with Large Dataset */}
      <div className="ihub-mb-5">
        <h2>9. Large Dataset Example</h2>
        <p>Testing performance with a larger set of options</p>
        
        <InputSearchDropdown
          options={[
            ...organizations,
            ...countries.map(c => ({ name: `${c.name} Office`, id: c.code, type: "International" })),
            ...skills.map(s => ({ name: `${s.name} Expert`, id: s.name, type: "Skill" })),
            ...categories.map(c => ({ name: `${c.name} Division`, id: c.name, type: "Division" })),
          ]}
          onOptionSelected={(item) => {
            console.log("Large dataset selection:", item);
            openToast(`Selected from large dataset: ${item.name}`);
          }}
          names="large-dataset"
        />
      </div>
    </div>
  );
};

export default InputSearchDropdownExamples;
```

## 🔗 Related Components

- [InputText](./InputText.md) - Text input component
- [ActionDropdown](./ActionDropdown.md) - Action dropdown component
- [SearchField](./SearchField.md) - Search field component
- [SearchObjectsFromDB](./SearchObjectsFromDB.md) - Database search component
- [Dropdown](./Dropdown.md) - Basic dropdown component