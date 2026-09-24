"use client";
import React from "react";
import { Ban } from "lucide-react";

export const BACKGROUND_COLORS = [
  "#1A2535", "#00838F", "#0F766E", "#1D4ED8", "#6D28D9", "#BE185D",
  "#B91C1C", "#C2410C", "#A16207", "#15803D", "#E6F4F5", "#EFF6FF",
  "#F5F3FF", "#FDF2F8", "#FEF2F2", "#FFF7ED", "#FEFCE8", "#F0FDF4",
  "#F3F4F6", "#FFFFFF",
];

export const TEXT_COLORS = [
  "#111827", "#374151", "#6B7280", "#FFFFFF", "#00838F", "#1D4ED8",
  "#6D28D9", "#BE185D", "#B91C1C", "#C2410C", "#A16207", "#15803D",
];

export const HIGHLIGHT_COLORS = ["#FEF08A", "#BBF7D0", "#BFDBFE", "#E9D5FF", "#FBCFE8", "#FED7AA", "#E5E7EB"];

interface ColorPaletteProps {
  label?: string;
  colors: string[];
  value?: string | null;
  onChange: (color: string | null) => void;
  /** Show a "none" swatch that clears the colour. */
  allowClear?: boolean;
}

/** Swatch grid plus a native colour input for custom values. */
export default function ColorPalette({ label, colors, value, onChange, allowClear = true }: ColorPaletteProps) {
  const current = (value || "").toLowerCase();
  const keep = (e: React.MouseEvent) => e.preventDefault();
  return (
    <div className="ihub-te-palette">
      {label && <span className="ihub-te-palette-label">{label}</span>}
      <div className="ihub-te-palette-grid">
        {allowClear && (
          <button type="button" className="ihub-te-swatch ihub-te-swatch--clear" title="None" onMouseDown={keep} onClick={() => onChange(null)}>
            <Ban size={12} />
          </button>
        )}
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            title={color}
            aria-label={`Colour ${color}`}
            className={`ihub-te-swatch${current === color.toLowerCase() ? " is-active" : ""}`}
            style={{ background: color }}
            onMouseDown={keep}
            onClick={() => onChange(color)}
          />
        ))}
        <label className="ihub-te-swatch ihub-te-swatch--custom" title="Custom colour">
          <input type="color" value={/^#[0-9a-f]{6}$/i.test(current) ? current : "#000000"} onChange={(e) => onChange(e.target.value)} />
        </label>
      </div>
    </div>
  );
}
