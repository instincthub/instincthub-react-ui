/**
 * The current page button in IHubTable / IHubTableServer must be
 * distinguishable from its siblings.
 *
 * Consumer apps ship dark-mode overrides such as
 * `html.DarkMode .ihub-pagination-button { background: ...; color: ... }`
 * whose specificity (0,2,1) beats the library's
 * `.ihub-pagination-button.ihub-active` (0,2,0), which flattened the active
 * page to look like every other button. The fix marks the active button with
 * `aria-current="page"` and styles it through a higher-specificity selector.
 * These tests pin the markup side of that contract.
 */
import React from "react";
import { act } from "react";
import { createRoot, Root } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import IHubTable from "../IHubTable";
import IHubTableServer from "../IHubTableServer";

(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

type Row = { id: number; name: string };

const rows: Row[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Row ${i + 1}`,
}));

const columns = [{ header: "Name", accessor: "name" as keyof Row }];

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

const pageButtons = () =>
  Array.from(
    container.querySelectorAll<HTMLButtonElement>(
      ".ihub-pagination-controls .ihub-pagination-button"
    )
  ).filter((b) => /^\d+$/.test(b.textContent ?? ""));

const activeButtons = () => pageButtons().filter((b) => b.classList.contains("ihub-active"));

describe("IHubTable active page button", () => {
  it("marks only the current page with ihub-active and aria-current", async () => {
    await act(async () => {
      root.render(
        <IHubTable<Row>
          columns={columns}
          data={rows}
          pagination
          defaultRowsPerPage={10}
          keyExtractor={(r) => r.id}
        />
      );
    });

    expect(pageButtons().length).toBe(3);
    expect(activeButtons().map((b) => b.textContent)).toEqual(["1"]);
    expect(activeButtons()[0].getAttribute("aria-current")).toBe("page");
    pageButtons()
      .filter((b) => b.textContent !== "1")
      .forEach((b) => expect(b.hasAttribute("aria-current")).toBe(false));

    await act(async () => {
      pageButtons().find((b) => b.textContent === "2")!.click();
    });

    expect(activeButtons().map((b) => b.textContent)).toEqual(["2"]);
    expect(activeButtons()[0].getAttribute("aria-current")).toBe("page");
  });
});

describe("IHubTableServer active page button", () => {
  it("marks the current page with ihub-active and aria-current", async () => {
    await act(async () => {
      root.render(
        <IHubTableServer<Row>
          columns={columns}
          endpointPath=""
          defaultData={rows}
          persistState={false}
          keyExtractor={(r) => r.id}
        />
      );
    });

    expect(pageButtons().length).toBe(3);
    expect(activeButtons().map((b) => b.textContent)).toEqual(["1"]);
    expect(activeButtons()[0].getAttribute("aria-current")).toBe("page");
    pageButtons()
      .filter((b) => b.textContent !== "1")
      .forEach((b) => expect(b.hasAttribute("aria-current")).toBe(false));
  });
});
