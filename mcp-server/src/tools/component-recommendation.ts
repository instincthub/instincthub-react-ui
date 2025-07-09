import * as fs from 'fs';
import * as path from 'path';
import { 
  ComponentInfo, 
  PromptAnalysis, 
  RecommendationResult, 
  ComponentPattern, 
  MCPToolResult 
} from '../types/index.js';

export class ComponentRecommendationTool {
  private components: ComponentInfo[] = [];
  private categories: Map<string, ComponentInfo[]> = new Map();

  constructor() {
    this.loadComponentData();
  }

  private loadComponentData() {
    try {
      const componentsPath = path.join(__dirname, '../data/components.json');
      if (fs.existsSync(componentsPath)) {
        const data = fs.readFileSync(componentsPath, 'utf-8');
        this.components = JSON.parse(data);
        this.groupComponentsByCategory();
      }
    } catch (error) {
      console.error('Error loading component data:', error);
    }
  }

  private groupComponentsByCategory() {
    this.components.forEach(component => {
      if (!this.categories.has(component.category)) {
        this.categories.set(component.category, []);
      }
      this.categories.get(component.category)!.push(component);
    });
  }

  async execute(args: any): Promise<MCPToolResult> {
    const { 
      description, 
      context = '', 
      include_examples = true, 
      complexity = 'medium' 
    } = args;

    try {
      const analysis = this.analyzePrompt(description, context);
      const recommendations = this.generateRecommendations(analysis, complexity);
      
      if (include_examples) {
        recommendations.examples = this.generateCodeExamples(recommendations.primary);
      }

      return {
        success: true,
        data: {
          analysis,
          recommendations,
          totalComponents: this.components.length,
          searchedDescription: description,
          context,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  private analyzePrompt(description: string, context: string): PromptAnalysis {
    const combined = `${description} ${context}`.toLowerCase();
    
    // Extract keywords and patterns
    const keywords = this.extractKeywords(combined);
    const suggestedCategories = this.suggestCategories(combined);
    const uiPatterns = this.identifyUIPatterns(combined);
    const complexity = this.assessComplexity(combined);
    const intent = this.determineIntent(combined);

    return {
      intent,
      keywords,
      suggestedCategories,
      uiPatterns,
      complexity,
      context: combined,
    };
  }

  private extractKeywords(text: string): string[] {
    const keywords: string[] = [];
    
    // UI element keywords
    const uiKeywords = [
      'button', 'input', 'form', 'table', 'chart', 'modal', 'dropdown',
      'navigation', 'menu', 'tab', 'card', 'dialog', 'tooltip', 'badge',
      'pagination', 'search', 'filter', 'upload', 'download', 'editor',
      'dashboard', 'login', 'auth', 'theme', 'cursor', 'animation'
    ];

    // Functionality keywords
    const functionalKeywords = [
      'submit', 'validate', 'search', 'filter', 'sort', 'edit', 'delete',
      'create', 'update', 'display', 'show', 'hide', 'toggle', 'select',
      'choose', 'pick', 'enter', 'type', 'click', 'hover', 'drag'
    ];

    // Data keywords
    const dataKeywords = [
      'data', 'list', 'array', 'object', 'json', 'api', 'server',
      'database', 'storage', 'fetch', 'load', 'save', 'export', 'import'
    ];

    const allKeywords = [...uiKeywords, ...functionalKeywords, ...dataKeywords];
    
    allKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        keywords.push(keyword);
      }
    });

    return [...new Set(keywords)];
  }

  private suggestCategories(text: string): string[] {
    const categories: string[] = [];
    
    // Category mapping based on text patterns
    const categoryPatterns = {
      'Forms': [
        'form', 'input', 'field', 'submit', 'validate', 'enter', 'type',
        'checkbox', 'radio', 'select', 'textarea', 'upload', 'file',
        'search', 'filter', 'dropdown', 'toggle', 'button'
      ],
      'UI': [
        'card', 'modal', 'dialog', 'tooltip', 'badge', 'pagination',
        'table', 'chart', 'graph', 'visualization', 'display', 'show',
        'layout', 'grid', 'list', 'editor', 'viewer', 'picker'
      ],
      'Auth': [
        'login', 'auth', 'authentication', 'user', 'session', 'password',
        'signin', 'signup', 'register', 'profile', 'account', 'security'
      ],
      'Navbar': [
        'navigation', 'menu', 'nav', 'header', 'sidebar', 'breadcrumb',
        'link', 'route', 'page', 'navigate', 'tab', 'tabs'
      ],
      'Status': [
        'error', 'success', 'warning', 'info', 'notification', 'alert',
        'message', 'status', 'state', 'loading', 'spinner', 'progress'
      ],
      'Theme': [
        'theme', 'dark', 'light', 'color', 'style', 'css', 'design',
        'appearance', 'skin', 'mode', 'provider', 'context'
      ],
      'Tabs': [
        'tab', 'tabs', 'tabbed', 'panel', 'section', 'content', 'switch',
        'toggle', 'vertical', 'horizontal'
      ],
      'Cursors': [
        'cursor', 'mouse', 'pointer', 'hover', 'click', 'interaction',
        'animation', 'effect', 'magnetic', 'custom'
      ],
      'Library': [
        'utility', 'helper', 'function', 'tool', 'integration', 'third-party',
        'external', 'api', 'service', 'payment', 'paystack'
      ],
    };

    Object.entries(categoryPatterns).forEach(([category, patterns]) => {
      const hasPattern = patterns.some(pattern => text.includes(pattern));
      if (hasPattern) {
        categories.push(category);
      }
    });

    return categories;
  }

  private identifyUIPatterns(text: string): string[] {
    const patterns: string[] = [];
    
    const uiPatterns = {
      'CRUD Operations': [
        'create', 'read', 'update', 'delete', 'crud', 'manage', 'admin'
      ],
      'Data Entry': [
        'form', 'input', 'field', 'entry', 'submit', 'validate'
      ],
      'Data Display': [
        'table', 'list', 'grid', 'card', 'display', 'show', 'view'
      ],
      'Navigation': [
        'menu', 'nav', 'route', 'link', 'breadcrumb', 'tab', 'sidebar'
      ],
      'Feedback': [
        'alert', 'notification', 'message', 'toast', 'modal', 'dialog'
      ],
      'Data Visualization': [
        'chart', 'graph', 'visualization', 'analytics', 'dashboard'
      ],
      'User Authentication': [
        'login', 'auth', 'signin', 'signup', 'register', 'session'
      ],
      'File Management': [
        'upload', 'download', 'file', 'attachment', 'import', 'export'
      ],
      'Search and Filter': [
        'search', 'filter', 'find', 'query', 'sort', 'pagination'
      ],
      'Interactive Elements': [
        'button', 'toggle', 'switch', 'slider', 'picker', 'selector'
      ],
    };

    Object.entries(uiPatterns).forEach(([pattern, keywords]) => {
      const hasKeywords = keywords.some(keyword => text.includes(keyword));
      if (hasKeywords) {
        patterns.push(pattern);
      }
    });

    return patterns;
  }

  private assessComplexity(text: string): 'simple' | 'medium' | 'complex' {
    let complexityScore = 0;
    
    // Simple indicators
    if (text.includes('basic') || text.includes('simple')) {
      complexityScore -= 2;
    }
    
    // Medium indicators
    if (text.includes('form') || text.includes('table') || text.includes('chart')) {
      complexityScore += 1;
    }
    
    // Complex indicators
    if (text.includes('dashboard') || text.includes('admin') || text.includes('system')) {
      complexityScore += 2;
    }
    
    if (text.includes('integration') || text.includes('api') || text.includes('advanced')) {
      complexityScore += 3;
    }
    
    // Multiple features
    const featureCount = this.extractKeywords(text).length;
    if (featureCount > 5) {
      complexityScore += 2;
    }
    
    if (complexityScore <= 0) return 'simple';
    if (complexityScore <= 3) return 'medium';
    return 'complex';
  }

  private determineIntent(text: string): string {
    const intents = {
      'build-form': ['form', 'input', 'submit', 'validate', 'field'],
      'display-data': ['table', 'list', 'display', 'show', 'data'],
      'create-dashboard': ['dashboard', 'analytics', 'chart', 'overview'],
      'add-navigation': ['navigation', 'menu', 'nav', 'route', 'link'],
      'handle-auth': ['login', 'auth', 'user', 'session', 'signin'],
      'show-feedback': ['message', 'notification', 'alert', 'error'],
      'upload-files': ['upload', 'file', 'attachment', 'import'],
      'search-filter': ['search', 'filter', 'find', 'query', 'sort'],
      'interactive-ui': ['button', 'click', 'hover', 'interaction'],
      'theme-styling': ['theme', 'dark', 'light', 'style', 'color'],
    };

    let bestIntent = 'general-ui';
    let bestScore = 0;

    Object.entries(intents).forEach(([intent, keywords]) => {
      const score = keywords.reduce((acc, keyword) => {
        return acc + (text.includes(keyword) ? 1 : 0);
      }, 0);

      if (score > bestScore) {
        bestScore = score;
        bestIntent = intent;
      }
    });

    return bestIntent;
  }

  private generateRecommendations(
    analysis: PromptAnalysis,
    complexity: string
  ): RecommendationResult {
    const primary = this.findPrimaryComponents(analysis);
    const secondary = this.findSecondaryComponents(analysis, primary);
    const patterns = this.suggestPatterns(analysis, primary);
    const reasoning = this.generateReasoning(analysis, primary, secondary);

    return {
      primary,
      secondary,
      patterns,
      reasoning,
      examples: [], // Will be populated if requested
    };
  }

  private findPrimaryComponents(analysis: PromptAnalysis): ComponentInfo[] {
    const components: ComponentInfo[] = [];
    const scored: Array<{ component: ComponentInfo; score: number }> = [];

    this.components.forEach(component => {
      let score = 0;

      // Category match (high priority)
      if (analysis.suggestedCategories.includes(component.category)) {
        score += 10;
      }

      // Keyword match in name (highest priority)
      analysis.keywords.forEach(keyword => {
        if (component.name.toLowerCase().includes(keyword)) {
          score += 15;
        }
      });

      // Keyword match in description (medium priority)
      analysis.keywords.forEach(keyword => {
        if (component.description.toLowerCase().includes(keyword)) {
          score += 8;
        }
      });

      // Tag match (medium priority)
      component.tags?.forEach(tag => {
        if (analysis.keywords.includes(tag)) {
          score += 5;
        }
      });

      // UI pattern match (medium priority)
      analysis.uiPatterns.forEach(pattern => {
        if (this.componentMatchesPattern(component, pattern)) {
          score += 7;
        }
      });

      // Intent-based scoring
      score += this.scoreByIntent(component, analysis.intent);

      if (score > 0) {
        scored.push({ component, score });
      }
    });

    // Sort by score and return top components
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 8).map(item => item.component);
  }

