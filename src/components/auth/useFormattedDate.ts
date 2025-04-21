"use client";

import { useState, useEffect } from "react";

type DateFormatOptions = Intl.DateTimeFormatOptions;

/**
 * A hook that ensures consistent date formatting between server and client.
 * This prevents hydration mismatches caused by locale differences.
 *
 * @example
 * ```tsx
 * // Basic usage
 * const formattedDate = useFormattedDate(new Date());
 *
 * // With options
 * const formattedDate = useFormattedDate(new Date(), {
 *   year: 'numeric',
 *   month: 'long',
 *   day: 'numeric'
 * });
 *
 * // With locale
 * const formattedDate = useFormattedDate(new Date(), {
 *   year: 'numeric',
 *   month: 'long',
 *   day: 'numeric'
 * }, 'en-US');
 * ```
 */
export function useFormattedDate(
  date: Date | string | number,
  options?: DateFormatOptions,
  locale?: string
): string {
  // Start with a consistent format for SSR
  const [formattedDate, setFormattedDate] = useState<string>(() => {
    // Use a consistent format for SSR
    const d = new Date(date);
    return d.toISOString();
  });

  useEffect(() => {
    // After hydration, format according to user's locale
    const d = new Date(date);
    const formatter = new Intl.DateTimeFormat(locale || "en-US", options);
    setFormattedDate(formatter.format(d));
  }, [date, options, locale]);

  return formattedDate;
}

export default useFormattedDate;
