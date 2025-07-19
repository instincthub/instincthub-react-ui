# DeleteConfirmationModal

A secure delete confirmation modal that requires users to type the exact item name before allowing deletion. This component integrates with Redux state management and provides comprehensive error handling, progress states, and accessibility features.

## Features

- **Type-to-Confirm**: Users must type exact item name to enable deletion
- **Redux Integration**: Connects to global state management
- **Session Management**: Handles user authentication and permissions
- **Progress States**: Loading, success, and error states
- **Copy Helper**: Provides copy-to-clipboard for item name
- **Accessibility**: ARIA labels, roles, and keyboard navigation
- **Error Handling**: Comprehensive error messages and network error handling

## Props

### DeleteConfirmationModal Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `itemTitle` | `string` | - | Optional custom title for the item being deleted |

## Redux State Management

The component uses Redux with the following actions:

```tsx
// To trigger the modal
dispatch(confirmDelete.actions.set({ 
  url: "https://api.example.com/items/123", 
  title: "My Important Item" 
}));

// To close the modal
dispatch(confirmDelete.actions.set({}));

// To listen for successful deletion
const { title, deleteStatus } = useSelector(selectConfirmDelete);
useEffect(() => {
  if (deleteStatus === 204) {
    // Handle successful deletion
    dispatch(confirmDelete.actions.set({})); // Close modal
  }
}, [deleteStatus]);
```

## Basic Usage

```tsx
"use client";

import React, { useEffect } from 'react';
import { 
  DeleteConfirmationModal, 
  confirmDelete, 
  selectConfirmDelete, 
  useDispatch, 
  useSelector 
} from 'instincthub-react-ui';

export default function BasicDeleteExample() {
  const dispatch = useDispatch();
  const { deleteStatus } = useSelector(selectConfirmDelete);

  const handleDelete = () => {
    dispatch(confirmDelete.actions.set({
      url: "https://api.example.com/items/123",
      title: "Important Document"
    }));
  };

  useEffect(() => {
    if (deleteStatus === 204) {
      console.log('Item deleted successfully');
      dispatch(confirmDelete.actions.set({}));
    }
  }, [deleteStatus, dispatch]);

  return (
    <div>
      <button onClick={handleDelete}>Delete Item</button>
      <DeleteConfirmationModal />
    </div>
  );
}
```

## Advanced Usage

### File Management System

```tsx
"use client";

import React, { useState, useEffect } from 'react';
import { 
  DeleteConfirmationModal,
  confirmDelete,
  selectConfirmDelete,
  useDispatch,
  useSelector
} from 'instincthub-react-ui';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: number;
  createdAt: string;
  url: string;
}

export default function FileManager() {
  const dispatch = useDispatch();
  const { deleteStatus, title } = useSelector(selectConfirmDelete);
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: '1',
      name: 'project-proposal.pdf',
      type: 'file',
      size: 2048576,
      createdAt: '2023-12-01T10:00:00Z',
      url: 'https://api.example.com/files/1'
    },
    {
      id: '2',
      name: 'Important Project',
      type: 'folder',
      createdAt: '2023-11-15T14:30:00Z',
      url: 'https://api.example.com/folders/2'
    },
    {
      id: '3',
      name: 'backup-data.zip',
      type: 'file',
      size: 52428800,
      createdAt: '2023-12-02T09:15:00Z',
      url: 'https://api.example.com/files/3'
    }
  ]);

  const handleDeleteFile = (file: FileItem) => {
    dispatch(confirmDelete.actions.set({
      url: file.url,
      title: file.name
    }));
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    if (deleteStatus === 204 && title) {
      // Remove deleted file from state
      setFiles(prev => prev.filter(file => file.name !== title));
      dispatch(confirmDelete.actions.set({}));
    }
  }, [deleteStatus, title, dispatch]);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>File Manager</h1>
      
      <div style={{ 
        border: '1px solid #e1e1e1', 
        borderRadius: '8px', 
        overflow: 'hidden' 
      }}>
        <div style={{ 
          padding: '16px', 
          backgroundColor: '#f8f9fa', 
          borderBottom: '1px solid #e1e1e1',
          fontWeight: 'bold'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 150px 120px', gap: '16px' }}>
            <span>Name</span>
            <span>Type</span>
            <span>Modified</span>
            <span>Actions</span>
          </div>
        </div>

        {files.map(file => (
          <div key={file.id} style={{ 
            padding: '16px', 
            borderBottom: '1px solid #e1e1e1',
            display: 'grid', 
            gridTemplateColumns: '1fr 100px 150px 120px', 
            gap: '16px',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                {file.type === 'folder' ? '📁' : '📄'} {file.name}
              </div>
              {file.size && (
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  {formatFileSize(file.size)}
                </div>
              )}
            </div>
            
            <span style={{ 
              padding: '4px 8px', 
              borderRadius: '4px', 
              fontSize: '12px',
              backgroundColor: file.type === 'folder' ? '#dbeafe' : '#fef3c7',
              color: file.type === 'folder' ? '#1d4ed8' : '#92400e'
            }}>
              {file.type}
            </span>
            
            <span style={{ fontSize: '14px', color: '#6b7280' }}>
              {formatDate(file.createdAt)}
            </span>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => console.log('Download', file.name)}
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Download
              </button>
              <button
                onClick={() => handleDeleteFile(file)}
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <DeleteConfirmationModal />
    </div>
  );
}
```

