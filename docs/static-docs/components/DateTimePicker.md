# DateTimePicker

A modern and comprehensive date and time picker component that combines calendar-based date selection with time input in a single unified interface. The component supports various formats, locales, validation, and accessibility features.

## Features

- **Unified Interface**: Combined date and time selection in one component
- **Calendar Popup**: Interactive calendar with month/year navigation
- **Time Selection**: Manual input or quick selection from time options
- **Format Support**: 12-hour and 24-hour time formats
- **Validation**: Date/time ranges, disabled dates/times, and form validation
- **Accessibility**: Full keyboard navigation and screen reader support
- **Customization**: Configurable time steps, formats, and display options
- **Responsive**: Works on desktop and mobile devices

## Installation

```bash
npm install @instincthub/react-ui
```

## Basic Usage

```tsx
import { DateTimePicker } from '@instincthub/react-ui';

function MyComponent() {
  const [dateTime, setDateTime] = useState('');

  return (
    <DateTimePicker
      label="Select Date and Time"
      value={dateTime}
      onChange={(value) => setDateTime(value)}
    />
  );
}
```

## Examples

### Basic Date and Time Selection

```tsx
<DateTimePicker
  label="Meeting Date and Time"
  value={dateTime}
  onChange={(value) => setDateTime(value)}
  placeholder="YYYY-MM-DD HH:mm"
/>
```

### Required Field

```tsx
<DateTimePicker
  label="Required DateTime"
  value={dateTime}
  onChange={(value) => setDateTime(value)}
  required
/>
```

### 12-Hour Format

```tsx
<DateTimePicker
  label="Appointment Time"
  value={dateTime}
  onChange={(value) => setDateTime(value)}
  use12Hour={true}
  timeFormat="hh:mm a"
/>
```

### With Seconds

```tsx
<DateTimePicker
  label="Precise Time"
  value={dateTime}
  onChange={(value) => setDateTime(value)}
  includeSeconds={true}
  timeFormat="HH:mm:ss"
/>
```

### Date and Time Restrictions

```tsx
<DateTimePicker
  label="Business Hours"
  value={dateTime}
  onChange={(value) => setDateTime(value)}
  minDate="2024-01-01"
  maxDate="2024-12-31"
  minTime="09:00"
  maxTime="17:00"
  disabledDates={['2024-01-15', '2024-01-16']}
  disabledTimes={['12:00', '12:30', '13:00']}
/>
```

### Custom Time Step

```tsx
<DateTimePicker
  label="15-minute Intervals"
  value={dateTime}
  onChange={(value) => setDateTime(value)}
  timeStep={15}
/>
```

### Custom Display Format

```tsx
<DateTimePicker
  label="Custom Format"
  value={dateTime}
  onChange={(value) => setDateTime(value)}
  dateFormat="MMM dd, yyyy"
  timeFormat="h:mm a"
  use12Hour={true}
/>
```

### Error State

```tsx
<DateTimePicker
  label="Error Example"
  value=""
  onChange={() => {}}
  required
  errorMessage="This field is required"
/>
```

### Disabled State

