# Global Country Objects Database

**Category:** Library | **Type:** geographic database

Comprehensive global country database with detailed information for 195+ countries including geographic coordinates, timezone data, currency information, phone codes, and flag emojis. Essential for international applications requiring country selection and localization.

## 📁 File Location

`src/components/lib/json/countryObjects.ts`

## 🏷️ Tags

`countries`, `international`, `geographic`, `currency`, `timezone`, `flags`, `phone-codes`, `localization`, `global`

## 📖 Usage Examples

### Example 1: International Application Dashboard

```tsx
"use client";

import React, { useState, useMemo } from "react";
import countryObjects from "@instincthub/react-ui/lib";

/**
 * International application with comprehensive country features
 */
const InternationalAppDashboard = () => {
  const [selectedCountry, setSelectedCountry] = useState(countryObjects[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCurrency, setFilterCurrency] = useState("");
  const [sortBy, setSortBy] = useState<string>("name");

  // Get unique currencies for filter
  const uniqueCurrencies = useMemo(() => {
    const currencies = [...new Set(countryObjects.map(country => country.currency))];
    return currencies.sort();
  }, []);

  // Filter and sort countries
  const filteredCountries = useMemo(() => {
    let filtered = countryObjects.filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           country.isoCode.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCurrency = !filterCurrency || country.currency === filterCurrency;
      return matchesSearch && matchesCurrency;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "currency":
          return a.currency.localeCompare(b.currency);
        case "phonecode":
          return a.phonecode.localeCompare(b.phonecode);
        default:
          return 0;
      }
    });
  }, [searchTerm, filterCurrency, sortBy]);

  // Get continent statistics
  const continentStats = useMemo(() => {
    const stats: Record<string, number> = {};
    countryObjects.forEach(country => {
      // Approximate continent detection based on timezone
      const timezone = country.timezones[0]?.zoneName || "";
      let continent = "Other";
      
      if (timezone.includes("Europe")) continent = "Europe";
      else if (timezone.includes("America")) continent = "Americas";
      else if (timezone.includes("Asia") || timezone.includes("Calcutta") || timezone.includes("Shanghai")) continent = "Asia";
      else if (timezone.includes("Africa")) continent = "Africa";
      else if (timezone.includes("Australia") || timezone.includes("Pacific")) continent = "Oceania";
      
      stats[continent] = (stats[continent] || 0) + 1;
    });
    return stats;
  }, []);

  // Format time for selected country
  const getCountryTime = (country: typeof countryObjects[0]) => {
    if (!country.timezones.length) return "N/A";
    
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: country.timezones[0].zoneName,
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      }).format(new Date());
    } catch {
      return "Invalid timezone";
    }
  };

  // Format phone number
  const formatPhoneNumber = (country: typeof countryObjects[0], localNumber: string) => {
    return `+${country.phonecode} ${localNumber}`;
  };

  return (
    <div className="ihub-container ihub-py-5">
      <h1>Global Country Database</h1>
      
      {/* Database Overview */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Database Overview</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-3 ihub-mb-3">
            <div className="ihub-card ihub-p-3 ihub-text-center">
              <h3 className="text-primary">{countryObjects.length}</h3>
              <small>Countries</small>
            </div>
          </div>
          <div className="ihub-col-md-3 ihub-mb-3">
            <div className="ihub-card ihub-p-3 ihub-text-center">
              <h3 className="text-success">{uniqueCurrencies.length}</h3>
              <small>Currencies</small>
            </div>
          </div>
          <div className="ihub-col-md-3 ihub-mb-3">
            <div className="ihub-card ihub-p-3 ihub-text-center">
              <h3 className="text-warning">{Object.keys(continentStats).length}</h3>
              <small>Continents</small>
            </div>
          </div>
          <div className="ihub-col-md-3 ihub-mb-3">
            <div className="ihub-card ihub-p-3 ihub-text-center">
              <h3 className="text-info">
                {countryObjects.reduce((total, country) => total + country.timezones.length, 0)}
              </h3>
              <small>Timezones</small>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="ihub-mb-4">
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <div className="ihub-input-group">
              <span className="ihub-input-group-text">
                <i className="pi pi-search"></i>
              </span>
              <input
                type="text"
                className="ihub-form-control"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="ihub-col-md-3">
            <select
              className="ihub-form-control"
              value={filterCurrency}
              onChange={(e) => setFilterCurrency(e.target.value)}
            >
              <option value="">All Currencies</option>
              {uniqueCurrencies.map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          
          <div className="ihub-col-md-3">
            <select
              className="ihub-form-control"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="currency">Sort by Currency</option>
              <option value="phonecode">Sort by Phone Code</option>
            </select>
          </div>
          
          <div className="ihub-col-md-2">
            <div className="ihub-text-center">
              <span className="ihub-badge ihub-badge-info">
                {filteredCountries.length} results
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Country Details */}
      {selectedCountry && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">Selected Country</h2>
          <div className="ihub-card">
            <div className="ihub-row ihub-g-0">
              <div className="ihub-col-md-4">
                <div className="ihub-card-body ihub-text-center ihub-p-4">
                  <div style={{ fontSize: "80px" }}>{selectedCountry.flag}</div>
                  <h3>{selectedCountry.name}</h3>
                  <p className="text-muted">{selectedCountry.isoCode}</p>
                </div>
              </div>
              
              <div className="ihub-col-md-8">
                <div className="ihub-card-body ihub-p-4">
                  <div className="ihub-row">
                    <div className="ihub-col-md-6">
                      <h6>Basic Information</h6>
                      <div className="ihub-mb-2">
                        <strong>ISO Code:</strong> {selectedCountry.isoCode}
                      </div>
                      <div className="ihub-mb-2">
                        <strong>Phone Code:</strong> +{selectedCountry.phonecode}
                      </div>
                      <div className="ihub-mb-2">
                        <strong>Currency:</strong> {selectedCountry.currency}
                      </div>
                      <div className="ihub-mb-2">
                        <strong>Current Time:</strong><br />
                        <small>{getCountryTime(selectedCountry)}</small>
                      </div>
                    </div>
                    
                    <div className="ihub-col-md-6">
                      <h6>Geographic Data</h6>
                      <div className="ihub-mb-2">
                        <strong>Latitude:</strong> {selectedCountry.latitude}°
                      </div>
                      <div className="ihub-mb-2">
                        <strong>Longitude:</strong> {selectedCountry.longitude}°
                      </div>
                      <div className="ihub-mb-2">
                        <strong>Timezones:</strong> {selectedCountry.timezones.length}
                      </div>
                      {selectedCountry.timezones.length > 0 && (
                        <div className="ihub-mb-2">
                          <strong>Primary TZ:</strong><br />
                          <small>{selectedCountry.timezones[0].tzName}</small>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Timezone Details */}
                  {selectedCountry.timezones.length > 0 && (
                    <div className="ihub-mt-3">
                      <h6>Timezone Information</h6>
                      <div className="table-responsive">
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th>Zone Name</th>
                              <th>Abbreviation</th>
                              <th>GMT Offset</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedCountry.timezones.slice(0, 3).map((tz, index) => (
                              <tr key={index}>
                                <td><small>{tz.zoneName}</small></td>
                                <td><span className="ihub-badge ihub-badge-light">{tz.abbreviation}</span></td>
                                <td><small>{tz.gmtOffsetName}</small></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {selectedCountry.timezones.length > 3 && (
                          <small className="text-muted">
                            +{selectedCountry.timezones.length - 3} more timezones
                          </small>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Country Grid */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Country Selection</h2>
        <div className="ihub-row">
          {filteredCountries.slice(0, 12).map((country) => (
            <div key={country.isoCode} className="ihub-col-md-3 ihub-col-sm-6 ihub-mb-3">
              <div 
                className={`ihub-card ihub-h-100 ${
                  selectedCountry?.isoCode === country.isoCode ? 'ihub-border-primary' : ''
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedCountry(country)}
              >
                <div className="ihub-card-body ihub-p-3 ihub-text-center">
                  <div style={{ fontSize: "32px" }}>{country.flag}</div>
                  <h6 className="ihub-card-title ihub-mb-1">{country.name}</h6>
                  <div className="ihub-mb-2">
                    <span className="ihub-badge ihub-badge-light">{country.isoCode}</span>
                  </div>
                  <div className="ihub-d-flex ihub-justify-content-between ihub-text-sm">
                    <small>+{country.phonecode}</small>
                    <small>{country.currency}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredCountries.length > 12 && (
          <div className="ihub-text-center ihub-mt-3">
            <span className="text-muted">
              Showing 12 of {filteredCountries.length} countries
            </span>
          </div>
        )}
      </section>

      {/* Continental Distribution */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Continental Distribution</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-row">
            {Object.entries(continentStats).map(([continent, count]) => {
              const percentage = (count / countryObjects.length) * 100;
              return (
                <div key={continent} className="ihub-col-md-4 ihub-mb-3">
                  <div className="ihub-d-flex ihub-justify-content-between ihub-mb-1">
                    <span>{continent}</span>
                    <span>{count} countries</span>
                  </div>
                  <div className="ihub-progress" style={{ height: "8px" }}>
                    <div 
                      className="ihub-progress-bar" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <small className="text-muted">{percentage.toFixed(1)}%</small>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Implementation Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Implementation Examples</h2>
        
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-list ihub-me-2"></i>
              Country Selector Component
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Country selector with search and grouping
import countryObjects from '@instincthub/react-ui/lib';

const CountrySelector = ({ value, onChange, showFlags = true, groupByContinent = false }) => {
  const [search, setSearch] = useState('');
  
  const filteredCountries = countryObjects.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase()) ||
    country.isoCode.toLowerCase().includes(search.toLowerCase())
  );

  const groupedCountries = groupByContinent ? 
    groupCountriesByContinent(filteredCountries) : 
    { 'All Countries': filteredCountries };

  return (
    <div className="country-selector">
      <div className="search-input mb-2">
        <input
          type="text"
          placeholder="Search countries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
        />
      </div>
      
      <select 
        value={value?.isoCode || ''} 
        onChange={(e) => {
          const country = countryObjects.find(c => c.isoCode === e.target.value);
          onChange(country);
        }}
        className="form-control"
      >
        <option value="">Select a country</option>
        {Object.entries(groupedCountries).map(([group, countries]) => (
          <optgroup key={group} label={group}>
            {countries.map(country => (
              <option key={country.isoCode} value={country.isoCode}>
                {showFlags ? country.flag + ' ' : ''}{country.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
};

// Helper function to group countries
const groupCountriesByContinent = (countries) => {
  return countries.reduce((groups, country) => {
    // Simple continent detection based on timezone
    const timezone = country.timezones[0]?.zoneName || '';
    let continent = 'Other';
    
    if (timezone.includes('Europe')) continent = 'Europe';
    else if (timezone.includes('America')) continent = 'Americas';
    else if (timezone.includes('Asia')) continent = 'Asia';
    else if (timezone.includes('Africa')) continent = 'Africa';
    else if (timezone.includes('Australia') || timezone.includes('Pacific')) continent = 'Oceania';
    
    if (!groups[continent]) groups[continent] = [];
    groups[continent].push(country);
    return groups;
  }, {});
};`}
            </pre>
          </div>
        </div>

        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-phone ihub-me-2"></i>
              International Phone Input
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// International phone number component
import countryObjects from '@instincthub/react-ui/lib';

const InternationalPhoneInput = ({ value, onChange }) => {
  const [selectedCountry, setSelectedCountry] = useState(
    countryObjects.find(c => c.isoCode === 'US') || countryObjects[0]
  );
  const [phoneNumber, setPhoneNumber] = useState('');

  // Update combined value when country or number changes
  useEffect(() => {
    if (phoneNumber) {
      onChange({
        country: selectedCountry,
        phoneNumber,
        fullNumber: \`+\${selectedCountry.phonecode}\${phoneNumber}\`,
        formatted: formatPhoneNumber(selectedCountry, phoneNumber)
      });
    }
  }, [selectedCountry, phoneNumber]);

  const formatPhoneNumber = (country, number) => {
    // Basic formatting - can be enhanced with country-specific formats
    return \`+\${country.phonecode} \${number}\`;
  };

  return (
    <div className="international-phone-input">
      <div className="input-group">
        <select
          className="form-select"
          style={{ maxWidth: '120px' }}
          value={selectedCountry.isoCode}
          onChange={(e) => {
            const country = countryObjects.find(c => c.isoCode === e.target.value);
            if (country) setSelectedCountry(country);
          }}
        >
          {countryObjects.map(country => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.flag} +{country.phonecode}
            </option>
          ))}
        </select>
        
        <input
          type="tel"
          className="form-control"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      
      {phoneNumber && (
        <div className="mt-1">
          <small className="text-muted">
            Formatted: {formatPhoneNumber(selectedCountry, phoneNumber)}
          </small>
        </div>
      )}
    </div>
  );
};`}
            </pre>
          </div>
        </div>

        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-clock ihub-me-2"></i>
              World Clock Component
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// World clock showing multiple timezones
import countryObjects from '@instincthub/react-ui/lib';

const WorldClock = ({ selectedCountries = [] }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getCountryTime = (country) => {
    if (!country.timezones.length) return null;
    
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: country.timezones[0].zoneName,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(currentTime);
    } catch {
      return 'Invalid timezone';
    }
  };

  const getTimezoneName = (country) => {
    return country.timezones[0]?.tzName || 'Unknown';
  };

  // Default countries if none selected
  const displayCountries = selectedCountries.length > 0 
    ? selectedCountries 
    : [
        countryObjects.find(c => c.isoCode === 'US'),
        countryObjects.find(c => c.isoCode === 'GB'),
        countryObjects.find(c => c.isoCode === 'JP'),
        countryObjects.find(c => c.isoCode === 'AU')
      ].filter(Boolean);

  return (
    <div className="world-clock">
      <div className="row">
        {displayCountries.map(country => (
          <div key={country.isoCode} className="col-md-3 mb-3">
            <div className="card">
              <div className="card-body text-center">
                <div style={{ fontSize: '24px' }}>{country.flag}</div>
                <h6 className="card-title">{country.name}</h6>
                <div className="time-display">
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    {getCountryTime(country)}
                  </div>
                  <small className="text-muted">
                    {getTimezoneName(country)}
                  </small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};`}
            </pre>
          </div>
        </div>
      </section>

      {/* Sample Data Structure */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Data Structure Sample</h2>
        <div className="ihub-card ihub-p-4">
          <h6>Country Object Structure</h6>
          <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "10px", maxHeight: "400px", overflow: "auto" }}>
            {JSON.stringify(countryObjects[0], null, 2)}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default InternationalAppDashboard;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import countryObjects from '@instincthub/react-ui/lib';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import countryObjects from '@instincthub/react-ui/lib';

function CountrySelector() {
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <select onChange={(e) => {
      const country = countryObjects.find(c => c.isoCode === e.target.value);
      setSelectedCountry(country);
    }}>
      <option value="">Select a country</option>
      {countryObjects.map(country => (
        <option key={country.isoCode} value={country.isoCode}>
          {country.flag} {country.name}
        </option>
      ))}
    </select>
  );
}
```

## 🔧 Data Structure Reference

### Country Object Interface

```tsx
interface Country {
  name: string;              // Full country name
  isoCode: string;           // ISO 3166-1 alpha-2 code
  flag: string;              // Unicode flag emoji
  phonecode: string;         // International dialing code
  currency: string;          // ISO 4217 currency code
  latitude: string;          // Geographic latitude
  longitude: string;         // Geographic longitude
  timezones: Timezone[];     // Array of timezone objects
}

interface Timezone {
  zoneName: string;          // IANA timezone identifier
  gmtOffset: number;         // GMT offset in seconds
  gmtOffsetName: string;     // Human-readable GMT offset
  abbreviation: string;      // Timezone abbreviation
  tzName: string;           // Full timezone name
}
```

### Sample Countries Included

- **195+ Countries**: Complete UN member states plus additional territories
- **Flag Emojis**: Unicode flag emojis for all countries
- **Phone Codes**: International dialing codes
- **Currencies**: ISO 4217 currency codes
- **Timezones**: Complete timezone information
- **Coordinates**: Geographic center points

## 💡 Use Cases

### International Applications
- **Country Selection**: User registration and profile forms
- **Shipping & Billing**: E-commerce address forms
- **Localization**: Auto-detect and set user locale
- **Currency Display**: Show prices in local currency

### Communication Systems
- **Phone Numbers**: International phone input validation
- **Time Zones**: Schedule meetings across time zones
- **Messaging**: International SMS and calling features
- **Support Systems**: Route support by country/region

### Geographic Services
- **Maps Integration**: Country boundaries and centers
- **Weather Services**: Country-based weather data
- **Analytics**: Geographic user distribution
- **Content Delivery**: Region-based content serving

### Financial Applications
- **Multi-Currency**: Support multiple currencies
- **Tax Calculation**: Country-specific tax rules
- **Compliance**: Regulatory compliance by country
- **Payment Methods**: Country-specific payment options

## 🎯 Advanced Features

### Search & Filtering
- **Multi-field Search**: Search by name, ISO code, or currency
- **Currency Filtering**: Filter countries by currency
- **Continent Grouping**: Group countries by geographic region
- **Custom Sorting**: Sort by various criteria

### Timezone Management
- **Multiple Timezones**: Countries with multiple time zones
- **DST Support**: Daylight saving time handling
- **Real-time Updates**: Live time display for any country
- **Meeting Scheduler**: Cross-timezone meeting planning

### Phone Number Handling
- **Country Code Validation**: Validate phone number formats
- **Auto-formatting**: Format numbers according to country standards
- **Carrier Detection**: Identify mobile vs landline
- **SMS Routing**: Route messages by country code

## 🌍 Global Coverage

### Comprehensive Database
- **Complete Coverage**: All UN member states
- **Regular Updates**: Maintained current with geopolitical changes
- **Standard Compliance**: ISO and Unicode standards
- **Quality Assurance**: Verified data accuracy

### Regional Support
- **All Continents**: Global geographic coverage
- **Island Nations**: Includes small island states
- **Territories**: Major territories and dependencies
- **Special Regions**: Disputed territories handling

## 🔒 Data Quality & Maintenance

### Data Accuracy
- **Verified Information**: Cross-referenced with official sources
- **Regular Updates**: Periodic data validation and updates
- **Standard Compliance**: Follows international standards
- **Error Handling**: Graceful handling of missing data

### Performance Considerations
- **Optimized Size**: Balanced between completeness and performance
- **Efficient Lookup**: Optimized for common search patterns
- **Memory Usage**: Reasonable memory footprint
- **Caching**: Suitable for client-side caching

## ⚠️ Important Considerations

- **Data Size**: Large dataset (~48,000 tokens) - consider lazy loading
- **Update Frequency**: Geopolitical changes may require updates
- **Timezone Changes**: Countries occasionally change timezones
- **Unicode Support**: Requires proper Unicode support for flags
- **Browser Compatibility**: Flag emojis may not display on older browsers

## 🔗 Related Utilities

- [countryNigeria](./json-countryNigeria.md) - Detailed Nigeria-specific data
- [utils](./utils.md) - Currency symbols and international constants
- [helpFunction](./helpFunction.md) - Subdomain extraction for country detection
- [PhoneNumberInput](../forms/PhoneNumberInput.md) - International phone input component