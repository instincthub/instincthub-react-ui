"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Copy, Heading, Trash2 } from "lucide-react";
import ColorPalette, { BACKGROUND_COLORS } from "../components/ColorPalette";
import type { Axis } from "./tableOps";

export interface LineMenuAction {
  insertBefore: () => void;
  insertAfter: () => void;
  moveBefore: () => void;
  moveAfter: () => void;
  duplicate: () => void;
  toggleHeader: () => void;
  setBackground: (color: string | null) => void;
  remove: () => void;
}

interface TableLineMenuProps {
  axis: Axis;
  index: number;
  count: number;
  canMove: boolean;
  position: { top: number; left: number };
  actions: LineMenuAction;
  onClose: () => void;
}

export default function TableLineMenu({ axis, index, count, canMove, position, actions, onClose }: TableLineMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shiftUp, setShiftUp] = useState(0);
  const isRow = axis === "row";

  // Keep the menu inside the editor's scroll area instead of being clipped.
  useLayoutEffect(() => {
    const menu = ref.current;
    const area = menu?.closest(".ihub-te-editor-area");
    if (!menu || !area) return;
    const overflow = menu.getBoundingClientRect().bottom - area.getBoundingClientRect().bottom + 8;
    setShiftUp(overflow > 0 ? Math.min(overflow, position.top) : 0);
  }, [position.top]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const run = (fn: () => void) => () => {
    fn();
    onClose();
  };
  const keep = (e: React.MouseEvent) => e.preventDefault();

  const items = [
    { label: isRow ? "Insert row above" : "Insert column left", icon: isRow ? <ArrowUp size={14} /> : <ArrowLeft size={14} />, onClick: actions.insertBefore },
    { label: isRow ? "Insert row below" : "Insert column right", icon: isRow ? <ArrowDown size={14} /> : <ArrowRight size={14} />, onClick: actions.insertAfter },
    { label: isRow ? "Move up" : "Move left", icon: isRow ? <ArrowUp size={14} /> : <ArrowLeft size={14} />, onClick: actions.moveBefore, disabled: !canMove || index === 0 },
    { label: isRow ? "Move down" : "Move right", icon: isRow ? <ArrowDown size={14} /> : <ArrowRight size={14} />, onClick: actions.moveAfter, disabled: !canMove || index >= count - 1 },
    { label: "Duplicate", icon: <Copy size={14} />, onClick: actions.duplicate, disabled: !canMove },
    ...(index === 0 ? [{ label: isRow ? "Toggle header row" : "Toggle header column", icon: <Heading size={14} />, onClick: actions.toggleHeader }] : []),
  ];

  return (
    <div ref={ref} className="ihub-te-table-menu" role="menu" style={{ top: position.top - shiftUp, left: position.left }} onMouseDown={keep}>
      {items.map((item) => (
        <button key={item.label} type="button" role="menuitem" disabled={item.disabled} onClick={run(item.onClick)} className="ihub-te-table-menu-item">
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
      {!canMove && <p className="ihub-te-table-menu-note">Unmerge cells to move or duplicate.</p>}
      <div className="ihub-te-table-menu-divider" />
      <ColorPalette label={isRow ? "Row colour" : "Column colour"} colors={BACKGROUND_COLORS} onChange={(color) => { actions.setBackground(color); onClose(); }} />
      <div className="ihub-te-table-menu-divider" />
      <button type="button" role="menuitem" onClick={run(actions.remove)} className="ihub-te-table-menu-item is-danger">
        <Trash2 size={14} />
        <span>{isRow ? "Delete row" : "Delete column"}</span>
      </button>
    </div>
  );
}
