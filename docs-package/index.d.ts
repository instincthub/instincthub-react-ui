export interface ComponentInfo {
  name: string;
  description: string;
  category: string;
  repo_path: string;
  type?: 'component' | 'hook' | 'context' | 'utility';
  tags?: string[];
}

export interface ComponentCategory {
  name: string;
  description: string;
  components: ComponentInfo[];
  color: string;
  icon: string;
  count: number;
}

export interface SearchOptions {
  category?: string;
  type?: 'component' | 'hook' | 'context' | 'utility';
  limit?: number;
}

export interface RecommendationOptions {
  limit?: number;
  category?: string;
}

export interface UsageExample {
  imports: string;
  usage: string;
  complete: string;
}

export interface StyleFile {
  name: string;
  description: string;
  purpose: string;
  loadOrder: number;
  required: boolean;
}

export interface StyleGuide {
  overview: {
    description: string;
    totalFiles: number;
    coreFiles: StyleFile[];
    loadingOrder: string[];
  };
  files: string[];
  variables: Record<string, string>;
  utilityClasses: string[];
  integrationGuide: Record<string, string[]>;
  examples: {
    basicSetup: string;
    categorySpecific: string;
    customization: string;
  };
}

export interface ComponentStyleRequirements {
  component: string;
  required: string[];
  category: string;
  loadingOrder: string[];
  example: string;
}

export interface Summary {
  totalComponents: number;
  categories: Array<{
    name: string;
    count: number;
    description: string;
  }>;
  componentTypes: {
    component: number;
    hook: number;
    context: number;
    utility: number;
  };
  generatedAt: string;
}

export declare class InstinctHubDocs {
  constructor();
  
  getComponents(): ComponentInfo[];
  getCategories(): ComponentCategory[];
  getSearchIndex(): any;
  getEnhancedData(): any;
  
  searchComponents(query: string, options?: SearchOptions): ComponentInfo[];
  getComponent(name: string): ComponentInfo | undefined;
  getComponentsByCategory(categoryName: string): ComponentInfo[];
  getComponentDocs(componentName: string): string;
  getCategoryDocs(categoryName: string): string;
  getMainDocs(): string;
  getRecommendations(description: string, options?: RecommendationOptions): ComponentInfo[];
  getSummary(): Summary;
  generateUsageExample(componentName: string, framework?: string): UsageExample;
  
  // CSS/Styling methods
  getStyleFiles(): string[];
  getStyleContent(filename: string): string;
  getCSSVariables(): Record<string, string>;
  getUtilityClasses(): string[];
  getStyleGuide(): StyleGuide;
  getComponentStyleRequirements(componentName: string): ComponentStyleRequirements;
}

export declare const docs: InstinctHubDocs;

export declare function searchComponents(query: string, options?: SearchOptions): ComponentInfo[];
export declare function getComponent(name: string): ComponentInfo | undefined;
export declare function getComponents(): ComponentInfo[];
export declare function getCategories(): ComponentCategory[];
export declare function getComponentDocs(name: string): string;
export declare function getCategoryDocs(name: string): string;
export declare function getRecommendations(description: string, options?: RecommendationOptions): ComponentInfo[];
export declare function getSummary(): Summary;
export declare function generateUsageExample(name: string, framework?: string): UsageExample;

// CSS/Styling function exports
export declare function getStyleFiles(): string[];
export declare function getStyleContent(filename: string): string;
export declare function getCSSVariables(): Record<string, string>;
export declare function getUtilityClasses(): string[];
export declare function getStyleGuide(): StyleGuide;
export declare function getComponentStyleRequirements(name: string): ComponentStyleRequirements;