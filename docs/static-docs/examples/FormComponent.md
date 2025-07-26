# Example of form component

```tsx
"use client";

import { useState } from "react";
import {
  InputText,
  InputNumber,
  Dropdown,
  ToggleButton,
  SubmitButton,
  Tabs,
  InputAmount,
} from "@instincthub/react-ui";
import {
  PaymentSettingsType,
  PaymentGatewaySettingType,
} from "@/types/finance/settings";
import { API_HOST_URL, reqOptions } from "@instincthub/react-ui/lib";

interface PaymentSettingsProps {
  handle: string;
  token: string | null;
  settings: PaymentSettingsType;
  setSettings: React.Dispatch<React.SetStateAction<PaymentSettingsType>>;
  paymentGateway: PaymentGatewaySettingType;
}

export function PaymentSettings({
  handle,
  token,
  paymentGateway,
  settings,
  setSettings,
}: PaymentSettingsProps) {
  const [gatewaySettings, setGatewaySettings] =
    useState<PaymentGatewaySettingType>(paymentGateway);
  const [status, setStatus] = useState<number | undefined>(undefined);
  const [message, setMessage] = useState<string>("");

  const handleSaveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(0);
    setMessage("");

    try {
      // Check if the form is the gateway form
      const isGatewayForm = e.currentTarget.id === "id_gateway_settings";
      console.log(isGatewayForm, e.currentTarget.id);

      // Get the form data
      const formData = new FormData(e.currentTarget);
      const options = reqOptions("PATCH", formData, token);

      // If the form is the gateway form, use the payment-gateway endpoint
      // Otherwise, use the payments endpoint
      const url = `${API_HOST_URL}sis/${handle}/finance/settings/${
        isGatewayForm ? "payment-gateway" : "payments"
      }/`;

      // Send the request to the API
      const response = await fetch(url, options);

      if (response.ok) {
        setStatus(1);
        setMessage("Payment settings saved successfully!");

        // Update the settings state with the new data
        const data = await response.json();
        if (isGatewayForm) {
          setGatewaySettings(data);
        } else {
          setSettings(data);
        }
      } else {
        setMessage("Failed to save payment settings");
      }
    } catch (error) {
      setMessage(`${error}`);
    } finally {
      setStatus(1);
    }
  };

  const paymentMethodOptions = [
    { label: "Cash", value: "cash" },
    { label: "Bank Transfer", value: "bank_transfer" },
    { label: "Credit Card", value: "credit_card" },
    { label: "Mobile Money", value: "mobile_money" },
    { label: "Cheque", value: "cheque" },
  ];

  const feeTypeOptions = [
    { label: "Fixed Amount", value: "fixed" },
    { label: "Percentage", value: "percentage" },
  ];

  const paymentGatewayOptions = [
    { label: "Paystack", value: "paystack" },
    { label: "Flutterwave", value: "flutterwave" },
    { label: "Stripe", value: "stripe" },
    { label: "PayPal", value: "paypal" },
  ];

  const generalTabContent = (
    <form
      className="ihub-space-y-6"
      onSubmit={handleSaveSettings}
      id="id_general_settings"
    >
      <div className="ihub-space-y-4">
        <Dropdown
          id="id_default_payment_method"
          name="default_payment_method"
          label="Default Payment Method"
          selectedValue={settings.default_payment_method}
          options={paymentMethodOptions}
          className="ihub-mb-3"
        />
        <div className="ihub-flex ihub-items-center ihub-justify-between ihub-mb-3">
          <div className="ihub-space-y-0.5">
            <label htmlFor="online-payments" className="ihub-label">
              Online Payments
            </label>
            <p className="ihub-text-sm ihub-text-muted">
              Allow students to make payments online
            </p>
          </div>
          <ToggleButton
            id="id_enable_online_payments"
            name="enable_online_payments"
            label="Enable"
            labelPosition="left"
            initialState={settings.enable_online_payments}
          />
        </div>
      </div>

      <SubmitButton label="Save General Settings" status={status} />

      {message && (
        <div
          className={`ihub-message ${
            status === 1 ? "ihub-success" : "ihub-error"
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );

  const feesTabContent = (
    <form
      className="ihub-space-y-6"
      onSubmit={handleSaveSettings}
      id="id_late_payment_fee_settings"
    >
      <div className="ihub-space-y-4">
        <div className="ihub-grid ihub-gap-4 ihub-md-grid-cols-2">
          <div className="ihub-space-y-2">
            <Dropdown
              id="id_late_payment_fee_type"
              name="late_payment_fee_type"
              label="Fee Type"
              selectedValue={settings.late_payment_fee_type}
              options={feeTypeOptions}
            />
          </div>
          <div className="ihub-space-y-2 ihub-mb-4">
            <InputText
              id="id_secret_key"
              name="secret_key"
              label="Secret Key"
              type="password"
              value={gatewaySettings?.secret_key}
            />
            {settings.late_payment_fee_type === "percentage" ? (
              <InputNumber
                id="late-payment-fee"
                name="late_payment_fee"
                label="Enter Late Payment Rate"
                note="Enter the percentage of the late payment fee"
                min={0}
                max={50}
                defaultValue={Number(settings.late_payment_fee) || undefined}
              />
            ) : (
              <InputAmount
                id="late-payment-fee"
                name="late_payment_fee"
                label="Enter Fixed Late Payment Fee"
                value={settings.late_payment_fee}
              />
            )}
          </div>
        </div>
      </div>

      <SubmitButton
        label="Save Fee Settings"
        status={status}
        name="save_fee_settings"
      />

      {message && (
        <div
          className={`ihub-message ${
            status === 1 ? "ihub-success" : "ihub-error"
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );

  const tabItems = [
    {
      id: "general",
      label: "General",
      content: generalTabContent,
    },
    {
      id: "fees",
      label: "Late Fees",
      content: feesTabContent,
    },
  ];

  return (
    <div className="ihub-card">
      <div>
        <p className="ihub-text-muted">Configure payment processing settings</p>
      </div>
      <div className="ihub-card-content">
        <Tabs items={tabItems} defaultActiveTab="general" variant="pills" />
      </div>
    </div>
  );
}
```
