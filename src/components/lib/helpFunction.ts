// TypeScript version of the original JavaScript document
import { format } from "date-fns";
import { forbidden, notFound } from "next/navigation";
import { openToast } from "./modals/modals";
import React from "react";

// Constants with Type Safety
export const IN_DEV_MODE: boolean = process.env.NODE_ENV === "development";
export const API_HOST_URL: string = process.env.NEXT_PUBLIC_API_HOST ?? "";
export const FILE_URL: string = process.env.NEXT_PUBLIC_FILE_URL ?? "";
export const VIDEO_URL: string = process.env.NEXT_PUBLIC_VIDEO_URL ?? "";
export const CODECS_URL_M3U8: string =
  process.env.NEXT_PUBLIC_VIDEO_URL_CODECS_M3U8 ?? "";

export const romansFigure: string[] = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
];

// Interfaces for Type Safety
interface VercelDomainRequest {
  name: string;
}

interface VercelFetchOptions extends RequestInit {
  headers: {
    Authorization: string;
    [key: string]: string;
  };
}

interface Course {
  credits: string | number;
}

interface CourseObj {
  course: Course;
}

interface SubDomainResult {
  value: string;
  field: "username" | "domain";
}

interface FormItem {
  [key: string]: string | number | object | Blob | null | undefined | any[];
}

interface RequestOptions extends RequestInit {
  headers: Record<string, string>;
  body?: BodyInit | FormData | null;
}

// Functions

/**
 * Adds a subdomain to Vercel project.
 * @param domain The domain to add as a subdomain
 * @returns Promise resolving to the fetch Response
 */
export const addUserDomain = async (domain: string): Promise<Response> => {
  const payload: VercelDomainRequest = { name: `${domain}.instincthub.com` };
  const vercelOptions: VercelFetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${
        process.env.NEXT_PUBLIC_VERCEL_AUTH_BEARER_TOKEN ?? ""
      }`,
    },
    body: JSON.stringify(payload),
  };

  return fetch(
    `https://api.vercel.com/v10/projects/${process.env.NEXT_PUBLIC_VERCEL_PROJECT_ID}/domains?teamId=${process.env.NEXT_PUBLIC_VERCEL_TEAM_ID}`,
    vercelOptions
  );
};

/**
 * Strips HTML tags from a string.
 * @param str Input string with potential HTML tags
 * @returns Cleaned string without HTML tags
 */
export const stripHtmlTags = (str: string): string => {
  return str.replace(/<[^>]*>/g, "");
};

/**
 * Removes commas from a number string and converts to number.
 * @param str Input string or number
 * @returns Parsed number or 0 if invalid
 */
export const stripCommaFromNumber = (str: string | number): number => {
  try {
    if (typeof str === "number") return str;
    const val = str.replace(/,/g, "");
    return Number(val) || 0;
  } catch {
    return 0;
  }
};

/**
 * Calculates total credits from an array of course objects.
 * @param courses Array of course objects
 * @returns Total credits as a number
 */
export const calculateTotalCredits = (courses: CourseObj[]): number => {
  return courses.reduce((total, { course }) => {
    const credits = Number.parseInt(course.credits.toString(), 10) || 0;
    return total + credits;
  }, 0);
};

/**
 * Calculates amount after percentage deduction.
 * @param amount Base amount
 * @param percentage Percentage to deduct (0-100)
 * @returns Object with final amount or error details
 */
export const calculateAmountAfterDeduction = (
  amount: number,
  percentage: number
): { amount: number; detail?: string } => {
  if (amount < 0 || percentage < 0 || percentage > 100) {
    return {
      amount: 0,
      detail:
        "Amount and percentage should be positive, and percentage should be between 0 and 100.",
    };
  }
  const deduction = (amount * percentage) / 100;
  return { amount: amount - deduction };
};

/**
 * Finds keys in an object that are null, undefined, or empty string.
 * @param namesArray Array of keys to check
 * @param obj Object to inspect
 * @returns Array of keys with null/empty values
 */
export const findNullOrEmptyKeys = <T extends Record<string, any>>(
  namesArray: string[],
  obj: T
): string[] => {
  return namesArray.filter((key) => obj[key] == null || obj[key] === "");
};

