# PayStack Payment Utilities

A TypeScript utility library for handling PayStack payment processing in web applications.

## Migrating to 0.4.0 (breaking)

The Paystack secret key must never be in browser code: every `NEXT_PUBLIC_*`
variable is inlined into the JavaScript bundle anyone can download.

- `NEXT_PUBLIC_PAYSTACK_SECRET_KEY` is no longer read. Delete it from every
  environment (Vercel, `.env*`) and rotate the key if it was ever set.
- `chargeAuthorization(config)` became `chargeAuthorization({ chargeUrl, token, body })`
  and calls your server instead of `api.paystack.co`.
- `handlePaymentSubmit` only offers a saved card when you pass
  `savedCardCharge: { chargeUrl, token, body? }`. Without it the user gets the
  popup. `configObj.authorization_code` is ignored.
- `PaystackConfigType.publicKey` and `.authorization_code` were removed.

## Table of Contents

- [Installation](#installation)
- [Interfaces](#interfaces)
- [Functions](#functions)
- [Usage Examples](#usage-examples)
- [CSS Classes](#css-classes)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Dependencies

This library requires the following dependencies:

```bash
npm install next
```

Make sure to set up your environment variables in your `.env.local` file:

```
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
```

### PayStack Script Integration

Add the PayStack script to your application's HTML:

```ts
// Loading a payment gateway script
const loadPaymentGateway = () => {
  const script = loadScript("https://js.paystack.co/v1/inline.js");

  if (script) {
    script.onload = () => {
      // Initialize payment gateway
      const paystack = window.PaystackPop.setup({
        key: "your-public-key",
        email: "customer@email.com",
        amount: 10000,
      });

      paystack.openIframe();
    };
  } else {
    console.error("Could not load payment script");
  }
};
```

## Interfaces

The types can be imported from `@instincthub/react-ui/types`

```bash
import { PaystackConfigObjectType, PaystackConfigType, SessionType } from "@instincthub/react-ui/types";
```

### PaystackMetadataType

Contains additional information to be passed to PayStack.

```typescript
export interface PaystackMetadataType {
  email: string;
  owner?: string;
  channel?: string;
  content_type?: string | number;
  object_id?: string | number;
  duration?: string;
  channel_username?: string;
  custom_fields?: Array<Record<string, any>>;
  [key: string]: any;
}
```

### PaystackConfigObjectType

Configuration for initializing a PayStack payment.

```typescript
export interface PaystackConfigObjectType {
  email: string;
  first_name: string;
  last_name: string;
  amount: number;
  currency?: string;
  user_id?: string | number;
  channel_id?: string | number;
  content_type?: string | number;
  object_id?: string | number;
  metadata?: PaystackMetadataType;
}
```

### PaystackConfigType

The complete configuration sent to PayStack.

```typescript
export interface PaystackConfigType {
  reference: string;
  email: string;
  first_name: string;
  last_name: string;
  currency: string;
  amount: number;
  key: string | undefined;
  callback_url: string;
  metadata?: PaystackMetadataType;
}
```

### PaystackResponseType

Response received from PayStack after payment processing.

```typescript
export interface PaystackResponseType {
  status: string;
  reference: string;
  message?: string;
  transaction?: string;
  canceled?: boolean;
  [key: string]: any;
}
```

### PaymentMethodType

Represents a saved payment method.

```typescript
export interface PaymentMethodType {
  id: string;
  authorization: {
    email: string;
    card_type: string;
    reusable: boolean;
    signature: string;
    authorization_code: string;
  };
  primary: boolean;
  exp_year: string;
  exp_month: string;
  last4: string;
  country_code: string;
  gateway?: string;
  last_action?: string;
  timestamp: string;
  owner: number;
  user_payment?: string;
}
```

### PaymentObjectsType

The context for a payment submission.

```tsx
export interface PaymentObjectsType {
  title: string;
  object_type?: string | number | null;
  object_id?: string | number | null;
  payment_structure?: string | number | null;
  student_record?: string | number | null;
  [key: string]: any;
}
```

### PaymentContextType

The context for a payment submission.

```typescript
interface PaymentContextType {
  e?: Event;
  objects: {
    title: string;
    object_type?: {
      content_type: string;
    };
    object_id?: string | number;
  };
  configObj: PaystackConfigObjectType;
  paymentMethod?: PaymentMethodType;
  setStatus: (status?: number) => void;
  handleDBAction: (data?: any) => void;
  defaultConfirm?: boolean;
  label: string;
  coupon?: string;
  defaultMsg?: string;
  gatwayCharges?: number;
}
```

## Functions

### paystackDataConfig

Configures PayStack payment data for processing.

- **Parameters**:
  - `obj: PaystackConfigObject` - Object containing payment details
- **Returns**: `PaystackConfig` - Configured payment data
- **Usage**:

  ```typescript
  const paymentData = {
    email: "customer@example.com",
    first_name: "John",
    last_name: "Doe",
    amount: 5000, // ₦50.00
    content_type: "course",
    object_id: "123",
    metadata: {
      channel_username: "channel1",
    },
  };

  const config = paystackDataConfig(paymentData);
  ```

### chargeAuthorization

Charges the logged-in user's **saved card through your server**. Since 0.4.0
the browser never calls Paystack's `charge_authorization` API and never holds
the secret key or an authorization code. It POSTs purchase identifiers to your
endpoint; the server looks the card up by the logged-in user, prices the item
itself, charges it with `PAYSTACK_SECRET_KEY` and returns the Paystack
transaction object.

- **Parameters**:
  - `options.chargeUrl: string` - your server endpoint
  - `options.token?: string` - the user's bearer token
  - `options.channel?: string` - optional channel header
  - `options.body?: object` - identifiers only (`payment_method_id`, item, coupon)
- **Returns**: `Promise<any>` - the transaction data (`status: "failed"` on error)
- **Usage**:

  ```typescript
  const response = await chargeAuthorization({
    chargeUrl: `${API_HOST_URL}payments/${channel}/paystack/charge-saved-card/`,
    token,
    body: {
      payment_method_id: savedCard.id,
      item_type: "course",
      item_id: course.id,
      coupon: "DISCOUNT10",
    },
  });
  if (response.status === "success") {
    // Record the purchase with response.reference
  }
  ```

### payWithAccessCode

Opens the popup for a transaction your **server initialised** with
`POST /transaction/initialize`, so amount, email and metadata cannot be changed
in the browser. Loads Paystack inline v2 on demand.

  ```typescript
  const { access_code } = await fetch(initUrl, reqOptions("POST", JSON.stringify({ item_id }), token, "json")).then((r) => r.json());
  const res = await payWithAccessCode(access_code);
  if (res.status === "success") verifyOnServer(res.reference);
  ```

### payWithPaystack

Initiates payment with PayStack popup.

- **Parameters**:
  - `config: PaystackConfig` - Payment configuration
- **Returns**: `Promise<PaystackResponse>` - Promise with payment response
- **Usage**:

  ```typescript
  const config = paystackDataConfig({
    email: "customer@example.com",
    first_name: "John",
    last_name: "Doe",
    amount: 5000,
    content_type: "1" // Model ID,
    object_id: "123" // Object ID,
  });

  const paymentResponse = await payWithPaystack(config);
  if (paymentResponse.status === "success") {
    // Handle successful payment
  } else if (paymentResponse.canceled) {
    // Handle cancellation
  }
  ```

### handlePaymentSubmit

Handles the complete payment submission process with full user data.

- **Parameters**:
  - `contexts: PaymentContext` - Payment context information
- **Returns**: `Promise<void>`
- **Usage**:

  ```typescript
  const paymentContext = {
    objects: {
      title: "Advanced JavaScript Course",
      object_type: {
        content_type: "course",
      },
    },
    configObj: {
      email: "customer@example.com",
      first_name: "John",
      last_name: "Doe",
      amount: 5000,
      content_type: "course",
      object_id: "123",
    },
    paymentMethod: savedCard, // from user-payment-method-list
    savedCardCharge: {
      chargeUrl: `${API_HOST_URL}payments/${channel}/paystack/charge-saved-card/`,
      token,
      body: { item_type: "course", item_id: "123" },
    },
    setStatus: (status) => {
      // Update UI based on status
    },
    handleDBAction: (data) => {
      // Process successful payment in your database
    },
    defaultConfirm: true,
    label: "Advanced JavaScript Course",
    coupon: "DISCOUNT10",
    gatwayCharges: 2.5,
  };

  await handlePaymentSubmit(paymentContext);
  ```

### handlePaymentWithoutUserData

Handles payment submission without requiring user data upfront. Useful for guest checkout or anonymous payments.

- **Parameters**:
  - `config` - Minimal payment configuration object
    - `amount: number` - Payment amount in lowest currency (e.g., Kobo)
    - `label: string` - Payment description/label
    - `currency?: string` - Currency code (default: "NGN")
    - `metadata?: object` - Additional metadata
    - `handleDBAction: (data?: any) => void` - Success callback
    - `setStatus: (status: number) => void` - Status update callback
    - `coupon?: string` - Optional coupon code
    - `gatwayCharges?: number` - Gateway charges percentage
    - `defaultConfirm?: boolean` - Show confirmation dialog
    - `defaultMsg?: string` - Custom confirmation message
    - `e?: Event` - Form event
    - `content_type?: string | number` - Content type ID
    - `object_id?: string | number` - Object ID
- **Returns**: `Promise<void>`
- **Usage**:

  ```typescript
  // Guest checkout example
  await handlePaymentWithoutUserData({
    amount: 5000, // ₦50.00
    label: "Course Enrollment",
    currency: "NGN",
    content_type: "course",
    object_id: "123",
    metadata: {
      channel_username: "my-channel",
    },
    handleDBAction: (data) => {
      if (data && data.reference) {
        console.log("Payment successful:", data.reference);
      }
    },
    setStatus: (status) => {
      setIsLoading(status === 0);
    },
    defaultConfirm: true,
    gatwayCharges: 2.5,
  });
  ```

## Usage Examples

### Guest Checkout / Payment without User Data

For scenarios where you need to collect payment from users without requiring authentication or pre-existing user data:

```typescript
import { handlePaymentWithoutUserData, loadScript } from "@instincthub/react-ui";

// Load Paystack script first
useEffect(() => {
  const script = loadScript("https://js.paystack.co/v1/inline.js");
  if (script) {
    script.onload = () => console.log("Paystack loaded");
  }
}, []);

const handleGuestCheckout = async (e) => {
  e.preventDefault();

  await handlePaymentWithoutUserData({
    e,
    amount: 5000, // ₦50.00
    label: "Course Purchase",
    currency: "NGN",
    content_type: "course",
    object_id: "123",
    metadata: {
      channel_username: "guest-channel",
      purchase_type: "one-time",
    },
    handleDBAction: (data) => {
      if (data && data.reference) {
        // Save transaction to your database
        saveGuestTransaction({
          reference: data.reference,
          amount: 5000,
          status: data.status,
        });
        // Redirect to success page
        router.push(`/checkout/success?ref=${data.reference}`);
      }
    },
    setStatus: (status) => {
      setIsProcessing(status === 0);
    },
    defaultConfirm: true,
    defaultMsg: "Complete your purchase?",
    gatwayCharges: 2.5,
  });
};

// Usage in component
<button onClick={handleGuestCheckout} className="checkout-btn">
  Pay Now
</button>
```

**Key Features of Guest Checkout:**
- No authentication required
- Email collected via modal during payment
- Uses "Guest User" as default name
- Email stored in cookie for potential signup
- Ideal for quick purchases, donations, or first-time users

### Basic Payment Processing

```typescript
import { handlePaymentSubmit } from "./payment-utils";

// Initialize payment processing
const initPayment = async (e) => {
  const courseDetails = {
    title: "Advanced JavaScript Course",
    object_type: { content_type: "course" },
    object_id: "123",
  };

  const configObj = {
    email: userEmail, // User's email if available
    first_name: firstName,
    last_name: lastName,
    amount: 5000, // Amount in the country's lowest denomination (e.g., Kobo for NGN)
    content_type: "course",
    object_id: "123",
    metadata: {
      channel_username: "channel1",
    },
  };

  // Set up payment context
  const paymentContext = {
    e,
    objects: courseDetails,
    configObj,
    setStatus: (status) => {
      // Update loading state
      setIsLoading(status === 0);
    },
    handleDBAction: (data) => {
      // Handle successful payment
      if (data && data.reference) {
        // Save transaction reference to your system
        saveTransaction(data.reference);
        // Navigate to success page
        router.push(`/payment/success?ref=${data.reference}`);
      }
    },
    label: courseDetails.title,
    defaultConfirm: true,
    gatwayCharges: 2.5,
  };

  // Process payment
  await handlePaymentSubmit(paymentContext);
};
```

### Processing Payment with Coupon

```typescript
import { handlePaymentSubmit } from "./payment-utils";

const checkoutWithCoupon = async (couponCode) => {
  // Validate coupon format
  if (!couponCode.match(/^[A-Z0-9]{4,16}$/)) {
    openToast("Invalid coupon format", 400);
    return;
  }

  const paymentContext = {
    objects: courseDetails,
    configObj: {
      email: userEmail,
      first_name: firstName,
      last_name: lastName,
      amount: 5000,
      content_type: "1",
      object_id: "123",
      metadata: {
        channel_username: "channel1",
      },
    },
    setStatus: (status) => {
      setIsProcessing(status === 0);
    },
    handleDBAction: (data) => {
      if (data && data.reference) {
        if (data.reference.startsWith("COUPON__")) {
          // Handle 100% discount coupon
          completeEnrollment(data.reference);
        } else {
          // Handle regular payment
          saveTransaction(data.reference);
        }
      }
    },
    label: courseDetails.title,
    coupon: couponCode,
  };

  await handlePaymentSubmit(paymentContext);
};
```

### Using Saved Payment Method

```typescript
import { handlePaymentSubmit } from "./payment-utils";

const processSavedCardPayment = async () => {
  // Fetch the user's saved payment methods
  const savedPaymentMethods = await fetchUserPaymentMethods(userId);

  if (savedPaymentMethods.length > 0) {
    const defaultPaymentMethod = savedPaymentMethods[0];

    const paymentContext = {
      objects: productDetails,
      configObj: {
        email: defaultPaymentMethod.authorization.email,
        first_name: user.firstName,
        last_name: user.lastName,
        amount: productPrice,
        content_type: "product",
        object_id: productId,
      },
      paymentMethod: defaultPaymentMethod,
      // The server charges the card; the browser only names the purchase.
      savedCardCharge: {
        chargeUrl: `${API_HOST_URL}payments/${channel}/paystack/charge-saved-card/`,
        token,
        body: { item_type: "product", item_id: productId },
      },
      setStatus: updateLoadingState,
      handleDBAction: handleSuccessfulPurchase,
      label: productDetails.title,
    };

    await handlePaymentSubmit(paymentContext);
  } else {
    // No saved payment methods, proceed with regular checkout
    proceedToRegularCheckout();
  }
};
```

## Comparison: With vs Without User Data

| Feature | handlePaymentSubmit | handlePaymentWithoutUserData |
|---------|---------------------|------------------------------|
| **User Authentication** | Required | Not required |
| **Email Collection** | Pre-populated from user profile | Requested via modal during payment |
| **User Name** | From authenticated user | "Guest User" (default) |
| **Saved Payment Methods** | Can use existing saved cards | Always requires new card entry |
| **Best Use Cases** | - Subscription renewals<br>- Member purchases<br>- Recurring payments<br>- Authenticated checkout | - Guest checkout<br>- Quick purchases<br>- Donations<br>- First-time buyers<br>- Non-authenticated flows |
| **Configuration Complexity** | Higher (requires full user context) | Lower (minimal config needed) |
| **Coupon Support** | ✅ Yes | ✅ Yes |
| **Gateway Charges** | ✅ Yes | ✅ Yes |
| **Email Cookie Storage** | ✅ Yes | ✅ Yes (for potential signup) |

## CSS Classes

This library comes with CSS styles that can be imported into your project. The following are the key CSS classes available:

- `.ihub-payment-container`: Main container for the payment form
- `.ihub-payment-method`: Payment method selection item
- `.ihub-payment-method.ihub-selected`: Selected payment method
- `.ihub-payment-summary`: Container for payment summary details
- `.ihub-coupon-section`: Container for coupon code input
- `.ihub-payment-processing`: Overlay for payment processing state

See the full CSS file for more detailed styling options.

## Contributing

Contributions to improve the library are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
