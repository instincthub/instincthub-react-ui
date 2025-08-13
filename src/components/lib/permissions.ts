import { NextApiRequest } from "next";
import { Session } from "@/types/auth";
import { InstructorType } from "@/types";

/**
 * Validates if the request has valid username and custom header
 * @param session - User session from NextAuth
 * @param req - Next.js API request object
 * @returns Promise<boolean> - True if the request has valid permissions
 */
export const headerUsernamePermission = async (
  session: Session | null,
  req: NextApiRequest
): Promise<boolean> => {
  const customHeader = req.headers["x-instincthub-next-header"] as string;
  const headerUsername = req.headers["username"] as string;

  // Fixed logic error in the original code (negation was incorrectly applied)
  if (
    session?.user?.username !== headerUsername ||
    customHeader !== process.env.NEXT_PUBLIC_X_INSTINCTHUB_NEXT_HEADER
  ) {
    return false;
  }

  return true;
};

/**
 * Validates if the request has a valid custom header
 * @param req - Next.js API request object
 * @returns Promise<boolean> - True if the request has a valid header
 */
export const headerKeyPermission = async (
  req: NextApiRequest
): Promise<boolean> => {
  const customHeader = req.headers["x-instincthub-next-header"] as string;

  if (customHeader !== process.env.NEXT_PUBLIC_X_INSTINCTHUB_NEXT_HEADER) {
    return false;
  }

  return true;
};

/**
 * Finds a permission in an array of permissions
 * @example
 * ```ts
 * findPermissions(REGISTRAR_PERMISSION, instructorType)
 * ```
 * @param permission - Array of permissions
 * @param option - Permission to find
 * @returns string | undefined - Permission if found, undefined if not found
 */
export const findPermissions = (
  permission: string[],
  option: string
): string | undefined => {
  // Get array of permissions and user option and check if exist.
  return permission.find((i) => (i = option));
};

/**
 * Channel learner roles with full access to all permissions.
 * This is the most permissive role set, including all available roles.
 * Used as the default fallback when no specific role is provided.
 */
export const CHANNEL_LEARNER_ROLES: InstructorType[] = [
  "LEARNER",
  "BLOGGER",
  "MODERATOR",
  "INSTRUCTOR",
  "ADMIN",
  "REGISTRAR",
  "FINANCE",
  "SUPER ADMIN",
];

/**
 * Channel blogger roles with content creation and management permissions.
 * Includes blogger-specific permissions plus administrative roles.
 */
export const CHANNEL_BLOGGER_ROLES: InstructorType[] = [
  "BLOGGER",
  "ADMIN",
  "REGISTRAR",
  "FINANCE",
  "SUPER ADMIN",
];

/**
 * Channel event roles with event management and organizational permissions.
 * Includes event-specific permissions plus administrative roles.
 */
export const CHANNEL_EVENT_ROLES: InstructorType[] = [
  "EVENT",
  "ADMIN",
  "REGISTRAR",
  "FINANCE",
  "SUPER ADMIN",
];

/**
 * Channel moderator roles with content moderation and teaching permissions.
 * Includes moderation and instruction capabilities plus administrative roles.
 */
export const CHANNEL_MODERATOR_ROLES: InstructorType[] = [
  "MODERATOR",
  "INSTRUCTOR",
  "ADMIN",
  "REGISTRAR",
  "FINANCE",
  "SUPER ADMIN",
];

/**
 * Channel instructor roles with teaching and course management permissions.
 * Includes instruction capabilities plus administrative roles.
 */
export const CHANNEL_INSTRUCTOR_ROLES: InstructorType[] = [
  "INSTRUCTOR",
  "ADMIN",
  "REGISTRAR",
  "FINANCE",
  "SUPER ADMIN",
];

/**
 * Channel admin roles with administrative and management permissions.
 * Includes general administration plus higher-level administrative roles.
 */
export const CHANNEL_ADMIN_ROLES: InstructorType[] = [
  "ADMIN",
  "REGISTRAR",
  "FINANCE",
  "SUPER ADMIN",
];

/**
 * Channel registrar roles with user registration and academic record permissions.
 * Includes registrar-specific capabilities plus financial and super admin roles.
 */
export const CHANNEL_REGISTRAR_ROLES: InstructorType[] = [
  "REGISTRAR",
  "FINANCE",
  "SUPER ADMIN",
];

/**
 * Channel finance roles with financial management and billing permissions.
 * Includes finance-specific capabilities plus super admin role.
 */
export const CHANNEL_FINANCE_ROLES: InstructorType[] = [
  "FINANCE",
  "SUPER ADMIN",
];

/**
 * Channel super admin roles with complete system access and control.
 * This is the most restrictive role set with only super admin permissions.
 */
export const CHANNEL_SUPER_ADMIN_ROLES: InstructorType[] = ["SUPER ADMIN"];

