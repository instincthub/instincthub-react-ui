const fs = require('fs');
const path = require('path');

/**
 * InstinctHub React UI Documentation Package
 * Provides offline access to component documentation and metadata
 */

class InstinctHubDocs {
  constructor() {
    this.dataPath = path.join(__dirname, 'data');
    this.docsPath = path.join(__dirname, 'docs');
    this.stylesPath = path.join(__dirname, 'styles');
    this._componentsData = null;
    this._categoriesData = null;
    this._searchIndex = null;
    this._enhancedData = null;
  }

  /**
   * Load component data
   */
  getComponents() {
    if (!this._componentsData) {
      const componentsPath = path.join(this.dataPath, 'components.json');
      this._componentsData = JSON.parse(fs.readFileSync(componentsPath, 'utf-8'));
    }
    return this._componentsData;
  }

  /**
   * Load categories data
   */
  getCategories() {
    if (!this._categoriesData) {
      const categoriesPath = path.join(this.dataPath, 'categories.json');
      this._categoriesData = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'));
    }
    return this._categoriesData;
  }

  /**
   * Load search index
   */
  getSearchIndex() {
    if (!this._searchIndex) {
      const searchPath = path.join(this.dataPath, 'search-index.json');
      this._searchIndex = JSON.parse(fs.readFileSync(searchPath, 'utf-8'));
    }
    return this._searchIndex;
  }

  /**
   * Load enhanced component data
   */
  getEnhancedData() {
    if (!this._enhancedData) {
      const enhancedPath = path.join(this.dataPath, 'enhanced-compact.json');
      this._enhancedData = JSON.parse(fs.readFileSync(enhancedPath, 'utf-8'));
    }
    return this._enhancedData;
  }

  /**
   * Search for components by name, description, or tags
   */
  searchComponents(query, options = {}) {
    const { category, type, limit = 10 } = options;
    const components = this.getComponents();
    const searchTerm = query.toLowerCase();

    let results = components.filter(component => {
      const matchesQuery = 
        component.name.toLowerCase().includes(searchTerm) ||
        component.description.toLowerCase().includes(searchTerm) ||
        (component.tags && component.tags.some(tag => tag.toLowerCase().includes(searchTerm)));

      const matchesCategory = !category || component.category === category;
      const matchesType = !type || component.type === type;

      return matchesQuery && matchesCategory && matchesType;
    });

    // Sort by relevance (exact name matches first)
    results.sort((a, b) => {
      const aExactMatch = a.name.toLowerCase() === searchTerm;
      const bExactMatch = b.name.toLowerCase() === searchTerm;
      
      if (aExactMatch && !bExactMatch) return -1;
      if (!aExactMatch && bExactMatch) return 1;
      
      return a.name.localeCompare(b.name);
    });

    return results.slice(0, limit);
  }

  /**
   * Get a specific component by name
   */
  getComponent(name) {
    const components = this.getComponents();
    return components.find(component => 
      component.name.toLowerCase() === name.toLowerCase()
    );
  }

  /**
   * Get components by category
   */
  getComponentsByCategory(categoryName) {
    const components = this.getComponents();
    return components.filter(component => 
      component.category === categoryName
    );
  }

  /**
   * Get component documentation markdown
   */
  getComponentDocs(componentName) {
    const docsPath = path.join(this.docsPath, 'components', `${componentName}.md`);
    
    if (!fs.existsSync(docsPath)) {
      throw new Error(`Documentation not found for component: ${componentName}`);
    }
    
    return fs.readFileSync(docsPath, 'utf-8');
  }

  /**
   * Get category documentation markdown
   */
  getCategoryDocs(categoryName) {
    const docsPath = path.join(this.docsPath, 'categories', `${categoryName}.md`);
    
    if (!fs.existsSync(docsPath)) {
      throw new Error(`Documentation not found for category: ${categoryName}`);
    }
    
    return fs.readFileSync(docsPath, 'utf-8');
  }

