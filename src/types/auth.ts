// types/auth.ts
import { User as AuthUser } from "next-auth";

// Branded types for better type safety
export type ChannelId = string & { readonly brand: unique symbol };
export type UserId = string & { readonly brand: unique symbol };
export type WorkspaceId = string & { readonly brand: unique symbol };
export type SubscriptionId = string & { readonly brand: unique symbol };

// Utility types
export type PlanType = "free" | "starter" | "pro" | "enterprise";
export type PlanStatus = "active" | "inactive" | "cancelled" | "past_due";
export type UserRole = "owner" | "admin" | "member" | "viewer";
export type ThemePreference = "light" | "dark" | "system";
export type RateLimitWindow = "minute" | "hour" | "day";
export type Permissions =
  | "LEARNER"
  | "BLOGGER"
  | "EVENT"
  | "MODERATOR"
  | "INSTRUCTOR"
  | "ADMIN"
  | "REGISTRAR"
  | "FINANCE"
  | "SUPER_ADMIN"
  | any;

/**
 * Base channel structure representing a user's channel membership
 */
export interface Channel {
  /** Unique channel identifier */
  id: ChannelId;
  /** Display name of the channel */
  name: string;
  /** Unique username for the channel */
  username: string;
  /** Channel thumbnail image URL */
  thumbnail?: string;
  /** User's role within this channel */
  role: UserRole;
  /** Current subscription plan for this channel */
  plan: PlanType;
  /** Current status of the channel's plan */
  planStatus: PlanStatus;
  /** Start date of current billing period */
  currentPeriodStart?: Date;
  /** End date of current billing period */
  currentPeriodEnd?: Date;
  /** Whether plan will be cancelled at period end */
  cancelAtPeriodEnd?: boolean;
  /** Custom primary color for channel branding */
  primaryColor?: string;
  /** Channel-specific permissions for this user */
  permissions?: Permissions[];
  /** Date when user joined this channel */
  joinedAt: Date;
  /** Last time user accessed this channel */
  lastAccessedAt?: Date;
  /** Channel-specific user settings */
  settings?: Record<string, any>;
}

/**
 * Container for user's channel information
 */
export interface UserChannels {
  /** Currently active/selected channel */
  active: Channel | null;
  /** List of all channels user has access to */
  list: Channel[];
  /** Total number of channels */
  count: number;
}

/**
 * User subscription details and billing information
 */
export interface UserSubscription {
  /** Unique subscription identifier */
  id: SubscriptionId;
  /** Current subscription plan */
  plan: PlanType;
  /** Current subscription status */
  status: PlanStatus;
  /** Start date of current billing period */
  currentPeriodStart: Date;
  /** End date of current billing period */
  currentPeriodEnd: Date;
  /** Whether subscription will be cancelled at period end */
  cancelAtPeriodEnd?: boolean;
  /** Trial end date if applicable */
  trialEnd?: Date;
  /** List of enabled features */
  features?: string[];
  /** Usage limits for this subscription */
  limits?: {
    /** Maximum number of channels allowed */
    channels?: number;
    /** Storage limit in bytes */
    storage?: number;
    /** Bandwidth limit in bytes */
    bandwidth?: number;
    /** API calls limit per period */
    apiCalls?: number;
  };
}

/**
 * Workspace/organization context
 */
export interface Workspace {
  /** Unique workspace identifier */
  id: WorkspaceId;
  /** Display name of the workspace */
  name: string;
  /** Parent organization identifier */
  organizationId: string;
  /** Whether this is the user's default workspace */
  isDefault?: boolean;
}

/**
 * API rate limiting information
 */
export interface RateLimit {
  /** Maximum requests allowed in the window */
  limit: number;
  /** Remaining requests in current window */
  remaining: number;
  /** When the rate limit window resets */
  reset: Date;
  /** Duration of the rate limit window */
  window: RateLimitWindow;
}

/**
 * User notification preferences
 */
export interface NotificationPreferences {
  /** Enable email notifications */
  email?: boolean;
  /** Enable push notifications */
  push?: boolean;
  /** Enable SMS notifications */
  sms?: boolean;
}

/**
 * User application preferences
 */
export interface UserPreferences {
  /** Notification settings */
  notifications?: NotificationPreferences;
  /** UI theme preference */
  theme?: ThemePreference;
  /** Preferred language code */
  language?: string;
}

/**
 * Complete user structure extending NextAuth User
 */
export interface User extends AuthUser {
  // Basic info
  /** Unique user identifier */
  id: UserId;
  /** Unique UUID for the user */
  uuid: string;
  /** User's email address */
  email: string;
  /** User's display name */
  name: string;
  /** User's first name */
  firstName?: string;
  /** User's last name */
  lastName?: string;
  /** Unique username */
  username?: string;
  /** Profile image URL */
  image?: string;
  /** Is user email verfied? */
  emailVerified?: boolean;
  /** User's phone number */
  phoneNumber?: string;
  /** Phone verification status */
  phoneVerified?: boolean;

  // Authentication
  /** Whether 2FA is enabled */
  twoFactorEnabled?: boolean;
  /** Last login timestamp */
  lastLoginAt?: Date;
  /** IP address of last login */
  lastLoginIp?: string;
  /** Total number of logins */
  loginCount?: number;

