import { apiClient } from '../api-client.js';

export class IntegrationHelperTool {
  async execute(args: any) {
    const { topic, framework = 'react', version } = args;

    try {
      console.error(`[IntegrationHelper] Getting help for topic: "${topic}" with framework: ${framework}`);
      
      const result = await apiClient.getHelp(topic, framework, version);
      
      console.error(`[IntegrationHelper] Help content retrieved for ${topic}`);
      
      return result;
    } catch (error) {
      console.error(`[IntegrationHelper] Error:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get integration help',
        suggestions: ['Try a different help topic', 'Check available help topics']
      };
    }
  }
}