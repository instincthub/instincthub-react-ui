import { ComponentInfo } from './index';

export interface AdvancedSearchOptions {
  query?: string;
  category?: string;
  type?: 'component' | 'hook' | 'context' | 'utility';
  tags?: string | string[];
  pattern?: string;
  fuzzy?: boolean;
  limit?: number;
}

export interface Suggestion {
  type: 'component' | 'category' | 'tag';
  value: string;
  description: string;
}

export interface Suggestions {
  components: Suggestion[];
  categories: Suggestion[];
  tags: Suggestion[];
}

export declare class ComponentSearch {
  constructor();
  
  fuzzySearch(query: string, threshold?: number): ComponentInfo[];
  calculateSimilarity(query: string, keywords: string[]): number;
  stringSimilarity(str1: string, str2: string): number;
  levenshteinDistance(str1: string, str2: string): number;
  searchByTags(tags: string | string[]): ComponentInfo[];
  searchByPattern(pattern: string): ComponentInfo[];
  advancedSearch(options?: AdvancedSearchOptions): ComponentInfo[];
  getSuggestions(partialQuery: string, limit?: number): Suggestions;
}

export declare const search: ComponentSearch;

export declare function fuzzySearch(query: string, threshold?: number): ComponentInfo[];
export declare function searchByTags(tags: string | string[]): ComponentInfo[];
export declare function searchByPattern(pattern: string): ComponentInfo[];
export declare function advancedSearch(options?: AdvancedSearchOptions): ComponentInfo[];
export declare function getSuggestions(query: string, limit?: number): Suggestions;