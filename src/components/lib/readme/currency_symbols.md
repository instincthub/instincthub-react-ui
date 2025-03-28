# Currency Symbols

A TypeScript constant mapping currency codes to their corresponding symbols.

## Interface

```typescript
interface CurrencySymbolMap {
  [key: string]: string;
}
```

## Usage

```typescript
import CurrencySymbols from './currencySymbols';

// Display price with appropriate currency symbol
const formatPrice = (amount: number, currencyCode: string): string => {
  const symbol = CurrencySymbols[currencyCode] || currencyCode;
  return `${symbol}${amount.toFixed(2)}`;
};

// Examples
console.log(formatPrice(1000, 'USD')); // $1000.00
console.log(formatPrice(5000, 'NGN')); // ₦5000.00
console.log(formatPrice(750, 'EUR'));  // €750.00
```

## Supported Currencies

| Currency Code | Country/Region | Symbol |
|---------------|----------------|--------|
| NGN | Nigerian Naira | ₦ |
| USD | US Dollar | $ |
| EUR | Euro | € |
| GBP | British Pound | £ |
| JPY | Japanese Yen | ¥ |
| CNY | Chinese Yuan | ¥ |
| INR | Indian Rupee | ₹ |
| RUB | Russian Ruble | ₽ |
| KRW | South Korean Won | ₩ |
| BRL | Brazilian Real | R$ |
| AUD | Australian Dollar | A$ |
| CAD | Canadian Dollar | C$ |
| CHF | Swiss Franc | CHF |
| ZAR | South African Rand | R |
| SGD | Singapore Dollar | S$ |
| NZD | New Zealand Dollar | NZ$ |
| MXN | Mexican Peso | MX$ |
| HKD | Hong Kong Dollar | HK$ |
| SEK | Swedish Krona | kr |
| NOK | Norwegian Krone | kr |
| DKK | Danish Krone | kr |
| TRY | Turkish Lira | ₺ |
| AED | UAE Dirham | د.إ |
| SAR | Saudi Riyal | ﷼ |
| EGP | Egyptian Pound | E£ |
| GHS | Ghanaian Cedi | GH₵ |
| KES | Kenyan Shilling | KSh |
| ZMW | Zambian Kwacha | ZK |
| UGX | Ugandan Shilling | USh |
| TZS | Tanzanian Shilling | TSh |
| ETB | Ethiopian Birr | Br |

## Notes

- When formatting currencies, consider using the `Intl.NumberFormat` API for locale-specific formatting
- Some currencies share the same symbol (e.g., JPY and CNY both use ¥)
- For production applications, consider using specialized libraries like `currency.js` or `dinero.js`