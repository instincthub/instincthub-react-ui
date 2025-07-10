# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

This is the MCP (Model Context Protocol) server API implementation for the InstinctHub React UI component library. The API provides intelligent component discovery, documentation, and code generation capabilities for 125+ React components across 10 categories.

## Key Architecture Components

### API Structure
The MCP server is implemented as Next.js API routes in `/src/__examples__/src/app/api/` with the following structure:

- **`/api/components/search`** - Component search with relevance scoring and fuzzy matching
- **`/api/components/docs`** - Component documentation with examples and props
- **`/api/components/recommend`** - AI-powered component recommendations based on natural language
- **`/api/generate`** - Code generation for multiple patterns (basic, form, dashboard, navigation, auth, table, modal)
- **`/api/help`** - Integration help and troubleshooting guides

### Data Layer
- **Component Data**: Pre-generated JSON files in `/src/__examples__/src/data/` containing component metadata
- **Types**: TypeScript interfaces in `/src/__examples__/src/types/components.ts`
- **API Client**: Centralized API client in `/src/__examples__/src/lib/api.ts`
- **React Hooks**: Custom hooks in `/src/__examples__/src/lib/hooks.ts`

### Component Intelligence System
The MCP server implements sophisticated AI capabilities:

1. **Search Algorithm**: Multi-layered relevance scoring based on:
   - Exact name matches (100 points)
   - Name prefix matches (80 points)
   - Name contains matches (60 points)
   - Description matches (40 points)
   - Category matches (20 points)
   - Tag matches (15 points)
   - Fuzzy matching (10 points)

2. **Recommendation Engine**: Natural language processing that:
   - Analyzes user intent (build-form, display-data, create-dashboard, etc.)
   - Extracts keywords and UI patterns
   - Suggests component categories
   - Assesses complexity levels
   - Provides implementation patterns

3. **Code Generation**: Template-based code generation supporting:
   - Multiple frameworks (React, Next.js)
   - TypeScript/JavaScript variants
   - Multiple styling approaches (CSS, Tailwind, Styled Components)
   - Pattern-specific implementations

## Development Commands

```bash
# Start the examples app (includes MCP server)
npm run dev

# Build the examples app
npm run build

# Build the main package
npm run rollup

# Link package for local development
npm run link-ui

# Generate component data (run from mcp-server directory)
npm run generate-components
```

## Component Data Structure

Components are organized with this metadata structure:
```typescript
interface ComponentInfo {
  name: string;           // Component name (e.g., "SubmitButton")
  description: string;    // Human-readable description
  category: string;       // One of: Forms, UI, Auth, Navbar, Status, Theme, Tabs, Cursors, Library
  repo_path: string;      // Path in repository
  type: 'component' | 'hook' | 'context' | 'utility';
  tags?: string[];        // Optional tags for search
}
```

## Import Path Resolution

The package supports multiple import paths:
- Main package: `@instincthub/react-ui`
- Library utilities: `@instincthub/react-ui/lib`
- Redux utilities: `@instincthub/react-ui/redux`
- Cursors: `@instincthub/react-ui/cursors`
- Types: `@instincthub/react-ui/types`
- Server-side rendering: `@instincthub/react-ui/ssr`

## MCP Server Integration

The API endpoints are designed to work with MCP clients in multiple ways:

### Remote MCP Integration (Recommended)
The preferred method is using Claude.ai's Remote MCP feature:
- **Integration URL**: `https://ui.instincthub.com/api/mcp`
- **Integration Name**: `InstinctHub React UI`
- **Setup**: Add through Claude.ai Settings → Integrations → Add integration
- **Benefits**: No local setup, always up-to-date, seamless integration

### Local MCP Server Options
For users who prefer local MCP servers:
- **Standalone MCP Server**: Wraps the API endpoints with MCP protocol
- **Direct API Usage**: Direct HTTP calls to the deployed endpoints
- **Custom MCP Server**: Build your own wrapper around the API

### Core MCP Capabilities
1. **Component Search**: Natural language queries converted to structured searches
2. **Documentation**: Rich documentation with examples and props information
3. **Code Generation**: Context-aware code generation with multiple patterns
4. **Integration Help**: Step-by-step guides for installation, setup, and troubleshooting

