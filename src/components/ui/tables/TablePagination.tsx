"use client";

import React, { useState } from "react";
import {
  ELLIPSIS_BACK,
  ELLIPSIS_FORWARD,
  getPaginationRange,
  PaginationItem,
} from "./utils/paginationRange";

/** How far the gap buttons move. */
export const PAGE_JUMP_SIZE = 5;

export interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  perPage: number;
  rowsPerPageOptions: number[];
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (perPage: number) => void;
  /** Disables every control while a page is being fetched. */
  loading?: boolean;
  /** Hide the "Go to page" input. Shown by default when there is more than one page. */
  showGoTo?: boolean;
}

const clampPage = (page: number, totalPages: number): number =>
  Math.min(Math.max(1, page), totalPages);

/**
 * Footer pager shared by IHubTable and IHubTableServer.
 *
 * - First / previous / next / last buttons.
 * - Page numbers with the first and last page always visible. Gaps are
 *   buttons that jump five pages in that direction.
 * - A "Go to page" input for typing a page number.
 * - With a single page the navigation is hidden but the row summary and the
 *   rows-per-page selector stay. With no rows nothing is rendered.
 */
export default function TablePagination({
  currentPage,
  totalPages,
  totalCount,
  perPage,
  rowsPerPageOptions,
  onPageChange,
  onRowsPerPageChange,
  loading = false,
  showGoTo = true,
}: TablePaginationProps) {
  const [goToValue, setGoToValue] = useState("");

  if (totalCount <= 0) return null;

  const firstRow = (currentPage - 1) * perPage + 1;
  const lastRow = Math.min(currentPage * perPage, totalCount);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  const goTo = (page: number) => {
    const target = clampPage(page, totalPages);
    if (target !== currentPage) onPageChange(target);
  };

  const handleGoToSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = Number.parseInt(goToValue, 10);
    if (!Number.isFinite(parsed)) return;
    goTo(parsed);
    setGoToValue("");
  };

  const renderItem = (item: PaginationItem) => {
    if (item === ELLIPSIS_BACK || item === ELLIPSIS_FORWARD) {
      const back = item === ELLIPSIS_BACK;
      const label = back
        ? `Back ${PAGE_JUMP_SIZE} pages`
        : `Forward ${PAGE_JUMP_SIZE} pages`;
      return (
        <button
          key={item}
          type="button"
          className="ihub-pagination-button ihub-pagination-jump"
          aria-label={label}
          title={label}
          disabled={loading}
          onClick={() =>
            goTo(currentPage + (back ? -PAGE_JUMP_SIZE : PAGE_JUMP_SIZE))
          }
        >
          <span className="ihub-pagination-jump-dots" aria-hidden="true">
            …
          </span>
          <span className="ihub-pagination-jump-label" aria-hidden="true">
            {back ? `-${PAGE_JUMP_SIZE}` : `+${PAGE_JUMP_SIZE}`}
          </span>
        </button>
      );
    }

    const isCurrent = item === currentPage;
    return (
      <button
        key={item}
        type="button"
        className={`ihub-pagination-button ${isCurrent ? "ihub-active" : ""}`}
        aria-current={isCurrent ? "page" : undefined}
        aria-label={`Page ${item}`}
        disabled={loading}
        onClick={() => goTo(item)}
      >
        {item}
      </button>
    );
  };

  return (
    <div className="ihub-table-pagination">
      <div className="ihub-pagination-info">
        Showing {firstRow} to {lastRow} of {totalCount} entries
      </div>

      {totalPages > 1 && (
        <nav className="ihub-pagination-nav" aria-label="Table pagination">
          <div className="ihub-pagination-controls">
            <button
              type="button"
              className="ihub-pagination-button"
              aria-label="First page"
              title="First page"
              disabled={isFirst || loading}
              onClick={() => goTo(1)}
            >
              «
            </button>
            <button
              type="button"
              className="ihub-pagination-button"
              aria-label="Previous page"
              title="Previous page"
              disabled={isFirst || loading}
              onClick={() => goTo(currentPage - 1)}
            >
              ‹
            </button>

            {getPaginationRange(currentPage, totalPages).map(renderItem)}

            <button
              type="button"
              className="ihub-pagination-button"
              aria-label="Next page"
              title="Next page"
              disabled={isLast || loading}
              onClick={() => goTo(currentPage + 1)}
            >
              ›
            </button>
            <button
              type="button"
              className="ihub-pagination-button"
              aria-label="Last page"
              title="Last page"
              disabled={isLast || loading}
              onClick={() => goTo(totalPages)}
            >
              »
            </button>
          </div>

          {showGoTo && (
            <form className="ihub-pagination-goto" onSubmit={handleGoToSubmit}>
              <label>
                <span>Go to</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={totalPages}
                  placeholder="Page"
                  aria-label={`Go to page, 1 to ${totalPages}`}
                  value={goToValue}
                  disabled={loading}
                  onChange={(e) => setGoToValue(e.target.value)}
                />
              </label>
              <button
                type="submit"
                className="ihub-pagination-button"
                disabled={loading || goToValue === ""}
              >
                Go
              </button>
            </form>
          )}
        </nav>
      )}

      <div className="ihub-rows-per-page">
        <span>Rows per page:</span>
        <select
          value={perPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className="ihub-rows-select"
          aria-label="Rows per page"
          disabled={loading}
        >
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
