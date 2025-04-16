"use client";

import React, { useState, useEffect, ChangeEvent, FocusEvent } from "react";

interface InputTextProps {
  /**
   * The input field's label text
   */
  label: string;

  /**
   * The name attribute for the input element
   */
  name: string;

  /**
   * The input's current value
   */
  value?: string;

  /**
   * Placeholder text to display when input is empty
   */
  placeholder?: string;

  /**
   * Whether the input is required
   */
  required?: boolean;

  /**
   * The input type (text, email, password, etc.)
   */
  type?: string;

  /**
   * Maximum character length
   */
  maxLength?: number;

  /**
   * Whether the input is disabled
   */
  disabled?: boolean;

  /**
   * Whether the input is read-only
   */
  readOnly?: boolean;

  /**
   * Additional CSS classes to apply to the wrapper
   */
  className?: string;

  /**
   * Text transformation to apply (lowercase, uppercase, capitalize)
   */
  textTransform?: "lowercase" | "uppercase" | "capitalize";

  /**
   * Error message to display
   */
  error?: string;

  /**
   * Callback for value changes
   */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;

  /**
   * Callback for blur events
   */
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;

  /**
   * Helper text or notes to display below the input
   */
  helperText?: string;

  /**
   * Note text to display below the input
   */
  note?: string;

  /**
   * The id of the input
   */
  id?: string;
}

/**
 * A modern input text component with floating label for InstinctHub
 * @example
 * ```tsx
 * <InputText label="Name" name="name" />
 * ```
 * @prop {string} label - The label text for the input field
 * @prop {string} name - The name attribute for the input element
 * @prop {string} value - The current value of the input field
 * @prop {string} placeholder - Placeholder text to display when input is empty
 * @prop {boolean} required - Whether the input is required
 * @prop {string} type - The type of input field (text, email, password, etc.)
 * @prop {number} maxLength - The maximum number of characters allowed in the input
 * @prop {boolean} disabled - Whether the input is disabled
 * @prop {boolean} readOnly - Whether the input is read-only
 * @prop {string} className - Additional CSS classes to apply to the wrapper
 * @prop {string} textTransform - Text transformation to apply (lowercase, uppercase, capitalize)
 * @prop {string} error - Error message to display
 * @prop {function} onChange - Callback for value changes
 * @prop {function} onBlur - Callback for blur events
 * @prop {string} helperText - Helper text or notes to display below the input
 * @prop {string} note - Note text to display below the input
 * @prop {string} id - The id of the input
 */
const InputText: React.FC<InputTextProps> = ({
  label,
  name,
  value = "",
  placeholder = "",
  required = false,
  type = "text",
  maxLength,
  disabled = false,
  readOnly = false,
  className = "",
  textTransform,
  error,
  onChange,
  onBlur,
  helperText,
  note,
  id,
}) => {
  const [inputValue, setInputValue] = useState<string>();
  const [hasValue, setHasValue] = useState<boolean>();

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value);
    }
    setHasValue(!!value);
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value);
    setInputValue(e.target.value);
    if (onChange) onChange(e);
  };

  // Data attributes for styling
  const dataAttributes: { [key: string]: string } = {};
  if (textTransform) {
    dataAttributes["data-text-transform"] = textTransform;
  }

  return (
    <div
      className={`ihub-wrapper ihub-mb-5 ${hasValue ? "ihub-value" : ""} ${
        error ? "ihub-is_invalid" : ""
      } ${className}`}
      {...dataAttributes}
    >
      <input
        type={type}
        id={id}
        name={name}
        value={inputValue}
        className="ihub-input"
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChange}
        onBlur={onBlur}
      />
      <label htmlFor={name} className="ihub-text-label">
        {label}
        {required && <span className="ihub-required">*</span>}
      </label>

      {helperText && !error && <p className="ihub-notes">{helperText}</p>}

      {error && <p className="ihub-notes ihub-is_invalid">{error}</p>}

      {note && (
        <p className="ihub-input-notes" id={`${id}-note`}>
          {note}
        </p>
      )}
    </div>
  );
};

export default InputText;
