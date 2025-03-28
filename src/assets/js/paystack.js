import {
  API_HOST_URL,
  calculateAmountAfterDeduction,
  reqOptions,
  setCookie,
} from "../../components/lib/helpFunction";
import {
  getUserEmailInputModal,
  openConfirmModal,
  openToast,
} from "../../components/lib/modals";

/*
    const obj = {
        authorization_code:
            paymentMethod.authorization.authorization_code,
        email: paymentMethod.authorization.email,
        first_name: name.first_name,
        last_name: name.last_name,
        amount: option.price_object?.price[interval.id.toLowerCase()],
        user_id: name.id,
        channel_id: props.channelID,
        content_type: option.content_object.content_type,
        object_id: option.content_object.object_id,
    };
    const dataset = paystackDataConfig(obj);
 */
export const paystackDataConfig = (obj) => ({
  authorization_code: obj.authorization_code,
  reference: new Date().getTime().toString(),
  email: obj.email,
  first_name: obj.first_name,
  last_name: obj.last_name,
  amount: obj.amount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
  publicKey: process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY,
  key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
  callback_url: window.location.href,
  metadata: obj.metadata,
});

export const chargeAuthorization = async (data) => {
  // This function try to charge user with existing card
  const url = "https://api.paystack.co/transaction/charge_authorization";
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  };
  const req = await fetch(url, options);
  const res = await req.json();

  if (res.data?.status === "success") {
    openToast("Payment was successful with reference: " + res.data.reference);
  } else {
    openToast("Payment was failed with reference:", 400);
  }

  return res.data;
};

export const payWithPaystack = (config) => {
  return new Promise(async (resolve) => {
    let handler = await window.PaystackPop.setup({
      ...config,
      callback: (response) => {
        //this happens after the payment is completed successfully
        openToast("Payment complete! Reference: " + response.reference);
        resolve(response);
      },
      onClose: () => {
        openToast("Transaction was not completed, window closed.", 400);
        resolve({ canceled: true });
      },
    });
    handler.openIframe();
  });
};

/*
	Evoking the function with the following context params.
	const contexts = {
		e:"",
		objects:props.objects,
		configObj,
		paymentMethod,
		setStatus,
		handleDBAction,
		defaultConfirm : true,
		label : props.objects.title,
		coupon : "",
		defaultMsg:`By clicking okay, you are enrolling for ${props.objects.title} with id ${props.applicationID}.`,
		gatwayCharges: 2.5
	}
	handlePaymentSubmit(contexts)
*/

export async function handlePaymentSubmit(contexts) {
  if (contexts.e) contexts.e.preventDefault();

  if (contexts.defaultConfirm) {
    let msg = `By clicking okay, you are enrolling for ${
      contexts.label
    } with id ${contexts.objects.object_type?.content_type || ""}.`;
    const confirm = await openConfirmModal(contexts.defaultMsg || msg);
    if (!confirm) return;
  }
  const makePayment = async () => {
    contexts.setStatus(0);

    // console.log('objects.amount: ', contexts.configObj.amount);

    // Check if contexts.coupon is valid
    let discount, mewConfigObj;
    if (contexts.coupon) {
      const handle = contexts.configObj.metadata.channel_username;
      const couponObj = JSON.stringify({
        code: contexts.coupon,
        email: contexts.configObj.email,
        content_type: contexts.configObj.content_type,
        object_id: contexts.configObj.object_id,
      });
      const requestOptions = reqOptions("POST", couponObj, null, "json");
      const url = `${API_HOST_URL}coupons/${handle}/validate-coupon/`;
      const dataset = await fetch(url, requestOptions);
      const res = await dataset.json();

      discount = res.discount || 0;
      if (res.detail) {
        openToast(res.detail, 400);
      } else if (res.id) {
        openToast(`${discount}% token was applied.`);
      }
    }

    // Remove the discount from actual amount.
    if (discount) {
      if (discount === 100) {
        contexts.handleDBAction({ reference: `COUPON__${contexts.coupon}` });
        contexts.setStatus();
        return;
      }
      const amount = calculateAmountAfterDeduction(
        contexts.configObj["amount"],
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
      const totalAmount = mewConfigObj["amount"] / (1 - fee);
      // Returns the amount rounded to 2 decimal places
      const decimalAmount = totalAmount.toFixed(2);

      // Local transactions fees are capped at ₦2000, meaning that's the absolute maximum you'll ever pay in fees per transaction
      const localCharges = decimalAmount - mewConfigObj["amount"];
      // console.log("localCharges: ", localCharges);

      // Only charge 2k if charges exceed threshold.
      const noMoreThan2k =
        localCharges > 2000 ? mewConfigObj["amount"] + 2000 : decimalAmount;
      // console.log("noMoreThan2k: ", noMoreThan2k);

      mewConfigObj["amount"] = noMoreThan2k;
    }

    const dataset = paystackDataConfig(mewConfigObj);

    if (contexts.configObj["amount"]) {
      if (mewConfigObj.authorization_code) {
        // console.log(mewConfigObj);
        // Charge user existing payment method
        msg = `Would you prefer we charge your existing ${contexts.paymentMethod.card_type} card that ends with ${contexts.paymentMethod.last4}?`;
        const confirm = await openConfirmModal(msg, true);
        if (confirm) {
          // Charge user with existing card.
          const res = await chargeAuthorization(dataset);
          if (res.status === "success") {
            contexts.handleDBAction(res);
          }
        } else {
          // Request for user card details.
          const payActivate = await payWithPaystack(dataset);
          if (payActivate.status === "success") {
            contexts.handleDBAction(res);
          }
        }
      } else {
        // Request for user card details if payment method doesn't exist.
        console.log("Pay with paystack: ");
        const payActivate = await payWithPaystack(dataset);
        if (payActivate.status === "success") {
          contexts.handleDBAction(payActivate);
        }
      }
    } else {
      // If cohort is free, don't request for payment.
      contexts.handleDBAction();
    }
    contexts.setStatus();
  };

  // Get user email input if doesn't exist
  const checkEmailInConfig = async () => {
    if (!contexts.configObj.email) {
      const emailValue = await getUserEmailInputModal(contexts.label);
      if (emailValue) {
        contexts.configObj.email = emailValue;
        setCookie("email", emailValue); // store for signup use.
        makePayment();
      } else {
        openToast("You need to enter a valid email!", 400);
        await checkEmailInConfig();
      }
    } else {
      setCookie("email", contexts.configObj.email); // store for signup use.
      makePayment();
    }
  };
  checkEmailInConfig();
}