/**
 * Extracts subdomain or domain from hostname.
 * @param hostname Hostname string
 * @returns Subdomain result or null
 */
export const extractSubDomain = (hostname: string): SubDomainResult | null => {
  if (IN_DEV_MODE) return { value: "eportal.hust.edu.ng", field: "username" };
  if (!hostname.includes("instincthub.com") && !IN_DEV_MODE) {
    return { value: hostname, field: "domain" };
  }

  const parts = hostname.split(".");
  if (parts.length > 1) {
    if (parts[1] === "ngrok-free")
      return { value: "skills", field: "username" };
    if (
      parts[parts.length - 2] !== "instincthub" &&
      !hostname.includes("localhost")
    ) {
      return { value: hostname, field: "domain" };
    }
    return { value: parts[0], field: "username" };
  }

  if (parts.length === 1 || parts.length === 2) {
    if (
      parts[0].includes("localhost:3000") ||
      parts[0] === "instincthub" ||
      parts[1] === "ngrok-free"
    ) {
      return { value: "eportal.hust.edu.ng", field: "username" };
    }
    if (
      !parts[parts.length - 2]?.includes("instincthub") &&
      !hostname.includes("localhost")
    ) {
      return { value: hostname, field: "domain" };
    }
    return { value: parts[0], field: "domain" };
  }
  return null;
};

/**
 * Converts an array of objects to FormData.
 * @param array Array of items to convert
 * @returns FormData object
 */
export const convertArrayToFormData = (array: FormItem[]): FormData => {
  const formData = new FormData();
  array.forEach((item, index) => {
    Object.entries(item).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formData.append(`item[${index}].${key}`, JSON.stringify(value));
      } else if (typeof value === "object" && value !== null) {
        if (key === "upload_result" && "objectURL" in value) {
          fetch((value as { objectURL: string }).objectURL)
            .then((res) => res.blob())
            .then((blob) => {
              formData.append(
                `item[${index}].${key}`,
                blob,
                "upload_result_file"
              );
            })
            .catch((error) =>
              console.error("Error converting blob URL:", error)
            );
        } else {
          formData.append(`item[${index}].${key}`, JSON.stringify(value));
        }
      } else {
        formData.append(`item[${index}].${key}`, String(value ?? ""));
      }
    });
  });
  return formData;
};

/**
 * Checks if an object is empty
 * @param obj Object to check
 * @returns True if empty, false otherwise
 */
export const objectIsEmpty = (obj: any): boolean => {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
};

/**
 * Handles form validation errors.
 * @param e Event object from form input
 * @param formError Current error list
 * @param setFormError Function to update error list
 * @returns Error message with status code
 */
export const handleInvalid = (
  e: React.FormEvent<HTMLInputElement>,
  formError: string[],
  setFormError: (errors: string[]) => void
): [string, number] => {
  const target = e.target as HTMLInputElement;
  if (!formError.includes(target.name)) {
    setFormError([...formError, target.dataset.name || target.name]);
  }

  const errTag = document.getElementById(`id_${target.name}`);
  if (errTag) errTag.scrollIntoView();

  return [`Error: ${formError.join(", ")} field(s) cannot be left blank.`, 400];
};

/**
 * Calculates average rating from an array of numbers.
 * @param ratings Array of ratings
 * @returns Average rating as a string with 1 decimal place
 */
export const calculateAverageRating = (ratings: number[]): string => {
  if (!ratings.length) return "0.0";
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return (sum / ratings.length).toFixed(1);
};

/**
 * Converts a string to a float, removing commas.
 * @param value Input string
 * @returns Parsed float
 */
export const convertToFloat = (value: string): number => {
  return parseFloat(value.replace(/,/g, "")) || 0;
};

/**
 * Formats a number with commas.
 * @param number Input number
 * @returns Formatted string or error message
 */
export const formatNumberWithCommas = (number: number): string => {
  if (isNaN(number)) return "Invalid number";
  const [integer, decimal] = number.toString().split(".");
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
};

export const slugifyFileName = (fileName: string): string => {
  // Split the fileName by dot to separate the name and extension
  const parts: string[] = fileName.split(".");

  // Extract the extension
  const extension: string = parts.pop() || "";

  // Join the remaining parts with hyphen and replace special characters and brackets with hyphens
  const slugifiedName: string = parts
    .join("-")
    .replace(/[^\w\s()-]/g, "")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();

  // Remove parentheses from the slugified name
  const nameWithoutParentheses: string = slugifiedName.replace(
    /\(([^)]+)\)/g,
    ""
  );

  // Only take first 50 characters
  const reduced_txt: string = nameWithoutParentheses.slice(0, 50);

  // Append the extension
  return reduced_txt + "." + extension.toLowerCase();
};

/**
 * Converts a string to a URL-friendly slug format.
 * @param value The string to convert to a slug
 * @example
 * ```ts
 * const slug = convertToSlug("Hello World");
 * console.log(slug); // "hello-world"
 * ```
 * @returns A lowercase string with spaces and special characters replaced by hyphens
 * @throws Error if the resulting slug contains invalid characters
 */
export const convertToSlug = (value: string): string => {
  // Normalize the string to remove accents and other diacritics
  value = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Convert to lowercase
  value = value.toLowerCase();

  // Replace any non-alphanumeric characters with a hyphen
  value = value.replace(/[^a-z0-9]+/g, "-");

  // Remove leading or trailing hyphens
  value = value.replace(/^-+|-+$/g, "");

  // Ensure the slug only contains valid characters
  if (!/^[a-z0-9_-]+$/.test(value)) {
    throw new Error(
      'Enter a valid "slug" consisting of letters, numbers, underscores, or hyphens.'
    );
  }

  return value;
};

/**
 * Checks if an element is in the viewport.
 * @param element DOM element
 * @returns Boolean indicating visibility
 */
export const TrackViewPort = (element: HTMLElement | null): boolean => {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Formats duration in minutes to a readable string.
 * @param durationInMinutes Duration in minutes
 * @returns Formatted duration string
 */
export const formatDuration = (durationInMinutes: number): string => {
  if (durationInMinutes === 0) return "...";
  if (durationInMinutes < 60) {
    return Math.floor(durationInMinutes)
      ? `${Math.floor(durationInMinutes)} Minutes`
      : `${durationInMinutes.toFixed(1)} Seconds`;
  }
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = Math.floor(durationInMinutes % 60);
  return minutes === 0
    ? `${hours} Hours`
    : `${hours} Hours, ${minutes} Minutes`;
};

/**
 * Truncates HTML content to a specified length.
 * @param markdownText HTML string
 * @param maxLength Maximum length
 * @returns Truncated string
 */
export const truncateHtml = (
  markdownText: string,
  maxLength: number
): string => {
  return markdownText.length > maxLength
    ? `${markdownText.substring(0, maxLength)}...`
    : markdownText;
};

/**
 * Formats a date to a readable string.
 * @param date Date object or string
 * @param type Format type (default: "iiii do MMMM yyyy")
 * @returns Formatted date string
 */
export const formatDateToWord = (
  date: Date | string,
  type: string = "iiii do MMMM yyyy"
): string => {
  if (!date) return "";
  return format(new Date(date), type);
};

/**
 * Encodes the current URL.
 * @returns Encoded URL string or undefined if not in browser
 */
export const hostUrlEncode = (): string | undefined => {
  if (typeof document !== "undefined") {
    return encodeURIComponent(window.location.href);
  }
};

/**
 * Validates if input is alphanumeric and at least 3 characters.
 * @param input Input string
 * @returns Boolean indicating validity
 */
export const isValidAlphanumeric = (input: string): boolean => {
  return input?.length >= 3 && /^[a-zA-Z0-9]+$/.test(input);
};

/**
 * Validates if input is a valid email.
 * @param input Input string
 * @returns Boolean indicating validity
 */
export const isValidEmail = (input: string): boolean => {
  return input?.length >= 3 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
};

/**
 * Converts a string to title case.
 * @param str Input string
 * @returns Title case string or original value if not a string
 */
export const toTitleCase = (str: any): any => {
  if (typeof str !== "string") return str;
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  );
};

/**
 * Gets a cookie value by name.
 * @param cname Cookie name
 * @returns Cookie value or null
 */
export const getCookie = (cname: string): string | null => {
  if (typeof document === "undefined") return null;
  const name = `${cname}=`;
  const ca = document.cookie.split(";");
  for (const c of ca) {
    const trimmed = c.trim();
    if (trimmed.startsWith(name)) return trimmed.substring(name.length);
  }
  return null;
};

