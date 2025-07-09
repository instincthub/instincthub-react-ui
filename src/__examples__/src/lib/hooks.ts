import { useState, useEffect, useCallback, useRef } from 'react';
import { ComponentInfo, SearchResult, RecommendationResponse, CodeGenerationResponse, IntegrationHelpResponse, DocsResponse } from '../types/components';
import { componentAPI, debounce } from './api';

// Hook for searching components
export function useComponentSearch(initialQuery: string = '', initialCategory?: string) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string, searchCategory?: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const searchResults = await componentAPI.searchComponents(searchQuery, searchCategory);
        setResults(searchResults);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed');
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(query, category);
  }, [query, category, debouncedSearch]);

  const search = useCallback((newQuery: string, newCategory?: string) => {
    setQuery(newQuery);
    setCategory(newCategory);
  }, []);

  return {
    query,
    category,
    results,
    loading,
    error,
    search,
    setQuery,
    setCategory,
  };
}

// Hook for getting component documentation
export function useComponentDocs(componentName: string, includeExamples: boolean = true, includeProps: boolean = true) {
  const [docs, setDocs] = useState<DocsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDocs = useCallback(async () => {
    if (!componentName) return;

    setLoading(true);
    setError(null);

    try {
      const documentation = await componentAPI.getComponentDocs(componentName, includeExamples, includeProps);
      setDocs(documentation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch documentation');
      setDocs(null);
    } finally {
      setLoading(false);
    }
  }, [componentName, includeExamples, includeProps]);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  const refetch = useCallback(() => {
    fetchDocs();
  }, [fetchDocs]);

  return {
    docs,
    loading,
    error,
    refetch,
  };
}

// Hook for getting component recommendations
export function useComponentRecommendations(
  description: string,
  context?: string,
  complexity: 'simple' | 'medium' | 'complex' = 'medium',
  framework: string = 'react'
) {
  const [recommendations, setRecommendations] = useState<RecommendationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRecommendations = useCallback(async () => {
    if (!description.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const recs = await componentAPI.getRecommendations(description, context, complexity, framework);
      setRecommendations(recs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get recommendations');
      setRecommendations(null);
    } finally {
      setLoading(false);
    }
  }, [description, context, complexity, framework]);

  useEffect(() => {
    if (description.trim()) {
      const timer = setTimeout(getRecommendations, 500);
      return () => clearTimeout(timer);
    }
  }, [getRecommendations, description]);

  const refetch = useCallback(() => {
    getRecommendations();
  }, [getRecommendations]);

  return {
    recommendations,
    loading,
    error,
    refetch,
  };
}

// Hook for code generation
export function useCodeGeneration() {
  const [generatedCode, setGeneratedCode] = useState<CodeGenerationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateCode = useCallback(async (
    components: string[],
    pattern: string = 'basic',
    framework: string = 'react',
    typescript: boolean = true,
    styling: 'css' | 'tailwind' | 'styled-components' = 'css'
  ) => {
    if (!components.length) return;

    setLoading(true);
    setError(null);

    try {
      const code = await componentAPI.generateCode(components, pattern, framework, typescript, styling);
      setGeneratedCode(code);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Code generation failed');
      setGeneratedCode(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setGeneratedCode(null);
    setError(null);
  }, []);

  return {
    generatedCode,
    loading,
    error,
    generateCode,
    clear,
  };
}

// Hook for integration help
export function useIntegrationHelp(topic: string, framework: string = 'react') {
  const [help, setHelp] = useState<IntegrationHelpResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getHelp = useCallback(async () => {
    if (!topic) return;

    setLoading(true);
    setError(null);

    try {
      const helpData = await componentAPI.getIntegrationHelp(topic, framework);
      setHelp(helpData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get integration help');
      setHelp(null);
    } finally {
      setLoading(false);
    }
  }, [topic, framework]);

  useEffect(() => {
    getHelp();
  }, [getHelp]);

  const refetch = useCallback(() => {
    getHelp();
  }, [getHelp]);

  return {
    help,
    loading,
    error,
    refetch,
  };
}

// Hook for managing all components
export function useComponents() {
  const [components, setComponents] = useState<ComponentInfo[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComponents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [allComponents, allCategories] = await Promise.all([
        componentAPI.getAllComponents(),
        componentAPI.getCategories(),
      ]);

      setComponents(allComponents);
      setCategories(allCategories);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch components');
      setComponents([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComponents();
  }, [fetchComponents]);

  const getComponentsByCategory = useCallback(
    (category: string) => {
      return components.filter(c => c.category === category);
    },
    [components]
  );

  const getComponentByName = useCallback(
    (name: string) => {
      return components.find(c => c.name.toLowerCase() === name.toLowerCase());
    },
    [components]
  );

  const refetch = useCallback(() => {
    fetchComponents();
  }, [fetchComponents]);

  return {
    components,
    categories,
    loading,
    error,
    getComponentsByCategory,
    getComponentByName,
    refetch,
  };
}

// Hook for managing local storage
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
}

// Hook for managing favorites
export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<string[]>('ihub-favorites', []);

  const addToFavorites = useCallback((componentName: string) => {
    setFavorites(prev => {
      if (!prev.includes(componentName)) {
        return [...prev, componentName];
      }
      return prev;
    });
  }, [setFavorites]);

  const removeFromFavorites = useCallback((componentName: string) => {
    setFavorites(prev => prev.filter(name => name !== componentName));
  }, [setFavorites]);

  const toggleFavorite = useCallback((componentName: string) => {
    setFavorites(prev => {
      if (prev.includes(componentName)) {
        return prev.filter(name => name !== componentName);
      }
      return [...prev, componentName];
    });
  }, [setFavorites]);

  const isFavorite = useCallback((componentName: string) => {
    return favorites.includes(componentName);
  }, [favorites]);

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
  };
}

// Hook for managing search history
export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useLocalStorage<string[]>('ihub-search-history', []);

  const addToHistory = useCallback((query: string) => {
    if (!query.trim()) return;

    setSearchHistory(prev => {
      const filtered = prev.filter(item => item !== query);
      return [query, ...filtered].slice(0, 10); // Keep only last 10 searches
    });
  }, [setSearchHistory]);

  const removeFromHistory = useCallback((query: string) => {
    setSearchHistory(prev => prev.filter(item => item !== query));
  }, [setSearchHistory]);

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
  }, [setSearchHistory]);

  return {
    searchHistory,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };
}

// Hook for managing copy to clipboard
export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { copied, copy };
}

// Hook for managing theme
export function useTheme() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark' | 'system'>('ihub-theme', 'system');

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light';
    });
  }, [setTheme]);

  const setLightTheme = useCallback(() => setTheme('light'), [setTheme]);
  const setDarkTheme = useCallback(() => setTheme('dark'), [setTheme]);
  const setSystemTheme = useCallback(() => setTheme('system'), [setTheme]);

  return {
    theme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    setSystemTheme,
  };
}

// Hook for managing window size
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// Hook for managing keyboard shortcuts
export function useKeyboardShortcuts(shortcuts: Record<string, () => void>) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      const combo = [
        event.ctrlKey && 'ctrl',
        event.metaKey && 'meta',
        event.altKey && 'alt',
        event.shiftKey && 'shift',
        key.toLowerCase(),
      ].filter(Boolean).join('+');

      if (shortcuts[combo]) {
        event.preventDefault();
        shortcuts[combo]();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}