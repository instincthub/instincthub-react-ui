import { NextRequest } from "next/server";

// Import shared MCP types and server from parent
import { MCPTool, InstinctHubMCPServer } from "../route";

// Initialize shared MCP server instance
const mcpServer = new InstinctHubMCPServer();

// SSE connection manager
class SSEConnection {
  private encoder = new TextEncoder();
  private controller: ReadableStreamDefaultController<Uint8Array> | null = null;
  private connectionId: string;

  constructor(connectionId: string) {
    this.connectionId = connectionId;
  }

  setController(controller: ReadableStreamDefaultController<Uint8Array>) {
    this.controller = controller;
  }

  send(data: any) {
    if (this.controller) {
      const message = `data: ${JSON.stringify(data)}\n\n`;
      this.controller.enqueue(this.encoder.encode(message));
      console.log(`[SSE ${this.connectionId}] Sent:`, data);
    }
  }

  sendEvent(event: string, data: any) {
    if (this.controller) {
      const message = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
      this.controller.enqueue(this.encoder.encode(message));
      console.log(`[SSE ${this.connectionId}] Sent event ${event}:`, data);
    }
  }

  close() {
    if (this.controller) {
      this.controller.close();
      console.log(`[SSE ${this.connectionId}] Connection closed`);
    }
  }
}

export async function GET(request: NextRequest) {
  const connectionId = Math.random().toString(36).substring(7);
  console.log(`[SSE ${connectionId}] New SSE connection established`);
  console.log(
    `[SSE ${connectionId}] Request headers:`,
    Object.fromEntries(request.headers.entries())
  );

  const connection = new SSEConnection(connectionId);

  const stream = new ReadableStream({
    start(controller) {
      connection.setController(controller);

      // Send initial server info and capabilities
      connection.sendEvent("server-info", {
        name: "InstinctHub React UI MCP Server",
        version: "1.0.0",
        protocol: {
          name: "Model Context Protocol",
          version: "2024-11-05",
          transport: "sse",
        },
        capabilities: {
          tools: {
            listChanged: true,
          },
          logging: {},
        },
      });

      // Send tools list immediately for Vercel AI SDK compatibility
      const tools = mcpServer.getTools();
      connection.sendEvent("tools", {
        tools: tools,
      });

      console.log(
        `[SSE ${connectionId}] Initial setup complete, ${tools.length} tools available`
      );
    },

    cancel() {
      console.log(`[SSE ${connectionId}] Client disconnected`);
      connection.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, Accept, Cache-Control",
      "Access-Control-Expose-Headers":
        "Content-Length, Content-Type, Date, Server",
      "Access-Control-Allow-Credentials": "false",
      "X-Accel-Buffering": "no", // Disable nginx buffering
    },
  });
}

export async function POST(request: NextRequest) {
  const connectionId = Math.random().toString(36).substring(7);
  console.log(`[SSE ${connectionId}] POST request to SSE endpoint`);

  try {
    const body = await request.json();
    console.log(
      `[SSE ${connectionId}] MCP Request:`,
      JSON.stringify(body, null, 2)
    );

    // Handle MCP requests over SSE endpoint
    if (body.jsonrpc === "2.0" && body.method) {
      const response = await mcpServer.handleRequest(body);
      console.log(
        `[SSE ${connectionId}] MCP Response:`,
        JSON.stringify(response, null, 2)
      );

      return new Response(JSON.stringify(response), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
        },
      });
    }

    return new Response(
      JSON.stringify({
        error: "Invalid MCP request format",
        received: body,
      }),
      {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
        },
      }
    );
  } catch (error) {
    console.error(`[SSE ${connectionId}] Error:`, error);
    return new Response(
      JSON.stringify({
        error: "Failed to process MCP request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
        },
      }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  console.log("[SSE] OPTIONS preflight request for SSE endpoint");

  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, Accept, Cache-Control",
      "Access-Control-Max-Age": "86400",
    },
  });
}
