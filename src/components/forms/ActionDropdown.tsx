"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

/**
 * Interface for dropdown menu items
 * @interface DropdownItem
 */
interface DropdownItem {
  /** The display text for the menu item */
  label: string;
  /** Optional URL for navigation (use with Next.js Link) */
  url?: string;
  /** Optional callback function to execute when item is clicked */
  onClick?: () => void;
  /** Icon to display - can be a React component or string (e.g., Material Icons name) */
  icon: React.ReactNode | string;
}

/**
 * Props interface for ActionDropdown component
 * @interface ActionCallbackDropdownProps
 */
interface ActionCallbackDropdownProps {
  /** Array of dropdown menu items */
  items: DropdownItem[];
  /** Optional session object for user-specific actions */
  session?: {
    user?: {
      name: {
        uuid: string;
      };
    };
  };
}

/**
 * A dropdown menu component that displays a list of action items.
 * Supports both navigation links and callback functions for menu items.
 * The dropdown toggles visibility on button click and closes when clicking outside.
 * 
 * @example
 * ```tsx
 * // With navigation links
 * <ActionDropdown 
 *   items={[
 *     { label: "View Details", url: "/details", icon: "visibility" },
 *     { label: "Edit Session", url: "/edit", icon: "edit" }
 *   ]}
 * />
 * 
 * // With callback functions
 * <ActionDropdown 
 *   items={[
 *     { label: "Delete Session", onClick: handleDelete, icon: "delete" },
 *     { label: "Archive", onClick: handleArchive, icon: "archive" }
 *   ]}
 * />
 * 
 * // Mixed usage
 * <ActionDropdown 
 *   items={[
 *     { label: "View Details", url: "/details", icon: "visibility" },
 *     { label: "Delete", onClick: () => console.log("deleted"), icon: "delete" }
 *   ]}
 * />
 * ```
 * 
 * @param {ActionCallbackDropdownProps} props - The component props
 * @param {DropdownItem[]} props.items - Array of dropdown menu items
 * @param {object} [props.session] - Optional session object for user-specific actions
 * @returns {JSX.Element} The rendered dropdown component
 */
export default function ActionDropdown(props: ActionCallbackDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: DropdownItem) => {
    if (item.onClick) {
      item.onClick();
    }
    setIsOpen(false);
  };

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

  return (
    <div className="ihub-react-action" ref={dropdownRef}>
      <div className="ctrl-dropdown">
        <button className="outlined-btn" onClick={toggleDropdown}>
          ...
        </button>
        {isOpen && (
          <ul className="main_list">
            {props.items.map((option, index) => (
              <li key={index}>
                {option.url ? (
                  <Link href={option.url} onClick={() => setIsOpen(false)}>
                    {option.icon}
                    {option.label}
                  </Link>
                ) : (
                  <button onClick={() => handleItemClick(option)}>
                    {option.icon}
                    {option.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
