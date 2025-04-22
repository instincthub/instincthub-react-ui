"use client";

import React, { useState, useEffect } from "react";
import {
  InstinctHubChartDashboard,
  ChartConfigurator,
} from "../../../../index";
import { ChartDataPointType } from "../../../../types/charts";

import {
  formatChartValue,
  calculatePercentageChange,
  generateChartColors,
  groupAndAggregateData,
  formatDateForChart,
  createTimeSeriesTemplate,
} from "../../../../components/lib";

const ChartExamples: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [sampleData, setSampleData] = useState<ChartDataPointType[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<ChartDataPointType[]>(
    []
  );

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      try {
        // In a real application, you would fetch data from an API
        setTimeout(() => {
          // Sample data for the configurator
          const data = [
            { name: "Jan", visitors: 4000, pageviews: 12000, conversions: 400 },
            { name: "Feb", visitors: 3000, pageviews: 9000, conversions: 350 },
            { name: "Mar", visitors: 2000, pageviews: 6000, conversions: 300 },
            { name: "Apr", visitors: 2780, pageviews: 8340, conversions: 320 },
            { name: "May", visitors: 1890, pageviews: 5670, conversions: 280 },
            { name: "Jun", visitors: 2390, pageviews: 7170, conversions: 310 },
            { name: "Jul", visitors: 3490, pageviews: 10470, conversions: 420 },
          ];

          // Create a time series template for the last 30 days
          const today = new Date();
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(today.getDate() - 30);

          const timeSeriesTemplate = createTimeSeriesTemplate(
            thirtyDaysAgo,
            today,
            "day",
            { enrollments: 0, completions: 0 }
          );

          // Fill with random data
          const filledTimeSeriesData = timeSeriesTemplate.map((item) => {
            return {
              ...item,
              enrollments: Math.floor(Math.random() * 50) + 10,
              completions: Math.floor(Math.random() * 30) + 5,
            };
          });

          setSampleData(data);
          setTimeSeriesData(filledTimeSeriesData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderLoader = () => (
    <div className="ihub-chart-loader">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );

  return (
    <div className="ihub-container">
      <div className="ihub-pt-8">
        <h1 className="ihub-mb-3">InstinctHub Chart System</h1>
        <p className="ihub-mb-5">
          A comprehensive and responsive chart visualization system built
          specifically for InstinctHub's design system. Create interactive,
          customizable charts to display your data in a visually appealing way.
        </p>

        {loading ? (
          renderLoader()
        ) : (
          <>
            {/* Chart Dashboard */}
            <section className="ihub-mb-8">
              <h2 className="ihub-mb-4">Analytics Dashboard</h2>
              <p className="ihub-mb-4">
                A fully responsive dashboard with multiple chart types to
                visualize different aspects of your data.
              </p>
              <InstinctHubChartDashboard />
            </section>

            {/* Chart Configurator */}
            <section className="ihub-mb-8">
              <h2 className="ihub-mb-4">Interactive Chart Configurator</h2>
              <p className="ihub-mb-4">
                Customize chart properties and see the changes in real-time.
                Generate the code for your custom chart configuration.
              </p>
              <ChartConfigurator
                initialData={sampleData}
                availableDataKeys={["visitors", "pageviews", "conversions"]}
                title="Website Traffic Analysis"
              />
            </section>

            {/* Time Series Example */}
            <section className="ihub-mb-8">
              <h2 className="ihub-mb-4">Time Series Visualization</h2>
              <p className="ihub-mb-4">
                Display time-based data with automatic formatting and
                aggregation. Perfect for showing trends over time.
              </p>

              <div className="ihub-chart-custom-item">
                <ChartConfigurator
                  initialData={timeSeriesData}
                  initialType="line"
                  availableDataKeys={["enrollments", "completions"]}
                  title="Daily Course Metrics (Last 30 Days)"
                />
              </div>
            </section>

            {/* Custom Chart Types */}
            <section className="ihub-mb-8">
              <h2 className="ihub-mb-4">Specialized Chart Types</h2>
              <p className="ihub-mb-4">
                Additional chart types designed for specific use cases, such as
                skills assessment radar charts and progress tracking.
              </p>
              {/* <CustomChartsExample /> */}
            </section>

            {/* Chart Utility Functions */}
            <section className="ihub-mb-10">
              <h2 className="ihub-mb-4">Chart Utility Functions</h2>
              <p className="ihub-mb-4">
                A collection of helper functions for data transformation,
                formatting, and aggregation to make working with chart data
                easier.
              </p>

              <div className="ihub-chart-utility-demos">
                <div className="ihub-utility-demo">
                  <h3>Value Formatting</h3>
                  <code>formatChartValue(1500, '')</code>
                  <p>Result: {formatChartValue(1500, "")}</p>
                </div>

                <div className="ihub-utility-demo">
                  <h3>Percentage Change</h3>
                  <code>calculatePercentageChange(150, 100)</code>
                  <p>Result: {calculatePercentageChange(150, 100)}%</p>
                </div>

                <div className="ihub-utility-demo">
                  <h3>Color Generation</h3>
                  <code>generateChartColors(3)</code>
                  <div className="ihub-color-samples">
                    {generateChartColors(3).map((color, index) => (
                      <div
                        key={index}
                        className="ihub-color-sample"
                        style={{ backgroundColor: color }}
                      >
                        {color}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default ChartExamples;
