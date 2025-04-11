# InstinctHub Typography System Documentation

## Overview

This documentation covers the InstinctHub typography system, a comprehensive set of CSS utility classes for controlling font sizes, line heights, text alignment, and other typographic attributes. The system follows a consistent naming convention with the `ihub-` prefix and is designed to work seamlessly with the existing InstinctHub CSS framework.

## Table of Contents

- [Installation](#installation)
- [Font Size Classes](#font-size-classes)
  - [Relative Sizes](#relative-sizes)
  - [Absolute Sizes](#absolute-sizes)
  - [Responsive Sizes](#responsive-sizes)
- [Line Height](#line-height)
- [Text Alignment](#text-alignment)
- [Font Weight](#font-weight)
- [Text Decoration](#text-decoration)
- [Text Transformation](#text-transformation)
- [Letter Spacing](#letter-spacing)
- [Text Overflow](#text-overflow)
- [Font Families](#font-families)
- [Text Colors](#text-colors)
- [Usage Examples](#usage-examples)
- [Best Practices](#best-practices)

## Installation

Add the typography CSS to your project by including it in your main CSS file or by linking to it in your HTML:

```html
<link rel="stylesheet" href="/path/to/instincthub-typography.css" />
```

## Font Size Classes

### Relative Sizes

These classes use relative units (rem) based on the root font size:

| Class          | Font Size | Equivalent |
| -------------- | --------- | ---------- |
| `.ihub-fs-xs`  | 0.75rem   | 12px       |
| `.ihub-fs-sm`  | 0.875rem  | 14px       |
| `.ihub-fs-md`  | 1rem      | 16px       |
| `.ihub-fs-lg`  | 1.125rem  | 18px       |
| `.ihub-fs-xl`  | 1.25rem   | 20px       |
| `.ihub-fs-2xl` | 1.5rem    | 24px       |
| `.ihub-fs-3xl` | 1.875rem  | 30px       |
| `.ihub-fs-4xl` | 2.25rem   | 36px       |
| `.ihub-fs-5xl` | 3rem      | 48px       |
| `.ihub-fs-6xl` | 3.75rem   | 60px       |

### Absolute Sizes

For pixel-perfect control:

| Class         | Font Size |
| ------------- | --------- |
| `.ihub-fs-10` | 10px      |
| `.ihub-fs-12` | 12px      |
| `.ihub-fs-14` | 14px      |
| `.ihub-fs-16` | 16px      |
| `.ihub-fs-18` | 18px      |
| `.ihub-fs-20` | 20px      |
| `.ihub-fs-24` | 24px      |
| `.ihub-fs-28` | 28px      |
| `.ihub-fs-32` | 32px      |
| `.ihub-fs-36` | 36px      |
| `.ihub-fs-42` | 42px      |
| `.ihub-fs-48` | 48px      |
| `.ihub-fs-56` | 56px      |
| `.ihub-fs-64` | 64px      |

### Responsive Sizes

These classes apply different font sizes at specific breakpoints:

```html
<p class="ihub-fs-md ihub-fs-lg-xl ihub-fs-xl-2xl">
  This text is 16px on mobile, 20px on large screens, and 24px on extra-large
  screens.
</p>
```

Available breakpoints:

- `sm`: 576px and up
- `md`: 768px and up
- `lg`: 992px and up
- `xl`: 1200px and up

## Line Height

Control the spacing between lines of text:

| Class             | Line Height | Description     |
| ----------------- | ----------- | --------------- |
| `.ihub-lh-1`      | 1           | No extra height |
| `.ihub-lh-sm`     | 1.25        | Tight           |
| `.ihub-lh-md`     | 1.5         | Normal          |
| `.ihub-lh-lg`     | 1.75        | Relaxed         |
| `.ihub-lh-xl`     | 2           | Loose           |
| `.ihub-lh-normal` | normal      | Browser default |

## Text Alignment

Control text alignment with these classes:

| Class                | Alignment |
| -------------------- | --------- |
| `.ihub-text-left`    | Left      |
| `.ihub-text-center`  | Center    |
| `.ihub-text-right`   | Right     |
| `.ihub-text-justify` | Justified |

## Font Weight

Adjust the thickness of the text:

| Class                | Font Weight |
| -------------------- | ----------- |
| `.ihub-fw-light`     | 300         |
| `.ihub-fw-normal`    | 400         |
| `.ihub-fw-medium`    | 500         |
| `.ihub-fw-semibold`  | 600         |
| `.ihub-fw-bold`      | 700         |
| `.ihub-fw-extrabold` | 800         |

## Text Decoration

Add or remove text decorations:

| Class                      | Effect              |
| -------------------------- | ------------------- |
| `.ihub-text-underline`     | Adds underline      |
| `.ihub-text-line-through`  | Adds strikethrough  |
| `.ihub-text-no-decoration` | Removes decorations |

## Text Transformation

Control the capitalization of text:

| Class                    | Effect                             |
| ------------------------ | ---------------------------------- |
| `.ihub-text-lowercase`   | Transforms to lowercase            |
| `.ihub-text-uppercase`   | Transforms to UPPERCASE            |
| `.ihub-text-capitalize`  | Transforms To Capitalize Each Word |
| `.ihub-text-normal-case` | Disables text transformation       |

## Letter Spacing

Control the spacing between characters:

| Class                   | Effect                      |
| ----------------------- | --------------------------- |
| `.ihub-tracking-tight`  | Tighter spacing (-0.025em)  |
| `.ihub-tracking-normal` | Normal spacing (0)          |
| `.ihub-tracking-wide`   | Wider spacing (0.025em)     |
| `.ihub-tracking-wider`  | Even wider spacing (0.05em) |
| `.ihub-tracking-widest` | Widest spacing (0.1em)      |

## Text Overflow

Control how text behaves when it overflows its container:

| Class                 | Effect                        |
| --------------------- | ----------------------------- |
| `.ihub-text-truncate` | Truncates with ellipsis (...) |
| `.ihub-text-break`    | Breaks words to fit container |
| `.ihub-text-nowrap`   | Prevents text from wrapping   |

## Font Families

Apply InstinctHub's brand fonts:

| Class                   | Font Family      |
| ----------------------- | ---------------- |
| `.ihub-font-nunito`     | var(--Nunito)    |
| `.ihub-font-montserrat` | var(--Montserat) |

## Text Colors

Apply brand colors to text:

| Class                       | Color              |
| --------------------------- | ------------------ |
| `.ihub-text-contrast-dark`  | var(--Gunmetal)    |
| `.ihub-text-contrast-light` | var(--White)       |
| `.ihub-text-primary`        | var(--DarkCyan)    |
| `.ihub-text-secondary`      | var(--TurkishRose) |

## Usage Examples

### Basic Typography

```html
<h1 class="ihub-fs-4xl ihub-fw-bold ihub-font-montserrat">Main Heading</h1>
<h2 class="ihub-fs-2xl ihub-fw-semibold ihub-font-montserrat">Subheading</h2>
<p class="ihub-fs-md ihub-lh-md ihub-font-nunito">
  This is a paragraph with normal font size and line height, using the Nunito
  font.
</p>
```

### Responsive Typography

```html
<h1 class="ihub-fs-2xl ihub-fs-md-3xl ihub-fs-lg-4xl ihub-fw-bold">
  Responsive Heading
</h1>
<p class="ihub-fs-sm ihub-fs-md-md ihub-lh-md">
  This text changes size based on screen width.
</p>
```

### Combining Multiple Classes

```html
<div class="ihub-text-center">
  <p
    class="ihub-fs-lg ihub-fw-medium ihub-text-primary ihub-tracking-wide ihub-text-uppercase"
  >
    Important Announcement
  </p>
  <p class="ihub-fs-md ihub-lh-lg">
    This is a centered paragraph with increased line height.
  </p>
</div>
```

### Text Truncation

```html
<div style="width: 200px;">
  <p class="ihub-text-truncate">
    This is a long text that will be truncated when it reaches the container's
    width.
  </p>
</div>
```

## Best Practices

1. **Use Relative Units** (`ihub-fs-md`, etc.) for most content to maintain accessibility and scaling.

2. **Leverage Responsive Classes** to optimize typography across different screen sizes.

3. **Maintain Consistency** by establishing a typography scale for your application's different levels of content.

4. **Combine with Container Widths** - Typography needs to work with layout. Consider line length for readability (45-75 characters per line is ideal).

5. **Respect the Hierarchy** - Use font size, weight, and spacing to establish clear visual hierarchy.

6. **Consider Accessibility** - Ensure sufficient contrast between text and background colors. Don't make font sizes too small.

7. **Use the Smallest Set of Classes** needed to achieve the desired effect, to keep your HTML clean.
