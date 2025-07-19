# PageLoading

**Category:** Forms | **Type:** component

Versatile loading indicator component for displaying loading states across various scenarios including page transitions, data fetching, form submissions, and content loading.

## 🏷️ Tags

`forms`, `loading`, `spinner`, `ui`

```tsx
"use client";
import React, { useState, useEffect } from "react";
import {
  PageLoading,
  LoadingAnimate,
  SubmitButton,
  InputText,
  MultiPurposeModal,
} from "@instincthub/react-ui";

/**
 * Comprehensive PageLoading examples demonstrating various loading states,
 * spinner types, skeleton screens, progress indicators, and practical use cases
 */
const PageLoadingExamples = () => {
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [users, setUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  // Simulate form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Simulate page loading
  const simulatePageLoad = () => {
    setIsPageLoading(true);
    setTimeout(() => {
      setIsPageLoading(false);
    }, 3000);
  };

  // Simulate data fetching
  const simulateDataFetch = async () => {
    setIsDataLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setUsers([
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com" },
      ]);
    } finally {
      setIsDataLoading(false);
    }
  };

  // Simulate form submission with progress
  const simulateFormSubmission = async () => {
    setIsFormSubmitting(true);
    setSubmitStatus(0); // Loading state
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus(2); // Success state
      setTimeout(() => {
        setSubmitStatus(1); // Reset to ready
        setProgress(0);
        setFormData({ name: "", email: "", message: "" });
      }, 2000);
    } catch (error) {
      setSubmitStatus(3); // Error state
      setTimeout(() => setSubmitStatus(1), 3000);
    } finally {
      setIsFormSubmitting(false);
    }
  };

  // Simulate search with debouncing
  useEffect(() => {
    if (searchQuery.length > 2) {
      setSearchLoading(true);
      const timeoutId = setTimeout(() => {
        setSearchLoading(false);
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>Loading States & Indicators Examples</h1>

      {/* Button Controls */}
      <div
        className="ihub-d-flex ihub-py-4"
        style={{ gap: "15px", flexWrap: "wrap" }}
      >
        <button
          className="ihub-primary-btn"
          onClick={simulatePageLoad}
          disabled={isPageLoading}
        >
          {isPageLoading ? "Loading..." : "Simulate Page Load"}
        </button>

        <button
          className="ihub-outlined-btn"
          onClick={simulateDataFetch}
          disabled={isDataLoading}
        >
          {isDataLoading ? "Fetching..." : "Fetch User Data"}
        </button>

        <button
          className="ihub-important-btn"
          onClick={() => setIsModalOpen(true)}
        >
          Open Loading Modal
        </button>
      </div>

      {/* 1. Basic Page Loading */}
      <section className="ihub-mb-5">
        <h2>1. Basic Page Loading</h2>
        <p>Simple loading indicator with custom label:</p>
        {isPageLoading && <PageLoading labels="Please wait" />}
        
        <div className="ihub-mt-3">
          <h4>Code Example:</h4>
          <pre className="ihub-code-block">
{`<PageLoading labels="Please wait" />`}
          </pre>
        </div>
      </section>

      {/* 2. Animated Loading Spinner */}
      <section className="ihub-mb-5">
        <h2>2. Animated Loading Spinner</h2>
        <p>Ellipsis animation for smoother loading experience:</p>
        <div style={{ maxWidth: "300px", margin: "20px 0" }}>
          <LoadingAnimate />
        </div>
        
        <div className="ihub-mt-3">
          <h4>Code Example:</h4>
          <pre className="ihub-code-block">
{`import { LoadingAnimate } from '@instincthub/react-ui';

