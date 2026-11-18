/**
 * DateInputPicker inside a <form>.
 *
 * The calendar's month/year arrows were <button>s without type="button", so
 * the browser treated them as submit buttons: browsing to another month
 * submitted the surrounding form (Leadboard's deal edit form saved the deal
 * while the user was still picking a close date).
 */
import React from "react";
import { act } from "react";
import { createRoot, Root } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import DateInputPicker from "../DateInputPicker";

(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

describe("DateInputPicker inside a form", () => {
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

  const renderInForm = (onSubmit: () => void): void => {
    act(() => {
      root.render(
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <DateInputPicker
            label="Close date"
            name="close_date"
            value="2026-11-18"
            onChange={() => undefined}
          />
        </form>
      );
    });
    const toggle = container.querySelector<HTMLButtonElement>(
      ".ihub-calendar-toggle"
    );
    act(() => toggle?.click());
  };

  const clickLabel = (label: string): void => {
    const button = container.querySelector<HTMLButtonElement>(
      `[aria-label="${label}"]`
    );
    expect(button).not.toBeNull();
    act(() => button?.click());
  };

  it("does not submit the form when the month/year arrows are clicked", () => {
    const onSubmit = vi.fn();
    renderInForm(onSubmit);

    ["Previous Year", "Previous Month", "Next Month", "Next Year"].forEach(
      clickLabel
    );

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("marks every calendar button as type=button", () => {
    renderInForm(vi.fn());
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(0);
    buttons.forEach((b) => expect(b.getAttribute("type")).toBe("button"));
  });

  it("still moves the calendar to the next month", () => {
    renderInForm(vi.fn());
    expect(container.textContent).toContain("November");
    clickLabel("Next Month");
    expect(container.textContent).toContain("December");
  });
});
