"use client";

import React, { useState } from "react";
import { TimePicker } from "../../../../index";

const TimePickerExample: React.FC = () => {
  const [simpleTime, setSimpleTime] = useState<string>("");
  const [time12Hour, setTime12Hour] = useState<string>("");
  const [timeWithSeconds, setTimeWithSeconds] = useState<string>("");
  const [timeWithRange, setTimeWithRange] = useState<string>("");
  const [timeWithStep, setTimeWithStep] = useState<string>("");

  // Disabled times for the example (lunch break and break times)
  const disabledTimes = [
    "12:00", "12:15", "12:30", "12:45", "13:00", // Lunch break
    "15:00", "15:15", // Afternoon break
  ];

  return (
    <div className="ihub-container">
      <h2>Time Picker Examples</h2>

      <div className="ihub-example-section">
        <h3>Simple Time Input (24-hour format)</h3>
        <TimePicker
          label="Select a time"
          value={simpleTime}
          onChange={(time) => setSimpleTime(time)}
          name="simple_time"
          required
          placeholder="HH:MM"
        />
        <p className="ihub-example-output">
          Selected Time: <strong>{simpleTime || "None"}</strong>
        </p>
      </div>

      <div className="ihub-example-section">
        <h3>12-Hour Format with AM/PM</h3>
        <TimePicker
          label="Appointment time"
          value={time12Hour}
          onChange={(time) => setTime12Hour(time)}
          name="time_12hour"
          use12Hour={true}
          showQuickActions={true}
        />
        <p className="ihub-example-output">
          Selected Time: <strong>{time12Hour || "None"}</strong>
        </p>
      </div>

      <div className="ihub-example-section">
        <h3>Time with Seconds</h3>
        <TimePicker
          label="Precise time"
          value={timeWithSeconds}
          onChange={(time) => setTimeWithSeconds(time)}
          name="time_with_seconds"
          includeSeconds={true}
          placeholder="HH:MM:SS"
        />
        <p className="ihub-example-output">
          Selected Time: <strong>{timeWithSeconds || "None"}</strong>
        </p>
      </div>

      <div className="ihub-example-section">
        <h3>Time with Range Restrictions</h3>
        <TimePicker
          label="Business hours"
          value={timeWithRange}
          onChange={(time) => setTimeWithRange(time)}
          name="time_with_range"
          minTime="09:00"
          maxTime="17:00"
          disabledTimes={disabledTimes}
          required
        />
        <p className="ihub-example-output">
          Selected Time: <strong>{timeWithRange || "None"}</strong>
        </p>
        <p className="ihub-example-note">
          <small>Restricted to 9 AM - 5 PM, with lunch break (12:00-13:00) and afternoon break (15:00-15:15) disabled</small>
        </p>
      </div>

      <div className="ihub-example-section">
        <h3>Time with Custom Step (15-minute intervals)</h3>
        <TimePicker
          label="Meeting time"
          value={timeWithStep}
          onChange={(time) => setTimeWithStep(time)}
          name="time_with_step"
          step={15}
          use12Hour={true}
          minTime="08:00"
          maxTime="18:00"
        />
        <p className="ihub-example-output">
          Selected Time: <strong>{timeWithStep || "None"}</strong>
        </p>
        <p className="ihub-example-note">
          <small>15-minute intervals, 12-hour format, 8 AM - 6 PM</small>
        </p>
      </div>

      <div className="ihub-example-section">
        <h3>Disabled Time Picker</h3>
        <TimePicker
          label="Disabled time picker"
          value="14:30"
          onChange={() => {}}
          name="disabled_time"
          disabled={true}
        />
      </div>

      <div className="ihub-example-section">
        <h3>Time Picker without Dropdown</h3>
        <TimePicker
          label="Manual time entry"
          value=""
          onChange={() => {}}
          name="manual_time"
          showTimePicker={false}
          showQuickActions={false}
          placeholder="Enter time manually"
        />
      </div>

      <div className="ihub-code-example">
        <h3>Usage Examples</h3>
        <pre>
{`// Basic usage
<TimePicker
  label="Select time"
  value={time}
  onChange={setTime}
  required
/>

// 12-hour format with seconds
<TimePicker
  label="Appointment time"
  value={time}
  onChange={setTime}
  use12Hour={true}
  includeSeconds={true}
/>

// Business hours with restrictions
<TimePicker
  label="Business hours"
  value={time}
  onChange={setTime}
  minTime="09:00"
  maxTime="17:00"
  step={15}
  disabledTimes={["12:00", "12:15", "12:30"]}
/>`}
        </pre>
      </div>
    </div>
  );
};

export default TimePickerExample;