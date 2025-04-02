# Constants Documentation

A comprehensive collection of application constants, providing type-safe definitions for form fields, dropdown options, and configuration settings.

## Table of Contents

- [Credentials](#credentials)
- [Company Information](#company-information)
- [Academic Settings](#academic-settings)
- [User Interface](#user-interface)
- [User Permissions](#user-permissions)
- [Content Management](#content-management)
- [Payment Processing](#payment-processing)
- [Banking Options](#banking-options)

## Credentials

Definitions for form input fields used in authentication and registration flows.

```typescript
export interface CredentialField {
  label: string;
  type: string;
  placeholder?: string;
}

export const CREDENTIALS: CredentialsType = {
  username: {
    label: "Email",
    type: "email",
    placeholder: "example@gmail.com",
  },
  // ... other fields
};
```

## Company Information

Constants related to company information and industry categorization.

### Company Sizes

```typescript
export const COMPANY_SIZES_CHOICES: string[] = [
  "1-10",
  "11-50",
  "51-200",
  // ... additional size ranges
];
```

### Industries

```typescript
export const INDUSTRIES: string[] = [
  "Information Technology",
  "Finance",
  "Healthcare",
  // ... other industry options
];
```

## Academic Settings

Constants for educational program management.

### Program Levels

```typescript
export const PROGRAM_LEVELS: string[] = ["100", "200", "300", "400", "500"];
```

### Student Status Options

```typescript
export type StudentStatus = "SHORTLIST" | "DELIST" | "SUSPENDED" | "DISCONTINUED" | "ACTIVE" | "PENDING";
export const STUDENT_STATUS: StudentStatus[] = [
  "SHORTLIST",
  "DELIST",
  // ... other status options
];
```

## User Interface

Constants for UI components and visualizations.

### Gauge Data

```typescript
export interface GaugeDataItem {
  rating: number;
  level: number;
}

export const gaugeData: GaugeDataItem[] = [
  { rating: 1, level: 10 },
  // ... other data points
];
```

### Scoreboard Duration

```typescript
export interface ScoreboardDuration {
  id: number;
  title: string;
}

export const SCOREBOARD_DURATION: ScoreboardDuration[] = [
  { id: 0, title: "All" },
  { id: 1, title: "7 Days" },
  // ... other duration options
];
```

### Currency Symbols

```typescript
export const CURRENCY_SYMBOL: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  // ... other currency symbols
};
```

## User Permissions

Constants defining permission levels for different user roles.

```typescript
export const ADMIN_PERMISSION: string[] = ["LEARNER", "BLOGGER", "INSTRUCTOR", "ADMIN"];
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
```

## Content Management

Constants for content creation and management.

### Content Types

```typescript
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
  // ... other content type options
];
```

### Code Languages

```typescript
export const CODE_LANGUAGES: string[] = [
  "plaintext",
  "javascript",
  "typescript",
  // ... other programming languages
];
```

### Video Player Options

```typescript
export interface VideoPlayerOption {
  id: string;
  title: string;
  pattern: RegExp;
}

export const VIDEO_PLAYER_OPTIONS: VideoPlayerOption[] = [
  {
    id: "YOUTUBE",
    title: "YouTube",
    pattern: /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([^\s&]+)/,
  },
  // ... other video platform options
];
```

## Payment Processing

Constants for payment processing configurations.

```typescript
export interface PaymentOption {
  id: string;
  title: string;
}

export const PAYMENT_PROCESSING_OPTIONS: PaymentOption[] = [
  { id: "", title: "Payment Processing" },
  { id: "CASH", title: "Cash" },
  { id: "PAYSTACK", title: "Paystack" },
  // ... other payment options
];
```

## Banking Options

Constants for banking integrations, particularly focused on Nigerian banks.

```typescript
export interface BankOption {
  id: string;
  title: string;
}

export const NIGERIA_BANKS: BankOption[] = [
  { id: "ACCESS_BANK", title: "Access Bank Plc" },
  { id: "GTBANK", title: "Guaranty Trust Bank Plc" },
  // ... other bank options
];
```

## Application Fee Options

```typescript
export interface ApplicationFeeOption {
  id: string;
  title: string;
}

export const APPLICATION_FEE_TYPE_OPTIONS: ApplicationFeeOption[] = [
  { id: "", title: "Application Fee Type" },
  { id: "APPLICATION_FEE", title: "Application Fee" },
  // ... other fee type options
];
```