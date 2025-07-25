# Nigeria Country Information

**Category:** Library | **Type:** geographic data

Comprehensive country information for Nigeria including geographic coordinates, timezone data, currency, and communication details. Provides standardized country data for Nigerian applications and international systems.

## 📁 File Location

`src/components/lib/json/countryNigeria.ts`

## 🏷️ Tags

`nigeria`, `country`, `geography`, `timezone`, `currency`, `international`, `localization`, `data`

## 📖 Usage Examples

### Example 1: Nigerian Application Configuration System

```tsx
"use client";

import React, { useState, useEffect } from "react";
import countryNigeria from "@instincthub/react-ui/lib";

/**
 * Nigerian application configuration and information display
 */
const NigerianAppConfiguration = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [timeZoneInfo, setTimeZoneInfo] = useState<any>(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time in Nigerian timezone
  const formatNigerianTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-NG', {
      timeZone: countryNigeria.timezones[0].zoneName,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    }).format(date);
  };

  // Format currency
  const formatNigerianCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: countryNigeria.currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Sample pricing data
  const samplePrices = [
    { item: "Course Subscription", amount: 25000 },
    { item: "Premium Workshop", amount: 50000 },
    { item: "Certification Fee", amount: 15000 },
    { item: "Monthly Subscription", amount: 5000 }
  ];

  return (
    <div className="ihub-container ihub-py-5">
      <h1>Nigeria Country Configuration</h1>
      
      {/* Country Overview */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Country Overview</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <div className="ihub-d-flex ihub-align-items-center ihub-mb-3">
                <span style={{ fontSize: "48px" }}>{countryNigeria.flag}</span>
                <div className="ihub-ms-3">
                  <h3 className="ihub-mb-1">{countryNigeria.name}</h3>
                  <div className="text-muted">ISO Code: {countryNigeria.isoCode}</div>
                </div>
              </div>
              
              <div className="ihub-row ihub-text-sm">
                <div className="ihub-col-6">
                  <strong>Phone Code:</strong> +{countryNigeria.phonecode}
                </div>
                <div className="ihub-col-6">
                  <strong>Currency:</strong> {countryNigeria.currency}
                </div>
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h5>Geographic Coordinates</h5>
              <div className="ihub-mb-3">
                <div className="ihub-d-flex ihub-justify-content-between">
                  <strong>Latitude:</strong>
                  <span>{countryNigeria.latitude}°</span>
                </div>
                <div className="ihub-d-flex ihub-justify-content-between">
                  <strong>Longitude:</strong>
                  <span>{countryNigeria.longitude}°</span>
                </div>
              </div>
              
              <div className="ihub-alert ihub-alert-info">
                <small>
                  <i className="pi pi-info-circle ihub-me-1"></i>
                  Coordinates represent the approximate center of Nigeria
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timezone Information */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Timezone Information</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <h5>Current Time in Nigeria</h5>
              <div className="ihub-display-6 ihub-text-primary ihub-mb-3">
                {formatNigerianTime(currentTime)}
              </div>
              
              <div className="ihub-mb-3">
                <div className="ihub-d-flex ihub-justify-content-between ihub-mb-2">
                  <strong>Zone Name:</strong>
                  <span>{countryNigeria.timezones[0].zoneName}</span>
                </div>
                <div className="ihub-d-flex ihub-justify-content-between ihub-mb-2">
                  <strong>Abbreviation:</strong>
                  <span>{countryNigeria.timezones[0].abbreviation}</span>
                </div>
                <div className="ihub-d-flex ihub-justify-content-between ihub-mb-2">
                  <strong>Time Zone Name:</strong>
                  <span>{countryNigeria.timezones[0].tzName}</span>
                </div>
                <div className="ihub-d-flex ihub-justify-content-between">
                  <strong>GMT Offset:</strong>
                  <span>{countryNigeria.timezones[0].gmtOffsetName}</span>
                </div>
              </div>
            </div>
            
            <div className="ihub-col-md-6">
              <h5>Timezone Details</h5>
              <div className="ihub-bg-light ihub-p-3 ihub-rounded">
                <pre style={{ fontSize: "12px", margin: 0 }}>
                  {JSON.stringify(countryNigeria.timezones[0], null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Currency Integration */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Currency Integration</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-8">
            <div className="ihub-card ihub-p-4">
              <h5>Sample Pricing (Nigerian Naira)</h5>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Item</th>
                      <th>Amount (Kobo)</th>
                      <th>Formatted Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {samplePrices.map((price, index) => (
                      <tr key={index}>
                        <td>{price.item}</td>
                        <td>{price.amount.toLocaleString()}</td>
                        <td className="ihub-fw-bold text-primary">
                          {formatNigerianCurrency(price.amount / 100)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-p-4">
              <h6>Currency Information</h6>
              <div className="ihub-mb-3">
                <div className="ihub-text-center">
                  <div style={{ fontSize: "48px" }}>₦</div>
                  <div><strong>Nigerian Naira</strong></div>
                  <div className="text-muted">NGN</div>
                </div>
              </div>
              
              <div className="ihub-alert ihub-alert-info">
                <small>
                  <strong>Note:</strong> Payment amounts are typically processed in kobo (1/100 of Naira)
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phone Number Integration */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Phone Number Integration</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h5>Phone Number Formatter</h5>
              <div className="ihub-mb-3">
                <label className="ihub-form-label">Enter Nigerian Phone Number</label>
                <div className="ihub-input-group">
                  <span className="ihub-input-group-text">
                    +{countryNigeria.phonecode}
                  </span>
                  <input
                    type="tel"
                    className="ihub-form-control"
                    placeholder="8012345678"
                    maxLength={10}
                  />
                </div>
                <small className="text-muted">
                  Format: +234XXXXXXXXXX (without leading 0)
                </small>
              </div>
              
              <div className="ihub-alert ihub-alert-info">
                <strong>Common Formats:</strong>
                <ul className="ihub-mb-0 ihub-mt-2">
                  <li>+2348012345678 (International)</li>
                  <li>08012345678 (National)</li>
                  <li>8012345678 (Local)</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4">
              <h5>Phone Validation Helper</h5>
              <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "10px" }}>
{`// Nigerian phone validation
const validateNigerianPhone = (phone: string) => {
  // Remove all non-digits
  const digits = phone.replace(/\\D/g, '');
  
  // Check various formats
  if (digits.startsWith('234')) {
    // International format: 2348012345678
    return digits.length === 13;
  } else if (digits.startsWith('0')) {
    // National format: 08012345678
    return digits.length === 11;
  } else {
    // Local format: 8012345678
    return digits.length === 10;
  }
};

