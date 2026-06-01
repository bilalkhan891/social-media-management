# Stage 4 — Neon Branch Strategy ⬜

Set up separate Neon branches for dev and production, and configure env vars.

## Status: Pending

---

## Neon Branch Model

Neon supports database branching (like git branches). Each branch is an isolated copy of the database.

| Branch | Purpose | Env Var |
|---|---|---|
| `main` (or `dev`) | Development and migration testing | `DATABASE_URL` in `.env` |
| `production` | Live production data | `DATABASE_URL` in Vercel env vars |

---

## Creating a Production Branch

In the Neon dashboard:
1. Open the project
2. Go to **Branches** → **Create Branch**
3. Name it `production`
4. Copy the connection string for the production branch

---

## Environment Variables

### Local `.env`
```env
# Dev branch
DATABASE_URL="postgresql://..."
```

### Vercel Environment Variables
```
DATABASE_URL=postgresql://...   ← production branch connection string
```

---

## DIRECT_URL (if using connection pooling)

Neon's serverless driver uses a pooled connection by default. Prisma Migrate requires a direct (non-pooled) connection.

If Neon provides both a pooled and direct URL:

**`prisma.config.ts`**
```ts
export default defineConfig({
  datasource: {
    url: process.env["DATABASE_URL"],          // pooled — for app queries
    directUrl: process.env["DIRECT_URL"],      // direct — for migrations
  },
});
```

**`.env`**
```env
DATABASE_URL="postgresql://...?pgbouncer=true"
DIRECT_URL="postgresql://..."
```

Check the Neon dashboard connection strings panel to see if separate pooled/direct URLs are provided.

---

## Verification

```bash
npx prisma migrate status
```

Should show all migrations as applied on both branches after deploying.
