# convertToSlug

**Category:** Library | **Type:** string utility

Convert any string into a URL-friendly slug by removing special characters, converting to lowercase, and replacing spaces with hyphens.

**File Location:** `src/components/lib/helpFunction.ts`

## 🏷️ Tags

`string`, `url`, `slug`, `seo`, `utility`

## 📖 Usage Example

```tsx
"use client";

import React, { useState } from "react";
import { convertToSlug } from "@instincthub/react-ui/lib";

/**
 * Example demonstrating convertToSlug function
 */
const ConvertToSlugExample = () => {
  const [textInput, setTextInput] = useState<string>("Hello World! This is a Test.");

  const examples = [
    "Hello World!",
    "How to Use React Hooks",
    "JavaScript Best Practices 2024",
    "Product Name & Description",
    "User's Guide to Programming",
    "Special Characters: @#$%^&*()",
    "Multiple    Spaces   Between   Words",
    "UPPERCASE TEXT",
    "Mixed CaSe TeXt",
    "Números y acentós en español"
  ];

  return (
    <div className="ihub-container ihub-py-5">
      <h1>Convert to Slug Example</h1>

      <section className="ihub-mb-5">
        <div className="ihub-card ihub-p-4">
          <div className="ihub-mb-3">
            <label className="ihub-form-label">Enter text to convert:</label>
            <input
              className="ihub-form-control"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Enter any text"
            />
          </div>
          
          <div className="ihub-alert ihub-alert-success">
            <strong>Generated Slug:</strong>
            <div className="ihub-mt-2">
              <code className="ihub-fs-lg">{convertToSlug(textInput)}</code>
            </div>
          </div>

          <div className="ihub-alert ihub-alert-info">
            <strong>Sample URL:</strong>
            <div className="ihub-mt-2">
              <code>https://example.com/blog/{convertToSlug(textInput)}</code>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="ihub-mb-5">
        <h2>Common Examples</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-table-responsive">
            <table className="ihub-table">
              <thead>
                <tr>
                  <th>Original Text</th>
                  <th>Generated Slug</th>
                </tr>
              </thead>
              <tbody>
                {examples.map((text, index) => (
                  <tr key={index}>
                    <td>{text}</td>
                    <td><code>{convertToSlug(text)}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="ihub-mb-5">
        <h2>SEO-Friendly URLs</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <h5 className="text-danger">❌ Bad URLs</h5>
              <ul className="list-unstyled">
                <li><code>/blog/How to Use React Hooks</code></li>
                <li><code>/products/Product Name & Description</code></li>
                <li><code>/pages/User's Guide</code></li>
              </ul>
            </div>
            <div className="ihub-col-md-6">
              <h5 className="text-success">✅ Good URLs</h5>
              <ul className="list-unstyled">
                <li><code>/blog/{convertToSlug("How to Use React Hooks")}</code></li>
                <li><code>/products/{convertToSlug("Product Name & Description")}</code></li>
                <li><code>/pages/{convertToSlug("User's Guide")}</code></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConvertToSlugExample;
```

## 🚀 Basic Usage

```tsx
import { convertToSlug } from '@instincthub/react-ui/lib';

// Basic usage
const title = "How to Use React Hooks";
const slug = convertToSlug(title);
// Result: "how-to-use-react-hooks"

// Common scenarios
const blogUrl = `/blog/${convertToSlug(blogTitle)}`;
const productUrl = `/products/${convertToSlug(productName)}`;
const categorySlug = convertToSlug(categoryName);
```

## 🔧 Function Signature

```typescript
function convertToSlug(value: string): string
```

### Parameters

- **value** (string): The text to convert to a slug

### Returns

- **string**: URL-friendly slug with lowercase letters, numbers, and hyphens only

## 💡 Use Cases

- **SEO URLs**: Create search engine friendly URLs
- **Blog Posts**: Generate slugs for blog post URLs
- **Product Pages**: Create clean product URLs
- **Category Pages**: Generate category slugs
- **File Names**: Create clean file names for uploads
- **API Endpoints**: Generate consistent endpoint names
- **Database Keys**: Create clean keys for database records

## 🔄 Transformation Rules

The function applies these transformations:

1. **Lowercase**: Converts all characters to lowercase
2. **Special Characters**: Removes or replaces special characters
3. **Spaces**: Replaces spaces with hyphens
4. **Multiple Hyphens**: Collapses multiple consecutive hyphens to single hyphen
5. **Trim**: Removes leading and trailing hyphens

## ⚠️ Important Notes

- The function only preserves alphanumeric characters and hyphens
- Accented characters may be removed (consider additional normalization if needed)
- Very long strings are not automatically truncated
- Empty strings or strings with no valid characters return empty string

## 🔗 Related Functions

- [stripHtmlTags](./stripHtmlTags.md) - Remove HTML tags before slugifying
- [toTitleCase](./toTitleCase.md) - Convert to title case
- [slugifyFileName](./slugifyFileName.md) - Create clean file names