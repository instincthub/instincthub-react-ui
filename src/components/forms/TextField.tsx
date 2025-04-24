"use client";

import React, { useRef, ChangeEvent } from "react";

interface TextFieldProps {
  type: string;
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: string | number | boolean;
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
          />
          <span className="ihub-text-label">{props.label}</span>
        </div>
        {props.note && <p className="ihub-input-notes">{props.note}</p>}
      </div>
    </div>
  );
}

export default TextField;
