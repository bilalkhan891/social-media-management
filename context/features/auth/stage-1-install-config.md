# Stage 1 — Install & Config ⬜

Install NextAuth v5, create `auth.ts`, add required env vars.

## Status: Pending

---

## Install

```bash
npm install next-auth@beta
```

NextAuth v5 is still in beta — always install with `@beta` tag.

---

## Env Vars

Add to `.env`:
```env
AUTH_SECRET="..."   # generate with: npx auth secret
```

Add to Vercel env vars for production.

---

## `auth.ts` (root level)

NextAuth v5 config lives at `auth.ts` in the project root (not in `pages/api/`):

```ts
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],  // filled in Stage 2 & 4
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
});
```

---

## Route Handler

**`app/api/auth/[...nextauth]/route.ts`**
```ts
import { handlers } from "@/auth";
export const { GET, POST } = handlers;
```

---

## Notes

- `auth()` — server-side session getter (use in server components and actions)
- `signIn()` / `signOut()` — server actions for triggering auth flows
- `handlers` — Next.js route handler for the NextAuth API routes
