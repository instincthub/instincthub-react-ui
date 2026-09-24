"use client";
import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import {
  Plus,
  Minus,
  Rows3,
  Columns3,
  Trash2,
  MergeIcon,
  SplitIcon,
  PaintBucket,
  PanelTop,
  PanelLeft,
} from "lucide-react";
import ColorPalette, { BACKGROUND_COLORS } from "./ColorPalette";

interface TableToolbarProps {
  editor: Editor;
}

export default function TableToolbar({ editor }: TableToolbarProps) {
  const [showColors, setShowColors] = useState(false);
  if (!editor.isActive("table")) return null;

  const keep = (e: React.MouseEvent) => e.preventDefault();
  const buttons: Array<{ title: string; icon: React.ReactNode; run: () => void; danger?: boolean; divider?: boolean }> = [
    { title: "Add column after", icon: <><Columns3 size={14} /><Plus size={10} /></>, run: () => editor.chain().focus().addColumnAfter().run() },
    { title: "Add row after", icon: <><Rows3 size={14} /><Plus size={10} /></>, run: () => editor.chain().focus().addRowAfter().run() },
    { title: "Delete column", icon: <><Columns3 size={14} /><Minus size={10} /></>, run: () => editor.chain().focus().deleteColumn().run(), divider: true },
    { title: "Delete row", icon: <><Rows3 size={14} /><Minus size={10} /></>, run: () => editor.chain().focus().deleteRow().run() },
    { title: "Toggle header row", icon: <PanelTop size={14} />, run: () => editor.chain().focus().toggleHeaderRow().run(), divider: true },
    { title: "Toggle header column", icon: <PanelLeft size={14} />, run: () => editor.chain().focus().toggleHeaderColumn().run() },
    { title: "Merge cells", icon: <MergeIcon size={14} />, run: () => editor.chain().focus().mergeCells().run(), divider: true },
    { title: "Split cell", icon: <SplitIcon size={14} />, run: () => editor.chain().focus().splitCell().run() },
  ];

  return (
    <div className="ihub-te-table-toolbar" onMouseDown={keep}>
      {buttons.map((b) => (
        <React.Fragment key={b.title}>
          {b.divider && <span className="ihub-te-table-toolbar-divider" />}
          <button type="button" onClick={b.run} className="ihub-te-table-toolbar-btn" title={b.title} aria-label={b.title}>
            {b.icon}
          </button>
        </React.Fragment>
      ))}
      <span className="ihub-te-table-toolbar-divider" />
      <span className="ihub-te-table-toolbar-color">
        <button type="button" onClick={() => setShowColors((v) => !v)} className={`ihub-te-table-toolbar-btn${showColors ? " is-active" : ""}`} title="Cell colour" aria-label="Cell colour">
          <PaintBucket size={14} />
        </button>
        {showColors && (
          <div className="ihub-te-block-popover ihub-te-table-toolbar-popover">
            <ColorPalette
              label="Cell background"
              colors={BACKGROUND_COLORS}
              value={editor.getAttributes("tableCell").backgroundColor || editor.getAttributes("tableHeader").backgroundColor}
              onChange={(color) => {
                editor.chain().focus().setCellAttribute("backgroundColor", color).run();
                setShowColors(false);
              }}
            />
          </div>
        )}
      </span>
      <span className="ihub-te-table-toolbar-divider" />
      <button type="button" onClick={() => editor.chain().focus().deleteTable().run()} className="ihub-te-table-toolbar-btn ihub-te-table-toolbar-btn--danger" title="Delete table" aria-label="Delete table">
        <Trash2 size={14} />
      </button>
    </div>
  );
}
