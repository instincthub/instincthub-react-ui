# InstinctHub Border Utilities

A comprehensive set of CSS utilities for managing borders in InstinctHub projects.

## Table of Contents

- [Installation](#installation)
- [Basic Border Usage](#basic-border-usage)
- [Border Widths](#border-widths)
- [Border Directions](#border-directions)
- [Border Colors](#border-colors)
- [Border Opacity](#border-opacity)
- [Border Styles](#border-styles)
- [Border Radius](#border-radius)
  - [Corner-Specific Radius](#corner-specific-radius)
- [Responsive Border Utilities](#responsive-border-utilities)
- [Special Border Patterns](#special-border-patterns)
- [State-Based Borders](#state-based-borders)
- [Table Borders](#table-borders)
- [Usage Examples](#usage-examples)

## Installation

Add the `ihub-borders.css` file to your project's CSS directory and include it in your main stylesheet:

```css
@import "path/to/ihub-borders.css";
```

Or link it directly in your HTML:

```html
<link rel="stylesheet" href="path/to/ihub-borders.css" />
```

## Basic Border Usage

Add borders to any element using the `ihub-border` class:

```html
<div class="ihub-border">This element has a standard border</div>
```

Remove all borders with `ihub-border-0`:

```html
<div class="ihub-border-0">This element has no borders</div>
```

## Border Widths

Control border width with these classes:

| Class           | Description      |
| --------------- | ---------------- |
| `ihub-border-1` | 1px border width |
| `ihub-border-2` | 2px border width |
| `ihub-border-3` | 3px border width |
| `ihub-border-4` | 4px border width |
| `ihub-border-5` | 5px border width |

Example:

```html
<div class="ihub-border ihub-border-3">This has a 3px wide border</div>
```

## Border Directions

Apply borders to specific sides of elements:

| Class                | Description        |
| -------------------- | ------------------ |
| `ihub-border-top`    | Top border only    |
| `ihub-border-end`    | Right border only  |
| `ihub-border-bottom` | Bottom border only |
| `ihub-border-start`  | Left border only   |

Remove borders from specific sides:

| Class                  | Description      |
| ---------------------- | ---------------- |
| `ihub-border-top-0`    | No top border    |
| `ihub-border-end-0`    | No right border  |
| `ihub-border-bottom-0` | No bottom border |
| `ihub-border-start-0`  | No left border   |

Example:

```html
<div class="ihub-border ihub-border-top-0">Border on all sides except top</div>
```

## Border Colors

Apply colors using InstinctHub's color system:

| Class                       | Description                                 |
| --------------------------- | ------------------------------------------- |
| `ihub-border-DarkCyan`      | Dark cyan border color                      |
| `ihub-border-TurkishRose`   | Turkish rose border color                   |
| `ihub-border-Gunmetal`      | Gunmetal border color                       |
| `ihub-border-ViridianGreen` | Viridian green border color                 |
| `ihub-border-White`         | White border color                          |
| `ihub-border-Danger`        | Danger (red) border color                   |
| etc.                        | (All InstinctHub color variables available) |

Example:

```html
<div class="ihub-border ihub-border-DarkCyan">Dark cyan border</div>
```

## Border Opacity

Control border opacity:

| Class                     | Description  |
| ------------------------- | ------------ |
| `ihub-border-opacity-10`  | 10% opacity  |
| `ihub-border-opacity-25`  | 25% opacity  |
| `ihub-border-opacity-50`  | 50% opacity  |
| `ihub-border-opacity-75`  | 75% opacity  |
| `ihub-border-opacity-100` | 100% opacity |

Example:

```html
<div class="ihub-border ihub-border-DarkCyan ihub-border-opacity-50">
  Semi-transparent border
</div>
```

## Border Styles

Apply different border styles:

| Class                | Description     |
| -------------------- | --------------- |
| `ihub-border-solid`  | Solid border    |
| `ihub-border-dashed` | Dashed border   |
| `ihub-border-dotted` | Dotted border   |
| `ihub-border-double` | Double border   |
| `ihub-border-none`   | No border style |

Example:

```html
<div class="ihub-border ihub-border-dashed ihub-border-DarkCyan">
  Dashed dark cyan border
</div>
```

## Border Radius

Apply border radius:

| Class                 | Description                       |
| --------------------- | --------------------------------- |
| `ihub-rounded`        | Standard rounded corners (4px)    |
| `ihub-rounded-0`      | No rounded corners                |
| `ihub-rounded-1`      | 2px border radius                 |
| `ihub-rounded-2`      | 4px border radius                 |
| `ihub-rounded-3`      | 6px border radius                 |
| `ihub-rounded-4`      | 8px border radius                 |
| `ihub-rounded-5`      | 10px border radius                |
| `ihub-rounded-circle` | Circular border radius (50%)      |
| `ihub-rounded-pill`   | Pill-shaped border radius (50rem) |

Example:

```html
<div class="ihub-border ihub-rounded-3">Element with 6px rounded corners</div>
```

### Corner-Specific Radius

Apply radius to specific corners:

| Class                       | Description                                 |
| --------------------------- | ------------------------------------------- |
| `ihub-rounded-top`          | Rounds top-left and top-right corners       |
| `ihub-rounded-end`          | Rounds top-right and bottom-right corners   |
| `ihub-rounded-bottom`       | Rounds bottom-right and bottom-left corners |
| `ihub-rounded-start`        | Rounds top-left and bottom-left corners     |
| `ihub-rounded-top-start`    | Rounds only top-left corner                 |
| `ihub-rounded-top-end`      | Rounds only top-right corner                |
| `ihub-rounded-bottom-end`   | Rounds only bottom-right corner             |
| `ihub-rounded-bottom-start` | Rounds only bottom-left corner              |

Example:

```html
<div class="ihub-border ihub-rounded-top">Only top corners are rounded</div>
```

## Responsive Border Utilities

Apply borders at specific breakpoints:

| Breakpoint            | Classes                                      |
| --------------------- | -------------------------------------------- |
| Small (≥576px)        | `ihub-border-sm`, `ihub-border-top-sm`, etc. |
| Medium (≥768px)       | `ihub-border-md`, `ihub-border-top-md`, etc. |
| Large (≥992px)        | `ihub-border-lg`, `ihub-border-top-lg`, etc. |
| Extra Large (≥1200px) | `ihub-border-xl`, `ihub-border-top-xl`, etc. |

Example:

```html
<div class="ihub-border-0 ihub-border-md">
  No border on small screens, visible border on medium and larger screens
</div>
```

## Special Border Patterns

Special border patterns for specific use cases:

| Class                       | Description                                      |
| --------------------------- | ------------------------------------------------ |
| `ihub-border-dashed-bottom` | Dashed bottom border                             |
| `ihub-border-gradient`      | Gradient border using the main gradient variable |
| `ihub-card-border`          | Card-style border with shadow                    |
| `ihub-card-border-hover`    | Card border with hover effect                    |
| `ihub-border-left-accent`   | Left accent border (3px)                         |
| `ihub-border-bottom-thick`  | Thick bottom border (3px)                        |
| `ihub-border-top-accent`    | Top accent border (3px)                          |

Example:

```html
<div class="ihub-card-border ihub-card-border-hover">
  Card with border and shadow that enhances on hover
</div>
```

## State-Based Borders

Borders that respond to element states:

| Class                | Description                                   |
| -------------------- | --------------------------------------------- |
| `ihub-focus-border`  | Changes border on focus                       |
| `ihub-active-border` | Changes border when element has .active class |
| `ihub-error-border`  | Red border for error states                   |

Example:

```html
<input type="text" class="ihub-border ihub-focus-border" />

<div class="ihub-border ihub-active-border active">
  This div has an active state border
</div>

<input type="text" class="ihub-border ihub-error-border" />
```

## Table Borders

Border styles for tables:

| Class                   | Description                      |
| ----------------------- | -------------------------------- |
| `ihub-table-bordered`   | Adds borders to tables and cells |
| `ihub-table-borderless` | Removes borders from table cells |

Example:

```html
<table class="ihub-table-bordered">
  <!-- Table content -->
</table>

<table class="ihub-table-borderless">
  <!-- Table content -->
</table>
```

## Usage Examples

### Card with Custom Border

```html
<div
  class="ihub-border ihub-border-DarkCyan ihub-rounded-3 ihub-card-border-hover"
>
  <div class="ihub-p-4">
    <h3>Card Title</h3>
    <p>Card content goes here...</p>
  </div>
</div>
```

### Form Input with Focus State

```html
<input
  type="text"
  class="ihub-border ihub-rounded-2 ihub-focus-border"
  placeholder="Enter text"
/>
```

### Content Section with Accent Border

```html
<section class="ihub-border-top-accent ihub-p-4">
  <h2>Section Title</h2>
  <p>Section content goes here...</p>
</section>
```

### Responsive Border Example

```html
<div class="ihub-border-0 ihub-border-top-md ihub-border-DarkCyan ihub-py-4">
  <p>This content has a top border only on medium screens and above</p>
</div>
```

### Bordered Table Example

```html
<table class="ihub-table-bordered ihub-rounded-2">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td>john@example.com</td>
      <td class="ihub-border-left-accent">Active</td>
    </tr>
  </tbody>
</table>
```
