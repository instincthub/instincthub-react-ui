import { NextRequest, NextResponse } from 'next/server';
import { ComponentInfo, SearchResult, ComponentSearchFilter } from '@/__examples__/src/types/components';
import componentsData from '@/__examples__/src/data/components.json';

class ComponentSearchAPI {
  private components: ComponentInfo[] = componentsData as ComponentInfo[];
  private categories: string[] = [];

  constructor() {
    this.categories = [...new Set(this.components.map(c => c.category))];
  }

  searchComponents(
    query: string,
    filters: ComponentSearchFilter = {},
    limit: number = 10
  ): SearchResult[] {
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    const results: SearchResult[] = [];

    for (const component of this.components) {
      // Apply category filter
      if (filters.category && component.category !== filters.category) {
        continue;
      }

      // Apply type filter
      if (filters.type && component.type !== filters.type) {
        continue;
      }

      // Apply tag filter
      if (filters.tags && filters.tags.length > 0) {
        const hasTag = filters.tags.some(tag => 
          component.tags?.includes(tag.toLowerCase())
        );
        if (!hasTag) {
          continue;
        }
      }

      const searchResult = this.calculateRelevance(component, searchTerms);
      if (searchResult.score > 0) {
        results.push(searchResult);
      }
    }

    // Sort by relevance score (descending)
    results.sort((a, b) => b.score - a.score);

    return results.slice(0, limit);
  }

  private calculateRelevance(component: ComponentInfo, searchTerms: string[]): SearchResult {
    let score = 0;
    const matchReasons: string[] = [];
    const relevantContext: string[] = [];

    const componentName = component.name.toLowerCase();
    const componentDescription = component.description.toLowerCase();
    const componentCategory = component.category.toLowerCase();

    for (const term of searchTerms) {
      // Exact name match (highest priority)
      if (componentName === term) {
        score += 100;
        matchReasons.push(`Exact name match: "${term}"`);
        relevantContext.push(`Component name: ${component.name}`);
        continue;
      }

      // Name starts with term (high priority)
      if (componentName.startsWith(term)) {
        score += 80;
        matchReasons.push(`Name starts with: "${term}"`);
        relevantContext.push(`Component name: ${component.name}`);
        continue;
      }

      // Name contains term (medium priority)
      if (componentName.includes(term)) {
        score += 60;
        matchReasons.push(`Name contains: "${term}"`);
        relevantContext.push(`Component name: ${component.name}`);
        continue;
      }

      // Description contains term (medium priority)
      if (componentDescription.includes(term)) {
        score += 40;
        matchReasons.push(`Description contains: "${term}"`);
        relevantContext.push(`Description: ${component.description}`);
        continue;
      }

      // Category match (lower priority)
      if (componentCategory.includes(term)) {
        score += 20;
        matchReasons.push(`Category match: "${term}"`);
        relevantContext.push(`Category: ${component.category}`);
        continue;
      }

      // Tag match (lower priority)
      if (component.tags?.some(tag => tag.includes(term))) {
        score += 15;
        matchReasons.push(`Tag match: "${term}"`);
        relevantContext.push(`Tags: ${component.tags?.join(', ')}`);
        continue;
      }

      // Fuzzy matching for typos (very low priority)
      if (this.fuzzyMatch(componentName, term) || this.fuzzyMatch(componentDescription, term)) {
        score += 10;
        matchReasons.push(`Fuzzy match: "${term}"`);
      }
    }

    return {
      component,
      score,
      matchReason: matchReasons.join(', '),
      relevantContext,
    };
  }

  private fuzzyMatch(text: string, term: string): boolean {
    if (term.length < 3) return false;
    
    // Simple fuzzy matching - check if most characters are present
    const textChars = text.toLowerCase().split('');
    const termChars = term.toLowerCase().split('');
    
    let matches = 0;
    for (const char of termChars) {
      if (textChars.includes(char)) {
        matches++;
      }
    }
    
    return matches / termChars.length > 0.7;
  }

  private getImportPath(component: ComponentInfo): string {
    // Determine the import path based on the component location
    if (component.repo_path.includes('/lib/')) {
      return '/lib';
    } else if (component.repo_path.includes('/redux/')) {
      return '/redux';
    } else if (component.repo_path.includes('/cursors/')) {
      return '/cursors';
    } else if (component.repo_path.includes('/types/')) {
      return '/types';
    } else if (component.repo_path.includes('/ssr')) {
      return '/ssr';
    }
    return ''; // Main package
  }

  private generateSearchSuggestions(query: string, results: SearchResult[]): string[] {
    const suggestions: string[] = [];

    if (results.length === 0) {
      suggestions.push('Try searching for component categories like "form", "button", "table", "chart"');
      suggestions.push('Search for specific functionality like "input", "modal", "navigation"');
      suggestions.push('Use component names like "SubmitButton", "InputText", "IHubTable"');
    } else if (results.length < 5) {
      // Get related components from the same categories
      const categories = [...new Set(results.map(r => r.component.category))];
      const relatedComponents = this.components.filter(c => 
        categories.includes(c.category) && !results.some(r => r.component.name === c.name)
      );
      
      if (relatedComponents.length > 0) {
        suggestions.push(`Related components: ${relatedComponents.slice(0, 3).map(c => c.name).join(', ')}`);
      }
    }

    // Category-based suggestions
    if (!query.toLowerCase().includes('form') && this.components.some(c => c.category === 'Forms')) {
      suggestions.push('Try searching "form" for form-related components');
    }
    
    if (!query.toLowerCase().includes('ui') && this.components.some(c => c.category === 'UI')) {
      suggestions.push('Try searching "ui" for general UI components');
    }

    return suggestions;
  }

  async execute(query: string, category?: string, limit: number = 10) {
    try {
      const results = this.searchComponents(query, { category }, limit);
      
      return {
        success: true,
        data: {
          query,
          total: results.length,
          results: results.map(result => ({
            component: result.component,
            relevance: result.score,
            matchReason: result.matchReason,
            importPath: `@instincthub/react-ui${this.getImportPath(result.component)}`,
            repositoryUrl: `https://github.com/instincthub/instincthub-react-ui/blob/main/${result.component.repo_path}`,
          })),
          categories: this.categories,
        },
        suggestions: this.generateSearchSuggestions(query, results),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}

const searchAPI = new ComponentSearchAPI();

export async function POST(request: NextRequest) {
  try {
    const { query, category, limit = 10 } = await request.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query parameter is required and must be a string' },
        { status: 400 }
      );
    }

    const result = await searchAPI.execute(query, category, limit);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    const result = await searchAPI.execute(query, category || undefined, limit);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}