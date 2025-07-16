# @instincthub/react-ui-docs

**Offline Documentation Package for InstinctHub React UI Components**

This package provides comprehensive offline access to InstinctHub React UI component documentation, metadata, and styling information. It serves as a complete replacement for the MCP server when it's not available (e.g., WSL compatibility issues).

## 🚀 Quick Start

```bash
npm install @instincthub/react-ui-docs
```

```javascript
const { searchComponents, getComponent, getStyleGuide } = require('@instincthub/react-ui-docs');

// Search for components
const buttons = searchComponents('button', { limit: 5 });

// Get specific component info
const submitButton = getComponent('SubmitButton');

// Get styling information
const styleGuide = getStyleGuide();
```

## 📦 What's Included

- **125 React Components** with detailed metadata
- **10 Component Categories** (Forms, UI, Auth, Navbar, etc.)
- **70 CSS Files** (core styles, utilities, component-specific)
- **47 CSS Variables** for theming and customization
- **Code Generation** templates and usage examples
- **Search & Recommendation** system
- **TypeScript Definitions** for all APIs

## 🔍 Core Features

### Component Discovery
```javascript
const { searchComponents, getComponents, getCategories } = require('@instincthub/react-ui-docs');

// Search components by name, description, or tags
const results = searchComponents('input', { 
  category: 'Forms', 
  limit: 10 
});

// Get all components in a category
const formComponents = getComponents().filter(c => c.category === 'Forms');

// Browse categories
const categories = getCategories();
```

### Component Information
```javascript
const { getComponent, getComponentDocs, generateUsageExample } = require('@instincthub/react-ui-docs');

// Get component metadata
const component = getComponent('InputText');
console.log(component.description, component.tags, component.category);

// Get full markdown documentation
const docs = getComponentDocs('InputText');

// Generate usage examples
const example = generateUsageExample('InputText');
console.log(example.complete); // Full React component code
```

### Styling & CSS
```javascript
const { 
  getStyleFiles, 
  getCSSVariables, 
  getUtilityClasses,
  getStyleGuide,
  getComponentStyleRequirements 
} = require('@instincthub/react-ui-docs');

// Get all available CSS files
const cssFiles = getStyleFiles(); // ['root.css', 'main.css', 'forms.css', ...]

// Extract CSS custom properties
const variables = getCSSVariables();
console.log(variables['--DarkCyan']); // #00838f

// Get Bootstrap-style utility classes
const utilities = getUtilityClasses(); // ['ihub-d-flex', 'ihub-m-3', ...]

// Get comprehensive style guide
const guide = getStyleGuide();

// Get required CSS for specific component
const styles = getComponentStyleRequirements('SubmitButton');
```

### Smart Recommendations
```javascript
const { getRecommendations } = require('@instincthub/react-ui-docs');

// Get component suggestions based on description
const recommended = getRecommendations('I need to build a login form', {
  limit: 5,
  category: 'Forms'
});
```

## 🎯 Use Cases

### 1. **Claude Code Integration**
Perfect for AI assistants that need component knowledge:

```javascript
// AI can search and recommend components
const loginComponents = searchComponents('login');
const formRecommendations = getRecommendations('user authentication form');
```

### 2. **Developer Tools & IDEs**
Build autocomplete, documentation viewers, and code generators:

```javascript
// IDE extension: show component info on hover
const componentInfo = getComponent(hoveredComponentName);

// Code generator: create templates
const template = generateUsageExample('DataTable', 'react');
```

### 3. **Documentation Sites**
Generate documentation websites and component browsers:

```javascript
// Build component catalog
const allComponents = getComponents();
const categorizedComponents = getCategories();
```

### 4. **Build Tools & Linters**
Validate component usage and suggest alternatives:

```javascript
// Check if component exists
const isValid = getComponent(importedComponent) !== undefined;

// Suggest similar components
const alternatives = searchComponents(typoComponentName);
```

## 📚 Integration Examples

### Next.js Project
```javascript
// pages/api/components.js
import { searchComponents, getComponent } from '@instincthub/react-ui-docs';

export default function handler(req, res) {
  const { q, component } = req.query;
  
  if (component) {
    const comp = getComponent(component);
    res.json(comp);
  } else if (q) {
    const results = searchComponents(q);
    res.json(results);
  }
}
```

### React DevTools Extension
```javascript
// content-script.js
import { getComponent, getComponentDocs } from '@instincthub/react-ui-docs';

// Show component info in devtools panel
function showComponentInfo(componentName) {
  const info = getComponent(componentName);
  const docs = getComponentDocs(componentName);
  
  panel.innerHTML = `
    <h3>${info.name}</h3>
    <p>${info.description}</p>
    <div class="docs">${docs}</div>
  `;
}
```

### VSCode Extension
```javascript
// extension.js
const vscode = require('vscode');
const { searchComponents, generateUsageExample } = require('@instincthub/react-ui-docs');

function provideCompletionItems(document, position) {
  const results = searchComponents('button');
  
  return results.map(component => {
    const item = new vscode.CompletionItem(component.name);
    const example = generateUsageExample(component.name);
    item.insertText = new vscode.SnippetString(example.usage);
    return item;
  });
}
```

## 🎨 CSS Integration

### Import Core Styles
```javascript
// Import in your main app file
import '@instincthub/react-ui-docs/styles/root.css';              // CSS variables
import '@instincthub/react-ui-docs/styles/main.css';              // Typography
import '@instincthub/react-ui-docs/styles/tag-only-selectors.css'; // Global tags
import '@instincthub/react-ui-docs/styles/bootstrap/style.css';   // Utilities
```

