"use client";

import React, { useState, useRef, useEffect } from "react";

// Define the preset colors
const PRESET_COLORS = [
  "#ff0000",
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#ffff00",
  "#9acd32",
  "#32cd32",
  "#00ff00",
  "#00fa9a",
  "#00ffff",
  "#00bfff",
  "#0000ff",
  "#4169e1",
  "#8a2be2",
  "#9400d3",
  "#ff1493",
  "#ff69b4",
  "#ffc0cb",
  "#ffffff",
  "#f5f5f5",
  "#d3d3d3",
  "#808080",
  "#000000",
  "#800000",
  "#008000",
];

// Color utility functions
const validateColor = (color: string): string | null => {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
  const hslRegex = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;

  if (hexRegex.test(color) || rgbRegex.test(color) || hslRegex.test(color)) {
    return color;
  }
  return null;
};

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const rgbToHsl = (
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

const isDarkColor = (color: string): boolean => {
  const rgb = hexToRgb(color);
  if (!rgb) return false;

  // Calculate relative luminance
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance < 0.5;
};

interface ColorPickerProps {
  id?: string;
  label?: string;
  defaultColor?: string;
  name?: string;
  className?: string;
  showButton?: boolean;
  onChange?: (color: string) => void;
  CUSTOM_COLORS?: string[] | null;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  id,
  label,
  defaultColor = "#000000",
  name,
  className = "",
  showButton = true,
  onChange,
  CUSTOM_COLORS,
}) => {
  const [isOpen, setIsOpen] = useState(!showButton);
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [colorInput, setColorInput] = useState(defaultColor);
  const [inputError, setInputError] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [supportsEyeDropper, setSupportsEyeDropper] = useState(false);

  // Check for EyeDropper API support
  useEffect(() => {
    setSupportsEyeDropper("EyeDropper" in window);
  }, []);

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setColorInput(color);
    setInputError(false);
    onChange?.(color);
    if (showButton) {
      setIsOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setColorInput(value);

    const validatedColor = validateColor(value);
    if (validatedColor) {
      setSelectedColor(validatedColor);
      setInputError(false);
      onChange?.(validatedColor);
    } else {
      setInputError(true);
    }
  };

  const handleEyeDropper = async () => {
    if ("EyeDropper" in window) {
      try {
        // @ts-ignore
        const eyeDropper = new window.EyeDropper();
        const result = await eyeDropper.open();
        handleColorSelect(result.sRGBHex);
      } catch (err) {
        console.error("EyeDropper failed:", err);
      }
    }
  };

  const getRgbString = (color: string): string => {
    const rgb = hexToRgb(color);
    return rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : color;
  };

  const getHslString = (color: string): string => {
    const rgb = hexToRgb(color);
    if (rgb) {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      return `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(
        hsl.l
      )}%)`;
    }
    return color;
  };

  const getCustomColors = () => {
    if (CUSTOM_COLORS) {
      return CUSTOM_COLORS;
    }
    return PRESET_COLORS;
  };

  return (
    <div ref={pickerRef} className={`ihub-color-picker ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="ihub-fs-sm ihub-mb-1 ihub-d-inline-block"
        >
          {label}
        </label>
      )}

      {name && <input type="hidden" name={name} defaultValue={selectedColor} />}

      {showButton ? (
        <button
          type="button"
          className="ihub-color-picker-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="true"
          style={{ backgroundColor: selectedColor }}
        >
          <span
            className="ihub-color-preview"
            style={{ backgroundColor: selectedColor }}
          />
          <span
            className={
              isDarkColor(selectedColor)
                ? "ihub-text-white"
                : "ihub-color-value"
            }
          >
            {selectedColor}
          </span>
        </button>
      ) : null}

      <div
        className={`ihub-color-picker-panel ${isOpen ? "ihub-is-open" : ""}`}
        role="dialog"
        aria-label="Color picker"
        onKeyDown={handleKeyDown}
      >
        <div
          className="ihub-color-preview-large"
          style={{ backgroundColor: selectedColor }}
        />

        <div className="ihub-color-formats">
          <div className="ihub-format-item">
            <span>HEX:</span>
            <input
              id={id}
              ref={inputRef}
              type="text"
              value={colorInput}
              onChange={handleInputChange}
              className={`ihub-color-input ${inputError ? "ihub-error" : ""}`}
              placeholder="#000000"
              aria-label="Hex color value"
            />
          </div>
          <div className="ihub-format-item">
            <span>RGB:</span>
            <span className="ihub-format-value">
              {getRgbString(selectedColor)}
            </span>
          </div>
          <div className="ihub-format-item">
            <span>HSL:</span>
            <span className="ihub-format-value">
              {getHslString(selectedColor)}
            </span>
          </div>
        </div>

        {supportsEyeDropper && (
          <button
            type="button"
            className="ihub-eyedropper-btn"
            onClick={handleEyeDropper}
            aria-label="Pick color from screen"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M20.71 5.63l-2.34-2.34a1 1 0 00-1.41 0l-3.12 3.12-3.2-3.2a1 1 0 00-1.41 0L7.88 4.58a1 1 0 000 1.41l3.13 3.13L3 17.25V21h3.75l8.01-8.01 3.13 3.13a1 1 0 001.41 0l1.38-1.38a1 1 0 000-1.41l-3.2-3.2 3.23-3.23a1 1 0 000-1.27z" />
            </svg>
            Pick Color
          </button>
        )}

        <div className="ihub-color-grid">
          {getCustomColors().map((color, index) => (
            <button
              key={color}
              type="button"
              className={`ihub-color-swatch ${
                selectedColor === color ? "ihub-selected" : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect(color)}
              aria-label={`Select color ${color}`}
              tabIndex={isOpen ? 0 : -1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
