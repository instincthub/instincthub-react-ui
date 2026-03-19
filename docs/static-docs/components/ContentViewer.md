# ContentViewer

**Category:** UI | **Type:** component

A content viewer component with Medium/Substack-quality typography for displaying HTML, Markdown, and rich text content from IHubTextEditor.

## File Location

`src/components/ui/viewer/ContentViewer.tsx`

## CSS File

`src/assets/css/ui/content-viewer.css`

**GitHub:** [content-viewer.css](https://github.com/instincthub/instincthub-react-ui/blob/main/src/assets/css/ui/content-viewer.css)

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `content` | `string` | Yes | - | HTML or Markdown content to display |
| `title` | `string` | No | `"Document"` | Title used for PDF export filename |
| `className` | `string` | No | `""` | Additional CSS classes |
| `editable` | `boolean` | No | `false` | Whether task list checkboxes are interactive |
| `isEditing` | `boolean` | No | `false` | Whether content is in editing mode |
| `setIsEditing` | `(boolean) => void` | No | `() => {}` | Toggle editing state |
| `onContentChange` | `(string) => void` | No | - | Callback when content changes (task checkboxes) |
| `showToolbar` | `boolean` | No | `true` | Show Print / PDF / Copy / Fullscreen toolbar |
| `showEditBtn` | `boolean` | No | `false` | Show edit button in toolbar |
| `isMarkdown` | `boolean` | No | `false` | Treat content as Markdown (auto-detected if not set) |

## Typography

The content viewer uses Medium/Substack-inspired typography:

- **Max-width:** 720px (research-proven optimal reading width)
- **Body font:** Georgia, serif
- **Font size:** 1.125rem (18px)
- **Line-height:** 1.75
- **Paragraph spacing:** 1.25rem
- **Headings:** Sans-serif (Nunito), tight letter-spacing

## CSS Classes

- `.ihub-content-container` — Outer wrapper
- `.ihub-content-toolbar` — Toolbar with actions
- `.ihub-content-viewer` — Main content area (apply to any HTML container)

## Displaying IHubTextEditor Content

### Option 1: React Component

```tsx
import { ContentViewer } from "@instincthub/react-ui";

<ContentViewer content={htmlFromEditor} showToolbar={true} />
```

### Option 2: CSS-Only (Backend / SSR / Non-React)

Link the CSS and wrap content in `.ihub-content-viewer`:

```html
<!-- Link the stylesheet -->
<link rel="stylesheet" href="https://unpkg.com/@instincthub/react-ui/dist/src/assets/css/ui/content-viewer.css" />

<!-- Wrap your HTML content -->
<div class="ihub-content-viewer">
  <h2>Article Title</h2>
  <p>Your content from IHubTextEditor...</p>
</div>
```

**Important:** The `.ihub-content-viewer` class provides all the typography styles. No JavaScript required for display.

## HTML Block Types Produced by IHubTextEditor

| Block | HTML Structure |
|-------|---------------|
| Heading 1-4 | `<h1>` to `<h4>` |
| Paragraph | `<p>...</p>` |
| Bold | `<strong>...</strong>` |
| Italic | `<em>...</em>` |
| Underline | `<u>...</u>` |
| Strikethrough | `<s>...</s>` |
| Highlight | `<mark>...</mark>` |
| Inline code | `<code>...</code>` |
| Link | `<a href="...">...</a>` |
| Bullet list | `<ul><li><p>...</p></li></ul>` |
| Ordered list | `<ol><li><p>...</p></li></ol>` |
| Task list | `<ul data-type="taskList"><li data-type="taskItem" data-checked="true/false">...</li></ul>` |
| Blockquote | `<blockquote><p>...</p></blockquote>` |
| Pull quote | `<blockquote data-type="pull-quote"><p>...</p></blockquote>` |
| Code block | `<pre><code>...</code></pre>` |
| Table | `<table><tr><th>...</th></tr><tr><td>...</td></tr></table>` |
| Image + caption | `<figure class="ihub-te-image-block"><img src="..." /><figcaption>...</figcaption></figure>` |
| YouTube embed | `<div data-youtube-video><iframe src="..."></iframe></div>` |
| Horizontal rule | `<hr />` |

## Django / Backend Template Example

```html
{% load static %}
<link rel="stylesheet" href="{% static 'css/content-viewer.css' %}" />

<article class="ihub-content-viewer">
  {{ article.content|safe }}
</article>
```

## Dark Mode

Dark mode is supported via the `.DarkMode` class on a parent element (typically `<html>`). The CSS variables (`--White`, `--Gunmetal`) swap automatically.

## Examples

```tsx
// Basic display
<ContentViewer content={htmlContent} />

// With toolbar
<ContentViewer content={htmlContent} showToolbar={true} />

// Markdown content
<ContentViewer content={markdownString} isMarkdown={true} />

// Interactive task lists
<ContentViewer
  content={htmlContent}
  editable={true}
  onContentChange={handleChange}
/>
```

## Related Components

- [IHubTextEditor](./IHubTextEditor.md) — Rich text editor that produces the HTML
- [ContentViewOrEdit](./ContentViewOrEdit.md) — Toggle between view/edit mode
- [CodeDisplay](./CodeDisplay.md) — Specialized code syntax highlighting
