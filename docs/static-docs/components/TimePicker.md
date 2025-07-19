# TimePicker

**Category:** Form | **Type:** component

A comprehensive time input component with built-in time picker dropdown, time validation, and optional seconds support.

## 🏷️ Tags

`form`, `input`, `time`, `picker`, `validation`, `accessibility`

## 📁 File Location

`src/components/forms/TimePicker.tsx`

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { TimePicker } from '@instincthub/react-ui';
```

## 🔧 Props Interface

```tsx
interface TimePickerPropsType {
  /** Input label */
  label: string;
  /** Current time value in HH:MM format or HH:MM:SS format */
  value?: string;
  /** Handler called when time changes */
  onChange?: (time: string) => void;
  /** Whether the time input is required */
  required?: boolean;
  /** Whether to use 12-hour format (default: false for 24-hour) */
  use12Hour?: boolean;
  /** Whether to include seconds in time selection */
  includeSeconds?: boolean;
  /** Time step in minutes (default: 1) */
  step?: number;
  /** Minimum allowed time in HH:MM format */
  minTime?: string;
  /** Maximum allowed time in HH:MM format */
  maxTime?: string;
  /** Array of disabled times in HH:MM format */
  disabledTimes?: string[];
  /** Error message to display */
  errorMessage?: string;
  /** Additional class name */
  className?: string;
  /** Name attribute for the input field */
  name?: string;
  /** ID attribute for the input field */
  id?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether to show the time picker dropdown */
  showTimePicker?: boolean;
  /** Whether to show quick time selection buttons */
  showQuickActions?: boolean;
  /** ARIA label for accessibility */
  ariaLabel?: string;
}
```

## 📋 Comprehensive Examples

```tsx
"use client";
import React, { useState } from "react";
import { TimePicker, SubmitButton } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Example component demonstrating various ways to use the TimePicker
 */
