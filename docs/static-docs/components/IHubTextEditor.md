# IHubTextEditor

Notion-style rich text editor with a distraction-free, content-first UX.

## Features

- **Bubble Toolbar**: floating toolbar on text selection (bold, italic, underline, strike, code, link, text and highlight colour, H2/H3, quote, left/centre/right alignment, clear formatting)
- **Slash Commands and "+" menu**: type "/" or click "+" on an empty line for Text, H1 to H3, lists, task list, toggle, section banner, callout, button, quote, pull quote, code, table, divider, image, video, audio, PDF, file and embed
- **Drag to reorder**: hover any block, including blocks inside banners, callouts and toggles, for a "+" (add a line below) and a grip. Drop blocks between top-level blocks or into a banner, callout or open toggle (after its title); drag them back out the same way. Drag the grip and a blue line shows where the block will land (the block dims and a copy follows the pointer; Esc cancels). Click it for Move up/down, Duplicate and Delete, or use ⌘⇧↑ / ⌘⇧↓ (Ctrl on Windows) to move a block within its parent
- **Flexible Tables**: hover a cell for row and column handles (insert before/after, move, duplicate, toggle header, row/column colour, delete), "+" bars to add a row or column at the end, cell colour, merge/split, column resize
- **Uploads**: image, video, audio, PDF and file blocks with an Upload / Embed-link placeholder, drag-and-drop or paste files anywhere, real progress, rendered by type (inline PDF viewer, video/audio players, download cards)
- **Embeds**: YouTube, Vimeo, Loom, Figma, Google Drive and CodePen links become embeds (paste a bare link, or use the Embed block)
- **Section Banners**: text over a coloured box with background colour, text colour, alignment and size controls
- **Callouts, Toggles and Buttons**: Notion-style callouts (emoji and style), collapsible toggles (`<details>`), CTA buttons with link and colours
- **Rich HTML preserved**: pasted or loaded HTML keeps inline styles and email-table attributes (`role`, `cellpadding`, `bgcolor`, `width`, `align`), so HTML email templates survive editing. Paste with ⌘⇧V / Ctrl+Shift+V for plain text
- **Pull Quotes, Focus Mode, Dark Mode, Read-Only Mode, Character Count**

## Import

