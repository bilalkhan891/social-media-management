# Stage 5 — Session & Route Protection ⬜

Protect authenticated routes with middleware, expose session to the app shell.

## Status: Pending

---

## Middleware — `middleware.ts` (root level)

```ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith("/login") ||
                     req.nextUrl.pathname.startsWith("/signup");

  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

---

## Session in Server Components

```ts
import { auth } from "@/auth";

const session = await auth();
if (!session) redirect("/login");
const user = session.user;
```

---

## Session in App Shell / Header

Pass session user to the Header component to show avatar and name:

```ts
// app/layout.tsx or AppShell
const session = await auth();
<Header user={session?.user} />
```

---

## Sign Out

```ts
import { signOut } from "@/auth";

// In a server action:
await signOut({ redirectTo: "/login" });
```

Wire to the logout button in the sidebar/header.

---

## Notes

- Middleware runs on every request matching the config — keep it fast (no DB calls)
- `auth()` in server components fetches the session from the JWT — no DB hit
- Public routes (landing page, `/api/auth/*`) must be excluded from the matcher
