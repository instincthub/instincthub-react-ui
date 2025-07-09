import { NextRequest, NextResponse } from 'next/server';
import { ComponentInfo, CodeGenerationRequest, CodeGenerationResponse } from '@/__examples__/src/types/components';
import componentsData from '@/__examples__/src/data/components.json';

interface CodeExample {
  title: string;
  description: string;
  code: string;
  language: string;
  imports: string[];
  dependencies: string[];
}

class CodeGeneratorAPI {
  private components: ComponentInfo[] = componentsData as ComponentInfo[];
  private componentMap: Map<string, ComponentInfo> = new Map();

  constructor() {
    this.components.forEach(component => {
      this.componentMap.set(component.name.toLowerCase(), component);
    });
  }

  async execute(
    components: string[],
    pattern: string = 'basic',
    framework: string = 'react',
    typescript: boolean = true,
    styling: 'css' | 'tailwind' | 'styled-components' = 'css'
  ): Promise<CodeGenerationResponse> {
    const validComponents = this.validateComponents(components);
    
    if (validComponents.length === 0) {
      throw new Error('No valid components found');
    }

    const codeExample = this.generateCodeExample(
      validComponents,
      pattern,
      framework,
      typescript,
      styling
    );

    const imports = this.generateImports(validComponents);
    const stylingCode = this.generateStyling(validComponents, styling);
    const usage = this.generateUsage(validComponents, pattern);
    const explanation = this.generateExplanation(validComponents, pattern);

    return {
      imports,
      component: codeExample.code,
      styling: stylingCode,
      usage,
      explanation,
    };
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

  private generateCodeExample(
    components: ComponentInfo[],
    pattern: string,
    framework: string,
    typescript: boolean,
    styling: string
  ): CodeExample {
    switch (pattern) {
      case 'basic':
        return this.generateBasicExample(components, framework, typescript, styling);
      case 'form':
        return this.generateFormExample(components, framework, typescript, styling);
      case 'dashboard':
        return this.generateDashboardExample(components, framework, typescript, styling);
      case 'navigation':
        return this.generateNavigationExample(components, framework, typescript, styling);
      case 'authentication':
        return this.generateAuthExample(components, framework, typescript, styling);
      case 'table':
        return this.generateTableExample(components, framework, typescript, styling);
      case 'modal':
        return this.generateModalExample(components, framework, typescript, styling);
      default:
        return this.generateBasicExample(components, framework, typescript, styling);
    }
  }

  private generateBasicExample(
    components: ComponentInfo[],
    framework: string,
    typescript: boolean,
    styling: string
  ): CodeExample {
    const imports = this.generateImports(components);
    const fileExtension = typescript ? 'tsx' : 'jsx';
    const typeAnnotations = typescript ? ': React.FC' : '';
    
    const componentUsage = components.map(component => {
      if (component.type === 'hook') {
        return `  const ${component.name.replace('use', '').toLowerCase()} = ${component.name}();`;
      } else if (component.type === 'context') {
        return `      <${component.name}>
        <YourContent />
      </${component.name}>`;
      } else {
        return `      <${component.name} />`;
      }
    }).join('\n');

    const hooks = components.filter(c => c.type === 'hook').map(c => 
      `  const ${c.name.replace('use', '').toLowerCase()} = ${c.name}();`
    ).join('\n');

    const code = `${imports}
import React from 'react';

const MyComponent${typeAnnotations} = () => {
${hooks ? hooks + '\n' : ''}
  return (
    <div className="component-container">
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
    typescript: boolean,
    styling: string
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
        return `        <${component.name} type="submit" className="submit-button">
          Submit Form
        </${component.name}>`;
      } else {
        const fieldName = component.name.replace(/Input|Field/g, '').toLowerCase();
        return `        <${component.name}
          value={formData.${fieldName}}
          onChange={(value) => setFormData({...formData, ${fieldName}: value})}
          placeholder="Enter ${fieldName}"
          className="form-field"
        />`;
      }
    }).join('\n');

    const code = `${imports}
import React, { useState } from 'react';

const MyForm${typeAnnotations} = () => {
  const [formData, setFormData] = useState${stateType}({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e${typescript ? ': React.FormEvent' : ''}) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Your form submission logic here
      console.log('Form submitted:', formData);
      
      // Reset form after successful submission
      setFormData({});
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Form Example</h2>
      <div className="form-fields">
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
    typescript: boolean,
    styling: string
  ): CodeExample {
    const imports = this.generateImports(components);
    const fileExtension = typescript ? 'tsx' : 'jsx';
    const typeAnnotations = typescript ? ': React.FC' : '';
    
    const dashboardComponents = components.map(component => {
      if (component.name.includes('Chart')) {
        return `      <div className="dashboard-card">
        <h3>Analytics Chart</h3>
        <${component.name} data={chartData} width={400} height={300} />
      </div>`;
      } else if (component.name.includes('Table')) {
        return `      <div className="dashboard-card">
        <h3>Data Table</h3>
        <${component.name} data={tableData} columns={columns} />
      </div>`;
      } else if (component.name.includes('Card')) {
        return `      <${component.name} className="dashboard-card">
        <h3>Dashboard Item</h3>
        <p>Dashboard content here</p>
      </${component.name}>`;
      } else {
        return `      <div className="dashboard-card">
        <${component.name} />
      </div>`;
      }
    }).join('\n');

    const code = `${imports}
import React, { useEffect, useState } from 'react';

const chartData = [
  { name: 'Jan', value: 400, users: 240 },
  { name: 'Feb', value: 300, users: 180 },
  { name: 'Mar', value: 500, users: 350 },
  { name: 'Apr', value: 450, users: 280 },
];

const tableData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'status', label: 'Status' },
];

const Dashboard${typeAnnotations} = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

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
    typescript: boolean,
    styling: string
  ): CodeExample {
    const imports = this.generateImports(components);
    const fileExtension = typescript ? 'tsx' : 'jsx';
    const typeAnnotations = typescript ? ': React.FC' : '';
    
    const navigationComponents = components.filter(c => 
      c.category === 'Navbar' || c.name.includes('Nav') || c.name.includes('Menu')
    );

    const navContent = navigationComponents.map(component => {
      if (component.name.includes('Side')) {
        return `      <${component.name} items={sidebarItems} />`;
      } else if (component.name.includes('Breadcrumb')) {
        return `      <${component.name} items={breadcrumbItems} />`;
      } else if (component.name.includes('Menu')) {
        return `      <${component.name} items={menuItems} />`;
      } else {
        return `      <${component.name} />`;
      }
    }).join('\n');

    const code = `${imports}
import React, { useState } from 'react';

const sidebarItems = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'Users', href: '/users', icon: '👥' },
  { label: 'Settings', href: '/settings', icon: '⚙️' },
];

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Current Page', href: '/current' },
];

const menuItems = [
  { label: 'File', items: [
    { label: 'New', href: '/new' },
    { label: 'Open', href: '/open' },
    { label: 'Save', href: '/save' },
  ]},
  { label: 'Edit', items: [
    { label: 'Cut', href: '/cut' },
    { label: 'Copy', href: '/copy' },
    { label: 'Paste', href: '/paste' },
  ]},
];

const Navigation${typeAnnotations} = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    <nav className="navigation-container">
      <header className="nav-header">
        <h1>My App</h1>
      </header>
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
    typescript: boolean,
    styling: string
  ): CodeExample {
    const imports = this.generateImports(components);
    const fileExtension = typescript ? 'tsx' : 'jsx';
    const typeAnnotations = typescript ? ': React.FC' : '';
    
    const authComponents = components.filter(c => c.category === 'Auth');
    
    const authContent = authComponents.map(component => {
      if (component.name.includes('Login')) {
        return `      <${component.name} 
        onLogin={handleLogin}
        onError={handleError}
        className="auth-component"
      />`;
      } else if (component.name.includes('Provider')) {
        return `    <${component.name}>
      <AppContent />
    </${component.name}>`;
      } else {
        return `      <${component.name} />`;
      }
    }).join('\n');

    const code = `${imports}
import React, { useState } from 'react';

const AuthApp${typeAnnotations} = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (credentials${typescript ? ': any' : ''}) => {
    console.log('Login attempt:', credentials);
    // Add your authentication logic here
    setIsAuthenticated(true);
    setUser({ name: 'John Doe', email: 'john@example.com' });
  };

  const handleError = (error${typescript ? ': any' : ''}) => {
    console.error('Authentication error:', error);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const AppContent = () => (
    <div className="app-content">
      <h2>Welcome, {user?.name}!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );

  return (
    <div className="auth-app">
      {isAuthenticated ? (
        <div>
${authContent}
        </div>
      ) : (
        <div className="auth-login">
          <h1>Please Login</h1>
${authContent}
        </div>
      )}
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

  private generateTableExample(
    components: ComponentInfo[],
    framework: string,
    typescript: boolean,
    styling: string
  ): CodeExample {
    const imports = this.generateImports(components);
    const fileExtension = typescript ? 'tsx' : 'jsx';
    const typeAnnotations = typescript ? ': React.FC' : '';
    
    const tableComponents = components.filter(c => 
      c.name.includes('Table') || c.name.includes('Pagination')
    );

    const tableContent = tableComponents.map(component => {
      if (component.name.includes('Pagination')) {
        return `      <${component.name} 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />`;
      } else {
        return `      <${component.name}
        data={paginatedData}
        columns={columns}
        onRowClick={handleRowClick}
      />`;
      }
    }).join('\n');

    const code = `${imports}
import React, { useState, useMemo } from 'react';

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, city: 'New York' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25, city: 'Los Angeles' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, city: 'Chicago' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 28, city: 'Houston' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', age: 32, city: 'Phoenix' },
];

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'age', label: 'Age', sortable: true },
  { key: 'city', label: 'City', sortable: true },
];

