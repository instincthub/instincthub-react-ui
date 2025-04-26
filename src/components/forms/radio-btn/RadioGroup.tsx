import React from "react";
import RadioButton from "./RadioButton";

/**
 * Interface for radio option items
 */
interface RadioOption {
  /** Unique identifier for the option */
  id: string;
  /** Value of the option */
  value: string;
  /** Display label for the option */
  label: string;
  /** Whether the option is disabled */
  disabled?: boolean;
  /** Help text for this specific option */
  helpText?: string;
}

/**
 * Props for the RadioGroup component
 */
interface RadioGroupProps {
  /** Group label that describes the collection of options */
  label: string;
  /** Name attribute for all radio inputs in the group */
  name: string;
  /** Array of radio options to display */
  options: RadioOption[];
  /** Currently selected value */
  selectedValue?: string;
  /** Callback function when selection changes */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Whether the field group is required */
  required?: boolean;
  /** Error message for the entire group */
  error?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to display radio buttons inline horizontally */
  inline?: boolean;
  /** ID for the fieldset element */
  id?: string;
  /** Additional description for the group */
  description?: string;
}

/**
 * A component for grouping related radio buttons with a common label
 */
const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  selectedValue,
  onChange,
  required = false,
  error,
  className = "",
  inline = false,
  id,
  description,
}) => {
  const groupId = id || `radio-group-${name}`;
  const descriptionId = description ? `${groupId}-description` : undefined;

  return (
    <fieldset
      className={`ihub-radio-group ${className} ${
        inline ? "ihub-radio-group-inline" : ""
      } ${error ? "ihub-radio-group-error" : ""}`}
      id={groupId}
      aria-required={required}
      aria-describedby={descriptionId}
      aria-invalid={!!error}
    >
      <legend className="ihub-radio-group-legend">
        {label}
        {required && (
          <span className="ihub-required-mark" aria-hidden="true">
            *
          </span>
        )}
      </legend>

      {description && (
        <div id={descriptionId} className="ihub-radio-group-description">
          {description}
        </div>
      )}

      <div className="ihub-radio-options">
        {options.map((option) => (
          <RadioButton
            key={option.id}
            id={option.id}
            name={name}
            value={option.value}
            label={option.label}
            checked={selectedValue === option.value}
            disabled={option.disabled}
            onChange={onChange}
            required={required}
            helpText={option.helpText}
          />
        ))}
      </div>

      {error && (
        <div className="ihub-radio-group-error-message" role="alert">
          {error}
        </div>
      )}
    </fieldset>
  );
};

export default RadioGroup;