/**
 * Removes a cookie by name.
 * @param cname Cookie name
 */
export const removeCookie = (cname: string): void => {
  if (typeof document !== "undefined") {
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
};

/**
 * Sets a cookie with name, value, and expiration days.
 * @param cname Cookie name
 * @param cvalue Cookie value
 * @param exdays Expiration days
 */
export const setCookie = (
  cname: string,
  cvalue: string,
  exdays: number
): void => {
  if (typeof document !== "undefined") {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    document.cookie = `${cname}=${cvalue};expires=${d.toUTCString()};path=/`;
  }
};

/**
 * Prints an error message for a form field.
 * @param key Field name
 * @param value Error message
 * @param index Index for focusing first error
 */
export const printErr = (key: string, value: string, index: number): void => {
  const form = document.querySelector("#regForm");
  if (!form) return;

  const inputField = form.querySelector<HTMLInputElement>(`[name="${key}"]`);
  if (!inputField) return;

  inputField.style.borderColor = "var(--TurkishRose)";
  let errorTag: HTMLElement | null = null;

  if (inputField.type === "radio") {
    errorTag =
      inputField.parentElement?.parentElement?.parentElement?.querySelector(
        ".error"
      ) || null;
  } else if (inputField.type === "file") {
    errorTag =
      inputField.parentElement?.parentElement?.querySelector(".error") || null;
  } else {
    errorTag = inputField.parentElement?.querySelector(".error") || null;
  }

  if (errorTag) {
    errorTag.textContent = value;
  } else {
    const span = document.createElement("span");
    span.classList.add("error");
    span.textContent = value;
    span.style.color = "var(--TurkishRose)";
    span.style.display = "inline-block";

    const parent =
      inputField.type === "radio"
        ? inputField.parentElement?.parentElement?.parentElement
        : inputField.type === "file" || inputField.nodeName === "SELECT"
        ? inputField.parentElement
        : inputField.parentElement?.parentElement;
    parent?.appendChild(span);
  }

  if (index === 0) inputField.focus();
};

/**
 * Removes all error messages and styles from form fields.
 * Cleans up error classes, borders, and error message elements.
 */
export const removeErrMsg = (): void => {
  // Remove error messages from fields with .s_err class
  const errElements = document.querySelectorAll(".s_err");
  if (errElements) {
    errElements.forEach((element) => {
      // Remove error styling from field
      const field = element.querySelector(".field") as HTMLElement | null;
      if (field) {
        field.style.border = "none";
      }

      // Remove error message and reset input/textarea borders
      const errMsg = element.querySelector(".err_msg");
      if (errMsg) {
        errMsg.remove();

        const input = element.querySelector("input") as HTMLInputElement | null;
        const textarea = element.querySelector("textarea") as HTMLTextAreaElement | null;

        if (input) {
          input.style.border = "var(--borderDefault)";
        } else if (textarea) {
          textarea.style.border = "var(--borderDefault)";
        }
      }

      element.classList.remove("s_err");
    });
  }

  // Remove error banner messages
  const errBanner = document.querySelector("#err_message") as HTMLElement | null;
  if (errBanner) {
    errBanner.classList.remove("active");
    const ul = errBanner.querySelector("ul");
    if (ul) {
      ul.innerHTML = "";
    }
  }
};

/**
 * Displays validation errors on form fields.
 * @param items Object containing field names as keys and error messages as values
 */
export const printErrNew = (items: Record<string, string | string[]>): void => {
  if (!items) return;

  let inputField: Element | null;

  Object.entries(items).forEach((item, index) => {
    const [key, value] = item;
    inputField = document.querySelector(`.${key}`);

    // Create error message element
    const errTag = document.createElement("P");
    errTag.classList.add("err_msg");
    errTag.style.color = "var(--TurkishRose)";
    errTag.textContent = Array.isArray(value) ? value[0] : value;

    // Add error styling if not already present
    if (
      inputField &&
      !inputField.classList.contains("s_err") &&
      !inputField.querySelector(".err_msg")
    ) {
      inputField.classList.add("s_err");
      inputField.append(errTag);

      const inputElement = inputField.querySelector(".field input") as HTMLInputElement | null;
      const textareaElement = inputField.querySelector(".field textarea") as HTMLTextAreaElement | null;

      if (
        inputElement &&
        (inputElement.getAttribute("type") === "number" ||
          inputElement.getAttribute("type") === "text" ||
          inputElement.getAttribute("type") === "email" ||
          inputElement.getAttribute("type") === "password")
      ) {
        inputElement.style.border = "1px solid var(--TurkishRose)";
        if (index === 0) {
          const targetInput = inputField.querySelector(`[name="${key}"]`) as HTMLInputElement | null;
          targetInput?.focus();
        }
      } else if (textareaElement) {
        textareaElement.style.border = "1px solid var(--TurkishRose)";
      } else {
        const field = inputField.querySelector(".field") as HTMLElement | null;
        if (field) {
          field.style.border = "1px solid var(--TurkishRose)";
        }
      }

      inputTagErrorEvent(key, false);
    }
  });
};

/**
 * Adds error styling and message to a specific input field.
 * @param tags The class name of the input field wrapper
 * @param border Whether to add border styling (default: true)
 */
export const inputTagErrorEvent = (tags: string, border: boolean = true): void => {
  const inputFieldWrap = document.querySelector(`div.${tags}`) as HTMLElement | null;
  const msgWrap = document.querySelector("#err_message") as HTMLElement | null;

  if (!inputFieldWrap || !msgWrap) return;

  // Only add error if not already present
  if (!inputFieldWrap.classList.contains("s_err")) {
    inputFieldWrap.classList.add("s_err");
    msgWrap.classList.add("active");

    // Add border styling if requested
    if (border) {
      const field = inputFieldWrap.querySelector(".field") as HTMLElement | null;
      if (field) {
        field.style.border = "1px solid var(--TurkishRose)";
      }
    }

    // Add error message to the banner
    const msgTag = document.createElement("LI");
    const h5 = inputFieldWrap.querySelector("h5");
    const textLabel = inputFieldWrap.querySelector(".text_label");

    if (h5) {
      msgTag.textContent = h5.textContent;
    } else if (textLabel) {
      msgTag.textContent = textLabel.textContent;
    }

    const ul = msgWrap.querySelector("ul");
    if (ul) {
      ul.append(msgTag);
    }
  }
};

/**
 * Abbreviates large numbers into a shorter format with suffixes.
 * @param amount The number to abbreviate
 * @returns Abbreviated string (e.g., "1.5K", "2.3M")
 * @example
 * abbreviateNumber(1500) // Returns "1.5K"
 * abbreviateNumber(2300000) // Returns "2.3M"
 */
export const abbreviateNumber = (amount: number): string => {
  const suffixes = ["", "K", "M", "B", "T"];
  const tier = Math.floor(Math.log10(Math.abs(amount)) / 3);

  if (tier === 0) return amount.toString();

  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);
  const scaledAmount = amount / scale;

  return scaledAmount.toFixed(1) + suffix;
};

