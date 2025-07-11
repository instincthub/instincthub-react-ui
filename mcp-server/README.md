# InstinctHub React UI - Local MCP Server

This directory contains the **local Model Context Protocol (MCP) server** for InstinctHub React UI. This server enables AI tools like Claude Code CLI to interact with the InstinctHub React UI component library through natural language.

## 🎯 What This Is

A **local MCP server** that runs on your machine and connects to the remote InstinctHub React UI API at `https://ui.instincthub.com`. It acts as a bridge between AI tools and the component library.

## ✨ Features

- **🔍 Component Search**: Find components by name, description, or functionality
- **📖 Documentation Access**: Get detailed docs, examples, and usage guides  
- **🤖 AI Recommendations**: Get intelligent component suggestions
- **🛠️ Code Generation**: Generate TypeScript/JavaScript code examples
- **🤝 Integration Help**: Get step-by-step integration guides

## 🏗️ Architecture

```
Claude Code CLI → Local MCP Server → Remote API (ui.instincthub.com)
```

## Installation

### Quick Start (Recommended)

Add the MCP server to any project with a single command:

```bash
claude mcp add instincthub-react-ui -e API_BASE_URL=https://ui.instincthub.com -- npx -y @instincthub/react-ui-mcp-server
```

This will:
- Add the InstinctHub React UI MCP server to your Claude Code CLI configuration
- Set the correct API base URL
- Install and run the server automatically

### Manual Installation

For development or manual setup:

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
curl -X POST http://localhost:3010/mcp \\
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
curl -X POST http://localhost:3010/mcp \\
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
curl -X POST http://localhost:3010/mcp \\
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

### Automatic Configuration (Recommended)

Use the one-liner command for automatic setup:

```bash
claude mcp add instincthub-react-ui -e API_BASE_URL=https://ui.instincthub.com -- npx -y @instincthub/react-ui-mcp-server
```

### Manual Configuration

#### Option 1: NPX-based (Recommended)

```json
{
  "mcpServers": {
    "instincthub-react-ui": {
      "command": "npx",
      "args": ["-y", "@instincthub/react-ui-mcp-server"],
      "env": {
        "API_BASE_URL": "https://ui.instincthub.com"
      }
    }
  }
}
```

#### Option 2: Local Development Build

For local development or when you have the repository cloned:

```json
{
  "mcpServers": {
    "instincthub-react-ui": {
      "command": "node",
      "args": ["./mcp-server/dist/index.js"],
      "env": {
        "API_BASE_URL": "https://ui.instincthub.com"
      },
      "cwd": "/mnt/c/Users/instincthub/code_projects/npm/instincthub-react-ui"
    }
  }
}
```

**Requirements**: Local build must exist (`npm run build`)

#### Alternative: Docker-based (Limited Support)

Docker exec approach for containers (may have stdio issues):

```json
{
  "mcpServers": {
    "instincthub-react-ui": {
      "command": "docker",
      "args": ["exec", "-i", "instincthub-mcp-server", "node", "dist/index.js"],
      "env": {
        "API_BASE_URL": "https://ui.instincthub.com"
      }
    }
  }
}
```

**Note**: Docker exec may not work reliably with MCP stdio transport. Use Direct Node.js if this fails.

### Claude Desktop Configuration

Claude Desktop supports the same configuration options:

#### Recommended: NPX-based
```json
{
  "mcpServers": {
    "instincthub-react-ui": {
      "command": "npx",
      "args": ["-y", "@instincthub/react-ui-mcp-server"],
      "env": {
        "API_BASE_URL": "https://ui.instincthub.com"
      }
    }
  }
}
```

#### Alternative: Local Development
```json
{
  "mcpServers": {
    "instincthub-react-ui": {
      "command": "node",
      "args": ["./mcp-server/dist/index.js"],
      "env": {
        "API_BASE_URL": "https://ui.instincthub.com"
      },
      "cwd": "/mnt/c/Users/instincthub/code_projects/npm/instincthub-react-ui"
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

## 📦 Publishing

### NPM Package

The MCP server is published as `@instincthub/react-ui-mcp-server` on NPM for easy installation:

```bash
# Install globally
npm install -g @instincthub/react-ui-mcp-server

# Run directly with npx (recommended)
npx @instincthub/react-ui-mcp-server

# Use in Claude Code CLI
claude mcp add instincthub-react-ui -e API_BASE_URL=https://ui.instincthub.com -- npx -y @instincthub/react-ui-mcp-server
```

### Publishing Steps (for maintainers)

```bash
# Build the package
npm run build

