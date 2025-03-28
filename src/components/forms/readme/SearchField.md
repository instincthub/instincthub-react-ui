# SearchField Component

A React component that provides a search input field with URL query parameter integration.

## Table of Contents
- [Installation](#installation)
- [Props](#props)
- [Usage](#usage)
- [Styling](#styling)
- [Examples](#examples)

## Installation

Ensure you have React and Next.js installed in your project:

```bash
npm install react next
# or
yarn add react next
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `labels` | `string` | No | "Blog" | The label used in the search placeholder text |
| `setSearchValues` | `(value: string) => void` | No | - | Callback function triggered when search value changes |

## Usage

The SearchField component creates a search input that:

1. Updates the URL query parameters with the search term
2. Optionally passes the search value to a parent component via callback
3. Uses the Next.js router for navigation without page refresh

Basic implementation:

```tsx
import SearchField from '@/components/SearchField';

const BlogPage = () => {
  const handleSearch = (value: string) => {
    console.log('Search term:', value);
    // Additional logic with search value
  };

  return (
    <div>
      <h1>Blog Posts</h1>
      <SearchField 
        labels="Articles" 
        setSearchValues={handleSearch} 
      />
      {/* Content */}
    </div>
  );
};

export default BlogPage;
```

## Styling

The component uses CSS classes with an "ihub-" prefix. The following classes are used:

- `ihub-search-field`: Container for the entire search component
- `ihub-search-set`: Wrapper for the input and icon
- `ihub-input-div`: Container for the search icon
- `ihub-search-icon`: Styling for the search icon
- `ihub-event-input`: Styling for the input element


## Examples

### Basic Usage

```tsx
<SearchField />
```

Uses default "Blog" as the search placeholder.

### Custom Label

```tsx
<SearchField labels="Products" />
```

Creates a search field with "Search Products ..." as the placeholder.

### With Search Callback

```tsx
const [results, setResults] = useState([]);

const handleSearch = (value: string) => {
  // Filter data based on search term
  const filtered = allData.filter(item => 
    item.title.toLowerCase().includes(value.toLowerCase())
  );
  setResults(filtered);
};

return (
  <>
    <SearchField 
      labels="Resources" 
      setSearchValues={handleSearch} 
    />
    <div className="results">
      {results.map(item => (
        <ResultCard key={item.id} data={item} />
      ))}
    </div>
  </>
);
```

### Integration with API Calls

```tsx
const [searchTerm, setSearchTerm] = useState('');
const [loading, setLoading] = useState(false);
const [results, setResults] = useState([]);

useEffect(() => {
  if (searchTerm) {
    setLoading(true);
    // Debounce API calls
    const timer = setTimeout(() => {
      fetchSearchResults(searchTerm)
        .then(data => setResults(data))
        .finally(() => setLoading(false));
    }, 500);
    
    return () => clearTimeout(timer);
  }
}, [searchTerm]);

return (
  <>
    <SearchField 
      labels="Users" 
      setSearchValues={setSearchTerm} 
    />
    {loading && <Spinner />}
    <ResultsList data={results} />
  </>
);
```