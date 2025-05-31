# Enhanced Pagination with API Integration

A sophisticated pagination component for @instincthub-react-ui that automatically handles API calls, search filtering, and tab navigation. Built with TypeScript and designed for seamless integration with Django REST Framework backends.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Integration](#api-integration)
- [TypeScript Interfaces](#typescript-interfaces)
- [Component Props](#component-props)
- [Usage Examples](#usage-examples)
- [Advanced Features](#advanced-features)
- [Styling](#styling)
- [Performance](#performance)
- [Migration Guide](#migration-guide)

## Overview

This enhanced pagination component goes beyond simple navigation by providing:

- **Automatic API Calls**: Fetches data when pagination, search, or filters change
- **URL-based Navigation**: Uses offset parameters for proper browser history
- **Integrated Filtering**: Supports search queries and tab-based filtering
- **Smart Range Display**: Shows limited page numbers with sliding window
- **Loading States**: Visual feedback during API requests
- **Error Handling**: Robust error management and recovery

## Key Features

### 🚀 **Automatic Data Fetching**

```typescript
// Component automatically calls API when:
// - Page changes (offset parameter)
// - Search query changes
// - Tab/category filter changes
// - Items per page changes
```

### 🔗 **URL Integration**

```typescript
// Uses URL search parameters for:
// - Pagination: ?offset=20
// - Search: ?search=react
// - Categories: ?cat=tech
// - Combined: ?offset=40&search=react&cat=tech
```

### 📱 **Responsive Design**

- Mobile: Compact buttons, hidden first/last
- Tablet: Reduced spacing, smaller buttons
- Desktop: Full functionality with optimal spacing

### ♿ **Accessibility First**

- Full keyboard navigation support
- ARIA labels and landmarks
- Screen reader announcements
- High contrast mode support

## Installation

```bash
# Install the library
npm install @instincthub/react-ui

# Ensure you have the required dependencies
npm install next react
```

Add the pagination styles to your `input-fields.css` file.

## Quick Start

```tsx
"use client";
import { useState } from "react";
import { Pagination } from "@instincthub/react-ui";

function PostsList() {
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("");

  // Get offset from URL (use useSearchParams in real app)
  const offset = "0"; // or from useSearchParams()

  return (
    <div>
      {/* Your search and filter UI */}
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search posts..."
      />

      {/* Your data display */}
      {data?.results?.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}

      {/* Pagination with automatic API integration */}
      <Pagination
        offset={offset}
        data={data}
        limit={20}
        urlPath={API_HOST_URL + "posts/"}
        setData={setData}
        token="your-auth-token"
        searchValues={searchQuery}
        tabsValues={activeTab}
      />
    </div>
  );
}
```

## API Integration

### Expected API Response Format

The component expects Django REST Framework pagination format:

```typescript
interface PaginationResponse {
  count: number; // Total items across all pages
  next: string | null; // URL for next page
  previous: string | null; // URL for previous page
  results: any[]; // Current page items
}
```

### Example API Response

```json
{
  "count": 150,
  "next": "http://api.example.com/posts/?limit=20&offset=20&search=react",
  "previous": null,
  "results": [
    { "id": 1, "title": "React Basics", "content": "..." },
    { "id": 2, "title": "Advanced React", "content": "..." }
  ]
}
```

### API Call Flow

```typescript
// 1. User navigates to page 2
// 2. Component extracts offset=20 from URL
// 3. API call: GET /api/v1/posts?limit=20&offset=20&search=query&cat=tech
// 4. Response updates data state
// 5. Component re-renders with new data
```

## TypeScript Interfaces

### PaginationData

```typescript
interface PaginationData {
  /** Total number of items across all pages */
  count: number;
  /** URL for the next page or null if no next page */
  next: string | null;
  /** URL for the previous page or null if no previous page */
  previous: string | null;
  /** Array of items for the current page */
  results: any[];
}
```

### PaginationProps

```typescript
interface PaginationProps {
  /** Current offset value from URL params */
  offset: string | number;
  /** Pagination data from API response */
  data: PaginationData;
  /** Number of items per page */
  limit: number;
  /** API endpoint path */
  urlPath: string;
  /** Function to update data state */
  setData: React.Dispatch<React.SetStateAction<any>>;
  /** Authentication token */
  token?: string | boolean;
  /** Current tab filter value */
  tabsValues?: string;
  /** Current search query */
  searchValues?: string;
  /** Maximum number of page buttons to show */
  rangeLimit?: number;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show first/last buttons */
  showFirstLast?: boolean;
}
```

## Component Props

| Prop            | Type                | Required | Default | Description                        |
| --------------- | ------------------- | -------- | ------- | ---------------------------------- |
| `offset`        | `string \| number`  | ✅       | -       | Current offset from URL parameters |
| `data`          | `PaginationData`    | ✅       | -       | API response with pagination info  |
| `limit`         | `number`            | ✅       | -       | Items per page                     |
| `urlPath`       | `string`            | ✅       | -       | API endpoint path                  |
| `setData`       | `function`          | ✅       | -       | State setter for data updates      |
| `token`         | `string \| boolean` | ❌       | `false` | Authentication token               |
| `tabsValues`    | `string`            | ❌       | `""`    | Current tab/category filter        |
| `searchValues`  | `string`            | ❌       | `""`    | Current search query               |
| `rangeLimit`    | `number`            | ❌       | `5`     | Max visible page buttons           |
| `className`     | `string`            | ❌       | `""`    | Additional CSS classes             |
| `showFirstLast` | `boolean`           | ❌       | `true`  | Show first/last buttons            |

## Usage Examples

### Basic Pagination

```tsx
<Pagination
  offset={currentOffset}
  data={apiResponse}
  limit={20}
  urlPath={API_HOST_URL + "posts/"}
  setData={setPostsData}
  token={userToken}
/>
```

### With Search Integration

```tsx
const [searchQuery, setSearchQuery] = useState("");

<Pagination
  offset={currentOffset}
  data={searchResults}
  limit={20}
  urlPath={API_HOST_URL + "posts/"}
  setData={setSearchResults}
  searchValues={searchQuery}
  token={userToken}
/>;
```

### With Category Filtering

```tsx
const [activeCategory, setActiveCategory] = useState("tech");

<Pagination
  offset={currentOffset}
  data={filteredData}
  limit={20}
  urlPath={API_HOST_URL + "posts/"}
  setData={setFilteredData}
  tabsValues={activeCategory}
  searchValues={searchQuery}
  token={userToken}
/>;
```

### Next.js Integration with useSearchParams

```tsx
"use client";
import { useSearchParams, useRouter } from "next/navigation";

function PostsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const offset = searchParams.get("offset") || "0";

  return (
    <Pagination
      offset={offset}
      data={data}
      limit={20}
      urlPath={API_HOST_URL + "posts/"}
      setData={setData}
      // Component handles URL updates through Link components
    />
  );
}
```

### Custom Range and Styling

```tsx
<Pagination
  offset={currentOffset}
  data={data}
  limit={50}
  urlPath={API_HOST_URL + "posts/"}
  setData={setData}
  rangeLimit={7} // Show up to 7 page buttons
  showFirstLast={false} // Hide first/last buttons
  className="custom-pagination"
/>
```

## Advanced Features

### Loading States

The component automatically shows loading indicators during API calls:

```tsx
// Loading spinner appears automatically
// No additional code needed
```

### Error Handling

```typescript
// Built-in error handling for:
// - Network failures
// - Invalid API responses
// - URL parsing errors
// - Authentication issues
```

### Smart Page Range

```typescript
// Automatically adjusts visible pages:
// Pages 1-5: [1] [2] [3] [4] [5]
// Page 10: [8] [9] [10] [11] [12]
// Last pages: [46] [47] [48] [49] [50]
```

### URL Parameter Management

```typescript
// Automatically constructs API URLs:
const url = `${API_HOST_URL}${urlPath}?limit=${limit}&offset=${offset}&search=${search}&cat=${category}`;
```

## Styling

### CSS Classes

```css
.ihub-pagination-container    /* Main container */
/* Main container */
/* Main container */
/* Main container */
.ihub-pagination-list         /* Pagination list */
.ihub-pagination-item         /* Individual items */
.ihub-pagination-link         /* All links */
.ihub-pagination-active       /* Active page */
.ihub-pagination-disabled     /* Disabled states */
.ihub-pagination-loading; /* Loading indicator */
```

### Custom Styling Example

```css
.my-custom-pagination .ihub-pagination-link {
  border-radius: 8px;
  margin: 0 2px;
}

.my-custom-pagination .ihub-pagination-active {
  background: linear-gradient(45deg, #007acc, #0099ff);
}
```

### Dark Theme Support

```css
.ihub-pagination-container[data-theme="dark"] {
  /* Dark theme styles included */
}
```

## Performance

### Optimization Features

- **Debounced API Calls**: Prevents excessive requests during rapid changes
- **Memoized Calculations**: Efficient page range calculations
- **Conditional Rendering**: Only renders when data is available
- **Smart Re-renders**: Minimizes unnecessary component updates

### Best Practices

```typescript
// Use React.memo for parent components
const PostsList = React.memo(({ data }) => {
  return (
    <div>
      {data?.results?.map((item) => (
        <PostItem key={item.id} item={item} />
      ))}
    </div>
  );
});

// Debounce search input
const [debouncedSearch] = useDebounce(searchQuery, 300);
```

## Migration Guide

### From Basic Pagination

If migrating from the basic pagination component:

```typescript
// Old basic pagination
<BasicPagination
  data={data}
  currentPage={page}
  itemsPerPage={20}
  onPageChange={setPage}
/>

// New enhanced pagination
<Pagination
  offset={(page - 1) * 20}  // Convert page to offset
  data={data}
  limit={20}
  urlPath={API_HOST_URL + "posts/"}
  setData={setData}
/>
```

### From Styled Components

```typescript
// Remove styled-components dependency
// Replace with CSS classes using ihub- prefix
// Update component props to match new interface
```

## Browser Support

- **Chrome**: 88+
- **Firefox**: 85+
- **Safari**: 14+
- **Edge**: 88+

## Troubleshooting

### Common Issues

1. **API not called on search change**

   ```typescript
   // Ensure searchValues prop is passed
   <Pagination searchValues={searchQuery} />
   ```

2. **Incorrect URL construction**

   ```typescript
   // Check urlPath starts with "/"
   urlPath = {API_HOST_URL + "posts/"}; // ✅ Correct
   urlPath = {API_HOST_URL + "posts"}; // ❌ Missing leading slash
   ```

3. **Loading state not showing**
   ```typescript
   // Ensure setData is properly configured
   // Loading state depends on API call completion
   ```

## Contributing

1. Follow TypeScript best practices
2. Maintain backward compatibility
3. Add comprehensive tests
4. Update documentation for new features
5. Test across different screen sizes

## License

Part of the @instincthub/react-ui library. See main library documentation for license information.
