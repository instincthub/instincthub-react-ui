# Paystack Payment Integration

**Category:** Library | **Type:** payment processing

Comprehensive Paystack payment processing utilities for handling subscriptions, one-time payments, and saved payment methods. Includes coupon validation, gateway charges calculation, and complete payment flow management with user confirmation dialogs.

## 📁 File Location

`src/components/lib/paystack.ts`

## 🏷️ Tags

`payments`, `paystack`, `subscriptions`, `ecommerce`, `gateway`, `nigeria`, `coupons`, `webhooks`

## 📖 Usage Examples

### Example 1: Complete Payment Integration System

```tsx
"use client";

import React, { useState } from "react";
import {
  handlePaymentSubmit,
  paystackDataConfig,
  chargeAuthorization,
  payWithPaystack
} from "@instincthub/react-ui/lib";

/**
 * Comprehensive payment system with Paystack integration
 */
const PaystackPaymentSystem = () => {
  const [paymentStatus, setPaymentStatus] = useState<number>(1);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [couponCode, setCouponCode] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("john.doe@example.com");
  const [paymentHistory, setPaymentHistory] = useState<any[]>([]);

  // Sample products for demonstration
  const products = [
    {
      id: "course-react-101",
      title: "React Fundamentals Course",
      description: "Learn React from basics to advanced concepts",
      price: 25000, // 250 NGN
      type: "course",
      duration: "8 weeks"
    },
    {
      id: "subscription-pro",
      title: "Pro Subscription",
      description: "Access to all premium courses and features",
      price: 50000, // 500 NGN
      type: "subscription",
      duration: "monthly"
    },
    {
      id: "workshop-nextjs",
      title: "Next.js Workshop",
      description: "Intensive Next.js workshop with live coding",
      price: 75000, // 750 NGN
      type: "workshop",
      duration: "1 day"
    }
  ];

  // Sample saved payment method
  const savedPaymentMethod = {
    authorization: {
      card_type: "mastercard",
      last4: "1234"
    },
    last4: "1234"
  };

  // Handle product selection and payment
  const handleProductPayment = async (product: any) => {
    setSelectedProduct(product);
    setPaymentStatus(0); // Set loading

    // Configure payment object
    const paymentConfig = {
      email: userEmail,
      first_name: "John",
      last_name: "Doe",
      amount: product.price,
      currency: "NGN",
      authorization_code: "AUTH_sample123", // Would come from saved payment method
      metadata: {
        channel_username: "instincthub-demo",
        content_type: product.type,
        object_id: product.id,
        user_id: "user-123",
        product_title: product.title
      },
      content_type: product.type,
      object_id: product.id
    };

    // Payment context for handlePaymentSubmit
    const paymentContext = {
      e: null,
      openConfirm: true,
      defaultConfirm: true,
      defaultMsg: `Are you sure you want to purchase ${product.title} for ₦${(product.price / 100).toLocaleString()}?`,
      label: product.title,
      objects: {
        object_id: product.id,
        object_type: product.type,
        title: product.title
      },
      configObj: paymentConfig,
      coupon: couponCode || undefined,
      gatwayCharges: 2.9, // 2.9% Paystack fee
      paymentMethod: savedPaymentMethod,
      handleDBAction: handlePaymentSuccess,
      setStatus: setPaymentStatus
    };

    try {
      await handlePaymentSubmit(paymentContext);
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentStatus(1); // Reset status
    }
  };

  // Handle successful payment
  const handlePaymentSuccess = (paymentData: any) => {
    console.log("Payment successful:", paymentData);
    
    const newTransaction = {
      id: Date.now(),
      reference: paymentData.reference || `TXN_${Date.now()}`,
      product: selectedProduct,
      amount: selectedProduct?.price || 0,
      status: paymentData.status || "success",
      timestamp: new Date().toISOString(),
      coupon_used: couponCode || null
    };

    setPaymentHistory(prev => [newTransaction, ...prev]);
    setSelectedProduct(null);
    setCouponCode("");
    setPaymentStatus(1);
    
    // Show success message
    alert(`Payment successful! Reference: ${newTransaction.reference}`);
  };

  // Test different Paystack functions
  const testPaystackConfig = () => {
    const config = paystackDataConfig({
      email: userEmail,
      first_name: "John",
      last_name: "Doe",
      amount: 10000,
      currency: "NGN",
      authorization_code: "AUTH_test123",
      metadata: {
        test: true,
        user_id: "user-123"
      }
    });

    console.log("Paystack Config:", config);
    alert("Check console for Paystack configuration");
  };

  const testChargeAuthorization = async () => {
    const testConfig = paystackDataConfig({
      email: userEmail,
      first_name: "John",
      last_name: "Doe",
      amount: 5000,
      currency: "NGN",
      authorization_code: "AUTH_test123",
      metadata: { test: true }
    });

    try {
      // Note: This would fail in demo since it's a real API call
      console.log("Would charge authorization with:", testConfig);
      alert("Demo: Would charge existing authorization (check console)");
    } catch (error) {
      console.error("Charge error:", error);
    }
  };

  return (
    <div className="ihub-container ihub-py-5">
      <h1>Paystack Payment Integration</h1>

      {/* Payment Status Indicator */}
      <section className="ihub-mb-4">
        <div className={`ihub-alert ${
          paymentStatus === 0 ? "ihub-alert-warning" : 
          paymentStatus === 1 ? "ihub-alert-success" : "ihub-alert-info"
        }`}>
          <strong>Payment Status:</strong> {
            paymentStatus === 0 ? "Processing..." :
            paymentStatus === 1 ? "Ready" : "Waiting"
          }
        </div>
      </section>

      {/* User Configuration */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">User Configuration</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h6>Payment Details</h6>
              <div className="ihub-mb-3">
                <label className="ihub-form-label">Email Address</label>
                <input
                  type="email"
                  className="ihub-form-control"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Enter email address"
                />
              </div>
              <div className="ihub-mb-3">
                <label className="ihub-form-label">Coupon Code (Optional)</label>
                <input
                  type="text"
                  className="ihub-form-control"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                />
              </div>
            </div>
          </div>
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h6>Saved Payment Method</h6>
              <div className="ihub-d-flex ihub-align-items-center ihub-mb-3">
                <i className="pi pi-credit-card ihub-me-3" style={{ fontSize: "24px" }}></i>
                <div>
                  <div><strong>Mastercard</strong> ending in 1234</div>
                  <small className="text-muted">Expires 12/2030</small>
                </div>
              </div>
              <button className="ihub-btn ihub-btn-outline-primary ihub-btn-sm">
                Manage Payment Methods
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Selection */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Available Products</h2>
        <div className="ihub-row">
          {products.map((product) => (
            <div key={product.id} className="ihub-col-md-4 ihub-mb-3">
              <div className="ihub-card ihub-h-100">
                <div className="ihub-card-body ihub-p-4">
                  <h5 className="ihub-card-title">{product.title}</h5>
                  <p className="ihub-card-text">{product.description}</p>
                  <div className="ihub-mb-3">
                    <span className="ihub-badge ihub-badge-info ihub-me-2">
                      {product.type}
                    </span>
                    <span className="ihub-badge ihub-badge-light">
                      {product.duration}
                    </span>
                  </div>
                  <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                    <h4 className="ihub-text-primary ihub-mb-0">
                      ₦{(product.price / 100).toLocaleString()}
                    </h4>
                    <button
                      className="ihub-btn ihub-btn-primary"
                      onClick={() => handleProductPayment(product)}
                      disabled={paymentStatus === 0}
                    >
                      {paymentStatus === 0 ? "Processing..." : "Purchase"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testing Functions */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Paystack Function Testing</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-p-4 ihub-text-center">
              <h6>Configuration Test</h6>
              <p>Test paystackDataConfig function</p>
              <button 
                className="ihub-btn ihub-btn-outline-primary"
                onClick={testPaystackConfig}
              >
                Test Config
              </button>
            </div>
          </div>
          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-p-4 ihub-text-center">
              <h6>Authorization Charge</h6>
              <p>Test chargeAuthorization function</p>
              <button 
                className="ihub-btn ihub-btn-outline-warning"
                onClick={testChargeAuthorization}
              >
                Test Charge
              </button>
            </div>
          </div>
          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-p-4 ihub-text-center">
              <h6>Payment Modal</h6>
              <p>Test payWithPaystack popup</p>
              <button 
                className="ihub-btn ihub-btn-outline-success"
                disabled
              >
                Requires Paystack Script
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Payment History */}
      {paymentHistory.length > 0 && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">Payment History</h2>
          <div className="ihub-card">
            <div className="table-responsive">
              <table className="table table-hover ihub-mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Reference</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Coupon</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>
                        <code>{transaction.reference}</code>
                      </td>
                      <td>{transaction.product?.title}</td>
                      <td>₦{(transaction.amount / 100).toLocaleString()}</td>
                      <td>
                        <span className={`ihub-badge ${
                          transaction.status === "success" 
                            ? "ihub-badge-success" 
                            : "ihub-badge-warning"
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td>{new Date(transaction.timestamp).toLocaleDateString()}</td>
                      <td>
                        {transaction.coupon_used ? (
                          <span className="ihub-badge ihub-badge-info">
                            {transaction.coupon_used}
                          </span>
                        ) : (
                          <span className="text-muted">None</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Implementation Guide */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Implementation Examples</h2>
        
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-cog ihub-me-2"></i>
              Complete Payment Flow
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Complete payment implementation
import { handlePaymentSubmit } from '@instincthub/react-ui/lib';

const PaymentComponent = () => {
  const [paymentStatus, setPaymentStatus] = useState(1);

  const processPayment = async (productData) => {
    const paymentContext = {
      openConfirm: true,
      defaultConfirm: true,
      defaultMsg: \`Purchase \${productData.title} for ₦\${productData.price}?\`,
      label: productData.title,
      objects: {
        object_id: productData.id,
        object_type: productData.type,
        title: productData.title
      },
      configObj: {
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        amount: productData.price,
        currency: "NGN",
        authorization_code: user.savedCard?.auth_code,
        metadata: {
          channel_username: "your-channel",
          content_type: productData.type,
          object_id: productData.id,
          user_id: user.id
        }
      },
      coupon: couponCode,
      gatwayCharges: 2.9, // Paystack fee percentage
      paymentMethod: user.savedPaymentMethod,
      handleDBAction: handlePaymentSuccess,
      setStatus: setPaymentStatus
    };

    await handlePaymentSubmit(paymentContext);
  };

  const handlePaymentSuccess = (paymentData) => {
    // Update user subscription/enrollment
    updateUserAccess(paymentData);
    
    // Send confirmation email
    sendConfirmationEmail(paymentData);
    
    // Redirect to success page
    router.push('/payment/success');
  };

  return (
    <button onClick={() => processPayment(product)}>
      {paymentStatus === 0 ? 'Processing...' : 'Purchase Now'}
    </button>
  );
};`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaystackPaymentSystem;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import {
  handlePaymentSubmit,
  paystackDataConfig,
  chargeAuthorization,
  payWithPaystack
} from '@instincthub/react-ui/lib';
```

## 🚀 Basic Usage

```tsx
import React, { useState } from 'react';
import { handlePaymentSubmit, paystackDataConfig } from '@instincthub/react-ui/lib';

function PaymentButton({ product, user }) {
  const [status, setStatus] = useState(1);

  const handlePurchase = async () => {
    const paymentContext = {
      label: product.title,
      objects: {
        object_id: product.id,
        object_type: 'product'
      },
      configObj: {
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        amount: product.price,
        currency: 'NGN'
      },
      handleDBAction: (data) => {
        console.log('Payment successful:', data);
      },
      setStatus
    };

    await handlePaymentSubmit(paymentContext);
  };

  return (
    <button onClick={handlePurchase} disabled={status === 0}>
      {status === 0 ? 'Processing...' : 'Buy Now'}
    </button>
  );
}
```

## 🔧 Function Reference

### Payment Processing

#### `handlePaymentSubmit(contexts: PaymentContextType): Promise<void>`
Orchestrates the complete payment flow including confirmation, coupon validation, and payment processing.

```tsx
interface PaymentContextType {
  e?: Event | null;                    // Form submission event
  openConfirm?: boolean;               // Whether to show confirmation
  defaultConfirm?: boolean;            // Use default confirmation message
  defaultMsg?: string;                 // Custom confirmation message
  label: string;                       // Payment description
  objects: {
    object_id: string;                 // Item ID being purchased
    object_type: string;               // Type of item (course, subscription)
    title?: string;                    // Item title
  };
  configObj: PaystackConfigObjectType; // Payment configuration
  coupon?: string;                     // Coupon code
  gatwayCharges?: number;              // Gateway fee percentage
  paymentMethod?: PaymentMethodType;   // Saved payment method
  handleDBAction: (data: any) => void; // Success callback
  setStatus: (status: number) => void; // Status update callback
}
```

#### `paystackDataConfig(obj: PaystackConfigObjectType): PaystackConfigType`
Configures Paystack payment data with proper formatting and environment variables.

```tsx
interface PaystackConfigObjectType {
  email: string;
  first_name: string;
  last_name: string;
  amount: number;                      // Amount in kobo (multiply by 100)
  currency?: string;                   // Default: "NGN"
  authorization_code?: string;         // For saved payment methods
  metadata?: Record<string, any>;      // Additional data
  content_type?: string;
  object_id?: string;
}
```

#### `chargeAuthorization(data: PaystackConfigType): Promise<any>`
Charges a customer using an existing authorization (saved card).

#### `payWithPaystack(config: PaystackConfigType): Promise<PaystackResponseType>`
Initiates Paystack popup for new card payments.

## 🎯 Advanced Features

### Coupon System
- **Automatic Validation**: Validates coupons against server
- **Discount Application**: Applies percentage or fixed discounts
- **100% Discount Handling**: Bypasses payment for free items
- **Error Handling**: Graceful handling of invalid coupons

### Gateway Charges
- **Dynamic Calculation**: Calculates fees to meet target amount
- **Nigeria Cap**: Respects ₦2000 maximum fee for local transactions
- **Transparent Pricing**: Shows fees to users before payment

### Payment Methods
- **Saved Cards**: Uses existing authorization codes
- **New Cards**: Paystack popup for new payment methods
- **User Choice**: Allows selection between saved and new cards
- **Security**: Handles authorization securely

## 💡 Use Cases

### E-Learning Platform
- **Course Enrollment**: Purchase individual courses
- **Subscription Management**: Monthly/yearly subscriptions
- **Workshop Bookings**: One-time event payments
- **Certification Fees**: Additional certification costs

### SaaS Applications
- **Plan Upgrades**: Upgrade subscription tiers
- **Feature Unlocks**: Purchase premium features
- **Usage Billing**: Pay-as-you-go pricing
- **Add-on Services**: Additional service purchases

### E-commerce Integration
- **Product Sales**: Physical/digital product purchases
- **Service Bookings**: Appointment and service payments
- **Membership Fees**: Club and organization memberships
- **Donation Processing**: Charitable contribution handling

## 🔒 Security Best Practices

### API Security
- **Environment Variables**: Store sensitive keys securely
- **Webhook Verification**: Verify Paystack webhook signatures
- **Amount Validation**: Always verify amounts server-side
- **Reference Uniqueness**: Ensure transaction references are unique

### User Data Protection
- **No Card Storage**: Never store card details locally
- **PCI Compliance**: Use Paystack's secure tokenization
- **Email Validation**: Verify user email addresses
- **Authorization Management**: Secure authorization code handling

### Error Handling
- **Graceful Failures**: Handle payment failures elegantly
- **User Feedback**: Provide clear error messages
- **Retry Logic**: Allow users to retry failed payments
- **Logging**: Log errors for debugging without exposing sensitive data

## 🌍 Regional Considerations

### Nigeria-Specific Features
- **NGN Currency**: Primary currency support
- **Local Bank Support**: Integration with Nigerian banks
- **Fee Structure**: Complies with Nigerian payment regulations
- **Business Registration**: Supports Nigerian business requirements

### International Expansion
- **Multi-Currency**: Extensible for other currencies
- **Gateway Agnostic**: Can be adapted for other payment providers
- **Localization Ready**: Structure supports multiple regions
- **Compliance**: Built with international payment standards

## ⚠️ Important Notes

- **Environment Setup**: Requires Paystack public and secret keys
- **Script Loading**: Paystack JavaScript library must be loaded
- **HTTPS Required**: All payment processing requires secure connections
- **Testing Mode**: Use Paystack test keys for development
- **Production Security**: Never expose secret keys in client-side code

## 🔗 Related Utilities

- [oauth_json](./oauth_json.md) - Sample Paystack webhook structure
- [createSubscription](./createSubscription.md) - Subscription management integration
- [getPriceObjects](./getPriceObjects.md) - Pricing calculation utilities
- [utils](./utils.md) - Payment gateway and currency constants
- [helpFunction](./helpFunction.md) - API request utilities for payment processing