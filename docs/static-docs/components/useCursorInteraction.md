# useCursorInteraction

**Category:** Cursors | **Type:** hook

React hook for adding interactive cursor effects, magnetic attraction, and dynamic animations to elements

**File Location:** `src/components/cursors/useCursorInteraction.tsx`

## 🏷️ Tags

`cursors`, `hook`, `interaction`, `magnetic`, `animation`, `hover`

```tsx
"use client";
import React, { useRef, useState } from "react";
import { useCursorInteraction } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive examples demonstrating useCursorInteraction usage
 * Shows different interaction types, magnetic effects, and cursor animations
 */
const UseCursorInteractionExamples = () => {
  const [cursorType, setCursorType] = useState<string>("default");
  const [magneticStrength, setMagneticStrength] = useState<number>(0.3);
  const [interactionCount, setInteractionCount] = useState<number>(0);

  // Basic hover interaction
  const basicHoverRef = useCursorInteraction({
    type: "hover",
    scale: 1.2,
    className: "ihub-cursor-hover",
    onEnter: () => {
      setCursorType("hover");
      openToast("Entered hover area");
    },
    onLeave: () => {
      setCursorType("default");
    }
  });

  // Magnetic interaction
  const magneticRef = useCursorInteraction({
    type: "magnetic",
    magneticStrength: magneticStrength,
    magneticRange: 100,
    scale: 1.1,
    className: "ihub-cursor-magnetic",
    onEnter: () => {
      setCursorType("magnetic");
      setInteractionCount(prev => prev + 1);
    },
    onLeave: () => {
      setCursorType("default");
    }
  });

  // Click interaction
  const clickableRef = useCursorInteraction({
    type: "clickable",
    scale: 0.8,
    className: "ihub-cursor-clickable",
    clickEffect: true,
    onEnter: () => setCursorType("clickable"),
    onLeave: () => setCursorType("default"),
    onClick: () => openToast("Element clicked with cursor interaction!")
  });

  // Text selection interaction
  const textRef = useCursorInteraction({
    type: "text",
    className: "ihub-cursor-text",
    onEnter: () => setCursorType("text"),
    onLeave: () => setCursorType("default")
  });

  // Drag interaction
  const dragRef = useCursorInteraction({
    type: "drag",
    scale: 1.3,
    className: "ihub-cursor-drag",
    dragEnabled: true,
    onEnter: () => setCursorType("drag"),
    onLeave: () => setCursorType("default"),
    onDragStart: () => openToast("Drag started"),
    onDragEnd: () => openToast("Drag ended")
  });

  // Custom cursor with trailing effect
  const trailRef = useCursorInteraction({
    type: "custom",
    trail: true,
    trailLength: 8,
    className: "ihub-cursor-trail",
    customCursor: "✨",
    onEnter: () => setCursorType("trail"),
    onLeave: () => setCursorType("default")
  });

  // Disabled interaction
  const disabledRef = useCursorInteraction({
    type: "disabled",
    className: "ihub-cursor-disabled",
    onEnter: () => setCursorType("disabled"),
    onLeave: () => setCursorType("default")
  });

  // Loading interaction
  const loadingRef = useCursorInteraction({
    type: "loading",
    className: "ihub-cursor-loading",
    animate: true,
    onEnter: () => setCursorType("loading"),
    onLeave: () => setCursorType("default")
  });

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>useCursorInteraction Examples</h1>
      <p className="ihub-mb-4">
        React hook for adding interactive cursor effects, magnetic attraction,
        and dynamic animations to elements with customizable behaviors.
      </p>

      {/* Cursor Status Display */}
      <section className="ihub-mb-5">
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Cursor Status</h3>
          </div>
          <div className="ihub-card-body">
            <div className="ihub-cursor-status">
              <div className="ihub-status-item">
                <span className="ihub-status-label">Current Cursor Type:</span>
                <span className={`ihub-status-value cursor-${cursorType}`}>
                  {cursorType}
                </span>
              </div>
              <div className="ihub-status-item">
                <span className="ihub-status-label">Interactions Count:</span>
                <span className="ihub-status-value">{interactionCount}</span>
              </div>
              <div className="ihub-status-item">
                <span className="ihub-status-label">Magnetic Strength:</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={magneticStrength}
                  onChange={(e) => setMagneticStrength(parseFloat(e.target.value))}
                  className="ihub-range-input"
                />
                <span className="ihub-status-value">{magneticStrength}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Basic Interactions */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Basic Cursor Interactions</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Hover and Click Effects</h3>
            <p className="ihub-text-muted">Simple cursor interactions with scale and visual feedback</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-interaction-grid">
              <div
                ref={basicHoverRef}
                className="ihub-interaction-demo ihub-hover-demo"
              >
                <div className="ihub-demo-icon">👆</div>
                <h4>Hover Effect</h4>
                <p>Move your cursor over this area to see the hover interaction</p>
              </div>
              
              <div
                ref={clickableRef}
                className="ihub-interaction-demo ihub-clickable-demo"
              >
                <div className="ihub-demo-icon">🖱️</div>
                <h4>Clickable</h4>
                <p>Click this area to trigger the click interaction</p>
              </div>
              
              <div
                ref={textRef}
                className="ihub-interaction-demo ihub-text-demo"
              >
                <div className="ihub-demo-icon">📝</div>
                <h4>Text Selection</h4>
                <p>This text area changes the cursor to indicate text selection capability. Try selecting this text!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Magnetic Interactions */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Magnetic Cursor Effects</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Magnetic Attraction</h3>
            <p className="ihub-text-muted">Elements that attract the cursor with configurable strength</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-magnetic-demo">
              <div
                ref={magneticRef}
                className="ihub-magnetic-element"
              >
                <div className="ihub-magnetic-content">
                  <span className="ihub-magnetic-icon">🧲</span>
                  <h4>Magnetic Button</h4>
                  <p>Cursor is attracted to this element</p>
                  <small>Strength: {magneticStrength}</small>
                </div>
              </div>
              
              <div className="ihub-magnetic-instructions">
                <h5>How to use:</h5>
                <ul>
                  <li>Move your cursor near the magnetic element</li>
                  <li>Notice how the cursor is pulled toward the center</li>
                  <li>Adjust the magnetic strength using the slider above</li>
                  <li>The effect works within a 100px range</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Interactions */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Advanced Cursor Effects</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Drag Interaction</h3>
              </div>
              <div className="ihub-card-body">
                <div
                  ref={dragRef}
                  className="ihub-drag-demo"
                  draggable
                >
                  <div className="ihub-drag-icon">🚚</div>
                  <h4>Draggable Element</h4>
                  <p>Try dragging this element around</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Trail Effect</h3>
              </div>
              <div className="ihub-card-body">
                <div
                  ref={trailRef}
                  className="ihub-trail-demo"
                >
                  <div className="ihub-trail-icon">✨</div>
                  <h4>Cursor Trail</h4>
                  <p>Move your cursor over this area to see the trailing effect</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* State-based Interactions */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">State-based Cursor Effects</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Different States</h3>
            <p className="ihub-text-muted">Cursor changes based on element state</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-state-demos">
              <div
                ref={loadingRef}
                className="ihub-state-demo ihub-loading-state"
              >
                <div className="ihub-state-icon">⏳</div>
                <h4>Loading State</h4>
                <p>Shows loading cursor with animation</p>
              </div>
              
              <div
                ref={disabledRef}
                className="ihub-state-demo ihub-disabled-state"
              >
                <div className="ihub-state-icon">🚫</div>
                <h4>Disabled State</h4>
                <p>Indicates this element is not interactive</p>
              </div>
              
              <div className="ihub-state-demo ihub-success-state">
                <div className="ihub-state-icon">✅</div>
                <h4>Success State</h4>
                <p>Could show success cursor on completion</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Gallery */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Interactive Gallery</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Mixed Interactions</h3>
            <p className="ihub-text-muted">Gallery with different cursor interactions per item</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-gallery">
              {[
                { type: "hover", icon: "🖼️", title: "Image 1", effect: "Hover to enlarge" },
                { type: "magnetic", icon: "🎨", title: "Artwork", effect: "Magnetic attraction" },
                { type: "clickable", icon: "📷", title: "Photo", effect: "Click to view" },
                { type: "drag", icon: "🎭", title: "Draggable", effect: "Drag to reorder" },
              ].map((item, index) => {
                const ref = useCursorInteraction({
                  type: item.type as any,
                  scale: item.type === "magnetic" ? 1.1 : item.type === "hover" ? 1.2 : 1.0,
                  magneticStrength: item.type === "magnetic" ? 0.4 : 0,
                  onEnter: () => setCursorType(item.type),
                  onLeave: () => setCursorType("default"),
                  onClick: () => item.type === "clickable" && openToast(`Clicked ${item.title}`)
                });

                return (
                  <div
                    key={index}
                    ref={ref}
                    className={`ihub-gallery-item ihub-${item.type}-item`}
                    draggable={item.type === "drag"}
                  >
                    <div className="ihub-gallery-icon">{item.icon}</div>
                    <h5>{item.title}</h5>
                    <p>{item.effect}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Implementation Guide</h2>
        <div className="ihub-card ihub-p-4">
          <h3>Hook Interface:</h3>
          <pre className="ihub-code-block">
{`function useCursorInteraction(options: {
  type: 'hover' | 'magnetic' | 'clickable' | 'text' | 'drag' | 'loading' | 'disabled' | 'custom';
  scale?: number;                       // Scale factor on interaction
  className?: string;                   // CSS class to apply
  magneticStrength?: number;            // Magnetic attraction strength (0-1)
  magneticRange?: number;               // Range of magnetic effect in pixels
  trail?: boolean;                      // Enable cursor trail
  trailLength?: number;                 // Number of trail elements
  customCursor?: string;                // Custom cursor content
  clickEffect?: boolean;                // Show click animation
  dragEnabled?: boolean;                // Enable drag functionality
  animate?: boolean;                    // Enable animations
  onEnter?: () => void;                 // Mouse enter callback
  onLeave?: () => void;                 // Mouse leave callback
  onClick?: () => void;                 // Click callback
  onDragStart?: () => void;             // Drag start callback
  onDragEnd?: () => void;               // Drag end callback
}): React.RefObject<HTMLElement>;`}</pre>
          
          <h3 className="ihub-mt-3">Key Features:</h3>
          <ul>
            <li><strong>Multiple Interaction Types:</strong> Hover, magnetic, clickable, text, drag, and custom</li>
            <li><strong>Magnetic Effects:</strong> Configurable attraction strength and range</li>
            <li><strong>Visual Feedback:</strong> Scale effects, animations, and state indicators</li>
            <li><strong>Event Handling:</strong> Comprehensive callback system for all interactions</li>
            <li><strong>Performance Optimized:</strong> Efficient event handling and cleanup</li>
            <li><strong>Accessibility:</strong> Maintains focus states and keyboard navigation</li>
          </ul>
          
          <h3 className="ihub-mt-3">Best Practices:</h3>
          <ul>
            <li>Use appropriate interaction types for different UI elements</li>
            <li>Keep magnetic strength moderate to avoid jarring movements</li>
            <li>Provide visual feedback for all interactive states</li>
            <li>Test cursor interactions across different devices and browsers</li>
            <li>Consider performance impact with many interactive elements</li>
            <li>Ensure interactions don't interfere with accessibility features</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default UseCursorInteractionExamples;
```

## 🔗 Related Components

- [Cursor](./Cursor.md) - Custom cursor component with trailing effects and animations
- [MagneticButton](./MagneticButton.md) - Button component with magnetic cursor attraction effect
- [CursorContext](./CursorContext.md) - Context provider for cursor state management across the application
- [CursorControlDemo](./CursorControlDemo.md) - Comprehensive demo component for the cursor system

