# isValidEmail

**Category:** Library | **Type:** validation utility

Validate email addresses using a comprehensive regular expression pattern.

**File Location:** `src/components/lib/helpFunction.ts`

## 🏷️ Tags

`validation`, `email`, `regex`, `form`, `utility`

## 📖 Usage Example

```tsx
"use client";

import React, { useState } from "react";
import { isValidEmail } from "@instincthub/react-ui/lib";

/**
 * Example demonstrating isValidEmail function
 */
const EmailValidationExample = () => {
  const [emailInput, setEmailInput] = useState<string>("user@example.com");

  const testEmails = [
    { email: "user@example.com", expected: true },
    { email: "test.email@domain.co.uk", expected: true },
    { email: "user+tag@example.org", expected: true },
    { email: "firstname.lastname@company.io", expected: true },
    { email: "user123@test-domain.net", expected: true },
    { email: "invalid.email", expected: false },
    { email: "@example.com", expected: false },
    { email: "user@", expected: false },
    { email: "user@@example.com", expected: false },
    { email: "user..name@example.com", expected: false },
    { email: "", expected: false },
    { email: "plaintext", expected: false }
  ];

  return (
    <div className="ihub-container ihub-py-5">
      <h1>Email Validation Example</h1>

      <section className="ihub-mb-5">
        <div className="ihub-card ihub-p-4">
          <div className="ihub-mb-3">
            <label className="ihub-form-label">Test Email Address:</label>
            <input
              type="email"
              className={`ihub-form-control ${
                emailInput ? (isValidEmail(emailInput) ? 'is-valid' : 'is-invalid') : ''
              }`}
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter email address to test"
            />
            {emailInput && (
              <div className={`${isValidEmail(emailInput) ? 'valid' : 'invalid'}-feedback`}>
                {isValidEmail(emailInput) 
                  ? '✅ Valid email format' 
                  : '❌ Invalid email format'
                }
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Test Cases */}
      <section className="ihub-mb-5">
        <h2>Validation Test Cases</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-table-responsive">
            <table className="ihub-table">
              <thead>
                <tr>
                  <th>Email Address</th>
                  <th>Expected</th>
                  <th>Result</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {testEmails.map((test, index) => {
                  const result = isValidEmail(test.email);
                  const isCorrect = result === test.expected;
                  
                  return (
                    <tr key={index} className={isCorrect ? '' : 'table-warning'}>
                      <td><code>{test.email || '(empty)'}</code></td>
                      <td>
                        <span className={`badge ${test.expected ? 'badge-success' : 'badge-danger'}`}>
                          {test.expected ? 'Valid' : 'Invalid'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${result ? 'badge-success' : 'badge-danger'}`}>
                          {result ? 'Valid' : 'Invalid'}
                        </span>
                      </td>
                      <td>
                        {isCorrect ? '✅' : '❌'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Form Example */}
      <section className="ihub-mb-5">
        <h2>Form Integration Example</h2>
        <div className="ihub-card ihub-p-4">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="ihub-mb-3">
              <label className="ihub-form-label">Email Address *</label>
              <input
                type="email"
                className={`ihub-form-control ${
                  emailInput ? (isValidEmail(emailInput) ? 'is-valid' : 'is-invalid') : ''
                }`}
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
              />
              <div className="form-text">
                Enter a valid email address to continue
              </div>
            </div>
            <button 
              type="submit" 
              className="ihub-btn ihub-btn-primary"
              disabled={!isValidEmail(emailInput)}
            >
              {isValidEmail(emailInput) ? 'Submit' : 'Enter Valid Email'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default EmailValidationExample;
```

## 🚀 Basic Usage

```tsx
import { isValidEmail } from '@instincthub/react-ui/lib';

// Basic validation
const email = "user@example.com";
const isValid = isValidEmail(email);
// Result: true

// Form validation
const handleSubmit = (formData) => {
  if (!isValidEmail(formData.email)) {
    setError("Please enter a valid email address");
    return;
  }
  // Process form...
};

// Real-time validation
const handleEmailChange = (e) => {
  const email = e.target.value;
  setEmail(email);
  setIsEmailValid(isValidEmail(email));
};
```

## 🔧 Function Signature

```typescript
function isValidEmail(input: string): boolean
```

### Parameters

- **input** (string): The email string to validate

### Returns

- **boolean**: `true` if the email format is valid, `false` otherwise

## 💡 Use Cases

- **Form Validation**: Validate email inputs in registration/login forms
- **User Registration**: Ensure valid email addresses during signup
- **Contact Forms**: Validate email addresses in contact forms
- **Newsletter Signup**: Verify email format before subscription
- **Profile Updates**: Validate email changes in user profiles
- **Bulk Email Validation**: Check multiple email addresses
- **API Input Validation**: Validate email parameters in API calls

## ✅ Valid Email Formats

The function accepts these email formats:

- `user@example.com`
- `firstname.lastname@domain.co.uk`
- `user+tag@example.org`
- `user123@test-domain.net`
- `email@subdomain.example.com`

## ❌ Invalid Email Formats

The function rejects these formats:

- `invalid.email` (missing @ and domain)
- `@example.com` (missing local part)
- `user@` (missing domain)
- `user@@example.com` (double @)
- `user..name@example.com` (consecutive dots)
- Empty strings

## ⚠️ Important Notes

- Uses a comprehensive regex pattern for validation
- Does not check if the email address actually exists
- Does not validate against specific domain requirements
- Follows standard email format rules (RFC 5322 compliant)
- Case-insensitive validation

## 🔗 Related Functions

- [isValidAlphanumeric](./isValidAlphanumeric.md) - Validate alphanumeric input
- [stripHtmlTags](./stripHtmlTags.md) - Clean input before validation