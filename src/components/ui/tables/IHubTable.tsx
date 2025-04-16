"use client";
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import FilterAltOffOutlinedIcon from "@mui/icons-material/FilterAltOffOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import UnfoldLessOutlinedIcon from "@mui/icons-material/UnfoldLessOutlined";
import { TableColumnType } from "@/types";

export interface FilterState {
  [key: string]: string | string[] | null;
}

export interface SortState {
  column: string | null;
  direction: "asc" | "desc";
}

export interface TableProps<T> {
  columns: TableColumnType<T>[];
  data: T[];
  isLoading?: boolean;
  emptyStateMessage?: string;
  emptyStateIcon?: React.ReactNode;
  title?: string;
  showSearch?: boolean;
  pagination?: boolean;
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  actions?: React.ReactNode;
  onRowClick?: (row: T) => void;
  keyExtractor?: (row: T, index: number) => string | number;
  hideHeaderOnMobile?: boolean;
  stickyHeader?: boolean;
  maxHeight?: string;
  sortable?: boolean;
  defaultSortColumn?: keyof T;
  defaultSortDirection?: "asc" | "desc";
  onSort?: (column: keyof T, direction: "asc" | "desc") => void;
  onFilter?: (filters: FilterState) => void;
  selectable?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
  expandable?: boolean;
  renderExpandedRow?: (row: T) => React.ReactNode;
  exportOptions?: {
    csv?: boolean;
    excel?: boolean;
    pdf?: boolean;
    fileName?: string;
  };
  refreshable?: boolean;
  onRefresh?: () => Promise<void>;
}

/**
 * Enhanced reusable table component for InstinctHub applications
 * Supports sorting, filtering, pagination, selection, and row expansion
 * @example
 * ```tsx
 * <IHubTable
 *  columns={columns}
 *  data={data}
 *  isLoading={isLoading}
 *  emptyStateMessage={emptyStateMessage}
 *  emptyStateIcon={emptyStateIcon}
 *  title={title}
 *  showSearch={showSearch}
 *  pagination={pagination}
 *  rowsPerPageOptions={rowsPerPageOptions}
 *  defaultRowsPerPage={defaultRowsPerPage}
 *  actions={actions}
 *  onRowClick={onRowClick}
 *  keyExtractor={keyExtractor}
 *  hideHeaderOnMobile={hideHeaderOnMobile}
 *  stickyHeader={stickyHeader}
 *  maxHeight={maxHeight}
 *  sortable={sortable}
 *  defaultSortColumn={defaultSortColumn}
 *  defaultSortDirection={defaultSortDirection}
 *  onSort={onSort}
 *  onFilter={onFilter}
 *  selectable={selectable}
 *  onSelectionChange={onSelectionChange}
 *  expandable={expandable}
 *  renderExpandedRow={renderExpandedRow}
 *  exportOptions={exportOptions}
 *  refreshable={refreshable}
 *  onRefresh={onRefresh}
 * />
 * ```
 * @prop {TableColumnType<T>[]} columns - The columns to display in the table
 * @prop {T[]} data - The data to display in the table
 * @prop {boolean} isLoading - Whether the table is loading
 * @prop {string} emptyStateMessage - The message to display when the table is empty
 * @prop {React.ReactNode} emptyStateIcon - The icon to display when the table is empty
 * @prop {string} title - The title of the table
 * @prop {boolean} showSearch - Whether to show the search bar
 * @prop {boolean} pagination - Whether to show the pagination
 * @prop {number[]} rowsPerPageOptions - The options for the number of rows per page
 * @prop {number} defaultRowsPerPage - The default number of rows per page
 * @prop {React.ReactNode} actions - The actions to display in the table
 * @prop {function} onRowClick - The function to call when a row is clicked
 * @prop {function} keyExtractor - The function to call to get the key for each row
 * @prop {boolean} hideHeaderOnMobile - Whether to hide the header on mobile
 * @prop {boolean} stickyHeader - Whether to make the header sticky
 * @prop {string} maxHeight - The maximum height of the table
 * @prop {boolean} sortable - Whether to allow sorting
 * @prop {string} defaultSortColumn - The default column to sort by
 * @prop {string} defaultSortDirection - The default direction to sort by
 * @prop {function} onSort - The function to call when a column is sorted
 * @prop {function} onFilter - The function to call when a filter is applied
 * @prop {boolean} selectable - Whether to allow selection
 * @prop {function} onSelectionChange - The function to call when selection changes
 * @prop {boolean} expandable - Whether to allow row expansion
 * @prop {function} renderExpandedRow - The function to call to render the expanded row
 * @prop {object} exportOptions - The options for exporting the table
 * @prop {boolean} refreshable - Whether to allow refreshing the table
 * @prop {function} onRefresh - The function to call when the table is refreshed
 */
