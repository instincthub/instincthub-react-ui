/**
 * Checks if an element is visible in the viewport
 * @param el - The DOM element to check
 * @param partiallyVisible - Whether to check for partial visibility (default: false)
 * @returns True if the element is visible in the viewport
 */
const elementIsVisibleInViewport = (
  el: HTMLElement,
  partiallyVisible: boolean = false
): boolean => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;

  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

export default elementIsVisibleInViewport;
