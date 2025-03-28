# InstinctHub Margin Utility Documentation

## Overview

The InstinctHub Margin Utility system provides a comprehensive set of CSS classes for controlling margin spacing throughout your application. Built with the `ihub-` prefix to maintain brand consistency, these utilities follow a systematic approach to spacing that helps create consistent layouts across your projects.

## Basic Usage

### Syntax Pattern

```
ihub-{property}{sides}-{size}
```

Where:
- **property** is always `m` (for margin)
- **sides** (optional):
  - Empty for all sides
  - `t` for top
  - `r` for right
  - `b` for bottom
  - `l` for left
  - `x` for left and right
  - `y` for top and bottom
- **size**: a number from 0-10 or `auto`

## Spacing Scale

The spacing scale follows a 10px increment pattern:

| Class Suffix | Margin Value |
|--------------|--------------|
| 0            | 0            |
| 1            | 10px         |
| 2            | 20px         |
| 3            | 30px         |
| 4            | 40px         |
| 5            | 50px         |
| 6            | 60px         |
| 7            | 70px         |
| 8            | 80px         |
| 9            | 90px         |
| 10           | 100px        |
| auto         | auto         |

## Direction Variations

### All Sides Margin
```css
.ihub-m-0 { margin: 0 !important; }
.ihub-m-1 { margin: 10px !important; }
.ihub-m-2 { margin: 20px !important; }
/* ... through .ihub-m-10 */
.ihub-m-auto { margin: auto !important; }
```

### Top Margin
```css
.ihub-mt-0 { margin-top: 0 !important; }
.ihub-mt-1 { margin-top: 10px !important; }
.ihub-mt-2 { margin-top: 20px !important; }
/* ... through .ihub-mt-10 */
.ihub-mt-auto { margin-top: auto !important; }
```

### Right Margin
```css
.ihub-mr-0 { margin-right: 0 !important; }
.ihub-mr-1 { margin-right: 10px !important; }
/* ... through .ihub-mr-10 */
.ihub-mr-auto { margin-right: auto !important; }
```

### Bottom Margin
```css
.ihub-mb-0 { margin-bottom: 0 !important; }
.ihub-mb-1 { margin-bottom: 10px !important; }
/* ... through .ihub-mb-10 */
.ihub-mb-auto { margin-bottom: auto !important; }
```

### Left Margin
```css
.ihub-ml-0 { margin-left: 0 !important; }
.ihub-ml-1 { margin-left: 10px !important; }
/* ... through .ihub-ml-10 */
.ihub-ml-auto { margin-left: auto !important; }
```

### Horizontal Margins (X-axis)
```css
.ihub-mx-0 { margin-left: 0 !important; margin-right: 0 !important; }
.ihub-mx-1 { margin-left: 10px !important; margin-right: 10px !important; }
/* ... through .ihub-mx-10 */
.ihub-mx-auto { margin-left: auto !important; margin-right: auto !important; }
```

### Vertical Margins (Y-axis)
```css
.ihub-my-0 { margin-top: 0 !important; margin-bottom: 0 !important; }
.ihub-my-1 { margin-top: 10px !important; margin-bottom: 10px !important; }
/* ... through .ihub-my-10 */
.ihub-my-auto { margin-top: auto !important; margin-bottom: auto !important; }
```

## Responsive Variations

The margin utilities include responsive variants that apply at specific breakpoints:

- **sm**: Small devices (≥576px)
- **md**: Medium devices (≥768px)
- **lg**: Large devices (≥992px)
- **xl**: Extra large devices (≥1200px)

### Syntax for Responsive Variants

```
ihub-{property}{sides}-{breakpoint}-{size}
```

Example:
```css
.ihub-mt-md-3 { margin-top: 30px !important; } /* Applied at medium screens and up */
```

## Negative Margins

For advanced layout needs, negative margin utilities are available:

```css
.ihub-m-n1 { margin: -10px !important; }
.ihub-m-n2 { margin: -20px !important; }
.ihub-m-n3 { margin: -30px !important; }
.ihub-m-n4 { margin: -40px !important; }
.ihub-m-n5 { margin: -50px !important; }

.ihub-mt-n1 { margin-top: -10px !important; }
/* And similar for other directions */
```

## Usage Examples

### Basic Spacing

```html
<div class="ihub-m-3">
  This element has 30px margin on all sides.
</div>

<div class="ihub-mt-4 ihub-mb-5">
  This element has 40px top margin and 50px bottom margin.
</div>
```

### Responsive Spacing

```html
<div class="ihub-m-2 ihub-m-md-4 ihub-m-lg-5">
  This element has:
  - 20px margin on all sides by default
  - 40px margin on medium screens (≥768px)
  - 50px margin on large screens (≥992px)
</div>
```

### Element Centering

```html
<div class="ihub-mx-auto" style="width: 80%;">
  This container is centered horizontally.
</div>
```

### Spacing Reset

```html
<div class="ihub-m-0">
  This element has zero margin on all sides.
</div>
```

### Negative Margins for Overlapping

```html
<div class="ihub-mt-n3">
  This element has a -30px top margin and will overlap the element above it.
</div>
```

## Integration with InstinctHub Components

These margin utilities work seamlessly with all InstinctHub components and can be combined with other utility classes to create complex layouts.

```html
<div class="ihub-card ihub-m-3">
  <div class="ihub-card-body ihub-p-4">
    <h3 class="ihub-mb-2">Card Title</h3>
    <p class="ihub-mb-4">Card content goes here.</p>
    <button class="ihub-important-btn ihub-mt-2">Action</button>
  </div>
</div>
```

## Best Practices

1. **Consistency**: Use the margin utilities consistently to maintain a uniform look and feel.
   
2. **Avoid inline styles**: Instead of adding `style="margin-top: 20px"`, use `class="ihub-mt-2"`.
   
3. **Component spacing**: Use these utilities for spacing between components rather than adding margins to the components themselves.
   
4. **Responsive design**: Leverage responsive variants to create layouts that adapt well to different screen sizes.
   
5. **Combine with other utilities**: These margin utilities can be combined with padding, display, and other utilities in the InstinctHub design system.