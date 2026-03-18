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
| `placeholder` | `string` | `"Tell your story..."` | Placeholder text |
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
