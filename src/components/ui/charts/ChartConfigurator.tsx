"use client"
import React, { useState } from "react";
import InstinctHubChart from "./InstinctHubChart";
import { generateChartColors } from "../../lib/charts";
import { ChartDataPointType, ChartPropsType, ChartType } from "@/types/charts";

interface ConfiguratorProps {
  /** Initial data for the chart */
  initialData: ChartDataPointType[];
  /** Initial type of chart */
  initialType?: ChartType;
  /** Chart title */
  title?: string;
  /** Available data keys for selection */
  availableDataKeys?: string[];
  /** Chart height in pixels */
  height?: number;
  /** Custom class name */
  className?: string;
}

const ChartConfigurator: React.FC<ConfiguratorProps> = ({
  initialData,
  initialType = "line",
  title = "Customizable Chart",
  availableDataKeys = ["value"],
  height = 400,
  className = "",
}) => {
  // Chart configuration state
  const [chartType, setChartType] = useState<ChartType>(initialType);
  const [selectedDataKeys, setSelectedDataKeys] = useState<string[]>(
    availableDataKeys.includes("value") ? ["value"] : [availableDataKeys[0]]
  );
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showLegend, setShowLegend] = useState<boolean>(true);
  const [chartHeight, setChartHeight] = useState<number>(height);
  const [useCustomColors, setUseCustomColors] = useState<boolean>(false);
  const [customColors, setCustomColors] = useState<string[]>(
    generateChartColors(availableDataKeys.length)
  );

  // Handle data key selection
  const handleDataKeyToggle = (key: string) => {
    if (selectedDataKeys.includes(key)) {
      // Don't remove if it's the last selected key
      if (selectedDataKeys.length > 1) {
        setSelectedDataKeys(selectedDataKeys.filter((k) => k !== key));
      }
    } else {
      setSelectedDataKeys([...selectedDataKeys, key]);
    }
  };

  // Handle color change
  const handleColorChange = (index: number, color: string) => {
    const newColors = [...customColors];
    newColors[index] = color;
    setCustomColors(newColors);
  };

  // Current chart settings
  const chartSettings: ChartPropsType = {
    type: chartType,
    data: initialData,
    dataKeys: selectedDataKeys,
    title: title,
    height: chartHeight,
    colors: useCustomColors ? customColors : undefined,
    showLegend: showLegend,
    showGrid: showGrid,
  };

  return (
    <div className={`ihub-chart-configurator ${className}`}>
      <div className="ihub-chart-config-panel">
        <h3 className="ihub-chart-config-title">Chart Configuration</h3>

        <div className="ihub-chart-config-section">
          <h4>Chart Type</h4>
          <div className="ihub-chart-config-options">
            <button
              className={`ihub-chart-config-btn ${
                chartType === "line" ? "ihub-chart-config-btn-active" : ""
              }`}
              onClick={() => setChartType("line")}
            >
              Line
            </button>
            <button
              className={`ihub-chart-config-btn ${
                chartType === "bar" ? "ihub-chart-config-btn-active" : ""
              }`}
              onClick={() => setChartType("bar")}
            >
              Bar
            </button>
            <button
              className={`ihub-chart-config-btn ${
                chartType === "area" ? "ihub-chart-config-btn-active" : ""
              }`}
              onClick={() => setChartType("area")}
            >
              Area
            </button>
            <button
              className={`ihub-chart-config-btn ${
                chartType === "pie" ? "ihub-chart-config-btn-active" : ""
              }`}
              onClick={() => setChartType("pie")}
            >
              Pie
            </button>
          </div>
        </div>

        <div className="ihub-chart-config-section">
          <h4>Data Series</h4>
          <div className="ihub-chart-config-options ihub-chart-config-checkboxes">
            {availableDataKeys.map((key) => (
              <label key={key} className="ihub-chart-config-checkbox">
                <input
                  type="checkbox"
                  checked={selectedDataKeys.includes(key)}
                  onChange={() => handleDataKeyToggle(key)}
                  disabled={
                    selectedDataKeys.length === 1 &&
                    selectedDataKeys.includes(key)
                  }
                />
                <span>{key}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="ihub-chart-config-section">
          <h4>Display Options</h4>
          <div className="ihub-chart-config-options ihub-chart-config-checkboxes">
            <label className="ihub-chart-config-checkbox">
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
              />
              <span>Show Grid</span>
            </label>
            <label className="ihub-chart-config-checkbox">
              <input
                type="checkbox"
                checked={showLegend}
                onChange={(e) => setShowLegend(e.target.checked)}
              />
              <span>Show Legend</span>
            </label>
          </div>
        </div>

        <div className="ihub-chart-config-section">
          <h4>Chart Height</h4>
          <div className="ihub-chart-config-range">
            <input
              type="range"
              min="200"
              max="600"
              step="50"
              value={chartHeight}
              onChange={(e) => setChartHeight(parseInt(e.target.value))}
            />
            <span>{chartHeight}px</span>
          </div>
        </div>

        <div className="ihub-chart-config-section">
          <h4>Colors</h4>
          <label className="ihub-chart-config-checkbox">
            <input
              type="checkbox"
              checked={useCustomColors}
              onChange={(e) => setUseCustomColors(e.target.checked)}
            />
            <span>Use Custom Colors</span>
          </label>

          {useCustomColors && (
            <div className="ihub-chart-config-colors">
              {selectedDataKeys.map((key, index) => (
                <div key={key} className="ihub-chart-config-color">
                  <span>{key}</span>
                  <input
                    type="color"
                    value={customColors[index] || "#00838f"}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="ihub-chart-preview">
        <InstinctHubChart {...chartSettings} />
      </div>

      <div className="ihub-chart-config-code">
        <h4>Component Code</h4>
        <pre>
          {`<InstinctHubChart
  type="${chartType}"
  data={data}
  dataKeys={[${selectedDataKeys.map((k) => `'${k}'`).join(", ")}]}
  title="${title}"
  height={${chartHeight}}
  ${
    useCustomColors
      ? `colors={[${customColors.map((c) => `'${c}'`).join(", ")}]}`
      : ""
  }
  showLegend={${showLegend}}
  showGrid={${showGrid}}
/>`}
        </pre>
      </div>
    </div>
  );
};

export default ChartConfigurator;
