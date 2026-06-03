# Current Feature

## Social Account Connection (OAuth)

Allow users to connect their Twitter/X and Facebook accounts via OAuth so the app can post on their behalf.

## Status

In planning — not yet started.

## Current Branch

`main` → will branch to `feature/social-account-connection`

---

## Scope

Connect the `/accounts` page (currently mock UI) to real OAuth flows for **Twitter/X** and **Facebook**. Store access tokens securely in the `SocialAccount` model. Allow users to disconnect accounts.

## Stages

### Stage 1 — Twitter/X OAuth
- Register app in Twitter Developer Portal, get `CLIENT_ID` + `CLIENT_SECRET`
- Add env vars: `TWITTER_CLIENT_ID`, `TWITTER_CLIENT_SECRET`
- Create API route `app/api/auth/twitter/route.ts` — redirects to Twitter OAuth 2.0 PKCE flow
- Create callback route `app/api/auth/twitter/callback/route.ts` — exchanges code for tokens, saves `SocialAccount` row
- Wire "Connect Twitter" button on `/accounts` page to the redirect route
- Show connected state (username + avatar) on account card once linked

### Stage 2 — Facebook OAuth
- Register app in Facebook Developer Portal (Meta for Developers), get `APP_ID` + `APP_SECRET`
- Add env vars: `FACEBOOK_APP_ID`, `FACEBOOK_APP_SECRET`
- Create API route `app/api/auth/facebook/route.ts` — redirects to Facebook OAuth flow
- Create callback route `app/api/auth/facebook/callback/route.ts` — exchanges code for tokens, saves `SocialAccount` row
- Wire "Connect Facebook" button on `/accounts` page

### Stage 3 — Disconnect & Token Storage
- Add `DELETE` server action to remove a `SocialAccount` row
- Wire "Disconnect" button on account card
- Ensure tokens are stored encrypted (or note if plain storage is acceptable for MVP)
- Add Zod validation on callback params

### Stage 4 — Accounts Page (Real Data)
- Replace mock data in `/accounts` page with real `SocialAccount` rows fetched from DB
- Show platform username, avatar (if returned by API), and connected date
- Show free-plan limits based on actual connected account count

## API Routes Added

| Route | Method | Description |
|---|---|---|
| `/api/auth/twitter` | GET | Initiate Twitter OAuth redirect |
| `/api/auth/twitter/callback` | GET | Handle Twitter callback, save tokens |
| `/api/auth/facebook` | GET | Initiate Facebook OAuth redirect |
| `/api/auth/facebook/callback` | GET | Handle Facebook callback, save tokens |

## Env Vars Required

```
TWITTER_CLIENT_ID=
TWITTER_CLIENT_SECRET=
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
NEXTAUTH_URL=http://localhost:3000  # already set
```

## Schema Changes

`SocialAccount` model already exists in Prisma schema — no new models needed. May need to add `scope` field to track granted permissions.

## Out of Scope (this feature)

- Posting to accounts (next feature)
- Analytics/follower counts (later)
- Instagram, LinkedIn (future platforms)

---

## History

### Auth Fixes + Password Toggle — COMPLETE (2026-06-03)
- Fix — pg v8.21+ treats `sslmode=require` as `verify-full`; fails in WSL due to untrusted cert chain → strip `sslmode` from `DATABASE_URL` in `lib/prisma.ts` using string split, pass `ssl: { rejectUnauthorized: false }` explicitly to Pool
- Fix — increased `connectionTimeoutMillis` to 30s for Neon cold starts (~4s observed)
- Fix — added try/catch to `signUpAction` with user-friendly error message
- Feat — Eye/EyeOff password visibility toggle added to login and signup pages
- Note — `prisma migrate status` and CLI use a different connection path (prisma.config.ts) and are unaffected by the SSL issue; only the runtime Pool in `lib/prisma.ts` was broken
- Committed: `bda6218` — pushed to `main`

### NextAuth v5 — COMPLETE
- Stage 1 — `next-auth@beta`, `@auth/prisma-adapter`, `bcryptjs` installed; `auth.ts` + route handler
- Stage 2 — PrismaAdapter wired; `auth.config.ts` split out for Edge Runtime (proxy.ts)
- Stage 3 — Signup page (`app/(auth)/signup`) + `signUpAction` with Zod validation + bcrypt
- Stage 4 — Login page (`app/(auth)/login`) + Credentials provider; `loginAction` server action
- Stage 5 — `proxy.ts` route protection; `(app)/layout.tsx` fetches session; Sidebar sign-out button
- Fix — WSL IPv6 issue: added `dns.setDefaultResultOrder("ipv4first")` to `lib/prisma.ts`
- Pages restructured into `app/(app)/` and `app/(auth)/` route groups

### Neon PostgreSQL + Prisma 7 — COMPLETE
- Stage 1 — Neon init, Prisma 7 install, base schema, first migration
- Stage 2 — NextAuth models, cascade deletes, indexes, migration applied
- Stage 3 — `lib/prisma.ts` singleton (`pg` + `@prisma/adapter-pg`)
- Stage 4 — `DIRECT_URL` support in `prisma.config.ts`, branch strategy documented
- Stage 5 — `build`: `prisma migrate deploy && next build`, `postinstall`: `prisma generate`

### Dashboard Layout — COMPLETE
- Stage 1 (Setup) — ShadCN initialized, dark mode configured, 14 components installed
- Stage 2 (App Shell) — Sidebar, Header, AppShell, mock-data in `lib/mock-data.ts`
- Stage 3 (Dashboard Page) — stats cards, engagement chart, top posts panel, recent posts list
- Stage 4 (Create Post Page) — editor, media upload, platform selector, schedule picker, action buttons
- Stage 5 (Scheduled Posts Page) — filter tabs, post grid, preview sidebar, calendar with dot indicators
- Stage 6 (Connected Accounts Page) — account cards, limits progress bars, upgrade banner
- Stage 7 (Settings Page) — three stacked settings cards with chevron navigation

## Routes

| Route | Page | Auth |
|---|---|---|
| `/login` | Login form | Public |
| `/signup` | Signup form | Public |
| `/dashboard` | Dashboard with stats and engagement chart | Protected |
| `/create` | Create Post with editor and scheduler | Protected |
| `/scheduled` | Scheduled Posts with filter tabs and calendar | Protected |
| `/accounts` | Connected Accounts with limits and upgrade banner | Protected |
| `/settings` | Settings cards | Protected |
