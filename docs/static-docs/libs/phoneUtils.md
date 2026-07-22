# phoneUtils

**Category:** Validation Functions | **Type:** library

Parse, normalise and validate international phone numbers. Powers [PhoneNumberInput](../components/PhoneNumberInput.md), but usable on its own for server payloads, bulk imports and data cleanup.

```ts
import {
  parsePhoneNumber,
  buildPhoneValue,
  resolveCountry,
  searchCountries,
  normalizeDialCode,
  formatNationalNumber,
  maxNationalDigits,
  digitsOnly,
  findCountryByIso,
  findCountryByDialCode,
  matchDialCode,
  withPreferredCountries,
  PHONE_COUNTRIES,
  E164_MAX_DIGITS,
  MIN_NATIONAL_DIGITS,
  MAX_NATIONAL_DIGITS,
} from "@instincthub/react-ui/lib";
```

## Why it exists

The bundled `countryObjects` dataset stores `phonecode` in four different shapes:

| Country | Raw `phonecode` | Normalised `dialCode` |
|---------|-----------------|------------------------|
| Nigeria | `"234"` | `"234"` |
| Bahamas | `"+1-242"` | `"1242"` |
| Brazil | `"0055"` | `"55"` |
| Puerto Rico | `"+1-787 and 1-939"` | `"1787"` |

Comparing against the raw field silently fails for a quarter of the list. Always use `dialCode`.

## `PHONE_COUNTRIES`

Every country from `countryObjects`, augmented with a digits-only `dialCode` and sorted by name.

```ts
PHONE_COUNTRIES[0];
// { name: "Afghanistan", isoCode: "AF", flag: "🇦🇫", phonecode: "93", dialCode: "93", ... }
```

## `normalizeDialCode(phonecode)`

Reduces any raw dial code to digits.

```ts
normalizeDialCode("234");               // "234"
normalizeDialCode("+1-242");            // "1242"
normalizeDialCode("0055");              // "55"
normalizeDialCode("+1-787 and 1-939");  // "1787"
```

## `resolveCountry(value, preferIso?)`

Resolves a country from a dial code, an ISO code or a name.

```ts
resolveCountry("234").isoCode;      // "NG"
resolveCountry("+234").isoCode;     // "NG"
resolveCountry("NG").isoCode;       // "NG"
resolveCountry("Nigeria").isoCode;  // "NG"
resolveCountry("+1-242").isoCode;   // "BS"
```

When several countries share a dial code, `preferIso` wins if it is one of them; otherwise the most populous holder is used (`"1"` → US, `"7"` → RU, `"44"` → GB, and so on).

## `parsePhoneNumber(raw, options?)`

Splits a number into a country and a national number.

```ts
parsePhoneNumber("+234 803 123 4567");
// { country: <Nigeria>, dialCode: "234", nationalNumber: "8031234567", matchedCountryCode: true }

parsePhoneNumber("08031234567");
// { nationalNumber: "8031234567", matchedCountryCode: false }   <- trunk "0" stripped
```

Options:

| Option | Type | Description |
|--------|------|-------------|
| `currentCountry` | `PhoneCountryType` | Breaks ties on shared dial codes and anchors the non-international branch |
| `aggressive` | `boolean` | Also detect a dial code typed without a `+` |

Behaviour:

- `+234…` or `00234…` always attempts a dial code match, longest prefix first — `+1242…` is the Bahamas, not the US.
- A leading `0` is treated as a trunk prefix and dropped; the country is left alone.
- Without `aggressive`, anything else is returned as-is. This is what makes typing stable: keying in `23480312` does not suddenly jump to Nigeria mid-entry.
- With `aggressive`, a bare `2348031234567` is split when it starts with `currentCountry.dialCode`, or when it exceeds `MAX_NATIONAL_DIGITS` (11) and matches some dial code. The length guard stops a US number like `2125551234` being read as Morocco (`+212`).

## `buildPhoneValue(country, nationalNumber)`

Builds the object you store or submit.

```ts
buildPhoneValue(resolveCountry("NG"), "8031234567");
// {
//   phoneCode: "+234",
//   dialCode: "234",
//   nationalNumber: "8031234567",
//   e164: "+2348031234567",
//   formatted: "+234 803 123 4567",
//   isoCode: "NG",
//   countryName: "Nigeria",
//   flag: "🇳🇬",
//   isValid: true,
// }
```

`isValid` requires between `MIN_NATIONAL_DIGITS` (4) and `maxNationalDigits(dialCode)` digits. `e164` is an empty string when there is no number.

## `maxNationalDigits(dialCode)`

E.164 caps a full number at 15 digits, so the national allowance depends on the dial code.

```ts
maxNationalDigits("234"); // 12
maxNationalDigits("1");   // 14
```

## `searchCountries(query, countries?)`

Ranked filter — exact name, then ISO code, then name prefix, then exact dial code, then dial code prefix, then name substring.

```ts
searchCountries("nigeria")[0].isoCode; // "NG"
searchCountries("ng")[0].isoCode;      // "NG"
searchCountries("234")[0].isoCode;     // "NG"
searchCountries("+234")[0].isoCode;    // "NG"
searchCountries("")                    // all 250, unchanged
```

## `withPreferredCountries(isoCodes, countries?)`

Moves the given ISO codes to the front, in the order supplied, without duplicating them.

```ts
withPreferredCountries(["NG", "GB", "US"]).slice(0, 3).map((c) => c.isoCode);
// ["NG", "GB", "US"]
```

## Other helpers

| Function | Description |
|----------|-------------|
| `digitsOnly(value)` | Strips every non-digit |
| `formatNationalNumber(number)` | `"8031234567"` → `"803 123 4567"` |
| `findCountryByIso(iso)` | Exact ISO lookup, case-insensitive |
| `findCountryByDialCode(dialCode, preferIso?)` | Resolves a shared dial code to one country |
| `matchDialCode(digits, preferIso?)` | Longest-prefix dial code match on a digits-only string |

## Cleaning stored numbers

```ts
import { parsePhoneNumber, buildPhoneValue, resolveCountry } from "@instincthub/react-ui/lib";

const toE164 = (stored: string, fallbackIso = "NG") => {
  const fallback = resolveCountry(fallbackIso);
  const parsed = parsePhoneNumber(stored, {
    currentCountry: fallback,
    aggressive: true,
  });
  const value = buildPhoneValue(parsed.country || fallback, parsed.nationalNumber);
  return value.isValid ? value.e164 : null;
};

toE164("0803 123 4567");     // "+2348031234567"
toE164("+44 7911 123456");   // "+447911123456"
toE164("123");               // null
```

## 🔗 Related

- [PhoneNumberInput](../components/PhoneNumberInput.md) - the component built on these helpers
- [helpFunction](./helpFunction.md) - general string and validation utilities
