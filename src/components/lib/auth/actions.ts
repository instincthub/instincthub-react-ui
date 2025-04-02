"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

/**
 * Redirects to the login page with the current URL as callback
 * @returns Promise<void>
 */
export const login = async (): Promise<void> => {
  if (typeof window !== "undefined") {
    const hostUrl = encodeURIComponent(window.location.href);
    window.location.href = `${window.location.origin}/auth/login?callbackUrl=${hostUrl}`;
  }
};

/**
 * Redirects to the signup page with the current URL as callback
 * @returns Promise<void>
 */
export const signup = async (): Promise<void> => {
  if (typeof window !== "undefined") {
    const hostUrl = encodeURIComponent(window.location.href);
    const router = useRouter();
    router.push(`/auth/signup?callbackUrl=${hostUrl}`);
  }
};

/**
 * Signs out the user and reloads the page
 * @returns Promise<void>
 */
export const logout = async (): Promise<void> => {
  if (typeof window !== "undefined") {
    await signOut({ redirect: false });
    window.location.reload();
  }
};