### Remote MCP Best Practices
When using the Remote MCP integration with Claude.ai:

#### Optimal Query Patterns:
- **Specific Component Search**: "Find form input components with validation"
- **Category-Based Discovery**: "Show me all authentication components"
- **Use Case Descriptions**: "I need components for a user dashboard"
- **Code Generation Requests**: "Generate a login form using InstinctHub components"

#### Integration Benefits:
- **Zero Configuration**: No local MCP server setup required
- **Always Current**: Automatic access to latest component updates
- **Performance**: Direct API access without local proxy
- **Reliability**: Hosted on production infrastructure
- **Maintenance-Free**: No need to manage local dependencies

#### Common Usage Scenarios:
1. **Component Discovery**: "What components are available for data visualization?"
2. **Implementation Guidance**: "How do I implement authentication with your components?"
3. **Code Generation**: "Create a complete user profile form"
4. **Integration Support**: "Help me integrate these components with Next.js"

## Error Handling Patterns

All API endpoints follow consistent error handling:
- Return `{ success: boolean, data?: any, error?: string }`
- Provide helpful suggestions in error responses
- Use appropriate HTTP status codes (400, 404, 500)

## TypeScript Configuration

The project uses path mapping for clean imports:
- `@/*` maps to `../../src/*` (main package)
- `@/__examples__/src/*` maps to examples app source

## AI Features Implementation

### Search Intelligence
- **Fuzzy Matching**: Handles typos and partial matches
- **Relevance Scoring**: Multi-factor scoring for result ranking
- **Category Suggestions**: Intelligent category recommendations
- **Search History**: Maintains search context

### Recommendation Engine
- **Intent Detection**: Analyzes user descriptions to determine intent
- **Pattern Recognition**: Identifies UI patterns (CRUD, Data Display, Navigation, etc.)
- **Complexity Assessment**: Evaluates project complexity based on keywords
- **Context Awareness**: Considers framework and existing components

### Code Generation
- **Template System**: Pattern-based code generation
- **Framework Support**: React, Next.js specific implementations
- **Styling Options**: CSS, Tailwind, Styled Components
- **TypeScript Integration**: Full TypeScript support with type annotations

## Performance Optimizations

- **Data Pre-indexing**: Component data is pre-processed for fast retrieval
- **Debounced Search**: Search queries are debounced to prevent excessive API calls
- **Caching Strategy**: Intelligent caching for frequently accessed data
- **Lazy Loading**: Components and data loaded on demand

## Key Files to Understand

When working with this codebase, focus on these critical files:

1. **`/src/__examples__/src/app/api/components/search/route.ts`** - Core search logic
2. **`/src/__examples__/src/app/api/components/recommend/route.ts`** - AI recommendation engine
3. **`/src/__examples__/src/lib/api.ts`** - API client and utilities
4. **`/src/__examples__/src/lib/hooks.ts`** - React hooks for API integration
5. **`/src/__examples__/src/types/components.ts`** - TypeScript definitions
6. **`/src/__examples__/src/data/components.json`** - Component metadata

## Integration Context

This MCP server is part of a larger ecosystem:
- **Main Package**: `@instincthub/react-ui` - The actual component library
- **Examples App**: Next.js application showcasing components
- **MCP Server**: AI-powered component discovery and documentation
- **Build System**: Rollup-based build process with TypeScript

## Common Development Patterns

When extending the MCP server:

1. **Adding New Endpoints**: Create new route handlers following the existing pattern
2. **Enhancing Search**: Modify scoring algorithms in search route
3. **Improving AI**: Update recommendation logic and prompt analysis
4. **Adding Patterns**: Extend code generation with new templates
5. **Data Updates**: Regenerate component data when library changes

## Testing Strategy

The API endpoints should be tested with:
- Valid component names and search queries
- Edge cases (empty queries, non-existent components)
- Different parameter combinations
- Error scenarios (malformed requests, missing data)

## Deployment Considerations

- The MCP server runs as part of the Next.js examples app
- Component data is statically generated and included in the build
- API endpoints are serverless functions (Vercel/Netlify compatible)
- No external dependencies required for basic functionality