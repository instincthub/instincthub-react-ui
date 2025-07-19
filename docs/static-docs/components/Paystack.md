# Paystack

A comprehensive payment processing utility library that integrates with Paystack's payment gateway. This library provides functions for handling payments, charging existing authorizations, coupon validation, and complete payment workflows with error handling and user interactions.

## Features

- **Multiple Payment Methods**: Support for new cards and saved payment methods
- **Authorization Management**: Charge existing saved cards
- **Coupon System**: Validate and apply discount coupons
- **Fee Calculation**: Automatic gateway fee calculation with caps
- **Email Collection**: Modal prompts for email when needed
- **Confirmation Dialogs**: User-friendly payment confirmations
- **Error Handling**: Comprehensive error management and user feedback
- **Toast Notifications**: Real-time payment status updates

## Core Functions

### paystackDataConfig

Configures Paystack payment data for processing.

```tsx
interface PaystackConfigObjectType {
  authorization_code?: string;
  email: string;
  first_name: string;
  last_name: string;
  amount: number;
  currency?: string;
  metadata?: any;
  content_type?: string;
  object_id?: string;
}

const config = paystackDataConfig({
  email: "user@example.com",
  first_name: "John",
  last_name: "Doe",
  amount: 1000, // Amount in naira
  currency: "NGN"
});
```

### chargeAuthorization

Charges a customer using an existing authorization code.

```tsx
const result = await chargeAuthorization(paystackConfig);
if (result.status === "success") {
  console.log("Payment successful");
}
```

### payWithPaystack

Initiates payment with Paystack popup interface.

```tsx
const response = await payWithPaystack(paystackConfig);
console.log("Payment reference:", response.reference);
```

### handlePaymentSubmit

Main function that orchestrates the complete payment workflow.

```tsx
await handlePaymentSubmit({
  objects: {
    object_id: "123",
    object_type: "course"
  },
  configObj: {
    email: "user@example.com",
    first_name: "John",
    last_name: "Doe",
    amount: 5000
  },
  handleDBAction: (paymentData) => {
    console.log("Payment completed:", paymentData);
  },
  setStatus: (status) => {
    console.log("Payment status:", status);
  }
});
```

## Basic Usage

```tsx
"use client";

import React, { useState } from 'react';
import { handlePaymentSubmit } from 'instincthub-react-ui';

export default function BasicPaymentExample() {
  const [paymentStatus, setPaymentStatus] = useState<number>(1);
  const [paymentResult, setPaymentResult] = useState<any>(null);

  const handleCoursePayment = async () => {
    try {
      await handlePaymentSubmit({
        objects: {
          object_id: "course_123",
          object_type: "course",
          title: "React Advanced Course"
        },
        configObj: {
          email: "student@example.com",
          first_name: "John",
          last_name: "Smith",
          amount: 15000, // ₦150 in kobo
          currency: "NGN",
          metadata: {
            course_id: "course_123",
            student_id: "student_456"
          }
        },
        handleDBAction: (result) => {
          setPaymentResult(result);
          console.log("Enrollment successful:", result);
        },
        setStatus: setPaymentStatus,
        label: "React Advanced Course",
        defaultConfirm: true,
        openConfirm: true
      });
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Course Enrollment</h2>
      
      <div style={{ 
        border: '1px solid #e1e1e1', 
        borderRadius: '8px', 
        padding: '16px',
        marginBottom: '20px'
      }}>
        <h3>React Advanced Course</h3>
        <p>Master advanced React concepts and patterns</p>
        <p><strong>Price: ₦150</strong></p>
      </div>

      <button
        onClick={handleCoursePayment}
        disabled={paymentStatus === 0}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: paymentStatus === 0 ? '#9ca3af' : '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: paymentStatus === 0 ? 'not-allowed' : 'pointer'
        }}
      >
        {paymentStatus === 0 ? 'Processing...' : 'Enroll Now - ₦150'}
      </button>

      {paymentResult && (
        <div style={{
          marginTop: '20px',
          padding: '12px',
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '6px',
          color: '#059669'
        }}>
          ✅ Payment successful! Reference: {paymentResult.reference}
        </div>
      )}
    </div>
  );
}
```

## Advanced Usage

### E-commerce Checkout

