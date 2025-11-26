export type PaymentStatusType =
  | "unpaid"
  | "paid"
  | "overdue"
  | "partially_paid"
  | "refunded"
  | "failed"
  | "pending"
  | "in_progress"
  | "canceled"
  | "expired"
  | "voided";

export interface CouponType {
  id: number;
  total_claimed_coupon?: number;
  content_objects?: CouponContentObjectType;
  code: string;
  email_list: string;
  object_id: string;
  valid_from: string;
  valid_to: string;
  days_count: number;
  discount_type: "percentage" | "amount" | null;
  discount: number;
  amount: number;
  currency: "NGN" | "USD" | "EUR" | string;
  active: boolean;
  timestamp: string;
  channel: string;
  content_type: number;
  students: any[];
  details?: string;
  [key: string]: any;
}

export interface CouponContentObjectType {
  id: number;
  uuid: string;
  slug: string;
  title: string;
  privacy: string;
  timestamp: string;
  issue_certificate: boolean;
  content_type_id: number;
}
