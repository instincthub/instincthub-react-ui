import { afterEach, describe, expect, it } from "vitest";
import type { Editor } from "@tiptap/core";
import type { Node as PMNode } from "@tiptap/pm/model";
import { makeEditor } from "./helpers";
import { canDropAt, moveBlock, moveBlockSibling, movableBlockAt, topBlockByIndex } from "../blocks/blockOps";

let editor: Editor;
afterEach(() => editor?.destroy());

const DOC =
  "<p>loose</p>" +
  '<div data-type="callout" data-variant="info"><div class="ihub-te-callout-body"><p>c1</p><p>c2</p></div></div>' +
  '<details open class="ihub-te-toggle"><summary>Title</summary><p>t1</p></details>' +
  '<div data-type="section-banner"><h2>Banner</h2></div>';

/** Compact outline: top-level names, with container children in brackets. */
function outline(ed: Editor): string {
  const label = (n: PMNode): string => {
    if (["callout", "toggleBlock", "sectionBanner"].includes(n.type.name)) {
      const kids: string[] = [];
      n.forEach((c) => kids.push(c.type.name === "toggleSummary" ? `#${c.textContent}` : c.textContent || c.type.name));
      return `${n.type.name}[${kids.join(",")}]`;
    }
    return n.textContent || n.type.name;
  };
  const out: string[] = [];
  ed.state.doc.forEach((n) => out.push(label(n)));
  return out.join(" | ");
}

/** Position of the n-th child (skipping nothing) inside the top-level block at `index`. */
function childPos(ed: Editor, index: number, child: number): number {
  const block = topBlockByIndex(ed.state.doc, index)!;
  let pos = block.pos + 1;
  for (let i = 0; i < child; i += 1) pos += block.node.child(i).nodeSize;
  return pos;
}

describe("dropping blocks into containers", () => {
  it("moves a top-level block into a callout between its children", () => {
    editor = makeEditor(DOC);
    const loose = topBlockByIndex(editor.state.doc, 0)!.pos;
    editor.view.dispatch(moveBlock(editor.state, loose, childPos(editor, 1, 1))!);
    expect(outline(editor)).toBe("callout[c1,loose,c2] | toggleBlock[#Title,t1] | sectionBanner[Banner]");
  });

  it("drops into a toggle after its title, never above it", () => {
    editor = makeEditor(DOC);
    const loose = topBlockByIndex(editor.state.doc, 0)!.pos;
    const node = editor.state.doc.nodeAt(loose)!;
    expect(canDropAt(editor.state.doc, node, childPos(editor, 2, 0))).toBe(false);
    editor.view.dispatch(moveBlock(editor.state, loose, childPos(editor, 2, 1))!);
    expect(outline(editor)).toBe("callout[c1,c2] | toggleBlock[#Title,loose,t1] | sectionBanner[Banner]");
  });

  it("drops at the end of a banner", () => {
    editor = makeEditor(DOC);
    const loose = topBlockByIndex(editor.state.doc, 0)!.pos;
    const banner = topBlockByIndex(editor.state.doc, 3)!;
    editor.view.dispatch(moveBlock(editor.state, loose, banner.pos + banner.node.nodeSize - 1)!);
    expect(outline(editor)).toBe("callout[c1,c2] | toggleBlock[#Title,t1] | sectionBanner[Banner,loose]");
  });

  it("drags a block back out of a container to the top level", () => {
    editor = makeEditor(DOC);
    editor.view.dispatch(moveBlock(editor.state, childPos(editor, 1, 0), 0)!);
    expect(outline(editor)).toBe("c1 | loose | callout[c2] | toggleBlock[#Title,t1] | sectionBanner[Banner]");
  });

  it("keeps a container valid when its last block is dragged out", () => {
    editor = makeEditor(DOC);
    editor.view.dispatch(moveBlock(editor.state, childPos(editor, 3, 0), 0)!);
    const banner = editor.state.doc.lastChild!;
    expect(banner.type.name).toBe("sectionBanner");
    expect(banner.childCount).toBeGreaterThan(0);
    expect(() => editor.state.doc.check()).not.toThrow();
  });

  it("refuses to drop a container into itself", () => {
    editor = makeEditor(DOC);
    const callout = topBlockByIndex(editor.state.doc, 1)!.pos;
    expect(moveBlock(editor.state, callout, childPos(editor, 1, 1))).toBeNull();
  });

  it("moves blocks up/down within their container with the keyboard helpers", () => {
    editor = makeEditor(DOC);
    editor.commands.setTextSelection(childPos(editor, 1, 1) + 1); // caret in "c2"
    const pos = movableBlockAt(editor.state)!;
    editor.view.dispatch(moveBlockSibling(editor.state, pos, -1)!);
    expect(outline(editor)).toBe("loose | callout[c2,c1] | toggleBlock[#Title,t1] | sectionBanner[Banner]");
    // First block in the callout can't move up past the container edge.
    expect(moveBlockSibling(editor.state, movableBlockAt(editor.state)!, -1)).toBeNull();
  });

  it("treats a caret in a toggle's title as the whole toggle", () => {
    editor = makeEditor(DOC);
    editor.commands.setTextSelection(childPos(editor, 2, 0) + 1);
    expect(movableBlockAt(editor.state)).toBe(topBlockByIndex(editor.state.doc, 2)!.pos);
  });
});
