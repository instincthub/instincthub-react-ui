# UnsplashRandomImage

**Category:** Forms | **Type:** component

Random image component that fetches and displays beautiful images from Unsplash API with Redux integration

## 📁 File Location

`src/components/forms/UnsplashRandomImage.tsx`

## 🏷️ Tags

`forms`, `images`, `unsplash`, `redux`, `random`

```tsx
"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UnsplashRandomImage } from "@instincthub/react-ui";
import { selectUnsplashObject, unsplashObject } from "your-redux-store";

/**
 * Example component demonstrating various ways to use the UnsplashRandomImage
 */
const UnsplashRandomImageExamples = () => {
  const [currentCategory, setCurrentCategory] = useState<string>("nature");
  const [galleryImages, setGalleryImages] = useState<string[]>([
    "landscape",
    "architecture",
    "food",
    "animals"
  ]);

  // Common Redux props for all examples
  const commonProps = {
    useDispatch,
    useSelector,
    selectUnsplashObject,
    unsplashObject,
  };

  // Handle image click for hero section
  const handleHeroImageClick = () => {
    console.log("Hero image clicked!");
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>Unsplash Random Image Examples</h1>

      {/* Category Selection */}
      <div className="ihub-mb-4">
        <h3>Available Categories:</h3>
        <div className="ihub-d-flex" style={{ gap: "10px", flexWrap: "wrap" }}>
          {["nature", "architecture", "food", "animals", "technology", "people", "art"].map((category) => (
            <button
              key={category}
              className={currentCategory === category ? "ihub-important-btn" : "ihub-outlined-btn"}
              onClick={() => handleCategoryChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Example 1: Basic Hero Section */}
      <section className="ihub-mb-5">
        <h2>1. Hero Section Image</h2>
        <p>Full-width hero image with overlay and clickable functionality</p>
        
        <div style={{ height: "400px", position: "relative" }}>
          <UnsplashRandomImage
            {...commonProps}
            category={currentCategory}
            height="100%"
            width="100%"
            borderRadius="12px"
            overlayIntensity={0.3}
            onImageClick={handleHeroImageClick}
            className="ihub-hero-image"
          />
        </div>
      </section>

      {/* Example 2: Card-style Images */}
      <section className="ihub-mb-5">
        <h2>2. Card Gallery</h2>
        <p>Multiple images in card format with different categories</p>
        
        <div className="ihub-row">
          {galleryImages.map((category, index) => (
            <div key={index} className="ihub-col-md-6 ihub-col-lg-3 ihub-mb-3">
              <div className="ihub-card">
                <div style={{ height: "200px", position: "relative" }}>
                  <UnsplashRandomImage
                    {...commonProps}
                    category={category}
                    height="100%"
                    width="100%"
                    borderRadius="8px"
                    overlayIntensity={0.1}
                  />
                </div>
                <div className="ihub-card-body">
                  <h5 className="ihub-card-title">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h5>
                  <p className="ihub-card-text">
                    Beautiful {category} images from Unsplash
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Example 3: Square Profile/Avatar Style */}
      <section className="ihub-mb-5">
        <h2>3. Square Avatar Style</h2>
        <p>Perfect for profile pictures or small decorative elements</p>
        
        <div className="ihub-d-flex" style={{ gap: "20px", flexWrap: "wrap" }}>
          <div style={{ width: "150px", height: "150px" }}>
            <UnsplashRandomImage
              {...commonProps}
              category="people"
              height="100%"
              width="100%"
              borderRadius="50%"
              overlayIntensity={0}
            />
          </div>
          <div style={{ width: "150px", height: "150px" }}>
            <UnsplashRandomImage
              {...commonProps}
              category="art"
              height="100%"
              width="100%"
              borderRadius="12px"
              overlayIntensity={0.15}
            />
          </div>
          <div style={{ width: "150px", height: "150px" }}>
            <UnsplashRandomImage
              {...commonProps}
              category="technology"
              height="100%"
              width="100%"
              borderRadius="4px"
              overlayIntensity={0.25}
            />
          </div>
        </div>
      </section>

      {/* Example 4: Banner/Header Style */}
      <section className="ihub-mb-5">
        <h2>4. Wide Banner Style</h2>
        <p>Perfect for page headers or section dividers</p>
        
        <div style={{ height: "150px", width: "100%" }}>
          <UnsplashRandomImage
            {...commonProps}
            category="landscape"
            height="100%"
            width="100%"
            borderRadius="6px"
            overlayIntensity={0.4}
          />
        </div>
      </section>

      {/* Example 5: Sidebar/Aside Style */}
      <section className="ihub-mb-5">
        <h2>5. Sidebar Image</h2>
        <p>Tall, narrow images perfect for sidebars</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-8">
            <div className="ihub-p-4" style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
              <h3>Main Content Area</h3>
              <p>This is the main content area. The sidebar image on the right provides visual interest without overwhelming the content.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
          <div className="ihub-col-md-4">
            <div style={{ height: "300px" }}>
              <UnsplashRandomImage
                {...commonProps}
                category="architecture"
                height="100%"
                width="100%"
                borderRadius="8px"
                overlayIntensity={0.2}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Example 6: Background Image Style */}
      <section className="ihub-mb-5">
        <h2>6. Background Content Section</h2>
        <p>Image as background with content overlay</p>
        
        <div style={{ position: "relative", height: "300px" }}>
          <UnsplashRandomImage
            {...commonProps}
            category="nature"
            height="100%"
            width="100%"
            borderRadius="12px"
            overlayIntensity={0.6}
          />
          <div 
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "white",
              zIndex: 10
            }}
          >
            <h2>Overlay Content</h2>
            <p>This content sits on top of the background image</p>
            <button className="ihub-primary-btn">Call to Action</button>
          </div>
        </div>
      </section>

      {/* Example 7: Placeholder Content */}
      <section className="ihub-mb-5">
        <h2>7. Blog Post Placeholder</h2>
        <p>Using random images as placeholder content for blog posts or articles</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-6 ihub-mb-3">
            <article className="ihub-card">
              <div style={{ height: "200px" }}>
                <UnsplashRandomImage
                  {...commonProps}
                  category="food"
                  height="100%"
                  width="100%"
                  borderRadius="8px 8px 0 0"
                  overlayIntensity={0.1}
                />
              </div>
              <div className="ihub-card-body">
                <h4>Delicious Food Article</h4>
                <p>This is a sample blog post about food. The image above was automatically generated from Unsplash.</p>
                <small className="ihub-text-muted">Published 2 hours ago</small>
              </div>
            </article>
          </div>
          
          <div className="ihub-col-md-6 ihub-mb-3">
            <article className="ihub-card">
              <div style={{ height: "200px" }}>
                <UnsplashRandomImage
                  {...commonProps}
                  category="technology"
                  height="100%"
                  width="100%"
                  borderRadius="8px 8px 0 0"
                  overlayIntensity={0.1}
                />
              </div>
              <div className="ihub-card-body">
                <h4>Tech Innovation</h4>
                <p>Another sample blog post, this time about technology. Each refresh brings a new relevant image.</p>
                <small className="ihub-text-muted">Published 1 day ago</small>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Example 8: Interactive Gallery */}
      <section className="ihub-mb-5">
        <h2>8. Interactive Category Gallery</h2>
        <p>Dynamic gallery that changes based on user selection</p>
        
        <div className="ihub-mb-3">
          <select 
            value={currentCategory} 
            onChange={(e) => setCurrentCategory(e.target.value)}
            className="ihub-form-control ihub-d-inline-block"
            style={{ width: "200px" }}
          >
            <option value="nature">Nature</option>
            <option value="architecture">Architecture</option>
            <option value="food">Food</option>
            <option value="animals">Animals</option>
            <option value="technology">Technology</option>
            <option value="people">People</option>
            <option value="art">Art</option>
          </select>
        </div>
        
        <div style={{ height: "250px" }}>
          <UnsplashRandomImage
            {...commonProps}
            category={currentCategory}
            height="100%"
            width="100%"
            borderRadius="10px"
            overlayIntensity={0.25}
          />
        </div>
      </section>

      {/* Example 9: Minimal Style */}
      <section className="ihub-mb-5">
        <h2>9. Minimal Clean Style</h2>
        <p>Clean, minimal approach without overlay</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-4 ihub-mb-3">
            <div style={{ height: "180px" }}>
              <UnsplashRandomImage
                {...commonProps}
                category="minimal"
                height="100%"
                width="100%"
                borderRadius="0"
                overlayIntensity={0}
              />
            </div>
          </div>
          <div className="ihub-col-md-4 ihub-mb-3">
            <div style={{ height: "180px" }}>
              <UnsplashRandomImage
                {...commonProps}
                category="abstract"
                height="100%"
                width="100%"
                borderRadius="0"
                overlayIntensity={0}
              />
            </div>
          </div>
          <div className="ihub-col-md-4 ihub-mb-3">
            <div style={{ height: "180px" }}>
              <UnsplashRandomImage
                {...commonProps}
                category="textures"
                height="100%"
                width="100%"
                borderRadius="0"
                overlayIntensity={0}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Example 10: Custom Styling Demo */}
      <section className="ihub-mb-5">
        <h2>10. Custom Styling Options</h2>
        <p>Demonstrating different overlay intensities and border radius options</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-4 ihub-mb-3">
            <h5>No Overlay (0)</h5>
            <div style={{ height: "150px" }}>
              <UnsplashRandomImage
                {...commonProps}
                category="landscape"
                height="100%"
                width="100%"
                borderRadius="8px"
                overlayIntensity={0}
              />
            </div>
          </div>
          <div className="ihub-col-md-4 ihub-mb-3">
            <h5>Medium Overlay (0.3)</h5>
            <div style={{ height: "150px" }}>
              <UnsplashRandomImage
                {...commonProps}
                category="landscape"
                height="100%"
                width="100%"
                borderRadius="8px"
                overlayIntensity={0.3}
              />
            </div>
          </div>
          <div className="ihub-col-md-4 ihub-mb-3">
            <h5>Heavy Overlay (0.6)</h5>
            <div style={{ height: "150px" }}>
              <UnsplashRandomImage
                {...commonProps}
                category="landscape"
                height="100%"
                width="100%"
                borderRadius="8px"
                overlayIntensity={0.6}
              />
            </div>
          </div>
        </div>
      </section>

      {/* API Integration Information */}
      <section className="ihub-mb-5">
        <h2>11. API Configuration</h2>
        <div className="ihub-alert ihub-alert-info">
          <h4>Required Environment Variables:</h4>
          <code>NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key</code>
          <p className="ihub-mt-2">
            Get your free access key from: <a href="https://unsplash.com/developers" target="_blank" rel="noopener noreferrer">Unsplash Developers</a>
          </p>
        </div>
        
        <div className="ihub-alert ihub-alert-warning">
          <h4>Redux Setup Required:</h4>
          <p>This component requires Redux store configuration with unsplash object slice. See the component props for required Redux hooks and selectors.</p>
        </div>
      </section>
    </div>
  );
};

export default UnsplashRandomImageExamples;
```

