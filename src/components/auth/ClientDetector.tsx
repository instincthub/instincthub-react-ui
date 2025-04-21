"use client";

import React, { useEffect, useState } from "react";

interface Props {
  setIsClientLoaded?: (isClientLoaded: boolean) => void;
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * A component that detects whether the code is running on the client-side (browser)
 * and can be used to prevent hydration mismatches.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ClientDetector setIsClientLoaded={setIsClientLoaded} />
 *
 * // With conditional rendering
 * <ClientDetector fallback={<LoadingSpinner />}>
 *   <ClientOnlyComponent />
 * </ClientDetector>
 * ```
 */
const ClientDetector: React.FC<Props> = ({
  setIsClientLoaded,
  children,
  fallback = null,
}: Props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    console.log("Client-side detected");
    setIsClient(true);
    if (setIsClientLoaded) {
      setIsClientLoaded(true);
    }
  }, [setIsClientLoaded]);

  // If children are provided, render them only on the client
  if (children !== undefined) {
    return isClient ? <>{children}</> : <>{fallback}</>;
  }

  // Otherwise, just return an empty fragment
  return <></>;
};

export default ClientDetector;
