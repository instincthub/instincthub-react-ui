/**
 * Regression tests for the portalled Dropdown menu's viewport handling.
 *
 * The menu is portalled to <body> at fixed coordinates taken from the trigger,
 * so it must follow the trigger when the page scrolls. The scroll listener has
 * to be bound in the CAPTURE phase, because a scroll container between the
 * trigger and <body> never bubbles its scroll event to window.
 *
 * Capture means the same listener also sees the menu's OWN options list
 * scrolling. Closing on that made a list long enough to need scrolling
 * impossible to use — you could never reach the option you were scrolling
 * towards. These tests pin that behaviour down.
 */
import React from "react";
import { act } from "react";
import { createRoot, Root } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import Dropdown from "../Dropdown";

// React only allows act() when it knows it is under test.
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

const options = Array.from({ length: 30 }, (_, i) => ({
  value: `v${i}`,
  label: `Option ${i}`,
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

const menu = () => document.querySelector(".ihub-dropdown-menu-portal");
const optionsList = () => document.querySelector(".ihub-dropdown-options");

const open = async () => {
  const trigger = container.querySelector(".ihub-dropdown-trigger")!;
  stubRect(container.querySelector(".ihub-dropdown-field")!, {});
  await act(async () => {
    trigger.dispatchEvent(new MouseEvent("click", { bubbles: true }));
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

describe("Dropdown — portalled menu viewport handling", () => {
  it("stays open when its own options list is scrolled", async () => {
    await act(async () => {
      root.render(<Dropdown options={options} onChange={() => {}} maxHeight={200} />);
    });
    await open();
    expect(menu()).not.toBeNull();

    // The exact reproduction from the field report. A capture-phase window
    // listener receives this even though Event('scroll') does not bubble.
    await act(async () => {
      optionsList()!.dispatchEvent(new Event("scroll"));
    });

    expect(menu()).not.toBeNull();
  });

  it("stays open and re-anchors when something outside it scrolls", async () => {
    await act(async () => {
      root.render(<Dropdown options={options} onChange={() => {}} />);
    });
    await open();

    const before = (menu() as HTMLElement).style.top;
    expect(before).toBe("145px"); // rect.bottom 140 + MENU_OFFSET 5

    // The trigger moved up by 50px, as a surrounding scroll container would.
    stubRect(container.querySelector(".ihub-dropdown-field")!, {
      top: 50, bottom: 90,
    });
    await act(async () => {
      document.dispatchEvent(new Event("scroll"));
    });

    expect(menu()).not.toBeNull();
    expect((menu() as HTMLElement).style.top).toBe("95px");
  });

  it("closes only once the trigger has left the viewport", async () => {
    await act(async () => {
      root.render(<Dropdown options={options} onChange={() => {}} />);
    });
    await open();

    stubRect(container.querySelector(".ihub-dropdown-field")!, {
      top: -200, bottom: -160,
    });
    await act(async () => {
      document.dispatchEvent(new Event("scroll"));
    });

    expect(menu()).toBeNull();
  });

  it("survives a scroll dispatched at window, whose target is not a Node", async () => {
    await act(async () => {
      root.render(<Dropdown options={options} onChange={() => {}} />);
    });
    await open();

    // Node.contains() throws on a non-Node; an unguarded handler strands the menu.
    await act(async () => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(menu()).not.toBeNull();
  });

  it("closes on Escape and on an outside mousedown, but not on a menu mousedown", async () => {
    await act(async () => {
      root.render(<Dropdown options={options} onChange={() => {}} />);
    });

    await open();
    await act(async () => {
      optionsList()!.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });
    expect(menu()).not.toBeNull();

    await act(async () => {
      document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });
    expect(menu()).toBeNull();

    await open();
    await act(async () => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });
    expect(menu()).toBeNull();
  });

  it("keeps multi-select accumulating across an options-list scroll", async () => {
    const onChange = vi.fn();
    await act(async () => {
      root.render(<Dropdown options={options} onChange={onChange} isMulti />);
    });
    await open();

    const click = async (label: string) => {
      const el = [...document.querySelectorAll(".ihub-dropdown-option")].find(
        (o) => o.textContent === label
      )!;
      await act(async () => {
        el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
    };

    await click("Option 0");
    expect(onChange).toHaveBeenLastCalledWith(["v0"]);
    expect(menu()).not.toBeNull(); // multi mode keeps the menu open

    // Scroll the list, then keep picking — the whole point of the fix.
    await act(async () => {
      optionsList()!.dispatchEvent(new Event("scroll"));
    });
    expect(menu()).not.toBeNull();

    await click("Option 5");
    expect(onChange).toHaveBeenLastCalledWith(["v0", "v5"]);

    // Toggling an already-selected option removes it.
    await click("Option 0");
    expect(onChange).toHaveBeenLastCalledWith(["v5"]);
  });

  it("closes after a single-select pick", async () => {
    const onChange = vi.fn();
    await act(async () => {
      root.render(<Dropdown options={options} onChange={onChange} />);
    });
    await open();

    const el = [...document.querySelectorAll(".ihub-dropdown-option")].find(
      (o) => o.textContent === "Option 3"
    )!;
    await act(async () => {
      el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(onChange).toHaveBeenLastCalledWith("v3");
    expect(menu()).toBeNull();
  });
});
