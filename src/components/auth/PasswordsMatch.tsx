import React, { useState } from "react";
import PasswordField from "../forms/PasswordField";

export default function PasswordsMatch(): JSX.Element {
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");

  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const inputValue = e.target.value;
    if (name === "password" && inputValue.length < 6) {
      e.target.style.borderColor = "#EA5F5E";
      e.target.classList.add("ihub-is_invalid");
      // Password too short

      setPassword("Password too short (it must be above 8 characters)!");
    } else {
      e.target.style.borderColor = "#69779B";
      e.target.classList.remove("ihub-is_invalid");
      setPassword("");
    }

    if (name === "password2") {
      const passwordElement = document.querySelector('[type="password"]');
      if (
        passwordElement &&
        passwordElement instanceof HTMLInputElement &&
        passwordElement.value !== inputValue
      ) {
        e.target.style.borderColor = "#EA5F5E";
        e.target.classList.add("ihub-is_invalid");
        setPassword2("Password does not match!");
      } else {
        e.target.style.borderColor = "#69779B";
        e.target.classList.remove("ihub-is_invalid");
        setPassword2("");
      }
    }
  };

  return (
    <div>
      <PasswordField
        label="Password *"
        name="password"
        required={true}
        onChange={validatePassword}
        id="password"
        error={password}
        helperText="Password must be above 8 characters"
      />
      <PasswordField
        label="Confirm Password *"
        name="password2"
        required={true}
        onChange={validatePassword}
        id="password2"
        error={password2}
        helperText="Passwords must match"
      />
    </div>
  );
}
