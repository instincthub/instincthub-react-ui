# Enhanced UnsplashRandomImage Component

An improved React component for displaying and interacting with random images from Unsplash.

## Features

- **Rich UI/UX**: Enhanced styling with hover effects, animations, and better content display
- **Error handling**: Graceful error states with retry capability
- **Loading states**: Visual feedback during image loading
- **Responsive design**: Adapts to different screen sizes
- **Image metadata**: Shows photographer details, location, likes, and date
- **Manual refresh**: Button to load new images without page reload
- **Customizable**: Configure dimensions, border radius, and overlay intensity

## Installation

1. Copy the TypeScript component file to your project
2. Add the CSS file to your styles directory
3. Import the CSS in your main style file or `_app.tsx`:

```tsx
// In _app.tsx or similar
import "../styles/unsplash.css";
```

## Environment Setup

Create a `.env.local` file with your Unsplash API key:

```
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

## Usage

```tsx
import UnsplashRandomImage from "@/components/UnsplashRandomImage";
import { useDispatch, useSelector } from "react-redux";
import { selectUnsplashObject, unsplashSlice } from "@/store/unsplashSlice";

const LoginPage: React.FC = () => {
  return (
    <div className="login-container">
      <UnsplashRandomImage
        category="nature"
        className="login-image"
        useDispatch={useDispatch}
        useSelector={useSelector}
        selectUnsplashObject={selectUnsplashObject}
        unsplashObject={unsplashSlice}
        height="500px"
        width="100%"
        borderRadius="12px"
        overlayIntensity={0.3}
        onImageClick={() => console.log("Image clicked")}
      />
      {/* Rest of your content */}
    </div>
  );
};

export default LoginPage;
```

## Props

| Prop Name            | Type     | Default | Description                       |
| -------------------- | -------- | ------- | --------------------------------- |
| category             | string   | -       | Search term for Unsplash images   |
| className            | string   | -       | Additional CSS class              |
| useDispatch          | Function | -       | Redux useDispatch hook            |
| useSelector          | Function | -       | Redux useSelector hook            |
| selectUnsplashObject | Function | -       | Redux selector for unsplash data  |
| unsplashObject       | Object   | -       | Redux slice with actions          |
| height               | string   | "100vh" | Height of the container           |
| width                | string   | "100%"  | Width of the container            |
| borderRadius         | string   | "8px"   | Border radius of the container    |
| overlayIntensity     | number   | 0.2     | Opacity of the dark overlay (0-1) |
| onImageClick         | Function | -       | Handler for image click events    |

## Redux Integration

The component requires a Redux store with an unsplash slice:

```typescript
// store/unsplashSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { unsplashDefaultObject } from "@/assets/json/unsplashDefaultObject";

const unsplashSlice = createSlice({
  name: "unsplash",
  initialState: unsplashDefaultObject,
  reducers: {
    add: (state, action) => {
      return action.payload;
    },
  },
});

export const selectUnsplashObject = (state) => state.unsplash;
export default unsplashSlice;
```

## Default Object

Create a default object for fallback scenarios:

```typescript
// assets/json/unsplashDefaultObject.ts
export const unsplashDefaultObject = {
  id: "default",
  urls: {
    regular: "/images/fallback-image.jpg",
  },
  user: {
    name: "InstinctHub",
    links: {
      html: "https://instincthub.com",
    },
    profile_image: {
      small: "/images/default-avatar.png",
    },
  },
  alt_description: "Default placeholder image",
  color: "#f5f5f5",
};
```

## CSS Customization

The component uses external CSS with the `ihub-` prefix. You can customize the appearance by overriding these classes in your own stylesheet:

```css
/* Override example */
.ihub-unsplash-container {
  border: 1px solid #e0e0e0;
}

.ihub-unsplash-refresh {
  background-color: #4caf50;
  color: white;
}
```

## Advanced Usage Examples

### With Image Click Handler

```tsx
const handleImageClick = () => {
  setShowLightbox(true);
};

<UnsplashRandomImage
  // ... other props
  onImageClick={handleImageClick}
/>;
```

### Multiple Categories

```tsx
const [category, setCategory] = useState("nature");

<div>
  <div className="category-buttons">
    <button onClick={() => setCategory("nature")}>Nature</button>
    <button onClick={() => setCategory("architecture")}>Architecture</button>
    <button onClick={() => setCategory("travel")}>Travel</button>
  </div>

  <UnsplashRandomImage
    // ... other props
    category={category}
  />
</div>;
```

### With Custom Styling

```tsx
<UnsplashRandomImage
  // ... other props
  height="300px"
  width="500px"
  borderRadius="16px"
  overlayIntensity={0.5}
/>
```

## TypeScript Interfaces

The component exports these interfaces for use in your application:

- `UnsplashUser`: Information about the photographer
- `UnsplashUrls`: Various image URLs from Unsplash
- `UnsplashObject`: Complete image data structure
- `UnsplashRandomImageProps`: Component props
