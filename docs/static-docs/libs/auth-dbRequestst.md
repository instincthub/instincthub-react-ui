# Database Request Utilities

**Category:** Library | **Type:** API request utilities

Comprehensive API request utilities for database operations with authentication, channel support, and error handling. Provides standardized methods for GET requests with automatic token management and subdomain-based channel detection.

## 📁 File Location

`src/components/lib/auth/dbRequestst.ts`

## 🏷️ Tags

`api`, `database`, `requests`, `authentication`, `channels`, `subdomain`, `error-handling`, `typescript`

## 📖 Usage Examples

### Example 1: Complete API Integration System

```tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  getData,
  getChannel
} from "@instincthub/react-ui/lib";

/**
 * Complete API integration with database request utilities
 */
const APIIntegrationDashboard = () => {
  const [apiData, setApiData] = useState<any>(null);
  const [channelData, setChannelData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [requestHistory, setRequestHistory] = useState<any[]>([]);

  // Sample API endpoints for demonstration
  const endpoints = [
    {
      id: "courses",
      label: "Course List",
      path: "api/courses/",
      description: "Fetch all available courses",
      method: "GET" as const,
      requiresAuth: true
    },
    {
      id: "users",
      label: "User Profile",
      path: "api/users/profile/",
      description: "Get current user profile",
      method: "GET" as const,
      requiresAuth: true
    },
    {
      id: "channels",
      label: "Channel Info",
      path: "api/channels/info/",
      description: "Get channel information",
      method: "GET" as const,
      requiresAuth: false
    },
    {
      id: "analytics",
      label: "Analytics Data",
      path: "api/analytics/dashboard/",
      description: "Fetch analytics dashboard data",
      method: "GET" as const,
      requiresAuth: true
    }
  ];

  // Sample authentication token (in real app, get from session/context)
  const [authToken, setAuthToken] = useState<string>("");
  const [selectedChannel, setSelectedChannel] = useState<string>("instincthub");

  // Handle API data fetching
  const fetchData = async (endpoint: typeof endpoints[0]) => {
    setLoading(true);
    setError("");
    
    try {
      const requestParams = {
        path: endpoint.path,
        method: endpoint.method,
        token: endpoint.requiresAuth ? authToken : null,
        channel: selectedChannel
      };

      console.log("Making request with params:", requestParams);
      
      const response = await getData(requestParams);
      
      // Add to request history
      const historyEntry = {
        id: Date.now(),
        endpoint: endpoint.label,
        path: endpoint.path,
        timestamp: new Date().toISOString(),
        status: response.detail ? "error" : "success",
        response: response
      };
      
      setRequestHistory(prev => [historyEntry, ...prev.slice(0, 9)]); // Keep last 10
      setApiData(response);
      
      if (response.detail) {
        setError(response.detail);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Request failed";
      setError(errorMessage);
      console.error("API request error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle channel data fetching
  const fetchChannelData = async () => {
    setLoading(true);
    setError("");
    
    try {
      // Simulate different host patterns
      const hostPatterns = [
        "instincthub.com",
        "demo.instincthub.com",
        "subdomain.example.com",
        "api.company.com"
      ];
      
      const selectedHost = hostPatterns[0]; // Use first for demo
      console.log("Fetching channel for host:", selectedHost);
      
      const response = await getChannel(selectedHost);
      setChannelData(response);
      
      if (response.detail) {
        setError(response.detail);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Channel fetch failed";
      setError(errorMessage);
      console.error("Channel fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ihub-container ihub-py-5">
      <h1>Database Request Utilities</h1>
      
      {/* Status Display */}
      <section className="ihub-mb-4">
        {loading && (
          <div className="ihub-alert ihub-alert-info">
            <i className="pi pi-spin pi-spinner ihub-me-2"></i>
            Loading data...
          </div>
        )}
        {error && (
          <div className="ihub-alert ihub-alert-danger">
            <i className="pi pi-exclamation-triangle ihub-me-2"></i>
            <strong>Error:</strong> {error}
          </div>
        )}
      </section>

      {/* Configuration */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Request Configuration</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h6>Authentication Token</h6>
              <div className="ihub-mb-3">
                <input
                  type="text"
                  className="ihub-form-control"
                  placeholder="Enter auth token (optional for demo)"
                  value={authToken}
                  onChange={(e) => setAuthToken(e.target.value)}
                />
                <small className="text-muted">
                  Required for authenticated endpoints
                </small>
              </div>
            </div>
          </div>
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h6>Channel Selection</h6>
              <div className="ihub-mb-3">
                <select
                  className="ihub-form-control"
                  value={selectedChannel}
                  onChange={(e) => setSelectedChannel(e.target.value)}
                >
                  <option value="instincthub">InstinctHub</option>
                  <option value="demo">Demo Channel</option>
                  <option value="test">Test Channel</option>
                </select>
                <small className="text-muted">
                  Channel context for requests
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Available API Endpoints</h2>
        <div className="ihub-row">
          {endpoints.map((endpoint) => (
            <div key={endpoint.id} className="ihub-col-md-6 ihub-mb-3">
              <div className="ihub-card ihub-h-100">
                <div className="ihub-card-body ihub-p-4">
                  <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-start ihub-mb-3">
                    <h5 className="ihub-card-title ihub-mb-0">{endpoint.label}</h5>
                    <div>
                      <span className={`ihub-badge ${
                        endpoint.method === "GET" ? "ihub-badge-success" : "ihub-badge-primary"
                      }`}>
                        {endpoint.method}
                      </span>
                      {endpoint.requiresAuth && (
                        <span className="ihub-badge ihub-badge-warning ihub-ms-1">
                          Auth
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="ihub-card-text">{endpoint.description}</p>
                  <div className="ihub-mb-3">
                    <code className="ihub-bg-light ihub-p-2 ihub-rounded ihub-d-block">
                      {endpoint.path}
                    </code>
                  </div>
                  <button
                    className="ihub-btn ihub-btn-primary ihub-w-100"
                    onClick={() => fetchData(endpoint)}
                    disabled={loading || (endpoint.requiresAuth && !authToken)}
                  >
                    {loading ? "Loading..." : "Test Endpoint"}
                  </button>
                  {endpoint.requiresAuth && !authToken && (
                    <small className="text-warning ihub-d-block ihub-mt-1">
                      Requires authentication token
                    </small>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Channel Information */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Channel Information</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h6>Channel Detection</h6>
              <p>Test subdomain extraction and channel fetching</p>
              <button
                className="ihub-btn ihub-btn-outline-primary ihub-w-100"
                onClick={fetchChannelData}
                disabled={loading}
              >
                {loading ? "Loading..." : "Get Channel Info"}
              </button>
            </div>
          </div>
          <div className="ihub-col-md-6">
            {channelData && (
              <div className="ihub-card ihub-p-4">
                <h6>Channel Data</h6>
                <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "10px", maxHeight: "200px", overflow: "auto" }}>
                  {JSON.stringify(channelData, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Response Data */}
      {apiData && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">Latest Response Data</h2>
          <div className="ihub-card ihub-p-4">
            <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center ihub-mb-3">
              <h6 className="ihub-mb-0">Response Data</h6>
              <button
                className="ihub-btn ihub-btn-outline-secondary ihub-btn-sm"
                onClick={() => setApiData(null)}
              >
                Clear
              </button>
            </div>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px", maxHeight: "400px", overflow: "auto" }}>
              {JSON.stringify(apiData, null, 2)}
            </pre>
          </div>
        </section>
      )}

      {/* Request History */}
      {requestHistory.length > 0 && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">Request History</h2>
          <div className="ihub-card">
            <div className="table-responsive">
              <table className="table table-hover ihub-mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Endpoint</th>
                    <th>Path</th>
                    <th>Status</th>
                    <th>Time</th>
                    <th>Response</th>
                  </tr>
                </thead>
                <tbody>
                  {requestHistory.map((request) => (
                    <tr key={request.id}>
                      <td>{request.endpoint}</td>
                      <td><code>{request.path}</code></td>
                      <td>
                        <span className={`ihub-badge ${
                          request.status === "success" 
                            ? "ihub-badge-success" 
                            : "ihub-badge-danger"
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td>
                        <small>{new Date(request.timestamp).toLocaleTimeString()}</small>
                      </td>
                      <td>
                        <button
                          className="ihub-btn ihub-btn-outline-info ihub-btn-sm"
                          onClick={() => setApiData(request.response)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Implementation Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Implementation Examples</h2>
        
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-code ihub-me-2"></i>
              Basic getData Usage
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Basic data fetching
import { getData } from '@instincthub/react-ui/lib';

const fetchUserProfile = async (userId: string, token: string) => {
  try {
    const response = await getData({
      path: \`api/users/\${userId}/\`,
      method: 'GET',
      token: token,
      channel: 'my-channel'
    });

    if (response.detail) {
      // Handle API error
      throw new Error(response.detail);
    }

    return response;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    throw error;
  }
};

// Usage in component
const UserProfile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const data = await fetchUserProfile(userId, authToken);
        setProfile(data);
      } catch (error) {
        console.error('Profile load error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <h2>{profile?.name}</h2>
      <p>{profile?.email}</p>
    </div>
  );
};`}
            </pre>
          </div>
        </div>

        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-globe ihub-me-2"></i>
              Channel Detection Implementation
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Channel-based data fetching
import { getChannel, getData } from '@instincthub/react-ui/lib';

const ChannelAwareComponent = () => {
  const [channelInfo, setChannelInfo] = useState(null);
  const [channelData, setChannelData] = useState(null);

  useEffect(() => {
    const initializeChannel = async () => {
      try {
        // Get channel information from current host
        const host = window.location.hostname;
        const channel = await getChannel(host);
        
        setChannelInfo(channel);

        // Use channel info to fetch channel-specific data
        if (channel && !channel.detail) {
          const data = await getData({
            path: \`api/channels/\${channel.id}/content/\`,
            channel: channel.handle
          });
          setChannelData(data);
        }
      } catch (error) {
        console.error('Channel initialization failed:', error);
      }
    };

    initializeChannel();
  }, []);

  return (
    <div>
      {channelInfo && (
        <div>
          <h2>Channel: {channelInfo.name}</h2>
          <p>Handle: {channelInfo.handle}</p>
        </div>
      )}
      
      {channelData && (
        <div>
          {/* Render channel-specific content */}
        </div>
      )}
    </div>
  );
};

// Custom hook for channel data
const useChannelData = (path: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (additionalParams = {}) => {
    setLoading(true);
    setError(null);

    try {
      // Auto-detect channel from hostname
      const host = window.location.hostname;
      const channel = await getChannel(host);
      
      if (channel.detail) {
        throw new Error(channel.detail);
      }

      const response = await getData({
        path,
        channel: channel.handle,
        ...additionalParams
      });

      if (response.detail) {
        throw new Error(response.detail);
      }

      setData(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};

export default APIIntegrationDashboard;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui lodash
```

```tsx
import {
  getData,
  getChannel
} from '@instincthub/react-ui/lib';
```

## 🚀 Basic Usage

```tsx
import React, { useEffect, useState } from 'react';
import { getData, getChannel } from '@instincthub/react-ui/lib';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData({
          path: 'api/users/',
          token: 'your-auth-token'
        });
        setData(response);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, []);

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}
```

## 🔧 Function Reference

### API Request Functions

#### `getData(params: Partial<RequestParams>): Promise<any>`
Makes authenticated API requests with comprehensive error handling.

```tsx
interface RequestParams {
  host_url?: string;        // API base URL (default: API_HOST_URL)
  path: string;             // API endpoint path (required)
  data?: any;              // Request payload for POST/PUT
  token?: string | null;    // Authentication token
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"; // HTTP method
  type?: "json" | "form-data" | null | false; // Content type
  channel?: string;         // Channel context
}
```

**Return Values:**
- Success: API response data
- Error: `{ detail: "error message" }` for 401, 403, 404
- Exception: Throws error for network/parsing issues

#### `getChannel(host: string): Promise<any>`
Extracts subdomain from hostname and fetches channel information.

**Parameters:**
- `host`: Hostname to extract subdomain from

**Behavior:**
- Uses `extractSubDomain()` to parse hostname
- Constructs channel API path
- Returns channel data or error

## 🎯 Advanced Features

### Error Handling Strategy
- **401/403**: Returns `{ detail: "Unauthorized" }`
- **404**: Returns `{ detail: "Not found." }`
- **Network Errors**: Throws descriptive error
- **JSON Parsing**: Automatic response parsing

### Authentication Support
- **Token Management**: Automatic token inclusion in headers
- **Channel Context**: Multi-tenant support
- **Request Options**: Flexible request configuration
- **Content Types**: Support for JSON and form-data

### Channel System
- **Subdomain Detection**: Automatic channel detection from URL
- **Multi-tenant**: Support for multiple channels/organizations
- **Context Preservation**: Channel context in all requests
- **Fallback Handling**: Graceful handling of channel detection failures

## 💡 Use Cases

### Multi-tenant Applications
- **Channel-based Data**: Fetch data specific to current channel
- **Subdomain Routing**: Automatic channel detection from URL
- **Isolated Environments**: Separate data per organization
- **Branded Experiences**: Channel-specific content and configuration

### API Integration
- **Authenticated Requests**: Secure API communication
- **Error Standardization**: Consistent error handling across app
- **Token Management**: Centralized authentication handling
- **Request Logging**: Built-in request monitoring

### SaaS Platforms
- **Organization Isolation**: Data separation by channel
- **Custom Domains**: Support for custom domain mapping
- **Multi-environment**: Different channels for dev/staging/prod
- **API Gateway**: Centralized API access patterns

## 🔒 Security Considerations

### Authentication Security
- **Token Transmission**: Secure token handling in headers
- **Environment Variables**: API URLs from environment config
- **Error Exposure**: Limited error information in responses
- **Channel Validation**: Subdomain-based channel verification

### Request Security
- **Input Validation**: Path and parameter validation
- **HTTPS Enforcement**: Secure protocol requirements
- **CORS Handling**: Proper cross-origin request setup
- **Rate Limiting**: Compatible with API rate limiting

### Error Security
- **Information Disclosure**: Limited error details to prevent information leakage
- **Logging**: Detailed logging for debugging without exposing sensitive data
- **Fallback Behavior**: Graceful degradation on errors
- **Timeout Handling**: Proper timeout and retry strategies

## 🌍 Multi-tenant Architecture

### Channel Detection
- **Subdomain Extraction**: Automatic detection from hostname
- **Domain Mapping**: Support for custom domain mapping
- **Fallback Channels**: Default channel for unrecognized domains
- **Environment Switching**: Different channels per environment

### Data Isolation
- **Channel Context**: All requests include channel information
- **API Filtering**: Server-side filtering by channel
- **User Permissions**: Channel-specific user access
- **Resource Separation**: Complete data isolation between channels

## ⚠️ Important Notes

- **Browser Environment**: Functions designed for client-side use
- **API Dependencies**: Requires backend API with channel support
- **Token Management**: Tokens should be securely stored and managed
- **Error Handling**: Always handle potential API errors
- **Channel Setup**: Requires proper channel configuration on backend

## 🔗 Related Utilities

- [helpFunction](./helpFunction.md) - Core API utilities (reqOptions, extractSubDomain)
- [auth-actions](./auth-actions.md) - Authentication action utilities
- [permissions](./permissions.md) - Authorization and permission checking
- [utils](./utils.md) - Constants and configuration data