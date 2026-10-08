/**
 * SideNavbar with sections, route-based activation and menu search.
 *
 * The regression this guards: on a hard reload of a nested page the group
 * holding that page stayed shut, because the open state was only seeded from
 * direct `isActive` flags. With `activePath`, every group and section above
 * the page must open, including a section that starts collapsed.
 */
import React from "react";
import { act } from "react";
import { createRoot, Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SideNavbar from "../SideNavbar";
import { NavItemType } from "../../../types/navbar";

(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));
vi.mock("next/image", () => ({ default: () => null }));

const items: NavItemType[] = [
  {
    type: "section",
    id: "main",
    title: "Main",
    children: [
      { type: "link", id: "home", title: "Dashboard", href: "/acme" },
      {
        type: "group",
        id: "deals",
        title: "Deals",
        children: [
          { type: "link", id: "deals-table", title: "Deals Table", href: "/acme/deals" },
          { type: "link", id: "deals-import", title: "Import Deals", href: "/acme/deals/import" },
        ],
      },
    ],
  },
  {
    type: "section",
    id: "more",
    title: "More tools",
    defaultCollapsed: true,
    children: [
      {
        type: "group",
        id: "sms",
        title: "SMS",
        children: [{ type: "link", id: "sms-templates", title: "Templates", href: "/acme/sms/templates" }],
      },
    ],
  },
];

let container: HTMLDivElement;
let root: Root;

const render = (props: Partial<React.ComponentProps<typeof SideNavbar>>) => {
  act(() => {
    root.render(<SideNavbar items={items} persistState={false} {...props} />);
  });
  // Effects that open ancestors run after the first commit.
  act(() => undefined);
};

const current = () =>
  [...container.querySelectorAll('[aria-current="page"]')].map((el) => el.textContent);

const sectionHead = (title: string) =>
  [...container.querySelectorAll<HTMLButtonElement>(".ihub-sidenav-section-head")].find((el) =>
    el.textContent?.startsWith(title)
  );

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  window.requestAnimationFrame = (cb: FrameRequestCallback) => {
    cb(0);
    return 0;
  };
  window.cancelAnimationFrame = () => undefined;
  Element.prototype.scrollIntoView = vi.fn();
  window.innerWidth = 1280;
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

describe("SideNavbar sections and activePath", () => {
  it("opens the group of a nested page on first render", () => {
    render({ activePath: "/acme/deals/import" });
    expect(current()).toEqual(["Import Deals"]);
    expect(container.textContent).toContain("Deals Table");
  });

  it("starts a defaultCollapsed section shut", () => {
    render({ activePath: "/acme" });
    expect(sectionHead("More tools")?.getAttribute("aria-expanded")).toBe("false");
    expect(container.textContent).not.toContain("Templates");
  });

  it("opens a collapsed section when the active page is inside it", () => {
    render({ activePath: "/acme/sms/templates" });
    expect(sectionHead("More tools")?.getAttribute("aria-expanded")).toBe("true");
    expect(current()).toEqual(["Templates"]);
  });

  it("follows the route when it changes", () => {
    render({ activePath: "/acme" });
    render({ activePath: "/acme/sms/templates/4" });
    expect(current()).toEqual(["Templates"]);
  });

  it("toggles a section from its heading", () => {
    render({ activePath: "/acme" });
    act(() => sectionHead("Main")?.click());
    expect(container.textContent).not.toContain("Dashboard");
  });
});

describe("SideNavbar search", () => {
  const type = (input: HTMLInputElement, value: string) => {
    act(() => {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
      setter.call(input, value);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
  };

  it("swaps the menu for matches, including collapsed sections", () => {
    render({ activePath: "/acme", search: true });
    const input = container.querySelector<HTMLInputElement>(".ihub-sidenav-search-input")!;
    type(input, "templ");
    const options = [...container.querySelectorAll('[role="option"]')];
    expect(options.map((el) => el.textContent)).toEqual(["TemplatesMore tools › SMS"]);
  });

  it("shows an empty state", () => {
    render({ search: { emptyMessage: (q) => <span>No {q}</span> } });
    type(container.querySelector<HTMLInputElement>(".ihub-sidenav-search-input")!, "payroll");
    expect(container.textContent).toContain("No payroll");
  });

  it("opens the selected match with Enter and clears the query", () => {
    const onNavigate = vi.fn();
    render({ search: true, onNavigate });
    const input = container.querySelector<HTMLInputElement>(".ihub-sidenav-search-input")!;
    type(input, "deals");
    act(() => {
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
    });
    act(() => {
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    });
    expect(onNavigate).toHaveBeenCalledTimes(1);
    expect(onNavigate.mock.calls[0][0].id).toBe("deals-import");
    expect(input.value).toBe("");
  });

  it("focuses the field on the shortcut key", () => {
    render({ search: true });
    const input = container.querySelector<HTMLInputElement>(".ihub-sidenav-search-input")!;
    // jsdom has no layout; stand in for "this input is on screen".
    input.getClientRects = () => [{}] as unknown as DOMRectList;
    act(() => {
      document.body.dispatchEvent(new KeyboardEvent("keydown", { key: "/", bubbles: true }));
    });
    expect(document.activeElement).toBe(input);
  });
});

describe("SideNavbar buttons", () => {
  it("keeps the page highlighted when a button row is clicked", () => {
    const withButton: NavItemType[] = [
      ...items,
      { type: "button", id: "theme", title: "Toggle theme", onClick: () => undefined },
    ];
    act(() => {
      root.render(<SideNavbar items={withButton} persistState={false} activePath="/acme/deals" />);
    });
    act(() => undefined);
    const button = [...container.querySelectorAll("button")].find((el) => el.textContent === "Toggle theme")!;
    act(() => button.click());
    expect(current()).toEqual(["Deals Table"]);
  });
});
