"use client";

import { useState, useEffect } from "react";

/**
 * A hook that generates stable random values that don't change between server and client.
 * This prevents hydration mismatches caused by random values.
 *
 * @example
 * ```tsx
 * // Basic usage
 * const randomValue = useStableRandom();
 *
 * // With seed
 * const randomValue = useStableRandom('my-seed');
 *
 * // With range
 * const randomValue = useStableRandom('my-seed', 1, 10);
 * ```
 */
export function useStableRandom(
  seed?: string,
  min: number = 0,
  max: number = 1
): number {
  // Start with a consistent value for SSR
  const [randomValue, setRandomValue] = useState<number>(() => {
    // Use a deterministic value for SSR
    return min;
  });

  useEffect(() => {
    // After hydration, generate a random value
    if (seed) {
      // Use a seeded random number generator
      const hash = seed.split("").reduce((acc, char) => {
        return ((acc << 5) - acc + char.charCodeAt(0)) | 0;
      }, 0);

      // Generate a random number between min and max
      const random = Math.sin(hash) * 10000;
      const normalized = (random - Math.floor(random)) * (max - min) + min;
      setRandomValue(normalized);
    } else {
      // Use Math.random() for client-side only
      const random = Math.random() * (max - min) + min;
      setRandomValue(random);
    }
  }, [seed, min, max]);

  return randomValue;
}

export default useStableRandom;
