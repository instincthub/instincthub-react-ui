"use client";

import React, { useRef, ChangeEvent } from "react";

interface TextFieldProps {
  type: string;
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: string | number | boolean;
  placeholder?: string;
  id?: string;
  maxLength?: number;
  width?: string;
  disabled?: boolean;
  note?: string;
  active?: boolean;
  TextTransform?: "lowercase" | "uppercase" | "capitalize" | "none";
  setValue?: (value: string) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputTarget?: (target: HTMLInputElement) => void;
  setNameValue?: (name: string, value: string) => void;
  arrayProps?: [number, string];
  setArrayProps?: (props: [number, string], value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

/**
 *
 * @component
 * @example
 * ```tsx
 *
 * <TextField
 *   label="Name"
 *   name="name"
 *   value="John Doe"
 *   onChange={(e) => console.log(e.target.value)}
 *   required={true}
 *   placeholder="Enter your name"
 *   disabled={false}
 * />
 * ```
 * Props interface for the TextField component
 * @property {string} label - Label text
 * @property {string} name - Name of the input field
 * @property {string} value - Value of the input field
 * @property {(e: ChangeEvent<HTMLInputElement>) => void} onChange - Callback for input changes
 * @property {boolean} required - Whether the field is required
 * @property {string} placeholder - Placeholder text
 * @property {boolean} disabled - Whether the field is disabled
 * @property {string} type - Type of the input field (e.g., text, email, password)
 * @property {string} id - ID of the input field
 * @property {number} maxLength - Maximum length of the input value
 * @property {string} width - Width of the input field (e.g., 'auto', '100%')
 * @property {string} note - Additional note or description below the input field
 * @property {boolean} active - Whether the field is active (for styling purposes)
 * @property {"lowercase" | "uppercase" | "capitalize" | "none"} TextTransform - Text transformation style
 * @property {(value: string) => void} setValue - Function to set the value of the input field
 * @property {(target: HTMLInputElement) => void} inputTarget - Function to get the input element reference
 * @property {(name: string, value: string) => void} setNameValue - Function to set the name and value of the input field
 * @property {[number, string]} arrayProps - Array of properties for dynamic input fields
 * @property {(props: [number, string], value: string) => void} setArrayProps - Function to set array properties
 * @property {(e: React.KeyboardEvent<HTMLInputElement>) => void} onKeyDown - Callback for key down events
 * */

function TextField(props: TextFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const showLabel = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      e.target.parentElement?.classList.add("ihub-value");
    } else {
      e.target.parentElement?.classList.remove("ihub-value");
    }
  };

  const toLowerCase = () => {
    if (inputRef.current && props.TextTransform === "lowercase") {
      inputRef.current.value = inputRef.current.value.toLowerCase();
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    toLowerCase();
    let inputValue = e.target.value;

    // Ensure no letters if type is tel
    if (props.type === "tel") {
      // Remove all characters that are not digits or the plus sign
      inputValue = inputValue.replace(/[^0-9+]/g, "");

      // Ensure that only one + is allowed, and it must be at the beginning
      if (inputValue.includes("+")) {
        inputValue = "+" + inputValue.replace(/[^0-9]/g, "");
      }

      // Limit the length to 15 characters
      if (inputValue.length > 15) {
        inputValue = inputValue.slice(0, 15);
      }

      e.target.value = inputValue;
    }

    if (props.setValue) props.setValue(inputValue);
    if (props.onChange) props.onChange(e);
    if (props.inputTarget) props.inputTarget(e.target);
    if (props.setNameValue) props.setNameValue(props.name, inputValue);
    if (props.setArrayProps && props.arrayProps)
      props.setArrayProps(props.arrayProps, inputValue);
    showLabel(e);
  };

  return (
    <div className={`ihub-field-container ${props.name}`}>
      <div className="ihub-field">
        <div
          className={`ihub-wrapper ${
            props.defaultValue !== undefined ||
            props.defaultValue === false ||
            props.active ||
            props.type === "file"
              ? "ihub-value"
              : ""
          }`}
          data-text-transform={props.TextTransform || "none"}
        >
          <input
            ref={inputRef}
            type={props.type}
            name={props.name}
            placeholder={props.placeholder}
            required={props.required}
            defaultValue={
              typeof props.defaultValue === "boolean"
                ? props.defaultValue.toString()
                : (props.defaultValue as
                    | string
                    | number
                    | readonly string[]
                    | undefined)
            }
            id={props.id}
            maxLength={props.maxLength}
            onChange={handleInput}
            className={`ihub-input ${
              props.width === "auto" ? "ihub-width-auto" : ""
            }`}
            readOnly={props.disabled ? props.disabled : false}
            onKeyDown={props.onKeyDown}
          />
          <span className="ihub-text-label">{props.label}</span>
        </div>
        {props.note && <p className="ihub-input-notes">{props.note}</p>}
      </div>
    </div>
  );
}

export default TextField;
