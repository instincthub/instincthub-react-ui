#!/usr/bin/env node
declare class StaticDocumentationGenerator {
    private srcPath;
    private docsOutputPath;
    private components;
    constructor();
    /**
     * Parse ComponentLists.tsx to get all component information
     */
    private parseComponentListsFile;
    /**
     * Read README.md file for a component if it exists
     */
    private readComponentReadme;
    /**
     * Extract TypeScript interface/props from component file
     */
    private extractComponentProps;
    /**
     * Extract usage examples from component files or example files
     */
    private extractComponentExamples;
    /**
     * Generate categories with enriched component data
     */
    private generateComponentCategories;
    private getCategoryDescription;
    private getCategoryColor;
    private getCategoryIcon;
    /**
     * Generate comprehensive markdown documentation for a component
     */
    private generateComponentMarkdown;
    /**
     * Generate category overview markdown
     */
    private generateCategoryMarkdown;
    /**
     * Generate main documentation index
     */
    private generateMainIndex;
    /**
     * Generate search index JSON for quick component lookup
     */
    private generateSearchIndex;
    /**
     * Main generation method
     */
    generate(): Promise<void>;
}
export { StaticDocumentationGenerator };
//# sourceMappingURL=generate-docs.d.ts.map