/**
 * Application credential field definitions
 */
export interface CredentialField {
  label: string;
  type: string;
  placeholder?: string;
}

export interface CredentialsType {
  username: CredentialField;
  password: CredentialField;
  first_name: CredentialField;
  last_name: CredentialField;
  mobile: CredentialField;
  date_of_birth: CredentialField;
  password2: CredentialField;
  coupon: CredentialField;
  name: CredentialField;
  channel: CredentialField;
  company_size: CredentialField;
  description: CredentialField;
  industry: CredentialField;
}

export const CREDENTIALS: CredentialsType = {
  username: {
    label: "Email",
    type: "email",
    placeholder: "example@gmail.com",
  },
  password: { label: "Password", type: "password" },
  first_name: { label: "First Name", type: "text", placeholder: "John" },
  last_name: { label: "Last Name", type: "text", placeholder: "Smith" },
  mobile: {
    label: "Mobile Number",
    type: "tel",
    placeholder: "+2347000032123",
  },
  date_of_birth: { label: "Date of Birth", type: "date" },
  password2: { label: "Confirm Password", type: "password" },
  coupon: { label: "Coupon Code (Optional)", type: "text" },
  name: { label: "Business Name", type: "text" },
  channel: { label: "Channel", type: "text" },
  company_size: { label: "Company Size", type: "text" },
  description: { label: "Description", type: "text" },
  industry: { label: "Industry", type: "text" },
};

/**
 * Company size options
 */
export const COMPANY_SIZES_CHOICES: string[] = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1001-5000",
  "5001-10,000",
  "10,001+",
];

/**
 * Academic program levels
 */
export const PROGRAM_LEVELS: string[] = ["100", "200", "300", "400", "500"];

/**
 * Industry categories
 */
export const INDUSTRIES: string[] = [
  "Information Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Retail",
  "Hospitality",
  "Transportation",
  "Media",
  "Telecommunications",
  "Real Estate",
  "Construction",
  "Energy",
  "Automotive",
  "Food and Beverage",
  "Agriculture",
  "Pharmaceutical",
  "Entertainment",
  "Sports",
  "Fashion",
  "Art and Design",
  "Government",
  "Non-profit",
  "Other",
];

/**
 * Data for gauge chart visualization
 */
export interface GaugeDataItem {
  rating: number;
  level: number;
}

export const gaugeData: GaugeDataItem[] = [
  { rating: 1, level: 10 },
  { rating: 2, level: 20 },
  { rating: 3, level: 0 },
  { rating: 4, level: 2 },
  { rating: 5, level: 21 },
];

/**
 * Scoreboard duration filter options
 */
export interface ScoreboardDuration {
  id: number;
  title: string;
}

export const SCOREBOARD_DURATION: ScoreboardDuration[] = [
  { id: 0, title: "All" },
  { id: 1, title: "7 Days" },
  { id: 4, title: "One Month" },
  { id: 12, title: "Three Month" },
  { id: 24, title: "Six Month" },
  { id: 48, title: "One Year" },
];

/**
 * Currency symbols for different currencies
 */
export const CURRENCY_SYMBOL: Record<string, string> = {
  NGN: "₦", // Nigerian Naira
  USD: "$", // US Dollar
  EUR: "€", // Euro
  GBP: "£", // British Pound
  JPY: "¥", // Japanese Yen
  CNY: "¥", // Chinese Yuan
  INR: "₹", // Indian Rupee
  RUB: "₽", // Russian Ruble
  KRW: "₩", // South Korean Won
  BRL: "R$", // Brazilian Real
  AUD: "A$", // Australian Dollar
  CAD: "C$", // Canadian Dollar
  CHF: "CHF", // Swiss Franc
  ZAR: "R", // South African Rand
  SGD: "S$", // Singapore Dollar
  NZD: "NZ$", // New Zealand Dollar
  MXN: "MX$", // Mexican Peso
  HKD: "HK$", // Hong Kong Dollar
  SEK: "kr", // Swedish Krona
  NOK: "kr", // Norwegian Krone
  DKK: "kr", // Danish Krone
  TRY: "₺", // Turkish Lira
  AED: "د.إ", // UAE Dirham
  SAR: "﷼", // Saudi Riyal
  EGP: "E£", // Egyptian Pound
  GHS: "GH₵", // Ghanaian Cedi
  KES: "KSh", // Kenyan Shilling
  ZMW: "ZK", // Zambian Kwacha
  UGX: "USh", // Ugandan Shilling
  TZS: "TSh", // Tanzanian Shilling
  ETB: "Br", // Ethiopian Birr
};

