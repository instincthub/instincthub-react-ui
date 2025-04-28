# InstinctHub API Integration Documentation

## Overview

This documentation provides a comprehensive guide for making requests to the InstinctHub API. The API follows RESTful conventions and requires proper authentication to access resources.

## Authentication Methods

The API supports multiple authentication mechanisms:

### 1. Get User Token
Import Session from page.tsx, then pass it as props to the component where it is needed. See example. 
```tsx
import { SearchParamsType } from "../../../../../../types";
import ResponsiveNavbarExample from "../../../../components/navbars/ResponsiveNavbarExample";
import { auth } from "../../../api/auth/[...nextauth]/auth";
import CodebaseLink from "../../../../components/ui/CodebaseLink";
export default async function ResponsiveNavbarPage({
  params,
  searchParams,
}: SearchParamsType) {
  const _params = await params;
  const _searchParams = await searchParams;
  const session = await auth();
  const token = session?.user?.name?.token;

  return (
    <section className="ihub-container ihub-mt-10">
      <div className="ihub-course-page">
        <ResponsiveNavbarExample
          params={_params}
          searchParams={_searchParams}
          session={session}
          token={token}
        />
    </section>
  );
}

```


### 2. Token-based Authentication
```typescript
// Example with token in headers
const options = reqOptions("GET", null, userToken);
const response = await fetch(apiUrl, options);
```

### 3. API Key Authentication
```typescript
// Example with API keys in headers
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "instincthub-sk-header": process.env.NEXT_PUBLIC_INSTINCTHUB_SK_HEADER,
    "instincthub-auth-sk-header": process.env.INSTINCTHUB_AUTH_SECRET,
  },
  body: JSON.stringify(data)
};
```

### 4. Session-based Authentication
Used in combination with NextAuth.js, extracting token from session:
```typescript
const token = session?.user?.name?.token;
const options = reqOptions("GET", null, token);
```

## Request Utility Functions

### `reqOptions` Function

A utility function that creates standardized request options:

```typescript
// Simplified implementation based on usage patterns
function reqOptions(
  method: string,                // HTTP method (GET, POST, PUT, DELETE)
  body: string | FormData | null, // Request body
  token?: string,                // Authentication token
  contentType?: string,          // Content type (json, form-data)
  handle?: string                // Channel handle/username
) {
  const headers: Record<string, string> = {};
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  if (contentType === "json") {
    headers["Content-Type"] = "application/json";
  }
  
  if (handle) {
    headers["Channel-Username"] = handle;
  }
  
  return {
    method,
    headers,
    body,
  };
}
```

### `fetchAPI` Function

A wrapper around fetch that handles common operations:

```typescript
// Inferred implementation based on usage
async function fetchAPI(
  setStateFunc: Function,  // State setter function
  url: string,            // API endpoint
  options: RequestInit,   // Request options
  parseJson: boolean = true // Whether to parse response as JSON
) {
  try {
    const response = await fetch(url, options);
    
    if (response.status === 401) {
      // Handle unauthorized access
      signOut();
      return;
    }
    
    if (parseJson) {
      const data = await response.json();
      setStateFunc(data);
    } else {
      setStateFunc(response);
    }
    
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
```

## URL Patterns

The API uses the following URL structure:

```
${API_HOST_URL}[resource]/[handle]/[endpoint]/[id]/
```

### Common Resources:
- `auth`: Authentication-related endpoints
- `admissions`: Admission management
- `assessments`: Assessment functionality
- `channels`: Channel management
- `creators`: Content creator operations
- `courses`: Course management

### Handle Parameter:
Most endpoints require a `handle` parameter representing the channel username:
```
${API_HOST_URL}channels/courses/${handle}/
```

## Common Request Patterns

### GET Request

```typescript
//Import
import {reqOptions, API_HOST_URL, fetchAPI} from "@instincthub/react-ui/lib"
// Basic GET request
const options = reqOptions("GET", null, token, false, handle);
const response = await fetch(`${API_HOST_URL}channels/${handle}/channel-currency-details/`, options);
const data = await response.json();

// Using fetchAPI helper
fetchAPI(setData, `${API_HOST_URL}channels/${handle}/channel-currency-details/`, options);
```

### POST Request

```typescript
//Import
import {reqOptions, API_HOST_URL} from "@instincthub/react-ui/lib"

// JSON payload
const raw = JSON.stringify({ title: "New Course", description: "Course description" });
const options = reqOptions("POST", raw, token, "json", handle);
const response = await fetch(`${API_HOST_URL}creators/${handle}/course/create-course-overview/`, options);

// FormData payload
const formData = new FormData();
formData.append("title", "New Course");
formData.append("description", "Course description");
const options = reqOptions("POST", formData, token);
const response = await fetch(`${API_HOST_URL}creators/${handle}/course/create-course-overview/`, options);
```

### PUT Request

