# DateInput Component

A customizable React date input component with TypeScript support. This component provides a split date field with day, month, and year inputs, along with validation for age restrictions.

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

### DateInputProps
- **Description**: Props for the DateInput component.
- **Properties**:
  - `labels: string` - The label text displayed above the date inputs.
  - `names: string` - The name attribute for the hidden input that stores the full date value.
  - `name?: string` - Optional class name for the wrapper div.
  - `maxAge?: number` - Optional maximum age restriction (in years).
  - `minAge?: number` - Optional minimum age restriction (in years).
  - `defaultValues?: string` - Optional default date value in string format (parsable by Date constructor).
  - `requireds?: boolean` - Optional flag to mark inputs as required.
  - `controls?: boolean` - Optional flag to show Today/Tomorrow/Clear controls.
  - `inputEvent?: (name: string, value: string) => void` - Optional callback function when input changes.

## Component

### DateInput
- **Description**: A date input component that splits day, month, and year into separate inputs with validation.
- **Parameters**:
  - `props: DateInputProps` - Props object containing component configuration.
- **Returns**: `JSX.Element` - The rendered component.
- **Key Features**:
  - Automatic focusing from day to month to year inputs
  - Age validation based on minAge and maxAge props
  - Quick date selection with Today/Tomorrow buttons
  - Clear button to reset inputs
  - Error messaging for invalid dates

## CSS Classes

The component uses the following CSS classes that should be included in your `input-fields.css` file:

### Core Classes
- `.ihub-date-input-container` - Container for the three date input fields
- `.ihub-date-input` - Base styling for each input field
- `.ihub-date-year` - Special styling for the year field
- `.ihub-auto-date` - Container for the Today/Tomorrow/Clear controls
- `.ihub-set-today`, `.ihub-set-tomorrow`, `.ihub-clear-date` - Interactive controls
- `.ihub-separator` - Vertical separator between controls
- `.date-err` - Error state modifier class

### Styling Details
- Input fields have consistent width/height with spacing between them
- Error state is shown with red borders
- Interactive controls have hover indicators
- The component aligns with other ihub component styles

## Usage Examples

### Basic Usage
```tsx
import React from "react";
import DateInput from "./DateInput";

const MyForm = () => {
  const handleDateChange = (name: string, value: string) => {
    console.log(`${name}: ${value}`);
  };

  return (
    <form>
      <DateInput 
        labels="Date of Birth" 
        names="dob" 
        requireds={true} 
        inputEvent={handleDateChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
```

### With Age Restrictions
```tsx
import React from "react";
import DateInput from "./DateInput";

const RegistrationForm = () => {
  return (
    <form>
      <DateInput 
        labels="Year Founded" 
        names="founded"
        maxAge={17} 
        minAge={10} 
        controls={true}
      />
    </form>
  );
};
```

### With Default Value
```tsx
import React from "react";
import DateInput from "./DateInput";

const EditProfileForm = () => {
  return (
    <form>
      <DateInput 
        labels="Date of Birth" 
        names="dob"
        defaultValues="1990-01-01" 
      />
    </form>
  );
};
```

## Contributing
Feel free to submit issues or pull requests to improve this component.

## License
[Add your license information here]