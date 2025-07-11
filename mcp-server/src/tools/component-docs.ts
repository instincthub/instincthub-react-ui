import { apiClient } from '../api-client.js';

export class ComponentDocsTool {
  async execute(args: any) {
    const { component_name, include_examples = true, include_props = true, include_styling = false } = args;

    try {
      console.error(`[ComponentDocs] Getting docs for: "${component_name}"`);
      
      const result = await apiClient.getComponentDocs(
        component_name,
        include_examples,
        include_props,
        include_styling
      );
      
      console.error(`[ComponentDocs] Documentation retrieved for ${component_name}`);
      
      return result;
    } catch (error) {
      console.error(`[ComponentDocs] Error:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get documentation',
        suggestions: ['Check component name spelling', 'Try searching for the component first']
      };
    }
  }
}