```tsx
"use client";

import React, { useState } from 'react';
import { handlePaymentSubmit } from 'instincthub-react-ui';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function EcommerceCheckout() {
  const [cart, setCart] = useState<CartItem[]>([
    { id: '1', name: 'React Course', price: 15000, quantity: 1 },
    { id: '2', name: 'Node.js Course', price: 20000, quantity: 1 }
  ]);

  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    firstName: '',
    lastName: ''
  });

  const [paymentStatus, setPaymentStatus] = useState<number>(1);
  const [couponCode, setCouponCode] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 2000; // ₦20 shipping
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (!customerInfo.email || !customerInfo.firstName || !customerInfo.lastName) {
      alert('Please fill in all customer information');
      return;
    }

    try {
      await handlePaymentSubmit({
        objects: {
          object_id: `order_${Date.now()}`,
          object_type: "order",
          title: `Order (${cart.length} items)`
        },
        configObj: {
          email: customerInfo.email,
          first_name: customerInfo.firstName,
          last_name: customerInfo.lastName,
          amount: total,
          currency: "NGN",
          metadata: {
            cart_items: cart,
            shipping_fee: shipping,
            subtotal: subtotal,
            order_type: "ecommerce"
          }
        },
        coupon: couponCode || undefined,
        gatwayCharges: 1.5, // 1.5% gateway fee
        handleDBAction: (result) => {
          console.log("Order completed:", result);
          // Clear cart after successful payment
          setCart([]);
        },
        setStatus: setPaymentStatus,
        label: "Your Order",
        defaultConfirm: true,
        openConfirm: true,
        defaultMsg: `Complete your order of ${cart.length} items for ₦${(total / 100).toFixed(2)}?`
      });
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(prev => prev.filter(item => item.id !== id));
    } else {
      setCart(prev => prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Checkout</h1>

      {/* Customer Information */}
      <div style={{ marginBottom: '24px' }}>
        <h3>Customer Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          <input
            type="text"
            placeholder="First Name"
            value={customerInfo.firstName}
            onChange={(e) => setCustomerInfo(prev => ({ ...prev, firstName: e.target.value }))}
            style={{
              padding: '10px',
              border: '1px solid #e1e1e1',
              borderRadius: '4px'
            }}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={customerInfo.lastName}
            onChange={(e) => setCustomerInfo(prev => ({ ...prev, lastName: e.target.value }))}
            style={{
              padding: '10px',
              border: '1px solid #e1e1e1',
              borderRadius: '4px'
            }}
          />
        </div>
        <input
          type="email"
          placeholder="Email Address"
          value={customerInfo.email}
          onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #e1e1e1',
            borderRadius: '4px'
          }}
        />
      </div>

      {/* Cart Items */}
      <div style={{ marginBottom: '24px' }}>
        <h3>Order Summary</h3>
        <div style={{ border: '1px solid #e1e1e1', borderRadius: '8px', overflow: 'hidden' }}>
          {cart.map(item => (
            <div key={item.id} style={{ 
              padding: '16px', 
              borderBottom: '1px solid #e1e1e1',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                <div style={{ color: '#6b7280' }}>₦{(item.price / 100).toFixed(2)} each</div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{
                      width: '24px',
                      height: '24px',
                      border: '1px solid #e1e1e1',
                      borderRadius: '4px',
                      backgroundColor: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{
                      width: '24px',
                      height: '24px',
                      border: '1px solid #e1e1e1',
                      borderRadius: '4px',
                      backgroundColor: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    +
                  </button>
                </div>
                
                <div style={{ fontWeight: 'bold', width: '80px', textAlign: 'right' }}>
                  ₦{((item.price * item.quantity) / 100).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coupon Code */}
      <div style={{ marginBottom: '24px' }}>
        <h3>Coupon Code</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #e1e1e1',
              borderRadius: '4px'
            }}
          />
          <button
            style={{
              padding: '10px 16px',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Apply
          </button>
        </div>
      </div>

      {/* Order Total */}
      <div style={{ 
        marginBottom: '24px',
        padding: '16px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Subtotal:</span>
          <span>₦{(subtotal / 100).toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Shipping:</span>
          <span>₦{(shipping / 100).toFixed(2)}</span>
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          fontWeight: 'bold',
          fontSize: '18px',
          borderTop: '1px solid #e1e1e1',
          paddingTop: '8px'
        }}>
          <span>Total:</span>
          <span>₦{(total / 100).toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        disabled={paymentStatus === 0 || cart.length === 0}
        style={{
          width: '100%',
          padding: '16px',
          backgroundColor: (paymentStatus === 0 || cart.length === 0) ? '#9ca3af' : '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: (paymentStatus === 0 || cart.length === 0) ? 'not-allowed' : 'pointer'
        }}
      >
        {paymentStatus === 0 ? 'Processing Payment...' : 
         cart.length === 0 ? 'Cart is Empty' :
         `Complete Order - ₦${(total / 100).toFixed(2)}`}
      </button>
    </div>
  );
}
```

