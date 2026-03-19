# IHubTextEditor

Medium/Substack-style rich text editor with a distraction-free, content-first UX.

## Features

- **Bubble Toolbar** — Floating toolbar appears on text selection (Bold, Italic, Underline, Strike, Link, H2, H3, Quote, Code, Highlight, Alignment)
- **Slash Commands** — Type "/" to insert blocks (headings, lists, code, images, tables, embeds, pull quotes)
- **Floating Add Button** — "+" button on empty paragraphs for block insertion
- **Image Upload** — Drag-drop, paste, or file picker with caption support
- **Media Embeds** — Auto-detect YouTube URLs and embed as iframes
- **Pull Quotes** — Decorative centered quotes
- **Focus Mode** — Dims non-focused paragraphs
- **Dark Mode** — Full dark mode support via `.DarkMode` class
- **Read-Only Mode** — Display content without editing
- **Character Count** — Word and character count footer

## Import

```tsx
import { IHubTextEditor } from "@instincthub/react-ui";
import type { IHubTextEditorProps, IHubEditorFeatures } from "@instincthub/react-ui";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | `"editor-content"` | Hidden input name for form submission |
| `label` | `string` | — | Label text above the editor |
| `content` | `string` | `""` | Initial HTML content |
| `placeholder` | `string` | `"Tell your story..."` | Placeholder for empty editor (non-empty editors show "Press '/' for commands" on active empty lines) |
| `onChange` | `(html: string) => void` | — | Callback when content changes |
| `onBlur` | `() => void` | — | Callback on editor blur |
| `required` | `boolean` | `false` | Whether the field is required |
| `charLimit` | `number` | `50000` | Character limit |
| `features` | `IHubEditorFeatures` | See below | Toggle individual features |
| `onImageUpload` | `(file: File) => Promise<string>` | — | Image upload handler, returns URL |
| `className` | `string` | `""` | Additional CSS class |
| `minHeight` | `string` | `"400px"` | Minimum editor height |
| `maxHeight` | `string` | `"80vh"` | Maximum editor height |
| `lastUpdated` | `string` | — | ISO date string for last updated display |
| `readOnly` | `boolean` | `false` | Disable editing |
| `extensions` | `Extension[]` | `[]` | Additional tiptap extensions |

### IHubEditorFeatures

| Feature | Default | Description |
|---------|---------|-------------|
| `bubbleMenu` | `true` | Floating toolbar on text selection |
| `slashCommands` | `true` | "/" command menu |
| `floatingAddButton` | `true` | "+" button on empty lines |
| `dragHandle` | `false` | Block drag reordering (Phase 3) |
| `focusMode` | `false` | Dim non-focused paragraphs |
| `imageUpload` | `true` | Image upload support |
| `mediaEmbeds` | `true` | YouTube/media auto-embed |
| `tables` | `true` | Table support |
| `codeBlocks` | `true` | Code block support |
| `taskLists` | `true` | Task list checkboxes |
| `pullQuotes` | `true` | Pull quote blocks |
| `characterCount` | `true` | Word/char count footer |
| `typography` | `true` | Smart typography (quotes, dashes) |

## Examples

### Basic Usage

```tsx
"use client";
import { useState } from "react";
import { IHubTextEditor } from "@instincthub/react-ui";

export default function MyEditor() {
  const [content, setContent] = useState("");

  return (
    <IHubTextEditor
      content={content}
      onChange={setContent}
      placeholder="Tell your story..."
    />
  );
}
```

### With Image Upload

```tsx
const handleImageUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch("/api/upload", { method: "POST", body: formData });
  const { url } = await res.json();
  return url;
};

<IHubTextEditor
  label="Article Content"
  content={content}
  onChange={setContent}
  onImageUpload={handleImageUpload}
  charLimit={50000}
  lastUpdated={new Date().toISOString()}
/>
```

### Minimal Configuration

```tsx
<IHubTextEditor
  content={content}
  onChange={setContent}
  features={{
    slashCommands: false,
    floatingAddButton: false,
    tables: false,
    taskLists: false,
    pullQuotes: false,
    mediaEmbeds: false,
  }}
  charLimit={500}
  minHeight="200px"
