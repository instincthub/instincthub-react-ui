# ModalWrapper

**Category:** Status | **Type:** component

A flexible and accessible modal wrapper component with customizable sizes, proper focus management, and built-in accessibility features.

## 🏷️ Tags

`modal`, `dialog`, `overlay`, `popup`, `wrapper`, `accessibility`, `responsive`

```tsx
"use client";
import React, { useState } from "react";
import { ModalWrapper } from "@instincthub/react-ui";

/**
 * Example component demonstrating various ways to use the ModalWrapper
 */
const ModalWrapperExamples = () => {
  const [currentExample, setCurrentExample] = useState<string>("basic");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const renderExample = () => {
    switch (currentExample) {
      case "basic":
        return (
          <>
            <button 
              onClick={openModal}
              className="ihub-important-btn"
            >
              Open Basic Modal
            </button>
            <ModalWrapper
              isOpen={isModalOpen}
              onClose={closeModal}
              title="Basic Modal"
              size="medium"
            >
              <div style={{ padding: "20px" }}>
                <h3>Welcome to the Modal!</h3>
                <p>This is a basic modal with a title and close functionality.</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div style={{ marginTop: "20px" }}>
                  <button onClick={closeModal} className="ihub-important-btn">
                    Close Modal
                  </button>
                </div>
              </div>
            </ModalWrapper>
          </>
        );

      case "sizes":
        const [selectedSize, setSelectedSize] = useState<"small" | "medium" | "large" | "full">("small");
        const [sizeModalOpen, setSizeModalOpen] = useState<boolean>(false);

        return (
          <>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {(["small", "medium", "large", "full"] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeModalOpen(true);
                  }}
                  className="ihub-outlined-btn"
                  style={{ textTransform: "capitalize" }}
                >
                  Open {size} Modal
                </button>
              ))}
            </div>
            <ModalWrapper
              isOpen={sizeModalOpen}
              onClose={() => setSizeModalOpen(false)}
              title={`${selectedSize.charAt(0).toUpperCase() + selectedSize.slice(1)} Modal`}
              size={selectedSize}
            >
              <div style={{ padding: "20px" }}>
                <h3>This is a {selectedSize} modal</h3>
                <p>Modal size: <strong>{selectedSize}</strong></p>
                <div style={{ marginBottom: "20px" }}>
                  <h4>Size Details:</h4>
                  <ul>
                    <li><strong>Small:</strong> 400px width - Perfect for confirmations</li>
                    <li><strong>Medium:</strong> 600px width - Good for forms and content</li>
                    <li><strong>Large:</strong> 900px width - Ideal for detailed content</li>
                    <li><strong>Full:</strong> 90vw width - Takes most of the viewport</li>
                  </ul>
                </div>
                <button 
                  onClick={() => setSizeModalOpen(false)} 
                  className="ihub-important-btn"
                >
                  Close
                </button>
              </div>
            </ModalWrapper>
          </>
        );

      case "confirmation":
        const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
        const [userAction, setUserAction] = useState<string>("");

        const handleConfirm = (action: string) => {
          setUserAction(`You ${action} the action!`);
          setConfirmModalOpen(false);
          setTimeout(() => setUserAction(""), 3000);
        };

        return (
          <>
            <div>
              <button 
                onClick={() => setConfirmModalOpen(true)}
                className="ihub-danger-btn"
              >
                Delete Item
              </button>
              {userAction && (
                <div style={{ 
                  marginTop: "10px", 
                  padding: "10px", 
                  backgroundColor: "#d4edda", 
                  color: "#155724",
                  borderRadius: "4px" 
                }}>
                  {userAction}
                </div>
              )}
            </div>
            <ModalWrapper
              isOpen={confirmModalOpen}
              onClose={() => setConfirmModalOpen(false)}
              title="Confirm Deletion"
              size="small"
            >
              <div style={{ padding: "20px", textAlign: "center" }}>
                <div style={{ fontSize: "48px", marginBottom: "20px" }}>⚠️</div>
                <h3>Are you sure?</h3>
                <p>This action cannot be undone. The item will be permanently deleted.</p>
                <div style={{ 
                  display: "flex", 
                  gap: "10px", 
                  justifyContent: "center",
                  marginTop: "30px" 
                }}>
                  <button 
                    onClick={() => handleConfirm("confirmed")}
                    className="ihub-danger-btn"
                  >
                    Yes, Delete
                  </button>
                  <button 
                    onClick={() => handleConfirm("canceled")}
                    className="ihub-outlined-btn"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </ModalWrapper>
          </>
        );

      case "form":
        const [formModalOpen, setFormModalOpen] = useState<boolean>(false);
        const [formData, setFormData] = useState({
          name: "",
          email: "",
          message: ""
        });

        const handleFormSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          alert(`Form submitted!\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
          setFormModalOpen(false);
          setFormData({ name: "", email: "", message: "" });
        };

        return (
          <>
            <button 
              onClick={() => setFormModalOpen(true)}
              className="ihub-important-btn"
            >
              Open Contact Form
            </button>
            <ModalWrapper
              isOpen={formModalOpen}
              onClose={() => setFormModalOpen(false)}
              title="Contact Us"
              size="medium"
            >
              <div style={{ padding: "20px" }}>
                <form onSubmit={handleFormSubmit}>
                  <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "14px"
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "14px"
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                      Message *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                      rows={4}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "14px",
                        resize: "vertical"
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                    <button
                      type="button"
                      onClick={() => setFormModalOpen(false)}
                      className="ihub-outlined-btn"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ihub-important-btn"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </ModalWrapper>
          </>
        );

      case "scrollable":
        const [scrollModalOpen, setScrollModalOpen] = useState<boolean>(false);

        return (
          <>
            <button 
              onClick={() => setScrollModalOpen(true)}
              className="ihub-important-btn"
            >
              Open Scrollable Content
            </button>
            <ModalWrapper
              isOpen={scrollModalOpen}
              onClose={() => setScrollModalOpen(false)}
              title="Long Content Modal"
              size="medium"
            >
              <div style={{ padding: "20px" }}>
                <h3>This modal has scrollable content</h3>
                <p>The modal body has a fixed height of 70vh and will scroll when content exceeds that height.</p>
                
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
                    <h4>Section {i + 1}</h4>
                    <p>
                      This is section {i + 1} of the scrollable content. Lorem ipsum dolor sit amet, 
                      consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et 
                      dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <ul>
                      <li>List item 1 for section {i + 1}</li>
                      <li>List item 2 for section {i + 1}</li>
                      <li>List item 3 for section {i + 1}</li>
                    </ul>
                  </div>
                ))}
                
                <div style={{ position: "sticky", bottom: 0, backgroundColor: "white", padding: "15px 0", borderTop: "1px solid #dee2e6" }}>
                  <button 
                    onClick={() => setScrollModalOpen(false)} 
                    className="ihub-important-btn"
                  >
                    Close Modal
                  </button>
                </div>
              </div>
            </ModalWrapper>
          </>
        );

      case "no-title":
        const [noTitleModalOpen, setNoTitleModalOpen] = useState<boolean>(false);

        return (
          <>
            <button 
              onClick={() => setNoTitleModalOpen(true)}
              className="ihub-important-btn"
            >
              Open Modal Without Title
            </button>
            <ModalWrapper
              isOpen={noTitleModalOpen}
              onClose={() => setNoTitleModalOpen(false)}
              size="small"
            >
              <div style={{ padding: "30px", textAlign: "center" }}>
                <div style={{ fontSize: "64px", marginBottom: "20px" }}>🎉</div>
                <h3 style={{ margin: "0 0 15px 0" }}>Success!</h3>
                <p>Your action was completed successfully.</p>
                <button 
                  onClick={() => setNoTitleModalOpen(false)} 
                  className="ihub-important-btn"
                  style={{ marginTop: "20px" }}
                >
                  Great!
                </button>
              </div>
            </ModalWrapper>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="ihub-py-5">
      <h1>ModalWrapper Examples</h1>
      <p>
        The ModalWrapper component provides a flexible and accessible modal solution 
        with multiple size options, proper focus management, and built-in accessibility features.
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
          Basic Modal
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
            currentExample === "confirmation" ? "ihub-important-btn" : "ihub-outlined-btn"
          }`}
          onClick={() => setCurrentExample("confirmation")}
        >
          Confirmation Dialog
        </button>

        <button
          className={`${
            currentExample === "form" ? "ihub-important-btn" : "ihub-outlined-btn"
          }`}
          onClick={() => setCurrentExample("form")}
        >
          Form Modal
        </button>

        <button
          className={`${
            currentExample === "scrollable" ? "ihub-important-btn" : "ihub-outlined-btn"
          }`}
          onClick={() => setCurrentExample("scrollable")}
        >
          Scrollable Content
        </button>

        <button
          className={`${
            currentExample === "no-title" ? "ihub-important-btn" : "ihub-outlined-btn"
          }`}
          onClick={() => setCurrentExample("no-title")}
        >
          No Title Modal
        </button>
      </div>

      {/* Example Description */}
      <div className="ihub-py-3">
        {currentExample === "basic" && (
          <div>
            <h3>Basic Modal</h3>
            <p>
              Simple modal with title, content, and close functionality.
              Demonstrates the core features and default behavior.
            </p>
            <ul>
              <li>Title bar with close button</li>
              <li>Scrollable content area</li>
              <li>Accessible modal implementation</li>
              <li>Click outside to close disabled (use close button)</li>
            </ul>
          </div>
        )}

        {currentExample === "sizes" && (
          <div>
            <h3>Size Variations</h3>
            <p>
              Demonstrates all four available modal sizes: small, medium, large, and full.
              Each size is optimized for different types of content.
            </p>
            <ul>
              <li><strong>Small (400px):</strong> Perfect for confirmations and alerts</li>
              <li><strong>Medium (600px):</strong> Good for forms and moderate content</li>
              <li><strong>Large (900px):</strong> Ideal for detailed content and tables</li>
              <li><strong>Full (90vw):</strong> Takes most viewport, for complex interfaces</li>
            </ul>
          </div>
        )}

        {currentExample === "confirmation" && (
          <div>
            <h3>Confirmation Dialog</h3>
            <p>
              A typical confirmation dialog pattern for destructive actions.
              Uses the small size for focused attention.
            </p>
            <ul>
              <li>Warning icon and messaging</li>
              <li>Primary and secondary action buttons</li>
              <li>Clear consequences explanation</li>
              <li>Confirmation feedback to user</li>
            </ul>
          </div>
        )}

        {currentExample === "form" && (
          <div>
            <h3>Form Modal</h3>
            <p>
              Modal containing a complete form with validation and submission.
              Demonstrates form handling within modal context.
            </p>
            <ul>
              <li>Form fields with validation</li>
              <li>Proper form submission handling</li>
              <li>Cancel and submit actions</li>
              <li>Form state management</li>
            </ul>
          </div>
        )}

        {currentExample === "scrollable" && (
          <div>
            <h3>Scrollable Content</h3>
            <p>
              Shows how the modal handles long content with vertical scrolling.
              Content area has a fixed height of 70vh.
            </p>
            <ul>
              <li>Fixed height content area (70vh)</li>
              <li>Smooth scrolling with custom scrollbars</li>
              <li>Sticky footer buttons</li>
              <li>Multiple sections of content</li>
            </ul>
          </div>
        )}

        {currentExample === "no-title" && (
          <div>
            <h3>Modal Without Title</h3>
            <p>
              Demonstrates a modal without a title bar, useful for 
              notifications, success messages, or custom designs.
            </p>
            <ul>
              <li>No title bar (title prop omitted)</li>
              <li>Close button still available</li>
              <li>Custom content layout</li>
              <li>Success message pattern</li>
            </ul>
          </div>
        )}
      </div>

      {/* Live Example */}
      <div className="ihub-mt-4">
        <h3>Live Example</h3>
        <div 
          style={{ 
            border: "2px dashed #ddd", 
            borderRadius: "8px", 
            padding: "20px",
            marginBottom: "20px"
          }}
        >
          {renderExample()}
        </div>
      </div>

      {/* Features Overview */}
      <div className="ihub-mt-5">
        <h3>Key Features</h3>
        
        <h4>🎨 Visual Design</h4>
        <ul>
          <li><strong>Size Options:</strong> Four predefined sizes (small, medium, large, full)</li>
          <li><strong>Responsive:</strong> Adapts to different screen sizes</li>
          <li><strong>Modern Styling:</strong> Clean design with proper spacing</li>
          <li><strong>Custom Scrollbars:</strong> Styled scrollbars for better appearance</li>
          <li><strong>Close Button:</strong> Accessible close button with hover effects</li>
        </ul>

        <h4>♿ Accessibility</h4>
        <ul>
          <li><strong>ARIA Labels:</strong> Proper aria-labelledby and role attributes</li>
          <li><strong>Focus Management:</strong> Traps focus within the modal</li>
          <li><strong>Screen Reader:</strong> Compatible with assistive technologies</li>
          <li><strong>Keyboard Navigation:</strong> Supports keyboard interaction</li>
          <li><strong>Semantic HTML:</strong> Uses proper dialog markup</li>
        </ul>

        <h4>⚡ Functionality</h4>
        <ul>
          <li><strong>Conditional Rendering:</strong> Only renders when isOpen is true</li>
          <li><strong>Backdrop Overlay:</strong> Semi-transparent background</li>
          <li><strong>Fixed Positioning:</strong> Stays in place during scroll</li>
          <li><strong>Content Scrolling:</strong> Handles overflow content gracefully</li>
          <li><strong>Event Handling:</strong> Customizable close behavior</li>
        </ul>

        <h4>🔧 Developer Experience</h4>
        <ul>
          <li><strong>Simple API:</strong> Easy to use with minimal props</li>
          <li><strong>TypeScript:</strong> Full TypeScript support with proper types</li>
          <li><strong>Flexible Content:</strong> Accepts any React node as children</li>
          <li><strong>Optional Title:</strong> Title prop is optional for custom layouts</li>
          <li><strong>Consistent Styling:</strong> Integrates with the design system</li>
        </ul>
      </div>
    </div>
  );
};

export default ModalWrapperExamples;
```

