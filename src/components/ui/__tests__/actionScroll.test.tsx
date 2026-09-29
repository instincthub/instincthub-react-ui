/**
 * Regression tests for the portalled Action menu's viewport handling.
 *
 * Sibling of `dropdownScroll.test.tsx` — `Action` and `Dropdown` portal their
 * menu to <body> at fixed coordinates taken from the trigger, so both must
 * re-anchor the menu when the page scrolls, and both bind the scroll listener
 * in the CAPTURE phase because a scroll container between the trigger and
 * <body> never bubbles its scroll event to window.
 *
 * Capture means the handler also receives scrolls it must ignore (the menu's
 * own list) and scrolls whose target is not an Element at all: a scroll
 * dispatched AT window — as lazy-load, sticky-header and analytics code does
 * with `window.dispatchEvent(new Event("scroll"))` — has the Window as its
 * target. Window is truthy but is not a Node, and `Node.prototype.contains()`
 * throws a TypeError when handed one. That throw aborts the handler before it
 * can re-anchor, stranding the menu open at stale coordinates.
 */
import React from "react";
import { act } from "react";
import { createRoot, Root } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import Action from "../Action";

// React only allows act() when it knows it is under test.
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

const items = Array.from({ length: 10 }, (_, i) => ({
  label: `Item ${i}`,
  onClick: () => {},
}));

let container: HTMLDivElement;
let root: Root;

/** Give the trigger a real on-screen rect; jsdom reports all zeroes. */
const stubRect = (el: Element, rect: Partial<DOMRect>) => {
  vi.spyOn(el, "getBoundingClientRect").mockReturnValue({
    top: 100, left: 40, bottom: 140, right: 240, width: 200, height: 40,
    x: 40, y: 100, toJSON: () => ({}), ...rect,
  } as DOMRect);
};

const menu = () =>
  document.querySelector(".ihub-action-dropdown-menu") as HTMLElement | null;

/** `positionMenu` measures the container, which is what holds `dropdownRef`. */
const trigger = () =>
  container.querySelector(".ihub-action-dropdown-container")!;

const open = async () => {
  stubRect(trigger(), {});
  await act(async () => {
    container
      .querySelector(".ihub-action")!
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
};

/**
 * Run `fn` and return any error an event listener threw.
 *
 * jsdom does not let an exception escape `dispatchEvent` — it reports it as an
 * uncaught error instead, so a plain `expect(...).not.toThrow()` cannot see it
 * and the assertion would pass against the bug.
 */
const errorDuring = async (fn: () => void | Promise<void>) => {
  let caught: unknown = null;
  const onError = (e: ErrorEvent) => {
    caught = e.error ?? new Error(e.message);
    e.preventDefault();
  };
  window.addEventListener("error", onError);
  try {
    await act(async () => {
      await fn();
    });
  } finally {
    window.removeEventListener("error", onError);
  }
  return caught;
};

const render = async () => {
  await act(async () => {
    root.render(<Action label="Actions" dropdown dropdownItems={items} />);
  });
};

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  (window as any).innerHeight = 800;
  (window as any).innerWidth = 1200;
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.restoreAllMocks();
});

describe("Action — portalled menu viewport handling", () => {
  it("stays open when its own menu is scrolled", async () => {
    await render();
    await open();
    expect(menu()).not.toBeNull();

    // A capture-phase window listener receives this even though
    // Event('scroll') does not bubble.
    await act(async () => {
      menu()!.dispatchEvent(new Event("scroll"));
    });

    expect(menu()).not.toBeNull();
  });

  it("stays open and re-anchors when something outside it scrolls", async () => {
    await render();
    await open();
    expect(menu()!.style.top).toBe("148px"); // rect.bottom 140 + MENU_GAP 8

    // The trigger moved up by 50px, as a surrounding scroll container would.
    stubRect(trigger(), { top: 50, bottom: 90 });
    await act(async () => {
      document.dispatchEvent(new Event("scroll"));
    });

    expect(menu()).not.toBeNull();
    expect(menu()!.style.top).toBe("98px");
  });

  it("closes only once the trigger has left the viewport", async () => {
    await render();
    await open();

    stubRect(trigger(), { top: -200, bottom: -160 });
    await act(async () => {
      document.dispatchEvent(new Event("scroll"));
    });

    expect(menu()).toBeNull();
  });

  it("survives a scroll dispatched at window, whose target is not a Node", async () => {
    await render();
    await open();

    // What lazy-load / sticky-header / analytics code does. `event.target` is
    // the Window: truthy, but not a Node, so an unguarded
    // `menuRef.current.contains(target)` throws and strands the menu.
    const error = await errorDuring(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(error).toBeNull();
    expect(menu()).not.toBeNull();
  });

  it("re-anchors on a window-dispatched scroll instead of going stale", async () => {
    await render();
    await open();
    expect(menu()!.style.top).toBe("148px");

    stubRect(trigger(), { top: 50, bottom: 90 });
    await act(async () => {
      window.dispatchEvent(new Event("scroll"));
    });

    // A handler that threw never reached positionMenu(), so the menu would
    // still be pinned to where the trigger used to be.
    expect(menu()).not.toBeNull();
    expect(menu()!.style.top).toBe("98px");
  });

  it("closes on a window-dispatched scroll once the trigger has left the viewport", async () => {
    await render();
    await open();

    stubRect(trigger(), { top: -200, bottom: -160 });
    await act(async () => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(menu()).toBeNull();
  });

  it("closes on an outside mousedown, but not on a mousedown inside the menu", async () => {
    await render();
    await open();

    await act(async () => {
      menu()!.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });
    expect(menu()).not.toBeNull();

    await act(async () => {
      document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });
    expect(menu()).toBeNull();
  });
});
