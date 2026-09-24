import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import { moveBlockSibling, movableBlockAt } from "./blockOps";

/** Meta: the position of the block being dragged, or null when the drag ends. */
export const blockDragKey = new PluginKey<number | null>("ihubBlockDrag");

/**
 * ⌘⇧↑ / ⌘⇧↓ (Ctrl on Windows) move the current block within its parent (the
 * page, or a banner / callout / toggle), as in Notion,
 * and a decoration dims the block while it is being dragged. A decoration is
 * needed because ProseMirror redraws its own DOM and would drop a class added directly.
 */
const BlockKeymap = Extension.create({
  name: "blockKeymap",

  addKeyboardShortcuts() {
    const move = (direction: -1 | 1) => () => {
      const { state, view } = this.editor;
      const pos = movableBlockAt(state);
      if (pos === null) return false;
      const tr = moveBlockSibling(state, pos, direction);
      if (!tr) return true; // already at the edge: swallow so the caret doesn't jump
      view.dispatch(tr);
      return true;
    };
    return {
      "Mod-Shift-ArrowUp": move(-1),
      "Mod-Shift-ArrowDown": move(1),
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin<number | null>({
        key: blockDragKey,
        state: {
          init: () => null,
          apply: (tr, value) => {
            const meta = tr.getMeta(blockDragKey);
            if (meta !== undefined) return meta as number | null;
            return value === null ? null : tr.mapping.map(value);
          },
        },
        props: {
          decorations: (state) => {
            const pos = blockDragKey.getState(state);
            if (pos === null || pos === undefined) return null;
            const node = state.doc.nodeAt(pos);
            if (!node) return null;
            return DecorationSet.create(state.doc, [
              Decoration.node(pos, pos + node.nodeSize, { class: "ihub-te-block-dragging" }),
            ]);
          },
        },
      }),
    ];
  },
});

export default BlockKeymap;
