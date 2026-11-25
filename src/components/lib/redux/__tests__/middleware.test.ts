import { afterEach, describe, expect, it, vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { createMiddleware } from "../middleware";

/** redux-logger writes through these console methods. */
const spyOnConsole = () =>
  (["log", "group", "groupCollapsed", "groupEnd"] as const).map((method) =>
    vi.spyOn(console, method).mockImplementation(() => {})
  );

const storeFor = (nodeEnv: string | undefined) =>
  configureStore({
    reducer: (state: number = 0) => state,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(createMiddleware(nodeEnv)),
  });

afterEach(() => {
  vi.restoreAllMocks();
});

describe("createMiddleware", () => {
  it("adds no logger in production", () => {
    expect(createMiddleware("production")).toEqual([]);
  });

  it("logs nothing when a production store dispatches", () => {
    const spies = spyOnConsole();
    storeFor("production").dispatch({ type: "test/ping" });
    spies.forEach((spy) => expect(spy).not.toHaveBeenCalled());
  });

  it.each(["development", "test", undefined])(
    "keeps the action logger when NODE_ENV is %s",
    (nodeEnv: string | undefined) => {
      const spies = spyOnConsole();
      storeFor(nodeEnv).dispatch({ type: "test/ping" });
      expect(spies.some((spy) => spy.mock.calls.length > 0)).toBe(true);
    }
  );
});
