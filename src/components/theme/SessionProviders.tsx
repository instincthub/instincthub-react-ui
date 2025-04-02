"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState, FC, ReactNode } from "react";

interface SessionProvidersProps {
  children: ReactNode;
  refetchInterval?: number;
  refetchOnWindowFocus?: boolean;
}

/**
 * Wraps the Next-Auth SessionProvider with hydration handling
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

  // Only wrap with SessionProvider after client-side hydration
  if (!isMounted) {
    // Return children without session context during SSR
    return <>{children}</>;
  }

  return (
    <SessionProvider
      refetchInterval={refetchInterval}
      refetchOnWindowFocus={refetchOnWindowFocus}
    >
      {children}
    </SessionProvider>
  );
}
