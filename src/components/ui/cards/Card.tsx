"use client";

import {
  CardPropsType,
  FeatureCardPropsType,
  MediaCardPropsType,
  PricingCardPropsType,
  ProfileCardPropsType,
} from "@/types/card";
import React from "react";

/**
 * Basic Card component - foundation for all card variants
 */
export const Card = ({
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
}: CardPropsType) => {
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
};

export default Card;
