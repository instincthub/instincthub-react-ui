# fileToBase64

A utility function that converts a File object to a base64 encoded string without the data URL prefix.

## Parameters
- `file: File` - The file to convert to base64

## Returns
- `Promise<string>` - A promise that resolves to the base64 encoded string

## Usage Examples

```typescript
import fileToBase64 from './fileToBase64';

// Example with file input element
const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    try {
      const base64String = await fileToBase64(file);
      console.log('Base64 string:', base64String);
      
      // Use the base64 string (e.g., send to an API)
      const response = await fetch('https://api.example.com/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileData: base64String }),
      });
    } catch (error) {
      console.error('Error converting file to base64:', error);
    }
  }
};

// Example with drag and drop
const handleDrop = async (event: React.DragEvent) => {
  event.preventDefault();
  
  if (event.dataTransfer.files.length) {
    const file = event.dataTransfer.files[0];
    try {
      const base64String = await fileToBase64(file);
      // Do something with the base64 string
    } catch (error) {
      console.error('Error processing dropped file:', error);
    }
  }
};
```

## Implementation Notes

1. The function removes the data URL prefix (e.g., `data:image/jpeg;base64,`) by splitting the result and taking the second part
2. For files larger than a few MB, consider using a chunking strategy to avoid memory issues
3. This implementation is browser-only and doesn't work in Node.js environments without additional libraries