/**
 * Calculates amount after percentage deduction.
 * @param amount Base amount
 * @param coupon CouponType object
 * @returns Object with final amount or error details
 */
export const calculateCouponDeduction = (
  amount: number,
  currency: string,
  coupon: any
): { amount: number; detail?: string; discounted: boolean } => {
  let deduction = 0;
  if (coupon.discount_type === "percentage" || currency !== coupon.currency) {
    if (amount < 0 || coupon.discount < 0 || coupon.discount > 100) {
      return {
        discounted: false,
        amount: 0,
        detail:
          "Amount and percentage should be positive, and percentage should be between 0 and 100.",
      };
    }
    deduction = (amount * coupon.discount) / 100;
  } else if (coupon.discount_type === "amount") {
    if (amount < 0 || coupon.amount < 0 || coupon.amount > amount) {
      return {
        discounted: false,
        amount: coupon.amount,
        detail:
          coupon.amount > amount
            ? "Coupon amount cannot be greater than actual product price."
            : "Amount and discount should be positive.",
      };
    }
    deduction = coupon.amount;
  }
  return {
    amount: amount - deduction,
    discounted: true,
    detail: "Coupon applied successfully.",
  };
};

const couponObj = {
  id: 1,
  total_claimed_coupon: 1,
  content_objects: {
    id: 50,
    uuid: "4f0e9992-fcda-4709-83c6-48d9086c412d",
    slug: "getting-started-with-visual-studio-code",
    title: "Getting Started with Visual Studio Code",
    privacy: "PRIVATE",
    timestamp: "2023-09-08T10:05:03.424885+01:00",
    reward_option: "CERTIFICATE",
    content_type_id: 7,
  },
  code: "DEMO",
  email_list: "",
  object_id: "50",
  valid_from: "2025-01-16T03:04:00+01:00",
  valid_to: "2026-01-17T03:04:00+01:00",
  days_count: 7,
  discount_type: "amount",
  discount: 100,
  amount: 1000,
  currency: "NGN",
  active: true,
  timestamp: "2025-01-16T03:06:58.401091+01:00",
  channel: "10ce8a17-2651-4ddc-86a9-bfe7926869fc",
  content_type: 7,
  students: [],
} as any;

const cal = calculateCouponDeduction(10000, "NGN", couponObj);

console.log("Expected amount: 9000 =========\n\n");
console.log(cal);
console.log("=========\n\n");
