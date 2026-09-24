"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import type { Editor } from "@tiptap/react";
import { NodeSelection, type Transaction } from "@tiptap/pm/state";
import { ArrowDown, ArrowUp, Copy, GripVertical, Plus, Trash2 } from "lucide-react";
import useDismiss from "../components/blocks/useDismiss";
import { deleteBlock, duplicateBlock, insertParagraphAfterBlock, moveBlockSibling } from "./blockOps";
import { blockAt } from "./blockLayout";
import useBlockDrag from "./useBlockDrag";

interface BlockHandleProps {
  editor: Editor;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface HoverTarget {
  /** Position directly before the hovered block (any depth). */
  pos: number;
  top: number;
  left: number;
  el: HTMLElement;
}

/** True when `pos` is the empty paragraph holding the caret (which shows the floating "+" instead). */
export function isEmptyCaretLine(editor: Editor, pos: number): boolean {
  const { selection } = editor.state;
  if (!selection.empty || selection.$from.depth === 0) return false;
  const node = selection.$from.parent;
  return node.type.name === "paragraph" && node.content.size === 0 && selection.$from.before(selection.$from.depth) === pos;
}

const HANDLE_HEIGHT = 24;
const HANDLE_WIDTH = 44;

/**
 * Notion-style block handle: hover any block (including blocks inside banners,
 * callouts and toggles) for "+" (add a line below) and a grip. Drag the grip to
 * reorder — a line shows where it will land, at the top level or inside a
 * container — or click it for move / duplicate / delete.
 */
export default function BlockHandle({ editor, containerRef }: BlockHandleProps) {
  const [target, setTarget] = useState<HoverTarget | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuOpenRef = useRef(menuOpen);
  menuOpenRef.current = menuOpen;
  useDismiss(rootRef, menuOpen, useCallback(() => setMenuOpen(false), []));
  const { drag, start, ghostRef, didDragRef } = useBlockDrag(editor, containerRef);
  const draggingRef = useRef(false);
  draggingRef.current = Boolean(drag);

  const measure = useCallback(
    (clientY: number): HoverTarget | null => {
      const container = containerRef.current;
      if (!container) return null;
      const hit = blockAt(editor.view, clientY);
      if (!hit) return null;
      // The empty line holding the caret already shows the floating "+" button.
      if (isEmptyCaretLine(editor, hit.pos)) return null;
      const base = container.getBoundingClientRect();
      const rect = hit.rect;
      // Centre on the first line (or the whole block when it's short).
      const lineBox = Math.min(rect.height, 32);
      return {
        pos: hit.pos,
        el: hit.el,
        top: rect.top - base.top + container.scrollTop + (lineBox - HANDLE_HEIGHT) / 2,
        left: Math.max(2, rect.left - base.left + container.scrollLeft - HANDLE_WIDTH - 4),
      };
    },
    [editor, containerRef]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    const onMove = (event: MouseEvent) => {
      if (menuOpenRef.current || draggingRef.current) return;
      if ((event.target as HTMLElement).closest(".ihub-te-block-handle")) return;
      setTarget(measure(event.clientY));
    };
    const onLeave = () => {
      if (!menuOpenRef.current) setTarget(null);
    };
    const onDocChange = () => {
      if (!menuOpenRef.current) setTarget(null);
    };
    // Clicking into the hovered empty line moves the caret without a mousemove:
    // drop the handle so it doesn't sit under the floating "+".
    const onSelection = () => {
      setTarget((current) => (current && isEmptyCaretLine(editor, current.pos) ? null : current));
    };
    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    editor.on("update", onDocChange);
    editor.on("selectionUpdate", onSelection);
    return () => {
      editor.off("selectionUpdate", onSelection);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      editor.off("update", onDocChange);
    };
  }, [editor, containerRef, measure]);

  const run = (build: (pos: number) => Transaction | null) => () => {
    if (!target) return;
    const tr = build(target.pos);
    if (tr) editor.view.dispatch(tr);
    editor.commands.focus();
    setMenuOpen(false);
    setTarget(null);
  };

  const keep = (e: React.MouseEvent) => e.preventDefault();

  const overlays = (
    <>
      {drag?.indicator && (
        <div
          className="ihub-te-drop-indicator"
          style={{ top: drag.indicator.top, left: drag.indicator.left, width: drag.indicator.width }}
          aria-hidden="true"
        />
      )}
      <div
        ref={ghostRef}
        className="ihub-te-drag-ghost ihub-te-content"
        aria-hidden="true"
        style={drag ? { left: drag.ghost.x, top: drag.ghost.y, width: drag.ghost.width } : { display: "none" }}
      />
    </>
  );

  // Same tree shape whether or not the handle shows, so the ghost element isn't remounted mid-drag.
  const showHandle = Boolean(target) && editor.isEditable && !drag && !(target && isEmptyCaretLine(editor, target.pos));
  const canMoveUp = Boolean(target && moveBlockSibling(editor.state, target.pos, -1));
  const canMoveDown = Boolean(target && moveBlockSibling(editor.state, target.pos, 1));

  return (
    <>
      {overlays}
      {showHandle && target && (
        <div ref={rootRef} className="ihub-te-block-handle" style={{ top: target.top, left: target.left }} contentEditable={false}>
          <button type="button" title="Add a line below" aria-label="Add a line below" onMouseDown={keep} onClick={run((pos) => insertParagraphAfterBlock(editor.state, pos))}>
            <Plus size={16} />
          </button>
          <button
            type="button"
            className="ihub-te-block-grip-btn"
            title="Drag to move, click for options"
            aria-label="Drag to move, click for options"
            aria-expanded={menuOpen}
            onPointerDown={(e) => start(e, target.pos, target.el)}
            onClick={() => {
              // A drag ends with a click on the grip; don't open the menu for it.
              if (didDragRef.current) {
                didDragRef.current = false;
                return;
              }
              editor.view.dispatch(editor.state.tr.setSelection(NodeSelection.create(editor.state.doc, target.pos)));
              setMenuOpen((open) => !open);
            }}
          >
            <GripVertical size={16} />
          </button>
          {menuOpen && (
            <div className="ihub-te-block-menu" role="menu" onMouseDown={keep}>
              <button type="button" role="menuitem" disabled={!canMoveUp} onClick={run((pos) => moveBlockSibling(editor.state, pos, -1))}>
                <ArrowUp size={14} /> <span>Move up</span> <kbd>⌘⇧↑</kbd>
              </button>
              <button type="button" role="menuitem" disabled={!canMoveDown} onClick={run((pos) => moveBlockSibling(editor.state, pos, 1))}>
                <ArrowDown size={14} /> <span>Move down</span> <kbd>⌘⇧↓</kbd>
              </button>
              <button type="button" role="menuitem" onClick={run((pos) => duplicateBlock(editor.state, pos))}>
                <Copy size={14} /> <span>Duplicate</span>
              </button>
              <button type="button" role="menuitem" className="is-danger" onClick={run((pos) => deleteBlock(editor.state, pos))}>
                <Trash2 size={14} /> <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
