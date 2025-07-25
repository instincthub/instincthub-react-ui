# Unsplash Default Image Object

**Category:** Library | **Type:** image data

Default Unsplash image object for fallback scenarios and development. Provides a consistent, high-quality placeholder image with photographer attribution for use when custom images are unavailable.

## 📁 File Location

`src/components/lib/json/unsplashDefaultObject.ts`

## 🏷️ Tags

`unsplash`, `images`, `placeholder`, `fallback`, `development`, `photography`, `attribution`, `api`

## 📖 Usage Examples

### Example 1: Image Fallback & Gallery System

```tsx
"use client";

import React, { useState, useEffect } from "react";
import { unsplashDefaultObject } from "@instincthub/react-ui/lib";

/**
 * Image gallery system with Unsplash integration and fallbacks
 */
const ImageGallerySystem = () => {
  const [images, setImages] = useState([unsplashDefaultObject]);
  const [selectedImage, setSelectedImage] = useState(unsplashDefaultObject);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Simulate loading images from API
  const loadImages = async () => {
    setLoading(true);
    setError("");
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate some images loading successfully, others failing
      const mockImages = [
        unsplashDefaultObject,
        {
          id: "sample-1",
          urls: {
            regular: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80"
          },
          user: {
            id: "user1",
            updated_at: "2023-06-15T10:30:00Z",
            username: "photographer1",
            name: "Sample Photographer"
          }
        },
        {
          id: "sample-2",
          urls: {
            regular: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80"
          },
          user: {
            id: "user2",
            updated_at: "2023-06-16T14:20:00Z",
            username: "photographer2", 
            name: "Another Photographer"
          }
        }
      ];
      
      setImages(mockImages);
    } catch (err) {
      setError("Failed to load images");
      // Use default object as fallback
      setImages([unsplashDefaultObject]);
    } finally {
      setLoading(false);
    }
  };

  // Generate placeholder image using default object structure
  const generatePlaceholder = (width: number, height: number, text: string) => {
    return {
      ...unsplashDefaultObject,
      id: `placeholder-${Date.now()}`,
      urls: {
        regular: `https://via.placeholder.com/${width}x${height}/6c757d/ffffff?text=${encodeURIComponent(text)}`
      },
      user: {
        ...unsplashDefaultObject.user,
        name: "Placeholder Generator",
        username: "placeholder"
      }
    };
  };

  // Format attribution text
  const getAttributionText = (image: typeof unsplashDefaultObject) => {
    return `Photo by ${image.user.name} (@${image.user.username})`;
  };

  // Get image display URL with fallback
  const getImageUrl = (image: typeof unsplashDefaultObject, fallback = true) => {
    if (!image.urls?.regular && fallback) {
      return unsplashDefaultObject.urls.regular;
    }
    return image.urls?.regular || "";
  };

  return (
    <div className="ihub-container ihub-py-5">
      <h1>Image Gallery with Unsplash Integration</h1>
      
      {/* Controls */}
      <section className="ihub-mb-4">
        <div className="ihub-row ihub-align-items-center">
          <div className="ihub-col-md-6">
            <h2 className="ihub-fs-lg ihub-mb-0">Gallery Images</h2>
          </div>
          <div className="ihub-col-md-6 ihub-text-md-end">
            <button
              className="ihub-btn ihub-btn-primary"
              onClick={loadImages}
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="pi pi-spin pi-spinner ihub-me-2"></i>
                  Loading...
                </>
              ) : (
                <>
                  <i className="pi pi-refresh ihub-me-2"></i>
                  Reload Images
                </>
              )}
            </button>
          </div>
        </div>
        
        {error && (
          <div className="ihub-alert ihub-alert-warning ihub-mt-3">
            <i className="pi pi-exclamation-triangle ihub-me-2"></i>
            {error} - Using default fallback image.
          </div>
        )}
      </section>

      {/* Default Object Information */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Default Image Object</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <img
                src={unsplashDefaultObject.urls.regular}
                alt="Default Unsplash Image"
                className="ihub-card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="ihub-card-body">
                <h6 className="ihub-card-title">Default Fallback Image</h6>
                <p className="ihub-card-text">
                  {getAttributionText(unsplashDefaultObject)}
                </p>
                <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                  <small className="text-muted">
                    ID: {unsplashDefaultObject.id}
                  </small>
                  <a
                    href={`https://unsplash.com/@${unsplashDefaultObject.user.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ihub-btn ihub-btn-outline-primary ihub-btn-sm"
                  >
                    <i className="pi pi-external-link ihub-me-1"></i>
                    Unsplash
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h6>Object Structure</h6>
              <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "10px", maxHeight: "300px", overflow: "auto" }}>
                {JSON.stringify(unsplashDefaultObject, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Image Gallery</h2>
        <div className="ihub-row">
          {images.map((image, index) => (
            <div key={image.id} className="ihub-col-md-4 ihub-mb-4">
              <div className="ihub-card ihub-h-100">
                <div 
                  className="ihub-position-relative"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={getImageUrl(image)}
                    alt={`Image by ${image.user.name}`}
                    className="ihub-card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                    onError={(e) => {
                      // Fallback to default image on error
                      const target = e.target as HTMLImageElement;
                      if (target.src !== unsplashDefaultObject.urls.regular) {
                        target.src = unsplashDefaultObject.urls.regular;
                      }
                    }}
                  />
                  {image.id === unsplashDefaultObject.id && (
                    <div className="ihub-position-absolute ihub-top-0 ihub-end-0 ihub-m-2">
                      <span className="ihub-badge ihub-badge-warning">
                        Default
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="ihub-card-body">
                  <h6 className="ihub-card-title">
                    {image.user.name}
                  </h6>
                  <p className="ihub-card-text">
                    <small className="text-muted">
                      @{image.user.username}
                    </small>
                  </p>
                  <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                    <small className="text-muted">
                      {new Date(image.user.updated_at).toLocaleDateString()}
                    </small>
                    <button
                      className="ihub-btn ihub-btn-outline-primary ihub-btn-sm"
                      onClick={() => setSelectedImage(image)}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Image Modal */}
      {selectedImage && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">Selected Image</h2>
          <div className="ihub-card">
            <div className="ihub-row ihub-g-0">
              <div className="ihub-col-md-8">
                <img
                  src={getImageUrl(selectedImage)}
                  alt={`Image by ${selectedImage.user.name}`}
                  className="ihub-w-100"
                  style={{ height: "400px", objectFit: "cover" }}
                />
              </div>
              <div className="ihub-col-md-4">
                <div className="ihub-card-body ihub-h-100 ihub-d-flex ihub-flex-column">
                  <h5 className="ihub-card-title">Image Details</h5>
                  
                  <div className="ihub-mb-3">
                    <strong>Photographer:</strong><br />
                    {selectedImage.user.name}
                  </div>
                  
                  <div className="ihub-mb-3">
                    <strong>Username:</strong><br />
                    @{selectedImage.user.username}
                  </div>
                  
                  <div className="ihub-mb-3">
                    <strong>Image ID:</strong><br />
                    <code>{selectedImage.id}</code>
                  </div>
                  
                  <div className="ihub-mb-3">
                    <strong>Last Updated:</strong><br />
                    {new Date(selectedImage.user.updated_at).toLocaleString()}
                  </div>
                  
                  <div className="ihub-mt-auto">
                    <a
                      href={`https://unsplash.com/@${selectedImage.user.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ihub-btn ihub-btn-primary ihub-w-100"
                    >
                      <i className="pi pi-external-link ihub-me-2"></i>
                      View on Unsplash
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Placeholder Generator */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Placeholder Generator</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <h6>Generate Custom Placeholder</h6>
              <div className="ihub-mb-3">
                <label className="ihub-form-label">Width</label>
                <input
                  type="number"
                  className="ihub-form-control"
                  defaultValue={600}
                  id="width-input"
                />
              </div>
              <div className="ihub-mb-3">
                <label className="ihub-form-label">Height</label>
                <input
                  type="number"
                  className="ihub-form-control"
                  defaultValue={400}
                  id="height-input"
                />
              </div>
              <div className="ihub-mb-3">
                <label className="ihub-form-label">Text</label>
                <input
                  type="text"
                  className="ihub-form-control"
                  defaultValue="Placeholder"
                  id="text-input"
                />
              </div>
              <button
                className="ihub-btn ihub-btn-secondary"
                onClick={() => {
                  const width = (document.getElementById('width-input') as HTMLInputElement).value;
                  const height = (document.getElementById('height-input') as HTMLInputElement).value;
                  const text = (document.getElementById('text-input') as HTMLInputElement).value;
                  
                  const placeholder = generatePlaceholder(
                    parseInt(width), 
                    parseInt(height), 
                    text
                  );
                  
                  setImages(prev => [placeholder, ...prev]);
                }}
              >
                Generate Placeholder
              </button>
            </div>
            
            <div className="ihub-col-md-6">
              <h6>Implementation Example</h6>
              <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "10px" }}>
{`// Using default object as fallback
const ImageComponent = ({ src, alt }) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImageSrc(unsplashDefaultObject.urls.regular);
      setHasError(true);
    }
  };

  return (
    <div>
      <img
        src={imageSrc}
        alt={alt}
        onError={handleError}
      />
      {hasError && (
        <small className="text-muted">
          Fallback image by {unsplashDefaultObject.user.name}
        </small>
      )}
    </div>
  );
};`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Implementation Examples</h2>
        
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-image ihub-me-2"></i>
              Image Fallback Component
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Robust image component with fallback
import { unsplashDefaultObject } from '@instincthub/react-ui/lib';

const FallbackImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  showAttribution = false 
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  const handleImageError = () => {
    if (currentSrc !== unsplashDefaultObject.urls.regular) {
      setCurrentSrc(unsplashDefaultObject.urls.regular);
      setIsUsingFallback(true);
    }
  };

  const getAttribution = () => {
    if (!showAttribution || !isUsingFallback) return null;
    
    return (
      <div className="image-attribution">
        <small className="text-muted">
          Photo by{' '}
          <a 
            href={\`https://unsplash.com/@\${unsplashDefaultObject.user.username}\`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {unsplashDefaultObject.user.name}
          </a>{' '}
          on Unsplash
        </small>
      </div>
    );
  };

  return (
    <div className="fallback-image-container">
      <img
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={handleImageError}
        style={{ objectFit: 'cover' }}
      />
      {getAttribution()}
    </div>
  );
};

// Usage examples
<FallbackImage
  src="https://example.com/broken-image.jpg"
  alt="Product image"
  width={300}
  height={200}
  showAttribution={true}
/>

<FallbackImage
  src={userProfileImage || unsplashDefaultObject.urls.regular}
  alt="User profile"
  className="rounded-circle"
  width={50}
  height={50}
/>`}
            </pre>
          </div>
        </div>

        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-cog ihub-me-2"></i>
              Image Gallery Hook
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Custom hook for image gallery management
import { unsplashDefaultObject } from '@instincthub/react-ui/lib';

const useImageGallery = (initialImages = []) => {
  const [images, setImages] = useState(
    initialImages.length > 0 ? initialImages : [unsplashDefaultObject]
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addImage = (imageData) => {
    // Validate image structure
    const validatedImage = {
      id: imageData.id || \`img-\${Date.now()}\`,
      urls: {
        regular: imageData.urls?.regular || unsplashDefaultObject.urls.regular
      },
      user: {
        id: imageData.user?.id || 'unknown',
        updated_at: imageData.user?.updated_at || new Date().toISOString(),
        username: imageData.user?.username || 'anonymous',
        name: imageData.user?.name || 'Unknown User'
      }
    };

    setImages(prev => [validatedImage, ...prev]);
  };

  const removeImage = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
    
    // Ensure at least default image remains
    setImages(prev => prev.length === 0 ? [unsplashDefaultObject] : prev);
  };

  const loadImagesFromAPI = async (apiEndpoint) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiEndpoint);
      if (!response.ok) throw new Error('Failed to load images');
      
      const data = await response.json();
      setImages(data.length > 0 ? data : [unsplashDefaultObject]);
    } catch (err) {
      setError(err.message);
      setImages([unsplashDefaultObject]);
    } finally {
      setLoading(false);
    }
  };

  const resetToDefault = () => {
    setImages([unsplashDefaultObject]);
    setError(null);
  };

  return {
    images,
    loading,
    error,
    addImage,
    removeImage,
    loadImagesFromAPI,
    resetToDefault
  };
};

// Usage
const ImageGallery = () => {
  const {
    images,
    loading,
    error,
    addImage,
    removeImage,
    loadImagesFromAPI
  } = useImageGallery();

  return (
    <div className="image-gallery">
      {images.map(image => (
        <div key={image.id} className="image-item">
          <img src={image.urls.regular} alt={image.user.name} />
          <button onClick={() => removeImage(image.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImageGallerySystem;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { unsplashDefaultObject } from '@instincthub/react-ui/lib';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { unsplashDefaultObject } from '@instincthub/react-ui/lib';

function DefaultImage() {
  return (
    <img
      src={unsplashDefaultObject.urls.regular}
      alt={`Photo by ${unsplashDefaultObject.user.name}`}
      style={{ width: '300px', height: '200px', objectFit: 'cover' }}
    />
  );
}

function ImageWithFallback({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      onError={(e) => {
        e.target.src = unsplashDefaultObject.urls.regular;
      }}
    />
  );
}
```

## 🔧 Object Structure Reference

### Unsplash Image Object

```tsx
interface UnsplashImage {
  id: string;                    // Unique image identifier
  urls: {
    regular: string;             // Standard resolution image URL
  };
  user: {
    id: string;                  // Photographer user ID
    updated_at: string;          // Last update timestamp (ISO string)
    username: string;            // Photographer username
    name: string;                // Photographer display name
  };
}

const unsplashDefaultObject: UnsplashImage = {
  id: "MnHQMzC6n-o",
  urls: {
    regular: "https://images.unsplash.com/photo-1478432780021-b8d273730d8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NjE2NTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODc0NTc5MTB8&ixlib=rb-4.0.3&q=80&w=1080",
  },
  user: {
    id: "CqWsnLyLYjk",
    updated_at: "2023-05-29T23:54:07Z",
    username: "paulfrenzel",
    name: "Paul Frenzel",
  },
};
```

## 💡 Use Cases

### Fallback Images
- **Broken Image Recovery**: Replace failed image loads
- **Loading Placeholders**: Show while images load
- **Default Avatars**: User profile placeholder images
- **Empty States**: Visual content for empty galleries

### Development & Testing
- **Consistent Testing**: Reliable image for automated tests
- **Development Environment**: Placeholder during development
- **API Mocking**: Simulate image API responses
- **Design Systems**: Standard image in design components

### Image Galleries
- **Gallery Initialization**: Default image for empty galleries
- **User-Generated Content**: Fallback for missing user images
- **Content Management**: Placeholder in CMS systems
- **Social Features**: Default images for posts/profiles

### Unsplash Integration
- **API Structure**: Template for Unsplash API responses
- **Attribution**: Proper photographer credit handling
- **Image Metadata**: Standard structure for image information
- **URL Management**: Consistent image URL handling

## 🎯 Advanced Features

### Attribution Handling
- **Photographer Credit**: Built-in photographer information
- **Unsplash Links**: Direct links to photographer profiles
- **Copyright Compliance**: Proper attribution for usage
- **Metadata Preservation**: Complete user information storage

### Image Management
- **URL Structure**: Standard Unsplash URL parameters
- **Quality Control**: Optimized image parameters (q=80)
- **Responsive Images**: Configurable width parameter
- **Format Optimization**: JPEG format with quality settings

### Error Handling
- **Graceful Degradation**: Fallback for broken images
- **Network Failures**: Offline image availability
- **API Failures**: Backup when Unsplash API is down
- **Invalid URLs**: Recovery from malformed image URLs

## 🌍 Attribution & Legal

### Unsplash License
- **Free to Use**: Images available under Unsplash License
- **Commercial Use**: Permitted for commercial projects
- **Attribution**: Photographer credit recommended
- **High Quality**: Professional photography standards

### Best Practices
- **Credit Photographers**: Always include attribution when possible
- **Link to Profiles**: Provide links to photographer Unsplash profiles
- **Respect Terms**: Follow Unsplash terms of service
- **Quality Images**: Use appropriate image sizes and quality

## 🔒 Implementation Guidelines

### Performance Considerations
- **Image Optimization**: Use appropriate image sizes
- **Lazy Loading**: Implement lazy loading for galleries
- **Caching**: Cache images for better performance
- **CDN Usage**: Leverage Unsplash's CDN infrastructure

### User Experience
- **Loading States**: Show loading indicators during image loads
- **Error States**: Graceful handling of image failures
- **Accessibility**: Proper alt text and image descriptions
- **Mobile Optimization**: Responsive image handling

### Security
- **URL Validation**: Validate image URLs before use
- **Content Filtering**: Ensure appropriate image content
- **HTTPS**: Use secure image URLs
- **Privacy**: Respect user privacy in image handling

## ⚠️ Important Notes

- **Sample Data**: This is a real Unsplash image, use respectfully
- **Attribution**: Credit Paul Frenzel when using this image
- **URL Stability**: Unsplash URLs may change over time
- **Rate Limits**: Consider Unsplash API rate limits for dynamic usage
- **Image Quality**: Default image is optimized for web usage (1080px width)

## 🔗 Related Utilities

- [UnsplashRandomImage](../forms/UnsplashRandomImage.md) - Dynamic Unsplash image component
- [RandomGradientImage](../ui/RandomGradientImage.md) - Alternative image generation
- [helpFunction](./helpFunction.md) - URL and API utilities for image handling
- [loadScript](./loadScript.md) - Dynamic loading for Unsplash API scripts