/**
 * Handles server response errors for forms.
 * @param status HTTP status code
 * @param items Error or success data
 * @param registerForm Form element
 * @param r_path Redirect path
 */
export const handleError = (
  status: number,
  items: Record<string, string[]>,
  registerForm: HTMLFormElement | null,
  r_path: string | null
): void => {
  const serverTag = document.querySelector(".server_err") as HTMLElement | null;
  if (!serverTag) return;

  if (status === 400) {
    if (items.user?.[0] === "This field must be unique." || items.username) {
      serverTag.style.display = "block";
      serverTag.style.backgroundColor = "var(--DarkCyan)";
      serverTag.querySelector("h3")!.textContent =
        "We already have your details!";
      if (
        ["/register/details", "/register/details/"].includes(
          document.location.pathname
        )
      ) {
        const button = serverTag.querySelector("a button span");
        if (button) button.innerHTML = "Take Assessment";
        const link = serverTag.querySelector("a");
        if (link) link.href = "/quiz/";
      }
      spinBtn(registerForm, "none", false);
      window.location.href = "#Socials";
    } else {
      spinBtn(registerForm, "none", false);
      Object.entries(items).forEach(([key, value], index) =>
        printErr(key, value[0], index)
      );
      serverTag.style.display = "none";
    }
  } else if ([200, 201, 202].includes(status) && r_path) {
    window.location.href = r_path;
  } else if (status === 401) {
    serverTag.style.display = "block";
    serverTag.querySelector("a")!.innerHTML = "";
    serverTag.querySelector("h3")!.textContent =
      typeof items.detail === "string" ? items.detail : "Unauthorized";
    spinBtn(registerForm, "none", false);
    window.location.href = "#Socials";
  }
};

