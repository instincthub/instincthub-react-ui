"use client";
import React from "react";
import { DateInputPicker } from "../../../../index";
import { DateInputPickerTimePropsType } from "../../../../types";

/**
 * Props for the DateInputPickerTimeExample component
 */

/**
 * A component specifically for date and time selection
 */
const DateInputPickerTimeExample: React.FC<DateInputPickerTimePropsType> = ({
  timeFormat = "24h",
  includeSeconds = false,
  minuteStep = 1,
  ...dateInputProps
}) => {
  // Extend the onChange handler to format time according to preferences
  const handleDateTimeChange = (dateTime: string) => {
    if (!dateTime || !dateInputProps.onChange)
      return dateInputProps.onChange?.(dateTime);

    // If date has time component
    if (dateTime.includes("T")) {
      try {
        const [datePart, timePart] = dateTime.split("T");
        const [hours, minutes, seconds] = timePart.split(":");

        // Format the time based on timeFormat
        let formattedTime = "";
        if (timeFormat === "12h") {
          const hour = parseInt(hours);
          const ampm = hour >= 12 ? "PM" : "AM";
          const hour12 = hour % 12 || 12; // Convert 0 to 12
          formattedTime = `${hour12}:${minutes}${
            includeSeconds ? `:${seconds}` : ""
          } ${ampm}`;
        } else {
          formattedTime = `${hours}:${minutes}${
            includeSeconds ? `:${seconds}` : ""
          }`;
        }

        // Pass the full ISO string to the original onChange, but return formatted text for display
        dateInputProps.onChange(dateTime);
      } catch (error) {
        // If parsing fails, just pass through
        dateInputProps.onChange(dateTime);
      }
    } else {
      // If no time component, just pass through
      dateInputProps.onChange(dateTime);
    }
  };

  return (
    <section className="ihub-container">
      <div className="ihub-example-section">
        <h3>Date Time Input</h3>
        <DateInputPicker
          {...dateInputProps}
          includeTime={true}
          onChange={handleDateTimeChange}
        />
      </div>
    </section>
  );
};

export default DateInputPickerTimeExample;
