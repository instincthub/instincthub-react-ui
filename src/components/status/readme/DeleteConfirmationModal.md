# DeleteConfirmationModal Component Documentation

## Overview

`DeleteConfirmationModal` is a React component that provides a secure way to confirm item deletion. It requires users to type the exact name of the item they want to delete, helping prevent accidental deletions. The component integrates with Redux for state management and handles API calls for the deletion process.

## Installation

### Dependencies

This component requires the following dependencies:

```bash
npm install react react-dom next-auth redux @reduxjs/toolkit
```

### File Structure

Place the component in your project structure:

```
src/
  components/
    DeleteConfirmationModal.tsx
    CopyToClipBoard.tsx  # Required dependency
  assets/
    js/
      helpFunction.js    # Contains reqOptions function
  lib/
    redux/               # Contains Redux store configuration
```

## Usage

### Basic Implementation

```tsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { confirmDelete, selectConfirmDelete } from '../lib/redux';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

const MyComponent = () => {
  const dispatch = useDispatch();
  const { deleteStatus } = useSelector(selectConfirmDelete);
  
  // Handle successful deletion
  useEffect(() => {
    if (deleteStatus === 204) {
      // Deletion was successful - perform any cleanup
      dispatch(confirmDelete.actions.set({}));
      // Additional actions like refreshing data
    }
  }, [deleteStatus, dispatch]);
  
  // Function to trigger the delete modal
  const handleDeleteItem = (itemId: string, itemTitle: string) => {
    dispatch(confirmDelete.actions.set({
      url: `https://api.example.com/items/${itemId}`,
      title: itemTitle
    }));
  };
  
  return (
    <div>
      {/* Your component content */}
      <button onClick={() => handleDeleteItem('123', 'Example Item')}>
        Delete Item
      </button>
      
      {/* Include the modal component */}
      <DeleteConfirmationModal itemTitle="Example Item" />
    </div>
  );
};

export default MyComponent;
```

### Redux Integration

The component expects a Redux store with a `confirmDelete` slice. Here's a simplified implementation:

```tsx
// In lib/redux/slices/confirmDeleteSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConfirmDeleteState {
  url?: string;
  title?: string;
  deleteStatus?: number;
}

const initialState: ConfirmDeleteState = {};

export const confirmDeleteSlice = createSlice({
  name: 'confirmDelete',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Partial<ConfirmDeleteState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { actions } = confirmDeleteSlice;
export const selectConfirmDelete = (state: { confirmDelete: ConfirmDeleteState }) => 
  state.confirmDelete;

// In lib/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { confirmDeleteSlice } from './slices/confirmDeleteSlice';

export const store = configureStore({
  reducer: {
    confirmDelete: confirmDeleteSlice.reducer,
    // Other reducers...
  },
});
```

## Component API

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `itemTitle` | string | No | Additional context about what's being deleted. If not provided, falls back to the title from Redux. |

### Redux State

The component expects the following structure in the Redux store:

| Property | Type | Description |
|----------|------|-------------|
| `url` | string | API endpoint for the DELETE request |
| `title` | string | Name of the item being deleted (displayed to the user and required for confirmation) |
| `deleteStatus` | number | Status code from the delete operation (204 indicates success) |

## Internal Hooks

### useDeleteItem

Custom hook that handles the deletion logic.

```tsx
const useDeleteItem = (
  url: string | undefined, 
  title: string | undefined, 
  onSuccess: () => void
) => {
  // Returns { deleteItem, status, error }
}
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | string \| undefined | API endpoint for deletion |
| `title` | string \| undefined | Title of the item being deleted |
| `onSuccess` | () => void | Callback function to run after successful deletion |

#### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `deleteItem` | () => Promise<void> | Function to trigger the deletion process |
| `status` | 'idle' \| 'loading' \| 'success' \| 'error' | Current status of the deletion process |
| `error` | string \| null | Error message if deletion fails |

## Styling

The component uses CSS classes with the `ihub-` prefix. Add these styles to your CSS files:

```css
/* Delete Confirmation Modal Styles */
.ihub-delete-modal {
  padding: 30px;
  background-color: var(--White);
  border-radius: 5px;
  max-width: 600px;
  width: 100%;
}

/* Additional styles as provided in the CSS file */
```

## Accessibility

The component implements the following accessibility features:

- `role="dialog"` for the modal
- `aria-labelledby` and `aria-describedby` for descriptive text
- `role="alert"` for error messages
- `aria-busy` attribute for loading states
- Keyboard navigation support
- Focus management (autofocus on input field)

## Best Practices

1. **Error Handling**: The component handles API errors and provides user feedback.
2. **Security**: Prevents accidental deletions by requiring confirmation.
3. **User Experience**: Shows loading states and provides copy-to-clipboard functionality.
4. **Responsiveness**: Adapts to different screen sizes.

## Examples

### Deleting a User Account

```tsx
// Trigger the delete confirmation
dispatch(confirmDelete.actions.set({
  url: `${API_BASE_URL}/users/${userId}`,
  title: username
}));

// In your component
<DeleteConfirmationModal itemTitle="user account" />
```

### Deleting a Project with Custom Styling

```tsx
// Trigger the delete confirmation
dispatch(confirmDelete.actions.set({
  url: `${API_BASE_URL}/projects/${projectId}`,
  title: projectName
}));

// In your component
<DeleteConfirmationModal itemTitle="project and all associated data" />
```

## Troubleshooting

### Common Issues

1. **Modal not showing**: Ensure the Redux state is properly set with both `url` and `title`.
2. **Delete button always disabled**: Check that the input value exactly matches the `title` (case-sensitive).
3. **API errors**: Verify that the token is being correctly passed in the request.

### Error Messages

| Message | Cause | Solution |
|---------|-------|----------|
| "You don't have permission to delete this item." | 401 Unauthorized response | Check user permissions |
| "Couldn't delete the item." | Other API error | Check API logs |
| "Network error." | Connection issue | Check connectivity |

## Contributing

Follow these steps to modify the component:

1. Understand the component structure and how it integrates with Redux
2. Make changes with TypeScript type safety in mind
3. Test thoroughly, especially error cases
4. Update documentation if behavior changes