const TimePickerExamples = () => {
  // State for different time picker examples
  const [basicTime, setBasicTime] = useState<string>("");
  const [meetingTime, setMeetingTime] = useState<string>("14:30");
  const [appointmentTime, setAppointmentTime] = useState<string>("09:00");
  const [preciseTime, setPreciseTime] = useState<string>("15:45:30");
  const [businessTime, setBusinessTime] = useState<string>("");
  const [shiftTime, setShiftTime] = useState<string>("");
  const [schedulingTime, setSchedulingTime] = useState<string>("");
  const [restrictedTime, setRestrictedTime] = useState<string>("");

  // Form state for comprehensive example
  const [formData, setFormData] = useState({
    eventName: "",
    startTime: "",
    endTime: "",
    reminderTime: ""
  });

  // Handle form submission
  const handleScheduleSubmit = () => {
    if (!formData.eventName || !formData.startTime || !formData.endTime) {
      openToast("Please fill all required fields");
      return;
    }
    
    console.log("Schedule created:", formData);
    openToast("Schedule created successfully!");
  };

  const handleValidationTest = () => {
    const timeValidations = [
      { time: basicTime, label: "Basic Time" },
      { time: businessTime, label: "Business Hours" },
      { time: restrictedTime, label: "Restricted Time" }
    ];
    
    timeValidations.forEach(({ time, label }) => {
      if (time) {
        openToast(`${label}: ${time} is valid`);
      }
    });
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>TimePicker Examples</h1>

      {/* Basic Examples Section */}
      <section className="ihub-mb-5">
        <h2>Basic Time Selection</h2>
        <div className="ihub-d-grid ihub-gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          
          {/* Basic 24-Hour Format */}
          <div className="ihub-card ihub-p-4">
            <h3>24-Hour Format (Default)</h3>
            <TimePicker
              label="Select Time"
              value={basicTime}
              onChange={setBasicTime}
              placeholder="HH:MM"
              required
            />
            <p className="ihub-fs-sm ihub-text-muted ihub-mt-2">
              Selected: {basicTime || "No time selected"}
            </p>
          </div>

          {/* 12-Hour Format with AM/PM */}
          <div className="ihub-card ihub-p-4">
            <h3>12-Hour Format with AM/PM</h3>
            <TimePicker
              label="Appointment Time"
              value={appointmentTime}
              onChange={setAppointmentTime}
              use12Hour={true}
              required
            />
            <p className="ihub-fs-sm ihub-text-muted ihub-mt-2">
              Selected: {appointmentTime || "No time selected"}
            </p>
          </div>

          {/* Time with Seconds */}
          <div className="ihub-card ihub-p-4">
            <h3>Precise Time with Seconds</h3>
            <TimePicker
              label="Precise Timing"
              value={preciseTime}
              onChange={setPreciseTime}
              includeSeconds={true}
              placeholder="HH:MM:SS"
            />
            <p className="ihub-fs-sm ihub-text-muted ihub-mt-2">
              Selected: {preciseTime || "No time selected"}
            </p>
          </div>
        </div>
      </section>

      {/* Business & Scheduling Examples */}
      <section className="ihub-mb-5">
        <h2>Business & Scheduling Use Cases</h2>
        <div className="ihub-d-grid ihub-gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>

          {/* Business Hours */}
          <div className="ihub-card ihub-p-4">
            <h3>Business Hours Only</h3>
            <TimePicker
              label="Business Meeting"
              value={businessTime}
              onChange={setBusinessTime}
              minTime="09:00"
              maxTime="17:00"
              step={15}
              use12Hour={true}
            />
            <small className="ihub-text-muted">
              Available: 9:00 AM - 5:00 PM (15-min intervals)
            </small>
          </div>

          {/* Shift Scheduling */}
          <div className="ihub-card ihub-p-4">
            <h3>Shift Scheduling</h3>
            <TimePicker
              label="Shift Start Time"
              value={shiftTime}
              onChange={setShiftTime}
              step={30}
              disabledTimes={["12:00", "12:30", "13:00"]}
              showQuickActions={false}
            />
            <small className="ihub-text-muted">
              Lunch break (12:00-1:00 PM) unavailable
            </small>
          </div>

          {/* Medical Appointments */}
          <div className="ihub-card ihub-p-4">
            <h3>Medical Appointments</h3>
            <TimePicker
              label="Appointment Slot"
              value={schedulingTime}
              onChange={setSchedulingTime}
              minTime="08:00"
              maxTime="16:00"
              step={20}
              disabledTimes={["12:00", "12:20", "12:40", "13:00"]}
              use12Hour={true}
              ariaLabel="Medical appointment time selection"
            />
            <small className="ihub-text-muted">
              20-min slots, closed during lunch
            </small>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="ihub-mb-5">
        <h2>Advanced Features & Validation</h2>
        <div className="ihub-d-grid ihub-gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>

          {/* Time Restrictions */}
          <div className="ihub-card ihub-p-4">
            <h3>Time Restrictions</h3>
            <TimePicker
              label="Restricted Hours"
              value={restrictedTime}
              onChange={setRestrictedTime}
              minTime="10:00"
              maxTime="14:00"
              disabledTimes={["11:30", "12:00", "12:30"]}
              errorMessage={restrictedTime && !restrictedTime.match(/^(1[0-4]|10):[0-5][0-9]$/) ? "Time must be between 10:00-14:00" : ""}
            />
            <small className="ihub-text-muted">
              Only 10:00 AM - 2:00 PM allowed
            </small>
          </div>

          {/* Disabled State */}
          <div className="ihub-card ihub-p-4">
            <h3>Disabled State</h3>
            <TimePicker
              label="Unavailable Time"
              value="15:30"
              onChange={() => {}}
              disabled={true}
              placeholder="Not available"
            />
            <small className="ihub-text-muted">
              Time selection disabled
            </small>
          </div>

          {/* No Quick Actions */}
          <div className="ihub-card ihub-p-4">
            <h3>Custom Configuration</h3>
            <TimePicker
              label="Custom Time Picker"
              value={meetingTime}
              onChange={setMeetingTime}
              showTimePicker={true}
              showQuickActions={false}
              step={5}
              className="custom-time-picker"
            />
            <small className="ihub-text-muted">
              No quick actions, 5-min intervals
            </small>
          </div>
        </div>
      </section>

      {/* Practical Form Example */}
      <section className="ihub-mb-5">
        <h2>Complete Event Scheduling Form</h2>
        <div className="ihub-card ihub-p-4" style={{ maxWidth: "600px" }}>
          <h3>Create Event Schedule</h3>
          
          <div className="ihub-mb-3">
            <label className="ihub-text-label">Event Name *</label>
            <input
              type="text"
              className="ihub-input"
              value={formData.eventName}
              onChange={(e) => setFormData(prev => ({ ...prev, eventName: e.target.value }))}
              placeholder="Enter event name"
              required
            />
          </div>

          <div className="ihub-d-grid ihub-gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <TimePicker
              label="Start Time"
              value={formData.startTime}
              onChange={(time) => setFormData(prev => ({ ...prev, startTime: time }))}
              use12Hour={true}
              step={15}
              required
              name="start_time"
            />

            <TimePicker
              label="End Time"
              value={formData.endTime}
              onChange={(time) => setFormData(prev => ({ ...prev, endTime: time }))}
              use12Hour={true}
              step={15}
              minTime={formData.startTime}
              required
              name="end_time"
            />
          </div>

          <div className="ihub-mt-3">
            <TimePicker
              label="Reminder Time (Optional)"
              value={formData.reminderTime}
              onChange={(time) => setFormData(prev => ({ ...prev, reminderTime: time }))}
              use12Hour={true}
              step={30}
              placeholder="Set reminder"
              name="reminder_time"
            />
          </div>

          <div className="ihub-d-flex ihub-gap-3 ihub-mt-4">
            <SubmitButton
              label="Create Schedule"
              onClick={handleScheduleSubmit}
              disabled={!formData.eventName || !formData.startTime || !formData.endTime}
            />
            <button
              type="button"
              className="ihub-outlined-btn"
              onClick={handleValidationTest}
            >
              Validate Times
            </button>
          </div>

          <div className="ihub-mt-3">
            <small className="ihub-text-muted">
              Form Data: {JSON.stringify(formData, null, 2)}
            </small>
          </div>
        </div>
      </section>

      {/* Accessibility Examples */}
      <section className="ihub-mb-5">
        <h2>Accessibility Features</h2>
        <div className="ihub-card ihub-p-4" style={{ maxWidth: "500px" }}>
          <h3>Screen Reader Optimized</h3>
          <TimePicker
            label="Accessible Time Selection"
            value={basicTime}
            onChange={setBasicTime}
            ariaLabel="Select time for accessible scheduling"
            required
            id="accessible-time-picker"
            use12Hour={true}
          />
          <div className="ihub-mt-3">
            <h4>Keyboard Navigation:</h4>
            <ul className="ihub-fs-sm">
              <li><kbd>Enter</kbd> or <kbd>Space</kbd> - Open/close time picker</li>
              <li><kbd>Escape</kbd> - Close time picker</li>
              <li><kbd>Tab</kbd> - Navigate between hour, minute, second fields</li>
              <li><kbd>↑</kbd>/<kbd>↓</kbd> - Increment/decrement time values</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Integration Examples */}
      <section className="ihub-mb-5">
        <h2>Real-World Integration Examples</h2>
        <div className="ihub-d-grid ihub-gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>

          {/* Doctor's Office */}
          <div className="ihub-card ihub-p-4">
            <h3>Doctor's Office</h3>
            <TimePicker
              label="Appointment Time"
              value=""
              onChange={() => {}}
              minTime="08:00"
              maxTime="17:00"
              step={15}
              disabledTimes={["12:00", "12:15", "12:30", "12:45"]}
              use12Hour={true}
              placeholder="Select appointment"
            />
            <small className="ihub-text-muted">
              15-min slots, closed for lunch 12:00-1:00 PM
            </small>
          </div>

          {/* Restaurant Reservations */}
          <div className="ihub-card ihub-p-4">
            <h3>Restaurant Reservations</h3>
            <TimePicker
              label="Reservation Time"
              value=""
              onChange={() => {}}
              minTime="17:00"
              maxTime="22:00"
              step={30}
              use12Hour={true}
              placeholder="Dinner reservation"
            />
            <small className="ihub-text-muted">
              Dinner service: 5:00 PM - 10:00 PM
            </small>
          </div>

          {/* Gym Class Schedule */}
          <div className="ihub-card ihub-p-4">
            <h3>Gym Class Schedule</h3>
            <TimePicker
              label="Class Time"
              value=""
              onChange={() => {}}
              step={60}
              disabledTimes={["13:00", "14:00", "15:00"]}
              use12Hour={true}
              placeholder="Select class time"
            />
            <small className="ihub-text-muted">
              Hourly classes, equipment maintenance 1-3 PM
            </small>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TimePickerExamples;
```

## 🎨 Key Features

- **Multiple Time Formats**: Support for both 12-hour (AM/PM) and 24-hour formats
- **Precision Control**: Optional seconds input for precise time selection
- **Time Validation**: Built-in validation with customizable error messages
- **Range Restrictions**: Set minimum and maximum allowed times
- **Disabled Time Slots**: Block specific times (lunch breaks, maintenance windows)
- **Custom Step Intervals**: Configure time increments (1, 5, 15, 30, 60 minutes)
- **Interactive Dropdown**: Full-featured time picker with clickable options
- **Quick Actions**: "Now" and "Clear" buttons for user convenience
- **Keyboard Navigation**: Complete keyboard accessibility support
- **Form Integration**: Works seamlessly with form libraries and validation
- **Responsive Design**: Optimized for both desktop and mobile devices

## ♿ Accessibility Features

The TimePicker component is built with comprehensive accessibility support:

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard control with logical tab order
- **Focus Management**: Clear focus indicators and proper focus handling
- **Error Announcements**: Screen reader announcements for validation errors
- **High Contrast Support**: Compatible with high contrast themes
- **Role Attributes**: Proper ARIA roles for interactive elements

## 🎯 Common Use Cases

### Business Applications
- **Meeting Scheduling**: Conference room bookings with availability constraints
- **Appointment Systems**: Medical, legal, or service appointments
- **Shift Management**: Employee scheduling with break time restrictions
- **Business Hours**: Store hours, service windows configuration

### Consumer Applications
- **Event Planning**: Party, wedding, or celebration scheduling
- **Reservation Systems**: Restaurant, hotel, or venue bookings
- **Fitness Apps**: Workout sessions, class schedules
- **Transportation**: Flight times, bus schedules, ride bookings

### Technical Applications
- **Monitoring Systems**: Alert schedules, maintenance windows
- **Automation**: Scheduled tasks, batch job timing
- **Analytics**: Report generation times, data collection windows
- **IoT Devices**: Smart home scheduling, device automation

## 🔗 Related Components

- [DateInputPicker](./DateInputPicker.md) - Date and time selection with calendar
- [DateTimeInput](./DateTimeInput.md) - Combined date and time input
- [InputNumber](./InputNumber.md) - Numerical input with validation
- [TextField](./TextField.md) - Text input with validation
- [ToggleButton](./ToggleButton.md) - Toggle state control