  private findSecondaryComponents(
    analysis: PromptAnalysis,
    primary: ComponentInfo[]
  ): ComponentInfo[] {
    const primaryNames = new Set(primary.map(c => c.name));
    const secondary: ComponentInfo[] = [];

    // Find related components from same categories
    primary.forEach(component => {
      const relatedFromCategory = this.categories.get(component.category) || [];
      relatedFromCategory.forEach(related => {
        if (!primaryNames.has(related.name) && 
            !secondary.some(s => s.name === related.name)) {
          secondary.push(related);
        }
      });
    });

    // Find complementary components
    const complementary = this.findComplementaryComponents(primary);
    complementary.forEach(comp => {
      if (!primaryNames.has(comp.name) && 
          !secondary.some(s => s.name === comp.name)) {
        secondary.push(comp);
      }
    });

    return secondary.slice(0, 6);
  }

  private componentMatchesPattern(component: ComponentInfo, pattern: string): boolean {
    const patternMappings = {
      'CRUD Operations': ['Table', 'Button', 'Form', 'Modal', 'Input'],
      'Data Entry': ['Input', 'Field', 'Form', 'Button', 'Validate'],
      'Data Display': ['Table', 'List', 'Card', 'Chart', 'Display'],
      'Navigation': ['Nav', 'Menu', 'Link', 'Breadcrumb', 'Tab'],
      'Feedback': ['Modal', 'Alert', 'Message', 'Toast', 'Error'],
      'Data Visualization': ['Chart', 'Graph', 'Dashboard', 'Analytics'],
      'User Authentication': ['Login', 'Auth', 'Session', 'User', 'Password'],
      'File Management': ['Upload', 'Download', 'File', 'Attachment'],
      'Search and Filter': ['Search', 'Filter', 'Sort', 'Pagination'],
      'Interactive Elements': ['Button', 'Toggle', 'Switch', 'Picker'],
    };

    const mappings = patternMappings[pattern as keyof typeof patternMappings] || [];
    return mappings.some(mapping => component.name.includes(mapping));
  }

