# Education Levels Data

**Category:** Library | **Type:** educational data

Standardized education level classifications for academic and professional applications. Provides a comprehensive hierarchy of educational qualifications from primary school through doctorate level.

## 📁 File Location

`src/components/lib/json/educationLevels.ts`

## 🏷️ Tags

`education`, `academic`, `qualifications`, `levels`, `degrees`, `forms`, `dropdown`, `classification`

## 📖 Usage Examples

### Example 1: Educational Profile Management System

```tsx
"use client";

import React, { useState } from "react";
import educationLevels from "@instincthub/react-ui/lib";

/**
 * Educational profile and qualification management system
 */
const EducationProfileManager = () => {
  const [userProfiles, setUserProfiles] = useState([
    {
      id: 1,
      name: "John Doe",
      education: "Bachelor's Degree",
      field: "Computer Science",
      institution: "University of Lagos",
      year: 2020
    },
    {
      id: 2,
      name: "Jane Smith",
      education: "Master's Degree",
      field: "Data Science",
      institution: "Covenant University",
      year: 2022
    }
  ]);

  const [newProfile, setNewProfile] = useState({
    name: "",
    education: "",
    field: "",
    institution: "",
    year: new Date().getFullYear()
  });

  const [filterLevel, setFilterLevel] = useState<string>("All");
  const [stats, setStats] = useState<any>({});

  // Calculate education statistics
  React.useEffect(() => {
    const educationStats = educationLevels.reduce((acc, level) => {
      acc[level] = userProfiles.filter(profile => profile.education === level).length;
      return acc;
    }, {} as Record<string, number>);

    setStats(educationStats);
  }, [userProfiles]);

  // Get education level hierarchy index
  const getEducationIndex = (level: string) => {
    return educationLevels.indexOf(level);
  };

  // Check if education level is advanced
  const isAdvancedDegree = (level: string) => {
    const advancedLevels = ["Master's Degree", "Doctorate"];
    return advancedLevels.includes(level);
  };

  // Get color for education level
  const getEducationColor = (level: string) => {
    const index = getEducationIndex(level);
    const colors = [
      "badge-secondary", // Primary School
      "badge-info",      // Middle School
      "badge-primary",   // High School
      "badge-warning",   // Diploma
      "badge-success",   // Bachelor's Degree
      "badge-danger",    // Master's Degree
      "badge-dark",      // Doctorate
      "badge-light"      // Other
    ];
    return colors[index] || "badge-light";
  };

  // Filter profiles based on education level
  const filteredProfiles = filterLevel === "All" 
    ? userProfiles 
    : userProfiles.filter(profile => profile.education === filterLevel);

  // Add new profile
  const addProfile = () => {
    if (newProfile.name && newProfile.education) {
      setUserProfiles(prev => [...prev, { 
        ...newProfile, 
        id: Date.now() 
      }]);
      setNewProfile({
        name: "",
        education: "",
        field: "",
        institution: "",
        year: new Date().getFullYear()
      });
    }
  };

  return (
    <div className="ihub-container ihub-py-5">
      <h1>Education Profile Manager</h1>
      
      {/* Education Level Overview */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Education Level Hierarchy</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-row">
            {educationLevels.map((level, index) => (
              <div key={level} className="ihub-col-md-3 ihub-col-sm-4 ihub-col-6 ihub-mb-3">
                <div className="ihub-text-center">
                  <div className="ihub-mb-2">
                    <span className={`ihub-badge ${getEducationColor(level)} ihub-badge-lg`}>
                      {index + 1}
                    </span>
                  </div>
                  <h6 className="ihub-mb-1">{level}</h6>
                  <small className="text-muted">
                    {stats[level] || 0} users
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add New Profile */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Add Education Profile</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <div className="ihub-mb-3">
                <label className="ihub-form-label">Full Name</label>
                <input
                  type="text"
                  className="ihub-form-control"
                  value={newProfile.name}
                  onChange={(e) => setNewProfile(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter full name"
                />
              </div>
              
              <div className="ihub-mb-3">
                <label className="ihub-form-label">Education Level</label>
                <select
                  className="ihub-form-control"
                  value={newProfile.education}
                  onChange={(e) => setNewProfile(prev => ({ ...prev, education: e.target.value }))}
                >
                  <option value="">Select education level</option>
                  {educationLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="ihub-mb-3">
                <label className="ihub-form-label">Field of Study</label>
                <input
                  type="text"
                  className="ihub-form-control"
                  value={newProfile.field}
                  onChange={(e) => setNewProfile(prev => ({ ...prev, field: e.target.value }))}
                  placeholder="e.g., Computer Science, Medicine"
                />
              </div>
            </div>
            
            <div className="ihub-col-md-6">
              <div className="ihub-mb-3">
                <label className="ihub-form-label">Institution</label>
                <input
                  type="text"
                  className="ihub-form-control"
                  value={newProfile.institution}
                  onChange={(e) => setNewProfile(prev => ({ ...prev, institution: e.target.value }))}
                  placeholder="e.g., University of Lagos"
                />
              </div>
              
              <div className="ihub-mb-3">
                <label className="ihub-form-label">Graduation Year</label>
                <input
                  type="number"
                  className="ihub-form-control"
                  value={newProfile.year}
                  onChange={(e) => setNewProfile(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                  min="1950"
                  max={new Date().getFullYear() + 10}
                />
              </div>
              
              <div className="ihub-mb-3">
                <button
                  className="ihub-btn ihub-btn-primary ihub-w-100"
                  onClick={addProfile}
                  disabled={!newProfile.name || !newProfile.education}
                >
                  Add Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Statistics */}
      <section className="ihub-mb-4">
        <div className="ihub-row ihub-align-items-center">
          <div className="ihub-col-md-6">
            <h2 className="ihub-fs-lg ihub-mb-3">Education Profiles</h2>
          </div>
          <div className="ihub-col-md-6">
            <div className="ihub-d-flex ihub-align-items-center ihub-justify-content-md-end">
              <label className="ihub-me-2">Filter by:</label>
              <select
                className="ihub-form-control ihub-form-control-sm"
                style={{ width: "auto" }}
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
              >
                <option value="All">All Levels</option>
                {educationLevels.map((level) => (
                  <option key={level} value={level}>
                    {level} ({stats[level] || 0})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Listing */}
      <section className="ihub-mb-5">
        <div className="ihub-card">
          {filteredProfiles.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover ihub-mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Education Level</th>
                    <th>Field of Study</th>
                    <th>Institution</th>
                    <th>Year</th>
                    <th>Level</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProfiles.map((profile) => (
                    <tr key={profile.id}>
                      <td>
                        <div className="ihub-d-flex ihub-align-items-center">
                          <div className="ihub-avatar ihub-bg-primary ihub-text-white ihub-rounded-circle ihub-me-2" style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {profile.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </div>
                          {profile.name}
                        </div>
                      </td>
                      <td>
                        <span className={`ihub-badge ${getEducationColor(profile.education)}`}>
                          {profile.education}
                        </span>
                      </td>
                      <td>{profile.field}</td>
                      <td>{profile.institution}</td>
                      <td>{profile.year}</td>
                      <td>
                        <div className="ihub-d-flex ihub-align-items-center">
                          <span className="ihub-badge ihub-badge-outline-secondary ihub-me-2">
                            Level {getEducationIndex(profile.education) + 1}
                          </span>
                          {isAdvancedDegree(profile.education) && (
                            <i className="pi pi-star-fill text-warning" title="Advanced Degree"></i>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="ihub-p-4 ihub-text-center text-muted">
              <i className="pi pi-info-circle ihub-me-2"></i>
              No profiles found for the selected education level.
            </div>
          )}
        </div>
      </section>

      {/* Education Statistics */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Education Statistics</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-8">
            <div className="ihub-card ihub-p-4">
              <h6>Distribution by Education Level</h6>
              <div className="ihub-mb-3">
                {educationLevels.map((level) => {
                  const count = stats[level] || 0;
                  const percentage = userProfiles.length > 0 ? (count / userProfiles.length) * 100 : 0;
                  
                  return (
                    <div key={level} className="ihub-mb-3">
                      <div className="ihub-d-flex ihub-justify-content-between ihub-mb-1">
                        <span>{level}</span>
                        <span>{count} ({percentage.toFixed(1)}%)</span>
                      </div>
                      <div className="ihub-progress" style={{ height: "8px" }}>
                        <div 
                          className="ihub-progress-bar" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-p-4">
              <h6>Quick Stats</h6>
              <div className="ihub-mb-3">
                <div className="ihub-d-flex ihub-justify-content-between ihub-mb-2">
                  <strong>Total Profiles:</strong>
                  <span className="ihub-badge ihub-badge-primary">{userProfiles.length}</span>
                </div>
                <div className="ihub-d-flex ihub-justify-content-between ihub-mb-2">
                  <strong>Advanced Degrees:</strong>
                  <span className="ihub-badge ihub-badge-success">
                    {userProfiles.filter(p => isAdvancedDegree(p.education)).length}
                  </span>
                </div>
                <div className="ihub-d-flex ihub-justify-content-between">
                  <strong>Education Levels:</strong>
                  <span className="ihub-badge ihub-badge-info">{educationLevels.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Implementation Examples</h2>
        
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-code ihub-me-2"></i>
              Education Level Dropdown Component
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Education level selector component
import educationLevels from '@instincthub/react-ui/lib';

const EducationSelector = ({ value, onChange, required = false }) => {
  return (
    <div className="education-selector">
      <label className="form-label">
        Education Level {required && <span className="text-danger">*</span>}
      </label>
      <select
        className="form-control"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      >
        <option value="">Select your education level</option>
        {educationLevels.map((level, index) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
      
      {value && (
        <div className="mt-2">
          <small className="text-muted">
            Level {educationLevels.indexOf(value) + 1} of {educationLevels.length}
          </small>
        </div>
      )}
    </div>
  );
};

// Usage in forms
const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    education: '',
    field: ''
  });

  const handleEducationChange = (education: string) => {
    setFormData(prev => ({ ...prev, education }));
  };

  return (
    <form>
      <EducationSelector
        value={formData.education}
        onChange={handleEducationChange}
        required={true}
      />
    </form>
  );
};`}
            </pre>
          </div>
        </div>

        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-chart-bar ihub-me-2"></i>
              Education Analytics Helper
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Education analytics utilities
import educationLevels from '@instincthub/react-ui/lib';

