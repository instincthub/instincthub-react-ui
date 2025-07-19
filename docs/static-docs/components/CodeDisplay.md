# CodeDisplay

**Category:** UI | **Type:** component

A powerful code display component with syntax highlighting, copy-to-clipboard functionality, language detection, and theme support

## 📁 File Location

`src/components/ui/viewer/CodeDisplay.tsx`

## 🏷️ Tags

`ui`, `code`, `syntax-highlighting`, `copy-clipboard`, `programming`, `developer-tools`

## 📖 Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `code` | `string` | Yes | - | The code content to display |
| `language` | `string` | No | `"javascript"` | Programming language for syntax highlighting |
| `showLineNumbers` | `boolean` | No | `true` | Whether to show line numbers |
| `showCopyButton` | `boolean` | No | `true` | Whether to show copy to clipboard button |
| `theme` | `string` | No | `"vs-dark"` | Syntax highlighting theme |
| `maxHeight` | `string` | No | `"400px"` | Maximum height before scrolling |
| `fileName` | `string` | No | - | Optional filename to display in header |
| `readOnly` | `boolean` | No | `true` | Whether code is read-only |
| `wrapLines` | `boolean` | No | `false` | Whether to wrap long lines |
| `className` | `string` | No | `""` | Additional CSS classes |

## 🎨 CSS Classes

- `ihub-code-display` - Main code display container
- `ihub-code-header` - Header with filename and actions
- `ihub-code-content` - Code content area
- `ihub-line-numbers` - Line numbers styling
- `ihub-copy-button` - Copy button styling
- `ihub-syntax-highlight` - Syntax highlighting container

## 🌟 Features

- **Syntax Highlighting** - Supports 150+ programming languages
- **Copy to Clipboard** - One-click code copying with feedback
- **Line Numbers** - Optional line number display
- **Theme Support** - Multiple color themes (light/dark)
- **Language Detection** - Automatic language detection
- **Responsive Design** - Works on all screen sizes
- **Scroll Support** - Horizontal and vertical scrolling
- **Performance Optimized** - Lazy loading for large code blocks

