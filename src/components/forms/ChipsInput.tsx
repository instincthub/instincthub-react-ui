"use client";
import React, {
  useState,
  useRef,
  KeyboardEvent,
  ChangeEvent,
  FocusEvent,
} from "react";
import { isValidEmail } from "../lib";

/**
 * Props for the ChipsInput component
 */
interface ChipsInputProps {
  /** Label for the input */
  label?: string;
  /** Name for the input */
  name?: string;
  /** Array of current chip values */
  value: string[];
  /** Callback when chips change */
  onChange: (values: string[]) => void;
  /** Input placeholder text */
  placeholder?: string;
  /** Character to trigger chip creation (default: ",") */
  separator?: string;
  /** Maximum number of chips allowed */
  maxChips?: number;
  /** Whether duplicate values are allowed */
  allowDuplicates?: boolean;
  /** Disables the input */
  disabled?: boolean;
  /** Validation function */
  validateEmail?: boolean;
  /** Default error message */
  errorMessage?: string;
  /** Additional class for container */
  className?: string;
  /** Additional class for chips */
  chipClassName?: string;
  /** Additional class for input */
  inputClassName?: string;
  /** Size variant */
  size?: "small" | "medium" | "large";
  /** Accessibility label */
  ariaLabel?: string;
  /** Whether the input is required */
  required?: boolean;
}

/**
 * A flexible input component that converts text entries into chips/tags
 * @example
 * ```tsx
 * <ChipsInput
 *  label="Skills"
 *  name="skills"
 *  value={skills}
 *  onChange={setSkills}
 * />
 * 
 * @prop {string} label - The label for the input
 * @prop {string} name - The name for the input
 * @prop {string[]} value - The current value of the input
 * @prop {function} onChange - The function to call when the input changes
 * @prop {string} placeholder - The placeholder text for the input
 * @prop {string} separator - The character to trigger chip creation (default: ",")
 * @prop {number} maxChips - The maximum number of chips allowed
 * @prop {boolean} allowDuplicates - Whether duplicate values are allowed
 * @prop {boolean} disabled - Whether the input is disabled
 * @prop {boolean} validateEmail - Whether to validate email addresses
 * @prop {string} errorMessage - The error message to display
 * @prop {string} className - The class name for the container
 * @prop {string} chipClassName - The class name for the chips
 * @prop {string} inputClassName - The class name for the input
 * @prop {string} size - The size of the input
 * @prop {string} ariaLabel - The aria label for the input
 * @prop {boolean} required - Whether the input is required
 */
