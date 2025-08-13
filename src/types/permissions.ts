export type InstructorType =
  | "LEARNER" // Learns and consumes content.
  | "BLOGGER" // Writes and manages blogs.
  | "EVENT" // Organizes and manages events, including webinars and workshops.
  | "MODERATOR" // Manages community and user-generated content.
  | "INSTRUCTOR" // Creates and manages courses.
  | "ADMIN" // Oversees platform management and user roles.
  | "REGISTRAR" // Manages learner enrollments and records.
  | "FINANCE" // Handles platform finances and transactions.
  | "SUPER_ADMIN"; // Ultimate authority over all roles and settings.
