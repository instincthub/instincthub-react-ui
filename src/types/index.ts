import * as React from 'react';

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