import { afterEach, describe, expect, it } from "vitest";
import type { Editor } from "@tiptap/core";
import { css, makeEditor, toDom } from "./helpers";
import { duplicateTableLine, findTableAt, hasMergedCells, moveTableLine, setLineCellAttr, tableSize } from "../table/tableOps";

const GRID = `<table><tbody>
<tr><td><p>a1</p></td><td><p>b1</p></td><td><p>c1</p></td></tr>
<tr><td><p>a2</p></td><td><p>b2</p></td><td><p>c2</p></td></tr>
<tr><td><p>a3</p></td><td><p>b3</p></td><td><p>c3</p></td></tr>
</tbody></table>`;

let editor: Editor;
afterEach(() => editor?.destroy());

function grid(ed: Editor): string[][] {
  const ref = findTableAt(ed.state.doc, 3)!;
  const rows: string[][] = [];
  ref.node.forEach((row) => {
    const cells: string[] = [];
    row.forEach((cell) => cells.push(cell.textContent));
    rows.push(cells);
  });
  return rows;
}

function tableRef(ed: Editor) {
  const ref = findTableAt(ed.state.doc, 3);
  if (!ref) throw new Error("no table");
  return ref;
}

describe("table operations", () => {
  it("finds the table and its size", () => {
    editor = makeEditor(GRID);
    const ref = tableRef(editor);
    expect(tableSize(ref.node)).toEqual({ rows: 3, cols: 3 });
    expect(hasMergedCells(ref.node)).toBe(false);
  });

  it("moves a row down", () => {
    editor = makeEditor(GRID);
    editor.view.dispatch(moveTableLine(editor.state, tableRef(editor), "row", 0, 1)!);
    expect(grid(editor).map((r) => r[0])).toEqual(["a2", "a1", "a3"]);
  });

  it("moves a column left", () => {
    editor = makeEditor(GRID);
    editor.view.dispatch(moveTableLine(editor.state, tableRef(editor), "column", 2, 1)!);
    expect(grid(editor)[0]).toEqual(["a1", "c1", "b1"]);
    expect(grid(editor)[2]).toEqual(["a3", "c3", "b3"]);
  });

  it("refuses out-of-range or no-op moves", () => {
    editor = makeEditor(GRID);
    const ref = tableRef(editor);
    expect(moveTableLine(editor.state, ref, "row", 0, -1)).toBeNull();
    expect(moveTableLine(editor.state, ref, "column", 2, 3)).toBeNull();
    expect(moveTableLine(editor.state, ref, "row", 1, 1)).toBeNull();
  });

  it("refuses to move when cells are merged", () => {
    editor = makeEditor(`<table><tbody><tr><td colspan="2"><p>ab</p></td></tr><tr><td><p>a</p></td><td><p>b</p></td></tr></tbody></table>`);
    const ref = tableRef(editor);
    expect(hasMergedCells(ref.node)).toBe(true);
    expect(moveTableLine(editor.state, ref, "row", 0, 1)).toBeNull();
    expect(duplicateTableLine(editor.state, ref, "row", 0)).toBeNull();
  });

  it("duplicates a row and a column", () => {
    editor = makeEditor(GRID);
    editor.view.dispatch(duplicateTableLine(editor.state, tableRef(editor), "row", 1)!);
    expect(grid(editor).map((r) => r[0])).toEqual(["a1", "a2", "a2", "a3"]);
    editor.view.dispatch(duplicateTableLine(editor.state, tableRef(editor), "column", 0)!);
    expect(grid(editor)[0]).toEqual(["a1", "a1", "b1", "c1"]);
  });

  it("colours every cell in a column", () => {
    editor = makeEditor(GRID);
    editor.view.dispatch(setLineCellAttr(editor.state, tableRef(editor), "column", 1, "backgroundColor", "#E6F4F5"));
    const rows = Array.from(toDom(editor.getHTML()).querySelectorAll("tr"));
    rows.forEach((tr) => {
      const cells = tr.querySelectorAll("td");
      expect(css(cells[1], "background-color")).toBe("rgb(230, 244, 245)");
      expect(cells[1].getAttribute("bgcolor")).toBe("#E6F4F5");
      expect(css(cells[0], "background-color")).toBe("");
    });
  });

  it("keeps working with prosemirror-tables commands after a move", () => {
    editor = makeEditor(GRID);
    editor.view.dispatch(moveTableLine(editor.state, tableRef(editor), "row", 2, 0)!);
    // The moved row is selected, so addRowAfter inserts beneath it.
    editor.chain().addRowAfter().run();
    expect(tableSize(tableRef(editor).node).rows).toBe(4);
    expect(grid(editor)[0][0]).toBe("a3");
    expect(grid(editor)[1][0]).toBe("");
  });
});
