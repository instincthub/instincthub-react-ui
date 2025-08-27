# StatusIcon Component

A versatile status indicator component with multiple icon types and extensive customization options.

## Features

- **9 Status Types**: success, error, warning, info, pending, loading, question, check, close
- **Multiple Sizes**: small, medium, large, inherit
- **Interactive**: Click handlers with keyboard navigation support
- **Customizable**: Custom colors, styles, and CSS classes
- **Animated**: Optional animation for loading/pending states
- **Accessible**: Full ARIA support and keyboard navigation
- **Backward Compatible**: Includes deprecated GetSuccessFailedIcon function

## Installation

```bash
npm install @instincthub/react-ui
```

## Usage

### Basic Usage

```tsx
import { StatusIcon } from '@instincthub/react-ui';

function MyComponent() {
  return (
    <div>
      <StatusIcon status="success" />
      <StatusIcon status="error" />
      <StatusIcon status="warning" />
      <StatusIcon status="info" />
    </div>
  );
}
```

### With Sizes

```tsx
import { StatusIcon } from '@instincthub/react-ui';

function SizeExample() {
  return (
    <div>
      <StatusIcon status="success" size="small" />
      <StatusIcon status="success" size="medium" />
      <StatusIcon status="success" size="large" />
    </div>
  );
}
```

### Interactive Icons

```tsx
import { StatusIcon } from '@instincthub/react-ui';

function InteractiveExample() {
  const handleWarningClick = () => {
    alert('Warning clicked!');
  };

  return (
    <StatusIcon 
      status="warning" 
      onClick={handleWarningClick}
      title="Click for more details"
      size="large"
    />
  );
}
```

### Animated Loading States

```tsx
import { StatusIcon } from '@instincthub/react-ui';

function LoadingExample() {
  return (
    <div>
      <StatusIcon status="loading" animated size="medium" />
      <StatusIcon status="pending" animated size="medium" />
    </div>
  );
}
```

### Custom Styling

```tsx
import { StatusIcon } from '@instincthub/react-ui';

function CustomExample() {
  return (
    <StatusIcon 
      status="info"
      color="#9C27B0"
      className="my-custom-class"
      style={{ fontSize: '2rem' }}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `StatusType` | **required** | Status type to determine which icon to show |
| `size` | `IconSize` | `"small"` | Size of the icon: "small", "medium", "large", "inherit" |
| `className` | `string` | `""` | Custom CSS classes |
| `color` | `string` | - | Custom color override (hex, rgb, css color name) |
| `animated` | `boolean` | `false` | Show animated spinner for loading/pending states |
| `title` | `string` | - | Custom title/tooltip text |
| `onClick` | `() => void` | - | Click handler function |
| `style` | `React.CSSProperties` | - | Custom style object |

## Status Types

| Status | Icon | Default Color | Description |
|--------|------|---------------|-------------|
| `success` | CheckCircle | Green (#4CAF50) | Success/completed state |
| `error` | Error | Red (#F44336) | Error/failed state |
| `warning` | Warning | Orange (#FF9800) | Warning/caution state |
| `info` | Info | Blue (#2196F3) | Information state |
| `pending` | Pending | Orange (#FF5722) | Pending/waiting state |
| `loading` | CircularProgress | Blue (#2196F3) | Loading/processing state |
| `question` | Help | Purple (#9C27B0) | Question/help state |
| `check` | Check | Green (#4CAF50) | Simple check mark |
| `close` | Close | Red (#F44336) | Close/cancel action |

## Size Options

- **small**: Default size, good for inline text
- **medium**: Slightly larger, good for buttons and cards
- **large**: Prominent size for headers and important states
- **inherit**: Inherits font-size from parent element

## Accessibility

The StatusIcon component is fully accessible:

- **ARIA Labels**: Automatic aria-label generation based on status type
- **Keyboard Navigation**: Tab navigation for clickable icons
- **Screen Reader**: Proper role and title attributes
- **Focus Management**: Clear focus indicators for interactive elements

## Backward Compatibility

The deprecated `GetSuccessFailedIcon` function is still available for backward compatibility:

```tsx
import { GetSuccessFailedIcon } from '@instincthub/react-ui';

// This still works but is deprecated
const icon = GetSuccessFailedIcon(true, "medium"); // success icon
const icon2 = GetSuccessFailedIcon(false, "large"); // error icon

// Preferred new approach
<StatusIcon status="success" size="medium" />
<StatusIcon status="error" size="large" />
```

## Examples in Action

### Form Validation

```tsx
import { StatusIcon } from '@instincthub/react-ui';

function FormField({ isValid, isValidating, error }) {
  const getStatus = () => {
    if (isValidating) return "loading";
    if (error) return "error";
    if (isValid) return "success";
    return "info";
  };

  return (
    <div className="form-field">
      <input type="text" />
      <StatusIcon 
        status={getStatus()} 
        animated={isValidating}
        title={error || "Field validation status"}
      />
    </div>
  );
}
```

### Status Dashboard

```tsx
import { StatusIcon } from '@instincthub/react-ui';

function StatusDashboard({ services }) {
  return (
    <div className="service-status">
      {services.map(service => (
        <div key={service.id} className="service-item">
          <span>{service.name}</span>
          <StatusIcon 
            status={service.status} 
            size="medium"
            onClick={() => showServiceDetails(service)}
            title={`${service.name} is ${service.status}`}
          />
        </div>
      ))}
    </div>
  );
}
```

### Interactive Notifications

```tsx
import { StatusIcon } from '@instincthub/react-ui';

function Notification({ type, message, onClose }) {
  return (
    <div className={`notification notification-${type}`}>
      <StatusIcon status={type} size="medium" />
      <span className="message">{message}</span>
      <StatusIcon 
        status="close" 
        size="small"
        onClick={onClose}
        title="Close notification"
        className="close-btn"
      />
    </div>
  );
}
```

## CSS Classes

The component generates several CSS classes for styling:

- `.ihub-status-icon` - Base class for all status icons
- `.ihub-icon-small`, `.ihub-icon-medium`, `.ihub-icon-large` - Size-specific classes
- `.ihub-clickable` - Applied when onClick handler is provided
- `.ihub-animated` - Applied when animated prop is true
- `.ihub-text-success`, `.ihub-text-error`, etc. - Status-specific color classes

## Dependencies

This component requires Material-UI icons:

```bash
npm install @mui/icons-material
```

## TypeScript

Full TypeScript support with exported types:

```tsx
import { StatusIcon, StatusType, IconSize, StatusIconProps } from '@instincthub/react-ui';

const MyStatus: StatusType = "success";
const MySize: IconSize = "large";

const props: StatusIconProps = {
  status: "warning",
  size: "medium",
  onClick: () => console.log("clicked")
};
```