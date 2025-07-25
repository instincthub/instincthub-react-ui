"use client";

import React, { useState } from "react";
import { FilterArray, Badge } from "../../../../index";

const FilterArrayExample: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");

  // Sample data for demonstration
  const roles = ["Admin", "Manager", "User", "Guest"];
  const departments = ["IT", "Marketing", "Sales", "HR", "Finance"];
  const categories = ["Electronics", "Furniture", "Appliances", "Books"];
  const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];
  const statuses = ["Active", "Inactive", "Pending", "Suspended"];
  const brands = ["TechBrand", "AudioTech", "ComfortSeats", "BrewMaster"];

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>FilterArray Examples</h1>
        <p>Dropdown/select component for filtering from arrays of options</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic FilterArray */}
        <div className="ihub-example-card">
          <h3>Basic Role Filter</h3>
          <p>Simple dropdown for selecting user roles</p>
          
          <FilterArray
            options={roles}
            name="role"
            label="Select Role"
            setValue={setSelectedRole}
            defaultValue=""
            required={false}
          />
          
          <div className="ihub-selection-display">
            <p>Selected Role: 
              {selectedRole ? (
                <Badge text={selectedRole} variant="primary" />
              ) : (
                <span> None selected</span>
              )}
            </p>
          </div>
        </div>

        {/* Department Filter with Default Value */}
        <div className="ihub-example-card">
          <h3>Department Filter with Default</h3>
          <p>Dropdown with a pre-selected default value</p>
          
          <FilterArray
            options={departments}
            name="department"
            label="Select Department"
            setValue={setSelectedDepartment}
            defaultValue="IT"
            required={true}
            err={false}
          />
          
          <div className="ihub-selection-display">
            <p>Selected Department: 
              {selectedDepartment ? (
                <Badge text={selectedDepartment} variant="info" />
              ) : (
                <Badge text="IT" variant="info" />
              )}
            </p>
          </div>
        </div>

        {/* Category Filter with Validation */}
        <div className="ihub-example-card">
          <h3>Category Filter with Validation</h3>
          <p>Required dropdown with error state handling</p>
          
          <FilterArray
            options={categories}
            name="category"
            label="Product Category *"
            setValue={setSelectedCategory}
            required={true}
            err={selectedCategory === "" && selectedCategory !== undefined}
            error={selectedCategory === "" ? "Category is required" : ""}
          />
          
          <div className="ihub-selection-display">
            <p>Selected Category: 
              {selectedCategory ? (
                <Badge text={selectedCategory} variant="success" />
              ) : (
                <span className="text-red-500"> Required field</span>
              )}
            </p>
          </div>
        </div>

        {/* Level Filter with Custom Width */}
        <div className="ihub-example-card">
          <h3>Level Filter with Custom Styling</h3>
          <p>Dropdown with custom width and notes</p>
          
          <FilterArray
            options={levels}
            name="level"
            label="Skill Level"
            setValue={setSelectedLevel}
            defaultWidth="300px"
            notes="Choose your current skill level"
          />
          
          <div className="ihub-selection-display">
            <p>Selected Level: 
              {selectedLevel ? (
                <Badge 
                  text={selectedLevel} 
                  variant={
                    selectedLevel === "Beginner" ? "warning" :
                    selectedLevel === "Intermediate" ? "info" :
                    selectedLevel === "Advanced" ? "primary" : "success"
                  } 
                />
              ) : (
                <span> None selected</span>
              )}
            </p>
          </div>
        </div>

        {/* Status Filter with Array Props */}
        <div className="ihub-example-card">
          <h3>Status Filter with Array Props</h3>
          <p>Dropdown that updates an array of properties</p>
          
          <FilterArray
            options={statuses}
            name="status"
            label="Account Status"
            setValue={setSelectedStatus}
            arrayProps={[]}
            setArrayProps={(arrayProps, option) => {
              console.log("Array props updated:", arrayProps, "Selected:", option);
            }}
            dataName="userStatus"
          />
          
          <div className="ihub-selection-display">
            <p>Selected Status: 
              {selectedStatus ? (
                <Badge 
                  text={selectedStatus} 
                  variant={
                    selectedStatus === "Active" ? "success" :
                    selectedStatus === "Pending" ? "warning" : "danger"
                  } 
                />
              ) : (
                <span> None selected</span>
              )}
            </p>
          </div>
        </div>

        {/* Brand Filter with Name-Value Callback */}
        <div className="ihub-example-card">
          <h3>Brand Filter with Name-Value Callback</h3>
          <p>Dropdown using setNameValue callback pattern</p>
          
          <FilterArray
            options={brands}
            name="brand"
            label="Select Brand"
            setNameValue={(name, value) => {
              console.log(`Field ${name} changed to: ${value}`);
              setSelectedBrand(value);
            }}
            notUpperCase={true}
          />
          
          <div className="ihub-selection-display">
            <p>Selected Brand: 
              {selectedBrand ? (
                <Badge text={selectedBrand} variant="primary" />
              ) : (
                <span> None selected</span>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { FilterArray } from '@instincthub/react-ui';

const [selectedValue, setSelectedValue] = useState('');
const options = ['Option 1', 'Option 2', 'Option 3'];

<FilterArray
  options={options}
  name="example"
  label="Select Option"
  setValue={setSelectedValue}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Advanced Configuration</h3>
          <pre><code>{`<FilterArray
  options={options}
  name="advanced"
  label="Required Field *"
  setValue={setValue}
  defaultValue="Option 1"
  required={true}
  err={hasError}
  error="This field is required"
  defaultWidth="250px"
  notes="Additional help text"
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Using with Array Props</h3>
          <pre><code>{`<FilterArray
  options={options}
  name="arrayExample"
  label="Update Array"
  arrayProps={currentArray}
  setArrayProps={(arrayProps, option) => {
    // Handle array update logic
    console.log('Updated:', arrayProps, option);
  }}
  dataName="fieldName"
/>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default FilterArrayExample;