  private scoreByIntent(component: ComponentInfo, intent: string): number {
    const intentScoring = {
      'build-form': {
        'Forms': 5,
        'UI': 2,
      },
      'display-data': {
        'UI': 5,
        'Forms': 1,
      },
      'create-dashboard': {
        'UI': 5,
        'Status': 3,
      },
      'add-navigation': {
        'Navbar': 5,
        'Tabs': 3,
      },
      'handle-auth': {
        'Auth': 5,
        'Forms': 2,
      },
      'show-feedback': {
        'Status': 5,
        'UI': 2,
      },
      'theme-styling': {
        'Theme': 5,
        'Cursors': 2,
      },
    };

    const scoring = intentScoring[intent as keyof typeof intentScoring];
    return scoring ? (scoring[component.category as keyof typeof scoring] || 0) : 0;
  }

  private findComplementaryComponents(primary: ComponentInfo[]): ComponentInfo[] {
    const complementary: ComponentInfo[] = [];
    
    primary.forEach(component => {
      // If there's a form component, suggest submit button
      if (component.name.includes('Input') || component.name.includes('Field')) {
        const submitButton = this.components.find(c => c.name === 'SubmitButton');
        if (submitButton) complementary.push(submitButton);
      }
      
      // If there's a table, suggest pagination
      if (component.name.includes('Table')) {
        const pagination = this.components.find(c => c.name === 'Pagination');
        if (pagination) complementary.push(pagination);
      }
      
      // If there's auth, suggest providers
      if (component.category === 'Auth') {
        const providers = this.components.filter(c => c.name.includes('Provider'));
        complementary.push(...providers);
      }
    });

    return complementary;
  }

