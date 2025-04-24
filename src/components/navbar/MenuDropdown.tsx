"use client";
import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import ChannelListAvatar from "./ChannelListAvatar";
import { SessionUserType } from "../../types";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

type ThemeOption = "Device" | "LightMode" | "DarkMode";
type MenuOption = "option1" | "option2" | null;

/**
 * @component
 * @example
 * ```tsx
 *
 * <MenuDropdown />
 * ```
 */
function MenuDropdown(): JSX.Element {
  const { data: session } = useSession();
  const user = session?.user as SessionUserType | undefined;
  const [selectedOption, setSelectedOption] = useState<MenuOption>(null);
  const [previousOption, setPreviousOption] = useState<MenuOption>(null);
  const [theme, setTheme] = useState<ThemeOption>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as ThemeOption) || "Device";
    }
    return "Device";
  });

  /**
   * Handles menu option selection
   * @param option The menu option to select
   */
  const handleOptionClick = (option: MenuOption): void => {
    setPreviousOption(selectedOption);
    setSelectedOption(selectedOption === option ? null : option);
  };

  /**
   * Handles navigation back to previous menu
   */
  const handleBackClick = (): void => {
    setSelectedOption(previousOption);
    setPreviousOption(null);
  };

  /**
   * Handles theme change and updates localStorage and HTML class
   * @param newTheme The theme to set (Device, LightMode, or DarkMode)
   */
  const handleThemeChange = (newTheme: ThemeOption): void => {
    if (typeof window === "undefined") return;

    // Get root HTML element
    const root = document.querySelector("html");
    if (!root) return;

    if (newTheme === "Device") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const themeToSet = prefersDark ? "DarkMode" : "LightMode";

      localStorage.setItem("theme", themeToSet);
      root.className = "";
      root.classList.add(themeToSet);
    } else {
      root.className = "";
      root.classList.add(newTheme);
      localStorage.setItem("theme", newTheme);
    }

    setTheme(newTheme);
  };

  return (
    <div
      className="ihub-menu-dropdown"
      style={{ width: selectedOption ? "350px" : "270px" }}
    >
      <section className="ihub-fitted-globe">
        {selectedOption && (
          <div className="ihub-step-back">
            <ArrowBackOutlinedIcon
              onClick={handleBackClick}
              className="ihub-cursor-pointer"
            />
          </div>
        )}
        {!selectedOption && (
          <ul className="ihub-menu">
            <div className="ihub-name-truce">
              {user?.name?.image ? (
                <Image
                  src={user.name.image}
                  height={55}
                  width={55}
                  alt={user.name.full_name || "User avatar"}
                  className="ihub-dp"
                />
              ) : (
                <p className="ihub-char-avatar">
                  {user?.name?.full_name?.charAt(0) || ""}
                </p>
              )}
              <div>
                <h4 className="ihub-m-0">{user?.name?.full_name}</h4>
                <p>@{user?.name?.username}</p>
              </div>
            </div>
            <ul className="ihub-ff-layer">
              <li className="ihub-your-courses">Your Course</li>
              <li className="ihub-instincthub-b">InstinctHub</li>
              <li
                className="ihub-menu-item ihub-switch-acct"
                onClick={() => handleOptionClick("option1")}
              >
                Switch Account
              </li>
              {session ? (
                <li className="ihub-sign-out" onClick={() => signOut()}>
                  Sign out
                </li>
              ) : (
                <li className="ihub-sign-out" onClick={() => signIn()}>
                  Sign in
                </li>
              )}
            </ul>

            <ul className="ihub-option2">
              <li
                className="ihub-menu-item ihub-appearance-theme ihub-m-0"
                onClick={() => handleOptionClick("option2")}
              >
                Appearance Theme
              </li>
              <li className="ihub-feedbacks ihub-m-0">Feedbacks</li>
            </ul>
          </ul>
        )}
        {selectedOption === "option1" && (
          <ul
            className={`ihub-sub-menu ${
              selectedOption === "option1" ? "ihub-submenu-open" : ""
            }`}
          >
            <ChannelListAvatar />
            <ul className="ihub-option2">
              <li className="ihub-sign-out" onClick={() => signOut()}>
                Sign out
              </li>
            </ul>
          </ul>
        )}
        {selectedOption === "option2" && (
          <ul
            className={`ihub-sub-menu ${
              selectedOption === "option2" ? "ihub-submenu-open" : ""
            }`}
          >
            <div className="ihub-appearance">
              <p>Settings apply to this browser alone</p>

              <ul className="ihub-theme-selector">
                <li
                  data-theme="device"
                  onClick={() => handleThemeChange("Device")}
                  className={theme === "Device" ? "add_check" : ""}
                >
                  Use device theme
                </li>
                <li
                  data-theme="dark"
                  onClick={() => handleThemeChange("DarkMode")}
                  className={theme === "DarkMode" ? "add_check" : ""}
                >
                  Dark theme
                </li>
                <li
                  data-theme="light"
                  onClick={() => handleThemeChange("LightMode")}
                  className={theme === "LightMode" ? "add_check" : ""}
                >
                  Light theme
                </li>
              </ul>
            </div>
          </ul>
        )}
      </section>
    </div>
  );
}

export default MenuDropdown;
