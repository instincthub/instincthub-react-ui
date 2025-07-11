# @instincthub/react-ui-docs

Offline documentation and component discovery package for InstinctHub React UI. This package provides a complete offline solution for accessing component documentation, search functionality, and code examples when the MCP server is not available.

## 🎯 Purpose

This package serves as a workaround for environments where the InstinctHub React UI MCP server cannot run (e.g., WSL issues, network restrictions, or offline development). It provides the same component knowledge and discovery capabilities in a lightweight npm package.

## 📦 Installation

```bash
npm install @instincthub/react-ui-docs
```

## 🚀 Quick Start

```javascript
const { 
  searchComponents, 
  getComponent, 
  getComponentDocs,
  getStyleGuide,
  getCSSVariables 
} = require('@instincthub/react-ui-docs');

// Search for components
const formComponents = searchComponents('input', { category: 'Forms' });
console.log(formComponents);

// Get specific component info
const submitButton = getComponent('SubmitButton');
console.log(submitButton);

// Get component documentation
const docs = getComponentDocs('SubmitButton');
console.log(docs); // Returns markdown documentation

// Get styling information
const styleGuide = getStyleGuide();
const cssVars = getCSSVariables();
console.log('CSS Variables:', cssVars);
```

## 📚 API Reference

### Basic Functions

#### `searchComponents(query, options)`
Search for components by name, description, or tags.

```javascript
const results = searchComponents('button', {
  category: 'Forms',    // Optional: filter by category
  type: 'component',    // Optional: filter by type
  limit: 10            // Optional: limit results (default: 10)
});
```

#### `getComponent(name)`
Get detailed information about a specific component.

```javascript
const component = getComponent('SubmitButton');
// Returns: { name, description, category, repo_path, type, tags }
```

#### `getComponents()`
Get all available components.

```javascript
const allComponents = getComponents();
console.log(`Total components: ${allComponents.length}`);
```

#### `getCategories()`
Get all component categories.

```javascript
const categories = getCategories();
categories.forEach(cat => {
  console.log(`${cat.icon} ${cat.name}: ${cat.count} components`);
});
```

### Documentation Functions

#### `getComponentDocs(componentName)`
Get markdown documentation for a component.

```javascript
const docs = getComponentDocs('SubmitButton');
console.log(docs); // Full markdown documentation
```

#### `getCategoryDocs(categoryName)`
Get documentation for a category.

```javascript
const formsDocs = getCategoryDocs('Forms');
console.log(formsDocs);
```

### AI-Style Functions

#### `getRecommendations(description, options)`
Get component recommendations based on natural language description.

```javascript
const recommendations = getRecommendations(
  'I need to build a user login form with validation',
  { limit: 5, category: 'Forms' }
);
```

#### `generateUsageExample(componentName, framework)`
Generate code examples for components.

```javascript
const example = generateUsageExample('SubmitButton', 'react');
console.log(example.complete);
// Returns: { imports, usage, complete }
```

### CSS & Styling Functions

#### `getStyleFiles()`
Get all available CSS files in the package.

```javascript
const cssFiles = getStyleFiles();
console.log(`Found ${cssFiles.length} CSS files:`, cssFiles);
// Returns: ['root.css', 'main.css', 'forms.css', 'bootstrap/style.css', ...]
```

#### `getStyleContent(filename)`
Get the content of a specific CSS file.

```javascript
const rootCss = getStyleContent('root.css');
console.log('Root CSS variables:', rootCss);
```

#### `getCSSVariables()`
Extract CSS custom properties (variables) from root.css.

```javascript
const variables = getCSSVariables();
console.log('Primary color:', variables['--DarkCyan']); // #00838f
console.log('All variables:', Object.keys(variables));
```

#### `getUtilityClasses()`
Get Bootstrap-style utility classes with ihub- prefix.

```javascript
const utilities = getUtilityClasses();
console.log('Utility classes:', utilities);
// Returns: ['ihub-d-flex', 'ihub-m-3', 'ihub-p-2', ...]
```

#### `getStyleGuide()`
Get comprehensive styling guide with integration examples.

