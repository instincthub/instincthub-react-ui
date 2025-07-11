#!/usr/bin/env node
declare class InstinctHubMCPServer {
    private server;
    private tools;
    constructor();
    private setupTools;
    private setupHandlers;
    start(): Promise<void>;
    healthCheck(): Promise<boolean>;
    static dockerHealthCheck(): Promise<void>;
}
export { InstinctHubMCPServer };
//# sourceMappingURL=index.d.ts.map