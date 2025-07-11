import { apiClient } from '../api-client.js';

export class ComponentSearchTool {
  async execute(args: any) {
    const { query, category, limit = 10 } = args;

    try {
      console.error(`[ComponentSearch] Searching for: "${query}" in category: ${category || 'all'}`);
      
      const result = await apiClient.searchComponents(query, category, limit);
      
      console.error(`[ComponentSearch] Found ${result.data?.total || 0} results`);
      
      return result;
    } catch (error) {
      console.error(`[ComponentSearch] Error:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Search failed',
        suggestions: ['Try a different search term', 'Check component categories']
      };
    }
  }
}