### User Management Dashboard

```tsx
"use client";

import React, { useState, useEffect } from 'react';
import { 
  DeleteConfirmationModal,
  confirmDelete,
  selectConfirmDelete,
  useDispatch,
  useSelector
} from 'instincthub-react-ui';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  lastActive: string;
  url: string;
}

export default function UserManagement() {
  const dispatch = useDispatch();
  const { deleteStatus, title } = useSelector(selectConfirmDelete);
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      username: 'john_doe',
      email: 'john@example.com',
      role: 'user',
      lastActive: '2023-12-01T10:00:00Z',
      url: 'https://api.example.com/users/1'
    },
    {
      id: '2',
      username: 'admin_sarah',
      email: 'sarah@example.com',
      role: 'admin',
      lastActive: '2023-12-02T15:30:00Z',
      url: 'https://api.example.com/users/2'
    },
    {
      id: '3',
      username: 'mod_mike',
      email: 'mike@example.com',
      role: 'moderator',
      lastActive: '2023-11-30T08:45:00Z',
      url: 'https://api.example.com/users/3'
    }
  ]);

  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const handleDeleteUser = (user: User) => {
    if (user.role === 'admin') {
      setShowDeleteWarning(true);
      setTimeout(() => setShowDeleteWarning(false), 5000);
      return;
    }

    dispatch(confirmDelete.actions.set({
      url: user.url,
      title: user.username
    }));
  };

  const formatLastActive = (dateString: string) => {
    const now = new Date();
    const lastActive = new Date(dateString);
    const diffMs = now.getTime() - lastActive.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return { bg: '#fef2f2', color: '#dc2626' };
      case 'moderator': return { bg: '#fef3c7', color: '#92400e' };
      default: return { bg: '#f0f9ff', color: '#1d4ed8' };
    }
  };

  useEffect(() => {
    if (deleteStatus === 204 && title) {
      setUsers(prev => prev.filter(user => user.username !== title));
      dispatch(confirmDelete.actions.set({}));
    }
  }, [deleteStatus, title, dispatch]);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1>User Management</h1>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Add New User
        </button>
      </div>

      {showDeleteWarning && (
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#fef2f2',
          border: '1px solid #fca5a5',
          borderRadius: '6px',
          marginBottom: '20px',
          color: '#dc2626'
        }}>
          ⚠️ Admin users cannot be deleted for security reasons.
        </div>
      )}

      <div style={{ 
        border: '1px solid #e1e1e1', 
        borderRadius: '8px', 
        overflow: 'hidden',
        backgroundColor: 'white'
      }}>
        <div style={{ 
          padding: '16px', 
          backgroundColor: '#f8f9fa', 
          borderBottom: '1px solid #e1e1e1',
          fontWeight: 'bold'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '200px 250px 120px 150px 1fr', 
            gap: '16px'
          }}>
            <span>Username</span>
            <span>Email</span>
            <span>Role</span>
            <span>Last Active</span>
            <span>Actions</span>
          </div>
        </div>

        {users.map(user => {
          const roleStyle = getRoleColor(user.role);
          
          return (
            <div key={user.id} style={{ 
              padding: '16px', 
              borderBottom: '1px solid #e1e1e1',
              display: 'grid', 
              gridTemplateColumns: '200px 250px 120px 150px 1fr', 
              gap: '16px',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontWeight: 'bold' }}>{user.username}</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>ID: {user.id}</div>
              </div>
              
              <span style={{ fontSize: '14px' }}>{user.email}</span>
              
              <span style={{ 
                padding: '4px 8px', 
                borderRadius: '4px', 
                fontSize: '12px',
                backgroundColor: roleStyle.bg,
                color: roleStyle.color,
                textAlign: 'center'
              }}>
                {user.role}
              </span>
              
              <span style={{ fontSize: '14px', color: '#6b7280' }}>
                {formatLastActive(user.lastActive)}
              </span>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => console.log('Edit user', user.username)}
                  style={{
                    padding: '6px 12px',
                    fontSize: '12px',
                    backgroundColor: '#f59e0b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user)}
                  disabled={user.role === 'admin'}
                  style={{
                    padding: '6px 12px',
                    fontSize: '12px',
                    backgroundColor: user.role === 'admin' ? '#9ca3af' : '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: user.role === 'admin' ? 'not-allowed' : 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <DeleteConfirmationModal itemTitle="user account" />
    </div>
  );
}
```

