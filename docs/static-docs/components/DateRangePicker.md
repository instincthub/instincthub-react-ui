# DateRangePicker

A date range picker component for selecting start and end dates. Features a shared calendar dropdown with two-click selection, live range preview on hover, and quick action presets.

## Features

- **Two-Click Selection**: First click sets start date, second click sets end date
- **Hover Preview**: Live range highlight as you hover before selecting end date
- **Quick Presets**: Today, This Week, This Month, Last 7 Days, Last 30 Days, Clear
- **Date Validation**: Min/max date constraints and disabled dates
- **Auto-Swap**: If end date is before start, dates auto-swap
- **Form Integration**: Hidden inputs for form submission
- **Responsive**: Stacks inputs vertically on mobile
- **Dark Mode**: Supports `.DarkMode` class

## Installation

```bash
npm install @instincthub/react-ui
```

## Basic Usage

```tsx
import { DateRangePicker } from '@instincthub/react-ui';
import type { DateRange } from '@instincthub/react-ui';

function MyComponent() {
  const [range, setRange] = useState<DateRange>({ startDate: '', endDate: '' });

  return (
    <DateRangePicker
      label="Select Date Range"
      value={range}
      onChange={(range) => setRange(range)}
    />
  );
}
```

## Examples

### With Restrictions

```tsx
<DateRangePicker
  label="Filter Dates"
  value={range}
  onChange={(range) => setRange(range)}
  minDate="2024-01-01"
  maxDate="2024-12-31"
  disabledDates={['2024-06-15', '2024-06-16']}
/>
```

### Pre-filled Value

```tsx
<DateRangePicker
  label="Report Period"
  value={{ startDate: '2024-06-01', endDate: '2024-06-30' }}
  onChange={(range) => setRange(range)}
/>
```

### Without Quick Actions

```tsx
<DateRangePicker
  label="Date Range"
  value={range}
  onChange={(range) => setRange(range)}
  showQuickActions={false}
/>
```

### Custom Placeholders

```tsx
<DateRangePicker
  label="Filter by Date"
  onChange={(range) => setRange(range)}
  placeholder={{ start: 'Start date...', end: 'End date...' }}
/>
```

### Required with Error

```tsx
<DateRangePicker
  label="Required Range"
  required
  errorMessage="Please select a valid date range"
  onChange={(range) => setRange(range)}
/>
```

### Form Submission with Hidden Inputs

```tsx
<DateRangePicker
  label="Booking Period"
  value={range}
  onChange={(range) => setRange(range)}
  name={{ start: 'start_date', end: 'end_date' }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text for the date range picker |
| `startLabel` | `string` | `"From"` | Placeholder for the start date input |
| `endLabel` | `string` | `"To"` | Placeholder for the end date input |
| `value` | `DateRange` | - | Current value `{ startDate: string; endDate: string }` |
| `onChange` | `(range: DateRange) => void` | - | Callback when date range changes |
| `required` | `boolean` | `false` | Whether the field is required |
| `minDate` | `string` | - | Minimum allowed date (YYYY-MM-DD) |
| `maxDate` | `string` | - | Maximum allowed date (YYYY-MM-DD) |
| `disabledDates` | `string[]` | `[]` | Array of disabled dates (YYYY-MM-DD) |
| `dateFormat` | `string` | `"yyyy-MM-dd"` | Date display format |
| `placeholder` | `{ start?: string; end?: string }` | - | Custom placeholder text |
| `errorMessage` | `string` | - | Error message to display |
| `className` | `string` | - | Additional CSS class |
| `name` | `{ start?: string; end?: string }` | - | Name attributes for hidden form inputs |
| `id` | `string` | - | ID attribute for the wrapper |
| `disabled` | `boolean` | `false` | Disable the input |
| `showCalendarIcon` | `boolean` | `true` | Show calendar icon in inputs |
| `showQuickActions` | `boolean` | `true` | Show preset buttons |
| `ariaLabel` | `string` | - | Accessible label for the picker |

## Types

```tsx
interface DateRange {
  startDate: string;
  endDate: string;
}
```

## Quick Preset Actions

When `showQuickActions` is enabled (default), the following presets are available:

- **Today** - Sets both start and end to today
- **This Week** - Start of current week to end of current week
- **This Month** - Start of current month to end of current month
- **Last 7 Days** - 7 days ago to today
- **Last 30 Days** - 30 days ago to today
- **Clear** - Resets both dates

## CSS Classes

The component uses these CSS class prefixes:

- `.ihub-daterange-picker-wrapper` - Outer wrapper
- `.ihub-daterange-inputs` - Flex row with inputs
- `.ihub-daterange-input-container` - Individual input wrapper
- `.ihub-daterange-separator-arrow` - Arrow between inputs
- `.ihub-daterange-phase-indicator` - "Select start/end date" text
- `.ihub-daterange-presets` - Quick preset buttons container

Range day classes (applied to calendar days):
- `.range-start` - Start date (left-rounded)
- `.range-end` - End date (right-rounded)
- `.in-range` - Dates between start and end

## Related Components

- [DateTimePicker](./DateTimePicker.md) - Full datetime picker with calendar and time
- [DateInputPicker](./DateInputPicker.md) - Single date picker
- [TimePicker](./TimePicker.md) - Time-only picker
