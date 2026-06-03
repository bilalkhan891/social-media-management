# Stage 2 — OAuth Flow ⬜

Implement OAuth 2.0 PKCE redirect and callback API routes. Exchange the auth code for tokens and save the connected account to the database.

## Status: Pending

---

## Flow

```
User clicks "Connect X"
  → GET /api/auth/x
    → Generate code_verifier + code_challenge (PKCE)
      → Store code_verifier in a cookie
        → Redirect to X OAuth consent screen
          → User grants permission
            → X redirects to /api/auth/x/callback?code=...&state=...
              → Read code_verifier from cookie
                → Exchange code for access + refresh tokens
                  → Fetch user profile
                    → Save SocialAccount row
                      → Redirect to /accounts
```

---

## API Routes

### `app/api/auth/x/route.ts`

Builds the X OAuth 2.0 PKCE URL and redirects the user.

```ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import crypto from "crypto";

const SCOPES = "tweet.read tweet.write users.read offline.access";

function generatePKCE() {
  const verifier = crypto.randomBytes(32).toString("base64url");
  const challenge = crypto
    .createHash("sha256")
    .update(verifier)
    .digest("base64url");
  return { verifier, challenge };
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/login", process.env.NEXTAUTH_URL!));
  }

  const { verifier, challenge } = generatePKCE();
  const state = crypto.randomBytes(16).toString("hex");

  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.X_CLIENT_ID!,
    redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/x/callback`,
    scope: SCOPES,
    state,
    code_challenge: challenge,
    code_challenge_method: "S256",
  });

  const res = NextResponse.redirect(
    `https://twitter.com/i/oauth2/authorize?${params}`
  );

  // Store verifier and state in short-lived cookies
  res.cookies.set("x_code_verifier", verifier, { httpOnly: true, maxAge: 600 });
  res.cookies.set("x_oauth_state", state, { httpOnly: true, maxAge: 600 });

  return res;
}
```

---

### `app/api/auth/x/callback/route.ts`

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
  const state = req.nextUrl.searchParams.get("state");
  const storedState = req.cookies.get("x_oauth_state")?.value;
  const verifier = req.cookies.get("x_code_verifier")?.value;

  if (!code || !verifier || state !== storedState) {
    return NextResponse.redirect(
      new URL("/accounts?error=x_denied", process.env.NEXTAUTH_URL!)
    );
  }

  // Exchange code for tokens
  const tokenRes = await fetch("https://api.twitter.com/2/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.X_CLIENT_ID}:${process.env.X_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/x/callback`,
      code_verifier: verifier,
    }),
  });
  const tokenData = await tokenRes.json();

  // Fetch user profile
  const profileRes = await fetch("https://api.twitter.com/2/users/me?user.fields=profile_image_url", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  const { data: profile } = await profileRes.json();

  // Upsert SocialAccount
  await prisma.socialAccount.upsert({
    where: {
      userId_platform_platformId: {
        userId: session.user.id,
        platform: "x",
        platformId: profile.id,
      },
    },
    update: {
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token ?? null,
      username: profile.username,
    },
    create: {
      userId: session.user.id,
      platform: "x",
      platformId: profile.id,
      username: profile.username,
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token ?? null,
    },
  });

  const res = NextResponse.redirect(
    new URL("/accounts", process.env.NEXTAUTH_URL!)
  );
  res.cookies.delete("x_code_verifier");
  res.cookies.delete("x_oauth_state");
  return res;
}
```

---

## Schema Migration Needed

Add a unique constraint on `SocialAccount` (shared with Facebook feature — only run once):

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

- PKCE (`code_verifier` / `code_challenge`) is required by X — plain OAuth 2.0 without PKCE will be rejected
- `state` parameter prevents CSRF — always validate it matches the stored cookie value
- `offline.access` scope is required to receive a `refresh_token`; without it tokens expire in 2 hours
- Refresh token rotation: when posting, check token expiry and refresh before calling the API (implement in posting stage)
- Tokens stored in plain text for MVP — consider encrypting at rest before production
