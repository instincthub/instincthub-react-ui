import {
  API_HOST_URL,
  calculateAmountAfterDeduction,
  reqOptions,
  setCookie,
} from "./helpFunction";
import {
  getUserEmailInputModal,
  openConfirmModal,
  openToast,
} from "./modals/modals";

// PayStack configuration interfaces
export interface PaystackMetadata {
  channel_username?: string;
  custom_fields?: Array<Record<string, any>>;
  [key: string]: any;
}

export interface PaystackConfigObject {
  authorization_code?: string;
  email: string;
  first_name: string;
  last_name: string;
  amount: number;
  user_id?: string | number;
  channel_id?: string | number;
  content_type: string;
  object_id: string | number;
  metadata?: PaystackMetadata;
}

export interface PaystackConfig {
  authorization_code?: string;
  reference: string;
  email: string;
  first_name: string;
  last_name: string;
  amount: number;
  publicKey: string | undefined;
  key: string | undefined;
  callback_url: string;
  metadata?: PaystackMetadata;
}

export interface PaystackResponse {
  status: string;
  reference: string;
  message?: string;
  transaction?: string;
  canceled?: boolean;
  [key: string]: any;
}

export interface PaymentMethod {
  authorization: {
    authorization_code: string;
    email: string;
  };
  card_type: string;
  last4: string;
}

/**
 * Context for processing payments
 * @property {Event | null} [e] - The event object that triggered the payment
 * @property {Object} objects - Details about the item being purchased
 * @property {string} objects.title - Title of the item
 * @property {Object} [objects.object_type] - Type information for the item
 * @property {string} [objects.object_type.content_type] - Content type identifier
 * @property {string|number} [objects.object_id] - ID of the object being purchased
 * @property {PaystackConfigObject} configObj - Configuration for PayStack
 * @property {PaymentMethod} [paymentMethod] - Saved payment method if available
 * @property {Function} setStatus - Function to update UI status during payment process
 * @property {Function} handleDBAction - Callback for processing successful payments
 * @property {boolean} [defaultConfirm] - Whether to show a confirmation dialog
 * @property {string} label - Label for the payment (usually item title)
 * @property {string} [coupon] - Coupon code if applicable
 * @property {string} [defaultMsg] - Custom confirmation message
 * @property {number} [gatwayCharges] - Payment gateway charges percentage
 */
export interface PaymentContext {
  e?: Event | null;
  objects: {
    title: string;
    object_type?: {
      content_type: string;
    };
    object_id?: string | number;
  };
  configObj: PaystackConfigObject;
  paymentMethod?: PaymentMethod;
  setStatus: (status?: number) => void;
  handleDBAction: (data?: any) => void;
  defaultConfirm?: boolean;
  label: string;
  coupon?: string;
  defaultMsg?: string;
  gatwayCharges?: number;
}

/**
 * Configures the Paystack payment data for processing
 * @param obj - Object containing payment details
 * @returns PaystackConfig - Configured payment data
 */
export const paystackDataConfig = (
  obj: PaystackConfigObject
): PaystackConfig => ({
  authorization_code: obj.authorization_code,
  reference: new Date().getTime().toString(),
  email: obj.email,
  first_name: obj.first_name,
  last_name: obj.last_name,
  amount: obj.amount * 100, // Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
  publicKey: process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY,
  key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
  callback_url: window.location.href,
  metadata: obj.metadata,
});

/**
 * Charges a customer using an existing authorization
 * @param data - Payment configuration data
 * @returns Promise with transaction data
 */
export const chargeAuthorization = async (
  data: PaystackConfig
): Promise<any> => {
  // This function tries to charge user with existing card
  const url = "https://api.paystack.co/transaction/charge_authorization";
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const req = await fetch(url, options);
    const res = await req.json();

    if (res.data?.status === "success") {
      openToast("Payment was successful with reference: " + res.data.reference);
    } else {
      openToast("Payment failed with reference:", 400);
    }

    return res.data;
  } catch (error) {
    openToast("Payment processing error occurred", 400);
    console.error("Payment authorization error:", error);
    return { status: "failed", error };
  }
};

