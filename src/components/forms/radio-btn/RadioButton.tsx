import React from "react";

/**
 * Props for the RadioButton component
 * @interface RadioButtonProps
 */
interface RadioButtonProps {
  /** Unique identifier for the radio button */
  id: string;
  /** Name attribute for the radio input (for grouping) */
  name: string;
  /** Value of the radio button */
  value: string;
  /** Label text to display */
  label: string;
  /** Whether the radio button is checked */
  checked?: boolean;
  /** Whether the radio button is disabled */
  disabled?: boolean;
  /** Callback function when the radio button changes */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Whether the input is required */
  required?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Error message to display */
  error?: string;
  /** Help text to provide additional context */
  helpText?: string;
  /** Font size of the radio button */
  fontSize?: string;
}

/**
 * A customizable, accessible radio button component
 * @example
 * ```tsx
 * <RadioButton
 *  id="radio-button-1"
 *  name="radio-button-group"
 *  value="radio-button-1"
 *  label="Radio Button 1"
 * />
 * ```
 * @param id Unique identifier for the radio button
 * @param name Name attribute for the radio input (for grouping)
 * @param value Value of the radio button
 * @param label Label text to display
 * @param checked Whether the radio button is checked
 * @param disabled Whether the radio button is disabled
 * @param onChange Callback function when the radio button changes
 * @param required Whether the radio button is required
 * @param className Additional CSS classes
 * @param error Error message to display
 * @param helpText Help text to provide additional context
 * @param fontSize Font size of the radio button
 */
const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  name,
  value,
  label,
  checked = false,
  disabled = false,
  onChange,
  required = false,
  className = "",
  error,
  helpText,
  fontSize = "ihub-fs-sm",
}) => {
  return (
    <div
      className={`ihub-radio-wrapper ${className} ${
        disabled ? "ihub-radio-disabled" : ""
      } ${error ? "ihub-radio-error" : ""}`}
    >
      <div className="ihub-radio-container">
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          required={required}
          aria-invalid={!!error}
          aria-describedby={`${id}-${error ? "error" : helpText ? "help" : ""}`}
          className="ihub-radio-input"
        />
        <label className="ihub-radio-label" htmlFor={id}>
          <span className="ihub-radio-custom" aria-hidden="true"></span>
          <span className={`ihub-radio-text ${fontSize}`}>{label}</span>
          {required && (
            <span className="ihub-required-mark" aria-hidden="true">
              *
            </span>
          )}
        </label>
      </div>

      {helpText && !error && (
        <div id={`${id}-help`} className="ihub-radio-help-text">
          {helpText}
        </div>
      )}

      {error && (
        <div
          id={`${id}-error`}
          className="ihub-radio-error-message"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default RadioButton;
