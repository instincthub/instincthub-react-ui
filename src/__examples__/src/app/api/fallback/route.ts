import { NextRequest, NextResponse } from 'next/server';

/**
 * Fallback API endpoint for MCP server functionality
 * Provides component discovery and documentation when MCP server is unavailable
 */

interface FallbackResponse {
  success: boolean;
  message: string;
  mcp_status: 'unavailable' | 'error';
  alternatives: Array<{
    method: string;
    description: string;
    implementation: string;
    benefits: string[];
  }>;
  quick_access: {
    npm_package: string;
    documentation_package: string;
    web_portal: string;
    static_docs?: string;
  };
  workarounds: Array<{
    name: string;
    description: string;
    setup: string[];
    usage: string;
    suitable_for: string[];
  }>;
}

const fallbackResponse: FallbackResponse = {
  success: true,
  message: "MCP Server is currently unavailable, but here are alternative ways to access InstinctHub React UI component knowledge.",
  mcp_status: "unavailable",
  alternatives: [
    {
      method: "Documentation Package",
      description: "Offline npm package with complete component documentation and search",
      implementation: "npm install @instincthub/react-ui-docs",
      benefits: [
        "Offline access to all component documentation",
        "Advanced search and filtering capabilities",
        "Code generation examples",
        "No network dependencies",
        "Programmatic API access"
      ]
    },
    {
      method: "Web Portal API",
      description: "Direct HTTP API access to component search and documentation",
      implementation: "https://ui.instincthub.com/api/components/search",
      benefits: [
        "Real-time component search",
        "AI-powered recommendations",
        "Code generation",
        "Always up-to-date",
        "No local setup required"
      ]
    },
    {
      method: "Static Documentation",
      description: "Pre-generated markdown documentation files",
      implementation: "Generated static docs in docs/static-docs/",
      benefits: [
        "Lightweight and fast",
        "Version control friendly",
        "Can be hosted anywhere",
        "Markdown format for easy reading",
        "Searchable with standard tools"
      ]
    },
    {
      method: "Enhanced JSON Export",
      description: "Comprehensive JSON data with component metadata",
      implementation: "Access enhanced-export.json and enhanced-compact.json",
      benefits: [
        "Machine-readable format",
        "Complete component metadata",
        "Integration with build tools",
        "Custom search implementations",
        "Performance optimized"
      ]
    }
  ],
  quick_access: {
    npm_package: "@instincthub/react-ui-docs",
    documentation_package: "npm install @instincthub/react-ui-docs",
    web_portal: "https://ui.instincthub.com",
    static_docs: "Available in repository at docs/static-docs/"
  },
  workarounds: [
    {
      name: "Documentation Package",
      description: "Use the offline documentation package for component discovery",
      setup: [
        "npm install @instincthub/react-ui-docs",
        "Import the search functions in your project"
      ],
      usage: `const { searchComponents, getComponent, getRecommendations } = require('@instincthub/react-ui-docs');

// Search for components
const results = searchComponents('button', { category: 'Forms' });

// Get specific component
const submitButton = getComponent('SubmitButton');

// Get AI recommendations
const recommendations = getRecommendations('I need a login form');`,
      suitable_for: [
        "Offline development",
        "CI/CD integration",
        "Local development tools",
        "Documentation generation"
      ]
    },
    {
      name: "Direct Web API",
      description: "Make HTTP requests directly to the web portal API",
      setup: [
        "No installation required",
        "Use fetch() or axios for HTTP requests"
      ],
      usage: `// Search components
const response = await fetch('https://ui.instincthub.com/api/components/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: 'button', category: 'Forms' })
});
const data = await response.json();

// Get recommendations
const recResponse = await fetch('https://ui.instincthub.com/api/components/recommend', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    description: 'I need components for a user dashboard',
    context: 'React application with TypeScript'
  })
});`,
      suitable_for: [
        "Web applications",
        "Remote development",
        "Browser-based tools",
        "Always-updated data"
      ]
    },
    {
      name: "Local Static Files",
      description: "Use pre-generated static documentation and JSON files",
      setup: [
        "Clone the repository",
        "Navigate to docs/static-docs/",
        "Use JSON files for programmatic access"
      ],
      usage: `// Load component data
const components = require('./docs/static-docs/data/components.json');
const searchIndex = require('./docs/static-docs/data/search-index.json');

// Simple search implementation
function searchComponents(query) {
  return components.filter(comp => 
    comp.name.toLowerCase().includes(query.toLowerCase()) ||
    comp.description.toLowerCase().includes(query.toLowerCase())
  );
}`,
      suitable_for: [
        "Local development",
        "Custom integrations",
        "Build tools",
        "Documentation sites"
      ]
    },
    {
      name: "Manual Component Discovery",
      description: "Browse components using the main package structure",
      setup: [
        "npm install @instincthub/react-ui",
        "Explore the package structure"
      ],
      usage: `// Import available components
import { 
  SubmitButton, 
  InputText, 
  IHubTable,
  LoginForm,
  // ... other components
} from '@instincthub/react-ui';

// Check component documentation in repository
// Visit: https://github.com/instincthub/instincthub-react-ui`,
      suitable_for: [
        "Direct component usage",
        "IDE autocompletion",
        "Type checking",
        "Learning the package structure"
      ]
    }
  ]
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json';
    const workaround = searchParams.get('workaround');

    // If specific workaround requested
    if (workaround) {
      const specificWorkaround = fallbackResponse.workarounds.find(w => 
        w.name.toLowerCase().includes(workaround.toLowerCase())
      );
      
      if (specificWorkaround) {
        return NextResponse.json({
          success: true,
          workaround: specificWorkaround,
          quick_setup: `# ${specificWorkaround.name} Setup\n${specificWorkaround.setup.map(step => `${step}`).join('\n')}\n\n# Usage Example\n${specificWorkaround.usage}`
        });
      }
    }

    // Return different formats
    if (format === 'markdown') {
      const markdown = generateMarkdownResponse(fallbackResponse);
      return new Response(markdown, {
        headers: { 'Content-Type': 'text/markdown' },
      });
    }

    if (format === 'compact') {
      return NextResponse.json({
        status: fallbackResponse.mcp_status,
        alternatives: fallbackResponse.alternatives.map(alt => ({
          method: alt.method,
          implementation: alt.implementation
        })),
        quick_access: fallbackResponse.quick_access
      });
    }

    return NextResponse.json(fallbackResponse);

  } catch (error) {
    console.error('Fallback API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to provide fallback information',
        basic_workaround: {
          npm_package: "@instincthub/react-ui-docs",
          web_api: "https://ui.instincthub.com/api/components/search"
        }
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { issue_type, context } = await request.json();

    // Provide specific guidance based on issue type
    const specificGuidance = {
      mcp_server_failed: {
        immediate_solution: "Use the documentation package: npm install @instincthub/react-ui-docs",
        long_term_solution: "Switch to Remote MCP integration via Claude.ai settings",
        code_example: `const { searchComponents } = require('@instincthub/react-ui-docs');
const results = searchComponents('your search query');`
      },
      wsl_issues: {
        immediate_solution: "Use the web API directly or documentation package",
        long_term_solution: "Set up Remote MCP integration (no local server needed)",
        code_example: `// Direct API usage
const response = await fetch('https://ui.instincthub.com/api/components/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: 'button' })
});`
      },
      offline_development: {
        immediate_solution: "Install the documentation package for offline access",
        long_term_solution: "Generate static docs in your project",
        code_example: `// Offline package usage
const docs = require('@instincthub/react-ui-docs');
const components = docs.getComponents();
const recommendations = docs.getRecommendations('login form');`
      },
      no_ai_access: {
        immediate_solution: "Use the web portal or documentation package",
        long_term_solution: "Set up local documentation generation",
        code_example: `// Manual component discovery
import { SubmitButton, InputText } from '@instincthub/react-ui';
// Check repository for component documentation`
      }
    };

    const guidance = specificGuidance[issue_type as keyof typeof specificGuidance] || {
      immediate_solution: "Use the documentation package or web API",
      long_term_solution: "Choose the most suitable alternative from the options provided",
      code_example: "See the fallback response for detailed implementation examples"
    };

    return NextResponse.json({
      success: true,
      issue_type,
      context,
      guidance,
      fallback_options: fallbackResponse.alternatives.slice(0, 2), // Top 2 recommendations
      next_steps: [
        "Choose the most suitable alternative for your use case",
        "Follow the setup instructions provided",
        "Test the workaround with a simple search query",
        "Consider switching to a long-term solution"
      ]
    });

  } catch (error) {
    console.error('Fallback POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to provide specific guidance' },
      { status: 500 }
    );
  }
}

