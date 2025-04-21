// ResponsiveNavbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Session } from "next-auth";
import { NavbarPropsType, NavLinkType, UserAreaLinkType } from "../../types";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ResponsiveNavbar = ({
  session,
  logoSrc,
  logoAlt = "Company Logo",
  navLinks,
  userAreaLinks = [],
  theme: initialTheme = "LightMode",
  containerClass = "ihub-container",
}: NavbarPropsType) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [activeUserSubmenu, setActiveUserSubmenu] = useState<number | null>(
    null
  );
  const [theme, setTheme] = useState<"LightMode" | "DarkMode">(initialTheme);

  const user = session?.user?.name;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as
      | "LightMode"
      | "DarkMode";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.remove("LightMode", "DarkMode");
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Handle main mobile menu
      if (
        isMenuOpen &&
        !target.closest(".ihub-navbar-elements") &&
        !target.closest(".ihub-hamburger")
      ) {
        setIsMenuOpen(false);
      }

      // Handle user dropdown
      if (userDropdownOpen && !target.closest(".ihub-user-dropdown")) {
        setUserDropdownOpen(false);
        setActiveUserSubmenu(null);
      }

      // Handle nav submenus
      if (
        activeSubmenu !== null &&
        !target.closest(`.ihub-nav-submenu-${activeSubmenu}`)
      ) {
        setActiveSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, userDropdownOpen, activeSubmenu, activeUserSubmenu]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Reset submenus when toggling main menu
    setActiveSubmenu(null);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
    setActiveUserSubmenu(null);
  };

  const toggleSubmenu = (index: number, event: React.MouseEvent) => {
    event.preventDefault();
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  const toggleUserSubmenu = (index: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveUserSubmenu(activeUserSubmenu === index ? null : index);
  };

  const toggleTheme = () => {
    const newTheme = theme === "LightMode" ? "DarkMode" : "LightMode";
    document.documentElement.classList.remove("LightMode", "DarkMode");
    document.documentElement.classList.add(newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <header
      className={`ihub-navbar ${scrolled ? "ihub-navbar-scrolled" : ""} ${
        theme === "DarkMode" ? "ihub-navbar-dark" : ""
      }`}
    >
      <div className={containerClass}>
        <nav className="ihub-navbar-container">
          {/* Logo */}
          <div className="ihub-navbar-logo">
            <Link href="/">
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={120}
                height={40}
                className="ihub-logo-image"
              />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="ihub-hamburger" onClick={toggleMenu}>
            <div
              className={`ihub-hamburger-line ${
                isMenuOpen ? "ihub-active" : ""
              }`}
            ></div>
            <div
              className={`ihub-hamburger-line ${
                isMenuOpen ? "ihub-active" : ""
              }`}
            ></div>
            <div
              className={`ihub-hamburger-line ${
                isMenuOpen ? "ihub-active" : ""
              }`}
            ></div>
          </div>

          {/* Navigation Links */}
          <div
            className={`ihub-navbar-elements ${
              isMenuOpen ? "ihub-active" : ""
            }`}
          >
            <ul className="ihub-nav-links">
              {navLinks.map((link, index) => (
                <li
                  key={index}
                  className={`ihub-nav-item ihub-nav-submenu-${index} ${
                    link.submenu ? "ihub-has-submenu" : ""
                  } ${activeSubmenu === index ? "ihub-submenu-active" : ""}`}
                >
                  {link.submenu ? (
                    <>
                      <a
                        href="#"
                        onClick={(e) => toggleSubmenu(index, e)}
                        className={`ihub-submenu-toggle ${
                          link.highlight ? "ihub-nav-highlight" : ""
                        }`}
                      >
                        {link.title}
                        <span className="ihub-dropdown-arrow"></span>
                      </a>
                      {activeSubmenu === index && (
                        <ul className="ihub-submenu">
                          {link.submenu.map((subItem, subIndex) => (
                            <li key={subIndex} className="ihub-submenu-item">
                              {subItem.isExternal ? (
                                <a
                                  href={subItem.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {subItem.icon && (
                                    <span className="ihub-submenu-icon">
                                      {subItem.icon}
                                    </span>
                                  )}
                                  {subItem.title}
                                </a>
                              ) : (
                                <Link href={subItem.href}>
                                  {subItem.icon && (
                                    <span className="ihub-submenu-icon">
                                      {subItem.icon}
                                    </span>
                                  )}
                                  {subItem.title}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <>
                      {link.isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={link.highlight ? "ihub-nav-highlight" : ""}
                        >
                          {link.title}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className={link.highlight ? "ihub-nav-highlight" : ""}
                        >
                          {link.title}
                        </Link>
                      )}
                    </>
                  )}
                </li>
              ))}

              {/* Theme Toggle */}
              <li className="ihub-nav-item">
                <button
                  onClick={toggleTheme}
                  className="ihub-theme-toggle"
                  aria-label={`Switch to ${
                    theme === "LightMode" ? "DarkMode" : "LightMode"
                  } mode`}
                >
                  {theme === "LightMode" ? <DarkModeIcon /> : <LightModeIcon />}
                </button>
              </li>
            </ul>

            {/* User Area */}
            <div className="ihub-navbar-user-area">
              {session ? (
                <div className="ihub-user-dropdown">
                  <div
                    className="ihub-user-profile"
                    onClick={toggleUserDropdown}
                  >
                    {user?.picture ? (
                      <Image
                        src={user.picture}
                        alt="User"
                        width={40}
                        height={40}
                        className="ihub-user-avatar"
                      />
                    ) : (
                      <div className="ihub-user-initials">
                        {user?.full_name?.charAt(0) || "U"}
                      </div>
                    )}
                    <span className="ihub-user-name ihub-hide-sm">
                      {user?.full_name}
                      <span className="ihub-dropdown-arrow"></span>
                    </span>
                  </div>

                  {userDropdownOpen && (
                    <div className="ihub-dropdown ihub-user-menu-dropdown">
                      {userAreaLinks.map((link, index) => (
                        <div key={index} className="ihub-dropdown-item-wrapper">
                          {link.submenu ? (
                            <div className="ihub-dropdown-with-submenu">
                              <a
                                href="#"
                                className="ihub-dropdown-item ihub-dropdown-parent"
                                onClick={(e) => toggleUserSubmenu(index, e)}
                              >
                                {link.icon && (
                                  <span className="ihub-dropdown-icon">
                                    {link.icon}
                                  </span>
                                )}
                                {link.title}
                                <span
                                  className={`ihub-submenu-caret ${
                                    activeUserSubmenu === index
                                      ? "ihub-active"
                                      : ""
                                  }`}
                                ></span>
                              </a>

                              {activeUserSubmenu === index && (
                                <div className="ihub-user-submenu">
                                  {link.submenu.map((subItem, subIndex) => (
                                    <Link
                                      key={subIndex}
                                      href={subItem.href}
                                      className="ihub-dropdown-subitem"
                                      target={
                                        subItem.isExternal
                                          ? "_blank"
                                          : undefined
                                      }
                                      rel={
                                        subItem.isExternal
                                          ? "noopener noreferrer"
                                          : undefined
                                      }
                                    >
                                      {subItem.icon && (
                                        <span className="ihub-dropdown-icon">
                                          {subItem.icon}
                                        </span>
                                      )}
                                      {subItem.title}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            <Link
                              href={link.href}
                              className="ihub-dropdown-item"
                            >
                              {link.icon && (
                                <span className="ihub-dropdown-icon">
                                  {link.icon}
                                </span>
                              )}
                              {link.title}
                            </Link>
                          )}
                        </div>
                      ))}
                      <Link
                        href="/api/auth/signout"
                        className="ihub-dropdown-item ihub-signout"
                      >
                        <span className="ihub-dropdown-icon">⤴</span>
                        Sign out
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="ihub-auth-buttons">
                  {userAreaLinks.map((link, index) =>
                    link.isButton ? (
                      <Link
                        key={index}
                        href={link.href}
                        className={`ihub-btn ${
                          link.buttonStyle === "outline"
                            ? "ihub-outlined-btn"
                            : "ihub-important-btn"
                        }`}
                      >
                        {link.title}
                      </Link>
                    ) : (
                      <Link
                        key={index}
                        href={link.href}
                        className="ihub-auth-link"
                      >
                        {link.title}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default ResponsiveNavbar;
