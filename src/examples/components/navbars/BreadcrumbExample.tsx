"use client";
import { Breadcrumb } from "@/index";
import Link from "next/link";

export default function BreadcrumbExample() {
  // Example path mapping for better display names
  const pathMapping = {
    courses: "Learning Paths",
    "web-development": "Web Development",
    "react-fundamentals": "React Fundamentals",
  };
  return (
    <div className="ihub-container">
      {/* Basic usage */}
      <Breadcrumb />

      {/* Advanced usage with custom labels */}

      <Breadcrumb
        homeLabel="Dashboard"
        pathMapping={pathMapping}
        excludePaths={["auth"]}
      />

      {/* Styled variant */}

      <Breadcrumb className="ihub-breadcrumb-pill" pathMapping={pathMapping} />

      <Link
        rel="noreferrer noopener"
        target="_blank"
        href="https://github.com/instincthub/instincthub-react-ui/blob/main/src/components/navbars/Breadcrumb.tsx"
      >
        <button>View codebase</button>
      </Link>
    </div>
  );
}
