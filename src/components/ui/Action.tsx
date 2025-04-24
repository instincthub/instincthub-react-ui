import React from "react";
import Link from "next/link";

/**
 * Defines the structure of a dropdown item
 */
export interface ActionDropdownItem {
  /** Text label to display for the dropdown item */
  label: string;
  /** Click handler function */
  onClick?: () => void;
  /** Link destination if the dropdown item is a link */
  href?: string;
  /** Icon to display before the label */
  iconBefore?: React.ReactNode;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Optional additional class names */
  className?: string;
}

/**
 * ActionProps interface defines all possible props for the Action component
 */
interface ActionProps {
  /** Text label to display in the action element */
  label: string;
  /** Click handler function */
  onClick?: () => void;
  /** Link destination if the action is a link */
  href?: string;
  /** Visual style variant */
  variant?: "primary" | "secondary" | "outline" | "danger" | "text";
  /** Size variation */
  size?: "small" | "medium" | "large";
  /** Whether the action should take up full width of container */
  fullWidth?: boolean;
  /** Whether the action is disabled */
  disabled?: boolean;
  /** Icon to display before the label */
  iconBefore?: React.ReactNode;
  /** Icon to display after the label */
  iconAfter?: React.ReactNode;
  /** Optional additional class names */
  className?: string;
  /** Target attribute for links */
  target?: "_blank" | "_self" | "_parent" | "_top";
  /** Type attribute for buttons */
  type?: "button" | "submit" | "reset";
  /** Whether to add animation effect */
  animated?: boolean;
  /** Whether to show a dropdown menu */
  dropdown?: boolean;
  /** Items to display in the dropdown menu */
  dropdownItems?: ActionDropdownItem[];
  /** Position of the dropdown menu */
  dropdownPosition?: "left" | "right" | "center";
}

/**
 * A versatile Action component that can be rendered as a button or link
 * with various styles, sizes, icon options, and dropdown functionality
 */
const Action: React.FC<ActionProps> = ({
  label,
  onClick,
  href,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  disabled = false,
  iconBefore,
  iconAfter,
  className = "",
  target,
  type = "button",
  animated = false,
  dropdown = false,
  dropdownItems = [],
  dropdownPosition = "right",
}) => {
  // State to manage dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Handle opening/closing the dropdown
  const toggleDropdown = (e: React.MouseEvent) => {
    if (dropdown) {
      e.preventDefault();
      e.stopPropagation();
      setIsDropdownOpen((prev) => !prev);
    }
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Construct class names based on props
  const baseClasses = [
    "ihub-action",
    `ihub-action-${variant}`,
    `ihub-action-${size}`,
    fullWidth ? "ihub-action-full-width" : "",
    disabled ? "ihub-action-disabled" : "",
    animated ? "ihub-action-animated" : "",
    dropdown ? "ihub-action-with-dropdown" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Common content for both button and link
  const content = (
    <>
      {iconBefore && (
        <span className="ihub-action-icon-before">{iconBefore}</span>
      )}
      <span className="ihub-action-label">{label}</span>
      {dropdown && (
        <span className="ihub-action-dropdown-icon">
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L6 6L11 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
      {!dropdown && iconAfter && (
        <span className="ihub-action-icon-after">{iconAfter}</span>
      )}
    </>
  );

  // Dropdown menu
  const dropdownMenu = isDropdownOpen &&
    dropdown &&
    dropdownItems.length > 0 && (
      <div
        className={`ihub-action-dropdown-menu ihub-action-dropdown-${dropdownPosition}`}
        onClick={(e) => e.stopPropagation()}
      >
        {dropdownItems.map((item, index) => {
          const itemClasses = [
            "ihub-action-dropdown-item",
            item.disabled ? "ihub-action-dropdown-item-disabled" : "",
            item.className || "",
          ]
            .filter(Boolean)
            .join(" ");

          const itemContent = (
            <>
              {item.iconBefore && (
                <span className="ihub-action-dropdown-item-icon">
                  {item.iconBefore}
                </span>
              )}
              <span className="ihub-action-dropdown-item-label">
                {item.label}
              </span>
            </>
          );

          if (item.href && !item.disabled) {
            return (
              <Link
                key={index}
                href={item.href}
                className={itemClasses}
                onClick={() => {
                  if (item.onClick) item.onClick();
                  setIsDropdownOpen(false);
                }}
              >
                {itemContent}
              </Link>
            );
          }

          return (
            <button
              key={index}
              className={itemClasses}
              onClick={() => {
                if (!item.disabled && item.onClick) {
                  item.onClick();
                  setIsDropdownOpen(false);
                }
              }}
              disabled={item.disabled}
              type="button"
            >
              {itemContent}
            </button>
          );
        })}
      </div>
    );

  // Wrapper to contain both the action and dropdown
  const renderWithDropdown = (actionElement: React.ReactNode) => {
    if (!dropdown) return actionElement;

    return (
      <div className="ihub-action-dropdown-container" ref={dropdownRef}>
        {actionElement}
        {dropdownMenu}
      </div>
    );
  };

  // If it's a link (with href prop) and not a dropdown
  if (href && !disabled && !dropdown) {
    return renderWithDropdown(
      <Link
        href={href}
        className={baseClasses}
        target={target}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  // Otherwise render as button
  return renderWithDropdown(
    <button
      type={type}
      className={baseClasses}
      onClick={dropdown ? toggleDropdown : onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Action;
