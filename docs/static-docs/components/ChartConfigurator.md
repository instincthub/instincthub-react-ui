# ChartConfigurator

**Category:** UI | **Type:** component

Interactive chart configuration interface with real-time preview, customizable chart types, and comprehensive styling options

**File Location:** `src/components/ui/charts/ChartConfigurator.tsx`

## 🏷️ Tags

`ui`, `chart`, `visualization`, `configuration`, `data-viz`, `interactive`

```tsx
"use client";
import React, { useState, useEffect } from "react";
import { ChartConfigurator } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive examples demonstrating ChartConfigurator usage
 * Shows chart configuration, real-time preview, and data customization
 */
const ChartConfiguratorExamples = () => {
  const [chartConfig, setChartConfig] = useState({
    type: "bar",
    title: "Sales Performance",
    width: 600,
    height: 400,
    colors: ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"],
    showLegend: true,
    showGrid: true,
    animations: true,
    responsive: true
  });

  const [selectedDataset, setSelectedDataset] = useState("sales");
  const [previewMode, setPreviewMode] = useState("live");

  const datasets = {
    sales: {
      name: "Sales Data",
      data: [
        { month: "Jan", sales: 4000, target: 3500, profit: 1200 },
        { month: "Feb", sales: 3000, target: 3200, profit: 900 },
        { month: "Mar", sales: 5000, target: 4000, profit: 1500 },
        { month: "Apr", sales: 4500, target: 4200, profit: 1350 },
        { month: "May", sales: 6000, target: 5000, profit: 1800 },
        { month: "Jun", sales: 5500, target: 5200, profit: 1650 },
      ]
    },
    traffic: {
      name: "Website Traffic",
      data: [
        { day: "Mon", visits: 1200, pageviews: 3600, bounce: 35 },
        { day: "Tue", visits: 1900, pageviews: 5700, bounce: 28 },
        { day: "Wed", visits: 1500, pageviews: 4500, bounce: 42 },
        { day: "Thu", visits: 2200, pageviews: 6600, bounce: 31 },
        { day: "Fri", visits: 2800, pageviews: 8400, bounce: 25 },
        { day: "Sat", visits: 1800, pageviews: 5400, bounce: 38 },
        { day: "Sun", visits: 1600, pageviews: 4800, bounce: 40 },
      ]
    },
    performance: {
      name: "Performance Metrics",
      data: [
        { quarter: "Q1", revenue: 85000, costs: 62000, growth: 12 },
        { quarter: "Q2", revenue: 92000, costs: 65000, growth: 18 },
        { quarter: "Q3", revenue: 78000, costs: 58000, growth: -8 },
        { quarter: "Q4", revenue: 105000, costs: 71000, growth: 25 },
      ]
    }
  };

  const chartTypes = [
    { value: "bar", label: "Bar Chart", icon: "📊" },
    { value: "line", label: "Line Chart", icon: "📈" },
    { value: "pie", label: "Pie Chart", icon: "🥧" },
    { value: "area", label: "Area Chart", icon: "🌄" },
    { value: "scatter", label: "Scatter Plot", icon: "🎯" },
    { value: "radar", label: "Radar Chart", icon: "🕸️" },
  ];

  const colorSchemes = [
    { name: "Default", colors: ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"] },
    { name: "Warm", colors: ["#ff6b6b", "#feca57", "#ff9ff3", "#54a0ff", "#5f27cd"] },
    { name: "Cool", colors: ["#74b9ff", "#0984e3", "#00b894", "#00cec9", "#6c5ce7"] },
    { name: "Monochrome", colors: ["#2d3436", "#636e72", "#b2bec3", "#ddd", "#fff"] },
    { name: "Vibrant", colors: ["#fd79a8", "#fdcb6e", "#6c5ce7", "#74b9ff", "#00b894"] },
  ];

  const handleConfigChange = (key: string, value: any) => {
    setChartConfig(prev => ({
      ...prev,
      [key]: value
    }));
    openToast(`Updated ${key} configuration`);
  };

  const handleColorSchemeChange = (colors: string[]) => {
    setChartConfig(prev => ({
      ...prev,
      colors
    }));
    openToast("Color scheme updated");
  };

  const handleDatasetChange = (dataset: string) => {
    setSelectedDataset(dataset);
    openToast(`Switched to ${datasets[dataset as keyof typeof datasets].name}`);
  };

  const handleExportConfig = () => {
    const configJson = JSON.stringify(chartConfig, null, 2);
    navigator.clipboard.writeText(configJson);
    openToast("Configuration copied to clipboard");
  };

  const handleResetConfig = () => {
    setChartConfig({
      type: "bar",
      title: "Sales Performance",
      width: 600,
      height: 400,
      colors: ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"],
      showLegend: true,
      showGrid: true,
      animations: true,
      responsive: true
    });
    openToast("Configuration reset to defaults");
  };

  const currentDataset = datasets[selectedDataset as keyof typeof datasets];

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>ChartConfigurator Examples</h1>
      <p className="ihub-mb-4">
        Interactive chart configuration interface with real-time preview,
        customizable chart types, and comprehensive styling options.
      </p>

      {/* Configuration Controls */}
      <section className="ihub-mb-5">
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Chart Configuration</h3>
            <div className="ihub-config-actions">
              <button
                className="ihub-outlined-btn ihub-btn-sm"
                onClick={handleExportConfig}
              >
                📋 Export Config
              </button>
              <button
                className="ihub-outlined-btn ihub-btn-sm"
                onClick={handleResetConfig}
              >
                🔄 Reset
              </button>
            </div>
          </div>
          <div className="ihub-card-body">
            <ChartConfigurator
              config={chartConfig}
              data={currentDataset.data}
              onConfigChange={handleConfigChange}
              showPreview={previewMode === "live"}
              dataSourceSelector={true}
              colorPicker={true}
              advancedOptions={true}
              className="ihub-chart-configurator"
            />
          </div>
        </div>
      </section>

      {/* Quick Controls */}
      <section className="ihub-mb-5">
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Chart Type</h3>
              </div>
              <div className="ihub-card-body">
                <div className="ihub-chart-types">
                  {chartTypes.map((type) => (
                    <button
                      key={type.value}
                      className={`ihub-chart-type-btn ${chartConfig.type === type.value ? 'active' : ''}`}
                      onClick={() => handleConfigChange('type', type.value)}
                    >
                      <span className="ihub-chart-icon">{type.icon}</span>
                      <span className="ihub-chart-label">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-4">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Data Source</h3>
              </div>
              <div className="ihub-card-body">
                <div className="ihub-dataset-selector">
                  {Object.entries(datasets).map(([key, dataset]) => (
                    <button
                      key={key}
                      className={`ihub-dataset-btn ${selectedDataset === key ? 'active' : ''}`}
                      onClick={() => handleDatasetChange(key)}
                    >
                      <h5>{dataset.name}</h5>
                      <p className="ihub-dataset-info">
                        {dataset.data.length} records
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-4">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Color Schemes</h3>
              </div>
              <div className="ihub-card-body">
                <div className="ihub-color-schemes">
                  {colorSchemes.map((scheme) => (
                    <div
                      key={scheme.name}
                      className="ihub-color-scheme"
                      onClick={() => handleColorSchemeChange(scheme.colors)}
                    >
                      <div className="ihub-color-preview">
                        {scheme.colors.map((color, index) => (
                          <div
                            key={index}
                            className="ihub-color-swatch"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <span className="ihub-scheme-name">{scheme.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Configuration */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Advanced Configuration</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Detailed Settings</h3>
            <p className="ihub-text-muted">Fine-tune chart appearance and behavior</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-advanced-config">
              <div className="ihub-config-section">
                <h4>Chart Properties</h4>
                <div className="ihub-config-row">
                  <div className="ihub-config-item">
                    <label className="ihub-form-label">Title:</label>
                    <input
                      type="text"
                      value={chartConfig.title}
                      onChange={(e) => handleConfigChange('title', e.target.value)}
                      className="ihub-input"
                    />
                  </div>
                  <div className="ihub-config-item">
                    <label className="ihub-form-label">Width:</label>
                    <input
                      type="number"
                      value={chartConfig.width}
                      onChange={(e) => handleConfigChange('width', parseInt(e.target.value))}
                      className="ihub-input"
                      min="300"
                      max="1200"
                    />
                  </div>
                  <div className="ihub-config-item">
                    <label className="ihub-form-label">Height:</label>
                    <input
                      type="number"
                      value={chartConfig.height}
                      onChange={(e) => handleConfigChange('height', parseInt(e.target.value))}
                      className="ihub-input"
                      min="200"
                      max="800"
                    />
                  </div>
                </div>
              </div>
              
              <div className="ihub-config-section">
                <h4>Display Options</h4>
                <div className="ihub-config-toggles">
                  <label className="ihub-toggle-label">
                    <input
                      type="checkbox"
                      checked={chartConfig.showLegend}
                      onChange={(e) => handleConfigChange('showLegend', e.target.checked)}
                    />
                    Show Legend
                  </label>
                  <label className="ihub-toggle-label">
                    <input
                      type="checkbox"
                      checked={chartConfig.showGrid}
                      onChange={(e) => handleConfigChange('showGrid', e.target.checked)}
                    />
                    Show Grid
                  </label>
                  <label className="ihub-toggle-label">
                    <input
                      type="checkbox"
                      checked={chartConfig.animations}
                      onChange={(e) => handleConfigChange('animations', e.target.checked)}
                    />
                    Enable Animations
                  </label>
                  <label className="ihub-toggle-label">
                    <input
                      type="checkbox"
                      checked={chartConfig.responsive}
                      onChange={(e) => handleConfigChange('responsive', e.target.checked)}
                    />
                    Responsive
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Preview */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Live Preview</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Chart Preview</h3>
            <div className="ihub-preview-controls">
              <button
                className={`ihub-outlined-btn ihub-btn-sm ${previewMode === 'live' ? 'active' : ''}`}
                onClick={() => setPreviewMode('live')}
              >
                Live Preview
              </button>
              <button
                className={`ihub-outlined-btn ihub-btn-sm ${previewMode === 'static' ? 'active' : ''}`}
                onClick={() => setPreviewMode('static')}
              >
                Static Preview
              </button>
            </div>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-chart-preview">
              <ChartConfigurator
                config={chartConfig}
                data={currentDataset.data}
                previewOnly={true}
                className="ihub-chart-preview-container"
              />
            </div>
            
            <div className="ihub-chart-info ihub-mt-3">
              <div className="ihub-chart-details">
                <div className="ihub-detail-item">
                  <span className="ihub-detail-label">Chart Type:</span>
                  <span className="ihub-detail-value">{chartConfig.type}</span>
                </div>
                <div className="ihub-detail-item">
                  <span className="ihub-detail-label">Data Points:</span>
                  <span className="ihub-detail-value">{currentDataset.data.length}</span>
                </div>
                <div className="ihub-detail-item">
                  <span className="ihub-detail-label">Dimensions:</span>
                  <span className="ihub-detail-value">{chartConfig.width}x{chartConfig.height}</span>
                </div>
                <div className="ihub-detail-item">
                  <span className="ihub-detail-label">Colors:</span>
                  <span className="ihub-detail-value">{chartConfig.colors.length} colors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Export Options */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Export & Share</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Export Configuration</h3>
            <p className="ihub-text-muted">Save and share your chart configuration</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-export-options">
              <div className="ihub-export-buttons">
                <button
                  className="ihub-primary-btn"
                  onClick={() => openToast("Chart exported as PNG")}
                >
                  📸 Export as PNG
                </button>
                <button
                  className="ihub-outlined-btn"
                  onClick={() => openToast("Chart exported as SVG")}
                >
                  🎨 Export as SVG
                </button>
                <button
                  className="ihub-outlined-btn"
                  onClick={handleExportConfig}
                >
                  📋 Copy Config JSON
                </button>
                <button
                  className="ihub-outlined-btn"
                  onClick={() => openToast("Shareable link copied")}
                >
                  🔗 Share Link
                </button>
              </div>
              
              <div className="ihub-config-display ihub-mt-4">
                <h5>Current Configuration:</h5>
                <pre className="ihub-config-json">
                  {JSON.stringify(chartConfig, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Implementation Guide</h2>
        <div className="ihub-card ihub-p-4">
          <h3>Props Interface:</h3>
          <pre className="ihub-code-block">
{`interface ChartConfiguratorProps {
  config: {                             // Chart configuration object
    type: 'bar' | 'line' | 'pie' | 'area' | 'scatter' | 'radar';
    title?: string;
    width?: number;
    height?: number;
    colors?: string[];
    showLegend?: boolean;
    showGrid?: boolean;
    animations?: boolean;
    responsive?: boolean;
  };
  data: any[];                          // Chart data array
  onConfigChange?: (key: string, value: any) => void; // Config change handler
  showPreview?: boolean;                // Show live preview
  previewOnly?: boolean;                // Show only preview (no controls)
  dataSourceSelector?: boolean;         // Show data source selector
  colorPicker?: boolean;                // Show color picker
  advancedOptions?: boolean;            // Show advanced configuration
  className?: string;                   // CSS classes
  onExport?: (format: string) => void;  // Export handler
}`}</pre>
          
          <h3 className="ihub-mt-3">Key Features:</h3>
          <ul>
            <li><strong>Real-time Preview:</strong> Live chart updates as configuration changes</li>
            <li><strong>Multiple Chart Types:</strong> Support for various visualization types</li>
            <li><strong>Color Customization:</strong> Built-in color picker and preset schemes</li>
            <li><strong>Data Source Management:</strong> Easy switching between datasets</li>
            <li><strong>Export Capabilities:</strong> Export charts and configurations</li>
            <li><strong>Responsive Design:</strong> Configurable responsive behavior</li>
          </ul>
          
          <h3 className="ihub-mt-3">Best Practices:</h3>
          <ul>
            <li>Provide clear visual feedback for configuration changes</li>
            <li>Use appropriate chart types for different data structures</li>
            <li>Implement proper error handling for invalid configurations</li>
            <li>Consider performance with large datasets</li>
            <li>Ensure accessibility with proper ARIA labels</li>
            <li>Test exported configurations across different environments</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ChartConfiguratorExamples;
```

## 🔗 Related Components

- [InstinctHubChart](./InstinctHubChart.md) - Main chart component
- [InstinctHubChartDashboard](./InstinctHubChartDashboard.md) - Chart dashboard component
- [ColorPicker](./ColorPicker.md) - Color picker component
- [Dropdown](./Dropdown.md) - Dropdown component for selections
- [ToggleButton](./ToggleButton.md) - Toggle button component

