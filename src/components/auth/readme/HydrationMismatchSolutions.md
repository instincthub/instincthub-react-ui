# Preventing Hydration Mismatches in Next.js

This guide provides solutions for common hydration mismatch issues in Next.js applications.

## Common Causes of Hydration Mismatches

1. **Server/Client Branching**: Using `if (typeof window !== 'undefined')` directly in render
2. **Variable Inputs**: Using `Date.now()`, `Math.random()`, or other non-deterministic values
3. **Date Formatting**: Using locale-specific date formatting that differs between server and client
4. **External Data**: Using data that changes between server render and client hydration
5. **Invalid HTML**: Incorrect nesting of HTML tags

## Solutions

### 1. Use the ClientOnly Component

For components that must use browser-only APIs, wrap them in the `ClientOnly` component:

```tsx
import ClientOnly from "@/components/auth/ClientOnly";

const MyComponent = () => {
  return (
    <div>
      <h1>Always visible</h1>

      <ClientOnly fallback={<div>Loading...</div>}>
        <ComponentThatUsesBrowserAPIs />
      </ClientOnly>
    </div>
  );
};
```

### 2. Use useStableRandom for Random Values

For components that need random values, use the `useStableRandom` hook:

```tsx
import { useStableRandom } from "@/components/auth/useStableRandom";

const RandomComponent = () => {
  // This will be consistent between server and client
  const randomValue = useStableRandom("my-seed", 1, 100);

  return <div>Random value: {randomValue}</div>;
};
```

### 3. Use useFormattedDate for Date Formatting

For components that format dates, use the `useFormattedDate` hook:

```tsx
import { useFormattedDate } from "@/components/auth/useFormattedDate";

const DateComponent = () => {
  const formattedDate = useFormattedDate(new Date(), {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return <div>Today is {formattedDate}</div>;
};
```

### 4. Use useExternalData for External Data

For components that use external data, use the `useExternalData` hook:

```tsx
import { useExternalData } from "@/components/auth/useExternalData";

const DataComponent = () => {
  const [data, setData] = useExternalData(null, async () => {
    const response = await fetch("/api/data");
    return response.json();
  });

  if (!data) return <div>Loading...</div>;

  return <div>Data: {JSON.stringify(data)}</div>;
};
```

### 5. Use useClientSide for Browser APIs

For components that need to access browser APIs, use the `useClientSide` hook:

```tsx
import { useClientSide } from "@/components/auth/useClientSide";

const ThemeComponent = () => {
  const [theme, setTheme] = useClientSide(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem("theme") || "light";
  });

  return <div>Current theme: {theme}</div>;
};
```

## Best Practices

1. **Always provide fallbacks**: Use the `fallback` prop with `ClientOnly` to show something during server rendering
2. **Use consistent initial values**: Ensure your initial state is the same on both server and client
3. **Avoid direct browser API calls**: Use the provided hooks instead of directly accessing browser APIs
4. **Handle loading states**: Show loading indicators while waiting for client-side data
5. **Test with SSR disabled**: Temporarily disable SSR to identify hydration issues

## Debugging Hydration Issues

If you're still experiencing hydration issues:

1. Check the console for specific component mismatches
2. Use React DevTools to inspect the component tree
3. Add `suppressHydrationWarning={true}` to elements that are expected to differ
4. Use the `useEffect` hook to update state after hydration

## License

These utilities are available under the [MIT License](LICENSE).