  private suggestPatterns(
    analysis: PromptAnalysis,
    primary: ComponentInfo[]
  ): ComponentPattern[] {
    const patterns: ComponentPattern[] = [];

    // Form pattern
    if (analysis.suggestedCategories.includes('Forms')) {
      patterns.push(this.createFormPattern(primary));
    }

    // Dashboard pattern
    if (analysis.uiPatterns.includes('Data Visualization')) {
      patterns.push(this.createDashboardPattern(primary));
    }

    // Navigation pattern
    if (analysis.suggestedCategories.includes('Navbar')) {
      patterns.push(this.createNavigationPattern(primary));
    }

    // Auth pattern
    if (analysis.suggestedCategories.includes('Auth')) {
      patterns.push(this.createAuthPattern(primary));
    }

    return patterns;
  }

  private createFormPattern(components: ComponentInfo[]): ComponentPattern {
    const formComponents = components.filter(c => 
      c.category === 'Forms' || c.name.includes('Input') || c.name.includes('Button')
    );

    return {
      name: 'Form Pattern',
      description: 'Complete form with validation and submission',
      components: formComponents,
      useCase: 'User input collection, data validation, form submission',
      code: `import { ${formComponents.map(c => c.name).join(', ')} } from '@instincthub/react-ui';

const MyForm = () => {
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};`,
    };
  }

  private createDashboardPattern(components: ComponentInfo[]): ComponentPattern {
    const dashboardComponents = components.filter(c => 
      c.name.includes('Chart') || c.name.includes('Table') || c.name.includes('Card')
    );

    return {
      name: 'Dashboard Pattern',
      description: 'Analytics dashboard with charts and data tables',
      components: dashboardComponents,
      useCase: 'Data visualization, analytics display, reporting',
      code: `import { ${dashboardComponents.map(c => c.name).join(', ')} } from '@instincthub/react-ui';

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Dashboard components */}
    </div>
  );
};`,
    };
  }

  private createNavigationPattern(components: ComponentInfo[]): ComponentPattern {
    const navComponents = components.filter(c => c.category === 'Navbar');

    return {
      name: 'Navigation Pattern',
      description: 'Complete navigation system with menus and breadcrumbs',
      components: navComponents,
      useCase: 'Site navigation, menu systems, breadcrumb trails',
      code: `import { ${navComponents.map(c => c.name).join(', ')} } from '@instincthub/react-ui';

const Navigation = () => {
  return (
    <nav>
      {/* Navigation components */}
    </nav>
  );
};`,
    };
  }

