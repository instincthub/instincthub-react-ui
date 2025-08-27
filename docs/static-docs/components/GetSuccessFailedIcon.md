# GetSuccessFailedIcon Component

A simple icon component that displays either a success (check) or failed (cancel) icon based on a boolean value.

> **⚠️ Deprecation Notice**: This component is deprecated. Please use the more flexible `StatusIcon` component instead, which offers multiple status types and customization options.

## Features

- **Simple API**: Just pass a boolean value to show success or error
- **Consistent Styling**: Uses Material-UI icons with predefined colors
- **Lightweight**: Minimal component with fixed styling
- **Backward Compatible**: Still supported for existing implementations

## Installation

```bash
npm install @instincthub/react-ui
```

## Usage

### Basic Usage

```tsx
import { GetSuccessFailedIcon } from '@instincthub/react-ui';

function MyComponent() {
  const isSuccess = true;
  const isFailed = false;

  return (
    <div>
      <div>Success: {GetSuccessFailedIcon(isSuccess)}</div>
      <div>Failed: {GetSuccessFailedIcon(isFailed)}</div>
    </div>
  );
}
```

### In Status Indicators

```tsx
import { GetSuccessFailedIcon } from '@instincthub/react-ui';

function StatusList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {GetSuccessFailedIcon(item.isComplete)}
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  );
}
```

### In Forms

```tsx
import { GetSuccessFailedIcon } from '@instincthub/react-ui';

function FormField({ isValid, error, children }) {
  return (
    <div className="form-field">
      {children}
      {isValid !== undefined && (
        <span style={{ marginLeft: '8px' }}>
          {GetSuccessFailedIcon(isValid && !error)}
        </span>
      )}
    </div>
  );
}
```

## API

### Function Signature

```tsx
GetSuccessFailedIcon(success: boolean): JSX.Element
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `success` | `boolean` | If `true`, displays a green check circle icon. If `false`, displays a red cancel icon. |

### Return Value

Returns a JSX element containing either:
- **Success (true)**: Green `CheckCircleIcon` with classes `text-green-600 ihub-text-success`
- **Failed (false)**: Red `CancelIcon` with classes `text-red-600 ihub-text-danger`

## Styling

The component uses predefined CSS classes for consistent styling:

### Success Icon
- **Icon**: `CheckCircleIcon` from Material-UI
- **Classes**: `text-green-600 ihub-text-success`
- **Size**: `fontSize="small"`
- **Color**: Green (#16A34A)

### Failed Icon
- **Icon**: `CancelIcon` from Material-UI  
- **Classes**: `text-red-600 ihub-text-danger`
- **Size**: `fontSize="small"`
- **Color**: Red (#DC2626)

## Migration to StatusIcon

For new implementations, consider using the more flexible `StatusIcon` component:

```tsx
// Old approach
const oldIcon = GetSuccessFailedIcon(isSuccess);

// New approach with StatusIcon
import { StatusIcon } from '@instincthub/react-ui';

<StatusIcon 
  status={isSuccess ? "success" : "error"} 
  size="small" 
/>
```

### Benefits of StatusIcon

- **More Status Types**: success, error, warning, info, pending, loading, question, check, close
- **Customizable**: Custom colors, sizes, and styles
- **Interactive**: Click handlers and keyboard navigation
- **Accessible**: Full ARIA support
- **Animated**: Optional animations for loading states

## Examples in Context

### Task List

```tsx
import { GetSuccessFailedIcon } from '@instincthub/react-ui';

function TaskList({ tasks }) {
  return (
    <div className="task-list">
      <h3>Project Tasks</h3>
      {tasks.map(task => (
        <div key={task.id} className="task-item">
          {GetSuccessFailedIcon(task.completed)}
          <span className={task.completed ? 'completed' : 'pending'}>
            {task.title}
          </span>
        </div>
      ))}
    </div>
  );
}
```

### Validation Results

```tsx
import { GetSuccessFailedIcon } from '@instincthub/react-ui';

function ValidationSummary({ validationResults }) {
  return (
    <div className="validation-summary">
      <h4>Validation Results</h4>
      {Object.entries(validationResults).map(([field, isValid]) => (
        <div key={field} className="validation-item">
          {GetSuccessFailedIcon(isValid)}
          <span>{field}: {isValid ? 'Valid' : 'Invalid'}</span>
        </div>
      ))}
    </div>
  );
}
```

### API Response Status

```tsx
import { GetSuccessFailedIcon } from '@instincthub/react-ui';

function ApiStatus({ responses }) {
  return (
    <div className="api-status">
      {responses.map(response => (
        <div key={response.endpoint} className="response-status">
          {GetSuccessFailedIcon(response.success)}
          <span>{response.endpoint}</span>
          <span className="status-code">({response.statusCode})</span>
        </div>
      ))}
    </div>
  );
}
```

## CSS Classes

The component automatically applies these CSS classes:

```css
/* Success styling */
.ihub-text-success {
  color: #16A34A;
}

.text-green-600 {
  color: rgb(22 163 74);
}

/* Error styling */
.ihub-text-danger {
  color: #DC2626;
}

.text-red-600 {
  color: rgb(220 38 38);
}
```

## Dependencies

This component requires Material-UI icons:

```bash
npm install @mui/icons-material
```

## TypeScript

The component is fully typed:

```tsx
declare function GetSuccessFailedIcon(success: boolean): JSX.Element;
```

## Best Practices

1. **Use for Simple Success/Fail Indicators**: This component is ideal for basic binary status displays
2. **Consider StatusIcon for More Complex Cases**: Use StatusIcon when you need more than just success/fail states
3. **Consistent Usage**: Use the same component throughout your application for consistency
4. **Accessibility**: Ensure proper context is provided for screen readers when using these icons

## Limitations

- **Fixed Styling**: Cannot customize colors or sizes
- **Binary States Only**: Only supports success/fail, not warning, info, etc.
- **No Interactivity**: No click handlers or keyboard navigation
- **No Animation**: Static icons with no loading or transition effects

For these advanced features, please use the `StatusIcon` component instead.