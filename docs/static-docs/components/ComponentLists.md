# ComponentLists Component

A comprehensive, searchable directory component that displays all available components in the InstinctHub React UI library with organized categories and quick access links.

## Features

- **Comprehensive Component Directory**: Lists all available components with descriptions
- **Search Functionality**: Search by component name, description, or category
- **Category Filtering**: Filter components by category (Forms, Auth, UI, etc.)
- **Quick Access Links**: Direct links to repository, examples, and live demos
- **Copy to Clipboard**: One-click copying of repository and example links
- **Responsive Design**: Works well on all device sizes
- **Real-time Filtering**: Instant results as you type

## Installation

```bash
npm install @instincthub/react-ui
```

## Usage

### Basic Usage

```tsx
import { ComponentLists } from '@instincthub/react-ui';

function ComponentDirectory() {
  return (
    <div>
      <ComponentLists />
    </div>
  );
}
```

### In Documentation Site

```tsx
import { ComponentLists } from '@instincthub/react-ui';

function DocsPage() {
  return (
    <div className="docs-container">
      <header>
        <h1>Component Library</h1>
        <p>Browse all available components</p>
      </header>
      <ComponentLists />
    </div>
  );
}
```

### Custom Container

```tsx
import { ComponentLists } from '@instincthub/react-ui';

function CustomComponentDirectory() {
  return (
    <div className="my-custom-container">
      <div className="header-section">
        <h1>Our UI Components</h1>
        <p>Discover the power of our component library</p>
      </div>
      <ComponentLists />
    </div>
  );
}
```

## Props

This component doesn't accept any props - it's a self-contained component with all data included.

## Component Structure

The component displays information about each component including:

### Component Information
- **Name**: Component display name
- **Description**: Brief description of functionality
- **Category**: Organizational category (Forms, Auth, UI, etc.)
- **Repository Path**: Direct path to source code
- **Example Path**: Path to documentation and examples
- **Live Demo URL**: Link to working demonstration (when available)

### Categories

The component organizes components into these categories:

- **Forms**: Input fields, dropdowns, file uploads, validation components
- **Auth**: Authentication, authorization, and user management components  
- **UI**: General user interface components like cards, modals, tables
- **Navbar**: Navigation components including breadcrumbs and menus
- **Theme**: Theming, dark mode, and styling components
- **Status**: Error states, loading indicators, notifications
- **Tabs**: Tab navigation and content switching components
- **Cursors**: Custom cursor effects and interactions
- **Library**: Integration components for external services

## Features in Detail

### Search Functionality

```tsx
// The component includes a search input that filters by:
// - Component name
// - Component description  
// - Category name

// Example searches:
// "date" -> Shows DateInput, DateTimeInput, DateTimePicker
// "form" -> Shows all form-related components
// "modal" -> Shows modal and dialog components
```

### Category Filtering

```tsx
// Users can select from a dropdown to filter by category:
// - "All Categories" (default)
// - "Forms" 
// - "Auth"
// - "UI"
// - etc.
```

### Copy to Clipboard

```tsx
// Each component card includes copy buttons for:
// - Repository link
// - Example/documentation link  
// - Live demo link (when available)

// Visual feedback shows checkmark when copied
// Automatic reset after 2 seconds
```

## Component Data Structure

```tsx
interface ComponentInfo {
  name: string;                    // Display name
  description: string;             // Brief description
  category: string;                // Category for grouping
  repo_path: string;               // Path to source code
  example_path: string;            // Path to documentation
  visual_demo_url?: string;        // Optional live demo URL
}
```

## Styling Classes

The component uses these CSS classes for styling:

```css
.ihub-component-lists              /* Main container */
.ihub-component-lists-title        /* Main title */
.ihub-component-lists-description  /* Subtitle description */
.ihub-search-container             /* Search and filter section */
.ihub-search-input                 /* Search text input */
.ihub-category-filter              /* Category dropdown */
.ihub-search-results-info          /* Results count display */
.ihub-component-category           /* Category section */
.ihub-component-category-title     /* Category heading */
.ihub-component-grid               /* Grid layout for cards */
.ihub-component-card               /* Individual component card */
.ihub-component-name               /* Component name heading */
.ihub-component-description        /* Component description */
.ihub-component-links              /* Links container */
.ihub-component-link               /* Individual link */
.ihub-demo-link                    /* Live demo link styling */
.ihub-copy-btn                     /* Copy button */
.ihub-link-group                   /* Link group container */
.ihub-no-results                   /* Empty state message */
.ihub-clear-search-btn             /* Clear filters button */
```

