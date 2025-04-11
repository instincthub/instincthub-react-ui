"use client";
import React, { ReactNode, useState, useRef, useEffect } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

/**
 * Interface for dropdown item structure
 */
interface DropdownItem {
  /** React node to render as the dropdown item */
  label?: ReactNode;
  /** Optional icon to display before the label */
  icon?: ReactNode;
  /** Optional callback function when item is clicked */
  onClick?: () => void;
  /** Optional custom class name for the item */
  className?: string;
  /** Optional disabled state */
  disabled?: boolean;
}

/**
 * Props interface for ActionCallbackDropdown component
 */
interface ActionCallbackDropdownProps {
  /** Array of dropdown items to display */
  items: DropdownItem[];
  /** Optional custom icon to replace the default menu icon */
  icon?: ReactNode;
  /** Optional position for the dropdown menu */
  position?: "left" | "right";
  /** Optional additional class name */
  className?: string;
  /** Optional title attribute for accessibility */
  title?: string;
}

/**
 * Dropdown component that displays a list of actionable items with click-to-open functionality
 * and improved keyboard navigation
 *
 * @example
 * ```tsx
 * const items = [
 *  {
 *    label: (
 *      <CopyToClipboard
 *        text={`https://${handle}.${process.env.NEXT_PUBLIC_SKILLS_DOMAIN}/assessments/details/${option.slug}`}
 *        labels="Copy Link"
 *        noLabel={false}
 *      />
 *    ),
 *    },
 *    {
 *      label: (
 *        <div onClick={() => handleDuplicate(option.id)}>
 *          <ControlPointDuplicateOutlined
 *          style={{
 *            position: "relative",
 *            top: "5px",
 *            marginRight: "10px",
 *          }}
 *            />{" "}
 *            Duplicate
 *        </div>
 *      ),
 *    },
 * ];   
 * <ActionCallbackDropdown items={items} />
 * ```
 * @param props Component props containing dropdown items and configuration
 * @param props.items Array of dropdown items to display
 * @param props.icon Optional custom icon to replace the default menu icon
 * @param props.position Optional position for the dropdown menu
 * @param props.className Optional additional class name
 * @param props.title Optional title attribute for accessibility
 * @returns ActionCallbackDropdown component
 */
export default function ActionCallbackDropdown({
  items,
  icon,
  position = "right",
  className = "",
  title = "Open menu",
}: ActionCallbackDropdownProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Handle item click
  const handleItemClick = (onClick?: () => void) => {
    return () => {
      if (onClick) onClick();
      setIsOpen(false);
    };
  };

  return (
    <div
      className={`ihub-action-dropdown ${className} ${
        isOpen ? "ihub-dropdown-active" : ""
      }`}
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      <button
        className="ihub-dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        title={title}
      >
        {icon || <MenuOutlinedIcon />}
      </button>

      {isOpen && (
        <ul className={`ihub-main-list ihub-position-${position}`} role="menu">
          {items.map(
            (option, index) =>
              option.label && (
                <li
                  key={index}
                  className={`${option.disabled ? "ihub-item-disabled" : ""} ${
                    option.className || ""
                  }`}
                  onClick={
                    !option.disabled
                      ? handleItemClick(option.onClick)
                      : undefined
                  }
                  role="menuitem"
                  tabIndex={option.disabled ? -1 : 0}
                >
                  {option.icon && (
                    <span className="ihub-item-icon">{option.icon}</span>
                  )}
                  <span className="ihub-item-label">{option.label}</span>
                </li>
              )
          )}
        </ul>
      )}
    </div>
  );
}
