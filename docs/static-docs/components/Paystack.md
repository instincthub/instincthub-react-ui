# Paystack

**Category:** Library | **Type:** component

Comprehensive Paystack payment integration with advanced features

## 🏷️ Tags

`library`, `payment`, `integration`, `paystack`, `ecommerce`

```tsx
"use client";
import React, { useState, useEffect } from "react";
import {
  handlePaymentSubmit,
  paystackDataConfig,
  chargeAuthorization,
  payWithPaystack,
} from "@instincthub/react-ui/lib";
import { openToast, openConfirmModal } from "@instincthub/react-ui/lib";
import { PaystackConfigObjectType, PaymentContextType } from "@/types";

/**
 * Comprehensive examples demonstrating Paystack payment integration
 * Shows various payment scenarios and implementation patterns
 */
const PaystackIntegrationExamples = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentStatus, setPaymentStatus] = useState<number>(1);
  const [userProfile, setUserProfile] = useState({
    email: "user@example.com",
    firstName: "John",
    lastName: "Doe",
    savedCards: [
      {
        authorization_code: "AUTH_pmx3mgawyd",
        card_type: "visa",
        last4: "1234",
        exp_month: "12",
        exp_year: "2025",
      },
    ],
  });

  // Product/Service data
  const [products] = useState([
    {
      id: 1,
      name: "Premium Course Access",
      price: 15000,
      description: "Full access to all premium courses",
      type: "subscription",
    },
    {
      id: 2,
      name: "Individual Course",
      price: 5000,
      description: "Access to a single course",
      type: "one-time",
    },
    {
      id: 3,
      name: "Consultation Session",
      price: 25000,
      description: "1-hour personal consultation",
      type: "service",
    },
  ]);

  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [couponCode, setCouponCode] = useState("");
  const [includeGatewayFees, setIncludeGatewayFees] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<"new" | "saved">("new");

  // Handle successful payment
  const handlePaymentSuccess = (response: any) => {
    console.log("Payment successful:", response);
    setPaymentStatus(1);
    
    if (response.reference) {
      openToast(`Payment successful! Reference: ${response.reference}`);
      
      // Here you would typically:
      // 1. Update user's subscription/purchase status
      // 2. Send confirmation email
      // 3. Redirect to success page
      // 4. Update local state
      
      // Simulate API call to update user status
      setTimeout(() => {
        openToast("Account access updated successfully!");
      }, 1000);
    }
  };

  // Basic payment configuration
  const createBasicPaymentConfig = (): PaystackConfigObjectType => ({
    email: userProfile.email,
    first_name: userProfile.firstName,
    last_name: userProfile.lastName,
    amount: selectedProduct.price,
    currency: "NGN",
    authorization_code: paymentMethod === "saved" ? userProfile.savedCards[0]?.authorization_code : undefined,
    content_type: "course",
    object_id: selectedProduct.id.toString(),
    metadata: {
      product_name: selectedProduct.name,
      product_type: selectedProduct.type,
      user_id: "user_123",
      channel_username: "instincthub",
    },
  });

  // Handle simple payment
  const handleSimplePayment = async () => {
    const config = createBasicPaymentConfig();
    
    const paymentContext: PaymentContextType = {
      openConfirm: true,
      defaultConfirm: true,
      defaultMsg: `Are you sure you want to purchase ${selectedProduct.name} for ₦${selectedProduct.price.toLocaleString()}?`,
      label: selectedProduct.name,
      objects: {
        object_id: selectedProduct.id.toString(),
        object_type: selectedProduct.type,
        title: selectedProduct.name,
      },
      configObj: config,
      handleDBAction: handlePaymentSuccess,
      setStatus: setPaymentStatus,
      coupon: couponCode || undefined,
      gatwayCharges: includeGatewayFees ? 1.5 : undefined, // 1.5% gateway fee
      paymentMethod: paymentMethod === "saved" ? {
        authorization: userProfile.savedCards[0],
        last4: userProfile.savedCards[0]?.last4,
      } : undefined,
    };

    await handlePaymentSubmit(paymentContext);
  };

  // Handle subscription payment with recurring setup
  const handleSubscriptionPayment = async () => {
    const config: PaystackConfigObjectType = {
      ...createBasicPaymentConfig(),
      amount: 15000, // Monthly subscription
      metadata: {
        ...createBasicPaymentConfig().metadata,
        subscription_type: "monthly",
        auto_renew: true,
      },
    };

    const paymentContext: PaymentContextType = {
      openConfirm: true,
      defaultConfirm: true,
      defaultMsg: "This will set up a monthly subscription that will auto-renew. Continue?",
      label: "Premium Subscription",
      objects: {
        object_id: "subscription_1",
        object_type: "subscription",
        title: "Premium Monthly Subscription",
      },
      configObj: config,
      handleDBAction: (response) => {
        console.log("Subscription created:", response);
        openToast("Subscription activated successfully!");
        // Set up recurring billing logic here
      },
      setStatus: setPaymentStatus,
      gatwayCharges: 1.5,
    };

    await handlePaymentSubmit(paymentContext);
  };

  // Handle payment with coupon
  const handleCouponPayment = async () => {
    if (!couponCode) {
      openToast("Please enter a coupon code", 400);
      return;
    }

    const config = createBasicPaymentConfig();
    
    const paymentContext: PaymentContextType = {
      openConfirm: true,
      defaultConfirm: true,
      label: selectedProduct.name,
      objects: {
        object_id: selectedProduct.id.toString(),
        object_type: "course",
        title: selectedProduct.name,
      },
      configObj: config,
      handleDBAction: handlePaymentSuccess,
      setStatus: setPaymentStatus,
      coupon: couponCode,
      gatwayCharges: includeGatewayFees ? 1.5 : undefined,
    };

    await handlePaymentSubmit(paymentContext);
  };

  // Handle direct card charge (for existing customers)
  const handleDirectCharge = async () => {
    if (!userProfile.savedCards.length) {
      openToast("No saved payment methods available", 400);
      return;
    }

    const config = paystackDataConfig(createBasicPaymentConfig());
    
    try {
      setPaymentStatus(0); // Loading
      const result = await chargeAuthorization(config);
      
      if (result.status === "success") {
        handlePaymentSuccess(result);
      } else {
        openToast("Payment failed. Please try again.", 400);
        setPaymentStatus(1);
      }
    } catch (error) {
      console.error("Direct charge error:", error);
      openToast("Payment processing error", 400);
      setPaymentStatus(1);
    }
  };

  // Handle manual Paystack popup
  const handleManualPaystack = async () => {
    const config = paystackDataConfig(createBasicPaymentConfig());
    
    try {
      setPaymentStatus(0);
      const result = await payWithPaystack(config);
      
      if (result.status === "success") {
        handlePaymentSuccess(result);
      } else {
        openToast("Payment was cancelled or failed", 400);
        setPaymentStatus(1);
      }
    } catch (error) {
      console.error("Paystack popup error:", error);
      openToast("Could not initialize payment", 400);
      setPaymentStatus(1);
    }
  };

  // Calculate total with fees
  const calculateTotal = () => {
    let total = selectedProduct.price;
    
    if (includeGatewayFees) {
      const fee = total * 0.015; // 1.5% fee
      const localCharges = fee > 2000 ? 2000 : fee; // Cap at ₦2000
      total += localCharges;
    }
    
    return total;
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>Paystack Payment Integration Examples</h1>
      <p className="ihub-mb-4">
        Comprehensive payment integration with Paystack API, featuring multiple payment methods,
        coupon support, recurring billing, and advanced payment flows.
      </p>

      {/* Payment Configuration Panel */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Payment Configuration</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Setup Payment Details</h3>
          </div>
          <div className="ihub-card-body">
            <div className="ihub-row">
              <div className="ihub-col-md-6">
                <div className="ihub-mb-3">
                  <label className="ihub-form-label">Select Product/Service</label>
                  <select
                    className="ihub-input"
                    value={selectedProduct.id}
                    onChange={(e) => {
                      const product = products.find(p => p.id === Number(e.target.value));
                      if (product) setSelectedProduct(product);
                    }}
                  >
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} - ₦{product.price.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="ihub-mb-3">
                  <label className="ihub-form-label">Coupon Code</label>
                  <input
                    type="text"
                    className="ihub-input"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  />
                </div>
              </div>
              
              <div className="ihub-col-md-6">
                <div className="ihub-mb-3">
                  <label className="ihub-form-label">Payment Method</label>
                  <div className="ihub-radio-group">
                    <label className="ihub-radio-container">
                      <input
                        type="radio"
                        value="new"
                        checked={paymentMethod === "new"}
                        onChange={(e) => setPaymentMethod(e.target.value as "new" | "saved")}
                      />
                      <span className="ihub-radio-mark"></span>
                      New Payment Method
                    </label>
                    <label className="ihub-radio-container">
                      <input
                        type="radio"
                        value="saved"
                        checked={paymentMethod === "saved"}
                        onChange={(e) => setPaymentMethod(e.target.value as "new" | "saved")}
                        disabled={!userProfile.savedCards.length}
                      />
                      <span className="ihub-radio-mark"></span>
                      Saved Card (**** {userProfile.savedCards[0]?.last4})
                    </label>
                  </div>
                </div>
                
                <div className="ihub-mb-3">
                  <label className="ihub-checkbox-container">
                    <input
                      type="checkbox"
                      checked={includeGatewayFees}
                      onChange={(e) => setIncludeGatewayFees(e.target.checked)}
                    />
                    <span className="ihub-checkmark"></span>
                    Include gateway fees (1.5%, max ₦2000)
                  </label>
                </div>
              </div>
            </div>
            
            {/* Payment Summary */}
            <div className="ihub-payment-summary ihub-mt-4 ihub-p-3" style={{ backgroundColor: "#f8f9fa", borderRadius: "6px" }}>
              <h4>Payment Summary</h4>
              <div className="ihub-d-flex ihub-justify-content-between">
                <span>{selectedProduct.name}</span>
                <span>₦{selectedProduct.price.toLocaleString()}</span>
              </div>
              {includeGatewayFees && (
                <div className="ihub-d-flex ihub-justify-content-between ihub-text-muted">
                  <span>Gateway fees</span>
                  <span>₦{Math.min(selectedProduct.price * 0.015, 2000).toLocaleString()}</span>
                </div>
              )}
              <hr />
              <div className="ihub-d-flex ihub-justify-content-between">
                <strong>Total</strong>
                <strong>₦{calculateTotal().toLocaleString()}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Basic Payment Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Basic Payment Methods</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Simple Payment</h3>
              </div>
              <div className="ihub-card-body">
                <p>Basic payment flow with confirmation dialog and automatic payment processing.</p>
                <button
                  className="ihub-primary-btn ihub-w-100"
                  onClick={handleSimplePayment}
                  disabled={paymentStatus === 0}
                >
                  {paymentStatus === 0 ? "Processing..." : "Pay Now"}
                </button>
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-4">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Direct Charge</h3>
              </div>
              <div className="ihub-card-body">
                <p>Charge saved payment method directly without user interaction.</p>
                <button
                  className="ihub-success-btn ihub-w-100"
                  onClick={handleDirectCharge}
                  disabled={paymentStatus === 0 || !userProfile.savedCards.length}
                >
                  {paymentStatus === 0 ? "Charging..." : "Charge Saved Card"}
                </button>
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-4">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Manual Popup</h3>
              </div>
              <div className="ihub-card-body">
                <p>Directly open Paystack popup for payment processing.</p>
                <button
                  className="ihub-outlined-btn ihub-w-100"
                  onClick={handleManualPaystack}
                  disabled={paymentStatus === 0}
                >
                  {paymentStatus === 0 ? "Loading..." : "Open Paystack"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Payment Scenarios */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Advanced Payment Scenarios</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Subscription Payment</h3>
              </div>
              <div className="ihub-card-body">
                <p>Set up recurring payments for subscription services.</p>
                <div className="ihub-mb-3">
                  <strong>Features:</strong>
                  <ul>
                    <li>Monthly recurring billing</li>
                    <li>Automatic card authorization</li>
                    <li>Subscription management</li>
                    <li>Failed payment handling</li>
                  </ul>
                </div>
                <button
                  className="ihub-gradient-btn ihub-w-100"
                  onClick={handleSubscriptionPayment}
                  disabled={paymentStatus === 0}
                >
                  {paymentStatus === 0 ? "Setting up..." : "Subscribe Monthly"}
                </button>
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Payment with Coupon</h3>
              </div>
              <div className="ihub-card-body">
                <p>Apply discount coupons before payment processing.</p>
                <div className="ihub-mb-3">
                  <strong>Coupon Features:</strong>
                  <ul>
                    <li>Percentage and fixed discounts</li>
                    <li>Validation with API</li>
                    <li>Free course coupons (100% off)</li>
                    <li>Usage limit enforcement</li>
                  </ul>
                </div>
                <button
                  className="ihub-warning-btn ihub-w-100"
                  onClick={handleCouponPayment}
                  disabled={paymentStatus === 0 || !couponCode}
                >
                  {paymentStatus === 0 ? "Applying..." : "Apply Coupon & Pay"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Flow Visualization */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Payment Flow Process</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Step-by-Step Payment Process</h3>
          </div>
          <div className="ihub-card-body">
            <div className="ihub-payment-flow">
              <div className="ihub-flow-step">
                <div className="ihub-flow-number">1</div>
                <div className="ihub-flow-content">
                  <h4>Payment Configuration</h4>
                  <p>Set up payment details, amount, user info, and metadata</p>
                </div>
              </div>
              
              <div className="ihub-flow-arrow">→</div>
              
              <div className="ihub-flow-step">
                <div className="ihub-flow-number">2</div>
                <div className="ihub-flow-content">
                  <h4>Validation & Confirmation</h4>
                  <p>Validate coupon codes, show confirmation dialog if needed</p>
                </div>
              </div>
              
              <div className="ihub-flow-arrow">→</div>
              
              <div className="ihub-flow-step">
                <div className="ihub-flow-number">3</div>
                <div className="ihub-flow-content">
                  <h4>Payment Processing</h4>
                  <p>Execute payment via saved card or new payment method</p>
                </div>
              </div>
              
              <div className="ihub-flow-arrow">→</div>
              
              <div className="ihub-flow-step">
                <div className="ihub-flow-number">4</div>
                <div className="ihub-flow-content">
                  <h4>Success Handling</h4>
                  <p>Process successful payment, update user access, send confirmations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Error Handling Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Error Handling & Edge Cases</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Common Error Scenarios</h3>
              </div>
              <div className="ihub-card-body">
                <ul>
                  <li><strong>Insufficient Funds:</strong> Card declined due to insufficient balance</li>
                  <li><strong>Invalid Card:</strong> Expired or invalid card details</li>
                  <li><strong>Network Issues:</strong> API connection problems</li>
                  <li><strong>Invalid Coupon:</strong> Expired or non-existent coupon codes</li>
                  <li><strong>Duplicate Payment:</strong> Preventing double charges</li>
                </ul>
                
                <div className="ihub-mt-3">
                  <button
                    className="ihub-danger-btn"
                    onClick={() => {
                      openToast("Simulated payment error: Insufficient funds", 400);
                    }}
                  >
                    Simulate Error
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Recovery Mechanisms</h3>
              </div>
              <div className="ihub-card-body">
                <ul>
                  <li><strong>Retry Logic:</strong> Automatic retry for network failures</li>
                  <li><strong>Alternative Methods:</strong> Fallback to different payment options</li>
                  <li><strong>User Feedback:</strong> Clear error messages and next steps</li>
                  <li><strong>Support Integration:</strong> Easy access to customer support</li>
                  <li><strong>Transaction Logging:</strong> Detailed logs for debugging</li>
                </ul>
                
                <div className="ihub-mt-3">
                  <button
                    className="ihub-success-btn"
                    onClick={() => {
                      openToast("Recovery process initiated successfully!");
                    }}
                  >
                    Test Recovery
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Security & Compliance</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Payment Security Features</h3>
          </div>
          <div className="ihub-card-body">
            <div className="ihub-row">
              <div className="ihub-col-md-6">
                <h4>Data Protection</h4>
                <ul>
                  <li><strong>PCI DSS Compliance:</strong> Paystack handles sensitive card data</li>
                  <li><strong>Tokenization:</strong> Card details are never stored locally</li>
                  <li><strong>HTTPS Only:</strong> All communications are encrypted</li>
                  <li><strong>3D Secure:</strong> Additional authentication for high-value transactions</li>
                </ul>
              </div>
              
              <div className="ihub-col-md-6">
                <h4>Fraud Prevention</h4>
                <ul>
                  <li><strong>Risk Scoring:</strong> Automatic fraud detection</li>
                  <li><strong>Velocity Checks:</strong> Monitoring for unusual activity</li>
                  <li><strong>Geolocation:</strong> Location-based risk assessment</li>
                  <li><strong>Device Fingerprinting:</strong> Device-based security</li>
                </ul>
              </div>
            </div>
            
            <div className="ihub-security-badge ihub-mt-4 ihub-text-center">
              <div className="ihub-badge ihub-badge-success ihub-badge-lg">
                ✓ PCI DSS Level 1 Compliant
              </div>
              <div className="ihub-badge ihub-badge-primary ihub-badge-lg">
                ✓ 256-bit SSL Encryption
              </div>
              <div className="ihub-badge ihub-badge-warning ihub-badge-lg">
                ✓ 3D Secure Enabled
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Implementation Guide</h2>
        <div className="ihub-card ihub-p-4">
          <h3>Environment Setup:</h3>
          <pre className="ihub-code-block">
{`// .env.local
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_public_key
NEXT_PUBLIC_PAYSTACK_SECRET_KEY=sk_test_your_secret_key

