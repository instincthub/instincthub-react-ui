"use client";

import React, { useState, useEffect, ChangeEvent } from "react";

interface InputAmountProps {
  id?: string;
  name?: string;
  label?: string;
  value?: string | number;
  onChange?: (value: number | string, name?: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  required?: boolean;
  currencySymbol?: string;
  error?: string;
  className?: string;
  plainDisplay?: boolean;
}

/**
 * This component is a custom input field that allows users to enter a number with commas as thousands separators.
 * It also allows for optional plain display mode, where the value is displayed without formatting.
 * The component handles both comma-formatted and raw number inputs.
 * @example
 * ```tsx
 * <InputAmount
 *  label="Amount"
 *  value={amount}
 *  onChange={handleChange}
 * />
 * ```
 * @prop {string} label - The label of the input field.
 * @prop {number | string} value - The value of the input field.
 * @prop {function} onChange - The function to call when the input value changes.
 * @prop {boolean} plainDisplay - Whether to display the input value without formatting.
 * @prop {string} currencySymbol - The symbol to display before the input value.
 * @prop {string} error - The error message to display if the input value is invalid.
 * @prop {string} className - The class name to apply to the input field.
 * @prop {boolean} disabled - Whether to disable the input field.
 * @prop {boolean} readOnly - Whether to make the input field read-only.
 * @prop {string} placeholder - The placeholder text to display if the input field is empty.
 * @prop {number} min - The minimum value of the input field.
 * @prop {number} max - The maximum value of the input field.
 * @prop {boolean} required - Whether the input field is required.
 * @prop {string} id - The id of the input field.
 * @prop {string} name - The name of the input field.
 * @prop {boolean} plainDisplay - Whether to display the input value without formatting.
 */

const InputAmount: React.FC<InputAmountProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  disabled = false,
  readOnly = false,
  placeholder = "0.00",
  min,
  max,
  required = false,
  currencySymbol = "₦",
  error,
  className = "",
  plainDisplay = false,
}) => {
  const [focused, setFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState<string>("");
  const [numberValue, setNumberValue] = useState<number>(0);

  // Format a number as comma-separated string
  const formatNumberWithCommas = (value: string | number): string => {
    // Handle empty values
    if (value === "" || value === undefined || value === null) return "";

    // Convert to number and handle potential parsing errors
    let numericValue: number;
    let decimalPart = "";

    if (typeof value === "string") {
      // Check if there's a decimal part
      const parts = value.split(".");
      if (parts.length > 1) {
        decimalPart = "." + parts[1];
      }

      // Remove existing commas and get the numeric part
      numericValue = parseFloat(value.replace(/,/g, ""));
    } else {
      numericValue = value;
    }

    // Return empty string if invalid number
    if (isNaN(numericValue)) return "";

    // Format the integer part with commas
    let formattedValue = numericValue
      .toString()
      .split(".")[0]
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // If the original value had a decimal part, preserve it
    if (typeof value === "string" && decimalPart) {
      return formattedValue + decimalPart;
    } else if (typeof value === "number") {
      // For numbers, use fixed decimal places
      return (
        formattedValue +
        numericValue.toString().substring(numericValue.toString().indexOf("."))
      );
    }

    return formattedValue;
  };

  // Parse a formatted string back to a number
  const parseFormattedNumber = (formattedValue: string): number => {
    if (!formattedValue) return 0;
    // Remove commas and convert to number
    return parseFloat(formattedValue.replace(/,/g, ""));
  };

  // Initialize and update the display value when the input value changes
  useEffect(() => {
    // If value is undefined or null, set display value to empty string
    if (value === undefined || value === null || value === "") {
      setDisplayValue("");
      return;
    }

    // Format the value with commas
    setNumberValue(Number(value));
    const formatted = formatNumberWithCommas(value);
    setDisplayValue(formatted);
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Only allow digits, decimal point, and commas
    if (!/^[\d,.]*$/.test(inputValue)) {
      return; // Reject input with disallowed characters
    }

    // Remove all commas for calculation
    const numericString = inputValue.replace(/,/g, "");

    // Check if the resulting string is a valid number format
    if (!/^[0-9]*\.?[0-9]*$/.test(numericString)) {
      return; // Not a valid number format
    }

    // Calculate the raw numeric value
    const numericValue = numericString === "" ? 0 : parseFloat(numericString);

    // Prevent recurssion if value are the same.
    if (numericValue === numberValue) {
      return;
    }

    // Format with commas for display
    let formattedValue = inputValue;

    // If the user is typing a decimal point or just after typing one, preserve it exactly
    if (!inputValue.endsWith(".") && !inputValue.match(/\.\d*$/)) {
      // Only format if not in the middle of typing a decimal
      formattedValue = formatNumberWithCommas(numericString);
    }

    // Update the display value: 6,000
    setDisplayValue(formattedValue);
    // Store the numeric value: 6000 (not 6,000).
    setNumberValue(numericValue);

    // Pass the numeric value to the parent
    if (onChange) {
      onChange(numericValue, name);
    }
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);

    // When blurring, ensure proper decimal formatting
    if (displayValue) {
      const numericValue = parseFormattedNumber(displayValue);
      const formatted = formatNumberWithCommas(numericValue.toFixed(2));
      setDisplayValue(formatted);

      // Ensure the parent component has the correct numeric value
      if (onChange) {
        onChange(numericValue, name);
      }
    }
  };

  // If plainDisplay is true, render a simple paragraph with formatted value
  if (plainDisplay) {
    const formattedValue = formatNumberWithCommas(value || 0);
    return (
      <p className={`ihub-amount-plain ${className || ""}`}>
        {currencySymbol}
        {formattedValue || "0.00"}
      </p>
    );
  }

  // Regular input rendering for non-plainDisplay mode
  const hasValue = displayValue !== "";
  const wrapperClassName = `ihub-wrapper${
    hasValue || focused ? " ihub-value" : ""
  }${error ? " ihub-is_invalid" : ""}${className ? ` ${className}` : ""}`;

  return (
    <div className={wrapperClassName}>
      <input type="hidden" name={name} value={numberValue} />
      <div className="ihub-amount-input-container">
        <span
          className={`ihub-currency-symbol ${
            !hasValue && !focused ? "ihub-ghost" : ""
          }`}
        >
          {currencySymbol}
        </span>
        <input
          id={id || name}
          type="text"
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={!hasValue && !focused ? "" : placeholder}
          className="ihub-input ihub-amount-input"
          required={required}
          min={min}
          max={max}
          inputMode="decimal"
        />
        <label htmlFor={id || name} className="ihub-text-label">
          {label}
          {required && <span className="ihub-required">*</span>}
        </label>
      </div>
      {error && <p className="ihub-error-message">{error}</p>}
    </div>
  );
};

export default InputAmount;
