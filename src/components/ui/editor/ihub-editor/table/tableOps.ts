import type { Node as PMNode } from "@tiptap/pm/model";
import type { EditorState, Transaction } from "@tiptap/pm/state";
import { CellSelection, TableMap } from "@tiptap/pm/tables";

export type Axis = "row" | "column";

export interface TableRef {
  node: PMNode;
  /** Position directly before the table node. */
  pos: number;
}

/** Find the table node at (or wrapping) `pos`. */
export function findTableAt(doc: PMNode, pos: number): TableRef | null {
  const $pos = doc.resolve(Math.max(0, Math.min(pos, doc.content.size)));
  for (let depth = $pos.depth; depth > 0; depth -= 1) {
    const node = $pos.node(depth);
    if (node.type.spec.tableRole === "table") return { node, pos: $pos.before(depth) };
  }
  return null;
}

export function hasMergedCells(table: PMNode): boolean {
  let merged = false;
  table.descendants((node) => {
    if (merged) return false;
    if ((node.attrs.colspan ?? 1) > 1 || (node.attrs.rowspan ?? 1) > 1) merged = true;
    return node.type.spec.tableRole === "row";
  });
  return merged;
}

export function tableSize(table: PMNode): { rows: number; cols: number } {
  const map = TableMap.get(table);
  return { rows: map.height, cols: map.width };
}

/** Absolute position of the cell at (row, col). */
export function cellPos(ref: TableRef, row: number, col: number): number {
  const map = TableMap.get(ref.node);
  return ref.pos + 1 + map.positionAt(row, col, ref.node);
}

function moveItem<T>(items: T[], from: number, to: number): T[] {
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function childrenOf(node: PMNode): PMNode[] {
  const out: PMNode[] = [];
  node.forEach((child) => out.push(child));
  return out;
}

function replaceTable(state: EditorState, ref: TableRef, rows: PMNode[], focus: { row: number; col: number; axis: Axis }): Transaction {
  const table = ref.node.type.create(ref.node.attrs, rows, ref.node.marks);
  const tr = state.tr.replaceWith(ref.pos, ref.pos + ref.node.nodeSize, table);
  const newRef = { node: table, pos: ref.pos };
  const $cell = tr.doc.resolve(cellPos(newRef, focus.row, focus.col));
  tr.setSelection(focus.axis === "row" ? CellSelection.rowSelection($cell) : CellSelection.colSelection($cell));
  return tr;
}

/** Move a row or column to a new index. Returns null when not possible (merged cells / out of range). */
export function moveTableLine(state: EditorState, ref: TableRef, axis: Axis, from: number, to: number): Transaction | null {
  const { rows, cols } = tableSize(ref.node);
  const limit = axis === "row" ? rows : cols;
  if (from === to || to < 0 || to >= limit || from < 0 || from >= limit) return null;
  if (hasMergedCells(ref.node)) return null;

  const rowNodes = childrenOf(ref.node);
  if (axis === "row") {
    return replaceTable(state, ref, moveItem(rowNodes, from, to), { row: to, col: 0, axis });
  }
  const moved = rowNodes.map((row) => row.type.create(row.attrs, moveItem(childrenOf(row), from, to), row.marks));
  return replaceTable(state, ref, moved, { row: 0, col: to, axis });
}

/** Insert a copy of a row / column right after it. */
export function duplicateTableLine(state: EditorState, ref: TableRef, axis: Axis, index: number): Transaction | null {
  if (hasMergedCells(ref.node)) return null;
  const rowNodes = childrenOf(ref.node);
  if (axis === "row") {
    if (!rowNodes[index]) return null;
    const next = [...rowNodes.slice(0, index + 1), rowNodes[index].copy(rowNodes[index].content), ...rowNodes.slice(index + 1)];
    return replaceTable(state, ref, next, { row: index + 1, col: 0, axis });
  }
  const moved = rowNodes.map((row) => {
    const cells = childrenOf(row);
    if (!cells[index]) return row;
    const next = [...cells.slice(0, index + 1), cells[index].copy(cells[index].content), ...cells.slice(index + 1)];
    return row.type.create(row.attrs, next, row.marks);
  });
  return replaceTable(state, ref, moved, { row: 0, col: index + 1, axis });
}

/** Set an attribute (e.g. backgroundColor) on every cell in a row or column. */
export function setLineCellAttr(state: EditorState, ref: TableRef, axis: Axis, index: number, attr: string, value: unknown): Transaction {
  const map = TableMap.get(ref.node);
  const tr = state.tr;
  const cells = axis === "row" ? map.cellsInRect({ left: 0, right: map.width, top: index, bottom: index + 1 }) : map.cellsInRect({ left: index, right: index + 1, top: 0, bottom: map.height });
  cells.forEach((relative) => {
    const pos = ref.pos + 1 + relative;
    const cell = tr.doc.nodeAt(pos);
    if (cell && cell.type.spec.attrs && attr in cell.attrs) tr.setNodeMarkup(pos, undefined, { ...cell.attrs, [attr]: value });
  });
  return tr;
}

/** Select an entire row or column so prosemirror-tables commands act on it. */
export function selectTableLine(state: EditorState, ref: TableRef, axis: Axis, index: number): Transaction {
  const $cell = state.doc.resolve(axis === "row" ? cellPos(ref, index, 0) : cellPos(ref, 0, index));
  return state.tr.setSelection(axis === "row" ? CellSelection.rowSelection($cell) : CellSelection.colSelection($cell));
}