### Subscription Payment System

```tsx
"use client";

import React, { useState } from 'react';
import { handlePaymentSubmit } from 'instincthub-react-ui';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
}

export default function SubscriptionPayment() {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<number>(1);
  const [billingInfo, setBillingInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    autoRenew: true
  });

  const plans: SubscriptionPlan[] = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 5000, // ₦50/month
      duration: 'Monthly',
      features: ['5 Course Access', 'Basic Support', 'Certificate']
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      price: 15000, // ₦150/month
      duration: 'Monthly',
      features: ['Unlimited Courses', 'Priority Support', 'All Certificates', '1-on-1 Sessions'],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      price: 50000, // ₦500/month
      duration: 'Monthly',
      features: ['Everything in Pro', 'Custom Learning Paths', 'Team Management', 'API Access']
    }
  ];

  const handleSubscribe = async () => {
    if (!selectedPlan || !billingInfo.email || !billingInfo.firstName || !billingInfo.lastName) {
      alert('Please select a plan and fill in all billing information');
      return;
    }

    try {
      await handlePaymentSubmit({
        objects: {
          object_id: selectedPlan.id,
          object_type: "subscription",
          title: selectedPlan.name
        },
        configObj: {
          email: billingInfo.email,
          first_name: billingInfo.firstName,
          last_name: billingInfo.lastName,
          amount: selectedPlan.price,
          currency: "NGN",
          metadata: {
            plan_id: selectedPlan.id,
            plan_name: selectedPlan.name,
            duration: selectedPlan.duration,
            auto_renew: billingInfo.autoRenew,
            subscription_type: "monthly"
          }
        },
        handleDBAction: (result) => {
          console.log("Subscription activated:", result);
        },
        setStatus: setPaymentStatus,
        label: selectedPlan.name,
        defaultConfirm: true,
        openConfirm: true,
        defaultMsg: `Subscribe to ${selectedPlan.name} for ₦${(selectedPlan.price / 100).toFixed(2)}/month?`
      });
    } catch (error) {
      console.error("Subscription failed:", error);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h1>Choose Your Plan</h1>
      
      {/* Plan Selection */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '20px',
        marginBottom: '40px'
      }}>
        {plans.map(plan => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan)}
            style={{
              border: selectedPlan?.id === plan.id ? '2px solid #3b82f6' : '1px solid #e1e1e1',
              borderRadius: '12px',
              padding: '24px',
              cursor: 'pointer',
              position: 'relative',
              backgroundColor: selectedPlan?.id === plan.id ? '#f0f9ff' : 'white'
            }}
          >
            {plan.popular && (
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#f59e0b',
                color: 'white',
                padding: '4px 16px',
                borderRadius: '16px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                POPULAR
              </div>
            )}
            
            <h3 style={{ marginTop: plan.popular ? '16px' : '0' }}>{plan.name}</h3>
            <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
              ₦{(plan.price / 100).toFixed(0)}
            </div>
            <div style={{ color: '#6b7280', marginBottom: '20px' }}>
              per {plan.duration.toLowerCase()}
            </div>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {plan.features.map((feature, index) => (
                <li key={index} style={{ 
                  padding: '8px 0',
                  borderBottom: '1px solid #f1f1f1',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ color: '#10b981' }}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            
            {selectedPlan?.id === plan.id && (
              <div style={{
                marginTop: '16px',
                padding: '8px',
                backgroundColor: '#3b82f6',
                color: 'white',
                textAlign: 'center',
                borderRadius: '6px',
                fontWeight: 'bold'
              }}>
                Selected
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Billing Information */}
      {selectedPlan && (
        <div style={{ 
          border: '1px solid #e1e1e1', 
          borderRadius: '8px', 
          padding: '24px',
          marginBottom: '24px'
        }}>
          <h3>Billing Information</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="First Name"
              value={billingInfo.firstName}
              onChange={(e) => setBillingInfo(prev => ({ ...prev, firstName: e.target.value }))}
              style={{
                padding: '12px',
                border: '1px solid #e1e1e1',
                borderRadius: '6px',
                fontSize: '16px'
              }}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={billingInfo.lastName}
              onChange={(e) => setBillingInfo(prev => ({ ...prev, lastName: e.target.value }))}
              style={{
                padding: '12px',
                border: '1px solid #e1e1e1',
                borderRadius: '6px',
                fontSize: '16px'
              }}
            />
          </div>
          
          <input
            type="email"
            placeholder="Email Address"
            value={billingInfo.email}
            onChange={(e) => setBillingInfo(prev => ({ ...prev, email: e.target.value }))}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #e1e1e1',
              borderRadius: '6px',
              fontSize: '16px',
              marginBottom: '16px'
            }}
          />
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={billingInfo.autoRenew}
              onChange={(e) => setBillingInfo(prev => ({ ...prev, autoRenew: e.target.checked }))}
            />
            Auto-renew subscription monthly
          </label>
        </div>
      )}

      {/* Subscribe Button */}
      {selectedPlan && (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleSubscribe}
            disabled={paymentStatus === 0}
            style={{
              padding: '16px 32px',
              backgroundColor: paymentStatus === 0 ? '#9ca3af' : '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: paymentStatus === 0 ? 'not-allowed' : 'pointer',
              minWidth: '200px'
            }}
          >
            {paymentStatus === 0 ? 'Processing...' : `Subscribe Now - ₦${(selectedPlan.price / 100).toFixed(2)}/month`}
          </button>
          
          <p style={{ marginTop: '12px', color: '#6b7280', fontSize: '14px' }}>
            You can cancel anytime. No long-term commitments.
          </p>
        </div>
      )}
    </div>
  );
}
```

