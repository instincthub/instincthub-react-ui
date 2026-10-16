import {
  API_HOST_URL,
  calculateCouponDeduction,
  reqOptions,
  setCookie,
} from "./helpFunction";
import {
  getUserEmailInputModal,
  openConfirmModal,
  openToast,
} from "./modals/modals";
import {
  PaystackConfigObjectType,
  PaystackConfigType,
  PaystackResponseType,
  PaymentContextType,
  CouponType,
  SavedCardChargeOptionsType,
} from "@/types";

/** Paystack inline v2 script, needed for server-initialised transactions. */
export const PAYSTACK_INLINE_V2_URL = "https://js.paystack.co/v2/inline.js";

/**
 * Context for processing payments
 * @property {Event | null} [e] - The event object that triggered the payment
 * @property {Object} objects - Details about the item being purchased
 * @property {string} objects.title - Title of the item
 * @property {string | number | null} [objects.object_type] - Model ID of the object being purchased
 * @property {string | number | null} [objects.object_id] - Object ID of the object being purchased
 * @property {PaystackConfigObjectType} configObj - Configuration for PayStack
 * @property {PaymentMethodType} [paymentMethod] - Saved payment method if available
 * @property {Function} setStatus - Function to update UI status during payment process
 * @property {Function} handleDBAction - Callback for processing successful payments
 * @property {boolean} [defaultConfirm] - Whether to show a confirmation dialog
 * @property {string} label - Label for the payment (usually item title)
 * @property {string} [coupon] - Coupon code if applicable
 * @property {string} [defaultMsg] - Custom confirmation message
 * @property {number} [gatwayCharges] - Payment gateway charges percentage
 */

/**
 * Configures the Paystack popup data.
 *
 * Only the PUBLIC key (`NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`) is ever read here.
 * The secret key must never reach the browser: anything a `NEXT_PUBLIC_*`
 * variable holds is inlined into the shipped JavaScript.
 * @param obj - Object containing payment details
 * @returns PaystackConfig - Configured payment data
 */
export const paystackDataConfig = (
  obj: PaystackConfigObjectType
): PaystackConfigType => ({
  reference: new Date().getTime().toString(),
  email: obj.email,
  first_name: obj.first_name,
  last_name: obj.last_name,
  amount: Math.round(obj.amount * 100), // Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
  currency: obj.currency || "NGN",
  key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
  callback_url: window.location.href,
  metadata: obj.metadata,
});

/**
 * Charges the logged-in user's saved card THROUGH THE APP'S SERVER.
 *
 * The browser never calls Paystack's charge_authorization API and never sends
 * an authorization code or an amount the server trusts. It POSTs only what
 * identifies the purchase (`body`, e.g. the saved payment method id, the item
 * and a coupon code) to `chargeUrl`; the server looks the card up by the
 * logged-in user, prices the item itself and charges it with its own secret
 * key. The server is expected to answer with the Paystack transaction object
 * (`status`, `reference`, `amount`, ...), optionally wrapped in `data`.
 *
 * @example
 * ```ts
 * const res = await chargeAuthorization({
 *   chargeUrl: `${API_HOST_URL}payments/${channel}/paystack/charge-saved-card/`,
 *   token,
 *   body: { payment_method_id: card.id, item_type: "course", item_id: course.id },
 * });
 * if (res.status === "success") recordPayment(res);
 * ```
 * @param options - Server endpoint, auth token and purchase identifiers
 * @returns Promise with the transaction data (status "failed" on error)
 */
