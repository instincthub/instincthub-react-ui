"use client";

import React, { useState } from "react";
import { InputNumber } from "@/index";

const InputNumberExample: React.FC = () => {
  const [quantity, setQuantity] = useState<number | null>(1);
  const [price, setPrice] = useState<number | null>(99.99);
  const [percent, setPercent] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const handleQuantityChange = (value: number | null) => {
    setQuantity(value);
    if (value !== null && value > 10) {
      setError("Maximum quantity allowed is 10");
    } else {
      setError("");
    }
  };

  return (
    <div className="ihub-container ihub-pt-8">
      <h2>InputNumber Component Examples</h2>

      <div className="ihub-my-4">
        <InputNumber
          name="quantity"
          label="Quantity"
          min={1}
          max={10}
          value={quantity || undefined}
          onChange={handleQuantityChange}
          error={error}
          required
        />
        <p className="ihub-mt-2">
          Selected quantity: {quantity !== null ? quantity : "None"}
        </p>
      </div>

      <div className="ihub-my-4">
        <InputNumber
          name="price"
          label="Price ($)"
          min={0}
          step={0.01}
          value={price || undefined}
          onChange={setPrice}
        />
        <p className="ihub-mt-2">
          Current price: {price !== null ? `$${price.toFixed(2)}` : "None"}
        </p>
      </div>

      <div className="ihub-my-4">
        <InputNumber
          name="percentage"
          label="Percentage"
          min={0}
          max={100}
          placeholder="Enter a percentage"
          value={percent || undefined}
          onChange={setPercent}
        />
        <p className="ihub-mt-2">
          Current percentage: {percent !== null ? `${percent}%` : "None"}
        </p>
      </div>

      <div className="ihub-my-4">
        <InputNumber
          name="readonly"
          label="Read Only"
          defaultValue={42}
          readOnly
        />
      </div>

      <div className="ihub-my-4">
        <InputNumber
          name="disabled"
          label="Disabled"
          defaultValue={50}
          disabled
        />
      </div>
    </div>
  );
};

export default InputNumberExample;
