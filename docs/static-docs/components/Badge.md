# Badge

**Category:** UI | **Type:** component

A versatile Badge component for displaying status indicators, notification counts, labels, and action tags with multiple variants, sizes, and shapes.

## 🏷️ Tags

`ui`, `badge`, `status`, `notification`, `label`

```tsx
"use client";
import React, { useState } from "react";
import { Badge } from "@instincthub/react-ui";

/**
 * Example component demonstrating various ways to use the Badge component
 */
const BadgeExamples = () => {
  const [notificationCount, setNotificationCount] = useState<number>(5);
  const [messageCount, setMessageCount] = useState<number>(125);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [selectedTags, setSelectedTags] = useState<string[]>(["React", "TypeScript"]);

  // Handle notification actions
  const clearNotifications = () => {
    setNotificationCount(0);
  };

  const addNotification = () => {
    setNotificationCount(prev => prev + 1);
  };

  // Handle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const availableTags = ["React", "TypeScript", "JavaScript", "Next.js", "Node.js"];

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>Badge Component Examples</h1>

      {/* Basic Variants Section */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Basic Variants</h2>
        <div className="ihub-d-flex" style={{ gap: "15px", flexWrap: "wrap" }}>
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </section>

      {/* Outlined Variants Section */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Outlined Styles</h2>
        <div className="ihub-d-flex" style={{ gap: "15px", flexWrap: "wrap" }}>
          <Badge variant="default" outlined>Default</Badge>
          <Badge variant="primary" outlined>Primary</Badge>
          <Badge variant="success" outlined>Success</Badge>
          <Badge variant="warning" outlined>Warning</Badge>
          <Badge variant="danger" outlined>Danger</Badge>
          <Badge variant="info" outlined>Info</Badge>
        </div>
      </section>

      {/* Size Variants Section */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Different Sizes</h2>
        <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "15px", flexWrap: "wrap" }}>
          <Badge variant="primary" size="small">Small Badge</Badge>
          <Badge variant="primary" size="medium">Medium Badge</Badge>
          <Badge variant="primary" size="large">Large Badge</Badge>
        </div>
      </section>

      {/* Shape Variants Section */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Different Shapes</h2>
        <div className="ihub-d-flex" style={{ gap: "15px", flexWrap: "wrap" }}>
          <Badge variant="success" shape="rounded">Rounded</Badge>
          <Badge variant="success" shape="pill">Pill Shape</Badge>
          <Badge variant="success" shape="square">Square</Badge>
        </div>
      </section>

      {/* Count Badges Section */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Notification Count Badges</h2>
        <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "20px", flexWrap: "wrap" }}>
          <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "10px" }}>
            <span>Notifications:</span>
            <Badge count={notificationCount} variant="danger" />
            <button 
              className="ihub-outlined-btn ihub-btn-sm"
              onClick={addNotification}
            >
              Add
            </button>
            <button 
              className="ihub-outlined-btn ihub-btn-sm"
              onClick={clearNotifications}
            >
              Clear
            </button>
          </div>

          <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "10px" }}>
            <span>Messages:</span>
            <Badge count={messageCount} maxCount={99} variant="primary" />
          </div>

          <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "10px" }}>
            <span>High Count:</span>
            <Badge count={1000} maxCount={999} variant="info" />
          </div>
        </div>
      </section>

      {/* Dot Status Indicators Section */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Status Dot Indicators</h2>
        <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "25px", flexWrap: "wrap" }}>
          <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "8px" }}>
            <Badge dot variant={isOnline ? "success" : "danger"} />
            <span>{isOnline ? "Online" : "Offline"}</span>
            <button 
              className="ihub-outlined-btn ihub-btn-sm"
              onClick={() => setIsOnline(!isOnline)}
            >
              Toggle
            </button>
          </div>

          <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "8px" }}>
            <Badge dot variant="warning" />
            <span>Away</span>
          </div>

          <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "8px" }}>
            <Badge dot variant="info" />
            <span>Busy</span>
          </div>

          <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "8px" }}>
            <Badge dot variant="default" />
            <span>Unknown</span>
          </div>
        </div>
      </section>

      {/* Interactive Tag Badges Section */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Interactive Tag Selection</h2>
        <div className="ihub-mb-3">
          <h4>Available Technologies:</h4>
          <div className="ihub-d-flex" style={{ gap: "10px", flexWrap: "wrap" }}>
            {availableTags.map(tag => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "primary" : "default"}
                shape="pill"
                onClick={() => toggleTag(tag)}
                style={{ cursor: "pointer" }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h4>Selected: {selectedTags.length} tags</h4>
          <div className="ihub-d-flex" style={{ gap: "8px", flexWrap: "wrap" }}>
            {selectedTags.map(tag => (
              <Badge
                key={tag}
                variant="success"
                shape="pill"
                onClick={() => toggleTag(tag)}
                style={{ cursor: "pointer" }}
              >
                {tag} ×
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Use Cases Section */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Practical Use Cases</h2>
        
        {/* Navigation with Badges */}
        <div className="ihub-mb-4">
          <h4>Navigation Menu with Notifications</h4>
          <div className="ihub-d-flex" style={{ gap: "20px", flexWrap: "wrap" }}>
            <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "8px" }}>
              <span>Dashboard</span>
            </div>
            <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "8px" }}>
              <span>Messages</span>
              <Badge count={3} variant="danger" size="small" />
            </div>
            <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "8px" }}>
              <span>Tasks</span>
              <Badge count={12} variant="warning" size="small" />
            </div>
            <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "8px" }}>
              <span>Settings</span>
              <Badge dot variant="info" />
            </div>
          </div>
        </div>

        {/* Product Labels */}
        <div className="ihub-mb-4">
          <h4>Product Labels</h4>
          <div className="ihub-d-flex" style={{ gap: "15px", flexWrap: "wrap" }}>
            <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "10px" }}>
              <span>Product A</span>
              <Badge variant="success" shape="pill" size="small">New</Badge>
              <Badge variant="warning" shape="pill" size="small">Sale</Badge>
            </div>
            <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "10px" }}>
              <span>Product B</span>
              <Badge variant="danger" shape="pill" size="small">Limited</Badge>
            </div>
            <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "10px" }}>
              <span>Product C</span>
              <Badge variant="info" shape="pill" size="small">Featured</Badge>
            </div>
          </div>
        </div>

        {/* User Status */}
        <div className="ihub-mb-4">
          <h4>User Status Indicators</h4>
          <div className="ihub-d-flex ihub-flex-column" style={{ gap: "12px" }}>
            <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#e0e0e0" }}></div>
              <span>John Doe</span>
              <Badge dot variant="success" />
              <Badge variant="primary" size="small">Pro</Badge>
            </div>
            <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#e0e0e0" }}></div>
              <span>Jane Smith</span>
              <Badge dot variant="warning" />
              <Badge variant="info" size="small">Admin</Badge>
            </div>
            <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#e0e0e0" }}></div>
              <span>Bob Johnson</span>
              <Badge dot variant="danger" />
              <Badge variant="default" size="small">Guest</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Examples Section */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Advanced Examples</h2>
        
        {/* Combination Examples */}
        <div className="ihub-mb-4">
          <h4>Size and Shape Combinations</h4>
          <div className="ihub-d-flex" style={{ gap: "15px", flexWrap: "wrap" }}>
            <Badge variant="primary" size="small" shape="pill">Small Pill</Badge>
            <Badge variant="success" size="medium" shape="square">Medium Square</Badge>
            <Badge variant="warning" size="large" shape="rounded">Large Rounded</Badge>
            <Badge variant="danger" size="small" shape="square" outlined>Small Square Outlined</Badge>
          </div>
        </div>

        {/* Custom Click Handlers */}
        <div className="ihub-mb-4">
          <h4>Clickable Badges with Actions</h4>
          <div className="ihub-d-flex" style={{ gap: "15px", flexWrap: "wrap" }}>
            <Badge 
              variant="primary" 
              onClick={() => alert("Filter applied: React")}
              style={{ cursor: "pointer" }}
            >
              Filter: React
            </Badge>
            <Badge 
              variant="danger" 
              onClick={() => alert("Removed filter")}
              style={{ cursor: "pointer" }}
            >
              Remove Filter ×
            </Badge>
            <Badge 
              count={5}
              variant="warning"
              onClick={() => alert("View 5 pending items")}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>

        {/* Zero Count Handling */}
        <div className="ihub-mb-4">
          <h4>Count Badge Behavior</h4>
          <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "20px", flexWrap: "wrap" }}>
            <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "8px" }}>
              <span>Zero count:</span>
              <Badge count={0} variant="danger" />
            </div>
            <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "8px" }}>
              <span>Exact limit:</span>
              <Badge count={99} maxCount={99} variant="primary" />
            </div>
            <div className="ihub-d-flex ihub-align-items-center" style={{ gap: "8px" }}>
              <span>Over limit:</span>
              <Badge count={100} maxCount={99} variant="primary" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BadgeExamples;
```

## 🔗 Related Components

- [Action](./Action.md) - Action button component
- [Button](./Button.md) - Button component
- [Card](./Card.md) - Card component
- [Tabs](./Tabs.md) - Tab navigation component
- [Dropdown](./Dropdown.md) - Dropdown menu component

