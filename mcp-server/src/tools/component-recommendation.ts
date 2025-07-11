import { apiClient } from '../api-client.js';

export class ComponentRecommendationTool {
  async execute(args: any) {
    const { description, context, include_examples = true, complexity = 'medium' } = args;

    try {
      console.error(`[ComponentRecommendation] Getting recommendations for: "${description}"`);
      
      const result = await apiClient.recommendComponents(
        description,
        context,
        complexity,
        'react'
      );
      
      console.error(`[ComponentRecommendation] Recommendations generated`);
      
      return result;
    } catch (error) {
      console.error(`[ComponentRecommendation] Error:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get recommendations',
        suggestions: ['Try describing your use case more specifically', 'Include more context about your application']
      };
    }
  }
}