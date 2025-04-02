# elementIsVisibleInViewport

A utility function that determines whether an HTML element is visible within the browser's viewport.

## Parameters

- `el: HTMLElement` - The DOM element to check
- `partiallyVisible: boolean = false` - When true, checks if the element is at least partially visible; when false (default), checks if it's completely visible

## Returns

- `boolean` - True if the element is visible according to the specified criteria

## Usage

```typescript
import elementIsVisibleInViewport from './elementIsVisibleInViewport';

// Check if an element is fully visible
const element = document.querySelector('.my-element') as HTMLElement;
if (elementIsVisibleInViewport(element)) {
  console.log('Element is fully visible in viewport');
}

// Check if an element is at least partially visible
if (elementIsVisibleInViewport(element, true)) {
  console.log('Element is at least partially visible in viewport');
}

// Use with IntersectionObserver for better performance
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log('Element is visible');
        // Do something when element becomes visible
      }
    });
  },
  { threshold: 0.1 } // Trigger when at least 10% of element is visible
);

observer.observe(element);
```

## Implementation Details

The function uses `getBoundingClientRect()` to obtain the element's position relative to the viewport, then compares these coordinates with the viewport dimensions:

- For full visibility: the element must be completely within the viewport bounds
- For partial visibility: at least some part of the element must be within the viewport bounds

## Performance Note

While this function is simple and effective, consider using the `IntersectionObserver` API for performance-critical applications as it's more efficient for tracking element visibility.