"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState, FC, ReactNode } from "react";

/**
 * Props interface for SessionProviders component
 * @interface SessionProvidersProps
 * @prop {ReactNode} children - Child components to wrap with session context
 * @prop {number} [refetchInterval] - Session refetch interval in seconds (default: 12 hours)
 * @prop {boolean} [refetchOnWindowFocus] - Whether to refetch session when window gains focus
 */
interface SessionProvidersProps {
  children: ReactNode;
  refetchInterval?: number;
  refetchOnWindowFocus?: boolean;
}

/**
 * Wraps the Next-Auth SessionProvider with hydration handling.
 * Provides a SessionProvider context only after client-side hydration
 * to prevent hydration mismatches and useSession errors during SSR.
 * 
 * @example
 * ```tsx
 * <SessionProviders 
 *   refetchInterval={720 * 60} 
 *   refetchOnWindowFocus={true}
 * >
 *   <App />
 * </SessionProviders>
 * ```
 * 
 * @component
 * @param {SessionProvidersProps} props - The component props
 * @param {ReactNode} props.children - Child components to wrap with session context
 * @param {number} [props.refetchInterval=720*60] - Session refetch interval in seconds (default: 12 hours)
 * @param {boolean} [props.refetchOnWindowFocus=true] - Whether to refetch session on window focus
 * @returns {JSX.Element} The wrapped children with SessionProvider context
 */
export default function SessionProviders({
  children,
  refetchInterval = 720 * 60, // 12 hour
  refetchOnWindowFocus = true,
}: SessionProvidersProps) {
  // Prevent hydration errors by only mounting after client-side hydration
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Always wrap with SessionProvider, but handle mounting state internally
  return (
    <SessionProvider
      refetchInterval={refetchInterval}
      refetchOnWindowFocus={refetchOnWindowFocus}
    >
      {isMounted ? children : null}
    </SessionProvider>
  );
}
