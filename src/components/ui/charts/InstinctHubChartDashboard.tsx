"use client"
import React, { useState } from "react";
import { ChartDataPointType } from "@/types/charts";
import InstinctHubChart from "./InstinctHubChart";

interface DashboardProps {
  /** Custom class name to apply to the dashboard container */
  className?: string;
}

const InstinctHubChartDashboard = ({ className = "" }: DashboardProps) => {
  // Sample data for the charts
  const [salesData] = useState<ChartDataPointType[]>([
    { name: "Jan", sales: 4000, expenses: 2400, profit: 1600 },
    { name: "Feb", sales: 3000, expenses: 1398, profit: 1602 },
    { name: "Mar", sales: 2000, expenses: 1800, profit: 200 },
    { name: "Apr", sales: 2780, expenses: 2308, profit: 472 },
    { name: "May", sales: 1890, expenses: 2800, profit: -910 },
    { name: "Jun", sales: 2390, expenses: 3800, profit: -1410 },
    { name: "Jul", sales: 3490, expenses: 3000, profit: 490 },
    { name: "Aug", sales: 4000, expenses: 2400, profit: 1600 },
    { name: "Sep", sales: 3000, expenses: 1398, profit: 1602 },
    { name: "Oct", sales: 2000, expenses: 1800, profit: 200 },
    { name: "Nov", sales: 2780, expenses: 2308, profit: 472 },
    { name: "Dec", sales: 3890, expenses: 2800, profit: 1090 },
  ]);

  const [trafficData] = useState<ChartDataPointType[]>([
    { name: "Mon", users: 1000, pageviews: 3400, sessions: 2100 },
    { name: "Tue", users: 1200, pageviews: 4000, sessions: 2300 },
    { name: "Wed", users: 1300, pageviews: 4200, sessions: 2400 },
    { name: "Thu", users: 1200, pageviews: 3800, sessions: 2200 },
    { name: "Fri", users: 1100, pageviews: 3600, sessions: 2000 },
    { name: "Sat", users: 800, pageviews: 2400, sessions: 1500 },
    { name: "Sun", users: 600, pageviews: 2000, sessions: 1200 },
  ]);

  const [distributionData] = useState<ChartDataPointType[]>([
    { name: "Desktop", value: 65 },
    { name: "Mobile", value: 25 },
    { name: "Tablet", value: 10 },
  ]);

  const [conversionData] = useState<ChartDataPointType[]>([
    { name: "Jan", conversion: 40 },
    { name: "Feb", conversion: 45 },
    { name: "Mar", conversion: 42 },
    { name: "Apr", conversion: 38 },
    { name: "May", conversion: 50 },
    { name: "Jun", conversion: 55 },
    { name: "Jul", conversion: 58 },
    { name: "Aug", conversion: 56 },
    { name: "Sep", conversion: 60 },
    { name: "Oct", conversion: 62 },
    { name: "Nov", conversion: 64 },
    { name: "Dec", conversion: 65 },
  ]);

  return (
    <div className={`ihub-chart-dashboard ${className}`}>
      <div className="ihub-chart-dashboard-header">
        <h2>InstinctHub Analytics Dashboard</h2>
        <p>View and analyze your data with interactive charts</p>
      </div>

      <div className="ihub-chart-dashboard-grid">
        <div className="ihub-chart-dashboard-item ihub-chart-dashboard-item-wide">
          <InstinctHubChart
            type="line"
            data={salesData}
            dataKeys={["sales", "expenses", "profit"]}
            title="Monthly Revenue Analysis"
            height={300}
            showGrid={true}
            showLegend={true}
          />
        </div>

        <div className="ihub-chart-dashboard-item">
          <InstinctHubChart
            type="bar"
            data={trafficData}
            dataKeys={["users", "sessions", "pageviews"]}
            title="Website Traffic"
            height={300}
            showGrid={true}
            showLegend={true}
          />
        </div>

        <div className="ihub-chart-dashboard-item">
          <InstinctHubChart
            type="pie"
            data={distributionData}
            title="Device Distribution"
            height={300}
            showLegend={true}
          />
        </div>

        <div className="ihub-chart-dashboard-item ihub-chart-dashboard-item-wide">
          <InstinctHubChart
            type="area"
            data={conversionData}
            dataKeys={["conversion"]}
            title="Conversion Rate Trend"
            height={300}
            showGrid={true}
            showLegend={true}
            colors={["#00c5a2"]}
          />
        </div>
      </div>
    </div>
  );
};

export default InstinctHubChartDashboard;
