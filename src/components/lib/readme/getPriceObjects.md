# getPriceObjects

A utility function that calculates product price details based on user location and promotional offers.

## Interfaces

### ProductObject
```typescript
interface ProductObject {
  price_tier?: PriceTier;
  [key: string]: any;
}
```

### PriceTier
```typescript
interface PriceTier {
  [currency: string]: string;
}
```

### LocationState
```typescript
interface LocationState {
  ip_address?: string;
  currency?: string;
}
```

### PromoState
```typescript
interface PromoState {
  id?: string | number;
  percentage?: string;
  [key: string]: any;
}
```

### GetPriceObjectsProps
```typescript
interface GetPriceObjectsProps {
  selectCurrentPromo: () => PromoState;
  selectUserLocation: () => LocationState;
  useSelector: <T>(selector: () => T) => T;
}
```

### PriceObjectsResult
```typescript
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

## Function

### getPriceObjects
- **Description**: Calculates price details based on user location and promotional offers
- **Parameters**:
  - `objects: ProductObject` - Product object containing pricing information
  - `props: GetPriceObjectsProps` - Redux selector functions
- **Returns**: `PriceObjectsResult` - Object with currency, price, formatted price, symbol, and promotion details
- **Usage**:
  ```typescript
  import getPriceObjects from './getPriceObjects';
  import { 
    selectCurrentPromo, 
    selectUserLocation, 
    useSelector 
  } from '@/lib/redux';
  
  // Inside a React component
  const MyComponent = ({ product }) => {
    const { 
      currency, 
      price, 
      formatted_price, 
      promo, 
      symbol, 
      is_promo_running 
    } = getPriceObjects(product, {
      selectCurrentPromo,
      selectUserLocation,
      useSelector
    });
    
    return (
      <div>
        <h2>Product Price: {price}</h2>
        {is_promo_running && (
          <p>Special offer: {promo.percentage}% off!</p>
        )}
      </div>
    );
  };
  ```

## Notes

- Function relies on Redux selectors (`selectUserLocation` and `selectCurrentPromo`)
- Currently hardcoded to use "NGN" (Nigerian Naira) currency
- Formats prices with commas using `formatNumberWithCommas` utility
- Calculates discounted prices when promotions are available
- Returns "FREE" as price for products without pricing information