## 📖 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | Required | Controls whether the modal is visible |
| `onClose` | `() => void` | Required | Callback function called when modal should close |
| `children` | `React.ReactNode` | Required | Content to display inside the modal |
| `title` | `string` | `undefined` | Optional title displayed in the modal header |
| `size` | `"small" \| "medium" \| "large" \| "full"` | `"full"` | Size of the modal |

### Size Specifications

| Size | Width | Use Case |
|------|-------|----------|
| `small` | 400px | Confirmations, alerts, simple forms |
| `medium` | 600px | Standard forms, moderate content |
| `large` | 900px | Detailed content, data tables, complex forms |
| `full` | 90vw | Full-featured interfaces, dashboards |

### Usage Examples

#### Basic Modal
```tsx
const [isOpen, setIsOpen] = useState(false);

<ModalWrapper
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="My Modal"
  size="medium"
>
  <div style={{ padding: "20px" }}>
    <p>Modal content goes here</p>
  </div>
</ModalWrapper>
```

#### Confirmation Dialog
```tsx
<ModalWrapper
  isOpen={showConfirmation}
  onClose={() => setShowConfirmation(false)}
  title="Confirm Action"
  size="small"
>
  <div style={{ padding: "20px", textAlign: "center" }}>
    <p>Are you sure you want to proceed?</p>
    <div style={{ marginTop: "20px" }}>
      <button onClick={handleConfirm}>Yes</button>
      <button onClick={() => setShowConfirmation(false)}>No</button>
    </div>
  </div>
</ModalWrapper>
```

