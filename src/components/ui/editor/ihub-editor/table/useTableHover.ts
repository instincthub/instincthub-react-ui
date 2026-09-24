"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Editor } from "@tiptap/react";
import { TableMap } from "@tiptap/pm/tables";
import { findTableAt } from "./tableOps";

export interface Box {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface TableTarget {
  tablePos: number;
  row: number;
  col: number;
  rows: number;
  cols: number;
  table: Box;
  cell: Box;
}

function relativeBox(rect: DOMRect, container: HTMLElement): Box {
  const base = container.getBoundingClientRect();
  return {
    top: rect.top - base.top + container.scrollTop,
    left: rect.left - base.left + container.scrollLeft,
    width: rect.width,
    height: rect.height,
  };
}

/** Resolve the table / row / column under a DOM cell. */
export function targetFromCell(editor: Editor, cellEl: HTMLElement, container: HTMLElement): TableTarget | null {
  const view = editor.view;
  let inside: number;
  try {
    inside = view.posAtDOM(cellEl, 0);
  } catch {
    return null;
  }
  const ref = findTableAt(view.state.doc, inside);
  if (!ref) return null;
  const $pos = view.state.doc.resolve(inside);
  let cellStart: number | null = null;
  for (let depth = $pos.depth; depth > 0; depth -= 1) {
    const role = $pos.node(depth).type.spec.tableRole;
    if (role === "cell" || role === "header_cell") {
      cellStart = $pos.before(depth);
      break;
    }
  }
  if (cellStart === null) return null;
  const map = TableMap.get(ref.node);
  const rect = map.findCell(cellStart - ref.pos - 1);
  const tableEl = cellEl.closest("table");
  const wrapper = (tableEl?.parentElement as HTMLElement) || tableEl;
  if (!tableEl || !wrapper) return null;
  const tableRect = tableEl.getBoundingClientRect();
  const wrapRect = wrapper.getBoundingClientRect();
  const visible = new DOMRect(tableRect.left, tableRect.top, Math.min(tableRect.right, wrapRect.right) - tableRect.left, tableRect.height);
  return {
    tablePos: ref.pos,
    row: rect.top,
    col: rect.left,
    rows: map.height,
    cols: map.width,
    table: relativeBox(visible, container),
    cell: relativeBox(cellEl.getBoundingClientRect(), container),
  };
}

/** Track which table cell the pointer (or caret) is on. `freeze` pins the target while a menu is open. */
export default function useTableHover(editor: Editor, containerRef: React.RefObject<HTMLDivElement | null>, freeze: boolean) {
  const [target, setTarget] = useState<TableTarget | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const freezeRef = useRef(freeze);
  freezeRef.current = freeze;

  const cancelHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = null;
  }, []);

  const scheduleHide = useCallback(() => {
    cancelHide();
    hideTimer.current = setTimeout(() => {
      if (!freezeRef.current) setTarget(null);
    }, 300);
  }, [cancelHide]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !editor) return;

    const onMove = (event: MouseEvent) => {
      if (freezeRef.current) return;
      const el = event.target as HTMLElement;
      if (el.closest(".ihub-te-table-controls")) {
        cancelHide();
        return;
      }
      const cell = el.closest("td, th") as HTMLElement | null;
      if (!cell || !editor.view.dom.contains(cell)) {
        scheduleHide();
        return;
      }
      cancelHide();
      const next = targetFromCell(editor, cell, container);
      setTarget((prev) =>
        prev && next && prev.tablePos === next.tablePos && prev.row === next.row && prev.col === next.col && prev.table.height === next.table.height && prev.table.width === next.table.width
          ? prev
          : next
      );
    };

    const refreshFromSelection = (clearIfOutside: boolean) => {
      if (freezeRef.current) return;
      const { from } = editor.state.selection;
      if (!findTableAt(editor.state.doc, from)) {
        if (clearIfOutside) setTarget(null);
        return;
      }
      const domAt = editor.view.domAtPos(from).node as HTMLElement;
      const cell = (domAt.nodeType === 1 ? domAt : domAt.parentElement)?.closest("td, th") as HTMLElement | null;
      if (cell) setTarget(targetFromCell(editor, cell, container));
    };

    const onSelection = () => refreshFromSelection(false);
    // Rows/columns change size after edits, so re-measure once the DOM has updated.
    const onDocChange = () => requestAnimationFrame(() => refreshFromSelection(true));

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", scheduleHide);
    editor.on("selectionUpdate", onSelection);
    editor.on("update", onDocChange);
    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", scheduleHide);
      editor.off("selectionUpdate", onSelection);
      editor.off("update", onDocChange);
      cancelHide();
    };
  }, [editor, containerRef, cancelHide, scheduleHide]);

  return { target, setTarget, cancelHide };
}
