"use client";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import {
  ApiResponseType,
  SearchParamsType,
  TableColumnType,
  TableExportOptionsType,
} from "@/types";
import { debounce } from "lodash";
import { ServerPaginationInfoType, FetchParamsType } from "@/types";
import { API_HOST_URL, getNestedValue, reqOptions } from "../../lib";
import { openToast } from "../../lib/modals/modals";
import {
  exportTableData,
  resolveExportOptions,
  TableExportFormatType,
} from "./utils/tableExport";
import {
  PersistedTableStateType,
  buildTableStateKey,
  clearTableState,
  pickPersistedParams,
  readTableState,
  resolveRestoredParams,
  resolveRestoredRowKey,
  writeTableState,
} from "./utils/tableState";
import {
  DEFAULT_TABLE_MIN_HEIGHT,
  resolveScrollMaxHeight,
} from "./utils/tableLayout";

// Ref type for exposing table methods
export interface IHubTableServerRef {
  refresh: () => void;
  /** Forget the remembered page/sort/search for this table and go back to page 1. */
  resetState: () => void;
  /**
   * Mark a row (by its `keyExtractor` value) as the one the user is leaving
   * for, so it is highlighted and focused when they come back. Row clicks do
   * this automatically; call it from action menus that navigate away.
   */
  rememberRow: (rowKey: string | number) => void;
}

interface IHubTableServerPropsType<T> {
  /** Token for authentication */
  token?: string | null;

  // Core data
  columns: TableColumnType<T>[];

  /** Default data to display before API fetch completes. Items should have an `id` field. */
  defaultData?: T[];

  // API and fetching
  endpointPath: string;
  initialParams?: Partial<FetchParamsType>;
  
  /** External search parameters that trigger table refetch when changed */
  searchParams?: SearchParamsType;

  // Custom data mapping (for non-standard APIs)
  dataAdapter?: (apiResponse: any) => ApiResponseType<T>;

  // Rendering customization
  title?: string;
  emptyStateMessage?: string;
  emptyStateIcon?: React.ReactNode;
  actions?: React.ReactNode;

  // Features
  showSearch?: boolean;
  searchPlaceholder?: string;
  searchDebounceMs?: number;
  enableSorting?: boolean;
  enableExport?: boolean;
  exportOptions?: TableExportOptionsType;

  // Options
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;

  // Callbacks
  onRowClick?: (row: T) => void;
  onFetchError?: (error: any) => void;

  // Row expansion
  expandable?: boolean;
  renderExpandedRow?: (row: T) => React.ReactNode;

  // Key extraction
  keyExtractor?: (row: T) => string | number;

  // UI customization
  stickyHeader?: boolean;
  maxHeight?: string;
  /**
   * Floor for `maxHeight`, so a viewport-relative value such as
   * `calc(100vh - 340px)` cannot collapse the table to a couple of rows on a
   * short screen. Defaults to `"360px"`. Pass `"0"` to disable the floor.
   * Ignored when `maxHeight` is not set.
   */
  minHeight?: string;
  hideHeaderOnMobile?: boolean;

  // Row numbering
  showRowNumbers?: boolean;
  rowNumberStartFrom?: number;

  // State persistence
  /**
   * Remember page, rows per page, sort and search in `sessionStorage` and
   * restore them when the table mounts again in the same tab, e.g. after
   * navigating to a detail page and back. Defaults to `true`.
   */
  persistState?: boolean;
  /**
   * Identifier for the persisted state. Defaults to the current pathname plus
   * `endpointPath`, which is unique for the usual one-table-per-page layout.
   * Set it when two tables on one page read the same endpoint, or when the
   * same table should share its state across several routes.
   */
  persistKey?: string;
}

