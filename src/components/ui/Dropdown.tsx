"use client";

import React, {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  useMemo,
} from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { DropdownOptionType, DropdownPropsType } from "@/types";

const Dropdown: React.FC<DropdownPropsType> = ({
  options,
  selectedValue,
  onChange,
  placeholder = "Select...",
  className = "",
  isMulti = false,
  isSearchable = false,
  noOptionsMessage = "No options available",
  isDisabled = false,
  maxHeight = 250,
  renderOption,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && isSearchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, isSearchable]);

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;

    return options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  // Handle dropdown toggle
  const toggleDropdown = () => {
    if (!isDisabled) {
      setIsOpen(!isOpen);
      setSearchTerm("");
    }
  };

  // Handle option selection
  const handleSelect = (option: DropdownOptionType) => {
    if (option.disabled) return;

    if (isMulti) {
      // For multi-select
      const currentValues = Array.isArray(selectedValue) ? selectedValue : [];
      const valueExists = currentValues.includes(option.value);

      if (valueExists) {
        onChange(currentValues.filter((value) => value !== option.value));
      } else {
        onChange([...currentValues, option.value]);
      }
    } else {
      // For single-select
      onChange(option.value);
      setIsOpen(false);
    }
  };

  // Remove a selected item (for multi-select)
  const removeItem = (value: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (Array.isArray(selectedValue)) {
      onChange(selectedValue.filter((item) => item !== value));
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (isDisabled) return;

    switch (e.key) {
      case "Enter":
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
      case "ArrowDown":
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case "ArrowUp":
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
    }
  };

  // Find selected option(s) for display
  const getSelectedOptions = () => {
    if (!selectedValue) return [];

    if (Array.isArray(selectedValue)) {
      return options.filter((option) => selectedValue.includes(option.value));
    }

    return options.filter((option) => option.value === selectedValue);
  };

  const selectedOptions = getSelectedOptions();

  return (
    <div
      className={`ihub-dropdown-field ${className} ${
        isDisabled ? "ihub-dropdown-disabled" : ""
      } ${isOpen ? "active" : ""}`}
      ref={dropdownRef}
      tabIndex={isDisabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      aria-expanded={isOpen}
      aria-disabled={isDisabled}
      aria-haspopup="listbox"
      role="combobox"
    >
      {/* Dropdown trigger */}
      <div
        className={`ihub-dropdown-trigger ${
          isOpen ? "ihub-dropdown-open" : ""
        }`}
        onClick={toggleDropdown}
      >
        <div className="ihub-dropdown-value">
          {selectedOptions.length > 0 ? (
            isMulti ? (
              <div className="ihub-dropdown-tags">
                {selectedOptions.map((option) => (
                  <div key={option.value} className="ihub-dropdown-tag">
                    {option.label}
                    <button
                      type="button"
                      className="ihub-dropdown-tag-remove"
                      onClick={(e) => removeItem(option.value, e)}
                      aria-label={`Remove ${option.label}`}
                    >
                      <CloseOutlinedIcon />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              selectedOptions[0].label
            )
          ) : (
            <span className="ihub-dropdown-placeholder">{placeholder}</span>
          )}
        </div>
        <div className="ihub-dropdown-indicator">
          <ChevronRightOutlinedIcon
            className={isOpen ? "ihub-dropdown-chevron-up" : ""}
          />
        </div>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="ihub-dropdown-menu"
          style={{ maxHeight: `${maxHeight}px` }}
          role="listbox"
          aria-multiselectable={isMulti}
        >
          {isSearchable && (
            <div className="ihub-dropdown-search">
              <SearchOutlinedIcon className="ihub-dropdown-search-icon" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                ref={searchInputRef}
                className="ihub-dropdown-search-input"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          <div className="ihub-dropdown-options">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isSelected = Array.isArray(selectedValue)
                  ? selectedValue.includes(option.value)
                  : selectedValue === option.value;

                return (
                  <div
                    key={option.value}
                    className={`ihub-dropdown-option ${
                      isSelected ? "ihub-dropdown-selected" : ""
                    } ${
                      option.disabled ? "ihub-dropdown-disabled-option" : ""
                    }`}
                    onClick={() => handleSelect(option)}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled}
                  >
                    {renderOption ? renderOption(option) : option.label}
                  </div>
                );
              })
            ) : (
              <div className="ihub-dropdown-no-options">{noOptionsMessage}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
