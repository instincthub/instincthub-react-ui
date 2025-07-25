# formatDateToWord

**Category:** Library | **Type:** date utility

Format dates into human-readable strings using various predefined and custom patterns.

**File Location:** `src/components/lib/helpFunction.ts`

## 🏷️ Tags

`date`, `format`, `time`, `display`, `utility`

## 📖 Usage Example

```tsx
"use client";

import React, { useState } from "react";
import { formatDateToWord } from "@instincthub/react-ui/lib";

/**
 * Example demonstrating formatDateToWord function
 */
const DateFormattingExample = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const currentDateTime = new Date().toISOString();

  const formatPatterns = [
    { label: "Default", pattern: "iiii do MMMM yyyy", description: "Full day and date" },
    { label: "Short Date", pattern: "dd/MM/yyyy", description: "Numeric format" },
    { label: "Long Date", pattern: "EEEE, MMMM do, yyyy", description: "Full verbose format" },
    { label: "ISO Date", pattern: "yyyy-MM-dd", description: "Standard ISO format" },
    { label: "Month Year", pattern: "MMMM yyyy", description: "Month and year only" },
    { label: "Time Only", pattern: "HH:mm:ss", description: "24-hour time format" },
    { label: "12-hour Time", pattern: "h:mm a", description: "12-hour with AM/PM" },
    { label: "Date & Time", pattern: "MMM dd, yyyy 'at' HH:mm", description: "Date with time" },
    { label: "Relative", pattern: "do MMMM", description: "Day and month" },
    { label: "Custom", pattern: "yyyy-MM-dd HH:mm:ss", description: "Database timestamp format" }
  ];

  return (
    <div className="ihub-container ihub-py-5">
      <h1>Date Formatting Example</h1>

      <section className="ihub-mb-5">
        <div className="ihub-card ihub-p-4">
          <div className="ihub-row ihub-mb-3">
            <div className="ihub-col-md-6">
              <label className="ihub-form-label">Select Date:</label>
              <input
                type="date"
                className="ihub-form-control"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="ihub-col-md-6">
              <label className="ihub-form-label">Raw Date Value:</label>
              <input
                type="text"
                className="ihub-form-control"
                value={selectedDate}
                readOnly
                style={{ backgroundColor: '#f8f9fa' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Format Examples */}
      <section className="ihub-mb-5">
        <h2>Date Format Examples</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-row">
            {formatPatterns.map((format, index) => (
              <div key={index} className="ihub-col-md-6 ihub-mb-3">
                <div className="ihub-border ihub-p-3 ihub-rounded">
                  <h6 className="ihub-mb-2">{format.label}</h6>
                  <div className="ihub-fs-lg ihub-mb-2">
                    <strong>{formatDateToWord(selectedDate, format.pattern)}</strong>
                  </div>
                  <div>
                    <small className="text-muted">Pattern: <code>{format.pattern}</code></small>
                  </div>
                  <div>
                    <small className="text-muted">{format.description}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Date/Time Examples */}
      <section className="ihub-mb-5">
        <h2>Current Date/Time Examples</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-row">
            <div className="ihub-col-md-4">
              <div className="ihub-text-center ihub-border ihub-p-3">
                <h6>Today's Date</h6>
                <div className="ihub-fs-lg">
                  {formatDateToWord(currentDateTime, "EEEE")}
                </div>
                <div className="text-muted">
                  {formatDateToWord(currentDateTime, "MMMM do, yyyy")}
                </div>
              </div>
            </div>
            <div className="ihub-col-md-4">
              <div className="ihub-text-center ihub-border ihub-p-3">
                <h6>Current Time</h6>
                <div className="ihub-fs-lg">
                  {formatDateToWord(currentDateTime, "HH:mm")}
                </div>
                <div className="text-muted">
                  {formatDateToWord(currentDateTime, "h:mm a")}
                </div>
              </div>
            </div>
            <div className="ihub-col-md-4">
              <div className="ihub-text-center ihub-border ihub-p-3">
                <h6>Full DateTime</h6>
                <div className="ihub-fs-sm">
                  {formatDateToWord(currentDateTime, "MMM dd, yyyy")}
                </div>
                <div className="text-muted">
                  {formatDateToWord(currentDateTime, "HH:mm:ss")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pattern Reference */}
      <section className="ihub-mb-5">
        <h2>Pattern Reference</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <h5>Date Patterns</h5>
              <ul className="list-unstyled">
                <li><code>yyyy</code> - 4-digit year (2024)</li>
                <li><code>MM</code> - 2-digit month (01-12)</li>
                <li><code>MMM</code> - Short month (Jan)</li>
                <li><code>MMMM</code> - Full month (January)</li>
                <li><code>dd</code> - 2-digit day (01-31)</li>
                <li><code>do</code> - Ordinal day (1st, 2nd, 3rd)</li>
                <li><code>EEEE</code> - Full weekday (Monday)</li>
                <li><code>EEE</code> - Short weekday (Mon)</li>
              </ul>
            </div>
            <div className="ihub-col-md-6">
              <h5>Time Patterns</h5>
              <ul className="list-unstyled">
                <li><code>HH</code> - 24-hour format (00-23)</li>
                <li><code>h</code> - 12-hour format (1-12)</li>
                <li><code>mm</code> - Minutes (00-59)</li>
                <li><code>ss</code> - Seconds (00-59)</li>
                <li><code>a</code> - AM/PM</li>
                <li><code>'text'</code> - Literal text</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DateFormattingExample;
```

