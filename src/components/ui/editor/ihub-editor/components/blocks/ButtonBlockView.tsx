"use client";
import React, { useCallback, useRef, useState } from "react";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { AlignCenter, AlignLeft, AlignRight, Settings2, Trash2 } from "lucide-react";
import useDismiss from "./useDismiss";
import ColorPalette, { BACKGROUND_COLORS, TEXT_COLORS } from "../ColorPalette";
import { safeColor } from "../../extensions/colorUtils";
import { buttonInlineStyle, safeButtonHref } from "../../extensions/ButtonBlock";

function styleObject(css: string): React.CSSProperties {
  return Object.fromEntries(
    css
      .split(";")
      .filter(Boolean)
      .map((decl) => {
        const [prop, ...rest] = decl.split(":");
        const key = prop.trim().replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
        return [key, rest.join(":").trim()];
      })
  ) as React.CSSProperties;
}

export default function ButtonBlockView({ node, updateAttributes, deleteNode, selected, editor }: NodeViewProps) {
  const editable = editor.isEditable;
  const [open, setOpen] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  useDismiss(shellRef, open, useCallback(() => setOpen(false), []));
  const bg = safeColor(node.attrs.bgColor, "#00838F");
  const color = safeColor(node.attrs.textColor, "#FFFFFF");
  const align = node.attrs.align || "center";
  const keep = (e: React.MouseEvent) => e.preventDefault();
  const showPanel = editable && open;

  return (
    <NodeViewWrapper ref={shellRef} className={`ihub-te-button-node ihub-te-block-shell${selected ? " is-selected" : ""}`} style={{ textAlign: align }} data-drag-handle>
      <a
        href={safeButtonHref(node.attrs.href)}
        className="ihub-te-button"
        style={styleObject(buttonInlineStyle(bg, color))}
        onClick={(e) => {
          if (editable) {
            e.preventDefault();
            setOpen(true);
          }
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {node.attrs.label || "Click here"}
      </a>
      {editable && (
        <div className="ihub-te-block-controls" contentEditable={false}>
          <button type="button" title="Edit button" onMouseDown={keep} onClick={() => setOpen((v) => !v)} className={open ? "is-active" : ""}>
            <Settings2 size={14} />
          </button>
          <button type="button" title="Delete button" className="is-danger" onMouseDown={keep} onClick={deleteNode}>
            <Trash2 size={14} />
          </button>
        </div>
      )}
      {showPanel && (
        <div className="ihub-te-block-popover ihub-te-button-panel" contentEditable={false} style={{ textAlign: "left" }}>
          <label className="ihub-te-field">
            <span className="ihub-te-palette-label">Label</span>
            <input value={node.attrs.label} onChange={(e) => updateAttributes({ label: e.target.value })} />
          </label>
          <label className="ihub-te-field">
            <span className="ihub-te-palette-label">Link</span>
            <input type="url" value={node.attrs.href} placeholder="https://" onChange={(e) => updateAttributes({ href: e.target.value.trim() })} />
          </label>
          <ColorPalette label="Button" colors={BACKGROUND_COLORS} value={bg} allowClear={false} onChange={(c) => updateAttributes({ bgColor: c })} />
          <ColorPalette label="Text" colors={TEXT_COLORS} value={color} allowClear={false} onChange={(c) => updateAttributes({ textColor: c })} />
          <div className="ihub-te-popover-row">
            <span className="ihub-te-palette-label">Align</span>
            {(["left", "center", "right"] as const).map((value) => (
              <button key={value} type="button" onMouseDown={keep} className={align === value ? "is-active" : ""} onClick={() => updateAttributes({ align: value })} title={`Align ${value}`}>
                {value === "left" ? <AlignLeft size={14} /> : value === "center" ? <AlignCenter size={14} /> : <AlignRight size={14} />}
              </button>
            ))}
            <button type="button" className="ihub-te-popover-done" onMouseDown={keep} onClick={() => setOpen(false)}>
              Done
            </button>
          </div>
        </div>
      )}
    </NodeViewWrapper>
  );
}
