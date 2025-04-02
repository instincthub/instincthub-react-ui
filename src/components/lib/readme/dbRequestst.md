# API Service Module

A TypeScript module for making API requests and fetching channel data.

## Table of Contents

- [Installation](#installation)
- [Interfaces](#interfaces)
- [Functions](#functions)
- [Usage Examples](#usage-examples)

## Installation

No additional dependencies required beyond the existing imports from your project.

## Interfaces

### RequestParams

- **Description**: Parameters for API requests
- **Properties**:
  - `path: string` - API endpoint path
  - `data?: any` - Optional data to send with the request
  - `token?: boolean` - Whether to include authentication token
  - `method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'` - HTTP method
  - `type?: string | null` - Content type
  - `channel?: string` - Channel identifier

### DomainObjects

- **Description**: Structure containing domain information
- **Properties**:
  - `field: string` - Field name for domain lookup
  - `value: string` - Value for domain lookup

## Functions

### getData

- **Description**: Fetches data from the API
- **Parameters**:
  - `params: Partial<RequestParams>` - Request configuration
- **Returns**: `Promise<any>` - JSON response from the API
- **Error Handling**:
  - Returns `{ detail: "Unauthorized" }` for 401/403 responses
  - Returns `{ detail: "Not found." }` for 404 responses
  - Throws an error for network failures
- **Usage**:
  ```typescript
  const data = await getData({
    path: "users/profile/",
    token: true,
    method: "GET",
  });
  ```

### getChannel

- **Description**: Gets channel information based on a hostname
- **Parameters**:
  - `host: string` - The hostname to extract subdomain information from
- **Returns**: `Promise<any>` - Channel data
- **Usage**:
  ```typescript
  const channelInfo = await getChannel("subdomain.example.com");
  ```

## Usage Examples

### Fetching authenticated data

```typescript
// Get a user profile with authentication
const userProfile = await getData({
  path: "users/me/",
  token: true,
});

console.log(userProfile);
```

### Submitting data with POST

```typescript
// Create a new resource
const newResource = await getData({
  path: "resources/",
  method: "POST",
  data: { name: "New Resource", description: "Resource description" },
  token: true,
});

console.log(newResource);
```

### Getting channel information

```typescript
// Get channel based on subdomain
const host = window.location.hostname;
const channel = await getChannel(host);

console.log(channel);
```
