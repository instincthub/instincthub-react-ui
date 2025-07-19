# DateTimeInput

**Category:** Forms | **Type:** component

Date and time selection input field with auto-focus navigation and quick date selection helpers

## 🏷️ Tags

`forms`, `input`, `datetime`, `picker`, `validation`

```tsx
"use client";
import React, { useState } from "react";
import { DateTimeInput, SubmitButton, InputText } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive DateTimeInput examples demonstrating various use cases
 */
const DateTimeInputExamples = () => {
  const [appointmentData, setAppointmentData] = useState({
    doctorName: "",
    patientName: "",
    appointmentType: "",
  });

  const [eventData, setEventData] = useState({
    eventTitle: "",
    eventLocation: "",
    description: "",
  });

  const [reminderData, setReminderData] = useState({
    title: "",
    priority: "medium",
  });

  const [status, setStatus] = useState<number>(1);

  // Handle form submissions
  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(2);
    setTimeout(() => {
      openToast("Appointment scheduled successfully!");
      setStatus(1);
    }, 2000);
  };

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(2);
    setTimeout(() => {
      openToast("Event created successfully!");
      setStatus(1);
    }, 2000);
  };

  const handleReminderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(2);
    setTimeout(() => {
      openToast("Reminder set successfully!");
      setStatus(1);
    }, 2000);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>DateTimeInput Examples</h1>

      {/* Basic Usage Example */}
      <section className="ihub-mb-5">
        <h2>Basic Date Time Input</h2>
        <p>Simple date and time selection with auto-focus navigation between fields.</p>
        
        <div className="ihub-card ihub-p-4">
          <DateTimeInput
            labels="Select Date and Time"
            names="basic_datetime"
            requireds={false}
          />
        </div>
      </section>

      {/* With Default Value Example */}
      <section className="ihub-mb-5">
        <h2>With Default Value</h2>
        <p>Pre-populated with a specific date and time value.</p>
        
        <div className="ihub-card ihub-p-4">
          <DateTimeInput
            labels="Meeting Date & Time"
            names="meeting_datetime"
            requireds={true}
            defaultValues="2024-03-15T14:30:00+01:00"
          />
        </div>
      </section>

      {/* Required Field Example */}
      <section className="ihub-mb-5">
        <h2>Required Field Validation</h2>
        <p>DateTime input marked as required for form validation.</p>
        
        <div className="ihub-card ihub-p-4">
          <form>
            <DateTimeInput
              labels="Deadline Date & Time *"
              names="deadline_datetime"
              requireds={true}
            />
            <div className="ihub-mt-3">
              <SubmitButton 
                label="Submit" 
                type="submit" 
                status={1}
              />
            </div>
          </form>
        </div>
      </section>

      {/* Appointment Scheduling Example */}
      <section className="ihub-mb-5">
        <h2>Appointment Scheduling Form</h2>
        <p>Complete appointment booking form with datetime selection.</p>
        
        <div className="ihub-card ihub-p-4">
          <form onSubmit={handleAppointmentSubmit}>
            <div className="ihub-row">
              <div className="ihub-col-md-6">
                <InputText
                  label="Doctor Name"
                  name="doctorName"
                  type="text"
                  value={appointmentData.doctorName}
                  onChange={(e) => setAppointmentData(prev => ({
                    ...prev,
                    doctorName: e.target.value
                  }))}
                  className="ihub-input"
                  required
                />
              </div>
              <div className="ihub-col-md-6">
                <InputText
                  label="Patient Name"
                  name="patientName"
                  type="text"
                  value={appointmentData.patientName}
                  onChange={(e) => setAppointmentData(prev => ({
                    ...prev,
                    patientName: e.target.value
                  }))}
                  className="ihub-input"
                  required
                />
              </div>
            </div>

            <InputText
              label="Appointment Type"
              name="appointmentType"
              type="text"
              value={appointmentData.appointmentType}
              onChange={(e) => setAppointmentData(prev => ({
                ...prev,
                appointmentType: e.target.value
              }))}
              className="ihub-input"
              placeholder="e.g., Consultation, Check-up, Follow-up"
              required
            />

            <DateTimeInput
              labels="Appointment Date & Time"
              names="appointment_datetime"
              requireds={true}
            />

            <div className="ihub-mt-4">
              <SubmitButton 
                label="Schedule Appointment" 
                type="submit" 
                status={status}
              />
            </div>
          </form>
        </div>
      </section>

      {/* Event Creation Example */}
      <section className="ihub-mb-5">
        <h2>Event Creation Form</h2>
        <p>Create events with specific start date and time.</p>
        
        <div className="ihub-card ihub-p-4">
          <form onSubmit={handleEventSubmit}>
            <InputText
              label="Event Title"
              name="eventTitle"
              type="text"
              value={eventData.eventTitle}
              onChange={(e) => setEventData(prev => ({
                ...prev,
                eventTitle: e.target.value
              }))}
              className="ihub-input"
              placeholder="Enter event title"
              required
            />

            <InputText
              label="Event Location"
              name="eventLocation"
              type="text"
              value={eventData.eventLocation}
              onChange={(e) => setEventData(prev => ({
                ...prev,
                eventLocation: e.target.value
              }))}
              className="ihub-input"
              placeholder="Enter event location"
              required
            />

            <div className="ihub-row">
              <div className="ihub-col-md-6">
                <DateTimeInput
                  labels="Event Start Date & Time"
                  names="event_start_datetime"
                  requireds={true}
                />
              </div>
              <div className="ihub-col-md-6">
                <DateTimeInput
                  labels="Event End Date & Time"
                  names="event_end_datetime"
                  requireds={true}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="description" className="ihub-label">Event Description</label>
              <textarea
                id="description"
                name="description"
                value={eventData.description}
                onChange={(e) => setEventData(prev => ({
                  ...prev,
                  description: e.target.value
                }))}
                className="ihub-textarea"
                placeholder="Enter event description"
                rows={4}
              />
            </div>

            <div className="ihub-mt-4">
              <SubmitButton 
                label="Create Event" 
                type="submit" 
                status={status}
              />
            </div>
          </form>
        </div>
      </section>

      {/* Reminder Setting Example */}
      <section className="ihub-mb-5">
        <h2>Set Reminder</h2>
        <p>Schedule reminders with date and time selection.</p>
        
        <div className="ihub-card ihub-p-4">
          <form onSubmit={handleReminderSubmit}>
            <InputText
              label="Reminder Title"
              name="title"
              type="text"
              value={reminderData.title}
              onChange={(e) => setReminderData(prev => ({
                ...prev,
                title: e.target.value
              }))}
              className="ihub-input"
              placeholder="What do you want to be reminded about?"
              required
            />

            <div className="field">
              <label htmlFor="priority" className="ihub-label">Priority Level</label>
              <select
                id="priority"
                name="priority"
                value={reminderData.priority}
                onChange={(e) => setReminderData(prev => ({
                  ...prev,
                  priority: e.target.value
                }))}
                className="ihub-select"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <DateTimeInput
              labels="Reminder Date & Time"
              names="reminder_datetime"
              requireds={true}
            />

            <div className="ihub-mt-4">
              <SubmitButton 
                label="Set Reminder" 
                type="submit" 
                status={status}
              />
            </div>
          </form>
        </div>
      </section>

      {/* Multiple DateTime Inputs Example */}
      <section className="ihub-mb-5">
        <h2>Multiple DateTime Inputs</h2>
        <p>Form with multiple datetime fields for different purposes.</p>
        
        <div className="ihub-card ihub-p-4">
          <form>
            <div className="ihub-row">
              <div className="ihub-col-md-4">
                <DateTimeInput
                  labels="Check-in Date & Time"
                  names="checkin_datetime"
                  requireds={true}
                />
              </div>
              <div className="ihub-col-md-4">
                <DateTimeInput
                  labels="Check-out Date & Time"
                  names="checkout_datetime"
                  requireds={true}
                />
              </div>
              <div className="ihub-col-md-4">
                <DateTimeInput
                  labels="Preferred Contact Time"
                  names="contact_datetime"
                  requireds={false}
                />
              </div>
            </div>

            <div className="ihub-mt-4">
              <SubmitButton 
                label="Submit Booking" 
                type="submit" 
                status={1}
              />
            </div>
          </form>
        </div>
      </section>

      {/* Features Overview */}
      <section className="ihub-mb-5">
        <h2>Features & Tips</h2>
        <div className="ihub-card ihub-p-4">
          <h3>Key Features:</h3>
          <ul>
            <li><strong>Auto-focus Navigation:</strong> Automatically moves to the next field when current field is complete</li>
            <li><strong>Numeric Input Only:</strong> Automatically filters out non-numeric characters</li>
            <li><strong>Quick Date Selection:</strong> "Today" and "Tomorrow" buttons for quick date setting</li>
            <li><strong>Clear Function:</strong> "Clear" button to reset all fields</li>
            <li><strong>Default Value Support:</strong> Can be pre-populated with ISO datetime strings</li>
            <li><strong>Validation Support:</strong> Built-in required field validation</li>
          </ul>

          <h3>Input Format:</h3>
          <ul>
            <li><strong>Day:</strong> DD (01-31)</li>
            <li><strong>Month:</strong> MM (01-12)</li>
            <li><strong>Year:</strong> YYYY (4 digits)</li>
            <li><strong>Hour:</strong> HH (00-23, 24-hour format)</li>
            <li><strong>Minute:</strong> MM (00-59)</li>
          </ul>

          <h3>Output Format:</h3>
          <p>The component outputs a hidden input with the format: <code>YYYY-MM-DD HH:MM:00.000000</code></p>

          <h3>Usage Tips:</h3>
          <ul>
            <li>Use <code>requireds={true}</code> for form validation</li>
            <li>Provide <code>defaultValues</code> in ISO format for pre-population</li>
            <li>The <code>names</code> prop should be unique for each instance</li>
            <li>Consider timezone handling in your backend when processing the datetime values</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default DateTimeInputExamples;
```

## 🔗 Related Components

- [DateInput](./DateInput.md) - Date-only selection input field
- [TimePicker](./TimePicker.md) - Time selection component
- [InputText](./InputText.md) - Text input component
- [SubmitButton](./SubmitButton.md) - Form submission button
- [TextField](./TextField.md) - Enhanced text field component

