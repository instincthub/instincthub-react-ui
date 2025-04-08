"use client";

import { useEffect, useState, ReactNode } from "react";
import { API_HOST_URL, reqOptions } from "../lib/helpFunction";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { openToast } from "../lib/modals";
import Error500 from "../status/Error500";
import { SessionUserType } from "src/types";

interface Channel {
  username?: string;
  id?: number;
}

interface ActiveChannel {
  channel?: Channel;
  id?: number;
}

interface Channels {
  active?: ActiveChannel;
}

interface User {
  name?: {
    channels?: Channels;
    token?: string;
  };
  token?: string;
}

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
  const session_handle = user?.name?.channels?.active?.channel?.username;

  const token = user?.name?.token;

  const [status, setStatus] = useState<boolean>(true);

  const getChannelData = async (): Promise<void> => {
    if (!token || !params_handle) return;

    const options = reqOptions("PUT", null, token);
    const api = `${API_HOST_URL}${
      endpointPath || `channels/instructor-channel/selected/${params_handle}/`
    }`;

    try {
      const req = await fetch(api, options);
      const res = await req.json();
      console.log(res);

      if (res?.active?.id) {
        sessionUpdate({
          info: {
            ...user?.name,
            channels: res,
          },
        });
      } else {
        openToast(res?.detail, 400);
        setStatus(false);
      }
    } catch (error) {
      console.error("Error fetching channel data:", error);
      openToast("Failed to fetch channel data", 500);
      setStatus(false);
    }
  };

  useEffect(() => {
    if (session_handle) {
      const params_handle_is_string = typeof params_handle === "string";

      if (params_handle_is_string) {
        // if session handle != to params id, try switch handle or throw error.
        const nullValue = ["null", "undefined", "false", "true", "", " "];
        const invalidHandle = nullValue.find((i) => i === params_handle); // Invalid handle in kwargs params

        if (
          session_handle &&
          session_handle !== params_handle &&
          !invalidHandle
        ) {
          getChannelData();
        } else if (session_handle && invalidHandle && params_handle_is_string) {
          openToast("Invalid handle!", 400);
          setStatus(false);
        }
      }
    }
  }, [session_handle, params_handle]);

  if (status) {
    return <>{children}</>;
  } else {
    return (
      <Error500
        msg={`"${params_handle}" is not a valid channel handle. Check the URL; it must be a valid channel username.`}
      />
    );
  }
}
