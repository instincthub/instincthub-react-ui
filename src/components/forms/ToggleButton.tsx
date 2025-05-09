"use client";
import React, { useState, useEffect, ReactNode } from "react";

interface ToggleButtonProps {
  /** Name of the toggle */
  name?: string;
  /** Initial state of the toggle */
  initialState?: boolean;
  /** Callback function when toggle state changes */
  onChange?: (isActive: boolean) => void;
  /** Additional CSS class for custom styling */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Size of the toggle - small, medium, or large */
  size?: "small" | "medium" | "large";
  /** Label for the toggle */
  label?: string | ReactNode;
  /** Position of the label - left or right */
  labelPosition?: "left" | "right";
  /** Toggle without animation */
  noAnimation?: boolean;
  /** Background color when active - use CSS variable names */
  activeColor?: string;
  /** ID for the input element */
  id?: string;
  /** aria-label for accessibility */
  ariaLabel?: string;
}

const ToggleButton = ({
  name,
  initialState = false,
  onChange,
  className = "",
  disabled = false,
  size = "medium",
  label,
  labelPosition = "right",
  noAnimation = false,
  activeColor = "--DarkCyan",
  id,
  ariaLabel,
}: ToggleButtonProps) => {
  const [isActive, setIsActive] = useState<boolean>(initialState);
  const uniqueId =
    id || `toggle-${Math.random().toString(36).substring(2, 11)}`;

  useEffect(() => {
    setIsActive(initialState);
  }, [initialState]);

  const handleToggle = () => {
    if (!disabled) {
      const newState = !isActive;
      setIsActive(newState);
      onChange && onChange(newState);
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "ihub-toggle-sm";
      case "large":
        return "ihub-toggle-lg";
      default:
        return "";
    }
  };

  return (
    <div
      className={`ihub-toggle-container ${
        labelPosition === "left" ? "ihub-toggle-reverse" : ""
      } ${className}`}
    >
      {label && (
        <label htmlFor={uniqueId} className="ihub-toggle-label">
          {label}
        </label>
      )}
      <div
        className={`ihub-toggle-wrapper ${getSizeClass()} ${
          disabled ? "ihub-toggle-disabled" : ""
        }`}
      >
        {/* If name is provided, we need to set the default value of the input to the initial state */}
        {name && (
          <input
            type="hidden"
            name={name}
            defaultValue={isActive ? "true" : "false"}
          />
        )}
        <input
          type="checkbox"
          id={uniqueId}
          className={`ihub-toggle-input ihub-ghost`}
          checked={isActive}
          onChange={handleToggle}
          disabled={disabled}
          aria-label={ariaLabel || "Toggle"}
        />
        <div
          className={`ihub-toggle-track ${
            isActive ? "ihub-toggle-active" : ""
          } ${noAnimation ? "ihub-toggle-no-animation" : ""}`}
          style={
            isActive ? { backgroundColor: `var(${activeColor})` } : undefined
          }
          onClick={handleToggle}
          role="presentation"
        >
          <div className="ihub-toggle-thumb"></div>
        </div>
      </div>
    </div>
  );
};

export default ToggleButton;