/**
 * Gets a value from an object using a path string (e.g., "course.title" or "course.lecturer.full_name")
 * @param row The data object to extract value from
 * @param accessor The path to the value (e.g., "course.title")
 * @returns The value at the specified path or empty string if not found
 */
export function getNestedValue(row: any, accessor: string): any {
  try {
    return accessor
      .split(".")
      .reduce(
        (obj, key) => (obj && obj[key] !== undefined ? obj[key] : ""),
        row
      );
  } catch (error) {
    console.warn(`Error accessing ${accessor}:`, error);
    return "";
  }
}

/**
 * Creates request options for fetch API.
 * @param method HTTP method (GET, POST, PUT, DELETE)
 * @param data Request body (BodyInit | FormData | null)
 * @param token Auth token string or null
 * @param content_type Content type (json, form-data, null, false)
 * @param channel Channel ID string or null
 * @param auth_sk Use auth secret boolean (true, false)
 * @returns Request options object
 *
 * Set environment
 * NEXT_PUBLIC_INSTINCTHUB_SK_KEY="Your secret key name"
 * NEXT_PUBLIC_INSTINCTHUB_AUTH_SECRET="Your seceret key"
 */
export const reqOptions = (
  method: string,
  data: BodyInit | FormData | null = null,
  token: string | null = null,
  content_type: "json" | "form-data" | null | false = false,
  channel: string | null = null,
  auth_sk: boolean = false
): RequestOptions => {
  // InstinctHub SK (for authentication)
  const ihub_skn = process.env.NEXT_PUBLIC_INSTINCTHUB_SKH_KEY || "";
  const ihub_skv = process.env.NEXT_PUBLIC_INSTINCTHUB_SK_HEADER || "";
  const ihubKey =
    ihub_skn && ihub_skv
      ? {
          [ihub_skn]: ihub_skv,
        }
      : {};

  // Leadboard SK (for tracking)
  const lead_skn = process.env.NEXT_PUBLIC_LEADBOARD_SK_NAME || "";
  const lead_skv = process.env.NEXT_PUBLIC_LEADBOARD_SK_VALUE || "";
  const leadKey =
    lead_skn && lead_skv
      ? {
          [lead_skn]: lead_skv,
        }
      : {};

  // InstinctHub SK (for authentication)
  const sk_key = process.env.NEXT_PUBLIC_INSTINCTHUB_SK_KEY || "";
  const sk_value = process.env.NEXT_PUBLIC_INSTINCTHUB_AUTH_SECRET ?? "";
  const authKey =
    sk_key && sk_value && auth_sk
      ? {
          [sk_key]: sk_value,
        }
      : {};

  // Combine all SKs
  const headers: Record<string, string> = {
    ...leadKey,
    ...ihubKey,
    ...authKey,
  };

  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (channel) headers["channel-id"] = channel;
  if (content_type === "json") headers["Content-Type"] = "application/json";
  if (content_type === "form-data")
    headers["Content-Type"] = "multipart/form-data";

  const request: RequestOptions = { method, headers, redirect: "follow" };
  if (data) request["body"] = data;
  else request["body"] = null;

  if (IN_DEV_MODE) console.log(request);
  return request;
};

/**
 * Fetches paginated data from an API.
 * @function
 * @example
 * ```ts
 * fetchData(page, token, options, data, setData, setCount, setNext, setPrevious, setIsLoading, reset);
 * ```
 * @param page API endpoint
 * @param token Auth token
 * @param options Request options
 * @param data Existing data
 * @param setData Data setter
 * @param setCount Count setter
 * @param setNext Next page setter
 * @param setPrevious Previous page setter
 * @param setIsLoading Loading state setter
 * @param reset Reset state
 * @returns
 * @see {@link FetchDataType}
 */

