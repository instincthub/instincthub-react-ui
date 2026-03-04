"use client";

import { reqOptions } from "../lib";
import { useCallback, useEffect, useRef, useState } from "react";
import { Search, ChevronDown, X, Loader2 } from "lucide-react";

interface DropdownOption {
  id: string;
  label: string;
  [key: string]: any;
}

interface SearchableDropdownProps {
  /** API endpoint URL (search query will be appended as `?search=`) */
  searchUrl: string;
  /** Authentication token for API requests */
  token: string | null;
  /** Form field name for the hidden input */
  name: string;
  /** Display label */
  label?: string;
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Whether this field is required */
  required?: boolean;
  /** Key to use as the display label from the API response */
  labelKey?: string;
  /** Custom formatter for label display. Overrides labelKey when provided. */
  labelFormatter?: (item: any) => string;
  /** Key to use as the value/id from the API response */
  valueKey?: string;
  /** Callback when selection changes */
  onChange?: (
    name: string,
    value: string,
    option: DropdownOption | null
  ) => void;
  /** Pre-selected value (id) */
  selectedValue?: string;
  /** Pre-selected label (for display when value is pre-set) */
  selectedLabel?: string;
  /** Debounce delay in ms */
  debounceMs?: number;
  /** Error message */
  error?: string;
}

/**
 * SearchableDropdown - A generic searchable dropdown that fetches from an API.
 *
 * On open, fetches the initial set of results. A search field with debounce
 * allows filtering. On selection, stores the selected item's ID in a hidden input.
 *
 * @example
 * ```tsx
 * <SearchableDropdown
 *   searchUrl="https://api.example.com/items/"
 *   token="auth-token"
 *   name="item_id"
 *   label="Select Item"
 *   labelKey="title"
 *   valueKey="id"
 *   onChange={(name, value, option) => console.log(name, value, option)}
 * />
 * ```
 */
function SearchableDropdown({
  searchUrl,
  token,
  name,
  label = "Select",
  placeholder = "Search...",
  required = false,
  labelKey = "label",
  labelFormatter,
  valueKey = "id",
  onChange,
  selectedValue = "",
  selectedLabel = "",
  debounceMs = 400,
  error,
}: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptions] = useState<DropdownOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentValue, setCurrentValue] = useState(selectedValue);
  const [currentLabel, setCurrentLabel] = useState(selectedLabel);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch results from the API
  const fetchResults = useCallback(
    (query: string) => {
      setIsLoading(true);
      const separator = searchUrl.includes("?") ? "&" : "?";
      const url = `${searchUrl}${separator}search=${encodeURIComponent(query)}`;
      const reqOpts = reqOptions("GET", null, token);

      fetch(url, reqOpts)
        .then((res) => res.json())
        .then((data) => {
          const results = data.results || data || [];
          const mapped: DropdownOption[] = results.map((item: any) => ({
            ...item,
            id: String(item[valueKey]),
            label: labelFormatter
              ? labelFormatter(item)
              : String(item[labelKey]),
          }));
          setOptions(mapped);
        })
        .catch(() => {
          setOptions([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [searchUrl, token, valueKey, labelKey, labelFormatter]
  );

  // Fetch initial results when dropdown opens
  useEffect(() => {
    if (isOpen) {
      fetchResults(searchTerm);
      // Focus search input when opened
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (!isOpen) return;

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      fetchResults(searchTerm);
    }, debounceMs);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, debounceMs]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync external selectedValue changes
  useEffect(() => {
    setCurrentValue(selectedValue);
    setCurrentLabel(selectedLabel);
  }, [selectedValue, selectedLabel]);

  const handleSelect = (option: DropdownOption) => {
    setCurrentValue(option.id);
    setCurrentLabel(option.label);
    setIsOpen(false);
    setSearchTerm("");
    onChange?.(name, option.id, option);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentValue("");
    setCurrentLabel("");
    setSearchTerm("");
    onChange?.(name, "", null);
  };

  return (
    <div className="searchable-dropdown" ref={containerRef}>
      {label && (
        <label className="searchable-dropdown__label">
          {label}
          {required && <span className="searchable-dropdown__required">*</span>}
        </label>
      )}

      <input type="hidden" name={name} value={currentValue} />

      <div
        className={`searchable-dropdown__trigger ${isOpen ? "searchable-dropdown__trigger--open" : ""} ${error ? "searchable-dropdown__trigger--error" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={
            currentLabel
              ? "searchable-dropdown__value"
              : "searchable-dropdown__placeholder"
          }
        >
          {currentLabel || placeholder}
        </span>
        <span className="searchable-dropdown__icons">
          {currentValue && (
            <X
              size={16}
              className="searchable-dropdown__clear"
              onClick={handleClear}
            />
          )}
          <ChevronDown
            size={18}
            className={`searchable-dropdown__chevron ${isOpen ? "searchable-dropdown__chevron--open" : ""}`}
          />
        </span>
      </div>

      {error && <span className="searchable-dropdown__error">{error}</span>}

      {isOpen && (
        <div className="searchable-dropdown__menu">
          <div className="searchable-dropdown__search-wrapper">
            <Search size={16} className="searchable-dropdown__search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              className="searchable-dropdown__search-input"
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
            {isLoading && (
              <Loader2
                size={16}
                className="searchable-dropdown__spinner"
              />
            )}
          </div>

          <ul className="searchable-dropdown__options">
            {!isLoading && options.length === 0 && (
              <li className="searchable-dropdown__empty">No results found</li>
            )}
            {options.map((option) => (
              <li
                key={option.id}
                className={`searchable-dropdown__option ${option.id === currentValue ? "searchable-dropdown__option--selected" : ""}`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchableDropdown;
