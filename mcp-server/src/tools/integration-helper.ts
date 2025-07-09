import { MCPToolResult, IntegrationGuide, IntegrationStep, TroubleshootingItem } from '../types/index.js';

export class IntegrationHelperTool {
  
  async execute(args: any): Promise<MCPToolResult> {
    const { topic, framework = 'react' } = args;

    try {
      const guide = this.generateIntegrationGuide(topic, framework);
      
      return {
        success: true,
        data: guide,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  private generateIntegrationGuide(topic: string, framework: string): IntegrationGuide {
    switch (topic) {
      case 'installation':
        return this.generateInstallationGuide(framework);
      case 'setup':
        return this.generateSetupGuide(framework);
      case 'css':
        return this.generateCSSGuide(framework);
      case 'typescript':
        return this.generateTypeScriptGuide(framework);
      case 'nextjs':
        return this.generateNextJSGuide();
      case 'dependencies':
        return this.generateDependenciesGuide();
      case 'troubleshooting':
        return this.generateTroubleshootingGuide();
      default:
        return this.generateGeneralGuide(framework);
    }
  }

  private generateInstallationGuide(framework: string): IntegrationGuide {
    return {
      title: 'Installation Guide',
      description: 'Step-by-step installation of InstinctHub React UI',
      steps: [
        {
          title: 'Install the Package',
          description: 'Install the main package using npm or yarn',
          commands: [
            'npm install @instincthub/react-ui',
            '# or with yarn',
            'yarn add @instincthub/react-ui'
          ],
        },
        {
          title: 'Install Peer Dependencies',
          description: 'Install required peer dependencies for your project',
          commands: [
            'npm install react react-dom',
            'npm install @emotion/react @emotion/styled',
            'npm install @mui/material @mui/icons-material',
            framework === 'nextjs' ? 'npm install next-auth' : '# Skip next-auth for non-Next.js projects'
          ],
        },
        {
          title: 'Optional Dependencies',
          description: 'Install optional dependencies for specific features',
          commands: [
            'npm install recharts  # For chart components',
            'npm install @tiptap/react @tiptap/starter-kit  # For editor components',
            'npm install @reduxjs/toolkit react-redux  # For Redux integration'
          ],
        },
      ],
      codeExamples: [
        {
          title: 'Package.json Dependencies',
          description: 'Example of what your package.json should include',
          code: `{
  "dependencies": {
    "@instincthub/react-ui": "^0.1.3",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@emotion/react": "^11.0.0",
    "@emotion/styled": "^11.0.0",
    "@mui/material": "^5.0.0",
    "@mui/icons-material": "^5.0.0"
  }
}`,
          language: 'json',
          imports: [],
        },
      ],
      troubleshooting: [
        {
          problem: 'Peer dependency warnings',
          solution: 'Install all required peer dependencies listed in the package.json',
        },
        {
          problem: 'Version conflicts',
          solution: 'Ensure you\'re using compatible versions of React and peer dependencies',
        },
      ],
    };
  }

  private generateSetupGuide(framework: string): IntegrationGuide {
    return {
      title: 'Setup Guide',
      description: 'Basic setup and configuration',
      steps: [
        {
          title: 'Import CSS Styles',
          description: 'Import the main CSS file in your application',
          code: framework === 'nextjs' ? 
            `// In pages/_app.js or pages/_app.tsx
import '@instincthub/react-ui/dist/assets/css/main.css';` :
            `// In src/index.js or src/main.tsx
import '@instincthub/react-ui/dist/assets/css/main.css';`,
        },
        {
          title: 'Setup Providers',
          description: 'Wrap your app with necessary providers',
          code: `import { ReactClientProviders } from '@instincthub/react-ui';
import { SessionProviders } from '@instincthub/react-ui';

function App() {
  return (
    <ReactClientProviders>
      <SessionProviders>
        <YourApp />
      </SessionProviders>
    </ReactClientProviders>
  );
}`,
        },
        {
          title: 'Import Components',
          description: 'Import and use components in your application',
          code: `import { SubmitButton, InputText, IHubTable } from '@instincthub/react-ui';

function MyComponent() {
  return (
    <div>
      <InputText placeholder="Enter text" />
      <SubmitButton>Submit</SubmitButton>
    </div>
  );
}`,
        },
      ],
      codeExamples: [
        {
          title: 'Complete Setup Example',
          description: 'Full setup for a React application',
          code: framework === 'nextjs' ? this.getNextJSSetupExample() : this.getReactSetupExample(),
          language: 'tsx',
          imports: ['@instincthub/react-ui'],
        },
      ],
      troubleshooting: [
        {
          problem: 'Styles not loading',
          solution: 'Ensure you\'ve imported the main CSS file in your app entry point',
        },
        {
          problem: 'Components not rendering',
          solution: 'Check that you\'ve wrapped your app with the necessary providers',
        },
      ],
    };
  }

  private generateCSSGuide(framework: string): IntegrationGuide {
    return {
      title: 'CSS and Styling Guide',
      description: 'How to work with styles and themes',
      steps: [
        {
          title: 'Import Main Styles',
          description: 'Import the main CSS file',
          code: `import '@instincthub/react-ui/dist/assets/css/main.css';`,
        },
        {
          title: 'Import Specific Styles',
          description: 'Import component-specific styles if needed',
          code: `import '@instincthub/react-ui/dist/assets/css/forms.css';
import '@instincthub/react-ui/dist/assets/css/navbar.css';`,
        },
        {
          title: 'Dark Mode Setup',
          description: 'Configure dark mode support',
          code: `import { DarkModeProvider } from '@instincthub/react-ui';

function App() {
  return (
    <DarkModeProvider>
      <YourApp />
    </DarkModeProvider>
  );
}`,
        },
        {
          title: 'Custom Styling',
          description: 'Override default styles with custom CSS',
          code: `/* Custom styles */
.ihub-component {
  background-color: #custom-color;
  border-radius: 8px;
}

/* CSS variables override */
:root {
  --ihub-primary-color: #your-brand-color;
  --ihub-secondary-color: #your-secondary-color;
}`,
        },
      ],
      codeExamples: [
        {
          title: 'CSS Variables',
          description: 'Available CSS variables for customization',
          code: `:root {
  --ihub-primary-color: #4f46e5;
  --ihub-secondary-color: #7c3aed;
  --ihub-success-color: #059669;
  --ihub-error-color: #dc2626;
  --ihub-warning-color: #d97706;
  --ihub-info-color: #0284c7;
  --ihub-border-radius: 6px;
  --ihub-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}`,
          language: 'css',
          imports: [],
        },
      ],
      troubleshooting: [
        {
          problem: 'Styles not applying',
          solution: 'Check CSS import order and ensure specificity is correct',
        },
        {
          problem: 'Dark mode not working',
          solution: 'Ensure DarkModeProvider is wrapped around your app',
        },
      ],
    };
  }

  private generateTypeScriptGuide(framework: string): IntegrationGuide {
    return {
      title: 'TypeScript Integration',
      description: 'Using InstinctHub React UI with TypeScript',
      steps: [
        {
          title: 'Install Type Definitions',
          description: 'Types are included in the main package',
          code: `// Types are automatically available
import { ComponentName } from '@instincthub/react-ui';
import type { ComponentNameProps } from '@instincthub/react-ui/types';`,
        },
        {
          title: 'Import Types',
          description: 'Import component props and interfaces',
          code: `import type { 
  SubmitButtonProps, 
  InputTextProps, 
  IHubTableProps 
} from '@instincthub/react-ui/types';`,
        },
        {
          title: 'Use with TypeScript',
          description: 'Example of TypeScript usage',
          code: `import React from 'react';
import { SubmitButton, InputText } from '@instincthub/react-ui';
import type { SubmitButtonProps } from '@instincthub/react-ui/types';

interface MyComponentProps {
  onSubmit: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ onSubmit }) => {
  const [value, setValue] = React.useState<string>('');

  const buttonProps: SubmitButtonProps = {
    onClick: onSubmit,
    disabled: !value,
  };

  return (
    <div>
      <InputText 
        value={value} 
        onChange={setValue}
        placeholder="Enter value"
      />
      <SubmitButton {...buttonProps}>
        Submit
      </SubmitButton>
    </div>
  );
};`,
        },
      ],
      codeExamples: [
        {
          title: 'Type-safe Component Usage',
          description: 'Example of strongly typed component usage',
          code: `import React from 'react';
import { IHubTable } from '@instincthub/react-ui';
import type { IHubTableProps } from '@instincthub/react-ui/types';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserTable: React.FC = () => {
  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];

  const columns: IHubTableProps<User>['columns'] = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
  ];

  return (
    <IHubTable<User>
      data={users}
      columns={columns}
      keyExtractor={(row) => row.id.toString()}
    />
  );
};`,
          language: 'tsx',
          imports: ['@instincthub/react-ui', '@instincthub/react-ui/types'],
        },
      ],
      troubleshooting: [
        {
          problem: 'Type errors on import',
          solution: 'Ensure you\'re importing types from the correct path',
        },
        {
          problem: 'Missing type definitions',
          solution: 'Update to the latest version of the package',
        },
      ],
    };
  }

  private generateNextJSGuide(): IntegrationGuide {
    return {
      title: 'Next.js Integration',
      description: 'Using InstinctHub React UI with Next.js',
      steps: [
        {
          title: 'Install Next.js Dependencies',
          description: 'Install Next.js specific dependencies',
          commands: [
            'npm install next-auth',
            'npm install @next/font'
          ],
        },
        {
          title: 'Configure _app.js',
          description: 'Setup the app wrapper with providers',
          code: `// pages/_app.tsx
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ReactClientProviders } from '@instincthub/react-ui';
import '@instincthub/react-ui/dist/assets/css/main.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ReactClientProviders>
        <Component {...pageProps} />
      </ReactClientProviders>
    </SessionProvider>
  );
}

export default MyApp;`,
        },
        {
          title: 'Setup Authentication',
          description: 'Configure NextAuth.js for auth components',
          code: `// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
// Your auth configuration

export default NextAuth({
  // Your NextAuth configuration
});`,
        },
        {
          title: 'Use Server-Side Rendering',
          description: 'Use SSR utilities for server-side rendering',
          code: `// pages/dashboard.tsx
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { IHubTable } from '@instincthub/react-ui';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  
  return {
    props: {
      session,
    },
  };
};

const Dashboard = ({ session }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <IHubTable data={[]} columns={[]} />
    </div>
  );
};

export default Dashboard;`,
        },
      ],
      codeExamples: [
        {
          title: 'Complete Next.js Setup',
          description: 'Full Next.js integration example',
          code: this.getNextJSSetupExample(),
          language: 'tsx',
          imports: ['next', 'next-auth', '@instincthub/react-ui'],
        },
      ],
      troubleshooting: [
        {
          problem: 'Hydration mismatch errors',
          solution: 'Use ClientOnly component for client-side only components',
        },
        {
          problem: 'Authentication not working',
          solution: 'Ensure NextAuth.js is properly configured',
        },
      ],
    };
  }

  private generateDependenciesGuide(): IntegrationGuide {
    return {
      title: 'Dependencies Guide',
      description: 'Understanding and managing package dependencies',
      steps: [
        {
          title: 'Required Dependencies',
          description: 'Core dependencies that must be installed',
          code: `{
  "dependencies": {
    "@instincthub/react-ui": "^0.1.3",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}`,
        },
        {
          title: 'Peer Dependencies',
          description: 'Dependencies that should be installed alongside',
          code: `{
  "dependencies": {
    "@emotion/react": "^11.0.0",
    "@emotion/styled": "^11.0.0",
    "@mui/material": "^5.0.0",
    "@mui/icons-material": "^5.0.0"
  }
}`,
        },
        {
          title: 'Optional Dependencies',
          description: 'Dependencies for specific features',
          code: `{
  "dependencies": {
    "recharts": "^2.0.0",
    "@tiptap/react": "^2.0.0",
    "@tiptap/starter-kit": "^2.0.0",
    "@reduxjs/toolkit": "^1.9.0",
    "react-redux": "^8.0.0",
    "next-auth": "^4.0.0"
  }
}`,
        },
      ],
      codeExamples: [
        {
          title: 'Dependency Check Script',
          description: 'Script to verify all dependencies are installed',
          code: `// check-dependencies.js
const requiredDeps = [
  '@instincthub/react-ui',
  'react',
  'react-dom',
  '@emotion/react',
  '@emotion/styled',
  '@mui/material'
];

const packageJson = require('./package.json');
const missing = requiredDeps.filter(dep => 
  !packageJson.dependencies[dep] && !packageJson.devDependencies[dep]
);

if (missing.length > 0) {
  console.log('Missing dependencies:', missing.join(', '));
  process.exit(1);
}

console.log('All required dependencies are installed!');`,
          language: 'javascript',
          imports: [],
        },
      ],
      troubleshooting: [
        {
          problem: 'Dependency conflicts',
          solution: 'Use npm ls to check for version conflicts and update as needed',
        },
        {
          problem: 'Bundle size issues',
          solution: 'Use tree-shaking and import only the components you need',
        },
      ],
    };
  }

  private generateTroubleshootingGuide(): IntegrationGuide {
    return {
      title: 'Troubleshooting Guide',
      description: 'Common issues and solutions',
      steps: [
        {
          title: 'Component Not Rendering',
          description: 'Check import paths and provider setup',
          code: `// Check import path
import { ComponentName } from '@instincthub/react-ui';

// Ensure providers are set up
import { ReactClientProviders } from '@instincthub/react-ui';

function App() {
  return (
    <ReactClientProviders>
      <ComponentName />
    </ReactClientProviders>
  );
}`,
        },
        {
          title: 'Styles Not Loading',
          description: 'Verify CSS imports and order',
          code: `// Import CSS in the correct order
import '@instincthub/react-ui/dist/assets/css/main.css';
import './your-custom-styles.css';`,
        },
        {
          title: 'TypeScript Errors',
          description: 'Common TypeScript issues and fixes',
          code: `// Import types explicitly
import type { ComponentProps } from '@instincthub/react-ui/types';

// Use proper type annotations
const MyComponent: React.FC<ComponentProps> = (props) => {
  return <div>{props.children}</div>;
};`,
        },
      ],
      codeExamples: [
        {
          title: 'Debug Component',
          description: 'Component to help debug common issues',
          code: `import React from 'react';
import { ComponentLists } from '@instincthub/react-ui';

const DebugComponent: React.FC = () => {
  const [debugInfo, setDebugInfo] = React.useState<any>(null);

  React.useEffect(() => {
    // Check if CSS is loaded
    const cssLoaded = document.querySelector('style[data-emotion]') !== null;
    
    // Check if providers are available
    const hasProviders = document.querySelector('[data-theme]') !== null;
    
    setDebugInfo({
      cssLoaded,
      hasProviders,
      reactVersion: React.version,
    });
  }, []);

  return (
    <div>
      <h3>Debug Information</h3>
      <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
      <ComponentLists />
    </div>
  );
};

export default DebugComponent;`,
          language: 'tsx',
          imports: ['@instincthub/react-ui'],
        },
      ],
      troubleshooting: [
        {
          problem: 'Module not found errors',
          solution: 'Clear node_modules and reinstall dependencies. Run: rm -rf node_modules && npm install',
        },
        {
          problem: 'Build fails',
          solution: 'Check for TypeScript errors and peer dependency warnings',
        },
        {
          problem: 'Performance issues',
          solution: 'Use React.memo and lazy loading for large components',
        },
      ],
    };
  }

  private generateGeneralGuide(framework: string): IntegrationGuide {
    return {
      title: 'General Integration Guide',
      description: 'Overview of InstinctHub React UI integration',
      steps: [
        {
          title: 'Installation',
          description: 'Install the package and dependencies',
          commands: ['npm install @instincthub/react-ui'],
        },
        {
          title: 'Basic Setup',
          description: 'Import CSS and components',
          code: `import '@instincthub/react-ui/dist/assets/css/main.css';
import { SubmitButton } from '@instincthub/react-ui';`,
        },
        {
          title: 'Start Using',
          description: 'Use components in your application',
          code: `function App() {
  return (
    <div>
      <SubmitButton>Click me</SubmitButton>
    </div>
  );
}`,
        },
      ],
      codeExamples: [
        {
          title: 'Quick Start Example',
          description: 'Get started quickly with basic setup',
          code: framework === 'nextjs' ? this.getNextJSQuickStart() : this.getReactQuickStart(),
          language: 'tsx',
          imports: ['@instincthub/react-ui'],
        },
      ],
      troubleshooting: [
        {
          problem: 'Getting started',
          solution: 'Follow the installation guide step by step',
        },
      ],
    };
  }

  private getNextJSSetupExample(): string {
    return `// pages/_app.tsx
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ReactClientProviders } from '@instincthub/react-ui';
import '@instincthub/react-ui/dist/assets/css/main.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ReactClientProviders>
        <Component {...pageProps} />
      </ReactClientProviders>
    </SessionProvider>
  );
}

export default MyApp;`;
  }

  private getReactSetupExample(): string {
    return `// src/App.tsx
import React from 'react';
import { ReactClientProviders } from '@instincthub/react-ui';
import '@instincthub/react-ui/dist/assets/css/main.css';

function App() {
  return (
    <ReactClientProviders>
      <div className="App">
        <h1>My App</h1>
        {/* Your components here */}
      </div>
    </ReactClientProviders>
  );
}

export default App;`;
  }

  private getNextJSQuickStart(): string {
    return `// pages/index.tsx
import { SubmitButton, InputText } from '@instincthub/react-ui';

const Home = () => {
  return (
    <div>
      <h1>Welcome to InstinctHub React UI</h1>
      <InputText placeholder="Enter your name" />
      <SubmitButton>Submit</SubmitButton>
    </div>
  );
};

export default Home;`;
  }

  private getReactQuickStart(): string {
    return `// src/App.tsx
import React from 'react';
import { SubmitButton, InputText } from '@instincthub/react-ui';
import '@instincthub/react-ui/dist/assets/css/main.css';

function App() {
  return (
    <div>
      <h1>Welcome to InstinctHub React UI</h1>
      <InputText placeholder="Enter your name" />
      <SubmitButton>Submit</SubmitButton>
    </div>
  );
}

export default App;`;
  }
}

export default IntegrationHelperTool;