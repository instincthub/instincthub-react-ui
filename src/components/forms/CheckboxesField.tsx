"use client";

import React, { useState, useEffect } from "react";

interface Option {
  id: string | number;
  title: string;
  status?: boolean;
}

interface CheckboxesFieldProps {
  name: string;
  label: string;
  options: Record<string, Option>;
  defaultValues?: boolean;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  onChange?: (values: Record<string, boolean>) => void;
  onBlur?: () => void;
}

/**
 * A reusable checkbox group component using controlled components pattern
 * @param name The field name
 * @param label The label for the checkbox group
 * @param options Object of checkbox options to display
 * @param defaultValues Whether to use status from options as default value
 * @param required Whether the field is required
 * @param disabled Whether the field is disabled
 * @param error Error message to display
 * @param onChange Callback when values change
 * @param onBlur Callback when the field loses focus
 */
const CheckboxesField: React.FC<CheckboxesFieldProps> = ({
  name,
  label,
  options,
  defaultValues = false,
  required = false,
  disabled = false,
  error,
  onChange,
  onBlur
}) => {
  // Initialize state with default values
  const [checkboxValues, setCheckboxValues] = useState<Record<string, boolean>>({});
  const [touched, setTouched] = useState(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(error);
  
  // Initialize values from options when component mounts or options change
  useEffect(() => {
    const initialValues = Object.values(options).reduce((acc, option) => ({
      ...acc,
      [option.id]: defaultValues ? option.status || false : false
    }), {});
    
    setCheckboxValues(initialValues);
  }, [options, defaultValues]);

  // Update error state when error prop changes
  useEffect(() => {
    setErrorMessage(error);
    setHasError(!!error);
  }, [error]);

  // Validate when values change or field is touched
  useEffect(() => {
    if (touched) {
      if (required && Object.values(checkboxValues).every(value => !value)) {
        setHasError(true);
        setErrorMessage("Please select at least one option");
      } else {
        setHasError(false);
        setErrorMessage(undefined);
      }
    }
    
    // Notify parent component of value changes
    if (onChange) {
      onChange(checkboxValues);
    }
  }, [checkboxValues, touched, required, onChange]);

  // Handle checkbox change
  const handleChange = (id: string | number, checked: boolean) => {
    setCheckboxValues(prev => ({
      ...prev,
      [id]: checked
    }));
    
    if (!touched) {
      setTouched(true);
    }
  };

  // Handle blur event
  const handleBlur = () => {
    if (!touched) {
      setTouched(true);
    }
    
    if (onBlur) {
      onBlur();
    }
  };

  const optionsArray = Object.values(options);

  return (
    <div className="ihub-checkbox-field">
      <div className="ihub-checkbox-header">
        <label className="ihub-checkbox-label">
          {label} {required && <span className="ihub-required">*</span>}
        </label>
        {hasError && errorMessage && (
          <p className="ihub-error-message">{errorMessage}</p>
        )}
      </div>
      
      <div 
        className={`ihub-checkbox-wrapper ${hasError ? 'ihub-has-error' : ''}`}
        onBlur={handleBlur}
      >
        {optionsArray.map((option) => (
          <div className="ihub-checkbox-item" key={option.id}>
            <label 
              htmlFor={`${name}_${option.id}`} 
              className={`label-cbx ${disabled ? 'ihub-disabled' : ''}`}
            >
              <input
                id={`${name}_${option.id}`}
                name={`${name}[${option.id}]`}
                type="checkbox"
                className="invisible"
                checked={checkboxValues[option.id] || false}
                onChange={(e) => handleChange(option.id, e.target.checked)}
                value={String(option.id)}
                data-id={option.id}
                disabled={disabled}
                hidden
              />
              <div className="checkbox">
                <svg width="20px" height="20px" viewBox="0 0 20 20">
                  <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                  <polyline points="4 11 8 15 16 6"></polyline>
                </svg>
              </div>
              <span>{option.title}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxesField;