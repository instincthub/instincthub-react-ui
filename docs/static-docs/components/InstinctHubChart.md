# InstinctHubChart

**Category:** UI | **Type:** component

Versatile chart component supporting multiple chart types with Recharts integration

## 🏷️ Tags

`ui`, `chart`, `visualization`, `data`, `recharts`

```tsx
"use client";
import React, { useState } from "react";
import {
  InstinctHubChart,
  SubmitButton,
  InputText,
  openToast,
} from "@instincthub/react-ui";

/**
 * Comprehensive examples demonstrating InstinctHubChart usage patterns
 */
const InstinctHubChartExamples = () => {
  const [selectedDataset, setSelectedDataset] = useState("sales");
  const [chartType, setChartType] = useState("line");

  // Sample data sets
  const salesData = [
    { month: "Jan", revenue: 12000, expenses: 8000, profit: 4000 },
    { month: "Feb", revenue: 14000, expenses: 9000, profit: 5000 },
    { month: "Mar", revenue: 15000, expenses: 8500, profit: 6500 },
    { month: "Apr", revenue: 18000, expenses: 10000, profit: 8000 },
    { month: "May", revenue: 20000, expenses: 11000, profit: 9000 },
    { month: "Jun", revenue: 22000, expenses: 12000, profit: 10000 },
    { month: "Jul", revenue: 25000, expenses: 13000, profit: 12000 },
    { month: "Aug", revenue: 23000, expenses: 12500, profit: 10500 },
    { month: "Sep", revenue: 24000, expenses: 13500, profit: 10500 },
    { month: "Oct", revenue: 26000, expenses: 14000, profit: 12000 },
    { month: "Nov", revenue: 28000, expenses: 15000, profit: 13000 },
    { month: "Dec", revenue: 30000, expenses: 16000, profit: 14000 },
  ];

  const userGrowthData = [
    { quarter: "Q1 2023", active: 1200, new: 350, churned: 150 },
    { quarter: "Q2 2023", active: 1450, new: 400, churned: 180 },
    { quarter: "Q3 2023", active: 1680, new: 380, churned: 160 },
    { quarter: "Q4 2023", active: 1890, new: 450, churned: 240 },
    { quarter: "Q1 2024", active: 2100, new: 500, churned: 290 },
    { quarter: "Q2 2024", active: 2350, new: 520, churned: 270 },
  ];

  const performanceData = [
    { category: "Page Load", score: 85, target: 90 },
    { category: "SEO", score: 92, target: 85 },
    { category: "Accessibility", score: 78, target: 80 },
    { category: "Best Practices", score: 89, target: 85 },
    { category: "Performance", score: 76, target: 75 },
  ];

  const marketShareData = [
    { name: "InstinctHub", value: 35, color: "#00838f" },
    { name: "Competitor A", value: 25, color: "#26c6da" },
    { name: "Competitor B", value: 20, color: "#4fc3f7" },
    { name: "Competitor C", value: 12, color: "#81d4fa" },
    { name: "Others", value: 8, color: "#b3e5fc" },
  ];

  const revenueByRegion = [
    { region: "North America", Q1: 45000, Q2: 52000, Q3: 48000, Q4: 61000 },
    { region: "Europe", Q1: 38000, Q2: 41000, Q3: 44000, Q4: 47000 },
    { region: "Asia Pacific", Q1: 32000, Q2: 35000, Q3: 39000, Q4: 42000 },
    { region: "Latin America", Q1: 18000, Q2: 21000, Q3: 23000, Q4: 26000 },
    { region: "Africa", Q1: 12000, Q2: 15000, Q3: 17000, Q4: 19000 },
  ];

  const stackedData = [
    { month: "Jan", positive: 15000, negative: -8000 },
    { month: "Feb", positive: 18000, negative: -9000 },
    { month: "Mar", positive: 22000, negative: -7000 },
    { month: "Apr", positive: 25000, negative: -11000 },
    { month: "May", positive: 28000, negative: -9500 },
    { month: "Jun", positive: 32000, negative: -12000 },
  ];

  const timeSeriesData = [
    { date: "2024-01-01", visitors: 1200, pageViews: 3500, bounceRate: 0.45 },
    { date: "2024-01-02", visitors: 1350, pageViews: 3800, bounceRate: 0.42 },
    { date: "2024-01-03", visitors: 1100, pageViews: 3200, bounceRate: 0.48 },
    { date: "2024-01-04", visitors: 1500, pageViews: 4200, bounceRate: 0.38 },
    { date: "2024-01-05", visitors: 1680, pageViews: 4600, bounceRate: 0.35 },
    { date: "2024-01-06", visitors: 1450, pageViews: 4100, bounceRate: 0.41 },
    { date: "2024-01-07", visitors: 1320, pageViews: 3900, bounceRate: 0.44 },
  ];

  const chartColors = ["#00838f", "#26c6da", "#4fc3f7", "#81d4fa", "#b3e5fc"];

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>InstinctHubChart Examples</h1>

      {/* Basic Line Chart */}
      <div className="ihub-mb-5">
        <h2>1. Basic Line Chart - Sales Performance</h2>
        <p>Simple line chart showing monthly sales data with multiple metrics</p>
        
        <InstinctHubChart
          type="line"
          data={salesData}
          dataKeys={["revenue", "expenses", "profit"]}
          title="Monthly Sales Performance"
          height={400}
          colors={["#00838f", "#ff6b6b", "#4ecdc4"]}
          showLegend={true}
          showGrid={true}
          className="sales-chart"
        />
      </div>

      {/* Bar Chart */}
      <div className="ihub-mb-5">
        <h2>2. Bar Chart - User Growth Metrics</h2>
        <p>Bar chart displaying quarterly user acquisition and retention data</p>
        
        <InstinctHubChart
          type="bar"
          data={userGrowthData}
          dataKeys={["new", "churned"]}
          title="Quarterly User Growth"
          height={350}
          colors={["#4caf50", "#f44336"]}
          showLegend={true}
          showGrid={true}
        />
      </div>

      {/* Pie Chart */}
      <div className="ihub-mb-5">
        <h2>3. Pie Chart - Market Share Distribution</h2>
        <p>Pie chart showing market share breakdown by company</p>
        
        <InstinctHubChart
          type="pie"
          data={marketShareData}
          dataKeys={["value"]}
          title="Market Share Distribution 2024"
          height={400}
          colors={chartColors}
          showLegend={true}
        />
      </div>

      {/* Area Chart */}
      <div className="ihub-mb-5">
        <h2>4. Area Chart - Website Analytics</h2>
        <p>Area chart displaying website traffic patterns over time</p>
        
        <InstinctHubChart
          type="area"
          data={timeSeriesData}
          dataKeys={["visitors", "pageViews"]}
          title="Website Traffic Analytics"
          height={350}
          colors={["#00838f", "#26c6da"]}
          showLegend={true}
          showGrid={true}
        />
      </div>

      {/* Stacked Bar Chart */}
      <div className="ihub-mb-5">
        <h2>5. Stacked Bar Chart - Revenue by Region</h2>
        <p>Stacked bar chart showing quarterly revenue across different regions</p>
        
        <InstinctHubChart
          type="bar"
          data={revenueByRegion}
          dataKeys={["Q1", "Q2", "Q3", "Q4"]}
          title="Quarterly Revenue by Region"
          height={400}
          colors={["#00838f", "#26c6da", "#4fc3f7", "#81d4fa"]}
          showLegend={true}
          showGrid={true}
        />
      </div>

      {/* Stacked by Sign Chart */}
      <div className="ihub-mb-5">
        <h2>6. Stacked by Sign Chart - Profit/Loss Analysis</h2>
        <p>Specialized chart showing positive and negative values</p>
        
        <InstinctHubChart
          type="barStackedBySign"
          data={stackedData}
          dataKeys={["positive", "negative"]}
          title="Monthly Profit/Loss Analysis"
          height={350}
          colors={["#4caf50", "#f44336"]}
          showLegend={true}
          showGrid={true}
        />
      </div>

      {/* Interactive Chart Demo */}
      <div className="ihub-mb-5">
        <h2>7. Interactive Chart Configuration</h2>
        <p>Dynamically switch between chart types and datasets</p>
        
        <div className="ihub-row ihub-mb-3">
          <div className="ihub-col-md-6">
            <label className="ihub-label">Chart Type</label>
            <select
              className="ihub-select ihub-form-control"
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
            >
              <option value="line">Line Chart</option>
              <option value="bar">Bar Chart</option>
              <option value="area">Area Chart</option>
              <option value="pie">Pie Chart</option>
            </select>
          </div>
          <div className="ihub-col-md-6">
            <label className="ihub-label">Dataset</label>
            <select
              className="ihub-select ihub-form-control"
              value={selectedDataset}
              onChange={(e) => setSelectedDataset(e.target.value)}
            >
              <option value="sales">Sales Data</option>
              <option value="users">User Growth</option>
              <option value="performance">Performance Metrics</option>
            </select>
          </div>
        </div>

        {selectedDataset === "sales" && (
          <InstinctHubChart
            type={chartType}
            data={salesData}
            dataKeys={chartType === "pie" ? ["profit"] : ["revenue", "profit"]}
            title={`Sales Performance (${chartType.toUpperCase()})`}
            height={400}
            colors={chartColors}
            showLegend={true}
            showGrid={chartType !== "pie"}
          />
        )}

        {selectedDataset === "users" && (
          <InstinctHubChart
            type={chartType}
            data={userGrowthData}
            dataKeys={chartType === "pie" ? ["active"] : ["active", "new"]}
            title={`User Growth (${chartType.toUpperCase()})`}
            height={400}
            colors={chartColors}
            showLegend={true}
            showGrid={chartType !== "pie"}
          />
        )}

        {selectedDataset === "performance" && (
          <InstinctHubChart
            type={chartType}
            data={performanceData}
            dataKeys={chartType === "pie" ? ["score"] : ["score", "target"]}
            title={`Performance Metrics (${chartType.toUpperCase()})`}
            height={400}
            colors={chartColors}
            showLegend={true}
            showGrid={chartType !== "pie"}
          />
        )}
      </div>

      {/* Custom Styled Charts */}
      <div className="ihub-mb-5">
        <h2>8. Custom Styled Charts</h2>
        <p>Charts with custom styling and advanced configuration</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <InstinctHubChart
              type="line"
              data={salesData.slice(0, 6)}
              dataKeys={["revenue"]}
              title="Revenue Trend (H1)"
              height={300}
              colors={["#00838f"]}
              showLegend={false}
              showGrid={true}
              className="revenue-trend-chart"
            />
          </div>
          <div className="ihub-col-md-6">
            <InstinctHubChart
              type="bar"
              data={performanceData}
              dataKeys={["score"]}
              title="Performance Scores"
              height={300}
              colors={["#4caf50"]}
              showLegend={false}
              showGrid={false}
              className="performance-score-chart"
            />
          </div>
        </div>
      </div>

      {/* Real-time Data Simulation */}
      <div className="ihub-mb-5">
        <h2>9. Dashboard Charts Collection</h2>
        <p>Multiple charts arranged in a dashboard layout</p>
        
        <div className="ihub-row">
          <div className="ihub-col-lg-8">
            <InstinctHubChart
              type="area"
              data={salesData}
              dataKeys={["revenue", "expenses"]}
              title="Monthly Financial Overview"
              height={350}
              colors={["#00838f", "#ff9800"]}
              showLegend={true}
              showGrid={true}
            />
          </div>
          <div className="ihub-col-lg-4">
            <InstinctHubChart
              type="pie"
              data={marketShareData.slice(0, 4)}
              dataKeys={["value"]}
              title="Top 4 Market Players"
              height={350}
              colors={chartColors}
              showLegend={true}
            />
          </div>
        </div>
        
        <div className="ihub-row ihub-mt-4">
          <div className="ihub-col-md-6">
            <InstinctHubChart
              type="bar"
              data={userGrowthData.slice(-3)}
              dataKeys={["new", "churned"]}
              title="Recent User Activity"
              height={250}
              colors={["#4caf50", "#f44336"]}
              showLegend={true}
              showGrid={true}
            />
          </div>
          <div className="ihub-col-md-6">
            <InstinctHubChart
              type="line"
              data={timeSeriesData}
              dataKeys={["visitors"]}
              title="Daily Visitors"
              height={250}
              colors={["#2196f3"]}
              showLegend={false}
              showGrid={true}
            />
          </div>
        </div>
      </div>

      {/* Advanced Chart Features */}
      <div className="ihub-mb-5">
        <h2>10. Advanced Chart Features</h2>
        <p>Charts with advanced features and configurations</p>
        
        {/* Large Dataset Chart */}
        <div className="ihub-mb-4">
          <h3>Large Dataset Handling</h3>
          <InstinctHubChart
            type="line"
            data={Array.from({ length: 50 }, (_, i) => ({
              day: `Day ${i + 1}`,
              value: Math.floor(Math.random() * 1000) + 500,
              trend: Math.floor(Math.random() * 800) + 400,
            }))}
            dataKeys={["value", "trend"]}
            title="50-Day Performance Trend"
            height={400}
            colors={["#00838f", "#ff6b6b"]}
            showLegend={true}
            showGrid={true}
          />
        </div>

        {/* Multi-metric Comparison */}
        <div className="ihub-mb-4">
          <h3>Multi-metric Comparison</h3>
          <InstinctHubChart
            type="bar"
            data={revenueByRegion}
            dataKeys={["Q1", "Q2", "Q3", "Q4"]}
            title="Regional Performance Comparison"
            height={350}
            colors={["#00838f", "#26c6da", "#4fc3f7", "#81d4fa"]}
            showLegend={true}
            showGrid={true}
          />
        </div>
      </div>

      {/* Chart Usage Tips */}
      <div className="ihub-mb-5">
        <h2>Chart Usage Guidelines</h2>
        <div className="ihub-card">
          <h4>Best Practices:</h4>
          <ul>
            <li><strong>Line Charts:</strong> Best for showing trends over time</li>
            <li><strong>Bar Charts:</strong> Ideal for comparing categories</li>
            <li><strong>Pie Charts:</strong> Perfect for showing proportions (limit to 5-7 segments)</li>
            <li><strong>Area Charts:</strong> Great for showing cumulative data</li>
            <li><strong>Stacked Charts:</strong> Useful for part-to-whole relationships</li>
          </ul>
          
          <h4>Color Guidelines:</h4>
          <ul>
            <li>Use consistent color schemes across related charts</li>
            <li>Primary brand color: #00838f</li>
            <li>Ensure sufficient contrast for accessibility</li>
            <li>Limit to 5-7 colors per chart for readability</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InstinctHubChartExamples;
```

## 🔗 Related Components

- [InstinctHubChartDashboard](./InstinctHubChartDashboard.md) - Chart dashboard component
- [ChartConfigurator](./ChartConfigurator.md) - Chart configuration component
- [CustomTextEditor](./CustomTextEditor.md) - Custom text editor component
- [ContentViewer](./ContentViewer.md) - Content viewer component
- [IHubTable](./IHubTable.md) - InstinctHub table component