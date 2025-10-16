"use client";
import { useState, useEffect, useRef } from "react";
import { API_HOST_URL, IN_DEV_MODE, reqOptions } from "../lib/helpFunction";
import { Session } from "@/types/auth";
import { useParams } from "next/navigation";
import {
  useDispatch,
  useSelector,
  selectIPAdress,
  IPAdress,
} from "../lib/redux";


interface TimeTrackerProps {
  channel_username?: string | null;
  session: Session | null;
  endpoint: string | null;
}

/**
 * React Time Tracker Component
 * Tracks user active time on a page and reports it to the backend.
 * <ReactTimeTracker channel_username="skills" session={session} endpoint="/api/user-ip-address"/>
 */
export default function ReactTimeTracker({
  channel_username = null,
  session,
  endpoint = "/api/user-ip-address",
}: TimeTrackerProps) {
  const dispatch = useDispatch();
  const ipAds = useSelector<any>(selectIPAdress);
  const startTime = useRef<Date>(new Date());
  const endTime = useRef<Date | null>(null);
  const timeUpdatePending = useRef<boolean>(false);
  const params = useParams<{ channel: string }>();
  const handle = params.channel || channel_username;

  // ✅ Safe initialization for SSR
  const [visibility, setVisibility] = useState<string>("visible");

  useEffect(() => {
    if (typeof document !== "undefined") {
      setVisibility(document.visibilityState);
    }
  }, []);

  // Handle visibility changes
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

  // Handle idle event (if supported)
  const handleIdle = (): void => {
    endTime.current = new Date();
    timeUpdatePending.current = true;
    setVisibility((prev) => (prev === "idle" ? "idle_update" : "idle"));
  };

  // Setup event listeners
  useEffect(() => {
    if (typeof document === "undefined") return;

    startTime.current = new Date();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("idle", handleIdle);

    return () => {
      if (startTime.current && !endTime.current) {
        endTime.current = new Date();
        timeUpdatePending.current = true;
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("idle", handleIdle);
    };
  }, []);

  // Fetch IP address once
  useEffect(() => {
    if (!ipAds?.ip_address) {
      const fetchIpAddress = async (): Promise<void> => {
        try {
          const response = await fetch(endpoint || "");
          if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);
          const data = await response.json();
          dispatch(IPAdress.actions.set(data));
        } catch (error) {
          console.error("Error fetching IP address:", error);
        }
      };
      fetchIpAddress();
    }
  }, [dispatch, ipAds?.ip_address, endpoint]);

  // Send time data to server when needed
  useEffect(() => {
    const sendTime = async (): Promise<void> => {
      if (!timeUpdatePending.current || !startTime.current || !endTime.current)
        return;

      const timeSpent = Math.round(
        (endTime.current.getTime() - startTime.current.getTime()) / 1000
      );

      if (timeSpent <= 0) {
        timeUpdatePending.current = false;
        return;
      }

      const dataset = {
        ...ipAds,
        seconds: timeSpent,
        url: typeof window !== "undefined" ? window.location.href : "",
        datetime_start: startTime.current.toISOString(),
        datetime_end: endTime.current.toISOString(),
        user: session?.user?.id || "",
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
      }
    };

    sendTime();

    return () => {
      if (timeUpdatePending.current) sendTime();
    };
  }, [visibility, session, ipAds, handle]);

  return null;
}
