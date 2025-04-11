import React from "react";
import { useRouter } from "next/navigation";

/**
 * Logout component that handles user logout functionality
 */
const Logout: React.FC = () => {
  const router = useRouter();

  /**
   * Removes all cookies from the browser
   */
  const removeAllCookies = (): void => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    }
  };

  /**
   * Handles the logout process
   */
  const handleLogout = async (): Promise<void> => {
    try {
      // Code to log out the user
      removeAllCookies();
      router.push("/accounts/login");
    } catch (error) {
      console.error("An error occurred while logging out:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="outline-btn" type="button">
      Logout
    </button>
  );
};

export default Logout;
