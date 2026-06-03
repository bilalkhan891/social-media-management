# Stage 2 — OAuth Flow ⬜

Implement OAuth redirect and callback API routes. Exchange the auth code for an access token and save the connected account to the database.

## Status: Pending

---

## Flow

```
User clicks "Connect Facebook"
  → GET /api/auth/facebook
    → Redirects to Facebook OAuth consent screen
      → User grants permission
        → Facebook redirects to /api/auth/facebook/callback?code=...
          → Exchange code for access token
            → Fetch user/page info
              → Save SocialAccount row
                → Redirect to /accounts
```

---

## API Routes

### `app/api/auth/facebook/route.ts`

Builds the Facebook OAuth URL and redirects the user.

```ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";

const SCOPES = [
  "pages_manage_posts",
  "pages_read_engagement",
  "pages_show_list",
  "public_profile",
].join(",");

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/login", process.env.NEXTAUTH_URL!));
  }

  const params = new URLSearchParams({
    client_id: process.env.FACEBOOK_APP_ID!,
    redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/facebook/callback`,
    scope: SCOPES,
    response_type: "code",
  });

  return NextResponse.redirect(
    `https://www.facebook.com/v19.0/dialog/oauth?${params}`
  );
}
```

---

### `app/api/auth/facebook/callback/route.ts`

Handles the callback, exchanges the code, and saves the account.

```ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/login", process.env.NEXTAUTH_URL!));
  }

  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.redirect(new URL("/accounts?error=facebook_denied", process.env.NEXTAUTH_URL!));
  }

  // Exchange code for short-lived token
  const tokenRes = await fetch(
    `https://graph.facebook.com/v19.0/oauth/access_token?` +
      new URLSearchParams({
        client_id: process.env.FACEBOOK_APP_ID!,
        client_secret: process.env.FACEBOOK_APP_SECRET!,
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/facebook/callback`,
        code,
      })
  );
  const tokenData = await tokenRes.json();

  // Exchange for long-lived token (60-day expiry)
  const longLivedRes = await fetch(
    `https://graph.facebook.com/v19.0/oauth/access_token?` +
      new URLSearchParams({
        grant_type: "fb_exchange_token",
        client_id: process.env.FACEBOOK_APP_ID!,
        client_secret: process.env.FACEBOOK_APP_SECRET!,
        fb_exchange_token: tokenData.access_token,
      })
  );
  const longLivedData = await longLivedRes.json();

  // Fetch user profile
  const profileRes = await fetch(
    `https://graph.facebook.com/me?fields=id,name,picture&access_token=${longLivedData.access_token}`
  );
  const profile = await profileRes.json();

  // Upsert SocialAccount
  await prisma.socialAccount.upsert({
    where: {
      // requires unique constraint on (userId, platform, platformId)
      userId_platform_platformId: {
        userId: session.user.id,
        platform: "facebook",
        platformId: profile.id,
      },
    },
    update: {
      accessToken: longLivedData.access_token,
      username: profile.name,
    },
    create: {
      userId: session.user.id,
      platform: "facebook",
      platformId: profile.id,
      username: profile.name,
      accessToken: longLivedData.access_token,
    },
  });

  return NextResponse.redirect(new URL("/accounts", process.env.NEXTAUTH_URL!));
}
```

---

## Schema Migration Needed

Add a unique constraint on `SocialAccount` so upsert works:

```prisma
model SocialAccount {
  // ... existing fields ...

  @@unique([userId, platform, platformId])
}
```

Run migration:
```bash
npx prisma migrate dev --name add-social-account-unique-constraint
```

---

## Notes

- Short-lived tokens expire in ~1 hour — always exchange for a long-lived token (60 days)
- Long-lived tokens must be refreshed before expiry — implement refresh logic later
- Token stored in plain text for MVP — consider encrypting at rest before production
- `NEXTAUTH_URL` must be set correctly in `.env` for redirects to work