export const chargeAuthorization = async (
  options: SavedCardChargeOptionsType
): Promise<any> => {
  if (!options?.chargeUrl) {
    openToast("Saved card payments are not available here.", 400);
    return { status: "failed", message: "chargeUrl is required" };
  }

  const requestOptions = reqOptions(
    "POST",
    JSON.stringify(options.body || {}),
    options.token || null,
    "json",
    options.channel || null
  );

  try {
    const req = await fetch(options.chargeUrl, requestOptions);
    const res = await req.json().catch(() => ({}));
    const data = res?.data && typeof res.data === "object" ? res.data : res;

    if (req.ok && data?.status === "success") {
      openToast(`Payment was successful with reference: ${data.reference}`);
      return data;
    }

    const message =
      res?.detail ||
      data?.gateway_response ||
      data?.message ||
      "Payment could not be completed with the saved card";
    openToast(message, 400);
    return { ...data, status: data?.status || "failed", message };
  } catch (error) {
    openToast("Payment processing error occurred", 400);
    console.error("Saved card charge error:", error);
    return { status: "failed", error };
  }
};

/**
 * Opens the Paystack popup for a transaction the app's SERVER initialised
 * (POST /transaction/initialize with the secret key), so amount, email and
 * metadata are fixed server-side and cannot be changed in the browser.
 *
 * Uses Paystack inline v2 (`resumeTransaction`). The v2 script is loaded on
 * demand when it is not already on the page.
 * @param accessCode - `access_code` returned by the server's initialize call
 * @returns Promise with the payment response (`status: "canceled"` on close)
 */
export const payWithAccessCode = (
  accessCode: string
): Promise<PaystackResponseType> => {
  const empty = { email: "", amount: 0 };

  const loadV2 = (): Promise<any> =>
    new Promise((resolve, reject) => {
      const existing = (window as any).PaystackPop;
      if (existing && typeof existing === "function") {
        return resolve(existing);
      }
      const script = document.createElement("script");
      script.src = PAYSTACK_INLINE_V2_URL;
      script.async = true;
      script.onload = () => resolve((window as any).PaystackPop);
      script.onerror = () => reject(new Error("Paystack script failed to load"));
      document.body.appendChild(script);
    });

  return new Promise(async (resolve) => {
    try {
      if (!accessCode) throw new Error("accessCode is required");
      const Pop = await loadV2();
      const popup = new Pop();
      popup.resumeTransaction(accessCode, {
        onSuccess: (response: PaystackResponseType) => {
          openToast("Payment complete! Reference: " + response.reference);
          resolve({ ...empty, ...response, status: response.status || "success" });
        },
        onCancel: () => {
          openToast("Transaction was not completed, window closed.", 400);
          resolve({
            ...empty,
            status: "canceled",
            cancelled: true,
            reference: "",
          } as PaystackResponseType);
        },
        onError: (error: any) => {
          openToast(error?.message || "Payment could not be initiated", 400);
          resolve({ ...empty, status: "failed", reference: "", error });
        },
      });
    } catch (error) {
      console.error("Paystack access code error:", error);
      openToast("Payment could not be initiated", 400);
      resolve({ ...empty, status: "failed", reference: "", error });
    }
  });
};

/**
 * Initiates payment with Paystack popup
 * @param config - Payment configuration
 * @returns Promise with payment response
 */
export const payWithPaystack = (
  config: PaystackConfigType
): Promise<PaystackResponseType> => {
  return new Promise(async (resolve) => {
    try {
      // Ensure PaystackPop is available
      if (!window.PaystackPop) {
        throw new Error("Paystack script not loaded");
      }

      let handler = await window.PaystackPop.setup({
        ...config,
        callback: (response: PaystackResponseType) => {
          // This happens after the payment is completed successfully
          openToast("Payment complete! Reference: " + response.reference);
          resolve({ ...response, email: config.email, amount: config.amount });
        },
        onClose: () => {
          openToast("Transaction was not completed, window closed.", 400);
          resolve({
            status: "canceled",
            cancelled: true,
            reference: config.reference,
            email: config.email,
            amount: config.amount,
          } as PaystackResponseType);
        },
      });
      handler.openIframe();
    } catch (error) {
      console.error("Paystack initialization error:", error);
      openToast("Payment could not be initiated", 400);
      resolve({
        status: "failed",
        cancelled: true,
        reference: config.reference,
        error,
        email: config.email,
        amount: config.amount,
      } as PaystackResponseType);
    }
  });
};

