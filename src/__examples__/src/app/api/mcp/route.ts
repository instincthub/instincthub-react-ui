import { NextRequest, NextResponse } from 'next/server';

// Simple CORS headers
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

// Simple MCP Tools Definition
const MCP_TOOLS = [
  {
    name: 'search_components',
    description: 'Search for React components by name, description, or functionality',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query' },
        category: { type: 'string', description: 'Component category' },
        limit: { type: 'number', description: 'Max results', default: 10 }
      },
      required: ['query']
    }
  },
  {
    name: 'get_component_docs',
    description: 'Get documentation for a specific component',
    inputSchema: {
      type: 'object',
      properties: {
        component_name: { type: 'string', description: 'Component name' },
        include_examples: { type: 'boolean', default: true },
        include_props: { type: 'boolean', default: true }
      },
      required: ['component_name']
    }
  },
  {
    name: 'recommend_components',
    description: 'Get AI-powered component recommendations',
    inputSchema: {
      type: 'object',
      properties: {
        description: { type: 'string', description: 'What you want to build' },
        complexity: { type: 'string', enum: ['simple', 'medium', 'complex'], default: 'medium' }
      },
      required: ['description']
    }
  },
  {
    name: 'generate_code',
    description: 'Generate code examples for components',
    inputSchema: {
      type: 'object',
      properties: {
        components: { type: 'string', description: 'Comma-separated component names' },
        pattern: { type: 'string', enum: ['basic', 'form', 'dashboard'], default: 'basic' },
        typescript: { type: 'boolean', default: true }
      },
      required: ['components']
    }
  },
  {
    name: 'get_help',
    description: 'Get integration help and troubleshooting',
    inputSchema: {
      type: 'object',
      properties: {
        topic: { type: 'string', enum: ['installation', 'setup', 'typescript', 'troubleshooting'] }
      },
      required: ['topic']
    }
  }
];

// Handle tool execution
async function executeTool(name: string, args: any) {
  console.log(`Executing tool: ${name} with args:`, args);
  
  const baseUrl = 'https://ui.instincthub.com';
  let endpoint = '';
  let params: Record<string, any> = {};

  switch (name) {
    case 'search_components':
      endpoint = `${baseUrl}/api/components/search`;
      params = { query: args.query, category: args.category, limit: args.limit };
      break;
    case 'get_component_docs':
      endpoint = `${baseUrl}/api/components/docs`;
      params = { component_name: args.component_name, include_examples: args.include_examples, include_props: args.include_props };
      break;
    case 'recommend_components':
      endpoint = `${baseUrl}/api/components/recommend`;
      params = { description: args.description, complexity: args.complexity };
      break;
    case 'generate_code':
      endpoint = `${baseUrl}/api/generate`;
      params = { components: args.components, pattern: args.pattern, typescript: args.typescript };
      break;
    case 'get_help':
      endpoint = `${baseUrl}/api/help`;
      params = { topic: args.topic };
      break;
    default:
      throw new Error(`Unknown tool: ${name}`);
  }

  // Build URL with query parameters
  const url = new URL(endpoint);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });

  console.log(`Calling API: ${url.toString()}`);
  
  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }
    const result = await response.json();
    console.log(`API response:`, result);
    return result;
  } catch (error) {
    console.error(`Tool execution failed:`, error);
    throw error;
  }
}

// GET - Server discovery
export async function GET() {
  console.log('MCP Server - GET request for server info');
  
  return NextResponse.json({
    name: 'InstinctHub React UI',
    version: '1.0.0',
    description: 'MCP Server for InstinctHub React UI components',
    tools: MCP_TOOLS.length,
    available_tools: MCP_TOOLS.map(t => t.name)
  }, { headers: CORS_HEADERS });
}

// POST - MCP Protocol
export async function POST(request: NextRequest) {
  console.log('='.repeat(50));
  console.log('MCP Server - POST request received');
  
  try {
    const body = await request.json();
    console.log('Request body:', JSON.stringify(body, null, 2));

    // Handle initialize
    if (body.method === 'initialize') {
      console.log('Handling initialize request');
      return NextResponse.json({
        jsonrpc: '2.0',
        id: body.id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: { listChanged: true }
          },
          serverInfo: {
            name: 'InstinctHub React UI',
            version: '1.0.0'
          }
        }
      }, { headers: CORS_HEADERS });
    }

    // Handle tools/list
    if (body.method === 'tools/list') {
      console.log('Handling tools/list request');
      console.log(`Returning ${MCP_TOOLS.length} tools`);
      return NextResponse.json({
        jsonrpc: '2.0',
        id: body.id,
        result: {
          tools: MCP_TOOLS
        }
      }, { headers: CORS_HEADERS });
    }

    // Handle tools/call
    if (body.method === 'tools/call') {
      console.log('Handling tools/call request');
      const { name, arguments: args } = body.params;
      console.log(`Calling tool: ${name}`);
      
      try {
        const result = await executeTool(name, args);
        return NextResponse.json({
          jsonrpc: '2.0',
          id: body.id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2)
              }
            ]
          }
        }, { headers: CORS_HEADERS });
      } catch (error) {
        console.error('Tool execution error:', error);
        return NextResponse.json({
          jsonrpc: '2.0',
          id: body.id,
          error: {
            code: -32603,
            message: 'Tool execution failed',
            data: error instanceof Error ? error.message : 'Unknown error'
          }
        }, { headers: CORS_HEADERS });
      }
    }

    // Handle notifications/initialized
    if (body.method === 'notifications/initialized') {
      console.log('Handling notifications/initialized');
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    // Unknown method
    console.log(`Unknown method: ${body.method}`);
    return NextResponse.json({
      jsonrpc: '2.0',
      id: body.id,
      error: {
        code: -32601,
        message: 'Method not found'
      }
    }, { headers: CORS_HEADERS });

  } catch (error) {
    console.error('MCP Server error:', error);
    return NextResponse.json({
      error: 'Invalid request',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 400, headers: CORS_HEADERS });
  }
}

// OPTIONS - CORS preflight
export async function OPTIONS() {
  console.log('MCP Server - OPTIONS preflight request');
  return new Response(null, { status: 200, headers: CORS_HEADERS });
}