import { FetchParamsType } from "../../../../types";

/**
 * Persisted table state helpers for IHubTableServer.
 *
 * The table remembers where the user was (page, rows per page, sort, search)
 * in `sessionStorage`, so that navigating to a detail page and coming back
 * lands on the same page instead of page 1. Session storage is per tab and
 * is cleared when the tab closes, which matches the "resume where I was"
 * expectation without leaking state across sessions.
 */

export const TABLE_STATE_STORAGE_PREFIX = "ihub-table-state:";

/** The subset of request params that is worth remembering between visits. */
export type PersistedTableParamsType = Pick<
  FetchParamsType,
  "page" | "limit" | "search" | "sort" | "direction"
>;

export interface PersistedTableStateType {
  params: PersistedTableParamsType;
  /**
   * Value-based key of the consumer's `searchParams` at the time of saving.
   * A page number only makes sense for the filter set it was reached with,
   * so `page` and `search` are only restored when this key still matches.
   */
  searchParamsKey: string;
  savedAt: number;
}

const isPositiveInteger = (value: unknown): value is number =>
  typeof value === "number" && Number.isInteger(value) && value > 0;

/**
 * Build the storage key that identifies one table.
 *
 * Tables are identified by the page they live on plus the endpoint they read
 * from. That is enough for the common case (one list per page) without any
 * consumer changes. Two tables on one page reading the same endpoint should
 * pass an explicit `persistKey` to keep their state apart.
 */
export const buildTableStateKey = (
  persistKey: string | undefined,
  endpointPath: string
): string => {
  if (persistKey) return `${TABLE_STATE_STORAGE_PREFIX}${persistKey}`;

  const pathname =
    typeof window !== "undefined" && window.location
      ? window.location.pathname
      : "";
  return `${TABLE_STATE_STORAGE_PREFIX}${pathname}|${endpointPath}`;
};

const getStorage = (): Storage | null => {
  // Storage can be missing (SSR) or throw (blocked cookies, private mode).
  try {
    if (typeof window === "undefined" || !window.sessionStorage) return null;
    return window.sessionStorage;
  } catch {
    return null;
  }
};

/**
 * Validate a raw stored value into a `PersistedTableStateType`, dropping any
 * field that is not the right shape. Returns null when nothing usable is left.
 */
export const parseTableState = (raw: unknown): PersistedTableStateType | null => {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  const rawParams =
    record.params && typeof record.params === "object"
      ? (record.params as Record<string, unknown>)
      : null;
  if (!rawParams) return null;

  const params: PersistedTableParamsType = {
    page: isPositiveInteger(rawParams.page) ? rawParams.page : 1,
    limit: isPositiveInteger(rawParams.limit) ? rawParams.limit : 10,
  };
  if (typeof rawParams.search === "string" && rawParams.search) {
    params.search = rawParams.search;
  }
  if (typeof rawParams.sort === "string" && rawParams.sort) {
    params.sort = rawParams.sort;
  }
  if (rawParams.direction === "asc" || rawParams.direction === "desc") {
    params.direction = rawParams.direction;
  }

  return {
    params,
    searchParamsKey:
      typeof record.searchParamsKey === "string" ? record.searchParamsKey : "",
    savedAt: typeof record.savedAt === "number" ? record.savedAt : 0,
  };
};

/** Read and validate the persisted state for a table. Never throws. */
export const readTableState = (
  storageKey: string
): PersistedTableStateType | null => {
  const storage = getStorage();
  if (!storage) return null;
  try {
    const raw = storage.getItem(storageKey);
    if (!raw) return null;
    return parseTableState(JSON.parse(raw));
  } catch {
    return null;
  }
};

/** Persist the current state for a table. Never throws. */
export const writeTableState = (
  storageKey: string,
  state: PersistedTableStateType
): void => {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.setItem(storageKey, JSON.stringify(state));
  } catch {
    // Quota exceeded or storage blocked: losing the memory is acceptable.
  }
};

/** Remove the persisted state for a table. Never throws. */
export const clearTableState = (storageKey: string): void => {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.removeItem(storageKey);
  } catch {
    // Ignore: nothing to recover from.
  }
};

/** Pick only the fields we persist out of the live request params. */
export const pickPersistedParams = (
  params: FetchParamsType
): PersistedTableParamsType => {
  const picked: PersistedTableParamsType = {
    page: params.page,
    limit: params.limit,
  };
  if (params.search) picked.search = params.search;
  if (params.sort) picked.sort = params.sort;
  if (params.direction) picked.direction = params.direction;
  return picked;
};

/**
 * Work out which persisted fields apply to the current filter set.
 *
 * - Same `searchParamsKey`: everything is restored, the user is looking at the
 *   same list they left.
 * - Different key: only the filter-independent preferences (rows per page and
 *   sort) are restored. The page and search term belonged to another list.
 */
export const resolveRestoredParams = (
  stored: PersistedTableStateType | null,
  currentSearchParamsKey: string
): Partial<PersistedTableParamsType> => {
  if (!stored) return {};
  if (stored.searchParamsKey === currentSearchParamsKey) {
    return { ...stored.params };
  }
  const { limit, sort, direction } = stored.params;
  return {
    limit,
    ...(sort ? { sort } : {}),
    ...(direction ? { direction } : {}),
  };
};
