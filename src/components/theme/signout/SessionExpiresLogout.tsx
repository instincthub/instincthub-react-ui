import { useEffect, useRef, useState } from "react";
import { getData } from "../../lib/auth/dbRequestst";
import SignOutSession from "./SignOutSession";

/**
 * Session data user information
 */
interface SessionUser {
  name?: {
    uuid?: string;
    token?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

/**
 * Session data structure
 */
interface SessionData {
  expires: string;
  user?: SessionUser;
  [key: string]: any;
}

/**
 * Properties for the SessionExpiresLogout component
 */
interface SessionExpiresLogoutProps {
  /** Child components to render when session is valid */
  children: React.ReactNode;
  /** Next.js session object */
  session: SessionData | null;
  /** Custom message to display when session expires */
  expiredMessage?: string;
  /** Whether to disable automatic session validation */
  disableValidation?: boolean;
  /** Callback function when session validation fails */
  onSessionInvalid?: () => void;
}

/**
 * Component that validates session and token expiration
 * and displays a logout screen when invalid
 */
const SessionExpiresLogout: React.FC<SessionExpiresLogoutProps> = ({
  children,
  session,
  expiredMessage = "Your logged in session has expired!",
  disableValidation = false,
  onSessionInvalid
}) => {
  const [valid, setValid] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const checkedRef = useRef<boolean>(false);

  const checkExpiringDate = async (): Promise<void> => {
    if (!session) {
      setIsLoading(false);
      return;
    }

    try {
      const user = session?.user?.name;
      const sessionExpiry = new Date(session?.expires);

      // Check if the session has expired
      if (sessionExpiry < new Date() || !user?.uuid) {
        console.warn("Session expired or invalid user UUID. Signing out...");
        setValid(false);
        if (onSessionInvalid) onSessionInvalid();
        setIsLoading(false);
        return;
      }

      // Skip validation if disabled
      if (disableValidation) {
        setIsLoading(false);
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
        if (onSessionInvalid) onSessionInvalid();
      }
    } catch (error) {
      console.error("Error during session validation:", error);
      // Don't invalidate session on error - just log it
    } finally {
      // Mark as checked and remove loading state
      checkedRef.current = true;
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Run checkExpiringDate only if not already checked
    if (session && !checkedRef.current) {
      checkExpiringDate();
    } else if (!session) {
      setIsLoading(false);
    }
  }, [session]); // Run when session changes

  if (isLoading) {
    // Return a loading state - can be customized
    return (
      <div className="ihub-session-loading">
        <div className="ihub-session-loading-spinner"></div>
      </div>
    );
  }

  if (!valid) {
    return <SignOutSession message={expiredMessage} />;
  }

  return <>{children}</>;
};

export default SessionExpiresLogout;