"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Editor } from "@tiptap/react";
import { moveBlock } from "./blockOps";
import { blockDragKey } from "./BlockKeymap";
import { dropTargetAt, type DropTarget } from "./blockLayout";

export { computeDropIndex, indicatorY } from "./blockLayout";

export interface DropIndicator {
  top: number;
  left: number;
  width: number;
}

export interface BlockDragState {
  fromPos: number;
  indicator: DropIndicator | null;
  ghost: { x: number; y: number; width: number };
}

const DRAG_THRESHOLD = 4;
const EDGE = 48;
const MAX_SCROLL_STEP = 18;

/**
 * Notion-style block dragging driven by pointer events (HTML5 drag and drop
 * from a grip outside the contenteditable does not work with a real mouse):
 * a ghost follows the pointer, the source block dims, a line marks the drop
 * gap — at the top level or inside a banner / callout / toggle — and the area
 * auto-scrolls near its edges. Esc cancels.
 */
export default function useBlockDrag(editor: Editor, containerRef: React.RefObject<HTMLDivElement | null>) {
  const [drag, setDrag] = useState<BlockDragState | null>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const didDragRef = useRef(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => () => cleanupRef.current?.(), []);

  const markDragging = useCallback(
    (pos: number | null) => {
      if (editor.isDestroyed) return;
      editor.view.dispatch(editor.state.tr.setMeta(blockDragKey, pos).setMeta("addToHistory", false));
    },
    [editor]
  );

  const start = useCallback(
    (event: React.PointerEvent, fromPos: number, sourceEl: HTMLElement) => {
      if (event.button !== 0 || !editor.isEditable) return;
      event.preventDefault();
      const container = containerRef.current;
      if (!container) return;

      // Capture before the drag decoration redraws the block.
      const ghostWidth = Math.min(sourceEl.offsetWidth, 520);
      const origin = { x: event.clientX, y: event.clientY };
      let pointer = { ...origin };
      let active = false;
      let target: DropTarget | null = null;
      let raf = 0;
      didDragRef.current = false;

      const measure = () => {
        const base = container.getBoundingClientRect();
        target = dropTargetAt(editor.view, pointer.y, fromPos);
        setDrag({
          fromPos,
          indicator: target
            ? {
                top: target.y - base.top + container.scrollTop - 1,
                left: target.left - base.left + container.scrollLeft,
                width: target.width,
              }
            : null,
          ghost: {
            x: pointer.x + 12,
            y: pointer.y - 12,
            width: Math.max(160, Math.min(ghostWidth, window.innerWidth - pointer.x - 24)),
          },
        });
      };

      // Scroll the editor area (or the page) while the pointer is near an edge.
      const autoScroll = () => {
        const box = container.getBoundingClientRect();
        const top = Math.max(box.top, 0);
        const bottom = Math.min(box.bottom, window.innerHeight);
        let step = 0;
        if (pointer.y < top + EDGE) step = -MAX_SCROLL_STEP * ((top + EDGE - pointer.y) / EDGE);
        else if (pointer.y > bottom - EDGE) step = MAX_SCROLL_STEP * ((pointer.y - (bottom - EDGE)) / EDGE);
        if (step) {
          const before = container.scrollTop;
          container.scrollTop += step;
          if (container.scrollTop === before) window.scrollBy(0, step);
          measure();
        }
        raf = requestAnimationFrame(autoScroll);
      };

      const begin = () => {
        active = true;
        didDragRef.current = true;
        const ghost = ghostRef.current;
        if (ghost) {
          const clone = sourceEl.cloneNode(true) as HTMLElement;
          clone.classList.remove("ProseMirror-selectednode", "ihub-te-block-dragging");
          ghost.replaceChildren(clone);
        }
        markDragging(fromPos);
        document.body.classList.add("ihub-te-body-dragging");
        raf = requestAnimationFrame(autoScroll);
      };

      const onMove = (e: PointerEvent) => {
        pointer = { x: e.clientX, y: e.clientY };
        if (!active) {
          if (Math.hypot(pointer.x - origin.x, pointer.y - origin.y) < DRAG_THRESHOLD) return;
          begin();
        }
        measure();
      };

      const finish = (commit: boolean) => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onCancel);
        window.removeEventListener("keydown", onKey, true);
        if (active) markDragging(null);
        document.body.classList.remove("ihub-te-body-dragging");
        ghostRef.current?.replaceChildren();
        cleanupRef.current = null;
        setDrag(null);
        const drop = target as DropTarget | null;
        if (commit && active && drop) {
          const tr = moveBlock(editor.state, fromPos, drop.pos);
          if (tr) editor.view.dispatch(tr);
          editor.commands.focus();
        }
      };

      const onUp = () => finish(true);
      const onCancel = () => finish(false);
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          finish(false);
        }
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onCancel);
      window.addEventListener("keydown", onKey, true);
      cleanupRef.current = () => finish(false);
    },
    [editor, containerRef, markDragging]
  );

  return { drag, start, ghostRef, didDragRef };
}
