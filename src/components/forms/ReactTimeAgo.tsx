import React, { useState, useEffect } from "react";

interface TimeAgoProps {
  date: string | number | Date;
  live?: boolean;
  updateInterval?: number;
  formatter?: (value: number, unit: string) => string;
}

const DEFAULT_FORMATTER = (value: number, unit: string): string => {
  const unitStr = value === 1 ? unit : `${unit}s`;
  return `${value} ${unitStr} ago`;
};

const ReactTimeAgo: React.FC<TimeAgoProps> = ({
  date,
  live = true,
  updateInterval = 60000, // 1 minute default
  formatter = DEFAULT_FORMATTER,
}) => {
  const [timeAgo, setTimeAgo] = useState<string>("");

  const calculateTimeAgo = (): string => {
    const now = new Date();
    const past = new Date(date);
    const diff = Math.floor((now.getTime() - past.getTime()) / 1000); // diff in seconds

    // Time units in seconds
    const units = [
      { name: "year", seconds: 31536000 },
      { name: "month", seconds: 2592000 },
      { name: "week", seconds: 604800 },
      { name: "day", seconds: 86400 },
      { name: "hour", seconds: 3600 },
      { name: "minute", seconds: 60 },
      { name: "second", seconds: 1 },
    ];

    // Handle future dates
    if (diff < 0) {
      return "in the future";
    }

    // Just now
    if (diff < 5) {
      return "just now";
    }

    // Find the appropriate unit
    for (const unit of units) {
      const value = Math.floor(diff / unit.seconds);
      if (value >= 1) {
        return formatter(value, unit.name);
      }
    }

    return formatter(diff, "second");
  };

  useEffect(() => {
    // Initial calculation
    setTimeAgo(calculateTimeAgo());

    // Set up live updates if enabled
    let intervalId: NodeJS.Timeout | null = null;

    if (live) {
      intervalId = setInterval(() => {
        setTimeAgo(calculateTimeAgo());
      }, updateInterval);
    }

    // Clean up
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [date, live, updateInterval]);

  return <span className="ihub-time-ago">{timeAgo}</span>;
};

export default ReactTimeAgo;
