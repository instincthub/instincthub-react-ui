#!/usr/bin/env node
declare class EnhancedDataExporter {
    private srcPath;
    private outputPath;
    private components;
    constructor();
    /**
     * Load existing component data from the generated JSON
     */
    private loadComponentData;
    /**
     * Extract detailed prop information from TypeScript files
     */
    private extractDetailedProps;
    /**
     * Extract usage examples with enhanced metadata
     */
    private extractEnhancedExamples;
    /**
     * Determine related components based on category and naming patterns
     */
    private findRelatedComponents;
    private hasSimilarNaming;
    /**
     * Analyze component for usage patterns
     */
    private extractUsagePatterns;
    /**
     * Analyze dependencies for component
     */
    private extractDependencies;
    /**
     * Generate enhanced component data
     */
    private enhanceComponentData;
    private getStyleRequirements;
    private analyzePerformance;
    private analyzeAccessibility;
    private analyzeTestCoverage;
    /**
     * Generate code templates and patterns
     */
    private generateCodeTemplates;
    /**
     * Generate comprehensive search index
     */
    private generateEnhancedSearchIndex;
    /**
     * Main export method
     */
    export(): Promise<void>;
}
export { EnhancedDataExporter };
//# sourceMappingURL=export-enhanced-data.d.ts.map