/**
 * Initiates payment with Paystack popup
 * @param config - Payment configuration
 * @returns Promise with payment response
 */
export const payWithPaystack = (
  config: PaystackConfig
): Promise<PaystackResponse> => {
  return new Promise(async (resolve) => {
    try {
      // Ensure PaystackPop is available
      if (!window.PaystackPop) {
        throw new Error("Paystack script not loaded");
      }

      let handler = await window.PaystackPop.setup({
        ...config,
        callback: (response: PaystackResponse) => {
          // This happens after the payment is completed successfully
          openToast("Payment complete! Reference: " + response.reference);
          resolve(response);
        },
        onClose: () => {
          openToast("Transaction was not completed, window closed.", 400);
          resolve({
            status: "failed",
            canceled: true,
            reference: config.reference,
          });
        },
      });
      handler.openIframe();
    } catch (error) {
      console.error("Paystack initialization error:", error);
      openToast("Payment could not be initiated", 400);
      resolve({
        status: "failed",
        canceled: true,
        reference: config.reference,
        error,
      });
    }
  });
};

/**
 * Handles the complete payment submission process
 * @param contexts - Payment context information
 * @context This function orchestrates the entire payment flow from confirmation to processing
 */
export async function handlePaymentSubmit(
  contexts: PaymentContext
): Promise<void> {
  if (contexts.e) contexts.e.preventDefault();

  if (contexts.defaultConfirm) {
    let msg = `By clicking okay, you are enrolling for ${
      contexts.label
    } with id ${contexts.objects.object_type?.content_type || ""}.`;
    const confirm = await openConfirmModal(contexts.defaultMsg || msg);
    if (!confirm) return;
  }

  const makePayment = async (): Promise<void> => {
    contexts.setStatus(0);

    // Check if contexts.coupon is valid
    let discount: number | undefined;
    let mewConfigObj: PaystackConfigObject;

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
        const res = await dataset.json();

        discount = res.discount || 0;
        if (res.detail) {
          openToast(res.detail, 400);
        } else if (res.id) {
          openToast(`${discount}% token was applied.`);
        }
      } catch (error) {
        console.error("Coupon validation error:", error);
        openToast("Could not validate coupon", 400);
      }
    }

    // Remove the discount from actual amount
    if (discount) {
      if (discount === 100) {
        contexts.handleDBAction({ reference: `COUPON__${contexts.coupon}` });
        contexts.setStatus();
        return;
      }

      const amount = calculateAmountAfterDeduction(
        contexts.configObj.amount,
        discount
      );

      openToast(amount.detail, 400);
      mewConfigObj = {
        ...contexts.configObj,
        ...amount,
      };
    } else {
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
      if (mewConfigObj.authorization_code && contexts.paymentMethod) {
        // Ask if user wants to use existing payment method
        const msg = `Would you prefer we charge your existing ${contexts.paymentMethod.card_type} card that ends with ${contexts.paymentMethod.last4}?`;
        const confirm = await openConfirmModal(msg, true);

        if (confirm) {
          // Charge user with existing card
          const res = await chargeAuthorization(dataset);
          if (res.status === "success") {
            contexts.handleDBAction(res);
          }
        } else {
          // Request for user card details
          const payActivate = await payWithPaystack(dataset);
          if (payActivate.status === "success") {
            contexts.handleDBAction(payActivate);
          }
        }
      } else {
        // Request for user card details if payment method doesn't exist
        console.log("Pay with paystack: ");
        const payActivate = await payWithPaystack(dataset);
        if (payActivate.status === "success") {
          contexts.handleDBAction(payActivate);
        }
      }
    } else {
      // If cohort is free, don't request for payment
      contexts.handleDBAction();
    }

    contexts.setStatus();
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

// Add PaystackPop to Window interface
declare global {
  interface Window {
    PaystackPop: {
      setup: (config: any) => { openIframe: () => void };
    };
  }
}