```typescript
const options = reqOptions("PUT", JSON.stringify(updatedData), token, "json", handle);
const response = await fetch(`${API_HOST_URL}assessments/${handle}/assessment-link-tree-update/${link_id}/`, options);
```

### DELETE Request

```typescript
const options = reqOptions("DELETE", null, token, null, handle);
const response = await fetch(`${API_HOST_URL}certificates/${handle}/retrieve-update-destroy-certificate/${id}/`, options);
```

## Pagination Handling

Many endpoints return paginated results with this structure:

```typescript
interface PaginatedResponse<T> {
  count: number;       // Total number of items
  next: string | null;  // URL for next page
  previous: string | null; // URL for previous page
  results: T[];        // Current page items
}
```

Example pagination handling:

```typescript
// Initial data fetch
let data: YourDataType[] = [];
let next: string | null = null;
let previous: string | null = null;

const fetchData = async (url: string, reset: boolean = false) => {
  const response = await fetch(url, options);
  const newData = await response.json();
  
  if (reset) {
    data = newData.results;
  } else {
    data = [...data, ...newData.results];
  }
  
  next = newData.next;
  previous = newData.previous;
};

// Scroll-based pagination implementation
const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  
  if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading && next) {
    setIsLoading(true);
    fetchData(next);
  }
};
```

## Error Handling

Recommended error handling pattern:

```typescript
try {
  const response = await fetch(url, options);
  const data = await response.json();
  
  if (response.status === 200 || response.status === 201) {
    // Success handling
    setData(data);
    openToast("Operation was successful!");
  } else if (response.status === 401) {
    // Authentication error
    signOut();
  } else if (response.status === 400) {
    // Validation error
    setError(data);
    openToast(JSON.stringify(data), 400);
  } else {
    // Other errors
    console.error("API Error:", data);
    setError(data);
  }
} catch (error) {
  console.error("Network Error:", error);
}
```

## IHubTableServer
```tsx
<div className="program-courses-page">
    <h2>Valid Endpoint</h2>
    <IHubTableServer
    token={process.env.NEXT_PUBLIC_TOKEN}
    columns={columns}
    endpointPath={`sis/${handle}/admins/program-course-list/`}
    initialParams={{
        sort: "course.title",
        direction: "asc",
    }}
    title="Program Courses"
    showSearch={true}
    searchPlaceholder="Search by title or code..."
    enableSorting={true}
    enableExport={true}
    exportOptions={{
        csv: true,
        excel: true,
        fileName: "program-courses-export",
    }}
    onRowClick={handleRowClick}
    expandable={true}
    renderExpandedRow={renderExpandedRow}
    keyExtractor={(row) => row.id}
    stickyHeader={true}
    maxHeight="600px"
    />
</div>

```

## Common Endpoints

### Authentication
- `auth/${channel}/oauth-login/` - User login
- `auth/skills/learn-teach-signup/` - User registration

### Courses
- `channels/courses/${handle}/` - List courses
- `creators/${channel}/course/create-course-overview/` - Create course
- `channels/${handle}/channel-currency-details/` - Get channel currency details

### Admissions
- `admissions/${handle}/admin-admission-students/` - List admission students
- `admissions/${handle}/admin-student-payment-create/` - Create student payment

### Assessments
- `assessments/${handle}/assessment-link-tree-retrieve/${link_id}/` - Get assessment link tree
- `assessments/${handle}/assessment-link-tree-update/${link_id}/` - Update assessment link tree

## Next.js API Route Integration

For sensitive operations, use Next.js API routes as proxies:

```typescript
// API route (app/api/auth/route.ts)
export async function POST(request) {
  const requestData = await request.json();

  const options = {
    method: "POST",
    body: JSON.stringify(requestData),
    headers: {
      "Content-Type": "application/json",
      "instincthub-sk-header": process.env.NEXT_PUBLIC_INSTINCTHUB_SK_HEADER,
      "instincthub-auth-sk-header": process.env.INSTINCTHUB_AUTH_SECRET,
    },
  };

  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}auth/${requestData.channel}/oauth-login/`,
    options
  );

  const response = await req.json();
  return NextResponse.json({ ...response, status: req.status });
}

// Client-side usage
const login = async (credentials) => {
  const response = await fetch('/api/auth', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
  return response.json();
};
```

## Search and Filtering

The API supports various query parameters for filtering and searching:

```typescript
// Search
`${urlPath}?search=${searchTerm}`

// Filtering
`${urlPath}?filter=${selectedTab}&payment=${paymentOption.id}&moe=${moeOption.id}`

// Pagination
`${urlPath}?limit=10&offset=20`
```

## Best Practices

1. Always handle token expiration by redirecting to login
2. Use appropriate error handling for different status codes
3. Implement pagination for list endpoints to improve performance
4. Cache frequently accessed data to reduce API calls
5. Use environment variables for API base URLs and secrets
6. Add appropriate timeout handling for API requests

This documentation should provide a comprehensive guide for an AI agent to understand how to interact with the InstinctHub API.