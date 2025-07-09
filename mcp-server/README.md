# InstinctHub React UI MCP Server

A Model Context Protocol (MCP) server that provides intelligent assistance for the InstinctHub React UI component library. This server enables AI assistants to help developers discover, understand, and implement the 80+ components and utilities available in the library.

## Features

- **🔍 Component Search**: Find components by name, description, category, or functionality
- **📖 Documentation Access**: Get detailed documentation, props, and usage examples
- **🛠️ Code Generation**: Generate TypeScript/JavaScript code examples for any component
- **🤝 Integration Help**: Step-by-step guides for setup, configuration, and troubleshooting
- **🎯 AI Recommendations**: Intelligent component suggestions based on natural language descriptions

## Installation

1. Install dependencies:
```bash
npm install
```

2. Build the server:
```bash
npm run build
```

3. Generate component data:
```bash
npm run generate-components
```

## Usage

### Starting the Server

```bash
npm start
```

### Available Tools

#### 1. search_components
Search for components by name, description, or category.

```json
{
  "name": "search_components",
  "arguments": {
    "query": "input button form",
    "category": "Forms",
    "limit": 10
  }
}
```

#### 2. get_component_docs
Get detailed documentation for a specific component.

```json
{
  "name": "get_component_docs",
  "arguments": {
    "component_name": "SubmitButton",
    "include_examples": true,
    "include_props": true
  }
}
```

#### 3. generate_code
Generate code examples for component usage.

```json
{
  "name": "generate_code",
  "arguments": {
    "components": ["SubmitButton", "InputText"],
    "pattern": "form",
    "framework": "nextjs",
    "typescript": true
  }
}
```

#### 4. integration_help
Get integration help for specific topics.

```json
{
  "name": "integration_help",
  "arguments": {
    "topic": "installation",
    "framework": "nextjs"
  }
}
```

#### 5. recommend_components
Get AI-powered component recommendations.

```json
{
  "name": "recommend_components",
  "arguments": {
    "description": "I need to build a user login form with validation",
    "context": "Next.js application with TypeScript",
    "complexity": "medium"
  }
}
```

## Component Categories

The server organizes components into the following categories:

- **Forms** (30+ components): Input fields, validation, form controls
- **UI** (20+ components): Cards, tables, charts, dialogs, buttons
- **Auth** (8+ components): Authentication, session management, user handling
- **Navbar** (6+ components): Navigation, menus, breadcrumbs
- **Status** (10+ components): Error states, notifications, loading indicators
- **Theme** (6+ components): Dark mode, styling, theme providers
- **Tabs** (3+ components): Tab navigation and content
- **Cursors** (5+ components): Custom cursor effects and animations
- **Library** (1+ components): Utility components and integrations

## Examples

### Finding Form Components
```bash
curl -X POST http://localhost:3000/mcp \\
  -H "Content-Type: application/json" \\
  -d '{
    "method": "tools/call",
    "params": {
      "name": "search_components",
      "arguments": {
        "query": "input form validation",
        "category": "Forms"
      }
    }
  }'
```

### Getting Component Documentation
```bash
curl -X POST http://localhost:3000/mcp \\
  -H "Content-Type: application/json" \\
  -d '{
    "method": "tools/call",
    "params": {
      "name": "get_component_docs",
      "arguments": {
        "component_name": "IHubTable",
        "include_examples": true
      }
    }
  }'
```

### AI-Powered Recommendations
```bash
curl -X POST http://localhost:3000/mcp \\
  -H "Content-Type: application/json" \\
  -d '{
    "method": "tools/call",
    "params": {
      "name": "recommend_components",
      "arguments": {
        "description": "I want to create a dashboard with charts and data tables",
        "context": "Analytics application with real-time data"
      }
    }
  }'
```

## Configuration

### MCP Client Configuration

Add this to your MCP client configuration:

```json
{
  "mcpServers": {
    "instincthub-react-ui": {
      "command": "node",
      "args": ["/path/to/mcp-server/dist/index.js"],
      "env": {}
    }
  }
}
```

### Claude Desktop Configuration

For Claude Desktop, add to your configuration file:

```json
{
  "mcpServers": {
    "instincthub-react-ui": {
      "command": "node",
      "args": ["/path/to/instincthub-react-ui/mcp-server/dist/index.js"]
    }
  }
}
```

## Development

### File Structure

```
mcp-server/
├── src/
│   ├── index.ts              # Main server entry point
│   ├── tools/                # MCP tools implementation
│   │   ├── component-search.ts
│   │   ├── component-docs.ts
│   │   ├── code-generator.ts
│   │   ├── integration-helper.ts
│   │   └── component-recommendation.ts
│   ├── scripts/              # Utility scripts
│   │   └── generate-components.ts
│   ├── types/                # TypeScript types
│   │   └── index.ts
│   └── data/                 # Generated component data
│       ├── components.json
│       ├── categories.json
│       └── summary.json
├── package.json
├── tsconfig.json
└── README.md
```

### Building

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

### Updating Component Data

When components are added or updated in the main library:

```bash
npm run generate-components
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and build
5. Submit a pull request

## License

MIT License - see the main package license for details.

## Support

For issues and questions:
- GitHub Issues: https://github.com/instincthub/instincthub-react-ui/issues
- Documentation: https://github.com/instincthub/instincthub-react-ui#readme

## Changelog

### v1.0.0
- Initial release with 5 core tools
- Support for 80+ components across 9 categories
- AI-powered component recommendations
- TypeScript support
- Next.js integration guides