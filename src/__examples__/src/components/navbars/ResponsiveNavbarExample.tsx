"use client";

// Example usage in a Next.js app/page.tsx file
import { ResponsiveNavbar } from "../../../../index";
import logoImage from "/public/instincthub-logo.png";
import {
  SearchObjectItemType,
  NavLinkType,
  UserAreaLinkType,
} from "../../../../types";
import { NEXT_AUTH_SESSION_DATA_DUMMY } from "../../../../components/lib";

export default function ResponsiveNavbarExample({
  params,
  searchParams,
  session,
}: SearchObjectItemType) {
  // Navigation links configuration with submenus
  const navLinks = [
    { title: "Home", href: "/" },
    {
      title: "Features",
      href: "#",
      submenu: [
        { title: "Core Features", href: "/features/core" },
        { title: "Enterprise", href: "/features/enterprise" },
        { title: "Integration", href: "/features/integration", icon: "🔌" },
        { title: "API", href: "/features/api", icon: "🔧" },
      ],
    },
    { title: "Pricing", href: "/pricing" },
    {
      title: "Resources",
      href: "#",
      submenu: [
        { title: "Blog", href: "/blog" },
        { title: "Tutorials", href: "/tutorials" },
        { title: "Case Studies", href: "/case-studies" },
        {
          title: "Documentation",
          href: "https://docs.example.com",
          isExternal: true,
          icon: "📖",
        },
      ],
    },
    { title: "Contact", href: "/contact" },
  ] as NavLinkType[];

  // User area links with submenus (when logged in)
  const userAreaLinks = [
    { title: "Dashboard", href: "/dashboard", icon: "🏠" },
    {
      title: "Library",
      href: "https://skills.instincthub.com/library",
      isExternal: true,
      icon: "📚",
    },
    {
      title: "Account",
      href: "#",
      icon: "👤",
      submenu: [
        { title: "Profile", href: "/profile" },
        { title: "Subscriptions", href: "/subscriptions" },
        { title: "Billing", href: "/billing" },
        { title: "Security", href: "/security" },
      ],
    },
    {
      title: "Settings",
      href: "#",
      icon: "⚙️",
      submenu: [
        { title: "Preferences", href: "/settings/preferences" },
        { title: "Notifications", href: "/settings/notifications" },
        { title: "API Keys", href: "/settings/api-keys" },
        { title: "Team Members", href: "/settings/team" },
      ],
    },
    { title: "Help Center", href: "/help", icon: "❓" },
  ] as UserAreaLinkType[];

  // Auth buttons (when not logged in)
  const authLinks = [
    { title: "Login", href: "/auth/login", isButton: false },
    {
      title: "Sign Up",
      href: "/auth/signup",
      isButton: true,
      buttonStyle: "primary",
    },
  ] as UserAreaLinkType[];

  return (
    <main>
      <ResponsiveNavbar
        session={NEXT_AUTH_SESSION_DATA_DUMMY}
        logoSrc={logoImage.src}
        logoAlt="Company Logo"
        navLinks={navLinks}
        userAreaLinks={NEXT_AUTH_SESSION_DATA_DUMMY ? userAreaLinks : authLinks}
        theme="LightMode"
      />

      {/* Rest of your page content */}
    </main>
  );
}
