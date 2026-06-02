# Stage 3 — Signup ⬜

Signup page UI and server action to create new users with hashed passwords.

## Status: Pending

---

## Install

```bash
npm install bcryptjs
npm install --save-dev @types/bcryptjs
```

---

## Server Action — `actions/auth.ts`

```ts
"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function signUpAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validate with Zod
  // Check email not already taken
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "Email already in use" };

  const hashed = await bcrypt.hash(password, 12);
  await prisma.user.create({ data: { email, password: hashed } });

  return { success: true };
}
```

---

## Page — `app/(auth)/signup/page.tsx`

- Email + password fields
- Submit calls `signUpAction`
- On success: redirect to `/login`
- Show error toast on failure

---

## Route Group

Use a `(auth)` route group for signup/login pages so they share a minimal layout (no sidebar):
```
app/
  (auth)/
    layout.tsx   ← centered card layout, no sidebar
    signup/
      page.tsx
    login/
      page.tsx
```

---

## Validation

Use Zod to validate before hitting the database:
- Email: valid format
- Password: min 8 characters
