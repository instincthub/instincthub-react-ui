"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  KeyboardEvent,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { DropdownOptionType, DropdownPropsType } from "@/types";

/**
 * A dropdown component that allows users to select one or multiple options
 * @example
 * ```tsx
 * const options = [
 *  {
 *    value: "js",
 *    label: "JavaScript",
 *    icon: <CodeOutlinedIcon />,
 *    description: "Popular",
 *  },
 *  {
 *    value: "py",
 *    label: "Python",
 *    icon: <CodeOutlinedIcon />,
 *    description: "Popular",
 *  }
 * ]
 * <Dropdown
 *  label="Dropdown"
 *  name="dropdown"
 *  key_name="id"
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
 * @prop {string} key_name - The key name of the dropdown (description, name key, etc)
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
 *
 * The menu is rendered through a portal on `document.body` at fixed
 * coordinates taken from the trigger. An absolutely positioned menu is clipped
 * by any ancestor with `overflow: auto|hidden` — a table's scroll container, a
 * modal body, a card — which made the component unusable in exactly the places
 * a compact picker is most wanted.
 *
 * Those fixed coordinates go stale whenever anything scrolls, so the menu is
 * re-anchored to its trigger on scroll and resize. It is not closed: a scroll
 * listener bound in the capture phase also receives the menu's OWN options
 * list scrolling, which made a list long enough to need scrolling impossible
 * to use, and closing on an unrelated modal scroll is jarring rather than
 * helpful. It closes only once the trigger has actually left the viewport.
 */

/** Gap in px between the trigger and the portalled menu. */
const MENU_OFFSET = 5;

/** Keep the menu this far from the viewport edges. */
const VIEWPORT_MARGIN = 8;

/** Never squeeze the menu below this; it scrolls internally instead. */
const MIN_USABLE_HEIGHT = 120;

