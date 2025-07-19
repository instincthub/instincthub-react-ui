# InstinctHubChartDashboard

**Category:** UI | **Type:** component

Dashboard component showcasing multiple charts in a coordinated layout for comprehensive data visualization

## 🏷️ Tags

`ui`, `chart`, `visualization`, `dashboard`, `analytics`

```tsx
"use client";
import React, { useState, useEffect } from "react";
import {
  InstinctHubChartDashboard,
  InstinctHubChart,
  InputText,
  SubmitButton,
  openToast,
} from "@instincthub/react-ui";

/**
 * Comprehensive examples demonstrating InstinctHubChartDashboard usage patterns
 */
const ChartDashboardExamples = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedMetric, setSelectedMetric] = useState("revenue");
  const [dashboardData, setDashboardData] = useState<any>({});

  // Sample dashboard data
  const generateDashboardData = (period: string) => {
    const baseData = {
      monthly: {
        salesData: [
          { name: "Jan", sales: 45000, expenses: 28000, profit: 17000, target: 50000 },
          { name: "Feb", sales: 52000, expenses: 31000, profit: 21000, target: 50000 },
          { name: "Mar", sales: 48000, expenses: 29000, profit: 19000, target: 50000 },
          { name: "Apr", sales: 61000, expenses: 35000, profit: 26000, target: 55000 },
          { name: "May", sales: 58000, expenses: 33000, profit: 25000, target: 55000 },
          { name: "Jun", sales: 67000, expenses: 38000, profit: 29000, target: 60000 },
          { name: "Jul", sales: 72000, expenses: 41000, profit: 31000, target: 65000 },
          { name: "Aug", sales: 69000, expenses: 40000, profit: 29000, target: 65000 },
          { name: "Sep", sales: 74000, expenses: 42000, profit: 32000, target: 70000 },
          { name: "Oct", sales: 78000, expenses: 44000, profit: 34000, target: 70000 },
          { name: "Nov", sales: 82000, expenses: 46000, profit: 36000, target: 75000 },
          { name: "Dec", sales: 89000, expenses: 48000, profit: 41000, target: 80000 },
        ],
        trafficData: [
          { name: "Week 1", users: 12500, pageviews: 45000, sessions: 18500, bounceRate: 0.42 },
          { name: "Week 2", users: 13200, pageviews: 48000, sessions: 19200, bounceRate: 0.38 },
          { name: "Week 3", users: 14100, pageviews: 52000, sessions: 20800, bounceRate: 0.35 },
          { name: "Week 4", users: 15300, pageviews: 56000, sessions: 22100, bounceRate: 0.33 },
        ],
        conversionData: [
          { name: "Q1", conversion: 3.2, leads: 1250, customers: 40 },
          { name: "Q2", conversion: 3.8, leads: 1420, customers: 54 },
          { name: "Q3", conversion: 4.2, leads: 1380, customers: 58 },
          { name: "Q4", conversion: 4.5, leads: 1680, customers: 76 },
        ],
      },
      quarterly: {
        salesData: [
          { name: "Q1 2023", sales: 145000, expenses: 88000, profit: 57000, target: 150000 },
          { name: "Q2 2023", sales: 186000, expenses: 108000, profit: 78000, target: 170000 },
          { name: "Q3 2023", sales: 215000, expenses: 123000, profit: 92000, target: 200000 },
          { name: "Q4 2023", sales: 249000, expenses: 138000, profit: 111000, target: 230000 },
          { name: "Q1 2024", sales: 268000, expenses: 148000, profit: 120000, target: 250000 },
          { name: "Q2 2024", sales: 295000, expenses: 162000, profit: 133000, target: 280000 },
        ],
        trafficData: [
          { name: "Q1", users: 152000, pageviews: 580000, sessions: 225000, bounceRate: 0.38 },
          { name: "Q2", users: 168000, pageviews: 640000, sessions: 248000, bounceRate: 0.35 },
          { name: "Q3", users: 182000, pageviews: 695000, sessions: 265000, bounceRate: 0.32 },
          { name: "Q4", users: 198000, pageviews: 750000, sessions: 285000, bounceRate: 0.29 },
        ],
        conversionData: [
          { name: "2023", conversion: 3.9, leads: 5730, customers: 228 },
          { name: "2024", conversion: 4.8, leads: 6420, customers: 308 },
        ],
      },
    };
    return baseData[period as keyof typeof baseData] || baseData.monthly;
  };

  useEffect(() => {
    setDashboardData(generateDashboardData(selectedPeriod));
  }, [selectedPeriod]);

  // Regional performance data
  const regionalData = [
    { region: "North America", revenue: 450000, growth: 12.5, customers: 1250 },
    { region: "Europe", revenue: 380000, growth: 8.2, customers: 980 },
    { region: "Asia Pacific", revenue: 320000, growth: 18.7, customers: 1680 },
    { region: "Latin America", revenue: 180000, growth: 15.3, customers: 720 },
    { region: "Africa", revenue: 95000, growth: 22.1, customers: 450 },
  ];

  const channelPerformance = [
    { channel: "Organic Search", visitors: 125000, conversions: 3250, cost: 0 },
    { channel: "Paid Search", visitors: 85000, conversions: 2890, cost: 45000 },
    { channel: "Social Media", visitors: 68000, conversions: 1720, cost: 28000 },
    { channel: "Email Marketing", visitors: 52000, conversions: 2080, cost: 12000 },
    { channel: "Direct Traffic", visitors: 95000, conversions: 2375, cost: 0 },
    { channel: "Referrals", visitors: 38000, conversions: 950, cost: 8000 },
  ];

  const kpiData = [
    { metric: "Revenue", current: 895000, previous: 782000, target: 950000 },
    { metric: "Customers", current: 4680, previous: 4120, target: 5000 },
    { metric: "Conversion Rate", current: 4.2, previous: 3.8, target: 4.5 },
    { metric: "Average Order Value", current: 191, previous: 190, target: 200 },
  ];

  const productPerformance = [
    { name: "Premium Plan", revenue: 425000, units: 850, growth: 15.2 },
    { name: "Standard Plan", revenue: 280000, units: 1400, growth: 8.7 },
    { name: "Basic Plan", revenue: 190000, units: 2375, growth: 12.1 },
    { name: "Enterprise Plan", revenue: 180000, units: 120, growth: 22.5 },
  ];

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>InstinctHubChartDashboard Examples</h1>

      {/* Basic Dashboard */}
      <div className="ihub-mb-5">
        <h2>1. Basic Dashboard Layout</h2>
        <p>Default dashboard with standard charts and layout</p>
        
        <InstinctHubChartDashboard className="basic-dashboard" />
      </div>

      {/* Comprehensive Analytics Dashboard */}
      <div className="ihub-mb-5">
        <h2>2. Comprehensive Analytics Dashboard</h2>
        <p>Full-featured dashboard with multiple data visualizations and controls</p>
        
        {/* Dashboard Controls */}
        <div className="ihub-row ihub-mb-4">
          <div className="ihub-col-md-6">
            <label className="ihub-label">Time Period</label>
            <select
              className="ihub-select ihub-form-control"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="monthly">Monthly View</option>
              <option value="quarterly">Quarterly View</option>
            </select>
          </div>
          <div className="ihub-col-md-6">
            <label className="ihub-label">Primary Metric</label>
            <select
              className="ihub-select ihub-form-control"
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
            >
              <option value="revenue">Revenue</option>
              <option value="profit">Profit</option>
              <option value="customers">Customers</option>
            </select>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="ihub-row">
          {/* Primary Chart - Sales Performance */}
          <div className="ihub-col-lg-8">
            <InstinctHubChart
              type="line"
              data={dashboardData.salesData || []}
              dataKeys={["sales", "expenses", "profit"]}
              title={`Sales Performance (${selectedPeriod})`}
              height={400}
              colors={["#00838f", "#ff6b6b", "#4ecdc4"]}
              showLegend={true}
              showGrid={true}
            />
          </div>
          
          {/* Secondary Chart - Traffic Overview */}
          <div className="ihub-col-lg-4">
            <InstinctHubChart
              type="pie"
              data={[
                { name: "Desktop", value: 65 },
                { name: "Mobile", value: 28 },
                { name: "Tablet", value: 7 },
              ]}
              dataKeys={["value"]}
              title="Traffic by Device"
              height={400}
              colors={["#00838f", "#26c6da", "#4fc3f7"]}
              showLegend={true}
            />
          </div>
        </div>

        {/* Secondary Charts Row */}
        <div className="ihub-row ihub-mt-4">
          <div className="ihub-col-md-6">
            <InstinctHubChart
              type="bar"
              data={dashboardData.trafficData || []}
              dataKeys={["users", "sessions"]}
              title="User Engagement"
              height={300}
              colors={["#2196f3", "#ff9800"]}
              showLegend={true}
              showGrid={true}
            />
          </div>
          <div className="ihub-col-md-6">
            <InstinctHubChart
              type="area"
              data={dashboardData.conversionData || []}
              dataKeys={["conversion"]}
              title="Conversion Rate Trend"
              height={300}
              colors={["#4caf50"]}
              showLegend={false}
              showGrid={true}
            />
          </div>
        </div>
      </div>

      {/* Executive Dashboard */}
      <div className="ihub-mb-5">
        <h2>3. Executive Dashboard</h2>
        <p>High-level overview for executive decision making</p>
        
        {/* KPI Cards */}
        <div className="ihub-row ihub-mb-4">
          {kpiData.map((kpi, index) => (
            <div key={index} className="ihub-col-md-3">
              <div className="ihub-card">
                <h4>{kpi.metric}</h4>
                <p className="h3">${kpi.current.toLocaleString()}</p>
                <small>
                  vs ${kpi.previous.toLocaleString()} previous |{" "}
                  Target: ${kpi.target.toLocaleString()}
                </small>
              </div>
            </div>
          ))}
        </div>

        {/* Executive Charts */}
        <div className="ihub-row">
          <div className="ihub-col-lg-6">
            <InstinctHubChart
              type="bar"
              data={regionalData}
              dataKeys={["revenue"]}
              title="Revenue by Region"
              height={350}
              colors={["#00838f"]}
              showLegend={false}
              showGrid={true}
            />
          </div>
          <div className="ihub-col-lg-6">
            <InstinctHubChart
              type="line"
              data={productPerformance}
              dataKeys={["revenue"]}
              title="Product Performance"
              height={350}
              colors={["#4caf50"]}
              showLegend={false}
              showGrid={true}
            />
          </div>
        </div>
      </div>

      {/* Marketing Dashboard */}
      <div className="ihub-mb-5">
        <h2>4. Marketing Dashboard</h2>
        <p>Focused on marketing metrics and channel performance</p>
        
        <div className="ihub-row">
          <div className="ihub-col-lg-8">
            <InstinctHubChart
              type="bar"
              data={channelPerformance}
              dataKeys={["visitors", "conversions"]}
              title="Channel Performance Analysis"
              height={400}
              colors={["#2196f3", "#4caf50"]}
              showLegend={true}
              showGrid={true}
            />
          </div>
          <div className="ihub-col-lg-4">
            <InstinctHubChart
              type="pie"
              data={channelPerformance.map(channel => ({
                name: channel.channel,
                value: channel.visitors
              }))}
              dataKeys={["value"]}
              title="Traffic Distribution"
              height={400}
              colors={["#00838f", "#26c6da", "#4fc3f7", "#81d4fa", "#b3e5fc", "#e1f5fe"]}
              showLegend={true}
            />
          </div>
        </div>

        {/* Marketing ROI Analysis */}
        <div className="ihub-row ihub-mt-4">
          <div className="ihub-col-md-12">
            <InstinctHubChart
              type="barStackedBySign"
              data={channelPerformance.map(channel => ({
                name: channel.channel,
                revenue: channel.conversions * 125, // Assume $125 avg order value
                cost: -channel.cost,
              }))}
              dataKeys={["revenue", "cost"]}
              title="Marketing ROI by Channel"
              height={300}
              colors={["#4caf50", "#f44336"]}
              showLegend={true}
              showGrid={true}
            />
          </div>
        </div>
      </div>

      {/* Real-time Dashboard */}
      <div className="ihub-mb-5">
        <h2>5. Real-time Monitoring Dashboard</h2>
        <p>Dashboard with real-time data updates and monitoring</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <InstinctHubChart
              type="area"
              data={[
                { time: "00:00", value: 45 },
                { time: "04:00", value: 32 },
                { time: "08:00", value: 78 },
                { time: "12:00", value: 125 },
                { time: "16:00", value: 98 },
                { time: "20:00", value: 67 },
              ]}
              dataKeys={["value"]}
              title="Server Load (24h)"
              height={250}
              colors={["#ff6b6b"]}
              showLegend={false}
              showGrid={true}
            />
          </div>
          <div className="ihub-col-md-4">
            <InstinctHubChart
              type="line"
              data={[
                { time: "1h ago", users: 1250 },
                { time: "45m ago", users: 1180 },
                { time: "30m ago", users: 1320 },
                { time: "15m ago", users: 1450 },
                { time: "Now", users: 1380 },
              ]}
              dataKeys={["users"]}
              title="Active Users"
              height={250}
              colors={["#2196f3"]}
              showLegend={false}
              showGrid={true}
            />
          </div>
          <div className="ihub-col-md-4">
            <InstinctHubChart
              type="bar"
              data={[
                { metric: "Response Time", value: 245 },
                { metric: "Error Rate", value: 0.8 },
                { metric: "Uptime", value: 99.9 },
                { metric: "Throughput", value: 1250 },
              ]}
              dataKeys={["value"]}
              title="System Metrics"
              height={250}
              colors={["#4caf50"]}
              showLegend={false}
              showGrid={false}
            />
          </div>
        </div>
      </div>

      {/* Sales Dashboard */}
      <div className="ihub-mb-5">
        <h2>6. Sales Performance Dashboard</h2>
        <p>Comprehensive sales analytics and performance tracking</p>
        
        <div className="ihub-row">
          <div className="ihub-col-lg-6">
            <InstinctHubChart
              type="line"
              data={dashboardData.salesData || []}
              dataKeys={["sales", "target"]}
              title="Sales vs Target"
              height={350}
              colors={["#00838f", "#ff9800"]}
              showLegend={true}
              showGrid={true}
            />
          </div>
          <div className="ihub-col-lg-6">
            <InstinctHubChart
              type="bar"
              data={productPerformance}
              dataKeys={["units"]}
              title="Units Sold by Product"
              height={350}
              colors={["#4caf50"]}
              showLegend={false}
              showGrid={true}
            />
          </div>
        </div>

        {/* Sales Team Performance */}
        <div className="ihub-row ihub-mt-4">
          <div className="ihub-col-md-12">
            <InstinctHubChart
              type="bar"
              data={[
                { rep: "John Smith", deals: 45, revenue: 125000, quota: 120000 },
                { rep: "Sarah Jones", deals: 38, revenue: 98000, quota: 100000 },
                { rep: "Mike Johnson", deals: 52, revenue: 145000, quota: 130000 },
                { rep: "Lisa Brown", deals: 41, revenue: 115000, quota: 110000 },
                { rep: "David Wilson", deals: 33, revenue: 89000, quota: 95000 },
              ]}
              dataKeys={["revenue", "quota"]}
              title="Sales Rep Performance"
              height={300}
              colors={["#00838f", "#ff9800"]}
              showLegend={true}
              showGrid={true}
            />
          </div>
        </div>
      </div>

      {/* Custom Dashboard Builder */}
      <div className="ihub-mb-5">
        <h2>7. Custom Dashboard Configuration</h2>
        <p>Build custom dashboards with configurable components</p>
        
        <div className="ihub-card ihub-mb-4">
          <h4>Dashboard Builder</h4>
          <p>Select charts and metrics to build your custom dashboard</p>
          
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <label className="ihub-label">Chart Type</label>
              <select className="ihub-select ihub-form-control">
                <option value="sales">Sales Analytics</option>
                <option value="marketing">Marketing Metrics</option>
                <option value="operations">Operations Dashboard</option>
                <option value="financial">Financial Overview</option>
              </select>
            </div>
            <div className="ihub-col-md-6">
              <label className="ihub-label">Time Range</label>
              <select className="ihub-select ihub-form-control">
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">Last Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Preview Dashboard */}
        <InstinctHubChartDashboard className="custom-dashboard-preview" />
      </div>

      {/* Dashboard Best Practices */}
      <div className="ihub-mb-5">
        <h2>Dashboard Design Guidelines</h2>
        <div className="ihub-card">
          <h4>Best Practices for Dashboard Design:</h4>
          <ul>
            <li><strong>Hierarchy:</strong> Place most important metrics prominently</li>
            <li><strong>Consistency:</strong> Use consistent color schemes and chart types</li>
            <li><strong>Clarity:</strong> Avoid cluttering with too many charts</li>
            <li><strong>Context:</strong> Provide comparison data (previous period, targets)</li>
            <li><strong>Interactivity:</strong> Allow filtering and drill-down capabilities</li>
          </ul>
          
          <h4>Chart Selection Guidelines:</h4>
          <ul>
            <li><strong>Line Charts:</strong> For trends and time-series data</li>
            <li><strong>Bar Charts:</strong> For comparisons across categories</li>
            <li><strong>Pie Charts:</strong> For showing proportions (limit to 5 segments)</li>
            <li><strong>Area Charts:</strong> For cumulative values over time</li>
            <li><strong>Stacked Charts:</strong> For part-to-whole relationships</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChartDashboardExamples;
```

## 🔗 Related Components

- [InstinctHubChart](./InstinctHubChart.md) - Individual chart component
- [ChartConfigurator](./ChartConfigurator.md) - Chart configuration component
- [IHubTable](./IHubTable.md) - InstinctHub table component
- [CustomTextEditor](./CustomTextEditor.md) - Custom text editor component
- [ContentViewer](./ContentViewer.md) - Content viewer component