### Dynamic Style Loading
```javascript
const { getComponentStyleRequirements, getStyleContent } = require('@instincthub/react-ui-docs');

// Get required CSS for a component
const styles = getComponentStyleRequirements('DataTable');

// Load CSS content dynamically
styles.required.forEach(filename => {
  const css = getStyleContent(filename);
  // Inject CSS into page
});
```

### Theme Customization
```javascript
const { getCSSVariables } = require('@instincthub/react-ui-docs');

// Get all CSS variables for theming
const variables = getCSSVariables();

// Apply custom theme
const customTheme = `
:root {
  ${Object.entries(variables).map(([name, value]) => 
    `${name}: ${customValues[name] || value};`
  ).join('\n')}
}
`;
```

## 🔧 Advanced Usage

### Custom Search Engine
```javascript
const { getComponents } = require('@instincthub/react-ui-docs');

class ComponentSearchEngine {
  constructor() {
    this.components = getComponents();
    this.buildIndex();
  }
  
  buildIndex() {
    // Build search index for fuzzy matching
    this.searchIndex = this.components.map(component => ({
      ...component,
      searchTerms: [
        component.name.toLowerCase(),
        component.description.toLowerCase(),
        ...(component.tags || []).map(tag => tag.toLowerCase())
      ]
    }));
  }
  
  search(query, options = {}) {
    // Implement fuzzy search, ranking, filtering
    return this.searchIndex.filter(component => 
      component.searchTerms.some(term => term.includes(query.toLowerCase()))
    );
  }
}
```

### Component Dependency Analysis
```javascript
const { getComponents } = require('@instincthub/react-ui-docs');

function analyzeComponentDependencies() {
  const components = getComponents();
  
  return components.map(component => ({
    name: component.name,
    category: component.category,
    relatedComponents: components.filter(c => 
      c.category === component.category && c.name !== component.name
    ).map(c => c.name),
    cssRequirements: getComponentStyleRequirements(component.name).required
  }));
}
```

## 📖 API Reference

### Core Functions

| Function | Description | Returns |
|----------|-------------|---------|
| `getComponents()` | Get all components | `ComponentInfo[]` |
| `getComponent(name)` | Get specific component | `ComponentInfo \| undefined` |
| `getCategories()` | Get all categories | `ComponentCategory[]` |
| `searchComponents(query, options)` | Search components | `ComponentInfo[]` |
| `getRecommendations(description, options)` | Get recommendations | `ComponentInfo[]` |
| `generateUsageExample(name, framework)` | Generate code example | `UsageExample` |
| `getSummary()` | Get package statistics | `Summary` |

### Documentation Functions

| Function | Description | Returns |
|----------|-------------|---------|
| `getComponentDocs(name)` | Get component markdown | `string` |
| `getCategoryDocs(name)` | Get category markdown | `string` |
| `getMainDocs()` | Get main documentation | `string` |

### CSS/Styling Functions

| Function | Description | Returns |
|----------|-------------|---------|
| `getStyleFiles()` | List all CSS files | `string[]` |
| `getStyleContent(filename)` | Get CSS file content | `string` |
| `getCSSVariables()` | Extract CSS variables | `Record<string, string>` |
| `getUtilityClasses()` | Get utility classes | `string[]` |
| `getStyleGuide()` | Get complete style guide | `StyleGuide` |
| `getComponentStyleRequirements(name)` | Get required CSS for component | `ComponentStyleRequirements` |

## 🔍 Search Utilities

```javascript
const { fuzzySearch, searchByTags, advancedSearch, getSuggestions } = require('@instincthub/react-ui-docs/search');

// Fuzzy search with typo tolerance
const fuzzyResults = fuzzySearch('sbmt bttn', 0.3); // Find "SubmitButton"

// Search by tags
const formComponents = searchByTags(['form', 'input']);

// Advanced search with multiple criteria
const results = advancedSearch({
  query: 'table',
  category: 'UI',
  type: 'component',
  limit: 5
});

// Get search suggestions
const suggestions = getSuggestions('inp', 3);
```

## 🚀 Performance Tips

- **Lazy Loading**: Component data is loaded on first access
- **Caching**: All data is cached in memory after first load
- **Compact Format**: Use `enhanced-compact.json` for faster loading
- **Selective Imports**: Import only needed functions to reduce bundle size

## 🛠️ Building Custom Tools

### Documentation Generator
```javascript
const { getComponents, getCategories, getComponentDocs } = require('@instincthub/react-ui-docs');

function generateStaticSite() {
  const components = getComponents();
  const categories = getCategories();
  
  // Generate HTML pages for each component
  components.forEach(component => {
    const docs = getComponentDocs(component.name);
    generateHTML(component, docs);
  });
}
```

### Component Validator
```javascript
const { getComponent } = require('@instincthub/react-ui-docs');

function validateImports(sourceCode) {
  const imports = extractImports(sourceCode);
  const invalid = imports.filter(name => !getComponent(name));
  
  return {
    valid: invalid.length === 0,
    invalidComponents: invalid
  };
}
```

## 📄 License

MIT - See package.json for details.

## 🤝 Contributing

This package is auto-generated from the InstinctHub React UI source code. To contribute:

1. Update the main InstinctHub React UI library
2. Run the documentation generators
3. Rebuild this package

## 📞 Support

- **Issues**: Report at InstinctHub React UI repository
- **Documentation**: See `/docs` folder for detailed markdown files
- **Examples**: Check `/test-package.js` for usage examples

---

**💡 Perfect for Claude Code and AI Assistants**

This package provides the complete InstinctHub React UI knowledge base in an offline, searchable format - ideal for AI assistants, development tools, and documentation systems.