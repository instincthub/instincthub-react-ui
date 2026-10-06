import { describe, it, expect } from "vitest";
import { pageLocalData } from "../utils/localPaging";

type Row = { id: number; name: string; meta: { score: number } };

const rows: Row[] = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: `Row ${i + 1}`,
  meta: { score: (i * 7) % 23 },
}));

describe("pageLocalData", () => {
  it("slices the requested page and reports pagination for all rows", () => {
    const result = pageLocalData(rows, { page: 3, limit: 10 });
    expect(result.data.map((r) => r.id)).toEqual([21, 22, 23]);
    expect(result.pagination).toEqual({
      totalCount: 23,
      currentPage: 3,
      perPage: 10,
      totalPages: 3,
    });
  });

  it("reports a single empty page for no rows", () => {
    const result = pageLocalData([], { page: 1, limit: 10 });
    expect(result.data).toEqual([]);
    expect(result.pagination?.totalPages).toBe(1);
    expect(result.pagination?.totalCount).toBe(0);
  });

  it("filters by a case-insensitive search across nested values", () => {
    const result = pageLocalData(rows, { page: 1, limit: 10, search: "row 2" });
    // "Row 2", "Row 20" .. "Row 23"
    expect(result.data.map((r) => r.id)).toEqual([2, 20, 21, 22, 23]);
    expect(result.pagination?.totalCount).toBe(5);
  });

  it("sorts by a dotted accessor in either direction", () => {
    const asc = pageLocalData(rows, {
      page: 1,
      limit: 3,
      sort: "meta.score",
      direction: "asc",
    });
    expect(asc.data.map((r) => r.meta.score)).toEqual([0, 1, 2]);
    const desc = pageLocalData(rows, {
      page: 1,
      limit: 3,
      sort: "meta.score",
      direction: "desc",
    });
    expect(desc.data.map((r) => r.meta.score)).toEqual([22, 21, 20]);
  });

  it("does not mutate the source rows", () => {
    const before = rows.map((r) => r.id);
    pageLocalData(rows, { page: 1, limit: 5, sort: "name", direction: "desc" });
    expect(rows.map((r) => r.id)).toEqual(before);
  });
});
