# InstinctHub CSS Overflow Utilities

This document outlines the custom overflow utilities for InstinctHub's CSS framework, designed to provide consistent overflow behavior across the platform.

## General Overflow Utilities

These utilities control the overflow behavior in both directions (horizontal and vertical).

| Class | Description |
|-------|-------------|
| `.ihub-overflow-auto` | Adds scrollbars only when content overflows |
| `.ihub-overflow-hidden` | Clips content that overflows the element's box |
| `.ihub-overflow-visible` | Content is not clipped when it overflows |
| `.ihub-overflow-scroll` | Always displays scrollbars, even when content doesn't overflow |

## Axis-Specific Overflow

These utilities allow you to control overflow behavior on a specific axis.

### Horizontal Overflow

| Class | Description |
|-------|-------------|
| `.ihub-overflow-x-auto` | Adds horizontal scrollbar only when content overflows horizontally |
| `.ihub-overflow-x-hidden` | Clips content that overflows horizontally |
| `.ihub-overflow-x-scroll` | Always displays horizontal scrollbar |

### Vertical Overflow

| Class | Description |
|-------|-------------|
| `.ihub-overflow-y-auto` | Adds vertical scrollbar only when content overflows vertically |
| `.ihub-overflow-y-hidden` | Clips content that overflows vertically |
| `.ihub-overflow-y-scroll` | Always displays vertical scrollbar |

## Scrollbar Styling

Custom scrollbar styling for elements with overflow.

| Class | Description |
|-------|-------------|
| `.ihub-scrollbar-thin` | Displays thin scrollbars (4px) with InstinctHub brand colors |
| `.ihub-scrollbar-hidden` | Hides scrollbars while maintaining scroll functionality |

## Usage Examples

### Basic Container with Auto Overflow

```html
<div class="ihub-overflow-auto" style="max-height: 300px">
  <!-- Content that might overflow -->
</div>
```

### Horizontal Scrolling Container

```html
<div class="ihub-overflow-x-auto ihub-overflow-y-hidden">
  <!-- Horizontally scrollable content -->
</div>
```

### Custom Scrollbar Styling

```html
<div class="ihub-overflow-auto ihub-scrollbar-thin">
  <!-- Content with custom-styled scrollbars -->
</div>
```

### Hidden Scrollbars

```html
<div class="ihub-overflow-auto ihub-scrollbar-hidden">
  <!-- Content with functional but invisible scrollbars -->
</div>
```

## Implementation Notes

- These utilities use CSS variables from InstinctHub's main theme
- Compatible with all modern browsers
- For Internet Explorer support, use polyfills or fallbacks
- Follows the `ihub-` prefix convention for InstinctHub's component library

## Integration with Existing Components

When using these utilities with existing InstinctHub components, follow these guidelines:

1. Apply overflow utilities to container elements rather than directly to components
2. Use `ihub-overflow-hidden` on parent containers to prevent layout shifts
3. For long content areas like course descriptions or lesson content, use `ihub-overflow-y-auto` with a defined height
4. When creating horizontally scrolling galleries or carousels, use `ihub-overflow-x-auto ihub-overflow-y-hidden`