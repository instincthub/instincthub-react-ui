"use client";

import React from "react";
import Link from "next/link";

interface NotFoundProps {
  message?: string;
  linkText?: string;
  linkHref?: string;
  showHomeLink?: boolean;
}

/**
 * NotFound component displays a 404 error page with customizable message and links
 * @example
 * ```tsx
 * <NotFound message="Page not found" linkText="Go back" linkHref="/" showHomeLink={true} />
 * ```
 * @param message - Custom message to display (defaults to "Page not found")
 * @param linkText - Text for the primary action link
 * @param linkHref - URL for the primary action link
 * @param showHomeLink - Whether to show a link back to home page
 */
const NotFound: React.FC<NotFoundProps> = ({
  message = "Page not found",
  linkText = "Go back",
  linkHref = "/",
  showHomeLink = true,
}) => {
  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-not-found ihub-py-10 ihub-text-center">
        <h1 className="ihub-text-center tw-700 ihub-mb-2">404</h1>
        <div className="ihub-max-w-500 ihub-mx-auto">
          <h2 className="ihub-mb-3">{message}</h2>
          <p className="ihub-mb-5">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="ihub-flex ihub-justify-center ihub-gap-4">
            <Link href={linkHref}>
              <button className="ihub-important-btn">{linkText}</button>
            </Link>

            {showHomeLink && linkHref !== "/" && (
              <Link href="/">
                <button className="ihub-outlined-btn">Back to Home</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
