# Helper Functions

**Category:** Library | **Type:** utility collection

A comprehensive collection of utility functions for common development tasks including string manipulation, data formatting, API requests, form handling, and browser operations.

## 📁 File Location

`src/components/lib/helpFunction.ts`

## 🏷️ Tags

`utilities`, `helpers`, `api`, `format`, `validation`, `dom`, `string`, `data`

## 📖 Usage Examples

### Example 1: String and Text Utilities

```tsx
"use client";

import React, { useState } from "react";
import {
  stripHtmlTags,
  convertToSlug,
  toTitleCase,
  truncateHtml,
  slugifyFileName,
  isValidEmail,
  isValidAlphanumeric,
} from "@instincthub/react-ui/lib";

/**
 * Example demonstrating string and text utility functions
 */
const StringUtilitiesExample = () => {
  const [inputText, setInputText] = useState<string>("Hello <b>World</b>! This is a Test.");
  const [emailInput, setEmailInput] = useState<string>("user@example.com");
  const [alphanumericInput, setAlphanumericInput] = useState<string>("test123");

  return (
    <div className="ihub-container ihub-py-5">
      <h1>String & Text Utilities</h1>

      {/* HTML Tag Stripping */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Strip HTML Tags</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-mb-3">
            <label className="ihub-form-label">Input with HTML:</label>
            <input
              className="ihub-form-control"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text with HTML tags"
            />
          </div>
          <div className="ihub-alert ihub-alert-info">
            <strong>Stripped:</strong> {stripHtmlTags(inputText)}
          </div>
          <div className="ihub-alert ihub-alert-secondary">
            <strong>Title Case:</strong> {toTitleCase(stripHtmlTags(inputText))}
          </div>
          <div className="ihub-alert ihub-alert-light">
            <strong>Slug:</strong> {convertToSlug(stripHtmlTags(inputText))}
          </div>
          <div className="ihub-alert ihub-alert-warning">
            <strong>Truncated (20 chars):</strong> {truncateHtml(inputText, 20)}
          </div>
        </div>
      </section>

      {/* Validation Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Input Validation</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h5>Email Validation</h5>
              <input
                className={`ihub-form-control ${isValidEmail(emailInput) ? 'is-valid' : 'is-invalid'}`}
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter email address"
              />
              <div className={`${isValidEmail(emailInput) ? 'valid' : 'invalid'}-feedback`}>
                {isValidEmail(emailInput) ? 'Valid email format' : 'Invalid email format'}
              </div>
            </div>
          </div>
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h5>Alphanumeric Validation</h5>
              <input
                className={`ihub-form-control ${isValidAlphanumeric(alphanumericInput) ? 'is-valid' : 'is-invalid'}`}
                value={alphanumericInput}
                onChange={(e) => setAlphanumericInput(e.target.value)}
                placeholder="Enter alphanumeric text"
              />
              <div className={`${isValidAlphanumeric(alphanumericInput) ? 'valid' : 'invalid'}-feedback`}>
                {isValidAlphanumeric(alphanumericInput) ? 'Valid alphanumeric (3+ chars)' : 'Must be alphanumeric, 3+ characters'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* File Name Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">File Name Utilities</h2>
        <div className="ihub-card ihub-p-4">
          {[
            "My Document (Final Version).pdf",
            "Project Screenshots & Images.zip",
            "User Data - Export 2024.csv",
            "Very Long File Name That Needs To Be Shortened For Better Compatibility.docx"
          ].map((fileName, index) => (
            <div key={index} className="ihub-mb-3 ihub-p-3 ihub-bg-light ihub-rounded">
              <div><strong>Original:</strong> {fileName}</div>
              <div><strong>Slugified:</strong> <code>{slugifyFileName(fileName)}</code></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StringUtilitiesExample;
```

### Example 2: Number and Data Formatting

