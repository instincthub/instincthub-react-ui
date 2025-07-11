const { docs } = require('./index');

/**
 * Advanced search functionality for InstinctHub React UI components
 */

class ComponentSearch {
  constructor() {
    this.fuse = null; // Could integrate Fuse.js for fuzzy search if needed
  }

  /**
   * Fuzzy search for components
   */
  fuzzySearch(query, threshold = 0.7) {
    const components = docs.getComponents();
    const searchIndex = docs.getSearchIndex();
    
    const results = [];
    const queryLower = query.toLowerCase();
    
    // Use fuzzySearch if available, otherwise create it from components
    const fuzzyData = searchIndex.fuzzySearch || components.map(comp => ({
      component: comp.name,
      keywords: [
        comp.name.toLowerCase(),
        comp.description.toLowerCase(),
        ...(comp.tags || []).map(tag => tag.toLowerCase())
      ],
      alternatives: []
    }));
    
    fuzzyData.forEach(item => {
      const score = this.calculateSimilarity(queryLower, item.keywords);
      
      if (score >= threshold) {
        const component = components.find(c => c.name === item.component);
        if (component) {
          results.push({ component, score });
        }
      }
    });
    
    return results
      .sort((a, b) => b.score - a.score)
      .map(item => item.component);
  }

  /**
   * Calculate similarity score between query and keywords
   */
  calculateSimilarity(query, keywords) {
    let maxScore = 0;
    
    keywords.forEach(keyword => {
      const score = this.stringSimilarity(query, keyword);
      maxScore = Math.max(maxScore, score);
    });
    
    return maxScore;
  }

  /**
   * String similarity calculation (simple implementation)
   */
  stringSimilarity(str1, str2) {
    if (str1 === str2) return 1;
    
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1;
    if (shorter.length === 0) return 0;
    
    if (longer.includes(shorter)) return 0.8;
    if (shorter.includes(longer)) return 0.8;
    
    return this.levenshteinDistance(str1, str2) / longer.length;
  }

  /**
   * Levenshtein distance calculation
   */
  levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  /**
   * Search by tags
   */
  searchByTags(tags) {
    const components = docs.getComponents();
    const tagsArray = Array.isArray(tags) ? tags : [tags];
    
    return components.filter(component => 
      component.tags && 
      tagsArray.some(tag => 
        component.tags.some(componentTag => 
          componentTag.toLowerCase().includes(tag.toLowerCase())
        )
      )
    );
  }

  /**
   * Search by usage pattern
   */
  searchByPattern(pattern) {
    const patterns = {
      'form': ['input', 'button', 'field', 'form', 'submit'],
      'table': ['table', 'data', 'list', 'grid'],
      'navigation': ['nav', 'menu', 'breadcrumb', 'tabs'],
      'modal': ['modal', 'dialog', 'popup', 'overlay'],
      'auth': ['login', 'auth', 'password', 'session'],
    };
    
    const searchTags = patterns[pattern.toLowerCase()] || [pattern];
    return this.searchByTags(searchTags);
  }

  /**
   * Multi-faceted search
   */
  advancedSearch(options = {}) {
    const {
      query,
      category,
      type,
      tags,
      pattern,
      fuzzy = false,
      limit = 20
    } = options;
    
    let results = docs.getComponents();
    
    // Apply filters
    if (query) {
      if (fuzzy) {
        results = this.fuzzySearch(query);
      } else {
        results = docs.searchComponents(query, { category, type, limit: 1000 });
      }
    }
    
    if (category) {
      results = results.filter(c => c.category === category);
    }
    
    if (type) {
      results = results.filter(c => c.type === type);
    }
    
    if (tags) {
      const tagResults = this.searchByTags(tags);
      results = results.filter(c => 
        tagResults.some(tr => tr.name === c.name)
      );
    }
    
    if (pattern) {
      const patternResults = this.searchByPattern(pattern);
      results = results.filter(c => 
        patternResults.some(pr => pr.name === c.name)
      );
    }
    
    return results.slice(0, limit);
  }

  /**
   * Get suggestions based on partial input
   */
  getSuggestions(partialQuery, limit = 5) {
    const components = docs.getComponents();
    const categories = docs.getCategories();
    
    const suggestions = {
      components: [],
      categories: [],
      tags: [],
    };
    
    const queryLower = partialQuery.toLowerCase();
    
    // Component name suggestions
    suggestions.components = components
      .filter(c => c.name.toLowerCase().startsWith(queryLower))
      .slice(0, limit)
      .map(c => ({ type: 'component', value: c.name, description: c.description }));
    
    // Category suggestions
    suggestions.categories = categories
      .filter(c => c.name.toLowerCase().startsWith(queryLower))
      .slice(0, limit)
      .map(c => ({ type: 'category', value: c.name, description: c.description }));
    
    // Tag suggestions
    const allTags = [...new Set(components.flatMap(c => c.tags || []))];
    suggestions.tags = allTags
      .filter(tag => tag.toLowerCase().startsWith(queryLower))
      .slice(0, limit)
      .map(tag => ({ type: 'tag', value: tag, description: `Components tagged with ${tag}` }));
    
    return suggestions;
  }
}

const search = new ComponentSearch();

module.exports = {
  ComponentSearch,
  search,
  fuzzySearch: (query, threshold) => search.fuzzySearch(query, threshold),
  searchByTags: (tags) => search.searchByTags(tags),
  searchByPattern: (pattern) => search.searchByPattern(pattern),
  advancedSearch: (options) => search.advancedSearch(options),
  getSuggestions: (query, limit) => search.getSuggestions(query, limit),
};