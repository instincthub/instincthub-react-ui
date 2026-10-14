import { RefObject, useEffect, useRef } from "react";

/**
 * Brings the current page's row into view when the page changes: a click, a
 * route change, or the first render after a reload deep in a long menu. It
 * waits until the groups and sections above the row have opened, which is
 * why it also re-runs on `signals`.
 *
 * It never moves the list for anything else. Opening or closing a group or
 * section while scrolled away from the current page used to centre that
 * page's row, which threw the user back to the top of the menu.
 */
export const useRevealActiveRow = (
  box: RefObject<HTMLElement | null>,
  activeId: string | null,
  signals: unknown[]
) => {
  const pending = useRef(false);
  const lastId = useRef<string | null>(null);

  useEffect(() => {
    if (activeId !== lastId.current) {
      lastId.current = activeId;
      pending.current = activeId !== null;
    }
    if (!pending.current) return;

    const frame = window.requestAnimationFrame(() => {
      const list = box.current;
      const row = list?.querySelector<HTMLElement>('[aria-current="page"]');
      // The row renders once its ancestors are open; try again on the next
      // signal until it exists.
      if (!list || !row) return;
      pending.current = false;

      const rowRect = row.getBoundingClientRect();
      const boxRect = list.getBoundingClientRect();
      const above = rowRect.top < boxRect.top;
      const below = rowRect.bottom > boxRect.bottom;
      if (!above && !below) return;

      const hidden = rowRect.bottom <= boxRect.top || rowRect.top >= boxRect.bottom;
      // A row the user can already partly see nudges in; one out of sight
      // lands in the middle.
      row.scrollIntoView({ block: hidden ? "center" : "nearest" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeId, ...signals]); // eslint-disable-line react-hooks/exhaustive-deps
};