/**
 * Handles the complete payment submission process
 * @example
 * ```ts
 * handlePaymentSubmit({
 *   openConfirm: true,
 *   defaultConfirm: true,
 *   defaultMsg: "Are you sure you want to enroll for this course?",
 *   label: "Course Name",
 *   objects: {
 *     object_id: "123",
 *     object_type: "course",
 *   },
 *   configObj: {
 *     email: "user@example.com",
 *     amount: 1000,
 *     currency: "NGN",
 *     first_name: "John",
 *     last_name: "Doe",
 *     email: "user@example.com",
 *   },
 *   coupon: "1234567890",
 *   gatwayCharges: 10,
 *   paymentMethod: savedCard, // from user-payment-method-list
 *   // Saved cards are charged by YOUR server, never from the browser.
 *   // Without savedCardCharge the user always gets the Paystack popup.
 *   savedCardCharge: {
 *     chargeUrl: `${API_HOST_URL}payments/${channel}/paystack/charge-saved-card/`,
 *     token,
 *     body: { item_type: "course", item_id: "123" },
 *   },
 *   handleDBAction: (data: any) => {
 *     console.log(data);
 *   },
 *   setStatus: (status: number) => {
 *     console.log(status);
 *   },
 *   e: Event,
 * });
 * ```
 * @param contexts - Payment context information
 * @context This function orchestrates the entire payment flow from confirmation to processing
 */
