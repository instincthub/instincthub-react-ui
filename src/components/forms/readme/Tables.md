# Tables Component

A reusable table component with filtering capabilities.

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `data` | TableItem[] | Yes | Array of data items to display in the table |

## Interface

```typescript
interface TableItem {
  id: string | number;
  title: string;
  // Additional fields as needed
}
```

## Features

- Displays tabular data with row numbering
- Built-in title filtering
- Responsive design
- Easy to extend with additional columns

## Usage

```tsx
import Tables from './components/Tables';

const MyPage = () => {
  const tableData = [
    { id: 1, title: 'Item One' },
    { id: 2, title: 'Item Two' },
    { id: 3, title: 'Item Three' }
  ];

  return (
    <div>
      <h1>My Data</h1>
      <Tables data={tableData} />
    </div>
  );
};
```

## Extending the Component

To add more columns, uncomment the relevant parts in both the interface and JSX:

```typescript
// In the interface
interface TableItem {
  id: string | number;
  title: string;
  column2: string;
  column3: string;
  // Add more as needed
}

// In the JSX
<thead>
  <tr>
    <th>No</th>
    <th>Column 1</th>
    <th>Column 2</th>
    <th>Column 3</th>
    {/* Add more headers as needed */}
  </tr>
</thead>
<tbody>
  {filteredData.map((item, index) => (
    <tr key={item.id}>
      <td>{index+1}</td>
      <td>{item.title}</td>
      <td>{item.column2}</td>
      <td>{item.column3}</td>
      {/* Add more cells as needed */}
    </tr>
  ))}
</tbody>
```

## Customization

The component uses CSS classes with the "ihub-" prefix for styling. Add the provided CSS to your input-fields.css file.