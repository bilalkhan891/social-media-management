# Stage 5 — Production Config ⬜

Configure Vercel to run migrations before each deployment.

## Status: Pending

---

## Why `migrate deploy` in Production

`prisma migrate dev` is for development only — it creates migrations interactively.

In production, `prisma migrate deploy` applies all pending migrations non-interactively and safely. It must run before the app starts so the database schema is always in sync with the code.

---

## Option A — `package.json` Build Script (Recommended for Vercel)

Add a `postinstall` or custom build command:

**`package.json`**
```json
{
  "scripts": {
    "build": "prisma migrate deploy && next build"
  }
}
```

Vercel runs `npm run build`, so migrations apply automatically before every deployment.

---

## Option B — Vercel Build Command Override

In Vercel project settings → **Build & Development Settings** → **Build Command**:
```
npx prisma migrate deploy && npm run build
```

---

## Generate Prisma Client on Build

Prisma client must be generated after install. Add to `package.json`:

```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

This ensures the generated client is always in sync with the schema on Vercel.

---

## Deployment Checklist

- [ ] `DATABASE_URL` set in Vercel env vars (production Neon branch)
- [ ] `DIRECT_URL` set in Vercel env vars (if using connection pooling)
- [ ] `AUTH_SECRET` set in Vercel env vars (for NextAuth)
- [ ] Build command runs `prisma migrate deploy` before `next build`
- [ ] `postinstall` runs `prisma generate`
