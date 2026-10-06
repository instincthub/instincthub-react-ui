/**
 * Behaviour of the shared table pager: next/prev, last page by number,
 * five-page jumps through the gaps, typing a page number, and hiding the
 * navigation (but not the summary) when there is a single page.
 */
import React from "react";
import { act } from "react";
import { createRoot, Root } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import TablePagination from "../TablePagination";

(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

const render = (
  props: Partial<React.ComponentProps<typeof TablePagination>> = {}
) => {
  const onPageChange = vi.fn();
  const onRowsPerPageChange = vi.fn();
  act(() => {
    root.render(
      <TablePagination
        currentPage={1}
        totalPages={20}
        totalCount={195}
        perPage={10}
        rowsPerPageOptions={[10, 25, 50]}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        {...props}
      />
    );
  });
  return { onPageChange, onRowsPerPageChange };
};

const byLabel = (label: string) =>
  container.querySelector<HTMLButtonElement>(`[aria-label="${label}"]`);

const numberButtons = () =>
  Array.from(
    container.querySelectorAll<HTMLButtonElement>(
      ".ihub-pagination-controls .ihub-pagination-button"
    )
  ).filter((b) => /^\d+$/.test(b.textContent ?? ""));

describe("TablePagination", () => {
  it("moves to the next and previous page", () => {
    const { onPageChange } = render({ currentPage: 5 });
    act(() => byLabel("Next page")!.click());
    expect(onPageChange).toHaveBeenLastCalledWith(6);
    act(() => byLabel("Previous page")!.click());
    expect(onPageChange).toHaveBeenLastCalledWith(4);
  });

  it("disables first/previous on page one and next/last on the last page", () => {
    render({ currentPage: 1 });
    expect(byLabel("First page")!.disabled).toBe(true);
    expect(byLabel("Previous page")!.disabled).toBe(true);
    expect(byLabel("Next page")!.disabled).toBe(false);
    render({ currentPage: 20 });
    expect(byLabel("Next page")!.disabled).toBe(true);
    expect(byLabel("Last page")!.disabled).toBe(true);
  });

  it("always offers the last page as a number", () => {
    const { onPageChange } = render({ currentPage: 1 });
    const last = numberButtons().find((b) => b.textContent === "20");
    expect(last).toBeTruthy();
    act(() => last!.click());
    expect(onPageChange).toHaveBeenLastCalledWith(20);
  });

  it("jumps five pages back and forward through the gaps", () => {
    const { onPageChange } = render({ currentPage: 10 });
    act(() => byLabel("Forward 5 pages")!.click());
    expect(onPageChange).toHaveBeenLastCalledWith(15);
    act(() => byLabel("Back 5 pages")!.click());
    expect(onPageChange).toHaveBeenLastCalledWith(5);
  });

  it("offers no gap button where a five-page jump would overshoot", () => {
    render({ currentPage: 18 });
    expect(byLabel("Forward 5 pages")).toBeNull();
    expect(byLabel("Back 5 pages")).toBeTruthy();
    render({ currentPage: 3 });
    expect(byLabel("Back 5 pages")).toBeNull();
    expect(byLabel("Forward 5 pages")).toBeTruthy();
  });

  it("goes to a typed page number and ignores out-of-range input", () => {
    const { onPageChange } = render();
    const input = container.querySelector<HTMLInputElement>(
      ".ihub-pagination-goto input"
    )!;
    const form = container.querySelector<HTMLFormElement>(
      ".ihub-pagination-goto"
    )!;
    const setValue = (value: string) => {
      const setter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value"
      )!.set!;
      setter.call(input, value);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    };

    act(() => setValue("4"));
    act(() => {
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });
    expect(onPageChange).toHaveBeenLastCalledWith(4);
    expect(input.value).toBe("");

    act(() => setValue("99"));
    act(() => {
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });
    expect(onPageChange).toHaveBeenLastCalledWith(20);

    onPageChange.mockClear();
    act(() => setValue("abc"));
    act(() => {
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("marks the current page with aria-current", () => {
    render({ currentPage: 7 });
    const active = numberButtons().filter(
      (b) => b.getAttribute("aria-current") === "page"
    );
    expect(active.map((b) => b.textContent)).toEqual(["7"]);
  });

  it("hides the page navigation but keeps the summary for a single page", () => {
    render({ currentPage: 1, totalPages: 1, totalCount: 6 });
    expect(container.querySelector(".ihub-pagination-controls")).toBeNull();
    expect(container.querySelector(".ihub-pagination-goto")).toBeNull();
    expect(
      container.querySelector(".ihub-pagination-info")?.textContent
    ).toContain("Showing 1 to 6 of 6 entries");
    expect(container.querySelector(".ihub-rows-select")).toBeTruthy();
  });

  it("renders nothing when there are no rows", () => {
    render({ currentPage: 1, totalPages: 0, totalCount: 0 });
    expect(container.querySelector(".ihub-table-pagination")).toBeNull();
  });

  it("disables everything while loading", () => {
    render({ currentPage: 5, loading: true });
    expect(byLabel("Next page")!.disabled).toBe(true);
    expect(numberButtons().every((b) => b.disabled)).toBe(true);
    expect(
      container.querySelector<HTMLInputElement>(".ihub-pagination-goto input")!
        .disabled
    ).toBe(true);
  });
});
