# CheckBoxesField

**Category:** Forms | **Type:** component

Advanced checkbox field component for selecting multiple values with grouping, validation, and dynamic filtering capabilities

**File Location:** `src/components/forms/CheckboxesField.tsx`

## 🏷️ Tags

`forms`, `checkbox`, `multi-select`, `validation`, `input`, `field`

```tsx
"use client";
import React, { useState } from "react";
import { CheckBoxesField } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive examples demonstrating CheckBoxesField usage
 * Shows multi-select functionality, validation, grouping, and advanced features
 */
const CheckBoxesFieldExamples = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['javascript', 'react']);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(['read']);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [filterQuery, setFilterQuery] = useState<string>("");

  const skillsOptions = [
    { value: 'javascript', label: 'JavaScript', category: 'Frontend', level: 'Essential' },
    { value: 'typescript', label: 'TypeScript', category: 'Frontend', level: 'Advanced' },
    { value: 'react', label: 'React', category: 'Frontend', level: 'Essential' },
    { value: 'vue', label: 'Vue.js', category: 'Frontend', level: 'Optional' },
    { value: 'angular', label: 'Angular', category: 'Frontend', level: 'Optional' },
    { value: 'nodejs', label: 'Node.js', category: 'Backend', level: 'Essential' },
    { value: 'python', label: 'Python', category: 'Backend', level: 'Advanced' },
    { value: 'java', label: 'Java', category: 'Backend', level: 'Optional' },
    { value: 'docker', label: 'Docker', category: 'DevOps', level: 'Advanced' },
    { value: 'kubernetes', label: 'Kubernetes', category: 'DevOps', level: 'Expert' },
    { value: 'aws', label: 'AWS', category: 'Cloud', level: 'Advanced' },
    { value: 'azure', label: 'Azure', category: 'Cloud', level: 'Optional' },
  ];

  const interestsOptions = [
    { value: 'web-dev', label: 'Web Development', icon: '🌐' },
    { value: 'mobile-dev', label: 'Mobile Development', icon: '📱' },
    { value: 'ai-ml', label: 'AI & Machine Learning', icon: '🤖' },
    { value: 'blockchain', label: 'Blockchain', icon: '⛓️' },
    { value: 'iot', label: 'Internet of Things', icon: '🌐' },
    { value: 'cybersecurity', label: 'Cybersecurity', icon: '🔒' },
    { value: 'cloud-computing', label: 'Cloud Computing', icon: '☁️' },
    { value: 'data-science', label: 'Data Science', icon: '📊' },
    { value: 'ui-ux', label: 'UI/UX Design', icon: '🎨' },
    { value: 'game-dev', label: 'Game Development', icon: '🎮' },
  ];

  const permissionsOptions = [
    { value: 'read', label: 'Read', description: 'View content and data', level: 'basic' },
    { value: 'write', label: 'Write', description: 'Create and edit content', level: 'intermediate' },
    { value: 'delete', label: 'Delete', description: 'Remove content and data', level: 'advanced' },
    { value: 'admin', label: 'Admin', description: 'Full system administration', level: 'expert' },
    { value: 'manage-users', label: 'Manage Users', description: 'Add, edit, and remove users', level: 'advanced' },
    { value: 'manage-roles', label: 'Manage Roles', description: 'Create and assign roles', level: 'expert' },
    { value: 'view-analytics', label: 'View Analytics', description: 'Access reports and analytics', level: 'intermediate' },
    { value: 'export-data', label: 'Export Data', description: 'Download and export data', level: 'intermediate' },
  ];

  const featureOptions = [
    { value: 'notifications', label: 'Push Notifications', premium: false },
    { value: 'dark-mode', label: 'Dark Mode', premium: false },
    { value: 'advanced-search', label: 'Advanced Search', premium: true },
    { value: 'analytics', label: 'Analytics Dashboard', premium: true },
    { value: 'api-access', label: 'API Access', premium: true },
    { value: 'custom-themes', label: 'Custom Themes', premium: true },
    { value: 'priority-support', label: 'Priority Support', premium: true },
    { value: 'white-label', label: 'White Label', premium: true },
  ];

  const handleSkillsChange = (selected: string[]) => {
    setSelectedSkills(selected);
    openToast(`Selected ${selected.length} skills`);
  };

  const handleInterestsChange = (selected: string[]) => {
    setSelectedInterests(selected);
    openToast(`Selected ${selected.length} interests`);
  };

  const handlePermissionsChange = (selected: string[]) => {
    setSelectedPermissions(selected);
    openToast(`Updated permissions: ${selected.length} selected`);
  };

  const handleFeaturesChange = (selected: string[]) => {
    setSelectedFeatures(selected);
    const premiumCount = selected.filter(value => 
      featureOptions.find(opt => opt.value === value)?.premium
    ).length;
    openToast(`Selected ${selected.length} features (${premiumCount} premium)`);
  };

  const validatePermissions = (selected: string[]) => {
    if (selected.includes('admin') && !selected.includes('read')) {
      return 'Admin permission requires read permission';
    }
    if (selected.includes('delete') && !selected.includes('write')) {
      return 'Delete permission requires write permission';
    }
    return null;
  };

  const validateSkills = (selected: string[]) => {
    if (selected.length < 2) {
      return 'Please select at least 2 skills';
    }
    if (selected.length > 8) {
      return 'Please select no more than 8 skills';
    }
    return null;
  };

  const getFilteredOptions = (options: any[], query: string) => {
    if (!query) return options;
    return options.filter(option => 
      option.label.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>CheckBoxesField Examples</h1>
      <p className="ihub-mb-4">
        Advanced checkbox field component for selecting multiple values with grouping,
        validation, dynamic filtering, and comprehensive customization options.
      </p>

      {/* Basic Multi-Select */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Basic Multi-Select</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Skills Selection</h3>
            <p className="ihub-text-muted">Select your technical skills</p>
          </div>
          
          <div className="ihub-card-body">
            <CheckBoxesField
              label="Technical Skills"
              options={skillsOptions}
              value={selectedSkills}
              onChange={handleSkillsChange}
              placeholder="Select your skills..."
              validation={validateSkills}
              showSelectedCount={true}
              className="ihub-skills-checkboxes"
            />
            
            <div className="ihub-selection-summary ihub-mt-3">
              <h5>Selected Skills ({selectedSkills.length}):</h5>
              <div className="ihub-selected-items">
                {selectedSkills.map(skill => {
                  const skillOption = skillsOptions.find(opt => opt.value === skill);
                  return (
                    <span key={skill} className={`ihub-skill-tag ${skillOption?.level.toLowerCase()}`}>
                      {skillOption?.label}
                      <span className="ihub-skill-category">({skillOption?.category})</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grouped Checkboxes */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Grouped Checkboxes</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Skills by Category</h3>
            <p className="ihub-text-muted">Organized by technology category</p>
          </div>
          
          <div className="ihub-card-body">
            <CheckBoxesField
              label="Technical Skills (Grouped)"
              options={skillsOptions}
              value={selectedSkills}
              onChange={handleSkillsChange}
              groupBy="category"
              layout="grouped"
              showGroupHeaders={true}
              allowSelectAll={true}
              allowSelectNone={true}
              className="ihub-grouped-checkboxes"
            />
          </div>
        </div>
      </section>

      {/* With Icons and Descriptions */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Enhanced Options</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Interests with Icons</h3>
              </div>
              
              <div className="ihub-card-body">
                <CheckBoxesField
                  label="Areas of Interest"
                  options={interestsOptions}
                  value={selectedInterests}
                  onChange={handleInterestsChange}
                  showIcons={true}
                  layout="grid"
                  columns={2}
                  className="ihub-interests-checkboxes"
                />
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Permissions with Descriptions</h3>
              </div>
              
              <div className="ihub-card-body">
                <CheckBoxesField
                  label="User Permissions"
                  options={permissionsOptions}
                  value={selectedPermissions}
                  onChange={handlePermissionsChange}
                  showDescriptions={true}
                  validation={validatePermissions}
                  required={true}
                  className="ihub-permissions-checkboxes"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Searchable Checkboxes */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Searchable Options</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Searchable Skills</h3>
            <p className="ihub-text-muted">Filter options with search</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-search-control ihub-mb-3">
              <input
                type="text"
                placeholder="Search skills..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="ihub-search-input"
              />
            </div>
            
            <CheckBoxesField
              label="Filtered Skills"
              options={getFilteredOptions(skillsOptions, filterQuery)}
              value={selectedSkills}
              onChange={handleSkillsChange}
              searchable={true}
              highlightSearch={filterQuery}
              showSelectedCount={true}
              maxHeight="300px"
              className="ihub-searchable-checkboxes"
            />
          </div>
        </div>
      </section>

      {/* Premium Features */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Premium Feature Selection</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Feature Toggles</h3>
            <p className="ihub-text-muted">Free and premium features</p>
          </div>
          
          <div className="ihub-card-body">
            <CheckBoxesField
              label="Available Features"
              options={featureOptions}
              value={selectedFeatures}
              onChange={handleFeaturesChange}
              groupBy={(option) => option.premium ? 'Premium Features' : 'Free Features'}
              showGroupHeaders={true}
              disabledOptions={featureOptions.filter(opt => opt.premium && !selectedFeatures.includes('premium-plan')).map(opt => opt.value)}
              customRenderer={(option, isSelected, isDisabled) => (
                <div className={`ihub-feature-option ${isDisabled ? 'disabled' : ''}`}>
                  <div className="ihub-feature-main">
                    <span className="ihub-feature-label">{option.label}</span>
                    {option.premium && <span className="ihub-premium-badge">Premium</span>}
                  </div>
                </div>
              )}
              className="ihub-features-checkboxes"
            />
            
            <div className="ihub-feature-summary ihub-mt-3">
              <div className="ihub-summary-stats">
                <div className="ihub-stat">
                  <span className="ihub-stat-label">Free Features:</span>
                  <span className="ihub-stat-value">
                    {selectedFeatures.filter(value => 
                      !featureOptions.find(opt => opt.value === value)?.premium
                    ).length}
                  </span>
                </div>
                <div className="ihub-stat">
                  <span className="ihub-stat-label">Premium Features:</span>
                  <span className="ihub-stat-value">
                    {selectedFeatures.filter(value => 
                      featureOptions.find(opt => opt.value === value)?.premium
                    ).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Configuration */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Advanced Features</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Full Feature Demo</h3>
            <p className="ihub-text-muted">All features combined</p>
          </div>
          
          <div className="ihub-card-body">
            <CheckBoxesField
              label="Complete Skills Assessment"
              options={skillsOptions}
              value={selectedSkills}
              onChange={handleSkillsChange}
              validation={validateSkills}
              required={true}
              searchable={true}
              groupBy="category"
              layout="grouped"
              showGroupHeaders={true}
              showSelectedCount={true}
              showSelectAllToggle={true}
              allowIndeterminate={true}
              customLabels={{
                selectAll: "Select All Skills",
                selectNone: "Clear Selection",
                required: "* Required field"
              }}
              helpText="Select the technologies you're proficient in. Minimum 2, maximum 8."
              className="ihub-advanced-checkboxes"
            />
          </div>
        </div>
      </section>

      {/* Summary Dashboard */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Selection Summary</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Current Selections</h3>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-summary-grid">
              <div className="ihub-summary-section">
                <h5>Skills ({selectedSkills.length}/8)</h5>
                <div className="ihub-progress-bar">
                  <div 
                    className="ihub-progress-fill"
                    style={{ width: `${(selectedSkills.length / 8) * 100}%` }}
                  ></div>
                </div>
                <p className="ihub-summary-text">
                  {selectedSkills.length < 2 ? 'Select at least 2 skills' : 
                   selectedSkills.length > 8 ? 'Too many skills selected' : 
                   'Good selection!'}
                </p>
              </div>
              
              <div className="ihub-summary-section">
                <h5>Interests ({selectedInterests.length})</h5>
                <div className="ihub-interests-tags">
                  {selectedInterests.map(interest => {
                    const option = interestsOptions.find(opt => opt.value === interest);
                    return (
                      <span key={interest} className="ihub-interest-tag">
                        {option?.icon} {option?.label}
                      </span>
                    );
                  })}
                </div>
              </div>
              
              <div className="ihub-summary-section">
                <h5>Permissions ({selectedPermissions.length})</h5>
                <div className="ihub-permissions-list">
                  {selectedPermissions.map(permission => {
                    const option = permissionsOptions.find(opt => opt.value === permission);
                    return (
                      <div key={permission} className="ihub-permission-item">
                        <span className={`ihub-permission-badge ${option?.level}`}>
                          {option?.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
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
{`interface CheckBoxesFieldProps {
  label?: string;                       // Field label
  options: Array<{                      // Checkbox options
    value: string;
    label: string;
    description?: string;
    icon?: string | React.ReactNode;
    disabled?: boolean;
    [key: string]: any;                 // Additional properties for grouping
  }>;
  value: string[];                      // Selected values
  onChange: (selected: string[]) => void; // Change handler
  validation?: (selected: string[]) => string | null; // Validation function
  required?: boolean;                   // Required field
  disabled?: boolean;                   // Disable all checkboxes
  layout?: 'list' | 'grid' | 'grouped'; // Layout type
  columns?: number;                     // Grid columns
  groupBy?: string | ((option: any) => string); // Grouping property or function
  showGroupHeaders?: boolean;           // Show group headers
  showSelectedCount?: boolean;          // Show selected count
  showSelectAllToggle?: boolean;        // Show select all/none toggle
  allowIndeterminate?: boolean;         // Allow indeterminate state
  searchable?: boolean;                 // Enable search
  highlightSearch?: string;             // Search query to highlight
  maxHeight?: string;                   // Maximum height
  showIcons?: boolean;                  // Show option icons
  showDescriptions?: boolean;           // Show option descriptions
  disabledOptions?: string[];           // Disabled option values
  customRenderer?: (option: any, isSelected: boolean, isDisabled: boolean) => React.ReactNode;
  customLabels?: {                      // Custom labels
    selectAll?: string;
    selectNone?: string;
    required?: string;
  };
  helpText?: string;                    // Help text
  className?: string;                   // CSS classes
}`}</pre>
          
          <h3 className="ihub-mt-3">Key Features:</h3>
          <ul>
            <li><strong>Multiple Selection:</strong> Select multiple values with validation</li>
            <li><strong>Grouping Support:</strong> Group options by category or custom criteria</li>
            <li><strong>Search and Filter:</strong> Built-in search with highlighting</li>
            <li><strong>Flexible Layouts:</strong> List, grid, and grouped arrangements</li>
            <li><strong>Validation:</strong> Custom validation with error messages</li>
            <li><strong>Rich Options:</strong> Support for icons, descriptions, and custom rendering</li>
          </ul>
          
          <h3 className="ihub-mt-3">Best Practices:</h3>
          <ul>
            <li>Provide clear labels and descriptions for complex options</li>
            <li>Use validation to guide users toward valid selections</li>
            <li>Group related options for better organization</li>
            <li>Consider performance with large option lists</li>
            <li>Ensure accessibility with proper ARIA labels</li>
            <li>Use appropriate layouts for different screen sizes</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default CheckBoxesFieldExamples;
```

## 🔗 Related Components

- [CheckBoxes](./CheckBoxes.md) - Basic checkbox component
- [RadioField](./RadioField.md) - Radio button field component
- [ToggleButton](./ToggleButton.md) - Toggle button component
- [SearchObjectsFromDB](./SearchObjectsFromDB.md) - Database search component
- [FilterArray](./FilterArray.md) - Array filtering component

