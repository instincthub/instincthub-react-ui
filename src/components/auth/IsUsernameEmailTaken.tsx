"use client";

import { useEffect, useState, useCallback, useRef, ChangeEvent } from "react";
import TextField from "../forms/TextField";
import {
  API_HOST_URL,
  isValidAlphanumeric,
  isValidEmail,
  reqOptions,
} from "../lib/helpFunction";

// Define props interface
interface IsUsernameEmailTakenProps {
  name: "username" | "channel" | "email" | string;
  type: string;
  label: string;
  required?: boolean;
  key?: string | number;
  setIsValid?: (isValid: boolean) => void;
  /** Custom API URL for availability checking. Defaults to `${API_HOST_URL}auth/username_email_available/` */
  apiUrl?: string;
  /**
   * Raw display name used to auto-generate a username and suggestions.
   * When provided, the component slugifies the name into the input field
   * automatically. If that slug is taken, clickable alternatives appear.
   */
  rawName?: string;
}

// Define state interface
interface FieldState {
  note: string;
  valid: boolean;
}

/**
 * Slugifies a raw name into a URL-safe, lowercase, hyphenated string.
 * @param name - The display name to slugify
 * @returns A slug suitable for a username/channel handle
 */
function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Generates username suggestions from a raw name using hyphens.
 * @param rawName - The display name to derive suggestions from
 * @param base - The username the user originally typed or the auto-generated slug
 * @returns Array of unique suggestion strings
 */
function generateSuggestions(rawName: string, base: string): string[] {
  const parts = rawName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) return [];

  const first = parts[0];
  const last = parts.length > 1 ? parts[parts.length - 1] : "";
  const year = new Date().getFullYear().toString().slice(-2);
  const rand = Math.floor(Math.random() * 900 + 100);

  const candidates: string[] = [];

  if (first && last) {
    candidates.push(`${first}${last}`);
    candidates.push(`${first}-${last}`);
    candidates.push(`${first}${last}${year}`);
    candidates.push(`${last}-${first}`);
    candidates.push(`${first}-${last}-${year}`);
    candidates.push(`${first}${rand}`);
  } else {
    candidates.push(`${first}${year}`);
    candidates.push(`${first}${rand}`);
    candidates.push(`${first}-hub`);
    candidates.push(`${first}-${year}`);
  }

  if (base) {
    candidates.push(`${base}${year}`);
    candidates.push(`${base}-${rand}`);
  }

  // Deduplicate and remove the original base
  const unique = [...new Set(candidates)].filter(
    (s) => s !== base.toLowerCase() && s.length >= 3
  );
  return unique.slice(0, 4);
}

/**
 * Real-time username/email availability checker with auto-generation
 * from a raw name and clickable suggestions when taken.
 *
 * @example
 * <IsUsernameEmailTaken
 *   name="channel"
 *   type="text"
 *   label="Channel Handle"
 *   required
 *   rawName={companyName}
 *   apiUrl={`${API_HOST_URL}companies/username_available/`}
 *   setIsValid={setIsValid}
 * />
 */
