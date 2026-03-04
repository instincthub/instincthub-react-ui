"use client";

import React, { useState } from "react";
import { SearchableDropdown } from "../../../../index";

const SearchableDropdownExample: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedOption, setSelectedOption] = useState<any>(null);

  const handleChange = (
    name: string,
    value: string,
    option: any
  ) => {
    setSelectedValue(value);
    setSelectedLabel(option?.label || "");
    setSelectedOption(option);
    console.log("onChange:", { name, value, option });
  };

  // Demo token — replace with a real token for live API testing
  const demoToken = "demo-token";

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>SearchableDropdown Examples</h1>
        <p>
          API-powered searchable dropdown with debounced search, selection, and
          clear functionality.
        </p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Usage */}
        <div className="ihub-example-card">
          <h3>Basic Usage</h3>
          <p>Simple searchable dropdown with default settings</p>
          <SearchableDropdown
            searchUrl="https://jsonplaceholder.typicode.com/users"
            token={null}
            name="user_id"
            label="Select User"
            labelKey="name"
            valueKey="id"
            onChange={handleChange}
          />
          <div className="ihub-example-output">
            <strong>Selected:</strong>{" "}
            {selectedLabel || "None"}
          </div>
        </div>

        {/* With Custom Placeholder */}
        <div className="ihub-example-card">
          <h3>Custom Placeholder</h3>
          <p>Dropdown with custom placeholder text</p>
          <SearchableDropdown
            searchUrl="https://jsonplaceholder.typicode.com/users"
            token={null}
            name="user_search"
            label="Find a User"
            placeholder="Type a name..."
            labelKey="name"
            valueKey="id"
            onChange={(name, value, option) =>
              console.log("Selected:", name, value, option)
            }
          />
        </div>

        {/* With Label Formatter */}
        <div className="ihub-example-card">
          <h3>Custom Label Formatter</h3>
          <p>Uses a formatter function to combine fields</p>
          <SearchableDropdown
            searchUrl="https://jsonplaceholder.typicode.com/users"
            token={null}
            name="user_formatted"
            label="Select User (with email)"
            valueKey="id"
            labelFormatter={(item) => `${item.name} (${item.email})`}
            onChange={(name, value, option) =>
              console.log("Formatted:", name, value, option)
            }
          />
        </div>

        {/* Pre-selected Value */}
        <div className="ihub-example-card">
          <h3>Pre-selected Value</h3>
          <p>Dropdown with a pre-selected value</p>
          <SearchableDropdown
            searchUrl="https://jsonplaceholder.typicode.com/users"
            token={null}
            name="preset_user"
            label="Assigned User"
            labelKey="name"
            valueKey="id"
            selectedValue="3"
            selectedLabel="Clementine Bauch"
            onChange={(name, value, option) =>
              console.log("Changed:", name, value, option)
            }
          />
        </div>

        {/* Required Field */}
        <div className="ihub-example-card">
          <h3>Required Field</h3>
          <p>Required dropdown with validation</p>
          <SearchableDropdown
            searchUrl="https://jsonplaceholder.typicode.com/users"
            token={null}
            name="required_user"
            label="Manager"
            required
            labelKey="name"
            valueKey="id"
            onChange={(name, value, option) =>
              console.log("Required:", name, value, option)
            }
          />
        </div>

        {/* With Error */}
        <div className="ihub-example-card">
          <h3>With Error Message</h3>
          <p>Dropdown showing an error state</p>
          <SearchableDropdown
            searchUrl="https://jsonplaceholder.typicode.com/users"
            token={null}
            name="error_user"
            label="Reviewer"
            required
            error="Please select a reviewer"
            labelKey="name"
            valueKey="id"
            onChange={(name, value, option) =>
              console.log("Error field:", name, value, option)
            }
          />
        </div>

        {/* Custom Debounce */}
        <div className="ihub-example-card">
          <h3>Custom Debounce (800ms)</h3>
          <p>Longer debounce delay for slower typing</p>
          <SearchableDropdown
            searchUrl="https://jsonplaceholder.typicode.com/users"
            token={null}
            name="slow_search"
            label="Search (800ms debounce)"
            labelKey="name"
            valueKey="id"
            debounceMs={800}
            onChange={(name, value, option) =>
              console.log("Slow search:", name, value, option)
            }
          />
        </div>

        {/* With Token */}
        <div className="ihub-example-card">
          <h3>With Auth Token</h3>
          <p>Dropdown that passes an auth token with requests</p>
          <SearchableDropdown
            searchUrl="https://jsonplaceholder.typicode.com/users"
            token={demoToken}
            name="auth_user"
            label="Authenticated Search"
            labelKey="name"
            valueKey="id"
            onChange={(name, value, option) =>
              console.log("Auth:", name, value, option)
            }
          />
        </div>
      </div>

      {/* Selected Option Details */}
      {selectedOption && (
        <div className="ihub-example-card ihub-mt-10">
          <h3>Last Selection Details</h3>
          <pre>
            <code>{JSON.stringify(selectedOption, null, 2)}</code>
          </pre>
        </div>
      )}

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>

        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre>
            <code>{`import { SearchableDropdown } from '@instincthub/react-ui';

<SearchableDropdown
  searchUrl="https://api.example.com/items/"
  token="auth-token"
  name="item_id"
  label="Select Item"
  labelKey="title"
  valueKey="id"
  onChange={(name, value, option) => console.log(name, value, option)}
/>`}</code>
          </pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Custom Label Formatter</h3>
          <pre>
            <code>{`<SearchableDropdown
  searchUrl="/api/users/"
  token={token}
  name="user_id"
  label="Select User"
  valueKey="pk"
  labelFormatter={(item) => \`\${item.first_name} \${item.last_name}\`}
  onChange={handleChange}
/>`}</code>
          </pre>
        </div>

        <div className="ihub-code-section">
          <h3>Pre-selected with Error</h3>
          <pre>
            <code>{`<SearchableDropdown
  searchUrl="/api/departments/"
  token={token}
  name="department_id"
  label="Department"
  required
  error={errors.department}
  labelKey="name"
  valueKey="id"
  selectedValue="42"
  selectedLabel="Engineering"
  onChange={handleChange}
/>`}</code>
          </pre>
        </div>
      </div>

      <div className="ihub-api-reference">
        <h2>API Reference</h2>
        <div className="ihub-api-table">
          <table>
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>searchUrl</td>
                <td>string</td>
                <td>-</td>
                <td>API endpoint URL (search query appended as ?search=)</td>
              </tr>
              <tr>
                <td>token</td>
                <td>string | null</td>
                <td>-</td>
                <td>Authentication token for API requests</td>
              </tr>
              <tr>
                <td>name</td>
                <td>string</td>
                <td>-</td>
                <td>Form field name for the hidden input</td>
              </tr>
              <tr>
                <td>label</td>
                <td>string</td>
                <td>"Select"</td>
                <td>Display label above the dropdown</td>
              </tr>
              <tr>
                <td>placeholder</td>
                <td>string</td>
                <td>"Search..."</td>
                <td>Placeholder text</td>
              </tr>
              <tr>
                <td>required</td>
                <td>boolean</td>
                <td>false</td>
                <td>Whether the field is required</td>
              </tr>
              <tr>
                <td>labelKey</td>
                <td>string</td>
                <td>"label"</td>
                <td>Key for display label from API response</td>
              </tr>
              <tr>
                <td>labelFormatter</td>
                <td>{"(item: any) => string"}</td>
                <td>-</td>
                <td>Custom label formatter (overrides labelKey)</td>
              </tr>
              <tr>
                <td>valueKey</td>
                <td>string</td>
                <td>"id"</td>
                <td>Key for value/id from API response</td>
              </tr>
              <tr>
                <td>onChange</td>
                <td>{"(name, value, option) => void"}</td>
                <td>-</td>
                <td>Callback when selection changes</td>
              </tr>
              <tr>
                <td>selectedValue</td>
                <td>string</td>
                <td>""</td>
                <td>Pre-selected value (id)</td>
              </tr>
              <tr>
                <td>selectedLabel</td>
                <td>string</td>
                <td>""</td>
                <td>Pre-selected label for display</td>
              </tr>
              <tr>
                <td>debounceMs</td>
                <td>number</td>
                <td>400</td>
                <td>Debounce delay in milliseconds</td>
              </tr>
              <tr>
                <td>error</td>
                <td>string</td>
                <td>-</td>
                <td>Error message to display</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchableDropdownExample;
