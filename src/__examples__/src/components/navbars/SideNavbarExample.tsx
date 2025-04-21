"use client";

import React, { useState } from "react";
import SideNavbar from "../../../../components/navbar/SideNavbar";
import { NavItem } from "../../../../types/navbar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import FolderIcon from "@mui/icons-material/Folder";
import AnalyticsIcon from "@mui/icons-material/BarChart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpIcon from "@mui/icons-material/Help";

const SideNavbarExample: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Sample navigation items
  const navItems: NavItem[] = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: <DashboardIcon />,
      type: "link",
      href: "/dashboard",
      isActive: true,
    },
    {
      id: "analytics",
      title: "Analytics",
      icon: <AnalyticsIcon />,
      type: "link",
      href: "/analytics",
    },
    {
      id: "divider1",
      type: "divider",
      title: "Management",
    },
    {
      id: "users",
      title: "Users",
      icon: <PersonIcon />,
      type: "group",
      defaultExpanded: true,
      children: [
        {
          id: "all-users",
          title: "All Users",
          type: "link",
          href: "/users",
        },
        {
          id: "add-user",
          title: "Add User",
          type: "link",
          href: "/users/new",
          badge: {
            content: "New",
            variant: "primary",
          },
        },
        {
          id: "user-roles",
          title: "User Roles",
          type: "link",
          href: "/users/roles",
        },
      ],
    },
    {
      id: "content",
      title: "Content",
      icon: <FolderIcon />,
      type: "group",
      children: [
        {
          id: "articles",
          title: "Articles",
          type: "link",
          href: "/content/articles",
        },
        {
          id: "media",
          title: "Media Library",
          type: "link",
          href: "/content/media",
        },
        {
          id: "pages",
          title: "Pages",
          type: "link",
          href: "/content/pages",
        },
      ],
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: <NotificationsIcon />,
      type: "link",
      href: "/notifications",
      badge: {
        content: 5,
        variant: "danger",
      },
    },
    {
      id: "divider2",
      type: "divider",
      title: "Settings",
    },
    {
      id: "settings",
      title: "Settings",
      icon: <SettingsIcon />,
      type: "link",
      href: "/settings",
    },
    {
      id: "theme-toggle",
      title: `Toggle ${darkMode ? "Light" : "Dark"} Mode`,
      type: "button",
      onClick: () => setDarkMode(!darkMode),
    },
    {
      id: "help",
      title: "Help & Support",
      icon: <HelpIcon />,
      type: "link",
      href: "/help",
      isExternal: true,
    },
  ];

  // Sample footer actions
  const footerActions = [
    {
      id: "logout",
      title: "Logout",
      icon: <LogoutIcon />,
      type: "button" as const,
      onClick: () => console.log("Logout clicked"),
    },
  ];

  return (
    <SideNavbar
      items={navItems}
      defaultExpanded={true}
      position="left"
      darkMode={darkMode}
      logo={{
        src: "/public/instincthub-logo.png",
        miniSrc: "",
        alt: "InstinctHub Logo",
        href: "/",
      }}
      footer={{
        showUserProfile: true,
        user: {
          name: "John Doe",
          role: "Administrator",
          avatar: "https://i.pravatar.cc/300",
        },
        actions: footerActions,
      }}
      tooltip={{ enabled: true }}
      resizable={true}
      toggleShortcut="ctrl+b"
    >
      <div className="ihub-p-4">
        <h1>Main Content Area</h1>
        <p>This is where your main application content would go.</p>
        <div className="ihub-card ihub-p-4 ihub-mt-4">
          <h2>Example Content</h2>
          <p>
            The sidebar can be expanded or collapsed using the toggle button. On
            mobile devices, it will automatically collapse after navigation.
          </p>
          <p>
            Try resizing the sidebar by dragging the edge. You can also use the
            keyboard shortcut (Ctrl+B) to toggle it.
          </p>
        </div>
      </div>
    </SideNavbar>
  );
};

export default SideNavbarExample;
