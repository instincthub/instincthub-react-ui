# SideNavbar Component

A modern, flexible side navigation component for InstinctHub applications.

## Features

- 🔄 Collapsible/expandable sidebar with smooth animations
- 📱 Mobile-responsive design with touch gestures
- 🌙 Light and dark mode support
- 📊 Support for badges and notifications
- 🔗 Multi-level navigation with groups and nested items
- ⌨️ Keyboard shortcuts for toggling
- 📏 Resizable width (optional)
- 🖱️ Touch gesture support for mobile
- 🔐 Access control for navigation items
- 🧩 Optional footer with user profile and actions
- 🎨 Customizable theming using CSS variables

## Installation

The SideNavbar component is part of the `@instincthub/react-ui` package.

```bash
npm install @instincthub/react-ui
```

## Basic Usage

```tsx
import { SideNavbar } from "@instincthub/react-ui";
import { NavItemType } from "@instincthub/react-ui/types";

// Define your navigation items
const navItems: NavItemType[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
    type: "link",
    href: "/dashboard",
    isActive: true,
  },
  {
    id: "users",
    title: "Users",
    icon: <PersonIcon />,
    type: "group",
    children: [
      {
        id: "all-users",
        title: "All Users",
        type: "link",
        href: "/users",
      },
      {
        id: "add-user",
        title: "Add User",
        type: "link",
        href: "/users/new",
      },
    ],
  },
  // More navigation items...
];

// Use in your component
const YourComponent = () => (
  <SideNavbar
    items={navItems}
    defaultExpanded={true}
    position="left"
    logo={{
      src: "/logo.png",
      miniSrc: "/logo-mini.png",
      alt: "Company Logo",
    }}
  >
    <div>Your main content here</div>
  </SideNavbar>
);
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `NavItemType[]` | Required | Array of navigation items |
| `defaultExpanded` | `boolean` | `true` | Initial expanded state of the sidebar |
| `isExpanded` | `boolean` | - | Controlled expanded state |
| `onExpandedChange` | `(expanded: boolean) => void` | - | Callback when expanded state changes |
| `position` | `"left" \| "right"` | `"left"` | Position of the sidebar |
| `variant` | `"default" \| "compact" \| "mini" \| "overlay"` | `"default"` | Visual variant of the sidebar |
| `expandedWidth` | `number \| string` | `240` | Width when expanded (px or %) |
| `collapsedWidth` | `number \| string` | `64` | Width when collapsed (px or %) |
| `animation` | `"slide" \| "fade" \| "none"` | `"slide"` | Animation type for transitions |
| `darkMode` | `boolean` | `false` | Enable dark mode |
| `children` | `React.ReactNode` | - | Content to render in the main area |

### Styling and Layout Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `""` | Custom CSS class name |
| `contentContainerClassName` | `string` | `""` | Class name for the main content container |
| `positioning` | `{ top?: number \| string; fixed?: boolean; zIndex?: number }` | - | Positioning options |
| `resizable` | `boolean` | `false` | Allow user to resize sidebar width by dragging |
| `maxWidth` | `number \| string` | `400` | Max width for resizable sidebar |
| `minWidth` | `number \| string` | `180` | Min width for resizable sidebar |

### Logo and Footer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | `SideNavLogoProps` | - | Logo configuration |
| `footer` | `SideNavFooterProps` | - | Footer configuration |

### Behavior Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onNavigate` | `(item, event) => void` | - | Callback when navigation occurs |
| `autoCollapseOnMobile` | `boolean` | `true` | Automatically collapse on mobile after navigation |
| `showBackdrop` | `boolean` | `true` | Show backdrop overlay in mobile view |
| `onBackdropClick` | `() => void` | - | Callback for backdrop click |
| `enableTouchGestures` | `boolean` | `true` | Enable touch swipe gestures on mobile |
| `persistState` | `boolean` | `true` | Persist expanded state in localStorage |
| `persistStateKey` | `string` | `"ihub-sidenav-expanded"` | Key for localStorage persistence |
| `lazyRender` | `boolean` | `false` | Render content only when needed (performance) |
| `toggleShortcut` | `string` | - | Keyboard shortcut to toggle sidebar (e.g., "ctrl+b") |

