"use client";
import { useCallback, useRef } from "react";
import type { Editor } from "@tiptap/react";
import { NodeSelection } from "@tiptap/pm/state";

const DRAG_THRESHOLD_PX = 4;

export function isDragGesture(down: { x: number; y: number } | null, up: { x: number; y: number }): boolean {
  if (!down) return false;
  return Math.abs(down.x - up.x) > DRAG_THRESHOLD_PX || Math.abs(down.y - up.y) > DRAG_THRESHOLD_PX;
}

/**
 * Should a click on the editor area move the caret to the end?
 * Only a plain click (not a drag-select) on the blank writing surface below
 * the last block qualifies. Clicks on menus, toolbars, node views or text
 * are left alone. The old handler treated those as "outside content" and
 * called focus("end"), which made the caret jump.
 */
export function shouldFocusEnd(options: {
  target: HTMLElement;
  surface: HTMLElement;
  contentDom: HTMLElement;
  clientY: number;
  dragged: boolean;
  selectionCollapsed: boolean;
}): boolean {
  const { target, surface, contentDom, clientY, dragged, selectionCollapsed } = options;
  if (dragged || !selectionCollapsed) return false;
  const onBlankSurface =
    target === surface || target === contentDom || target.classList.contains("ihub-te-content-wrapper");
  if (!onBlankSurface) return false;
  const last = contentDom.lastElementChild as HTMLElement | null;
  if (!last) return true;
  return clientY > last.getBoundingClientRect().bottom;
}

/** Click-below-content to continue writing, without breaking selections. */
export default function useSurfaceClick(editor: Editor | null, readOnly: boolean) {
  const downRef = useRef<{ x: number; y: number } | null>(null);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    downRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!editor || readOnly) return;
      const dragged = isDragGesture(downRef.current, { x: e.clientX, y: e.clientY });
      downRef.current = null;
      const focusEnd = shouldFocusEnd({
        target: e.target as HTMLElement,
        surface: e.currentTarget,
        contentDom: editor.view.dom as HTMLElement,
        clientY: e.clientY,
        dragged,
        // A selected block (media, button) isn't a text range the click would destroy.
        selectionCollapsed: editor.state.selection.empty || editor.state.selection instanceof NodeSelection,
      });
      if (!focusEnd) return;

      const lastNode = editor.state.doc.lastChild;
      // After a table, media block or banner there is nowhere to type, so add a paragraph.
      if (lastNode?.type.name !== "paragraph") {
        const end = editor.state.doc.content.size;
        editor.chain().insertContentAt(end, { type: "paragraph" }).focus("end").run();
      } else {
        editor.commands.focus("end");
      }
    },
    [editor, readOnly]
  );

  return { onMouseDown, onClick };
}
