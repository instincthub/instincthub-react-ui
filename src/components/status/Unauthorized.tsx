import React from "react";

interface UnauthorizedProps {
  /**
   * Custom message to display to the user
   */
  message?: string;
  /**
   * URL to redirect the user to
   */
  redirectTo?: string;
  /**
   * Text to display for the redirect link
   */
  linkText?: string;
  /**
   * HTTP error code to display
   */
  errorCode?: number;
}

/**
 * Unauthorized component displays when a user doesn't have permission to access a page
 * @param props Component properties
 * @returns JSX element with unauthorized message and redirect link
 * @example
 * ```tsx
 * <Unauthorized message="You are not authorized to access this page" redirectTo="/" linkText="Go back to homepage" errorCode={403} />
 * ```
 */
const Unauthorized: React.FC<UnauthorizedProps> = ({
  message,
  redirectTo = "/",
  linkText = "Go back to homepage",
  errorCode = 403,
}) => {
  const url =
    errorCode === 401 ? "/auth/login" : errorCode === 403 ? redirectTo : "/";
  const label = errorCode === 401 ? "Login" : linkText;
  return (
    <div className="ihub-container ihub-pt-20">
      <div className="ihub-max-w-600 ihub-mx-auto ihub-text-center ihub-py-8">
        <div className="ihub-mb-6">
          <div className="ihub-error-code ihub-text-center ihub-mb-4">
            <span className="ihub-text-DarkCyan ihub-fs-5 tw-700">
              {errorCode}
            </span>
          </div>
          <h1 className="ihub-mb-2 tw-600 ihub-text-center">Access Denied</h1>
          <p className="ihub-mb-4 ihub-text-center">
            {message || errorCode === 401
              ? "You are not logged in."
              : "You don't have permission to access this page."}
          </p>
          <a href={url} className="important-btn ihub-inline-block">
            {label}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
