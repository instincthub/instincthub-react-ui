# TBodyNoData Component

## Overview
`TBodyNoData` is a React component that displays a "No Data" message inside a table row. This component is designed to be used within a table body (`<tbody>`) when there are no data rows to display, providing a user-friendly empty state.

## Installation

### Prerequisites
- React 16.8.0 or higher
- Material-UI (MUI) v5 or higher

### Required Dependencies
```bash
npm install @mui/material @mui/icons-material
# or
yarn add @mui/material @mui/icons-material
```

## Component Details

### Import
```tsx
import TBodyNoData from '@/components/tables/TBodyNoData';
```

### Props
This component does not accept any props.

### Usage Example

```tsx
import React from 'react';
import TBodyNoData from '@/components/tables/TBodyNoData';

const CohortTable: React.FC = () => {
  const cohorts = []; // Empty array representing no cohorts
  
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {cohorts.length > 0 ? (
          cohorts.map(cohort => (
            <tr key={cohort.id}>
              <td>{cohort.name}</td>
              <td>{cohort.startDate}</td>
              <td>{cohort.endDate}</td>
              <td>{cohort.status}</td>
            </tr>
          ))
        ) : (
          <TBodyNoData />
        )}
      </tbody>
    </table>
  );
};

export default CohortTable;
```

### CSS Dependencies
This component relies on the `.ihub-empty-state` CSS class which should be defined in your CSS files with the following styling:

```css
.ihub-empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #888;
  padding: 20px;
  text-align: center;
}

.ihub-empty-state h4 {
  margin: 10px 0;
  font-weight: 500;
}

.ihub-empty-state p {
  text-align: center;
  margin: 5px 0;
  color: #666;
}
```

### Features
- Spans across all table columns using `colSpan={99}`
- Displays a `GroupWorkOutlined` icon from Material-UI
- Shows "No Data" heading
- Includes a descriptive message that can be customized based on your application's context

### Customization
To customize the message or icon:

1. Create a new component that extends this one
2. Or modify the message directly in the component file

Example with custom message:
```tsx
const TBodyNoData: React.FC<{ message?: string }> = ({ 
  message = "You have no cohort with the selected category." 
}) => {
  return (
    <tr>
      <td colSpan={99}>
        <div className="ihub-empty-state">
          <GroupWorkOutlinedIcon />
          <h4>No Data</h4>
          <p>{message}</p>
        </div>
      </td>
    </tr>
  );
};
```

## Best Practices
- Use this component consistently across all tables in your application for a unified user experience
- Consider adding animations or illustrations for a more engaging empty state
- Ensure the message clearly communicates why data might be missing and what actions the user can take