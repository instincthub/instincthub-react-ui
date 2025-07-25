# Delete Confirmation Modal

**Category:** Library | **Type:** specialized modal utility

Advanced delete confirmation modal with GitHub-style confirmation flow, copy-to-clipboard functionality, and integrated API deletion. Provides secure deletion workflow with type-to-confirm validation and comprehensive error handling.

## 📁 File Location

`src/components/lib/modals/openConfirmDelete.ts`

## 🏷️ Tags

`delete`, `confirmation`, `modal`, `api`, `validation`, `security`, `github-style`, `copy-clipboard`, `promises`

## 📖 Usage Examples

### Example 1: Complete Delete Management System

```tsx
"use client";

import React, { useState } from "react";
import { openConfirmDelete } from "@instincthub/react-ui/lib";

/**
 * Advanced delete management system with different deletion scenarios
 */
const DeleteManagementSystem = () => {
  const [resources, setResources] = useState([
    {
      id: "proj-001",
      name: "react-dashboard",
      type: "Project",
      description: "Main dashboard application",
      createdAt: "2024-01-15",
      apiEndpoint: "/api/projects/proj-001"
    },
    {
      id: "user-001", 
      name: "john.doe@example.com",
      type: "User Account",
      description: "Admin user account",
      createdAt: "2024-01-10",
      apiEndpoint: "/api/users/user-001"
    },
    {
      id: "repo-001",
      name: "instincthub-frontend",
      type: "Repository",
      description: "Frontend codebase repository",
      createdAt: "2024-01-05",
      apiEndpoint: "/api/repositories/repo-001"
    },
    {
      id: "data-001",
      name: "user-analytics-2024",
      type: "Dataset",
      description: "User analytics data collection",
      createdAt: "2024-01-01",
      apiEndpoint: "/api/datasets/data-001"
    }
  ]);

  const [deleteHistory, setDeleteHistory] = useState<any[]>([]);
  const [authToken, setAuthToken] = useState("demo-token-12345");

  // Handle resource deletion with different confirmation levels
  const handleDelete = async (resource: any, skipPopup: boolean = false) => {
    const API_BASE = "https://api.example.com";
    const fullEndpoint = `${API_BASE}${resource.apiEndpoint}`;
    
    console.log(`Attempting to delete: ${resource.name}`);
    console.log(`Endpoint: ${fullEndpoint}`);
    console.log(`Skip popup: ${skipPopup}`);
    
    try {
      // Use openConfirmDelete with proper parameters
      const success = await openConfirmDelete(
        resource.name,           // Item name to type for confirmation
        authToken,              // Authentication token
        fullEndpoint,           // API endpoint for deletion
        !skipPopup              // Show popup confirmation (inverse of skipPopup)
      );

      if (success) {
        // Remove from local state on successful deletion
        setResources(prev => prev.filter(r => r.id !== resource.id));
        
        // Add to delete history
        const historyEntry = {
          id: Date.now(),
          resourceId: resource.id,
          name: resource.name,
          type: resource.type,
          deletedAt: new Date().toISOString(),
          success: true
        };
        setDeleteHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
        
        console.log(`Successfully deleted: ${resource.name}`);
      } else {
        console.log(`Deletion cancelled or failed: ${resource.name}`);
        
        // Add failed deletion to history
        const historyEntry = {
          id: Date.now(),
          resourceId: resource.id,
          name: resource.name,
          type: resource.type,
          deletedAt: new Date().toISOString(),
          success: false
        };
        setDeleteHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
      }
    } catch (error) {
      console.error("Delete operation error:", error);
      
      // Add error to history
      const historyEntry = {
        id: Date.now(),
        resourceId: resource.id,
        name: resource.name,
        type: resource.type,
        deletedAt: new Date().toISOString(),
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
      setDeleteHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
    }
  };

  // Get icon for resource type
  const getResourceIcon = (type: string) => {
    const icons = {
      "Project": "pi-folder",
      "User Account": "pi-user",
      "Repository": "pi-github",
      "Dataset": "pi-database"
    };
    return icons[type as keyof typeof icons] || "pi-file";
  };

  // Get color for resource type
  const getResourceColor = (type: string) => {
    const colors = {
      "Project": "primary",
      "User Account": "success", 
      "Repository": "info",
      "Dataset": "warning"
    };
    return colors[type as keyof typeof colors] || "secondary";
  };

  return (
    <div className="ihub-container ihub-py-5">
      <h1>Delete Management System</h1>
      
      {/* Configuration */}
      <section className="ihub-mb-4">
        <div className="ihub-card ihub-p-4">
          <h5>Configuration</h5>
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <label className="ihub-form-label">Authentication Token</label>
              <input
                type="text"
                className="ihub-form-control"
                value={authToken}
                onChange={(e) => setAuthToken(e.target.value)}
                placeholder="Enter auth token"
              />
              <small className="text-muted">
                Token used for API authentication during deletion
              </small>
            </div>
            <div className="ihub-col-md-6">
              <div className="ihub-mt-4">
                <div className="ihub-alert ihub-alert-info">
                  <strong>Demo Mode:</strong> Actual API calls will be simulated. 
                  The modal will show proper validation flow.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Management */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Resources ({resources.length})</h2>
        
        {resources.length > 0 ? (
          <div className="ihub-row">
            {resources.map((resource) => (
              <div key={resource.id} className="ihub-col-md-6 ihub-col-lg-4 ihub-mb-4">
                <div className="ihub-card ihub-h-100">
                  <div className="ihub-card-body ihub-p-4">
                    <div className="ihub-d-flex ihub-align-items-start ihub-justify-content-between ihub-mb-3">
                      <div className="ihub-d-flex ihub-align-items-center">
                        <i className={`pi ${getResourceIcon(resource.type)} ihub-me-2`} 
                           style={{ fontSize: "20px" }}></i>
                        <div>
                          <h6 className="ihub-mb-1">{resource.name}</h6>
                          <span className={`ihub-badge ihub-badge-${getResourceColor(resource.type)}`}>
                            {resource.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="ihub-card-text ihub-text-sm">
                      {resource.description}
                    </p>
                    
                    <div className="ihub-mb-3">
                      <small className="text-muted">
                        <i className="pi pi-calendar ihub-me-1"></i>
                        Created: {new Date(resource.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                    
                    <div className="ihub-d-grid ihub-gap-2">
                      <button
                        className="ihub-btn ihub-btn-danger ihub-btn-sm"
                        onClick={() => handleDelete(resource)}
                      >
                        <i className="pi pi-trash ihub-me-1"></i>
                        Delete with Confirmation
                      </button>
                      
                      <button
                        className="ihub-btn ihub-btn-outline-danger ihub-btn-sm"
                        onClick={() => handleDelete(resource, true)}
                      >
                        <i className="pi pi-times ihub-me-1"></i>
                        Force Delete (No Popup)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="ihub-card ihub-p-5 ihub-text-center">
            <i className="pi pi-inbox" style={{ fontSize: "48px", color: "#6c757d" }}></i>
            <h5 className="ihub-mt-3">No Resources Available</h5>
            <p className="text-muted">All resources have been deleted or none were loaded.</p>
          </div>
        )}
      </section>

      {/* Delete History */}
      {deleteHistory.length > 0 && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">Delete History</h2>
          <div className="ihub-card">
            <div className="table-responsive">
              <table className="table table-hover ihub-mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Resource</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Deleted At</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {deleteHistory.map((entry) => (
                    <tr key={entry.id}>
                      <td>
                        <div className="ihub-d-flex ihub-align-items-center">
                          <i className={`pi ${getResourceIcon(entry.type)} ihub-me-2`}></i>
                          {entry.name}
                        </div>
                      </td>
                      <td>
                        <span className={`ihub-badge ihub-badge-${getResourceColor(entry.type)}`}>
                          {entry.type}
                        </span>
                      </td>
                      <td>
                        <span className={`ihub-badge ${
                          entry.success 
                            ? "ihub-badge-success" 
                            : "ihub-badge-danger"
                        }`}>
                          {entry.success ? "Deleted" : "Failed"}
                        </span>
                      </td>
                      <td>
                        <small>{new Date(entry.deletedAt).toLocaleString()}</small>
                      </td>
                      <td>
                        {entry.error && (
                          <small className="text-danger">
                            <i className="pi pi-exclamation-triangle ihub-me-1"></i>
                            {entry.error}
                          </small>
                        )}
                        {entry.success && (
                          <small className="text-success">
                            <i className="pi pi-check ihub-me-1"></i>
                            Successfully removed
                          </small>
                        )}
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
              Basic Delete Integration
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Basic delete confirmation with API integration
import { openConfirmDelete } from '@instincthub/react-ui/lib';

const DeleteItemButton = ({ item, authToken, onDelete }) => {
  const handleDelete = async () => {
    try {
      const success = await openConfirmDelete(
        item.name,                    // Item name for confirmation
        authToken,                    // Auth token for API
        \`/api/items/\${item.id}\`,      // Delete endpoint
        true                          // Show confirmation popup
      );

      if (success) {
        // Item was successfully deleted
        onDelete(item.id);
        console.log(\`Deleted: \${item.name}\`);
      } else {
        // Deletion was cancelled or failed
        console.log('Deletion cancelled or failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className="btn btn-danger"
    >
      Delete {item.name}
    </button>
  );
};

// Usage in a list component
const ItemList = ({ items, authToken }) => {
  const [itemList, setItemList] = useState(items);

  const handleItemDeleted = (deletedId) => {
    setItemList(prev => prev.filter(item => item.id !== deletedId));
  };

  return (
    <div>
      {itemList.map(item => (
        <div key={item.id} className="item-card">
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <DeleteItemButton
            item={item}
            authToken={authToken}
            onDelete={handleItemDeleted}
          />
        </div>
      ))}
    </div>
  );
};`}
            </pre>
          </div>
        </div>

        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-shield ihub-me-2"></i>
              Secure Bulk Delete Operations
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Bulk delete with individual confirmations
const BulkDeleteManager = ({ selectedItems, authToken }) => {
  const [deleteProgress, setDeleteProgress] = useState(null);
  const [results, setResults] = useState([]);

  const handleBulkDelete = async () => {
    setDeleteProgress({ current: 0, total: selectedItems.length });
    const deleteResults = [];

    for (let i = 0; i < selectedItems.length; i++) {
      const item = selectedItems[i];
      setDeleteProgress({ current: i + 1, total: selectedItems.length });

      try {
        const success = await openConfirmDelete(
          item.name,
          authToken,
          \`/api/items/\${item.id}\`,
          true  // Show confirmation for each item
        );

        deleteResults.push({
          item: item.name,
          success,
          timestamp: new Date().toISOString()
        });

        if (!success) {
          // User cancelled, ask if they want to continue with remaining items
          const continueNext = confirm(
            \`Deletion of "\${item.name}" was cancelled. Continue with remaining items?\`
          );
          if (!continueNext) break;
        }
      } catch (error) {
        deleteResults.push({
          item: item.name,
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    }

    setResults(deleteResults);
    setDeleteProgress(null);
  };

  const handleSilentBulkDelete = async () => {
    // Delete all items without individual confirmations
    const confirmBulk = confirm(
      \`Delete all \${selectedItems.length} items without individual confirmations?\`
    );

    if (!confirmBulk) return;

    setDeleteProgress({ current: 0, total: selectedItems.length });
    const deleteResults = [];

    for (let i = 0; i < selectedItems.length; i++) {
      const item = selectedItems[i];
      setDeleteProgress({ current: i + 1, total: selectedItems.length });

      try {
        const success = await openConfirmDelete(
          item.name,
          authToken,
          \`/api/items/\${item.id}\`,
          false  // Skip popup confirmation
        );

        deleteResults.push({
          item: item.name,
          success,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        deleteResults.push({
          item: item.name,
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    }

    setResults(deleteResults);
    setDeleteProgress(null);
  };

  return (
    <div className="bulk-delete-manager">
      <div className="actions">
        <button onClick={handleBulkDelete}>
          Delete with Confirmations
        </button>
        <button onClick={handleSilentBulkDelete}>
          Silent Bulk Delete
        </button>
      </div>

      {deleteProgress && (
        <div className="progress-display">
          <p>Deleting {deleteProgress.current} of {deleteProgress.total}</p>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: \`\${(deleteProgress.current / deleteProgress.total) * 100}%\` }}
            />
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="results">
          <h3>Delete Results</h3>
          {results.map((result, index) => (
            <div key={index} className={result.success ? 'success' : 'error'}>
              {result.item}: {result.success ? 'Deleted' : 'Failed'}
              {result.error && <span> - {result.error}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};`}
            </pre>
          </div>
        </div>

        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-cog ihub-me-2"></i>
              Advanced Error Handling
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Advanced delete with comprehensive error handling
const advancedDelete = async (item, authToken, options = {}) => {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    confirmationRequired = true,
    onProgress = () => {},
    onError = () => {}
  } = options;

  let attempts = 0;
  let lastError = null;

  while (attempts < maxRetries) {
    try {
      attempts++;
      onProgress(\`Attempt \${attempts} of \${maxRetries}\`);

      const success = await openConfirmDelete(
        item.name,
        authToken,
        \`/api/items/\${item.id}\`,
        confirmationRequired && attempts === 1  // Only show confirmation on first attempt
      );

      if (success) {
        onProgress('Delete successful');
        return { success: true, attempts };
      } else {
        // User cancelled or API returned failure
        return { success: false, cancelled: true, attempts };
      }

    } catch (error) {
      lastError = error;
      onError(\`Attempt \${attempts} failed: \${error.message}\`);

      if (attempts < maxRetries) {
        onProgress(\`Retrying in \${retryDelay}ms...\`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        retryDelay *= 2; // Exponential backoff
      }
    }
  }

  // All attempts failed
  onError(\`All \${maxRetries} attempts failed. Last error: \${lastError?.message}\`);
  return { 
    success: false, 
    attempts, 
    error: lastError?.message || 'Unknown error' 
  };
};

// Usage with custom error handling
const DeleteWithRetry = ({ item, authToken }) => {
  const [status, setStatus] = useState('ready');
  const [progress, setProgress] = useState('');

  const handleDelete = async () => {
    setStatus('deleting');
    
    const result = await advancedDelete(item, authToken, {
      maxRetries: 3,
      retryDelay: 1000,
      confirmationRequired: true,
      onProgress: (msg) => setProgress(msg),
      onError: (error) => console.error('Delete error:', error)
    });

    if (result.success) {
      setStatus('deleted');
      setProgress('Successfully deleted');
    } else if (result.cancelled) {
      setStatus('cancelled');
      setProgress('Delete cancelled by user');
    } else {
      setStatus('failed');
      setProgress(\`Failed after \${result.attempts} attempts: \${result.error}\`);
    }
  };

  return (
    <div className="delete-with-retry">
      <h3>{item.name}</h3>
      <p>Status: {status}</p>
      {progress && <p>Progress: {progress}</p>}
      
      <button 
        onClick={handleDelete}
        disabled={status === 'deleting'}
        className={\`btn \${status === 'deleted' ? 'btn-success' : 'btn-danger'}\`}
      >
        {status === 'deleting' ? 'Deleting...' : 'Delete Item'}
      </button>
    </div>
  );
};`}
            </pre>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Modal Features</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-4 ihub-mb-3">
            <div className="ihub-card ihub-h-100">
              <div className="ihub-card-body ihub-p-4">
                <h6>
                  <i className="pi pi-shield ihub-me-2"></i>
                  Type-to-Confirm
                </h6>
                <p className="ihub-card-text">
                  GitHub-style confirmation requiring users to type the exact resource name.
                </p>
                <div className="ihub-alert ihub-alert-info">
                  <small>Prevents accidental deletions with muscle memory protection.</small>
                </div>
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-4 ihub-mb-3">
            <div className="ihub-card ihub-h-100">
              <div className="ihub-card-body ihub-p-4">
                <h6>
                  <i className="pi pi-copy ihub-me-2"></i>
                  Copy to Clipboard
                </h6>
                <p className="ihub-card-text">
                  Built-in copy button to help users paste the exact confirmation text.
                </p>
                <div className="ihub-alert ihub-alert-info">
                  <small>Reduces typing errors and improves user experience.</small>
                </div>
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-4 ihub-mb-3">
            <div className="ihub-card ihub-h-100">
              <div className="ihub-card-body ihub-p-4">
                <h6>
                  <i className="pi pi-server ihub-me-2"></i>
                  API Integration
                </h6>
                <p className="ihub-card-text">
                  Direct API call integration with proper authentication and error handling.
                </p>
                <div className="ihub-alert ihub-alert-info">
                  <small>Handles HTTP status codes and provides user feedback.</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeleteManagementSystem;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { openConfirmDelete } from '@instincthub/react-ui/lib';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { openConfirmDelete } from '@instincthub/react-ui/lib';

function DeleteButton({ item, authToken, onDeleted }) {
  const handleDelete = async () => {
    const success = await openConfirmDelete(
      item.name,                    // Item name to type for confirmation
      authToken,                    // Authentication token
      `/api/items/${item.id}`,      // API endpoint
      true                          // Show confirmation popup
    );

    if (success) {
      onDeleted(item.id);
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      Delete {item.name}
    </button>
  );
}
```

## 🔧 Function Reference

### Delete Confirmation Modal

#### `openConfirmDelete(message: string, token: string, url: string, pop?: boolean): Promise<boolean>`

Opens a sophisticated delete confirmation modal with GitHub-style confirmation flow.

**Parameters:**
- `message`: The exact text user must type to confirm deletion
- `token`: Authentication token for the API request
- `url`: API endpoint for the DELETE request
- `pop`: Whether to show confirmation popup (default: true)

**Returns:**
- `Promise<boolean>`: Resolves to `true` if deletion successful, `false` if cancelled/failed

## 🎯 Key Features

### GitHub-Style Confirmation
- **Type-to-Confirm**: Users must type exact resource name
- **Copy Button**: Built-in clipboard functionality
- **Visual Feedback**: Real-time validation of typed text
- **Submit Protection**: Button disabled until correct text entered

### API Integration
- **HTTP Methods**: Uses DELETE method for API calls
- **Authentication**: Includes Bearer token in Authorization header
- **Status Handling**: Proper HTTP status code handling
- **Error Messages**: User-friendly error messages

### Security Features
- **Confirmation Required**: Prevents accidental deletions
- **Token Validation**: Requires valid authentication
- **Input Validation**: Exact text matching required
- **Error Boundaries**: Comprehensive error handling

### User Experience
- **Keyboard Navigation**: Full keyboard accessibility
- **Escape to Cancel**: Press Escape to cancel
- **Click Outside**: Click backdrop to cancel
- **Copy Assistance**: Help users with exact text

## 💡 Use Cases

### Critical Resource Deletion
- **Project Deletion**: Delete entire projects with confirmation
- **User Account Removal**: Remove user accounts safely
- **Repository Deletion**: Delete code repositories
- **Data Purging**: Remove sensitive data sets

### Administrative Actions
- **Bulk Operations**: Part of bulk deletion workflows
- **System Maintenance**: Remove deprecated resources
- **Cleanup Tasks**: Regular system cleanup operations
- **Security Actions**: Remove compromised resources

### Content Management
- **Article Deletion**: Remove published content
- **Media Cleanup**: Delete unused media files
- **Comment Moderation**: Remove inappropriate content
- **Backup Cleanup**: Remove old backup files

## 🌍 API Response Handling

### Success Responses
- **204 No Content**: Standard successful deletion
- **200 OK**: Deletion with response body
- **Success Toast**: Automatic success notification

### Error Responses
- **401 Unauthorized**: Permission denied message
- **403 Forbidden**: Access denied handling
- **404 Not Found**: Resource not found handling
- **500 Server Error**: Generic server error message

### Network Errors
- **Connection Failures**: Network timeout handling
- **CORS Issues**: Cross-origin request errors
- **Malformed URLs**: Invalid endpoint handling

## 🔒 Security Considerations

### Authentication
- **Bearer Tokens**: Secure token transmission
- **Token Validation**: Server-side token verification
- **Permission Checks**: Role-based access control
- **Session Management**: Handle expired tokens

### Input Security
- **Exact Matching**: Prevent partial matches
- **Case Sensitivity**: Exact case matching required
- **Special Characters**: Handle special characters in names
- **XSS Prevention**: Safe text rendering

### API Security
- **HTTPS Required**: Secure communication only
- **Request Validation**: Server-side validation
- **Rate Limiting**: Prevent abuse
- **Audit Logging**: Track deletion operations

## ⚠️ Important Notes

- **Irreversible Action**: Deletions cannot be undone
- **Case Sensitive**: Text matching is case-sensitive
- **Network Required**: Requires active internet connection
- **Token Expiry**: Handle expired authentication tokens
- **CSS Dependencies**: Requires ihub- prefixed CSS classes

## 🔗 Related Utilities

- [modals](./modals-modals.md) - Basic modal utilities (openConfirmModal, openToast)
- [helpFunction](./helpFunction) - reqOptions function for API requests
- [auth-actions](./auth-actions.md) - Authentication utilities for token management
- [permissions](./permissions.md) - Role-based permission checking