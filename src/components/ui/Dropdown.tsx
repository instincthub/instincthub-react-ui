"use client";

import React, {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  useMemo,
} from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { DropdownOptionType, DropdownPropsType } from "@/types";

/**
 * A dropdown component that allows users to select one or multiple options
 * @example
 * ```tsx
 * <Dropdown
 *  label="Dropdown"
 *  options={options}
 *  selectedValue={selectedValue}
 *  onChange={handleChange}
 *  placeholder="Select an option"
 *  className="ihub-dropdown"
 *  isMulti={true}
 *  isSearchable={true}
 *  noOptionsMessage="No options available"
 *  isDisabled={false}
 *  maxHeight={250}
 *  renderOption={renderOption}
 * />
 *
 * @prop {string} label - The label text for the dropdown
 * @prop {string} name - The name attribute for the dropdown
 * @prop {boolean} required - Whether the dropdown is required
 * @prop {DropdownOptionType[]} options - The options to display in the dropdown
 * @prop {string | string[]} selectedValue - The value(s) currently selected in the dropdown
 * @prop {function} onChange - The function to call when the selected value changes
 * @prop {string} placeholder - The placeholder text for the dropdown
 * @prop {string} className - The class name for the dropdown
 * @prop {boolean} isMulti - Whether the dropdown allows multiple selections
 * @prop {boolean} isSearchable - Whether the dropdown allows searching
 * @prop {string} noOptionsMessage - The message to display when there are no options
 * @prop {boolean} isDisabled - Whether the dropdown is disabled
 * @prop {number} maxHeight - The maximum height of the dropdown menu
 * @prop {function} renderOption - The function to render the option label
 */

const Dropdown: React.FC<DropdownPropsType> = ({
  label,
  name,
  required,
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
      className={`ihub-wrapper ihub-dropdown-field ${className} ${
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
          <KeyboardArrowDownOutlinedIcon
            className={isOpen ? "ihub-dropdown-chevron-up" : ""}
          />
        </div>
        {label && (
          <label htmlFor={name} className="ihub-chips-label ihub-text-label">
            {label}
            {required && <span className="ihub-required">*</span>}
          </label>
        )}
        {name ? (
          <input
            name={name}
            className="ihub-ghost"
            defaultValue={`${selectedValue}`}
          />
        ) : (
          ""
        )}
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
