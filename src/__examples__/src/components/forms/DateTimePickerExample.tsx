"use client";

import React, { useState } from "react";
import { DateTimePicker } from "../../../../index";

const DateTimePickerExample: React.FC = () => {
  const [basicDateTime, setBasicDateTime] = useState<string>("");
  const [requiredDateTime, setRequiredDateTime] = useState<string>("");
  const [twelveHourDateTime, setTwelveHourDateTime] = useState<string>("");
  const [restrictedDateTime, setRestrictedDateTime] = useState<string>("");
  const [withSecondsDateTime, setWithSecondsDateTime] = useState<string>("");
  const [customStepDateTime, setCustomStepDateTime] = useState<string>("");

  // Sample disabled dates (next 3 days)
  const disabledDates = [
    new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  ];

  // Sample disabled times (lunch hours)
  const disabledTimes = ["12:00", "12:30", "13:00", "13:30"];

  const formatDateTime = (dateTime: string): string => {
    if (!dateTime) return "Not selected";
    try {
      const date = new Date(dateTime);
      return date.toLocaleString();
    } catch {
      return "Invalid date";
    }
  };

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>DateTimePicker Examples</h1>
        <p>Modern date and time selection component with calendar popup and time picker</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Usage */}
        <div className="ihub-example-card">
          <h3>Basic Usage</h3>
          <p>Simple date and time selection with default settings</p>
          <DateTimePicker
            label="Select Date and Time"
            value={basicDateTime}
            onChange={(value) => setBasicDateTime(value)}
            placeholder="YYYY-MM-DD HH:mm"
          />
          <div className="ihub-example-output">
            <strong>Selected:</strong> {formatDateTime(basicDateTime)}
          </div>
        </div>

        {/* Required Field */}
        <div className="ihub-example-card">
          <h3>Required Field</h3>
          <p>Required field with validation</p>
          <DateTimePicker
            label="Meeting Date and Time"
            value={requiredDateTime}
            onChange={(value) => setRequiredDateTime(value)}
            required
            placeholder="Required field"
          />
          <div className="ihub-example-output">
            <strong>Selected:</strong> {formatDateTime(requiredDateTime)}
          </div>
        </div>

        {/* 12-Hour Format */}
        <div className="ihub-example-card">
          <h3>12-Hour Format</h3>
          <p>Date and time picker with 12-hour format and AM/PM</p>
          <DateTimePicker
            label="Appointment Time"
            value={twelveHourDateTime}
            onChange={(value) => setTwelveHourDateTime(value)}
            use12Hour={true}
            timeFormat="hh:mm a"
          />
          <div className="ihub-example-output">
            <strong>Selected:</strong> {formatDateTime(twelveHourDateTime)}
          </div>
        </div>

        {/* With Seconds */}
        <div className="ihub-example-card">
          <h3>With Seconds</h3>
          <p>Date and time picker including seconds</p>
          <DateTimePicker
            label="Precise Time"
            value={withSecondsDateTime}
            onChange={(value) => setWithSecondsDateTime(value)}
            includeSeconds={true}
            timeFormat="HH:mm:ss"
          />
          <div className="ihub-example-output">
            <strong>Selected:</strong> {formatDateTime(withSecondsDateTime)}
          </div>
        </div>

        {/* Custom Time Step */}
        <div className="ihub-example-card">
          <h3>Custom Time Step</h3>
          <p>Date and time picker with 15-minute time intervals</p>
          <DateTimePicker
            label="Schedule Meeting"
            value={customStepDateTime}
            onChange={(value) => setCustomStepDateTime(value)}
            timeStep={15}
          />
          <div className="ihub-example-output">
            <strong>Selected:</strong> {formatDateTime(customStepDateTime)}
          </div>
        </div>

        {/* Date/Time Restrictions */}
        <div className="ihub-example-card">
          <h3>Date and Time Restrictions</h3>
          <p>With minimum date, maximum date, and time range restrictions</p>
          <DateTimePicker
            label="Restricted DateTime"
            value={restrictedDateTime}
            onChange={(value) => setRestrictedDateTime(value)}
            minDate={new Date().toISOString().split("T")[0]}
            maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
            minTime="09:00"
            maxTime="17:00"
            disabledDates={disabledDates}
            disabledTimes={disabledTimes}
          />
          <div className="ihub-example-output">
            <strong>Selected:</strong> {formatDateTime(restrictedDateTime)}
          </div>
          <div className="ihub-example-note">
            <small>
              <strong>Restrictions:</strong>
              <ul>
                <li>Min date: Today</li>
                <li>Max date: 30 days from now</li>
                <li>Time range: 9:00 AM - 5:00 PM</li>
                <li>Disabled dates: Next 3 days</li>
                <li>Disabled times: 12:00-13:30 (lunch)</li>
              </ul>
            </small>
          </div>
        </div>

        {/* Disabled State */}
        <div className="ihub-example-card">
          <h3>Disabled State</h3>
          <p>Disabled date and time picker</p>
          <DateTimePicker
            label="Disabled DateTime"
            value="2024-01-15T14:30:00"
            onChange={() => {}}
            disabled
          />
        </div>

        {/* Custom Format */}
        <div className="ihub-example-card">
          <h3>Custom Format</h3>
          <p>Custom date and time display format</p>
          <DateTimePicker
            label="Custom Format"
            value={basicDateTime}
            onChange={(value) => setBasicDateTime(value)}
            dateFormat="MMM dd, yyyy"
            timeFormat="h:mm a"
            use12Hour={true}
          />
          <div className="ihub-example-output">
            <strong>Selected:</strong> {formatDateTime(basicDateTime)}
          </div>
        </div>

        {/* Without Quick Actions */}
        <div className="ihub-example-card">
          <h3>Without Quick Actions</h3>
          <p>Date and time picker without quick action buttons</p>
          <DateTimePicker
            label="No Quick Actions"
            value={basicDateTime}
            onChange={(value) => setBasicDateTime(value)}
            showQuickActions={false}
          />
        </div>

        {/* Without Icons */}
        <div className="ihub-example-card">
          <h3>Without Icons</h3>
          <p>Date and time picker without calendar and time icons</p>
          <DateTimePicker
            label="No Icons"
            value={basicDateTime}
            onChange={(value) => setBasicDateTime(value)}
            showCalendarIcon={false}
            showTimeIcon={false}
          />
        </div>

        {/* With Error */}
        <div className="ihub-example-card">
          <h3>With Error</h3>
          <p>Date and time picker with error message</p>
          <DateTimePicker
            label="Error State"
            value=""
            onChange={() => {}}
            required
            errorMessage="This field is required"
          />
        </div>

        {/* Pre-filled Value */}
        <div className="ihub-example-card">
          <h3>Pre-filled Value</h3>
          <p>Date and time picker with pre-filled value</p>
          <DateTimePicker
            label="Pre-filled DateTime"
            value="2024-12-25T15:30:00"
            onChange={(value) => console.log("Changed to:", value)}
          />
          <div className="ihub-example-output">
            <strong>Pre-filled:</strong> {formatDateTime("2024-12-25T15:30:00")}
          </div>
        </div>

        {/* Separate Fields */}
        <div className="ihub-example-card">
          <h3>Separate Input Fields</h3>
          <p>Multiple input fields for easier mobile input</p>
          <DateTimePicker
            label="Separate Fields"
            value={basicDateTime}
            onChange={(value) => setBasicDateTime(value)}
            useSeparateFields={true}
          />
          <div className="ihub-example-output">
            <strong>Selected:</strong> {formatDateTime(basicDateTime)}
          </div>
        </div>

        {/* Separate Fields with 12-hour */}
        <div className="ihub-example-card">
          <h3>Separate Fields (12-hour)</h3>
          <p>Multiple input fields with 12-hour format</p>
          <DateTimePicker
            label="Separate Fields 12h"
            value={twelveHourDateTime}
            onChange={(value) => setTwelveHourDateTime(value)}
            useSeparateFields={true}
            use12Hour={true}
          />
          <div className="ihub-example-output">
            <strong>Selected:</strong> {formatDateTime(twelveHourDateTime)}
          </div>
        </div>

        {/* Date Only Mode */}
        <div className="ihub-example-card">
          <h3>Date Only Mode</h3>
          <p>Pick only the date (no time selection)</p>
          <DateTimePicker
            label="Select Date"
            value={basicDateTime}
            onChange={(value) => setBasicDateTime(value)}
            mode="date"
          />
          <div className="ihub-example-output">
            <strong>Selected:</strong> {formatDateTime(basicDateTime)}
          </div>
        </div>

        {/* Time Only Mode */}
        <div className="ihub-example-card">
          <h3>Time Only Mode</h3>
          <p>Pick only the time (no date selection)</p>
          <DateTimePicker
            label="Select Time"
            value={basicDateTime}
            onChange={(value) => setBasicDateTime(value)}
            mode="time"
          />
          <div className="ihub-example-output">
            <strong>Selected:</strong> {formatDateTime(basicDateTime)}
          </div>
        </div>

        {/* Date Only with Separate Fields */}
        <div className="ihub-example-card">
          <h3>Date Only (Separate Fields)</h3>
          <p>Date picker with separate input fields</p>
          <DateTimePicker
            label="Date Fields"
            value={basicDateTime}
            onChange={(value) => setBasicDateTime(value)}
            mode="date"
            useSeparateFields={true}
          />
          <div className="ihub-example-output">
            <strong>Selected:</strong> {formatDateTime(basicDateTime)}
          </div>
        </div>

        {/* Time Only with Separate Fields */}
        <div className="ihub-example-card">
          <h3>Time Only (Separate Fields)</h3>
          <p>Time picker with separate input fields</p>
          <DateTimePicker
            label="Time Fields"
            value={basicDateTime}
            onChange={(value) => setBasicDateTime(value)}
            mode="time"
            useSeparateFields={true}
            use12Hour={true}
          />
          <div className="ihub-example-output">
            <strong>Selected:</strong> {formatDateTime(basicDateTime)}
          </div>
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { DateTimePicker } from '@instincthub/react-ui';