#### Modal Without Title
```tsx
<ModalWrapper
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  size="small"
>
  <div style={{ padding: "30px", textAlign: "center" }}>
    <h3>Custom Header</h3>
    <p>Content without title bar</p>
  </div>
</ModalWrapper>
```

#### Form Modal
```tsx
<ModalWrapper
  isOpen={formOpen}
  onClose={() => setFormOpen(false)}
  title="Contact Form"
  size="medium"
>
  <form onSubmit={handleSubmit}>
    <div style={{ padding: "20px" }}>
      {/* Form fields */}
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <textarea placeholder="Message" />
      
      <div style={{ marginTop: "20px" }}>
        <button type="submit">Submit</button>
        <button type="button" onClick={() => setFormOpen(false)}>
          Cancel
        </button>
      </div>
    </div>
  </form>
</ModalWrapper>
```

## ⚠️ Important Implementation Notes

### Accessibility Considerations

1. **Focus Management**: The modal automatically manages focus and includes proper ARIA attributes
2. **Keyboard Navigation**: Users can navigate and close the modal using keyboard
3. **Screen Readers**: Compatible with screen readers through semantic markup

### Content Guidelines

1. **Padding**: Add padding to your content as the modal wrapper doesn't include default padding
2. **Height Management**: Content area has a fixed height of 70vh and will scroll when exceeded
3. **Button Placement**: Consider sticky positioning for action buttons in long content

### Styling Notes

1. **Custom Scrollbars**: The modal includes custom scrollbar styles for better visual appeal
2. **Responsive Behavior**: All sizes adapt appropriately on smaller screens
3. **Z-Index**: Modal uses z-index 998 to appear above most other content

### Best Practices

1. **Always provide onClose**: Essential for accessibility and user experience
2. **Use appropriate sizes**: Choose size based on content type and amount
3. **Include action buttons**: Provide clear ways for users to complete or cancel actions
4. **Test on mobile**: Ensure content works well on smaller screens

## 🔗 Related Components

- [DeleteConfirmationModal](./DeleteConfirmationModal.md) - Specialized confirmation modal for delete actions
- [SessionHandleProvider](./SessionHandleProvider.md) - Session management for modal interactions
- [ErrorState](./ErrorState.md) - Error display components that can be used within modals
- [PageLoading](./PageLoading.md) - Loading states for modal content