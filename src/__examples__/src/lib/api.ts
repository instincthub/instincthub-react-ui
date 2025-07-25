import { ComponentInfo, SearchResult, RecommendationResponse, CodeGenerationResponse, IntegrationHelpResponse, DocsResponse } from '../types/components';

const API_BASE_URL = process.env.API_BASE_URL || ''

export class ComponentAPI {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async searchComponents(query: string, category?: string, limit: number = 10): Promise<SearchResult[]> {
    const params = new URLSearchParams({
      query,
      limit: limit.toString(),
    });

    if (category) {
      params.append('category', category);
    }

    const response = await fetch(`${this.baseURL}/api/components/search?${params}`);
    
    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.success ? data.data.results : [];
  }

  async getComponentDocs(componentName: string, includeExamples: boolean = true, includeProps: boolean = true): Promise<DocsResponse> {
    const params = new URLSearchParams({
      component_name: componentName,
      include_examples: includeExamples.toString(),
      include_props: includeProps.toString(),
    });

    const response = await fetch(`${this.baseURL}/api/components/docs?${params}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch documentation');
    }

    const data = await response.json();
    return data.success ? data.data : null;
  }

  async getRecommendations(
    description: string,
    context?: string,
    complexity: 'simple' | 'medium' | 'complex' = 'medium',
    framework: string = 'react'
  ): Promise<RecommendationResponse> {
    const params = new URLSearchParams({
      description,
      complexity,
      framework,
    });

    if (context) {
      params.append('context', context);
    }

    const response = await fetch(`${this.baseURL}/api/components/recommend?${params}`);
    
    if (!response.ok) {
      throw new Error(`Recommendation failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.success ? data.data : null;
  }

  async generateCode(
    components: string[],
    pattern: string = 'basic',
    framework: string = 'react',
    typescript: boolean = true,
    styling: 'css' | 'tailwind' | 'styled-components' = 'css'
  ): Promise<CodeGenerationResponse> {
    const params = new URLSearchParams({
      components: components.join(','),
      pattern,
      framework,
      typescript: typescript.toString(),
      styling,
    });

    const response = await fetch(`${this.baseURL}/api/generate?${params}`);
    
    if (!response.ok) {
      throw new Error(`Code generation failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.success ? data.data : null;
  }

  async getIntegrationHelp(
    topic: string,
    framework: string = 'react',
    version?: string
  ): Promise<IntegrationHelpResponse> {
    const params = new URLSearchParams({
      topic,
      framework,
    });

    if (version) {
      params.append('version', version);
    }

    const response = await fetch(`${this.baseURL}/api/help?${params}`);
    
    if (!response.ok) {
      throw new Error(`Integration help failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.success ? data.data : null;
  }

  async getAllComponents(): Promise<ComponentInfo[]> {
    try {
      const response = await fetch(`${this.baseURL}/api/components`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch components: ${response.statusText}`);
      }

      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error fetching components:', error);
      return [];
    }
  }

  async getComponentsByCategory(category: string): Promise<ComponentInfo[]> {
    return this.searchComponents('', category, 100) as unknown as ComponentInfo[];
  }

  async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseURL}/api/components/categories`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }

      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }
}

// Utility functions
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function highlightText(text: string, query: string): string {
  if (!query) return text;
  
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

export function formatComponentName(name: string): string {
  return name.replace(/([A-Z])/g, ' $1').trim();
}

export function getComponentIcon(component: ComponentInfo): string {
  const categoryIcons = {
    'Forms': '📝',
    'UI': '🎨',
    'Auth': '🔐',
    'Navbar': '🧭',
    'Status': '📊',
    'Theme': '🌓',
    'Tabs': '📑',
    'Cursors': '🖱️',
    'Library': '📚',
  };
  
  return categoryIcons[component.category as keyof typeof categoryIcons] || '⚙️';
}

export function getCategoryColor(category: string): string {
  const colors = {
    'Forms': '#3b82f6',
    'UI': '#8b5cf6',
    'Auth': '#ef4444',
    'Navbar': '#10b981',
    'Status': '#f59e0b',
    'Theme': '#6b7280',
    'Tabs': '#14b8a6',
    'Cursors': '#f97316',
    'Library': '#84cc16',
  };
  
  return colors[category as keyof typeof colors] || '#6b7280';
}

export function generateComponentImport(component: ComponentInfo): string {
  const importPath = getImportPath(component);
  return `import { ${component.name} } from '@instincthub/react-ui${importPath}';`;
}

export function getImportPath(component: ComponentInfo): string {
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
  return '';
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }
  
  // Fallback for older browsers
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  return new Promise((resolve, reject) => {
    if (document.execCommand('copy')) {
      resolve();
    } else {
      reject(new Error('Failed to copy text'));
    }
    document.body.removeChild(textArea);
  });
}

export function downloadAsFile(content: string, filename: string, contentType: string = 'text/plain'): void {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Export singleton instance
export const componentAPI = new ComponentAPI();
export default componentAPI;