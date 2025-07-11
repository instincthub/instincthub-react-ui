export interface ComponentInfo {
    name: string;
    description: string;
    category: string;
    repo_path: string;
    type?: 'component' | 'hook' | 'context' | 'utility';
    props?: ComponentProp[];
    examples?: string[];
    dependencies?: string[];
    tags?: string[];
}
export interface ComponentProp {
    name: string;
    type: string;
    required: boolean;
    description: string;
    defaultValue?: string;
}
export interface ComponentCategory {
    name: string;
    description: string;
    components: ComponentInfo[];
    color?: string;
    icon?: string;
}
export interface SearchResult {
    component: ComponentInfo;
    score: number;
    matchReason: string;
    relevantContext?: string[];
}
export interface PromptAnalysis {
    intent: string;
    keywords: string[];
    suggestedCategories: string[];
    uiPatterns: string[];
    complexity: 'simple' | 'medium' | 'complex';
    context: string;
}
export interface RecommendationResult {
    primary: ComponentInfo[];
    secondary: ComponentInfo[];
    patterns: ComponentPattern[];
    reasoning: string;
    examples: CodeExample[];
}
export interface ComponentPattern {
    name: string;
    description: string;
    components: ComponentInfo[];
    code: string;
    useCase: string;
}
export interface CodeExample {
    title: string;
    description: string;
    code: string;
    language: string;
    imports: string[];
    dependencies?: string[];
}
export interface MCPToolResult {
    success: boolean;
    data?: any;
    error?: string;
    suggestions?: string[];
}
export type ComponentSearchFilter = {
    category?: string;
    type?: ComponentInfo['type'];
    hasProps?: boolean;
    tags?: string[];
};
export type SortOrder = 'relevance' | 'alphabetical' | 'category' | 'recent';
export interface IntegrationGuide {
    title: string;
    description: string;
    steps: IntegrationStep[];
    codeExamples: CodeExample[];
    troubleshooting: TroubleshootingItem[];
}
export interface IntegrationStep {
    title: string;
    description: string;
    code?: string;
    commands?: string[];
    files?: string[];
}
export interface TroubleshootingItem {
    problem: string;
    solution: string;
    code?: string;
    links?: string[];
}
export interface DocumentationLink {
    title: string;
    url: string;
    type: 'api' | 'guide' | 'example' | 'readme';
}
export interface UsagePattern {
    name: string;
    description: string;
    frequency: 'common' | 'moderate' | 'advanced';
    components: string[];
    example: string;
}
//# sourceMappingURL=index.d.ts.map