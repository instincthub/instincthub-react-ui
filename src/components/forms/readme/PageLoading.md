# PageLoading Component

A simple React component for displaying a loading indicator with customizable label text.

## Props

### PageLoadingProps
- `labels?: string` - Optional prefix text before "Loading..." (default: empty string)

## Usage

```tsx
import React from 'react';
import PageLoading from './components/PageLoading';

const DataPage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState<any>(null);

  React.useEffect(() => {
    // Fetch data
    fetchData().then(result => {
      setData(result);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <PageLoading labels="Data" />;
  }

  return (
    <div>
      {/* Render data */}
    </div>
  );
};
```

## CSS Classes
- `.ihub-loading` - Container element with full height
- Add to your stylesheet or import the component CSS