  /**
   * Get main documentation index
   */
  getMainDocs() {
    const docsPath = path.join(this.docsPath, 'README.md');
    return fs.readFileSync(docsPath, 'utf-8');
  }

  /**
   * Get component recommendations based on description
   */
  getRecommendations(description, options = {}) {
    const { limit = 5, category } = options;
    const components = this.getComponents();
    const searchTerms = description.toLowerCase().split(' ');

    const scores = components.map(component => {
      let score = 0;
      
      // Score based on description match
      searchTerms.forEach(term => {
        if (component.description.toLowerCase().includes(term)) score += 2;
        if (component.name.toLowerCase().includes(term)) score += 3;
        if (component.tags && component.tags.some(tag => tag.toLowerCase().includes(term))) score += 1;
      });

      // Boost score for category match
      if (category && component.category === category) score += 2;

      return { component, score };
    });

    return scores
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.component);
  }

  /**
   * Get summary statistics
   */
  getSummary() {
    const summaryPath = path.join(this.dataPath, 'summary.json');
    return JSON.parse(fs.readFileSync(summaryPath, 'utf-8'));
  }

  /**
   * Generate usage example for a component
   */
  generateUsageExample(componentName, framework = 'react') {
    const component = this.getComponent(componentName);
    
    if (!component) {
      throw new Error(`Component not found: ${componentName}`);
    }

    const imports = `import React from 'react';\nimport { ${componentName} } from '@instincthub/react-ui';`;
    
    let usage = `\nfunction MyComponent() {\n  return (\n    <${componentName}`;
    
    // Add common props based on component type
    if (component.tags?.includes('input')) {
      usage += `\n      placeholder="Enter value"`;
      usage += `\n      onChange={(value) => console.log(value)}`;
    }
    
    if (component.tags?.includes('button')) {
      usage += `\n      onClick={() => console.log('clicked')}`;
    }
    
    usage += `\n    />\n  );\n}`;

    return {
      imports,
      usage,
      complete: `${imports}${usage}\n\nexport default MyComponent;`
    };
  }

  /**
   * Get available CSS files
   */
  getStyleFiles() {
    if (!fs.existsSync(this.stylesPath)) {
      return [];
    }

    const getAllFiles = (dir, baseDir = '') => {
      const files = [];
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const relativePath = baseDir ? `${baseDir}/${item}` : item;
        
        if (fs.statSync(fullPath).isDirectory()) {
          files.push(...getAllFiles(fullPath, relativePath));
        } else if (item.endsWith('.css')) {
          files.push(relativePath);
        }
      }
      return files;
    };

    return getAllFiles(this.stylesPath);
  }

  /**
   * Get CSS file content
   */
  getStyleContent(filename) {
    const filePath = path.join(this.stylesPath, filename);
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`CSS file not found: ${filename}`);
    }
    
    return fs.readFileSync(filePath, 'utf-8');
  }

  /**
   * Get CSS custom properties (variables)
   */
  getCSSVariables() {
    try {
      const rootCss = this.getStyleContent('root.css');
      const variables = {};
      
      // Extract CSS variables from :root selector
      const rootMatch = rootCss.match(/:root\s*{([^}]*)}/);
      if (rootMatch) {
        const variableLines = rootMatch[1].split('\n');
        
        variableLines.forEach(line => {
          const trimmed = line.trim();
          if (trimmed.startsWith('--') && trimmed.includes(':')) {
            const [name, value] = trimmed.split(':').map(s => s.trim());
            variables[name] = value.replace(';', '');
          }
        });
      }
      
      return variables;
    } catch (error) {
      console.warn('Could not extract CSS variables:', error.message);
      return {};
    }
  }

  /**
   * Get Bootstrap utility classes
   */
  getUtilityClasses() {
    try {
      const bootstrapCss = this.getStyleContent('bootstrap/style.css');
      const classes = [];
      
      // Extract class names (simple implementation)
      const classRegex = /\.ihub-([a-zA-Z0-9-]+)/g;
      let match;
      
      while ((match = classRegex.exec(bootstrapCss)) !== null) {
        const className = `ihub-${match[1]}`;
        if (!classes.includes(className)) {
          classes.push(className);
        }
      }
      
      return classes.sort();
    } catch (error) {
      console.warn('Could not extract utility classes:', error.message);
      return [];
    }
  }

  /**
   * Get comprehensive style guide
   */
  getStyleGuide() {
    const enhancedData = this.getEnhancedData();
    const styleFiles = this.getStyleFiles();
    const cssVariables = this.getCSSVariables();
    const utilityClasses = this.getUtilityClasses();

    return {
      overview: {
        description: 'InstinctHub React UI Styling Guide',
        totalFiles: styleFiles.length,
        coreFiles: enhancedData.integrations?.styling?.coreFiles || [],
        loadingOrder: enhancedData.integrations?.styling?.loadingOrder || []
      },
      files: styleFiles,
      variables: cssVariables,
      utilityClasses,
      integrationGuide: enhancedData.integrations?.styling?.integrationGuide || {},
      examples: {
        basicSetup: `// Import core CSS files in your main application file
import '@instincthub/react-ui-docs/styles/root.css';
import '@instincthub/react-ui-docs/styles/main.css';
import '@instincthub/react-ui-docs/styles/tag-only-selectors.css';
import '@instincthub/react-ui-docs/styles/bootstrap/style.css';`,
        
        categorySpecific: `// Import category-specific styles as needed
import '@instincthub/react-ui-docs/styles/forms.css';        // For form components
import '@instincthub/react-ui-docs/styles/ui/ui-index.css';  // For UI components
import '@instincthub/react-ui-docs/styles/navbar/navbar-index.css'; // For navbar components`,
        
        customization: `// Use CSS variables for customization
:root {
  --DarkCyan: #your-color;
  --TurkishRose: #your-color;
  --Gunmetal: #your-color;
}`
      }
    };
  }

  /**
   * Get style requirements for a specific component
   */
  getComponentStyleRequirements(componentName) {
    const enhancedData = this.getEnhancedData();
    const component = enhancedData.components?.find(c => c.name === componentName);
    
    if (!component) {
      throw new Error(`Component not found: ${componentName}`);
    }
    
    return {
      component: componentName,
      required: component.styleRequirements || [],
      category: component.category,
      loadingOrder: this.getStyleGuide().overview.loadingOrder,
      example: `// Required CSS imports for ${componentName}
${(component.styleRequirements || []).map(file => 
  `import '@instincthub/react-ui-docs/styles/${file}';`
).join('\n')}`
    };
  }
}

// Create singleton instance
const docs = new InstinctHubDocs();

// Export both the class and instance
module.exports = {
  InstinctHubDocs,
  docs,
  
  // Convenience exports
  searchComponents: (query, options) => docs.searchComponents(query, options),
  getComponent: (name) => docs.getComponent(name),
  getComponents: () => docs.getComponents(),
  getCategories: () => docs.getCategories(),
  getComponentDocs: (name) => docs.getComponentDocs(name),
  getCategoryDocs: (name) => docs.getCategoryDocs(name),
  getRecommendations: (description, options) => docs.getRecommendations(description, options),
  getSummary: () => docs.getSummary(),
  generateUsageExample: (name, framework) => docs.generateUsageExample(name, framework),
  
  // CSS/Styling exports
  getStyleFiles: () => docs.getStyleFiles(),
  getStyleContent: (filename) => docs.getStyleContent(filename),
  getCSSVariables: () => docs.getCSSVariables(),
  getUtilityClasses: () => docs.getUtilityClasses(),
  getStyleGuide: () => docs.getStyleGuide(),
  getComponentStyleRequirements: (name) => docs.getComponentStyleRequirements(name),
};