const Dropdown: React.FC<DropdownPropsType> = ({
  label,
  name,
  key_name,
  required,
  options,
  selectedValue: externalSelectedValue,
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
  const [internalSelectedValue, setInternalSelectedValue] = useState<
    string | number | (string | number)[] | undefined
  >(externalSelectedValue);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
    width: number;
    maxHeight: number;
  }>({ top: 0, left: 0, width: 0, maxHeight });

  // Sync internal state with external prop
  useEffect(() => {
    setInternalSelectedValue(externalSelectedValue);
  }, [externalSelectedValue]);

  /**
   * Places the portalled menu under the trigger, flipping above it when there
   * is not enough room below, and capping it to the space that side actually
   * has so the list is never taller than the viewport.
   *
   * Returns false when the trigger has scrolled out of view — there is nothing
   * left to pin the menu to, and the caller closes it.
   */
  const positionMenu = useCallback((): boolean => {
    const rect = dropdownRef.current?.getBoundingClientRect();
    if (!rect) return false;

    // Out of view on either axis — a table scrolls sideways too.
    if (
      rect.bottom < 0 ||
      rect.top > window.innerHeight ||
      rect.right < 0 ||
      rect.left > window.innerWidth
    ) {
      return false;
    }

    const spaceBelow =
      window.innerHeight - rect.bottom - MENU_OFFSET - VIEWPORT_MARGIN;
    const spaceAbove = rect.top - MENU_OFFSET - VIEWPORT_MARGIN;

    // Prefer below; flip only when below cannot show a usable amount and above
    // is genuinely roomier.
    const openUpwards =
      spaceBelow < Math.min(maxHeight, MIN_USABLE_HEIGHT) &&
      spaceAbove > spaceBelow;

    const available = Math.max(
      MIN_USABLE_HEIGHT,
      openUpwards ? spaceAbove : spaceBelow
    );
    const height = Math.min(maxHeight, available);

    setMenuPosition({
      top: openUpwards
        ? Math.max(VIEWPORT_MARGIN, rect.top - height - MENU_OFFSET)
        : rect.bottom + MENU_OFFSET,
      left: rect.left,
      width: rect.width,
      maxHeight: height,
    });
    return true;
  }, [maxHeight]);

  useLayoutEffect(() => {
    if (isOpen) positionMenu();
  }, [isOpen, positionMenu]);

  // Selecting in multi mode adds a tag to the trigger, which can grow it onto
  // another line and shift everything below. Re-anchor so the menu does not
  // end up overlapping the trigger it belongs to.
  useLayoutEffect(() => {
    if (isOpen) positionMenu();
  }, [internalSelectedValue, isOpen, positionMenu]);

  // Close on an outside click, and on anything that invalidates the fixed
  // coordinates. The menu lives outside dropdownRef now, so it needs its own
  // containment check or selecting an option would close before it registers.
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (
        !dropdownRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    /**
     * A scroll outside the menu moves the trigger, so the menu follows it. A
     * scroll INSIDE the menu is the user reading the options and must be left
     * alone — capture phase means this handler sees that one too. Capture is
     * still required: a scroll container between the trigger and <body> never
     * bubbles its scroll event to window.
     */
    const handleScroll = (event: Event) => {
      // A scroll event's target is `document` for the page and an element for
      // a scroll container, but `window` for one dispatched at window — and
      // Node.contains() throws on a non-Node, which would strand the menu.
      const target = event.target;
      if (target instanceof Node && menuRef.current?.contains(target)) return;
      if (!positionMenu()) setIsOpen(false);
    };

    const handleResize = () => {
      if (!positionMenu()) setIsOpen(false);
    };

    // The menu is portalled, so it can hold focus outside the trigger's
    // subtree where the wrapper's own onKeyDown never fires.
    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, positionMenu]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && isSearchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, isSearchable]);

  // Filter options based on search term.
  //
  // `key_name` belongs in the dependency list: without it, changing which
  // field is displayed while a search term is active kept filtering against
  // the previous field, so the list could sit on "no options" for a term that
  // matches perfectly well under the new one.
  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    const term = searchTerm.toLowerCase();

    return options.filter((option) => {
      const field = key_name
        ? option[key_name as keyof DropdownOptionType]
        : option?.label;

      // `DropdownOptionType` is indexed as `any`, so `key_name` can name a
      // number — `key_name="id"`, as the example above uses — or a React node
      // like `icon`. Calling toLowerCase() on those threw and tore the whole
      // menu down mid-keystroke. Numbers are stringified so they stay
      // searchable; anything else has no text to match.
      if (typeof field === "number") return String(field).includes(term);
      if (typeof field !== "string") return false;
      return field.toLowerCase().includes(term);
    });
  }, [options, searchTerm, key_name]);

  // Handle dropdown toggle
  const toggleDropdown = () => {
    if (isDisabled) return;
    setSearchTerm("");
    if (isOpen) {
      setIsOpen(false);
      return;
    }
    // Only open once we know where to put it, so an off-screen trigger cannot
    // drop the menu in the top-left corner.
    if (positionMenu()) setIsOpen(true);
  };

  // Handle option selection
  const handleSelect = (option: DropdownOptionType) => {
    if (option.disabled) return;

    if (isMulti) {
      // For multi-select
      const currentValues = Array.isArray(internalSelectedValue)
        ? internalSelectedValue
        : [];
      const valueExists = currentValues.includes(option.value);

      if (valueExists) {
        const newValues = currentValues.filter(
          (value) => value !== option.value
        );
        setInternalSelectedValue(newValues);
        onChange?.(newValues);
      } else {
        const newValues = [...currentValues, option.value];
        setInternalSelectedValue(newValues);
        onChange?.(newValues);
      }
    } else {
      // For single-select
      setInternalSelectedValue(option.value);
      onChange?.(option.value);
      setIsOpen(false);
    }
  };

  // Remove a selected item (for multi-select)
  const removeItem = (value: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (Array.isArray(internalSelectedValue)) {
      const newValues = internalSelectedValue.filter((item) => item !== value);
      setInternalSelectedValue(newValues);
      onChange?.(newValues);
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
    if (!internalSelectedValue) return [];

    if (Array.isArray(internalSelectedValue)) {
      return options.filter((option) =>
        internalSelectedValue.includes(option.value)
      );
    }

    return options.filter((option) => option.value === internalSelectedValue);
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
                    {key_name
                      ? option[key_name as keyof DropdownOptionType]
                      : option?.label}
                    <button
                      type="button"
                      className="ihub-dropdown-tag-remove"
                      onClick={(e) => removeItem(option.value, e)}
                      aria-label={`Remove ${
                        key_name
                          ? option[key_name as keyof DropdownOptionType]
                          : option?.label
                      }`}
                    >
                      <CloseOutlinedIcon />
                    </button>
                  </div>
                ))}
              </div>
            ) : key_name ? (
              selectedOptions[0][key_name as keyof DropdownOptionType]
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
            type="hidden"
            value={`${internalSelectedValue}`}
            onChange={() => {}}
          />
        ) : (
          ""
        )}
      </div>

      {/* Dropdown menu — portalled so no ancestor's overflow can clip it */}
      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
        <div
          ref={menuRef}
          className="ihub-dropdown-menu ihub-dropdown-menu-portal"
          style={{
            maxHeight: `${menuPosition.maxHeight}px`,
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
            width: `${menuPosition.width}px`,
          }}
          role="listbox"
          aria-multiselectable={isMulti}
          onKeyDown={handleKeyDown}
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
                const isSelected = Array.isArray(internalSelectedValue)
                  ? internalSelectedValue.includes(option.value)
                  : internalSelectedValue === option.value;

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
                    {renderOption
                      ? renderOption(option)
                      : key_name
                      ? option[key_name as keyof DropdownOptionType]
                      : option?.label}
                  </div>
                );
              })
            ) : (
              <div className="ihub-dropdown-no-options">{noOptionsMessage}</div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Dropdown;
