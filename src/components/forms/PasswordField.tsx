"use client"; // If using Next.js, ensure client-side rendering

import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// Define props interface
interface PasswordFieldProps {
  names: string; // Class name and input name
  labels: string; // Label text
  requireds?: boolean; // Optional required flag
  defaultValues?: string; // Optional default value
  setValues?: (value: string) => void; // Optional callback for value changes
  inputEvent?: (name: string, value: string) => void; // Optional input event handler
}

export default function PasswordField({
  names,
  labels,
  requireds = false,
  defaultValues = "",
  setValues,
  inputEvent,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === defaultValues) return;
    setPassword(value);

    const parentDiv = e.target.parentElement?.parentElement;
    if (value) {
      parentDiv?.classList.add("value");
      if (setValues) setValues(value);
      if (inputEvent) inputEvent(names, value);
    } else {
      parentDiv?.classList.remove("value");
    }
  };

  useEffect(() => {
    setPassword(defaultValues);
  }, [defaultValues]);

  return (
    <div className={names}>
      <div className="field">
        <div className="ihub-password-wrapper">
          <div className="input_icon">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name={names}
              required={requireds}
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
            {labels}
          </span>
        </div>
      </div>
    </div>
  );
}