const TableExample${typeAnnotations} = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const sortedData = useMemo(() => {
    return [...sampleData].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [sortColumn, sortDirection]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sampleData.length / itemsPerPage);

  const handleRowClick = (row${typescript ? ': any' : ''}) => {
    console.log('Row clicked:', row);
  };

  return (
    <div className="table-container">
      <h2>User Table</h2>
${tableContent}
    </div>
  );
};

export default TableExample;`;

    return {
      title: 'Table with Pagination',
      description: 'Data table with sorting and pagination',
      code,
      language: fileExtension,
      imports: imports.split('\n').filter(line => line.trim()),
      dependencies: this.getComponentDependencies(components),
    };
  }

  private generateModalExample(
    components: ComponentInfo[],
    framework: string,
    typescript: boolean,
    styling: string
  ): CodeExample {
    const imports = this.generateImports(components);
    const fileExtension = typescript ? 'tsx' : 'jsx';
    const typeAnnotations = typescript ? ': React.FC' : '';
    
    const modalComponents = components.filter(c => 
      c.name.includes('Modal') || c.name.includes('Dialog')
    );

    const modalContent = modalComponents.map(component => {
      return `      <${component.name}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Example Modal"
      >
        <div className="modal-content">
          <p>This is the modal content.</p>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      </${component.name}>`;
    }).join('\n');

    const code = `${imports}
