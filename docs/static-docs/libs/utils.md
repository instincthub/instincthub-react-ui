# Application Constants & Types

**Category:** Library | **Type:** constants collection

A comprehensive collection of application constants, configuration objects, and type definitions for building educational platforms. Provides standardized options, data structures, and configuration templates for forms, payments, content management, and user interactions.

## 📁 File Location

`src/components/lib/utils.ts`

## 🏷️ Tags

`constants`, `types`, `configuration`, `forms`, `education`, `international`, `data-structures`

## 📖 Usage Examples

### Example 1: Complete Application Constants Demo

```tsx
"use client";

import React, { useState } from "react";
import {
  CREDENTIALS,
  COMPANY_SIZES_CHOICES,
  INDUSTRIES,
  CURRENCY_SYMBOL,
  CONTENT_TYPE_OPTIONS,
  SKILLS_LEVELS,
  STUDENT_STATUS,
  CODE_LANGUAGES,
  VIDEO_PLAYER_OPTIONS,
  PAYMENT_PROCESSING_OPTIONS,
  NIGERIA_BANKS,
  NEXT_AUTH_SESSION_DATA_DUMMY
} from "@instincthub/react-ui/lib";

/**
 * Comprehensive example demonstrating application constants
 */
const ApplicationConstantsExamples = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("credentials");
  
  // Form state for demonstration
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company_size: "",
    industry: "",
    skill_level: "",
    student_status: "",
    preferred_language: "",
    payment_method: "",
    bank: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const categories = [
    { id: "credentials", label: "Form Credentials", icon: "pi-user" },
    { id: "business", label: "Business Data", icon: "pi-building" },
    { id: "education", label: "Education Options", icon: "pi-book" },
    { id: "international", label: "International", icon: "pi-globe" },
    { id: "content", label: "Content Types", icon: "pi-file" },
    { id: "payments", label: "Payment Options", icon: "pi-credit-card" },
    { id: "technical", label: "Technical", icon: "pi-code" },
    { id: "session", label: "Session Data", icon: "pi-key" }
  ];

  return (
    <div className="ihub-container ihub-py-5">
      <h1>Application Constants Examples</h1>

      {/* Category Navigation */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Constant Categories</h2>
        <div className="ihub-row">
          {categories.map((category) => (
            <div key={category.id} className="ihub-col-md-3 ihub-mb-2">
              <button
                className={`ihub-btn ihub-w-100 ${
                  selectedCategory === category.id 
                    ? 'ihub-btn-primary' 
                    : 'ihub-btn-outline-primary'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <i className={`pi ${category.icon} ihub-me-2`}></i>
                {category.label}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Form Credentials */}
      {selectedCategory === "credentials" && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">Form Credentials Configuration</h2>
          <div className="ihub-row">
            <div className="ihub-col-md-8">
              <div className="ihub-card ihub-p-4">
                <h6>Dynamic Form Generation</h6>
                <form>
                  {Object.entries(CREDENTIALS).map(([key, field]) => (
                    <div key={key} className="ihub-mb-3">
                      <label className="ihub-form-label">
                        {field.label}
                        {key === 'username' || key === 'password' ? ' *' : ''}
                      </label>
                      <input
                        type={field.type}
                        className="ihub-form-control"
                        placeholder={field.placeholder}
                        value={formData[key as keyof typeof formData] || ""}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                      />
                    </div>
                  ))}
                </form>
              </div>
            </div>
            <div className="ihub-col-md-4">
              <div className="ihub-card ihub-p-4">
                <h6>CREDENTIALS Object Structure</h6>
                <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "10px" }}>
                  {JSON.stringify(CREDENTIALS, null, 2).substring(0, 500)}...
                </pre>
                <small className="text-muted">
                  Used for dynamic form generation with labels, types, and placeholders
                </small>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Business Data */}
      {selectedCategory === "business" && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">Business Configuration Options</h2>
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <div className="ihub-card ihub-p-4">
                <h6>Company Size Options</h6>
                <select
                  className="ihub-form-control ihub-mb-3"
                  value={formData.company_size}
                  onChange={(e) => handleInputChange('company_size', e.target.value)}
                >
                  <option value="">Select company size</option>
                  {COMPANY_SIZES_CHOICES.map((size, index) => (
                    <option key={index} value={size}>
                      {size} employees
                    </option>
                  ))}
                </select>
                <div className="ihub-alert ihub-alert-info">
                  <strong>Available Options:</strong><br />
                  {COMPANY_SIZES_CHOICES.join(", ")}
                </div>
              </div>
            </div>
            <div className="ihub-col-md-6">
              <div className="ihub-card ihub-p-4">
                <h6>Industry Categories</h6>
                <select
                  className="ihub-form-control ihub-mb-3"
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                >
                  <option value="">Select industry</option>
                  {INDUSTRIES.map((industry, index) => (
                    <option key={index} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
                <div className="ihub-alert ihub-alert-info">
                  <strong>Total Industries:</strong> {INDUSTRIES.length}<br />
                  <small>Includes IT, Finance, Healthcare, Education, and more</small>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Education Options */}
      {selectedCategory === "education" && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">Educational Platform Options</h2>
          <div className="ihub-row">
            <div className="ihub-col-md-4">
              <div className="ihub-card ihub-p-4">
                <h6>Skill Levels</h6>
                <div className="ihub-mb-3">
                  {SKILLS_LEVELS.map((level) => (
                    <div key={level} className="ihub-form-check">
                      <input
                        className="ihub-form-check-input"
                        type="radio"
                        name="skillLevel"
                        value={level}
                        checked={formData.skill_level === level}
                        onChange={(e) => handleInputChange('skill_level', e.target.value)}
                      />
                      <label className="ihub-form-check-label">
                        <span className={`ihub-badge ${
                          level === 'EXPLORER' ? 'ihub-badge-success' :
                          level === 'BEGINNER' ? 'ihub-badge-info' :
                          level === 'INTERMEDIATE' ? 'ihub-badge-warning' :
                          'ihub-badge-danger'
                        }`}>
                          {level}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="ihub-col-md-4">
              <div className="ihub-card ihub-p-4">
                <h6>Student Status Options</h6>
                <select
                  className="ihub-form-control ihub-mb-3"
                  value={formData.student_status}
                  onChange={(e) => handleInputChange('student_status', e.target.value)}
                >
                  <option value="">Select status</option>
                  {STUDENT_STATUS.map((status) => (
                    <option key={status} value={status}>
                      {status.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="ihub-col-md-4">
              <div className="ihub-card ihub-p-4">
                <h6>Programming Languages</h6>
                <select
                  className="ihub-form-control ihub-mb-3"
                  value={formData.preferred_language}
                  onChange={(e) => handleInputChange('preferred_language', e.target.value)}
                >
                  <option value="">Select language</option>
                  {CODE_LANGUAGES.slice(0, 10).map((lang) => (
                    <option key={lang} value={lang}>
                      {lang.toUpperCase()}
                    </option>
                  ))}
                </select>
                <small className="text-muted">
                  {CODE_LANGUAGES.length} languages supported
                </small>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* International */}
      {selectedCategory === "international" && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">International Support</h2>
          <div className="ihub-card ihub-p-4">
            <h6>Currency Symbols ({Object.keys(CURRENCY_SYMBOL).length} currencies)</h6>
            <div className="ihub-row">
              {Object.entries(CURRENCY_SYMBOL).map(([code, symbol]) => (
                <div key={code} className="ihub-col-md-3 ihub-col-lg-2 ihub-mb-3">
                  <div className="ihub-card ihub-p-2 text-center">
                    <div style={{ fontSize: "24px" }}>{symbol}</div>
                    <strong>{code}</strong>
                    <div className="ihub-mt-1">
                      <span className="ihub-badge ihub-badge-light">
                        {symbol}1,000
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Content Types */}
      {selectedCategory === "content" && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">Content Management Types</h2>
          <div className="ihub-row">
            {CONTENT_TYPE_OPTIONS.map((content, index) => (
              <div key={index} className="ihub-col-md-6 ihub-col-lg-4 ihub-mb-3">
                <div className="ihub-card ihub-p-4">
                  <div className="ihub-d-flex ihub-align-items-center ihub-mb-3">
                    <i className={`${content.icon} ihub-me-2`} style={{ fontSize: "24px" }}></i>
                    <div>
                      <h6 className="ihub-mb-0">{content.label}</h6>
                      <small className="text-muted">{content.value}</small>
                    </div>
                  </div>
                  <div className="ihub-bg-light ihub-p-2 ihub-rounded">
                    <small><strong>Default Item:</strong></small>
                    <pre style={{ fontSize: "10px", margin: 0 }}>
                      {JSON.stringify(content.item, null, 1)}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Payment Options */}
      {selectedCategory === "payments" && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">Payment & Banking Options</h2>
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <div className="ihub-card ihub-p-4">
                <h6>Payment Processing Options</h6>
                <select
                  className="ihub-form-control ihub-mb-3"
                  value={formData.payment_method}
                  onChange={(e) => handleInputChange('payment_method', e.target.value)}
                >
                  {PAYMENT_PROCESSING_OPTIONS.map((payment) => (
                    <option key={payment.id} value={payment.id}>
                      {payment.title}
                    </option>
                  ))}
                </select>
                <div className="ihub-alert ihub-alert-info">
                  <strong>Supported Methods:</strong><br />
                  Paystack, Flutterwave, PayPal, Stripe, and more
                </div>
              </div>
            </div>
            <div className="ihub-col-md-6">
              <div className="ihub-card ihub-p-4">
                <h6>Nigerian Banks & Fintech</h6>
                <select
                  className="ihub-form-control ihub-mb-3"
                  value={formData.bank}
                  onChange={(e) => handleInputChange('bank', e.target.value)}
                >
                  <option value="">Select bank</option>
                  {NIGERIA_BANKS.slice(0, 10).map((bank) => (
                    <option key={bank.id} value={bank.id}>
                      {bank.title}
                    </option>
                  ))}
                </select>
                <div className="ihub-alert ihub-alert-info">
                  <strong>Available Banks:</strong> {NIGERIA_BANKS.length}<br />
                  <small>Includes traditional banks and fintech companies</small>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Technical Options */}
      {selectedCategory === "technical" && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">Technical Configuration</h2>
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <div className="ihub-card ihub-p-4">
                <h6>Video Player Options</h6>
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Platform</th>
                        <th>ID</th>
                        <th>Pattern Match</th>
                      </tr>
                    </thead>
                    <tbody>
                      {VIDEO_PLAYER_OPTIONS.slice(0, 5).map((option) => (
                        <tr key={option.id}>
                          <td>{option.title}</td>
                          <td><code>{option.id}</code></td>
                          <td>
                            <small className="text-muted">
                              {option.pattern.toString().substring(0, 30)}...
                            </small>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <small className="text-muted">
                  {VIDEO_PLAYER_OPTIONS.length} video platforms supported
                </small>
              </div>
            </div>
            <div className="ihub-col-md-6">
              <div className="ihub-card ihub-p-4">
                <h6>Programming Languages</h6>
                <div className="ihub-d-flex ihub-flex-wrap ihub-gap-1">
                  {CODE_LANGUAGES.map((lang) => (
                    <span key={lang} className="ihub-badge ihub-badge-light">
                      {lang}
                    </span>
                  ))}
                </div>
                <div className="ihub-mt-3 ihub-alert ihub-alert-info">
                  <strong>Total Languages:</strong> {CODE_LANGUAGES.length}<br />
                  <small>Includes mainstream and niche programming languages</small>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Session Data */}
      {selectedCategory === "session" && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">Session Data Templates</h2>
          <div className="ihub-card ihub-p-4">
            <h6>NextAuth Session Data Structure</h6>
            <div className="ihub-row">
              <div className="ihub-col-md-6">
                <h6>User Information</h6>
                <div className="ihub-mb-3">
                  <strong>ID:</strong> {NEXT_AUTH_SESSION_DATA_DUMMY.user.id}<br />
                  <strong>Email:</strong> {NEXT_AUTH_SESSION_DATA_DUMMY.user.email}<br />
                  <strong>Role:</strong> 
                  <span className="ihub-badge ihub-badge-primary ihub-ms-1">
                    {NEXT_AUTH_SESSION_DATA_DUMMY.user.role}
                  </span>
                </div>
                <div className="ihub-mb-3">
                  <strong>Permissions:</strong>
                  <div className="ihub-d-flex ihub-flex-wrap ihub-gap-1 ihub-mt-1">
                    {NEXT_AUTH_SESSION_DATA_DUMMY.user.permissions?.map((perm) => (
                      <span key={perm} className="ihub-badge ihub-badge-success">
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="ihub-col-md-6">
                <h6>Session Details</h6>
                <div className="ihub-mb-3">
                  <strong>Expires:</strong><br />
                  <small>{new Date(NEXT_AUTH_SESSION_DATA_DUMMY.expires).toLocaleString()}</small>
                </div>
                <div className="ihub-mb-3">
                  <strong>Access Token:</strong><br />
                  <code style={{ fontSize: "10px" }}>
                    {NEXT_AUTH_SESSION_DATA_DUMMY.accessToken}
                  </code>
                </div>
              </div>
            </div>
            <div className="ihub-mt-3">
              <button
                className="ihub-btn ihub-btn-outline-info ihub-btn-sm"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#sessionData"
              >
                View Full Session Object
              </button>
              <div className="collapse ihub-mt-2" id="sessionData">
                <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "10px", maxHeight: "300px", overflow: "auto" }}>
                  {JSON.stringify(NEXT_AUTH_SESSION_DATA_DUMMY, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Implementation Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Implementation Examples</h2>
        
        {/* Dynamic Form Builder */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-cog ihub-me-2"></i>
              Dynamic Form Builder
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Dynamic form generation using CREDENTIALS
import { CREDENTIALS, CredentialsType } from '@instincthub/react-ui/lib';

const DynamicForm = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form>
      {Object.entries(CREDENTIALS).map(([key, field]) => (
        <div key={key} className="form-group">
          <label>{field.label}</label>
          <input
            type={field.type}
            placeholder={field.placeholder}
            value={formData[key] || ''}
            onChange={(e) => handleChange(key, e.target.value)}
            required={['username', 'password'].includes(key)}
          />
        </div>
      ))}
    </form>
  );
};`}
            </pre>
          </div>
        </div>

        {/* Multi-currency Support */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-globe ihub-me-2"></i>
              Multi-currency Price Display
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Multi-currency pricing component
import { CURRENCY_SYMBOL } from '@instincthub/react-ui/lib';

const PriceDisplay = ({ amount, currency, showSymbol = true }) => {
  const symbol = CURRENCY_SYMBOL[currency] || currency;
  
  const formatPrice = (price: number, currencyCode: string) => {
    // Format based on currency conventions
    if (currencyCode === 'NGN' || currencyCode === 'JPY') {
      return Math.round(price).toLocaleString();
    }
    return price.toFixed(2);
  };

  return (
    <span className="price">
      {showSymbol && symbol}
      {formatPrice(amount, currency)}
      {!showSymbol && ` ${currency}`}
    </span>
  );
};

// Usage with multiple currencies
const ProductCard = ({ product }) => {
  const supportedCurrencies = ['USD', 'NGN', 'EUR', 'GBP'];
  
  return (
    <div>
      <h3>{product.name}</h3>
      <div className="price-options">
        {supportedCurrencies.map(currency => (
          <div key={currency}>
            <PriceDisplay 
              amount={product.prices[currency]} 
              currency={currency} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};`}
            </pre>
          </div>
        </div>

        {/* Content Type Management */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-file ihub-me-2"></i>
              Content Management System
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Content type selector and renderer
import { CONTENT_TYPE_OPTIONS, ContentTypeOption } from '@instincthub/react-ui/lib';

const ContentEditor = () => {
  const [selectedType, setSelectedType] = useState<ContentTypeOption | null>(null);
  const [contentData, setContentData] = useState({});

  const handleTypeSelection = (type: ContentTypeOption) => {
    setSelectedType(type);
    setContentData(type.item); // Initialize with default structure
  };

  const renderContentForm = () => {
    if (!selectedType) return null;

    switch (selectedType.value) {
      case 'text':
        return (
          <div>
            <textarea
              value={contentData.content || ''}
              onChange={(e) => setContentData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Enter text content..."
            />
            <select
              value={contentData.tag || 'p'}
              onChange={(e) => setContentData(prev => ({ ...prev, tag: e.target.value }))}
            >
              <option value="p">Paragraph</option>
              <option value="h1">Heading 1</option>
              <option value="h2">Heading 2</option>
            </select>
          </div>
        );
      case 'code':
        return (
          <div>
            <textarea
              value={contentData.content || ''}
              onChange={(e) => setContentData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Enter code..."
            />
            <select
              value={contentData.language || 'plaintext'}
              onChange={(e) => setContentData(prev => ({ ...prev, language: e.target.value }))}
            >
              {CODE_LANGUAGES.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        );
      default:
        return <div>Content editor for {selectedType.label}</div>;
    }
  };

  return (
    <div>
      <div className="content-type-selector">
        {CONTENT_TYPE_OPTIONS.map((type) => (
          <button
            key={type.value}
            onClick={() => handleTypeSelection(type)}
            className={\`type-button \${selectedType?.value === type.value ? 'active' : ''}\`}
          >
            <i className={type.icon}></i>
            {type.label}
          </button>
        ))}
      </div>
      {renderContentForm()}
    </div>
  );
};`}
            </pre>
          </div>
        </div>
      </section>

      {/* Current Form Data Display */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Current Form State</h2>
        <div className="ihub-card ihub-p-4">
          <h6>Form Data Preview</h6>
          <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "12px" }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default ApplicationConstantsExamples;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import {
  CREDENTIALS,
  CURRENCY_SYMBOL,
  CONTENT_TYPE_OPTIONS,
  PAYMENT_PROCESSING_OPTIONS
} from '@instincthub/react-ui/lib';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { CREDENTIALS, CURRENCY_SYMBOL } from '@instincthub/react-ui/lib';

function RegistrationForm() {
  return (
    <form>
      {Object.entries(CREDENTIALS).map(([key, field]) => (
        <div key={key}>
          <label>{field.label}</label>
          <input
            type={field.type}
            placeholder={field.placeholder}
          />
        </div>
      ))}
    </form>
  );
}

function PriceDisplay({ amount, currency }) {
  const symbol = CURRENCY_SYMBOL[currency] || currency;
  return <span>{symbol}{amount}</span>;
}
```

## 🔧 Available Constants

### Form & User Data

#### `CREDENTIALS: CredentialsType`
Form field configurations with labels, types, and placeholders.

#### `COMPANY_SIZES_CHOICES: string[]`
Company size ranges from "1-10" to "10,001+".

#### `INDUSTRIES: string[]`
Comprehensive list of 25+ industry categories.

### International Support

#### `CURRENCY_SYMBOL: Record<string, string>`
Currency symbols for 27+ countries and regions.

#### `PROGRAM_LEVELS: string[]`
Academic program levels (100-500 level).

### Educational Platform

#### `SKILLS_LEVELS: SkillLevel[]`
Four skill progression levels: EXPLORER, BEGINNER, INTERMEDIATE, EXPERT.

#### `STUDENT_STATUS: StudentStatus[]`
Enrollment status options: ACTIVE, PENDING, SUSPENDED, etc.

#### `CONTENT_TYPE_OPTIONS: ContentTypeOption[]`
Content management types: text, image, file, quote, note, link, code.

#### `CODE_LANGUAGES: string[]`
30+ programming languages for code snippets.

### Business & Payments

#### `PAYMENT_PROCESSING_OPTIONS: PaymentOption[]`
Payment gateway options: Paystack, Stripe, PayPal, etc.

#### `NIGERIA_BANKS: BankOption[]`
Comprehensive list of Nigerian banks and fintech companies.

#### `APPLICATION_FEE_TYPE_OPTIONS: ApplicationFeeOption[]`
Academic fee types: application, acceptance, school fees.

### Technical Configuration

#### `VIDEO_PLAYER_OPTIONS: VideoPlayerOption[]`
Video platform integrations with URL pattern matching.

#### `DURATION_FILTERS: DurationFilter[]`
Time-based filter options (24 hours to 1 year).

### Development & Testing

#### `NEXT_AUTH_SESSION_DATA_DUMMY: NextAuthSessionData`
Complete session object template for testing and development.

## 📊 Type Definitions

```tsx
interface CredentialField {
  label: string;
  type: string;
  placeholder?: string;
}

interface ContentTypeOption {
  label: string;
  value: string;
  icon: string;
  item: Record<string, any>;
}

interface VideoPlayerOption {
  id: string;
  title: string;
  pattern: RegExp;
}

type SkillLevel = "EXPLORER" | "BEGINNER" | "INTERMEDIATE" | "EXPERT";
type StudentStatus = "SHORTLIST" | "DELIST" | "SUSPENDED" | "DISCONTINUED" | "ACTIVE" | "PENDING";
type PrivacyOption = "PRIVATE" | "PUBLIC" | "DRAFT";
```

## 💡 Use Cases

- **Form Generation**: Create dynamic forms using CREDENTIALS configuration
- **International Apps**: Multi-currency and multi-language support
- **Educational Platforms**: Student management and skill tracking
- **Content Management**: Dynamic content type handling
- **Payment Integration**: Support multiple payment gateways
- **Business Applications**: Company and industry categorization
- **Development**: Testing with realistic session data
- **Video Platforms**: Multi-platform video integration

## 🌍 International Features

- **27+ Currencies**: Comprehensive currency symbol support
- **Global Banking**: Nigerian banking system integration
- **Localization Ready**: Structure supports easy localization
- **Regional Customization**: Country-specific configurations

## 🔒 Security Considerations

- **Dummy Data**: Clearly marked test/development data
- **Environment Separation**: Production vs development configurations
- **Type Safety**: Full TypeScript support for all constants
- **Validation Ready**: Structured for easy form validation

## 🔗 Related Utilities

- [getPriceObjects](./getPriceObjects.md) - Uses CURRENCY_SYMBOL for pricing
- [roles](./roles.md) - Uses permission constants  
- [CREDENTIALS usage](./helpFunction.md) - Form generation utilities
- [charts](./charts.md) - Uses gauge and duration data