/**
 * LoadingAnimate: the default is the full-page overlay every existing caller
 * relies on; `variant="inline"` stays inside its container.
 *
 * The overlay (`.react_loading` in main.css) is `position: fixed` and covers
 * the whole viewport, so using it for a panel or an expanded table row blanked
 * the entire screen while one small section loaded (Leadboard deals table,
 * 2026-11-10). The inline variant must never carry that class.
 */
import React from "react";
import { act } from "react";
import { createRoot, Root } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import LoadingAnimate from "../LoadingAnimate";

(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

const render = (ui: React.ReactElement) => {
  act(() => {
    root.render(ui);
  });
};

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

describe("LoadingAnimate", () => {
  it("keeps the full-page overlay by default", () => {
    render(<LoadingAnimate />);
    const overlay = container.querySelector(".react_loading");
    expect(overlay).not.toBeNull();
    expect(container.querySelector(".lds-ellipsis")).not.toBeNull();
  });

  it("stays inside its container when inline", () => {
    render(<LoadingAnimate variant="inline" />);
    expect(container.querySelector(".react_loading")).toBeNull();
    const inline = container.querySelector(".ihub-loading-inline");
    expect(inline).not.toBeNull();
    expect(inline?.querySelector(".lds-ellipsis")).not.toBeNull();
  });

  it("announces the inline state to screen readers", () => {
    render(<LoadingAnimate variant="inline" label="Loading people" />);
    const status = container.querySelector('[role="status"]');
    expect(status?.getAttribute("aria-live")).toBe("polite");
    expect(status?.textContent).toContain("Loading people");
  });

  it("falls back to a generic label", () => {
    render(<LoadingAnimate variant="inline" />);
    expect(container.querySelector('[role="status"]')?.textContent).toContain("Loading");
  });
});