## Form Integration

### Bulk Delete Operations

```tsx
"use client";

import React, { useState, useEffect } from 'react';
import { 
  DeleteConfirmationModal,
  confirmDelete,
  selectConfirmDelete,
  useDispatch,
  useSelector
} from 'instincthub-react-ui';

interface Item {
  id: string;
  name: string;
  selected: boolean;
}

export default function BulkDeleteManager() {
  const dispatch = useDispatch();
  const { deleteStatus, title } = useSelector(selectConfirmDelete);
  const [items, setItems] = useState<Item[]>([
    { id: '1', name: 'Document 1.pdf', selected: false },
    { id: '2', name: 'Image Gallery', selected: false },
    { id: '3', name: 'Backup Archive.zip', selected: false },
    { id: '4', name: 'Project Files', selected: false },
    { id: '5', name: 'Meeting Notes.docx', selected: false }
  ]);

  const selectedItems = items.filter(item => item.selected);
  const allSelected = items.length > 0 && selectedItems.length === items.length;
  const someSelected = selectedItems.length > 0 && selectedItems.length < items.length;

  const toggleSelectAll = () => {
    setItems(prev => prev.map(item => ({ ...item, selected: !allSelected })));
  };

  const toggleSelectItem = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const handleBulkDelete = () => {
    if (selectedItems.length === 0) return;

    const itemNames = selectedItems.map(item => item.name).join(', ');
    const bulkTitle = selectedItems.length === 1 
      ? selectedItems[0].name 
      : `${selectedItems.length} items (${itemNames})`;

    dispatch(confirmDelete.actions.set({
      url: 'https://api.example.com/bulk-delete',
      title: bulkTitle
    }));
  };

  const handleSingleDelete = (item: Item) => {
    dispatch(confirmDelete.actions.set({
      url: `https://api.example.com/items/${item.id}`,
      title: item.name
    }));
  };

  useEffect(() => {
    if (deleteStatus === 204) {
      // Remove deleted items
      if (title?.includes('items (')) {
        // Bulk delete
        setItems(prev => prev.filter(item => !item.selected));
      } else if (title) {
        // Single delete
        setItems(prev => prev.filter(item => item.name !== title));
      }
      dispatch(confirmDelete.actions.set({}));
    }
  }, [deleteStatus, title, dispatch]);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Bulk Operations Manager</h1>

      <div style={{ 
        marginBottom: '20px',
        padding: '16px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={allSelected}
              ref={input => {
                if (input) input.indeterminate = someSelected;
              }}
              onChange={toggleSelectAll}
            />
            Select All
          </label>
          <span style={{ color: '#6b7280' }}>
            {selectedItems.length} of {items.length} selected
          </span>
        </div>

        <button
          onClick={handleBulkDelete}
          disabled={selectedItems.length === 0}
          style={{
            padding: '8px 16px',
            backgroundColor: selectedItems.length > 0 ? '#dc2626' : '#9ca3af',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: selectedItems.length > 0 ? 'pointer' : 'not-allowed'
          }}
        >
          Delete Selected ({selectedItems.length})
        </button>
      </div>

      <div style={{ 
        border: '1px solid #e1e1e1', 
        borderRadius: '8px', 
        overflow: 'hidden' 
      }}>
        {items.map(item => (
          <div key={item.id} style={{ 
            padding: '16px', 
            borderBottom: '1px solid #e1e1e1',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: item.selected ? '#f0f9ff' : 'white'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
              <input
                type="checkbox"
                checked={item.selected}
                onChange={() => toggleSelectItem(item.id)}
              />
              <span style={{ 
                fontWeight: item.selected ? 'bold' : 'normal',
                color: item.selected ? '#1d4ed8' : 'inherit'
              }}>
                {item.name}
              </span>
            </label>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => console.log('Edit', item.name)}
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleSingleDelete(item)}
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <DeleteConfirmationModal />
    </div>
  );
}
```

## Error Handling

### Network Error Handling

```tsx
"use client";

import React, { useState, useEffect } from 'react';
import { 
  DeleteConfirmationModal,
  confirmDelete,
  selectConfirmDelete,
  useDispatch,
  useSelector
} from 'instincthub-react-ui';

export default function ErrorHandlingExample() {
  const dispatch = useDispatch();
  const { deleteStatus } = useSelector(selectConfirmDelete);
  const [errorLog, setErrorLog] = useState<string[]>([]);

  const simulateNetworkError = () => {
    dispatch(confirmDelete.actions.set({
      url: 'https://invalid-api-endpoint.com/delete/123',
      title: 'Test Item'
    }));
  };

  const simulateUnauthorizedError = () => {
    dispatch(confirmDelete.actions.set({
      url: 'https://api.example.com/unauthorized/123',
      title: 'Protected Item'
    }));
  };

  const simulateSuccessfulDelete = () => {
    dispatch(confirmDelete.actions.set({
      url: 'https://api.example.com/items/123',
      title: 'Regular Item'
    }));
  };

  useEffect(() => {
    if (deleteStatus === 204) {
      setErrorLog(prev => [...prev, `✅ Successfully deleted item at ${new Date().toLocaleTimeString()}`]);
      dispatch(confirmDelete.actions.set({}));
    }
  }, [deleteStatus, dispatch]);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Delete Error Handling Demo</h1>

      <div style={{ marginBottom: '20px' }}>
        <h3>Test Different Scenarios:</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={simulateSuccessfulDelete}
            style={{
              padding: '10px 16px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Simulate Successful Delete
          </button>
          
          <button
            onClick={simulateNetworkError}
            style={{
              padding: '10px 16px',
              backgroundColor: '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Simulate Network Error
          </button>
          
          <button
            onClick={simulateUnauthorizedError}
            style={{
              padding: '10px 16px',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Simulate Unauthorized Error
          </button>
        </div>
      </div>

      {errorLog.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Event Log:</h3>
          <div style={{
            border: '1px solid #e1e1e1',
            borderRadius: '6px',
            padding: '12px',
            backgroundColor: '#f8f9fa',
            maxHeight: '200px',
            overflowY: 'auto'
          }}>
            {errorLog.map((log, index) => (
              <div key={index} style={{ 
                marginBottom: '4px',
                fontSize: '14px',
                fontFamily: 'monospace'
              }}>
                {log}
              </div>
            ))}
          </div>
          <button
            onClick={() => setErrorLog([])}
            style={{
              marginTop: '8px',
              padding: '4px 8px',
              fontSize: '12px',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Clear Log
          </button>
        </div>
      )}

      <DeleteConfirmationModal />
    </div>
  );
}
```

## Testing Examples

### Unit Tests

```tsx
// __tests__/DeleteConfirmationModal.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { DeleteConfirmationModal, confirmDelete } from 'instincthub-react-ui';

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      confirmDelete: (state = { url: null, title: null }, action) => {
        switch (action.type) {
          case 'confirmDelete/set':
            return { ...state, ...action.payload };
          default:
            return state;
        }
      }
    },
    preloadedState: {
      confirmDelete: initialState
    }
  });
};

describe('DeleteConfirmationModal', () => {
  test('does not render when no URL is set', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <DeleteConfirmationModal />
      </Provider>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('renders modal when URL and title are set', () => {
    const store = createMockStore({
      url: 'https://api.example.com/items/123',
      title: 'Test Item'
    });

    render(
      <Provider store={store}>
        <DeleteConfirmationModal />
      </Provider>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Delete Test Item?')).toBeInTheDocument();
  });

  test('delete button is disabled until confirmation text matches', () => {
    const store = createMockStore({
      url: 'https://api.example.com/items/123',
      title: 'Test Item'
    });

    render(
      <Provider store={store}>
        <DeleteConfirmationModal />
      </Provider>
    );

    const deleteButton = screen.getByText('Delete');
    const input = screen.getByPlaceholderText('Type to confirm');

    expect(deleteButton).toBeDisabled();

    fireEvent.change(input, { target: { value: 'Wrong Text' } });
    expect(deleteButton).toBeDisabled();

    fireEvent.change(input, { target: { value: 'Test Item' } });
    expect(deleteButton).toBeEnabled();
  });

  test('closes modal when cancel button is clicked', () => {
    const store = createMockStore({
      url: 'https://api.example.com/items/123',
      title: 'Test Item'
    });

    render(
      <Provider store={store}>
        <DeleteConfirmationModal />
      </Provider>
    );

    fireEvent.click(screen.getByText('Cancel'));

    // Check that the modal is closed by dispatching the action
    expect(store.getState().confirmDelete.url).toBeNull();
  });

  test('shows loading state during deletion', async () => {
    global.fetch = jest.fn().mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({ status: 204 }), 100))
    );

    const store = createMockStore({
      url: 'https://api.example.com/items/123',
      title: 'Test Item'
    });

    render(
      <Provider store={store}>
        <DeleteConfirmationModal />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Type to confirm');
    const deleteButton = screen.getByText('Delete');

    fireEvent.change(input, { target: { value: 'Test Item' } });
    fireEvent.click(deleteButton);

    expect(screen.getByText('Deleting...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Deleting...')).not.toBeInTheDocument();
    });
  });
});
```

## Accessibility Features

### Enhanced Accessibility

```tsx
"use client";

import React, { useEffect, useRef } from 'react';
import { 
  DeleteConfirmationModal,
  confirmDelete,
  selectConfirmDelete,
  useDispatch,
  useSelector
} from 'instincthub-react-ui';

export default function AccessibleDeleteExample() {
  const dispatch = useDispatch();
  const { url } = useSelector(selectConfirmDelete);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  const handleDelete = () => {
    dispatch(confirmDelete.actions.set({
      url: 'https://api.example.com/items/123',
      title: 'Important Document'
    }));
  };

  // Return focus to trigger button when modal closes
  useEffect(() => {
    if (!url && triggerButtonRef.current) {
      triggerButtonRef.current.focus();
    }
  }, [url]);

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h1 id="page-title">Accessible Delete Demo</h1>
      
      <div style={{
        padding: '20px',
        border: '2px solid #e1e1e1',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>Document: Important Document.pdf</h2>
        <p>Size: 2.5 MB</p>
        <p>Created: December 1, 2023</p>
        
        <button
          ref={triggerButtonRef}
          onClick={handleDelete}
          style={{
            padding: '10px 16px',
            backgroundColor: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
          aria-describedby="delete-warning"
        >
          Delete Document
        </button>
        
        <div 
          id="delete-warning" 
          style={{ 
            marginTop: '8px', 
            fontSize: '12px', 
            color: '#dc2626' 
          }}
        >
          Warning: This action cannot be undone
        </div>
      </div>

      <div style={{
        padding: '16px',
        backgroundColor: '#f0fdf4',
        border: '1px solid #bbf7d0',
        borderRadius: '6px'
      }}>
        <h3>Accessibility Features:</h3>
        <ul>
          <li>✅ ARIA labels and roles</li>
          <li>✅ Keyboard navigation support</li>
          <li>✅ Focus management</li>
          <li>✅ Screen reader announcements</li>
          <li>✅ High contrast support</li>
        </ul>
      </div>

      <DeleteConfirmationModal />
    </div>
  );
}
```

## Related Components

- [CopyToClipBoard](./CopyToClipBoard.md) - Copy text to clipboard functionality
- [Dialog](./Dialog.md) - Modal dialog foundation
- [ErrorState](./ErrorState.md) - Error state display component
- [ModalExamples](./ModalExamples.md) - Modal component examples
- [SessionHandleProvider](./SessionHandleProvider.md) - Session management provider

## Notes

- Requires Redux store configuration with confirmDelete slice
- Uses NextAuth session for authentication
- Automatically focuses on confirmation input when modal opens
- Copy-to-clipboard helper improves user experience
- Supports both individual and custom item titles
- Network requests include proper authentication headers
- Modal closes automatically on successful deletion
- Component handles all loading states and error scenarios

