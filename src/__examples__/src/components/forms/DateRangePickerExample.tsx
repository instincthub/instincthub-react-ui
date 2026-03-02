"use client";

import React, { useState } from "react";
import { DateRangePicker } from "../../../../index";
import type { DateRange } from "../../../../types";

const DateRangePickerExample: React.FC = () => {
  const [basicRange, setBasicRange] = useState<DateRange>({ startDate: "", endDate: "" });
  const [restrictedRange, setRestrictedRange] = useState<DateRange>({ startDate: "", endDate: "" });
  const [prefilledRange, setPrefilledRange] = useState<DateRange>({
    startDate: "2024-06-01",
    endDate: "2024-06-30",
  });

  // Sample disabled dates (next 3 days)
  const disabledDates = [
    new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  ];

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>DateRangePicker Component</h1>
        <p>Select a date range with two-click selection, hover preview, and quick presets</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Range */}
        <div className="ihub-example-card">
          <h3>Basic Date Range</h3>
          <p>Click to select start date, then click again for end date</p>
          <DateRangePicker
            label="Select Date Range"
            value={basicRange}
            onChange={(range) => setBasicRange(range)}
          />
          <div className="ihub-example-output">
            <strong>Start:</strong> {basicRange.startDate || "Not selected"}<br />
            <strong>End:</strong> {basicRange.endDate || "Not selected"}
          </div>
        </div>

        {/* With Restrictions */}
        <div className="ihub-example-card">
          <h3>With Restrictions</h3>
          <p>Min/max date constraints and disabled dates</p>
          <DateRangePicker
            label="Restricted Range"
            value={restrictedRange}
            onChange={(range) => setRestrictedRange(range)}
            minDate={new Date().toISOString().split("T")[0]}
            maxDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
            disabledDates={disabledDates}
          />
          <div className="ihub-example-output">
            <strong>Start:</strong> {restrictedRange.startDate || "Not selected"}<br />
            <strong>End:</strong> {restrictedRange.endDate || "Not selected"}
          </div>
          <div className="ihub-example-note">
            <small>
              <strong>Restrictions:</strong>
              <ul>
                <li>Min date: Today</li>
                <li>Max date: 90 days from now</li>
                <li>Disabled: Next 3 days</li>
              </ul>
            </small>
          </div>
        </div>

        {/* Pre-filled Range */}
        <div className="ihub-example-card">
          <h3>Pre-filled Value</h3>
          <p>Date range with initial values set</p>
          <DateRangePicker
            label="Pre-filled Range"
            value={prefilledRange}
            onChange={(range) => setPrefilledRange(range)}
          />
          <div className="ihub-example-output">
            <strong>Start:</strong> {prefilledRange.startDate || "Not selected"}<br />
            <strong>End:</strong> {prefilledRange.endDate || "Not selected"}
          </div>
        </div>

        {/* Required */}
        <div className="ihub-example-card">
          <h3>Required Field</h3>
          <p>Required date range with validation</p>
          <DateRangePicker
            label="Required Range"
            required
            onChange={(range) => console.log("Range:", range)}
          />
        </div>

        {/* Without Quick Actions */}
        <div className="ihub-example-card">
          <h3>Without Quick Actions</h3>
          <p>Date range picker without preset buttons</p>
          <DateRangePicker
            label="No Presets"
            value={basicRange}
            onChange={(range) => setBasicRange(range)}
            showQuickActions={false}
          />
        </div>

        {/* Disabled State */}
        <div className="ihub-example-card">
          <h3>Disabled State</h3>
          <p>Disabled date range picker</p>
          <DateRangePicker
            label="Disabled Range"
            value={{ startDate: "2024-03-01", endDate: "2024-03-15" }}
            onChange={() => {}}
            disabled
          />
        </div>

        {/* Custom Placeholders */}
        <div className="ihub-example-card">
          <h3>Custom Placeholders</h3>
          <p>Custom placeholder text for start and end inputs</p>
          <DateRangePicker
            label="Filter by Date"
            onChange={(range) => console.log("Filter:", range)}
            placeholder={{ start: "Start date...", end: "End date..." }}
          />
        </div>

        {/* With Error */}
        <div className="ihub-example-card">
          <h3>With Error</h3>
          <p>Date range picker with error message</p>
          <DateRangePicker
            label="Error State"
            onChange={() => {}}
            errorMessage="Please select a valid date range"
          />
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>

        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { DateRangePicker } from '@instincthub/react-ui';
import type { DateRange } from '@instincthub/react-ui';

const [range, setRange] = useState<DateRange>({ startDate: "", endDate: "" });

<DateRangePicker
  label="Select Date Range"
  value={range}
  onChange={(range) => setRange(range)}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Restrictions and Quick Actions</h3>
          <pre><code>{`<DateRangePicker
  label="Filter Dates"
  value={range}
  onChange={(range) => setRange(range)}
  minDate="2024-01-01"
  maxDate="2024-12-31"
  disabledDates={['2024-06-15', '2024-06-16']}
  showQuickActions={true}
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
                <td>Label text for the date range picker</td>
              </tr>
              <tr>
                <td>startLabel</td>
                <td>string</td>
                <td>{`"From"`}</td>
                <td>Label for the start date input</td>
              </tr>
              <tr>
                <td>endLabel</td>
                <td>string</td>
                <td>{`"To"`}</td>
                <td>Label for the end date input</td>
              </tr>
              <tr>
                <td>value</td>
                <td>{`{ startDate: string; endDate: string }`}</td>
                <td>-</td>
                <td>Current date range value (YYYY-MM-DD)</td>
              </tr>
              <tr>
                <td>onChange</td>
                <td>{`(range: DateRange) => void`}</td>
                <td>-</td>
                <td>Callback when date range changes</td>
              </tr>
              <tr>
                <td>required</td>
                <td>boolean</td>
                <td>false</td>
                <td>Whether the field is required</td>
              </tr>
              <tr>
                <td>minDate</td>
                <td>string</td>
                <td>-</td>
                <td>Minimum allowed date (YYYY-MM-DD)</td>
              </tr>
              <tr>
                <td>maxDate</td>
                <td>string</td>
                <td>-</td>
                <td>Maximum allowed date (YYYY-MM-DD)</td>
              </tr>
              <tr>
                <td>disabledDates</td>
                <td>string[]</td>
                <td>[]</td>
                <td>Array of disabled dates (YYYY-MM-DD)</td>
              </tr>
              <tr>
                <td>dateFormat</td>
                <td>string</td>
                <td>{`"yyyy-MM-dd"`}</td>
                <td>Date display format</td>
              </tr>
              <tr>
                <td>placeholder</td>
                <td>{`{ start?: string; end?: string }`}</td>
                <td>-</td>
                <td>Placeholder text for start and end inputs</td>
              </tr>
              <tr>
                <td>showQuickActions</td>
                <td>boolean</td>
                <td>true</td>
                <td>Show preset buttons (Today, This Week, etc.)</td>
              </tr>
              <tr>
                <td>showCalendarIcon</td>
                <td>boolean</td>
                <td>true</td>
                <td>Show calendar icon in inputs</td>
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
                <td>name</td>
                <td>{`{ start?: string; end?: string }`}</td>
                <td>-</td>
                <td>Name attributes for hidden form inputs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DateRangePickerExample;
