# SearchableDropdown

A generic searchable dropdown that fetches options from an API endpoint. Features debounced search, initial data loading on open, selection with clear, and hidden input for form integration.

## Features

- **API-Powered**: Fetches options from any REST API endpoint
- **Debounced Search**: Configurable debounce delay for search requests
- **Initial Load**: Fetches initial results when dropdown opens
- **Custom Label Formatting**: Use `labelKey` or a `labelFormatter` function
- **Form Integration**: Hidden input stores the selected value
- **Clear Selection**: X button to clear the current selection
- **Pre-selection**: Support for pre-selected value and label
- **Error Display**: Optional error message below the trigger
- **Outside Click**: Closes on click outside

## Installation

```bash
npm install @instincthub/react-ui
```

## Basic Usage

```tsx
import { SearchableDropdown } from '@instincthub/react-ui';

function MyComponent() {
  const handleChange = (name: string, value: string, option: any) => {
    console.log(name, value, option);
  };

  return (
    <SearchableDropdown
      searchUrl="https://api.example.com/items/"
      token="auth-token"
      name="item_id"
      label="Select Item"
      labelKey="title"
      valueKey="id"
      onChange={handleChange}
    />
  );
}
```

## Examples

### With Custom Label Formatter

```tsx
<SearchableDropdown
  searchUrl="/api/users/"
  token={token}
  name="user_id"
  label="Select User"
  valueKey="pk"
  labelFormatter={(item) => `${item.first_name} ${item.last_name}`}
  onChange={handleChange}
/>
```

### Pre-selected Value

```tsx
<SearchableDropdown
  searchUrl="/api/departments/"
  token={token}
  name="department_id"
  label="Department"
  labelKey="name"
  valueKey="id"
  selectedValue="42"
  selectedLabel="Engineering"
  onChange={handleChange}
/>
```

### Required with Error

```tsx
<SearchableDropdown
  searchUrl="/api/courses/"
  token={token}
  name="course_id"
  label="Course"
  required
  error="Please select a course"
  onChange={handleChange}
/>
```

### Custom Debounce

```tsx
<SearchableDropdown
  searchUrl="/api/products/"
  token={token}
  name="product_id"
  label="Product"
  debounceMs={600}
  placeholder="Type to search products..."
  onChange={handleChange}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `searchUrl` | `string` | - | **Required.** API endpoint URL. Search query appended as `?search=` |
| `token` | `string \| null` | - | **Required.** Authentication token for API requests |
| `name` | `string` | - | **Required.** Form field name for the hidden input |
| `label` | `string` | `"Select"` | Display label above the dropdown |
| `placeholder` | `string` | `"Search..."` | Placeholder text for search input and trigger |
| `required` | `boolean` | `false` | Whether the field is required |
| `labelKey` | `string` | `"label"` | Key to use as the display label from API response |
| `labelFormatter` | `(item: any) => string` | - | Custom formatter for label display. Overrides `labelKey` |
| `valueKey` | `string` | `"id"` | Key to use as the value/id from API response |
| `onChange` | `(name: string, value: string, option: DropdownOption \| null) => void` | - | Callback when selection changes |
| `selectedValue` | `string` | `""` | Pre-selected value (id) |
| `selectedLabel` | `string` | `""` | Pre-selected label for display |
| `debounceMs` | `number` | `400` | Debounce delay in milliseconds |
| `error` | `string` | - | Error message to display |

## API Response Format

The component expects the API to return either:

```json
{ "results": [{ "id": "1", "label": "Item 1" }, ...] }
```

or a plain array:

```json
[{ "id": "1", "label": "Item 1" }, ...]
```

The `valueKey` and `labelKey` props determine which fields are used from each item.

## CSS Classes

The component uses BEM-style CSS class prefixes:

- `.searchable-dropdown` - Outer wrapper
- `.searchable-dropdown__label` - Label element
- `.searchable-dropdown__trigger` - Click-to-open trigger
- `.searchable-dropdown__trigger--open` - Open state
- `.searchable-dropdown__trigger--error` - Error state
- `.searchable-dropdown__value` - Selected value display
- `.searchable-dropdown__placeholder` - Placeholder text
- `.searchable-dropdown__icons` - Icon container (clear + chevron)
- `.searchable-dropdown__clear` - Clear (X) button
- `.searchable-dropdown__chevron` - Chevron icon
- `.searchable-dropdown__chevron--open` - Rotated chevron
- `.searchable-dropdown__error` - Error message
- `.searchable-dropdown__menu` - Dropdown menu container
- `.searchable-dropdown__search-wrapper` - Search input wrapper
- `.searchable-dropdown__search-input` - Search text input
- `.searchable-dropdown__spinner` - Loading spinner
- `.searchable-dropdown__options` - Options list
- `.searchable-dropdown__option` - Individual option
- `.searchable-dropdown__option--selected` - Selected option
- `.searchable-dropdown__empty` - "No results found" message

## Related Components

- [SearchField](./SearchField.md) - Simple search input field
- [SearchFieldDB](./SearchFieldDB.md) - Database-connected search
- [SearchObjectsFromDB](./SearchObjectsFromDB.md) - Multi-select search from database
- [InputSearchDropdown](./InputSearchDropdown.md) - Alternative searchable dropdown
