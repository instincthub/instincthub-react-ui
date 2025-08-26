import * as React from "react";
import { Session } from "./auth";
export * from "./payments";
export * from "./channels";
export * from "./permissions";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// Component Props Types
export interface TextFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export interface PasswordFieldProps extends TextFieldProps {
  showToggle?: boolean;
}

export interface DateInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
}

export interface PhoneNumberInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
}

export interface NewSubmitBtnProps {
  text: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

// API Types
export interface RequestOptions {
  method: string;
  headers: Record<string, string>;
  body?: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface SessionUserNameType {
  // Required fields
  id: number | string;
  email: string;
  first_name: string;
  last_name: string;

  // Optional fields
  uuid?: string;
  username?: string;
  full_name?: string;
  picture?: string;
  token?: string;
  category?: string;
  channels?: any; // Adjust based on structure
  [key: string]: any;
}

/**
 * Session data user information
 */
export interface SessionUserType {
  name?: any;
  track?: boolean;
  profile_id?: string;
  verified?: boolean;
  is_staff?: boolean;
  status?: number;
  accessToken?: string;
  refreshToken?: string;
  [key: string]: any;
}

/**
 * Session data structure
 */
export interface SessionType {
  expires: string;
  user?: SessionUserType;
  accessToken?: string;
  refreshToken?: string;
  [key: string]: any;
}

export type SearchParamsType = {
  [key: string]: string;
};

export interface SearchParamsPageType {
  params: SearchParamsType;
  searchParams: SearchParamsType;
}

export interface SearchParamsPageProps {
  params: Promise<SearchParamsType>;
  searchParams: Promise<SearchParamsType>;
}

/**
 * Response interface for S3 uploads
 */
export interface S3UploadResponseType {
  bucket: string;
  title: string;
  key: string;
  content_type: string;
  size: number;
  location: string;
}

// Define interfaces for the component
export interface FilterObjectsType {
  id: string | number;
  title: string;
  [key: string]: any; // For any additional properties
}

/**
 * Props interface for the FileUploader component
 */
export interface FileUploaderType {
  /** Header text to display above the uploader */
  header?: string;
  /** Label text for the dropzone area */
  label?: string;
  /** Accepted file types (e.g., 'image/*', 'video/*', '.pdf,.docx') */
  accept?: string;
  /** Maximum allowed file size in bytes */
  maxFileSize?: number;
  /** Input field name */
  name?: string;
  /** Module identifier for setting values */
  module?: string;
  /** Step identifier for setting values */
  step?: string;
  /** Username for file naming */
  username?: string | null;
  /** Callback for handling the upload response */
  onUploadComplete?: (response: S3UploadResponseType) => void;
  /** Callback for setting values */
  setValues?: (name: string, value: string) => void;
  /** Callback for setting module values */
  setModules?: (module: string, name: string, value: string) => void;
  /** Callback for setting step values */
  setSteps?: (
    module: string,
    step: string,
    name: string,
    value: string
  ) => void;
  /** Additional CSS class names */
  className?: string;
}

export interface FetchDataType {
  page: string;
  token: string | null;
  options: object;
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setNext: React.Dispatch<React.SetStateAction<string | null>>;
  setPrevious: React.Dispatch<React.SetStateAction<string | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  reset: boolean;
}

export interface TabItemType {
  id: string;
  label: string;
  content?: React.ReactNode | JSX.Element | null;
  disabled?: boolean;
}

export interface VerticalTabItemType {
  id: string | number;
  label: string;
  content?: React.ReactNode | JSX.Element | null;
  icon?: React.ReactNode | JSX.Element | null;
  disabled?: boolean;
}

// Define interface for data items
export interface SearchObjectItemType {
  id?: number | string;
  username?: string;
  [key: string]: any; // Allow for dynamic properties
}

// Table Column Type
export interface TableColumnType<T> {
  header: string;
  accessor: keyof T | ((row: T, index?: number) => React.ReactNode);
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  cell?: (row: T) => React.ReactNode;
  tooltip?: boolean;
}

// IHubTableServer Props

export interface ServerPaginationInfoType {
  totalCount: number; // Total number of records on server
  currentPage: number; // Current page number (1-based)
  perPage: number; // Number of items per page
  totalPages: number; // Total number of pages
}

export interface ApiResponseType<T> {
  data: T[]; // Array of records for current page
  pagination?: ServerPaginationInfoType; // Pagination metadata
  links?: {
    // Optional pagination links
    next?: string | null;
    previous?: string | null;
  };
}

export interface FetchParamsType {
  page: number;
  limit: number;
  search?: string;
  sort?: string;
  direction?: "asc" | "desc";
  filters?: Record<string, any>;
  [key: string]: any;
}

export interface DataResponseType {
  id: string;
  [key: string]: any;
}

// Navbar Types

export interface SubMenuItemType {
  title: string;
  href: string;
  isExternal?: boolean;
  icon?: string | React.ReactNode;
}

export interface NavLinkType {
  title: string;
  href: string;
  isExternal?: boolean;
  highlight?: boolean;
  submenu?: SubMenuItemType[];
}

export interface UserSubMenuItemType {
  title: string;
  href: string;
  isExternal?: boolean;
  icon?: string | React.ReactNode;
}

export interface UserAreaLinkType {
  title: string;
  href: string;
  isExternal?: boolean;
  icon?: string | React.ReactNode;
  isButton?: boolean;
  buttonStyle?: "primary" | "outline";
  submenu?: UserSubMenuItemType[];
}

export interface DropdownRenderProps {
  user: any;
  isOpen: boolean;
  toggleDropdown: () => void;
  closeDropdown: () => void;
}

export interface NavbarPropsType {
  session: SessionType | null;
  logoSrc: string;
  logoAlt?: string;
  navLinks: NavLinkType[];
  userAreaLinks?: UserAreaLinkType[];
  theme?: "LightMode" | "DarkMode";
  containerClass?: string;
  topBanner?: React.ReactNode | JSX.Element | null;
  hideTopBanner?: boolean;
  bottomBanner?: React.ReactNode | JSX.Element | null;
  hideBottomBanner?: boolean;
  userDropdownOpen?: boolean;
  onUserDropdownToggle?: (isOpen: boolean) => void;
  renderUserDropdown?: (props: DropdownRenderProps) => React.ReactNode;
}

// Define props interface
export interface LoginFormPropsType {
  // Existing props
  session?: Session;
  params?: SearchParamsType;
  searchParams: SearchParamsType;
  endpointPath?: string;
  verificationPath?: string;
  redirectPath?: string;
  hideResetPassword?: boolean;
  hideSignup?: boolean;
  channelUsername?: string;
  type?:
    | string
    | "sis"
    | "skills"
    | "lms"
    | "crm"
    | "ecommerce"
    | "inventory"
    | "hr";

  // Loading & State Control Props
  isLoading?: boolean;
  onSubmitStart?: () => void;
  onSubmitComplete?: (success: boolean) => void;
  loadingText?: string;
  preserveFormData?: boolean;

  // Custom Redirect Handlers
  onSuccessRedirect?: (user: SessionUserType, callbackUrl?: string) => void;
  onFailureRedirect?: (error: string) => void;
  customValidationHandler?: (user: SessionUserType) => Promise<boolean>;
  autoRedirectOnSession?: boolean;

  // Form Customization Props
  title?: string;
  subtitle?: string;
  showTitle?: boolean;
  className?: string;
  formClassName?: string;

  // Validation & Error Handling
  enableClientValidation?: boolean;
  customValidationRules?: {
    username?: (value: string) => string | null;
    password?: (value: string) => string | null;
  };
  onError?: (error: string, type: "network" | "validation" | "auth") => void;

  // Session Management Props
  sessionCheckInterval?: number;
  clearCallbackAfterUse?: boolean;

  // UI Customization Props
  submitButtonText?: string;
  submitButtonVariant?:
    | "primary"
    | "important"
    | "outlined"
    | "danger"
    | "default"
    | "icon";
  showRememberMe?: boolean;
  rememberMeText?: string;

  // OAuth & Social Login Props
  enableOAuth?: boolean;
  oauthProviders?: Array<"google" | "github" | "facebook" | "linkedin">;
  oauthConfig?: Record<string, any>;

  // Security Props
  enableCaptcha?: boolean;
  captchaProvider?: "recaptcha" | "hcaptcha";
  enableRateLimiting?: boolean;
  maxAttempts?: number;
  lockoutDuration?: number;

  // Analytics & Tracking Props
  trackingEnabled?: boolean;
  onLoginAttempt?: (username: string) => void;
  onLoginSuccess?: (user: SessionUserType) => void;
  onLoginFailure?: (error: string, username: string) => void;

  // Accessibility Props
  ariaLabel?: string;
  ariaDescribedBy?: string;
  focusOnMount?: boolean;