export async function handlePaymentSubmit(
  contexts: PaymentContextType
): Promise<void> {
  if (contexts.e) contexts.e.preventDefault();

  if (contexts.openConfirm && contexts.defaultConfirm) {
    let msg = `By clicking okay, you are enrolling for ${contexts.label} with id ${contexts.objects.object_id}.`;
    const confirm = await openConfirmModal(contexts.defaultMsg || msg);
    if (!confirm) return;
  }

  const makePayment = async (): Promise<void> => {
    contexts.setStatus(0);

    // Check if contexts.coupon is valid
    let coupon_res: CouponType = {
      id: 0,
      code: "",
      email_list: "",
      object_id: "",
      valid_from: "",
      valid_to: "",
      days_count: 0,
      discount_type: null,
      discount: 0,
      amount: 0,
      currency: "",
      active: false,
      timestamp: "",
      channel: "",
      content_type: 0,
      students: [],
    };

    let mewConfigObj: PaystackConfigObjectType;

    if (contexts.coupon) {
      const handle = contexts.configObj.metadata?.channel_username;
      const couponObj = JSON.stringify({
        code: contexts.coupon,
        email: contexts.configObj.email,
        content_type: contexts.configObj.content_type,
        object_id: contexts.configObj.object_id,
      });

      const requestOptions = reqOptions("POST", couponObj, null, "json");
      const url = `${API_HOST_URL}coupons/${handle}/validate-coupon/`;

      try {
        const dataset = await fetch(url, requestOptions);
        coupon_res = (await dataset.json()) as CouponType;

        if (coupon_res.detail) {
          openToast(coupon_res.detail, 400);
        } else if (coupon_res.id) {
          openToast(
            `${
              coupon_res.discount ||
              `${coupon_res.currency}${coupon_res.amount}`
            }% token was applied.`
          );
        }
      } catch (error) {
        console.error("Coupon validation error:", error);
        openToast("Could not validate coupon", 400);
      }
    }

    // Remove the discount from actual amount
    if (coupon_res.discount || coupon_res.amount) {
      if (
        coupon_res.discount === 100 &&
        coupon_res.discount_type === "percentage"
      ) {
        const resContext = {
          email: contexts.configObj.email,
          amount: 0,
          status: "success",
          reference: `COUPON__${contexts.coupon}__${contexts.configObj.email}`,
          message: "Payment complete with 100% token coupon",
          transaction: "",
          canceled: false,
        };
        contexts.handleDBAction(resContext);
        contexts.setStatus(1);
        return;
      }

      const amount = calculateCouponDeduction(
        contexts.configObj.amount,
        contexts.configObj.currency || "NGN",
        coupon_res
      );

      if (!amount.discounted) {
        openToast(amount.detail, 400);

        // Abort payment due to invalid coupon
        mewConfigObj = contexts.configObj;
      } else {
        openToast(amount.detail);
        mewConfigObj = {
          ...contexts.configObj,
          ...amount,
        };
      }
    } else {
      // No coupon applied
      mewConfigObj = contexts.configObj;
    }

    // Add paystack charges
    if (contexts.gatwayCharges) {
      const fee = contexts.gatwayCharges / 100;
      // Calculate the amount to charge so that after the fee deduction, it matches the intended amount
      const totalAmount = mewConfigObj.amount / (1 - fee);
      // Returns the amount rounded to 2 decimal places
      const decimalAmount = parseFloat(totalAmount.toFixed(2));

      // Local transactions fees are capped at ₦2000, meaning that's the absolute maximum you'll ever pay in fees per transaction
      const localCharges = decimalAmount - mewConfigObj.amount;

      // Only charge 2k if charges exceed threshold
      const noMoreThan2k =
        localCharges > 2000 ? mewConfigObj.amount + 2000 : decimalAmount;

      mewConfigObj.amount = noMoreThan2k;
    }

    const dataset = paystackDataConfig(mewConfigObj);

    if (mewConfigObj.amount) {
      if (contexts.paymentMethod && contexts.savedCardCharge?.chargeUrl) {
        // Ask if user wants to use existing payment method
        const msg = `Would you prefer we charge your existing ${contexts.paymentMethod.authorization?.card_type || ""} card that ends with ${contexts.paymentMethod.last4}?`;
        const confirm = await openConfirmModal(msg, true);

        if (confirm) {
          // Charge the saved card on the server: it prices the item itself.
          const res = await chargeAuthorization({
            ...contexts.savedCardCharge,
            body: {
              payment_method_id: contexts.paymentMethod.id,
              coupon: contexts.coupon || null,
              content_type: contexts.configObj.content_type ?? null,
              object_id: contexts.configObj.object_id ?? null,
              metadata: dataset.metadata || {},
              ...(contexts.savedCardCharge.body || {}),
            },
          });
          contexts.handleDBAction(res);
        } else {
          // Request for user card details
          const payActivate = await payWithPaystack(dataset);

          contexts.handleDBAction(payActivate);
        }
      } else {
        // Request for user card details if payment method doesn't exist
        console.log("Pay with paystack: ");
        const payActivate = await payWithPaystack(dataset);
        contexts.handleDBAction(payActivate);
      }
    } else {
      // If cohort is free, don't request for payment
      const resContext = {
        email: contexts.configObj.email,
        amount: 0,
        status: "success",
        reference: `COUPON__${contexts.coupon}__${contexts.configObj.email}`,
        message: "No payment required for free item",
        transaction: "",
        canceled: false,
      };
      contexts.handleDBAction(resContext);
    }

    contexts.setStatus(1);
  };

  // Get user email input if doesn't exist
  const checkEmailInConfig = async (): Promise<void> => {
    if (!contexts.configObj.email) {
      const emailValue = await getUserEmailInputModal(contexts.label);
      if (emailValue) {
        contexts.configObj.email = emailValue;
        setCookie("email", emailValue, 2); // store for signup use
        makePayment();
      } else {
        openToast("You need to enter a valid email!", 400);
        await checkEmailInConfig();
      }
    } else {
      setCookie("email", contexts.configObj.email, 2); // store for signup use
      makePayment();
    }
  };

  checkEmailInConfig();
}

/**
 * Handles payment submission without requiring user data upfront
 * Useful for guest checkout or anonymous payments
 * @example
 * ```ts
 * handlePaymentWithoutUserData({
 *   amount: 5000,
 *   label: "Course Enrollment",
 *   currency: "NGN",
 *   metadata: {
 *     content_type: "course",
 *     object_id: "123",
 *   },
 *   handleDBAction: (data: any) => {
 *     console.log(data);
 *   },
 *   setStatus: (status: number) => {
 *     console.log(status);
 *   },
 * });
 * ```
 * @param config - Minimal payment configuration without user details
 */
