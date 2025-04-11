# THeadSortList Component

A React TypeScript component that renders sortable table headers with column sorting functionality.

## Overview

The THeadSortList component provides a flexible and reusable way to implement sortable table headers in React applications. It manages the sorting state, handles data sorting logic, and renders appropriate header elements based on configuration.

## Installation

The component requires the following dependencies:

```bash
npm install @instincthub/react-ui
```

## Usage

```tsx
import React, { useState, useEffect } from "react";
import THeadSortList from "./THeadSortList";

const MyTable: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [next, setNext] = useState<string>("");
  const token = "your-auth-token";
  const handle = "your-account-handle";

  // Define sortable columns configuration
  const headerItems = [
    { label: "ID", width: "80px" },
    { label: "Name", width: "200px" },
    { label: "Status", key: "status", width: "120px" },
    { label: "Created Date", key: "created_at", width: "150px" },
    { label: "Actions", width: "100px" },
  ];

  const fetchData = (urlPath: string, reset: boolean = false) => {
    // Your data fetching implementation
  };

  useEffect(() => {
    fetchData("/api/items");
  }, []);

  return (
    <div className="ihub-data-table-container">
      <table className="ihub-data-table">
        <THeadSortList
          setData={setData}
          setNext={setNext}
          fetchData={fetchData}
          token={token}
          handle={handle}
          urlPath="/api/items"
          headerItems={headerItems}
        />
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>{/* Table row cells */}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

## Component Props

| Prop          | Type                                           | Required | Description                                               |
| ------------- | ---------------------------------------------- | -------- | --------------------------------------------------------- |
| `setData`     | `React.Dispatch<React.SetStateAction<any[]>>`  | Yes      | Function to update the data state in the parent component |
| `setNext`     | `React.Dispatch<React.SetStateAction<string>>` | Yes      | Function to update the pagination 'next' URL state        |
| `fetchData`   | `(urlPath: string, reset?: boolean) => void`   | Yes      | Function to fetch data from the API                       |
| `token`       | `string`                                       | No       | Authentication token for API requests                     |
| `handle`      | `string`                                       | No       | User/account handle for API requests                      |
| `urlPath`     | `string`                                       | Yes      | API endpoint path for data fetching                       |
| `headerItems` | `HeaderItem[]`                                 | Yes      | Configuration for table headers                           |

## Interfaces

### HeaderItem

Defines the configuration for each table header.

```typescript
interface HeaderItem {
  label: string; // Display text for the header
  key?: string; // Optional data property key for sortable columns
  width?: string; // Optional CSS width value
}
```

### ApiResponse

Represents the expected structure of API responses.

```typescript
interface ApiResponse {
  results: any[]; // Array of data items
  next?: string; // Optional URL for the next page of results
}
```

## Component Structure

The component consists of:

1. **THeadSortList**: Main component that renders the table header row
2. **THeadSortBtn**: Child component for rendering sortable header cells

## Styling

Include the following CSS styles:

```css
/* Table sorting styles */
.ihub-sort-btn {
  background: none;
  border: none;
  color: var(--Gunmetal);
  font-weight: 600;
  cursor: pointer;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  text-align: left;
  transition: color 0.2s ease;
}

.ihub-sort-btn:hover {
  color: var(--DarkCyan);
}

.ihub-sort-btn.ihub-active {
  color: var(--DarkCyan);
}

.ihub-sort-icon {
  font-size: 10px;
  display: inline-block;
  margin-left: 8px;
  opacity: 0.5;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.ihub-sort-btn.ihub-active .ihub-sort-icon {
  opacity: 1;
  transform: rotate(180deg);
}

/* Table styles */
.ihub-data-table {
  width: 100%;
  border-collapse: collapse;
}

.ihub-data-table thead th {
  background-color: var(--Magnolia);
  padding: 12px;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid var(--LavenderGray);
}
```

## How Sorting Works

1. When a sortable header is clicked, the `handleSort` function is called with the column key
2. If it's the first time sorting this column, the component:
   - Fetches the complete dataset (if not already available)
   - Sorts the data based on the column values
   - Updates the parent component's data state
3. If the same column is clicked again, sorting is reset by calling `fetchData` with the reset flag

## Notes

- The component uses the `@instincthub/react-ui` library for API interactions
- Sortable columns should have a valid `key` property that matches the data object properties
- Custom column widths can be specified using the `width` property
