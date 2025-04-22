"use client";

import React from "react";
import { CardPropsType } from "@/types/card";

/**
 * Basic Card component - foundation for all card variants
 */
function CardComponent({
  title,
  accentHeader = false,
  footer,
  children,
  className = "",
  accent,
  darkTheme = false,
  style,
  size = "default",
  border = true,
  shadow = true,
  onClick,
}: CardPropsType) {
  // Construct class names
  const cardClasses = [
    "ihub-card",
    size === "sm" ? "ihub-card-sm" : "",
    accent ? `ihub-card-accent-${accent}` : "",
    darkTheme ? "ihub-dark-theme" : "",
    border ? "ihub-card-border" : "",
    shadow ? "ihub-card-shadow" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClasses} style={style} onClick={onClick}>
      {title && (
        <div
          className={`ihub-card-header ${accentHeader ? "with-accent" : ""}`}
        >
          {typeof title === "string" ? <h3>{title}</h3> : title}
        </div>
      )}
      <div className="ihub-card-body">{children}</div>
      {footer && <div className="ihub-card-footer">{footer}</div>}
    </div>
  );
}

// Export as both named and default export
export const Card = CardComponent;
export default CardComponent;
