// Common props for all card variants
export interface BaseCardPropsType {
  /** CSS classes to add to the card element */
  className?: string;
  /** Accent color variant */
  accent?: "cyan" | "rose" | "green" | "purple";
  /** Whether to use dark theme styling */
  darkTheme?: boolean;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Card size variant */
  size?: "default" | "sm";
  /** Whether to add a border to the card */
  border?: boolean;
  /** Whether to add a shadow to the card */
  shadow?: boolean;
  /** Click handler for the entire card */
  onClick?: () => void;
}

// Basic Card Props
export interface CardPropsType extends BaseCardPropsType {
  /** Card title content */
  title?: React.ReactNode;
  /** Whether to add an accent bar to the header */
  accentHeader?: boolean;
  /** Footer content */
  footer?: React.ReactNode;
  /** Main card content */
  children: React.ReactNode;
}

// Media Card Props
export interface MediaCardPropsType extends CardPropsType {
  /** Image source URL */
  imageUrl: string;
  /** Alt text for the image */
  imageAlt: string;
  /** Optional badge text to display over the image */
  badge?: {
    text: string;
    color: string;
  };
}

// Profile Card Props
export interface ProfileCardPropsType extends BaseCardPropsType {
  /** Profile image URL */
  imageUrl: string;
  /** Name of the person */
  name: string;
  /** Role or position */
  role?: string;
  /** Bio or description */
  bio?: string;
  /** Social media links */
  socialLinks?: Array<{
    icon: React.ReactNode;
    url: string;
    label: string;
  }>;
  /** Additional content */
  children?: React.ReactNode;
}

// Feature Card Props
export interface FeatureCardPropsType extends BaseCardPropsType {
  /** Icon element */
  icon: React.ReactNode;
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Additional content */
  children?: React.ReactNode;
}

// Pricing Card Props
export interface PricingCardPropsType extends BaseCardPropsType {
  /** Plan title */
  title: string;
  /** Price amount */
  price: string;
  /** Billing period */
  period?: string;
  /** List of features */
  features: string[];
  /** CTA button text */
  buttonText?: string;
  /** CTA button action */
  onButtonClick?: () => void;
  /** Whether this is the recommended plan */
  recommended?: boolean;
}
