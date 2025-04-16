"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function MainNavigation() {
  const [theme, setTheme] = useState<"LightMode" | "DarkMode">(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("DarkMode")
        ? "DarkMode"
        : "LightMode";
    }
    return "LightMode";
  });

  const toggleTheme = () => {
    const newTheme = theme === "LightMode" ? "DarkMode" : "LightMode";
    document.documentElement.classList.remove("LightMode", "DarkMode");
    document.documentElement.classList.add(newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as
      | "LightMode"
      | "DarkMode";
    if (savedTheme) {
      document.documentElement.classList.remove("LightMode", "DarkMode");
      document.documentElement.classList.add(savedTheme);
      setTheme(savedTheme);
    }
  }, []);

  return (
    <header>
      <div className="container flexible">
        <div className="logo-container">
          <Link href="/">
            <img
              src="/instincthub-logo.png"
              alt="InstinctHub UI"
              className="logo"
            />
          </Link>
        </div>
        <nav>
          <ul className="navlinks">
            <li>
              <Link href="/docs">Documentation</Link>
            </li>
            <li>
              <Link href="/components">Components</Link>
            </li>
            <li>
              <Link href="/examples">Examples</Link>
            </li>
            <li>
              <Link href="/resources">Resources</Link>
            </li>
            <li>
              <button
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label={`Switch to ${
                  theme === "LightMode" ? "dark" : "light"
                } mode`}
              >
                {theme === "LightMode" ? <DarkModeIcon /> : <LightModeIcon />}
              </button>
            </li>
            <li>
              <Link
                href="https://github.com/instincthub/instincthub-react-ui"
                rel="noreferrer noopener"
                target="_blank"
              >
                <img
                  src="/github-mark.svg"
                  alt="GitHub"
                  style={{ width: "24px", height: "24px" }}
                />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default MainNavigation;
