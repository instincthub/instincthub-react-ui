import { NextRequest, NextResponse } from 'next/server';
import { ComponentInfo, DocsRequest, DocsResponse } from '@/__examples__/src/types/components';
import componentsData from '@/__examples__/src/data/components.json';

class ComponentDocsAPI {
  private components: ComponentInfo[] = componentsData as ComponentInfo[];
  private componentMap: Map<string, ComponentInfo> = new Map();

  constructor() {
    this.components.forEach(component => {
      this.componentMap.set(component.name.toLowerCase(), component);
    });
  }

  async execute(
    component_name: string,
    include_examples: boolean = true,
    include_props: boolean = true,
    include_styling: boolean = false
  ): Promise<DocsResponse | { error: string; suggestions: string[] }> {
    const component = this.componentMap.get(component_name.toLowerCase());
    
    if (!component) {
      return {
        error: `Component "${component_name}" not found`,
        suggestions: this.getSimilarComponents(component_name),
      };
    }

    const documentation = await this.generateDocumentation(
      component, 
      include_examples, 
      include_props,
      include_styling
    );

    return {
      component,
      documentation,
      relatedComponents: this.getRelatedComponents(component),
    };
  }

  private async generateDocumentation(
    component: ComponentInfo, 
    includeExamples: boolean, 
    includeProps: boolean,
    includeStyling: boolean
  ) {
    const doc: any = {
      overview: this.generateOverview(component),
      usage: this.generateUsageInfo(component),
    };

    if (includeExamples) {
      doc.examples = await this.generateExamples(component);
    }

    if (includeProps) {
      doc.props = await this.generatePropsInfo(component);
    }

    if (includeStyling) {
      doc.styling = this.generateStylingInfo(component);
    }

    return doc;
  }

  private generateOverview(component: ComponentInfo): string {
    const difficulty = this.assessDifficulty(component);
    const prerequisites = this.getPrerequisites(component);
    const importPath = this.getImportPath(component);
    
    return `
## ${component.name}

${component.description}

**Category:** ${component.category}  
**Type:** ${component.type}  
**Difficulty:** ${difficulty}  
**Import:** \`import { ${component.name} } from '@instincthub/react-ui${importPath}';\`

### Prerequisites
${prerequisites.map(p => `- ${p}`).join('\n')}

### Best Practices
${this.getBestPractices(component).map(p => `- ${p}`).join('\n')}

### Common Use Cases
${this.getCommonUseCases(component).map(u => `- ${u}`).join('\n')}

### Links
- [Source Code](https://github.com/instincthub/instincthub-react-ui/blob/main/${component.repo_path})
- [Repository](https://github.com/instincthub/instincthub-react-ui)
`.trim();
  }

  private generateUsageInfo(component: ComponentInfo): string {
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

    return `${importStatement}

function MyComponent() {
  return (
    <div>
      <${component.name} />
    </div>
  );
}`;
  }

  private async generateExamples(component: ComponentInfo) {
    const examples = [];

    // Basic usage example
    examples.push({
      title: 'Basic Usage',
      description: `Basic implementation of ${component.name}`,
      code: this.generateBasicExample(component),
    });

    // Category-specific examples
    if (component.category === 'Forms') {
      examples.push({
        title: 'Form Integration',
        description: `Using ${component.name} in a form`,
        code: this.generateFormExample(component),
      });
    }

    if (component.category === 'UI' && component.name.includes('Table')) {
      examples.push({
        title: 'Table with Data',
        description: `${component.name} with sample data`,
        code: this.generateTableExample(component),
      });
    }

    if (component.category === 'Charts' || component.name.includes('Chart')) {
      examples.push({
        title: 'Chart with Data',
        description: `${component.name} with sample data`,
        code: this.generateChartExample(component),
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

  private generateChartExample(component: ComponentInfo): string {
    const importPath = this.getImportPath(component);
    
    return `import { ${component.name} } from '@instincthub/react-ui${importPath}';

const chartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 450 },
];

function MyChart() {
  return (
    <${component.name} 
      data={chartData}
      width={400}
      height={300}
    />
  );
}`;
  }

  private async generatePropsInfo(component: ComponentInfo) {
    const commonProps = this.getCommonProps(component);
    
    return commonProps;
  }

  private generateStylingInfo(component: ComponentInfo) {
    const classes = this.getCSSClasses(component);
    
    return {
      classes,
      customization: `The ${component.name} component can be customized using CSS classes or styled-components. Check the source code for specific class names.`,
    };
  }

  private getCSSClasses(component: ComponentInfo): string[] {
    const classes = [];
    
    // Generate likely CSS class names based on component name
    const kebabName = component.name.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);
    
    classes.push(`ihub-${kebabName}`);
    classes.push(`${kebabName}-container`);
    
    if (component.category === 'Forms') {
      classes.push(`${kebabName}-input`, `${kebabName}-label`, `${kebabName}-error`);
    }
    
    if (component.name.includes('Button')) {
      classes.push(`${kebabName}-primary`, `${kebabName}-secondary`, `${kebabName}-disabled`);
    }
    
    return classes;
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
        },
        {
          name: 'placeholder',
          type: 'string',
          required: false,
          description: 'Placeholder text',
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          description: 'Whether the input is disabled',
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
        },
        {
          name: 'variant',
          type: "'primary' | 'secondary' | 'danger'",
          required: false,
          description: 'Button variant',
          default: 'primary',
        }
      );
    }

    if (component.name.includes('Table')) {
      props.push(
        {
          name: 'data',
          type: 'any[]',
          required: true,
          description: 'Table data array',
        },
        {
          name: 'columns',
          type: 'Column[]',
          required: true,
          description: 'Table column definitions',
        }
      );
    }

    return props;
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

const docsAPI = new ComponentDocsAPI();

export async function POST(request: NextRequest) {
  try {
    const { 
      component_name, 
      include_examples = true, 
      include_props = true,
      include_styling = false 
    } = await request.json();

    if (!component_name || typeof component_name !== 'string') {
      return NextResponse.json(
        { error: 'component_name parameter is required and must be a string' },
        { status: 400 }
      );
    }

    const result = await docsAPI.execute(component_name, include_examples, include_props, include_styling);

    if ('error' in result) {
      return NextResponse.json(result, { status: 404 });
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Docs API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const component_name = searchParams.get('component_name');
    const include_examples = searchParams.get('include_examples') !== 'false';
    const include_props = searchParams.get('include_props') !== 'false';
    const include_styling = searchParams.get('include_styling') === 'true';

    if (!component_name) {
      return NextResponse.json(
        { error: 'component_name parameter is required' },
        { status: 400 }
      );
    }

    const result = await docsAPI.execute(component_name, include_examples, include_props, include_styling);

    if ('error' in result) {
      return NextResponse.json(result, { status: 404 });
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Docs API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}