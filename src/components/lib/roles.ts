export const INSTRUCTOR_TYPE: Array<{ id: string; title: string }> = [
  { id: "LEARNER", title: "Learner" }, // Learns and consumes content.
  { id: "BLOGGER", title: "Blogger" }, // Writes and manages blogs.
  { id: "EVENT", title: "Event" }, // Organizes and manages events, including webinars and workshops.
  { id: "MODERATOR", title: "Moderator" }, // Manages the community within the app, including reviewing and managing user-generated content.
  { id: "INSTRUCTOR", title: "Instructor" }, // Creates and manages courses.
  { id: "ADMIN", title: "Admin" }, // Oversees platform management and user roles.
  { id: "REGISTRAR", title: "Registrar" }, // Manages learner enrollments and records.
  { id: "FINANCE", title: "Finance" }, // Handles platform finances and transactions.
  { id: "SUPER_ADMIN", title: "Super Admin" }, // Ultimate authority over all roles and platform settings.
];

// Define a type for valid role strings
export type RoleType =
  | "LEARNER"
  | "BLOGGER"
  | "EVENT"
  | "MODERATOR"
  | "INSTRUCTOR"
  | "ADMIN"
  | "REGISTRAR"
  | "FINANCE"
  | "SUPER_ADMIN";

// Define a type for role grouping keys
export type RoleGroupKey =
  | "CHANNEL_LEARNER_ROLES"
  | "CHANNEL_BLOGGER_ROLES"
  | "CHANNEL_EVENT_ROLES"
  | "CHANNEL_MODERATOR_ROLES"
  | "CHANNEL_INSTRUCTOR_ROLES"
  | "CHANNEL_ADMIN_ROLES"
  | "CHANNEL_REGISTRAR_ROLES"
  | "CHANNEL_FINANCE_ROLES"
  | "CHANNEL_SUPER_ADMIN_ROLES";

// Define the role grouping with proper typing
export const ROLE_GROUPING: Record<RoleGroupKey, RoleType[]> = {
  CHANNEL_LEARNER_ROLES: [
    "LEARNER",
    "BLOGGER",
    "MODERATOR",
    "INSTRUCTOR",
    "ADMIN",
    "REGISTRAR",
    "FINANCE",
    "SUPER_ADMIN",
  ],
  CHANNEL_BLOGGER_ROLES: [
    "BLOGGER",
    "ADMIN",
    "REGISTRAR",
    "FINANCE",
    "SUPER_ADMIN",
  ],
  CHANNEL_EVENT_ROLES: [
    "EVENT",
    "ADMIN",
    "REGISTRAR",
    "FINANCE",
    "SUPER_ADMIN",
  ],
  CHANNEL_MODERATOR_ROLES: [
    "MODERATOR",
    "INSTRUCTOR",
    "ADMIN",
    "REGISTRAR",
    "FINANCE",
    "SUPER_ADMIN",
  ],
  CHANNEL_INSTRUCTOR_ROLES: [
    "INSTRUCTOR",
    "ADMIN",
    "REGISTRAR",
    "FINANCE",
    "SUPER_ADMIN",
  ],
  CHANNEL_ADMIN_ROLES: ["ADMIN", "REGISTRAR", "FINANCE", "SUPER_ADMIN"],
  CHANNEL_REGISTRAR_ROLES: ["REGISTRAR", "FINANCE", "SUPER_ADMIN"],
  CHANNEL_FINANCE_ROLES: ["FINANCE", "SUPER_ADMIN"],
  CHANNEL_SUPER_ADMIN_ROLES: ["SUPER_ADMIN"],
};

/**
 * Validates if a given role has access to a specific role group
 * @param role The role to validate (e.g., "INSTRUCTOR")
 * @param group The role group to check against (e.g., "CHANNEL_EVENT_ROLES")
 * @returns Boolean indicating whether the role exists in the specified group
 */
export const adminAccessValidation = (role: string, group: string): boolean => {
  // Function that checks if a string exists in an array.
  // Example: adminAccessValidation("INSTRUCTOR", "CHANNEL_EVENT_ROLES")
  try {
    // Cast group to RoleGroupKey to ensure type safety
    const groupKey = group as RoleGroupKey;
    const grouping = ROLE_GROUPING[groupKey];

    // If grouping is undefined, it means the group key is invalid
    if (!grouping) {
      console.log(`Invalid group key: ${group}`);
      return false;
    }

    return grouping.includes(role as RoleType);
  } catch (error) {
    console.log("adminAccessValidation Error: ", error);
    return false;
  }
};