## 📋 Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `category` | `string` | ✅ | - | Search category for Unsplash images (e.g., "nature", "architecture", "food") |
| `useDispatch` | `() => any` | ✅ | - | Redux dispatch hook |
| `useSelector` | `<T>(selector) => T` | ✅ | - | Redux selector hook |
| `selectUnsplashObject` | `(state) => UnsplashObject` | ✅ | - | Redux selector function for unsplash object |
| `unsplashObject` | `{ actions: UnsplashAction }` | ✅ | - | Redux slice for unsplash object |
| `className` | `string` | ❌ | - | Optional CSS class for styling |
| `height` | `string` | ❌ | `"100vh"` | Container height (CSS units) |
| `width` | `string` | ❌ | `"100%"` | Container width (CSS units) |
| `borderRadius` | `string` | ❌ | `"8px"` | Border radius (CSS units) |
| `overlayIntensity` | `number` | ❌ | `0.2` | Overlay opacity (0-1) |
| `onImageClick` | `() => void` | ❌ | - | Function to handle image click events |

## 🌟 Features

- **Random Image Fetching**: Automatically fetches random images from Unsplash API based on category
- **Redux Integration**: Full Redux state management for image data
- **Loading States**: Built-in loading spinner and error handling
- **Responsive Design**: Automatic image sizing and responsive behavior
- **Customizable Overlay**: Adjustable overlay intensity for text readability
- **Image Metadata**: Displays photographer info, creation date, and likes
- **Refresh Functionality**: Built-in refresh button to load new images
- **Error Handling**: Graceful fallback to default image on API errors
- **Click Handlers**: Optional click event handling for interactive features
- **Development Mode**: Automatic fallback to default image in development

## 🎨 Popular Categories

- `nature` - Landscapes, plants, outdoor scenes
- `architecture` - Buildings, structures, urban environments  
- `food` - Culinary images, restaurants, cooking
- `animals` - Wildlife, pets, nature photography
- `technology` - Gadgets, computers, innovation
- `people` - Portraits, lifestyle, human subjects
- `art` - Creative works, paintings, sculptures
- `travel` - Destinations, tourism, exploration
- `business` - Office environments, meetings, professional
- `abstract` - Creative patterns, textures, artistic
- `minimal` - Clean, simple, minimalist compositions
- `vintage` - Retro, classic, aged aesthetics

## 🔗 Related Components

- [AnimatedBox](./AnimatedBox.md) - Animated container component
- [ColorPicker](./ColorPicker.md) - Color selection component  
- [ContentViewOrEdit](./ContentViewOrEdit.md) - Content viewing and editing component
- [FileUploader](./FileUploader.md) - File upload component
- [ActionDropdown](./ActionDropdown.md) - Dropdown component for actions

