import { NextRequest, NextResponse } from 'next/server';

// Comprehensive CORS configuration for Remote MCP
function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE, PATCH',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, X-CSRF-Token, X-Requested-With, X-HTTP-Method-Override, X-Forwarded-For, X-Real-IP, User-Agent, Referer, Origin, Host, Connection, Upgrade, Sec-WebSocket-Version, Sec-WebSocket-Key, Sec-WebSocket-Protocol, Sec-WebSocket-Extensions, Sec-WebSocket-Accept, Cache-Control, Pragma, Expires, Last-Modified, ETag, If-Match, If-None-Match, If-Modified-Since, If-Unmodified-Since, If-Range, Range, Accept-Ranges, Vary, X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, Strict-Transport-Security, Content-Security-Policy, X-MCP-Version, X-MCP-Client',
    'Access-Control-Expose-Headers': 'Content-Length, Content-Type, Date, Server, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-MCP-Version',
    'Access-Control-Allow-Credentials': 'false',
    'Access-Control-Max-Age': '86400', // 24 hours
  };
}

// Export MCP Protocol Types for SSE endpoint
export interface MCPRequest {
  jsonrpc: '2.0';
  id: string | number;
  method: string;
  params?: any;
}

export interface MCPResponse {
  jsonrpc: '2.0';
  id: string | number;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

export interface MCPTool {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, any>;
    required?: string[];
  };
}

interface MCPServerInfo {
  name: string;
  version: string;
  capabilities: {
    tools?: {
      listChanged?: boolean;
    };
    resources?: {
      subscribe?: boolean;
      listChanged?: boolean;
    };
    prompts?: {
      listChanged?: boolean;
    };
    logging?: {};
  };
}

// Export MCP Server Implementation for SSE endpoint
export class InstinctHubMCPServer {
  private serverInfo: MCPServerInfo = {
    name: 'InstinctHub React UI',
    version: '1.0.0',
    capabilities: {
      tools: {
        listChanged: true,
      },
      logging: {},
    },
  };

