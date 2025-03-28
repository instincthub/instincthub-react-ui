# UnsplashRandomImage Component

A React component that fetches and displays a random image from Unsplash based on a search category.

## Props

| Prop        | Type   | Required | Description                           |
| ----------- | ------ | -------- | ------------------------------------- |
| `category`  | string | Yes      | Search term for Unsplash image query  |
| `className` | string | No       | Optional CSS class name for the image |

## Setup

1. Create an Unsplash developer account and obtain an API key
2. Add your API key to environment variables:
   ```
   NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_api_key
   ```

## Usage

```tsx
import UnsplashRandomImage from "@/components/UnsplashRandomImage";

// Basic usage
<UnsplashRandomImage category="nature" />

// With custom className
<UnsplashRandomImage
  category="office"
  className="header-image"
/>
```

## Dependencies

- Next.js 13+
- Redux Toolkit (configured in the project)
- Unsplash API

## Features

- Fetches a random image based on a category
- Displays proper attribution as required by Unsplash
- Falls back to a default image when in development mode or if the API call fails
- Caches image data in Redux store

## Implementation Notes

1. The component uses Redux to store and access the image data
2. Ensure you have the `unsplashDefaultObject` properly defined for fallback
3. The component performs a side effect on mount to fetch the random image
4. Image is displayed with proper attribution link to the photographer
