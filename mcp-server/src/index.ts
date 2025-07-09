#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";

import { ComponentSearchTool } from "./tools/component-search.js";
import { ComponentDocsTool } from "./tools/component-docs.js";
import { CodeGeneratorTool } from "./tools/code-generator.js";
import { IntegrationHelperTool } from "./tools/integration-helper.js";
import { ComponentRecommendationTool } from "./tools/component-recommendation.js";

class InstinctHubMCPServer {
  private server: Server;
  private tools: Map<string, any>;

  constructor() {
    this.server = new Server(
      {
        name: "instincthub-react-ui",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.tools = new Map();
    this.setupTools();
    this.setupHandlers();
  }

  private setupTools() {
    // Initialize all tools
    const componentSearch = new ComponentSearchTool();
    const componentDocs = new ComponentDocsTool();
    const codeGenerator = new CodeGeneratorTool();
    const integrationHelper = new IntegrationHelperTool();
    const componentRecommendation = new ComponentRecommendationTool();

    // Register tools
    this.tools.set("search_components", componentSearch);
    this.tools.set("get_component_docs", componentDocs);
    this.tools.set("generate_code", codeGenerator);
    this.tools.set("integration_help", integrationHelper);
    this.tools.set("recommend_components", componentRecommendation);
  }

  private setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      const tools: Tool[] = [
        {
          name: "search_components",
          description: "Search for InstinctHub React UI components by name, description, or category",
          inputSchema: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "Search query (component name, description, or functionality)",
              },
              category: {
                type: "string",
                description: "Filter by component category (Forms, UI, Auth, etc.)",
                enum: ["Forms", "Auth", "Navbar", "UI", "Status", "Theme", "Tabs", "Cursors", "Library"],
              },
              limit: {
                type: "number",
                description: "Maximum number of results to return",
                default: 10,
              },
            },
            required: ["query"],
          },
        },
        {
          name: "get_component_docs",
          description: "Get detailed documentation for a specific component",
          inputSchema: {
            type: "object",
            properties: {
              component_name: {
                type: "string",
                description: "Name of the component to get documentation for",
              },
              include_examples: {
                type: "boolean",
                description: "Include usage examples in the documentation",
                default: true,
              },
              include_props: {
                type: "boolean",
                description: "Include props interface information",
                default: true,
              },
            },
            required: ["component_name"],
          },
        },
        {
          name: "generate_code",
          description: "Generate code examples for component usage",
          inputSchema: {
            type: "object",
            properties: {
              components: {
                type: "array",
                items: { type: "string" },
                description: "List of component names to generate code for",
              },
              pattern: {
                type: "string",
                description: "Code pattern to generate (basic, form, dashboard, etc.)",
                enum: ["basic", "form", "dashboard", "navigation", "authentication", "custom"],
              },
              framework: {
                type: "string",
                description: "Target framework",
                enum: ["react", "nextjs"],
                default: "react",
              },
              typescript: {
                type: "boolean",
                description: "Generate TypeScript code",
                default: true,
              },
            },
            required: ["components"],
          },
        },
        {
          name: "integration_help",
          description: "Get help with integrating InstinctHub React UI into your project",
          inputSchema: {
            type: "object",
            properties: {
              topic: {
                type: "string",
                description: "Integration topic to get help with",
                enum: ["installation", "setup", "css", "typescript", "nextjs", "dependencies", "troubleshooting"],
              },
              framework: {
                type: "string",
                description: "Target framework",
                enum: ["react", "nextjs", "vite", "cra"],
                default: "react",
              },
            },
            required: ["topic"],
          },
        },
        {
          name: "recommend_components",
          description: "Get AI-powered component recommendations based on your requirements",
          inputSchema: {
            type: "object",
            properties: {
              description: {
                type: "string",
                description: "Description of what you want to build or the functionality you need",
              },
              context: {
                type: "string",
                description: "Additional context about your use case or application",
              },
              include_examples: {
                type: "boolean",
                description: "Include code examples in recommendations",
                default: true,
              },
              complexity: {
                type: "string",
                description: "Preferred complexity level",
                enum: ["simple", "medium", "complex"],
                default: "medium",
              },
            },
            required: ["description"],
          },
        },
      ];

      return { tools };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      
      const tool = this.tools.get(name);
      if (!tool) {
        throw new Error(`Unknown tool: ${name}`);
      }

      try {
        const result = await tool.execute(args);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
              }, null, 2),
            },
          ],
        };
      }
    });
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("InstinctHub React UI MCP Server started");
  }
}

// Start the server if this file is run directly
if (require.main === module) {
  const server = new InstinctHubMCPServer();
  server.start().catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
}

export { InstinctHubMCPServer };