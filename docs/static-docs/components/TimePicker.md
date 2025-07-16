# TimePicker

**Category:** Form | **Type:** component

TimePicker component for selecting time with 12/24-hour format support.

## 📁 File Location

`src/components/forms/TimePicker.tsx`

## 🏷️ Tags

`form`, `input`, `time`, `picker`

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { TimePicker } from '@instincthub/react-ui';
```

## 🚀 Basic Usage

```tsx
import React, { useState } from 'react';
import { TimePicker } from '@instincthub/react-ui';

function MyComponent() {
  const [time, setTime] = useState('');

  return (
    <TimePicker
      label="Select Time"
      value={time}
      onChange={setTime}
      required
    />
  );
}
```

## 🔧 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | The label text for the input field |
| `value` | `string` | `""` | Current time value in HH:MM or HH:MM:SS format |
| `onChange` | `(time: string) => void` | - | Callback function called when time changes |
| `required` | `boolean` | `false` | Whether the field is required for form validation |
| `use12Hour` | `boolean` | `false` | Whether to use 12-hour format with AM/PM |
| `includeSeconds` | `boolean` | `false` | Whether to include seconds in time selection |
| `step` | `number` | `1` | Time step in minutes for quick selection |
| `minTime` | `string` | - | Minimum allowed time in HH:MM format |
| `maxTime` | `string` | - | Maximum allowed time in HH:MM format |
| `disabledTimes` | `string[]` | `[]` | Array of disabled times in HH:MM format |
| `errorMessage` | `string` | - | Custom error message to display |
| `className` | `string` | `""` | Additional CSS classes to apply |
| `name` | `string` | - | Name attribute for form submission |
| `id` | `string` | - | Unique identifier for the input |
| `placeholder` | `string` | - | Placeholder text for the input |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `showTimePicker` | `boolean` | `true` | Whether to show the time picker dropdown icon |
| `showQuickActions` | `boolean` | `true` | Whether to show Now/Clear quick action buttons |
| `ariaLabel` | `string` | - | Accessibility label for screen readers |

## 📋 Examples

### 24-Hour Format (Default)

```tsx
<TimePicker
  label="Meeting Time"
  value={time}
  onChange={setTime}
  placeholder="HH:MM"
/>
```

### 12-Hour Format with AM/PM

```tsx
<TimePicker
  label="Appointment Time"
  value={time}
  onChange={setTime}
  use12Hour={true}
/>
```

### Time with Seconds

```tsx
<TimePicker
  label="Precise Time"
  value={time}
  onChange={setTime}
  includeSeconds={true}
  placeholder="HH:MM:SS"
/>
```

### Business Hours with Restrictions

```tsx
<TimePicker
  label="Business Hours"
  value={time}
  onChange={setTime}
  minTime="09:00"
  maxTime="17:00"
  disabledTimes={["12:00", "12:15", "12:30", "12:45", "13:00"]}
  step={15}
/>
```

### Custom Step Intervals

```tsx
<TimePicker
  label="Meeting Time"
  value={time}
  onChange={setTime}
  step={30}
  use12Hour={true}
/>
```

## 🎨 Features

- **Multiple Formats**: Supports both 12-hour (AM/PM) and 24-hour formats
- **Seconds Support**: Optional seconds input for precise time selection
- **Time Restrictions**: Set minimum and maximum time ranges
- **Disabled Times**: Disable specific time slots (e.g., lunch breaks)
- **Custom Steps**: Configure time intervals (5, 15, 30 minutes, etc.)
- **Dropdown Picker**: Interactive time selection dropdown
- **Quick Actions**: "Now" and "Clear" buttons for convenience
- **Keyboard Navigation**: Full keyboard accessibility support
- **Validation**: Built-in time validation with custom error messages
- **Responsive**: Works on mobile and desktop devices

## ♿ Accessibility

The TimePicker component includes comprehensive accessibility features:

- ARIA labels and roles for screen readers
- Keyboard navigation support
- Focus management
- Error announcements
- High contrast support

## 🔗 Related Components

- [DateInputPicker](./DateInputPicker.md) - DateInputPicker component for picking date and time
- [InputNumber](./InputNumber.md) - InputNumber component for numerical input
- [InputText](./InputText.md) - InputText component for text input
- [TextField](./TextField.md) - TextField component for text input
- [ToggleButton](./ToggleButton.md) - ToggleButton component for changing state

## 🎯 Use Cases

- Meeting scheduling applications
- Appointment booking systems
- Time tracking applications
- Business hours configuration
- Shift scheduling
- Timer and stopwatch applications
- Event planning forms