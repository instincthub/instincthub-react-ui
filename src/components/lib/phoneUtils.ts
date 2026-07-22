import countryObjects from "./json/countryObjects";

/**
 * A country entry augmented with a normalised, digits-only dial code.
 * The raw dataset stores `phonecode` inconsistently ("234", "+1-242",
 * "0055", "+1-787 and 1-939"), so `dialCode` is the value to rely on.
 */
export interface PhoneCountryType {
  name: string;
  isoCode: string;
  flag: string;
  phonecode: string;
  dialCode: string;
  [key: string]: any;
}

export interface ParsedPhoneNumberType {
  /** Country detected from an explicit dial code, if any. */
  country?: PhoneCountryType;
  /** Digits-only dial code that was stripped off, if any. */
  dialCode?: string;
  /** Subscriber number with the dial code and trunk prefix removed. */
  nationalNumber: string;
  /** True when a dial code was found and removed from the input. */
  matchedCountryCode: boolean;
}

export interface PhoneNumberValueType {
  /** Display form of the dial code, e.g. "+234". */
  phoneCode: string;
  /** Digits-only dial code, e.g. "234". */
  dialCode: string;
  /** Subscriber number without dial code or trunk prefix, e.g. "8031234567". */
  nationalNumber: string;
  /** Storage form, e.g. "+2348031234567". Empty when there is no number. */
  e164: string;
  /** Human readable form, e.g. "+234 803 123 4567". */
  formatted: string;
  isoCode: string;
  countryName: string;
  flag: string;
  isValid: boolean;
}

/** E.164 caps dial code + national number at 15 digits. */
export const E164_MAX_DIGITS = 15;

/** Shortest national number we treat as plausible when splitting a paste. */
export const MIN_NATIONAL_DIGITS = 4;

/**
 * A national number (no dial code) never exceeds this in practice. Anything
 * longer that was pasted without a "+" almost certainly embeds a dial code.
 */
export const MAX_NATIONAL_DIGITS = 11;

/**
 * Several countries share a dial code. When a number is parsed we cannot know
 * which one was meant, so pick the most populous holder of the code.
 */
const AMBIGUOUS_DIAL_CODE_PREFERENCE: Record<string, string> = {
  "1": "US",
  "7": "RU",
  "39": "IT",
  "44": "GB",
  "47": "NO",
  "61": "AU",
  "212": "MA",
  "262": "RE",
  "290": "SH",
  "358": "FI",
  "500": "FK",
  "590": "GP",
  "599": "CW",
  "672": "NF",
};

/**
 * Reduce a raw `phonecode` to digits only.
 * "+1-242" -> "1242", "0055" -> "55", "+1-787 and 1-939" -> "1787".
 */
export const normalizeDialCode = (phonecode?: string | null): string => {
  if (!phonecode) return "";
  const primary = String(phonecode).split(/\s+and\s+/i)[0];
  const digits = primary.replace(/\D/g, "");
  return digits.replace(/^0+/, "") || digits;
};

/** Every country, with a usable `dialCode`, sorted alphabetically by name. */
export const PHONE_COUNTRIES: PhoneCountryType[] = (countryObjects as any[])
  .map((country) => ({
    ...country,
    dialCode: normalizeDialCode(country.phonecode),
  }))
  .filter((country) => country.dialCode.length > 0)
  .sort((a, b) => a.name.localeCompare(b.name));

/** Unique dial codes, longest first, so prefix matching is greedy. */
const DIAL_CODES_LONGEST_FIRST: string[] = Array.from(
  new Set(PHONE_COUNTRIES.map((country) => country.dialCode))
).sort((a, b) => b.length - a.length);

/** Strip everything except digits. */
export const digitsOnly = (value?: string | null): string =>
  String(value ?? "").replace(/\D/g, "");

/** Longest national number allowed for a dial code, per E.164. */
export const maxNationalDigits = (dialCode?: string | null): number =>
  Math.max(MIN_NATIONAL_DIGITS, E164_MAX_DIGITS - (dialCode?.length || 0));

