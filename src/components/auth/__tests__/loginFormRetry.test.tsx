/**
 * LoginForm after a failed login, under React StrictMode.
 *
 * The regression this guards: StrictMode mounts, unmounts and remounts every
 * component in development. The unmount cleanup set `mountedRef` to false and
 * nothing set it back, so after the first failure the form never left its
 * "submitting" state: the next submit was ignored. Apps worked around it by
 * remounting the form, which wiped the error and the inputs.
 */
import React, { StrictMode } from "react";
import { act } from "react";
import { createRoot, Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import LoginForm from "../LoginForm";

(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

vi.mock("next-auth/react", () => ({
  signIn: vi.fn(),
  signOut: vi.fn(),
}));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
}));
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));
vi.mock("next/image", () => ({ default: () => null }));

let container: HTMLDivElement;
let root: Root;
let fetchMock: ReturnType<typeof vi.fn>;

/** Types into a React-controlled input. */
function typeInto(input: HTMLInputElement, value: string): void {
  const setter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value"
  )!.set!;
  setter.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

async function submit(): Promise<void> {
  const form = container.querySelector("form") as HTMLFormElement;
  await act(async () => {
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  });
  // Let the fetch promise chain and the finally block settle.
  await act(async () => {
    await new Promise((r) => setTimeout(r, 0));
  });
}

beforeEach(async () => {
  fetchMock = vi.fn().mockResolvedValue({
    ok: false,
    status: 400,
    json: async () => ({ message: "Invalid credentials." }),
  });
  vi.stubGlobal("fetch", fetchMock);
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  await act(async () => {
    root.render(
      <StrictMode>
        <LoginForm searchParams={{}} endpointPath="/api/login" />
      </StrictMode>
    );
  });
  await act(async () => {
    typeInto(
      container.querySelector('input[name="username"]') as HTMLInputElement,
      "ada@example.com"
    );
    typeInto(
      container.querySelector('input[type="password"]') as HTMLInputElement,
      "wrong-password"
    );
  });
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

describe("LoginForm after a failed login", () => {
  it("shows the error and keeps what was typed", async () => {
    await submit();
    expect(container.textContent).toContain("Invalid credentials.");
    expect(
      (container.querySelector('input[name="username"]') as HTMLInputElement).value
    ).toBe("ada@example.com");
  });

  it("accepts the next attempt", async () => {
    await submit();
    await submit();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