/>
```

### Form Integration

```tsx
<form onSubmit={handleSubmit}>
  <IHubTextEditor
    label="Blog Post"
    name="blog-content"
    content={content}
    onChange={setContent}
    required
    onImageUpload={handleImageUpload}
  />
  <SubmitButton label="Publish" />
</form>
```

### Read-Only

```tsx
<IHubTextEditor
  content={savedHtml}
  readOnly
  features={{ characterCount: false }}
/>
```

## CSS Classes

All styles use the `.ihub-te-*` prefix. Key classes:

- `.ihub-te-wrapper` — Outer container
- `.ihub-te-content` — ProseMirror editor content
- `.ihub-te-bubble-menu` — Floating toolbar
- `.ihub-te-slash-menu` — Slash command dropdown
- `.ihub-te-floating-btn` — "+" button
- `.ihub-te-pull-quote` — Pull quote block
- `.ihub-te-footer` — Word/char count bar

## Displaying IHubTextEditor Content

Content produced by `IHubTextEditor` is standard HTML. To display it with Medium/Substack-quality typography, use one of these approaches:

### Option 1: ContentViewer Component (Recommended)

The `ContentViewer` component from `@instincthub/react-ui` renders IHubTextEditor output with proper styling for all block types, including pull quotes, image captions, code blocks, tables, task lists, and more.

```tsx
import { ContentViewer } from "@instincthub/react-ui";

<ContentViewer content={savedHtml} showToolbar={true} />
```

ContentViewer provides:
- 720px max-width for optimal readability
- Serif body font (Georgia) with 1.75 line-height
- Clean native list markers (disc, decimal)
- Dark code blocks with monospace font
- Pull quote styling (`blockquote[data-type="pull-quote"]`)
- Image + figcaption rendering
- Responsive YouTube/embed display
- Table formatting with header rows
- Task list checkboxes
- Highlight/mark styling
- Full dark mode support

### Option 2: CSS-Only (For Custom Backends / SSR)

If you are rendering HTML from IHubTextEditor in a backend template (Django, Rails, etc.) or a non-React frontend, you can link the content-viewer CSS directly:

```html
<!-- From npm package -->
<link rel="stylesheet" href="node_modules/@instincthub/react-ui/dist/src/assets/css/ui/content-viewer.css" />

<!-- Or from CDN (after publish) -->
<link rel="stylesheet" href="https://unpkg.com/@instincthub/react-ui/dist/src/assets/css/ui/content-viewer.css" />
```

Then wrap your HTML content in a container with the `ihub-content-viewer` class:

```html
<div class="ihub-content-viewer">
  <!-- Paste the HTML output from IHubTextEditor here -->
  <h2>Article Title</h2>
  <p>Your content...</p>
</div>
```

**CSS source:** [`src/assets/css/ui/content-viewer.css`](https://github.com/instincthub/instincthub-react-ui/blob/main/src/assets/css/ui/content-viewer.css)

### HTML Block Types Reference

IHubTextEditor produces these HTML structures. Ensure your display layer handles all of them:

| Block | HTML Output |
|-------|-------------|
| Heading 1 | `<h1>...</h1>` |
| Heading 2 | `<h2>...</h2>` |
| Heading 3 | `<h3>...</h3>` |
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
| Pull quote | `<blockquote data-type="pull-quote">...</blockquote>` |
| Code block | `<pre><code>...</code></pre>` |
| Table | `<table><tr><th>...</th></tr><tr><td>...</td></tr></table>` |
| Image + caption | `<figure class="ihub-te-image-block"><img src="..." /><figcaption>...</figcaption></figure>` |
| YouTube embed | `<div data-youtube-video><iframe src="..."></iframe></div>` |
| Horizontal rule | `<hr />` |

## Comparison with CustomTextEditor

| Feature | CustomTextEditor | IHubTextEditor |
|---------|-----------------|----------------|
| Toolbar | Static top bar | Floating bubble menu |
| Block insertion | Menu bar buttons | Slash commands + floating "+" |
| Image upload | Not supported | Drag/paste/pick with captions |
| Media embeds | Not supported | YouTube auto-embed |
| Focus mode | No | Yes |
| Pull quotes | No | Yes |
| Typography | No | Smart quotes/dashes |
| Dark mode | Basic | Full dark mode |

## Source

`src/components/ui/editor/ihub-editor/IHubTextEditor.tsx`

## Example Page

`/components/ui/ihub-text-editor`
