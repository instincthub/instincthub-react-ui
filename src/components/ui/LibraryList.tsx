"use client";
import { Check, Copy } from "lucide-react";
import React, { useState, useMemo } from "react";

interface LibraryInfo {
  name: string;
  description: string;
  category: string;
  repo_path: string;
  example_path: string;
}

const LibraryList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const libraries: LibraryInfo[] = [
    // Data Manipulation
    {
      name: "convertArrayToObject",
      description:
        "Convert arrays of objects into lookup objects for O(1) access performance",
      category: "Data Manipulation",
      repo_path: "src/components/lib/convertArrayToObject.ts",
      example_path: "docs/static-docs/libs/convertArrayToObject.md",
    },
    {
      name: "helpFunction",
      description:
        "Comprehensive collection of string manipulation, validation, and formatting utilities",
      category: "Data Manipulation",
      repo_path: "src/components/lib/helpFunction.ts",
      example_path: "docs/static-docs/libs/helpFunction.md",
    },

    // helpFunction submodules
    {
      name: "stripHtmlTags",
      description:
        "Remove HTML tags from strings while preserving text content",
      category: "String & Text Utilities",
      repo_path: "src/components/lib/helpFunction.ts#L92",
      example_path: "docs/static-docs/libs/helpFunction/stripHtmlTags.md",
    },
    {
      name: "convertToSlug",
      description:
        "Convert text to URL-friendly slugs with proper formatting and encoding",
      category: "String & Text Utilities",
      repo_path: "src/components/lib/helpFunction.ts#L341",
      example_path: "docs/static-docs/libs/helpFunction/convertToSlug.md",
    },
    {
      name: "isValidEmail",
      description:
        "Email format validation with comprehensive regex pattern matching",
      category: "Validation Functions",
      repo_path: "src/components/lib/helpFunction.ts#L453",
      example_path: "docs/static-docs/libs/helpFunction/isValidEmail.md",
    },
    {
      name: "formatNumberWithCommas",
      description:
        "Format numbers with thousands separators for better readability",
      category: "Number & Data Formatting",
      repo_path: "src/components/lib/helpFunction.ts#L296",
      example_path:
        "docs/static-docs/libs/helpFunction/formatNumberWithCommas.md",
    },
    {
      name: "formatDateToWord",
      description:
        "Human-readable date formatting with custom patterns and localization",
      category: "Date & Time Functions",
      repo_path: "src/components/lib/helpFunction.ts#L421",
      example_path: "docs/static-docs/libs/helpFunction/formatDateToWord.md",
    },
    {
      name: "reqOptions",
      description:
        "HTTP request configuration builder for fetch API with authentication headers",
      category: "API & Request Functions",
      repo_path: "src/components/lib/helpFunction.ts#L650",
      example_path: "docs/static-docs/libs/helpFunction/reqOptions.md",
    },
    {
      name: "getCookie",
      description:
        "Retrieve cookie values from browser storage with proper parsing",
      category: "Browser Utilities",
      repo_path: "src/components/lib/helpFunction.ts#L475",
      example_path: "docs/static-docs/libs/helpFunction/getCookie.md",
    },
    {
      name: "fetchData",
      description:
        "Paginated data fetching utility with loading states and error handling",
      category: "API & Request Functions",
      repo_path: "src/components/lib/helpFunction.ts#L730",
      example_path: "docs/static-docs/fetch/FetchDataServer.md",
    },
    {
      name: "fetchAPI",
      description:
        "Generic TypeScript-enabled API client with error handling and type safety",
      category: "API & Request Functions",
      repo_path: "src/components/lib/helpFunction.ts#L784",
      example_path: "docs/static-docs/fetch/FetchDataClient.md",
    },
    {
      name: "PostData",
      description:
        "Complete example for posting form data to backend with validation and error handling",
      category: "API & Request Functions",
      repo_path: "src/components/lib/helpFunction.ts#L650",
      example_path: "docs/static-docs/fetch/PostData.md",
    },

    // Time & Date
    {
      name: "format",
      description:
        "Time formatting utilities for displaying durations and timestamps",
      category: "Time & Date",
      repo_path: "src/components/lib/format.ts",
      example_path: "docs/static-docs/libs/format.md",
    },

    // File Operations
    {
      name: "fileToBase64",
      description:
        "Convert files to Base64 encoding for uploads and data transmission",
      category: "File Operations",
      repo_path: "src/components/lib/fileToBase64.ts",
      example_path: "docs/static-docs/libs/fileToBase64.md",
    },

    // DOM Utilities
    {
      name: "elementIsVisibleInViewport",
      description:
        "Check if DOM elements are visible within the browser viewport",
      category: "DOM Utilities",
      repo_path: "src/components/lib/elementIsVisibleInViewport.ts",
      example_path: "docs/static-docs/libs/elementIsVisibleInViewport.md",
    },
    {
      name: "loadScript",
      description:
        "Dynamically load external JavaScript libraries with Promise-based API",
      category: "DOM Utilities",
      repo_path: "src/components/lib/loadScript.ts",
      example_path: "docs/static-docs/libs/loadScript.md",
    },

    // Subscription Management
    {
      name: "createSubscription",
      description:
        "Subscription management utilities for handling recurring subscriptions",
      category: "Subscription Management",
      repo_path: "src/components/lib/createSubscription.ts",
      example_path: "docs/static-docs/libs/createSubscription.md",
    },

    // Form Utilities
    {
      name: "formError",
      description:
        "Form validation and error handling with Yup schema integration",
      category: "Form Utilities",
      repo_path: "src/components/lib/formError.ts",
      example_path: "docs/static-docs/libs/formError.md",
    },

    // Pricing & Finance
    {
      name: "getPriceObjects",
      description:
        "Price calculation utilities with currency support and internationalization",
      category: "Pricing & Finance",
      repo_path: "src/components/lib/getPriceObjects.ts",
      example_path: "docs/static-docs/libs/getPriceObjects.md",
    },
    {
      name: "paystack",
      description:
        "Paystack payment integration with transaction handling and webhooks",
      category: "Pricing & Finance",
      repo_path: "src/components/lib/paystack.ts",
      example_path: "docs/static-docs/libs/paystack.md",
    },

    // Charts & Visualization
    {
      name: "charts",
      description: "Chart configuration helpers for Chart.js integration",
      category: "Charts & Visualization",
      repo_path: "src/components/lib/charts.ts",
      example_path: "docs/static-docs/libs/charts.md",
    },

    // Authentication & Security
    {
      name: "roles",
      description:
        "Role-based access control (RBAC) system with hierarchical permissions",
      category: "Authentication & Security",
      repo_path: "src/components/lib/roles.ts",
      example_path: "docs/static-docs/libs/roles.md",
    },
    {
      name: "permissions",
      description:
        "Permission checking utilities with role validation and access control",
      category: "Authentication & Security",
      repo_path: "src/components/lib/permissions.ts",
      example_path: "docs/static-docs/libs/permissions.md",
    },
    {
      name: "auth-actions",
      description:
        "Authentication actions for sign-in, sign-out, and session management",
      category: "Authentication & Security",
      repo_path: "src/components/lib/auth/actions.ts",
      example_path: "docs/static-docs/libs/auth-actions.md",
    },
    {
      name: "auth-dbRequestst",
      description:
        "Database request utilities for authentication and user management",
      category: "Authentication & Security",
      repo_path: "src/components/lib/auth/dbRequestst.ts",
      example_path: "docs/static-docs/libs/auth-dbRequestst.md",
    },

    // Configuration & Constants
    {
      name: "utils",
      description:
        "Application constants and utility types for consistent configuration",
      category: "Configuration & Constants",
      repo_path: "src/components/lib/utils.ts",
      example_path: "docs/static-docs/libs/utils.md",
    },
    {
      name: "oauth_json",
      description:
        "OAuth provider configuration with Google, Facebook, GitHub integration",
      category: "Configuration & Constants",
      repo_path: "src/components/lib/oauth_json.ts",
      example_path: "docs/static-docs/libs/oauth_json.md",
    },

    // JSON Data Collections
    {
      name: "json-accounts",
      description:
        "Account type configurations for educational and business platforms",
      category: "JSON Data Collections",
      repo_path: "src/components/lib/json/accounts.ts",
      example_path: "docs/static-docs/libs/json-accounts.md",
    },
    {
      name: "json-countryNigeria",
      description: "Nigeria states and local government areas data structure",
      category: "JSON Data Collections",
      repo_path: "src/components/lib/json/countryNigeria.ts",
      example_path: "docs/static-docs/libs/json-countryNigeria.md",
    },
    {
      name: "json-countryObjects",
      description:
        "Global country database with ISO codes, currencies, and phone prefixes",
      category: "JSON Data Collections",
      repo_path: "src/components/lib/json/countryObjects.ts",
      example_path: "docs/static-docs/libs/json-countryObjects.md",
    },
    {
      name: "json-educationLevels",
      description:
        "Education level definitions for academic and professional contexts",
      category: "JSON Data Collections",
      repo_path: "src/components/lib/json/educationLevels.ts",
      example_path: "docs/static-docs/libs/json-educationLevels.md",
    },
    {
      name: "json-unsplashDefaultObject",
      description:
        "Default Unsplash image objects for placeholder and fallback images",
      category: "JSON Data Collections",
      repo_path: "src/components/lib/json/unsplashDefaultObject.ts",
      example_path: "docs/static-docs/libs/json-unsplashDefaultObject.md",
    },

    // Modal Systems
    {
      name: "modals-openConfirmDelete",
      description:
        "Advanced delete confirmation modal with GitHub-style validation",
      category: "Modal Systems",
      repo_path: "src/components/lib/modals/openConfirmDelete.ts",
      example_path: "docs/static-docs/libs/modals-openConfirmDelete.md",
    },

    // Modal submodules
    {
      name: "openConfirmModal",
      description:
        "Promise-based confirmation dialogs with warning levels and custom messaging",
      category: "Confirmation Modals",
      repo_path: "src/components/lib/modals/modals.ts#L27",
      example_path: "docs/static-docs/libs/modals/openConfirmModal.md",
    },
    {
      name: "openToast",
      description:
        "Auto-dismissing toast notifications with status-based styling and positioning",
      category: "Notification Modals",
      repo_path: "src/components/lib/modals/modals.ts#L91",
      example_path: "docs/static-docs/libs/modals/openToast.md",
    },
    {
      name: "getUserEmailInputModal",
      description:
        "Email collection modal with built-in validation and error handling",
      category: "Input Modals",
      repo_path: "src/components/lib/modals/modals.ts#L150",
      example_path: "docs/static-docs/libs/modals/getUserEmailInputModal.md",
    },
    {
      name: "openConfirmDelete",
      description:
        "Advanced delete confirmation modal with GitHub-style validation requiring user input",
      category: "Confirmation Modals",
      repo_path: "src/components/lib/modals/openConfirmDelete.ts#L39",
      example_path: "docs/static-docs/libs/modals/openConfirmDelete.md",
    },

    // URL & Navigation
    {
      name: "queryParameters",
      description:
        "URL query parameter management system for client-side navigation and filtering",
      category: "URL & Navigation",
      repo_path: "src/components/lib/queryParameters/index.ts",
      example_path: "docs/static-docs/libs/queryParameters.md",
    },

    // Redux State Management (Documentation Pending)
    {
      name: "redux-store",
      description:
        "Redux store configuration with middleware and devtools setup",
      category: "Redux State Management",
      repo_path: "src/components/lib/redux/store.ts",
      example_path: "docs/static-docs/libs/redux-store.md",
    },
    {
      name: "redux-rootReducer",
      description: "Root reducer combining all application slices",
      category: "Redux State Management",
      repo_path: "src/components/lib/redux/rootReducer.ts",
      example_path: "docs/static-docs/libs/redux-rootReducer.md",
    },
    {
      name: "redux-middleware",
      description: "Custom Redux middleware for logging and async handling",
      category: "Redux State Management",
      repo_path: "src/components/lib/redux/middleware.ts",
      example_path: "docs/static-docs/libs/redux-middleware.md",
    },
    {
      name: "redux-createAppAsyncThunk",
      description: "Typed async thunk creator with consistent error handling",
      category: "Redux State Management",
      repo_path: "src/components/lib/redux/createAppAsyncThunk.ts",
      example_path: "docs/static-docs/libs/redux-createAppAsyncThunk.md",
    },
    {
      name: "redux-authSlice",
      description:
        "Authentication state management with user sessions and permissions",
      category: "Redux State Management",
      repo_path: "src/components/lib/redux/slices/authSlice/index.ts",
      example_path: "docs/static-docs/libs/redux-authSlice.md",
    },
    {
      name: "redux-channelSlice",
      description:
        "Channel management state for course platforms and communities",
      category: "Redux State Management",
      repo_path: "src/components/lib/redux/slices/channelSlice/index.ts",
      example_path: "docs/static-docs/libs/redux-channelSlice.md",
    },
    {
      name: "redux-courseSlice",
      description:
        "Course management state with enrollment, progress, and content",
      category: "Redux State Management",
      repo_path: "src/components/lib/redux/slices/courseSlice/index.ts",
      example_path: "docs/static-docs/libs/redux-courseSlice.md",
    },
    {
      name: "redux-navigationSlice",
      description: "Navigation state management with routing and UI controls",
      category: "Redux State Management",
      repo_path: "src/components/lib/redux/slices/navigationSlice/index.ts",
      example_path: "docs/static-docs/libs/redux-navigationSlice.md",
    },
    {
      name: "redux-messageSlice",
      description: "Message and notification state management",
      category: "Redux State Management",
      repo_path: "src/components/lib/redux/slices/messageSlice/index.ts",
      example_path: "docs/static-docs/libs/redux-messageSlice.md",
    },
    {
      name: "redux-utilsSlice",
      description:
        "Utility state management for screen size, device detection, and preferences",
      category: "Redux State Management",
      repo_path: "src/components/lib/redux/slices/utilsSlice/index.ts",
      example_path: "docs/static-docs/libs/redux-utilsSlice.md",
    },
    {
      name: "redux-generics",
      description:
        "Generic Redux utilities for arrays and objects manipulation",
      category: "Redux State Management",
      repo_path: "src/components/lib/redux/slices/generics/index.ts",
      example_path: "docs/static-docs/libs/redux-generics.md",
    },
  ];

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(libraries.map((library) => library.category))
    );
    return uniqueCategories.sort();
  }, [libraries]);

  // Filter libraries based on search term and category
  const filteredLibraries = useMemo(() => {
    let filtered = libraries;

    // Filter by category if selected
    if (selectedCategory) {
      filtered = filtered.filter(
        (library) => library.category === selectedCategory
      );
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (library) =>
          library.name.toLowerCase().includes(searchLower) ||
          library.description.toLowerCase().includes(searchLower) ||
          library.category.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [libraries, searchTerm, selectedCategory]);

  // Group filtered libraries by category
  const groupedLibraries = useMemo(() => {
    return filteredLibraries.reduce((acc, library) => {
      if (!acc[library.category]) {
        acc[library.category] = [];
      }
      acc[library.category].push(library);
      return acc;
    }, {} as Record<string, LibraryInfo[]>);
  }, [filteredLibraries]);

  const baseRepoUrl =
    "https://github.com/instincthub/instincthub-react-ui/blob/main/";

  const copyToClipboard = async (url: string, linkType: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(`${linkType}-${url}`);
      setTimeout(() => setCopiedLink(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="ihub-component-lists">
      <h1 className="ihub-component-lists-title">
        InstinctHub React UI Library Utilities
      </h1>
      <p className="ihub-component-lists-description">
        A comprehensive list of all available utility functions in the
        InstinctHub React UI library for data manipulation, API handling, and
        common operations.
      </p>

      {/* Search and Filter Section */}
      <div className="ihub-search-container">
        <div className="ihub-flex ihub-gap-3 ihub-mb-3">
          <input
            type="text"
            placeholder="Search utilities by name, description, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ihub-search-input"
            style={{ flex: 1 }}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="ihub-category-filter"
            style={{
              padding: "10px 15px",
              border: "2px solid #e0e0e0",
              borderRadius: "8px",
              backgroundColor: "white",
              fontSize: "14px",
              minWidth: "160px",
            }}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {(searchTerm || selectedCategory) && (
          <div className="ihub-search-results-info">
            Found {filteredLibraries.length} utilit
            {filteredLibraries.length !== 1 ? "ies" : "y"}
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedCategory && ` in category "${selectedCategory}"`}
            {(searchTerm || selectedCategory) && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                }}
                style={{
                  marginLeft: "10px",
                  padding: "4px 8px",
                  backgroundColor: "#f5f5f5",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {Object.entries(groupedLibraries).map(([category, categoryLibraries]) => (
        <div key={category} className="ihub-component-category">
          <h2 className="ihub-component-category-title">{category}</h2>
          <div className="ihub-component-grid">
            {categoryLibraries.map((library) => (
              <div key={library.name} className="ihub-component-card">
                <h3 className="ihub-component-name">{library.name}</h3>
                <p className="ihub-component-description">
                  {library.description}
                </p>
                <div className="ihub-component-links">
                  <div className="ihub-link-group ihub-flex">
                    <a
                      href={`${baseRepoUrl}${library.repo_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ihub-component-link"
                    >
                      Source Code
                    </a>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `${baseRepoUrl}${library.repo_path}`,
                          "repo"
                        )
                      }
                      className="ihub-copy-btn"
                      title={`Copy ${library.name} source code link`}
                    >
                      {copiedLink ===
                      `repo-${baseRepoUrl}${library.repo_path}` ? (
                        <Check />
                      ) : (
                        <Copy />
                      )}
                    </button>
                  </div>
                  <div className="ihub-link-group ihub-flex ihub-mt-2">
                    <a
                      href={`${baseRepoUrl}${library.example_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ihub-component-link"
                    >
                      Documentation
                    </a>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `${baseRepoUrl}${library.example_path}`,
                          "example"
                        )
                      }
                      className="ihub-copy-btn"
                      title={`Copy ${library.name} documentation link`}
                    >
                      {copiedLink ===
                      `example-${baseRepoUrl}${library.example_path}` ? (
                        <Check />
                      ) : (
                        <Copy />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {Object.keys(groupedLibraries).length === 0 &&
        (searchTerm || selectedCategory) && (
          <div className="ihub-no-results">
            <p>
              No utilities found{searchTerm && ` matching "${searchTerm}"`}
              {selectedCategory && ` in category "${selectedCategory}"`}
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
              }}
              className="ihub-clear-search-btn"
            >
              Clear Filters
            </button>
          </div>
        )}
    </div>
  );
};

export default LibraryList;
