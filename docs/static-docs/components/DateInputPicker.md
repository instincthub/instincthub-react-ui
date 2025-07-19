# DateInputPicker

**Category:** Form | **Type:** component

A comprehensive date input component with built-in calendar picker, date validation, and optional time selection. Supports keyboard navigation, accessibility features, date range restrictions, and disabled dates.

## 🏷️ Tags

`form`, `input`, `date`, `calendar`, `picker`, `validation`

```tsx
"use client";
import React, { useState } from "react";
import { DateInputPicker } from "@instincthub/react-ui";

/**
 * Example component demonstrating various ways to use the DateInputPicker
 */
const DateInputPickerExamples = () => {
  // Basic date state management
  const [basicDate, setBasicDate] = useState<string>("");
  const [appointmentDate, setAppointmentDate] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  const [deadlineDate, setDeadlineDate] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [meetingDateTime, setMeetingDateTime] = useState<string>("");
  const [rangeStartDate, setRangeStartDate] = useState<string>("");
  const [rangeEndDate, setRangeEndDate] = useState<string>("");

  // Form state for demonstration
  const [formData, setFormData] = useState({
    eventTitle: "",
    eventDate: "",
    eventTime: "",
  });

  // Calculate date constraints
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const nextMonthStr = nextMonth.toISOString().split("T")[0];

  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const nextYearStr = nextYear.toISOString().split("T")[0];

  const minAge18Date = new Date();
  minAge18Date.setFullYear(minAge18Date.getFullYear() - 18);
  const minAge18Str = minAge18Date.toISOString().split("T")[0];

  // Generate disabled dates (weekends for next 30 days)
  const generateDisabledWeekends = (): string[] => {
    const disabled: string[] = [];
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 30);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      if (d.getDay() === 0 || d.getDay() === 6) {
        // Sunday = 0, Saturday = 6
        disabled.push(d.toISOString().split("T")[0]);
      }
    }
    return disabled;
  };

  const disabledWeekends = generateDisabledWeekends();

  // Generate holiday dates (example: Christmas, New Year)
  const getHolidayDates = (): string[] => {
    const currentYear = new Date().getFullYear();
    return [
      `${currentYear}-12-25`, // Christmas
      `${currentYear + 1}-01-01`, // New Year
      `${currentYear}-07-04`, // Independence Day
    ];
  };

  const holidayDates = getHolidayDates();

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>DateInputPicker Examples</h1>

      <div className="ihub-grid ihub-gap-4 ihub-py-5">
        {/* Basic Date Picker */}
        <div className="ihub-card ihub-p-4">
          <h2 className="ihub-mb-3">Basic Date Selection</h2>
          <DateInputPicker
            label="Select a Date"
            value={basicDate}
            onChange={setBasicDate}
            placeholder="YYYY-MM-DD"
            name="basic_date"
            required
          />
          <p className="ihub-mt-2 ihub-text-sm">
            Selected: {basicDate || "No date selected"}
          </p>
        </div>

        {/* Appointment Booking */}
        <div className="ihub-card ihub-p-4">
          <h2 className="ihub-mb-3">Appointment Booking</h2>
          <DateInputPicker
            label="Choose Appointment Date"
            value={appointmentDate}
            onChange={setAppointmentDate}
            minDate={today}
            maxDate={nextMonthStr}
            disabledDates={disabledWeekends}
            required
            showQuickActions={false}
            ariaLabel="Appointment date selection"
          />
          <p className="ihub-mt-2 ihub-text-sm ihub-text-muted">
            Available weekdays only for the next month
          </p>
          <p className="ihub-mt-1 ihub-text-sm">
            Appointment: {appointmentDate || "Not selected"}
          </p>
        </div>

        {/* Event Scheduling with DateTime */}
        <div className="ihub-card ihub-p-4">
          <h2 className="ihub-mb-3">Event Scheduling</h2>
          <DateInputPicker
            label="Event Date & Time"
            value={meetingDateTime}
            onChange={setMeetingDateTime}
            includeTime={true}
            minDate={tomorrowStr}
            maxDate={nextYearStr}
            showQuickActions={true}
            required
            ariaLabel="Event scheduling"
          />
          <p className="ihub-mt-2 ihub-text-sm">
            Event scheduled: {meetingDateTime || "Not scheduled"}
          </p>
        </div>

        {/* Deadline Selection */}
        <div className="ihub-card ihub-p-4">
          <h2 className="ihub-mb-3">Project Deadline</h2>
          <DateInputPicker
            label="Project Deadline"
            value={deadlineDate}
            onChange={setDeadlineDate}
            minDate={today}
            disabledDates={holidayDates}
            errorMessage={
              deadlineDate &&
              new Date(deadlineDate) < new Date(today)
                ? "Deadline cannot be in the past"
                : undefined
            }
            className="ihub-deadline-picker"
          />
          <p className="ihub-mt-2 ihub-text-sm ihub-text-muted">
            Holidays are disabled: Christmas, New Year, Independence Day
          </p>
          <p className="ihub-mt-1 ihub-text-sm">
            Deadline: {deadlineDate || "No deadline set"}
          </p>
        </div>

        {/* Date Range Selection */}
        <div className="ihub-card ihub-p-4">
          <h2 className="ihub-mb-3">Date Range Selection</h2>
          <div className="ihub-grid ihub-grid-cols-2 ihub-gap-3">
            <DateInputPicker
              label="Start Date"
              value={rangeStartDate}
              onChange={(date) => {
                setRangeStartDate(date);
                // Clear end date if it's before start date
                if (rangeEndDate && date && date > rangeEndDate) {
                  setRangeEndDate("");
                }
              }}
              minDate={today}
              maxDate={rangeEndDate || undefined}
            />
            <DateInputPicker
              label="End Date"
              value={rangeEndDate}
              onChange={setRangeEndDate}
              minDate={rangeStartDate || today}
              disabled={!rangeStartDate}
            />
          </div>
          <p className="ihub-mt-2 ihub-text-sm">
            Range: {rangeStartDate || "Start"} to {rangeEndDate || "End"}
          </p>
        </div>

        {/* Birth Date with Age Validation */}
        <div className="ihub-card ihub-p-4">
          <h2 className="ihub-mb-3">Birth Date (18+ Required)</h2>
          <DateInputPicker
            label="Date of Birth"
            value={birthDate}
            onChange={setBirthDate}
            maxDate={minAge18Str}
            showQuickActions={false}
            errorMessage={
              birthDate &&
              new Date(birthDate) > new Date(minAge18Str)
                ? "Must be 18 years or older"
                : undefined
            }
          />
          <p className="ihub-mt-2 ihub-text-sm ihub-text-muted">
            Must be at least 18 years old
          </p>
          <p className="ihub-mt-1 ihub-text-sm">
            Birth date: {birthDate || "Not entered"}
          </p>
        </div>

        {/* Form Integration Example */}
        <div className="ihub-card ihub-p-4">
          <h2 className="ihub-mb-3">Form Integration</h2>
          <form onSubmit={handleFormSubmit} className="ihub-space-y-3">
            <input
              type="text"
              name="eventTitle"
              value={formData.eventTitle}
              onChange={handleFormInputChange}
              placeholder="Event Title"
              className="ihub-input"
              required
            />

            <DateInputPicker
              label="Event Date"
              value={formData.eventDate}
              onChange={(date) =>
                setFormData((prev) => ({ ...prev, eventDate: date }))
              }
              name="event_date"
              minDate={today}
              required
            />

            <DateInputPicker
              label="Event Time"
              value={formData.eventTime}
              onChange={(time) =>
                setFormData((prev) => ({ ...prev, eventTime: time }))
              }
              includeTime={true}
              name="event_time"
              showCalendarPicker={false}
              required
            />

            <button type="submit" className="ihub-primary-btn">
              Create Event
            </button>
          </form>
        </div>

        {/* Accessibility & Keyboard Navigation Demo */}
        <div className="ihub-card ihub-p-4">
          <h2 className="ihub-mb-3">Accessibility Features</h2>
          <DateInputPicker
            label="Accessible Date Picker"
            value={eventDate}
            onChange={setEventDate}
            ariaLabel="Event date with full accessibility support"
            showQuickActions={true}
            id="accessible-date-picker"
          />
          <div className="ihub-mt-3 ihub-text-sm ihub-text-muted">
            <p>✓ Screen reader friendly</p>
            <p>✓ Keyboard navigation (Tab, Enter, Escape, Arrow keys)</p>
            <p>✓ ARIA labels and roles</p>
            <p>✓ Focus management</p>
          </div>
        </div>

        {/* Custom Styling Example */}
        <div className="ihub-card ihub-p-4">
          <h2 className="ihub-mb-3">Custom Styling</h2>
          <DateInputPicker
            label="Styled Date Picker"
            value={basicDate}
            onChange={setBasicDate}
            className="ihub-custom-date-picker"
            displayFormat="DD/MM/YYYY"
            locale="en-GB"
          />
          <p className="ihub-mt-2 ihub-text-sm ihub-text-muted">
            Custom styling with British date format
          </p>
        </div>

        {/* Disabled State Example */}
        <div className="ihub-card ihub-p-4">
          <h2 className="ihub-mb-3">Disabled State</h2>
          <DateInputPicker
            label="Disabled Date Picker"
            value="2024-12-25"
            onChange={() => {}}
            disabled={true}
            showQuickActions={false}
          />
          <p className="ihub-mt-2 ihub-text-sm ihub-text-muted">
            Useful for read-only forms or conditional logic
          </p>
        </div>

        {/* Validation Examples */}
        <div className="ihub-card ihub-p-4">
          <h2 className="ihub-mb-3">Validation States</h2>
          
          <div className="ihub-space-y-3">
            <DateInputPicker
              label="Required Field (Empty)"
              value=""
              onChange={() => {}}
              required={true}
              errorMessage="This field is required"
            />

            <DateInputPicker
              label="Invalid Date Range"
              value={today}
              onChange={() => {}}
              minDate={tomorrowStr}
              errorMessage="Date must be in the future"
            />

            <DateInputPicker
              label="Valid Selection"
              value={today}
              onChange={() => {}}
              minDate="2020-01-01"
              maxDate={nextYearStr}
            />
          </div>
        </div>
      </div>

      {/* Usage Summary */}
      <div className="ihub-card ihub-p-4 ihub-mt-5">
        <h2 className="ihub-mb-3">Key Features & Use Cases</h2>
        <div className="ihub-grid ihub-grid-cols-2 ihub-gap-4">
          <div>
            <h3 className="ihub-font-semibold ihub-mb-2">Features:</h3>
            <ul className="ihub-text-sm ihub-space-y-1">
              <li>✓ Calendar popup picker</li>
              <li>✓ Manual date input (YYYY-MM-DD)</li>
              <li>✓ Optional time selection</li>
              <li>✓ Date range validation</li>
              <li>✓ Disabled dates support</li>
              <li>✓ Keyboard navigation</li>
              <li>✓ Accessibility compliant</li>
              <li>✓ Custom error messages</li>
              <li>✓ Quick action buttons</li>
            </ul>
          </div>
          <div>
            <h3 className="ihub-font-semibold ihub-mb-2">Common Use Cases:</h3>
            <ul className="ihub-text-sm ihub-space-y-1">
              <li>• Appointment booking systems</li>
              <li>• Event scheduling</li>
              <li>• Project deadline setting</li>
              <li>• Birth date collection</li>
              <li>• Date range selection</li>
              <li>• Meeting planning</li>
              <li>• Booking forms</li>
              <li>• Registration forms</li>
              <li>• Calendar integrations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateInputPickerExamples;
```

## 🔗 Related Components

- [TimePicker](./TimePicker.md) - Time selection component
- [DateTimeInput](./DateTimeInput.md) - Combined date and time input
- [InputText](./InputText.md) - Text input component
- [TextField](./TextField.md) - Enhanced text field with validation