```tsx
import { IHubTextEditor } from "@instincthub/react-ui";
import type {
  IHubTextEditorProps,
  IHubEditorFeatures,
  IHubEditorUploadConfig,
  FileUploadHandler,
} from "@instincthub/react-ui";
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
| `onFileUpload` | `FileUploadHandler` | — | Upload handler for image, video, audio, PDF and file blocks: `(file, { kind, onProgress }) => Promise<string \| { url, name?, size?, mime? }>` |
| `upload` | `IHubEditorUploadConfig` | — | Built-in upload strategies (presign, multipart endpoint, direct S3). See [Uploads](#uploads) |
| `onImageUpload` | `(file: File) => Promise<string>` | — | Legacy image-only handler, used for images when `onFileUpload` is not set |
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
| `dragHandle` | `true` | Block handle (drag to reorder, "+", options menu) and ⌘⇧↑/↓ shortcuts |
| `focusMode` | `false` | Dim non-focused paragraphs |
| `imageUpload` | `true` | Image blocks (upload or link) |
| `fileUploads` | `true` | Video, audio, PDF and file blocks |
| `mediaEmbeds` | `true` | Embed block and link-to-embed on paste |
| `tables` | `true` | Tables with row/column handles |
| `codeBlocks` | `true` | Code block support |
| `taskLists` | `true` | Task list checkboxes |
| `pullQuotes` | `true` | Pull quote blocks |
| `banners` | `true` | Section banner blocks |
| `callouts` | `true` | Callout blocks |
| `toggles` | `true` | Collapsible toggle blocks |
| `buttons` | `true` | CTA button blocks |
| `preserveStyles` | `true` | Keep inline styles / email-table attributes from pasted or loaded HTML |
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

### Uploads

Resolution order when a file is added (picker, drag-and-drop or paste):

1. `onFileUpload` (or `onImageUpload` for images)
2. `upload.getPresignedUrl`, `upload.presignEndpoint`, or `NEXT_PUBLIC_IHUB_EDITOR_PRESIGN_URL`. The endpoint receives `POST { filename, content_type, size, kind }` and returns `{ url, cdnUrl, contentType?, headers? }`; the file is `PUT` to `url` with progress
3. `upload.endpoint` or `NEXT_PUBLIC_IHUB_EDITOR_UPLOAD_URL`: multipart `POST` (field `file`, plus `name`, `kind`, `extraFields`), the same pattern as Leadboard documents. The JSON response must include `url`, `cdnUrl`, `location`, `file_url` or `file` (nested under `data` is fine)
4. Direct browser-to-S3 (opt-in: `upload={{ directS3: true }}` or `NEXT_PUBLIC_IHUB_EDITOR_DIRECT_S3=true`) using FileUploader's variables: `NEXT_PUBLIC_AWS_BUCKET_NAME`, `NEXT_PUBLIC_AWS_ACCESS_KEY_ID`, `NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY`, `NEXT_PUBLIC_AWS_REGION`, optional `NEXT_PUBLIC_AWS_S3_ENDPOINT_URL`, `NEXT_PUBLIC_IHUB_EDITOR_S3_FOLDER` (default `editor`) and `NEXT_PUBLIC_IHUB_EDITOR_FILE_URL` (public base URL)

`token` and `channel` are sent through `reqOptions`, so the sk-headers and `Authorization: Bearer` are included. Anything `NEXT_PUBLIC_` ships to the browser, so prefer option 2 in production. If you enable direct S3, scope the key to `PutObject` on one prefix.

Embeds are limited to YouTube, Vimeo, Loom, Figma, Google Drive and CodePen, and render in a sandboxed iframe. PDF blocks show the inline viewer only for URLs ending in `.pdf`; other links render as a download card. Pasted styles lose `url(...)` backgrounds (except `data:image`) and `position: fixed/sticky`.

If no strategy is configured, media blocks still accept pasted links.

```tsx
// Presigned S3 (recommended)
<IHubTextEditor
  content={content}
  onChange={setContent}
  upload={{ presignEndpoint: `${API_HOST_URL}uploads/presign/`, token, maxSizeMB: { video: 1000 } }}
/>

// Multipart endpoint (Leadboard documents style)
<IHubTextEditor
  upload={{ endpoint: `${API_HOST_URL}documents/${companyHandle}/`, token, extraFields: { document_type: "other" } }}
/>

// Your own handler
<IHubTextEditor
  onFileUpload={async (file, { kind, onProgress }) => {
    const url = await uploadSomewhere(file, onProgress);
    return { url, name: file.name, size: file.size };
  }}
/>
```

### Rich HTML / email templates

```tsx
// Inline styles, bgcolor, role="presentation" etc. are kept on load and paste.
<IHubTextEditor content={emailTemplateHtml} onChange={setHtml} maxHeight="none" />

// Strip pasted styles instead:
<IHubTextEditor features={{ preserveStyles: false }} />
```

Styles are written through the browser's CSS parser, so values come back normalised (`#1A2535` becomes `rgb(26, 37, 53)`, while `bgcolor` stays hex). Vendor-only declarations the browser doesn't recognise (for example `mso-*`) are dropped.

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
    upload={{ presignEndpoint, token }}
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
- `.ihub-te-table-controls` / `.ihub-te-table-menu` — Table handles, "+" bars and row/column menu
- `.ihub-te-media`, `.ihub-te-media--{image|video|audio|pdf|file|embed}` — Media blocks
- `.ihub-te-file-card`, `.ihub-te-pdf-frame` — File download card and PDF viewer
- `.ihub-te-banner`, `.ihub-te-callout`, `.ihub-te-toggle`, `.ihub-te-button` — Banner, callout, toggle and button blocks
- `.ihub-te-block-handle` / `.ihub-te-block-menu` — Hover handle ("+" and grip) and its options menu
- `.ihub-te-drop-indicator`, `.ihub-te-drag-ghost`, `.ihub-te-block-dragging` — Drop line, pointer ghost and dimmed source while dragging

