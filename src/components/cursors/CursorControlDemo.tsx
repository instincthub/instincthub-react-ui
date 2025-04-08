"use client";

import React, { useState } from "react";
import Cursor from "./Cursor";
import MagneticButton from "./MagneticButton";
import { CursorProvider, useCursor } from "./CursorContext";
import useCursorInteraction from "./useCursorInteraction";

interface CursorDemoProps {
  /**
   * Initial cursor color
   * @default 'var(--DarkCyan)'
   */
  initialColor?: string;
}

export default function CursorControls() {
  const { cursorType, setCursorType, toggleCursorVisibility, isCursorVisible } =
    useCursor();
  const [customClass, setCustomClass] = useState("");

  const { ref: magneticRef, isHovered } = useCursorInteraction<HTMLDivElement>({
    magnetic: true,
    magneticStrength: 0.5,
    highlight: true,
    cursorType: "pointer",
  });

  const handleAddClass = () => {
    if (customClass) {
      document.body.classList.add(customClass);
      setCustomClass("");
    }
  };

  return (
    <div className="ihub-cursor-controls ihub-p-5">
      <h2 className="ihub-mb-4">Cursor Controls</h2>

      <div className="ihub-mb-4">
        <h3 className="ihub-mb-2">Cursor Type</h3>
        <div className="ihub-d-flex ihub-mb-3">
          {[
            "default",
            "pointer",
            "text",
            "loading",
            "draggable",
            "not-allowed",
          ].map((type) => (
            <button
              key={type}
              className={`ihub-mr-2 ${
                cursorType === type ? "ihub-important-btn" : "ihub-outlined-btn"
              }`}
              onClick={() => setCursorType(type as any)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="ihub-mb-4">
        <h3 className="ihub-mb-2">Cursor Visibility</h3>
        <button
          className="ihub-outlined-btn"
          onClick={() => toggleCursorVisibility(!isCursorVisible)}
        >
          {isCursorVisible ? "Hide Cursor" : "Show Cursor"}
        </button>
      </div>

      <div className="ihub-mb-4">
        <h3 className="ihub-mb-2">Custom Class</h3>
        <div className="ihub-d-flex">
          <div className="ihub-wrapper ihub-value ihub-mr-2">
            <input
              type="text"
              className="ihub-input"
              value={customClass}
              onChange={(e) => setCustomClass(e.target.value)}
            />
            <span className="ihub-text-label">Class Name</span>
          </div>
          <button className="ihub-outlined-btn" onClick={handleAddClass}>
            Add Class
          </button>
        </div>
      </div>

      <div className="ihub-mb-4">
        <h3 className="ihub-mb-2">Magnetic Element</h3>
        <div
          ref={magneticRef}
          className={`ihub-p-4 ihub-mb-3 ${
            isHovered ? "DarkCyan WhiteC" : "ChineseSilver"
          }`}
          style={{ borderRadius: "8px", width: "200px", textAlign: "center" }}
        >
          Hover Over Me
        </div>
      </div>
    </div>
  );
}

const CursorInteractionArea: React.FC = () => {
  const { createRippleEffect } = useCursorInteraction({
    ripple: true,
  });

  return (
    <div className="ihub-cursor-interaction-area ihub-p-5">
      <h2 className="ihub-mb-4">Cursor Interaction Area</h2>

      <div
        className="ihub-p-4 ihub-mb-4 ChineseSilver"
        style={{
          borderRadius: "8px",
          position: "relative",
          overflow: "hidden",
        }}
        onClick={createRippleEffect}
      >
        <p>Click anywhere in this area to create a ripple effect.</p>
      </div>

      <div className="ihub-mb-4">
        <h3 className="ihub-mb-2">Magnetic Buttons</h3>
        <div className="ihub-d-flex">
          <MagneticButton className="ihub-important-btn ihub-mr-2">
            Primary Button
          </MagneticButton>
          <MagneticButton className="ihub-outlined-btn" distanceFactor={0.8}>
            Secondary Button
          </MagneticButton>
        </div>
      </div>

      <div className="ihub-mb-4">
        <h3 className="ihub-mb-2">Text Input</h3>
        <div className="ihub-wrapper ihub-value">
          <input
            type="text"
            className="ihub-input"
            placeholder="Type something..."
          />
          <span className="ihub-text-label">Text Field</span>
        </div>
      </div>
    </div>
  );
};

/**
 * Demo component for the InstinctHub cursor library
 */
const CursorControlDemo: React.FC<CursorDemoProps> = ({
  initialColor = "var(--DarkCyan)",
}) => {
  const [cursorColor, setCursorColor] = useState(initialColor);
  const [cursorSize, setCursorSize] = useState(10);
  const [trailingSize, setTrailingSize] = useState(30);

  return (
    <CursorProvider>
      <Cursor
        color={cursorColor}
        size={cursorSize}
        trailingSize={trailingSize}
      />

      <div className="ihub-p-5">
        <h1 className="ihub-mb-4">InstinctHub Cursor Demo</h1>

        <div className="ihub-mb-5">
          <h2 className="ihub-mb-3">Cursor Settings</h2>

          <div className="ihub-mb-3">
            <label className="ihub-mb-1 ihub-d-block">Color:</label>
            <input
              type="color"
              value={cursorColor}
              onChange={(e) => setCursorColor(e.target.value)}
              className="ihub-mb-2"
            />
          </div>

          <div className="ihub-mb-3">
            <label className="ihub-mb-1 ihub-d-block">
              Cursor Size: {cursorSize}px
            </label>
            <input
              type="range"
              min="5"
              max="20"
              value={cursorSize}
              onChange={(e) => setCursorSize(parseInt(e.target.value))}
              className="ihub-mb-2"
            />
          </div>

          <div className="ihub-mb-3">
            <label className="ihub-mb-1 ihub-d-block">
              Trailing Size: {trailingSize}px
            </label>
            <input
              type="range"
              min="20"
              max="60"
              value={trailingSize}
              onChange={(e) => setTrailingSize(parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="ihub-d-flex ihub-flex-wrap">
          <div className="ihub-w-50 ihub-sm-w-100">
            <CursorControls />
          </div>
          <div className="ihub-w-50 ihub-sm-w-100">
            <CursorInteractionArea />
          </div>
        </div>
      </div>
    </CursorProvider>
  );
};
