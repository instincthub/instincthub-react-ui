"use client";
import React, { useState } from "react";
import StatusIcon, { StatusType, IconSize, GetSuccessFailedIcon } from "../../../../components/ui/StatusIcon";

const StatusIconExample: React.FC = () => {
  const [currentExample, setCurrentExample] = useState<string>("basic");
  const [clickedIcon, setClickedIcon] = useState<string>("");
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [selectedSize, setSelectedSize] = useState<IconSize>("medium");
  const [customColor, setCustomColor] = useState("#000000");

  const allStatuses: StatusType[] = [
    "success", "error", "warning", "info", 
    "pending", "loading", "question", "check", "close"
  ];

  const allSizes: IconSize[] = ["small", "medium", "large", "inherit"];

  const statusDescriptions = {
    success: "Indicates successful operations, completed tasks, or positive states",
    error: "Shows errors, failures, or critical issues that need attention", 
    warning: "Warns about potential issues or actions that need caution",
    info: "Provides informational content or neutral status updates",
    pending: "Shows items waiting for action or in queue for processing",
    loading: "Indicates active processing or data being loaded",
    question: "Represents help, documentation, or items needing clarification",
    check: "Simple checkmark for basic confirmation or selection",
    close: "Close or cancel action, typically for dismissible elements"
  };

  const useCase = {
    success: ["Form submissions", "API responses", "Task completion", "Validation passed"],
    error: ["Form validation errors", "API failures", "System errors", "Authentication issues"],
    warning: ["Unsaved changes", "Approaching limits", "Deprecated features", "Non-critical issues"],
    info: ["Tooltips", "Help sections", "Status updates", "General information"],
    pending: ["Queue items", "Approval workflows", "Background tasks", "Scheduled actions"],
    loading: ["Data fetching", "File uploads", "Processing states", "Async operations"],
    question: ["Help buttons", "FAQ indicators", "Unknown states", "Documentation links"],
    check: ["Selection states", "Completed items", "Enabled features", "Approved items"],
    close: ["Modal close buttons", "Dismissible alerts", "Remove actions", "Cancel operations"]
  };

  const renderExample = () => {
    switch (currentExample) {
      case "basic":
        return (
          <div>
            <h3>Basic Status Icons</h3>
            <p>All available status types with default styling</p>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              marginTop: "20px" 
            }}>
              {allStatuses.map((status) => (
                <div 
                  key={status}
                  style={{
                    padding: "15px",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    textAlign: "center",
                    backgroundColor: "#fafafa"
                  }}
                >
                  <div style={{ marginBottom: "10px" }}>
                    <StatusIcon status={status} size={selectedSize} />
                  </div>
                  <div style={{ fontWeight: "bold", textTransform: "capitalize" }}>
                    {status}
                  </div>
                  <div style={{ 
                    fontSize: "0.8rem", 
                    color: "#666", 
                    marginTop: "5px",
                    lineHeight: "1.3"
                  }}>
                    {statusDescriptions[status]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "sizes":
        return (
          <div>
            <h3>Icon Sizes</h3>
            <p>Same icon in different sizes</p>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "30px",
              flexWrap: "wrap",
              marginTop: "20px" 
            }}>
              {allSizes.map((size) => (
                <div key={size} style={{ textAlign: "center" }}>
                  <StatusIcon status="success" size={size} />
                  <div style={{ marginTop: "10px", fontSize: "0.9rem" }}>
                    {size}
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: "30px" }}>
              <h4>Size Comparison Table</h4>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f5f5f5" }}>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>Size</th>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>Success</th>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>Error</th>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>Warning</th>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>Info</th>
                  </tr>
                </thead>
                <tbody>
                  {allSizes.map((size) => (
                    <tr key={size}>
                      <td style={{ padding: "15px", border: "1px solid #ddd", fontWeight: "bold" }}>
                        {size}
                      </td>
                      <td style={{ padding: "15px", border: "1px solid #ddd", textAlign: "center" }}>
                        <StatusIcon status="success" size={size} />
                      </td>
                      <td style={{ padding: "15px", border: "1px solid #ddd", textAlign: "center" }}>
                        <StatusIcon status="error" size={size} />
                      </td>
                      <td style={{ padding: "15px", border: "1px solid #ddd", textAlign: "center" }}>
                        <StatusIcon status="warning" size={size} />
                      </td>
                      <td style={{ padding: "15px", border: "1px solid #ddd", textAlign: "center" }}>
                        <StatusIcon status="info" size={size} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "interactive":
        return (
          <div>
            <h3>Interactive Status Icons</h3>
            <p>Icons with click handlers and hover effects</p>
            
            {clickedIcon && (
              <div style={{ 
                padding: "10px", 
                backgroundColor: "#e8f5e9", 
                borderRadius: "4px",
                marginBottom: "20px",
                color: "#2e7d32"
              }}>
                <strong>Clicked:</strong> {clickedIcon}
              </div>
            )}

            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "15px",
              marginTop: "20px" 
            }}>
              {allStatuses.map((status) => (
                <div 
                  key={status}
                  style={{
                    padding: "20px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "8px",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    backgroundColor: "#ffffff"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#2196F3";
                    e.currentTarget.style.backgroundColor = "#f8f9ff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e0e0e0";
                    e.currentTarget.style.backgroundColor = "#ffffff";
                  }}
                >
                  <StatusIcon 
                    status={status}
                    size="large"
                    onClick={() => setClickedIcon(`${status} icon clicked at ${new Date().toLocaleTimeString()}`)}
                    title={`Click to test ${status} status`}
                  />
                  <div style={{ 
                    marginTop: "10px", 
                    fontWeight: "bold", 
                    textTransform: "capitalize" 
                  }}>
                    {status}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#666" }}>
                    Click to interact
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "animations":
        return (
          <div>
            <h3>Animated Icons</h3>
            <p>Loading and pending states with animations</p>
            
            <div style={{ marginBottom: "20px" }}>
              <label>
                <input
                  type="checkbox"
                  checked={animationsEnabled}
                  onChange={(e) => setAnimationsEnabled(e.target.checked)}
                  style={{ marginRight: "8px" }}
                />
                Enable Animations
              </label>
            </div>

            <div style={{ 
              display: "flex", 
              gap: "40px", 
              alignItems: "center",
              flexWrap: "wrap",
              marginTop: "30px" 
            }}>
              <div style={{ textAlign: "center" }}>
                <StatusIcon 
                  status="loading" 
                  size="large" 
                  animated={animationsEnabled}
                />
                <div style={{ marginTop: "10px" }}>Loading State</div>
              </div>
              
              <div style={{ textAlign: "center" }}>
                <StatusIcon 
                  status="pending" 
                  size="large" 
                  animated={animationsEnabled}
                />
                <div style={{ marginTop: "10px" }}>Pending State</div>
              </div>

              <div style={{ textAlign: "center" }}>
                <StatusIcon 
                  status="info" 
                  size="large" 
                  animated={animationsEnabled}
                />
                <div style={{ marginTop: "10px" }}>Info (Pulse Effect)</div>
              </div>
            </div>

            <div style={{ marginTop: "40px" }}>
              <h4>Animation Use Cases</h4>
              <ul>
                <li><strong>Loading:</strong> Shows spinning animation while data is being fetched</li>
                <li><strong>Pending:</strong> Indicates items waiting in queue with subtle rotation</li>
                <li><strong>Other Icons:</strong> Can have hover effects or pulse animations when needed</li>
              </ul>
            </div>
          </div>
        );

      case "customization":
        return (
          <div>
            <h3>Custom Colors & Styling</h3>
            <p>Override default colors and add custom styling</p>
            
            <div style={{ marginBottom: "30px" }}>
              <label style={{ display: "block", marginBottom: "10px" }}>
                Custom Color:
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  style={{ marginLeft: "10px" }}
                />
                <span style={{ marginLeft: "10px", color: customColor }}>
                  {customColor}
                </span>
              </label>
            </div>

            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px" 
            }}>
              {["success", "error", "warning", "info"].map((status) => (
                <div key={status} style={{ textAlign: "center" }}>
                  <div style={{ marginBottom: "15px" }}>
                    <div style={{ marginBottom: "10px" }}>Default Color:</div>
                    <StatusIcon status={status as StatusType} size="large" />
                  </div>
                  <div>
                    <div style={{ marginBottom: "10px" }}>Custom Color:</div>
                    <StatusIcon 
                      status={status as StatusType}
                      size="large"
                      color={customColor}
                    />
                  </div>
                  <div style={{ 
                    marginTop: "10px", 
                    textTransform: "capitalize",
                    fontWeight: "bold"
                  }}>
                    {status}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "40px" }}>
              <h4>Custom Styling Examples</h4>
              <div style={{ display: "flex", gap: "30px", alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ textAlign: "center" }}>
                  <StatusIcon 
                    status="success"
                    size="large"
                    style={{ 
                      backgroundColor: "#e8f5e9",
                      borderRadius: "50%",
                      padding: "10px"
                    }}
                  />
                  <div>With Background</div>
                </div>
                
                <div style={{ textAlign: "center" }}>
                  <StatusIcon 
                    status="warning"
                    size="large"
                    style={{ 
                      border: "2px solid #ff9800",
                      borderRadius: "4px",
                      padding: "8px"
                    }}
                  />
                  <div>With Border</div>
                </div>
                
                <div style={{ textAlign: "center" }}>
                  <StatusIcon 
                    status="info"
                    size="large"
                    style={{ 
                      filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))"
                    }}
                  />
                  <div>With Shadow</div>
                </div>
              </div>
            </div>
          </div>
        );

      case "use-cases":
        return (
          <div>
            <h3>Real-World Use Cases</h3>
            <p>Practical examples of how to use each status type</p>
            
            {Object.entries(useCase).map(([status, cases]) => (
              <div key={status} style={{ 
                marginBottom: "30px",
                padding: "20px",
                border: "1px solid #e0e0e0",
                borderRadius: "8px"
              }}>
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  marginBottom: "15px" 
                }}>
                  <StatusIcon status={status as StatusType} size="medium" />
                  <h4 style={{ 
                    marginLeft: "10px", 
                    textTransform: "capitalize",
                    margin: 0
                  }}>
                    {status}
                  </h4>
                </div>
                <div style={{ marginBottom: "10px", fontSize: "0.9rem", color: "#666" }}>
                  {statusDescriptions[status as keyof typeof statusDescriptions]}
                </div>
                <div>
                  <strong>Common Use Cases:</strong>
                  <ul style={{ marginTop: "10px" }}>
                    {cases.map((usecase, index) => (
                      <li key={index} style={{ marginBottom: "5px" }}>
                        {usecase}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        );

      case "backward-compatibility":
        return (
          <div>
            <h3>Backward Compatibility</h3>
            <p>The original GetSuccessFailedIcon function is still supported</p>
            
            <div style={{ 
              padding: "20px", 
              backgroundColor: "#fff3e0", 
              borderRadius: "8px",
              marginBottom: "20px"
            }}>
              <strong>Note:</strong> The GetSuccessFailedIcon function is deprecated. 
              Use the new StatusIcon component for better flexibility and features.
            </div>

            <div style={{ marginTop: "30px" }}>
              <h4>Old API (Still Works)</h4>
              <div style={{ 
                display: "flex", 
                gap: "40px", 
                alignItems: "center",
                marginBottom: "20px" 
              }}>
                <div style={{ textAlign: "center" }}>
                  {GetSuccessFailedIcon(true)}
                  <div style={{ marginTop: "10px", fontSize: "0.9rem" }}>
                    GetSuccessFailedIcon(true)
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  {GetSuccessFailedIcon(false)}
                  <div style={{ marginTop: "10px", fontSize: "0.9rem" }}>
                    GetSuccessFailedIcon(false)
                  </div>
                </div>
              </div>

              <h4>New API (Recommended)</h4>
              <div style={{ 
                display: "flex", 
                gap: "40px", 
                alignItems: "center" 
              }}>
                <div style={{ textAlign: "center" }}>
                  <StatusIcon status="success" />
                  <div style={{ marginTop: "10px", fontSize: "0.9rem" }}>
                    {'<StatusIcon status="success" />'}
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <StatusIcon status="error" />
                  <div style={{ marginTop: "10px", fontSize: "0.9rem" }}>
                    {'<StatusIcon status="error" />'}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "30px" }}>
              <h4>Migration Guide</h4>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f5f5f5" }}>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>Old Code</th>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>New Code</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #ddd", fontFamily: "monospace" }}>
                      GetSuccessFailedIcon(true)
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd", fontFamily: "monospace" }}>
                      {'<StatusIcon status="success" />'}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #ddd", fontFamily: "monospace" }}>
                      GetSuccessFailedIcon(false)
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd", fontFamily: "monospace" }}>
                      {'<StatusIcon status="error" />'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="ihub-py-5">
      <h1>StatusIcon Examples</h1>
      <p>
        Enhanced status icon component with multiple status types, sizes, and customization options.
        Replaces the original GetSuccessFailedIcon with more flexibility and features.
      </p>

      <div
        className="ihub-d-flex ihub-py-4"
        style={{ gap: "12px", flexWrap: "wrap" }}
      >
        {/* Example Selection Buttons */}
        <button
          className={`${
            currentExample === "basic" ? "ihub-important-btn" : "ihub-outlined-btn"
          }`}
          onClick={() => setCurrentExample("basic")}
        >
          Basic Icons
        </button>

        <button
          className={`${
            currentExample === "sizes" ? "ihub-important-btn" : "ihub-outlined-btn"
          }`}
          onClick={() => setCurrentExample("sizes")}
        >
          Size Variations
        </button>

        <button
          className={`${
            currentExample === "interactive" ? "ihub-important-btn" : "ihub-outlined-btn"
          }`}
          onClick={() => setCurrentExample("interactive")}
        >
          Interactive
        </button>

        <button
          className={`${
            currentExample === "animations" ? "ihub-important-btn" : "ihub-outlined-btn"
          }`}
          onClick={() => setCurrentExample("animations")}
        >
          Animations
        </button>

        <button
          className={`${
            currentExample === "customization" ? "ihub-important-btn" : "ihub-outlined-btn"
          }`}
          onClick={() => setCurrentExample("customization")}
        >
          Customization
        </button>

        <button
          className={`${
            currentExample === "use-cases" ? "ihub-important-btn" : "ihub-outlined-btn"
          }`}
          onClick={() => setCurrentExample("use-cases")}
        >
          Use Cases
        </button>

        <button
          className={`${
            currentExample === "backward-compatibility" ? "ihub-important-btn" : "ihub-outlined-btn"
          }`}
          onClick={() => setCurrentExample("backward-compatibility")}
        >
          Migration
        </button>
      </div>

      {/* Size Control for Basic Example */}
      {currentExample === "basic" && (
        <div style={{ marginBottom: "20px" }}>
          <label style={{ marginRight: "10px" }}>Icon Size:</label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value as IconSize)}
            style={{ padding: "5px 10px" }}
          >
            {allSizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      )}

      {/* Live Example */}
      <div className="ihub-mt-4">
        <div 
          style={{ 
            border: "2px dashed #ddd", 
            borderRadius: "8px", 
            padding: "30px",
            marginBottom: "30px",
            minHeight: "400px",
            backgroundColor: "#fafafa"
          }}
        >
          {renderExample()}
        </div>
      </div>

      {/* Features Overview */}
      <div className="ihub-mt-5">
        <h3>Key Features</h3>
        
        <h4>📦 Status Types</h4>
        <ul>
          <li><strong>success:</strong> CheckCircleIcon - For successful operations</li>
          <li><strong>error:</strong> ErrorIcon - For errors and failures</li>
          <li><strong>warning:</strong> WarningIcon - For warnings and cautions</li>
          <li><strong>info:</strong> InfoIcon - For informational content</li>
          <li><strong>pending:</strong> PendingIcon - For items waiting in queue</li>
          <li><strong>loading:</strong> CircularProgress - For active processing</li>
          <li><strong>question:</strong> HelpIcon - For help and documentation</li>
          <li><strong>check:</strong> CheckIcon - For simple confirmations</li>
          <li><strong>close:</strong> CloseIcon - For close/cancel actions</li>
        </ul>

        <h4>🎨 Customization Options</h4>
        <ul>
          <li><strong>Size Control:</strong> small, medium, large, inherit</li>
          <li><strong>Custom Colors:</strong> Override default colors</li>
          <li><strong>Custom Styling:</strong> Add borders, backgrounds, shadows</li>
          <li><strong>CSS Classes:</strong> Apply custom CSS classes</li>
          <li><strong>Animations:</strong> Enable spinning or pulse effects</li>
        </ul>

        <h4>⚡ Interactive Features</h4>
        <ul>
          <li><strong>Click Handlers:</strong> Add onClick functionality</li>
          <li><strong>Keyboard Navigation:</strong> Accessible with Tab and Enter</li>
          <li><strong>Tooltips:</strong> Custom title text on hover</li>
          <li><strong>ARIA Labels:</strong> Screen reader friendly</li>
          <li><strong>Focus Management:</strong> Proper focus indicators</li>
        </ul>

        <h4>🔄 Backward Compatibility</h4>
        <ul>
          <li><strong>GetSuccessFailedIcon:</strong> Original function still works</li>
          <li><strong>Gradual Migration:</strong> Can upgrade components incrementally</li>
          <li><strong>Same Styling:</strong> Maintains existing visual appearance</li>
          <li><strong>No Breaking Changes:</strong> Existing code continues to work</li>
        </ul>
      </div>
    </div>
  );
};

export default StatusIconExample;