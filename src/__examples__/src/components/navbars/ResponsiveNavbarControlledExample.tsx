"use client";

import React, { useState } from "react";
import { ResponsiveNavbar } from "../../../../index";
import logoImage from "/public/instincthub-logo.png";
import {
  NavLinkType,
  UserAreaLinkType,
  DropdownRenderProps,
} from "../../../../types";
import { NEXT_AUTH_SESSION_DATA_DUMMY } from "../../../../components/lib";
import Link from "next/link";

export default function ResponsiveNavbarControlledExample() {
  // State for controlled dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedView, setSelectedView] = useState<"default" | "custom">("default");

  // Navigation links configuration
  const navLinks = [
    { title: "Home", href: "/" },
    {
      title: "Features",
      href: "#",
      submenu: [
        { title: "Core Features", href: "/features/core" },
        { title: "Enterprise", href: "/features/enterprise" },
      ],
    },
    { title: "Pricing", href: "/pricing" },
    { title: "Contact", href: "/contact" },
  ] as NavLinkType[];

  // User area links for default dropdown
  const userAreaLinks = [
    { title: "Dashboard", href: "/dashboard", icon: "🏠" },
    {
      title: "Account",
      href: "#",
      icon: "👤",
      submenu: [
        { title: "Profile", href: "/profile" },
        { title: "Settings", href: "/settings" },
      ],
    },
    { title: "Help", href: "/help", icon: "❓" },
  ] as UserAreaLinkType[];

  // Custom dropdown renderer
  const renderCustomDropdown = ({
    user,
    isOpen,
    toggleDropdown,
    closeDropdown,
  }: DropdownRenderProps) => {
    return (
      <div className="custom-dropdown-content" style={{
        padding: "1rem",
        backgroundColor: "var(--bg-secondary)",
        borderRadius: "8px",
        minWidth: "250px",
      }}>
        {/* User Profile Section */}
        <div style={{
          borderBottom: "1px solid var(--border-color)",
          paddingBottom: "1rem",
          marginBottom: "1rem",
        }}>
          <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
            {user?.name || "User"}
          </div>
          <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
            {user?.email || "user@example.com"}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: "1rem" }}>
          <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem", opacity: 0.7 }}>
            Quick Actions
          </h4>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button 
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "var(--primary-color)",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
              onClick={() => {
                alert("New Project clicked!");
                closeDropdown();
              }}
            >
              + New Project
            </button>
            <button 
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "transparent",
                color: "var(--primary-color)",
                border: "1px solid var(--primary-color)",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
              onClick={() => {
                alert("Invite Team clicked!");
                closeDropdown();
              }}
            >
              Invite Team
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div style={{ marginBottom: "1rem" }}>
          <Link 
            href="/dashboard" 
            style={{ 
              display: "block", 
              padding: "0.5rem", 
              color: "inherit",
              textDecoration: "none",
              borderRadius: "4px",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--hover-bg)"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
            onClick={() => closeDropdown()}
          >
            📊 Analytics Dashboard
          </Link>
          <Link 
            href="/projects" 
            style={{ 
              display: "block", 
              padding: "0.5rem", 
              color: "inherit",
              textDecoration: "none",
              borderRadius: "4px",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--hover-bg)"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
            onClick={() => closeDropdown()}
          >
            📁 My Projects
          </Link>
          <Link 
            href="/settings" 
            style={{ 
              display: "block", 
              padding: "0.5rem", 
              color: "inherit",
              textDecoration: "none",
              borderRadius: "4px",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--hover-bg)"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
            onClick={() => closeDropdown()}
          >
            ⚙️ Account Settings
          </Link>
        </div>

        {/* Sign Out */}
        <Link 
          href="/api/auth/signout"
          style={{
            display: "block",
            padding: "0.5rem 1rem",
            textAlign: "center",
            backgroundColor: "var(--danger-bg)",
            color: "var(--danger-text)",
            borderRadius: "4px",
            textDecoration: "none",
            fontSize: "0.875rem",
          }}
          onClick={() => closeDropdown()}
        >
          Sign Out
        </Link>
      </div>
    );
  };

  return (
    <main>
      {/* Demo Controls */}
      <div style={{ 
        padding: "1rem", 
        backgroundColor: "#f5f5f5", 
        borderBottom: "1px solid #ddd",
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}>
        <h3>ResponsiveNavbar Demo Controls</h3>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
          {/* View Selector */}
          <div>
            <label style={{ marginRight: "0.5rem" }}>Dropdown Content:</label>
            <select 
              value={selectedView} 
              onChange={(e) => setSelectedView(e.target.value as "default" | "custom")}
              style={{ padding: "0.25rem 0.5rem" }}
            >
              <option value="default">Default (Array-based)</option>
              <option value="custom">Custom (Render Function)</option>
            </select>
          </div>

          {/* Dropdown Control */}
          <div>
            <label style={{ marginRight: "0.5rem" }}>
              Controlled Dropdown: 
              <input 
                type="checkbox" 
                checked={dropdownOpen}
                onChange={(e) => setDropdownOpen(e.target.checked)}
                style={{ marginLeft: "0.5rem" }}
              />
            </label>
            <span style={{ 
              marginLeft: "0.5rem", 
              padding: "0.25rem 0.5rem", 
              backgroundColor: dropdownOpen ? "#4CAF50" : "#f44336",
              color: "white",
              borderRadius: "4px",
              fontSize: "0.75rem",
            }}>
              {dropdownOpen ? "OPEN" : "CLOSED"}
            </span>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Toggle Dropdown Programmatically
          </button>
        </div>
      </div>

      {/* ResponsiveNavbar with controlled props */}
      <ResponsiveNavbar
        session={NEXT_AUTH_SESSION_DATA_DUMMY}
        logoSrc={logoImage.src}
        logoAlt="Company Logo"
        navLinks={navLinks}
        userAreaLinks={userAreaLinks}
        theme="LightMode"
        userDropdownOpen={dropdownOpen}
        onUserDropdownToggle={(isOpen) => {
          console.log("Dropdown toggled:", isOpen);
          setDropdownOpen(isOpen);
        }}
        renderUserDropdown={selectedView === "custom" ? renderCustomDropdown : undefined}
      />

      {/* Page Content */}
      <div style={{ padding: "2rem", minHeight: "100vh" }}>
        <h1>ResponsiveNavbar with Controlled Dropdown</h1>
        <p>
          This example demonstrates the new features of the ResponsiveNavbar:
        </p>
        <ul>
          <li>
            <strong>Controlled Dropdown State:</strong> The dropdown can be controlled 
            externally using <code>userDropdownOpen</code> and <code>onUserDropdownToggle</code> props.
          </li>
          <li>
            <strong>Custom Dropdown Content:</strong> You can provide a custom render 
            function via <code>renderUserDropdown</code> to completely customize the dropdown content.
          </li>
          <li>
            <strong>Backward Compatibility:</strong> The component still works with the 
            original array-based configuration when no custom renderer is provided.
          </li>
        </ul>

        <h2>Usage Examples</h2>
        
        <h3>1. Controlled Dropdown (Boolean Props)</h3>
        <pre style={{ backgroundColor: "#f5f5f5", padding: "1rem", borderRadius: "4px" }}>
{`<ResponsiveNavbar
  userDropdownOpen={dropdownOpen}
  onUserDropdownToggle={(isOpen) => {
    setDropdownOpen(isOpen);
  }}
  // ... other props
/>`}
        </pre>

        <h3>2. Custom Dropdown Content</h3>
        <pre style={{ backgroundColor: "#f5f5f5", padding: "1rem", borderRadius: "4px" }}>
{`<ResponsiveNavbar
  renderUserDropdown={({ user, closeDropdown }) => (
    <CustomDropdownContent 
      user={user}
      onClose={closeDropdown}
    />
  )}
  // ... other props
/>`}
        </pre>

        <h3>3. Combined (Controlled + Custom)</h3>
        <pre style={{ backgroundColor: "#f5f5f5", padding: "1rem", borderRadius: "4px" }}>
{`<ResponsiveNavbar
  userDropdownOpen={dropdownOpen}
  onUserDropdownToggle={setDropdownOpen}
  renderUserDropdown={renderCustomDropdown}
  // ... other props
/>`}
        </pre>
      </div>
    </main>
  );
}