# InstinctHub Display Utility Documentation

## Overview

The InstinctHub Display Utility system provides a comprehensive set of CSS classes for controlling how elements are displayed and viewed. With the `ihub-` prefix to maintain brand consistency, these utilities offer responsive display options to create adaptable layouts across different device sizes.

## Basic Usage

### Syntax Pattern

```
ihub-d-{value}
```

For responsive variants:

```
ihub-d-{breakpoint}-{value}
```

Where:

- **d** stands for display
- **breakpoint** (optional): sm, md, lg, or xl
- **value**: none, inline, inline-block, block, table, table-row, table-cell, flex, inline-flex, grid, inline-grid

## Display Values

### Basic Display Properties

```css
.ihub-d-none {
  display: none !important;
}
.ihub-d-inline {
  display: inline !important;
}
.ihub-d-inline-block {
  display: inline-block !important;
}
.ihub-d-block {
  display: block !important;
}
.ihub-d-table {
  display: table !important;
}
.ihub-d-table-row {
  display: table-row !important;
}
.ihub-d-table-cell {
  display: table-cell !important;
}
.ihub-d-flex {
  display: flex !important;
}
.ihub-d-inline-flex {
  display: inline-flex !important;
}
.ihub-d-grid {
  display: grid !important;
}
.ihub-d-inline-grid {
  display: inline-grid !important;
}
```

## Responsive Display

Display utilities include responsive variants that apply at specific breakpoints:

- **sm**: Small devices (≥576px)
- **md**: Medium devices (≥768px)
- **lg**: Large devices (≥992px)
- **xl**: Extra large devices (≥1200px)

Example:

```css
.ihub-d-md-none {
  display: none !important;
} /* Hidden on medium screens and up */
.ihub-d-lg-flex {
  display: flex !important;
} /* Flex display on large screens and up */
```

## Print Display

Special cases for controlling display during printing:

```css
.ihub-d-print-none {
  display: none !important;
}
.ihub-d-print-inline {
  display: inline !important;
}
.ihub-d-print-block {
  display: block !important;
}
/* and more */
```

## Visibility Utilities

Beyond display properties, these utilities also control visibility:

```css
.ihub-visible {
  visibility: visible !important;
}
.ihub-invisible {
  visibility: hidden !important;
}
```

## Accessibility Helpers

Screen-reader utilities for accessibility:

```css
.ihub-sr-only {
  /* Visually hidden but accessible to screen readers */
}
.ihub-sr-only-focusable {
  /* Only visible when focused */
}
```

## Size-specific Display Control

Hide or show elements only on specific screen sizes:

```css
.ihub-hide-sm-only {
  /* Hidden only on small screens */
}
.ihub-hide-md-only {
  /* Hidden only on medium screens */
}
.ihub-hide-lg-only {
  /* Hidden only on large screens */
}
.ihub-hide-xl-only {
  /* Hidden only on extra large screens */
}

.ihub-show-sm-only {
  /* Visible only on small screens */
}
.ihub-show-md-only {
  /* Visible only on medium screens */
}
.ihub-show-lg-only {
  /* Visible only on large screens */
}
.ihub-show-xl-only {
  /* Visible only on extra large screens */
}
```

## Custom InstinctHub Helpers

Special display helpers that match existing patterns in InstinctHub's designs:

```css
.ihub-ghost {
  display: none;
}
.ihub-flex {
  display: flex;
  justify-content: space-between;
}
```

## Usage Examples

### Responsive Display Control

```html
<div class="ihub-d-none ihub-d-md-block">
  <!-- Hidden on mobile, visible from medium screens up -->
  This content is only visible on medium screens and larger.
</div>

<div class="ihub-d-block ihub-d-lg-none">
  <!-- Visible on small and medium screens, hidden on large screens and up -->
  This content is hidden on large screens.
</div>
```

### Flexbox Layout

```html
<div class="ihub-d-flex">
  <!-- A flex container -->
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<div class="ihub-d-none ihub-d-md-flex">
  <!-- A responsive flex container that only appears on medium screens and up -->
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Print Optimization

```html
<div class="ihub-d-print-none">
  <!-- This content won't appear when printing -->
  Navigation, ads, or other non-essential elements
</div>

<div class="ihub-d-none ihub-d-print-block">
  <!-- This content appears only when printing -->
  Additional print information, footnotes, etc.
</div>
```

### Accessibility Support

```html
<a href="#main-content" class="ihub-sr-only ihub-sr-only-focusable">
  Skip to main content
</a>

<div aria-hidden="true" class="ihub-invisible">
  Hidden from both visual users and screen readers
</div>
```

### Screen Size Specific Content

```html
<div class="ihub-show-sm-only">Content only for small mobile devices</div>