```tsx
"use client";
import React, { useState, useCallback } from "react";
import { CodeDisplay, InputText, Dropdown } from "@instincthub/react-ui";

/**
 * Comprehensive CodeDisplay examples demonstrating various use cases
 */
const CodeDisplayExamples = () => {
  const [customCode, setCustomCode] = useState(`function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return \`Welcome, \${name}\`;
}

greet("World");`);

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [selectedTheme, setSelectedTheme] = useState("vs-dark");

  // Sample code snippets for different languages
  const codeExamples = {
    javascript: `// JavaScript Example
function calculateFactorial(n) {
  if (n <= 1) return 1;
  return n * calculateFactorial(n - 1);
}

const result = calculateFactorial(5);
console.log(\`Factorial of 5 is: \${result}\`);

// Async/await example
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}`,

    typescript: `// TypeScript Example
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

class UserService {
  private users: User[] = [];

  constructor(private apiUrl: string) {}

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const response = await fetch(\`\${this.apiUrl}/users\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    
    return response.json();
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
}`,

    python: `# Python Example
import asyncio
from typing import List, Optional
from dataclasses import dataclass

@dataclass
class Product:
    id: int
    name: str
    price: float
    category: str
    in_stock: bool = True

class ProductManager:
    def __init__(self):
        self.products: List[Product] = []
    
    def add_product(self, product: Product) -> None:
        """Add a new product to the inventory."""
        self.products.append(product)
        print(f"Added product: {product.name}")
    
    def find_by_category(self, category: str) -> List[Product]:
        """Find all products in a specific category."""
        return [p for p in self.products if p.category == category]
    
    async def update_stock_status(self, product_id: int, in_stock: bool) -> Optional[Product]:
        """Asynchronously update product stock status."""
        await asyncio.sleep(0.1)  # Simulate database operation
        
        for product in self.products:
            if product.id == product_id:
                product.in_stock = in_stock
                return product
        return None

# Usage example
manager = ProductManager()
laptop = Product(1, "Gaming Laptop", 1299.99, "Electronics")
manager.add_product(laptop)`,

    java: `// Java Example
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

public class TaskManager {
    private final List<Task> tasks;
    private final TaskRepository repository;
    
    public TaskManager(TaskRepository repository) {
        this.tasks = new ArrayList<>();
        this.repository = repository;
    }
    
    public static class Task {
        private final String id;
        private final String title;
        private final TaskStatus status;
        private final Date createdAt;
        
        public Task(String id, String title, TaskStatus status) {
            this.id = id;
            this.title = title;
            this.status = status;
            this.createdAt = new Date();
        }
        
        // Getters
        public String getId() { return id; }
        public String getTitle() { return title; }
        public TaskStatus getStatus() { return status; }
        public Date getCreatedAt() { return createdAt; }
    }
    
    public enum TaskStatus {
        PENDING, IN_PROGRESS, COMPLETED, CANCELLED
    }
    
    public CompletableFuture<Task> createTaskAsync(String title) {
        return CompletableFuture.supplyAsync(() -> {
            String id = UUID.randomUUID().toString();
            Task task = new Task(id, title, TaskStatus.PENDING);
            tasks.add(task);
            repository.save(task);
            return task;
        });
    }
    
    public List<Task> getTasksByStatus(TaskStatus status) {
        return tasks.stream()
                   .filter(task -> task.getStatus() == status)
                   .collect(Collectors.toList());
    }
}`,

    css: `/* CSS Example - Modern Card Component */
.card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
}

.card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.card-header {
  padding: 24px 24px 0;
  color: white;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 8px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.card-content {
  padding: 16px 24px 24px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .card {
    margin: 16px;
    border-radius: 12px;
  }
  
  .card-header,
  .card-content {
    padding: 16px;
  }
}`,

    sql: `-- SQL Example - Advanced Database Operations
-- Create tables with relationships
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    slug VARCHAR(250) UNIQUE NOT NULL,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    parent_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_published_at ON posts(published_at);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);

-- Complex query with CTEs and window functions
WITH user_stats AS (
    SELECT 
        u.id,
        u.username,
        u.email,
        COUNT(DISTINCT p.id) as post_count,
        COUNT(DISTINCT c.id) as comment_count,
        MAX(p.published_at) as last_post_date
    FROM users u
    LEFT JOIN posts p ON u.id = p.user_id
    LEFT JOIN comments c ON u.id = c.user_id
    WHERE u.is_active = true
    GROUP BY u.id, u.username, u.email
),
ranked_users AS (
    SELECT *,
        ROW_NUMBER() OVER (ORDER BY post_count DESC, comment_count DESC) as user_rank,
        CASE 
            WHEN post_count >= 10 THEN 'Active Contributor'
            WHEN post_count >= 5 THEN 'Regular User'
            WHEN post_count >= 1 THEN 'New Contributor'
            ELSE 'Reader'
        END as user_category
    FROM user_stats
)
SELECT 
    username,
    email,
    post_count,
    comment_count,
    user_category,
    user_rank,
    CASE 
        WHEN last_post_date > CURRENT_DATE - INTERVAL '30 days' THEN 'Recent'
        WHEN last_post_date > CURRENT_DATE - INTERVAL '90 days' THEN 'Moderate'
        ELSE 'Inactive'
    END as activity_status
FROM ranked_users
ORDER BY user_rank
LIMIT 20;`
  };

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "css", label: "CSS" },
    { value: "sql", label: "SQL" },
    { value: "html", label: "HTML" },
    { value: "json", label: "JSON" },
    { value: "bash", label: "Bash" },
    { value: "php", label: "PHP" }
  ];

  const themes = [
    { value: "vs-dark", label: "VS Dark" },
    { value: "vs-light", label: "VS Light" },
    { value: "github-dark", label: "GitHub Dark" },
    { value: "github-light", label: "GitHub Light" },
    { value: "monokai", label: "Monokai" },
    { value: "solarized-dark", label: "Solarized Dark" },
    { value: "solarized-light", label: "Solarized Light" }
  ];

  const handleLanguageChange = useCallback((language: string) => {
    setSelectedLanguage(language);
    if (codeExamples[language as keyof typeof codeExamples]) {
      setCustomCode(codeExamples[language as keyof typeof codeExamples]);
    }
  }, []);

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>CodeDisplay Examples</h1>
      <p className="ihub-mb-5">
        Demonstrating syntax highlighting, copy functionality, themes, and multiple programming languages.
      </p>

      {/* Basic Example */}
      <section className="ihub-mb-5">
        <h2>Basic JavaScript Example</h2>
        <p>Simple code block with default settings:</p>
        <CodeDisplay
          code={`// Basic JavaScript function
function calculateArea(radius) {
  const area = Math.PI * radius * radius;
  return parseFloat(area.toFixed(2));
}

console.log(calculateArea(5)); // Output: 78.54`}
          language="javascript"
          fileName="calculator.js"
        />
      </section>

      {/* Interactive Example */}
      <section className="ihub-mb-5">
        <h2>Interactive Code Editor</h2>
        <p>Customize language and theme:</p>
        
        <div className="ihub-row ihub-mb-3">
          <div className="ihub-col-md-6">
            <Dropdown
              label="Programming Language"
              value={selectedLanguage}
              onChange={handleLanguageChange}
              options={languages}
              placeholder="Select language..."
            />
          </div>
          <div className="ihub-col-md-6">
            <Dropdown
              label="Theme"
              value={selectedTheme}
              onChange={setSelectedTheme}
              options={themes}
              placeholder="Select theme..."
            />
          </div>
        </div>

        <CodeDisplay
          code={customCode}
          language={selectedLanguage}
          theme={selectedTheme}
          fileName={`example.${selectedLanguage === 'javascript' ? 'js' : selectedLanguage === 'typescript' ? 'ts' : selectedLanguage === 'python' ? 'py' : selectedLanguage}`}
          maxHeight="500px"
        />
      </section>

      {/* Configuration Examples */}
      <section className="ihub-mb-5">
        <h2>Configuration Examples</h2>
        
        <div className="ihub-row">
          {/* No Line Numbers */}
          <div className="ihub-col-lg-6 ihub-mb-4">
            <h3>Without Line Numbers</h3>
            <CodeDisplay
              code={`const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3
};`}
              language="javascript"
              showLineNumbers={false}
              fileName="config.js"
            />
          </div>

          {/* No Copy Button */}
          <div className="ihub-col-lg-6 ihub-mb-4">
            <h3>Without Copy Button</h3>
            <CodeDisplay
              code={`# Python configuration
DEBUG = True
SECRET_KEY = 'your-secret-key'
DATABASE_URL = 'postgresql://localhost/mydb'`}
              language="python"
              showCopyButton={false}
              fileName="settings.py"
            />
          </div>
        </div>
      </section>

      {/* Language Showcase */}
      <section className="ihub-mb-5">
        <h2>Multi-Language Showcase</h2>
        
        <div className="ihub-row">
          {/* HTML Example */}
          <div className="ihub-col-lg-6 ihub-mb-4">
            <h3>HTML</h3>
            <CodeDisplay
              code={`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Web App</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="app-header">
        <nav class="navigation">
            <div class="logo">
                <img src="logo.svg" alt="Company Logo">
            </div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main class="main-content">
        <section class="hero">
            <h1>Welcome to Our Platform</h1>
            <p>Build amazing applications with our tools</p>
            <button class="cta-button">Get Started</button>
        </section>
    </main>
    
    <script src="app.js"></script>
</body>
</html>`}
              language="html"
              fileName="index.html"
              maxHeight="300px"
            />
          </div>

          {/* JSON Example */}
          <div className="ihub-col-lg-6 ihub-mb-4">
            <h3>JSON Configuration</h3>
            <CodeDisplay
              code={`{
  "name": "react-app",
  "version": "1.0.0",
  "description": "Modern React application",
  "main": "index.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint src/**/*.{js,jsx,ts,tsx}",
    "format": "prettier --write src/**/*.{js,jsx,ts,tsx,css,md}"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "@instincthub/react-ui": "^1.0.0",
    "axios": "^1.3.0",
    "styled-components": "^5.3.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "typescript": "^4.9.0",
    "eslint": "^8.0.0",
    "prettier": "^2.8.0"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}`}
              language="json"
              fileName="package.json"
              maxHeight="300px"
            />
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="ihub-mb-5">
        <h2>Advanced Features</h2>
        
        {/* Large Code Block with Scrolling */}
        <div className="ihub-mb-4">
          <h3>Large Code Block with Horizontal Scrolling</h3>
          <CodeDisplay
            code={`// React Component with TypeScript - Advanced Example
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { debounce } from 'lodash';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
}

interface AdvancedSearchProps {
  onResults: (results: SearchResult[]) => void;
  placeholder?: string;
  categories?: string[];
  maxResults?: number;
  searchDelay?: number;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  onResults,
  placeholder = "Search for anything...",
  categories = [],
  maxResults = 50,
  searchDelay = 300
}) => {
  const [query, setQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Debounced search function to avoid excessive API calls
  const debouncedSearch = useMemo(
    () => debounce(async (searchQuery: string, category: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        onResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: searchQuery,
            category: category !== 'all' ? category : undefined,
            limit: maxResults,
          }),
        });

        if (!response.ok) {
          throw new Error(\`Search failed: \${response.statusText}\`);
        }

        const data = await response.json();
        const searchResults: SearchResult[] = data.results || [];
        
        setResults(searchResults);
        onResults(searchResults);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, searchDelay),
    [onResults, maxResults, searchDelay]
  );

  // Effect to trigger search when query or category changes
  useEffect(() => {
    debouncedSearch(query, selectedCategory);
    
    // Cleanup function to cancel pending debounced calls
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, selectedCategory, debouncedSearch]);

  const handleQueryChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

  const handleCategoryChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setSelectedCategory('all');
    setResults([]);
    setError(null);
    onResults([]);
  }, [onResults]);

  return (
    <div className="advanced-search">
      <div className="search-controls">
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder={placeholder}
            className="search-input"
            disabled={isLoading}
          />
          {query && (
            <button
              onClick={clearSearch}
              className="clear-button"
              type="button"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
        
        {categories.length > 0 && (
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="category-select"
            disabled={isLoading}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        )}
      </div>

      {isLoading && <div className="search-loading">Searching...</div>}
      {error && <div className="search-error">Error: {error}</div>}
      
      <div className="search-results">
        {results.map((result) => (
          <SearchResultItem key={result.id} result={result} />
        ))}
        {query && !isLoading && results.length === 0 && !error && (
          <div className="no-results">No results found for "{query}"</div>
        )}
      </div>
    </div>
  );
};

export default AdvancedSearch;`}
            language="typescript"
            fileName="AdvancedSearch.tsx"
            wrapLines={false}
            maxHeight="400px"
          />
        </div>

        {/* Bash Script Example */}
        <div className="ihub-mb-4">
          <h3>Bash Script</h3>
          <CodeDisplay
            code={`#!/bin/bash

# Deployment script for React application
set -e  # Exit on any error

# Configuration
APP_NAME="react-app"
BUILD_DIR="build"
DEPLOY_DIR="/var/www/html"
BACKUP_DIR="/backups"
LOG_FILE="/var/log/deploy.log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# Error handling
error_exit() {
    echo -e "${RED}Error: $1${NC}" >&2
    log "ERROR: $1"
    exit 1
}

# Success message
success() {
    echo -e "${GREEN}$1${NC}"
    log "SUCCESS: $1"
}

# Warning message
warning() {
    echo -e "${YELLOW}Warning: $1${NC}"
    log "WARNING: $1"
}

# Check if required commands exist
check_dependencies() {
    log "Checking dependencies..."
    
    commands=("node" "npm" "git" "rsync")
    for cmd in "\${commands[@]}"; do
        if ! command -v "$cmd" &> /dev/null; then
            error_exit "Required command '$cmd' not found"
        fi
    done
    
    success "All dependencies found"
}

# Backup current deployment
backup_current() {
    log "Creating backup of current deployment..."
    
    if [ -d "$DEPLOY_DIR" ]; then
        backup_name="backup_$(date +%Y%m%d_%H%M%S)"
        mkdir -p "$BACKUP_DIR"
        cp -r "$DEPLOY_DIR" "$BACKUP_DIR/$backup_name"
        success "Backup created: $backup_name"
    else
        warning "No existing deployment to backup"
    fi
}

# Install dependencies and build
build_application() {
    log "Installing dependencies..."
    npm ci || error_exit "Failed to install dependencies"
    
    log "Running tests..."
    npm test -- --coverage --watchAll=false || error_exit "Tests failed"
    
    log "Building application..."
    npm run build || error_exit "Build failed"
    
    success "Application built successfully"
}

# Deploy the application
deploy_application() {
    log "Deploying application..."
    
    # Create deploy directory if it doesn't exist
    sudo mkdir -p "$DEPLOY_DIR"
    
    # Copy build files
    sudo rsync -av --delete "$BUILD_DIR/" "$DEPLOY_DIR/" || error_exit "Failed to copy files"
    
    # Set proper permissions
    sudo chown -R www-data:www-data "$DEPLOY_DIR"
    sudo chmod -R 755 "$DEPLOY_DIR"
    
    success "Application deployed successfully"
}

# Health check
health_check() {
    log "Performing health check..."
    
    # Check if index.html exists
    if [ ! -f "$DEPLOY_DIR/index.html" ]; then
        error_exit "index.html not found in deployment directory"
    fi
    
    # Optional: Check if service is responding
    if command -v curl &> /dev/null; then
        if curl -f -s http://localhost > /dev/null; then
            success "Health check passed"
        else
            warning "HTTP health check failed"
        fi
    fi
}

# Main deployment process
main() {
    log "Starting deployment of $APP_NAME"
    
    check_dependencies
    backup_current
    build_application
    deploy_application
    health_check
    
    success "Deployment completed successfully!"
    echo -e "${GREEN}Your application is now live!${NC}"
}

# Run main function
main "$@"`}
            language="bash"
            fileName="deploy.sh"
            maxHeight="400px"
          />
        </div>
      </section>

      {/* Custom Styling Example */}
      <section className="ihub-mb-5">
        <h2>Custom Styling</h2>
        <p>CodeDisplay with custom CSS classes:</p>
        <CodeDisplay
          code={`.custom-code-block {
  border: 2px solid #007bff;
  border-radius: 12px;
  background: linear-gradient(145deg, #1e1e1e, #2d2d2d);
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.15);
}

.custom-code-block .ihub-code-header {
  background: linear-gradient(90deg, #007bff, #0056b3);
  color: white;
  font-weight: 600;
}

.custom-code-block .ihub-copy-button:hover {
  background: rgba(0, 123, 255, 0.2);
  transform: scale(1.05);
}`}
          language="css"
          fileName="custom-styles.css"
          className="custom-code-block"
          theme="vs-dark"
        />
      </section>
    </div>
  );
};

