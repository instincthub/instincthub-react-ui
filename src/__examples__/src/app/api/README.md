# InstinctHub React UI - MCP Server API

This directory contains the Model Context Protocol (MCP) server implementation for InstinctHub React UI, providing AI-powered component discovery, documentation, and code generation capabilities.

## Overview

The MCP server exposes 5 main endpoints that enable intelligent interaction with the InstinctHub React UI component library:

- **Component Search** - Find components by name, description, or functionality
- **Component Documentation** - Get detailed docs, examples, and usage guides
- **AI Recommendations** - Get intelligent component suggestions based on natural language
- **Code Generation** - Generate TypeScript/JavaScript code examples for components
- **Integration Help** - Get step-by-step integration and troubleshooting guides

## API Endpoints

### 1. Component Search

Search for components with intelligent relevance scoring and fuzzy matching.

**Endpoint:** `GET /api/components/search`

**Parameters:**
- `query` (string, required) - Search query
- `category` (string, optional) - Filter by category
- `limit` (number, optional) - Max results (default: 10)

**Example:**
```bash
curl "http://localhost:3000/api/components/search?query=button&category=Forms&limit=5"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "query": "button",
    "total": 3,
    "results": [
      {
        "component": {
          "name": "SubmitButton",
          "description": "Form submission button with loading state",
          "category": "Forms",
          "type": "component"
        },
        "relevance": 95,
        "matchReason": "Exact name match: button",
        "importPath": "@instincthub/react-ui",
        "repositoryUrl": "https://github.com/instincthub/instincthub-react-ui/blob/main/src/components/forms/SubmitButton.tsx"
      }
    ],
    "categories": ["Forms", "UI", "Auth", "Navbar"]
  },
  "suggestions": ["Try searching for specific functionality like 'input', 'modal', 'navigation'"]
}
```

### 2. Component Documentation

Get comprehensive documentation for specific components.

**Endpoint:** `GET /api/components/docs`

**Parameters:**
- `component_name` (string, required) - Component name
- `include_examples` (boolean, optional) - Include code examples (default: true)
- `include_props` (boolean, optional) - Include props information (default: true)
- `include_styling` (boolean, optional) - Include styling information (default: false)

**Example:**
```bash
curl "http://localhost:3000/api/components/docs?component_name=SubmitButton&include_examples=true"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "component": {
      "name": "SubmitButton",
      "description": "Form submission button with loading state",
      "category": "Forms"
    },
    "documentation": {
      "overview": "## SubmitButton\n\nForm submission button with loading state...",
      "usage": "import { SubmitButton } from '@instincthub/react-ui';\n\nfunction MyComponent() {\n  return <SubmitButton>Submit</SubmitButton>;\n}",
      "props": [
        {
          "name": "onClick",
          "type": "() => void",
          "required": false,
          "description": "Callback fired when the button is clicked"
        }
      ],
      "examples": [
        {
          "title": "Basic Usage",
          "description": "Basic implementation of SubmitButton",
          "code": "import { SubmitButton } from '@instincthub/react-ui';\n\nfunction MyComponent() {\n  return <SubmitButton>Submit</SubmitButton>;\n}"
        }
      ]
    },
    "relatedComponents": []
  }
}
```

### 3. AI-Powered Recommendations

Get intelligent component recommendations based on natural language descriptions.

**Endpoint:** `GET /api/components/recommend`

**Parameters:**
- `description` (string, required) - Natural language description of what you want to build
- `context` (string, optional) - Additional context
- `complexity` (string, optional) - simple|medium|complex (default: medium)
- `framework` (string, optional) - Target framework (default: react)

**Example:**
```bash
curl "http://localhost:3000/api/components/recommend?description=I need a login form with validation&context=Next.js app&complexity=medium"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "component": {
          "name": "LoginForm",
          "description": "Login form component",
          "category": "Auth"
        },
        "relevance": 95,
        "reasoning": "Matches the Auth category, Component name contains 'login'",
        "codeExample": "import { LoginForm } from '@instincthub/react-ui';\n\nfunction MyComponent() {\n  return <LoginForm />;\n}",
        "importPath": "@instincthub/react-ui",
        "repositoryUrl": "https://github.com/instincthub/instincthub-react-ui/blob/main/src/components/auth/LoginForm.tsx"
      }
    ],
    "alternatives": [],
    "implementation": {
      "steps": [
        "Install the @instincthub/react-ui package",
        "Import the required components",
        "Set up the basic component structure",
        "Add styling and customization",
        "Test and iterate"
      ],
      "codeSnippet": "// Implementation code here",
      "dependencies": ["@instincthub/react-ui"]
    }
  }
}
```

### 4. Code Generation

Generate complete code examples for specific components and patterns.

**Endpoint:** `GET /api/generate`

**Parameters:**
- `components` (string, required) - Comma-separated list of component names
- `pattern` (string, optional) - Code pattern: basic|form|dashboard|navigation|authentication|table|modal (default: basic)
- `framework` (string, optional) - Target framework (default: react)
- `typescript` (boolean, optional) - Generate TypeScript code (default: true)
- `styling` (string, optional) - Styling approach: css|tailwind|styled-components (default: css)

