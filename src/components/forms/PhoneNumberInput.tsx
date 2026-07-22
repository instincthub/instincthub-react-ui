"use client";
import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  E164_MAX_DIGITS,
  PHONE_COUNTRIES,
  PhoneCountryType,
  PhoneNumberValueType,
  buildPhoneValue,
  digitsOnly,
  maxNationalDigits,
  parsePhoneNumber,
  resolveCountry,
  searchCountries,
  withPreferredCountries,
} from "../lib/phoneUtils";

/** Kept for backwards compatibility with the previous default. */
const DEFAULT_PHONE_CODE = "234";

export interface PhoneNumberInputPropsType {
  /** Initial dial code. Accepts "234", "+234", "+1-242" or an ISO code. */
  phoneCode?: string;
  /**
   * Initial values. `mobile` may already contain a dial code
   * ("+2348031234567") — it is split automatically.
   */
  defaultValues?: {
    mobile?: string;
    phone_code?: string;
    [key: string]: any;
  };
  /** Name of the national number field. Defaults to "mobile". */
  names?: string;
  /** Name of the dial code field. Defaults to "phone_code". */
  phoneCodeName?: string;
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  noOptionsMessage?: string;
  note?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  /** Show the "+234 803 123 4567" preview line. Defaults to true. */
  showPreview?: boolean;
  /** ISO codes pinned to the top of the country list, e.g. ["NG", "GB"]. */
  preferredCountries?: string[];
  /**
   * Emit the current value once on mount so the dial code reaches form state
   * even when the user never opens the picker. Defaults to true.
   */
  emitOnMount?: boolean;
  /**
   * Legacy callback. Fired with `{ target: { name, value } }` for both the
   * dial code field and the number field.
   */
  inputEvent?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  /** Preferred callback — receives the fully parsed value. */
  onChange?: (value: PhoneNumberValueType) => void;
  /** Convenience setter that writes both fields into a form state object. */
  setFormData?: React.Dispatch<React.SetStateAction<any>>;
}

/**
 * Phone number input with a searchable country picker and paste parsing.
 *
 * @component
 * @example
 * ```jsx
 * import { PhoneNumberInput } from "@instincthub/react-ui";
 *
 * const [formData, setFormData] = useState({ mobile: "", phone_code: "" });
 *
 * <PhoneNumberInput
 *   phoneCode="+234"
 *   defaultValues={formData}
 *   names="mobile"
 *   preferredCountries={["NG", "GB", "US"]}
 *   onChange={(value) => {
 *     // value.phoneCode -> "+234"
 *     // value.nationalNumber -> "8031234567"
 *     // value.e164 -> "+2348031234567"   <- store this
 *     setFormData((prev) => ({ ...prev, ...value }));
 *   }}
 * />
 * ```
 *
 * Search the country list by name ("nigeria"), ISO code ("ng") or dial code
 * ("234" / "+234"). Pasting a full international number
 * ("+234 803 123 4567", "00234...", "2348031234567") selects the country and
 * fills in the remaining digits without truncation.
 */
