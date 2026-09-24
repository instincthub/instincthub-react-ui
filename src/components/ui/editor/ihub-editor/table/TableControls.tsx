"use client";
import React, { useCallback, useMemo, useState } from "react";
import type { Editor } from "@tiptap/react";
import { GripHorizontal, GripVertical, Plus } from "lucide-react";
import useTableHover, { type TableTarget } from "./useTableHover";
import TableLineMenu, { type LineMenuAction } from "./TableLineMenu";
import {
  type Axis,
  cellPos,
  duplicateTableLine,
  findTableAt,
  hasMergedCells,
  moveTableLine,
  selectTableLine,
  setLineCellAttr,
} from "./tableOps";

interface TableControlsProps {
  editor: Editor;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface OpenMenu {
  axis: Axis;
  index: number;
  top: number;
  left: number;
}

/** Notion-style row/column handles and "+" bars for the table under the pointer. */
export default function TableControls({ editor, containerRef }: TableControlsProps) {
  const [menu, setMenu] = useState<OpenMenu | null>(null);
  const { target, setTarget } = useTableHover(editor, containerRef, Boolean(menu));

  const tableRef = useCallback((t: TableTarget) => findTableAt(editor.state.doc, t.tablePos + 1), [editor]);

  const select = useCallback(
    (t: TableTarget, axis: Axis, index: number) => {
      const ref = tableRef(t);
      if (!ref) return false;
      editor.view.dispatch(selectTableLine(editor.state, ref, axis, index));
      return true;
    },
    [editor, tableRef]
  );

  const addAtEnd = (axis: Axis) => {
    if (!target) return;
    const ref = tableRef(target);
    if (!ref) return;
    const row = axis === "row" ? target.rows - 1 : 0;
    const col = axis === "column" ? target.cols - 1 : 0;
    // Put the caret in the last row/column so add*After targets it.
    editor.chain().focus().setTextSelection(cellPos(ref, row, col) + 2).run();
    if (axis === "row") editor.chain().addRowAfter().run();
    else editor.chain().addColumnAfter().run();
  };

  const actions = useMemo<LineMenuAction | null>(() => {
    if (!menu || !target) return null;
    const { axis, index } = menu;
    const isRow = axis === "row";
    const withSelection = (fn: () => void) => () => {
      if (select(target, axis, index)) fn();
    };
    const applyTr = (build: (ref: NonNullable<ReturnType<typeof tableRef>>) => ReturnType<typeof moveTableLine>) => () => {
      const ref = tableRef(target);
      const tr = ref ? build(ref) : null;
      if (tr) editor.view.dispatch(tr.scrollIntoView());
      editor.commands.focus();
    };
    return {
      insertBefore: withSelection(() => (isRow ? editor.chain().focus().addRowBefore().run() : editor.chain().focus().addColumnBefore().run())),
      insertAfter: withSelection(() => (isRow ? editor.chain().focus().addRowAfter().run() : editor.chain().focus().addColumnAfter().run())),
      moveBefore: applyTr((ref) => moveTableLine(editor.state, ref, axis, index, index - 1)),
      moveAfter: applyTr((ref) => moveTableLine(editor.state, ref, axis, index, index + 1)),
      duplicate: applyTr((ref) => duplicateTableLine(editor.state, ref, axis, index)),
      toggleHeader: withSelection(() => (isRow ? editor.chain().focus().toggleHeaderRow().run() : editor.chain().focus().toggleHeaderColumn().run())),
      setBackground: (color: string | null) => applyTr((ref) => setLineCellAttr(editor.state, ref, axis, index, "backgroundColor", color))(),
      remove: withSelection(() => {
        if (isRow) editor.chain().focus().deleteRow().run();
        else editor.chain().focus().deleteColumn().run();
        setTarget(null);
      }),
    };
  }, [menu, target, select, tableRef, editor, setTarget]);

  if (!target || !editor.isEditable) return null;

  const canMove = (() => {
    const ref = tableRef(target);
    return ref ? !hasMergedCells(ref.node) : false;
  })();

  const openMenu = (axis: Axis) => (e: React.MouseEvent) => {
    e.preventDefault();
    const index = axis === "row" ? target.row : target.col;
    const top = axis === "row" ? target.cell.top : target.table.top + 12;
    const left = axis === "row" ? target.table.left + 12 : target.cell.left;
    setMenu({ axis, index, top, left });
  };

  const handleSize = 22;
  const areaWidth = containerRef.current?.clientWidth ?? Infinity;
  // Keep handles inside the scroll area so overflow doesn't clip them.
  const rowHandleLeft = Math.max(2, target.table.left - handleSize - 2);
  const addColLeft = Math.min(target.table.left + target.table.width + 4, areaWidth - 20);

  return (
    <div className="ihub-te-table-controls" contentEditable={false}>
      <button
        type="button"
        className="ihub-te-table-handle ihub-te-table-handle--col"
        title="Column options"
        style={{ top: target.table.top - handleSize / 2 - 4, left: target.cell.left + target.cell.width / 2 - handleSize / 2 }}
        onMouseDown={openMenu("column")}
      >
        <GripHorizontal size={14} />
      </button>
      <button
        type="button"
        className="ihub-te-table-handle ihub-te-table-handle--row"
        title="Row options"
        style={{ top: target.cell.top + target.cell.height / 2 - handleSize / 2, left: rowHandleLeft }}
        onMouseDown={openMenu("row")}
      >
        <GripVertical size={14} />
      </button>
      <button
        type="button"
        className="ihub-te-table-add ihub-te-table-add--col"
        title="Add column"
        style={{ top: target.table.top, left: addColLeft, height: target.table.height }}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => addAtEnd("column")}
      >
        <Plus size={14} />
      </button>
      <button
        type="button"
        className="ihub-te-table-add ihub-te-table-add--row"
        title="Add row"
        style={{ top: target.table.top + target.table.height + 4, left: target.table.left, width: target.table.width }}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => addAtEnd("row")}
      >
        <Plus size={14} />
      </button>

      {menu && actions && (
        <TableLineMenu
          axis={menu.axis}
          index={menu.index}
          count={menu.axis === "row" ? target.rows : target.cols}
          canMove={canMove}
          position={{ top: menu.top, left: menu.left }}
          actions={actions}
          onClose={() => setMenu(null)}
        />
      )}
    </div>
  );
}
