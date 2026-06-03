# Current Feature

None — ready for next feature.

## Status

No active feature. Auth committed and merged to `main` on 2026-06-02.

## Current Branch

`main`

---

## History

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
