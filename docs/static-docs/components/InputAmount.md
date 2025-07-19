# InputAmount

**Category:** Form | **Type:** component

InputAmount is a specialized input component for handling monetary values with automatic number formatting, currency symbols, and validation. It provides formatted display with comma separators and ensures proper numeric value handling.

## 🏷️ Tags

`form`, `input`, `currency`, `amount`, `money`, `financial`

```tsx
"use client";
import React, { useState } from "react";
import { InputAmount, SubmitButton } from "@instincthub/react-ui";

/**
 * Comprehensive examples demonstrating various ways to use the InputAmount component
 */
const InputAmountExamples = () => {
  // Basic amount state
  const [basicAmount, setBasicAmount] = useState<number>(0);
  
  // Form states for different scenarios
  const [paymentData, setPaymentData] = useState({
    amount: 0,
    tip: 0,
    tax: 0,
  });
  
  const [budgetData, setBudgetData] = useState({
    income: 0,
    rent: 0,
    groceries: 0,
    entertainment: 0,
  });
  
  const [multiCurrencyData, setMultiCurrencyData] = useState({
    usdAmount: 0,
    eurAmount: 0,
    gbpAmount: 0,
    ngnAmount: 0,
  });
  
  const [validationAmount, setValidationAmount] = useState<number>(0);
  const [plainDisplayAmount] = useState<number>(1250000.75);
  
  // Form submission handlers
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = paymentData.amount + paymentData.tip + paymentData.tax;
    console.log("Payment form submitted:", { ...paymentData, total });
    alert(`Payment processed: $${total.toFixed(2)}`);
  };
  
  const handleBudgetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalExpenses = budgetData.rent + budgetData.groceries + budgetData.entertainment;
    const remaining = budgetData.income - totalExpenses;
    console.log("Budget form submitted:", { ...budgetData, totalExpenses, remaining });
    alert(`Budget saved! Remaining: ₦${remaining.toLocaleString()}`);
  };
  
  // Validation function
  const validateAmount = (amount: number): string => {
    if (amount <= 0) return "Amount must be greater than 0";
    if (amount > 1000000) return "Amount cannot exceed ₦1,000,000";
    if (amount < 100) return "Minimum amount is ₦100";
    return "";
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>InputAmount Examples</h1>
      
      {/* Basic Usage */}
      <section className="ihub-mb-5">
        <h2>1. Basic Usage</h2>
        <p>Simple amount input with default Naira currency symbol</p>
        
        <InputAmount
          label="Enter Amount"
          value={basicAmount}
          onChange={(value) => setBasicAmount(value as number)}
          placeholder="0.00"
        />
        
        <p className="ihub-mt-2">Current value: ₦{basicAmount.toLocaleString()}</p>
      </section>
      
      {/* Payment Form Example */}
      <section className="ihub-mb-5">
        <h2>2. Payment Form</h2>
        <p>Complete payment form with amount, tip, and tax calculation</p>
        
        <form onSubmit={handlePaymentSubmit} className="ihub-form">
          <InputAmount
            label="Bill Amount"
            name="amount"
            value={paymentData.amount}
            onChange={(value, name) => 
              setPaymentData(prev => ({ ...prev, [name!]: value as number }))
            }
            currencySymbol="$"
            placeholder="0.00"
            required
          />
          
          <InputAmount
            label="Tip Amount"
            name="tip"
            value={paymentData.tip}
            onChange={(value, name) => 
              setPaymentData(prev => ({ ...prev, [name!]: value as number }))
            }
            currencySymbol="$"
            placeholder="0.00"
          />
          
          <InputAmount
            label="Tax Amount"
            name="tax"
            value={paymentData.tax}
            onChange={(value, name) => 
              setPaymentData(prev => ({ ...prev, [name!]: value as number }))
            }
            currencySymbol="$"
            placeholder="0.00"
          />
          
          <div className="ihub-mt-3 ihub-p-3" style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
            <strong>Total: ${(paymentData.amount + paymentData.tip + paymentData.tax).toFixed(2)}</strong>
          </div>
          
          <SubmitButton 
            label="Process Payment" 
            className="ihub-mt-3"
            type="submit"
          />
        </form>
      </section>
      
      {/* Budget Planning Example */}
      <section className="ihub-mb-5">
        <h2>3. Budget Planning Form</h2>
        <p>Personal budget planning with income and expense tracking</p>
        
        <form onSubmit={handleBudgetSubmit} className="ihub-form">
          <InputAmount
            label="Monthly Income"
            name="income"
            value={budgetData.income}
            onChange={(value, name) => 
              setBudgetData(prev => ({ ...prev, [name!]: value as number }))
            }
            currencySymbol="₦"
            placeholder="0.00"
            required
          />
          
          <div className="ihub-row">
            <div className="ihub-col-md-4">
              <InputAmount
                label="Rent/Mortgage"
                name="rent"
                value={budgetData.rent}
                onChange={(value, name) => 
                  setBudgetData(prev => ({ ...prev, [name!]: value as number }))
                }
                currencySymbol="₦"
                placeholder="0.00"
              />
            </div>
            
            <div className="ihub-col-md-4">
              <InputAmount
                label="Groceries"
                name="groceries"
                value={budgetData.groceries}
                onChange={(value, name) => 
                  setBudgetData(prev => ({ ...prev, [name!]: value as number }))
                }
                currencySymbol="₦"
                placeholder="0.00"
              />
            </div>
            
            <div className="ihub-col-md-4">
              <InputAmount
                label="Entertainment"
                name="entertainment"
                value={budgetData.entertainment}
                onChange={(value, name) => 
                  setBudgetData(prev => ({ ...prev, [name!]: value as number }))
                }
                currencySymbol="₦"
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div className="ihub-mt-3 ihub-p-3" style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
            <div>Total Expenses: ₦{(budgetData.rent + budgetData.groceries + budgetData.entertainment).toLocaleString()}</div>
            <div>Remaining: ₦{(budgetData.income - (budgetData.rent + budgetData.groceries + budgetData.entertainment)).toLocaleString()}</div>
          </div>
          
          <SubmitButton 
            label="Save Budget" 
            className="ihub-mt-3"
            type="submit"
          />
        </form>
      </section>
      
      {/* Multi-Currency Example */}
      <section className="ihub-mb-5">
        <h2>4. Multi-Currency Support</h2>
        <p>Different currency symbols and formatting</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <InputAmount
              label="USD Amount"
              name="usdAmount"
              value={multiCurrencyData.usdAmount}
              onChange={(value, name) => 
                setMultiCurrencyData(prev => ({ ...prev, [name!]: value as number }))
              }
              currencySymbol="$"
              placeholder="0.00"
            />
          </div>
          
          <div className="ihub-col-md-6">
            <InputAmount
              label="EUR Amount"
              name="eurAmount"
              value={multiCurrencyData.eurAmount}
              onChange={(value, name) => 
                setMultiCurrencyData(prev => ({ ...prev, [name!]: value as number }))
              }
              currencySymbol="€"
              placeholder="0.00"
            />
          </div>
          
          <div className="ihub-col-md-6">
            <InputAmount
              label="GBP Amount"
              name="gbpAmount"
              value={multiCurrencyData.gbpAmount}
              onChange={(value, name) => 
                setMultiCurrencyData(prev => ({ ...prev, [name!]: value as number }))
              }
              currencySymbol="£"
              placeholder="0.00"
            />
          </div>
          
          <div className="ihub-col-md-6">
            <InputAmount
              label="NGN Amount"
              name="ngnAmount"
              value={multiCurrencyData.ngnAmount}
              onChange={(value, name) => 
                setMultiCurrencyData(prev => ({ ...prev, [name!]: value as number }))
              }
              currencySymbol="₦"
              placeholder="0.00"
            />
          </div>
        </div>
      </section>
      
      {/* Validation Example */}
      <section className="ihub-mb-5">
        <h2>5. Input Validation</h2>
        <p>Amount input with custom validation rules</p>
        
        <InputAmount
          label="Investment Amount"
          value={validationAmount}
          onChange={(value) => setValidationAmount(value as number)}
          currencySymbol="₦"
          placeholder="100.00"
          min={100}
          max={1000000}
          error={validateAmount(validationAmount)}
          required
        />
        
        <div className="ihub-mt-2">
          <small className="text-muted">
            Minimum: ₦100, Maximum: ₦1,000,000
          </small>
        </div>
      </section>
      
      {/* Plain Display Mode */}
      <section className="ihub-mb-5">
        <h2>6. Plain Display Mode</h2>
        <p>Read-only formatted display without input functionality</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <h5>Account Balance:</h5>
            <InputAmount
              value={plainDisplayAmount}
              currencySymbol="₦"
              plainDisplay={true}
              className="ihub-text-success ihub-fw-bold"
            />
          </div>
          
          <div className="ihub-col-md-6">
            <h5>Total Revenue:</h5>
            <InputAmount
              value={5750000}
              currencySymbol="$"
              plainDisplay={true}
              className="ihub-text-primary ihub-fw-bold"
            />
          </div>
        </div>
      </section>
      
      {/* Disabled and Read-only States */}
      <section className="ihub-mb-5">
        <h2>7. Disabled and Read-only States</h2>
        <p>Different input states for various use cases</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <InputAmount
              label="Disabled Input"
              value={1500000}
              currencySymbol="₦"
              disabled={true}
            />
          </div>
          
          <div className="ihub-col-md-6">
            <InputAmount
              label="Read-only Input"
              value={2750000}
              currencySymbol="₦"
              readOnly={true}
            />
          </div>
        </div>
      </section>
      
      {/* Financial Calculator Example */}
      <section className="ihub-mb-5">
        <h2>8. Loan Calculator</h2>
        <p>Practical financial application example</p>
        
        <div className="ihub-form">
          <div className="ihub-row">
            <div className="ihub-col-md-4">
              <InputAmount
                label="Loan Amount"
                currencySymbol="₦"
                placeholder="500,000.00"
              />
            </div>
            
            <div className="ihub-col-md-4">
              <InputAmount
                label="Down Payment"
                currencySymbol="₦"
                placeholder="100,000.00"
              />
            </div>
            
            <div className="ihub-col-md-4">
              <InputAmount
                label="Monthly Payment"
                currencySymbol="₦"
                placeholder="25,000.00"
                readOnly={true}
                className="ihub-calculated-field"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InputAmountExamples;
```

## 🔗 Related Components

- [InputNumber](./InputNumber.md) - InputNumber component for numerical input
- [InputText](./InputText.md) - InputText component for text input
- [InputTextarea](./InputTextarea.md) - InputTextarea component for text input
- [SearchObjectsFromDB](./SearchObjectsFromDB.md) - SearchObjectsFromDB component for searching objects from database
- [ToggleButton](./ToggleButton.md) - ToggleButton component for changing state