## Examples in Different Contexts

### Developer Documentation Portal

```tsx
import { ComponentLists } from '@instincthub/react-ui';

function DeveloperPortal() {
  return (
    <div className="dev-portal">
      <nav className="sidebar">
        <ul>
          <li><a href="#overview">Overview</a></li>
          <li><a href="#components">Components</a></li>
          <li><a href="#examples">Examples</a></li>
        </ul>
      </nav>
      
      <main className="content">
        <section id="components">
          <ComponentLists />
        </section>
      </main>
    </div>
  );
}
```

### Design System Showcase

```tsx
import { ComponentLists } from '@instincthub/react-ui';

function DesignSystemShowcase() {
  return (
    <div className="design-system">
      <header className="hero-section">
        <h1>InstinctHub Design System</h1>
        <p>Production-ready React components for modern web applications</p>
      </header>
      
      <section className="components-section">
        <ComponentLists />
      </section>
      
      <footer className="footer">
        <p>Built with ❤️ by InstinctHub</p>
      </footer>
    </div>
  );
}
```

### Internal Component Browser

```tsx
import { ComponentLists } from '@instincthub/react-ui';

function InternalComponentBrowser() {
  return (
    <div className="internal-browser">
      <div className="toolbar">
        <h2>Component Browser</h2>
        <div className="actions">
          <button>Export List</button>
          <button>Generate Report</button>
        </div>
      </div>
      
      <div className="browser-content">
        <ComponentLists />
      </div>
    </div>
  );
}
```

## Search and Filter Examples

### Common Search Queries

```tsx
// Search for input components
"input" → InputText, InputNumber, InputAmount, InputTextarea, etc.

// Search for date-related components  
"date" → DateInput, DateTimeInput, DateTimePicker, DateInputPicker

// Search for table components
"table" → IHubTable, IHubTableServer, THeadSortBtn, Tables

// Search for modal components
"modal" → Dialog, ModalWrapper, ModalExamples, MultiPurposeModal

// Search for authentication
"auth" → All components in Auth category

// Search for upload functionality
"upload" → FileUploader, IhubFileUploader, DropFile
```

### Category Filtering

```tsx
// Show only form components
Category: "Forms" → All input fields, dropdowns, validation components

// Show only UI components  
Category: "UI" → Cards, badges, dialogs, tables, pagination

// Show only auth components
Category: "Auth" → Login, signup, permissions, client detection
```

## Responsive Behavior

- **Desktop**: Full grid layout with multiple columns
- **Tablet**: Reduced columns, maintained functionality
- **Mobile**: Single column layout, optimized touch targets

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **High Contrast**: Works well with high contrast modes
- **Focus Management**: Clear focus indicators throughout

## Performance

- **Memoized Filtering**: Efficient search and category filtering
- **Virtualization Ready**: Can be enhanced with virtual scrolling for very large lists
- **Lazy Loading**: Demo links load external content only when clicked
- **Optimized Rendering**: React.memo and useMemo for performance

## Best Practices

1. **Include in Documentation Sites**: Perfect for developer documentation portals
2. **Regular Updates**: Keep the component data synchronized with actual components
3. **Custom Styling**: Override CSS classes to match your design system
4. **Analytics**: Track which components are most viewed/copied
5. **Feedback Integration**: Allow users to rate or comment on components

## Integration with Build Tools

```tsx
// The component list can be automatically generated from your build process
// Example with a script that scans your components directory:

import { generateComponentList } from './scripts/generate-components';

// This could update the components array automatically
const components = generateComponentList('./src/components');
```

## Future Enhancements

- **Sorting Options**: Sort by name, category, popularity
- **Favorites**: Allow users to bookmark frequently used components
- **Advanced Filters**: Filter by props, dependencies, complexity
- **Usage Analytics**: Show component usage statistics
- **Interactive Previews**: Embedded component previews
- **Export Options**: Export filtered lists as JSON, CSV, etc.

## Dependencies

This component uses:
- `lucide-react` for icons (Copy and Check icons)
- React hooks (useState, useMemo) for state management
- No external styling dependencies (uses CSS classes)

The component is self-contained and includes all necessary data internally.