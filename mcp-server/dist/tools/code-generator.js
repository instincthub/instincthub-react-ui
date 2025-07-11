import { apiClient } from '../api-client.js';
export class CodeGeneratorTool {
    async execute(args) {
        const { components, pattern = 'basic', framework = 'react', typescript = true, styling = 'css' } = args;
        try {
            // Convert components array to comma-separated string if needed
            const componentsStr = Array.isArray(components) ? components.join(',') : components;
            console.error(`[CodeGenerator] Generating code for: "${componentsStr}" with pattern: ${pattern}`);
            const result = await apiClient.generateCode(componentsStr, pattern, framework, typescript, styling);
            console.error(`[CodeGenerator] Code generated successfully`);
            return result;
        }
        catch (error) {
            console.error(`[CodeGenerator] Error:`, error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to generate code',
                suggestions: ['Check component names', 'Try a simpler pattern first']
            };
        }
    }
}
//# sourceMappingURL=code-generator.js.map