# RadioField Component

A customizable radio button group component for forms with TypeScript support.

## Props

### RadioOption
- `id: string | number` - Value for the radio button
- `title?: string` - Display text (fallback to name if not provided)
- `name?: string` - Alternative display text

### RadioFieldProps
- `options?: RadioOption[]` - Array of radio options
- `names: string` - Input field name and container class name
- `labels: string` - Label text shown above the options
- `requireds?: boolean` - Whether the field is required
- `defaultValues?: string | number` - Pre-selected option value
- `setSelectedValue?: (value: string) => void` - Callback for selection changes

## Usage

```tsx
import React, { useState } from 'react';
import RadioField from './components/RadioField';

const LevelSelector: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  
  const handleLevelChange = (value: string) => {
    setSelectedLevel(value);
    console.log(`Selected level: ${value}`);
  };
  
  return (
    <form>
      <RadioField 
        options={[
          {title: 'Beginner', id: 100},
          {title: 'Intermediate', id: 200},
          {title: 'Advanced', id: 300},
          {title: 'Expert', id: 400},
          {title: 'Master', id: 500},
        ]}
        names="skill_level"
        labels="Skill Level *"
        requireds={true}
        defaultValues={100}
        setSelectedValue={handleLevelChange}
      />
      
      <button type="submit">Submit</button>
    </form>
  );
};
```

## Styling

Add the CSS to your stylesheet to maintain the component's appearance.