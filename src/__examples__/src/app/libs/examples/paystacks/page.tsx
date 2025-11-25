"use client";

import React, { useState, useEffect } from "react";
import MainNavigation from "../../../../components/navbars/MainNavigation";
import {
  handlePaymentSubmit,
  handlePaymentWithoutUserData,
  loadScript,
} from "../../../../../../components/lib/index";
import type { PaystackConfigObjectType } from "../../../../../../types";
import { ContentViewer } from "@/components/ui";

export default function PaystackExamplePage() {
  const [paymentStatus, setPaymentStatus] = useState<number>(1);
  const [lastTransaction, setLastTransaction] = useState<string>("");
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Load Paystack script
    const script = loadScript("https://js.paystack.co/v1/inline.js");
    if (script) {
      script.onload = () => {
        setScriptLoaded(true);
        console.log("Paystack script loaded successfully");
      };
    }
  }, []);

  const handleDBAction = (data?: any) => {
    if (data && data.reference) {
      setLastTransaction(data.reference);
      console.log("Payment successful:", data);
    } else {
      console.log("Payment completed without reference");
    }
  };

  const handleStatusChange = (status: number) => {
    setPaymentStatus(status);
  };

  // Example 1: Payment WITH user data (authenticated user)
  const handlePaymentWithUserData = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!scriptLoaded) {
      alert("Paystack script is still loading. Please wait...");
      return;
    }

    const configObj: PaystackConfigObjectType = {
      email: "user@example.com",
      first_name: "John",
      last_name: "Doe",
      amount: 5000, // ₦50.00
      currency: "NGN",
      content_type: "course",
      object_id: "123",
      metadata: {
        email: "user@example.com",
        channel_username: "test-channel",
      },
    };

    await handlePaymentSubmit({
      objects: {
        title: "Advanced JavaScript Course",
        object_type: "course",
        object_id: "123",
      },
      configObj,
      setStatus: handleStatusChange,
      handleDBAction,
      defaultConfirm: true,
      openConfirm: true,
      label: "Advanced JavaScript Course",
      gatwayCharges: 2.5,
    });
  };

  // Example 2: Payment WITHOUT user data (guest checkout)
  const handleGuestPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!scriptLoaded) {
      alert("Paystack script is still loading. Please wait...");
      return;
    }

    await handlePaymentWithoutUserData({
      amount: 3000, // ₦30.00
      label: "Guest Course Purchase",
      currency: "NGN",
      content_type: "course",
      object_id: "456",
      metadata: {
        email: "",
        channel_username: "guest-channel",
      },
      handleDBAction,
      setStatus: handleStatusChange,
      defaultConfirm: true,
      gatwayCharges: 2.5,
    });
  };

  return (
    <>
      <MainNavigation />
      <main className="ihub-container ihub-mt-10 ihub-mb-5">
        <div className="ihub-max-w-4xl ihub-mx-auto">
          <h1 className="ihub-text-3xl ihub-font-bold ihub-mb-6">
            Paystack Payment Examples
          </h1>

          {!scriptLoaded && (
            <div className="ihub-bg-yellow-100 ihub-border ihub-border-yellow-400 ihub-text-yellow-700 ihub-px-4 ihub-py-3 ihub-rounded ihub-mb-6">
              Loading Paystack SDK...
            </div>
          )}

          {lastTransaction && (
            <div className="ihub-bg-green-100 ihub-border ihub-border-green-400 ihub-text-green-700 ihub-px-4 ihub-py-3 ihub-rounded ihub-mb-6">
              Last transaction reference: <strong>{lastTransaction}</strong>
            </div>
          )}

          {paymentStatus === 0 && (
            <div className="ihub-bg-blue-100 ihub-border ihub-border-blue-400 ihub-text-blue-700 ihub-px-4 ihub-py-3 ihub-rounded ihub-mb-6">
              Processing payment...
            </div>
          )}

          <div className="ihub-grid ihub-grid-cols-1 md:ihub-grid-cols-2 ihub-gap-6">
            {/* Example 1: With User Data */}
            <div className="ihub-border ihub-rounded-lg ihub-p-6 ihub-shadow-md">
              <h2 className="ihub-text-xl ihub-font-semibold ihub-mb-4">
                Payment with User Data
              </h2>
              <p className="ihub-text-gray-600 ihub-mb-4">
                For authenticated users with existing profile information.
              </p>

              <div className="ihub-bg-gray-50 ihub-p-4 ihub-rounded ihub-mb-4">
                <h3 className="ihub-font-semibold ihub-mb-2">
                  Pre-populated Data:
                </h3>
                <ul className="ihub-text-sm ihub-space-y-1">
                  <li>
                    <strong>Email:</strong> user@example.com
                  </li>
                  <li>
                    <strong>Name:</strong> John Doe
                  </li>
                  <li>
                    <strong>Amount:</strong> ₦50.00
                  </li>
                  <li>
                    <strong>Item:</strong> Advanced JavaScript Course
                  </li>
                </ul>
              </div>

              <button
                onClick={handlePaymentWithUserData}
                disabled={!scriptLoaded || paymentStatus === 0}
                className="ihub-important-btn ihub-w-full"
              >
                {paymentStatus === 0 ? "Processing..." : "Pay with User Data"}
              </button>

              <div className="ihub-mt-4 ihub-text-xs ihub-bg-gray-100 ihub-p-3 ihub-rounded">
                <strong>Use Case:</strong> Logged-in users, returning customers,
                subscription renewals
              </div>
            </div>

            {/* Example 2: Without User Data */}
            <div className="ihub-border ihub-rounded-lg ihub-p-6 ihub-shadow-md">
              <h2 className="ihub-text-xl ihub-font-semibold ihub-mb-4">
                Payment without User Data
              </h2>
              <p className="ihub-text-gray-600 ihub-mb-4">
                For guest checkout or anonymous users. Email will be requested
                during payment.
              </p>

              <div className="ihub-bg-gray-50 ihub-p-4 ihub-rounded ihub-mb-4">
                <h3 className="ihub-font-semibold ihub-mb-2">
                  Minimal Configuration:
                </h3>
                <ul className="ihub-text-sm ihub-space-y-1">
                  <li>
                    <strong>Email:</strong> Will be requested
                  </li>
                  <li>
                    <strong>Name:</strong> Guest User
                  </li>
                  <li>
                    <strong>Amount:</strong> ₦30.00
                  </li>
                  <li>
                    <strong>Item:</strong> Guest Course Purchase
                  </li>
                </ul>
              </div>

              <button
                onClick={handleGuestPayment}
                disabled={!scriptLoaded || paymentStatus === 0}
                className="ihub-important-btn ihub-w-full"
              >
                {paymentStatus === 0 ? "Processing..." : "Pay as Guest"}
              </button>

              <div className="ihub-mt-4 ihub-text-xs ihub-bg-gray-100 ihub-p-3 ihub-rounded">
                <strong>Use Case:</strong> Guest checkout, quick purchases,
                donations, non-authenticated flows
              </div>
            </div>
          </div>

          {/* Code Examples Section */}
          <div className="ihub-mt-8">
            <h2 className="ihub-text-2xl ihub-font-bold ihub-mb-4">
              Code Examples
            </h2>

            {/* Example 1 Code */}
            <div className="ihub-mb-6">
              <h3 className="ihub-text-lg ihub-font-semibold ihub-mb-2">
                1. Payment with User Data
              </h3>
              <ContentViewer
                className="ihub-bg-gray-900 ihub-text-white ihub-p-4 ihub-rounded ihub-overflow-x-auto ihub-text-sm"
                content={`<pre>import { handlePaymentSubmit } from "@instincthub/react-ui";

const configObj = {
  email: "user@example.com",
  first_name: "John",
  last_name: "Doe",
  amount: 5000, // ₦50.00
  currency: "NGN",
  content_type: "course",
  object_id: "123",
  metadata: {
    email: "user@example.com",
    channel_username: "test-channel",
  },
};

await handlePaymentSubmit({
  e,
  objects: {
    title: "Advanced JavaScript Course",
    object_type: "course",
    object_id: "123",
  },
  configObj,
  setStatus: (status) => console.log(status),
  handleDBAction: (data) => console.log(data),
  defaultConfirm: true,
  openConfirm: true,
  label: "Advanced JavaScript Course",
  gatwayCharges: 2.5,
});</pre>`}
              />
            </div>

            {/* Example 2 Code */}
            <div className="ihub-mb-6">
              <h3 className="ihub-text-lg ihub-font-semibold ihub-mb-2">
                2. Payment without User Data (Guest Checkout)
              </h3>
              <ContentViewer
                className="ihub-bg-gray-900 ihub-text-white ihub-p-4 ihub-rounded ihub-overflow-x-auto ihub-text-sm"
                content={`<pre>import { handlePaymentWithoutUserData } from "@instincthub/react-ui";

await handlePaymentWithoutUserData({
  e,
  amount: 3000, // ₦30.00
  label: "Guest Course Purchase",
  currency: "NGN",
  content_type: "course",
  object_id: "456",
  metadata: {
    email: "",
    channel_username: "guest-channel",
  },
  handleDBAction: (data) => console.log(data),
  setStatus: (status) => console.log(status),
  defaultConfirm: true,
  gatwayCharges: 2.5,
});</pre>`}
              />
            </div>

            {/* Setup Instructions */}
            <div className="ihub-bg-yellow-50 ihub-border ihub-border-yellow-200 ihub-p-4 ihub-rounded">
              <h3 className="ihub-text-lg ihub-font-semibold ihub-mb-2">
                Setup Requirements
              </h3>
              <ol className="ihub-list-decimal ihub-list-inside ihub-space-y-2 ihub-text-sm">
                <li>
                  Add Paystack keys to your <code>.env.local</code> file:
                  <ContentViewer
                    className="ihub-bg-white ihub-p-2 ihub-rounded ihub-mt-2"
                    content={`<pre>{NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_...
NEXT_PUBLIC_PAYSTACK_SECRET_KEY=sk_test_...}
                      </pre>`}
                  />
                </li>
                <li>
                  Load Paystack script in your component:
                  <ContentViewer
                    className="ihub-bg-white ihub-p-2 ihub-rounded ihub-mt-2"
                    content={`<pre>import { loadScript } from "@instincthub/react-ui";

useEffect(() => {
  const script = loadScript("https://js.paystack.co/v1/inline.js");
  if (script) {
    script.onload = () => console.log("Paystack loaded");
  }
}, []);}
                  </pre>`}
                  />
                </li>
                <li>
                  Use Paystack test cards for testing (e.g., 4084084084084081)
                </li>
              </ol>
            </div>
          </div>

          {/* Key Differences Section */}
          <div className="ihub-mt-8">
            <h2 className="ihub-text-2xl ihub-font-bold ihub-mb-4">
              Key Differences
            </h2>
            <div className="ihub-overflow-x-auto">
              <table className="ihub-w-full ihub-border-collapse ihub-border ihub-border-gray-300">
                <thead>
                  <tr className="ihub-bg-gray-100">
                    <th className="ihub-border ihub-border-gray-300 ihub-p-3 ihub-text-left">
                      Feature
                    </th>
                    <th className="ihub-border ihub-border-gray-300 ihub-p-3 ihub-text-left">
                      With User Data
                    </th>
                    <th className="ihub-border ihub-border-gray-300 ihub-p-3 ihub-text-left">
                      Without User Data
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="ihub-border ihub-border-gray-300 ihub-p-3">
                      User Authentication
                    </td>
                    <td className="ihub-border ihub-border-gray-300 ihub-p-3">
                      Required
                    </td>
                    <td className="ihub-border ihub-border-gray-300 ihub-p-3">
                      Not required
                    </td>
                  </tr>
                  <tr>
                    <td className="ihub-border ihub-border-gray-300 ihub-p-3">
                      Email Collection
                    </td>
                    <td className="ihub-border ihub-border-gray-300 ihub-p-3">
                      Pre-populated
                    </td>
                    <td className="ihub-border ihub-border-gray-300 ihub-p-3">
                      Requested via modal
                    </td>
                  </tr>
                  <tr>
                    <td className="ihub-border ihub-border-gray-300 ihub-p-3">
                      User Name
                    </td>
                    <td className="ihub-border ihub-border-gray-300 ihub-p-3">
                      From user profile
                    </td>
                    <td className="ihub-border ihub-border-gray-300 ihub-p-3">
                      &quot;Guest User&quot;
                    </td>
                  </tr>
                  <tr>
                    <td className="ihub-border ihub-border-gray-300 ihub-p-3">
                      Saved Payment Methods
                    </td>
                    <td className="ihub-border ihub-border-gray-300 ihub-p-3">
                      Can use existing cards
                    </td>
                    <td className="ihub-border ihub-border-gray-300 ihub-p-3">
                      Always new card
                    </td>
                  </tr>
                  <tr>
                    <td className="ihub-border ihub-border-gray-300 ihub-p-3">
                      Function
                    </td>
                    <td className="ihub-border ihub-border-gray-300 ihub-p-3">
                      <code>handlePaymentSubmit()</code>
                    </td>
                    <td className="ihub-border ihub-border-gray-300 ihub-p-3">
                      <code>handlePaymentWithoutUserData()</code>
                    </td>
                  </tr>
                  <tr>
                    <td className="ihub-border ihub-border-gray-300 ihub-p-3">
                      Best For
                    </td>
                    <td className="ihub-border ihub-border-gray-300 ihub-p-3">
                      Subscriptions, Member purchases
                    </td>
                    <td className="ihub-border ihub-border-gray-300 ihub-p-3">
                      Quick checkout, Donations
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
