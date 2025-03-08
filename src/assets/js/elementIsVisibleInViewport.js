const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

export default elementIsVisibleInViewport;

// Source: https://www.30secondsofcode.org/js/s/element-is-visible-in-viewport/#:~:text=We%20can%20do%20this%2C%20using,the%20dimensions%20of%20the%20viewport.
