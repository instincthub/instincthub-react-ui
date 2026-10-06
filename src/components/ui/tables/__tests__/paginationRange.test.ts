import { describe, it, expect } from "vitest";
import {
  getPaginationRange,
  ELLIPSIS_BACK,
  ELLIPSIS_FORWARD,
} from "../utils/paginationRange";

describe("getPaginationRange", () => {
  it("lists every page when there are few of them", () => {
    expect(getPaginationRange(1, 1)).toEqual([1]);
    expect(getPaginationRange(3, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getPaginationRange(4, 9)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("always shows the first and last page with a gap near the start", () => {
    expect(getPaginationRange(1, 20)).toEqual([
      1, 2, 3, 4, 5, 6, 7, ELLIPSIS_FORWARD, 20,
    ]);
    expect(getPaginationRange(4, 20)).toEqual([
      1, 2, 3, 4, 5, 6, 7, ELLIPSIS_FORWARD, 20,
    ]);
  });

  it("keeps two siblings on each side of the current page in the middle", () => {
    expect(getPaginationRange(10, 20)).toEqual([
      1, ELLIPSIS_BACK, 8, 9, 10, 11, 12, ELLIPSIS_FORWARD, 20,
    ]);
  });

  it("shows a gap only at the start when near the end", () => {
    expect(getPaginationRange(20, 20)).toEqual([
      1, ELLIPSIS_BACK, 14, 15, 16, 17, 18, 19, 20,
    ]);
    expect(getPaginationRange(17, 20)).toEqual([
      1, ELLIPSIS_BACK, 14, 15, 16, 17, 18, 19, 20,
    ]);
  });

  it("keeps the item count constant so the pager never shifts width", () => {
    const widths = new Set(
      Array.from({ length: 20 }, (_, i) => getPaginationRange(i + 1, 20).length)
    );
    expect(widths).toEqual(new Set([9]));
  });

  it("returns an empty list for zero pages", () => {
    expect(getPaginationRange(1, 0)).toEqual([]);
  });
});