export default CodeDisplayExamples;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { CodeDisplay } from '@instincthub/react-ui';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { CodeDisplay } from '@instincthub/react-ui';

function MyComponent() {
  const codeString = `function hello() {
  console.log("Hello, World!");
}`;

  return (
    <CodeDisplay
      code={codeString}
      language="javascript"
      fileName="example.js"
    />
  );
}
```

## 🎨 Supported Languages

The CodeDisplay component supports syntax highlighting for 150+ programming languages including:

- **Web Technologies**: JavaScript, TypeScript, HTML, CSS, SCSS, JSON
- **Backend Languages**: Python, Java, C#, PHP, Ruby, Go, Rust
- **Database**: SQL, MongoDB, GraphQL
- **DevOps**: Bash, PowerShell, Docker, YAML
- **Mobile**: Swift, Kotlin, Dart
- **Functional**: Haskell, F#, Clojure
- **And many more...**

## 🎨 Available Themes

- `vs-dark` - Visual Studio Dark (default)
- `vs-light` - Visual Studio Light
- `github-dark` - GitHub Dark theme
- `github-light` - GitHub Light theme
- `monokai` - Monokai theme
- `solarized-dark` - Solarized Dark
- `solarized-light` - Solarized Light

## ♿ Accessibility Features

- **Keyboard Navigation** - Full keyboard accessibility
- **Screen Reader Support** - Proper ARIA labels and semantic structure
- **High Contrast Support** - Works with system high contrast modes
- **Focus Management** - Clear focus indicators
- **Copy Feedback** - Accessible success/error messages

## 🎯 Use Cases

- **Documentation** - Code examples in technical documentation
- **Tutorials** - Step-by-step coding tutorials
- **Code Reviews** - Displaying code snippets for review
- **API Documentation** - Request/response examples
- **Blog Posts** - Technical blog posts with code examples
- **Developer Tools** - IDE-like code viewing experiences

## 🔗 Related Components

- [CopyToClipboard](./CopyToClipboard.md) - Standalone copy functionality
- [ContentViewer](./ContentViewer.md) - Content viewing with markdown support
- [CustomTextEditor](./CustomTextEditor.md) - Rich text editor component
- [ContentViewOrEdit](./ContentViewOrEdit.md) - Content view/edit switcher
- [InputTextarea](./InputTextarea.md) - Text area input component