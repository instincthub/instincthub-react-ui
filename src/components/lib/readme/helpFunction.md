# HelpFunction Utilities Library

This TypeScript library provides a collection of utility functions and constants designed for web development, particularly within a Next.js environment. It includes tools for handling API requests, form validation, string manipulation, DOM interactions, and more. The library is type-safe, optimized for performance, and includes detailed error handling.

## Table of Contents
- [Installation](#installation)
- [Constants](#constants)
- [Interfaces](#interfaces)
- [Functions](#functions)
- [Usage Examples](#usage-examples)

## Installation

To use this library, ensure you have TypeScript and the required dependencies installed in your project:

```bash
npm install date-fns next
```

Then, copy the provided TypeScript code into a file (e.g., `utils.ts`) and import the desired functions or constants as needed.

```typescript
import { stripHtmlTags, calculateTotalCredits } from './utils';
```

## Constants

### `IN_DEV_MODE`
- **Type**: `boolean`
- **Description**: Indicates whether the application is running in development mode based on the `NODE_ENV` environment variable.
- **Default**: `process.env.NODE_ENV === "development"`

### `API_HOST_URL`
- **Type**: `string`
- **Description**: Base URL for API requests, sourced from the `NEXT_PUBLIC_API_HOST` environment variable.
- **Default**: `""` (if undefined)

### `FILE_URL`
- **Type**: `string`
- **Description**: Base URL for file resources, sourced from `NEXT_PUBLIC_FILE_URL`.
- **Default**: `""` (if undefined)

### `VIDEO_URL`
- **Type**: `string`
- **Description**: Base URL for video resources, sourced from `NEXT_PUBLIC_VIDEO_URL`.
- **Default**: `""` (if undefined)

### `CODECS_URL_M3U8`
- **Type**: `string`
- **Description**: Base URL for M3U8 video codecs, sourced from `NEXT_PUBLIC_VIDEO_URL_CODECS_M3U8`.
- **Default**: `""` (if undefined)

### `romansFigure`
- **Type**: `string[]`
- **Description**: Array of Roman numerals from "I" to "X".
- **Value**: `["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]`

## Interfaces

### `VercelDomainRequest`
- **Description**: Structure for Vercel domain request payload.
- **Properties**:
  - `name: string` - The domain name to add.

### `VercelFetchOptions`
- **Description**: Extends `RequestInit` for Vercel API requests.
- **Properties**:
  - `headers: { Authorization: string; [key: string]: string }` - Custom headers including authorization.

### `Course`
- **Description**: Represents a course with credit information.
- **Properties**:
  - `credits: string | number` - Credits for the course.

### `CourseObj`
- **Description**: Wrapper for a course object.
- **Properties**:
  - `course: Course` - The course details.

### `SubDomainResult`
- **Description**: Result of subdomain extraction.
- **Properties**:
  - `value: string` - Extracted subdomain or domain.
  - `field: "username" | "domain"` - Indicates the type of extracted value.

### `FormItem`
- **Description**: Generic object for form data conversion.
- **Properties**:
  - `[key: string]: string | number | object | Blob | null | undefined | any[]` - Flexible key-value pairs.

### `RequestOptions`
- **Description**: Extends `RequestInit` for custom fetch requests.
- **Properties**:
  - `headers: Record<string, string>` - HTTP headers.
  - `body?: BodyInit | FormData | null` - Optional request body.

## Functions

### `addUserDomain`
- **Description**: Adds a subdomain to a Vercel project.
- **Parameters**:
  - `domain: string` - The subdomain to add (e.g., "example" becomes "example.instincthub.com").
- **Returns**: `Promise<Response>` - Fetch API response.
- **Usage**: `const response = await addUserDomain("myapp");`

### `stripHtmlTags`
- **Description**: Removes HTML tags from a string.
- **Parameters**:
  - `str: string` - Input string with HTML tags.
- **Returns**: `string` - Cleaned string without tags.
- **Usage**: `stripHtmlTags("<p>Hello</p>") // "Hello"`

### `stripCommaFromNumber`
- **Description**: Removes commas from a string and converts it to a number.
- **Parameters**:
  - `str: string | number` - Input string or number (e.g., "1,234" or 1234).
- **Returns**: `number` - Parsed number or 0 if invalid.
- **Usage**: `stripCommaFromNumber("1,234") // 1234`

### `calculateTotalCredits`
- **Description**: Calculates the total credits from an array of course objects.
- **Parameters**:
  - `courses: CourseObj[]` - Array of course objects.
- **Returns**: `number` - Total credits.
- **Usage**: `calculateTotalCredits([{ course: { credits: "3" } }]) // 3`

### `calculateAmountAfterDeduction`
- **Description**: Calculates the amount after a percentage deduction.
- **Parameters**:
  - `amount: number` - Base amount.
  - `percentage: number` - Percentage to deduct (0-100).
- **Returns**: `{ amount: number; detail?: string }` - Resulting amount or error details.
- **Usage**: `calculateAmountAfterDeduction(100, 20) // { amount: 80 }`

### `findNullOrEmptyKeys`
- **Description**: Finds keys in an object that are null, undefined, or empty strings.
- **Parameters**:
  - `namesArray: string[]` - Array of keys to check.
  - `obj: T` - Object to inspect (generic type).
- **Returns**: `string[]` - Array of keys with null/empty values.
- **Usage**: `findNullOrEmptyKeys(["name", "age"], { name: "", age: 25 }) // ["name"]`

### `extractSubDomain`
- **Description**: Extracts subdomain or domain from a hostname.
- **Parameters**:
  - `hostname: string` - Hostname to parse (e.g., "sub.instincthub.com").
- **Returns**: `SubDomainResult | null` - Extracted subdomain/domain or null.
- **Usage**: `extractSubDomain("sub.instincthub.com") // { value: "sub", field: "username" }`

### `convertArrayToFormData`
- **Description**: Converts an array of objects to a `FormData` object.
- **Parameters**:
  - `array: FormItem[]` - Array of items to convert.
- **Returns**: `FormData` - FormData object for HTTP requests.
- **Usage**: `convertArrayToFormData([{ name: "test" }]) // FormData with "item[0].name=test"`

### `handleInvalid`
- **Description**: Handles form validation errors by updating error state and scrolling to the invalid field.
- **Parameters**:
  - `e: React.FormEvent<HTMLInputElement>` - Form event.
  - `formError: string[]` - Current error list.
  - `setFormError: (errors: string[]) => void` - Function to update error list.
- **Returns**: `[string, number]` - Error message and status code (400).
- **Usage**: `handleInvalid(event, ["name"], setErrors) // Scrolls to field and updates errors`

### `calculateAverageRating`
- **Description**: Calculates the average of an array of ratings.
- **Parameters**:
  - `ratings: number[]` - Array of rating values.
- **Returns**: `string` - Average rating with one decimal place.
- **Usage**: `calculateAverageRating([4, 5, 3]) // "4.0"`

### `convertToFloat`
- **Description**: Converts a string with commas to a float.
- **Parameters**:
  - `value: string` - Input string (e.g., "1,234.56").
- **Returns**: `number` - Parsed float or 0 if invalid.
- **Usage**: `convertToFloat("1,234.56") // 1234.56`

### `formatNumberWithCommas`
- **Description**: Formats a number with commas as thousand separators.
- **Parameters**:
  - `number: number` - Number to format.
- **Returns**: `string` - Formatted number or "Invalid number" if NaN.
- **Usage**: `formatNumberWithCommas(1234567.89) // "1,234,567.89"`

### `TrackViewPort`
- **Description**: Checks if an element is fully visible in the viewport.
- **Parameters**:
  - `element: HTMLElement | null` - DOM element to check.
- **Returns**: `boolean` - True if visible, false otherwise.
- **Usage**: `TrackViewPort(document.querySelector("#myDiv")) // true/false`

### `formatDuration`
- **Description**: Formats a duration in minutes to a human-readable string.
- **Parameters**:
  - `durationInMinutes: number` - Duration in minutes.
- **Returns**: `string` - Formatted duration (e.g., "2 Hours, 30 Minutes").
- **Usage**: `formatDuration(150) // "2 Hours, 30 Minutes"`

### `truncateHtml`
- **Description**: Truncates an HTML string to a specified length.
- **Parameters**:
  - `markdownText: string` - HTML string to truncate.
  - `maxLength: number` - Maximum length before truncation.
- **Returns**: `string` - Truncated string with "..." if applicable.
- **Usage**: `truncateHtml("<p>Hello World</p>", 5) // "<p>Hel..."`

### `formatDateToWord`
- **Description**: Formats a date to a readable string using `date-fns`.
- **Parameters**:
  - `date: Date | string` - Date to format.
  - `type: string` - Format pattern (default: "iiii do MMMM yyyy").
- **Returns**: `string` - Formatted date or empty string if invalid.
- **Usage**: `formatDateToWord("2023-01-01") // "Sunday 1st January 2023"`

### `hostUrlEncode`
- **Description**: Encodes the current URL.
- **Returns**: `string | undefined` - Encoded URL or undefined if not in browser.
- **Usage**: `hostUrlEncode() // "http%3A%2F%2Flocalhost%3A3000"`

### `isValidAlphanumeric`
- **Description**: Validates if a string is alphanumeric and at least 3 characters long.
- **Parameters**:
  - `input: string` - Input string to validate.
- **Returns**: `boolean` - True if valid, false otherwise.
- **Usage**: `isValidAlphanumeric("abc123") // true`

### `isValidEmail`
- **Description**: Validates if a string is a valid email address.
- **Parameters**:
  - `input: string` - Input string to validate.
- **Returns**: `boolean` - True if valid, false otherwise.
- **Usage**: `isValidEmail("user@example.com") // true`

### `toTitleCase`
- **Description**: Converts a string to title case.
- **Parameters**:
  - `str: any` - Input to convert (returns as-is if not a string).
- **Returns**: `any` - Title case string or original value.
- **Usage**: `toTitleCase("hello world") // "Hello World"`

### `getCookie`
- **Description**: Retrieves a cookie value by name.
- **Parameters**:
  - `cname: string` - Cookie name.
- **Returns**: `string | null` - Cookie value or null if not found.
- **Usage**: `getCookie("session") // "abc123"`

### `removeCookie`
- **Description**: Removes a cookie by setting an expired date.
- **Parameters**:
  - `cname: string` - Cookie name.
- **Returns**: `void`
- **Usage**: `removeCookie("session")`

### `setCookie`
- **Description**: Sets a cookie with a name, value, and expiration days.
- **Parameters**:
  - `cname: string` - Cookie name.
  - `cvalue: string` - Cookie value.
  - `exdays: number` - Expiration days.
- **Returns**: `void`
- **Usage**: `setCookie("session", "abc123", 7)`

### `printErr`
- **Description**: Displays an error message for a form field by modifying the DOM.
- **Parameters**:
  - `key: string` - Field name.
  - `value: string` - Error message.
  - `index: number` - Index for focusing the first error.
- **Returns**: `void`
- **Usage**: `printErr("username", "Required", 0)`

### `handleError`
- **Description**: Handles server response errors for forms, updating UI accordingly.
- **Parameters**:
  - `status: number` - HTTP status code.
  - `items: Record<string, string[]>` - Error or success data.
  - `registerForm: HTMLFormElement | null` - Form element.
  - `r_path: string | null` - Redirect path.
- **Returns**: `void`
- **Usage**: `handleError(400, { username: ["Required"] }, form, null)`

### `reqOptions`
- **Description**: Creates request options for fetch API calls.
- **Parameters**:
  - `method: string` - HTTP method (e.g., "POST").
  - `data?: BodyInit | FormData | null` - Request body.
  - `token?: string | null` - Authorization token.
  - `content_type?: "json" | "form-data" | false` - Content type.
  - `channel?: string | null` - Channel ID.
  - `auth_sk?: boolean` - Use auth secret.
- **Returns**: `RequestOptions` - Configured request options.
- **Usage**: `reqOptions("POST", formData, "token")`

### `fetchAPI`
- **Description**: Fetches data from an API with error handling.
- **Parameters**:
  - `session: ((data: T) => void) | { setState: ... }` - Callback or state setter.
  - `api: string` - API endpoint.
  - `reqOptions: RequestOptions` - Request options.
  - `isFunctionComponent?: boolean` - Functional component flag.
  - `setStatus?: (status: number | null) => void` - Status setter.
  - `setError?: (error: any) => void` - Error setter.
  - `flag?: boolean` - Handle status errors.
- **Returns**: `Promise<T | Error>` - Result or error.
- **Usage**: `await fetchAPI(setData, "/api", reqOptions())`

### `handleStatusError`
- **Description**: Handles HTTP status errors with navigation.
- **Parameters**:
  - `status: number` - HTTP status code.
- **Returns**: `void`
- **Usage**: `handleStatusError(404) // Triggers notFound()`

### `spinBtn`
- **Description**: Toggles a form button’s spinner and disabled state.
- **Parameters**:
  - `form: HTMLFormElement | null` - Form element.
  - `display: "none" | "inline-block"` - Spinner visibility.
  - `status: boolean` - Disabled state.
- **Returns**: `void`
- **Usage**: `spinBtn(form, "inline-block", true)`

### `handleResendOTP`
- **Description**: Resends an OTP to an email address.
- **Parameters**:
  - `email: string` - User email.
- **Returns**: `Promise<any>` - Response data.
- **Usage**: `await handleResendOTP("user@example.com")`

## Usage Examples

```typescript
// Example 1: Strip HTML Tags
const cleanText = stripHtmlTags("<div>Hello <b>World</b></div>");
console.log(cleanText); // "Hello World"

// Example 2: Calculate Total Credits
const courses = [{ course: { credits: "3" } }, { course: { credits: "4" } }];
const total = calculateTotalCredits(courses);
console.log(total); // 7

// Example 3: Format Number with Commas
const formatted = formatNumberWithCommas(1234567.89);
console.log(formatted); // "1,234,567.89"

// Example 4: Fetch API Data
const fetchData = async () => {
  const options = reqOptions("GET", null, "my-token");
  const result = await fetchAPI(console.log, "/api/data", options);
};
fetchData();
```