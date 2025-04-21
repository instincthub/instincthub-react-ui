"use client";

import React, { useState, useEffect, ReactNode } from "react";

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
  ssr?: boolean;
}

/**
 * A component that only renders its children on the client side.
 * This prevents hydration mismatches by ensuring the component
 * only renders after hydration is complete.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ClientOnly>
 *   <ComponentThatUsesBrowserAPIs />
 * </ClientOnly>
 *
 * // With fallback
 * <ClientOnly fallback={<LoadingSpinner />}>
 *   <ComponentThatUsesBrowserAPIs />
 * </ClientOnly>
 *
 * // With SSR fallback
 * <ClientOnly ssr={true}>
 *   <ComponentThatUsesBrowserAPIs />
 * </ClientOnly>
 * ```
 */
const ClientOnly: React.FC<ClientOnlyProps> = ({
  children,
  fallback = null,
  ssr = false,
}) => {
  const [isClient, setIsClient] = useState(ssr);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default ClientOnly;