## 🚀 Basic Usage

```tsx
import { formatDateToWord } from '@instincthub/react-ui/lib';

// Basic usage
const date = "2024-01-15";
const formatted = formatDateToWord(date, "MMMM do, yyyy");
// Result: "January 15th, 2024"

// Common scenarios
const shortDate = formatDateToWord(date, "dd/MM/yyyy");     // "15/01/2024"
const longDate = formatDateToWord(date, "EEEE, MMMM do");  // "Monday, January 15th"
const timeStamp = formatDateToWord(date, "yyyy-MM-dd HH:mm"); // "2024-01-15 00:00"
```

## 🔧 Function Signature

```typescript
function formatDateToWord(date: string | Date, type?: string): string
```

### Parameters

- **date** (string | Date): The date to format (ISO string, Date object, or valid date string)
- **type** (string, optional): The format pattern. Defaults to `"iiii do MMMM yyyy"`

### Returns

- **string**: The formatted date string according to the specified pattern

## 💡 Use Cases

- **Display Dates**: Show user-friendly dates in UI components
- **Blog Posts**: Format publication dates
- **Event Listings**: Display event dates and times
- **Reports**: Format dates in reports and documents
- **Timestamps**: Show when content was created or updated
- **Calendars**: Display dates in calendar components
- **Dashboard**: Format dates in analytics and metrics

## 📅 Common Format Patterns

```tsx
// Popular date formats
formatDateToWord(date, "MMMM do, yyyy")        // "January 15th, 2024"
formatDateToWord(date, "dd/MM/yyyy")           // "15/01/2024"
formatDateToWord(date, "MM/dd/yyyy")           // "01/15/2024"
formatDateToWord(date, "yyyy-MM-dd")           // "2024-01-15"
formatDateToWord(date, "EEEE, MMMM do")        // "Monday, January 15th"

// Time formats
formatDateToWord(date, "HH:mm")                // "14:30"
formatDateToWord(date, "h:mm a")               // "2:30 PM"
formatDateToWord(date, "HH:mm:ss")             // "14:30:45"

// Combined formats
formatDateToWord(date, "MMM dd, yyyy 'at' HH:mm") // "Jan 15, 2024 at 14:30"
```

## ⚠️ Important Notes

- Supports both string and Date object inputs
- Uses date-fns library internally for formatting
- Invalid dates may return error strings
- Time zone handling depends on input format
- Custom text can be included using single quotes

## 🔗 Related Functions

- [formatDuration](./formatDuration.md) - Format time durations
- [ReactTimeAgo](../components/ReactTimeAgo.md) - Display relative time