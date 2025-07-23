"use client";
import React, {
  useState,
  useEffect,
  ChangeEvent,
  FocusEvent,
  TextareaHTMLAttributes,
} from "react";

interface InputTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Label text for the textarea
   */
  label: string;

  /**
   * Optional error message to display
   */
  error?: string;

  /**
   * Optional helper text displayed below the textarea
   */
  helperText?: string;

  /**
   * Optional minimum number of rows for the textarea
   * @default 3
   */
  minRows?: number;

  /**
   * Optional maximum number of rows for the textarea
   */
  maxRows?: number;

  /**
   * Whether to automatically resize the textarea based on content
   * @default true
   */
  autoResize?: boolean;

  /**
   * Callback for value changes
   */
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;

  /**
   * Optional text transform style
   */
  textTransform?: "lowercase" | "uppercase" | "capitalize" | "none";

  /**
   * Note text to display below the textarea
   */
  note?: string;
}

/**
 * InputTextarea component for InstinctHub
 * A modern textarea component that matches the InstinctHub design system
 */
const InputTextarea: React.FC<InputTextareaProps> = ({
  label,
  error,
  helperText,
  minRows = 3,
  maxRows,
  autoResize = true,
  textTransform = "none",
  className,
  value,
  onChange,
  onBlur,
  onFocus,
  note,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [textValue, setTextValue] = useState(value || "");
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    // Update internal value when prop value changes
    if (value !== undefined) {
      setTextValue(value);
    }
  }, [value]);

  const adjustHeight = (element: HTMLTextAreaElement) => {
    if (!autoResize) return;

    // Reset height to calculate the new height based on content
    element.style.height = "auto";

    // Calculate new height
    const newHeight = Math.max(
      element.scrollHeight,
      minRows ? minRows * 24 : 72 // Assuming line height of 24px
    );

    // Apply max height limit if specified
    const limitedHeight = maxRows
      ? Math.min(newHeight, maxRows * 24)
      : newHeight;

    element.style.height = `${limitedHeight}px`;
    setHeight(limitedHeight);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setTextValue(newValue);

    // Adjust height if auto-resize is enabled
    adjustHeight(e.target);

    // Call external onChange handler if provided
    if (onChange) {
      onChange(e);
    }
  };

  const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);

    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);

    if (onBlur) {
      onBlur(e);
    }
  };

  // Determine if the label should be elevated (when focused or has content)
  const isLabelElevated = isFocused || String(textValue).length > 0;

  // Calculate wrapper class based on state
  const wrapperClass = `ihub-wrapper ihub-textarea-wrapper ${
    error ? "ihub-error" : ""
  } ${isLabelElevated ? "ihub-value" : ""} ${className || ""}`;

  // Calculate input classes
  const textareaClass = `ihub-input ihub-textarea ${
    error ? "ihub-input-error" : ""
  }`;

  return (
    <div
      className={wrapperClass}
      data-text-transform={textTransform !== "none" ? textTransform : undefined}
    >
      <textarea
        {...props}
        className={textareaClass}
        value={textValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        rows={minRows}
        style={height ? { height: `${height}px` } : undefined}
        placeholder={isLabelElevated ? props.placeholder : ""}
      />

      <label className="ihub-text-label">{label}</label>

      {(error || helperText) && (
        <div className="ihub-notes">
          {error ? (
            <span className="ihub-is_invalid ihub-fs-sm">{error}</span>
          ) : helperText ? (
            <span className="ihub-fs-sm">{helperText}</span>
          ) : null}
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

export default InputTextarea;
