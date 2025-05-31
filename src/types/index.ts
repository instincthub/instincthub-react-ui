import * as React from "react";

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
  name?: SessionUserNameType;
  track?: boolean;
  profile_id?: string;
  verified?: boolean;
  is_staff?: boolean;
  status?: number;
  [key: string]: any;
}

/**
 * Session data structure
 */
export interface SessionType {
  expires: string;
  user?: SessionUserType;
  [key: string]: any;
}

export type SearchParamsType = {
  [key: string]: string;
};

export interface SearchParamsPageProps {
  params: SearchParamsType;
  searchParams: SearchParamsType;
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
  accessor: keyof T | ((row: T) => React.ReactNode);
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

export interface NavbarPropsType {
  session: SessionType | null;
  logoSrc: string;
  logoAlt?: string;
  navLinks: NavLinkType[];
  userAreaLinks?: UserAreaLinkType[];
  theme?: "LightMode" | "DarkMode";
  containerClass?: string;
}

// Define props interface
export interface LoginFormPropsType {
  params?: SearchParamsType;
  searchParams: SearchParamsType;
  endpointPath?: string;
  verificationPath?: string;
  redirectPath?: string;
  hideResetPassword?: boolean;
  hideSignup?: boolean;
  type?:
    | string
    | "sis"
    | "skills"
    | "lms"
    | "crm"
    | "ecommerce"
    | "inventory"
    | "hr";
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
