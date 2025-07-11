# InstinctHub React UI MCP Server - Claude Instructions

This document provides instructions for Claude on how to use the InstinctHub React UI MCP Server effectively.

## 🎯 What This MCP Server Does

The InstinctHub React UI MCP Server provides AI-powered access to a comprehensive React component library with 125+ components. It acts as a bridge between Claude and the InstinctHub React UI component library, enabling intelligent component discovery, documentation access, and code generation.

## 🔧 Available MCP Tools

### 1. `mcp__search_components`
**Purpose**: Find React components by name, description, or functionality

**When to use**:
- User asks to find specific components
- User describes functionality they need
- User wants to browse components by category

**Parameters**:
- `query` (required): Search terms (e.g., "button", "form input", "navigation")
- `category` (optional): Filter by category (Forms, UI, Auth, Navbar, Status, Theme, Tabs, Cursors, Library)
- `limit` (optional): Max results to return (default: 10)

**Example usage**:
```
User: "Find form input components"
Claude: Use mcp__search_components with query="form input" and category="Forms"
```

### 2. `mcp__get_component_docs`
**Purpose**: Get detailed documentation for a specific component

**When to use**:
- User wants to understand how to use a specific component
- User needs props information
- User wants to see code examples

**Parameters**:
- `component_name` (required): Exact component name (e.g., "SubmitButton", "InputText")
- `include_examples` (optional): Include usage examples (default: true)
- `include_props` (optional): Include props interface (default: true)

**Example usage**:
```
User: "How do I use the SubmitButton component?"
Claude: Use mcp__get_component_docs with component_name="SubmitButton"
```

### 3. `mcp__recommend_components`
**Purpose**: Get AI-powered component recommendations based on user requirements

**When to use**:
- User describes what they want to build
- User needs suggestions for their use case
- User wants alternatives to their current approach

**Parameters**:
- `description` (required): What the user wants to build (e.g., "user login form with validation")
- `context` (optional): Additional context about the application
- `include_examples` (optional): Include code examples (default: true)
- `complexity` (optional): Preferred complexity level (simple, medium, complex)

**Example usage**:
```
User: "I need to build a dashboard with user authentication"
Claude: Use mcp__recommend_components with description="dashboard with user authentication" and context="admin panel application"
```

### 4. `mcp__generate_code`
**Purpose**: Generate complete code examples for component usage

**When to use**:
- User wants working code examples
- User needs to see how multiple components work together
- User wants specific patterns (forms, dashboards, etc.)

**Parameters**:
- `components` (required): Array of component names to include
- `pattern` (optional): Code pattern (basic, form, dashboard, navigation, authentication, custom)
- `framework` (optional): Target framework (react, nextjs)
- `typescript` (optional): Generate TypeScript code (default: true)

**Example usage**:
```
User: "Generate a login form using InstinctHub components"
Claude: Use mcp__generate_code with components=["LoginForm", "InputText", "PasswordField", "SubmitButton"] and pattern="authentication"
```

### 5. `mcp__integration_help`
**Purpose**: Get step-by-step integration and troubleshooting help

**When to use**:
- User needs help installing the library
- User has setup or configuration issues
- User wants framework-specific guidance

**Parameters**:
- `topic` (required): Help topic (installation, setup, css, typescript, nextjs, dependencies, troubleshooting)
- `framework` (optional): Target framework (react, nextjs, vite, cra)

**Example usage**:
```
User: "How do I install InstinctHub React UI in my Next.js project?"
Claude: Use mcp__integration_help with topic="installation" and framework="nextjs"
```

## 📋 Component Categories

The library organizes components into these categories:

- **Forms** (37 components): Input fields, validation, form controls, file uploads
- **UI** (29 components): Cards, buttons, tables, charts, dialogs, dropdowns
- **Auth** (12 components): Authentication, session management, user handling
- **Status** (11 components): Error states, notifications, loading indicators
- **Theme** (6 components): Dark mode, styling, theme providers
- **Navbar** (6 components): Navigation, menus, breadcrumbs
- **Cursors** (5 components): Custom cursor effects and animations
- **Tabs** (3 components): Tab navigation and content
- **Library** (1 component): Utility components and integrations

## 🎯 Usage Patterns

### Finding Components
1. **Start with search**: Use `mcp__search_components` to find relevant components
2. **Get details**: Use `mcp__get_component_docs` for specific components
3. **Generate code**: Use `mcp__generate_code` to create working examples

### Building Features
1. **Get recommendations**: Use `mcp__recommend_components` for feature suggestions
2. **Review options**: Present multiple component options to the user
3. **Generate implementation**: Create complete code examples with `mcp__generate_code`

### Troubleshooting
1. **Use integration help**: `mcp__integration_help` for setup issues
2. **Check documentation**: `mcp__get_component_docs` for component-specific problems
3. **Provide alternatives**: Use `mcp__recommend_components` for different approaches

## 🔍 Best Practices

### Search Strategies
- Use descriptive terms: "form validation" instead of just "form"
- Include functionality: "button with loading state" instead of just "button"
- Try category filters when searches return too many results

### Code Generation
- Always include TypeScript by default unless user specifies otherwise
- Use appropriate patterns (form, dashboard, etc.) based on user needs
- Include multiple components when building complete features

### Documentation
- Always include examples when getting component docs
- Explain props and their purposes
- Provide context about when to use each component

## 🚀 Example Workflows

### Workflow 1: User Wants to Build a Login Form
1. `mcp__recommend_components` with description="user login form with validation"
2. `mcp__get_component_docs` for recommended components
3. `mcp__generate_code` with authentication pattern
4. `mcp__integration_help` if user has setup questions

### Workflow 2: User Needs a Data Table
1. `mcp__search_components` with query="table data" and category="UI"
2. `mcp__get_component_docs` for table components
3. `mcp__generate_code` with dashboard pattern
4. Provide styling and customization tips

### Workflow 3: User Has Installation Issues
1. `mcp__integration_help` with topic="troubleshooting"
2. `mcp__integration_help` with topic="dependencies"
3. Provide step-by-step installation guide
4. `mcp__get_component_docs` for simple component to test setup

## 🛠️ Technical Details

### API Integration
- The MCP server connects to `https://ui.instincthub.com`
- All data is fetched from the remote API in real-time
- Components are organized and indexed for fast search

### Error Handling
- All tools include error handling and helpful messages
- Fallback suggestions are provided when searches return no results
- Integration help includes troubleshooting for common issues

### Performance
- Search results are ranked by relevance
- Component data is cached for better performance
- Fuzzy matching helps find components even with typos

## 📚 Common Use Cases

1. **Building Forms**: Search for form components, get validation examples
2. **Creating Dashboards**: Find charts, tables, and layout components
3. **User Authentication**: Get login/signup components and patterns
4. **Navigation**: Find navbar, menu, and breadcrumb components
5. **Data Display**: Tables, cards, and visualization components
6. **Styling**: Theme providers, dark mode, and styling utilities

## 🎯 Success Metrics

A successful interaction should:
- Help user find the right components quickly
- Provide working code examples
- Include proper documentation and props
- Offer integration guidance when needed
- Suggest alternatives when appropriate

Remember: The goal is to help users build React applications faster and more efficiently using the InstinctHub React UI component library.