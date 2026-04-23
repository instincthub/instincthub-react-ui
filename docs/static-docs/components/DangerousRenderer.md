# DangerousRenderer

**Category:** UI | **Type:** component

Safe-by-default renderer for untrusted HTML or Markdown. Wraps React's raw HTML injection with DOMPurify sanitization, link hardening, DoS guards, and a flexible wrapper API.

## 📁 File Location

`src/components/ui/viewer/DangerousRenderer.tsx`

## 🏷️ Tags

`ui`, `html`, `markdown`, `sanitization`, `security`, `xss`, `dompurify`

## 📖 Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `content` | `string` | Yes | - | Raw HTML (or Markdown) string to render. |
| `children` | `ReactElement` | No | - | Single React element used as the wrapper. The sanitized HTML is injected into it; consumer keeps full control over classes, refs, and events. |
| `as` | `string \| ComponentType` | No | `"div"` | Element to render when `children` is not provided. |
| `className` | `string` | No | `""` | CSS class for the default wrapper (ignored when `children` is provided). |
| `style` | `CSSProperties` | No | - | Inline styles for the default wrapper. |
| `id` | `string` | No | - | Id for the default wrapper. |
| `isMarkdown` | `boolean` | No | `false` | Parse `content` as Markdown before sanitization. |
| `allowedTags` | `string[]` | No | - | Extra tags allowed (DOMPurify `ADD_TAGS`). |
| `allowedAttributes` | `string[]` | No | - | Extra attributes allowed (DOMPurify `ADD_ATTR`). |
| `forbiddenTags` | `string[]` | No | - | Tags to forbid (`FORBID_TAGS`). |
| `forbiddenAttributes` | `string[]` | No | - | Attributes to forbid (`FORBID_ATTR`). |
| `useProfiles` | `{ html?, svg?, svgFilters?, mathMl? }` | No | `{ html: true }` | DOMPurify profile flags. |
| `escapeCodeBlocks` | `boolean` | No | `true` | Escape `<code>` contents so HTML entities render literally. |
| `noReferrer` | `boolean` | No | `true` | Add `rel="noopener noreferrer"` to anchor tags. |
| `openLinksInNewTab` | `boolean` | No | `true` | Force external `http(s)` links to open in a new tab. |
| `maxLength` | `number` | No | `1_000_000` | Hard cap on `content` length; exceeds → `onError`. |
| `trusted` | `boolean` | No | `false` | Bypass sanitization. **Use only with fully trusted content.** Warns in dev. |
| `fallback` | `ReactNode` | No | `null` | Rendered when processed HTML is empty. |
| `loading` | `boolean` | No | `false` | If true, renders `loadingComponent`. |
| `loadingComponent` | `ReactNode` | No | `null` | Rendered while `loading` is true. |
| `onSanitize` | `(info) => void` | No | - | Called with `{ sanitized, original, changed }` after sanitization. |
| `onError` | `(error) => void` | No | - | Called if sanitization / Markdown parsing throws. |
| `ariaLabel` | `string` | No | - | ARIA label for the wrapper. |
| `role` | `string` | No | - | ARIA role for the wrapper. |

## 🎨 CSS Classes

- `ihub-dangerous-renderer` — applied to the wrapper (default or custom).

## 🌟 Features

- **Safe by default** — DOMPurify sanitization on every render.
- **Markdown support** — `isMarkdown` runs content through `marked` before sanitization.
- **Link hardening** — `rel="noopener noreferrer"` and `target="_blank"` for external links.
- **Flexible wrapper** — provide your own element via `children`, or use the `as` prop.
- **DoS guard** — `maxLength` cap prevents oversized payloads.
- **Observability** — `onSanitize` diff callback and `onError` handler.
- **Graceful states** — `fallback` for empty content, `loading` + `loadingComponent` for async sources.
- **Escape hatch** — explicit `trusted` bypass with dev-only warning.

## 💡 Examples

### Default wrapper

```tsx
import { DangerousRenderer } from "@instincthub/react-ui";

<DangerousRenderer content={htmlFromApi} />
```

### Markdown with custom wrapper

```tsx
<DangerousRenderer content={markdownFromApi} isMarkdown>
  <article className="prose dark:prose-invert" />
</DangerousRenderer>
```

### Tightening the allowlist

```tsx
<DangerousRenderer
  content={userComment}
  forbiddenTags={["img", "iframe", "video"]}
  forbiddenAttributes={["style", "onerror", "onload"]}
/>
```

### Observability

```tsx
<DangerousRenderer
  content={htmlFromApi}
  onSanitize={({ changed }) => {
    if (changed) analytics.track("content_sanitized");
  }}
  onError={(err) => logger.error(err)}
/>
```

### Trusted bypass (use with care)

```tsx
<DangerousRenderer content={htmlFromCms} trusted />
```
