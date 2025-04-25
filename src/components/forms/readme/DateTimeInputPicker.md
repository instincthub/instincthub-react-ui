# DateInputPicker Component Documentation

A modern, accessible date and datetime input component built for React applications. This component provides a flexible way to collect date and time information from users with support for calendar selection, keyboard navigation, and accessibility.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Basic Usage](#basic-usage)
- [Props](#props)
- [Examples](#examples)
  - [Simple Date Input](#simple-date-input)
  - [Date and Time Input](#date-and-time-input)
  - [Date with Range Constraints](#date-with-range-constraints)
  - [Customized Format](#customized-format)
- [Accessibility](#accessibility)
- [Styling](#styling)
- [DateTimeInput Component](#datetimeinput-component)
- [Best Practices](#best-practices)

## Installation

```bash
# If using npm
npm install @instincthub/react-ui

# If using yarn
yarn add @instincthub/react-ui
```

## Features

- **Modern UI**: Clean, minimalist design that follows InstinctHub design principles
- **Calendar Picker**: Integrated calendar for visual date selection
- **Keyboard Navigation**: Full keyboard support for enhanced accessibility
- **Validation**: Built-in validation for date values, ranges, and required fields
- **Time Support**: Optional time input fields
- **Responsive Design**: Works on both desktop and mobile devices
- **Accessibility**: ARIA attributes and keyboard support for screen readers
- **Customization**: Extensive props for customizing appearance and behavior

## Basic Usage

```jsx
import React, { useState } from 'react';
import { DateInputPicker } from '@instincthub/react-ui';

const MyForm = () => {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <form>
      <DateInputPicker
        label="Event Date"
        value={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
```

## Props

The DateInputPicker component accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | (required) | Label for the input field |
| `value` | string | `''` | Current date value in ISO format (YYYY-MM-DD or YYYY-MM-DDThh:mm:ss) |
| `onChange` | function | - | Callback function called when date changes, receives date string as parameter |
| `required` | boolean | `false` | Whether the input is required |
| `minDate` | string | - | Minimum selectable date in YYYY-MM-DD format |
| `maxDate` | string | - | Maximum selectable date in YYYY-MM-DD format |
| `disabledDates` | string[] | `[]` | Array of dates (YYYY-MM-DD format) that should be disabled |
| `errorMessage` | string | - | Custom error message to display |
| `className` | string | `''` | Additional CSS class for the component |
| `displayFormat` | string | `'YYYY-MM-DD'` | Format for displaying the date |
| `locale` | string | `'en-US'` | Locale for date formatting |
| `includeTime` | boolean | `false` | Whether to include time input fields |
| `name` | string | - | Name attribute for the input field |
| `id` | string | - | ID attribute for the input field |
| `placeholder` | string | `'YYYY-MM-DD'` | Placeholder text |
| `disabled` | boolean | `false` | Whether the input is disabled |
| `showCalendarPicker` | boolean | `true` | Whether to show the calendar picker |
| `showQuickActions` | boolean | `true` | Whether to show today/clear buttons |
| `ariaLabel` | string | - | ARIA label for accessibility |

## Examples

### Simple Date Input

```jsx
<DateInputPicker
  label="Birth Date"
  value={birthDate}
  onChange={(date) => setBirthDate(date)}
  required
/>
```

### Date and Time Input

```jsx
<DateInputPicker
  label="Meeting Time"
  value={meetingTime}
  onChange={(date) => setMeetingTime(date)}
  includeTime={true}
/>
```

### Date with Range Constraints

```jsx
<DateInputPicker
  label="Reservation Date"
  value={reservationDate}
  onChange={(date) => setReservationDate(date)}
  minDate="2025-05-01"
  maxDate="2025-12-31"
  disabledDates={['2025-05-15', '2025-05-16']} // Unavailable dates
  required
/>
```

### Customized Format

```jsx
<DateInputPicker
  label="Travel Date"
  value={travelDate}
  onChange={(date) => setTravelDate(date)}
  displayFormat="DD/MM/YYYY"
  locale="en-GB"
/>
```

## Accessibility

The DateInputPicker component follows accessibility best practices:

- All inputs have associated labels
- Calendar has proper ARIA roles and attributes
- Keyboard navigation support for all interactive elements
- Screen reader friendly announcements
- Visible focus indicators
- Color contrast that meets WCAG guidelines

### Keyboard Support

- `Tab`: Navigate between input fields
- `Enter` or `Space`: Open/close calendar when focused
- `Escape`: Close calendar
- `Arrow keys`: Navigate dates in the calendar
- `/`: Auto-advance between date segments

## Styling

The DateInputPicker component uses InstinctHub's standard CSS variables for consistent styling. You can customize the appearance by:

1. Using the `className` prop to add custom classes
2. Overriding CSS variables in your application
3. Extending the existing styles with more specific selectors

Key CSS variables used:

```css
:root {
  --DarkCyan: #00838f;
  --TurkishRose: #bc658d;
  --Gunmetal: #2c333a;
  --ViridianGreen: #009ba2;
  --White: #ffffff;
  --Danger: #ea5f5e;
  --Gray: #f4f4f4;
  --borderDefault: 1px solid rgba(44, 51, 58, 0.2);
  --Nunito: "Nunito", sans-serif;
}
```

## DateTimeInput Component

The `DateTimeInput` component extends `DateInputPicker` with focus on time selection:

```jsx
import { DateTimeInput } from '@instincthub/react-ui';

<DateTimeInput
  label="Meeting Start"
  value={meetingStart}
  onChange={(dateTime) => setMeetingStart(dateTime)}
  timeFormat="12h" // "12h" or "24h"
  includeSeconds={false}
  minuteStep={5} // 5-minute increments
/>
```

### Additional DateTimeInput Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `timeFormat` | `'12h'` \| `'24h'` | `'24h'` | Format for displaying time |
| `includeSeconds` | boolean | `false` | Whether to include seconds in time selection |
| `minuteStep` | number | `1` | Time step in minutes |

## Best Practices

1. **Use validation for critical date inputs**:
   ```jsx
   <DateInputPicker
     label="Payment Date"
     required
     minDate={today}
     errorMessage="Please select a future date"
   />
   ```

2. **Include helpful quick actions for better UX**:
   ```jsx
   <DateInputPicker
     label="Delivery Date"
     showQuickActions={true}
   />
   ```

3. **Provide clear constraints for date ranges**:
   ```jsx
   <DateInputPicker
     label="Conference Date"
     minDate={conferenceStart}
     maxDate={conferenceEnd}
   />
   ```

4. **Use proper formats for different regions**:
   ```jsx
   <DateInputPicker
     label="Appointment Date"
     locale="fr-FR"
     displayFormat="DD/MM/YYYY"
   />
   ```

5. **Handle validation in forms**:
   ```jsx
   const handleSubmit = (e) => {
     e.preventDefault();
     if (!selectedDate) {
       setError('Please select a date');
       return;
     }
     // Process form
   };
   ```