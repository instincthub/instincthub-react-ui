# FilterBy

**Category:** Forms | **Type:** component

General filtering component with predefined time-based filter options

## 🏷️ Tags

`forms`, `filter`, `time`, `date`, `dropdown`, `period`

```tsx
"use client";
import React, { useState, useEffect } from "react";
import {
  FilterBy,
  Card,
  Badge,
  IHubTable,
} from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";
import {
  CalendarIcon,
  ClockIcon,
  ChartBarIcon,
  FunnelIcon,
  ArrowPathIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

/**
 * Example component demonstrating various ways to use the FilterBy
 */
const FilterByExamples = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("Last 7days");
  const [salesData, setSalesData] = useState<any[]>([]);
  const [analyticsData, setAnalyticsData] = useState<any[]>([]);
  const [reportsFilter, setReportsFilter] = useState<string>("Last 7days");
  const [dashboardFilter, setDashboardFilter] = useState<string>("Last 14 days");

  // Sample data based on time periods
  const generateSampleData = (period: string) => {
    const baseData = {
      "Last 7days": [
        { id: 1, date: "2024-01-19", sales: 1250, orders: 15, customers: 12 },
        { id: 2, date: "2024-01-18", sales: 980, orders: 11, customers: 10 },
        { id: 3, date: "2024-01-17", sales: 1450, orders: 18, customers: 15 },
        { id: 4, date: "2024-01-16", sales: 2100, orders: 25, customers: 20 },
        { id: 5, date: "2024-01-15", sales: 1800, orders: 22, customers: 18 },
      ],
      "Last 14 days": [
        { id: 1, date: "2024-01-19", sales: 1250, orders: 15, customers: 12 },
        { id: 2, date: "2024-01-18", sales: 980, orders: 11, customers: 10 },
        { id: 3, date: "2024-01-17", sales: 1450, orders: 18, customers: 15 },
        { id: 4, date: "2024-01-16", sales: 2100, orders: 25, customers: 20 },
        { id: 5, date: "2024-01-15", sales: 1800, orders: 22, customers: 18 },
        { id: 6, date: "2024-01-14", sales: 1600, orders: 19, customers: 16 },
        { id: 7, date: "2024-01-13", sales: 1350, orders: 16, customers: 14 },
        { id: 8, date: "2024-01-12", sales: 1950, orders: 24, customers: 19 },
      ],
      "This month": [
        { id: 1, date: "January 2024", sales: 45000, orders: 540, customers: 340 },
      ],
      "Last Month": [
        { id: 1, date: "December 2023", sales: 52000, orders: 628, customers: 398 },
      ],
    };

    return baseData[period as keyof typeof baseData] || [];
  };

  const generateAnalyticsData = (period: string) => {
    const baseAnalytics = {
      "Last 7days": [
        { metric: "Page Views", value: 12500, change: "+15%" },
        { metric: "Unique Visitors", value: 3200, change: "+8%" },
        { metric: "Bounce Rate", value: "42%", change: "-5%" },
        { metric: "Avg Session", value: "3:24", change: "+12%" },
      ],
      "Last 14 days": [
        { metric: "Page Views", value: 28400, change: "+22%" },
        { metric: "Unique Visitors", value: 7100, change: "+18%" },
        { metric: "Bounce Rate", value: "38%", change: "-8%" },
        { metric: "Avg Session", value: "3:45", change: "+18%" },
      ],
      "This month": [
        { metric: "Page Views", value: 125000, change: "+35%" },
        { metric: "Unique Visitors", value: 28500, change: "+28%" },
        { metric: "Bounce Rate", value: "35%", change: "-12%" },
        { metric: "Avg Session", value: "4:12", change: "+25%" },
      ],
      "Last Month": [
        { metric: "Page Views", value: 98000, change: "+18%" },
        { metric: "Unique Visitors", value: 22200, change: "+15%" },
        { metric: "Bounce Rate", value: "40%", change: "-6%" },
        { metric: "Avg Session", value: "3:38", change: "+8%" },
      ],
    };

    return baseAnalytics[period as keyof typeof baseAnalytics] || [];
  };

  useEffect(() => {
    setSalesData(generateSampleData(selectedPeriod));
    setAnalyticsData(generateAnalyticsData(selectedPeriod));
  }, [selectedPeriod]);

  const handleFilterChange = (period: string) => {
    setSelectedPeriod(period);
    openToast(`Data filtered for: ${period}`);
  };

  const calculateTotals = (data: any[]) => {
    if (data.length === 0) return { totalSales: 0, totalOrders: 0, totalCustomers: 0 };
    
    return {
      totalSales: data.reduce((sum, item) => sum + item.sales, 0),
      totalOrders: data.reduce((sum, item) => sum + item.orders, 0),
      totalCustomers: data.reduce((sum, item) => sum + item.customers, 0),
    };
  };

  const totals = calculateTotals(salesData);

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>FilterBy Examples</h1>

      {/* Basic FilterBy Usage */}
      <section className="ihub-mb-5">
        <h2>Basic FilterBy Usage</h2>
        <p>Simple time-based filtering with predefined options</p>
        
        <Card className="ihub-p-4" style={{ maxWidth: "400px" }}>
          <div className="ihub-d-flex ihub-align-items-center ihub-gap-2 ihub-mb-3">
            <CalendarIcon className="w-6 h-6 ihub-text-primary" />
            <h5>Time Period Filter</h5>
          </div>
          
          <div className="ihub-mb-3">
            <FilterBy 
              selected={selectedPeriod} 
              setSelected={handleFilterChange} 
            />
          </div>
          
          <div className="ihub-d-flex ihub-gap-2">
            <Badge text={`Period: ${selectedPeriod}`} variant="primary" />
          </div>
        </Card>
      </section>

      {/* Sales Dashboard with FilterBy */}
      <section className="ihub-mb-5">
        <h2>Sales Dashboard with Time Filtering</h2>
        <p>Complete sales dashboard with time-based data filtering</p>
        
        <Card className="ihub-p-4">
          <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center ihub-mb-4">
            <div>
              <h4>Sales Performance Dashboard</h4>
              <p className="ihub-text-muted ihub-mb-0">Track sales metrics over different time periods</p>
            </div>
            <div className="ihub-d-flex ihub-align-items-center ihub-gap-3">
              <ClockIcon className="w-5 h-5 ihub-text-muted" />
              <FilterBy 
                selected={selectedPeriod} 
                setSelected={setSelectedPeriod} 
              />
            </div>
          </div>
          
          {/* Summary Cards */}
          <div className="ihub-row ihub-gap-3 ihub-mb-4">
            <div className="ihub-col-md-4">
              <div className="ihub-text-center ihub-p-3 ihub-border ihub-rounded ihub-bg-light">
                <h3 className="ihub-text-primary">${totals.totalSales.toLocaleString()}</h3>
                <p className="ihub-text-muted ihub-mb-0">Total Sales</p>
              </div>
            </div>
            <div className="ihub-col-md-4">
              <div className="ihub-text-center ihub-p-3 ihub-border ihub-rounded ihub-bg-light">
                <h3 className="ihub-text-success">{totals.totalOrders}</h3>
                <p className="ihub-text-muted ihub-mb-0">Total Orders</p>
              </div>
            </div>
            <div className="ihub-col-md-4">
              <div className="ihub-text-center ihub-p-3 ihub-border ihub-rounded ihub-bg-light">
                <h3 className="ihub-text-info">{totals.totalCustomers}</h3>
                <p className="ihub-text-muted ihub-mb-0">Unique Customers</p>
              </div>
            </div>
          </div>
          
          {/* Sales Data Table */}
          <div className="ihub-table-responsive">
            <table className="ihub-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Sales ($)</th>
                  <th>Orders</th>
                  <th>Customers</th>
                  <th>Avg Order Value</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>${item.sales.toLocaleString()}</td>
                    <td>{item.orders}</td>
                    <td>{item.customers}</td>
                    <td>${(item.sales / item.orders).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* Analytics Dashboard */}
      <section className="ihub-mb-5">
        <h2>Analytics Dashboard</h2>
        <p>Website analytics with time-based filtering</p>
        
        <Card className="ihub-p-4">
          <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center ihub-mb-4">
            <div className="ihub-d-flex ihub-align-items-center ihub-gap-2">
              <ChartBarIcon className="w-6 h-6 ihub-text-success" />
              <h4>Website Analytics</h4>
            </div>
            <FilterBy 
              selected={selectedPeriod} 
              setSelected={setSelectedPeriod} 
            />
          </div>
          
          <div className="ihub-row ihub-gap-3">
            {analyticsData.map((metric, index) => (
              <div key={index} className="ihub-col-md-3">
                <div className="ihub-p-3 ihub-border ihub-rounded">
                  <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-start ihub-mb-2">
                    <h6 className="ihub-text-muted">{metric.metric}</h6>
                    <Badge 
                      text={metric.change} 
                      variant={metric.change.startsWith('+') ? 'success' : 'danger'} 
                    />
                  </div>
                  <h4>{metric.value}</h4>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Multiple Filter Instances */}
      <section className="ihub-mb-5">
        <h2>Multiple Filter Instances</h2>
        <p>Multiple FilterBy components for different data sections</p>
        
        <div className="ihub-row ihub-gap-4">
          <div className="ihub-col-md-6">
            <Card className="ihub-p-4 ihub-h-100">
              <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center ihub-mb-3">
                <div className="ihub-d-flex ihub-align-items-center ihub-gap-2">
                  <DocumentTextIcon className="w-5 h-5 ihub-text-primary" />
                  <h5>Reports Section</h5>
                </div>
                <FilterBy 
                  selected={reportsFilter} 
                  setSelected={setReportsFilter} 
                />
              </div>
              
              <div className="ihub-text-muted ihub-text-sm ihub-mb-3">
                Generate reports for the selected time period
              </div>
              
              <div className="ihub-d-flex ihub-flex-column ihub-gap-2">
                <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center ihub-p-2 ihub-border ihub-rounded">
                  <span>Sales Report</span>
                  <Badge text={reportsFilter} variant="primary" />
                </div>
                <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center ihub-p-2 ihub-border ihub-rounded">
                  <span>Customer Report</span>
                  <Badge text={reportsFilter} variant="primary" />
                </div>
                <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center ihub-p-2 ihub-border ihub-rounded">
                  <span>Inventory Report</span>
                  <Badge text={reportsFilter} variant="primary" />
                </div>
              </div>
            </Card>
          </div>
          
          <div className="ihub-col-md-6">
            <Card className="ihub-p-4 ihub-h-100">
              <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center ihub-mb-3">
                <div className="ihub-d-flex ihub-align-items-center ihub-gap-2">
                  <ChartBarIcon className="w-5 h-5 ihub-text-warning" />
                  <h5>Dashboard Metrics</h5>
                </div>
                <FilterBy 
                  selected={dashboardFilter} 
                  setSelected={setDashboardFilter} 
                />
              </div>
              
              <div className="ihub-text-muted ihub-text-sm ihub-mb-3">
                Dashboard metrics for the selected period
              </div>
              
              <div className="ihub-d-flex ihub-flex-column ihub-gap-3">
                <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                  <span>Revenue Growth</span>
                  <span className="ihub-font-bold ihub-text-success">+24%</span>
                </div>
                <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                  <span>User Engagement</span>
                  <span className="ihub-font-bold ihub-text-info">+18%</span>
                </div>
                <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                  <span>Conversion Rate</span>
                  <span className="ihub-font-bold ihub-text-primary">+12%</span>
                </div>
                <div className="ihub-text-xs ihub-text-muted">
                  * Metrics based on {dashboardFilter.toLowerCase()}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Real-time Data Filtering */}
      <section className="ihub-mb-5">
        <h2>Real-time Data Filtering</h2>
        <p>FilterBy with real-time data updates and loading states</p>
        
        <Card className="ihub-p-4">
          <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center ihub-mb-4">
            <div className="ihub-d-flex ihub-align-items-center ihub-gap-2">
              <ArrowPathIcon className="w-6 h-6 ihub-text-info" />
              <h4>Live Data Monitor</h4>
              <Badge text="Real-time" variant="success" />
            </div>
            <div className="ihub-d-flex ihub-gap-3 ihub-align-items-center">
              <button 
                className="ihub-outlined-btn ihub-btn-sm"
                onClick={() => {
                  openToast("Data refreshed!");
                  setSalesData(generateSampleData(selectedPeriod));
                }}
              >
                <ArrowPathIcon className="w-4 h-4 ihub-mr-1" />
                Refresh
              </button>
              <FilterBy 
                selected={selectedPeriod} 
                setSelected={(period) => {
                  setSelectedPeriod(period);
                  openToast(`Fetching data for ${period}...`);
                  // Simulate API call delay
                  setTimeout(() => {
                    setSalesData(generateSampleData(period));
                    openToast(`Data updated for ${period}`, 200);
                  }, 1000);
                }} 
              />
            </div>
          </div>
          
          <div className="ihub-row ihub-gap-3 ihub-mb-4">
            <div className="ihub-col-md-3">
              <div className="ihub-text-center ihub-p-3 ihub-bg-light ihub-rounded">
                <h6 className="ihub-text-muted">Active Users</h6>
                <h3 className="ihub-text-success">1,234</h3>
                <small className="ihub-text-success">+5% vs yesterday</small>
              </div>
            </div>
            <div className="ihub-col-md-3">
              <div className="ihub-text-center ihub-p-3 ihub-bg-light ihub-rounded">
                <h6 className="ihub-text-muted">Page Views</h6>
                <h3 className="ihub-text-primary">45,678</h3>
                <small className="ihub-text-success">+12% vs yesterday</small>
              </div>
            </div>
            <div className="ihub-col-md-3">
              <div className="ihub-text-center ihub-p-3 ihub-bg-light ihub-rounded">
                <h6 className="ihub-text-muted">Bounce Rate</h6>
                <h3 className="ihub-text-warning">34%</h3>
                <small className="ihub-text-danger">-2% vs yesterday</small>
              </div>
            </div>
            <div className="ihub-col-md-3">
              <div className="ihub-text-center ihub-p-3 ihub-bg-light ihub-rounded">
                <h6 className="ihub-text-muted">Conversions</h6>
                <h3 className="ihub-text-info">89</h3>
                <small className="ihub-text-success">+8% vs yesterday</small>
              </div>
            </div>
          </div>
          
          <div className="ihub-text-muted ihub-text-sm">
            Last updated: {new Date().toLocaleTimeString()} | Period: {selectedPeriod}
          </div>
        </Card>
      </section>

      {/* FilterBy with Custom Styling */}
      <section className="ihub-mb-5">
        <h2>Custom Styled FilterBy</h2>
        <p>FilterBy integrated into custom designed layouts</p>
        
        <div className="ihub-d-flex ihub-flex-column ihub-gap-4">
          {/* Compact Filter Bar */}
          <Card className="ihub-p-3 ihub-bg-primary ihub-text-white">
            <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
              <div className="ihub-d-flex ihub-align-items-center ihub-gap-2">
                <FunnelIcon className="w-5 h-5" />
                <span className="ihub-font-medium">Quick Filter:</span>
              </div>
              <div style={{ minWidth: "200px" }}>
                <FilterBy 
                  selected={selectedPeriod} 
                  setSelected={setSelectedPeriod} 
                />
              </div>
            </div>
          </Card>
          
          {/* Sidebar Style Filter */}
          <div className="ihub-row ihub-gap-4">
            <div className="ihub-col-md-3">
              <Card className="ihub-p-4 ihub-h-100">
                <h6 className="ihub-mb-3">Filter Options</h6>
                <div className="ihub-mb-3">
                  <label className="ihub-text-sm ihub-text-muted ihub-mb-2 ihub-d-block">
                    Time Period:
                  </label>
                  <FilterBy 
                    selected={selectedPeriod} 
                    setSelected={setSelectedPeriod} 
                  />
                </div>
                <div className="ihub-text-xs ihub-text-muted">
                  Select a time period to filter the data displayed in the main content area.
                </div>
              </Card>
            </div>
            
            <div className="ihub-col-md-9">
              <Card className="ihub-p-4 ihub-h-100">
                <h6 className="ihub-mb-3">Filtered Content</h6>
                <div className="ihub-text-muted ihub-mb-3">
                  Content filtered by: <Badge text={selectedPeriod} variant="info" />
                </div>
                <div className="ihub-bg-light ihub-p-4 ihub-rounded ihub-text-center">
                  <p className="ihub-text-muted">
                    This area would contain content filtered by the selected time period.
                    The FilterBy component in the sidebar controls what data is displayed here.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="ihub-mb-5">
        <h2>Best Practices</h2>
        <Card className="ihub-p-4">
          <h5>FilterBy Implementation Guidelines</h5>
          <ul className="ihub-list-unstyled">
            <li className="ihub-mb-2">
              <strong>Predefined Options:</strong> FilterBy provides fixed time period options suitable for most analytics use cases
            </li>
            <li className="ihub-mb-2">
              <strong>State Management:</strong> Use controlled state to manage the selected filter value
            </li>
            <li className="ihub-mb-2">
              <strong>Data Synchronization:</strong> Update your data when the filter selection changes
            </li>
            <li className="ihub-mb-2">
              <strong>User Feedback:</strong> Provide visual feedback when data is being filtered or updated
            </li>
            <li className="ihub-mb-2">
              <strong>Default Selection:</strong> Set a meaningful default filter value like "Last 7days"
            </li>
            <li className="ihub-mb-2">
              <strong>Multiple Instances:</strong> You can use multiple FilterBy components for different data sections
            </li>
            <li className="ihub-mb-2">
              <strong>Performance:</strong> Consider caching data for different time periods to improve performance
            </li>
          </ul>
        </Card>
      </section>
    </div>
  );
};

export default FilterByExamples;
```

## 🔗 Related Components

- [FilterArray](./FilterArray.md) - Array filtering component
- [SearchObjectsFromDB](./SearchObjectsFromDB.md) - Database search component
- [DateInput](./DateInput.md) - Date selection input
- [DateTimeInput](./DateTimeInput.md) - Date and time input
- [IHubTable](./IHubTable.md) - Data table component