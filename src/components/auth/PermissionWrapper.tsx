"use client";
import React, { ReactNode } from "react";
import { hasUserPermission } from "../lib/permissions";
import { InstructorType } from "@/types";

interface PermissionWrapperProps {
  /**
   * The permission type to check for
   */
  accessType: string;
  /**
   * Array of user permissions (overrides roleName if provided)
   */
  permissions?: string[] | InstructorType[];
  /**
   * Role name to select predefined permission set (ignored if permissions provided)
   */
  roleName?: InstructorType;
  /**
   * Content to render when permission is granted
   */
  children: ReactNode;
  /**
   * Content to render when permission is denied
   * @default "Permission denied"
   */
  fallback?: ReactNode | string;
  /**
   * Additional CSS class names for the wrapper
   */
  className?: string;
  /**
   * Whether to render nothing when permission is denied (instead of fallback)
   * @default false
   */
  hideOnDeny?: boolean;
}

/**
 * Permission wrapper component that conditionally renders children based on user permissions.
 * Uses the hasUserPermission function to determine access rights.
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage with explicit permissions
 * <PermissionWrapper
 *   accessType="ADMIN"
 *   permissions={['USER', 'ADMIN', 'MODERATOR']}
 * >
 *   <AdminPanel />
 * </PermissionWrapper>
 *
 * // Using role-based permissions
 * <PermissionWrapper
 *   accessType="INSTRUCTOR"
 *   roleName="INSTRUCTOR"
 *   fallback={<div>Access denied - Instructor level required</div>}
 * >
 *   <InstructorDashboard />
 * </PermissionWrapper>
 *
 * // Using default permissions (CHANNEL_LEARNER_ROLES)
 * <PermissionWrapper
 *   accessType="LEARNER"
 *   hideOnDeny={true}
 * >
 *   <LearnerContent />
 * </PermissionWrapper>
 *
 * // Custom fallback with styling
 * <PermissionWrapper
 *   accessType="FINANCE"
 *   roleName="FINANCE"
 *   className="permission-wrapper"
 *   fallback={
 *     <div className="ihub-alert ihub-alert-warning">
 *       <h5>Access Restricted</h5>
 *       <p>You need finance permissions to view this content.</p>
 *     </div>
 *   }
 * >
 *   <FinancialReports />
 * </PermissionWrapper>
 * ```
 *
 * @param props - The component props
 * @param props.accessType - The permission type to check for
 * @param props.permissions - Array of user permissions (overrides roleName)
 * @param props.roleName - Role name to select predefined permission set
 * @param props.children - Content to render when permission is granted
 * @param props.fallback - Content to render when permission is denied
 * @param props.className - Additional CSS class names
 * @param props.hideOnDeny - Whether to render nothing when permission is denied
 * @returns JSX element or null based on permission check
 */
const PermissionWrapper: React.FC<PermissionWrapperProps> = ({
  accessType,
  permissions,
  roleName,
  children,
  fallback = "Permission denied",
  className = "",
  hideOnDeny = false,
}) => {
  // Check if user has the required permission
  const hasAccess = hasUserPermission({
    accessType,
    permissions,
    roleName,
  });

  // If user has access, render children
  if (hasAccess) {
    return className ? (
      <div className={className}>{children}</div>
    ) : (
      <>{children}</>
    );
  }

  // If hideOnDeny is true, render nothing
  if (hideOnDeny) {
    return null;
  }

  // Render fallback content with optional styling
  return className ? (
    <div className={className}>{fallback}</div>
  ) : (
    <>{fallback}</>
  );
};

export default PermissionWrapper;
