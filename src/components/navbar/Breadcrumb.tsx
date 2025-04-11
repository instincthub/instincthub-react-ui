"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbProps {
  /**
   * Optional custom home label (default: "Home")
   */
  homeLabel?: string;
  /**
   * Optional mapping of path segments to display names
   */
  pathMapping?: Record<string, string>;
  /**
   * Optional array of paths to exclude from breadcrumb
   */
  excludePaths?: string[];
  /**
   * Optional className for additional styling
   */
  className?: string;
}

/**
 * Modern breadcrumb component for InstinctHub NextJS application
 * Automatically generates breadcrumb from current path
 */
const Breadcrumb = ({
  homeLabel = "Home",
  pathMapping = {},
  excludePaths = [],
  className = "",
}: BreadcrumbProps) => {
  const pathname = usePathname();

  // Return nothing if we're on the homepage
  if (pathname === "/") return null;

  // Split the path into segments and filter out empty segments
  const pathSegments = pathname.split("/").filter((segment) => segment);

  // Build the breadcrumb items
  const breadcrumbItems = pathSegments
    .map((segment, index) => {
      // Skip excluded paths
      if (excludePaths.includes(segment)) return null;

      // Build the href for this segment
      const href = `/${pathSegments.slice(0, index + 1).join("/")}`;

      // Get the display name for this segment (use mapping if available, otherwise capitalize)
      const displayName =
        pathMapping[segment] ||
        segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());

      // Is this the last item?
      const isLastItem = index === pathSegments.length - 1;

      return (
        <li key={href} className={isLastItem ? "ihub-breadcrumb-active" : ""}>
          {isLastItem ? (
            <span>{displayName}</span>
          ) : (
            <Link href={href}>{displayName}</Link>
          )}
        </li>
      );
    })
    .filter(Boolean); // Remove null items (excluded paths)

  // Add home item at the beginning
  breadcrumbItems.unshift(
    <li key="home">
      <Link href="/">{homeLabel}</Link>
    </li>
  );

  return (
    <nav
      className={`ihub-breadcrumb-container ${className}`}
      aria-label="Breadcrumb"
    >
      <ul className="ihub-breadcrumb">{breadcrumbItems}</ul>
    </nav>
  );
};

export default Breadcrumb;
