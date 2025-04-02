"use client";

import React from "react";
import { logout } from "../../lib/auth/actions";
import Image from "next/image";

interface SignOutSessionProps {
  message?: string;
  showImage?: boolean;
}

/**
 * SignOutSession component displayed when user's session has expired
 */
export default function SignOutSession({
  message = "Your logged in session has expired!",
  showImage = true,
}: SignOutSessionProps) {
  return (
    <section className="ihub-signout-section">
      <div className="ihub-signout-overlay">
        <div className="ihub-signout-card">
          {showImage && (
            <div className="ihub-signout-image-container">
              <Image
                src="/images/session-expired.svg"
                alt="Session Expired"
                width={120}
                height={120}
                className="ihub-signout-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            </div>
          )}

          <h2 className="ihub-signout-title">Session Expired</h2>
          <p className="ihub-signout-message">{message}</p>

          <div className="ihub-signout-actions">
            <button
              className="ihub-signout-button important-btn"
              onClick={logout}
              aria-label="Sign out"
            >
              Sign out
            </button>
          </div>

          <p className="ihub-signout-help">
            Need help?{" "}
            <a href="/support" className="ihub-signout-link">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
