# LoadingAnimate

Three-dot loader in the brand colour.

```tsx
import { LoadingAnimate } from "@instincthub/react-ui";

// A whole page loading: full-viewport overlay (the default).
<LoadingAnimate />

// One section loading (panel, card, modal section, expanded table row).
<LoadingAnimate variant="inline" label="Loading people" />
```

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `"page" \| "inline"` | `"page"` | `"page"` is `position: fixed` over the whole viewport. Use `"inline"` for anything smaller than a page, or the whole screen blanks while one part loads. |
| `label` | `string` | `"Loading"` | Screen-reader text for the inline variant (`role="status"`, `aria-live="polite"`). |
