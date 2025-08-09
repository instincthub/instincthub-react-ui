/**
 * Channel-related type definitions
 */

export interface CurrencyType {
  id: string;
  title: string;
  country: string;
  code: string;
  symbol: string;
  timestamp: string;
}

export interface ChannelCurrencyType {
  id: number;
  currency_object: CurrencyType;
  last_action_timestamp: string;
  timestamp: string;
  channel: string;
  currency: string;
  last_action_user: number;
}

export interface PlanType {
  id: string;
  title: string;
  display_type: string;
  access_type: string | null;
  active: boolean;
  channel: string;
  owner: number;
}

export interface SubscriptionType {
  id: string;
  plan: PlanType | string | null;
  email: string | null;
  reference: string | null;
  object_id: string | null;
  start_date: string;
  end_date: string;
  status: "ACTIVATED" | "DEACTIVATED" | "PENDING" | "EXPIRED";
  interval: "ONETIME" | "MONTHLY" | "YEARLY" | "WEEKLY";
  reminder_count: string;
  last_action: string;
  timestamp: string;
  owner: number;
  user: number;
  channel: string;
  user_payment: string | null;
  content_type: string | null;
}

export interface ChannelAdmission {
  domain: string;
  status: string | null;
  owner: number | null;
  channel: string | null;
}

export interface ChannelPortalType {
  id: string;
  domain: string;
  subdomain: string;
  prefix: string | null;
  min_units: string;
  max_units: string;
  final_year_units: string;
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  last_action: string;
  timestamp: string;
  owner: number;
  channel: string;
}

export interface ChannelType {
  id: string;
  subscription?: SubscriptionType;
  currency?: ChannelCurrencyType;
  channel_admission?: ChannelAdmission;
  channel_portal?: ChannelPortalType;
  name: string;
  username: string;
  email: string;
  phone: string | null;
  company_size: string;
  primary_color: string;
  thumbnail: string;
  description: string;
  address: string | null;
  plagiarism_declaration: string;
  library_message: string;
  ledger_balance: string;
  main_balance: string;
  website_url: string;
  twitter_url: string;
  linkedin_url: string;
  facebook_url: string;
  instagram_url: string;
  discord_url: string;
  github_url: string;
  admission_url: string | null;
  ip_data: Record<string, any>;
  verified: boolean;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "PENDING";
  timestamp: string;
  owner: number;
  industry: string;
  detail?: string | null;
  [key: string]: any;
}
