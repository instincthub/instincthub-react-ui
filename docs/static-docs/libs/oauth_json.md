# OAuth Configuration & Sample Data

**Category:** Library | **Type:** configuration data

Sample OAuth response data and webhook examples for testing and development. Provides realistic mock data structures for Google authentication and Paystack payment webhooks to facilitate development and testing scenarios.

## 📁 File Location

`src/components/lib/oauth_json.ts`

## 🏷️ Tags

`oauth`, `authentication`, `google`, `paystack`, `webhooks`, `mock-data`, `testing`, `development`

## 📖 Usage Examples

### Example 1: OAuth Integration Testing Component

```tsx
"use client";

import React, { useState } from "react";
import {
  profile_goggle_provider,
  paystackHook
} from "@instincthub/react-ui/lib";

/**
 * OAuth and Payment Testing Dashboard
 */
const OAuthTestingDashboard = () => {
  const [selectedDataType, setSelectedDataType] = useState<string>("google");
  const [testPayload, setTestPayload] = useState<any>(null);

  // Google OAuth testing
  const simulateGoogleLogin = () => {
    // Simulate processing Google OAuth response
    console.log("Processing Google OAuth:", profile_goggle_provider);
    
    const userProfile = {
      id: profile_goggle_provider.sub,
      email: profile_goggle_provider.email,
      name: profile_goggle_provider.name,
      picture: profile_goggle_provider.picture,
      verified: profile_goggle_provider.email_verified,
      given_name: profile_goggle_provider.given_name,
      family_name: profile_goggle_provider.family_name,
      locale: profile_goggle_provider.locale
    };

    setTestPayload(userProfile);
    return userProfile;
  };

  // Paystack webhook testing
  const simulatePaystackWebhook = () => {
    // Simulate processing Paystack webhook
    console.log("Processing Paystack webhook:", paystackHook);
    
    const transactionDetails = {
      id: paystackHook.data.id,
      amount: paystackHook.data.amount / 100, // Convert from kobo
      currency: paystackHook.data.currency,
      status: paystackHook.data.status,
      reference: paystackHook.data.reference,
      customer: paystackHook.data.customer,
      metadata: paystackHook.data.metadata,
      authorization: paystackHook.data.authorization,
      paid_at: paystackHook.data.paid_at,
      event: paystackHook.event
    };

    setTestPayload(transactionDetails);
    return transactionDetails;
  };

  const formatJSONDisplay = (data: any) => {
    return JSON.stringify(data, null, 2);
  };

  return (
    <div className="ihub-container ihub-py-5">
      <h1>OAuth & Payment Testing Dashboard</h1>
      
      {/* Data Type Selector */}
      <section className="ihub-mb-4">
        <h2 className="ihub-fs-lg ihub-mb-3">Test Data Types</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <button
              className={`ihub-btn ihub-w-100 ihub-mb-2 ${
                selectedDataType === "google" 
                  ? "ihub-btn-primary" 
                  : "ihub-btn-outline-primary"
              }`}
              onClick={() => setSelectedDataType("google")}
            >
              <i className="pi pi-google ihub-me-2"></i>
              Google OAuth Response
            </button>
          </div>
          <div className="ihub-col-md-6">
            <button
              className={`ihub-btn ihub-w-100 ihub-mb-2 ${
                selectedDataType === "paystack" 
                  ? "ihub-btn-primary" 
                  : "ihub-btn-outline-primary"
              }`}
              onClick={() => setSelectedDataType("paystack")}
            >
              <i className="pi pi-credit-card ihub-me-2"></i>
              Paystack Webhook
            </button>
          </div>
        </div>
      </section>

      {/* Google OAuth Testing */}
      {selectedDataType === "google" && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">Google OAuth Integration</h2>
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <div className="ihub-card ihub-p-4">
                <h5>User Profile Data</h5>
                <div className="ihub-mb-3">
                  <div className="ihub-d-flex ihub-align-items-center ihub-mb-3">
                    <img 
                      src={profile_goggle_provider.picture} 
                      alt="Profile" 
                      className="ihub-rounded-circle ihub-me-3"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <div>
                      <h6 className="ihub-mb-0">{profile_goggle_provider.name}</h6>
                      <small className="text-muted">
                        {profile_goggle_provider.email}
                      </small>
                    </div>
                  </div>
                  <div className="ihub-mb-2">
                    <strong>Email Verified:</strong>
                    <span className={`ihub-badge ihub-ms-1 ${
                      profile_goggle_provider.email_verified 
                        ? "ihub-badge-success" 
                        : "ihub-badge-danger"
                    }`}>
                      {profile_goggle_provider.email_verified ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="ihub-mb-2">
                    <strong>Locale:</strong> {profile_goggle_provider.locale}
                  </div>
                  <div className="ihub-mb-3">
                    <strong>Token Expires:</strong><br />
                    <small>
                      {new Date(profile_goggle_provider.exp * 1000).toLocaleString()}
                    </small>
                  </div>
                </div>
                <button 
                  className="ihub-btn ihub-btn-success ihub-w-100"
                  onClick={simulateGoogleLogin}
                >
                  Simulate Google Login
                </button>
              </div>
            </div>
            <div className="ihub-col-md-6">
              <div className="ihub-card ihub-p-4">
                <h6>Raw OAuth Response</h6>
                <pre 
                  className="ihub-bg-light ihub-p-3" 
                  style={{ fontSize: "10px", maxHeight: "400px", overflow: "auto" }}
                >
                  {formatJSONDisplay(profile_goggle_provider)}
                </pre>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Paystack Webhook Testing */}
      {selectedDataType === "paystack" && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">Paystack Webhook Integration</h2>
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <div className="ihub-card ihub-p-4">
                <h5>Transaction Details</h5>
                <div className="ihub-mb-3">
                  <div className="ihub-d-flex ihub-justify-content-between ihub-mb-2">
                    <strong>Amount:</strong>
                    <span className="ihub-badge ihub-badge-primary">
                      ₦{(paystackHook.data.amount / 100).toLocaleString()}
                    </span>
                  </div>
                  <div className="ihub-d-flex ihub-justify-content-between ihub-mb-2">
                    <strong>Status:</strong>
                    <span className={`ihub-badge ${
                      paystackHook.data.status === "success" 
                        ? "ihub-badge-success" 
                        : "ihub-badge-warning"
                    }`}>
                      {paystackHook.data.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="ihub-d-flex ihub-justify-content-between ihub-mb-2">
                    <strong>Reference:</strong>
                    <code>{paystackHook.data.reference}</code>
                  </div>
                  <div className="ihub-d-flex ihub-justify-content-between ihub-mb-2">
                    <strong>Channel:</strong>
                    <span>{paystackHook.data.channel}</span>
                  </div>
                  <div className="ihub-d-flex ihub-justify-content-between ihub-mb-3">
                    <strong>Event:</strong>
                    <span className="ihub-badge ihub-badge-info">
                      {paystackHook.event}
                    </span>
                  </div>
                </div>

                <h6>Customer Information</h6>
                <div className="ihub-mb-3">
                  <div><strong>Email:</strong> {paystackHook.data.customer.email}</div>
                  <div><strong>Code:</strong> {paystackHook.data.customer.customer_code}</div>
                </div>

                <h6>Card Information</h6>
                <div className="ihub-mb-3">
                  <div>
                    <strong>Card:</strong> {paystackHook.data.authorization.card_type} 
                    ending in {paystackHook.data.authorization.last4}
                  </div>
                  <div><strong>Bank:</strong> {paystackHook.data.authorization.bank}</div>
                  <div><strong>Brand:</strong> {paystackHook.data.authorization.brand}</div>
                </div>

                <button 
                  className="ihub-btn ihub-btn-success ihub-w-100"
                  onClick={simulatePaystackWebhook}
                >
                  Simulate Webhook Processing
                </button>
              </div>
            </div>
            <div className="ihub-col-md-6">
              <div className="ihub-card ihub-p-4">
                <h6>Webhook Payload</h6>
                <pre 
                  className="ihub-bg-light ihub-p-3" 
                  style={{ fontSize: "9px", maxHeight: "400px", overflow: "auto" }}
                >
                  {formatJSONDisplay(paystackHook)}
                </pre>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Test Results */}
      {testPayload && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">Test Results</h2>
          <div className="ihub-card ihub-p-4">
            <h6>Processed Data</h6>
            <pre 
              className="ihub-bg-light ihub-p-3" 
              style={{ fontSize: "11px", maxHeight: "300px", overflow: "auto" }}
            >
              {formatJSONDisplay(testPayload)}
            </pre>
            <button 
              className="ihub-btn ihub-btn-outline-secondary ihub-mt-2"
              onClick={() => setTestPayload(null)}
            >
              Clear Results
            </button>
          </div>
        </section>
      )}

      {/* Implementation Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Implementation Examples</h2>
        
        {/* Google OAuth Handler */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-google ihub-me-2"></i>
              Google OAuth Handler
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Google OAuth response processing
import { profile_goggle_provider } from '@instincthub/react-ui/lib';

const handleGoogleOAuth = (response: typeof profile_goggle_provider) => {
  // Verify token expiration
  const now = Math.floor(Date.now() / 1000);
  if (response.exp < now) {
    throw new Error('Token has expired');
  }

  // Extract user information
  const user = {
    id: response.sub,
    email: response.email,
    name: response.name,
    firstName: response.given_name,
    lastName: response.family_name,
    picture: response.picture,
    emailVerified: response.email_verified,
    locale: response.locale,
    provider: 'google'
  };

  // Validate required fields
  if (!user.email || !user.emailVerified) {
    throw new Error('Email verification required');
  }

  return user;
};

// Usage in NextAuth configuration
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        // Use sample structure for development
        const processedProfile = handleGoogleOAuth(profile_goggle_provider);
        return !!processedProfile.email;
      }
      return true;
    },
  },
};`}
            </pre>
          </div>
        </div>

        {/* Paystack Webhook Handler */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-credit-card ihub-me-2"></i>
              Paystack Webhook Handler
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Paystack webhook processing
import { paystackHook } from '@instincthub/react-ui/lib';

const handlePaystackWebhook = (webhookPayload: typeof paystackHook) => {
  // Verify event type
  if (webhookPayload.event !== 'charge.success') {
    console.log('Unhandled event type:', webhookPayload.event);
    return null;
  }

  // Extract transaction data
  const transaction = {
    id: webhookPayload.data.id,
    reference: webhookPayload.data.reference,
    amount: webhookPayload.data.amount / 100, // Convert from kobo
    currency: webhookPayload.data.currency,
    status: webhookPayload.data.status,
    customerEmail: webhookPayload.data.customer.email,
    customerCode: webhookPayload.data.customer.customer_code,
    authorizationCode: webhookPayload.data.authorization.authorization_code,
    cardType: webhookPayload.data.authorization.card_type,
    lastFour: webhookPayload.data.authorization.last4,
    bank: webhookPayload.data.authorization.bank,
    metadata: webhookPayload.data.metadata,
    paidAt: webhookPayload.data.paid_at,
    fees: webhookPayload.data.fees / 100,
    gatewayResponse: webhookPayload.data.gateway_response
  };

  // Process based on metadata
  if (transaction.metadata?.content_type && transaction.metadata?.object_id) {
    console.log('Processing enrollment for:', {
      contentType: transaction.metadata.content_type,
      objectId: transaction.metadata.object_id,
      user: transaction.metadata.user,
      channel: transaction.metadata.channel
    });
  }

  return transaction;
};

// Express.js webhook endpoint
app.post('/webhook/paystack', (req, res) => {
  try {
    const processedTransaction = handlePaystackWebhook(req.body);
    
    if (processedTransaction) {
      // Update database, send notifications, etc.
      console.log('Transaction processed:', processedTransaction);
    }
    
    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(400).send('Error processing webhook');
  }
});

// Next.js API route
export default async function handler(req: NextRequest) {
  if (req.method === 'POST') {
    const webhookData = await req.json();
    const processed = handlePaystackWebhook(webhookData);
    
    return NextResponse.json({ success: true, data: processed });
  }
  
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OAuthTestingDashboard;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import {
  profile_goggle_provider,
  paystackHook
} from '@instincthub/react-ui/lib';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { profile_goggle_provider, paystackHook } from '@instincthub/react-ui/lib';

// Google OAuth processing
function processGoogleAuth() {
  const userInfo = {
    id: profile_goggle_provider.sub,
    email: profile_goggle_provider.email,
    name: profile_goggle_provider.name,
    picture: profile_goggle_provider.picture,
    verified: profile_goggle_provider.email_verified
  };
  
  return userInfo;
}

// Paystack webhook processing
function processPaystackWebhook() {
  const transaction = {
    amount: paystackHook.data.amount / 100,
    status: paystackHook.data.status,
    reference: paystackHook.data.reference,
    customer: paystackHook.data.customer.email
  };
  
  return transaction;
}
```

## 🔧 Data Structures

### Google OAuth Profile

#### `profile_goggle_provider: GoogleOAuthProfile`
Sample Google OAuth JWT token payload containing user profile information.

```tsx
interface GoogleOAuthProfile {
  iss: string;           // Token issuer (accounts.google.com)
  azp: string;           // Authorized party
  aud: string;           // Audience
  sub: string;           // Subject (user ID)
  email: string;         // User email address
  email_verified: boolean; // Email verification status
  at_hash: string;       // Access token hash
  name: string;          // Full name
  picture: string;       // Profile picture URL
  given_name: string;    // First name
  family_name: string;   // Last name
  locale: string;        // User locale
  iat: number;           // Issued at timestamp
  exp: number;           // Expiration timestamp
}
```

### Paystack Webhook

#### `paystackHook: PaystackWebhookPayload`
Sample Paystack webhook payload for successful charge events.

```tsx
interface PaystackWebhookPayload {
  data: {
    id: number;
    amount: number;        // Amount in kobo (multiply by 100)
    currency: string;      // Usually "NGN"
    status: string;        // "success", "failed", etc.
    reference: string;     // Transaction reference
    customer: {
      id: number;
      email: string;
      customer_code: string;
    };
    authorization: {
      authorization_code: string;
      card_type: string;
      last4: string;
      bank: string;
      brand: string;
      reusable: boolean;
    };
    metadata: {
      user: number;
      amount: number;
      channel: string;
      object_id: string;
      content_type: number;
      [key: string]: any;
    };
    fees: number;          // Transaction fees in kobo
    paid_at: string;       // ISO timestamp
    gateway_response: string;
  };
  event: string;           // "charge.success", etc.
}
```

## 💡 Use Cases

### Development & Testing
- **OAuth Flow Testing**: Use Google profile data to test authentication flows
- **Payment Integration**: Test Paystack webhook processing without real transactions
- **API Development**: Mock realistic response structures during development
- **Unit Testing**: Consistent test data for automated testing

### Integration Scenarios
- **NextAuth Setup**: Configure Google OAuth provider with sample data structure
- **Webhook Development**: Build Paystack webhook handlers using sample payload
- **Type Safety**: Use as TypeScript reference for API integration
- **Documentation**: Reference implementation patterns and data structures

### Data Validation
- **Schema Validation**: Validate incoming OAuth/webhook data against samples
- **Field Mapping**: Map external API responses to internal data structures
- **Error Handling**: Test error scenarios with known data patterns
- **Security Testing**: Verify token expiration and validation logic

## 🔒 Security Considerations

### OAuth Data
- **Token Expiration**: Always check `exp` field before processing
- **Email Verification**: Verify `email_verified` field for security
- **Issuer Validation**: Confirm `iss` field matches expected Google issuer
- **Audience Validation**: Verify `aud` field matches your application

### Webhook Data
- **Signature Verification**: Always verify Paystack webhook signatures in production
- **Event Type Filtering**: Only process expected event types
- **Idempotency**: Handle duplicate webhook deliveries gracefully
- **Amount Validation**: Always convert amounts from kobo and validate

## ⚠️ Important Notes

- **Development Only**: These are sample/mock data structures for development
- **Not for Production**: Never use this static data in production environments
- **Update Structure**: Actual API responses may have additional or different fields
- **Version Compatibility**: API structures may change over time

## 🔗 Related Utilities

- [paystack](./paystack.md) - Payment processing utilities that use this webhook structure
- [helpFunction](./helpFunction.md) - API request utilities for OAuth integration
- [permissions](./permissions.md) - User permission handling after OAuth
- [utils](./utils.md) - Session data structures and authentication constants