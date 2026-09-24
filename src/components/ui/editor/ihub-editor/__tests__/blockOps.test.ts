import { afterEach, describe, expect, it } from "vitest";
import type { Editor } from "@tiptap/core";
import { TextSelection } from "@tiptap/pm/state";
import { makeEditor } from "./helpers";
import { computeDropIndex, indicatorY } from "../blocks/useBlockDrag";
import { deleteTopBlock, duplicateTopBlock, insertParagraphAfter, moveTopBlock, moveTopBlockTo, topBlockAt } from "../blocks/blockOps";

let editor: Editor;
afterEach(() => editor?.destroy());

const DOC = "<h2>Title</h2><p>one</p><p>two</p><table><tbody><tr><td><p>cell</p></td></tr></tbody></table>";
const order = (ed: Editor) => {
  const out: string[] = [];
  ed.state.doc.forEach((n) => out.push(n.type.name === "table" ? "table" : n.textContent));
  return out;
};

describe("block operations", () => {
  it("finds the top-level block around a position", () => {
    editor = makeEditor(DOC);
    expect(topBlockAt(editor.state.doc, 1)?.index).toBe(0);
    const inCell = editor.state.doc.content.size - 4;
    expect(topBlockAt(editor.state.doc, inCell)?.node.type.name).toBe("table");
  });

  it("moves blocks up and down, including whole tables", () => {
    editor = makeEditor(DOC);
    editor.view.dispatch(moveTopBlock(editor.state, 1, 1)!);
    expect(order(editor)).toEqual(["Title", "two", "one", "table"]);
    editor.view.dispatch(moveTopBlock(editor.state, 3, -1)!);
    expect(order(editor)).toEqual(["Title", "two", "table", "one"]);
    expect(moveTopBlock(editor.state, 0, -1)).toBeNull();
    expect(moveTopBlock(editor.state, 3, 1)).toBeNull();
  });

  it("keeps the caret in the moved text block", () => {
    editor = makeEditor(DOC);
    editor.view.dispatch(moveTopBlock(editor.state, 2, -1)!);
    expect(editor.state.selection.$from.parent.textContent).toBe("two");
  });

  it("selects a moved atom/table block as a node", () => {
    editor = makeEditor(DOC);
    editor.view.dispatch(moveTopBlock(editor.state, 3, -1)!);
    // prosemirror-tables turns a table NodeSelection into a whole-table CellSelection.
    const { selection } = editor.state;
    expect(selection).not.toBeInstanceOf(TextSelection);
    expect(topBlockAt(editor.state.doc, selection.from)?.node.type.name).toBe("table");
  });

  it("duplicates, deletes and inserts a line after a block", () => {
    editor = makeEditor(DOC);
    editor.view.dispatch(duplicateTopBlock(editor.state, 1)!);
    expect(order(editor)).toEqual(["Title", "one", "one", "two", "table"]);
    editor.view.dispatch(deleteTopBlock(editor.state, 0)!);
    expect(order(editor)).toEqual(["one", "one", "two", "table"]);
    editor.view.dispatch(insertParagraphAfter(editor.state, 0)!);
    expect(order(editor)).toEqual(["one", "", "one", "two", "table"]);
    expect(editor.state.selection.$from.index(0)).toBe(1);
  });

  it("never leaves the document empty", () => {
    editor = makeEditor("<p>only</p>");
    editor.view.dispatch(deleteTopBlock(editor.state, 0)!);
    expect(editor.state.doc.childCount).toBe(1);
    expect(editor.state.doc.firstChild?.type.name).toBe("paragraph");
  });

  it("moves the current block with Mod-Shift-ArrowUp", () => {
    editor = makeEditor(DOC);
    editor.commands.setTextSelection(editor.state.doc.child(0).nodeSize + editor.state.doc.child(1).nodeSize + 2);
    editor.commands.keyboardShortcut("Mod-Shift-ArrowUp");
    expect(order(editor)).toEqual(["Title", "two", "one", "table"]);
  });
});

describe("moveTopBlockTo (drag and drop)", () => {
  it("drops a block before another block or at the end", () => {
    editor = makeEditor(DOC);
    editor.view.dispatch(moveTopBlockTo(editor.state, 0, 3)!);
    expect(order(editor)).toEqual(["one", "two", "Title", "table"]);
    editor.view.dispatch(moveTopBlockTo(editor.state, 3, 0)!);
    expect(order(editor)).toEqual(["table", "one", "two", "Title"]);
    editor.view.dispatch(moveTopBlockTo(editor.state, 1, 4)!);
    expect(order(editor)).toEqual(["table", "two", "Title", "one"]);
  });

  it("treats dropping on either side of itself as a no-op", () => {
    editor = makeEditor(DOC);
    expect(moveTopBlockTo(editor.state, 1, 1)).toBeNull();
    expect(moveTopBlockTo(editor.state, 1, 2)).toBeNull();
    expect(moveTopBlockTo(editor.state, 1, 99)).toBeNull();
  });
});

describe("drop position", () => {
  const rects = [
    { top: 0, bottom: 40 },
    { top: 60, bottom: 100 },
    { top: 120, bottom: 200 },
  ];

  it("picks the gap nearest the pointer by block midpoints", () => {
    expect(computeDropIndex(rects, -10)).toBe(0);
    expect(computeDropIndex(rects, 25)).toBe(1);
    expect(computeDropIndex(rects, 70)).toBe(1);
    expect(computeDropIndex(rects, 150)).toBe(2);
    expect(computeDropIndex(rects, 500)).toBe(3);
  });

  it("draws the line halfway between blocks, or just outside the ends", () => {
    expect(indicatorY(rects, 0)).toBe(-4);
    expect(indicatorY(rects, 1)).toBe(50);
    expect(indicatorY(rects, 3)).toBe(204);
  });
});
