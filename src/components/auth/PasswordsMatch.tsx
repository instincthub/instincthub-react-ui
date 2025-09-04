"use client";
import React, { useState } from "react";
import PasswordField from "../forms/PasswordField";

export interface PasswordsMatchProps {
  /** Default password value to pre-populate the password field */
  defaultPassword?: string;
  /** Callback function triggered when passwords are validated */
  onPasswordChange?: (password: string, isValid: boolean) => void;
  /** Callback function triggered when password confirmation is validated */
  onConfirmPasswordChange?: (confirmPassword: string, isValid: boolean) => void;
}

export default function PasswordsMatch({
  defaultPassword = "",
  onPasswordChange,
  onConfirmPasswordChange,
}: PasswordsMatchProps): JSX.Element {
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>(defaultPassword);
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>("");

  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const inputValue = e.target.value;

    if (name === "password") {
      setPasswordValue(inputValue);

      if (inputValue.length < 8) {
        e.target.style.borderColor = "#EA5F5E";
        e.target.classList.add("ihub-is_invalid");
        setPassword("Password too short (it must be above 8 characters)!");
        onPasswordChange?.(inputValue, false);
      } else {
        e.target.style.borderColor = "#69779B";
        e.target.classList.remove("ihub-is_invalid");
        setPassword("");
        onPasswordChange?.(inputValue, true);
      }

      // Re-validate confirm password if it has a value
      if (confirmPasswordValue && confirmPasswordValue !== inputValue) {
        setPassword2("Password does not match!");
        onConfirmPasswordChange?.(confirmPasswordValue, false);
      } else if (confirmPasswordValue && confirmPasswordValue === inputValue) {
        setPassword2("");
        onConfirmPasswordChange?.(confirmPasswordValue, true);
      }
    }

    if (name === "password2") {
      setConfirmPasswordValue(inputValue);

      if (passwordValue !== inputValue) {
        e.target.style.borderColor = "#EA5F5E";
        e.target.classList.add("ihub-is_invalid");
        setPassword2("Password does not match!");
        onConfirmPasswordChange?.(inputValue, false);
      } else {
        e.target.style.borderColor = "#69779B";
        e.target.classList.remove("ihub-is_invalid");
        setPassword2("");
        onConfirmPasswordChange?.(inputValue, true);
      }
    }
  };

  return (
    <div>
      <PasswordField
        label="Password"
        name="password"
        required={true}
        onChange={validatePassword}
        id="password"
        error={password}
        helperText="Password must be above 8 characters"
        value={passwordValue || defaultPassword}
      />
      <PasswordField
        label="Confirm Password"
        name="password2"
        required={true}
        onChange={validatePassword}
        id="password2"
        error={password2}
        helperText="Passwords must match"
        value={confirmPasswordValue || defaultPassword}
      />
    </div>
  );
}
