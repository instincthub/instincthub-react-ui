import { Fragment, type Node as PMNode } from "@tiptap/pm/model";
import { NodeSelection, TextSelection, type EditorState, type Transaction } from "@tiptap/pm/state";

/** Blocks whose children can be dragged in and out (their content is `block+`). */
export const CONTAINER_TYPES = new Set(["sectionBanner", "callout", "toggleBlock"]);

/** First child index that can hold a moved block (a toggle's summary stays first). */
export function firstMovableIndex(parent: PMNode): number {
  return parent.type.name === "toggleBlock" ? 1 : 0;
}

export interface TopBlock {
  node: PMNode;
  /** Position directly before the block. */
  pos: number;
  index: number;
}

/** The top-level block containing `pos`. */
export function topBlockAt(doc: PMNode, pos: number): TopBlock | null {
  if (!doc.childCount) return null;
  const clamped = Math.max(0, Math.min(pos, doc.content.size));
  const index = Math.min(doc.resolve(clamped).index(0), doc.childCount - 1);
  return topBlockByIndex(doc, index);
}

/** The top-level block at child `index`. */
export function topBlockByIndex(doc: PMNode, index: number): TopBlock | null {
  if (index < 0 || index >= doc.childCount) return null;
  let offset = 0;
  for (let i = 0; i < index; i += 1) offset += doc.child(i).nodeSize;
  return { node: doc.child(index), pos: offset, index };
}

/**
 * The innermost block around the selection that can be moved: a top-level block
 * or a direct child of a container (never a toggle's summary line).
 */
export function movableBlockAt(state: EditorState): number | null {
  const { selection } = state;
  if (selection instanceof NodeSelection) return selection.from;
  const $from = selection.$from;
  for (let depth = $from.depth; depth >= 1; depth -= 1) {
    const node = $from.node(depth);
    const parent = $from.node(depth - 1);
    if (node.type.name === "toggleSummary") continue;
    if (depth === 1 || CONTAINER_TYPES.has(parent.type.name)) return $from.before(depth);
  }
  return null;
}

/** Put the caret (or a node selection for atoms) inside the block at `pos`. */
function selectBlock(tr: Transaction, pos: number): Transaction {
  const node = tr.doc.nodeAt(pos);
  if (!node) return tr;
  if (node.isTextblock) return tr.setSelection(TextSelection.create(tr.doc, pos + 1));
  if (NodeSelection.isSelectable(node)) return tr.setSelection(NodeSelection.create(tr.doc, pos));
  return tr.setSelection(TextSelection.near(tr.doc.resolve(pos + 1)));
}

/** Can `node` be placed at the gap `pos` (a position between blocks)? */
export function canDropAt(doc: PMNode, node: PMNode, pos: number): boolean {
  if (pos < 0 || pos > doc.content.size) return false;
  const $pos = doc.resolve(pos);
  // Must be a gap between blocks, not a position inside text.
  if ($pos.parent.inlineContent) return false;
  if ($pos.index() < firstMovableIndex($pos.parent)) return false;
  return $pos.parent.canReplace($pos.index(), $pos.index(), Fragment.from(node));
}

/**
 * Move the block at `fromPos` to the gap at `toPos` (any depth: into or out of
 * banners, callouts and toggles). Returns null for no-op or invalid drops,
 * including dropping a container into itself.
 */
export function moveBlock(state: EditorState, fromPos: number, toPos: number): Transaction | null {
  const node = state.doc.nodeAt(fromPos);
  if (!node) return null;
  const end = fromPos + node.nodeSize;
  if (toPos >= fromPos && toPos <= end) return null;
  if (!canDropAt(state.doc, node, toPos)) return null;
  const tr = state.tr.delete(fromPos, end);
  const target = tr.mapping.map(toPos);
  tr.insert(target, node);
  return selectBlock(tr, target).scrollIntoView();
}

/** Swap a block with its previous (-1) or next (+1) sibling inside the same parent. */
export function moveBlockSibling(state: EditorState, pos: number, direction: -1 | 1): Transaction | null {
  const $pos = state.doc.resolve(pos);
  const parent = $pos.parent;
  const index = $pos.index();
  const target = direction === -1 ? index - 1 : index + 2;
  if (target < firstMovableIndex(parent) || target > parent.childCount) return null;
  return moveBlock(state, pos, $pos.posAtIndex(target));
}

export function duplicateBlock(state: EditorState, pos: number): Transaction | null {
  const node = state.doc.nodeAt(pos);
  if (!node) return null;
  const at = pos + node.nodeSize;
  const tr = state.tr.insert(at, node.copy(node.content));
  return selectBlock(tr, at).scrollIntoView();
}

export function deleteBlock(state: EditorState, pos: number): Transaction | null {
  const node = state.doc.nodeAt(pos);
  if (!node) return null;
  const tr = state.tr.delete(pos, pos + node.nodeSize);
  // Never leave the document empty.
  if (tr.doc.childCount === 0) tr.insert(0, state.schema.nodes.paragraph.create());
  const $at = tr.doc.resolve(Math.min(tr.mapping.map(pos), tr.doc.content.size));
  return tr.setSelection(TextSelection.near($at)).scrollIntoView();
}

/** Insert an empty paragraph after the block and put the caret in it. */
export function insertParagraphAfterBlock(state: EditorState, pos: number): Transaction | null {
  const node = state.doc.nodeAt(pos);
  if (!node) return null;
  const at = pos + node.nodeSize;
  const tr = state.tr.insert(at, state.schema.nodes.paragraph.create());
  return tr.setSelection(TextSelection.create(tr.doc, at + 1)).scrollIntoView();
}

// ---- Top-level (index-based) wrappers ----

/**
 * Move the top-level block at `from` so it lands before the block currently at
 * `to` (`to === childCount` means the end). Returns null for a no-op drop.
 */
export function moveTopBlockTo(state: EditorState, from: number, to: number): Transaction | null {
  const block = topBlockByIndex(state.doc, from);
  if (!block || to < 0 || to > state.doc.childCount) return null;
  const toPos = to === state.doc.childCount ? state.doc.content.size : topBlockByIndex(state.doc, to)!.pos;
  return moveBlock(state, block.pos, toPos);
}

/** Swap the top-level block at `index` with its neighbour above (-1) or below (+1). */
export function moveTopBlock(state: EditorState, index: number, direction: -1 | 1): Transaction | null {
  const block = topBlockByIndex(state.doc, index);
  return block ? moveBlockSibling(state, block.pos, direction) : null;
}

export function duplicateTopBlock(state: EditorState, index: number): Transaction | null {
  const block = topBlockByIndex(state.doc, index);
  return block ? duplicateBlock(state, block.pos) : null;
}

export function deleteTopBlock(state: EditorState, index: number): Transaction | null {
  const block = topBlockByIndex(state.doc, index);
  return block ? deleteBlock(state, block.pos) : null;
}

export function insertParagraphAfter(state: EditorState, index: number): Transaction | null {
  const block = topBlockByIndex(state.doc, index);
  return block ? insertParagraphAfterBlock(state, block.pos) : null;
}
