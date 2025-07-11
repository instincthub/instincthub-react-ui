/**
 * API Client for InstinctHub React UI Remote API
 */

const API_BASE_URL = process.env.API_BASE_URL || 'https://ui.instincthub.com';

export class APIClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || API_BASE_URL;
  }

  async request(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    // Add query parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    console.error(`[API] Calling: ${url.toString()}`);

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'InstinctHub-MCP-Server/1.0.0',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.error(`[API] Response received:`, data.success ? 'SUCCESS' : 'ERROR');
      return data;
    } catch (error) {
      console.error(`[API] Request failed:`, error);
      throw new Error(`API request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Component search
  async searchComponents(query: string, category?: string, limit?: number) {
    return this.request('/api/components/search', { query, category, limit });
  }

  // Component documentation
  async getComponentDocs(componentName: string, includeExamples?: boolean, includeProps?: boolean, includeStyling?: boolean) {
    return this.request('/api/components/docs', {
      component_name: componentName,
      include_examples: includeExamples,
      include_props: includeProps,
      include_styling: includeStyling,
    });
  }

  // Component recommendations
  async recommendComponents(description: string, context?: string, complexity?: string, framework?: string) {
    return this.request('/api/components/recommend', {
      description,
      context,
      complexity,
      framework,
    });
  }

  // Code generation
  async generateCode(components: string, pattern?: string, framework?: string, typescript?: boolean, styling?: string) {
    return this.request('/api/generate', {
      components,
      pattern,
      framework,
      typescript,
      styling,
    });
  }

  // Integration help
  async getHelp(topic: string, framework?: string, version?: string) {
    return this.request('/api/help', {
      topic,
      framework,
      version,
    });
  }
}

// Export singleton instance
export const apiClient = new APIClient();