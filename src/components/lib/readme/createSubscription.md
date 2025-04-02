# Subscription Service

A TypeScript utility for creating user subscriptions through various payment channels.

## Table of Contents
- [Functions](#functions)
- [Interfaces](#interfaces)
- [Usage Examples](#usage-examples)

## Functions

### createSubscription
- **Description**: Creates a user subscription in the database using the specified payment channel
- **Parameters**:
  - `channel: string` - The payment channel to use (e.g., "stripe", "paypal")
  - `token: string` - Authentication token for API access
  - `objects: SubscriptionObject` - Object containing subscription details
- **Returns**: `Promise<any>` - Resolves to the subscription response or an HTTP status code
- **Error Handling**: 
  - Displays toast notifications for errors
  - Returns HTTP status code 400 for validation errors
  - Returns 500 for unexpected errors
- **Usage**:
  ```typescript
  // Example: Creating a Stripe subscription
  const createUserSubscription = async () => {
    const token = getAuthToken();
    const subscriptionDetails = {
      plan_id: "premium_monthly",
      payment_method: "card_1234567890"
    };
    
    const result = await createSubscription("stripe", token, subscriptionDetails);
    
    if (typeof result === "number") {
      // Handle error case
      console.error("Subscription creation failed with status:", result);
    } else {
      // Handle successful subscription
      console.log("Subscription created:", result);
    }
  };
  ```

## Interfaces

### SubscriptionObject
- **Description**: Object containing subscription details
- **Properties**:
  - `email?: string` - User's email address (automatically added from cookies)
  - `[key: string]: any` - Any additional subscription properties required by the payment provider

## Usage Examples

```typescript
// Example: Create a subscription with Stripe
const token = "user_auth_token_here";
const subscriptionDetails = {
  plan_id: "pro_annual",
  coupon_code: "WELCOME20"
};

try {
  const response = await createSubscription("stripe", token, subscriptionDetails);
  if (response === 400 || response === 500) {
    // Handle error based on status code
  } else {
    // Process successful subscription
    console.log("Subscription active:", response.active);
    console.log("Subscription ID:", response.id);
  }
} catch (error) {
  console.error("Subscription creation failed:", error);
}
```

## Type Safety Notes

- The function handles potential `null` values from `getCookie("email")` by converting them to `undefined` to match the `SubscriptionObject` interface
- Error responses are returned as HTTP status codes (numbers)
- Successful responses come directly from the API in JSON format