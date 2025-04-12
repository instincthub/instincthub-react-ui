"use client";

import React, { useState, useEffect, ChangeEvent } from "react";

interface InputNumberProps {
  id?: string;
  name: string;
  label: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  value?: number;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (value: number | null) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string;
  note?: string;
}

/**
 * InputNumber component for numerical input with formatting and validation
 *
 * @example
 * ```tsx
 * <InputNumber name="age" label="Age" />
 * ```
 *
 * @param props Component properties
 * @param props.id - The id of the input
 * @param props.name - The name of the input
 * @param props.label - The label of the input
 * @param props.placeholder - The placeholder of the input
 * @param props.min - The minimum value of the input
 * @param props.max - The maximum value of the input
 * @param props.step - The step value of the input
 * @param props.defaultValue - The default value of the input
 * @param props.value - The value of the input
 * @param props.required - Whether the input is required
 * @param props.disabled - Whether the input is disabled
 * @param props.readOnly - Whether the input is read only
 * @param props.onChange - The onChange event of the input
 * @returns InputNumber component
 */
const InputNumber = ({
  id,
  name,
  label,
  placeholder,
  min,
  max,
  step = 1,
  defaultValue,
  value,
  required = false,
  disabled = false,
  readOnly = false,
  onChange,
  onBlur,
  className = "",
  error,
  note,
}: InputNumberProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [hasValue, setHasValue] = useState<boolean>(false);

  // Initialize input value from props
  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value.toString());
      setHasValue(true);
    } else if (defaultValue !== undefined) {
      setInputValue(defaultValue.toString());
      setHasValue(true);
    }
  }, [value, defaultValue]);

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Allow empty input or proper number format
    if (newValue === "" || /^-?\d*\.?\d*$/.test(newValue)) {
      setInputValue(newValue);
      setHasValue(newValue !== "");

      // Call onChange with parsed number or null if empty
      if (onChange) {
        const parsedValue = newValue === "" ? null : parseFloat(newValue);
        onChange(parsedValue);
      }
    }
  };

  // Handle increment button click
  const handleIncrement = () => {
    if (disabled || readOnly) return;

    const currentValue = inputValue === "" ? 0 : parseFloat(inputValue);
    let newValue = currentValue + step;

    // Respect max boundary
    if (max !== undefined && newValue > max) {
      newValue = max;
    }

    setInputValue(newValue.toString());
    setHasValue(true);

    if (onChange) {
      onChange(newValue);
    }
  };

  // Handle decrement button click
  const handleDecrement = () => {
    if (disabled || readOnly) return;

    const currentValue = inputValue === "" ? 0 : parseFloat(inputValue);
    let newValue = currentValue - step;

    // Respect min boundary
    if (min !== undefined && newValue < min) {
      newValue = min;
    }

    setInputValue(newValue.toString());
    setHasValue(true);

    if (onChange) {
      onChange(newValue);
    }
  };

  // Handle focus events
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);

    // Validate on blur
    if (inputValue !== "") {
      let parsedValue = parseFloat(inputValue);

      // Apply min/max constraints
      if (min !== undefined && parsedValue < min) {
        parsedValue = min;
        setInputValue(min.toString());
      } else if (max !== undefined && parsedValue > max) {
        parsedValue = max;
        setInputValue(max.toString());
      }

      if (onChange) {
        onChange(parsedValue);
      }
    }

    if (onBlur) {
      onBlur(e);
    }
  };

  // Generate wrapper class based on state
  const wrapperClass = `ihub-wrapper ${
    hasValue || isFocused ? "ihub-value" : ""
  } ${error ? "ihub-error" : ""} ${className}`;

  return (
    <div className={"ihub-mb-5 " + wrapperClass}>
      <div className="ihub-number-input-container">
        <input
          id={id || name}
          name={name}
          type="text"
          className="ihub-input ihub-number-input"
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        <label htmlFor={id || name} className="ihub-text-label">
          {label}
          {required && <span className="ihub-required">*</span>}
        </label>

        <div className="ihub-number-controls">
          <button
            type="button"
            className="ihub-number-increment"
            onClick={handleIncrement}
            disabled={
              disabled ||
              readOnly ||
              (max !== undefined &&
                inputValue !== "" &&
                parseFloat(inputValue) >= max)
            }
            aria-label="Increment"
          >
            <span className="ihub-control-icon">+</span>
          </button>
          <button
            type="button"
            className="ihub-number-decrement"
            onClick={handleDecrement}
            disabled={
              disabled ||
              readOnly ||
              (min !== undefined &&
                inputValue !== "" &&
                parseFloat(inputValue) <= min)
            }
            aria-label="Decrement"
          >
            <span className="ihub-control-icon">-</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="ihub-error-message" id={`${name}-error`}>
          {error}
        </div>
      )}
      {note && (
        <p className="ihub-input-notes" id={`${name}-note`}>
          {note}
        </p>
      )}
    </div>
  );
};

export default InputNumber;
