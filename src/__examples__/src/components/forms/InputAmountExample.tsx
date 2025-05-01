"use client";

import React, { useState } from "react";
import { InputAmount } from "../../../../index";

const InputAmountExample: React.FC = () => {
  const [amount, setAmount] = useState<string>("");
  const [amount2, setAmount2] = useState<string>("");
  const [error, setError] = useState("");
  const [donationAmount, setDonationAmount] = useState<string>("");

  const handleDonationChange = (value: string) => {
    setDonationAmount(value);
  };

  const handleChange = (value: string) => {
    setAmount(value);

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setError("Please enter a valid amount");
    } else if (numValue < 10) {
      setError("Amount must be at least 10");
    } else {
      setError("");
    }
  };

  return (
    <div className="ihub-container ihub-my-5">
      <h1 className="ihub-mb-0">Input Amount Usage Examples</h1>
      <p>
        The InputAmount component is a custom input field that allows users to
        enter a number with commas as thousands separators.
      </p>
      <form>
        <h2 className="ihub-fs-lg ihub-mb-0">Basic Usage</h2>
        <div className="ihub-py-3">
          <InputAmount
            label="Course Price"
            name="course_price"
            value={amount}
            onChange={(name, value) => console.log(name, value)}
            required
          />
        </div>

        <div className="ihub-py-3">
          <h2 className="ihub-fs-lg ihub-mb-0">With Custom Currency Symbol</h2>
          <InputAmount
            label="Donation Amount"
            value={donationAmount}
            onChange={handleDonationChange}
            currencySymbol="$"
          />
        </div>

        <div className="ihub-py-3">
          <h2 className="ihub-fs-lg ihub-mb-0">With Error Message</h2>
          <InputAmount
            label="Payment Amount"
            value={amount}
            onChange={handleChange}
            error={error}
            min={10}
          />
        </div>

        <h2 className="ihub-fs-lg ihub-mb-0">With Read-Only Input</h2>
        <ProductsTable />

        <button type="submit" className="ihub-important-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default InputAmountExample;

const ProductsTable = () => {
  const products = [
    { id: 1, name: "Course A", price: "4999.99" },
    { id: 2, name: "Course B", price: "2500.00" },
    { id: 3, name: "Course C", price: "7999.00" },
    { id: 4, name: "Course D", price: "10,000.00" },
  ];

  return (
    <table className="ihub-data-list-container">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>
              <InputAmount
                label="Price" /* Label still required but not displayed */
                value={product.price}
                onChange={() => {}} /* No-op since it's read-only */
                plainDisplay={true}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
