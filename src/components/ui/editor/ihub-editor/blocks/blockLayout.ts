import type { EditorView } from "@tiptap/pm/view";
import type { Node as PMNode } from "@tiptap/pm/model";
import { CONTAINER_TYPES, canDropAt } from "./blockOps";

export interface LaidOutBlock {
  pos: number;
  node: PMNode;
  el: HTMLElement;
  rect: DOMRect;
}

export interface Rect {
  top: number;
  bottom: number;
}

/** Pixels inside a container's first/last child that still count as "inside". */
const INNER_EDGE = 6;

/** Insertion index for pointer Y: before the first block whose midpoint is below it. */
export function computeDropIndex(rects: Rect[], y: number): number {
  for (let i = 0; i < rects.length; i += 1) {
    if (y < (rects[i].top + rects[i].bottom) / 2) return i;
  }
  return rects.length;
}

/** Y (viewport) of the line between blocks for a drop index. */
export function indicatorY(rects: Rect[], index: number): number {
  if (!rects.length) return 0;
  if (index <= 0) return rects[0].top - 4;
  if (index >= rects.length) return rects[rects.length - 1].bottom + 4;
  return (rects[index - 1].bottom + rects[index].top) / 2;
}

/** Movable child blocks of `parent` (content starting at `start`) with their DOM. */
export function childBlocks(view: EditorView, parent: PMNode, start: number): LaidOutBlock[] {
  const out: LaidOutBlock[] = [];
  parent.forEach((node, offset) => {
    if (node.type.name === "toggleSummary") return;
    const pos = start + offset;
    const dom = view.nodeDOM(pos);
    if (dom instanceof HTMLElement) out.push({ pos, node, el: dom, rect: dom.getBoundingClientRect() });
  });
  return out;
}

function nearest(blocks: LaidOutBlock[], y: number): LaidOutBlock | null {
  let best: LaidOutBlock | null = null;
  let distance = Infinity;
  blocks.forEach((block) => {
    const { top, bottom } = block.rect;
    const d = y < top ? top - y : y > bottom ? y - bottom : 0;
    if (d < distance) {
      distance = d;
      best = block;
    }
  });
  return best;
}

/** Children of a container when the pointer is over its inner content, else null. */
function innerLevel(view: EditorView, block: LaidOutBlock, y: number): LaidOutBlock[] | null {
  const { node } = block;
  if (!CONTAINER_TYPES.has(node.type.name)) return null;
  if (node.type.name === "toggleBlock" && !node.attrs.open) return null;
  const inner = childBlocks(view, node, block.pos + 1);
  if (!inner.length) return null;
  const top = inner[0].rect.top - INNER_EDGE;
  const bottom = inner[inner.length - 1].rect.bottom + INNER_EDGE;
  return y >= top && y <= bottom ? inner : null;
}

/**
 * The list of sibling blocks the pointer is at: the page's top-level blocks,
 * or — when the pointer is over a banner / callout / open toggle's content —
 * that container's children (recursively). `skipPos` stops descent into the
 * block being dragged, so it can't be dropped into itself.
 */
export function levelAt(view: EditorView, y: number, skipPos?: number): LaidOutBlock[] {
  let level = childBlocks(view, view.state.doc, 0);
  for (;;) {
    const hit = nearest(level, y);
    if (!hit || hit.pos === skipPos) return level;
    const inner = innerLevel(view, hit, y);
    if (!inner) return level;
    level = inner;
  }
}

/** The block under the pointer at the deepest level (for the hover handle). */
export function blockAt(view: EditorView, y: number): LaidOutBlock | null {
  return nearest(levelAt(view, y), y);
}

export interface DropTarget {
  /** Gap position the block will be inserted at. */
  pos: number;
  /** Viewport coordinates of the indicator line. */
  y: number;
  left: number;
  width: number;
}

/** Where a drag of the block at `fromPos` would land for pointer Y, or null for a no-op / invalid drop. */
export function dropTargetAt(view: EditorView, y: number, fromPos: number): DropTarget | null {
  const source = view.state.doc.nodeAt(fromPos);
  if (!source) return null;
  const level = levelAt(view, y, fromPos);
  if (!level.length) return null;
  const rects = level.map((b) => b.rect);
  const index = computeDropIndex(rects, y);
  const pos = index < level.length ? level[index].pos : level[level.length - 1].pos + level[level.length - 1].node.nodeSize;
  const end = fromPos + source.nodeSize;
  if (pos >= fromPos && pos <= end) return null;
  if (!canDropAt(view.state.doc, source, pos)) return null;
  const left = Math.min(...rects.map((r) => r.left));
  const right = Math.max(...rects.map((r) => r.right));
  return { pos, y: indicatorY(rects, index), left, width: right - left };
}
