# PhoneNumberInput Component

International phone number input with a searchable country picker and paste-aware country code detection.

Full documentation: [docs/static-docs/components/PhoneNumberInput.md](../../../../docs/static-docs/components/PhoneNumberInput.md)

## Props

### PhoneNumberInputPropsType
- `phoneCode?: string` - Initial dial code. Accepts `"234"`, `"+234"`, `"+1-242"` or an ISO code (`"NG"`)
- `defaultValues?: object` - Initial values
  - `mobile?: string` - Initial number; may include a dial code (`"+2348031234567"`)
  - `phone_code?: string` - Initial dial code, used when `phoneCode` is not given
- `names?: string` - Name of the national number field (default `"mobile"`)
- `phoneCodeName?: string` - Name of the dial code field (default `"phone_code"`)
- `label?: string` - Field label
- `placeholder?: string` - Number input placeholder
- `searchPlaceholder?: string` - Country search placeholder
- `noOptionsMessage?: string` - Empty search result message
- `note?: string` - Helper text
- `required?: boolean` / `disabled?: boolean`
- `id?: string` / `className?: string`
- `showPreview?: boolean` - Show the formatted preview line (default `true`)
- `preferredCountries?: string[]` - ISO codes pinned to the top of the list
- `emitOnMount?: boolean` - Emit the initial value once on mount (default `true`)
- `onChange?: (value: PhoneNumberValueType) => void` - Preferred callback
- `setFormData?: React.Dispatch<React.SetStateAction<any>>` - Writes both fields into form state
- `inputEvent?: function` - Legacy callback, fired for both fields

## Usage

```tsx
"use client";
import React, { useState } from "react";
import { PhoneNumberInput, PhoneNumberValueType } from "@instincthub/react-ui";

const ContactForm: React.FC = () => {
  const [phone, setPhone] = useState<PhoneNumberValueType | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!phone?.isValid) return;

    // Store the E.164 form, or the two fields separately.
    console.log(phone.e164); // "+2348031234567"
    console.log(phone.phoneCode); // "+234"
    console.log(phone.nationalNumber); // "8031234567"
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Contact Information</h2>

      <PhoneNumberInput
        label="Phone number"
        names="mobile"
        preferredCountries={["NG", "GB", "US"]}
        onChange={setPhone}
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};
```

## Emitted value

```ts
interface PhoneNumberValueType {
  phoneCode: string; // "+234"
  dialCode: string; // "234"
  nationalNumber: string; // "8031234567"
  e164: string; // "+2348031234567"
  formatted: string; // "+234 803 123 4567"
  isoCode: string; // "NG"
  countryName: string; // "Nigeria"
  flag: string; // "🇳🇬"
  isValid: boolean;
}
```

## Behaviour notes

- Search the country list by name (`nigeria`), ISO code (`ng`) or dial code (`234` / `+234`).
- Pasting `+234 803 123 4567`, `2348031234567`, `002348031234567` or `+1 (212) 555-1234` selects
  the country and keeps every digit. Paste is intercepted so the browser cannot truncate it.
- A leading trunk `0` (`08031234567`) is stripped; the selected country is kept.
- The dial code is emitted on mount, so `phone_code` reaches form state even when the picker is
  never opened. A hidden input also carries it through native form submits.
- Options are keyed by ISO code, so countries sharing a dial code (US/CA, IT/VA) stay distinct.
- The country dataset stores `phonecode` inconsistently (`"234"`, `"+1-242"`, `"0055"`,
  `"+1-787 and 1-939"`). Always compare against the normalised `dialCode`, never the raw
  `phonecode`.

## Related utilities

`parsePhoneNumber`, `buildPhoneValue`, `resolveCountry`, `searchCountries`, `normalizeDialCode`,
`formatNationalNumber`, `maxNationalDigits` and `PHONE_COUNTRIES` are exported from
`@instincthub/react-ui/lib`.
