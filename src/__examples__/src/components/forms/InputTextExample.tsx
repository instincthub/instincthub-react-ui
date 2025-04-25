"use client";

import React, { useState } from "react";
import { InputText } from "../../../../index";
import { isValidEmail } from "../../../../components/lib";

const InputTextExample: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "johndoe",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Basic validation on blur
    if (value.trim() === "" && name !== "username") {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "This field is required",
      }));
    } else if (name === "email" && !isValidEmail(value)) {
      setFormErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
    } else if (name === "password" && value.length < 8) {
      setFormErrors((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    // You could add form submission logic here
  };

  return (
    <div className="ihub-container ihub-my-5">
      <h2>Contact Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="ihub-py-3">
          <InputText
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            error={formErrors.fullName}
            textTransform="capitalize"
          />
        </div>

        <div className="ihub-py-3">
          <InputText
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            type="email"
            required
            error={formErrors.email}
            textTransform="lowercase"
            helperText="We'll never share your email with anyone else."
          />
        </div>

        <div className="ihub-py-3">
          <InputText
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={formErrors.username}
            helperText="Your public username"
          />
        </div>

        <div className="ihub-py-3">
          <InputText
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            required
            error={formErrors.password}
            helperText="Must be at least 8 characters"
          />
        </div>

        <div className="ihub-py-3">
          <InputText
            label="Read-only Field"
            name="readonly"
            value="This is a read-only value"
            readOnly
          />
        </div>

        <div className="ihub-py-3">
          <InputText
            label="Disabled Field"
            name="disabled"
            value="This field is disabled"
            disabled
          />
        </div>

        <button type="submit" className="ihub-important-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default InputTextExample;
