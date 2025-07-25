# formatNumberWithCommas

**Category:** Library | **Type:** number utility

Format numbers with comma separators for improved readability (e.g., 1234567 becomes "1,234,567").

**File Location:** `src/components/lib/helpFunction.ts`

## 🏷️ Tags

`number`, `format`, `comma`, `display`, `utility`

## 📖 Usage Example

```tsx
"use client";

import React, { useState } from "react";
import { formatNumberWithCommas } from "@instincthub/react-ui/lib";

/**
 * Example demonstrating formatNumberWithCommas function
 */
const FormatNumberExample = () => {
  const [numberInput, setNumberInput] = useState<number>(1234567.89);

  const examples = [
    1234,
    12345,
    123456,
    1234567,
    12345678,
    123456789,
    1234567890,
    1234.56,
    12345.789,
    0.123,
    -1234567,
    -1234.56
  ];

  return (
    <div className="ihub-container ihub-py-5">
      <h1>Format Number with Commas Example</h1>

      <section className="ihub-mb-5">
        <div className="ihub-card ihub-p-4">
          <div className="ihub-mb-3">
            <label className="ihub-form-label">Enter a number:</label>
            <input
              type="number"
              className="ihub-form-control"
              value={numberInput}
              onChange={(e) => setNumberInput(Number(e.target.value))}
              placeholder="Enter any number"
              step="0.01"
            />
          </div>
          
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <div className="ihub-alert ihub-alert-secondary">
                <strong>Original Number:</strong>
                <div className="ihub-fs-lg">{numberInput}</div>
              </div>
            </div>
            <div className="ihub-col-md-6">
              <div className="ihub-alert ihub-alert-success">
                <strong>Formatted with Commas:</strong>
                <div className="ihub-fs-lg">{formatNumberWithCommas(numberInput)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Table */}
      <section className="ihub-mb-5">
        <h2>Common Examples</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-table-responsive">
            <table className="ihub-table">
              <thead>
                <tr>
                  <th>Original Number</th>
                  <th>Formatted Result</th>
                  <th>Use Case</th>
                </tr>
              </thead>
              <tbody>
                {examples.map((num, index) => (
                  <tr key={index}>
                    <td><code>{num}</code></td>
                    <td><strong>{formatNumberWithCommas(num)}</strong></td>
                    <td>
                      {num > 1000000 ? 'Large numbers' :
                       num > 1000 ? 'Thousands' :
                       num < 0 ? 'Negative numbers' :
                       num % 1 !== 0 ? 'Decimals' : 'Small numbers'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Financial Examples */}
      <section className="ihub-mb-5">
        <h2>Financial Data Examples</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-row">
            <div className="ihub-col-md-4">
              <div className="ihub-border ihub-p-3 ihub-mb-3">
                <h6>Revenue</h6>
                <div className="ihub-fs-xl text-success">
                  ${formatNumberWithCommas(2567890.45)}
                </div>
              </div>
            </div>
            <div className="ihub-col-md-4">
              <div className="ihub-border ihub-p-3 ihub-mb-3">
                <h6>Users</h6>
                <div className="ihub-fs-xl text-primary">
                  {formatNumberWithCommas(1245632)}
                </div>
              </div>
            </div>
            <div className="ihub-col-md-4">
              <div className="ihub-border ihub-p-3 ihub-mb-3">
                <h6>Downloads</h6>
                <div className="ihub-fs-xl text-info">
                  {formatNumberWithCommas(8976543)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FormatNumberExample;
```

## 🚀 Basic Usage

```tsx
import { formatNumberWithCommas } from '@instincthub/react-ui/lib';

// Basic usage
const price = 1234567.89;
const formattedPrice = formatNumberWithCommas(price);
// Result: "1,234,567.89"

// Common scenarios
const revenue = formatNumberWithCommas(2567890.45);  // "2,567,890.45"
const userCount = formatNumberWithCommas(1245632);   // "1,245,632"
const downloads = formatNumberWithCommas(8976543);   // "8,976,543"
```

## 🔧 Function Signature

```typescript
function formatNumberWithCommas(number: number): string
```

### Parameters

- **number** (number): The numeric value to format

### Returns

- **string**: The formatted number with comma separators

## 💡 Use Cases

- **Financial Data**: Display prices, revenue, costs with proper formatting
- **Statistics**: Show user counts, download numbers, view counts
- **Dashboard Metrics**: Format large numbers in analytics dashboards
- **Reports**: Present numerical data in readable format
- **E-commerce**: Display product prices and inventory counts
- **Data Tables**: Format numerical columns for better readability
- **Charts**: Format axis labels and data points

## 🎨 Display Examples

```tsx
// Financial dashboard
<div className="metric-card">
  <h3>Annual Revenue</h3>
  <span className="amount">${formatNumberWithCommas(2567890.45)}</span>
</div>

// User statistics
<div className="stats">
  <p>Total Users: {formatNumberWithCommas(1245632)}</p>
  <p>Monthly Active: {formatNumberWithCommas(876543)}</p>
</div>

// Product pricing
<div className="price">
  <span className="currency">$</span>
  <span className="amount">{formatNumberWithCommas(1299.99)}</span>
</div>
```

## ⚠️ Important Notes

- Works with both positive and negative numbers
- Preserves decimal places
- Returns a string, not a number
- Does not handle currency symbols (add separately)
- Does not validate input (ensure you pass valid numbers)

## 🔗 Related Functions

- [stripCommaFromNumber](./stripCommaFromNumber.md) - Remove commas from formatted numbers
- [convertToFloat](./convertToFloat.md) - Convert strings to float numbers
- [calculateAmountAfterDeduction](./calculateAmountAfterDeduction.md) - Calculate amounts with deductions