class EducationAnalytics {
  static getEducationIndex(level: string): number {
    return educationLevels.indexOf(level);
  }

  static isValidEducationLevel(level: string): boolean {
    return educationLevels.includes(level);
  }

  static compareEducationLevels(level1: string, level2: string): number {
    const index1 = this.getEducationIndex(level1);
    const index2 = this.getEducationIndex(level2);
    return index1 - index2;
  }

  static isAdvancedDegree(level: string): boolean {
    const advancedLevels = ["Master's Degree", "Doctorate"];
    return advancedLevels.includes(level);
  }

  static getEducationCategory(level: string): string {
    const index = this.getEducationIndex(level);
    if (index <= 2) return "Basic Education";
    if (index <= 3) return "Vocational Training";
    if (index <= 4) return "Undergraduate";
    if (index <= 5) return "Graduate";
    if (index <= 6) return "Postgraduate";
    return "Other";
  }

  static calculateEducationStats(users: Array<{education: string}>) {
    const stats = educationLevels.reduce((acc, level) => {
      acc[level] = users.filter(user => user.education === level).length;
      return acc;
    }, {} as Record<string, number>);

    const total = users.length;
    const advancedDegrees = users.filter(user => 
      this.isAdvancedDegree(user.education)
    ).length;

    return {
      byLevel: stats,
      total,
      advancedDegrees,
      advancedPercentage: total > 0 ? (advancedDegrees / total) * 100 : 0
    };
  }
}

