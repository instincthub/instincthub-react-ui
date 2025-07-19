# ToggleButton

**Category:** Form | **Type:** component

A flexible and accessible toggle switch component for binary state management with customizable styling and multiple size variants.

## 🏷️ Tags

`form`, `toggle`, `switch`, `binary`, `state`

```tsx
"use client";
import React, { useState } from "react";
import { ToggleButton } from "@instincthub/react-ui";

/**
 * Example component demonstrating various ways to use the ToggleButton
 */
const ToggleButtonExamples = () => {
  // Settings state
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    emailUpdates: false,
    autoSave: true,
    twoFactorAuth: false,
    publicProfile: false,
    showOnlineStatus: true,
    allowMessages: true,
  });

  // Form state for user preferences
  const [userPreferences, setUserPreferences] = useState({
    newsletter: false,
    smsNotifications: false,
    marketing: false,
  });

  // Handle settings change
  const handleSettingChange = (key: string) => (value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    console.log(`${key} changed to:`, value);
  };

  // Handle preference change
  const handlePreferenceChange = (key: string) => (value: boolean) => {
    setUserPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>ToggleButton Examples</h1>

      {/* Basic Usage Section */}
      <section className="ihub-mb-5">
        <h2>Basic Toggle Switches</h2>
        <div className="ihub-py-3">
          <ToggleButton
            label="Simple Toggle"
            onChange={(value) => console.log("Simple toggle:", value)}
          />
          
          <ToggleButton
            label="Initially Active"
            initialState={true}
            onChange={(value) => console.log("Initially active:", value)}
          />
          
          <ToggleButton
            label="Without Label"
            ariaLabel="Unlabeled toggle switch"
            onChange={(value) => console.log("Unlabeled toggle:", value)}
          />
        </div>
      </section>

      {/* Size Variants Section */}
      <section className="ihub-mb-5">
        <h2>Size Variants</h2>
        <div className="ihub-py-3">
          <ToggleButton
            label="Small Toggle"
            size="small"
            onChange={(value) => console.log("Small toggle:", value)}
          />
          
          <ToggleButton
            label="Medium Toggle (Default)"
            size="medium"
            initialState={true}
            onChange={(value) => console.log("Medium toggle:", value)}
          />
          
          <ToggleButton
            label="Large Toggle"
            size="large"
            onChange={(value) => console.log("Large toggle:", value)}
          />
        </div>
      </section>

      {/* Custom Colors Section */}
      <section className="ihub-mb-5">
        <h2>Custom Active Colors</h2>
        <div className="ihub-py-3">
          <ToggleButton
            label="Default Color (DarkCyan)"
            initialState={true}
            onChange={(value) => console.log("Default color:", value)}
          />
          
          <ToggleButton
            label="Red Active Color"
            initialState={true}
            activeColor="--TurkishRose"
            onChange={(value) => console.log("Red toggle:", value)}
          />
          
          <ToggleButton
            label="Green Active Color"
            initialState={true}
            activeColor="--ViridianGreen"
            onChange={(value) => console.log("Green toggle:", value)}
          />
          
          <ToggleButton
            label="Purple Active Color"
            initialState={true}
            activeColor="--RebeccaPurple"
            onChange={(value) => console.log("Purple toggle:", value)}
          />
        </div>
      </section>

      {/* Label Positioning Section */}
      <section className="ihub-mb-5">
        <h2>Label Positioning</h2>
        <div className="ihub-py-3">
          <ToggleButton
            label="Label on Right (Default)"
            labelPosition="right"
            onChange={(value) => console.log("Right label:", value)}
          />
          
          <ToggleButton
            label="Label on Left"
            labelPosition="left"
            onChange={(value) => console.log("Left label:", value)}
          />
          
          <ToggleButton
            label={<span className="ihub-fw-bold ihub-text-primary">Rich Label Content</span>}
            labelPosition="right"
            onChange={(value) => console.log("Rich label:", value)}
          />
        </div>
      </section>

      {/* States Section */}
      <section className="ihub-mb-5">
        <h2>Different States</h2>
        <div className="ihub-py-3">
          <ToggleButton
            label="Enabled Toggle"
            onChange={(value) => console.log("Enabled toggle:", value)}
          />
          
          <ToggleButton
            label="Disabled (Off)"
            disabled={true}
            onChange={(value) => console.log("Disabled off:", value)}
          />
          
          <ToggleButton
            label="Disabled (On)"
            initialState={true}
            disabled={true}
            onChange={(value) => console.log("Disabled on:", value)}
          />
          
          <ToggleButton
            label="No Animation"
            noAnimation={true}
            onChange={(value) => console.log("No animation:", value)}
          />
        </div>
      </section>

      {/* Settings Panel Example */}
      <section className="ihub-mb-5">
        <h2>Settings Panel Example</h2>
        <div className="ihub-py-3 ihub-px-4 ihub-border ihub-rounded">
          <h3 className="ihub-mb-3">Account Settings</h3>
          
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <ToggleButton
                label="Dark Mode"
                initialState={settings.darkMode}
                onChange={handleSettingChange('darkMode')}
                activeColor="--Gunmetal"
              />
              
              <ToggleButton
                label="Push Notifications"
                initialState={settings.notifications}
                onChange={handleSettingChange('notifications')}
              />
              
              <ToggleButton
                label="Email Updates"
                initialState={settings.emailUpdates}
                onChange={handleSettingChange('emailUpdates')}
              />
              
              <ToggleButton
                label="Auto-save"
                initialState={settings.autoSave}
                onChange={handleSettingChange('autoSave')}
              />
            </div>
            
            <div className="ihub-col-md-6">
              <ToggleButton
                label="Two-Factor Authentication"
                initialState={settings.twoFactorAuth}
                onChange={handleSettingChange('twoFactorAuth')}
                activeColor="--ViridianGreen"
              />
              
              <ToggleButton
                label="Public Profile"
                initialState={settings.publicProfile}
                onChange={handleSettingChange('publicProfile')}
              />
              
              <ToggleButton
                label="Show Online Status"
                initialState={settings.showOnlineStatus}
                onChange={handleSettingChange('showOnlineStatus')}
              />
              
              <ToggleButton
                label="Allow Direct Messages"
                initialState={settings.allowMessages}
                onChange={handleSettingChange('allowMessages')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Form Integration Example */}
      <section className="ihub-mb-5">
        <h2>Form Integration Example</h2>
        <div className="ihub-py-3 ihub-px-4 ihub-border ihub-rounded">
          <h3 className="ihub-mb-3">Communication Preferences</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            console.log("Form submitted with preferences:", userPreferences);
            alert("Preferences saved! Check console for details.");
          }}>
            <ToggleButton
              name="newsletter"
              label="Subscribe to Newsletter"
              initialState={userPreferences.newsletter}
              onChange={handlePreferenceChange('newsletter')}
            />
            
            <ToggleButton
              name="smsNotifications"
              label="SMS Notifications"
              initialState={userPreferences.smsNotifications}
              onChange={handlePreferenceChange('smsNotifications')}
            />
            
            <ToggleButton
              name="marketing"
              label="Marketing Communications"
              initialState={userPreferences.marketing}
              onChange={handlePreferenceChange('marketing')}
            />
            
            <div className="ihub-mt-4">
              <button type="submit" className="ihub-primary-btn">
                Save Preferences
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Feature Flags Example */}
      <section className="ihub-mb-5">
        <h2>Feature Flags Example</h2>
        <div className="ihub-py-3 ihub-px-4 ihub-border ihub-rounded">
          <h3 className="ihub-mb-3">Beta Features</h3>
          <p className="ihub-text-muted ihub-mb-3">
            Enable experimental features (requires app restart)
          </p>
          
          <ToggleButton
            label="New Dashboard Layout"
            size="small"
            onChange={(value) => console.log("Dashboard feature:", value)}
          />
          
          <ToggleButton
            label="Advanced Analytics"
            size="small"
            onChange={(value) => console.log("Analytics feature:", value)}
          />
          
          <ToggleButton
            label="AI-Powered Suggestions"
            size="small"
            activeColor="--RebeccaPurple"
            onChange={(value) => console.log("AI feature:", value)}
          />
          
          <ToggleButton
            label="Real-time Collaboration"
            size="small"
            onChange={(value) => console.log("Collaboration feature:", value)}
          />
        </div>
      </section>

      {/* Accessibility Example */}
      <section className="ihub-mb-5">
        <h2>Accessibility Features</h2>
        <div className="ihub-py-3">
          <ToggleButton
            label="Screen Reader Optimized"
            ariaLabel="Toggle screen reader optimization mode"
            onChange={(value) => console.log("Screen reader mode:", value)}
          />
          
          <ToggleButton
            label="High Contrast Mode"
            ariaLabel="Enable high contrast display mode for better visibility"
            onChange={(value) => console.log("High contrast:", value)}
          />
          
          <ToggleButton
            label="Keyboard Navigation"
            ariaLabel="Enable enhanced keyboard navigation shortcuts"
            onChange={(value) => console.log("Keyboard nav:", value)}
          />
        </div>
      </section>

      {/* Real-world Use Cases */}
      <section className="ihub-mb-5">
        <h2>Real-world Use Cases</h2>
        
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <div className="ihub-py-3 ihub-px-3 ihub-border ihub-rounded ihub-mb-3">
              <h4>Privacy Controls</h4>
              <ToggleButton
                label="Profile Visibility"
                size="small"
                onChange={(value) => console.log("Profile visibility:", value)}
              />
              <ToggleButton
                label="Location Sharing"
                size="small"
                onChange={(value) => console.log("Location sharing:", value)}
              />
              <ToggleButton
                label="Activity Status"
                size="small"
                onChange={(value) => console.log("Activity status:", value)}
              />
            </div>
          </div>
          
          <div className="ihub-col-md-4">
            <div className="ihub-py-3 ihub-px-3 ihub-border ihub-rounded ihub-mb-3">
              <h4>Content Preferences</h4>
              <ToggleButton
                label="Auto-play Videos"
                size="small"
                onChange={(value) => console.log("Auto-play:", value)}
              />
              <ToggleButton
                label="Show NSFW Content"
                size="small"
                activeColor="--TurkishRose"
                onChange={(value) => console.log("NSFW content:", value)}
              />
              <ToggleButton
                label="Recommended Posts"
                size="small"
                initialState={true}
                onChange={(value) => console.log("Recommendations:", value)}
              />
            </div>
          </div>
          
          <div className="ihub-col-md-4">
            <div className="ihub-py-3 ihub-px-3 ihub-border ihub-rounded ihub-mb-3">
              <h4>System Controls</h4>
              <ToggleButton
                label="Maintenance Mode"
                size="small"
                activeColor="--Orange"
                onChange={(value) => console.log("Maintenance mode:", value)}
              />
              <ToggleButton
                label="Debug Logging"
                size="small"
                onChange={(value) => console.log("Debug logging:", value)}
              />
              <ToggleButton
                label="Performance Monitor"
                size="small"
                activeColor="--ViridianGreen"
                onChange={(value) => console.log("Performance monitor:", value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Current Settings Display */}
      <section className="ihub-mb-5">
        <h2>Current Settings State</h2>
        <div className="ihub-py-3 ihub-px-4 ihub-bg-light ihub-rounded">
          <h4>Settings:</h4>
          <pre className="ihub-text-sm">
            {JSON.stringify(settings, null, 2)}
          </pre>
          
          <h4 className="ihub-mt-3">User Preferences:</h4>
          <pre className="ihub-text-sm">
            {JSON.stringify(userPreferences, null, 2)}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default ToggleButtonExamples;
```

## 🔗 Related Components

- [InputNumber](./InputNumber.md) - InputNumber component for numerical input
- [InputText](./InputText.md) - InputText component for text input
- [CheckBoxes](./CheckBoxes.md) - CheckBoxes component for multiple selections
- [RadioButton](./RadioButton.md) - RadioButton component for single selection
- [SubmitButton](./SubmitButton.md) - SubmitButton component for form submission

