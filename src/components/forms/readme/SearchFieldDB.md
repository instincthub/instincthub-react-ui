# SearchFieldDB Component

## Overview

The SearchFieldDB component is a reusable search field that interfaces with an API to fetch and display search results. It includes features like debounced input, loading states, and integration with URL query parameters.

## Features

- URL query parameter integration
- Loading state indicator
- Clear search functionality
- Keyboard navigation support (Enter key to search)
- Customizable search label

## Installation

### Dependencies

This component requires the following dependencies:

```bash
npm install @mui/icons-material next react react-dom
```

## Usage

### Basic Usage

```tsx
import SearchFieldDB from "@/components/SearchFieldDB";

const MyComponent = () => {
  const [data, setData] = useState<any[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);

  return (
    <SearchFieldDB
      urlPath="api/items/?"
      setData={setData}
      setNext={setNextPage}
      setPrevious={setPrevPage}
      token={userToken}
      searchParams={{ channel: "main", search: "" }}
      labels="Products"
    />
  );
};
```

### Props

| Prop                   | Type     | Required | Description                                 |
| ---------------------- | -------- | -------- | ------------------------------------------- |
| `urlPath`              | string   | Yes      | The API endpoint path to search             |
| `setData`              | function | Yes      | Function to set data state with API results |
| `setNext`              | function | Yes      | Function to set next page URL               |
| `setPrevious`          | function | Yes      | Function to set previous page URL           |
| `token`                | string   | No       | Auth token for API requests                 |
| `searchParams`         | object   | Yes      | Search parameters from URL                  |
| `searchParams.channel` | string   | No       | Channel identifier                          |
| `searchParams.search`  | string   | No       | Current search term                         |
| `labels`               | string   | No       | Custom label for search placeholder         |

## Component Structure

### State

- `status`: Tracks the API request status (loading state)
- `searchValue`: Stores the current search input value

### Methods

- `handleUpdateQueryParam`: Updates the URL query parameter
- `handleSearchKey`: Handles keyboard events (Enter key for search)
- `handleSearchChange`: Updates the search value state on input change
- `handleSearch`: Performs the API search request
- `handleCloseSearch`: Clears the search field

## CSS Customization

Add the provided styles to your `input-fields.css` file. The component uses class names with the `ihub-` prefix for consistent styling.

## Example Implementation with a List Component

```tsx
import React, { useState, useEffect } from "react";
import SearchFieldDB from "@/components/SearchFieldDB";
import ItemList from "@/components/ItemList";
import { useParams } from "next/navigation";

const SearchPage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const searchParams = useParams();

  const channel = searchParams.get("channel") || "default";
  const search = searchParams.get("search") || "";

  return (
    <div className="ihub-search-page">
      <h1>Search Items</h1>

      <SearchFieldDB
        urlPath={`api/items/${channel}/?`}
        setData={setItems}
        setNext={setNextPage}
        setPrevious={setPrevPage}
        token={localStorage.getItem("token")}
        searchParams={{ channel, search }}
        labels="Items"
      />

      <ItemList items={items} />

      <div className="ihub-pagination">
        <button disabled={!prevPage} onClick={() => loadPage(prevPage)}>
          Previous
        </button>
        <button disabled={!nextPage} onClick={() => loadPage(nextPage)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchPage;
```
