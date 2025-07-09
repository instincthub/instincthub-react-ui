import * as fs from 'fs';
import * as path from 'path';
import { ComponentInfo, CodeExample, MCPToolResult } from '../types/index.js';

export class CodeGeneratorTool {
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
      components, 
      pattern = 'basic', 
      framework = 'react', 
      typescript = true 
    } = args;

    try {
      // Validate components exist
      const validComponents = this.validateComponents(components);
      if (validComponents.length === 0) {
        return {
          success: false,
          error: 'No valid components found',
          suggestions: ['Check component names and try again'],
        };
      }

      const codeExamples = this.generateCodeExamples(
        validComponents,
        pattern,
        framework,
        typescript
      );

      return {
        success: true,
        data: {
          pattern,
          framework,
          typescript,
          components: validComponents.map(c => c.name),
          examples: codeExamples,
          installation: this.generateInstallationInstructions(framework),
          setup: this.generateSetupInstructions(framework, typescript),
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  private validateComponents(componentNames: string[]): ComponentInfo[] {
    const validComponents: ComponentInfo[] = [];
    
    for (const name of componentNames) {
      const component = this.componentMap.get(name.toLowerCase());
      if (component) {
        validComponents.push(component);
      }
    }
    
    return validComponents;
  }

  private generateCodeExamples(
    components: ComponentInfo[],
    pattern: string,
    framework: string,
    typescript: boolean
  ): CodeExample[] {
    const examples: CodeExample[] = [];

    switch (pattern) {
      case 'basic':
        examples.push(this.generateBasicExample(components, framework, typescript));
        break;
      case 'form':
        examples.push(this.generateFormExample(components, framework, typescript));
        break;
      case 'dashboard':
        examples.push(this.generateDashboardExample(components, framework, typescript));
        break;
      case 'navigation':
        examples.push(this.generateNavigationExample(components, framework, typescript));
        break;
      case 'authentication':
        examples.push(this.generateAuthExample(components, framework, typescript));
        break;
      case 'custom':
        examples.push(this.generateCustomExample(components, framework, typescript));
        break;
      default:
        examples.push(this.generateBasicExample(components, framework, typescript));
    }

    return examples;
  }

  private generateBasicExample(
    components: ComponentInfo[],
    framework: string,
    typescript: boolean
  ): CodeExample {
    const imports = this.generateImports(components);
    const fileExtension = typescript ? 'tsx' : 'jsx';
    const typeAnnotations = typescript ? ': React.FC' : '';
    
    const componentUsage = components.map(component => {
      if (component.type === 'hook') {
        return `  const ${component.name.replace('use', '').toLowerCase()} = ${component.name}();`;
      } else if (component.type === 'context') {
        return `    <${component.name}>
      <YourContent />
    </${component.name}>`;
      } else {
        return `    <${component.name} />`;
      }
    }).join('\n');

    const code = `${imports}
import React from 'react';

const MyComponent${typeAnnotations} = () => {
${components.some(c => c.type === 'hook') ? components.filter(c => c.type === 'hook').map(c => `  const ${c.name.replace('use', '').toLowerCase()} = ${c.name}();`).join('\n') + '\n' : ''}
  return (
    <div>
${componentUsage}
    </div>
  );
};

export default MyComponent;`;

    return {
      title: 'Basic Usage',
      description: 'Basic implementation of the selected components',
      code,
      language: fileExtension,
      imports: imports.split('\n').filter(line => line.trim()),
      dependencies: this.getComponentDependencies(components),
    };
  }

  private generateFormExample(
    components: ComponentInfo[],
    framework: string,
    typescript: boolean
  ): CodeExample {
    const imports = this.generateImports(components);
    const fileExtension = typescript ? 'tsx' : 'jsx';
    const typeAnnotations = typescript ? ': React.FC' : '';
    const stateType = typescript ? '<{[key: string]: any}>' : '';
    
    const formComponents = components.filter(c => 
      c.category === 'Forms' || c.name.includes('Input') || c.name.includes('Button')
    );

    const formFields = formComponents.map(component => {
      if (component.name.includes('Submit') || component.name.includes('Button')) {
        return `        <${component.name} type="submit">
          Submit
        </${component.name}>`;
      } else {
        const fieldName = component.name.replace(/Input|Field/g, '').toLowerCase();
        return `        <${component.name}
          value={formData.${fieldName}}
          onChange={(value) => setFormData({...formData, ${fieldName}: value})}
          placeholder="Enter ${fieldName}"
        />`;
      }
    }).join('\n');

    const code = `${imports}
import React, { useState } from 'react';

const MyForm${typeAnnotations} = () => {
  const [formData, setFormData] = useState${stateType}({});

  const handleSubmit = (e${typescript ? ': React.FormEvent' : ''}) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
${formFields}
      </div>
    </form>
  );
};

export default MyForm;`;

    return {
      title: 'Form Implementation',
      description: 'Complete form with validation and submission',
      code,
      language: fileExtension,
      imports: imports.split('\n').filter(line => line.trim()),
      dependencies: this.getComponentDependencies(components),
    };
  }

  private generateDashboardExample(
    components: ComponentInfo[],
    framework: string,
    typescript: boolean
  ): CodeExample {
    const imports = this.generateImports(components);
    const fileExtension = typescript ? 'tsx' : 'jsx';
    const typeAnnotations = typescript ? ': React.FC' : '';
    
    const dashboardComponents = components.map(component => {
      if (component.name.includes('Chart')) {
        return `      <div className="dashboard-card">
        <h3>Analytics</h3>
        <${component.name} data={sampleData} />
      </div>`;
      } else if (component.name.includes('Table')) {
        return `      <div className="dashboard-card">
        <h3>Data Table</h3>
        <${component.name} data={sampleData} columns={columns} />
      </div>`;
      } else if (component.name.includes('Card')) {
        return `      <${component.name}>
        <h3>Dashboard Item</h3>
        <p>Dashboard content here</p>
      </${component.name}>`;
      } else {
        return `      <${component.name} />`;
      }
    }).join('\n');

    const code = `${imports}
import React from 'react';

const sampleData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'value', label: 'Value' },
];

const Dashboard${typeAnnotations} = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-grid">
${dashboardComponents}
      </div>
    </div>
  );
};

export default Dashboard;`;

    return {
      title: 'Dashboard Layout',
      description: 'Dashboard with charts, tables, and cards',
      code,
      language: fileExtension,
      imports: imports.split('\n').filter(line => line.trim()),
      dependencies: this.getComponentDependencies(components),
    };
  }

  private generateNavigationExample(
    components: ComponentInfo[],
    framework: string,
    typescript: boolean
  ): CodeExample {
    const imports = this.generateImports(components);
    const fileExtension = typescript ? 'tsx' : 'jsx';
    const typeAnnotations = typescript ? ': React.FC' : '';
    
    const navigationComponents = components.filter(c => 
      c.category === 'Navbar' || c.name.includes('Nav') || c.name.includes('Menu')
    );

    const navContent = navigationComponents.map(component => {
      if (component.name.includes('Side')) {
        return `      <${component.name} />`;
      } else if (component.name.includes('Breadcrumb')) {
        return `      <${component.name} items={breadcrumbItems} />`;
      } else {
        return `      <${component.name} />`;
      }
    }).join('\n');

    const code = `${imports}
import React from 'react';

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Settings', href: '/settings' },
];

const Navigation${typeAnnotations} = () => {
  return (
    <nav>
${navContent}
    </nav>
  );
};

export default Navigation;`;

    return {
      title: 'Navigation Structure',
      description: 'Complete navigation with menus and breadcrumbs',
      code,
      language: fileExtension,
      imports: imports.split('\n').filter(line => line.trim()),
      dependencies: this.getComponentDependencies(components),
    };
  }

  private generateAuthExample(
    components: ComponentInfo[],
    framework: string,
    typescript: boolean
  ): CodeExample {
    const imports = this.generateImports(components);
    const fileExtension = typescript ? 'tsx' : 'jsx';
    const typeAnnotations = typescript ? ': React.FC' : '';
    
    const authComponents = components.filter(c => c.category === 'Auth');
    
    const authContent = authComponents.map(component => {
      if (component.name.includes('Login')) {
        return `      <${component.name} onLogin={handleLogin} />`;
      } else if (component.name.includes('Provider')) {
        return `    <${component.name}>
      <AppContent />
    </${component.name}>`;
      } else {
        return `      <${component.name} />`;
      }
    }).join('\n');

    const code = `${imports}
import React from 'react';

const AuthApp${typeAnnotations} = () => {
  const handleLogin = (credentials${typescript ? ': any' : ''}) => {
    console.log('Login:', credentials);
  };

  return (
    <div>
${authContent}
    </div>
  );
};

export default AuthApp;`;

    return {
      title: 'Authentication Setup',
      description: 'Authentication components and providers',
      code,
      language: fileExtension,
      imports: imports.split('\n').filter(line => line.trim()),
      dependencies: this.getComponentDependencies(components),
    };
  }

  private generateCustomExample(
    components: ComponentInfo[],
    framework: string,
    typescript: boolean
  ): CodeExample {
    const imports = this.generateImports(components);
    const fileExtension = typescript ? 'tsx' : 'jsx';
    const typeAnnotations = typescript ? ': React.FC' : '';
    
    const componentUsage = components.map(component => {
      return `    <${component.name} />`;
    }).join('\n');

    const code = `${imports}
import React from 'react';

const CustomComponent${typeAnnotations} = () => {
  return (
    <div className="custom-layout">
${componentUsage}
    </div>
  );
};

export default CustomComponent;`;

    return {
      title: 'Custom Implementation',
      description: 'Custom layout with selected components',
      code,
      language: fileExtension,
      imports: imports.split('\n').filter(line => line.trim()),
      dependencies: this.getComponentDependencies(components),
    };
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

  private getComponentDependencies(components: ComponentInfo[]): string[] {
    const dependencies = new Set<string>();
    
    components.forEach(component => {
      if (component.name.includes('Chart')) {
        dependencies.add('recharts');
      }
      if (component.name.includes('Editor')) {
        dependencies.add('@tiptap/react');
        dependencies.add('@tiptap/starter-kit');
      }
      if (component.category === 'Auth') {
        dependencies.add('next-auth');
      }
    });

    return Array.from(dependencies);
  }

  private generateInstallationInstructions(framework: string): string {
    const baseInstall = 'npm install @instincthub/react-ui';
    
    if (framework === 'nextjs') {
      return `${baseInstall}
npm install next-auth  # For auth components
npm install recharts   # For chart components`;
    }
    
    return baseInstall;
  }

  private generateSetupInstructions(framework: string, typescript: boolean): string {
    const baseSetup = `// Import CSS in your main file
import '@instincthub/react-ui/dist/assets/css/main.css';

// Import components
import { ComponentName } from '@instincthub/react-ui';`;

    if (framework === 'nextjs') {
      return `${baseSetup}

// For Next.js, add to your _app.js or _app.tsx:
import type { AppProps } from 'next/app';
import '@instincthub/react-ui/dist/assets/css/main.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;`;
    }

    return baseSetup;
  }
}

export default CodeGeneratorTool;