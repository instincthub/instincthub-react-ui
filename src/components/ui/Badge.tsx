import React from "react";

export type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";
export type BadgeSize = "small" | "medium" | "large";
export type BadgeShape = "rounded" | "pill" | "square";

export interface BadgeProps {
  /**
   * The content to display inside the badge
   */
  children: React.ReactNode;

  /**
   * The visual style variant of the badge
   * @default 'default'
   */
  variant?: BadgeVariant;

  /**
   * The size of the badge
   * @default 'medium'
   */
  size?: BadgeSize;

  /**
   * The shape of the badge
   * @default 'rounded'
   */
  shape?: BadgeShape;

  /**
   * Whether the badge has an outline style
   * @default false
   */
  outlined?: boolean;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Badge value for notification-style badges
   */
  count?: number;

  /**
   * Maximum count to display before showing "count+"
   * @default 99
   */
  maxCount?: number;

  /**
   * Show a dot badge without content
   * @default false
   */
  dot?: boolean;

  /**
   * Makes the badge standalone (not overlaying another element)
   * @default true
   */
  standalone?: boolean;

  /**
   * Optional click handler
   */
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
}

/**
 * Badge Component - Used for displaying counts, status indicators, or labels
 */
const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "medium",
  shape = "rounded",
  outlined = false,
  className = "",
  count,
  maxCount = 99,
  dot = false,
  standalone = true,
  onClick,
}) => {
  // Determine the content to display
  let content = children;
  if (dot) {
    content = null;
  } else if (count !== undefined) {
    content = count > maxCount ? `${maxCount}+` : count;
  }

  // Build CSS class name
  const badgeClasses = [
    "ihub-badge",
    `ihub-badge-${variant}`,
    `ihub-badge-${size}`,
    `ihub-badge-${shape}`,
    outlined ? "ihub-badge-outlined" : "",
    dot ? "ihub-badge-dot" : "",
    !standalone ? "ihub-badge-attached" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={badgeClasses}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {content}
    </span>
  );
};

export default Badge;
