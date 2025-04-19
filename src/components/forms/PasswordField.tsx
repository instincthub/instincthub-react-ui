"use client"; // If using Next.js, ensure client-side rendering

import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// Define props interface
interface PasswordFieldProps {
  id?: string | null; // Optional ID for the input element
  name: string; // Class name and input name
  label: string; // Label text
  note?: string | null; // Optional validation message
  required?: boolean; // Optional required flag
  value?: string; // Optional default value
  setValue?: (value: string) => void; // Optional callback for value changes
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | null; // Optional input event handler
  setNameValue?: (name: string, value: string) => void | null; // Optional input event handler
}

/**
 * PasswordField component
 * @component
 * @example
 * ```jsx
 * import { PasswordField } from "@instincthub/react-ui";
 *
 * <PasswordField
 *   id={["password"]}
 *   name={["password"]}
 *   label={["Password"]}
 *   note={["Enter your password"]}
 *   required={true}
 *   value={""}
 *   setValue={(value) => {
 *     console.log(value);
 *   }}
 *   onChange={(e) => {
 *     console.log(e);
 *   }}
 * />
 * ```
 * Props interface for the PasswordField component
 * @property {string} id - ID for the input field
 * @property {string} name - Name for the input field
 * @property {string} label - Label for the input field
 * @property {string} note - Note for the input field
 * @property {boolean} required - Whether the field is required
 * @property {string} value - Default value for the input field
 * @property {(value: string) => void} setValue - Callback for setting values
 * @property {(e: React.ChangeEvent<HTMLInputElement>) => void} onChange - Callback for input events
 */
export default function PasswordField({
  id,
  name,
  label,
  note,
  required = false,
  value = "",
  setValue,
  onChange,
  setNameValue,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    if (value !== password) {
      setPassword(value);
    }
    setHasValue(!!value);
  }, [value]);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // If the input value is the same as the password, return
    if (value === inputValue) return;

    // Set the password and the hasValue state
    setPassword(inputValue);
    setHasValue(!!inputValue);

    // If the input value is not empty, set the value, call the onChange event, and set the name value
    if (inputValue) {
      if (setValue) setValue(inputValue);
      if (onChange) onChange(e);
      if (setNameValue) setNameValue(name, inputValue);
    }
  };

  return (
    <div
      className={`field ihub-wrapper ${hasValue ? "ihub-value" : ""} ${name}`}
    >
      <div className="ihub-password-wrapper">
        <div className="input_icon">
          <input
            type={showPassword ? "text" : "password"}
            id={id || "password"}
            name={name}
            required={required}
            value={password}
            onChange={handlePasswordChange}
            onFocus={() => setFocused(true)}
            onMouseOut={() => setFocused(false)}
            className="ihub-input"
          />

          <label htmlFor={name} className="ihub-text-label">
            {label}
            {required && <span className="ihub-required">*</span>}
          </label>
          <div onClick={handleShowPassword} className="symbols ihub-d-inline">
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </div>
        </div>
      </div>
      {note && <p className="ihub-input-notes">{note}</p>}
    </div>
  );
}
