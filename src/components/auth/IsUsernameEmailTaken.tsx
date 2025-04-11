import { useEffect, useState, ChangeEvent } from "react";
import TextField from "../forms/TextField";
import {
  API_HOST_URL,
  isValidAlphanumeric,
  isValidEmail,
  reqOptions,
} from "../lib/helpFunction";

// Define props interface
interface IsUsernameEmailTakenProps {
  names: "username" | "email"; // Restrict to specific field names
  types: string; // HTML input type (e.g., "text", "email")
  labels: string;
  requireds: boolean;
  keys: string | number; // Assuming this is a key for React's key prop
}

// Define state interface
interface FieldState {
  note: string;
  valid: boolean;
}

export default function IsUsernameEmailTaken(props: IsUsernameEmailTakenProps) {
  const { names, types, labels, requireds, keys } = props;
  const [field, setField] = useState<FieldState>({
    note: "",
    valid: false,
  });

  // Async function to check if username/email is taken
  async function usernameEmailTaken(value: string): Promise<string> {
    const formData = new FormData();
    formData.append("field", names);
    formData.append("field_value", value);

    const options = reqOptions("POST", formData); // Assuming reqOptions returns RequestInit
    const api = `${API_HOST_URL}auth/username_email_available/`;

    const response = await fetch(api, options);
    const results: { message: string } = await response.json();
    return results.message;
  }

  // Handler for validating username or email
  const isUsernameValid = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    let validInput: boolean | null = null;

    if (names.includes("username")) {
      validInput = isValidAlphanumeric(e.target.value); // Assuming this returns boolean
    } else if (names === "email") {
      validInput = isValidEmail(e.target.value); // Assuming this returns boolean
    }

    if (!validInput && validInput !== null) {
      e.target.classList.add("ihub-is_invalid");
      setField({
        valid: false,
        note: names.includes("username")
          ? "Should contain only letters (a-z, A-Z) and numbers (0-9)."
          : "Please enter a valid email.",
      });
    } else {
      const usernameValid = await usernameEmailTaken(e.target.value);

      if (!usernameValid) {
        e.target.classList.add("ihub-is_invalid");
        setField({
          valid: false,
          note: `This ${names} is already taken. Please try a different ${names}.`,
        });
      } else {
        e.target.style.borderColor = "#69779B";
        e.target.classList.remove("ihub-is_invalid");
        setField({
          valid: true,
          note: "",
        });
      }
    }
  };

  // Effect to enable/disable submit button
  useEffect(() => {
    if (
      typeof document !== "undefined" &&
      document.querySelector("#SubmitBtn")
    ) {
      const submitBtn = document.querySelector<HTMLButtonElement>("#SubmitBtn");
      const errTags = document.querySelector(".ihub-is_invalid");
      if (submitBtn) {
        if (errTags || (!field.valid && !errTags)) {
          submitBtn.disabled = true;
        } else {
          submitBtn.disabled = false;
        }
      }
    }
  }, [field]);

  return (
    <div key={keys}>
      <TextField
        name={names}
        types={types}
        label={labels}
        required={requireds}
        onChange={isUsernameValid}
        note={field.note}
        TextTransform="lowercase"
      />
    </div>
  );
}