export default function IsUsernameEmailTaken(
  props: IsUsernameEmailTakenProps
) {
  const {
    name,
    type,
    label,
    required,
    key,
    setIsValid,
    apiUrl,
    rawName,
  } = props;

  const [field, setField] = useState<FieldState>({ note: "", valid: false });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rawNameDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Track the last rawName slug we auto-populated so we don't re-trigger on the same value
  const lastAutoSlugRef = useRef<string>("");

  const resolvedApiUrl =
    apiUrl || `${API_HOST_URL}auth/username_email_available/`;

  /** Finds the actual <input> element inside the wrapper. */
  const getInput = useCallback((): HTMLInputElement | null => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return null;
    return wrapper.querySelector("input");
  }, []);

  /** Checks if a value is available via the API. */
  const checkAvailability = useCallback(
    async (value: string): Promise<boolean> => {
      try {
        const formData = new FormData();
        formData.append("field", name);
        formData.append("field_value", value);

        const options = reqOptions("POST", formData);
        const response = await fetch(resolvedApiUrl, options);
        const results: { message: string | boolean } = await response.json();
        return !!results.message;
      } catch {
        return false;
      }
    },
    [name, resolvedApiUrl]
  );

  /**
   * Sets the input value programmatically and triggers an input event
   * so React's onChange fires.
   */
  const applyValue = useCallback(
    (value: string) => {
      const input = getInput();
      if (!input) return;

      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      nativeInputValueSetter?.call(input, value);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    },
    [getInput]
  );

  /**
   * Validates a value against the API with debounce, then updates field state
   * and generates suggestions if taken.
   */
  const validateValue = useCallback(
    (value: string, inputEl: HTMLInputElement | null) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(async () => {
        const available = await checkAvailability(value);

        if (!available) {
          inputEl?.classList.add("ihub-is_invalid");
          setIsValid?.(false);

          const newSuggestions = rawName
            ? generateSuggestions(rawName, value)
            : [];
          setSuggestions(newSuggestions);

          setField({
            valid: false,
            note: `This ${name === "channel" ? "handle" : name} is already taken.${
              newSuggestions.length > 0 ? " Try one of these:" : ""
            }`,
          });
        } else {
          if (inputEl) {
            inputEl.style.borderColor = "#69779B";
            inputEl.classList.remove("ihub-is_invalid");
          }
          setIsValid?.(true);
          setSuggestions([]);
          setField({ valid: true, note: "" });
        }
      }, 500);
    },
    [name, rawName, checkAvailability, setIsValid]
  );

  /** onChange handler for the TextField. */
  const handleChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
      const value = e.target.value.trim();
      setSuggestions([]);

      if (!value) {
        setField({ note: "", valid: false });
        setIsValid?.(false);
        return;
      }

      // Client-side format validation
      let validInput: boolean | null = null;

      if (name === "channel") {
        // Channels/slugs allow letters, numbers, and hyphens
        validInput = value.length >= 3 && /^[a-zA-Z0-9-]+$/.test(value);
      } else if (name.includes("username")) {
        validInput = isValidAlphanumeric(value);
      } else if (name === "email") {
        validInput = isValidEmail(value);
      }

      if (validInput === false) {
        e.target.classList.add("ihub-is_invalid");
        setIsValid?.(false);
        setField({
          valid: false,
          note:
            name === "email"
              ? "Please enter a valid email."
              : name === "channel"
              ? "Should contain only letters, numbers, and hyphens (min 3 characters)."
              : "Should contain only letters (a-z, A-Z) and numbers (0-9).",
        });
        return;
      }

      validateValue(value, e.target);
    },
    [name, setIsValid, validateValue]
  );

  /**
   * Auto-generate username from rawName when it changes.
   * Debounced at 600ms so we don't fire on every keystroke.
   */
  useEffect(() => {
    if (!rawName) return;

    const slug = slugify(rawName);
    if (!slug || slug === lastAutoSlugRef.current) return;

    if (rawNameDebounceRef.current) clearTimeout(rawNameDebounceRef.current);

    rawNameDebounceRef.current = setTimeout(() => {
      lastAutoSlugRef.current = slug;
      applyValue(slug);
    }, 600);

    return () => {
      if (rawNameDebounceRef.current) clearTimeout(rawNameDebounceRef.current);
    };
  }, [rawName, applyValue]);

  // Enable/disable submit button
  useEffect(() => {
    if (typeof document === "undefined") return;
    const submitBtn =
      document.querySelector<HTMLButtonElement>("#SubmitBtn");
    if (!submitBtn) return;
    const errTags = document.querySelector(".ihub-is_invalid");
    submitBtn.disabled = !!(errTags || !field.valid);
  }, [field]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (rawNameDebounceRef.current) clearTimeout(rawNameDebounceRef.current);
    };
  }, []);

  return (
    <div key={key} ref={wrapperRef}>
      <TextField
        name={name}
        type={type}
        label={label}
        required={required}
        onChange={handleChange}
        note={field.note}
        TextTransform="lowercase"
      />

      {suggestions.length > 0 && (
        <div className="ihub-username-suggestions">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              className="ihub-username-suggestion"
              onClick={() => applyValue(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <style>{`
        .ihub-username-suggestions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 6px;
          margin-bottom: 8px;
        }
        .ihub-username-suggestion {
          padding: 4px 12px;
          font-size: 13px;
          border: 1px solid #00838f;
          background: rgba(0, 131, 143, 0.08);
          color: #00838f;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.15s ease;
          font-weight: 500;
        }
        .ihub-username-suggestion:hover {
          background: #00838f;
          color: #fff;
        }
      `}</style>
    </div>
  );
}