```javascript
const guide = getStyleGuide();
console.log('Core files:', guide.overview.coreFiles);
console.log('Loading order:', guide.overview.loadingOrder);
console.log('Integration examples:', guide.examples);
```

#### `getComponentStyleRequirements(componentName)`
Get required CSS files for a specific component.

```javascript
const styles = getComponentStyleRequirements('SubmitButton');
console.log('Required CSS:', styles.required);
console.log('Loading order:', styles.loadingOrder);
console.log('Example imports:', styles.example);
```

### Advanced Search

```javascript
const { advancedSearch, fuzzySearch, searchByTags } = require('@instincthub/react-ui-docs/search');

// Fuzzy search
const fuzzyResults = fuzzySearch('sbmt bttn'); // Finds "SubmitButton"

// Search by tags
const inputComponents = searchByTags(['input', 'form']);

// Advanced multi-faceted search
const results = advancedSearch({
  query: 'table',
  category: 'UI',
  tags: ['data'],
  fuzzy: true,
  limit: 5
});
```

## 🔍 Usage Examples

### 1. Component Discovery

```javascript
const { searchComponents, getCategories } = require('@instincthub/react-ui-docs');

// Browse by category
const categories = getCategories();
console.log('Available categories:');
categories.forEach(cat => {
  console.log(`  ${cat.icon} ${cat.name} (${cat.count} components)`);
});

// Find form-related components
const formComponents = searchComponents('', { category: 'Forms' });
console.log('\nForm components:');
formComponents.forEach(comp => {
  console.log(`  - ${comp.name}: ${comp.description}`);
});
```

### 2. Building with Recommendations

```javascript
const { getRecommendations, generateUsageExample } = require('@instincthub/react-ui-docs');

// Get recommendations for a feature
const loginComponents = getRecommendations(
  'user authentication with email and password'
);

console.log('Recommended components for login:');
loginComponents.forEach(comp => {
  console.log(`  - ${comp.name}: ${comp.description}`);
  
  // Generate usage example
  const example = generateUsageExample(comp.name);
  console.log(`    Usage: ${example.usage}`);
});
```

### 3. Documentation Access

```javascript
const { getComponentDocs, getComponent } = require('@instincthub/react-ui-docs');

function showComponentHelp(componentName) {
  const component = getComponent(componentName);
  
  if (!component) {
    console.log(`Component "${componentName}" not found`);
    return;
  }
  
  console.log(`\n=== ${component.name} ===`);
  console.log(`Category: ${component.category}`);
  console.log(`Type: ${component.type}`);
  console.log(`Description: ${component.description}`);
  console.log(`Tags: ${component.tags?.join(', ') || 'None'}`);
  
  // Get full documentation
  try {
    const docs = getComponentDocs(componentName);
    console.log('\nDocumentation:');
    console.log(docs.substring(0, 500) + '...');
  } catch (error) {
    console.log('No documentation available');
  }
}

showComponentHelp('SubmitButton');
```

### 4. CSS Styling Integration

```javascript
const { 
  getStyleGuide, 
  getCSSVariables, 
  getComponentStyleRequirements,
  getStyleContent 
} = require('@instincthub/react-ui-docs');

// Get comprehensive style guide
const styleGuide = getStyleGuide();
console.log('=== InstinctHub React UI Style Guide ===');
console.log(`Total CSS files: ${styleGuide.files.length}`);
console.log(`CSS variables: ${Object.keys(styleGuide.variables).length}`);
console.log(`Utility classes: ${styleGuide.utilityClasses.length}`);

// Setup for Next.js
console.log('\n=== Next.js Setup ===');
console.log(styleGuide.examples.basicSetup);

// Get CSS variables for theming
const variables = getCSSVariables();
console.log('\n=== Available CSS Variables ===');
Object.entries(variables).forEach(([name, value]) => {
  console.log(`${name}: ${value}`);
});

// Get component-specific styling requirements
const submitButtonStyles = getComponentStyleRequirements('SubmitButton');
console.log('\n=== SubmitButton Styling ===');
console.log('Required CSS files:');
submitButtonStyles.required.forEach(file => {
  console.log(`  - ${file}`);
});
console.log('\nExample imports:');
console.log(submitButtonStyles.example);

// Dynamic CSS loading example
function loadComponentCSS(componentName) {
  const requirements = getComponentStyleRequirements(componentName);
  
  requirements.required.forEach(filename => {
    try {
      const css = getStyleContent(filename);
      console.log(`Loaded ${filename}: ${css.length} characters`);
      // In browser: inject CSS into <style> tag
      // In build tool: write to output directory
    } catch (error) {
      console.warn(`Could not load ${filename}:`, error.message);
    }
  });
}

loadComponentCSS('DataTable');
```

