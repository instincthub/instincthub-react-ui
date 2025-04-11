import {
  API_HOST_URL,
  getCookie,
  reqOptions,
} from "../../components/lib/helpFunction";
import { openToast } from "./modals/modals";

interface SubscriptionObject {
  email?: string;
  [key: string]: any;
}

/**
 * Creates a user subscription in the database
 * @param channel - The payment channel to use
 * @param token - Authentication token
 * @param objects - Subscription details
 * @returns Promise resolving to the response or status code
 */
const createSubscription = async (
  channel: string,
  token: string,
  objects: SubscriptionObject
): Promise<any> => {
  try {
    // Create user subscription in the db
    const endpoint = `${API_HOST_URL}payments/${channel}/user-subscription-create/`;
    const email = getCookie("email") || undefined;
    const newObjects: SubscriptionObject = { ...objects, email };

    const raw = JSON.stringify(newObjects);
    const options = reqOptions("POST", raw, token, "json");
    const req = await fetch(endpoint, options);
    const res = await req.json();

    if (req.status === 400) {
      openToast(JSON.stringify(res), 400);
      return req.status;
    }

    return res;
  } catch (e) {
    console.log(e);
    openToast("Couldn't createSubscription", 400);
    return 500;
  }
};

export default createSubscription;