  private createAuthPattern(components: ComponentInfo[]): ComponentPattern {
    const authComponents = components.filter(c => c.category === 'Auth');

    return {
      name: 'Authentication Pattern',
      description: 'User authentication and session management',
      components: authComponents,
      useCase: 'User login, registration, session handling',
      code: `import { ${authComponents.map(c => c.name).join(', ')} } from '@instincthub/react-ui';

const AuthProvider = ({ children }) => {
  return (
    <div>
      {/* Auth components */}
      {children}
    </div>
  );
};`,
    };
  }

  private generateReasoning(
    analysis: PromptAnalysis,
    primary: ComponentInfo[],
    secondary: ComponentInfo[]
  ): string {
    const reasons: string[] = [];

    reasons.push(`Based on your description, I identified the intent as "${analysis.intent}"`);
    
    if (analysis.suggestedCategories.length > 0) {
      reasons.push(`The suggested categories are: ${analysis.suggestedCategories.join(', ')}`);
    }

    if (analysis.uiPatterns.length > 0) {
      reasons.push(`I detected these UI patterns: ${analysis.uiPatterns.join(', ')}`);
    }

    reasons.push(`I found ${primary.length} primary components that directly match your requirements`);
    
    if (secondary.length > 0) {
      reasons.push(`I also suggest ${secondary.length} secondary components that complement the primary ones`);
    }

    reasons.push(`The complexity level is assessed as "${analysis.complexity}"`);

    return reasons.join('. ') + '.';
  }

  private generateCodeExamples(components: ComponentInfo[]) {
    const examples = [];
    
    // Generate a basic example
    examples.push({
      title: 'Basic Usage',
      description: 'Basic implementation of recommended components',
      code: this.generateBasicUsageCode(components),
      language: 'tsx',
      imports: this.generateImports(components).split('\n').filter(line => line.trim()),
    });

    // Generate pattern-specific examples based on components
    if (components.some(c => c.category === 'Forms')) {
      examples.push({
        title: 'Form Implementation',
        description: 'Complete form with recommended components',
        code: this.generateFormCode(components),
        language: 'tsx',
        imports: this.generateImports(components).split('\n').filter(line => line.trim()),
      });
    }

    return examples;
  }

  private generateBasicUsageCode(components: ComponentInfo[]): string {
    const imports = this.generateImports(components);
    const usage = components.map(c => `    <${c.name} />`).join('\n');
    
    return `${imports}
import React from 'react';

const MyComponent = () => {
  return (
    <div>
${usage}
    </div>
  );
};

export default MyComponent;`;
  }

  private generateFormCode(components: ComponentInfo[]): string {
    const imports = this.generateImports(components);
    const formComponents = components.filter(c => 
      c.category === 'Forms' || c.name.includes('Input') || c.name.includes('Button')
    );
    
    const fields = formComponents.map(c => {
      if (c.name.includes('Button')) {
        return `      <${c.name} type="submit">Submit</${c.name}>`;
      }
      return `      <${c.name} />`;
    }).join('\n');

    return `${imports}
import React, { useState } from 'react';

const MyForm = () => {
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
${fields}
    </form>
  );
};

export default MyForm;`;
  }

  private generateImports(components: ComponentInfo[]): string {
    const importGroups = new Map<string, string[]>();
    
    components.forEach(component => {
      const importPath = this.getImportPath(component);
      const fullPath = `@instincthub/react-ui${importPath}`;
      
      if (!importGroups.has(fullPath)) {
        importGroups.set(fullPath, []);
      }
      
      importGroups.get(fullPath)!.push(component.name);
    });

    const imports: string[] = [];
    importGroups.forEach((componentNames, path) => {
      imports.push(`import { ${componentNames.join(', ')} } from '${path}';`);
    });

    return imports.join('\n');
  }

  private getImportPath(component: ComponentInfo): string {
    if (component.repo_path.includes('/lib/')) {
      return '/lib';
    } else if (component.repo_path.includes('/redux/')) {
      return '/redux';
    } else if (component.repo_path.includes('/cursors/')) {
      return '/cursors';
    } else if (component.repo_path.includes('/types/')) {
      return '/types';
    } else if (component.repo_path.includes('/ssr')) {
      return '/ssr';
    }
    return '';
  }
}

export default ComponentRecommendationTool;