### 5. Integration with Build Tools

```javascript
// build-helper.js
const { getComponents, getSummary } = require('@instincthub/react-ui-docs');

function generateComponentList() {
  const components = getComponents();
  const summary = getSummary();
  
  console.log(`Found ${summary.totalComponents} components:`);
  
  const imports = components.map(comp => 
    `import { ${comp.name} } from '@instincthub/react-ui';`
  ).join('\n');
  
  return `// Auto-generated component imports\n${imports}`;
}

// Use in your build process
const importStatements = generateComponentList();
console.log(importStatements);
```

## 📊 Package Contents

This package includes:

- **125+ component documentation files** (markdown format)
- **10 category overview files** with component listings
- **Complete component metadata** (JSON format)
- **70+ CSS stylesheet files** with core and component-specific styles
- **47 CSS custom properties** (variables) for theming
- **Bootstrap-style utility classes** with `ihub-` prefix
- **Enhanced search index** for fuzzy matching
- **Code generation templates** and patterns
- **Comprehensive styling guide** with integration examples
- **Offline search capabilities** with multiple algorithms

### CSS File Structure
```
styles/
├── root.css                    # CSS variables and global resets
├── main.css                   # Typography and base styles  
├── tag-only-selectors.css     # Global HTML tag styling
├── bootstrap/                 # Bootstrap-style utilities
│   ├── style.css             # Main utility classes
│   ├── borders.css           # Border utilities
│   ├── color-classes.css     # Color utilities
│   ├── display.css           # Display utilities
│   └── ...                   # More utility categories
├── forms/                    # Form component styles
├── ui/                       # UI component styles
├── navbar/                   # Navigation component styles
└── ...                       # Additional category styles
```

## 🔧 Integration Options

### With Development Tools

```javascript
// webpack.config.js - Dynamic imports
const { getComponents } = require('@instincthub/react-ui-docs');

const availableComponents = getComponents().map(c => c.name);
console.log('Available InstinctHub components:', availableComponents);
```

### With Documentation Generators

```javascript
// docs-generator.js
const { getComponentDocs, getCategories } = require('@instincthub/react-ui-docs');

function generateProjectDocs() {
  const categories = getCategories();
  
  categories.forEach(category => {
    category.components.forEach(component => {
      const docs = getComponentDocs(component.name);
      // Process documentation...
    });
  });
}
```

### With Claude Code and AI Assistants

This package is specifically designed for AI tools like Claude Code:

```javascript
// claude-integration.js
const { 
  searchComponents, 
  getRecommendations, 
  getComponent,
  getComponentStyleRequirements,
  generateUsageExample 
} = require('@instincthub/react-ui-docs');

function getClaudeComponentKnowledge(userRequest) {
  // Parse user intent and find relevant components
  const recommendations = getRecommendations(userRequest, { limit: 5 });
  
  // Get detailed information for each recommendation
  const componentDetails = recommendations.map(comp => {
    const details = getComponent(comp.name);
    const styles = getComponentStyleRequirements(comp.name);
    const example = generateUsageExample(comp.name);
    
    return {
      name: comp.name,
      description: comp.description,
      category: comp.category,
      tags: comp.tags,
      requiredCSS: styles.required,
      usageExample: example.complete,
      importPath: '@instincthub/react-ui'
    };
  });
  
  return {
    userRequest,
    recommendedComponents: componentDetails,
    totalAvailable: 125
  };
}

// Example: Claude Code asks about form components
const knowledge = getClaudeComponentKnowledge(
  'I need to build a user registration form with validation'
);

console.log('Claude Code Knowledge Base Response:');
console.log(JSON.stringify(knowledge, null, 2));

