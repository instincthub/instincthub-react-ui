"use client";

import { useEffect, useState, ReactNode, useCallback, useMemo } from "react";
import { API_HOST_URL, reqOptions } from "../lib/helpFunction";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { openToast } from "../lib/modals/modals";
import Error500 from "../status/Error500";
import { SessionUserType } from "src/types";

interface SessionHandleProviderProps {
  children: ReactNode;
  endpointPath?: string | null;
}

/**
 * Provider component for the session handle
 * @constructor
 * @example
 * ```tsx
 *
 * <SessionHandleProvider endpointPath="channels/instructor-channel/selected/">
 *   <Component />
 * </SessionHandleProvider>
 * ```
 * @param {ReactNode} children - Children components
 * @param {string} endpointPath - API endpoint path for the session handle
 */
export default function SessionHandleProvider({
  children,
  endpointPath = null,
}: SessionHandleProviderProps) {
  const params = useParams<{ channel: string }>();
  const params_handle = params.channel;

  const { data: session, update: sessionUpdate } = useSession();
  const user = session?.user as SessionUserType | undefined;

  // Use useMemo for derived values
  const session_handle = useMemo(
    () => user?.name?.channels?.active?.channel?.username,
    [user?.name?.channels?.active?.channel?.username]
  );

  const token = useMemo(() => user?.name?.token, [user?.name?.token]);

  const [status, setStatus] = useState<boolean>(true);

  // Use useCallback for function definitions
  const getChannelData = useCallback(async (): Promise<void> => {
    if (!token || !params_handle) return;

    const options = reqOptions("PUT", null, token);

    // More robust URL construction
    const baseEndpoint =
      endpointPath || "channels/instructor-channel/selected/";
    const endpoint = baseEndpoint.endsWith("/")
      ? `${baseEndpoint}${params_handle}/`
      : `${baseEndpoint}/${params_handle}/`;

    const api = `${API_HOST_URL}${endpoint}`;

    try {
      const req = await fetch(api, options);

      if (!req.ok) {
        throw new Error(`Request failed with status: ${req.status}`);
      }

      const res = await req.json();

      if (res?.active?.id) {
        sessionUpdate({
          info: {
            ...user?.name,
            channels: res,
          },
        });
      } else {
        openToast(res?.detail || "Channel switching failed", 400);
        setStatus(false);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch channel data";

      console.error("Error fetching channel data:", error);
      openToast(errorMessage, 500);
      setStatus(false);
    }
  }, [token, params_handle, endpointPath, user, sessionUpdate]);

  // Simplified validation logic
  const isInvalidHandle = useMemo(() => {
    if (!params_handle || typeof params_handle !== "string") return true;

    const nullValues = ["null", "undefined", "false", "true", "", " "];
    return nullValues.includes(params_handle);
  }, [params_handle]);

  useEffect(() => {
    // Only proceed if we have both session handle and param handle
    if (!session_handle || !params_handle) return;

    // Skip if handles match - nothing to do
    if (session_handle === params_handle) return;

    // If current handle is valid but doesn't match session, switch channels
    if (!isInvalidHandle) {
      getChannelData();
    } else {
      openToast("Invalid handle!", 400);
      setStatus(false);
    }
  }, [session_handle, params_handle, isInvalidHandle, getChannelData]);

  // Avoid the SessionProvider nesting - just render the error component
  if (!status) {
    return (
      <Error500
        msg={`"${params_handle}" is not a valid channel handle. Check the URL; it must be a valid channel username.`}
      />
    );
  }

  return <>{children}</>;
}
