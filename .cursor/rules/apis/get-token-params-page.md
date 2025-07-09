# How to Properly Get the User Token, Params and SearchParams

**Why?**  
You need the authenticated user’s token to make secure API calls to the finance endpoints. Aslo, in some instances, you need to Params and SearchParams to get kwargs.

**How to get session?**

- Use the `auth()` function in your `page.tsx` (server component).
- Extract the token from the session object.
- Pass the token (and session if needed) as props to your child components.

---

## 2. Step-by-Step Example

Let’s say you’re building `/app/[channel]/sis/finance/dashboard/page.tsx`:

### a. Import and Use `auth()`

```tsx
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import {
  SearchParamsPageProps,
  SessionUserType,
} from "@instincthub/react-ui/types";
import DashboardComponent from "@/components/finance/DashboardComponent";

export default async function DashboardPage({
  params,
  searchParams,
}: SearchParamsPageProps) {
  const _params = await params;
  const _searchParams = await searchParams;
  const handle = _params.channel;
  const session = await auth();
  // Type guard to check if user.name is an object with the expected structure
  const isSessionUserType = (user: any): user is SessionUserType => {
    return user?.name && typeof user.name === "object" && "token" in user.name;
  };
  const sessionUser = isSessionUserType(session?.user) ? session.user : null;
  const user = sessionUser;
  const token = user?.name?.token;

  return (
    <DashboardComponent
      params={_params}
      searchParams={_searchParams}
      token={token}
    />
  );
}
```

### b. Use the Token in Your Component

```tsx
// components/finance/DashboardComponent.tsx
import { reqOptions, API_HOST_URL } from "@instincthub/react-ui/lib";

export default async function DashboardComponent({
  token,
  params,
  searchParams,
}) {
  const { channel: handle } = params;
  const { id: category_id } = searchParams;
  const options = reqOptions("GET", null, token);
  const url = `${API_HOST_URL}/api/v1/sis/${handle}/finance/summary/?filter=${category_id}`;

  let summary = null,
    error = null;
  try {
    summary = await fetch(url, options);
  } catch (err) {
    error = err;
  }
  // Render summary or error
}
```

## 3. Actionable Advice

- Always get the session and token in your `page.tsx` (server component).
- Pass the token as a prop to any component that needs to make API calls.
- Never try to access the token directly in a client component—always pass it down.

## 4. Real-life Example

Imagine you’re building a finance dashboard.  
You fetch the session and token in the page, then pass them to your dashboard component, which uses the token to securely fetch financial data.
