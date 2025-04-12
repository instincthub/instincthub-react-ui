# SearchObjectsFromDB Component

## Overview

`SearchObjectsFromDB` is a React TypeScript component that provides a search interface for querying objects from a database. It includes an input field with search functionality, displays results in a list, and allows for selection of items.

## Installation

### Prerequisites

- React 16.8+ (Hooks support)
- TypeScript 4.0+
- Material-UI Icons

### Dependencies

```bash
npm install @mui/icons-material @instincthub/react-ui
```

## Component Structure

### Props Interface

```typescript
interface SearchObjectsFromDBProps {
  token: string; // Authentication token
  handle: string; // User handle/identifier
  setHandleObject: (option: any) => void; // Callback to set selected object
  preventDefaults?: any[]; // Default data items
  appLabel?: string; // Application label for API
  modelName?: string; // Model name for API
  filterChannel?: boolean; // Whether to filter by channel
  limit?: number; // Maximum number of results
  key_name?: string; // Property name to display
  placeholder?: string; // Input placeholder text
  searchUrl?: string; // Custom search URL
  selected: any[]; // Currently selected items
  defaultValues?: React.ReactNode; // Default values to display
  err?: boolean; // Error state
}
```

### Key Features

- Dynamic search URL construction based on props
- Keyboard support for search (Enter key)
- Clear search results functionality
- Visual indication of selected items
- Error state display

## Usage

### Basic Example

```tsx
import SearchObjectsFromDB from "@/components/SearchObjectsFromDB";

function MyComponent() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <SearchObjectsFromDB
      token="your-auth-token"
      handle="user-handle"
      setHandleObject={setSelectedUser}
      selected={selectedUser ? [selectedUser] : []}
    />
  );
}
```

### Advanced Example

```tsx
<SearchObjectsFromDB
  token={authToken}
  handle={userHandle}
  setHandleObject={setAssessment}
  preventDefaults={[assessment]}
  appLabel="assessment"
  modelName="assessment"
  filterChannel={true}
  limit={10}
  key_name="title"
  placeholder="Search by Title or ID"
  selected={selectedAssessments}
  defaultValues={<span>Search for assessments...</span>}
  err={formErrors.assessment}
/>
```

## Styling

The component uses class-based styling with the following CSS classes:

- `.ihub-react-search`: Main container
- `.ihub-search-input`: Input field container
- `.ihub-search-icons`: Container for action icons
- `.ihub-search-icon`: Base class for icons
- `.ihub-search-results`: Results list container
- `.ihub-search-result-item`: Individual result item
- `.ihub-valid`: Valid/selectable result item
- `.ihub-no-results`: Empty results message
- `.ihub-error`: Error message

Import the accompanying CSS file to apply these styles:

```tsx
import "@/styles/search-objects.css";
```

## API Reference

### Methods

#### `handleSearch()`

Initiates a search request to the API with the current input value.

#### `handleSearchKey(e: React.KeyboardEvent<HTMLInputElement>)`

Handles keyboard events to trigger search on Enter key press.

#### `handleCancelSearch()`

Clears the input field and search results.

## Notes

- Uses Material-UI icons for the search and close actions
- Integrates with the `@instincthub/react-ui` library for API request utilities
- Supports dynamic property access via the `key_name` prop
- Allows customization of search URL via the `searchUrl` prop
