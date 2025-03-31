"use client";
import { useState, useEffect, useRef } from "react";
import { API_HOST_URL, IN_DEV_MODE, reqOptions } from "../lib/helpFunction";

import { SessionUser } from "../theme/signout/SessionExpiresLogout";

interface IPAddressData {
  ip_address?: string;
  [key: string]: any; // For other potentially unknown properties
}
interface TimeTrackerProps {
  channel_username?: string;
  IPAdress: IPAddressData;
  session: SessionUser;
  selectIPAdress: any;
  useDispatch: any;
  useSelector: any;
}

const TimeTracker: React.FC<TimeTrackerProps> = ({
  channel_username,
  IPAdress,
  session,
  selectIPAdress,
  useDispatch,
  useSelector,
}) => {
  const dispatch = useDispatch();
  const ipAds = useSelector(selectIPAdress);
  const startTime = useRef<Date | null>(new Date());
  const endTime = useRef<Date | null>(null);
  const [visibility, setVisibility] = useState<string | undefined>();
  const handle = channel_username;

  const handleVisibilityChange = (): void => {
    setVisibility(document?.visibilityState);
    if (document.visibilityState === "hidden") {
      endTime.current = new Date();
    } else {
      startTime.current = new Date();
      endTime.current = null;
    }
  };

  const handleIdle = (): void => {
    endTime.current = new Date();
  };

  // Setup event listeners
  useEffect(() => {
    startTime.current = new Date();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("idle", handleIdle);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("idle", handleIdle);
    };
  }, []);

  // Fetch IP address if not available
  useEffect(() => {
    if (!ipAds?.ip_address) {
      const fetchIpAddress = async (): Promise<void> => {
        try {
          const response = await fetch("/api/user-ip-address");
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
  }, [dispatch, ipAds?.ip_address]);

  // Send time data to server
  useEffect(() => {
    const sendTime = async (): Promise<void> => {
      if (startTime.current && endTime.current) {
        const timeSpent = Math.round(
          (endTime.current.getTime() - startTime.current.getTime()) / 1000
        ); // in seconds

        const dataset = {
          ...ipAds,
          seconds: timeSpent,
          url: window.location.href,
          datetime_start: startTime.current.toISOString(),
          datetime_end: endTime.current.toISOString(),
          user: session?.user?.name?.id || "",
        };

        try {
          const raw = JSON.stringify(dataset);
          const requestOptions = reqOptions("POST", raw, null, "json");

          if (!handle) {
            console.warn("Cannot send time data: handle is undefined");
            return;
          }

          const req = await fetch(
            `${API_HOST_URL}history/${handle}/timespent/`,
            requestOptions
          );

          if (req.status === 201) {
            console.log("Time spent sent to server successfully!");
          } else {
            console.error(`Server responded with status: ${req.status}`);
          }

          if (IN_DEV_MODE) {
            const responseData = await req.json();
            console.log(responseData);
          }
        } catch (error) {
          console.error("Couldn't send time data:", error);
        }
      }
    };
    sendTime();
  }, [endTime.current, startTime.current, visibility, session, ipAds, handle]);

  return null;
};

export default TimeTracker;
