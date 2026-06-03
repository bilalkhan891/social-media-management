# Stage 3 — Accounts Page (Real Data) ⬜

Replace mock Facebook account data on `/accounts` with real `SocialAccount` rows. Add a working disconnect button.

## Status: Pending

---

## What Changes

- `/accounts` page fetches real `SocialAccount` rows for the current user from the DB
- Facebook card shows: username, connected date, and a "Disconnect" button
- "Connect Facebook" button links to `/api/auth/facebook`
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

const facebookAccount = accounts.find((a) => a.platform === "facebook");
```

---

## Disconnect Server Action

**`actions/social-accounts.ts`**

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

Note: `deleteMany` with both `id` and `userId` ensures a user can only delete their own accounts.

---

## UI Updates

- If `facebookAccount` exists: show username + "Disconnect" button (calls `disconnectAccount`)
- If not connected: show "Connect Facebook" button → links to `/api/auth/facebook`
- Connected account count fed into the free-plan limits progress bar (2 accounts max on free)

---

## Notes

- `revalidatePath("/accounts")` after disconnect updates the page without a full reload
- Free plan limit check: `accounts.length >= 2` → disable "Connect" buttons for other platforms
- Error state from OAuth (`?error=facebook_denied`) should show a toast on the accounts page
