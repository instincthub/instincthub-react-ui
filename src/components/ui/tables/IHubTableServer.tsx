"use client";
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import { ApiResponseType, DataResponseType, TableColumnType } from "@/types";
import { debounce } from "lodash";
import { ServerPaginationInfoType, FetchParamsType } from "@/types";
import { API_HOST_URL, getNestedValue, reqOptions } from "../../lib";

// Ref type for exposing table methods
export interface IHubTableServerRef {
  refresh: () => void;
}

interface IHubTableServerPropsType<T> {
  /** Token for authentication */
  token?: string | null;

  // Core data
  columns: TableColumnType<T>[];

  defaultData?: any[];

  // API and fetching
  endpointPath: string;
  initialParams?: Partial<FetchParamsType>;

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
  exportOptions?: {
    csv?: boolean;
    excel?: boolean;
    pdf?: boolean;
    fileName?: string;
  };

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
  hideHeaderOnMobile?: boolean;
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
 * @prop {any<T>[]} defaultData - The default data of the table
 * @prop {string} endpointPath - The path to the API endpoint
 * @prop {Partial<FetchParamsType>} initialParams - The initial parameters for the API request
 * @prop {string} title - The title of the table
 * @prop {boolean} showSearch - Whether to show the search input
 * @prop {boolean} enableSorting - Whether to enable sorting
 * @prop {boolean} enableExport - Whether to enable export
 * @prop {Object} exportOptions - The options for the export
 * @prop {number[]} rowsPerPageOptions - The options for the rows per page
 * @prop {number} defaultRowsPerPage - The default rows per page
 * @prop {Function} onRowClick - The callback for the row click
 * @prop {Function} onFetchError - The callback for the fetch error
 * @prop {boolean} expandable - Whether to enable row expansion
 * @prop {Function} renderExpandedRow - The callback for the expanded row
 * @prop {Function} keyExtractor - The callback for the key extraction
 * @prop {boolean} stickyHeader - Whether to enable sticky header
 * @prop {string} maxHeight - The maximum height of the table
 * @prop {boolean} hideHeaderOnMobile - Whether to hide the header on mobile
 *
 * @link https://github.com/instincthub/instincthub-react-ui/blob/main/src/__examples__/src/components/ui/TableServerExamples.tsx
 */
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
    hideHeaderOnMobile = false,
  }: IHubTableServerPropsType<T>,
  ref: any
) {
  // Refs
  const initialRenderRef = useRef(true);
  const tableRef = useRef<HTMLDivElement>(null);

  // Data state
  const [data, setData] = useState<T[]>(defaultData || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Pagination state
  const [pagination, setPagination] = useState<ServerPaginationInfoType>({
    totalCount: 0,
    currentPage: 1,
    perPage: defaultRowsPerPage,
    totalPages: 0,
  });

  // Request params state
  const [params, setParams] = useState<FetchParamsType>({
    page: 1,
    limit: defaultRowsPerPage,
    ...initialParams,
  });

  // UI state
  const [expandedRows, setExpandedRows] = useState<(string | number)[]>([]);
  const [searchTerm, setSearchTerm] = useState(initialParams.search || "");

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setParams((prev) => ({
        ...prev,
        search: term,
        page: 1, // Reset to first page on new search
      }));
    }, searchDebounceMs),
    []
  );

  const defaultDataObj = {
    data: defaultData || [],
    pagination: {
      totalCount: (defaultData || [])?.length,
      currentPage: "",
      perPage: 10,
      totalPages: Math.ceil(((defaultData || [])?.length || 10) / 10),
    },
    links: {
      next: "",
      previous: "",
    },
  } as any;

  // Function to fetch data from your API
  const handleFetchData = useCallback(
    async (
      params: FetchParamsType
    ): Promise<ApiResponseType<DataResponseType>> => {
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

        const options = reqOptions("GET", null, token);
        const url = `${API_HOST_URL}${endpointPath}?${apiParams.toString()}`;

        // Make API request
        const response = await fetch(url, options);
        const result = await response.json();

        // Transform API response to match component's expected format
        return {
          data: result.results,
          pagination: {
            totalCount: result.count,
            currentPage: Math.floor(
              parseInt(new URLSearchParams(result.next).get("offset") || "0") /
                params.limit
            ),
            perPage: params.limit,
            totalPages: Math.ceil(result.count / params.limit),
          },
          links: {
            next: result.next,
            previous: result.previous,
          },
        };
      } catch (error) {
        console.error("Error fetching program courses:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
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
    // Keep current params but trigger a refetch
    setParams((prev) => ({ ...prev }));
  }, []);

  // Expose refresh method to parent components
  useImperativeHandle(
    ref,
    () => ({
      refresh: handleRefresh,
    }),
    [handleRefresh]
  );

  // Handle data export
  const handleExport = useCallback(
    async (type: "csv" | "excel" | "pdf") => {
      if (!enableExport) return;

      try {
        // Fetch all data for export (without pagination)
        setLoading(true);
        const exportParams: FetchParamsType = {
          ...params,
          page: 1,
          limit: 1000, // Request more data for export
          export: type,
        };

        const response = await handleFetchData(exportParams);
        if (response) {
          const exportData = dataAdapter
            ? dataAdapter(response).data
            : response.data;

          const fileName = exportOptions.fileName || "table-export";

          // Simple CSV export example
          if (type === "csv") {
            const headers = columns
              .filter((col) => typeof col.accessor === "string")
              .map((col) => col.header);

            const csvData = exportData.map((row: any) =>
              columns
                .filter((col) => typeof col.accessor === "string")
                .map((col) => {
                  const accessor = col.accessor as keyof T;
                  return String(row[accessor] ?? "");
                })
                .join(",")
            );

            const csv = [headers.join(","), ...csvData].join("\n");

            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);

            link.setAttribute("href", url);
            link.setAttribute("download", `${fileName}.csv`);
            link.style.visibility = "hidden";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }
      } catch (error) {
        console.error("Export error:", error);
        if (onFetchError) onFetchError(error);
      } finally {
        setLoading(false);
      }
    },
    [columns, params, enableExport, exportOptions, dataAdapter, onFetchError]
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

  // Fetch data effect
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        const response = await handleFetchData(params);

        // Process response based on whether an adapter is provided
        if (isMounted) {
          if (dataAdapter) {
            const adaptedResponse = dataAdapter(response);
            setData(adaptedResponse.data);
            if (adaptedResponse.pagination) {
              setPagination(adaptedResponse.pagination);
            }
          } else if (response) {
            setData(response.data as T[]);
            if (response.pagination) {
              setPagination(response.pagination);
            }
          }

          setError(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (isMounted) {
          setError(error as Error);
          if (onFetchError) onFetchError(error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          initialRenderRef.current = false;
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [params, dataAdapter, onFetchError]);

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
          <p>Error loading data. Please try again.</p>
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
        style={maxHeight ? { maxHeight } : undefined}
      >
        <table className="ihub-table ihub-scroll-container">
          <thead className={hideHeaderOnMobile ? "ihub-hide-on-mobile" : ""}>
            <tr>
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
                      onClick={() => onRowClick && onRowClick(row)}
                      className={onRowClick ? "ihub-clickable-row" : ""}
                    >
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
                        <td colSpan={(columns || []).length + 1}>
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
});

// Set display name for better debugging
IHubTableServer.displayName = "IHubTableServer";

export default IHubTableServer;
