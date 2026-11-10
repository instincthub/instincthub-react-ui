import React from "react";

export interface LoadingAnimateProps {
  /**
   * "page" (default): the full-viewport overlay, for a whole page loading.
   * "inline": stays inside its container, for a panel, card, modal section or
   * expanded table row. Never use "page" for part of a screen: it is
   * `position: fixed` and blanks everything while that one part loads.
   */
  variant?: "page" | "inline";
  /** Screen-reader text for the inline variant. Defaults to "Loading". */
  label?: string;
}

function Ellipsis() {
  return (
    <div className="lds-ellipsis" aria-hidden="true">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

/**
 * Animated three-dot loader.
 * @param props - {@link LoadingAnimateProps}
 * @example
 * <LoadingAnimate />                                  // whole page
 * <LoadingAnimate variant="inline" label="Loading people" />  // one section
 */
export default function LoadingAnimate({ variant = "page", label = "Loading" }: LoadingAnimateProps = {}) {
  if (variant === "inline") {
    return (
      <div className="ihub-loading-inline" role="status" aria-live="polite">
        <Ellipsis />
        <span className="ihub-loading-inline__label">{label}</span>
      </div>
    );
  }
  return (
    <div className="react_loading container">
      <div>
        <Ellipsis />
      </div>
    </div>
  );
}