  // Additional metadata
  /** Account creation timestamp */
  createdAt?: Date;
  /** Last profile update timestamp */
  updatedAt?: Date;
  /** User's locale preference */
  locale?: string;
  /** User's timezone */
  timezone?: string;
  /** Preferred currency */
  currency?: string;

  // Preferences
  /** User application preferences */
  preferences?: UserPreferences;
}

/**
 * API quota tracking information
 */
export interface ApiQuota {
  /** Number of API calls used in current period */
  used: number;
  /** Maximum API calls allowed in period */
  limit: number;
  /** When the quota resets */
  resetAt: Date;
}

/**
 * Geographic location information
 */
export interface GeoLocation {
  /** Country code */
  country?: string;
  /** Region/state */
  region?: string;
  /** City name */
  city?: string;
}

/**
 * Session error types
 */
export type SessionError =
  | "RefreshAccessTokenError"
  | "SessionExpired"
  | "Unauthorized";

/**
 * Complete Session interface for authenticated users
 */
export interface Session {
  // User information
  /** Full user information */
  user: User;

  // Channels
  /** User's channel memberships */
  channels: UserChannels;

  // Authentication tokens
  /** OAuth access token */
  accessToken: string;
  /** OAuth refresh token */
  refreshToken?: string;
  /** OpenID Connect ID token */
  idToken?: string;
  /** CSRF protection token */
  csrfToken?: string;

  // OAuth specific
  /** OAuth provider name */
  provider?: string;
  /** Provider-specific account ID */
  providerAccountId?: string;
  /** OAuth scopes granted */
  scope?: string;
  /** Token type (usually "Bearer") */
  tokenType?: string;

  // API Keys
  /** User's API key */
  apiKey?: string;
  /** Bearer token for API access */
  bearerToken?: string;
  /** Webhook secret for secure callbacks */
  webhookSecret?: string;

  // Session metadata
  /** Session expiration time (ISO string) */
  expires: string;
  /** Session expiration as Date object */
  expiresAt?: Date;
  /** Session creation timestamp */
  issuedAt?: Date;

  // Organization/Workspace
  /** Current active workspace */
  workspace?: Workspace;
  /** All workspaces user has access to */
  workspaces?: Workspace[];

  // Roles & Permissions
  /** User's global roles */
  roles?: string[];
  /** User's contextual permissions */
  permissions?: string[];
  /** User's global permissions */
  globalPermissions?: string[];

  // Subscription & Billing
  /** User's subscription information */
  userSubscription?: UserSubscription;
  /** Billing contact email */
  billingEmail?: string;
  /** Stripe customer identifier */
  stripeCustomerId?: string;

  // Feature flags
  /** Enabled features map */
  features?: Record<string, boolean>;
  /** A/B test experiments */
  experiments?: Record<string, string>;

  // Rate limiting
  /** API rate limiting information */
  rateLimit?: RateLimit;
  /** API quota usage information */
  apiQuota?: ApiQuota;

  // Compliance & Security
  /** Client IP address */
  ipAddress?: string;
  /** Client user agent string */
  userAgent?: string;
  /** Geographic location information */
  geoLocation?: GeoLocation;
  /** Terms and privacy consent timestamp */
  consentedAt?: Date;
  /** Privacy policy version accepted */
  privacyPolicyVersion?: string;
  /** Terms of service version accepted */
  termsVersion?: string;

  // Error states
  /** Session error type if applicable */
  error?: SessionError;
  /** Human-readable error description */
  errorDescription?: string;

  // Custom metadata
  /** Additional custom session data */
  metadata?: Record<string, any>;
}

// Type guards for runtime validation
export const isValidSession = (session: any): session is Session => {
  return (
    session &&
    typeof session === "object" &&
    session.user &&
    typeof session.user.id === "string" &&
    typeof session.user.email === "string" &&
    typeof session.expires === "string"
  );
};

export const isValidUser = (user: any): user is User => {
  return (
    user &&
    typeof user === "object" &&
    typeof user.id === "string" &&
    typeof user.email === "string" &&
    typeof user.name === "string" &&
    user.channels &&
    Array.isArray(user.channels.list)
  );
};

export const isValidChannel = (channel: any): channel is Channel => {
  return (
    channel &&
    typeof channel === "object" &&
    typeof channel.id === "string" &&
    typeof channel.name === "string" &&
    typeof channel.username === "string" &&
    ["owner", "admin", "member", "viewer"].includes(channel.role) &&
    ["free", "starter", "pro", "enterprise"].includes(channel.plan)
  );
};

// Default values and constants
export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
  theme: "system",
  language: "en",
};

export const DEFAULT_USER_CHANNELS: UserChannels = {
  active: null,
  list: [],
  count: 0,
};

export const PLAN_TYPES: readonly PlanType[] = [
  "free",
  "starter",
  "pro",
  "enterprise",
] as const;
export const USER_ROLES: readonly UserRole[] = [
  "owner",
  "admin",
  "member",
  "viewer",
] as const;
export const PLAN_STATUSES: readonly PlanStatus[] = [
  "active",
  "inactive",
  "cancelled",
  "past_due",
] as const;

// Utility functions
export const createUserId = (id: string): UserId => id as UserId;
export const createChannelId = (id: string): ChannelId => id as ChannelId;
export const createWorkspaceId = (id: string): WorkspaceId => id as WorkspaceId;
export const createSubscriptionId = (id: string): SubscriptionId =>
  id as SubscriptionId;
