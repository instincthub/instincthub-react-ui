# elementIsVisibleInViewport

**Category:** Library | **Type:** utility

A utility function that checks if a DOM element is visible within the browser viewport. Supports both full and partial visibility detection, perfect for implementing scroll-based animations, lazy loading, and infinite scroll features.

## 📁 File Location

`src/components/lib/elementIsVisibleInViewport.ts`

## 🏷️ Tags

`viewport`, `visibility`, `scroll`, `intersection`, `lazy-loading`, `animation`, `dom`

## 📖 Usage Examples

### Example 1: Complete Viewport Visibility Demo

```tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { elementIsVisibleInViewport } from "@instincthub/react-ui/lib";

/**
 * Comprehensive example demonstrating elementIsVisibleInViewport utility
 */
const ViewportVisibilityExamples = () => {
  const [visibilityStates, setVisibilityStates] = useState<Record<string, {
    fullyVisible: boolean;
    partiallyVisible: boolean;
  }>>({});

  // Refs for different demo elements
  const demoRefs = {
    card1: useRef<HTMLDivElement>(null),
    card2: useRef<HTMLDivElement>(null),
    card3: useRef<HTMLDivElement>(null),
    card4: useRef<HTMLDivElement>(null),
    card5: useRef<HTMLDivElement>(null),
    lazyImage: useRef<HTMLImageElement>(null),
    animatedBox: useRef<HTMLDivElement>(null),
  };

  // Check visibility for all elements
  const checkVisibility = () => {
    const newStates: Record<string, { fullyVisible: boolean; partiallyVisible: boolean }> = {};

    Object.entries(demoRefs).forEach(([key, ref]) => {
      if (ref.current) {
        newStates[key] = {
          fullyVisible: elementIsVisibleInViewport(ref.current, false),
          partiallyVisible: elementIsVisibleInViewport(ref.current, true),
        };
      }
    });

    setVisibilityStates(newStates);
  };

  // Set up scroll listener
  useEffect(() => {
    const handleScroll = () => {
      checkVisibility();
    };

    // Initial check
    checkVisibility();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Lazy loading effect
  useEffect(() => {
    if (visibilityStates.lazyImage?.partiallyVisible && demoRefs.lazyImage.current) {
      const img = demoRefs.lazyImage.current;
      if (img.dataset.src && !img.src) {
        img.src = img.dataset.src;
        img.classList.add('loaded');
      }
    }
  }, [visibilityStates.lazyImage?.partiallyVisible]);

  // Animation effect
  useEffect(() => {
    if (visibilityStates.animatedBox?.partiallyVisible && demoRefs.animatedBox.current) {
      demoRefs.animatedBox.current.classList.add('animate-in');
    }
  }, [visibilityStates.animatedBox?.partiallyVisible]);

  const getVisibilityBadge = (key: string) => {
    const state = visibilityStates[key];
    if (!state) return <span className="ihub-badge ihub-badge-light">Checking...</span>;

    if (state.fullyVisible) {
      return <span className="ihub-badge ihub-badge-success">Fully Visible</span>;
    } else if (state.partiallyVisible) {
      return <span className="ihub-badge ihub-badge-warning">Partially Visible</span>;
    } else {
      return <span className="ihub-badge ihub-badge-secondary">Not Visible</span>;
    }
  };

  return (
    <div className="ihub-container ihub-py-5">
      <h1>elementIsVisibleInViewport Utility Examples</h1>

      {/* Fixed Status Panel */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        minWidth: '300px',
        maxHeight: '400px',
        overflow: 'auto',
        zIndex: 1000,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h6>Visibility Status</h6>
        {Object.entries(demoRefs).map(([key]) => (
          <div key={key} className="ihub-d-flex ihub-justify-content-between ihub-align-items-center ihub-mb-2">
            <small>{key}:</small>
            {getVisibilityBadge(key)}
          </div>
        ))}
      </div>

      {/* Basic Cards Demo */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Basic Visibility Detection</h2>
        <p className="text-muted ihub-mb-4">
          Scroll down to see how different elements' visibility states change. 
          Check the fixed panel on the right to see real-time visibility status.
        </p>

        {/* Spacer to create scroll */}
        <div style={{ height: '100px' }}></div>

        <div className="ihub-row">
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="ihub-col-md-6 ihub-mb-4">
              <div 
                ref={demoRefs[`card${num}` as keyof typeof demoRefs]}
                className="ihub-card ihub-p-4"
                style={{ 
                  minHeight: '200px',
                  border: visibilityStates[`card${num}`]?.fullyVisible ? '3px solid #28a745' :
                          visibilityStates[`card${num}`]?.partiallyVisible ? '3px solid #ffc107' : '1px solid #dee2e6',
                  transition: 'border-color 0.3s ease'
                }}
              >
                <h5>Demo Card {num}</h5>
                <p>This card's visibility is being tracked.</p>
                <div className="ihub-mt-3">
                  {getVisibilityBadge(`card${num}`)}
                </div>
                <div className="ihub-mt-2">
                  <small className="text-muted">
                    Fully: {visibilityStates[`card${num}`]?.fullyVisible ? '✓' : '✗'} | 
                    Partially: {visibilityStates[`card${num}`]?.partiallyVisible ? '✓' : '✗'}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spacer */}
      <div style={{ height: '200px' }}></div>

      {/* Lazy Loading Demo */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Lazy Loading Example</h2>
        <div className="ihub-card ihub-p-4">
          <h5>Image Lazy Loading</h5>
          <p className="text-muted">
            This image will only load when it becomes partially visible in the viewport.
          </p>
          <div className="text-center">
            <img
              ref={demoRefs.lazyImage}
              data-src="https://picsum.photos/600/300?random=1"
              alt="Lazy loaded image"
              style={{
                width: '100%',
                maxWidth: '600px',
                height: '300px',
                backgroundColor: '#f8f9fa',
                border: '2px dashed #dee2e6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.5s ease'
              }}
              className={visibilityStates.lazyImage?.partiallyVisible ? 'loaded' : ''}
            />
            <div className="ihub-mt-2">
              Status: {getVisibilityBadge('lazyImage')}
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div style={{ height: '300px' }}></div>

      {/* Animation Demo */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Scroll Animation Example</h2>
        <div className="ihub-card ihub-p-4">
          <h5>Scroll-triggered Animation</h5>
          <p className="text-muted">
            This box will animate when it becomes partially visible.
          </p>
          <div className="text-center">
            <div
              ref={demoRefs.animatedBox}
              style={{
                width: '200px',
                height: '200px',
                backgroundColor: '#007bff',
                margin: '0 auto',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                transform: 'translateY(50px) scale(0.5)',
                opacity: '0',
                transition: 'all 0.6s ease'
              }}
              className="animated-box"
            >
              Animated Box
            </div>
            <div className="ihub-mt-3">
              Status: {getVisibilityBadge('animatedBox')}
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Implementation Examples</h2>
        
        {/* Lazy Loading Implementation */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-image ihub-me-2"></i>
              Lazy Loading Implementation
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// React hook for lazy loading images
const useLazyLoading = () => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  
  const checkImages = useCallback(() => {
    const images = document.querySelectorAll('img[data-src]');
    
    images.forEach((img: HTMLImageElement) => {
      if (elementIsVisibleInViewport(img, true)) {
        if (img.dataset.src && !loadedImages.has(img.dataset.src)) {
          img.src = img.dataset.src;
          img.onload = () => {
            setLoadedImages(prev => new Set([...prev, img.dataset.src!]));
          };
        }
      }
    });
  }, [loadedImages]);

  useEffect(() => {
    const handleScroll = throttle(checkImages, 100);
    window.addEventListener('scroll', handleScroll);
    checkImages(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [checkImages]);
};`}
            </pre>
          </div>
        </div>

        {/* Infinite Scroll Implementation */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-refresh ihub-me-2"></i>
              Infinite Scroll Implementation
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Infinite scroll hook
const useInfiniteScroll = (loadMore: () => void) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const checkSentinel = () => {
      if (sentinelRef.current) {
        const isVisible = elementIsVisibleInViewport(sentinelRef.current, true);
        if (isVisible) {
          loadMore();
        }
      }
    };

    const handleScroll = throttle(checkSentinel, 200);
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  return sentinelRef;
};