// Load Paystack script
<script src="https://js.paystack.co/v1/inline.js"></script>`}
          </pre>
          
          <h3 className="ihub-mt-3">Core Functions:</h3>
          <ul>
            <li><code>handlePaymentSubmit()</code> - Main payment orchestration function</li>
            <li><code>paystackDataConfig()</code> - Configure payment data for Paystack</li>
            <li><code>chargeAuthorization()</code> - Charge existing card authorization</li>
            <li><code>payWithPaystack()</code> - Open Paystack popup for new payments</li>
          </ul>
          
          <h3 className="ihub-mt-3">Best Practices:</h3>
          <ul>
            <li>Always validate payment amounts on the server</li>
            <li>Implement proper error handling and user feedback</li>
            <li>Use webhooks for payment confirmation</li>
            <li>Store minimal payment data locally</li>
            <li>Implement idempotency for payment requests</li>
            <li>Log all payment attempts for audit purposes</li>
            <li>Test thoroughly in sandbox environment</li>
          </ul>
          
          <h3 className="ihub-mt-3">Integration Checklist:</h3>
          <div className="ihub-checklist">
            <label className="ihub-checkbox-container">
              <input type="checkbox" defaultChecked />
              <span className="ihub-checkmark"></span>
              Paystack account setup and API keys configured
            </label>
            <label className="ihub-checkbox-container">
              <input type="checkbox" defaultChecked />
              <span className="ihub-checkmark"></span>
              Webhook endpoints implemented for payment confirmation
            </label>
            <label className="ihub-checkbox-container">
              <input type="checkbox" defaultChecked />
              <span className="ihub-checkmark"></span>
              Error handling and user feedback implemented
            </label>
            <label className="ihub-checkbox-container">
              <input type="checkbox" defaultChecked />
              <span className="ihub-checkmark"></span>
              Payment flow tested in sandbox environment
            </label>
            <label className="ihub-checkbox-container">
              <input type="checkbox" />
              <span className="ihub-checkmark"></span>
              Production testing with small amounts
            </label>
            <label className="ihub-checkbox-container">
              <input type="checkbox" />
              <span className="ihub-checkmark"></span>
              Customer support integration for payment issues
            </label>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaystackIntegrationExamples;
```

## 🔗 Related Components

- [SubmitButton](./SubmitButton.md) - Button component with loading states for payment processing
- [InputText](./InputText.md) - Input components for payment forms and user data
- [MultiPurposeModal](./MultiPurposeModal.md) - Modal component for payment confirmations and flows
- [ActionDropdown](./ActionDropdown.md) - Dropdown component for payment method selection
- [CheckBoxes](./CheckBoxes.md) - Checkbox components for payment options and agreements

