# stripHtmlTags

**Category:** Library | **Type:** string utility

Remove HTML tags from a string while preserving the text content.

**File Location:** `src/components/lib/helpFunction.ts`

## 🏷️ Tags

`string`, `html`, `sanitize`, `text`, `utility`

## 📖 Usage Example

```tsx
"use client";

import React, { useState } from "react";
import { stripHtmlTags } from "@instincthub/react-ui/lib";

/**
 * Example demonstrating stripHtmlTags function
 */
const StripHtmlExample = () => {
  const [htmlInput, setHtmlInput] = useState<string>(
    "Hello <b>World</b>! This is a <em>test</em> with <a href='#'>links</a>."
  );

  return (
    <div className="ihub-container ihub-py-5">
      <h1>Strip HTML Tags Example</h1>

      <section className="ihub-mb-5">
        <div className="ihub-card ihub-p-4">
          <div className="ihub-mb-3">
            <label className="ihub-form-label">Input with HTML:</label>
            <textarea
              className="ihub-form-control"
              rows={3}
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              placeholder="Enter text with HTML tags"
            />
          </div>
          
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <div className="ihub-alert ihub-alert-secondary">
                <strong>Original (with HTML):</strong>
                <div dangerouslySetInnerHTML={{ __html: htmlInput }} />
              </div>
            </div>
            <div className="ihub-col-md-6">
              <div className="ihub-alert ihub-alert-success">
                <strong>Stripped (text only):</strong>
                <div>{stripHtmlTags(htmlInput)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Use Cases */}
      <section className="ihub-mb-5">
        <h2>Common Use Cases</h2>
        <div className="ihub-card ihub-p-4">
          {[
            "<p>Simple paragraph text</p>",
            "<div><h2>Title</h2><p>Content with <strong>bold</strong> text</p></div>",
            "<ul><li>Item 1</li><li>Item 2 with <em>emphasis</em></li></ul>",
            "<article>Article content with <a href='#'>links</a> and <img src='image.jpg' alt='alt text' /></article>"
          ].map((html, index) => (
            <div key={index} className="ihub-mb-3 ihub-border-bottom ihub-pb-3">
              <div className="ihub-mb-2">
                <strong>Input:</strong> <code>{html}</code>
              </div>
              <div>
                <strong>Output:</strong> <span className="ihub-text-success">{stripHtmlTags(html)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StripHtmlExample;
```

## 🚀 Basic Usage

```tsx
import { stripHtmlTags } from '@instincthub/react-ui/lib';

// Basic usage
const htmlString = "<p>Hello <b>World</b>!</p>";
const cleanText = stripHtmlTags(htmlString);
// Result: "Hello World!"

// Common scenarios
const blogExcerpt = stripHtmlTags("<div><h2>Title</h2><p>Content...</p></div>");
const userComment = stripHtmlTags(userInput); // Sanitize user input
const searchText = stripHtmlTags(htmlContent); // Prepare text for search
```

## 🔧 Function Signature

```typescript
function stripHtmlTags(str: string): string
```

### Parameters

- **str** (string): The HTML string to clean

### Returns

- **string**: The text content with all HTML tags removed

## 💡 Use Cases

- **Content Sanitization**: Remove HTML tags from user-generated content
- **Search Functionality**: Extract plain text for search indexing
- **Preview Generation**: Create clean text previews from HTML content
- **Data Export**: Convert HTML content to plain text for exports
- **Form Validation**: Ensure input contains only text content
- **Email Templates**: Generate plain text versions of HTML emails

## ⚠️ Important Notes

- This function only removes HTML tags, not HTML entities (use appropriate decoding for entities)
- The function preserves the text content between tags
- Self-closing tags (like `<img>`, `<br>`) are completely removed
- The function does not validate or parse HTML structure

## 🔗 Related Functions

- [toTitleCase](./toTitleCase.md) - Convert text to title case
- [convertToSlug](./convertToSlug.md) - Convert text to URL-friendly slug
- [truncateHtml](./truncateHtml.md) - Truncate HTML content