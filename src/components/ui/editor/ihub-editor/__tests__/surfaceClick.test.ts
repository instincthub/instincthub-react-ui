import { describe, expect, it } from "vitest";
import { isDragGesture, shouldFocusEnd } from "../hooks/useSurfaceClick";

function setup() {
  const surface = document.createElement("div");
  surface.className = "ihub-te-editor-area";
  const content = document.createElement("div");
  content.className = "ihub-te-content";
  const para = document.createElement("p");
  content.appendChild(para);
  const menu = document.createElement("div");
  menu.className = "ihub-te-floating-menu";
  surface.append(content, menu);
  para.getBoundingClientRect = () => ({ bottom: 100 } as DOMRect);
  return { surface, content, para, menu };
}

const base = { dragged: false, selectionCollapsed: true };

describe("editor surface click", () => {
  it("detects drag gestures", () => {
    expect(isDragGesture({ x: 0, y: 0 }, { x: 2, y: 3 })).toBe(false);
    expect(isDragGesture({ x: 0, y: 0 }, { x: 40, y: 120 })).toBe(true);
    expect(isDragGesture(null, { x: 5, y: 5 })).toBe(false);
  });

  it("does not move the caret after a drag-selection that ends below the text", () => {
    const { surface, content } = setup();
    expect(shouldFocusEnd({ ...base, target: surface, surface, contentDom: content, clientY: 300, dragged: true })).toBe(false);
    expect(shouldFocusEnd({ ...base, target: content, surface, contentDom: content, clientY: 300, selectionCollapsed: false })).toBe(false);
  });

  it("ignores clicks on menus, toolbars and text", () => {
    const { surface, content, para, menu } = setup();
    expect(shouldFocusEnd({ ...base, target: menu, surface, contentDom: content, clientY: 300 })).toBe(false);
    expect(shouldFocusEnd({ ...base, target: para, surface, contentDom: content, clientY: 300 })).toBe(false);
  });

  it("ignores clicks on the surface beside existing text", () => {
    const { surface, content } = setup();
    expect(shouldFocusEnd({ ...base, target: surface, surface, contentDom: content, clientY: 50 })).toBe(false);
  });

  it("moves to the end for a plain click below the last block", () => {
    const { surface, content } = setup();
    expect(shouldFocusEnd({ ...base, target: surface, surface, contentDom: content, clientY: 300 })).toBe(true);
    expect(shouldFocusEnd({ ...base, target: content, surface, contentDom: content, clientY: 300 })).toBe(true);
  });
});
