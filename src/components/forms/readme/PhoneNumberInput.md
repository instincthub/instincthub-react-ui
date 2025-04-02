# PhoneNumberInput Component

A React component for international phone number input with country code selection.

## Props

### PhoneNumberInputProps
- `phoneCode?: string` - Default country phone code (e.g., "234" for Nigeria)
- `defaultValues: object` - Object containing initial values
  - `mobile?: string` - Initial phone number value
- `names?: string` - Input field name attribute
- `inputEvent?: function` - Handler for input changes

## Usage

```tsx
import React from 'react';
import PhoneNumberInput from './components/PhoneNumberInput';

const ContactForm: React.FC = () => {
  const handleInputChange = (event) => {
    console.log('Input changed:', event.target.name, event.target.value);
  };
  
  return (
    <form>
      <h2>Contact Information</h2>
      
      <PhoneNumberInput 
        phoneCode="1" 
        defaultValues={{ mobile: "5551234567" }}
        names="phone_number"
        inputEvent={handleInputChange}
      />
      
      <button type="submit">Submit</button>
    </form>
  );
};
```

## Country Objects

The component requires a `countryObjects` array with the following structure:

```typescript
interface CountryObject {
  name: string;     // Country name
  phonecode: string; // Country calling code (without +)
  flag: string;     // Flag emoji or icon
}
```

## Features
- Country selector with flags
- Phone number input with validation
- Real-time formatted display
- Support for default values