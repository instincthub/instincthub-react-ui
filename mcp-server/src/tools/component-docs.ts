import * as fs from 'fs';
import * as path from 'path';
import { ComponentInfo, MCPToolResult, DocumentationLink } from '../types/index.js';

export class ComponentDocsTool {
  private components: ComponentInfo[] = [];
  private componentMap: Map<string, ComponentInfo> = new Map();

  constructor() {
    this.loadComponentData();
  }

  private loadComponentData() {
    try {
      const componentsPath = path.join(__dirname, '../data/components.json');
      if (fs.existsSync(componentsPath)) {
        const data = fs.readFileSync(componentsPath, 'utf-8');
        this.components = JSON.parse(data);
        
        // Create name-to-component mapping for quick lookup
        this.components.forEach(component => {
          this.componentMap.set(component.name.toLowerCase(), component);
        });
      }
    } catch (error) {
      console.error('Error loading component data:', error);
    }
  }

  async execute(args: any): Promise<MCPToolResult> {
    const { 
      component_name, 
      include_examples = true, 
      include_props = true 
    } = args;

    try {
      const component = this.componentMap.get(component_name.toLowerCase());
      
      if (!component) {
        return {
          success: false,
          error: `Component "${component_name}" not found`,
          suggestions: this.getSimilarComponents(component_name),
        };
      }

      const documentation = await this.generateDocumentation(
        component, 
        include_examples, 
        include_props
      );

      return {
        success: true,
        data: documentation,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  private async generateDocumentation(
    component: ComponentInfo, 
    includeExamples: boolean, 
    includeProps: boolean
  ) {
    const doc = {
      name: component.name,
      description: component.description,
      category: component.category,
      type: component.type || 'component',
      tags: component.tags || [],
      
      // Import information
      import: this.generateImportInfo(component),
      
      // Usage information
      usage: this.generateUsageInfo(component),
      
      // Links
      links: this.generateLinks(component),
      
      // Related components
      related: this.getRelatedComponents(component),
    };

    // Add examples if requested
    if (includeExamples) {
      (doc as any).examples = await this.generateExamples(component);
    }

    // Add props if requested
    if (includeProps) {
      (doc as any).props = await this.generatePropsInfo(component);
    }

    return doc;
  }

  private generateImportInfo(component: ComponentInfo) {
    const importPath = this.getImportPath(component);
    
    return {
      es6: `import { ${component.name} } from '@instincthub/react-ui${importPath}';`,
      commonjs: `const { ${component.name} } = require('@instincthub/react-ui${importPath}');`,
      package: `@instincthub/react-ui${importPath}`,
    };
  }

  private generateUsageInfo(component: ComponentInfo) {
    const usage = {
      difficulty: this.assessDifficulty(component),
      prerequisites: this.getPrerequisites(component),
      bestPractices: this.getBestPractices(component),
      commonUse: this.getCommonUseCases(component),
    };

    return usage;
  }

  private generateLinks(component: ComponentInfo): DocumentationLink[] {
    const links: DocumentationLink[] = [
      {
        title: 'Source Code',
        url: `https://github.com/instincthub/instincthub-react-ui/blob/main/${component.repo_path}`,
        type: 'api',
      },
      {
        title: 'Repository',
        url: 'https://github.com/instincthub/instincthub-react-ui',
        type: 'readme',
      },
    ];

    // Add category-specific links
    if (component.category === 'Forms') {
      links.push({
        title: 'Form Components Guide',
        url: `https://github.com/instincthub/instincthub-react-ui/blob/main/src/components/forms/readme/`,
        type: 'guide',
      });
    }

    // Add component-specific README if it exists
    const readmePath = component.repo_path.replace('.tsx', '.md').replace('.ts', '.md');
    if (readmePath !== component.repo_path) {
      links.push({
        title: 'Component README',
        url: `https://github.com/instincthub/instincthub-react-ui/blob/main/${readmePath}`,
        type: 'readme',
      });
    }

    return links;
  }

  private getRelatedComponents(component: ComponentInfo): ComponentInfo[] {
    const related = this.components.filter(c => 
      c.name !== component.name && (
        c.category === component.category ||
        c.tags?.some(tag => component.tags?.includes(tag)) ||
        this.isRelatedByName(c.name, component.name)
      )
    );

    return related.slice(0, 5);
  }

  private async generateExamples(component: ComponentInfo) {
    const examples = [];

    // Basic usage example
    examples.push({
      title: 'Basic Usage',
      description: `Basic implementation of ${component.name}`,
      code: this.generateBasicExample(component),
      language: 'tsx',
    });

    // Category-specific examples
    if (component.category === 'Forms') {
      examples.push({
        title: 'Form Integration',
        description: `Using ${component.name} in a form`,
        code: this.generateFormExample(component),
        language: 'tsx',
      });
    }

    if (component.category === 'UI' && component.name.includes('Table')) {
      examples.push({
        title: 'Table with Data',
        description: `${component.name} with sample data`,
        code: this.generateTableExample(component),
        language: 'tsx',
      });
    }

    return examples;
  }

  private generateBasicExample(component: ComponentInfo): string {
    const importPath = this.getImportPath(component);
    const importStatement = `import { ${component.name} } from '@instincthub/react-ui${importPath}';`;
    
    if (component.type === 'hook') {
      return `${importStatement}

function MyComponent() {
  const ${component.name.replace('use', '').toLowerCase()} = ${component.name}();
  
  return (
    <div>
      {/* Use the hook result here */}
    </div>
  );
}`;
    }

    if (component.type === 'context') {
      return `${importStatement}

function App() {
  return (
    <${component.name}>
      <YourComponent />
    </${component.name}>
  );
}`;
    }

    // Default component example
    return `${importStatement}

function MyComponent() {
  return (
    <div>
      <${component.name} />
    </div>
  );
}`;
  }

  private generateFormExample(component: ComponentInfo): string {
    const importPath = this.getImportPath(component);
    
    return `import { ${component.name} } from '@instincthub/react-ui${importPath}';
import { useState } from 'react';

function MyForm() {
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <${component.name} 
        value={formData.field}
        onChange={(value) => setFormData({...formData, field: value})}
      />
      <button type="submit">Submit</button>
    </form>
  );
}`;
  }

  private generateTableExample(component: ComponentInfo): string {
    const importPath = this.getImportPath(component);
    
    return `import { ${component.name} } from '@instincthub/react-ui${importPath}';

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
];

function MyTable() {
  return (
    <${component.name} 
      data={sampleData}
      columns={columns}
    />
  );
}`;
  }

  private async generatePropsInfo(component: ComponentInfo) {
    // This would typically parse TypeScript files for prop interfaces
    // For now, we'll return common props based on component type
    
    const commonProps = this.getCommonProps(component);
    
    return {
      interface: `${component.name}Props`,
      props: commonProps,
      note: 'Actual props may vary. Check the source code for complete interface.',
    };
  }

  private getCommonProps(component: ComponentInfo) {
    const props = [];

    // Common props for all components
    props.push({
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS class names',
    });

    // Category-specific props
    if (component.category === 'Forms') {
      props.push(
        {
          name: 'value',
          type: 'any',
          required: false,
          description: 'The input value',
        },
        {
          name: 'onChange',
          type: '(value: any) => void',
          required: false,
          description: 'Callback fired when the value changes',
        }
      );
    }

    if (component.name.includes('Button')) {
      props.push(
        {
          name: 'onClick',
          type: '() => void',
          required: false,
          description: 'Callback fired when the button is clicked',
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          description: 'Whether the button is disabled',
        }
      );
    }

    return props;
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

  private assessDifficulty(component: ComponentInfo): 'beginner' | 'intermediate' | 'advanced' {
    if (component.type === 'hook' || component.type === 'context') {
      return 'intermediate';
    }
    
    if (component.name.includes('Chart') || component.name.includes('Table')) {
      return 'intermediate';
    }
    
    if (component.category === 'Library' || component.name.includes('Provider')) {
      return 'advanced';
    }
    
    return 'beginner';
  }

  private getPrerequisites(component: ComponentInfo): string[] {
    const prerequisites = ['React 18+', 'TypeScript (recommended)'];
    
    if (component.category === 'Auth') {
      prerequisites.push('NextAuth.js (for auth components)');
    }
    
    if (component.name.includes('Chart')) {
      prerequisites.push('Recharts library');
    }
    
    if (component.name.includes('Editor')) {
      prerequisites.push('TipTap editor');
    }
    
    return prerequisites;
  }

  private getBestPractices(component: ComponentInfo): string[] {
    const practices = [
      'Always provide accessible labels',
      'Use TypeScript for better type safety',
      'Follow the component API guidelines',
    ];
    
    if (component.category === 'Forms') {
      practices.push('Implement proper form validation');
      practices.push('Handle loading and error states');
    }
    
    if (component.type === 'hook') {
      practices.push('Use hooks at the top level of components');
      practices.push('Follow the rules of hooks');
    }
    
    return practices;
  }

  private getCommonUseCases(component: ComponentInfo): string[] {
    const useCases = [];
    
    if (component.category === 'Forms') {
      useCases.push('User input collection', 'Form validation', 'Data submission');
    } else if (component.category === 'UI') {
      useCases.push('UI layout', 'Data display', 'User interaction');
    } else if (component.category === 'Auth') {
      useCases.push('User authentication', 'Session management', 'Access control');
    }
    
    return useCases;
  }

  private isRelatedByName(name1: string, name2: string): boolean {
    // Simple name similarity check
    const parts1 = name1.toLowerCase().split(/(?=[A-Z])/);
    const parts2 = name2.toLowerCase().split(/(?=[A-Z])/);
    
    return parts1.some(part => parts2.includes(part)) || 
           parts2.some(part => parts1.includes(part));
  }

  private getSimilarComponents(searchName: string): string[] {
    const similar = this.components
      .filter(c => {
        const name = c.name.toLowerCase();
        const search = searchName.toLowerCase();
        return name.includes(search) || search.includes(name) || 
               this.fuzzyMatch(name, search);
      })
      .map(c => c.name)
      .slice(0, 5);
    
    return similar;
  }

  private fuzzyMatch(text: string, term: string): boolean {
    if (term.length < 3) return false;
    
    const textChars = text.toLowerCase().split('');
    const termChars = term.toLowerCase().split('');
    
    let matches = 0;
    for (const char of termChars) {
      if (textChars.includes(char)) {
        matches++;
      }
    }
    
    return matches / termChars.length > 0.6;
  }
}

export default ComponentDocsTool;