/**
 * Server-side table component for InstinctHub applications
 * Handles API requests, pagination, sorting, and filtering on the server
 *
 * @example
 * ```tsx
 * // Basic usage
 * <IHubTableServer
 *   columns={columns}
 *   endpointPath={"/api/program-courses"}
 *   initialParams={{ sort: "title", direction: "asc" }}
 *   searchParams={{ category: "active", status: "published" }}
 *   title="Program Courses"
 *   showSearch={true}
 *   enableSorting={true}
 *   onRowClick={handleRowClick}
 *   expandable={true}
 *   renderExpandedRow={renderExpandedRow}
 *   keyExtractor={keyExtractor}
 *   stickyHeader={true}
 *   maxHeight="600px"
 *   hideHeaderOnMobile={true}
 *   showRowNumbers={true}
 *   rowNumberStartFrom={1}
 *   token={process.env.NEXT_PUBLIC_TOKEN}
 *   dataAdapter={dataAdapter}
 *   rowsPerPageOptions={[10, 25, 50, 100]}
 *   defaultRowsPerPage={10}
 *   onFetchError={handleFetchError}
 * />
 *
 * // With refresh control from parent
 * const tableRef = useRef<IHubTableServerRef>(null);
 *
 * const handleExternalRefresh = () => {
 *   tableRef.current?.refresh();
 * };
 *
 * <IHubTableServer
 *   ref={tableRef}
 *   columns={columns}
 *   endpointPath={"/api/program-courses"}
 *   // ... other props
 * />
 * ```
 * @prop {string} token - The token for authentication
 * @prop {TableColumnType<T>[]} columns - The columns of the table
 * @prop {T[]} defaultData - The default data to display before API fetch completes
 * @prop {string} endpointPath - The path to the API endpoint
 * @prop {Partial<FetchParamsType>} initialParams - The initial parameters for the API request
 * @prop {Record<string, any>} searchParams - External search parameters that trigger table refetch when changed
 * @prop {string} title - The title of the table
 * @prop {boolean} showSearch - Whether to show the search input
 * @prop {boolean} enableSorting - Whether to enable sorting
 * @prop {boolean} enableExport - Whether to enable export
 * @prop {TableExportOptionsType} exportOptions - Export settings: which buttons to
 *   show (csv/excel/pdf), fileName, allFields (export the whole record), batchSize
 *   and maxRows. Exports cover every page matching the current filters.
 * @prop {number[]} rowsPerPageOptions - The options for the rows per page
 * @prop {number} defaultRowsPerPage - The default rows per page
 * @prop {Function} onRowClick - The callback for the row click
 * @prop {Function} onFetchError - The callback for the fetch error
 * @prop {boolean} expandable - Whether to enable row expansion
 * @prop {Function} renderExpandedRow - The callback for the expanded row
 * @prop {Function} keyExtractor - The callback for the key extraction
 * @prop {boolean} stickyHeader - Whether to enable sticky header
 * @prop {string} maxHeight - The maximum height of the table
 * @prop {string} minHeight - Floor applied to `maxHeight` so short viewports still
 *   show a usable table (defaults to "360px"; pass "0" to disable)
 * @prop {boolean} hideHeaderOnMobile - Whether to hide the header on mobile
 * @prop {boolean} showRowNumbers - Whether to show row numbers for each record
 * @prop {number} rowNumberStartFrom - The starting number for row numbering (defaults to 1)
 * @prop {boolean} persistState - Remember page, rows per page, sort and search in
 *   sessionStorage and restore them on the next mount in the same tab (defaults to true)
 * @prop {string} persistKey - Identifier for the persisted state (defaults to
 *   pathname + endpointPath). Set it when two tables on one page share an endpoint.
 *
 * @link https://github.com/instincthub/instincthub-react-ui/blob/main/src/__examples__/src/components/ui/TableServerExamples.tsx
 */
// Generic forwardRef wrapper to preserve type inference for consumers
interface IHubTableServerComponent {
  <T extends object>(
    props: IHubTableServerPropsType<T> & { ref?: React.Ref<IHubTableServerRef> }
  ): React.ReactElement | null;
  displayName?: string;
}

export const IHubTableServer = forwardRef<
  IHubTableServerRef,
  IHubTableServerPropsType<any>
