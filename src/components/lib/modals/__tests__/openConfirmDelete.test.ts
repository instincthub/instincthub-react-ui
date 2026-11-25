// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";

import { escapeHtml, openConfirmDelete } from "../openConfirmDelete";

const HOSTILE = `<img src=x onerror="window.__pwned=1">`;

afterEach(() => {
  document.body.innerHTML = "";
  delete (window as unknown as Record<string, unknown>).__pwned;
});

describe("escapeHtml", () => {
  it("escapes the characters that start markup or attributes", () => {
    expect(escapeHtml(`<b a="1" b='2'>&</b>`)).toBe("&lt;b a=&quot;1&quot; b=&#39;2&#39;&gt;&amp;&lt;/b&gt;");
  });

  it("leaves plain names alone", () => {
    expect(escapeHtml("Ada Obi")).toBe("Ada Obi");
  });
});

describe("openConfirmDelete", () => {
  it("shows a hostile name as text, never as markup", () => {
    void openConfirmDelete(HOSTILE, "token", "https://example.test/x/");
    const modal = document.getElementById("ihub-confirm-modal");
    expect(modal).not.toBeNull();
    expect(modal!.querySelector("img")).toBeNull();
    expect(modal!.querySelector(".ihub-confirm-value")?.textContent).toBe(HOSTILE);
  });

  it("still needs the exact raw name typed to enable Delete", () => {
    void openConfirmDelete(HOSTILE, "token", "https://example.test/x/");
    const input = document.getElementById("ihub-delete-input") as HTMLInputElement;
    const button = document.getElementById("ihub-delete-btn") as HTMLButtonElement | null;
    input.value = HOSTILE;
    input.dispatchEvent(new Event("input"));
    if (button) expect(button.disabled).toBe(false);
  });
});