```tsx
<DateTimePicker
  label="Disabled DateTime"
  value="2024-01-15T14:30:00"
  onChange={() => {}}
  disabled
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text for the input field |
| `value` | `string` | `""` | Current datetime value in ISO format (YYYY-MM-DDTHH:mm:ss) |
| `onChange` | `(dateTime: string) => void` | - | Callback function called when datetime changes |
| `required` | `boolean` | `false` | Whether the field is required for form validation |
| `minDate` | `string` | - | Minimum allowed date in ISO format |
| `maxDate` | `string` | - | Maximum allowed date in ISO format |
| `minTime` | `string` | - | Minimum allowed time in HH:mm format |
| `maxTime` | `string` | - | Maximum allowed time in HH:mm format |
| `disabledDates` | `string[]` | `[]` | Array of disabled dates in ISO format |
| `disabledTimes` | `string[]` | `[]` | Array of disabled times in HH:mm format |
| `use12Hour` | `boolean` | `false` | Whether to use 12-hour format with AM/PM |
| `includeSeconds` | `boolean` | `false` | Whether to include seconds in time selection |
| `timeStep` | `number` | `30` | Time step in minutes for time selection |
| `dateFormat` | `string` | `"yyyy-MM-dd"` | Date display format |
| `timeFormat` | `string` | `"HH:mm"` | Time display format |
| `locale` | `string` | `"en-US"` | Locale for date formatting |
| `placeholder` | `string` | - | Placeholder text for the input |
| `errorMessage` | `string` | - | Custom error message to display |
| `className` | `string` | `""` | Additional CSS classes to apply |
| `name` | `string` | - | Name attribute for form submission |
| `id` | `string` | - | Unique identifier for the input |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `showCalendarIcon` | `boolean` | `true` | Whether to show the calendar icon |
| `showTimeIcon` | `boolean` | `true` | Whether to show the time icon |
| `showQuickActions` | `boolean` | `true` | Whether to show quick action buttons |
| `ariaLabel` | `string` | - | Accessibility label for screen readers |
| `autoFocus` | `boolean` | `false` | Whether to focus the input on mount |
| `onFocus` | `(e: FocusEvent) => void` | - | Focus event handler |
| `onBlur` | `(e: FocusEvent) => void` | - | Blur event handler |

## Date Format Options

The component uses `date-fns` for date formatting. Common format options include:

- `yyyy-MM-dd` - 2024-01-15
- `MMM dd, yyyy` - Jan 15, 2024
- `dd/MM/yyyy` - 15/01/2024
- `MM/dd/yyyy` - 01/15/2024

## Time Format Options

- `HH:mm` - 14:30 (24-hour)
- `HH:mm:ss` - 14:30:45 (24-hour with seconds)
- `hh:mm a` - 2:30 PM (12-hour)
- `hh:mm:ss a` - 2:30:45 PM (12-hour with seconds)

## Validation

The component provides built-in validation for:

- Required fields
- Date range restrictions (minDate, maxDate)
- Time range restrictions (minTime, maxTime)
- Disabled dates and times
- Invalid date/time formats

## Accessibility

The DateTimePicker component follows WAI-ARIA guidelines:

- Proper labeling with `aria-label` and `aria-describedby`
- Keyboard navigation support
- Screen reader announcements for date/time changes
- Focus management within the picker
- High contrast mode support

## Keyboard Navigation

- **Tab**: Navigate between elements
- **Enter/Space**: Open/close picker
- **Escape**: Close picker
- **Arrow keys**: Navigate calendar dates
- **Page Up/Down**: Navigate months in calendar

## Styling

The component uses CSS custom properties for theming:

```css
.ihub-datetime-picker {
  --primary-color: var(--DarkCyan, #00838f);
  --secondary-color: var(--TurkishRose, #bc658d);
  --success-color: var(--CaribbeanGreen, #00c5a2);
  --warning-color: var(--Corn, #fbeb5b);
  --danger-color: var(--Danger, #ea5f5e);
  --background-color: var(--White, #ffffff);
  --text-color: var(--Gunmetal, #2c333a);
}
```

### Custom CSS Classes

- `.ihub-datetime-picker-wrapper` - Main wrapper
- `.ihub-datetime-picker` - Component container
- `.ihub-datetime-input` - Input field
- `.ihub-datetime-picker-dropdown` - Picker dropdown
- `.ihub-datetime-calendar` - Calendar section
- `.ihub-datetime-time` - Time selection section
- `.ihub-datetime-error` - Error message

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Dependencies

- `date-fns` - Date formatting and manipulation
- `@mui/icons-material` - Calendar and time icons
- `react` - React framework

## TypeScript Support

The component is fully typed with TypeScript. Import the type definitions:

```tsx
import { DateTimePickerPropsType } from '@instincthub/react-ui/types';
```

## Related Components

- [DateInput](./DateInput.md) - Simple date input
- [DateTimeInput](./DateTimeInput.md) - Basic date and time input
- [TimePicker](./TimePicker.md) - Time-only picker
- [DateInputPicker](./DateInputPicker.md) - Date picker with calendar

## Changelog

### v0.1.4
- Initial release of DateTimePicker component
- Calendar popup with month/year navigation
- Time selection with customizable steps
- Support for 12-hour and 24-hour formats
- Date and time range restrictions
- Disabled dates and times support
- Full accessibility support
- Responsive design
- TypeScript support