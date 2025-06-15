# URL Query Helper Documentation

A comprehensive utility library for managing URL query parameters in InstinctHub React applications. This helper provides type-safe methods for adding, updating, removing, and manipulating URL query parameters with support for both client and server-side environments.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Type Definitions](#type-definitions)
- [Core Functions](#core-functions)
- [InstinctHub-Specific Helpers](#instincthub-specific-helpers)
- [Usage Examples](#usage-examples)
- [Best Practices](#best-practices)
- [Browser Compatibility](#browser-compatibility)
- [Contributing](#contributing)

## Installation

Add the URL helper to your InstinctHub React UI project:

```bash
npm install @instincthub/react-ui
```

Import the helper functions in your TypeScript/JavaScript files:

```typescript
import { 
  urlQueryHelper, 
  getQueryParams, 
  buildDataFilterUrl,
  navigateWithQuery 
} from "@instincthub/react-ui/lib";
```

## Quick Start

Here's a simple example of updating a URL with new query parameters:

```typescript
import { urlQueryHelper } from "@instincthub/react-ui/lib";

// Add a new parameter
const newUrl = urlQueryHelper({
  key: 'subject',
  value: 'mathematics',
  action: 'add'
});

// Update existing parameter
const updatedUrl = urlQueryHelper({
  key: 'page',
  value: 2,
  action: 'update'
});

// Remove a parameter
const cleanUrl = urlQueryHelper({
  key: 'filter',
  action: 'remove'
});
```

## Type Definitions

### QueryContext Interface

The main context object used for URL manipulation:

```typescript
interface QueryContext {
  key: string;                                    // Parameter name
  value?: string | number | boolean | null;      // Parameter value (optional for remove/clear)
  action: 'add' | 'update' | 'remove' | 'toggle' | 'clear';  // Action to perform
}
```

### QueryParams Interface

Object representing URL query parameters:

```typescript
interface QueryParams {
  [key: string]: string | string[] | undefined;
}
```

### UrlHelperOptions Interface

Configuration options for URL operations:

```typescript
interface UrlHelperOptions {
  baseUrl?: string;      // Base URL to work with (defaults to current URL)
  preserveHash?: boolean; // Whether to keep URL hash fragment (default: true)
  encode?: boolean;      // Whether to encode parameter values (default: true)
}
```

## Core Functions

### urlQueryHelper

**Main function for URL query parameter manipulation**

```typescript
function urlQueryHelper(
  context: QueryContext,
  options?: UrlHelperOptions
): string
```

**Parameters:**
- `context` - Object containing key, value, and action
- `options` - Optional configuration object

**Returns:** Updated URL string

**Actions supported:**
- `add` - Append new parameter (allows duplicates)
- `update` - Set parameter value (replaces existing)
- `remove` - Delete parameter completely
- `toggle` - Add if missing, remove if present
- `clear` - Remove all query parameters

**Example:**
```typescript
// Add a course filter
const url = urlQueryHelper({
  key: 'level',
  value: 'beginner',
  action: 'add'
});

// Toggle a parameter
const toggledUrl = urlQueryHelper({
  key: 'featured',
  value: 'true',
  action: 'toggle'
});
```

### getQueryParams

**Extract all query parameters from a URL**

```typescript
function getQueryParams(url?: string): QueryParams
```

**Parameters:**
- `url` - URL to parse (optional, defaults to current URL)

**Returns:** Object with all query parameters

**Example:**
```typescript
// Get all parameters from current URL
const params = getQueryParams();
// { subject: 'math', level: 'beginner', page: '1' }

// Get parameters from specific URL
const urlParams = getQueryParams('https://example.com?course=js&level=advanced');
// { course: 'js', level: 'advanced' }
```

### getQueryParam

**Get a specific query parameter value**

```typescript
function getQueryParam(key: string, url?: string): string | null
```

**Parameters:**
- `key` - Parameter name to retrieve
- `url` - URL to parse (optional, defaults to current URL)

**Returns:** Parameter value or null if not found

**Example:**
```typescript
// Get current page number
const currentPage = getQueryParam('page');

// Get course ID from specific URL
const courseId = getQueryParam('id', 'https://courses.com?id=123&type=video');
```

### hasQueryParam

**Check if a query parameter exists**

```typescript
function hasQueryParam(key: string, url?: string): boolean
```

**Parameters:**
- `key` - Parameter name to check
- `url` - URL to parse (optional, defaults to current URL)

**Returns:** Boolean indicating if parameter exists

**Example:**
```typescript
if (hasQueryParam('search')) {
  // Handle search functionality
}
```

### buildUrl

**Construct URL from base path and parameters object**

```typescript
function buildUrl(
  basePath: string,
  params: QueryParams,
  options?: UrlHelperOptions
): string
```

**Parameters:**
- `basePath` - Base URL or path
- `params` - Object of parameters to add
- `options` - Optional configuration

**Returns:** Complete URL string

**Example:**
```typescript
const courseUrl = buildUrl('/courses', {
  subject: 'javascript',
  level: 'intermediate',
  page: 1
});
// Result: '/courses?subject=javascript&level=intermediate&page=1'
```

### navigateWithQuery

**Navigate to URL with updated query parameters (client-side only)**

```typescript
function navigateWithQuery(
  context: QueryContext,
  options?: UrlHelperOptions & { replace?: boolean }
): void
```

**Parameters:**
- `context` - Query context for manipulation
- `options` - Navigation options including `replace` flag

**Example:**
```typescript
// Navigate to new page number
navigateWithQuery({
  key: 'page',
  value: 3,
  action: 'update'
});

// Replace current URL instead of adding to history
navigateWithQuery({
  key: 'filter',
  value: 'popular',
  action: 'add'
}, { replace: true });
```

### cleanUrl

**Remove empty or null parameters from URL**

```typescript
function cleanUrl(url?: string): string
```

**Parameters:**
- `url` - URL to clean (optional, defaults to current URL)

**Returns:** Cleaned URL string

**Example:**
```typescript
// Clean current URL
const clean = cleanUrl();

// Clean specific URL with empty parameters
const cleanedUrl = cleanUrl('https://example.com?name=John&empty=&null=null');
// Result: 'https://example.com?name=John'
```

## InstinctHub-Specific Helpers

### buildDataFilterUrl

**Helper for building data filter URLs in the LMS**

```typescript
function buildDataFilterUrl(filters: {
  subject?: string;
  level?: string;
  instructor?: string;
  search?: string;
  page?: number;
  sort?: string;
}): string
```

**Parameters:**
- `filters` - Object containing course filter criteria

**Returns:** URL with course filters applied

**Example:**
```typescript
const filterUrl = buildDataFilterUrl({
  subject: 'web-development',
  level: 'beginner',
  instructor: 'noah-olatoye',
  search: 'react'
});
```

### buildPaginationUrl

**Helper for pagination URL management**

```typescript
function buildPaginationUrl(
  page: number,
  preserveFilters?: boolean
): string
```

**Parameters:**
- `page` - Page number to navigate to
- `preserveFilters` - Whether to maintain existing filters (default: true)

**Returns:** URL with pagination applied

**Example:**
```typescript
// Go to page 3 while keeping current filters
const pageUrl = buildPaginationUrl(3);

// Go to page 1 and clear all filters
const freshPageUrl = buildPaginationUrl(1, false);
```

## Usage Examples

### Course Listing Component

```typescript
"use client";
import React, { useEffect, useState } from 'react';
import { getQueryParams, buildDataFilterUrl, navigateWithQuery } from '@instincthub/react-ui/lib';

interface CourseListProps {
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  const [filters, setFilters] = useState({
    subject: '',
    level: '',
    search: ''
  });

  // Load filters from URL on component mount
  useEffect(() => {
    const urlParams = getQueryParams();
    setFilters({
      subject: urlParams.subject as string || '',
      level: urlParams.level as string || '',
      search: urlParams.search as string || ''
    });
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update URL with new filters
    const newUrl = buildDataFilterUrl(newFilters);
    window.history.pushState({}, '', newUrl);
  };

  const clearFilters = () => {
    setFilters({ subject: '', level: '', search: '' });
    window.history.pushState({}, '', window.location.pathname);
  };

  return (
    <div className="ihub-course-list">
      <div className="ihub-url-filter-bar">
        <select 
          value={filters.subject}
          onChange={(e) => handleFilterChange('subject', e.target.value)}
        >
          <option value="">All Subjects</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="react">React</option>
        </select>
        
        <button 
          className="ihub-clear-all-filters"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>
      
      {/* Render courses */}
    </div>
  );
};
```

### Pagination Component

```typescript
"use client";
import React from 'react';
import { buildPaginationUrl, getQueryParam } from '@instincthub/react-ui/lib';

interface PaginationProps {
  totalPages: number;
  currentPage?: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage }) => {
  const page = currentPage || parseInt(getQueryParam('page') || '1');

  const handlePageChange = (newPage: number) => {
    const url = buildPaginationUrl(newPage);
    window.history.pushState({}, '', url);
  };

  return (
    <div className="ihub-pagination-wrapper">
      <button 
        className="ihub-pagination-button"
        disabled={page <= 1}
        onClick={() => handlePageChange(page - 1)}
      >
        Previous
      </button>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
        <button
          key={pageNum}
          className={`ihub-pagination-button ${page === pageNum ? 'ihub-active' : ''}`}
          onClick={() => handlePageChange(pageNum)}
        >
          {pageNum}
        </button>
      ))}
      
      <button 
        className="ihub-pagination-button"
        disabled={page >= totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};
```

### Search Component with URL Sync

```typescript
"use client";
import React, { useState, useEffect } from 'react';
import { getQueryParam, navigateWithQuery } from '@instincthub/react-ui/lib';

const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load search term from URL on mount
    const urlSearch = getQueryParam('search');
    if (urlSearch) {
      setSearchTerm(urlSearch);
    }
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    
    if (value.trim()) {
      navigateWithQuery({
        key: 'search',
        value: value,
        action: 'update'
      });
    } else {
      navigateWithQuery({
        key: 'search',
        action: 'remove'
      });
    }
  };

  return (
    <div className="ihub-wrapper">
      <input
        className="ihub-input"
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search courses..."
      />
    </div>
  );
};
```

## Best Practices

### Error Handling
Always wrap URL operations in try-catch blocks:

```typescript
try {
  const newUrl = urlQueryHelper(context);
  // Use the URL
} catch (error) {
  console.error('URL operation failed:', error);
  // Fallback behavior
}
```

### Server-Side Rendering
Check for browser environment before using navigation functions:

```typescript
if (typeof window !== 'undefined') {
  navigateWithQuery({ key: 'page', value: 1, action: 'update' });
}
```

### Performance Optimization
Debounce frequent URL updates like search input:

```typescript
import { debounce } from 'lodash';

const debouncedSearch = debounce((value: string) => {
  navigateWithQuery({
    key: 'search',
    value: value,
    action: 'update'
  });
}, 300);
```

### Type Safety
Always define interfaces for your filter objects:

```typescript
interface CourseFilters {
  subject?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  instructor?: string;
  page?: number;
}

const filters: CourseFilters = getQueryParams() as CourseFilters;
```

## Browser Compatibility

- **Modern Browsers**: Full support using native URL API
- **IE11+**: Requires URL polyfill
- **Node.js**: Supported with URL globals
- **Next.js**: Full SSR/SSG compatibility

### Required Polyfills

For older browser support, include:

```bash
npm install url-polyfill
```

```typescript
import 'url-polyfill';
```

## Error Handling

The helper includes comprehensive error handling:

- **Invalid URLs**: Returns original URL with console warning
- **Missing parameters**: Graceful handling of undefined values
- **Server environment**: Safe checks for window object
- **Network errors**: Fallback to current URL state

## Contributing

### Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run tests: `npm test`
4. Build: `npm run build`

### Testing

Write tests for new functionality:

```typescript
import { urlQueryHelper } from './urlHelper';

describe('urlQueryHelper', () => {
  test('adds query parameter correctly', () => {
    const result = urlQueryHelper({
      key: 'test',
      value: 'value',
      action: 'add'
    }, { baseUrl: 'https://example.com' });
    
    expect(result).toBe('https://example.com/?test=value');
  });
});
```

### Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Add JSDoc comments for public functions
- Include error handling for edge cases
