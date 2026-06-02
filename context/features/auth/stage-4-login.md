# Stage 4 — Login ⬜

Login page UI and Credentials provider for email/password authentication.

## Status: Pending

---

## Credentials Provider — `auth.ts`

```ts
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) return null;

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return null;

        return { id: user.id, email: user.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
});
```

---

## Page — `app/(auth)/login/page.tsx`

- Email + password fields
- Submit calls `signIn("credentials", { email, password, redirectTo: "/dashboard" })`
- Show error on invalid credentials
- Link to `/signup`

---

## Notes

- `authorize` returning `null` triggers a `CredentialsSignin` error — catch and show "Invalid email or password"
- Do NOT expose which field is wrong (email vs password) for security
- `signIn()` from `next-auth` is a server action — call from a server action wrapper, not directly in a client component