/**
 * User role permission levels
 */
export const ADMIN_PERMISSION: string[] = [
  "LEARNER",
  "BLOGGER",
  "INSTRUCTOR",
  "ADMIN",
];
export const REGISTRAR_PERMISSION: string[] = ["REGISTRAR", "SUPER_ADMIN"];
export const SUPER_PERMISSION: string[] = [
  "LEARNER",
  "BLOGGER",
  "INSTRUCTOR",
  "ADMIN",
  "FINANCE",
  "REGISTRAR",
  "SUPER_ADMIN",
];

/**
 * Content type options for course materials
 */
export interface ContentTypeOption {
  label: string;
  value: string;
  icon: string;
  item: Record<string, any>;
}

export const CONTENT_TYPE_OPTIONS: ContentTypeOption[] = [
  {
    label: "Text",
    value: "text",
    icon: "pi pi-file",
    item: { content: "", tag: "p" },
  },
  {
    label: "Image",
    value: "image",
    icon: "pi pi-image",
    item: { file_key: "" },
  },
  {
    label: "File",
    value: "file",
    icon: "pi pi-file",
    item: { file_key: "", caption: "" },
  },
  {
    label: "Quote",
    value: "quote",
    icon: "pi pi-quote-left",
    item: { content: "", author: "" },
  },
  {
    label: "Note",
    value: "note",
    icon: "pi pi-pencil",
    item: { content: "", options: "NOTE" },
  },
  {
    label: "Link",
    value: "link",
    icon: "pi pi-link",
    item: { content: "", options: "LINK" },
  },
  {
    label: "Code",
    value: "code",
    icon: "pi pi-code",
    item: { content: "", language: "plaintext" },
  },
];

/**
 * Duration filter options
 */
export interface DurationFilter {
  title: string;
  id: number;
}

export const DURATION_FILTERS: DurationFilter[] = [
  { title: "Last 24 hours", id: 1 },
  { title: "Last 7 days", id: 7 },
  { title: "Last 30 days", id: 30 },
  { title: "Last 3 months", id: 90 },
  { title: "Last 6 months", id: 180 },
  { title: "Last 1 year", id: 365 },
];

/**
 * Skill level categories
 */
export type SkillLevel = "EXPLORER" | "BEGINNER" | "INTERMEDIATE" | "EXPERT";
export const SKILLS_LEVELS: SkillLevel[] = [
  "EXPLORER",
  "BEGINNER",
  "INTERMEDIATE",
  "EXPERT",
];

/**
 * Course reward options
 */
export interface CourseRewardOption {
  title: string;
  id: string;
}

export const COURSE_REWARD_OPTIONS: CourseRewardOption[] = [
  { title: "None", id: "" },
  { title: "Certificate", id: "CERTIFICATE" },
  { title: "Badge", id: "BADGE" },
];

/**
 * Privacy setting options
 */
export type PrivacyOption = "PRIVATE" | "PUBLIC" | "DRAFT";
export const PRIVACY: PrivacyOption[] = ["PRIVATE", "PUBLIC", "DRAFT"];

/**
 * Subscription tier options
 */
export type SubscriptionOption = "Basic" | "Pro" | "Pro+" | "Pro Max";
export const SUBSCRIPTION_OPTION: SubscriptionOption[] = [
  "Basic",
  "Pro",
  "Pro+",
  "Pro Max",
];

/**
 * Student enrollment status options
 */
export type StudentStatus =
  | "SHORTLIST"
  | "DELIST"
  | "SUSPENDED"
  | "DISCONTINUED"
  | "ACTIVE"
  | "PENDING";
export const STUDENT_STATUS: StudentStatus[] = [
  "SHORTLIST",
  "DELIST",
  "SUSPENDED",
  "DISCONTINUED",
  "ACTIVE",
  "PENDING",
];

/**
 * Programming language options for code snippets
 */
export const CODE_LANGUAGES: string[] = [
  "plaintext",
  "javascript",
  "typescript",
  "html",
  "css",
  "sass",
  "scss",
  "json",
  "yaml",
  "markdown",
  "python",
  "java",
  "cpp",
  "csharp",
  "ruby",
  "php",
  "swift",
  "kotlin",
  "go",
  "rust",
  "shell",
  "sql",
  "bash",
  "dockerfile",
  "graphql",
  "xml",
];

/**
 * Yes/No options
 */
export interface YesNoOption {
  id: string;
  title: string;
}

export const YES_NO: YesNoOption[] = [
  { id: "YES", title: "Yes" },
  { id: "NO", title: "No" },
];