```tsx
"use client";

import React, { useState } from "react";
import {
  stripCommaFromNumber,
  formatNumberWithCommas,
  convertToFloat,
  calculateAmountAfterDeduction,
  formatDuration,
} from "@instincthub/react-ui/lib";

/**
 * Example demonstrating number and data formatting utilities
 */
const NumberFormattingExample = () => {
  const [numberInput, setNumberInput] = useState<string>("1,234,567.89");
  const [amount, setAmount] = useState<number>(1000);
  const [percentage, setPercentage] = useState<number>(15);
  const [duration, setDuration] = useState<number>(125);

  const deductionResult = calculateAmountAfterDeduction(amount, percentage);

  return (
    <div className="ihub-container ihub-py-5">
      <h1>Number & Data Formatting</h1>

      {/* Number Formatting */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Number Formatting</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-mb-3">
            <label className="ihub-form-label">Number with Commas:</label>
            <input
              className="ihub-form-control"
              value={numberInput}
              onChange={(e) => setNumberInput(e.target.value)}
              placeholder="Enter number with commas"
            />
          </div>
          <div className="ihub-row">
            <div className="ihub-col-md-4">
              <div className="ihub-alert ihub-alert-info">
                <strong>Stripped Number:</strong><br />
                {stripCommaFromNumber(numberInput)}
              </div>
            </div>
            <div className="ihub-col-md-4">
              <div className="ihub-alert ihub-alert-success">
                <strong>As Float:</strong><br />
                {convertToFloat(numberInput)}
              </div>
            </div>
            <div className="ihub-col-md-4">
              <div className="ihub-alert ihub-alert-warning">
                <strong>Formatted:</strong><br />
                {formatNumberWithCommas(convertToFloat(numberInput))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amount Calculation */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Amount Calculation</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-row ihub-mb-3">
            <div className="ihub-col-md-6">
              <label className="ihub-form-label">Amount:</label>
              <input
                type="number"
                className="ihub-form-control"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            <div className="ihub-col-md-6">
              <label className="ihub-form-label">Deduction Percentage:</label>
              <input
                type="number"
                className="ihub-form-control"
                value={percentage}
                onChange={(e) => setPercentage(Number(e.target.value))}
                min="0"
                max="100"
              />
            </div>
          </div>
          <div className={`ihub-alert ${deductionResult.detail ? 'ihub-alert-danger' : 'ihub-alert-success'}`}>
            {deductionResult.detail ? (
              <>
                <strong>Error:</strong> {deductionResult.detail}
              </>
            ) : (
              <>
                <strong>Final Amount:</strong> {formatNumberWithCommas(deductionResult.amount)}<br />
                <small>Deduction: {formatNumberWithCommas((amount * percentage) / 100)}</small>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Duration Formatting */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Duration Formatting</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-mb-3">
            <label className="ihub-form-label">Duration in Minutes:</label>
            <input
              type="number"
              className="ihub-form-control"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="0"
            />
          </div>
          <div className="ihub-alert ihub-alert-info">
            <strong>Formatted Duration:</strong> {formatDuration(duration)}
          </div>
          
          <h6 className="ihub-mt-4">Common Duration Examples:</h6>
          <div className="ihub-row">
            {[30, 45, 90, 120, 180, 300, 450].map((mins) => (
              <div key={mins} className="ihub-col-md-3 ihub-mb-2">
                <div className="ihub-badge ihub-badge-light ihub-w-100">
                  {mins}min → {formatDuration(mins)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NumberFormattingExample;
```

### Example 3: Date and Time Utilities

```tsx
"use client";

import React, { useState } from "react";
import { formatDateToWord } from "@instincthub/react-ui/lib";

/**
 * Example demonstrating date and time utility functions
 */
const DateTimeExample = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const dateFormats = [
    { label: "Default", format: "iiii do MMMM yyyy" },
    { label: "Short", format: "dd/MM/yyyy" },
    { label: "Long", format: "EEEE, MMMM do, yyyy" },
    { label: "ISO", format: "yyyy-MM-dd" },
    { label: "Time", format: "HH:mm:ss" },
    { label: "Date & Time", format: "MMM dd, yyyy 'at' HH:mm" },
  ];

  return (
    <div className="ihub-container ihub-py-5">
      <h1>Date & Time Utilities</h1>

      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Date Formatting</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-mb-3">
            <label className="ihub-form-label">Select Date:</label>
            <input
              type="date"
              className="ihub-form-control"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          
          <div className="ihub-row">
            {dateFormats.map((format, index) => (
              <div key={index} className="ihub-col-md-6 ihub-mb-3">
                <div className="ihub-card ihub-p-3">
                  <h6>{format.label}</h6>
                  <code className="ihub-d-block ihub-p-2 ihub-bg-light">
                    {formatDateToWord(selectedDate, format.format)}
                  </code>
                  <small className="text-muted">{format.format}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DateTimeExample;
```

### Example 4: API Request Utilities

```tsx
"use client";

import React, { useState } from "react";
import { reqOptions, fetchAPI } from "@instincthub/react-ui/lib";

/**
 * Example demonstrating API request utility functions
 */
const APIUtilitiesExample = () => {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [status, setStatus] = useState<number | null>(null);

  const handleAPICall = async () => {
    setLoading(true);
    const options = reqOptions(
      "GET",
      null,
      null,
      "json",
      null,
      false
    );

    await fetchAPI(
      setResponse,
      "https://jsonplaceholder.typicode.com/posts/1",
      options,
      true,
      setLoading,
      setStatus,
      setError,
      false
    );
  };

  return (
    <div className="ihub-container ihub-py-5">
      <h1>API Request Utilities</h1>

      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Fetch API Helper</h2>
        <div className="ihub-card ihub-p-4">
          <button
            className="ihub-btn ihub-btn-primary ihub-mb-3"
            onClick={handleAPICall}
            disabled={loading}
          >
            {loading ? "Loading..." : "Make API Call"}
          </button>

          {status && (
            <div className={`ihub-alert ${status < 400 ? 'ihub-alert-success' : 'ihub-alert-danger'}`}>
              <strong>Status:</strong> {status}
            </div>
          )}

          {response && (
            <div className="ihub-alert ihub-alert-info">
              <h6>Response:</h6>
              <pre style={{ fontSize: "12px", maxHeight: "200px", overflow: "auto" }}>
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          )}

          {error && (
            <div className="ihub-alert ihub-alert-danger">
              <strong>Error:</strong> {JSON.stringify(error)}
            </div>
          )}
        </div>
      </section>

      {/* Request Options Example */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Request Options Builder</h2>
        <div className="ihub-card ihub-p-4">
          <h6>Example Request Options:</h6>
          <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "12px" }}>
{`// GET request with JSON content type
const getOptions = reqOptions("GET", null, "token123", "json");

