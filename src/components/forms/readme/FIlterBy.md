# FilterBy Component

A dropdown selection component for filtering options with TypeScript support.

## Table of Contents
- [Installation](#installation)
- [Interfaces](#interfaces)
- [Components](#components)
- [Usage Examples](#usage-examples)
- [Props](#props)
- [CSS Classes](#css-classes)

## Installation

Ensure you have React and TypeScript installed in your project:

```bash
npm install react react-dom typescript @types/react @types/react-dom
```

## Interfaces

### FilterByProps

- **Description**: Props for the FilterBy component.
- **Properties**:
  - `selected: string` - The currently selected filter option.
  - `setSelected: (value: string) => void` - Callback function to update the selected value.

## Components

### FilterBy

- **Description**: A dropdown component for filtering data by time periods.
- **Parameters**: `props: FilterByProps` - Component properties.
- **Returns**: `JSX.Element` - A dropdown filter component.

## Usage Examples

### Basic Usage

```typescript
import React, { useState } from 'react';
import FilterBy from './FilterBy';

const Example = () => {
  const [filterOption, setFilterOption] = useState('Last 7days');
  
  return (
    <div>
      <h3>Filter Data</h3>
      <FilterBy 
        selected={filterOption} 
        setSelected={setFilterOption} 
      />
      <div>
        Showing data for: {filterOption}
      </div>
    </div>
  );
};
```

### Using in a Dashboard

```typescript
import React, { useState, useEffect } from 'react';
import FilterBy from './FilterBy';

const Dashboard = () => {
  const [filterOption, setFilterOption] = useState('Last 7days');
  const [data, setData] = useState<any[]>([]);
  
  useEffect(() => {
    // Fetch data based on the selected filter
    const fetchData = async () => {
      // Example API call
      const response = await fetch(`/api/data?timeframe=${filterOption}`);
      const result = await response.json();
      setData(result);
    };
    
    fetchData();
  }, [filterOption]);
  
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Sales Dashboard</h2>
        <FilterBy 
          selected={filterOption} 
          setSelected={setFilterOption} 
        />
      </div>
      <div className="dashboard-content">
        {/* Display data based on the selected filter */}
        {data.map(item => (
          <div key={item.id}>{item.value}</div>
        ))}
      </div>
    </div>
  );
};
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| selected | string | The currently selected filter option |
| setSelected | (value: string) => void | Callback function to update the selected value |

## CSS Classes

The component uses the following CSS classes:

- `.select_me` - Main container
- `.select-btn` - Dropdown button
- `.input_drop` - Readonly input field
- `.select_content` - Dropdown content container
- `.select_items` - Individual dropdown option

## Customizing the Component

### Adding Custom Filter Options

You can modify the available options by changing the `options` array:

```typescript
const FilterBy: React.FC<FilterByProps> = ({ selected, setSelected }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  // Customize these options based on your requirements
  const options = [
    "Today", 
    "Yesterday", 
    "Last 7days", 
    "Last 14 days", 
    "This month", 
    "Last Month",
    "Last Quarter",
    "This Year"
  ];
  
  // Component implementation
  // ...
};
```

### Styling the SVG Icon

The component uses an inline SVG for the dropdown arrow. You can customize its appearance through CSS:

```css
.select-btn svg {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.select-btn:hover svg {
  color: #00838f; /* Uses the currentColor value */
}

/* Optional: Add rotation animation when dropdown is open */
.select_me.active .select-btn svg {
  transform: rotate(180deg);
}
```