const [dateTime, setDateTime] = useState('');

<DateTimePicker
  label="Select Date and Time"
  value={dateTime}
  onChange={(value) => setDateTime(value)}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>12-Hour Format with Restrictions</h3>
          <pre><code>{`<DateTimePicker
  label="Meeting Time"
  value={dateTime}
  onChange={(value) => setDateTime(value)}
  use12Hour={true}
  required
  minDate="2024-01-01"
  maxDate="2024-12-31"
  minTime="09:00"
  maxTime="17:00"
  timeStep={15}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Disabled Dates and Times</h3>
          <pre><code>{`<DateTimePicker
  label="Available Slots"
  value={dateTime}
  onChange={(value) => setDateTime(value)}
  disabledDates={['2024-01-15', '2024-01-16']}
  disabledTimes={['12:00', '12:30', '13:00']}
  includeSeconds={true}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Date Only Mode</h3>
          <pre><code>{`<DateTimePicker
  label="Select Date"
  value={dateTime}
  onChange={(value) => setDateTime(value)}
  mode="date"
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Time Only Mode</h3>
          <pre><code>{`<DateTimePicker
  label="Select Time"
  value={dateTime}
  onChange={(value) => setDateTime(value)}
  mode="time"
  use12Hour={true}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Separate Fields</h3>
          <pre><code>{`<DateTimePicker
  label="Date and Time"
  value={dateTime}
  onChange={(value) => setDateTime(value)}
  useSeparateFields={true}
  mode="datetime"
/>`}</code></pre>
        </div>
      </div>

      <div className="ihub-api-reference">
        <h2>API Reference</h2>
        <div className="ihub-api-table">
          <table>
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>label</td>
                <td>string</td>
                <td>-</td>
                <td>Label text for the input field</td>
              </tr>
              <tr>
                <td>value</td>
                <td>string</td>
                <td>""</td>
                <td>Current datetime value in ISO format</td>
              </tr>
              <tr>
                <td>onChange</td>
                <td>function</td>
                <td>-</td>
                <td>Callback when datetime changes</td>
              </tr>
              <tr>
                <td>required</td>
                <td>boolean</td>
                <td>false</td>
                <td>Whether the field is required</td>
              </tr>
              <tr>
                <td>use12Hour</td>
                <td>boolean</td>
                <td>false</td>
                <td>Use 12-hour format with AM/PM</td>
              </tr>
              <tr>
                <td>includeSeconds</td>
                <td>boolean</td>
                <td>false</td>
                <td>Include seconds in time selection</td>
              </tr>
              <tr>
                <td>timeStep</td>
                <td>number</td>
                <td>30</td>
                <td>Time step in minutes</td>
              </tr>
              <tr>
                <td>minDate</td>
                <td>string</td>
                <td>-</td>
                <td>Minimum allowed date</td>
              </tr>
              <tr>
                <td>maxDate</td>
                <td>string</td>
                <td>-</td>
                <td>Maximum allowed date</td>
              </tr>
              <tr>
                <td>minTime</td>
                <td>string</td>
                <td>-</td>
                <td>Minimum allowed time</td>
              </tr>
              <tr>
                <td>maxTime</td>
                <td>string</td>
                <td>-</td>
                <td>Maximum allowed time</td>
              </tr>
              <tr>
                <td>disabledDates</td>
                <td>string[]</td>
                <td>[]</td>
                <td>Array of disabled dates</td>
              </tr>
              <tr>
                <td>disabledTimes</td>
                <td>string[]</td>
                <td>[]</td>
                <td>Array of disabled times</td>
              </tr>
              <tr>
                <td>showQuickActions</td>
                <td>boolean</td>
                <td>true</td>
                <td>Show quick action buttons</td>
              </tr>
              <tr>
                <td>showCalendarIcon</td>
                <td>boolean</td>
                <td>true</td>
                <td>Show calendar icon</td>
              </tr>
              <tr>
                <td>showTimeIcon</td>
                <td>boolean</td>
                <td>true</td>
                <td>Show time icon</td>
              </tr>
              <tr>
                <td>disabled</td>
                <td>boolean</td>
                <td>false</td>
                <td>Disable the input</td>
              </tr>
              <tr>
                <td>errorMessage</td>
                <td>string</td>
                <td>-</td>
                <td>Error message to display</td>
              </tr>
              <tr>
                <td>mode</td>
                <td>"datetime" | "date" | "time"</td>
                <td>"datetime"</td>
                <td>Input mode - datetime, date only, or time only</td>
              </tr>
              <tr>
                <td>useSeparateFields</td>
                <td>boolean</td>
                <td>false</td>
                <td>Use separate input fields instead of single input</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DateTimePickerExample;