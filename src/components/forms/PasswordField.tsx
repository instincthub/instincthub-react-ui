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
  defaultValue?: string; // Optional default value
  setValue?: (value: string) => void; // Optional callback for value changes
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | null; // Optional input event handler
  setNameValue?: (name: string, value: string) => void | null; // Optional input event handler
}

/**
 *
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
 *   defaultValue={""}
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
 * @property {string} defaultValue - Default value for the input field
 * @property {(value: string) => void} setValue - Callback for setting values
 * @property {(e: React.ChangeEvent<HTMLInputElement>) => void} onChange - Callback for input events
 */
export default function PasswordField({
  id,
  name,
  label,
  note,
  required = false,
  defaultValue = "",
  setValue,
  onChange,
  setNameValue,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === defaultValue) return;
    setPassword(value);

    const parentDiv = e.target.parentElement?.parentElement;
    if (value) {
      parentDiv?.classList.add("value");
      if (setValue) setValue(value);
      if (onChange) onChange(e);
      if (setNameValue) setNameValue(name, value);
    } else {
      parentDiv?.classList.remove("value");
    }
  };

  useEffect(() => {
    setPassword(defaultValue);
  }, [defaultValue]);

  return (
    <div className={name}>
      <div className="field">
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
            />

            <div onClick={handleShowPassword} className="symbols ihub-d-inline">
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
          </div>
          <span
            className={`text_label ${focused || password ? "focused" : ""}`}
          >
            {label}
          </span>
        </div>
        {note && <p className="ihub-input-notes">{note}</p>}
      </div>
    </div>
  );
}