export const findCountryByIso = (
  isoCode?: string | null
): PhoneCountryType | undefined => {
  if (!isoCode) return undefined;
  const iso = String(isoCode).trim().toUpperCase();
  return PHONE_COUNTRIES.find((country) => country.isoCode === iso);
};

/**
 * Resolve the country that owns a dial code. `preferIso` wins when it is one
 * of the holders, which keeps the current selection stable while typing.
 */
export const findCountryByDialCode = (
  dialCode: string,
  preferIso?: string | null
): PhoneCountryType | undefined => {
  const matches = PHONE_COUNTRIES.filter(
    (country) => country.dialCode === dialCode
  );
  if (matches.length === 0) return undefined;
  if (matches.length === 1) return matches[0];

  const preferred = preferIso
    ? matches.find((country) => country.isoCode === preferIso.toUpperCase())
    : undefined;
  if (preferred) return preferred;

  const fallbackIso = AMBIGUOUS_DIAL_CODE_PREFERENCE[dialCode];
  const fallback = fallbackIso
    ? matches.find((country) => country.isoCode === fallbackIso)
    : undefined;

  return fallback || matches[0];
};

/**
 * Accepts anything a caller might pass as a country: "234", "+234", "+1-242",
 * "NG", "ng" or "Nigeria".
 */
export const resolveCountry = (
  value?: string | null,
  preferIso?: string | null
): PhoneCountryType | undefined => {
  const raw = String(value ?? "").trim();
  if (!raw) return undefined;

  const byIso = findCountryByIso(raw);
  if (byIso) return byIso;

  const dialCode = normalizeDialCode(raw);
  if (dialCode) {
    const byDialCode = findCountryByDialCode(dialCode, preferIso);
    if (byDialCode) return byDialCode;
  }

  const lowered = raw.toLowerCase();
  return PHONE_COUNTRIES.find(
    (country) => country.name.toLowerCase() === lowered
  );
};

/** Greedy longest-prefix dial code match against a digits-only string. */
export const matchDialCode = (
  digits: string,
  preferIso?: string | null
): ParsedPhoneNumberType | null => {
  for (const dialCode of DIAL_CODES_LONGEST_FIRST) {
    if (!digits.startsWith(dialCode)) continue;
    const country = findCountryByDialCode(dialCode, preferIso);
    if (!country) continue;
    return {
      country,
      dialCode,
      nationalNumber: digits.slice(dialCode.length),
      matchedCountryCode: true,
    };
  }
  return null;
};

/**
 * Split a phone number into a country and a national number.
 *
 * Explicit international input ("+234…" or "00234…") always attempts a dial
 * code match. Input without that prefix is treated as national — a leading
 * trunk "0" is dropped and the current country is kept — unless `aggressive`
 * is set, which is what paste and blur use to also recognise a bare
 * "2348031234567".
 */
export const parsePhoneNumber = (
  raw: string,
  options: {
    currentCountry?: PhoneCountryType | null;
    aggressive?: boolean;
  } = {}
): ParsedPhoneNumberType => {
  const { currentCountry, aggressive = false } = options;
  const preferIso = currentCountry?.isoCode;
  const text = String(raw ?? "").trim();
  const digits = digitsOnly(text);

  if (!digits) return { nationalNumber: "", matchedCountryCode: false };

  const hasPlus = text.startsWith("+");
  const hasIddPrefix = !hasPlus && /^00[1-9]/.test(digits);
  const body = hasIddPrefix ? digits.replace(/^00/, "") : digits;

  if (hasPlus || hasIddPrefix) {
    return (
      matchDialCode(body, preferIso) || {
        nationalNumber: body,
        matchedCountryCode: false,
      }
    );
  }

  // Trunk prefix: "08031234567" is a national number, not a country code.
  if (body.startsWith("0")) {
    return {
      nationalNumber: body.replace(/^0+/, ""),
      matchedCountryCode: false,
    };
  }

  if (aggressive) {
    // A dial code only counts when what is left behind is itself a plausible
    // national number. Without the upper bound, a long run of digits would
    // match some country and drag the selection with it.
    const isPlausibleRemainder = (remainder: string) =>
      remainder.length >= MIN_NATIONAL_DIGITS &&
      remainder.length <= MAX_NATIONAL_DIGITS;

    // "2348031234567" pasted without a "+", for the country already selected.
    const currentDialCode = currentCountry?.dialCode;
    if (currentDialCode && body.startsWith(currentDialCode)) {
      const remainder = body.slice(currentDialCode.length);
      if (isPlausibleRemainder(remainder)) {
        return {
          country: currentCountry as PhoneCountryType,
          dialCode: currentDialCode,
          nationalNumber: remainder,
          matchedCountryCode: true,
        };
      }
    }

    // Too long to be national on its own, so it must carry a dial code.
    if (body.length > MAX_NATIONAL_DIGITS) {
      const matched = matchDialCode(body, preferIso);
      if (matched && isPlausibleRemainder(matched.nationalNumber)) {
        return matched;
      }
    }
  }

  return { nationalNumber: body, matchedCountryCode: false };
};

