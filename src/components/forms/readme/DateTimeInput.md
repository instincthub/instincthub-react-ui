# DateTimeInput Component

A customizable React date and time input component with TypeScript support. This component provides split fields for day, month, year, hour, and minute inputs with auto-focusing and validation.

## Table of Contents
- [Installation](#installation)
- [Interfaces](#interfaces)
- [Component](#component)
- [CSS Classes](#css-classes)
- [Usage Examples](#usage-examples)
- [Contributing](#contributing)

## Installation

Ensure you have React installed:

```bash
npm install react
npm install @types/react --save-dev
```

Make sure to include the `input-fields.css` file in your project and import it in the component.

## Interfaces

### DateTimeInputProps
- **Description**: Props for the DateTimeInput component.
- **Properties**:
  - `labels: string` - The label text displayed above the datetime inputs.
  - `names: string` - The name attribute for the hidden input that stores the full datetime value.
  - `requireds?: boolean` - Optional flag to mark inputs as required.
  - `defaultValues?: string` - Optional default datetime value in string format (parsable by Date constructor).

### DateState
- **Description**: Interface for the internal date state.
- **Properties**:
  - `day: string` - Day value (1-31).
  - `month: string` - Month value (1-12).
  - `year: string` - Year value (4 digits).
  - `hour: string` - Hour value (0-23).
  - `minute: string` - Minute value (0-59).

## Component

### DateTimeInput
- **Description**: A datetime input component that splits date and time into separate input fields with auto-focusing.
- **Parameters**:
  - `props: DateTimeInputProps` - Props object containing component configuration.
- **Returns**: `JSX.Element` - The rendered component.
- **Key Features**:
  - Automatic focusing between input fields when completed
  - Today/Tomorrow quick selection buttons
  - Clear button to reset all inputs
  - Formatted output in a hidden input field
  - Responsive design for mobile devices

## CSS Classes

The component uses the following CSS classes that should be included in your `input-fields.css` file:

### Core Classes
- `.ihub-datetime-container` - Container for the date and time input fields
- `.ihub-date-wrapper` - Container for day, month, and year inputs
- `.ihub-time-wrapper` - Container for hour and minute inputs
- `.ihub-date-input` - Base styling for each input field
- `.ihub-date-year` - Special styling for the year field
- `.ihub-datetime-separator` - Separator between date and time fields
- `.ihub-auto-date` - Container for the Today/Tomorrow/Clear controls
- `.ihub-set-today`, `.ihub-set-tomorrow`, `.ihub-clear-date` - Interactive controls
- `.ihub-separator` - Vertical separator between controls

### Styling Details
- Input fields have consistent width/height with spacing between them
- Responsive design adjusts layout on smaller screens
- Interactive controls have hover indicators
- The component aligns with other ihub component styles

## Usage Examples

### Basic Usage
```tsx
import React from "react";
import DateTimeInput from "./DateTimeInput";

const MyForm = () => {
  return (
    <form>
      <DateTimeInput 
        labels="Meeting Schedule" 
        names="meeting_datetime" 
        requireds={true}
      />
      <button type="submit">Schedule Meeting</button>
    </form>
  );
};
```

### With Default Value
```tsx
import React from "react";
import DateTimeInput from "./DateTimeInput";

const EditScheduleForm = () => {
  return (
    <form>
      <DateTimeInput 
        labels="Schedule Call Date" 
        names="scheduled_date" 
        requireds={true} 
        defaultValues="2023-02-27T23:40:00+01:00"
      />
      <button type="submit">Update Schedule</button>
    </form>
  );
};
```

### In a Form with Submit Handler
```tsx
import React, { FormEvent } from "react";
import DateTimeInput from "./DateTimeInput";

const AppointmentForm = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const scheduledDate = formData.get('scheduled_date');
    console.log('Appointment scheduled for:', scheduledDate);
    // Submit to API or process data
  };

  return (
    <form onSubmit={handleSubmit}>
      <DateTimeInput 
        labels="Appointment Date and Time" 
        names="scheduled_date" 
        requireds={true}
      />
      <button type="submit">Book Appointment</button>
    </form>
  );
};
```

## Contributing
Feel free to submit issues or pull requests to improve this component.

## License
[Add your license information here]