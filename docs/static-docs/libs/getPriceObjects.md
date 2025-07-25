# getPriceObjects

**Category:** Library | **Type:** utility

A utility function that calculates price details based on user location and promotional offers. Perfect for e-commerce applications, subscription services, and international pricing with currency localization and discount management.

## 📁 File Location

`src/components/lib/getPriceObjects.ts`

## 🏷️ Tags

`pricing`, `currency`, `localization`, `promo`, `discount`, `e-commerce`, `international`

## 📖 Usage Examples

### Example 1: Complete Pricing System Demo

```tsx
"use client";

import React, { useState, useEffect } from "react";
import { getPriceObjects } from "@instincthub/react-ui/lib";

/**
 * Comprehensive example demonstrating getPriceObjects utility
 */
const PricingExamples = () => {
  // Mock Redux state selectors
  const [userLocation, setUserLocation] = useState({
    ip_address: "192.168.1.1",
    currency: "NGN",
    country: "Nigeria"
  });

  const [currentPromo, setCurrentPromo] = useState({
    id: "SUMMER2024",
    percentage: "25",
    name: "Summer Sale",
    active: true
  });

  // Sample products with different pricing tiers
  const [products] = useState([
    {
      id: "basic-plan",
      name: "Basic Plan",
      description: "Perfect for individuals",
      price_tier: {
        NGN: "5,000",
        USD: "12.99"
      },
      features: ["5 Projects", "Basic Support", "1GB Storage"]
    },
    {
      id: "premium-plan", 
      name: "Premium Plan",
      description: "Great for small teams",
      price_tier: {
        NGN: "15,000",
        USD: "29.99"
      },
      features: ["Unlimited Projects", "Priority Support", "10GB Storage"]
    },
    {
      id: "enterprise-plan",
      name: "Enterprise Plan", 
      description: "For large organizations",
      price_tier: {
        NGN: "50,000",
        USD: "99.99"
      },
      features: ["Custom Solutions", "24/7 Support", "Unlimited Storage"]
    },
    {
      id: "free-plan",
      name: "Free Plan",
      description: "Get started for free",
      // No price_tier - will show as FREE
      features: ["1 Project", "Community Support", "100MB Storage"]
    }
  ]);

  // Mock Redux selector functions
  const selectUserLocation = () => userLocation;
  const selectCurrentPromo = () => currentPromo;
  const useSelector = (selector: () => any) => selector();

  const mockReduxProps = {
    selectUserLocation,
    selectCurrentPromo,
    useSelector
  };

  // Calculate prices for all products
  const [productPrices, setProductPrices] = useState<any[]>([]);

  useEffect(() => {
    const calculatedPrices = products.map(product => {
      const priceDetails = getPriceObjects(product, mockReduxProps);
      return {
        ...product,
        priceDetails
      };
    });
    setProductPrices(calculatedPrices);
  }, [userLocation, currentPromo]);

  const togglePromo = () => {
    setCurrentPromo(prev => ({
      ...prev,
      id: prev.id ? "" : "SUMMER2024",
      percentage: prev.percentage ? "" : "25"
    }));
  };

  const changeCurrency = (newCurrency: string) => {
    setUserLocation(prev => ({
      ...prev,
      currency: newCurrency
    }));
  };

  const changePromoPercentage = (percentage: string) => {
    setCurrentPromo(prev => ({
      ...prev,
      percentage: percentage
    }));
  };

  return (
    <div className="ihub-container ihub-py-5">
      <h1>getPriceObjects Utility Examples</h1>

      {/* Controls */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Pricing Controls</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-p-4">
              <h6>Currency Settings</h6>
              <div className="ihub-mb-3">
                <label className="ihub-form-label">User Location:</label>
                <select
                  className="ihub-form-control"
                  value={userLocation.currency}
                  onChange={(e) => changeCurrency(e.target.value)}
                >
                  <option value="NGN">Nigeria (NGN)</option>
                  <option value="USD">United States (USD)</option>
                </select>
              </div>
              <div className="ihub-alert ihub-alert-info ihub-p-2">
                <small>
                  <strong>IP:</strong> {userLocation.ip_address}<br />
                  <strong>Currency:</strong> {userLocation.currency}
                </small>
              </div>
            </div>
          </div>

          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-p-4">
              <h6>Promotional Settings</h6>
              <div className="ihub-mb-3">
                <div className="ihub-form-check">
                  <input
                    type="checkbox"
                    className="ihub-form-check-input"
                    checked={Boolean(currentPromo.id)}
                    onChange={togglePromo}
                  />
                  <label className="ihub-form-check-label">
                    Enable Promo Code
                  </label>
                </div>
              </div>
              
              {currentPromo.id && (
                <>
                  <div className="ihub-mb-2">
                    <label className="ihub-form-label">Discount %:</label>
                    <select
                      className="ihub-form-control"
                      value={currentPromo.percentage}
                      onChange={(e) => changePromoPercentage(e.target.value)}
                    >
                      <option value="10">10%</option>
                      <option value="15">15%</option>
                      <option value="25">25%</option>
                      <option value="50">50%</option>
                    </select>
                  </div>
                  <div className="ihub-alert ihub-alert-success ihub-p-2">
                    <small>
                      <strong>Code:</strong> {currentPromo.id}<br />
                      <strong>Discount:</strong> {currentPromo.percentage}%
                    </small>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-p-4">
              <h6>Pricing Logic</h6>
              <ul className="ihub-list-unstyled" style={{ fontSize: "13px" }}>
                <li className="ihub-mb-1">• Currency auto-detects from location</li>
                <li className="ihub-mb-1">• Temporarily defaults to NGN</li>
                <li className="ihub-mb-1">• Promo discounts applied when active</li>
                <li className="ihub-mb-1">• No price_tier = FREE plan</li>
                <li className="ihub-mb-1">• Prices formatted with currency symbols</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Product Pricing Display */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Product Pricing</h2>
        <div className="ihub-row">
          {productPrices.map((product, index) => (
            <div key={product.id} className="ihub-col-md-6 ihub-mb-4">
              <div className="ihub-card ihub-h-100">
                <div className="ihub-card-header ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                  <h5 className="ihub-mb-0">{product.name}</h5>
                  {product.priceDetails.is_promo_running && (
                    <span className="ihub-badge ihub-badge-danger">
                      {currentPromo.percentage}% OFF
                    </span>
                  )}
                </div>
                
                <div className="ihub-card-body">
                  <p className="text-muted">{product.description}</p>
                  
                  {/* Pricing Display */}
                  <div className="ihub-mb-3">
                    {product.priceDetails.price === "FREE" ? (
                      <div className="text-center">
                        <h3 className="text-success">FREE</h3>
                      </div>
                    ) : (
                      <div className="text-center">
                        {product.priceDetails.is_promo_running ? (
                          <>
                            <h3 className="text-primary ihub-mb-1">
                              {product.priceDetails.price}
                              <small className="text-muted">/{product.priceDetails.currency}</small>
                            </h3>
                            <div className="text-muted">
                              <del>{product.priceDetails.symbol}{product.price_tier?.[product.priceDetails.currency]}</del>
                              <span className="text-success ihub-ms-2">
                                Save {product.priceDetails.discounted_price}
                              </span>
                            </div>
                          </>
                        ) : (
                          <h3 className="text-primary">
                            {product.priceDetails.price}
                            <small className="text-muted">/{product.priceDetails.currency}</small>
                          </h3>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="ihub-list-unstyled">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="ihub-mb-1">
                        <i className="pi pi-check text-success ihub-me-2"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price Details Debug */}
                  <div className="ihub-mt-3">
                    <button
                      className="ihub-btn ihub-btn-outline-info ihub-btn-sm"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#priceDetails${index}`}
                    >
                      View Price Details
                    </button>
                    <div className="collapse ihub-mt-2" id={`priceDetails${index}`}>
                      <pre className="ihub-bg-light ihub-p-2" style={{ fontSize: "10px" }}>
                        {JSON.stringify(product.priceDetails, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="ihub-card-footer">
                  <button className="ihub-btn ihub-btn-primary ihub-w-100">
                    {product.priceDetails.price === "FREE" ? "Get Started" : "Subscribe Now"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Implementation Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Implementation Patterns</h2>
        
        {/* Redux Integration */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-database ihub-me-2"></i>
              Redux Integration Pattern
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Redux store setup for pricing
import { createSlice } from '@reduxjs/toolkit';

// Location slice
const locationSlice = createSlice({
  name: 'location',
  initialState: {
    ip_address: null,
    currency: 'USD',
    country: null,
    detected: false
  },
  reducers: {
    setUserLocation: (state, action) => {
      Object.assign(state, action.payload);
      state.detected = true;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    }
  }
});

// Promo slice
const promoSlice = createSlice({
  name: 'promo',
  initialState: {
    id: null,
    percentage: null,
    name: null,
    active: false
  },
  reducers: {
    setCurrentPromo: (state, action) => {
      Object.assign(state, action.payload);
    },
    clearPromo: (state) => {
      state.id = null;
      state.percentage = null;
      state.active = false;
    }
  }
});

// Selectors
export const selectUserLocation = (state) => state.location;
export const selectCurrentPromo = (state) => state.promo;

// Usage in component
import { useSelector } from 'react-redux';
import { getPriceObjects } from '@instincthub/react-ui/lib';

const ProductCard = ({ product }) => {
  const priceDetails = getPriceObjects(product, {
    selectUserLocation,
    selectCurrentPromo,
    useSelector
  });

  return (
    <div>
      <h3>{product.name}</h3>
      <p>Price: {priceDetails.price}</p>
      {priceDetails.is_promo_running && (
        <p>You save: {priceDetails.discounted_price}</p>
      )}
    </div>
  );
};`}
            </pre>
          </div>
        </div>

        {/* Custom Hook Pattern */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-code ihub-me-2"></i>
              Custom Pricing Hook
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Custom hook for pricing calculations
import { useMemo } from 'react';
import { getPriceObjects } from '@instincthub/react-ui/lib';

interface UsePricingProps {
  products: any[];
  userLocation: any;
  currentPromo: any;
}

export const usePricing = ({ products, userLocation, currentPromo }: UsePricingProps) => {
  const mockReduxProps = {
    selectUserLocation: () => userLocation,
    selectCurrentPromo: () => currentPromo,
    useSelector: (selector: () => any) => selector()
  };

  const pricedProducts = useMemo(() => {
    return products.map(product => ({
      ...product,
      pricing: getPriceObjects(product, mockReduxProps)
    }));
  }, [products, userLocation, currentPromo]);

  const totalValue = useMemo(() => {
    return pricedProducts.reduce((total, product) => {
      if (product.pricing.formatted_price) {
        return total + product.pricing.formatted_price;
      }
      return total;
    }, 0);
  }, [pricedProducts]);

  const totalSavings = useMemo(() => {
    return pricedProducts.reduce((savings, product) => {
      if (product.pricing.is_promo_running && product.price_tier) {
        const originalPrice = parseFloat(
          product.price_tier[userLocation.currency]?.replaceAll(',', '') || '0'
        );
        return savings + (originalPrice - (product.pricing.formatted_price || 0));
      }
      return savings;
    }, 0);
  }, [pricedProducts, userLocation.currency]);

  return {
    pricedProducts,
    totalValue,
    totalSavings,
    currency: userLocation.currency,
    hasActivePromo: currentPromo.id && currentPromo.percentage
  };
};

// Usage
const ShoppingCart = () => {
  const { pricedProducts, totalValue, totalSavings } = usePricing({
    products: cartItems,
    userLocation,
    currentPromo
  });

  return (
    <div>
      {pricedProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
      <div>
        <p>Total: {totalValue}</p>
        {totalSavings > 0 && <p>You Save: {totalSavings}</p>}
      </div>
    </div>
  );
};`}
            </pre>
          </div>
        </div>

        {/* International Pricing Strategy */}
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-globe ihub-me-2"></i>
              International Pricing Strategy
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Advanced pricing with purchasing power parity
const getLocalizedPricing = (baseProduct: any, userLocation: any) => {
  // Base pricing tiers
  const basePrice = {
    NGN: "10,000",
    USD: "25.00",
    EUR: "22.00",
    GBP: "20.00"
  };

  // Purchasing power adjustments
  const ppAdjustments = {
    NGN: 0.3, // Lower cost for Nigerian market
    USD: 1.0,  // Base pricing
    EUR: 1.1,  // Slightly higher for EU
    GBP: 1.15  // Highest for UK market
  };

  // Apply regional adjustments
  const adjustedProduct = {
    ...baseProduct,
    price_tier: Object.keys(basePrice).reduce((acc, currency) => {
      const base = parseFloat(basePrice[currency].replace(',', ''));
      const adjusted = base * ppAdjustments[currency];
      acc[currency] = adjusted.toLocaleString();
      return acc;
    }, {})
  };

  return adjustedProduct;
};

// Dynamic pricing based on user behavior
const getDynamicPricing = (product: any, userProfile: any) => {
  let discountPercentage = 0;

  // First-time user discount
  if (userProfile.isFirstTime) {
    discountPercentage += 15;
  }

  // Loyalty discount
  if (userProfile.loyaltyTier === 'gold') {
    discountPercentage += 10;
  }

  // Volume discount
  if (userProfile.cartValue > 100) {
    discountPercentage += 5;
  }

  return {
    id: 'DYNAMIC_PRICING',
    percentage: discountPercentage.toString(),
    name: 'Personalized Discount',
    active: discountPercentage > 0
  };
};`}
            </pre>
          </div>
        </div>
      </section>

      {/* Currency Support */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Currency Support</h2>
        <div className="ihub-card ihub-p-4">
          <h6>Supported Currencies</h6>
          <div className="ihub-row">
            {[
              { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
              { code: "USD", symbol: "$", name: "US Dollar" },
              { code: "EUR", symbol: "€", name: "Euro" },
              { code: "GBP", symbol: "£", name: "British Pound" },
              { code: "JPY", symbol: "¥", name: "Japanese Yen" },
              { code: "CAD", symbol: "C$", name: "Canadian Dollar" }
            ].map((currency, index) => (
              <div key={index} className="ihub-col-md-4 ihub-mb-2">
                <div className="ihub-d-flex ihub-align-items-center">
                  <span className="ihub-badge ihub-badge-light ihub-me-2">
                    {currency.symbol}
                  </span>
                  <div>
                    <strong>{currency.code}</strong><br />
                    <small className="text-muted">{currency.name}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="ihub-alert ihub-alert-info ihub-mt-3">
            <strong>Note:</strong> The function currently defaults to NGN (Nigerian Naira) but supports 
            automatic currency detection based on user location. Add more currencies by extending 
            the CURRENCY_SYMBOL object in utils.ts.
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingExamples;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { getPriceObjects } from '@instincthub/react-ui/lib';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { getPriceObjects } from '@instincthub/react-ui/lib';

function ProductCard({ product }) {
  const priceDetails = getPriceObjects(product, {
    selectUserLocation: () => useSelector(state => state.location),
    selectCurrentPromo: () => useSelector(state => state.promo),
    useSelector
  });

  return (
    <div>
      <h3>{product.name}</h3>
      <p>Price: {priceDetails.price}</p>
      {priceDetails.is_promo_running && (
        <p>Save: {priceDetails.discounted_price}</p>
      )}
    </div>
  );
}
```

## 🔧 Function Signature

```tsx
getPriceObjects(
  objects: ProductObject,
  props: GetPriceObjectsProps
): PriceObjectsResult
```

### Parameters

- `objects` (ProductObject): Product with pricing information
- `props` (GetPriceObjectsProps): Redux selector functions

### Interfaces

```tsx
interface ProductObject {
  price_tier?: PriceTier;
  [key: string]: any;
}

interface PriceTier {
  [currency: string]: string;
}

interface GetPriceObjectsProps {
  selectCurrentPromo: () => PromoState;
  selectUserLocation: () => LocationState;
  useSelector: <T>(selector: () => T) => T;
}

interface PriceObjectsResult {
  currency: string;
  price: string;
  formatted_price?: number;
  discounted_price?: string;
  promo: PromoState;
  symbol: string;
  is_promo_running: boolean;
  ip_address?: string;
}
```

### Returns

- `PriceObjectsResult`: Complete pricing information object

## 📝 Key Features

- **Multi-Currency Support**: Handles NGN and USD with extensible currency system
- **Promotional Pricing**: Applies percentage-based discounts automatically
- **Location-Based Pricing**: Uses user location to determine appropriate currency
- **Free Tier Support**: Handles products without price_tier as "FREE"
- **Number Formatting**: Formats prices with proper currency symbols and commas
- **Redux Integration**: Seamlessly integrates with Redux state management

## 💡 Use Cases

- **SaaS Pricing**: Display subscription plans with regional pricing
- **E-commerce**: Show product prices with promotional discounts
- **International Markets**: Handle multiple currencies and regions
- **Subscription Services**: Manage tiered pricing with promotions
- **Course Platforms**: Display course prices with student discounts
- **Digital Products**: Handle software licensing with regional pricing
- **Marketplace Applications**: Support multiple vendors and currencies

## 🌍 Currency Logic

1. **Detection**: Reads user currency from location state
2. **Fallback**: Defaults to NGN if currency not NGN
3. **Pricing**: Looks up price in product's price_tier object
4. **Formatting**: Applies currency symbol from CURRENCY_SYMBOL mapping
5. **Promotion**: Calculates discount if promo is active
6. **Output**: Returns formatted price string with currency symbol

## 🏷️ Promotional System

- **Percentage-Based**: Supports percentage discounts (e.g., "25" for 25%)
- **Active Status**: Only applies when promo has ID and percentage
- **Calculation**: Discount = (price × percentage) / 100
- **Display**: Shows both discounted price and savings amount
- **Integration**: Works with Redux promo state management

## 🔗 Related Utilities

- [formatNumberWithCommas](./helpFunction.md#formatnumberwithcommas) - Number formatting utility
- [CURRENCY_SYMBOL](./utils.md#currency-symbol) - Currency symbol mappings
- [utils](./utils.md) - Currency and pricing constants