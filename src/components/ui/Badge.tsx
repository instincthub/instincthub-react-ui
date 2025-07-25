import React from "react";

export type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
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
  children?: React.ReactNode;

  /**
   * Text content to display (alias for children)
   */
  text?: string;

  /**
   * The visual style variant of the badge
   * @default 'default | default primary | success | warning | danger | info'
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
  text,
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
  let content = text || children;
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

/**
 * @example
 * // Basic usage
 * <Badge>New</Badge>
 *
 * @example
 * // Different variants
 * <Badge variant="primary">Primary</Badge>
 * <Badge variant="success">Success</Badge>
 * <Badge variant="warning">Warning</Badge>
 * <Badge variant="danger">Danger</Badge>
 * <Badge variant="info">Info</Badge>
 *
 * @example
 * // Different sizes
 * <Badge size="small">Small</Badge>
 * <Badge size="medium">Medium</Badge>
 * <Badge size="large">Large</Badge>
 *
 * @example
 * // Different shapes
 * <Badge shape="rounded">Rounded</Badge>
 * <Badge shape="pill">Pill</Badge>
 * <Badge shape="square">Square</Badge>
 *
 * @example
 * // Outlined style
 * <Badge variant="primary" outlined>Outlined</Badge>
 *
 * @example
 * // Count badges
 * <Badge count={5} variant="danger" />
 * <Badge count={150} maxCount={99} variant="primary" />
 *
 * @example
 * // Dot badge (status indicator)
 * <Badge dot variant="success" />
 *
 * @example
 * // Clickable badge
 * <Badge
 *   variant="primary"
 *   onClick={(e) => console.log('Badge clicked')}
 * >
 *   Clickable
 * </Badge>
 *
 * @example
 * // Usage recommendations:
 * // 1. For status indicators: use 'dot' prop with appropriate variant
 * // 2. For notification counts: use 'count' prop with 'danger' or 'primary' variant
 * // 3. For labels/tags: use text content with 'pill' shape
 * // 4. For action badges: add onClick handler and use 'primary' variant
 * // 5. For subtle indicators: use 'outlined' prop with muted variants
 */