Block, media and table styles live in `src/assets/css/ui/ihub-text-editor-blocks.css` (imported by `ui-index.css`).

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
| Image | `<figure data-type="ihub-media" data-kind="image" class="ihub-te-media ihub-te-image-block ..."><img src="..." /><figcaption>...</figcaption></figure>` (legacy `figure.ihub-te-image-block` still loads) |
| Video / audio | `<figure data-type="ihub-media" data-kind="video"><video src="..." controls></video></figure>` (`<audio>` for audio) |
| PDF | `<figure data-type="ihub-media" data-kind="pdf"><div class="ihub-te-pdf-header"><a href="...">name</a></div><iframe class="ihub-te-pdf-frame" src="..."></iframe></figure>` |
| File | `<figure data-type="ihub-media" data-kind="file"><a class="ihub-te-file-card" href="..." download>…name, size…</a></figure>` |
| Embed | `<figure data-type="ihub-media" data-kind="embed"><div class="ihub-te-embed-responsive"><iframe src="..."></iframe></div></figure>` |
| YouTube (legacy) | `<div data-youtube-video><iframe src="..."></iframe></div>` |
| Section banner | `<div data-type="section-banner" data-bg data-color style="background-color:…;color:…;text-align:…;padding:…">…blocks…</div>` |
| Callout | `<div data-type="callout" data-variant data-emoji style="…"><span class="ihub-te-callout-emoji">💡</span><div class="ihub-te-callout-body">…</div></div>` |
| Toggle | `<details class="ihub-te-toggle" open><summary>…</summary>…blocks…</details>` |
| Button | `<div data-type="ihub-button" style="text-align:…"><a class="ihub-te-button" href="…" style="…inline button styles…">Label</a></div>` |
| Email table | `<table role="presentation" width cellpadding cellspacing border style="…"><tbody><tr><td bgcolor style="…">…</td></tr></tbody></table>` |
| Horizontal rule | `<hr />` |

## Comparison with CustomTextEditor

| Feature | CustomTextEditor | IHubTextEditor |
|---------|-----------------|----------------|
| Toolbar | Static top bar | Floating bubble menu |
| Block insertion | Menu bar buttons | Slash commands + floating "+" |
| Uploads | Not supported | Image, video, audio, PDF, file (drag/paste/pick, presign/endpoint/S3) |
| Media embeds | Not supported | YouTube, Vimeo, Loom, Figma, Drive, CodePen |
| Tables | Basic | Row/column handles, move, duplicate, colours |
| Layout blocks | No | Section banners, callouts, toggles, buttons |
| Rich HTML paste | Styles stripped | Inline styles and email tables kept |
| Focus mode | No | Yes |
| Pull quotes | No | Yes |
| Typography | No | Smart quotes/dashes |
| Dark mode | Basic | Full dark mode |

## Testing

Unit tests for the editor live in `src/components/ui/editor/ihub-editor/__tests__/` and run headlessly with Vitest + jsdom (`npm test`). They cover the email-template fixture (`fixtures/emailTemplate.html`), uploads, table and block operations (including nested drops), and security sanitising. ProseMirror writes styles through the browser's CSS parser, so assert with `el.style.getPropertyValue()` rather than raw style strings.

## Source

`src/components/ui/editor/ihub-editor/IHubTextEditor.tsx`

## Example Page

`/components/ui/ihub-text-editor`
