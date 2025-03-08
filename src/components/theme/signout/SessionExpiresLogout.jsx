import { useEffect, useRef, useState } from "react";
import { getData } from "@/lib/auth/dbRequests";
import SignOutSession from "./SignOutSession";

export default function SessionExpiresLogout({ children, session }) {
  const [valid, setValid] = useState(true);
  const checkedRef = useRef(false); // Use useRef to track if the session has already been checked

  const checkExpiringDate = async () => {
    if (!session) return;

    try {
      const user = session?.user?.name;
      const sessionExpiry = new Date(session?.expires);

      // Check if the session has expired
      if (sessionExpiry < Date.now() || !user?.uuid) {
        console.warn("Session expired or invalid user UUID. Signing out...");
        setValid(false);
        return;
      }

      // Validate user token and UUID from the database
      const funcParams = {
        path: `auth/skills/validate-user-token/?access_token=${user?.token}&user_uuid=${user?.uuid}`,
        token: user?.token,
        auth_sk: true,
      };

      const res = await getData(funcParams);

      if (
        res?.detail === "Unauthorized" ||
        res?.detail === "Not found." ||
        !res?.detail
      ) {
        console.warn("Token validation failed. Signing out...");
        setValid(false);
        return;
      }

      console.log("Session and token validated successfully.");
    } catch (error) {
      console.error("Error during session validation:", error);
      return;
    } finally {
      // Mark as checked
      checkedRef.current = true;
    }
  };

  useEffect(() => {
    // Run checkExpiringDate only if not already checked
    if (session) {
      checkExpiringDate();
    }
  }, [session]); // Empty dependency array ensures this effect runs only once

  if (!valid) {
    return <SignOutSession />;
  } else {
    return <>{children}</>;
  }
}