## Error Handling

### Payment Error Management

```tsx
"use client";

import React, { useState } from 'react';
import { handlePaymentSubmit } from 'instincthub-react-ui';

export default function PaymentErrorHandling() {
  const [paymentStatus, setPaymentStatus] = useState<number>(1);
  const [errorLogs, setErrorLogs] = useState<string[]>([]);
  
  const addLog = (message: string) => {
    setErrorLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const simulateNetworkError = async () => {
    addLog("Attempting payment with network error simulation");
    
    try {
      await handlePaymentSubmit({
        objects: {
          object_id: "test_network_error",
          object_type: "test"
        },
        configObj: {
          email: "test@example.com",
          first_name: "Test",
          last_name: "User",
          amount: 1000,
          // Simulate network error by using invalid endpoint
          metadata: { test_type: "network_error" }
        },
        handleDBAction: (result) => {
          addLog(`Unexpected success: ${JSON.stringify(result)}`);
        },
        setStatus: setPaymentStatus,
        label: "Network Error Test"
      });
    } catch (error) {
      addLog(`Network error caught: ${error}`);
    }
  };

  const simulateInvalidCard = async () => {
    addLog("Attempting payment with invalid card simulation");
    
    try {
      await handlePaymentSubmit({
        objects: {
          object_id: "test_invalid_card",
          object_type: "test"
        },
        configObj: {
          email: "test@example.com",
          first_name: "Test",
          last_name: "User",
          amount: 1000,
          authorization_code: "invalid_auth_code"
        },
        handleDBAction: (result) => {
          if (result.status === "failed") {
            addLog(`Card declined: ${result.gateway_response || "Invalid card"}`);
          } else {
            addLog(`Payment result: ${JSON.stringify(result)}`);
          }
        },
        setStatus: setPaymentStatus,
        label: "Invalid Card Test"
      });
    } catch (error) {
      addLog(`Card error: ${error}`);
    }
  };

  const simulateSuccessfulPayment = async () => {
    addLog("Processing successful payment");
    
    try {
      await handlePaymentSubmit({
        objects: {
          object_id: "test_success",
          object_type: "test"
        },
        configObj: {
          email: "success@example.com",
          first_name: "Success",
          last_name: "User",
          amount: 1000
        },
        handleDBAction: (result) => {
          addLog(`Payment successful: Reference ${result.reference}`);
        },
        setStatus: setPaymentStatus,
        label: "Success Test",
        defaultConfirm: false // Skip confirmation for demo
      });
    } catch (error) {
      addLog(`Unexpected error: ${error}`);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Payment Error Handling Demo</h1>
      
      <div style={{ marginBottom: '24px' }}>
        <h3>Test Scenarios:</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            onClick={simulateSuccessfulPayment}
            disabled={paymentStatus === 0}
            style={{
              padding: '12px',
              backgroundColor: paymentStatus === 0 ? '#9ca3af' : '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: paymentStatus === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            ✅ Simulate Successful Payment
          </button>
          
          <button
            onClick={simulateInvalidCard}
            disabled={paymentStatus === 0}
            style={{
              padding: '12px',
              backgroundColor: paymentStatus === 0 ? '#9ca3af' : '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: paymentStatus === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            ⚠️ Simulate Card Declined
          </button>
          
          <button
            onClick={simulateNetworkError}
            disabled={paymentStatus === 0}
            style={{
              padding: '12px',
              backgroundColor: paymentStatus === 0 ? '#9ca3af' : '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: paymentStatus === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            ❌ Simulate Network Error
          </button>
        </div>
      </div>

      {/* Payment Status */}
      <div style={{ 
        marginBottom: '24px',
        padding: '16px',
        backgroundColor: paymentStatus === 0 ? '#fef3c7' : '#f0fdf4',
        borderRadius: '8px',
        border: `1px solid ${paymentStatus === 0 ? '#fbbf24' : '#bbf7d0'}`
      }}>
        <h3>Payment Status:</h3>
        <p style={{ margin: 0, fontWeight: 'bold' }}>
          {paymentStatus === 0 ? '🔄 Processing...' : '✅ Ready'}
        </p>
      </div>

      {/* Error Logs */}
      {errorLogs.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3>Event Log:</h3>
            <button
              onClick={() => setErrorLogs([])}
              style={{
                padding: '4px 8px',
                fontSize: '12px',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Clear Log
            </button>
          </div>
          
          <div style={{
            border: '1px solid #e1e1e1',
            borderRadius: '6px',
            padding: '12px',
            backgroundColor: '#f8f9fa',
            maxHeight: '300px',
            overflowY: 'auto',
            fontFamily: 'monospace',
            fontSize: '14px'
          }}>
            {errorLogs.map((log, index) => (
              <div key={index} style={{ marginBottom: '4px' }}>
                {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error Handling Tips */}
      <div style={{
        padding: '16px',
        backgroundColor: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderRadius: '8px'
      }}>
        <h3 style={{ color: '#1d4ed8' }}>Error Handling Best Practices:</h3>
        <ul style={{ color: '#1d4ed8', margin: 0 }}>
          <li>Always provide clear error messages to users</li>
          <li>Log payment errors for debugging</li>
          <li>Implement retry mechanisms for network errors</li>
          <li>Validate payment data before submission</li>
          <li>Handle timeout scenarios gracefully</li>
          <li>Provide alternative payment methods</li>
        </ul>
      </div>
    </div>
  );
}
```

