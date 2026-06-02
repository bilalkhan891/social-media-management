# Stage 2 — Prisma Adapter ⬜

Wire the NextAuth Prisma adapter to the existing schema.

## Status: Pending

---

## Install

```bash
npm install @auth/prisma-adapter
```

---

## Update `auth.ts`

```ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
});
```

---

## Schema Compatibility

The Prisma adapter requires these models — all already in `prisma/schema.prisma`:
- `User` (with `accounts` and `sessions` relations)
- `Account`
- `Session`
- `VerificationToken`

No new migration needed.

---

## Notes

- Use `strategy: "jwt"` — avoids database reads on every request vs `strategy: "database"`
- The adapter handles OAuth account linking automatically (for future OAuth providers)
- Credentials provider (Stage 4) bypasses the adapter for session creation — JWT handles it