import React, { useState } from 'react';

const ModalExample${typeAnnotations} = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="modal-example">
      <h2>Modal Example</h2>
      <button onClick={handleOpenModal} className="open-modal-btn">
        Open Modal
      </button>
      
${modalContent}
    </div>
  );
};

export default ModalExample;`;

    return {
      title: 'Modal Implementation',
      description: 'Modal dialog with open/close functionality',
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

  private generateStyling(components: ComponentInfo[], styling: string): string {
    if (styling === 'tailwind') {
      return this.generateTailwindStyles(components);
    } else if (styling === 'styled-components') {
      return this.generateStyledComponents(components);
    } else {
      return this.generateCSSStyles(components);
    }
  }

  private generateCSSStyles(components: ComponentInfo[]): string {
    const styles = components.map(component => {
      const kebabName = component.name.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);
      return `.${kebabName} {
  /* Add your ${component.name} styles here */
}`;
    }).join('\n\n');

    return `/* Component Styles */
.component-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dashboard {
  padding: 1rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.dashboard-card {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
}

${styles}`;
  }

  private generateTailwindStyles(components: ComponentInfo[]): string {
    return `/* Tailwind CSS Classes */
.component-container {
  @apply flex flex-col gap-4 p-4;
}

.form-container {
  @apply max-w-md mx-auto p-8 border border-gray-300 rounded-lg;
}

.form-fields {
  @apply space-y-4;
}

.dashboard {
  @apply p-4;
}

.dashboard-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4;
}