export const IHubTable = <T extends object>({
  columns,
  data,
  isLoading = false,
  emptyStateMessage = "No data available",
  emptyStateIcon = <InventoryOutlinedIcon />,
  title,
  showSearch = false,
  pagination = true,
  rowsPerPageOptions = [10, 25, 50],
  defaultRowsPerPage = 10,
  actions,
  onRowClick,
  keyExtractor = (row, index) => index,
  hideHeaderOnMobile = false,
  stickyHeader = false,
  maxHeight,
  sortable = true,
  defaultSortColumn,
  defaultSortDirection = "asc",
  onSort,
  onFilter,
  selectable = false,
  onSelectionChange,
  expandable = false,
  renderExpandedRow,
  exportOptions,
  refreshable = false,
  onRefresh,
}: TableProps<T>): JSX.Element => {
  // Refs
  const tableRef = useRef<HTMLDivElement>(null);
  const initialRenderRef = useRef(true);

  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [sortState, setSortState] = useState<SortState>({
    column: defaultSortColumn as string | null,
    direction: defaultSortDirection,
  });
  const [filters, setFilters] = useState<FilterState>({});
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [expandedRows, setExpandedRows] = useState<(string | number)[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    row: T | null;
  }>({
    visible: false,
    x: 0,
    y: 0,
    row: null,
  });

  // Memoize key extraction to prevent unnecessary re-renders
  const getRowKey = useCallback(
    (row: T, index: number) => {
      return keyExtractor(row, index);
    },
    [keyExtractor]
  );

  // Handle clicking outside filter dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activeFilter &&
        tableRef.current &&
        !tableRef.current.contains(event.target as Node)
      ) {
        setActiveFilter(null);
      }

      if (contextMenu.visible) {
        setContextMenu((prev) => ({ ...prev, visible: false }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeFilter, contextMenu.visible]);

  // Update selection when data changes, but only after the initial render
  useEffect(() => {
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
      return;
    }

    if (data.length === 0) {
      setSelectedRows([]);
    } else if (selectedRows.length > 0) {
      // Keep only selected rows that still exist in data
      const updatedSelection = selectedRows.filter((selected) =>
        data.some(
          (item, index) =>
            getRowKey(item, index) ===
            getRowKey(
              selected,
              // Find the original index for the selected item
              data.findIndex(
                (d) => JSON.stringify(d) === JSON.stringify(selected)
              )
            )
        )
      );

      // Only update if the selection has actually changed
      if (updatedSelection.length !== selectedRows.length) {
        setSelectedRows(updatedSelection);
      }
    }
  }, [data, getRowKey, selectedRows]);

  // Notify parent component when selection changes
  useEffect(() => {
    if (onSelectionChange && !initialRenderRef.current) {
      onSelectionChange(selectedRows);
    }
  }, [selectedRows, onSelectionChange]);

  // Handle sorting
  const handleSort = useCallback(
    (column: TableColumnType<T>) => {
      if (!sortable || !column.sortable || typeof column.accessor !== "string")
        return;

      const accessor = column.accessor as string;

      setSortState((prevState) => {
        if (prevState.column === accessor) {
          // Toggle sort direction
          const newDirection = prevState.direction === "asc" ? "desc" : "asc";

          if (onSort) onSort(accessor as keyof T, newDirection);

          return {
            column: accessor,
            direction: newDirection,
          };
        } else {
          // Sort by new column
          if (onSort) onSort(accessor as keyof T, "asc");

          return {
            column: accessor,
            direction: "asc",
          };
        }
      });
    },
    [sortable, onSort]
  );

  // Handle filtering
  const handleFilterChange = useCallback(
    (column: string, value: string) => {
      setFilters((prev) => {
        const newFilters = {
          ...prev,
          [column]: value.length > 0 ? value : null,
        };

        if (onFilter) {
          onFilter(newFilters);
        }

        return newFilters;
      });
    },
    [onFilter]
  );

  // Handle row selection
  const handleSelectRow = useCallback(
    (row: T, isSelected: boolean, rowIndex: number) => {
      setSelectedRows((prev) => {
        if (isSelected) {
          return [...prev, row];
        } else {
          return prev.filter(
            (r, idx) => getRowKey(r, idx) !== getRowKey(row, rowIndex)
          );
        }
      });
    },
    [getRowKey]
  );

  // Handle select all rows
  const handleSelectAll = useCallback(
    (isSelected: boolean) => {
      if (isSelected) {
        setSelectedRows([...data]);
      } else {
        setSelectedRows([]);
      }
    },
    [data]
  );

  // Check if a row is selected
  const isRowSelected = useCallback(
    (row: T, index: number) => {
      return selectedRows.some(
        (r, idx) => getRowKey(r, idx) === getRowKey(row, index)
      );
    },
    [selectedRows, getRowKey]
  );

  // Handle row expansion
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

  // Handle context menu
  const handleContextMenu = useCallback((e: React.MouseEvent, row: T) => {
    e.preventDefault();

    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      row,
    });
  }, []);

  // Handle data refresh
  const handleRefresh = useCallback(async () => {
    if (onRefresh) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } catch (error) {
        console.error("Error refreshing data:", error);
      } finally {
        setIsRefreshing(false);
      }
    }
  }, [onRefresh]);

  // Handle data export
  const handleExport = useCallback(
    (type: "csv" | "excel" | "pdf") => {
      if (!exportOptions) return;

      const fileName = exportOptions.fileName || "table-export";

      // Simple CSV export example
      if (type === "csv") {
        const headers = columns
          .filter((col) => typeof col.accessor === "string")
          .map((col) => col.header);

        const csvData = data.map((row) =>
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

      // For Excel and PDF, you would typically use libraries like:
      // - xlsx for Excel export
      // - jspdf for PDF export
    },
    [columns, data, exportOptions]
  );

  // Filter data based on search term and column filters
  const filteredData = useMemo(() => {
    let result = data;

    // Apply search filter
    if (searchTerm.trim()) {
      result = result.filter((row) =>
        columns.some((column) => {
          if (typeof column.accessor === "string") {
            const value = row[column.accessor as keyof T];
            return String(value)
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          }
          return false;
        })
      );
    }

    // Apply column filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null) {
        result = result.filter((row) => {
          const cellValue = String((row as any)[key] || "").toLowerCase();
          return cellValue.includes(String(value).toLowerCase());
        });
      }
    });

    return result;
  }, [data, searchTerm, columns, filters]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortState.column) return filteredData;

    return [...filteredData].sort((a, b) => {
      const column = sortState.column as keyof T;
      const aValue = a[column];
      const bValue = b[column];

      if (aValue === bValue) return 0;

      const compareResult = aValue < bValue ? -1 : 1;
      return sortState.direction === "asc" ? compareResult : -compareResult;
    });
  }, [filteredData, sortState.column, sortState.direction]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;

    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, pagination, currentPage, rowsPerPage]);

  // Calculate total pages
  const totalPages = useMemo(
    () => (pagination ? Math.ceil(sortedData.length / rowsPerPage) : 1),
    [sortedData.length, rowsPerPage, pagination]
  );

  // Reset to page 1 when filters or rows per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, rowsPerPage, filters]);

  // Loading state
  if (isLoading || isRefreshing) {
    return (
      <div className="ihub-data-list-container">
        {title && <h2>{title}</h2>}
        <div className="ihub-loading-state">
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!isLoading && (!data || data.length === 0)) {
    return (
      <div className="ihub-data-list-container">
        {title && <h2>{title}</h2>}
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
    );
  }

  return (
    <div className="ihub-data-list-container" ref={tableRef}>
      {/* Header with title and actions */}
      {(title || actions || showSearch || exportOptions || refreshable) && (
        <div className="ihub-data-list-header ihub-table-header ihub-p-0">
          <div>{title && <h2>{title}</h2>}</div>
          <div className="ihub-table-controls">
            {showSearch && (
              <div className="ihub-table-search">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="ihub-search-input"
                />
              </div>
            )}

            {exportOptions && (
              <div className="ihub-export-buttons">
                {exportOptions.csv && (
                  <button
                    className="ihub-export-button ihub-export-csv"
                    onClick={() => handleExport("csv")}
                  >
                    <FileDownloadOutlinedIcon />
                    CSV
                  </button>
                )}
                {exportOptions.excel && (
                  <button
                    className="ihub-export-button ihub-export-excel"
                    onClick={() => handleExport("excel")}
                  >
                    <FileDownloadOutlinedIcon />
                    Excel
                  </button>
                )}
                {exportOptions.pdf && (
                  <button
                    className="ihub-export-button ihub-export-pdf"
                    onClick={() => handleExport("pdf")}
                  >
                    <FileDownloadOutlinedIcon />
                    PDF
                  </button>
                )}
              </div>
            )}

            {refreshable && onRefresh && (
              <button
                className="ihub-export-button"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshOutlinedIcon />
                Refresh
              </button>
            )}

            {actions && (
              <div className="ihub-data-controls ihub-mb-0">{actions}</div>
            )}
          </div>
        </div>
      )}

      {/* Selection Summary */}
      {selectable && selectedRows.length > 0 && (
        <div className="ihub-selection-summary">
          <p>{selectedRows.length} item(s) selected</p>
          <button
            className="ihub-outlined-btn"
            onClick={() => setSelectedRows([])}
          >
            Clear Selection
          </button>
        </div>
      )}

      {/* Table */}
      <div
        className={`ihub-scroll-container ${
          stickyHeader ? "ihub-sticky-header" : ""
        }`}
        style={maxHeight ? { maxHeight } : undefined}
      >
        <table className="ihub-table">
          <thead className={hideHeaderOnMobile ? "ihub-hide-on-mobile" : ""}>
            <tr>
              {/* Selection checkbox column */}
              {selectable && (
                <th className="ihub-checkbox-cell">
                  <div className="ihub-checkbox-header">
                    <input
                      type="checkbox"
                      checked={
                        selectedRows.length === data.length && data.length > 0
                      }
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </div>
                </th>
              )}

              {/* Expandable row icon column */}
              {expandable && renderExpandedRow && (
                <th style={{ width: "40px" }}>
                  <UnfoldLessOutlinedIcon />
                </th>
              )}

              {/* Regular columns */}
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`${
                    column.sortable && sortable ? "ihub-sortable-column" : ""
                  } ${
                    sortState.column === column.accessor
                      ? `ihub-sorted-${sortState.direction}`
                      : ""
                  }`}
                  style={column.width ? { width: column.width } : undefined}
                >
                  <div className="ihub-column-header">
                    <span
                      onClick={() =>
                        column.sortable && sortable
                          ? handleSort(column)
                          : undefined
                      }
                      style={{
                        cursor:
                          column.sortable && sortable ? "pointer" : "default",
                      }}
                    >
                      {column.header}
                    </span>

                    {/* Sort indicator */}
                    {column.sortable && sortable && (
                      <span
                        className="ihub-sort-icon"
                        onClick={() => handleSort(column)}
                      >
                        {sortState.column === column.accessor &&
                        sortState.direction === "asc"
                          ? "▲"
                          : sortState.column === column.accessor &&
                            sortState.direction === "desc"
                          ? "▼"
                          : "⇅"}
                      </span>
                    )}

                    {/* Filter button */}
                    {column.filterable &&
                      typeof column.accessor === "string" && (
                        <div className="ihub-column-filter">
                          <button
                            className="ihub-filter-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveFilter(
                                activeFilter === column.accessor
                                  ? null
                                  : (column.accessor as string)
                              );
                            }}
                          >
                            {filters[column.accessor as string] ? (
                              <FilterAltOffOutlinedIcon />
                            ) : (
                              <FilterAltOutlinedIcon />
                            )}
                          </button>

                          {/* Filter dropdown */}
                          {activeFilter === column.accessor && (
                            <div
                              className="ihub-filter-dropdown"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <label>Filter {column.header}</label>
                              <input
                                type="text"
                                className="ihub-filter-input"
                                value={
                                  (filters[
                                    column.accessor as string
                                  ] as string) || ""
                                }
                                onChange={(e) =>
                                  handleFilterChange(
                                    column.accessor as string,
                                    e.target.value
                                  )
                                }
                                placeholder={`Filter by ${column.header.toLowerCase()}`}
                                autoFocus
                              />
                              <div className="ihub-filter-actions">
                                <button
                                  className="ihub-outlined-btn"
                                  onClick={() => {
                                    handleFilterChange(
                                      column.accessor as string,
                                      ""
                                    );
                                    setActiveFilter(null);
                                  }}
                                >
                                  Clear
                                </button>
                                <button
                                  className="ihub-important-btn"
                                  onClick={() => setActiveFilter(null)}
                                >
                                  Apply
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIndex) => {
              const rowKey = getRowKey(row, rowIndex);
              const isExpanded = expandedRows.includes(rowKey);

              return (
                <React.Fragment key={rowKey}>
                  <tr
                    onClick={() => onRowClick && onRowClick(row)}
                    onContextMenu={(e) => handleContextMenu(e, row)}
                    className={`
                      ${onRowClick ? "ihub-clickable-row" : ""}
                      ${isRowSelected(row, rowIndex) ? "ihub-selected-row" : ""}
                    `}
                  >
                    {/* Selection checkbox cell */}
                    {selectable && (
                      <td
                        className="ihub-checkbox-cell"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={isRowSelected(row, rowIndex)}
                          onChange={(e) =>
                            handleSelectRow(row, e.target.checked, rowIndex)
                          }
                        />
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
                              row[column.accessor as keyof T] ?? ""
                            )}
                          >
                            {column.cell
                              ? column.cell(row)
                              : String(row[column.accessor as keyof T] ?? "")}
                          </div>
                        ) : column.cell ? (
                          column.cell(row)
                        ) : typeof column.accessor === "function" ? (
                          column.accessor(row)
                        ) : (
                          String(row[column.accessor as keyof T] ?? "")
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Expanded row content */}
                  {expandable && renderExpandedRow && isExpanded && (
                    <tr className="ihub-expanded-row">
                      <td colSpan={columns.length + (selectable ? 1 : 0) + 1}>
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
        </table>
      </div>

      {/* Context Menu */}
      {contextMenu.visible && contextMenu.row && (
        <div
          className="ihub-context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <div
            className="ihub-context-menu-item"
            onClick={() => {
              if (contextMenu.row && onRowClick) {
                onRowClick(contextMenu.row);
              }
              setContextMenu((prev) => ({ ...prev, visible: false }));
            }}
          >
            <VisibilityOutlinedIcon />
            View
          </div>
          <div
            className="ihub-context-menu-item"
            onClick={() => {
              // Handle edit action
              setContextMenu((prev) => ({ ...prev, visible: false }));
            }}
          >
            <EditOutlinedIcon />
            Edit
          </div>
          <div className="ihub-context-menu-separator"></div>
          <div
            className="ihub-context-menu-item"
            onClick={() => {
              // Handle delete action
              setContextMenu((prev) => ({ ...prev, visible: false }));
            }}
          >
            <DeleteOutlinedIcon />
            Delete
          </div>
        </div>
      )}

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="ihub-table-pagination">
          <div className="ihub-pagination-info">
            Showing{" "}
            {Math.min((currentPage - 1) * rowsPerPage + 1, sortedData.length)}{" "}
            to {Math.min(currentPage * rowsPerPage, sortedData.length)} of{" "}
            {sortedData.length} entries
          </div>
          <div className="ihub-pagination-controls">
            <button
              className="ihub-pagination-button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
            >
              «
            </button>
            <button
              className="ihub-pagination-button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              ‹
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show pages around current page
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  className={`ihub-pagination-button ${
                    currentPage === pageNum ? "ihub-active" : ""
                  }`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              className="ihub-pagination-button"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
            >
              ›
            </button>
            <button
              className="ihub-pagination-button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
            >
              »
            </button>
          </div>
          <div className="ihub-rows-per-page">
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="ihub-rows-select"
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
};

export default IHubTable;
