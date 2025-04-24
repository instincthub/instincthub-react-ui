"use client";
import React, { useState } from "react";
import { ToggleButton } from "../../../../index";

export default function ToggleButtonExample() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = (isActive: boolean) => {
    setIsDarkMode(isActive);
    console.log(`Dark mode is ${isActive ? "enabled" : "disabled"}`);
  };

  return (
    <section>
      <div>
        <h2>Basic Usage</h2>
        <ToggleButton
          label="Dark Mode"
          onChange={handleToggle}
          initialState={isDarkMode}
        />
      </div>

      <div>
        <h2>With Different Sizes</h2>
        <ToggleButton label="Small Toggle" size="small" />

        <ToggleButton label="Medium Toggle (Default)" size="medium" />

        <ToggleButton label="Large Toggle" size="large" />
      </div>

      <div>
        <h2>With Custom Active Color</h2>
        <ToggleButton label="Default Color" initialState={true} />

        <ToggleButton
          label="Custom Color"
          initialState={true}
          activeColor="--TurkishRose"
        />

        <ToggleButton
          label="Another Custom Color"
          initialState={true}
          activeColor="--ViridianGreen"
        />
      </div>

      <div>
        <h2>Label Positioning</h2>
        <ToggleButton label="Label on Right (Default)" labelPosition="right" />

        <ToggleButton label="Label on Left" labelPosition="left" />
      </div>

      <div>
        <h2>Disabled State</h2>
        <ToggleButton label="Disabled (Off)" disabled={true} />

        <ToggleButton
          label="Disabled (On)"
          initialState={true}
          disabled={true}
        />
      </div>
    </section>
  );
}
