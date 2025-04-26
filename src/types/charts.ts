// Types
export interface ChartDataPointType {
  name?: string;
  value?: number;
  [key: string]: any;
}

export type ChartType = "line" | "bar" | "pie" | "area" | "barStackedBySign";

export interface ChartPropsType {
  /** The type of chart to render */
  type: ChartType;
  /** The data to display in the chart */
  data: ChartDataPointType[];
  /** The keys from the data to display as data series */
  dataKeys?: string[];
  /** Chart title */
  title?: string;
  /** Chart height in pixels */
  height?: number;
  /** Custom colors for the chart */
  colors?: string[];
  /** Whether to show the chart legend */
  showLegend?: boolean;
  /** Whether to show the chart grid */
  showGrid?: boolean;
  /** Custom class name to apply to the chart container */
  className?: string;
}