**Example:**
```bash
curl "http://localhost:3000/api/generate?components=SubmitButton,InputText&pattern=form&typescript=true&styling=css"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "imports": "import { SubmitButton, InputText } from '@instincthub/react-ui';",
    "component": "import React, { useState } from 'react';\n\nconst MyForm: React.FC = () => {\n  const [formData, setFormData] = useState<{[key: string]: any}>({});\n\n  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault();\n    console.log('Form submitted:', formData);\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <InputText\n        value={formData.inputtext}\n        onChange={(value) => setFormData({...formData, inputtext: value})}\n        placeholder=\"Enter inputtext\"\n      />\n      <SubmitButton type=\"submit\">\n        Submit\n      </SubmitButton>\n    </form>\n  );\n};\n\nexport default MyForm;",
    "styling": "/* Component Styles */\n.component-container {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  padding: 1rem;\n}\n\n.form-container {\n  max-width: 400px;\n  margin: 0 auto;\n  padding: 2rem;\n  border: 1px solid #ddd;\n  border-radius: 8px;\n}\n\n.form-fields {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}",
    "usage": "// Usage Example\nimport MyComponent from './MyComponent';\n\nfunction App() {\n  return (\n    <div>\n      <MyComponent />\n    </div>\n  );\n}\n\nexport default App;",
    "explanation": "This code example demonstrates how to use the SubmitButton, InputText components in a form pattern.\n\nKey features:\n- SubmitButton: Form submission button with loading state\n- InputText: Text input field with validation support\n\nThe example includes:\n- Proper imports from the @instincthub/react-ui package\n- TypeScript support with proper type annotations\n- State management for interactive components\n- Event handling for user interactions\n- Styling classes for customization\n\nTo use this code:\n1. Install the required dependencies\n2. Import the components\n3. Copy the code into your project\n4. Customize the styling and behavior as needed"
  }
}
```

### 5. Integration Help

Get step-by-step integration guides and troubleshooting help.

**Endpoint:** `GET /api/help`

**Parameters:**
- `topic` (string, required) - Help topic: installation|setup|css|typescript|nextjs|dependencies|troubleshooting|authentication|theming|performance
- `framework` (string, optional) - Target framework (default: react)
- `version` (string, optional) - Package version

**Example:**
```bash
curl "http://localhost:3000/api/help?topic=installation&framework=nextjs"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "title": "Installation Guide",
    "description": "Step-by-step installation of InstinctHub React UI",
    "steps": [
      {
        "step": 1,
        "title": "Install the Package",
        "description": "Install the main package using npm or yarn",
        "commands": [
          "npm install @instincthub/react-ui",
          "# or with yarn",
          "yarn add @instincthub/react-ui"
        ]
      }
    ],
    "troubleshooting": [
      {
        "issue": "Peer dependency warnings",
        "solution": "Install all required peer dependencies listed in the package.json"
      }
    ],
    "relatedComponents": []
  }
}
```

## Available Component Categories

The MCP server organizes 125+ components into the following categories:

- **Forms** (37 components) - Form inputs, validation, and interactive form components
- **UI** (29 components) - General UI components, cards, buttons, and layout elements
- **Auth** (12 components) - Authentication, authorization, and user session management
- **Status** (11 components) - Status indicators, error states, and feedback components
- **Theme** (6 components) - Theme providers, dark mode, and styling components
- **Navbar** (6 components) - Navigation, menus, and header components
- **Cursors** (5 components) - Custom cursor effects and interactive animations
- **Tabs** (3 components) - Tab navigation and tabbed interface components
- **Library** (1 component) - Utility components and third-party integrations

## Usage with React Hooks

The API endpoints can be easily consumed using the provided React hooks:

```typescript
import { useComponentSearch, useComponentRecommendations, useCodeGeneration } from '../lib/hooks';

// Search for components
const { results, loading, error } = useComponentSearch('button', 'Forms');

// Get AI recommendations
const { recommendations } = useComponentRecommendations('I need a login form');

// Generate code
const { generateCode, generatedCode } = useCodeGeneration();
await generateCode(['SubmitButton', 'InputText'], 'form');
```

## Error Handling

All endpoints return a consistent error format:

```json
{
  "success": false,
  "error": "Error message description",
  "suggestions": ["Helpful suggestion 1", "Helpful suggestion 2"]
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad Request (missing or invalid parameters)
- `404` - Not Found (component doesn't exist)
- `500` - Internal Server Error

## Authentication

Currently, the API endpoints are public and don't require authentication. In production, you may want to add rate limiting or API key authentication.

## Performance Considerations

- All endpoints implement intelligent caching
- Search results are scored and sorted by relevance
- Component data is pre-indexed for fast retrieval
- Fuzzy matching algorithms are optimized for performance

## MCP Client Integration

The MCP server is implemented as Next.js API routes in this examples app. You can integrate it with MCP clients like Claude Desktop using several methods below.

### Option 1: Remote MCP Integration (Recommended)

**Claude.ai users can connect directly to the deployed MCP server without any local setup!**

This is the easiest way to access the InstinctHub React UI MCP server. Simply add it as a Remote MCP integration in Claude.ai:

#### Setup Steps:
1. **Navigate to Claude.ai Settings**
   - Go to [Claude.ai](https://claude.ai) and sign in
   - Click on your profile → Settings → Integrations

2. **Add Remote MCP Integration**
   - Click "Add integration"
   - Enter integration name: `InstinctHub React UI`
   - Enter integration URL: `https://ui.instincthub.com/api/mcp`
   - Click "Add"

