# RangeRadio Component

A numeric rating component that displays a range of radio buttons from 1 to N.

## Props

### RangeRadioProps
- `ranges: number` - The maximum value in the range (1 to ranges)
- `names?: string` - Input field name and container class name
- `labels: string` - Label text shown above the options
- `requireds?: boolean` - Whether the field is required
- `setSelectedValue?: (value: string) => void` - Callback for selection changes

## Usage

```tsx
import React, { useState } from 'react';
import RangeRadio from './components/RangeRadio';

const SatisfactionSurvey: React.FC = () => {
  const [rating, setRating] = useState<string>('');
  
  const handleRatingChange = (value: string) => {
    setRating(value);
    console.log(`Selected rating: ${value}`);
  };
  
  return (
    <form>
      <RangeRadio 
        ranges={10}
        names="satisfaction_rating"
        labels="How satisfied are you with our service? (1-10)"
        requireds={true}
        setSelectedValue={handleRatingChange}
      />
      
      <button type="submit">Submit Feedback</button>
    </form>
  );
};
```

## Features

- Automatically generates radio buttons from 1 to specified range
- Customizable label text
- Mobile-responsive layout (switches to vertical on small screens)
- Visual indicator for selected value