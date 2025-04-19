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

/**
 * Session data user information
 */
export interface SessionUserType {
  name?: {
    id?: number;
    uuid?: string;
    email?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    full_name?: string;
    picture?: string;
    token?: string;
    category?: string;
    channels?: any; // Adjust based on structure
    [key: string]: any;
  };
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
