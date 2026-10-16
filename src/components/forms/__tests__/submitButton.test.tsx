/**
 * SubmitButton: status rendering and theme-safe icons.
 *
 * The icons used to be drawn with a hard-coded white fill, so on dark mode
 * (where the "primary" variant inverts to a white button) the spinner and the
 * chevron disappeared. Every icon now inherits currentColor, and each status
 * (loading, success, error) renders a distinct, testable mark.
 */
import React from "react";
import { act } from "react";
import { createRoot, Root } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import SubmitButton from "../SubmitButton";

(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

const render = (ui: React.ReactElement) => {
  act(() => {
    root.render(ui);
  });
};

const button = () =>
  container.querySelector("button.ihub-submit-btn") as HTMLButtonElement;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => {
    root.unmount();
  });
  container.remove();
  vi.useRealTimers();
});

describe("SubmitButton", () => {
  it("renders the label, the variant and the chevron when ready", () => {
    render(<SubmitButton label="Save changes" />);
    const btn = button();
    expect(btn.textContent).toContain("Save changes");
    expect(btn.getAttribute("type")).toBe("submit");
    expect(btn.dataset.variant).toBe("important");
    expect(btn.dataset.status).toBe("1");
    expect(btn.disabled).toBe(false);
    expect(btn.getAttribute("aria-busy")).toBe("false");
    expect(btn.querySelector(".ihub-submit-btn__chevron")).not.toBeNull();
    expect(btn.querySelector(".ihub-submit-btn__spinner")).toBeNull();
  });

  it("shows the spinner, disables itself and keeps the legacy rolling class while loading", () => {
    render(<SubmitButton label="Save changes" status={0} />);
    const btn = button();
    expect(btn.disabled).toBe(true);
    expect(btn.getAttribute("aria-busy")).toBe("true");
    expect(btn.dataset.status).toBe("0");
    expect(btn.classList.contains("ihub-rolling")).toBe(true);
    expect(btn.querySelector(".ihub-submit-btn__spinner")).not.toBeNull();
    expect(btn.querySelector(".ihub-submit-btn__chevron")).toBeNull();
  });

  it("shows a check mark on success and stays clickable", () => {
    render(<SubmitButton label="Save changes" status={2} />);
    const btn = button();
    expect(btn.disabled).toBe(false);
    expect(btn.dataset.status).toBe("2");
    expect(btn.querySelector(".ihub-submit-btn__check")).not.toBeNull();
    expect(btn.querySelector(".ihub-submit-btn__spinner")).toBeNull();
  });

  it("shows an error mark on error and stays clickable", () => {
    render(<SubmitButton label="Save changes" status={3} />);
    const btn = button();
    expect(btn.disabled).toBe(false);
    expect(btn.dataset.status).toBe("3");
    expect(btn.querySelector(".ihub-submit-btn__error")).not.toBeNull();
  });

  it("never hard-codes an icon colour, so icons follow the button text in dark mode", () => {
    const statuses = [0, 1, 2, 3];
    for (const status of statuses) {
      render(<SubmitButton label="Save changes" status={status} />);
      const svgs = Array.from(button().querySelectorAll("svg"));
      expect(svgs.length).toBeGreaterThan(0);
      for (const svg of svgs) {
        const html = svg.outerHTML;
        expect(html).not.toMatch(/#fff/i);
        expect(html).not.toMatch(/white/i);
        expect(html).toMatch(/currentColor/);
      }
    }
  });

  it("renders the icon variant without a chevron and swaps the icon for the spinner while loading", () => {
    render(
      <SubmitButton
        variant="icon"
        label={<span data-testid="icon">+</span>}
        status={1}
      />
    );
    expect(button().querySelector(".ihub-submit-btn__chevron")).toBeNull();
    expect(button().querySelector("[data-testid=icon]")).not.toBeNull();

    render(
      <SubmitButton
        variant="icon"
        label={<span data-testid="icon">+</span>}
        status={0}
      />
    );
    expect(button().querySelector("[data-testid=icon]")).toBeNull();
    expect(button().querySelector(".ihub-submit-btn__spinner")).not.toBeNull();
  });

  it("respects the disabled prop and forwards clicks when enabled", () => {
    const onClick = vi.fn();
    render(<SubmitButton label="Go" type="button" onClick={onClick} />);
    act(() => {
      button().click();
    });
    expect(onClick).toHaveBeenCalledTimes(1);

    render(<SubmitButton label="Go" type="button" onClick={onClick} disabled />);
    expect(button().disabled).toBe(true);
    act(() => {
      button().click();
    });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("auto-resets from loading to ready after the timeout", () => {
    vi.useFakeTimers();
    render(<SubmitButton label="Go" status={0} autoResetTimeout={1000} />);
    expect(button().getAttribute("aria-busy")).toBe("true");
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(button().getAttribute("aria-busy")).toBe("false");
    expect(button().disabled).toBe(false);
  });

  it("follows later changes to the status prop", () => {
    render(<SubmitButton label="Go" status={1} />);
    expect(button().dataset.status).toBe("1");
    render(<SubmitButton label="Go" status={0} />);
    expect(button().dataset.status).toBe("0");
    render(<SubmitButton label="Go" status={2} />);
    expect(button().dataset.status).toBe("2");
  });

  it("keeps the label text as the accessible name and lets ariaLabel override it", () => {
    render(<SubmitButton label="Save changes" />);
    expect(button().getAttribute("aria-label")).toBe("Save changes");
    render(<SubmitButton label={<b>Save</b>} ariaLabel="Save profile" />);
    expect(button().getAttribute("aria-label")).toBe("Save profile");
  });
});
