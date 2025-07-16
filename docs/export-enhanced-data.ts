#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ComponentInfo {
  name: string;
  description: string;
  category: string;
  repo_path: string;
  type?: 'component' | 'hook' | 'context' | 'utility';
  tags?: string[];
}

interface EnhancedComponentData {
  name: string;
  description: string;
  category: string;
  type: string;
  filePath: string;
  importPath: string;
  tags: string[];
  props: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
    defaultValue?: string;
  }>;
  examples: Array<{
    title: string;
    description: string;
    code: string;
    framework?: string;
  }>;
  relatedComponents: string[];
  usagePatterns: string[];
  dependencies: string[];
  styleRequirements: string[];
  apiReference?: {
    methods?: Array<{
      name: string;
      description: string;
      parameters: Array<{
        name: string;
        type: string;
        required: boolean;
      }>;
      returns: string;
    }>;
    events?: Array<{
      name: string;
      description: string;
      payload: string;
    }>;
  };
  performance?: {
    renderComplexity: 'low' | 'medium' | 'high';
    memoryUsage: 'low' | 'medium' | 'high';
    rerenderTriggers: string[];
  };
  accessibility: {
    ariaSupport: boolean;
    keyboardNavigation: boolean;
    screenReaderSupport: boolean;
    focusManagement: boolean;
  };
  testing: {
    hasTests: boolean;
    testExamples: string[];
    mockRequirements: string[];
  };
}

interface EnhancedDataExport {
  metadata: {
    version: string;
    generatedAt: string;
    totalComponents: number;
    categories: Record<string, {
      name: string;
      description: string;
      count: number;
      color: string;
      icon: string;
    }>;
    statistics: {
      byType: Record<string, number>;
      byComplexity: Record<string, number>;
      withTests: number;
      withAccessibility: number;
    };
  };
  components: EnhancedComponentData[];
  integrations: {
    nextjs: {
      setup: string[];
      examples: Array<{
        component: string;
        code: string;
      }>;
    };
    typescript: {
      types: string[];
      interfaces: Array<{
        name: string;
        definition: string;
      }>;
    };
    styling: {
      coreFiles: Array<{
        name: string;
        description: string;
        purpose: string;
        loadOrder: number;
        required: boolean;
      }>;
      cssVariables: string[];
      utilityClasses: string[];
      themes: string[];
      loadingOrder: string[];
      integrationGuide: Record<string, string[]>;
    };
  };
  codeGeneration: {
    templates: Array<{
      name: string;
      description: string;
      components: string[];
      code: string;
      framework: string;
    }>;
    patterns: Array<{
      name: string;
      description: string;
      use_cases: string[];
      components: string[];
      example: string;
    }>;
  };
  searchIndex: {
    byName: Record<string, EnhancedComponentData>;
    byCategory: Record<string, string[]>;
    byTags: Record<string, string[]>;
    byType: Record<string, string[]>;
    fuzzySearch: Array<{
      component: string;
      keywords: string[];
      alternatives: string[];
    }>;
  };
}

class EnhancedDataExporter {
  private srcPath: string;
  private outputPath: string;
  private components: ComponentInfo[] = [];

  constructor() {
    this.srcPath = path.join(__dirname, '../../src');
    this.outputPath = path.join(__dirname, '../static-docs/data');
  }

  /**
   * Load existing component data from the generated JSON
   */
  private loadComponentData(): ComponentInfo[] {
    const componentsPath = path.join(this.outputPath, 'components.json');
    if (!fs.existsSync(componentsPath)) {
      throw new Error('Components data not found. Run documentation generator first.');
    }
    return JSON.parse(fs.readFileSync(componentsPath, 'utf-8'));
  }

  /**
   * Extract detailed prop information from TypeScript files
   */
  private extractDetailedProps(component: ComponentInfo): EnhancedComponentData['props'] {
    const componentPath = path.join(this.srcPath, component.repo_path);
    
    if (!fs.existsSync(componentPath)) {
      return [];
    }

    const content = fs.readFileSync(componentPath, 'utf-8');
    const props: EnhancedComponentData['props'] = [];

    // Enhanced prop parsing with JSDoc comments
    const interfaceRegex = /\/\*\*([\s\S]*?)\*\/\s*interface\s+(\w+Props)\s*{([^}]*)}/g;
    let interfaceMatch;
    
