# Stage 4 — Neon Branch Strategy ✅

Set up separate Neon branches for dev and production, and configure env vars.

## Status: Complete (production branch setup deferred to Vercel deployment)

---

## Neon Branch Model

Neon supports database branching (like git branches). Each branch is an isolated copy of the database.

| Branch | Purpose | Env Var |
|---|---|---|
| `main` (dev) | Development and migration testing | `DATABASE_URL` in `.env` |
| `production` | Live production data | `DATABASE_URL` in Vercel env vars |

---

## Creating a Production Branch (manual — do before first Vercel deploy)

1. Open your project in the Neon dashboard
2. Go to **Branches** → **Create Branch**
3. Name it `production`, branch from `main`
4. Copy both the **pooled** and **direct** connection strings

---

## Environment Variables

### Local `.env` (dev branch, direct connection)
```env
DATABASE_URL="postgresql://..."       # direct connection — works for both queries and migrations
# DIRECT_URL not needed locally
```

### Vercel Environment Variables (production branch)
```env
DATABASE_URL="postgresql://..-pooler...?pgbouncer=true&sslmode=require"   # pooled (for serverless)
DIRECT_URL="postgresql://...?sslmode=require"                              # direct (for migrations)
```

Neon pooled endpoints have `-pooler` in the hostname and require `?pgbouncer=true`.

---

## DIRECT_URL — How It Works

`prisma.config.ts` uses `DIRECT_URL` for migrations when set, falling back to `DATABASE_URL`:

```ts
datasource: {
  url: process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"],
},
```

This ensures `prisma migrate deploy` always uses a direct connection even when `DATABASE_URL` points to the pooler.

---

## Neon Connection Strings (where to find them)

In the Neon dashboard → your project → **Connection Details**:
- Toggle **Pooled connection** on/off to switch between pooled and direct strings
- Copy both for Vercel env vars

---

## Verification

After setting up the production branch on Vercel:
```bash
npx prisma migrate status
```
Should show all migrations applied on the production branch.