const ChipsInput: React.FC<ChipsInputProps> = ({
  label,
  name,
  value = [],
  onChange,
  placeholder = "Add tags...",
  separator = ",",
  maxChips,
  allowDuplicates = false,
  disabled = false,
  validateEmail,
  errorMessage = "",
  className = "",
  chipClassName = "",
  inputClassName = "",
  size = "medium",
  ariaLabel = "Chips input",
  required = false,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [activeChipIndex, setActiveChipIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Adds a new chip with the given value
   * @param chipValue The value to add as a chip
   */
  const addChip = (chipValue: string): void => {
    const trimmedValue = chipValue.trim();

    if (!trimmedValue) return;

    // Validate if needed
    if (validateEmail) {
      const validationResult = isValidEmail(trimmedValue);
      if (!validationResult) {
        setError("Please enter a valid email address");
        setError(errorMessage || "Invalid input");
        return;
      }
    }

    // Check for duplicates
    if (!allowDuplicates && value.includes(trimmedValue)) {
      setError("Duplicate value");
      return;
    }

    // Check for max chips
    if (maxChips && value.length >= maxChips) {
      setError(`Maximum of ${maxChips} tags allowed`);
      return;
    }

    // Clear any errors
    setError("");

    // Add the chip
    onChange([...value, trimmedValue]);
    setInputValue("");
  };

  /**
   * Removes a chip at the specified index
   * @param index The index of the chip to remove
   */
  const removeChip = (index: number): void => {
    if (disabled) return;

    const newValue = [...value];
    newValue.splice(index, 1);
    onChange(newValue);

    // Reset active chip index
    setActiveChipIndex(-1);

    // Focus the input after removing a chip
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  /**
   * Handles input change
   * @param e Change event
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
    setError("");

    // Check if the value contains the separator
    if (e.target.value.includes(separator)) {
      const values = e.target.value.split(separator);
      // Add all values except the last one (which might be incomplete)
      for (let i = 0; i < values.length - 1; i++) {
        addChip(values[i]);
      }
      // Keep the last value in the input
      setInputValue(values[values.length - 1]);
    }
  };

  /**
   * Handles key down events
   * @param e Keyboard event
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    // Handle adding a chip with Enter
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      addChip(inputValue);
    }

    // Handle adding a chip with the separator
    if (e.key === separator && inputValue) {
      e.preventDefault();
      addChip(inputValue);
    }

    // Handle backspace to remove the last chip
    if (e.key === "Backspace" && !inputValue && value.length > 0) {
      removeChip(value.length - 1);
    }

    // Handle arrow keys for navigation
    if (e.key === "ArrowLeft") {
      if (activeChipIndex === -1 && value.length > 0) {
        setActiveChipIndex(value.length - 1);
      } else if (activeChipIndex > 0) {
        setActiveChipIndex(activeChipIndex - 1);
      }
    }

    if (e.key === "ArrowRight") {
      if (activeChipIndex >= 0 && activeChipIndex < value.length - 1) {
        setActiveChipIndex(activeChipIndex + 1);
      } else {
        setActiveChipIndex(-1);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    }

    // Handle delete key to remove the active chip
    if (
      (e.key === "Delete" || e.key === "Backspace") &&
      activeChipIndex !== -1
    ) {
      removeChip(activeChipIndex);
    }
  };

  /**
   * Handles blur events
   * @param e Focus event
   */
  const handleInputBlur = (e: FocusEvent<HTMLInputElement>): void => {
    // Add chip when input loses focus if there's a value
    if (inputValue.trim()) {
      addChip(inputValue);
    }
  };

  /**
   * Handles container click to focus the input
   */
  const handleContainerClick = (): void => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  };

  /**
   * Handles chip click to set as active
   * @param index The index of the clicked chip
   */
  const handleChipClick = (index: number): void => {
    if (disabled) return;
    setActiveChipIndex(index);
  };

  /**
   * Reset active chip index when input is focused
   */
  const handleInputFocus = (): void => {
    setActiveChipIndex(-1);
  };

  /**
   * Get size-related class
   */
  const getSizeClass = (): string => {
    switch (size) {
      case "small":
        return "ihub-chips-small";
      case "large":
        return "ihub-chips-large";
      default:
        return "ihub-chips-medium";
    }
  };

  return (
    <div className="ihub-wrapper">
      <div
        ref={containerRef}
        className={`ihub-chips-container ${getSizeClass()} ${className} ${
          disabled ? "ihub-chips-disabled" : ""
        } ${error ? "ihub-chips-error" : ""}`}
        onClick={handleContainerClick}
        aria-labelledby={ariaLabel}
        aria-describedby={error ? "chips-error-message" : undefined}
      >
        {value.map((chip, index) => (
          <div
            key={`${chip}-${index}`}
            className={`ihub-chip ${chipClassName} ${
              activeChipIndex === index ? "ihub-chip-active" : ""
            }`}
            onClick={() => handleChipClick(index)}
            tabIndex={disabled ? -1 : 0}
            aria-label={`${chip}, press delete to remove`}
            onKeyDown={(e) => {
              if (e.key === "Delete" || e.key === "Backspace") {
                removeChip(index);
              }
            }}
          >
            <span className="ihub-chip-text">{chip}</span>
            {!disabled && (
              <button
                type="button"
                className="ihub-chip-remove"
                onClick={(e) => {
                  e.stopPropagation();
                  removeChip(index);
                }}
                aria-label={`Remove ${chip}`}
              >
                ×
              </button>
            )}
          </div>
        ))}

        <input
          ref={inputRef}
          type="text"
          className={`ihub-chips-input ${inputClassName}`}
          placeholder={value.length === 0 ? placeholder : ""}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          disabled={
            disabled || (maxChips !== undefined && value.length >= maxChips)
          }
          aria-invalid={!!error}
          required={required}
        />

        {label && (
          <label htmlFor={name} className="ihub-chips-label ihub-text-label">
            {label}
            {required && <span className="ihub-required">*</span>}
          </label>
        )}
      </div>

      {error && (
        <div className="ihub-chips-error-message" id="chips-error-message">
          {error}
        </div>
      )}
      {name ? (
        <input name={name} className="ihub-ghost" value={`${value}`} />
      ) : (
        ""
      )}
    </div>
  );
};

export default ChipsInput;
