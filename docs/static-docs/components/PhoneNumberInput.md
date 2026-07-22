# PhoneNumberInput

**Category:** Forms | **Type:** component

Phone number input with a searchable country picker, paste-aware country code detection, and a value object that always carries the dial code.

## 🏷️ Tags

`forms`, `input`, `phone`, `international`, `country-code`, `validation`

## 🚀 Quick Start

```tsx
"use client";
import React, { useState } from "react";
import { PhoneNumberInput, PhoneNumberValueType } from "@instincthub/react-ui";

const Example = () => {
  const [phone, setPhone] = useState<PhoneNumberValueType | null>(null);

  return (
    <PhoneNumberInput
      label="Phone number"
      names="mobile"
      preferredCountries={["NG", "GB", "US"]}
      onChange={setPhone}
    />
  );
};
```

`onChange` receives:

```ts
{
  phoneCode: "+234",              // display form of the dial code
  dialCode: "234",                // digits only
  nationalNumber: "8031234567",   // no dial code, no trunk "0"
  e164: "+2348031234567",         // store this
  formatted: "+234 803 123 4567", // human readable
  isoCode: "NG",
  countryName: "Nigeria",
  flag: "🇳🇬",
  isValid: true,
}
```

## 🔍 Searching for a country

The picker opens on click, on `Enter`, on `Space` or on `ArrowDown`. The search box matches on:

| You type | Matches |
|----------|---------|
| `nigeria` | Country name (exact match ranks first) |
| `niger` | Any country whose name contains it |
| `ng` | ISO code |
| `234` | Dial code |
| `+234` | Dial code (the `+` is ignored) |

Keyboard: `ArrowUp` / `ArrowDown` to move, `Home` / `End` to jump, `Enter` to select, `Escape` to close.

## 📋 Pasting a number

Paste is intercepted so the browser cannot truncate it, and the country code is extracted when present.

| Pasted | Country | National number |
|--------|---------|-----------------|
| `+234 803 123 4567` | Nigeria | `8031234567` |
| `+2348031234567` | Nigeria | `8031234567` |
| `2348031234567` | Nigeria | `8031234567` |
| `002348031234567` | Nigeria | `8031234567` |
| `+1 (212) 555-1234` | United States | `2125551234` |
| `+1 242 555 1234` | Bahamas | `5551234` |
| `08031234567` | unchanged | `8031234567` |
| `8031234567` | unchanged | `8031234567` |

Matching is longest-prefix, so `+1242…` resolves to the Bahamas rather than the United States. When several countries share a dial code, the currently selected one wins — pasting `+1 514 555 1234` while Canada is selected keeps Canada.

A number without a `+` is only split when it starts with the selected country's dial code, or when it is longer than any plausible national number (11 digits). This keeps a US number like `2125551234` from being read as Morocco (`+212`).

## 💾 Getting the country code into your database

Three options, in order of preference.

### 1. `onChange` (recommended)

```tsx
const [formData, setFormData] = useState({});

<PhoneNumberInput
  names="mobile"
  onChange={(value) =>
    setFormData((prev) => ({
      ...prev,
      phone_code: value.phoneCode,
      mobile: value.nationalNumber,
      phone_e164: value.e164,
    }))
  }
/>
```

### 2. `setFormData`

Writes `names` and `phoneCodeName` straight into a form state object.

```tsx
const [formData, setFormData] = useState({});

<PhoneNumberInput
  names="mobile"
  phoneCodeName="phone_code"
  defaultValues={formData}
  setFormData={setFormData}
/>

// formData = { mobile: "8031234567", phone_code: "+234" }
```

### 3. `inputEvent` (legacy)

Fires with `{ target: { name, value } }` for **both** fields, and once on mount so `phone_code` is present even when the picker is never opened.

```tsx
const handleInputChange = (event) => {
  const { name, value } = event.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

<PhoneNumberInput
  phoneCode="+234"
  defaultValues={formData}
  names="mobile"
  inputEvent={handleInputChange}
/>
```

> The dial code arrives under the name given by `phoneCodeName` (default `phone_code`), not `phoneCode`.

A hidden `<input name={phoneCodeName}>` is also rendered, so a native (non-React) form submit carries the country code.

## 🔄 Loading a stored number

`defaultValues.mobile` is parsed, so a value stored as E.164 is split back into the picker and the field. Late-arriving props (an API response after first paint) re-hydrate the field.

