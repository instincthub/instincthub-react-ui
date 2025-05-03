"use client";

import React, { useState } from "react";
import { ColorPicker } from "../../../../index";

const ColorPickerExample: React.FC = () => {
  const [primaryColor, setPrimaryColor] = useState("#0066cc");
  const [secondaryColor, setSecondaryColor] = useState("#ff6b6b");

  const handlePrimaryColorChange = (color: string) => {
    console.log("Primary color changed:", color);
    setPrimaryColor(color);
  };

  const handleSecondaryColorChange = (color: string) => {
    console.log("Secondary color changed:", color);
    setSecondaryColor(color);
  };

  // Override the preset colors by modifying the PRESET_COLORS array
  const CUSTOM_COLORS = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7"];

  return (
    <div className="space-y-8 p-4">
      {/* Basic Usage */}
      <div className="space-y-4">
        <h2 className="ihub-fs-lg">Basic Color Picker</h2>
        <ColorPicker
          defaultColor="#000000"
          onChange={(color) => console.log("Basic color changed:", color)}
        />
      </div>

      {/* Without Dropdown Button */}
      <div className="space-y-4">
        <h2 className="ihub-fs-lg">Without Dropdown Button</h2>
        <ColorPicker
          showButton={false}
          defaultColor="#4ecdc4"
          onChange={(color) => console.log("No button color changed:", color)}
        />
      </div>

      {/* Form Integration */}
      <div className="space-y-4">
        <h2 className="ihub-fs-lg">Form Integration</h2>
        <form className="space-y-4">
          <div>
            <label className="block mb-2">Primary Color</label>
            <ColorPicker
              name="primary_color"
              defaultColor={primaryColor}
              onChange={handlePrimaryColorChange}
            />
          </div>
          <div>
            <label className="block mb-2">Secondary Color</label>
            <ColorPicker
              name="secondary_color"
              defaultColor={secondaryColor}
              onChange={handleSecondaryColorChange}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save Colors
          </button>
        </form>
      </div>

      {/* Controlled Component Example */}
      <div className="space-y-4">
        <h2 className="ihub-fs-lg">Controlled Component</h2>
        <ColorPicker
          defaultColor={primaryColor}
          onChange={handlePrimaryColorChange}
        />
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: primaryColor,
            marginTop: "20px",
            borderRadius: "8px",
          }}
        />
      </div>

      {/* Custom Preset Colors */}
      <div className="space-y-4">
        <h2 className="ihub-fs-lg">Custom Preset Colors</h2>
        <ColorPicker
          CUSTOM_COLORS={CUSTOM_COLORS}
          onChange={(color) => console.log("Custom color changed:", color)}
        />
      </div>
    </div>
  );
};

export default ColorPickerExample;
