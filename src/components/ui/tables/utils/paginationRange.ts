/**
 * Page-number window for the table pager.
 *
 * Ported from the algorithm behind MUI's `usePagination`: the first and last
 * page are always present, the current page keeps `siblingCount` neighbours on
 * each side, and gaps are marked with ellipsis tokens. The window is padded so
 * the item count is constant for a given page total, which keeps the pager
 * from changing width as the user moves through it.
 */

export const ELLIPSIS_BACK = "ellipsis-back" as const;
export const ELLIPSIS_FORWARD = "ellipsis-forward" as const;

export type PaginationItem =
  | number
  | typeof ELLIPSIS_BACK
  | typeof ELLIPSIS_FORWARD;

/** Pages always shown at each end. */
const BOUNDARY_COUNT = 1;
/** Pages shown on each side of the current page. */
const SIBLING_COUNT = 2;

const range = (start: number, end: number): number[] =>
  start > end
    ? []
    : Array.from({ length: end - start + 1 }, (_, i) => start + i);

export function getPaginationRange(
  currentPage: number,
  totalPages: number
): PaginationItem[] {
  if (!Number.isFinite(totalPages) || totalPages < 1) return [];

  const page = Math.min(Math.max(1, Math.floor(currentPage)), totalPages);

  const startPages = range(1, Math.min(BOUNDARY_COUNT, totalPages));
  const endPages = range(
    Math.max(totalPages - BOUNDARY_COUNT + 1, BOUNDARY_COUNT + 1),
    totalPages
  );

  const siblingsStart = Math.max(
    Math.min(
      page - SIBLING_COUNT,
      // Lower boundary when the page is high
      totalPages - BOUNDARY_COUNT - SIBLING_COUNT * 2 - 1
    ),
    // Greater than startPages
    BOUNDARY_COUNT + 2
  );

  const siblingsEnd = Math.min(
    Math.max(
      page + SIBLING_COUNT,
      // Upper boundary when the page is low
      BOUNDARY_COUNT + SIBLING_COUNT * 2 + 2
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : totalPages - 1
  );

  const beforeSiblings: PaginationItem[] =
    siblingsStart > BOUNDARY_COUNT + 2
      ? [ELLIPSIS_BACK]
      : BOUNDARY_COUNT + 1 < totalPages - BOUNDARY_COUNT
      ? [BOUNDARY_COUNT + 1]
      : [];

  const afterSiblings: PaginationItem[] =
    siblingsEnd < totalPages - BOUNDARY_COUNT - 1
      ? [ELLIPSIS_FORWARD]
      : totalPages - BOUNDARY_COUNT > BOUNDARY_COUNT
      ? [totalPages - BOUNDARY_COUNT]
      : [];

  return [
    ...startPages,
    ...beforeSiblings,
    ...range(siblingsStart, siblingsEnd),
    ...afterSiblings,
    ...endPages,
  ];
}
