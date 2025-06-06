# Create Button Component

A modern, TypeScript-ready React component for handling create actions with URL search parameter support and fallback functionality.

## Features

- **URL Search Parameter Integration**: Automatically updates URL with search parameters using Next.js router
- **Fallback Function Support**: Executes callback function when no search parameters provided
- **Multiple Variants**: Important, primary, outlined, and danger styling options
- **Loading States**: Built-in spinner and loading text
- **Size Options**: Small, medium, and large button sizes
- **Animation Effects**: Smooth hover animations with arrow indicators
- **TypeScript Support**: Full type safety and IntelliSense
- **Accessibility**: Proper ARIA attributes and keyboard navigation

## Installation

```bash
npm install next react
```

## Props Interface

```typescript
interface CreateButtonProps {
  label?: string;
  searchParam?: {
    key: string;
    value: string;
  };
  onClick?: () => void;
  variant?: "primary" | "outlined" | "important" | "danger";
  disabled?: boolean;
  className?: string;
  size?: "small" | "medium" | "large";
  loading?: boolean;
  icon?: React.ReactNode;
  animated?: boolean;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}
```

## Basic Usage

### With Search Parameters

Updates the current URL with the specified search parameter:

```tsx
import CreateButton from "./CreateButton";

function MyComponent() {
  return (
    <CreateButton
      label="Create Course"
      searchParam={{ key: "create", value: "course" }}
      variant="important"
    />
  );
}
```

**Result**: Navigates to `current-url?create=course`

### With Fallback Function

Executes the provided function when no search parameters are specified:

```tsx
function MyComponent() {
  const handleCreate = () => {
    console.log("Create action triggered!");
    // Your custom logic here
  };

  return (
    <CreateButton
      label="Create Project"
      onClick={handleCreate}
      variant="primary"
    />
  );
}
```

## Advanced Examples

### Loading State

```tsx
function MyComponent() {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    setIsCreating(true);
    try {
      await createResource();
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <CreateButton
      label="Create Resource"
      onClick={handleCreate}
      loading={isCreating}
      variant="important"
    />
  );
}
```

### With Icon

```tsx
import { Plus } from "lucide-react";

function MyComponent() {
  return (
    <CreateButton
      label="Add New Item"
      icon={<Plus size={16} />}
      searchParam={{ key: "action", value: "add" }}
      variant="primary"
    />
  );
}
```

### Different Sizes

```tsx
function MyComponent() {
  return (
    <div>
      <CreateButton label="Small" size="small" onClick={() => {}} />
      <CreateButton label="Medium" size="medium" onClick={() => {}} />
      <CreateButton label="Large" size="large" onClick={() => {}} />
    </div>
  );
}
```

## Styling Variants

### Important (Default)

Primary action button with cyan background:

```tsx
<CreateButton variant="important" />
```

### Primary

Secondary action button with gunmetal background:

```tsx
<CreateButton variant="primary" />
```

### Outlined

Border-only button with transparent background:

```tsx
<CreateButton variant="outlined" />
```

### Danger

Warning/destructive action button with red background:

```tsx
<CreateButton variant="danger" />
```

## URL Parameter Behavior

The component uses Next.js `useRouter` and `useSearchParams` hooks to manage URL state:

1. **Parameter Addition**: Adds or updates the specified search parameter
2. **Existing Parameters**: Preserves other existing URL parameters
3. **Browser History**: Uses `router.replace()` to avoid cluttering browser history
4. **Client-Side Navigation**: Performs navigation without page refresh

### Example URL Transformations

| Current URL                | Search Param                        | Result URL                                |
| -------------------------- | ----------------------------------- | ----------------------------------------- |
| `/dashboard`               | `{key: "create", value: "course"}`  | `/dashboard?create=course`                |
| `/dashboard?filter=active` | `{key: "create", value: "project"}` | `/dashboard?filter=active&create=project` |
| `/dashboard?create=old`    | `{key: "create", value: "new"}`     | `/dashboard?create=new`                   |

## Accessibility

The component includes proper accessibility features:

- **Keyboard Navigation**: Full keyboard support with tab and enter
- **Screen Readers**: Descriptive button text and ARIA attributes
- **Focus Management**: Clear focus indicators and states
- **Disabled States**: Proper disabled styling and behavior

## Performance Considerations

- **Memoization**: Component props are efficiently typed to prevent unnecessary re-renders
- **Event Handlers**: Optimized click handling with early returns for disabled states
- **Router Usage**: Efficient Next.js router integration without memory leaks

## Browser Support

- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Next.js Requirements**: Next.js 13+ with App Router
- **React Version**: React 18+

## Troubleshooting

### Common Issues

**Button not updating URL:**

- Ensure you're using Next.js App Router (not Pages Router)
- Verify `searchParam` prop has both `key` and `value`
- Check that component is client-side (`"use client"` directive)

**Styling not applied:**

- Confirm CSS styles are imported in your application
- Verify CSS class names match the `ihub-` prefix convention
- Check for CSS specificity conflicts

**TypeScript errors:**

- Ensure Next.js types are installed: `npm install @types/node`
- Verify React types: `npm install @types/react @types/react-dom`

## Contributing

When contributing to this component:

1. **Type Safety**: Maintain strict TypeScript typing
2. **CSS Conventions**: Use `ihub-` prefix for all CSS classes
3. **Testing**: Include unit tests for all new features
4. **Documentation**: Update this README for any new props or behaviors
5. **Accessibility**: Ensure all changes maintain accessibility standards

## License

This component is part of the InstinctHub design system and follows the project's licensing terms.
