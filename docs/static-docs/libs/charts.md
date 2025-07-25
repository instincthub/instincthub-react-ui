# Chart Utilities

**Category:** Library | **Type:** utility collection

A comprehensive collection of utility functions for chart data manipulation, formatting, and visualization. Perfect for data analytics dashboards, reporting systems, and any application requiring chart data processing.

## 📁 File Location

`src/components/lib/charts.ts`

## 🏷️ Tags

`charts`, `data-visualization`, `analytics`, `transformation`, `formatting`, `dashboard`, `statistics`

## 📖 Usage Examples

### Example 1: Complete Chart Data Processing Demo

```tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  transformChartData,
  groupAndAggregateData,
  formatDateForChart,
  createTimeSeriesTemplate,
  formatChartValue,
  calculatePercentageChange,
  generateChartColors
} from "@instincthub/react-ui/lib";

/**
 * Comprehensive example demonstrating chart utility functions
 */
const ChartUtilitiesExamples = () => {
  // Sample raw data for demonstrations
  const [rawSalesData] = useState([
    { product_name: "Laptop", sales_amount: 45000, sale_date: "2024-01-15", category: "Electronics" },
    { product_name: "Phone", sales_amount: 25000, sale_date: "2024-01-16", category: "Electronics" },
    { product_name: "Desk", sales_amount: 8000, sale_date: "2024-01-17", category: "Furniture" },
    { product_name: "Chair", sales_amount: 3500, sale_date: "2024-01-18", category: "Furniture" },
    { product_name: "Tablet", sales_amount: 15000, sale_date: "2024-01-19", category: "Electronics" },
    { product_name: "Sofa", sales_amount: 12000, sale_date: "2024-01-20", category: "Furniture" }
  ]);

  const [processedData, setProcessedData] = useState<any>({});
  const [selectedView, setSelectedView] = useState<string>("transform");

  useEffect(() => {
    // Process data with different utility functions
    const processed = {
      // Transform data for basic chart format
      transformed: transformChartData(rawSalesData, {
        product_name: "name",
        sales_amount: "value"
      }),

      // Group by category and sum sales
      categoryAggregated: groupAndAggregateData(
        rawSalesData,
        "category",
        "sales_amount",
        "sum"
      ),

      // Group by category and get average sales
      categoryAverage: groupAndAggregateData(
        rawSalesData,
        "category", 
        "sales_amount",
        "avg"
      ),

      // Format dates for timeline charts
      dateFormatted: formatDateForChart(rawSalesData, "sale_date", "month-year"),

      // Create time series template
      timeSeries: createTimeSeriesTemplate(
        new Date("2024-01-01"),
        new Date("2024-01-07"),
        "day",
        { value: 0, category: "Default" }
      )
    };

    setProcessedData(processed);
  }, [rawSalesData]);

  const demoValues = [1500, 45000, 1200000, 850, 0.75];

  return (
    <div className="ihub-container ihub-py-5">
      <h1>Chart Utilities Examples</h1>

      {/* Data Transformation Demo */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Data Transformation Functions</h2>
        
        <div className="ihub-mb-3">
          <div className="ihub-btn-group" role="group">
            {[
              { key: "transform", label: "Transform Data" },
              { key: "categorySum", label: "Category Sum" },
              { key: "categoryAvg", label: "Category Average" },
              { key: "dateFormat", label: "Date Formatting" },
              { key: "timeSeries", label: "Time Series" }
            ].map((view) => (
              <button
                key={view.key}
                className={`ihub-btn ${selectedView === view.key ? 'ihub-btn-primary' : 'ihub-btn-outline-primary'}`}
                onClick={() => setSelectedView(view.key)}
              >
                {view.label}
              </button>
            ))}
          </div>
        </div>

        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h6>Original Raw Data</h6>
              <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px", maxHeight: "300px", overflow: "auto" }}>
                {JSON.stringify(rawSalesData, null, 2)}
              </pre>
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h6>Processed Data - {selectedView}</h6>
              <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px", maxHeight: "300px", overflow: "auto" }}>
                {selectedView === "transform" && JSON.stringify(processedData.transformed, null, 2)}
                {selectedView === "categorySum" && JSON.stringify(processedData.categoryAggregated, null, 2)}
                {selectedView === "categoryAvg" && JSON.stringify(processedData.categoryAverage, null, 2)}
                {selectedView === "dateFormat" && JSON.stringify(processedData.dateFormatted, null, 2)}
                {selectedView === "timeSeries" && JSON.stringify(processedData.timeSeries, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Value Formatting Demo */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Value Formatting</h2>
        <div className="ihub-card ihub-p-4">
          <h6>formatChartValue Examples</h6>
          <div className="ihub-row">
            {demoValues.map((value, index) => (
              <div key={index} className="ihub-col-md-4 ihub-mb-3">
                <div className="ihub-card ihub-p-3 text-center">
                  <h6>Original: {value}</h6>
                  <div className="ihub-mb-2">
                    <strong>Default:</strong><br />
                    <code>{formatChartValue(value)}</code>
                  </div>
                  <div className="ihub-mb-2">
                    <strong>Currency:</strong><br />
                    <code>{formatChartValue(value, "$", "")}</code>
                  </div>
                  <div className="ihub-mb-2">
                    <strong>Percentage:</strong><br />
                    <code>{formatChartValue(value, "", "%")}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Percentage Change Calculator */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Percentage Change Calculator</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-row">
            {[
              { current: 1200, previous: 1000, scenario: "Growth" },
              { current: 800, previous: 1000, scenario: "Decline" },
              { current: 1000, previous: 1000, scenario: "No Change" },
              { current: 500, previous: 0, scenario: "From Zero" },
              { current: 0, previous: 500, scenario: "To Zero" }
            ].map((example, index) => {
              const change = calculatePercentageChange(example.current, example.previous);
              return (
                <div key={index} className="ihub-col-md-4 ihub-mb-3">
                  <div className="ihub-card ihub-p-3 text-center">
                    <h6>{example.scenario}</h6>
                    <div className="ihub-mb-2">
                      <strong>Previous:</strong> {example.previous}<br />
                      <strong>Current:</strong> {example.current}
                    </div>
                    <div className={`ihub-badge ${change > 0 ? 'ihub-badge-success' : change < 0 ? 'ihub-badge-danger' : 'ihub-badge-secondary'} ihub-fs-md`}>
                      {change > 0 ? '+' : ''}{change.toFixed(1)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Color Palette Generator */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Color Palette Generator</h2>
        <div className="ihub-card ihub-p-4">
          <h6>InstinctHub Color Palette</h6>
          <div className="ihub-row">
            {[3, 6, 9, 12, 15].map((count) => {
              const colors = generateChartColors(count);
              return (
                <div key={count} className="ihub-col-md-12 ihub-mb-4">
                  <h6>{count} Colors</h6>
                  <div className="ihub-d-flex ihub-flex-wrap ihub-gap-2">
                    {colors.map((color, index) => (
                      <div
                        key={index}
                        className="text-center"
                        style={{ minWidth: "80px" }}
                      >
                        <div
                          style={{
                            backgroundColor: color,
                            height: "40px",
                            borderRadius: "4px",
                            border: "1px solid #ddd"
                          }}
                        ></div>
                        <small style={{ fontSize: "10px" }}>{color}</small>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Implementation Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Real-world Implementation Examples</h2>
        
        {/* Dashboard Analytics */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-chart-line ihub-me-2"></i>
              Dashboard Analytics Implementation
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// React component for analytics dashboard
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import {
  groupAndAggregateData,
  formatChartValue,
  generateChartColors,
  calculatePercentageChange
} from '@instincthub/react-ui/lib';

const AnalyticsDashboard = ({ salesData, previousPeriodData }) => {
  // Process data for charts
  const chartData = useMemo(() => {
    // Group sales by month
    const monthlySales = groupAndAggregateData(
      salesData,
      'month',
      'revenue',
      'sum'
    );

    // Group by product category
    const categoryBreakdown = groupAndAggregateData(
      salesData,
      'category',
      'revenue',
      'sum'
    );

    // Calculate period-over-period changes
    const currentTotal = monthlySales.reduce((sum, item) => sum + item.value, 0);
    const previousTotal = previousPeriodData.reduce((sum, item) => sum + item.revenue, 0);
    const percentageChange = calculatePercentageChange(currentTotal, previousTotal);

    return {
      monthlySales,
      categoryBreakdown,
      percentageChange,
      totalRevenue: currentTotal
    };
  }, [salesData, previousPeriodData]);

  const colors = generateChartColors(chartData.categoryBreakdown.length);

  return (
    <div className="dashboard">
      {/* KPI Cards */}
      <div className="kpi-section">
        <div className="kpi-card">
          <h3>Total Revenue</h3>
          <p className="kpi-value">{formatChartValue(chartData.totalRevenue, '$')}</p>
          <p className={\`kpi-change \${chartData.percentageChange > 0 ? 'positive' : 'negative'}\`}>
            {chartData.percentageChange > 0 ? '+' : ''}{chartData.percentageChange.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Monthly Revenue Chart */}
      <div className="chart-section">
        <h4>Monthly Revenue Trend</h4>
        <BarChart width={600} height={300} data={chartData.monthlySales}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => formatChartValue(value, '$')} />
          <Tooltip formatter={(value) => [formatChartValue(value, '$'), 'Revenue']} />
          <Bar dataKey="value" fill={colors[0]} />
        </BarChart>
      </div>

      {/* Category Breakdown */}
      <div className="chart-section">
        <h4>Sales by Category</h4>
        <PieChart width={400} height={300}>
          <Pie
            data={chartData.categoryBreakdown}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, value }) => \`\${name}: \${formatChartValue(value, '$')}\`}
          >
            {chartData.categoryBreakdown.map((entry, index) => (
              <Cell key={\`cell-\${index}\`} fill={colors[index]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [formatChartValue(value, '$'), 'Revenue']} />
        </PieChart>
      </div>
    </div>
  );
};`}
            </pre>
          </div>
        </div>

        {/* Time Series Analysis */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-calendar ihub-me-2"></i>
              Time Series Analysis
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Time series data processing for trend analysis
import {
  createTimeSeriesTemplate,
  formatDateForChart,
  transformChartData
} from '@instincthub/react-ui/lib';

const TimeSeriesAnalyzer = ({ rawData, startDate, endDate }) => {
  const processTimeSeriesData = useMemo(() => {
    // Create a complete time series template
    const template = createTimeSeriesTemplate(
      new Date(startDate),
      new Date(endDate),
      'day',
      { visitors: 0, conversions: 0, revenue: 0 }
    );

    // Format the raw data dates
    const formattedData = formatDateForChart(rawData, 'timestamp', 'full');

    // Merge actual data with template
    const mergedData = template.map(templateItem => {
      const actualData = formattedData.find(
        item => item.timestamp === templateItem.name
      );
      
      return {
        ...templateItem,
        visitors: actualData?.visitors || 0,
        conversions: actualData?.conversions || 0,
        revenue: actualData?.revenue || 0,
        conversionRate: actualData?.visitors > 0 
          ? (actualData.conversions / actualData.visitors) * 100 
          : 0
      };
    });

    return mergedData;
  }, [rawData, startDate, endDate]);

  return (
    <LineChart width={800} height={400} data={processTimeSeriesData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis yAxisId="left" />
      <YAxis yAxisId="right" orientation="right" />
      <Tooltip 
        formatter={(value, name) => {
          if (name === 'revenue') return [formatChartValue(value, '$'), 'Revenue'];
          if (name === 'conversionRate') return [formatChartValue(value, '', '%'), 'Conversion Rate'];
          return [value, name];
        }}
      />
      <Line yAxisId="left" type="monotone" dataKey="visitors" stroke="#8884d8" />
      <Line yAxisId="left" type="monotone" dataKey="conversions" stroke="#82ca9d" />
      <Line yAxisId="right" type="monotone" dataKey="conversionRate" stroke="#ffc658" />
    </LineChart>
  );
};`}
            </pre>
          </div>
        </div>

        {/* Custom Aggregation Patterns */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-calculator ihub-me-2"></i>
              Advanced Aggregation Patterns
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Advanced data aggregation for complex analytics
const AdvancedAnalytics = ({ userData, salesData, eventData }) => {
  const multiDimensionalAnalysis = useMemo(() => {
    // User engagement by age group
    const ageGroupEngagement = groupAndAggregateData(
      userData,
      'ageGroup',
      'sessionDuration',
      'avg'
    );

    // Sales performance by region and quarter
    const regionalQuarterlyData = salesData.reduce((acc, sale) => {
      const quarter = \`Q\${Math.ceil(new Date(sale.date).getMonth() / 3)}\`;
      const key = \`\${sale.region}-\${quarter}\`;
      
      if (!acc[key]) {
        acc[key] = { name: key, value: 0, count: 0 };
      }
      
      acc[key].value += sale.amount;
      acc[key].count += 1;
      
      return acc;
    }, {});

    // Event conversion funnel
    const conversionFunnel = [
      { name: 'Visitors', value: eventData.filter(e => e.type === 'visit').length },
      { name: 'Signups', value: eventData.filter(e => e.type === 'signup').length },
      { name: 'Purchases', value: eventData.filter(e => e.type === 'purchase').length }
    ];

    // Calculate conversion rates
    const conversionRates = conversionFunnel.map((step, index) => {
      if (index === 0) return { ...step, rate: 100 };
      
      const previousValue = conversionFunnel[0].value;
      const rate = previousValue > 0 ? (step.value / previousValue) * 100 : 0;
      
      return { ...step, rate };
    });

    return {
      ageGroupEngagement,
      regionalQuarterly: Object.values(regionalQuarterlyData),
      conversionFunnel: conversionRates
    };
  }, [userData, salesData, eventData]);

  return multiDimensionalAnalysis;
};`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChartUtilitiesExamples;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import {
  transformChartData,
  groupAndAggregateData,
  formatChartValue,
  generateChartColors
} from '@instincthub/react-ui/lib';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { transformChartData, formatChartValue } from '@instincthub/react-ui/lib';

function SimpleChart({ rawData }) {
  // Transform raw data for chart consumption
  const chartData = transformChartData(rawData, {
    product_name: "name",
    sales_amount: "value"
  });

  return (
    <div>
      {chartData.map((item, index) => (
        <div key={index}>
          <span>{item.name}: </span>
          <span>{formatChartValue(item.value, "$")}</span>
        </div>
      ))}
    </div>
  );
}
```

## 🔧 Available Functions

### Data Transformation

#### `transformChartData<T>(data: T[], keyMap: Record<string, string>): ChartDataPointType[]`
Transforms raw data arrays into chart-ready format by mapping source keys to destination keys.

#### `groupAndAggregateData<T>(data: T[], groupByKey: string, valueKey: string, aggregationType?: "sum" | "avg" | "max" | "min"): ChartDataPointType[]`
Groups data by a specified key and aggregates values using the specified operation.

### Date Formatting

#### `formatDateForChart<T>(data: T[], dateKey: string, format?: "month" | "day" | "year" | "full" | "time" | "month-year"): T[]`
Formats date values in data arrays for chart display.

#### `createTimeSeriesTemplate(startDate: Date, endDate: Date, interval: "day" | "week" | "month" | "year", defaultValues?: Record<string, any>): ChartDataPointType[]`
Creates a complete time series template with default values for missing data points.

### Value Formatting

#### `formatChartValue(value: number, prefix?: string, suffix?: string): string`
Formats numeric values for chart display with K/M abbreviations and optional prefix/suffix.

#### `calculatePercentageChange(currentValue: number, previousValue: number): number`
Calculates percentage change between two values for trend analysis.

### Visual Elements

#### `generateChartColors(count: number): string[]`
Generates colors from the InstinctHub color palette for consistent chart styling.

## 📊 Chart Data Types

```tsx
interface ChartDataPointType {
  name: string;
  value: number;
  date?: Date;
  [key: string]: any;
}
```

## 💡 Use Cases

- **Analytics Dashboards**: Process and display business metrics
- **Financial Reports**: Format currency and percentage data
- **User Analytics**: Track user behavior and engagement
- **Sales Performance**: Visualize sales trends and comparisons
- **Time Series Analysis**: Display data over time periods
- **Comparative Analysis**: Compare performance across categories
- **KPI Visualization**: Display key performance indicators
- **Trend Analysis**: Calculate and display growth rates

## 🎨 InstinctHub Color Palette

The `generateChartColors` function uses a carefully curated color palette:
- **DarkCyan**: #00838f
- **TurkishRose**: #bc658d  
- **Rhythm**: #69779b
- **CaribbeanGreen**: #00c5a2
- **OldLavender**: #756c83
- **AmericanPurple**: #432160
- **ChineseBlue**: #415b90
- **DarkSlateGray**: #314a52

## 📈 Value Formatting Rules

- **< 1,000**: Display as-is (e.g., 750)
- **1,000 - 999,999**: Display with 'k' suffix (e.g., 1.5k)
- **≥ 1,000,000**: Display with 'M' suffix (e.g., 2.3M)
- **Decimals**: Automatically formatted to 1 decimal place when needed

## 🔗 Related Components

- [InstinctHubChart](../components/InstinctHubChart.md) - Chart component that uses these utilities
- [ChartConfigurator](../components/ChartConfigurator.md) - Chart configuration component
- [InstinctHubChartDashboard](../components/InstinctHubChartDashboard.md) - Dashboard component