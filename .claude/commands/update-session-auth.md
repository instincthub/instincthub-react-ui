# Update Session Auth Command

Convert a React component to use the new Session type from `@/types/auth` instead of the legacy SessionUserType.

## Usage

Apply this command to any component that needs to be updated to use the new auth session pattern.

## Instructions

1. **Import the Session type**:

   - Add: `import { Session } from "@/types/auth";`
   - Remove old SessionUserType import if present

2. **Update useSession usage**:

   - Replace complex type guards with: `const userSession = session as Session;`
   - Remove any SessionUserType type checking logic

3. **Update user data access patterns**:

   - Change `userSession?.name?.property` to `userSession?.user?.property`
   - Update image access: `userSession?.user?.image`
   - Update name access: `userSession?.user?.name`
   - Update username access: `userSession?.user?.username`

4. **Update token access**:

   - Change `userSession?.name?.token` to `userSession?.accessToken`

5. **Update channels access**:
   - Change `userSession?.name?.channels` to `userSession?.channels`
   - Active channel: `userSession?.channels?.active`

## Example transformation:

```tsx
// Before
const { data: session } = useSession();
const isSessionUserType = (user: any): user is SessionUserType => {
  return (
    session?.user?.name &&
    typeof session?.user.name === "object" &&
    "token" in session?.user.name
  );
};
const sessionUser = isSessionUserType(userSession?.user)
  ? userSession?.user
  : null;
const user = sessionUser;

// Display user info
{
  user?.name?.image ? (
    <img src={user.name.image} alt={user.name.full_name} />
  ) : (
    <p>{user?.name?.full_name?.charAt(0)}</p>
  );
}

// After
const { data: session } = useSession();
const user = session as Session;

// Display user info
{
  user?.user?.image ? (
    <img src={user.user.image} alt={user.user.name} />
  ) : (
    <p>{user?.user?.name?.charAt(0)}</p>
  );
}
```

This ensures consistent session handling across all components in the application.

# IMPORTANT!!!

If you need to get clarity on the new session type, check `import { Session } from "@/types/auth"