const PhoneNumberInput: React.FC<PhoneNumberInputPropsType> = ({
  phoneCode,
  defaultValues,
  names = "mobile",
  phoneCodeName = "phone_code",
  label,
  placeholder = "Enter phone number",
  searchPlaceholder = "Search country or code",
  noOptionsMessage = "No country found",
  note,
  required = false,
  disabled = false,
  id,
  className = "",
  showPreview = true,
  preferredCountries,
  emitOnMount = true,
  inputEvent,
  onChange,
  setFormData,
}) => {
  const generatedId = useId();

  const countries = useMemo(
    () => withPreferredCountries(preferredCountries),
    [preferredCountries]
  );

  const initialise = (
    codeInput?: string | null,
    mobileInput?: string | null
  ): { country: PhoneCountryType; nationalNumber: string } => {
    const fallback =
      resolveCountry(codeInput) ||
      resolveCountry(DEFAULT_PHONE_CODE) ||
      PHONE_COUNTRIES[0];
    const parsed = parsePhoneNumber(mobileInput || "", {
      currentCountry: fallback,
      aggressive: true,
    });
    const country = parsed.country || fallback;
    return {
      country,
      nationalNumber: parsed.nationalNumber.slice(
        0,
        maxNationalDigits(country.dialCode)
      ),
    };
  };

  const initialCode = phoneCode ?? defaultValues?.phone_code;

  // Lazy initialisers so the country list is only scanned on first render.
  const [selectedCountry, setSelectedCountry] = useState<PhoneCountryType>(
    () => initialise(initialCode, defaultValues?.mobile).country
  );
  const [inputValue, setInputValue] = useState<string>(
    () => initialise(initialCode, defaultValues?.mobile).nationalNumber
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Callbacks are read through refs so emitting never re-subscribes effects.
  const callbacksRef = useRef({ inputEvent, onChange, setFormData });
  callbacksRef.current = { inputEvent, onChange, setFormData };

  const currentValue = useMemo(
    () => buildPhoneValue(selectedCountry, inputValue),
    [selectedCountry, inputValue]
  );

  const filteredCountries = useMemo(
    () => searchCountries(searchTerm, countries),
    [searchTerm, countries]
  );

  const emit = (country: PhoneCountryType, nationalNumber: string) => {
    const value = buildPhoneValue(country, nationalNumber);
    const { inputEvent: legacy, onChange: change, setFormData: setForm } =
      callbacksRef.current;

    change?.(value);

    setForm?.((previous: any) => ({
      ...previous,
      [names]: value.nationalNumber,
      [phoneCodeName]: value.phoneCode,
    }));

    if (legacy) {
      legacy(syntheticEvent(phoneCodeName, value.phoneCode));
      legacy(syntheticEvent(names, value.nationalNumber));
    }
  };

  /**
   * Apply raw text to the field.
   * `aggressive` also detects a dial code that was typed without a "+".
   * `normalize` rewrites the display as plain digits.
   */
  const applyInput = (
    raw: string,
    { aggressive = false, normalize = false } = {}
  ) => {
    const parsed = parsePhoneNumber(raw, {
      currentCountry: selectedCountry,
      aggressive,
    });
    const country = parsed.country || selectedCountry;
    const limit = maxNationalDigits(country.dialCode);

    if (parsed.matchedCountryCode || normalize) {
      const nationalNumber = parsed.nationalNumber.slice(0, limit);
      setSelectedCountry(country);
      setInputValue(nationalNumber);
      emit(country, nationalNumber);
      return;
    }

    // No dial code recognised yet. Keep what was typed so a partial "+2" stays
    // visible, and cap at the absolute E.164 ceiling rather than the national
    // limit — the text may still carry a dial code that blur will strip.
    const display = capDigits(sanitizeTyping(raw), E164_MAX_DIGITS);
    setInputValue(display);
    emit(country, digitsOnly(display).slice(0, limit));
  };

  const handleNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    applyInput(event.target.value);
  };

  /**
   * Paste is intercepted so the browser never truncates the pasted text, and
   * so a pasted dial code is recognised even without a leading "+".
   */
  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData?.getData("text") ?? "";
    if (!pasted) return;

    event.preventDefault();
    const input = event.currentTarget;
    const start = input.selectionStart ?? inputValue.length;
    const end = input.selectionEnd ?? inputValue.length;
    const merged = inputValue.slice(0, start) + pasted + inputValue.slice(end);

    applyInput(merged, { aggressive: true, normalize: true });
  };

  const handleNumberBlur = () => {
    setIsTouched(true);
    applyInput(inputValue, { aggressive: true, normalize: true });
  };

  const handleSelectCountry = (country: PhoneCountryType) => {
    const nationalNumber = digitsOnly(inputValue).slice(
      0,
      maxNationalDigits(country.dialCode)
    );

    setSelectedCountry(country);
    setInputValue(nationalNumber);
    emit(country, nationalNumber);
    closeDropdown();
    triggerRef.current?.focus();
  };

  const openDropdown = () => {
    if (disabled) return;
    setSearchTerm("");
    setHighlightedIndex(
      Math.max(
        0,
        countries.findIndex(
          (country) => country.isoCode === selectedCountry.isoCode
        )
      )
    );
    setIsOpen(true);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    setSearchTerm("");
    setHighlightedIndex(0);
  };

  const handleTriggerKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (["ArrowDown", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      openDropdown();
    }
  };

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((index) =>
        Math.min(index + 1, filteredCountries.length - 1)
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Home") {
      event.preventDefault();
      setHighlightedIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setHighlightedIndex(Math.max(0, filteredCountries.length - 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const country = filteredCountries[highlightedIndex];
      if (country) handleSelectCountry(country);
    } else if (event.key === "Escape" || event.key === "Tab") {
      closeDropdown();
      triggerRef.current?.focus();
    }
  };

  // Close on outside click.
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Focus the search field when the list opens.
  useEffect(() => {
    if (isOpen) searchInputRef.current?.focus();
  }, [isOpen]);

  // Reset the highlight whenever the result set changes.
  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchTerm]);

  // Keep the highlighted option in view.
  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const option = listRef.current.querySelector<HTMLLIElement>(
      `[data-index="${highlightedIndex}"]`
    );
    option?.scrollIntoView({ block: "nearest" });
  }, [highlightedIndex, isOpen]);

  // Publish the initial value so the dial code reaches form state even when
  // the picker is never touched.
  const hasEmittedOnMount = useRef(false);
  useEffect(() => {
    if (!emitOnMount || hasEmittedOnMount.current) return;
    hasEmittedOnMount.current = true;
    emit(selectedCountry, inputValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emitOnMount]);

  // Re-hydrate when defaults arrive late (e.g. after an API fetch). Skipped
  // when the incoming values already match state, so this cannot loop.
  const syncedDefaultsRef = useRef({
    mobile: defaultValues?.mobile ?? "",
    phoneCode: initialCode ?? "",
  });
  useEffect(() => {
    const incomingMobile = defaultValues?.mobile ?? "";
    const incomingCode = phoneCode ?? defaultValues?.phone_code ?? "";

    if (
      incomingMobile === syncedDefaultsRef.current.mobile &&
      incomingCode === syncedDefaultsRef.current.phoneCode
    ) {
      return;
    }
    syncedDefaultsRef.current = {
      mobile: incomingMobile,
      phoneCode: incomingCode,
    };

    const next = initialise(incomingCode, incomingMobile);
    const isUnchanged =
      next.nationalNumber === digitsOnly(inputValue) &&
      next.country.isoCode === selectedCountry.isoCode;
    if (isUnchanged) return;

    setSelectedCountry(next.country);
    setInputValue(next.nationalNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues?.mobile, defaultValues?.phone_code, phoneCode]);

  const showError = isTouched && Boolean(inputValue) && !currentValue.isValid;
  // `names` is not unique across instances, so fall back to a generated id.
  const inputId = id || `ihub-phone-${names}-${generatedId}`;

  return (
    <div
      className={`ihub-react-phone-input ${className}`.trim()}
      ref={wrapperRef}
    >
      {label && (
        <label className="ihub-phone-label" htmlFor={inputId}>
          {label}
          {required && <span className="ihub-required"> *</span>}
        </label>
      )}

      {/* Positioning context for the dropdown, so it anchors to the input
          row rather than to the note and preview lines below it. */}
      <div className="ihub-phone-field">
        <div
          className={`ihub-target-phone ${
            showError ? "ihub-phone-invalid" : ""
          } ${disabled ? "ihub-phone-disabled" : ""}`.trim()}
        >
          <button
            type="button"
            ref={triggerRef}
            className="ihub-country-trigger"
            onClick={() => (isOpen ? closeDropdown() : openDropdown())}
            onKeyDown={handleTriggerKeyDown}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-label={`Country code: ${selectedCountry.name} +${selectedCountry.dialCode}`}
          >
            <span className="ihub-c-flag">{selectedCountry.flag}</span>
            <span className="ihub-c-code">+{selectedCountry.dialCode}</span>
            <KeyboardArrowDownOutlinedIcon className="ihub-c-caret" />
          </button>

          <input
            type="tel"
            id={inputId}
            name={names}
            value={inputValue}
            onChange={handleNumberChange}
            onPaste={handlePaste}
            onBlur={handleNumberBlur}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            autoComplete="tel-national"
            inputMode="tel"
            className="ihub-phone-input"
          />
        </div>

        {/* Ensures a native form submit carries the dial code. */}
        <input
          type="hidden"
          name={phoneCodeName}
          value={currentValue.phoneCode}
        />

        {isOpen && (
          <div className="ihub-country-dropdown">
            <div className="ihub-country-search-wrapper">
              <SearchOutlinedIcon className="ihub-country-search-icon" />
              <input
                type="text"
                ref={searchInputRef}
                className="ihub-country-search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
              />
            </div>

            {filteredCountries.length > 0 ? (
              <ul className="ihub-country-list" role="listbox" ref={listRef}>
                {filteredCountries.map((country, index) => (
                  <li
                    key={country.isoCode}
                    data-index={index}
                    role="option"
                    aria-selected={country.isoCode === selectedCountry.isoCode}
                    className={`ihub-country-option ${
                      index === highlightedIndex
                        ? "ihub-country-highlighted"
                        : ""
                    } ${
                      country.isoCode === selectedCountry.isoCode
                        ? "ihub-country-selected"
                        : ""
                    }`.trim()}
                    onMouseDown={(event) => event.preventDefault()}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onClick={() => handleSelectCountry(country)}
                  >
                    <span className="ihub-c-flag">{country.flag}</span>
                    <span className="ihub-c-name">{country.name}</span>
                    <span className="ihub-c-code">+{country.dialCode}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="ihub-country-empty">{noOptionsMessage}</p>
            )}
          </div>
        )}
      </div>

      {note && !showError && <p className="ihub-phone-note">{note}</p>}

      {showError && (
        <p className="ihub-phone-error">
          Enter a valid {selectedCountry.name} phone number.
        </p>
      )}

      {showPreview && inputValue && (
        <p className="ihub-make-bold">{currentValue.formatted}</p>
      )}
    </div>
  );
};

/** Keep only "+" (leading), digits and common separators while typing. */
const sanitizeTyping = (text: string): string => {
  const trimmed = String(text ?? "").trimStart();
  const hasLeadingPlus = trimmed.startsWith("+");
  const rest = trimmed.replace(/[^\d\s()\-]/g, "");
  return `${hasLeadingPlus ? "+" : ""}${rest}`;
};

/** Cap the number of digits without dropping the separators around them. */
const capDigits = (text: string, limit: number): string => {
  let digitCount = 0;
  let output = "";

  for (const character of text) {
    if (/\d/.test(character)) {
      if (digitCount >= limit) continue;
      digitCount += 1;
    }
    output += character;
  }
  return output;
};

/** Minimal event shape for the legacy `inputEvent` callback. */
const syntheticEvent = (name: string, value: string) =>
  ({
    target: { name, value },
    currentTarget: { name, value },
    preventDefault: () => undefined,
    stopPropagation: () => undefined,
  } as unknown as React.ChangeEvent<HTMLInputElement>);

export default PhoneNumberInput;
