export interface ComponentInfo {
  name: string;
  description: string;
  category: string;
  repo_path: string;
  type: 'component' | 'hook' | 'context' | 'utility';
  tags?: string[];
}

export interface SearchResult {
  component: ComponentInfo;
  score: number;
  matchReason: string;
  relevantContext: string[];
}

export interface ComponentSearchFilter {
  category?: string;
  type?: 'component' | 'hook' | 'context' | 'utility';
  tags?: string[];
}

export interface ComponentCategory {
  name: string;
  description: string;
  components: ComponentInfo[];
}

export interface ComponentSummary {
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

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  suggestions?: string[];
}

export interface SearchResponse {
  query: string;
  total: number;
  results: Array<{
    component: ComponentInfo;
    relevance: number;
    matchReason: string;
    importPath: string;
    repositoryUrl: string;
  }>;
  categories: string[];
}

export interface RecommendationRequest {
  description: string;
  context?: string;
  complexity?: 'simple' | 'medium' | 'complex';
  framework?: string;
  existingComponents?: string[];
}

export interface RecommendationResponse {
  recommendations: Array<{
    component: ComponentInfo;
    relevance: number;
    reasoning: string;
    codeExample: string;
    importPath: string;
    repositoryUrl: string;
  }>;
  alternatives: ComponentInfo[];
  implementation: {
    steps: string[];
    codeSnippet: string;
    dependencies: string[];
  };
}

export interface CodeGenerationRequest {
  components: string[];
  pattern?: string;
  framework?: string;
  typescript?: boolean;
  styling?: 'css' | 'tailwind' | 'styled-components';
}

export interface CodeGenerationResponse {
  imports: string;
  component: string;
  styling: string;
  usage: string;
  explanation: string;
}

export interface IntegrationHelpRequest {
  topic: string;
  framework?: string;
  version?: string;
}

export interface IntegrationHelpResponse {
  title: string;
  description: string;
  steps: Array<{
    step: number;
    title: string;
    description: string;
    code?: string;
  }>;
  troubleshooting: Array<{
    issue: string;
    solution: string;
  }>;
  relatedComponents: ComponentInfo[];
}

export interface DocsRequest {
  component_name: string;
  include_examples?: boolean;
  include_props?: boolean;
  include_styling?: boolean;
}

export interface DocsResponse {
  component: ComponentInfo;
  documentation: {
    overview: string;
    usage: string;
    props?: Array<{
      name: string;
      type: string;
      required: boolean;
      description: string;
      default?: string;
    }>;
    examples?: Array<{
      title: string;
      code: string;
      description: string;
    }>;
    styling?: {
      classes: string[];
      customization: string;
    };
  };
  relatedComponents: ComponentInfo[];
}