<LoadingAnimate />`}
          </pre>
        </div>
      </section>

      {/* 3. Data Loading with Skeleton */}
      <section className="ihub-mb-5">
        <h2>3. Data Loading with Content Placeholder</h2>
        <p>Loading state while fetching data from API:</p>
        
        <div className="ihub-card ihub-p-4">
          <h4>User List</h4>
          {isDataLoading ? (
            <div>
              <PageLoading labels="Fetching user data" />
              <div className="ihub-mt-3">
                {/* Skeleton placeholders */}
                {[1, 2, 3].map((item) => (
                  <div key={item} className="ihub-skeleton-item ihub-mb-2 ihub-p-3" style={{
                    background: "#f0f0f0",
                    borderRadius: "4px",
                    height: "60px",
                    animation: "pulse 1.5s ease-in-out infinite"
                  }}>
                    <div style={{
                      background: "#ddd",
                      height: "16px",
                      width: "70%",
                      borderRadius: "4px",
                      marginBottom: "8px"
                    }}></div>
                    <div style={{
                      background: "#ddd",
                      height: "14px",
                      width: "50%",
                      borderRadius: "4px"
                    }}></div>
                  </div>
                ))}
              </div>
            </div>
          ) : users.length > 0 ? (
            <div>
              {users.map((user) => (
                <div key={user.id} className="ihub-border ihub-p-3 ihub-mb-2">
                  <h5>{user.name}</h5>
                  <p>{user.email}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No users loaded. Click "Fetch User Data" to load.</p>
          )}
        </div>
      </section>

      {/* 4. Form Submission with Progress */}
      <section className="ihub-mb-5">
        <h2>4. Form Submission with Progress Indicator</h2>
        <p>Loading states during form submission with progress tracking:</p>
        
        <div className="ihub-card ihub-p-4" style={{ maxWidth: "500px" }}>
          <form onSubmit={(e) => {
            e.preventDefault();
            simulateFormSubmission();
          }}>
            <InputText
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={isFormSubmitting}
              required
            />
            
            <InputText
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isFormSubmitting}
              required
            />
            
            <div className="ihub-mb-3">
              <label className="ihub-form-label">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="ihub-form-control"
                rows={4}
                disabled={isFormSubmitting}
                required
              />
            </div>
            
            {/* Progress indicator during submission */}
            {isFormSubmitting && (
              <div className="ihub-mb-3">
                <div className="ihub-progress-container">
                  <div className="ihub-progress-bar" style={{
                    background: "#e0e0e0",
                    height: "8px",
                    borderRadius: "4px",
                    overflow: "hidden"
                  }}>
                    <div style={{
                      background: "var(--primary-color, #007bff)",
                      height: "100%",
                      width: `${progress}%`,
                      transition: "width 0.3s ease",
                      borderRadius: "4px"
                    }}></div>
                  </div>
                  <p className="ihub-text-center ihub-mt-2">Uploading... {progress}%</p>
                </div>
              </div>
            )}
            
            <SubmitButton
              label="Submit Form"
              status={submitStatus}
              type="submit"
              disabled={isFormSubmitting}
            />
          </form>
        </div>
      </section>

      {/* 5. Search with Loading Indicator */}
      <section className="ihub-mb-5">
        <h2>5. Search with Real-time Loading</h2>
        <p>Loading indicator for search operations:</p>
        
        <div className="ihub-search-container" style={{ maxWidth: "400px" }}>
          <div className="ihub-input-group">
            <InputText
              label="Search Users"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type to search..."
            />
            {searchLoading && (
              <div className="ihub-search-loading-indicator">
                <div className="ihub-loading-dot"></div>
                <span>Searching...</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. Different Loading Variants */}
      <section className="ihub-mb-5">
        <h2>6. Loading Variants & Styles</h2>
        <p>Various loading styles for different contexts:</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <h5>Minimal Loading</h5>
            <PageLoading />
          </div>
          
          <div className="ihub-col-md-4">
            <h5>With Custom Message</h5>
            <PageLoading labels="Processing your request" />
          </div>
          
          <div className="ihub-col-md-4">
            <h5>Centered Spinner</h5>
            <div className="ihub-text-center ihub-py-4">
              <div className="ihub-loading-spinner"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal with Loading States */}
      <MultiPurposeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Loading States in Modal"
        size="medium"
        showFooter={true}
        footerContent={
          <button
            className="ihub-outlined-btn"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
        }
      >
        <div>
          <h4>Modal Content Loading</h4>
          <p>Demonstrating loading states within modals:</p>
          
          <div className="ihub-mt-3">
            <PageLoading labels="Loading modal content" />
          </div>
          
          <div className="ihub-mt-4">
            <LoadingAnimate />
          </div>
        </div>
      </MultiPurposeModal>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .ihub-code-block {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 4px;
          padding: 12px;
          font-family: monospace;
          font-size: 14px;
          overflow-x: auto;
        }
        
        .ihub-search-loading-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
          font-size: 14px;
          color: #666;
        }
        
        .ihub-loading-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid #e3e3e3;
          border-top: 2px solid #007bff;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PageLoadingExamples;
```

## 🚀 Props & API

### PageLoading Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `labels` | `string` | `''` | Custom text to display before "Loading..." |

### LoadingAnimate Props

The `LoadingAnimate` component doesn't accept props and displays an ellipsis animation.

## 📋 Use Cases

### 1. **Page Transitions**
```tsx
{isNavigating && <PageLoading labels="Navigating to" />}
```

### 2. **Data Fetching**
```tsx
{isFetching ? (
  <PageLoading labels="Fetching data" />
) : (
  <DataComponent data={data} />
)}
```

### 3. **Form Submissions**
```tsx
<SubmitButton 
  label="Save Changes" 
  status={isSubmitting ? 0 : 1} 
/>
```

### 4. **Modal Content Loading**
```tsx
<MultiPurposeModal isOpen={isOpen}>
  {isLoading ? (
    <LoadingAnimate />
  ) : (
    <ModalContent />
  )}
</MultiPurposeModal>
```

### 5. **Search Operations**
```tsx
<InputText 
  value={searchTerm}
  onChange={handleSearch}
/>
{isSearching && <PageLoading labels="Searching" />}
```

## 🎨 Styling & Customization

### Available CSS Classes

- `.ihub-loading` - Main loading container
- `.react_loading` - Animated loading container
- `.lds-ellipsis` - Ellipsis animation dots
- `.ihub-loading-spinner` - Spinner element
- `.ihub-table-loading-overlay` - Overlay loading state

### Custom Styling Example

```css
.custom-loading {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
}

.custom-loading .lds-ellipsis div {
  background: #your-brand-color;
}
```

## ⚡ Performance Tips

1. **Conditional Rendering**: Only render loading components when actually loading
2. **Skeleton Screens**: Use skeleton placeholders for better UX
3. **Progress Indicators**: Show progress for long operations
4. **Debounced Loading**: Prevent flickering on fast operations
5. **Lazy Loading**: Load content progressively

## 🔗 Related Components

- [SubmitButton](./SubmitButton.md) - Button with built-in loading states
- [MultiPurposeModal](./MultiPurposeModal.md) - Modal component with loading support
- [IHubTable](./IHubTable.md) - Table with loading states
- [Pagination](./Pagination.md) - Pagination with loading indicators
- [AnimatedBox](./AnimatedBox.md) - Animated container component