// Usage example
const userAnalytics = EducationAnalytics.calculateEducationStats(users);
console.log('Education distribution:', userAnalytics.byLevel);
console.log('Advanced degree holders:', userAnalytics.advancedDegrees);`}
            </pre>
          </div>
        </div>
      </section>

      {/* Available Education Levels */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Available Education Levels</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <h6>Complete Hierarchy</h6>
              <ul className="list-group list-group-flush">
                {educationLevels.map((level, index) => (
                  <li key={level} className="list-group-item ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                    <span>
                      <strong>{index + 1}.</strong> {level}
                    </span>
                    <span className={`ihub-badge ${getEducationColor(level)}`}>
                      {getEducationIndex(level) >= 4 ? "Higher Ed" : "Basic Ed"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="ihub-col-md-6">
              <h6>Categories</h6>
              <div className="ihub-mb-3">
                <div className="ihub-border ihub-p-3 ihub-rounded ihub-mb-2">
                  <strong>Basic Education (K-12)</strong>
                  <ul className="ihub-mb-0 ihub-mt-2">
                    <li>Primary School</li>
                    <li>Middle School</li>
                    <li>High School</li>
                  </ul>
                </div>
                
                <div className="ihub-border ihub-p-3 ihub-rounded ihub-mb-2">
                  <strong>Higher Education</strong>
                  <ul className="ihub-mb-0 ihub-mt-2">
                    <li>Diploma</li>
                    <li>Bachelor's Degree</li>
                    <li>Master's Degree</li>
                    <li>Doctorate</li>
                  </ul>
                </div>
                
                <div className="ihub-border ihub-p-3 ihub-rounded">
                  <strong>Other</strong>
                  <ul className="ihub-mb-0 ihub-mt-2">
                    <li>Professional Certifications</li>
                    <li>Non-traditional Education</li>
                    <li>Ongoing Education</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EducationProfileManager;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import educationLevels from '@instincthub/react-ui/lib';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import educationLevels from '@instincthub/react-ui/lib';

function EducationDropdown() {
  const [selectedLevel, setSelectedLevel] = useState('');

  return (
    <select 
      value={selectedLevel} 
      onChange={(e) => setSelectedLevel(e.target.value)}
    >
      <option value="">Select education level</option>
      {educationLevels.map(level => (
        <option key={level} value={level}>
          {level}
        </option>
      ))}
    </select>
  );
}
```