/**
 * True/False options
 */
export interface TrueFalseOption {
  id: boolean;
  title: string;
}

export const TRUE_FALSE: TrueFalseOption[] = [
  { id: true, title: "Yes" },
  { id: false, title: "No" },
];

/**
 * Video player source options
 */
export interface VideoPlayerOption {
  id: string;
  title: string;
  pattern: RegExp;
}

export const VIDEO_PLAYER_OPTIONS: VideoPlayerOption[] = [
  {
    id: "UPLOAD",
    title: "Upload",
    pattern: /"UPLOAD"/,
  },
  {
    id: "INSTINCTHUB",
    title: "InstinctHub",
    pattern:
      /^(https:\/\/(files\.instincthub\.com|noaholatoye\.nyc3\.digitaloceanspaces\.com|noaholatoye\.nyc3\.cdn\.digitaloceanspaces\.com|codecs\.nyc3\.digitaloceanspaces\.com|codecs\.nyc3\.cdn\.digitaloceanspaces\.com|instincthub\.nyc3\.digitaloceanspaces\.com|instincthub\.nyc3\.cdn\.digitaloceanspaces\.com))/,
  },
  {
    id: "YOUTUBE",
    title: "YouTube",
    pattern: /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([^\s&]+)/,
  },
  {
    id: "FACEBOOK",
    title: "Facebook",
    pattern: /facebook\.com\/.*\/videos\/\d+/,
  },
  {
    id: "SOUNDCLOUD",
    title: "SoundCloud",
    pattern: /soundcloud\.com\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+/,
  },
  {
    id: "STREAMABLE",
    title: "Streamable",
    pattern: /streamable\.com\/[A-Za-z0-9]+/,
  },
  { id: "VIMEO", title: "Vimeo", pattern: /vimeo\.com\/(\d+)/ },
  { id: "MUX", title: "Mux", pattern: /mux\.com\/playback\/[A-Za-z0-9_-]+/ },
  {
    id: "WISTIA",
    title: "Wistia",
    pattern: /wistia\.com\/medias\/[A-Za-z0-9_-]+/,
  },
  { id: "TWITCH", title: "Twitch", pattern: /twitch\.tv\/[A-Za-z0-9_]+/ },
  {
    id: "DAILYMOTION",
    title: "DailyMotion",
    pattern: /dailymotion\.com\/video\/[A-Za-z0-9]+/,
  },
  { id: "VIDYARD", title: "Vidyard", pattern: /vidyard\.com\/[A-Za-z0-9_-]+/ },
  {
    id: "KALTURA",
    title: "Kaltura",
    pattern: /kaltura\.com\/.*\/entry_id\/[A-Za-z0-9_]+/,
  },
];

/**
 * SEO keyword description
 */
export const KEYWORD_DESCRIPTION: string =
  "Keywords can be useful to help the SEO (Search Engine Optimization) understand your content; which also plays a huge role in helping viewers find your course.";

/**
 * Payment processing options
 */
export interface PaymentOption {
  id: string;
  title: string;
}

export const PAYMENT_PROCESSING_OPTIONS: PaymentOption[] = [
  { id: "", title: "Payment Processing" },
  { id: "CASH", title: "Cash" },
  { id: "E-TRANSFER", title: "E-Transfer" },
  { id: "PAYSTACK", title: "Paystack" },
  { id: "FLUTTERWAVE", title: "Flutterwave" },
  { id: "INTERSWITCH", title: "Interswitch" },
  { id: "PAYU", title: "PayU" },
  { id: "PAYPAL", title: "PayPal" },
  { id: "STRIPE", title: "Stripe" },
  { id: "APPLE", title: "Apple" },
  { id: "ZENITH_GLOBALPAY", title: "Zenith Global Pay" },
  { id: "GTPAY", title: "GTPay" },
  { id: "OTHERS", title: "Others" },
];

/**
 * Nigerian banks and fintech options
 */
export interface BankOption {
  id: string;
  title: string;
}