  // Additional Missing Props
  autoComplete?: boolean;
  validateOnBlur?: boolean;
  debounceValidation?: number;
  showPasswordStrength?: boolean;
  enableFormReset?: boolean;
  autoSave?: boolean;
  autoSaveInterval?: number;
  offlineSupport?: boolean;
  retryAttempts?: number;
  retryDelay?: number;
  sessionTimeoutWarning?: boolean;
  sessionTimeoutDuration?: number;
  csrfToken?: string;
  sanitizeInputs?: boolean;
  highContrastMode?: boolean;
  showLoadingSkeleton?: boolean;
  preventMultipleSubmissions?: boolean;
}

// Option interface for dropdown items
export interface DropdownOptionType {
  label?: string;
  value: string | number;
  disabled?: boolean;
  [key: string]: any;
}

// Props interface for the Dropdown component
export interface DropdownPropsType {
  label?: string;
  name?: string;
  key_name?: string;
  required?: boolean;
  options: DropdownOptionType[];
  selectedValue?: string | number | (string | number)[];
  onChange?: (value: string | number | (string | number)[]) => void;
  placeholder?: string;
  className?: string;
  isMulti?: boolean;
  isSearchable?: boolean;
  noOptionsMessage?: string;
  isDisabled?: boolean;
  maxHeight?: number;
  renderOption?: (option: DropdownOptionType) => React.ReactNode;
}

/**
 * Props for the DateInputPicker component
 */
export interface DateInputPickerPropsType {
  /** Input label */
  label: string;
  /** Current date value in YYYY-MM-DD format */
  value?: string;
  /** Handler called when date changes */
  onChange?: (date: string) => void;
  /** Whether the date input is required */
  required?: boolean;
  /** Minimum allowed date in YYYY-MM-DD format */
  minDate?: string;
  /** Maximum allowed date in YYYY-MM-DD format */
  maxDate?: string;
  /** Array of dates to disable (YYYY-MM-DD format) */
  disabledDates?: string[];
  /** Error message to display */
  errorMessage?: string;
  /** Additional class name */
  className?: string;
  /** Format for displaying the date (default: 'YYYY-MM-DD') */
  displayFormat?: string;
  /** Locale for date formatting (default: 'en-US') */
  locale?: string;
  /** Whether to include time input */
  includeTime?: boolean;
  /** Name attribute for the input field */
  name?: string;
  /** ID attribute for the input field */
  id?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether to show the calendar picker */
  showCalendarPicker?: boolean;
  /** Whether to show today/clear buttons */
  showQuickActions?: boolean;
  /** ARIA label for accessibility */
  ariaLabel?: string;
}

export interface DateInputPickerTimePropsType
  extends Omit<DateInputPickerPropsType, "includeTime"> {
  /** Format for displaying time (12 or 24 hour) */
  timeFormat?: "12h" | "24h";
  /** Whether to include seconds in time selection */
  includeSeconds?: boolean;
  /** Time step in minutes (default: 1) */
  minuteStep?: number;
}

/* ==============================
 * Paystack Payments Types
 * ============================== */

// PayStack configuration interfaces
export interface PaystackMetadataType {
  email: string;
  owner?: string | number | null;
  channel?: string | null;
  content_type?: string | number | null;
  object_id?: string | number | null;
  duration?: string | number | null;
  channel_username?: string | null;
  custom_fields?: Array<Record<string, any>> | null;
  [key: string]: any;
}

export interface PaystackConfigObjectType {
  authorization_code?: string;
  email: string;
  first_name: string;
  last_name: string;
  amount: number;
  currency?: string;
  user_id?: string | number;
  channel_id?: string | number;
  content_type?: string | number;
  object_id?: string | number;
  metadata?: PaystackMetadataType;
}

export interface PaystackConfigType {
  email: string;
  first_name: string;
  last_name: string;
  currency: string;
  amount: number;
  reference?: string;
  authorization_code?: string;
  publicKey?: string | undefined;
  key?: string | undefined;
  callback_url?: string;
  metadata?: PaystackMetadataType;
}

export interface PaystackResponseType {
  status: string;
  reference: string;
  message?: string;
  transaction?: string;
  canceled?: boolean;
  [key: string]: any;
}

export interface PaymentMethodType {
  id: string;
  authorization: {
    email: string;
    card_type: string;
    reusable: boolean;
    signature: string;
    authorization_code: string;
  };
  primary: boolean;
  exp_year: string;
  exp_month: string;
  last4: string;
  country_code: string;
  gateway?: string;
  last_action?: string;
  timestamp: string;
  owner: number;
  user_payment?: string;
}

export interface PaymentObjectsType {
  object_type?: string | number | null;
  object_id?: string | number | null;
  payment_structure?: any;
  student_record?: any;
  [key: string]: any;
}

export interface PaymentContextType {
  e?: Event | null;
  objects: PaymentObjectsType;
  configObj: PaystackConfigObjectType;
  paymentMethod?: PaymentMethodType;
  setStatus: (status: number) => void;
  handleDBAction: (data?: any) => void;
  defaultConfirm?: boolean;
  label: string;
  coupon?: string;
  defaultMsg?: string;
  gatwayCharges?: number;
  openConfirm?: boolean;
}

export interface PaymentReferenceType {
  reference: string;
  trans?: string;
  status: string;
  message?: string;
  transaction?: string;
  trxref?: string;
  redirecturl?: string;
  [key: string]: any;
}

// Pagination

// TypeScript Interfaces
export interface PaginationData {
  count: number;
  next: string | null;
  previous: string | null;
  results: any[];
}

export interface PaginationPropsType {
  /** Current offset value from URL params */
  offset: string | number;
  /** Pagination data from API response */
  data: PaginationData;
  /** Number of items per page */
  limit: number;
  /** API endpoint path */
  urlPath: string;
  /** Function to update data state */
  setData: React.Dispatch<React.SetStateAction<any>>;
  /** Authentication token */
  token?: string | null;
  /** Current tab filter value */
  tabsValues?: string;
  /** Current search query */
  searchValues?: string;
  /** Maximum number of page buttons to show */
  rangeLimit?: number;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show first/last buttons */
  showFirstLast?: boolean;
}

export interface QueryContextType {
  key: string;
  value?: string | number | boolean | null;
  action: "add" | "update" | "remove" | "toggle" | "clear";
}

/**
 * Props for the TimePicker component
 */
export interface TimePickerPropsType {
  /** Input label */
  label: string;
  /** Current time value in HH:MM format or HH:MM:SS format */
  value?: string;
  /** Handler called when time changes */
  onChange?: (time: string) => void;
  /** Whether the time input is required */
  required?: boolean;
  /** Whether to use 12-hour format (default: false for 24-hour) */
  use12Hour?: boolean;
  /** Whether to include seconds in time selection */
  includeSeconds?: boolean;
  /** Time step in minutes (default: 1) */
  step?: number;
  /** Minimum allowed time in HH:MM format */
  minTime?: string;
  /** Maximum allowed time in HH:MM format */
  maxTime?: string;
  /** Array of disabled times in HH:MM format */
  disabledTimes?: string[];
  /** Error message to display */
  errorMessage?: string;
  /** Additional class name */
  className?: string;
  /** Name attribute for the input field */
  name?: string;
  /** ID attribute for the input field */
  id?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether to show the time picker dropdown */
  showTimePicker?: boolean;
  /** Whether to show quick time selection buttons */
  showQuickActions?: boolean;
  /** Accessibility label for screen readers */
  ariaLabel?: string;
}

/**
 * Props for the DateTimePicker component
 */
export interface DateTimePickerPropsType {
  /** Input label */
  label: string;
  /** Current datetime value in ISO format (YYYY-MM-DDTHH:mm:ss) */
  value?: string;
  /** Handler called when datetime changes */
  onChange?: (dateTime: string) => void;
  /** Whether the datetime input is required */
  required?: boolean;
  /** Minimum allowed date in ISO format */
  minDate?: string;
  /** Maximum allowed date in ISO format */
  maxDate?: string;
  /** Minimum allowed time in HH:mm format */
  minTime?: string;
  /** Maximum allowed time in HH:mm format */
  maxTime?: string;
  /** Array of disabled dates in ISO format */
  disabledDates?: string[];
  /** Array of disabled times in HH:mm format */
  disabledTimes?: string[];
  /** Whether to use 12-hour format (default: false) */
  use12Hour?: boolean;
  /** Whether to include seconds in time selection */
  includeSeconds?: boolean;
  /** Time step in minutes for time selection (default: 30) */
  timeStep?: number;
  /** Date display format (default: "yyyy-MM-dd") */
  dateFormat?: string;
  /** Time display format (default: "HH:mm") */
  timeFormat?: string;
  /** Locale for date formatting (default: "en-US") */
  locale?: string;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Custom error message to display */
  errorMessage?: string;
  /** Additional CSS classes to apply */
  className?: string;
  /** Name attribute for form submission */
  name?: string;
  /** Unique identifier for the input */
  id?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether to show the calendar icon */
  showCalendarIcon?: boolean;
  /** Whether to show the time icon */
  showTimeIcon?: boolean;
  /** Whether to show quick action buttons */
  showQuickActions?: boolean;
  /** Accessibility label for screen readers */
  ariaLabel?: string;
  /** Whether to focus the input on mount */
  autoFocus?: boolean;
  /** Focus event handler */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** Blur event handler */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** Whether to use separate input fields instead of single input */
  useSeparateFields?: boolean;
  /** Input mode: datetime (default), date only, or time only */
  mode?: "datetime" | "date" | "time";
}
