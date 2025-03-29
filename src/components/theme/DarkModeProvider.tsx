import { useEffect, ReactNode, FC } from "react";

export type Theme = "DarkMode" | "LightMode" | "Device";

interface DarkModeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  onChange?: (theme: Theme) => void;
}

/**
 * Provider component that manages theme state based on user preference or system settings
 */
const DarkModeProvider: FC<DarkModeProviderProps> = ({ 
  children, 
  defaultTheme = "Device",
  onChange 
}) => {
  useEffect(() => {
    // Apply the theme based on stored preference or system settings
    const applyTheme = () => {
      const rootHTML = document.documentElement;
      const storedTheme = localStorage.getItem("theme") as Theme | null;
      let activeTheme: Theme;

      // Clear existing theme classes
      rootHTML.classList.remove("DarkMode", "LightMode");

      if (storedTheme === "DarkMode" || storedTheme === "LightMode") {
        // Apply stored user preference
        rootHTML.classList.add(storedTheme);
        activeTheme = storedTheme;
      } else {
        // Apply system preference
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const systemTheme: Theme = prefersDark ? "DarkMode" : "LightMode";
        
        rootHTML.classList.add(systemTheme);
        localStorage.setItem("theme", defaultTheme);
        activeTheme = systemTheme;
      }

      // Notify parent component of theme change if callback provided
      onChange?.(activeTheme);
    };

    // Initial theme application
    applyTheme();

    // Set up listener for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (localStorage.getItem("theme") === "Device") {
        applyTheme();
      }
    };

    // Add event listener with browser compatibility check
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Clean up listener on unmount
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [defaultTheme, onChange]);

  return <>{children}</>;
};

export default DarkModeProvider;