### Tooltip Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tooltip` | `{ enabled: boolean; ... }` | - | Tooltip configuration for collapsed mode |

## Navigation Item Types

The component supports several types of navigation items:

### Link Item

```tsx
const linkItem: NavLinkItem = {
  id: "dashboard",
  title: "Dashboard", 
  type: "link",
  href: "/dashboard",
  icon: <DashboardIcon />,
  isActive: true,
  isExternal: false,
  isDisabled: false,
  hasAccess: () => true,
  badge: {
    content: "New",
    variant: "primary"
  },
  className: "custom-class",
  meta: { custom: "data" }
};
```

### Group Item (with submenu)

```tsx
const groupItem: NavGroupItem = {
  id: "settings",
  title: "Settings",
  type: "group",
  icon: <SettingsIcon />,
  defaultExpanded: false,
  hideGroupTitle: false,
  children: [
    // Array of other NavItems
    {
      id: "profile",
      title: "Profile",
      type: "link",
      href: "/settings/profile"
    },
    {
      id: "preferences",
      title: "Preferences",
      type: "link",
      href: "/settings/preferences"
    }
  ]
};
```

### Button Item

```tsx
const buttonItem: NavButtonItem = {
  id: "logout",
  title: "Logout",
  type: "button",
  icon: <LogoutIcon />,
  onClick: (e) => {
    console.log("Logout clicked");
    // Handle logout logic
  }
};
```

### Divider Item

```tsx
const dividerItem: NavDividerItem = {
  id: "section-divider",
  type: "divider",
  title: "Section Title" // Optional
};
```

## Customization

### Logo

```tsx
const logo = {
  src: "/path/to/logo.png", // Full logo for expanded state
  miniSrc: "/path/to/mini-logo.png", // Mini logo for collapsed state (optional)
  alt: "Company Logo",
  href: "/", // Optional link for logo
  width: 120,
  height: 40
};
```

### Footer

```tsx
const footer = {
  // Show user profile
  showUserProfile: true,
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/path/to/avatar.jpg",
    role: "Administrator"
  },
  
  // Action buttons at the bottom
  actions: [
    {
      id: "logout",
      title: "Logout",
      icon: <LogoutIcon />,
      type: "button",
      onClick: () => console.log("Logout clicked")
    }
  ],
  
  // Custom content
  content: <div>Custom footer content</div>
};
```

## Mobile Behavior

The SideNavbar component automatically adapts to mobile screens:

- On small screens (width ≤ 768px), it defaults to a collapsed state
- When expanded on mobile, a backdrop appears behind the sidebar
- Touch gestures can be used to open/close the sidebar
- Navigation automatically collapses the sidebar on mobile (configurable)

## Styling

The component uses CSS variables from the InstinctHub design system for consistent styling. You can override these variables in your CSS:

```css
:root {
  --DarkCyan: #00838f; /* Primary color */
  --White: #ffffff;
  --Gunmetal: #2c333a; /* Dark color */
  --Gray: #f4f4f4;
  --Danger: #ea5f5e;
  --borderDefault: 1px solid rgba(44, 51, 58, 0.2);
  --lightShadow: 0px 1px 8px rgba(0, 0, 0, 0.1);
}
```

## Accessibility

The SideNavbar component follows accessibility best practices:

- Keyboard navigable: all interactive elements can be accessed via keyboard
- Screen reader friendly: proper ARIA roles and attributes
- Focus management: maintains focus states
- Keyboard shortcuts: Toggle with configurable keyboard shortcut

## Advanced Usage

### Controlled Mode

You can control the expanded state externally:

```tsx
const [isExpanded, setIsExpanded] = useState(true);

      return (
        <div className="special-link">
          <span className="special-icon">⭐</span>
          <Link href={item.href}>{item.title}</Link>
        </div>
      );
    }
    return null; // Let the default rendering handle other items
  }
};

// Use custom renderer
<SideNavbar
  items={navItems}
  renderItem={renderItem}
  // ...other props
/>
```

