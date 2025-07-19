# LoadingAnimate

**Category:** Theme | **Type:** component

Loading animation component with ellipsis dots animation

## 🏷️ Tags

`theme`, `loading`, `animation`, `spinner`

```tsx
"use client";
import React, { useState, useEffect } from "react";
import { LoadingAnimate, PageLoading, InputText, SubmitButton } from "@instincthub/react-ui";

/**
 * Example component demonstrating various ways to use LoadingAnimate
 */
const LoadingAnimateExamples = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isContentLoading, setIsContentLoading] = useState<boolean>(false);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [isDataFetching, setIsDataFetching] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);

  // Simulate data fetching
  const fetchData = async () => {
    setIsDataFetching(true);
    // Simulate API call delay
    setTimeout(() => {
      setData([
        { id: 1, name: "Item 1", status: "active" },
        { id: 2, name: "Item 2", status: "pending" },
        { id: 3, name: "Item 3", status: "completed" }
      ]);
      setIsDataFetching(false);
    }, 2000);
  };

  // Simulate form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    // Simulate form processing
    setTimeout(() => {
      setFormSubmitting(false);
      alert("Form submitted successfully!");
    }, 3000);
  };

  // Simulate button action
  const handleButtonAction = async () => {
    setIsButtonLoading(true);
    // Simulate processing
    setTimeout(() => {
      setIsButtonLoading(false);
      alert("Action completed!");
    }, 2000);
  };

  // Simulate content loading
  const loadContent = () => {
    setIsContentLoading(true);
    setTimeout(() => {
      setIsContentLoading(false);
    }, 3000);
  };

  useEffect(() => {
    // Simulate initial page load
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>Loading Animation Examples</h1>
      
      <div className="ihub-d-flex ihub-py-4" style={{ gap: "20px", flexWrap: "wrap" }}>
        {/* Basic Loading Demo Button */}
        <button
          className="ihub-primary-btn"
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 3000);
          }}
        >
          Show Basic Loading (3s)
        </button>

        {/* Content Loading Demo */}
        <button
          className="ihub-outlined-btn"
          onClick={loadContent}
        >
          Load Content with Animation
        </button>

        {/* Data Fetching Demo */}
        <button
          className="ihub-success-btn"
          onClick={fetchData}
          disabled={isDataFetching}
        >
          {isDataFetching ? "Fetching..." : "Fetch Data"}
        </button>

        {/* Action Button with Loading */}
        <button
          className="ihub-important-btn"
          onClick={handleButtonAction}
          disabled={isButtonLoading}
        >
          {isButtonLoading ? "Processing..." : "Process Action"}
        </button>
      </div>

      {/* 1. Basic LoadingAnimate - Full Screen */}
      {isLoading && (
        <div style={{ 
          position: "fixed", 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: "rgba(255,255,255,0.9)", 
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div>
            <LoadingAnimate />
            <p style={{ textAlign: "center", marginTop: "20px" }}>Loading page content...</p>
          </div>
        </div>
      )}

      {/* 2. Inline Content Loading */}
      <div className="ihub-card ihub-mt-4">
        <h3>Content Section</h3>
        {isContentLoading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <LoadingAnimate />
            <p>Loading content...</p>
          </div>
        ) : (
          <div>
            <p>This is the loaded content. Click "Load Content with Animation" to see the loading state.</p>
            <p>The LoadingAnimate component provides a smooth ellipsis dots animation perfect for indicating loading states.</p>
          </div>
        )}
      </div>

      {/* 3. Data Table with Loading */}
      <div className="ihub-card ihub-mt-4">
        <h3>Data Table Example</h3>
        {isDataFetching ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <LoadingAnimate />
            <p>Fetching data from server...</p>
          </div>
        ) : data.length > 0 ? (
          <table className="ihub-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available. Click "Fetch Data" to load some data.</p>
        )}
      </div>

      {/* 4. Form with Loading Submit Button */}
      <div className="ihub-card ihub-mt-4">
        <h3>Form with Loading Submission</h3>
        <form onSubmit={handleFormSubmit}>
          <InputText
            label="Name"
            id="name"
            name="name"
            type="text"
            className="ihub-input ihub-mb-3"
            placeholder="Enter your name"
          />
          
          <InputText
            label="Email"
            id="email"
            name="email"
            type="email"
            className="ihub-input ihub-mb-3"
            placeholder="Enter your email"
          />

          {formSubmitting ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <LoadingAnimate />
              <p>Submitting form...</p>
            </div>
          ) : (
            <SubmitButton 
              label="Submit Form"
              type="submit"
              status={1}
              className="ihub-important-btn"
            />
          )}
        </form>
      </div>

      {/* 5. Custom Styled Loading */}
      <div className="ihub-card ihub-mt-4">
        <h3>Custom Styled Loading Examples</h3>
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <div style={{ textAlign: "center", padding: "20px", border: "1px solid #eee", borderRadius: "8px" }}>
              <h5>Small Loading</h5>
              <div style={{ transform: "scale(0.5)" }}>
                <LoadingAnimate />
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-4">
            <div style={{ textAlign: "center", padding: "20px", border: "1px solid #eee", borderRadius: "8px" }}>
              <h5>Normal Loading</h5>
              <LoadingAnimate />
            </div>
          </div>
          
          <div className="ihub-col-md-4">
            <div style={{ textAlign: "center", padding: "20px", border: "1px solid #eee", borderRadius: "8px" }}>
              <h5>Large Loading</h5>
              <div style={{ transform: "scale(1.5)" }}>
                <LoadingAnimate />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Loading States for Different Scenarios */}
      <div className="ihub-card ihub-mt-4">
        <h3>Loading State Variations</h3>
        <div className="ihub-row">
          {/* Card Loading */}
          <div className="ihub-col-md-6">
            <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px", minHeight: "200px" }}>
              <h5>Card Loading State</h5>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "120px" }}>
                <div style={{ textAlign: "center" }}>
                  <LoadingAnimate />
                  <p style={{ fontSize: "14px", marginTop: "10px" }}>Loading card content...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Skeleton-like Loading */}
          <div className="ihub-col-md-6">
            <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px", minHeight: "200px" }}>
              <h5>Page Section Loading</h5>
              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <LoadingAnimate />
                <p style={{ fontSize: "14px", marginTop: "10px" }}>Preparing content...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Button with Inline Loading */}
      <div className="ihub-card ihub-mt-4">
        <h3>Button Loading States</h3>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", alignItems: "center" }}>
          {/* Normal Button */}
          <button className="ihub-primary-btn">
            Normal Button
          </button>

          {/* Button with Loading Text */}
          <button className="ihub-primary-btn" disabled>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <div style={{ transform: "scale(0.3)", marginTop: "-10px" }}>
                <LoadingAnimate />
              </div>
              Loading...
            </span>
          </button>

          {/* Action Button */}
          <button 
            className="ihub-success-btn" 
            onClick={handleButtonAction}
            disabled={isButtonLoading}
          >
            {isButtonLoading ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <div style={{ transform: "scale(0.3)", marginTop: "-10px" }}>
                  <LoadingAnimate />
                </div>
                Processing...
              </span>
            ) : (
              "Process Action"
            )}
          </button>
        </div>
      </div>

      {/* 8. Usage with PageLoading Component */}
      <div className="ihub-card ihub-mt-4">
        <h3>Alternative: PageLoading Component</h3>
        <p>For simple text-based loading, you can also use the PageLoading component:</p>
        <div style={{ border: "1px solid #eee", padding: "20px", borderRadius: "8px" }}>
          <PageLoading labels="Data" />
        </div>
        <p style={{ fontSize: "14px", marginTop: "10px", color: "#666" }}>
          PageLoading is simpler but less visually appealing than LoadingAnimate
        </p>
      </div>

      {/* 9. Best Practices */}
      <div className="ihub-card ihub-mt-4">
        <h3>Best Practices & Tips</h3>
        <ul style={{ lineHeight: "1.8" }}>
          <li><strong>Use for async operations:</strong> Perfect for API calls, form submissions, and content loading</li>
          <li><strong>Provide context:</strong> Always include descriptive text explaining what's loading</li>
          <li><strong>Scale appropriately:</strong> Use CSS transform to resize for different contexts</li>
          <li><strong>Center alignment:</strong> The component works best when centered in its container</li>
          <li><strong>Overlay for full page:</strong> Use with backdrop for full-page loading states</li>
          <li><strong>Disable interactions:</strong> Disable buttons/forms while loading is active</li>
          <li><strong>Consistent styling:</strong> The animation uses CSS variables for theming</li>
        </ul>
      </div>
    </div>
  );
};

export default LoadingAnimateExamples;
```

## 🔗 Related Components

- [PageLoading](./PageLoading.md) - Simple text-based loading component
- [SubmitButton](./SubmitButton.md) - Button with built-in loading states
- [DarkModeProvider](./DarkModeProvider.md) - Dark mode provider component
- [SessionProviders](./SessionProviders.md) - Session providers component

