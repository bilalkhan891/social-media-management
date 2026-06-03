# Stage 3 — Accounts Page (Real Data) ⬜

Replace mock X/Twitter account data on `/accounts` with real `SocialAccount` rows. Add a working disconnect button.

## Status: Pending

---

## What Changes

- `/accounts` page fetches real `SocialAccount` rows for the current user from the DB
- X card shows: username (`@handle`), connected date, and a "Disconnect" button
- "Connect X" button links to `/api/auth/x`
- Disconnect removes the `SocialAccount` row

---

## Data Fetching

In the `/accounts` server component, fetch directly with Prisma:

```ts
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const session = await auth();
const accounts = await prisma.socialAccount.findMany({
  where: { userId: session!.user!.id },
  orderBy: { createdAt: "asc" },
});

const xAccount = accounts.find((a) => a.platform === "x");
```

---

## Disconnect Server Action

**`actions/social-accounts.ts`** (shared with Facebook — add once, reuse for all platforms)

```ts
"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function disconnectAccount(accountId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.socialAccount.deleteMany({
    where: { id: accountId, userId: session.user.id },
  });

  revalidatePath("/accounts");
  return { success: true };
}
```

---

## UI Updates

- If `xAccount` exists: show `@username` + "Disconnect" button (calls `disconnectAccount`)
- If not connected: show "Connect X" button → links to `/api/auth/x`
- Connected account count feeds into the free-plan limits progress bar (2 accounts max on free)

---

## Notes

- `@` prefix on username is display-only — store the raw username in DB (e.g. `johndoe`, not `@johndoe`)
- `revalidatePath("/accounts")` after disconnect refreshes server component data without a full reload
- Error state from OAuth (`?error=x_denied`) should show a toast on the accounts page
- `disconnectAccount` server action is shared across platforms — implement once alongside the Facebook stage
