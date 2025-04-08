"use client";
import React, {
  useEffect,
  ReactNode,
  useCallback,
  createContext,
  useContext,
} from "react";

export type Theme = "DarkMode" | "LightMode" | "Device";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface DarkModeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  onChange?: (theme: Theme) => void;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a DarkModeProvider");
  }
  return context;
}

/**
 * Provider component that manages theme state based on user preference or system settings
 * @constructor
 * @example
 * ```tsx
 *
 * <DarkModeProvider>
 *   <Component />
 * </DarkModeProvider>
 * ```
 * Props interface for the DarkModeProviderProps interface
 * @property {ReactNode} children - Child components to render
 * @property {Theme} [defaultTheme] - Default theme to use (defaults to Device)
 */

export default function DarkModeProvider({
  children,
  defaultTheme = "Device",
  onChange,
}: DarkModeProviderProps) {
  // Get initial theme from localStorage or default
  const getInitialTheme = useCallback((): Theme => {
    if (typeof window === "undefined") return defaultTheme;
    return (localStorage.getItem("theme") as Theme) || defaultTheme;
  }, [defaultTheme]);

  // Determine and apply the actual visual theme (dark or light)
  const applyThemeToDOM = useCallback((theme: Theme) => {
    if (typeof window === "undefined") return;

    const rootHTML = document.documentElement;
    rootHTML.classList.remove("DarkMode", "LightMode");

    let effectiveTheme: Theme;

    if (theme === "Device") {
      // Apply system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      effectiveTheme = prefersDark ? "DarkMode" : "LightMode";
    } else {
      effectiveTheme = theme;
    }

    rootHTML.classList.add(effectiveTheme);
    return effectiveTheme;
  }, []);

  // Set theme and store in localStorage
  const setTheme = useCallback(
    (newTheme: Theme) => {
      localStorage.setItem("theme", newTheme);
      const effectiveTheme = applyThemeToDOM(newTheme);
      if (effectiveTheme && onChange) onChange(effectiveTheme);
    },
    [applyThemeToDOM, onChange]
  );

  // Initialize theme on mount
  useEffect(() => {
    const currentTheme = getInitialTheme();
    const effectiveTheme = applyThemeToDOM(currentTheme);
    if (effectiveTheme && onChange) onChange(effectiveTheme);

    // Set up listener for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (localStorage.getItem("theme") === "Device") {
        const newEffectiveTheme = applyThemeToDOM("Device");
        if (newEffectiveTheme && onChange) onChange(newEffectiveTheme);
      }
    };

    // Add event listener with browser compatibility
    const cleanup = attachMediaQueryListener(mediaQuery, handleChange);
    return cleanup;
  }, [getInitialTheme, applyThemeToDOM, onChange]);

  // Helper for media query listeners
  function attachMediaQueryListener(mq: MediaQueryList, handler: () => void) {
    if (mq.addEventListener) {
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    } else {
      mq.addListener(handler);
      return () => mq.removeListener(handler);
    }
  }

  const contextValue = {
    theme: getInitialTheme(),
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
