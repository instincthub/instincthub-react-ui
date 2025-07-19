# ContentViewer

**Category:** UI | **Type:** component

A versatile content viewer component with markdown rendering, file preview, media support, and rich content display capabilities

## 📁 File Location

`src/components/ui/viewer/ContentViewer.tsx`

## 🏷️ Tags

`ui`, `content`, `markdown`, `file-preview`, `media`, `viewer`, `document`

## 📖 Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `content` | `string` | Yes | - | The content to display |
| `contentType` | `string` | No | `"markdown"` | Type of content (markdown, html, text, json) |
| `showToolbar` | `boolean` | No | `true` | Whether to show the toolbar |
| `allowDownload` | `boolean` | No | `false` | Whether to allow content download |
| `fileName` | `string` | No | - | Optional filename for downloads |
| `maxHeight` | `string` | No | `"600px"` | Maximum height before scrolling |
| `showLineNumbers` | `boolean` | No | `false` | Whether to show line numbers for text content |
| `searchable` | `boolean` | No | `true` | Whether content is searchable |
| `printable` | `boolean` | No | `true` | Whether content can be printed |
| `theme` | `string` | No | `"light"` | Display theme (light, dark) |
| `className` | `string` | No | `""` | Additional CSS classes |

## 🎨 CSS Classes

- `ihub-content-viewer` - Main content viewer container
- `ihub-content-toolbar` - Toolbar with actions
- `ihub-content-body` - Content display area
- `ihub-content-search` - Search functionality
- `ihub-content-navigation` - Navigation controls
- `ihub-content-metadata` - Content metadata display

## 🌟 Features

- **Markdown Rendering** - Full markdown support with syntax highlighting
- **File Preview** - Preview various file types (PDF, images, text)
- **Media Support** - Images, videos, audio files
- **Search Functionality** - Find and highlight text
- **Download Support** - Export content in various formats
- **Print Support** - Print-optimized layouts
- **Responsive Design** - Works on all screen sizes
- **Zoom Controls** - Zoom in/out for better readability