// POST request with FormData
const formData = new FormData();
formData.append("key", "value");
const postOptions = reqOptions("POST", formData, "token123", "form-data");

// PUT request with JSON data
const jsonData = JSON.stringify({ name: "John" });
const putOptions = reqOptions("PUT", jsonData, "token123", "json");`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default APIUtilitiesExample;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import {
  stripHtmlTags,
  convertToSlug,
  formatNumberWithCommas,
  reqOptions,
  fetchAPI
} from '@instincthub/react-ui/lib';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { stripHtmlTags, formatNumberWithCommas, reqOptions } from '@instincthub/react-ui/lib';

function UtilityExample() {
  // String utilities
  const cleanText = stripHtmlTags("<p>Hello <b>World</b></p>");
  
  // Number formatting
  const formattedNumber = formatNumberWithCommas(1234567);
  
  // API request options
  const options = reqOptions("POST", data, token, "json");

  return (
    <div>
      <p>Clean text: {cleanText}</p>
      <p>Formatted number: {formattedNumber}</p>
    </div>
  );
}
```

## 🔧 Key Functions

### String Utilities
- [`stripHtmlTags(str)`](./helpFunction/stripHtmlTags.md) - Remove HTML tags from string
- [`convertToSlug(value)`](./helpFunction/convertToSlug.md) - Convert string to URL-friendly slug
- `toTitleCase(str)` - Convert string to title case
- `truncateHtml(text, maxLength)` - Truncate HTML content
- `slugifyFileName(fileName)` - Create URL-friendly file names

### Validation
- [`isValidEmail(input)`](./helpFunction/isValidEmail.md) - Validate email format
- `isValidAlphanumeric(input)` - Validate alphanumeric input

### Number Formatting
- [`formatNumberWithCommas(number)`](./helpFunction/formatNumberWithCommas.md) - Format numbers with commas
- `stripCommaFromNumber(str)` - Remove commas from number string
- `convertToFloat(value)` - Convert string to float
- `calculateAmountAfterDeduction(amount, percentage)` - Calculate amount after percentage deduction

### Date/Time
- [`formatDateToWord(date, type)`](./helpFunction/formatDateToWord.md) - Format dates to readable strings
- `formatDuration(durationInMinutes)` - Format duration to readable string

### API Utilities
- [`reqOptions(method, data, token, contentType, channel, authSk)`](./helpFunction/reqOptions.md) - Create request options
- `fetchAPI(session, api, reqOptions, ...)` - Fetch data with error handling

### Browser Utilities
- `getCookie(name)` - Get cookie value
- `setCookie(name, value, days)` - Set cookie
- `removeCookie(name)` - Remove cookie
- `TrackViewPort(element)` - Check if element is in viewport

## 📚 Individual Function Documentation

For detailed documentation, examples, and usage guides for each function, see:

### String & Text Functions
- [stripHtmlTags](./helpFunction/stripHtmlTags.md) - Clean HTML tags from strings
- [convertToSlug](./helpFunction/convertToSlug.md) - Generate URL-friendly slugs

### Validation Functions  
- [isValidEmail](./helpFunction/isValidEmail.md) - Email format validation

### Number & Data Functions
- [formatNumberWithCommas](./helpFunction/formatNumberWithCommas.md) - Format numbers with thousands separators

### Date & Time Functions
- [formatDateToWord](./helpFunction/formatDateToWord.md) - Human-readable date formatting

### API & Request Functions
- [reqOptions](./helpFunction/reqOptions.md) - HTTP request configuration builder

### Browser & Storage Functions
- [getCookie](./helpFunction/getCookie.md) - Retrieve browser cookie values

## 📁 Complete Function Reference

For a complete list of all available function documentation, see the [helpFunction directory](./helpFunction/README.md).

## 💡 Use Cases

- Form validation and data processing
- API communication and request handling
- String manipulation and formatting
- Number and currency formatting
- Date and time display
- File name processing
- Browser storage management
- DOM manipulation and validation

## 🔗 Related Utilities

- [format](./format.md) - Time formatting utilities
- [fileToBase64](./fileToBase64.md) - File conversion utilities
- [convertArrayToObject](./convertArrayToObject.md) - Data transformation utilities