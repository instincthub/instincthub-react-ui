# loadScript

A utility function that dynamically loads external JavaScript files.

## Function

### loadScript
- **Description**: Loads a JavaScript file into the document
- **Parameters**:
  - `scriptSrc: string` - URL of the script to load
- **Returns**: `HTMLScriptElement | false` - The script element or false if no source provided
- **Features**:
  - Prevents duplicate script loading
  - Sets scripts to load asynchronously
  - Provides error handling

## Usage Examples

```typescript
import loadScript from './loadScript';

// Loading a payment gateway script
const loadPaymentGateway = () => {
  const script = loadScript("https://js.paystack.co/v1/inline.js");
  
  if (script) {
    script.onload = () => {
      // Initialize payment gateway
      const paystack = window.PaystackPop.setup({
        key: 'your-public-key',
        email: 'customer@email.com',
        amount: 10000
      });
      
      paystack.openIframe();
    };
  } else {
    console.error("Could not load payment script");
  }
};

// Loading Google Maps API
const loadGoogleMaps = (apiKey: string) => {
  const script = loadScript(`https://maps.googleapis.com/maps/api/js?key=${apiKey}`);
  
  if (script) {
    script.onload = () => {
      // Initialize map
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    };
  }
};
```

## TypeScript Usage Notes

When using the script's `onload` property, TypeScript will preserve the correct type information:

```typescript
const script = loadScript("https://example.com/script.js");
if (script) {
  script.onload = () => {
    // Your initialization code
  };
}
```