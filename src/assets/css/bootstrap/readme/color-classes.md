# InstinctHub Color System Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Color Variables](#color-variables)
3. [Text Color Classes](#text-color-classes)
4. [Background Color Classes](#background-color-classes)
5. [Gradient Classes](#gradient-classes)
6. [Dark Mode System](#dark-mode-system)
    - [Dark Mode Container](#dark-mode-container)
    - [Text in Dark Mode](#text-in-dark-mode)
    - [Backgrounds in Dark Mode](#backgrounds-in-dark-mode)
    - [Border Utilities](#border-utilities)
    - [Shadow Utilities](#shadow-utilities)
    - [Interactive States](#interactive-states)
    - [Form Elements](#form-elements)
    - [Button Styles](#button-styles)
    - [Status Indicators](#status-indicators)
7. [Status Color System](#status-color-system)
    - [Status Message Classes](#status-message-classes)
    - [Status Border Classes](#status-border-classes)
    - [Status Text Classes](#status-text-classes)
    - [Status Background Classes](#status-background-classes)
    - [Status Icon Classes](#status-icon-classes)
    - [Status Button Classes](#status-button-classes)
8. [System Preference Integration](#system-preference-integration)
9. [Best Practices](#best-practices)
10. [Example Usage](#example-usage)

## Introduction

The InstinctHub Color System provides a consistent color palette and styling utilities for use across InstinctHub applications. The system is designed to support both light and dark modes, ensuring accessibility and visual consistency.

## Color Variables

The system relies on CSS variables defined in the root stylesheet:

```css
:root {
  --DarkCyan: #00838f;
  --TurkishRose: #bc658d;
  --Gunmetal: #2c333a;
  --ViridianGreen: #009ba2;
  --White: #ffffff;
  --Danger: #ea5f5e;
  --FadeGlass: #ffffffe6;
  --Rhythm: #69779b;
  --CaribbeanGreen: #00c5a2;
  /* ...and many more */
}
```

These variables should be used through the provided utility classes rather than directly referenced in custom styles whenever possible.

## Text Color Classes

Text color utilities allow you to apply specific colors to text content.

| Class | Description |
|-------|-------------|
| `.ihub-text-DarkCyan` | Sets text color to DarkCyan (`#00838f`) |
| `.ihub-text-TurkishRose` | Sets text color to TurkishRose (`#bc658d`) |
| `.ihub-text-Gunmetal` | Sets text color to Gunmetal (`#2c333a`) |
| `.ihub-text-ViridianGreen` | Sets text color to ViridianGreen (`#009ba2`) |
| `.ihub-text-White` | Sets text color to White (`#ffffff`) |
| `.ihub-text-white` | Sets text color to white (`#ffffff`) in dark and light modes |
| `.ihub-text-Danger` | Sets text color to Danger (`#ea5f5e`) |

Additional text colors are available for all variables in the color system following the same naming pattern.

## Background Color Classes

Background color utilities allow you to apply specific colors to element backgrounds.

| Class | Description |
|-------|-------------|
| `.ihub-bg-DarkCyan` | Sets background color to DarkCyan (`#00838f`) |
| `.ihub-bg-TurkishRose` | Sets background color to TurkishRose (`#bc658d`) |
| `.ihub-bg-Gunmetal` | Sets background color to Gunmetal (`#2c333a`) |
| `.ihub-bg-ViridianGreen` | Sets background color to ViridianGreen (`#009ba2`) |
| `.ihub-bg-White` | Sets background color to White (`#ffffff`) |
| `.ihub-bg-Danger` | Sets background color to Danger (`#ea5f5e`) |
| `.ihub-bg-FadeGlass` | Sets background color to FadeGlass (`#ffffffe6`) |

Additional background colors are available for all variables in the color system following the same naming pattern.

## Gradient Classes

The system provides utilities for applying predefined gradients:

| Class | Description |
|-------|-------------|
| `.ihub-bg-Main-Gradient` | Applies the main gradient (linear-gradient from ViridianGreen to TurkishRose) |
| `.ihub-bg-Dark-Gradient` | Applies the dark gradient (linear-gradient between black tones) |

## Dark Mode System

### Dark Mode Container

To enable dark mode for a section of your application, wrap the content with the `.ihub-dark-mode` class:

```html
<div class="ihub-dark-mode">
  <!-- Content with dark mode styling -->
</div>
```

This class sets default text color to white and background to Gunmetal, and activates all dark mode specific styles for child elements.

### Text in Dark Mode

Dark mode provides text emphasis utilities:

| Class | Description |
|-------|-------------|
| `.ihub-text-dark-emphasis` | High emphasis text (white) |
| `.ihub-text-dark-medium` | Medium emphasis text (80% white) |
| `.ihub-text-dark-muted` | Low emphasis text (60% white) |
| `.ihub-text-dark-disabled` | Disabled text (40% white) |

### Backgrounds in Dark Mode

Dark mode specific background utilities:

| Class | Description |
|-------|-------------|
| `.ihub-bg-dark-elevated` | Slightly lighter than the base dark background, for cards and elevated elements |
| `.ihub-bg-dark-surface` | Base dark background color (Gunmetal) |
| `.ihub-bg-dark-overlay` | Semi-transparent overlay for modals and popovers |

### Border Utilities

Dark mode specific border utilities:

| Class | Description |
|-------|-------------|
| `.ihub-border-dark` | Standard border color for dark mode |
| `.ihub-border-dark-subtle` | Subtle border color for dark mode |

### Shadow Utilities

Dark mode specific shadow utilities:

| Class | Description |
|-------|-------------|
| `.ihub-shadow-dark-sm` | Small shadow for dark mode |
| `.ihub-shadow-dark-md` | Medium shadow for dark mode |
| `.ihub-shadow-dark-lg` | Large shadow for dark mode |

### Interactive States

Dark mode specific hover and focus states:

| Class | Description |
|-------|-------------|
| `.ihub-hover-dark` | Background hover effect for dark mode |
| `.ihub-hover-dark-text` | Text hover effect for dark mode |
| `.ihub-focus-dark` | Focus outline effect for dark mode |

### Form Elements

In dark mode, form elements (inputs, selects, textareas) automatically receive styled backgrounds, text colors, and borders. Placeholder text is also properly styled.

### Button Styles

Button styles in dark mode:

| Class | Description |
|-------|-------------|
| `.ihub-important-btn` | Primary action button (DarkCyan background) |
| `.ihub-outlined-btn` | Secondary action button (transparent with DarkCyan border) |
| `.ihub-default-btn` | Neutral action button (slightly elevated background) |

### Status Indicators

Status indicator classes for dark mode:

| Class | Description |
|-------|-------------|
| `.ihub-status-success` | Success message styling (green text on semi-transparent green background with left border) |
| `.ihub-status-warning` | Warning message styling (yellow text on semi-transparent yellow background with left border) |
| `.ihub-status-danger` | Error message styling (red text on semi-transparent red background with left border) |
| `.ihub-status-error` | Alias for danger/error styling (identical to `.ihub-status-danger`) |
| `.ihub-status-info` | Info message styling (cyan text on semi-transparent cyan background with left border) |
| `.ihub-status-neutral` | Neutral message styling (gunmetal text on semi-transparent background with left border) |

## Status Color System

The InstinctHub Color System includes a comprehensive set of status-related color utilities for different states such as success, warning, danger/error, info, and neutral. These utilities provide consistent styling for status messages, alerts, and feedback across your applications.

### Status Message Classes

These classes provide complete styling for status messages with background, text color, border, and padding:

| Class | Description |
|-------|-------------|
| `.ihub-status-success` | Success message with green styling and left border |
| `.ihub-status-warning` | Warning message with yellow/amber styling and left border |
| `.ihub-status-danger` | Danger/error message with red styling and left border |
| `.ihub-status-error` | Alias for danger message (identical to `.ihub-status-danger`) |
| `.ihub-status-info` | Informational message with cyan styling and left border |
| `.ihub-status-neutral` | Neutral message with gunmetal styling and left border |

Each status message class includes:
- Semi-transparent background in the appropriate color
- Matching text color
- 3px left border in the solid color
- 12px vertical and 16px horizontal padding
- 4px border radius

### Status Border Classes

These classes can be applied to add status-specific border colors to any element:

| Class | Description |
|-------|-------------|
| `.ihub-border-success` | Sets border color to CaribbeanGreen |
| `.ihub-border-warning` | Sets border color to Corn (yellow) |
| `.ihub-border-danger` | Sets border color to Danger (red) |
| `.ihub-border-error` | Alias for danger border (identical to `.ihub-border-danger`) |
| `.ihub-border-info` | Sets border color to DarkCyan |
| `.ihub-border-neutral` | Sets border color to Gunmetal |

### Status Text Classes

These classes can be applied to text elements to indicate status:

| Class | Description |
|-------|-------------|
| `.ihub-text-success` | Sets text color to CaribbeanGreen |
| `.ihub-text-warning` | Sets text color to a darker shade of Corn for better readability |
| `.ihub-text-danger` | Sets text color to Danger (red) |
| `.ihub-text-error` | Alias for danger text (identical to `.ihub-text-danger`) |
| `.ihub-text-info` | Sets text color to DarkCyan |
| `.ihub-text-neutral` | Sets text color to Gunmetal |

### Status Background Classes

These classes provide subtle background colors without affecting text:

| Class | Description |
|-------|-------------|
| `.ihub-bg-success-subtle` | Sets background to 10% opacity CaribbeanGreen |
| `.ihub-bg-warning-subtle` | Sets background to 10% opacity Corn |
| `.ihub-bg-danger-subtle` | Sets background to 10% opacity Danger |
| `.ihub-bg-error-subtle` | Alias for danger background (identical to `.ihub-bg-danger-subtle`) |
| `.ihub-bg-info-subtle` | Sets background to 10% opacity DarkCyan |
| `.ihub-bg-neutral-subtle` | Sets background to 10% opacity Gunmetal |

### Status Icon Classes

These classes are designed to style icons that accompany status messages:

| Class | Description |
|-------|-------------|
| `.ihub-icon-success` | Sets icon color to CaribbeanGreen and adds right margin |
| `.ihub-icon-warning` | Sets icon color to darker Corn and adds right margin |
| `.ihub-icon-danger` | Sets icon color to Danger and adds right margin |
| `.ihub-icon-error` | Alias for danger icon (identical to `.ihub-icon-danger`) |
| `.ihub-icon-info` | Sets icon color to DarkCyan and adds right margin |
| `.ihub-icon-neutral` | Sets icon color to Gunmetal and adds right margin |

### Status Button Classes

Standard and outline button variants for each status:

| Class | Description |
|-------|-------------|
| `.ihub-btn-success` | Green button for positive actions |
| `.ihub-btn-warning` | Yellow/amber button for cautionary actions |
| `.ihub-btn-danger` | Red button for destructive actions |
| `.ihub-btn-error` | Alias for danger button |
| `.ihub-btn-info` | Cyan button for informational actions |
| `.ihub-btn-neutral` | Gunmetal button for neutral actions |
| `.ihub-btn-outline-success` | Outlined green button |
| `.ihub-btn-outline-warning` | Outlined yellow button |
| `.ihub-btn-outline-danger` | Outlined red button |
| `.ihub-btn-outline-error` | Alias for outlined danger button |
| `.ihub-btn-outline-info` | Outlined cyan button |
| `.ihub-btn-outline-neutral` | Outlined gunmetal button |

All button classes include hover states and appropriate text colors.

## System Preference Integration

The color system can automatically respond to system-level dark mode preferences:

```css
@media (prefers-color-scheme: dark) {
  :root.ihub-auto-dark-mode {
    /* Auto-switches to dark mode when system preference is set to dark */
  }
}
```

To enable this feature, add the `.ihub-auto-dark-mode` class to your root HTML element.

## Best Practices

1. **Use utilities over custom colors**: Use the provided utility classes rather than writing custom color styles.
2. **Consider contrast ratios**: Ensure text has sufficient contrast against backgrounds for accessibility.
3. **Test both modes**: Always test your UI in both light and dark modes.
4. **Use semantic colors**: Choose colors based on their meaning, not just aesthetics (e.g., use Danger for error states).
5. **Combine with spacing utilities**: Use InstinctHub's spacing utilities along with color utilities for consistent layouts.

## Example Usage

### Basic Color Application

```html
<div class="ihub-bg-DarkCyan ihub-p-4">
  <h2 class="ihub-text-White">Welcome to InstinctHub</h2>
  <p class="ihub-text-White ihub-text-dark-medium">Supporting your learning journey</p>
</div>
```

### Dark Mode Implementation

```html
<section class="ihub-dark-mode ihub-p-6">
  <h2 class="ihub-text-dark-emphasis">Dark Mode Content</h2>
  
  <div class="ihub-bg-dark-elevated ihub-p-4 ihub-shadow-dark-md">
    <p class="ihub-text-dark-medium">This card has an elevated background with a shadow.</p>
    
    <div class="ihub-status-info ihub-mt-3">
      This is an informational message in dark mode.
    </div>
    
    <form class="ihub-mt-4">
      <input type="text" placeholder="Input in dark mode" class="ihub-mb-3">
      <button class="ihub-important-btn">Submit</button>
    </form>
  </div>
</section>
```

### Status Colors Example

```html
<div class="ihub-p-4">
  <!-- Status Message Examples -->
  <div class="ihub-status-success ihub-mb-3">
    <span class="ihub-icon-success">✓</span>
    Your profile was updated successfully!
  </div>
  
  <div class="ihub-status-warning ihub-mb-3">
    <span class="ihub-icon-warning">⚠</span>
    Your subscription will expire in 3 days.
  </div>
  
  <div class="ihub-status-danger ihub-mb-3">
    <span class="ihub-icon-danger">✕</span>
    There was an error processing your payment.
  </div>
  
  <div class="ihub-status-info ihub-mb-3">
    <span class="ihub-icon-info">ℹ</span>
    Your course includes free access to premium templates.
  </div>
  
  <div class="ihub-status-neutral ihub-mb-5">
    <span class="ihub-icon-neutral">•</span>
    This note is for informational purposes only.
  </div>
  
  <!-- Status Button Examples -->
  <div class="ihub-mb-5">
    <button class="ihub-btn-success ihub-mr-2">Confirm</button>
    <button class="ihub-btn-warning ihub-mr-2">Caution</button>
    <button class="ihub-btn-danger ihub-mr-2">Delete</button>
    <button class="ihub-btn-info ihub-mr-2">Learn More</button>
    <button class="ihub-btn-neutral">Cancel</button>
  </div>
  
  <!-- Status Button Outline Examples -->
  <div class="ihub-mb-5">
    <button class="ihub-btn-outline-success ihub-mr-2">Confirm</button>
    <button class="ihub-btn-outline-warning ihub-mr-2">Caution</button>
    <button class="ihub-btn-outline-danger ihub-mr-2">Delete</button>
    <button class="ihub-btn-outline-info ihub-mr-2">Learn More</button>
    <button class="ihub-btn-outline-neutral">Cancel</button>
  </div>
  
  <!-- Text and Border Examples -->
  <p class="ihub-text-success ihub-mb-2">This text indicates success</p>
  <p class="ihub-text-danger ihub-mb-4">This text indicates an error</p>
  
  <div class="ihub-p-3 ihub-mb-2" style="border: 1px solid; border-radius: 4px;" class="ihub-border-info">
    This box has an info border
  </div>
</div>
```

### Responsive Dark Mode

```html
<html class="ihub-auto-dark-mode">
  <body>
    <!-- Content will follow system dark mode preference -->
  </body>
</html>
```

By following this documentation, you can implement a consistent color system across your InstinctHub applications, supporting both light and dark modes while maintaining accessibility and visual consistency.