// Format to international
const formatToInternational = (phone: string) => {
  const digits = phone.replace(/\\D/g, '');
  
  if (digits.startsWith('234')) {
    return '+' + digits;
  } else if (digits.startsWith('0')) {
    return '+234' + digits.substring(1);
  } else {
    return '+234' + digits;
  }
};`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Application Integration Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Application Integration</h2>
        
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-cog ihub-me-2"></i>
              Localization Configuration
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Application configuration using Nigeria data
import countryNigeria from '@instincthub/react-ui/lib';

const AppConfig = {
  // Localization settings
  locale: 'en-NG',
  country: countryNigeria.isoCode,
  currency: countryNigeria.currency,
  timezone: countryNigeria.timezones[0].zoneName,
  
  // Phone number settings
  phoneCode: countryNigeria.phonecode,
  phoneFormat: '+234XXXXXXXXXX',
  
  // Geographic settings
  defaultLocation: {
    lat: parseFloat(countryNigeria.latitude),
    lng: parseFloat(countryNigeria.longitude)
  },
  
  // Format functions
  formatCurrency: (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: countryNigeria.currency
    }).format(amount);
  },
  
  formatTime: (date: Date) => {
    return new Intl.DateTimeFormat('en-NG', {
      timeZone: countryNigeria.timezones[0].zoneName,
      dateStyle: 'full',
      timeStyle: 'medium'
    }).format(date);
  },
  
  formatPhone: (phone: string) => {
    const digits = phone.replace(/\\D/g, '');
    if (digits.startsWith('0')) {
      return \`+\${countryNigeria.phonecode}\${digits.substring(1)}\`;
    }
    return \`+\${countryNigeria.phonecode}\${digits}\`;
  }
};

export default AppConfig;`}
            </pre>
          </div>
        </div>

        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-map ihub-me-2"></i>
              Geographic Integration
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Map integration with Nigerian coordinates
import countryNigeria from '@instincthub/react-ui/lib';

const MapComponent = () => {
  const [mapCenter, setMapCenter] = useState({
    lat: parseFloat(countryNigeria.latitude),
    lng: parseFloat(countryNigeria.longitude)
  });

  const nigerianBounds = {
    north: 13.9,
    south: 4.3,
    east: 14.7,
    west: 2.7
  };

  const isInNigeria = (lat: number, lng: number) => {
    return lat >= nigerianBounds.south && 
           lat <= nigerianBounds.north &&
           lng >= nigerianBounds.west && 
           lng <= nigerianBounds.east;
  };

  return (
    <div className="map-container">
      <div className="map-info">
        <h3>{countryNigeria.flag} {countryNigeria.name}</h3>
        <p>Center: {countryNigeria.latitude}°, {countryNigeria.longitude}°</p>
        <p>Timezone: {countryNigeria.timezones[0].tzName}</p>
      </div>
      
      {/* Map component would go here */}
      <div className="map-placeholder">
        <p>Map centered on Nigeria</p>
        <small>Coordinates: {mapCenter.lat}, {mapCenter.lng}</small>
      </div>
    </div>
  );
};`}
            </pre>
          </div>
        </div>
      </section>

      {/* Country Data Display */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Complete Country Data</h2>
        <div className="ihub-card ihub-p-4">
          <h6>Raw Country Object</h6>
          <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px", maxHeight: "400px", overflow: "auto" }}>
            {JSON.stringify(countryNigeria, null, 2)}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default NigerianAppConfiguration;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import countryNigeria from '@instincthub/react-ui/lib';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import countryNigeria from '@instincthub/react-ui/lib';

function NigerianInfo() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: countryNigeria.currency
    }).format(amount);
  };

  return (
    <div>
      <h1>{countryNigeria.flag} {countryNigeria.name}</h1>
      <p>Currency: {formatCurrency(1000)}</p>
      <p>Phone: +{countryNigeria.phonecode}</p>
      <p>Timezone: {countryNigeria.timezones[0].tzName}</p>
    </div>
  );
}
```

