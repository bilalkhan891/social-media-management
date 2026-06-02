# Stage 5 — Production Config ✅

Configure Vercel to run migrations before each deployment.

## Status: Complete

---

## What Was Done

### Build script — `package.json`
```json
"build": "prisma migrate deploy && next build",
"postinstall": "prisma generate"
```

- `prisma migrate deploy` runs before every Vercel build, applying pending migrations against the production Neon branch
- `prisma generate` runs after every `npm install`, ensuring the generated client is always present

---

## Why `migrate deploy` and Not `migrate dev`

| Command | Use Case |
|---|---|
| `prisma migrate dev` | Local development — creates new migration files interactively |
| `prisma migrate deploy` | Production — applies existing migrations non-interactively and safely |

Never run `migrate dev` in production or CI.

---

## Vercel Deployment Checklist

Before first deploy:
- [ ] Create `production` branch in Neon dashboard (see Stage 4)
- [ ] Set `DATABASE_URL` in Vercel env vars (pooled connection string from production branch)
- [ ] Set `DIRECT_URL` in Vercel env vars (direct connection string from production branch)
- [ ] Set `AUTH_SECRET` in Vercel env vars (added when NextAuth is implemented)

Vercel will automatically:
1. Run `npm install` → triggers `postinstall` → `prisma generate`
2. Run `npm run build` → runs `prisma migrate deploy` → runs `next build`
