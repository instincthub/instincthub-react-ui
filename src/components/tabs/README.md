# InstinctHub Tabs Components

A modern, flexible, and accessible tab system for InstinctHub applications, built with React and TypeScript. These components provide both horizontal and vertical tab layouts with multiple styling variants.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Horizontal Tabs](#horizontal-tabs)
  - [Tabs Props](#tabs-props)
  - [Vertical Tabs](#vertical-tabs)
  - [VerticalTabs Props](#verticaltabs-props)
- [Styling](#styling)
  - [Horizontal Tab Variants](#horizontal-tab-variants)
  - [Responsive Behavior](#responsive-behavior)
- [Accessibility](#accessibility)
- [Examples](#examples)
- [License](#license)

## Features

- **Multiple variants**: Default, Bordered, and Pills styling
- **Vertical tabs**: For side navigation patterns
- **Responsive design**: Adapts to different screen sizes
- **Fully typed**: Built with TypeScript for type safety
- **Accessibility support**: Keyboard navigation and ARIA attributes
- **Icon support**: For vertical tabs
- **Disabled state**: For tabs that are not available
- **Customizable**: Through CSS classes and props

## Installation

1. Copy the component files to your project:

   - `Tabs.tsx` for horizontal tabs
   - `VerticalTabs.tsx` for vertical tabs
   - `tabs.css` for styling

2. Import the CSS into your application's main CSS file or component:

```css
@import "./tabs.css";
```

## Usage

### Horizontal Tabs

```tsx
import React, { useState } from "react";
import Tabs from "@/components/ui/Tabs";

const MyTabsComponent = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Additional logic here
  };

  const tabItems = [
    {
      id: "tab1",
      label: "First Tab",
      content: <div>Content for the first tab</div>,
    },
    {
      id: "tab2",
      label: "Second Tab",
      content: <div>Content for the second tab</div>,
    },
    {
      id: "tab3",
      label: "Disabled Tab",
      disabled: true,
      content: <div>Content for the disabled tab</div>,
    },
  ];

  return (
    <Tabs
      items={tabItems}
      defaultActiveTab={activeTab}
      onChange={handleTabChange}
      variant="default" // or "bordered" or "pills"
    />
  );
};
```

### Tabs Props

| Prop                     | Type                                 | Default        | Description                                      |
| ------------------------ | ------------------------------------ | -------------- | ------------------------------------------------ |
| `items`                  | `TabItem[]`                          | Required       | Array of tab items                               |
| `defaultActiveTab`       | `string`                             | First tab's ID | ID of the tab to be active initially             |
| `onChange`               | `(tabId: string) => void`            | -              | Callback function when tab is changed            |
| `variant`                | `"default" \| "bordered" \| "pills"` | `"default"`    | Visual style of tabs                             |
| `className`              | `string`                             | `""`           | Additional classes for the main container        |
| `tabsContainerClassName` | `string`                             | `""`           | Additional classes for the tabs header container |
| `contentClassName`       | `string`                             | `""`           | Additional classes for the content container     |

#### TabItem Interface

```typescript
interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}
```

### Vertical Tabs

```tsx
import React from "react";
import VerticalTabs from "@/components/ui/VerticalTabs";
import { User, Settings, HelpCircle } from "lucide-react";

const MyVerticalTabsComponent = () => {
  const tabItems = [
    {
      id: "profile",
      label: "Profile",
      icon: <User size={18} />,
      content: <div>Profile content</div>,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={18} />,
      content: <div>Settings content</div>,
    },
    {
      id: "help",
      label: "Help",
      icon: <HelpCircle size={18} />,
      disabled: true,
      content: <div>Help content</div>,
    },
  ];

  return <VerticalTabs items={tabItems} defaultActiveTab="profile" />;
};
```

### VerticalTabs Props

| Prop                     | Type                      | Default        | Description                                       |
| ------------------------ | ------------------------- | -------------- | ------------------------------------------------- |
| `items`                  | `VerticalTabItem[]`       | Required       | Array of tab items                                |
| `defaultActiveTab`       | `string`                  | First tab's ID | ID of the tab to be active initially              |
| `onChange`               | `(tabId: string) => void` | -              | Callback function when tab is changed             |
| `className`              | `string`                  | `""`           | Additional classes for the main container         |
| `tabsContainerClassName` | `string`                  | `""`           | Additional classes for the tabs sidebar container |
| `contentClassName`       | `string`                  | `""`           | Additional classes for the content container      |

#### VerticalTabItem Interface

```typescript
interface VerticalTabItem {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}
```

## Styling

The tabs use InstinctHub's CSS styling patterns with the `ihub-` prefix for all class names. The styling includes:

- Colors from InstinctHub's color palette
- Font family from InstinctHub's typography system
- Animation for smooth transitions
- Responsive layouts for different screen sizes

### Horizontal Tab Variants

1. **Default Variant**:

   - Clean tabs with an underline indicator for the active tab
   - Gradient underline that matches InstinctHub's branding

2. **Bordered Variant**:

   - Tabs with borders that look like file folder tabs
   - Active tab appears connected to the content below

3. **Pills Variant**:
   - Pill-shaped tabs with background color
   - Active tab has a solid background color for emphasis

### Responsive Behavior

- **Horizontal Tabs**: On small screens, tabs will scroll horizontally if they don't fit
- **Vertical Tabs**: On small screens, the tabs switch from a sidebar layout to a horizontal scrolling layout above the content

## Accessibility

- Proper keyboard navigation (`Tab` key)
- ARIA attributes for screen readers
- Focus states for keyboard users
- Disabled states properly handled

## Examples

See the example files for full implementation:

- `TabsExample.tsx` for horizontal tabs
- `VerticalTabsExample.tsx` for vertical tabs