## Testing Examples

### Unit Tests

```tsx
// __tests__/paystack.test.ts
import { 
  paystackDataConfig, 
  chargeAuthorization, 
  payWithPaystack 
} from 'instincthub-react-ui';

// Mock Paystack environment variables
process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY = 'pk_test_123';
process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY = 'sk_test_123';

// Mock window.PaystackPop
global.window = {
  ...global.window,
  PaystackPop: {
    setup: jest.fn().mockReturnValue({
      openIframe: jest.fn()
    })
  },
  location: {
    href: 'https://example.com'
  }
} as any;

// Mock fetch
global.fetch = jest.fn();

describe('Paystack Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('paystackDataConfig', () => {
    test('configures payment data correctly', () => {
      const config = paystackDataConfig({
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe',
        amount: 1000,
        currency: 'NGN'
      });

      expect(config).toEqual({
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe',
        amount: 100000, // Converted to kobo
        currency: 'NGN',
        publicKey: 'pk_test_123',
        key: 'pk_test_123',
        callback_url: 'https://example.com',
        reference: expect.any(String)
      });
    });

    test('uses default currency when not provided', () => {
      const config = paystackDataConfig({
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe',
        amount: 1000
      });

      expect(config.currency).toBe('NGN');
    });
  });

  describe('chargeAuthorization', () => {
    test('handles successful charge', async () => {
      const mockResponse = {
        data: {
          status: 'success',
          reference: 'ref_123'
        }
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const config = paystackDataConfig({
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe',
        amount: 1000,
        authorization_code: 'auth_123'
      });

      const result = await chargeAuthorization(config);

      expect(fetch).toHaveBeenCalledWith(
        'https://api.paystack.co/transaction/charge_authorization',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            Authorization: 'Bearer sk_test_123'
          })
        })
      );

      expect(result).toEqual(mockResponse.data);
    });

    test('handles failed charge', async () => {
      const mockResponse = {
        data: {
          status: 'failed',
          reference: 'ref_123'
        }
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const config = paystackDataConfig({
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe',
        amount: 1000,
        authorization_code: 'auth_123'
      });

      const result = await chargeAuthorization(config);

      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('payWithPaystack', () => {
    test('initializes Paystack popup correctly', async () => {
      const config = paystackDataConfig({
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe',
        amount: 1000
      });

      const mockSetup = window.PaystackPop.setup as jest.Mock;
      const mockOpenIframe = jest.fn();
      mockSetup.mockReturnValue({ openIframe: mockOpenIframe });

      // Start the payment process
      const paymentPromise = payWithPaystack(config);
      
      // Simulate successful callback
      const setupCall = mockSetup.mock.calls[0][0];
      setupCall.callback({ reference: 'ref_123', status: 'success' });

      const result = await paymentPromise;

      expect(mockSetup).toHaveBeenCalledWith(
        expect.objectContaining({
          ...config,
          callback: expect.any(Function),
          onClose: expect.any(Function)
        })
      );

      expect(mockOpenIframe).toHaveBeenCalled();
      expect(result).toEqual({ reference: 'ref_123', status: 'success' });
    });

    test('handles popup close', async () => {
      const config = paystackDataConfig({
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe',
        amount: 1000
      });

      const mockSetup = window.PaystackPop.setup as jest.Mock;
      mockSetup.mockReturnValue({ openIframe: jest.fn() });

      // Start the payment process
      const paymentPromise = payWithPaystack(config);
      
      // Simulate popup close
      const setupCall = mockSetup.mock.calls[0][0];
      setupCall.onClose();

      const result = await paymentPromise;

      expect(result).toEqual({
        status: 'canceled',
        cancelled: true,
        reference: config.reference
      });
    });
  });
});
```

