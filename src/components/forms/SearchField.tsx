"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchFieldProps {
  labels?: string;
  setSearchValues?: (value: string) => void;
  delay?: number;
  className?: string;
  name?: string;
}

/**
 *
 * @example
 * ```tsx
 * <SearchField labels="Search" setSearchValues={setSearchValues} />
 * ```
 * @param labels - Label text for the search field
 * @param setSearchValues - Function to update search values
 * @param delay - Debounce delay for search input
 * @param className - Additional class name
 * @param name - Name attribute for the input field
 * @returns
 */
const SearchField: React.FC<SearchFieldProps> = ({
  labels,
  setSearchValues,
  delay = 400, // Default debounce delay
  className = "",
  name = "search",
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultSearch = searchParams.get("search") || "";

  // Debounce search input for optimization
  const debounceRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleUpdateQueryParam = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      const query = new URLSearchParams(window.location.search);
      query.set("search", value);

      const newUrl =
        window.location.pathname +
        "?" +
        query.toString() +
        window.location.hash;

      router.replace(newUrl);
      setSearchValues && setSearchValues(value);
    }, delay); // 400ms debounce delay
  };

  return (
    <div className={`ihub-search-field event-input ${className}`}>
      <div className="ihub-search-set">
        <div className="ihub-input-div">
          <svg
            className="ihub-search-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 21L16.65 16.65"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <input
            className="ihub-event-input"
            type="text"
            name={name}
            placeholder={`Search ${labels ? labels : "Blog"} ...`}
            onChange={handleUpdateQueryParam}
            defaultValue={defaultSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchField;
