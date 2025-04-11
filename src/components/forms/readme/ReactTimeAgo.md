# ReactTimeAgo Component

A TypeScript React component that displays relative time (e.g., "5 minutes ago") from a given date.

## Props

### TimeAgoProps

- `date: string | number | Date` - The date to format
- `live?: boolean` - Whether to update the time automatically (default: true)
- `updateInterval?: number` - Milliseconds between updates (default: 60000)
- `formatter?: (value: number, unit: string) => string` - Custom formatter function

## Usage Examples

### Basic Usage

```tsx
import React from "react";
import ReactTimeAgo from "./components/ReactTimeAgo";

const ActivityItem: React.FC = () => {
  return (
    <div className="activity-item">
      <h3>New comment</h3>
      <p>User123 commented on your post</p>
      <ReactTimeAgo date="2023-03-15T09:30:00Z" />
    </div>
  );
};
```

### With Custom Formatter

```tsx
import React from "react";
import ReactTimeAgo from "./components/ReactTimeAgo";

const CustomTimeFormatter = (value: number, unit: string): string => {
  return `${value}${unit.charAt(0)} ago`; // Format as "5m ago"
};

const Comment: React.FC = () => {
  return (
    <div className="comment">
      <p>Great post!</p>
      <ReactTimeAgo
        date={new Date(Date.now() - 3600000)}
        formatter={CustomTimeFormatter}
      />
    </div>
  );
};
```

### Non-Live Version

```tsx
import React from "react";
import ReactTimeAgo from "./components/ReactTimeAgo";

const HistoricalEvent: React.FC = () => {
  return (
    <div className="event">
      <h2>Company Founded</h2>
      <p>
        Our journey began <ReactTimeAgo date="2010-05-12" live={false} />
      </p>
    </div>
  );
};
```

## Features

- TypeScript implementation with full type safety
- Supports live updates with configurable intervals
- Customizable formatting
- Handles future dates
- Optimized with cleanup on unmount