// Usage
function InfiniteList() {
  const loadMore = () => {
    // Load more items
  };
  
  const sentinelRef = useInfiniteScroll(loadMore);
  
  return (
    <div>
      {/* Render items */}
      <div ref={sentinelRef} style={{ height: '10px' }} />
    </div>
  );
}`}
            </pre>
          </div>
        </div>

        {/* Scroll Animation Implementation */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-play ihub-me-2"></i>
              Scroll Animation Implementation
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Scroll animation hook
const useScrollAnimation = () => {
  useEffect(() => {
    const animateElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach((element: HTMLElement) => {
        const isVisible = elementIsVisibleInViewport(element, true);
        
        if (isVisible && !element.classList.contains('animated')) {
          element.classList.add('animated');
          
          // Trigger animation based on data attributes
          const animationType = element.dataset.animation || 'fadeIn';
          const delay = parseInt(element.dataset.delay || '0');
          
          setTimeout(() => {
            element.style.transform = 'translateY(0) scale(1)';
            element.style.opacity = '1';
          }, delay);
        }
      });
    };

    const handleScroll = throttle(animateElements, 100);
    window.addEventListener('scroll', handleScroll);
    animateElements(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};`}
            </pre>
          </div>
        </div>
      </section>

      {/* Performance Tips */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Performance Optimization</h2>
        <div className="ihub-card ihub-p-4">
          <h6>Throttling and Debouncing</h6>
          <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Throttle function to limit scroll event frequency
const throttle = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  let lastExecTime = 0;
  
  return function (...args: any[]) {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

// Usage with scroll event
const handleScroll = throttle(() => {
  // Check element visibility
  const isVisible = elementIsVisibleInViewport(element, true);
}, 100); // Limit to once per 100ms`}
          </pre>
        </div>
      </section>

      {/* Large spacer for scrolling demo */}
      <div style={{ height: '500px' }}></div>

      {/* CSS for animations */}
      <style jsx>{`
        .loaded {
          opacity: 1 !important;
        }
        
        .animate-in {
          transform: translateY(0) scale(1) !important;
          opacity: 1 !important;
        }
        
        .animated-box {
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default ViewportVisibilityExamples;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { elementIsVisibleInViewport } from '@instincthub/react-ui/lib';
```

## 🚀 Basic Usage

```tsx
import React, { useEffect, useRef } from 'react';
import { elementIsVisibleInViewport } from '@instincthub/react-ui/lib';

function ScrollComponent() {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const isFullyVisible = elementIsVisibleInViewport(elementRef.current, false);
        const isPartiallyVisible = elementIsVisibleInViewport(elementRef.current, true);
        
        if (isPartiallyVisible) {
          console.log('Element is visible!');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={elementRef}>
      Content to track
    </div>
  );
}
```

## 🔧 Function Signature

```tsx
elementIsVisibleInViewport(
  el: HTMLElement, 
  partiallyVisible?: boolean
): boolean
```

### Parameters

- `el` (HTMLElement): The DOM element to check for visibility
- `partiallyVisible` (boolean, optional): Whether to check for partial visibility
  - `false` (default): Element must be completely within viewport
  - `true`: Element can be partially visible

### Returns

- `boolean`: True if element is visible according to the specified criteria

## 📝 Visibility Logic

### Full Visibility (`partiallyVisible: false`)
- Element's top edge >= 0
- Element's left edge >= 0  
- Element's bottom edge <= window height
- Element's right edge <= window width

### Partial Visibility (`partiallyVisible: true`)
- Any part of element's top or bottom is within viewport height
- AND any part of element's left or right is within viewport width

## 💡 Use Cases

- **Lazy Loading**: Load images/content when they become visible
- **Infinite Scroll**: Trigger loading more content at scroll bottom
- **Scroll Animations**: Animate elements as they enter viewport
- **Analytics**: Track element visibility for user engagement
- **Performance**: Pause/resume expensive operations based on visibility
- **Progressive Enhancement**: Load features only when needed
- **Video Auto-play**: Play videos when they become visible
- **Ad Impressions**: Track when ads are actually viewed

## ⚡ Performance Optimization

### Throttling Scroll Events
```tsx
const throttle = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  let lastExecTime = 0;
  
  return function (...args: any[]) {
    const currentTime = Date.now();
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    }
  };
};

const handleScroll = throttle(() => {
  // Check visibility
}, 100);
```

### Intersection Observer Alternative
For better performance with many elements, consider using Intersection Observer API:

```tsx
const useIntersectionObserver = (callback: Function) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target);
      }
    });
  });
  
  return observer;
};
```

## 🔗 Related Utilities

- [loadScript](./loadScript.md) - Dynamically load external scripts
- [helpFunction](./helpFunction.md) - General utility functions collection
- [TrackViewPort](./helpFunction.md#trackviewport) - Alternative viewport tracking function