.dashboard-card {
  @apply p-4 border border-gray-200 rounded-lg bg-white shadow-sm;
}

.submit-button {
  @apply bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600;
}

.form-field {
  @apply w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500;
}`;
  }

  private generateStyledComponents(components: ComponentInfo[]): string {
    return `// Styled Components
import styled from 'styled-components';

export const Container = styled.div\`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
\`;

export const FormContainer = styled.form\`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
\`;

export const FormFields = styled.div\`
  display: flex;
  flex-direction: column;
  gap: 1rem;
\`;

export const Dashboard = styled.div\`
  padding: 1rem;
\`;

export const DashboardGrid = styled.div\`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
\`;

export const DashboardCard = styled.div\`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
\`;`;
  }

  private generateUsage(components: ComponentInfo[], pattern: string): string {
    return `// Usage Example
import MyComponent from './MyComponent';

function App() {
  return (
    <div>
      <MyComponent />
    </div>
  );
}

export default App;`;
  }

  private generateExplanation(components: ComponentInfo[], pattern: string): string {
    const componentNames = components.map(c => c.name).join(', ');
    
    return `This code example demonstrates how to use the ${componentNames} component${components.length > 1 ? 's' : ''} in a ${pattern} pattern.

Key features:
${components.map(c => `- ${c.name}: ${c.description}`).join('\n')}

The example includes:
- Proper imports from the @instincthub/react-ui package
- TypeScript support with proper type annotations
- State management for interactive components
- Event handling for user interactions
- Styling classes for customization

To use this code:
1. Install the required dependencies
2. Import the components
3. Copy the code into your project
4. Customize the styling and behavior as needed`;
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
}

const codeGeneratorAPI = new CodeGeneratorAPI();

export async function POST(request: NextRequest) {
  try {
    const { 
      components, 
      pattern = 'basic', 
      framework = 'react', 
      typescript = true,
      styling = 'css'
    } = await request.json();

    if (!components || !Array.isArray(components) || components.length === 0) {
      return NextResponse.json(
        { error: 'components parameter is required and must be a non-empty array' },
        { status: 400 }
      );
    }

    const result = await codeGeneratorAPI.execute(components, pattern, framework, typescript, styling);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Code generation API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const components = searchParams.get('components')?.split(',') || [];
    const pattern = searchParams.get('pattern') || 'basic';
    const framework = searchParams.get('framework') || 'react';
    const typescript = searchParams.get('typescript') !== 'false';
    const styling = (searchParams.get('styling') as 'css' | 'tailwind' | 'styled-components') || 'css';

    if (components.length === 0) {
      return NextResponse.json(
        { error: 'components parameter is required' },
        { status: 400 }
      );
    }

    const result = await codeGeneratorAPI.execute(components, pattern, framework, typescript, styling);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Code generation API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}