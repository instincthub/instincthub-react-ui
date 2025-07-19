# RandomGradientImage

**Category:** UI | **Type:** component

Random gradient image component that displays either an image or a beautiful random gradient background as a fallback

## 🏷️ Tags

`ui`, `image`, `gradient`, `placeholder`, `avatar`, `fallback`

```tsx
"use client";
import React, { useState } from "react";
import { RandomGradientImage } from "@instincthub/react-ui";

/**
 * Example component demonstrating various ways to use the RandomGradientImage
 */
const RandomGradientImageExamples = () => {
  const [brokenImageUrl, setBrokenImageUrl] = useState<string>("");
  const [validImageUrl, setValidImageUrl] = useState<string>(
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face"
  );

  // Sample user data
  const users = [
    { id: 1, name: "John Doe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" },
    { id: 2, name: "Jane Smith", avatar: "" }, // No avatar - will show gradient
    { id: 3, name: "Mike Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" },
    { id: 4, name: "Sarah Wilson", avatar: "" }, // No avatar - will show gradient
    { id: 5, name: "David Brown", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face" },
  ];

  const products = [
    { id: 1, name: "Product A", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop" },
    { id: 2, name: "Product B", image: "" }, // No image - will show gradient
    { id: 3, name: "Product C", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop" },
    { id: 4, name: "Product D", image: "" }, // No image - will show gradient
  ];

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>RandomGradientImage Examples</h1>

      {/* Basic Usage Examples */}
      <section className="ihub-mb-5">
        <h2>📸 Basic Usage Examples</h2>
        <div className="ihub-d-flex" style={{ gap: "20px", flexWrap: "wrap" }}>
          
          {/* Default gradient (no image) */}
          <div>
            <h4>Default Gradient Placeholder</h4>
            <RandomGradientImage 
              width={150} 
              height={150} 
            />
            <p className="ihub-text-sm ihub-mt-2">No image provided - shows random gradient</p>
          </div>

          {/* With valid image */}
          <div>
            <h4>With Valid Image</h4>
            <RandomGradientImage 
              thumbnail={validImageUrl}
              title="User Avatar"
              width={150} 
              height={150} 
            />
            <p className="ihub-text-sm ihub-mt-2">Valid image URL provided</p>
          </div>

          {/* Different sizes */}
          <div>
            <h4>Small Size (64x64)</h4>
            <RandomGradientImage 
              width={64} 
              height={64} 
            />
          </div>

          <div>
            <h4>Large Size (200x200)</h4>
            <RandomGradientImage 
              width={200} 
              height={200} 
            />
          </div>
        </div>
      </section>

      {/* Avatar Examples */}
      <section className="ihub-mb-5">
        <h2>👤 User Avatar Examples</h2>
        <div className="ihub-d-flex" style={{ gap: "15px", flexWrap: "wrap", alignItems: "center" }}>
          {users.map((user) => (
            <div key={user.id} className="ihub-text-center">
              <RandomGradientImage
                thumbnail={user.avatar}
                title={`${user.name} avatar`}
                width={80}
                height={80}
              />
              <p className="ihub-text-sm ihub-mt-2">{user.name}</p>
              <p className="ihub-text-xs text-muted">
                {user.avatar ? "Has Avatar" : "Gradient Fallback"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Grid Examples */}
      <section className="ihub-mb-5">
        <h2>🛍️ Product Placeholder Examples</h2>
        <div className="ihub-row">
          {products.map((product) => (
            <div key={product.id} className="ihub-col-md-3 ihub-mb-4">
              <div className="ihub-card">
                <RandomGradientImage
                  thumbnail={product.image}
                  title={`${product.name} image`}
                  width={250}
                  height={200}
                />
                <div className="ihub-card-body">
                  <h5 className="ihub-card-title">{product.name}</h5>
                  <p className="ihub-text-sm text-muted">
                    {product.image ? "Product Image" : "Gradient Placeholder"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Different Aspect Ratios */}
      <section className="ihub-mb-5">
        <h2>📐 Different Aspect Ratios</h2>
        <div className="ihub-d-flex" style={{ gap: "20px", flexWrap: "wrap" }}>
          
          {/* Square */}
          <div>
            <h4>Square (1:1)</h4>
            <RandomGradientImage 
              width={150} 
              height={150} 
            />
          </div>

          {/* Rectangle - Wide */}
          <div>
            <h4>Wide Rectangle (16:9)</h4>
            <RandomGradientImage 
              width={300} 
              height={169} 
            />
          </div>

          {/* Rectangle - Tall */}
          <div>
            <h4>Tall Rectangle (3:4)</h4>
            <RandomGradientImage 
              width={150} 
              height={200} 
            />
          </div>

          {/* Banner */}
          <div>
            <h4>Banner (3:1)</h4>
            <RandomGradientImage 
              width={300} 
              height={100} 
            />
          </div>
        </div>
      </section>

      {/* Loading State Examples */}
      <section className="ihub-mb-5">
        <h2>⏳ Loading State Examples</h2>
        <p>Use gradients as loading placeholders while images are being fetched:</p>
        <div className="ihub-d-flex" style={{ gap: "15px", flexWrap: "wrap" }}>
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="ihub-text-center">
              <RandomGradientImage
                width={120}
                height={120}
              />
              <p className="ihub-text-sm ihub-mt-2">Loading...</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Grid Examples */}
      <section className="ihub-mb-5">
        <h2>🖼️ Gallery Grid Examples</h2>
        <div className="ihub-row">
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="ihub-col-md-3 ihub-col-sm-6 ihub-mb-3">
              <RandomGradientImage
                thumbnail={index % 3 === 0 ? `https://picsum.photos/300/300?random=${index}` : ""}
                title={`Gallery item ${index + 1}`}
                width={250}
                height={250}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Card Header Examples */}
      <section className="ihub-mb-5">
        <h2>🎴 Card Header Examples</h2>
        <div className="ihub-row">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="ihub-col-md-4 ihub-mb-4">
              <div className="ihub-card">
                <RandomGradientImage
                  thumbnail={index === 1 ? "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop" : ""}
                  title={`Card ${index + 1} header`}
                  width={400}
                  height={250}
                />
                <div className="ihub-card-body">
                  <h5 className="ihub-card-title">Card Title {index + 1}</h5>
                  <p className="ihub-card-text">
                    This card demonstrates how RandomGradientImage works as a header image.
                    {index === 1 ? " This one has an actual image." : " This one uses a gradient fallback."}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Example */}
      <section className="ihub-mb-5">
        <h2>🔄 Interactive Example</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <h4>Test Image URLs</h4>
            <div className="ihub-mb-3">
              <label className="ihub-form-label">Valid Image URL:</label>
              <input
                type="url"
                className="ihub-form-control"
                value={validImageUrl}
                onChange={(e) => setValidImageUrl(e.target.value)}
                placeholder="Enter a valid image URL"
              />
            </div>
            <div className="ihub-mb-3">
              <label className="ihub-form-label">Broken/Empty Image URL:</label>
              <input
                type="url"
                className="ihub-form-control"
                value={brokenImageUrl}
                onChange={(e) => setBrokenImageUrl(e.target.value)}
                placeholder="Leave empty or enter broken URL"
              />
            </div>
          </div>
          <div className="ihub-col-md-6">
            <h4>Results</h4>
            <div className="ihub-d-flex" style={{ gap: "20px" }}>
              <div>
                <p>Valid URL:</p>
                <RandomGradientImage
                  thumbnail={validImageUrl}
                  title="Valid image"
                  width={120}
                  height={120}
                />
              </div>
              <div>
                <p>Broken/Empty URL:</p>
                <RandomGradientImage
                  thumbnail={brokenImageUrl}
                  title="Broken image"
                  width={120}
                  height={120}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Examples */}
      <section className="ihub-mb-5">
        <h2>👥 Profile Examples</h2>
        <div className="ihub-d-flex" style={{ gap: "30px", flexWrap: "wrap" }}>
          
          {/* Large Profile */}
          <div className="ihub-text-center">
            <h4>Large Profile Avatar</h4>
            <RandomGradientImage
              width={150}
              height={150}
            />
            <h5 className="ihub-mt-2">John Doe</h5>
            <p className="text-muted">Software Engineer</p>
          </div>

          {/* Medium Profile with Image */}
          <div className="ihub-text-center">
            <h4>Medium Profile with Image</h4>
            <RandomGradientImage
              thumbnail="https://images.unsplash.com/photo-1494790108755-2616b612b044?w=400&h=400&fit=crop&crop=face"
              title="Jane Smith avatar"
              width={100}
              height={100}
            />
            <h5 className="ihub-mt-2">Jane Smith</h5>
            <p className="text-muted">Product Manager</p>
          </div>

          {/* Small Profile */}
          <div className="ihub-text-center">
            <h4>Small Profile Avatar</h4>
            <RandomGradientImage
              width={60}
              height={60}
            />
            <h6 className="ihub-mt-2">Mike Johnson</h6>
            <p className="ihub-text-sm text-muted">Designer</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default RandomGradientImageExamples;
```

## 🔗 Related Components

- [CustomTextEditor](./CustomTextEditor.md) - Custom text editor component
- [ContentViewer](./ContentViewer.md) - Content viewer component
- [ContentViewOrEdit](./ContentViewOrEdit.md) - Content view or edit component
- [IHubTable](./IHubTable.md) - InstinctHub table component
- [FileUploader](./FileUploader.md) - File upload component