export const fetchData = async (
  page: string,
  token: string | null,
  options: object,
  data: any[],
  setData: React.Dispatch<React.SetStateAction<any>>,
  setCount: React.Dispatch<React.SetStateAction<number>>,
  setNext: React.Dispatch<React.SetStateAction<string | null>>,
  setPrevious: React.Dispatch<React.SetStateAction<string | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  reset = false
) => {
  // Fetch paginated data when user scrolls
  if (!token) return;

  try {
    // Fetch data from the server with pagination
    const response = await fetch(page, options);
    const newData: any = await response.json();
    if (response.status === 401) {
      openToast("Unauthorized fetchData", 401);
      return;
    }

    // Append the new data to the existing data
    if (reset) {
      setData(newData.results);
      setCount(newData.count);
    } else {
      setData([...data, ...newData.results]);
    }
    setNext(newData.next);
    setPrevious(newData.previous);
  } catch (error) {
    openToast("Error fetching data", 500);
    console.error("Error fetching data:", error);
  } finally {
    setIsLoading(false);
  }
};

/**
 * Fetches data from an API with error handling.
 * @param session Callback or state setter
 * @param api API endpoint
 * @param reqOptions Request options
 * @param isFunctionComponent Is functional component
 * @param setIsLoading (optional) IsLoading state setter (boolean)
 * @param setStatus (optional) Status setter (number | null)
 * @param setError (optional) Error setter (any)
 * @param flag (optional) Handle status errors (boolean)
 * @returns Promise with result or error
 */

export const fetchAPI = async <T>(
  session:
    | ((data: T) => void)
    | { setState: (state: { data?: T; status?: number; error?: any }) => void },
  api: string,
  reqOptions: RequestOptions,
  isFunctionComponent: boolean = false,
  setIsLoading?: (((loading: boolean) => void) | null) | null,
  setStatus?: ((status: number | null) => void) | null,
  setError?: ((error: any) => void) | null,
  flag: boolean = false
): Promise<T | Error> => {
  try {
    const response = await fetch(api, reqOptions);
    const status = response.status;
    const result = (await response.json()) as T;

    if (isFunctionComponent) {
      if ([400, 401, 404, 500].includes(status)) {
        setError?.(result);
      } else if ([200, 201].includes(status)) {
        (session as (data: T) => void)(result);
        setError?.(null);
      }
      setStatus?.(status);
    } else {
      (session as { setState: any }).setState({ data: result, status });
    }

    if (IN_DEV_MODE) {
      console.log(
        "Request Options:",
        reqOptions,
        "Response Data:",
        result,
        "Status Code:",
        status
      );
    }
    if (flag) handleStatusError(status);

    return result;
  } catch (error) {
    if (isFunctionComponent) {
      (session as (error: any) => void)(error);
      setError?.(error);
      setStatus?.(null);
    } else {
      (session as { setState: any }).setState({ error });
    }
    if (IN_DEV_MODE)
      console.log("Request Options:", reqOptions, "Error:", error);
    return error as Error;
  } finally {
    if (setIsLoading) setIsLoading(false);
  }
};

/**
 * Handles HTTP status errors with navigation.
 * @param status HTTP status code
 */
export const handleStatusError = (status: number): void => {
  if (status === 401) forbidden();
  else if (status === 404) notFound();
};

/**
 * Toggles form button spinner and disabled state.
 * @param form Form element
 * @param display Spinner display style
 * @param status Disabled status
 */
export const spinBtn = (
  form: HTMLFormElement | null,
  display: "none" | "inline-block",
  status: boolean
): void => {
  if (!form) return;
  const button = form.querySelector<HTMLButtonElement>("button.submit_bt");
  if (button) {
    button.disabled = status;
    const spinner = button.querySelector(".bt-spinner") as HTMLElement | null;
    if (spinner) spinner.style.display = display;
  }
  form.disabled = status;
};

/**
 * Resends OTP to an email.
 * @param email User email
 * @returns Promise with response data
 */
export const handleResendOTP = async (email: string): Promise<any> => {
  const formData = new FormData();
  formData.append("email", email);
  const requestOptions = reqOptions("POST", formData);
  const response = await fetch(
    `${API_HOST_URL}auth/skills/request_new_otp/`,
    requestOptions
  );
  return response.json();
};
