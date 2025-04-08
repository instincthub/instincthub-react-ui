"use client";
import { useState, useEffect, useRef } from "react";
import { API_HOST_URL, IN_DEV_MODE, reqOptions } from "../lib/helpFunction";
import { SessionUserType } from "src/types";
import { useParams } from "next/navigation";
import {
  useDispatch,
  useSelector,
  selectIPAdress,
  IPAdress,
} from "../lib/redux";

// Improved type definitions
interface IPAddressData {
  ip_address?: string;
  [key: string]: any;
}

interface IPAddressActions {
  actions: {
    set: (data: IPAddressData) => { type: string; payload: IPAddressData };
  };
}

// Redux selector and dispatch types
type AppDispatch = (action: any) => void;
type SelectorFunction = (state: any) => IPAddressData;

interface TimeTrackerProps {
  channel_username?: string | null;
  session: SessionUserType;
  endpoint: string;
}

/**
 * React Time Tracker Component
 * @component
 * @example
 * <ReactTimeTracker />
 * @param {string} channel_username - The channel username
 * @param {SessionUserType} session - The session user type
 * @param {string} endpoint - The endpoint to fetch the IP Address
 */
const ReactTimeTracker: React.FC<TimeTrackerProps> = ({
  channel_username = null,
  session,
  endpoint = "/api/user-ip-address",
}) => {
  const dispatch = useDispatch();
  const ipAds = useSelector<any>(selectIPAdress);
  const startTime = useRef<Date>(new Date());
  const endTime = useRef<Date | null>(null);
  const [visibility, setVisibility] = useState<string>(
    document?.visibilityState || "visible"
  );
  const params = useParams<{ channel: string }>();
  const handle = params.channel || channel_username;
  const timeUpdatePending = useRef<boolean>(false);

  const handleVisibilityChange = (): void => {
    const newVisibility = document.visibilityState;
    setVisibility(newVisibility);

    if (newVisibility === "hidden") {
      endTime.current = new Date();
      timeUpdatePending.current = true;
    } else {
      startTime.current = new Date();
      endTime.current = null;
    }
  };

  const handleIdle = (): void => {
    endTime.current = new Date();
    timeUpdatePending.current = true;
    // Force a re-render to trigger the time sending effect
    setVisibility((prev) => (prev === "idle" ? "idle_update" : "idle"));
  };

  // Setup event listeners
  useEffect(() => {
    startTime.current = new Date();

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("idle", handleIdle);

    return () => {
      // If component unmounts, try to send the final time data
      if (startTime.current && !endTime.current) {
        endTime.current = new Date();
        timeUpdatePending.current = true;
      }

      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("idle", handleIdle);
    };
  }, []);

  // Fetch IP address if not available
  useEffect(() => {
    if (!ipAds?.ip_address) {
      const fetchIpAddress = async (): Promise<void> => {
        try {
          const response = await fetch(endpoint);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          dispatch(IPAdress.actions.set(data));
        } catch (error) {
          console.error("Error fetching IP address:", error);
        }
      };
      fetchIpAddress();
    }
  }, [dispatch, ipAds?.ip_address, IPAdress.actions]);

  // Send time data to server when visibility changes or component unmounts
  useEffect(() => {
    const sendTime = async (): Promise<void> => {
      // Only send time if there's a pending update and we have valid start/end times
      if (
        !timeUpdatePending.current ||
        !startTime.current ||
        !endTime.current
      ) {
        return;
      }

      const timeSpent = Math.round(
        (endTime.current.getTime() - startTime.current.getTime()) / 1000
      );

      // Don't send if time spent is too small (e.g., less than 1 second)
      if (timeSpent <= 0) {
        timeUpdatePending.current = false;
        return;
      }

      const dataset = {
        ...ipAds,
        seconds: timeSpent,
        url: window.location.href,
        datetime_start: startTime.current.toISOString(),
        datetime_end: endTime.current.toISOString(),
        user: session?.user?.name?.id || "",
      };

      try {
        if (!handle) {
          console.warn("Cannot send time data: handle is undefined");
          return;
        }

        const raw = JSON.stringify(dataset);
        const requestOptions = reqOptions("POST", raw, null, "json");

        const req = await fetch(
          `${API_HOST_URL}history/${handle}/timespent/`,
          requestOptions
        );

        if (req.status === 201) {
          // Reset the pending flag as we've successfully sent the data
          timeUpdatePending.current = false;

          if (IN_DEV_MODE) {
            console.log("Time spent sent to server successfully!");
            const responseData = await req.json();
            console.log(responseData);
          }
        } else {
          console.error(`Server responded with status: ${req.status}`);
        }
      } catch (error) {
        console.error("Couldn't send time data:", error);
        // We could implement retry logic here if needed
      }
    };

    sendTime();

    // Cleanup function to ensure we attempt to send any pending time data
    return () => {
      if (timeUpdatePending.current) {
        sendTime();
      }
    };
  }, [visibility, session, ipAds, handle]); // Removed refs from dependencies

  return null; // Using null instead of empty fragment for slightly better performance
};

export default ReactTimeTracker;
