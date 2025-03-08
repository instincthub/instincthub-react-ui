import { useEffect } from "react";

export default function DarkModeProvider({ children }) {
  useEffect(() => {
    // The useEffect is changing system preview mode
    // either Darkmode or LightMode
    const rootHTML = document.querySelector("html");
    const themeMode = localStorage.getItem("theme");

    if (themeMode === "DarkMode" || themeMode === "LightMode") {
      rootHTML.className = "";
      rootHTML.classList.add(themeMode);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDark) {
        rootHTML.classList.add("DarkMode");
      } else {
        rootHTML.classList.add("LightMode");
      }
      localStorage.setItem("theme", "Device");
    }
  });
  return <>{children}</>;
}