// Specific function for Claude to understand component relationships
function explainComponentEcosystem() {
  const components = getComponents();
  const categories = getCategories();
  
  return {
    totalComponents: components.length,
    categories: categories.map(cat => ({
      name: cat.name,
      count: cat.count,
      description: cat.description,
      icon: cat.icon
    })),
    commonPatterns: {
      forms: components.filter(c => c.tags?.includes('form')).length,
      buttons: components.filter(c => c.tags?.includes('button')).length,
      inputs: components.filter(c => c.tags?.includes('input')).length,
      tables: components.filter(c => c.tags?.includes('table')).length,
      modals: components.filter(c => c.tags?.includes('modal')).length
    },
    stylingSystem: {
      totalCSSFiles: getStyleFiles().length,
      coreVariables: Object.keys(getCSSVariables()).length,
      utilityClasses: getUtilityClasses().length
    }
  };
}
```

### With AI Tools and Assistants

```javascript
// ai-helper.js
const { getRecommendations, searchComponents } = require('@instincthub/react-ui-docs');

function getComponentSuggestions(userQuery) {
  // Use recommendations for natural language queries
  const recommendations = getRecommendations(userQuery);
  
  // Fall back to search for specific terms
  const searchResults = searchComponents(userQuery);
  
  return {
    recommended: recommendations,
    matches: searchResults,
    total: recommendations.length + searchResults.length
  };
}

// Example usage
const suggestions = getComponentSuggestions('I need a data table with sorting');
console.log(suggestions);
```

## 🚀 Performance

- **Fast offline access** - No network requests required
- **Lightweight** - Optimized JSON data structures
- **Memory efficient** - Lazy loading of documentation content
- **Quick search** - Pre-built search indices

## 🔄 Updates

This package is automatically generated from the main InstinctHub React UI repository. To get the latest component information:

1. Check for package updates: `npm update @instincthub/react-ui-docs`
2. Or install the latest version: `npm install @instincthub/react-ui-docs@latest`

## 🤝 Integration with Main Package

Use alongside the main UI package:

```javascript
// Your project
import { SubmitButton, InputText } from '@instincthub/react-ui';
import { getComponentDocs, generateUsageExample } from '@instincthub/react-ui-docs';

// Get documentation for components you're using
const submitButtonDocs = getComponentDocs('SubmitButton');
const inputTextExample = generateUsageExample('InputText');
```

## 📝 License

MIT - Same as the main InstinctHub React UI package.

## 🔗 Related Packages

- [`@instincthub/react-ui`](https://www.npmjs.com/package/@instincthub/react-ui) - Main component library
- [`@instincthub/react-ui-mcp-server`](https://www.npmjs.com/package/@instincthub/react-ui-mcp-server) - MCP server for AI integration

## 💡 Use Cases

### 🤖 **Primary: Claude Code & AI Integration**
- **MCP Server Replacement** - Provides complete InstinctHub React UI knowledge when MCP server fails on WSL
- **AI Assistant Knowledge Base** - Enables Claude Code to recommend, explain, and generate component code
- **Styling Knowledge** - Includes 70+ CSS files and 47 CSS variables for complete styling guidance
- **Code Generation** - AI can generate proper usage examples with correct imports and styling

### 🛠️ **Developer Tools**
1. **Offline Development** - Access component docs without internet
2. **CI/CD Integration** - Validate component usage in build pipelines  
3. **Documentation Generation** - Auto-generate project documentation
4. **IDE Extensions** - Power autocomplete and documentation features
5. **Learning and Exploration** - Browse and discover components programmatically
6. **Build Tool Integration** - Dynamic CSS loading and component validation

### 🎨 **Styling & Theming**
- **CSS Variable Extraction** - Access all 47 design system variables
- **Utility Class Discovery** - Find Bootstrap-style classes with `ihub-` prefix
- **Component Style Requirements** - Know exactly which CSS files each component needs
- **Theme Customization** - Use CSS variables for consistent theming across projects

---

**🚀 Perfect for WSL Environments**: When the InstinctHub React UI MCP server can't run due to WSL compatibility issues, this package provides the complete knowledge base offline.