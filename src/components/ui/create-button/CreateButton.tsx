"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Type definitions
interface CreateButtonProps {
  /** Text to display on the button */
  label?: string;
  /** Search parameter key-value to add to URL */
  searchParam?: {
    key: string;
    value: string;
  };
  /** Fallback function when no searchParam is provided */
  onClick?: () => void;
  /** Button variant style */
  variant?: "primary" | "outlined" | "important" | "danger";
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Button size */
  size?: "small" | "medium" | "large";
  /** Show loading state */
  loading?: boolean;
  /** Icon to display before text */
  icon?: React.ReactNode;
  /** Whether to show animation effects */
  animated?: boolean;
  /** Additional HTML button attributes */
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

/**
 * Modern create button component with URL search parameter support
 * @example
 * ```tsx
 * <CreateButton
 *   label="Create Course"
 *   searchParam={{ key: "create", value: "course" }}
 *   variant="important"
 *   animated={true}
 * />
 * @param props - Component props
 * @param props.label - Button text
 * @param props.searchParam - Search parameter to add to URL
 * @param props.onClick - Callback function for click events
 * @param props.variant - Button variant style
 * @param props.disabled - Disable the button
 * @param props.className - Additional CSS class name
 * @param props.size - Button size
 * @param props.loading - Loading state
 * @param props.icon - Icon to display before text
 * @param props.animated - Animated button spinner
 * @param props.buttonProps - Additional button props 
 * @returns JSX.Element
 */
const CreateButton: React.FC<CreateButtonProps> = ({
  label = "Create",
  searchParam,
  onClick,
  variant = "important",
  disabled = false,
  className = "",
  size = "medium",
  loading = false,
  icon,
  animated = true,
  buttonProps,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * Handles button click event
   * Updates URL with search parameters or calls fallback function
   */
  const handleClick = (): void => {
    if (disabled || loading) return;

    if (searchParam) {
      // Update URL with search parameter
      const params = new URLSearchParams(searchParams.toString());
      params.set(searchParam.key, searchParam.value);

      // Use replace to avoid adding to browser history
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      router.replace(newUrl);
    } else if (onClick) {
      // Call fallback function
      onClick();
    }
  };

  // Build CSS classes
  const getButtonClasses = (): string => {
    const baseClasses = [];

    // Variant classes
    switch (variant) {
      case "primary":
        baseClasses.push("ihub-primary-btn");
        break;
      case "outlined":
        baseClasses.push("ihub-outlined-btn");
        break;
      case "danger":
        baseClasses.push("ihub-danger-btn");
        break;
      case "important":
      default:
        baseClasses.push("ihub-important-btn");
        break;
    }

    // Size classes
    switch (size) {
      case "small":
        baseClasses.push("ihub-btn-small");
        break;
      case "large":
        baseClasses.push("ihub-btn-large");
        break;
      case "medium":
      default:
        // Use default button styling
        break;
    }

    // Animation classes
    if (animated) {
      baseClasses.push("ihub-anime-button");
    }

    // Loading state
    if (loading) {
      baseClasses.push("ihub-btn-loading");
    }

    // Custom classes
    if (className) {
      baseClasses.push(className);
    }

    return baseClasses.join(" ");
  };

  return (
    <button
      type="button"
      className={getButtonClasses()}
      onClick={handleClick}
      disabled={disabled || loading}
      {...buttonProps}
    >
      {loading && (
        <div className="ihub-btn-spinner">
          <div className="ihub-spinner"></div>
        </div>
      )}

      {icon && !loading && <span className="ihub-btn-icon">{icon}</span>}

      <span className="ihub-btn-text">{loading ? "Creating..." : label}</span>

      {animated && !loading && (
        <svg
          id="animate"
          className="ihub-btn-arrow"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M3 8h10m0 0l-3-3m3 3l-3 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
};

export default CreateButton;