/** Group a national number for display: "8031234567" -> "803 123 4567". */
export const formatNationalNumber = (nationalNumber?: string | null): string => {
  const digits = digitsOnly(nationalNumber);
  if (digits.length <= 6) return digits;
  const tail = digits.slice(-4);
  const head = digits.slice(0, -4);
  const groups = head.match(/.{1,3}/g) || [];
  return [...groups, tail].join(" ");
};

/** Build the full value object a consumer stores or submits. */
export const buildPhoneValue = (
  country: PhoneCountryType,
  nationalNumber?: string | null
): PhoneNumberValueType => {
  const digits = digitsOnly(nationalNumber);
  const dialCode = country.dialCode;
  const isValid =
    digits.length >= MIN_NATIONAL_DIGITS &&
    digits.length <= maxNationalDigits(dialCode);

  return {
    phoneCode: `+${dialCode}`,
    dialCode,
    nationalNumber: digits,
    e164: digits ? `+${dialCode}${digits}` : "",
    formatted: digits
      ? `+${dialCode} ${formatNationalNumber(digits)}`
      : `+${dialCode}`,
    isoCode: country.isoCode,
    countryName: country.name,
    flag: country.flag,
    isValid,
  };
};

/**
 * Filter countries by name, ISO code or dial code, ranked so the most likely
 * match sorts first. "ng", "nigeria", "234" and "+234" all find Nigeria.
 */
export const searchCountries = (
  query?: string | null,
  countries: PhoneCountryType[] = PHONE_COUNTRIES
): PhoneCountryType[] => {
  const term = String(query ?? "")
    .trim()
    .toLowerCase();
  if (!term) return countries;

  const digitTerm = digitsOnly(term);
  const ranked: Array<{ country: PhoneCountryType; score: number }> = [];

  countries.forEach((country) => {
    const name = country.name.toLowerCase();
    const iso = country.isoCode.toLowerCase();
    let score = -1;

    if (name === term) score = 0;
    else if (iso === term) score = 1;
    else if (name.startsWith(term)) score = 2;
    else if (digitTerm && country.dialCode === digitTerm) score = 3;
    else if (digitTerm && country.dialCode.startsWith(digitTerm)) score = 4;
    else if (name.includes(term)) score = 5;

    if (score >= 0) ranked.push({ country, score });
  });

  return ranked
    .sort(
      (a, b) =>
        a.score - b.score || a.country.name.localeCompare(b.country.name)
    )
    .map((entry) => entry.country);
};

/**
 * Move a set of ISO codes to the top of the list, preserving their given
 * order. Used for the `preferredCountries` prop.
 */
export const withPreferredCountries = (
  preferredIsoCodes?: string[] | null,
  countries: PhoneCountryType[] = PHONE_COUNTRIES
): PhoneCountryType[] => {
  if (!preferredIsoCodes || preferredIsoCodes.length === 0) return countries;

  const preferred = preferredIsoCodes
    .map((iso) => findCountryByIso(iso))
    .filter((country): country is PhoneCountryType => Boolean(country));

  if (preferred.length === 0) return countries;

  const preferredIsoSet = new Set(preferred.map((country) => country.isoCode));
  return [
    ...preferred,
    ...countries.filter((country) => !preferredIsoSet.has(country.isoCode)),
  ];
};
