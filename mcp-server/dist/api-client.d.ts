/**
 * API Client for InstinctHub React UI Remote API
 */
export declare class APIClient {
    private baseUrl;
    constructor(baseUrl?: string);
    request(endpoint: string, params?: Record<string, any>): Promise<any>;
    searchComponents(query: string, category?: string, limit?: number): Promise<any>;
    getComponentDocs(componentName: string, includeExamples?: boolean, includeProps?: boolean, includeStyling?: boolean): Promise<any>;
    recommendComponents(description: string, context?: string, complexity?: string, framework?: string): Promise<any>;
    generateCode(components: string, pattern?: string, framework?: string, typescript?: boolean, styling?: string): Promise<any>;
    getHelp(topic: string, framework?: string, version?: string): Promise<any>;
}
export declare const apiClient: APIClient;
//# sourceMappingURL=api-client.d.ts.map