export const NIGERIA_BANKS: BankOption[] = [
  // Banks
  { id: "ACCESS_BANK", title: "Access Bank Plc" },
  { id: "CITIBANK_NIGERIA", title: "Citibank Nigeria Limited" },
  { id: "ECOBANK_NIGERIA", title: "Ecobank Nigeria Plc" },
  { id: "FIDELITY_BANK", title: "Fidelity Bank Plc" },
  { id: "FIRST_BANK", title: "First Bank of Nigeria Limited" },
  { id: "FCMB", title: "First City Monument Bank Plc" },
  { id: "GLOBUS_BANK", title: "Globus Bank Limited" },
  { id: "GTBANK", title: "Guaranty Trust Bank Plc" },
  { id: "KEYSTONE_BANK", title: "Keystone Bank Limited" },
  { id: "OPTIMUS_BANK", title: "Optimus Bank" },
  { id: "PARALLEX_BANK", title: "Parallex Bank Limited" },
  { id: "POLARIS_BANK", title: "Polaris Bank Limited" },
  { id: "PREMIUM_TRUST_BANK", title: "Premium Trust Bank" },
  { id: "PROVIDUS_BANK", title: "Providus Bank Limited" },
  { id: "STANBIC_IBTC", title: "Stanbic IBTC Bank Plc" },
  {
    id: "STANDARD_CHARTERED",
    title: "Standard Chartered Bank Nigeria Limited",
  },
  { id: "STERLING_BANK", title: "Sterling Bank Plc" },
  { id: "SUNTRUST_BANK", title: "SunTrust Bank Nigeria Limited" },
  { id: "TITAN_TRUST_BANK", title: "Titan Trust Bank Limited" },
  { id: "UNION_BANK", title: "Union Bank of Nigeria Plc" },
  { id: "UBA", title: "United Bank for Africa Plc" },
  { id: "UNITY_BANK", title: "Unity Bank Plc" },
  { id: "WEMA_BANK", title: "Wema Bank Plc" },
  { id: "ZENITH_BANK", title: "Zenith Bank Plc" },

  // Fintech Companies
  { id: "FLUTTERWAVE", title: "Flutterwave" },
  { id: "PAYSTACK", title: "Paystack" },
  { id: "INTERSWITCH", title: "Interswitch" },
  { id: "PAGA", title: "Paga" },
  { id: "CARBON", title: "Carbon" },
  { id: "OPAY", title: "OPay" },
  { id: "KUDA_BANK", title: "Kuda Bank" },
  { id: "PIGGYVEST", title: "PiggyVest" },
  { id: "COWRYWISE", title: "Cowrywise" },
  { id: "MONIEPOINT", title: "Moniepoint" },
  { id: "REMITA", title: "Remita" },
  { id: "MINTYN_BANK", title: "Mintyn Bank" },

  // Default
  { id: "OTHER", title: "Other" },
];

/**
 * Application fee type options
 */
export interface ApplicationFeeOption {
  id: string;
  title: string;
}

export const APPLICATION_FEE_TYPE_OPTIONS: ApplicationFeeOption[] = [
  { id: "", title: "Application Fee Type" },
  { id: "APPLICATION_FEE", title: "Application Fee" },
  { id: "ACCEPTANCE_FEE", title: "Acceptance Fee" },
  { id: "SCHOOL_FEE", title: "School Fee" },
];

/**
 * NextAuth session data dummy for testing and development
 */
export interface NextAuthSessionData {
  user: {
    id: string;
    name: any;
    email: string;
    image?: string;
    role?: string;
    permissions?: string[];
  };
  expires: string;
  accessToken?: string;
  refreshToken?: string;
}

export const NEXT_AUTH_SESSION_DATA_DUMMY: NextAuthSessionData = {
  user: {
    id: "user-123",
    name: {
      full_name: "John Doe",
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      picture: "/public/globe.svg",
      role: "ADMIN",
      permissions: ["LEARNER", "BLOGGER", "INSTRUCTOR", "ADMIN"],
      category: "Instructor",
      phone: "+2347000000000",
      country: "Nigeria",
      state: "Lagos",
      city: "Lagos",
      address: "123 Main St, Lagos",
      zip_code: "12345",
      created_at: "2021-01-01",
      updated_at: "2021-01-01",
      is_active: true,
      is_verified: true,
      is_email_verified: true,
      is_phone_verified: true,
      is_address_verified: true,
      is_city_verified: true,
      is_state_verified: true,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1OTYzODQwLCJpYXQiOjE3NDUwOTk4NDAsImp0aSI6IjczNmEyZmI1MjI2MzRmZDQ5ZjVjOGVjY2M2NWMwZTk5IiwidXNlcl9pZCI6MX0.PFOvGYlhn2XHrEz2VM6oacpFEUtdhdrit54tKfnKDYQ",
    },
    email: "john.doe@example.com",
    image: "https://via.placeholder.com/150",
    role: "ADMIN",
    permissions: ["LEARNER", "BLOGGER", "INSTRUCTOR", "ADMIN"],
  },
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
  accessToken: "dummy-access-token-12345",
  refreshToken: "dummy-refresh-token-67890",
};