function generateMarkdownResponse(response: FallbackResponse): string {
  return `# InstinctHub React UI - MCP Server Fallback Solutions

${response.message}

## 🔄 Alternative Methods

${response.alternatives.map(alt => `### ${alt.method}

${alt.description}

**Implementation:** \`${alt.implementation}\`

**Benefits:**
${alt.benefits.map(benefit => `- ${benefit}`).join('\n')}

---`).join('\n\n')}

## 🚀 Quick Access

- **NPM Package:** \`${response.quick_access.npm_package}\`
- **Documentation Package:** \`${response.quick_access.documentation_package}\`
- **Web Portal:** ${response.quick_access.web_portal}
${response.quick_access.static_docs ? `- **Static Docs:** ${response.quick_access.static_docs}` : ''}

## 🛠️ Detailed Workarounds

${response.workarounds.map(workaround => `### ${workaround.name}

${workaround.description}

**Setup:**
${workaround.setup.map(step => `1. ${step}`).join('\n')}

**Usage Example:**
\`\`\`javascript
${workaround.usage}
\`\`\`

**Suitable for:** ${workaround.suitable_for.join(', ')}

---`).join('\n\n')}

## 💡 Recommendations

1. **For immediate use:** Install the documentation package (\`npm install @instincthub/react-ui-docs\`)
2. **For web applications:** Use the direct web API
3. **For offline development:** Generate static documentation
4. **For long-term solution:** Consider Remote MCP integration

## 🆘 Need Help?

- **GitHub Issues:** https://github.com/instincthub/instincthub-react-ui/issues
- **Documentation:** https://github.com/instincthub/instincthub-react-ui#readme
- **Web Portal:** https://ui.instincthub.com
`;
}