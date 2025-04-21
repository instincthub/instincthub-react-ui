"use client";

import { useState, useEffect } from "react";

/**
 * A hook that ensures consistent handling of external data between server and client.
 * This prevents hydration mismatches caused by data that changes between renders.
 *
 * @example
 * ```tsx
 * // Basic usage
 * const [data, setData] = useExternalData(null);
 *
 * // With initial fetch
 * const [data, setData] = useExternalData(null, async () => {
 *   const response = await fetch('/api/data');
 *   return response.json();
 * });
 * ```
 */
export function useExternalData<T>(
  initialData: T | null,
  fetchFn?: () => Promise<T>
): [T | null, (data: T) => void] {
  const [data, setData] = useState<T | null>(initialData);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // If a fetch function is provided, fetch the data
    if (fetchFn) {
      fetchFn().then(setData).catch(console.error);
    }
  }, [fetchFn]);

  const setDataSafely = (newData: T) => {
    setData(newData);
  };

  return [isClient ? data : initialData, setDataSafely];
}

export default useExternalData;
