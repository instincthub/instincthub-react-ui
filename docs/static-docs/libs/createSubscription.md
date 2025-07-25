# createSubscription

**Category:** Library | **Type:** utility

A utility function that creates user subscriptions in the database through API calls. Perfect for handling subscription creation with payment channels, authentication, and error handling for subscription-based applications.

## 📁 File Location

`src/components/lib/createSubscription.ts`

## 🏷️ Tags

`subscription`, `payment`, `api`, `database`, `authentication`, `error-handling`

## 📖 Usage Examples

### Example 1: Complete Subscription Management Demo

```tsx
"use client";

import React, { useState } from "react";
import { createSubscription } from "@instincthub/react-ui/lib";

/**
 * Comprehensive example demonstrating createSubscription utility
 */
const SubscriptionExamples = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [subscriptionData, setSubscriptionData] = useState({
    plan: "premium",
    billing_cycle: "monthly",
    user_id: "",
    metadata: {}
  });
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  // Mock authentication token (in real app, get from auth context)
  const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

  const handleCreateSubscription = async (channel: string) => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await createSubscription(
        channel,
        authToken,
        subscriptionData
      );

      if (typeof response === 'number') {
        // Error status code returned
        setError(`Subscription creation failed with status: ${response}`);
      } else {
        // Success response
        setResult(response);
      }
    } catch (err) {
      setError(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const updateSubscriptionData = (field: string, value: any) => {
    setSubscriptionData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="ihub-container ihub-py-5">
      <h1>createSubscription Utility Examples</h1>

      {/* Subscription Form */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Create New Subscription</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <div className="ihub-mb-3">
                <label className="ihub-form-label">Subscription Plan:</label>
                <select
                  className="ihub-form-control"
                  value={subscriptionData.plan}
                  onChange={(e) => updateSubscriptionData('plan', e.target.value)}
                >
                  <option value="basic">Basic - $9.99/month</option>
                  <option value="premium">Premium - $19.99/month</option>
                  <option value="enterprise">Enterprise - $49.99/month</option>
                </select>
              </div>
              
              <div className="ihub-mb-3">
                <label className="ihub-form-label">Billing Cycle:</label>
                <select
                  className="ihub-form-control"
                  value={subscriptionData.billing_cycle}
                  onChange={(e) => updateSubscriptionData('billing_cycle', e.target.value)}
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly (Save 20%)</option>
                </select>
              </div>

              <div className="ihub-mb-3">
                <label className="ihub-form-label">User ID:</label>
                <input
                  type="text"
                  className="ihub-form-control"
                  value={subscriptionData.user_id}
                  onChange={(e) => updateSubscriptionData('user_id', e.target.value)}
                  placeholder="Enter user ID"
                />
              </div>
            </div>

            <div className="ihub-col-md-6">
              <h6>Current Subscription Data:</h6>
              <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "12px" }}>
                {JSON.stringify(subscriptionData, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Channel Selection */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Payment Channels</h2>
        <div className="ihub-row">
          {[
            { channel: "stripe", name: "Stripe", description: "Credit/Debit Cards", icon: "💳" },
            { channel: "paystack", name: "Paystack", description: "African Payments", icon: "🌍" },
            { channel: "paypal", name: "PayPal", description: "Global Payments", icon: "💰" },
            { channel: "flutterwave", name: "Flutterwave", description: "Pan-African", icon: "🦋" }
          ].map((payment, index) => (
            <div key={index} className="ihub-col-md-6 ihub-mb-3">
              <div className="ihub-card ihub-p-4">
                <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                  <div>
                    <h6>
                      <span className="ihub-me-2">{payment.icon}</span>
                      {payment.name}
                    </h6>
                    <p className="text-muted ihub-mb-0">{payment.description}</p>
                  </div>
                  <button
                    className="ihub-btn ihub-btn-primary"
                    onClick={() => handleCreateSubscription(payment.channel)}
                    disabled={loading || !subscriptionData.user_id}
                  >
                    {loading ? "Creating..." : "Subscribe"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Results Display */}
      {(result || error) && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">Subscription Result</h2>
          <div className="ihub-card ihub-p-4">
            {error && (
              <div className="ihub-alert ihub-alert-danger">
                <strong>Error:</strong> {error}
              </div>
            )}
            
            {result && (
              <div className="ihub-alert ihub-alert-success">
                <h6>✅ Subscription Created Successfully!</h6>
                <pre className="ihub-bg-light ihub-p-3 ihub-mt-3" style={{ fontSize: "12px" }}>
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Implementation Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Implementation Patterns</h2>
        
        {/* React Hook Pattern */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-code ihub-me-2"></i>
              Custom Hook for Subscriptions
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Custom hook for subscription management
import { useState } from 'react';
import { createSubscription } from '@instincthub/react-ui/lib';

interface UseSubscriptionProps {
  onSuccess?: (response: any) => void;
  onError?: (error: string) => void;
}

export const useSubscription = ({ onSuccess, onError }: UseSubscriptionProps = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const subscribe = async (
    channel: string,
    token: string,
    subscriptionData: any
  ) => {
    setLoading(true);
    setError('');

    try {
      const response = await createSubscription(channel, token, subscriptionData);
      
      if (typeof response === 'number') {
        const errorMsg = \`Subscription failed with status: \${response}\`;
        setError(errorMsg);
        onError?.(errorMsg);
      } else {
        onSuccess?.(response);
      }
      
      return response;
    } catch (err) {
      const errorMsg = \`Subscription error: \${err}\`;
      setError(errorMsg);
      onError?.(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { subscribe, loading, error };
};`}
            </pre>
          </div>
        </div>

        {/* Error Handling Pattern */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-exclamation-triangle ihub-me-2"></i>
              Error Handling Best Practices
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Robust subscription creation with retry logic
const createSubscriptionWithRetry = async (
  channel: string,
  token: string,
  subscriptionData: any,
  maxRetries: number = 3
): Promise<any> => {
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await createSubscription(channel, token, subscriptionData);
      
      // Check if response is error status code
      if (typeof response === 'number') {
        if (response === 400) {
          // Bad request - don't retry
          throw new Error('Invalid subscription data');
        } else if (response === 500) {
          // Server error - retry
          lastError = new Error(\`Server error on attempt \${attempt}\`);
          continue;
        }
      }
      
      // Success
      return response;
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        break;
      }
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
  }
  
  throw lastError;
};`}
            </pre>
          </div>
        </div>

        {/* Integration with State Management */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-database ihub-me-2"></i>
              Redux Integration Pattern
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Redux async action for subscription creation
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSubscription } from '@instincthub/react-ui/lib';

export const createUserSubscription = createAsyncThunk(
  'subscription/create',
  async ({ channel, token, subscriptionData }, { rejectWithValue }) => {
    try {
      const response = await createSubscription(channel, token, subscriptionData);
      
      if (typeof response === 'number') {
        return rejectWithValue(\`Failed with status: \${response}\`);
      }
      
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Usage in component
const dispatch = useAppDispatch();

const handleSubscribe = async () => {
  const result = await dispatch(createUserSubscription({
    channel: 'stripe',
    token: authToken,
    subscriptionData: {
      plan: 'premium',
      billing_cycle: 'monthly'
    }
  }));
  
  if (createUserSubscription.fulfilled.match(result)) {
    // Handle success
    console.log('Subscription created:', result.payload);
  } else {
    // Handle error
    console.error('Subscription failed:', result.payload);
  }
};`}
            </pre>
          </div>
        </div>
      </section>

      {/* Testing Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Testing Strategies</h2>
        <div className="ihub-card ihub-p-4">
          <h6>Unit Test Example</h6>
          <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Jest test for createSubscription
import { createSubscription } from '@instincthub/react-ui/lib';

// Mock the dependencies
jest.mock('@instincthub/react-ui', () => ({
  ...jest.requireActual('@instincthub/react-ui'),
  getCookie: jest.fn(),
  reqOptions: jest.fn(),
  openToast: jest.fn(),
}));

describe('createSubscription', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.clearAllMocks();
  });

  it('should create subscription successfully', async () => {
    const mockResponse = { id: '123', status: 'active' };
    global.fetch.mockResolvedValueOnce({
      status: 200,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await createSubscription(
      'stripe',
      'token123',
      { plan: 'premium' }
    );

    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/payments/stripe/user-subscription-create/'),
      expect.any(Object)
    );
  });

  it('should handle 400 status code', async () => {
    global.fetch.mockResolvedValueOnce({
      status: 400,
      json: () => Promise.resolve({ error: 'Invalid data' }),
    });

    const result = await createSubscription(
      'stripe',
      'token123',
      { plan: 'invalid' }
    );

    expect(result).toBe(400);
  });

  it('should handle network errors', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await createSubscription(
      'stripe',
      'token123',
      { plan: 'premium' }
    );

    expect(result).toBe(500);
  });
});`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionExamples;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { createSubscription } from '@instincthub/react-ui/lib';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { createSubscription } from '@instincthub/react-ui/lib';

function SubscriptionComponent() {
  const handleSubscribe = async () => {
    const subscriptionData = {
      plan: 'premium',
      billing_cycle: 'monthly',
      user_id: 'user123'
    };

    try {
      const response = await createSubscription(
        'stripe',
        'auth-token',
        subscriptionData
      );

      if (typeof response === 'number') {
        console.error('Subscription failed with status:', response);
      } else {
        console.log('Subscription created:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={handleSubscribe}>
      Create Subscription
    </button>
  );
}
```

## 🔧 Function Signature

```tsx
createSubscription(
  channel: string,
  token: string,
  objects: SubscriptionObject
): Promise<any>
```

### Parameters

- `channel` (string): Payment channel identifier (e.g., 'stripe', 'paystack', 'paypal')
- `token` (string): Authentication token for API access
- `objects` (SubscriptionObject): Subscription details object

### SubscriptionObject Interface

```tsx
interface SubscriptionObject {
  email?: string;  // Auto-populated from cookies if not provided
  [key: string]: any;  // Additional subscription properties
}
```

### Returns

- `Promise<any>`: Subscription response object on success
- `Promise<number>`: HTTP status code on API errors (400, 500)

## 📝 Key Features

- **Email Auto-Population**: Automatically includes email from cookies
- **Error Handling**: Built-in error handling with toast notifications
- **Multiple Payment Channels**: Supports various payment providers
- **Type Safety**: Full TypeScript support with proper interfaces
- **JSON Serialization**: Handles object serialization for API calls

## 💡 Use Cases

- **SaaS Subscriptions**: Create recurring billing subscriptions
- **Course Enrollments**: Handle educational platform subscriptions
- **Premium Features**: Upgrade users to premium tiers
- **Multi-Channel Payments**: Support different payment providers
- **User Onboarding**: Automate subscription creation during signup
- **Billing Management**: Handle subscription lifecycle events

## ⚡ API Integration

### Endpoint Pattern
```
${API_HOST_URL}payments/${channel}/user-subscription-create/
```

### Request Format
- **Method**: POST
- **Content-Type**: application/json
- **Authorization**: Bearer token in headers
- **Body**: Serialized subscription object with email

### Response Handling
- **Success**: Returns subscription object
- **400 Error**: Shows toast notification, returns status code
- **Network Error**: Returns 500 status code

## ⚠️ Important Considerations

- **Authentication**: Requires valid authentication token
- **Email Dependency**: Uses email from cookies as fallback
- **Error Feedback**: Automatically shows user-friendly error messages
- **Network Resilience**: Handles network errors gracefully
- **API Dependency**: Requires backend API endpoint availability

## 🔗 Related Utilities

- [reqOptions](./helpFunction.md#reqoptions) - Request configuration utility
- [getCookie](./helpFunction.md#getcookie) - Cookie management utility
- [openToast](./modals.md#opentoast) - Toast notification utility
- [API_HOST_URL](./helpFunction.md#constants) - API base URL configuration