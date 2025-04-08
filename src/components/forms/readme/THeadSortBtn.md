# THeadSortBtn Component

## Overview

`THeadSortBtn` is a React component that provides a sortable table header cell with visual indicators for sort direction. It displays the provided label text along with an arrow icon that changes direction based on the current sort state.

## Installation

This component requires Material UI icons and React:

```bash
npm install @mui/icons-material @mui/material react
```

## Component Props

| Prop         | Type      | Required | Description                                             |
| ------------ | --------- | -------- | ------------------------------------------------------- |
| `keys`       | string    | Yes      | The key identifier used for sorting data                |
| `labels`     | ReactNode | Yes      | Content to display in the table header                  |
| `sorted`     | string    | Yes      | Current sorted column key                               |
| `widths`     | string    | No       | Optional minimum width for the column (default: "auto") |
| `handleSort` | function  | Yes      | Callback function when sort button is clicked           |

## Usage Example

```tsx
import React, { useState } from "react";
import THeadSortBtn from "./THeadSortBtn";

interface DataItem {
  id: number;
  name: string;
  age: number;
}

const UserTable: React.FC = () => {
  const [sortKey, setSortKey] = useState<string>("name");
  const [data, setData] = useState<DataItem[]>([
    { id: 1, name: "Alice", age: 29 },
    { id: 2, name: "Bob", age: 32 },
    { id: 3, name: "Charlie", age: 25 },
  ]);

  const handleSort = (key: string) => {
    setSortKey(key);

    // Sort the data based on the key
    const sortedData = [...data].sort((a, b) => {
      if (a[key as keyof DataItem] < b[key as keyof DataItem]) return -1;
      if (a[key as keyof DataItem] > b[key as keyof DataItem]) return 1;
      return 0;
    });

    setData(sortedData);
  };

  return (
    <table className="ihub-data-list-container">
      <thead>
        <tr>
          <THeadSortBtn
            keys="name"
            labels="Name"
            sorted={sortKey}
            handleSort={handleSort}
          />
          <THeadSortBtn
            keys="age"
            labels="Age"
            sorted={sortKey}
            handleSort={handleSort}
            widths="100px"
          />
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
```

## CSS Styling

The component uses the following CSS classes which should be defined in your stylesheet:

```css
/* THeadSortBtn styles */
.ihub-thead-sort {
  cursor: pointer;
}

.ihub-thead-sort:hover {
  color: var(--DarkCyan);
}

.ihub-thead-sort svg {
  font-size: 14px;
  position: relative;
  right: -10px;
}

.ihub-thead-sort svg:hover {
  color: var(--DarkCyan);
  font-size: 14px;
}

.ihub-thead-sort.ihub-sorted svg {
  color: var(--DarkCyan);
}
```

## Behavior

1. When the header cell is clicked, it calls the `handleSort` function with the provided `keys` parameter
2. The arrow icon displays downward by default
3. When the column is being sorted (when `sorted === keys`), the arrow points upward
4. The component highlights when sorted or hovered

## Accessibility

The component uses semantic HTML table header elements (`<th>`) and provides clear visual indication of sort state with icons.
