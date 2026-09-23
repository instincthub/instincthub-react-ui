/**
 * Layout helpers for the table scroll container.
 */

/** Floor applied to a consumer-supplied `maxHeight` unless they opt out. */
export const DEFAULT_TABLE_MIN_HEIGHT = "360px";

const DISABLED_MIN_HEIGHT_VALUES = new Set(["", "0", "0px", "none", "auto"]);

/**
 * Resolve the CSS `max-height` for the scroll container.
 *
 * Consumers commonly pass a viewport-relative value such as
 * `calc(100vh - 340px)`. On a short screen that collapses to a few rows with
 * a nested scrollbar, which is what users report as "the table is tiny".
 * Wrapping it in CSS `max()` guarantees the container never drops below
 * `minHeight`; the page scrolls instead.
 *
 * Returns undefined when no `maxHeight` is set, so the table grows freely.
 */
export const resolveScrollMaxHeight = (
  maxHeight: string | undefined,
  minHeight: string | undefined
): string | undefined => {
  if (!maxHeight) return undefined;

  const floor = (minHeight ?? "").trim();
  if (DISABLED_MIN_HEIGHT_VALUES.has(floor)) return maxHeight;

  return `max(${maxHeight}, ${floor})`;
};