## Environment Setup

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_public_key
NEXT_PUBLIC_PAYSTACK_SECRET_KEY=sk_test_your_secret_key

# For production
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_your_public_key
NEXT_PUBLIC_PAYSTACK_SECRET_KEY=sk_live_your_secret_key
```

### Paystack Script Integration

```tsx
// pages/_document.tsx or app/layout.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <script src="https://js.paystack.co/v1/inline.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

## Configuration

### Payment Flow Configuration

```tsx
interface PaymentContextType {
  e?: Event;
  objects: {
    title?: string;
    object_type?: string | number;
    object_id?: string | number;
  };
  configObj: PaystackConfigObjectType;
  paymentMethod?: any;
  setStatus: (status: number) => void;
  handleDBAction: (data?: any) => void;
  defaultConfirm?: boolean;
  label: string;
  coupon?: string;
  defaultMsg?: string;
  gatwayCharges?: number;
  openConfirm?: boolean;
}
```

## Related Components

- [Dialog](./Dialog.md) - Modal dialogs for payment confirmations
- [TextField](./TextField.md) - Input fields for payment forms
- [SubmitButton](./SubmitButton.md) - Payment submission buttons
- [Toast](./Toast.md) - Payment status notifications
- [LoadingAnimate](./LoadingAnimate.md) - Payment processing indicators

## Notes

- Requires Paystack script to be loaded on the page
- All amounts are processed in kobo (smallest currency unit)
- Environment variables must be properly configured
- Gateway charges are automatically calculated with ₦2000 cap for local transactions
- Coupon validation requires proper API endpoints
- Email collection modal appears when email is not provided
- The library handles both one-time and recurring payments
- All payment responses include reference numbers for tracking
- Network errors are gracefully handled with user-friendly messages