## 🔧 Available Education Levels

```tsx
const educationLevels: string[] = [
  "Primary School",      // Elementary education
  "Middle School",       // Junior high school
  "High School",         // Secondary education
  "Diploma",            // Certificate/diploma programs
  "Bachelor's Degree",   // Undergraduate degree
  "Master's Degree",     // Graduate degree
  "Doctorate",          // Doctoral degree (PhD, etc.)
  "Other"               // Non-traditional or unspecified
];
```

## 💡 Use Cases

### User Registration Forms
- **Profile Creation**: Capture user education background
- **Skills Assessment**: Determine appropriate content level
- **Course Recommendations**: Suggest courses based on education level
- **Certification Tracking**: Track educational achievements

### Educational Platforms
- **Student Classification**: Categorize students by education level
- **Content Difficulty**: Adjust content complexity based on background
- **Prerequisite Checking**: Verify education requirements for courses
- **Progress Tracking**: Monitor educational advancement

### HR & Recruitment
- **Job Applications**: Standardize education requirements
- **Candidate Screening**: Filter candidates by education level
- **Salary Bands**: Correlate compensation with education
- **Career Development**: Track employee education progression

### Analytics & Reporting
- **Demographics**: Analyze user education distribution
- **Market Research**: Understand target audience education levels
- **Success Metrics**: Correlate outcomes with education background
- **Trend Analysis**: Track education level changes over time

## 🎯 Advanced Features

### Education Hierarchy
- **Progressive Levels**: Logical progression from basic to advanced
- **Comparison Logic**: Compare education levels numerically
- **Category Grouping**: Group levels into basic/higher education
- **Advanced Degree Detection**: Identify graduate-level education

### Validation & Utilities
- **Level Validation**: Verify valid education levels
- **Index Mapping**: Convert levels to numerical indices
- **Category Classification**: Assign levels to education categories
- **Statistical Analysis**: Calculate education distribution statistics

### Integration Patterns
- **Form Integration**: Standard dropdown component
- **Database Storage**: Consistent education level values
- **API Standardization**: Uniform education level handling
- **Reporting Systems**: Education-based analytics and insights

## 🌍 International Considerations

### Educational Systems
- **Global Compatibility**: Generic levels applicable worldwide
- **System Mapping**: Compatible with various education systems
- **Localization Support**: Can be translated for different regions
- **Cultural Adaptation**: Flexible for different educational contexts

### Regional Variations
- **Terminology**: "High School" vs "Secondary School"
- **System Differences**: Different education structures globally
- **Qualification Recognition**: International degree recognition
- **Professional Equivalents**: Industry certifications and training

## 🔒 Best Practices

### Data Consistency
- **Standardized Values**: Use exact strings from the array
- **Case Sensitivity**: Maintain exact case matching
- **Validation**: Always validate user input against the list
- **Database Design**: Use normalized values for consistency

### User Experience
- **Clear Labels**: Descriptive education level names
- **Logical Order**: Progressive hierarchy from basic to advanced
- **Help Text**: Provide guidance for unclear categories
- **Accessibility**: Proper form labeling and keyboard navigation

## ⚠️ Implementation Notes

- **Exact Matching**: Use exact string values from the array
- **Order Significance**: Array order represents education hierarchy
- **Other Category**: Use for non-standard or ongoing education
- **Extensibility**: Easy to add new levels if needed
- **Backward Compatibility**: Maintain existing values when updating

## 🔗 Related Utilities

- [json-accounts](./json-accounts.md) - User account structures with education data
- [utils](./utils.md) - Additional educational constants and configurations
- [countryNigeria](./json-countryNigeria.md) - Regional education context
- [forms](../forms/README.md) - Form components that use education levels