    while ((interfaceMatch = interfaceRegex.exec(content)) !== null) {
      const [, jsdoc, interfaceName, interfaceBody] = interfaceMatch;
      
      // Parse individual props with comments
      const propRegex = /(?:\/\*\*([\s\S]*?)\*\/\s*)?(\w+)(\??):\s*([^;]+);/g;
      let propMatch;
      
      while ((propMatch = propRegex.exec(interfaceBody)) !== null) {
        const [, comment, propName, optional, propType] = propMatch;
        
        // Extract description from JSDoc comment
        let description = '';
        let defaultValue;
        
        if (comment) {
          const descMatch = comment.match(/@description\s+(.+)/);
          if (descMatch) description = descMatch[1].trim();
          
          const defaultMatch = comment.match(/@default\s+(.+)/);
          if (defaultMatch) defaultValue = defaultMatch[1].trim();
        }

        props.push({
          name: propName,
          type: propType.trim(),
          required: optional !== '?',
          description: description || `${propName} property`,
          defaultValue,
        });
      }
    }

    return props;
  }

  /**
   * Extract usage examples with enhanced metadata
   */
  private extractEnhancedExamples(component: ComponentInfo): EnhancedComponentData['examples'] {
    const examples: EnhancedComponentData['examples'] = [];
    
    // Look for example files
    const examplePaths = [
      path.join(this.srcPath, '__examples__/src/components', component.category.toLowerCase(), `${component.name}Example.tsx`),
      path.join(this.srcPath, '__examples__/src/components', component.category.toLowerCase(), `${component.name}Sample.tsx`),
      path.join(this.srcPath, '__examples__/src/components', component.category.toLowerCase(), `${component.name}Docs.tsx`),
    ];

    examplePaths.forEach((examplePath, index) => {
      if (fs.existsSync(examplePath)) {
        const content = fs.readFileSync(examplePath, 'utf-8');
        
        examples.push({
          title: `Example ${index + 1}`,
          description: `Usage example for ${component.name}`,
          code: content,
          framework: 'react',
        });
      }
    });

    // Add basic usage template if no examples found
    if (examples.length === 0) {
      examples.push({
        title: 'Basic Usage',
        description: `Basic implementation of ${component.name}`,
        code: `import React from 'react';
import { ${component.name} } from '@instincthub/react-ui';

function MyComponent() {
  return (
    <${component.name} />
  );
}

export default MyComponent;`,
        framework: 'react',
      });
    }

    return examples;
  }

  /**
   * Determine related components based on category and naming patterns
   */
  private findRelatedComponents(component: ComponentInfo): string[] {
    const related = this.components
      .filter(c => 
        c.name !== component.name &&
        (c.category === component.category ||
         c.tags?.some(tag => component.tags?.includes(tag)) ||
         this.hasSimilarNaming(c.name, component.name))
      )
      .slice(0, 5)
      .map(c => c.name);

    return related;
  }

  private hasSimilarNaming(name1: string, name2: string): boolean {
    const extractBase = (name: string) => name.replace(/(Button|Input|Field|Form|Modal|Table|Card)$/, '');
    return extractBase(name1) === extractBase(name2);
  }

  /**
   * Analyze component for usage patterns
   */
  private extractUsagePatterns(component: ComponentInfo): string[] {
    const patterns: string[] = [];
    
    if (component.tags?.includes('form')) {
      patterns.push('form-building', 'data-input', 'validation');
    }
    if (component.tags?.includes('table')) {
      patterns.push('data-display', 'sorting', 'pagination');
    }
    if (component.tags?.includes('modal')) {
      patterns.push('user-interaction', 'overlay', 'dialog');
    }
    if (component.tags?.includes('navigation')) {
      patterns.push('routing', 'menu-navigation', 'breadcrumbs');
    }
    if (component.tags?.includes('button')) {
      patterns.push('user-actions', 'event-handling', 'form-submission');
    }

    return patterns;
  }

  /**
   * Analyze dependencies for component
   */
  private extractDependencies(component: ComponentInfo): string[] {
    const componentPath = path.join(this.srcPath, component.repo_path);
    
    if (!fs.existsSync(componentPath)) {
      return [];
    }

    const content = fs.readFileSync(componentPath, 'utf-8');
    const dependencies: string[] = [];

    // Extract import statements
    const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g;
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1];
      if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
        dependencies.push(importPath);
      }
    }

    return [...new Set(dependencies)];
  }

  /**
   * Generate enhanced component data
   */
  private enhanceComponentData(component: ComponentInfo): EnhancedComponentData {
    const props = this.extractDetailedProps(component);
    const examples = this.extractEnhancedExamples(component);
    const relatedComponents = this.findRelatedComponents(component);
    const usagePatterns = this.extractUsagePatterns(component);
    const dependencies = this.extractDependencies(component);

    return {
      name: component.name,
      description: component.description,
      category: component.category,
      type: component.type || 'component',
      filePath: component.repo_path,
      importPath: `@instincthub/react-ui`,
      tags: component.tags || [],
      props,
      examples,
      relatedComponents,
      usagePatterns,
      dependencies,
      styleRequirements: this.getStyleRequirements(component),
      performance: this.analyzePerformance(component),
      accessibility: this.analyzeAccessibility(component),
      testing: this.analyzeTestCoverage(component),
    };
  }

  private getStyleRequirements(component: ComponentInfo): string[] {
    const requirements: string[] = [];
    
    // Core CSS files - always required
    requirements.push(
      'root.css',              // CSS variables and global resets
      'main.css',              // Core typography and base styles
      'tag-only-selectors.css', // Global tag styling
      'bootstrap/style.css'     // Bootstrap utilities with ihub- prefix
    );
    
    // Category-specific CSS files
    if (component.category === 'Forms') {
      requirements.push(
        'forms.css',
        'forms/forms-index.css',
        'forms/input-fields.css',
        'forms/submit-btn.css',
        'forms/submit-button.css'
      );
    }
    
    if (component.category === 'UI') {
      requirements.push(
        'ui/ui-index.css',
        'ui/card.css',
        'ui/badge.css',
        'ui/action.css',
        'ui/tables.css',
        'ui/charts.css',
        'ui/dropdown-styles.css'
      );
    }
    
    if (component.category === 'Navbar') {
      requirements.push(
        'navbar/navbar-index.css',
        'navbar/responsive-navbar.css',
        'navbar/sidenav.css',
        'navbar/breadcrumb.css',
        'navbar/menu-dropdown.css'
      );
    }
    
    if (component.category === 'Auth') {
      requirements.push('forms.css', 'forms/input-fields.css');
    }
    
    if (component.category === 'Status') {
      requirements.push(
        'status/error-state.css',
        'status/not-found.css',
        'modals/modal.css'
      );
    }
    
    if (component.category === 'Theme') {
      requirements.push('darkmode.css');
    }
    
    if (component.category === 'Tabs') {
      requirements.push(
        'tabs/main.css',
        'tabs/style.css'
      );
    }
    
    if (component.category === 'Cursors') {
      requirements.push('cursors/style.css');
    }
    
    // Component-specific CSS based on tags
    if (component.tags?.includes('modal')) {
      requirements.push(
        'modals.css',
        'modals/modal.css',
        'modals/style.css'
      );
    }
    
    if (component.tags?.includes('table')) {
      requirements.push('ui/tables.css');
    }
    
    if (component.tags?.includes('chart')) {
      requirements.push('ui/charts.css');
    }
    
    if (component.tags?.includes('button')) {
      requirements.push('forms/submit-button.css');
    }
    
    // Remove duplicates and sort
    return [...new Set(requirements)].sort();
  }

  private analyzePerformance(component: ComponentInfo): EnhancedComponentData['performance'] {
    // Basic analysis based on component type and category
    let renderComplexity: 'low' | 'medium' | 'high' = 'low';
    let memoryUsage: 'low' | 'medium' | 'high' = 'low';
    
    if (component.tags?.includes('table') || component.tags?.includes('chart')) {
      renderComplexity = 'high';
      memoryUsage = 'medium';
    } else if (component.tags?.includes('modal') || component.tags?.includes('form')) {
      renderComplexity = 'medium';
    }

    return {
      renderComplexity,
      memoryUsage,
      rerenderTriggers: ['props', 'state', 'context'],
    };
  }

  private analyzeAccessibility(component: ComponentInfo): EnhancedComponentData['accessibility'] {
    // Basic accessibility analysis
    const hasFormElements = component.tags?.includes('form') || component.tags?.includes('input');
    const hasInteractiveElements = component.tags?.includes('button') || component.tags?.includes('modal');

    return {
      ariaSupport: !!(hasFormElements || hasInteractiveElements),
      keyboardNavigation: !!hasInteractiveElements,
      screenReaderSupport: !!hasFormElements,
      focusManagement: !!hasInteractiveElements,
    };
  }

  private analyzeTestCoverage(component: ComponentInfo): EnhancedComponentData['testing'] {
    // Check if test files exist (basic implementation)
    const testPaths = [
      path.join(this.srcPath, component.repo_path.replace('.tsx', '.test.tsx')),
      path.join(this.srcPath, component.repo_path.replace('.tsx', '.spec.tsx')),
    ];

    const hasTests = testPaths.some(testPath => fs.existsSync(testPath));

    return {
      hasTests,
      testExamples: hasTests ? ['unit-tests', 'integration-tests'] : [],
      mockRequirements: ['react-testing-library', '@testing-library/jest-dom'],
    };
  }

  /**
   * Generate code templates and patterns
   */
  private generateCodeTemplates(): EnhancedDataExport['codeGeneration'] {
    return {
      templates: [
        {
          name: 'basic-form',
          description: 'Basic form with validation',
          components: ['InputText', 'SubmitButton', 'FormError'],
          code: `import React, { useState } from 'react';
import { InputText, SubmitButton, FormError } from '@instincthub/react-ui';

function BasicForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputText
        label="Name"
        value={formData.name}
        onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
      />
      <InputText
        label="Email"
        type="email"
        value={formData.email}
        onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
      />
      <SubmitButton loading={false}>Submit</SubmitButton>
      <FormError errors={errors} />
    </form>
  );
}`,
          framework: 'react',
        },
        {
          name: 'data-table',
          description: 'Data table with pagination and sorting',
          components: ['IHubTable', 'Pagination', 'THeadSortBtn'],
          code: `import React, { useState } from 'react';
import { IHubTable, Pagination } from '@instincthub/react-ui';

function DataTableExample() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState(null);

  return (
    <div>
      <IHubTable
        data={data}
        sortConfig={sortConfig}
        onSort={setSortConfig}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}`,
          framework: 'react',
        },
      ],
      patterns: [
        {
          name: 'form-wizard',
          description: 'Multi-step form pattern',
          use_cases: ['user-onboarding', 'complex-forms', 'data-collection'],
          components: ['Tabs', 'InputText', 'SubmitButton', 'StepProgressBar'],
          example: 'Multi-step form with validation and progress tracking',
        },
        {
          name: 'dashboard-layout',
          description: 'Dashboard with charts and tables',
          use_cases: ['analytics', 'monitoring', 'data-visualization'],
          components: ['InstinctHubChart', 'IHubTable', 'Card', 'Badge'],
          example: 'Complete dashboard with metrics and data tables',
        },
      ],
    };
  }

  /**
   * Generate comprehensive search index
   */
  private generateEnhancedSearchIndex(enhancedComponents: EnhancedComponentData[]): EnhancedDataExport['searchIndex'] {
    const byName: Record<string, EnhancedComponentData> = {};
    const byCategory: Record<string, string[]> = {};
    const byTags: Record<string, string[]> = {};
    const byType: Record<string, string[]> = {};
    const fuzzySearch: Array<{ component: string; keywords: string[]; alternatives: string[] }> = [];

    enhancedComponents.forEach(component => {
      // By name index
      byName[component.name.toLowerCase()] = component;

      // By category index
      if (!byCategory[component.category]) byCategory[component.category] = [];
      byCategory[component.category].push(component.name);

      // By tags index
      component.tags.forEach(tag => {
        if (!byTags[tag]) byTags[tag] = [];
        byTags[tag].push(component.name);
      });

      // By type index
      if (!byType[component.type]) byType[component.type] = [];
      byType[component.type].push(component.name);

      // Fuzzy search data
      const keywords = [
        component.name.toLowerCase(),
        component.description.toLowerCase(),
        ...component.tags.map(tag => tag.toLowerCase()),
        ...component.usagePatterns.map(pattern => pattern.toLowerCase()),
      ];

      const alternatives = component.relatedComponents.map(name => name.toLowerCase());

      fuzzySearch.push({
        component: component.name,
        keywords: [...new Set(keywords)],
        alternatives,
      });
    });

    return { byName, byCategory, byTags, byType, fuzzySearch };
  }

  /**
   * Main export method
   */
  async export(): Promise<void> {
    console.log('🔄 Starting enhanced data export...');

    try {
      // Load existing component data
      console.log('📋 Loading component data...');
      this.components = this.loadComponentData();
      console.log(`✅ Loaded ${this.components.length} components`);

      // Enhance each component
      console.log('🔍 Enhancing component data...');
      const enhancedComponents = this.components.map(component => 
        this.enhanceComponentData(component)
      );

      // Load categories data
      const categoriesPath = path.join(this.outputPath, 'categories.json');
      const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'));

      // Generate enhanced export
      const enhancedExport: EnhancedDataExport = {
        metadata: {
          version: '1.0.0',
          generatedAt: new Date().toISOString(),
          totalComponents: enhancedComponents.length,
          categories: Object.fromEntries(
            categories.map((cat: any) => [cat.name, {
              name: cat.name,
              description: cat.description,
              count: cat.components.length,
              color: cat.color,
              icon: cat.icon,
            }])
          ),
          statistics: {
            byType: Object.fromEntries(
              ['component', 'hook', 'context', 'utility'].map(type => [
                type,
                enhancedComponents.filter(c => c.type === type).length
              ])
            ),
            byComplexity: {
              low: enhancedComponents.filter(c => c.performance?.renderComplexity === 'low').length,
              medium: enhancedComponents.filter(c => c.performance?.renderComplexity === 'medium').length,
              high: enhancedComponents.filter(c => c.performance?.renderComplexity === 'high').length,
            },
            withTests: enhancedComponents.filter(c => c.testing.hasTests).length,
            withAccessibility: enhancedComponents.filter(c => c.accessibility.ariaSupport).length,
          },
        },
        components: enhancedComponents,
        integrations: {
          nextjs: {
            setup: [
              'npm install @instincthub/react-ui',
              'Import components: import { ComponentName } from "@instincthub/react-ui"',
              'Add CSS imports to your _app.tsx or layout file',
            ],
            examples: [
              {
                component: 'LoginForm',
                code: 'import { LoginForm } from "@instincthub/react-ui";\n\nfunction Page() {\n  return <LoginForm onSubmit={handleLogin} />;\n}',
              },
            ],
          },
          typescript: {
            types: ['@instincthub/react-ui/types'],
            interfaces: [
              {
                name: 'ComponentProps',
                definition: 'Interface definitions available in the package',
              },
            ],
          },
          styling: {
            coreFiles: [
              {
                name: 'root.css',
                description: 'CSS custom properties (variables) and global resets',
                purpose: 'Defines the design system variables and global box-sizing reset',
                loadOrder: 1,
                required: true
              },
              {
                name: 'main.css', 
                description: 'Core typography and base element styles',
                purpose: 'Typography, font weights, and common utility classes',
                loadOrder: 2,
                required: true
              },
              {
                name: 'tag-only-selectors.css',
                description: 'Global HTML tag styling (h1-h6, body, hr, etc.)',
                purpose: 'Consistent styling for all HTML elements',
                loadOrder: 3,
                required: true
              },
              {
                name: 'bootstrap/style.css',
                description: 'Bootstrap-style utility classes with ihub- prefix',
                purpose: 'Utility classes for layout, spacing, display, etc.',
                loadOrder: 4,
                required: true
              }
            ],
            cssVariables: [
              '--DarkCyan: #00838f',
              '--TurkishRose: #bc658d', 
              '--Gunmetal: #2c333a',
              '--ViridianGreen: #009ba2',
              '--White: #ffffff',
              '--Danger: #ea5f5e',
              '--FadeGlass: #ffffffe6',
              '--Main-Gradient: linear-gradient(79.85deg, #009ba2 -20.87%, #bc658d 87.74%)',
              '--Dark-Gradient: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(33, 33, 33, 1) 35%, rgba(79, 79, 79, 1) 100%)',
              '--Nunito: Nunito, sans-serif',
              '--Montserat: Montserrat, sans-serif'
            ],
            utilityClasses: [
              'ihub-d-none', 'ihub-d-block', 'ihub-d-flex', 'ihub-d-inline',
              'ihub-m-0', 'ihub-m-1', 'ihub-m-2', 'ihub-m-3', 'ihub-m-4', 'ihub-m-5',
              'ihub-p-0', 'ihub-p-1', 'ihub-p-2', 'ihub-p-3', 'ihub-p-4', 'ihub-p-5',
              'ihub-text-left', 'ihub-text-center', 'ihub-text-right',
              'ihub-fs-1', 'ihub-fs-2', 'ihub-fs-3', 'ihub-fs-4', 'ihub-fs-5', 'ihub-fs-6',
              'ihub-w-25', 'ihub-w-50', 'ihub-w-75', 'ihub-w-100',
              'ihub-h-25', 'ihub-h-50', 'ihub-h-75', 'ihub-h-100'
            ],
            themes: ['light', 'dark'],
            loadingOrder: [
              '1. root.css (CSS variables)',
              '2. main.css (typography)', 
              '3. tag-only-selectors.css (global tags)',
              '4. bootstrap/style.css (utilities)',
              '5. Category-specific CSS files',
              '6. Component-specific CSS files'
            ],
            integrationGuide: {
              nextjs: [
                'Import CSS in _app.tsx or layout.tsx',
                'Use CSS modules or global imports',
                'Import in the correct order for proper cascading'
              ],
              react: [
                'Import CSS files in index.js or App.js',
                'Ensure proper loading order',
                'Use CSS custom properties for theming'
              ],
              vite: [
                'Import CSS in main.tsx or App.tsx', 
                'Configure PostCSS if using CSS processing',
                'Use CSS variables for consistent theming'
              ]
            }
          },
        },
        codeGeneration: this.generateCodeTemplates(),
        searchIndex: this.generateEnhancedSearchIndex(enhancedComponents),
      };

      // Write enhanced export
      console.log('💾 Writing enhanced data export...');
      const exportPath = path.join(this.outputPath, 'enhanced-export.json');
      fs.writeFileSync(exportPath, JSON.stringify(enhancedExport, null, 2));

      // Write compact version for quick loading
      const compactExport = {
        metadata: enhancedExport.metadata,
        components: enhancedComponents.map(c => ({
          name: c.name,
          description: c.description,
          category: c.category,
          type: c.type,
          tags: c.tags,
          importPath: c.importPath,
        })),
        searchIndex: enhancedExport.searchIndex,
      };

      const compactPath = path.join(this.outputPath, 'enhanced-compact.json');
      fs.writeFileSync(compactPath, JSON.stringify(compactExport, null, 2));

      console.log('✅ Enhanced data export complete!');
      console.log(`\n📊 Enhanced Export Summary:
- Components: ${enhancedComponents.length}
- With Tests: ${enhancedExport.metadata.statistics.withTests}
- With Accessibility: ${enhancedExport.metadata.statistics.withAccessibility}
- Code Templates: ${enhancedExport.codeGeneration.templates.length}
- Patterns: ${enhancedExport.codeGeneration.patterns.length}
- Export Files: enhanced-export.json, enhanced-compact.json
`);

    } catch (error) {
      console.error('❌ Error during enhanced data export:', error);
      throw error;
    }
  }
}

// Export for programmatic use
export { EnhancedDataExporter };

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const exporter = new EnhancedDataExporter();
  exporter.export().catch((error) => {
    console.error('Failed to export enhanced data:', error);
    process.exit(1);
  });
}