/**
 * This function createSubscription attempts to create a user subscription in the database
 * using provided channel, token, and subscription details, while handling potential errors
 * by logging them and throwing a toast notification.
 *
 * Reference:
 * createSubscription(channel, token, objects)
 */
import {
  API_HOST_URL,
  getCookie,
  reqOptions,
} from "../../components/lib/helpFunction";
import { openToast } from "./modals/modals";

// ============================================
// Type Definitions
// ============================================

/**
 * Subscription status types
 */
export type SubscriptionStatus =
  | "ACTIVATED"
  | "PENDING"
  | "CANCELLED"
  | "EXPIRED";

/**
 * Subscription interval types
 */
export type SubscriptionInterval = "ONETIME" | "MONTHLY" | "YEARLY" | "WEEKLY";

/**
 * Object type containing content and object identifiers
 */
export interface ObjectType {
  content_id: number;
  object_id: string | number;
}

/**
 * User data interface
 */
export interface UserData {
  id: string | number;
  email: string;
  [key: string]: any; // Allow additional properties
}

/**
 * Payment method authorization details
 */
export interface PaymentAuthorization {
  email?: string;
  [key: string]: any; // Allow additional properties
}

/**
 * Payment method interface
 */
export interface PaymentMethod {
  authorization?: PaymentAuthorization;
  [key: string]: any; // Allow additional properties
}

/**
 * Reference object interface
 */
export interface Reference {
  reference: string;
  [key: string]: any; // Allow additional properties
}

/**
 * Subscription objects interface
 */
export interface SubscriptionObjects {
  object_type?: ObjectType;
  status?: SubscriptionStatus;
  interval?: SubscriptionInterval;
  user?: string | number | null;
  content_type?: number;
  object_id?: string | number;
  reference?: string;
  email?: string;
  [key: string]: any; // Allow additional properties for flexibility
}

/**
 * Props interface for creating subscription
 */
export interface CreateSubscriptionProps {
  userData?: UserData | null;
  objects: {
    object_type?: ObjectType;
    [key: string]: any;
  };
  ref?: Reference;
  paymentMethod?: PaymentMethod;
}

/**
 * Subscription data payload
 */
export interface SubscriptionData {
  status: SubscriptionStatus;
  interval: SubscriptionInterval;
  user: string | number | null;
  content_type?: number;
  object_id?: string | number;
  reference?: string;
  email: string;
}

/**
 * API Response interface
 */
export interface SubscriptionResponse {
  id?: string | number;
  status?: string;
  message?: string;
  [key: string]: any; // Allow additional response fields
}

// ============================================
// Main Function
// ============================================

/**
 * Creates a user subscription in the database
 *
 * @param channel - Channel identifier
 * @param token - Authentication token
 * @param objects - Subscription objects containing payment and user details
 * @returns Promise resolving to subscription response or status code
 *
 * @example
 * ```ts
 * const result = await createSubscription(
 *   "my-channel",
 *   "auth-token",
 *   {
 *     status: "ACTIVATED",
 *     interval: "ONETIME",
 *     user: userData?.id || null,
 *     content_type: objects.object_type?.content_id,
 *     object_id: objects.object_type?.object_id,
 *     reference: ref?.reference,
 *     email: paymentMethod?.authorization?.email || userData?.email
 *   }
 * );
 * ```
 */
const createSubscription = async (
  channel: string,
  token: string,
  objects: SubscriptionObjects
): Promise<SubscriptionResponse | number> => {
  try {
    // Create user subscription in the database
    const endpoint = `${API_HOST_URL}payments/${channel}/user-subscription-create/`;
    const email = getCookie("email") || "";
    const newObjects: SubscriptionObjects = { ...objects, email };

    // Uncomment for debugging
    // console.log(newObjects);

    const raw = JSON.stringify(newObjects);
    const options = reqOptions("POST", raw, token, "json");
    const req = await fetch(endpoint, options);
    const res: SubscriptionResponse = await req.json();

    if (req.status === 400) {
      openToast(JSON.stringify(res), 400);
      return req.status;
    }

    return res;
  } catch (e) {
    console.error("Error creating subscription:", e);
    openToast("Couldn't create subscription", 400);
    return 500;
  }
};

export default createSubscription;

// ============================================
// Helper Function (Type-safe wrapper)
// ============================================

/**
 * Type-safe wrapper for creating subscription with structured props
 *
 * @param channel - Channel identifier
 * @param token - Authentication token
 * @param props - Structured props containing userData, objects, ref, and paymentMethod
 * @returns Promise resolving to subscription response or status code
 *
 * @example
 * ```ts
 * const result = await createSubscriptionWithProps(
 *   "my-channel",
 *   "auth-token",
 *   {
 *     userData: { id: 123, email: "user@example.com" },
 *     objects: {
 *       object_type: { content_id: 1, object_id: "course-123" }
 *     },
 *     ref: { reference: "payment-ref-123" },
 *     paymentMethod: {
 *       authorization: { email: "payment@example.com" }
 *     }
 *   }
 * );
 * ```
 */
export const createSubscriptionWithProps = async (
  channel: string,
  token: string,
  props: CreateSubscriptionProps
): Promise<SubscriptionResponse | number> => {
  const subData: SubscriptionData = {
    status: "ACTIVATED",
    interval: "ONETIME",
    user: props.userData?.id || null,
    content_type: props.objects.object_type?.content_id,
    object_id: props.objects.object_type?.object_id,
    reference: props.ref?.reference,
    email:
      props.paymentMethod?.authorization?.email || props.userData?.email || "",
  };

  return createSubscription(channel, token, subData);
};