### Adding Access Control

You can restrict access to navigation items:

```tsx
const hasAdminAccess = () => {
  return userRoles.includes('admin');
};

const navItems = [
  // Regular items...
  {
    id: "admin-panel",
    title: "Admin Panel",
    type: "link",
    href: "/admin",
    icon: <AdminIcon />,
    hasAccess: hasAdminAccess // Only shown to admins
  }
];
```

### Using with Layout Components

```tsx
// In your app layout
const AppLayout = ({ children }) => {
  return (
    <SideNavbar
      items={mainNavItems}
      // ...other props
    >
      <header className="main-header">
        {/* Your top navigation/header */}
      </header>
      
      <main className="main-content">
        {children}
      </main>
      
      <footer className="main-footer">
        {/* Your footer content */}
      </footer>
    </SideNavbar>
  );
};
```

## Examples

### Basic Sidebar

```tsx
<SideNavbar
  items={navItems}
  logo={{ src: "/logo.png", alt: "Logo" }}
/>
```

### Compact Variant with Dark Mode

```tsx
<SideNavbar
  items={navItems}
  variant="compact"
  darkMode={true}
  expandedWidth={200}
/>
```

### Right-Positioned Sidebar with Custom Widths

```tsx
<SideNavbar
  items={navItems}
  position="right"
  expandedWidth={300}
  collapsedWidth={50}
/>
```

### Resizable Sidebar with Limits

```tsx
<SideNavbar
  items={navItems}
  resizable={true}
  minWidth={180}
  maxWidth={400}
/>
```

### Advanced Configuration

```tsx
<SideNavbar
  items={navItems}
  defaultExpanded={false}
  position="left"
  variant="default"
  animation="fade"
  darkMode={userPreferences.darkMode}
  logo={{
    src: "/logo.png",
    miniSrc: "/logo-mini.png",
    alt: "Company Logo",
    href: "/",
  }}
  footer={{
    showUserProfile: true,
    user: currentUser,
    actions: footerActions,
    content: <ThemeSelector />
  }}
  tooltip={{ enabled: true }}
  resizable={true}
  maxWidth={500}
  minWidth={200}
  toggleShortcut="ctrl+b"
  persistState={true}
  autoCollapseOnMobile={true}
  onNavigate={(item, event) => {
    // Custom navigation logic
    analytics.trackNavigation(item.id);
  }}
/>
```

## Best Practices

1. **Keep Navigation Simple**: Limit the depth of nested menus to 2-3 levels for better usability.

2. **Use Meaningful Icons**: Icons help users quickly identify items, especially in collapsed state.

3. **Group Related Items**: Use dividers and groups to organize navigation logically.

4. **Highlight Active State**: Always indicate the current page in the navigation.

5. **Consider Mobile Users**: Test the navigation extensively on mobile devices.

6. **Provide Clear Labels**: Make navigation item titles clear and concise.

7. **Use Badges Sparingly**: Reserve badges for important notifications or status indicators.

8. **Maintain Consistency**: Keep the navigation structure consistent across your application.

## Troubleshooting

### Sidebar doesn't expand/collapse

- Check if you're using controlled mode (`isExpanded` prop) but not handling state changes
- Ensure localStorage is available if using `persistState={true}`

### Navigation items not showing correctly

- Verify the structure of your `items` array
- Check that all required properties for each item type are provided
- Ensure any access control functions don't block visibility

### Mobile issues

- Test with different breakpoints to ensure responsive behavior
- Verify touch gestures work as expected
- Check backdrop click handling

## Notes

- The SideNavbar component requires React 17+ and Next.js 13+ (App Router) for full functionality.
- For typescript projects, import the necessary types from `@instincthub/react-ui/types`.
- The component uses CSS modules and CSS variables for styling.
  <SideNavbar
    items={navItems}
    isExpanded={isExpanded}
    onExpandedChange={setIsExpanded}
    // ...other props
  >
    <div>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        Toggle Sidebar
      </button>
      <p>Main content here</p>
    </div>
  </SideNavbar>
);
```