"use client";

import React, { useEffect, useState } from "react";
import {
  PhoneNumberInput,
  PhoneNumberValueType,
  SubmitButton,
} from "../../../../index";

const PhoneNumberInputExample: React.FC = () => {
  // The value shape the component emits — store `e164` (or phone_code +
  // mobile) in your database.
  const [basic, setBasic] = useState<PhoneNumberValueType | null>(null);
  const [preferred, setPreferred] = useState<PhoneNumberValueType | null>(null);

  // Legacy `inputEvent` API: the dial code arrives as `phone_code`.
  const [formData, setFormData] = useState<Record<string, string>>({
    mobile: "",
    phone_code: "",
  });
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Simulates a record loaded from an API after first paint.
  const [loaded, setLoaded] = useState<{ mobile?: string }>({});
  useEffect(() => {
    const timer = setTimeout(
      () => setLoaded({ mobile: "+447911123456" }),
      1200
    );
    return () => clearTimeout(timer);
  }, []);

  const [submitStatus, setSubmitStatus] = useState(1);
  const [submitted, setSubmitted] = useState<Record<string, any> | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus(2);

    // Everything the API needs, including the country code.
    const payload = {
      phone_code: basic?.phoneCode ?? "",
      mobile: basic?.nationalNumber ?? "",
      phone_e164: basic?.e164 ?? "",
      country: basic?.isoCode ?? "",
    };

    setTimeout(() => {
      setSubmitStatus(1);
      setSubmitted(payload);
    }, 600);
  };

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>PhoneNumberInput Examples</h1>
        <p>
          Searchable country picker, paste-aware parsing, and a value object
          that always carries the country code.
        </p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic usage with the onChange value object */}
        <div className="ihub-example-card">
          <h3>Basic usage</h3>
          <p>
            Open the picker and search by country name (<code>nigeria</code>),
            ISO code (<code>ng</code>) or dial code (<code>234</code> /{" "}
            <code>+234</code>).
          </p>

          <PhoneNumberInput
            label="Phone number"
            names="mobile"
            onChange={setBasic}
          />

          <div className="ihub-input-result">
            <p>
              <strong>phone_code:</strong> {basic?.phoneCode || "—"}
            </p>
            <p>
              <strong>mobile:</strong> {basic?.nationalNumber || "—"}
            </p>
            <p>
              <strong>e164 (store this):</strong> {basic?.e164 || "—"}
            </p>
            <p>
              <strong>valid:</strong> {basic?.isValid ? "yes" : "no"}
            </p>
          </div>
        </div>

        {/* Paste handling */}
        <div className="ihub-example-card">
          <h3>Paste a full international number</h3>
          <p>
            Try pasting any of these — the country is detected and no digits
            are dropped:
          </p>
          <ul>
            <li>
              <code>+234 803 123 4567</code>
            </li>
            <li>
              <code>2348031234567</code> (no plus)
            </li>
            <li>
              <code>002348031234567</code> (IDD prefix)
            </li>
            <li>
              <code>+1 (212) 555-1234</code>
            </li>
            <li>
              <code>08031234567</code> (trunk zero is stripped)
            </li>
          </ul>

          <PhoneNumberInput
            label="Paste here"
            names="mobile"
            preferredCountries={["NG", "GB", "US"]}
            onChange={setPreferred}
            note="Nigeria, United Kingdom and United States are pinned to the top."
          />

          <div className="ihub-input-result">
            <p>
              <strong>Detected:</strong> {preferred?.flag}{" "}
              {preferred?.countryName || "—"}
            </p>
            <p>
              <strong>Result:</strong> {preferred?.formatted || "—"}
            </p>
          </div>
        </div>

        {/* Legacy inputEvent API */}
        <div className="ihub-example-card">
          <h3>Legacy inputEvent API</h3>
          <p>
            <code>inputEvent</code> fires for both fields, and once on mount so{" "}
            <code>phone_code</code> is present even if the picker is never
            opened.
          </p>

          <PhoneNumberInput
            phoneCode="+44"
            defaultValues={formData}
            names="mobile"
            inputEvent={handleInputChange}
          />

          <div className="ihub-input-result">
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </div>
        </div>

        {/* Async defaults */}
        <div className="ihub-example-card">
          <h3>Values loaded from an API</h3>
          <p>
            A stored <code>+447911123456</code> arrives after ~1.2s and is split
            back into country and national number.
          </p>

          <PhoneNumberInput
            label="Stored number"
            names="mobile"
            defaultValues={loaded}
          />
        </div>

        {/* Form submission */}
        <div className="ihub-example-card">
          <h3>Form submission</h3>
          <p>
            A hidden <code>phone_code</code> field is rendered, so native form
            submits carry the country code too.
          </p>

          <form onSubmit={handleSubmit}>
            <PhoneNumberInput
              label="Contact number"
              names="mobile"
              required
              onChange={setBasic}
            />

            <div className="ihub-form-actions">
              <SubmitButton
                label="Submit Phone Number"
                status={submitStatus}
                className="ihub-submit-btn"
              />
            </div>
          </form>

          {submitted && (
            <div className="ihub-form-result">
              <p>
                <strong>Payload sent:</strong>
              </p>
              <pre>{JSON.stringify(submitted, null, 2)}</pre>
            </div>
          )}
        </div>

        {/* Disabled */}
        <div className="ihub-example-card">
          <h3>Disabled</h3>
          <PhoneNumberInput
            label="Read only"
            names="mobile"
            phoneCode="+234"
            defaultValues={{ mobile: "8031234567" }}
            disabled
          />
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>

        <div className="ihub-code-section">
          <h3>Recommended: the onChange value object</h3>
          <pre>
            <code>{`import { PhoneNumberInput } from "@instincthub/react-ui";

const [phone, setPhone] = useState(null);

<PhoneNumberInput
  label="Phone number"
  names="mobile"
  preferredCountries={["NG", "GB", "US"]}
  onChange={(value) => setPhone(value)}
/>

// value = {
//   phoneCode: "+234",
//   dialCode: "234",
//   nationalNumber: "8031234567",
//   e164: "+2348031234567",
//   formatted: "+234 803 123 4567",
//   isoCode: "NG",
//   countryName: "Nigeria",
//   isValid: true,
// }`}</code>
          </pre>
        </div>

        <div className="ihub-code-section">
          <h3>Writing straight into form state</h3>
          <pre>
            <code>{`const [formData, setFormData] = useState({});

<PhoneNumberInput
  names="mobile"
  phoneCodeName="phone_code"
  defaultValues={formData}
  setFormData={setFormData}
/>

// formData = { mobile: "8031234567", phone_code: "+234" }`}</code>
          </pre>
        </div>

        <div className="ihub-code-section">
          <h3>Legacy inputEvent</h3>
          <pre>
            <code>{`const handleInputChange = (event) => {
  const { name, value } = event.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

<PhoneNumberInput
  phoneCode="+234"
  defaultValues={formData}
  names="mobile"
  inputEvent={handleInputChange}
/>

// Fires for "phone_code" and "mobile", including once on mount.`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default PhoneNumberInputExample;
