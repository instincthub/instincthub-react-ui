"use client";

import React, { useRef, ChangeEvent } from "react";

interface TextFieldProps {
  types: string;
  names: string;
  labels: string;
  requireds?: boolean;
  defaultValues?: string | number | boolean;
  ids?: string;
  maxLengths?: number;
  widths?: string;
  disableds?: boolean;
  notes?: string;
  actives?: boolean;
  TextTransform?: "lowercase" | "uppercase" | "capitalize" | "none";
  setValues?: (value: string) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputTarget?: (target: HTMLInputElement) => void;
  setNameValue?: (name: string, value: string) => void;
  arrayProps?: [number, string];
  setArrayProps?: (props: [number, string], value: string) => void;
}

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
    if (props.types === "tel") {
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

    if (props.setValues) props.setValues(inputValue);
    if (props.onChange) props.onChange(e);
    if (props.inputTarget) props.inputTarget(e.target);
    if (props.setNameValue) props.setNameValue(props.names, inputValue);
    if (props.setArrayProps && props.arrayProps)
      props.setArrayProps(props.arrayProps, inputValue);
    showLabel(e);
  };

  return (
    <div className={`ihub-field-container ${props.names}`}>
      <div className="ihub-field">
        <div
          className={`ihub-wrapper ${
            props.defaultValues !== undefined ||
            props.defaultValues === false ||
            props.actives ||
            props.types === "file"
              ? "ihub-value"
              : ""
          }`}
          data-text-transform={props.TextTransform || "none"}
        >
          <input
            ref={inputRef}
            type={props.types}
            name={props.names}
            required={props.requireds}
            defaultValue={
              typeof props.defaultValues === "boolean"
                ? props.defaultValues.toString()
                : (props.defaultValues as
                    | string
                    | number
                    | readonly string[]
                    | undefined)
            }
            id={props.ids}
            maxLength={props.maxLengths}
            onChange={handleInput}
            className={`ihub-input ${
              props.widths === "auto" ? "ihub-width-auto" : ""
            }`}
            readOnly={props.disableds ? props.disableds : false}
          />
          <span className="ihub-text-label">{props.labels}</span>
        </div>
        {props.notes && <p className="ihub-notes">{props.notes}</p>}
      </div>
    </div>
  );
}

export default TextField;