3. **Connect and Test**
   - Click "Connect" to activate the integration
   - Test with queries like:
     - "Find form components"
     - "Show me authentication components"
     - "Generate a login form with validation"
     - "Help me integrate a button component"

#### Benefits:
- ✅ No local MCP server setup required
- ✅ Always up-to-date with latest components
- ✅ Seamless integration with Claude.ai
- ✅ Access to all 125+ components instantly
- ✅ AI-powered component recommendations
- ✅ Automatic code generation

#### Available Capabilities:
- **Component Search**: "Find components for user authentication"
- **Documentation**: "Show me docs for SubmitButton"
- **AI Recommendations**: "I need components for a dashboard"
- **Code Generation**: "Generate a complete login form"
- **Integration Help**: "How do I set up the component library?"

#### Example Usage in Claude.ai:
Once connected, you can use natural language queries like:

```
Claude, I need to build a user registration form. Can you help me find the right components and generate the code?
```

```
Show me all the authentication components available in InstinctHub React UI and their documentation.
```

```
Generate a TypeScript React component for a data table with pagination using InstinctHub components.
```

#### Troubleshooting Remote MCP:
- **Connection Issues**: Ensure `https://ui.instincthub.com/api/mcp` is accessible from your network
- **Integration Not Found**: Verify the integration URL is exactly `https://ui.instincthub.com/api/mcp`
- **API Errors**: Check that the deployed app is running and MCP endpoint is responsive
- **Authentication Problems**: Remote MCP doesn't require authentication for this integration
- **Tool Execution Failures**: Check that underlying API endpoints are functioning properly

### Option 2: Use the standalone MCP server (if available)

If you have a standalone MCP server that calls these API endpoints:

```json
{
  "mcpServers": {
    "instincthub-react-ui": {
      "command": "node",
      "args": ["./mcp-server/dist/index.js"],
      "env": {
        "API_BASE_URL": "https://ui.instincthub.com"
      }
    }
  }
}
```

### Option 3: Direct API Usage

Since the MCP server is implemented as Next.js API routes, you can also directly call the API endpoints:

- **Search**: `GET https://ui.instincthub.com/api/components/search`
- **Docs**: `GET https://ui.instincthub.com/api/components/docs`
- **Recommend**: `GET https://ui.instincthub.com/api/components/recommend`
- **Generate**: `GET https://ui.instincthub.com/api/generate`
- **Help**: `GET https://ui.instincthub.com/api/help`

### Option 4: Create a Custom MCP Server

You can create a custom MCP server that wraps these API endpoints. The server should make HTTP requests to the endpoints above and format the responses according to MCP protocol.

## MCP Server Implementation

The MCP (Model Context Protocol) server is implemented at `/api/mcp` and provides a standardized interface for AI tools to interact with the InstinctHub React UI component library.

### MCP Server Details

**Endpoint**: `https://ui.instincthub.com/api/mcp`

**Protocol**: JSON-RPC 2.0 over HTTP with Server-Sent Events support

**Available Tools**:
1. `search_components` - Search for components with intelligent matching
2. `get_component_docs` - Get comprehensive component documentation
3. `recommend_components` - AI-powered component recommendations
4. `generate_code` - Generate code examples for components
5. `get_help` - Get integration and troubleshooting help

**Server Capabilities**:
- **Tools**: All 5 tools with proper input schemas and validation
- **Transport**: HTTP with SSE support for real-time communication
- **Error Handling**: Comprehensive error responses with helpful messages
- **CORS**: Configured for cross-origin access from Claude.ai

### MCP Protocol Support

The server implements the MCP protocol specification:
- `initialize` - Server initialization and capability negotiation
- `tools/list` - List all available tools and their schemas
- `tools/call` - Execute tools with parameter validation

### Tool Schemas

Each tool has a well-defined JSON schema for input validation:

```json
{
  "search_components": {
    "required": ["query"],
    "properties": {
      "query": "string",
      "category": "string (optional)",
      "limit": "number (optional)"
    }
  }
}
```

## Development

To extend or modify the MCP server:

1. **Add New Endpoints**: Create new route handlers in the appropriate directory
2. **Extend Component Data**: Update the component data generation scripts
3. **Add New Tools**: Implement additional MCP tools in the tools directory
4. **Improve AI Logic**: Enhance the recommendation algorithms and search scoring

## Component Data Structure

The server uses a structured component data format:

```typescript
interface ComponentInfo {
  name: string;
  description: string;
  category: string;
  repo_path: string;
  type: 'component' | 'hook' | 'context' | 'utility';
  tags?: string[];
}
```

This enables rich search, categorization, and intelligent recommendations across the entire component library.