/**
 * Role mapping object that connects role names to their corresponding permission arrays.
 * Used by hasUserPermission function to dynamically select appropriate permissions
 * based on the provided roleName parameter.
 * 
 * @example
 * ```ts
 * // Get permissions for instructor role
 * const instructorPermissions = ROLE_MAP['INSTRUCTOR'];
 * // Returns: ["INSTRUCTOR", "ADMIN", "REGISTRAR", "FINANCE", "SUPER ADMIN"]
 * 
 * // Get permissions for finance role
 * const financePermissions = ROLE_MAP['FINANCE'];
 * // Returns: ["FINANCE", "SUPER ADMIN"]
 * ```
 */
export const ROLE_MAP: Record<string, InstructorType[]> = {
  /** Maps to CHANNEL_LEARNER_ROLES - most permissive role set */
  LEARNER: CHANNEL_LEARNER_ROLES,
  /** Maps to CHANNEL_BLOGGER_ROLES - content creation permissions */
  BLOGGER: CHANNEL_BLOGGER_ROLES,
  /** Maps to CHANNEL_EVENT_ROLES - event management permissions */
  EVENT: CHANNEL_EVENT_ROLES,
  /** Maps to CHANNEL_MODERATOR_ROLES - moderation and teaching permissions */
  MODERATOR: CHANNEL_MODERATOR_ROLES,
  /** Maps to CHANNEL_INSTRUCTOR_ROLES - teaching and course management permissions */
  INSTRUCTOR: CHANNEL_INSTRUCTOR_ROLES,
  /** Maps to CHANNEL_ADMIN_ROLES - administrative permissions */
  ADMIN: CHANNEL_ADMIN_ROLES,
  /** Maps to CHANNEL_REGISTRAR_ROLES - registration and academic record permissions */
  REGISTRAR: CHANNEL_REGISTRAR_ROLES,
  /** Maps to CHANNEL_FINANCE_ROLES - financial management permissions */
  FINANCE: CHANNEL_FINANCE_ROLES,
  /** Maps to CHANNEL_SUPER_ADMIN_ROLES - complete system access (underscore format) */
  SUPER_ADMIN: CHANNEL_SUPER_ADMIN_ROLES,
  /** Maps to CHANNEL_SUPER_ADMIN_ROLES - complete system access (space format) */
  "SUPER ADMIN": CHANNEL_SUPER_ADMIN_ROLES,
};

/**
 * Checks if user has required permission
 * @example
 * ```ts
 * // Check if user has admin access with provided permissions
 * const hasAccess = hasUserPermission({
 *   accessType: 'ADMIN',
 *   permissions: ['USER', 'ADMIN', 'MODERATOR']
 * });
 * // Returns: true
 *
 * // Use specific role-based permissions
 * const hasInstructorAccess = hasUserPermission({
 *   accessType: 'INSTRUCTOR',
 *   roleName: 'INSTRUCTOR'
 * });
 * // Returns: true (uses CHANNEL_INSTRUCTOR_ROLES)
 *
 * // Use admin role permissions
 * const hasAdminAccess = hasUserPermission({
 *   accessType: 'ADMIN',
 *   roleName: 'ADMIN'
 * });
 * // Returns: true (uses CHANNEL_ADMIN_ROLES)
 *
 * // Fallback to default when roleName doesn't match
 * const hasDefaultAccess = hasUserPermission({
 *   accessType: 'LEARNER',
 *   roleName: 'INVALID_ROLE'
 * });
 * // Returns: true (falls back to CHANNEL_LEARNER_ROLES)
 *
 * // Check without any permissions or role (uses default)
 * const hasLearnerAccess = hasUserPermission({
 *   accessType: 'LEARNER'
 * });
 * // Returns: true (uses CHANNEL_LEARNER_ROLES as default)
 * ```
 * @param params - Object containing accessType and optional permissions/roleName
 * @param params.accessType - The permission type to check for
 * @param params.permissions - Array of user permissions (overrides roleName if provided)
 * @param params.roleName - Role name to select predefined permission set (ignored if permissions provided)
 * @returns boolean - True if user has the required permission, false otherwise
 */
export const hasUserPermission = ({
  accessType,
  permissions,
  roleName,
}: {
  accessType: string;
  permissions?: string[] | InstructorType[];
  roleName?: InstructorType;
}): boolean => {
  // Return false if no accessType
  if (!accessType) {
    return false;
  }

  // If permissions are explicitly provided, use them
  if (permissions) {
    return permissions.some(
      (permission) => permission.toLowerCase() === accessType.toLowerCase()
    );
  }

  // Helper function to get permission array by role name
  const getPermissionsByRole = (role: string): InstructorType[] => {
    return ROLE_MAP[role.toUpperCase()] || CHANNEL_ADMIN_ROLES;
  };

  // Get permissions based on roleName or fallback to default
  const permissionsToCheck = roleName
    ? getPermissionsByRole(roleName)
    : CHANNEL_LEARNER_ROLES;

  // Check if accessType exists in permissions array (case-insensitive)
  return permissionsToCheck.some(
    (permission) => permission.toLowerCase() === accessType.toLowerCase()
  );
};