```tsx
const [record, setRecord] = useState({});

useEffect(() => {
  fetchUser().then((user) => setRecord({ mobile: user.phone })); // "+447911123456"
}, []);

<PhoneNumberInput names="mobile" defaultValues={record} />
// -> United Kingdom selected, field shows 7911123456
```

## 📋 Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `phoneCode` | `string` | `"234"` | Initial dial code. Accepts `"234"`, `"+234"`, `"+1-242"` or an ISO code like `"NG"` |
| `defaultValues` | `{ mobile?: string; phone_code?: string; [key: string]: any }` | `{}` | Initial values. `mobile` may include a dial code |
| `names` | `string` | `"mobile"` | Name of the national number field |
| `phoneCodeName` | `string` | `"phone_code"` | Name of the dial code field |
| `label` | `string` | - | Field label |
| `placeholder` | `string` | `"Enter phone number"` | Number input placeholder |
| `searchPlaceholder` | `string` | `"Search country or code"` | Country search placeholder |
| `noOptionsMessage` | `string` | `"No country found"` | Shown when the search returns nothing |
| `note` | `string` | - | Helper text below the field |
| `required` | `boolean` | `false` | Marks the number input required |
| `disabled` | `boolean` | `false` | Disables the picker and the input |
| `id` | `string` | `ihub-phone-{names}` | Input id, linked to the label |
| `className` | `string` | `""` | Extra class on the wrapper |
| `showPreview` | `boolean` | `true` | Show the `+234 803 123 4567` preview line |
| `preferredCountries` | `string[]` | - | ISO codes pinned to the top of the list |
| `emitOnMount` | `boolean` | `true` | Emit the initial value once on mount |
| `onChange` | `(value: PhoneNumberValueType) => void` | - | Preferred callback |
| `setFormData` | `React.Dispatch<React.SetStateAction<any>>` | - | Writes both fields into form state |
| `inputEvent` | `(event: React.ChangeEvent<HTMLInputElement \| HTMLSelectElement>) => void` | - | Legacy callback |

## ✅ Validation

`isValid` is true when the national number has between 4 digits and `15 - dialCode.length` digits (the E.164 ceiling). The field shows an inline error after blur when a number is present but invalid.

```tsx
<PhoneNumberInput
  names="mobile"
  required
  onChange={(value) => {
    setPhone(value);
    setCanSubmit(value.isValid);
  }}
/>
```

Input is capped by digit count rather than character count, so separators you type or paste never eat into the allowance.

## 🧰 Related utilities

Exported from `@instincthub/react-ui/lib` if you need to parse phone numbers outside the component:

```ts
import {
  parsePhoneNumber,
  buildPhoneValue,
  resolveCountry,
  searchCountries,
  normalizeDialCode,
  formatNationalNumber,
  maxNationalDigits,
  PHONE_COUNTRIES,
} from "@instincthub/react-ui/lib";

resolveCountry("+234");                       // Nigeria
parsePhoneNumber("+2348031234567");           // { country: NG, nationalNumber: "8031234567", ... }
buildPhoneValue(resolveCountry("NG"), "8031234567").e164;  // "+2348031234567"
normalizeDialCode("+1-242");                  // "1242"
```

`normalizeDialCode` exists because the country dataset stores `phonecode` inconsistently — `"234"`, `"+1-242"`, `"0055"` and `"+1-787 and 1-939"` all appear. Always compare against `dialCode`, never the raw `phonecode`.

## 🎨 Features

- **Searchable country picker**: 250 countries filtered by name, ISO code or dial code
- **Paste parsing**: extracts the country code from any pasted format, without truncating
- **Country code always emitted**: including once on mount, plus a hidden field for native submits
- **Keyboard accessible**: full arrow/Enter/Escape navigation, `role="listbox"` semantics
- **Correct for shared dial codes**: options are keyed by ISO code, so US and Canada are distinct
- **E.164 aware**: per-country digit limits and validity
- **Theme aware**: uses CSS variables, so dark mode works out of the box

## 🔗 Related Components

- [InputText](./InputText.md) - Basic text input field
- [InputNumber](./InputNumber.md) - Numeric input field
- [CountryInput](./CountryInput.md) - Country selection input
- [Dropdown](./Dropdown.md) - Generic searchable single/multi select
- [SubmitButton](./SubmitButton.md) - Form submission button
