import { ChartDataPointType } from "@/types/charts";

/**
 * Formats a number for display in charts
 * @param value The number to format
 * @param prefix Optional prefix (e.g. '

/**
 * Transforms raw data for use in charts
 * @param data Raw data array
 * @param keyMap Mapping of source keys to destination keys
 * @returns Transformed data array
 */
export const transformChartData = <T extends Record<string, any>>(
  data: T[],
  keyMap: Record<string, string>
): ChartDataPointType[] => {
  return data.map((item) => {
    const transformedItem: ChartDataPointType = { name: "", value: 0 };

    // Map keys according to the provided keyMap
    Object.entries(keyMap).forEach(([sourceKey, targetKey]) => {
      if (item.hasOwnProperty(sourceKey)) {
        transformedItem[targetKey] = item[sourceKey];
      }
    });

    return transformedItem;
  });
};

/**
 * Groups data by a specified key and aggregates values
 * @param data Array of data points
 * @param groupByKey Key to group by
 * @param valueKey Key containing values to aggregate
 * @param aggregationType Type of aggregation to perform
 * @returns Grouped and aggregated data
 */
export const groupAndAggregateData = <T extends Record<string, any>>(
  data: T[],
  groupByKey: string,
  valueKey: string,
  aggregationType: "sum" | "avg" | "max" | "min" = "sum"
): ChartDataPointType[] => {
  // Group the data
  const groupedData: Record<string, number[]> = {};

  data.forEach((item) => {
    const groupValue = String(item[groupByKey] || "Unknown");
    const value = Number(item[valueKey] || 0);

    if (!groupedData[groupValue]) {
      groupedData[groupValue] = [];
    }

    groupedData[groupValue].push(value);
  });

  // Aggregate the values in each group
  return Object.entries(groupedData).map(([name, values]) => {
    let value = 0;

    switch (aggregationType) {
      case "sum":
        value = values.reduce((sum, val) => sum + val, 0);
        break;
      case "avg":
        value = values.reduce((sum, val) => sum + val, 0) / values.length;
        break;
      case "max":
        value = Math.max(...values);
        break;
      case "min":
        value = Math.min(...values);
        break;
    }

    return { name, value };
  });
};

/**
 * Formats date values for chart display
 * @param data Array of data points
 * @param dateKey Key containing date values
 * @param format Format to convert date to ('month', 'day', 'year', 'time', etc.)
 * @returns Data with formatted date values
 */
export const formatDateForChart = <T extends Record<string, any>>(
  data: T[],
  dateKey: string,
  format: "month" | "day" | "year" | "full" | "time" | "month-year" = "full"
): T[] => {
  return data.map((item) => {
    const date = new Date(item[dateKey]);
    let formattedDate: string;

    switch (format) {
      case "month":
        formattedDate = date.toLocaleString("default", { month: "short" });
        break;
      case "day":
        formattedDate = date.toLocaleString("default", { day: "2-digit" });
        break;
      case "year":
        formattedDate = date.getFullYear().toString();
        break;
      case "time":
        formattedDate = date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        break;
      case "month-year":
        formattedDate = date.toLocaleString("default", {
          month: "short",
          year: "numeric",
        });
        break;
      case "full":
      default:
        formattedDate = date.toLocaleDateString();
        break;
    }

    return { ...item, [dateKey]: formattedDate };
  });
};

/**
 * Creates a data series from a time range with optional default values
 * @param startDate Start date of the range
 * @param endDate End date of the range
 * @param interval Time interval between points ('day', 'week', 'month', 'year')
 * @param defaultValues Default values for each data point
 * @returns Array of data points covering the time range
 */
export const createTimeSeriesTemplate = (
  startDate: Date,
  endDate: Date,
  interval: "day" | "week" | "month" | "year",
  defaultValues: Record<string, any> = {}
): ChartDataPointType[] => {
  const result: ChartDataPointType[] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    let name: string;

    switch (interval) {
      case "day":
        name = current.toLocaleDateString();
        break;
      case "week":
        // Get the week number
        const firstDayOfYear = new Date(current.getFullYear(), 0, 1);
        const pastDaysOfYear =
          (current.getTime() - firstDayOfYear.getTime()) / 86400000;
        const weekNum = Math.ceil(
          (pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7
        );
        name = `Week ${weekNum}, ${current.getFullYear()}`;
        break;
      case "month":
        name = current.toLocaleString("default", {
          month: "short",
          year: "numeric",
        });
        break;
      case "year":
        name = current.getFullYear().toString();
        break;
    }

    // Create data point with default values
    const dataPoint: ChartDataPointType = {
      name,
      value: 0,
      date: new Date(current),
      ...defaultValues,
    };

    result.push(dataPoint);

    // Increment the date
    switch (interval) {
      case "day":
        current.setDate(current.getDate() + 1);
        break;
      case "week":
        current.setDate(current.getDate() + 7);
        break;
      case "month":
        current.setMonth(current.getMonth() + 1);
        break;
      case "year":
        current.setFullYear(current.getFullYear() + 1);
        break;
    }
  }

  return result;
};

/*
 * @param suffix Optional suffix (e.g. '%')
 * @returns Formatted number as string
 */
export const formatChartValue = (
  value: number,
  prefix: string = "",
  suffix: string = ""
): string => {
  // Handle thousands
  if (value >= 1000 && value < 1000000) {
    return `${prefix}${(value / 1000).toFixed(1)}k${suffix}`;
  }

  // Handle millions
  if (value >= 1000000) {
    return `${prefix}${(value / 1000000).toFixed(1)}M${suffix}`;
  }

  // Handle decimals
  if (value % 1 !== 0) {
    return `${prefix}${value.toFixed(1)}${suffix}`;
  }

  return `${prefix}${value}${suffix}`;
};

/**
 * Calculates the percentage change between two values
 * @param currentValue The current value
 * @param previousValue The previous value to compare against
 * @returns Percentage change as a number
 */
export const calculatePercentageChange = (
  currentValue: number,
  previousValue: number
): number => {
  if (previousValue === 0) return currentValue > 0 ? 100 : 0;

  return ((currentValue - previousValue) / Math.abs(previousValue)) * 100;
};

/**
 * Generates colors from InstinctHub color palette
 * @param count Number of colors needed
 * @returns Array of color hex codes
 */
export const generateChartColors = (count: number): string[] => {
  // InstinctHub color palette based on CSS variables
  const colorPalette = [
    "#00838f", // DarkCyan
    "#bc658d", // TurkishRose
    "#69779b", // Rhythm
    "#00c5a2", // CaribbeanGreen
    "#756c83", // OldLavender
    "#432160", // AmericanPurple
    "#415b90", // ChineseBlue
    "#314a52", // DarkSlateGray
    "#a03c78", // MaximumRedPurple
    "#6f539b", // DarkLavender
    "#3c5186", // MetallicBlue
    "#0fabbc", // TiffanyBlue
  ];

  // If we need more colors than available, cycle through them
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(colorPalette[i % colorPalette.length]);
  }

  return result;
};
