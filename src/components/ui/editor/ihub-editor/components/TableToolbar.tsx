"use client";
import React from "react";
import { Editor } from "@tiptap/react";
import {
  Plus,
  Minus,
  Rows3,
  Columns3,
  Trash2,
  MergeIcon,
  SplitIcon,
} from "lucide-react";

interface TableToolbarProps {
  editor: Editor;
}

export default function TableToolbar({ editor }: TableToolbarProps) {
  if (!editor.isActive("table")) return null;

  return (
    <div className="ihub-te-table-toolbar">
      <button
        type="button"
        onClick={() => editor.chain().focus().addColumnAfter().run()}
        className="ihub-te-table-toolbar-btn"
        title="Add column after"
      >
        <Columns3 size={14} />
        <Plus size={10} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().addRowAfter().run()}
        className="ihub-te-table-toolbar-btn"
        title="Add row after"
      >
        <Rows3 size={14} />
        <Plus size={10} />
      </button>

      <span className="ihub-te-table-toolbar-divider" />

      <button
        type="button"
        onClick={() => editor.chain().focus().deleteColumn().run()}
        className="ihub-te-table-toolbar-btn"
        title="Delete column"
      >
        <Columns3 size={14} />
        <Minus size={10} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().deleteRow().run()}
        className="ihub-te-table-toolbar-btn"
        title="Delete row"
      >
        <Rows3 size={14} />
        <Minus size={10} />
      </button>

      <span className="ihub-te-table-toolbar-divider" />

      <button
        type="button"
        onClick={() => editor.chain().focus().mergeCells().run()}
        className="ihub-te-table-toolbar-btn"
        title="Merge cells"
      >
        <MergeIcon size={14} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().splitCell().run()}
        className="ihub-te-table-toolbar-btn"
        title="Split cell"
      >
        <SplitIcon size={14} />
      </button>

      <span className="ihub-te-table-toolbar-divider" />

      <button
        type="button"
        onClick={() => editor.chain().focus().deleteTable().run()}
        className="ihub-te-table-toolbar-btn ihub-te-table-toolbar-btn--danger"
        title="Delete table"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
