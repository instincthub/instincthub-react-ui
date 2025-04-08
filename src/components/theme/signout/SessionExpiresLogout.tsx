"use client";
import React, { useEffect, useState } from "react";
import { getData } from "../../lib/auth/dbRequestst";
import SignOutSession from "./SignOutSession";
import { SessionType } from "src/types";

interface SessionExpiresLogoutProps {
  children: React.ReactNode;
  session: SessionType | null;
  expiredMessage?: string;
  disableValidation?: boolean;
  onSessionInvalid?: () => void;
}

type ValidationState = "loading" | "valid" | "invalid";

/**
 * 
 * @constructor
 * @example
 * <SessionExpiresLogout session={session}>
 *   <div>Your session has expired</div>
 * </SessionExpiresLogout>
 * 
 */
export default function SessionExpiresLogout({
  children,
  session,
  expiredMessage = "Your logged in session has expired!",
  disableValidation = false,
  onSessionInvalid,
}: SessionExpiresLogoutProps) {
  const [validationState, setValidationState] =
    useState<ValidationState>("loading");

  useEffect(() => {
    let isMounted = true;

    async function validateSession() {
      // No session case
      if (!session) {
        if (isMounted) setValidationState("invalid");
        return;
      }

      try {
        const user = session?.user?.name;
        const sessionExpiry = new Date(session?.expires);

        // Check session expiration
        if (sessionExpiry < new Date() || !user?.uuid) {
          console.warn("Session expired or invalid user UUID");
          if (isMounted) {
            setValidationState("invalid");
            if (onSessionInvalid) onSessionInvalid();
          }
          return;
        }

        // Skip further validation if disabled
        if (disableValidation) {
          if (isMounted) setValidationState("valid");
          return;
        }

        // Validate token with API
        const funcParams = {
          path: `auth/skills/validate-user-token/?access_token=${user?.token}&user_uuid=${user?.uuid}`,
          token: user?.token,
          auth_sk: true,
        };

        const res = await getData(funcParams);

        if (
          !isMounted ||
          res?.detail === "Unauthorized" ||
          res?.detail === "Not found." ||
          !res?.detail
        ) {
          if (isMounted) {
            setValidationState("invalid");
            if (onSessionInvalid) onSessionInvalid();
          }
        } else {
          if (isMounted) setValidationState("valid");
        }
      } catch (error) {
        console.error("Error during session validation:", error);
        // Set to valid on error as a fallback - can be changed based on requirements
        if (isMounted) setValidationState("valid");
      }
    }

    validateSession();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [session, disableValidation, onSessionInvalid]);

  if (validationState === "loading") {
    return (
      <div className="ihub-session-loading">
        <div className="ihub-session-loading-spinner"></div>
      </div>
    );
  }

  if (validationState === "invalid") {
    return <SignOutSession message={expiredMessage} />;
  }

  return <>{children}</>;
}