<div class="ihub-show-lg-only">Content only for large desktop screens</div>
```

## Best Practices

1. **Progressive Enhancement**: Use responsive display utilities to create layouts that adapt to different device sizes, showing or hiding elements as needed.

2. **Accessibility First**: When hiding elements, consider whether they should be hidden from all users or just visually hidden (using screen reader utilities).

3. **Print Considerations**: Use print display utilities to optimize the printed version of your pages.

4. **Avoid Excessive Hiding**: Rather than hiding large sections of content on mobile, consider restructuring or simplifying the content for smaller screens.

5. **Combine with Other Utilities**: Display utilities work well with flex, grid, and spacing utilities to create responsive layouts.

6. **Testing**: Always test responsive behavior across multiple device sizes to ensure content appears correctly.

## Integration with InstinctHub Components

These display utilities work seamlessly with all InstinctHub components and can be combined with other utility classes in the design system to create complex, responsive layouts.

```html
<!-- Example of a card that shows differently based on screen size -->
<div class="ihub-card ihub-d-block ihub-d-md-flex">
  <div class="ihub-card-image ihub-d-none ihub-d-lg-block">
    <img src="example.jpg" alt="Example" />
  </div>
  <div class="ihub-card-body">
    <h3>Card Title</h3>
    <p class="ihub-d-none ihub-d-sm-block">
      This description is hidden on mobile.
    </p>
    <div class="ihub-d-flex">
      <button class="ihub-important-btn">Primary Action</button>
      <button class="ihub-outlined-btn ihub-d-none ihub-d-md-block">
        Secondary Action
      </button>
    </div>
  </div>
</div>
```

## Common Use Cases

### Responsive Navigation

```html
<!-- Mobile navigation (hamburger menu) -->
<nav class="ihub-d-block ihub-d-lg-none">
  <button class="ihub-menu-toggle">
    <span class="material-symbols-outlined">menu</span>
  </button>
  <!-- Mobile menu content -->
</nav>

<!-- Desktop navigation (full menu) -->
<nav class="ihub-d-none ihub-d-lg-block">
  <ul class="ihub-d-flex">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
```

### Conditional Content

```html
<!-- Summary content on mobile -->
<div class="ihub-d-block ihub-d-md-none">
  <h3>Product Highlights</h3>
  <ul>
    <li>Key feature 1</li>
    <li>Key feature 2</li>
  </ul>
</div>

<!-- Detailed content on larger screens -->
<div class="ihub-d-none ihub-d-md-block">
  <h3>Product Details</h3>
  <p>Comprehensive description of the product...</p>
  <h4>Features</h4>
  <ul>
    <li>Feature 1 with detailed explanation</li>
    <li>Feature 2 with detailed explanation</li>
    <li>Feature 3 with detailed explanation</li>
    <!-- More features -->
  </ul>
</div>
```

### Grid Adjustments

```html
<div class="ihub-container">
  <div class="ihub-row">
    <!-- Full width on mobile, half width on medium, third width on large -->
    <div class="ihub-col-12 ihub-col-md-6 ihub-col-lg-4">
      <div class="ihub-card">
        <h3>Card 1</h3>
        <p class="ihub-d-none ihub-d-md-block">
          Additional details visible on medium screens and up.
        </p>
      </div>
    </div>

    <!-- Similar pattern for other columns -->
    <div class="ihub-col-12 ihub-col-md-6 ihub-col-lg-4">
      <!-- Content -->
    </div>

    <!-- This column is hidden on smaller screens -->
    <div class="ihub-d-none ihub-d-lg-block ihub-col-lg-4">
      <div class="ihub-card">
        <h3>Supplementary Information</h3>
        <p>Only shown on large screens to avoid overwhelming mobile users.</p>
      </div>
    </div>
  </div>
</div>
```

## Troubleshooting

### Display Properties Not Working

If display properties aren't applying as expected:

1. Check for specificity issues (other CSS rules might be overriding your utilities)
2. Verify the breakpoint is correct for your target device
3. Check for typos in class names

### Print Display Issues

When print styles aren't working correctly:

1. Test with the browser's print preview functionality
2. Ensure print stylesheets are loading correctly
3. Be aware that some browsers have limitations in print rendering

### Accessibility Concerns

When using display and visibility utilities:

1. Test with screen readers to ensure hidden content is appropriately handled
2. Use `ihub-sr-only` rather than `ihub-d-none` for content that should be available to screen readers
3. Ensure color contrast meets accessibility standards when elements are visible

## Browser Compatibility

The InstinctHub Display Utility classes are compatible with all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)
- iOS Safari
- Android Browser

For Internet Explorer 11, some limitations apply to flex and grid display properties.