  private tools: MCPTool[] = [
    {
      name: 'search_components',
      description: 'Search for components by name, description, or functionality with intelligent relevance scoring',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search query for components',
          },
          category: {
            type: 'string',
            description: 'Filter by category (Forms, UI, Auth, Navbar, Status, Theme, Tabs, Cursors, Library)',
          },
          limit: {
            type: 'number',
            description: 'Maximum number of results to return',
            default: 10,
          },
        },
        required: ['query'],
      },
    },
    {
      name: 'get_component_docs',
      description: 'Get comprehensive documentation for a specific component including examples and props',
      inputSchema: {
        type: 'object',
        properties: {
          component_name: {
            type: 'string',
            description: 'Name of the component to get documentation for',
          },
          include_examples: {
            type: 'boolean',
            description: 'Include code examples in the documentation',
            default: true,
          },
          include_props: {
            type: 'boolean',
            description: 'Include props information',
            default: true,
          },
          include_styling: {
            type: 'boolean',
            description: 'Include styling information',
            default: false,
          },
        },
        required: ['component_name'],
      },
    },
    {
      name: 'recommend_components',
      description: 'Get AI-powered component recommendations based on natural language descriptions',
      inputSchema: {
        type: 'object',
        properties: {
          description: {
            type: 'string',
            description: 'Natural language description of what you want to build',
          },
          context: {
            type: 'string',
            description: 'Additional context for recommendations',
          },
          complexity: {
            type: 'string',
            description: 'Complexity level: simple, medium, or complex',
            enum: ['simple', 'medium', 'complex'],
            default: 'medium',
          },
          framework: {
            type: 'string',
            description: 'Target framework',
            default: 'react',
          },
        },
        required: ['description'],
      },
    },
    {
      name: 'generate_code',
      description: 'Generate complete code examples for specific components and patterns',
      inputSchema: {
        type: 'object',
        properties: {
          components: {
            type: 'string',
            description: 'Comma-separated list of component names to use',
          },
          pattern: {
            type: 'string',
            description: 'Code pattern to generate',
            enum: ['basic', 'form', 'dashboard', 'navigation', 'authentication', 'table', 'modal'],
            default: 'basic',
          },
          framework: {
            type: 'string',
            description: 'Target framework',
            default: 'react',
          },
          typescript: {
            type: 'boolean',
            description: 'Generate TypeScript code',
            default: true,
          },
          styling: {
            type: 'string',
            description: 'Styling approach',
            enum: ['css', 'tailwind', 'styled-components'],
            default: 'css',
          },
        },
        required: ['components'],
      },
    },
    {
      name: 'get_help',
      description: 'Get step-by-step integration guides and troubleshooting help',
      inputSchema: {
        type: 'object',
        properties: {
          topic: {
            type: 'string',
            description: 'Help topic',
            enum: ['installation', 'setup', 'css', 'typescript', 'nextjs', 'dependencies', 'troubleshooting', 'authentication', 'theming', 'performance'],
          },
          framework: {
            type: 'string',
            description: 'Target framework',
            default: 'react',
          },
          version: {
            type: 'string',
            description: 'Package version',
          },
        },
        required: ['topic'],
      },
    },
  ];

  // Public method to get tools for SSE endpoint
  public getTools(): MCPTool[] {
    return this.tools;
  }

  // Public method to get server info for SSE endpoint
  public getServerInfo(): MCPServerInfo {
    return this.serverInfo;
  }

  async handleRequest(request: MCPRequest): Promise<MCPResponse> {
    const { id, method, params } = request;

    try {
      switch (method) {
        case 'initialize':
          console.log('Initialize request received with params:', params);
          
          // Validate protocol version
          const clientProtocolVersion = params?.protocolVersion;
          if (clientProtocolVersion !== '2024-11-05') {
            console.warn(`Client protocol version mismatch: ${clientProtocolVersion}, expected: 2024-11-05`);
          }
          
          return {
            jsonrpc: '2.0',
            id,
            result: {
              protocolVersion: '2024-11-05',
              capabilities: this.serverInfo.capabilities,
              serverInfo: {
                name: this.serverInfo.name,
                version: this.serverInfo.version,
              },
            },
          };

        case 'tools/list':
          console.log('Tools list requested. Available tools:', this.tools.length);
          console.log('Tools:', this.tools.map(t => t.name));
          return {
            jsonrpc: '2.0',
            id,
            result: {
              tools: this.tools,
            },
          };

        case 'notifications/initialized':
          // Notifications don't have responses in MCP
          console.log('MCP client initialized');
          return {
            jsonrpc: '2.0',
            id,
            result: {},
          };

        case 'tools/call':
          return await this.handleToolCall(id, params);

        default:
          return {
            jsonrpc: '2.0',
            id,
            error: {
              code: -32601,
              message: 'Method not found',
            },
          };
      }
    } catch (error) {
      return {
        jsonrpc: '2.0',
        id,
        error: {
          code: -32603,
          message: 'Internal error',
          data: error instanceof Error ? error.message : 'Unknown error',
        },
      };
    }
  }

  private async handleToolCall(id: string | number, params: any): Promise<MCPResponse> {
    const { name, arguments: args } = params;

    try {
      let result: any;
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ui.instincthub.com';

      switch (name) {
        case 'search_components':
          result = await this.callAPI(`${baseUrl}/api/components/search`, {
            query: args.query,
            category: args.category,
            limit: args.limit,
          });
          break;

        case 'get_component_docs':
          result = await this.callAPI(`${baseUrl}/api/components/docs`, {
            component_name: args.component_name,
            include_examples: args.include_examples,
            include_props: args.include_props,
            include_styling: args.include_styling,
          });
          break;

        case 'recommend_components':
          result = await this.callAPI(`${baseUrl}/api/components/recommend`, {
            description: args.description,
            context: args.context,
            complexity: args.complexity,
            framework: args.framework,
          });
          break;

        case 'generate_code':
          result = await this.callAPI(`${baseUrl}/api/generate`, {
            components: args.components,
            pattern: args.pattern,
            framework: args.framework,
            typescript: args.typescript,
            styling: args.styling,
          });
          break;

        case 'get_help':
          result = await this.callAPI(`${baseUrl}/api/help`, {
            topic: args.topic,
            framework: args.framework,
            version: args.version,
          });
          break;

        default:
          return {
            jsonrpc: '2.0',
            id,
            error: {
              code: -32602,
              message: 'Invalid tool name',
            },
          };
      }

      return {
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        },
      };
    } catch (error) {
      return {
        jsonrpc: '2.0',
        id,
        error: {
          code: -32603,
          message: 'Tool execution failed',
          data: error instanceof Error ? error.message : 'Unknown error',
        },
      };
    }
  }

  private async callAPI(endpoint: string, params: Record<string, any>): Promise<any> {
    const url = new URL(endpoint);
    
    // Add query parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}

// Initialize MCP Server
const mcpServer = new InstinctHubMCPServer();

export async function GET(request: NextRequest) {
  // Return server info for basic GET requests (server discovery)
  console.log('GET request to MCP endpoint - returning server info');
  
  return NextResponse.json({
    name: 'InstinctHub React UI MCP Server',
    version: '1.0.0',
    description: 'MCP Server for InstinctHub React UI component library',
    protocol: {
      name: 'Model Context Protocol',
      version: '2024-11-05',
    },
    transports: {
      'json-rpc': {
        endpoint: '/api/mcp',
        method: 'POST',
        description: 'JSON-RPC over HTTP for Claude.ai Remote MCP'
      },
      'sse': {
        endpoint: '/api/mcp/sse',
        method: 'GET',
        description: 'Server-Sent Events for Vercel AI SDK and other SSE clients'
      }
    },
    capabilities: {
      tools: 5,
      resources: 0,
      prompts: 0,
    },
    tools: [
      'search_components',
      'get_component_docs', 
      'recommend_components',
      'generate_code',
      'get_help',
    ],
    usage: {
      'claude-ai': {
        url: 'https://ui.instincthub.com/api/mcp',
        description: 'Use this URL in Claude.ai Remote MCP integration'
      },
      'vercel-ai-sdk': {
        url: 'https://ui.instincthub.com/api/mcp/sse',
        description: 'Use this URL with experimental_createMCPClient SSE transport'
      }
    }
  }, {
    headers: getCorsHeaders(),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Enhanced debugging for MCP handshake sequence
    console.log('=====================================');
    console.log('MCP Request received:', JSON.stringify(body, null, 2));
    console.log('Request headers:', Object.fromEntries(request.headers.entries()));
    console.log('Request method:', body.method);
    console.log('Request ID:', body.id);
    console.log('=====================================');
    
    // Handle MCP JSON-RPC request
    if (body.jsonrpc === '2.0' && body.method) {
      const response = await mcpServer.handleRequest(body);
      
      // Enhanced response logging
      console.log('=====================================');
      console.log('MCP Response sending:', JSON.stringify(response, null, 2));
      console.log('Response for method:', body.method);
      console.log('Response ID matches request:', response.id === body.id);
      console.log('=====================================');
      
      // For notifications, we might not need to send a response
      if (body.method.startsWith('notifications/') && !body.id) {
        return new Response(null, { 
          status: 204,
          headers: getCorsHeaders(),
        });
      }
      
      return NextResponse.json(response, {
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(),
        },
      });
    }

    return NextResponse.json({
      error: 'Invalid MCP request format',
      received: body,
    }, { 
      status: 400,
      headers: getCorsHeaders(),
    });

  } catch (error) {
    console.error('MCP Error:', error);
    return NextResponse.json({
      error: 'Failed to process MCP request',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { 
      status: 500,
      headers: getCorsHeaders(),
    });
  }
}

export async function OPTIONS(request: NextRequest) {
  // Handle preflight requests comprehensively
  console.log('OPTIONS preflight request received');
  console.log('Request headers:', Object.fromEntries(request.headers.entries()));
  
  return new Response(null, {
    status: 200,
    headers: getCorsHeaders(),
  });
}