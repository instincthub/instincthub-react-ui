"use client";

import React, { useState } from "react";
import {
  IsUsernameEmailTaken,
  InputText,
  SubmitButton,
} from "../../../../index";

const IsUsernameEmailTakenExample: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    alternateEmail: "",
    businessEmail: "",
  });

  const [validationResults, setValidationResults] = useState<
    Record<string, any>
  >({});
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [registrationData, setRegistrationData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  // Mock API functions to simulate checking availability
  const checkUsernameAvailability = async (username: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock taken usernames
    const takenUsernames = [
      "admin",
      "user",
      "test",
      "demo",
      "john_doe",
      "jane_smith",
    ];
    const isTaken = takenUsernames.includes(username.toLowerCase());

    return {
      available: !isTaken,
      message: isTaken ? "Username is already taken" : "Username is available",
      suggestions: isTaken
        ? [`${username}123`, `${username}_2024`, `new_${username}`]
        : [],
    };
  };

  const checkEmailAvailability = async (email: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock taken emails
    const takenEmails = [
      "admin@example.com",
      "user@test.com",
      "demo@company.com",
      "john@instincthub.com",
    ];
    const isTaken = takenEmails.includes(email.toLowerCase());

    return {
      available: !isTaken,
      message: isTaken
        ? "Email address is already registered"
        : "Email is available",
      alternativeProviders: isTaken
        ? ["gmail.com", "yahoo.com", "outlook.com"]
        : [],
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegistrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistrationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleValidationResult = (field: string, result: any) => {
    setValidationResults((prev) => ({
      ...prev,
      [field]: result,
    }));
  };

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);

    // Simulate registration process
    setTimeout(() => {
      console.log("Registration successful:", registrationData);
      setIsRegistering(false);
      // Reset form
      setRegistrationData({
        fullName: "",
        username: "",
        email: "",
        password: "",
      });
    }, 2000);
  };

  // Check if all required fields are valid for registration
  const isRegistrationValid = () => {
    return (
      registrationData.fullName &&
      registrationData.username &&
      registrationData.email &&
      registrationData.password &&
      validationResults.regUsername?.available &&
      validationResults.regEmail?.available
    );
  };

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>IsUsernameEmailTaken Examples</h1>
        <p>
          Real-time username and email availability checker with validation
          feedback
        </p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Username Check */}
        <div className="ihub-example-card">
          <h3>Username Availability Check</h3>
          <p>
            Real-time username validation with suggestions for taken usernames
          </p>

          <IsUsernameEmailTaken
            key={1}
            label="Username"
            name="username"
            type="username"
            setIsValid={() => {}}
            required={true}
          />

          {validationResults.username && (
            <div className="ihub-validation-feedback ihub-mt-2">
              <div
                className={`ihub-validation-status ${
                  validationResults.username.available ? "success" : "error"
                }`}
              >
                <strong>Status:</strong> {validationResults.username.message}
              </div>

              {validationResults.username.suggestions &&
                validationResults.username.suggestions.length > 0 && (
                  <div className="ihub-suggestions ihub-mt-2">
                    <strong>Suggestions:</strong>
                    <div className="ihub-suggestion-buttons">
                      {validationResults.username.suggestions.map(
                        (suggestion: string, index: number) => (
                          <button
                            key={index}
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                username: suggestion,
                              }))
                            }
                            className="ihub-suggestion-btn"
                          >
                            {suggestion}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>

        {/* Basic Email Check */}
        <div className="ihub-example-card">
          <h3>Email Availability Check</h3>
          <p>
            Real-time email validation with alternative provider suggestions
          </p>

          <IsUsernameEmailTaken
            label="Email Address"
            name="email"
            type="email"
          />

          {validationResults.email && (
            <div className="ihub-validation-feedback ihub-mt-2">
              <div
                className={`ihub-validation-status ${
                  validationResults.email.available ? "success" : "error"
                }`}
              >
                <strong>Status:</strong> {validationResults.email.message}
              </div>

              {validationResults.email.alternativeProviders &&
                validationResults.email.alternativeProviders.length > 0 && (
                  <div className="ihub-alternatives ihub-mt-2">
                    <strong>Try these providers:</strong>
                    <div className="ihub-provider-buttons">
                      {validationResults.email.alternativeProviders.map(
                        (provider: string, index: number) => (
                          <button
                            key={index}
                            onClick={() => {
                              const localPart = formData.email.split("@")[0];
                              setFormData((prev) => ({
                                ...prev,
                                email: `${localPart}@${provider}`,
                              }));
                            }}
                            className="ihub-provider-btn"
                          >
                            @{provider}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>

        {/* Complete Registration Form */}
        <div className="ihub-example-card">
          <h3>Registration Form with Validation</h3>
          <p>Complete signup form with real-time username and email checking</p>

          <form
            onSubmit={handleRegistration}
            className="ihub-registration-form"
          >
            <div className="ihub-mb-3">
              <InputText
                label="Full Name"
                name="fullName"
                value={registrationData.fullName}
                onChange={handleRegistrationChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="ihub-mb-3">
              <InputText
                label="Password"
                name="password"
                type="password"
                value={registrationData.password}
                onChange={handleRegistrationChange}
                placeholder="Create a password"
                required
              />
            </div>

            <SubmitButton
              label="Create Account"
              status={isRegistering ? 2 : 1}
              disabled={!isRegistrationValid()}
              className="ihub-important-btn ihub-w-100"
            />

            <div className="ihub-validation-summary ihub-mt-3">
              <h5>Validation Status:</h5>
              <ul>
                <li
                  className={
                    validationResults.regUsername?.available
                      ? "valid"
                      : "invalid"
                  }
                >
                  Username:{" "}
                  {validationResults.regUsername?.available
                    ? "✅ Available"
                    : "❌ Not available"}
                </li>
                <li
                  className={
                    validationResults.regEmail?.available ? "valid" : "invalid"
                  }
                >
                  Email:{" "}
                  {validationResults.regEmail?.available
                    ? "✅ Available"
                    : "❌ Not available"}
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>

        <div className="ihub-code-section">
          <h3>Basic Username Check</h3>
          <pre>
            <code>{`import { IsUsernameEmailTaken } from '@instincthub/react-ui';

const checkUsernameAvailability = async (username: string) => {
  const response = await fetch(\`/api/check-username/\${username}\`);
  return await response.json();
};

<IsUsernameEmailTaken
  label="Username"
  name="username"
  value={username}
  onChange={handleChange}
  checkFunction={checkUsernameAvailability}
  onValidationResult={(result) => setValidationResult(result)}
  placeholder="Enter desired username"
  type="username"
/>`}</code>
          </pre>
        </div>

        <div className="ihub-code-section">
          <h3>Email Availability Check</h3>
          <pre>
            <code>{`const checkEmailAvailability = async (email: string) => {
  const response = await fetch('/api/check-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  return await response.json();
};

<IsUsernameEmailTaken
  label="Email Address"
  name="email"
  type="email"
  value={email}
  onChange={handleChange}
  checkFunction={checkEmailAvailability}
  onValidationResult={(result) => setEmailValidation(result)}
  placeholder="Enter your email"
/>`}</code>
          </pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Validation Result Handling</h3>
          <pre>
            <code>{`const [validationResult, setValidationResult] = useState(null);

const handleValidationResult = (result) => {
  setValidationResult(result);
  
  if (result.available) {
    console.log("Available:", result.message);
  } else {
    console.log("Not available:", result.message);
    if (result.suggestions) {
      console.log("Suggestions:", result.suggestions);
    }
  }
};

<IsUsernameEmailTaken
  // ... other props
  onValidationResult={handleValidationResult}
/>

{validationResult && !validationResult.available && (
  <div className="error-feedback">
    {validationResult.message}
    {validationResult.suggestions && (
      <div className="suggestions">
        {validationResult.suggestions.map(suggestion => (
          <button onClick={() => setSuggestion(suggestion)}>
            {suggestion}
          </button>
        ))}
      </div>
    )}
  </div>
)}`}</code>
          </pre>
        </div>

        <div className="ihub-code-section">
          <h3>Custom Validation Function</h3>
          <pre>
            <code>{`const customValidation = async (value: string) => {
  // Custom validation rules
  if (value.length < 3) {
    return {
      available: false,
      message: "Too short",
      suggestions: [\`\${value}_extended\`]
    };
  }
  
  // API check
  const response = await fetch(\`/api/validate/\${value}\`);
  const result = await response.json();
  
  return {
    available: result.available,
    message: result.message,
    suggestions: result.suggestions || []
  };
};`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default IsUsernameEmailTakenExample;