## 🔧 Data Structure Reference

### Country Information

```tsx
interface CountryNigeria {
  name: string;              // "Nigeria"
  isoCode: string;           // "NG"
  flag: string;              // "🇳🇬"
  phonecode: string;         // "234"
  currency: string;          // "NGN"
  latitude: string;          // "10.00000000"
  longitude: string;         // "8.00000000"
  timezones: TimezoneInfo[];
}

interface TimezoneInfo {
  zoneName: string;          // "Africa/Lagos"
  gmtOffset: number;         // 3600 (seconds)
  gmtOffsetName: string;     // "UTC+01:00"
  abbreviation: string;      // "WAT"
  tzName: string;           // "West Africa Time"
}
```

## 💡 Use Cases

### Nigerian Applications
- **Localization**: Configure apps specifically for Nigerian users
- **Currency Display**: Format prices in Nigerian Naira
- **Phone Validation**: Validate Nigerian phone number formats
- **Timezone Handling**: Display times in West Africa Time (WAT)

### International Systems
- **Country Selection**: Include Nigeria in country dropdowns
- **Geographic Services**: Location-based services for Nigeria
- **Currency Exchange**: Nigerian Naira in currency conversion
- **Communication**: Nigerian phone number formatting

### E-commerce & Payments
- **Pricing Display**: Format currency for Nigerian market
- **Payment Integration**: Configure Naira-based payments
- **Tax Calculation**: Geographic-based tax calculation
- **Shipping**: Nigerian address and location handling

## 🎯 Integration Features

### Currency Integration
- **Naira Formatting**: Proper currency symbol and formatting
- **Kobo Support**: Handle subdivisions (1 Naira = 100 Kobo)
- **Payment Gateways**: Integration with Nigerian payment systems
- **Exchange Rates**: Base currency for conversion calculations

### Timezone Management
- **WAT Support**: West Africa Time zone handling
- **GMT+1**: Single timezone for entire country
- **Date Formatting**: Nigerian-appropriate date/time display
- **Scheduling**: Handle appointments and events in local time

### Phone Number Handling
- **Country Code**: +234 prefix for international numbers
- **Format Validation**: Support for Nigerian phone formats
- **Mobile Networks**: Compatible with Nigerian telecom providers
- **SMS Services**: Proper number formatting for messaging

## 🌍 Geographic Applications

### Location Services
- **Map Centering**: Default center point for Nigerian maps
- **Boundary Detection**: Determine if coordinates are within Nigeria
- **Regional Services**: Location-based feature availability
- **Address Validation**: Nigerian address format support

### Coordinate System
- **Decimal Degrees**: Standard coordinate format
- **Map Integration**: Compatible with mapping services
- **GPS Services**: Mobile location services
- **Geographic Queries**: Spatial database operations

## 🔒 Best Practices

### Data Usage
- **Immutability**: Treat country data as read-only constants
- **Caching**: Cache formatted values for performance
- **Validation**: Always validate user input against country standards
- **Fallbacks**: Provide fallback values for missing data

### Localization
- **Number Formatting**: Use native Intl API for formatting
- **Date Handling**: Respect local date/time conventions
- **Currency Display**: Follow Nigerian currency conventions
- **Phone Numbers**: Support multiple Nigerian number formats

## ⚠️ Important Considerations

- **Single Timezone**: Nigeria uses only one timezone (WAT)
- **Currency Subdivision**: Amounts often stored in kobo (1/100 Naira)
- **Phone Formats**: Multiple valid formats for Nigerian numbers
- **Geographic Precision**: Coordinates are approximate country center
- **Data Currency**: Information should be periodically verified

## 🔗 Related Utilities

- [countryObjects](./json-countryObjects.md) - Complete global country database
- [json-accounts](./json-accounts.md) - Nigerian states and regional data
- [utils](./utils.md) - Currency symbols and international constants
- [paystack](./paystack.md) - Nigerian payment integration utilities