>(function IHubTableServerComponent<T extends object>(
  {
    token,
    columns,
    defaultData,
    endpointPath,
    initialParams = {},
    searchParams,
    dataAdapter,
    title,
    emptyStateMessage = "No data available",
    emptyStateIcon = <InventoryOutlinedIcon />,
    actions,
    showSearch = true,
    searchPlaceholder = "Search...",
    searchDebounceMs = 1000,
    enableSorting = true,
    enableExport = false,
    exportOptions = { csv: true },
    rowsPerPageOptions = [10, 25, 50, 100],
    defaultRowsPerPage = 10,
    onRowClick,
    onFetchError,
    expandable = false,
    renderExpandedRow,
    keyExtractor = (row) => JSON.stringify(row),
    stickyHeader = false,
    maxHeight,
    minHeight = DEFAULT_TABLE_MIN_HEIGHT,
    hideHeaderOnMobile = false,
    showRowNumbers = false,
    rowNumberStartFrom = 1,
    persistState = true,
    persistKey,
  }: IHubTableServerPropsType<T>,
  ref: any
) {
  // Refs
  const initialRenderRef = useRef(true);
  const tableRef = useRef<HTMLDivElement>(null);

  // Callback props are held in refs so that a new function identity on the
  // consumer's side (inline arrow functions are the documented usage) can never
  // re-trigger the fetch effect. Without this, any parent re-render refetches,
  // and an `onFetchError` handler that touches parent state closes the loop.
  const dataAdapterRef = useRef(dataAdapter);
  const onFetchErrorRef = useRef(onFetchError);
  const searchParamsRef = useRef(searchParams);
  const keyExtractorRef = useRef(keyExtractor);

  // Compare `searchParams` by value, not by reference. Consumers pass an object
  // literal, so the identity changes on every parent render. Keys are sorted so
  // that rebuilding the object in a different order is not seen as a change.
  const searchParamsKey = useMemo(() => {
    if (!searchParams) return "";
    const entries = Object.entries(searchParams).sort(([a], [b]) =>
      a < b ? -1 : a > b ? 1 : 0
    );
    return JSON.stringify(entries);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(searchParams)]);

  // Sync the latest props into refs. Done in an effect rather than during
  // render because a render can be discarded (this component adjusts state
  // during render below). Declared before the fetch effect, so it commits
  // first within the same pass.
  useEffect(() => {
    dataAdapterRef.current = dataAdapter;
    onFetchErrorRef.current = onFetchError;
    searchParamsRef.current = searchParams;
    keyExtractorRef.current = keyExtractor;
  });

  // Only the newest request may commit its result.
  const requestIdRef = useRef(0);

  // Data state
  const [data, setData] = useState<T[]>(defaultData || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  /** Set when the server rate-limits us (429). Terminal until the user retries. */
  const [rateLimited, setRateLimited] = useState(false);

  // Pagination state
  const [pagination, setPagination] = useState<ServerPaginationInfoType>({
    totalCount: 0,
    currentPage: 1,
    perPage: defaultRowsPerPage,
    totalPages: 0,
  });

  // Persisted state (page, rows per page, sort, search) lives in sessionStorage
  // so that navigating to a detail page and back lands on the same page.
  const storageKey = useMemo(
    () => (persistState ? buildTableStateKey(persistKey, endpointPath) : null),
    [persistState, persistKey, endpointPath]
  );

  // Read once on mount. Lazy so SSR (no window) simply gets null; the client
  // hydration render reads storage itself, and the initial "Loading data..."
  // markup does not depend on params, so there is no hydration mismatch.
  const [storedState] = useState<PersistedTableStateType | null>(() =>
    storageKey ? readTableState(storageKey) : null
  );

  // A stored page is only meaningful for the filter set it was reached with.
  // Consumers often apply their filters (e.g. from the URL) a render after
  // mount, so a record whose filters do not match yet is kept pending and
  // applied the moment the filters catch up. See the render-time block below.
  const pendingRestoreRef = useRef<PersistedTableStateType | null>(
    storedState && storedState.searchParamsKey !== searchParamsKey
      ? storedState
      : null
  );

  // Request params state
  const [params, setParams] = useState<FetchParamsType>(() => ({
    page: 1,
    limit: defaultRowsPerPage,
    ...initialParams,
    ...resolveRestoredParams(storedState, searchParamsKey),
  }));

  // UI state
  const [expandedRows, setExpandedRows] = useState<(string | number)[]>([]);
  const [searchTerm, setSearchTerm] = useState(() => params.search || "");

  // The row the user last opened from this table. Highlighted while it is on
  // screen, and scrolled into view + focused once when restored from storage.
  const [visitedRowKey, setVisitedRowKey] = useState<string | number | null>(
    () => resolveRestoredRowKey(storedState, searchParamsKey)
  );
  const focusVisitedRowRef = useRef<boolean>(visitedRowKey !== null);

  // When the caller's filters change, go back to page 1, unless a pending
  // restore was saved for exactly these filters, in which case resume there.
  // Adjusting state during render (rather than in an effect) keeps this to a
  // single fetch: React re-renders before effects run, so the fetch effect
  // sees the final params.
  const [prevSearchParamsKey, setPrevSearchParamsKey] =
    useState(searchParamsKey);
  if (prevSearchParamsKey !== searchParamsKey) {
    setPrevSearchParamsKey(searchParamsKey);
    setRateLimited(false);
    const pending = pendingRestoreRef.current;
    if (pending && pending.searchParamsKey === searchParamsKey) {
      // If React discards this render the ref is already cleared and the
      // re-render falls through to the page-1 reset below. That only loses
      // the remembered page, so it is an acceptable edge.
      pendingRestoreRef.current = null;
      setParams((prev) => ({ ...prev, ...pending.params }));
      setSearchTerm(pending.params.search || "");
      if (pending.rowKey !== undefined) {
        setVisitedRowKey(pending.rowKey);
        focusVisitedRowRef.current = true;
      }
    } else {
      setParams((prev) => (prev.page === 1 ? prev : { ...prev, page: 1 }));
    }
  }

  // Debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce((term: string) => {
        setParams((prev) => ({
          ...prev,
          search: term,
          page: 1, // Reset to first page on new search
        }));
      }, searchDebounceMs),
    [searchDebounceMs]
  );

  // Drop any pending search so it cannot fire after unmount.
  useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

  const defaultDataLength = (defaultData || []).length;
  const defaultDataObj: ApiResponseType<T> = {
    data: defaultData || [],
    pagination: {
      totalCount: defaultDataLength,
      currentPage: 1,
      perPage: 10,
      totalPages: Math.ceil(defaultDataLength / 10) || 1,
    },
    links: {
      next: null,
      previous: null,
    },
  };

  // Function to fetch data from your API
  const handleFetchData = useCallback(
    async (
      params: FetchParamsType,
      signal?: AbortSignal
    ): Promise<ApiResponseType<T>> => {
      setLoading(true);
      try {
        if (!endpointPath) {
          return defaultDataObj;
        }

        // Prepare API parameters
        const apiParams = new URLSearchParams({
          limit: params.limit.toString(),
          offset: ((params.page - 1) * params.limit).toString(),
        });

        // Add search parameter if provided
        if (params.search) {
          apiParams.append("search", params.search);
        }

        // Add sorting parameter if provided
        if (params.sort) {
          // Convert from sort & direction to API's ordering format
          const prefix = params.direction === "desc" ? "-" : "";
          apiParams.append("ordering", `${prefix}${params.sort}`);
        }

        // Add external search parameters if provided
        const activeSearchParams = searchParamsRef.current;
        if (activeSearchParams) {
          Object.entries(activeSearchParams).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
              apiParams.append(key, String(value));
            }
          });
        }

        const options = reqOptions("GET", null, token);
        const url = `${API_HOST_URL}${endpointPath}?${apiParams.toString()}`;

        // Make API request
        const response = await fetch(url, { ...options, signal });

        // A throttled or proxied error often returns HTML, not JSON. Parsing it
        // first would mask the real status behind a JSON syntax error.
        let result: any = null;
        try {
          result = await response.json();
        } catch {
          result = null;
        }

        if (!response.ok) {
          const message =
            result?.detail ||
            result?.error ||
            (response.status === 429
              ? "Too many requests. Please wait a moment and try again."
              : "Failed to fetch data");
          const fetchError = new Error(message) as Error & { status?: number };
          fetchError.status = response.status;
          throw fetchError;
        }

        // Transform API response to match component's expected format
        return {
          data: result.results,
          pagination: {
            totalCount: result.count,
            currentPage: params.page,
            perPage: params.limit,
            totalPages: Math.ceil(result.count / params.limit),
          },
          links: {
            next: result.next,
            previous: result.previous,
          },
        };
      } catch (error) {
        // An aborted request is a superseded request, not a failure.
        if (!(error instanceof Error && error.name === "AbortError")) {
          console.error("Error fetching table data:", error);
        }
        throw error;
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    // `searchParamsKey` is a value-based key; the object itself is read from a
    // ref so an unstable identity cannot invalidate this callback.
    [token, endpointPath, searchParamsKey]
  );

  // Handle search input change
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      setSearchTerm(term);
      debouncedSearch(term);
    },
    [debouncedSearch]
  );

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setParams((prev) => ({
      ...prev,
      page,
    }));
  }, []);

  // Handle rows per page change
  const handleRowsPerPageChange = useCallback((perPage: number) => {
    setParams((prev) => ({
      ...prev,
      page: 1, // Reset to first page when changing rows per page
      limit: perPage,
    }));
  }, []);

  // Handle sorting
  const handleSort = useCallback(
    (column: TableColumnType<T>) => {
      if (
        !enableSorting ||
        !column.sortable ||
        typeof column.accessor !== "string"
      )
        return;

      const accessor = column.accessor as string;

      setParams((prev) => {
        // If already sorting by this column, toggle direction
        if (prev.sort === accessor) {
          return {
            ...prev,
            direction: prev.direction === "asc" ? "desc" : "asc",
          };
        }

        // Otherwise, sort by this column ascending
        return {
          ...prev,
          sort: accessor,
          direction: "asc",
        };
      });
    },
    [enableSorting]
  );

  // Handle refresh
  const handleRefresh = useCallback(() => {
    // Clearing the latch lets the fetch effect run again after a 429.
    setRateLimited(false);
    // Keep current params but trigger a refetch
    setParams((prev) => ({ ...prev }));
  }, []);

  // Forget the remembered state and start again from page 1.
  const handleResetState = useCallback(() => {
    if (storageKey) clearTableState(storageKey);
    pendingRestoreRef.current = null;
    focusVisitedRowRef.current = false;
    setVisitedRowKey(null);
    setRateLimited(false);
    setSearchTerm(initialParams.search || "");
    setParams({
      page: 1,
      limit: defaultRowsPerPage,
      ...initialParams,
    });
    // `initialParams` is an object literal in the documented usage; comparing
    // it by value keeps this callback stable across parent renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey, defaultRowsPerPage, JSON.stringify(initialParams)]);

  // Expose refresh method to parent components
  const handleRememberRow = useCallback((rowKey: string | number) => {
    setVisitedRowKey(rowKey);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      refresh: handleRefresh,
      resetState: handleResetState,
      rememberRow: handleRememberRow,
    }),
    [handleRefresh, handleResetState, handleRememberRow]
  );

  // Fetch every page the current filters match, up to `maxRows`.
  const fetchAllExportRows = useCallback(
    async (batchSize: number, maxRows: number): Promise<T[]> => {
      const collected: T[] = [];
      let page = 1;
      let totalCount = Infinity;

      while (collected.length < Math.min(totalCount, maxRows)) {
        const response = await handleFetchData({
          ...params,
          page,
          limit: batchSize,
        });

        const adapter = dataAdapterRef.current;
        const adapted = adapter ? adapter(response) : response;
        const pageRows = (adapted?.data as T[]) || [];

        collected.push(...pageRows);

        if (adapted?.pagination?.totalCount !== undefined) {
          totalCount = adapted.pagination.totalCount;
        }

        // Stop when the page isn't full — either the data ran out or the server
        // ignored our limit and returned everything at once.
        if (pageRows.length !== batchSize) break;

        page += 1;
      }

      return collected.slice(0, maxRows);
    },
    [params, handleFetchData]
  );

  // Handle data export
  const handleExport = useCallback(
    async (type: TableExportFormatType) => {
      if (!enableExport) return;

      const options = resolveExportOptions(exportOptions);
      const { batchSize, maxRows } = options;

      try {
        setLoading(true);

        const exportData = await fetchAllExportRows(batchSize, maxRows);

        if (!exportData.length) {
          openToast("There is no data to export.", 400);
          return;
        }

        await exportTableData<T>({
          data: exportData,
          columns,
          format: type,
          fileName: options.fileName,
          title,
          showRowNumbers,
          rowNumberStartFrom,
          fields: options.fields,
          allFields: options.allFields,
        });

        if (exportData.length >= maxRows) {
          openToast(
            `Export capped at ${maxRows} rows. Increase exportOptions.maxRows for more.`,
            400
          );
        }
      } catch (error) {
        console.error("Export error:", error);
        openToast(
          error instanceof Error ? error.message : "Export failed. Try again.",
          400
        );
        if (onFetchError) onFetchError(error);
      } finally {
        setLoading(false);
      }
    },
    [
      columns,
      enableExport,
      exportOptions,
      fetchAllExportRows,
      onFetchError,
      rowNumberStartFrom,
      showRowNumbers,
      title,
    ]
  );

  // Toggle row expansion
  const toggleRowExpansion = useCallback(
    (rowKey: string | number, event: React.MouseEvent) => {
      event.stopPropagation();

      setExpandedRows((prev) => {
        if (prev.includes(rowKey)) {
          return prev.filter((key) => key !== rowKey);
        } else {
          return [...prev, rowKey];
        }
      });
    },
    []
  );

  // Fetch data effect.
  //
  // Deps are deliberately limited to values that genuinely define a request:
  // `params`, and `handleFetchData` (itself keyed on token/endpointPath/
  // searchParamsKey). `dataAdapter` and `onFetchError` are read through refs so
  // that an inline callback — the documented usage — cannot cause a refetch on
  // every parent render, which previously turned any failing request into an
  // unthrottled retry loop against the API host.
  useEffect(() => {
    // A rate-limited table stays put until the user explicitly retries.
    if (rateLimited) return;

    const controller = new AbortController();
    const requestId = ++requestIdRef.current;
    // Only the most recent request may commit, so out-of-order responses from
    // rapid paging or typing cannot overwrite newer data.
    const isCurrent = () =>
      requestId === requestIdRef.current && !controller.signal.aborted;

    const loadData = async () => {
      try {
        const response = await handleFetchData(params, controller.signal);
        if (!isCurrent()) return;

        // Process response based on whether an adapter is provided
        const adapter = dataAdapterRef.current;
        const resolved: ApiResponseType<T> | undefined = adapter
          ? adapter(response)
          : response;
        if (resolved) {
          setData(resolved.data);
          if (resolved.pagination) {
            setPagination(resolved.pagination);
          }
          // The highlighted row only means something while it is on screen.
          // Paging away from it, or deleting it, drops the highlight.
          const extract = keyExtractorRef.current;
          setVisitedRowKey((prev) =>
            prev !== null && !resolved.data.some((row) => extract(row) === prev)
              ? null
              : prev
          );
        }

        // The first commit settles which filters the table is showing; a
        // restore that never matched them is stale from here on.
        pendingRestoreRef.current = null;

        // A remembered page can be past the end once rows are deleted or the
        // filters no longer match. The API answers with an empty page, so
        // clamp to the last real page rather than show "No data".
        const totalPages = resolved?.pagination?.totalPages ?? 0;
        if (totalPages > 0 && params.page > totalPages) {
          setParams((prev) =>
            prev.page > totalPages ? { ...prev, page: totalPages } : prev
          );
        }

        setError(null);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        if (!isCurrent()) return;

        if ((error as { status?: number })?.status === 429) {
          setRateLimited(true);
        }
        setError(error as Error);
        onFetchErrorRef.current?.(error);
      } finally {
        if (isCurrent()) {
          setLoading(false);
          initialRenderRef.current = false;
        }
      }
    };

    loadData();

    return () => {
      // Cancel the in-flight request so superseded fetches stop consuming one of
      // the browser's six connections to the API origin.
      controller.abort();
    };
  }, [params, handleFetchData, rateLimited]);

  // Remember the current state for the next mount. Written on every change so
  // the record is fresh whenever the user leaves the page.
  useEffect(() => {
    if (!storageKey) return;
    writeTableState(storageKey, {
      params: pickPersistedParams(params),
      searchParamsKey,
      savedAt: Date.now(),
      ...(visitedRowKey !== null ? { rowKey: visitedRowKey } : {}),
    });
  }, [storageKey, params, searchParamsKey, visitedRowKey]);

  // Bring the restored row into view and give it focus, once, after it has
  // rendered. A row highlighted by a click in this session is not scrolled to.
  useEffect(() => {
    if (!focusVisitedRowRef.current || visitedRowKey === null) return;
    const rowEl = tableRef.current?.querySelector<HTMLTableRowElement>(
      "tr[data-ihub-row-visited]"
    );
    if (!rowEl) return;
    focusVisitedRowRef.current = false;
    rowEl.scrollIntoView({ block: "center" });
    rowEl.focus({ preventScroll: true });
  }, [data, visitedRowKey]);

  // NOTE: there is deliberately no effect watching `searchParams`. The refetch
  // is driven by `handleFetchData` (keyed on `searchParamsKey`) in the effect
  // above; the page reset happens during render, below.

  const scrollMaxHeight = resolveScrollMaxHeight(maxHeight, minHeight);

  // Loading state
  if (loading && initialRenderRef.current) {
    return (
      <div className="ihub-data-list-container">
        {title && <h2>{title}</h2>}
        <div className="ihub-loading-state">
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !loading && (data || []).length === 0) {
    return (
      <div className="ihub-data-list-container">
        {title && <h2>{title}</h2>}
        <div className="ihub-error-state">
          <p>{error.message || "Error loading data. Please try again."}</p>
          <button className="ihub-important-btn" onClick={handleRefresh}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ihub-data-list-container" ref={tableRef}>
      {/* Header with title, search, and actions */}
      {(title || actions || showSearch || enableExport) && (
        <div className="ihub-data-list-header ihub-table-header ihub-p-0">
          <div>{title && <h2>{title}</h2>}</div>
          <div className="ihub-table-controls">
            {showSearch && (
              <div className="ihub-table-search">
                <div className="ihub-search-input-wrapper">
                  <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="ihub-search-input"
                  />
                  {loading && (
                    <div className="ihub-search-loading-indicator">
                      <span className="ihub-loading-dot"></span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {enableExport && (
              <div className="ihub-export-buttons">
                {exportOptions.csv && (
                  <button
                    className="ihub-export-button ihub-export-csv"
                    onClick={() => handleExport("csv")}
                    disabled={loading}
                  >
                    <FileDownloadOutlinedIcon />
                    CSV
                  </button>
                )}
                {exportOptions.excel && (
                  <button
                    className="ihub-export-button ihub-export-excel"
                    onClick={() => handleExport("excel")}
                    disabled={loading}
                  >
                    <FileDownloadOutlinedIcon />
                    Excel
                  </button>
                )}
                {exportOptions.pdf && (
                  <button
                    className="ihub-export-button ihub-export-pdf"
                    onClick={() => handleExport("pdf")}
                    disabled={loading}
                  >
                    <FileDownloadOutlinedIcon />
                    PDF
                  </button>
                )}
              </div>
            )}

            <button
              className="ihub-refresh-button"
              onClick={handleRefresh}
              disabled={loading}
            >
              <RefreshOutlinedIcon />
              Refresh
            </button>

            {actions && (
              <div className="ihub-data-controls ihub-mb-0">{actions}</div>
            )}
          </div>
        </div>
      )}

      {/* Loading overlay */}
      {loading && !initialRenderRef.current && (
        <div className="ihub-table-loading-overlay">
          <div className="ihub-loading-spinner"></div>
        </div>
      )}

      {/* Table */}
      <div
        className={`ihub-scroll-container ${
          stickyHeader ? "ihub-sticky-header" : ""
        }`}
        style={
          scrollMaxHeight ? { maxHeight: scrollMaxHeight } : undefined
        }
      >
        <table className="ihub-table ihub-scroll-container">
          <thead className={hideHeaderOnMobile ? "ihub-hide-on-mobile" : ""}>
            <tr>
              {/* Row number column */}
              {showRowNumbers && (
                <th style={{ width: "60px", textAlign: "center" }}>#</th>
              )}

              {/* Expandable row icon column */}
              {expandable && renderExpandedRow && (
                <th style={{ width: "40px" }}></th>
              )}

              {/* Regular columns */}
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`${
                    column.sortable && enableSorting
                      ? "ihub-sortable-column"
                      : ""
                  } ${
                    params.sort === column.accessor
                      ? `ihub-sorted-${params.direction}`
                      : ""
                  }`}
                  style={column.width ? { width: column.width } : undefined}
                  onClick={() =>
                    column.sortable && enableSorting
                      ? handleSort(column)
                      : undefined
                  }
                >
                  <div className="ihub-column-header">
                    <span>{column.header}</span>

                    {/* Sort indicator */}
                    {column.sortable && enableSorting && (
                      <span className="ihub-sort-icon">
                        {params.sort === column.accessor &&
                        params.direction === "asc"
                          ? "▲"
                          : params.sort === column.accessor &&
                            params.direction === "desc"
                          ? "▼"
                          : "⇅"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Empty state */}
          {!loading && (data || []).length === 0 ? (
            ""
          ) : (
            <tbody>
              {data.map((row, rowIndex) => {
                const rowKey = keyExtractor(row);
                const isExpanded = expandedRows.includes(rowKey);

                return (
                  <React.Fragment key={rowKey}>
                    <tr
                      onClick={
                        onRowClick
                          ? () => {
                              setVisitedRowKey(rowKey);
                              onRowClick(row);
                            }
                          : undefined
                      }
                      className={[
                        onRowClick ? "ihub-clickable-row" : "",
                        rowKey === visitedRowKey ? "ihub-row-visited" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      tabIndex={rowKey === visitedRowKey ? -1 : undefined}
                      data-ihub-row-visited={
                        rowKey === visitedRowKey ? "" : undefined
                      }
                      aria-current={
                        rowKey === visitedRowKey ? "true" : undefined
                      }
                    >
                      {/* Row number cell */}
                      {showRowNumbers && (
                        <td style={{ textAlign: "center", fontWeight: "500" }}>
                          {(pagination.currentPage - 1) * pagination.perPage + rowIndex + rowNumberStartFrom}
                        </td>
                      )}

                      {/* Expandable row toggle cell */}
                      {expandable && renderExpandedRow && (
                        <td onClick={(e) => toggleRowExpansion(rowKey, e)}>
                          {isExpanded ? (
                            <ExpandLessOutlinedIcon />
                          ) : (
                            <ExpandMoreOutlinedIcon />
                          )}
                        </td>
                      )}

                      {/* Regular data cells */}
                      {columns.map((column, colIndex) => (
                        <td
                          key={colIndex}
                          data-label={
                            hideHeaderOnMobile ? column.header : undefined
                          }
                        >
                          {column.tooltip &&
                          typeof column.accessor === "string" ? (
                            <div
                              className="ihub-cell-tooltip"
                              data-tooltip={String(
                                getNestedValue(row, column.accessor as string)
                              )}
                            >
                              {column.cell
                                ? column.cell(row)
                                : getNestedValue(
                                    row,
                                    column.accessor as string
                                  )}
                            </div>
                          ) : column.cell ? (
                            column.cell(row)
                          ) : typeof column.accessor === "function" ? (
                            column.accessor(row)
                          ) : (
                            getNestedValue(row, column.accessor as string)
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* Expanded row content */}
                    {expandable && renderExpandedRow && isExpanded && (
                      <tr className="ihub-expanded-row">
                        <td colSpan={
                          (columns || []).length + 
                          1 + // expandable column (since we're inside the expandable condition)
                          (showRowNumbers ? 1 : 0)
                        }>
                          <div className="ihub-row-details">
                            {renderExpandedRow(row)}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          )}
        </table>
        {/* Empty state */}
        {!loading && (data || []).length === 0 ? (
          <div className="ihub-data-list-container">
            {actions && (
              <div className="ihub-data-controls ihub-mb-0">{actions}</div>
            )}
            <div className="ihub-empty-state">
              <div>
                {emptyStateIcon}
                <p>{emptyStateMessage}</p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="ihub-table-pagination">
          <div className="ihub-pagination-info">
            Showing {(pagination.currentPage - 1) * pagination.perPage + 1} to{" "}
            {Math.min(
              pagination.currentPage * pagination.perPage,
              pagination.totalCount
            )}{" "}
            of {pagination.totalCount} entries
          </div>
          <div className="ihub-pagination-controls">
            <button
              className="ihub-pagination-button"
              disabled={pagination.currentPage === 1 || loading}
              onClick={() => handlePageChange(1)}
            >
              «
            </button>
            <button
              className="ihub-pagination-button"
              disabled={pagination.currentPage === 1 || loading}
              onClick={() => handlePageChange(pagination.currentPage - 1)}
            >
              ‹
            </button>

            {Array.from(
              { length: Math.min(5, pagination.totalPages) },
              (_, i) => {
                // Show pages around current page
                let pageNum: number;
                if (pagination.totalPages <= 5) {
                  pageNum = (i + 1) as number;
                } else if (pagination.currentPage <= 3) {
                  pageNum = (i + 1) as number;
                } else if (
                  pagination.currentPage >=
                  pagination.totalPages - 2
                ) {
                  pageNum = (pagination.totalPages - 4 + i) as number;
                } else {
                  pageNum = (pagination.currentPage - 2 + i) as number;
                }

                return (
                  <button
                    key={pageNum}
                    className={`ihub-pagination-button ${
                      pagination.currentPage === pageNum ? "ihub-active" : ""
                    }`}
                    onClick={() => handlePageChange(Number(pageNum))}
                    disabled={loading}
                  >
                    {pageNum}
                  </button>
                );
              }
            )}

            <button
              className="ihub-pagination-button"
              disabled={
                pagination.currentPage === pagination.totalPages || loading
              }
              onClick={() => handlePageChange(pagination.currentPage + 1)}
            >
              ›
            </button>
            <button
              className="ihub-pagination-button"
              disabled={
                pagination.currentPage === pagination.totalPages || loading
              }
              onClick={() => handlePageChange(pagination.totalPages)}
            >
              »
            </button>
          </div>
          <div className="ihub-rows-per-page">
            <span>Rows per page:</span>
            <select
              value={pagination.perPage}
              onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
              className="ihub-rows-select"
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
      )}
    </div>
  );
}) as IHubTableServerComponent;

// Set display name for better debugging
IHubTableServer.displayName = "IHubTableServer";

export default IHubTableServer;
