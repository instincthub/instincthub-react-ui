"use client";

import { useState, useEffect } from "react";

/**
 * A hook that safely handles client-side initialization to prevent hydration mismatches.
 *
 * @example
 * ```tsx
 * // Basic usage
 * const isClient = useClientSide();
 *
 * // With initial value
 * const [theme, setTheme] = useClientSide(() => {
 *   if (typeof window === 'undefined') return 'light';
 *   return localStorage.getItem('theme') || 'light';
 * });
 * ```
 */
export function useClientSide<T>(
  initialValue?: T | (() => T)
): [T | undefined, (value: T) => void] {
  const [value, setValue] = useState<T | undefined>(
    typeof initialValue === "function"
      ? (initialValue as () => T)()
      : initialValue
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // If initialValue is a function, call it again on the client
    if (typeof initialValue === "function") {
      setValue((initialValue as () => T)());
    }
  }, [initialValue]);

  const setValueSafely = (newValue: T) => {
    setValue(newValue);
  };

  return [isClient ? value : undefined, setValueSafely];
}

export default useClientSide;
