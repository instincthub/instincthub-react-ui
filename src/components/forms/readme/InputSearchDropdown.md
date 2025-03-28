# InputSearchDropdown Component

A TypeScript React component that provides a searchable dropdown for selecting organizations or other options.

## Table of Contents
- [Installation](#installation)
- [Interfaces](#interfaces)
- [Component](#component)
- [Usage Examples](#usage-examples)
- [CSS Classes](#css-classes)

## Installation

No additional dependencies required beyond React.

## Interfaces

### Option
- **Description**: Object structure for dropdown options.
- **Properties**:
  - `name: string` - Display name of the option
  - Additional properties are allowed through `[key: string]: any`

### InputSearchDropdownProps
- **Description**: Props for the InputSearchDropdown component.
- **Properties**:
  - `options: Option[]` - Array of selectable options
  - `onOptionSelected: (option: Option) => void` - Callback when option is selected
  - `defaultValues?: string` - Optional pre-populated search value
  - `names?: string` - Optional input field name attribute
  - `disableds?: boolean` - Optional flag to disable input field (default: false)

## Component

### InputSearchDropdown
- **Description**: A searchable dropdown component for option selection.
- **Parameters**:
  - `props: InputSearchDropdownProps` - Component props
- **Behavior**:
  - Displays a search input field and dropdown list
  - Filters options as user types
  - Calls `onOptionSelected` callback when an option is selected
  - Support for disabled state and default values
- **Returns**: `JSX.Element` - The rendered component

## Usage Examples

### Basic Example

```tsx
import React, { useState } from 'react';
import InputSearchDropdown from './InputSearchDropdown';

interface Organization {
  name: string;
  id: number;
}

const OrganizationSelector: React.FC = () => {
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  
  const organizations: Organization[] = [
    { name: "Acme Inc", id: 1 },
    { name: "Globex Corporation", id: 2 },
    { name: "Initech", id: 3 },
    { name: "Umbrella Corporation", id: 4 }
  ];
  
  const handleOrgSelected = (org: Organization) => {
    setSelectedOrg(org);
    console.log(`Selected organization: ${org.name} (ID: ${org.id})`);
  };
  
  return (
    <div>
      <InputSearchDropdown
        options={organizations}
        onOptionSelected={handleOrgSelected}
      />
      
      {selectedOrg && (
        <div>
          <h4>Selected Organization:</h4>
          <p>{selectedOrg.name} (ID: {selectedOrg.id})</p>
        </div>
      )}
    </div>
  );
};
```

### With Default Value and Disabled State

```tsx
import React from 'react';
import InputSearchDropdown from './InputSearchDropdown';

const PrefilledOrgSelector: React.FC = () => {
  const organizations = [
    { name: "Acme Inc", id: 1 },
    { name: "Globex Corporation", id: 2 }
  ];
  
  const handleOrgSelected = (org: any) => {
    console.log(`Organization selected: ${org.name}`);
  };
  
  return (
    <div>
      <h2>Readonly Organization Selection</h2>
      <InputSearchDropdown
        options={organizations}
        onOptionSelected={handleOrgSelected}
        defaultValues="Acme Inc"
        names="organization"
        disableds={true}
      />
    </div>
  );
};
```

## CSS Classes

The component uses the following CSS classes which should be added to your project's CSS:

- `.ihub-react-search-dropdown` - Main container
- `.ihub-react-search-dropdown-title` - Title element
- `.ihub-field` - Input field container
- `.ihub-input` - Text input element
- `.ihub-drop-down-list` - Dropdown list