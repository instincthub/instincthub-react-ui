"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { reqOptions, fetchAPI } from "../../lib";
import { PaginationPropsType } from "@/types";
import { useSearchParams } from "next/navigation";



/**
 * Extracts offset value from URL search params
 * @param url URL string containing search parameters
 * @returns Offset value or null if not found
 */
const getOffsetFromUrl = (url: string | null): string | null => {
  if (!url) return null;
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("offset");
  } catch {
    return null;
  }
};

/**
 * Enhanced Pagination Component with API Integration
 * Handles pagination, search, and filtering with automatic API calls
 */
const Pagination: React.FC<PaginationPropsType> = ({
  data,
  limit,
  urlPath,
  setData,
  token = null,
  tabsValues = "",
  searchValues = "",
  rangeLimit = 5,
  className = "",
  showFirstLast = true,
}) => {
  const searchParams = useSearchParams();
  const offset = searchParams.get("offset") || "0";
  const search = searchParams.get("search") || "";
  const [pages, setPages] = useState<number[]>([]);
  const [offsetFrom, setOffsetFrom] = useState<number>(0);
  const [offsetTo, setOffsetTo] = useState<number>(rangeLimit || 5);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Convert offset to page number
  const currentOffset = Number(offset);
  const currentPageIndex = Math.floor(currentOffset / limit);

  // Extract next and previous offsets from API response
  const nextOffset = getOffsetFromUrl(data?.next || "");
  const previousOffset = getOffsetFromUrl(data?.previous || "");

  /**
   * Fetches data from API with current parameters
   * @param searchOffset Optional offset for pagination
   */
  const fetchData = async (searchOffset?: number): Promise<void> => {
    setIsLoading(true);

    try {
      const requestOptions = reqOptions("GET", null, token);
      const offsetParam =
        searchOffset !== undefined ? `&offset=${searchOffset}` : "";
      const searchParam =
        searchValues || search
          ? `&search=${encodeURIComponent(searchValues || search)}`
          : "";
      const tabParam = tabsValues
        ? `&cat=${encodeURIComponent(tabsValues)}`
        : "";

      const url = `${urlPath}?limit=${limit}${offsetParam}${searchParam}${tabParam}`;
      console.log("searchOffset: ", searchOffset, url);

      await fetchAPI(setData, url, requestOptions, true);
    } catch (error) {
      console.error("Pagination fetch error:", error);
    } finally {
      updatePageRange();
      setIsLoading(false);
    }
  };

  /**
   * Updates the visible page range based on current page
   */
  const updatePageRange = (): void => {
    console.log(
      "updatePageRange called with currentPageIndex:",
      currentPageIndex,
      rangeLimit
    );

    if (currentPageIndex + 1 >= rangeLimit) {
      setOffsetFrom(currentPageIndex - 2);
      setOffsetTo(currentPageIndex + 3);
    } else {
      setOffsetFrom(0);
      setOffsetTo(rangeLimit);
    }
  };

  // Effect for handling pagination, search, and tab changes
  useEffect(() => {
    const shouldFetchData =
      currentOffset > 0 || tabsValues || searchValues || search;

    if (shouldFetchData) {
      fetchData(currentOffset);
    } else {
      // Initial load without offset
      fetchData();
    }

    // Generate pages array when count changes
    if (data?.count) {
      const totalPages = Math.ceil(data.count / limit);
      setPages(Array.from({ length: totalPages }, (_, i) => i));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, data?.count, tabsValues, limit]);

  useEffect(() => {
    // When searchValues or search changes, reset offset to 0
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.set("offset", "0");
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${params.toString()}`
      );
    }
  }, [searchValues, search]);

  // Don't render if no pages or loading initial data
  if (!pages.length && !isLoading) {
    return null;
  }

  const totalPages = pages.length;
  const isFirstPage = currentPageIndex === 0;
  const isLastPage = currentPageIndex === totalPages - 1;
  const visiblePages = pages.slice(offsetFrom, offsetTo);

  return (
    <div
      className={`ihub-pagination-container ${className}`}
      role="navigation"
      aria-label="Pagination"
    >
      {isLoading && (
        <div className="ihub-pagination-loading">
          <div className="ihub-loading-spinner" />
          <span>Loading...</span>
        </div>
      )}

      <ul className="ihub-pagination-list">
        {/* First and Previous Navigation */}
        <div className="ihub-pagination-nav-group">
          {showFirstLast && (
            <li
              className={`ihub-pagination-item ${
                isFirstPage ? "ihub-pagination-disabled" : ""
              }`}
            >
              <Link
                href={`?offset=0`}
                className="ihub-pagination-link ihub-pagination-first"
                aria-label="Go to first page"
                tabIndex={isFirstPage ? -1 : 0}
              >
                First
              </Link>
            </li>
          )}

          <li
            className={`ihub-pagination-item ${
              isFirstPage || !data?.previous ? "ihub-pagination-disabled" : ""
            }`}
          >
            <Link
              href={`?offset=${previousOffset || 0}`}
              className="ihub-pagination-link ihub-pagination-previous"
              aria-label="Go to previous page"
              tabIndex={isFirstPage || !data?.previous ? -1 : 0}
            >
              <svg
                width="8"
                height="13"
                viewBox="0 0 8 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M7.66927 1.83333L3.08594 6.41667L7.66927 11L6.7526 12.8333L0.335938 6.41667L6.7526 0L7.66927 1.83333Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </li>
        </div>

        {/* Page Numbers */}
        <div className="ihub-pagination-pages">
          {visiblePages.map((pageIndex) => {
            const isActive = currentPageIndex === pageIndex;
            const pageNumber = pageIndex + 1;

            return (
              <li
                key={pageIndex}
                className={`ihub-pagination-item ${
                  isActive ? "ihub-pagination-active" : ""
                }`}
                data-page={pageNumber}
              >
                <Link
                  href={`?offset=${pageIndex * limit}`}
                  className="ihub-pagination-link ihub-pagination-number"
                  aria-label={`Go to page ${pageNumber}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {pageNumber}
                </Link>
              </li>
            );
          })}
        </div>

        {/* Next and Last Navigation */}
        <div
          className={`ihub-pagination-nav-group ${
            !data?.next ? "ihub-pagination-disabled" : ""
          }`}
        >
          <li
            className={`ihub-pagination-item ${
              isLastPage || !data?.next ? "ihub-pagination-disabled" : ""
            }`}
          >
            <Link
              href={`?offset=${nextOffset || currentOffset}`}
              className="ihub-pagination-link ihub-pagination-next"
              aria-label="Go to next page"
              tabIndex={isLastPage || !data?.next ? -1 : 0}
            >
              <svg
                width="8"
                height="13"
                viewBox="0 0 8 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M0.330731 1.83333L4.91406 6.41667L0.330731 11L1.2474 12.8333L7.66406 6.41667L1.2474 0L0.330731 1.83333Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </li>

          {showFirstLast && (
            <li
              className={`ihub-pagination-item ${
                isLastPage ? "ihub-pagination-disabled" : ""
              }`}
            >
              <Link
                href={`?offset=${(totalPages - 1) * limit}`}
                className="ihub-pagination-link ihub-pagination-last"
                aria-label="Go to last page"
                tabIndex={isLastPage ? -1 : 0}
              >
                Last
              </Link>
            </li>
          )}
        </div>
      </ul>

      {/* Pagination Info */}
      <div className="ihub-pagination-info">
        <span className="ihub-pagination-summary">
          Showing {Math.min(currentOffset + 1, data?.count || 0)} to{" "}
          {Math.min(currentOffset + limit, data?.count || 0)} of{" "}
          {data?.count || 0} results
        </span>
      </div>
    </div>
  );
};
export default Pagination;