# Publish to NPM
npm publish --access public
```

## 🐳 Docker Deployment

The MCP server can be containerized for consistent deployment across environments.

### Quick Start with Docker

```bash
# Build and run with Docker Compose (recommended)
npm run docker:prod

# Or build and run manually
npm run docker:build
npm run docker:run
```

### Docker Commands

```bash
# Development mode with hot reload
npm run docker:dev

# Production mode (detached)
npm run docker:prod

# View logs
npm run docker:logs

# Stop all services
npm run docker:stop
```

### Checking Server Status

Verify if the MCP server is running and troubleshoot issues:

```bash
# Check if MCP server container is running
docker ps | grep instincthub

# Check Docker Compose service status
docker-compose ps

# View server logs (useful for debugging)
docker-compose logs mcp-server

# Follow logs in real-time
docker-compose logs -f mcp-server

# Check if ports are in use
# Windows:
netstat -ano | findstr :3010
netstat -ano | findstr :3011

# Linux/Mac:
lsof -i :3010
lsof -i :3011

# Check for MCP server processes
ps aux | grep mcp-server

# Test server health (if health endpoint is available)
curl http://localhost:3010/health || echo "Server not responding on port 3010"
curl http://localhost:3011/health || echo "Server not responding on port 3011"
```

**Expected Results When Running:**
- `docker ps` shows `instincthub-mcp-server` container
- `docker-compose ps` shows service status as "Up"
- Ports 3010/3011 are in use by Docker
- Logs show "InstinctHub React UI MCP Server started"

**Troubleshooting:**
- If no containers: Run `npm run docker:prod` to start
- If port conflicts: Check what's using the port and stop it
- If build errors: Check `docker-compose logs` for details
- If startup fails: Verify all dependencies are installed

### MCP Client Troubleshooting

**MCP tools not detected:**

1. **Ensure Docker container is running** (for Docker-based config):
   ```bash
   docker ps | grep instincthub-mcp-server
   ```

2. **Test MCP server manually**:
   ```bash
   # For Docker config:
   docker exec -i instincthub-mcp-server node dist/index.js
   
   # For Direct Node.js config:
   node mcp-server/dist/index.js
   ```

3. **Restart Claude Code CLI** after configuration changes

4. **Check configuration syntax**:
   ```bash
   cat .claude_code_config.json | jq .
   ```

**Common Issues:**
- **MCP tools not detected**: Use Direct Node.js configuration (recommended)
- **"stdio timeout"**: Switch from Docker exec to Direct Node.js configuration  
- **"Container not found"**: Ensure Docker container is running with `npm run docker:prod`
- **"Command not found"**: Verify Node.js is installed and accessible
- **Direct Node.js works, Docker doesn't**: This is expected - MCP stdio transport works better with direct processes

**Recommended Solution**: Use Direct Node.js configuration for MCP clients, Docker for deployment only.

### Docker Compose Services

The project includes two Docker services:

1. **mcp-server** (Production)
   - Optimized multi-stage build
   - Runs on port 3010
   - Non-root user for security

2. **mcp-server-dev** (Development)
   - Hot reload with volume mounting
   - Runs on port 3011
   - TypeScript watch mode

### Docker Environment Variables

- `NODE_ENV`: Set to `production` or `development`
- `API_BASE_URL`: Remote API endpoint (default: `https://ui.instincthub.com`)

### Docker Health Check

The container includes a health check that runs every 30 seconds:

```bash
# Manual health check
docker exec <container_id> node -e "console.log('MCP Server Health Check: OK')"
```

### Docker Configuration

**Dockerfile Features:**
- Multi-stage build for optimized image size
- Non-root user for security
- Health check endpoint
- Proper signal handling

**Volume Mounting:**
- Component data persistence
- Development source code mounting
- Configuration file access

### Deployment Examples

#### Production Deployment
```bash
# Build and deploy
docker-compose up mcp-server --build -d

# Check status
docker-compose ps
docker-compose logs -f mcp-server
```

#### Development Environment
```bash
# Start development server with hot reload
docker-compose --profile development up mcp-server-dev --build

# Access logs
docker-compose logs -f mcp-server-dev
```

#### Custom Configuration
```bash
# Run with custom API URL
docker run -e API_BASE_URL=https://custom-api.com instincthub-mcp-server
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