# Tooltip Component

A flexible tooltip component that displays additional information on hover, with support for both simple text and complex content.

## Installation

```bash
npm install react-time-ago
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `content` | string \| TooltipContent[] | Yes | Content to display in the tooltip |
| `children` | React.ReactNode | Yes | Element that triggers the tooltip |

## Interfaces

```typescript
interface TooltipContent {
  feedback: string;
  timestamp: string | number | Date;
}
```

## Usage

### Basic Text Tooltip

```tsx
import Tooltip from '@/components/Tooltip';

<Tooltip content="This is a simple tooltip">
  <button>Hover me</button>
</Tooltip>
```

### Complex Content with Timestamps

```tsx
import Tooltip from '@/components/Tooltip';

const feedbackHistory = [
  { 
    feedback: "Initial review completed", 
    timestamp: "2025-03-15T14:30:00"
  },
  { 
    feedback: "Revision requested", 
    timestamp: "2025-03-16T09:45:00"
  },
  { 
    feedback: "Final approval", 
    timestamp: "2025-03-17T16:20:00"
  }
];

<Tooltip content={feedbackHistory}>
  <span className="info-icon">ⓘ</span>
</Tooltip>
```

## Examples

### Tooltip for Form Fields

```tsx
<div className="form-field">
  <label>
    Email Address
    <Tooltip content="We'll never share your email with anyone else">
      <span className="help-icon">?</span>
    </Tooltip>
  </label>
  <input type="email" />
</div>
```

### Interactive Elements with Status History

```tsx
const TaskItem = ({ task }) => {
  const statusUpdates = task.history.map(item => ({
    feedback: `Status changed to: ${item.status}`,
    timestamp: item.updatedAt
  }));

  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <div className="task-status">
        {task.status}
        <Tooltip content={statusUpdates}>
          <span className="history-icon">📋</span>
        </Tooltip>
      </div>
    </div>
  );
};
```

## Note

This component requires the `react-time-ago` package and its necessary configuration. Ensure you have properly set up this dependency in your project.