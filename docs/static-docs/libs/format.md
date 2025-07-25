# formatTime

**Category:** Library | **Type:** utility

A utility function that formats time in seconds into a human-readable time string format (MM:SS or HH:MM). Perfect for displaying video durations, timestamps, and time-based content.

## 📁 File Location

`src/components/lib/format.ts`

## 🏷️ Tags

`time`, `duration`, `format`, `video`, `utility`, `timestamp`

## 📖 Usage Examples

### Example 1: Complete Time Formatting Demo

```tsx
"use client";

import React, { useState } from "react";
import { formatTime } from "@instincthub/react-ui/lib";

/**
 * Comprehensive example demonstrating formatTime utility with various time values
 */
const FormatTimeExamples = () => {
  const [customTime, setCustomTime] = useState<number>(0);

  // Sample time values for demonstration
  const timeExamples = [
    { seconds: 0, description: "Zero seconds" },
    { seconds: 30, description: "Half minute" },
    { seconds: 90, description: "One and half minutes" },
    { seconds: 180, description: "Three minutes" },
    { seconds: 3600, description: "One hour" },
    { seconds: 3661, description: "One hour, one minute, one second" },
    { seconds: 7200, description: "Two hours" },
    { seconds: 7830, description: "Two hours, ten minutes, thirty seconds" },
    { seconds: NaN, description: "Invalid time (NaN)" },
  ];

  const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setCustomTime(value);
  };

  return (
    <div className="ihub-container ihub-py-5">
      <h1>formatTime Utility Examples</h1>

      {/* Basic Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Common Time Formats</h2>
        <div className="ihub-row">
          {timeExamples.map((example, index) => (
            <div key={index} className="ihub-col-md-6 ihub-mb-3">
              <div className="ihub-card ihub-p-3">
                <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                  <div>
                    <strong>{example.description}</strong>
                    <br />
                    <small className="text-muted">{example.seconds} seconds</small>
                  </div>
                  <div className="ihub-badge ihub-badge-primary ihub-fs-md">
                    {formatTime(example.seconds)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Example */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Interactive Time Formatter</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-mb-3">
            <label htmlFor="timeInput" className="ihub-form-label">
              Enter time in seconds:
            </label>
            <input
              id="timeInput"
              type="number"
              className="ihub-form-control"
              value={customTime}
              onChange={handleCustomTimeChange}
              placeholder="Enter seconds (e.g., 3661)"
              min="0"
            />
          </div>
          <div className="ihub-alert ihub-alert-info">
            <strong>Formatted Time:</strong> {formatTime(customTime)}
          </div>
        </div>
      </section>

      {/* Video Player Example */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Video Player Use Case</h2>
        <div className="ihub-card ihub-p-4">
          <div className="video-player-mockup" style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px" }}>
            <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center ihub-mb-3">
              <h5>Sample Video Player</h5>
              <div className="ihub-badge ihub-badge-secondary">
                Duration: {formatTime(4567)}
              </div>
            </div>
            <div className="progress-bar" style={{ height: "6px", backgroundColor: "#e9ecef", borderRadius: "3px", position: "relative" }}>
              <div style={{ height: "100%", width: "45%", backgroundColor: "#007bff", borderRadius: "3px" }}></div>
            </div>
            <div className="ihub-d-flex ihub-justify-content-between ihub-mt-2">
              <span className="time-current">{formatTime(2055)}</span>
              <span className="time-total">{formatTime(4567)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Course Duration Example */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Course Duration Display</h2>
        <div className="ihub-row">
          {[
            { title: "Introduction to React", duration: 1800 },
            { title: "Advanced JavaScript", duration: 5400 },
            { title: "Full Stack Development", duration: 14400 },
            { title: "Quick Tips", duration: 300 },
          ].map((course, index) => (
            <div key={index} className="ihub-col-md-6 ihub-mb-3">
              <div className="ihub-card ihub-p-3">
                <h6 className="ihub-card-title">{course.title}</h6>
                <div className="ihub-d-flex ihub-align-items-center ihub-text-muted">
                  <i className="pi pi-clock ihub-me-2"></i>
                  <span>{formatTime(course.duration)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Edge Cases */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Edge Cases</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-4 ihub-mb-3">
            <div className="ihub-card ihub-p-3 text-center">
              <h6>Zero Time</h6>
              <div className="ihub-badge ihub-badge-light ihub-fs-lg">
                {formatTime(0)}
              </div>
            </div>
          </div>
          <div className="ihub-col-md-4 ihub-mb-3">
            <div className="ihub-card ihub-p-3 text-center">
              <h6>Invalid Time (NaN)</h6>
              <div className="ihub-badge ihub-badge-light ihub-fs-lg">
                {formatTime(NaN)}
              </div>
            </div>
          </div>
          <div className="ihub-col-md-4 ihub-mb-3">
            <div className="ihub-card ihub-p-3 text-center">
              <h6>Large Number</h6>
              <div className="ihub-badge ihub-badge-light ihub-fs-lg">
                {formatTime(86400)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FormatTimeExamples;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { formatTime } from '@instincthub/react-ui/lib';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { formatTime } from '@instincthub/react-ui/lib';

function VideoComponent() {
  const videoDuration = 3661; // 1 hour, 1 minute, 1 second

  return (
    <div>
      <p>Video Duration: {formatTime(videoDuration)}</p>
      {/* Output: Video Duration: 1:01 */}
    </div>
  );
}
```

## 🔧 Function Signature

```tsx
formatTime(time: number): string
```

### Parameters

- `time` (number): Time in seconds to format

### Returns

- `string`: Formatted time string in MM:SS or HH:MM format

## 📝 Format Rules

- **Invalid input (NaN)**: Returns "00:00"
- **Less than 1 hour**: Returns "MM:SS" format (e.g., "5:30")
- **1 hour or more**: Returns "H:MM" format (e.g., "1:05")
- **Hours are not zero-padded**: "1:05" not "01:05"
- **Minutes and seconds are zero-padded**: "5:05" not "5:5"

## 💡 Use Cases

- Video player duration display
- Course/lesson time indicators
- Timestamp formatting
- Timer and countdown displays
- Audio player duration
- Meeting/call duration tracking

## 🔗 Related Utilities

- [formatDuration](./formatDuration.md) - Format duration in minutes to readable string
- [formatDateToWord](./formatDateToWord.md) - Format dates to word format
- [formatNumberWithCommas](./formatNumberWithCommas.md) - Format numbers with commas