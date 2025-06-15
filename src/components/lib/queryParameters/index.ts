/**
 * URL Query Parameter Helper for InstinctHub React UI
 * Handles adding, updating, removing, and manipulating URL query parameters
 */

import { QueryContextType } from "@/types";

// Type definitions

interface QueryParams {
  [key: string]: string | string[] | undefined;
}

interface UrlHelperOptions {
  baseUrl?: string;
  preserveHash?: boolean;
  encode?: boolean;
}

/**
 * Main URL query parameter helper function
 * @example
 * ```tsx
 * urlQueryHelper({ key: "page", value: 1, action: "add" });
 * ```
 * @param context - Object containing key, value, and action
 * @param options - Additional configuration options
 * @returns Updated URL string
 */
export function urlQueryHelper(
  context: QueryContextType,
  options: UrlHelperOptions = {}
): string {
  const {
    baseUrl = typeof window !== "undefined" ? window.location.href : "",
    preserveHash = true,
    encode = true,
  } = options;

  try {
    const url = new URL(baseUrl);
    const params = new URLSearchParams(url.search);
    const { key, value, action } = context;

    // Perform the requested action
    switch (action) {
      case "add":
        if (value !== undefined && value !== null) {
          if (encode) {
            params.append(key, String(value));
          } else {
            params.append(key, String(value));
          }
        }
        break;

      case "update":
        if (value !== undefined && value !== null) {
          params.set(key, String(value));
        }
        break;

      case "remove":
        params.delete(key);
        break;

      case "toggle":
        if (params.has(key)) {
          params.delete(key);
        } else if (value !== undefined && value !== null) {
          params.set(key, String(value));
        }
        break;

      case "clear":
        // Clear all parameters
        params.forEach((_, paramKey) => {
          params.delete(paramKey);
        });
        break;

      default:
        throw new Error(`Unsupported action: ${action}`);
    }

    // Rebuild URL
    url.search = params.toString();

    // Handle hash preservation
    if (!preserveHash) {
      url.hash = "";
    }

    return url.toString();
  } catch (error) {
    console.error("URL manipulation error:", error);
    return baseUrl;
  }
}

/**
 * Get all query parameters as an object
 * @param url - URL string to parse (defaults to current URL)
 * @returns Object with query parameters
 */
export function getQueryParams(url?: string): QueryParams {
  try {
    const targetUrl =
      url || (typeof window !== "undefined" ? window.location.href : "");
    const urlObj = new URL(targetUrl);
    const params: QueryParams = {};

    urlObj.searchParams.forEach((value, key) => {
      if (params[key]) {
        // Handle multiple values for same key
        if (Array.isArray(params[key])) {
          (params[key] as string[]).push(value);
        } else {
          params[key] = [params[key] as string, value];
        }
      } else {
        params[key] = value;
      }
    });

    return params;
  } catch (error) {
    console.error("Error parsing query parameters:", error);
    return {};
  }
}

/**
 * Get specific query parameter value
 * @param key - Parameter key to retrieve
 * @param url - URL string to parse (defaults to current URL)
 * @returns Parameter value or null if not found
 */
export function getQueryParam(key: string, url?: string): string | null {
  try {
    const targetUrl =
      url || (typeof window !== "undefined" ? window.location.href : "");
    const urlObj = new URL(targetUrl);
    return urlObj.searchParams.get(key);
  } catch (error) {
    console.error("Error getting query parameter:", error);
    return null;
  }
}

/**
 * Check if a query parameter exists
 * @param key - Parameter key to check
 * @param url - URL string to parse (defaults to current URL)
 * @returns Boolean indicating if parameter exists
 */
export function hasQueryParam(key: string, url?: string): boolean {
  try {
    const targetUrl =
      url || (typeof window !== "undefined" ? window.location.href : "");
    const urlObj = new URL(targetUrl);
    return urlObj.searchParams.has(key);
  } catch (error) {
    console.error("Error checking query parameter:", error);
    return false;
  }
}

/**
 * Build URL from base path and parameters object
 * @param basePath - Base URL or path
 * @param params - Object of parameters to add
 * @param options - Additional configuration
 * @returns Complete URL string
 */
export function buildUrl(
  basePath: string,
  params: QueryParams,
  options: UrlHelperOptions = {}
): string {
  try {
    const { encode = true } = options;
    const url = new URL(
      basePath,
      typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost"
    );

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((v) => url.searchParams.append(key, String(v)));
        } else {
          url.searchParams.set(key, String(value));
        }
      }
    });

    return url.toString();
  } catch (error) {
    console.error("Error building URL:", error);
    return basePath;
  }
}

/**
 * Navigate to URL with updated query parameters (client-side only)
 * @example
 * ```tsx
 * navigateWithQuery({ key: "page", value: 1, action: "add" });
 * ```
 * @param context - Query context for manipulation
 * @param options - Navigation options
 */
export function navigateWithQuery(
  context: QueryContextType,
  options: UrlHelperOptions & { replace?: boolean } = {}
): void {
  if (typeof window === "undefined") {
    console.warn("navigateWithQuery can only be used in browser environment");
    return;
  }

  const { replace = false } = options;
  const newUrl = urlQueryHelper(context, options);

  if (replace) {
    window.history.replaceState({}, "", newUrl);
  } else {
    window.history.pushState({}, "", newUrl);
  }
}

/**
 * InstinctHub-specific helper for course filtering
 * @example
 * ```tsx
 * buildDataFilterUrl({ subject: "Math", level: "100", instructor: "John Doe" });
 * ```
 * @param filters - Course filter parameters
 * @returns URL with course filters applied
 */
export function buildDataFilterUrl(filters: {
  subject?: string;
  level?: string;
  instructor?: string;
  search?: string;
  page?: number;
  sort?: string;
}): string {
  const params: QueryParams = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params[key] = String(value);
    }
  });

  return buildUrl(window.location.pathname, params);
}

/**
 * InstinctHub-specific helper for pagination
 * @example
 * ```tsx
 * buildPaginationUrl(1);
 * ```
 * @param page - Page number
 * @param preserveFilters - Whether to keep existing filters
 * @returns URL with pagination applied
 */
export function buildPaginationUrl(
  page: number,
  preserveFilters = true
): string {
  if (preserveFilters) {
    return urlQueryHelper({ key: "page", value: page, action: "update" });
  } else {
    return buildUrl(window.location.pathname, { page: page.toString() });
  }
}

/**
 * Clean URL by removing empty or null parameters
 * @example
 * ```tsx
 * cleanUrl();
 * ```
 * @param url - URL to clean (defaults to current URL)
 * @returns Cleaned URL string
 */
export function cleanUrl(url?: string): string {
  try {
    const targetUrl =
      url || (typeof window !== "undefined" ? window.location.href : "");
    const urlObj = new URL(targetUrl);
    const params = new URLSearchParams();

    urlObj.searchParams.forEach((value, key) => {
      if (value && value.trim() !== "") {
        params.set(key, value);
      }
    });

    urlObj.search = params.toString();
    return urlObj.toString();
  } catch (error) {
    console.error("Error cleaning URL:", error);
    return url || "";
  }
}
