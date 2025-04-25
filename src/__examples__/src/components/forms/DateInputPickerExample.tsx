"use client";

import React, { useState } from "react";
import { DateInputPicker } from "../../../../index";

const DateInputPickerExample: React.FC = () => {
  const [simpleDate, setSimpleDate] = useState<string>("");
  const [dateWithTime, setDateWithTime] = useState<string>("");
  const [dateWithRange, setDateWithRange] = useState<string>("");

  // Get today and tomorrow's dates for the example
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const minDate = today.toISOString().split("T")[0];
  const maxDate = new Date(
    today.getFullYear() + 1,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];

  // Disabled dates (example: weekends for the next month)
  const disabledDates: string[] = [];
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1);

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    // Disable weekends (Saturday = 6, Sunday = 0)
    if (d.getDay() === 0 || d.getDay() === 6) {
      disabledDates.push(d.toISOString().split("T")[0]);
    }
  }

  return (
    <div className="ihub-container">
      <h2>Date Input Examples</h2>

      <div className="ihub-example-section">
        <h3>Simple Date Input</h3>
        <DateInputPicker
          label="Select a date"
          value={simpleDate}
          onChange={(date) => setSimpleDate(date)}
          required
        />
        <p>Selected date: {simpleDate || "None"}</p>
      </div>

      <div className="ihub-example-section">
        <h3>Date and Time Input</h3>
        <DateInputPicker
          label="Select date and time"
          value={dateWithTime}
          onChange={(date) => setDateWithTime(date)}
          includeTime
          showQuickActions
        />
        <p>Selected date and time: {dateWithTime || "None"}</p>
      </div>

      <div className="ihub-example-section">
        <h3>Date with Range and Disabled Dates</h3>
        <DateInputPicker
          label="Event date (weekends disabled)"
          value={dateWithRange}
          onChange={(date) => setDateWithRange(date)}
          minDate={minDate}
          maxDate={maxDate}
          disabledDates={disabledDates}
          required
          ariaLabel="Event date selection"
        />
        <p>Selected event date: {dateWithRange || "None"}</p>
        <p className="ihub-note ihub-mb-5">
          Note: Today's date is {minDate}, and you can select up to {maxDate}.
          Weekends are disabled.
        </p>
      </div>
    </div>
  );
};

export default DateInputPickerExample;
