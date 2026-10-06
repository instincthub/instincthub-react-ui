/**
 * In-memory paging for `IHubTableServer` when it is given `defaultData` and
 * no `endpointPath`. Mirrors what the API would do: search, sort, then slice,
 * and report pagination for the filtered total. Never mutates the input.
 */
import type { ApiResponseType, FetchParamsType } from "../../../../types";
import { getNestedValue } from "../../../lib/helpFunction";

type LocalPagingParams = Pick<
  FetchParamsType,
  "page" | "limit" | "search" | "sort" | "direction"
>;

const collectText = (value: unknown, out: string[]): void => {
  if (value === null || value === undefined) return;
  if (typeof value === "object") {
    Object.values(value as Record<string, unknown>).forEach((v) =>
      collectText(v, out)
    );
    return;
  }
  out.push(String(value).toLowerCase());
};

const matchesSearch = <T extends object>(row: T, term: string): boolean => {
  const haystack: string[] = [];
  collectText(row, haystack);
  return haystack.some((text) => text.includes(term));
};

const compareValues = (a: unknown, b: unknown): number => {
  if (a === b) return 0;
  if (a === null || a === undefined) return 1;
  if (b === null || b === undefined) return -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), undefined, {
    numeric: true,
    sensitivity: "base",
  });
};

const sortRows = <T extends object>(
  rows: T[],
  sort: string,
  direction: "asc" | "desc"
): T[] => {
  const sign = direction === "desc" ? -1 : 1;
  return [...rows].sort(
    (a, b) =>
      sign * compareValues(getNestedValue(a, sort), getNestedValue(b, sort))
  );
};

export function pageLocalData<T extends object>(
  rows: readonly T[],
  params: LocalPagingParams
): ApiResponseType<T> {
  const limit = Math.max(1, Math.floor(params.limit) || 1);
  const term = params.search?.trim().toLowerCase() ?? "";

  const filtered = term
    ? rows.filter((row) => matchesSearch(row, term))
    : [...rows];
  const sorted = params.sort
    ? sortRows(filtered, params.sort, params.direction ?? "asc")
    : filtered;

  const totalCount = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const currentPage = Math.min(Math.max(1, Math.floor(params.page) || 1), totalPages);
  const start = (currentPage - 1) * limit;

  return {
    data: sorted.slice(start, start + limit),
    pagination: { totalCount, currentPage, perPage: limit, totalPages },
    links: {
      next: currentPage < totalPages ? String(currentPage + 1) : null,
      previous: currentPage > 1 ? String(currentPage - 1) : null,
    },
  };
}
