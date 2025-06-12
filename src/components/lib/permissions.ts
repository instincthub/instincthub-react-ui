import { NextApiRequest } from "next";

interface Session {
  user: {
    name: {
      username: string;
    };
  };
}

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
    session?.user?.name?.username !== headerUsername ||
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