export async function handlePaymentWithoutUserData(config: {
  amount: number;
  label: string;
  currency?: string;
  metadata?: PaystackConfigObjectType["metadata"];
  handleDBAction: (data?: any) => void;
  setStatus: (status: number) => void;
  coupon?: string;
  gatwayCharges?: number;
  defaultConfirm?: boolean;
  defaultMsg?: string;
  e?: Event | null;
  content_type?: string | number;
  object_id?: string | number;
}): Promise<void> {
  if (config.e) config.e.preventDefault();

  if (config.defaultConfirm) {
    const msg =
      config.defaultMsg ||
      `By clicking okay, you are proceeding with payment for ${config.label}.`;
    const confirm = await openConfirmModal(msg);
    if (!confirm) return;
  }

  config.setStatus(0);

  // Always prompt for email input
  const emailValue = await getUserEmailInputModal(config.label);

  if (!emailValue) {
    openToast("You need to enter a valid email to proceed!", 400);
    config.setStatus(1);
    return;
  }

  // Store email for potential signup
  setCookie("email", emailValue, 2);

  // Build minimal config object
  let configObj: PaystackConfigObjectType = {
    email: emailValue,
    first_name: "Guest",
    last_name: "User",
    amount: config.amount,
    currency: config.currency || "NGN",
    metadata: config.metadata,
    content_type: config.content_type,
    object_id: config.object_id,
  };

  // Handle coupon validation if provided
  if (config.coupon) {
    const handle = config.metadata?.channel_username;
    const couponObj = JSON.stringify({
      code: config.coupon,
      email: emailValue,
      content_type: config.content_type,
      object_id: config.object_id,
    });

    const requestOptions = reqOptions("POST", couponObj, null, "json");
    const url = `${API_HOST_URL}coupons/${handle}/validate-coupon/`;

    try {
      const dataset = await fetch(url, requestOptions);
      const res = await dataset.json();

      const discount = res.discount || 0;
      if (res.detail) {
        openToast(res.detail, 400);
      } else if (res.id) {
        openToast(`${discount}% discount was applied.`);
      }

      const _discounted = calculateCouponDeduction(
        configObj.amount,
        configObj.currency || "NGN",
        res
      );

      // Apply discount
      if (_discounted.discounted) {
        if (discount === 100) {
          const resContext = {
            email: configObj.email,
            amount: 0,
            status: "success",
            reference: `COUPON__${config.coupon}__${configObj.email}`,
            message: "No payment required for free item",
            transaction: "",
            canceled: false,
          };
          config.handleDBAction(resContext);
          config.setStatus(1);
          return;
        }

        openToast(_discounted.detail);
        configObj = {
          ...configObj,
          ..._discounted,
        };
      }
    } catch (error) {
      console.error("Coupon validation error:", error);
      openToast("Could not validate coupon", 400);
    }
  }

  // Add gateway charges if applicable
  if (config.gatwayCharges) {
    const fee = config.gatwayCharges / 100;
    const totalAmount = configObj.amount / (1 - fee);
    const decimalAmount = parseFloat(totalAmount.toFixed(2));
    const localCharges = decimalAmount - configObj.amount;
    const noMoreThan2k =
      localCharges > 2000 ? configObj.amount + 2000 : decimalAmount;
    configObj.amount = noMoreThan2k;
  }

  const dataset = paystackDataConfig(configObj);

  if (configObj.amount > 0) {
    // Process payment with Paystack
    const payActivate = await payWithPaystack(dataset);
    config.handleDBAction(payActivate);
  } else {
    // Free item
    const resContext = {
      email: configObj.email,
      amount: 0,
      status: "success",
      reference: `COUPON__${config.coupon}__${configObj.email}`,
      message: "No payment required for free item",
      transaction: "",
      canceled: false,
    };
    config.handleDBAction(resContext);
  }

  config.setStatus(1);
}

// Add PaystackPop to Window interface
declare global {
  interface Window {
    PaystackPop: {
      setup: (config: any) => { openIframe: () => void };
    };
  }
}
