"use client";
import React, { useCallback, useRef, useState } from "react";
import { NodeViewContent, NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { AlignCenter, AlignLeft, AlignRight, Palette, Trash2 } from "lucide-react";
import useDismiss from "./useDismiss";
import ColorPalette, { BACKGROUND_COLORS, TEXT_COLORS } from "../ColorPalette";
import { BANNER_PADDING, type BannerPadding } from "../../extensions/SectionBanner";
import { safeColor } from "../../extensions/colorUtils";

export default function SectionBannerView({ node, updateAttributes, deleteNode, editor }: NodeViewProps) {
  const [open, setOpen] = useState(false);
  const controlsRef = useRef<HTMLDivElement>(null);
  useDismiss(controlsRef, open, useCallback(() => setOpen(false), []));
  const bg = safeColor(node.attrs.bgColor, "#1A2535");
  const color = safeColor(node.attrs.textColor, "#FFFFFF");
  const align = node.attrs.align || "center";
  const padding = BANNER_PADDING[node.attrs.padding as BannerPadding] || BANNER_PADDING.md;
  const keep = (e: React.MouseEvent) => e.preventDefault();

  return (
    <NodeViewWrapper
      className={`ihub-te-banner ihub-te-block-shell${open ? " is-open" : ""}`}
      data-type="section-banner"
      style={{ backgroundColor: bg, color, textAlign: align, padding }}
    >
      {editor.isEditable && (
        <div ref={controlsRef} className="ihub-te-block-controls" contentEditable={false}>
          <button type="button" title="Banner colours" onMouseDown={keep} onClick={() => setOpen((v) => !v)} className={open ? "is-active" : ""}>
            <Palette size={14} />
          </button>
          <button type="button" title="Delete banner" className="is-danger" onMouseDown={keep} onClick={deleteNode}>
            <Trash2 size={14} />
          </button>
          {open && (
            <div className="ihub-te-block-popover" onMouseDown={(e) => e.stopPropagation()}>
              <ColorPalette label="Background" colors={BACKGROUND_COLORS} value={bg} allowClear={false} onChange={(c) => updateAttributes({ bgColor: c })} />
              <ColorPalette label="Text" colors={TEXT_COLORS} value={color} allowClear={false} onChange={(c) => updateAttributes({ textColor: c })} />
              <div className="ihub-te-popover-row">
                <span className="ihub-te-palette-label">Align</span>
                {(["left", "center", "right"] as const).map((value) => (
                  <button key={value} type="button" onMouseDown={keep} className={align === value ? "is-active" : ""} onClick={() => updateAttributes({ align: value })} title={`Align ${value}`}>
                    {value === "left" ? <AlignLeft size={14} /> : value === "center" ? <AlignCenter size={14} /> : <AlignRight size={14} />}
                  </button>
                ))}
              </div>
              <div className="ihub-te-popover-row">
                <span className="ihub-te-palette-label">Size</span>
                {(Object.keys(BANNER_PADDING) as BannerPadding[]).map((value) => (
                  <button key={value} type="button" onMouseDown={keep} className={node.attrs.padding === value ? "is-active" : ""} onClick={() => updateAttributes({ padding: value })}>
                    {value.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <NodeViewContent className="ihub-te-banner-content" />
    </NodeViewWrapper>
  );
}