```tsx
"use client";
import React, { useState, useCallback, useMemo } from "react";
import { ContentViewer, InputText, Dropdown, Dialog } from "@instincthub/react-ui";

/**
 * Comprehensive ContentViewer examples demonstrating various use cases
 */
const ContentViewerExamples = () => {
  const [selectedContent, setSelectedContent] = useState("markdown");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState("");
  const [currentTheme, setCurrentTheme] = useState("light");

  // Sample content for different types
  const contentExamples = {
    markdown: `# Advanced Markdown Content

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Code Examples](#code-examples)
- [Images and Media](#images-and-media)
- [Tables](#tables)

## Introduction

This is a comprehensive **markdown document** that showcases the rendering capabilities of the ContentViewer component. It includes various markdown elements like:

- **Bold text**
- *Italic text*
- \`inline code\`
- [Links](https://example.com)
- Lists and more

> **Note:** This is a blockquote to highlight important information.

## Features

The ContentViewer supports:

1. **Syntax highlighting** for code blocks
2. **Table rendering** with proper styling
3. **Image display** with zoom capabilities
4. **Mathematical expressions** (when enabled)
5. **Task lists** with checkboxes

### Task List Example
- [x] Implement basic markdown rendering
- [x] Add syntax highlighting
- [ ] Add LaTeX support
- [ ] Implement collaborative editing

## Code Examples

### JavaScript
\`\`\`javascript
// Advanced JavaScript example
class ContentManager {
  constructor(config) {
    this.config = config;
    this.cache = new Map();
  }

  async loadContent(url) {
    if (this.cache.has(url)) {
      return this.cache.get(url);
    }

    try {
      const response = await fetch(url);
      const content = await response.text();
      this.cache.set(url, content);
      return content;
    } catch (error) {
      console.error('Failed to load content:', error);
      throw error;
    }
  }

  processMarkdown(content) {
    // Process markdown content
    return content.replace(/#{1,6}\\s(.+)/g, (match, title) => {
      const level = match.indexOf(' ');
      return \`<h\${level}>\${title}</h\${level}>\`;
    });
  }
}

const manager = new ContentManager({ cache: true });
\`\`\`

### Python
\`\`\`python
# Python data processing example
import pandas as pd
import numpy as np
from typing import List, Dict, Optional

class DataProcessor:
    def __init__(self, config: Dict):
        self.config = config
        self.data: Optional[pd.DataFrame] = None
    
    def load_data(self, filepath: str) -> pd.DataFrame:
        """Load data from various file formats."""
        if filepath.endswith('.csv'):
            self.data = pd.read_csv(filepath)
        elif filepath.endswith('.json'):
            self.data = pd.read_json(filepath)
        elif filepath.endswith('.xlsx'):
            self.data = pd.read_excel(filepath)
        else:
            raise ValueError(f"Unsupported file format: {filepath}")
        
        return self.data
    
    def clean_data(self) -> pd.DataFrame:
        """Clean and preprocess the data."""
        if self.data is None:
            raise ValueError("No data loaded")
        
        # Remove duplicates
        self.data = self.data.drop_duplicates()
        
        # Handle missing values
        numeric_columns = self.data.select_dtypes(include=[np.number]).columns
        self.data[numeric_columns] = self.data[numeric_columns].fillna(
            self.data[numeric_columns].mean()
        )
        
        return self.data
    
    def generate_report(self) -> Dict:
        """Generate a comprehensive data report."""
        if self.data is None:
            raise ValueError("No data loaded")
        
        return {
            'shape': self.data.shape,
            'columns': list(self.data.columns),
            'missing_values': self.data.isnull().sum().to_dict(),
            'data_types': self.data.dtypes.to_dict(),
            'summary_stats': self.data.describe().to_dict()
        }
\`\`\`

## Images and Media

![Sample Image](https://via.placeholder.com/600x300/4CAF50/white?text=Sample+Content+Image)

*Caption: This is a sample image demonstrating image rendering in markdown.*

## Tables

| Feature | Supported | Notes |
|---------|-----------|-------|
| Markdown | ✅ | Full CommonMark support |
| HTML | ✅ | Sanitized HTML rendering |
| Code Syntax | ✅ | 150+ languages supported |
| Math | ⚡ | LaTeX support (optional) |
| Mermaid | ⚡ | Diagram support (optional) |
| Tables | ✅ | Responsive table rendering |

### Performance Metrics

| Metric | Value | Benchmark |
|--------|-------|-----------|
| Load Time | 2.3s | < 3s |
| Memory Usage | 45MB | < 50MB |
| Bundle Size | 120KB | < 150KB |
| Lighthouse Score | 95 | > 90 |

## Mathematical Expressions

When math support is enabled:

Inline math: $E = mc^2$

Block math:
$$
\\sum_{i=1}^{n} x_i = x_1 + x_2 + \\cdots + x_n
$$

## Conclusion

The ContentViewer component provides a powerful and flexible way to display rich content with excellent performance and user experience.`,

    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Content Example</title>
    <style>
        .highlight { background-color: #fff3cd; padding: 2px 4px; }
        .code-block { background-color: #f8f9fa; padding: 16px; border-radius: 4px; }
        .feature-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
        .feature-card { border: 1px solid #dee2e6; padding: 16px; border-radius: 8px; }
    </style>
</head>
<body>
    <article>
        <header>
            <h1>HTML Content Rendering</h1>
            <p class="highlight">This demonstrates HTML content rendering with embedded styles and interactive elements.</p>
        </header>

        <section>
            <h2>Features Overview</h2>
            <div class="feature-list">
                <div class="feature-card">
                    <h3>🎨 Rich Styling</h3>
                    <p>Support for embedded CSS and styled components.</p>
                </div>
                <div class="feature-card">
                    <h3>📊 Data Display</h3>
                    <p>Tables, lists, and structured data presentation.</p>
                </div>
                <div class="feature-card">
                    <h3>🖼️ Media Support</h3>
                    <p>Images, videos, and other media elements.</p>
                </div>
                <div class="feature-card">
                    <h3>⚡ Interactive Elements</h3>
                    <p>Forms, buttons, and user interaction components.</p>
                </div>
            </div>
        </section>

        <section>
            <h2>Code Example</h2>
            <div class="code-block">
                <pre><code>// JavaScript integration example
function initializeViewer(config) {
    const viewer = new ContentViewer({
        contentType: 'html',
        sanitize: true,
        allowedTags: ['h1', 'h2', 'h3', 'p', 'div', 'span', 'strong', 'em'],
        ...config
    });
    
    return viewer;
}</code></pre>
            </div>
        </section>

        <section>
            <h2>Data Table</h2>
            <table border="1" style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background-color: #f8f9fa;">
                        <th style="padding: 12px;">Component</th>
                        <th style="padding: 12px;">Version</th>
                        <th style="padding: 12px;">Status</th>
                        <th style="padding: 12px;">Last Updated</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 8px;">ContentViewer</td>
                        <td style="padding: 8px;">v2.1.0</td>
                        <td style="padding: 8px; color: green;">✅ Active</td>
                        <td style="padding: 8px;">2024-01-15</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">CodeDisplay</td>
                        <td style="padding: 8px;">v1.8.2</td>
                        <td style="padding: 8px; color: green;">✅ Active</td>
                        <td style="padding: 8px;">2024-01-12</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">Dialog</td>
                        <td style="padding: 8px;">v1.5.1</td>
                        <td style="padding: 8px; color: orange;">⚠️ Deprecated</td>
                        <td style="padding: 8px;">2023-12-20</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section>
            <h2>Interactive Form</h2>
            <form style="max-width: 500px;">
                <div style="margin-bottom: 16px;">
                    <label for="name" style="display: block; margin-bottom: 4px;">Name:</label>
                    <input type="text" id="name" name="name" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                </div>
                <div style="margin-bottom: 16px;">
                    <label for="feedback" style="display: block; margin-bottom: 4px;">Feedback:</label>
                    <textarea id="feedback" name="feedback" rows="4" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"></textarea>
                </div>
                <button type="submit" style="background-color: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">
                    Submit Feedback
                </button>
            </form>
        </section>
    </article>
</body>
</html>`,

    json: `{
  "project": {
    "name": "InstinctHub React UI",
    "version": "2.1.0",
    "description": "A comprehensive React component library",
    "author": {
      "name": "InstinctHub Team",
      "email": "team@instincthub.com",
      "website": "https://instincthub.com"
    },
    "repository": {
      "type": "git",
      "url": "https://github.com/instincthub/react-ui"
    },
    "license": "MIT"
  },
  "components": {
    "forms": [
      {
        "name": "InputText",
        "category": "forms",
        "description": "Customizable text input component",
        "props": {
          "label": { "type": "string", "required": false },
          "placeholder": { "type": "string", "required": false },
          "value": { "type": "string", "required": true },
          "onChange": { "type": "function", "required": true },
          "disabled": { "type": "boolean", "required": false, "default": false },
          "error": { "type": "string", "required": false }
        },
        "examples": [
          "basic-input",
          "validated-input",
          "disabled-input"
        ]
      },
      {
        "name": "DateTimePicker",
        "category": "forms",
        "description": "Date and time selection component",
        "props": {
          "value": { "type": "Date", "required": false },
          "onChange": { "type": "function", "required": true },
          "format": { "type": "string", "required": false, "default": "MM/dd/yyyy HH:mm" },
          "minDate": { "type": "Date", "required": false },
          "maxDate": { "type": "Date", "required": false }
        },
        "examples": [
          "basic-datetime",
          "constrained-datetime",
          "custom-format"
        ]
      }
    ],
    "ui": [
      {
        "name": "Dialog",
        "category": "ui",
        "description": "Modal dialog component",
        "props": {
          "isOpen": { "type": "boolean", "required": true },
          "onClose": { "type": "function", "required": true },
          "title": { "type": "string", "required": true },
          "children": { "type": "ReactNode", "required": true },
          "footer": { "type": "ReactNode", "required": false },
          "maxWidth": { "type": "string", "required": false, "default": "902px" }
        },
        "examples": [
          "basic-dialog",
          "confirmation-dialog",
          "form-dialog"
        ]
      },
      {
        "name": "ContentViewer",
        "category": "ui",
        "description": "Versatile content display component",
        "props": {
          "content": { "type": "string", "required": true },
          "contentType": { "type": "string", "required": false, "default": "markdown" },
          "showToolbar": { "type": "boolean", "required": false, "default": true },
          "searchable": { "type": "boolean", "required": false, "default": true }
        },
        "examples": [
          "markdown-content",
          "html-content",
          "json-viewer"
        ]
      }
    ]
  },
  "features": {
    "theming": {
      "darkMode": true,
      "customThemes": true,
      "cssVariables": true
    },
    "accessibility": {
      "screenReader": true,
      "keyboardNavigation": true,
      "highContrast": true,
      "ariaLabels": true
    },
    "internationalization": {
      "supported": true,
      "languages": ["en", "es", "fr", "de", "zh", "ja"],
      "rtlSupport": true
    },
    "performance": {
      "lazyLoading": true,
      "codesplitting": true,
      "treeshaking": true,
      "bundleSize": "< 150KB"
    }
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "typescript": "^4.9.0",
    "rollup": "^3.0.0",
    "jest": "^29.0.0",
    "testing-library": "^13.0.0"
  },
  "scripts": {
    "build": "rollup -c",
    "test": "jest",
    "lint": "eslint src/",
    "format": "prettier --write src/",
    "docs": "typedoc src/",
    "storybook": "start-storybook -p 6006"
  },
  "publishConfig": {
    "registry": "https://registry.npmjs.org/",
    "access": "public"
  }
}`,

    text: `InstinctHub React UI - Component Library Documentation

TABLE OF CONTENTS
==================
1. Overview
2. Installation
3. Quick Start
4. Core Components
5. Advanced Features
6. Customization
7. Best Practices
8. Troubleshooting
9. Contributing
10. License

1. OVERVIEW
===========
InstinctHub React UI is a comprehensive, enterprise-grade React component library designed to accelerate development while maintaining consistency and accessibility across applications.

Key Features:
- 50+ production-ready components
- TypeScript support out of the box
- Comprehensive accessibility (WCAG 2.1 AA)
- Customizable theming system
- Responsive design by default
- Extensive documentation and examples

2. INSTALLATION
===============
npm install @instincthub/react-ui

# For TypeScript projects
npm install @instincthub/react-ui @types/react @types/react-dom

# Peer dependencies (if not already installed)
npm install react react-dom

3. QUICK START
==============
import React from 'react';
import { InputText, Button, Dialog } from '@instincthub/react-ui';
import '@instincthub/react-ui/dist/style.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');

  return (
    <div>
      <InputText
        label="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      
      <Button
        onClick={() => setIsOpen(true)}
        variant="primary"
      >
        Open Dialog
      </Button>

      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Welcome"
      >
        <p>Hello, {name || 'Guest'}!</p>
      </Dialog>
    </div>
  );
}

4. CORE COMPONENTS
==================

FORMS
-----
- InputText: Text input with validation
- InputTextarea: Multi-line text input
- DateTimePicker: Date and time selection
- DropdownSelect: Dropdown selection
- CheckboxField: Checkbox input
- RadioButton: Radio button groups
- ToggleSwitch: On/off toggle
- FileUploader: File upload component

UI ELEMENTS
-----------
- Button: Customizable buttons
- Dialog: Modal dialogs
- Tabs: Tabbed navigation
- Dropdown: Dropdown menus
- Badge: Status indicators
- Card: Content containers
- Tooltip: Hover information
- Loader: Loading indicators

NAVIGATION
----------
- Breadcrumb: Navigation trail
- Pagination: Page navigation
- SideNavbar: Sidebar navigation
- TopNavbar: Header navigation

DATA DISPLAY
------------
- Table: Data tables with sorting/filtering
- Chart: Data visualization
- CodeDisplay: Syntax-highlighted code
- ContentViewer: Rich content display

5. ADVANCED FEATURES
====================

THEMING
-------
The library supports comprehensive theming through CSS variables:

:root {
  --ihub-primary-color: #007bff;
  --ihub-secondary-color: #6c757d;
  --ihub-success-color: #28a745;
  --ihub-danger-color: #dc3545;
  --ihub-warning-color: #ffc107;
  --ihub-info-color: #17a2b8;
  
  --ihub-font-family: 'Inter', sans-serif;
  --ihub-font-size-base: 16px;
  --ihub-line-height-base: 1.5;
  
  --ihub-border-radius: 8px;
  --ihub-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

DARK MODE
---------
Dark mode is supported through the DarkModeProvider:

import { DarkModeProvider } from '@instincthub/react-ui';

function App() {
  return (
    <DarkModeProvider>
      {/* Your app components */}
    </DarkModeProvider>
  );
}

ACCESSIBILITY
-------------
All components follow WCAG 2.1 AA guidelines:
- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus management

6. CUSTOMIZATION
================

COMPONENT STYLING
-----------------
Components can be customized through:
1. CSS classes
2. Style props
3. Theme variables
4. CSS-in-JS solutions

Example:
<Button
  className="custom-button"
  style={{ backgroundColor: '#custom-color' }}
  variant="primary"
>
  Custom Button
</Button>

CUSTOM THEMES
-------------
Create custom themes by overriding CSS variables:

.dark-theme {
  --ihub-primary-color: #bb86fc;
  --ihub-background-color: #121212;
  --ihub-text-color: #ffffff;
}

7. BEST PRACTICES
=================

PERFORMANCE
-----------
- Import only the components you need
- Use lazy loading for large components
- Implement proper memoization
- Optimize re-renders with React.memo

ACCESSIBILITY
-------------
- Always provide meaningful labels
- Use semantic HTML elements
- Test with screen readers
- Ensure keyboard navigation works
- Maintain proper color contrast

CODE ORGANIZATION
-----------------
- Group related components
- Use TypeScript for better DX
- Follow consistent naming conventions
- Document component usage

8. TROUBLESHOOTING
==================

COMMON ISSUES
-------------
1. Styles not loading
   - Ensure CSS is imported correctly
   - Check for conflicting CSS rules
   - Verify build tool configuration

2. TypeScript errors
   - Update @types packages
   - Check component prop types
   - Ensure proper imports

3. Accessibility warnings
   - Add missing ARIA labels
   - Check keyboard navigation
   - Verify semantic structure

DEBUGGING TIPS
--------------
- Use React DevTools
- Enable accessibility debugging
- Check console for warnings
- Test with different browsers

9. CONTRIBUTING
===============

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Write tests for new features
4. Follow coding standards
5. Submit a pull request

DEVELOPMENT SETUP
-----------------
git clone https://github.com/instincthub/react-ui
cd react-ui
npm install
npm run dev

10. LICENSE
===========
MIT License - see LICENSE file for details.

For more information, visit:
- Documentation: https://docs.instincthub.com/react-ui
- GitHub: https://github.com/instincthub/react-ui
- NPM: https://npmjs.com/package/@instincthub/react-ui
- Support: support@instincthub.com`
  };

  const contentTypes = [
    { value: "markdown", label: "Markdown" },
    { value: "html", label: "HTML" },
    { value: "json", label: "JSON" },
    { value: "text", label: "Plain Text" }
  ];

  const themes = [
    { value: "light", label: "Light Theme" },
    { value: "dark", label: "Dark Theme" }
  ];

  const handleContentTypeChange = useCallback((type: string) => {
    setSelectedContent(type);
  }, []);

  const handlePreview = useCallback((content: string) => {
    setPreviewContent(content);
    setIsPreviewOpen(true);
  }, []);

  const currentContent = useMemo(() => {
    return contentExamples[selectedContent as keyof typeof contentExamples] || contentExamples.markdown;
  }, [selectedContent]);

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>ContentViewer Examples</h1>
      <p className="ihub-mb-5">
        Demonstrating markdown rendering, HTML display, JSON viewing, and various content types with rich features.
      </p>

      {/* Interactive Controls */}
      <section className="ihub-mb-5">
        <h2>Interactive Content Viewer</h2>
        <p>Switch between different content types and themes:</p>
        
        <div className="ihub-row ihub-mb-3">
          <div className="ihub-col-md-4">
            <Dropdown
              label="Content Type"
              value={selectedContent}
              onChange={handleContentTypeChange}
              options={contentTypes}
              placeholder="Select content type..."
            />
          </div>
          <div className="ihub-col-md-4">
            <Dropdown
              label="Theme"
              value={currentTheme}
              onChange={setCurrentTheme}
              options={themes}
              placeholder="Select theme..."
            />
          </div>
          <div className="ihub-col-md-4">
            <InputText
              label="Search Content"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in content..."
            />
          </div>
        </div>

        <ContentViewer
          content={currentContent}
          contentType={selectedContent}
          searchQuery={searchQuery}
          theme={currentTheme}
          showToolbar={true}
          allowDownload={true}
          fileName={`example.${selectedContent === 'markdown' ? 'md' : selectedContent === 'html' ? 'html' : selectedContent === 'json' ? 'json' : 'txt'}`}
          printable={true}
          maxHeight="500px"
        />
      </section>

      {/* Markdown Examples */}
      <section className="ihub-mb-5">
        <h2>Markdown Content Examples</h2>
        
        <div className="ihub-row">
          <div className="ihub-col-lg-6 ihub-mb-4">
            <h3>Basic Markdown</h3>
            <ContentViewer
              content={`# Simple Markdown

This is a **basic markdown** example with:

- *Italic text*
- **Bold text**
- \`inline code\`
- [External link](https://example.com)

## Code Block

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

> This is a blockquote with important information.

### Task List
- [x] Completed task
- [ ] Pending task
- [ ] Future task`}
              contentType="markdown"
              showToolbar={false}
              maxHeight="300px"
            />
          </div>

          <div className="ihub-col-lg-6 ihub-mb-4">
            <h3>Advanced Markdown</h3>
            <ContentViewer
              content={`# Advanced Features

## Data Table

| Component | Status | Version |
|-----------|--------|---------|
| ContentViewer | ✅ Active | v2.1.0 |
| CodeDisplay | ✅ Active | v1.8.2 |
| Dialog | ⚠️ Update | v1.5.1 |

## Syntax Highlighting

\`\`\`typescript
interface ContentProps {
  content: string;
  contentType?: 'markdown' | 'html' | 'json' | 'text';
  theme?: 'light' | 'dark';
}

const ContentViewer: React.FC<ContentProps> = ({ 
  content, 
  contentType = 'markdown',
  theme = 'light' 
}) => {
  return <div className="content-viewer">{content}</div>;
};
\`\`\`

## Mathematical Expression

When enabled: $E = mc^2$

$$\\sum_{i=1}^{n} x_i = \\frac{1}{n}$$`}
              contentType="markdown"
              showToolbar={false}
              maxHeight="300px"
            />
          </div>
        </div>
      </section>

      {/* HTML Content Examples */}
      <section className="ihub-mb-5">
        <h2>HTML Content Examples</h2>
        
        <div className="ihub-row">
          <div className="ihub-col-lg-6 ihub-mb-4">
            <h3>Styled HTML</h3>
            <ContentViewer
              content={`<div style="padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; color: white;">
  <h2 style="margin-top: 0;">Styled Content</h2>
  <p>This HTML content includes inline styles and rich formatting.</p>
  
  <div style="background: rgba(255,255,255,0.1); padding: 16px; border-radius: 8px; margin: 16px 0;">
    <strong>Features:</strong>
    <ul style="margin: 8px 0;">
      <li>✨ Rich styling support</li>
      <li>🎨 Gradient backgrounds</li>
      <li>📱 Responsive design</li>
    </ul>
  </div>
  
  <button style="background: white; color: #667eea; border: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; cursor: pointer;">
    Call to Action
  </button>
</div>`}
              contentType="html"
              showToolbar={false}
              maxHeight="300px"
            />
          </div>

          <div className="ihub-col-lg-6 ihub-mb-4">
            <h3>Data Visualization</h3>
            <ContentViewer
              content={`<div style="font-family: system-ui, sans-serif;">
  <h3 style="color: #333; margin-bottom: 20px;">Performance Dashboard</h3>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin-bottom: 24px;">
    <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 2px solid #28a745;">
      <div style="font-size: 2em; font-weight: bold; color: #28a745;">95%</div>
      <div style="color: #666;">Performance</div>
    </div>
    <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 2px solid #007bff;">
      <div style="font-size: 2em; font-weight: bold; color: #007bff;">2.3s</div>
      <div style="color: #666;">Load Time</div>
    </div>
    <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 2px solid #ffc107;">
      <div style="font-size: 2em; font-weight: bold; color: #ffc107;">45MB</div>
      <div style="color: #666;">Memory</div>
    </div>
  </div>
  
  <div style="background: #f8f9fa; padding: 16px; border-radius: 8px;">
    <strong>Status:</strong> <span style="color: #28a745;">✅ All systems operational</span>
  </div>
</div>`}
              contentType="html"
              showToolbar={false}
              maxHeight="300px"
            />
          </div>
        </div>
      </section>

      {/* JSON Viewer Examples */}
      <section className="ihub-mb-5">
        <h2>JSON Content Examples</h2>
        
        <div className="ihub-row">
          <div className="ihub-col-lg-6 ihub-mb-4">
            <h3>Configuration Object</h3>
            <ContentViewer
              content={`{
  "app": {
    "name": "React App",
    "version": "1.0.0",
    "environment": "production"
  },
  "features": {
    "darkMode": true,
    "analytics": {
      "enabled": true,
      "provider": "google",
      "trackingId": "GA-XXXXXXXX"
    },
    "authentication": {
      "providers": ["google", "github", "email"],
      "sessionTimeout": 3600,
      "twoFactorRequired": false
    }
  },
  "api": {
    "baseUrl": "https://api.example.com",
    "timeout": 5000,
    "retries": 3,
    "endpoints": {
      "users": "/api/v1/users",
      "posts": "/api/v1/posts",
      "auth": "/api/v1/auth"
    }
  }
}`}
              contentType="json"
              showToolbar={false}
              maxHeight="300px"
            />
          </div>

          <div className="ihub-col-lg-6 ihub-mb-4">
            <h3>API Response</h3>
            <ContentViewer
              content={`{
  "status": "success",
  "data": {
    "users": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "role": "admin",
        "createdAt": "2024-01-15T10:30:00Z",
        "isActive": true,
        "preferences": {
          "theme": "dark",
          "notifications": true,
          "language": "en"
        }
      },
      {
        "id": 2,
        "name": "Jane Smith",
        "email": "jane@example.com",
        "role": "user",
        "createdAt": "2024-01-16T14:22:00Z",
        "isActive": true,
        "preferences": {
          "theme": "light",
          "notifications": false,
          "language": "es"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "total": 2,
      "totalPages": 1
    }
  },
  "metadata": {
    "timestamp": "2024-01-19T09:15:30Z",
    "requestId": "req_abc123def456",
    "version": "v1.0"
  }
}`}
              contentType="json"
              showToolbar={false}
              maxHeight="300px"
            />
          </div>
        </div>
      </section>

      {/* Plain Text Examples */}
      <section className="ihub-mb-5">
        <h2>Plain Text Examples</h2>
        
        <div className="ihub-row">
          <div className="ihub-col-lg-6 ihub-mb-4">
            <h3>Log File</h3>
            <ContentViewer
              content={`[2024-01-19 09:15:30] INFO: Application started
[2024-01-19 09:15:31] INFO: Database connection established
[2024-01-19 09:15:32] INFO: Server listening on port 3000
[2024-01-19 09:16:45] DEBUG: User authentication successful
[2024-01-19 09:16:46] INFO: User logged in: john@example.com
[2024-01-19 09:17:12] DEBUG: API request: GET /api/v1/users
[2024-01-19 09:17:13] INFO: API response: 200 OK (127ms)
[2024-01-19 09:18:23] WARN: Rate limit threshold reached for IP 192.168.1.100
[2024-01-19 09:18:24] DEBUG: Request throttled for 60 seconds
[2024-01-19 09:19:45] INFO: Cache invalidated for user preferences
[2024-01-19 09:19:46] DEBUG: Cache rebuild initiated
[2024-01-19 09:19:47] INFO: Cache rebuild completed (1.2s)
[2024-01-19 09:20:12] ERROR: Database connection lost
[2024-01-19 09:20:13] INFO: Attempting database reconnection...
[2024-01-19 09:20:15] INFO: Database reconnection successful
[2024-01-19 09:21:30] INFO: Background job started: email-notifications
[2024-01-19 09:21:31] DEBUG: Processing 15 email notifications
[2024-01-19 09:21:35] INFO: Email notifications sent successfully`}
              contentType="text"
              showLineNumbers={true}
              showToolbar={false}
              maxHeight="300px"
            />
          </div>

          <div className="ihub-col-lg-6 ihub-mb-4">
            <h3>CSV Data</h3>
            <ContentViewer
              content={`Name,Email,Role,Department,Salary,StartDate
John Doe,john.doe@company.com,Senior Developer,Engineering,95000,2022-03-15
Jane Smith,jane.smith@company.com,Product Manager,Product,87000,2021-11-20
Bob Johnson,bob.johnson@company.com,Designer,Design,72000,2023-01-10
Alice Brown,alice.brown@company.com,QA Engineer,Engineering,68000,2022-08-05
Charlie Wilson,charlie.wilson@company.com,DevOps Lead,Engineering,98000,2020-12-01
Diana Martinez,diana.martinez@company.com,UX Researcher,Design,75000,2023-02-14
Edward Taylor,edward.taylor@company.com,Backend Developer,Engineering,82000,2022-06-30
Fiona Davis,fiona.davis@company.com,Marketing Manager,Marketing,79000,2021-09-18
George Clark,george.clark@company.com,Data Scientist,Analytics,91000,2022-01-25
Helen White,helen.white@company.com,HR Manager,Human Resources,73000,2020-10-12`}
              contentType="text"
              showLineNumbers={true}
              showToolbar={false}
              maxHeight="300px"
            />
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="ihub-mb-5">
        <h2>Advanced Features</h2>
        
        <div className="ihub-mb-4">
          <h3>Full-Featured Content Viewer</h3>
          <div className="ihub-d-flex ihub-mb-3" style={{ gap: "12px", flexWrap: "wrap" }}>
            <button 
              className="ihub-primary-btn"
              onClick={() => handlePreview(contentExamples.markdown)}
            >
              Preview Markdown
            </button>
            <button 
              className="ihub-outlined-btn"
              onClick={() => handlePreview(contentExamples.html)}
            >
              Preview HTML
            </button>
            <button 
              className="ihub-outlined-btn"
              onClick={() => handlePreview(contentExamples.json)}
            >
              Preview JSON
            </button>
          </div>

          <ContentViewer
            content={`# ContentViewer Features

## 🔍 Search & Navigation
- **Full-text search** with highlighting
- **Jump to sections** with table of contents
- **Zoom controls** for better readability
- **Print-optimized** layouts

## 📱 Responsive Design
- **Mobile-friendly** interface
- **Touch gestures** support
- **Adaptive toolbar** based on screen size
- **Flexible layouts** for all devices

## ⚡ Performance
- **Lazy loading** for large content
- **Virtual scrolling** for long documents
- **Efficient rendering** with React optimization
- **Memory management** for large files

## 🎨 Customization
- **Theme support** (light/dark)
- **Custom CSS** classes
- **Configurable toolbar** actions
- **Plugin system** for extensions

## 🔧 Developer Features
- **TypeScript** support
- **Comprehensive APIs** for integration
- **Event callbacks** for user interactions
- **Extensible architecture** for custom content types`}
            contentType="markdown"
            showToolbar={true}
            allowDownload={true}
            fileName="features.md"
            searchable={true}
            printable={true}
            maxHeight="400px"
          />
        </div>
      </section>

      {/* Preview Dialog */}
      <Dialog
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title="Content Preview"
        maxWidth="1000px"
        footer={
          <div className="ihub-buttons">
            <button 
              className="ihub-outlined-btn"
              onClick={() => setIsPreviewOpen(false)}
            >
              Close
            </button>
          </div>
        }
      >
        <ContentViewer
          content={previewContent}
          contentType={previewContent.includes('<!DOCTYPE html') ? 'html' : previewContent.startsWith('{') ? 'json' : 'markdown'}
          showToolbar={true}
          allowDownload={true}
          searchable={true}
          maxHeight="500px"
        />
      </Dialog>
    </div>
  );
};

export default ContentViewerExamples;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { ContentViewer } from '@instincthub/react-ui';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { ContentViewer } from '@instincthub/react-ui';

function MyComponent() {
  const markdownContent = `# Hello World
  
This is **markdown** content with *formatting*.

- List item 1
- List item 2
- List item 3`;

  return (
    <ContentViewer
      content={markdownContent}
      contentType="markdown"
      showToolbar={true}
      allowDownload={true}
      fileName="example.md"
    />
  );
}
```

## 🎨 Supported Content Types

- **Markdown** - Full CommonMark support with extensions
- **HTML** - Sanitized HTML rendering with styles
- **JSON** - Pretty-printed JSON with syntax highlighting
- **Plain Text** - Raw text with optional line numbers
- **Code** - Syntax-highlighted code blocks
- **CSV** - Tabular data display
- **XML** - Structured XML content

## 🌟 Key Features

### Content Rendering
- **Markdown to HTML** conversion with syntax highlighting
- **HTML sanitization** for security
- **JSON formatting** with collapsible objects
- **Code syntax highlighting** for 150+ languages

### User Interface
- **Search functionality** with text highlighting
- **Zoom controls** for accessibility
- **Print support** with optimized layouts
- **Download options** in multiple formats

### Accessibility
- **Keyboard navigation** support
- **Screen reader** compatibility
- **High contrast** mode support
- **Focus management** for interactive elements

## ♿ Accessibility Features

- **ARIA Labels** - Proper semantic labeling
- **Keyboard Navigation** - Full keyboard accessibility
- **Screen Reader Support** - Compatible with assistive technology
- **High Contrast** - Supports system high contrast modes
- **Focus Management** - Clear focus indicators and trapping

## 🎯 Use Cases

- **Documentation** - Display markdown documentation with rich formatting
- **API Responses** - View and format JSON API responses
- **Code Review** - Display code with syntax highlighting
- **File Preview** - Preview various file types in applications
- **Content Management** - Rich content display in CMS systems
- **Log Viewing** - Display and search through log files

## 🔗 Related Components

- [CodeDisplay](./CodeDisplay.md) - Specialized code syntax highlighting
- [CustomTextEditor](./CustomTextEditor.md) - Rich text editing capabilities
- [ContentViewOrEdit](./ContentViewOrEdit.md) - Switchable view/edit mode
- [Dialog](./Dialog.md) - Modal dialog for content preview
- [InputTextarea](./InputTextarea.md) - Text area input component